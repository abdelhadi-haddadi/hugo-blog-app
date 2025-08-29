+++
title = "C# BigInteger"
date = 2025-08-27T23:22:45.900+01:00
draft = false
description = "Learn how to use BigInteger in C# to handle
large integer values that exceed built-in types. This C# BigInteger tutorial
covers syntax, usage, and real-world examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# BigInteger

last modified July 5, 2025

 

In this article we show how use the **BigInteger type in C#** to
handle extremely large integer values that exceed the limits of built-in data
types. This tutorial covers the basics of working with BigInteger
in C# for developers who need high-precision number calculations.

BigInteger represents an arbitrarily large signed integer. It is
used when built-in integer types are not large enough to represent values. 
BigInteger is located in the System.Numerics
namespace.

## Owerflows

An *arithmetic overflow* occurs when a calculation produces a value 
that is greater than the given data type can store. 

Program.cs
  

using System.Numerics;

Console.WriteLine(int.MaxValue);
Console.WriteLine(long.MaxValue);
Console.WriteLine(UInt64.MaxValue);
Console.WriteLine(UInt128.MaxValue);

Console.WriteLine("-----------------------");

Console.WriteLine(UInt128.MaxValue + 1);
Console.WriteLine(UInt128.MaxValue + 2);
Console.WriteLine(UInt128.MaxValue + 3);

Console.WriteLine("-----------------------");

Console.WriteLine((BigInteger)UInt128.MaxValue + 1);
Console.WriteLine((BigInteger)UInt128.MaxValue + 2);
Console.WriteLine((BigInteger)UInt128.MaxValue + 3);

In C#, the largest built-in integer number is currently
 UInt128.MaxValue. If we add 1 or greater value to it, the
 calculation overflows. To be able to work with larger values, we need to use
 the
 BigInteger type.

Console.WriteLine(int.MaxValue);
Console.WriteLine(long.MaxValue);
Console.WriteLine(UInt64.MaxValue);
Console.WriteLine(UInt128.MaxValue);

For comparison, we print the maximum values of int,
long, UInt64, and UInt128 types.

Console.WriteLine(UInt128.MaxValue + 1);
Console.WriteLine(UInt128.MaxValue + 2);
Console.WriteLine(UInt128.MaxValue + 3);

We add values to the UInt128.MaxValue. The result is an arithmetic
overflow.

Console.WriteLine((BigInteger)UInt128.MaxValue + 1);
Console.WriteLine((BigInteger)UInt128.MaxValue + 2);
Console.WriteLine((BigInteger)UInt128.MaxValue + 3);

To get the correct results, we cast the first operand to
BigInteger.

$ dotnet run 
2147483647
9223372036854775807
2147483647
9223372036854775807
18446744073709551615
340282366920938463463374607431768211455
-----------------------
0
1
2
-----------------------
340282366920938463463374607431768211456
340282366920938463463374607431768211457
340282366920938463463374607431768211458

## C# BigInteger.Parse

The Parse method converts the string representation of a number to
its BigInteger equivalent.

Program.cs
  

using System.Numerics;

ulong n = 18446744073709551615;
Console.WriteLine(n);
Console.WriteLine(UInt64.MaxValue);

var bi = BigInteger.Parse("18446744073709551616");
Console.WriteLine(bi);

The UInt64.MaxValue, which is 18446744073709551615, is the largest 
possible integer literal in C# code. To be able to use larger numbers, it must 
be parsed from a string representation using BigInteger.Parse.

$ dotnet run 
18446744073709551615
18446744073709551615
18446744073709551616

## Adding BigIntegers

We can add BigIntegers using BigInteger.Add method 
or the + operator.

Program.cs
  

using System.Numerics;

BigInteger n = BigInteger.Parse("12423523432222288811111000");
BigInteger n2 = BigInteger.One;

BigInteger n3 = n + n2 + n2;
Console.WriteLine(n3);

BigInteger n4 = BigInteger.Add(BigInteger.Add(n, n2), n2);
Console.WriteLine(n4);

Console.WriteLine(n3 == n4);
Console.WriteLine(BigInteger.Equals(n3, n4));

In the program we add three BigIntegers using both ways. We compare 
the results with == and BigInteger.Equals.

$ dotnet run 
12423523432222288811111002
12423523432222288811111002
True
True

## Subtracting BigIntegers

We can subtract BigInteger values with
BigInteger.Subtract or with the - operator.

Program.cs
  

using System.Numerics;

BigInteger n = BigInteger.Parse("12423523432222288811111000");
BigInteger n2 = BigInteger.One;

BigInteger n3 = n - n2;
Console.WriteLine(n3);

BigInteger n4 = BigInteger.Subtract(n, n2);
Console.WriteLine(n4);

Console.WriteLine(n3 == n4);
Console.WriteLine(BigInteger.Equals(n3, n4));

The program subtracts two values using the method and the operator and compares 
the results.

$ dotnet run 
12423523432222288811110999
12423523432222288811110999
True
True

## BigInteger.Pow

 
The BigInteger.Pow method raises a BigInteger value to
the power of a specified value.

BigInteger BigInteger.Pow(BigInteger value, int exponent)

This is the method's synopsys.

Program.cs
  

using System.Numerics;

BigInteger n = BigInteger.Pow(Int64.MaxValue, 2);
Console.WriteLine(n);

BigInteger n2 = BigInteger.Parse("12423523432222288811111000");
BigInteger n3 = BigInteger.Pow(n2, 3);
Console.WriteLine(n3);

The example computes two very large values with BigInteger.Pow.

$ dotnet run 
85070591730234615847396907784232501249
1917495486521555257396734275858546962917892419563859687501415360631000000000

## Remainders

The BigInteger.Remainder performs integer division on two
BigInteger values and returns the remainder while the 
BigInteger.DivRem computes the quotient and remainder of two
values.

Program.cs
  

using System.Numerics;

BigInteger z1 = BigInteger.Parse("9640282333924329381111174611241768210411");
BigInteger z2 = BigInteger.Parse("340282366920938463463374607431768210428");

BigInteger z3 = BigInteger.Remainder(z1, z2);
Console.WriteLine(z3);

(BigInteger z4, BigInteger z5) = BigInteger.DivRem(z1, z2);

Console.WriteLine(z4);
Console.WriteLine(z5);

Console.WriteLine(z1 == z4 * z2 + z5);

The program computes the remainder and quotient of two BigInteger
values.

$ dotnet run 
112376060138052404136685603152258318427
28
112376060138052404136685603152258318427
True

## Source

[BigInteger struct - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.numerics.biginteger?view=net-8.0)

In this article we have worked with BigInteger in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).