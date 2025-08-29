+++
title = "C# NUnit"
date = 2025-08-29T19:51:09.524+01:00
draft = false
description = "C# NUnit tutorial shows how to do unit testing in C# with NUnit framework. Unit testing is a software testing where individual units of a software are tested."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# NUnit

last modified July 5, 2023

 

C# NUnit tutorial shows how to do unit testing in C# with NUnit framework.

Unit testing is a software testing where individual units (components) of a
software are tested. The purpose of unit testing is to validate that each unit
of the software performs as designed. A unit is the smallest testable part of
any software. 

NUnit is a unit-testing library for all .NET languages. It was inspired by
Java's JUnit. Other unit-testing libraries include XUnit and MSTest.

It is possible to place tests in the same project directory or inside a
different directory. We start with a simpler option and place tests in the 
same project directory. In the end, we show the latter option.

$ dotnet add Microsoft.NET.Test.Sdk
$ dotnet new nunit
$ dotnet add NUnit3TestAdapter

In order to use NUnit, we need to add these three libraries.

## C# NUNit simple example

We start with a simple example.

Arith.cs
  

namespace Arithmetic;

class Basic
{
    public static Func&lt;int, int, int&gt; add = (a, b) =&gt; a + b;
    public static Func&lt;int, int, int&gt; mul = (a, b) =&gt; a * b;
    public static Func&lt;int, int, int&gt; sub = (a, b) =&gt; a - b;
    public static Func&lt;int, int, int&gt; div = (a, b) =&gt; a / b;
}

We test simple arithmetic functions.

We put our tests into the tests directory. NUnit automatically discovers our
tests.

tests/ArithTest.cs
  

namespace Testing;

using NUnit.Framework;
using Arithmetic;

class ArithTest
{
    [Test]
    public void SimpleArithmetic()
    {
        int r1 = Basic.add(3, 3);
        Assert.AreEqual(r1, 6);

        int r2 = Basic.sub(3, 3);
        Assert.AreEqual(r2, 0);

        int r3 = Basic.mul(3, 3);
        Assert.AreEqual(r3, 9);

        int r4 = Basic.div(3, 3);
        Assert.AreEqual(r4, 1);
    }
}

The test method is annotated with the [Test] attribute. We use 
assertions to ensure the correct output.

$ dotnet test 
... 
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, ...

## C# NUnit skipping tests

Test methods can be skipped with [Ignore] attribute.

tests/ArithTest.cs
  

namespace Testing;

using NUnit.Framework;
using Arithmetic;

class ArithTest
{
    [Test]
    public void AddSub()
    {
        int r1 = Basic.add(3, 3);
        Assert.AreEqual(r1, 6);

        int r2 = Basic.sub(3, 3);
        Assert.AreEqual(r2, 0);
    }

    [Test]
    [Ignore("Ignoring")]
    public void MulDiv()
    {
        int r3 = Basic.mul(3, 3);
        Assert.AreEqual(r3, 9);

        int r4 = Basic.div(3, 3);
        Assert.AreEqual(r4, 1);
    }
}

We have two test methods. One of them is skipped using the [Ignore]
attribute.

## C# NUnit TestCase

With TestCase attribute, we can have parameterized test methods.

tests/ArithTest.cs
  

namespace Testing;

using NUnit.Framework;
using Arithmetic;

