+++
title = "PHP class Keyword"
date = 2025-08-29T20:04:13.640+01:00
draft = false
description = "PHP class tutorial shows how to use classes in PHP. Learn OOP with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP class Keyword

last modified April 16, 2025

The PHP class keyword is fundamental for object-oriented programming.
It defines a blueprint for creating objects with properties and methods. Classes
encapsulate data and behavior into reusable components. They form the basis of
OOP in PHP.

## Basic Definitions

A class is a template for creating objects. It defines properties
(variables) and methods (functions) that objects will have. Classes promote
code reusability and organization.

An object is an instance of a class created with the new
keyword. Each object has its own set of property values. Objects can interact
through their methods.

Syntax: class ClassName { properties methods }. Class names are
typically PascalCase. Properties and methods can have visibility modifiers
(public, protected, private).

## Basic Class Definition

This example demonstrates a simple class with properties and a method.

basic_class.php
  

&lt;?php

declare(strict_types=1);

class Car {
    public string $model;
    public string $color;
    
    public function startEngine(): void {
        echo "Engine started for {$this-&gt;color} {$this-&gt;model}";
    }
}

$myCar = new Car();
$myCar-&gt;model = "Toyota";
$myCar-&gt;color = "red";
$myCar-&gt;startEngine();

The code defines a Car class with two properties and one method.
We create an instance with new and set its properties. The
$this keyword refers to the current object instance. This shows
basic class usage.

## Constructor Method

This example shows how to use the __construct method.

constructor.php
  

&lt;?php

declare(strict_types=1);

class Person {
    public string $name;
    public int $age;
    
    public function __construct(string $name, int $age) {
        $this-&gt;name = $name;
        $this-&gt;age = $age;
    }
    
    public function introduce(): void {
        echo "Hi, I'm {$this-&gt;name} and I'm {$this-&gt;age} years old.";
    }
}

$person = new Person("Alice", 30);
$person-&gt;introduce();

The constructor is called automatically when creating an object. It initializes
object properties with provided values. This eliminates the need for separate
property assignments. Constructors ensure objects start in valid states.

## Inheritance

This example demonstrates class inheritance using the extends keyword.

inheritance.php
  

&lt;?php

declare(strict_types=1);

class Animal {
    public string $name;
    
    public function __construct(string $name) {
        $this-&gt;name = $name;
    }
    
    public function makeSound(): void {
        echo "Some generic animal sound";
    }
}

class Dog extends Animal {
    public function makeSound(): void {
        echo "{$this-&gt;name} says: Woof!";
    }
}

$dog = new Dog("Buddy");
$dog-&gt;makeSound();

The Dog class inherits from Animal and overrides its
makeSound method. Child classes automatically get parent properties
and methods. Inheritance enables code reuse and polymorphism. The child can
extend or modify parent behavior.

## Visibility Modifiers

This example shows public, protected, and private visibility in action.

visibility.php
  

&lt;?php

declare(strict_types=1);

class BankAccount {
    public string $owner;
    protected float $balance = 0;
    private string $accountNumber;
    
    public function __construct(string $owner, string $accountNumber) {
        $this-&gt;owner = $owner;
        $this-&gt;accountNumber = $accountNumber;
    }
    
    public function deposit(float $amount): void {
        $this-&gt;balance += $amount;
    }
    
    public function getBalance(): float {
        return $this-&gt;balance;
    }
}

$account = new BankAccount("John Doe", "123456789");
$account-&gt;deposit(1000);
echo "Balance: " . $account-&gt;getBalance();

Public members are accessible anywhere, protected only within the class and
children, private only within the class. This implements encapsulation by
hiding internal details. The balance can only be modified through defined
methods. Visibility controls access to class members.

## Static Properties and Methods

This example demonstrates static class members with the static keyword.

static.php
  

&lt;?php

declare(strict_types=1);

class Counter {
    public static int $count = 0;
    
    public static function increment(): void {
        self::$count++;
    }
    
    public static function getCount(): int {
        return self::$count;
    }
}

Counter::increment();
Counter::increment();
echo "Count: " . Counter::getCount();

Static members belong to the class rather than instances. They're accessed
with :: instead of -&gt;. The self keyword
refers to the current class. Static properties maintain their value across all
instances. They're useful for class-level data and utilities.

## Abstract Classes

This example shows an abstract class that can't be instantiated directly.

abstract.php
  

&lt;?php

declare(strict_types=1);

abstract class Shape {
    abstract public function area(): float;
    
    public function describe(): string {
        return "This shape has an area of " . $this-&gt;area();
    }
}

class Circle extends Shape {
    private float $radius;
    
    public function __construct(float $radius) {
        $this-&gt;radius = $radius;
    }
    
    public function area(): float {
        return pi() * pow($this-&gt;radius, 2);
    }
}

$circle = new Circle(5);
echo $circle-&gt;describe();

Abstract classes can't be instantiated and may contain abstract methods.
Child classes must implement all abstract methods. They provide common
interfaces for related classes. This enforces consistent behavior across
subclasses while allowing implementation details to vary.

## Interfaces

This example demonstrates implementing an interface with the implements keyword.

interface.php
  

&lt;?php

declare(strict_types=1);

interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        file_put_contents('log.txt', $message . PHP_EOL, FILE_APPEND);
    }
}

$logger = new FileLogger();
$logger-&gt;log("This is a test message");

Interfaces define method signatures without implementations. Classes can
implement multiple interfaces. They provide contracts that implementing
classes must follow. Interfaces enable polymorphism by allowing different
classes to be used interchangeably. They're essential for dependency injection.

## Best Practices

- **Single Responsibility:** Each class should have one clear purpose.

- **Encapsulation:** Hide internal details with proper visibility.

- **Composition:** Favor object composition over inheritance.

- **Type Hints:** Use them for method parameters and return types.

- **Documentation:** Document class purpose and usage with comments.

## Source

[PHP OOP Documentation](https://www.php.net/manual/en/language.oop5.php)

This tutorial covered PHP classes with practical examples showing basic usage,
inheritance, visibility, static members, abstract classes, and interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).