+++
title = "C# List"
date = 2025-08-27T23:23:17.954+01:00
draft = false
description = "Learn how to work with the List collection in
C#. This tutorial covers List manipulation, indexing, sorting, searching, and
common operations for handling data efficiently using .NET collections."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List

last modified May 14, 2025

 

This article provides a comprehensive guide on working with the
List collection in C#. Learn how to efficiently store, manage, and
manipulate dynamic lists in your applications.

## C# List

The List class in C# represents a strongly typed, resizable
collection of objects that can be accessed via index. It offers powerful methods
for searching, sorting, filtering, and modifying list elements dynamically,
making it an essential tool for handling structured data.

Key Features of the List class:

    **Dynamic Sizing:** Lists automatically expand when new
    elements are added and contract when elements are removed.
    **Index-Based Access:** Elements can be accessed directly
    using zero-based indexing.
    **Generic Type Support:** Lists are strongly typed using
    generics, ensuring type safety.
    **Versatile Methods:** Built-in methods simplify common
    operations such as sorting, searching, filtering, and modifying
    elements.
    **Efficient Performance:** Optimized for fast insertion,
    deletion, and iteration compared to arrays in certain scenarios.

### Common Methods and Operations

The List class provides a variety of methods for manipulating lists. 
Here are some of the most commonly used methods:

    
        
            Method
            Description
        
    
    
        
            Add(T item)
            Adds an element to the end of the list.
        
        
            Insert(int index, T item)
            Inserts an element at a specified index.
        
        
            Remove(T item)
            Removes the first occurrence of a specified item.
        
        
            RemoveAt(int index)
            Removes an element at a specified index.
        
        
            Contains(T item)
            Checks if an element exists in the list.
        
        
            IndexOf(T item)
            Gets the index of the first occurrence of a specified item.
        
        
            Sort
            Sorts the list in ascending order.
        
        
            Reverse
            Reverses the order of the list.
        
        
            Clear
            Removes all elements from the list.
        
        
            Count
            Returns the number of elements in the list.
        
    

These methods make the List class a versatile data structure for
handling dynamic collections in C#. Whether you need to add, remove, or reorder
elements, these built-in functionalities provide an efficient way to manage
lists without manual memory allocation or complex operations. 

## C# List initializer

C# lists can be initialized with literal notation. The elements
are added on the right side of the assignment inside {}
brackets.

Program.cs
  

var words = new List&lt;string&gt; { "forest", "oak", "river", "falcon" };
Console.WriteLine(string.Join(", ", words));

In the example, we create a list of strings with list initializer.

var words = new List&lt;string&gt;{"forest", "oak", "river", "falcon"};

A new list is created. Between the angle brackets (&lt;&gt;),
we specify the data type of the list elements.

Console.WriteLine(string.Join(", ", words));

To get a quick look at the contents of the list, we join all the values into
a string, separated by comma.

$ dotnet run
forest, oak, river, falcon

## C# List collection expression

.NET 8 introduced a terse syntax to create and initialize a list.

Program.cs
  

List&lt;string&gt; words = ["forest", "oak", "river", "falcon"];
Console.WriteLine(string.Join(", ", words));

The elements of the list are placed inside a pair of square brackets 
([]). This syntax is shared by many programming languages. 

## C# List count elements

With the Count property, we get the number of elements in the list.

Program.cs
  

List&lt;int&gt; vals = [0, 1, 2, 3, 4, 5];
Console.WriteLine($"There are {vals.Count} elements in the list");

The example counts the number of elements in the list.

Console.WriteLine($"There are {vals.Count} elements in the list");

Here we print the number of elements in the List.

$ dotnet run
There are 6 elements in the list

## C# List access elements

Elements of a list can be accessed using the index notation [].
The index is zero-based.

Program.cs
  

List&lt;int&gt; vals = [0, 1, 2, 3, 4, 5];

Console.WriteLine(vals[0]);
Console.WriteLine(vals[1]);

Console.WriteLine(vals.Count - 1);

