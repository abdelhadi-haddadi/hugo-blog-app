+++
title = "C# Predicate"
date = 2025-08-29T19:51:14.173+01:00
draft = false
description = "C# Predicate tutorial shows how to use predicates in several C# predicate examples. With C# predicates, we can create code that is more clean and readable."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Predicate

last modified January 16, 2023

 

In this article we show how to use predicates in C#. With predicates, we
can create code that is more clean and readable.

## Predicate

Predicate in general meaning is a statement about something that is
either true or false. In programming, predicates represent single argument
functions that return a boolean value.

## C# Predicate

Predicates in C# are implemented with delegates. The Predicate
delegate represents the method that defines a set of criteria and determines
whether the specified object meets those criteria.

## C# Predicate example

The following example creates a simple C# Predicate.

Program.cs
  

List&lt;int&gt; data = [1, -2, 3, 0, 2, -1];

var predicate = new Predicate&lt;int&gt;(isPositive);
var filtered = data.FindAll(predicate);

Console.WriteLine(string.Join(",", filtered));

bool isPositive(int val)
{
    return val &gt; 0;
}

In the example, the predicate is used to filter out positive values.

var predicate = new Predicate&lt;int&gt;(IsPositive);

A predicate delegate is defined; it takes the IsPositive method
as parameter.

var filtered = data.FindAll(predicate);

We pass the predicate to the FindAll method of a list, which
retrieves all values for which the predicate returns true.

bool IsPositive(int val)
{
   return val &gt; 0;
}

The IsPositive returs true for all values greater than zero.

$ dotnet run
1,3,2

## C# Predicate with anonymous method

The following example passes an anonymous method to the delegate.

Program.cs
  

List&lt;int&gt; data = [1, -2, 3, 0, 2, -1];

Predicate&lt;int&gt; isPositive = delegate(int val) { return val &gt; 0; };
var filtered = data.FindAll(isPositive);

Console.WriteLine(string.Join(",", filtered));

The example uses the delegate keyword to define an anonymous
method.

## C# Predicate with lambda expression

C# lambda expression simplifies the creation of C# Predicates. Lambda
expressions are created with the =&gt; lambda declaration operator.

Program.cs
  

List&lt;string&gt; words = [ "falcon", "wood", "tree", "rock", "cloud", "rain" ];

Predicate&lt;string&gt; hasFourChars = word =&gt; word.Length == 4;

var words2 = words.FindAll(hasFourChars);
Console.WriteLine(string.Join(',', words2));

In the example, we find out all words that have four letters.

$ dotnet run
wood,tree,rock,rain

## C# Predicate with Exists

The Exists method of a list determines whether the list contains
elements that match the conditions defined by the specified predicate.

Program.cs
  

List&lt;string&gt; words = [ "sky", "", "club", "spy", "silk", "summer",
        "war", "cup", "cloud", "coin", "small", "terse", "",
        "snow", "snail", "see"];

Predicate&lt;string&gt; pred = string.IsNullOrEmpty;

if (words.Exists(pred))
{
    Console.WriteLine("There is an empty string");
}
else
{
    Console.WriteLine("There is no empty string");
}

We check if there are some empty strings in the list.

$ dotnet run 
There is an empty string

## C# Predicate with RemoveAll

The RemoveAll method of a list removes all the elements that match
the conditions defined by the specified predicate.

Program.cs
  

List&lt;string&gt; words = ["sky", "town", "club", "spy", "silk", "snail",
        "war", "cup", "cloud", "coin", "small", "terse"];

Predicate&lt;string&gt; HasThreeChars = word =&gt; word.Length == 3;

words.RemoveAll(HasThreeChars);

Console.WriteLine(string.Join(", ", words));

We have a list of words. We remove all words which have three latin characters.

$ dotnet run 
town, club, silk, snail, cloud, coin, small, terse

## C# Predicate multiple conditions

The next example uses a predicate with two conditions. 

Program.cs
  

List&lt;Country&gt; countries =
[
    new ("Iran", 80840713),
    new ("Hungary", 9845000),
    new ("Poland", 38485000),
    new ("India", 1342512000),
    new ("Latvia", 1978000),
    new ("Vietnam", 95261000),
    new ("Sweden", 9967000),
    new ("Iceland", 337600),
    new ("Israel", 8622000)
];

Predicate&lt;Country&gt; p1 = c =&gt; c.Name.StartsWith('I');
Predicate&lt;Country&gt; p2 = c =&gt; c.Population &gt; 1000_0000;

Predicate&lt;Country&gt; CombineAnd = c =&gt; p1(c) &amp;&amp; p2(c);

var result = countries.FindAll(CombineAnd);
Console.WriteLine(string.Join(", ", result));

record Country(string Name, int Population);

We create a list of countries. We find all countries that start with 'I' and 
have population over one million.

Predicate&lt;Country&gt; p1 = c =&gt; c.Name.StartsWith('I');
Predicate&lt;Country&gt; p2 = c =&gt; c.Population &gt; 1000_0000;

We define two predicates. 

Predicate&lt;Country&gt; CombineAnd = c =&gt; p1(c) &amp;&amp; p2(c);

