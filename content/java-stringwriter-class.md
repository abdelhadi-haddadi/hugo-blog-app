+++
title = "Java StringWriter Class"
date = 2025-08-29T19:59:33.322+01:00
draft = false
description = "Complete Java StringWriter class tutorial covering all methods with examples. Learn about string-based output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringWriter Class

Last modified: April 16, 2025

 

The java.io.StringWriter class is a character stream that collects
output in a string buffer. It extends Writer class and provides
convenient methods for string manipulation. The buffer grows automatically as
data is written.

StringWriter is useful when you need to build strings from various
output operations. It can be used with APIs that expect a Writer
but where you want to capture the output as a string. The class is not
thread-safe by default.

## StringWriter Class Overview

StringWriter provides methods to write characters, strings, and
portions of strings to an internal buffer. Key methods include various write
operations, string retrieval, and buffer manipulation. The buffer is accessible
through StringBuffer methods.

public class StringWriter extends Writer {
    public StringWriter();
    public StringWriter(int initialSize);
    public void write(int c);
    public void write(String str);
    public void write(String str, int off, int len);
    public void write(char[] cbuf, int off, int len);
    public String toString();
    public StringBuffer getBuffer();
    public void flush();
    public void close();
}

The code above shows key methods provided by StringWriter. These
methods allow for flexible string building operations. The class automatically
handles buffer management and growth. The close method has no
effect as no system resources are used.

## Creating a StringWriter

StringWriter can be created with default initial size or with a specified buffer
size. The default constructor creates a buffer with default initial capacity.
Specifying initial size can optimize performance for known output sizes.

Main.java
  

import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        // Create with default buffer size
        StringWriter writer1 = new StringWriter();
        
        // Create with custom initial buffer size (256 chars)
        StringWriter writer2 = new StringWriter(256);
        
        writer1.write("Default buffer writer");
        writer2.write("Custom buffer writer");
        
        System.out.println(writer1.toString());
        System.out.println(writer2.toString());
        
        // No need to close StringWriter, but good practice
        writer1.close();
        writer2.close();
    }
}

This example demonstrates different ways to create StringWriter. The first uses
default buffer size, while the second specifies 256 characters initial capacity.
Both writers are used to write strings which are then printed. Closing is shown
but not required.

## Writing Data to StringWriter

StringWriter provides multiple write methods for different data types. You can
write single characters, character arrays, strings, and portions of strings. All
write operations append to the internal buffer.

Main.java
  

import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        StringWriter writer = new StringWriter();
        
        // Write single character
        writer.write('A');
        
        // Write character array
        char[] chars = {'B', 'C', 'D'};
        writer.write(chars);
        
        // Write string
        writer.write("EFG");
        
        // Write portion of string
        writer.write("HIJKLMN", 2, 3); // Writes "JKL"
        
        // Write integer (treated as character)
        writer.write(79); // ASCII 79 is 'O'
        
        System.out.println("Result: " + writer.toString());
    }
}

This example shows various write operations supported by StringWriter. Each write
appends to the internal buffer. The integer write treats the value as a Unicode
character code. The final result combines all written data into one string.

## Using StringWriter with Other APIs

StringWriter can be passed to methods expecting a Writer parameter. This is
useful for capturing output from APIs that write to streams. The collected output
can then be retrieved as a string.

Main.java
  

import java.io.PrintWriter;
import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        
        // Use PrintWriter methods
        pw.println("This is line 1");
        pw.printf("Formatted value: %.2f%n", 123.456);
        pw.println("This is line 3");
        
        // Ensure all data is written to StringWriter
        pw.flush();
        
        // Get the accumulated string
        String result = sw.toString();
        System.out.println("Captured output:\n" + result);
    }
}

This example demonstrates using StringWriter with PrintWriter. PrintWriter's
output is captured in the StringWriter. The flush call ensures all buffered data
is written. The result shows how multiple writes combine in the string buffer.

## Accessing the Internal Buffer

StringWriter provides direct access to its internal StringBuffer. This allows
modifying the buffer directly or checking its current state. The getBuffer
method returns the actual buffer, not a copy.

Main.java
  

import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        StringWriter writer = new StringWriter();
        
        writer.write("Initial content");
        System.out.println("Initial: " + writer.toString());
        
        // Get the StringBuffer
        StringBuffer buffer = writer.getBuffer();
        
        // Modify buffer directly
        buffer.append(" - appended directly");
        buffer.insert(7, "INSERTED ");
        
        System.out.println("Modified: " + writer.toString());
        System.out.println("Buffer length: " + buffer.length());
        System.out.println("Buffer capacity: " + buffer.capacity());
    }
}

This example shows how to access and modify the internal StringBuffer. Changes
made to the buffer are immediately reflected in the StringWriter. The buffer's
length and capacity can be inspected. Direct buffer manipulation provides more
control over string building.

## Exception Handling with StringWriter

Unlike most I/O classes, StringWriter methods don't throw IOException. This
makes it simpler to use as no try-catch blocks are needed. The close method is
also a no-op but included for Writer interface compatibility.

Main.java
  

import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        StringWriter writer = new StringWriter();
        
        try {
            // These operations won't throw IOException
            writer.write("Safe operation 1");
            writer.write("Safe operation 2", 5, 9);
            
            // Can call close multiple times safely
            writer.close();
            writer.close();
            
            System.out.println("Content: " + writer.toString());
        } finally {
            // Demonstrating proper resource handling pattern
            writer.close();
        }
    }
}

This example demonstrates StringWriter's exception safety. The try-finally block
shows proper resource handling pattern, though not strictly necessary. Multiple
close calls are harmless. All operations complete successfully without exception
handling.

## Performance Considerations

StringWriter performance depends on its internal StringBuffer operations. For
large amounts of data, specifying initial capacity can prevent costly buffer
resizing. Bulk write operations are generally more efficient than single
character writes.

Main.java
  

import java.io.StringWriter;

public class Main {

    public static void main(String[] args) {
        final int ITERATIONS = 100000;
        
        // Without initial capacity
        long start1 = System.currentTimeMillis();
        StringWriter writer1 = new StringWriter();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            writer1.write("test");
        }
        long end1 = System.currentTimeMillis();
        
        // With initial capacity
        long start2 = System.currentTimeMillis();
        StringWriter writer2 = new StringWriter(ITERATIONS * 4);
        for (int i = 0; i &lt; ITERATIONS; i++) {
            writer2.write("test");
        }
        long end2 = System.currentTimeMillis();
        
        System.out.println("Default constructor time: " + (end1 - start1) + "ms");
        System.out.println("Initial capacity time: " + (end2 - start2) + "ms");
    }
}

This example compares performance with and without initial capacity specification.
The version with initial capacity avoids buffer resizing and is typically faster.
Actual performance gains depend on usage patterns and data sizes.

## Source

[Java StringWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/StringWriter.html)

In this article, we've covered the essential methods and features of the Java
StringWriter class. Understanding these concepts is crucial for working with
string-based output operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).