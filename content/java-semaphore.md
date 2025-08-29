+++
title = "Java Semaphore"
date = 2025-08-29T20:00:30.163+01:00
draft = false
description = "Java Semaphore tutorial shows how to synchronize Java threads using Semaphore for resource management."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Semaphore

last modified February 15, 2025

 

In this article we show how to synchronize Java threads using Semaphore.

Semaphore is a synchronization tool that controls access to a
shared resource through a set of permits. It is useful for managing limited
resources, such as database connections or thread pools, where only a certain
number of threads can access the resource simultaneously.

A Semaphore is initialized with a number of permits. Threads can
acquire a permit using the acquire method and release it using the
release method. If no permits are available, the thread will block
until a permit is released by another thread.

## Semaphore Example

The following example demonstrates how to use Semaphore to control
access to a shared resource.

Main.java
  

import java.util.concurrent.Semaphore;

class SharedResource {
    private final Semaphore semaphore;

    public SharedResource(int permits) {
        this.semaphore = new Semaphore(permits);
    }

    public void useResource() {
        try {
            semaphore.acquire(); // Acquire a permit
            System.out.println(Thread.currentThread().getName() + " is using the resource");
            Thread.sleep(2000); // Simulate resource usage
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            System.out.println(Thread.currentThread().getName() + " is releasing the resource");
            semaphore.release(); // Release the permit
        }
    }
}

class Worker implements Runnable {
    private final SharedResource sharedResource;

    public Worker(SharedResource sharedResource) {
        this.sharedResource = sharedResource;
    }

    @Override
    public void run() {
        sharedResource.useResource();
    }
}

void main() throws InterruptedException {
    SharedResource sharedResource = new SharedResource(2); // Allow 2 permits

    Thread t1 = new Thread(new Worker(sharedResource), "Thread-1");
    Thread t2 = new Thread(new Worker(sharedResource), "Thread-2");
    Thread t3 = new Thread(new Worker(sharedResource), "Thread-3");
    Thread t4 = new Thread(new Worker(sharedResource), "Thread-4");

    t1.start();
    t2.start();
    t3.start();
    t4.start();

    t1.join();
    t2.join();
    t3.join();
    t4.join();
}

In this program, a Semaphore is used to limit access to a shared
resource. Only two threads can access the resource at a time, as the semaphore
is initialized with two permits.

private final Semaphore semaphore;

public SharedResource(int permits) {
    this.semaphore = new Semaphore(permits);
}

The SharedResource class is initialized with a
Semaphore that has a specified number of permits.

semaphore.acquire(); // Acquire a permit

A thread acquires a permit before accessing the resource. If no permits are
available, the thread will block.

semaphore.release(); // Release the permit

After using the resource, the thread releases the permit, allowing other threads
to acquire it.

SharedResource sharedResource = new SharedResource(2); // Allow 2 permits

The SharedResource is initialized with two permits, meaning only
two threads can access the resource simultaneously.

$ java Main.java
Thread-1 is using the resource
Thread-2 is using the resource
Thread-1 is releasing the resource
Thread-2 is releasing the resource
Thread-3 is using the resource
Thread-4 is using the resource
Thread-3 is releasing the resource
Thread-4 is releasing the resource

## Semaphore with Fairness

The following example demonstrates how to use a Semaphore with fairness. When fairness is enabled, threads acquire permits in the order they requested them.

Main.java
  

import java.util.concurrent.Semaphore;

class SharedResource {
    private final Semaphore semaphore;

    public SharedResource(int permits, boolean fair) {
        this.semaphore = new Semaphore(permits, fair);
    }

    public void useResource() {
        try {
            semaphore.acquire(); // Acquire a permit
            System.out.println(Thread.currentThread().getName() + " is using the resource");
            Thread.sleep(2000); // Simulate resource usage
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            System.out.println(Thread.currentThread().getName() + " is releasing the resource");
            semaphore.release(); // Release the permit
        }
    }
}

class Worker implements Runnable {
    private final SharedResource sharedResource;

