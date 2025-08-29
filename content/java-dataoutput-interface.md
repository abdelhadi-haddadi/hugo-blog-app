+++
title = "Java DataOutput Interface"
date = 2025-08-29T19:59:13.030+01:00
draft = false
description = "Complete Java DataOutput interface tutorial covering all methods with examples. Learn about binary data output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DataOutput Interface

Last modified: April 16, 2025

 

The java.io.DataOutput interface provides methods for writing Java
primitive types to an output stream in a portable way. It enables binary data
output operations, converting values to a sequence of bytes. Classes implement
this interface to support machine-independent data writing.

DataOutput is implemented by classes like DataOutputStream
and RandomAccessFile. It defines methods for writing all primitive
types and strings. The data is written in big-endian format for portability
across different platforms.

## DataOutput Interface Overview

The DataOutput interface contains methods for writing primitive
types and strings. Each method writes data in a specific binary format. The
interface ensures consistent data representation regardless of the underlying
platform.

public interface DataOutput {
    void write(int b) throws IOException;
    void write(byte[] b) throws IOException;
    void write(byte[] b, int off, int len) throws IOException;
    void writeBoolean(boolean v) throws IOException;
    void writeByte(int v) throws IOException;
    void writeShort(int v) throws IOException;
    void writeChar(int v) throws IOException;
    void writeInt(int v) throws IOException;
    void writeLong(long v) throws IOException;
    void writeFloat(float v) throws IOException;
    void writeDouble(double v) throws IOException;
    void writeBytes(String s) throws IOException;
    void writeChars(String s) throws IOException;
    void writeUTF(String s) throws IOException;
}

The code above shows all methods defined in the DataOutput
interface. These methods allow writing primitive types in a platform-independent
way. The writeUTF method is particularly important for string serialization.

## Writing Primitive Types with DataOutputStream

DataOutputStream is the most common implementation of
DataOutput. It wraps an output stream and provides methods for
writing primitive types. This example demonstrates writing different data types
to a file.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataOutputStream dos = new DataOutputStream(
                new FileOutputStream("data.bin"))) {
            
            // Write various data types
            dos.writeBoolean(true);
            dos.writeByte(65); // 'A'
            dos.writeShort(1000);
            dos.writeInt(123456);
            dos.writeLong(987654321L);
            dos.writeFloat(3.14159f);
            dos.writeDouble(2.71828);
            dos.writeUTF("Hello, DataOutput!");
            
            System.out.println("Data written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to write different primitive types using
DataOutputStream. The try-with-resources ensures proper stream
closure. Each write method converts the value to bytes in big-endian format.
The file can be read back using DataInputStream.

## Writing Byte Arrays with DataOutput

The DataOutput interface provides methods for writing byte arrays.
These methods are useful for writing raw binary data. You can write the entire
array or a portion of it.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        byte[] data = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
        
        try (DataOutputStream dos = new DataOutputStream(
                new FileOutputStream("bytes.bin"))) {
            
            // Write entire array
            dos.write(data);
            
            // Write portion of array (positions 2-5)
            dos.write(data, 2, 4);
            
            System.out.println("Byte arrays written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing byte arrays using DataOutput
methods. The first call writes the entire array, while the second writes only
a portion. The offset and length parameters specify which bytes to write.

## Writing Strings with DataOutput

DataOutput provides three methods for writing strings:
writeBytes, writeChars, and writeUTF.
Each method handles string data differently, with writeUTF being
the most commonly used.

Main.java
  

import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String text = "Java DataOutput";
        
        try (DataOutputStream dos = new DataOutputStream(
                new FileOutputStream("strings.bin"))) {
            
            // Write as sequence of bytes (loses Unicode info)
            dos.writeBytes(text);
            
            // Write as sequence of chars (2 bytes per char)
            dos.writeChars(text);
            
            // Write in UTF-8 modified encoding
            dos.writeUTF(text);
            
            System.out.println("Strings written in different formats");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows different ways to write strings using DataOutput.
writeBytes writes only the low byte of each character.
writeChars writes each character as two bytes. writeUTF
uses a compact UTF-8 modified encoding that includes length information.

## Using DataOutput with RandomAccessFile

RandomAccessFile implements DataOutput, allowing
random access file writing. This example demonstrates writing data at specific
positions in a file.

Main.java
  

import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = new RandomAccessFile("random.bin", "rw")) {
            
            // Write some initial data
            raf.writeInt(100);
            raf.writeDouble(3.14);
            
            // Move to position 20 and write more data
            raf.seek(20);
            raf.writeUTF("Jumped to position 20");
            
            // Return to start and modify first value
            raf.seek(0);
            raf.writeInt(200);
            
            System.out.println("Random access writing complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how RandomAccessFile implements
DataOutput for random access writing. The seek method
moves the file pointer before writing. This allows modifying existing data or
writing at arbitrary positions.

## Implementing DataOutput for Custom Classes

You can implement DataOutput in custom classes to provide binary
output capabilities. This example shows a simple implementation that writes to
a byte array.

Main.java
  

import java.io.DataOutput;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;

class ByteArrayDataOutput implements DataOutput {
    private ByteBuffer buffer;
    
    public ByteArrayDataOutput(int size) {
        buffer = ByteBuffer.allocate(size);
    }
    
    @Override
    public void write(int b) throws IOException {
        buffer.put((byte) b);
    }
    
    @Override
    public void write(byte[] b) throws IOException {
        buffer.put(b);
    }
    
    // Other write methods implemented similarly...
    
    public byte[] toByteArray() {
        return Arrays.copyOf(buffer.array(), buffer.position());
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            ByteArrayDataOutput output = new ByteArrayDataOutput(100);
            output.writeInt(42);
            output.writeUTF("Custom DataOutput");
            
            byte[] result = output.toByteArray();
            System.out.println("Wrote " + result.length + " bytes");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates a custom DataOutput implementation using
ByteBuffer. The class provides basic writing functionality and
converts the buffer to a byte array. Real implementations would need to handle
all interface methods.

## Source

[Java DataOutput Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/DataOutput.html)

In this article, we've covered the essential methods and features of the Java
DataOutput interface. Understanding these concepts is crucial for working with
binary data output operations in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).