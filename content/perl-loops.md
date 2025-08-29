+++
title = "Perl loops"
date = 2025-08-29T20:04:00.106+01:00
draft = false
description = "Perl loops tutorial shows how to do loops in Perl. A loop is a sequence of statements that is continually repeated until a certain condition is met."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl loops

last modified August 24, 2023

In this article we show how to create loops in Perl.

A loop is a sequence of instructions that is continually repeated until a
certain condition is reached. For instance, we have a collection of items and we
create a loop to go through all elements of the collection.

In Perl, we use for, while, and until
keywords to define loops. The last, next, and
redo statements are used to modify the behaviour of the loop.

## Perl while loop

The while loop is a control flow statement that allows code to be executed
repeatedly based on a given boolean condition.

The while keyword executes the statements inside the block enclosed by the curly
brackets. The statements are executed each time the expression is evaluated to
true.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $sum = 0;
my $i = 0;

while ($i &lt;= 10) {

    $sum += $i;
    $i++;
}

say $sum;

In the example, we use a while loop to sum numbers 1..10.

my $sum = 0;
my $i = 0;

We define the $sum variable and the $i counter, which
is used to control the loop.

while ($i &lt;= 10) {

..
}

The statements inside the block delimited by the {} characters are
executed every loop.

$sum += $i;
$i++;

We add the current value of the $i to the $sum
variable and increment the counter.

$ ./main.pl
55

## Perl do/while loop

The do/while loop is a slight modification of the
while loop. In a do/while loop, the statements are
executed before the condition is tested. This means that the statements are
executed at least once.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $r = 0;

do {

    $r = int rand(30);
    printf "$r ";

} while ( $r != 22 );

print "\n";

In the program, we print a random number between 0 and 30 in each loop. The loop
is terminated once the random value equals to 22. The random value is generated
with the rand function.

$ ./main.pl
16 1 20 16 10 26 10 8 19 0 26 6 7 13 22
$ ./main.pl
1 11 4 29 6 13 22
$ ./main.pl
23 18 19 1 2 1 28 2 17 2 24 8 29 24 23 18 20 1 10 8 9 11 28 23 8 28 13 9 8 10 28 13 5 15 24 7 8 18 26 8 7 17 24 19 0 4 1 15 7 24 18 19 25 5 7 3 21 18 16 8 6 14 2 3 10 17 18 6 8 13 19 5 21 27 16 16 4 14 3 28 28 22
$ ./main.pl
18 13 17 20 11 15 22

## Perl until loop

Similar to while, the until loop is while the
condition insice the square brackets evaluates to false. That is, it is
terminated once the condition is true.

main.pl
  

use 5.34.0;
use warnings;

my $r = 0;

until ( $r == 22 ) {

    $r = int rand(30);
    printf "$r ";
}

print "\n";

We use the until loop to geneare a bunch of random values. The
loops are executed until the random value is not equal to 22.

$ ./main.pl
2 14 28 6 12 5 6 14 17 21 17 13 22

## Perl classic for loop

Perl supports the classic for loop from the C programming language. A for loop
has also three phases: initialization, condition and code block execution, and
incrementation.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $sum = 0;

for ( my $i = 0 ; $i &lt;= 10 ; $i++ ) {

    $sum += $i;
}

say $sum;

$sum = 0;

for ( my $i = 10 ; $i &gt;= 0 ; $i-- ) {

    $sum += $i;
}

say $sum;

In the program, we create two for loops to sum values 1..10.

for ( my $i = 0 ; $i &lt;= 10 ; $i++ ) {

    $sum += $i;
}

In the first phase, we initiate the counter $i to zero. This phase
is done only once. Next comes the condition $i &lt; 10. If the
condition is met, the statement inside the for block is executed. In the third
phase the counter is increased. Now we repeat the 2, 3 phases until the
condition is not met and the for loop is left. In our case, when the counter
$i is equal to 10, the for loop stops executing.

for ( my $i = 10 ; $i &gt;= 0 ; $i-- ) {

    $sum += $i;
}

This is another for loop. It does the same job. There is one slight difference:
we sum values 10..1.

$ ./main.pl
55
55

## Perl foreach loop

The foreach loop is use dto traversing over collections of data. It has no
explicit counter. The foreach keyword goes through the collection one by one and
the current value is copied to the temporary variable defined in the construct.

In Perl, we can use for and foreach keywords. They
are synonyms.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my @vals  = ( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 );

foreach my $val (@vals) {

    say $val if $val % 2 == 0;
}

say '------------------------------';

for my $val (@vals) {

    say $val if $val % 2 != 0;
}

In the program, we have two foreach loops.

my @vals  = ( 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 );

We define an array of values.

foreach my $val (@vals) {

    say $val if $val % 2 == 0;
}

In the first loop, we go through the array and print each even value. The
$val variable is a temporary variable that holds the current value
from the container.

for my $val (@vals) {

    say $val if $val % 2 != 0;
}

In the second loop, we print each odd value. The for and
foreach keywords can be used interchangeably.

$ ./main.pl
55
55

Perl has short forms of for loops.

mail.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my @vals = 1..10;

for (@vals) {

    say $_;
}

say '---------------------------------';

for (@vals) {

    say;
}

In the example, we create two short for loops which traverse a range of
integers. The $_ is the default iterator variable. If omitted, it
is assumed.

$ ./main.pl
1
2
3
4
5
6
7
8
9
10
---------------------------------
1
2
3
4
5
6
7
8
9
10

## Perl last statement

The last statement is used toexit the loop immediately.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $r = 0;

while (1) {

    $r = int rand(30);
    printf "$r ";

    last if ( $r == 22 );
}

print "\n";

In the example, we create an endless while loop. Inside the loop, we generate
random integers. The loop is termited with the last statement when
the random value is 22.

$ ./main.pl
9 16 23 20 0 7 20 29 20 20 29 25 20 10 6 17 2 22

## Perl next statement

The next starts the next iteration of the loop. It does not
terminate the loop like last. It only starts a new loop and skips
code that follows next.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $n = 0;

while ( $n &lt; 1000 ) {

    $n++;

    if ( ( $n % 2 ) == 0 ) {
        next;
    }

    print("$n ");
}

print("\n");

In the program, we print all odd values from 1 to 1000.

if ( ( $n % 2 ) == 0 ) {
    next;
}

If the value is odd, the next statement is executed; so the value
is not printed.

$ ./main.pl 
1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35...

## Perl redo statement

The redo restarts the loop block without evaluating the condition
again. 

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my $i = 0;
my $sum = 0;

while ($i &lt; 5) {

    my $r = int rand(10);
    $sum += $r;
    $i++;

    redo if ($sum &lt; 20);
}

say "$sum $i";

In the example, we generate at least five random values between 1 and 10. 
With the redo statement we ensure that the sum is always bigger 
or equal to 20.

## Listing Perl files

In the next example, we use a loop to list all Perl files.

main.pl
  

#!/usr/bin/perl

use 5.34.0;
use warnings;

my @files = glob('*.pl');

say $_ for (@files);

With the glbo function, we find out all files with the
.pl extension. The function returns an array of filenames. With 
the for loop we go over the array and print each filename to the terminal.

In this article we showed how to create loops in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).