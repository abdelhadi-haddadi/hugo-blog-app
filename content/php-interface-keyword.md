+++
title = "PHP interface Keyword"
date = 2025-08-29T20:04:29.891+01:00
draft = false
description = "PHP interface tutorial shows how to use interfaces in PHP. Learn interfaces with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP interface Keyword

last modified April 16, 2025

The PHP interface keyword defines a contract for classes to implement.
Interfaces specify what methods a class must implement without defining how.
They enable polymorphism and help create loosely coupled systems.

## Basic Definitions

An interface is a blueprint of methods that implementing classes must define.
It contains only method signatures without any implementation. All methods in
an interface are implicitly public and abstract.

Classes implement interfaces using the implements keyword. A class
can implement multiple interfaces. Interfaces can extend other interfaces using
the extends keyword.

Syntax: interface InterfaceName { public function methodName(); }.
Interfaces cannot contain properties (except constants) or method bodies.

## Basic Interface Implementation

This example demonstrates a simple interface and a class implementing it.

basic_interface.php
  

&lt;?php

declare(strict_types=1);

interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        file_put_contents('app.log', $message, FILE_APPEND);
    }
}

$logger = new FileLogger();
$logger-&gt;log("User logged in\n");

The Logger interface defines one method that must be implemented.
FileLogger implements this interface by providing the method body.
This ensures all loggers have the same basic functionality. The code writes
messages to a log file.

## Multiple Interface Implementation

This example shows a class implementing multiple interfaces.

multiple_interfaces.php
  

&lt;?php

declare(strict_types=1);

interface Renderable {
    public function render(): string;
}

interface Cacheable {
    public function cache(): void;
}

class Page implements Renderable, Cacheable {
    public function render(): string {
        return "&lt;h1&gt;Welcome&lt;/h1&gt;";
    }
    
    public function cache(): void {
        echo "Page cached\n";
    }
}

$page = new Page();
echo $page-&gt;render();
$page-&gt;cache();

The Page class implements both Renderable and
Cacheable interfaces. It must provide implementations for all
methods from both interfaces. This allows objects to have multiple roles.
The class can be used wherever either interface is expected.

## Interface Inheritance

This example demonstrates one interface extending another.

interface_inheritance.php
  

&lt;?php

declare(strict_types=1);

interface Vehicle {
    public function start(): void;
    public function stop(): void;
}

interface Car extends Vehicle {
    public function accelerate(float $speed): void;
}

class Sedan implements Car {
    public function start(): void {
        echo "Engine started\n";
    }
    
    public function stop(): void {
        echo "Engine stopped\n";
    }
    
    public function accelerate(float $speed): void {
        echo "Accelerating to {$speed} km/h\n";
    }
}

$sedan = new Sedan();
$sedan-&gt;start();
$sedan-&gt;accelerate(60);
$sedan-&gt;stop();

The Car interface extends Vehicle, inheriting its
methods. Sedan must implement all methods from both interfaces.
This creates a hierarchy of contracts. The class provides concrete
implementations for all required methods.

## Interface Constants

This example shows how to define and use constants in interfaces.

interface_constants.php
  

&lt;?php

declare(strict_types=1);

interface MathOperations {
    const PI = 3.14159;
    
    public function calculateArea(float $radius): float;
}

class Circle implements MathOperations {
    public function calculateArea(float $radius): float {
        return self::PI * $radius * $radius;
    }
}

$circle = new Circle();
echo "Area: " . $circle-&gt;calculateArea(5);

Interfaces can contain constants that implementing classes can access.
Constants are implicitly public, static, and final. The Circle
class uses the PI constant in its area calculation. Interface constants
provide shared values across implementations.

## Type Hinting with Interfaces

This example demonstrates using interfaces for type hinting.

interface_type_hinting.php
  

&lt;?php

declare(strict_types=1);

interface Notifier {
    public function send(string $message): void;
}

class EmailNotifier implements Notifier {
    public function send(string $message): void {
        echo "Email sent: {$message}\n";
    }
}

class NotificationService {
    public function __construct(private Notifier $notifier) {}
    
    public function notify(string $message): void {
        $this-&gt;notifier-&gt;send($message);
    }
}

$service = new NotificationService(new EmailNotifier());
$service-&gt;notify("Hello World");

The NotificationService accepts any Notifier
implementation. This allows flexible dependency injection. The service
doesn't need to know the concrete notifier class. This promotes loose
coupling and easier testing.

## Interface vs Abstract Class

This example compares interfaces with abstract classes.

interface_vs_abstract.php
  

&lt;?php

declare(strict_types=1);

// Interface
interface Drawable {
    public function draw(): void;
}

// Abstract class
abstract class Shape {
    protected string $color;
    
    public function __construct(string $color) {
        $this-&gt;color = $color;
    }
    
    abstract public function getArea(): float;
}

// Concrete class implementing both
class Circle extends Shape implements Drawable {
    private float $radius;
    
    public function __construct(string $color, float $radius) {
        parent::__construct($color);
        $this-&gt;radius = $radius;
    }
    
    public function draw(): void {
        echo "Drawing a {$this-&gt;color} circle\n";
    }
    
    public function getArea(): float {
        return pi() * $this-&gt;radius * $this-&gt;radius;
    }
}

$circle = new Circle("red", 5);
$circle-&gt;draw();
echo "Area: " . $circle-&gt;getArea();

Interfaces define contracts while abstract classes can provide partial
implementation. A class can extend one abstract class but implement multiple
interfaces. The Circle inherits from Shape and
implements Drawable. This shows how to combine both approaches.

## Modern PHP: Interface Features

This example demonstrates modern PHP interface features.

modern_interface.php
  

&lt;?php

declare(strict_types=1);

// Interface with return type declaration
interface Calculator {
    public function add(float $a, float $b): float;
    
    // Default implementation (PHP 8.0+)
    public function subtract(float $a, float $b): float {
        return $a - $b;
    }
}

class BasicCalculator implements Calculator {
    public function add(float $a, float $b): float {
        return $a + $b;
    }
}

$calc = new BasicCalculator();
echo "5 + 3 = " . $calc-&gt;add(5, 3) . "\n";
echo "5 - 3 = " . $calc-&gt;subtract(5, 3) . "\n";

PHP 8.0 introduced default method implementations in interfaces. The example
shows return type declarations and a default method. Classes can override
default methods. This provides more flexibility in interface design.
The BasicCalculator only implements the add method.

## Best Practices

- **Single Responsibility:** Keep interfaces focused on one role.

- **Naming:** Use descriptive names ending with '-able' or '-er'.

- **Method Count:** Prefer small interfaces with few methods.

- **Documentation:** Clearly document interface purpose and usage.

- **Segregation:** Follow Interface Segregation Principle.

## Source

[PHP Interfaces Documentation](https://www.php.net/manual/en/language.oop5.interfaces.php)

This tutorial covered PHP interfaces with practical examples showing basic
usage, multiple implementation, inheritance, and modern features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).