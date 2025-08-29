+++
title = "Java CyclicBarrier"
date = 2025-08-29T19:58:32.675+01:00
draft = false
description = "Java CyclicBarrier tutorial shows how to synchronize Java threads using CyclicBarrier."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java CyclicBarrier

last modified February 15, 2025

 

In this article we show how to synchronize Java threads using CyclicBarrier.

CyclicBarrier is a synchronization aid that allows a set of threads
to wait for each other to reach a common barrier point. Unlike
CountDownLatch, which is a one-time use, CyclicBarrier
can be reused after the waiting threads are released.

To use CyclicBarrier, we first create a CyclicBarrier
object with a specified number of threads and an optional Runnable
action that is executed once the barrier is tripped. Each thread calls the
await method on the barrier, which blocks until all threads have
reached the barrier. Once all threads have arrived, the barrier is tripped, and
the optional action is executed. The threads are then released, and the barrier
can be reused.

## CyclicBarrier example

The following example shows the usage of CyclicBarrier.

Main.java
  

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.stream.Stream;

class Worker implements Runnable {

    private final List&lt;String&gt; messages;
    private final CyclicBarrier cyclicBarrier;

    public Worker(List&lt;String&gt; messages, CyclicBarrier cyclicBarrier) {
        this.messages = messages;
        this.cyclicBarrier = cyclicBarrier;
    }

    @Override
    public void run() {

        int r = new Random().nextInt(3000, 8000);

        System.out.printf("%s starting, durations %dms %n", 
            Thread.currentThread().getName(), r);

        try {
            Thread.sleep(r);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println(Thread.currentThread().getName() + " completed");
        messages.add(Thread.currentThread().getName() + " completed");

        try {
            cyclicBarrier.await();
        } catch (InterruptedException | BrokenBarrierException e) {
            throw new RuntimeException(e);
        }
    }
}

void main() throws InterruptedException {

    List&lt;String&gt; messages = Collections.synchronizedList(new ArrayList&lt;&gt;());
    var cyclicBarrier = new CyclicBarrier(5, () -&gt; 
        messages.add("Barrier tripped, all threads reached the barrier"));

    List&lt;Thread&gt; workers = Stream.generate(() -&gt; 
        new Thread(new Worker(messages, cyclicBarrier)))
            .limit(5)
            .toList();

    workers.forEach(Thread::start);

    for (Thread worker : workers) {
        worker.join();
    }

    System.out.println(messages);
}

The main thread creates five new threads; these five threads are synchronized 
with CyclicBarrier.

int r = new Random().nextInt(3000, 8000);

Each thread runs for a random number of milliseconds between 3000 and 8000. 

messages.add(Thread.currentThread().getName() + " completed");
cyclicBarrier.await();

When the task completes, it writes a message into a synchronized list and 
calls await on the barrier. The thread blocks until all threads 
have reached the barrier.

List&lt;String&gt; messages = Collections.synchronizedList(new ArrayList&lt;&gt;());
var cyclicBarrier = new CyclicBarrier(5, () -&gt; 
    messages.add("Barrier tripped, all threads reached the barrier"));

We create a synchronized list and a CyclicBarrier for five tasks. 
The barrier also has an optional action that is executed once all threads reach 
the barrier.

List&lt;Thread&gt; workers = Stream.generate(() -&gt; 
    new Thread(new Worker(messages, cyclicBarrier)))
        .limit(5)
        .toList();

A list of five threads is created. Each thread receives a synchronized message 
list and the cyclicBarrier.

workers.forEach(Thread::start);

We start all threads.

for (Thread worker : workers) {
    worker.join();
}

The main thread waits for all worker threads to complete using join.

System.out.println(messages);

In the end, we print all the messages.

## Reusable CyclicBarrier Example

The following example demonstrates the reusability of
CyclicBarrier. The barrier is used twice to synchronize threads at
two different points.

Main.java
  

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.stream.Stream;

class Worker implements Runnable {

    private final List&lt;String&gt; messages;
    private final CyclicBarrier cyclicBarrier;

