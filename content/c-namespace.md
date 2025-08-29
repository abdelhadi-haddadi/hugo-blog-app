+++
title = "C# namespace"
date = 2025-08-29T19:51:08.306+01:00
draft = false
description = "C# namespace tutorial shows how to organize C# code with namespaces. Namespaces classify and present programming elements that are exposed to other programs and applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# namespace

last modified July 5, 2023

 

In this article we cover namespaces in C#.

Namespaces are used to organize code at the highest logical level. They classify
and present programming elements that are exposed to other programs and
applications. Within a namespace, we can declare another namespace, a class, an
interface, a structure, an enumeration or a delegate. 

We cannot define items such as properties, variables and events in top-level
space. These items must be declared within containers such as structures or
classes. Namespaces prevent ambiguity and simplify references when using large
groups of objects.

Namespaces organize objects in an assembly. An assembly is a reusable,
versionable and self-describing building block of a CLR application. Assemblies
can contain multiple namespaces. Namespaces can contain other namespaces. An
assembly provides a fundamental unit of physical code grouping. A namespace
provides a fundamental unit of logical code grouping.

**Note:** We cannot use top-level statements with namespaces.

Some programming languages use modules or packages for the same purpose.

## C# create a namespace

The namespace keyword is used to declare a namescpace in C#. The
name of the namespace must be a valid C# identifier name. Namespaces are
delimited with the . operator. The using directive
removes the requirement to specify the name of the namespace for every class.

## C# file-scoped namespaces

C# 10 introduced file-scoped namespaces. When we use the namespace
keyword without curly braces, the entire file becomes a namespace.

## C# built-in namespaces

The built-in libraries are organized within namespaces. 

Program.cs
  

var hostName = System.Net.Dns.GetHostName();
Console.WriteLine($"Hostname: {hostName}");

For instance, the GetHostName function is available within the
System.Net.Dns namespace. To call the method, we use its
fully qualified name. Fully qualified names are object references that are
prefixed with the name of the namespace where the object is defined.

Program.cs
  

using System.Net;

var hostName = Dns.GetHostName();
Console.WriteLine($"Hostname: {hostName}");

With the using statement, we include the System.Net
namespace into our program. Now we can call Dns.GetHostName
without explicitly specifying System.Net.

## C# sharing namespace

In the following code, we have two files that share the same namespace. 

Counter.cs
  

namespace Sharing;

class Counter
{
    public int x = 0;

    public void Inc()
    {
        x += 100;
        Console.WriteLine(x);
    }
}

We have a Sharing namespace. In the namespace, we have an 
Counter class. 

namespace Sharing;

We declare a namespace called Sharing. The namespace applies to the 
current file.

Program.cs
  

namespace Sharing;

public class Program
{
    static void Main()
    {
        var counter = new Counter();

        counter.Inc();
        counter.Inc();
    }
}

In the Program class, we work with the Counter class
from the previous file. We invoke its Inc method.

namespace Sharing;
...

We work in the same namespace.

var counter = new Counter();
    
counter.Inc();
counter.Inc();

We create an instance of the Counter class. We call its 
Inc method twice. Because we work with objects of the 
same namespace, we do not need to specify its name explicitly. 

$ dotnet run
100
200

## C# distinct namespaces

The following code example has two distinct namespaces. We use the
using keyword to import elements from a different namespace. 

Basic.cs
  

namespace Mathematical;

public class Basic
{
    public static double PI = 3.141592653589;

    public static double GetPi()
    {
        return PI;
    }
}

In the Basic class, we define a PI 
constant and a GetPi method. The Basic class is
defined within the Mathematical namespace.

Program.cs
  

using Mathematical;

namespace Distinct;

public class Program
{
    static void Main()
    {
        Console.WriteLine(Basic.PI);
        Console.WriteLine(Basic.GetPi());

        Console.WriteLine(Mathematical.Basic.PI);
        Console.WriteLine(Mathematical.Basic.PI);
    }
}

