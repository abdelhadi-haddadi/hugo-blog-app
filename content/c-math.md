+++
title = "C# Math"
date = 2025-08-29T19:51:04.728+01:00
draft = false
description = "C# Math tutorial shows how to use common mathematical functions in C# with System.Math."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Math

last modified July 5, 2023

 

In this article we cover common mathematical functions found in System.Math.

The System.Math provides constants and static methods for
trigonometric, logarithmic, and other common mathematical functions.

## C# Math.Abs

The Math.Abs function returns the absolute value of a specified
number. The absolute value of a number is the number without its sign.

Program.cs
  

var vals = new int[] { -1, 2, 0, -3, -2, 9, 7 };

foreach (var e in vals)
{
    Console.WriteLine(Math.Abs(e));
}

Console.WriteLine("-----------------");

int sum = 0;

foreach (var e in vals)
{
    sum += e;
}

Console.WriteLine(sum);

sum = 0;

foreach (var e in vals)
{
    sum += Math.Abs(e);
}

Console.WriteLine(sum);

We have an array of integers. First, we print the absolute value of all
integers. Then we calculate the sum of all values and sum of all absolute
values.

$ dotnet run
1
2
0
3
2
9
7
-----------------
12
24

## C# Math.Ceiling &amp; Math.Floor

The Match.Ceiling function computes the smallest integer that is
greater than or equal to x. The Math.Floor function returns the
largest integer less than or equal to x.

Program.cs
  

decimal[] vals = { 6.07m, 6.64m, 0.12m, -0.12m, -6.13m, -6.65m };

Console.WriteLine("{0,7} {1,16} {2,14}",
    "Numer", "Ceiling", "Floor");

foreach (var e in vals)
{
    Console.WriteLine("{0,7} {1,16} {2,14}",
        e, Math.Ceiling(e), Math.Floor(e));
}

In the example, we use the Math.Ceiling and Math.Floor 
functions on an array of decimal numbers.

$ dotnet run
Numer          Ceiling          Floor
6.07                 7              6
6.64                 7              6
0.12                 1              0
-0.12                0             -1
-6.13               -6             -7
-6.65               -6             -7

## C# Math.Pow, Math.Sqrt, &amp; Math.Cbrt 

The Math.Pow function returns a specified number raised to the
specified power. The Math.Sqrl returns the square root of a
specified number. The Math.Cbrt returns the cube root of a
specified number.

Program.cs
  

int x = 3;
int y = 81;

double res = Math.Pow(x, 5);
Console.WriteLine(res);

res = Math.Sqrt(y);
Console.WriteLine(res);

res = Math.Cbrt(y);
Console.WriteLine(res);

In the example, we use the power, square root and cube root functions.

$ dotnet run
243
9
4.326748710922225

## C# Math.BigMul

The Math.BigMul is used to calculate large numbers.

Program.cs
  

long res = Math.BigMul(int.MaxValue, int.MaxValue);
Console.WriteLine(res);

long res2 = (long) int.MaxValue * int.MaxValue;
Console.WriteLine(res2);

The example calculates the product of two large integers.

$ dotnet run
4611686014132420609
4611686014132420609

## C# Math.DivRem

The Math.DivRem calculates and returns both the quotient and the
remainder.

Program.cs
  

int x = 10;
int y = 3;

int rem = 0;
double quo = Math.DivRem(x, y, out rem);

Console.WriteLine($"Quotient: {quo} Remainder: {rem}");

quo = x / y;
rem = x % y;

Console.WriteLine($"Quotient: {quo} Remainder: {rem}");

In the example, we use the Math.DivRem and the % and
/ operators to calculate quotient and remainder values.

$ dotnet run
Quotient: 3 Remainder: 1
Quotient: 3 Remainder: 1

## C# Math.PI

The number π is a mathematical constant that is the ratio of a circle's
circumference to its diameter.

Program.cs
  

double radius = 5;

double circumference = 2 * Math.PI * radius;
Console.WriteLine(circumference);

double area = Math.PI * Math.Pow(radius, 2);
Console.WriteLine(area);

With the help of the Math.PI constant and Math.Pow
function, we compute the circumference and area of a circle.

$ dotnet run
31.41592653589793
78.53981633974483

## Source

[Math class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.math?view=net-8.0)

In this article we have covered common mathematical functions found in
System.Math.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).