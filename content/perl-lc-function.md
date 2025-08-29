+++
title = "Perl lc Function"
date = 2025-08-29T20:03:58.877+01:00
draft = false
description = "Perl lc tutorial shows how to convert strings to lowercase in Perl using lc function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl lc Function

last modified April 4, 2025

The Perl lc function converts strings to lowercase. It handles
ASCII characters by default and follows Unicode rules when appropriate.

lc is locale-aware and works with international characters.
It returns a new string rather than modifying the original variable.

## Basic lc Usage

The simplest way to use lc is on a single string variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello World!";
my $lower = lc($text);

print "Original: '$text'\n";
print "Lowercase: '$lower'\n";

We demonstrate lc converting a mixed-case string to lowercase.
The original string remains unchanged.

$ ./basic.pl
Original: 'Hello World!'
Lowercase: 'hello world!'

## Comparing Strings Case-Insensitively

lc is useful for case-insensitive string comparisons.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $input = "YeS";
my $match = "yes";

if (lc($input) eq lc($match)) {
    print "Input matches (case-insensitive)\n";
} else {
    print "Input doesn't match\n";
}

This script compares user input case-insensitively by converting both
strings to lowercase before comparison.

$ ./compare.pl
Input matches (case-insensitive)

## Processing Arrays

lc can process array elements using map.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = ("APPLE", "Banana", "CherRY");
my @lower_words = map { lc } @words;

print "Original: @words\n";
print "Lowercase: @lower_words\n";

We convert all elements of an array to lowercase. The original array
remains unchanged while we create a new lowercase version.

$ ./array.pl
Original: APPLE Banana CherRY
Lowercase: apple banana cherry

## International Characters

lc handles international characters correctly.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $text = "ÉLÉGANT Zürich";
my $lower = lc($text);

binmode STDOUT, ':utf8';
print "Original: '$text'\n";
print "Lowercase: '$lower'\n";

This demonstrates lc working with accented characters and
umlauts. Note the use utf8 pragma for Unicode support.

$ ./unicode.pl
Original: 'ÉLÉGANT Zürich'
Lowercase: 'élégant zürich'

## lc vs lcfirst

lc differs from lcfirst which only affects the
first character.

compare_functions.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Perl Programming";

print "lc: ", lc($text), "\n";
print "lcfirst: ", lcfirst($text), "\n";

lc converts the entire string while lcfirst only
changes the first character to lowercase.

$ ./compare_functions.pl
lc: perl programming
lcfirst: perl Programming

## Using with Hashes

lc can normalize hash keys for case-insensitive lookups.

hash.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my %colors = (
    red =&gt; "#FF0000",
    green =&gt; "#00FF00",
    blue =&gt; "#0000FF"
);

my $user_input = "RED";
my $color_code = $colors{lc $user_input};

if (defined $color_code) {
    print "Hex code for $user_input is $color_code\n";
} else {
    print "Color not found\n";
}

We use lc to normalize user input before hash lookup. This
allows case-insensitive access to hash values.

$ ./hash.pl
Hex code for RED is #FF0000

## Locale Awareness

lc respects the current locale settings for case conversion.

locale.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use locale;

my $text = "İSTANBUL";

setlocale(LC_ALL, 'tr_TR.UTF-8');
print "Turkish locale: ", lc($text), "\n";

setlocale(LC_ALL, 'en_US.UTF-8');
print "English locale: ", lc($text), "\n";

This shows how locale affects lowercase conversion, particularly with
Turkish dotted/dotless I. Note: Locale must be available on your system.

$ ./locale.pl
Turkish locale: i̇stanbul
English locale: i̇stanbul

## Best Practices

- **Use for normalization:** Standardize strings before comparison.

- **Combine with chomp:** Clean input with both functions.

- **Consider Unicode:** Ensure proper encoding for non-ASCII.

- **Performance:** Avoid unnecessary conversions in loops.

## Source

[Perl lc Documentation](https://perldoc.perl.org/functions/lc)

This tutorial covered Perl's lc function with practical
examples demonstrating its usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).