+++
title = "C# array"
date = 2025-08-27T23:22:43.637+01:00
draft = false
description = "C# arrays tutorial covers arrays. We initiate arrays and read data from them. We present various array methods."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# array

last modified May 7, 2025

In this article, we explore arrays in C#, a fundamental data structure used for
storing multiple elements efficiently.

## Understanding Arrays

An array is a structured collection of data that allows storing
multiple values under a single variable name. Unlike scalar variables, which
hold only one value at a time, arrays enable working with multiple related
values. Each value in an array is known as an *element*.

Arrays store elements of the *same data type*. This ensures type safety
and memory efficiency, as all elements in an array share a common structure.
Each element is accessed using an **index**, which identifies its
position within the array. Indexing in C# is *zero-based*, meaning the
first element of the array is at index 0, the second at index
1, and so on.

Arrays are **reference types** in C#, meaning they are stored in
the heap memory rather than the stack. When an array is passed to a method,
modifications made within the method affect the original array since only a
reference is passed.

## Declaring Arrays

Arrays must be declared with a specific data type, determining the type of
elements they can store. The Array class in C# provides built-in
methods to manipulate arrays efficiently, including operations such as sorting,
searching, and modifying elements.

int[] ages;
string[] names;
float[] weights;

Each array declaration consists of two parts: the data type of the elements and
the array name. The presence of square brackets [] indicates that
the variable is an array. For example, int[] ages defines an array
of integers, while string[] names stores multiple string values.

## Arrays vs. Collections

While arrays are a simple and efficient way to store multiple values,
*collections* in C# provide greater flexibility and functionality.
Collections, such as List&lt;T&gt; or Dictionary&lt;TKey,
TValue&gt;, allow dynamic resizing, advanced searching, and more
efficient data manipulation. Unlike arrays, collections do not require a
predefined size, making them more adaptable to changing data requirements.

Understanding arrays and their capabilities is essential for working with
structured data efficiently. While collections offer more advanced features,
arrays remain a fundamental and highly optimized data structure in C#
programming.

## C# initializing arrays

There are several ways how we can initialize an array in C#.

Program.cs
  

int[] vals = new int[5];

vals[0] = 1;
vals[1] = 2;
vals[2] = 3;
vals[3] = 4;
vals[4] = 5;

for (int i = 0; i &lt; vals.Length; i++)
{
    Console.WriteLine(vals[i]);
}

We declare and initialize a numerical array. The contents of the array are
printed to the console.

int[] vals = new int[5];

Here we declare an array which contains five elements. All elements
are integers.

vals[0] = 1;
vals[1] = 2;
...

We initialize the array with some data. This is assignment initialization. The
indexes are in the square brackets. Number 1 is going to be the first element of
the array, 2 the second.

for (int i = 0; i &lt; vals.Length; i++)
{
    Console.WriteLine(vals[i]);
}

We go through the array and print its elements. An array has a
Length property, which gives the number of elements in the array.
Since arrays are zero based, the indexes are 0..length-1.

We can declare and initialize an array in one statement.

Program.cs
  

int[] array = new int[] { 2, 4, 5, 6, 7, 3, 2 };

foreach (int e in array)
{
    Console.WriteLine(e);
}

This is a modified version of the previous program.

int[] array = new int[] {2, 4, 5, 6, 7, 3, 2 };

An array is declared and initialized in one step. The elements are specified in
the curly brackets. We did not specify the length of the array. The compiler
will do it for us.

foreach (int e in array)
{
    Console.WriteLine(e);
}

We use the foreach keyword to traverse the array and print its
contents.

## Simplified initialization syntax

The initialization syntax can be simplified.

Program.cs
  

int[] array = new int[] { 2, 4, 5, 6, 7, 3, 2 };

foreach (int e in array)
{
    Console.WriteLine(e);
}

Console.WriteLine("------------------------------");

int[] array2 = { 2, 4, 5, 6, 7, 3, 2 };

foreach (int e in array2)
{
    Console.WriteLine(e);
}

The new int[] part can be omitted.

int[] array2 = { 2, 4, 5, 6, 7, 3, 2 };

The int[] array2 = { 2, 4, 5, 6, 7, 3, 2 } is internally compiled
to int[] array2 = new int[] { 2, 4, 5, 6, 7, 3, 2 }.

## Array initializers

Since .NET 8, we can use collection initializers to initialize arrays. The
syntax is both used for arrays and lists.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

