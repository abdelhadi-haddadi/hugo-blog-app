+++
title = "Perl array"
date = 2025-08-29T20:03:53.196+01:00
draft = false
description = "Perl array tutorial shows how to work with arrays in Perl. A array is an associative array of scalars."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl array

last modified August 24, 2023

Perl array tutorial shows how to work with arrays in Perl.

An array is an ordered list of values. The elements of the array can be accessed
by their index; the indexes start from zero.

An array is a basic Perl data type. A data type is a set of values and
operations that can be done with these values.

In Perl, the terms array and list are often used interchangeably. Sometimes,
programmers use the term array for the variable (@vals) and list
for the data literal that is on the right side of the array definition, for
instance: (1, 2, 3, 4, 5).

Perl uses the @ sigil to define an array variable.

my @words = ('sky', 'cup', 'forest', 'war', 'cloud');

We have an array of strings.

$ cpanm Array::Compare

In the tutorial, we are going to use several external modules. These can be
installed with the cpanm tool.

## Perl simple array

In the following example, we work with a simple array.

simple.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1, 2, 3, 4, 5, 6);

say $vals[0];
say $vals[1];
say $vals[-1];

$vals[6] = 7;
$vals[7] = 8;

$, = ' ';
say @vals;

my $n = @vals;

say "\@vals has $n elements"; 

In the example, we work with an array of integers.

my @vals = (1, 2, 3, 4, 5, 6);

We define an array of integer values. The variable name is preceded by the 
@ sigil. The elements of the array are enclosed between a pair 
of () brackets and are separated by comma characters.

say $vals[0];
say $vals[1];
say $vals[-1];

We access the elements of the array by their indexes; the first index is 0. The
last element can be access with index -1. The indexes are placed between []
brackets. Since we acceass a single element, we use the $ sigil in
the variable name.

$vals[6] = 7;
$vals[7] = 8;

We add two new values to the array.

$, = ' ';
say @vals;

We print the contents of the @vals array; for a cleaner output, we 
set the output field separator to a space.

my $n = @vals;

When we use the array in a scalar context, we get the number of elements of the 
array. This can be also accomplised by the scalar function.

$ ./simple.pl 
1
2
6
1 2 3 4 5 6 7 8
@vals has 8 elements

## Perl access array elements

In the next example, we access array elements.

accessing.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (11, 12, 13, 14, 15, 16);

say $vals[0];
say $vals[1];
say $vals[-1];
say $vals[-2];

say '-----------------------';

say scalar @vals;
say $#vals;

say '-----------------------';

say $vals[$#vals];

Array elements are access by their indexes. The first index has value 0. The 
last index is $#vals. Array elements can be accessed from the end
by using negative indexes. 

say $vals[0];
say $vals[1];
say $vals[-1];
say $vals[-2];

We print the values of four elements. The first value has index 0, the second 1. 
The last has index -1 and the last but one -2. The indexes are place between 
[] characters and the variable name is preceded with the
$ sigil.

say scalar @vals;
say $#vals;

We print the number of elements with the scalar function and the 
last index value with $#vals.

$ ./accessing.pl 
11
12
16
15
-----------------------
6
5
-----------------------
16

## Perl list assignment

We can assign a list of values to multiple variables in one step.

assign.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my ($a, $b, $c) = (1, 2, 3);

say "$a $b $c";

The variables are on the left side, the list literal is on the right side.

## Perl command line arguments

Perl stores command line arguments in a special variable @ARGV.

cmd_argv.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Data::Dumper qw(Dumper);

die "Usage: $0 arg1 arg2 arg3\n" if @ARGV &lt; 3;

say $ARGV[0];
say $ARGV[2];

say Dumper \@ARGV;

In the example, we print two arguments and then the whole array with
Dumper.

die "Usage: $0 arg1 arg2 arg3\n" if @ARGV &lt; 3;

We end the script with usage output if there are less than three arguments.
The $0 variable refers to the program name. In this expression 
(if @ARGV &lt; 3), the array is used in a scalar context and we 
compare the number of elements in the array with value 3.

$ ./cmd_argv.pl 1 2 3
1
3
$VAR1 = [
          '1',
          '2',
          '3'
        ];

## Perl subroutine arguments

Perl stores arguments passed to a subroutine in a special variable
@_.

sub_args.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $r = add3(1, 2, 3);
say $r;

sub add3 {

    my ($a, $b, $c) = @_;

    return $a + $b + $c;
}

In the example, we add three values in the add3 subroutine. We 
utilize the @_ array to get the arguments.

$ ./sub_args.pl 
6

## Perl array is a value type

Assigning an array to another array creates its copy. In some languages such 
an assignment would create a reference to the original array.

value_type.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1, 2, 3, 4, 5, 6);
my @vals2 = @vals;

