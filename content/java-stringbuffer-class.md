+++
title = "Java StringBuffer Class"
date = 2025-08-29T19:59:56.174+01:00
draft = false
description = "Complete Java StringBuffer class tutorial covering all methods with examples. Learn about append, insert, delete, reverse and other StringBuffer methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringBuffer Class

Last modified: April 13, 2025

 

The java.lang.StringBuffer class is a thread-safe, mutable sequence
of characters. Unlike String objects, StringBuffer can be modified after
creation. It provides various methods for string manipulation operations.

StringBuffer is similar to StringBuilder but with one key difference: all its
methods are synchronized, making it thread-safe. This makes StringBuffer a good
choice when working with strings in multi-threaded environments.

## StringBuffer Class Methods

The StringBuffer class provides many methods for string manipulation. These
include methods for appending, inserting, deleting, and reversing content. The
class also provides capacity management methods.

public final class StringBuffer {
    public StringBuffer() {...}
    public StringBuffer(int capacity) {...}
    public StringBuffer(String str) {...}
    public synchronized StringBuffer append(...) {...}
    public synchronized StringBuffer insert(...) {...}
    public synchronized StringBuffer delete(...) {...}
    public synchronized StringBuffer reverse() {...}
    public synchronized int length() {...}
    public synchronized int capacity() {...}
    public synchronized void ensureCapacity(int minimum) {...}
    public synchronized char charAt(int index) {...}
    public synchronized void setCharAt(int index, char ch) {...}
    public synchronized String substring(...) {...}
    public synchronized String toString() {...}
}

The code above shows the main methods provided by the StringBuffer class. These
methods allow for flexible string manipulation while maintaining thread safety.

## Creating StringBuffer Objects

StringBuffer objects can be created in several ways: with no initial content,
with an initial string, or with a specified initial capacity. The capacity
determines how much memory is initially allocated.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Empty StringBuffer with default capacity (16)
        StringBuffer sb1 = new StringBuffer();
        System.out.println("sb1 capacity: " + sb1.capacity());
        
        // StringBuffer with initial string
        StringBuffer sb2 = new StringBuffer("Hello");
        System.out.println("sb2 content: " + sb2);
        System.out.println("sb2 capacity: " + sb2.capacity());
        
        // StringBuffer with specified capacity
        StringBuffer sb3 = new StringBuffer(50);
        System.out.println("sb3 capacity: " + sb3.capacity());
        
        // Adding content to empty buffer
        sb1.append("Java StringBuffer");
        System.out.println("sb1 content: " + sb1);
    }
}

This example demonstrates different ways to create StringBuffer objects. The
default constructor creates an empty buffer with capacity 16. The String
constructor creates a buffer with the string content and appropriate capacity.

## append Method

The append method adds content to the end of the StringBuffer. It
is overloaded to accept various data types including primitives, objects, and
character arrays. The method returns the same StringBuffer for method chaining.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer();
        
        // Appending different types
        sb.append("String: ");
        sb.append(100);       // int
        sb.append(' ');       // char
        sb.append(true);      // boolean
        sb.append(3.14);      // double
        sb.append(new char[]{'a', 'b', 'c'}); // char array
        
        System.out.println("After append: " + sb);
        
        // Method chaining
        sb.append(" more ").append("text");
        System.out.println("After chaining: " + sb);
        
        // Capacity grows automatically
        System.out.println("Final capacity: " + sb.capacity());
    }
}

This example shows how the append method can handle different data
types. The StringBuffer automatically grows its capacity when needed. Method
chaining allows for concise code by returning the StringBuffer reference.

## insert Method

