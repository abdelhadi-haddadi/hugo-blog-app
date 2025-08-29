+++
title = "C# sort List"
date = 2025-08-29T19:51:24.388+01:00
draft = false
description = "C# sort List tutorial shows how to sort list elements in C# language. The tutorial provides numerous examples to demonstrate sorting in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# sort List

last modified January 31, 2024

 

C# sort list tutorial shows how to sort list elements in C# language.

## Sorting

In computer science, sorting is arranging elements in an ordered sequence. Over
the years, several algorithms were developed to perform sorting on data,
including merge sort, quick sort, selection sort, or bubble sort. (The other
meaning of sorting is categorizing; it is grouping elements with similar
properties.)

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called shuffling.

Data can be sorted alphabetically or numerically. The sort key specifies the
criteria used to perform the sort. It is possible to sort objects by multiple
keys. For instance, when sorting users, the names of the users could be used as
primary sort key, and their occupation as the secondary sort key.

**Note: ** In C#, we can sort list elements with the built-in
Sort method or use LINQ's OrderBy.

## Sorting order

A standard order is called the ascending order: a to z, 0 to 9. The reverse
order is called the descending order: z to a, 9 to 0. For dates and times,
ascending means that earlier values precede later ones e.g. 1/1/2020 will sort
ahead of 1/1/2021.

## Stable sort

A stable sort is one where the initial order of equal elements is preserved.
Some sorting algorithms are naturally stable, some are unstable. For instance,
the merge sort and the bubble sort are stable sorting algorithms. On the other
hand, heap sort and quick sort are examples of unstable sorting algorithms.

Consider the following values: 3715593. A stable
sorting produces the following: 1335579. The ordering
of the values 3 and 5 is kept. An unstable sorting may produce the following:
1335579.

C# internally uses a stable sort algorithm.

## Sorting in C#

In C#, we can do sorting using the built-in
Sort/OrderBy methods with the Comparison
delegate, the IComparer, and IComparable interfaces.

## C# List Sort method

The Sort method sorts the elements or a portion of the elements in
the list.

The method has four overloads:

    Sort(Comparison&lt;T&gt;) - Sorts the elements in the entire
    List&lt;T&gt; using the specified Comparison&lt;T&gt;.
    Sort(Int32, Int32, IComparer&lt;T&gt;) - Sorts the elements in a range
    of elements in List&lt;T&gt; using the specified comparer.
    Sort() - Sorts the elements in the entire List&lt;T&gt; using the
    default comparer.
    Sort(IComparer&lt;T&gt;) - Sorts the elements in the entire
    List&lt;T&gt; using the specified comparer.

**Note:** The Sort method sorts the list in-place,
while the LINQ's OrderBy method returns a sorted enumeration of
list elements.

## The comparison method

The sorting algorithms are already built into the standard library of the
language. If the data is not sorted naturally, we need to provide a comparison
method (either a class method or a lambda expression) which tells the underlying
sorting algorithm how to sort the data. What attributes to sort and in what way.

public int CompareTo(Card other)
{
    var index = Rank.CompareTo(other.Rank);
    if (index == 0) index = Suit.CompareTo(other.Suit);
    return index;
}

For instance, this comparison class method tells to sort the objects by
the Rank and if the rank is the same, then by Suit.
We always compare two elements; in our case, two card objects. The comparison
method returns 0 in case the elements are equal, -1 when the first element is
less than the second, and 1 when the first element is greater than the second.

Oftentimes, our comparison function calls other comparison functions; in our
case, the Rank and the Suit are enumerations and we
compare them by the built-in CompareTo method.

## C# List sort integers

The following example sorts integers.

Program.cs
  

List&lt;int&gt; nums = [2, 1, 8, 0, 4, 3, 5, 7, 9];

nums.Sort();
Console.WriteLine(string.Join(",", nums));

nums.Reverse();
Console.WriteLine(string.Join(",", nums));

C# is using a default comparer method to sort integers numerically. The
Sort method orders the integers in ascending order, while the
Reverse method in descending order.