$vals[0] = 11;
$vals[1] = 22;

say "@vals";
say "@vals2";

We assign an array to another one and change its two values. The values of the 
new array are not affected.

$ ./value_type.pl 
11 22 3 4 5 6
1 2 3 4 5 6

## Perl array range operator

The range .. operator allows us simplify the creation of arrays 
with values forming a sequence.

range_operator.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 11);
my @chars = ('a' .. 'z');

my $n1 = @vals;
my $n2 = @chars;

say "\@vals has $n1 elements";
say "\@chars has $n2 elements";

$, = ' ';
say @vals;
say @chars;

We use the .. operator to create an array of integers and
characters.

$ ./range_operator.pl 
@vals has 11 elements
@chars has 26 elements
1 2 3 4 5 6 7 8 9 10 11
a b c d e f g h i j k l m n o p q r s t u v w x y z

## Perl array slice

A slice is a portion of an array. Slices can be created with the ..
range operator or the , comma operator.

slices.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 10);

$, = ' ';

say @vals[1, 2, -1];

say '--------------------';

my @sl1 = @vals[1..4];
my @sl2 = @vals[1, 2, 4, 5];
my @sl3 = @vals[5..$#vals];
my @sl4 = @vals[2..$#vals-3];

say @sl1;
say @sl2;
say @sl3;
say @sl4;

We create a couple of slices from an array of integers.

say @vals[1, 2, -1];

This slice contains elements with indexes 1, 2, and -1.

my @sl1 = @vals[1..4];

This slice has elements with indexes 1 through 4.

my @sl3 = @vals[5..$#vals];

This slice has elements starting from 5 until the last element.

$ ./slices.pl 
2 3 10
--------------------
2 3 4 5
2 3 5 6
6 7 8 9 10
3 4 5 6 7

## Perl array contains element

In the following example, we check if the array contains the specified element.

contains.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use experimental 'smartmatch';

my @words = ('forest', 'novice', 'war', 'sky', 'colour', 'tool', 
    'smart', 'wooden', 'cup', 'cloud');

my $val = shift || 'cup';

if ($val ~~ @words) {

    say "$val is in the array";
} else {

    say "$val is not in the array";
}

We use the experimental ~~ "smartmatch" operator.

use experimental 'smartmatch';

This line turns off the warning.

$ ./contains.pl 
cup is in the array
$ ./contains.pl forest
forest is in the array
$ ./contains.pl chair
chair is not in the array

## Perl qw function

Perl contains a handy qw function, which simplifies writing arrays
of string values.

quote_word.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Data::Dumper qw/Dumper/;

my @words = qw/forest novice war sky colour tool smart wooden cup cloud/;

say $words[-1];
say $words[-2];
say Dumper \@words;

Using the qw function, we do not have to write the quote characters 
and the commas.

use Data::Dumper qw/Dumper/;

The Data::Dumper module is useful for debugging; we can quickly 
look at the contents of a data structure.

my @words = qw/forest novice war sky colour tool smart wooden cup cloud/;

We create a list of words with qw.

$ ./quote_word.pl 
cloud
cup
$VAR1 = [
          'forest',
          'novice',
          'war',
          'sky',
          'colour',
          'tool',
          'smart',
          'wooden',
          'cup',
          'cloud'
          ];

## Perl array push and pop

The push function appends a list of values onto the end of the
array. The pop function removes and returns the last element of the
array.

pushing.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 5);

push @vals, 6;
push @vals, 7, 8, 9;

say "@vals";

my $r = pop @vals;
say "$r";

say "@vals";

In the example, we append values to the array with push and remove
values from the end of the array with pop.

my @vals = (1 .. 5);

We have an array of integers.

push @vals, 6;

We append value 6 at the end of the array.

push @vals, 7, 8, 9;

Here, we append three values at the end of the array.

my $r = pop @vals;
say "$r";

With pop, we remove the last element of the array and print the 
removed item to the console.

$ ./pushing.pl 
1 2 3 4 5 6 7 8 9
9
1 2 3 4 5 6 7 8

## Perl array shift and unshift

The unshift function appends the given list of elements at the
beginning of an array, while shift removes and returns the first 
element of the array.

shifting.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 5);

unshift @vals, 0;
unshift @vals, -3, -2, -1;

say "@vals";

my $r = shift @vals;
say $r;

say "@vals";

In the example, we use unshift and shift functions to 
add and remove values at the beginning of the array.

$ ./shifting.pl 
-3 -2 -1 0 1 2 3 4 5
-3
-2 -1 0 1 2 3 4 5

## Perl array flattening

In Perl, arrays are flattened when combined. 

flattening.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals1 = (1 .. 5);
my @vals2 = (6 .. 10);
my @vals = (@vals1, @vals2);

say "@vals";

foreach my $val ((1, 2, 3), (4, 5, 6)) {

    say $val;
}

When we combine @vals1 and @vals2, we form one 
array containing all elements of both arrays in one level.

$ ./flattening.pl 
1 2 3 4 5 6 7 8 9 10
1
2
3
4
5
6

## Perl array of arrays

To create an array of nested arrays, we place references to the arrays in the 
parent array. The reference to an array is created with the []
brackets.

array_of_arrays.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = ([1, 2], [3, 4], [5, 6]);

say "@{$vals[0]}";
say "@{$vals[1]}";
say "@{$vals[2]}";

say '---------------------';

say $vals[0][0];
say $vals[0][1];
say $vals[2][0];
say $vals[2][1];

In the example, we create a two-dimensional array of integers.

say "@{$vals[0]}";

Using one index, we get the reference to a nested array. To dereference it, 
we use the @{} characters.

say $vals[0][0];

To get the element, we use two indexes in two pairs of [] brackets.

$ ./array_of_arrays.pl 
1 2
3 4
5 6
---------------------
1
2
5
6

## Perl array sum, min, max, product

In the next example, we compute some statistics of an array of integers.

funs.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use List::Util qw/sum0 min max product/;

my @vals = (1, 2, 3, 4, 5, 6);

say 'The sum is: ' . sum0 @vals;
say 'The maximum is: ' . max @vals;
say 'The minimum is: ' . min @vals;
say 'The product is: ' . product @vals;

The sum0, min, max, and
product functions are imported from the List::Util
module.

say 'The sum is: ' . sum0 @vals;

The sum0 returns the numerical sum of all the elements in the
@vals. It returns 0 when given an empty list.

$ ./funs.pl 
The sum is: 21
The maximum is: 6
The minimum is: 1
The product is: 720

## Perl array map function

The map function applies an expression on each element of an array
and returns a new array with the updated results.

map_fun.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 8);
my @r = map { $_ * 2} @vals;

