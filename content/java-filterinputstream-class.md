+++
title = "Java FilterInputStream Class"
date = 2025-08-29T19:59:17.536+01:00
draft = false
description = "Complete Java FilterInputStream class tutorial covering all methods with examples. Learn about filtered input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FilterInputStream Class

Last modified: April 16, 2025

 

The java.io.FilterInputStream class is a base class for input stream
filters. It wraps another input stream and transforms data or provides additional
functionality. This class serves as the superclass for all filtered input streams.

FilterInputStream itself simply overrides all methods of
InputStream with versions that pass requests to the wrapped stream.
Subclasses should override some methods to provide filtering behavior. This class
is rarely used directly.

## FilterInputStream Class Overview

FilterInputStream extends InputStream and maintains a
reference to an underlying input stream. All operations are delegated to this
stream. Subclasses can modify the data or behavior during these operations.

public class FilterInputStream extends InputStream {
    protected volatile InputStream in;
    protected FilterInputStream(InputStream in);
    public int read();
    public int read(byte[] b);
    public int read(byte[] b, int off, int len);
    public long skip(long n);
    public int available();
    public void close();
    public synchronized void mark(int readlimit);
    public synchronized void reset();
    public boolean markSupported();
}

The code above shows the structure of FilterInputStream. The
protected in field holds the wrapped stream. All methods delegate
to this stream. Subclasses typically override some methods to add functionality.

## Creating a FilterInputStream

FilterInputStream is abstract and meant to be subclassed. You
typically create concrete subclasses like BufferedInputStream.
The constructor is protected to prevent direct instantiation.

Main.java
  

import java.io.FileInputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;

public class Main {

    static class UpperCaseFilter extends FilterInputStream {
        public UpperCaseFilter(InputStream in) {
            super(in);
        }
        
        @Override
        public int read() throws IOException {
            int c = super.read();
            return (c == -1) ? c : Character.toUpperCase(c);
        }
    }

