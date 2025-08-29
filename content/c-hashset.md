+++
title = "C# HashSet"
date = 2025-08-29T19:50:50.899+01:00
draft = false
description = "C# HashSet tutorial shows how to work with a HashSet collection in C#. A HashSet collection represents a set of values."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# HashSet

last modified January 19, 2024

 

In this article we show how to work with a HashSet collection in C#. 

## HashSet

HashSet represents a set of values. It contains no duplicate
elements. The collection models the mathematical set abstraction.

HashSet does not provide ordering of elements. If we need to
maintain order, we can use the SortedSet collection.

## C# HashSet count elements

The Count property returns the number of elements in the
HashSet.

Program.cs
  

var brands = new HashSet&lt;string&gt;();

brands.Add("Wilson");
brands.Add("Nike");
brands.Add("Volvo");
brands.Add("IBM");
brands.Add("IBM");

int nOfElements = brands.Count;

Console.WriteLine($"The set contains {nOfElements} elements");
Console.WriteLine(string.Join(", ", brands));

We have a set of brands. 

var brands = new HashSet&lt;string&gt;();

A new HashSet is created.

brands.Add("Wilson");

Elements are added to the set with the Add method.

int nOfElements = brands.Count;

We get the number of elements with the Count property.

$ dotnet run
The set contains 4 elements
Wilson, Nike, Volvo, IBM

## C# HashSet removing elements

In the next example, we remove elements from a HashSet.

Program.cs
  

var brands = new HashSet&lt;string&gt;
{
    "Wilson", "Nike", "Volvo", "Kia", "Lenovo"
};

Console.WriteLine(string.Join(", ", brands));

brands.Remove("Kia");
brands.Remove("Lenovo");

Console.WriteLine(string.Join(", ", brands));

brands.Clear();

if (brands.Count == 0)
{
    Console.WriteLine("The brands set is empty");
}

var words = new HashSet&lt;string&gt;
{
    "sky", "blue", "cup", "cold", "cloud", "pen", "bank"
};

words.RemoveWhere(word =&gt; word.Length == 3);
Console.WriteLine(string.Join(", ", words));

The elements are removed with Remove, Clear, and 
RemoveWhere.

brands.Remove("Kia");

A single element is removed with Remove. 

brands.Clear();

All elements are removed with Clear.

words.RemoveWhere(word =&gt; word.Length == 3);

With RemoveWhere, we remove elements that satisfy the given
condition.

$ dotnet run
Wilson, Nike, Volvo, Kia, Lenovo
Wilson, Nike, Volvo
The brands set is empty
blue, cold, cloud, bank

## C# HashSet loop

We can loop over HashSet with foreach and while keywords.

Program.cs
  

var words = new HashSet&lt;string&gt;
{
    "sky", "blue", "cup", "cold", "cloud", "pen", "bank"
};

foreach (var word in words)
{
    Console.WriteLine(word);
}

Console.WriteLine("----------------------");

var it = words.GetEnumerator();

while (it.MoveNext())
{
    Console.WriteLine(it.Current);
}

In the example, we iterate over a HashSet of words with foreach 
and while.

$ dotnet run
sky
blue
cup
cold
cloud
pen
bank
----------------------
sky
blue
cup
cold
cloud
pen
bank

## C# HashSet Contains

The Contains method determines whether a HashSet
contains the specified element.

Program.cs
  

var words = new HashSet&lt;string&gt;
{
    "sky", "blue", "cup", "cold", "cloud", "pen", "bank"
};

Console.WriteLine(words.Contains("sky"));
Console.WriteLine(words.Contains("water"));

Console.WriteLine("-----------------");

var users = new HashSet&lt;User&gt;
{
    new ("John Doe", "gardener"),
    new ("Roger Roe", "driver"),
    new ("Lucy Smith", "teacher")
};

var u1 = new User("John Doe", "gardener");
var u2 = new User("Jane Doe", "student");

Console.WriteLine(users.Contains(u1));
Console.WriteLine(users.Contains(u2));

record User(string Name, string Occupation);

We have two HashSet collections. 

