+++
title = "C# Dictionary"
date = 2025-08-27T23:22:57.437+01:00
draft = false
description = "C# Dictionary tutorial shows how to work
with a Dictionary collection in C#. A dictionary, also called an associative array,
is a collection of unique keys and a collection of values, where each key is
associated with one value."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Dictionary

last modified April 23, 2025

 

This tutorial explores the C# Dictionary collection, demonstrating its creation,
manipulation, and practical applications.

## C# Dictionary

A Dictionary, often termed an associative array, stores unique keys mapped to
specific values, enabling rapid data retrieval and insertion. While highly
efficient for lookups, Dictionaries consume additional memory due to the storage
of both keys and values.

## C# Dictionary initializers

C# Dictionaries can be initialized using concise literal notation, with
key-value pairs defined within curly braces {} during declaration.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

Console.WriteLine(domains["sk"]);

var days = new Dictionary&lt;string, string&gt;
{
    ["mo"] =  "Monday",
    ["tu"] =  "Tuesday",
    ["we"] =  "Wednesday",
    ["th"] =  "Thursday",
    ["fr"] =  "Friday",
    ["sa"] =  "Saturday",
    ["su"] =  "Sunday"
};

Console.WriteLine(days["fr"]);

This example creates two Dictionaries using different initializer syntaxes to
store country codes and days of the week.

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

This code initializes a Dictionary with string keys and values. The angle
brackets &lt;&gt; define the data types for keys and values.
Key-value pairs are enclosed in nested {}, separated by commas,
linking each key (e.g., "sk") to its value (e.g.,
"Slovakia").

Console.WriteLine(domains["sk"]);

To retrieve a value, use the Dictionary's name followed by the key in square
brackets [], which returns the associated value.

var days = new Dictionary&lt;string, string&gt;
{
    ["mo"] =  "Monday",
    ["tu"] =  "Tuesday",
    ["we"] =  "Wednesday",
    ["th"] =  "Thursday",
    ["fr"] =  "Friday",
    ["sa"] =  "Saturday",
    ["su"] =  "Sunday"
};

This alternative initializer syntax assigns values to keys using index notation,
offering a clear and flexible way to populate a Dictionary.

$ dotnet run
Slovakia
Friday

## C# Dictionary count elements

The Count property returns the total number of key-value pairs in
a Dictionary, providing a quick way to assess its size.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

domains.Add("pl", "Poland");

Console.WriteLine($"There are {domains.Count} items in the dictionary");

This example demonstrates counting the number of entries in a Dictionary after
adding a new key-value pair.

Console.WriteLine($"There are {domains.Count} items in the dictionary");

This statement displays the number of key-value pairs in the Dictionary using
the Count property.

$ dotnet run
There are 5 items in the dictionary

## C# Dictionary add, remove elements

Dictionaries are dynamic, allowing the addition or removal of key-value pairs
after their initial creation to adapt to changing data needs.

Program.cs
  

var users = new Dictionary&lt;string, int&gt;()
{
    { "John Doe", 41 },
    { "Jane Doe", 38 },
    { "Lucy Brown", 29 },
};

users["Paul Brown"] = 33;
users.Add("Thomas Pattison", 34);

Console.WriteLine(string.Join(", ", users));

users.Remove("Jane Doe");

Console.WriteLine(string.Join(", ", users));

users.Clear();

if (users.Count == 0)
{
    Console.WriteLine("The users dictionary is empty");
}

This example creates a Dictionary and modifies it by adding, removing, and
clearing entries using built-in methods.

var users = new Dictionary&lt;string, int&gt;()
{
    { "John Doe", 41 },
    { "Jane Doe", 38 },
    { "Lucy Brown", 29 },
};

This initializes a Dictionary with string keys (names) and integer values
(ages), setting up the initial dataset.

users["Paul Brown"] = 33;
users.Add("Thomas Pattison", 34);

Two new key-value pairs are added using index notation and the
Add method, expanding the Dictionary.

Console.WriteLine(string.Join(", ", users));

The Join method concatenates all key-value pairs into a single
string for easy display.

users.Remove("Jane Doe");

The Remove method deletes a key-value pair by specifying the key,
in this case, "Jane Doe".

users.Clear();

The Clear method removes all key-value pairs, emptying the
Dictionary.

$ dotnet run
[John Doe, 41], [Jane Doe, 38], [Lucy Brown, 29], [Paul Brown, 33], [Thomas Pattison, 34]
[John Doe, 41], [Lucy Brown, 29], [Paul Brown, 33], [Thomas Pattison, 34]
The users dictionary is empty

## C# Dictionary ContainsKey and ContainsValue methods

The ContainsKey method checks if a specific key exists in the
Dictionary, while ContainsValue verifies the presence of a
particular value, aiding in data validation.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

var key = "sk";

if (domains.ContainsKey(key))
{
    Console.WriteLine($"The {key} key is in the dictionary");
} else
{
    Console.WriteLine($"The {key} key is in not the dictionary");
}

var value = "Slovakia";

if (domains.ContainsValue(value))
{
    Console.WriteLine($"The {value} value is in the dictionary");
} else
{
    Console.WriteLine($"The {value} value is in not the dictionary");
}

This example tests for the presence of a specific key and value in a Dictionary
using ContainsKey and ContainsValue.

$ dotnet run
The sk key is in the dictionary
The Slovakia value is in the dictionary

## C# traverse dictionary

C# offers multiple methods to iterate over a Dictionary, allowing flexible
access to its key-value pairs for processing or display.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

foreach (var (key, value) in domains)
{
    Console.WriteLine($"{key}: {value}");
}

Console.WriteLine("**************************************");

foreach (var kvp in domains)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

