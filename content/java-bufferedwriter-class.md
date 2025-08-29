+++
title = "Java BufferedWriter Class"
date = 2025-08-29T19:59:08.497+01:00
draft = false
description = "Complete Java BufferedWriter class tutorial covering all methods with examples. Learn about buffered output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BufferedWriter Class

Last modified: April 16, 2025

 

The java.io.BufferedWriter class adds buffering capability to
another output stream. It improves performance by reducing the number of native
I/O calls. Data is written to the underlying stream in large chunks from a buffer.

BufferedWriter wraps around another Writer
and provides buffered writing functionality. The default buffer size is 8192
characters (8KB), but a custom size can be specified. This class is thread-safe
for concurrent access.

## BufferedWriter Class Overview

BufferedWriter extends Writer and provides buffered
output operations. Key methods include write operations, newLine functionality,
and stream flushing. The buffer writes to the underlying stream when full or
when explicitly flushed.

public class BufferedWriter extends Writer {
    public BufferedWriter(Writer out);
    public BufferedWriter(Writer out, int sz);
    public void write(int c) throws IOException;
    public void write(char[] cbuf, int off, int len) throws IOException;
    public void write(String s, int off, int len) throws IOException;
    public void newLine() throws IOException;
    public void flush() throws IOException;
    public void close() throws IOException;
}

The code above shows key methods provided by BufferedWriter.
These methods allow for efficient writing of data with buffering. The class
provides platform-independent newLine functionality and automatic flushing.

## Creating a BufferedWriter

BufferedWriter is created by wrapping it around another Writer.
You can specify a buffer size or use the default. The buffer size affects I/O
performance - larger buffers reduce native calls but use more memory.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size
            Writer fileWriter = new FileWriter("output.txt");
            BufferedWriter bufferedWriter1 = new BufferedWriter(fileWriter);
            
            // Create with custom buffer size (16KB)
            Writer fileWriter2 = new FileWriter("output2.txt");
            BufferedWriter bufferedWriter2 = 
                new BufferedWriter(fileWriter2, 16384);
            
            System.out.println("Default buffer writer created");
            System.out.println("Custom buffer (16KB) writer created");
            
            bufferedWriter1.close();
            bufferedWriter2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create BufferedWriter. The first uses
default buffer size, while the second specifies 16KB. Always close writers when
done to release resources. The underlying FileWriter is automatically closed
when closing BufferedWriter.

## Writing Data with BufferedWriter

BufferedWriter provides several methods for writing data. You can write single
characters, character arrays, or strings. All write operations are buffered for
efficiency. Data is written to the underlying stream when the buffer is full.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedWriter writer = 
                new BufferedWriter(new FileWriter("output.txt"))) {
            
            // Write single character
            writer.write('A');
            
            // Write character array
            char[] chars = {'B', 'C', 'D'};
            writer.write(chars);
            
            // Write string
            writer.write("Hello, World!");
            
            // Write portion of string
            writer.write("Java Programming", 0, 4); // Writes "Java"
            
            System.out.println("Data written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows various ways to write data using BufferedWriter.
The try-with-resources statement ensures proper writer closure. Data remains in
the buffer until it's full or explicitly flushed. The write methods handle
different data types efficiently.

## Using newLine Method

The newLine method writes a platform-independent line separator.
This is preferred over writing '\n' directly. The actual separator used depends
on the operating system.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedWriter writer = 
                new BufferedWriter(new FileWriter("lines.txt"))) {
            
            writer.write("First line");
            writer.newLine();
            writer.write("Second line");
            writer.newLine();
            writer.write("Third line");
            
            System.out.println("Lines written with platform-specific separators");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using newLine to write platform-appropriate
line endings. On Windows, this writes "\r\n", while on Unix it writes "\n".
Using this method ensures correct line endings regardless of the platform.

## Flushing the Buffer

The flush method forces any buffered output to be written to the
underlying stream. This is useful when you need to ensure data is written
immediately. Closing the writer automatically flushes the buffer.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedWriter writer = 
                new BufferedWriter(new FileWriter("log.txt"))) {
            
            writer.write("Starting application");
            writer.newLine();
            
            // Force write to disk
            writer.flush();
            
            // Simulate long operation
            Thread.sleep(5000);
            
            writer.write("Operation completed");
            writer.newLine();
            
            System.out.println("Log entries written with explicit flush");
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

This example shows explicit flushing of the buffer. The first log entry is
written immediately due to the flush call. Without flushing, data might remain
in memory until the buffer fills or the writer closes. Flushing is important for
real-time logging.

## Performance Comparison

BufferedWriter significantly improves performance for small writes by reducing
native I/O calls. This example compares writing with and without buffering.
The difference becomes more noticeable with larger amounts of data.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        final int LINES = 10000;
        
        // Without buffering
        long start = System.currentTimeMillis();
        try (Writer writer = new FileWriter("unbuffered.txt")) {
            for (int i = 0; i &lt; LINES; i++) {
                writer.write("Line " + i + "\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long unbufferedTime = System.currentTimeMillis() - start;
        
        // With buffering
        start = System.currentTimeMillis();
        try (BufferedWriter writer = 
                new BufferedWriter(new FileWriter("buffered.txt"))) {
            for (int i = 0; i &lt; LINES; i++) {
                writer.write("Line " + i);
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long bufferedTime = System.currentTimeMillis() - start;
        
        System.out.println("Unbuffered time: " + unbufferedTime + "ms");
        System.out.println("Buffered time: " + bufferedTime + "ms");
    }
}

This example demonstrates the performance benefit of buffering. The buffered
version will typically be significantly faster, especially for many small writes.
BufferedWriter reduces the number of actual I/O operations by collecting data
in memory before writing.

## Source

[Java BufferedWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedWriter.html)

In this article, we've covered the essential methods and features of the Java
BufferedWriter class. Understanding these concepts is crucial for working with
efficient I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).