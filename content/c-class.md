+++
title = "C# class"
date = 2025-08-27T23:22:49.372+01:00
draft = false
description = "C# class tutorial shows how to organize define classes in C#. A class is a template to create objects."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# class

last modified July 5, 2023

 

In this article we show how to define classes in C#.

The class keyword is used do define classes, which are templates
for creating objects. The objects are called instances of a class. A new class
is created with the new keyword.

Inside a class, we define member fields and member functions. The functions
defined inside classes are called methods. Member fields and functions are 
accessed through the dot operator.

## C# simple class example

The following example creates a simple class.

Program.cs
  

var u = new User("John Doe", "gardener");
Console.WriteLine($"{u.Name} is a {u.Occupation}");

u.Occupation = "driver";
Console.WriteLine($"{u.Name} is a {u.Occupation}");

class User
{
    public User(string name, string occupation)
    {
        this.Name = name;
        this.Occupation = occupation;
    }

    public string Name { get; set; }
    public string Occupation { get; set; }
}

In the program, we define the User class. The class has two
properties: Name and Occupation. Properties use
accessors through which the values of the member fields can be read, written or
manipulated.

var u = new User("John Doe", "gardener");

We create a new instance of the User class. We pass two parameters 
to the constructor. The constructor is the method that is called at the creation 
of the object.

Console.WriteLine($"{u.Name} is a {u.Occupation}");

We access two properties of the User class.

class User
{
...
}

The class keyword defines a class. The body of the class is written 
inside the {} brackets.

public User(string name, string occupation)
{
    this.Name = name;
    this.Occupation = occupation;
}

This is the constructor of the class. The constructor has the same name as the 
class. It is called at the construction of an object. Inside the constructor, 
we set two properties.

public string Name { get; set; }
public string Occupation { get; set; }

We define two properties. The auto-implemented properties provide a concise
syntax for defining classes.

$ dotnet run
John Doe is a gardener
John Doe is a driver

## C# standard classes

.NET is has a large library of classes, which are can be used by programmers.

Program.cs
  

using System.Text;

var path = "words.txt";

string content = File.ReadAllText(path, Encoding.UTF8);
Console.WriteLine(content);

For instance, in this small program we use the File class to 
read the contents of a file and the Console class to write the 
contents to the terminal.

## Human-readable representations of classes

To provide a human-readable representation of a class, we override the 
ToString method. 

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

In the program, we create our own implementation of the ToString
method.

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

The ToString method is called when we pass the user instance to 
the Console.WriteLine method.

## C# abstract class

An abstract class in an unfinished class whose purpose is to define some common
definitions for its subclasses. It must be implemented in its subclasses.
Abstract class is created with the abstract keywords. We can create abstract
methods and member fields. 

Abstract classes cannot be instantiated and abstract methods cannot be
implemented.

Program.cs
  

var c = new Circle(12, 45, 22);

Console.WriteLine(c);
Console.WriteLine($"Area of circle: {c.Area()}");
Console.WriteLine(c.GetCoordinates());

Console.WriteLine("---------------------");

var s = new Square(10, 20, 50);
Console.WriteLine(s);
Console.WriteLine($"Area of square: {s.Area()}");
Console.WriteLine(s.GetCoordinates());

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

class Square : Drawing
{
    private int width;

    public Square(int x, int y, int width)
    {
        this.x = x;
        this.y = y;
        this.width = width;
    }

    public override double Area()
    {
        return this.width * this.width;
    }

    public override string ToString()
    {
        return $"Square at x: {x}, y: {y}, w: {width}";
    }
}

We have an abstract base Drawing class. The class defines two member fields,
defines one method and declares one method. One of the methods is abstract, the
other one is fully implemented. The Drawing class is abstract because we cannot
draw it. We can draw a circle, a dot or a square. The Drawing class has some
common functionality to the objects that we can draw. 

abstract class Drawing

We use the abstract keyword to define an abstract class.

public abstract double Area();

An abstract method is also preceded with the abstract keyword.

class Circle : Drawing

A Circle is a concrete class, it can be drawn on the surface. We define it as a
subclass of the Drawing class; therefore, it must implement the
abstract Area method.

public override double Area()
{
    return this.r * this.r * Math.PI;
}

When we implement the Area method, we must use the
override keyword. This way we inform the compiler that
we override an existing (inherited) method.

$ dotnet run
Circle at x: 12, y: 12, radius: 22
Area of circle: 1520.53084433746
x: 12, y: 45
---------------------
Square at x: 10, y: 20, w: 50
Area of square: 2500
x: 10, y: 20

## C# nested class

A nested class is an inner class defined in the body of another class. It makes
sense to define nested classes when they are closely related to the outer class.

Program.cs
  

var fjet = new FighterJet();
fjet.TakeOff();

fjet.DropBomb();
fjet.DropBomb();
fjet.DropBomb();

fjet.Land();

class FighterJet
{
    public void TakeOff()
    {
        Console.WriteLine("FighterJet takes off");
    }

    public void Land()
    {
        Console.WriteLine("FighterJet lands");
    }

    public void DropBomb() 
    {
        var bomb = new Bomb();
        bomb.Drop();
    }

    class Bomb
    {
        public Bomb()
        {
            Console.WriteLine("Bomb prepared");
        }

        public void Drop()
        {
            Console.WriteLine("Bomb launched");
        }
    }
}

We have a FighterJet class which can drop bombs. The bomb object 
can be defined as a nested class, since it may be considered as an integral 
part of the outer class. 

$ dotnet run
FighterJet takes off
Bomb prepared
Bomb launched
Bomb prepared
Bomb launched
Bomb prepared
Bomb launched
FighterJet lands

## C# partial class

With the partial keyword, it is possible to split the definition of
a class into several parts inside the same namespace. The class can also be
defined in multiple files.

Partial classes are used when working with very large code base, which can be
split into smaller units. Partial classes are also used with automatic code
generators.

Program.cs
  

namespace PartialClass;

partial class Worker
{
    public string DoWork()
    {
        return "Doing work";
    }
}

partial class Worker
{
    public string DoPause()
    {
        return "Pausing";
    }
}

class Program
{
    static void Main(string[] args)
    {
        var worker = new Worker();

        Console.WriteLine(worker.DoWork());
        Console.WriteLine(worker.DoWork());
        Console.WriteLine(worker.DoPause());
    }
}

In the example, we have the Worker class defined in two parts. The
parts are joined together by the compiler to form a final class.

$ dotnet run
Doing work
Doing work
Pausing

## C# sealed class

The sealed keyword is used to prevent unintended derivation
from a class. A sealed class cannot be an abstract class.

Program.cs
  

namespace DerivedMath;

sealed class Math
{
    public static double GetPI()
    {
        return 3.141592;
    }
}

class Derived : Math
{
    public void Say()
    {
        Console.WriteLine("Derived class");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var dm = new Derived();
        dm.Say();
    }
}

In the above program, we have a base Math class. The sole purpose
of this class is to provide some helpful methods and constants to the
programmer. (In our case we have only one method for simplicity reasons.) It is
not created to be inherited from. 

To prevent uninformed other programmers to derive from this class, the creators
made the class sealed. If you try to compile this program, you get
the following error: 'Derived' cannot derive from sealed type `Math'.

## Source

[Introduction to classes](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/classes)

In this article we showed how to define classes and described various types of 
classes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).