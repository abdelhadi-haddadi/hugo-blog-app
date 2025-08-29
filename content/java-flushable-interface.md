+++
title = "Java Flushable Interface"
date = 2025-08-29T19:59:18.660+01:00
draft = false
description = "Complete Java Flushable interface tutorial covering all methods with examples. Learn about flushing output streams in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Flushable Interface

Last modified: April 16, 2025

 

The java.io.Flushable interface represents objects that can flush
buffered output to the underlying destination. It contains a single method
flush that forces any buffered output to be written.

Classes implementing Flushable include various output streams and
writers. The interface ensures data isn't stuck in buffers when critical
operations occur. Flushing is particularly important for network operations and
interactive applications.

## Flushable Interface Overview

The Flushable interface is simple, containing just one method. Its
purpose is to provide a standard way to force output to be written. Many I/O
classes implement this interface to support buffer management.

public interface Flushable {
    void flush() throws IOException;
}

The code above shows the complete Flushable interface definition.
The flush method may throw an IOException if the
operation fails. Implementing classes must provide concrete implementations of
this method.

## Basic Flushable Implementation

This example demonstrates a simple custom class implementing Flushable.
The class maintains an internal buffer and flushes it when requested. This shows
the basic pattern for flushable objects.

Main.java
  

import java.io.Flushable;
import java.io.IOException;

public class SimpleBuffer implements Flushable {
    private StringBuilder buffer = new StringBuilder();
    
    public void write(String data) {
        buffer.append(data);
    }
    
    @Override
    public void flush() throws IOException {
        System.out.println("Flushing buffer: " + buffer.toString());
        buffer.setLength(0); // Clear the buffer
    }
    
    public static void main(String[] args) {
        SimpleBuffer buffer = new SimpleBuffer();
        
        try {
            buffer.write("Hello");
            buffer.write(" World");
            buffer.flush();
            
            buffer.write("Second");
            buffer.write(" Flush");
            buffer.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a SimpleBuffer class that implements
Flushable. The flush method outputs the buffer
contents and clears it. The main method demonstrates writing data and flushing
it twice. Each flush operation empties the buffer.

## Flushing a FileOutputStream

FileOutputStream implements Flushable to ensure file
data is written to disk. While the OS eventually writes buffered data, explicit
flushing guarantees immediate writing. This is crucial for critical operations.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("output.txt")) {
            // Write some data
            fos.write("Important data line 1\n".getBytes());
            fos.flush(); // Ensure first line is written
            
            // More data
            fos.write("Critical data line 2\n".getBytes());
            
            // System crash simulation
            System.out.println("Pretend system crashes here...");
            
            // Without flush, line 2 might be lost
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows the importance of flushing FileOutputStream. The
first write is flushed immediately, while the second isn't. In a crash scenario,
the first line would be safe, but the second might be lost. Flushing ensures
critical data is persisted.

## BufferedWriter and Flushing

BufferedWriter implements Flushable to write buffered
characters to the underlying writer. The buffer improves performance but delays
writing. Flushing forces immediate writing of all buffered characters.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter writer = 
                new BufferedWriter(new FileWriter("log.txt"))) {
            
            writer.write("Starting application\n");
            writer.flush(); // Ensure startup log is written
            
            // Simulate application work
            for (int i = 0; i &lt; 5; i++) {
                writer.write("Processing item " + i + "\n");
                Thread.sleep(100); // Simulate work
            }
            
            writer.flush(); // Force write before more work
            
            // More processing
            writer.write("Application completed\n");
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates flushing a BufferedWriter at critical
points. The first flush ensures the startup message is written immediately.
The second flush writes all processed items before continuing. Without these
flushes, data might be delayed in the buffer.

## AutoFlushing with PrintWriter

PrintWriter can be configured to auto-flush after each write
operation. This is useful for interactive applications needing immediate output.
The constructor's autoFlush parameter controls this behavior.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Main {
    public static void main(String[] args) {
        try (PrintWriter writer = new PrintWriter(
                new FileWriter("console.log"), true)) { // autoFlush=true
            
            // These will auto-flush after each println
            writer.println("Application started");
            writer.println("Loading configuration");
            
            // Simulate user interaction
            for (int i = 0; i &lt; 3; i++) {
                writer.println("User action " + i);
                // Without auto-flush, these might be delayed
            }
            
            writer.println("Application exiting");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a PrintWriter with auto-flush enabled. Each
println triggers an automatic flush, ensuring immediate writing.
This is ideal for logging or interactive output where delays are unacceptable.
The second constructor parameter enables this behavior.

## Flushing a Socket's OutputStream

Network streams often require explicit flushing to ensure timely data transmission.
Socket's output stream implements Flushable for this
purpose. Without flushing, small messages might be delayed by buffering.

Main.java
  

import java.io.IOException;
import java.io.OutputStream;
import java.net.Socket;

public class Main {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080);
             OutputStream out = socket.getOutputStream()) {
            
            // Send initial handshake
            out.write("HELLO\n".getBytes());
            out.flush(); // Ensure handshake is sent immediately
            
            // Send data messages
            for (int i = 0; i &lt; 3; i++) {
                String message = "DATA " + i + "\n";
                out.write(message.getBytes());
                out.flush(); // Ensure each message is sent
                Thread.sleep(500); // Simulate processing
            }
            
            // Send goodbye
            out.write("BYE\n".getBytes());
            
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates flushing a socket's output stream after each message.
Network communication often buffers data to optimize transmission. Flushing
ensures each message is sent immediately rather than being delayed. This is
critical for protocol-based communication.

## Flushing a ZipOutputStream

ZipOutputStream implements Flushable to ensure ZIP
entries are properly written. Flushing is particularly important when creating
ZIP files to maintain entry boundaries and metadata integrity.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Main {
    public static void main(String[] args) {
        try (ZipOutputStream zos = 
                new ZipOutputStream(new FileOutputStream("archive.zip"))) {
            
            // Add first entry
            zos.putNextEntry(new ZipEntry("file1.txt"));
            zos.write("Content for file 1".getBytes());
            zos.flush(); // Ensure entry is complete
            
            // Add second entry
            zos.putNextEntry(new ZipEntry("file2.txt"));
            zos.write("Content for file 2".getBytes());
            zos.flush(); // Ensure second entry is complete
            
            // Final flush before closing
            zos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows flushing a ZipOutputStream after each entry.
While closing the stream also flushes, explicit flushing ensures each entry is
properly written when created. This prevents corruption if an error occurs
during ZIP file creation.

## Source

[Java Flushable Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/Flushable.html)

In this article, we've explored the Flushable interface and its
implementations. Proper flushing is essential for reliable I/O operations,
especially with buffered streams and critical data. Understanding when and how
to flush streams is key to robust Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).