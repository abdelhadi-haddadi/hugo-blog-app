+++
title = "Brick/Math Library"
date = 2025-08-29T20:04:11.368+01:00
draft = false
description = "Brick/Math tutorial shows how to use the Brick/Math library for arbitrary-precision arithmetic in PHP. Learn to perform precise calculations with examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Brick/Math Library

last modified March 19, 2025

Brick/Math is a PHP library for arbitrary-precision arithmetic. It allows you to
perform precise calculations with large numbers, avoiding the limitations of
PHP's native integer and floating-point types. This tutorial covers the basics
of using Brick/Math, including installation, basic operations, and advanced
features.

## Installation

To use Brick/Math, install it via Composer. Run the following command in your
project directory:

composer require brick/math

This command installs the Brick/Math library in your project.

## Basic Usage

Brick/Math provides the BigInteger and BigDecimal
classes for handling large integers and decimal numbers, respectively.

basic_usage.php
  

&lt;?php

declare(strict_types=1);

require 'vendor/autoload.php';

use Brick\Math\BigInteger;
use Brick\Math\BigDecimal;

$bigInt = BigInteger::of('12345678901234567890');
$bigDec = BigDecimal::of('1234567890.1234567890');

echo "BigInteger: " . $bigInt-&gt;toString() . "\n";
echo "BigDecimal: " . $bigDec-&gt;toString() . "\n";

This example shows how to create and display large numbers using Brick/Math.
It uses BigInteger for a huge integer and BigDecimal
for a precise decimal.

The of method converts strings to these types, avoiding PHP's
native type limits. The toString method outputs the numbers as
strings, ensuring no precision is lost during display.

## Arithmetic Operations

Brick/Math supports basic arithmetic operations such as addition, subtraction,
multiplication, and division.

arithmetic_operations.php
  

&lt;?php

declare(strict_types=1);

require 'vendor/autoload.php';

use Brick\Math\BigInteger;

$a = BigInteger::of('12345678901234567890');
$b = BigInteger::of('98765432109876543210');

$sum = $a-&gt;plus($b);
$diff = $a-&gt;minus($b);
$product = $a-&gt;multipliedBy($b);
$quotient = $a-&gt;dividedBy($b);

echo "Sum: " . $sum-&gt;toString() . "\n";
echo "Difference: " . $diff-&gt;toString() . "\n";
echo "Product: " . $product-&gt;toString() . "\n";
echo "Quotient: " . $quotient-&gt;toString() . "\n";

This code performs basic arithmetic on two large integers using
BigInteger. It calculates their sum, difference, product, and
quotient.

Methods like plus, minus, multipliedBy,
and dividedBy handle operations without losing precision. Results
are new BigInteger objects, displayed via toString.

## Decimal Precision

The BigDecimal class allows you to control the precision and
rounding mode of decimal calculations.

decimal_precision.php
  

&lt;?php

declare(strict_types=1);

require 'vendor/autoload.php';

use Brick\Math\BigDecimal;
use Brick\Math\RoundingMode;

$a = BigDecimal::of('10');
$b = BigDecimal::of('3');

$result = $a-&gt;dividedBy($b, 10, RoundingMode::HALF_UP);

echo "Result: " . $result-&gt;toString() . "\n";

This example divides 10 by 3 using BigDecimal with controlled
precision. It sets the scale to 10 decimal places and uses HALF_UP rounding.

The dividedBy method takes a divisor, scale, and rounding mode.
Here, it produces "3.3333333333", avoiding floating-point errors common in
PHP's native types.

## Comparison Operations

Brick/Math provides methods for comparing numbers, such as isEqualTo,
isGreaterThan, and isLessThan.

comparison_operations.php
  

&lt;?php

declare(strict_types=1);

require 'vendor/autoload.php';

use Brick\Math\BigInteger;

$a = BigInteger::of('12345678901234567890');
$b = BigInteger::of('98765432109876543210');

if ($a-&gt;isLessThan($b)) {
    echo "$a is less than $b\n";
} else {
    echo "$a is not less than $b\n";
}

This code compares two BigInteger values to check their order.
It uses isLessThan to determine if one is smaller than the other.

The comparison methods return booleans, making them ideal for conditional
logic. Here, it correctly outputs that 12345678901234567890 is less than
98765432109876543210.

## Advanced Features

Brick/Math also supports advanced features such as modular arithmetic,
exponentiation, and factorial calculations.

advanced_features.php
  

&lt;?php

declare(strict_types=1);

require 'vendor/autoload.php';

use Brick\Math\BigInteger;

$a = BigInteger::of('12345678901234567890');
$b = BigInteger::of('98765432109876543210');

$mod = $a-&gt;mod($b);
$power = $a-&gt;power(3);
$factorial = BigInteger::of(100)-&gt;factorial();

echo "Modulus: " . $mod-&gt;toString() . "\n";
echo "Power: " . $power-&gt;toString() . "\n";
echo "Factorial: " . $factorial-&gt;toString() . "\n";

This example showcases advanced BigInteger operations: modulus,
exponentiation, and factorial. It uses large numbers to demonstrate
capability.

The mod method computes the remainder of $a divided by $b. The
power method raises $a to the 3rd power, and factorial
calculates 100!, all with exact precision.

These operations are useful in cryptography, scientific computing, or
financial apps where precision and large numbers are critical. Results are
output as strings for readability.

## Best Practices for Brick/Math

**Use Strings for Initialization:** Initialize
BigInteger and BigDecimal objects from strings to
avoid precision loss.
**Control Precision:** Specify the precision and rounding mode
for decimal calculations to ensure accurate results.
**Use Immutable Objects:** Brick/Math objects are immutable,
so always assign the result of operations to a new variable.
**Optimize Performance:** Avoid unnecessary calculations and
use efficient algorithms for large numbers.

## Source

[Brick/Math GitHub Repository](https://github.com/brick/math)

In this tutorial, we explored how to use the Brick/Math library for
arbitrary-precision arithmetic in PHP. Brick/Math provides powerful tools for
performing precise calculations with large numbers, making it ideal for
financial, scientific, and cryptographic applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all PHP tutorials](/php/).