$ dotnet run
0,1,2,3,4,5,7,8,9
9,8,7,5,4,3,2,1,0

The following example sorts integers with LINQ. In LINQ, we can choose between
the query syntax or the method syntax.

Program.cs
  

List&lt;int&gt; nums = [2, 1, 8, 0, 4, 3, 5, 7, 9];

var enum1 = from num in nums
            orderby num
            select num;

foreach (var e in enum1)
{
    Console.Write($"{e} ");
}

Console.WriteLine();

var enum2 = from num in nums
            orderby num descending
            select num;

foreach (var e in enum2)
{
    Console.Write($"{e} ");
}

Console.WriteLine();

The example sorts integers in ascending and descending order using LINQ's query
syntax.

$ dotnet run
0 1 2 3 4 5 7 8 9
9 8 7 5 4 3 2 1 0

## C# List sort strings

Like integers, strings are sorted by Sort alphabetically by default
without any additional effort.

Program.cs
  

List&lt;string&gt; words = ["falcon", "order", "war",
    "sky", "ocean", "blue", "cloud", "boy"];

words.Sort();
Console.WriteLine(string.Join(",", words));

words.Reverse();
Console.WriteLine(string.Join(",", words));

The example sorts strings in ascending and descending order.

$ dotnet run
blue,boy,cloud,falcon,ocean,order,sky,war
war,sky,order,ocean,falcon,cloud,boy,blue

## C# List sort accented strings

In order to sort accented strings, we need to provide the appropriate
CultureInfo.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");

List&lt;string&gt; words = [ "čaj", "auto", "drevo", "cibuľa",
    "čučoriedka", "banán", "čerešňa", "červený", "čierny", "cesnak" ];

words.Sort();

foreach (var word in words)
{
    Console.WriteLine(word);
}

The example sorts Slovak words. Slovak language has many accented characters
such as č or ň.

$ dotnet run
auto
banán
cesnak
cibuľa
čaj
čerešňa
červený
čierny
čučoriedka
drevo

The words are sorted correctly according to the Slovak norm.

## C# List sort by string length

The following example sorts the list of words by the words' length.

Program.cs
  

List&lt;string&gt; words = ["falcon", "order", "war",
    "sky", "ocean", "blue", "cloud", "boy", "by", "raven",
    "station", "batallion"];

words.Sort((a, b) =&gt; a.Length.CompareTo(b.Length));
Console.WriteLine(string.Join(",", words));

words.Sort((a, b) =&gt; b.Length.CompareTo(a.Length));
Console.WriteLine(string.Join(",", words));

We need to provide our own comparison method to do the job.

words.Sort((a, b) =&gt; a.Length.CompareTo(b.Length));
Console.WriteLine(string.Join(",", words));

We provide an anonymous method to the Sort method. This method
uses the CompareTo method of the integer type to compare the
two values. The length of the words is returned with the Length
property.

$ dotnet run
by,war,sky,boy,blue,order,ocean,cloud,raven,falcon,station,batallion
batallion,station,falcon,order,ocean,cloud,raven,blue,war,sky,boy,by

The following example does the same thing with LINQ.

Program.cs
  

List&lt;string&gt; words = ["falcon", "order", "war",
    "sky", "ocean", "blue", "cloud", "boy", "by", "raven",
    "station", "batallion"];

var res = from word in words
          orderby word.Length
          ascending
          select word;

foreach (var word in res)
{
    Console.WriteLine(word);
}

var res2 = from word in words
           orderby word.Length
           descending
           select word;

foreach (var word in res2)
{
    Console.WriteLine(word);
}

In the example, we sort the words by their length in asceding and descending
order using LINQ query expressions.

## C# List sort names by surname

When we want to sort names by their surname, assuming that the whole name is a
single string, we need to provide a custom comparison method.

Program.cs
  

List&lt;string&gt; names = ["John Doe", "Lucy Smith",
    "Benjamin Young", "Robert Brown", "Thomas Moore",
    "Linda Black", "Adam Smith", "Jane Smith"];

