+++
title = "Perl string"
date = 2025-08-29T20:04:04.698+01:00
draft = false
description = "Perl string tutorial shows how to work with strings in Perl. Perl is a sequence of characters."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl string

last modified August 24, 2023

Perl string tutorial shows how to work with strings in Perl. 
[Perl string II](/perl/string2) is the second part of the tutorial.

A Perl string is a sequence of characters. Strings are defined either with
single or with double quotes. The difference is that within double quotes
variables are interpolated and special escape sequences are evaluated.

In addition, Perl contains q and qq operators to
define strings.

Perl contains many built-in functions to work with strings, such as
length, uc, lc, or substr.
Also, there are third-party modules for working with strings; e.g.
String::Util.

Perl is widely regarded as the language with the leading support for regular
expressions. With regular expressions, we can perform advanced text
manipulations.

## Perl string simple example

Both single and double quotes can be used to create string literals.

simple.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say 'falcon';
say "owl";

say "-----------------------";

say 'Perl language';
print "Python language\n";

say "-----------------------";

say 'a)\t\tChapter I';
say "a)\t\tChapter I";

Strings defined with single quotes do not evaluate escape sequences.

say 'falcon';
say "owl";

Both single and double qoutes can be used to define strings in Perl.

say 'a)\t\tChapter I';
say "a)\t\tChapter I";

The \t is an escape sequence for a tab character; it is not
evaluated within a pair of single ('') characters.

$ ./simple.pl
falcon
owl
-----------------------
Perl language
Python language
-----------------------
a)\t\tChapter I
a)		Chapter I

## Perl string using quotes

What if we wanted to display quotes, for example in a direct speech? There are
basically two ways to do this in Perl.

quotes.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say "There are many stars";
say "He said, \"Which one is your favourite?\"";

say 'There are many stars';
say 'He said, "Which one is your favourite?"';

We use the (\) character to escape additional quotes. Normally the double quote
character is used to delimit a string literal. However, when escaped, the
original meaning is suppressed. It appears as a normal character and can be used
within a string literal. The second way to use quotes within quotes is to mix
single and double quotes.

$ ./quotes.pl
There are many stars
He said, "Which one is your favourite?"
There are many stars
He said, "Which one is your favourite?"

## Perl string length

The size of the string is determined with the length function.

string_size.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $msg = 'an old falcon';
say length $msg;

The example prints the size of the string.

$ ./string_size.pl 
13

## Perl string comparison

In Perl, strings are compared with the eq operator.

comparison.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $w1 = 'falcon';
my $w2 = 'Falcon';

if ($w1 eq $w2) {

    say 'the strings are equal';
} else {

    say 'the strings are not equal';
}

The example compares two strings.

$ ./comparison.pl 
the strings are not equal

## Perl string repeat

The x operator repeats the given string.

comparison.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say 'falcon ' x 4;

The example repeats the specified string four times.

$ ./repeat.pl 
falcon falcon falcon falcon 

## Perl string special characters

Within strings, some charactes have a special purpose. For instance, the 
$ character denotes a variable which is evaluated within
double-qouted strings. To use such characters in their primary meaning, we
escape them with the \ character; 

specials.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say "The special character \\";
say 'The special character \'';
say "The special character \"";
say "The special character \$";

The example prints four special characters.

$ ./specials.pl 
The special character \
The special character '
The special character "
The special character $

## Perl string escape sequences

Escape sequences are special characters that have a specific meaning when used
within a double-quoted string literal. 

The \n starts a newline, the \t inserts a tab
character, the \r returs to the beginning of the string, the 
\U uppercases the following characters, and the \L
lowercases the following characters.

escapes.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say "\tfalcon";
say "falcon\nfalcon\nfancon";
say "falcon\rhawk";
say "\Ufalcon";
say "\LSUN";

The example demonstrates five escape sequences.

$ ./escapes.pl 
falcon
falcon
falcon
fancon
hawkon
FALCON
sun

## Perl concatenate strings

Perl uses the . character to add strings.

concat.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

say 'Perl ' . ' programming ' . 'language';

The example adds three strings using the dot character.

There are other ways to add strings in Perl.

concat2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $w1 = 'an';
my $w2 = 'old';
my $w3 = 'hawk';

say $w1 . ' ' . $w2 . ' ' . $w3;
say "$w1 $w2 $w3";

say join ' ', $w1, $w2, $w3;

my $res = sprintf "%s %s %s", $w1, $w2, $w3;
say $res;

In addition to the dot character, the example uses the join and 
sprintf functions to add strings.

say join ' ', $w1, $w2, $w3;

The join function joins the three strings with the specified space 
character into one string.

my $res = sprintf "%s %s %s", $w1, $w2, $w3;

The sprintf function returns a formatted string. The %s
specifiers are replaced with the contents of the given variables.

$ ./concat2.pl 
an old hawk
an old hawk
an old hawk
an old hawk

## Perl q and qq string operators

The q and qq are convenience operators to for defining
strings.

qops.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $s1 = q/\tThere is a \Ufalcon\E in the sky./;
my $s2 = qq/\tThere is a \Ufalcon\E in the sky./;

