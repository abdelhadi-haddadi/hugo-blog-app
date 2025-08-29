+++
title = "C# 4.0 new features"
date = 2025-08-29T20:03:03.188+01:00
draft = false
description = "This part of the C# tutorial covers new features of C# 4.0."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../csharp3/)

# C# 4.0 new features

last modified October 18, 2023

In this part of the C# tutorial, we talk about some of the
new features of the C# version 4.0. Microsoft introduced this
version of the C# in April 2010 with Visual Studio 2010. Mono C# 
compiler fully supported the new version by October 2010 with 
the release of Mono 2.8.

The C# version 4.0 brought the following new features to the language:

  - Dynamic programming

  - Named parameters

  - Optional parameters

  - Covariance and contravariance for generics and delegates

## Dynamic programming

The new version of the C# language brought a new type *dynamic*.
Once a variable is declared as having type dynamic, operations on these value 
are not done or verified at compile time, but instead happen entirely at runtime.
This is known also as *duck typing*. The name of the concept refers 
to the duck test which may be phrased as follows: "When I see a bird that walks like a duck 
and swims like a duck and quacks like a duck, I call that bird a duck". In other words,
we are concerned about what the object is doing rather than with the type of the object.
The dynamic type is used to simplify access to COM objects, IronPython and IronRuby
libraries and to the HTML DOM. 

using System;

public class Duck
{
    public void quack()
    {
        Console.WriteLine("Quaaaack");
    }
}

public class Person
{
    public void quack()
    {
        Console.WriteLine("Person imitates a duck");
    }
}

public class DuckTyping
{
    static void Main() 
    {
        Duck donald = new Duck();
        Person josh = new Person();
       
        InTheForest(donald);
        InTheForest(josh);
    }

    public static void InTheForest(dynamic duck)
    { 
        duck.quack();
    }
}

In our example, we have two classes. The Duck class and the Person
class. Both have the quack() method. 

public static void InTheForest(dynamic duck)
{ 
    duck.quack();
}

The InTheForest method has a dynamic parameter. The type of the object
is not important; we are concerned about the capabilities of the objects. 
If objects passed to the InTheForest method can invoke the 
quack method, then we are fine. 

$ dmcs ducktyping.cs
$ /usr/local/bin/mono ducktyping.exe 
Quaaaack
Person imitates a duck

We compile and run the program. We use the Mono dmcs compiler that is shipped
with the Mono 2.8 and supports the C# 4.0 profile. 

## C# named parameters

In earlier versions of the C# language, the arguments were provided in the order
in which they appeared in the method's signature. And the position in the
parameter list is important when evaluating a method. Named arguments enable us 
to specify the method parameters by their names. When specifying the named arguments,
the position of the parameter is not important anymore. 

using System;

public class NamedParameters
{
    static void Main() 
    {
        ShowMessage(name: "Jane", age: 17);
    }

    public static void ShowMessage(int age, string name)
    {
        Console.WriteLine("{0} is {1} years old", name, age);
    }
}

A simple example with named arguments. 

ShowMessage(name: "Jane", age: 17);

The parameter name is followed by the colon (:) character and
the value. The parameters may not be specified in order of the
method signature. 

$ ./named.exe 
Jane is 17 years old

## C# optional parameters

With C# 4.0 there are required parameters and optional parameters. 
Any call must provide arguments for all required parameters but it
can omit arguments for optional parameters. Optional parameters are 
defined at the end of the parameter list, after any required parameters.
An optional parameter is created when a default value is specified 
for the parameter. 

using System;

public class OptionalParameters
{
    static void Main() 
    {
        Power(4, 4);
        Power(5);
    }

    public static void Power(int x, int y=2)
    {
        int z = 1;

        for (int i=0; i&lt;y; i++)
        {
            z *= x;
        }

        Console.WriteLine(z);
    }
}

We have a Power method. The method takes two parameters: the base and 
the exponent. If we do not specify the exponent, then the default 2 is used. 

public static void Power(int x, int y=2)

In the method definition, we have a required x parameter and
the optional y parameter. The y has a default value.

Power(4, 4);
Power(5);

When we call the Power method, we can specify one or two 
parameters. 

$ ./optional.exe 
256
25

## C# covariance &amp; contravariance

Earlier versions of C# support covariance and contravariance in assignments, parameter
types and return types. C# version 4.0 brings covariance for generics and delegate types. 

Types that are *covariant* convert from a wider type  to 
narrower type. (For example, from double to float.) *Contravariant* 
types convert from a narrower type to a wider type. (For example, from short to int.) 
*Invariant* types are not able to convert.

using System;

public class Covariance
{
    static void Main()
    {
        object[] langs = {"C#", "Python", "PHP", "Java"};

        Console.WriteLine(langs[0]);
    }
}

Arrays of reference types are covariant from the beginning. 

object[] langs = {"C#", "Python", "PHP", "Java"};

We have an array of string values. The array is declared to be of
the object type, from which the string type
is derived.

$ ./covariance.exe 
C#

In the following example, we have a covariance for generics. 

using System;
using System.Collections.Generic;

public class Covariance2
{
    static void Main()
    {
        IEnumerable&lt;string&gt; strings = new List&lt;string&gt;() {"1", "3", "2", "5"};
        PrintAll(strings); 
    }

    static void PrintAll(IEnumerable&lt;object&gt; objects)
    {
        foreach (object o in objects)
        {
          System.Console.WriteLine(o);
        }
    }
}

We have a generic list of strings. We call the PrintAll 
method which prints all the elements of the list. Note that the method 
parameter has a narrower type parameter than our generic list. 

$ ./covariance2.exe 
1
3
2
5

The following is an example for a contravariance in delegates. 

using System;
using System.Collections.Generic;

public class Contravariance
{
    static void Main()
    { 
        Action&lt;string&gt; del = ShowMessage; 
        del("Proximity alert");         
    }

    static void ShowMessage(object message) 
    { 
        Console.WriteLine(message);
    }
}

We assign a method with a narrower parameter type to a delegate
which has a wider parameter type. 

$ ./contravariance.exe 
Proximity alert

In this part of the C# tutorial we have talked about new features of the C# 4.0.

[Contents](..) 
[Previous](../csharp3/)