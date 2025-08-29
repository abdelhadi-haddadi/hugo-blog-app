+++
title = "PHP instanceof Operator"
date = 2025-08-29T20:04:28.756+01:00
draft = false
description = "PHP instanceof tutorial shows how to use type checking in PHP. Learn instanceof with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP instanceof Operator

last modified April 16, 2025

The PHP instanceof keyword is used to determine if an object is an
instance of a specific class or interface. It's essential for type checking in
object-oriented PHP programming. This operator helps ensure type safety.

## Basic Definitions

The instanceof operator checks if an object is an instance of a
class. It can also verify if an object implements an interface. The operator
returns true if the object matches the specified type.

Syntax: $object instanceof ClassName or
$object instanceof InterfaceName. The left operand is the object
to check. The right operand is the class/interface name.

The operator also works with parent classes and inherited interfaces. It's
useful for polymorphism and type checking before method calls.

## Basic Class Check

This example demonstrates checking if an object is an instance of a class.

basic_instanceof.php
  

&lt;?php

class Car {}
$myCar = new Car();

if ($myCar instanceof Car) {
    echo "The object is a Car.";
} else {
    echo "The object is not a Car.";
}

The code creates a Car object and checks its type. The instanceof operator
returns true because $myCar is a Car instance. This is the simplest use case.

## Interface Implementation Check

This example shows how to check if an object implements an interface.

interface_check.php
  

&lt;?php

interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        file_put_contents('log.txt', $message, FILE_APPEND);
    }
}

$logger = new FileLogger();

if ($logger instanceof Logger) {
    echo "The object implements Logger interface.";
    $logger-&gt;log("Test message");
}

The code defines a Logger interface and FileLogger implementation. The instanceof
check verifies interface implementation before calling interface methods. This
ensures type safety.

## Inheritance Check

This example demonstrates checking parent-child class relationships.

inheritance_check.php
  

&lt;?php

class Animal {}
class Dog extends Animal {}

$dog = new Dog();

if ($dog instanceof Animal) {
    echo "Dog is an Animal (parent class check).";
}

if ($dog instanceof Dog) {
    echo "Dog is a Dog (same class check).";
}

The code shows that instanceof returns true for both the actual class and its
parent. This is useful when working with polymorphic objects. The check works
through the entire inheritance chain.

## Checking Against Multiple Classes

This example shows how to check an object against multiple possible classes.

multiple_classes.php
  

&lt;?php

class Shape {}
class Circle extends Shape {}
class Square extends Shape {}

function draw(Shape $shape): void {
    if ($shape instanceof Circle) {
        echo "Drawing a circle.";
    } elseif ($shape instanceof Square) {
        echo "Drawing a square.";
    } else {
        echo "Drawing unknown shape.";
    }
}

draw(new Circle());
draw(new Square());

The code demonstrates runtime type checking for different shape types. The
function accepts any Shape but behaves differently per concrete type. This
pattern is common in polymorphic code.

## Checking Non-Objects

This example shows how instanceof behaves with non-object values.

non_objects.php
  

&lt;?php

class Test {}

$values = [
    new Test(),
    'hello',
    42,
    null,
    function() {}
];

foreach ($values as $value) {
    if ($value instanceof Test) {
        echo "Test object\n";
    } else {
        echo gettype($value) . " is not a Test object\n";
    }
}

The code tests various value types with instanceof. Only actual Test objects
pass the check. Other types (string, int, null, closure) fail. The operator
only works with objects.

## Namespaced Classes

This example demonstrates using instanceof with namespaced classes.

namespaces.php
  

&lt;?php

namespace MyApp\Models;

class User {}

$user = new User();

if ($user instanceof User) {
    echo "Instance of User (relative check).";
}

if ($user instanceof \MyApp\Models\User) {
    echo "Instance of fully qualified User.";
}

The code shows two ways to check namespaced classes. You can use the class
name directly if in the same namespace. For cross-namespace checks, use the
fully qualified name. Both methods work correctly.

## Using with Traits

This example demonstrates checking for trait usage with instanceof.

traits.php
  

&lt;?php

trait Loggable {
    public function log(string $message): void {
        echo $message;
    }
}

class Product {
    use Loggable;
}

$product = new Product();

if ($product instanceof Product) {
    echo "Product instance (class check).";
}

// Note: You cannot directly check for traits with instanceof

The code shows that instanceof only checks classes and interfaces, not traits.
To check for trait usage, you'd need alternative approaches like method_exists.
Traits are compiler-assisted copy-paste, not runtime types.

## Best Practices

- **Type Safety:** Use instanceof before type-specific operations.

- **Polymorphism:** Prefer polymorphism over excessive type checking.

- **Interfaces:** Check against interfaces when possible for flexibility.

- **Performance:** Avoid instanceof in tight loops when possible.

- **Alternatives:** Consider type hints for method parameters.

## Source

[PHP instanceof Documentation](https://www.php.net/manual/en/language.operators.type.php)

This tutorial covered PHP's instanceof operator with practical examples
showing class, interface, and inheritance checks in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).