for (int i = 0; i &lt; vals.Length; i++)
{
    Console.WriteLine(vals[i]);
}

In the program, we create and initialize the array using the new syntax.

int[] vals = [1, 2, 3, 4, 5];

This syntax is shorter and is common in many programming languages. It is both
used for lists.

## C# Array.Fill

The Array.Fill method fills the whole array with the given value.

Program.cs
  

int[] vals = new int[10];

Array.Fill(vals, 0);

Console.WriteLine(string.Join(", ", vals));

We create an array of integers; the array is filled with zeros.

$ dotnet run
0, 0, 0, 0, 0, 0, 0, 0, 0, 0

## C# array accessing elements

After an array is created, its elements can be accessed by their index. The
index is a number placed inside square brackets which follow the array name.

We can use the index from end ^ operator to get elements from
the end of the array. The ^0 equals to array.Length and
the ^n to array.Length - n.

Program.cs
  

string[] names = ["Jane", "Thomas", "Lucy", "David"];

Console.WriteLine(names[0]);
Console.WriteLine(names[1]);
Console.WriteLine(names[2]);
Console.WriteLine(names[3]);

Console.WriteLine("*************************");

Console.WriteLine(names[^1]);
Console.WriteLine(names[^2]);
Console.WriteLine(names[^3]);
Console.WriteLine(names[^4]);

In the example, we create an array of string names. We access each of the
elements by its index and print them to the terminal.

string[] names = { "Jane", "Thomas", "Lucy", "David" };

An array of strings is created.

Console.WriteLine(names[0]);
Console.WriteLine(names[1]);
Console.WriteLine(names[2]);
Console.WriteLine(names[3]);

Each of the elements of the array is printed to the console. With the
names[0] construct, we refer to the first element of the names
array.

Console.WriteLine(names[^1]);
Console.WriteLine(names[^2]);
Console.WriteLine(names[^3]);
Console.WriteLine(names[^4]);

We access array elements from the end.

$ dotnet run
Jane
Thomas
Lucy
David
*************************
David
Lucy
Thomas
Jane

## C# implicitly-typed array

C# can infer the type of the array.

Program.cs
  

var vals = new[] { 1, 2, 3, 4, 5 };
var words = new[] { "cup", "falcon", "word", "water" };

Console.WriteLine(vals.GetType());
Console.WriteLine(words.GetType());

We create two implicitly-typed arrays.

var vals = new[] { 1, 2, 3, 4, 5 };

An array of integers is created. We do not specify the type of the array;
the compiler can infer the type from the right side of the assignment. Note that
here we cannot use the simplified syntax or the collection initilizers, because
we need to tell the compiler the type of the collection.

Console.WriteLine(vals.GetType());
Console.WriteLine(words.GetType());

With GetType, we verify the data types of the arrays.

$ dotnet run
System.Int32[]
System.String[]

## C# array modify elements

It is possible to modify the elements of an array - they are not immutable.

Program.cs
  

int[] vals = [1, 2, 3, 4];

vals[0] *= 2;
vals[1] *= 2;
vals[2] *= 2;
vals[3] *= 2;

Console.WriteLine("[{0}]", string.Join(", ", vals));

We have an array of three integers. Each of the values will be multiplied by
two.

int[] vals = [1, 2, 3, 4];

An array of four integers is created.

vals[0] *= 2;
vals[1] *= 2;
vals[2] *= 2;
vals[3] *= 2;

Using the element access, we multiply each value in the array by two.

Console.WriteLine("[{0}]", string.Join(", ", vals));

With the Join method, we create one string from all elements of
the array. The elements are separated with a comma character.

$ dotnet run
[2, 4, 6, 8]

All four integers have been multiplied by number 2.

## C# array slices

We can use the .. operator to get array slices. A range specifies
the start and end of a range. The start of the range is inclusive, but the end
of the range is exclusive. It means that the start is included in the range but
the end is not included in the range.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5, 6, 7];

int[] vals2 = vals[1..5];
Console.WriteLine("[{0}]", string.Join(", ", vals2));

int[] vals3 = vals[..6];
Console.WriteLine("[{0}]", string.Join(", ", vals3));

int[] vals4 = vals[3..];
Console.WriteLine("[{0}]", string.Join(", ", vals4));

The example works with array ranges.

int[] vals2 = vals[1..5];

