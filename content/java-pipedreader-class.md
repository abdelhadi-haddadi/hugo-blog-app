+++
title = "Java PipedReader Class"
date = 2025-08-29T19:59:27.723+01:00
draft = false
description = "Complete Java PipedReader class tutorial covering all methods with examples. Learn about piped character streams in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PipedReader Class

Last modified: April 16, 2025

 

The java.io.PipedReader class is a character stream that reads from
a pipe. It must be connected to a PipedWriter to form a pipe. Data
written to the PipedWriter can be read from the PipedReader.

PipedReader is typically used for communication between threads.
The pipe provides a way for one thread to send data to another thread. The pipe
has a fixed-size buffer, and operations block when the buffer is full or empty.

## PipedReader Class Overview

PipedReader extends Reader and provides character-based
pipe reading functionality. Key methods include read operations and connection
management. The class is not thread-safe for concurrent access by multiple readers.

public class PipedReader extends Reader {
    public PipedReader();
    public PipedReader(int pipeSize);
    public PipedReader(PipedWriter src);
    public PipedReader(PipedWriter src, int pipeSize);
    public void connect(PipedWriter src);
    public synchronized int read();
    public synchronized int read(char[] cbuf, int off, int len);
    public synchronized void close();
}

The code above shows key methods provided by PipedReader. These
methods allow reading characters from a pipe connected to a PipedWriter.
The pipe size can be specified or use the default value (1024 characters).

## Creating a PipedReader

PipedReader can be created in several ways. You can create an
unconnected reader and connect it later, or create it already connected to a
writer. The pipe size affects how much data can be buffered between threads.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create unconnected PipedReader
            PipedReader reader1 = new PipedReader();
            
            // Create with default pipe size (1024)
            PipedWriter writer1 = new PipedWriter();
            PipedReader reader2 = new PipedReader(writer1);
            
            // Create with custom pipe size (2048)
            PipedWriter writer2 = new PipedWriter();
            PipedReader reader3 = new PipedReader(writer2, 2048);
            
            System.out.println("Created three PipedReader instances");
            
            reader1.close();
            reader2.close();
            reader3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PipedReader. The
first creates an unconnected reader. The second and third create connected
readers with default and custom pipe sizes. Always close readers when done to
release resources.

## Basic PipedReader Usage

The simplest way to use PipedReader is to connect it to a
PipedWriter and read characters. The read operation blocks when no
data is available. This is useful for thread communication.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader(writer);
            
            // Write data in a separate thread
            new Thread(() -&gt; {
                try {
                    writer.write("Hello from PipedWriter!");
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Read data from the pipe
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
            
            System.out.println("\nReading complete");
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows basic pipe communication between threads. The writer thread
sends data which the main thread reads. The read method blocks
until data is available. The pipe automatically closes when the writer is closed.

## Reading Characters into an Array

For better performance, read multiple characters at once into a char array. This
reduces method calls and improves efficiency. The read method returns the number
of characters actually read.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader(writer, 4096); // 4KB buffer
            
            // Writer thread
            new Thread(() -&gt; {
                try {
                    String message = "This is a longer message demonstrating " +
                                   "bulk reading from a PipedReader. " +
                                   "Reading multiple characters at once is more efficient.";
                    writer.write(message);
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Reader with buffer
            char[] buffer = new char[32];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.print(new String(buffer, 0, charsRead));
            }
            
            System.out.println("\nBulk reading complete");
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a char array. The pipe has a 4KB
buffer size. The reader processes 32 characters at a time. The charsRead value
indicates how many characters were actually read into the array.

## Connecting PipedReader Later

PipedReader can be created unconnected and connected to a writer
later. The connection must be established before any reading or writing occurs.
Attempting to use an unconnected pipe causes an IOException.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create unconnected reader
            PipedReader reader = new PipedReader();
            
            // Create writer and connect later
            PipedWriter writer = new PipedWriter();
            
            // Connect them (can also use writer.connect(reader))
            reader.connect(writer);
            
            // Write data in a separate thread
            new Thread(() -&gt; {
                try {
                    writer.write("Connected after creation");
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
            
            // Read data
            int data;
            while ((data = reader.read()) != -1) {
                System.out.print((char) data);
            }
            
            System.out.println("\nReading from late-connected pipe complete");
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to connect a PipedReader after creation. The
connection can be made from either end. Once connected, the pipe works the same
as if it was connected at creation time. Only one connection can exist at a time.

## Handling Pipe Buffer Full Condition

When the pipe buffer is full, write operations block until space becomes
available. Similarly, read operations block when the buffer is empty. This
behavior is important for proper thread coordination.

Main.java
  

import java.io.PipedReader;
import java.io.PipedWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Small pipe buffer (10 chars)
            PipedWriter writer = new PipedWriter();
            PipedReader reader = new PipedReader(writer, 10);
            
            // Writer thread that writes more than buffer can hold
            Thread writerThread = new Thread(() -&gt; {
                try {
                    for (int i = 0; i &lt; 20; i++) {
                        writer.write('A' + (i % 26));
                        System.out.println("Wrote: " + (char)('A' + (i % 26)));
                    }
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            
            // Slow reader thread
            Thread readerThread = new Thread(() -&gt; {
                try {
                    for (int i = 0; i &lt; 20; i++) {
                        Thread.sleep(200); // Slow reading
                        char c = (char) reader.read();
                        System.out.println("Read: " + c);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
            
            writerThread.start();
            readerThread.start();
            
            writerThread.join();
            readerThread.join();
            
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates pipe blocking behavior. The writer will block when the
10-character buffer fills up. The slow reader gradually consumes data, allowing
the writer to continue. This shows how pipes naturally synchronize producer and
consumer threads.

## Source

[Java PipedReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PipedReader.html)

In this article, we've covered the essential methods and features of the Java
PipedReader class. Understanding these concepts is crucial for implementing
inter-thread communication using character streams in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).