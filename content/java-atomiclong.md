+++
title = "Java AtomicLong"
date = 2025-08-29T19:58:05.555+01:00
draft = false
description = "Java AtomicLong tutorial explores how to use AtomicLong for thread-safe manipulation of long values in concurrent applications. Learn about atomic operations, synchronization techniques, and best practices for multithreading in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java AtomicLong

last modified May 25, 2025

 

In this article, we work with Java's AtomicLong.

AtomicLong provides a long variable that can be read and written
atomically. It ensures that operations on the variable are thread-safe,
preventing issues like lost updates in concurrent environments.

AtomicLong is a class within the java.util.concurrent.atomic
package that provides an atomic and thread-safe way to represent and manipulate
a long primitive data type.

AtomicLong is a synchronization primitive. It provides atomic
operations for long values, ensuring thread-safe access and modification. Unlike
traditional locks, which can introduce performance overhead,
AtomicLong leverages low-level atomic instructions to maintain data
consistency without blocking threads. Its primary purpose is to handle
concurrent updates efficiently while avoiding race conditions.

Key characteristics:

    
        *Atomic operations:* AtomicLong guarantees that read
        and write operations on the underlying long value are atomic. This means
        each operation executes as a single, indivisible unit, even if multiple
        threads are trying to access the value concurrently. This prevents
        inconsistencies and data races that can occur with regular long
        variables in a multithreaded environment.
    
    
        *Thread-safety:* By ensuring atomic operations,
        AtomicLong makes it safe to use the same long value across
        multiple threads without requiring explicit synchronization mechanisms
        like locks. This simplifies thread-safe programming and reduces the risk
        of concurrency issues.
    
    
        *Common operations:* The class provides various methods for
        atomically performing operations on the long value, such as retrieving
        the current value, setting a new value, incrementing or decrementing the
        value, and performing compare-and-swap operations.
    

Benefits of using AtomicLong:

    
        *Prevents data races:* Guaranteeing atomic operations avoids
        inconsistencies that can arise when multiple threads try to read or
        write the same long value simultaneously.
    
    
        *Simplifies concurrent programming:* Eliminates the need for
        complex synchronization code in scenarios where multiple threads access
        a long variable.
    
    
        *Improved performance:* Atomic operations can be more efficient
        than using locks, particularly for frequently accessed variables.
    

Use cases for AtomicLong:

    
        *Counters:* AtomicLong is ideal for representing
        counters that are incremented or decremented by multiple threads in a
        concurrent environment, such as tracking website visitors or active
        network connections.
    
    
        *Sequence numbers:* It can be used to generate unique and
        atomically incremented sequence numbers, useful for purposes like
        logging or transaction IDs.
    
    
        *State flags:* AtomicLong can serve as a simple flag
        variable that multiple threads can set or reset atomically, indicating a
        specific state or condition.
    

## Counter example

In the next example, we generate 500 threads. Each thread increments a counter. 

Main.java
  

class Counter {

    private final AtomicLong counter = new AtomicLong(0);

    public void inc() {

        counter.getAndIncrement();
    }

    public long get() {

        return counter.get();
    }
}

void main() throws InterruptedException {

    final Counter counter = new Counter();

    // 500 threads
    for (int i = 0; i &lt; 500; i++){

        var thread = new Thread(counter::inc);

        thread.start();
    }

    // sleep three seconds
    Thread.sleep(3000);

    System.out.println("Value: " + counter.get());
}

In the end, the counter should be 500. 

private final AtomicLong counter = new AtomicLong(0);

The counter is an AtomicLong initiated to 0. 

public void inc() {

    counter.getAndIncrement();
}

The inc method increments the counters safely. 

public long get() {

    return counter.get();
}

The get method returns the current value of the counter. 

## Source

[Java AtomicLong - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/atomic/AtomicLong.html)

In this article we have worked with AtomicLong in Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).