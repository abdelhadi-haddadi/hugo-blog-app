+++
title = "Java static keyword"
date = 2025-08-29T20:00:33.551+01:00
draft = false
description = "Learn how to use the static keyword in Java with this comprehensive tutorial. Explore static variables, methods, nested classes, blocks, and imports to enhance your Java programming skills."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java static keyword

last modified May 1, 2025

 

In this article we cover the static keyword in Java. We cover
static variables, methods, nested classes, blocks, and imports.

## Definition

The static keyword is a *non-access modifier* in Java. When
applied to a member of a class, it ensures that the member belongs to the
*class itself*, rather than an instance of the class. This means
static members are shared across all instances and do not require
object instantiation to be accessed.

Additionally, the static keyword can be used for:

    - Class initializers (static blocks that execute when the class is loaded).

    - Constants (static final variables shared across instances).

    - Static imports (allowing direct access to static members without class qualification).

## Usage of the static Keyword

The static modifier can be applied to the following components:

    - **Variables** - Shared across all instances of the class.

    - **Methods** - Called without requiring an instance of the class.

    - **Blocks** - Used for class-level initialization.

    - **Nested classes** - Inner classes that do not depend on an instance of the outer class.

    - **Imports** - Allows direct access to static members from other classes.

## Java static variable

Static variables are also known as class variables. All instances of a class
share the same copy of a static variable.  They are initialized only once, at
the start of the execution. A class variable can be accessed directly by the
class name, without the need to create a instance. One common use of
static is to create a constant value that is attached to a class.

### Static variable example

Main.java
  

import java.util.ArrayList;
import java.util.List;

class Being {

    public static int count;
}

class Cat extends Being {

    public Cat() {
        count++;
    }
}

class Dog extends Being {

    public Dog() {
        count++;
    }
}

class Donkey extends Being {

    public Donkey() {
        count++;
    }
}

void main(String[] args) {

    List&lt;Being&gt; beings = new ArrayList&lt;&gt;();

    beings.add(new Cat());
    beings.add(new Cat());
    beings.add(new Cat());
    beings.add(new Dog());
    beings.add(new Donkey());

    int nOfBeings = Being.count;

    System.out.format("There are %d beings %n", nOfBeings);
}

In the code example, we keep track of beings created with a static variable.

class Being {

    public static int count;
}

A static variable is defined. The variable belongs to the Being
class and is shared by all instances of Being, including
descendants.

class Cat extends Being {

    public Cat() {
        count++;
    }
}

The Cat class inherits from Being. It increments the
count variable.

class Dog extends Being {

    public Dog() {
        count++;
    }
}

The Dog class increments the same class variable. So Dog
and Cat refer to the same class variable.

int nOfBeings = Being.count;

We get the number of all beings created. We refer to the class variable
by its class name followed by the dot operator and the variable name.

### Java static variable properties

- Static variables have default values.

- Static variables can be accessed directly in static and non-static methods.

- Static variables are called class variables or static fields.

- Static variables are associated with the class, rather than with any object.

## Java static method

Static methods are called without an instance of the object. To call a static
method, we use the name of the class, the dot operator, and the name of the
method. Static methods can only work with static variables. Static methods are
often used to represent data or calculations that do not change in response to
object state. For instance, java.lang.Math contains static methods
for various calculations.

We use the static keyword to declare a static method. When no
static modifier is present, the method is said to be an instance
method.

### Static method restrictions

Static method can only call other static methods. They can only access static
data and cannot refer to this and super.

### Static method example

com/zetcode/Main.java
  

package com.zetcode;

class Basic {

    static int id = 2321;

    public static void showInfo() {

        System.out.println("This is Basic class");
        System.out.format("The Id is: %d%n", id);
    }
}

public class Main {

    public static void main(String[] args) {

        Basic.showInfo();
    }
}

In our code example, we define a static ShowInfo method.

