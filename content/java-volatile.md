+++
title = "Java volatile"
date = 2025-08-29T20:00:56.698+01:00
draft = false
description = "Java volatile tutorial shows how to work with the volatile keyword in Java. The volatile keyword is used to ensure visibility of changes in threads."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java volatile

last modified July 16, 2024

 

In this article we define the Java volatile keyword and show how to use it.

The volatile keyword in Java is a type of variable modifier that
tells the Java Virtual Machine (JVM) that a variable can be accessed and
modified by multiple threads.

The volatile keyword servers the problem of visibility in
multithreaded programs. It ensures that changes made to a variable are
immediately visible to other threads.

A volatile variable's value is always read from and written to main memory. This
prevents threads from seeing outdated values cached in CPU registers or caches.
This is crucial for multithreaded programming where multiple threads might
access the same variable concurrently. In other words it ensures that every read
of a volatile variable is directly from the computer's main memory (not from CPU
cache), and every write to a volatile variable is written to main memory (not
just to CPU registers).

Key points:

    
        volatile ensures visibility of changes to other threads.
    
    
        It doesn't guarantee atomicity (indivisibility) of operations.
    
    
        volatile is useful for flags, counters, or other variables
        where only visibility is required.
    
    
        For scenarios requiring both visibility and atomicity, synchronized
        blocks or methods are preferred.
    

## Happens-Before Relationship

A key concept in the Java Memory Model (JMM) is "happens-before." This defines
the order in which operations must be seen by all threads. The write to a
volatile variable establishes a happens-before relationship with all subsequent
reads of the same variable. This means any changes made to other variables
before the volatile write become visible to the thread reading the volatile
variable after the write.

## Flag example

In the next example, we have a worker that runs until the flag set to false.

Main.java
  

class Worker implements Runnable {

    private volatile boolean isRunning = false;

    public void setRunning() {
        isRunning = true;
    }

    public void stopTask() {
        isRunning = false;
    }

    public boolean isRunning() {
        return isRunning;
    }

    @Override
    public void run() {

        System.out.println("worker started");

        while (isRunning) {

            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }

            System.out.println("doing task " + System.currentTimeMillis());
        }

        System.out.println(isRunning);
        System.out.println("worker ended");
    }
}

void main() throws InterruptedException {

    System.out.println("Main thread started");
    final var worker = new Worker();
    worker.setRunning();

    // Thread to start the task
    var starter = new Thread(worker);
    starter.start();

    Thread.sleep(2000);

    // Thread to stop the task using the flag
    var stopper = new Thread(() -&gt; {

        if (worker.isRunning()) {
            worker.stopTask();
            System.out.println("stopping task");
        }
    });

    stopper.start();

    starter.join();
//    stopper.join();

    System.out.println("Main thread ended");
}

The isRunning flag controls the execution of the run
method in the Worker class. The while loop continuously checks the
value of isRunning. If another thread modifies the value of
isRunning (e.g., by calling stopTask), the change will
be immediately visible to the thread executing the loop.

Without volatile, different threads might have their own local
copies of isRunning, leading to data inconsistency.

In our case, only visibility was important. If we also needed to ensure
atomicity of operations, we would need to choose synchronized methods or other
tools instead.

## Source

[Threads and Locks - Java language specification](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html)

In this article we have worked with the volatile keyword in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).