say "@r";

my @words = qw/SKY blue Tree sun cup wood/;
my @r2 = map { lc $_ } @words;

say "@r2";

We work with map function on two arrays.

my @vals = (1 .. 8);
my @r = map { $_ * 2} @vals;

Here we multiply each element in the array by 2. The $_ is a
special variable, which represents the current value.

my @words = qw/SKY blue Tree sun cup wood/;
my @r2 = map { lc $_ } @words;

We have a list of words. We apply the lc (lowercase) function on
each of the words.

$ ./map_fun.pl 
2 4 6 8 10 12 14 16
sky blue tree sun cup wood

## Perl array classic for loop

In Perl, we can use the classic for loop, popularized by the C language, to 
go through the elements of an array.

classic_for.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 10);
my $n = @vals;

$\ = ' ';

for (my $i = 0; $i &lt; $n; $i++) {

    print $vals[$i];
}

$\ = '';
print "\n";

We have a list of integers. Using the classic for loop, we go through the array 
and print all the elements.

my @vals = (1 .. 10);
my $n = @vals;

In the for loop, we need to know the size of the array.

for (my $i = 0; $i &lt; $n; $i++) {

    print $vals[$i];
}

In the loop, we have the auxiliary variable $i, which is used as a
counter. A for loop has three phases: initialization, condition and code block
execution, and incrementation. 

