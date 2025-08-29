+++
title = "C# generics"
date = 2025-08-27T23:23:06.601+01:00
draft = false
description = "C# generics tutorial shows how to define and use generics in C#. In generic programming, we use custom types as parameters to define other custom types."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# generics

last modified July 5, 2023

 

In this article we show how to define and use generics in C#. In generic
programming, we use custom types as parameters to define other custom types.

Generics were added in C# 2.0.

Generics are classes, structures, interfaces, and methods that have placeholders
(type parameters) for one or more of the types that they store or use. A generic
collection class might use a type parameter as a placeholder for the type of
objects that it stores.

Generic type names are provided after the class, structure, interface, or method 
name in angle brackets. This syntax tells the compiler that such a name is 
used in the definition.

By convention, the type parameters use capital letters such as T, 
U, or TKey, and TValue.

In effect, we delay the specification of the data type until it is actually used
in the program. Generics enable us to write code that works with a variety of
types without repeating the code for each type.

void Swap&lt;T&gt;(ref T lhs, ref T rhs)

We have a definition of a generic method. The T parameter is later
replaced with a concrete type such as int or string at
the calling side.

Generics area abstract blueprints, they cannot be used as-is; when we use a
generic class or method, we have to  instantiate them with a specific data type
that is substituted to the matching placeholder.

.NET provides an large set of interfaces and classes in the 
System.Collections.Generic namespace for implementing generic
collections.

Generics provide the following advantages:

  - Reusability

  - Type safety

  - Improved performance

One generic method/class definition can be used for various types, thus reducing
the amount of code needed. Generics provide type safety; the compiler checks at
compile time that correct types are being provided. Generic types provide better
performance because they reduce the need for boxing, unboxing, type checking,
and typecasting of variables or objects.

## C# generic method

In the following example, we define a generic Swap method.

Program.cs
  

int x = 10;
int y = 20;

char a = 'x';
char b = 'y';

Swap&lt;int&gt;(ref x, ref y);
Swap&lt;char&gt;(ref a, ref b);

Console.WriteLine($"x = {x}, y = {y}");
Console.WriteLine($"a = {a}, b = {b}");

void Swap&lt;T&gt;(ref T lhs, ref T rhs)
{
    T temp = lhs;
    lhs = rhs;
    rhs = temp;
}

The Swap method exchanges the values of two variables. There is 
one definition of a generic  Swap method, but is is used for two 
different types. 

Swap&lt;int&gt;(ref x, ref y);
Swap&lt;char&gt;(ref a, ref b);

We call the Swap method for integer values and char values. The 
type specification for the method is optional since compiler can infer the types 
from the parameters.

void Swap&lt;T&gt;(ref T lhs, ref T rhs)
{
    T temp = lhs;
    lhs = rhs;
    rhs = temp;
}

Capital T is used as a placeholder, which is at compile time
replaced with a specific type.

$ dotnet run
x = 20, y = 10
a = y, b = x

Next we have a generic Debug method. It prints the type and the 
value of the passed generic parameter.

Program.cs
  

string s = "falcon";
bool b = true;
int i = 42;
float f = 4.4f;
double d = 2.0;

Debug&lt;string&gt;(s);
Debug&lt;bool&gt;(b);
Debug&lt;int&gt;(i);
Debug&lt;float&gt;(f);
Debug&lt;double&gt;(d);
   
void Debug&lt;T&gt;(T arg)
{
    Type type = arg.GetType();

    if (type == typeof(string)) 
    {
        Console.WriteLine($"[String]: {arg}");
    } else if (type == typeof(bool)) {

        Console.WriteLine($"[Boolean]: {arg}");
    } else if (type == typeof(int)) {

        Console.WriteLine($"[Integer]: {arg}");
    } else if (type == typeof(float)) {

        Console.WriteLine($"[Float]: {arg}");
    } else if (type == typeof(double)) {

        Console.WriteLine($"[Double]: {arg}");
    }
}

To get the type of the parameter, we use the GetType method.

$ dotnet run
[String]: falcon
[Boolean]: True
[Integer]: 42
[Float]: 4.4
[Double]: 2

In the next example, we create a method that randomly shuffles a list.

Program.cs
  

var rng = new Random();

var vals = new List&lt;int&gt; { 1, 2, 3, 4, 5, 6 };
var words = new List&lt;string&gt; { "sky", "blue", "war", "toy", "tick" };

