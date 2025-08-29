+++
title = "Java BufferedOutputStream Class"
date = 2025-08-29T19:59:08.505+01:00
draft = false
description = "Complete Java BufferedOutputStream class tutorial covering all methods with examples. Learn about buffered output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BufferedOutputStream Class

Last modified: April 16, 2025

 

The java.io.BufferedOutputStream class adds buffering capability to
another output stream. It improves performance by reducing the number of native
I/O calls. Data is written to the underlying stream in large chunks from a buffer.

BufferedOutputStream wraps around another OutputStream
and provides buffered writing functionality. The default buffer size is 8192
bytes (8KB), but a custom size can be specified. This class is thread-safe for
concurrent access.

## BufferedOutputStream Class Overview

BufferedOutputStream extends FilterOutputStream and
provides buffered output operations. Key methods include write operations and
flush functionality. The buffer fills with data before writing to the underlying
stream.

public class BufferedOutputStream extends FilterOutputStream {
    public BufferedOutputStream(OutputStream out);
    public BufferedOutputStream(OutputStream out, int size);
    public synchronized void write(int b);
    public synchronized void write(byte[] b, int off, int len);
    public synchronized void flush();
    public void close();
}

The code above shows key methods provided by BufferedOutputStream.
These methods allow for efficient writing of data with buffering. The flush
method ensures all buffered data is written to the underlying stream.

## Creating a BufferedOutputStream

BufferedOutputStream is created by wrapping it around another
OutputStream. You can specify a buffer size or use the default. The
buffer size affects I/O performance - larger buffers reduce native calls but use
more memory.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size
            OutputStream fileStream = new FileOutputStream("output.txt");
            BufferedOutputStream bufferedStream1 = 
                new BufferedOutputStream(fileStream);
            
            // Create with custom buffer size (16KB)
            OutputStream fileStream2 = new FileOutputStream("output2.txt");
            BufferedOutputStream bufferedStream2 = 
                new BufferedOutputStream(fileStream2, 16384);
            
            System.out.println("Default buffer stream created");
            System.out.println("Custom buffer (16KB) stream created");
            
            bufferedStream1.close();
            bufferedStream2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create BufferedOutputStream. The first
uses default buffer size, while the second specifies 16KB. Always close streams
when done to release resources. The underlying FileOutputStream is automatically
closed when closing BufferedOutputStream.

## Writing Data with BufferedOutputStream

BufferedOutputStream provides several methods for writing data. The simplest writes
a single byte. More efficient methods write multiple bytes from arrays. All write
operations are synchronized for thread safety.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedOutputStream bos = 
                new BufferedOutputStream(new FileOutputStream("output.txt"))) {
            
            // Write single bytes
            bos.write('H');
            bos.write('e');
            bos.write('l');
            bos.write('l');
            bos.write('o');
            
            // Flush to ensure data is written
            bos.flush();
            
            System.out.println("Data written to file");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to write data byte by byte using BufferedOutputStream.
The try-with-resources statement ensures proper stream closure. The flush method
ensures all buffered data is written to the underlying stream immediately.

## Writing Byte Arrays

For better performance, write multiple bytes at once from a byte array. This
reduces method calls and native I/O operations. The buffer automatically handles
chunking of large writes.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedOutputStream bos = 
                new BufferedOutputStream(new FileOutputStream("data.bin"))) {
            
            byte[] data = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
            
            // Write entire array
            bos.write(data);
            
            // Write partial array (bytes 2-5)
            bos.write(data, 2, 4);
            
            System.out.println("Byte arrays written to file");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing both complete and partial byte arrays. The first
write operation writes all 8 bytes. The second writes only 4 bytes starting from
index 2. The buffer automatically manages when to actually write to the underlying
stream.

## Flushing the Buffer

The flush method forces any buffered data to be written to the underlying stream.
This is important when timely writing is required. Closing the stream also
automatically flushes the buffer.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedOutputStream bos = 
                new BufferedOutputStream(new FileOutputStream("log.txt"))) {
            
            // Write log entries
            bos.write("Starting application\n".getBytes());
            
            // Important - ensure log entry is written immediately
            bos.flush();
            
            // Simulate work
            for (int i = 0; i &lt; 1000000; i++) {
                // Some processing
            }
            
            bos.write("Work completed\n".getBytes());
            
            System.out.println("Log entries written with explicit flush");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows the importance of flushing for critical log entries. The first
message is flushed immediately to ensure it's written even if the program crashes
later. Without flush, the message might remain in the buffer until it fills or
the stream closes.

## Performance Comparison

BufferedOutputStream significantly improves performance for small writes. This
example compares writing with and without buffering. The difference becomes
apparent with many small writes.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class Main {

    public static void main(String[] args) {
        final int COUNT = 100000;
        
        // Unbuffered write
        long start = System.currentTimeMillis();
        try (OutputStream os = new FileOutputStream("unbuffered.txt")) {
            for (int i = 0; i &lt; COUNT; i++) {
                os.write(i % 256);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long unbufferedTime = System.currentTimeMillis() - start;
        
        // Buffered write
        start = System.currentTimeMillis();
        try (OutputStream os = new BufferedOutputStream(
                new FileOutputStream("buffered.txt"))) {
            for (int i = 0; i &lt; COUNT; i++) {
                os.write(i % 256);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long bufferedTime = System.currentTimeMillis() - start;
        
        System.out.println("Unbuffered time: " + unbufferedTime + " ms");
        System.out.println("Buffered time: " + bufferedTime + " ms");
    }
}

This performance test writes 100,000 individual bytes with and without buffering.
The buffered version is typically much faster as it minimizes native I/O calls.
The exact speed difference depends on the system and storage medium.

## Writing Text Data

While BufferedOutputStream works with bytes, it's often used with text data by
converting strings to bytes. This example shows efficient text writing with
proper character encoding handling.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try (BufferedOutputStream bos = new BufferedOutputStream(
                new FileOutputStream("text.txt"))) {
            
            String header = "User Log\n========\n";
            bos.write(header.getBytes(StandardCharsets.UTF_8));
            
            for (int i = 1; i &lt;= 10; i++) {
                String line = String.format("User %d logged in\n", i);
                bos.write(line.getBytes(StandardCharsets.UTF_8));
            }
            
            System.out.println("Text file written with UTF-8 encoding");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing text data with proper UTF-8 encoding. Each
string is converted to bytes before writing. The buffering makes this efficient
even with many small writes. Always specify charset to avoid platform-dependent
defaults.

## Source

[Java BufferedOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedOutputStream.html)

In this article, we've covered the essential methods and features of the Java
BufferedOutputStream class. Understanding these concepts is crucial for working
with efficient I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).