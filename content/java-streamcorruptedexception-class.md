+++
title = "Java StreamCorruptedException Class"
date = 2025-08-29T19:59:32.179+01:00
draft = false
description = "Complete Java StreamCorruptedException class tutorial covering all methods with examples. Learn about stream corruption handling in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StreamCorruptedException Class

Last modified: April 16, 2025

 

The java.io.StreamCorruptedException is thrown when the stream header
is invalid or when control information read from the stream violates consistency
checks. It indicates corruption in object serialization streams.

This exception typically occurs during deserialization when reading objects from
an ObjectInputStream. It signals that the stream data is corrupted
or was written incorrectly. The exception extends ObjectStreamException.

## StreamCorruptedException Class Overview

StreamCorruptedException is part of Java's object serialization
mechanism. It contains constructors to create exceptions with or without detail
messages. The class inherits standard exception functionality from its hierarchy.

public class StreamCorruptedException extends ObjectStreamException {
    public StreamCorruptedException();
    public StreamCorruptedException(String reason);
}

The code above shows the simple structure of StreamCorruptedException.
The parameterless constructor creates an exception without a message. The second
constructor allows specifying a detailed error message explaining the corruption.

## Basic Stream Corruption Example

This example demonstrates a simple case where StreamCorruptedException
occurs. We'll intentionally corrupt a serialized stream by modifying its header.
The exception helps detect invalid serialization streams early.

Main.java
  

import java.io.*;

public class Main {

