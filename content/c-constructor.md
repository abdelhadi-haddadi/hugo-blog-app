+++
title = "C# constructor"
date = 2025-08-29T19:50:35.236+01:00
draft = false
description = "C# constructor tutorial shows how to work with constructors in C# language. A constructor is a method which is called when the object is created."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# constructor

last modified July 5, 2023

 

C# constructor tutorial shows how to work with constructors in C# language.

A constructor is a method which is called when the object is created. Classes,
structs and records have constructors. The purpose of the constructor is to
initiate the state of an object.

A constructor does not return a value and it does not use the void
keyword. It has the the same name as the class. The constructors can be
overloaded; i.e. there can be multiple constructors (having the same name)
having different parameters.

Constructors cannot be inherited. They are called in the order of inheritance.
If we do not write any constructor for a class, C# provides an implicit default
constructor. If we provide any kind of a constructor, then a default is not
supplied. 

A constructor cannot be abstract, final, and synchronized.

## C# constructor example

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
parameters are the same, the this keyword is mandatory. It is used to refer 
to the attributes of the class.

$ dotnet run
Lenka was born on 3/5/1990

The this keyword is not neccessary if we use different names 
for the constructor parameters.

Program.cs
  

var name = "Lenka";
var dob = new DateTime(1990, 3, 5);

var u = new User(name, dob);
Console.WriteLine(u);

class User
{
    private DateTime Born;
    private string Name;

    public User(string _Name, DateTime _Born)
    {
        Name = _Name;
        Born = _Born;
    }

    public override string ToString() =&gt;
        $"{this.Name} was born on {this.Born.ToShortDateString()}";
}

Since we used _Name and _Born constructor parameter
names, which differ from Name and Born attributes, we
can omit the this keyword.

## C# default constructor

A default constructor is one that does not take any parameter.

If we do not provide any constructor, C# creates one by default that
instantiates the object and sets member variables to the default values.

Program.cs
  

var u = new User();

Console.WriteLine(string.IsNullOrEmpty(u.Name));
Console.WriteLine(string.IsNullOrEmpty(u.Occupation));
Console.WriteLine(string.IsNullOrEmpty(u.Dob.ToString()));

Console.WriteLine(u);

class User
{
    public string Name { get; set; }
    public string Occupation { get; set; }
    public DateTime Dob { get; set; }

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} {this.Dob} }}";
}

We have a User class; we do not provide our own constructor, so C#
creates a default one. A default value for a string datatype is an
empty string and for DateTime the DateTime.MinValue.

$ dotnet run
True
True
False
User {   1/1/0001 12:00:00 AM }

## C# overloaded constructor

 
Constructors can be overloaded. 

Program.cs
  

var u1 = new User();
var u2 = new User("Tom");

class User
{
    public User()
    {
        Console.WriteLine("User is created");
    }

    public User(string name)
    {
        Console.WriteLine($"User {name} is created");
    }
}

We have two constructors in the User class. C# calls these
constructors based on parameters that we pass to them.

If we provide a custom constructor, C# does not create a default one. We can
explicitly create a default, no-parameter constructor.

var u1 = new User();

Here, the default, no-parameter constructor is called.

var u2 = new User("Tom");

Here, the second constructor which takes one parameter is called.

$ dotnet run
User is created
User Tom is created

## C# expression-bodied constructor

We can create expression-bodied constructors. For shorted constructors, they
provide a more concise and better looking syntax.

Program.cs
  

var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "driver");

Console.WriteLine(u1);
Console.WriteLine(u2);

class User
{
    private string Name;
    private string Occupation;

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

We have a constructor with two parameters; they are set in an expression-body.

public User(string Name, string Occupation) =&gt;
    (this.Name, this.Occupation) = (Name, Occupation);

The this keywords are mandatory in this case.

## C# constructor chaining

Constructor chaining is the ability of a class to call another constructor from
a constructor. To call another constructor from the same class, we use the
this keyword. 

Program.cs
  

var c1 = new Circle(5);
var c2 = new Circle();

class Circle
{
    public Circle(int radius)
    {
        Console.WriteLine($"Circle, r={radius} is created");
    }

