+++
title = "Java FileWriter Class"
date = 2025-08-29T19:59:17.526+01:00
draft = false
description = "Complete Java FileWriter class tutorial covering all methods with examples. Learn about file writing operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileWriter Class

Last modified: April 16, 2025

 

The java.io.FileWriter class is a convenience class for writing
character files. It extends OutputStreamWriter and creates the
necessary FileOutputStream internally. FileWriter uses the default
character encoding and buffer size.

FileWriter is designed for writing streams of characters to files.
It's commonly used for text file operations. The class handles character to byte
conversion automatically. For better performance, wrap it in a BufferedWriter.

## FileWriter Class Overview

FileWriter provides several constructors for different file writing
scenarios. It can append to existing files or overwrite them. The class throws
IOException for file access errors. All write operations are
buffered by default.

public class FileWriter extends OutputStreamWriter {
    public FileWriter(String fileName) throws IOException;
    public FileWriter(String fileName, boolean append) throws IOException;
    public FileWriter(File file) throws IOException;
    public FileWriter(File file, boolean append) throws IOException;
    public FileWriter(FileDescriptor fd);
    public void write(int c) throws IOException;
    public void write(char[] cbuf) throws IOException;
    public void write(char[] cbuf, int off, int len) throws IOException;
    public void write(String str) throws IOException;
    public void write(String str, int off, int len) throws IOException;
    public void flush() throws IOException;
    public void close() throws IOException;
}

The code above shows key methods provided by FileWriter. These
methods allow writing characters and strings to files. The append parameter in
constructors controls whether to overwrite or append to existing files.

## Creating a FileWriter

FileWriter can be created using file path strings, File objects, or FileDescriptor.
The simplest constructor takes just a file name. All constructors may throw
IOException if the file cannot be opened.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with file path (overwrites existing)
            FileWriter writer1 = new FileWriter("output.txt");
            
            // Create with append mode
            FileWriter writer2 = new FileWriter("log.txt", true);
            
            // Create with File object
            java.io.File file = new java.io.File("data.txt");
            FileWriter writer3 = new FileWriter(file);
            
            System.out.println("FileWriter instances created successfully");
            
            writer1.close();
            writer2.close();
            writer3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create FileWriter instances. The first
writer overwrites existing files. The second appends to files. Always close
writers when done to ensure all data is written and resources are released.

## Writing Characters to a File

FileWriter provides several write methods for character data. The simplest writes
a single character. Character arrays and strings can also be written. All write
operations are buffered for efficiency.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("characters.txt")) {
            
            // Write single character
            writer.write('A');
            
            // Write character array
            char[] chars = {'B', 'C', 'D'};
            writer.write(chars);
            
            // Write portion of character array
            char[] moreChars = {'E', 'F', 'G', 'H', 'I'};
            writer.write(moreChars, 1, 3); // Writes F, G, H
            
            System.out.println("Characters written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows different character writing methods. The try-with-resources
statement ensures proper writer closure. Character arrays can be written fully
or partially. Data may remain in buffers until flush() or close() is called.

## Writing Strings to a File

FileWriter provides convenient methods for writing strings. Entire strings or
substrings can be written. String writing is efficient as it avoids manual
character array conversion. Newlines should be explicitly added when needed.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("strings.txt")) {
            
            // Write complete string
            writer.write("Hello, World!\n");
            
            // Write portion of string
            String message = "Java FileWriter Example";
            writer.write(message, 5, 10); // Writes "FileWriter"
            
            // Multiple writes
            writer.write("\n");
            writer.write("Line 1\nLine 2\nLine 3");
            
            System.out.println("Strings written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates string writing operations. The first write outputs a
complete string with newline. The second writes a substring. Multiple writes
are combined in the output file. Remember that newlines are platform-dependent.

## Appending to Existing Files

FileWriter can append to existing files instead of overwriting them. This is
useful for log files and data collection. The append mode is specified in the
constructor. Existing content is preserved when appending.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // First create a file with initial content
            FileWriter writer1 = new FileWriter("log.txt");
            writer1.write("=== Application Log ===\n");
            writer1.write("Startup completed\n");
            writer1.close();
            
            // Now append to the file
            FileWriter writer2 = new FileWriter("log.txt", true);
            writer2.write("User logged in at " + new java.util.Date() + "\n");
            writer2.write("Data processing started\n");
            writer2.close();
            
            System.out.println("Log entries appended successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to append to an existing file. The first writer creates
the file with initial content. The second writer opens in append mode and adds
new entries. The boolean true parameter enables append mode in the constructor.

## Flushing and Closing the Writer

FileWriter buffers writes for efficiency. The flush method forces buffered data
to be written immediately. The close method flushes and releases resources.
Always close writers to prevent resource leaks.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        FileWriter writer = null;
        try {
            writer = new FileWriter("important.txt");
            
            // Write critical data
            writer.write("Critical System Data\n");
            writer.write("Version: 2.5.1\n");
            
            // Ensure data is written immediately
            writer.flush();
            System.out.println("Data flushed to disk");
            
            // Write more data
            writer.write("Last updated: " + new java.util.Date() + "\n");
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                    System.out.println("Writer closed successfully");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

This example demonstrates proper resource management with flush and close. The
flush call ensures critical data is written immediately. The finally block
guarantees the writer is closed. In Java 7+, try-with-resources is preferred
for automatic closing.

## Using FileWriter with BufferedWriter

For better performance with many small writes, wrap FileWriter in BufferedWriter.
This adds another buffer layer reducing system calls. BufferedWriter provides
additional methods like newLine().

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(
                new FileWriter("buffered.txt"))) {
            
            // Write lines efficiently
            for (int i = 1; i &lt;= 10; i++) {
                writer.write("Line " + i);
                writer.newLine(); // Platform-independent newline
            }
            
            // Write large text
            writer.write("This is a longer piece of text that will benefit ");
            writer.write("from buffering as it reduces the number of system ");
            writer.write("calls needed to write all this data to the file.");
            
            System.out.println("Data written with buffering");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows FileWriter wrapped in BufferedWriter. The newLine method
provides platform-independent line endings. Buffering improves performance for
many small writes. The try-with-resources handles closing both writers properly.

## Source

[Java FileWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileWriter.html)

In this article, we've covered the essential methods and features of the Java
FileWriter class. Understanding these concepts is crucial for working with
text file output in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).