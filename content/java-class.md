+++
title = "Java class"
date = 2025-08-29T19:58:14.587+01:00
draft = false
description = "Java class tutorial shows how to work with classes in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java class

last modified January 27, 2024

 

In this article we show how to work with classes in Java.

## Java regular class

The class keyword is used do define classes, which are templates for creating
objects. The objects are called instances of a class. A new class is created
with the new keyword.

Inside a class, we define member fields and member functions. The functions
defined inside classes are called methods. Member fields and functions are
accessed through the dot operator. 

com/zetcode/RegularClassEx.java
  

package com.zetcode;

import java.util.Objects;

class User {

    private String name;
    private String occupation;

    public User(String name, String occupation) {
        this.name = name;
        this.occupation = occupation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("name='").append(name).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

public class RegularClassEx {

    public static void main(String[] args) {

        var u = new User("John Doe", "gardener");
        System.out.println(u);

        System.out.println(u.getName());
        System.out.println(u.getOccupation());

    }
}

In the program, we define the User class. The class has two fields: name and
occupation. In the class, we also define getter and setter methods for the 
fields and the toString method for a string representation of our 
class.

class User {
...
}

The class keyword is used to define a class. Inside the pair of 
curly brackets we define the body of the class.

private String name;
private String occupation;

Two String fields are defined.

public User(String name, String occupation) {
    this.name = name;
    this.occupation = occupation;
}

This is the constructor of the class; it is a special method that has the same
name as the class. It is called when an instance of the class is created. In our
case, we initialize our fields in the constructor.

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getOccupation() {
    return occupation;
}

public void setOccupation(String occupation) {
    this.occupation = occupation;
}

For accessing private fields, we have defined two getter and setter methods.

@Override
public String toString() {
    final StringBuilder sb = new StringBuilder("User{");
    sb.append("name='").append(name).append('\'');
    sb.append(", occupation='").append(occupation).append('\'');
    sb.append('}');
    return sb.toString();
}

To get a string representation of an object, we define the toString
method. The method is called when we pass the object to
System.out.println method.

var u = new User("John Doe", "gardener");

A new instance of the User class is created with the
new keyword. At this moment, the constructor of the class is
called. We pass the constructor two string parameters.

System.out.println(u);

The toString of the class is invoked.

System.out.println(u.getName());
System.out.println(u.getOccupation());

On the user object, we call the getName and getOccupation 
methods. The methods are invoked using the dot operator.

$ java com.zetcode.RegularClassEx
User{name='John Doe', occupation='gardener'}
John Doe
gardener

## Java abstract class

An abstract class in an unfinished class. It must be implemented in its
subclasses. Abstract class is created with the abstract keywords. We can create
abstract methods and member fields.

The purpose of an abstract class is to provide a common definition for
descendant classes.

Abstract classes cannot be instantiated. If a class contains at least one
abstract method, it must be declared abstract too. Abstract methods cannot be
implemented; they merely declare the methods' signatures. 

com/zetcode/AbstractClassEx.java
  

package com.zetcode;

abstract class Drawing {

    protected int x = 0;
    protected int y = 0;

    public abstract double area();

    public String getCoordinates() {

        return String.format("x: %d, y: %d", this.x, this.y);
    }
}

class Circle extends Drawing {

    private int r;

    public Circle(int x, int y, int r) {

        this.x = x;
        this.y = y;
        this.r = r;
    }

    @Override
    public double area() {

        return this.r * this.r * Math.PI;
    }

    @Override
    public String toString() {

        return String.format("Circle at x: %d, y: %d, radius: %d",
                this.x, this.y, this.r);
    }
}

public class AbstractClassEx {

    public static void main(String[] args) {

        Circle c = new Circle(12, 45, 22);

        System.out.println(c);
        System.out.format("Area of circle: %f%n", c.area());
        System.out.println(c.getCoordinates());
    }
}

We have an abstract base Drawing class. The class defines two
member fields, defines one method and declares one method. One of the methods is
abstract, the other one is fully implemented. The Drawing class is
abstract because we cannot draw it. We can draw a circle, a dot, or a square,
but we cannot draw a "drawing". The Drawing class has some common
functionality to the objects that we can draw.

abstract class Drawing {

We use the abstract keyword to define an abstract class.

public abstract double area();

An abstract method is also preceded with a abstract keyword. A
Drawing class is an idea. It is unreal and we cannot implement the
area method for it. This is the kind of situation where we use
abstract methods. The method will be implemented in a more concrete entity like
a circle.

class Circle extends Drawing {

A Circle is a subclass of the Drawing class. Therefore,
it must implement the abstract area method.

@Override
public double area() {

    return this.r * this.r * Math.PI;
}

Here we are implementing the area method.

$ java com.zetcode.AbstractClass
Circle at x: 12, y: 45, radius: 22
Area of circle: 1520.530844
x: 12, y: 45

We create a Circle object and print its area and coordinates.

## Java nested class

It is possible to define a class within another class. Such class is called a
nested class in Java terminology. A class that is not a nested class is called a
top-level class.

Java has four types of nested classes:

- Static nested classes

- Inner classes

- Local classes

- Anonymous classes

Using nested classes may increase the readability of the code and improve the
organization of the code. Inner classes are often used as callbacks in GUI. For
example in Java Swing toolkit.

## Java static nested class

A static nested class is a nested class that can be created without the instance
of the enclosing class. It has access to the static variables and methods of the
enclosing class.

com/zetcode/SNCTest.java
  

package com.zetcode;

public class SNCTest {

    private static int x = 5;

    static class Nested {

        @Override
        public String toString() {
            return "This is a static nested class; x:" + x;
        }
    }

    public static void main(String[] args) {

        SNCTest.Nested sn = new SNCTest.Nested();
        System.out.println(sn);
    }
}

The example presents a static nested class.

private static int x = 5;

This is a private static variable of the SNCTest class.
It can be accessed by a static nested class.

static class Nested {

    @Override
    public String toString() {
        return "This is a static nested class; x:" + x;
    }
}

A static nested class is defined. It has one method which prints a message
and refers to the static x variable.

SNCTest.Nested sn = new SNCTest.Nested();

The dot operator is used to refer to the nested class.

$ java com.zetcode.SNCTest
This is a static nested class; x:5

## Java inner class

An instance of a normal or top-level class can exist on its own. By contrast, an
instance of an inner class cannot be instantiated without being bound to a
top-level class. Inner classes are also called member classes. They belong to
the instance of the enclosing class. Inner classes have access to the members of
the enclosing class.

com/zetcode/InnerClassTest.java
  

package com.zetcode;

public class InnerClassTest {

    private int x = 5;

    class Inner {

        @Override
        public String toString() {
            return "This is Inner class; x:" + x;
        }
    }

    public static void main(String[] args) {

        InnerClassTest nc = new InnerClassTest();
        InnerClassTest.Inner inner = nc.new Inner();

        System.out.println(inner);
    }
}

A nested class is defined in the InnerClassTest class. It has access
to the member x variable.

class Inner {

    @Override
    public String toString() {
        return "This is Inner class; x:" + x;
    }
}

An Inner class is defined in the body of the
InnerClassTest class.

InnerClassTest nc = new InnerClassTest();

First, we need to create an instance of the top-level class. Inner classes
cannot exist without an instance of the enclosing class.

InnerClassTest.Inner inner = nc.new Inner();

Once we have the top-level class instantiated, we can create the instance of the
inner class.

$ java com.zetcode.InnerClassTest
This is Inner class; x:5

This is the output of the com.zetcode.InnerClassTest
program.

## Java local class

A local class is a special case of an inner class. Local classes are classes
that are defined in a block. (A block is a group of zero or more statements
between braces.) A local class has access to the members of its enclosing class.

In addition, a local class has access to local variables if they are declared
final. The reason for this is technical. The lifetime of an
instance of a local class can be much longer than the execution of the method in
which the class is defined. To solve this, the local variables are copied into
the local class. To ensure that they are later not changed, they have to be
declared final.

Local classes cannot be public, private,
protected, or static.  They are not allowed for local
variable declarations or local class declarations. Except for constants that are
declared static and final, local classes cannot
contain static fields, methods, or classes.

com/zetcode/LocalClassEx.java
  

package com.zetcode;

public class LocalClassEx {

    public static void main(String[] args) {

        final int x = 5;

        class Local {

            @Override
            public String toString() {
                return "This is Local class; x:" + x;
            }
        }

        Local loc = new Local();
        System.out.println(loc);
    }
}

A local class is defined in the body of the main method.

@Override
public String toString() {
    return "This is Local class; x:" + x;
}

A local class can access local variables if they are declared final.

## Java anonymous class

Anonymous classes are local classes that do not have a name. They enable us to
declare and instantiate a class at the same time. We can use anonymous classes
if we want to use the class only once. An anonymous class is defined and
instantiated in a single expression. Anonymous inner classes are also used where
the event handling code is only used by one component and therefore does not
need a named reference.

An anonymous class must implement an interface or inherit from a class. But the
implements and extends keywords are not used. If the
name following the new keyword is the name of a class, the anonymous class is a
subclass of the named class. If the name following new specifies an interface,
the anonymous class implements that interface and extends the
Object.

Since an anonymous class has no name, it is not possible to define a constructor
for an anonymous class. Inside the body of an anonymous class we cannot define
any statements; only methods or members.

com/zetcode/AnonymousClass.java
  

package com.zetcode;

public class AnonymousClass {

   interface Message {
        public void send();
    }

    public void createMessage() {

        Message msg = new Message() {

            @Override
            public void send() {
                System.out.println("This is a message");
            }
        };

        msg.send();
    }

    public static void main(String[] args) {

        AnonymousClass ac = new AnonymousClass();
        ac.createMessage();
    }
}

In this code example, we create an anonymous class.

interface Message {
    public void send();
}

An anonymous class must be either a subclass or must implement an interface. Our
anonymous class will implement a Message interface. Otherwise, the
type would not be recognized by the compiler.

public void createMessage() {

    Message msg = new Message() {

        @Override
        public void send() {
            System.out.println("This is a message");
        }
    };

    msg.send();
}

An anonymous class is a local class, hence it is defined in the body of a
method. An anonymous class is defined in an expression; therefore, the enclosing
right bracket is followed by a semicolon.

## Source

[Java class - tutorial](https://docs.oracle.com/javase/tutorial/java/concepts/class.html)

In this article we talked about Java classes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).