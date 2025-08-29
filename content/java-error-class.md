+++
title = "Java Error Class"
date = 2025-08-29T19:59:48.116+01:00
draft = false
description = "Complete Java Error class tutorial covering all major error types with examples. Learn about VirtualMachineError, OutOfMemoryError, StackOverflowError and more."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Error Class

Last modified: April 13, 2025

 

The java.lang.Error class represents critical issues that
applications should not attempt to catch or handle. Errors typically originate
from the Java Virtual Machine (JVM) due to fundamental problems in the runtime
environment, such as system resource exhaustion or catastrophic failures. Unlike
exceptions, errors signal conditions that are beyond the application's control.

Errors are unchecked exceptions that extend Throwable. Since they
indicate severe failures that a reasonable application cannot recover from, they
are not meant to be caught or handled by typical error-handling mechanisms.
Common examples include OutOfMemoryError, which occurs when the JVM
cannot allocate memory, and StackOverflowError, which happens due
to excessive recursion or deep method calls.

## Error Class Hierarchy

The Error class is a direct subclass of Throwable,
sitting alongside Exception. It has several important subclasses,
each representing distinct types of critical failures.

java.lang.Throwable
    ├── java.lang.Error
    │   ├── java.lang.LinkageError
    │   ├── java.lang.ThreadDeath
    │   ├── java.lang.VirtualMachineError
    │   │   ├── java.lang.InternalError
    │   │   ├── java.lang.OutOfMemoryError
    │   │   ├── java.lang.StackOverflowError
    │   │   └── java.lang.UnknownError
    │   └── java.lang.AssertionError
    └── java.lang.Exception

## Understanding Error Types

    **VirtualMachineError:** Represents failures related to the
    JVM, such as OutOfMemoryError (insufficient memory) and
    StackOverflowError (excessive recursion).
    **LinkageError:** Indicates issues with class loading and
    linking, such as missing dependencies or incompatible binary versions.
    **ThreadDeath:** Occurs when a thread is forcefully stopped
    using Thread.stop() (discouraged in modern Java).
    **AssertionError:** Thrown when an assert
    statement fails, typically used for debugging and validating
    assumptions.

The Error class and its subclasses signal issues that cannot be
gracefully handled, making them distinct from regular exceptions. Developers
should focus on **preventing errors** rather than catching them, ensuring proper
resource management and avoiding excessive recursion or memory-intensive
operations.

## OutOfMemoryError

OutOfMemoryError is thrown when the JVM cannot allocate an object
because it is out of memory. This typically happens when the heap is exhausted.
The garbage collector cannot free enough memory to satisfy a request.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            // Allocate increasingly large arrays until memory is exhausted
            int size = Integer.MAX_VALUE;
            while (true) {
                int[] arr = new int[size];
                size *= 2;
            }
        } catch (OutOfMemoryError e) {
            System.out.println("Caught OutOfMemoryError: " + e.getMessage());
        }
    }
}

This example deliberately causes an OutOfMemoryError by attempting
to allocate increasingly large arrays. When the error occurs, we catch it and
print memory statistics. Note that catching OutOfMemoryError is
generally not recommended in production code.

## StackOverflowError

StackOverflowError occurs when the call stack exceeds its limit.
This typically happens with infinite recursion or very deep recursion where each
method call consumes stack space until none remains.

Main.java
  

package com.zetcode;

public class Main {
    public static void recursiveMethod() {
        // Infinite recursion
        recursiveMethod();
    }
    
    public static void main(String[] args) {
        try {
            recursiveMethod();
        } catch (StackOverflowError e) {
            System.out.println("Caught StackOverflowError: " + e.getMessage());
            System.out.println("Stack trace length: " + e.getStackTrace().length);
        }
    }
}

This example demonstrates a StackOverflowError caused by infinite
recursion. The recursiveMethod calls itself indefinitely until the stack space
is exhausted. We catch the error and print information about the stack trace.

## NoClassDefFoundError

NoClassDefFoundError is thrown when the JVM cannot find a class
definition that was available at compile time but not at runtime. This typically
happens when a required class is missing from the classpath.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            // Attempt to use a class that exists at compile time
            // but will be removed before runtime
            Class.forName("com.example.NonExistentClass");
        } catch (ClassNotFoundException e) {
            System.out.println("ClassNotFoundException: " + e.getMessage());
        } catch (NoClassDefFoundError e) {
            System.out.println("NoClassDefFoundError: " + e.getMessage());
        }
    }
}

This example attempts to load a class that doesn't exist at runtime. First it
tries with Class.forName which throws
ClassNotFoundException. If the class was available at compile time
but missing at runtime, NoClassDefFoundError would be thrown
instead.

## AssertionError

AssertionError is thrown when an assertion fails. Assertions are
boolean expressions that should evaluate to true during program execution. If
they evaluate to false, an AssertionError is thrown.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        int x = 10;
        
        // Enable assertions (-ea VM option)
        assert x &gt; 20 : "x should be greater than 20";
        
        try {
            // This will throw AssertionError if assertions are enabled
            assert false : "This assertion always fails";
        } catch (AssertionError e) {
            System.out.println("Caught AssertionError: " + e.getMessage());
        }
    }
}

This example demonstrates AssertionError. The first assertion will
fail if x is not greater than 20. The second assertion always fails and throws
an AssertionError which we catch. Note that assertions must be
enabled with the -ea VM option.

## InternalError

InternalError indicates an unexpected internal error in the JVM.
This error is thrown when the JVM encounters an unexpected condition that it
cannot handle. It typically indicates a bug in the JVM implementation.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            // This might throw InternalError in some JVM implementations
            // when encountering certain internal states
            throw new InternalError("Simulated JVM internal error");
        } catch (InternalError e) {
            System.out.println("Caught InternalError: " + e.getMessage());
            System.out.println("This indicates a serious JVM problem");
        }
    }
}

This example simulates an InternalError. In practice,
InternalError is thrown by the JVM itself when it encounters an
unexpected internal state. Applications should not normally throw or catch this
error as it indicates a JVM problem.

## UnknownError

UnknownError is thrown when an unknown but serious exception has
occurred in the JVM. This is a catch-all error for serious problems that don't
fit into other error categories.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            // Simulating an unknown serious error
            throw new UnknownError("Unknown serious JVM problem");
        } catch (UnknownError e) {
            System.out.println("Caught UnknownError: " + e.getMessage());
            System.out.println("This indicates an unspecified serious problem");
        }
    }
}

This example demonstrates UnknownError. Like
InternalError, this is typically thrown by the JVM rather than
application code. It represents an unspecified serious problem in the JVM that
doesn't fit other error categories.

## LinkageError

LinkageError occurs when there is a problem with class dependencies.
This can happen when a class has incompatibly changed after compilation, or when
there are version conflicts between classes.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            // Simulating a linkage problem
            throw new LinkageError("Class dependency problem");
        } catch (LinkageError e) {
            System.out.println("Caught LinkageError: " + e.getMessage());
            System.out.println("This indicates a class dependency issue");
        }
    }
}

This example demonstrates LinkageError. In practice, this error
occurs when there's a problem with class dependencies, such as incompatible
class versions. The example shows how to catch it, though in real applications
this is rarely done as it indicates a serious configuration problem.

## Source

[Java Error Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Error.html)

In this article, we've covered the Java Error class and its common subclasses
with practical examples. While errors are generally not caught in normal
application code, understanding them is important for debugging serious JVM
problems.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).