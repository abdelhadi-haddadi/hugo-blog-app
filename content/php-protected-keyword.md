+++
title = "PHP protected Keyword"
date = 2025-08-29T20:04:39.281+01:00
draft = false
description = "PHP protected keyword tutorial shows how to use protected visibility in PHP. Learn protected access with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP protected Keyword

last modified April 16, 2025

The PHP protected keyword is a visibility modifier used in object-
oriented programming. It controls access to class members (properties and
methods). Protected members are accessible within the class and its child
classes.

## Basic Definitions

The protected keyword makes class members available to the class
itself and any classes that extend it. This is more restrictive than public
but less restrictive than private visibility.

Protected members cannot be accessed from outside the class hierarchy. They
are designed for internal class implementation details that child classes
might need to access.

Syntax: protected $property; or protected function method() {}.
The protected modifier can be applied to both properties and methods.

## Basic Protected Property

This example demonstrates a simple protected property in a parent class.

basic_protected.php
  

&lt;?php

declare(strict_types=1);

class Vehicle {
    protected $model;
    
    public function setModel(string $model): void {
        $this-&gt;model = $model;
    }
}

class Car extends Vehicle {
    public function getModel(): string {
        return $this-&gt;model;
    }
}

$car = new Car();
$car-&gt;setModel("Toyota");
echo $car-&gt;getModel();

The $model property is protected in the Vehicle class. The Car
class can access it because it extends Vehicle. The property cannot be
accessed directly from outside these classes.

## Protected Method Inheritance

This example shows how protected methods can be used in inheritance.

protected_method.php
  

&lt;?php

declare(strict_types=1);

class Animal {
    protected function makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal {
    public function bark(): string {
        return $this-&gt;makeSound() . " - Woof!";
    }
}

$dog = new Dog();
echo $dog-&gt;bark();

The makeSound method is protected in Animal. The Dog class can
call this method internally. External code cannot call makeSound() directly.
This enforces encapsulation while allowing inheritance.

## Accessing Protected Members from Child

This example demonstrates accessing protected members from a child class.

child_access.php
  

&lt;?php

declare(strict_types=1);

class BankAccount {
    protected $balance = 0;
    
    protected function deposit(int $amount): void {
        $this-&gt;balance += $amount;
    }
}

class SavingsAccount extends BankAccount {
    public function addMoney(int $amount): void {
        $this-&gt;deposit($amount);
        echo "New balance: " . $this-&gt;balance;
    }
}

$account = new SavingsAccount();
$account-&gt;addMoney(100);

The SavingsAccount can access both the protected property $balance
and method deposit from its parent. The public addMoney()
method provides controlled access to these protected members.

## Protected Constructor

This example shows a protected constructor used in a singleton pattern.

protected_constructor.php
  

&lt;?php

declare(strict_types=1);

class Logger {
    protected function __construct() {
        echo "Logger initialized";
    }
    
    public static function getInstance(): self {
        static $instance = null;
        if (null === $instance) {
            $instance = new static();
        }
        return $instance;
    }
}

$logger = Logger::getInstance();

The constructor is protected to prevent direct instantiation. The static
getInstance() method controls object creation. This is a common pattern
for singleton classes.

## Overriding Protected Methods

This example demonstrates overriding protected methods in child classes.

method_override.php
  

&lt;?php

declare(strict_types=1);

class Shape {
    protected function calculateArea(): float {
        return 0;
    }
    
    public function getArea(): float {
        return $this-&gt;calculateArea();
    }
}

class Circle extends Shape {
    protected float $radius;
    
    public function __construct(float $radius) {
        $this-&gt;radius = $radius;
    }
    
    protected function calculateArea(): float {
        return pi() * $this-&gt;radius * $this-&gt;radius;
    }
}

$circle = new Circle(5);
echo $circle-&gt;getArea();

The Circle class overrides the protected calculateArea method
from Shape. The public getArea() method provides access to the calculation.
This shows polymorphic behavior with protected methods.

## Protected Properties in Traits

This example shows protected properties used within traits.

trait_protected.php
  

&lt;?php

declare(strict_types=1);

trait Loggable {
    protected $logMessages = [];
    
    protected function addLog(string $message): void {
        $this-&gt;logMessages[] = $message;
    }
    
    public function getLogs(): array {
        return $this-&gt;logMessages;
    }
}

class User {
    use Loggable;
    
    public function login(): void {
        $this-&gt;addLog("User logged in");
    }
}

$user = new User();
$user-&gt;login();
print_r($user-&gt;getLogs());

The trait defines protected property $logMessages and method
addLog. The User class using the trait can access these
protected members. Traits provide horizontal code reuse with visibility
control.

## Protected vs Private

This example compares protected and private visibility.

protected_vs_private.php
  

&lt;?php

declare(strict_types=1);

class ParentClass {
    private $privateVar = "private";
    protected $protectedVar = "protected";
}

class ChildClass extends ParentClass {
    public function showProtected(): string {
        return $this-&gt;protectedVar;
    }
    
    public function showPrivate(): string {
        return $this-&gt;privateVar; // This will cause an error
    }
}

$child = new ChildClass();
echo $child-&gt;showProtected();
// echo $child-&gt;showPrivate(); // Would cause fatal error

The child class can access the protected property but not the private one.
This demonstrates the key difference between protected and private visibility.
Protected allows inheritance access while private restricts to the defining
class only.

## Best Practices

- **Encapsulation:** Use protected for implementation details that child classes need.

- **Documentation:** Clearly document protected members for inheriting classes.

- **Access Control:** Prefer protected over public for internal class APIs.

- **Testing:** Test protected methods through public interfaces or reflection.

- **Design:** Consider using protected abstract methods for template methods.

## Source

[PHP Visibility Documentation](https://www.php.net/manual/en/language.oop5.visibility.php)

This tutorial covered PHP protected keyword with practical examples showing
protected properties and methods in various object-oriented scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).