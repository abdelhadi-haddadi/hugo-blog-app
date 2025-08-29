+++
title = "PHP Union Types"
date = 2025-08-29T20:04:49.777+01:00
draft = false
description = "PHP tutorial on union types, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Union Types

last modified March 10, 2025

PHP union types allow a variable, parameter, or return type to accept multiple
types. Introduced in PHP 8.0, union types provide greater flexibility and
expressiveness in type declarations. This tutorial covers basic and advanced
usage of union types with practical examples.

Union types are particularly useful for functions that can handle multiple input
types or return different types based on conditions.

## Basic Union Types

This example demonstrates how to declare a parameter that can accept either an
integer or a string.

basic_union.php
  

&lt;?php

declare(strict_types=1);

function printValue(int|string $value): void {
    echo $value;
}

printValue(42);       // Output: 42
printValue("Hello");  // Output: Hello

The int|string syntax specifies that the $value
parameter can be either an integer or a string.

## Union Types in Return Values

This example shows how to declare a function that can return either an integer
or a float.

return_union.php
  

&lt;?php

declare(strict_types=1);

function divide(int $a, int $b): int|float {
    if ($b === 0) {
        return 0.0; // Return float for division by zero
    }
    return $a / $b;
}

echo divide(10, 2);  // Output: 5
echo divide(10, 0);  // Output: 0.0

The int|float return type allows the function to return either an
integer or a float.

## Union Types with Null

This example demonstrates how to use union types with null to
indicate that a parameter or return value can be nullable.

nullable_union.php
  

&lt;?php

declare(strict_types=1);

function findUser(int $id): string|null {
    if ($id === 1) {
        return "John Doe";
    }
    return null;
}

echo findUser(1) ?? "User not found";  // Output: John Doe
echo findUser(2) ?? "User not found";  // Output: User not found

The string|null return type allows the function to return either a
string or null.

## Union Types in Class Properties

This example shows how to use union types in class properties.

class_property_union.php
  

&lt;?php

declare(strict_types=1);

class User {
    public int|string $id;

    public function __construct(int|string $id) {
        $this-&gt;id = $id;
    }
}

$user1 = new User(1);
$user2 = new User("abc123");

echo $user1-&gt;id;  // Output: 1
echo $user2-&gt;id;  // Output: abc123

The int|string type declaration allows the $id
property to store either an integer or a string.

## Advanced: Union Types with Arrays

This example demonstrates how to use union types with arrays.

array_union.php
  

&lt;?php

declare(strict_types=1);

function processArray(array|string $input): void {
    if (is_array($input)) {
        echo "Processing array: " . implode(", ", $input);
    } else {
        echo "Processing string: " . $input;
    }
}

processArray([1, 2, 3]);  // Output: Processing array: 1, 2, 3
processArray("Hello");    // Output: Processing string: Hello

The array|string type declaration allows the $input
parameter to be either an array or a string.

## Union Types with Objects

This example shows how to use union types with different object types.

object_union.php
  

&lt;?php

declare(strict_types=1);

class Cat {
    public function speak(): string {
        return "Meow";
    }
}

class Dog {
    public function speak(): string {
        return "Woof";
    }
}

function makeAnimalSpeak(Cat|Dog $animal): string {
    return $animal-&gt;speak();
}

$cat = new Cat();
$dog = new Dog();

echo makeAnimalSpeak($cat);  // Output: Meow
echo makeAnimalSpeak($dog);  // Output: Woof

The Cat|Dog type declaration allows the parameter to accept either
a Cat or Dog object.

## Union Types with Mixed Numeric Values

This example demonstrates handling multiple numeric types.

numeric_union.php
  

&lt;?php

declare(strict_types=1);

function calculateSquare(int|float $number): float {
    return $number * $number;
}

echo calculateSquare(5);    // Output: 25
echo calculateSquare(2.5);  // Output: 6.25

The int|float type allows accepting both integer and float inputs
while always returning a float.

## Union Types with Boolean or Integer

This example shows handling boolean or integer input for configuration settings.

bool_int_union.php
  

&lt;?php

declare(strict_types=1);

function setConfig(bool|int $value): string {
    if (is_bool($value)) {
        return $value ? "Enabled" : "Disabled";
    }
    return "Level: " . $value;
}

echo setConfig(true);   // Output: Enabled
echo setConfig(0);      // Output: Level: 0
echo setConfig(42);     // Output: Level: 42

The bool|int type allows accepting both boolean and integer values.

## Best Practices for Union Types

- **Use Sparingly:** Use union types only when necessary to avoid overcomplicating code.

- **Document Behavior:** Clearly document functions with union types to explain expected inputs and outputs.

- **Handle All Cases:** Ensure your code handles all possible types in a union to avoid runtime errors.

- **Combine with Type Checks:** Use is_int, is_string, etc., to handle different types within a function.

## Source

[PHP Union Types Documentation](https://www.php.net/manual/en/language.types.declarations.php#language.types.declarations.union)

In this article, we have explored various examples of using PHP union types,
including basic usage, return types, nullable types, and advanced scenarios
with arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).