We create an array slice containing elements from index 1 to index 4.

int[] vals3 = vals[..6];

If the start index is omitted, the slice starts from index 0.

int[] vals4 = vals[3..];

If the end index is omitted, the slice goes until the end of the array.

$ dotnet run
[2, 3, 4, 5]
[1, 2, 3, 4, 5, 6]
[4, 5, 6, 7]

## C# traversing arrays

We often need to go through all elements of an array. We show two common methods
for traversing an array.

Program.cs
  

string[] planets = [ "Mercury", "Venus", "Mars",
    "Earth", "Jupiter",  "Saturn", "Uranus", "Neptune", "Pluto" ];

for (int i = 0; i &lt; planets.Length; i++)
{
    Console.WriteLine(planets[i]);
}

foreach (string planet in planets)
{
    Console.WriteLine(planet);
}

An array of planet names is created. We use the for and foreach statements to
print all the values.

for (int i = 0; i &lt; planets.Length; i++)
{
    Console.WriteLine(planets[i]);
}

In this loop, we utilize the fact that we can get the number of elements from
the array object. The number of elements is stored in the Length
property.

foreach (string planet in planets)
{
    Console.WriteLine(planet);
}

The foreach statement can be used to make the code more compact when traversing
arrays or other collections. In each cycle, the planet variable is passed the
next value from the planets array.

## C# pass array as function argument

Arrays are passed to functions by reference. This means that the elements of
the original array can be changed.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

ModifyArray(vals);

Console.WriteLine(string.Join(", ", vals));

void ModifyArray(int[] data)
{
    Array.Reverse(data);
}

We pass an array of integers to the ModifyArray function. It
reverses the array elements. Since a reference to the array is passed and not
a copy, the vals array is changed.

$ dotnet run
5, 4, 3, 2, 1

## C# array dimensions

So far, we have worked with one-dimensional arrays. The number of indexes needed to
specify an element is called the *dimension*, or *rank* of the array.

### Two-dimensional array

Next, we work with two-dimensional array.

Program.cs
  

int[,] twodim = new int[,] { { 1, 2, 3 }, { 1, 2, 3 } };

int d1 = twodim.GetLength(0);
int d2 = twodim.GetLength(1);

for (int i = 0; i &lt; d1; i++)
{
    for (int j = 0; j &lt; d2; j++)
    {
        Console.WriteLine(twodim[i, j]);
    }
}

If we need two indexes to access an element in an array then we have a two
dimensional array.

int[,] twodim = new int[,] { { 1, 2, 3 }, { 1, 2, 3 } };

We declare and initialize a two dimensional array in one statement. Note the
comma inside the square brackets.

int d1 = twodim.GetLength(0);
int d2 = twodim.GetLength(1);

We get the dimensions of the array. The GetLength gets the number
of elements in the specified dimension of the array.

for (int i = 0; i &lt; d1; i++)
{
    for (int j = 0; j &lt; d2; j++)
    {
        Console.WriteLine(twodim[i, j]);
    }
}

We use two for loops to go through all the elements of a two
dimensional array. Note that a specific array element is obtained using two
indexes, separated by a comma character.

$ dotnet run
1
2
3
1
2
3

We can traverse a two-dimensional array with the foreach loop.

Program.cs
  

int[,] vals = new int[4, 2]
{
    { 9, 99 },
    { 3, 33 },
    { 4, 44 },
    { 1, 11 }
};

foreach (var val in vals)
{
    Console.WriteLine(val);
}

With the foreach loop, we get the elements one-by-one from the beginning to the
end.

$ dotnet run
9
99
3
33
4
44
1
11

### Three-dimensional array

Next, we work with a three dimensional array.

Program.cs
  

int[,,] n3 =
{
    {{12, 2, 8}},
    {{14, 5, 2}},
    {{3, 26, 9}},
    {{4, 11, 2}}
};

int d1 = n3.GetLength(0);
int d2 = n3.GetLength(1);
int d3 = n3.GetLength(2);

for (int i = 0; i &lt; d1; i++)
{
    for (int j = 0; j &lt; d2; j++)
    {
        for (int k = 0; k &lt; d3; k++)
        {
            Console.Write(n3[i, j, k] + " ");
        }
    }
}

Console.Write('\n');

We have a numerical three-dimensional array. Again, we initialize the array with
numbers and print them to the terminal.

