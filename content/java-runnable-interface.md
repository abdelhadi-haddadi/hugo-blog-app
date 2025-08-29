+++
title = "Java Runnable Interface"
date = 2025-08-29T19:59:53.813+01:00
draft = false
description = "Complete Java Runnable interface tutorial covering all aspects with examples. Learn how to create and run threads using Runnable."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Runnable Interface

Last modified: April 13, 2025

 

The java.lang.Runnable interface is a fundamental part of Java's
concurrency model. It represents a task that can be executed by a thread. Any
class whose instances need to be executed by a thread should implement this
interface.

The Runnable interface contains only one method: run. When an
object implementing Runnable is used to create a thread, starting the thread
causes the object's run method to be called in that separately executing
thread. This provides a way to define what code should run in a thread.

## Runnable Interface Definition

The Runnable interface is very simple, containing just one abstract method.
This makes it a functional interface, which means it can be used with lambda
expressions in Java 8 and later. Here's its definition:

@FunctionalInterface
public interface Runnable {
    public abstract void run();
}

The code above shows the complete definition of the Runnable interface. The
@FunctionalInterface annotation indicates it can be used with
lambda expressions. The interface requires implementing just the run method.

## Basic Runnable Implementation

This example demonstrates the most basic way to implement the Runnable interface
by creating a class that implements it. We then create a Thread object with our
Runnable and start it.

Main.java
  

package com.zetcode;

class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running...");
        for (int i = 1; i &lt;= 5; i++) {
            System.out.println("Count: " + i);
            try {
                Thread.sleep(500); // Pause for 500 milliseconds
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
        System.out.println("Thread finished.");
    }
}

public class Main {

    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread = new Thread(myRunnable);
        thread.start();
        
        System.out.println("Main thread continues to run...");
    }
}

In this example, we create a MyRunnable class that implements
Runnable. The run method contains the code that will execute in
the new thread. We create a Thread object with our Runnable instance and start
it with thread.start. The main thread continues executing while
the new thread runs concurrently.

## Runnable with Lambda Expression

With Java 8's lambda expressions, we can implement Runnable more concisely
without creating a separate class. This is possible because Runnable is a
functional interface with just one abstract method.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Using lambda expression to implement Runnable
        Runnable runnable = () -&gt; {
            System.out.println("Lambda thread running...");
            for (int i = 0; i &lt; 3; i++) {
                System.out.println("Working: " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Interrupted!");
                }
            }
            System.out.println("Lambda thread done.");
        };
        
        Thread thread = new Thread(runnable);
        thread.start();
        
        System.out.println("Main thread doing other work...");
    }
}

This example shows how to use a lambda expression to implement Runnable. The
lambda provides a more concise way to define the thread's behavior without
creating a separate class. The syntax () -&gt; { ... } implements the
single run method of the Runnable interface.

## Multiple Threads with Runnable

We can create multiple threads using the same Runnable instance. This is useful
when we want multiple threads to execute the same task. Each thread will have
its own execution path.

Main.java
  

package com.zetcode;

class CounterRunnable implements Runnable {
    private final String name;
    
    public CounterRunnable(String name) {
        this.name = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i &lt;= 5; i++) {
            System.out.println(name + ": " + i);
            try {
                Thread.sleep((long)(Math.random() * 1000));
            } catch (InterruptedException e) {
                System.out.println(name + " interrupted");
            }
        }
        System.out.println(name + " finished.");
    }
}

public class Main {

    public static void main(String[] args) {
        Runnable counter1 = new CounterRunnable("Counter 1");
        Runnable counter2 = new CounterRunnable("Counter 2");
        
        Thread thread1 = new Thread(counter1);
        Thread thread2 = new Thread(counter2);
        
        thread1.start();
        thread2.start();
        
        System.out.println("Main thread waiting for counters to finish...");
    }
}

In this example, we create two threads that share the same Runnable
implementation but with different names. Each thread counts to 5 with random
sleep intervals, showing how threads execute concurrently. The output will show
interleaved counts from both threads, demonstrating concurrent execution.

## Runnable with Anonymous Class