names.Sort((n1, n2) =&gt; n1.Split(" ")[1].CompareTo(n2.Split(" ")[1]));
Console.WriteLine(string.Join(",", names));

To solve this, we split the string into two parts and compare the second part
of the string in a lambda expression.

$ dotnet run
Linda Black
Robert Brown
John Doe
Thomas Moore
Lucy Smith
Adam Smith
Jane Smith
Benjamin Young

Note that the order of the Smiths is kept; this is an example of a stable
sorting algorithm.

The following example provides a LINQ solution.

Program.cs
  

List&lt;string&gt; names = ["John Doe", "Lucy Smith",
    "Benjamin Young", "Robert Brown", "Thomas Moore",
    "Linda Black", "Adam Smith", "Jane Smith"];

var res = from name in names
          orderby name.Split(" ")[1]
          ascending
          select name;

foreach (var name in res)
{
    Console.WriteLine(name);
}

The example sorts the names by their surname using LINQ query expression syntax.

## C# List sort case insensitive

To compare strings in a case insensitive manner, we can use the built-in
StringComparer.OrdinalIgnoreCase.

Program.cs
  

List&lt;string&gt; words =
[
    "world", "War", "abbot", "Caesar", "castle", "sky", "den",
    "forest", "ocean", "water", "falcon", "owl", "rain", "Earth"
];

words.Sort(StringComparer.OrdinalIgnoreCase);
words.ForEach(Console.WriteLine);

The example sorts a list of words in case insensitive order.

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

## C# List sort with Comparison

The Comparison delegate represents the method that compares two
objects of the same type.

Program.cs
  

List&lt;(string, int)&gt; employees =
[
    ("John Doe", 1230),
    ("Adam Novak", 670),
    ("Robin Brown", 2300),
    ("Rowan Cruise", 990),
    ("Joe Draker", 1190),
    ("Janet Doe", 980),
    ("Lucy Smith", 980),
    ("Thomas Moore", 1400)
];

employees.Sort(delegate ((string, int) emp1, (string, int) emp2)
{
    return emp1.Item2.CompareTo(emp2.Item2);
});

Console.WriteLine(string.Join(Environment.NewLine, employees));

In the example, we sort a list of users using an anonymous delegate. Users are
sorted by salaries in asceding order.

$ dotnet run
(Adam Novak, 670)
(Janet Doe, 980)
(Lucy Smith, 980)
(Rowan Cruise, 990)
(Joe Draker, 1190)
(John Doe, 1230)
(Thomas Moore, 1400)
(Robin Brown, 2300)

In the next example, we change the delegate to to lambda expression.

Program.cs
  

List&lt;(string, int)&gt; employees =
[
    ("John Doe", 1230),
    ("Adam Novak", 670),
    ("Robin Brown", 2300),
    ("Rowan Cruise", 990),
    ("Joe Draker", 1190),
    ("Janet Doe", 980),
    ("Lucy Smith", 980),
    ("Thomas Moore", 1400)
];

employees.Sort((e1, e2) =&gt;
{
    return e2.Item2.CompareTo(e1.Item2);
});

Console.WriteLine(string.Join(Environment.NewLine, employees));

In the example, the users are sorted by salaries in descending order.

$ dotnet run
(Robin Brown, 2300)
(Thomas Moore, 1400)
(John Doe, 1230)
(Joe Draker, 1190)
(Rowan Cruise, 990)
(Janet Doe, 980)
(Lucy Smith, 980)
(Adam Novak, 670)

## C# List sort with IComparable

The IComparable interface defines a generalized type-specific
comparison method that a value type or class implements to order or sort its
instances.

The IComparable interface is best suited for smaller, compact types
for which the sorting is obvious.

Program.cs
  

