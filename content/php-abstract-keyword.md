+++
title = "PHP abstract Keyword"
date = 2025-08-29T20:04:08.049+01:00
draft = false
description = "PHP abstract keyword tutorial shows how to use abstract classes and methods in PHP. Learn abstraction with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP abstract Keyword

last modified April 16, 2025

The PHP abstract keyword is used to create abstract classes and
methods in object-oriented programming. Abstract classes cannot be instantiated
directly. They serve as base classes that other classes can extend.

## Basic Definitions

An abstract class is a class that contains at least one abstract
method. Abstract classes provide a common interface for their subclasses.

An abstract method is a method declared without implementation.
It only defines the method signature. Concrete subclasses must implement all
abstract methods.

The abstract keyword enforces a contract that derived classes must
follow. This is a key concept in polymorphism and inheritance in PHP OOP.

## Basic Abstract Class

This example demonstrates the simplest form of an abstract class in PHP.

basic_abstract.php
  

&lt;?php

abstract class Animal {
    abstract public function makeSound();
}

class Dog extends Animal {
    public function makeSound() {
        echo "Bark";
    }
}

$dog = new Dog();
$dog-&gt;makeSound();

The Animal class is declared abstract with one abstract method.
Dog extends Animal and implements makeSound.
Attempting to instantiate Animal directly would cause an error.

## Abstract Class with Concrete Methods

This example shows an abstract class with both abstract and concrete methods.

mixed_methods.php
  

&lt;?php

abstract class Shape {
    abstract public function area();
    
    public function description() {
        return "This is a shape.";
    }
}

class Square extends Shape {
    private $side;
    
    public function __construct($side) {
        $this-&gt;side = $side;
    }
    
    public function area() {
        return $this-&gt;side * $this-&gt;side;
    }
}

$square = new Square(5);
echo $square-&gt;area();
echo $square-&gt;description();

Shape has an abstract area method and a concrete
description method. Square implements area
but inherits description. Abstract classes can mix method types.

## Multiple Abstract Methods

This example demonstrates an abstract class with multiple abstract methods.

multiple_abstract.php
  

&lt;?php

abstract class Database {
    abstract public function connect();
    abstract public function query($sql);
    abstract public function disconnect();
}

class MySQL extends Database {
    public function connect() {
        echo "Connecting to MySQL...";
    }
    
    public function query($sql) {
        echo "Executing: $sql";
    }
    
    public function disconnect() {
        echo "Disconnecting from MySQL...";
    }
}

$db = new MySQL();
$db-&gt;connect();
$db-&gt;query("SELECT * FROM users");
$db-&gt;disconnect();

The Database abstract class defines three abstract methods.
MySQL must implement all of them. This ensures consistent
interface across different database implementations.

## Abstract Class with Properties

This example shows an abstract class with properties alongside abstract methods.

abstract_with_properties.php
  

&lt;?php

abstract class Vehicle {
    protected $speed;
    
    abstract public function accelerate();
    
    public function getSpeed() {
        return $this-&gt;speed;
    }
}

class Car extends Vehicle {
    public function accelerate() {
        $this-&gt;speed += 10;
    }
}

$car = new Car();
$car-&gt;accelerate();
echo $car-&gt;getSpeed();

Vehicle has a protected property $speed and an abstract
method. Car implements accelerate and can access the
inherited property. Abstract classes can include properties and concrete methods.

## Abstract Class Inheritance

This example demonstrates an abstract class extending another abstract class.

abstract_inheritance.php
  

&lt;?php

abstract class A {
    abstract public function methodA();
}

abstract class B extends A {
    abstract public function methodB();
}

class C extends B {
    public function methodA() {
        echo "Method A implementation";
    }
    
    public function methodB() {
        echo "Method B implementation";
    }
}

$obj = new C();
$obj-&gt;methodA();
$obj-&gt;methodB();

B extends A and adds another abstract method.
C must implement both abstract methods from both classes.
Abstract classes can form inheritance hierarchies like concrete classes.

## Abstract Class with Constructor

This example shows an abstract class with a constructor method.

abstract_constructor.php
  

&lt;?php

abstract class Person {
    protected $name;
    
    public function __construct($name) {
        $this-&gt;name = $name;
    }
    
    abstract public function greet();
}

class Student extends Person {
    public function greet() {
        return "Hello, I'm student {$this-&gt;name}";
    }
}

$student = new Student("Alice");
echo $student-&gt;greet();

Person has a concrete constructor that sets the $name
property. Student calls the parent constructor and implements
greet. Abstract classes can have constructors like regular classes.

## Final Abstract Method

This example demonstrates combining abstract and final keywords in a method.

final_abstract.php
  

&lt;?php

abstract class Template {
    final public function templateMethod() {
        $this-&gt;stepOne();
        $this-&gt;stepTwo();
    }
    
    abstract protected function stepOne();
    abstract protected function stepTwo();
}

class Implementation extends Template {
    protected function stepOne() {
        echo "Step 1 completed";
    }
    
    protected function stepTwo() {
        echo "Step 2 completed";
    }
}

$impl = new Implementation();
$impl-&gt;templateMethod();

templateMethod is final and defines an algorithm structure.
The abstract methods stepOne and stepTwo must be
implemented by subclasses. This is the Template Method design pattern.

## Best Practices

- **Purpose:** Use abstract classes to define common interfaces.

- **Implementation:** All abstract methods must be implemented.

- **Design:** Favor abstract classes when sharing code is needed.

- **Naming:** Use clear names indicating abstract nature.

- **Documentation:** Document expected behavior of abstract methods.

## Source

[PHP abstract Documentation](https://www.php.net/manual/en/language.oop5.abstract.php)

This tutorial covered PHP abstract classes and methods with practical examples
showing abstract keyword usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).