    public static void main(String[] args) {
        try {
            // Create a byte array output stream
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            
            // Write a simple string
            oos.writeObject("Hello, World!");
            oos.close();
            
            // Get the bytes and corrupt the stream header
            byte[] data = baos.toByteArray();
            data[0] = 0; // Corrupt the magic number
            
            // Try to read the corrupted stream
            ByteArrayInputStream bais = new ByteArrayInputStream(data);
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // This will throw StreamCorruptedException
            String s = (String) ois.readObject();
            ois.close();
            
        } catch (StreamCorruptedException e) {
            System.err.println("Stream corrupted: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

In this example, we first serialize a string to a byte array. Then we deliberately
corrupt the stream header by changing the first byte. When attempting to
deserialize, the invalid header triggers StreamCorruptedException.

## Mismatched Object Stream Version

This example shows how version mismatches between serialization and deserialization
can cause StreamCorruptedException. Different JVMs or serialization
versions may produce incompatible streams.

Main.java
  

import java.io.*;

public class Main {

    static class Data implements Serializable {
        private static final long serialVersionUID = 1L;
        String value;
        
        Data(String value) {
            this.value = value;
        }
    }

    public static void main(String[] args) {
        try {
            // Serialize with one version UID
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(new Data("Test"));
            oos.close();
            
            // Get bytes and modify version UID in the stream
            byte[] data = baos.toByteArray();
            // Simulate version change by altering serialVersionUID bytes
            data[20] = (byte) ~data[20];
            
            // Attempt deserialization
            ByteArrayInputStream bais = new ByteArrayInputStream(data);
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // This throws StreamCorruptedException
            Data d = (Data) ois.readObject();
            ois.close();
            
        } catch (StreamCorruptedException e) {
            System.err.println("Version mismatch detected: " + e);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

Here we simulate a version mismatch by altering the serialVersionUID
in the stream. The deserialization fails with StreamCorruptedException
because the modified version doesn't match the class definition. This protects
against incompatible serialized data.

## Invalid Stream Header Format

This example demonstrates how an invalid stream header format causes
StreamCorruptedException. The header contains magic numbers and
version info that must match expected values.

Main.java
  

import java.io.*;

public class Main {

    public static void main(String[] args) {
        try {
            // Create a valid serialized stream
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject("Valid data");
            oos.close();
            
            // Prepend invalid header bytes
            byte[] validData = baos.toByteArray();
            byte[] invalidData = new byte[validData.length + 4];
            System.arraycopy(validData, 0, invalidData, 4, validData.length);
            
            // Try to deserialize
            ByteArrayInputStream bais = new ByteArrayInputStream(invalidData);
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // Throws StreamCorruptedException due to invalid header
            String s = (String) ois.readObject();
            ois.close();
            
        } catch (StreamCorruptedException e) {
            System.err.println("Invalid stream header: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

We create a valid serialized stream then prepend extra bytes to corrupt the
header format. The ObjectInputStream detects the invalid header
immediately and throws StreamCorruptedException. This prevents
processing of malformed streams.

## Truncated Stream Detection

This example shows how StreamCorruptedException helps detect
truncated streams. Incomplete serialization data causes consistency check
failures during deserialization.

Main.java
  

import java.io.*;

public class Main {

    public static void main(String[] args) {
        try {
            // Serialize multiple objects
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject("First object");
            oos.writeObject("Second object");
            oos.close();
            
            // Truncate the stream data
            byte[] fullData = baos.toByteArray();
            byte[] truncatedData = new byte[fullData.length / 2];
            System.arraycopy(fullData, 0, truncatedData, 0, truncatedData.length);
            
            // Attempt deserialization
            ByteArrayInputStream bais = new ByteArrayInputStream(truncatedData);
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // First object reads fine
            String first = (String) ois.readObject();
            System.out.println("Read: " + first);
            
            // Second object throws StreamCorruptedException
            String second = (String) ois.readObject();
            ois.close();
            
        } catch (StreamCorruptedException e) {
            System.err.println("Truncated stream detected: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

We serialize two objects then truncate the byte array. The first object
deserializes successfully, but attempting to read the second throws
StreamCorruptedException. The exception indicates the stream ended
unexpectedly during deserialization.

## Custom Serialization Corruption

This example demonstrates how invalid custom serialization can cause
StreamCorruptedException. The writeObject and
readObject methods must maintain consistency.

Main.java
  

import java.io.*;

public class Main {

    static class CustomData implements Serializable {
        private String value;
        
        CustomData(String value) {
            this.value = value;
        }
        
        private void writeObject(ObjectOutputStream out) throws IOException {
            out.defaultWriteObject();
            out.writeInt(123); // Write extra data
        }
        
        private void readObject(ObjectInputStream in) 
            throws IOException, ClassNotFoundException {
            in.defaultReadObject();
            // Forget to read the extra data
        }
    }

    public static void main(String[] args) {
        try {
            // Serialize
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(new CustomData("Test"));
            oos.close();
            
            // Deserialize
            ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // Throws StreamCorruptedException due to unread data
            CustomData cd = (CustomData) ois.readObject();
            ois.close();
            
        } catch (StreamCorruptedException e) {
            System.err.println("Custom serialization error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

The CustomData class writes extra data in writeObject
but doesn't read it in readObject. This inconsistency causes
StreamCorruptedException during deserialization. The exception
helps catch serialization/deserialization mismatches.

## Network Stream Corruption

This example simulates network stream corruption that might cause
StreamCorruptedException. Network issues can corrupt serialized
data during transmission.

Main.java
  

import java.io.*;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        try {
            // Simulate network transmission with potential corruption
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(Arrays.asList("A", "B", "C"));
            oos.close();
            
            // Simulate network corruption by flipping some bits
            byte[] transmitted = baos.toByteArray();
            for (int i = 10; i &lt; 20; i++) {
                transmitted[i] = (byte) ~transmitted[i];
            }
            
            // Attempt deserialization
            ByteArrayInputStream bais = new ByteArrayInputStream(transmitted);
            ObjectInputStream ois = new ObjectInputStream(bais);
            
            // Throws StreamCorruptedException due to corrupted data
            java.util.List&lt;?&gt; list = (java.util.List&lt;?&gt;) ois.readObject();
            ois.close();
            
            System.out.println("Read list: " + list);
            
        } catch (StreamCorruptedException e) {
            System.err.println("Network corruption detected: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

We simulate network corruption by flipping bits in the serialized data. The
ObjectInputStream detects the corrupted data and throws
StreamCorruptedException. In real applications, checksums or
retransmission would handle such errors.

## Source

[Java StreamCorruptedException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/StreamCorruptedException.html)

In this article, we've explored various scenarios that can cause
StreamCorruptedException in Java. Understanding these cases helps
develop robust serialization code and proper error handling.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).