List&lt;Employee&gt; employees =
[
    new ("John Doe", 1230),
    new ("Adam Novak", 670),
    new ("Robin Brown", 2300),
    new ("Rowan Cruise", 990),
    new ("Joe Draker", 1190),
    new ("Janet Doe", 980),
    new ("Lucy Smith", 980),
    new ("Thomas Moore", 1400)
];

employees.Sort();

Console.WriteLine(string.Join(Environment.NewLine, employees));

record Employee(string Name, int Salary) : IComparable&lt;Employee&gt;
{
    public int CompareTo(Employee? other)
    {
        if (other == null) return 1;
        return other.Salary.CompareTo(Salary);
    }
};

We have an Employee record with a built-in comparison method which
sorts the employees by their salary in ascending order.

$ dotnet run
Employee { Name = Robin Brown, Salary = 2300 }
Employee { Name = Thomas Moore, Salary = 1400 }
Employee { Name = John Doe, Salary = 1230 }
Employee { Name = Joe Draker, Salary = 1190 }
Employee { Name = Rowan Cruise, Salary = 990 }
Employee { Name = Janet Doe, Salary = 980 }
Employee { Name = Lucy Smith, Salary = 980 }
Employee { Name = Adam Novak, Salary = 670 }

## C# List sort with IComparer

The IComparer interface defines a comparison method that a value
type or class implements to order or sort its instances.

With IComparer we have more flexibility; we can define multiple
comparers or update existing ones without touching the type itself. Also, it has
a more clean design, since we separate the sorting implementation from the type.

Program.cs
  

List&lt;(string, int)&gt; employees =
[
    ("John Doe", 1230),
    ("Adam Novak", 670),
    ("Robin Brown", 2300),
    ("Rowan Cruise", 990),
    ("Joe Draker", 1190),
    ("Janet Doe", 980),
    ("Lucy Smith", 980),
    ("Thomas Moore", 1400)
];

employees.Sort(new SurnameComparer());
employees.ForEach(employee =&gt; Console.WriteLine(employee));

class SurnameComparer : IComparer&lt;(string, int)&gt;
{
    public int Compare((string, int) e1, (string, int) e2)
    {
        return  e1.Item1.Split()[1].CompareTo(e2.Item1.Split()[1]);
    }
}

In the example, we sort the employees by their surnames.

$ dotnet run
(Robin Brown, 2300)
(Rowan Cruise, 990)
(John Doe, 1230)
(Janet Doe, 980)
(Joe Draker, 1190)
(Thomas Moore, 1400)
(Adam Novak, 670)
(Lucy Smith, 980)

## C# List sort tuples

The following example sorts a list of tuples.

Program.cs
  

List&gt;(string Name, int Grade)&gt; data =
[
    ("Patrick", 89),
    ("Lucia", 92),
    ("Veronika", 72),
    ("Robert", 78),
    ("Maria", 65),
    ("Andrea", 51),
    ("Ondrej", 45)
];

data.Sort((s1, s2) =&gt; s1.Grade.CompareTo(s2.Grade));
Console.WriteLine(string.Join(", ", data));

data.Sort((s1, s2) =&gt; s2.Grade.CompareTo(s1.Grade));
Console.WriteLine(string.Join(", ", data));

In the example, we have a list of tuples representing students and their grades.
We sort the tuples by grade in ascending and descending order.

$ dotnet run
(Ondrej, 45), (Andrea, 51), (Maria, 65), (Veronika, 72), (Robert, 78), ...
(Lucia, 92), (Patrick, 89), (Robert, 78), (Veronika, 72), (Maria, 65), ...

## C# List sort objects

In the following example, we sort a list of User objects.

Program.cs
  

List&lt;User&gt; users = [
    new ("John", "Doe", 1230),
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
];

users.Sort((u1, u2) =&gt; u1.LastName.CompareTo(u2.LastName));
users.ForEach(Console.WriteLine);

record User(string FirstName, string LastName, int Salary);

We have a list of user objects. The user has three attributes: first name, last
name, and salary. We sort the list by users' last names.

users.Sort((u1, u2) =&gt; u1.LastName.CompareTo(u2.LastName));

