+++
title = "Java Reader Class"
date = 2025-08-29T19:59:31.066+01:00
draft = false
description = "Complete Java Reader class tutorial covering all methods with examples. Learn about character input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Reader Class

Last modified: April 16, 2025

 

The java.io.Reader class is an abstract class for reading character
streams. It serves as the base class for all character input stream classes in
Java. Unlike byte streams, Reader handles 16-bit Unicode characters.

Reader provides fundamental methods for reading characters from
various sources. Subclasses implement these methods for specific input types
like files, strings, or pipes. The class handles character encoding conversion
internally.

## Reader Class Overview

Reader is an abstract class that defines the basic character input
operations. Key methods include reading characters, skipping characters, and
mark/reset functionality. All methods throw IOException for I/O errors.

public abstract class Reader implements Readable, Closeable {
    public int read();
    public int read(char[] cbuf);
    public abstract int read(char[] cbuf, int off, int len);
    public long skip(long n);
    public boolean ready();
    public boolean markSupported();
    public void mark(int readAheadLimit);
    public void reset();
    public abstract void close();
}

The code above shows key methods provided by Reader. These methods
allow for reading character data from various sources. Concrete subclasses must
implement the abstract methods for specific input types.

## Creating a Reader

Reader is abstract, so we use its subclasses like FileReader or StringReader.
These provide concrete implementations for different character sources. Always
close Readers when done to release resources.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

public class Main {

    public static void main(String[] args) {
        try {
            // Create FileReader
            Reader fileReader = new FileReader("text.txt");
            
            // Create StringReader
            Reader stringReader = new StringReader("Hello Reader");
            
            System.out.println("FileReader and StringReader created");
            
            fileReader.close();
            stringReader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates creating two common Reader implementations.
FileReader reads from files while StringReader reads from strings. Both are
subclasses of Reader. The close method releases any system resources.

## Reading Characters with Reader

The simplest way to read characters is using the read() method. It returns a
single character as an int or -1 at end of stream. This is useful for processing
text character by character.

Main.java
  

import java.io.IOException;
import java.io.StringReader;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try (Reader reader = new StringReader("Java Reader")) {
            
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

This example shows how to read characters one by one from a StringReader. The
try-with-resources statement ensures proper stream closure. Each character is
cast from int to char for display. The loop continues until read returns -1.

## Reading Characters into an Array

For better performance, read multiple characters at once into a char array. This
reduces method calls and improves efficiency. The read method returns the number
of characters actually read.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try (Reader reader = new FileReader("text.txt")) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                System.out.println("Read " + charsRead + " characters");
                System.out.println(new String(buffer, 0, charsRead));
            }
            
            System.out.println("File reading complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates bulk reading into a char array. The buffer size (1024)
can be adjusted based on needs. The charsRead value indicates how many
characters were actually read. The String constructor converts the relevant
portion of the buffer to a string.

## Mark and Reset Functionality

Some Reader implementations support mark and reset operations to re-read data.
The mark method marks the current position, and reset returns to it. The
readAheadLimit specifies how many characters can be read before mark becomes
invalid.

Main.java
  

import java.io.IOException;
import java.io.StringReader;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try (Reader reader = new StringReader("Java Reader Mark Example")) {
            
            // Read first 5 characters
            char[] firstPart = new char[5];
            reader.read(firstPart);
            System.out.println("First part: " + new String(firstPart));
            
            // Mark current position
            reader.mark(10); // Allow 10 chars to be read before mark invalid
            
            // Read next 5 characters
            char[] secondPart = new char[5];
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

This example demonstrates mark and reset functionality with StringReader. The
mark is set after reading the first 5 characters. After reading the next 5
characters, reset returns to the marked position. Not all Readers support
mark/reset - check with markSupported().

## Skipping Characters in the Stream

The skip method allows skipping a specified number of characters in the stream.
This is more efficient than reading and discarding data. The actual number of
characters skipped may be less than requested.

Main.java
  

import java.io.IOException;
import java.io.StringReader;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try (Reader reader = new StringReader("ABCDEFGHIJKLMNOPQRSTUVWXYZ")) {
            
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

This example shows how to skip characters in a Reader. The first skip moves past
the first 10 letters. The second skip attempts to skip 20 characters but only
skips the remaining characters. The method returns the actual number skipped.

## Checking Readiness with ready()

The ready method checks if the Reader is ready to be read. It returns true if
the next read won't block for input. This is useful for non-blocking I/O checks.

Main.java
  

import java.io.IOException;
import java.io.StringReader;
import java.io.Reader;

public class Main {

    public static void main(String[] args) {
        try (Reader reader = new StringReader("Ready Check")) {
            
            System.out.println("Reader ready: " + reader.ready());
            
            // Read all characters
            while (reader.ready()) {
                System.out.print((char) reader.read());
            }
            
            System.out.println("\nReader after reading: " + reader.ready());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates using ready() to check Reader status. The method
returns true when characters are available. After reading all characters, ready()
returns false. Note that a false return doesn't necessarily mean end of stream.

## Source

[Java Reader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/Reader.html)

In this article, we've covered the essential methods and features of the Java
Reader class. Understanding these concepts is crucial for working with character
input operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).