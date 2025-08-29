+++
title = "Java LineNumberReader Class"
date = 2025-08-29T19:59:22.079+01:00
draft = false
description = "Complete Java LineNumberReader class tutorial covering all methods with examples. Learn about line-numbered reading operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java LineNumberReader Class

Last modified: April 16, 2025

 

The java.io.LineNumberReader class is a buffered character-input
stream that keeps track of line numbers. It extends BufferedReader
and adds line counting functionality. Line numbers start at 0 by default.

LineNumberReader is useful when processing text files where line
numbers are important. It provides methods to get and set the current line
number. The class handles different line termination conventions automatically.

## LineNumberReader Class Overview

LineNumberReader extends BufferedReader and adds line
number tracking. Key methods include line number access, read operations, and
mark/reset functionality. The class recognizes '\n', '\r', or "\r\n" as line
terminators.

public class LineNumberReader extends BufferedReader {
    public LineNumberReader(Reader in);
    public LineNumberReader(Reader in, int sz);
    public int getLineNumber();
    public void setLineNumber(int lineNumber);
    public String readLine();
    public int read();
    public int read(char[] cbuf, int off, int len);
    public long skip(long n);
    public void mark(int readAheadLimit);
    public void reset();
    public boolean markSupported();
    public void close();
}

The code above shows key methods provided by LineNumberReader.
These methods allow for reading text while tracking line numbers. The class
inherits buffering capabilities from BufferedReader.

## Creating a LineNumberReader

LineNumberReader is created by wrapping it around another Reader.
You can specify a buffer size or use the default. The line number starts at 0
but can be set to any value initially.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with default buffer size
            LineNumberReader reader1 = 
                new LineNumberReader(new FileReader("data.txt"));
            
            // Create with custom buffer size (8KB)
            LineNumberReader reader2 = 
                new LineNumberReader(new FileReader("data.txt"), 8192);
            
            // Set initial line number
            reader2.setLineNumber(10);
            
            System.out.println("Reader1 line: " + reader1.getLineNumber());
            System.out.println("Reader2 line: " + reader2.getLineNumber());
            
            reader1.close();
            reader2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create LineNumberReader. The first
uses default buffer size, while the second specifies 8KB. The line number is
set to 10 for the second reader. Always close readers when done.

## Reading Lines with Line Numbers

The primary feature of LineNumberReader is reading lines while tracking line
numbers. The readLine method returns each line and automatically
increments the line counter. Line numbers start at 0 unless set otherwise.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        try (LineNumberReader reader = 
                new LineNumberReader(new FileReader("data.txt"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.printf("Line %d: %s%n", 
                    reader.getLineNumber(), line);
            }
            
            System.out.println("Total lines: " + reader.getLineNumber());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to read a file line by line with line numbers. The
readLine method returns null at end of file. Note that
getLineNumber returns the number of the next line to be read.
The try-with-resources ensures proper reader closure.

## Reading Characters with Line Tracking

LineNumberReader can also read individual characters while maintaining line
number tracking. Each newline character increments the line counter. This
provides flexibility when processing character-by-character.

Main.java
  

import java.io.FileReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        try (LineNumberReader reader = 
                new LineNumberReader(new FileReader("data.txt"))) {
            
            int charValue;
            while ((charValue = reader.read()) != -1) {
                char c = (char) charValue;
                if (c == '\n' || c == '\r') {
                    System.out.printf("(Line %d end)%n", reader.getLineNumber());
                } else {
                    System.out.print(c);
                }
            }
            
            System.out.println("Final line number: " + reader.getLineNumber());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates character-by-character reading with line number
tracking. The code detects line endings and prints the current line number.
The read method returns -1 at end of stream. All line ending
conventions are handled automatically.

## Mark and Reset with Line Numbers

LineNumberReader supports mark and reset operations while maintaining line
number state. The mark method remembers the current position and line number.
Reset returns to the marked position and restores the line number.

Main.java
  

import java.io.StringReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        String text = "First line\nSecond line\nThird line";
        
        try (LineNumberReader reader = 
                new LineNumberReader(new StringReader(text))) {
            
            // Read first line
            System.out.println("Line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
            // Mark current position
            reader.mark(100);
            
            // Read second line
            System.out.println("Line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
            // Reset to marked position
            reader.reset();
            
            // Read again from mark
            System.out.println("After reset, line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows mark/reset functionality with line numbers. The mark is set
after reading the first line. After reading the second line, reset returns to
the marked position. The line number is properly restored during reset.

## Skipping Lines and Characters

LineNumberReader provides skip method to skip characters while
maintaining line count. Skipping past newline characters increments the line
counter. The actual number of characters skipped may be less than requested.

Main.java
  

import java.io.StringReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        String text = "Line 1\nLine 2\nLine 3\nLine 4";
        
        try (LineNumberReader reader = 
                new LineNumberReader(new StringReader(text))) {
            
            System.out.println("Initial line: " + reader.getLineNumber());
            
            // Skip first 8 characters (past first line)
            long skipped = reader.skip(8);
            System.out.println("Skipped " + skipped + " characters");
            System.out.println("Current line: " + reader.getLineNumber());
            
            // Read next line
            System.out.println("Next line: " + reader.readLine());
            
            // Skip beyond end of input
            skipped = reader.skip(20);
            System.out.println("Skipped " + skipped + " characters at end");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates skipping characters while tracking line numbers.
Skipping past the first line's newline increments the line counter. The second
skip attempts to skip beyond the end of input. The actual skipped count may be
less than requested.

## Setting Custom Line Numbers

LineNumberReader allows setting the current line number to any value. This is
useful when processing partial files or combining multiple inputs. The line
number can be set at any time during reading.

Main.java
  

import java.io.StringReader;
import java.io.IOException;
import java.io.LineNumberReader;

public class Main {

    public static void main(String[] args) {
        String text = "Alpha\nBeta\nGamma\nDelta";
        
        try (LineNumberReader reader = 
                new LineNumberReader(new StringReader(text))) {
            
            // Set custom starting line number
            reader.setLineNumber(100);
            
            // Read first line
            System.out.println("Line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
            // Increment line number manually
            reader.setLineNumber(reader.getLineNumber() + 5);
            
            // Read next line
            System.out.println("Line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
            // Reset to specific line number
            reader.setLineNumber(200);
            System.out.println("Line " + reader.getLineNumber() + 
                ": " + reader.readLine());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to manually control line numbering. The initial line
number is set to 100. The code demonstrates manual incrementing and setting
specific line numbers. This flexibility helps when processing partial files
or combining multiple inputs.

## Source

[Java LineNumberReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/LineNumberReader.html)

In this article, we've covered the essential methods and features of the Java
LineNumberReader class. Understanding these concepts is crucial for working
with line-numbered text processing in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).