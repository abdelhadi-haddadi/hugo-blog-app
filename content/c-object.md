+++
title = "C# object"
date = 2025-08-29T19:51:10.620+01:00
draft = false
description = "C# object tutorial shows how to create and work with objects in C#. An object is a basic building block of a C# program."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# object

last modified July 5, 2023

 

In this article we show how to create and work with objects in C#.

An object is a basic building block of a C# program.

An object is a combination of data and methods. The data and the methods are
called members of an object. All types are objects in C#.

Objects are created from templates. The templates are defined with
class, struct, or record keywords.
We say that we create object *instances* from these templates.

Attributes and methods of an object are accessed with the dot operator.
Constructors are specialized methods for creating objects.

## C# struct object

A structure is a value type. The type is defined with the struct
keyword. Structures are meant to represent lightweight objects like Point,
Rectangle, Color and similar.

Program.cs
  

var p = new Point(2, 5);
Console.WriteLine(p);

public struct Point
{
    private int x;
    private int y;

    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public override string ToString()
    {
        return $"Point x:{x}, y:{y}";
    }
}

In the program, we create a lightweight object from a Point
structure. We also override the ToString method, which gives a
human-readable representation of the object.

$ dotnet run
Point x:2, y:5

## Primitive types are objects

C# primitive types are objects. Under the hood, they are structures.

Program.cs
  

float x = 12.3f;
int y = 34;
bool z = false;

Console.WriteLine(x.GetType());
Console.WriteLine(y.GetType());
Console.WriteLine(z.GetType());

Console.WriteLine(y.Equals(34));

We assign three primitive types to three variables.

Console.WriteLine(x.GetType());
Console.WriteLine(y.GetType());
Console.WriteLine(z.GetType());

Console.WriteLine(y.Equals(34));

The float, int, and bool types are objects. We call GetType and
Equals methods on these objects.

## C# object's ToString method

Each object has a ToString method. It returns a human-readable
representation of an object. The default implementation returns the fully
qualified name of the type of the Object. Note that when we call
the Console.WriteLine method with an object as a parameter, the
ToString is being called.

Program.cs
  

var b = new Being();
var o = new Object();

Console.WriteLine(o.ToString());
Console.WriteLine(b.ToString());
Console.WriteLine(b);

class Being
{
    public override string ToString()
    {
        return "This is Being class";
    }
}

We have a Being class in which we override the default
implementation of the ToString method.

public override string ToString()
{
    return "This is Being class";
}

Each class created inherits from the base object. The
ToString method belongs to this object class. We use the
override keyword to inform that we are overriding a method.

var b = new Being();
var o = new Object();

We create one custom defined object and one built-in object.

Console.WriteLine(o.ToString());
Console.WriteLine(b.ToString());

We call the ToString method on these two objects.

Console.WriteLine(b);

As we have specified earlier, placing an object as a parameter to the
Console.WriteLine will call its ToString method.
This time, we have called the method implicitly.

$ dotnet run
System.Object
This is Being class
This is Being class

## C# object attributes

Object attributes is the data bundled in an instance of a class. The object
attributes are called *instance variables* or *member fields*. An
instance variable is a variable defined in a object template, for which each
object in the template has a separate copy.

Program.cs
  

var u1 = new User();
u1.name = "John Doe";
u1.occupation = "gardener";

var u2 = new User();
u2.name = "Roger Roe";
u2.occupation = "driver";

Console.WriteLine(u1);
Console.WriteLine(u2);

class User
{
    public string? name;
    public string? occupation;

    public override string ToString()
    {
        return $"{name} is a {occupation}";
    }
}

We have a User class with two member fields.

class User
{
    public string? name;
    public string? occupation;

    public override string ToString()
    {
        return $"{name} is a {occupation}";
    }
}

We declare a name and occupation member fields. The public
keyword specifies that the member fields are accessible outside the class block.

var u1 = new User();
u1.name = "John Doe";
u1.occupation = "gardener";

We create an instance of the User class and set the name and
occupation attributes. We use the dot operator to access the attributes of
objects.

Console.WriteLine(u1);
Console.WriteLine(u2);

We print the two user objects to the console.

$ dotnet run
John Doe is a gardener
Roger Roe is a driver

## C# object methods

Methods are functions defined inside the body of an object template. They are
used to perform operations with the attributes of our objects.

Program.cs
  

var c = new Circle();
c.SetRadius(5);

Console.WriteLine(c.Area());

class Circle
{
    private int radius;

    public void SetRadius(int radius)
    {
        this.radius = radius;
    }

    public double Area()
    {
        return this.radius * this.radius * Math.PI;
    }
}

In the code example, we have a Circle class. We define two methods.

private int radius;

We have one member field. It is the radius of the circle. The
private keyword is an access specifier. It tells that the variable
is restricted to the outside world. If we want to modify this variable from the
outside, we must use the publicly available SetRadius  method.

public void SetRadius(int radius)
{
    this.radius = radius;
}

