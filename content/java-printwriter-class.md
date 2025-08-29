+++
title = "Java PrintWriter Class"
date = 2025-08-29T19:59:28.821+01:00
draft = false
description = "Complete Java PrintWriter class tutorial covering all methods with examples. Learn about formatted output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PrintWriter Class

Last modified: April 16, 2025

 

The java.io.PrintWriter class provides formatted output capabilities
to character streams. It implements all print methods found in PrintStream but
doesn't throw I/O exceptions. PrintWriter can wrap various output destinations.

PrintWriter supports automatic flushing when println methods are
called. It converts primitive values to strings using proper locale conventions.
Unlike PrintStream, PrintWriter uses proper character encoding for text output.

## PrintWriter Class Overview

PrintWriter extends Writer and provides formatted
printing functionality. Key methods include various print and println methods,
formatting support, and stream control. It handles character conversion and
buffering automatically.

public class PrintWriter extends Writer {
    public PrintWriter(Writer out);
    public PrintWriter(Writer out, boolean autoFlush);
    public PrintWriter(OutputStream out);
    public PrintWriter(OutputStream out, boolean autoFlush);
    public PrintWriter(String fileName) throws FileNotFoundException;
    public PrintWriter(File file) throws FileNotFoundException;
    
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
    // Other println methods...
    
    public PrintWriter printf(String format, Object... args);
    public PrintWriter format(String format, Object... args);
    
    public void flush();
    public void close();
    public boolean checkError();
}

The code above shows key methods provided by PrintWriter. These
methods allow for formatted output of various data types. The class supports
automatic flushing and error checking through checkError().

## Creating a PrintWriter

PrintWriter can be created with various output destinations including files,
output streams, and other writers. You can specify auto-flush behavior. The
constructors handle character encoding appropriately for text output.

Main.java
  

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintWriter;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with file name
            PrintWriter writer1 = new PrintWriter("output1.txt");
            
            // Create with File object
            PrintWriter writer2 = new PrintWriter(new File("output2.txt"));
            
            // Create with OutputStream
            PrintWriter writer3 = new PrintWriter(
                new FileOutputStream("output3.txt"));
            
            // Create with auto-flush
            PrintWriter writer4 = new PrintWriter(
                new FileOutputStream("output4.txt"), true);
            
            System.out.println("Four PrintWriters created successfully");
            
            writer1.close();
            writer2.close();
            writer3.close();
            writer4.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PrintWriter instances. The
first two create writers for files directly. The third wraps an OutputStream.
The fourth enables auto-flush on println calls. Always close writers when done.

## Writing Text with PrintWriter

PrintWriter provides print and println methods for all primitive types and
objects. These methods convert values to strings using toString.
The println variants add line terminators after output.

Main.java
  

import java.io.PrintWriter;

public class Main {

    public static void main(String[] args) {
        try (PrintWriter writer = new PrintWriter("output.txt")) {
            
            // Print various data types
            writer.print(true);
            writer.print(' ');
            writer.print(42);
            writer.print(' ');
            writer.print(3.14159);
            writer.println();
            
            writer.println("This is a string");
            writer.println(new Object());
            
            System.out.println("Data written to file");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows basic printing operations with PrintWriter. The print methods
write data without line terminators. The println methods add appropriate line
endings. The try-with-resources ensures proper writer closure. All values are
converted to strings.

## Formatted Output with printf

PrintWriter supports formatted output through printf and format methods. These
use format strings similar to C's printf. Format specifiers control how values
are converted and displayed.

Main.java
  

import java.io.PrintWriter;
import java.util.Date;

public class Main {

    public static void main(String[] args) {
        try (PrintWriter writer = new PrintWriter("formatted.txt")) {
            
            String name = "John Doe";
            int age = 35;
            double salary = 45250.75;
            Date now = new Date();
            
            writer.printf("Name: %s, Age: %d\n", name, age);
            writer.printf("Salary: %,.2f\n", salary);
            writer.printf("Current date/time: %tF %tT\n", now, now);
            writer.printf("Hex value: %x, Octal value: %o\n", 255, 255);
            
            System.out.println("Formatted data written to file");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates formatted output with PrintWriter. The %s, %d, and %f
specifiers handle strings, integers, and floats. The %tF and %tT format dates.
Number formatting includes thousands separators and decimal places. Format
strings can include literal text and special characters.

## Error Handling with PrintWriter

Unlike most I/O classes, PrintWriter methods don't throw
IOException. Instead, errors are tracked internally and can be
checked with checkError. This makes code cleaner but requires
explicit error checking.

Main.java
  

import java.io.PrintWriter;

public class Main {

    public static void main(String[] args) {
        PrintWriter writer = new PrintWriter(System.out);
        
        // Write some data
        writer.println("First line");
        writer.println(1 / 0);  // ArithmeticException but not caught
        
        // Check for errors
        if (writer.checkError()) {
            System.out.println("An error occurred during writing");
        }
        
        writer.close();
    }
}

This example shows PrintWriter's error handling approach. The division by zero
would normally throw an exception, but PrintWriter suppresses it. The checkError
method must be called to detect problems. This behavior is different from most
Java I/O classes.

## Auto-Flushing Behavior

PrintWriter can be configured to automatically flush when println is called. This
ensures output is written immediately after line endings. Regular print calls
don't trigger auto-flushing.

Main.java
  

import java.io.PrintWriter;

public class Main {

    public static void main(String[] args) {
        // Without auto-flush
        PrintWriter writer1 = new PrintWriter(System.out);
        writer1.print("This won't appear immediately");
        // Need manual flush
        writer1.flush();
        
        // With auto-flush
        PrintWriter writer2 = new PrintWriter(System.out, true);
        writer2.println("This appears immediately due to auto-flush");
        
        writer1.close();
        writer2.close();
    }
}

This example compares auto-flush and manual flushing behavior. The first writer
requires explicit flush calls. The second writer flushes automatically on
println. Auto-flush is useful for interactive output where immediate display is
needed. Manual flushing provides more control over I/O operations.

## Writing to Multiple Destinations

PrintWriter can write to various output destinations including system streams,
files, and network connections. The same printing methods work consistently
across all destinations. This provides flexible output capabilities.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        // Write to standard output
        PrintWriter consoleWriter = new PrintWriter(System.out);
        consoleWriter.println("Writing to console");
        consoleWriter.flush();
        
        // Write to string buffer
        StringWriter stringWriter = new StringWriter();
        PrintWriter stringPrinter = new PrintWriter(stringWriter);
        stringPrinter.println("Writing to string buffer");
        stringPrinter.close();
        System.out.println("String content: " + stringWriter.toString());
        
        // Write to byte array
        ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
        PrintWriter byteWriter = new PrintWriter(byteStream);
        byteWriter.println("Writing to byte array");
        byteWriter.close();
        System.out.println("Byte content: " + byteStream.toString());
        
        consoleWriter.close();
    }
}

This example demonstrates PrintWriter with different output destinations. The
first writes to standard output. The second captures output in a string. The
third writes to a byte array. All use the same printing methods. This shows
PrintWriter's versatility across output types.

## Source

[Java PrintWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PrintWriter.html)

In this article, we've covered the essential methods and features of the Java
PrintWriter class. Understanding these concepts is crucial for working with
formatted text output in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).