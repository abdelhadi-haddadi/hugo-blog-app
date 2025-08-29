+++
title = "C# IComparer"
date = 2025-08-27T23:23:09.949+01:00
draft = false
description = "C# IComparer tutorial shows how to compare values in C# with IComparer interface. IComparer defines a method that a type implements to compare two objects."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# IComparer

last modified January 22, 2024

 

In this article we show how to compare values in C# with IComparer interface.

Unlike simple types such as numbers and latin strings, more complex types do not
have an intrinsic ordering. We have to define the ordering ourselves. In C#, we
can use for this task the Comparison delegate, the
IComparer, and IComparable interfaces, or LINQ.

## C# IComparer interface

The IComparer interface defines a comparison method that a value
type or class implements to order or sort its instances.

This interface is used with the List.Sort and
List.BinarySearch methods. It provides a way to customize the sort
order of a collection. SortedDictionary and SortedList
are among the classes that implement this interface.

Compare(T, T)

The Compare method compares two objects and returns a value
indicating whether one is less than, equal to, or greater than the other.

The interface is used by types that we do not have control over; in other words
by code that we have not written. If the code is developed by ourselves, we can
use the IComparable interface instead.

With IComparer we have more flexibility; we can define multiple 
comparers or update existing ones without touching the type itself. Also, it has 
a more clean design, since we separate the sorting implementation from the 
type.

## C# IComparer example

In the following example, we sort a list of employees.

Program.cs
  

var employees = new List&lt;(string, int)&gt; 
{
    ("John Doe", 1230),
    ("Adam Novak", 670),
    ("Robin Brown", 2300),
    ("Rowan Cruise", 990),
    ("Joe Draker", 1190),
    ("Janet Doe", 980),
    ("Lucy Smith", 980),
    ("Thomas Moore", 1400)
};

employees.Sort(new SalaryComparer());
employees.ForEach(employee =&gt; Console.WriteLine(employee));

class SalaryComparer : IComparer&lt;(string, int)&gt; 
{
    public int Compare((string, int) emp1, (string, int) emp2) 
    {
        return emp1.Item2.CompareTo(emp2.Item2);
    }
}

In the example, we provide an implementation of the Compare
in the SalaryComparer. We create objects with value types.

public int Compare((string, int) emp1, (string, int) emp2) 
{
    return emp1.Item2.CompareTo(emp2.Item2);
}

The implementation of the Compare method sorts the employees by
their salary.

employees.Sort(new SalaryComparer());

We sort the list. The method takes the implemented Compare
method into account when sorting.

$ dotnet run
(Adam Novak, 670)
(Janet Doe, 980)
(Lucy Smith, 980)
(Rowan Cruise, 990)
(Joe Draker, 1190)
(John Doe, 1230)
(Thomas Moore, 1400)
(Robin Brown, 2300)

## C# IComparer example II

In the following example, we sort an array of users.

Program.cs
  

User[] users =
[
    new ("Robin", "bookseller"),
    new ("John", "gardener"),
    new ("John", "writer"),
    new ("Janet", "teacher"),
    new ("Andrew", "driver"),
    new ("Lucy", "accountant")
];

Array.Sort(users, new OccupationComparer());

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string Name, string Occupation);

class OccupationComparer : IComparer&lt;User&gt;
{
    public int Compare(User? u1, User? u2)
    {
        if (u1 == null &amp;&amp; u2 == null) return 0;
        if (u1 == null) return -1;
        if (u2 == null) return 1;
        return u1.Occupation.CompareTo(u2.Occupation);
    }
}

The example sorts an array of users in ascending order. To create objects, 
we use records.

public int Compare(User? u1, User? u2)
{
    if (u1 == null &amp;&amp; u2 == null) return 0;
    if (u1 == null) return -1;
    if (u2 == null) return 1;
    return u1.Occupation.CompareTo(u2.Occupation);
}

The method sorts by the occupation. By definition, non-null objects are greater 
than nulls. 

Array.Sort(users, new OccupationComparer());

We pass the comparer to the Array.Sort method.

$ dotnet run
User { Name = Lucy, Occupation = accountant }
User { Name = Robin, Occupation = bookseller }
User { Name = Andrew, Occupation = driver }
User { Name = John, Occupation = gardener }
User { Name = Janet, Occupation = teacher }
User { Name = John, Occupation = writer }

## C# StringComparer

