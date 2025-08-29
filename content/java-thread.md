+++
title = "Java Thread"
date = 2025-08-29T20:00:45.591+01:00
draft = false
description = "Java Thread tutorial introduces Java threads and lists their advandages and disadvantages. It mentions what kind of issues arise when working with threads in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Thread

last modified July 13, 2024

 

In this article we introduce Java threads and list their advandages and
disadvantages. We mention what kind of issues arise when working with threads. 
We show how to create simple threads in a few examples. 

A Java thread is a lightweight unit of execution within a program. It allows a
program to perform multiple tasks apparently concurrently. The Java virtual
machine allows an application to have multiple threads of execution running
concurrently.

Every Java program has at least one thread, known as the main thread. The Java
Virtual Machine creates this thread when the program starts, invoking the main
method.

The benefits of using Java threads are:

    
        Improves responsiveness: The program can keep the user interface
        responsive while performing long-running tasks in the background
        (separate threads).
    
    
        Efficient resource utilization: Threads share the memory of the main
        process, making them lighter than creating entirely new processes.
    

Common use cases for Java threads are:

    
        Performing long-running tasks in the background (e.g., downloading
        files, network communication).
    
    
        Updating a graphical user interface without blocking the main thread.
    
    
        Handling multiple client requests in a server application.
    

Since threads run concurrently, the *order of code execution is unpredictable.* 
When threads read and write the same variables, it can lead to concurrency
problems. To avoid this, share as few attributes between threads as possible and
use synchronization techniques.

## Multithreading issues

Multithreaded programs are inherently more complex than single-threaded ones.
This can lead to bugs that are hard to identify and reproduce.

Common concurrency issues include: 

    
        Race Conditions: When multiple threads access and modify shared data
        without proper synchronization, it can lead to unexpected and
        inconsistent results.
    
    
        Deadlocks: A deadlock occurs when two or more threads are waiting for
        resources held by each other, causing them to freeze indefinitely. 
    
    
        Starvation: When one thread is constantly being preempted by other
        threads with higher priority, it may never get a chance to run,
        effectively starving it of resources.
    

## Synchronization

Thread synchronization is the capability to control access to shared resources
by multiple threads. It ensures that only one thread can access a critical
section of code or a shared resource at a time. 

Synchronization techniques include:

    
        Synchronized Blocks: Use synchronized blocks or methods to control
        access to shared data. Only one thread can enter a synchronized block at
        a time, ensuring data consistency. 
    
    
        Concurrent Collections: Utilize thread-safe collections like
        ConcurrentHashMap or BlockingQueue instead of traditional collections when
        dealing with shared data structures.
    
    
        Semaphores and Mutexes: For more fine-grained control, consider using
        semaphores or mutexes to manage access to limited resources like file
        handles or network connections.
    

Note that ensuring thread safety by synchronizing access to shared resources can
introduce overhead. This can slow down our program compared to a single-threaded
approach.

## Creating threads

There are two main ways to create threads in Java: a) extending a  
Thread class or b) implementing the Runnable
interface.

Main.java
  

class Worker implements Runnable {

    @Override
    public void run() {
        System.out.println("worker is running");
    }
}

void main() {

    System.out.println("main thread started");

    var myRunnable = new Worker();
    var thread = new Thread(myRunnable);

    thread.start();

    System.out.println("main thread ended");
}

Here we create a Worker class that implements the
Runnable interface. The Runnable interface has only
one method, run, which defines the code to be executed by the
thread. The thread is started with the start method.

In the second example, the Worker class extends the
Thread class. 

Main.java
  

class Worker extends Thread {

    @Override
    public void run() {
        System.out.println("worker is running");
    }
}

void main() {

    System.out.println("main thread started");

    var myRunnable = new Worker();
    var thread = new Thread(myRunnable);

    thread.start();

    System.out.println("main thread ended");
}

In the example we extend from the Thread class and override the
run method. The run method defines the code that is
executed by the thread.

## Thread.sleep

The Thread.sleep(ms) method is used to pause the execution of
the current thread for a specified period of time measured in milliseconds. 

Main.java
  

class Task implements Runnable {

    private int delay;
    private String name;

    public Task(String name, int delay) {

        this.name = name;
        this.delay = delay;
    }

