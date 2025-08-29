+++
title = "C# LINQ group by"
date = 2025-08-27T23:23:14.457+01:00
draft = false
description = "Learn how to group data in C# using LINQ's
GroupBy functionality. This comprehensive tutorial explores grouping techniques,
query expressions, and practical examples to master LINQ data manipulation in C#
programming."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ group by

last modified April 30, 2025

 

In this article we show how to group data in C# with LINQ queries.

Language-Integrated Query (LINQ) is a powerful domain-specific language in C#
that simplifies querying and manipulating data across various sources. Whether
working with arrays, lists, XML files, or complex databases, LINQ provides a
unified syntax and seamless integration within the programming language,
enabling developers to write readable, expressive, and efficient queries
directly in their code.

The group, by, and into keywords in LINQ
allow you to organize data into collections based on specific criteria. These
keywords make it easy to categorize and manipulate large datasets efficiently
within C#. The grouped data can then be further processed or queried to derive
insights.

A **group by operation** is a powerful feature in LINQ that
aggregates data into groups based on a shared characteristic or condition. Each
group is defined by a "key," which acts as an identifier for the group, while
the items in the group share common attributes or satisfy a given expression.
This operation is commonly used for summarizing, sorting, or analyzing
structured data.

With LINQ, it is possible to group data by:

    **A single key**: Group items based on a single property,
    such as category or ID.
    **An attribute**: Group data based on a specific attribute,
    such as color or type.
    **A compound key**: Group items using multiple properties
    as the key, combining attributes like date and location.
    **A computed numeric range**: Group data into ranges or
    bins, such as age brackets or price ranges.
    **An expression**: Use complex conditions or calculations
    to define grouping logic.

The group keyword specifies the data to be grouped, by
identifies the grouping criteria, and into allows further
processing or querying of the grouped data.

## C# LINQ group by a key

We can group data into categories based on a certain key.

Program.cs
  

List&lt;Car&gt; cars =
[
    new ("Audi", "red", 52642),
    new ("Mercedes", "blue", 57127),
    new ("Skoda", "black", 9000),
    new ("Volvo", "red", 29000),
    new ("Bentley", "yellow", 350000),
    new ("Citroen", "white", 21000),
    new ("Hummer", "black", 41400),
    new ("Volkswagen", "white", 21600),
];

var groups = from car in cars
             group car by car.Colour;

foreach (var group in groups)
{
    Console.WriteLine(group.Key);

    foreach (var car in group)
    {
        Console.WriteLine($" {car.Name} {car.Price}");
    }
}

record Car(string Name, string Colour, int Price);

We separate the cars into groups by their colour.

$ dotnet run
red
  Audi 52642
  Volvo 29000
blue
  Mercedes 57127
black
  Skoda 9000
  Hummer 41400
yellow
  Bentley 350000
white
  Citroen 21000
  Volkswagen 21600

## C# LINQ group by attribute

We can group data by some attributes of the elements.

Program.cs
  

List&lt;string&gt; words =
[
    "war", "water", "cup", "cloud", "atom", "abyss", "soup", "book",
    "moon", "nice", "sky", "forest"
];

var groups = from word in words
             group word by word.Length;

foreach (var group in groups)
{
    Console.WriteLine(group.Key);

    foreach (var e in group)
    {
        Console.WriteLine($"{e}");
    }

    Console.WriteLine("----------------");
}

The example groups words by their length.

$ dotnet run
3
war
cup
sky
----------------
5
water
cloud
abyss
----------------
4
atom
soup
book
moon
nice
----------------
6
forest
----------------

## C# LINQ group by and aggregate

In the following example, we perform a grouping and aggregation operations.

Program.cs
  

Revenue[] revenues =
[
    new (1, "Q1", 2340),
    new (2, "Q1", 1200),
    new (3, "Q1", 980),
    new (4, "Q2", 340),
    new (5, "Q2", 780),
    new (6, "Q3", 2010),
    new (7, "Q3", 3370),
    new (8, "Q4", 540),
];

var res = from revenue in revenues
          group revenue by revenue.Quarter
          into g
          select new { Quarter = g.Key, Total = g.Sum(e =&gt; e.Amount) };

foreach (var line in res)
{
    Console.WriteLine(line);
}

