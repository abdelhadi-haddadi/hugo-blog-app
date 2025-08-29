+++
title = "PHP private Keyword"
date = 2025-08-29T20:04:38.156+01:00
draft = false
description = "PHP private keyword tutorial shows how to use private visibility in PHP. Learn encapsulation with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP private Keyword

last modified April 16, 2025

The PHP private keyword is a visibility modifier used in object-
oriented programming. It restricts access to class members (properties and
methods) to only within the class itself. This implements encapsulation.

## Basic Definitions

The private keyword makes class members inaccessible from outside
the class. This includes child classes that extend the parent class. Private
members can only be accessed within the same class.

Private visibility is stricter than protected (allows child class
access) and public (allows any access). It's the most restrictive
visibility modifier in PHP.

Syntax: private $propertyName; for properties and
private function methodName() {} for methods. Private members
help prevent accidental modification from outside the class.

## Basic Private Property

This example demonstrates a simple class with a private property.

basic_private_property.php
  

&lt;?php

declare(strict_types=1);

class BankAccount {
    private float $balance = 0.0;
    
    public function deposit(float $amount): void {
        $this-&gt;balance += $amount;
    }
    
    public function getBalance(): float {
        return $this-&gt;balance;
    }
}

$account = new BankAccount();
$account-&gt;deposit(100.50);
echo "Balance: " . $account-&gt;getBalance();

The $balance property is private and can't be accessed directly.
We use public methods to interact with it. This protects the balance from
direct modification. The deposit method ensures controlled access.

## Private Method

This example shows a class with a private helper method.

private_method.php
  

&lt;?php

declare(strict_types=1);

class User {
    private string $username;
    
    public function __construct(string $username) {
        $this-&gt;username = $this-&gt;sanitizeUsername($username);
    }
    
    private function sanitizeUsername(string $username): string {
        return trim(strtolower($username));
    }
    
    public function getUsername(): string {
        return $this-&gt;username;
    }
}

$user = new User("  Admin ");
echo "Username: " . $user-&gt;getUsername();

The sanitizeUsername method is private and used internally.
It processes the username before storage. External code can't call this
method directly. This hides implementation details.

## Private Constructor

This example demonstrates using a private constructor for singleton pattern.

private_constructor.php
  

&lt;?php

declare(strict_types=1);

class Database {
    private static ?Database $instance = null;
    
    private function __construct() {
        // Private constructor prevents direct instantiation
    }
    
    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
}

$db = Database::getInstance();

The private constructor prevents creating instances with new.
The class controls its instantiation via getInstance. This
ensures only one instance exists. It's a common singleton pattern.

## Private in Inheritance

This example shows how private members behave in inheritance.

private_inheritance.php
  

&lt;?php

declare(strict_types=1);

class ParentClass {
    private string $secret = "Parent secret";
    protected string $familySecret = "Family secret";
    
    public function reveal(): void {
        echo $this-&gt;secret; // Accessible here
    }
}

class ChildClass extends ParentClass {
    public function tryReveal(): void {
        // echo $this-&gt;secret; // Error: Cannot access private property
        echo $this-&gt;familySecret; // Works: protected is accessible
    }
}

$child = new ChildClass();
$child-&gt;reveal();
$child-&gt;tryReveal();

The private $secret isn't accessible in the child class.
The protected $familySecret is accessible. This shows
the difference between private and protected visibility.

## Private Static Property

This example demonstrates a private static property with counter.

private_static.php
  

&lt;?php

declare(strict_types=1);

class Counter {
    private static int $count = 0;
    
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
echo "Count: " . Counter::getCount();

The private static $count tracks instances across all objects.
It's shared among all instances but can't be accessed directly. The static
method provides controlled access to the counter.

## Private Constants

This example shows private class constants introduced in PHP 7.1.

private_constants.php
  

&lt;?php

declare(strict_types=1);

class MathOperations {
    private const PI = 3.14159265359;
    
    public static function circleArea(float $radius): float {
        return self::PI * $radius * $radius;
    }
}

echo "Area: " . MathOperations::circleArea(5);
// echo MathOperations::PI; // Error: Cannot access private constant

The private constant PI is only accessible within the class.
It's used internally by the circleArea method. Constants
can't be modified, but private restricts their visibility.

## Private Property Access via Reflection

This advanced example shows accessing private properties with Reflection.

reflection_private.php
  

&lt;?php

declare(strict_types=1);

class SecretHolder {
    private string $secret = "Top secret";
}

$holder = new SecretHolder();
$reflector = new ReflectionClass($holder);
$property = $reflector-&gt;getProperty('secret');
$property-&gt;setAccessible(true);

echo "The secret is: " . $property-&gt;getValue($holder);

Reflection can bypass private visibility for special cases like testing.
This should be used cautiously as it breaks encapsulation. The example
gets the private property value despite its visibility.

## Best Practices

- **Encapsulation:** Make properties private by default.

- **Accessors:** Use public getters/setters for controlled access.

- **Helper Methods:** Mark internal methods as private.

- **Immutable Objects:** Combine private with readonly properties.

- **Documentation:** Document private members for maintainers.

## Source

[PHP Visibility Documentation](https://www.php.net/manual/en/language.oop5.visibility.php)

This tutorial covered PHP private keyword with practical examples showing
property, method, constructor, and constant usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).