+++
title = "PHP float Keyword"
date = 2025-08-29T20:04:21.960+01:00
draft = false
description = "PHP float tutorial shows how to work with floating-point numbers in PHP. Learn floats with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP float Keyword

last modified April 16, 2025

The PHP float keyword represents floating-point numbers (decimals).
Floats allow storing numbers with fractional components. They are essential for
scientific calculations and precise measurements.

## Basic Definitions

A float is a number with a decimal point or in exponential form.
PHP floats follow the IEEE 754 standard for floating-point arithmetic.

Floats have limited precision (about 14 decimal digits). They can represent
very large or very small numbers using scientific notation.

The float type is also known as double in PHP. There
is no difference between float and double in PHP unlike some other languages.

## Basic Float Declaration

This example shows how to declare and use basic float variables in PHP.

basic_float.php
  

&lt;?php

declare(strict_types=1);

$price = 19.99;
$temperature = -3.5;
$scientific = 1.2e3; // 1200

echo "Price: $price\n";
echo "Temperature: $temperature\n";
echo "Scientific: $scientific\n";

The code declares three float variables with different notations. The first
uses standard decimal notation. The second shows negative floats. The third
demonstrates scientific notation (1.2 × 10³).

## Float Type Casting

This example demonstrates converting other types to floats using type casting.

float_casting.php
  

&lt;?php

declare(strict_types=1);

$intVal = 42;
$strVal = "3.14";
$boolVal = true;

$float1 = (float) $intVal;
$float2 = floatval($strVal);
$float3 = (float) $boolVal;

echo "Int to float: $float1\n";
echo "String to float: $float2\n";
echo "Bool to float: $float3\n";

The code shows two ways to cast to float: using (float) or
floatval. Integers convert directly. Strings must contain valid
float syntax. Boolean true becomes 1.0, false becomes 0.0.

## Float Arithmetic Operations

This example demonstrates basic arithmetic operations with float numbers.

float_arithmetic.php
  

&lt;?php

declare(strict_types=1);

$a = 5.5;
$b = 2.2;

$sum = $a + $b;
$diff = $a - $b;
$product = $a * $b;
$quotient = $a / $b;
$modulus = fmod($a, $b);

echo "Sum: $sum\n";
echo "Difference: $diff\n";
echo "Product: $product\n";
echo "Quotient: $quotient\n";
echo "Modulus: $modulus\n";

The code performs standard arithmetic operations on floats. Note that for modulus
we use fmod instead of %. Floating-point division always produces
a float result even with whole numbers.

## Float Precision Issues

This example demonstrates common precision issues with floating-point numbers.

float_precision.php
  

&lt;?php

declare(strict_types=1);

$a = 0.1;
$b = 0.2;
$sum = $a + $b;

echo "Expected: 0.3\n";
echo "Actual: $sum\n";

if (abs($sum - 0.3) &lt; PHP_FLOAT_EPSILON) {
    echo "The values are considered equal.\n";
}

The code shows that 0.1 + 0.2 doesn't exactly equal 0.3 due to binary
representation. To compare floats safely, we check if the difference is less
than PHP_FLOAT_EPSILON, the smallest representable difference.

## Float Functions

This example demonstrates common PHP functions for working with floats.

float_functions.php
  

&lt;?php

declare(strict_types=1);

$num = 3.14159;

echo "Floor: " . floor($num) . "\n";
echo "Ceil: " . ceil($num) . "\n";
echo "Round: " . round($num, 2) . "\n";
echo "Is finite: " . (is_finite($num) ? 'Yes' : 'No') . "\n";
echo "Is NAN: " . (is_nan($num) ? 'Yes' : 'No') . "\n";

The code demonstrates several float-related functions. floor
rounds down, ceil rounds up, and round rounds
to specified precision. is_finite and is_nan
check for special float values.

## Float in Function Parameters

This example shows how to use float type hints in function parameters.

float_function.php
  

&lt;?php

declare(strict_types=1);

function calculateArea(float $radius): float {
    return M_PI * $radius * $radius;
}

$radius = 5.5;
$area = calculateArea($radius);

echo "Area of circle with radius $radius: $area\n";

The code defines a function that takes and returns a float. With
strict_types=1, PHP enforces the float type. The function
calculates circle area using the M_PI constant.

## Scientific Calculations with Floats

This example demonstrates using floats for scientific calculations.

scientific_calc.php
  

&lt;?php

declare(strict_types=1);

function calculateKineticEnergy(float $mass, float $velocity): float {
    return 0.5 * $mass * $velocity ** 2;
}

$mass = 2.5; // kg
$velocity = 10.2; // m/s

$energy = calculateKineticEnergy($mass, $velocity);

echo "Kinetic energy: $energy Joules\n";

The code calculates kinetic energy (½mv²) using float values. Scientific
calculations often require float precision. The ** operator is used for
exponentiation. Results maintain decimal precision.

## Best Practices

- **Precision:** Be aware of floating-point precision limitations.

- **Comparisons:** Use epsilon comparisons instead of == for floats.

- **Type hints:** Use float type hints for better code clarity.

- **Scientific notation:** Use for very large/small numbers.

- **BCMath:** For precise decimal math, consider BCMath extension.

## Source

[PHP float Documentation](https://www.php.net/manual/en/language.types.float.php)

This tutorial covered PHP floating-point numbers with practical examples
showing float declaration, operations, precision, and scientific usage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).