    @Override
    public void run() {

        try {
            System.out.printf("starting task %s%n", this.name);
            Thread.sleep(delay);
            System.out.printf("finishing task %s%n", this.name);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

void main() {

    var task1 = new Task("Task 2000", 2000);
    var t1 = new Thread(task1);
    t1.start();

    var task2 = new Task("Task 1000", 1000);
    var t2 = new Thread(task2);
    t2.start();

    var task3 = new Task("Task 500", 500);
    var t3 = new Thread(task3);
    t3.start();

    System.out.println("tasks launched");
}

The Task implementing sleeps for the specified amount of
milliseconds. We start three threads in the main application thread. They 
sleep for 2s, 1s and 500ms. 

$ java Main.java
tasks launched
starting task Task 1000
starting task Task 2000
starting task Task 500
finishing task Task 500
finishing task Task 1000
finishing task Task 2000

First, the main program thread finishes. The three threads start in
unpredictable order. They finish later depending on their sleep value.

## Thread join method

The Thread join method is used to synchronize the
execution of threads.

Use cases of the method:

    
        Waiting for a background thread to complete a task before proceeding in
        the main thread.
    
    
        Ensuring the completion of initialization tasks in a thread before using
        them in the main thread.
    
    
        Synchronizing access to shared resources between threads.
    

Main.java
  

class Worker extends Thread {

    private int delay;
    private String msg;

    public Worker(int delay, String msg) {

        this.delay = delay;
        this.msg = msg;
    }

    public void run() {

        try {
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(msg);
    }
}

void main() {

    var w1 = new Worker(2000, "Hello there");
    var w2 = new Worker(1000, "New mail received");
    var w3 = new Worker(500, "Notes taken");

    // start three threads
    w1.start();
    w2.start();
    w3.start();

    // wait for threads to end
    try {

        // join is a blocker method which waits for a thread to complete.

        // the w1.join() causes the current (main) thread to pause execution
        // until w1's thread terminates.
        w1.join();
        w2.join();
        w3.join();

    } catch (InterruptedException e) {

        e.printStackTrace();
    }

    System.out.println("finished tasks");
}

In the program, we start three additional threads. Using join
methods, we pause the execution of the main thread for the duration of the three 
threads.

$ java Main.java
Notes taken
New mail received
Hello there
finished tasks

The *finished tasks* appears after the three threads end their tasks.

## SwingWorker

SwingWorker is designed specifically to run long-running tasks in a separate
thread away from the Swing Event Dispatch Thread (EDT). It simplifies performing
long-running tasks in the background while keeping the EDT responsive.

The long-running task is placed in the  doInBackground method. This
method runs on a separate thread, freeing the EDT to handle UI updates.

com/zetcode/ButtonTaskEx.java
  

package com.zetcode;

import javax.swing.GroupLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.SwingWorker;
import java.awt.EventQueue;

class MyWorker extends SwingWorker&lt;Void, Void&gt; {

    @Override
    protected Void doInBackground() throws Exception {
        // Simulate a time-consuming task
        Thread.sleep(3000);
        return null;
    }

    @Override
    protected void done() {
        System.out.println("task done");
    }
}

public class ButtonTaskEx extends JFrame {

    public ButtonTaskEx() {

        initUI();
    }

    private void initUI() {

        var taskButton = new JButton("Task");

        taskButton.addActionListener((event) -&gt; {
            var worker = new MyWorker();
            worker.execute();
        });

    //    taskButton.addActionListener((event) -&gt; {
    //        try {
    //            Thread.sleep(3000);
    //           System.out.println("task done");
    //        } catch (InterruptedException e) {
    //            throw new RuntimeException(e);
    //        }
    //    });

        createLayout(taskButton);

        setTitle("Task button");
        setSize(500, 450);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {

        var pane = getContentPane();
        var gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setAutoCreateContainerGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );

        gl.setVerticalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {

            var ex = new ButtonTaskEx();
            ex.setVisible(true);
        });
    }
}

In the program we have a button that starts a 3s background task. If we place 
the task in the SwingWorker, the application stays responsive. 
Otherwise, the application freezes for the duration of the task. 

## Source

[Java Thread - reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html)

In this article we defined Java threads and provided some basic code examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).