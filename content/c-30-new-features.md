+++
title = "C# 3.0 new features"
date = 2025-08-29T20:03:03.183+01:00
draft = false
description = "This part of the C# tutorial covers new features of C# 3.0."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../io/)
[Next](../csharp4/)

# C# 3.0 new features

last modified October 18, 2023

In this part of the C# tutorial, we talk about some of the
new features of the C# version 3.0. Microsoft introduced this
version of the C# in August 2007. Mono C# compiler fully supported
the new version by July 2008.

The C# 3.0 version brought the following new features to the language:

  - Implicitly typed variables

  - Implicitly typed arrays

  - Object &amp; collection initializers

  - Automatic properties

  - Anonymous types

  - Extension methods

  - Query expressions

  - Lambda expressions

  - Expression trees

Query expressions, lambda expressions and expression trees are beyond the
scope of this tutorial. They are closely connected to the *LINQ*.
LINQ (Language Integrated Query) is a Microsoft .NET Framework component 
that adds native data querying capabilities to .NET languages.

## Implicitly typed local variables &amp; arrays

Both implicitly typed local variables &amp; arrays are 
connected with the var keyword. It is an implicit
data type. In some cases, we do not have to specify the type for 
a variable. When the usage of the var keyword is 
allowed, the compiler will find and use the type for us.
The process is called type inference. 

In some cases, the var keyword is not allowed. 
It can be used only on a local variable. It cannot be applied
on a field in a class scope. It must be declared and initialized
in one statement. The variable cannot be initialized to null.

using System;

public class CSharpApp
{
    static void Main()
    {
        int x = 34;
        var y = 32.3f;
      
        var name = "Jane";
 
        Console.WriteLine(x);
        Console.WriteLine(y.GetType());
        Console.WriteLine(name.GetType());
    }
}

We have a small example, where we use the var type.

int x = 34;
var y = 32.3f;

The first variable is explicitly typed, the second variable is
implicitly typed. The compiler will look at the right side of
the assignment and infer the type of the variable. 

Console.WriteLine(y.GetType());
Console.WriteLine(name.GetType());

These two lines will check the type of the two variables.

$ ./itlv.exe 
34
System.Single
System.String

As we can see, the two variables use the familiar, built-in data
types. 

Implicitly typed arrays are arrays, in which the type of the array is 
inferred from the elements of the array in the array initializer by the compiler. 
The rules are the same as for implicitly typed local variables. 
Implicitly typed arrays are mostly used in query expressions together 
with anonymous types and object and collection initializers.

using System;

public class CSharpApp
{
    static void Main()
    {
        var items = new[] { "C#", "F#", "Python", "C" };

        foreach (var item in items)
        {
            Console.WriteLine(item);
        }
    }
}

An example demonstrating the implicitly typed arrays. 

var items = new[] { "C#", "F#", "Python", "C" };

We again use the var keyword. The square brackets
on the left side are omitted. 

foreach (var item in items)
{
    Console.WriteLine(item);
}

The foreach loop is used to traverse the array. Note the use
of the local implicitly typed item variable. 

$ ./ita.exe 
C#
F#
Python
C

## C# object initializers

Object initializers give a new syntax for creating and initiating objects. 
Inside a pair of curly brackets {} we initiate members of a class through 
a series of assignments. They are separated by comma character. 

using System;

public class Person 
{
    private string _name; 
    private int _age;

    public string Name
    {
        get { return _name; }
        set { _name = value;} 
    }

    public int Age
    {
        get { return _age; }
        set { _age = value;} 
    }

    public override string ToString()
    {
        return String.Format("{0} is {1} years old", _name, _age);
    }
}

public class ObjectInitializers
{
    static void Main()
    {
        Person p1 = new Person();
        p1.Name = "Jane";
        p1.Age = 17;

        Person p2 = new Person { Name="Becky", Age=18 };

        Console.WriteLine(p1);
        Console.WriteLine(p2);
    }
}

In the above example, we have a Person class with two properties. 
We create two instances of this class. We use the old way and we
also use the object initializer expression.

public string Name
{
    get { return _name; }
    set { _name = value;} 
}

This is a Name property with set a get accessors. 

Person p1 = new Person();
p1.Name = "Jane";
p1.Age = 17;

This is the old way of creating an object and initiating
it with values using the field notation. 

Person p2 = new Person { Name="Becky", Age=18 };

This is the object initializer. Inside curly brackets, the
two members are initiated. 

## C# collection initializers

Collection initializers are a way of initiating collections where
the elements of a collection are specified inside curly brackets. 

List &lt;string&gt; planets = new List&lt;string&gt;();

planets.Add("Mercury");
planets.Add("Venus");
planets.Add("Earth");
planets.Add("Mars");
planets.Add("Jupiter");
planets.Add("Saturn");
planets.Add("Uranus");
planets.Add("Neptune");

This is the classic way of initiating a collection. In the following 
example, we use a collection initializer for the same generic list.

using System;
using System.Collections.Generic;

