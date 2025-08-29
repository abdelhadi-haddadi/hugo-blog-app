+++
title = "C# LINQ query expression"
date = 2025-08-27T23:23:15.723+01:00
draft = false
description = "C# LINQ query expression tutorial shows how to 
extract and transform data in C# with queries."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ query expression

last modified July 5, 2023

 

C# LINQ query expression tutorial shows how to extract and transform data in C#
with queries.

Language-Integrated Query (LINQ) is a set of technologies based on the
integration of query capabilities directly into the C# language. 

A query is a set of instructions that describes what data to retrieve from a
given data source (or sources) and what shape and organization the returned data
should have. LINQ query expressions can be used to conveniently extract and
process data from arrays, enumerable classes, XML documents, relational
databases, and third-party data sources.

Query expressions can be used to query and to transform data from any
LINQ-enabled data source. Query expressions have deferred execution. They are
not executed until we iterate over the query variable, for example, in a foreach
statement.

## C# query expression filter

In the next examples, we show how to filter data.

Program.cs
  

int[] vals = { -2, 4, 6, -1, 2, 0, 1, -3, -4, 2, 3, 8 };

var pos = 
    from val in vals 
    where val &gt; 0
    select val;

Console.WriteLine(string.Join(" ", pos));

var evens = 
    from val in vals
    where val % 2 == 0
    select val;

Console.WriteLine(string.Join(" ", evens));

In the example, we filter out positive values and even values from the array.

var pos = 
    from val in vals 
    where val &gt; 0
    select val;

With the from clause, we go over the elements of the array. The
elements are filtered with where and finally projected with
select.

$ dotnet run 
4 6 2 1 2 3 8
-2 4 6 2 0 -4 2 8

Next we combine conditions with the || operator.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "bee", "forest", "new", "falcon", "rock",
        "cloud", "war", "small", "eagle", "blue", "frost", "water" };

var found = 
    from word in words
    where word.StartsWith("f") || word.StartsWith("w")
    select word;

foreach (var word in found)
{
    Console.WriteLine(word);
}

We apply two conditions in the where clause. We grab words that 
start either with 'f' or 'w'.

$ dotnet run
forest
falcon
war
frost
water

In the following example, we apply two conditions with &amp;&amp;.

Program.cs
  

var cars = new List&lt;Car&gt;
{
    new ("Audi", 52642),
    new ("Mercedes", 57127),
    new ("Skoda", 9000),
    new ("Volvo", 29000),
    new ("Bentley", 350000),
    new ("Citroen", 21000),
    new ("Hummer", 41400),
    new ("Volkswagen", 21600)
};

var res = from car in cars
          where car.Price &gt; 30000 &amp;&amp; car.Price &lt; 100000
          select new { car.Name, car.Price };

foreach (var car in res)
{
    Console.WriteLine($"{car.Name} {car.Price}");
}

record Car(string Name, int Price);

In the example, we filter the list of car objects with the where
clause. We include all cars whose price is between 30000 and 100000.

$ dotnet run
Audi 52642
Mercedes 57127
Hummer 41400

## C# query first/last

We get the first and the last element of an enumerable with First
and Last methods.

Program.cs
  

string[] words = { "falcon", "oak", "sky", "cloud", "tree", "tea", "water" };

var first = (from word in words
        where word.Length == 3
        select word).First();

Console.WriteLine(first);

var last = (from word in words
        where word.Length == 3
        select word).Last();

Console.WriteLine(last);

In the example, we access elements of an array.

var first = (from word in words
    where word.Length == 3
    select word).First();

We get the first element whose lenght is 3.

var last = (from word in words
    where word.Length == 3
    select word).Last();

We retrieve the last element with lenght 3.

$ dotnet run
oak
tea

## C# query select

The select clause projects each element of a sequence into a new
form. It selects, projects and transforms elements in a collection. The
select is usually called Map in other languages.

Program.cs
  

int[] vals = { 2, 4, 6, 8 };

var powered = 
    from val in vals 
    select Math.Pow(val, 2);

Console.WriteLine(string.Join(", ", powered));

string[] words = { "sky", "earth", "oak", "falcon" };
var wordLens = 
    from word in words
    select word.Length;

