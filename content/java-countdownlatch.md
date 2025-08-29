+++
title = "Java CountDownLatch"
date = 2025-08-29T19:58:31.572+01:00
draft = false
description = "Java CountDownLatch tutorial shows how to synchronize Java threads using CountDownLatch."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java CountDownLatch

last modified July 15, 2024

 

In this article we show how to synchronize Java threads using CountDownLatch.

CountDownLatch is a class designed for thread synchronization. It
allows one thread (usually the main thread) to wait for a certain number of
other threads to finish their execution before proceeding.

To use CountDownLatch, we first create a
CountDownLatch object with an initial count representing the number
of threads we want to wait for. Each thread that needs to be synchronized calls
the countDown method on the latch object. This essentially signals
their completion. 

The main thread, or any other waiting thread, calls the await
method on the latch. This method blocks the calling thread until the internal
counter of the latch reaches zero.

## CountDownLatch example

The following example shows the usage of CountDownLatch.

Main.java
  

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Stream;

class Worker implements Runnable {

    private final List&lt;String&gt; messages;
    private final CountDownLatch countDownLatch;

    public Worker(List&lt;String&gt; messages, CountDownLatch countDownLatch) {
        this.messages = messages;
        this.countDownLatch = countDownLatch;
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
        countDownLatch.countDown();
    }
}

void main() throws InterruptedException {

    List&lt;String&gt; messages = Collections.synchronizedList(new ArrayList&lt;&gt;());
    var countDownLatch = new CountDownLatch(5);
    List&lt;Thread&gt; workers = Stream.generate(() -&gt; 
        new Thread(new Worker(messages, countDownLatch)))
            .limit(5)
            .toList();

    workers.forEach(Thread::start);
    countDownLatch.await();
    messages.add("Latch released");

    System.out.println(messages);
}

The main thread creates five new threads; these five threads are synchronized 
with CountDownLatch.

int r = new Random().nextInt(3000, 8000);

Each thread runs for a random number of milliseconds between 3000 and 8000. 

messages.add(Thread.currentThread().getName() + " completed");
countDownLatch.countDown();

When the task completes, it writes a message into a synchronized list and 
cecrements the count of the latch with countDown. All waiting 
threads are released if the count reaches zero.

List&lt;String&gt; messages = Collections.synchronizedList(new ArrayList&lt;&gt;());
var countDownLatch = new CountDownLatch(5);

We create a synchronized list and a CountDownLatch for five tasks.

List&lt;Thread&gt; workers = Stream.generate(() -&gt; 
    new Thread(new Worker(messages, countDownLatch)))
        .limit(5)
        .toList();

A list of five threads is created. Each thread receives a synchronized message 
list and the countDownLatch.

workers.forEach(Thread::start);

We start all threads.

countDownLatch.await();

The await method causes the main thread to wait until the latch
has counted down to zero, unless the thread is interrupted.

System.out.println(messages);

In the end, we print all the messages.

## Source

[Java CountDownLatch - reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/CountDownLatch.html)

In this article we have shown how to synchronize Java threads using
CountDownLatch.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).