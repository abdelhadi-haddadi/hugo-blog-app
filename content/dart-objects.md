+++
title = "Dart Objects"
date = 2025-08-29T19:52:09.224+01:00
draft = false
description = "This Dart objects tutorial demonstrates how to work with objects in the Dart programming language. Objects are fundamental building blocks in Dart programs."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Objects

Last modified June 4, 2025

This Dart objects tutorial explores how to work with objects in the Dart
programming language. Objects are the core building blocks of Dart programs,
combining data and behavior to create modular, reusable code.

## Understanding Objects

In Dart, objects are the fundamental units of a program, encapsulating data
and methods. The data, known as instance variables, and the methods, referred
to as member functions, are collectively called members of an object. Objects
interact with one another through their methods, enabling data processing and
communication.

Creating an object involves two steps: defining a class and instantiating it.
A class serves as a blueprint, outlining the state and behavior that all
objects of that class share. Objects, or instances, are created from a class
at runtime using the new keyword, which is optional in Dart 2.0
and later. We use the dot (.) operator to access an object's instance
variables or methods.

Object-oriented programming (OOP) is a paradigm that leverages objects and
their interactions to design robust applications and programs.

## Dart Objects

In Dart, everything is an object, including literals like numbers and strings,
which distinguishes Dart from many other programming languages.

main.dart
  

class Being {}

void main() {
  var b = Being();

  print(b.hashCode);
  print("falcon".toUpperCase());
  print(2.isNegative);

  print(b.runtimeType);
  print(2.runtimeType);
}

This example demonstrates working with various objects in Dart.

class Being {}

The class keyword defines a template for an object. Here, the
Being class is empty but still functional.

var b = Being();

A new instance of Being is created. The new keyword
is optional in modern Dart.

print(b.hashCode);

Even an empty object inherits methods and attributes from Dart's
Object class, such as hashCode.

print("falcon".toUpperCase());

The string literal "falcon" is an object with methods like
toUpperCase, showcasing Dart's object-oriented nature.

print(2.isNegative);

Number literals, like 2, are also objects with properties such
as isNegative.

print(b.runtimeType);
print(2.runtimeType);

The runtimeType property reveals the type of each object at
runtime.

$ dart main.dart
511903303
FALCON
false
Being
int

## Dart Object Attributes

Object attributes, or instance variables, store data specific to each instance
of a class. Each object maintains its own copy of these variables. Dart
automatically generates getter methods for all instance variables and setter
methods for non-final variables.

main.dart
  

class Person {
  String? name;
  String? occupation;
}

void main() {
  var p1 = Person();
  p1.name = "John Doe";
  p1.occupation = "gardener";

  var p2 = Person();
  p2.name = "Roger Roe";
  p2.occupation = "driver";

  print("${p1.name} is a ${p1.occupation}");
  print("${p2.name} is a ${p2.occupation}");
}

This example defines a Person class with two attributes:
name and occupation.

var p1 = Person();
p1.name = "John Doe";
p1.occupation = "gardener";

A Person object is created, and its attributes are set using the
dot operator.

var p2 = Person();
p2.name = "Roger Roe";
p2.occupation = "driver";

A second, unique Person object is instantiated with different
attribute values.

print("${p1.name} is a ${p1.occupation}");
print("${p2.name} is a ${p2.occupation}");

The attributes of both objects are printed, demonstrating their distinct
states.

$ dart main.dart
John Doe is a gardener
Roger Roe is a driver

## Dart Cascade Operator

The cascade operator (..) enables multiple operations on the same
object in a concise manner, improving code readability.

main.dart
  

class User {
  String? fname;
  String? lname;
  String? occupation;
  @override
  String toString() =&gt; "$fname $lname is a $occupation";
}

void main() {
  var u = User()
    ..fname = "Roger"
    ..lname = "Roe"
    ..occupation = "driver";

  print(u);
}

This example uses the cascade operator to initialize a User
object's attributes in a single expression.

$ dart main.dart
Roger Roe is a driver

## Dart Object Methods

Methods are functions defined within a class that operate on an object's
attributes, promoting modularity and reusability in code.

main.dart
  

import 'dart:math';

class Circle {
  int radius;

  Circle(this.radius);

  double area() =&gt; pi * radius * radius;
}

void main() {
  var c = Circle(5);
  print(c.area());
}

This example defines a Circle class with an area
method to compute the circle's area.

double area() =&gt; pi * radius * radius;

The area method uses the pi constant from the
dart:math library to calculate the area.

var c = Circle(5);

A Circle object is created with a radius of 5.

print(c.area());

The area method is called using the dot operator to compute and
print the area.

$ dart main.dart
78.53981633974483

## Dart Object Constructor

Constructors are special methods automatically invoked when an object is
created, used to initialize the object's state. Dart supports named and
factory constructors, which do not return values.

