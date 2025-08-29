+++
title = "Perl read file"
date = 2025-08-29T20:04:02.331+01:00
draft = false
description = "Perl read file tutorial shows  how to read files in Perl."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl read file

last modified August 24, 2023

In this article we show how to read files in Perl.

To read files in Perl, we can use built-in open, read
functions or utilize external modules such as Path::Tiny or
IO::All.

words.txt
  

sky
water
rock
falcon
cloud
war
nice
cup
wrong
forest
blue
bottle
pen
chair
cup

We use a simple text file.

## Perl read text file I

In the first example, we read the contents of the text file with
open and a for loop.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

open my $fh, "&lt;", "words.txt"
    or die "cannot open file $!";

print $_ for &lt;$fh&gt;;

close $fh;

We read the contents of the file line by line.

open my $fh, "&lt;", "words.txt"
    or die "cannot open file $!";

With open function, we open a file handle in read-only mode to the
specified text file.

print $_ for &lt;$fh&gt;;

We go over the file handle with the for loop and print the contents
of the file line by line.

close $fh;

In the end, we close the handle with close.

$ ./main.pl
sky
water
rock
falcon
cloud
war
nice
cup
wrong
forest
blue
bottle
pen
chair

## Perl read text file II

The second example uses a while loop to read a text file.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

open my $fh, "&lt;", "words.txt"
    or die "cannot open file $!";

while (&lt;$fh&gt;) {

    print $_;
}

close $fh;

Using the while loop and the &lt;&gt; operator, we read the file
line by line.

## Perl diamond operator

Perl allows to read a file without explicitly opening it.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

while (&lt;&gt;) {

    print $_;
}

The diamond operator (&lt;&gt;) will look at the @ARGV
for files to open and process.

$ ./main.pl words.txt
sky
water
rock
falcon
cloud
war
nice
cup
wrong
forest
blue
bottle
pen
chair
cup

We pass the file name as a parameter to the Perl program.

## Perl slurp text file

For relatively small files, we can read the whole file into a variable in one
step.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;
use Path::Tiny;

my $f = path('./words.txt');

my $res = $f-&gt;slurp;

print($res);

In the example, we use the Path::Tiny module.

my $f = path('./words.txt');

We create a path object.

my $res = $f-&gt;slurp;

We read the contents into a variable with slurp.

## Perl read text file into array

In the next example, we read the text file into an array.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;
use Path::Tiny;

my $f = path('./words.txt');

my @lines = $f-&gt;lines;

print $_ for (@lines);

In the program, we use Path::Tiny and its lines member
function.

## Perl head/tail example

In the next example, we create a head/tail utility.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;
use Path::Tiny;

my $f = path('./words.txt');
my $n = shift || 5;

my @lines = $f-&gt;lines( { count =&gt; $n } );
print $_ for (@lines);

The program reads n lines from the top or bottom of the text file.

my $n = shift || 5;

We provide the number of lines to read on the command line. If we do not give
any value, five lines are read from the top.

my @lines = $f-&gt;lines( { count =&gt; $n } );

The number of lines to read is given to the count option. It also
accepts negative integers.

$ ./main.pl 3
sky
water
rock
$ ./main.pl
sky
water
rock
falcon
cloud
$ ./main.pl -2
chair
cup

## Perl read web page

In the next example, we read a remote file (a web page resource).

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;
use HTTP::Tiny;

my $url = 'http://webcode.me/small.txt';

my $r = HTTP::Tiny-&gt;new-&gt;get($url);

if ($r-&gt;{success}) {

    my $content = $r-&gt;{content};
    print($content);
}

To read the resource, we use the HTTP::Tiny module.

$ ./main.pl
small text page

## Perl read binary file

The following example reads a binary file and prints the contents in
hexadecimal.

main.pl
  

#!/usr/bin/perl

use v5.34.0;
use warnings;

open my $fh, "&lt;:raw", "favicon.ico"
  or die "cannot open file $!";

my $block_size = 1024;
my $data;
my $n = 1;

while ( read $fh, $data, $block_size ) {

    my @res = split( //, $data );

    foreach (@res) {

        printf( "%02x ", ord($_) );
        $n++;

        if ( $n &gt; 20 ) {
            print("\n");
            $n = 1;
        }

    }
}

print "\n";

close $fh;

The program reads a small icon. We utilize the open,
read, and split functions.

open my $fh, "&lt;:raw", "favicon.ico"
    or die "cannot open file $!";

We open the file for reading in raw mode.

while ( read $fh, $data, $block_size ) {

In a while loop, we read the data into the buffer by 1024 byte chunks.

my @res = split( //, $data );

foreach (@res) {

    printf( "%02x ", ord($_) );
    $n++;

    if ( $n &gt; 20 ) {
        print("\n");
        $n = 1;
    }
}

We split the raw line into bytes and print them in hexadecimal format. There
are 20 bytes per line.

$ ./main.pl
00 00 01 00 01 00 10 10 00 00 00 00 00 00 68 05 00 00 16 00
00 00 28 00 00 00 10 00 00 00 20 00 00 00 01 00 08 00 00 00
00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00
00 00 00 00 00 00 ff ff ff 00 4d 45 3d 00 00 00 00 00 00 00
...

In this article we have read text and binary files in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).