int[,,] n3 = {
    {{12, 2, 8}},
    {{14, 5, 2}},
    {{3, 26, 9}},
    {{4, 11, 2}}
};

There is another comma between the square brackets on the left side and
additional curly brackets on the right side.

for (int k=0; k&lt;d3; k++)
{
    Console.Write(n3[i, j, k] + " ");
}

This loop goes through the third dimension. We use three indexes to retrieve the
value from the array.

$ dotnet run
12 2 8 14 5 2 3 26 9 4 11 2

### C# Rank

There is a Rank property which gives the number of dimensions of an
array.

Program.cs
  

int[]   a1 = { 1, 2 };
int[,]  a2 = { { 1 }, { 2 } };
int[,,] a3 = { { { 1, 2 }, { 2, 1 } } };

Console.WriteLine(a1.Rank);
Console.WriteLine(a2.Rank);
Console.WriteLine(a3.Rank);

We have three arrays. We use the Rank property to get the number of
dimensions for each of them.

Console.WriteLine(a1.Rank);

Here we get the rank for the first array.

$ dotnet run
1
2
3

## C# jagged arrays

Arrays that have elements of the same size are called *rectangular*
arrays. In contrast, arrays which have elements of different size are called
*jagged* arrays. Jagged arrays are declared and initialized differently.

Program.cs
  

int[][] jagged = new int[][]
{
    new int[] { 1, 2 },
    new int[] { 1, 2, 3 },
    new int[] { 1, 2, 3, 4 }
};

foreach (int[] array in jagged)
{
    foreach (int e in array)
    {
        Console.Write(e + " ");
    }
}

Console.Write('\n');

This is an example of a jagged array.

int[][] jagged = new int[][]
{
    new int[] { 1, 2 },
    new int[] { 1, 2, 3 },
    new int[] { 1, 2, 3, 4 }
};

This is a declaration and initialization of a jagged array. Note that this time,
we use two pairs of square brackets. We have an array of arrays. More
specifically, we have declared an array to have three arrays of int data type.
Each of the arrays has different number of elements.

foreach (int[] array in jagged)
{
    foreach (int e in array)
    {
        Console.Write(e + " ");
    }
}

We use two foreach loops to traverse the jagged array. In the first loop, we get
the array. In the second loop, we get the elements of the obtained array.

## C# array sort &amp; reverse

The Array.sort method sorts the array elements in-place. The
Array.Reverse method reverses the sequence of the array elements.

Program.cs
  

string[] names = ["Jane", "Frank", "Alice", "Tom"];

Array.Sort(names);

foreach (string e in names)
{
    Console.Write(e + " ");
}

Console.Write('\n');

Array.Reverse(names);

foreach (string e in names)
{
    Console.Write(e + " ");
}

Console.Write('\n');

In this example, we sort and reverse an array of strings.

string[] names = ["Jane", "Frank", "Alice", "Tom"];

We have an array of strings.

Array.Sort(names);

The static Sort method sorts the data alphabetically.

Array.Reverse(names);

The Reverse method reverses the sequence of the elements in the
entire one-dimensional array.

$ dotnet run
Alice Frank Jane Tom
Tom Jane Frank Alice

Alternatively, we can sort arrays with LINQ's Order and
OrderDescending methods.

Program.cs
  

string[] names = ["Jane", "Frank", "Alice", "Tom"];

var sorted = names.Order();

foreach (var name in sorted)
{
    Console.WriteLine(name);
}

Console.WriteLine("----------------------");

var sorted2 = names.OrderDescending();

foreach (var name in sorted2)
{
    Console.WriteLine(name);
}

The program sorts an array of strings in ascending and descending orders.

$ dotnet run
Alice
Frank
Jane
Tom
----------------------
Tom
Jane
Frank
Alice

## C# array GetValue &amp; SetValue

The SetValue method sets a value to the element at the specified
position. The GetValue gets the value at the specified position.

Program.cs
  

string[] names = ["Jane", "Frank", "Alice", "Tom"];

names.SetValue("Beky", 1);
names.SetValue("Erzebeth", 3);

Console.WriteLine(names.GetValue(1));
Console.WriteLine(names.GetValue(3));

This example uses the SetValue and GetValue methods.

names.SetValue("Beky", 1);
names.SetValue("Erzebeth", 3);

The SetValue sets a value for a specific index in the array.

Console.WriteLine(names.GetValue(1));
Console.WriteLine(names.GetValue(3));

