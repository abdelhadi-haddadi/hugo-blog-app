+++
title = "C# char type"
date = 2025-08-27T23:22:49.359+01:00
draft = false
description = "C# char tutorial shows how to work with char type in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# char type

last modified September 6, 2023

 

In this article we show how to work with a char type in C#.

A string in C# is a sequence of a sequence of UTF-16 code units. The
System.Char type represents a character as a UTF-16 code unit.

The char keyword is an alias for System.Char type.

.NET uses the Char structure to represent Unicode code points by
using UTF-16 encoding. The value of a Char object is its 16-bit
numeric (ordinal) value.

    
        
            type
            range
            size
            .NET type
        
    
    
        
            char
            U+0000 to U+FFFF
            16 bit
            System.Char
        
    

The default value of the char type is \0, (U+0000).

**Note: **A char is not necessarily equivalent to a single Unicode
character. In some cases, multiple 16-bit code units are used to represent a
single Unicode character.

In C# code, a character can be represented by

    - a character literal

    a Unicode escape sequence -- \u followed by the four-symbol hexadecimal 
        representation of a character code
    a hexadecimal escape sequence -- \x followed by the hexadecimal 
        representation of a character code

## C# char simple exampe

The following is a simple example with a char type.

Program.cs
  

char a = 'f';
Console.WriteLine(a);

Console.WriteLine(a.GetType());
Console.WriteLine(typeof(char));

Console.WriteLine((int)char.MaxValue);
Console.WriteLine((int)char.MinValue);

We define a char variable and show its type and min and max possible values.

$ dotnet run
f
System.Char
System.Char
65535
0

## C# char literals &amp; escape sequences

Char values are enclosed in single quotes.

Program.cs
  

char c = 'л';
Console.WriteLine(c);

char c2 = '\u043B';
Console.WriteLine(c2);

char c3 = '\x43b';
Console.WriteLine(c3);

The example represents three chars with a character literal, a Unicode escape
sequence, and a hexadecimal escape sequence.

$ dotnet run
л
л
л

## C# array of chars

In order to convert a char array to a string, we simply pass the array to its
constructor. To convert the string to a char array, we call the
ToCharArray method.

Program.cs
  

char[] vals = { 'a', 'n', ' ', 'o', 'l', 'd', ' ', 'f', 'a', 'l', 'c', 'o', 'n' };
Console.WriteLine(vals);
Console.WriteLine(vals.GetType());

Console.WriteLine("------------------------");

string msg = new(vals);
Console.WriteLine(msg);
Console.WriteLine(msg.GetType());

Console.WriteLine("------------------------");

char[] vals2 = msg.ToCharArray();
Console.WriteLine(vals2);
Console.WriteLine(vals2.GetType());

In the example we convert a char array into a string and the string back into a
char array.

$ dotnet run
an old falcon
System.Char[]
------------------------
an old falcon
System.String
------------------------
an old falcon
System.Char[]

## C# iterate over string elements

A C# string is a sequence of char elements.

Program.cs
  

string msg = "an old falcon";

foreach (var e in msg)
{
    Console.Write($"{e} ");
}

Console.WriteLine("\n-----------------------------");

foreach (var e in msg)
{
    byte b = (byte)e;
    Console.Write($"{b} ");
}

Console.WriteLine("\n-----------------------------");

byte[] data = { 97, 110, 32, 111, 108, 100, 32, 102, 97, 108, 99, 111, 110 };

foreach (var e in data)
{
    char c = (char)e;
    Console.Write($"{c} ");
}

Console.WriteLine();

The example loops over a string and outputs each char separately. It converts
the string into byte values and then byte values into a string.

foreach (var e in msg)
{
    Console.Write($"{e} ");
}

In a foreach loop, we go over the elements of the string.

foreach (var e in msg)
{
    byte b = (byte)e;
    Console.Write($"{b} ");
}

We loop over the string and cast each element into a byte value.

byte[] data = { 97, 110, 32, 111, 108, 100, 32, 102, 97, 108, 99, 111, 110 };

foreach (var e in data)
{
    char c = (char)e;
    Console.Write($"{c} ");
}

We define an array of bytes. We loop over the array and cast each byte into a
char.

$ dotnet run
a n   o l d   f a l c o n
-----------------------------
97 110 32 111 108 100 32 102 97 108 99 111 110
-----------------------------
a n   o l d   f a l c o n

## C# char.GetUnicodeCategory

The char.GetUnicodeCategory categorizes a specified Unicode
character into a group identified by one of the UnicodeCategory values.

Program.cs
  

string msg = "There are 22 apples in the basket.";

foreach (var e in msg)
{
    var category = char.GetUnicodeCategory(e);
    Console.WriteLine($"{e} - {category}");

}

In the example, we show the Unicode category for each of the given string
elements.

$ dotnet run
T - UppercaseLetter
h - LowercaseLetter
e - LowercaseLetter
r - LowercaseLetter
e - LowercaseLetter
  - SpaceSeparator
a - LowercaseLetter
r - LowercaseLetter
e - LowercaseLetter
  - SpaceSeparator
2 - DecimalDigitNumber
2 - DecimalDigitNumber
  - SpaceSeparator
a - LowercaseLetter
p - LowercaseLetter
p - LowercaseLetter
l - LowercaseLetter
e - LowercaseLetter
s - LowercaseLetter
  - SpaceSeparator
i - LowercaseLetter
n - LowercaseLetter
  - SpaceSeparator
t - LowercaseLetter
h - LowercaseLetter
e - LowercaseLetter
  - SpaceSeparator
b - LowercaseLetter
a - LowercaseLetter
s - LowercaseLetter
k - LowercaseLetter
e - LowercaseLetter
t - LowercaseLetter
. - OtherPunctuation

## Source

[char type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char)

In this article we worked with char type in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).