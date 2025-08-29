+++
title = "Perl substr Function"
date = 2025-08-29T20:04:05.821+01:00
draft = false
description = "Perl substr tutorial shows how to extract and modify substrings in Perl using substr function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl substr Function

last modified April 4, 2025

The Perl substr function extracts or replaces portions of strings.
It's a versatile tool for string manipulation with several operation modes.

substr can work as an lvalue (modifiable) or return a substring.
It handles both positive and negative offsets for flexible string access.

## Basic substr Usage

The simplest form extracts a substring starting at a position with a length.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello, Perl world!";
my $sub = substr($text, 7, 4);

print "Original: $text\n";
print "Substring: '$sub'\n";

We extract a 4-character substring starting at position 7 (0-based index).
The function returns "Perl" without modifying the original string.

$ ./basic.pl
Original: Hello, Perl world!
Substring: 'Perl'

## Negative Offset

Negative offsets count from the end of the string, useful for suffix access.

negative.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $filename = "document.txt";
my $extension = substr($filename, -3);

print "Filename: $filename\n";
print "Extension: '$extension'\n";

Using -3 as offset starts counting from the string's end. This extracts
the last 3 characters, commonly used for file extensions.

$ ./negative.pl
Filename: document.txt
Extension: 'txt'

## Omitting Length

When length is omitted, substr returns all remaining characters.

length_omit.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "The quick brown fox";
my $rest = substr($text, 10);

print "Original: $text\n";
print "From position 10: '$rest'\n";

Starting at position 10, we get all remaining characters without specifying
length. This is convenient for splitting strings at known positions.

$ ./length_omit.pl
Original: The quick brown fox
From position 10: 'brown fox'

## String Replacement

substr can modify strings when used as an lvalue.

replace.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "I like apples";
substr($text, 7, 6) = "oranges";

print "Modified string: $text\n";

We replace 6 characters starting at position 7 with "oranges". The original
string is modified directly through the lvalue assignment.

$ ./replace.pl
Modified string: I like oranges

## Inserting Strings

Using length 0 with replacement inserts without removing characters.

insert.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello world!";
substr($text, 6, 0) = "beautiful ";

print "Modified string: $text\n";

By specifying length 0, we insert "beautiful " at position 6 without
removing any existing characters. This performs a pure insertion.

$ ./insert.pl
Modified string: Hello beautiful world!

## Combining with Regular Expressions

substr can work with regex matches for precise string operations.

regex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Date: 2023-04-15";
$text =~ /(\d{4}-\d{2}-\d{2})/;

my $date = substr($text, $-[1], $+[1] - $-[1]);
print "Extracted date: $date\n";

We use regex match variables $-[1] and $+[1] to get
the start and end positions of the matched date. substr then
extracts exactly this portion.

$ ./regex.pl
Extracted date: 2023-04-15

## Multi-byte Character Handling

For Unicode strings, special consideration is needed for character boundaries.

unicode.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;
use utf8;

my $text = "日本語のテキスト";
my $sub = substr($text, 3, 3);

print "Original: $text\n";
print "Substring: $sub\n";

With UTF-8 strings, positions refer to characters, not bytes. The example
extracts 3 Japanese characters starting from position 3.

$ ./unicode.pl
Original: 日本語のテキスト
Substring: のテキ

## Best Practices

- **Check bounds:** Verify positions are within string length.

- **Use negative offsets:** For convenient end-relative access.

- **Document complex operations:** When combining multiple features.

- **Consider Unicode:** Be aware of multi-byte character handling.

## Source

[Perl substr Documentation](https://perldoc.perl.org/functions/substr)

This tutorial covered Perl's substr function with practical
examples demonstrating its usage in common string manipulation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).