+++
title = "Java RandomAccessFile Class"
date = 2025-08-29T19:59:29.931+01:00
draft = false
description = "Complete Java RandomAccessFile class tutorial covering all methods with examples. Learn about random access file operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java RandomAccessFile Class

Last modified: April 16, 2025

 

The java.io.RandomAccessFile class allows reading and writing to
random access files. Unlike sequential streams, it supports seeking to any
position in the file. This makes it useful for database-like operations.

RandomAccessFile implements both DataInput and
DataOutput interfaces. It can read/write primitive types and
strings. The file pointer can be moved to any position for random access.

## RandomAccessFile Class Overview

RandomAccessFile provides methods for both reading and writing
data at any file position. Key features include file pointer manipulation,
reading/writing primitives, and file length operations. It supports both read
and read-write modes.

public class RandomAccessFile implements DataOutput, DataInput, Closeable {
    public RandomAccessFile(String name, String mode);
    public RandomAccessFile(File file, String mode);
    public native long getFilePointer();
    public native void seek(long pos);
    public native long length();
    public native void setLength(long newLength);
    public int read();
    public int read(byte[] b);
    public final int readInt();
    public final void write(int b);
    public final void writeInt(int v);
    public void close();
}

The code above shows key methods provided by RandomAccessFile.
These methods allow random access reading and writing operations. The class
supports both byte-level and primitive data type operations.

## Creating a RandomAccessFile

RandomAccessFile is created with a file path and access mode. The mode can be
"r" for read-only or "rw" for read-write access. The file is created if it
doesn't exist in "rw" mode.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try {
            // Read-only mode
            RandomAccessFile rafRead = 
                new RandomAccessFile("data.txt", "r");
            
            // Read-write mode (creates file if needed)
            RandomAccessFile rafWrite = 
                new RandomAccessFile("data.txt", "rw");
            
            System.out.println("Read-only file opened");
            System.out.println("Read-write file opened");
            
            rafRead.close();
            rafWrite.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create RandomAccessFile. The first
uses read-only mode, while the second allows both reading and writing. Always
close files when done to release resources. The file is created automatically
in "rw" mode if it doesn't exist.

## Reading and Writing Data

RandomAccessFile provides methods for reading and writing primitive types. These
include integers, floats, doubles, and strings. The file pointer determines
where operations occur.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("data.dat", "rw")) {
            
            // Write some data
            raf.writeInt(12345);
            raf.writeDouble(678.90);
            raf.writeUTF("Hello World");
            
            // Reset to beginning
            raf.seek(0);
            
            // Read back data
            System.out.println("Int: " + raf.readInt());
            System.out.println("Double: " + raf.readDouble());
            System.out.println("String: " + raf.readUTF());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to write and read primitive types using RandomAccessFile.
Data is written sequentially then read back after seeking to the start. The
writeUTF and readUTF methods handle strings with
modified UTF-8 encoding.

## Seeking and File Pointer

The file pointer determines where the next read/write occurs. The seek
method moves the pointer to any position. getFilePointer returns
the current position.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("seekdemo.dat", "rw")) {
            
            // Write 10 integers (4 bytes each)
            for (int i = 0; i &lt; 10; i++) {
                raf.writeInt(i);
            }
            
            // Jump to 5th integer (position 16)
            raf.seek(16);
            System.out.println("Value at position 16: " + raf.readInt());
            
            // Get current position
            System.out.println("Current position: " + raf.getFilePointer());
            
            // Jump to beginning
            raf.seek(0);
            System.out.println("First value: " + raf.readInt());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates file pointer manipulation. Integers are written then
accessed randomly using seek. Each integer occupies 4 bytes, so
the 5th integer is at position 16. The file pointer moves automatically during
read/write operations.

## Reading and Writing Bytes

RandomAccessFile supports byte-level operations through read and
write methods. These work with byte arrays for bulk operations.
Byte operations are useful for binary file processing.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("bytes.dat", "rw")) {
            
            // Write some bytes
            byte[] outBytes = {0x01, 0x02, 0x03, 0x04, 0x05};
            raf.write(outBytes);
            
            // Read back bytes
            byte[] inBytes = new byte[5];
            raf.seek(0);
            raf.read(inBytes);
            
            System.out.print("Read bytes: ");
            for (byte b : inBytes) {
                System.out.printf("0x%02X ", b);
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows byte-level read/write operations. A byte array is written to
file then read back. The hexadecimal values are printed to verify the data.
Byte operations are fundamental for working with binary file formats.

## File Length Operations

RandomAccessFile provides methods to get and set file length. length
returns the current size, while setLength can extend or truncate
the file. These are useful for managing file storage.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("lengthdemo.dat", "rw")) {
            
            // Initial length
            System.out.println("Initial length: " + raf.length());
            
            // Extend file
            raf.setLength(100);
            System.out.println("After setLength(100): " + raf.length());
            
            // Write some data
            raf.writeInt(123);
            System.out.println("After writing: " + raf.length());
            
            // Truncate file
            raf.setLength(10);
            System.out.println("After truncation: " + raf.length());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates file length manipulation. The file is extended to 100
bytes, then truncated to 10 bytes. setLength can both grow and
shrink files. Extended regions are filled with zeros.

## Appending Data to File

To append data, seek to the end of file before writing. RandomAccessFile doesn't
have an append mode like other streams. The file pointer must be explicitly
moved to the end.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("appenddemo.txt", "rw")) {
            
            // Write initial data
            raf.writeUTF("Initial line\n");
            
            // Append more data
            raf.seek(raf.length());
            raf.writeUTF("Appended line\n");
            
            // Read entire file
            raf.seek(0);
            byte[] content = new byte[(int) raf.length()];
            raf.readFully(content);
            
            System.out.println(new String(content));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to append data by seeking to the end. The file is read
back completely after appending. readFully ensures all requested
bytes are read. This pattern is useful for log files and data collection.

## Source

[Java RandomAccessFile Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/RandomAccessFile.html)

In this article, we've covered the essential methods and features of the Java
RandomAccessFile class. Understanding these concepts is crucial for working
with random access file operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).