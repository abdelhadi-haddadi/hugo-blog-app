+++
title = "Java FilterOutputStream Class"
date = 2025-08-29T19:59:17.512+01:00
draft = false
description = "Complete Java FilterOutputStream class tutorial covering all methods with examples. Learn about filtered output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FilterOutputStream Class

Last modified: April 16, 2025

 

The java.io.FilterOutputStream class is a base class for output
stream filters. It wraps another output stream and transforms data written to it.
This class serves as the superclass for all filtered output streams.

FilterOutputStream extends OutputStream and provides
a way to modify output data before it reaches the destination. Common subclasses
include BufferedOutputStream, DataOutputStream, and
PrintStream. The class itself doesn't perform any transformation.

## FilterOutputStream Class Overview

FilterOutputStream delegates all requests to the wrapped output
stream. It provides a foundation for building output stream filters. The class
includes methods for writing bytes and flushing/closing the stream.

public class FilterOutputStream extends OutputStream {
    protected OutputStream out;
    public FilterOutputStream(OutputStream out);
    public void write(int b);
    public void write(byte[] b);
    public void write(byte[] b, int off, int len);
    public void flush();
    public void close();
}

The code above shows the structure of FilterOutputStream. The
protected out field holds the wrapped stream. All write operations
are forwarded to this stream. Subclasses override methods to add functionality.

## Creating a FilterOutputStream

To create a FilterOutputStream, you must provide an existing
OutputStream to wrap. The constructor stores this stream in the
protected out field. All operations will be delegated to it.

Main.java
  

import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            OutputStream fileStream = new FileOutputStream("output.txt");
            FilterOutputStream filterStream = new FilterOutputStream(fileStream);
            
            System.out.println("FilterOutputStream created successfully");
            
            filterStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates basic FilterOutputStream creation. The
stream wraps a FileOutputStream. Note that the class itself doesn't
modify data. Always close streams to release system resources properly.

## Writing Data with FilterOutputStream

FilterOutputStream provides three write methods. These mirror the
methods in OutputStream. All calls are forwarded to the wrapped
stream. Subclasses can override these methods to add functionality.

Main.java
  

import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (FilterOutputStream fos = 
                new FilterOutputStream(new FileOutputStream("data.bin"))) {
            
            // Write single byte
            fos.write(65); // ASCII 'A'
            
            // Write byte array
            byte[] data = {66, 67, 68}; // B, C, D
            fos.write(data);
            
            // Write portion of array
            byte[] moreData = {69, 70, 71, 72}; // E, F, G, H
            fos.write(moreData, 1, 2); // Writes F, G
            
            System.out.println("Data written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows different ways to write data using FilterOutputStream.
The try-with-resources ensures proper stream closure. The output file will contain
the bytes "ABCDFG". Each write operation is passed directly to the underlying
stream.

## Creating a Custom FilterOutputStream

The real power of FilterOutputStream comes from subclassing it to
create custom filters. You can override write methods to transform data before
it reaches the underlying stream. This enables various processing pipelines.

Main.java
  

import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;

class UppercaseFilter extends FilterOutputStream {
    
    public UppercaseFilter(OutputStream out) {
        super(out);
    }
    
    @Override
    public void write(int b) throws IOException {
        // Convert lowercase letters to uppercase
        if (b &gt;= 'a' &amp;&amp; b &lt;= 'z') {
            b = b - ('a' - 'A');
        }
        super.write(b);
    }
}

public class Main {
    public static void main(String[] args) {
        try (UppercaseFilter uf = 
                new UppercaseFilter(new FileOutputStream("output.txt"))) {
            
            String text = "Hello FilterOutputStream!";
            byte[] bytes = text.getBytes();
            
            uf.write(bytes);
            System.out.println("Data written with uppercase filter");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a custom UppercaseFilter that converts lowercase
letters to uppercase. The filter overrides the write(int) method to
perform the transformation. The output file will contain "HELLO FILTEROUTPUTSTREAM!".

## Flushing and Closing the Stream

FilterOutputStream provides flush and close
methods. These ensure data is written and resources are released. The methods
forward to the underlying stream. Always close streams when finished.

Main.java
  

import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        FilterOutputStream fos = null;
        try {
            fos = new FilterOutputStream(new FileOutputStream("flush.txt"));
            
            // Write some data
            fos.write("Testing flush".getBytes());
            
            // Force data to be written
            fos.flush();
            System.out.println("Data flushed to file");
            
            // Write more data
            fos.write("\nMore data".getBytes());
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();
                    System.out.println("Stream closed");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

This example demonstrates manual flushing and closing of a FilterOutputStream.
The flush ensures data is written immediately. The finally
block guarantees the stream is closed even if an exception occurs. This prevents
resource leaks.

## Combining with Other Streams

FilterOutputStream can be combined with other stream classes to
create processing pipelines. This is a powerful feature of Java I/O. Each filter
adds its own transformation to the data.

Main.java
  

import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;

class HexFilter extends FilterOutputStream {
    
    public HexFilter(OutputStream out) {
        super(out);
    }
    
    @Override
    public void write(int b) throws IOException {
        String hex = Integer.toHexString(b);
        super.write(hex.getBytes());
        super.write(' '); // Add space separator
    }
}

public class Main {
    public static void main(String[] args) {
        try (HexFilter hf = new HexFilter(
                new BufferedOutputStream(
                new DataOutputStream(
                new FileOutputStream("hexdata.txt"))))) {
            
            byte[] data = {10, 20, 30, 40, 50};
            hf.write(data);
            
            System.out.println("Data written in hex format");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a pipeline with three layers: FileOutputStream,
DataOutputStream, BufferedOutputStream, and our custom
HexFilter. The hex filter converts bytes to their hexadecimal
representation. The buffered stream improves performance by reducing I/O operations.

## Source

[Java FilterOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FilterOutputStream.html)

In this article, we've explored the FilterOutputStream class and its
usage in Java I/O operations. We've seen how to create custom filters and combine
them with other stream classes for powerful data processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).