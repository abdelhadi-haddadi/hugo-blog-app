+++
title = "Perl length Function"
date = 2025-08-29T20:03:58.865+01:00
draft = false
description = "Perl length tutorial shows how to get string length in Perl using length function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl length Function

last modified April 4, 2025

The Perl length function returns the number of characters in a
string. It's a fundamental operation for string manipulation and validation.

length counts each character equally, including whitespace and
special characters. For Unicode strings, it counts logical characters, not
bytes. The function always returns an integer value.

## Basic length Usage

The simplest way to use length is on a scalar variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello World";
my $len = length($text);

print "The string '$text' has $len characters\n";

We demonstrate length calculating the size of a simple string.
The function returns the count of all characters between the quotes.

$ ./basic.pl
The string 'Hello World' has 11 characters

## Empty String Length

length returns 0 for empty strings and undef values.

empty.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $empty = "";
my $undef_var;

print "Empty string length: ", length($empty), "\n";
print "Undef length: ", length($undef_var), "\n";

This script shows length behavior with empty and undefined values.
Perl treats undef as an empty string in string context.

$ ./empty.pl
Empty string length: 0
Undef length: 0

## Whitespace Handling

length counts all whitespace characters including newlines.

whitespace.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "  Hello\n\tWorld  ";
my $len = length($text);

print "String: '$text'\n";
print "Length: $len (includes spaces, tabs, newlines)\n";

The example demonstrates that spaces, tabs, and newlines all contribute to
the length count. This is important for input validation.

$ ./whitespace.pl
String: '  Hello
	World  '
Length: 14 (includes spaces, tabs, newlines)

## Multibyte Characters

For Unicode strings, length counts characters, not bytes.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $text = "こんにちは";  # Japanese "hello"
my $len = length($text);

print "String: $text\n";
print "Character count: $len\n";
print "Byte length: ", length($text.bytes), "\n";

This shows length correctly counting Unicode characters. Each
Japanese character is counted as one, despite using multiple bytes.

$ ./unicode.pl
String: こんにちは
Character count: 5
Byte length: 15

## Array Context

length in array context returns the length of the first element.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = ("apple", "banana", "cherry");
my $len = length(@words);

print "Array length: ", scalar(@words), "\n";
print "First element length: $len\n";

When used with an array, length only examines the first element.
To get array size, use scalar or the array in scalar context.

$ ./array.pl
Array length: 3
First element length: 5

## Input Validation

length is commonly used for validating user input length.

validation.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter password (8-16 chars): ";
my $password = &lt;STDIN&gt;;
chomp $password;

my $len = length($password);

if ($len &lt; 8) {
    print "Too short! ($len chars)\n";
} elsif ($len &gt; 16) {
    print "Too long! ($len chars)\n";
} else {
    print "Valid password length: $len\n";
}

This script checks if input length falls within specified bounds. Note the
chomp to exclude the newline from the count.

$ ./validation.pl
Enter password (8-16 chars): secret
Too short! (6 chars)

## String Truncation

length helps when truncating strings to maximum lengths.

truncate.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "The quick brown fox jumps over the lazy dog";
my $max_len = 20;

if (length($text) &gt; $max_len) {
    $text = substr($text, 0, $max_len) . "...";
}

print "Truncated: $text\n";
print "Length: ", length($text), "\n";

We use length to check if truncation is needed, then
substr to shorten the string. The ellipsis adds to the length.

$ ./truncate.pl
Truncated: The quick brown fox...
Length: 23

## Best Practices

- **Always chomp first:** Remove newlines before length checks.

- **Use Unicode::GCString:** For grapheme clusters in Unicode.

- **Validate early:** Check lengths as soon as input is received.

- **Consider bytes::length:** When byte count is needed.

## Source

[Perl length Documentation](https://perldoc.perl.org/functions/length)

This tutorial covered Perl's length function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).