Console.WriteLine(string.Join(", ", wordLens));

In the example, we transform an array of integers into a sequence of its powers 
and transform an array of words into a sequence of word lengths.

$ dotnet run
4, 16, 36, 64
3, 5, 3, 6

## C# query select into anonymous type

Projections are selection of specific fields from the returned objects.
Projections are performed with the select clause. We can project 
fields into anonymous types.

Program.cs
  

User[] users =
{
  new (1, "John", "London", "2001-04-01"),
  new (2, "Lenny", "New York", "1997-12-11"),
  new (3, "Andrew", "Boston", "1987-02-22"),
  new (4, "Peter", "Prague", "1936-03-24"),
  new (5, "Anna", "Bratislava", "1973-11-18"),
  new (6, "Albert", "Bratislava", "1940-12-11"),
  new (7, "Adam", "Trnava", "1983-12-01"),
  new (8, "Robert", "Bratislava", "1935-05-15"),
  new (9, "Robert", "Prague", "1998-03-14"),
};

var res = from user in users
          where user.City == "Bratislava"
          select new { user.Name, user.City };

Console.WriteLine(string.Join(", ", res));

record User(int id, string Name, string City, string DateOfBirth);

In the example, we select users who live in Bratislava.

var res = from user in users
          where user.City == "Bratislava"
          select new { user.Name, user.City };

With the select new clause, we create an anonymous type with two
fields: Name and City.

$ dotnet run
{ Name = Anna, City = Bratislava }, { Name = Albert, City = Bratislava },
{ Name = Robert, City = Bratislava }

## C# query flatten array

The following example flattens an array of arrays into a single array.

Program.cs
  

int[][] vals = {
    new[] {1, 2, 3},
    new[] {4},
    new[] {5, 6, 6, 2, 7, 8},
};

var res = (from nested in vals
           from e in nested
           select e);

Console.WriteLine(string.Join(", ", res));

To flatten an array, we use two from clauses.

$ dotnet run
1, 2, 2, 3, 4, 5, 6, 6, 7, 8

## C# query Concat

The Concat method concatenates two sequences.

Program.cs
  

User[] users1 = 
{
    new ("John", "Doe", "gardener"),
    new ("Jane", "Doe", "teacher"), 
    new ("Roger", "Roe", "driver"),
};

User[] users2 = 
{
    new ("Peter", "Smith", "teacher"),
    new ("Lucia", "Black", "accountant"), 
    new ("Michael", "Novak", "programmer"),
};

var users = (from u1 in users1 select u1).Concat(from u2 in users2 select u2);

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, string Occupation);

We have two arrays of users. We merge them with Concat.

$ dotnet run
User { FirstName = John, LastName = Doe, Occupation = gardener }
User { FirstName = Jane, LastName = Doe, Occupation = teacher }
User { FirstName = Roger, LastName = Roe, Occupation = driver }
User { FirstName = Peter, LastName = Smith, Occupation = teacher }
User { FirstName = Lucia, LastName = Black, Occupation = accountant }
User { FirstName = Michael, LastName = Novak, Occupation = programmer }

## C# query cartesian product

Cartesian product is the multiplication of two sets to form the set of all
ordered pairs.

Program.cs
  

char[] letters = "abcdefghi".ToCharArray();
char[] digits = "123456789".ToCharArray();
 
var coords =
    from l in letters
    from d in digits
    select $"{l}{d}";
 
foreach (var coord in coords)
{
    Console.Write($"{coord} ");

    if (coord.EndsWith("9"))
    {
        Console.WriteLine();
    }
}

Console.WriteLine();

In the example, we create a Cartesian product of letters and digits.

var coords =
    from l in letters
    from d in digits
    select $"{l}{d}";

To accomplish the task, we use two from clauses.

$ dotnet run
a1 a2 a3 a4 a5 a6 a7 a8 a9 
b1 b2 b3 b4 b5 b6 b7 b8 b9 
c1 c2 c3 c4 c5 c6 c7 c8 c9 
d1 d2 d3 d4 d5 d6 d7 d8 d9 
e1 e2 e3 e4 e5 e6 e7 e8 e9 
f1 f2 f3 f4 f5 f6 f7 f8 f9 
g1 g2 g3 g4 g5 g6 g7 g8 g9 
h1 h2 h3 h4 h5 h6 h7 h8 h9 
i1 i2 i3 i4 i5 i6 i7 i8 i9 

