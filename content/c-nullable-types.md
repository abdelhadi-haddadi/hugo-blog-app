+++
title = "C# nullable types"
date = 2025-08-29T19:51:09.503+01:00
draft = false
description = "Master nullable types in C# with this detailed tutorial. Learn how to handle null values, work with nullable data types, and implement null safety effectively in your C# programs, with step-by-step examples for developers."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# nullable types

last modified April 30, 2025

 

This C# tutorial provides a comprehensive guide on working with nullable types,
explaining how to effectively handle null values within the language.

The *null* keyword represents a unique data type used to signify a
missing or non-existent value. When a null object reference is
dereferenced, a NullReferenceException is thrown. To minimize these
exceptions, significant advancements have been made in C# to enhance null
safety.

C# distinguishes between two fundamental data types: value
types and **reference types**. Value types, such as
integers and booleans, cannot hold a null value. Conversely,
reference types default to a null reference unless explicitly
initialized.

Over time, C# introduced a suite of features to manage null values more
effectively. The concept of null safety encompasses tools and
practices designed to reduce the likelihood of
NullReferenceException occurrences and make code safer and more
predictable.

Starting with C# 2.0, the language introduced *nullable value types*,
allowing value types to hold null values using the T?
syntax. This enhancement expanded the flexibility of value types in scenarios
where the absence of a value needed to be explicitly represented.

In C# 8.0, *nullable reference types* were introduced. With this feature,
developers can specify whether a reference type may hold a null
value or must always be non-null. The same T? syntax is used to
declare nullable reference types, enabling developers to express their intent
clearly and improve code safety.

## Nullable context

Nullable contexts enable fine-grained control for how the compiler interprets
reference type variables. Since .NET 6 null-state analysis and variable 
annotations are enabled by default in new projects. 

&lt;Project Sdk="Microsoft.NET.Sdk"&gt;

  &lt;PropertyGroup&gt;
    &lt;OutputType&gt;Exe&lt;/OutputType&gt;
    &lt;TargetFramework&gt;net6.0&lt;/TargetFramework&gt;
    &lt;ImplicitUsings&gt;enable&lt;/ImplicitUsings&gt;
    &lt;Nullable&gt;enable&lt;/Nullable&gt;
  &lt;/PropertyGroup&gt;

&lt;/Project&gt;

On a project level, the nullable context is set with the Nullable
tag.

#nullable enable

It is possible to scope nullable context to a C# file using a compiler
directive.

## C# Nullable Value Types

A nullable value type, denoted as T?, extends the functionality of
its underlying value type T by including an additional
null value. For example, a bool? variable can hold one
of three values: true, false, or null,
making it ideal for scenarios where the presence or absence of a value needs to
be explicitly represented.

The syntax T? is shorthand for the
System.Nullable&lt;T&gt; structure. This structure provides two
important members:

    HasValue: Indicates whether the current
    System.Nullable&lt;T&gt; contains a valid value of its
    underlying type.
    Value: Retrieves the value stored in the nullable type,
    throwing an exception if the value is null.

**Note:** Nullable value types are essential in scenarios where
external sources, such as databases or API calls, may return null
values. They help bridge the gap between missing data and strict type safety.

Nullable value types follow the same assignment rules as regular value types.
Local variables within methods must be initialized before use, ensuring
stability in code execution. However, fields in classes default to
null if they are not explicitly initialized.

## C# Nullable example

In the next example, we work with nullable value types.

Program.cs
  

Nullable&lt;int&gt; x = 0;
Console.WriteLine(x);

int? y = 0;
Console.WriteLine(y);

Console.WriteLine("-------------------------");

x = null;

if (x == null)
{
    Console.WriteLine("null value");
}

y = null;

if (y == null)
{
   Console.WriteLine("null value");
}

In the example, we create two nullable integer variables. First they are
initalized to zero, then they are assigned null.

$ dotnet run
0
0
-------------------------
null value
null value

## C# check for null

We can use the != and is not operators to check for
null values.

Program.cs
  

