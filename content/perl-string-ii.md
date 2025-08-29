+++
title = "Perl string II"
date = 2025-08-29T20:04:05.831+01:00
draft = false
description = "Perl string II tutorial is the second part of the Perl string tutorial. We continue covering the string data type in Perl."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl string II

last modified August 24, 2023

Perl string II tutorial is the second part of the Perl string tutorial. We
continue covering the string data type in Perl. Visit
[Perl string](/perl/string/) for the first part of the tutorial.

## Perl multiline strings

There are several ways to create multiline strings in Perl.

multiline.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $sonnet = "Not marble, nor the gilded monuments Of princes, shall outlive
this powerful rhyme; But you shall shine more bright in these contents Than
unswept stone, besmear'd with sluttish time. When wasteful war shall statues
overturn, And broils root out the work of masonry, Nor Mars his sword nor war's
quick fire shall burn The living record of your memory. 'Gainst death and
all-oblivious enmity Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity That wear this world out to the ending doom.
So, till the judgment that yourself arise, You live in this, and dwell in
lovers' eyes.";

say $sonnet;

Unlike other languages, Perl allows multiline strings within a pair of quotes.

$ ./multiline.pl Not marble, nor the gilded monuments Of princes, shall outlive
this powerful rhyme; But you shall shine more bright in these contents Than
unswept stone, besmear'd with sluttish time. When wasteful war shall statues
overturn, And broils root out the work of masonry, Nor Mars his sword nor war's
quick fire shall burn The living record of your memory. 'Gainst death and
all-oblivious enmity Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity That wear this world out to the ending doom.
So, till the judgment that yourself arise, You live in this, and dwell in
lovers' eyes.

Another way is to use the q or qq operators.

multiline2.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $sonnet = qq/Not marble, nor the gilded monuments Of princes, shall outlive
this powerful rhyme; But you shall shine more bright in these contents Than
unswept stone, besmear'd with sluttish time. When wasteful war shall statues
overturn, And broils root out the work of masonry, Nor Mars his sword nor war's
quick fire shall burn The living record of your memory. 'Gainst death and
all-oblivious enmity Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity That wear this world out to the ending doom.
So, till the judgment that yourself arise, You live in this, and dwell in
lovers' eyes./;

say $sonnet;

The example uses the qq operator to create a multiline text; the
string uses double quotes.

Another way is to use here document, a feature known from Unix shells.

multiline3.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $sonnet = &lt;&lt; "TEXT"; Not marble, nor the gilded monuments Of princes,
shall outlive this powerful rhyme; But you shall shine more bright in these
contents Than unswept stone, besmear'd with sluttish time. When wasteful war
shall statues overturn, And broils root out the work of masonry, Nor Mars his
sword nor war's quick fire shall burn The living record of your memory. 'Gainst
death and all-oblivious enmity Shall you pace forth; your praise shall still
find room Even in the eyes of all posterity That wear this world out to the
ending doom. So, till the judgment that yourself arise, You live in this, and
dwell in lovers' eyes. TEXT

say $sonnet;

The start and end of the here document is specified with a delimiter: "TEXT" in
our case. A double-qouted delimiter creates a double-qouted string, whereas
single-qouted delimiter creates a single-qouted string.

## Perl string substr

The substr extracts a substring from the string and returns it. The
first character is at offset zero. If the offset parameter is negative, it
starts that far back from the end of the string. If the length parameter is
omitted, it returns everything through the end of the string.

substrings.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $word = "bookcase";

say substr $word, 0, 4; say substr $word, 4, 8; say substr $word, 4; say substr
$word, -8, 4; say substr $word, -4;

In the example we extract words from the "bookcase" word using the
substr function.

$ ./substrings.pl book case case book case

## Perl string startswith and endswith

The String::Util extension contains a few string utility functions.

starts_ends.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings; use String::Util qw/startswith endswith/;

my @words = qw/sky cup coin owl falcon war nice thorn/;

foreach (@words) {

    if (startswith 'c') {

        say;}}

say '-------------------------';

foreach (@words) {

    if (endswith 'n' or endswith 'r') {

        say;}}

We define a list of words. We find all words that start with 'c' and end with
'n' or 'r'.

$ ./starts_ends.pl cup coin ------------------------- coin falcon war thorn

## Perl string regex operator

The =~ operator associates the string with the regex match and
produces a true value if the regex matched, or false if the regex did not match.

regex_oper.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/book bookshelf bookworm bookcase bookish bookkeeper
    booklet bookmark/;

