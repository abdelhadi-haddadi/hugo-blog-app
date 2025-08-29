+++
title = "Java Exception Class"
date = 2025-08-29T19:59:49.245+01:00
draft = false
description = "Complete Java Exception class tutorial covering exception handling with examples. Learn about try-catch, throws, custom exceptions and exception hierarchy."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Exception Class

Last modified: April 13, 2025

 

The java.lang.Exception class is the superclass of all exceptions
in Java. Exceptions are runtime events that disrupt the normal flow of execution
and signal issues that require handling for robust application behavior. Proper
exception management ensures error recovery, enhances stability, and improves
debugging.

Java exceptions fall into two main categories: checked
exceptions (compile-time) and **unchecked exceptions**
(runtime). Checked exceptions must be explicitly handled, either by catching
them or declaring them in method signatures, whereas unchecked exceptions occur
due to programming errors and can propagate without mandatory handling.
Understanding exception types and handling mechanisms is crucial for writing
reliable, maintainable code.

## Exception Class Hierarchy

The Exception class sits directly below Throwable in
Java's exception hierarchy. It has two key subclasses:
RuntimeException (representing unchecked exceptions) and
IOException (a common checked exception type). This distinction
determines how exceptions are managed within code.

java.lang.Throwable
├── java.lang.Error
└── java.lang.Exception
    ├── java.lang.RuntimeException
    │   ├── java.lang.NullPointerException
    │   ├── java.lang.IllegalArgumentException
    │   ├── java.lang.IndexOutOfBoundsException
    │   └── ...
    ├── java.lang.IOException
    │   ├── java.lang.FileNotFoundException
    │   ├── java.lang.UnsupportedEncodingException
    │   └── ...
    ├── java.lang.ReflectiveOperationException
    ├── java.lang.InterruptedException
    └── Other checked exceptions

## Key Differences: Checked vs. Unchecked Exceptions

    **Checked Exceptions:** These must be handled using
    try-catch or declared with throws. Examples:
    IOException, SQLException,
    InterruptedException.
    **Unchecked Exceptions:** These extend
    RuntimeException and typically result from programming logic
    errors, such as NullPointerException and
    IllegalArgumentException. Handling them is optional but
    recommended.
    **Errors:** Unlike exceptions, errors signify serious
    issues (e.g., OutOfMemoryError) and are usually
    unrecoverable.

The distinction between checked and unchecked exceptions helps developers
anticipate failure points, improve program flow, and ensure proper handling of
unexpected conditions.

## Basic Exception Handling

Java provides try-catch blocks to handle exceptions. The
try block contains code that might throw an exception, while the
catch block defines how to handle the exception when it occurs.
This prevents abrupt program termination.

In practice, many exceptions—such as division by zero—are prevented using
conditional checks before performing an operation rather than relying on
catching them afterward. A proactive approach improves program stability and
avoids unnecessary exception handling.

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

This example demonstrates basic exception handling. The divide
method throws an ArithmeticException when dividing by zero.
However, in real-world applications, checking for zero before performing
division would be the preferred approach to prevent the exception from
occurring.

## Checked vs Unchecked Exceptions

Checked exceptions must be declared or handled, while unchecked exceptions
don't. Checked exceptions extend Exception but not
RuntimeException. Unchecked exceptions extend RuntimeException or
Error.

Main.java
  

package com.zetcode;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        // Unchecked exception (no need to declare)
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {
            System.out.println("NullPointerException caught");
        }
        
        // Checked exception (must be handled)
        try {
            readFile("nonexistent.txt");
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
    
    public static void readFile(String path) throws FileNotFoundException {
        File file = new File(path);
        Scanner scanner = new Scanner(file);
        while (scanner.hasNextLine()) {
            System.out.println(scanner.nextLine());
        }
        scanner.close();
    }
}

