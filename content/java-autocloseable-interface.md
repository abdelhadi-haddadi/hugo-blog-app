+++
title = "Java AutoCloseable Interface"
date = 2025-08-29T19:59:44.753+01:00
draft = false
description = "Complete Java AutoCloseable interface tutorial covering all methods with examples. Learn about resource management and try-with-resources statement."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java AutoCloseable Interface

Last modified: April 13, 2025

 

The java.lang.AutoCloseable interface was introduced in Java 7 as
part of the try-with-resources statement. It represents a resource that must be
closed when it is no longer needed. This helps prevent resource leaks and makes
resource management more reliable.

The AutoCloseable interface contains a single method
close that is automatically called when used in a
try-with-resources block. This interface is the foundation for proper resource
management in modern Java applications.

## AutoCloseable Interface Definition

The AutoCloseable interface is simple, containing just one method. Any class that
implements this interface can be used with try-with-resources. The close method
may throw an exception if the resource cannot be closed properly.

public interface AutoCloseable {
    void close() throws Exception;

The interface is intentionally simple to allow wide adoption. The close method
is called automatically when the try block exits, either normally or via an
exception. This ensures resources are properly released.

## Basic AutoCloseable Implementation

This example shows a simple implementation of AutoCloseable. We create a custom
resource that prints messages when opened and closed. The try-with-resources
statement ensures close is called automatically.

Main.java
  

class SimpleResource implements AutoCloseable {
    private String name;
    
    public SimpleResource(String name) {
        this.name = name;
        System.out.println("Resource '" + name + "' opened");
    }
    
    public void use() {
        System.out.println("Using resource '" + name + "'");
    }
    
    @Override
    public void close() throws Exception {
        System.out.println("Resource '" + name + "' closed");
    }
}

void main() {
    try (SimpleResource resource = new SimpleResource("Test")) {
        resource.use();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

When run, this program outputs messages showing the resource lifecycle. The
close method is called automatically after the try block, even if an exception
occurs. This demonstrates the basic pattern for implementing AutoCloseable.

## Multiple Resources in try-with-resources

Try-with-resources can manage multiple AutoCloseable resources. Resources are
closed in reverse order of declaration. This example shows two resources being
managed together in a single try block.

Main.java
  

class ResourceA implements AutoCloseable {
    public ResourceA() { System.out.println("ResourceA opened"); }
    public void useA() { System.out.println("Using ResourceA"); }
    @Override
    public void close() { System.out.println("ResourceA closed"); }
}

class ResourceB implements AutoCloseable {
    public ResourceB() { System.out.println("ResourceB opened"); }
    public void useB() { System.out.println("Using ResourceB"); }
    @Override
    public void close() { System.out.println("ResourceB closed"); }
}

void main() {
    try (ResourceA a = new ResourceA();
            ResourceB b = new ResourceB()) {
        a.useA();
        b.useB();
    }
}

The output shows ResourceB is closed before ResourceA, demonstrating the reverse
order closing behavior. This ordering is important when resources depend on each
other. The try-with-resources handles all the cleanup automatically.

## AutoCloseable with Exception Handling

AutoCloseable resources can throw exceptions during both use and closing. This
example demonstrates how to handle such cases. The try-with-resources properly
manages exception suppression.

Main.java
  

class ProblematicResource implements AutoCloseable {
    private String name;
    private boolean failOnUse;
    private boolean failOnClose;
    
    public ProblematicResource(String name, boolean failOnUse, boolean failOnClose) {
        this.name = name;
        this.failOnUse = failOnUse;
        this.failOnClose = failOnClose;
    }
    
    public void use() throws Exception {
        if (failOnUse) {
            throw new Exception("Error using " + name);
        }
        System.out.println("Using " + name);
    }
    
    @Override
    public void close() throws Exception {
        if (failOnClose) {
            throw new Exception("Error closing " + name);
        }
        System.out.println("Closed " + name);
    }
}

void main() {
    try (ProblematicResource r1 = new ProblematicResource("R1", false, false);
            ProblematicResource r2 = new ProblematicResource("R2", true, true)) {
        r1.use();
        r2.use();
    } catch (Exception e) {
        System.out.println("Caught exception: " + e.getMessage());
        for (Throwable t : e.getSuppressed()) {
            System.out.println("Suppressed: " + t.getMessage());
        }
    }
}

This example shows how exceptions during resource use and closing are handled.
The primary exception is the one thrown in the try block, while close exceptions
are added as suppressed exceptions. This preserves all error information.

## AutoCloseable with File I/O

A common use case for AutoCloseable is file operations. This example shows a
custom file reader that implements AutoCloseable. It properly closes file
resources even if exceptions occur.

Main.java
  

class CustomFileReader implements AutoCloseable {
    private BufferedReader reader;
    
    public CustomFileReader(String filePath) throws FileNotFoundException {
        this.reader = new BufferedReader(new FileReader(filePath));
    }
    
    public String readLine() throws IOException {
        return reader.readLine();
    }
    
    @Override
    public void close() throws IOException {
        System.out.println("Closing file reader");
        if (reader != null) {
            reader.close();
        }
    }
}

void main() {
    try (CustomFileReader fr = new CustomFileReader("test.txt")) {
        String line;
        while ((line = fr.readLine()) != null) {
            System.out.println(line);
        }
    } catch (IOException e) {
        System.err.println("Error processing file: " + e.getMessage());
    }
}

This custom file reader wraps standard Java I/O classes while implementing
AutoCloseable. The close method ensures the underlying BufferedReader is
properly closed. The try-with-resources block guarantees this happens.

## AutoCloseable in Database Connections

Database connections are another critical resource that must be properly closed.
This example demonstrates a simplified database connection wrapper that
implements AutoCloseable. It ensures connections are always released.

Main.java
  

import java.sql.*;

class DatabaseConnection implements AutoCloseable {
    private Connection connection;
    
    public DatabaseConnection(String url, String user, String password) 
            throws SQLException {
        this.connection = DriverManager.getConnection(url, user, password);
        System.out.println("Database connection established");
    }
    
    public void executeQuery(String sql) throws SQLException {
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                System.out.println(rs.getString(1));
            }
        }
    }
    
    @Override
    public void close() throws SQLException {
        if (connection != null &amp;&amp; !connection.isClosed()) {
            connection.close();
            System.out.println("Database connection closed");
        }
    }
}

void main() {
    String url = "jdbc:mysql://localhost:3306/test";
    String user = "root";
    String password = "password";
    
    try (DatabaseConnection db = new DatabaseConnection(url, user, password)) {
        db.executeQuery("SELECT * FROM users");
    } catch (SQLException e) {
        System.err.println("Database error: " + e.getMessage());
    }
}

This example shows proper database resource management. Both the outer
DatabaseConnection and inner Statement/ResultSet are AutoCloseable. The
try-with-resources ensures all resources are properly closed in the correct
order.

## Custom Resource with Close Suppression

Sometimes we want to prevent a resource from being closed. This example shows
how to implement a non-closable wrapper around an AutoCloseable resource. It
demonstrates advanced resource management techniques.

Main.java
  

class SimpleResource implements AutoCloseable {
    private String name;
    
