+++
title = "Java ObjectStreamException Class"
date = 2025-08-29T19:59:25.471+01:00
draft = false
description = "Complete Java ObjectStreamException class tutorial covering all aspects with examples. Learn about object serialization exceptions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectStreamException Class

Last modified: April 16, 2025

 

The java.io.ObjectStreamException is the superclass of all exceptions
specific to Object Stream classes. It indicates problems during object
serialization or deserialization. This exception extends IOException.

ObjectStreamException has several subclasses that represent specific
serialization problems. These include InvalidClassException,
NotSerializableException, and StreamCorruptedException.
Each handles different serialization failure scenarios.

## ObjectStreamException Class Overview

ObjectStreamException is an abstract class that serves as the base
for object stream exceptions. It provides constructors to create exceptions with
detailed messages. The class itself doesn't add new methods beyond standard
exception functionality.

public abstract class ObjectStreamException extends IOException {
    protected ObjectStreamException(String classname);
    protected ObjectStreamException();
}

The code above shows the basic structure of ObjectStreamException.
It has two constructors - one with a message and one without. Concrete subclasses
provide specific exception types for different serialization problems.

## InvalidClassException Example

InvalidClassException occurs when the serialization runtime detects
problems with a class. This includes mismatched serialVersionUID or invalid class
definitions. The exception provides details about the problematic class.

Main.java
  

import java.io.*;

class Data implements Serializable {
    private static final long serialVersionUID = 1L;
    private String info;
    
    // Changed class definition after serialization
    private int newField; // Added after initial serialization
}

public class Main {
    public static void main(String[] args) {
        try {
            // Serialize
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"));
            out.writeObject(new Data());
            out.close();
            
            // Modify class definition (change serialVersionUID)
            // Then attempt deserialization
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"));
            Data obj = (Data) in.readObject();
            in.close();
        } catch (InvalidClassException e) {
            System.err.println("InvalidClassException: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates how InvalidClassException occurs when
class definitions change. After serializing an object, modifying the class
(like adding fields) can cause this exception during deserialization. The
serialVersionUID mismatch is a common cause.

## NotSerializableException Example

NotSerializableException is thrown when an object is not marked as
Serializable. All objects in the serialization graph must implement
Serializable. This exception identifies the non-serializable class.

Main.java
  

import java.io.*;

class NonSerializableData {
    private String info = "Cannot serialize me";
}

class Container implements Serializable {
    private NonSerializableData data = new NonSerializableData();
}

public class Main {
    public static void main(String[] args) {
        try {
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("container.ser"));
            out.writeObject(new Container());
            out.close();
        } catch (NotSerializableException e) {
            System.err.println("NotSerializableException: " + e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows NotSerializableException when trying to serialize
an object containing a non-serializable field. The Container class
is serializable, but its NonSerializableData field isn't. The
exception identifies the problematic class in its message.

## StreamCorruptedException Example

StreamCorruptedException indicates that the stream protocol has been
violated. This happens when the stream data is corrupted or tampered with. The
exception suggests the stream is not in the expected format.

Main.java
  

import java.io.*;

public class Main {
    public static void main(String[] args) {
        try {
            // Create a valid serialized file
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("data.ser"));
            out.writeObject("Hello, Serialization!");
            out.close();
            
            // Corrupt the file by appending random data
            RandomAccessFile raf = new RandomAccessFile("data.ser", "rw");
            raf.seek(raf.length());
            raf.writeBytes("CORRUPTED DATA");
            raf.close();
            
            // Attempt to read corrupted file
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("data.ser"));
            String obj = (String) in.readObject();
            in.close();
        } catch (StreamCorruptedException e) {
            System.err.println("StreamCorruptedException: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example deliberately corrupts a serialized file to demonstrate
StreamCorruptedException. After creating a valid serialized file,
we append random data to corrupt it. When attempting to deserialize, the
exception occurs due to the invalid stream format.

## OptionalDataException Example

OptionalDataException occurs during deserialization when primitive
data is found instead of objects. This typically happens when reading a stream
written with custom serialization methods. The exception indicates unexpected
data types.

Main.java
  

import java.io.*;

class CustomData implements Serializable {
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.writeInt(42); // Write primitive instead of object
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            // Serialize
            ObjectOutputStream out = new ObjectOutputStream(
                new FileOutputStream("custom.ser"));
            out.writeObject(new CustomData());
            out.close();
            
            // Deserialize
            ObjectInputStream in = new ObjectInputStream(
                new FileInputStream("custom.ser"));
            CustomData obj = (CustomData) in.readObject();
            in.close();
        } catch (OptionalDataException e) {
            System.err.println("OptionalDataException: " + e.getMessage());
            System.out.println("Primitive data found: " + e.length + " bytes");
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows OptionalDataException when custom serialization
writes primitive data. The CustomData class writes an integer
directly to the stream. During deserialization, the system expects objects but
finds primitive data instead.

## WriteAbortedException Example

WriteAbortedException occurs during deserialization when the
original serialization failed. It wraps the exception that caused the write
abortion. This provides context about why serialization failed.

Main.java
  

import java.io.*;

class ProblematicData implements Serializable {
    private Object nonSerializable = new Object();
}

public class Main {
    public static void main(String[] args) {
        try {
            // Attempt serialization (will fail)
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(baos);
            out.writeObject(new ProblematicData());
            out.close();
        } catch (NotSerializableException e) {
            try {
                // Now attempt to deserialize the partial stream
                ByteArrayInputStream bais = new ByteArrayInputStream(
                    baos.toByteArray());
                ObjectInputStream in = new ObjectInputStream(bais);
                in.readObject();
                in.close();
            } catch (WriteAbortedException wae) {
                System.err.println("WriteAbortedException: " + wae.getMessage());
                System.out.println("Original exception: " + 
                    wae.detail.getMessage());
                wae.printStackTrace();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}

This example demonstrates WriteAbortedException by first attempting
to serialize a non-serializable object. After the serialization fails, we try to
deserialize the partial stream. The exception contains details about the original
failure that caused the abortion.

## InvalidObjectException Example

InvalidObjectException is thrown when validation of a deserialized
object fails. This typically occurs during custom validation in the
readObject method. It indicates the object failed post-processing
checks.

Main.java
  

import java.io.*;

class ValidatedData implements Serializable {
    private int value;
    
    private void readObject(ObjectInputStream in) 
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();
        if (value &lt; 0 || value &gt; 100) {
            throw new InvalidObjectException("Value must be between 0 and 100");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            // Serialize valid data
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(baos);
            ValidatedData valid = new ValidatedData();
            valid.value = 50;
            out.writeObject(valid);
            out.close();
            
            // Modify serialized data to make it invalid
            byte[] data = baos.toByteArray();
            // Corrupt the value to be 200 (simulating invalid data)
            data[data.length - 1] = (byte) 200;
            
            // Attempt deserialization
            ByteArrayInputStream bais = new ByteArrayInputStream(data);
            ObjectInputStream in = new ObjectInputStream(bais);
            ValidatedData obj = (ValidatedData) in.readObject();
            in.close();
        } catch (InvalidObjectException e) {
            System.err.println("InvalidObjectException: " + e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows InvalidObjectException during custom validation.
The ValidatedData class checks if its value is within 0-100 range.
We simulate invalid data by modifying the serialized bytes directly. The
validation fails during deserialization.

## Source

[Java ObjectStreamException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectStreamException.html)

In this article, we've covered the ObjectStreamException class and
its common subclasses. Understanding these exceptions is crucial for robust
object serialization and deserialization in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).