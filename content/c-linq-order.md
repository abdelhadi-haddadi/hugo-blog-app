+++
title = "C# LINQ Order"
date = 2025-08-27T23:23:15.699+01:00
draft = false
description = "C# LINQ Order tutorial shows how to sort data in C# with LINQ queries."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ Order

last modified January 23, 2024

 

In this article we shows how to sort data in C# with LINQ queries.

Language-Integrated Query (LINQ) is a domain-specific language for querying 
data from various data sources, including arrays, lists, XML files, or databases.

We can use LINQ's Order, OrderDescending, 
OrderBy, and OrderByDescending methods to order data.
The methods do not mutate the original sequence; they return a new sorted
sequence.

In addition, we can use the orderby, ascending, and 
descending clauses with LINQ query expressions.

## C# LINQ Order

The Order method sorts the elements of a sequence in ascending 
order.

Order&lt;T&gt;(IEnumerable&lt;T&gt;)
Order&lt;T&gt;(IEnumerable&lt;T&gt;, IComparer&lt;T&gt;)

The second method accepts an IComparer.

Program.cs
  

List&lt;string&gt; words = [
    "world", "War", "abbot", "Caesar", "castle", "sky", "den",
    "forest", "ocean", "water", "falcon", "owl", "rain", "Earth"
];

var sorted = words.Order().ToList();
sorted.ForEach(Console.WriteLine);

Console.WriteLine("-------------------------");

var sorted2 = words.Order(StringComparer.Ordinal).ToList();
sorted2.ForEach(Console.WriteLine);

We have a list of words. We sort the words in ascending order.

var sorted = words.Order().ToList();
sorted.ForEach(Console.WriteLine);

We sort the words with Order and print the sorted result to the
console. The words are sorted in a case insensitive manner.

var sorted2 = words.Order(StringComparer.Ordinal).ToList();
sorted2.ForEach(Console.WriteLine);

To the overloaded method we also pass a string comparer. The
StringComparer.Ordinal causes the words to be sorted in a
case-sensitive manner.

$ dotnet run
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
-------------------------
Caesar
Earth
War
abbot
castle
den
falcon
forest
ocean
owl
rain
sky
water
world

## C# LINQ OrderDescending

The OrderDescending method sorts the elements of a sequence in
descending order.

Program.cs
  

List&lt;int&gt; vals = [0, -2, 1, -3, 4, 3, 2, 5, 7, -1]; 

var sorted = vals.OrderDescending();
Console.WriteLine(string.Join(", ", sorted));

In the program, we sort the integers in descending order.

$ dotnet run
7, 5, 4, 3, 2, 1, 0, -1, -2, -3

## C# LINQ OrderBy

The OrderBy method sorts the elements of a sequence in ascending
order according to a key.

OrderBy&lt;TSource,TKey&gt;(IEnumerable&lt;TSource&gt;, Func&lt;TSource,TKey&gt;)

The method accepts a keyselector function, which extracts a key from an element.

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

record User(string FirstName, string LastName, int Salary);

In the example, we sort the users first by their last names, then by their
salaries.

var sortedUsers = users.OrderBy(u =&gt; u.LastName).ThenBy(u =&gt; u.Salary);

We sort the users by their last names and then by their salaries in ascending
order. The keyselector function in the form of a lambda extracts the
LastName attribute to be the sort key.

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

## C# LINQ OrderByDescending

The OrderByDescending method sorts the elements of a sequence in
descending order.

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

Console.WriteLine("sort descending by last name and salary");

var sortedUsers = users.OrderByDescending(u =&gt; u.LastName)
    .ThenByDescending(u =&gt; u.Salary);

foreach (var user in sortedUsers)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, int Salary);

In the program, we sort the users by last name and then by salary in descending
order.

$ dotnet run
sort descending by last name and salary
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }

## Ordering with query expressions

The next example uses the LINQ query expressions to sort data.

Program.cs
  

List&lt;string&gt; words = [
    "world", "War", "abbot", "Caesar", "castle", "sky", "den",
    "forest", "ocean", "water", "falcon", "owl", "rain", "Earth"
];

var sorted = from word in words
             orderby word
             select word;

Console.WriteLine(string.Join(", ", sorted));

var sorted2 = from word in words
              orderby word descending
              select word;

Console.WriteLine(string.Join(", ", sorted2));

We sort a list of words with orderby and descending 
clauses.

$ dotnet run
abbot, Caesar, castle, den, Earth, falcon, forest, ocean, owl, rain, sky, War, water, world
world, water, War, sky, rain, owl, ocean, forest, falcon, Earth, den, castle, Caesar, abbot

## Join and order

In the next example, we perform ordering operation on a join operation. 

Program.cs
  

List&lt;Country&gt; countries =
[
    new("Slovakia", 1),
    new("Hungary", 2),
    new("Russia", 3),
    new("Poland", 4)
];

List&lt;City&gt; cities =
[
    new("Bratislava", 1),
    new("Poprad", 1),
    new("Trnava", 1),
    new("Budapest", 2),
    new("Miskolc", 2),
    new("Ajka", 2),
    new("Moscow", 3),
    new("Jakutsk", 3),
    new("Perm", 3),
    new("Omsk", 3),
    new("Warsaw", 4),
    new("Krakow", 4),
];

var groups =
    from country in countries
    join city in cities on country.Id equals city.CountryId into cGroup
    orderby country.Name
    select new
    {
        Country = country.Name,
        Cities =
            from city2 in cGroup
            orderby city2.Name
            select city2
    };

foreach (var group in groups)
{
    Console.WriteLine(group.Country);

    foreach (var city in group.Cities)
    {
        Console.WriteLine($"  {city.Name}");
    }
}

record City(string Name, int CountryId);
record Country(string Name, int Id);

We have countries and their corresponding cities. We join the cities with their 
countries. We output the cities in ascending order and cities inside countries 
also in ascending order.

var groups =
    from country in countries
    join city in cities on country.Id equals city.CountryId into cGroup
    orderby country.Name
    select new
    {
        Country = country.Name,
        Cities =
            from city2 in cGroup
            orderby city2.Name
            select city2
    };

We join the cities with their countries. The key is the country Id. We order 
the countries and the cities with orderby.

foreach (var group in groups)
{
    Console.WriteLine(group.Country);

    foreach (var city in group.Cities)
    {
        Console.WriteLine($"  {city.Name}");
    }
}

We go over the groups and print each country with its cities.

$ dotnet run 
  Hungary
    Ajka
    Budapest
    Miskolc
  Poland
    Krakow
    Warsaw
  Russia
    Jakutsk
    Moscow
    Omsk
    Perm
  Slovakia
    Bratislava
    Poprad
    Trnava

## Source

[Enumerable.OrderBy method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderby?view=net-8.0)

In this article we have ordered data in C# with LINQ.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).