    public Worker(SharedResource sharedResource) {
        this.sharedResource = sharedResource;
    }

    @Override
    public void run() {
        sharedResource.useResource();
    }
}

void main() throws InterruptedException {
    SharedResource sharedResource = new SharedResource(2, true); // Allow 2 permits with fairness

    Thread t1 = new Thread(new Worker(sharedResource), "Thread-1");
    Thread t2 = new Thread(new Worker(sharedResource), "Thread-2");
    Thread t3 = new Thread(new Worker(sharedResource), "Thread-3");
    Thread t4 = new Thread(new Worker(sharedResource), "Thread-4");

    t1.start();
    t2.start();
    t3.start();
    t4.start();

    t1.join();
    t2.join();
    t3.join();
    t4.join();
}

In this program, the Semaphore is initialized with fairness
enabled. This ensures that threads acquire permits in the order they requested
them.

public SharedResource(int permits, boolean fair) {
    this.semaphore = new Semaphore(permits, fair);
}

The Semaphore is initialized with fairness enabled, ensuring that
threads acquire permits in the order they requested them.

$ java Main.java
Thread-1 is using the resource
Thread-2 is using the resource
Thread-1 is releasing the resource
Thread-2 is releasing the resource
Thread-3 is using the resource
Thread-4 is using the resource
Thread-3 is releasing the resource
Thread-4 is releasing the resource

## Thread Pool with Semaphore Example

The following example demonstrates how to use a Semaphore to
implement a thread pool. The thread pool limits the number of concurrent tasks
being executed to a fixed size.

Main.java
  

import java.util.concurrent.Semaphore;

class Task implements Runnable {
    private final int taskId;
    private final Semaphore semaphore;

    public Task(int taskId, Semaphore semaphore) {
        this.taskId = taskId;
        this.semaphore = semaphore;
    }

    @Override
    public void run() {
        try {
            semaphore.acquire(); // Acquire a permit
            System.out.println("Task " + taskId + " is running on " + Thread.currentThread().getName());
            Thread.sleep(2000); // Simulate task execution
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            System.out.println("Task " + taskId + " is completed");
            semaphore.release(); // Release the permit
        }
    }
}

void main() throws InterruptedException {
    int poolSize = 3; // Maximum number of concurrent tasks
    Semaphore semaphore = new Semaphore(poolSize);

    // Create and start 10 tasks
    for (int i = 1; i &lt;= 10; i++) {
        Thread thread = new Thread(new Task(i, semaphore));
        thread.start();
    }

    // Wait for all tasks to complete
    Thread.sleep(10000); // Adjust sleep time as needed
    System.out.println("All tasks completed");
}

In this program, a Semaphore is used to limit the number of
concurrent tasks being executed to a fixed size (3 in this case). Each task
acquires a permit before execution and releases it after completion.

semaphore.acquire(); // Acquire a permit

A task acquires a permit before starting execution. If no permits are available,
the task will block until a permit is released.

semaphore.release(); // Release the permit

After completing execution, the task releases the permit, allowing another task to acquire it.

int poolSize = 3; // Maximum number of concurrent tasks
Semaphore semaphore = new Semaphore(poolSize);

The Semaphore is initialized with a pool size of 3, meaning only 3
tasks can run concurrently.

$ java Main.java
Task 1 is running on Thread-0
Task 2 is running on Thread-1
Task 3 is running on Thread-2
Task 1 is completed
Task 4 is running on Thread-3
Task 2 is completed
Task 5 is running on Thread-4
Task 3 is completed
Task 6 is running on Thread-5
Task 4 is completed
Task 7 is running on Thread-6
Task 5 is completed
Task 8 is running on Thread-7
Task 6 is completed
Task 9 is running on Thread-8
Task 7 is completed
Task 10 is running on Thread-9
Task 8 is completed
Task 9 is completed
Task 10 is completed
All tasks completed

## Source

[Java Semaphore - reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Semaphore.html)

In this article we have shown how to synchronize Java threads using Semaphore
for resource management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).