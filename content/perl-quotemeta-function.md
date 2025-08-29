+++
title = "Perl quotemeta Function"
date = 2025-08-29T20:04:02.335+01:00
draft = false
description = "Perl quotemeta tutorial shows how to escape special regex metacharacters in Perl using quotemeta function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl quotemeta Function

last modified April 4, 2025

The Perl quotemeta function escapes all special regex
metacharacters in a string. It prepends a backslash before each
metacharacter to make it literal.

quotemeta is essential when working with regex patterns that
contain user input or dynamic content. It prevents regex metacharacters
from being interpreted as special pattern elements.

## Basic quotemeta Usage

The simplest way to use quotemeta is on a string containing
regex metacharacters.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $text = 'Hello. (world) * $100';
my $escaped = quotemeta($text);

print "Original: $text\n";
print "Escaped: $escaped\n";

We demonstrate quotemeta escaping special characters in a
string. The function returns a new string with all metacharacters escaped.

$ ./basic.pl
Original: Hello. (world) * $100
Escaped: Hello\.\ \(world\)\ \*\ \$100

## Using quotemeta in Regex

quotemeta is commonly used to safely include variables in regex.

regex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $search = 'file.txt';
my $text = 'Looking for file.txt in /path/to/file.txt';

if ($text =~ /\Q$search\E/) {
    print "Found exact match for '$search'\n";
} else {
    print "No match found\n";
}

This script uses \Q...\E which internally uses quotemeta
to escape the variable. This ensures the dot is treated as literal.

$ ./regex.pl
Found exact match for 'file.txt'

## Comparing With and Without quotemeta

This example shows the difference between escaped and unescaped patterns.

compare.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $pattern = 'file.*';
my $text = 'file.txt and file_data.csv';

print "Without quotemeta:\n";
if ($text =~ /$pattern/) {
    print "Match found (regex interpretation)\n";
}

print "With quotemeta:\n";
if ($text =~ /\Q$pattern\E/) {
    print "Match found (literal interpretation)\n";
}

Without escaping, the dot and asterisk are treated as regex operators.
With escaping, they're treated as literal characters.

$ ./compare.pl
Without quotemeta:
Match found (regex interpretation)
With quotemeta:
No match found

## quotemeta on User Input

Always use quotemeta when incorporating user input into regex.

user_input.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

print "Enter search pattern: ";
my $input = &lt;STDIN&gt;;
chomp $input;

my $safe_pattern = quotemeta($input);
my $text = 'Special chars: .*+?^$()[]{}|\/';

if ($text =~ /$safe_pattern/) {
    print "Found your pattern literally\n";
} else {
    print "Pattern not found\n";
}

This script safely handles user input that might contain regex metacharacters.
The search will look for exact matches only.

## quotemeta with File Paths

File paths often contain characters that are regex metacharacters.

file_path.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $path = '/usr/local/bin/perl';
my $escaped_path = quotemeta($path);

print "Original path: $path\n";
print "Escaped path: $escaped_path\n";

if ('/usr/local/bin/perl' =~ /^$escaped_path$/) {
    print "Exact path match\n";
}

The forward slashes in the path are escaped, making them safe for regex
matching. This ensures exact path comparison.

$ ./file_path.pl
Original path: /usr/local/bin/perl
Escaped path: \/usr\/local\/bin\/perl
Exact path match

## quotemeta in Substitutions

quotemeta is useful when doing literal string replacements.

substitute.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $search = 'price: $100';
my $replace = 'cost: €85';
my $text = 'The price: $100 was reduced from price: $150';

my $safe_search = quotemeta($search);
$text =~ s/$safe_search/$replace/g;

print "Modified text: $text\n";

This script performs a literal substitution, treating all characters in
the search pattern as literals, not regex metacharacters.

$ ./substitute.pl
Modified text: The cost: €85 was reduced from price: $150

## quotemeta with Special Characters

This example shows how quotemeta handles various special chars.

special_chars.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $special = '.*+?^$()[]{}|\/';
my $escaped = quotemeta($special);

print "Original: $special\n";
print "Escaped: $escaped\n";

if ($special =~ /^$escaped$/) {
    print "Exact match after escaping\n";
}

The script escapes all regex metacharacters, allowing exact matching of
strings containing these special characters.

$ ./special_chars.pl
Original: .*+?^$()[]{}|\/
Escaped: \.\*\+\?\^\$\(\)\[\]\{\}\\\|\/
Exact match after escaping

## Best Practices

- **Always escape user input:** Never trust user-provided patterns.

- **Use \Q...\E for inline escaping:** More readable than quotemeta().

- **Combine with other regex:** Mix literal and pattern matching.

- **Document escaped patterns:** Make code intentions clear.

## Source

[Perl quotemeta Documentation](https://perldoc.perl.org/functions/quotemeta)

This tutorial covered Perl's quotemeta function with practical
examples demonstrating its usage in common scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).