my $ptr = "^book(worm|mark|keeper)?\$";

foreach (@words) {

    if ($_ =~ $ptr) {

        say "$_ matches";
    }
}

We define a list of words. We go through the list and check if the list contains
any of the following words: book, bookworm, bookmark, bookkeper. We use the
alternation character | to specify multiple possible matches.

$ ./regex_oper.pl
book matches
bookworm matches
bookkeeper matches
bookmark matches

In the next example, we use regular expressions to remove specific characters
from words.

removing.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $text = qq/Did you go there? We did, but we had a "great" service there./;
my @words = split ' ', $text;

foreach my $word (@words) {

    $word =~ s/[?".!,]//g;
    say $word;
}

say '----------------------------';

foreach (@words) {

    $_ =~ s/[?".!,]//g;
    say;
}

We define a sentence and cut it into words.

my $text = qq/Did you go there? We did, but we had a "great" service there./;

A sentence with the qq operator is defined.

my @words = split ' ', $text;

A sentence is cut into words using the split function. We are not
yet done, because we have words such as there? and did, which contain
punctuation characters. These have to be removed.

foreach my $word (@words) {

    $word =~ s/[?".!,]//g;
    say $word;
}

The punctuation characters are removed with a regular expression. The s prefix
tells that we replace the given set of characters with no character, meaning we
remove them.

foreach (@words) {

    $_ =~ s/[?".!,]//g;
    say;
}

This is an alternative solution using the special $_ variable.

$ ./removing.pl
Did
you
go
there
We
did
but
we
had
a
great
service
there
----------------------------
Did
you
go
there
We
did
but
we
had
a
great
service
there

In the next example, we remove space from the string.

remove_space.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $send = 1;
my $name = 'John Doe';

if ($send) {
    (my $msg = qq{
        Dear $name,

        this is a message for you.

        Regards,
            Roger Roe
        }) =~ s/^ {8}//mg;

    say $msg;
}

We define a multiline string with the qq operator. Leading space up
to eight characters is removed by applying the s/^ {8}//mg regular
expression.

$ ./remove_space.pl

Dear John Doe,

this is a message for you.

Regards,
    Roger Roe

## Perl string empty/blank

An empty string has no characters, while a blank string contains only whitespace
characters.

blank_empty.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = ("sky", "\n\n", "  ", " cup", "\t\t", "", "\r", "\r\n", "sky");

my $i = 0;

foreach (@words) {

    if ($_ eq '') {

        say "$i -&gt; empty";
    } else {

        say "$i -&gt; not empty";
    }

    $i++;
}

say '-------------------------';

$i = 0;

foreach (@words) {

    if ($_ =~ /^\s*$/) {

        say "$i -&gt; blank";
    } else {

        say "$i -&gt; not blank";
    }

    $i++;
}

The example checks for empty strings with the eq operator. To
check for blank strings, we use the /^\s*$/ regular expression.

$ ./blank_empty.pl
0 -&gt; not empty
1 -&gt; not empty
2 -&gt; not empty
3 -&gt; not empty
4 -&gt; not empty
5 -&gt; empty
6 -&gt; not empty
7 -&gt; not empty
8 -&gt; not empty
-------------------------
0 -&gt; not blank
1 -&gt; blank
2 -&gt; blank
3 -&gt; not blank
4 -&gt; blank
5 -&gt; blank
6 -&gt; blank
7 -&gt; blank
8 -&gt; not blank

## Perl loop string

The next examples show how to iterate over string characters in Perl.

loop_chars.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $msg = 'an old falcon';
my $n = length $msg;
my $i = 0;

for (my $i=0; $i &lt; $n; $i++) {

    say substr $msg, $i, 1;
}

In the first example, we determine the length of the string with
length and then use the classic for loop. To get the character, we
use the substr function.

$ ./loop_chars.pl
a
n

o
l
d

f
a
l
c
o
n

The second example uses the split function and the
foreach loop.

loop_chars2.pl
  

#!/usr/bin/perl

use 5.30.0; use warnings;

my $msg = 'an old falcon';
my @chars = split '', $msg;

foreach (@chars) {

     say;
}

The split function is used to cut the string into the list of
characters. We iterate over the list with foreach.

The third example uses a regular expression and the foreach loop.

loop_chars3.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $msg = 'an old falcon';
my @chars = $msg =~ /./sg;

foreach (@chars) {

     say;
}

The regular expression is used to cut the string into the list of characters. We
iterate over the list with foreach.

## Perl string format

In Perl, we can use printf and sprintf functions to
format strings.

The functions take the format string and the list of arguments as parameters.

%[flags][width][.precision]specifier

The format specifier has this syntax. The options specified within [] characters
are optional.

The specifier character at the end defines the type and the interpretation of
its corresponding argument.

     - d or i - signed decimal integer

     - u - unsigned decimal integer

     - o - unsigned octal

     - b - an unsigned integer, in binary

     - B - like %b, but using an upper-case B with the # flag

     - x - unsigned hexadecimal integer

     - X - unsigned hexadecimal integer (uppercase)

     - f - decimal floating point, lowercase

     - F - decimal floating point, uppercase

     - e - scientific notation (mantissa/exponent), lowercase

     - E - scientific notation (mantissa/exponent), uppercase

     - g - the shortest representation of %e or %f

     - G - the shortest representation of %E or %F

     - a - hexadecimal floating point, lowercase

     - A - hexadecimal floating point, uppercase

     - c - a character

     - s - a string

     - p - pointer address

     - n - nothing printed

     - % - a double %% prints a single %

The *flags* is a set of characters that modify the output format. The set
of valid flags depends on the specifier character. The *width* is a
non-negative decimal integer indicating the minimum number of characters to be
written to the output. If the value to be printed is shorter than the width, the
result is padded with blank spaces. The value is not truncated even if the
result is larger.

For integer specifiers the precision sets the minimum number of
digits to be written. If the value to be written is shorter than this number,
the result is padded with leading zeros. For strings it is the maximum number of
characters to be printed. For e, E, f and F specifiers, it is the number of
digits to be printed after the decimal point. For g and G specifiers it is the
maximum number of significant digits to be printed.

format_funs.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $name = "Jane";
my $age = 17;

printf "%s is %d years old\n", $name, $age;

my $res = sprintf "%s is %d years old", $name, $age;
say $res;

printf "%d%%\n", 23

The formatting functions build the string according to the specified format
specifiers.

printf "%s is %d years old\n", $name, $age;

The printf function prints a formatted string to the console. The
%s expects a string variable and the %d an integer
variable.

my $res = sprintf "%s is %d years old", $name, $age;

The sprintf function formats a string into a variable.

printf "%d%%\n", 23

Since the % is a special character within the format string, it
needs to be doubled to print it as a percent sign.

$ ./format_funs.pl
Jane is 17 years old
Jane is 17 years old
23%

The formatting functions apply the format specifiers by the order of the given
arguments. The next example shows how to change their order.

format_index.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $oranges = 2;
my $apples = 4;
my $bananas = 3;

my $res = sprintf 'There are %d oranges, %d apples and %d bananas',
    $oranges, $apples, $bananas;
say $res;

my $res2 = sprintf 'There are %2$d oranges, %d apples and %1$d bananas',
    $oranges, $apples, $bananas;
say $res2;

We format two strings. In the first case, the variables are applied as they are
specified. In the second case, we change their order with 2$ and
1$ characters, which take the third and the second arguments,
respectively.

$ ./format_index.pl
There are 2 oranges, 4 apples and 3 bananas
There are 4 oranges, 2 apples and 2 bananas

The format specifier character defines the type and the interpretation of its
corresponding argument.

format_specs.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

printf "%d\n", 1671;
printf "%i\n", 1671;
printf "%u\n", 1671;
printf "%o\n", 1671;
printf "%x\n", 1671;
printf "%X\n", 1671;
printf "%#b\n", 1671;
printf "%#B\n", 1671;
printf "%a\n", 1671.678;
printf "%A\n", 1671.678;
printf "%f\n", 1671.678;
printf "%F\n", 1671.678;
printf "%e\n", 1671.678;
printf "%E\n", 1671.678;
printf "%g\n", 1671.678;
printf "%G\n", 1671.678;
printf "%s\n", 'Zetcode';
printf "%c %c %c %c %c %c %c\n", ord('Z'), ord('e'), ord('t'),
    ord('C'), ord('o'), ord('d'), ord('e');
printf "%p\n", 1671;
printf "%d%%\n", 1671;

The example shows the Perl's string format specifier characters.

$ ./format_specs.pl
1671
1671
1671
3207
687
687
0b11010000111
0B11010000111
0x1.a1eb645a1cac1p+10
0X1.A1EB645A1CAC1P+10
1671.678000
1671.678000
1.671678e+03
1.671678E+03
1671.68
1671.68
Zetcode
Z e t C o d e
556e7c3c97b8
1671%

## Perl string format numeric notations

The following example shows how to use various numeric notations.

notations.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $val = 1234;

printf "%d\n", $val;
printf "%x\n", $val;
printf "%b\n", $val;
printf "%o\n", $val;

Number 1234 is printed in four different notations: decimal, hexadecimal,
binary, and octal.

$ ./notations.pl
1234
4d2
10011010010
2322

## Perl string format precision

The next example formats the precision of a floating point value.

format_precision.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

printf "%0.f\n", 16.540;
printf "%0.2f\n", 16.540;
printf "%0.3f\n", 16.540;
printf "%0.5f\n", 16.540;

For floating point values, the *precision* is the number of digits to
be printed after the decimal point.

$ ./format_precision.pl
17
16.54
16.540
16.54000

## Perl string format scientific notation

The e, E, g, and G specifiers are used to format numbers in scientific notation.

     - f - decimal floating point, lowercase

     - F - decimal floating point, uppercase

     - e - scientific notation (mantissa/exponent), lowercase

     - E - scientific notation (mantissa/exponent), uppercase

     - g - uses the shortest representation of %e or %f

     - G - Use the shortest representation of %E or %F

format_scientific.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $val = 1273.78888769000;

printf "%f\n", $val;
printf "%e\n", $val;
printf "%g\n", $val;
printf "%E\n", $val;
printf "%G\n", $val;

say '-------------------------';

printf "%.10f\n", $val;
printf "%.10e\n", $val;
printf "%.10g\n", $val;
printf "%.10E\n", $val;
printf "%.10G\n", $val;

say '-------------------------';

my $val2 = 66_000_000_000;

printf "%f\n", $val2;
printf "%e\n", $val2;
printf "%g\n", $val2;
printf "%E\n", $val2;
printf "%G\n", $val2;

The example formats floating point values in normal decimal and scientific
notations.

$ ./format_scientific.pl
1273.788888
1.273789e+03
1273.79
1.273789E+03
1273.79
-------------------------
1273.7888876900
1.2737888877e+03
1273.788888
1.2737888877E+03
1273.788888
-------------------------
66000000000.000000
6.600000e+10
6.6e+10
6.600000E+10
6.6E+10

## Perl string format flags

The *flags* is a set of characters that modify the output format. The set
of valid flags depends on the specifier character. Perl recognizes the following
flags:

     - space &nbsp;&nbsp; prefix non-negative number with a space

     - + &nbsp;&nbsp; prefix non-negative number with a plus sign

     - -  &nbsp;&nbsp; left-justify within the field

     - 0  &nbsp;&nbsp; use zeros, not spaces, to right-justify

     #  &nbsp;&nbsp;  puts the leading 0 for any octal,
          prefix non-zero hexadecimal with 0x or 0X,
          prefix non-zero binary with 0b or 0B

format_flags.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

printf "%+d\n", 1691;

say '----------------------';

printf "%#x\n", 1691;
printf "%#X\n", 1691;
printf "%#b\n", 1691;
printf "%#B\n", 1691;

say '----------------------';

printf "%10d\n", 1691;
printf "%-10d\n", 1691;
printf "%010d\n", 1691;

The example uses flags in the string format specifier.

$ ./format_flags.pl
+1691
----------------------
0x69b
0X69B
0b11010011011
0B11010011011
----------------------
      1691
1691
0000001691

## Perl string format width

The *width* is the minimum number of runes to be output. It is specified
by an optional decimal number immediately preceding the verb. If absent, the
width is whatever is necessary to represent the value.

If the width is greater than the value, it is padded with spaces.

width.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $w = "falcon";
my $n = 122;
my $h = 455.67;

printf "%s\n", $w;
printf "%10s\n", $w;

say '---------------------';

printf "%d\n", $n;
printf "%7d\n", $n;
printf "%07d\n", $n;

say '---------------------';

printf "%10f\n", $h;
printf "%11f\n", $h;
printf "%12f\n", $h;

The examples uses width with a string, integer, and a float.

printf "%07d\n", $n;

With a preceding 0 character, the number is not padded with space but with 0
character.

$ ./width.pl 
falcon
    falcon
---------------------
122
    122
0000122
---------------------
455.670000
 455.670000
  455.670000

In this article we continued working with a string data type in Perl.

Visit [Perl string](/perl/string/) or list all
Perl tutorials.