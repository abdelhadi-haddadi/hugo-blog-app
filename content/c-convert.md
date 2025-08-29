+++
title = "C# Convert"
date = 2025-08-27T23:23:19.074+01:00
draft = false
description = "C# Convert tutorial shows how to convert types
in C#. The Convert class is located in the System namespace."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Convert

last modified July 5, 2023

 

In this article we show to convert types in C# with Convert class.

Convert transforms a base data type to another base data type.

The Convert class is located in the System namespace.

*Type conversion* or *typecasting* refers to changing an entity of
one data type into another. There are two types of conversion: implicit and
explicit. Implicit type conversion, also known as coercion, is an automatic type
conversion by the compiler.

## C# convertion types

In the next example, we present three ways of data convertion.

Program.cs
  

int n = 12;
string s  = "15";

string res = n + s;
Console.WriteLine(res);

int res2 = int.Parse(s) + n;
Console.WriteLine(res2);

int res3 = Convert.ToInt32(s) + n;
Console.WriteLine(res3);

The program defines an integer and a string. We add those two values.

int res = n + s;

By default, the compiler implicitly converts the integer to a string and adds 
two strings.

int res2 = int.Parse(s) + n;

We can use the int.Parse method to explicitly convert the string 
to an integer and add two integers.

int res3 = Convert.ToInt32(s) + n;

Alternatively, we can use the Convert.ToInt32 method. The
Convert class contains several methods for common type convertions.

$ dotnet run
1215
27
27

## C# Conver.ToBoolean

The Conver.ToBoolean method converts a specified value to an
equivalent Boolean value.

Program.cs
  

double n1 = 0.3;
int n2 = 3;
int n3 = 0;
int n4 = -1;

decimal d = 0.35m;

Console.WriteLine(Convert.ToBoolean(n1));
Console.WriteLine(Convert.ToBoolean(n2));
Console.WriteLine(Convert.ToBoolean(n3));
Console.WriteLine(Convert.ToBoolean(n4));
Console.WriteLine(Convert.ToBoolean(d));

In the program, we convert double, int, and decimal values to booleans.

$ dotnet run
True
True
False
True
True

## C# Convert hexadecimal string

The Convert.ToHexString converts an array of 8-bit unsigned
integers to its equivalent string representation that is encoded with uppercase
hex characters.

The Convert.FromHexString converts the specified string, which
encodes binary data as hex characters, to an equivalent 8-bit unsigned integer
array.

Program.cs
  

using System.Text;

string msg = "an old falcon";
byte[] data = Encoding.ASCII.GetBytes(msg) ;

string hexstr = Convert.ToHexString(data);
Console.WriteLine(hexstr);

byte[] data2 = Convert.FromHexString(hexstr);
Console.WriteLine(Encoding.ASCII.GetString(data2));

The program converts a message to a hexadecimal string and vice versa.

$ dotnet run
616E206F6C642066616C636F6E
an old falcon

## C# Convert.ToBase64String

The Convert.ToBase64String converts an array of 8-bit unsigned
integers to its equivalent string representation that is encoded with base-64
digits.

Conversely, the Convert.FromBase64String method converts Converts
the specified string, which encodes binary data as base-64 digits, to an
equivalent 8-bit unsigned integer array.

Base64 encoding is widely used for sending e-mail attachments.

Program.cs
  

using System.Text;

string msg = "an old falcon";

byte[] data = Encoding.ASCII.GetBytes(msg);
Console.WriteLine(BitConverter.ToString(data));

string base64 = Convert.ToBase64String(data);
Console.WriteLine(base64);

Console.WriteLine("---------------------");

byte[] data2 = Convert.FromBase64String(base64);
Console.WriteLine(BitConverter.ToString(data));
Console.WriteLine(Encoding.ASCII.GetString(data));

In the program, we convert a string to a byte array and later the array into 
the Base64 string. They we reverse the process.

$ dotnet run
61-6E-20-6F-6C-64-20-66-61-6C-63-6F-6E
YW4gb2xkIGZhbGNvbg==
---------------------
61-6E-20-6F-6C-64-20-66-61-6C-63-6F-6E
an old falcon

## C# Convert.ToDateTime

The Convert.ToDateTime converts the specified string representation
of a date and time to an equivalent date and time value.

