+++
title = "C# double"
date = 2025-08-29T19:50:41.938+01:00
draft = false
description = "C# double tutorial shows how to work with double type in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# double

last modified July 5, 2023

 

In this article we show how to work with double data type in C#.

The double type is one of the fundamental data types in
programming. We can define a *data type* as a set of values, and the
allowable operations on those values.

The double is a primitive data type which represents real numbers 
in computing. The double is an alias for System.Double
structure.

Floating point numbers represent real numbers in computing. Real numbers measure
continuous quantities, like weight, height, or speed. In C# we have three
floating point types: float, double, and
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

## C# double type constants

The double type has some built-in constants.

Program.cs
  

Console.WriteLine(double.MinValue);
Console.WriteLine(double.MaxValue);

Console.WriteLine(double.E);
Console.WriteLine(double.Pi);
Console.WriteLine(double.Tau);

The program prints five constants.

Console.WriteLine(double.MinValue);
Console.WriteLine(double.MaxValue);

We print the smallest and largest possible value of double type.

Console.WriteLine(double.E);
Console.WriteLine(double.Pi);
Console.WriteLine(double.Tau);

We print three well-known Math constants.

$ dotnet run
-1.7976931348623157E+308
1.7976931348623157E+308
2.718281828459045
3.141592653589793
6.283185307179586

## Floating point type suffixes

By default, real numbers are double in C# programs. To use a different type, we
must use a suffix. The F/f for float numbers and
M/m for decimal numbers.

Program.cs
  

float n1 = 6.78f;
double n2 = 6.78;
decimal n3 = 6.78m;

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

Console.WriteLine(n1.GetType());
Console.WriteLine(n2.GetType());
Console.WriteLine(n3.GetType());

In the above program, we use three different literal notations for floating
point numbers.

float n1 = 1.234f;

The f suffix is used for a float number.

double n2 = 1.234;

If we do not use a suffix, then it is a double number. We
can optionally use the d suffix.

Console.WriteLine(n1.GetType());

The GetType method returns the type of the number.

$ dotnet run
6.78
6.78
6.78
System.Single
System.Double
System.Decimal

## C# convert to double

In the next example, we show how to convert values to double type.

Program.cs
  

float n1 = 6.78f;
decimal n2 = 6.78m;
int n3 = 7;

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

Console.WriteLine("-------------------");

double d1 = (double) n1;
double d2 = decimal.ToDouble(n2);
double d3 = Convert.ToDouble(n3);

Console.WriteLine(d1);
Console.WriteLine(d2);
Console.WriteLine(d3);

Console.WriteLine("-------------------");

Console.WriteLine(d1.GetType());
Console.WriteLine(d2.GetType());
Console.WriteLine(d3.GetType());

We define three variables having float, decimal, and
int types. We convert these values to double type.

float n1 = 6.78f;
decimal n2 = 6.78m;
int n3 = 7;

We define three variables.

double d1 = (double) n1;

We use the casting operation to convert the float value to
double.

double d2 = decimal.ToDouble(n2);

In the second case, we convert the decimal to double
with decimal.ToDouble built-in method.

double d3 = Convert.ToDouble(n3);

Finally, for the integer type, we utilize the external Convert
class.

$ dotnet run
6.78
6.78
7
-------------------
6.78000020980835
6.78
7
-------------------
System.Double
System.Double
System.Double

Note that there is some small error in the first conversion.

## C# convert from double type

In the next example we show how to convert from the double type 
to other data types.

Program.cs
  

double val = 6.78;

float n1 = (float) val;
decimal n2 = Convert.ToDecimal(val);
int n3  = Convert.ToInt32(val);

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

Console.WriteLine(n1.GetType());
Console.WriteLine(n2.GetType());
Console.WriteLine(n3.GetType());

We define a single double value. We convert the value to float, 
decimal, and int.

$ dotnet run
6.78
6.78
7
System.Single
System.Decimal
System.Int32

## The double type is inexact

The double type is not exact. There are small rounding errors in 
calculations. In many cases, these do not pose a problem. For instance, it does 
not matter if an item is 1.78 mm or 1.7801 mm log. 

In financial and currency calculations, these small errors matter. For those 
types of calculations, we use the decimal type.

Program.cs
  

double n1 = 0.1 + 0.1 + 0.1;
double n2 = 0.3;

Console.WriteLine(n1);
Console.WriteLine(n2);

if (n1 == n2)
{
    Console.WriteLine("The values are equal");
} else 
{
    Console.WriteLine("The values are not equal");
}

The program demonstrates a small error in a simple calculation with
double types.

$ dotnet run
0.30000000000000004
0.3
The values are not equal

The two values are not equal because there is a very small error in the
addition operation.

## C# round double values

Rounding numbers is adjusting the digits up or down to make calculations easier.
We can round 

double double.Round(double x, int digits, MidpointRounding mode)

The method rounds a double value to a specified number of fractional digits
using the specified rounding mode.

    
        ModeDescription
    
    
        AwayFromZerorounded toward the nearest number that's away from zero
        ToEvenrounded toward the nearest even number
        ToNegativeInfinitydownwards-directed rounding
        ToPositiveInfinityupwards-directed rounding
        ToZerorounding towards zero
    

The table presents the rounding modes available.

Program.cs
  

double n1 = 1 / 7d;
double n2 = -1 / 7d;

Console.WriteLine(n1);
Console.WriteLine(n2);

Console.WriteLine("-------------------------");

Console.WriteLine(double.Round(n1, 3, MidpointRounding.ToEven));
Console.WriteLine(double.Round(n2, 3, MidpointRounding.ToEven));

Console.WriteLine("-------------------------");

Console.WriteLine(double.Round(n1, 3, MidpointRounding.AwayFromZero));
Console.WriteLine(double.Round(n2, 3, MidpointRounding.AwayFromZero));

Console.WriteLine("-------------------------");

Console.WriteLine(double.Round(n1, 3, MidpointRounding.ToZero));
Console.WriteLine(double.Round(n2, 3, MidpointRounding.ToZero));

Console.WriteLine("-------------------------");

Console.WriteLine(double.Round(n1, 3, MidpointRounding.ToNegativeInfinity));
Console.WriteLine(double.Round(n2, 3, MidpointRounding.ToNegativeInfinity));

Console.WriteLine("-------------------------");

Console.WriteLine(double.Round(n1, 3, MidpointRounding.ToPositiveInfinity));
Console.WriteLine(double.Round(n2, 3, MidpointRounding.ToPositiveInfinity));

In the example, we have a positive and a negative double value. We round the
values using the available rounding modes to three fractional digits.

$ dotnet run 
0.14285714285714285
-0.14285714285714285
-------------------------
0.143
-0.143
-------------------------
0.143
-0.143
-------------------------
0.142
-0.142
-------------------------
0.142
-0.143
-------------------------
0.143
-0.142

## Source

[Double struct](https://learn.microsoft.com/en-us/dotnet/api/system.double?view=net-8.0)

In this article we worked with double type in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).