+++
title = "Java StringReader Class"
date = 2025-08-29T19:59:32.184+01:00
draft = false
description = "Complete Java StringReader class tutorial covering all methods with examples. Learn about string-based input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringReader Class

Last modified: April 16, 2025

 

The java.io.StringReader class is a character stream that reads
characters from a string. It implements the Readable and
Closeable interfaces. This class is useful when you need to treat
a string as a character input stream.

StringReader provides all the standard reader methods but sources
its data from an in-memory string. The class maintains an internal position
pointer to track reading progress. It's not thread-safe for concurrent access.

## StringReader Class Overview

StringReader extends Reader and provides character
stream functionality for strings. Key methods include read operations, mark/reset
functionality, and stream skipping. The class efficiently handles string data
without I/O overhead.

public class StringReader extends Reader {
    public StringReader(String s);
    public int read();
    public int read(char[] cbuf, int off, int len);
    public long skip(long ns);
    public boolean ready();
    public boolean markSupported();
    public void mark(int readAheadLimit);
    public void reset();
    public void close();
}

The code above shows key methods provided by StringReader. These
methods allow reading characters from a string with stream semantics. The class
fully supports mark and reset operations for string data.

## Creating a StringReader

StringReader is created by passing a string to its constructor. The string
becomes the source of characters for all read operations. The reader maintains
its own position independent of the original string.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "Hello, StringReader!";
        
        try (StringReader reader = new StringReader(data)) {
            System.out.println("StringReader created successfully");
            
            // Read first character
            int firstChar = reader.read();
            System.out.println("First character: " + (char) firstChar);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates creating a basic StringReader. The try-with-resources
statement ensures proper stream closure. The read method returns -1 at end of
stream. Each character is read sequentially from the source string.

## Reading Characters from StringReader

StringReader provides several methods for reading characters. The simplest reads
a single character. More efficient methods read multiple characters into arrays.
All read operations advance the internal position pointer.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        
        try (StringReader reader = new StringReader(text)) {
            int charValue;
            System.out.println("Reading characters one by one:");
            
            while ((charValue = reader.read()) != -1) {
                System.out.print((char) charValue);
            }
            
            System.out.println("\n\nReading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read all characters from a StringReader sequentially.
The while loop continues until read returns -1 (end of stream). Each character
is printed as it's read. The stream automatically closes at the end of the
try block.

## Reading Characters into an Array

For better performance, read multiple characters at once into a char array. This
reduces method call overhead. The read method returns the number of characters
actually read, which may be less than requested.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
        
        try (StringReader reader = new StringReader(data)) {
            char[] buffer = new char[10];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.println("Read " + charsRead + " chars: " + 
                    new String(buffer, 0, charsRead));
            }
            
            System.out.println("All characters read");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a character array. The buffer size
(10) determines how many characters to read at once. The charsRead value
indicates actual characters read. The String constructor converts the relevant
portion of the buffer to a string.

## Mark and Reset Functionality

StringReader supports mark and reset operations to re-read data. The mark method
marks the current position, and reset returns to it. The readAheadLimit
parameter specifies the maximum lookahead before mark becomes invalid.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        try (StringReader reader = new StringReader(text)) {
            // Read first 5 characters
            char[] part1 = new char[5];
            reader.read(part1);
            System.out.println("First part: " + new String(part1));
            
            // Mark current position
            reader.mark(10);
            
            // Read next 5 characters
            char[] part2 = new char[5];
            reader.read(part2);
            System.out.println("Second part: " + new String(part2));
            
            // Reset back to mark
            reader.reset();
            
            // Read again from marked position
            reader.read(part2);
            System.out.println("Second part after reset: " + new String(part2));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates mark and reset functionality. The mark is set after
reading the first 5 characters. After reading the next 5 characters, reset
returns to the marked position. The readAheadLimit of 10 means reading more
than 10 characters after marking would invalidate the mark.

## Skipping Characters in the Stream

The skip method allows skipping a specified number of characters in the stream.
This is more efficient than reading and discarding data. The actual number of
characters skipped may be less than requested if the end is reached.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "1234567890ABCDEFGHIJ";
        
        try (StringReader reader = new StringReader(data)) {
            System.out.println("Initial content: " + data);
            
            // Skip first 10 characters
            long skipped = reader.skip(10);
            System.out.println("Skipped " + skipped + " characters");
            
            // Read next character
            int nextChar = reader.read();
            System.out.println("Next character: " + (char) nextChar);
            
            // Try to skip beyond end
            skipped = reader.skip(20);
            System.out.println("Skipped " + skipped + " characters (end approached)");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to skip characters in a StringReader. The first skip
moves past the numeric characters. The second skip attempts to skip 20
characters but only skips the remaining alphabetic characters. The skip method
returns the actual number of characters skipped.

## Checking Readiness with ready()

The ready method checks if the reader is ready to be read. For StringReader,
this always returns true unless the stream is closed. It's useful for
consistency with other Reader implementations.

Main.java
  

import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String text = "Test string for ready() method";
        
        try (StringReader reader = new StringReader(text)) {
            System.out.println("Reader ready? " + reader.ready());
            
            // Read first character
            System.out.println("First char: " + (char) reader.read());
            
            System.out.println("Still ready? " + reader.ready());
            
            // Close and check
            reader.close();
            System.out.println("Ready after close? " + reader.ready());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates the ready method behavior. StringReader is always
ready until closed. After closing, ready returns false. This method is mainly
used for compatibility with other Reader types that might block on read.

## Source

[Java StringReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/StringReader.html)

In this article, we've covered the essential methods and features of the Java
StringReader class. Understanding these concepts is crucial for working with
string-based character streams in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).