    public Circle() : this(1) { }
}

We have a Circle class. The class has two constructors: the first
takes one parameter and the second does not take any parameter.

public Circle(int radius)
{
    Console.WriteLine("Circle, r={0} is created", radius);
}

This constructor takes one parameter — the radius.

public Circle() : this(1) { }

This is the constructor without a parameter. It simply calls the other
constructor and gives it a default radius of 1.

$ dotnet run
Circle, r=5 is created
Circle, r=1 is created

## C# base-class constructor

The base-class constructor is automatically called when the derived class is 
instantiated.

Program.cs
  

var u1 = new User();

Console.WriteLine("---------------");

var u2 = new User("Tom");

class Base
{
    public Base()
    {
        Console.WriteLine("Base constructor called");
    }
}

class User : Base
{
    public User()
    {
        Console.WriteLine("User constructor called");
    }

    public User(string user)
    {
        Console.WriteLine($"User {user} created");
    }
}

The User class inherits from the Base class. 
Both constructors call the base-class constructor.

$ dotnet run
Base constructor called
User constructor called
---------------
Base constructor called
User Tom created

With the base keyword, we can specify which base-class constructor
should be called when creating instances of the derived class.

Program.cs
  

var u1 = new User();

Console.WriteLine("---------------");

var u2 = new User("Tom");

class Base
{
    public Base()
    {
        Console.WriteLine("Base() called");
    }

    public Base(string name)
    {
        Console.WriteLine("Base(string name) called");
    }
}

class User : Base
{
    public User()
    {
        Console.WriteLine("User created");
    }

    public User(string name) : base(name) 
    {
        Console.WriteLine($"User {name} created");
    }
}

Now the Base class has two constructors. We can specify which 
constructors to call with the base keyword.

public User(string name) : base(name) 
{
    Console.WriteLine($"User {name} created");
}

We tell the constructor to call the base-constructor that takes one parameter.

$ dotnet run
Base() called
User created
---------------
Base(string name) called 
User Tom created

## C# copy constructor

A constructor which creates an object by copying variables from another object 
is called a copy constructor.

Program.cs
  

var u1 = new User("John Doe", "gardener");
var u2 = new User(u1);
u2.Name = "Roger Roe";

Console.WriteLine(u1);
Console.WriteLine(u2);

class User
{
    public string Name { get; set; }
    public string Occupation { get; set; }

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public User(User user)
    {
        this.Name = user.Name;
        this.Occupation = user.Occupation;
    }

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

The User class contains a copy constructor.

public User(User user)
{
    this.Name = user.Name;
    this.Occupation = user.Occupation;
}

The attributes of the class are assigned values from an object which is passed 
as a parameter to the constructor.

$ dotnet run
User { John Doe gardener }
User { Roger Roe gardener }

## C# private constructor

Other classes cannot create instances of a class with private-only constructors.
Private constructors are generally used in classes which have only static
members.

Program.cs
  

Console.WriteLine(MyMath.Pow(2));
Console.WriteLine(MyMath.Pow(2, 3));
Console.WriteLine(MyMath.Pow(2, 5));

// var mm = new MyMath();
// Console.WriteLine(mm.GetType());

class MyMath
{
    private MyMath() { }

    public static int Pow(int x, int y = 2)
    {
        int val = 1;

        for (int i = 0; i &lt; y; i++)
        {
            val *= x;
        }

        return val;
    }
}

We have a MyMath class which contains a sole static member. It is
designed to be used without creating its instance -- the private constructor
prohibits this.

$ dotnet run
4
8
32

## C# static constructor

A static constructor is used to initialize static data or to perform an action
that needs to be executed only once. It is called automatically before the first
instance is created or any static member is referenced.

Program.cs
  

var runner1 = new Runner(1);

Thread.Sleep(700);

var runner2 = new Runner(2);

Thread.Sleep(1100);

Console.WriteLine(runner1.Finish());
Console.WriteLine(runner2.Finish());

class Runner
{
    private static readonly DateTime StartTime;
    private long Id;

    static Runner() =&gt; StartTime = DateTime.Now;

    public Runner(long Id) =&gt; this.Id = Id;

    public string Finish()
    {
        DateTime EndTime = DateTime.Now;
        return $"Runner {this.Id} finished in {EndTime - StartTime}";
    }
}

We have a static, readonly variable called StartTime. It is
initiated with a static constructor when the first Runner is 
createad.

static Runner() =&gt; StartTime = DateTime.Now;

Once initialized, the static StartTime is available to all
instances of Runner.

$ dotnet run
Runner 1 finished in 00:00:01.8267889
Runner 2 finished in 00:00:01.8900243

## Source

[Constructors](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/constructors)

In this article we have worked with constructors in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).