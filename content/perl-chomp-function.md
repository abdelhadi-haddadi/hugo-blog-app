+++
title = "Perl chomp Function"
date = 2025-08-29T20:03:54.314+01:00
draft = false
description = "Perl chomp tutorial shows how to remove line endings from strings in Perl using chomp function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl chomp Function

last modified April 4, 2025

The Perl chomp function removes trailing newline characters from
strings. It's commonly used when reading input to clean line endings.

chomp is safer than alternatives because it only removes the
current input record separator ($/), not all whitespace. It
returns the number of characters removed.

## Basic chomp Usage

The simplest way to use chomp is on a single variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello there\n";
print "Before: '$text'\n";

my $removed = chomp($text);
print "After: '$text'\n";
print "Removed $removed character(s)\n";

We demonstrate chomp removing the newline from a string. The
function modifies the original variable and returns the count of removals.

$ ./basic.pl
Before: 'Hello there
'
After: 'Hello there'
Removed 1 character(s)

## Reading User Input

chomp is frequently used with user input to remove the newline.

input.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter your name: ";
my $name = &lt;STDIN&gt;;
chomp $name;

print "Hello, $name! You entered ", length($name), " characters\n";

This script reads user input and removes the trailing newline. Without
chomp, the newline would be included in length calculations.

$ ./input.pl
Enter your name: Alice
Hello, Alice! You entered 5 characters

## Chomp on Arrays

chomp can process entire arrays at once.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @lines = ("First line\n", "Second line\n", "Third line\n");
print "Before:\n@lines";

my $total = chomp(@lines);
print "After:\n@lines";
print "Total removed: $total\n";

When applied to an array, chomp processes each element. It
returns the total number of characters removed from all elements.

$ ./array.pl
Before:
First line
 Second line
 Third line
After:
First line Second line Third line
Total removed: 3

## Chomp vs Chop

chomp is safer than chop as it's more selective.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text1 = "Hello\n";
my $text2 = "Hello";

print "Using chomp:\n";
my $copy1 = $text1;
chomp($copy1);
print "'$copy1'\n";

print "Using chop:\n";
my $copy2 = $text1;
chop($copy2);
print "'$copy2'\n";

print "Chomp on string without newline:\n";
my $copy3 = $text2;
chomp($copy3);
print "'$copy3'\n";

chop removes the last character unconditionally, while
chomp only removes the input record separator.

$ ./compare.pl
Using chomp:
'Hello'
Using chop:
'Hello'
Chomp on string without newline:
'Hello'

## Custom Input Separator

The $/ variable controls what chomp removes.

separator.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello:::there:::";
local $/ = ":::";  # Set custom separator

print "Before: '$text'\n";
chomp($text);
print "After: '$text'\n";

We change $/ to remove a custom separator instead of newline.
The local keyword limits the change to the current scope.

$ ./separator.pl
Before: 'Hello:::there:::'
After: 'Hello:::there'

## Reading Files

chomp is essential when processing files line by line.

file.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

open(my $fh, '&lt;', 'data.txt') or die "Can't open file: $!";

while (my $line = &lt;$fh&gt;) {
    chomp $line;
    print "Processed: '$line'\n";
}

close($fh);

This script reads a file and removes newlines from each line. Without
chomp, the newlines would be included in processing.

## Chomp in List Context

chomp can be used creatively in list operations.

list.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @lines = ("apple\n", "banana\n", "cherry\n");
my @clean = map { chomp; $_ } @lines;

print "Cleaned: @clean\n";
print "Original modified: @lines\n";

We use map with chomp to create a cleaned array
while preserving the original. Note that chomp modifies in-place.

$ ./list.pl
Cleaned: apple banana cherry
Original modified: apple banana cherry

## Best Practices

- **Always chomp input:** Clean input data immediately.

- **Check return value:** Verify expected removals occurred.

- **Scope $/ carefully:** Reset custom separators after use.

- **Combine with trim:** Use regex for full whitespace control.

## Source

[Perl chomp Documentation](https://perldoc.perl.org/functions/chomp)

This tutorial covered Perl's chomp function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).