StringComparer is a built-in comparer for comparing strings. It
represents a string comparison operation that uses specific case and
culture-based or ordinal comparison rules.

Program.cs
  

List&lt;string&gt; words =
[
    "sky", "blue", "Church", "cup", "Adam", "also", "Bratislava", "bear", "snow",
    "carpet", "water", "volcano", "smell", "forest", "Earth"
];

words.Sort(StringComparer.Ordinal);
Console.WriteLine(string.Join(", ", words));

Console.WriteLine("---------------------");

words.Sort(StringComparer.OrdinalIgnoreCase);
Console.WriteLine(string.Join(", ", words));

A list of words is compared with StringComparer using 
Ordinal and OrdinalIgnoreCase rules.

$ dotnet run
Adam, Bratislava, Church, Earth, also, bear, blue, carpet, cup, forest, sky, ...
---------------------
Adam, also, bear, blue, Bratislava, carpet, Church, cup, Earth, forest, sky, ...

## C# LINQ Order with IComparer

The LINQ's Order and OrderDescending have overloaded 
variants which take the IComparer as a parameter.

Program.cs
  

List&lt;string&gt; words = [
    "world", "War", "abbot", "Caesar", "castle", "sky", "den",
    "forest", "ocean", "water", "falcon", "owl", "rain", "Earth"
];

var sorted = words.Order(StringComparer.OrdinalIgnoreCase).ToList();
sorted.ForEach(Console.WriteLine);

Console.WriteLine("-------------------------");

var sorted2 = words.OrderDescending(StringComparer.OrdinalIgnoreCase).ToList();
sorted2.ForEach(Console.WriteLine);

In the program, we sort a list of words with Order and
OrderDescending. We pass the
StringComparer.OrdinalIgnoreCase to the methods.

$ dotnet run
world
water
War
sky
rain
owl
ocean
forest
falcon
Earth
den
castle
Caesar
abbot
-------------------------
abbot
Caesar
castle
den
Earth
falcon
forest
ocean
owl
rain
sky
War
water
world

## C# IComparer multiple fields

In the following example, we compare by two fields. 

Program.cs
  

List&lt;User&gt; users =
[
    new ("Robin", "bookseller"),
    new ("Simon", "teacher"),
    new ("Arnold", "teacher"),
    new ("John", "gardener"),
    new ("Adam", "gardener"),
    new ("Peter", "gardener"),
    new ("John", "writer"),
    new ("Janet", "teacher"),
    new ("Andrew", "driver"),
    new ("Lucy", "accountant"),
    new ("Michael", "teacher")
];

users.Sort(new OccupationNameReverseComparer());

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string Name, string Occupation);

class OccupationNameReverseComparer : IComparer&lt;User&gt;
{
    public int Compare(User? u1, User? u2)
    {
        if (u1 == null &amp;&amp; u2 == null) return 0;
        if (u1 == null) return -1;
        if (u2 == null) return 1;

        int res = u1.Occupation.CompareTo(u2.Occupation);

        if (res == 0)
        {
            res = u2.Name.CompareTo(u1.Name);
        }

        return res;
    }
}

We have users with the same occupation. In such a case, we then compare their 
names.

public int Compare(User? u1, User? u2)
{
    if (u1 == null &amp;&amp; u2 == null) return 0;
    if (u1 == null) return -1;
    if (u2 == null) return 1;

    int res = u1.Occupation.CompareTo(u2.Occupation);

    if (res == 0)
    {
        res = u2.Name.CompareTo(u1.Name);
    }

    return res;
}

First, we compare users by their Occupation fields. If they are 
equal, we compare their Name fields. The way we compare the names 
result in descending sorting order.

$ dotnet run 
User { Name = Lucy, Occupation = accountant }
User { Name = Robin, Occupation = bookseller }
User { Name = Andrew, Occupation = driver }
User { Name = Peter, Occupation = gardener }
User { Name = John, Occupation = gardener }
User { Name = Adam, Occupation = gardener }
User { Name = Simon, Occupation = teacher }
User { Name = Michael, Occupation = teacher }
User { Name = Janet, Occupation = teacher }
User { Name = Arnold, Occupation = teacher }
User { Name = John, Occupation = writer }

## Source

[IComparer interface](https://learn.microsoft.com/en-us/dotnet/api/system.collections.icomparer?view=net-8.0)

In this article we have used IComparer interface to sort data
in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).