## C# query Count &amp; Sum

The Count returns the number of elements in a sequence. The
Sum computes the sum of a sequence of numeric values.

Program.cs
  

var content =
    @"Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox.";

var lines = content.Split("\n");

var n1 = (from line in lines
          select line).Count();

Console.WriteLine($"There are {n1} lines");

var words = content.Split(" ");

var n2 = (from word in words
          select word).Count();

Console.WriteLine($"There are {n2} words");

var chars = content.ToCharArray();

var n3 = (from c in chars
          where c == 'f'
          select c).Count();

Console.WriteLine($"There are {n3} f letters");

In the example, we use the Count method to count the number of 
lines, words, and 'f' characters in the text.

$ dotnet run
There are 5 lines
There are 47 words
There are 7 f letters

In the next example, we use the Sum method.

Program.cs
  

var vals = new List&lt;int&gt; { 1, -2, 3, -4, 5, 6, 7, -8 };
var s = (from x in vals where x &gt; 0 select x).Sum();

Console.WriteLine($"The sum of positive values is: {s}");

var words = new List&lt;string&gt; { "falcon", "eagle", "hawk", "owl" };
int len = (from x in words select x.Length).Sum();

Console.WriteLine($"There are {len} letters in the list");

In the example, we count the number of positive values in the vals
list and the number of characters in the words list.

$ dotnet run
The sum of positive values is: 22
There are 18 letters in the list

## C# query orderby

With the OrderBy method or the orderby clause we can
sort the elements of a sequence. 

Program.cs
  

int[] vals = { 4, 5, 3, 2, 7, 0, 1, 6 };

var result = from e in vals
             orderby e ascending
             select e;

Console.WriteLine(string.Join(", ", result));

var result2 = from e in vals
              orderby e descending
              select e;

Console.WriteLine(string.Join(", ", result2));

In the example, we sort the integers in ascending and descending order. The 
ascending keyword is optional.

$ dotnet run
0, 1, 2, 3, 4, 5, 6, 7
7, 6, 5, 4, 3, 2, 1, 0

In the next example, we sort objects by multiple fields.

Program.cs
  

var users = new List&lt;User&gt;
{
    new ("Robert", "Novak", 1770),
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Peter", "Novak", 990),
    new ("Albert", "Novak", 1930),
};

Console.WriteLine("sort descending by last name and salary");

var sortedUsers = from user in users
                  orderby user.LastName descending, user.Salary descending
                  select user;

foreach (var user in sortedUsers)
{
    Console.WriteLine(user);
}

Console.WriteLine("-------------------------");

Console.WriteLine("sort ascending by last name and salary");

var sortedUsers2 = from user in users
                   orderby user.LastName ascending, user.Salary ascending
                   select user;

foreach (var user in sortedUsers2)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, int Salary);

In the example, sort the users first by their last names, then by their
salaries.

var sortedUsers = from user in users
    orderby user.LastName descending, user.Salary descending
    select user;

Here, we sort the users by their last names and then by their salaries in
descending order. 

var sortedUsers2 = from user in users
    orderby user.LastName ascending, user.Salary ascending
    select user;

Here, we sort the users by their last names and then by their salaries in
ascending order. 

$ dotnet run
sort descending by last name and salary
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
User { FirstName = Robert, LastName = Novak, Salary = 1770 }
User { FirstName = Peter, LastName = Novak, Salary = 990 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
-------------------------
sort ascending by last name and salary
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Peter, LastName = Novak, Salary = 990 }
User { FirstName = Robert, LastName = Novak, Salary = 1770 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }

## C# query Reverse

The Reverse method inverts the order of the elements in a sequence.
(Note that this is not the same as sorting in descending order.)

Program.cs
  

int[] vals = { 1, 3, 6, 0, -1, 2, 9, 9, 8 };

var reversed = (from val in vals select val).Reverse();
Console.WriteLine(string.Join(", ", reversed));

In the example, we reverse the elements of an array using both method and query
syntax.

$ dotnet run
8, 9, 9, 2, -1, 0, 6, 3, 1

