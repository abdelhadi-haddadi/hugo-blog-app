+++
title = "Java OutputStreamWriter Class"
date = 2025-08-29T19:59:26.593+01:00
draft = false
description = "Complete Java OutputStreamWriter class tutorial covering all methods with examples. Learn about character encoding in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java OutputStreamWriter Class

Last modified: April 16, 2025

 

The java.io.OutputStreamWriter class bridges character streams to
byte streams. It converts characters to bytes using a specified charset. This
class is crucial for handling text output with specific encodings.

OutputStreamWriter wraps around an OutputStream and
provides character encoding functionality. It uses either a default or specified
charset encoder. This class is often used with file operations and network I/O.

## OutputStreamWriter Class Overview

OutputStreamWriter extends Writer and handles
character-to-byte conversion. Key methods include write operations, flush, and
close. The class manages an internal buffer for efficient output operations.

public class OutputStreamWriter extends Writer {
    public OutputStreamWriter(OutputStream out);
    public OutputStreamWriter(OutputStream out, String charsetName);
    public OutputStreamWriter(OutputStream out, Charset cs);
    public OutputStreamWriter(OutputStream out, CharsetEncoder enc);
    public String getEncoding();
    public void write(int c);
    public void write(char[] cbuf, int off, int len);
    public void write(String str, int off, int len);
    public void flush();
    public void close();
}

The code above shows key methods provided by OutputStreamWriter.
These methods allow writing characters with proper encoding conversion. The class
supports various charset specifications through different constructors.

## Creating an OutputStreamWriter

OutputStreamWriter is created by wrapping it around an OutputStream. You can
specify a charset or use the platform default. The charset determines how
characters are converted to bytes.

Main.java
  

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default charset
            FileOutputStream fos1 = new FileOutputStream("output1.txt");
            OutputStreamWriter osw1 = new OutputStreamWriter(fos1);
            
            // Create with UTF-8 charset
            FileOutputStream fos2 = new FileOutputStream("output2.txt");
            OutputStreamWriter osw2 = new OutputStreamWriter(fos2, 
                StandardCharsets.UTF_8);
            
            // Create with charset name
            FileOutputStream fos3 = new FileOutputStream("output3.txt");
            OutputStreamWriter osw3 = new OutputStreamWriter(fos3, "UTF-16");
            
            System.out.println("Writers created with different charsets");
            
            osw1.close();
            osw2.close();
            osw3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create OutputStreamWriter. The first
uses default charset, the second specifies UTF-8, and the third uses UTF-16.
Always close writers when done to release resources and flush any buffered data.

## Writing Characters with OutputStreamWriter

OutputStreamWriter provides several methods for writing character data. You can
write single characters, character arrays, or strings. All write operations
handle proper character encoding conversion.

Main.java
  

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("output.txt");
             OutputStreamWriter osw = new OutputStreamWriter(fos)) {
            
            // Write single character
            osw.write('A');
            
            // Write character array
            char[] chars = {'B', 'C', 'D'};
            osw.write(chars);
            
            // Write portion of character array
            osw.write(chars, 1, 2);
            
            // Write string
            osw.write("Hello World");
            
            // Write portion of string
            osw.write("Java OutputStreamWriter", 5, 15);
            
            System.out.println("Data written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows various write operations using OutputStreamWriter.
The try-with-resources statement ensures proper writer closure. Each write method
converts characters to bytes using the specified or default charset.

## Using Different Character Encodings

OutputStreamWriter's power comes from its ability to handle different character
encodings. This is crucial for internationalization and proper text handling.
The encoding affects how characters are represented as bytes.

Main.java
  

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        String text = "日本語のテキスト"; // Japanese text
        
        try {
            // Write with UTF-8 encoding
            OutputStreamWriter utf8Writer = new OutputStreamWriter(
                new FileOutputStream("utf8.txt"), StandardCharsets.UTF_8);
            utf8Writer.write(text);
            utf8Writer.close();
            
            // Write with UTF-16 encoding
            OutputStreamWriter utf16Writer = new OutputStreamWriter(
                new FileOutputStream("utf16.txt"), StandardCharsets.UTF_16);
            utf16Writer.write(text);
            utf16Writer.close();
            
            // Write with Windows-31J encoding (Japanese)
            OutputStreamWriter sjisWriter = new OutputStreamWriter(
                new FileOutputStream("sjis.txt"), "Windows-31J");
            sjisWriter.write(text);
            sjisWriter.close();
            
            System.out.println("Text written with different encodings");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing Japanese text with different encodings. UTF-8
uses variable-length encoding, UTF-16 uses fixed 2-byte encoding, and Windows-31J
is a Japanese-specific encoding. The resulting files will have different byte
representations of the same text.

## Flushing and Closing the Writer

OutputStreamWriter buffers data for efficiency. The flush method forces any
buffered data to be written. The close method flushes and then closes the
underlying stream.

Main.java
  

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FileOutputStream fos = new FileOutputStream("important.log");
             OutputStreamWriter osw = new OutputStreamWriter(fos)) {
            
            // Write critical log messages
            osw.write("=== APPLICATION START ===\n");
            
            // Force write to disk immediately
            osw.flush();
            
            // Simulate important operation
            System.out.println("Performing critical operation...");
            
            osw.write("Operation completed successfully\n");
            
            // No explicit flush needed - close() will handle it
            System.out.println("Writer will be automatically closed");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows proper use of flush for critical data. The first message is
flushed immediately to ensure it's written. The try-with-resources ensures the
writer is properly closed, which includes a final flush operation.

## Getting Encoding Information

The getEncoding method returns the name of the character encoding being used.
This is useful for debugging and when the encoding wasn't explicitly specified.

Main.java
  

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try {
            // Default encoding
            OutputStreamWriter defaultWriter = new OutputStreamWriter(
                new FileOutputStream("default.txt"));
            System.out.println("Default encoding: " + defaultWriter.getEncoding());
            defaultWriter.close();
            
            // UTF-8 encoding
            OutputStreamWriter utf8Writer = new OutputStreamWriter(
                new FileOutputStream("utf8.txt"), StandardCharsets.UTF_8);
            System.out.println("UTF-8 encoding: " + utf8Writer.getEncoding());
            utf8Writer.close();
            
            // UTF-16 encoding
            OutputStreamWriter utf16Writer = new OutputStreamWriter(
                new FileOutputStream("utf16.txt"), "UTF-16");
            System.out.println("UTF-16 encoding: " + utf16Writer.getEncoding());
            utf16Writer.close();
            
            // ISO-8859-1 encoding
            OutputStreamWriter latin1Writer = new OutputStreamWriter(
                new FileOutputStream("latin1.txt"), "ISO-8859-1");
            System.out.println("ISO-8859-1 encoding: " + latin1Writer.getEncoding());
            latin1Writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates how to check the encoding used by an OutputStreamWriter.
The getEncoding method returns the canonical name of the charset. This helps
verify that text is being written with the intended encoding.

## Source

[Java OutputStreamWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/OutputStreamWriter.html)

In this article, we've covered the essential methods and features of the Java
OutputStreamWriter class. Understanding these concepts is crucial for working
with character encoding in Java I/O operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).