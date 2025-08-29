+++
title = "Groovy Classes"
date = 2025-08-29T19:56:27.882+01:00
draft = false
description = "Groovy classes tutorial shows how to work with classes in Groovy, including annotations and object creation."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Classes

last modified March 22, 2025

In this tutorial, we explore how to work with classes in Groovy, a dynamic,
object-oriented language built on Java. Classes in Groovy serve as templates
for creating objects (instances), with Groovy adding flexibility through
annotations, automatic properties, and concise syntax compared to Java.

## Groovy Regular Class

In Groovy, the class keyword defines classes, which are templates
for objects. Unlike Java, fields without visibility modifiers become properties
with automatic getters, setters, and a no-arg constructor if none is provided.
Methods without modifiers are public by default.

RegularClass.groovy
  

import groovy.transform.Canonical

@Canonical
class User {
    String name
    String occupation
}

def u = new User('John Doe', 'gardener')
println u

println u.getName()
println u.getOccupation()

def u2 = new User('occupation': 'driver', 'name': 'Roger Roe')

println u2.name
println u2.occupation

Here, the User class uses @Canonical, a Groovy
annotation that adds a constructor, toString, equals,
and hashCode. Fields name and occupation
are properties, automatically generating getters/setters. We create instances
with new User or a map-style constructor, accessing fields via dot
notation or getters.

$ groovy RegularClass.groovy
User(John Doe, gardener)
John Doe
gardener
User(Roger Roe, driver)
Roger Roe
driver

```
@Canonical
class User {
    String name
    String occupation
}

```

@Canonical simplifies class definition by adding boilerplate
methods. Fields without modifiers become public properties with automatic
accessors.

def u = new User('John Doe', 'gardener')

Creates a User instance using the constructor added by
@Canonical, calling it with new.

def u2 = new User('occupation': 'driver', 'name': 'Roger Roe')

Uses Groovy's map-style constructor, leveraging @Canonical's
support for named parameters, enhancing readability and flexibility.

## Object Instance Creation

Groovy offers multiple ways to instantiate objects, including direct
construction, coercion, and annotations, making object creation concise and
expressive compared to Java.

ObjectCreation.groovy
  

class User {
    String name
    String occupation

    User(String name, String occupation) {
        this.name = name
        this.occupation = occupation
    }

    String toString() {
        "${this.name} is a ${this.occupation}"
    }
}

def u = new User('John Doe', 'gardener')
println u

def u2 = ['Roger Roe', 'driver'] as User
println u2.name
println u2.occupation

User u3 = ['Paul Smith', 'teacher']
println u3

This shows three instantiation methods: new User for direct
construction, coercion with as User, and Groovy's implicit
coercion. The toString method provides a readable output, and
properties handle access automatically.

$ groovy ObjectCreation.groovy
John Doe is a gardener
Roger Roe
driver
Paul Smith is a teacher

```
def u2 = ['Roger Roe', 'driver'] as User

```

Coerces a list into a User instance, matching constructor
parameters, showcasing Groovy's dynamic typing and type coercion.

## Object Creation with tap

Groovy's tap method allows fluent object initialization,
executing a closure to set properties on a newly created object.

TapCreation.groovy
  

class User {
    String name
    String occupation

    String toString() {
        "${this.name} is a ${this.occupation}"
    }
}

def u = new User().tap {
    name = 'John Doe'
    occupation = 'gardener'
}

println u

tap initializes u by setting properties in a closure,
offering a clean, chainable way to build objects, leveraging Groovy's dynamic
nature.

$ groovy TapCreation.groovy
John Doe is a gardener

## @TupleConstructor Annotation

The @TupleConstructor annotation generates a classic constructor
based on fields, simplifying class definition while maintaining Java-like
structure.

TupleConstructor.groovy
  

import groovy.transform.TupleConstructor

@TupleConstructor
class User {
    String name
    String occupation
    List&lt;String&gt; favcols

    String toString() {
        "${this.name} is a ${this.occupation}, favourite colours ${favcols}"
    }
}

def u = new User('John Doe', 'gardener', ['red', 'green', 'blue'])
println u

@TupleConstructor creates a constructor taking all fields in order,
here name, occupation, and favcols.
Properties are automatically generated, and toString customizes
output, enhancing Groovy's brevity over Java.

$ groovy TupleConstructor.groovy
John Doe is a gardener, favourite colours [red, green, blue]

## @MapConstructor Annotation

The @MapConstructor annotation generates a map-based constructor,
allowing named parameter initialization, a hallmark of Groovy's flexibility.

