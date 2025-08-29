+++
title = "Perl printf Function"
date = 2025-08-29T20:04:02.354+01:00
draft = false
description = "Perl printf tutorial shows how to use formatted output in Perl using printf function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl printf Function

last modified April 4, 2025

The Perl printf function produces formatted output based on a
format string. It's similar to C's printf and provides precise control.

printf takes a format string followed by values to interpolate.
The format specifies how each value should be displayed, including width,
precision, and alignment.

## Basic printf Usage

The simplest printf formats a string with placeholders.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $name = "Alice";
my $age = 28;

printf("Name: %s, Age: %d\n", $name, $age);

This example demonstrates basic string (%s) and decimal (%d) formatting.
The placeholders are replaced by the corresponding variables in order.

$ ./basic.pl
Name: Alice, Age: 28

## Number Formatting

printf provides extensive number formatting options.

numbers.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $price = 19.99;
my $quantity = 5;
my $total = $price * $quantity;

printf("Price: \$%.2f\n", $price);
printf("Quantity: %03d\n", $quantity);
printf("Total: \$%8.2f\n", $total);

We format floating-point numbers with 2 decimal places, pad integers with
leading zeros, and control field width for alignment.

$ ./numbers.pl
Price: $19.99
Quantity: 005
Total: $   99.95

## String Formatting

String formatting controls field width, padding, and alignment.

strings.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $item1 = "Notebook";
my $item2 = "Pen";
my $price1 = 2.99;
my $price2 = 1.49;

printf("%-15s \$%5.2f\n", $item1, $price1);
printf("%-15s \$%5.2f\n", $item2, $price2);

The - flag left-aligns strings within a 15-character field. Numbers are
right-aligned in a 5-character field with 2 decimal places.

$ ./strings.pl
Notebook        $ 2.99
Pen             $ 1.49

## Hexadecimal and Octal Output

printf can display numbers in different bases.

bases.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $num = 255;

printf("Decimal: %d\n", $num);
printf("Hexadecimal: %x\n", $num);
printf("Hexadecimal (uppercase): %X\n", $num);
printf("Octal: %o\n", $num);
printf("With prefixes: %#x %#o\n", $num, $num);

The %x and %X formats output hexadecimal, %o outputs octal. The # flag
adds base prefixes (0x for hex, 0 for octal).

$ ./bases.pl
Decimal: 255
Hexadecimal: ff
Hexadecimal (uppercase): FF
Octal: 377
With prefixes: 0xff 0377

## Scientific Notation

Large or small numbers can be displayed in scientific notation.

scientific.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $avogadro = 6.02214076e23;
my $electron_mass = 9.10938356e-31;

printf("Avogadro's number: %.4e\n", $avogadro);
printf("Electron mass: %.4e kg\n", $electron_mass);
printf("Alternative format: %.4g\n", $avogadro);

%e uses scientific notation, while %g chooses between %f and %e based on
the number's magnitude. Precision controls significant digits.

$ ./scientific.pl
Avogadro's number: 6.0221e+23
Electron mass: 9.1094e-31 kg
Alternative format: 6.022e+23

## Variable Width and Precision

Width and precision can be specified dynamically using *.

dynamic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $pi = 3.141592653589793;
my $width = 10;
my $precision = 4;

printf("Fixed: %.*f\n", $precision, $pi);
printf("Dynamic width: %*.*f\n", $width, $precision, $pi);

The * in the format string means "take the next argument as this value".
This allows runtime control over formatting parameters.

$ ./dynamic.pl
Fixed: 3.1416
Dynamic width:     3.1416

## Positional Parameters

Parameters can be referenced by position in the format string.

positional.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $name = "Bob";
my $age = 42;
my $score = 95.5;

printf("%2\$s is %1\$d years old and scored %3\$.1f%%\n", 
       $age, $name, $score);

The n$ syntax specifies which argument to use (1-based index). This allows
reordering or reusing arguments in the format string.

$ ./positional.pl
Bob is 42 years old and scored 95.5%

## Best Practices

- **Validate inputs:** Ensure values match format specifiers.

- **Use constants:** For frequently used format strings.

- **Consider locale:** Number formatting varies by region.

- **Watch precision:** Excessive precision can mislead.

- **Document complex formats:** Explain non-obvious formats.

## Source

[Perl printf Documentation](https://perldoc.perl.org/functions/printf)

This tutorial covered Perl's printf function with practical
examples demonstrating its powerful formatting capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).