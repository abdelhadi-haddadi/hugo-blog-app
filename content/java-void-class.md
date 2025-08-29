+++
title = "Java Void Class"
date = 2025-08-29T19:59:58.406+01:00
draft = false
description = "Complete Java Void class tutorial covering all methods with examples. Learn about Void type usage in generics and reflection."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Void Class

Last modified: April 13, 2025

 

The java.lang.Void class is a placeholder class that represents the
void keyword in Java. It's an uninstantiable class that serves as a reference to
the void return type. While not commonly used, it has specific applications in
generics and reflection.

The Void class is final and cannot be instantiated. It contains only a single
static field TYPE which holds the Class object representing the
void keyword. This class is primarily used when you need to represent the void
type in generic contexts.

## Void Class Definition

The Void class is a simple final class in the java.lang package. Its definition
is minimal, containing just the TYPE field and a private constructor to prevent
instantiation. Here's how it's defined in the Java API:

public final class Void {
    public static final Class&lt;Void&gt; TYPE = Class.getPrimitiveClass("void");
    
    private Void() {}
}

The TYPE field is particularly useful in reflection scenarios when
you need to check if a method returns void. The private constructor ensures no
instances of Void can be created, as it wouldn't make sense to have void values.

## Basic Void Usage

The most common use of Void is in generic contexts where you need to specify a
type parameter but don't actually need to return a value. This often occurs with
Callable or Future when the operation doesn't return anything.

Main.java
  

package com.zetcode;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        
        Callable&lt;Void&gt; task = new Callable&lt;Void&gt;() {
            @Override
            public Void call() {
                System.out.println("Performing task that returns nothing");
                return null; // Must return null for Void
            }
        };
        
        Future&lt;Void&gt; future = executor.submit(task);
        future.get(); // Waits for task completion
        executor.shutdown();
    }
}

In this example, we use Void as the type parameter for
Callable when we need a task that doesn't return any value. The
call method must return null since Void cannot be
instantiated. This pattern is common in concurrent programming.

## Void in Functional Interfaces

Void can be used with functional interfaces like Runnable or custom interfaces
that don't return values. This is particularly useful when you need to maintain
type safety while working with operations that don't produce results.

Main.java
  

package com.zetcode;

@FunctionalInterface
interface VoidFunction {
    void execute();
}

public class Main {

    public static void main(String[] args) {
        VoidFunction task = () -&gt; System.out.println("Executing void function");
        task.execute();
        
        // Using Void in a generic context
        processVoidOperation(() -&gt; System.out.println("Processed void operation"));
    }
    
    public static void processVoidOperation(VoidFunction operation) {
        System.out.println("Before operation");
        operation.execute();
        System.out.println("After operation");
    }
}

This example demonstrates using Void conceptually with functional interfaces. The
VoidFunction interface represents an operation that returns nothing.
While we don't use the Void class directly here, it's the same concept - an
operation that doesn't return a value.

## Void in Reflection

The Void.TYPE field is primarily used in reflection to identify methods that
return void. This is useful when you need to dynamically inspect method return
types during runtime.

Main.java
  

package com.zetcode;

import java.lang.reflect.Method;

public class Main {
    public void doSomething() {
        System.out.println("Doing something");
    }
    
    public int calculate() {
        return 42;
    }
    
    public static void main(String[] args) throws Exception {
        Method doSomethingMethod = Main.class.getMethod("doSomething");
        Method calculateMethod = Main.class.getMethod("calculate");
        
        System.out.println("doSomething returns void: " + 
            (doSomethingMethod.getReturnType() == Void.TYPE));
        System.out.println("calculate returns void: " + 
            (calculateMethod.getReturnType() == Void.TYPE));
    }
}

In this reflection example, we check if methods return void by comparing their
return type with Void.TYPE. The doSomething method
returns void, while calculate returns int. This technique is useful
for frameworks that need to process methods differently based on return type.

