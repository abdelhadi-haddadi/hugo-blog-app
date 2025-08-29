+++
title = "Java ThreadLocal Class"
date = 2025-08-29T19:59:57.283+01:00
draft = false
description = "Complete Java ThreadLocal class tutorial covering all methods with examples. Learn about thread-local variables in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ThreadLocal Class

Last modified: April 13, 2025

 

The java.lang.ThreadLocal class provides thread-local variables.
These variables differ from normal variables in that each thread has its own
independently initialized copy of the variable. ThreadLocal instances are
typically private static fields in classes.

ThreadLocal is useful when you want to maintain per-thread state without
requiring synchronization. Common use cases include storing user sessions,
transaction contexts, or other thread-specific data that needs to be isolated
from other threads.

## ThreadLocal Basics

ThreadLocal provides thread confinement by creating a separate copy of the
variable for each thread. The main methods include get,
set, remove, and initialValue.

public class ThreadLocal&lt;T&gt; {
    public T get() {...}
    public void set(T value) {...}
    public void remove() {...}
    protected T initialValue() {...}
}

The code above shows the main methods provided by ThreadLocal. The generic type
T represents the type of value stored in the thread-local variable.

## Basic ThreadLocal Example

This example demonstrates the basic usage of ThreadLocal. We create a simple
counter that maintains separate counts for each thread.

Main.java
  

package com.zetcode;

public class ThreadLocalExample {
    private static final ThreadLocal&lt;Integer&gt; threadLocalCounter = 
        ThreadLocal.withInitial(() -&gt; 0);

    public static void main(String[] args) {
        Runnable task = () -&gt; {
            int counter = threadLocalCounter.get();
            threadLocalCounter.set(counter + 1);
            System.out.println(Thread.currentThread().getName() + 
                ": " + threadLocalCounter.get());
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);
        Thread thread3 = new Thread(task);

        thread1.start();
        thread2.start();
        thread3.start();
    }
}

Each thread gets its own copy of the counter initialized to 0. When a thread
increments its counter, it doesn't affect counters in other threads. The output
shows each thread maintaining its own count independently.

## ThreadLocal with InitialValue

This example shows how to override the initialValue method to
provide a custom initial value for each thread's copy of the variable.

Main.java
  

package com.zetcode;

public class ThreadLocalInitialValue {
    private static final ThreadLocal&lt;String&gt; threadLocal = 
        new ThreadLocal&lt;&gt;() {
            @Override
            protected String initialValue() {
                return "Initial-" + Thread.currentThread().getName();
            }
        };

    public static void main(String[] args) {
        Runnable task = () -&gt; {
            System.out.println(Thread.currentThread().getName() + 
                ": " + threadLocal.get());
            threadLocal.set("Modified-" + Thread.currentThread().getName());
            System.out.println(Thread.currentThread().getName() + 
                ": " + threadLocal.get());
        };

        new Thread(task, "Thread-1").start();
        new Thread(task, "Thread-2").start();
    }
}

Each thread starts with its own initial value containing the thread name. We then
modify the value in each thread independently. The output demonstrates that
changes in one thread don't affect other threads' values.

## ThreadLocal in Web Applications

ThreadLocal is commonly used in web applications to store per-request data like
user sessions or transaction contexts. This example simulates a web request
handler.

Main.java
  

package com.zetcode;

public class WebRequestSimulator {
    private static final ThreadLocal&lt;String&gt; userSession = new ThreadLocal&lt;&gt;();

    static class RequestHandler implements Runnable {
        private final String userId;

        RequestHandler(String userId) {
            this.userId = userId;
        }

        @Override
        public void run() {
            userSession.set("Session-" + userId);
            try {
                System.out.println(Thread.currentThread().getName() + 
                    " processing request for user: " + userId);
                System.out.println("Session ID: " + userSession.get());
                Thread.sleep(100); // Simulate request processing
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                userSession.remove(); // Clean up
            }
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 1; i &lt;= 5; i++) {
            executor.execute(new RequestHandler("User" + i));
        }
        executor.shutdown();
    }
}

This example simulates handling web requests in a thread pool. Each request gets
its own session stored in the ThreadLocal. The finally block
ensures cleanup with remove to prevent memory leaks in thread
pools.

## ThreadLocal with SimpleDateFormat

SimpleDateFormat is not thread-safe, making ThreadLocal an ideal solution for
sharing it across multiple threads. This example demonstrates this pattern.

Main.java
  

package com.zetcode;

