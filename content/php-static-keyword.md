+++
title = "PHP static Keyword"
date = 2025-08-29T20:04:44.937+01:00
draft = false
description = "PHP static keyword tutorial shows how to use static properties and methods in PHP. Learn static with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP static Keyword

last modified April 16, 2025

The PHP static keyword is used to declare properties and methods
that belong to the class itself, rather than to instances of the class. Static
members can be accessed without creating an object of the class. This makes
them useful for utility functions and class-wide data.

## Basic Definitions

Static properties are variables that belong to the class rather than any
specific instance. They maintain their value throughout the program's execution.
Static properties are shared among all instances of the class.

Static methods are functions that operate on the class level rather than
instance level. They can be called without creating an object. Static methods
cannot access non-static properties or methods directly.

Syntax: class ClassName { public static $property; public static function method() { } }.
Static members are accessed using the scope resolution operator ::.

## Basic Static Property

This example demonstrates a simple static property that tracks instance count.

static_property.php
  

&lt;?php

declare(strict_types=1);

class Counter {
    public static int $count = 0;

    public function __construct() {
        self::$count++;
    }
}

new Counter();
new Counter();
new Counter();

echo "Total instances created: " . Counter::$count;

The Counter class has a static $count property. Each
new instance increments this counter. The value persists across all instances.
We access the static property using ClassName::$property syntax.

## Static Method

This example shows a static method that performs a utility function.

static_method.php
  

&lt;?php

declare(strict_types=1);

class MathUtils {
    public static function square(int $num): int {
        return $num * $num;
    }
}

$result = MathUtils::square(5);
echo "Square of 5 is: " . $result;

The MathUtils class contains a static square method.
We call it directly without creating an instance. Static methods are often
used for functions that don't need object state. They're accessed with ::.

## Static Property with Self

This example demonstrates using self to access static properties.

static_self.php
  

&lt;?php

declare(strict_types=1);

class Logger {
    private static array $logs = [];

    public static function addLog(string $message): void {
        self::$logs[] = date('Y-m-d H:i:s') . ': ' . $message;
    }

    public static function showLogs(): void {
        foreach (self::$logs as $log) {
            echo $log . "&lt;br&gt;";
        }
    }
}

Logger::addLog("System started");
Logger::addLog("User logged in");
Logger::showLogs();

The Logger class uses self to access its static
$logs property. self refers to the current class.
Static methods can only access other static members. The logs persist between method calls.

## Late Static Binding

This example shows how static keyword enables late static binding.

late_binding.php
  

&lt;?php

declare(strict_types=1);

class ParentClass {
    protected static string $name = 'Parent';

    public static function getName(): string {
        return static::$name;
    }
}

class ChildClass extends ParentClass {
    protected static string $name = 'Child';
}

echo ParentClass::getName() . "&lt;br&gt;";
echo ChildClass::getName();

The static keyword in getName enables late static
binding. It resolves to the called class at runtime. Without it, self
would always reference ParentClass. This is crucial for inheritance.

## Static Factory Method

This example demonstrates a static factory method for object creation.

static_factory.php
  

&lt;?php

declare(strict_types=1);

class User {
    private string $name;

    private function __construct(string $name) {
        $this-&gt;name = $name;
    }

    public static function create(string $name): User {
        return new self($name);
    }

    public function getName(): string {
        return $this-&gt;name;
    }
}

$user = User::create('John Doe');
echo "User created: " . $user-&gt;getName();

The User class uses a static factory method create.
This encapsulates object creation logic. The constructor is private, forcing
use of the factory method. This pattern provides more control over instantiation.

## Static Closure

This example shows how to use static with closures to prevent binding.

static_closure.php
  

&lt;?php

declare(strict_types=1);

class Example {
    private string $property = 'instance value';

    public function getClosure() {
        return static function() {
            // Cannot access $this-&gt;property here
            return "Static closure called";
        };
    }
}

$example = new Example();
$closure = $example-&gt;getClosure();
echo $closure();

The static keyword before a closure prevents binding to $this.
This makes the closure independent of any object instance. Attempting to access
non-static members would cause an error. Useful for callbacks that don't need context.

## Singleton Pattern with Static

This example implements the Singleton pattern using static properties.

singleton.php
  

&lt;?php

declare(strict_types=1);

class Database {
    private static ?Database $instance = null;

    private function __construct() {
        // Private constructor
    }

    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function query(string $sql): void {
        echo "Executing: " . $sql;
    }
}

$db = Database::getInstance();
$db-&gt;query("SELECT * FROM users");

The Database class ensures only one instance exists via static
$instance. The constructor is private to prevent direct instantiation.
getInstance controls access to the single instance. This is a
common pattern for shared resources.

## Best Practices

- **Purpose:** Use static for truly class-level functionality.

- **State:** Avoid mutable static state when possible.

- **Testing:** Static methods can make testing more difficult.

- **Scope:** Prefer private/protected static members when appropriate.

- **Performance:** Static calls are slightly faster than instance calls.

## Source

[PHP static Keyword Documentation](https://www.php.net/manual/en/language.oop5.static.php)

This tutorial covered PHP static keyword with practical examples showing static
properties and methods in various scenarios, including advanced patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).