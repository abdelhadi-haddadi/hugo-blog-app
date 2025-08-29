+++
title = "Perl split Function"
date = 2025-08-29T20:04:04.682+01:00
draft = false
description = "Perl split tutorial shows how to split strings into lists in Perl using split function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl split Function

last modified April 4, 2025

The Perl split function divides strings into substrings using
a delimiter. It returns a list of these substrings, which can be assigned
to an array.

split is powerful for parsing text data, with options to
control splitting behavior. It can use fixed strings or regular expressions
as delimiters.

## Basic split Usage

The simplest form splits on whitespace by default when no pattern is given.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "apple banana cherry";
my @fruits = split ' ', $text;

print "Fruits:\n";
foreach my $fruit (@fruits) {
    print "- $fruit\n";
}

This splits the string on whitespace into an array. Each word becomes an
element in the resulting array.

$ ./basic.pl
Fruits:
- apple
- banana
- cherry

## Splitting on Specific Character

You can specify any single character as the delimiter for splitting.

delimiter.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $csv = "John,Doe,35,New York";
my @fields = split ',', $csv;

print "Fields:\n";
for my $i (0..$#fields) {
    print "$i: $fields[$i]\n";
}

This splits a CSV string on commas. Each field becomes a separate array
element, which we access by index.

$ ./delimiter.pl
Fields:
0: John
1: Doe
2: 35
3: New York

## Limiting Number of Splits

The third parameter controls how many splits to perform.

limit.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $path = "/usr/local/bin/perl";
my @parts = split '/', $path, 3;

print "Path components:\n";
foreach my $part (@parts) {
    print "'$part'\n";
}

Here we split a path string but limit to 3 parts. The remaining delimiters
are kept in the last element.

$ ./limit.pl
Path components:
''
'usr'
'local/bin/perl'

## Splitting on Regular Expression

split can use regex patterns for more complex splitting.

regex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "apple,banana;cherry|date";
my @fruits = split /[,;|]/, $text;

print "Fruits:\n";
print join("\n", @fruits), "\n";

This splits on any of several delimiter characters using a character class.
The regex matches comma, semicolon, or pipe.

$ ./regex.pl
Fruits:
apple
banana
cherry
date

## Splitting with Capture Groups

When using regex with capture groups, the captured text is included in output.

capture.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "appleXbananaYcherry";
my @parts = split /([XY])/, $text;

print "Parts:\n";
print join("|", @parts), "\n";

The delimiters themselves (X and Y) are included in the output array because
they're captured. This behavior is useful when you need to preserve delimiters.

$ ./capture.pl
Parts:
apple|X|banana|Y|cherry

## Splitting Empty Fields

By default, split discards trailing empty fields.

empty.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "one,,three,,";
my @default = split ',', $text;
my @keep_all = split ',', $text, -1;

print "Default split: ", scalar @default, " elements\n";
print "Keep empty: ", scalar @keep_all, " elements\n";

Using -1 as the limit preserves all trailing empty fields. The default
behavior removes them from the end of the array.

$ ./empty.pl
Default split: 3 elements
Keep empty: 5 elements

## Splitting into Variables

You can assign split results directly to variables using list context.

assign.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $date = "2025-04-04";
my ($year, $month, $day) = split '-', $date;

print "Year: $year\n";
print "Month: $month\n";
print "Day: $day\n";

This splits a date string and assigns each component to separate variables.
The number of variables must match the split results.

$ ./assign.pl
Year: 2025
Month: 04
Day: 04

## Best Practices

- **Always check results:** Split might return unexpected empty lists.

- **Precompile regex:** For performance with repeated splits.

- **Consider alternatives:** For CSV, use Text::CSV module.

- **Document complex splits:** Regex patterns can be obscure.

## Source

[Perl split Documentation](https://perldoc.perl.org/functions/split)

This tutorial covered Perl's split function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).