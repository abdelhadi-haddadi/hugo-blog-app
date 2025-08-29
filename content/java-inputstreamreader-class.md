+++
title = "Java InputStreamReader Class"
date = 2025-08-29T19:59:19.819+01:00
draft = false
description = "Complete Java InputStreamReader class tutorial covering all methods with examples. Learn about character stream reading in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java InputStreamReader Class

Last modified: April 16, 2025

 

The java.io.InputStreamReader class is a bridge from byte streams to
character streams. It reads bytes and decodes them into characters using a
specified charset. The charset can be specified by name or use the platform's
default charset.

InputStreamReader extends the abstract Reader class.
It's commonly used with BufferedReader for efficient reading of
text data. Each invocation of a read method may cause bytes to be read from the
underlying byte input stream.

## InputStreamReader Class Overview

InputStreamReader provides methods for reading characters from a
byte stream. The class handles character encoding conversion automatically. Key
methods include various read operations and checking if the stream is ready to
be read.

public class InputStreamReader extends Reader {
    public InputStreamReader(InputStream in);
    public InputStreamReader(InputStream in, String charsetName);
    public InputStreamReader(InputStream in, Charset cs);
    public InputStreamReader(InputStream in, CharsetDecoder dec);
    public String getEncoding();
    public int read();
    public int read(char[] cbuf, int offset, int length);
    public boolean ready();
    public void close();
}

The code above shows key methods provided by InputStreamReader.
These methods allow reading characters from byte streams with proper encoding
handling. The class supports various constructors for different charset
specifications.

## Creating an InputStreamReader

InputStreamReader is created by wrapping it around an InputStream.
You can specify a charset or use the default. The charset determines how bytes
are converted to characters. Common charsets include UTF-8, ISO-8859-1, and
US-ASCII.

Main.java
  

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default charset
            FileInputStream fis1 = new FileInputStream("data.txt");
            InputStreamReader isr1 = new InputStreamReader(fis1);
            
            // Create with UTF-8 charset
            FileInputStream fis2 = new FileInputStream("data.txt");
            InputStreamReader isr2 = new InputStreamReader(fis2, 
                StandardCharsets.UTF_8);
            
            // Create with charset name
            FileInputStream fis3 = new FileInputStream("data.txt");
            InputStreamReader isr3 = new InputStreamReader(fis3, "ISO-8859-1");
            
            System.out.println("Default charset reader created");
            System.out.println("UTF-8 reader created");
            System.out.println("ISO-8859-1 reader created");
            
            isr1.close();
            isr2.close();
            isr3.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create InputStreamReader. The first
uses default charset, the second specifies UTF-8, and the third uses ISO-8859-1.
Always close readers when done to release resources. The underlying InputStream
is automatically closed when closing InputStreamReader.

## Reading Characters with InputStreamReader

InputStreamReader provides methods for reading characters. The simplest reads a
single character. More efficient methods read multiple characters into arrays.
All read operations handle character encoding conversion automatically.

Main.java
  

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (InputStreamReader isr = new InputStreamReader(
                new FileInputStream("data.txt"))) {
            
            // Read single character
            int charData;
            while ((charData = isr.read()) != -1) {
                System.out.print((char) charData);
            }
            
            System.out.println("\n\nReading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read a file character by character using
InputStreamReader. The try-with-resources statement ensures proper
reader closure. The read method returns -1 at end of stream. Each call to
read may cause bytes to be read from the underlying stream and
converted to characters.

## Reading Characters into an Array

For better performance, read multiple characters at once into a character array.
This reduces method calls and improves efficiency. The read method returns the
number of characters actually read.

Main.java
  

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (InputStreamReader isr = new InputStreamReader(
                new FileInputStream("textfile.txt"))) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = isr.read(buffer)) != -1) {
                System.out.println("Read " + charsRead + " characters");
                String text = new String(buffer, 0, charsRead);
                System.out.println(text);
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a character array. The buffer size
(1024) can be adjusted based on performance needs. The charsRead value indicates
how many characters were actually read. This may be less than the array length at
end of file. The text is converted to a String for display.

## Checking Stream Readiness

The ready method checks if the reader is ready to be read. This is useful for
non-blocking I/O scenarios. A reader is ready if its buffer is not empty or the
underlying stream has bytes available.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        byte[] data = "Hello, InputStreamReader!".getBytes();
        
        try (InputStreamReader isr = new InputStreamReader(
                new ByteArrayInputStream(data))) {
            
            System.out.println("Reader initially ready: " + isr.ready());
            
            // Read first character
            int firstChar = isr.read();
            System.out.println("First character: " + (char) firstChar);
            
            System.out.println("Reader still ready: " + isr.ready());
            
            // Read remaining characters
            while (isr.ready()) {
                System.out.print((char) isr.read());
            }
            
            System.out.println("\nReader at end: " + isr.ready());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using the ready method to check stream status. The
reader is initially ready as there's data to read. After each read, ready
indicates if more data is available. At end of stream, ready returns false. Note
that ready doesn't guarantee the next read won't block.

## Getting Encoding Information

The getEncoding method returns the name of the character encoding being used.
This is useful when the charset wasn't explicitly specified or to verify the
actual encoding in use.

Main.java
  

import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class Main {

    public static void main(String[] args) {
        try {
            // Default charset
            InputStreamReader defaultIsr = new InputStreamReader(
                new FileInputStream("data.txt"));
            System.out.println("Default encoding: " + defaultIsr.getEncoding());
            
            // UTF-8 charset
            InputStreamReader utf8Isr = new InputStreamReader(
                new FileInputStream("data.txt"), StandardCharsets.UTF_8);
            System.out.println("UTF-8 encoding: " + utf8Isr.getEncoding());
            
            // ISO-8859-1 charset
            InputStreamReader latin1Isr = new InputStreamReader(
                new FileInputStream("data.txt"), "ISO-8859-1");
            System.out.println("ISO-8859-1 encoding: " + latin1Isr.getEncoding());
            
            defaultIsr.close();
            utf8Isr.close();
            latin1Isr.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to retrieve encoding information from InputStreamReader.
The getEncoding method returns the canonical name of the charset. For default
charset, it returns the platform's default encoding name. The method returns
null if the stream has been closed.

## Combining with BufferedReader

InputStreamReader is often wrapped in a BufferedReader for efficient line-by-line
reading. This combination provides both character encoding conversion and
buffered reading capabilities.

Main.java
  

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                    new FileInputStream("lines.txt"), "UTF-8"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates the common pattern of combining InputStreamReader with
BufferedReader. The InputStreamReader handles character encoding conversion while
BufferedReader provides efficient line reading. The readLine method returns null
at end of stream. This approach is ideal for reading text files with proper
encoding handling.

## Source

[Java InputStreamReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/InputStreamReader.html)

In this article, we've covered the essential methods and features of the Java
InputStreamReader class. Understanding these concepts is crucial for working
with character streams and proper text encoding in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).