The insert method adds content at a specified position in the
StringBuffer. Like append, it supports various data types. The position must be
within the current bounds of the buffer.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java is great");
        
        // Insert at position 4
        sb.insert(4, " programming");
        System.out.println("After first insert: " + sb);
        
        // Insert different types
        sb.insert(0, 2023);   // int
        sb.insert(4, ' ');    // char
        sb.insert(5, true);   // boolean
        
        System.out.println("After multiple inserts: " + sb);
        
        // Insert at the end (same as append)
        sb.insert(sb.length(), " language");
        System.out.println("Final result: " + sb);
        
        // Invalid position throws exception
        try {
            sb.insert(100, "error");
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This example demonstrates the insert method with different data
types. We show valid insert positions and what happens when attempting to insert
at an invalid position. Inserting at length() is equivalent to append.

## delete and deleteCharAt Methods

The delete method removes a sequence of characters between specified
indices. The deleteCharAt method removes a single character at a
specified position. Both methods adjust the buffer contents accordingly.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Java StringBuffer Example");
        
        // Delete range (start inclusive, end exclusive)
        sb.delete(5, 17);
        System.out.println("After delete: " + sb);
        
        // Delete single character
        sb.deleteCharAt(5);
        System.out.println("After deleteCharAt: " + sb);
        
        // Delete from start
        sb.delete(0, 4);
        System.out.println("After deleting first word: " + sb);
        
        // Delete to end
        sb.delete(5, sb.length());
        System.out.println("After deleting suffix: " + sb);
        
        // Invalid indices throw exception
        try {
            sb.delete(10, 5);
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}

This example shows various deletion operations. The delete method removes
characters between two indices (start inclusive, end exclusive). We demonstrate
deleting ranges, single characters, and handling invalid indices.

## reverse Method

The reverse method reverses the sequence of characters in the
StringBuffer. This operation is performed in place, modifying the original
buffer. The method returns the StringBuffer reference for method chaining.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer("Hello World");
        
        System.out.println("Original: " + sb);
        
        // Reverse the content
        sb.reverse();
        System.out.println("Reversed: " + sb);
        
        // Reverse back to original
        sb.reverse();
        System.out.println("Reversed again: " + sb);
        
        // Palindrome check
        StringBuffer palindrome = new StringBuffer("madam");
        System.out.println(palindrome + " is palindrome: " + 
            palindrome.toString().equals(palindrome.reverse().toString()));
        
        // Method chaining
        System.out.println(new StringBuffer("abc")
            .append("def")
            .reverse()
            .insert(3, "---"));
    }
}

This example demonstrates the reverse method. We show simple
reversal, palindrome checking, and method chaining combining reverse with other
StringBuffer operations. The reversal affects the original buffer directly.

## Capacity Management

StringBuffer manages memory using a capacity system. The capacity is the amount
of allocated memory, while length is the actual content size. Methods like
ensureCapacity and setLength help manage this.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Default capacity is 16
        StringBuffer sb = new StringBuffer();
        System.out.println("Initial capacity: " + sb.capacity());
        System.out.println("Initial length: " + sb.length());
        
        // Adding content grows capacity as needed
        sb.append("This is a long string that exceeds default capacity");
        System.out.println("After append - capacity: " + sb.capacity());
        System.out.println("After append - length: " + sb.length());
        
        // Ensure minimum capacity
        sb.ensureCapacity(100);
        System.out.println("After ensureCapacity(100): " + sb.capacity());
        
        // Set explicit length
        sb.setLength(10);
        System.out.println("After setLength(10): " + sb);
        System.out.println("New length: " + sb.length());
        
        // Trim to size
        sb.trimToSize();
        System.out.println("After trimToSize - capacity: " + sb.capacity());
    }
}

This example demonstrates StringBuffer capacity management. The buffer
automatically grows when needed, but we can also pre-allocate space with
ensureCapacity. setLength can truncate or expand the
content, while trimToSize reduces capacity to match length.

## Thread Safety Demonstration

StringBuffer's thread safety makes it suitable for multi-threaded environments.
Multiple threads can safely call StringBuffer methods without external
synchronization. This example demonstrates this behavior.

Main.java
  

package com.zetcode;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        final StringBuffer sharedBuffer = new StringBuffer();
        
        // Create multiple threads that append to the same buffer
        Thread[] threads = new Thread[5];
        for (int i = 0; i &lt; threads.length; i++) {
            final int threadId = i;
            threads[i] = new Thread(() -&gt; {
                for (int j = 0; j &lt; 10; j++) {
                    sharedBuffer.append("Thread " + threadId + ": " + j + "\n");
                    try {
                        Thread.sleep(10); // Simulate work
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            });
        }
        
        // Start all threads
        for (Thread t : threads) {
            t.start();
        }
        
        // Wait for all threads to complete
        for (Thread t : threads) {
            t.join();
        }
        
        // Verify all additions were made safely
        System.out.println("Final buffer content:");
        System.out.println(sharedBuffer);
        System.out.println("Total length: " + sharedBuffer.length());
    }
}

This example demonstrates StringBuffer's thread safety. Multiple threads
concurrently append to the same StringBuffer without data corruption. The
synchronized methods ensure that all operations complete atomically. The final
length confirms all additions were preserved.

## Source

[Java StringBuffer Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html)

In this article, we've covered all major aspects of the Java StringBuffer class
with practical examples. StringBuffer provides thread-safe, mutable string
operations essential for complex string manipulation in multi-threaded contexts.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).