+++
title = "Java DataInput Interface"
date = 2025-08-29T19:59:11.889+01:00
draft = false
description = "Complete Java DataInput interface tutorial covering all methods with examples. Learn about binary data input operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DataInput Interface

Last modified: April 16, 2025

 

The java.io.DataInput interface provides methods for reading binary
data from an input stream. It defines operations for reading primitive types and
strings in a machine-independent way. Classes implementing this interface can
read data written by DataOutput implementations.

DataInput is implemented by classes like DataInputStream
and RandomAccessFile. The interface ensures consistent reading of
data regardless of the underlying platform. All methods read data in big-endian
format by default.

## DataInput Interface Overview

The DataInput interface contains methods for reading primitive types
and strings. It includes methods for reading bytes, booleans, characters, and
other data types. The interface also provides methods for reading UTF-8 encoded
strings.

public interface DataInput {
    void readFully(byte[] b) throws IOException;
    void readFully(byte[] b, int off, int len) throws IOException;
    int skipBytes(int n) throws IOException;
    boolean readBoolean() throws IOException;
    byte readByte() throws IOException;
    int readUnsignedByte() throws IOException;
    short readShort() throws IOException;
    int readUnsignedShort() throws IOException;
    char readChar() throws IOException;
    int readInt() throws IOException;
    long readLong() throws IOException;
    float readFloat() throws IOException;
    double readDouble() throws IOException;
    String readLine() throws IOException;
    String readUTF() throws IOException;
}

The code above shows the complete DataInput interface. Each method
reads a specific data type from the input stream. The interface throws
IOException for any I/O errors. Some methods may throw
EOFException if end of stream is reached.

## Reading Primitive Types with DataInputStream

DataInputStream is the most common implementation of
DataInput. It wraps around an InputStream and provides
methods for reading primitive types. This example shows how to read different
data types.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("data.bin"))) {
            
            // Read different data types
            boolean boolVal = dis.readBoolean();
            byte byteVal = dis.readByte();
            char charVal = dis.readChar();
            short shortVal = dis.readShort();
            int intVal = dis.readInt();
            long longVal = dis.readLong();
            float floatVal = dis.readFloat();
            double doubleVal = dis.readDouble();
            
            System.out.println("Boolean: " + boolVal);
            System.out.println("Byte: " + byteVal);
            System.out.println("Char: " + charVal);
            System.out.println("Short: " + shortVal);
            System.out.println("Int: " + intVal);
            System.out.println("Long: " + longVal);
            System.out.println("Float: " + floatVal);
            System.out.println("Double: " + doubleVal);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading primitive types from a binary file. The data
must be written in the same order it's read. DataInputStream
automatically converts bytes to the appropriate primitive type. The try-with-resources
statement ensures proper stream closure.

## Reading Byte Arrays with readFully

The readFully methods read complete byte arrays from the input
stream. They block until all requested bytes are read or end of stream is
reached. This ensures complete data reading without partial results.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("binary.dat"))) {
            
            // Read fixed-size header
            byte[] header = new byte[16];
            dis.readFully(header);
            System.out.println("Header read: " + new String(header));
            
            // Read data with offset
            byte[] data = new byte[1024];
            dis.readFully(data, 0, 512); // Read first half
            dis.readFully(data, 512, 512); // Read second half
            
            System.out.println("Data read successfully");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows two variants of readFully. The first reads a
complete byte array, while the second reads into a portion of an array. Both
methods throw EOFException if end of stream is reached before
reading all bytes. They are useful for reading fixed-size data structures.

## Reading UTF-8 Strings

The readUTF method reads strings encoded in modified UTF-8 format.
This format starts with a two-byte length followed by the string bytes. It's
commonly used for serialization and network communication.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("strings.dat"))) {
            
            // Read UTF string
            String str1 = dis.readUTF();
            System.out.println("First string: " + str1);
            
            // Read another UTF string
            String str2 = dis.readUTF();
            System.out.println("Second string: " + str2);
            
            // Read remaining strings
            while (dis.available() &gt; 0) {
                System.out.println("Next string: " + dis.readUTF());
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading UTF-8 encoded strings from a binary file. The
readUTF method reads the length first, then the string bytes. The
available method checks for remaining data. Note that UTF-8 strings
written by DataOutput use a modified format different from standard
UTF-8.

## Skipping Bytes in the Stream

The skipBytes method attempts to skip over a specified number of
bytes. It returns the actual number of bytes skipped, which may be less than
requested. This is useful for ignoring unwanted data in the stream.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("datafile.dat"))) {
            
            // Read first value
            int firstValue = dis.readInt();
            System.out.println("First value: " + firstValue);
            
            // Skip 8 bytes
            int skipped = dis.skipBytes(8);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read next value after skip
            double nextValue = dis.readDouble();
            System.out.println("Next value: " + nextValue);
            
            // Try to skip beyond end of file
            skipped = dis.skipBytes(1000);
            System.out.println("Skipped " + skipped + " bytes at end");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to skip bytes in a data stream. The first skip moves past
8 bytes between two values. The second skip attempts to skip 1000 bytes but only
skips remaining bytes. The method returns the actual number of bytes skipped,
which may be less than requested at end of file.

## Reading Unsigned Values

DataInput provides methods for reading unsigned byte and short
values. These are useful when working with binary data that uses unsigned types.
Java doesn't have unsigned primitives, so these methods return wider types.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("unsigned.dat"))) {
            
            // Read unsigned byte (0-255)
            int unsignedByte = dis.readUnsignedByte();
            System.out.println("Unsigned byte: " + unsignedByte);
            
            // Read unsigned short (0-65535)
            int unsignedShort = dis.readUnsignedShort();
            System.out.println("Unsigned short: " + unsignedShort);
            
            // Read signed and unsigned comparison
            byte signedByte = dis.readByte();
            int anotherUnsigned = dis.readUnsignedByte();
            
            System.out.println("Signed byte: " + signedByte);
            System.out.println("Unsigned byte: " + anotherUnsigned);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading unsigned values. readUnsignedByte
returns an int in range 0-255, while readUnsignedShort returns
0-65535. The example shows the difference between signed and unsigned byte
values. These methods are essential when processing binary formats that use
unsigned types.

## Reading Lines with readLine

The readLine method reads a line of text terminated by newline,
carriage return, or EOF. It's deprecated but still useful for legacy formats.
Modern code should prefer readUTF or other text reading methods.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("textfile.txt"))) {
            
            // Read lines until EOF
            String line;
            while ((line = dis.readLine()) != null) {
                System.out.println("Line read: " + line);
            }
            
            System.out.println("End of file reached");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to use the deprecated readLine method. It
reads lines until encountering null (EOF). The method doesn't properly convert
bytes to characters for non-ASCII text. For modern code, use
BufferedReader.readLine instead for proper text handling.

## Source

[Java DataInput Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/DataInput.html)

In this article, we've covered all methods of the Java DataInput interface with
practical examples. Understanding these methods is essential for working with
binary data in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).