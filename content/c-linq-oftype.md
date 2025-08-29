+++
title = "C# LINQ OfType"
date = 2025-08-27T23:23:15.695+01:00
draft = false
description = "C# LINQ OfType tutorial shows how to filter elements of enumerables by type using the OfType method."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ OfType

last modified July 5, 2023

 

In this article we show how to filter elements of enumerables by type using
LINQ's OfType method.

Language-Integrated Query (LINQ) is a domain-specific language for querying data
from various data sources, including arrays, lists, XML files, or databases.

public static IEnumerable&lt;TResult&gt; OfType&lt;TResult&gt; (this IEnumerable source);

The OfType method filters the elements of an
IEnumerable based on a specified type. The TResult
is the type to filter the elements of the sequence on. The source
is the sequence whose elements to filter.

## C# LINQ OfType example

The following is a simple example with LINQ's OfType method.

Program.cs
  

object[] vals = new object[] {
    "falcon", 12, "sky", "new", "34", 11
};

var res = vals.OfType&lt;int&gt;();

foreach(var e in res)
{
    Console.WriteLine(e);
}

Console.WriteLine("-----------------------");

var res2 = vals.OfType&lt;string&gt;();

foreach(var e in res2)
{
    Console.WriteLine(e);
}

We define an array of objects. In the array we have strings and integers. With
the help of the OfType method, we pick up integers and strings
separately.

var res = vals.OfType&lt;int&gt;();

foreach(var e in res)
{
    Console.WriteLine(e);
}

Here we filter all integers from the array. The type is specified between the 
angle brackets.

$ dotnet run
12
11
-----------------------
falcon
sky
new
34

## C# LINQ OfType example II

In the next example, we work with record types.

Program.cs
  

List&lt;Person&gt; persons = new List&lt;Person&gt; {
    new User("John Doe"), new Admin("Roger Roe"),
    new User("Peter Smith"), new User("Peter Novotny")
};

var res = from person in persons.OfType&lt;Admin&gt;()
          select person;

Console.WriteLine(string.Join(",", res));

Console.WriteLine("---------------------------");

var res2 = from person in persons.OfType&lt;User&gt;()
           select person;

Console.WriteLine(string.Join(",", res2));

interface Person { }
record User(string Name) : Person;
record Admin(string Name) : Person;

We define the Person interface and two record types:
User and Admin. With LINQ query expression, we
separate the admins and the users from the list of persons.

$ dotnet run
Admin { Name = Roger Roe }
---------------------------
User { Name = John Doe },User { Name = Peter Smith },User { Name = Peter Novotny }

## C# LINQ Cast

There is a similar Cast method. The method casts the elements of an
IEnumerable to the specified type. Unlike OfType, the 
Cast method throws InvalidCastExceptionif the element
in the sequence cannot be cast to the given type.

Program.cs
  

object[] vals = new object[] {
    "falcon", 12, "sky", "new", "34", 11
};

var res = vals.Cast&lt;string&gt;();

foreach(var e in res)
{
    Console.WriteLine(e);
}

We use the Cast method on an array of objects.

$ dotnet run
falcon
Unhandled exception. System.InvalidCastException: Unable to cast object of type 
'System.Int32' to type 'System.String'.
...

## Source

[Enumerable.OfType method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.oftype?view=net-8.0)

In this article we have presented the LINQ OfType method.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).