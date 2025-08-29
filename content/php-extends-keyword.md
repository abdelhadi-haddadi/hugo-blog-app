+++
title = "PHP extends Keyword"
date = 2025-08-29T20:04:20.838+01:00
draft = false
description = "PHP extends keyword tutorial shows how to use inheritance in PHP. Learn class inheritance with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP extends Keyword

last modified April 16, 2025

The PHP extends keyword enables class inheritance, a fundamental
OOP concept. It allows a child class to inherit properties and methods from
a parent class. Inheritance promotes code reuse and hierarchical organization.

## Basic Definitions

The extends keyword creates an inheritance relationship between
classes. The child class (subclass) inherits from the parent class (superclass).

Inherited members include public and protected properties and methods. Private
members are not inherited. The child class can override parent methods.

Syntax: class Child extends Parent { ... }. PHP supports single
inheritance - a class can extend only one parent class.

## Basic Inheritance

This example demonstrates simple class inheritance with the extends keyword.

basic_inheritance.php
  

&lt;?php

declare(strict_types=1);

class Vehicle {
    public function startEngine(): void {
        echo "Engine started.\n";
    }
}

class Car extends Vehicle {
    public function drive(): void {
        echo "Car is moving.\n";
    }
}

$car = new Car();
$car-&gt;startEngine();
$car-&gt;drive();

The Car class extends Vehicle, inheriting its methods.
We create a Car instance and call both inherited and new methods. This shows
how child classes gain parent functionality.

## Overriding Methods

This example shows how child classes can override parent class methods.

method_override.php
  

&lt;?php

declare(strict_types=1);

class Animal {
    public function makeSound(): void {
        echo "Some generic animal sound.\n";
    }
}

class Dog extends Animal {
    public function makeSound(): void {
        echo "Bark! Bark!\n";
    }
}

$dog = new Dog();
$dog-&gt;makeSound();

The Dog class overrides the makeSound method from
Animal. When called on a Dog instance, the child version executes.
This demonstrates polymorphism in action.

## Accessing Parent Methods

This example shows how to call parent methods from overridden child methods.

parent_method.php
  

&lt;?php

declare(strict_types=1);

class Person {
    public function greet(): void {
        echo "Hello!\n";
    }
}

class Student extends Person {
    public function greet(): void {
        parent::greet();
        echo "I'm a student.\n";
    }
}

$student = new Student();
$student-&gt;greet();

The Student class extends Person and overrides greet.
Using parent::greet calls the original parent method. This allows
extending rather than replacing parent functionality.

## Protected Members

This example demonstrates using protected properties with inheritance.

protected_members.php
  

&lt;?php

declare(strict_types=1);

class BankAccount {
    protected float $balance = 0;

    public function getBalance(): float {
        return $this-&gt;balance;
    }
}

class SavingsAccount extends BankAccount {
    public function deposit(float $amount): void {
        $this-&gt;balance += $amount;
    }
}

$account = new SavingsAccount();
$account-&gt;deposit(100.50);
echo "Balance: " . $account-&gt;getBalance();

The balance property is protected, so SavingsAccount
can access it directly. Protected members are visible to child classes but not
publicly. This maintains encapsulation while allowing inheritance.

## Constructor Inheritance

This example shows how constructors work with inheritance.

constructor_inheritance.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        protected string $name,
        protected float $price
    ) {}
}

class Book extends Product {
    public function __construct(
        string $name,
        float $price,
        private string $author
    ) {
        parent::__construct($name, $price);
    }
}

$book = new Book("PHP Guide", 29.99, "John Doe");

The Book class extends Product and adds an author
property. It calls the parent constructor to set inherited properties. Child
classes must handle parent constructor requirements.

## Final Classes and Methods

This example demonstrates preventing inheritance with final keyword.

final_keyword.php
  

&lt;?php

declare(strict_types=1);

final class MathUtils {
    public static function square(float $num): float {
        return $num * $num;
    }
}

// This would cause an error:
// class AdvancedMath extends MathUtils {}

echo MathUtils::square(5);

The final keyword prevents MathUtils from being
extended. Final methods cannot be overridden in child classes. This is useful
for security or when implementation should never change.

## Multiple Levels of Inheritance

This example shows a three-level inheritance hierarchy.

multi_level.php
  

&lt;?php

declare(strict_types=1);

class Shape {
    public function draw(): void {
        echo "Drawing a shape.\n";
    }
}

class Polygon extends Shape {
    public function draw(): void {
        echo "Drawing a polygon.\n";
    }
}

class Triangle extends Polygon {
    public function draw(): void {
        echo "Drawing a triangle.\n";
    }
}

$triangle = new Triangle();
$triangle-&gt;draw();

Triangle extends Polygon which extends Shape.
Each level can override methods from its parent. The call to draw() executes the
most specific version in the hierarchy.

## Best Practices

- **Favor Composition:** Use inheritance only for true "is-a" relationships.

- **Limit Depth:** Avoid deep inheritance hierarchies (more than 2-3 levels).

- **Liskov Principle:** Child classes should be substitutable for parents.

- **Document:** Clearly document inheritance relationships.

- **Abstract Classes:** Consider abstract classes for partial implementations.

## Source

[PHP Inheritance Documentation](https://www.php.net/manual/en/language.oop5.inheritance.php)

This tutorial covered PHP inheritance using the extends keyword with practical
examples showing various inheritance scenarios and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).