In the lambda expression, we compare the LastName property of the
two elements.

$ dotnet run
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }

Next we sort users by their salaries.

Program.cs
  

List&lt;User&gt; users = [
    new ("John", "Doe", 1230),
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
];

Console.WriteLine("sort ascending by salary");

var enum1 = from user in users
            orderby user.Salary
            select user;

foreach (var e in enum1)
{
    Console.WriteLine(e);
}

Console.WriteLine("--------------------------");

Console.WriteLine("sort descending by salary");

var enum2 = from user in users
            orderby user.Salary descending
            select user;

foreach (var e in enum2)
{
    Console.WriteLine(e);
}

record User(string FirstName, string LastName, int Salary);

The example sorts a list of user objects by users' salaries. It uses the LINQ
query syntax.

$ dotnet run
sort ascending by salary
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
--------------------------
sort descending by salary
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }

## C# List sort DateTime

In the following example, we sort a list of users by their birthdays.

Program.cs
  

List&lt;User&gt; users = [
    new ("John", "Doe", new DateTime(1983, 9, 4)),
    new ("Lucy", "Novak", new DateTime(1978, 11, 18)),
    new ("Ben", "Walter", new DateTime(1998, 12, 1)),
    new ("Robin", "Brown", new DateTime(2001, 2, 14)),
    new ("Joe", "Draker", new DateTime(1980, 1, 10)),
    new ("Janet", "Doe", new DateTime(1967, 8, 23)),
];

Console.WriteLine("sort ascending by birthday");
users.Sort((u1, u2) =&gt; DateTime.Compare(u1.Birthday, u2.Birthday));
users.ForEach(Console.WriteLine);

Console.WriteLine("--------------------------");
Console.WriteLine("sort descending by birthday");

var enum1 = users.OrderByDescending(e =&gt; e.Birthday);
foreach (var u in enum1)
{
    Console.WriteLine(u);
}

Console.WriteLine("--------------------------");
Console.WriteLine("sort ascending by birthday");

var enum2 = from user in users
            orderby user.Birthday
            select user;

foreach (var u in enum2)
{
    Console.WriteLine(u);
}

record User(string FirstName, string LastName, DateTime Birthday);

In the example, we sort the list of user objects by their birthdays using
the Sort method, and using LINQ query syntax and method syntax.

$ dotnet run
sort ascending by birthday
User { FirstName = Janet, LastName = Doe, Birthday = 8/23/1967 12:00:00 AM }
User { FirstName = Lucy, LastName = Novak, Birthday = 11/18/1978 12:00:00 AM }
User { FirstName = Joe, LastName = Draker, Birthday = 1/10/1980 12:00:00 AM }
User { FirstName = John, LastName = Doe, Birthday = 9/4/1983 12:00:00 AM }
User { FirstName = Ben, LastName = Walter, Birthday = 12/1/1998 12:00:00 AM }
User { FirstName = Robin, LastName = Brown, Birthday = 2/14/2001 12:00:00 AM }
--------------------------
sort descending by birthday
User { FirstName = Robin, LastName = Brown, Birthday = 2/14/2001 12:00:00 AM }
User { FirstName = Ben, LastName = Walter, Birthday = 12/1/1998 12:00:00 AM }
User { FirstName = John, LastName = Doe, Birthday = 9/4/1983 12:00:00 AM }
User { FirstName = Joe, LastName = Draker, Birthday = 1/10/1980 12:00:00 AM }
User { FirstName = Lucy, LastName = Novak, Birthday = 11/18/1978 12:00:00 AM }
User { FirstName = Janet, LastName = Doe, Birthday = 8/23/1967 12:00:00 AM }
--------------------------
sort ascending by birthday
User { FirstName = Janet, LastName = Doe, Birthday = 8/23/1967 12:00:00 AM }
User { FirstName = Lucy, LastName = Novak, Birthday = 11/18/1978 12:00:00 AM }
User { FirstName = Joe, LastName = Draker, Birthday = 1/10/1980 12:00:00 AM }
User { FirstName = John, LastName = Doe, Birthday = 9/4/1983 12:00:00 AM }
User { FirstName = Ben, LastName = Walter, Birthday = 12/1/1998 12:00:00 AM }
User { FirstName = Robin, LastName = Brown, Birthday = 2/14/2001 12:00:00 AM }