    public static void main(String[] args) {
        try {
            InputStream fileStream = new FileInputStream("data.txt");
            FilterInputStream filterStream = new UpperCaseFilter(fileStream);
            
            int c;
            while ((c = filterStream.read()) != -1) {
                System.out.print((char) c);
            }
            
            filterStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a custom UpperCaseFilter that converts all
characters to uppercase. The filter extends FilterInputStream and
overrides the read method. The constructor passes the underlying
stream to the superclass.

## Reading Data with FilterInputStream

FilterInputStream delegates all read operations to the underlying stream.
Subclasses can intercept these calls to modify data. The basic read methods
include single-byte and array-based reading.

Main.java
  

import java.io.FilterInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    static class Rot13Filter extends FilterInputStream {
        public Rot13Filter(InputStream in) {
            super(in);
        }
        
        @Override
        public int read() throws IOException {
            int c = super.read();
            if (c == -1) return c;
            if (c &gt;= 'a' &amp;&amp; c &lt;= 'z') {
                return 'a' + ((c - 'a' + 13) % 26);
            }
            if (c &gt;= 'A' &amp;&amp; c &lt;= 'Z') {
                return 'A' + ((c - 'A' + 13) % 26);
            }
            return c;
        }
    }

    public static void main(String[] args) {
        String data = "Hello World!";
        ByteArrayInputStream bais = new ByteArrayInputStream(data.getBytes());
        
        try (FilterInputStream fis = new Rot13Filter(bais)) {
            int c;
            while ((c = fis.read()) != -1) {
                System.out.print((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example implements a ROT13 cipher filter. The read method
applies the ROT13 transformation to alphabetic characters. Non-alphabetic
characters pass through unchanged. The filter demonstrates data transformation.

## Reading Bytes into an Array

FilterInputStream provides bulk read operations that transfer multiple bytes at
once. These methods are more efficient than single-byte reads. Subclasses can
override them for specialized behavior.

Main.java
  

import java.io.FilterInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    static class ReverseFilter extends FilterInputStream {
        public ReverseFilter(InputStream in) {
            super(in);
        }
        
        @Override
        public int read(byte[] b, int off, int len) throws IOException {
            int result = super.read(b, off, len);
            if (result != -1) {
                for (int i = off; i &lt; off + result / 2; i++) {
                    byte temp = b[i];
                    b[i] = b[off + result - 1 - (i - off)];
                    b[off + result - 1 - (i - off)] = temp;
                }
            }
            return result;
        }
    }

    public static void main(String[] args) {
        String data = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        ByteArrayInputStream bais = new ByteArrayInputStream(data.getBytes());
        
        try (FilterInputStream fis = new ReverseFilter(bais)) {
            byte[] buffer = new byte[10];
            int bytesRead;
            
            while ((bytesRead = fis.read(buffer)) != -1) {
                System.out.println(new String(buffer, 0, bytesRead));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a filter that reverses byte arrays during reading. The
read(byte[], int, int) method is overridden to reverse the bytes
after reading them from the underlying stream. The filter processes data in
chunks.

## Mark and Reset Functionality

FilterInputStream delegates mark and reset operations to the underlying stream.
These methods allow returning to previously marked positions. Not all streams
support this functionality.

Main.java
  

import java.io.FilterInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    static class CountingFilter extends FilterInputStream {
        private int count = 0;
        
        public CountingFilter(InputStream in) {
            super(in);
        }
        
        @Override
        public int read() throws IOException {
            count++;
            return super.read();
        }
        
        @Override
        public int read(byte[] b, int off, int len) throws IOException {
            int result = super.read(b, off, len);
            if (result != -1) count += result;
            return result;
        }
        
        public int getCount() {
            return count;
        }
    }

    public static void main(String[] args) {
        String data = "Mark and reset demonstration";
        ByteArrayInputStream bais = new ByteArrayInputStream(data.getBytes());
        
        try (CountingFilter fis = new CountingFilter(bais)) {
            System.out.println("Mark supported: " + fis.markSupported());
            
            // Read first 5 bytes
            byte[] buffer = new byte[5];
            fis.read(buffer);
            System.out.println("First 5: " + new String(buffer));
            
            // Mark position
            fis.mark(10);
            System.out.println("Count after mark: " + fis.getCount());
            
            // Read next 5 bytes
            fis.read(buffer);
            System.out.println("Next 5: " + new String(buffer));
            
            // Reset to mark
            fis.reset();
            System.out.println("Count after reset: " + fis.getCount());
            
            // Read again from mark
            fis.read(buffer);
            System.out.println("After reset: " + new String(buffer));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates mark/reset functionality through a counting filter. The
filter tracks bytes read while preserving the underlying stream's mark/reset
capability. The count shows the effect of resetting the stream position.

## Skipping Bytes in the Stream

The skip method allows bypassing bytes in the stream without reading
them. FilterInputStream delegates this to the underlying stream. The actual
number of bytes skipped may be less than requested.

Main.java
  

import java.io.FilterInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    static class LoggingFilter extends FilterInputStream {
        public LoggingFilter(InputStream in) {
            super(in);
        }
        
        @Override
        public long skip(long n) throws IOException {
            System.out.println("Attempting to skip " + n + " bytes");
            long skipped = super.skip(n);
            System.out.println("Actually skipped " + skipped + " bytes");
            return skipped;
        }
    }

    public static void main(String[] args) {
        String data = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        ByteArrayInputStream bais = new ByteArrayInputStream(data.getBytes());
        
        try (LoggingFilter fis = new LoggingFilter(bais)) {
            // Skip first 10 bytes
            fis.skip(10);
            
            // Read next 5 bytes
            byte[] buffer = new byte[5];
            fis.read(buffer);
            System.out.println("After skip: " + new String(buffer));
            
            // Try to skip beyond end
            fis.skip(30);
            
            System.out.println("Available: " + fis.available());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a logging filter that tracks skip operations. The overridden
skip method logs both the requested and actual bytes skipped. The
example shows skipping within and beyond the stream's bounds.

## Available Bytes and Closing

The available method estimates bytes that can be read without
blocking. close releases resources. Both delegate to the underlying
stream. Custom filters can add behavior to these operations.

Main.java
  

import java.io.FilterInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {

    static class StatusFilter extends FilterInputStream {
        public StatusFilter(InputStream in) {
            super(in);
        }
        
        @Override
        public int available() throws IOException {
            int avail = super.available();
            System.out.println("Available bytes: " + avail);
            return avail;
        }
        
        @Override
        public void close() throws IOException {
            System.out.println("Closing filter stream");
            super.close();
        }
    }

    public static void main(String[] args) {
        String data = "Stream status monitoring example";
        ByteArrayInputStream bais = new ByteArrayInputStream(data.getBytes());
        
        try (StatusFilter fis = new StatusFilter(bais)) {
            System.out.println("Initial status:");
            fis.available();
            
            // Read some data
            byte[] buffer = new byte[10];
            fis.read(buffer);
            
            System.out.println("After reading 10 bytes:");
            fis.available();
            
            // Read remaining
            while (fis.available() &gt; 0) {
                fis.read(buffer);
            }
            
            System.out.println("After reading all:");
            fis.available();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates stream status monitoring through a custom filter. The
available method is overridden to log available bytes. The
close method logs stream closure. The try-with-resources statement
ensures proper cleanup.

## Source

[Java FilterInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FilterInputStream.html)

In this article, we've covered the essential methods and features of the Java
FilterInputStream class. Understanding these concepts is crucial for creating
custom input stream filters in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).