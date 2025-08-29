+++
title = "Java AutoCloseable"
date = 2025-08-29T19:58:05.533+01:00
draft = false
description = "Java AutoCloseable tutorial explains how to properly manage resources using the AutoCloseable interface and try-with-resources statement in Java applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java AutoCloseable

last modified April 2, 2025

 

The AutoCloseable interface is a fundamental part of Java's resource management
system, introduced in Java 7. It enables automatic resource management through
the try-with-resources statement, ensuring proper cleanup of resources.

In this tutorial, we'll explore how to use AutoCloseable to manage resources
like files, database connections, and network sockets safely and efficiently.
We'll cover both built-in implementations and custom resource classes.

## Understanding AutoCloseable

AutoCloseable is an interface with a single method:

AutoCloseable.java
  

public interface AutoCloseable {

    void close() throws Exception;
}

Any class that implements AutoCloseable can be used with try-with-resources.
The close() method is automatically called when the try block exits, either
normally or exceptionally.

## Try-With-Resources Basics

The try-with-resources statement automatically closes resources that implement
AutoCloseable. Here's the basic syntax:

TryWithResources.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

void readFile(String path) throws IOException {

    try (BufferedReader br = new BufferedReader(new FileReader(path))) {

        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}

The BufferedReader is automatically closed when the try block
completes, even if an exception occurs. This eliminates the need for manual
finally blocks.

## Multiple Resources

You can declare multiple resources in a single try-with-resources statement:

MultipleResources.java
  

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipInputStream;

void copyZipFile(File source, File target) throws IOException {

    try (InputStream in = new FileInputStream(source);
         OutputStream out = new FileOutputStream(target);
         ZipInputStream zipIn = new ZipInputStream(in)) {
        
        byte[] buffer = new byte[1024];
        int length;
        while ((length = zipIn.read(buffer)) &gt; 0) {
            out.write(buffer, 0, length);
        }
    }
}

Resources are closed in reverse order of their declaration. If any resource
fails to close, the others will still attempt to close.

## Creating Custom AutoCloseable Resources

You can create your own AutoCloseable implementations for custom resources:

CustomResource.java
  

class DatabaseConnection implements AutoCloseable {

    private boolean isOpen = true;
    
    public void executeQuery(String query) {
        if (!isOpen) {
            throw new IllegalStateException("Connection closed");
        }
        System.out.println("Executing: " + query);
    }
    
    @Override
    public void close() {
        if (isOpen) {
            System.out.println("Closing database connection");
            isOpen = false;
        }
    }
}

void useDatabase() {
    try (DatabaseConnection conn = new DatabaseConnection()) {
        conn.executeQuery("SELECT * FROM users");
    }
}

This custom DatabaseConnection demonstrates proper resource cleanup pattern.
The close method is idempotent (safe to call multiple times).

## Suppressed Exceptions

When exceptions occur both in the try block and during resource closure,
the closure exceptions are "suppressed" and attached to the primary exception:

SuppressedExceptions.java
  

class FailingResource implements AutoCloseable {

    @Override
    public void close() throws Exception {
        throw new Exception("Error during close");
    }
    
    public void use() throws Exception {
        throw new Exception("Error during use");
    }
}

void demonstrateSuppressed() {

    try (FailingResource res = new FailingResource()) {
    
        res.use();
    } catch (Exception e) {
    
        System.out.println("Caught: " + e.getMessage());

        for (Throwable t : e.getSuppressed()) {
            System.out.println("Suppressed: " + t.getMessage());
        }
    }
}

This example shows how to access suppressed exceptions that occurred during
resource cleanup.

## AutoCloseable vs Closeable

Closeable is a similar interface that predates AutoCloseable. Key differences:

CloseableComparison.java
  

interface Closeable extends AutoCloseable {
    void close() throws IOException; // More specific exception
}

- Closeable throws IOException, AutoCloseable throws Exception

- Closeable is intended for I/O streams

- Closeable requires idempotent close() operations

- AutoCloseable is more general-purpose

## Best Practices

When working with AutoCloseable:

- Always use try-with-resources for AutoCloseable objects

- Make close methods idempotent (safe to call multiple times)

- Release resources in reverse acquisition order

- Handle suppressed exceptions appropriately

- Prefer AutoCloseable for new resource types

- Document resource ownership and cleanup requirements

## Source

[Java AutoCloseable Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html)

This tutorial covered the essential aspects of Java's AutoCloseable interface
and try-with-resources statement for proper resource management in Java
applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).