string?[] words = { "sky", "black", "rock", null, "rain", "cup" };

foreach (var word in words)
{
    if (word != null)
    {
        Console.WriteLine($"{word} has {word.Length} letters");
    }
}

Console.WriteLine("-------------------------");

foreach (var word in words)
{
    if (word is not null)
    {
        Console.WriteLine($"{word.ToUpper()}");
    }
}

We have a list of words. To prevent NullReferenceExceptions, we
ensure that each value is not null before calling the element's attribute or
method.

With HasValue attribute of Nullable, we check if the
current nullable element has a valid value of its underlying type.

Program.cs
  

int?[] vals = { 1, 2, 3, null, 4, 5 };

int sum = 0;

foreach (var e in vals)
{
    if (e.HasValue)
    {
        sum += e.Value;
    }
}

Console.WriteLine($"The sum is: {sum}");

In the example, wee calculate the sum of integer values.

if (e.HasValue)
{
    sum += e.Value;
}

We check if the element has some value with HasValue and unpack
the value via Value.

## C# null-conditional operator

A *null-conditional operator* applies a member access, ?.,
or element access, ?[], operation to its operand only if that
operand evaluates to non-null. If the operand evaluates to null,
the result of applying the operator is null.

Program.cs
  

var users = new List&lt;User&gt;
{
    new User("John Doe", "gardener"),
    new User(null, null),
    new User("Lucia Newton", "teacher")
};

users.ForEach(user =&gt; Console.WriteLine(user.Name?.ToUpper()));

record User(string? Name, string? Occupation);

In the example, we have a User record with two members: Name and
Occupation. We access the name member of the objects with the help
of the ?. operator.

users.ForEach(user =&gt; Console.WriteLine(user.Name?.ToUpper()));

We use the ?. to access the Name member and call the
ToUpper method. The ?. prevents the
System.NullReferenceException by not calling the
ToUpper on the null value.

The ?[] operator allows to place null values into a
collection.

Program.cs
  

int?[] vals = { 1, 2, 3, null, 4, 5 };

int i = 0;

while (i &lt; vals.Length)
{
    Console.WriteLine(vals[i]?.GetType());
    i++;
}

We have a null value in an array. We prevent the
System.NullReferenceException by applying the ?.
operator on the array elements.

## C# ArgumentNullException

The ArgumentNullException is thrown when a null reference is passed
to a method that does not accept it as a valid argument.

Program.cs
  

var words = new List&lt;string?&gt; { "falcon", null, "water", "war", "fly",
    "wood", "forest", "cloud", "wrath" };

foreach (var word in words)
{
    int n = 0;

    try
    {
        n = CountLtr(word, 'w');
        Console.WriteLine($"{word}: {n}");
    }
    catch (ArgumentNullException e)
    {
        Console.WriteLine($"{e.Message}");
    }
}

int CountLtr(string? word, char c)
{
    // if (word is null)
    // {
    //     throw new ArgumentNullException(nameof(word));
    // }

    ArgumentNullException.ThrowIfNull(word);

    return word.Count(e =&gt; e.Equals(c));
}

In the example, we throw and catch ArgumentNullException.

$ dotnet run 
falcon: 0
Value cannot be null. (Parameter 'word')
water: 1
war: 1
fly: 0
wood: 1
forest: 0
cloud: 0
wrath: 1

## C# null-forgiving operator

In the enabled nullable context, the null-forgiving operator (!) supresses the
compiler warnings. The operator has no effect at run time. It only affects the
compiler's static flow analysis.

The following example uses the Playwright library; check the 
[Playwright tutorial](/csharp/playwright/) for more information.

Program.cs
  

using Microsoft.Playwright;
using System.Text;

using var pw = await Playwright.CreateAsync();
await using var browser = await pw.Chromium.LaunchAsync();

var page = await browser.NewPageAsync();

var ehds = new Dictionary&lt;string, string&gt;{ {"User-Agent", "C# program" } };
await page.SetExtraHTTPHeadersAsync(ehds);