Console.WriteLine(vals[^1]);
Console.WriteLine(vals[^2]);

The example prints the first, second, and the last element of the list.

Console.WriteLine(vals.Count - 1);

To get the last element of the list, we count the number of elements and divide
one.

Console.WriteLine(vals[^1]);
Console.WriteLine(vals[^2]);

With the ^ operator, we can access elements from the end of the
list.

$ dotnet run
0
1
5
5
4

## C# List add elements

The Add method adds an element at the end of the list. The
AddRange methods adds the elements of the specified collection to
the end of the list.

Program.cs
  

List&lt;string&gt; words = ["forest", "oak", "river", "falcon"];

words.Add("sky");
words.Add("ocean");

string[] words2 = ["owl", "hawk"];
words.AddRange(words2);

Console.WriteLine(string.Join(',', words));

The example creates two lists and adds new elements to it.

words.Add("sky");
words.Add("ocean");

Two elements are added to the list with Add.

string[] words2 = ["owl", "hawk"];
words.AddRange(words2);

With AddRange method, we add another collection to the list.

$ dotnet run
forest,oak,river,falcon,sky,ocean,owl,hawk

## C# List insert elements

The Insert method inserts an element into the list at the specified
index. The InsertRange inserts the elements of a collection into
the list at the specified index.

Program.cs
  

List&lt;string&gt; words = ["forest", "oak", "river", "falcon"];

words.Insert(0, "sky");
words.Insert(words.Count, "cloud");

List&lt;string&gt; words2 =["water", "wave"];
words.InsertRange(2, words2);

Console.WriteLine(string.Join(", ", words));

The example creates a new list of words and inserts new elements to it.

$ dotnet run
sky, forest, water, wave, oak, river, falcon, cloud

## C# List Contains

The Contains method determines whether the element is in the list.

Program.cs
  

List&lt;string&gt; words =  ["forest", "oak", "river", "falcon"];

if (words.Contains("oak"))
{
    Console.WriteLine("The list contains the oak word");
}

In the example, we check if the oak word is in the list.

## C# List removing elements

The Remove, RemoveAt, RemoveAll,
RemoveRange, and Clear methods can be used to remove
elements from a list.

Program.cs
  

List&lt;int&gt; nums = [0, 1, 2, -3, 4, -5, 6, 7, -8, 9, 10];

nums.RemoveAll(e =&gt; e &lt; 0);
Console.WriteLine(string.Join(", ", nums));

nums.Remove(0);
nums.RemoveAt(nums.Count - 1);

Console.WriteLine(string.Join(", ", nums));

nums.RemoveRange(0, 3);

Console.WriteLine(string.Join(", ", nums));

nums.Clear();
Console.WriteLine("{0}", nums.Count);

In the example, we remove elements from the list of integers.

nums.RemoveAll(e =&gt; e &lt; 0);
Console.WriteLine(string.Join(", ", nums));

With RemoveAll method, we remove all elements that satisfy the
given predicate; in our case, we remove all negative values.

nums.Remove(0);

The Remove method removes the first occurrence of the 0 value.

nums.RemoveAt(nums.Count - 1);

With RemoveAt, we remove the element at the given index.

nums.RemoveRange(0, 3);

The RemoveRange method removes the given range of values from the
list. The parameters are the zero-based starting index of the range of elements
to remove and the number of elements to remove.

## C# List ToArray

The ToArray method copies the elements of a list into an array.

Program.cs
  

List&lt;int&gt; nums = [1, 2, 3, 4];

Console.WriteLine(nums.GetType());

var nums2 = nums.ToArray();
Console.WriteLine(nums2.GetType());

In the example, we create an array from a list. We print the type of both
containers with GetType.

