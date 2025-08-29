+++
title = "Java @Override Annotation"
date = 2025-08-29T19:59:51.543+01:00
draft = false
description = "Complete Java Override annotation tutorial with examples. Learn how to properly use @Override for method overriding in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java @Override Annotation

Last modified: April 13, 2025

 

The @Override annotation is a marker annotation in Java that
explicitly signals a method's intention to override a method from a superclass
or interface. By using @Override, developers ensure that the
overridden method is correctly defined, preventing accidental mismatches or
typographical errors that might otherwise go unnoticed.

One of the primary advantages of @Override is its ability to detect
errors at compile time. If the annotated method does not successfully override a
method from the superclass or interface—due to incorrect method signatures or
missing superclass definitions—the compiler will generate an error. This
safeguard helps enforce proper inheritance practices and reduces debugging
efforts.

In addition to error prevention, @Override enhances code
readability by making it clear which methods are intended to override parent
class implementations. This improves code maintenance, making modifications
easier for developers working on large or collaborative projects.

By consistently applying the @Override annotation, developers write
more robust, maintainable, and error-resistant Java code while adhering to
object-oriented principles.

## Basic Usage of @Override

The simplest use of @Override is when overriding methods from a
parent class. The annotation goes immediately before the method declaration.
This ensures you're actually overriding a method as intended.

Main.java
  

package com.zetcode;

class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }
}

public class Main {

    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.makeSound(); // Outputs: Dog barks
    }
}

In this example, the Dog class overrides the makeSound
method from Animal. The @Override annotation confirms
this is an intentional override. If we misspelled the method name, the compiler
would catch it.

## Interface Implementation with @Override

@Override can also be used when implementing interface methods.
This helps ensure you're correctly implementing all required interface methods.
The compiler will verify the method signatures match.

Main.java
  

package com.zetcode;

interface Shape {
    double calculateArea();
    String getName();
}

class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public String getName() {
        return "Circle";
    }
}

public class Main {

    public static void main(String[] args) {
        Shape circle = new Circle(5.0);
        System.out.println(circle.getName() + " area: " + 
                         circle.calculateArea());
    }
}

Here, Circle implements the Shape interface. Both
interface methods are marked with @Override. If we changed a method
signature, the compiler would flag it as not matching the interface.

## Detecting Mistakes with @Override

One key benefit of @Override is catching mistakes early. If you
think you're overriding a method but actually aren't, the compiler will warn
you. This prevents subtle bugs from creeping into your code.

Main.java
  

package com.zetcode;

class Vehicle {
    public void startEngine() {
        System.out.println("Engine started");
    }
}

class Car extends Vehicle {
    @Override
    public void startEngin() { // Misspelled method name
        System.out.println("Car engine started");
    }
}

public class Main {

    public static void main(String[] args) {
        Vehicle myCar = new Car();
        myCar.startEngine(); // Calls Vehicle's method
    }
}

In this example, we intended to override startEngine but misspelled
it as startEngin. The @Override annotation causes the
compiler to flag this as an error. Without it, the code would compile but behave
unexpectedly.

## Overriding Object Class Methods

The Object class provides fundamental methods that are inherited by
all Java objects. Commonly overridden methods such as toString,
equals, and hashCode should always use the
@Override annotation. This ensures that the overridden methods
maintain correct signatures and behavior, preventing errors caused by accidental
misdefinitions.

Main.java
  

package com.zetcode;

import java.util.Objects;

class Person {

    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public boolean equals(Object obj) {
        
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age &amp;&amp; Objects.equals(name, person.name);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {

    public static void main(String[] args) {
        Person p1 = new Person("Alice", 30);
        Person p2 = new Person("Alice", 30);
        
        System.out.println(p1);
        System.out.println("p1 equals p2: " + p1.equals(p2));
    }
}

This example correctly overrides three essential Object methods:

    - toString() - Provides a meaningful string representation of the object for debugging and logging.

    - equals(Object obj) - Ensures proper equality checks by comparing object fields.

    - hashCode() - Generates a hash code to maintain consistency with equals(), improving performance in hash-based collections.

Using Objects.equals(name, person.name) instead of
name.equals(person.name) prevents potential
NullPointerException issues. Similarly, Objects.hash(name,
age) simplifies hash code generation while ensuring a well-distributed
hash.

By following these best practices, developers can create reliable, efficient,
and maintainable Java classes that work seamlessly with core Java frameworks and
data structures.

## Abstract Class Method Overriding

When extending abstract classes, @Override should be used for all
concrete implementations of abstract methods. This clarifies the code's intent
and helps catch signature mismatches.

Main.java
  

package com.zetcode;

abstract class Shape {
    public abstract double calculateArea();
    public abstract void draw();
    public void describe() {
        System.out.println("This is a shape");
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }

    @Override
    public void describe() {
        System.out.println("This is a circle with radius " + radius);
    }
}

public class Main {

    public static void main(String[] args) {
        Shape circle = new Circle(5.0);
        circle.draw();
        System.out.println("Area: " + circle.calculateArea());
        circle.describe();
    }
}

Here, Circle implements both abstract methods and overrides
a concrete method from Shape. All overrides are marked
with @Override. The compiler ensures each method correctly matches
its parent declaration.

## Overriding Methods from Generic Classes

When working with generic classes, @Override helps ensure type
safety in method overrides. The annotation verifies method signatures including
generic type parameters.

Main.java
  

package com.zetcode;

class Box&lt;T&gt; {
    private T content;
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
}

class StringBox extends Box&lt;String&gt; {
    @Override
    public void setContent(String content) {
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Content cannot be empty");
        }
        super.setContent(content);
    }
    
    @Override
    public String getContent() {
        String content = super.getContent();
        return content != null ? content.toUpperCase() : null;
    }
}

public class Main {

    public static void main(String[] args) {
        StringBox box = new StringBox();
        box.setContent("hello");
        System.out.println(box.getContent()); // Outputs: HELLO
    }
}

In this example, StringBox extends Box&lt;String&gt;
and overrides its methods. The @Override annotations confirm we're
correctly overriding the generic methods with specific String implementations.
The compiler checks type compatibility.

## Default Interface Methods and @Override

Java 8 introduced default methods in interfaces. When overriding these default
methods, @Override should be used to make the intention clear and
catch potential errors.

Main.java
  

package com.zetcode;

interface Logger {
    default void log(String message) {
        System.out.println("Default log: " + message);
    }
    
    void error(String message);
}

class FileLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("File log: " + message);
    }
    
    @Override
    public void error(String message) {
        System.out.println("File error: " + message.toUpperCase());
    }
}

public class Main {

    public static void main(String[] args) {
        Logger logger = new FileLogger();
        logger.log("test message");
        logger.error("something went wrong");
    }
}

This example shows a FileLogger that overrides both a default
method (log) and an abstract method (error) from the
Logger interface. The @Override annotations make it
clear which methods are being overridden and ensure correct signatures.

## Source

[Java @Override Annotation Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Override.html)

This tutorial has covered all key aspects of the @Override
annotation with practical examples. Proper use of @Override makes
your code more robust, readable, and maintainable by catching errors early.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).