var resp = await page.GotoAsync("http://webcode.me/ua.php");
var body = await resp!.BodyAsync();

Console.WriteLine(Encoding.UTF8.GetString(body));

In the example, we request a resource which returns a response containing the 
user aget used. 

var resp = await page.GotoAsync("http://webcode.me/ua.php");
var body = await resp!.BodyAsync();

The response may be null when the website is down our we have connection issues.
But we explicitly showed the intent not to worry about this. 

## C# null-coalescing operator

The null-coalescing operator ?? returns the value of its left-hand
operand if it isn't null; otherwise, it evaluates the right-hand operand and
returns its result.

Program.cs
  

var words = new List&lt;string?&gt; { "work", "falcon", null, "cloud", "forest" };

foreach (var word in words)
{
    var e = word ?? "null value";
    Console.WriteLine(e);
}

We use the ?? operator to print "null value" instead of the default
empty string.

## C# null-coalescing assignment operator

The null-coalescing assignment operator ??= assigns the value of
its right-hand operand to its left-hand operand only if the left-hand operand
evaluates to null.

Program.cs
  

List&lt;int&gt;? vals = null;

vals ??= new List&lt;int&gt; { 1, 2, 3, 4, 5 };

// if (vals == null)
// {
//     vals = new List&lt;int&gt; { 1, 2, 3, 4, 5 };
// }

vals.Add(6);
vals.Add(7);
vals.Add(8);

Console.WriteLine(string.Join(", ", vals));

vals ??= new List&lt;int&gt; { 1, 2, 3, 4, 5 };

Console.WriteLine(string.Join(", ", vals));

We use the null-coalescing assignment operator on a list of integer values.
The equivalent code without using the operator is commented out.

List&lt;int&gt;? vals = null;

First, the list is assigned to null.

vals ??= new List&lt;int&gt; { 1, 2, 3, 4, 5 };

We use the ??= to assign a new list object to the variable. Since
it is null, the list is assigned.

vals.Add(6);
vals.Add(7);
vals.Add(8);

Console.WriteLine(string.Join(", ", vals));

We add three values to the list and print its contents.

vals ??= new List&lt;int&gt; { 1, 2, 3, 4, 5 };

We try to assign a new list object to the variable. Since the variable
is not null anymore, the list is not assigned.

$ dotnet run
1, 2, 3, 4, 5, 6, 7, 8
1, 2, 3, 4, 5, 6, 7, 8

## C# string.IsNullOrWhiteSpace

The IsNullOrWhiteSpace method indicates whether a specified string
is null, empty, or consists only of white-space characters.

Program.cs
  

var words = new List&lt;string?&gt; { "\t", "falcon", "  ", null, "\n", "cloud", "" };

for (int i = 0; i &lt; words.Count; i++)
{
    var e = words[i];

    if (string.IsNullOrWhiteSpace(e))
    {
        Console.WriteLine($"{i}: null or white space");
    } else
    {
        Console.WriteLine($"{i}: {e}");
    }
}

In the example, we use the IsNullOrWhiteSpace method on a list of
nullable string elements.

$ dotnet run
0: null or white space
1: falcon
2: null or white space
3: null or white space
4: null or white space
5: cloud
6: null or white space

## C# string.IsNullOrEmpty

The IsNullOrEmpty method indicates whether the specified string is
null or an empty string ("").

Program.cs
  

var words = new List&lt;string?&gt; { "\t", "falcon", "  ", null, "\n", "cloud", "" };

for (int i = 0; i &lt; words.Count; i++)
{
    var e = words[i];

    if (string.IsNullOrEmpty(e))
    {
        Console.WriteLine($"{i}: null or empty");
    } else
    {
        Console.WriteLine($"{i}: {e}");
    }
}

In the example, we use the IsNullOrEmpty method on a list of
nullable string elements.

$ dotnet run
0:
1: falcon
2:
3: null or empty
4:

5: cloud
6: null or empty

## Source

[Nullable value types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types)

In this article we have worked with nullable types in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).