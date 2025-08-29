+++
title = "C# abstract class"
date = 2025-08-27T23:22:41.381+01:00
draft = false
description = "C# abstract class tutorial shows how to work
with abstract classes in C#. An abstract class is an unfinished class which 
must be implemented in its subclasses."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# abstract class

last modified July 5, 2023

 

In this article we show how to work with abstract classes in C#.

An abstract class in an unfinished class. It must be implemented in its
subclasses. Abstract class is created with the abstract 
keywords. We can create abstract methods and member fields.

The purpose of an abstract class is to provide a common definition for
descendant classes.

Abstract classes cannot be instantiated. If a class contains at least one
abstract method, it must be declared abstract too. Abstract methods cannot be
implemented; they merely declare the methods' signatures. When we inherit from
an abstract class, all abstract methods must be implemented by the derived
class. Furthermore, these methods must be declared with the same of less
restricted visibility.

Unlike *Interfaces*, abstract classes may have methods with full
implementation and may also have defined member fields. So abstract classes may
provide a partial implementation. We put some common functionality into abstract
classes. 

## C# abstract class example

The following example creates an abstract class.

Program.cs
  

var c = new Circle(12, 45, 22);

Console.WriteLine(c);
Console.WriteLine($"Area of circle: {c.Area()}");
Console.WriteLine(c.GetCoordinates());

Console.WriteLine("---------------------");

var r = new Rectangle(10, 20, 50, 60);
Console.WriteLine(r);
Console.WriteLine($"Area of rectangle: {r.Area()}");
Console.WriteLine(r.GetCoordinates());

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

class Rectangle : Drawing
{
    private int width;
    private int height;

    public Rectangle(int x, int y, int width, int height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public override double Area()
    {
        return this.width * this.height;
    }

    public override string ToString()
    {
        return $"Rectangle at x: {x}, y: {y}, w: {width} h: {height}";
    }
}

We have an abstract base Drawing class. The class defines two
member fields, defines one method and declares one method. One of the methods is
abstract, the other one is fully implemented. The Drawing class is
abstract because we cannot draw it. We can draw a circle, a dot or a square. The
Drawing class has some common functionality to the objects that we
can draw.

abstract class Drawing

We use the abstract keyword to define an abstract class.

public abstract double Area();

An abstract method is also preceded with the abstract keyword.

class Circle : Drawing

A Circle is a subclass of the Drawing class. It must implement the
abstract Area method.

private int r;

We declare the radius member field, which is specific to the Circle
class.

public Circle(int x, int y, int r)
{
    this.x = x;
    this.y = y;
    this.r = r;
}

This is the constructor of Circle; it sets the member variables.
The x and y variables are inherited from
Drawing.

public override double Area()
{
    return this.r * this.r * Math.PI;
}

When we implement the Area method, we must use the
override keyword. This way we inform the compiler that
we override an existing (inherited) method.

class Rectangle : Drawing

Another concrete shape is a Rectangle.

private int width;
private int height;

The Rectangle defines two variables: width and
height.

public override double Area()
{
    return this.width * this.height;
}

The Rectangle provides its own implementation of the
Area method.

$ dotnet run
Circle at x: 12, y: 12, radius: 22
Area of circle: 1520.53084433746
x: 12, y: 45
---------------------
Rectangle at x: 10, y: 20, w: 50 h: 60
Area of rectangle: 3000
x: 10, y: 20

## Source

[Abstract and Sealed Classes and Class Members](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/abstract-and-sealed-classes-and-class-members)

In this article we worked with abstract classes in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).