In this file, we use the elements from the MyMath namespace. 

using Mathematical;

We import the elements from the MyMath namespace into our
namespace. 

Console.WriteLine(Basic.PI)
Console.WriteLine(Basic.GetPI())

Now we can use those elements. In our case it is the Basic class.

Console.WriteLine(Mathematical.Basic.PI);
Console.WriteLine(Mathematical.Basic.PI);

Another way to access the elements is to specify the fully-qualified name of the
elements.

$ dotnet run
3.141592653589
3.141592653589
3.141592653589
3.141592653589

## C# root namespace

The root namespace is the mainspace of the .NET libraries. It may happen that
someone creates a type or a namespace that conflicts with ones from the .NET. In
such cases, we can refer to the root namespace with the
global:: prefix. 

Program.cs
  

namespace ZetCode;

class System
{
    public override string ToString()
    {
        return "This is System class";
    }
}

public class Program
{
    static void Main()
    {
        var sys = new System();
        global::System.Console.WriteLine(sys);
    }
}

In our ZetCode namespace, we create a System class
that will clash with the one from .NET. (Note that it is not a good idea to 
create such a namespace.)

var sys = new System();

Here we refer to the System class from the ZetCode namespace. 

global::System.Console.WriteLine(sys); 

With the global:: prefix, we point to the System 
class of the root namespace. 

## C# default namespace

The root namespace is also the default namespace for C# programs. Elements that
are not included in a namespace are added to the unnamed default namespace. 

Program.cs
  

struct Book 
{
    public override string ToString()
    {
        return "Book struct in a default namespace";
    }
}

namespace MainProgram
{
    struct Book 
    {
        public override string ToString()
        {
            return "Book struct in a MainProgram namespace";
        }
    }

    public class Program
    {
        static void Main()
        {
            Book book1;
            global::Book book2;

            Console.WriteLine(book1);
            Console.WriteLine(book2);
        }
    }
}

We have two Book structures; one is defined in the 
MainProgram namespace, the other is defined outside this namespace.

struct Book 
{
    public override string ToString()
    {
        return "Book struct in a default namespace";
    }
}

This Book structure is defined outside of the custom named 
MainProgram namespace. It belongs to the default namespace. 

Book book1;

We refer to the structure defined inside the MainProgram namespace.

global::Book book2;

With the global:: prefix we point to the structure defined
outside the MainProgram namespace.

$ dotnet run
Book struct in a MainProgram namespace
Book struct in a default namespace

## C# namespace aliasing

The using keyword can be used to create an alias for a namespace.
With nested namespaces, the fully qualified names might get long. We can shorten
them by creating aliases.

Program.cs
  

namespace ZetCode
{
    namespace Items
    {
        class Book 
        {
            public override string ToString()
            {
                return "This is a book";
            }
        }
    } 
}

namespace MainProgram
{
    using ZIB = ZetCode.Items.Book;

    public class Aliases
    {
        static void Main()
        {
            ZetCode.Items.Book book =  new ZetCode.Items.Book();
            ZIB book2 = new ZIB();
 
            System.Console.WriteLine(book);
            System.Console.WriteLine(book2);
        }
    }
}

In the example, we create an alias for a Book class that is 
enclosed by two namespaces. 

namespace ZetCode
{
    namespace Items
    {
        class Book 
        {
        ...
        }
    } 
}

It is possible to nest a namespace into another namespace. The fully qualified
name of the Book class is ZetCode.Items.Book. 

using ZIB = ZetCode.Items.Book;

The using keyword createas a ZIB alias for the 
fully qualified name ZetCode.Items.Book. 

ZetCode.Items.Book book =  new ZetCode.Items.Book();
ZIB book2 = new ZIB();

We use both names to create a book instance.

## Source

[Declare namespaces to organize types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/namespaces)

In this article we covered C# namespaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).