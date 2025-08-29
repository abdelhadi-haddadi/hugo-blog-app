+++
title = "Java BufferedReader Class"
date = 2025-08-29T19:59:08.502+01:00
draft = false
description = "Complete Java BufferedReader class tutorial covering all methods with examples. Learn about buffered reading operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java BufferedReader Class

Last modified: April 16, 2025

 

The java.io.BufferedReader class reads text from a character-input
stream with buffering for efficiency. It provides methods for reading lines of
text and supports mark/reset operations. BufferedReader is typically wrapped
around other Readers.

BufferedReader improves performance by reducing the number of I/O
operations. It reads characters in chunks into a buffer. The default buffer size
is 8192 characters, but a custom size can be specified. This class is thread-safe
for concurrent access.

## BufferedReader Class Overview

BufferedReader extends Reader and provides buffered
character reading. Key methods include line reading, character reading, and
mark/reset functionality. The buffer fills when read operations are performed.

public class BufferedReader extends Reader {
    public BufferedReader(Reader in);
    public BufferedReader(Reader in, int sz);
    public int read();
    public int read(char[] cbuf, int off, int len);
    public String readLine();
    public long skip(long n);
    public boolean ready();
    public void mark(int readAheadLimit);
    public void reset();
    public boolean markSupported();
    public void close();
}

The code above shows key methods provided by BufferedReader. These
methods allow for efficient reading of text data with buffering. The class
supports mark and reset operations if the underlying Reader supports them.

## Creating a BufferedReader

BufferedReader is created by wrapping it around another Reader. You
can specify a buffer size or use the default. Common sources include FileReader
for files and InputStreamReader for system input or network streams.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size
            BufferedReader reader1 = new BufferedReader(new FileReader("data.txt"));
            
            // Create with custom buffer size (16KB)
            BufferedReader reader2 = new BufferedReader(
                new FileReader("data.txt"), 16384);
            
            System.out.println("Default buffer reader created");
            System.out.println("Custom buffer (16KB) reader created");
            
            reader1.close();
            reader2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create BufferedReader. The first uses
default buffer size, while the second specifies 16KB. Always close readers when
done to release resources. The underlying FileReader is automatically closed when
closing BufferedReader.

## Reading Lines with BufferedReader

The readLine method is one of BufferedReader's most useful
features. It reads a line of text, returning null at end of stream. Line endings
can be \n, \r, or \r\n. The method is efficient for processing text files.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedReader reader = 
                new BufferedReader(new FileReader("data.txt"))) {
            
            String line;
            int lineNumber = 1;
            
            while ((line = reader.readLine()) != null) {
                System.out.println("Line " + lineNumber + ": " + line);
                lineNumber++;
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read a text file line by line using BufferedReader. The
try-with-resources statement ensures proper reader closure. Each call to
readLine returns the next line without line termination
characters. This is efficient for processing large text files.

## Reading Characters with BufferedReader

BufferedReader provides methods for reading individual characters or character
arrays. The read method returns -1 at end of stream. Character
array reading is more efficient for bulk operations.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedReader reader = 
                new BufferedReader(new FileReader("data.txt"))) {
            
            // Read single character
            int charData;
            while ((charData = reader.read()) != -1) {
                System.out.print((char) charData);
            }
            
            System.out.println("\n\nReading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading a file character by character using
BufferedReader. The read method returns an int to
accommodate -1 for EOF. Each call may fetch data from the buffer rather than the
underlying Reader. For better performance, use character array reading.

## Reading Characters into an Array

For better performance, read multiple characters at once into a character array.
This reduces method calls and I/O operations. The read method returns the number
of characters actually read.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (BufferedReader reader = 
                new BufferedReader(new FileReader("largefile.txt"))) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.println("Read " + charsRead + " characters");
                // Process the buffer data here
                String content = new String(buffer, 0, charsRead);
                System.out.print(content);
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows bulk reading into a character array. The buffer size (1024)
can be adjusted based on performance needs. The charsRead value indicates how
many characters were actually read. This may be less than the array length at
end of file. The content is converted to a String for processing.

## Mark and Reset Functionality

BufferedReader supports mark and reset operations to re-read data. The mark
method marks the current position, and reset returns to it. The readAheadLimit
parameter specifies how many characters can be read before mark becomes invalid.

Main.java
  

import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "BufferedReader mark/reset example";
        
        try (BufferedReader reader = new BufferedReader(new StringReader(data))) {
            
            // Read first 10 characters
            char[] firstPart = new char[10];
            reader.read(firstPart);
            System.out.println("First part: " + new String(firstPart));
            
            // Mark current position
            reader.mark(20); // Allow 20 chars to be read before mark invalid
            
            // Read next 10 characters
            char[] secondPart = new char[10];
            reader.read(secondPart);
            System.out.println("Second part: " + new String(secondPart));
            
            // Reset back to mark
            reader.reset();
            
            // Read again from marked position
            reader.read(secondPart);
            System.out.println("Second part after reset: " + new String(secondPart));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates mark and reset functionality. The mark is set after
reading the first 10 characters. After reading the next 10 characters, reset
returns to the marked position. The readAheadLimit of 20 means reading more than
20 characters after marking would invalidate the mark.

## Skipping Characters in the Stream

The skip method allows skipping a specified number of characters in the stream.
This is more efficient than reading and discarding data. The actual number of
characters skipped may be less than requested.

Main.java
  

import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        try (BufferedReader reader = new BufferedReader(new StringReader(data))) {
            
            System.out.println("Starting position");
            
            // Skip first 10 characters
            long skipped = reader.skip(10);
            System.out.println("Skipped " + skipped + " characters");
            
            // Read next character
            int nextChar = reader.read();
            System.out.println("Next character: " + (char) nextChar);
            
            // Skip beyond end of stream
            skipped = reader.skip(20);
            System.out.println("Skipped " + skipped + " characters (end approached)");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to skip characters in a reader. The first skip moves past
the first 10 letters. The second skip attempts to skip 20 characters but only
skips the remaining characters. The skip method is useful for ignoring portions
of input data.

## Source

[Java BufferedReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedReader.html)

In this article, we've covered the essential methods and features of the Java
BufferedReader class. Understanding these concepts is crucial for working with
efficient text I/O operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).