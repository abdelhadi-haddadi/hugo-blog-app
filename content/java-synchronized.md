+++
title = "Java synchronized"
date = 2025-08-29T20:00:38.060+01:00
draft = false
description = "Java synchronized tutorial shows how to use the synchronized keyword to ensure thread safety in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java synchronized

last modified July 16, 2024

 

In this article we show how to use the synchronized keyword to ensure thread 
safety in Java.

The synchronized keyword in Java is a fundamental tool for ensuring
thread safety in multithreaded programs. It provides a mechanism to control
access to shared resources by multiple threads, preventing race conditions and
data inconsistencies.

We can control the scope of synchronization by applying synchronized to methods
or code blocks.

When applied to a method, it ensures that only one thread can execute the method
at a time. Other threads trying to access the synchronized method
will be blocked until the first thread finishes its execution and releases the
lock. 

When applied to a code block, it creates a synchronized
block. Only one thread can enter and execute the code within the block at a
time. Other threads attempting to enter the synchronized block will
be blocked until the first thread exits the block.

## Locking Mechanism

The synchronized keyword relies on a concept called a monitor (also
known as an intrinsic lock). Each object in Java has an associated monitor. When
a thread enters a synchronized block or method, it acquires the
lock on the object associated with that block or method. Other threads trying to
access the same synchronized block or method will be suspended
until the first thread releases the lock. This ensures exclusive access to the
shared resource by only one thread at a time.

Acquiring and releasing locks can introduce some overhead. The
synchronized keyword should be used judiciously, only for critical
sections that require thread safety.

## Use Cases

Use synchronized when you have multiple threads accessing and modifying the same
data concurrently. This prevents race conditions where the outcome depends on
the unpredictable timing of thread execution. It is useful for scenarios where
multiple threads need to update a shared counter, modify a data structure, or
access a critical section of code that relies on consistent state.

## Synchronized method

The following example uses a synchronized method.

Main.java
  

import java.util.Scanner;

class Task {

    synchronized void process(int n) {

        System.out.println(Thread.currentThread().getName());

        for (int i = 1; i &lt;= 10; i++) {

            System.out.printf("%d ", n + i);

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        System.out.println();
    }
}

void main() {

    // only one object
    final Task obj = new Task();

    for (int i = 1; i &lt; 5; i++) {
        int e = i;
        String name = String.format("VirThread-%d", e);
        Thread.ofVirtual().name(name).start(() -&gt; obj.process(e * 10));
    }

    waitForKeyPress();
}

void waitForKeyPress() {

    try (var scanner = new Scanner(System.in)) {
        scanner.nextLine();
    }
}

The example creates five virtual threads that all take the Task
as a parameter and call its process method. The
synchronized keyword ensures that only one thead launches the
method at a time. 

for (int i = 1; i &lt; 5; i++) {
    int e = i;
    String name = String.format("VirThread-%d", e);
    Thread.ofVirtual().name(name).start(() -&gt; obj.process(e * 10));
}

In a for loop, we create and launch five virtual threads.

void waitForKeyPress() {

    try (var scanner = new Scanner(System.in)) {
        scanner.nextLine();
    }
}

We use scanner to prevent the main thread from finishing. There are tools such 
us CountDownLatch for such tasks, but for the sake of simplicity, 
we chose this simpler approach. 

$ java Main.java
VirThread-1
11 12 13 14 15 16 17 18 19 20 
VirThread-4
41 42 43 44 45 46 47 48 49 50 
VirThread-3
31 32 33 34 35 36 37 38 39 40 
VirThread-2
21 22 23 24 25 26 27 28 29 30 

## Synchronized counter

The following example creates a synchronized counter. 

Main.java
  

class Counter {

    private int counter = 0;

    public synchronized void inc() {
        counter++;
    }

    public synchronized void dec() {
        counter--;
    }

    public int getCounter() {
        return counter;
    }
}

class Task extends Thread {

    private final String name;
    private final Counter counter;

    public Task(Counter counter, String name) {

        this.counter = counter;
        this.name = name;
    }

    public void run() {

        for (int i = 0; i &lt;= 1000; i++) {

            if (name.contains("inc"))
                counter.inc();
            else
                counter.dec();
        }
    }
}

void main() {

    final var counter = new Counter();

    var taskInc = new Task(counter, "Thread-inc");
    var taskDec = new Task(counter, "Thread-dec");

    taskInc.start();
    taskDec.start();

    try {
        taskInc.join();
        taskDec.join();
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }

    System.out.println(counter.getCounter());
}

We have two tasks in the example. One increments the counter 1000 times and 
the other one decrements it 1000 times. So the final output must be zero. 

class Counter {

    private int counter = 0;

    public synchronized void inc() {
        counter++;
    }

    public synchronized void dec() {
        counter--;
    }

    public int getCounter() {
        return counter;
    }
}

In order for the example to work, we must use the synchronized 
keyword on the inc and dec methods.

try {
    taskInc.join();
    taskDec.join();
} catch (InterruptedException e) {
    throw new RuntimeException(e);
}

The join method ensures that the main thread waits until the joined 
threads finish.

$ java Main.java
0

## Source

[Java Synchronized Methods - tutorial](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)

In this article we have worked with the synchronized Java keyword.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).