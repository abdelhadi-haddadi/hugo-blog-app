+++
title = "Perl hash"
date = 2025-08-29T20:03:56.633+01:00
draft = false
description = "Perl hash tutorial shows how to work with hashes in Perl. A hash is an associative array of scalars."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl hash

last modified August 24, 2023

Perl hash tutorial shows how to work with hashes in Perl.

A hash is an associative array of scalars. It is a collection of key/value
pairs. Each value is uniquely identified by its key.

A hash is a basic Perl data type. A data type is a set of values and operations
that can be done with these values.

In other programming languages such as C# or Python, a hash is often called a
dictionary.

Perl uses the % sigil to define a hash.

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

The =&gt; characters can be used to separate keys and values in a 
literal hash declaration.

## Perl simple hash

In the following example, we work with a simple hash.

simple.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

say $words{0};
say $words{1};
say $words{5};

say '-----------------';

say map { "$_ $words{$_}\n" } keys %words;

say '-----------------';

$, = ' ';
my @keys = keys %words;
my @values = values %words;

say @keys;
say @values;

In the example, we define a hash of words. We print individual values, key/value 
pairs and keys and values of the hash.

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

A Perl hash of words is defined. The hash uses the % character.

say $words{0};

We print the value that is stored with key 0. When we refer to and individual 
value of a hash, we use the $ character and a pair of curly
{} brackets.

say map { "$_ $words{$_}\n" } keys %words;

With the map function, we print all the key/value pairs of the
hash.

my @keys = keys %words;

With the keys function, we get the keys of the hash.

my @values = values %words;

With the values function, we get the values of the hash.

$ ./simple.pl 
sky
tommorrow
forest
-----------------
2 blue
4 work
3 pink
5 forest
0 sky
1 tommorrow

-----------------
2 4 3 5 0 1
blue work pink forest sky tommorrow

## Perl hash size

In the following example, we determine the size of the hash.

hash_size.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

my $n = keys %words;

say "the hash has $n items";

To get the size of an hash, we use the keys function in the scalar
context.

$ ./hash_size.pl 
the hash has 6 items

## Perl has add remove elements

In the next example we show how to add and remove elements in a hash.

add_remove.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;
use Data::Dumper;

my %words = ();

$words{0} = 'sky';
$words{1} = 'rock';
$words{2} = 'bed';

say Dumper(\%words);

delete $words{2};

say '---------------------';

say Dumper(\%words);

%words = ();

say '---------------------';

say Dumper(\%words);

First, we initialize an empty hash. We add three pairs to the hash, remove 
one pair, and finally clear the hash. We show the contents of the hash 
with Data::Dumper.

my %words = ();

An empty hash is initialized.

$words{0} = 'sky';
$words{1} = 'rock';
$words{2} = 'bed';

We add three key/value pairs to the hash.

delete $words{2};

A pair is removed with delete function.

%words = ();

We clear the hash.

$ ./add_remove.pl 
$VAR1 = {
          '2' =&gt; 'bed',
          '1' =&gt; 'rock',
          '0' =&gt; 'sky'
        };

---------------------
$VAR1 = {
          '1' =&gt; 'rock',
          '0' =&gt; 'sky'
        };

---------------------
$VAR1 = {};

## Perl hash iterate

We can iterate over hash items with for and foreach
keywords.

iterate.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

foreach my $v (values %words){
    say $v;
}

say '----------------';

foreach my $k (keys %words){
    say $k;
}

say '----------------';

for (keys %words) {

     print("$_: $words{$_}\n");
}

In the example, we iterate over the hash of words.

$ ./iterate.pl 
blue
sky
pink
tommorrow
work
forest
----------------
2
0
3
1
4
5
----------------
2: blue
0: sky
3: pink
1: tommorrow
4: work
5: forest

## Perl hash sort

With the sort function, we can sort hash items by their keys or 
values. By default, the hash items are unordered.

sorting.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;

my %words = (0=&gt;'sky', 1=&gt;'tommorrow', 2=&gt;'blue', 3=&gt;'pink',
     4=&gt;'work', 5=&gt;'forest');

foreach my $v (sort values %words){
    say $v;
}

say '----------------';

foreach my $v (reverse sort values %words){
    say $v;
}

say '----------------';

foreach my $k (sort keys %words){
    say $k;
}

say '----------------';

foreach my $k (reverse sort keys %words){
    say $k;
}

In the example, we use the sort and reverse functions
to sort keys and values of the hash in ascending and descending orders.

$ ./sorting.pl 
blue
forest
pink
sky
tommorrow
work
----------------
work
tommorrow
sky
pink
forest
blue
----------------
0
1
2
3
4
5
----------------
5
4
3
2
1
0

## Perl compare hashes

With the Data::Compare module, we can compare Perl data structures.

comparing.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;
use Data::Compare;

my %h1 = ( 
    0 =&gt; ('a', 'b', 'c'), 
    1 =&gt; ('d', 'e', 'f'), 
);

my %h2 = ( 
    0 =&gt; ('a', 'b', 'c'), 
    1 =&gt; ('d', 'e', 'f'), 
);

if (Compare(\%h1, \%h2)) {

    say 'the two hashes are equal';
} else {
    
    say 'the two hashes are not equal';
}

The example compares two hashes with Data::Compare.

if (Compare(\%h1, \%h2)) {

The Compare function takes two hash references as parameters.

$ ./comparing.pl 
the two hashes are equal

## Perl hash slice

It is possible to extract a list of values from a hash.

hash_slice.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;

my %words = (0=&gt;'sky', 1=&gt;'cup', 2=&gt;'blue', 3=&gt;'pink',
    4=&gt;'work', 5=&gt;'forest');

my ($first, $second) = @words{(0, 1)};

say $first;
say $second;

In the example, we take two words from a list of words.

my ($first, $second) = @words{(0, 1)};

We use the @ sigil to get the slice. 

$ ./hash_slice.pl 
sky
cup

In this article we have worked with hash data type in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).