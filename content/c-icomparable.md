+++
title = "C# IComparable"
date = 2025-08-27T23:23:08.824+01:00
draft = false
description = "C# IComparable tutorial shows how to compare values in C# with IComparable interface. The IComparable interface defines a generalized type-specific comparison method."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# IComparable

last modified January 22, 2024

 

In this article we show how to compare values in C# with
IComparable interface.

## C# IComparable interface

The IComparable interface defines a generalized type-specific 
comparison method that a value type or class implements to order or sort 
its instances.

The IComparable is implemented by types whose values can be ordered
or sorted. The interface requires the CompareTo method to be
implemented. The implemented method is automatically called by methods such
as Array.Sort and List.Sort.

The interface is used by types that the programmer has control over; in other 
words by code that he has written. If the code is provided by someone else, 
we use the IComparer interface instead.

## C# IComparable example

In the following example, we sort a list of employees.

Program.cs
  

List&lt;Employee&gt; employees =
[
    new ("John Doe", 1230),
    new ("Lucy Novak", 670),
    new ("Robin Brown",2300),
    new ("Joe Draker", 1190),
    new ("Janet Doe", 980)
];

employees.Sort();
employees.ForEach(Console.WriteLine);

Console.WriteLine("---------------------------");

employees.Reverse();
employees.ForEach(Console.WriteLine);

record Employee(string Name, int Salary) : IComparable&lt;Employee&gt;
{
    public int CompareTo(Employee? other)
    {
        if (other == null) return 1;
        // return other.Salary.CompareTo(Salary);
        if (Salary &lt; other.Salary)
        {
            return 1;
        }
        else if (Salary &gt; other.Salary)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }
}

In the example, we provide an implementation of the CompareTo
method of the Employee class. The class implements the 
IComparable interface.

public int CompareTo(Employee? other)
{
    if (other == null) return 1;
    // return other.Salary.CompareTo(Salary);
    if (Salary &lt; other.Salary)
    {
        return 1;
    }
    else if (Salary &gt; other.Salary)
    {
        return -1;
    }
    else
    {
        return 0;
    }
}

The implementation of the CompareTo method will sort the employees
by their salary.

if (other == null) return 1;

By common definition the current object is greater than
null.

employees.Sort();

We sort the list. The method takes the implemented CompareTo
method into account when sorting.

employees.Reverse();

We sort the list in reverse order.

$ dotnet run
Employee { Name = Robin Brown, Salary = 2300 }
Employee { Name = John Doe, Salary = 1230 }
Employee { Name = Joe Draker, Salary = 1190 }
Employee { Name = Janet Doe, Salary = 980 }
Employee { Name = Lucy Novak, Salary = 670 }
---------------------------
Employee { Name = Lucy Novak, Salary = 670 }
Employee { Name = Janet Doe, Salary = 980 }
Employee { Name = Joe Draker, Salary = 1190 }
Employee { Name = John Doe, Salary = 1230 }
Employee { Name = Robin Brown, Salary = 2300 }

## C# IComparable example II

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

Array.Sort(users);

foreach (var user in users)
{
    Console.WriteLine(user);
}

Console.WriteLine("------------------------------");

Array.Reverse(users);

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string Name, string Occupation) : IComparable&lt;User&gt;
{
    public int CompareTo(User? other)
    {
        if (other == null) return 1;
        return Occupation.CompareTo(other.Occupation);
    }
}

The example sorts an array of users in ascending and descending order.

public int CompareTo(User? other)
{
    if (other == null) return 1;
    return Occupation.CompareTo(other.Occupation);
}

The method sorts by the occupation.

Array.Sort(users);

We sort the users in ascending order. 

Array.Reverse(users);

We sort the users in descending order. 

$ dotnet run
User { Name = Lucy, Occupation = accountant }
User { Name = Robin, Occupation = bookseller }
User { Name = Andrew, Occupation = driver }
User { Name = John, Occupation = gardener }
User { Name = Janet, Occupation = teacher }
User { Name = John, Occupation = writer }
------------------------------
User { name = John, Occupation = writer }
User { name = Janet, Occupation = teacher }
User { name = John, Occupation = gardener }
User { name = Andrew, Occupation = driver }
User { name = Robin, Occupation = bookseller }
User { name = Lucy, Occupation = accountant }

## C# IComparable multiple fields

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

users.Sort();

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string Name, string Occupation) : IComparable&lt;User&gt;
{
    public int CompareTo(User? other)
    {
        if (other == null) return 1;
        int res = Occupation.CompareTo(other.Occupation);

        if (res == 0)
        {
            res = other.Name.CompareTo(Name);
        }

        return res;
    }
}

We have users with the same occupation. In such a case, we then compare their 
names.

public int CompareTo(User? other)
{
    if (other == null) return 1;
    int res = Occupation.CompareTo(other.Occupation);

    if (res == 0)
    {
        res = other.Name.CompareTo(Name);
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

[IComparable interface](https://learn.microsoft.com/en-us/dotnet/api/system.icomparable-1?view=net-8.0)

In this article we have used IComparable interface to sort data
in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).