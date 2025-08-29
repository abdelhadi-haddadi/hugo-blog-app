+++
title = "Java PrintStream Class"
date = 2025-08-29T19:59:28.828+01:00
draft = false
description = "Complete Java PrintStream class tutorial covering all methods with examples. Learn about formatted output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PrintStream Class

Last modified: April 16, 2025

 

The java.io.PrintStream class adds functionality to other output
streams. It provides methods to print various data values conveniently. Unlike
other output streams, it never throws an IOException.

PrintStream automatically flushes its buffer when a newline
character is written. It handles character encoding conversions automatically.
This class is commonly used for standard output via System.out.

## PrintStream Class Overview

PrintStream extends FilterOutputStream and provides
formatted output capabilities. Key methods include various print and println
methods, format/printf methods, and error checking. All methods handle character
conversion.

public class PrintStream extends FilterOutputStream
    implements Appendable, Closeable {
    public PrintStream(OutputStream out);
    public PrintStream(OutputStream out, boolean autoFlush);
    public PrintStream(OutputStream out, boolean autoFlush, String encoding);
    public PrintStream(String fileName);
    public PrintStream(File file);
    public void print(boolean b);
    public void print(char c);
    public void print(int i);
    public void print(long l);
    public void print(float f);
    public void print(double d);
    public void print(char[] s);
    public void print(String s);
    public void print(Object obj);
    public void println();
    public void println(boolean x);
    // ... other println methods
    public PrintStream printf(String format, Object... args);
    public PrintStream format(String format, Object... args);
    public void write(int b);
    public void write(byte[] buf, int off, int len);
    public boolean checkError();
    public void close();
}

The code above shows key methods provided by PrintStream. These
methods allow for convenient output of various data types. The class implements
Appendable for string concatenation operations.

## Creating a PrintStream

PrintStream can be created from an OutputStream, file path, or File object. You
can specify auto-flush behavior and character encoding. The auto-flush parameter
determines if the stream flushes on newline.

Main.java
  

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create from OutputStream with auto-flush
            PrintStream ps1 = new PrintStream(
                new FileOutputStream("output1.txt"), true);
            
            // Create from file path with specified encoding
            PrintStream ps2 = new PrintStream("output2.txt", "UTF-8");
            
            // Create from File object
            PrintStream ps3 = new PrintStream(new File("output3.txt"));
            
            System.out.println("Three PrintStreams created successfully");
            
            ps1.close();
            ps2.close();
            ps3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PrintStream. The first uses
an OutputStream with auto-flush enabled. The second specifies UTF-8 encoding.
The third creates from a File object. Always close streams when done.

## Basic Print and Println Methods

PrintStream provides print and println methods for all primitive types and
objects. The println variants add a newline after printing. These methods never
throw IOExceptions, instead setting an internal error flag.

Main.java
  

import java.io.PrintStream;

public class Main {

    public static void main(String[] args) {
        try (PrintStream ps = new PrintStream("output.txt")) {
            
            // Print various data types
            ps.print(true);
            ps.print(' ');
            ps.print(123);
            ps.print(' ');
            ps.print(3.14159);
            ps.println();
            
            // Println variants
            ps.println("This is a string");
            ps.println(new Object());
            
            System.out.println("Data written to output.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows basic print and println usage. The first line prints multiple
values without newlines. The println methods add automatic line terminators. The
try-with-resources ensures proper stream closure.

## Formatted Output with printf

The printf method provides C-style formatted output. It uses format strings with
specifiers to control output. This is identical to the format method. The method
returns the PrintStream for method chaining.

Main.java
  

import java.io.PrintStream;
import java.util.Date;

public class Main {

    public static void main(String[] args) {
        try (PrintStream ps = new PrintStream("formatted.txt")) {
            
            // Basic formatting
            ps.printf("Integer: %d, Float: %.2f%n", 42, 3.14159);
            
            // Date formatting
            ps.printf("Current date: %tF %n", new Date());
            
            // Method chaining
            ps.printf("Name: %s %n", "John")
              .printf("Age: %d %n", 30);
            
            // Width and alignment
            ps.printf("|%-10s|%10s|%n", "Left", "Right");
            
            System.out.println("Formatted output written");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates printf formatting capabilities. It shows number
formatting, date formatting, method chaining, and text alignment. The %n
specifier is platform-independent newline. Format strings follow the same rules
as String.format().

## Error Handling with checkError

PrintStream doesn't throw IOExceptions. Instead, it sets an internal error flag.
The checkError method returns this flag's state. Once set, the flag stays set
until the stream is closed.

Main.java
  

import java.io.PrintStream;

public class Main {

    public static void main(String[] args) {
        // Create PrintStream that will fail on write
        PrintStream ps = new PrintStream(new java.io.OutputStream() {
            @Override
            public void write(int b) {
                // Simulate write failure
                throw new RuntimeException("Write failed");
            }
        });
        
        // Attempt to write
        ps.println("This will fail");
        
        // Check error status
        if (ps.checkError()) {
            System.out.println("Error occurred during writing");
        }
        
        // The error persists
        System.out.println("Error still set? " + ps.checkError());
        
        ps.close();
    }
}

This example simulates a write failure scenario. The custom OutputStream always
throws an exception. After the failed write, checkError returns true. The error
state persists until stream closure. This demonstrates PrintStream's error
handling approach.

## Redirecting System.out

PrintStream is commonly used to redirect standard output. The System.setOut
method accepts a PrintStream. This allows capturing console output to files or
other destinations.

Main.java
  

import java.io.PrintStream;
import java.io.File;

public class Main {

    public static void main(String[] args) {
        try {
            // Save original System.out
            PrintStream originalOut = System.out;
            
            // Redirect to file
            PrintStream fileOut = new PrintStream(new File("console.log"));
            System.setOut(fileOut);
            
            // These will go to file
            System.out.println("This goes to console.log");
            System.out.printf("Formatted: %d %n", 42);
            
            // Restore original System.out
            System.setOut(originalOut);
            System.out.println("Back to console output");
            
            fileOut.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows how to redirect System.out to a file. The original PrintStream
is saved for restoration. All System.out calls then write to the file. Finally,
the original output is restored. This technique is useful for logging.

## Appending to Files

While PrintStream doesn't directly support appending, you can achieve this by
wrapping a FileOutputStream in append mode. This allows adding to existing files
without overwriting.

Main.java
  

import java.io.FileOutputStream;
import java.io.PrintStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("log.txt", true);
             PrintStream ps = new PrintStream(fos)) {
            
            ps.println("New log entry at " + System.currentTimeMillis());
            System.out.println("Appended to log.txt");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates appending to a file. The FileOutputStream is created
with append mode enabled. The PrintStream then writes to this stream. Each run
adds a new line without overwriting existing content. The timestamp ensures
unique entries.

## Source

[Java PrintStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PrintStream.html)

In this article, we've covered the essential methods and features of the Java
PrintStream class. Understanding these concepts is crucial for working with
formatted output in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).