## C# LINQ group by

We can group data into categories based on a certain key.

Program.cs
  

var cars = new List&lt;Car&gt;
{
    new ("Audi", "red", 52642),
    new ("Mercedes", "blue", 57127),
    new ("Skoda", "black", 9000),
    new ("Volvo", "red", 29000),
    new ("Bentley", "yellow", 350000),
    new ("Citroen", "white", 21000),
    new ("Hummer", "black", 41400),
    new ("Volkswagen", "white", 21600),
};

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

In the example, we separate the available cars into groups by their colour.

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

In the following example, we perform a grouping and aggregation operations.

Program.cs
  

Revenue[] revenues = 
{
    new (1, "Q1", 2340),
    new (2, "Q1", 1200),
    new (3, "Q1", 980),
    new (4, "Q2", 340),
    new (5, "Q2", 780),
    new (6, "Q3", 2010),
    new (7, "Q3", 3370),
    new (8, "Q4", 540),
};

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
{
    new (1, "Q1", 2340),
    new (2, "Q1", 1200),
    new (3, "Q1", 980),
    new (4, "Q2", 340),
    new (5, "Q2", 780),
    new (6, "Q3", 2010),
    new (7, "Q3", 3370),
    new (8, "Q4", 540),
};

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

## C# LINQ word frequency

In the next example, we count the frequency of words in a file. 

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We use the King James Bible.

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

## C# LINQ join

The join clause joins sequences.

Program.cs
  

string[] basketA = { "coin", "book", "fork", "cord", "needle" };
string[] basketB = { "watches", "coin", "pen", "book", "pencil" };

var res = from item1 in basketA
          join item2 in basketB
          on item1 equals item2
          select item1;

foreach (var item in res)
{
    Console.WriteLine(item);
}

We have two arrays in the example. With the join clause, we find 
all items that are present in both arrays.

$ dotnet run
coin
book

The coin and book words are included in both arrays.

## C# query convertions

We can transform the returned enumerable into a list, array, or dictionary.

Program.cs
  

User[] users =
{
  new (1, "John", "London", "2001-04-01"),
  new (2, "Lenny", "New York", "1997-12-11"),
  new (3, "Andrew", "Boston", "1987-02-22"),
  new (4, "Peter", "Prague", "1936-03-24"),
  new (5, "Anna", "Bratislava", "1973-11-18"),
  new (6, "Albert", "Bratislava", "1940-12-11"),
  new (7, "Adam", "Trnava", "1983-12-01"),
  new (8, "Robert", "Bratislava", "1935-05-15"),
  new (9, "Robert", "Prague", "1998-03-14"),
};

string[] cities = (from user in users
                   select user.City).Distinct().ToArray();

Console.WriteLine(string.Join(", ", cities));

Console.WriteLine("------------");

List&lt;User&gt; inBratislava = (from user in users
                                 where user.City == "Bratislava"
                                 select user).ToList();

foreach (var user in inBratislava)
{
    Console.WriteLine(user);
}

Console.WriteLine("------------");

Dictionary&lt;int, string&gt; userIds =
        (from user in users
         select user).ToDictionary(user =&gt; user.id, user =&gt; user.Name);

foreach (var kvp in userIds)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

record User(int id, string Name, string City, string DateOfBirth);

We execute three queries on our data source; the resulting enumerable is 
transformed into a list, array, and dictionary.

string[] cities = (from user in users
                   select user.City).Distinct().ToArray();

In this query, we select all cities from the data source. We apply the 
Distinct method and finally call the ToArray method.

List&lt;User&gt; inBratislava = (from user in users
                                 where user.City == "Bratislava"
                                 select user).ToList();

Here we get a list of users who live in Bratislava; we call the ToList
method.

Dictionary&lt;int, string&gt; userIds =
        (from user in users
         select user).ToDictionary(user =&gt; user.id, user =&gt; user.Name);

In this query, we turn the user names and their ids into a dictionary.

$ dotnet run
London, New York, Boston, Prague, Bratislava, Trnava
------------
User { id = 5, Name = Anna, City = Bratislava, DateOfBirth = 1973-11-18 }
User { id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }
------------
1: John
2: Lenny
3: Andrew
4: Peter
5: Anna
6: Albert
7: Adam
8: Robert
9: Robert