var words = new HashSet&lt;string&gt;
{
    "sky", "blue", "cup", "cold", "cloud", "pen", "bank"
};

Console.WriteLine(words.Contains("sky"));
Console.WriteLine(words.Contains("water"));

We check if a HashSet of words contains these the specified two
words.

var u1 = new User("John Doe", "gardener");
var u2 = new User("Jane Doe", "student");

Console.WriteLine(users.Contains(u1));
Console.WriteLine(users.Contains(u2));

C# record contains a default implementation of the Equals and 
the GetHashCode methods; therefore, the Contains 
method works as we would expect.

$ dotnet run
True
False
-----------------
True
False

In case of a class, we need to implement the Equals and the
GetHashCode methods.

Program.cs
  

var users = new HashSet&lt;User&gt;
{
    new ("John Doe", "gardener"),
    new ("Roger Roe", "driver"),
    new ("Lucy Smith", "teacher")
};

var u1 = new User("John Doe", "gardener");
var u2 = new User("Jane Doe", "student");

Console.WriteLine(users.Contains(u1));
Console.WriteLine(users.Contains(u2));

class User(string name, string occupation)
{
    string Name { get; } = name;
    string Occupation { get; } = occupation;

    public override bool Equals(object? obj)
    {
        return obj is User user &amp;&amp;
               Name == user.Name &amp;&amp;
               Occupation == user.Occupation;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Name, Occupation);
    }
}

In this example, we have a HashSet of user objects. Since the
object is defined with the class keyword, we add the implementation
of the Equals and GetHashCode methods.

$ dotnet run
True
False

## C# HashSet

HashSet contains a set of methods specific to a set.

Program.cs
  

var vals1 = new HashSet&lt;int&gt; { 1, 2, 3, 4, 5 };
var vals2 = new HashSet&lt;int&gt; { 6, 7, 8, 9, 10 };

vals1.UnionWith(vals2);
Console.WriteLine(string.Join(", ", vals1));

var vals3 = new HashSet&lt;int&gt; { 1, 2, 3, 4, 5 };
var vals4 = new HashSet&lt;int&gt; { 3, 4, 5, 6, 7 };

vals3.IntersectWith(vals4);
Console.WriteLine(string.Join(", ", vals3));

We use UnionWith and IntersectWith methods.

vals1.UnionWith(vals2);

The UnionWith method modifies the HashSet object to 
contain elements from both sets.

vals3.IntersectWith(vals4);

The IntersectWith method modifies the HashSet object
to contain elements that are present in both objects.

$ dotnet run
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
3, 4, 5

## C# SortSet

The SortedSet represents a set of objects that is maintained in
sorted order.

Program.cs
  

var vals = new SortedSet&lt;int&gt; { 5, 2, 1, 4, 3, 7, 6 };
Console.WriteLine(string.Join(", ", vals));

var words = new SortedSet&lt;string&gt;
{
    "sky", "blue", "cup", "cold", "cloud", "pen", "bank"
};

Console.WriteLine(string.Join(", ", words));

var users = new SortedSet&lt;User&gt;
{
    new ("Robin", "bookseller"),
    new ("John", "gardener"),
    new ("John", "writer"),
    new ("Janet", "teacher"),
    new ("Andrew", "driver"),
    new ("Lucy", "accountant")
};

Console.WriteLine(string.Join("\n", users));

record User(string Name, string Occupation) : IComparable&lt;User&gt;
{
    public int CompareTo(User? other) =&gt; Occupation.CompareTo(other!.Occupation);
}

We have SortedSet of integers, strings, and users.

$ dotnet run
1, 2, 3, 4, 5, 6, 7
bank, blue, cloud, cold, cup, pen, sky
User { Name = Lucy, Occupation = accountant }
User { Name = Robin, Occupation = bookseller }
User { Name = Andrew, Occupation = driver }
User { Name = John, Occupation = gardener }
User { Name = Janet, Occupation = teacher }
User { Name = John, Occupation = writer }

## Source

[HashSet class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1?view=net-8.0)

In this article we have worked with C# HashSet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).