+++
title = "C# filter list"
date = 2025-08-29T19:50:46.412+01:00
draft = false
description = "Learn how to filter lists in C# using iteration, LINQ queries, and the built-in FindAll and RemoveAll methods. This step-by-step tutorial covers efficient list filtering techniques."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# filter list

last modified June 8, 2025

 

In this article, we explore different techniques for filtering a list in C#.
Whether you're working with large datasets or optimizing search functionality,
understanding efficient filtering methods is essential.

This tutorial covers multiple approaches to filtering lists in C#, including
iteration, LINQ queries, and the built-in FindAll and
RemoveAll methods. 

## C# filter list with iteration

In the first example, we use a foreach loop to filter a list.

Program.cs
  

List&lt;string&gt; words = [ "sky", "rock", "forest", "new",
    "falcon", "jewelry" ];

List&lt;string&gt; filtered = [];

foreach (var word in words)
{
    if (word.Length == 3)
    {
        filtered.Add(word);
    }
}

Console.WriteLine(string.Join(',', filtered));

The example filters out all words that have three characters.

List&lt;string&gt; words = [ "sky", "rock", "forest", "new",
    "falcon", "jewelry" ];

We have a list of words. The goal is to find out all words with three letters.

List&lt;string&gt; filtered = [];

A new filtered list is created. All the words that match the
condition will be added to the list.

foreach (var word in words)
{
    if (word.Length == 3)
    {
        filtered.Add(word);
    }
}

We go over the list of words in a foreach loop. All words that
match the if condition are added to the filtered list.

Console.WriteLine(string.Join(',', filtered));

We show the contents of the filtered list to the console.

$ dotnet run
sky,new

## C# filter list with FindAll

In the following example, we filter a list with the built-in FindAll
method.

Program.cs
  

List&lt;int&gt; vals = [-1, -3, 0, 1, 3, 2, 9, -4];
List&lt;int&gt; filtered = vals.FindAll(e =&gt; e &gt; 0);

Console.WriteLine(string.Join(',', filtered));

The example finds out all integer values that are greater than zero.

List&lt;int&gt; filtered = vals.FindAll(e =&gt; e &gt; 0);

The FindAll method retrieves all the elements that match the
conditions defined by the specified predicate.

$ dotnet run
1,3,2,9

## C# filter list with LINQ query expression

The following example uses a LINQ query expression to filter a list.

Program.cs
  

List&lt;string&gt; words = [ "sky", "rock", "forest", "new",
        "falcon", "jewelry" ];

var query = from word in words
            where word.Length == 3
            select word;

foreach (var word in query)
{
    Console.WriteLine(word);
}

The example selects all words that have three characters. The where
clause filters the words based on the specified condition, while the
select clause specifies the elements to be returned.

## C# filter list with LINQ Where

The next example filters a list with LINQ's Where method.
It is a more concise way to filter collections compared to using a
foreach loop or the FindAll method. It takes a
predicate function that defines the filtering condition and returns a new
list containing only the elements that satisfy the condition.

Program.cs
  

List&lt;int&gt; vals = [-1, -3, 0, 1, 3, 2, 9, -4];
List&lt;int&gt; filtered = vals.Where(x =&gt; x &gt; 0).ToList();

Console.WriteLine(string.Join(',', filtered));

The example filters out all positive values.

List&lt;int&gt; filtered = vals.Where(x =&gt; x &gt; 0).ToList();

The Where method filters a sequence of values based on a predicate.

## C# filter a list of objects

In the following example we filter a list of car objects with a LINQ query
expression.

Program.cs
  

List&lt;Car&gt; cars =
[
    new ("Audi", 52642),
    new ("Mercedes", 57127),
    new ("Skoda", 9000),
    new ("Volvo", 29000),
    new ("Bentley", 350000),
    new ("Citroen", 21000),
    new ("Hummer", 41400),
    new ("Volkswagen", 21601)
];

foreach (var car in from car in cars
                    where car.Price &gt; 9000 &amp;&amp; car.Price &lt; 50000
                    select new { car.Name, car.Price })
{
    Console.WriteLine($"{car.Name} {car.Price}");
}

record Car(string Name, int Price);

The example selects all cars whose price is between 9000 and 50000.

$ dotnet run
Volvo 29000
Citroen 21000
Hummer 41400
Volkswagen 21600

## C# filter List with Func

In the example, we use a Func delegate to filter a list of users.
This approach allows us to define a predicate function that can be reused
for filtering based on different criteria. The Func delegate
represents a method that takes a single parameter and returns a boolean value,
making it suitable for use with LINQ methods like Where.

Program.cs
  

List&lt;User&gt; users =
[
    new (1, "John", "London", "2001-04-01"),
    new (2, "Lenny", "New York", "1997-12-11"),
    new (3, "Andrew", "Boston", "1987-02-22"),
    new (4, "Peter", "Prague", "1936-03-24"),
    new (5, "Anna", "Bratislava", "1973-11-18"),
    new (6, "Albert", "Bratislava", "1940-12-11"),
    new (7, "Adam", "Trnava", "1983-12-01"),
    new (8, "Robert", "Bratislava", "1935-05-15"),
    new (9, "Robert", "Prague", "1998-03-14"),
];

var city = "Bratislava";
Func&lt;User, bool&gt; livesIn = e =&gt; e.City == city;

var res = users.Where(livesIn);

foreach (var e in res)
{
    Console.WriteLine(e);
}

record User(int Id, string Name, string City, string DateOfBirth);

From the array of users, we get those that live in Bratislava.

var city = "Bratislava";
Func&lt;User, bool&gt; livesIn = e =&gt; e.City == city;

In the predicate, a function which returns a boolean value, we test all user
objects whose City attribute is equal to the city
variable.

var res = users.Where(livesIn);

We pass the livesIn predicate to the Where method.

$ dotnet run
User { Id = 5, Name = Anna, City = Bratislava, DateOfBirth = 1973-11-18 }
User { Id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { Id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }

## C# filter list with RemoveAll

The RemoveAll method removes all elements from a list that match
the conditions defined by a specified predicate. This method modifies the
original list in place.

Program.cs
  

List&lt;int&gt; numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.RemoveAll(n =&gt; n % 2 == 0);
Console.WriteLine(string.Join(",", numbers));

In this example, all even numbers are removed from the list. The
RemoveAll method takes a predicate and deletes all elements that
satisfy the condition.

$ dotnet run
1,3,5,7,9

## Source

[Filtering data](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/filtering-data)

In this article we have learned how to filter a list in C# using various
techniques such as iteration, the FindAll method, the 
RemoveAll method, LINQ query expressions, and the
Where method. Each method has its own advantages and use cases,
allowing developers to choose the most suitable approach for their specific
needs. Whether you prefer the simplicity of iteration, the convenience of
built-in methods, or the power of LINQ, C# provides flexible options for
efficiently filtering lists.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).