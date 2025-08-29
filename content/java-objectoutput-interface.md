+++
title = "Java ObjectOutput Interface"
date = 2025-08-29T19:59:24.349+01:00
draft = false
description = "Complete Java ObjectOutput interface tutorial covering all methods with examples. Learn about object serialization output in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectOutput Interface

Last modified: April 16, 2025

 

The java.io.ObjectOutput interface extends DataOutput
and provides methods for writing objects and primitive data types. It is used
primarily for object serialization in Java. Classes implementing this interface
can write objects to streams.

ObjectOutput is implemented by ObjectOutputStream and
other classes that need to serialize objects. It combines the functionality of
DataOutput with object writing capabilities. This interface is
essential for Java's serialization mechanism.

## ObjectOutput Interface Overview

ObjectOutput provides methods for writing both primitive types and
objects. Key methods include writeObject for serializing objects and
various write methods for primitives. The interface also includes flush and
close operations.

public interface ObjectOutput extends DataOutput, AutoCloseable {
    void writeObject(Object obj) throws IOException;
    void write(int b) throws IOException;
    void write(byte[] b) throws IOException;
    void write(byte[] b, int off, int len) throws IOException;
    void flush() throws IOException;
    void close() throws IOException;
    // DataOutput methods...
}

The code above shows key methods provided by ObjectOutput. These
methods allow for writing objects and primitive data types to output streams.
The interface extends both DataOutput and AutoCloseable.

## Writing Objects to a File

This example demonstrates basic object serialization using ObjectOutput.
We create a simple class, implement Serializable, and write an
instance to a file. The ObjectOutputStream implements
ObjectOutput.

Main.java
  

import java.io.*;

class Person implements Serializable {
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
        try (ObjectOutput out = new ObjectOutputStream(
                new FileOutputStream("person.dat"))) {
            
            Person person = new Person("John Doe", 30);
            out.writeObject(person);
            System.out.println("Person object written to file");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a Person class that implements
Serializable. We then create an instance and write it to a file
using ObjectOutput. The try-with-resources ensures proper stream
closure. The serialized data is written in binary format.

## Writing Primitive Data Types

ObjectOutput inherits primitive writing methods from
DataOutput. This example shows how to write various primitive types
to a file. The methods are similar to those in DataOutputStream.

Main.java
  

import java.io.*;

public class Main {
    public static void main(String[] args) {
        try (ObjectOutput out = new ObjectOutputStream(
                new FileOutputStream("primitives.dat"))) {
            
            out.writeBoolean(true);
            out.writeByte(65); // 'A'
            out.writeChar('B');
            out.writeDouble(3.14159);
            out.writeFloat(2.718f);
            out.writeInt(42);
            out.writeLong(123456789L);
            out.writeShort(32767);
            
            System.out.println("Primitives written to file");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example writes various primitive types to a file using
ObjectOutput methods. Each method writes its specific type in a
binary format. The data can be read back using corresponding methods from
ObjectInput. The order of writing must match the order of reading.

## Writing Arrays of Bytes

ObjectOutput provides methods for writing byte arrays. These are
useful for writing raw binary data. The methods can write entire arrays or
portions of arrays. This offers flexibility in data output.

Main.java
  

import java.io.*;

public class Main {
    public static void main(String[] args) {
        byte[] data = {0x48, 0x65, 0x6C, 0x6C, 0x6F}; // "Hello" in ASCII
        
        try (ObjectOutput out = new ObjectOutputStream(
                new FileOutputStream("bytes.dat"))) {
            
            // Write entire array
            out.write(data);
            
            // Write portion of array
            out.write(data, 1, 3); // Writes 'ell'
            
            System.out.println("Byte arrays written to file");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates writing byte arrays using ObjectOutput.
First, we write the entire array, then a portion of it. The second write uses
an offset and length to specify which bytes to write. This is useful for
processing large arrays in chunks.

## Combining Objects and Primitives

This example shows how to mix object and primitive writing in one stream. The
order of writes must be preserved when reading. This technique is common in
complex serialization scenarios.

Main.java
  

import java.io.*;

class Product implements Serializable {
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    
    @Override
    public String toString() {
        return "Product{name='" + name + "', price=" + price + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        try (ObjectOutput out = new ObjectOutputStream(
                new FileOutputStream("combined.dat"))) {
            
            // Write primitive header
            out.writeUTF("PRODUCT_DATA");
            out.writeInt(1); // Version
            
            // Write object
            Product product = new Product("Laptop", 999.99);
            out.writeObject(product);
            
            // Write more primitives
            out.writeLong(System.currentTimeMillis());
            out.writeBoolean(true);
            
            System.out.println("Combined data written to file");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example writes a string header, version number, product object, timestamp,
and boolean flag. The writeUTF method writes a string in modified
UTF-8 format. When reading, the data must be read in the same order it was
written.

## Flushing and Closing the Stream

ObjectOutput provides flush and close
methods. Flushing ensures all buffered data is written to the underlying stream.
Closing releases resources and should always be done when finished.

Main.java
  

import java.io.*;

public class Main {
    public static void main(String[] args) {
        ObjectOutput out = null;
        try {
            out = new ObjectOutputStream(
                new FileOutputStream("flush_close.dat"));
            
            out.writeUTF("Important data");
            
            // Ensure data is written immediately
            out.flush();
            System.out.println("Data flushed to file");
            
            // Write more data
            out.writeInt(42);
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (out != null) {
                try {
                    out.close();
                    System.out.println("Stream closed");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

This example demonstrates manual stream management with explicit flush and close
operations. The flush ensures data is written immediately, which is
important for critical operations. The finally block guarantees the
stream is closed even if an exception occurs.

## Source

[Java ObjectOutput Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectOutput.html)

In this article, we've covered the essential methods and features of the Java
ObjectOutput interface. Understanding these concepts is crucial for working with
object serialization in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).