$ ./classic_for.pl 
1 2 3 4 5 6 7 8 9 10 

## Perl array while loop

We can traverse an array with the while loop.

while_loop.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 8);
my $n = @vals;

$\ = ' ';

my $i = 0;

while ($i &lt; $n) {

    print $vals[$i];
    $i++;
}

$\ = '';
print "\n";

In this case, we also need to determine the size of the array and to use the 
auxiliary $i variable.

## Perl array foreach loop

In a foreach loop, we run a block of code for each element of an array.

foreach_loop.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 10);

$\ = ' ';

foreach my $val (@vals) {

    print $val;
} 

say "\n------------------------";

foreach (@vals) {

    print $_;
} 

$\ = '';
print "\n";

We use the foreach loop to go through the elements of an array of 
integers.

foreach my $val (@vals) {

    print $val;
} 

In each iteration, the current value is stored in the temporary
$val variable.

foreach (@vals) {

    print $_;
} 

If we omit the auxiliary variable, the current value is stored in the special
$_ variable.

$ ./foreach_loop.pl 
1 2 3 4 5 6 7 8 9 10 
------------------------
1 2 3 4 5 6 7 8 9 10 

If the temporary variable is omitted, the for loop is a synonym 
for foreach.

for_foreach.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1 .. 10);

$\ = ' ';

foreach (@vals) {

    print $_;
}

say "\n--------------------------";

for (@vals) {

    print $_;
}

$\ = '';
print "\n";

In this example, the foreach and for loops are
identical.

## Perl array controlling iterations

The iterations can be controlled with next or last
keywords.

controlling_iteration.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1, 2, -3, -4, 5, 6, 7, 8, 9);

foreach (@vals) {

    next if $_ &lt; 0;
    say $_;
}

say '------------------------------';

foreach (@vals) {

    last if $_ &lt; 0;
    say $_;
}

The next statement is used inside a loop to start the next
iteration and skip all code below it, while the last statement is 
used to exit the loop immediately.

foreach (@vals) {

    next if $_ &lt; 0;
    say $_;
}

In this loop, we skip all negative values. The next statement skips
the say statement for values below 0, but continues with the
following iteration.

foreach (@vals) {

    last if $_ &lt; 0;
    say $_;
}

In this loop, we print all positive values until the first negative value is 
encountered. In case we have a negative integer, we terminate the loop with 
the last statement.

$ ./controlling_iteration.pl 
1
2
5
6
7
8
9
------------------------------
1
2

## Perl array splice

With the splice function, we can remove or replace elements of 
an array.

splicing.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/sky blue tree sun cup wood/;

say "original data: @words";

say '------------------------';

my @removed = splice @words, 2, 1;

say "removed word: @removed";
say "@words";

say '------------------------';

my @updated = splice @words, 2, 1, 'sunset';

say "updated word: @updated";
say "@words";

We have an array of words. We use the splice function to remove a 
word and replace a word.

