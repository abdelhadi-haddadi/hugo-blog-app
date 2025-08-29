+++
title = "Perl index Function"
date = 2025-08-29T20:03:57.777+01:00
draft = false
description = "Perl index tutorial shows how to find substrings in strings using the index function in Perl."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl index Function

last modified April 4, 2025

The Perl index function searches for a substring within a string.
It returns the position of the first occurrence or -1 if not found.

index is case-sensitive and can search from specific positions.
It's essential for string manipulation and parsing tasks in Perl.

## Basic index Usage

The simplest way to use index is to find a substring in a string.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "Hello world";
my $pos = index($str, "world");

print "Substring found at position: $pos\n";

We search for "world" in "Hello world". The function returns the starting
position (6) where the substring begins.

$ ./basic.pl
Substring found at position: 6

## Handling Not Found Cases

index returns -1 when the substring isn't found in the string.

notfound.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "Perl programming";
my $pos = index($str, "Python");

if ($pos == -1) {
    print "Substring not found\n";
} else {
    print "Found at position: $pos\n";
}

This demonstrates how to handle cases where the substring doesn't exist.
Always check for -1 when working with index.

$ ./notfound.pl
Substring not found

## Searching From Position

index can start searching from a specific position in the string.

position.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "apple orange apple banana";
my $pos1 = index($str, "apple");
my $pos2 = index($str, "apple", $pos1 + 1);

print "First apple at: $pos1\n";
print "Second apple at: $pos2\n";

We find the first "apple", then search again starting after that position.
This technique is useful for finding multiple occurrences of a substring.

$ ./position.pl
First apple at: 0
Second apple at: 12

## Case Sensitivity

index is case-sensitive, requiring exact character matches.

case.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "Perl Language";
my $pos1 = index($str, "perl");
my $pos2 = index($str, "Perl");

print "Lowercase search: $pos1\n";
print "Exact case search: $pos2\n";

The first search fails (-1) due to case mismatch, while the second succeeds.
For case-insensitive searches, convert strings to same case first.

$ ./case.pl
Lowercase search: -1
Exact case search: 0

## Finding All Occurrences

We can use a loop with index to find all substring occurrences.

all.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "mississippi";
my $sub = "iss";
my $pos = -1;
my @positions;

while (($pos = index($str, $sub, $pos + 1)) != -1) {
    push @positions, $pos;
}

print "Positions: @positions\n";

This script finds all starting positions of "iss" in "mississippi".
We increment the search position after each find to avoid infinite loops.

$ ./all.pl
Positions: 1 4

## Using index With Substrings

index can search for multi-character substrings efficiently.

substring.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "The quick brown fox jumps over the lazy dog";
my $word = "fox";
my $pos = index($str, $word);

if ($pos != -1) {
    print "Found '$word' at position $pos\n";
    print "Context: " . substr($str, $pos - 5, length($word) + 10) . "\n";
}

We find a word and display surrounding context. This shows how index
can be combined with other string functions for powerful text processing.

$ ./substring.pl
Found 'fox' at position 16
Context: quick brown fox jumps

## Performance Considerations

index is optimized for speed compared to regular expressions.

performance.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use Benchmark qw(cmpthese);

my $str = "a" x 1000 . "needle" . "a" x 1000;

cmpthese(-1, {
    index =&gt; sub { index($str, "needle") != -1 },
    regex =&gt; sub { $str =~ /needle/ },
});

This benchmark compares index with regex matching for simple
substring searches. index is generally faster for exact matches.

$ ./performance.pl
          Rate regex index
regex  65436/s    --  -57%
index 151515/s  132%    --

## Best Practices

- **Check for -1:** Always handle not-found cases.

- **Use positions:** Combine with substr for extraction.

- **Prefer over regex:** For simple searches, index is faster.

- **Document positions:** Remember Perl uses 0-based indexing.

## Source

[Perl index Documentation](https://perldoc.perl.org/functions/index)

This tutorial covered Perl's index function with practical
examples demonstrating its usage in common string searching scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).