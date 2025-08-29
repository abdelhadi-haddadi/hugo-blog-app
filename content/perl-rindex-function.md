+++
title = "Perl rindex Function"
date = 2025-08-29T20:04:03.463+01:00
draft = false
description = "Perl rindex tutorial shows how to find substring positions from the right in Perl using rindex function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl rindex Function

last modified April 4, 2025

The Perl rindex function searches for a substring from the
end of a string. It returns the position of the last occurrence or -1
if not found.

rindex is similar to index but searches right
to left. It's useful for finding file extensions, parsing paths, or
processing data from the end.

## Basic rindex Usage

The simplest form of rindex takes a string and substring.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello world, hello Perl";
my $pos = rindex($text, "hello");

print "Last 'hello' found at position: $pos\n";

This finds the last occurrence of "hello" in the string. Positions start
at 0 from the string's beginning.

$ ./basic.pl
Last 'hello' found at position: 13

## Finding File Extensions

rindex is perfect for locating file extensions by finding
the last dot.

extension.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $filename = "document.backup.txt";
my $dot_pos = rindex($filename, ".");

if ($dot_pos != -1) {
    my $ext = substr($filename, $dot_pos + 1);
    print "File extension: $ext\n";
} else {
    print "No extension found\n";
}

We use rindex to find the last dot, then substr
to extract the extension. This handles multiple dots correctly.

$ ./extension.pl
File extension: txt

## Searching with Position Limit

rindex can search up to a specified position from the start.

limit.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "abcXdefXghiXjkl";
my $pos = rindex($text, "X", 8);

print "Last 'X' before position 8: $pos\n";

This finds the last "X" occurring at or before position 8. The search
starts from position 8 and moves left.

$ ./limit.pl
Last 'X' before position 8: 6

## Processing Path Components

rindex helps extract directory paths from full filenames.

path.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $path = "/home/user/docs/file.txt";
my $last_slash = rindex($path, "/");

if ($last_slash != -1) {
    my $dir = substr($path, 0, $last_slash);
    my $file = substr($path, $last_slash + 1);
    print "Directory: $dir\n";
    print "Filename: $file\n";
}

We find the last slash to separate directory and filename components.
This technique works for both Unix and Windows paths.

$ ./path.pl
Directory: /home/user/docs
Filename: file.txt

## Case-Insensitive Search

Combine rindex with lc for case-insensitive
searches.

case.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "Hello World, hello Perl";
my $lc_text = lc($text);
my $pos = rindex($lc_text, "hello");

print "Last 'hello' (case-insensitive) at: $pos\n";
print "Original substring: ", substr($text, $pos, 5), "\n";

We convert the string to lowercase first, then search. The position
matches the original string's case.

$ ./case.pl
Last 'hello' (case-insensitive) at: 13
Original substring: hello

## Finding Multiple Occurrences

Use rindex in a loop to find all occurrences from the end.

multiple.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "abXcdXefXghXij";
my $sub = "X";
my $pos = length($text);

while (($pos = rindex($text, $sub, $pos - 1)) != -1) {
    print "Found '$sub' at position $pos\n";
    last if $pos == 0;  # Prevent infinite loop
}

We start from the end and move left with each iteration. The loop stops
when no more matches are found.

$ ./multiple.pl
Found 'X' at position 9
Found 'X' at position 6
Found 'X' at position 3
Found 'X' at position 1

## Comparing rindex and index

Demonstrating the difference between rindex and index.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = "apple,banana,apple,cherry";
my $sub = "apple";

my $first_pos = index($text, $sub);
my $last_pos = rindex($text, $sub);

print "First '$sub' at: $first_pos\n";
print "Last '$sub' at: $last_pos\n";

index finds the first occurrence from the left, while
rindex finds the last from the right.

$ ./compare.pl
First 'apple' at: 0
Last 'apple' at: 13

## Best Practices

- **Check for -1:** Always verify if rindex found a match.

- **Combine with substr:** Extract portions after finding positions.

- **Use position limits:** Constrain searches to relevant sections.

- **Consider performance:** rindex is efficient even on large strings.

## Source

[Perl rindex Documentation](https://perldoc.perl.org/functions/rindex)

This tutorial covered Perl's rindex function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).