This is the SetRadius method. The this variable is a
special variable which we use to access the member fields from methods. The
this.radius is an instance variable, while the radius is a local
variable, valid only inside the SetRadius method.

var c = new Circle();
c.SetRadius(5);

We create an instance of the Circle class and set its radius by
calling the SetRadius method on the object of the circle. We use
the dot operator to invoke the method.

public double Area()
{
    return this.radius * this.radius * Math.PI;
}

The Area method returns the area of a circle. The
Math.PI is a built-in constant.

$ dotnet run
78.5398163397448

## C# object constructor

Constructors are used to initialize fields.

Program.cs
  

var name = "Lenka";
var dob = new DateTime(1990, 3, 5);

var u = new User(name, dob);
Console.WriteLine(u);

class User
{
    private DateTime Born;
    private string Name;

    public User(string Name, DateTime Born)
    {
        this.Name = Name;
        this.Born = Born;
    }

    public override string ToString() =&gt;
        $"{this.Name} was born on {this.Born.ToShortDateString()}";
}

We have a constructor for the User class.

var u = new User(name, dob);

We create the User object, passing its constructor two values.
This is the time when the constructor of the object is called.

public User(string Name, DateTime Born)
{
    this.Name = Name;
    this.Born = Born;
}

Inside the constructor method, we initialize two attributes: Name
and Born. Since the names of the attributes and constructor
parameters are the same, the this keyword is mandatory. It is used
to refer to the attributes of the class.

$ dotnet run
Lenka was born on 3/5/1990

## C# object auto-implemented properties

C# has auto-implemented or automatic properties. With automatic properties,
the compiler transparently provides the backing fields for us.

Program.cs
  

var u = new User();
u.Name = "John Doe";
u.Occupation = "gardener";

Console.WriteLine($"{u.Name} is a {u.Occupation}");

struct User
{
    public string? Name { get; set; }
    public string? Occupation { get; set; }
}

This code is much shorter. We have a User struct in which we have
two properties: Name and Occupation.

var u = new User();
u.Name = "John Doe";
u.Occupation = "gardener";

Console.WriteLine($"{u.Name} is a {u.Occupation}");

We normally use the properties as usual.

public string? Name { get; set; }
public string? Occupation { get; set; }

Here we have two automatic properties. There is no implementation of the
accessors and there are no member fields. The compiler autogenerates them for
us.

$ dotnet run
John Doe is a gardener

## C# object deconstruction

Deconstructing is unpacking types into single pieces; for instance, a tuple into
its items or an object into its properties.

To deconstruct class instances, we have to implement the Deconstruct
method.

Program.csx
  

var u = new User("John", "Doe", "gardener");
var (fname, lname, occupation) = u;

Console.WriteLine($"{fname} {lname} is a(n) {occupation}");

var (fn, ln) = u;
Console.WriteLine($"{fn} {ln}");

class User
{
    string FirstName { get; set; }
    string LastName { get; set; }
    string Occupation { get; set; }

    public User(string fname, string lname, string occupation)
    {
        FirstName = fname;
        LastName = lname;
        Occupation = occupation;
    }

    public void Deconstruct(out string fname, out string lname)
    {
        fname = FirstName;
        lname = LastName;
    }

    public void Deconstruct(out string fname, out string lname,
        out string occupation)
    {
        fname = FirstName;
        lname = LastName;
        occupation = Occupation;
    }
}

We can have multiple Deconstruct methods.

var u = new User("John", "Doe", "gardener");
var (fname, lname, occupation) = u;

Here, we deconstruct the User type into three variables.

var (fn, ln) = u;
Console.WriteLine($"{fn} {ln}");

Here, we deconstruct the user into two variables.

public void Deconstruct(out string fname, out string lname)
{
    fname = FirstName;
    lname = LastName;
}

The variables that are deconstructed have the out modifier.

$ dotnet run
John Doe is a(n) gardener
John Doe

## C# record object

A record is a reference type whose main purpose is to hold data. Records allow
us to create objects quickly.

Program.cs
  

var users = new List&lt;User&gt;
{
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
};

users.ForEach(Console.WriteLine);

Console.WriteLine(users[0].FirstName);
Console.WriteLine(users[0].LastName);
Console.WriteLine(users[0].Salary);

record User(string FirstName, string LastName, int Salary);

In the example, we have a list of User object.s

var users = new List&lt;User&gt;
{
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
};

A list of objects is created. Target-typed new expressions do not require type
specification for constructors when the type is known. The compiler infers the
type from the left side of the assignment operation.

Console.WriteLine(users[0].FirstName);
Console.WriteLine(users[0].LastName);
Console.WriteLine(users[0].Salary);

We access the three attributes of the record object with the dot operator.

record User(string FirstName, string LastName, int Salary);

The record is defined in one line. A record autogenerates several methods for
us, including Object.Equals and Object.ToString.

$ dotnet run
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
John
Doe
1230

## Source

[Objects - create instances of types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/objects)

In this article we have worked with objects in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).