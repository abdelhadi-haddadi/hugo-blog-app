+++
title = "C# MSTest"
date = 2025-08-29T19:51:07.082+01:00
draft = false
description = "C# MSTest tutorial shows how to do unit testing in C# with MSTest framework. Unit testing is a software testing where individual units of a software are tested."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# MSTest

last modified July 5, 2023

 

C# MSTest tutorial shows how to do unit testing in C# with MSTest framework.

Unit testing is a software testing where individual units (components) of a
software are tested. The purpose of unit testing is to validate that each unit
of the software performs as designed. A unit is the smallest testable part of
any software. 

MSTest is a unit-testing library from Microsoft. It is available for all .NET
languages. There are other unit-testing libraries including XUnit and NUnit.

We can either place tests in the same project directory or inside a different
directory. We start with a simpler option and place tests in the same project
directory. In the end, we place tests in a different directory within a
solution.

$ dotnet add package Microsoft.NET.Test.Sdk
$ dotnet add package MSTest.TestAdapter
$ dotnet add package MSTest.TestFramework

In order to use MSTest, we need to add these three libraries.

## C# MSTest simple example

We start with a simple example.

Arith.cs
  

namespace Messages.Services;

public class Messages
{
    public static Func&lt;string&gt; msg1 = () =&gt; "Hello there!";
    public static Func&lt;string&gt; msg2 = () =&gt; "Good Morning!";
}

We test simple message functions.

We put our tests into the tests directory. MSTest automatically discovers our
tests.

tests/MessageTest.cs
  

namespace Messages.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Messages.Services;

[TestClass]
public class MessageTest
{
    private const string Expected1 = "Hello there!";
    private const string Expected2 = "Good Morning!";

    [TestMethod]
    public void Message1()
    {
        var m1 = Messages.msg1();

        Assert.AreEqual(Expected1, m1);
    }

    [TestMethod]
    public void Message2()
    {
        var m2 = Messages.msg2();

        Assert.AreEqual(Expected2, m2);
    }
}

The class is annotated with the [TestClass] attribute, the test
methods are annotated with the [TestMethod] attribute. We use
assertions to ensure the correct output.

$ dotnet test 
... 
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     2, Skipped:     0, Total:     2, ...

## C# MSTest parameterized tests

The [DataTestMethod] attribute indicates a parameterized method. 
The parameters are added with the [DataRow] attribute.

Arith.cs
  

namespace Arithmetic.Services;

public class Basic
{
    public static Func&lt;int, int, int&gt; add = (a, b) =&gt; a + b;
    public static Func&lt;int, int, int&gt; mul = (a, b) =&gt; a * b;
    public static Func&lt;int, int, int&gt; sub = (a, b) =&gt; a - b;
    public static Func&lt;int, int, int&gt; div = (a, b) =&gt; a / b;
}

We are going to test simple arithmetic functions. 

tests/ArithTest.cs
  

namespace Messages.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Arithmetic.Services;

