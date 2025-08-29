+++
title = "Perl uc Function"
date = 2025-08-29T20:04:05.807+01:00
draft = false
description = "Perl uc tutorial shows how to convert strings to uppercase in Perl using uc function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl uc Function

last modified April 4, 2025

The Perl uc function converts all characters in a string to
uppercase. It's a built-in string manipulation function that handles
locale-specific case conversion.

uc returns a new string and doesn't modify the original. For
in-place modification, Perl provides the uc in combination
with assignment.

## Basic uc Usage

The simplest way to use uc is on a single string variable.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello World";
my $upper = uc($text);

print "Original: $text\n";
print "Uppercase: $upper\n";

We demonstrate uc converting a string to uppercase. The original
string remains unchanged while a new uppercase version is created.

$ ./basic.pl
Original: Hello World
Uppercase: HELLO WORLD

## In-Place Conversion

To modify a string directly, combine uc with assignment.

inplace.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "perl programming";
print "Before: $text\n";

$text = uc($text);
print "After: $text\n";

This shows how to convert a string to uppercase while modifying the original
variable. The assignment replaces the original value.

$ ./inplace.pl
Before: perl programming
After: PERL PROGRAMMING

## Locale Awareness

uc respects the current locale settings for case conversion.

locale.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use locale;

my $text = "straße";  # German street
my $upper = uc($text);

print "Original: $text\n";
print "Uppercase: $upper\n";

With use locale, uc handles special characters
correctly according to the current locale. The German ß becomes SS.

$ ./locale.pl
Original: straße
Uppercase: STRASSE

## Array Processing

uc can process array elements with map.

array.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @words = ("apple", "banana", "cherry");
my @upper = map { uc } @words;

print "Original: @words\n";
print "Uppercase: @upper\n";

We use map to apply uc to each array element.
This creates a new array with all elements converted to uppercase.

$ ./array.pl
Original: apple banana cherry
Uppercase: APPLE BANANA CHERRY

## Hash Keys Conversion

uc is useful for normalizing hash keys to uppercase.

hash.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my %config = (
    "timeout" =&gt; 30,
    "retries" =&gt; 3,
    "debug" =&gt; 0
);

my $key = "Timeout";
print "Value: ", $config{lc $key}, "\n";

# Convert all keys to uppercase
my %upper_config = map { uc $_ =&gt; $config{$_} } keys %config;
print join(", ", keys %upper_config), "\n";

This demonstrates converting hash keys to uppercase for case-insensitive
lookups. We use both uc and lc for normalization.

$ ./hash.pl
Value: 30
TIMEOUT, RETRIES, DEBUG

## File Processing

uc can standardize text when processing files.

file.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

open(my $fh, '&lt;', 'data.txt') or die "Can't open file: $!";

while (my $line = &lt;$fh&gt;) {
    chomp $line;
    print uc($line), "\n";
}

close($fh);

This script reads a file line by line, converts each line to uppercase,
and prints it. Combining chomp and uc is common.

## Unicode Handling

uc properly handles Unicode characters when using appropriate
Perl versions and settings.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $text = "café résumé";
my $upper = uc($text);

binmode STDOUT, ':utf8';
print "Original: $text\n";
print "Uppercase: $upper\n";

With use utf8, Perl correctly handles non-ASCII characters.
The output shows proper conversion of accented letters to uppercase.

$ ./unicode.pl
Original: café résumé
Uppercase: CAFÉ RÉSUMÉ

## Best Practices

- **Preserve originals:** Create new variables for uppercase versions.

- **Use locale:** Enable locale for language-specific conversions.

- **Combine with lc:** For case-insensitive comparisons.

- **Handle Unicode:** Use utf8 pragma for non-ASCII text.

- **Document conversions:** Make case changes obvious in code.

## Source

[Perl uc Documentation](https://perldoc.perl.org/functions/uc)

This tutorial covered Perl's uc function with practical
examples demonstrating its usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).