+++
title = "PHP int Keyword"
date = 2025-08-29T20:04:28.746+01:00
draft = false
description = "PHP int tutorial shows how to use integer data type in PHP. Learn about integers with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP int Keyword

last modified April 16, 2025

The PHP int keyword represents the integer data type. Integers are
whole numbers without decimal points. They can be positive, negative, or zero.
PHP supports integers in various notations and sizes.

## Basic Definitions

An integer is a number from the set ℤ = {..., -2, -1, 0, 1, 2, ...}. In PHP,
integers can be specified in decimal, hexadecimal, octal, or binary notation.

The size of an integer is platform-dependent. Typically, it's 32-bit or 64-bit.
PHP doesn't support unsigned integers. Integer overflow results in conversion
to float.

The int type can be used for type declarations and type casting.
PHP automatically converts types when needed, but explicit typing is preferred
for clarity and safety.

## Basic Integer Declaration

This example shows how to declare and use basic integer variables in PHP.

basic_int.php
  

&lt;?php

declare(strict_types=1);

$age = 25;
$temperature = -10;
$population = 8000000;

echo "Age: $age\n";
echo "Temperature: $temperature°C\n";
echo "Population: $population\n";

The code declares three integer variables with different values. Positive,
negative, and large numbers are all valid integers. The echo
statements output the values with descriptive text.

## Different Integer Notations

This example demonstrates various ways to represent integers in PHP.

notations.php
  

&lt;?php

declare(strict_types=1);

$decimal = 42;
$hexadecimal = 0x2A;
$octal = 052;
$binary = 0b101010;

echo "Decimal: $decimal\n";
echo "Hexadecimal: $hexadecimal\n";
echo "Octal: $octal\n";
echo "Binary: $binary\n";

All variables represent the same value (42) in different notations. Hexadecimal
starts with 0x, octal with 0, and binary with 0b. PHP automatically converts
them to decimal when outputting.

## Type Casting to Integer

This example shows how to explicitly convert values to integers.

casting.php
  

&lt;?php

declare(strict_types=1);

$floatNum = 3.14;
$stringNum = "123";
$boolVal = true;

$int1 = (int) $floatNum;
$int2 = intval($stringNum);
$int3 = (int) $boolVal;

echo "Float to int: $int1\n";
echo "String to int: $int2\n";
echo "Bool to int: $int3\n";

The code demonstrates two casting methods: (int) prefix and intval() function.
Floats are truncated (not rounded). Strings convert if numeric, otherwise 0.
True becomes 1, false becomes 0.

## Integer Type Declaration

This example demonstrates using int type declarations in functions.

type_declaration.php
  

&lt;?php

declare(strict_types=1);

function addNumbers(int $a, int $b): int {
    return $a + $b;
}

$result = addNumbers(5, 7);
echo "5 + 7 = $result\n";

The function requires two integer parameters and returns an integer. With
strict_types=1, PHP enforces exact type matching. This prevents automatic
type conversion and makes code more predictable.

## Integer Operations

This example shows common arithmetic operations with integers.

operations.php
  

&lt;?php

declare(strict_types=1);

$a = 10;
$b = 3;

echo "Addition: " . ($a + $b) . "\n";
echo "Subtraction: " . ($a - $b) . "\n";
echo "Multiplication: " . ($a * $b) . "\n";
echo "Division: " . intdiv($a, $b) . "\n";
echo "Modulus: " . ($a % $b) . "\n";
echo "Exponentiation: " . ($a ** $b) . "\n";

The code performs basic math operations. Note the use of intdiv() for integer
division. Regular division (/) returns float. The modulus operator (%) returns
the remainder after division.

## Integer Overflow

This example demonstrates what happens when integers exceed their maximum size.

overflow.php
  

&lt;?php

declare(strict_types=1);

$largeNumber = PHP_INT_MAX;
echo "Max integer: $largeNumber\n";

$overflow = $largeNumber + 1;
echo "Overflow: $overflow\n";

var_dump($largeNumber);
var_dump($overflow);

PHP_INT_MAX is the largest supported integer. Adding 1 causes overflow,
converting the result to float. var_dump() shows the actual types. On 64-bit
systems, PHP_INT_MAX is typically 9223372036854775807.

## Integer Functions

This example showcases useful PHP functions for working with integers.

functions.php
  

&lt;?php

declare(strict_types=1);

$number = -42;
$hex = 0x1A;

echo "Absolute value: " . abs($number) . "\n";
echo "Is $number int? " . (is_int($number) ? 'Yes' : 'No') . "\n";
echo "Hex $hex to decimal: " . hexdec('1A') . "\n";
echo "Random number: " . rand(1, 100) . "\n";
echo "Is 7 even? " . (7 % 2 === 0 ? 'Yes' : 'No') . "\n";

The code demonstrates several integer-related functions. abs() gets absolute
value. is_int() checks type. hexdec() converts hexadecimal. rand() generates
random numbers. The modulus operator checks even/odd.

## Best Practices

- **Type Safety:** Use strict_types=1 for predictable behavior.

- **Validation:** Check is_int() when working with user input.

- **Overflow:** Be aware of platform-specific integer limits.

- **Readability:** Use underscores for large numbers (1_000_000).

- **Operations:** Use intdiv() for integer division.

## Source

[PHP Integer Documentation](https://www.php.net/manual/en/language.types.integer.php)

This tutorial covered PHP integer data type with practical examples showing
declaration, operations, type casting, and common functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).