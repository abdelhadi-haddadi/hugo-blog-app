+++
title = "Java PushbackReader Class"
date = 2025-08-29T19:59:29.935+01:00
draft = false
description = "Complete Java PushbackReader class tutorial covering all methods with examples. Learn about pushback operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PushbackReader Class

Last modified: April 16, 2025

 

The java.io.PushbackReader class is a character stream reader that
allows characters to be pushed back into the stream. This provides lookahead
functionality when parsing input. It wraps another Reader and adds
pushback capability.

PushbackReader maintains an internal buffer for pushed-back
characters. When reading, pushed-back characters are returned first before
reading from the underlying stream. The default pushback buffer size is 1
character, but can be customized.

## PushbackReader Class Overview

PushbackReader extends FilterReader and provides
character-based pushback operations. Key methods include read operations and
unread (pushback) methods. The class is useful for parsing scenarios where
lookahead is needed.

public class PushbackReader extends FilterReader {
    public PushbackReader(Reader in);
    public PushbackReader(Reader in, int size);
    public int read();
    public int read(char[] cbuf, int off, int len);
    public void unread(int c);
    public void unread(char[] cbuf);
    public void unread(char[] cbuf, int off, int len);
    public boolean ready();
    public void close();
}

The code above shows key methods provided by PushbackReader. The
unread methods allow pushing characters back into the stream. The read methods
consume pushed-back characters first before reading from the underlying stream.

## Creating a PushbackReader

PushbackReader is created by wrapping it around another Reader. You
can specify a buffer size or use the default (1 character). The buffer size
determines how many characters can be pushed back.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.PushbackReader;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size (1 character)
            Reader fileReader = new FileReader("data.txt");
            PushbackReader pushbackReader1 = new PushbackReader(fileReader);
            
            // Create with custom buffer size (10 characters)
            Reader fileReader2 = new FileReader("data.txt");
            PushbackReader pushbackReader2 = 
                new PushbackReader(fileReader2, 10);
            
            System.out.println("Default pushback reader created");
            System.out.println("Custom pushback reader (size 10) created");
            
            pushbackReader1.close();
            pushbackReader2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PushbackReader. The first uses
default buffer size (1 character), while the second specifies 10 characters.
Always close readers when done to release resources. The underlying FileReader
is automatically closed when closing PushbackReader.

## Reading and Pushing Back Characters

The basic operation of PushbackReader involves reading characters and optionally
pushing them back. The unread method pushes characters back into the stream.
Subsequent reads will return these characters first.

Main.java
  

