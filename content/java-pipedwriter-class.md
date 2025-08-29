+++
title = "Java PipedWriter Class"
date = 2025-08-29T19:59:28.832+01:00
draft = false
description = "Complete Java PipedWriter class tutorial covering all methods with examples. Learn about piped output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PipedWriter Class

Last modified: April 16, 2025

 

The java.io.PipedWriter class is a character stream that can be
connected to a PipedReader to create a communication pipe. It
writes characters to the connected PipedReader in a thread-safe
manner.

PipedWriter is typically used for communication between threads.
The pipe maintains an internal buffer with a default size of 1024 characters.
Both ends of the pipe must be connected for proper operation.

## PipedWriter Class Overview

PipedWriter extends Writer and provides piped output
operations. Key methods include writing characters, connecting to a reader,
flushing, and closing. The class throws IOException if the pipe is
broken.

public class PipedWriter extends Writer {
    public PipedWriter();
    public PipedWriter(PipedReader snk);
    public synchronized void connect(PipedReader snk);
    public void write(int c);
    public void write(char[] cbuf, int off, int len);
    public synchronized void flush();
    public void close();
}

The code above shows key methods provided by PipedWriter. These
methods allow writing characters to a connected PipedReader. The
connection can be established either at construction time or later.

## Creating a PipedWriter

PipedWriter can be created with or without a connected reader. If created
without connection, it must be connected before use. The connection can only
be established once for each PipedWriter instance.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create unconnected PipedWriter
            PipedWriter writer1 = new PipedWriter();
            
            // Create connected PipedWriter
            PipedReader reader = new PipedReader();
            PipedWriter writer2 = new PipedWriter(reader);
            
            System.out.println("Unconnected PipedWriter created");
            System.out.println("Connected PipedWriter created");
            
            writer1.close();
            writer2.close();
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PipedWriter. The first is
unconnected and must be connected later. The second is pre-connected to a
PipedReader. Always close both ends of the pipe when done to release resources.

## Connecting PipedWriter to PipedReader

An unconnected PipedWriter must be connected to a PipedReader before use. The
connection can be made using the connect method. Both ends must be in unconnected
state for successful connection.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader();
            
            // Connect the writer to the reader
            writer.connect(reader);
            
            System.out.println("PipedWriter successfully connected to PipedReader");
            
            // Write some data
            writer.write("Hello from PipedWriter".toCharArray());
            
            // Read the data
            char[] buffer = new char[100];
            int bytesRead = reader.read(buffer);
            System.out.println("Read from PipedReader: " + 
                new String(buffer, 0, bytesRead));
            
            writer.close();
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to connect a PipedWriter to a PipedReader after creation.
After connection, data written to the writer becomes available for reading from
the reader. The connection must be established before any I/O operations.

## Thread Communication with PipedWriter

PipedWriter is commonly used for communication between threads. One thread writes
data while another reads it. This provides a thread-safe way to pass character
data between threads.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader(writer);
            
            // Writer thread
            Thread writerThread = new Thread(() -&gt; {
                try {
                    writer.write("Message from writer thread".toCharArray());
                    writer.flush();
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            // Reader thread
            Thread readerThread = new Thread(() -&gt; {
                try {
                    char[] buffer = new char[100];
                    int bytesRead = reader.read(buffer);
                    System.out.println("Reader thread received: " + 
                        new String(buffer, 0, bytesRead));
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            writerThread.start();
            readerThread.start();
            
            writerThread.join();
            readerThread.join();
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates inter-thread communication using PipedWriter and
PipedReader. The writer thread sends a message which the reader thread receives.
The pipe automatically handles synchronization between the threads.

## Writing Data with PipedWriter

PipedWriter provides several methods for writing character data. Single
characters can be written, or character arrays can be written in bulk. All
write operations are thread-safe.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (PipedWriter writer = new PipedWriter();
             PipedReader reader = new PipedReader(writer)) {
            
            // Write single character
            writer.write('A');
            
            // Write character array
            char[] data = {'B', 'C', 'D'};
            writer.write(data);
            
            // Write portion of array
            writer.write("EFGHIJKLMNOPQRSTUVWXYZ".toCharArray(), 0, 5);
            
            writer.flush();
            
            // Read all written data
            char[] buffer = new char[100];
            int bytesRead = reader.read(buffer);
            System.out.println("Received data: " + 
                new String(buffer, 0, bytesRead));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows different ways to write data using PipedWriter. Single
characters, full arrays, and partial arrays can all be written. The flush
method ensures all written data is available to the reader immediately.

## Handling Pipe Broken Errors

When the connected PipedReader is closed or encounters an error, the PipedWriter
will throw an IOException for subsequent operations. This is known as a "broken
pipe" condition.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader(writer);
            
            // Close reader before writing
            reader.close();
            
            try {
                writer.write("Test".toCharArray());
                System.out.println("Write succeeded unexpectedly");
            } catch (IOException e) {
                System.out.println("Caught expected IOException: " + 
                    e.getMessage());
            }
            
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates the broken pipe condition. When the reader is closed,
any attempt to write to the writer will throw an IOException. Proper error
handling is essential when working with piped streams.

## Source

[Java PipedWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PipedWriter.html)

In this article, we've covered the essential methods and features of the Java
PipedWriter class. Understanding these concepts is crucial for implementing
inter-thread communication using character streams in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).