record Revenue(int Id, string Quarter, int Amount);

We have revenues for four quarters. We group the revenues by the quarters and 
sum the amounts.

$ dotnet run
{ Quarter = Q1, Total = 4520 }
{ Quarter = Q2, Total = 1120 }
{ Quarter = Q3, Total = 5380 }
{ Quarter = Q4, Total = 540 }

We can apply a filter on aggregated data with where clause.

Program.cs
  

Revenue[] revenues =
[
    new (1, "Q1", 2340),
    new (2, "Q1", 1200),
    new (3, "Q1", 980),
    new (4, "Q2", 340),
    new (5, "Q2", 780),
    new (6, "Q3", 2010),
    new (7, "Q3", 3370),
    new (8, "Q4", 540),
];

var res = from revenue in revenues
          group revenue by revenue.Quarter
          into g
          where g.Count() == 2
          select new { Quarter = g.Key, Total = g.Sum(c =&gt; c.Amount) };

foreach (var line in res)
{
    Console.WriteLine(line);
}

record Revenue(int Id, string Quarter, int Amount);

In the example, we pick only those quarters, which have exactly two revenues.

$ dotnet run
{ Quarter = Q2, Total = 1120 }
{ Quarter = Q3, Total = 5380 }

## C# LINQ group by composite key

We can group data by a composite key, consisting of multiple fields.

Program.cs
  

User[] users =
[
    new ("John", "Doe", "gardener"),
    new ("Jane", "Doe", "teacher"),
    new ("Roger", "Roe", "driver"),
    new ("Peter", "Doe", "teacher"),
    new ("Pavol", "Novak", "programmer"),
    new ("Albert", "Novak", "teacher"),
    new ("Sam", "Novak", "driver"),
    new ("Peter", "Horvath", "accountant"),
    new ("Lucia", "Horvath", "accountant"),
    new ("Michael", "Novak", "programmer"),
];

var groups = from user in users
             group user by new { user.LastName, user.Occupation };

foreach (var group in groups)
{
    Console.WriteLine(group.Key);

    foreach (var e in group)
    {
        Console.WriteLine($"{e}");
    }

    Console.WriteLine("----------------");
}

record User(string FirstName, string LastName, string Occupation);

The program arranges groups of users by their lastname and occupation.

$ dotnet run
{ LastName = Doe, Occupation = gardener }
User { FirstName = John, LastName = Doe, Occupation = gardener }
----------------
{ LastName = Doe, Occupation = teacher }
User { FirstName = Jane, LastName = Doe, Occupation = teacher }
User { FirstName = Peter, LastName = Doe, Occupation = teacher }
----------------
{ LastName = Roe, Occupation = driver }
User { FirstName = Roger, LastName = Roe, Occupation = driver }
----------------
{ LastName = Novak, Occupation = programmer }
User { FirstName = Pavol, LastName = Novak, Occupation = programmer }
User { FirstName = Michael, LastName = Novak, Occupation = programmer }
----------------
{ LastName = Novak, Occupation = teacher }
User { FirstName = Albert, LastName = Novak, Occupation = teacher }
----------------
{ LastName = Novak, Occupation = driver }
User { FirstName = Sam, LastName = Novak, Occupation = driver }
----------------
{ LastName = Horvath, Occupation = accountant }
User { FirstName = Peter, LastName = Horvath, Occupation = accountant }
User { FirstName = Lucia, LastName = Horvath, Occupation = accountant }
----------------

## C# LINQ group by boolean expression

In the following example, we group data using a boolean expression.

Program.cs
  

Student[] students =
[
    new ("John", "Doe", 78),
    new ("Roger", "Roe", 89),
    new ("Peter", "Doe", 90),
    new ("Pavol", "Novak", 34),
    new ("Albert", "Novak", 66),
    new ("Peter", "Horvath", 89),
    new ("Lucia", "Horvath", 88),
    new ("Michael", "Novak", 99),
];

var groups = from student in students
             group student by new
             {
                 Passed = student.Score &gt; 70,
             };

foreach (var group in groups)
{
    if (group.Key.Passed)
    {
        Console.WriteLine("passed");
    }
    else
    {
        Console.WriteLine("failed");
    }

    foreach (var e in group)
    {
        Console.WriteLine(e);
    }

    Console.WriteLine("----------------------------");
}

