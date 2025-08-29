+++
title = "Java Writer Class"
date = 2025-08-29T19:59:34.454+01:00
draft = false
description = "Complete Java Writer class tutorial covering all methods with examples. Learn about character output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Writer Class

Last modified: April 16, 2025

 

The java.io.Writer class is an abstract class for writing character
streams. It serves as the superclass for all character output stream classes.
The class provides methods for writing single characters, arrays of characters,
and strings.

Writer implements AutoCloseable, Flushable,
and Appendable interfaces. Subclasses must implement the write,
flush, and close methods. Writers can be buffered for better performance.

## Writer Class Overview

Writer provides fundamental methods for character output operations.
Key methods include various write operations, flushing, and closing the stream.
The class handles character encoding conversion internally.

public abstract class Writer implements Appendable, Closeable, Flushable {
    protected Object lock;
    protected Writer();
    protected Writer(Object lock);
    public void write(int c);
    public void write(char[] cbuf);
    public abstract void write(char[] cbuf, int off, int len);
    public void write(String str);
    public void write(String str, int off, int len);
    public Writer append(CharSequence csq);
    public Writer append(CharSequence csq, int start, int end);
    public Writer append(char c);
    public abstract void flush();
    public abstract void close();
}

The code above shows key methods provided by Writer. These methods
allow for writing character data to various destinations. The class uses
synchronization for thread safety, either with an explicit lock object or the
Writer instance itself.

## Creating a FileWriter

FileWriter is a common Writer subclass for writing
character files. It uses default character encoding and buffer size. For more
control, wrap a FileOutputStream with an OutputStreamWriter.

Main.java
  

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        try {
            // Create FileWriter with default settings
            Writer writer1 = new FileWriter("output1.txt");
            
            // Create FileWriter with append mode
            Writer writer2 = new FileWriter("output2.txt", true);
            
            // Write some data
            writer1.write("Hello, FileWriter!");
            writer2.append("\nAppended line");
            
            System.out.println("Files written successfully");
            
            // Close writers
            writer1.close();
            writer2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates creating FileWriter instances. The first
overwrites existing files, while the second appends to them. Always close
writers to ensure data is flushed and resources released. The append
method provides a fluent interface.

## Writing Characters and Strings

Writer provides multiple methods for writing character data. You can
write single characters, character arrays, or strings. Partial writes are
supported through offset and length parameters.

Main.java
  

import java.io.StringWriter;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        try (Writer writer = new StringWriter()) {
            // Write single character
            writer.write('J');
            
            // Write character array
            char[] chars = {'a', 'v', 'a'};
            writer.write(chars);
            
            // Write partial character array
            writer.write(chars, 1, 2);
            
            // Write string
            writer.write(" Programming");
            
            // Write partial string
            writer.write(" is fun!", 3, 4);
            
            System.out.println("Result: " + writer.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows various write operations using a StringWriter.
The output combines all written data into a single string. The partial writes
demonstrate selecting portions of arrays and strings. StringWriter is useful for
building strings in memory.

## Using BufferedWriter

BufferedWriter wraps another Writer to buffer output.
This improves performance by reducing native I/O operations. The default buffer
size is 8192 characters, but can be customized.

Main.java
  

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        try (Writer fileWriter = new FileWriter("buffered.txt");
             BufferedWriter writer = new BufferedWriter(fileWriter)) {
            
            // Write lines with newLine()
            writer.write("First line");
            writer.newLine();
            writer.write("Second line");
            writer.newLine();
            
            // Write multiple characters
            writer.write("Third line with some extra text");
            
            // Flush explicitly (not needed with try-with-resources)
            writer.flush();
            
            System.out.println("Data written to buffered.txt");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using BufferedWriter for efficient writing.
The newLine method writes platform-specific line separators. The
buffer automatically flushes when full or when closed. Explicit flushing ensures
data is written immediately.

## Appending with Writer

The Appendable interface provides append methods for
convenient writing. These methods return the Writer instance, enabling method
chaining. They can write CharSequence objects or single characters.

Main.java
  

import java.io.StringWriter;
import java.io.Writer;

public class Main {

    public static void main(String[] args) {
        try (Writer writer = new StringWriter()) {
            // Chain append operations
            writer.append("Hello")
                  .append(' ')
                  .append("World")
                  .append("!")
                  .append('\n')
                  .append("Java ")
                  .append("Writer ", 0, 6)
                  .append("example");
            
            System.out.println(writer.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows method chaining with append operations. The
append methods are more flexible than write as they
accept any CharSequence. Partial appending is supported through
start and end parameters. The result is built efficiently in memory.

## Using OutputStreamWriter

OutputStreamWriter bridges byte streams to character streams. It
converts characters to bytes using a specified charset. This is useful when you
need to control character encoding for output.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try (Writer writer = new OutputStreamWriter(
                new FileOutputStream("encoded.txt"), StandardCharsets.UTF_8)) {
            
            // Write text with specified encoding
            writer.write("UTF-8 encoded text: ");
            writer.write("こんにちは"); // Japanese hello
            writer.write(" привет"); // Russian hello
            writer.write(" 你好"); // Chinese hello
            
            System.out.println("Text written with UTF-8 encoding");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing text with specific character encoding. The
OutputStreamWriter uses UTF-8 to convert characters to bytes. This
is essential for proper handling of non-ASCII characters. The resulting file will
contain correctly encoded multi-language text.

## Source

[Java Writer Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/Writer.html)

In this article, we've covered the essential methods and features of the Java
Writer class. Understanding these concepts is crucial for working with character
output operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).