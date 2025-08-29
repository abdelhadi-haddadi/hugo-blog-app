+++
title = "C# ByteSize"
date = 2025-08-27T23:22:48.226+01:00
draft = false
description = "C# ByteSize tutorial shows how to use ByteSize library to work with file sizes in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ByteSize

last modified July 7, 2023

 

In this article we show how to use ByteSize library to work with size values in
C#.

The authors define ByteSize as a utility class that makes byte size
representation in code easier by removing ambiguity of the value being
represented. 

In computer usage both metric and binary systems are used to represent multiples
of size units. RAM manufactures use binary system (1 KB is 1024 bytes) while
disk manufactures use metric system (1 KB is 1000 bytes). To handle the
confusion, a new standard of symbols was developed. It defines the kibi, mebi,
gibi, tebi, pebi, exbi, zebi, and yobi symbols. These symbols represents powers
of 2. 

ByteSize library helps us transform between these two systems. ByteSize assumes
1 KB == 1000 B and 1 KiB == 1024 B to adhere to the IEC and NIST standards.

$ dotnet add package ByteSize

We add the package to the project.

## Simple example

We want to transform a gigabyte value to a kilobyte value and a bit value to 
a megabyte.

Program.cs
  

using ByteSizeLib;

double n = 1.59;
ByteSize b = ByteSize.FromGigaBytes(n);
Console.WriteLine($"{b} is {b.ToString("#,# KB")}");

long n2 = 12_226_311;
ByteSize b2 = ByteSize.FromBits(n2);
Console.WriteLine($"{b2.ToString("b")} is {b2.ToString("0.#### MB")}");

We want to express 1.59 GB in KB and 12226311 bits in MB.

ByteSize b = ByteSize.FromGigaBytes(n);

We create a ByteSize struct from a GB value with
ByteSize.FromGigaBytes.

Console.WriteLine($"{b} is {b.ToString("#,# KB")}");

We output the value in KB using the ToString method.

ByteSize b2 = ByteSize.FromBits(n2);
Console.WriteLine($"{b2.ToString("b")} is {b2.ToString("0.#### MB")}");

Likewise, we use the ByteSize.FromBits for the bits and again 
ToString to represent the value in MB.

$ dotnet run
1.59 GB is 1,590,000 KB
12226311 b is 1.5283 MB

## File size

In the next example, we get the size of a file. 

Program.cs
  

using ByteSizeLib;

var fi = new FileInfo("Program.cs");
var n = fi.Length;

ByteSize bs = ByteSize.FromBytes(n);

Console.WriteLine(bs);
Console.WriteLine(bs.ToString("KB"));
Console.WriteLine(bs.ToString("KiB"));
Console.WriteLine(bs.ToString("B"));
Console.WriteLine(bs.ToString("b"));

The program prints the size of a file in multiple symbols.

var fi = new FileInfo("Program.cs");
var n = fi.Length;

Using FileInfo we get the size of the given file in bytes.

ByteSize bs = ByteSize.FromBytes(n);

We create the ByteSize struct from the value using
ByteSize.FromBytes.

Console.WriteLine(bs);
Console.WriteLine(bs.ToString("KB"));
Console.WriteLine(bs.ToString("KiB"));
Console.WriteLine(bs.ToString("B"));
Console.WriteLine(bs.ToString("b"));

We print the file size in multiple size representations.

$ dotnet run 
1.832 KB
1.83 KB
1.79 KiB
1832 B
14656 b

## The ToString method

The ByteSize's ToString method converts the value of
the current object to a decimal byte string. The symbol used is the largest unit
the corresponding value is greater than or equal to.

Program.cs
  

using ByteSizeLib;

double n = 1_099_511_627_776;

string[] syms = { "b", "B", "KB", "Kib", "MB", "MiB", "GB", "GiB",
    "0.######### GB" };

foreach (var sym in syms)
{
    var val = ByteSize.FromBytes(n).ToString(sym);
    Console.WriteLine(val);
}

The program displays a double value in different multiples of units.

$ dotnet run 
8796093022208 b
1099511627776 B
1099511627.78 KB
1073741824 Kib
1099511.63 MB
1048576 MiB
1099.51 GB
1024 GiB
1099.511627776 GB

## Parsing string values

The Parse method converts the string representation of a binary or
decimal byte to its ByteSize equivalent.

Program.cs
  

using ByteSizeLib;

string[] vals = { "8192 B", "3.6 KB", "1.96 kib", "3.54kb" };

foreach (var val in vals)
{
    ByteSize n = ByteSize.Parse(val);
    Console.WriteLine(n.ToString("KB"));
}

In the example, we parse four string values, convert them to ByteSize
and display them in KB.

$ dotnet run 
8.19 KB
3.6 KB
2.01 KB
3.54 KB

## Source

[ByteSize Github page](https://github.com/omar/ByteSize)

In this article we have worked with the ByteSize library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).