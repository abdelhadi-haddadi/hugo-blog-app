+++
title = "Perl hex Function"
date = 2025-08-29T20:03:57.780+01:00
draft = false
description = "Perl hex tutorial shows how to convert hexadecimal strings to decimal numbers in Perl using hex function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl hex Function

last modified April 4, 2025

The Perl hex function converts hexadecimal strings to decimal
numbers. It interprets a string as a hex number and returns its decimal
equivalent.

hex is useful when working with hexadecimal values from files,
user input, or network protocols. It handles both uppercase and lowercase
hex digits (A-F or a-f).

## Basic hex Usage

The simplest way to use hex is with a hexadecimal string.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex_value = "FF";
my $decimal = hex($hex_value);

print "Hexadecimal $hex_value is decimal $decimal\n";

We convert the hexadecimal string "FF" to its decimal equivalent. The
function returns 255, which is FF in base 16.

$ ./basic.pl
Hexadecimal FF is decimal 255

## Hexadecimal Prefix Handling

hex automatically ignores the common "0x" prefix.

prefix.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex1 = "0xFF";
my $hex2 = "FF";

print "With prefix: ", hex($hex1), "\n";
print "Without prefix: ", hex($hex2), "\n";

Both forms produce the same result. The function skips leading whitespace
and the "0x" prefix if present.

$ ./prefix.pl
With prefix: 255
Without prefix: 255

## Case Insensitivity

hex works with both uppercase and lowercase hex digits.

case.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $upper = "ABCD";
my $lower = "abcd";

print "Uppercase: ", hex($upper), "\n";
print "Lowercase: ", hex($lower), "\n";

The function treats 'A' and 'a' identically, converting both to decimal
43981. This makes it flexible with different input formats.

$ ./case.pl
Uppercase: 43981
Lowercase: 43981

## Invalid Characters

hex stops conversion at the first invalid character.

invalid.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $valid = "1A3F";
my $invalid = "1G3F";

print "Valid: ", hex($valid), "\n";
print "Invalid: ", hex($invalid), "\n";

The function converts "1G3F" as just "1" since 'G' isn't a hex digit. No
warning is issued for invalid characters.

$ ./invalid.pl
Valid: 6719
Invalid: 1

## Hexadecimal to Binary

Combine hex with sprintf for binary conversion.

binary.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex = "A5";
my $decimal = hex($hex);
my $binary = sprintf("%08b", $decimal);

print "Hex $hex is binary $binary\n";

We first convert to decimal, then format as 8-bit binary. The %08b
format ensures leading zeros for consistent 8-digit output.

$ ./binary.pl
Hex A5 is binary 10100101

## Reading Hex from File

hex is useful when processing hexadecimal data from files.

file.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

open(my $fh, '&lt;', 'hexdata.txt') or die "Can't open file: $!";

while (my $line = &lt;$fh&gt;) {
    chomp $line;
    print "$line = ", hex($line), "\n";
}

close($fh);

This script reads hex values from a file and converts each to decimal.
The chomp removes newlines before conversion.

## Hexadecimal Arithmetic

hex enables arithmetic operations on hex strings.

arithmetic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex1 = "A";
my $hex2 = "5";

my $sum = hex($hex1) + hex($hex2);
print "$hex1 + $hex2 = $sum (decimal)\n";

my $hex_sum = sprintf("%X", $sum);
print "Sum in hex: $hex_sum\n";

We convert hex strings to decimal, perform addition, then format the
result back to hexadecimal. This demonstrates complete hex/decimal conversion.

$ ./arithmetic.pl
A + 5 = 15 (decimal)
Sum in hex: F

## Best Practices

- **Validate input:** Check strings contain valid hex digits.

- **Handle case:** Accept both uppercase and lowercase.

- **Watch for overflow:** Perl handles big integers well.

- **Combine with sprintf:** For flexible output formatting.

## Source

[Perl hex Documentation](https://perldoc.perl.org/functions/hex)

This tutorial covered Perl's hex function with practical
examples demonstrating hexadecimal to decimal conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).