We combine the two predicates.

var result = countries.FindAll(CombineAnd);

We apply the combined predicate to the FindAll method.

$ dotnet run
Country { Name = Iran, Population = 80840713 }, Country { Name = India, ...

## C# negating predicates

We can create a delegate that negates an already defined delegate.

Program.cs
  

List&lt;string&gt; words = [ "falcon", "wood", "tree", "rock", "cloud", "rain" ];

Predicate&lt;string&gt; HasFourChars = word =&gt; word.Length == 4;
Predicate&lt;string&gt; Negate = word =&gt; !HasFourChars(word);

var words2 = words.FindAll(Negate);

Console.WriteLine(string.Join(',', words2));

// Predicate&lt;T&gt; Negate&lt;T&gt;(Predicate&lt;T&gt; predicate)
// {
//    return x =&gt; !predicate(x);
// }

The example negates the HasFourChars delegate. An alternative
solution is commented out.

$ dotnet run
falcon,cloud

These are the words whose length is not four letters.

## C# predicate with Func

The Func is a generic delegate type. It can contain 0 to 16 input
parameters and must have one return type. Predicate is a
specialization of Func.

Program.cs
  

List&lt;Person&gt; data =
[
    new ("John Doe", "gardener"),
    new ("Robert Brown", "programmer"),
    new ("Lucia Smith", "teacher"),
    new ("Thomas Neuwirth", "teacher")
];

ShowOutput(data, r =&gt; r.Occupation == "teacher");

void ShowOutput(List&lt;Person&gt; list, Func&lt;Person, bool&gt; condition)
{
    var data = list.Where(condition);

    foreach (var person in data)
    {
        Console.WriteLine($"{person.Name}, {person.Occupation}");
    }
}

record Person(string Name, string Occupation);

The example creates a list of persons. The ShowOutput method takes
a predicate as the second parameter. It returns all persons who are teachers.

## C# Predicate with Array.FindAll

The Array.FindAll method retrieves all the elements that match the
conditions defined by the specified predicate.

Program.cs
  

User[] users =
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

var age = 60;
Predicate&lt;User&gt; olderThan = e =&gt; GetAge(e) &gt; age;

var res = Array.FindAll(users, olderThan);

foreach (var e in res)
{
    Console.WriteLine(e);
}

int GetAge(User user)
{    
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int) Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

record User(int Id, string Name, string City, string DateOfBirth);

We get all users that are older than 60.

Predicate&lt;User&gt; olderThan = e =&gt; GetAge(e) &gt; age;

In the predicate definition, we uset the GetAge method to determine 
the age of the user.

var res = Array.FindAll(users, olderThan);

The Array.FindAll method retrieves all the elements that match the
conditions defined by the specified predicate.

int GetAge(User user)
{    
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int) Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

The GetAge method parses the date of birth string and computes the 
current age.

$ dotnet run
User { Id = 4, Name = Peter, City = Prague, DateOfBirth = 1936-03-24 }
User { Id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { Id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }

## C# generic FindAll

Next, we define a FindAll list extension method. 

ExtensionMethods
  

public static class ExtensionMethods
{
    public static List&lt;T&gt; FindAll&lt;T&gt;(this List&lt;T&gt; vals, List&lt;Predicate&lt;T&gt;&gt; preds)
    {
        List&lt;T&gt; data = new List&lt;T&gt;();

        foreach (T e in vals)
        {
            bool pass = true;

            foreach (Predicate&lt;T&gt; p in preds)
            {
                if (!(p(e)))
                {
                    pass = false;
                    break;
                }
            }

            if (pass) data.Add(e);
        }

        return data;
    }
}

The FindAll method returns list elements that fill all the
specified predicates.

public static List&lt;T&gt; FindAll&lt;T&gt;(this List&lt;T&gt; vals, List&lt;Predicate&lt;T&gt;&gt; preds)

The FindAll method takes a list of generic predicate functions as 
a parameter. It returns a filtered generic list.

Program.cs
  

List&lt;Predicate&lt;int&gt;&gt; preds = [e =&gt; e &gt; 0, e =&gt; e % 2 == 0];

List&lt;int&gt; vals = [-3, -2, -1, 0, 1, 2, 3, 4];
var filtered = vals.FindAll(preds);

foreach (var e in filtered)
{
    Console.WriteLine(e);
}

Console.WriteLine("---------------------");

List&lt;string&gt; words = ["sky", "wrath", "wet", "sun", "pick", "who",
    "cloud", "war", "water", "jump", "ocean"];

List&lt;Predicate&lt;string&gt;&gt; preds2 = [e =&gt; e.StartsWith('w'), e =&gt; e.Length == 3];

var filtered2 = words.FindAll(preds2);

foreach (var e in filtered2)
{
    Console.WriteLine(e);
}

We define two lists: an integer list and a string list. From the integer list, 
we filter out all positive even values. From the string list, we get all words 
that start with 'w' and have three letters.

$ dotnet run 
2
4
---------------------
wet
who
war

## Source

[Predicate delegate](https://learn.microsoft.com/en-us/dotnet/api/system.predicate-1?view=net-8.0)

In this article we have worked with C# Predicate.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).