public static DateTime ToDateTime (string? value);

This is the syntax of the method.

Program.cs
  

DateTime now = DateTime.Now;
Console.WriteLine(now);

string d = now.ToString();
Console.WriteLine(d);

DateTime dt = Convert.ToDateTime(d);
Console.WriteLine(dt);

In the example, we convert the current datetime to a string and the string back 
to a datetime.

$ dotnet run
10/23/2022 6:58:09 PM
10/23/2022 6:58:09 PM
10/23/2022 6:58:09 PM

## C# Convert.ToDecimal

The Convert.ToDecimal method converts a specified value to a decimal type, which is suitable for high-precision calculations such as financial applications.

Program.cs
  

using System;

class Program
{
    static void Main()
    {
        string price = "123.456";
        int quantity = 5;
        double rate = 0.075;

        decimal priceDecimal = Convert.ToDecimal(price);
        decimal quantityDecimal = Convert.ToDecimal(quantity);
        decimal rateDecimal = Convert.ToDecimal(rate);

        decimal total = priceDecimal * quantityDecimal * (1 + rateDecimal);

        Console.WriteLine($"Price: {priceDecimal:C}");
        Console.WriteLine($"Quantity: {quantityDecimal}");
        Console.WriteLine($"Tax Rate: {rateDecimal:P}");
        Console.WriteLine($"Total with Tax: {total:C}");
    }
}

In this example, we convert a string, an integer, and a double to decimal using Convert.ToDecimal. These values are used to calculate a total price with tax, demonstrating the precision of decimal for financial calculations. The output formats the results for readability.

$ dotnet run
Price: $123.46
Quantity: 5
Tax Rate: 7.50%
Total with Tax: $664.26

## C# Convert with Nullable Types

The Convert class can handle nullable types, allowing safe conversions when values may be null. Methods like Convert.ToInt32 treat null as zero for numeric conversions, which is useful for handling optional data.

Program.cs
  

using System;

class Program
{
    static void Main()
    {
        string? nullableString = null;
        string validString = "42";
        object? nullableObject = null;

        int result1 = Convert.ToInt32(nullableString); // Converts null to 0
        int result2 = Convert.ToInt32(validString);
        int result3 = Convert.ToInt32(nullableObject); // Converts null to 0

        Console.WriteLine($"Nullable string to int: {result1}");
        Console.WriteLine($"Valid string to int: {result2}");
        Console.WriteLine($"Nullable object to int: {result3}");
    }
}

This program demonstrates how Convert.ToInt32 handles nullable strings and objects. Null values are converted to 0, while valid strings are converted to their integer equivalent. This is particularly useful when dealing with data that may be missing or optional.

$ dotnet run
Nullable string to int: 0
Valid string to int: 42
Nullable object to int: 0

## C# Convert with Overflow Checking

The Convert class can be used in a checked context to
detect overflow when converting between numeric types, ensuring safe type
conversions in critical calculations.

Program.cs
  

using System;

class Program
{
    static void Main()
    {
        double largeNumber = 1_000_000_000_000;
        string largeString = "2147483648"; // Beyond int.MaxValue

        try
        {
            checked
            {
                int intFromDouble = Convert.ToInt32(largeNumber); // Throws OverflowException
                Console.WriteLine(intFromDouble);
            }
        }
        catch (OverflowException e)
        {
            Console.WriteLine($"Overflow converting double: {e.Message}");
        }

        try
        {
            checked
            {
                int intFromString = Convert.ToInt32(largeString); // Throws OverflowException
                Console.WriteLine(intFromString);
            }
        }
        catch (OverflowException e)
        {
            Console.WriteLine($"Overflow converting string: {e.Message}");
        }
    }
}

This example uses Convert.ToInt32 within a checked
block to convert a large double and a string to an integer. Both conversions
exceed int.MaxValue, triggering OverflowExceptions.
This demonstrates how to use Convert safely in scenarios where
overflow is a concern.

$ dotnet run
Overflow converting double: Value was either too large or too small for an Int32.
Overflow converting string: Value was either too large or too small for an Int32.

## Source

[Convert class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.convert?view=net-8.0)

In this article we have shown how to convert types in C# with Convert.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).