Shuffle&lt;int&gt;(vals);
Shuffle&lt;string&gt;(words);

foreach (var e in vals)
{
    Console.Write($"{e} ");
}

Console.WriteLine("\n-----------------------");

foreach (var e in words)
{
    Console.Write($"{e} ");
}

Console.WriteLine();

void Shuffle&lt;T&gt;(IList&lt;T&gt; vals)
{
    int n = vals.Count;

    while (n &gt; 1)
    {
        n--;
        int k = rng.Next(n + 1);

        T value = vals[k];

        vals[k] = vals[n];
        vals[n] = value;
    }
}

We shuffle an a list of integers and words.

$ dotnet run
6 2 3 1 4 5 
-----------------------
toy war sky blue tick 
$ dotnet run
2 5 1 4 3 6 
-----------------------
war sky blue toy tick 

Next we create methods for list access.

Program.cs
  

var vals = new List&lt;int&gt; { 1, 2, 3, 4, 5, 6 };
var words = new List&lt;string&gt; { "sky", "blue", "war", "toy", "tick" };

Console.WriteLine(First(vals));
Console.WriteLine(Second(vals));
Console.WriteLine(Last(vals));
Console.WriteLine(SecondLast(vals));

Console.WriteLine("--------------");

Console.WriteLine(First(words));
Console.WriteLine(Second(words));
Console.WriteLine(Last(words));
Console.WriteLine(SecondLast(words));

T First&lt;T&gt;(IList&lt;T&gt; items) =&gt; items[0];
T Second&lt;T&gt;(IList&lt;T&gt; items) =&gt; items[1];
T Last&lt;T&gt;(IList&lt;T&gt; items) =&gt; items[^1];
T SecondLast&lt;T&gt;(IList&lt;T&gt; items) =&gt; items[^2];

In the example, we have four generic methods to get the first, second, last, and 
last but one elements of the list.

Console.WriteLine(First(vals));
Console.WriteLine(Second(vals));
...

The compiler infers the type of the parameter based on the value we pass to the
method; therefore, specifying type (e.g. First&lt;int&gt;) is
optional.

$ dotnet run
1
2
6
5
--------------
sky
blue
tick
toy

## C# generic delegate

In the following example, we define a generic delegate. The dynamic
keyword tells compiler that the type of its variable is specified at runtime.

Program.cs
  

var mv1 = new ModifyVal&lt;int&gt;(Inc);
var mv2 = new ModifyVal&lt;int&gt;(Dec);
var mv3 = new ModifyVal&lt;float&gt;(Inc);
var mv4 = new ModifyVal&lt;float&gt;(Dec);

Console.WriteLine(mv1(7));
Console.WriteLine(mv2(7));
Console.WriteLine(mv3(8f));
Console.WriteLine(mv4(8f));

T Inc&lt;T&gt;(T val)
{
    dynamic x = val;

    return ++x;
}

T Dec&lt;T&gt;(T val)
{
    dynamic x = val;

    return --x;
}

delegate T ModifyVal&lt;T&gt;(T fn);

We define a generic delegate ModifyVal; it is used to refer to 
two generic methods: Inc and Dec.

T Inc&lt;T&gt;(T val)
{
    dynamic x = val;

    return ++x;
}

The Inc is a generic method; it takes a generic parameter and
returns a generic value. The dynamic keyword helps simplify the 
code: we do not have to do type checking here. 

delegate T ModifyVal&lt;T&gt;(T fn);

This is the definition of the generic delegate.

$ dotnet run
8
6
9
7

## C# generic class

Next, we define a generic class.

Program.cs
  

var ds1 = new DataStore&lt;string&gt;();
ds1.Data = "an old falcon";
Console.WriteLine(ds1);

var ds2 = new DataStore&lt;int&gt;();
ds2.Data = 23;
Console.WriteLine(ds2);

var ds3 = new DataStore&lt;bool&gt;();
ds3.Data = false;
Console.WriteLine(ds3);

class DataStore&lt;T&gt;
{
    public T Data { get; set; }

    public override string ToString() 
    {
        return Data.ToString();
    }
}

The example stores a value in a generic field.

$ dotnet run
an old falcon
23
False

## C# generic FindAll

In the next example, we define a FindAll list extension method. 

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
  

var preds = new List&lt;Predicate&lt;int&gt;&gt;();
preds.Add(e =&gt; e &gt; 0);
preds.Add(e =&gt; e % 2 == 0);