    public Worker(List&lt;String&gt; messages, CyclicBarrier cyclicBarrier) {
        this.messages = messages;
        this.cyclicBarrier = cyclicBarrier;
    }

    @Override
    public void run() {

        int r = new Random().nextInt(3000, 8000);

        System.out.printf("%s starting, durations %dms %n", 
            Thread.currentThread().getName(), r);

        try {
            Thread.sleep(r);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println(Thread.currentThread().getName() + " completed phase 1");
        messages.add(Thread.currentThread().getName() + " completed phase 1");

        try {
            cyclicBarrier.await(); // Wait for all threads to complete phase 1
        } catch (InterruptedException | BrokenBarrierException e) {
            throw new RuntimeException(e);
        }

        // Phase 2
        r = new Random().nextInt(3000, 8000);
        System.out.printf("%s starting phase 2, durations %dms %n", 
            Thread.currentThread().getName(), r);

        try {
            Thread.sleep(r);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println(Thread.currentThread().getName() + " completed phase 2");
        messages.add(Thread.currentThread().getName() + " completed phase 2");

        try {
            cyclicBarrier.await(); // Wait for all threads to complete phase 2
        } catch (InterruptedException | BrokenBarrierException e) {
            throw new RuntimeException(e);
        }
    }
}

void main() throws InterruptedException {

    List&lt;String&gt; messages = Collections.synchronizedList(new ArrayList&lt;&gt;());
    var cyclicBarrier = new CyclicBarrier(5, () -&gt; 
        messages.add("Barrier tripped, all threads reached the barrier"));

    List&lt;Thread&gt; workers = Stream.generate(() -&gt; 
        new Thread(new Worker(messages, cyclicBarrier)))
            .limit(5)
            .toList();

    workers.forEach(Thread::start);

    for (Thread worker : workers) {
        worker.join();
    }

    System.out.println(messages);
}

In this program, the CyclicBarrier is used twice to synchronize
threads at two different phases of execution. Each thread completes two phases
of work, and the barrier ensures that all threads finish each phase before
proceeding to the next.

cyclicBarrier.await(); // Wait for all threads to complete phase 1

The first call to await ensures all threads complete phase 1 before
moving to phase 2.

cyclicBarrier.await(); // Wait for all threads to complete phase 2

The second call to await ensures all threads complete phase 2
before the program terminates.

var cyclicBarrier = new CyclicBarrier(5, () -&gt; 
    messages.add("Barrier tripped, all threads reached the barrier"));

The barrier action is executed each time the barrier is tripped, indicating that
all threads have reached the synchronization point.

$ java Main.java
Thread-0 starting, durations 4500ms 
Thread-1 starting, durations 3200ms 
Thread-2 starting, durations 7000ms 
Thread-3 starting, durations 5000ms 
Thread-4 starting, durations 6000ms 
Thread-1 completed phase 1
Thread-0 completed phase 1
Thread-3 completed phase 1
Thread-4 completed phase 1
Thread-2 completed phase 1
Barrier tripped, all threads reached the barrier
Thread-0 starting phase 2, durations 4000ms 
Thread-1 starting phase 2, durations 5500ms 
Thread-2 starting phase 2, durations 3000ms 
Thread-3 starting phase 2, durations 2500ms 
Thread-4 starting phase 2, durations 6000ms 
Thread-3 completed phase 2
Thread-2 completed phase 2
Thread-0 completed phase 2
Thread-1 completed phase 2
Thread-4 completed phase 2
Barrier tripped, all threads reached the barrier
[Thread-1 completed phase 1, Thread-0 completed phase 1, Thread-3 completed phase 1, Thread-4 completed phase 1, Thread-2 completed phase 1, Barrier tripped, all threads reached the barrier, Thread-3 completed phase 2, Thread-2 completed phase 2, Thread-0 completed phase 2, Thread-1 completed phase 2, Thread-4 completed phase 2, Barrier tripped, all threads reached the barrier]

## Source

[Java CyclicBarrier - reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CyclicBarrier.html)

In this article we have shown how to synchronize Java threads using
CyclicBarrier.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).