public class DateFormatExample {
    private static final ThreadLocal&lt;SimpleDateFormat&gt; dateFormat = 
        ThreadLocal.withInitial(() -&gt; new SimpleDateFormat("yyyy-MM-dd"));

    static class DatePrinter implements Runnable {
        private final Date date;

        DatePrinter(Date date) {
            this.date = date;
        }

        @Override
        public void run() {
            String formattedDate = dateFormat.get().format(date);
            System.out.println(Thread.currentThread().getName() + 
                ": " + formattedDate);
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        Date today = new Date();

        for (int i = 0; i &lt; 5; i++) {
            executor.execute(new DatePrinter(today));
        }

        executor.shutdown();
    }
}

Each thread gets its own SimpleDateFormat instance, avoiding synchronization
issues. This is more efficient than creating a new SimpleDateFormat for each
format operation or synchronizing access to a shared instance.

## ThreadLocal for Context Passing

ThreadLocal can be used to pass context through multiple method calls without
explicitly passing parameters. This example shows a transaction context.

Main.java
  

package com.zetcode;

public class TransactionContext {
    private static final ThreadLocal&lt;String&gt; transactionId = new ThreadLocal&lt;&gt;();

    static void startTransaction(String id) {
        transactionId.set(id);
        System.out.println("Started transaction: " + id);
    }

    static void processTransaction() {
        System.out.println("Processing transaction: " + transactionId.get());
    }

    static void commitTransaction() {
        System.out.println("Committing transaction: " + transactionId.get());
        transactionId.remove();
    }

    static class TransactionTask implements Runnable {
        private final String id;

        TransactionTask(String id) {
            this.id = id;
        }

        @Override
        public void run() {
            try {
                startTransaction(id);
                processTransaction();
                commitTransaction();
            } catch (Exception e) {
                transactionId.remove(); // Clean up on error
            }
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(new TransactionTask("TXN-001"));
        executor.execute(new TransactionTask("TXN-002"));
        executor.shutdown();
    }
}

The transaction ID is stored in ThreadLocal and accessed by multiple methods
without being passed as a parameter. Each thread maintains its own transaction
context, and the ID is properly cleaned up after the transaction completes.

## ThreadLocal with InheritableThreadLocal

InheritableThreadLocal allows child threads to inherit values from parent
threads. This example demonstrates this behavior.

Main.java
  

package com.zetcode;

public class InheritableThreadLocalExample {
    private static final ThreadLocal&lt;String&gt; regularThreadLocal = 
        new ThreadLocal&lt;&gt;();
    private static final InheritableThreadLocal&lt;String&gt; inheritableThreadLocal = 
        new InheritableThreadLocal&lt;&gt;();

    public static void main(String[] args) {
        regularThreadLocal.set("Parent Thread Value");
        inheritableThreadLocal.set("Parent Thread Value");

        Thread childThread = new Thread(() -&gt; {
            System.out.println("Regular ThreadLocal in child: " + 
                regularThreadLocal.get());
            System.out.println("InheritableThreadLocal in child: " + 
                inheritableThreadLocal.get());
        });

        childThread.start();
    }
}

The child thread can access the value set in the parent thread through
InheritableThreadLocal but not through regular ThreadLocal. This is useful when
you need to pass context to child threads while maintaining thread safety.

## ThreadLocal Memory Leak Prevention

ThreadLocal can cause memory leaks if not used properly, especially in thread
pools. This example shows proper cleanup.

Main.java
  

package com.zetcode;

public class ThreadLocalCleanup {
    private static final ThreadLocal&lt;byte[]&gt; bigData = new ThreadLocal&lt;&gt;();

    static class Task implements Runnable {
        @Override
        public void run() {
            try {
                // Store large data in ThreadLocal
                bigData.set(new byte[10 * 1024 * 1024]); // 10MB
                System.out.println("Stored data in " + 
                    Thread.currentThread().getName());
            } finally {
                // Critical: remove to prevent memory leak
                bigData.remove();
                System.out.println("Cleaned up in " + 
                    Thread.currentThread().getName());
            }
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        for (int i = 0; i &lt; 5; i++) {
            executor.execute(new Task());
        }
        executor.shutdown();
    }
}

This example demonstrates proper cleanup of ThreadLocal variables. The
finally block ensures removal even if an exception occurs. Without
this cleanup, thread pool threads would retain references to the large byte
arrays, causing memory leaks.

## Source

[Java ThreadLocal Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/ThreadLocal.html)

In this article, we've covered the Java ThreadLocal class with practical
examples. ThreadLocal is a powerful tool for managing per-thread state without
synchronization, but must be used carefully to avoid memory leaks.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).