## Void with CompletableFuture

Void is commonly used with CompletableFuture when chaining
asynchronous operations that don't return values. This provides type safety
while indicating no return value is expected.

Main.java
  

package com.zetcode;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class Main {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture&lt;Void&gt; future = CompletableFuture.runAsync(() -&gt; {
            System.out.println("Async task running");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        future.thenRun(() -&gt; System.out.println("Task completed"));
        future.get(); // Wait for completion
    }
}

This example shows CompletableFuture with Void type.
The runAsync method takes a Runnable, which returns void, so we use
Void as the type parameter. The thenRun method also
uses this pattern for continuation tasks that don't return values.

## Void in Generic Classes

Void can be used as a type parameter in generic classes when you need to
represent the absence of a return type. This is useful for creating flexible
APIs that can handle both value-returning and non-value-returning operations.

Main.java
  

package com.zetcode;

class ResultProcessor&lt;T&gt; {
    private T result;
    
    public void process(Runnable operation) {
        operation.run();
        this.result = null;
    }
    
    public T getResult() {
        return result;
    }
}

public class Main {

    public static void main(String[] args) {
        ResultProcessor&lt;Void&gt; processor = new ResultProcessor&lt;&gt;();
        processor.process(() -&gt; System.out.println("Processing data"));
        
        System.out.println("Result is: " + processor.getResult());
    }
}

In this example, we create a generic ResultProcessor that can work
with any type, including Void. When using Void as the type
parameter, we indicate that no meaningful result will be returned. The
getResult method returns null in this case.

## Void vs. Void vs. void

It's important to understand the distinction between the Void class, Void type,
and void keyword. Each serves a different purpose in the Java type system.

Main.java
  

package com.zetcode;

import java.lang.reflect.Type;
import java.util.List;

public class Main {
    // Method returning primitive void
    public void primitiveVoidMethod() {}
    
    // Method returning Void (boxed void)
    public Void boxedVoidMethod() {
        return null; // Must return null
    }
    
    public static void main(String[] args) throws NoSuchMethodException {
        System.out.println("void.class: " + void.class);
        System.out.println("Void.TYPE: " + Void.TYPE);
        System.out.println("Void.class: " + Void.class);
        
        System.out.println("Are they equal? " + (void.class == Void.TYPE));
        
        Type returnType = Main.class
            .getMethod("boxedVoidMethod")
            .getGenericReturnType();
        System.out.println("Generic return type: " + returnType);
    }
}

This example demonstrates the differences between void, Void.TYPE, and Void.class.
The primitive void and Void.TYPE represent the same concept but are different
entities in Java's type system. Void.class is the Class object for the Void
wrapper class, while void.class is for the primitive void keyword.

## Void in Method References

Method references can be used with Void in generic contexts when the referenced
method returns void. This provides a type-safe way to work with void-returning
methods in functional programming.

Main.java
  

package com.zetcode;

import java.util.concurrent.Callable;

public class Main {
    public static void printMessage() {
        System.out.println("Hello from void method");
    }
    
    public static void main(String[] args) throws Exception {
        // Using method reference with Callable&lt;Void&gt;
        Callable&lt;Void&gt; task = Main::printMessage;
        task.call();
        
        // Using lambda expression
        Callable&lt;Void&gt; anotherTask = () -&gt; {
            System.out.println("Another void operation");
            return null;
        };
        anotherTask.call();
    }
}

This example shows how to use method references with Void in
generic contexts. The printMessage method returns void, but we can
reference it as a Callable&lt;Void&gt;. The lambda expression
version makes the null return explicit, which is required for Void-returning
callables.

## Source

[Java Void Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Void.html)

In this tutorial, we've explored the Java Void class and its various use cases.
While not commonly used in everyday programming, Void serves important purposes
in generics, reflection, and concurrent programming when you need to represent
the absence of a return value in a type-safe manner.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).