static int id = 2321;

A static method can only work with static variables. Static variables are
not available to instance methods.

public static void showInfo() {

    System.out.println("This is Basic class");
    System.out.format("The Id is: %d%n", id);
}

This is our static ShowInfo method. It works with a
static id member.

Basic.showInfo();

To invoke a static method, we do not need an object instance.
We call the method by using the name of the class and the dot
operator.

## The static main method

In Java console and GUI applications, the entry point has the following
singnature:

public static void main(String[] args)

By declaring the main method static, it can be invoked
by the runtime engine without having to create an instance of the main class. Since the
primary reason of main is to bootstrap the application, there is no
need to have an instance of the main class.

In addition, if the main method was not static,
it would require additional contracts such as a default constructor or a requirement
of the main class not to be abstract. So having a static main
method is a less complex solution.

## Java static block

A code block with the static modifier is called a *class initializer*. A
code block without the static modifier is an instance initializer. Class
initializers are executed in the order they are defined, top down, when the
class is loaded.

A static block executes once in the life cycle of any program, and there is no
other way to invoke it.

### Static block example

Main.java
  

package com.zetcode;

public class Main {

    private static final int i;

    static {

        System.out.println("Class initializer called");
        i = 6;
    }

    public static void main(String[] args) {

        System.out.println(i);
    }
}

This is an example of a static initializer.

static {

    System.out.println("Class initializer called");
    i = 6;
}

In the static initializer, we print a message to the console and initialize a
static variable.

## Static nested classes

A static nested class is a nested class that can be created without the instance
of the enclosing class. It has access to the static variables and methods of the
enclosing class.

Static nested classes can logically group classes that are only used in one
place. They increase encapsulation and provide more readable and maintainable
code.

### Static nested classes restrictions

Static nested classes cannot invoke non-static methods or access
non-static fields of an instance of the enclosing class.

### Static nested class example

Main.java
  

package com.zetcode;

public class Main {

    private static int x = 5;

    static class Nested {

        @Override
        public String toString() {
            return "This is a static nested class; x:" + x;
        }
    }

    public static void main(String[] args) {

        Main.Nested sn = new Main.Nested();
        System.out.println(sn);
    }
}

The example presents a static nested class.

private static int x = 5;

This is a private static variable of the JavaStaticNestedClass
class. It can be accessed by a static nested class.

static class Nested {

    @Override
    public String toString() {
        return "This is a static nested class; x:" + x;
    }
}

A static nested class is defined. It has one method which prints a message
and refers to the static x variable.

Main.Nested sn = new Main.Nested();

The dot operator is used to refer to the nested class.

## Java static import

Static imports allow members (fields and methods) defined in a class as
public static to be used in Java code without specifying the class
in which the field is defined.

### Static import disadvantages

The overuse the static import feature can make our program unreadable and
unmaintainable, polluting its namespace with all the static members we import.

### Static import example

Main.java
  

package com.zetcode;

import static java.lang.Math.PI;

public class Main {

    public static void main(String[] args) {

        System.out.println(PI);
    }
}

In the example, we use the PI constant without its class.

## Java constants

The static modifier, in combination with the final
modifier, is also used to define constants. The final modifier
indicates that the value of this field cannot change.

public static final double PI = 3.14159265358979323846;

For example, in java.lang.Math we have a constant named
PI, whose value is an approximation of pi (the ratio of the
circumference of a circle to its diameter).

## Singleton pattern

Singleton design pattern ensures that one and only one object of a particular
class is ever constructed during the lifetime of the application.

Singleton.java
  

public class Singleton {

    private static final Singleton INSTANCE = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return INSTANCE;
    }
}

In this simple code excerpt, we have an internal static reference to the single
allowed object instance. We access the object via a static method.

## Source

[Java tutorial](https://docs.oracle.com/javase/tutorial/java/index.html)

In this article we have presented the Java static keyword.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).