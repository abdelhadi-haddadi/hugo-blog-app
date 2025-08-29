+++
title = "PHP new Keyword"
date = 2025-08-29T20:04:34.717+01:00
draft = false
description = "PHP new keyword tutorial shows how to create objects in PHP. Learn object instantiation with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP new Keyword

last modified April 16, 2025

The PHP new keyword is fundamental for object-oriented programming.
It creates an instance of a class, allocating memory for the object. The new
operator calls the class constructor to initialize the object. Understanding
new is essential for working with objects in PHP.

## Basic Definitions

The new keyword instantiates a class, creating an object. It
allocates memory and calls the constructor method if defined. Objects are
reference types in PHP, unlike primitive types.

Syntax: $object = new ClassName();. Parentheses are optional if no
arguments are passed. The new operator returns a reference to the created
object.

Constructors are special methods called during instantiation. They typically
initialize object properties. Destructors clean up when objects are destroyed.

## Basic Object Instantiation

This example demonstrates creating a simple object with the new keyword.

basic_new.php
  

&lt;?php

declare(strict_types=1);

class Car {
    public string $model;
}

$myCar = new Car();
$myCar-&gt;model = "Toyota";

echo "Car model: " . $myCar-&gt;model;

The code defines a simple Car class with one property. The new keyword creates
a Car instance stored in $myCar. We then set the model property and display
it. This shows basic object creation and property access.

## Constructor with Parameters

This example shows how to pass arguments to the constructor during instantiation.

constructor_params.php
  

&lt;?php

declare(strict_types=1);

class Person {
    public function __construct(
        public string $name,
        public int $age
    ) {}
}

$person = new Person("John Doe", 30);

echo "Name: {$person-&gt;name}, Age: {$person-&gt;age}";

The Person class has a constructor that takes name and age parameters. The new
keyword passes these values during instantiation. Constructor property promotion
automatically creates properties. This is a common pattern in modern PHP.

## Multiple Object Instances

This example demonstrates creating multiple instances of the same class.

multiple_instances.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$product1 = new Product("Laptop", 999.99);
$product2 = new Product("Mouse", 19.99);

echo "{$product1-&gt;name}: \${$product1-&gt;price}\n";
echo "{$product2-&gt;name}: \${$product2-&gt;price}";

We create two separate Product objects with different properties. Each new
call creates a distinct object instance. The objects are independent with
their own property values. This shows how classes serve as blueprints.

## Anonymous Classes

This example shows how to use new with anonymous classes (classes without names).

anonymous_class.php
  

&lt;?php

declare(strict_types=1);

$logger = new class {
    public function log(string $message): void {
        echo "Log: $message";
    }
};

$logger-&gt;log("System started");

The new keyword creates an anonymous class instance directly. The class has one
method that we call immediately. Anonymous classes are useful for one-off
objects. They're often used in testing and dependency injection.

## Class Inheritance

This example demonstrates using new with inherited classes.

inheritance.php
  

&lt;?php

declare(strict_types=1);

class Animal {
    public function __construct(public string $species) {}
}

class Dog extends Animal {
    public function bark(): string {
        return "Woof!";
    }
}

$dog = new Dog("Canine");
echo "Species: {$dog-&gt;species}, Sound: {$dog-&gt;bark()}";

Dog inherits from Animal but is instantiated with new Dog. The constructor
from Animal is called automatically. We can access both parent and child
class members. This shows polymorphism in action.

## Static Factory Method

This example shows an alternative to new using a static factory method.

factory_method.php
  

&lt;?php

declare(strict_types=1);

class User {
    private function __construct(public string $name) {}
    
    public static function create(string $name): self {
        return new self($name);
    }
}

$user = User::create("Alice");
echo "User: {$user-&gt;name}";

The constructor is private, forcing use of the create() method. The factory
method internally uses new to instantiate the class. This provides more
control over object creation. It's a common design pattern in OOP.

## Object Cloning

This example demonstrates using new indirectly through object cloning.

cloning.php
  

&lt;?php

declare(strict_types=1);

class Book {
    public function __construct(
        public string $title,
        public string $author
    ) {}
}

$book1 = new Book("PHP Basics", "John Smith");
$book2 = clone $book1;
$book2-&gt;title = "Advanced PHP";

echo "Book1: {$book1-&gt;title}, Book2: {$book2-&gt;title}";

We first create a Book object with new. The clone keyword creates a copy
without calling the constructor. The clone operation internally uses memory
allocation similar to new. Both objects are independent after cloning.

## Best Practices

- **Dependency Injection:** Prefer injecting dependencies over using new directly.

- **Single Responsibility:** Classes should have one reason to change.

- **Type Hinting:** Use type hints for constructor parameters.

- **Immutable Objects:** Consider making objects immutable when possible.

- **Documentation:** Document constructor parameters and their types.

## Source

[PHP Objects Documentation](https://www.php.net/manual/en/language.oop5.basic.php)

This tutorial covered PHP's new keyword with practical examples showing object
instantiation in various scenarios and patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).