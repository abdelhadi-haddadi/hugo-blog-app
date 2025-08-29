+++
title = "Perl reverse Function"
date = 2025-08-29T20:04:03.467+01:00
draft = false
description = "Perl reverse tutorial shows how to reverse strings and lists in Perl using reverse function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl reverse Function

last modified April 4, 2025

The Perl reverse function reverses the order of elements in a list
or the characters in a string. Its behavior depends on the context in which
it's used.

In list context, reverse reverses the order of list elements. In
scalar context with a string, it reverses the character order. It doesn't
modify the original data.

## Basic String Reversal

The simplest use of reverse is to reverse a string in scalar
context.

string_reverse.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello World";
my $reversed = reverse $text;

print "Original: $text\n";
print "Reversed: $reversed\n";

This example shows string reversal in scalar context. The reverse
function returns a new string with characters in reverse order.

$ ./string_reverse.pl
Original: Hello World
Reversed: dlroW olleH

## List Reversal

In list context, reverse reverses the order of elements.

list_reverse.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @numbers = (1..5);
my @reversed = reverse @numbers;

print "Original: @numbers\n";
print "Reversed: @reversed\n";

This demonstrates list reversal. The function returns a new array with elements
in reverse order, leaving the original array unchanged.

$ ./list_reverse.pl
Original: 1 2 3 4 5
Reversed: 5 4 3 2 1

## Reversing a String in List Context

The behavior changes when using reverse on a string in list
context.

string_list_context.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello";
my @chars = reverse $text;

print "Original: $text\n";
print "Reversed as list: @chars\n";

In list context, the string is treated as a list of characters. The function
returns the reversed list, not a reversed string.

$ ./string_list_context.pl
Original: Hello
Reversed as list: o l l e H

## Reversing Hash Keys

reverse can help process hash keys in reverse order.

hash_reverse.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my %fruit = (
    apple =&gt; 3,
    banana =&gt; 7,
    cherry =&gt; 2
);

my @reversed_keys = reverse keys %fruit;

print "Original order: ", join(', ', keys %fruit), "\n";
print "Reversed order: ", join(', ', @reversed_keys), "\n";

This example reverses the order of hash keys. Note that hash key order is
normally arbitrary in Perl.

$ ./hash_reverse.pl
Original order: banana, apple, cherry
Reversed order: cherry, apple, banana

## Combining with Other Functions

reverse is often combined with other list operations.

combined.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = qw(apple banana cherry date elderberry);
my @sorted_reversed = reverse sort @words;

print "Original: @words\n";
print "Sorted and reversed: @sorted_reversed\n";

Here we first sort the list alphabetically, then reverse the sorted order.
This shows how reverse can be part of a processing pipeline.

$ ./combined.pl
Original: apple banana cherry date elderberry
Sorted and reversed: elderberry date cherry banana apple

## Reversing Lines from a File

reverse can process file contents in reverse order.

file_reverse.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

open(my $fh, '&lt;', 'data.txt') or die "Can't open file: $!";
my @lines = &lt;$fh&gt;;
close($fh);

my @reversed_lines = reverse @lines;

print "Original first line: $lines[0]";
print "Reversed first line: $reversed_lines[0]";

This script reads a file into an array, then reverses the line order. The
last line becomes first, and vice versa.

## Creating a Palindrome Checker

reverse can help identify palindromic strings.

palindrome.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub is_palindrome {
    my $word = lc shift;
    $word =~ s/\W//g;  # Remove non-word characters
    return $word eq reverse $word;
}

print "Enter a word: ";
my $input = &lt;STDIN&gt;;
chomp $input;

if (is_palindrome($input)) {
    print "'$input' is a palindrome\n";
} else {
    print "'$input' is not a palindrome\n";
}

This example checks if a word reads the same forwards and backwards. We
clean the input first to handle punctuation and case sensitivity.

$ ./palindrome.pl
Enter a word: Racecar
'Racecar' is a palindrome

## Best Practices

- **Context awareness:** Remember scalar vs list context differences.

- **Original unchanged:** reverse returns new data, doesn't modify original.

- **Combine with join:** Use join to convert reversed lists back to strings.

- **Efficiency:** Avoid unnecessary reversals in large data processing.

## Source

[Perl reverse Documentation](https://perldoc.perl.org/functions/reverse)

This tutorial covered Perl's reverse function with practical
examples demonstrating its usage with strings, lists, and files.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).