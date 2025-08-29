+++
title = "Perl ucfirst Function"
date = 2025-08-29T20:04:06.937+01:00
draft = false
description = "Perl ucfirst tutorial shows how to capitalize the first character of strings in Perl using ucfirst function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl ucfirst Function

last modified April 4, 2025

The Perl ucfirst function capitalizes the first character of a
string. It's useful for formatting text to proper case or sentence case.

ucfirst only affects the first character, leaving the rest of
the string unchanged. It works with both ASCII and Unicode characters.

## Basic ucfirst Usage

The simplest way to use ucfirst is on a single string variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "hello world";
print "Original: '$text'\n";

my $capitalized = ucfirst($text);
print "Modified: '$capitalized'\n";
print "Original remains: '$text'\n";

We demonstrate ucfirst capitalizing the first letter. The
function returns a new string without modifying the original variable.

$ ./basic.pl
Original: 'hello world'
Modified: 'Hello world'
Original remains: 'hello world'

## Modifying Original Variable

To modify the original string, assign the result back to the variable.

modify.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $name = "john doe";
print "Before: '$name'\n";

$name = ucfirst($name);
print "After: '$name'\n";

This shows how to permanently capitalize a string by reassigning the
ucfirst result to the original variable.

$ ./modify.pl
Before: 'john doe'
After: 'John doe'

## Working with Unicode

ucfirst properly handles Unicode characters in modern Perl.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $greek = "γάλα"; # Greek word for "milk"
print "Original: '$greek'\n";

my $capitalized = ucfirst($greek);
print "Capitalized: '$capitalized'\n";

The example demonstrates ucfirst with a Greek Unicode string.
Note the use utf8 pragma for proper Unicode handling.

$ ./unicode.pl
Original: 'γάλα'
Capitalized: 'Γάλα'

## Multiple Words

To capitalize each word in a string, combine ucfirst with
split and join.

words.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $phrase = "perl programming language";
print "Original: '$phrase'\n";

my @words = split(' ', $phrase);
@words = map { ucfirst($_) } @words;
my $title = join(' ', @words);

print "Title Case: '$title'\n";

This script converts a string to title case by capitalizing each word's
first letter while preserving the original spacing.

$ ./words.pl
Original: 'perl programming language'
Title Case: 'Perl Programming Language'

## User Input Capitalization

ucfirst is useful for formatting user-provided names.

input.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter your city: ";
my $city = &lt;STDIN&gt;;
chomp $city;

$city = ucfirst(lc($city));
print "Formatted city: '$city'\n";

The script reads user input, removes the newline with chomp,
converts to lowercase, then capitalizes the first letter for consistent
formatting.

$ ./input.pl
Enter your city: lONDON
Formatted city: 'London'

## Array Processing

ucfirst can be applied to array elements using map.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @names = ("alice", "bob", "charlie");
print "Original: @names\n";

@names = map { ucfirst($_) } @names;
print "Capitalized: @names\n";

This example processes an array of names, capitalizing each one. The
map function applies ucfirst to every element.

$ ./array.pl
Original: alice bob charlie
Capitalized: Alice Bob Charlie

## Combining with Other Functions

ucfirst can be combined with other string functions for
powerful transformations.

combine.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "  perl is GREAT!  ";
print "Original: '$text'\n";

# Trim, lowercase, then capitalize
$text =~ s/^\s+|\s+$//g;
$text = lc($text);
$text = ucfirst($text);

print "Processed: '$text'\n";

This script demonstrates a common text processing pipeline: trimming
whitespace, converting to lowercase, then capitalizing the first letter.

$ ./combine.pl
Original: '  perl is GREAT!  '
Processed: 'Perl is great!'

## Best Practices

- **Use with Unicode:** Ensure proper encoding with use utf8.

- **Combine with lc:** For consistent results, lowercase first.

- **Preserve originals:** Assign to new variables when needed.

- **Handle whitespace:** Trim before capitalization.

- **Use map for arrays:** Efficiently process multiple values.

## Source

[Perl ucfirst Documentation](https://perldoc.perl.org/functions/ucfirst)

This tutorial covered Perl's ucfirst function with practical
examples demonstrating its usage in common string processing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).