We retrieve the values from the array with the GetValue method.

$ dotnet run
Beky
Erzebeth

## C# array searching

The Array class provides several methods for searching elements
within an array, such as IndexOf, Exists, and
Find.

Program.cs
  

string[] fruits = ["apple", "banana", "cherry", "date", "elderberry"];

int bananaIndex = Array.IndexOf(fruits, "banana");
Console.WriteLine($"Index of 'banana': {bananaIndex}");

Console.WriteLine($"Index of 'grape': {grapeIndex}");

bool hasShortName = Array.Exists(fruits, fruit =&gt; fruit.Length &lt; 5);
Console.WriteLine($"Any fruit with name shorter than 5 chars? {hasShortName}");

string startsWithC = Array.Find(fruits, fruit =&gt; 
    fruit.StartsWith("c", StringComparison.OrdinalIgnoreCase));
Console.WriteLine($"First fruit starting with 'c': {startsWithC}");

This example demonstrates searching for elements using Array.IndexOf,
checking for existence with Array.Exists, and finding an element
with Array.Find.

int bananaIndex = Array.IndexOf(fruits, "banana");

Array.IndexOf returns the zero-based index of the first occurrence
of "banana" in the fruits array. If the item is not found, it
returns -1.

bool hasShortName = Array.Exists(fruits, fruit =&gt; fruit.Length &lt; 5);

