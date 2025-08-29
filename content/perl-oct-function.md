+++
title = "Perl oct Function"
date = 2025-08-29T20:04:00.101+01:00
draft = false
description = "Perl oct tutorial shows how to convert octal and other base strings to numbers in Perl using oct function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl oct Function

last modified April 4, 2025

The Perl oct function converts string representations of numbers
from octal, hexadecimal, or binary to decimal. It interprets strings based
on their prefix.

oct handles strings starting with 0 as octal, 0x
as hexadecimal, and 0b as binary. Without prefix, it treats input
as octal.

## Basic oct Usage

The simplest way to use oct is with an octal string.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $octal = "0755";
my $decimal = oct($octal);

print "Octal $octal is decimal $decimal\n";

We convert an octal string to its decimal equivalent. The leading zero
indicates octal notation to Perl.

$ ./basic.pl
Octal 0755 is decimal 493

## Hexadecimal Conversion

oct can convert hexadecimal strings prefixed with 0x.

hex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex = "0xFF";
my $decimal = oct($hex);

print "Hexadecimal $hex is decimal $decimal\n";

This example converts a hexadecimal color value to decimal. The 0x
prefix tells Perl to interpret as hexadecimal.

$ ./hex.pl
Hexadecimal 0xFF is decimal 255

## Binary Conversion

Binary strings prefixed with 0b can be converted with oct.

binary.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $binary = "0b1010";
my $decimal = oct($binary);

print "Binary $binary is decimal $decimal\n";

We convert a binary string to decimal. The 0b prefix indicates
binary format to Perl.

$ ./binary.pl
Binary 0b1010 is decimal 10

## No Prefix Handling

Without prefix, oct assumes the string is in octal format.

noprefix.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $num = "755";
my $decimal = oct($num);

print "String '$num' interpreted as octal: $decimal\n";

This shows oct's default octal interpretation. Without prefix,
it treats input as octal numbers.

$ ./noprefix.pl
String '755' interpreted as octal: 493

## File Permissions

oct is commonly used to convert file permission strings.

permissions.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $mode = "0644";
my $decimal = oct($mode);

print "File mode $mode means decimal $decimal\n";
print "In binary: ", sprintf("%b", $decimal), "\n";

We convert a common file permission octal string. The result shows the
actual permission bits in decimal and binary formats.

$ ./permissions.pl
File mode 0644 means decimal 420
In binary: 110100100

## Error Handling

Invalid characters in the string will cause oct to stop parsing.

error.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $invalid = "0789";
my $decimal = oct($invalid);

print "Invalid octal '$invalid' converted to: $decimal\n";

This demonstrates oct's behavior with invalid octal input. It
stops at the first invalid character (8 in this case).

$ ./error.pl
Invalid octal '0789' converted to: 7

## List Context

oct can be used in list operations for batch conversion.

list.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @hex_values = ("0xFF", "0xAA", "0x10");
my @decimals = map { oct($_) } @hex_values;

print "Converted values: @decimals\n";

We use map with oct to convert an array of hex
strings to decimal numbers in one operation.

$ ./list.pl
Converted values: 255 170 16

## Best Practices

- **Always validate input:** Check strings before conversion.

- **Use explicit prefixes:** Make base interpretation clear.

- **Consider hex()/bin():** For specific base needs.

- **Document conversions:** Note expected input formats.

## Source

[Perl oct Documentation](https://perldoc.perl.org/functions/oct)

This tutorial covered Perl's oct function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).