import java.io.IOException;
import java.io.PushbackReader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        String data = "ABCD";
        try (PushbackReader reader = 
                new PushbackReader(new StringReader(data))) {
            
            // Read first character
            int firstChar = reader.read();
            System.out.println("First character: " + (char) firstChar);
            
            // Push it back
            reader.unread(firstChar);
            System.out.println("Character pushed back");
            
            // Read again
            int sameChar = reader.read();
            System.out.println("Read again: " + (char) sameChar);
            
            // Read next character
            int nextChar = reader.read();
            System.out.println("Next character: " + (char) nextChar);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows basic pushback functionality. The first character is read,
then pushed back, and read again. The unread method allows putting characters
back into the stream. The pushback buffer operates as a LIFO (last-in-first-out)
structure.

## Pushing Back Multiple Characters

PushbackReader can push back multiple characters when created with a larger
buffer. The unread method accepts character arrays for bulk pushback operations.
Characters are pushed back in the order they appear in the array.

Main.java
  

import java.io.IOException;
import java.io.PushbackReader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        String data = "1234567890";
        try (PushbackReader reader = 
                new PushbackReader(new StringReader(data), 5)) {
            
            // Read first 5 characters
            char[] buffer = new char[5];
            reader.read(buffer);
            System.out.println("First read: " + new String(buffer));
            
            // Push them back
            reader.unread(buffer);
            System.out.println("5 characters pushed back");
            
            // Read again
            reader.read(buffer);
            System.out.println("Read again: " + new String(buffer));
            
            // Try to push back more than buffer size
            try {
                char[] bigBuffer = new char[6];
                reader.unread(bigBuffer); // Will throw IOException
            } catch (IOException e) {
                System.out.println("Cannot push back more than buffer size");
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates pushing back multiple characters. The reader is created
with a 5-character buffer. Attempting to push back more than the buffer size
throws an IOException. The unread operation with arrays is efficient for bulk
pushback scenarios.

## Using PushbackReader for Parsing

PushbackReader is particularly useful for parsing scenarios where you need to
look ahead in the stream. After examining characters, you can push them back if
they don't match what you're looking for. This enables flexible parsing logic.

Main.java
  

import java.io.IOException;
import java.io.PushbackReader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        String data = "123abc456";
        try (PushbackReader reader = 
                new PushbackReader(new StringReader(data), 3)) {
            
            StringBuilder numbers = new StringBuilder();
            int c;
            
            while ((c = reader.read()) != -1) {
                if (Character.isDigit((char) c)) {
                    numbers.append((char) c);
                } else {
                    // Push back non-digit and break
                    reader.unread(c);
                    break;
                }
            }
            
            System.out.println("Numbers found: " + numbers);
            
            // Read remaining characters
            char[] remaining = new char[6];
            reader.read(remaining);
            System.out.println("Remaining: " + new String(remaining));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how PushbackReader can be used for parsing. It reads digits
until a non-digit is found, then pushes it back. This allows the non-digit to
be processed separately. The pushback capability simplifies many parsing tasks.

## Handling Mark and Reset

Unlike some other readers, PushbackReader does not support mark and reset
operations. Attempting to use these methods will result in exceptions. The
pushback functionality serves a similar purpose for many use cases.

Main.java
  

import java.io.IOException;
import java.io.PushbackReader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        String data = "test data";
        try (PushbackReader reader = 
                new PushbackReader(new StringReader(data))) {
            
            // Check if mark is supported
            System.out.println("Mark supported: " + reader.markSupported());
            
            // Try to mark (will not throw exception but does nothing)
            reader.mark(10);
            
            // Read some data
            int c = reader.read();
            System.out.println("Read: " + (char) c);
            
            // Try to reset (will throw IOException)
            try {
                reader.reset();
            } catch (IOException e) {
                System.out.println("Reset not supported: " + e.getMessage());
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates that PushbackReader doesn't support mark/reset. The
markSupported method returns false. Attempting to reset throws an IOException.
For similar functionality, use the pushback capability instead of mark/reset.

## Reading Lines with Pushback

PushbackReader can be used to implement custom line reading logic. This example
shows how to read lines while handling line endings consistently. Pushback helps
examine line ending characters.

Main.java
  

import java.io.IOException;
import java.io.PushbackReader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        String data = "Line 1\r\nLine 2\nLine 3\rLine 4";
        try (PushbackReader reader = 
                new PushbackReader(new StringReader(data), 2)) {
            
            StringBuilder line = new StringBuilder();
            int c;
            
            while ((c = reader.read()) != -1) {
                if (c == '\n') {
                    System.out.println("Line found: " + line);
                    line.setLength(0);
                } else if (c == '\r') {
                    // Check for \r\n sequence
                    int next = reader.read();
                    if (next != '\n') {
                        reader.unread(next);
                    }
                    System.out.println("Line found: " + line);
                    line.setLength(0);
                } else {
                    line.append((char) c);
                }
            }
            
            // Print last line if not empty
            if (line.length() &gt; 0) {
                System.out.println("Last line: " + line);
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example implements custom line reading that handles different line endings
(\n, \r, \r\n). The pushback capability allows examining the character after
\r to determine if it's part of \r\n sequence. This demonstrates practical use
of PushbackReader for text processing.

## Source

[Java PushbackReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PushbackReader.html)

In this article, we've covered the essential methods and features of the Java
PushbackReader class. Understanding these concepts is crucial for working with
character streams that require lookahead capability in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).