+++
title = "Perl chr Function"
date = 2025-08-29T20:03:54.333+01:00
draft = false
description = "Perl chr tutorial shows how to convert ASCII/Unicode values to characters in Perl using chr function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl chr Function

last modified April 4, 2025

The Perl chr function converts ASCII or Unicode code points to
their corresponding characters. It's the inverse of Perl's ord
function.

chr takes a number and returns the character represented by that
number in the current character set. It works with both ASCII and Unicode
values.

## Basic chr Usage

The simplest way to use chr is to convert ASCII values to
characters.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $char = chr(65);
print "Character for ASCII 65: '$char'\n";

$char = chr(97);
print "Character for ASCII 97: '$char'\n";

We demonstrate chr converting ASCII values to their corresponding
characters. ASCII 65 is 'A' and 97 is 'a'.

$ ./basic.pl
Character for ASCII 65: 'A'
Character for ASCII 97: 'a'

## Generating Alphabet

chr can be used to generate sequences of characters.

alphabet.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Uppercase alphabet: ";
for my $i (65..90) {
    print chr($i);
}
print "\n";

print "Lowercase alphabet: ";
for my $i (97..122) {
    print chr($i);
}
print "\n";

This script generates the English alphabet using ASCII values. The uppercase
letters range from 65-90, lowercase from 97-122.

$ ./alphabet.pl
Uppercase alphabet: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Lowercase alphabet: abcdefghijklmnopqrstuvwxyz

## Working with Unicode

chr handles Unicode characters when Perl is in Unicode mode.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $euro = chr(0x20AC);
my $heart = chr(0x2665);
my $smiley = chr(0x1F600);

print "Euro symbol: $euro\n";
print "Heart symbol: $heart\n";
print "Smiley face: $smiley\n";

We generate several Unicode characters using their hexadecimal code points.
The use utf8 pragma enables Unicode support.

$ ./unicode.pl
Euro symbol: €
Heart symbol: ♥
Smiley face: 😀

## Creating Special Characters

chr is useful for creating control characters and special symbols.

special.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $newline = chr(10);
my $tab = chr(9);
my $bell = chr(7);

print "This ends with newline$newline";
print "This\tuses\ttabs$newline";
print "Bell sound: $bell\n";

This example creates common control characters. ASCII 10 is newline, 9 is tab,
and 7 is the bell character.

$ ./special.pl
This ends with newline
This    uses    tabs
Bell sound: 

## Binary Data Generation

chr can help generate binary data by converting numeric values.

binary.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $binary = '';
for my $i (0..255) {
    $binary .= chr($i);
}

open(my $fh, '&gt;', 'data.bin') or die $!;
print $fh $binary;
close($fh);

print "Generated binary file with all 256 byte values\n";

We create a binary file containing all possible byte values (0-255). Each
number is converted to its corresponding byte using chr.

$ ./binary.pl
Generated binary file with all 256 byte values

## Password Generation

chr can be part of random password generation algorithms.

password.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub generate_password {
    my $length = shift;
    my $password = '';
    
    for (1..$length) {
        # Generate random printable ASCII (33-126)
        my $char = chr(33 + int(rand(94)));
        $password .= $char;
    }
    
    return $password;
}

print "Your password: ", generate_password(12), "\n";

This script generates random passwords using printable ASCII characters.
chr converts random numbers to their character equivalents.

$ ./password.pl
Your password: kL9#mX@2qP$5

## Hex String Conversion

chr can convert hexadecimal string representations to characters.

hex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $hex_str = "48656c6c6f20576f726c64";  # "Hello World" in hex
my $string = '';

while ($hex_str =~ /(..)/g) {
    $string .= chr(hex($1));
}

print "Converted string: $string\n";

We convert a hexadecimal string to its ASCII representation. Each pair of hex
digits is converted to a character using chr.

$ ./hex.pl
Converted string: Hello World

## Best Practices

- **Use Unicode mode:** Enable UTF-8 for full Unicode support.

- **Validate input:** Ensure numbers are within valid ranges.

- **Combine with ord:** Use with ord for character analysis.

- **Document encoding:** Clearly specify character encoding used.

## Source

[Perl chr Documentation](https://perldoc.perl.org/functions/chr)

This tutorial covered Perl's chr function with practical
examples demonstrating its usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).