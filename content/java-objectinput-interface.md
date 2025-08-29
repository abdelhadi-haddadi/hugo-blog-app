+++
title = "Java ObjectInput Interface"
date = 2025-08-29T19:59:23.233+01:00
draft = false
description = "Complete Java ObjectInput interface tutorial covering all methods with examples. Learn about object deserialization in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectInput Interface

Last modified: April 16, 2025

 

The java.io.ObjectInput interface extends DataInput and
provides functionality for reading objects and primitive data types. It is used
primarily for object deserialization in Java's serialization mechanism.

ObjectInput is implemented by classes like ObjectInputStream
that perform deserialization of objects. The interface provides methods to read
objects, primitive types, and arrays from an input source. It also supports
reading bytes and skipping data.

## ObjectInput Interface Overview

The ObjectInput interface combines object reading with primitive data
reading capabilities. Key methods include object deserialization, primitive type
reading, and stream control operations. All methods can throw IOException for
I/O errors.

public interface ObjectInput extends DataInput, AutoCloseable {
    Object readObject() throws ClassNotFoundException, IOException;
    int read() throws IOException;
    int read(byte[] b) throws IOException;
    int read(byte[] b, int off, int len) throws IOException;
    long skip(long n) throws IOException;
    int available() throws IOException;
    void close() throws IOException;
}

The code above shows the core methods of ObjectInput. The interface
extends DataInput which provides primitive reading methods. The
readObject method is the primary method for deserializing objects.

## Basic Object Deserialization

The most fundamental use of ObjectInput is deserializing objects.
This requires the object's class to implement Serializable. The
readObject method reads and reconstructs the serialized object.

Main.java
  

import java.io.FileInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;

class Person implements java.io.Serializable {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        try (ObjectInput in = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            
            Person p = (Person) in.readObject();
            System.out.println("Deserialized Person: " + p);
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates basic object deserialization. The Person
class must implement Serializable. The readObject
method reconstructs the object from the serialized data. The cast is necessary
as readObject returns Object.

## Reading Primitive Types

ObjectInput inherits primitive type reading methods from
DataInput. These include methods for reading all Java primitive
types. The methods read data in network byte order (big-endian).

Main.java
  

import java.io.FileInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (ObjectInput in = new ObjectInputStream(
                new FileInputStream("primitives.dat"))) {
            
            boolean bool = in.readBoolean();
            byte b = in.readByte();
            char c = in.readChar();
            short s = in.readShort();
            int i = in.readInt();
            long l = in.readLong();
            float f = in.readFloat();
            double d = in.readDouble();
            
            System.out.println("Boolean: " + bool);
            System.out.println("Byte: " + b);
            System.out.println("Char: " + c);
            System.out.println("Short: " + s);
            System.out.println("Int: " + i);
            System.out.println("Long: " + l);
            System.out.println("Float: " + f);
            System.out.println("Double: " + d);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows reading primitive types from an ObjectInput
stream. The data must be written in the same order it's read. Each method reads
the appropriate number of bytes for the type. The stream must contain enough
data for all reads.

## Reading Byte Arrays

ObjectInput provides methods for reading byte arrays. The
read(byte[]) method attempts to fill the entire array. The
read(byte[], int, int) method reads into a portion of the array.

Main.java
  

import java.io.FileInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        try (ObjectInput in = new ObjectInputStream(
                new FileInputStream("bytes.dat"))) {
            
            // Read full array
            byte[] buffer1 = new byte[10];
            int bytesRead1 = in.read(buffer1);
            System.out.println("Read " + bytesRead1 + " bytes: " + 
                Arrays.toString(buffer1));
            
            // Read partial array
            byte[] buffer2 = new byte[20];
            int bytesRead2 = in.read(buffer2, 5, 10);
            System.out.println("Read " + bytesRead2 + " bytes into offset 5: " + 
                Arrays.toString(buffer2));
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates reading byte arrays. The first read attempts to fill
the entire 10-byte array. The second read puts 10 bytes starting at offset 5
in a 20-byte array. Both methods return the number of bytes actually read.

## Skipping Bytes and Checking Availability

The skip method allows skipping bytes in the input stream. The
available method estimates bytes that can be read without blocking.
These are useful for stream navigation and status checking.

Main.java
  

import java.io.ByteArrayInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        byte[] data = new byte[100];
        for (int i = 0; i &lt; data.length; i++) {
            data[i] = (byte) i;
        }
        
        try (ObjectInput in = new ObjectInputStream(
                new ByteArrayInputStream(data))) {
            
            System.out.println("Initially available: " + in.available());
            
            // Skip first 20 bytes
            long skipped = in.skip(20);
            System.out.println("Skipped " + skipped + " bytes");
            
            // Read next byte
            int nextByte = in.read();
            System.out.println("Next byte: " + nextByte);
            
            System.out.println("Now available: " + in.available());
            
            // Skip remaining
            skipped = in.skip(100);
            System.out.println("Skipped " + skipped + " more bytes");
            
            System.out.println("Final available: " + in.available());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows skipping bytes and checking availability. The skip
method may skip fewer bytes than requested. The available method
returns the remaining bytes. After skipping all bytes, available
returns 0.

## Reading Multiple Objects

ObjectInput can read multiple objects sequentially from a stream.
Each readObject call reads the next object. The objects must be
read in the same order they were written.

Main.java
  

import java.io.FileInputStream;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.IOException;

class Product implements java.io.Serializable {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return String.format("Product{name='%s', price=%.2f}", name, price);
    }
}

public class Main {
    public static void main(String[] args) {
        try (ObjectInput in = new ObjectInputStream(
                new FileInputStream("products.ser"))) {
            
            // Read first object
            Product p1 = (Product) in.readObject();
            System.out.println("First product: " + p1);
            
            // Read second object
            Product p2 = (Product) in.readObject();
            System.out.println("Second product: " + p2);
            
            // Read primitive between objects
            int count = in.readInt();
            System.out.println("Product count: " + count);
            
            // Read third object
            Product p3 = (Product) in.readObject();
            System.out.println("Third product: " + p3);
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example reads multiple objects interspersed with primitive data. The objects
and primitives must be read in the exact order they were written. Attempting to
read objects in the wrong order will cause exceptions. The stream maintains the
serialization graph structure.

## Source

[Java ObjectInput Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectInput.html)

In this article, we've covered the essential methods and features of the Java
ObjectInput interface. Understanding these concepts is crucial for working with
object serialization and deserialization in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).