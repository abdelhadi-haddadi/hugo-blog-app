+++
title = "Perl ord Function"
date = 2025-08-29T20:04:01.227+01:00
draft = false
description = "Perl ord tutorial shows how to convert characters to their ASCII/Unicode values using the ord function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl ord Function

last modified April 4, 2025

The Perl ord function returns the numeric ASCII or Unicode value
of the first character of a string. It's essential for character encoding.

ord is the inverse of chr, which converts numbers
to characters. It works with both ASCII and Unicode characters in Perl.

## Basic ord Usage

The simplest way to use ord is on a single character string.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $char = 'A';
my $code = ord($char);

print "The ASCII code of '$char' is $code\n";

We demonstrate ord converting a character to its ASCII value.
The function returns the numeric code point of the first character.

$ ./basic.pl
The ASCII code of 'A' is 65

## Working with Unicode

ord handles Unicode characters beyond ASCII range.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $char = '€';
my $code = ord($char);

print "The Unicode code point of '$char' is U+", sprintf("%04X", $code), "\n";

This script shows ord working with a Unicode Euro symbol.
We format the output as a hexadecimal Unicode code point.

$ ./unicode.pl
The Unicode code point of '€' is U+20AC

## Multiple Characters

ord only processes the first character of multi-character strings.

multichar.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = 'Perl';
my $code = ord($text);

print "The code of first character in '$text' is $code\n";
print "First character is '", chr($code), "'\n";

When given a longer string, ord only examines the first character.
We use chr to demonstrate the reverse conversion.

$ ./multichar.pl
The code of first character in 'Perl' is 80
First character is 'P'

## Comparing Characters

ord is useful for character comparisons and sorting.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @chars = ('z', 'a', 'M', '9', '!');
my @sorted = sort { ord($a) &lt;=&gt; ord($b) } @chars;

print "Original: @chars\n";
print "Sorted by code: @sorted\n";

We sort characters by their ASCII values using ord. This shows
the numeric ordering of different character types.

$ ./compare.pl
Original: z a M 9 !
Sorted by code: ! 9 M a z

## Character Case Conversion

ord can help implement custom case conversion logic.

case.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub to_upper {
    my $char = shift;
    my $code = ord($char);
    
    return $code &gt;= 97 &amp;&amp; $code &lt;= 122 ? 
        chr($code - 32) : $char;
}

my $lower = 'h';
my $upper = to_upper($lower);

print "'$lower' in uppercase is '$upper'\n";

This example demonstrates using ord to check ASCII values for
lowercase letters and convert them to uppercase by adjusting the code.

$ ./case.pl
'h' in uppercase is 'H'

## Validating Input

ord can validate character ranges in user input.

validate.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter a digit (0-9): ";
my $input = &lt;STDIN&gt;;
chomp $input;

my $code = ord($input);

if (length($input) == 1 &amp;&amp; $code &gt;= 48 &amp;&amp; $code &lt;= 57) {
    print "Valid digit entered: $input\n";
} else {
    print "Invalid input. Please enter a single digit.\n";
}

We use ord to verify the input is a single ASCII digit by
checking its code point falls within the digit range (48-57).

$ ./validate.pl
Enter a digit (0-9): 5
Valid digit entered: 5

## Creating Character Tables

ord helps generate character code tables.

table.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "ASCII Table (32-126):\n";
print "Dec Hex Char\n";

for my $i (32..126) {
    my $char = chr($i);
    printf "%3d %02X  %s\n", $i, $i, $char eq ' ' ? 'SPACE' : $char;
}

This script generates an ASCII table using both ord and
chr. It displays decimal, hexadecimal, and character values.

$ ./table.pl
ASCII Table (32-126):
Dec Hex Char
 32 20  SPACE
 33 21  !
 34 22  "
...
126 7E  ~

## Best Practices

- **Understand encoding:** Know if you're working with ASCII or Unicode.

- **Check string length:** ord only processes first character.

- **Use with chr:** Combine with chr for conversions.

- **Document ranges:** Comment numeric ranges for readability.

## Source

[Perl ord Documentation](https://perldoc.perl.org/functions/ord)

This tutorial covered Perl's ord function with practical
examples demonstrating character to code point conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).