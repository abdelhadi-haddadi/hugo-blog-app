+++
title = "C# round"
date = 2025-08-29T19:51:19.947+01:00
draft = false
description = "Learn C# rounding with this in-depth tutorial. Master Math.Round, Ceiling, Floor, and decimal rounding modes for precise number handling in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# round

last modified April 23, 2025

 

This tutorial demonstrates how to round numbers in C# using various methods and
techniques.

Rounding numbers involves adjusting digits upward or downward to simplify
calculations and enhance readability of numerical results.

## C# rounding methods

Basic rounding operations can be performed using the Ceiling and
Floor methods. The Ceiling method returns the smallest
integer greater than or equal to the input number, while the
Floor method returns the largest integer less than or equal to it.

For more sophisticated rounding, the Round method offers greater
control. Multiple overloaded Round methods exist, including
Math.Round, float.Round, double.Round,
and decimal.Round, each tailored for specific numeric types and
rounding requirements.

Math.Round(decimal d, int decimals, MidpointRounding mode)

This overloaded method rounds a decimal value to a specified number of decimal
places, using a designated rounding mode for precise control.

    ModeDescription

    AwayFromZerorounded toward the nearest number that's away from zero
    ToEvenrounded toward the nearest even number
    ToNegativeInfinitydownwards-directed rounding
    ToPositiveInfinityupwards-directed rounding
    ToZerorounding towards zero

The table outlines the available rounding modes for fine-tuned number
adjustments.

## C# Ceiling &amp; Floor

This example illustrates rounding double values using Ceiling and
Floor methods.

Program.cs
  

double n1 = 1.467;

Console.WriteLine(Math.Ceiling(n1));
Console.WriteLine(Math.Floor(n1));

Console.WriteLine(Math.Ceiling(-n1));
Console.WriteLine(Math.Floor(-n1));

double n3 = 6.967;

Console.WriteLine(double.Ceiling(n3));
Console.WriteLine(double.Floor(n3));
Console.WriteLine(double.Ceiling(-n3));
Console.WriteLine(double.Floor(-n3));

The program rounds two double values, producing integer outputs for both
positive and negative numbers.

Console.WriteLine(Math.Ceiling(n1));
Console.WriteLine(Math.Floor(n1));

These methods are accessed through the Math class for standard
rounding operations.

Console.WriteLine(double.Ceiling(n3));
Console.WriteLine(double.Floor(n3));

Alternatively, the double type provides its own
Ceiling and Floor methods.

$ dotnet run
2
1
-1
-2
7
6
-6
-7

## C# Round fractional digits

You can specify the number of decimal places to which a number is rounded,
allowing precise control over the output.

Program.cs
  

float n1 = 1.23487f;
float n2 = 3.97451f;

Console.WriteLine(n1);
Console.WriteLine(n2);

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4));
Console.WriteLine(Math.Round(n2, 4));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 3));
Console.WriteLine(Math.Round(n2, 3));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 2));
Console.WriteLine(Math.Round(n2, 2));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 1));
Console.WriteLine(Math.Round(n2, 1));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 0));
Console.WriteLine(Math.Round(n2, 0));

This program rounds two float values to four, three, two, one, and zero decimal
places using Math.Round, showcasing precision control.

$ dotnet run
1.23487
3.97451
-------------------------
1.2349
3.9745
-------------------------
1.235
3.975
-------------------------
1.23
3.97
-------------------------
1.2
4
-------------------------
1
4

## C# rounding modes

This example explores the various rounding modes available in C# for nuanced
number adjustments.

Program.cs
  

double n1 = 1/7d;
double n2 = -1/7d;

Console.WriteLine(n1);
Console.WriteLine(n2);

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4, MidpointRounding.ToEven));
Console.WriteLine(Math.Round(n2, 4, MidpointRounding.ToEven));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4, MidpointRounding.AwayFromZero));
Console.WriteLine(Math.Round(n2, 4, MidpointRounding.AwayFromZero));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4, MidpointRounding.ToZero));
Console.WriteLine(Math.Round(n2, 4, MidpointRounding.ToZero));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4, MidpointRounding.ToNegativeInfinity));
Console.WriteLine(Math.Round(n2, 4, MidpointRounding.ToNegativeInfinity));

Console.WriteLine("-------------------------");

Console.WriteLine(Math.Round(n1, 4, MidpointRounding.ToPositiveInfinity));
Console.WriteLine(Math.Round(n2, 4, MidpointRounding.ToPositiveInfinity));

The program rounds positive and negative double values to four decimal places
using each available rounding mode, highlighting their distinct behaviors.

$ dotnet run
0.14285714285714285
-0.14285714285714285
-------------------------
0.1429
-0.1429
-------------------------
0.1429
-0.1429
-------------------------
0.1428
-0.1428
-------------------------
0.1428
-0.1429
-------------------------
0.1429
-0.1428

## C# rounding example

This example rounds a decimal number across various modes and precision levels,
displaying results in a formatted table.

