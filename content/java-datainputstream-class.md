+++
title = "Java DataInputStream Class"
date = 2025-08-29T19:59:11.872+01:00
draft = false
description = "Complete Java DataInputStream class tutorial covering all methods with examples. Learn about reading primitive data types in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DataInputStream Class

Last modified: April 16, 2025

 

The java.io.DataInputStream class enables reading primitive Java data
types from an underlying input stream. It reads data in a machine-independent
way. This is useful for reading data written by DataOutputStream.

DataInputStream implements the DataInput interface. It
wraps around another InputStream and provides methods to read
primitives. The class is not thread-safe for concurrent access without external
synchronization.

## DataInputStream Class Overview

DataInputStream extends FilterInputStream and provides
methods to read Java primitives. Key methods include reading various data types
like int, double, boolean etc. All methods read data in big-endian format.

public class DataInputStream extends FilterInputStream implements DataInput {
    public DataInputStream(InputStream in);
    public final int read(byte[] b) throws IOException;
    public final int read(byte[] b, int off, int len) throws IOException;
    public final boolean readBoolean() throws IOException;
    public final byte readByte() throws IOException;
    public final char readChar() throws IOException;
    public final double readDouble() throws IOException;
    public final float readFloat() throws IOException;
    public final int readInt() throws IOException;
    public final long readLong() throws IOException;
    public final short readShort() throws IOException;
    public final String readUTF() throws IOException;
    public final int readUnsignedByte() throws IOException;
    public final int readUnsignedShort() throws IOException;
    public final int skipBytes(int n) throws IOException;
}

The code above shows key methods provided by DataInputStream. These
methods allow reading primitive data types from the stream. The read methods
throw EOFException if end of stream is reached unexpectedly.

## Creating a DataInputStream

DataInputStream is created by wrapping it around another InputStream.
Typically used with file or network streams. The constructor takes the underlying
stream as parameter. Always close the stream when done.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            // Create with FileInputStream
            FileInputStream fileStream = new FileInputStream("data.bin");
            DataInputStream dataStream = new DataInputStream(fileStream);
            
            System.out.println("DataInputStream created successfully");
            
            dataStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates creating a DataInputStream from a
FileInputStream. The stream should be properly closed after use.
The try-with-resources statement can also be used for automatic resource
management.

## Reading Primitive Data Types

DataInputStream provides methods to read all Java primitive types. Each method
reads the appropriate number of bytes for the type. The methods throw
EOFException if end of stream is reached.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("primitives.dat"))) {
            
            boolean boolVal = dis.readBoolean();
            byte byteVal = dis.readByte();
            char charVal = dis.readChar();
            double doubleVal = dis.readDouble();
            float floatVal = dis.readFloat();
            int intVal = dis.readInt();
            long longVal = dis.readLong();
            short shortVal = dis.readShort();
            
            System.out.println("Boolean: " + boolVal);
            System.out.println("Byte: " + byteVal);
            System.out.println("Char: " + charVal);
            System.out.println("Double: " + doubleVal);
            System.out.println("Float: " + floatVal);
            System.out.println("Int: " + intVal);
            System.out.println("Long: " + longVal);
            System.out.println("Short: " + shortVal);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads various primitive types from a file. The data must be written
in the same order using DataOutputStream. The read methods expect
data in big-endian format. Each method reads exactly the number of bytes needed
for the type.

## Reading UTF Strings

The readUTF method reads a string encoded in modified UTF-8 format.
This is the same format used by DataOutputStream.writeUTF. The first
two bytes represent the string length followed by the string data.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("strings.dat"))) {
            
            String str1 = dis.readUTF();
            String str2 = dis.readUTF();
            
            System.out.println("First string: " + str1);
            System.out.println("Second string: " + str2);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading UTF-8 encoded strings from a file. The strings
must have been written using DataOutputStream.writeUTF. The method
reads the length first, then the string bytes. Modified UTF-8 handles null
characters differently than standard UTF-8.

## Reading Byte Arrays

DataInputStream provides methods to read byte arrays. The readFully
methods read until the buffer is filled or end of stream is reached. These are
useful for reading fixed-size binary data.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("bytes.dat"))) {
            
            byte[] buffer = new byte[100];
            
            // Read exactly 100 bytes
            dis.readFully(buffer);
            
            System.out.println("Read " + buffer.length + " bytes");
            
            // Read into part of array
            byte[] partialBuffer = new byte[200];
            dis.readFully(partialBuffer, 50, 100);
            
            System.out.println("Read 100 bytes into offset 50");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows reading byte arrays using readFully. The first
call reads a full 100-byte array. The second reads 100 bytes into a 200-byte
array starting at offset 50. These methods throw EOFException if
end of stream is reached before filling the buffer.

## Skipping Bytes

The skipBytes method attempts to skip a specified number of bytes.
It returns the actual number of bytes skipped. This may be less than requested
if end of stream is reached.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("data.bin"))) {
            
            System.out.println("Available bytes: " + dis.available());
            
            int skipped = dis.skipBytes(50);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read after skipping
            int value = dis.readInt();
            System.out.println("Read int after skipping: " + value);
            
            // Try to skip beyond end
            skipped = dis.skipBytes(1000);
            System.out.println("Skipped " + skipped + " bytes (end near)");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates skipping bytes in the stream. The first skip moves
forward 50 bytes. The second attempts to skip 1000 bytes but may skip fewer if
near end. The available method shows remaining bytes but isn't
always accurate for all stream types.

## Reading Unsigned Values

DataInputStream provides methods to read unsigned byte and short values. These
return values in larger types (int) to accommodate the unsigned range. Useful
when working with binary formats that use unsigned values.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("unsigned.dat"))) {
            
            int unsignedByte = dis.readUnsignedByte();
            int unsignedShort = dis.readUnsignedShort();
            
            System.out.println("Unsigned byte: " + unsignedByte);
            System.out.println("Unsigned short: " + unsignedShort);
            
            // Regular read for comparison
            byte signedByte = dis.readByte();
            short signedShort = dis.readShort();
            
            System.out.println("Signed byte: " + signedByte);
            System.out.println("Signed short: " + signedShort);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows reading unsigned values. The unsigned byte method returns
0-255 in an int. The unsigned short returns 0-65535. Compare with signed reads
which may return negative values. Useful when processing binary formats that
use unsigned values.

## Source

[Java DataInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/DataInputStream.html)

In this article, we've covered the essential methods and features of the Java
DataInputStream class. Understanding these concepts is crucial for working with
binary data and primitive types in Java I/O operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).