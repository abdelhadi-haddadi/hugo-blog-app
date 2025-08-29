+++
title = "Java PushbackInputStream Class"
date = 2025-08-29T19:59:29.954+01:00
draft = false
description = "Complete Java PushbackInputStream class tutorial covering all methods with examples. Learn about pushback input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PushbackInputStream Class

Last modified: April 16, 2025

 

The java.io.PushbackInputStream class adds pushback functionality to
another input stream. It allows read bytes to be pushed back into the stream.
This is useful for parsing scenarios where you need to "peek" ahead in the stream.

PushbackInputStream wraps around another InputStream
and provides a buffer for pushed-back bytes. The default pushback buffer size is
1 byte, but a custom size can be specified. This class is not thread-safe for
concurrent access.

## PushbackInputStream Class Overview

PushbackInputStream extends FilterInputStream and
provides pushback operations. Key methods include read operations and unread
methods for pushing bytes back. The pushback buffer holds bytes that will be
read next.

public class PushbackInputStream extends FilterInputStream {
    public PushbackInputStream(InputStream in);
    public PushbackInputStream(InputStream in, int size);
    public int read();
    public int read(byte[] b, int off, int len);
    public void unread(int b);
    public void unread(byte[] b);
    public void unread(byte[] b, int off, int len);
    public int available();
    public long skip(long n);
    public boolean markSupported();
    public void close();
}

The code above shows key methods provided by PushbackInputStream.
These methods allow reading data and pushing bytes back into the stream. The
class does not support mark/reset operations.

## Creating a PushbackInputStream

