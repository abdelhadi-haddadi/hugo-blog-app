+++
title = "Java FileInputStream Class"
date = 2025-08-29T19:59:15.278+01:00
draft = false
description = "Complete Java FileInputStream class tutorial covering all methods with examples. Learn about file input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileInputStream Class

Last modified: April 16, 2025

 

The java.io.FileInputStream class is used for reading raw bytes from
files in Java. It's part of Java's I/O package and is ideal for reading binary
files like images or executables. FileInputStream extends InputStream.

FileInputStream provides low-level file access operations. It reads
data byte by byte or in chunks. The class throws FileNotFoundException
if the file doesn't exist. It's not buffered, so for better performance, wrap it
in a BufferedInputStream.

## FileInputStream Class Overview

FileInputStream provides several constructors to create input streams
from files. Key methods include read operations, stream skipping, and available
bytes checking. The class doesn't support mark/reset operations by default.

public class FileInputStream extends InputStream {
    public FileInputStream(String name) throws FileNotFoundException;
    public FileInputStream(File file) throws FileNotFoundException;
    public FileInputStream(FileDescriptor fdObj);
    public int read() throws IOException;
    public int read(byte[] b) throws IOException;
    public int read(byte[] b, int off, int len) throws IOException;
    public long skip(long n) throws IOException;
    public int available() throws IOException;
    public void close() throws IOException;
    public FileChannel getChannel();
    public final FileDescriptor getFD() throws IOException;
}

The code above shows key methods provided by FileInputStream. These
methods allow reading data from files at byte level. The class also provides
access to the underlying file descriptor and channel for advanced operations.

## Creating a FileInputStream

FileInputStream can be created using file path strings, File objects, or file
descriptors. Always close streams after use to release system resources. The
try-with-resources statement ensures proper stream closure.

Main.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        // Using file path string
        try (FileInputStream fis1 = new FileInputStream("data.txt")) {
            System.out.println("Stream created from path");
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Using File object
        File file = new File("data.txt");
        try (FileInputStream fis2 = new FileInputStream(file)) {
            System.out.println("Stream created from File object");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create FileInputStream. The first uses
a file path string, while the second uses a File object. Both streams are
automatically closed by try-with-resources. FileNotFoundException is thrown if
the file doesn't exist or can't be opened.

## Reading Single Bytes from File

The simplest way to read data is byte by byte using the read method. It returns
the next byte of data or -1 if end of file is reached. This approach is
inefficient for large files but simple for small ones.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("data.txt")) {
            int byteData;
            System.out.println("Reading file byte by byte:");
            
            while ((byteData = fis.read()) != -1) {
                System.out.print((char) byteData);
            }
            
            System.out.println("\nFile reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads a text file byte by byte and prints each character. The read
method returns an int representing the byte value. We cast it to char for text
display. The loop continues until read returns -1 (end of file). This approach
works for both text and binary files.

## Reading Bytes into a Byte Array

For better performance, read multiple bytes at once into a byte array. This
reduces the number of I/O operations. The read method returns the number of bytes
actually read, which may be less than the array length.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("largefile.dat")) {
            byte[] buffer = new byte[1024]; // 1KB buffer
            int bytesRead;
            
            System.out.println("Reading file in chunks:");
            
            while ((bytesRead = fis.read(buffer)) != -1) {
                System.out.println("Read " + bytesRead + " bytes");
                // Process the buffer here
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading a file in chunks using a byte array buffer. The
buffer size (1024 bytes) can be adjusted for performance. The read method fills
the buffer and returns the number of bytes read. At end of file, it returns -1.
This approach is much faster than byte-by-byte reading.

## Reading Specific Parts of a File

FileInputStream allows reading specific portions of a file by specifying offset
and length parameters. This is useful when you need to process only certain parts
of a file. The read method ensures thread-safe operations.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("data.bin")) {
            byte[] buffer = new byte[100];
            
            // Read 50 bytes starting from position 10
            fis.skip(10);
            int bytesRead = fis.read(buffer, 0, 50);
            
            System.out.println("Read " + bytesRead + " bytes from position 10");
            System.out.println("First byte: " + buffer[0]);
            System.out.println("Last byte: " + buffer[bytesRead-1]);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read specific portions of a file. We first skip 10
bytes, then read 50 bytes into a buffer. The read method's parameters specify
where to store data in the buffer. This approach is useful for processing
structured binary files with known formats.

## Getting Available Bytes and Skipping Data

The available method returns an estimate of bytes that can be read without
blocking. The skip method allows jumping over bytes in the stream. Both methods
are useful for navigating through files.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("data.txt")) {
            System.out.println("Total available bytes: " + fis.available());
            
            // Skip first 10 bytes
            long skipped = fis.skip(10);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read next byte
            int nextByte = fis.read();
            System.out.println("Next byte: " + (char) nextByte);
            
            System.out.println("Remaining bytes: " + fis.available());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using available and skip methods. Available shows how
many bytes can be read immediately. Skip moves the file pointer forward without
reading data. These methods are particularly useful when working with binary file
formats that have headers or metadata sections.

## Using FileInputStream with FileChannel

FileInputStream provides access to the underlying FileChannel for advanced file
operations. The channel supports features like memory-mapped I/O and file locking
that aren't available through the stream interface alone.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class Main {

    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("data.bin");
             FileChannel channel = fis.getChannel()) {
            
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            
            while (channel.read(buffer) &gt; 0) {
                buffer.flip(); // Prepare buffer for reading
                
                while (buffer.hasRemaining()) {
                    System.out.print((char) buffer.get());
                }
                
                buffer.clear(); // Prepare buffer for next read
            }
            
            System.out.println("\nFile reading complete via channel");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to use FileInputStream's channel for more advanced I/O
operations. We create a ByteBuffer and read data through the channel. The channel
provides better performance for large files and supports additional features like
file locking. This combines stream and channel I/O approaches.

## Source

[Java FileInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileInputStream.html)

In this article, we've covered the essential methods and features of the Java
FileInputStream class. Understanding these concepts is crucial for working with
file I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).