public class CollectionInitializers
{
    static void Main()
    {
        List &lt;string&gt; planets = new List &lt;string&gt; 
            {"Mercury", "Venus", "Earth", "Mars", "Jupiter",
              "Saturn", "Uranus", "Neptune"};

        foreach (string planet in planets)
        {
            Console.WriteLine(planet);
        }
    }
}

We create a generic list of planets.

List &lt;string&gt; planets = new List &lt;string&gt; 
    {"Mercury", "Venus", "Earth", "Mars", "Jupiter",
      "Saturn", "Uranus", "Neptune"};

This is the collection initializer expression. The planet
names are specified between the curly brackets. We save
a some typing. We do not need to call the Add 
method for each item of the collection. 

$ ./collectioninitializers.exe 
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

Here we can see the output of the collectioninitializers.exe program.

## C# automatic properties

In a software project, there are lots of simple properties that only
set or get some simple values. To simplify programming and to make
the code shorter, automatic properties were created. Note that we
cannot use automatic properties in all cases. Only for the simple
ones. 

using System;

public class Person 
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class AutomaticProperties
{
    static void Main()
    {
        Person p = new Person();
        p.Name = "Jane";
        p.Age = 17;
        
        Console.WriteLine("{0} is {1} years old", 
            p.Name, p.Age);
    }
}

This code is much shorter. We have a person class in which we
have two properties.

public string Name { get; set; }
public int Age { get; set; }

Here we have two automatic properties. There is no implementation
of the accessors. And there are no member fields. The compiler will
do the rest for us. 

Person p = new Person();
p.Name = "Jane";
p.Age = 17;

Console.WriteLine("{0} is {1} years old", 
    p.Name, p.Age);

We normally use the properties as usual. 

$ ./automatic.exe 
Jane is 17 years old

## C# anonymous types

The Person class that we have used in the previous example is said to be a type. 
More precisely, it is a user defined type. The type has a name and we can explicitly create
an instance of it by referring to its name. On the other hand, anonymous types are types
that do not have a name. They are class types that consist of one or more 
public read-only properties. No other kinds of class members are allowed.

Anonymous types are allow data types to encapsulate a set of properties into a single object 
without having to first explicitly define a type. Anonymous types must be stored in variables
declared with the var keyword, telling the C# compiler to use type inference 
for the variable. 

Anonymous types are created with the new keyword and object initializer.
The compiler will infer the types of the properties itself. It will give
the type a name, but it is only used by the compiler; it is not available
to the programmer. 

An anonymous type is another syntactic sugar to reduce typing. Anonymous types
are often used in LINQ expressions.

using System;

public class AnonymousType
{
    static void Main()
    {
        var p = new { Name="Jane", Age=17 };

        Console.WriteLine("{0} is {1} years old", p.Name, p.Age);
    }
}

This is an anonymous type example.

var p = new { Name="Jane", Age=17 };

An anonymous object initializer declares an anonymous type and 
returns an instance of that type. We use the var keyword because
we do not know the type. 

Console.WriteLine("{0} is {1} years old", p.Name, p.Age);

We access the properties created using the field access notation.

$ ./anonymoustype.exe 
Jane is 17 years old

## C# extension methods

Developers often face situations in which they would like to extend
an existing type, but it is not possible. For example, the class is 
sealed. The extension method is a workaround for such cases. Extension
methods are a special kind of a static method, but 
they are called as if they were instance methods on the extended type.
To create an extension method, we need a static class and a static method.
When we call our extension method on a class, the compiler does some behind
the scenes processing; it appears as if we have called the extension
method on the object of a type. 

It is also possible, and it was a common workaround in the past, to create
special utility classes for such methods. These were mostly created as static
methods of static classes. Both approaches have their advantages. It is also advised
to use extension methods sparingly. 

using System;

public static class Util
{
    public static string Reverse(this string input)
    {
        char[] chars = input.ToCharArray();

        Array.Reverse(chars);
        return new String(chars);
    }
}

public class ExtentionMethod
{
    static void Main()
    {
        string str1 = "Jane";
        string str2 = str1.Reverse();

        Console.WriteLine(str2);  
    }
}

In our case, we would like to add a new method to a string class. The string
class is a built-in class and it is sealed. No inheritance is possible. This is 
why we need an extension method. 

public static class Util
{
    public static string Reverse(this string input)
    {
        char[] chars = input.ToCharArray();

        Array.Reverse(chars);
        return new String(chars);
    }
}

We have a Reverse extension method. This method reverses 
characters of a string variable. The method and its class must be static. 
The static Reverse method becomes an extension method, 
when we put the this modifier as the first parameter of the method. 

string str1 = "Jane";
string str2 = str1.Reverse();

We define and initialize a string variable. We call the Reverse 
method on this variable. Even though the method is static, we use the instance method
call syntax. 

$ ./extentionmethods.exe 
enaJ

In this part of the C# tutorial we have talked about new features of the C# 3.0.

[Contents](..)  
[Previous](../io/)
[Next](../csharp4/)