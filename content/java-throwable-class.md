+++
title = "Java Throwable Class"
date = 2025-08-29T19:59:58.411+01:00
draft = false
description = "Complete Java Throwable class tutorial covering all methods with examples. Learn about exceptions, errors, and proper error handling in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Throwable Class

Last modified: April 13, 2025

 

The java.lang.Throwable class is the superclass of all errors and
exceptions in Java. It forms the foundation of Java's exception handling
mechanism. Understanding Throwable is essential for proper error handling.

Throwable contains a snapshot of the execution stack when it was created. It
provides methods to access this stack trace and to get the cause of the error.
All exceptions and errors extend from Throwable, making it the root of Java's
error hierarchy.

## Throwable Class Methods

The Throwable class provides several methods for error handling and debugging.
Key methods include getMessage, getCause,
printStackTrace, and getStackTrace. These help
diagnose and handle errors effectively.

public class Throwable implements Serializable {
    public Throwable() {...}
    public Throwable(String message) {...}
    public Throwable(String message, Throwable cause) {...}
    public Throwable(Throwable cause) {...}
    public String getMessage() {...}
    public String getLocalizedMessage() {...}
    public Throwable getCause() {...}
    public void printStackTrace() {...}
    public StackTraceElement[] getStackTrace() {...}
    public void setStackTrace(StackTraceElement[] stackTrace) {...}
    public final void addSuppressed(Throwable exception) {...}
    public final Throwable[] getSuppressed() {...}
}

The code above shows the main methods provided by the Throwable class. These
methods allow inspection of error details, causes, and the execution stack trace
when the error occurred.

## Basic Exception Handling

This example demonstrates basic exception handling using try-catch blocks. We
catch an ArithmeticException that occurs during division by zero. The catch
block prints the exception message and stack trace.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public static int divide(int a, int b) {
        return a / b;
    }
}

When executed, this code catches the ArithmeticException thrown by division by
zero. The catch block prints the error message and full stack trace, showing
where the exception occurred. This helps in debugging the issue.

## Custom Exception Class

This example shows how to create a custom exception by extending Exception. We
define an InsufficientFundsException that includes the current balance and
amount requested. This provides more context about the error.

Main.java
  

package com.zetcode;

class InsufficientFundsException extends Exception {
    private double balance;
    private double amount;
    
    public InsufficientFundsException(double balance, double amount) {
        super("Insufficient funds: balance=" + balance + ", amount=" + amount);
        this.balance = balance;
        this.amount = amount;
    }
    
    public double getBalance() { return balance; }
    public double getAmount() { return amount; }
}

class Account {
    private double balance;
    
    public Account(double balance) { this.balance = balance; }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount &gt; balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
    }
}

public class Main {

    public static void main(String[] args) {
        Account account = new Account(100);
        try {
            account.withdraw(150);
        } catch (InsufficientFundsException e) {
            System.err.println(e.getMessage());
            System.err.println("Short by: " + (e.getAmount() - e.getBalance()));
        }
    }
}

The custom exception provides detailed information about the error condition. When
caught, we can access both the standard message and additional fields. This makes
error handling more informative and precise.

## Chained Exceptions

Java allows chaining exceptions to preserve the original cause when wrapping
exceptions. This example demonstrates how to create and handle chained
exceptions using the Throwable constructor that accepts a cause.

Main.java
  

package com.zetcode;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        try {
            processFile("nonexistent.txt");
        } catch (ApplicationException e) {
            System.err.println("Caught: " + e.getMessage());
            System.err.println("Original cause: " + e.getCause().getMessage());
            e.getCause().printStackTrace();
        }
    }
    
    public static void processFile(String filename) throws ApplicationException {
        try {
            // Simulate file operation that fails
            throw new IOException("File not found: " + filename);
        } catch (IOException e) {
            throw new ApplicationException("Failed to process file", e);
        }
    }
}

class ApplicationException extends Exception {
    public ApplicationException(String message, Throwable cause) {
        super(message, cause);
    }
}

This example shows a common pattern where a low-level IOException is wrapped in a
higher-level ApplicationException. The original cause is preserved and can be
accessed later. This maintains the complete error context while providing
application-specific semantics.

## Printing Stack Traces

The Throwable class provides several ways to print stack traces. This example
demonstrates different methods to access and print stack trace information,
including the standard printStackTrace and getStackTrace methods.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            method1();
        } catch (Exception e) {
            // Standard stack trace to stderr
            e.printStackTrace();
            
            // Print stack trace to System.out
            e.printStackTrace(System.out);
            
            // Access stack trace elements programmatically
            System.out.println("\nStack trace elements:");
            for (StackTraceElement element : e.getStackTrace()) {
                System.out.println(element);
            }
        }
    }
    
    public static void method1() {
        method2();
    }
    
    public static void method2() {
        method3();
    }
    
    public static void method3() {
        throw new RuntimeException("Test exception");
    }
}

This code demonstrates three ways to access stack trace information. The standard
printStackTrace outputs to stderr, while the overloaded version can redirect
output. The getStackTrace method allows programmatic access to each stack frame.

## Suppressed Exceptions

Java 7 introduced suppressed exceptions to handle cases where multiple exceptions
occur, such as in try-with-resources blocks. This example shows how to access
suppressed exceptions using getSuppressed.

Main.java
  

package com.zetcode;

class Resource implements AutoCloseable {
    private String name;
    
    public Resource(String name) { this.name = name; }
    
    public void use() throws Exception {
        throw new Exception("Error using resource " + name);
    }
    
    @Override
    public void close() throws Exception {
        throw new Exception("Error closing resource " + name);
    }
}

public class Main {

    public static void main(String[] args) {
        try (Resource res1 = new Resource("1");
             Resource res2 = new Resource("2")) {
            res1.use();
            res2.use();
        } catch (Exception e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Suppressed exceptions:");
            for (Throwable t : e.getSuppressed()) {
                System.out.println(" - " + t.getMessage());
            }
        }
    }
}

In this try-with-resources example, both the use() and close() methods throw
exceptions. The primary exception is the one from use(), while close()
exceptions are added as suppressed exceptions. This preserves all error
information in a single exception object.

## Error vs Exception

This example demonstrates the difference between Errors and Exceptions, both of
which extend Throwable. Errors typically indicate serious problems that
applications shouldn't try to catch, while Exceptions represent conditions that
might be handled.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Handling a checked exception
        try {
            throw new Exception("This is a regular exception");
        } catch (Exception e) {
            System.out.println("Caught Exception: " + e.getMessage());
        }
        
        // Attempting to handle an Error (not recommended)
        try {
            throw new OutOfMemoryError("This is an error");
        } catch (Error e) {
            System.out.println("Caught Error: " + e.getMessage());
        }
        
        // Uncaught Error will terminate the program
        throw new StackOverflowError("This will terminate the program");
    }
}

The example shows that while both Errors and Exceptions can be caught, Errors
typically indicate unrecoverable conditions. The program attempts to handle an
OutOfMemoryError (not recommended in practice) and finally throws an
uncaught StackOverflowError that terminates execution.

## Source

[Java Throwable Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Throwable.html)

This tutorial covered the Throwable class, the foundation of Java's error
handling. We explored exception handling, custom exceptions, chaining,
stack traces, suppressed exceptions, and the Error/Exception distinction.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).