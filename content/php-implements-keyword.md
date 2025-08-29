+++
title = "PHP implements Keyword"
date = 2025-08-29T20:04:27.637+01:00
draft = false
description = "PHP implements keyword tutorial shows how to use interfaces in PHP. Learn interface implementation with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP implements Keyword

last modified April 16, 2025

The PHP implements keyword is used to implement interfaces in
object-oriented programming. It creates a contract that classes must follow.
Interfaces define method signatures without implementations. Classes using
implements must provide concrete method implementations.

## Basic Definitions

An interface is a blueprint of methods that implementing classes must define.
The implements keyword indicates a class will fulfill an interface's
contract. Interfaces can contain method signatures and constants.

Unlike classes, interfaces cannot contain property definitions or method bodies.
All methods in an interface are implicitly public. A class can implement multiple
interfaces, separated by commas.

Syntax: class ClassName implements InterfaceName { ... }. The
implementing class must define all methods declared in the interface. Failure
to do so results in a fatal error.

## Basic Interface Implementation

This example demonstrates a simple interface implementation with one method.

basic_interface.php
  

&lt;?php

interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        file_put_contents('app.log', $message, FILE_APPEND);
    }
}

$logger = new FileLogger();
$logger-&gt;log("Error: File not found\n");

The Logger interface declares a log method. The
FileLogger class implements this interface and provides the
concrete method. The class must match the interface's method signature exactly.

## Implementing Multiple Interfaces

This example shows a class implementing multiple interfaces simultaneously.

multiple_interfaces.php
  

&lt;?php

interface Serializable {
    public function serialize(): string;
}

interface Renderable {
    public function render(): string;
}

class Widget implements Serializable, Renderable {
    private $data;
    
    public function __construct(array $data) {
        $this-&gt;data = $data;
    }
    
    public function serialize(): string {
        return json_encode($this-&gt;data);
    }
    
    public function render(): string {
        return implode(', ', $this-&gt;data);
    }
}

$widget = new Widget(['a', 'b', 'c']);
echo $widget-&gt;serialize();
echo $widget-&gt;render();

The WidgetSerializable and
Renderable interfaces. It must provide implementations for all
methods from both interfaces. Multiple interfaces are separated by commas.

## Interface Inheritance

This example demonstrates an interface extending another interface.

interface_inheritance.php
  

&lt;?php

interface Animal {
    public function eat(): void;
}

interface Mammal extends Animal {
    public function breathe(): void;
}

class Dog implements Mammal {
    public function eat(): void {
        echo "Dog is eating\n";
    }
    
    public function breathe(): void {
        echo "Dog is breathing\n";
    }
}

$dog = new Dog();
$dog-&gt;eat();
$dog-&gt;breathe();

The Mammal interface extends Animal, inheriting its
methods. Dog implements Mammal and must provide both
eat and breathe methods. Interface inheritance creates
hierarchies of contracts.

## Interface with Constants

This example shows an interface defining constants that implementing classes can use.

interface_constants.php
  

&lt;?php

interface HttpStatus {
    const OK = 200;
    const NOT_FOUND = 404;
    const SERVER_ERROR = 500;
}

class Response implements HttpStatus {
    public function send(int $code): void {
        if ($code === self::OK) {
            echo "Request successful";
        } elseif ($code === self::NOT_FOUND) {
            echo "Resource not found";
        } else {
            echo "Server error";
        }
    }
}

$response = new Response();
$response-&gt;send(HttpStatus::OK);

The HttpStatus interface defines status code constants. The
Response class implements the interface and accesses the constants
using self::. Interface constants are always public and cannot be
overridden.

## Type Hinting with Interfaces

This example demonstrates using interfaces for type hinting in function parameters.

type_hinting.php
  

&lt;?php

interface Cache {
    public function get(string $key): ?string;
    public function set(string $key, string $value): void;
}

class RedisCache implements Cache {
    public function get(string $key): ?string {
        // Simulate Redis get
        return "value_for_$key";
    }
    
    public function set(string $key, string $value): void {
        // Simulate Redis set
        echo "Setting $key to $value\n";
    }
}

function storeData(Cache $cache, string $key, string $value): void {
    $cache-&gt;set($key, $value);
}

$cache = new RedisCache();
storeData($cache, 'user1', 'John Doe');

The storeData function accepts any object implementing the
Cache interface. This allows different cache implementations to be
used interchangeably. Type hinting with interfaces enables polymorphism.

## Abstract Class Implementing Interface

This example shows an abstract class partially implementing an interface.

abstract_implementation.php
  

&lt;?php

interface Database {
    public function connect(): void;
    public function query(string $sql): array;
    public function disconnect(): void;
}

abstract class BaseDatabase implements Database {
    protected $connection;
    
    public function connect(): void {
        $this-&gt;connection = true;
        echo "Connected\n";
    }
    
    abstract public function query(string $sql): array;
    
    public function disconnect(): void {
        $this-&gt;connection = false;
        echo "Disconnected\n";
    }
}

class MySQLDatabase extends BaseDatabase {
    public function query(string $sql): array {
        echo "Executing: $sql\n";
        return ['result1', 'result2'];
    }
}

$db = new MySQLDatabase();
$db-&gt;connect();
$db-&gt;query("SELECT * FROM users");
$db-&gt;disconnect();

The BaseDatabase abstract class implements Database but
leaves query abstract. Concrete class MySQLDatabase
completes the implementation. Abstract classes can provide partial interface
implementations.

## Interface for Dependency Injection

This example demonstrates using interfaces for dependency injection.

dependency_injection.php
  

&lt;?php

interface PaymentGateway {
    public function charge(float $amount): bool;
}

class StripeGateway implements PaymentGateway {
    public function charge(float $amount): bool {
        echo "Charging \$$amount with Stripe\n";
        return true;
    }
}

class PayPalGateway implements PaymentGateway {
    public function charge(float $amount): bool {
        echo "Charging \$$amount with PayPal\n";
        return true;
    }
}

class OrderProcessor {
    private $gateway;
    
    public function __construct(PaymentGateway $gateway) {
        $this-&gt;gateway = $gateway;
    }
    
    public function process(float $amount): bool {
        return $this-&gt;gateway-&gt;charge($amount);
    }
}

$processor = new OrderProcessor(new StripeGateway());
$processor-&gt;process(100.50);

The OrderProcessor depends on the PaymentGateway
interface, not concrete implementations. This allows easy swapping of payment
providers. Interfaces enable loose coupling between components.

## Best Practices

- **Naming:** Use descriptive names ending with "able" (e.g., Loggable).

- **Single Responsibility:** Keep interfaces focused on one capability.

- **Documentation:** Clearly document interface purpose and usage.

- **Segregation:** Follow Interface Segregation Principle (ISP).

- **Testing:** Mock interfaces for easier unit testing.

## Source

[PHP Interfaces Documentation](https://www.php.net/manual/en/language.oop5.interfaces.php)

This tutorial covered PHP interface implementation with practical examples
showing the implements keyword usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).