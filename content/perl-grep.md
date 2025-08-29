+++
title = "Perl grep"
date = 2025-08-29T20:03:56.618+01:00
draft = false
description = "Perl grep tutorial shows how to filter values with grep function in Perl."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl grep

last modified August 24, 2023

Perl grep tutorial shows how to filter values with grep function in Perl.

The grep function evaluates a block or an expression for each element
of a list and returns a list consisting of those elements for which the
expression evaluated to true. It sets $_ locally to each element.
In scalar context, it returns the number of times the expression was true.

## Perl grep simple example

We start with a simple example.

simple.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

my @vals = (-3, -1, 0, 3, -4, 2, 3, 4, -7);

my @res = grep { $_ &lt; 0 } @vals;
say "@res"; 

my $n = grep { $_ &lt; 0 } @vals;
say "there are $n negative values";

The example uses grep on a list of integers.

my @res = grep { $_ &lt; 0 } @vals;
say "@res"; 

Here we filter out all negative values.

my $n = grep { $_ &lt; 0 } @vals;
say "there are $n negative values";

In a scalar context, we get the number of elements that match the given
condition.

$ ./simple.pl 
-3 -1 -4 -7
there are 4 negative values

## Perl grep regex

Regular expressions can be used to filter data.

digits.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

my @vals = ("sky", 0, -1, "cup", "breed", "345", 12);

my @res = grep /\d/, @vals;
say "@res"; 

In the example, we use the \d regular expression to filter out 
all digits from the list.

$ ./digits.pl 
0 -1 345 12

In the next example, we grep a list of words.

words.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

my @words = qw/sky war cup cloud abyss water car book note falcon/;

my @res = grep /^[w,c]/, @words;
say "@res";

my @res2 = grep /^...$/, @words;
say "@res2";

We find out all words that start with either 'w' or 'c' and all words that 
have exactly three characters.

$ ./words.pl
war cup cloud water car
sky war cup car

## Perl grep file

We can use grep with a file handle.

words.txt
  

sky
water
rock
falcon
cloud
war
nice
cup
wrong

We have a small text file.

fhandle.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

open my $fh, "&lt;", "words.txt"
    or die "cannot open file $!";

my @res = grep /^w/, &lt;$fh&gt;;
say join "", @res; 

close $fh;

We grep a file handle to find all words that start with 'w';

$ ./fhandle.pl
water
war
wrong

In this article we have worked with the grep function in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).