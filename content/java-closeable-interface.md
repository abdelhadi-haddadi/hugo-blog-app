+++
title = "Java Closeable Interface"
date = 2025-08-29T19:59:10.737+01:00
draft = false
description = "Complete Java Closeable interface tutorial covering all methods with examples. Learn about resource management in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Closeable Interface

Last modified: April 16, 2025

 

The java.io.Closeable interface represents an object that holds
resources needing explicit release. It defines a single close
method to free these resources. Classes implementing this interface typically
represent I/O streams, channels, or other resource-heavy objects.

Closeable was introduced in Java 5 and is part of the
java.io package. It extends AutoCloseable since Java 7,
enabling use with try-with-resources statements. Proper resource management is
crucial for preventing resource leaks in Java applications.

## Closeable Interface Overview

The Closeable interface is simple but fundamental for resource
management. Its primary purpose is to ensure proper cleanup of resources like
file handles, network connections, or memory buffers. The interface declares
just one method that must be implemented.

public interface Closeable extends AutoCloseable {
    void close() throws IOException;
}

The code above shows the complete Closeable interface definition.
The close method may throw an IOException if the
resource cannot be properly released. Implementations should be idempotent,
allowing multiple calls without side effects.

## Basic Closeable Implementation

This example demonstrates a simple custom implementation of the
Closeable interface. The class manages a fictional resource that
needs proper cleanup. The implementation shows the basic pattern for resource
management.

Main.java
  

import java.io.Closeable;
import java.io.IOException;

public class ResourceHolder implements Closeable {
    private boolean closed = false;
    
    public ResourceHolder() {
        System.out.println("Resource acquired");
    }
    
    public void doWork() {
        if (closed) {
            throw new IllegalStateException("Resource is closed");
        }
        System.out.println("Performing work with resource");
    }
    
    @Override
    public void close() throws IOException {
        if (!closed) {
            System.out.println("Releasing resource");
            closed = true;
        }
    }
    
    public static void main(String[] args) {
        try (ResourceHolder holder = new ResourceHolder()) {
            holder.doWork();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows a basic Closeable implementation. The
ResourceHolder class tracks its closed state and prevents use after
closure. The try-with-resources statement ensures close is called
automatically, even if an exception occurs during work.

## File Handling with Closeable

File streams are common Closeable implementations in Java. This
example demonstrates proper file handling using FileInputStream,
which implements Closeable. Proper resource cleanup is essential
for file operations.

Main.java
  

import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        FileInputStream fis = null;
        try {
            fis = new FileInputStream("example.txt");
            int content;
            while ((content = fis.read()) != -1) {
                System.out.print((char) content);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

This example shows traditional file handling with explicit close
in a finally block. The FileInputStream implements
Closeable, requiring proper cleanup. The nested try-catch ensures
the close operation itself doesn't cause resource leaks.

## Try-With-Resources Example

Java 7 introduced try-with-resources, simplifying Closeable resource
management. This example demonstrates the modern approach to handling
Closeable resources. The syntax automatically calls
close when the block exits.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("example.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example uses try-with-resources with a BufferedReader, which
implements Closeable. The resource is declared in parentheses after
try and is automatically closed. This approach is cleaner and less
error-prone than manual finally blocks.

## Multiple Closeable Resources

Try-with-resources can manage multiple Closeable resources
simultaneously. Resources are closed in reverse order of declaration. This
example demonstrates proper handling of multiple resources in a single block.

Main.java
  

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("source.txt");
             FileOutputStream fos = new FileOutputStream("destination.txt")) {
            
            byte[] buffer = new byte[1024];
            int length;
            while ((length = fis.read(buffer)) &gt; 0) {
                fos.write(buffer, 0, length);
            }
            System.out.println("File copied successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example copies a file using both FileInputStream and
FileOutputStream, both Closeable implementations.
Resources are separated by semicolons in the try-with-resources declaration.
They will be closed automatically in reverse order (fos first, then fis).

## Custom Closeable with Exception Handling

This example demonstrates a more complex Closeable implementation
with proper exception handling. The class manages a database connection that
needs proper cleanup. Exception handling is crucial for resource management.

Main.java
  

import java.io.Closeable;
import java.io.IOException;

public class DatabaseConnection implements Closeable {
    private boolean connected = false;
    
    public DatabaseConnection(String url) throws IOException {
        connect(url);
    }
    
    private void connect(String url) throws IOException {
        // Simulate connection
        if (url == null || url.isEmpty()) {
            throw new IOException("Invalid connection URL");
        }
        connected = true;
        System.out.println("Connected to database: " + url);
    }
    
    public void query(String sql) throws IOException {
        if (!connected) {
            throw new IOException("Not connected to database");
        }
        System.out.println("Executing query: " + sql);
    }
    
    @Override
    public void close() throws IOException {
        if (connected) {
            System.out.println("Closing database connection");
            connected = false;
        }
    }
    
    public static void main(String[] args) {
        try (DatabaseConnection db = new DatabaseConnection("jdbc:example:db")) {
            db.query("SELECT * FROM users");
        } catch (IOException e) {
            System.err.println("Database error: " + e.getMessage());
        }
    }
}

This example shows a DatabaseConnection class implementing
Closeable. The constructor and methods throw IOException
as required by the interface. The try-with-resources ensures the connection is
closed properly, even if an exception occurs during query execution.

## Closeable vs AutoCloseable

This example highlights the differences between Closeable and
AutoCloseable. While similar, they have distinct purposes and
exception specifications. Understanding these differences is important for proper
interface implementation.

Main.java
  

import java.io.Closeable;
import java.io.IOException;
import java.lang.AutoCloseable;

public class Main {
    static class CloseableResource implements Closeable {
        @Override
        public void close() throws IOException {
            System.out.println("CloseableResource.close()");
            throw new IOException("Closeable exception");
        }
    }
    
    static class AutoCloseableResource implements AutoCloseable {
        @Override
        public void close() throws Exception {
            System.out.println("AutoCloseableResource.close()");
            throw new Exception("AutoCloseable exception");
        }
    }
    
    public static void main(String[] args) {
        try (CloseableResource cr = new CloseableResource();
             AutoCloseableResource acr = new AutoCloseableResource()) {
            System.out.println("Using resources");
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
            for (Throwable t : e.getSuppressed()) {
                System.out.println("Suppressed: " + t.getMessage());
            }
        }
    }
}

This example demonstrates the key differences between the interfaces.
Closeable.close throws only IOException, while
AutoCloseable.close can throw any Exception. When
used together in try-with-resources, exceptions are properly handled and
suppressed exceptions are available.

## Source

[Java Closeable Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/Closeable.html)

In this article, we've covered the essential aspects of the Java
Closeable interface. Understanding resource management is crucial
for writing robust Java applications that properly handle system resources.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).