record Student(string FirstName, string LastName, int Score);

We have an array of student records having firstname, lastname, and score 
fields. To pass an exam, the student needs to have a score over 70. With 
a LINQ expression, we divide the students into two groups: passed and failed.

$ dotnet run
passed
Student { FirstName = John, LastName = Doe, Score = 78 }
Student { FirstName = Roger, LastName = Roe, Score = 89 }
Student { FirstName = Peter, LastName = Doe, Score = 90 }
Student { FirstName = Peter, LastName = Horvath, Score = 89 }
Student { FirstName = Lucia, LastName = Horvath, Score = 88 }
Student { FirstName = Michael, LastName = Novak, Score = 99 }
----------------------------
failed
Student { FirstName = Pavol, LastName = Novak, Score = 34 }
Student { FirstName = Albert, LastName = Novak, Score = 66 }
----------------------------

## C# LINQ group by range

In the next example, we use a numeric range as a group key.

Program.cs
  

List&lt;Student&gt; students =
[
    new ("John", "Doe", 78),
    new ("Roger", "Roe", 89),
    new ("Peter", "Doe", 90),
    new ("Pavol", "Novak", 34),
    new ("Albert", "Novak", 66),
    new ("Peter", "Horvath", 89),
    new ("Lucia", "Horvath", 88),
    new ("Michael", "Novak", 99),
];

var groups = from std in students
             let avg = students.Average(e =&gt; e.Score)
             group std by (std.Score / 10) into g
             orderby g.Key
             select g;

foreach (var group in groups)
{
    Console.WriteLine(group.Key * 10);

    foreach (var e in group)
    {
        Console.WriteLine(e);
    }

    Console.WriteLine("----------------------------");
}

record Student(string FirstName, string LastName, int Score);

The example groups students into percentile ranges.

$ dotnet run
30
Student { FirstName = Pavol, LastName = Novak, Score = 34 }
----------------------------
60
Student { FirstName = Albert, LastName = Novak, Score = 66 }
----------------------------
70
Student { FirstName = John, LastName = Doe, Score = 78 }
----------------------------
80
Student { FirstName = Roger, LastName = Roe, Score = 89 }
Student { FirstName = Peter, LastName = Horvath, Score = 89 }
Student { FirstName = Lucia, LastName = Horvath, Score = 88 }
----------------------------
90
Student { FirstName = Peter, LastName = Doe, Score = 90 }
Student { FirstName = Michael, LastName = Novak, Score = 99 }
----------------------------

## C# LINQ word frequency

In the following example, we count the frequency of words in a file. 

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We read data from the King James Bible.

Program.cs
  

using System.Text.RegularExpressions;

var fileName = "the-king-james-bible.txt";
var text = File.ReadAllText(fileName);

var dig = new Regex(@"\d");
var matches = new Regex("[a-z-A-Z']+").Matches(text);

var words = 
    from match in matches
        let val = match.Value
        where !dig.IsMatch(val)
    select match.Value;

var topTen =
    (from word in words
        group word by word into wg
        orderby wg.Count() descending
        select new {word = wg.Key, Total = wg.Count()}
    ).Take(10);

foreach (var e in topTen)
{
    Console.WriteLine($"{e.word}: {e.Total}");
}

We count the frequency of the words from the King James Bible.

var matches = new Regex("[a-z-A-Z']+").Matches(text);
var words = matches.Select(m =&gt; m.Value).ToList();

We find all the matches witch Matches method. From the match
collection, we get all the words into a list.

var words = 
from match in matches
    let val = match.Value
    where !dig.IsMatch(val)
select match.Value;

In the first query, we find all the matches. From the match collection, we get
all the words.

var topTen =
    (from word in words
        group word by word into wg
        orderby wg.Count() descending
        select new {word = wg.Key, Total = wg.Count()}
    ).Take(10);

The words are grouped and ordered by frequency in descending order. We take 
the first ten most common words.

$ dotnet run
the 62103
and 38848
of 34478
to 13400
And 12846
that 12576
in 12331
shall 9760
he 9665
unto 8942

## Source

[Group query results](https://learn.microsoft.com/en-us/dotnet/csharp/linq/group-query-results)

In this article we have grouped data in C# LINQ.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).