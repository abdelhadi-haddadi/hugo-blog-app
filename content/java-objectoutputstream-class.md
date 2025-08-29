+++
title = "Java ObjectOutputStream Class"
date = 2025-08-29T19:59:24.334+01:00
draft = false
description = "Complete Java ObjectOutputStream class tutorial covering all methods with examples. Learn about object serialization in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectOutputStream Class

Last modified: April 16, 2025

 

The java.io.ObjectOutputStream class writes primitive data types and
objects to an OutputStream. It is used for Java object serialization, converting
objects into a byte stream. The serialized objects can be reconstructed using
ObjectInputStream.

ObjectOutputStream implements the ObjectOutput and
ObjectStreamConstants interfaces. It handles both primitive types
and object graphs. Only objects implementing Serializable can be
written. The stream includes type information for proper deserialization.

## ObjectOutputStream Class Overview

ObjectOutputStream provides methods for writing objects and
primitives to a stream. It maintains references to previously written objects
to handle circular references. The class writes a stream header that must be
matched by ObjectInputStream.

public class ObjectOutputStream extends OutputStream 
    implements ObjectOutput, ObjectStreamConstants {
    public ObjectOutputStream(OutputStream out);
    public final void writeObject(Object obj);
    public void writeInt(int val);
    public void writeUTF(String str);
    public void defaultWriteObject();
    public void reset();
    public void close();
}

The code above shows key methods provided by ObjectOutputStream.
These methods allow writing objects and primitives to an output stream. The
class handles object serialization according to Java's serialization protocol.

## Creating an ObjectOutputStream

ObjectOutputStream is created by wrapping it around another OutputStream. The
constructor writes a stream header that must be present for deserialization.
Always close the stream when done to ensure all data is written.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {
        try {
            // Create a FileOutputStream
            FileOutputStream fileOut = new FileOutputStream("object.dat");
            
            // Wrap it in ObjectOutputStream
            ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
            
            System.out.println("ObjectOutputStream created successfully");
            
            // Always close the stream
            objectOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates basic ObjectOutputStream creation. The FileOutputStream
provides the underlying byte stream. The ObjectOutputStream constructor may throw
IOException if it cannot write the stream header. Always close streams in a
finally block or use try-with-resources.

## Writing Primitive Types

ObjectOutputStream provides methods for writing all Java primitive types. These
methods write the data in a platform-independent format. The data can be read
back using corresponding methods in ObjectInputStream.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectOutputStream oos = 
                new ObjectOutputStream(new FileOutputStream("primitives.dat"))) {
            
            // Write various primitive types
            oos.writeBoolean(true);
            oos.writeByte((byte) 65);
            oos.writeChar('A');
            oos.writeDouble(3.14159);
            oos.writeFloat(2.718f);
            oos.writeInt(42);
            oos.writeLong(123456789L);
            oos.writeShort((short) 1000);
            
            System.out.println("Primitives written successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows writing different primitive types to a file. The
try-with-resources statement ensures proper stream closure. Each write method
handles a specific primitive type. The data is written in a binary format that
preserves type information.

## Serializing Objects

The primary purpose of ObjectOutputStream is writing objects. The object's class
must implement Serializable. The writeObject method handles the entire object
graph, including referenced objects. Transient fields are not serialized.

Person.java
  

import java.io.Serializable;

public class Person implements Serializable {
    private String name;
    private int age;
    private transient String password; // Won't be serialized
    
    public Person(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + "]";
    }
}

Main.java
  

```
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {
        Person person = new Person("Alice", 30, "secret123");
        
        try (ObjectOutputStream oos = 
                new ObjectOutputStream(new FileOutputStream("person.dat"))) {
            
            oos.writeObject(person);
            System.out.println("Person object serialized: " + person);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

This example demonstrates object serialization. The Person class implements
Serializable. The password field is marked transient and won't be saved. The
writeObject method serializes the entire object. Deserialization would recreate
the object with its field values.

## Writing Arrays and Collections

ObjectOutputStream can serialize arrays and standard collections. All elements
must be serializable. The stream preserves the structure of collections and
arrays. Nested collections are handled recursively.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        // Create sample data
        int[] numbers = {1, 2, 3, 4, 5};
        List&lt;String&gt; names = new ArrayList&lt;&gt;(
            Arrays.asList("Alice", "Bob", "Charlie"));
        
        try (ObjectOutputStream oos = 
                new ObjectOutputStream(new FileOutputStream("collections.dat"))) {
            
            // Write array
            oos.writeObject(numbers);
            
            // Write collection
            oos.writeObject(names);
            
            System.out.println("Array and collection serialized");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows serialization of an array and ArrayList. Both the array and
collection implement Serializable. The stream preserves the exact structure and
contents. During deserialization, the objects will be reconstructed with the
same contents.

## Custom Serialization with writeObject

Classes can define custom serialization by implementing writeObject. This method
must be private and handle writing the object's state. It typically calls
defaultWriteObject first, then writes additional data.

Account.java
  

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Date;

public class Account implements Serializable {
    private String accountNumber;
    private double balance;
    private Date lastTransaction;
    
    public Account(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.lastTransaction = new Date();
    }
    
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject(); // Serialize normal fields
        out.writeUTF(accountNumber.substring(0, 2) + "XXXXXX"); // Mask number
    }
    
    // readObject would be needed for deserialization
    
    @Override
    public String toString() {
        return "Account [number=" + accountNumber + ", balance=" + balance + "]";
    }
}

Main.java
  

```
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {
        Account account = new Account("1234567890", 1000.0);
        
        try (ObjectOutputStream oos = 
                new ObjectOutputStream(new FileOutputStream("account.dat"))) {
            
            oos.writeObject(account);
            System.out.println("Account serialized with custom writeObject");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

This example demonstrates custom serialization. The Account class implements
writeObject to mask the account number. defaultWriteObject handles normal field
serialization. Custom data can be added after calling defaultWriteObject. A
matching readObject method would be needed for deserialization.

## Resetting the Stream

The reset method clears the object cache, allowing duplicate objects to be
written as new objects. This is useful when sending multiple copies of the same
object. Without reset, subsequent writes would reference the first instance.

Main.java
  

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

public class Main {

    public static void main(String[] args) {
        String sharedString = "Shared String";
        
        try (ObjectOutputStream oos = 
                new ObjectOutputStream(new FileOutputStream("reset.dat"))) {
            
            // Write first instance
            oos.writeObject(sharedString);
            
            // Write second instance (will be treated as reference)
            oos.writeObject(sharedString);
            
            // Reset the stream
            oos.reset();
            
            // Write third instance (new copy)
            oos.writeObject(sharedString);
            
            System.out.println("Objects written with reset");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows the effect of reset on object serialization. The first two
writes of sharedString create one object plus a reference. After reset, the
third write creates a new copy. This behavior is important for network protocols
where each write should be independent.

## Source

[Java ObjectOutputStream Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectOutputStream.html)

In this article, we've covered the essential methods and features of the Java
ObjectOutputStream class. Understanding object serialization is crucial for
persistence and network communication in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).