This example contrasts checked and unchecked exceptions. The NullPointerException
is unchecked and doesn't require declaration. The
FileNotFoundException is checked and must be either caught or
declared in the method signature using throws.

## Creating Custom Exceptions

Custom exceptions can be created by extending Exception or RuntimeException. They
should provide constructors matching superclass constructors. Custom exceptions
are useful for application-specific error conditions.

Main.java
  

package com.zetcode;

class InsufficientFundsException extends Exception {
    private double amount;
    
    public InsufficientFundsException(double amount) {
        super("Insufficient funds: " + amount);
        this.amount = amount;
    }
    
    public double getAmount() {
        return amount;
    }
}

class BankAccount {
    private double balance;
    
    public BankAccount(double balance) {
        this.balance = balance;
    }
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount &gt; balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}

public class Main {

    public static void main(String[] args) {
        BankAccount account = new BankAccount(500);
        
        try {
            account.withdraw(600);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
            System.out.println("Missing amount: " + e.getAmount());
        }
    }
}

This example shows a custom InsufficientFundsException. The exception includes
additional information about the missing amount. The BankAccount class throws
this exception when withdrawal exceeds balance. The main method catches and
handles the custom exception.

## Multiple Catch Blocks

Multiple catch blocks can handle different exception types. More specific
exceptions should come before more general ones. Java 7 introduced multi-catch
for handling multiple exceptions in one block.

Main.java
  

package com.zetcode;

import java.util.InputMismatchException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter numerator: ");
            int numerator = scanner.nextInt();
            
            System.out.print("Enter denominator: ");
            int denominator = scanner.nextInt();
            
            int result = numerator / denominator;
            System.out.println("Result: " + result);
            
        } catch (InputMismatchException e) {
            System.out.println("Invalid input - must be integer");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        } catch (Exception e) {
            System.out.println("An unexpected error occurred");
        } finally {
            scanner.close();
            System.out.println("Scanner closed in finally block");
        }
    }
}

This example demonstrates multiple catch blocks.
InputMismatchException handles non-integer input.
ArithmeticException handles division by zero. The more general
Exception catches any other errors. The finally block ensures the
scanner is always closed, regardless of exceptions.

## Try-With-Resources

Try-with-resources automatically closes resources that implement
AutoCloseable. This eliminates the need for explicit finally blocks
for resource cleanup. It was introduced in Java 7 to simplify resource
management.

Main.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {

        String path = "example.txt";
        
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}

This example uses try-with-resources to read a file. The BufferedReader is
declared in the try statement and automatically closed when the block exits.
This approach is cleaner than manual resource management with finally blocks.
The IOException is caught if file reading fails.

## Exception Propagation

Exceptions propagate up the call stack until caught. Methods can declare
exceptions they throw but don't handle. This allows centralized exception
handling at appropriate levels in the application.

Main.java
  

package com.zetcode;

class DataProcessor {
    public void processData(String data) throws IllegalArgumentException {
        if (data == null || data.isEmpty()) {
            throw new IllegalArgumentException("Invalid data");
        }
        System.out.println("Processing: " + data);
    }
}

class DataService {
    private DataProcessor processor = new DataProcessor();
    
    public void handleData(String data) {
        try {
            processor.processData(data);
        } catch (IllegalArgumentException e) {
            System.out.println("Service error: " + e.getMessage());
            // Could log error or perform recovery here
        }
    }
}

public class Main {

    public static void main(String[] args) {
        DataService service = new DataService();
        
        service.handleData("Valid data");
        service.handleData(""); // Will trigger exception
    }
}

This example shows exception propagation. The DataProcessor throws an
IllegalArgumentException for invalid data. The DataService catches
and handles this exception. The main method doesn't need to handle the exception
because it's handled at the service level. This demonstrates layered exception
handling.

## Source

[Java Exception Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Exception.html)

In this article, we've covered the Java Exception class and exception handling
with practical examples. Proper exception handling is essential for building
robust and maintainable Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).