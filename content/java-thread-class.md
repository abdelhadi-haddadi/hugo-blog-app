+++
title = "Java Thread Class"
date = 2025-08-29T19:59:57.268+01:00
draft = false
description = "Complete Java Thread class tutorial covering all methods with examples. Learn about thread creation, lifecycle, synchronization and more."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Thread Class

Last modified: April 13, 2025

 

The java.lang.Thread class is fundamental to Java's multithreading
capabilities. It represents a thread of execution in a Java program. Threads
allow concurrent execution of code segments, enabling efficient resource
utilization.

Threads share the same memory space but execute independently. The Thread class
provides methods to create, control, and manage threads. Understanding threads
is essential for writing responsive and efficient Java applications.

## Thread Class Methods

The Thread class provides methods to control thread execution and query thread
status. Key methods include start, run,
sleep, join, and interrupt. These
methods manage the thread lifecycle and synchronization.

public class Thread implements Runnable {
    public Thread() {...}
    public Thread(Runnable target) {...}
    public void start() {...}
    public void run() {...}
    public static void sleep(long millis) throws InterruptedException {...}
    public final void join() throws InterruptedException {...}
    public void interrupt() {...}
    public static Thread currentThread() {...}
    public final boolean isAlive() {...}
    public final void setPriority(int priority) {...}
}

The code above shows key methods of the Thread class. These methods enable
thread creation, execution control, and status monitoring. Threads can be
created by extending Thread or implementing Runnable.

## Creating Thread by Extending Thread Class

The simplest way to create a thread is by extending the Thread class and
overriding its run method. The start method begins
thread execution. This approach is straightforward but limits inheritance.

Main.java
  

package com.zetcode;

class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i &lt; 5; i++) {
            System.out.println("Thread running: " + i);
            try {
                Thread.sleep(500); // Pause for 500ms
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
                return;
            }
        }
    }
}

void main() {
    MyThread thread = new MyThread();
    thread.start(); // Start the thread
    
    // Main thread continues execution
    for (int i = 0; i &lt; 3; i++) {
        System.out.println("Main thread: " + i);
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates thread creation by extending Thread. The main thread
and MyThread execute concurrently. The output shows interleaved execution.
Thread.sleep pauses execution without consuming CPU resources.

## Creating Thread by Implementing Runnable

A more flexible approach implements the Runnable interface. This allows the
class to extend another class while still being executable as a thread. The
Runnable object is passed to a Thread constructor.

Main.java
  

package com.zetcode;

class Task implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i &lt; 5; i++) {
            System.out.println("Task executing: " + i);
            try {
                Thread.sleep(400);
            } catch (InterruptedException e) {
                System.out.println("Task interrupted");
                return;
            }
        }
    }
}

void main() {
    Task task = new Task();
    Thread thread = new Thread(task);
    thread.start();
    
    // Main thread work
    for (int i = 0; i &lt; 4; i++) {
        System.out.println("Main thread working");
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example shows thread creation using Runnable. The Task class implements
Runnable and defines work in its run method. A Thread object is created with
the Task instance. Both approaches achieve similar results but Runnable is more
flexible.

## Thread Sleep and Interruption

The sleep method pauses thread execution for a specified time.
Threads can be interrupted using interrupt, which sends an
interruption signal. Proper interruption handling makes threads more responsive.

Main.java
  

package com.zetcode;

class Worker implements Runnable {
    @Override
    public void run() {
        try {
            for (int i = 0; i &lt; 10; i++) {
                System.out.println("Working... " + i);
                if (Thread.interrupted()) {
                    System.out.println("Thread was interrupted");
                    return;
                }
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            System.out.println("Thread interrupted during sleep");
            return;
        }
    }
}

void main() throws InterruptedException {
    Thread worker = new Thread(new Worker());
    worker.start();
    
    Thread.sleep(2000); // Let worker run for 2 seconds
    worker.interrupt(); // Interrupt the worker
    worker.join(); // Wait for worker to finish
    System.out.println("Main thread done");
}

This example demonstrates thread interruption. The Worker checks for interruption
using Thread.interrupted and handles InterruptedException.
The main thread interrupts Worker after 2 seconds. Proper interruption handling
ensures clean thread termination.

## Thread Joining

The join method allows one thread to wait for another to complete.
This is useful when thread execution order matters or when results need to be
combined. Join can specify a maximum wait time.

Main.java
  

package com.zetcode;

class Calculator implements Runnable {
    private int result;
    
    @Override
    public void run() {
        result = 0;
        for (int i = 1; i &lt;= 100; i++) {
            result += i;
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                System.out.println("Calculation interrupted");
                return;
            }
        }
    }
    
    public int getResult() {
        return result;
    }
}

void main() throws InterruptedException {
    Calculator calc = new Calculator();
    Thread calcThread = new Thread(calc);
    calcThread.start();
    
    System.out.println("Waiting for calculation to complete...");
    calcThread.join(); // Wait for calculation to finish
    System.out.println("Result: " + calc.getResult());
}

This example shows thread joining. The main thread waits for Calculator to
complete using join. Without joining, main might access the
result before calculation finishes. Joining ensures proper synchronization.

## Thread Priority

Thread priority hints to the scheduler about thread importance. Priorities range
from 1 (MIN_PRIORITY) to 10 (MAX_PRIORITY). The default is 5 (NORM_PRIORITY).
Higher priority threads get more CPU time but aren't guaranteed to run first.

Main.java
  

package com.zetcode;

class Counter implements Runnable {
    private String name;
    
    public Counter(String name) {
        this.name = name;
    }
    
    @Override
    public void run() {
        for (int i = 0; i &lt; 5; i++) {
            System.out.println(name + ": " + i);
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

void main() {
    Thread lowPriority = new Thread(new Counter("Low"));
    Thread highPriority = new Thread(new Counter("High"));
    
    lowPriority.setPriority(Thread.MIN_PRIORITY);
    highPriority.setPriority(Thread.MAX_PRIORITY);
    
    highPriority.start();
    lowPriority.start();
}

This example demonstrates thread priorities. The high priority thread often
executes before the low priority one, but this isn't guaranteed. Thread
scheduling depends on the JVM and operating system implementation.

## Thread Synchronization

Thread synchronization prevents concurrent access to shared resources. The
synchronized keyword creates critical sections that only one
thread can enter at a time. This prevents race conditions and data corruption.

Main.java
  

package com.zetcode;

class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}

class Incrementer implements Runnable {
    private Counter counter;
    
    public Incrementer(Counter counter) {
        this.counter = counter;
    }
    
    @Override
    public void run() {
        for (int i = 0; i &lt; 10000; i++) {
            counter.increment();
        }
    }
}

void main() throws InterruptedException {
    Counter counter = new Counter();
    Thread t1 = new Thread(new Incrementer(counter));
    Thread t2 = new Thread(new Incrementer(counter));
    
    t1.start();
    t2.start();
    
    t1.join();
    t2.join();
    
    System.out.println("Final count: " + counter.getCount());
}

This example shows thread synchronization. Without synchronized methods, the
final count might be less than 20000 due to race conditions. Synchronization
ensures atomic access to the count variable. The result is always 20000.

## Source

[Java Thread Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html)

This tutorial covered essential Thread class concepts with practical examples.
Understanding threads is crucial for writing concurrent Java applications.
Proper thread management ensures efficient resource utilization and responsiveness.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).