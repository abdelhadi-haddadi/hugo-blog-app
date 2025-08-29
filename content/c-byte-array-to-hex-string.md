+++
title = "C# byte array to hex string"
date = 2025-08-29T19:50:31.870+01:00
draft = false
description = "C# byte array to hex string tutorial shows how to convert a byte array to a hexadecimal string."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# byte array to hex string

last modified July 5, 2023

 

In this article we show how to convert a byte array to a hexadecimal string.

The byte type is an simple, numeric, value type in C#.
The byte type is mainly used in IO operations, when working with
files and network connections.

Hexadecimal is a numbering system with base 16. It uses 16 unique alpha-numeric
symbols:  numbers 0 to 9 and letters A-F to represent the values 10 to 15.

Hexadecimal system simplifies the representation of binary values because they
shorten the number of digits; one hexadecimal digit is equivalent to four binary
digits.

The Encoding.ASCII.GetBytes method transforms an ASCII string to an
array of bytes.

## Hexadecimal format specifier

The hexadecimal format specifier X or x converts a number to a string of
hexadecimal digits. The string can be in uppercase or lowercase.

We can also add a precision specifier, which specifier indicates the minimum
number of digits desired in the resulting string. If required, the number is
padded with zeros to its left to produce the number of digits given by the
precision specifier.

Program.cs
  

int n = 2350;

Console.WriteLine(n.ToString("X"));
Console.WriteLine(n.ToString("x"));
Console.WriteLine(n.ToString("X2"));
Console.WriteLine(n.ToString("X4"));
Console.WriteLine(n.ToString("X8"));

The program prints an integer into a hex value using various hexadecimal format 
specifiers.

$ dotnet run
92E
92e
92E
092E
0000092E

The next example converts a string to a byte array and later the array to 
a hex string.

Program.cs
  

using System.Text;

string msg = "an old falcon";
byte[] data = Encoding.ASCII.GetBytes(msg);

string hex = string.Join(" ", data.Select(x =&gt; x.ToString("X2")));
Console.WriteLine(hex);

The program uses the string.Join method, the LINQ Select 
method and the ToString method.

$ dotnet run 
61 6E 20 6F 6C 64 20 66 61 6C 63 6F 6E

## C# Convert.ToHexString

The Convert.ToHexString method converts an array of 8-bit unsigned
integers to its equivalent string representation that is encoded with uppercase
hex characters.

Program.cs
  

using System.Text;

string msg = "an old falcon";
byte[] data = Encoding.ASCII.GetBytes(msg);

string hex = Convert.ToHexString(data);
Console.WriteLine(hex);

The program converts a byte array to a hexadecimal string with
Convert.ToHexString.

$ dotnet run
616E206F6C642066616C636F6E

## C# BitConverter.ToString

The BitConverter.ToString method converts the numeric value of each
element of a specified array of bytes to its equivalent hexadecimal string
representation.

The hexadecimal pairs are separated by hyphens.

Program.cs
  

using System.Text;

string msg = "an old falcon";
byte[] data = Encoding.ASCII.GetBytes(msg);

string hex = BitConverter.ToString(data);
Console.WriteLine(hex);

string hex2 = hex.Replace('-', ' ');
Console.WriteLine(hex2);

The program converts a byte array to a hexadecimal string with
BitConverter.ToString. We also remove the hyphens with
Replace.

$ dotnet run
61-6E-20-6F-6C-64-20-66-61-6C-63-6F-6E
61 6E 20 6F 6C 64 20 66 61 6C 63 6F 6E

## C# binary file to hex string

The File.ReadAllBytes opens a binary file, reads the contents of
the file into a byte array, and then closes the file.

Program.cs
  

var path = "favicon.ico";
byte[] data = File.ReadAllBytes(path);

int i = 0;

foreach (byte c in data)
{
    Console.Write("{0:X2} ", c);
    i++;

    if (i % 10 == 0)
    {
        Console.WriteLine();
    }
}

The example reads a favicon.ico binary file. The data is printed to the console
in hexadecimal format.

$ dotnet run
00 00 01 00 01 00 10 10 00 00
00 00 00 00 68 05 00 00 16 00
00 00 28 00 00 00 10 00 00 00
20 00 00 00 01 00 08 00 00 00
00 00 00 01 00 00 00 00 00 00
00 00 00 00 00 01 00 00 00 00
00 00 00 00 00 00 FF FF FF 00
4D 45 3D 00 00 00 00 00 00 00
...

In this article we have shown how to convert a byte array to a hexadecimal
string.

## Source

[BitConverter.ToString method - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.bitconverter.tostring?view=net-8.0)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).