    public SimpleResource(String name) {
        this.name = name;
        System.out.println("Resource '" + name + "' opened");
    }
    
    public void use() {
        System.out.println("Using resource '" + name + "'");
    }
    
    @Override
    public void close() throws Exception {
        System.out.println("Resource '" + name + "' closed");
    }
}

class NonClosableResource&lt;T extends AutoCloseable&gt; implements AutoCloseable {
    private final T resource;
    private final boolean suppressClose;
    
    public NonClosableResource(T resource, boolean suppressClose) {
        this.resource = resource;
        this.suppressClose = suppressClose;
    }
    
    public T getResource() {
        return resource;
    }
    
    @Override
    public void close() throws Exception {
        if (!suppressClose &amp;&amp; resource != null) {
            resource.close();
        }
    }
}

void main() {
    try (NonClosableResource&lt;SimpleResource&gt; wrapper = 
            new NonClosableResource&lt;&gt;(new SimpleResource("Protected"), true)) {
        wrapper.getResource().use();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

This generic wrapper can protect any AutoCloseable resource from
being closed. The close suppression flag determines whether the underlying
resource's close method is called. This pattern is useful for shared resources.

## AutoCloseable with Lambda Expressions

A lambda expressions can work with AutoCloseable for more concise
resource management. This example shows a functional approach to using
AutoCloseable resources.

Main.java
  

class SimpleResource implements AutoCloseable {
    private String name;

    public SimpleResource(String name) {
        this.name = name;
        System.out.println("Resource '" + name + "' opened");
    }

    public void use() {
        System.out.println("Using resource '" + name + "'");
    }

    @Override
    public void close() throws Exception {
        System.out.println("Resource '" + name + "' closed");
    }
}

class ResourceUser {
    void withResource(Consumer&lt;SimpleResource&gt; consumer)
            throws Exception {
        try (SimpleResource resource = new SimpleResource("Lambda")) {
            consumer.accept(resource);
        }
    }
}

void main() {
    try {
        ResourceUser resourceUser = new ResourceUser();
        resourceUser.withResource(resource -&gt; {
            System.out.println("Inside lambda");
            resource.use();
        });
    } catch (Exception e) {
        e.printStackTrace();
    }
}

This example demonstrates a functional wrapper for AutoCloseable
resources. The  withResource method handles creation and cleanup,
while the lambda expression focuses on resource usage. This pattern reduces
boilerplate code.

## Source

[Java AutoCloseable Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html)

In this tutorial, we've explored the AutoCloseable interface and
its use with try-with-resources. Proper resource management is crucial for
reliable Java applications. AutoCloseable provides a clean,
exception-safe way to handle resources.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).