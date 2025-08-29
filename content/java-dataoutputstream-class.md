+++
title = "Java DataOutputStream Class"
date = 2025-08-29T19:59:13.020+01:00
draft = false
description = "Complete Java DataOutputStream class tutorial covering all methods with examples. Learn about data output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DataOutputStream Class

Last modified: April 16, 2025

 

The java.io.DataOutputStream class enables writing Java primitive
data types to an output stream in a portable way. It converts data to a sequence
of bytes using a machine-independent format. This is useful for binary file I/O
and network communication.

DataOutputStream implements the DataOutput interface.
It wraps around another OutputStream and provides methods for
writing various data types. All multibyte writes are in big-endian order.
The class is not thread-safe for concurrent access.

## DataOutputStream Class Overview

DataOutputStream extends FilterOutputStream and
provides methods for writing primitive types. Key methods include write operations
for different data types, flushing, and closing the stream. The size method
returns bytes written so far.

public class DataOutputStream extends FilterOutputStream implements DataOutput {
    public DataOutputStream(OutputStream out);
    public final void writeBoolean(boolean v);
    public final void writeByte(int v);
    public final void writeShort(int v);
    public final void writeChar(int v);
    public final void writeInt(int v);
    public final void writeLong(long v);
    public final void writeFloat(float v);
    public final void writeDouble(double v);
    public final void writeBytes(String s);
    public final void writeChars(String s);
    public final void writeUTF(String str);
    public final int size();
    public void flush();
    public void close();
}

The code above shows key methods provided by DataOutputStream.
These methods allow writing Java primitive types in a portable binary format.
The size method returns total bytes written, useful for tracking output.

## Creating a DataOutputStream

DataOutputStream is created by wrapping it around another OutputStream.
Common wrappers include FileOutputStream for files or ByteArrayOutputStream for
memory. Always close the stream when done to ensure data is properly written.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with FileOutputStream
            FileOutputStream fileStream = new FileOutputStream("data.bin");
            DataOutputStream dataStream = new DataOutputStream(fileStream);
            
            System.out.println("DataOutputStream created");
            
            // Write some data
            dataStream.writeInt(42);
            dataStream.writeUTF("Hello");
            
            System.out.println("Data written to stream");
            
            dataStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates creating a DataOutputStream wrapped around a
FileOutputStream. We write an integer and string to the file. The UTF method
writes strings in modified UTF-8 format. Always close the stream to ensure all
data is flushed to the underlying output.

## Writing Primitive Data Types

DataOutputStream provides methods for all Java primitive types. Each method writes
the data in a fixed-size binary format. Integers are written in big-endian order.
Floating-point numbers use IEEE 754 format.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
             DataOutputStream dataStream = new DataOutputStream(byteStream)) {
            
            // Write various primitive types
            dataStream.writeBoolean(true);
            dataStream.writeByte(65); // 'A'
            dataStream.writeShort(1000);
            dataStream.writeInt(123456);
            dataStream.writeLong(999999999L);
            dataStream.writeFloat(3.14f);
            dataStream.writeDouble(2.71828);
            dataStream.writeChar('X');
            
            System.out.println("Total bytes written: " + dataStream.size());
            System.out.println("Data: " + byteStream.toString());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example writes all primitive types to a ByteArrayOutputStream. The size
method shows total bytes written (1+1+2+4+8+4+8+2=30 bytes). The output shows
raw bytes which may not be readable as text. DataOutputStream ensures consistent
binary representation across platforms.

## Writing Strings

DataOutputStream provides three methods for writing strings: writeBytes (8-bit),
writeChars (16-bit), and writeUTF (modified UTF-8). writeUTF is most commonly
used as it's compact and handles Unicode properly. The string length is written
first.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataOutputStream dos = 
                new DataOutputStream(new FileOutputStream("strings.bin"))) {
            
            // Write string as raw bytes (ASCII only)
            dos.writeBytes("ASCII");
            
            // Write string as sequence of chars (UTF-16)
            dos.writeChars("Unicode");
            
            // Write string in UTF-8 format (most efficient)
            dos.writeUTF("Hello 世界");
            
            System.out.println("Strings written to file");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates different string writing methods. writeBytes is for
ASCII-only strings. writeChars writes each character as 2 bytes. writeUTF is
most efficient for general text. The file contains binary data, not readable
text. Use DataInputStream to read the data back correctly.

## Working with Binary Files

DataOutputStream is commonly used for creating binary files. It allows writing
structured data in a compact format. Combined with DataInputStream, it provides
reliable binary file I/O. The format is platform-independent.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

public class Main {

    public static void main(String[] args) {
        try (DataOutputStream dos = 
                new DataOutputStream(new FileOutputStream("user.dat"))) {
            
            // Write user record
            dos.writeInt(101);          // user ID
            dos.writeUTF("John Doe");   // name
            dos.writeDouble(1250.75);  // balance
            dos.writeLong(new Date().getTime()); // timestamp
            
            System.out.println("Binary user record written");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example writes a structured binary record to a file. The record contains
different data types in a specific order. The format is compact and efficient
compared to text formats. To read the file, use DataInputStream with matching
read methods. The order of read operations must match the write order.

## Measuring Output Size

The size method returns the number of bytes written to the stream. This is useful
for tracking output size or creating headers. The count starts at zero and
increments with each write operation. It doesn't include buffered unwritten data.

Main.java
  

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
             DataOutputStream dataStream = new DataOutputStream(byteStream)) {
            
            System.out.println("Initial size: " + dataStream.size());
            
            dataStream.writeInt(42);
            System.out.println("After int: " + dataStream.size());
            
            dataStream.writeDouble(3.14159);
            System.out.println("After double: " + dataStream.size());
            
            dataStream.writeUTF("Measurement");
            System.out.println("After string: " + dataStream.size());
            
            System.out.println("Final size: " + dataStream.size());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates tracking output size with the size method. Each write
operation increases the count by the size of the written data (int=4, double=8).
The string size includes 2 bytes for length plus UTF-8 bytes. The size reflects
written data, not necessarily flushed data.

## Source

[Java DataOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/DataOutputStream.html)

In this article, we've covered the essential methods and features of the Java
DataOutputStream class. Understanding these concepts is crucial for working
with binary data output in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).