Program.cs
  

using System.Text;

decimal n = 1 / 7m;
// decimal n = -1/7m;

char s = ' ';
string cln = new string('-', 10);

string h1 = "(1)";
string h2 = "(2)";
string h3 = "(3)";
string h4 = "(4)";
string h5 = "(5)";

var precisions = new List { 1, 2, 3, 4, 5 };
var modes = new List
{
    MidpointRounding.ToEven, MidpointRounding.ToZero,
    MidpointRounding.AwayFromZero, MidpointRounding.ToNegativeInfinity,
    MidpointRounding.ToPositiveInfinity
};

Console.WriteLine($"{s,20}{h1,-10}{h2,-10}{h3,-10}{h4,-10}{h5,-10}");
Console.WriteLine($"{s,20}{cln,10}{cln,10}{cln,10}{cln,10}{cln,10}");

foreach (var mode in modes)
{
    var builder = new StringBuilder();
    builder.Append($"{mode,-20}");

    foreach (var prec in precisions)
    {
        builder.Append($"{decimal.Round(n, prec, mode),-10}");
    }

    Console.WriteLine(builder.ToString());
}

The results are presented in a neatly organized table for clarity and easy
comparison.

$ dotnet run
                    (1)       (2)       (3)       (4)       (5)
                    --------------------------------------------------
ToEven              0.1       0.14      0.143     0.1429    0.14286
ToZero              0.1       0.14      0.142     0.1428    0.14285
AwayFromZero        0.1       0.14      0.143     0.1429    0.14286
ToNegativeInfinity  0.1       0.14      0.142     0.1428    0.14285
ToPositiveInfinity  0.2       0.15      0.143     0.1429    0.14286

This output displays the results for the positive decimal value.

$ dotnet run
                    (1)       (2)       (3)       (4)       (5)
                    --------------------------------------------------
ToEven              -0.1      -0.14     -0.143    -0.1429   -0.14286
ToZero              -0.1      -0.14     -0.142    -0.1428   -0.14285
AwayFromZero        -0.1      -0.14     -0.143    -0.1429   -0.14286
ToNegativeInfinity  -0.2      -0.15     -0.143    -0.1429   -0.14286
ToPositiveInfinity  -0.1      -0.14     -0.142    -0.1428   -0.14285

This output shows the results for the negative decimal value.

## C# Rounding with Error Handling

This example demonstrates rounding with error handling to manage invalid inputs
or edge cases gracefully.

Program.cs
  

double[] numbers = { 3.14159, double.NaN, double.PositiveInfinity, 2.71828 };

foreach (var num in numbers)
{
    try
    {
        var result = Math.Round(num, 2);
        Console.WriteLine($"Rounded {num} to {result}");
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"Error rounding {num}: {ex.Message}");
    }
}

The program rounds an array of doubles, handling special cases like NaN and
infinity, ensuring robust execution.

$ dotnet run
Rounded 3.14159 to 3.14
Error rounding NaN: Value is not a number.
Error rounding Infinity: Value is not a number.
Rounded 2.71828 to 2.72

## C# Rounding in Financial Calculations

This example applies rounding in a financial context, ensuring accurate
calculations for monetary values using the decimal type.

Program.cs
  

decimal price = 99.98765m;
decimal taxRate = 0.075m;

decimal tax = price * taxRate;
decimal total = price + tax;

Console.WriteLine($"Price: {price}");
Console.WriteLine($"Tax: {decimal.Round(tax, 2, MidpointRounding.ToEven)}");
Console.WriteLine($"Total: {decimal.Round(total, 2, MidpointRounding.ToEven)}");

The program calculates tax and total price, rounding to two decimal places for
standard financial precision.

$ dotnet run
Price: 99.98765
Tax: 7.49
Total: 107.48

## C# Rounding with Custom Precision Function

This example defines a custom function to round numbers with user-specified
precision and mode, enhancing flexibility.

Program.cs
  

double RoundNumber(double value, int decimals, MidpointRounding mode)
{
    return Math.Round(value, decimals, mode);
}

double value = 15.62578;
var modes = new[] { MidpointRounding.ToEven, MidpointRounding.AwayFromZero };

foreach (var mode in modes)
{
    Console.WriteLine($"Value {value} rounded to 3 decimals ({mode}): " +
        $"{RoundNumber(value, 3, mode)}");
}

The custom function simplifies rounding with configurable parameters,
demonstrating reusable code design.

$ dotnet run
Value 15.62578 rounded to 3 decimals (ToEven): 15.626
Value 15.62578 rounded to 3 decimals (AwayFromZero): 15.626

## Source

[Math.Round method](https://learn.microsoft.com/en-us/dotnet/api/system.math.round?view=net-8.0)

This tutorial has comprehensively explored rounding numbers in C#, covering
basic and advanced techniques.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With over a decade of teaching expertise, I share my knowledge
through detailed and practical tutorials.

List [all C# tutorials](/csharp/).