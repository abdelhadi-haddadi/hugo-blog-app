+++
title = "Java ObjectInputStream Class"
date = 2025-08-29T19:59:23.219+01:00
draft = false
description = "Complete Java ObjectInputStream class tutorial covering all methods with examples. Learn about object deserialization in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectInputStream Class

Last modified: April 16, 2025

 

The java.io.ObjectInputStream class deserializes primitive data and
objects previously written using ObjectOutputStream. It reconstructs
objects from their serialized form. The class implements ObjectInput
and ObjectStreamConstants interfaces.

ObjectInputStream reads serialized data from an underlying input
stream. It handles object graphs, cyclic references, and class versioning. The
class provides methods to read primitives, objects, and arrays from the stream.

## ObjectInputStream Class Overview

ObjectInputStream extends InputStream and implements
object deserialization. Key methods include reading primitives, objects, and
custom deserialization via readObject. The class maintains state
for handling object references.

public class ObjectInputStream 
    extends InputStream implements ObjectInput, ObjectStreamConstants {
    public ObjectInputStream(InputStream in) throws IOException;
    public final Object readObject() throws IOException, ClassNotFoundException;
    public int read() throws IOException;
    public int read(byte[] buf, int off, int len) throws IOException;
    public boolean readBoolean() throws IOException;
    public byte readByte() throws IOException;
    public char readChar() throws IOException;
    public double readDouble() throws IOException;
    public float readFloat() throws IOException;
    public int readInt() throws IOException;
    public long readLong() throws IOException;
    public short readShort() throws IOException;
    public String readUTF() throws IOException;
    public Object readUnshared() throws IOException, ClassNotFoundException;
    public void defaultReadObject() throws IOException, ClassNotFoundException;
    public void close() throws IOException;
}

The code above shows key methods provided by ObjectInputStream.
These methods allow reading primitive types and objects from a serialized stream.
The class handles object reconstruction and reference resolution automatically.

## Creating an ObjectInputStream

ObjectInputStream is created by wrapping it around another InputStream.
The constructor may throw IOException if stream header is invalid.
Always close the stream when done to release resources.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create from FileInputStream
            FileInputStream fileStream = new FileInputStream("objects.dat");
            ObjectInputStream objectStream = new ObjectInputStream(fileStream);
            
            System.out.println("ObjectInputStream created successfully");
            
            // Always close streams
            objectStream.close();
        } catch (IOException e) {
            System.err.println("Error creating ObjectInputStream: " + e.getMessage());
        }
    }
}

This example demonstrates basic creation of an ObjectInputStream.
The stream is wrapped around a FileInputStream reading from a file.
Error handling is important as the constructor may throw IOException.

## Reading Primitive Types

ObjectInputStream provides methods to read primitive data types. These
methods correspond to those in ObjectOutputStream. Each method reads
the next primitive value from the stream.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("primitives.dat"))) {
            
            // Read primitives in same order they were written
            boolean bool = ois.readBoolean();
            byte b = ois.readByte();
            char c = ois.readChar();
            double d = ois.readDouble();
            float f = ois.readFloat();
            int i = ois.readInt();
            long l = ois.readLong();
            short s = ois.readShort();
            String str = ois.readUTF();
            
            System.out.println("Read boolean: " + bool);
            System.out.println("Read byte: " + b);
            System.out.println("Read char: " + c);
            System.out.println("Read double: " + d);
            System.out.println("Read float: " + f);
            System.out.println("Read int: " + i);
            System.out.println("Read long: " + l);
            System.out.println("Read short: " + s);
            System.out.println("Read String: " + str);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads primitive values from a file. The values must be read in the
exact same order they were written. The try-with-resources ensures proper stream
closure. Each read method corresponds to a specific primitive type.

## Reading Objects with readObject

The readObject method reconstructs objects from serialized data.
The object's class must implement Serializable and be available in
the JVM. The method may throw ClassNotFoundException.

Person.java
  

import java.io.Serializable;

public class Person implements Serializable {
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

Main.java
  

```
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("person.dat"))) {
            
            // Read object and cast to Person
            Person person = (Person) ois.readObject();
            System.out.println("Deserialized Person: " + person);
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

```

This example demonstrates object deserialization. The Person class
must implement Serializable. The readObject method
returns an Object that must be cast to the correct type. Both
IOException and ClassNotFoundException must be handled.

## Reading Multiple Objects and Arrays

ObjectInputStream can read multiple objects and arrays from a stream.
The objects are read in the order they were written. Arrays of primitives or
objects can be deserialized using readObject.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("objects.dat"))) {
            
            // Read multiple objects
            String message = (String) ois.readObject();
            int[] numbers = (int[]) ois.readObject();
            Person person = (Person) ois.readObject();
            
            System.out.println("Message: " + message);
            System.out.print("Numbers: ");
            for (int num : numbers) {
                System.out.print(num + " ");
            }
            System.out.println("\nPerson: " + person);
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example reads multiple objects from a stream. The objects must be read in the
same order they were written. The array is cast to the appropriate type. The
Person class from the previous example is reused here.

## Custom Deserialization with readUnshared

The readUnshared method ensures each deserialization returns a
unique object. Unlike readObject, it prevents sharing of
deserialized objects. This is useful when object identity must be preserved.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("shared.dat"))) {
            
            // Read with readObject (may return shared reference)
            Object obj1 = ois.readObject();
            Object obj2 = ois.readObject();
            
            // Read with readUnshared (always new instance)
            Object obj3 = ois.readUnshared();
            Object obj4 = ois.readUnshared();
            
            System.out.println("readObject same instance? " + (obj1 == obj2));
            System.out.println("readUnshared same instance? " + (obj3 == obj4));
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This example compares readObject and readUnshared.
The former may return shared references for multiple reads of same object. The
latter always returns unique instances. This affects object identity comparison.

## Handling Versioning with serialVersionUID

When classes evolve, serialVersionUID ensures compatibility. It's a
version number for serialized classes. Mismatches cause
InvalidClassException. Explicit UID provides version control.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("versioned.dat"))) {
            
            VersionedObject obj = (VersionedObject) ois.readObject();
            System.out.println("Deserialized versioned object: " + obj);
            
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

class VersionedObject implements Serializable {
    private static final long serialVersionUID = 1L;  // Explicit version UID
    private String data;
    
    public VersionedObject(String data) {
        this.data = data;
    }
    
    @Override
    public String toString() {
        return "VersionedObject{data='" + data + "'}";
    }
}

This example shows a class with explicit serialVersionUID. The UID
should be updated when making incompatible changes to the class. This prevents
version mismatch errors during deserialization of older serialized instances.

## Source

[Java ObjectInputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectInputStream.html)

In this article, we've covered the essential methods and features of the Java
ObjectInputStream class. Understanding these concepts is crucial for working
with object serialization in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).