$ dotnet run
System.Collections.Generic.List`1[System.Int32]
System.Int32[]

## C# List ForEach

The ForEach method performs the specified action on each element
of a list.

Program.cs
  

List&lt;string&gt; words = ["forest", "oak", "river", "falcon"];

words.ForEach(Console.WriteLine);
words.ForEach(word =&gt; Console.WriteLine(word.ToUpper()));

We call the ForEach method twice on a list of words.

words.ForEach(Console.WriteLine);

We print all elements of the list.

words.ForEach(word =&gt; Console.WriteLine(word.ToUpper()));

Here we also print all elements of the list; the words are transformed to
uppercase.

$ dotnet run
forest
oak
river
falcon
FOREST
OAK
RIVER
FALCON

## C# loop List

There are several ways to loop over a C# list.

Program.cs
  

List&lt;int&gt; nums = [1, 2, 3, 4];

nums.ForEach(e =&gt; Console.WriteLine(e));

Console.WriteLine("********************");

foreach (int e in nums)
{

    Console.WriteLine(e);
}

Console.WriteLine("********************");

for (int i = 0; i &lt; nums.Count; i++)
{

    Console.WriteLine(nums[i]);
}

The example shows three ways of looping over a list in C#.

nums.ForEach(e =&gt; Console.WriteLine(e));

We loop over a list with ForEach.

foreach(int e in nums)
{
    Console.WriteLine(e);
}

In this case, we use the foreach statement.

for (int i = 0; i &lt; nums.Count; i++)
{
    Console.WriteLine(nums[i]);
}

Finally, this is the classic for loop.

$ dotnet run
1
2
3
4
********************
1
2
3
4
********************
1
2
3
4

## C# sort, reverse List

The Sort method sorts the elements of a list, the
Reverse method reverses the elements of the list.

Program.cs
  

List&lt;int&gt; nums = [2, 1, 5, 4, 3];

nums.Reverse();
Console.WriteLine(string.Join(',', nums));

nums.Sort();
Console.WriteLine(string.Join(',', nums));

The example reverses the elements of the list of integers and then sorts them.

$ dotnet run
3,4,5,1,2
1,2,3,4,5

## C# List FindAll

The FindAll method retrieves all the elements of a list that match
the conditions defined by the specified predicate. It returns a list containing
all the elements that match the conditions defined by the specified predicate,
if found; otherwise, an empty list.

A predicate is a method that returns a boolean value. To learn more about
predicates, visit the [C# Predicate tutorial](/csharp/predicate/).

Program.cs
  

List&lt;int&gt; vals = [-1, -3, 0, 1, 3, 2, 9, -4];
List&lt;int&gt; filtered = vals.FindAll(e =&gt; e &gt; 0);

Console.WriteLine(string.Join(',', filtered));

The example finds all positive elements.

List&lt;int&gt; filtered = vals.FindAll(e =&gt; e &gt; 0);

The predicate is an expression that returns true for values greater than zero.

$ dotnet run
1,3,2,9

These are the positive values of the list.

## C# List Find, FindLast, FindIndex, FindLastIndex

The Find method returns the first occurrence of the element that
matches the given predicate. The FindLast method  returns the last
occurrence of the element that matches the given predicate.

The FindIndex method returns the index of the first occurrence of
the element that matches the given predicate. The FindLastIndex
method returns the index of the last occurrence of the element that matches the
given predicate.

Program.cs
  

List&lt;int&gt; nums = [6, -2, 1, 5, 4, 3, 2, 9, -1, 7];

var found = nums.Find(e =&gt; e &lt; 0);
Console.WriteLine(found);

var found2 = nums.FindIndex(e =&gt; e &lt; 0);
Console.WriteLine(found2);

var found3 = nums.FindLast(e =&gt; e &lt; 0);
Console.WriteLine(found3);

var found4 = nums.FindLastIndex(e =&gt; e &lt; 0);
Console.WriteLine(found4);

The example uses all the mentioned methods to find elements and indexes.

$ dotnet run
-2
1
-1
8

## C# List ConvertAll

The ConvertAll method converts the elements in the current List to
another type, and returns a list containing the converted elements.

Program.cs
  

List&lt;string&gt; words = ["falcon", "owl", "sky", "hawk", "stork"];

List&lt;string&gt; uppedWords = words.ConvertAll(s =&gt; s.ToUpper());
List&lt;int&gt; lengths = words.ConvertAll(s =&gt; s.Length);

Console.WriteLine(string.Join(", ", uppedWords));
Console.WriteLine(string.Join(", ", lengths));

In the example, we have a list of words. We convert the list to two other lists.

List&lt;string&gt; uppedWords = words.ConvertAll(s =&gt; s.ToUpper());

Here we convert the list to a list containing words transformed into uppercase.

List&lt;int&gt; lengths = words.ConvertAll(s =&gt; s.Length);

In the second case, the converted list contains integers that are the length of
the words in the original list.

$ dotnet run
FALCON, OWL, SKY, HAWK, STORK
6, 3, 3, 4, 5

In the second example, we have a separate squareRoot method, which
is applied on the list of integers.

Program.cs
  

double squareRoot(int x)
{
    return Math.Sqrt(x);
}

List&lt;int&gt; vals = [1, 4, 9, 16, 25];

Converter&lt;int, double&gt; converter = squareRoot;
List&lt;double&gt; vals2 = vals.ConvertAll(converter);

Console.WriteLine(string.Join(", ", vals2));

In the example, we create a new list by applying square root operation on the
list of integers.

$ dotnet run
1, 2, 3, 4, 5

## C# List shuffle

The following example randomly rebuilds a list of integer values.

Program.cs
  

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6, 7, 8];
vals.Shuffle();

var res = string.Join(" ", vals);
Console.WriteLine(res);

static class MyExtensions
{
    private static readonly Random rng = new();

    public static void Shuffle&lt;T&gt;(this IList&lt;T&gt; vals)
    {
        int n = vals.Count;

        while (n &gt; 1)
        {
            n--;
            int k = rng.Next(n + 1);

            (vals[n], vals[k]) = (vals[k], vals[n]);
        }
    }
}

In the example, we create a Shuffle extension method. It shuffles 
the elements in-place.

public static void Shuffle&lt;T&gt;(this IList&lt;T&gt; vals)
{
    int n = vals.Count;

    while (n &gt; 1)
    {
        n--;
        int k = rng.Next(n + 1);

        (vals[n], vals[k]) = (vals[k], vals[n]);
    }
}

This is an implementation of the Fisher-Yates shuffling algorithm.

$ dotnet run
7 1 5 6 4 2 3 8
$ dotnet run
7 5 4 1 2 3 6 8
$ dotnet run
2 3 8 5 1 4 7 6
$ dotnet run
4 5 1 6 8 2 3 7

## C# List TrueForAll

The TrueForAll determines whether every element in the list
matches the conditions defined by the given predicate.

Program.cs
  

List&lt;int&gt; nums = [1, 2, 3, 4, 5, 6, 7, 8];

var res1 = nums.TrueForAll(e =&gt; e % 2 == 0);
Console.WriteLine(res1);

var res2 = nums.TrueForAll(e =&gt; e &gt; 0);
Console.WriteLine(res2);

In the example, we check if the elements in the list are all even and that they
are all positive.

$ dotnet run
False
True

Not all elements are even and all elements are positive.

## LINQ

Language-Integrated Query (LINQ) is the name for a set of
technologies based on the integration of query capabilities directly into the C#
language.

Via LINQ, C# exposes plenty of methods for working with List data.

## C# List aggregate calculations

LINQ has extension methods to calculate aggregate calculations, such as min,
max, or sum. 

Program.cs
  

List&lt;int&gt; vals = [-1, 2, 1, -3, 7, -9, 5, 9, -4, 8];

var n1 = vals.Count;
Console.WriteLine($"There are {n1} elements");

var n2 = vals.Count(e =&gt; e % 2 == 0);
Console.WriteLine($"There are {n2} even elements");

var sum = vals.Sum();
Console.WriteLine($"The sum of all values is: {sum}");

var s2 = vals.Sum(e =&gt; e &gt; 0 ? e : 0);
Console.WriteLine($"The sum of all positive values is: {s2}");

var avg = vals.Average();
Console.WriteLine($"The average of values is: {avg}");

var max = vals.Max();
Console.WriteLine($"The maximum value is: {max}");

var min = vals.Min();
Console.WriteLine($"The minimum value is: {min}");

In the program, we use the Count, Sum, Average, Max, and Min methods. 

$ dotnet run
There are 10 elements
There are 3 even elements
The sum of all values is: 15
The sum of all positive values is: 32
The average of values is: 1.5
The maximum value is: 9
The minimum value is: -9

## C# List ordering

To order data, we can use the OrderBy and ThenBy
extension methods. Note that the methods create a new modified list; the
original list is not changed.

Program.cs
  

List&lt;User&gt; users =
[
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
];

Console.WriteLine("sort ascending by last name and salary");

var sortedUsers = users.OrderBy(u =&gt; u.LastName).ThenBy(u =&gt; u.Salary);

foreach (var user in sortedUsers)
{
    Console.WriteLine(user);
}

Console.WriteLine("---------------------");

Console.WriteLine("sort descending by last name and salary");

var sortedUsers2 = users.OrderByDescending(u =&gt; u.LastName)
    .ThenByDescending(u =&gt; u.Salary);

foreach (var user in sortedUsers2)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, int Salary);

We have a list of users. The users are sorted first by their last names, then by
their salaries.

var sortedUsers = users.OrderBy(u =&gt; u.LastName).ThenBy(u =&gt; u.Salary);

We sort the users by their last names and then by their salaries in ascending
order. 

var sortedUsers2 = users.OrderByDescending(u =&gt; u.LastName)
    .ThenByDescending(u =&gt; u.Salary);

Here, we sort the users by their last names and then by their salaries in
descending order. 

$ dotnet run
sort ascending by last name and salary
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
---------------------
sort descending by last name and salary
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }

## C# List remove duplicates with Distinct

The Distinct method removes duplicate elements from a list.

Program.cs
  

List&lt;int&gt; nums = [1, 2, 2, 3, 4, 4, 5];

var unique = nums.Distinct().ToList();
Console.WriteLine(string.Join(", ", unique));

This example removes duplicate elements from a list using the Distinct
method from LINQ. The resulting list contains only unique values from the original
list.

## C# List capacity and TrimExcess

The Capacity property gets or sets the number of elements that the
List can contain. The TrimExcess method sets the
capacity to the actual number of elements in the list, if that number is less
than 90% of current capacity.

Program.cs
  

List&lt;int&gt; vals = new List&lt;int&gt;(100);
Console.WriteLine($"Initial capacity: {vals.Capacity}");

vals.AddRange([1, 2, 3, 4, 5]);
Console.WriteLine($"Count: {vals.Count}");
vals.TrimExcess();
Console.WriteLine($"Trimmed capacity: {vals.Capacity}");

This example shows how to check and set the capacity of a list. The
TrimExcess method reduces the capacity to match the actual number
of elements, which can help optimize memory usage.

## C# List binary search

The BinarySearch method searches the sorted list for a specified
element and returns the zero-based index of the element in the list. If the
element is not found, a negative number is returned. The list must be sorted
before calling this method.

Program.cs
  

List&lt;int&gt; nums = [1, 3, 5, 7, 9];
int idx = nums.BinarySearch(5);

Console.WriteLine(idx); // prints 2

This example demonstrates how to use the BinarySearch method to
find the index of an element in a sorted list. If the element is found, its index
is returned; otherwise, a negative number is returned.

## C# List ConvertAll: string to int

The ConvertAll method can be used to convert a list of one type
to another. 

Program.cs
  

List&lt;string&gt; numbers = ["1", "2", "3", "4"];
List&lt;int&gt; ints = numbers.ConvertAll(int.Parse);

Console.WriteLine(string.Join(", ", ints));

This example uses ConvertAll to convert a list of strings
representing numbers into a list of integers. Each string is parsed to an int.

## Source

[List class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-8.0)

In this article, we explored the functionality of the C# List
collection, learning how to efficiently store, manage, and manipulate dynamic
lists in .NET applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).