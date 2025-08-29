+++
title = "C# Decimal"
date = 2025-08-27T23:22:56.314+01:00
draft = false
description = "C# Decimal tutorial shows how to perform high-precision calculation in C# with Decimal. Decimal type represents a decimal floating-point number."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Decimal

last modified July 5, 2023

 

C# Decimal tutorial shows how to perform high-precision calculation in C# with
Decimal.

## Decimal

The decimal is a floating decimal point type. Because the decimal
type has more precision and a smaller range than both float and double, it is
appropriate for financial and monetary calculations. The default value of a
Decimal is 0. The Decimal literal uses m or M suffix.
Humans are used to representing non-integers in a decimal form, and expect exact
results in decimal representations.

Some values cannot be exactly represented in double/float data types. For
instance, storing the 0.1 value in double/float (which are binary floating point
values) variable we get only an approximation of the value. Similarly, the 1/3
value cannot be represented exactly in decimal floating point type. 

Decimals are much slower than a double/float. Decimals also allow the encoding 
or trailing zeros.

Neither of the types is perfect; generally, decimal types are better suited for
financial and monetary calculations, while the double/float types for scientific
calculations. 

## C# floating point numbers

Floating point numbers represent real numbers in computing. Real numbers
measure continuous quantities, like weight, height, or speed. In C# we have
three floating point types: float, double, and
decimal.

C# Alias
.NET Type
Size
Precision
Range

float
System.Single

4 bytes
7 digits
+-1.5 x 10-45 to +-3.4 x 1038 

double
System.Double
8 bytes

15-16 digits
+-5.0 x 10-324 to +-1.7 x 10308 

decimal
System.Decimal
16 bytes
28-29 decimal places

+-1.0 x 10-28  to +-7.9 x 1028 

The above table gives the characteristics of the floating point types.

**Note: ** As a rule of thumb, decimal is used for
counted values while float/double for measured values.

## C# decimal precision

The decimal type is a 128-bit floating point data type; it can 
have up to 28-29 significant digits.

The following example compares the precision of the float, 
double, and the decimal types.

Program.cs
  

float x = 1f / 3f;
double y = 1d / 3d;
decimal z = 1m / 3m;

Console.WriteLine(x);
Console.WriteLine(y);
Console.WriteLine(z);

Value 1/3 is an non-terminating number; it can be represented only as an
approximation.

$ dotnet run
0.33333334
0.3333333333333333
0.3333333333333333333333333333

From the example we can see that decimal has more decimal places 
after the floating point.

## C# decimal literal

The D/d suffix is used for double values, the F/f for
float values and the M/m decimal values. Floating
point values without a suffix are double.

Program.cs
  

float n1 = 1.234f;
double n2 = 1.234;
decimal n3 = 1.234m;

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

Console.WriteLine(n1.GetType());
Console.WriteLine(n2.GetType());
Console.WriteLine(n3.GetType());

In the example, we use three different literal notations for floating point
numbers. 

$ dotnet run
1.234
1.234
1.234
System.Single
System.Double
System.Decimal

## C# decimal for exact financial or monetary calculations

Finalcial and monetary calculations must be exact. 

Program.cs
  

double x = 0.1 + 0.1 + 0.1;
double y = 0.3;

Console.WriteLine(x);
Console.WriteLine(y);
Console.WriteLine(x == y);

decimal u = 0.1m + 0.1m + 0.1m;
decimal v = 0.3m;

Console.WriteLine(u);
Console.WriteLine(v);
Console.WriteLine(u == v);

This example shows that values 0.1 can be represented exactly in decimal type.

$ dotnet run
0.30000000000000004
0.3
False
0.3
0.3
True

The double value has some small error. It can be ignored in many calculations.
For instance, if we are measuring weight or height of people, this kind of error
is irrelevant. However, in finalcial calculations it causes problems.

## C# decimal System.OverflowException

Unlike in double/float types, trying to increse a decimal value 
beyond its limit causes System.OverflowException.

Program.cs
  

float maxValue = float.MaxValue;
float nextValue = maxValue + 1f;

Console.WriteLine(maxValue.ToString("f"));
Console.WriteLine(nextValue.ToString("f"));

decimal maxValue2 = decimal.MaxValue;
decimal nextValue2 = maxValue2 + 1m;

Console.WriteLine(maxValue.ToString("m"));
Console.WriteLine(nextValue.ToString("m"));

In the exammple, we add one to the maximal value of a float and 
a decimal.

$ dotnet run 
340282346638528859811704183484516925440.000
340282346638528859811704183484516925440.000 
Unhandled exception. System.OverflowException: Value was either too large or too 
small for a Decimal.
...

The example throws the System.OverflowException.

## C# decimal Parse

The Parse method converts the string representation of a number to
its decimal equivalent.

numbers.txt
  

123.23
213.44
713.54
319.11
199.09

We have this numbers.txt file.

Program.cs
  

var values = File.ReadAllLines("numbers.txt");

decimal sum = 0m;

foreach (var value in values)
{
    sum += decimal.Parse(value);
} 

Console.WriteLine($"The sum is: {sum}");

In the example, we read all values from the numbers.txt file.

var values = File.ReadAllLines("numbers.txt");

The ReadAllLines returns a string array. We need to trasform the 
strings into decimal values.

foreach (var value in values)
{
    sum += decimal.Parse(value);
} 

We go throug the array and parse the strings into decimals with
Parse.

$ dotnet run
The sum is: 1568.41

## C# decimal built-in methods

The decimal type has some built-in methocs such as Add
or Subtract.

Program.cs
  

decimal x = 12m;
decimal y = 5m;
decimal z = 12.89m;

Console.WriteLine(decimal.Remainder(x, y));
Console.WriteLine(decimal.Add(x, y));
Console.WriteLine(decimal.Subtract(x, y));
Console.WriteLine(decimal.Round(z, 1));

The example demonstrates the Remainder, Add, 
Subtract, and Round methods.

$ dotnet run
2
17
7
12.9

## Source

[Decimal struct](https://learn.microsoft.com/en-us/dotnet/api/system.decimal?view=net-8.0)

In this article we have worked with Decimal data type in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).