class ArithTest
{
    [TestCase(1, 2, 3)]
    [TestCase(2, 2, 4)]
    [TestCase(-1, 4, 3)]
    public void Add(int x, int y, int z)
    {
        int r = Basic.add(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCase(1, 2, -1)]
    [TestCase(2, 2, 0)]
    [TestCase(3, 2, 1)]
    public void Sub(int x, int y, int z)
    {
        int r = Basic.sub(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCase(9, 3, 27)]
    [TestCase(3, 3, 9)]
    [TestCase(-3, -3, 9)]
    public void Mul(int x, int y, int z)
    {
        int r = Basic.mul(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCase(9, 3, 3)]
    [TestCase(3, 3, 1)]
    [TestCase(8, 2, 4)]
    public void Div(int x, int y, int z)
    {
        int r = Basic.div(x, y);
        Assert.AreEqual(r, z);
    }
}

In this example, we test each method with three sets of values.

## C# NUnit TestCaseSource

The [TestCaseSource] attribute allows us to read the data for the 
parameterized test methods from different sources.

tests/ArithTest.cs
  

namespace Testing;

using NUnit.Framework;
using Arithmetic;

public class ArithTest
{
    [TestCaseSource(nameof(AddCases))]
    public void Add(int x, int y, int z)
    {
        int r = Basic.add(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCaseSource(nameof(SubCases))]
    public void Sub(int x, int y, int z)
    {
        int r = Basic.sub(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCaseSource(nameof(MulCases))]
    public void Mul(int x, int y, int z)
    {
        int r = Basic.mul(x, y);
        Assert.AreEqual(r, z);
    }

    [TestCaseSource(nameof(DivCases))]
    public void Div(int x, int y, int z)
    {
        int r = Basic.div(x, y);
        Assert.AreEqual(r, z);
    }

    static object[] AddCases =
    {
        new object[] { 1, 2, 3 },
        new object[] { 2, 2, 4 },
        new object[] { -1, 4, 3 }
    };
    
    static object[] SubCases =
    {
        new object[] { 1, 2, -1 },
        new object[] { 2, 2, 0 },
        new object[] { 3, 2, 1 }
    };

    static object[] MulCases =
    {
        new object[] { 9, 3, 27 },
        new object[] { 3, 3, 9 },
        new object[] { -3, -3, 9 }
    };

    static object[] DivCases =
    {
        new object[] { 9, 3, 3 },
        new object[] { 3, 3, 1 },
        new object[] { 8, 2, 4 }
    };
}

In this example, the values are placed in arrays.

## C# NUnit ExpectedResult

With ExpectedResult, we can simplify our test setup.

tests/ArithTest.cs
  

namespace Testing;

using NUnit.Framework;
using Arithmetic;

class ArithTest
{
    [TestCase(1, 2, ExpectedResult = 3)]
    [TestCase(2, 2, ExpectedResult = 4)]
    [TestCase(-1, 4, ExpectedResult = 3)]
    public int Add(int x, int y)
    {
        return Basic.add(x, y);
    }

    [TestCase(1, 2, ExpectedResult = -1)]
    [TestCase(2, 2, ExpectedResult = 0)]
    [TestCase(3, 2, ExpectedResult = 1)]
    public int Sub(int x, int y)
    {
        return Basic.sub(x, y);
    }

    [TestCase(9, 3, ExpectedResult = 27)]
    [TestCase(3, 3, ExpectedResult = 9)]
    [TestCase(-3, -3, ExpectedResult = 9)]
    public int Mul(int x, int y)
    {
        return Basic.mul(x, y);
    }

    [TestCase(9, 3, ExpectedResult = 3)]
    [TestCase(3, 3, ExpectedResult = 1)]
    [TestCase(8, 2, ExpectedResult = 4)]
    public int Div(int x, int y)
    {
        return Basic.div(x, y);
    }
}

With ExpectedResult, our code is shortened a bit.

## Placing tests in separate directory

In the following example, we show how to place tests in a separate directory.

$ mkdir Separate
$ cd Separate

We create a new directory.

$ dotnet new sln

We create a new empty solution.

$ mkdir PalindromeService PalindromeService.Tests

Two directories are created. 

$ cd PalindromeService
$ dotnet new classlib

We create a new library.

PalindromeService\PalindromeService.cs
  

namespace Palindrome.Services;
  
using System.Globalization;

public class PalindromeService
{
    public bool IsPalindrome(string word)
    {
        IEnumerable&lt;string&gt; GraphemeClusters(string s)
        {
            var enumerator = StringInfo.GetTextElementEnumerator(s);
            while (enumerator.MoveNext())
            {
                yield return (string)enumerator.Current;
            }
        }

        var reversed = string.Join("", GraphemeClusters(word).Reverse().ToArray());

        return reversed == word;
    }
}

The PalindromeService contains the IsPalindrome
method, which determines if a words is a palindrome. 

$ cd .. 
$ dotnet sln add PalindromeService\PalindromeService.csproj

We add the PalindromeService to the solution.

$ cd PalindromeService.Tests
$ dotnet add nunit
$ dotnet add reference ..\PalindromeService\PalindromeService.csproj

We go to the PalindromeService.Tests directory and add the
unit libraries add the reference to the
PalindromeService.

PalindromeService.Tests\PalindromeService.Tests.csproj
  

&lt;Project Sdk="Microsoft.NET.Sdk"&gt;

  &lt;PropertyGroup&gt;
    &lt;TargetFramework&gt;net6.0&lt;/TargetFramework&gt;
    &lt;Nullable&gt;enable&lt;/Nullable&gt;

    &lt;IsPackable&gt;false&lt;/IsPackable&gt;
  &lt;/PropertyGroup&gt;

  &lt;ItemGroup&gt;
    &lt;PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.1.0" /&gt;
    &lt;PackageReference Include="nunit" Version="3.13.3" /&gt;
    &lt;PackageReference Include="NUnit3TestAdapter" Version="4.2.1" /&gt;
    &lt;PackageReference Include="coverlet.collector" Version="3.1.0" /&gt;
  &lt;/ItemGroup&gt;

  &lt;ItemGroup&gt;
    &lt;ProjectReference Include="..\PalindromeService\PalindromeService.csproj" /&gt;
  &lt;/ItemGroup&gt;

&lt;/Project&gt;

This is how the project file looks like.

PalindromeService.Tests\Tests.cs
  

namespace Palindrome.Services.Tests;

using NUnit.Framework;

public class Tests
{
    private PalindromeService? _palindromeService;

    [SetUp]
    public void SetUp()
    {
        _palindromeService = new PalindromeService();
    }

    [TestCase("racecar")]
    [TestCase("nun")]
    [TestCase("level")]
    public void IsPalindrome(string word)
    {
        var r = _palindromeService!.IsPalindrome(word);
        Assert.AreEqual(r, true);
    }
}

We test the IsPalindrome method with three words. 

[SetUp]
public void SetUp()
{
    _palindromeService = new PalindromeService();
}

The [Setup] attribute is used to provide a common set of functions
that are performed just before each test method is called. In our case, we
create the PalindromeService.

$ cd ..
$ dotnet sln add PalindromeService.Tests\PalindromeService.Tests.csproj

We add the test project to the solution.

$ dotnet test

Finally, we can run the tests.

## Source

[Unit testing C# with NUnit and .NET Core](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-nunit)

In this article we have done unit testing in C# with NUnit library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).