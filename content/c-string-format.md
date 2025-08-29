+++
title = "C# String Format"
date = 2025-08-29T19:51:30.036+01:00
draft = false
description = "C# String Format tutorial shows how to format strings in C#. We use string.Format, Console.WriteLine, and StringBuilder.AppendFormat to format strings."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# String Format

last modified January 17, 2024

 

C# String Format tutorial shows how to format strings in C#. We use
string.Format, Console.WriteLine, and
StringBuilder.AppendFormat to format strings.

Another way to create strings is to use
[string interpolation](/csharp/string-interpolation/).

*Composite formatting* allows us to format strings in C#. It is supported
by methods such as string.Format,
Console.WriteLine or StringBuilder.AppendFormat
methods. A method takes a list of objects and a composite format string as
input. The format string consists of a fixed string and some format items. These
format items are indexed placeholders which correspond to the objects in the
list.

The format item has the following syntax:

{index[,alignment][:formatString]}

The index component is mandatory. It is a number starting from 0
that refers to an item from the list of objects. Multiple items can refer to the
same element of the list of objects. An object is ignored if it is not
referenced by a format item. If we refer outside the bounds of the list of
objects, a runtime exception is thrown.

The alignment component is optional. It is the minimum number of
characters in the string representation of the parameter. If positive, the
parameter is right-aligned; if negative, it is left-aligned. If it is specified,
there must by a colon separating the index and the length.

The formatString is optional. It is a string that formats a value
is a specific way. It can be used to format dates, times, numbers or
enumerations.

## C# string format methods

In the following example, we use string.Format,
Console.WriteLine, and StringBuilder.AppendFormat
to format strings.

Program.cs
  

using System.Text;

var msg = string.Format("There are {0} owls", 5);
Console.WriteLine(msg);

Console.WriteLine("There are {0} eagles", 3);

var builder = new StringBuilder();
builder.AppendFormat("There are {0} hawks", 4);
Console.WriteLine(builder);

The example formats strings using three different methods.

$ dotnet run
There are 5 owls
There are 3 eagles
There are 4 hawks

## C# string format index

In the following example, we format three strings.

Program.cs
  

int oranges = 2;
int apples = 4;
int bananas = 3;

string str1 = "There are {0} oranges, {1} apples and {2} bananas";
string str2 = "There are {1} oranges, {2} bananas and {0} apples";

Console.WriteLine(str1, oranges, apples, bananas);
Console.WriteLine(str2, apples, oranges, bananas);

We print a simple message to the console. We use only index component
of the format item.

string str1 = "There are {0} oranges, {1} apples and {2} bananas";

The {0}, {1}, and {2} are format
items. We specify the index component. Other components are optional.

Console.WriteLine(str1, oranges, apples, bananas);

Now we put together the composite formatting. We have the string and
the list of objects (oranges, apples, bananas). The {0} format item
refers to the oranges. The WriteLine method
replaces the {0} format item with the contents of the oranges
variable.

string str2 = "There are {1} oranges, {2} bananas and {0} apples";

The order of the format items referring to the objects is important.

$ dotnet run
There are 2 oranges, 4 apples and 3 bananas
There are 2 oranges, 3 bananas and 4 apples

## C# string format numeric data

The next example will format numeric data.

Program.cs
  

Console.WriteLine("{0}  {1, 12}", "Decimal", "Hexadecimal");

Console.WriteLine("{0:D}  {1,8:X}", 502, 546);
Console.WriteLine("{0:D}  {1,8:X}", 345, 765);
Console.WriteLine("{0:D}  {1,8:X}", 320, 654);
Console.WriteLine("{0:D}  {1,8:X}", 120, 834);
Console.WriteLine("{0:D}  {1,8:X}", 620, 454);

We print numbers in a decimal and hexadecimal format. We also align the numbers
using the length component.

Console.WriteLine("{0:D}  {1,8:X}", 502, 546);

The {0:D} format item specifies, the first item from the
list of supplied objects will be taken and formatted in
the decimal format. The {1,8:X} format item takes the
second item. Formats it in the hexadecimal format :X.
And the string length will be 8 characters 8 . Because the
number has only three characters, it is right aligned and
padded with empty strings.

$ dotnet run
Decimal   Hexadecimal
502       222
345       2FD
320       28E
120       342
620       1C6

The following example shows how to use various numeric notations.

Program.cs
  

Console.WriteLine("Number: {0:N}", 127);
Console.WriteLine("Scientific: {0:E}", 127);
Console.WriteLine("Currency: {0:C}", 127);
Console.WriteLine("Percent: {0:P}", 127);
Console.WriteLine("Hexadecimal: {0:X}", 127);

The example demonstrates the standard formatting specifiers for numbers.
Number 126 is printed in five different notations: normal, scientific, currency,
percent and hexadecimal.

$ dotnet run
Number: 127.00
Scientific: 1.270000E+002
Currency: $127.00
Percent: 12,700.00%
Hexadecimal: 7F

## The comma and dot specifiers

The dot (.) custom format specifier inserts a localized decimal
separator into the result string. The comma (,) specifier inserts a
group separator.

Program.cs
  

using System.Globalization;

double val = 127723134.212578;

var f1 = string.Format(CultureInfo.InvariantCulture, "{0:#,#.##}", val);
var f2 = string.Format(CultureInfo.InvariantCulture, "{0:0.0000}", val);

Console.WriteLine(val);
Console.WriteLine(f1);
Console.WriteLine(f2);

We format a double value using the two specifiers.

var f1 = string.Format(CultureInfo.InvariantCulture, "{0:#,#.##}", val);

This format will use a localized group separator and will display two digits 
after the decimal point.

var f2 = string.Format(CultureInfo.InvariantCulture, "{0:0.0000}", val);

In this format, we display four decimal points and no group seperator.

$ dotnet run 
127723134,212578
127,723,134.21
127723134.2126

## C# string format alignment

The alignment (or length) field is the minimum number of
characters to be written to the output. If we use {0,10},
the output is right-aligned. For left-alignment, we specify a negative
length field: {0,-10}.

Program.cs
  

Console.WriteLine(1);
Console.WriteLine(16);
Console.WriteLine(1655);
Console.WriteLine(16567);
Console.WriteLine(166701);

Console.WriteLine("{0,10}", 1);
Console.WriteLine("{0,10}", 16);
Console.WriteLine("{0,10}", 1655);
Console.WriteLine("{0,10}", 16567);
Console.WriteLine("{0,10}", 166701);

First, we print five numbers without specifying the field length. The length of
the output is equal to the number of the characters being displayed. In the
second case, we have a field length of 10. Each of the five outputs has a
minimum length of ten characters. The numbers are right aligned.

$ dotnet run
1
16
1655
16567
166701
        1
        16
        1655
        16567
        166701

## C# string format date and time

The next example formats date and time data.

Program.cs
  

var now = DateTime.Now;

Console.WriteLine("Short date: {0:d}", now);
Console.WriteLine("Long date: {0:D}", now);
Console.WriteLine("Short time: {0:t}", now);
Console.WriteLine("Long time: {0:T}", now);
Console.WriteLine("Month: {0:M}", now);
Console.WriteLine("Year: {0:Y}", now);

The code example shows six various formats for the current date and time.

$ dotnet run
Short date: 1/17/2024
Long date: Wednesday, January 17, 2024
Short time: 09:55
Long time: 09:55:43
Month: January 17
Year: January 2024

## Source

[String.Format method](https://learn.microsoft.com/en-us/dotnet/api/system.string.format?view=net-8.0)

In this article we have formatted strings in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).