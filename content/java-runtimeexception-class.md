+++
title = "Java RuntimeException Class"
date = 2025-08-29T19:59:53.803+01:00
draft = false
description = "Complete Java RuntimeException class tutorial covering usage with examples. Learn about unchecked exceptions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java RuntimeException Class

Last modified: April 13, 2025

 

The java.lang.RuntimeException class is the superclass of all
unchecked exceptions in Java. Unlike checked exceptions, RuntimeExceptions
don't need to be declared in method signatures or caught explicitly.

RuntimeExceptions typically indicate programming errors that should be fixed
rather than caught. Common examples include NullPointerException,
ArrayIndexOutOfBoundsException, and IllegalArgumentException.
Understanding RuntimeExceptions is crucial for robust Java programming.

## RuntimeException Basics

RuntimeException is a subclass of Exception but differs in that it's unchecked.
This means the compiler doesn't enforce handling or declaration of these
exceptions. They often represent problems that could have been prevented.

public class RuntimeException extends Exception {
    public RuntimeException() {...}
    public RuntimeException(String message) {...}
    public RuntimeException(String message, Throwable cause) {...}
    public RuntimeException(Throwable cause) {...}
    protected RuntimeException(String message, Throwable cause,
        boolean enableSuppression, boolean writableStackTrace) {...}
}

The code above shows the constructors available in RuntimeException. These allow
creating exceptions with messages, causes, and control over stack trace behavior.

## Basic RuntimeException Example

This example demonstrates creating and throwing a basic RuntimeException. We
throw it when invalid input is detected in a simple validation method.

Main.java
  

package com.zetcode;

public class Main {
    public static void validateAge(int age) {
        if (age &lt; 0) {
            throw new RuntimeException("Age cannot be negative");
        }
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5); // This will throw RuntimeException
        } catch (RuntimeException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
        
        validateAge(25); // This will pass validation
    }
}

In this example, we throw a RuntimeException when a negative age is provided.
While we catch it in main, note that catching RuntimeException is optional.
The second call shows successful validation with a positive age.

## Custom RuntimeException

Creating custom RuntimeExceptions allows for more specific error handling. This
example shows a custom exception for invalid account operations.

Main.java
  

package com.zetcode;

class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) {
        if (amount &gt; balance) {
            throw new InsufficientFundsException(
                "Only " + balance + " available. Tried to withdraw " + amount);
        }
        balance -= amount;
    }
}

public class Main {

    public static void main(String[] args) {
        BankAccount account = new BankAccount(100);
        
        try {
            account.withdraw(150);
        } catch (InsufficientFundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

Here we define InsufficientFundsException extending RuntimeException. The
BankAccount throws it when withdrawal exceeds balance. This provides clear,
domain-specific error information while remaining unchecked.

## RuntimeException with Cause

RuntimeException can wrap other exceptions using the cause parameter. This is
useful when translating checked exceptions to unchecked ones while preserving
the original error.

Main.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

class FileReadException extends RuntimeException {
    public FileReadException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class Main {
    public static String readFile(String path) {
        try {
            return new String(Files.readAllBytes(Paths.get(path)));
        } catch (IOException e) {
            throw new FileReadException("Failed to read file: " + path, e);
        }
    }

    public static void main(String[] args) {
        try {
            String content = readFile("nonexistent.txt");
            System.out.println(content);
        } catch (FileReadException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Original cause: " + e.getCause().getMessage());
        }
    }
}

This example shows wrapping an IOException in our custom FileReadException.
The original exception is preserved as the cause, providing full error context
while avoiding checked exception requirements.

## ArrayIndexOutOfBoundsException

ArrayIndexOutOfBoundsException is a common RuntimeException thrown when
accessing invalid array indices. This example demonstrates how it occurs.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        
        try {
            System.out.println(numbers[3]); // Invalid index
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught exception: " + e);
            System.out.println("Array length: " + numbers.length);
        }
        
        // Safe access with bounds checking
        int index = 3;
        if (index &gt;= 0 &amp;&amp; index &lt; numbers.length) {
            System.out.println(numbers[index]);
        } else {
            System.out.println("Invalid index: " + index);
        }
    }
}

The first attempt accesses index 3 in a 3-element array, causing the exception.
The second part shows proper bounds checking to prevent the exception. Always
validate array indices before access.

## NullPointerException

NullPointerException occurs when trying to use null where an object is required.
This example shows common scenarios and prevention techniques.

Main.java
  

package com.zetcode;

class Person {
    private String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }
}

public class Main {

    public static void main(String[] args) {
        Person person = null;
        
        try {
            System.out.println(person.getName()); // Throws NPE
        } catch (NullPointerException e) {
            System.out.println("Caught NPE: " + e);
        }
        
        // Safe alternatives
        person = new Person("Alice");
        if (person != null) {
            System.out.println(person.getName());
        }
        
        // Java 8+ Optional alternative
        java.util.Optional.ofNullable(person)
            .ifPresent(p -&gt; System.out.println(p.getName()));
    }
}

The example shows a NullPointerException when calling a method on null. We then
demonstrate null checking and Java 8's Optional as safer alternatives. Always
validate objects aren't null before use.

## IllegalArgumentException

IllegalArgumentException is thrown to indicate an illegal or inappropriate
argument. This example validates method parameters.

Main.java
  

package com.zetcode;

class Calculator {
    public static double divide(double dividend, double divisor) {
        if (divisor == 0) {
            throw new IllegalArgumentException("Divisor cannot be zero");
        }
        return dividend / divisor;
    }
}

public class Main {

    public static void main(String[] args) {
        try {
            double result = Calculator.divide(10, 0);
            System.out.println("Result: " + result);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Valid case
        double validResult = Calculator.divide(10, 2);
        System.out.println("Valid result: " + validResult);
    }
}

The Calculator class throws IllegalArgumentException for division by zero. This
clearly communicates invalid input to callers. The main method demonstrates both
error and success cases.

## ConcurrentModificationException

ConcurrentModificationException occurs when a collection is modified while
iterating over it. This example shows the problem and solutions.

Main.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List&lt;String&gt; colors = new ArrayList&lt;&gt;();
        colors.add("Red");
        colors.add("Green");
        colors.add("Blue");
        
        try {
            // This will throw ConcurrentModificationException
            for (String color : colors) {
                if (color.equals("Green")) {
                    colors.remove(color);
                }
            }
        } catch (Exception e) {
            System.out.println("Caught: " + e);
        }
        
        // Safe removal using Iterator
        Iterator&lt;String&gt; iterator = colors.iterator();
        while (iterator.hasNext()) {
            String color = iterator.next();
            if (color.equals("Green")) {
                iterator.remove();
            }
        }
        
        System.out.println("Modified list: " + colors);
    }
}

The first attempt modifies the list during iteration, causing an exception. The
second approach safely removes elements using the Iterator's remove method.
Always use proper techniques when modifying collections during iteration.

## Source

[Java RuntimeException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html)

This tutorial covered RuntimeException with practical examples demonstrating
common scenarios. Understanding these exceptions helps write more robust Java
code that properly handles error conditions.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).