Before Java 8 introduced lambdas, anonymous classes were commonly used to
implement Runnable concisely. This approach is still valid and useful when you
need to access local variables from the enclosing method.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        final String message = "Hello from thread!";
        
        // Using anonymous class to implement Runnable
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(message);
                for (int i = 0; i &lt; 3; i++) {
                    System.out.println("Processing step " + (i + 1));
                    try {
                        Thread.sleep(800);
                    } catch (InterruptedException e) {
                        System.out.println("Processing interrupted");
                    }
                }
                System.out.println("Processing complete.");
            }
        });
        
        thread.start();
        
        System.out.println("Main thread continues execution...");
    }
}

This example demonstrates implementing Runnable using an anonymous class. The
anonymous class can access the message variable because it's
declared final. This approach is more verbose than lambdas but necessary when
working with Java versions before 8 or when needing to override multiple
methods.

## Runnable with Method Reference

Java 8 method references provide another concise way to implement Runnable when
you have an existing method that matches the Runnable's run method signature.
This is particularly useful for existing methods that take no parameters and
return void.

Main.java
  

package com.zetcode;

public class Main {
    public static void workerMethod() {
        System.out.println("Worker method executing in thread: " + 
                         Thread.currentThread().getName());
        for (int i = 0; i &lt; 4; i++) {
            System.out.println("Working on task " + (i + 1));
            try {
                Thread.sleep(600);
            } catch (InterruptedException e) {
                System.out.println("Work interrupted");
            }
        }
        System.out.println("Worker method completed.");
    }
    
    public static void main(String[] args) {
        // Using method reference to implement Runnable
        Thread thread = new Thread(Main::workerMethod);
        thread.start();
        
        System.out.println("Main thread doing other tasks...");
    }
}

In this example, we use a method reference Main::workerMethod to
implement Runnable. The workerMethod matches the signature of
run (no parameters, void return), so it can be used directly as
a Runnable. This approach is clean and works well when you have existing methods
that fit the Runnable interface.

## Runnable with Thread Pool

In real-world applications, it's often better to use thread pools rather than
creating threads directly. The Executor framework provides thread pool
implementations that can efficiently manage Runnable tasks.

Main.java
  

package com.zetcode;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class Task implements Runnable {
    private final int taskId;
    
    public Task(int id) {
        this.taskId = id;
    }
    
    @Override
    public void run() {
        System.out.println("Starting task " + taskId + 
                          " in thread: " + Thread.currentThread().getName());
        try {
            // Simulate work
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            System.out.println("Task " + taskId + " interrupted");
        }
        System.out.println("Completed task " + taskId);
    }
}

public class Main {

    public static void main(String[] args) {
        // Create a thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Submit 10 tasks to the pool
        for (int i = 1; i &lt;= 10; i++) {
            Runnable task = new Task(i);
            executor.execute(task);
        }
        
        // Shutdown the executor when done
        executor.shutdown();
        System.out.println("All tasks submitted to thread pool.");
    }
}

This example demonstrates using Runnable with a thread pool. We create a pool of
3 threads and submit 10 tasks to it. The pool manages task execution efficiently,
reusing threads rather than creating new ones for each task. Notice how only 3
tasks run concurrently, and others wait in the queue until a thread becomes
available.

## Runnable vs Thread

While both Runnable and Thread can be used to create threads, Runnable is
generally preferred because it separates the task from the thread execution
mechanism. This allows for more flexible designs where the same task can be
executed in different ways.

Main.java
  

package com.zetcode;

// Approach 1: Extending Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread approach: " + getName());
    }
}

// Approach 2: Implementing Runnable
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable approach: " + 
                         Thread.currentThread().getName());
    }
}

public class Main {

    public static void main(String[] args) {
        // Using Thread subclass
        MyThread thread1 = new MyThread();
        thread1.start();
        
        // Using Runnable
        Thread thread2 = new Thread(new MyRunnable());
        thread2.start();
        
        // Using lambda with Runnable
        Thread thread3 = new Thread(() -&gt; 
            System.out.println("Lambda Runnable: " + 
                             Thread.currentThread().getName()));
        thread3.start();
    }
}

This example compares the two approaches to creating threads in Java. The Runnable
approach is more flexible as it allows your class to extend another class if
needed. It also works better with modern Java features like lambdas and thread
pools. The Thread approach is simpler but less flexible as Java doesn't support
multiple inheritance.

## Source

[Java Runnable Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html)

In this tutorial, we've explored the Java Runnable interface in depth with
practical examples. Runnable is fundamental to Java's concurrency model and
understanding it is essential for writing multithreaded applications in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).