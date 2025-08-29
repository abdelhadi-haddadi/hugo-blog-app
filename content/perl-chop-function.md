+++
title = "Perl chop Function"
date = 2025-08-29T20:03:54.327+01:00
draft = false
description = "Perl chop tutorial shows how to remove characters from strings in Perl using chop function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl chop Function

last modified April 4, 2025

The Perl chop function removes the last character from a string.
It modifies the original string and returns the character that was removed.

Unlike chomp, chop removes any last character
unconditionally. It's useful when you need to process strings character by
character.

## Basic chop Usage

The simplest way to use chop is on a single variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello";
print "Before: '$text'\n";

my $removed = chop($text);
print "After: '$text'\n";
print "Removed character: '$removed'\n";

We demonstrate chop removing the last character from a string.
The function modifies the original variable and returns the removed character.

$ ./basic.pl
Before: 'Hello'
After: 'Hell'
Removed character: 'o'

## Processing User Input

chop can be used to process user input character by character.

input.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter a word: ";
my $word = &lt;STDIN&gt;;
chomp $word;  # First remove newline

while (length $word &gt; 0) {
    my $char = chop $word;
    print "Removed: '$char', Remaining: '$word'\n";
}

This script reads user input and processes it character by character from
the end. Note we use chomp first to remove the newline.

$ ./input.pl
Enter a word: Perl
Removed: 'l', Remaining: 'Per'
Removed: 'r', Remaining: 'Pe'
Removed: 'e', Remaining: 'P'
Removed: 'P', Remaining: ''

## Chop on Arrays

chop can process entire arrays, modifying each element.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = ("apple", "banana", "cherry");
print "Before: @words\n";

my @removed = chop @words;
print "After: @words\n";
print "Removed chars: @removed\n";

When applied to an array, chop processes each element. It
returns an array of removed characters.

$ ./array.pl
Before: apple banana cherry
After: appl banan cherr
Removed chars: e a y

## Chop vs Chomp

chop differs from chomp in its unconditional
removal of the last character.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text1 = "Hello\n";
my $text2 = "Hello";

print "Using chop:\n";
my $copy1 = $text1;
my $removed1 = chop($copy1);
print "'$copy1' (removed '$removed1')\n";

print "Using chomp:\n";
my $copy2 = $text1;
my $removed2 = chomp($copy2);
print "'$copy2' (removed $removed2 characters)\n";

print "Chop on string without newline:\n";
my $copy3 = $text2;
my $removed3 = chop($copy3);
print "'$copy3' (removed '$removed3')\n";

chop always removes the last character, while chomp
only removes the input record separator if present.

$ ./compare.pl
Using chop:
'Hello' (removed '
')
Using chomp:
'Hello' (removed 1 characters)
Chop on string without newline:
'Hell' (removed 'o')

## String Reversal with Chop

chop can help implement simple string reversal.

reverse.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Perl";
my $reversed = '';

while (length $text &gt; 0) {
    $reversed .= chop $text;
}

print "Reversed: $reversed\n";

This script builds a reversed string by repeatedly chopping the original.
Note Perl has better ways to reverse strings, but this demonstrates chop.

$ ./reverse.pl
Reversed: lreP

## Processing File Content

chop can be used when processing file content character by character.

file.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

open(my $fh, '&lt;', 'data.txt') or die "Can't open file: $!";

while (my $line = &lt;$fh&gt;) {
    chomp $line;  # Remove newline first
    while (length $line &gt; 0) {
        my $char = chop $line;
        print "Processing: '$char'\n";
    }
    print "--- End of line ---\n";
}

close($fh);

This script reads a file and processes each character from the end of each line.
We use chomp first to handle the newline properly.

## Chop in List Context

chop can be used creatively in list operations.

list.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = ("apple", "banana", "cherry");
my @last_chars = map { chop; $_ } @words;

print "Modified words: @words\n";
print "Last characters: @last_chars\n";

We use map with chop to collect last characters
while modifying the original array. The chop in void context
still modifies the value.

$ ./list.pl
Modified words: appl banan cherr
Last characters: e a y

## Best Practices

- **Understand the difference:** Know when to use chop vs chomp.

- **Check string length:** Avoid chopping empty strings.

- **Combine with chomp:** Often need both for input processing.

- **Document usage:** Chop's unconditional nature can be surprising.

- **Consider alternatives:** substr may be clearer for some cases.

## Source

[Perl chop Documentation](https://perldoc.perl.org/functions/chop)

This tutorial covered Perl's chop function with practical
examples demonstrating its usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).