PushbackInputStream is created by wrapping it around another InputStream.
You can specify a pushback buffer size or use the default 1-byte buffer. The
buffer size determines how many bytes can be pushed back.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = { 'A', 'B', 'C', 'D', 'E' };
        
        try {
            // Create with default buffer size (1 byte)
            ByteArrayInputStream bais1 = new ByteArrayInputStream(data);
            PushbackInputStream pbis1 = new PushbackInputStream(bais1);
            
            // Create with custom buffer size (5 bytes)
            ByteArrayInputStream bais2 = new ByteArrayInputStream(data);
            PushbackInputStream pbis2 = new PushbackInputStream(bais2, 5);
            
            System.out.println("Default buffer stream created");
            System.out.println("Custom buffer (5 bytes) stream created");
            
            pbis1.close();
            pbis2.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different ways to create PushbackInputStream. The first
uses default buffer size (1 byte), while the second specifies 5 bytes. Always
close streams when done to release resources. The underlying stream is
automatically closed when closing PushbackInputStream.

## Reading and Pushing Back a Single Byte

The simplest use case reads a byte and pushes it back if needed. The unread
method places the byte back into the stream's buffer. This allows re-reading the
same byte later.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = { 'A', 'B', 'C', 'D', 'E' };
        
        try (PushbackInputStream pbis = 
                new PushbackInputStream(new ByteArrayInputStream(data))) {
            
            // Read first byte
            int firstByte = pbis.read();
            System.out.println("First byte: " + (char) firstByte);
            
            // Push it back
            pbis.unread(firstByte);
            System.out.println("Byte pushed back");
            
            // Read again (same byte)
            int sameByte = pbis.read();
            System.out.println("Read again: " + (char) sameByte);
            
            // Continue reading
            int nextByte;
            while ((nextByte = pbis.read()) != -1) {
                System.out.println("Next byte: " + (char) nextByte);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows reading a byte and pushing it back into the stream. The next
read operation returns the pushed-back byte. The default 1-byte buffer is
sufficient for this case. Pushing back more than the buffer size throws an
IOException.

## Pushing Back Multiple Bytes

With a larger buffer, multiple bytes can be pushed back. The unread method
accepts a byte array. Bytes are pushed back in reverse order (last byte first).

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = { '1', '2', '3', '4', '5' };
        
        try (PushbackInputStream pbis = 
                new PushbackInputStream(new ByteArrayInputStream(data), 3)) {
            
            // Read first three bytes
            byte[] buffer = new byte[3];
            pbis.read(buffer);
            System.out.println("Read: " + new String(buffer));
            
            // Push them back
            pbis.unread(buffer);
            System.out.println("Pushed back 3 bytes");
            
            // Read again (same bytes)
            pbis.read(buffer);
            System.out.println("Read again: " + new String(buffer));
            
            // Read remaining bytes
            int remaining;
            while ((remaining = pbis.read()) != -1) {
                System.out.println("Remaining: " + (char) remaining);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates pushing back multiple bytes. The stream is created with
a 3-byte buffer. After reading 3 bytes, they are pushed back and read again.
Note that pushing back more bytes than the buffer size would throw an exception.

## Parsing with PushbackInputStream

PushbackInputStream is often used in parsing scenarios. You can read ahead to
check data, then push back bytes if they don't match expected patterns. This
enables flexible parsing without consuming the bytes.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        String data = "123ABC456DEF";
        byte[] bytes = data.getBytes();
        
        try (PushbackInputStream pbis = 
                new PushbackInputStream(new ByteArrayInputStream(bytes), 10)) {
            
            int b;
            while ((b = pbis.read()) != -1) {
                if (Character.isDigit((char) b)) {
                    System.out.println("Number: " + (char) b);
                } else {
                    // Push back the non-digit
                    pbis.unread(b);
                    
                    // Read the alphabetic sequence
                    StringBuilder letters = new StringBuilder();
                    while ((b = pbis.read()) != -1 &amp;&amp; 
                           Character.isLetter((char) b)) {
                        letters.append((char) b);
                    }
                    
                    // Push back the non-letter if not EOF
                    if (b != -1) pbis.unread(b);
                    
                    System.out.println("Letters: " + letters);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates parsing mixed numeric and alphabetic data. When a
non-digit is found, it's pushed back and the alphabetic sequence is read. The
parser switches between number and letter processing based on peeked bytes.

## Handling Pushback Buffer Overflow

Attempting to push back more bytes than the buffer size throws an IOException.
Proper error handling is needed when working with pushback operations. Always
check buffer capacity before unreading.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = { 'X', 'Y', 'Z' };
        
        try (PushbackInputStream pbis = 
                new PushbackInputStream(new ByteArrayInputStream(data), 2)) {
            
            // Read two bytes
            byte[] buffer = new byte[2];
            pbis.read(buffer);
            System.out.println("Read: " + new String(buffer));
            
            // Push them back (okay)
            pbis.unread(buffer);
            System.out.println("Pushed back 2 bytes");
            
            try {
                // Try to push back one more byte (will overflow)
                pbis.unread('W');
                System.out.println("This won't be printed");
            } catch (IOException e) {
                System.out.println("Caught IOException: " + e.getMessage());
            }
            
            // Continue reading
            int remaining;
            while ((remaining = pbis.read()) != -1) {
                System.out.println("Remaining: " + (char) remaining);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates buffer overflow handling. The 2-byte buffer allows
pushing back two bytes. Attempting to push a third byte throws an IOException.
Proper error handling ensures the program continues gracefully.

## Combining Pushback with Other Streams

PushbackInputStream can be combined with other stream types for complex I/O
operations. It's often used with buffered streams for better performance. The
pushback functionality works the same regardless of the underlying stream.

Main.java
  

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PushbackInputStream;

public class Main {

    public static void main(String[] args) {
        byte[] data = new byte[100];
        for (int i = 0; i &lt; data.length; i++) {
            data[i] = (byte) (i % 26 + 'A');
        }
        
        try (PushbackInputStream pbis = new PushbackInputStream(
                new BufferedInputStream(
                    new ByteArrayInputStream(data)), 10)) {
            
            // Read first 10 bytes
            byte[] buffer = new byte[10];
            pbis.read(buffer);
            System.out.println("First 10: " + new String(buffer));
            
            // Push them back
            pbis.unread(buffer);
            
            // Read again with different chunk size
            byte[] smallBuffer = new byte[3];
            pbis.read(smallBuffer);
            System.out.println("First 3 after pushback: " + 
                new String(smallBuffer));
            
            // Read remaining
            int bytesRead;
            while ((bytesRead = pbis.read(buffer)) != -1) {
                System.out.println("Read " + bytesRead + " bytes: " + 
                    new String(buffer, 0, bytesRead));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows PushbackInputStream wrapping a BufferedInputStream. The
combination provides both buffering and pushback capabilities. The pushback
operations work the same way regardless of the underlying buffered stream.

## Source

[Java PushbackInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/PushbackInputStream.html)

In this article, we've covered the essential methods and features of the Java
PushbackInputStream class. Understanding these concepts is crucial for working
with parsing and lookahead operations in Java I/O.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).