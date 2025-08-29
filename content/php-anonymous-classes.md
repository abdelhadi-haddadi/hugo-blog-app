+++
title = "PHP Anonymous Classes"
date = 2025-08-29T20:04:08.039+01:00
draft = false
description = "PHP tutorial on anonymous classes, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Anonymous Classes

last modified March 11, 2025

PHP anonymous classes allow you to define and instantiate a class inline, without
giving it a name. They are useful for creating simple, one-off objects or for
implementing interfaces and extending classes on the fly. This tutorial covers
basic and advanced usage of anonymous classes with practical examples.

Anonymous classes are particularly useful in scenarios where you need a class
for a single use and don't want to clutter your code with unnecessary class
definitions.

## Basic Anonymous Class

This example demonstrates how to create and use a basic anonymous class.

basic_anonymous.php
  

&lt;?php declare(strict_types=1);

$greeting = new class {
    public function sayHello(): string {
        return "Hello, World!";
    }
};

echo $greeting-&gt;sayHello();  // Output: Hello, World!

The anonymous class is instantiated using the new class syntax and
assigned to the variable $greeting. The sayHello method
is then called to display the message.

## Implementing an Interface

This example shows how to create an anonymous class that implements an interface.

implement_interface.php
  

&lt;?php declare(strict_types=1);

interface Greeting {
    public function sayHello(): string;
}

$greeting = new class implements Greeting {
    public function sayHello(): string {
        return "Hello, World!";
    }
};

echo $greeting-&gt;sayHello();  // Output: Hello, World!

The anonymous class implements the Greeting interface and provides
an implementation for the sayHello method.

## Extending a Class

This example demonstrates how to create an anonymous class that extends an
existing class.

extend_class.php
  

&lt;?php declare(strict_types=1);

class BaseGreeting {
    public function sayHello(): string {
        return "Hello, Base!";
    }
}

$greeting = new class extends BaseGreeting {
    public function sayHello(): string {
        return "Hello, Anonymous!";
    }
};

echo $greeting-&gt;sayHello();  // Output: Hello, Anonymous!

The anonymous class extends the BaseGreeting class and overrides
the sayHello method.

## Using Constructor Arguments

This example shows how to pass arguments to the constructor of an anonymous
class.

constructor_arguments.php
  

&lt;?php declare(strict_types=1);

$greeting = new class("World") {
    private string $name;

    public function __construct(string $name) {
        $this-&gt;name = $name;
    }

    public function sayHello(): string {
        return "Hello, " . $this-&gt;name . "!";
    }
};

echo $greeting-&gt;sayHello();  // Output: Hello, World!

The anonymous class accepts a constructor argument, which is used to customize
the output of the sayHello method.

## Using Traits

This example demonstrates how to use traits within an anonymous class.

use_traits.php
  

&lt;?php declare(strict_types=1);

trait GreetingTrait {
    public function sayHello(): string {
        return "Hello, Trait!";
    }
}

$greeting = new class {
    use GreetingTrait;
};

echo $greeting-&gt;sayHello();  // Output: Hello, Trait!

The anonymous class uses the GreetingTrait trait to provide the
sayHello method.

## Anonymous Class with Properties

This example shows an anonymous class with typed properties.

properties.php
  

&lt;?php declare(strict_types=1);

$person = new class {
    public string $name = "Anonymous";
    public int $age = 30;

    public function getInfo(): string {
        return "Name: $this-&gt;name, Age: $this-&gt;age";
    }
};

echo $person-&gt;getInfo();  // Output: Name: Anonymous, Age: 30

The anonymous class defines typed properties and a method to display them.

## Anonymous Class as Callback

This example uses an anonymous class as a callback object.

callback.php
  

&lt;?php declare(strict_types=1);

function processCallback(object $callback): string {
    return $callback-&gt;execute();
}

$result = processCallback(new class {
    public function execute(): string {
        return "Callback executed!";
    }
});

echo $result;  // Output: Callback executed!

The anonymous class is passed as an object to a function expecting a callback.

## Anonymous Class with Multiple Methods

This example shows an anonymous class with multiple typed methods.

multiple_methods.php
  

&lt;?php declare(strict_types=1);

$calculator = new class {
    public function add(int $a, int $b): int {
        return $a + $b;
    }

    public function multiply(int $a, int $b): int {
        return $a * $b;
    }
};

echo $calculator-&gt;add(5, 3);      // Output: 8
echo "\n";
echo $calculator-&gt;multiply(4, 2); // Output: 8

The anonymous class provides multiple methods with strict typing for math operations.

## Best Practices for Anonymous Classes

- **Use for One-Off Objects:** Use anonymous classes for objects that are only needed once.

- **Keep It Simple:** Avoid complex logic in anonymous classes to maintain readability.

- **Implement Interfaces:** Use anonymous classes to implement interfaces or extend classes on the fly.

- **Use Traits:** Leverage traits to reuse functionality in anonymous classes.

## Source

[PHP Anonymous Classes Documentation](https://www.php.net/manual/en/language.oop5.anonymous.php)

In this article, we have explored various examples of using PHP anonymous
classes, including basic usage, implementing interfaces, extending classes,
using constructor arguments, and leveraging traits.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).