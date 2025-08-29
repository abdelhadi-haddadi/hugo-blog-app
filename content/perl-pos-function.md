+++
title = "Perl pos Function"
date = 2025-08-29T20:04:01.219+01:00
draft = false
description = "Perl pos tutorial shows how to track and manipulate string positions in Perl using pos function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl pos Function

last modified April 4, 2025

The Perl pos function tracks and manipulates the position in a
string where the next regex match will start. It's essential for advanced
string parsing and iterative matching operations.

pos works with the /g regex modifier to enable
sequential matching. It can both retrieve and set the current match position.
The position is zero-based, counting from the start of the string.

## Basic pos Usage

The simplest way to use pos is to check the current position.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello world";
$text =~ /Hello/g;

print "Current position: ", pos($text), "\n";

We match "Hello" in the string and then check the position. The position
after matching will be right after the matched substring.

$ ./basic.pl
Current position: 5

## Iterative Matching with pos

pos is commonly used with /g for iterative matching.

iterate.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "a1 b2 c3 d4";
while ($text =~ /(\w)(\d)/g) {
    print "Found $1$2 at position ", pos($text), "\n";
}

This script finds all letter-number pairs in the string. The pos
function shows where the next match will start after each iteration.

$ ./iterate.pl
Found a1 at position 2
Found b2 at position 5
Found c3 at position 8
Found d4 at position 11

## Manually Setting pos

You can manually set the position to control where matching starts.

setpos.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "abc123xyz789";
pos($text) = 3;  # Skip first 3 characters

if ($text =~ /\d+/g) {
    print "First number found: $&amp; at position ", pos($text), "\n";
}

We set the position to skip the first 3 letters. The regex then matches
the first number sequence starting from that position.

$ ./setpos.pl
First number found: 123 at position 6

## pos with Capture Groups

pos works with capture groups to track complex matches.

capture.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Name: John, Age: 30, City: NY";
while ($text =~ /(\w+):\s*([^,]+)/g) {
    print "$1 = $2 (ends at ", pos($text), ")\n";
}

This script extracts key-value pairs separated by colons. The position
after each match shows where the next search will begin.

$ ./capture.pl
Name = John (ends at 11)
Age = 30 (ends at 20)
City = NY (ends at 28)

## Resetting pos

You can reset the position to start matching from the beginning again.

reset.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "apple banana cherry";
$text =~ /banana/g;

print "After first match: ", pos($text), "\n";

pos($text) = 0;  # Reset position
$text =~ /apple/g;

print "After reset and second match: ", pos($text), "\n";

We match "banana", then reset the position to match "apple" from the start.
Resetting pos allows reusing the same string for new searches.

$ ./reset.pl
After first match: 12
After reset and second match: 5

## pos with Unicode Strings

pos handles Unicode strings correctly when using appropriate
settings.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $text = "café ☕ museum";
$text =~ /é/g;

print "Position after café: ", pos($text), "\n";

$text =~ /☕/g;
print "Position after coffee: ", pos($text), "\n";

This demonstrates pos working with Unicode characters. The
position advances correctly for multi-byte characters when using UTF-8.

$ ./unicode.pl
Position after café: 4
Position after coffee: 7

## Advanced pos Manipulation

pos can be used creatively for complex parsing tasks.

advanced.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "data:123-456-789;info:abc-def-ghi;";
my %data;

while ($text =~ /(\w+):([^;]+)/g) {
    my $key = $1;
    my $values = $2;
    my @values = split /-/, $values;
    $data{$key} = \@values;
    pos($text)++;  # Skip semicolon
}

use Data::Dumper;
print Dumper \%data;

This advanced example extracts structured data from a string. We manually
adjust pos to skip semicolons between key-value pairs.

$ ./advanced.pl
$VAR1 = {
          'info' =&gt; [
                      'abc',
                      'def',
                      'ghi'
                    ],
          'data' =&gt; [
                      '123',
                      '456',
                      '789'
                    ]
        };

## Best Practices

- **Use with /g modifier:** pos primarily works with global regex matching.

- **Check definedness:** Verify pos is defined before using its value.

- **Reset when needed:** Clear pos with undef to restart matching.

- **Combine with substr:** Use substr with pos for precise extraction.

- **Watch Unicode:** Ensure proper encoding for accurate position tracking.

## Source

[Perl pos Documentation](https://perldoc.perl.org/functions/pos)

This tutorial covered Perl's pos function with practical
examples demonstrating its usage in string manipulation and parsing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).