say $s1;
say $s2;

With q we create single-qouted strings; with qq we 
create double-qouted strings.

$ ./qops.pl 
\tThere is a \Ufalcon\E in the sky.
     There is a FALCON in the sky.

## Perl string qw operator

The qw is a convenience operator for creating a list of
single-quoted strings.

qw_oper.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/sky cloud cup forest falcon/;

foreach (@words) {

    say $_;
}

The example creates a list of words; the elements of the list are printed to the 
console in a foreach loop.

my @words = qw/sky cloud cup forest falcon/;

The qw is a very handy operator; we do not have to specify the 
quote characters and the commas.

$ ./qw_oper.pl 
sky
cloud
cup
forest
falcon

## Perl string interpolation

String interpolation is variable interpolation within double-quoted strings.

interpolation.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $name = 'Jane';
my $age = 17;

say "$name is $age years old.";

my @words = ('sky', 'blue', 'cup', 'road');
say "@words";

$" = '-';
say "@words";

In the example, we interpolate two scalars and one array.

my $name = 'Jane';
my $age = 17;

say "$name is $age years old.";

Inside the double-quoted string, the $name and $age 
variables are substituted with their values.

$" = '-';
say "@words";

The $" is a special list separator variable; it sets the separator 
character of the elements in the list.

$ ./interpolation.pl 
Jane is 17 years old.
sky blue cup road
sky-blue-cup-road

## Perl string baby cart operator

The "baby cart" operator @{[]} allows us to evaluate expressions 
within strings.

baby_cart.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Time::Piece;

say "The time is @{[localtime-&gt;hms]}";
say "2 + 2 = @{[2 + 2]}";

Using the @{[]} operator, we evaluate the current time and a simple 
arithmetic operation within strings.

$ ./baby_cart.pl 
The time is 15:03:14
2 + 2 = 4

## Perl string Qoute::Code

With the Qoute::Code module, we can evalute expressions.

quote_code.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Quote::Code;

my $n = 4;

say qc"$n = {$n}";
say qc"$n * $n = {$n * $n}";

The example evalutes a simple arithmetic expression.

$ ./quote_code.pl 
$n = 4
$n * $n = 16

## Perl string palindrome

A palindrome is a word, number, phrase, or other sequence of characters which
reads the same backward as forward, such as madam or racecar. There are many
ways to check if a string is a palindrome. The following example is one of the
possible solutions. 

The built-in reverse function reverses the characters of a string 
in a scalar context.

palindrome.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/sky racecar tool kayak arc madam level/;

foreach (@words) {

    if ($_ eq reverse $_) {

        say "$_ is a palindrome";
    } else {

        say "$_ is not a palindrome";
    }
}

If the reversed string equals the original string, we have a palindrome.

$ ./palindrome.pl
sky is not a palindrome
racecar is a palindrome
tool is not a palindrome
kayak is a palindrome
arc is not a palindrome
madam is a palindrome
level is a palindrome

## Perl string uc and lc functions

The uc function returns an uppercased version of the string, while 
the lc function returns a lowercased version of the string.

In addition, we can also use the \U and \L escape 
sequences.

upper_lower.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $msg = "And old falcon";

say uc $msg;
say lc $msg;

say '------------------';

say "\U$msg";
say "\L$msg";

The example turns a string into uppercased and lowercased letters.

$ ./upper_lower.pl 
AND OLD FALCON
and old falcon
------------------
AND OLD FALCON
and old falcon

In the next example, we modify the case of non-ascii letters.

upper_lower2.pl
  

#!/usr/bin/perl

use 5.30.0;
use utf8;
use warnings;
use open qw( :std :encoding(UTF-8) );

my $word = "Čerešňa";

say uc $word;
say lc $word;

say '------------------';

say "\U$word";
say "\L$word";

The example changes the case of a Slovak word 'Čerešňa'.

use utf8;

The use utf8 pragma tells the Perl parser to allow UTF-8 in the
program text in the current lexical scope.

use open qw( :std :encoding(UTF-8) );

The open pragma changes the encoding of the standard filehandles.
This is necessary for correct output.

$ ./upper_lower2.pl 
ČEREŠŇA
čerešňa
------------------
ČEREŠŇA
čerešňa

## Perl string emojis

Emojis area pictorial representations of a facial expression susing characters.

emojis.pl
  

#!/usr/bin/perl

use 5.30.0;
use utf8;
use warnings;
use open qw( :std :encoding(UTF-8) );

my $text = "🐄🦙🐘🐫🐑🦝🦍🐯";
my @emojis = split '', $text;

foreach (@emojis) {

    say;
}

say length $text;

use bytes;
say length $text;

The example splits a string consisting of emoticons and then prints each
emoticon separately on the console.

say length $text;

We get the size of the string in characters with length.

use bytes;
say length $text;

We get the length of the string in bytes.

$ ./emojis.pl 
🐄
🦙
🐘
🐫
🐑
🦝
🦍
🐯
8
32

In this article we have worked with a string data type in Perl.

Visit [Perl string II](/perl/string2/) or list all
Perl tutorials.