var vals = new List&lt;int&gt; {-3, -2, -1, 0, 1, 2, 3, 4};
var filtered = vals.FindAll(preds);

foreach (var e in filtered) 
{
    Console.WriteLine(e);
}

Console.WriteLine("---------------------");

var words = new List&lt;string&gt; {"sky", "wrath", "wet", "sun", "pick", "who", 
    "cloud", "war", "water", "jump", "ocean"};

var preds2 = new List&lt;Predicate&lt;string&gt;&gt;();
preds2.Add(e =&gt; e.StartsWith("w"));
preds2.Add(e =&gt; e.Length == 3);

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

## C# generic constraints

The where clause in a generic definition specifies constraints on
the types that are used as arguments for type parameters in a generic type.

Program.cs
  

var animals = new List&lt;Animal&lt;Cat&gt;&gt; 
{
     new Animal&lt;Cat&gt;(), 
     new Animal&lt;Cat&gt;(),
     new Animal&lt;Cat&gt;()
};

foreach (var animal in animals) 
{
    Console.WriteLine(animal);
}

interface IAnimal { }
class Cat : IAnimal { }
class Lion : IAnimal { }
class Dog : IAnimal { }
class Flower {}

class Animal&lt;T&gt; where T : IAnimal { }

In the example, we define an Animal class that restricts the 
T type to be of IAnimal.

## C# generic list iterator

The following example creates a generic iterator.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cloud", "rock", "war", "web" };
var it = CreateIterator(words);

string e;

while ((e = it()) != null)
{
    Console.WriteLine(e);
}

Iterator&lt;T&gt; CreateIterator&lt;T&gt;(IList&lt;T&gt; data) where T : class
{
    var i = 0;
    return delegate { return (i &lt; data.Count) ? data[i++] : null; };
}

public delegate T Iterator&lt;T&gt;() where T : class;

An iterator uses an anonymous delegate.

$ dotnet run
sky
cloud
rock
war
web

## C# generic list forEach

The following example creates a generic forEach method for a list container.

Program.cs
  

Action&lt;int&gt; show = Console.WriteLine;

var vals = new List&lt;int&gt; { 1, 2, 3, 4, 5, 6, 7 };
forEach(vals, show);

Console.WriteLine("--------------------------");

var words = new List&lt;string&gt; { "sky", "cloud", "rock", "water" };
forEach(words, Console.WriteLine);

Console.WriteLine("--------------------------");

var users = new List&lt;User&gt; 
{
    new ("John Doe", "gardener"),
    new ("Roger Roe", "driver"),
};

forEach(users, Console.WriteLine);

void forEach&lt;T&gt;(IList&lt;T&gt; vals, Action&lt;T&gt; fn)
{
    foreach (T val in vals)
    {
        fn(val);
    }
}

record User(string Name, string Occupation);

The generic forEach method goes over integer, string, and User 
elements of three list containers.

void forEach&lt;T&gt;(IList&lt;T&gt; vals, Action&lt;T&gt; fn)

The forEach method takes a generic list and a generic
Action delegate as parameters.

$ dotnet run
1
2
3
4
5
6
7
--------------------------
sky
cloud
rock
water
--------------------------
User { Name = John Doe, Occupation = gardener }
User { Name = Roger Roe, Occupation = driver }

## C# generic dictionary ForEach

In the next example, we create a generic ForEach method for 
a dictionary.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{ 
    {"sk", "Slovakia"}, 
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

domains.ForEach((k, v) =&gt; Console.WriteLine($"{k} - {v}"));

var vals = new Dictionary&lt;int, string&gt;
{ 
    {1, "coin"}, 
    {2, "pen"},
    {3, "pencil"},
    {4, "book"}
};

vals.ForEach((k, v) =&gt; Console.WriteLine($"{k} - {v}"));

static class DictionaryExtension
{
    public static void ForEach&lt;T1, T2&gt;(this Dictionary&lt;T1, T2&gt; dict, Action&lt;T1, T2&gt; fn) {

        foreach(KeyValuePair&lt;T1, T2&gt; pair in dict) {
            fn(pair.Key, pair.Value);
        }
    }
}

The ForEach method is defined as an extension method. In the
Action delegate, we use the foreach loop to go over
the pairs of the dictionary.

$ dotnet run
sk - Slovakia
ru - Russia
de - Germany
no - Norway
1 - coin
2 - pen
3 - pencil
4 - book

## Source

[Generic classes and methods](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics)

In this article we have covered generic programming in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).