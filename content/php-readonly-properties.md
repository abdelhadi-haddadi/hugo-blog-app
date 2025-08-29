+++
title = "PHP readonly Properties"
date = 2025-08-29T20:04:41.543+01:00
draft = false
description = "PHP readonly tutorial shows how to use readonly properties in PHP. Learn immutability with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP readonly Properties

last modified April 16, 2025

The PHP readonly keyword creates immutable class properties that
can only be initialized once. Introduced in PHP 8.1, readonly properties help
enforce immutability in object-oriented code. They prevent modification after
initialization, making objects more predictable.

## Basic Definitions

A readonly property can only be set once during object initialization.
After initialization, the property cannot be modified. Readonly properties must
have a type declaration. They can be initialized in the constructor or directly.

Readonly properties cannot be unset after initialization. They provide a simple
way to create immutable objects. This is useful for value objects and DTOs where
properties shouldn't change after creation.

Syntax: readonly type $propertyName. The readonly modifier comes
before the type declaration. Properties can be public, protected, or private.

## Basic readonly Property

This example demonstrates a simple readonly property in a class.

basic_readonly.php
  

&lt;?php

declare(strict_types=1);

class User {
    public readonly string $name;
    
    public function __construct(string $name) {
        $this-&gt;name = $name;
    }
}

$user = new User('John');
echo $user-&gt;name; // Outputs: John

The $name property is marked readonly and initialized in the
constructor. Once set, it cannot be changed. Trying to modify it later would
cause an error. This ensures the name remains constant after object creation.

## Readonly Property with Default Value

This example shows a readonly property initialized with a default value.

readonly_default.php
  

&lt;?php

declare(strict_types=1);

class Config {
    public readonly string $environment = 'production';
}

$config = new Config();
echo $config-&gt;environment; // Outputs: production

The $environment property is initialized with a default value.
Since it's readonly, this value cannot be changed later. Default values must
be compile-time constants. This pattern is useful for configuration values.

## Readonly Property in Promoted Constructor

This example demonstrates using readonly with constructor property promotion.

readonly_promoted.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public readonly string $name,
        public readonly float $price
    ) {}
}

$product = new Product('Laptop', 999.99);
echo "{$product-&gt;name}: {$product-&gt;price}"; // Outputs: Laptop: 999.99

The constructor parameters are promoted to readonly properties. This concise
syntax combines property declaration and initialization. The properties remain
immutable after construction. This is a common pattern for value objects.

## Attempting to Modify Readonly Property

This example shows what happens when trying to modify a readonly property.

readonly_modify.php
  

&lt;?php

declare(strict_types=1);

class Account {
    public readonly int $id;
    
    public function __construct(int $id) {
        $this-&gt;id = $id;
    }
}

$account = new Account(123);
// $account-&gt;id = 456; // Fatal error: Cannot modify readonly property

The code creates an Account with readonly $id. The commented line
would cause a fatal error if uncommented. This demonstrates the immutability
enforced by readonly. The error occurs at runtime when modification is attempted.

## Readonly Class with All Properties Readonly

This example shows a class where all properties are marked readonly.

readonly_class.php
  

&lt;?php

declare(strict_types=1);

readonly class Point {
    public function __construct(
        public float $x,
        public float $y,
        public float $z
    ) {}
}

$point = new Point(1.0, 2.0, 3.0);
echo "Point coordinates: {$point-&gt;x}, {$point-&gt;y}, {$point-&gt;z}";

The entire Point class is marked readonly, making all properties
immutable by default. This is available since PHP 8.2. It's a concise way to
create immutable value objects. All properties must be typed and readonly.

## Readonly Property with Union Types

This example demonstrates using readonly with union type properties.

readonly_union.php
  

&lt;?php

declare(strict_types=1);

class Document {
    public readonly string|int $id;
    
    public function __construct(string|int $id) {
        $this-&gt;id = $id;
    }
}

$doc1 = new Document('ABC123');
$doc2 = new Document(456);
echo "Document IDs: {$doc1-&gt;id}, {$doc2-&gt;id}";

The $id property accepts either string or integer values. The
readonly modifier works with union types. Once initialized, the property
cannot be changed regardless of its type. This provides flexibility while
maintaining immutability.

## Readonly Property in Inheritance

This example shows how readonly properties behave in inheritance scenarios.

readonly_inheritance.php
  

&lt;?php

declare(strict_types=1);

class Base {
    public readonly string $baseProp;
    
    public function __construct() {
        $this-&gt;baseProp = 'base';
    }
}

class Child extends Base {
    public readonly string $childProp;
    
    public function __construct() {
        parent::__construct();
        $this-&gt;childProp = 'child';
    }
}

$obj = new Child();
echo "{$obj-&gt;baseProp}, {$obj-&gt;childProp}"; // Outputs: base, child

Both parent and child classes can have readonly properties. The child class
must initialize its own readonly properties. Parent properties are initialized
through the parent constructor. Readonly properties maintain their immutability
through inheritance hierarchies.

## Best Practices

- **Immutability:** Use readonly for properties that shouldn't change after creation.

- **Value Objects:** Ideal for DTOs, value objects, and configuration.

- **Type Safety:** Always declare types with readonly properties.

- **Initialization:** Ensure all readonly properties are initialized.

- **Performance:** Readonly properties have minimal runtime overhead.

## Source

[PHP readonly Properties Documentation](https://www.php.net/manual/en/language.oop5.properties.php#language.oop5.properties.readonly-properties)

This tutorial covered PHP readonly properties with practical examples showing
their usage in various scenarios to create immutable objects.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).