MapConstructor.groovy
  

import groovy.transform.MapConstructor

@MapConstructor
class User {
    String name
    String occupation

    String toString() {
        "${this.name} is a ${this.occupation}"
    }
}

def u = new User(name: 'John Doe', occupation: 'gardener')
println u

@MapConstructor enables new User(name: ..., occupation:...), 
using a map for initialization. Properties are auto-generated, making object 
creation intuitive and readable, contrasting with Java's rigidity.

$ groovy MapConstructor.groovy
John Doe is a gardener

## findAll with Immutable Classes

Groovy's @Immutable annotation creates immutable classes, ideal for
data objects, paired with findAll for filtering collections.

ImmutableFindAll.groovy
  

import groovy.transform.Immutable

@Immutable
class Task {
    String title
    boolean done
}

def tasks = [ 
    new Task("Task 1", true), new Task("Task 2", true), 
    new Task("Task 3", false), new Task("Task 4", true), 
    new Task("Task 5", false) 
]

def res = tasks.findAll { it.done == true }
println res

@Immutable makes Task immutable, generating a
constructor and preventing field changes. findAll filters
tasks for completed tasks, returning [Task(Task 1, true), ...],
showcasing Groovy's collection methods and immutability for safety.

$ groovy ImmutableFindAll.groovy
[Task(Task 1, true), Task(Task 2, true), Task(Task 4, true)]

## Groovy Abstract Class

Like Java, Groovy supports abstract classes with the abstract
keyword, but it adds dynamic features. Abstract classes define unfinished
behavior, implemented by subclasses, and cannot be instantiated directly.

AbstractClass.groovy
  

abstract class Drawing {
    protected int x = 0
    protected int y = 0

    abstract double area()

    String getCoordinates() {
        "x: ${x}, y: ${y}"
    }
}

class Circle extends Drawing {
    private int r

    Circle(int x, int y, int r) {
        this.x = x
        this.y = y
        this.r = r
    }

    @Override
    double area() {
        this.r * this.r * Math.PI
    }

    String toString() {
        "Circle at x: ${x}, y: ${y}, radius: ${r}"
    }
}

def c = new Circle(12, 45, 22)
println c
println "Area of circle: ${c.area()}"
println c.getCoordinates()

The Drawing abstract class declares area() as abstract,
requiring implementation in Circle. Groovy's dynamic typing and
string interpolation simplify syntax, while maintaining Java compatibility for
inheritance and polymorphism.

$ groovy AbstractClass.groovy
Circle at x: 12, y: 45, radius: 22
Area of circle: 1520.53084433746
x: 12, y: 45

## Groovy Nested Classes

Groovy supports nested classes like Java, including static nested, inner,
local, and anonymous classes, but with Groovy's dynamic features for brevity.
Nested classes improve code organization and readability.

NestedClasses.groovy
  

// Static Nested Class
class Outer {
    static int x = 5

    static class Nested {
        String toString() { "Static nested; x: ${x}" }
    }
}

def sn = new Outer.Nested()
println sn

// Inner Class
class InnerTest {
    int x = 5

    class Inner {
        String toString() { "Inner class; x: ${x}" }
    }
}

def it = new InnerTest()
def inner = it.new Inner()
println inner

Groovy's static nested class Nested accesses Outer's
static x, while the inner class Inner accesses
InnerTest's instance x. Groovy simplifies syntax by
omitting explicit access modifiers, but retains Java's structure for
compatibility.

$ groovy NestedClasses.groovy
Static nested; x: 5
Inner class; x: 5

## @InheritConstructors Annotation

Groovy's @InheritConstructors annotation automatically inherits
constructors from a superclass, reducing boilerplate for subclass definitions.

InheritConstructors.groovy
  

import groovy.transform.InheritConstructors

class Parent {
    String name

    Parent(String name) { this.name = name }
}

@InheritConstructors
class Child extends Parent { }

def c = new Child('John Doe')
println c.name

@InheritConstructors lets Child inherit
Parent's constructor, creating a Child with
name "John Doe". This annotation streamlines inheritance,
enhancing Groovy's productivity over Java's manual constructor copying.

$ groovy InheritConstructors.groovy
John Doe

## Source

[Groovy Object Orientation Documentation](https://groovy-lang.org/objectorientation.html)

This tutorial explored working with classes in Groovy, highlighting its
dynamic features, annotations, and object creation methods, building on Java's
OOP foundations with added flexibility.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).