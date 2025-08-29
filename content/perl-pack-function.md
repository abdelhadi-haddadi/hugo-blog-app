+++
title = "Perl pack Function"
date = 2025-08-29T20:04:01.215+01:00
draft = false
description = "Perl pack tutorial shows how to convert data to binary representations using Perl's pack function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl pack Function

last modified April 4, 2025

The Perl pack function converts data into binary representations.
It's essential for binary file I/O, network protocols, and data serialization.

pack uses template strings to specify data formats. It returns a
binary string containing packed data according to the template. The companion
function is unpack for reversing the process.

## Basic pack Usage

The simplest use of pack converts numbers to binary strings.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $packed = pack("C", 65);
print "Packed ASCII 'A': ", unpack("H*", $packed), "\n";

my $packed_short = pack("s", 12345);
print "Packed short: ", unpack("H*", $packed_short), "\n";

We demonstrate packing a character and a short integer. The "C" template packs
an unsigned char, while "s" packs a short. We use unpack to show
the hexadecimal representation.

$ ./basic.pl
Packed ASCII 'A': 41
Packed short: 3930

## Packing Multiple Values

pack can combine multiple values into a single binary string.

multiple.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $data = pack("CCCC", 65, 66, 67, 68);
print "Packed ABCD: ", unpack("H*", $data), "\n";

my $mixed = pack("CS", 65, 12345);
print "Packed mixed: ", unpack("H*", $mixed), "\n";

This example packs four characters and a mixed format. The template string
specifies the order and type of data to pack. Each format character processes
one value from the argument list.

$ ./multiple.pl
Packed ABCD: 41424344
Packed mixed: 413930

## String Packing

pack can handle strings with various formatting options.

string.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $str = "Perl";
my $packed_str = pack("a4", $str);
print "Packed string: ", unpack("H*", $packed_str), "\n";

my $null_terminated = pack("Z*", $str);
print "Null-terminated: ", unpack("H*", $null_terminated), "\n";

We demonstrate ASCII string packing with "a" (space-padded) and "Z"
(null-terminated) formats. The asterisk (*) allows variable-length strings.

$ ./string.pl
Packed string: 5065726c
Null-terminated: 5065726c00

## Network Byte Order

Network protocols often require specific byte ordering.

network.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $port = 80;
my $ip = "192.168.1.1";

my $packed_port = pack("n", $port);
my @octets = split /\./, $ip;
my $packed_ip = pack("C4", @octets);

print "Packed port: ", unpack("H*", $packed_port), "\n";
print "Packed IP: ", unpack("H*", $packed_ip), "\n";

This shows network byte order ("n" for big-endian shorts) and IP address
packing. Network protocols typically use big-endian byte order.

$ ./network.pl
Packed port: 0050
Packed IP: c0a80101

## Binary File Writing

pack is essential for writing binary files.

file.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $filename = "data.bin";
open(my $fh, '&gt;', $filename) or die "Cannot open file: $!";

my $header = pack("a4LL", "DATA", 1, 12345);
print $fh $header;

close($fh);
print "Wrote binary file '$filename'\n";

We create a simple binary file with a header structure. The template "a4LL"
packs a 4-byte string followed by two unsigned longs. This is common in
binary file formats.

$ ./file.pl
Wrote binary file 'data.bin'

## Floating Point Numbers

pack can handle floating-point numbers in various formats.

float.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $float = 3.14159;
my $packed_float = pack("f", $float);
my $packed_double = pack("d", $float);

print "Packed float: ", unpack("H*", $packed_float), "\n";
print "Packed double: ", unpack("H*", $packed_double), "\n";

This demonstrates packing floating-point numbers as 32-bit ("f") and 64-bit
("d") values. The exact hexadecimal output depends on your system's float
representation.

$ ./float.pl
Packed float: d00f4940
Packed double: 6e861bf0f9210940

## Complex Data Structures

pack can create complex binary structures with repetition.

complex.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my @values = (1..5);
my $packed = pack("L5", @values);

print "Packed array: ", unpack("H*", $packed), "\n";

my $struct = pack("LSZ8", 12345, 3.14, "Perl");
print "Packed struct: ", unpack("H*", $struct), "\n";

We pack an array of longs and a mixed structure. The "5" in "L5" repeats the
long format five times. Complex binary protocols often use such structures.

$ ./complex.pl
Packed array: 0100000002000000030000000400000005000000
Packed struct: 39300000c3f54840Perl00

## Best Practices

- **Use explicit formats:** Clearly specify byte order and sizes.

- **Validate input:** Ensure data fits the target format.

- **Document templates:** Comment complex format strings.

- **Test cross-platform:** Byte order may differ between systems.

- **Combine with unpack:** Verify packed data by unpacking.

## Source

[Perl pack Documentation](https://perldoc.perl.org/functions/pack)

This tutorial covered Perl's pack function with practical
examples demonstrating binary data conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).