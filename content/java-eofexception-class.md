+++
title = "Java EOFException Class"
date = 2025-08-29T19:59:12.996+01:00
draft = false
description = "Complete Java EOFException class tutorial covering all methods with examples. Learn about end-of-file exceptions in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java EOFException Class

Last modified: April 16, 2025

 

The java.io.EOFException signals that an end of file or stream has
been reached unexpectedly during input. It extends IOException and
is thrown when reading past the end of a file or stream. This exception helps
detect unexpected end-of-file conditions.

EOFException is commonly thrown by data input streams when reading
primitive data types. Unlike normal end-of-file detection (returning -1), this
exception indicates an unexpected termination. It's a checked exception that must
be caught or declared.

## EOFException Class Overview

EOFException extends IOException and provides no
additional methods. It serves as a specific type of I/O exception. The class is
serializable and follows standard exception handling patterns.

public class EOFException extends IOException {
    public EOFException();
    public EOFException(String s);
}

The code above shows the simple structure of EOFException. It offers
two constructors - a default one and one with a message. The message can provide
details about the unexpected end-of-file condition.

## Basic EOFException Example

This example demonstrates how EOFException can occur when reading
from a data stream. We'll use DataInputStream which throws this
exception when reading past the end of file.

Main.java
  

import java.io.DataInputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("data.bin"))) {
            
            while (true) {
                int value = dis.readInt();
                System.out.println("Read value: " + value);
            }
            
        } catch (EOFException e) {
            System.out.println("End of file reached");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example attempts to read integers from a binary file until EOF. The
DataInputStream.readInt throws EOFException when it
can't read a complete int. We catch this exception to handle the normal end of
file condition.

## Handling EOFException with Primitive Types

EOFException is commonly encountered when reading primitive data
types. Each primitive type has a fixed size, and reading partial data triggers
the exception. This example shows handling for multiple primitive types.

Main.java
  

import java.io.DataInputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("mixed_data.bin"))) {
            
            while (true) {
                try {
                    int i = dis.readInt();
                    double d = dis.readDouble();
                    boolean b = dis.readBoolean();
                    
                    System.out.printf("Read: %d, %.2f, %b%n", i, d, b);
                } catch (EOFException e) {
                    System.out.println("Finished reading complete records");
                    break;
                }
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads a sequence of int, double, and boolean values. The inner
try-catch handles EOFException when a complete record can't be read.
This approach allows processing complete records while handling partial ones
gracefully.

## EOFException with ObjectInputStream

When deserializing objects, EOFException signals the end of valid
objects. This example demonstrates reading multiple serialized objects until
EOF. The exception marks the end of the object stream.

Main.java
  

import java.io.EOFException;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;

public class Main {

    public static void main(String[] args) {
        try (ObjectInputStream ois = 
                new ObjectInputStream(new FileInputStream("objects.dat"))) {
            
            System.out.println("Reading objects:");
            
            while (true) {
                try {
                    Object obj = ois.readObject();
                    System.out.println("Read object: " + obj);
                } catch (ClassNotFoundException e) {
                    System.out.println("Unknown class found");
                }
            }
            
        } catch (EOFException e) {
            System.out.println("End of object stream reached");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example reads serialized objects until EOFException occurs.
The exception indicates no more objects are available. Note we also handle
ClassNotFoundException which may occur during deserialization.

## Custom EOF Handling in File Reading

This example shows how to implement custom end-of-file handling while reading
bytes. We compare the standard approach (returning -1) with
EOFException from data streams.

Main.java
  

import java.io.DataInputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        // Standard byte reading (returns -1 at EOF)
        try (FileInputStream fis = new FileInputStream("data.txt")) {
            int byteRead;
            while ((byteRead = fis.read()) != -1) {
                System.out.print((char) byteRead);
            }
            System.out.println("\nStandard EOF reached");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // DataInputStream reading (throws EOFException)
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("data.txt"))) {
            while (true) {
                byte b = dis.readByte();
                System.out.print((char) b);
            }
        } catch (EOFException e) {
            System.out.println("\nDataInputStream EOF reached");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The example contrasts two EOF detection methods. FileInputStream.read
returns -1 at EOF, while DataInputStream.readByte throws
EOFException. Both approaches are valid but used in different
contexts.

## Preventing EOFException with Available Checks

We can prevent EOFException by checking available bytes before
reading. This example shows how to use available to avoid the
exception when reading fixed-size data.

Main.java
  

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try (DataInputStream dis = 
                new DataInputStream(new FileInputStream("data.bin"))) {
            
            while (dis.available() &gt;= Integer.BYTES) {
                int value = dis.readInt();
                System.out.println("Read integer: " + value);
            }
            
            System.out.println("Remaining bytes: " + dis.available());
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This approach checks if enough bytes are available before reading an integer.
Integer.BYTES gives the size of an int (4 bytes). This prevents
EOFException by ensuring complete data is available before reading.

## EOFException in Random Access Files

EOFException can occur with RandomAccessFile when
reading past the end of file. This example demonstrates proper handling when
working with random file access.

Main.java
  

import java.io.EOFException;
import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {

    public static void main(String[] args) {
        try (RandomAccessFile raf = 
                new RandomAccessFile("random.dat", "r")) {
            
            // Move to end minus 4 bytes (size of int)
            raf.seek(raf.length() - Integer.BYTES);
            System.out.println("Last int: " + raf.readInt());
            
            // Attempt to read past EOF
            try {
                raf.readInt();
            } catch (EOFException e) {
                System.out.println("Caught EOFException as expected");
            }
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows EOFException handling with
RandomAccessFile. We first read the last int successfully, then
demonstrate the exception when reading past EOF. The file position can be
controlled with seek.

## Source

[Java EOFException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/EOFException.html)

In this article, we've covered the essential aspects of the Java
EOFException class. Understanding this exception is crucial for
proper handling of end-of-file conditions in Java I/O operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).