Console.WriteLine("**************************************");

// oldschool
foreach (KeyValuePair&lt;string, string&gt; entry in domains)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}

This example demonstrates three approaches to iterating over a Dictionary using
foreach loops, each accessing key-value pairs differently.

foreach (var (key, value) in domains)
{
    Console.WriteLine($"{key}: {value}");
}

This modern syntax deconstructs each key-value pair into separate variables for
direct access during iteration.

foreach (var kvp in domains)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

This approach uses the Key and Value properties of
each pair to access the data.

// oldschool
foreach (KeyValuePair&lt;string, string&gt; entry in domains)
{
    Console.WriteLine($"{entry.Key}: {entry.Value}");
}

This traditional method iterates using KeyValuePair, explicitly
defining the pair structure for compatibility with older code.

$ dotnet run
sk: Slovakia
ru: Russia
de: Germany
no: Norway
**************************************
sk: Slovakia
ru: Russia
de: Germany
no: Norway
**************************************
sk: Slovakia
ru: Russia
de: Germany
no: Norway

C# also supports separate iteration over keys or values, providing targeted
access to either component of the Dictionary.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

Console.WriteLine("Keys:");

foreach (var val in domains.Keys)
{
    Console.WriteLine(val);
}

Console.WriteLine("\nValues:");

foreach (var val in domains.Values)
{
    Console.WriteLine(val);
}

This example iterates over the keys and values of a Dictionary separately using
two foreach loops for focused data extraction.

foreach (var val in domains.Keys)
{
    Console.WriteLine(val);
}

The Keys property provides access to all keys in the Dictionary,
useful for key-specific operations.

foreach (var val in domains.Values)
{
    Console.WriteLine(val);
}

The Values property retrieves all values, enabling value-focused
processing without keys.

$ dotnet run
Keys:
sk
ru
de
no

Values:
Slovakia
Russia
Germany
Norway

## C# sort dictionary

Using LINQ, Dictionaries can be sorted by keys or values, allowing organized
data presentation for analysis or display purposes.

Program.cs
  

var users = new Dictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

var sortedUsersByValue = users.OrderBy(user =&gt; user.Value);

foreach (var user in sortedUsersByValue)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

This example sorts a Dictionary by its values (ages) using LINQ, displaying
users in ascending order of age.

var sortedUsersByValue = users.OrderBy(user =&gt; user.Value);

The OrderBy method sorts the Dictionary entries based on their
values, creating an ordered sequence.

$ dotnet run
Paul is 24 years old
Lucy is 29 years old
Jane is 38 years old
John is 41 years old

## C# SortedDictionary

The SortedDictionary class maintains key-value pairs sorted by
keys, ensuring automatic ordering for efficient data access.

Program.cs
  

var sortedUsers = new SortedDictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

foreach (var user in sortedUsers)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

This example showcases the SortedDictionary, which automatically
sorts entries by keys for consistent output.

$ dotnet run
Jane is 38 years old
John is 41 years old
Lucy is 29 years old
Paul is 24 years old

## C# Dictionary of Lists

Dictionaries can store complex data, such as lists, as values, enabling
structured organization of nested data collections.

Program.cs
  

var data = new Dictionary&lt;int, List&lt;int&gt;&gt;();

var vals1 = new List&lt;int&gt; { 1, 1, 1, 1, 1 };
var vals2 = new List&lt;int&gt; { 3, 3, 3, 3, 3 };
var vals3 = new List&lt;int&gt; { 5, 5, 5, 5, 5 };

data.Add(1, vals1);
data.Add(2, vals2);
data.Add(3, vals3);

var TotalSum = 0;

foreach (var (key, e) in data)
{
    var _sum = e.Sum();
    TotalSum += _sum;
    Console.WriteLine($"The sum of nested list is: {_sum}");
}

Console.WriteLine($"The total sum is: {TotalSum}");

This example creates a Dictionary with lists as values, calculates the sum of
each list, and computes a total sum.

$ dotnet run
The sum of nested list is: 5
The sum of nested list is: 15
The sum of nested list is: 25
The total sum is: 45

## C# Dictionary TryGetValue Method

The TryGetValue method safely retrieves a value for a given key,
avoiding exceptions if the key is not found, enhancing robustness.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

string key = "fr";
if (domains.TryGetValue(key, out string? value))
{
    Console.WriteLine($"Found {key}: {value}");
}
else
{
    Console.WriteLine($"Key {key} not found in the dictionary");
}

key = "sk";
if (domains.TryGetValue(key, out value))
{
    Console.WriteLine($"Found {key}: {value}");
}
else
{
    Console.WriteLine($"Key {key} not found in the dictionary");
}

This example uses TryGetValue to attempt retrieving values for
existing and non-existing keys, handling both cases gracefully.

$ dotnet run
Key fr not found in the dictionary
Found sk: Slovakia

## C# Dictionary Key Case Insensitivity

Using StringComparer, Dictionaries can be made case-insensitive
for keys, simplifying lookups in case-sensitive scenarios.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;(StringComparer.OrdinalIgnoreCase)
{
    {"SK", "Slovakia"},
    {"RU", "Russia"},
    {"DE", "Germany"}
};

Console.WriteLine(domains["sk"]);
Console.WriteLine(domains["RU"]);

This example creates a case-insensitive Dictionary, allowing key lookups
regardless of case, and retrieves values for mixed-case keys.

$ dotnet run
Slovakia
Russia

## Source

[Dictionary class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-8.0)

This tutorial has thoroughly explored the C# Dictionary collection, covering
its creation, manipulation, and advanced use cases.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching expertise, I share my
knowledge through comprehensive and practical tutorials.

List [all C# tutorials](/csharp/).