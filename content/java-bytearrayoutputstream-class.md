+++
title = "Java ByteArrayOutputStream Class"
date = 2025-08-29T19:59:09.601+01:00
draft = false
description = "Complete Java ByteArrayOutputStream class tutorial covering all methods with examples. Learn about byte array output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ByteArrayOutputStream Class

Last modified: April 16, 2025

 

The java.io.ByteArrayOutputStream class implements an output stream
that writes data to a byte array. The buffer grows automatically as data is
written. This class is useful when you need to collect data in memory before
writing it elsewhere.

ByteArrayOutputStream extends OutputStream and provides
methods to write data to an internal byte array. The class includes methods to
convert the buffer to a byte array or string. No need to close this stream as it
doesn't use system resources.

## ByteArrayOutputStream Class Overview

ByteArrayOutputStream maintains an internal byte array that grows
as needed. Key methods include write operations, size tracking, and buffer
conversion. The class is thread-safe for concurrent access.

public class ByteArrayOutputStream extends OutputStream {
    public ByteArrayOutputStream();
    public ByteArrayOutputStream(int size);
    public synchronized void write(int b);
    public synchronized void write(byte[] b, int off, int len);
    public synchronized void writeTo(OutputStream out);
    public synchronized void reset();
    public synchronized byte[] toByteArray();
    public synchronized int size();
    public synchronized String toString();
    public synchronized String toString(String charsetName);
    public void close();
}

The code above shows key methods provided by ByteArrayOutputStream.
These methods allow writing data to an in-memory buffer and converting it to
various formats. The close method has no effect as no system resources are used.

## Creating a ByteArrayOutputStream

ByteArrayOutputStream can be created with default size (32 bytes) or custom
initial capacity. The buffer grows automatically when needed. Specifying initial
size can improve performance for known data sizes.

Main.java
  

import java.io.ByteArrayOutputStream;

public class Main {

    public static void main(String[] args) {
        // Create with default buffer size
        ByteArrayOutputStream baos1 = new ByteArrayOutputStream();
        System.out.println("Default size: " + baos1.size());
        
        // Create with custom initial size (1024 bytes)
        ByteArrayOutputStream baos2 = new ByteArrayOutputStream(1024);
        System.out.println("Custom size: " + baos2.size());
        
        // Write some data to show buffer growth
        for (int i = 0; i &lt; 100; i++) {
            baos1.write(i);
        }
        System.out.println("After writing 100 bytes: " + baos1.size());
    }
}

This example demonstrates different ways to create ByteArrayOutputStream. The
first uses default size, while the second specifies 1024 bytes. The buffer grows
automatically when writing more data than initial capacity. The size method
returns current buffer content length.

## Writing Data to ByteArrayOutputStream

ByteArrayOutputStream provides several methods for writing data. You can write
single bytes or byte arrays. All write operations are synchronized for thread
safety. The buffer automatically expands to accommodate written data.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            
            // Write single byte
            baos.write(65); // ASCII 'A'
            
            // Write byte array
            byte[] data = {66, 67, 68}; // B, C, D
            baos.write(data);
            
            // Write portion of byte array
            byte[] moreData = {69, 70, 71, 72, 73}; // E, F, G, H, I
            baos.write(moreData, 1, 3); // Write F, G, H
            
            System.out.println("Buffer content: " + baos.toString());
            System.out.println("Buffer size: " + baos.size());
        }
    }
}

This example shows different ways to write data to ByteArrayOutputStream. The
write method accepts single bytes or byte arrays. You can also write portions of
arrays using offset and length parameters. The toString method converts buffer
content to string using platform default charset.

## Converting Buffer to Byte Array

The toByteArray method returns a copy of the buffer's current content. This is
useful when you need to access the collected data as a byte array. The original
buffer remains unchanged and can continue accumulating data.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        // Write some data
        String text = "Hello, ByteArrayOutputStream!";
        baos.writeBytes(text.getBytes());
        
        // Get buffer content as byte array
        byte[] byteArray = baos.toByteArray();
        
        System.out.println("Byte array content: " + Arrays.toString(byteArray));
        System.out.println("Byte array length: " + byteArray.length);
        System.out.println("Original buffer size: " + baos.size());
        
        // Continue writing to original stream
        baos.writeBytes(" Additional data".getBytes());
        System.out.println("Updated buffer size: " + baos.size());
    }
}

This example demonstrates converting buffer content to a byte array. The
toByteArray method creates a new array with current content. The original stream
remains active for further writes. This is useful when you need to both keep
accumulating data and work with snapshots.

## Writing Buffer Content to Another Stream

The writeTo method writes the entire buffer content to another OutputStream.
This is efficient for transferring collected data without creating intermediate
byte arrays. The method is synchronized for thread safety.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        // Collect data in memory
        String data = "This data will be written to a file";
        baos.writeBytes(data.getBytes());
        
        try (FileOutputStream fos = new FileOutputStream("output.txt")) {
            // Write buffer content to file
            baos.writeTo(fos);
            System.out.println("Data written to file successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        System.out.println("Buffer size after writeTo: " + baos.size());
    }
}

This example shows how to transfer buffer content to another output stream. The
writeTo method efficiently writes all collected data to the target stream. The
original buffer remains unchanged after the operation. This is useful for
collecting data in memory before writing to files or network streams.

## Resetting the Buffer

The reset method clears the buffer content, setting size back to zero while
keeping the same underlying buffer capacity. This is more efficient than
creating a new stream when you need to reuse the buffer.

Main.java
  

import java.io.ByteArrayOutputStream;

public class Main {

    public static void main(String[] args) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        // Write initial data
        baos.writeBytes("Initial data".getBytes());
        System.out.println("After first write: " + baos.toString());
        System.out.println("Size: " + baos.size());
        
        // Reset the buffer
        baos.reset();
        System.out.println("After reset: " + baos.toString());
        System.out.println("Size: " + baos.size());
        
        // Write new data
        baos.writeBytes("New data".getBytes());
        System.out.println("After second write: " + baos.toString());
        System.out.println("Size: " + baos.size());
    }
}

This example demonstrates using the reset method to clear buffer content. After
reset, the buffer appears empty but retains its capacity. This is useful when you
need to reuse the stream for new data without allocating new memory. The
underlying byte array isn't shrunk by reset.

## Converting Buffer to String

ByteArrayOutputStream provides toString methods to convert buffer content to
strings. You can use platform default charset or specify a charset. This is
useful when collecting text data in memory.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

public class Main {

    public static void main(String[] args) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        // Write data in different encodings
        try {
            baos.write("Hello ".getBytes("UTF-8"));
            baos.write("世界".getBytes("UTF-8"));
            
            // Convert to string using default charset
            System.out.println("Default charset: " + baos.toString());
            
            // Convert using specific charset
            System.out.println("UTF-8: " + baos.toString("UTF-8"));
            System.out.println("ISO-8859-1: " + baos.toString("ISO-8859-1"));
            
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}

This example shows different ways to convert buffer content to strings. The
toString method without parameters uses platform default charset. Specifying a
charset ensures consistent character encoding. Note that some charsets may not
support all characters in the buffer.

## Source

[Java ByteArrayOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ByteArrayOutputStream.html)

In this article, we've covered the essential methods and features of the Java
ByteArrayOutputStream class. Understanding these concepts is crucial for working
with in-memory byte data collection and manipulation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).