[TestClass]
public class ArithTest
{
    [DataTestMethod]
    [DataRow(1, 2, 3)]
    [DataRow(2, 2, 4)]
    [DataRow(-1, 4, 3)]
    public void Add(int x, int y, int expected)
    {
        int r = Basic.add(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DataRow(1, 2, -1)]
    [DataRow(2, 2, 0)]
    [DataRow(3, 2, 1)]
    public void Sub(int x, int y, int expected)
    {
        int r = Basic.sub(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DataRow(9, 3, 27)]
    [DataRow(3, 3, 9)]
    [DataRow(-3, -3, 9)]
    public void Mul(int x, int y, int expected)
    {
        int r = Basic.mul(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DataRow(9, 3, 3)]
    [DataRow(3, 3, 1)]
    [DataRow(8, 2, 4)]
    public void Div(int x, int y, int expected)
    {
        int r = Basic.div(x, y);
        Assert.AreEqual(r, expected);
    }
}

In this example, we test each method with three sets of values.

[DataTestMethod]
[DataRow(1, 2, 3)]
[DataRow(2, 2, 4)]
[DataRow(-1, 4, 3)]
public void Add(int x, int y, int expected)
{
    int r = Basic.add(x, y);
    Assert.AreEqual(r, expected);
}

We are testing the Add method. The method is tested with three 
sets of values given by the [DataRow] attribute. The calculated 
and expected values are compared with Assert.AreEqual
assertion.

## C# MSTest skipping tests

Test methods can be skipped with [Ignore] attribute.

tests/ArithTest.cs
  

namespace Arithmetic.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Arithmetic.Services;

[TestClass]
public class ArithTest
{
    [DataRow(1, 2, 3)]
    [DataRow(2, 2, 4)]
    [DataRow(-1, 4, 3)]
    [DataTestMethod]
    public void Add(int x, int y, int z)
    {
        int r = Basic.add(x, y);
        Assert.AreEqual(r, z);
    }

    [DataTestMethod]
    [DataRow(1, 2, -1)]
    [DataRow(2, 2, 0)]
    [DataRow(3, 2, 1)]
    public void Sub(int x, int y, int z)
    {
        int r = Basic.sub(x, y);
        Assert.AreEqual(r, z);
    }

    [DataTestMethod]
    [DataRow(9, 3, 27)]
    [DataRow(3, 3, 9)]
    [DataRow(-3, -3, 9)]
    [Ignore]
    public void Mul(int x, int y, int z)
    {
        int r = Basic.mul(x, y);
        Assert.AreEqual(r, z);
    }

    [DataTestMethod]
    [DataRow(9, 3, 3)]
    [DataRow(3, 3, 1)]
    [DataRow(8, 2, 4)]
    [Ignore]
    public void Div(int x, int y, int z)
    {
        int r = Basic.div(x, y);
        Assert.AreEqual(r, z);
    }
}

We have four test methods. Two of them are skipped using the
[Ignore] attribute.

$ dotnet test
...
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.
  Skipped Mul (9,3,27)
  Skipped Mul (3,3,9)
  Skipped Mul (-3,-3,9)
  Skipped Div (9,3,3)
  Skipped Div (3,3,1)
  Skipped Div (8,2,4)

Passed!  - Failed:     0, Passed:     6, Skipped:     6, Total:    12, Duration: 84 ms ...

## C# MSTest DynamicData

With [DynamicData] attribute, we can externalize the test data into 
a method or a property.

tests/ArithTest.cs
  

namespace Messages.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using Arithmetic.Services;

[TestClass]
public class Tests
{
    [DataTestMethod]
    [DynamicData(nameof(AddData), DynamicDataSourceType.Method)]
    public void Add(int x, int y, int expected)
    {
        int r = Basic.add(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DynamicData(nameof(SubData), DynamicDataSourceType.Method)]
    public void Sub(int x, int y, int expected)
    {
        int r = Basic.sub(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DynamicData(nameof(MulData), DynamicDataSourceType.Method)]
    public void Mul(int x, int y, int expected)
    {
        int r = Basic.mul(x, y);
        Assert.AreEqual(r, expected);
    }

    [DataTestMethod]
    [DynamicData(nameof(DivData), DynamicDataSourceType.Method)]
    public void Div(int x, int y, int expected)
    {
        int r = Basic.div(x, y);
        Assert.AreEqual(r, expected);
    }

    private static IEnumerable&lt;object[]&gt; AddData()
    {
        return new[]
        {
            new object[] { 1, 2, 3 },
            new object[] { 2, 2, 4 },
            new object[] { -1, 4, 3 }
        };
    }

    private static IEnumerable&lt;object[]&gt; SubData()
    {
        return new[]
        {
            new object[] { 1, 2, -1 },
            new object[] { 2, 2, 0 },
            new object[] { 3, 2, 1 }
        };
    }

    private static IEnumerable&lt;object[]&gt; MulData()
    {
        return new[]
        {
            new object[] { 9, 3, 27 },
            new object[] { 3, 3, 9 },
            new object[] { -3, -3, 9 }
        };
    }

    private static IEnumerable&lt;object[]&gt; DivData()
    {
        return new[]
        {
            new object[] { 9, 3, 3 },
            new object[] { 3, 3, 1 },
            new object[] { 8, 2, 4 }
        };
    }
}

In the example, we have test data in separate methods. 

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
$ dotnet new mstest
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
    &lt;PackageReference Include="MSTest.TestAdapter" Version="2.2.8" /&gt;
    &lt;PackageReference Include="MSTest.TestFramework" Version="2.2.8" /&gt;
  &lt;/ItemGroup&gt;

  &lt;ItemGroup&gt;
    &lt;ProjectReference Include="..\PalindromeService\PalindromeService.csproj" /&gt;
  &lt;/ItemGroup&gt;
&lt;/Project&gt;

This is how the project file looks like.

PalindromeService.Tests\Tests.cs
  

namespace Palindrome.Services.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class Tests
{
    private PalindromeService? _palindromeService;

    [TestInitialize]
    public void SetUp()
    {
        _palindromeService = new PalindromeService();
    }

    [DataTestMethod]
    [DataRow("racecar")]
    [DataRow("level")]
    [DataRow("nun")]
    public void IsPalindrome(string word)
    {
        var r = _palindromeService!.IsPalindrome(word);
        Assert.AreEqual(r, true);
    }
}

We test the IsPalindrome method with three words. 

[TestInitialize]
public void SetUp()
{
    _palindromeService = new PalindromeService();
}

The [TestInitialize] attribute is used to provide a common set of
functions that are performed just before each test method is called. In our
case, we create the PalindromeService.

$ cd ..
$ dotnet sln add PalindromeService.Tests\PalindromeService.Tests.csproj

We add the test project to the solution.

$ dotnet test

Finally, we can run the tests.

## Source

[Unit testing C# with MSTest and .NET](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-mstest)

In this article we have done unit testing in C# with MSTest library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).