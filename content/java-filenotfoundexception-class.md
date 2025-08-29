+++
title = "Java FileNotFoundException Class"
date = 2025-08-29T19:59:16.400+01:00
draft = false
description = "Complete Java FileNotFoundException class tutorial covering all methods with examples. Learn about file handling exceptions in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FileNotFoundException Class

Last modified: April 16, 2025

 

The java.io.FileNotFoundException is a checked exception thrown when
a file with the specified pathname does not exist. It also occurs when the file
exists but cannot be opened for reading or writing due to permission issues.

This exception extends IOException and is part of Java's I/O
exception hierarchy. Being a checked exception, it must be either caught or
declared in the method signature. It provides detailed information about the
failed file operation.

## FileNotFoundException Class Overview

FileNotFoundException indicates a failure to locate or open a file.
The exception message typically includes the problematic file path. Constructors
allow creating exceptions with custom messages or causes.

public class FileNotFoundException extends IOException {
    public FileNotFoundException();
    public FileNotFoundException(String s);
}

The code above shows the simple structure of FileNotFoundException.
It provides two constructors - one without parameters and one accepting a detail
message. The message helps identify the specific file that couldn't be accessed.

## Basic FileNotFoundException Example

This example demonstrates the most common scenario where FileNotFoundException
occurs - trying to read a non-existent file. The exception provides information
about the missing file in its message.

Main.java
  

import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args) {
        try {
            FileInputStream fis = new FileInputStream("nonexistent.txt");
        } catch (FileNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

When run, this code attempts to open a file that doesn't exist. The exception
handler catches FileNotFoundException and prints its message. The stack trace
shows where the exception occurred in the code. Always handle this exception
when working with file operations.

## Checking File Existence First

A common practice is to check if a file exists before attempting to open it.
This can prevent FileNotFoundException in some cases. However, race conditions
can still occur between checking and opening.

Main.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args) {
        String filename = "data.txt";
        File file = new File(filename);
        
        if (!file.exists()) {
            System.out.println("File " + filename + " does not exist");
            return;
        }
        
        try {
            FileInputStream fis = new FileInputStream(file);
            System.out.println("File opened successfully");
            fis.close();
        } catch (FileNotFoundException e) {
            System.out.println("File disappeared after checking: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example first checks if the file exists using File.exists.
If not, it avoids attempting to open it. However, the file could be deleted
between the check and open operations. Therefore, exception handling is still
necessary for robust code.

## Permission-Related FileNotFoundException

FileNotFoundException can also occur when lacking permissions to access an
existing file. This example demonstrates attempting to read a file without
proper read permissions.

Main.java
  

import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args) {
        try {
            // Attempt to open a protected system file
            FileInputStream fis = new FileInputStream("/etc/shadow");
            fis.close();
        } catch (FileNotFoundException e) {
            System.out.println("Access denied: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

On Unix-like systems, /etc/shadow is typically readable only by root. When run
without sufficient privileges, this code throws FileNotFoundException. The
exception message indicates permission denial. Always check both existence and
permissions when working with files.

## FileNotFoundException with Detailed Message

We can create custom FileNotFoundException instances with specific messages.
This is useful when implementing file operations that need to provide detailed
error information to callers.

Main.java
  

import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args) {
        String filename = "config.xml";
        
        try {
            openConfigFile(filename);
        } catch (FileNotFoundException e) {
            System.out.println("Configuration error: " + e.getMessage());
        }
    }
    
    public static void openConfigFile(String path) throws FileNotFoundException {
        if (!path.endsWith(".xml")) {
            throw new FileNotFoundException("Invalid config file format: " + path);
        }
        // Actual file opening logic would go here
        throw new FileNotFoundException("Config file not found: " + path);
    }
}

This example shows how to throw FileNotFoundException with custom messages. The
openConfigFile method validates the file format before attempting
to open it. Custom messages help identify the exact nature of the file access
problem.

## Handling FileNotFoundException in File Copy

File operations often involve multiple steps where FileNotFoundException can
occur. This example demonstrates proper exception handling in a file copy
operation.

Main.java
  

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        String source = "source.txt";
        String destination = "destination.txt";
        
        try {
            copyFile(source, destination);
            System.out.println("File copied successfully");
        } catch (FileNotFoundException e) {
            System.out.println("File error: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
    
    public static void copyFile(String src, String dest) 
            throws FileNotFoundException, IOException {
        try (FileInputStream fis = new FileInputStream(src);
             FileOutputStream fos = new FileOutputStream(dest)) {
            
            byte[] buffer = new byte[1024];
            int length;
            
            while ((length = fis.read(buffer)) &gt; 0) {
                fos.write(buffer, 0, length);
            }
        }
    }
}

This file copy operation can throw FileNotFoundException if either the source
doesn't exist or destination can't be created. The try-with-resources statement
ensures proper stream closure. Different exception types are handled separately
to provide appropriate error messages.

## FileNotFoundException in Directory Operations

Attempting to open a directory as if it were a file also throws
FileNotFoundException. This example demonstrates this case and shows how to
distinguish between files and directories.

Main.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Main {

    public static void main(String[] args) {
        String path = "/tmp"; // A directory path
        
        try {
            File file = new File(path);
            
            if (file.isDirectory()) {
                System.out.println(path + " is a directory, not a file");
                return;
            }
            
            FileInputStream fis = new FileInputStream(file);
            fis.close();
        } catch (FileNotFoundException e) {
            System.out.println("File access error: " + e.getMessage());
        }
    }
}

This code first checks if the path refers to a directory using
isDirectory. Without this check, attempting to open the directory
would throw FileNotFoundException. Always verify the nature of a path before
performing file operations.

## Source

[Java FileNotFoundException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FileNotFoundException.html)

In this article, we've explored various scenarios where FileNotFoundException
occurs in Java. Proper handling of this exception is crucial for building robust
file handling code. Always consider file existence, permissions, and type when
working with files.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).