+++
title = "C# static"
date = 2025-08-29T19:51:27.708+01:00
draft = false
description = "C# static tutorial explains the static modifier keyword in C#. In classes, interfaces, and structs, we can use the static modifier for fields, methods, properties, operators, events, and constructors."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# static

last modified July 5, 2023

 

In this article we cover the static modifier keyword in C#. 

## The static modifier

A static member belongs to the type rather than to a specific object. 

Console.WriteLine(Math.Abs(-5));

Here, the Abs is a static method which belongs to a static 
Math type. We refer to the method by the type name followed by a
dot operator and a member method name.

In classes, interfaces, and structs, we can use the static modifier for fields,
methods, properties, operators, events, and constructors.

Static methods can work only with static members; they cannot access instance 
variables.

The following are features of a *static class*:

    - contains only static members

    - cannot be instantiated

    - is sealed; other classes cannot inherit from it

    - cannot contain instance constructors

The following are features of a *static constructor*:

    - a class or struct can only have one static constructor

    - static constructors cannot be inherited or overloaded

    - a static constructor cannot be called directly

    - it is automatically called by the common language runtime

    if we don't provide a static constructor to initialize static fields, 
        all static fields are initialized to their default values

## C# static member

A static member belongs to the type.

Program.cs
  

namespace StaticMember;

static class MyMath
{
    public static double PI = 3.14159265358979323846;
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine(MyMath.PI);
        Console.WriteLine(Math.Abs(-5));
    }
}

We have a static MyMath class which contains a single static
member.

Console.WriteLine(MyMath.PI);
Console.WriteLine(Math.Abs(-5));

We refer to the static PI member of our MyMath class.
Also, we refer to the static Abs method of the built-in
Math class.

$ dotnet run
3.141592653589793
5

## C# static method

A static method can access only static variables. It cannot access instance 
variables. A static method can only call other static methods.

Program.cs
  

namespace SimpleEx;

class Program
{
    static int i = 0;

    static void Main(string[] args)
    {
        Console.WriteLine(i);

        i = i + 5;

        Console.WriteLine(i);

        Inc();

        Console.WriteLine(i);

        Dec();

        Console.WriteLine(i);
    }

    static void Inc()
    {
        i = i + 1;
    }

    static void Dec()
    {
        i = i - 1;
    }
}

In the example, we have a static variable i and static methods 
Main, Console.WriteLine, Inc, and
Dec.

static void Main(string[] args)
...

The Main method is a classic entry point of a C# application.
Inside a static Main method, we can call only static methods.

$ dotnet run
0
5
6
5

## C# extension methods

The static keyword is used to define extension methods. Extension
methods are methods that can be inserted to existing types without creating a
new derived type, recompiling, or otherwise modifying the original type. 

Program.cs
  

var vals = new List&lt;int&gt; { 1, 2, 3, 4, 5, 6, 7, 8 };

vals.Shuffle();

var res = string.Join(" ", vals);
Console.WriteLine(res);

static class MyExtensions
{
    private static Random rng = new Random();

    public static void Shuffle&lt;T&gt;(this IList&lt;T&gt; vals)
    {
        int n = vals.Count;

        while (n &gt; 1)
        {
            n--;
            int k = rng.Next(n + 1);

            T value = vals[k];

            vals[k] = vals[n];
            vals[n] = value;
        }
    }
}

In the example, we define a Shuffle extension method.

vals.Shuffle();

We call the Shuffle extension method. The compiler translates it 
into the MyExtensions.Shuffle(vals);.

static class MyExtensions

The extension method is defined inside a static class.

private static Random rng = new Random();

The member that we use to generate random order is static.

public static void Shuffle&lt;T&gt;(this IList&lt;T&gt; vals)

The Shuffle method is declared with the static
modifier as well.

$ dotnet run
8 7 5 4 1 6 3 2
$ dotnet run
1 3 6 8 5 7 2 4

## C# using static directive

The using static allows us to access static members and nested types of a type
without having to qualify the access with the type name.

Program.cs
  

using static System.Math;

Console.WriteLine(Sqrt(3*3 + 4*4));

In the example, we import the Sqrt method into our namespace. 

## Source

[static modifier - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/static)

In this article we have worked with the static modifier in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).