## C# List sort objects by multiple fields

The following example sorts user objects by multiple fields.

Program.cs
  

List&lt;User&gt; users = [
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
];

users.Sort((u1, u2) =&gt;
{
    int result = u1.LastName.CompareTo(u2.LastName);
    return result == 0 ? u1.Salary.CompareTo(u2.Salary) : result;
});

Console.WriteLine("sort ascending by last name and salary");

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, int Salary);

In the example, we sort users first by last names and then by salaries.

users.Sort((u1, u2) =&gt;
{
    int result = u1.LastName.CompareTo(u2.LastName);
    return result == 0 ? u1.Salary.CompareTo(u2.Salary) : result;
});

First, the users are compared by their LastName property. If
the comparison returns 0, that is their last names are equal, we compare their
salaries.

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

The next example sorts by multiple fields with LINQ methods.

Program.cs
  

List&lt;User&gt; users = [
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

var enum1 = users.OrderBy(u =&gt; u.LastName).ThenBy(u =&gt; u.Salary);

foreach (var user in enum1)
{
    Console.WriteLine(user);
}

record User(string FirstName, string LastName, int Salary);

The users are sorted with OrderBy and ThenBy methods.

## C# List sort by rating

Image that we have a rating system which cannot be sorted alphabetically.
For instance, rating can have values such as C, C+, C-. One solution is to
use enumerations.

Program.cs
  

List&lt;Product&gt; products = [
    new() { Name = "Product A", ProdRat = Rating.A },
    new() { Name = "Product B", ProdRat = Rating.AMinus },
    new() { Name = "Product C", ProdRat = Rating.B },
    new() { Name = "Product D", ProdRat = Rating.APlus },
    new() { Name = "Product E", ProdRat = Rating.D },
    new() { Name = "Product F", ProdRat = Rating.C },
    new() { Name = "Product G", ProdRat = Rating.CMinus },
    new() { Name = "Product G", ProdRat = Rating.CPlus },
];

Console.WriteLine("sorted by rating ascending");
products.Sort((p1, p2) =&gt; p1.ProdRat.CompareTo(p2.ProdRat));

foreach (var product in products)
{
    Console.WriteLine(product);
}

Console.WriteLine("---------------------");

Console.WriteLine("sorted by rating descending");
products.Sort((p1, p2) =&gt; p2.ProdRat.CompareTo(p1.ProdRat));

foreach (var product in products)
{
    Console.WriteLine(product);
}

enum Rating
{
    D,
    DPlus,
    CMinus,
    C,
    CPlus,
    B,
    BPlus,
    BMinus,
    AMinus,
    A,
    APlus
}

class Product
{
    private readonly Dictionary&lt;Rating, string&gt; ratings = new()
    {
        {Rating.APlus, "A+"}, {Rating.A, "A"}, {Rating.AMinus, "A-"},
        {Rating.BPlus, "B+"}, {Rating.B, "B"}, {Rating.BMinus, "B-"},
        {Rating.CPlus, "C+"}, {Rating.C, "C"}, {Rating.CMinus, "C-"},
        {Rating.DPlus, "D+"}, {Rating.D, "D"}
    };

    public string? Name { get; init; }
    public Rating ProdRat { get; init; }

    public override string ToString()
    {
        return $"{Name} has rating {ratings[ProdRat]}";
    }
}

In the example, we sort products by their ratings.

products.Sort((p1, p2) =&gt; p1.ProdRat.CompareTo(p2.ProdRat));

In the lambda expression, we compare the product ranking enumerations with
CompareTo.

enum Rating
{
    D,
    DPlus,
    CMinus,
    C,
    CPlus,
    B,
    BPlus,
    BMinus,
    AMinus,
    A,
    APlus
}

We have an enumeration of ratings. Internally, the values are given integer
numbers where Rating.D has the lowest value and Rating.APlus the highest.

private readonly Dictionary&lt;Rating, string&gt; ratings = new()
{
    {Rating.APlus, "A+"}, {Rating.A, "A"}, {Rating.AMinus, "A-"},
    {Rating.BPlus, "B+"}, {Rating.B, "B"}, {Rating.BMinus, "B-"},
    {Rating.CPlus, "C+"}, {Rating.C, "C"}, {Rating.CMinus, "C-"},
    {Rating.DPlus, "D+"}, {Rating.D, "D"}
};

In this dictionary, we assign string representations to our ranking enums.

$ dotnet run
sorted by rating ascending
Product E has rating D
Product G has rating C-
Product F has rating C
Product G has rating C+
Product C has rating B
Product B has rating A-
Product A has rating A
Product D has rating A+
---------------------
sorted by rating descending
Product D has rating A+
Product A has rating A
Product B has rating A-
Product C has rating B
Product G has rating C+
Product F has rating C
Product G has rating C-
Product E has rating D

The products are sorted by their ratings in ascending and descending orders.

## C# List sort cards

In the next example, we sort cards. The Card object implements
the IComparable iterface. The interface is used in cases where
natural ordering of objects is possible.

In Poker and similar card games, the card value is determined by its rank.
And if needed, by its suit. There is only one possible way of sorting cards in
Poker; therefore, we can use the IComparable interface.

Program.cs
  

List&lt;Card&gt; cards =
[
    new (Rank.King, Suit.Diamonds),
    new (Rank.Five, Suit.Hearts),
    new (Rank.Ace, Suit.Clubs),
    new (Rank.Nine, Suit.Spades),
    new (Rank.Jack, Suit.Spades),
    new (Rank.Jack, Suit.Diamonds)
];

cards.Sort();

foreach (var card in cards)
{
    Console.WriteLine(card);
}

enum Rank
{
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace
}

enum Suit
{
    Clubs,
    Diamonds,
    Hearts,
    Spades
}

class Card(Rank rank, Suit suit) : IComparable&lt;Card&gt;
{
    private Rank Rank { get; set; } = rank;
    private Suit Suit { get; set; } = suit;

    public int CompareTo(Card? other)
    {
        if (other == null) return 1;

        var index = Rank.CompareTo(other.Rank);
        if (index == 0) index = Suit.CompareTo(other.Suit);

        return index;
    }

    public override string ToString()
    {
        return $"{Rank} of {Suit}";
    }
}

In the example, we sort cards.

List&lt;Card&gt; cards =
[
    new (Rank.King, Suit.Diamonds),
    new (Rank.Five, Suit.Hearts),
    new (Rank.Ace, Suit.Clubs),
    new (Rank.Nine, Suit.Spades),
    new (Rank.Jack, Suit.Spades),
    new (Rank.Jack, Suit.Diamonds)
];

We have a list of six cards that we want to sort.

class Card : IComparable&lt;Card&gt;

The Card implements the IComparable interface.
This forces us to implement its CompareTo method.

public int CompareTo(Card? other)
{
    if (other == null) return 1;

    var index = Rank.CompareTo(other.Rank);
    if (index == 0) index = Suit.CompareTo(other.Suit);

    return index;
}

In the CompareTo method, we first compare the rank of the card.
If the rank is the same, we compare the suit.

cards.Sort();

Without any parameters, the Sort method calls the built-in
CompareTo to sort the data.

$ dotnet run
Five of Hearts
Nine of Spades
Jack of Diamonds
Jack of Spades
King of Diamonds
Ace of Clubs

We have two cards of the same rank -- Jacks. The Jack of Spades has a higher
rank that the Jack of Diamonds.

## Source

[List.Sort Method](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.sort?view=net-8.0)

In this article we sorted list elements in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).