Named constructors share the class's name and are commonly used for
straightforward initialization.

main.dart
  

class User {
  String name;
  String occupation;

  User(this.name, this.occupation);
}

void main() {
  var u1 = User("John Doe", "gardener");
  var u2 = User("Roger Roe", "driver");

  print("${u1.name} is a ${u1.occupation}");
  print("${u2.name} is a ${u2.occupation}");
}

This example uses a named constructor to initialize a User
object's attributes.

User(this.name, this.occupation);

The constructor uses automatic initializers to set the name and
occupation attributes.

var u1 = User("John Doe", "gardener");

A User object is created, passing values to the constructor.

$ dart main.dart
John Doe is a gardener
Roger Roe is a driver

Factory constructors, defined with the factory keyword, allow
custom logic for object creation, such as caching or conditional
instantiation. They can return existing objects and are useful in design
patterns.

main.dart
  

import 'dart:math';

abstract class Shape {
  factory Shape(String type) {
    if (type == 'circle') return Circle(4);
    if (type == 'square') return Square(4);
    if (type == 'triangle') return Triangle(4);
    throw Exception("Unknown shape");
  }
  num get area;
}

class Circle implements Shape {
  final num radius;
  Circle(this.radius);
  num get area =&gt; pi * pow(radius, 2);
}

class Square implements Shape {
  final num side;
  Square(this.side);
  num get area =&gt; pow(side, 2);
}

class Triangle implements Shape {
  final num side;
  Triangle(this.side);
  num get area =&gt; pow(side, 2) / 2;
}

void main() {
  print(Shape('circle').area);
  print(Shape('square').area);
  print(Shape('triangle').area);
}

This example uses a factory constructor in an abstract Shape
class to create different shapes based on a type parameter.

$ dart main.dart
50.26548245743669
16
8.0

## Dart toString Method

Every Dart object inherits a toString method from the
Object class, providing a human-readable string representation.
Calling print on an object implicitly invokes
toString.

main.dart
  

class User {
  String name;
  String occupation;

  User(this.name, this.occupation);

  @override
  String toString() =&gt; "$name is a $occupation";
}

void main() {
  var u1 = User("John Doe", "gardener");
  var u2 = User("Roger Roe", "driver");

  print(u1);
  print(u2);
}

This example overrides the toString method in the
User class to provide a custom string representation.

@override
String toString() =&gt; "$name is a $occupation";

The overridden toString method returns a formatted string with
the user's name and occupation.

print(u1);
print(u2);

Printing the objects automatically calls their toString method.

$ dart main.dart
John Doe is a gardener
Roger Roe is a driver

## Dart Automatic Initializers

Dart supports concise constructor syntax using automatic initializers, which
simplify attribute initialization without explicit assignment statements.

main.dart
  

class User {
  String name;
  String occupation;

  User(this.name, this.occupation);
}

void main() {
  var u1 = User("John Doe", "gardener");
  var u2 = User("Roger Roe", "driver");

  print("${u1.name} is a ${u1.occupation}");
  print("${u2.name} is a ${u2.occupation}");
}

This example demonstrates automatic initializers in the User
class constructor, inferring data types and reducing boilerplate code.

## Dart Named Parameters

Named parameters, denoted by curly braces {}, allow flexible
constructor calls where parameters are specified by name, enhancing code
clarity.

main.dart
  

class User {
  String? name;
  String? occupation;

  User({this.name, this.occupation});

  @override
  String toString() =&gt; "$name is a $occupation";
}

void main() {
  var u1 = User(name: "John Doe", occupation: "gardener");
  print(u1);
}

This example uses named parameters to initialize a User object,
making the code more readable and flexible.

## Dart Object Inheritance

Inheritance allows new classes to build upon existing ones, creating derived
classes that extend or override the functionality of base classes. Dart uses
the extends keyword for inheritance.

main.dart
  

class Being {
  static int count = 0;

  Being() {
    count++;
    print("Being is created");
  }

  void getCount() =&gt; print("There are $count Beings\n");
}

class Human extends Being {
  Human() {
    print("Human is created");
  }
}

class Animal extends Being {
  Animal() {
    print("Animal is created");
  }
}

class Dog extends Animal {
  Dog() {
    print("Dog is created");
  }
}

void main() {
  Human();
  var dog = Dog();
  dog.getCount();
}

This example demonstrates a class hierarchy where Human and
Animal inherit from Being, and Dog
inherits from Animal. A static variable tracks instance counts.

static int count = 0;

The static count variable is shared across all instances of the
Being class and its subclasses.

Being() {
  count++;
  print("Being is created");
}

The Being constructor increments the count and prints a message
each time an instance is created.