my @removed = splice @words, 2, 1;

The third element is removed. The removed element is returned. The second
argument of splice is the offset, the third is the length. (We
remove one element from the third position.)

my @updated = splice @words, 2, 1, 'sunset';

We replace the third element with the word 'sunset'.

$ ./splicing.pl 
original data: sky blue tree sun cup wood
------------------------
removed word: tree
sky blue sun cup wood
------------------------
updated word: sun
sky blue sunset cup wood

## Perl array unique values

The List::MoreUtils contains helpful functions for working with
arrays.

unique.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use List::MoreUtils qw/uniq duplicates/;
use Data::Dumper qw(Dumper);

my @vals = (1, 1, 1, 2, 2, 3, 4, 5, 5, 6);

say "original array: @vals";

my @uniq_vals = uniq @vals;
say "unique values: @uniq_vals";

my @dup_vals = duplicates @vals;
say "values having duplicates: @dup_vals";

The uniq function returns a new list by stripping duplicate values.
The duplicates function returns a new list containing values that 
have duplicates in the list.

$ ./unique.pl 
original array: 1 1 1 2 2 3 4 5 5 6
unique values: 1 2 3 4 5 6
values having duplicates: 1 2 5

## Perl array split/join

The split function can be used to cut a string into an array of 
substrings. The join function can be used to form a string from 
a list of values.

split_join.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Data::Dumper qw(Dumper);

my $text = 'There is an old hawk in the sky';
my @words = split ' ', $text;

say Dumper(\@words);

my $output = join ' ', @words;
say $output;

The example uses the split and join functions.

my $text = 'There is an old hawk in the sky';
my @words = split ' ', $text;

We cut the sentence into an array of words. The sentence is cut by the space 
character.

my $output = join ' ', @words;

With join, we can do the reverse operation. We join the words of 
the array into a string. 

$ ./split_join.pl 
$VAR1 = [
          'There',
          'is',
          'an',
          'old',
          'hawk',
          'in',
          'the',
          'sky'
        ];

There is an old hawk in the sky

## Perl array finding elements

The firstval function returns the first element in a list for which
the block evaluates to true. The lastval function returns the last
value in a list for which the block evaluates to true. The functions are part of 
the List::MoreUtils module.

finding.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use List::MoreUtils qw/firstval lastval/;

my @words = ('forest', 'novice', 'war', 'sky', 'colour', 'tool', 'smart', 
    'wooden', 'cup', 'cloud');

say firstval { $_ =~ /^[Ww]/ } @words;
say lastval { $_ =~ /^[Ww]/ } @words;

say '----------------------';

say firstval { length $_ == 3 } @words;
say lastval { length $_ == 3 } @words;

say '----------------------';

say firstval { $_ =~ /(\w)(\1+)/ } @words;
say lastval { $_ =~ /(\w)(\1+)/ } @words;

In the example, we search for specific items in a list of words.

say firstval { $_ =~ /^[Ww]/ } @words;
say lastval { $_ =~ /^[Ww]/ } @words;

We search for the first/last string which starts with letter 'w'. We utilize a 
regular expression.

say firstval { length $_ == 3 } @words;
say lastval { length $_ == 3 } @words;

We search for the first/last string that has exactly three characters. We use 
the length function to get the size of the current word.

say firstval { $_ =~ /(\w)(\1+)/ } @words;
say lastval { $_ =~ /(\w)(\1+)/ } @words;

We search for the first/last string which contains repeated characters, such 
as oo or ee. Again, we use a regular expression.

$ ./finding.pl 
war
wooden
----------------------
war
cup
----------------------
tool
wooden

## Perl comparing arrays

The Array::Compare is a module for comparing arrays in Perl.

comparing.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Array::Compare;

my @vals1 = (1, 2, 3, 4, 5);
my @vals2 = (1, 2, 3, 4, 5);

my $c = Array::Compare-&gt;new;
 
