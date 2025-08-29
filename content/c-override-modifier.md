+++
title = "C# override modifier"
date = 2025-08-29T19:51:11.752+01:00
draft = false
description = "C# override tutorial shows how to use override modifier in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# override modifier

last modified July 5, 2023

 

In this article we show how to use the override modifier in C#.

In C#, the override modifier is required to extend or modify the
abstract or virtual implementation of an inherited method, property, indexer, or
event.

## C# override virtual method

The Object is the root of the C# type system. It supports all
classes and provides low-level services to derived classes.

The Object.ToString returns a string that represents the current
object. The default implementation of the method returns the fully qualified
name of the object's type.

public virtual string? ToString();

The ToString method has a virtual modifier.

It is common practice to override the Object.ToString method to
provide human-readable representation of our custom objects.

Program.cs
  

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

class User
{
    public User(string name, string occupation)
    {
        this.Name = name;
        this.Occupation = occupation;
    }

    public string Name { get; set; }
    public string Occupation { get; set; }

    public override string ToString()
    {
        return $"{this.Name} is a {this.Occupation}";
    }
}

In the program, we create our own implementation of the
Object.ToString method.

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

The ToString method is called when we pass the user instance to
the Console.WriteLine method.

public override string ToString()
{
    return $"{this.Name} is a {this.Occupation}";
}

We use the override keyword to override the default implementation
of the method, which is declared to be virtual.

$ dotnet run
User { John Doe gardener }
User { Roger Roe driver }

## C# override abstract method

Abstract classes provide a common definition for descendant classes. An
abstract method must be overriden in the descendant class.

Program.cs
  

var c = new Circle(12, 45, 22);

Console.WriteLine(c);
Console.WriteLine($"Area of circle: {c.Area()}");
Console.WriteLine(c.GetCoordinates());

abstract class Drawing
{
    protected int x = 0;
    protected int y = 0;

    public abstract double Area();

    public string GetCoordinates()
    {
        return $"x: {x}, y: {y}";
    }
}

class Circle : Drawing
{
    private int r;

    public Circle(int x, int y, int r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public override double Area()
    {
        return this.r * this.r * Math.PI;
    }

    public override string ToString()
    {
        return $"Circle at x: {x}, y: {x}, radius: {r}";
    }
}

We have an abstract base Drawing class. The class defines two member fields,
defines one method and declares one method.

public abstract double Area();

The Area method is abstract and thus, it must be overriden in the
concrete child class.

public override double Area()
{
    return this.r * this.r * Math.PI;
}

Inside the Circle class, we override the Area method
and provide its implementation.

$ dotnet run
Circle at x: 12, y: 12, radius: 22
Area of circle: 1520.53084433746
x: 12, y: 45

## C# override vs new

With the new keyword we can explicitly hide a member that is
inherited. When we hide an inherited member, the derived version of the member
replaces the base class version. We can still access the original method by up
casting to the base class.

While the override modifier modifies the original method (there is
one method), the new modifier creates a new method that hides the
original one (there are two methods).

Program.cs
  

Base[] objs = { new Base(), new Derived(), new Base() };

Console.WriteLine("-------------------------");
Console.WriteLine("Info/override");

Derived d = new Derived();
d.Info();
((Base)d).Info();

Base b = new Base();
b.Info();

Console.WriteLine("------------");

foreach (Base obj in objs)
{
    obj.Info();
}

Console.WriteLine("-------------------------");
Console.WriteLine("Info2/new");

Derived d2 = new Derived();
d2.Info2();
((Base)d).Info2();

Base b2 = new Base();
b2.Info2();

Console.WriteLine("------------");

foreach (Base obj in objs)
{
    obj.Info2();
}

class Base
{
    public virtual void Info()
    {
        Console.WriteLine("Base class");
    }

    public virtual void Info2()
    {
        Console.WriteLine("Base class");
    }
}

class Derived : Base
{
    public override void Info()
    {
        Console.WriteLine("Derived class");
    }

    public new void Info2()
    {
        Console.WriteLine("Derived class");
    }
}

We have a Base class and a Derived class. There are
two methods: Info and Info2. The first uses the
override keyword in the Derived, the second uses the
new keyword.

$ dotnet run
-------------------------
Info/override
Derived class
Derived class
Base class
------------
Base class
Derived class
Base class
-------------------------
Info2/new
Derived class
Base class
Base class
------------
Base class
Base class
Base class

## Source

[override modifier - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/override)

In this article we covered the C# override modifier.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).