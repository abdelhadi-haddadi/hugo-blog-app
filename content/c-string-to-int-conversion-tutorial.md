+++
title = "C# string to int conversion tutorial"
date = 2025-08-29T19:51:31.157+01:00
draft = false
description = "C# string to int tutorial shows how to convert strings to integers. There are several ways to perform string to int conversion in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# string to int conversion tutorial

last modified July 5, 2023

 

C# string to int tutorial shows how to convert strings to integers.
We can use the methods of the Convert class such as 
Convert.ToInt32, Int32.Parse, and
Int32.TryParse to do the conversions.

## C# string to int conversion

String to integer conversion is a type conversion or type casting, where
an entity of string data type is changed into integer one. This type of conversion
is very common because we receive values from forms, command line parameters, or
databases as strings, even if the values are integers.

The Convert.ToInt32 converts an object to an integer and returns
0 if the value was null. The Int32.Parse and
Int32.TryParse methods also convert strings to integers.
The difference between them is that Int32.Parse throws exceptions
if the parsing operation fails while Int32.TryParse returns
false.

There are equivalent methods for other numeric types; for instance
Int64.TryParse or Double.Parse.

## C# string to int with Convert.ToInt32

The Convert class contains methods for converting base data type
to another base data type.

Numeric typeMethod

decimalToDecimal
floatToSingle
doubleToDouble
showrtToInt16
intToInt32
longToInt64
ushortToUInt16
uintToUInt32
ulongToUInt64

The table lists methods to convert strings to various integer numeric types. The
Convert.ToInt32 converts a specified value to a 32-bit signed
integer.

Program.cs
  

string applesInBasket = "12";
string baskets = "4";

int total = Convert.ToInt32(applesInBasket) * Convert.ToInt32(baskets);

string msg = $"There are total of {total} apples";
Console.WriteLine(msg);

In the example, we multiply two integer values that we have initially as
strings.

int total = Convert.ToInt32(applesInBasket) * Convert.ToInt32(baskets);

We convert the strings and compute the expression.

$ dotnet run
There are total of 48 apples

## C# string to int with Int32.Parse

The Int32.Parse method converts the string representation of a
number to its 32-bit signed integer equivalent. It throws an exception if the
conversion fails.

Program.cs
  

string val = "23423453263456345";

try
{
    int num = Int32.Parse(val);

    Console.WriteLine($"Converted '{val}' to {num}.");
}
catch (FormatException)
{
    Console.WriteLine($"Unable to convert '{val}'.");
}
catch (OverflowException)
{
    Console.WriteLine($"'{val}' is out of range of the Int32 type.");
}

In the example, we parse a very large number represented as a string. Since
the value cannot be converted to an integer, the OverflowException
is thrown.

$ dotnet run
'23423453263456345' is out of range of the Int32 type.

## C# string to int with Int32.TryParse

The Int32.TryParse method converts the string representation of a
number to its 32-bit signed integer equivalent. A boolean return value indicates
whether the operation succeeded. The integer value is passed to the second
result parameter of the method.

Program.cs
  

string val = "2342";

if (Int32.TryParse(val, out int j))
{
    Console.WriteLine(j);
} else {

    Console.WriteLine("String could not be parsed.");
}

The example converts a string with the Int32.TryPars method. The
if condition checks for a return value of the method.

## Source

[Strings and string literals](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/)

In this article we have shown how to perform string to int conversions in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).