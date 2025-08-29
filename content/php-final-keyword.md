+++
title = "PHP final Keyword"
date = 2025-08-29T20:04:21.966+01:00
draft = false
description = "PHP final keyword tutorial shows how to use final to prevent inheritance and method overriding in PHP. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP final Keyword

last modified April 16, 2025

The PHP final keyword is used to restrict inheritance and method
overriding in object-oriented programming. When applied to a class, it prevents
the class from being extended. When applied to a method, it prevents the method
from being overridden in child classes.

## Basic Definitions

The final keyword can be applied to both classes and methods. A
final class cannot be inherited by any other class. A final method cannot be
overridden by any child class.

Final classes are often used for security or design reasons when you want to
ensure that certain functionality cannot be modified. Final methods are used
when you want to preserve the original implementation in all child classes.

Syntax: final class ClassName {} for classes and final public function methodName() {}
for methods. The final keyword is placed before the class or method declaration.

## Final Class Example

This example demonstrates how to create a final class that cannot be extended.

final_class.php
  

&lt;?php

declare(strict_types=1);

final class DatabaseConnection {
    public function connect(): void {
        echo "Connecting to database...";
    }
}

// This will cause a fatal error
// class MySQLConnection extends DatabaseConnection {}

The DatabaseConnection class is declared as final, so any attempt
to extend it will result in a fatal error. This ensures the class implementation
remains unchanged. Final classes are often used for critical system components.

## Final Method Example

This example shows how to create a final method that cannot be overridden.

final_method.php
  

&lt;?php

declare(strict_types=1);

class PaymentProcessor {
    final public function processPayment(float $amount): void {
        echo "Processing payment of {$amount}";
    }
}

class CreditCardProcessor extends PaymentProcessor {
    // This will cause a fatal error
    // public function processPayment(float $amount): void {}
}

The processPayment method is declared as final in the parent class.
Any attempt to override it in child classes will cause an error. This preserves
the original payment processing logic. Other non-final methods can still be
overridden.

## Final Class with Final Methods

This example combines both final class and final method concepts.

final_class_method.php
  

&lt;?php

declare(strict_types=1);

final class MathOperations {
    final public static function add(int $a, int $b): int {
        return $a + $b;
    }
    
    final public static function multiply(int $a, int $b): int {
        return $a * $b;
    }
}

echo MathOperations::add(5, 3); // Outputs 8

The MathOperations class is final and contains final static methods.
This creates a utility class that cannot be extended or modified. All methods
must be used exactly as implemented. This is common for mathematical operations.

## Final in Inheritance Chain

This example shows how final methods work in a multi-level inheritance chain.

inheritance_chain.php
  

&lt;?php

declare(strict_types=1);

class Vehicle {
    final public function startEngine(): void {
        echo "Engine started";
    }
}

class Car extends Vehicle {
    // Can't override startEngine()
    public function drive(): void {
        $this-&gt;startEngine();
        echo "Car is moving";
    }
}

class SportsCar extends Car {
    // Can't override startEngine() here either
}

The startEngine method is final in the Vehicle class.
This prevents any child or grandchild classes from overriding it. The method
can still be called normally. This ensures consistent engine startup behavior.

## Final with Abstract Class

This example demonstrates using final methods in an abstract class.

abstract_final.php
  

&lt;?php

declare(strict_types=1);

abstract class Logger {
    final public function log(string $message): void {
        $this-&gt;writeToLog($this-&gt;formatMessage($message));
    }
    
    abstract protected function writeToLog(string $message): void;
    
    final protected function formatMessage(string $message): string {
        return date('Y-m-d H:i:s') . " - " . $message;
    }
}

class FileLogger extends Logger {
    protected function writeToLog(string $message): void {
        file_put_contents('app.log', $message, FILE_APPEND);
    }
    
    // Can't override formatMessage()
}

The abstract Logger class has a final log method that
calls abstract and final protected methods. Child classes must implement the
abstract method but cannot modify the final methods. This creates a flexible
yet controlled logging framework.

## Final in Interface Implementation

This example shows how final works when implementing an interface.

interface_final.php
  

&lt;?php

declare(strict_types=1);

interface CacheInterface {
    public function get(string $key): ?string;
    public function set(string $key, string $value): void;
}

final class RedisCache implements CacheInterface {
    final public function get(string $key): ?string {
        // Redis implementation
        return "Value for {$key}";
    }
    
    final public function set(string $key, string $value): void {
        // Redis implementation
        echo "Setting {$key} to {$value}";
    }
}

The RedisCache class is final and implements an interface. Its
methods are also final, making this a complete, unmodifiable implementation.
This pattern is useful when you want to enforce a specific cache implementation.
Interface methods cannot be declared final in the interface itself.

## Final Class with Constructor

This example demonstrates a final class with a final constructor.

final_constructor.php
  

&lt;?php

declare(strict_types=1);

final class Configuration {
    private array $settings;
    
    final public function __construct(array $settings) {
        $this-&gt;settings = $settings;
    }
    
    final public function get(string $key): mixed {
        return $this-&gt;settings[$key] ?? null;
    }
}

$config = new Configuration(['debug' =&gt; true]);
echo $config-&gt;get('debug') ? 'Debug on' : 'Debug off';

The Configuration class is final with a final constructor. This
ensures the configuration loading mechanism cannot be modified. The class
provides read-only access to settings. This is a common security pattern for
configuration management.

## Best Practices

- **Security:** Use final for classes that shouldn't be modified for security reasons.

- **Design:** Mark methods as final when their behavior must remain consistent.

- **Documentation:** Clearly document why a class or method is final.

- **Testing:** Final classes are easier to test as behavior can't change.

- **Balance:** Don't overuse final as it reduces flexibility in inheritance.

## Source

[PHP final Keyword Documentation](https://www.php.net/manual/en/language.oop5.final.php)

This tutorial covered the PHP final keyword with practical examples showing
how to prevent inheritance and method overriding in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).