if ($c-&gt;compare(\@vals1, \@vals2)) {

  say "\@vals1 and \@vals2 are equal";
} else {

  say "\@vals1 and \@vals2 are not equal";
}

my @words1 = qw/sky blue cup/;
my @words2 = qw/blue sky cup/;
my @words3 = qw/sky blue cup/;

if ($c-&gt;compare(\@words1, \@words2)) {

  say "\@words1 and \@words2 are equal";
} else {

  say "\@words1 and \@words2 are not equal";
}

if ($c-&gt;compare(\@words1, \@words3)) {

  say "\@words1 and \@words3 are equal";
} else {

  say "\@words1 and \@words3 are not equal";
}

In the example, we compare array of integers and strings.

my $c = Array::Compare-&gt;new;

A new comparator object is created.

if ($c-&gt;compare(\@words1, \@words2)) {

We pass the references to the two arrays to the compare function.

$ ./comparing.pl 
@vals1 and @vals2 are equal
@words1 and @words2 are not equal
@words1 and @words3 are equal

The order of the words matter; therefore, the @words1 and
@words2 are not equal.

The comparator object may take optional arguments. The Case option
determines if the comparing is case sensitive. If we do not provide the option,
the default is case sensitive comparison.

comparing2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use Array::Compare;

my $c1 = Array::Compare-&gt;new(Case =&gt; 1);

my @words1 = qw/sky blue cup borrow sun moon/;
my @words2 = qw/sky blue cup borrow Sun Moon/;

if ($c1-&gt;compare(\@words1, \@words2)) {

  say "\@words1 and \@words2 are equal";
} else {

  say "\@words1 and \@words2 are not equal";
}

my $c2 = Array::Compare-&gt;new(Case =&gt; 0);

if ($c2-&gt;compare(\@words1, \@words2)) {

  say "\@words1 and \@words2 are equal";
} else {

  say "\@words1 and \@words2 are not equal";
}

In the example, we perform case sensitive and case insensitive comparison of two
arrays of words. 

$ ./comparing2.pl 
@words1 and @words2 are not equal
@words1 and @words2 are equal

## Perl sort array

The sort function returns the sorted elements of the list. The 
original values are intact. By default, the numbers are sorted numerically and 
strings lexically.

sorting.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (1, 2, 3, 4, 5, 6);
my @words = qw/war sky cup atom blue stone near/;

$, = ' ';
say sort @vals;
say sort @words;

say '-----------------';

say sort { $b &lt;=&gt; $a } @vals;
say sort { $b cmp $a } @words;

In the example, we sort a list of integers and a list of strings.

say sort @vals;
say sort @words;

Without the block structure, the numbers and strings are sorted in ascending 
natural order.

say sort { $b &lt;=&gt; $a } @vals;

The block returns information how the sort should be done. The $a
and $b are special global variables that hold two values from the
list to sort. The spaceship operator &lt;=&gt; is used for
comparing numbers. To compare the numbers in descending order, we swap the 
$a and $b variables.

say sort { $b cmp $a } @words;

The strings are compared with the cmp function.

$ ./sorting.pl 
1 2 3 4 5 6
atom blue cup near sky stone war
-----------------
6 5 4 3 2 1
war stone sky near cup blue atom

In the next example, we show how to sort strings by their length. 

sorting2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/war sky bibliotheque cup atom blue as clear 
    bibiotheque stone near atomic animal/;

$, = ' ';

say sort @words;
say sort { $b cmp $a } @words;

say '-----------------';

say sort { length($a) &lt;=&gt; length($b) } @words;
say sort { length($b) &lt;=&gt; length($a) } @words;

We have a list of words. We sort the list lexically and then by the length of 
the words.

say sort { length($a) &lt;=&gt; length($b) } @words;
say sort { length($b) &lt;=&gt; length($a) } @words;

We compare the two values with the length function in the block
structure. Because the length function returns the size as an
integer, we use the spaceship operator.

$ ./sorting2.pl 
animal as atom atomic bibiotheque bibliotheque blue clear cup near sky stone war
war stone sky near cup clear blue bibliotheque bibiotheque atomic atom as animal
-----------------
as war sky cup atom blue near clear stone atomic animal bibiotheque bibliotheque
bibliotheque bibiotheque atomic animal clear stone atom blue near war sky cup as

In the next example, we sort a list of nested lists.

sorting3.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @users = (['John Doe', 'gardener', 1250], ['Jane Doe', 'teacher', 980], 
    ['Lucy Smith', 'accountant', 1100], ['Robert Roe', 'driver', 1020]);

my @s1 = sort { $a-&gt;[1] cmp $b-&gt;[1]} @users;

foreach (@s1) {

    say join ', ', @{$_};
}

say '----------------------';

my @s2 = sort { $b-&gt;[2] &lt;=&gt; $a-&gt;[2]} @users;

foreach (@s2) {

    say join ', ', @{$_};
}

In the example, we sort the users by their occupation and salary.

my @users = (['John Doe', 'gardener', 1250], ['Jane Doe', 'teacher', 980], 
     ['Lucy Smith', 'accountant', 1100], ['Robert Roe', 'driver', 1020]);

Each nested list represents a user.

my @s1 = sort { $a-&gt;[1] cmp $b-&gt;[1]} @users;

Here, we sort the users by their occupation.

my @s2 = sort { $b-&gt;[2] &lt;=&gt; $a-&gt;[2]} @users;

Here, we sort the users by their salary.

$ ./sorting3.pl 
Lucy Smith, accountant, 1100
Robert Roe, driver, 1020
John Doe, gardener, 1250
Jane Doe, teacher, 980
----------------------
John Doe, gardener, 1250
Lucy Smith, accountant, 1100
Robert Roe, driver, 1020
Jane Doe, teacher, 980

## Perl array filter

The grep function filters an array based on the given expression.

filtering.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @vals = (-1, 0, 2, 1, 5, -6, -2, 3, 4);

my @r1 = grep {$_ &gt; 0} @vals;
say "@r1";

my @r2 = grep {$_ &lt; 0} @vals;
say "@r2"; 

my @r3 = grep {$_ % 2 == 0} @vals;
say "@r3"; 

In the example, we filter a list of integer values.

my @r1 = grep {$_ &gt; 0} @vals;

This line extracts positive integers.

my @r2 = grep {$_ &lt; 0} @vals;

Here, we get all negative ones.

my @r3 = grep {$_ % 2 == 0} @vals;

In this line, we get all the even numbers.

$ ./filtering.pl 
2 1 5 3 4
-1 -6 -2
0 2 -6 -2 4

In the next example, we use a regular expression for filtering.

filtering2.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @data = ('sky', 'new', 3, 'tool', 7, 'forest', 'cup', 'cloud', 5);

my @r1 = grep /\d/, @data;
say "@r1";

my @r2 = grep !/\d/, @data;
say "@r2";

We define an array of words and integers. We filter out first all integers and 
then words.

$ ./filtering2.pl 
3 7 5
sky new tool forest cup cloud

We further use regular expressions.

filtering3.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my @words = qw/sky new tool bar forest cup cloud tennis ball wood pen coffee/;

my @r1 = grep /^...$/, @words;
say "@r1"; 

my @r2 = grep /(\w)(\1+)/, @words;
say "@r2"; 

First, we extract all three-letter words and then all the words with repeated 
characters.

$ ./filtering3.pl 
sky new bar cup pen
tool tennis ball wood coffee

The File::Find::Rule is a module for traversing directories.

filtering4.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use File::Find::Rule;

$, = ' ';

my @files = File::Find::Rule-&gt;name("*.pl")-&gt;in("..");
my @found = grep { -M $_ &gt; 180 } @files;

say join "\n", @found;

In the example, we find all Perl files that are older than 180 days. The 
File::Find::Rule returns an array of found files.

In this article we have worked with arrays in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).