Array.Exists checks if there is any element in the
fruits array that satisfies the given predicate (a lambda
expression in this case, checking if the fruit name's length is less than 5).

string startsWithC = Array.Find(fruits, fruit =&gt; 
    fruit.StartsWith("c", StringComparison.OrdinalIgnoreCase));

Array.Find returns the first element in the fruits
array that matches the condition specified by the lambda expression (fruit name
starting with 'c'). If no such element is found, it returns the default value
for the type (null for strings).

$ dotnet run
Index of 'banana': 1
Index of 'grape': -1
Any fruit with name shorter than 5 chars? True
First fruit starting with 'c': cherry

## C# array resizing

Arrays in C# are fixed-size once created. However, the Array.Resize
method can be used to create a new array with a different size and copy elements
from the old array to the new one.

Program.cs
  

int[] numbers = [10, 20, 30];
Console.WriteLine($"Original array: [{string.Join(", ", numbers)}], Size: {numbers.Length}");

Array.Resize(ref numbers, 5);
numbers[3] = 40;
numbers[4] = 50;
Console.WriteLine($"Resized (larger) array: [{string.Join(", ", numbers)}], Size: {numbers.Length}");

Array.Resize(ref numbers, 2);
Console.WriteLine($"Resized (smaller) array: [{string.Join(", ", numbers)}], Size: {numbers.Length}");

The example shows how to use Array.Resize to change the size of an
array. The ref keyword is used because Array.Resize
may assign a new array instance to the variable.

Array.Resize(ref numbers, 5);

This resizes the numbers array to have 5 elements. If the new size is
larger than the original, the existing elements are copied, and the new elements
are initialized to their default value (0 for integers).

Array.Resize(ref numbers, 2);

This resizes the numbers array to 2 elements. If the new size is
smaller, elements from the original array are copied up to the new size, and the
remaining elements are truncated.

$ dotnet run
Original array: [10, 20, 30], Size: 3
Resized (larger) array: [10, 20, 30, 40, 50], Size: 5
Resized (smaller) array: [10, 20], Size: 2

## C# Arrays of Records

Arrays in C# can store elements of any type, including user-defined records. By
using record types instead of classes, developers can create
immutable and concise data structures that improve efficiency and readability.

Program.cs
  

Person[] people = new Person[]
{
    new("Alice", 30),
    new("Bob", 24),
    new("Charlie", 35)
};

Console.WriteLine("Array of Person records:");
foreach (Person person in people)
{
    Console.WriteLine(person);
}

// Using collection initializer syntax (C# 12)
Person[] students =
[
    new("David", 21),
    new("Eve", 22)
];

Console.WriteLine("\nArray of Student records (initialized differently):");
foreach (Person student in students)
{
    Console.WriteLine(student);
}

record Person(string Name, int Age);

This example defines a Person record and then creates an array to
store instances of this record type. Records simplify object creation and
automatically handle value-based equality and ToString()
representation.

Person[] people = new Person[]
{
    new("Alice", 30),
    new("Bob", 24),
    new("Charlie", 35)
};

An array named people is declared to hold Person
records. Each element is initialized using concise syntax provided by C#
records.

Person[] students =
[
    new("David", 21),
    new("Eve", 22)
];

This demonstrates the collection expression syntax (introduced in C# 12) for
initializing an array of records more concisely.

$ dotnet run
Array of Person records:
Person { Name = Alice, Age = 30 }
Person { Name = Bob, Age = 24 }
Person { Name = Charlie, Age = 35 }

Array of Student records (initialized differently):
Person { Name = David, Age = 21 }
Person { Name = Eve, Age = 22 }

## C# converting arrays and using LINQ

Arrays can be easily converted to other collection types like List&lt;T&gt;.
Furthermore, Language Integrated Query (LINQ) provides powerful capabilities
for querying and manipulating arrays.

Program.cs
  

int[] numbers = [5, 1, 8, 2, 9, 4, 7, 3, 6];
Console.WriteLine($"Original array: [{string.Join(", ", numbers)}]");

List&lt;int&gt; numberList = numbers.ToList();
Console.WriteLine($"Converted to List, Count: {numberList.Count}");
numberList.Add(10);

Console.WriteLine($"List after adding 10: [{string.Join(", ", numberList)}]");

var evenNumbers = numbers.Where(n =&gt; n % 2 == 0);
Console.WriteLine($"Even numbers: [{string.Join(", ", evenNumbers)}]");

var squaredNumbers = numbers.Select(n =&gt; n * n);
Console.WriteLine($"Squared numbers: [{string.Join(", ", squaredNumbers)}]");

var filteredAndSorted = numbers.Where(n =&gt; n &gt; 5)
                                .OrderBy(n =&gt; n);
Console.WriteLine($"Numbers &gt; 5, sorted: [{string.Join(", ", filteredAndSorted)}]");

int sum = numbers.Sum();
Console.WriteLine($"Sum of elements: {sum}");

bool anyGreaterThanEight = numbers.Any(n =&gt; n &gt; 8);
Console.WriteLine($"Any element &gt; 8? {anyGreaterThanEight}");

This example demonstrates converting an array to a List&lt;int&gt; and
then showcases several LINQ methods like Where, Select,
OrderBy, Sum, and Any to perform common data
manipulation tasks on an array.

List numberList = numbers.ToList();

The ToList LINQ extension method converts the numbers
array into a List&lt;int&gt;. Lists offer dynamic resizing and
other methods not available on arrays directly.

var evenNumbers = numbers.Where(n =&gt; n % 2 == 0);

The Where LINQ method filters the array based on a predicate. Here, it
selects only the even numbers.

var squaredNumbers = numbers.Select(n =&gt; n * n);

The Select LINQ method projects each element of the array into a
new form. Here, it squares each number.

var filteredAndSorted = numbers.Where(n =&gt; n &gt; 5)
                               .OrderBy(n =&gt; n);

LINQ methods can be chained. This example first filters numbers greater than 5,
then sorts the result in ascending order.

$ dotnet run
Original array: [5, 1, 8, 2, 9, 4, 7, 3, 6]
Converted to List, Count: 9
List after adding 10: [5, 1, 8, 2, 9, 4, 7, 3, 6, 10]
Even numbers: [8, 2, 4, 6]
Squared numbers: [25, 1, 64, 4, 81, 16, 49, 9, 36]
Numbers &gt; 5, sorted: [6, 7, 8, 9]
Sum of elements: 45
Any element &gt; 8? True

## C# array Clone &amp; Clear

The Array.Copy method copies values from the source array to the
destination array. The Array.Clear deletes all elements of the
array.

Program.cs
  

string[] names = ["Jane", "Frank", "Alice", "Tom"];
string[] names2 = new string[4];

Array.Copy(names, names2, names.Length);

Console.WriteLine(string.Join(", ", names2));

Array.Clear(names2);

Console.WriteLine(string.Join(", ", names2));

In the program, we create a copy of an array and later delete it.

Array.Copy(names, names2, names.Length);

The Copy method copies values from the source array to the
destination array. The first parameter is the source array, the second is the
destination array. The third parameter is the length; it specifies the number of
elements to copy.

Array.Clear(names2);

The Clear method removes all elements from the array.

$ dotnet run
Jane, Frank, Alice, Tom
, , ,

## Source

[Arrays - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays)

In this article we have worked with arrays in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).