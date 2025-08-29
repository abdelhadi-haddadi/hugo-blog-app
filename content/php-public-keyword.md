+++
title = "PHP public Keyword"
date = 2025-08-29T20:04:39.283+01:00
draft = false
description = "PHP public keyword tutorial shows how to use visibility modifiers in PHP. Learn public access with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP public Keyword

last modified April 16, 2025

The PHP public keyword is a visibility modifier used in object-
oriented programming. It specifies that a property or method can be accessed
from anywhere - both inside and outside the class. Public is the default
visibility if none is specified.

## Basic Definitions

The public keyword makes class members accessible from any scope.
This includes other classes, global scope, and inherited classes. Public
members form the interface of a class.

Visibility modifiers control encapsulation in OOP. PHP has three visibility
levels: public, protected, and private. Public provides the least restriction.

Syntax: public $property; or public function method() {}.
Public can be applied to both properties and methods in class definitions.

## Basic Public Property

This example demonstrates a simple class with a public property.

basic_public_property.php
  

&lt;?php

declare(strict_types=1);

class User {
    public string $name;
}

$user = new User();
$user-&gt;name = "John Doe";

echo "User name: " . $user-&gt;name;

The $name property is declared public, allowing direct access
from outside the class. We create a User instance and set its name property.
Public properties can be both read and modified externally.

## Public Method

This example shows a class with a public method that can be called externally.

public_method.php
  

&lt;?php

declare(strict_types=1);

class Calculator {
    public function add(int $a, int $b): int {
        return $a + $b;
    }
}

$calc = new Calculator();
$result = $calc-&gt;add(5, 3);

echo "Result: " . $result;

The add method is public, making it callable from outside the
Calculator class. Public methods typically represent the class's public API.
They define what operations the class makes available to other code.

## Public vs Private

This example contrasts public and private visibility in the same class.

public_vs_private.php
  

&lt;?php

declare(strict_types=1);

class BankAccount {
    public string $owner;
    private float $balance = 0;

    public function deposit(float $amount): void {
        $this-&gt;balance += $amount;
    }

    public function getBalance(): float {
        return $this-&gt;balance;
    }
}

$account = new BankAccount();
$account-&gt;owner = "Alice";
$account-&gt;deposit(100.50);

echo "{$account-&gt;owner}'s balance: {$account-&gt;getBalance()}";

$owner is public and directly accessible, while $balance
is private. The public methods provide controlled access to the private balance.
This demonstrates encapsulation - hiding implementation details while exposing
necessary functionality.

## Public in Inheritance

This example shows how public members behave in class inheritance.

public_inheritance.php
  

&lt;?php

declare(strict_types=1);

class Animal {
    public string $species;

    public function makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal {
    public function makeSound(): string {
        return "Bark";
    }
}

$dog = new Dog();
$dog-&gt;species = "Canine";
echo "{$dog-&gt;species} says: " . $dog-&gt;makeSound();

The public $species property and makeSound method
are inherited by the Dog class. Public members remain public in child classes.
The Dog class overrides the makeSound() method while keeping it public.

## Public Static Property

This example demonstrates a public static property shared across all instances.

public_static.php
  

&lt;?php

declare(strict_types=1);

class Counter {
    public static int $count = 0;

    public function __construct() {
        self::$count++;
    }

    public static function getCount(): int {
        return self::$count;
    }
}

new Counter();
new Counter();
new Counter();

echo "Total instances: " . Counter::$count;

The public static $count property is accessible via the class name.
Each constructor call increments it. Static public members belong to the class
rather than instances. They can be accessed without creating an object.

## Public Interface Implementation

This example shows public methods implementing an interface.

public_interface.php
  

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
$logger-&gt;log("System started");

Interface methods must be public in implementing classes. The FileLogger's
log method is public as required by the Logger interface.
Public visibility ensures the interface contract is properly fulfilled.

## Public in Traits

This example demonstrates public methods in traits being used by classes.

public_trait.php
  

&lt;?php

declare(strict_types=1);

trait Greeter {
    public function greet(string $name): string {
        return "Hello, $name!";
    }
}

class Person {
    use Greeter;
}

$person = new Person();
echo $person-&gt;greet("John");

The trait's greet method is public and becomes part of the
Person class's public interface. Traits allow code reuse while maintaining
visibility. Public methods in traits remain public when used by classes.

## Best Practices

- **Encapsulation:** Use public only for necessary class API.

- **Consistency:** Keep visibility consistent in inheritance.

- **Documentation:** Document public methods thoroughly.

- **Immutable:** Consider making public properties readonly.

- **Interfaces:** Use interfaces to define public contracts.

## Source

[PHP Visibility Documentation](https://www.php.net/manual/en/language.oop5.visibility.php)

This tutorial covered PHP's public keyword with practical examples showing
public properties, methods, inheritance, and other OOP contexts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).