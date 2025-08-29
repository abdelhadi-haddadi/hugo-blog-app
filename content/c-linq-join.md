+++
title = "C# LINQ Join"
date = 2025-08-29T19:50:57.758+01:00
draft = false
description = "C# LINQ Join tutorial shows how to do join operations in C# with LINQ."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ Join

last modified July 25, 2024

 

In this article we show how to join data sources using LINQ join operations. 

Language-Integrated Query (LINQ) is a domain-specific language for querying data
from various data sources, including arrays, lists, XML files, or databases.

The join operation associates objects from one data source with objects from 
another data source based on matching keys.

## C# LINQ inner join

The *inner join* is the most common join type. The inner join selects
only those records from data sources that have matching values.

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
    new("Krakow", 4)
];

var joined =
    from country in countries
    join city in cities on country.Id equals city.CountryId
    select new
    {
        Country = country.Name,
        City = city.Name
    };

foreach (var e in joined)
{
    Console.WriteLine($"{e.City} {e.Country}");

}

record City(string Name, int CountryId);
record Country(string Name, int Id);

We have a list of countries and cities. Each city contains the corresponding
country Id. 

var joined =
    from country in countries
    join city in cities on country.Id equals city.CountryId
    select new
    {
        Country = country.Name,
        City = city.Name
    };

The join operation is performed with join, in,
on, equals keywords.

$ dotnet run 
Bratislava Slovakia
Poprad Slovakia
Trnava Slovakia
Budapest Hungary
Miskolc Hungary
Ajka Hungary
Moscow Russia
Jakutsk Russia
Perm Russia
Omsk Russia
Warsaw Poland
Krakow Poland

Since in our data source Slovenia does not have a city listed, it is not
displayed in the output. 

## C# LINQ group join

A group join joins two sequences based on a key and groups the resulting matches
for each element.

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
    new("Krakow", 4)
];

var groups =
    from country in countries
    join city in cities on country.Id equals city.CountryId into cGroup
    select new
    {
        Country = country.Name,
        Cities =
            from city2 in cGroup
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

Instead of dispaying ech city mapped to the country, we show a list of countries 
having their corresponding cities grouped. 

var groups =
    from country in countries
    join city in cities on country.Id equals city.CountryId into cGroup
    select new
    {
        Country = country.Name,
        Cities =
            from city2 in cGroup
            select city2
    };

The group join is performed with join, in,
on, equals, and into keywords. All the 
cities are mapped to the Cities property for which we perform a 
separate query.

$ dotnet run 
Slovakia
  Bratislava
  Poprad
  Trnava
Hungary
  Budapest
  Miskolc
  Ajka
Russia
  Moscow
  Jakutsk
  Perm
  Omsk
Poland
  Warsaw
  Krakow

## C# LINQ composite key

We may not have a single, well-defined key that associates two data sources. 
It is possible to generate a composite key from multiple values.

Program.cs
  

List&lt;Worker&gt; workers =
[
    new("John", "Doe", 1),
    new("Roger", "Roe", 2),
    new("Patrick", "Smith", 3),
    new("Peter", "Novak", 4),
];

List&lt;User&gt; voters =
[
    new("John", "Doe", 1),
    new("Dave", "Manole", 2),
    new("Patrick", "Smith", 3),
    new("Paul", "Dempsey", 4),
    new("Svetlana", "Malikova", 5),
    new("Roger", "Roe", 6),
    new("Roman", "Holz", 7),
    new("Lucia", "Molnarova", 8),
    new("Peter", "Novak", 9),
];

var joined =
    from worker in workers
    join voter in voters on new
    {
        worker.FirstName,
        worker.LastName
    } equals new
    {
        voter.FirstName,
        voter.LastName
    }
    select voter.FirstName + " " + voter.LastName;

foreach (var e in joined)
{
    Console.WriteLine($"{e}");
}

record User(string FirstName, string LastName, int Id);
record Worker(string FirstName, string LastName, int Id);

In the example we have a list of workers and voters. We want to find out all 
workers that are also voters. 

var joined =
    from worker in workers
    join voter in voters on new
    {
        worker.FirstName,
        worker.LastName
    } equals new
    {
        voter.FirstName,
        voter.LastName
    }
    select voter.FirstName + " " + voter.LastName;

We create a composite key from the first name and the last name. We assume that 
each person is unique.

$ dotnet run 
John Doe
Roger Roe
Patrick Smith
Peter Novak

## C# LINQ multiple joins

We can join multiple data sources with multiple join operations.

Program.cs
  

List&lt;Employee&gt; employees = [
    new (1, "John", "Doe"),
    new (2, "Paul", "Smith"),
    new (3, "Roger", "Roe")
];

List&lt;Order&gt; orders = [
    new (1, 1, 1, 1, 1),
    new (2, 1, 1, 2, 1),
    new (3, 1, 2, 5, 2),
    new (4, 2, 3, 4, 1),
    new (5, 3, 3, 1, 1),
    new (6, 3, 3, 3, 1)
];

List&lt;Book&gt; books = [
    new (1, "War and Peace", 24.90m),
    new (2, "Old Goriot", 14.5m),
    new (3, "Essays and Aphorisms", 35m),
    new (4, "The Call of the Wild", 11m),
    new (5, "English Grammar", 33m),
];

var res = from o in orders
          join Employee e in employees
              on o.EmployeeId equals e.Id
          join Book b in books
              on o.BookId equals b.Id
          orderby e.Id
          select new { e.FirstName, e.LastName, b.Title, b.Price };

foreach (var e in res)
{
    Console.WriteLine(e);
}

record Employee(int Id, string FirstName, string LastName);
record Book(int Id, string Title, decimal Price);
record Order(int Id, int BookOrderId, int EmployeeId, int BookId, int Quantity);

We have three data sources: employees, books, and orders. Our goal is to map
each employee to the books sold.

var res = from o in orders
    join Employee e in employees
        on o.EmployeeId equals e.Id
    join Book b in books
        on o.BookId equals b.Id
    orderby e.Id
    select new { e.FirstName, e.LastName, b.Title, b.Price };

With two join operations, we combine the data together. First we join orders
with the employees. Then we add the book details. In the end, we get who from
the employees processed what books.

$ dotnet run 
{ FirstName = John, LastName = Doe, Title = War and Peace, Price = 24,90 }
{ FirstName = John, LastName = Doe, Title = Old Goriot, Price = 14,5 }
{ FirstName = Paul, LastName = Smith, Title = English Grammar, Price = 33 }
{ FirstName = Roger, LastName = Roe, Title = The Call of the Wild, Price = 11 }
{ FirstName = Roger, LastName = Roe, Title = War and Peace, Price = 24,90 }
{ FirstName = Roger, LastName = Roe, Title = Essays and Aphorisms, Price = 35 }

## Source

[Join operations - programming guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/join-operations)

In this article we showed how to join data sources using LINQ join operations. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).