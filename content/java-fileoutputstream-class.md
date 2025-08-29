+++
title = "Java FileOutputStream Class"
date = 2025-08-29T19:59:16.391+01:00
draft = false
description = "Complete Java FileOutputStream class tutorial covering all methods with examples. Learn about file output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileOutputStream Class

Last modified: April 16, 2025

 

The java.io.FileOutputStream class is an output stream for writing
data to a file. It writes raw bytes to files and is part of Java's I/O package.
FileOutputStream is used for writing streams of bytes to files or file descriptors.

FileOutputStream is typically wrapped in higher-level writers like
BufferedOutputStream or PrintStream for better
performance. It supports both append and overwrite modes for file writing.
This class is not thread-safe for concurrent access.

## FileOutputStream Class Overview

FileOutputStream extends OutputStream and provides
basic file writing capabilities. Key methods include write operations for bytes
and byte arrays. The class handles file creation and opening automatically.

public class FileOutputStream extends OutputStream {
    public FileOutputStream(String name) throws FileNotFoundException;
    public FileOutputStream(String name, boolean append) throws FileNotFoundException;
    public FileOutputStream(File file) throws FileNotFoundException;
    public FileOutputStream(File file, boolean append) throws FileNotFoundException;
    public FileOutputStream(FileDescriptor fdObj);
    public void write(int b) throws IOException;
    public void write(byte[] b) throws IOException;
    public void write(byte[] b, int off, int len) throws IOException;
    public void close() throws IOException;
    public FileChannel getChannel();
    public final FileDescriptor getFD() throws IOException;
}

The code above shows key methods provided by FileOutputStream.
These methods allow writing bytes to files in various ways. The class also
provides access to the underlying file channel and descriptor.

## Creating a FileOutputStream

FileOutputStream can be created using file path strings, File objects, or file
descriptors. The append parameter determines whether to overwrite or append to
existing files. All constructors throw FileNotFoundException if the file cannot
be opened.

Main.java
  

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with file path (overwrite mode)
            FileOutputStream fos1 = new FileOutputStream("output1.txt");
            
            // Create with File object (append mode)
            File file = new File("output2.txt");
            FileOutputStream fos2 = new FileOutputStream(file, true);
            
            System.out.println("FileOutputStream created (overwrite mode)");
            System.out.println("FileOutputStream created (append mode)");
            
            fos1.close();
            fos2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create FileOutputStream. The first
uses a file path and defaults to overwrite mode. The second uses a File object
with append mode enabled. Always close streams when done to release resources.

## Writing Single Bytes

The simplest write operation writes a single byte to the file. The byte is
specified as an int, with only the lowest 8 bits written. This method is
inefficient for bulk data but useful for specific cases.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("bytes.txt")) {
            
            // Write ASCII characters A-Z
            for (int i = 65; i &lt;= 90; i++) {
                fos.write(i);
            }
            
            System.out.println("Bytes written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example writes the ASCII characters A-Z to a file. Each character is
written as a single byte. The try-with-resources statement ensures proper stream
closure. Note that this approach is not suitable for Unicode characters outside
ASCII range.

## Writing Byte Arrays

For better performance, write multiple bytes at once using byte arrays. This
reduces native I/O operations. The entire array or a portion can be written.
This is the most efficient way to write bulk data.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("data.bin")) {
            
            // Create sample data
            byte[] data = new byte[256];
            for (int i = 0; i &lt; 256; i++) {
                data[i] = (byte) i;
            }
            
            // Write entire array
            fos.write(data);
            
            // Write portion of array
            fos.write(data, 0, 128);
            
            System.out.println("Byte arrays written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing byte arrays to a file. First, a 256-byte array
is created and filled with values 0-255. The entire array is written, followed
by just the first 128 bytes. This approach is much faster than writing individual
bytes.

## Appending to Files

FileOutputStream can append to existing files instead of overwriting them. This
is controlled by the append parameter in constructors. Appending is useful for
log files or when accumulating data.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String message = "Appended line\n";
        
        try (FileOutputStream fos = 
                new FileOutputStream("log.txt", true)) {
            
            // Append multiple messages
            for (int i = 1; i &lt;= 5; i++) {
                String entry = i + ": " + message;
                fos.write(entry.getBytes());
            }
            
            System.out.println("Messages appended to file");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to append data to an existing file. The FileOutputStream
is created with append mode enabled. Five log entries are written to the file.
Each write operation adds to the end of the file rather than overwriting it.

## Using FileChannel

FileOutputStream provides access to the underlying FileChannel. This allows for
advanced file operations like file locking or memory-mapped I/O. The channel
remains open until the stream is closed.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("channel.txt");
             FileChannel channel = fos.getChannel()) {
            
            String text = "Written using FileChannel";
            ByteBuffer buffer = ByteBuffer.wrap(text.getBytes());
            
            // Write through channel
            channel.write(buffer);
            
            System.out.println("Data written via FileChannel");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using FileChannel from FileOutputStream. A ByteBuffer
is created and filled with data. The channel writes the buffer contents to the
file. This approach provides more control over file operations than the basic
write methods.

## Error Handling and Cleanup

Proper error handling is essential when working with file streams. Resources must
be closed even if exceptions occur. Try-with-resources ensures proper cleanup.
File operations should handle potential security and permission issues.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("important.dat")) {
            
            // Critical data writing
            byte[] criticalData = getCriticalData();
            fos.write(criticalData);
            
            // Force write to disk
            fos.getFD().sync();
            
            System.out.println("Critical data saved successfully");
        } catch (IOException e) {
            System.err.println("Failed to write critical data: " + e.getMessage());
            // Handle error appropriately
        }
    }
    
    private static byte[] getCriticalData() {
        // Simulate getting important data
        return "Very important information".getBytes();
    }
}

This example shows robust error handling for file operations. The try-with-resources
ensures the stream is closed. The file descriptor's sync method forces data to
disk. Errors are caught and handled appropriately. This pattern is recommended
for production code.

## Source

[Java FileOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileOutputStream.html)

In this article, we've covered the essential methods and features of the Java
FileOutputStream class. Understanding these concepts is crucial for working
with file output operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).