## C# query XML

LINQ can be used to process XML.

Program.cs
  

using System.Xml.Linq;

string myXML = @"
&lt;Users&gt;
    &lt;User&gt;
        &lt;Name&gt;Jack Moore&lt;/Name&gt;
        &lt;Occupation&gt;programmer&lt;/Occupation&gt;
    &lt;/User&gt;
    &lt;User&gt;
        &lt;Name&gt;Paul Novak&lt;/Name&gt;
        &lt;Occupation&gt;driver&lt;/Occupation&gt;
    &lt;/User&gt;
    &lt;User&gt;
        &lt;Name&gt;Frank Woody&lt;/Name&gt;
        &lt;Occupation&gt;teacher&lt;/Occupation&gt;
    &lt;/User&gt;
    &lt;User&gt;
        &lt;Name&gt;Martina Doe&lt;/Name&gt;
        &lt;Occupation&gt;programmer&lt;/Occupation&gt;
    &lt;/User&gt;
    &lt;User&gt;
        &lt;Name&gt;Lucia Black&lt;/Name&gt;
        &lt;Occupation&gt;teacher&lt;/Occupation&gt;
    &lt;/User&gt;
&lt;/Users&gt;";

var xdoc = new XDocument();
xdoc = XDocument.Parse(myXML);

var data = from u in xdoc.Root.Descendants()
              where (string)u.Element("Occupation") == "teacher"
              select u.Element("Name");

foreach (var e in data)
{
    Console.WriteLine($"{e}");
}

We parse the XML data and choose all female names.

$ dotnet run
&lt;Name&gt;Frank Woody&lt;/Name&gt;
&lt;Name&gt;Lucia Black&lt;/Name&gt;

## C# query list directory contents

The Directory.EnumerateFiles returns an enumerable collection of
full file names that meet specified criteria.

Program.cs
  

var path = "/home/user2/";

var files = from file in Directory.EnumerateFiles(path, "*.txt",
                SearchOption.AllDirectories)
            where Path.GetFileName(file).ToLower().Contains("data")
            select file;

foreach (var file in files)
{
    Console.WriteLine("{0}", file);
}

Console.WriteLine("{0} files found.", files.Count&lt;string&gt;().ToString());

The example recursively searches for all text files, whose names contain the 
word data.

## C# query let clause

The let clause allows us to store the result of a sub-expression in
order to use it in subsequent clauses. 

data.csv
  

John Doe, gardener, 12/5/1997
Jane Doe, teacher, 5/16/1983
Robert Smith, driver, 4/2/2001
Maria Smith, cook, 9/21/1976

These are the contents of the data.csv file.

Program.cs
  

using System.Text;

var path = "data.csv";
var lines = File.ReadLines(path, Encoding.UTF8);

var users = from line in lines
            let fields = line.Replace(", ", ",").Split(",")
            select new User(fields[0], fields[1], DateTime.Parse(fields[2]));

var sorted = from user in users
             orderby user.DateOfBirth descending
             select user;

foreach (var user in sorted)
{
    Console.WriteLine(user);
}

public record User(string Name, string Occupation, DateTime DateOfBirth);

In the example, we parse the data.csv file and create a sequence
of users; the users are sorted by their date of birth in descending order. 

var users = from line in lines
    let fields = line.Replace(", ", ",").Split(",")
    select new User(fields[0], fields[1], DateTime.Parse(fields[2]));

In the first query expression, we split a line into its fields; the fields are
stored in the fields variable which is later used in the 
select clause. 

$ dotnet run
User { Name = Robert Smith, Occupation = driver, DateOfBirth = 4/2/2001 12:00:00 AM }
User { Name = John Doe, Occupation = gardener, DateOfBirth = 12/5/1997 12:00:00 AM }
User { Name = Jane Doe, Occupation = teacher, DateOfBirth = 5/16/1983 12:00:00 AM }
User { Name = Maria Smith, Occupation = cook, DateOfBirth = 9/21/1976 12:00:00 AM }

In this article we have worked with LINQ query expressions in C#.

## Source

[Query expression basics](https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/query-expression-basics)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).