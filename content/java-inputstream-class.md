+++
title = "Java InputStream Class"
date = 2025-08-29T19:59:19.826+01:00
draft = false
description = "Complete Java InputStream class tutorial covering all methods with examples. Learn about input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java InputStream Class

Last modified: April 16, 2025

 

The java.io.InputStream class is an abstract superclass representing
an input stream of bytes. It serves as the base for all byte input streams in
Java. Concrete subclasses implement specific input sources like files, network
connections, or memory buffers.

InputStream provides fundamental methods for reading bytes from
various sources. It supports basic read operations, stream marking, skipping,
and resource management. All methods throw IOException for I/O
errors.

## InputStream Class Overview

InputStream is an abstract class that defines the core functionality
for reading bytes. Key methods include various read operations, stream control,
and resource management. Subclasses must implement at least the basic read
method.

public abstract class InputStream implements Closeable {
    public abstract int read() throws IOException;
    public int read(byte[] b) throws IOException;
    public int read(byte[] b, int off, int len) throws IOException;
    public long skip(long n) throws IOException;
    public int available() throws IOException;
    public void close() throws IOException;
    public synchronized void mark(int readlimit);
    public synchronized void reset() throws IOException;
    public boolean markSupported();
}

The code above shows key methods provided by InputStream. These
methods form the foundation for all byte input operations in Java. The abstract
read method must be implemented by concrete subclasses.

## Reading a Single Byte

The most basic operation is reading a single byte from the stream. The read
method returns the byte as an int (0-255) or -1 at end of stream. This method
blocks until input is available or end of stream is reached.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = {65, 66, 67, 68, 69}; // ABCDE
        try (InputStream is = new ByteArrayInputStream(data)) {
            
            int byteRead;
            while ((byteRead = is.read()) != -1) {
                System.out.println("Read byte: " + byteRead + 
                    " (" + (char) byteRead + ")");
            }
            
            System.out.println("End of stream reached");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading bytes from a ByteArrayInputStream.
The try-with-resources ensures proper stream closure. Each byte is printed as both
numeric value and character. The loop continues until read returns -1 indicating
end of stream.

## Reading Bytes into an Array

For better performance, read multiple bytes at once into a byte array. This
reduces method calls and improves efficiency. The read method returns the number
of bytes actually read or -1 at end of stream.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        String text = "Hello, InputStream!";
        byte[] data = text.getBytes();
        
        try (InputStream is = new ByteArrayInputStream(data)) {
            byte[] buffer = new byte[10];
            int bytesRead;
            
            while ((bytesRead = is.read(buffer)) != -1) {
                System.out.println("Read " + bytesRead + " bytes: " + 
                    new String(buffer, 0, bytesRead));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows bulk reading into a 10-byte buffer. The String constructor
converts only the actually read bytes to text. The loop continues until read
returns -1. Each iteration processes up to 10 bytes at once.

## Skipping Bytes in the Stream

The skip method allows bypassing a specified number of bytes. This is more
efficient than reading and discarding data. The actual number of bytes skipped
may be less than requested.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = new byte[100];
        for (int i = 0; i &lt; data.length; i++) {
            data[i] = (byte) i;
        }
        
        try (InputStream is = new ByteArrayInputStream(data)) {
            System.out.println("Available before skip: " + is.available());
            
            long skipped = is.skip(50);
            System.out.println("Skipped " + skipped + " bytes");
            
            System.out.println("Next byte: " + is.read());
            System.out.println("Available after skip: " + is.available());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a 100-byte stream and skips the first 50 bytes. The
available method shows remaining bytes before and after skipping. The read after
skip shows the first byte after the skipped section (50).

## Mark and Reset Functionality

Some InputStream implementations support mark/reset operations. This allows
returning to a marked position after reading ahead. The mark method specifies
how many bytes can be read before mark becomes invalid.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        String text = "Markable InputStream Example";
        try (InputStream is = new ByteArrayInputStream(text.getBytes())) {
            
            if (is.markSupported()) {
                System.out.println("Mark supported");
                
                // Read and mark after 5 bytes
                byte[] buffer = new byte[5];
                is.read(buffer);
                System.out.println("First 5 bytes: " + new String(buffer));
                
                is.mark(10); // Mark with readlimit of 10 bytes
                
                // Read next 5 bytes
                is.read(buffer);
                System.out.println("Next 5 bytes: " + new String(buffer));
                
                // Reset to mark position
                is.reset();
                
                // Read again from mark
                is.read(buffer);
                System.out.println("After reset: " + new String(buffer));
            } else {
                System.out.println("Mark not supported");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates mark/reset functionality with ByteArrayInputStream.
After reading 5 bytes, we mark the position. Reading past the readlimit (10
bytes) would invalidate the mark. The reset returns to the marked position.

## Reading from a File

FileInputStream is a common InputStream implementation for reading files. It
reads bytes directly from a file in the filesystem. Always close file streams to
release system resources.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        try (InputStream is = new FileInputStream("example.txt")) {
            System.out.println("Available bytes: " + is.available());
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            StringBuilder content = new StringBuilder();
            
            while ((bytesRead = is.read(buffer)) != -1) {
                content.append(new String(buffer, 0, bytesRead));
            }
            
            System.out.println("File content:\n" + content.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads a file using FileInputStream. The available method gives the
initial file size. We read chunks into a buffer and build the content in a
StringBuilder. The try-with-resources ensures proper file handle closure.

## Available Bytes and Stream Status

The available method estimates bytes that can be read without blocking. For files,
this typically means remaining bytes. The method is useful for checking stream
status and progress.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = new byte[1000];
        try (InputStream is = new ByteArrayInputStream(data)) {
            
            System.out.println("Initial available: " + is.available());
            
            byte[] buffer = new byte[100];
            is.read(buffer);
            System.out.println("After reading 100 bytes: " + is.available());
            
            is.skip(300);
            System.out.println("After skipping 300 bytes: " + is.available());
            
            is.read(new byte[500]);
            System.out.println("After reading 500 bytes: " + is.available());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example tracks available bytes during various stream operations. The initial
count shows the full stream size. Each read or skip operation reduces the
available count. The method helps monitor reading progress.

## Source

[Java InputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/InputStream.html)

In this article, we've covered the essential methods and features of the Java
InputStream class. Understanding these concepts is crucial for working with
byte-oriented input operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).