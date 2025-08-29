+++
title = "Perl sprintf Function"
date = 2025-08-29T20:04:04.708+01:00
draft = false
description = "Perl sprintf tutorial shows how to format strings in Perl using sprintf function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl sprintf Function

last modified April 4, 2025

The Perl sprintf function formats strings according to a format
specifier. It returns a formatted string rather than printing it directly.

sprintf is similar to printf but returns the result
instead of outputting it. It's useful for creating precisely formatted strings.

## Basic sprintf Usage

The simplest use of sprintf formats a string with placeholders.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $name = "Alice";
my $age = 28;

my $result = sprintf("Hello, %s. You are %d years old.", $name, $age);
print "$result\n";

This example shows basic string and number formatting. %s is for
strings, %d for integers. The function returns the formatted string.

$ ./basic.pl
Hello, Alice. You are 28 years old.

## Number Formatting

sprintf provides precise control over number formatting.

numbers.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $pi = 3.1415926535;
my $price = 19.99;

my $formatted = sprintf("Pi: %.2f\nPrice: %08.2f\nHex: 0x%x", $pi, $price, 255);
print $formatted;

We format numbers with different specifications: %.2f shows 2 decimal
places, %08.2f pads with zeros, and %x converts to hex.

$ ./numbers.pl
Pi: 3.14
Price: 0019.99
Hex: 0xff

## String Padding and Alignment

Strings can be padded and aligned using width specifiers.

padding.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Perl";
my $left = sprintf("|%-10s|", $text);
my $right = sprintf("|%10s|", $text);
my $center = sprintf("|%*s|", 10 - length($text), $text);

print "$left\n$right\n$center\n";

%-10s left-aligns, %10s right-aligns. The center
alignment requires manual calculation. Negative width left-aligns the text.

$ ./padding.pl
|Perl      |
|      Perl|
|   Perl|

## Date and Time Formatting

sprintf is useful for formatting date and time components.

datetime.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my ($sec, $min, $hour, $mday, $mon, $year) = localtime();
$year += 1900;
$mon += 1;

my $date = sprintf("%04d-%02d-%02d %02d:%02d:%02d",
    $year, $mon, $mday, $hour, $min, $sec);
print "Current date/time: $date\n";

We format date/time components with zero-padding. Each number gets exactly 2
digits with %02d, ensuring consistent formatting.

$ ./datetime.pl
Current date/time: 2025-04-04 14:30:15

## Hexadecimal and Binary Output

sprintf can convert numbers to different bases.

bases.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $num = 255;
my $hex = sprintf("Hex: 0x%x 0x%X", $num, $num);
my $bin = sprintf("Bin: %b", $num);
my $oct = sprintf("Oct: %o", $num);

print "$hex\n$bin\n$oct\n";

Format specifiers: %x for lowercase hex, %X for
uppercase, %b for binary, and %o for octal.

$ ./bases.pl
Hex: 0xff 0xFF
Bin: 11111111
Oct: 377

## Floating-Point Precision

Precision control is essential for scientific and financial calculations.

precision.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $value = 123.456789;
my $sci = sprintf("%.3e", $value);
my $fixed = sprintf("%.2f", $value);
my $general = sprintf("%g", $value);

print "Scientific: $sci\nFixed: $fixed\nGeneral: $general\n";

%e for scientific notation, %f for fixed-point,
and %g for "smart" shortest representation. Precision follows
the decimal point.

$ ./precision.pl
Scientific: 1.235e+02
Fixed: 123.46
General: 123.457

## Complex Formatting

sprintf can handle complex formatting with multiple values.

complex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @data = (
    ["Alice", 28, 45000.50],
    ["Bob", 32, 52000.75],
    ["Charlie", 45, 68000.00]
);

foreach my $row (@data) {
    my $line = sprintf("%-10s %2d years \$%8.2f", @$row);
    print "$line\n";
}

This formats a table with aligned columns: left-aligned names, right-aligned
numbers with padding. The dollar sign is escaped in the format string.

$ ./complex.pl
Alice      28 years $45000.50
Bob        32 years $52000.75
Charlie    45 years $68000.00

## Best Practices

- **Validate inputs:** Ensure data matches format specifiers.

- **Use constants:** Store complex format strings as constants.

- **Consider locale:** Number formatting varies by region.

- **Error checking:** Verify sprintf doesn't return undef.

- **Performance:** For simple cases, concatenation may be faster.

## Source

[Perl sprintf Documentation](https://perldoc.perl.org/functions/sprintf)

This tutorial covered Perl's sprintf function with practical
examples demonstrating its powerful string formatting capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).