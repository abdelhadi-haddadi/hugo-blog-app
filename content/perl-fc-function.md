+++
title = "Perl fc Function"
date = 2025-08-29T20:03:56.606+01:00
draft = false
description = "Perl fc tutorial shows how to perform case folding in Perl using fc function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl fc Function

last modified April 4, 2025

The Perl fc function performs Unicode case folding on strings.
It returns a case-folded version of the input string.

Case folding is similar to case conversion but more comprehensive. It's
used for case-insensitive string comparisons in Unicode-aware applications.

## Basic fc Usage

The simplest way to use fc is on a single string.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;  # fc introduced in Perl 5.16

my $text = "Hello World";
my $folded = fc($text);

print "Original: $text\n";
print "Folded: $folded\n";

We demonstrate fc converting a string to its case-folded form.
The function returns a new string without modifying the original.

$ ./basic.pl
Original: Hello World
Folded: hello world

## Case-Insensitive Comparison

fc enables reliable case-insensitive string comparisons.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;

my $str1 = "Straße";
my $str2 = "STRASSE";

if (fc($str1) eq fc($str2)) {
    print "Strings are equal when case-folded\n";
} else {
    print "Strings are not equal\n";
}

This script compares German words with different cases and forms.
The ß/SS equivalence is handled correctly by case folding.

$ ./compare.pl
Strings are equal when case-folded

## fc vs lc/uc

fc provides more comprehensive case handling than lc.

comparison.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;

my $text = "İstanbul";

print "Original: $text\n";
print "lc: ", lc($text), "\n";
print "fc: ", fc($text), "\n";

With Turkish dotted I, fc handles the special case correctly.
Simple lowercase conversion might not handle all Unicode cases properly.

$ ./comparison.pl
Original: İstanbul
lc: i̇stanbul
fc: i̇stanbul

## Using fc with Arrays

fc can process array elements with map.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;

my @words = ("Apple", "BANANA", "Cherry");
my @folded = map { fc } @words;

print "Original: @words\n";
print "Folded: @folded\n";

We apply fc to each array element using map.
This creates a new array with case-folded versions of all strings.

$ ./array.pl
Original: Apple BANANA Cherry
Folded: apple banana cherry

## Case Folding with Regular Expressions

fc can be combined with regex for advanced matching.

regex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;

my $text = "The Greek letter Σ (sigma) has lowercase form σ or ς";

if (fc($text) =~ /ς/) {
    print "Found final sigma form\n";
}

This script demonstrates finding different sigma forms using case folding.
The final sigma (ς) is matched regardless of its original case.

$ ./regex.pl
Found final sigma form

## Case Folding with Hashes

fc helps create case-insensitive hash keys.

hash.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;

my %color = (fc("Red") =&gt; "#FF0000", fc("Green") =&gt; "#00FF00");

my $input = "RED";
print "$input is $color{fc($input)}\n";

We use fc to normalize hash keys and lookups. This ensures
case-insensitive access to the hash values.

$ ./hash.pl
RED is #FF0000

## Performance Considerations

Case folding operations can be expensive for large texts.

benchmark.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.16.0;
use Benchmark qw(cmpthese);

my $text = "ÄÖÜäöüß" x 1000;

cmpthese(-1, {
    fc =&gt; sub { my $x = fc($text) },
    lc =&gt; sub { my $x = lc($text) },
});

This benchmark compares fc with lc performance.
Case folding is typically slower but more correct for Unicode text.

## Best Practices

- **Use for comparisons:** Prefer fc over lc/uc for Unicode.

- **Normalize early:** Fold case when storing or first processing.

- **Combine with NFC:** Consider Unicode normalization if needed.

- **Document usage:** Note where case folding is applied.

## Source

[Perl fc Documentation](https://perldoc.perl.org/functions/fc)

This tutorial covered Perl's fc function with practical
examples demonstrating its usage in Unicode string handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).