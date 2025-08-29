+++
title = "C# Property"
date = 2025-08-29T19:51:15.273+01:00
draft = false
description = "C# Property tutorial shows how to work with properties in C#. A property is a member that provides a flexible mechanism to read, write, or compute the value of a private field."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Property

last modified January 31, 2024

 

In this article we show how to work with properties in C#.

A property is a member that provides a flexible mechanism to read, write, or
compute the value of a private field.

Properties use accessors through which the values of the private fields can be
read, written or manipulated. Property reads and writes are translated to get
and set method calls. Properties shield the data from the outside world while
having a convenient field access.

A get property accessor is used to return the property value, and a
set property accessor is used to assign a new value. The
init property accessor is used to assign a new value only during
object construction. The value keyword is used to define the value
that is assigned by the set or init accessor.

Properties can be read-write (they have both a get and a set accessor),
read-only (they have only a get accessor), or write-only (they have only a set
accessor).

## C# Property with backing field

The following example uses a property with a backing field.

Program.cs
  

User u = new();
u.Name = "Jane";

Console.WriteLine(u.Name);

class User
{
    private string? _name;

    public string? Name
    {
        get { return _name; }
        set { _name = value; }
    }
}

We have the Name property with the _name backing
field.

User u = new();
u.Name = "Jane";

Console.WriteLine(u.Name);

We create an instance of the User class. We access the member
field using the field notation.

public string? Name
{
   ...
}

We have a property that is called Name. It looks like a regular
method declaration. The difference is that it has specific accessors called
get and set.

get { return _name; }
set { _name = value; }

The get property accessor is used to return the property value and
the set accessor is used to assign a new value. The
value keyword is used to define the value being assigned by the set
accessor.

## C# read-only property

To create a read-only property, we omit the set accessor and provide only the
get accessor in the implementation.

Program.cs
  

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

class User(string name, string occupation)
{
    public string Name
    {
        get { return name; }
    }

    public string Occupation
    {
        get { return occupation; }
    }

    public override string ToString()
    {
        return $"{name} is a {occupation}";
    }
}

In the example, we have read-only properties. Once initialized in the
constructor, they cannot be modified.

public string Name
{
    get { return name; }
}

We make the property read-only by providing a get accessor only.

## C# auto-implemented properties

C# has auto-implemented or automatic properties. With automatic properties,
the compiler transparently provides the backing fields for us.

Program.cs
  

var u = new User();
u.Name = "John Doe";
u.Occupation = "gardener";

Console.WriteLine($"{u.Name} is a {u.Occupation}");

class User
{
    public string? Name { get; set; }
    public string? Occupation { get; set; }
}

This code is much shorter. We have a User class in which we
have two properties: Name and Occupation.

var u = new User();
u.Name = "John Doe";
u.Occupation = "gardener";

Console.WriteLine($"{u.Name} is a {u.Occupation}");

We normally use the properties as usual.

public string? Name { get; set; }
public string? Occupation { get; set; }

Here we have two automatic properties. There is no implementation of the
accessors and there are no member fields. The compiler will do the rest for us.

$ dotnet run
John Doe is a gardener

## C# init-only property

The init keyword is used to create init-only properties; these
properties can be initialized only during object construction.

Program.cs
  

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

class User(string name, string occupation)
{
    public string Name { get; init; } = name;
    public string Occupation { get; init; } = occupation;

    public override string ToString()
    {
        return $"{Name} is a {Occupation}";
    }
}

We define two init-only properties; they are initialized at the object
construction. Later, they become immutable.

class User(string name, string occupation)
{
   ...
}

We use the primary constructor. It gives us two parameters: name
and occupation. They are later used to initialize properties.

public string Name { get; init; } = name;
public string Occupation { get; init; } = occupation;

The init-only properties are created with the init keyword.

## C# required properties

The required keyword is used to force the clien to implement the
property.

Program.cs
  

var u = new User { Name = "John Doe", Occupation = "gardener" };
Console.WriteLine(u);

var u2 = new User { Name = "Roger Roe" };
Console.WriteLine(u2);

class User
{
    public required string Name { get; init; }
    public string? Occupation { get; init; }

    public override string ToString()
    {
        return $"User{{ {Name} {Occupation} }}";
    }
}

We must use object initializers to create an object with a required
property.

$ dotnet run
User{ John Doe gardener }
User{ Roger Roe  }

## C# expression body definitions

Properties can be simplified with expression body definitions. Expression body
definitions consist of the =&gt; symbol followed by the expression
to assign to or retrieve from the property.

Program.cs
  

var u = new User("John Doe", "gardener");
Console.WriteLine($"{u.Name} is a {u.Occupation}");

class User
{
    private string _name;
    private string _occupation;

    public User(string name, string occupation)
    {
        Name = name;
        Occupation = occupation;
    }

    public string Name
    {
        get =&gt; _name;
        set =&gt; _name = value;
    }

    public string Occupation
    {
        get =&gt; _occupation;
        set =&gt; _occupation = value;
    }
}

In the example, we use the expression body definitions to define properties for
the User class.

$ dotnet run
John Doe is a gardener

## Other notes

We can mark properties with access modifiers like public,
private or protected. Properties can be also
static, abstract, virtual and
sealed. Their usage is identical to regular methods.

Program.cs
  

var bs = new Base();
var dr = new Derived();

Console.WriteLine(bs.Name);
Console.WriteLine(dr.Name);

class Base
{
    protected string _name = "Base class";

    public virtual string Name
    {
        set { _name = value; }
        get { return _name; }
    }
}

class Derived : Base
{
    protected new string _name = "Derived class";

    public override string Name
    {
        set { _name = value; }
        get { return _name; }
    }
}

In the preceding example, we define a virtual property and override it in the
Derived class.

public virtual string Name
{
    set { _name = value; }
    get { return _name; }
}

The Name property is marked with the virtual keyword.

protected new string _name = "Derived class";

We are hiding a member in the Derived class. To suppress the compiler warning,
we use the new keyword.

public override string Name
{
    set { _name = value; }
    get { return _name; }
}

And here we override the Name property of the
Base class.

## Source

[Properties - programming guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties)

In this article we have covered C# properties.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).