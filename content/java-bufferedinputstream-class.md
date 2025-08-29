+++
title = "Java BufferedInputStream Class"
date = 2025-08-29T19:59:07.343+01:00
draft = false
description = "Complete Java BufferedInputStream class tutorial covering all methods with examples. Learn about buffered input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BufferedInputStream Class

Last modified: April 16, 2025

 

The java.io.BufferedInputStream class adds buffering capability to
another input stream. It improves performance by reducing the number of native
I/O calls. Data is read from the underlying stream in large chunks into a buffer.

BufferedInputStream wraps around another InputStream
and provides buffered reading functionality. The default buffer size is 8192
bytes (8KB), but a custom size can be specified. This class is thread-safe for
concurrent access.

## BufferedInputStream Class Overview

BufferedInputStream extends FilterInputStream and
provides buffered input operations. Key methods include read operations,
mark/reset functionality, and stream skipping. The buffer fills when read
operations are performed.

public class BufferedInputStream extends FilterInputStream {
    public BufferedInputStream(InputStream in);
    public BufferedInputStream(InputStream in, int size);
    public synchronized int read();
    public synchronized int read(byte[] b, int off, int len);
    public synchronized long skip(long n);
    public synchronized int available();
    public synchronized void mark(int readlimit);
    public synchronized void reset();
    public boolean markSupported();
    public synchronized void close();
}

The code above shows key methods provided by BufferedInputStream.
These methods allow for efficient reading of data with buffering. The class
supports mark and reset operations if the underlying stream supports them.

## Creating a BufferedInputStream

BufferedInputStream is created by wrapping it around another
InputStream. You can specify a buffer size or use the default. The
buffer size affects I/O performance - larger buffers reduce native calls but use
more memory.

Main.java
  

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size
            InputStream fileStream = new FileInputStream("data.txt");
            BufferedInputStream bufferedStream1 = new BufferedInputStream(fileStream);
            
            // Create with custom buffer size (16KB)
            InputStream fileStream2 = new FileInputStream("data.txt");
            BufferedInputStream bufferedStream2 = 
                new BufferedInputStream(fileStream2, 16384);
            
            System.out.println("Default buffer stream created");
            System.out.println("Custom buffer (16KB) stream created");
            
            bufferedStream1.close();
            bufferedStream2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create BufferedInputStream. The first
uses default buffer size, while the second specifies 16KB. Always close streams
when done to release resources. The underlying FileInputStream is automatically
closed when closing BufferedInputStream.

## Reading Data with BufferedInputStream

BufferedInputStream provides several methods for reading data. The simplest reads
a single byte. More efficient methods read multiple bytes into arrays. All read
operations are synchronized for thread safety.

Main.java
  

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedInputStream bis = 
                new BufferedInputStream(new FileInputStream("data.txt"))) {
            
            // Read single byte
            int byteData;
            while ((byteData = bis.read()) != -1) {
                System.out.print((char) byteData);
            }
            
            System.out.println("\n\nReading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read a file byte by byte using BufferedInputStream
The try-with-resources statement ensures proper stream closure. The read method
returns -1 at end of stream. Each call to read may fetch data from
the buffer rather than the underlying stream.

## Reading Bytes into an Array

For better performance, read multiple bytes at once into a byte array. This
reduces method calls and native I/O operations. The read method returns the
number of bytes actually read.

Main.java
  

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedInputStream bis = 
                new BufferedInputStream(new FileInputStream("largefile.dat"))) {
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            
            while ((bytesRead = bis.read(buffer)) != -1) {
                System.out.println("Read " + bytesRead + " bytes");
                // Process the buffer data here
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a byte array. The buffer size (1024)
can be adjusted based on performance needs. The bytesRead value indicates how
many bytes were actually read into the array. This may be less than the array
length at end of file.

## Mark and Reset Functionality

BufferedInputStream supports mark and reset operations to re-read data. The mark
method marks the current position, and reset returns to it. The readlimit
parameter specifies how many bytes can be read before mark becomes invalid.

Main.java
  

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "BufferedInputStream mark/reset example";
        byte[] bytes = data.getBytes();
        
        try (BufferedInputStream bis = 
                new BufferedInputStream(new ByteArrayInputStream(bytes))) {
            
            // Read first 10 bytes
            byte[] firstPart = new byte[10];
            bis.read(firstPart);
            System.out.println("First part: " + new String(firstPart));
            
            // Mark current position
            bis.mark(20); // Allow 20 bytes to be read before mark invalid
            
            // Read next 10 bytes
            byte[] secondPart = new byte[10];
            bis.read(secondPart);
            System.out.println("Second part: " + new String(secondPart));
            
            // Reset back to mark
            bis.reset();
            
            // Read again from marked position
            bis.read(secondPart);
            System.out.println("Second part after reset: " + new String(secondPart));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates mark and reset functionality. The mark is set after
reading the first 10 bytes. After reading the next 10 bytes, reset returns to
the marked position. The readlimit of 20 means reading more than 20 bytes after
marking would invalidate the mark.

## Skipping Bytes in the Stream

The skip method allows skipping a specified number of bytes in the stream. This
is more efficient than reading and discarding data. The actual number of bytes
skipped may be less than requested.

Main.java
  

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        byte[] bytes = data.getBytes();
        
        try (BufferedInputStream bis = 
                new BufferedInputStream(new ByteArrayInputStream(bytes))) {
            
            System.out.println("Starting position: " + bis.available());
            
            // Skip first 10 bytes
            long skipped = bis.skip(10);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read next byte
            int nextByte = bis.read();
            System.out.println("Next byte: " + (char) nextByte);
            
            // Skip beyond end of stream
            skipped = bis.skip(20);
            System.out.println("Skipped " + skipped + " bytes (end approached)");
            
            System.out.println("Remaining bytes: " + bis.available());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to skip bytes in a stream. The first skip moves past the
first 10 letters. The second skip attempts to skip 20 bytes but only skips the
remaining bytes. The available method shows how many bytes can be read without
blocking.

## Available Bytes and Performance

The available method returns an estimate of bytes that can be read without
blocking. BufferedInputStream's implementation considers both the buffer and
underlying stream. This is useful for checking stream status.

Main.java
  

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedInputStream bis = 
                new BufferedInputStream(new FileInputStream("data.bin"))) {
            
            System.out.println("Initially available: " + bis.available() + " bytes");
            
            // Read some data
            byte[] buffer = new byte[100];
            bis.read(buffer);
            
            System.out.println("After reading 100 bytes, available: " 
                + bis.available() + " bytes");
            
            // Fill buffer by reading more
            while (bis.available() &gt; 0) {
                bis.read(buffer);
                System.out.println("Read 100 bytes, remaining: " 
                    + bis.available());
            }
            
            System.out.println("Stream fully read");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using available to monitor stream reading
progress. The method returns the total bytes remaining in both buffer and
underlying stream. Note that available is only an estimate and
shouldn't be used to determine exact remaining data size.

## Source

[Java BufferedInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedInputStream.html)

In this article, we've covered the essential methods and features of the Java
BufferedInputStream class. Understanding these concepts is crucial for working
with efficient I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).