class Animal extends Being {
...
class Dog extends Animal {
...

The Animal and Dog classes inherit from their
respective parent classes, forming a multi-level hierarchy.

Human();
var dog = Dog();
dog.getCount();

Instances of Human and Dog are created, and the
getCount method displays the total number of Being
instances.

$ dart main.dart
Being is created
Human is created
Being is created
Animal is created
Dog is created
There are 2 Beings

## Dart Check Type

Dart's is keyword checks an object's type at runtime, useful for
type verification in dynamic code.

main.dart
  

class Person {}

class Student {}

void main() {
  var p = Person();
  var s = Student();

  print(p is Person);
  print(s is Person);
  print(p is Object);
  print(s is Object);

  print(2 is int);
  print(2 is Object);
}

This example checks the types of various objects using the is
keyword.

print(p is Person);

This checks if p is an instance of Person, which
returns true.

print(s is Person);

This checks if s is a Person, which returns false
since s is a Student.

print(2 is Object);

Since all Dart objects inherit from Object, this check returns
true for the number literal 2.

$ dart main.dart
true
false
true
true
true
true

## Dart Getters and Setters

Dart allows explicit definition of getters and setters to control access to an
object's attributes, providing encapsulation and validation logic.

main.dart
  

class Account {
  double _balance = 0.0;

  double get balance =&gt; _balance;

  set balance(double value) {
    if (value &gt;= 0) {
      _balance = value;
    } else {
      throw Exception("Balance cannot be negative");
    }
  }
}

void main() {
  var account = Account();
  account.balance = 100.0;
  print("Balance: ${account.balance}");

  try {
    account.balance = -50.0;
  } catch (e) {
    print(e);
  }
}

This example defines an Account class with a private
_balance attribute, accessed via getter and setter methods.

double get balance =&gt; _balance;

The getter returns the private _balance value.

set balance(double value) {
  if (value &gt;= 0) {
    _balance = value;
  } else {
    throw Exception("Balance cannot be negative");
  }
}

The setter validates that the balance is non-negative before updating.

$ dart main.dart
Balance: 100.0
Exception: Balance cannot be negative

## Dart Method Overriding

Method overriding allows a subclass to provide a specific implementation of a
method defined in its superclass, enabling polymorphic behavior.

main.dart
  

class Animal {
  void makeSound() =&gt; print("Some generic sound");
}

class Dog extends Animal {
  @override
  void makeSound() =&gt; print("Woof!");
}

class Cat extends Animal {
  @override
  void makeSound() =&gt; print("Meow!");
}

void main() {
  var dog = Dog();
  var cat = Cat();

  dog.makeSound();
  cat.makeSound();
}

This example demonstrates method overriding in a class hierarchy with
Animal, Dog, and Cat.

@override
void makeSound() =&gt; print("Woof!");

The Dog class overrides the makeSound method to
provide a specific implementation.

$ dart main.dart
Woof!
Meow!

## Dart Mixins

Mixins in Dart allow code reuse by adding functionality to classes without
using inheritance, promoting modularity and flexibility.

main.dart
  

mixin Flyable {
  void fly() =&gt; print("Flying...");
}

class Bird with Flyable {
  String name;

  Bird(this.name);
}

void main() {
  var eagle = Bird("Eagle");
  eagle.fly();
  print("${eagle.name} is soaring high!");
}

This example uses a Flyable mixin to add flying behavior to the
Bird class.

mixin Flyable {
  void fly() =&gt; print("Flying...");
}

The Flyable mixin defines a fly method that can be
shared with any class.

class Bird with Flyable {

The Bird class incorporates the Flyable mixin using
the with keyword.

$ dart main.dart
Flying...
Eagle is soaring high!

## Dart Abstract Classes

Abstract classes in Dart cannot be instantiated and are used to define
interfaces or shared functionality for subclasses.

main.dart
  

abstract class Vehicle {
  void startEngine();
}

class Car extends Vehicle {
  @override
  void startEngine() =&gt; print("Car engine started");
}

class Bike extends Vehicle {
  @override
  void startEngine() =&gt; print("Bike engine started");
}

void main() {
  var car = Car();
  var bike = Bike();

  car.startEngine();
  bike.startEngine();
}

This example defines an abstract Vehicle class with concrete
subclasses Car and Bike.

abstract class Vehicle {
  void startEngine();
}

The abstract Vehicle class declares a startEngine
method that subclasses must implement.

$ dart main.dart
Car engine started
Bike engine started

## Source

[Dart classes - language reference](https://dart.dev/language/classes)

This tutorial has explored the essentials of working with objects in Dart,
including attributes, methods, constructors, inheritance, and more.

## Author

Jan Bodnar is a passionate programmer with over a decade of experience in
teaching and writing about programming. Since 2007, he has authored more than
1,400 articles and 8 e-books, sharing his expertise across various
programming languages.

Explore [all Dart tutorials](/dart/).