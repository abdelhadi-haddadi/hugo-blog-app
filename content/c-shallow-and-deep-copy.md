+++
title = "C# shallow & deep copy"
date = 2025-08-29T19:51:23.249+01:00
draft = false
description = "In this article we compare shallow and deep copy of objects in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# shallow &amp; deep copy

last modified July 5, 2023

 

In this article we compare shallow and deep copy of objects in C#.

Copying of data is an important task in programming. Object is a composite
data type in OOP. Member field in an object may be stored by value or by
reference. Copying may be performed in two ways.

The *shallow copy* copies all values and references into a new instance.
The data to which a reference is pointing is not copied; only the pointer is
copied. The new references are pointing to the original objects. Any changes
to the reference members affect both objects.

The *deep copy* copies all values into a new instance. In case of members
that are stored as references, a deep copy performs a deep copy of data that is
being referenced. A new copy of a referenced object is created. And the pointer
to the newly created object is stored. Any changes to those referenced objects
will not affect other copies of the object. Deep copies are fully replicated
objects.

If a member field is a value type, a bit-by-bit copy of the field is performed.
If the field is a reference type, the reference is copied but the referred
object is not; therefore, the reference in the original object and the reference
in the clone point to the same object. 

## C# Shallow copy example

The following program performs shallow copy.

Program.cs
  

namespace ShallowCopy;

class Color
{
    public int red;
    public int green;
    public int blue;

    public Color(int red, int green, int blue)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

class MyObject : ICloneable
{
    public int id;
    public string size;
    public Color col;

    public MyObject(int id, string size, Color col)
    {
        this.id = id;
        this.size = size;
        this.col = col;
    }

    public object Clone()
    {
        return new MyObject(this.id, this.size, this.col);
    }

    public override string ToString()
    {
        var s = String.Format("id: {0}, size: {1}, color:({2}, {3}, {4})",
            this.id, this.size, this.col.red, this.col.green, this.col.blue);
        return s;
    }
}

class Program
{
    static void Main(string[] args)
    {
        var col = new Color(23, 42, 223);
        var obj1 = new MyObject(23, "small", col);

        var obj2 = (MyObject)obj1.Clone();

        obj2.id += 1;
        obj2.size = "big";
        obj2.col.red = 255;

        Console.WriteLine(obj1);
        Console.WriteLine(obj2);
    }
}

This is an example of a shallow copy. We define two custom objects:
MyObject and Color. The MyObject object
will have a reference to the Color object.

class MyObject : ICloneable

We should implement ICloneable interface for
objects which we are going to clone.

public object Clone()
{
    return new MyObject(this.id, this.size, this.col);
}

The ICloneable interface forces us to create a Clone
method. This method returns a new object with copied values.

var col = new Color(23, 42, 223);

We create an instance of the Color object.

var obj1 = new MyObject(23, "small", col);

An instance of the MyObject class is created. The instance of the
Color object is passed to the constructor.

var obj2 = (MyObject) obj1.Clone();

We create a shallow copy of the obj1 object and assign it to the obj2 variable.
The Clone method returns an Object and we expect
MyObject. This is why we do explicit casting.

obj2.id += 1;
obj2.size = "big";
obj2.col.red = 255;

Here we modify the member fields of the copied object. We increment the id,
change the size to "big" and change the red part of the color object.

Console.WriteLine(obj1);
Console.WriteLine(obj2);

The Console.WriteLine method calls the
ToString method of the obj2 object which returns the
string representation of the object.

$ dotnet run
id: 23, size: small, color:(255, 42, 223)
id: 24, size: big, color:(255, 42, 223)

We can see that the ids are different (23 vs 24). The size is different ("small"
vs "big"). But the red part of the color object is same for both instances
(255). Changing member values of the cloned object (id, size) did not affect the
original object. Changing members of the referenced object (col) has affected
the original object too. In other words, both objects refer to the same color
object in memory.

## C# Deep copy example

To change this behaviour, we do a deep copy next.

Program.cs
  

namespace DeepCopy;

class Color : ICloneable
{
    public int red;
    public int green;
    public int blue;

    public Color(int red, int green, int blue)
    {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public object Clone()
    {
        return new Color(this.red, this.green, this.blue);
    }
}

class MyObject : ICloneable
{
    public int id;
    public string size;
    public Color col;

    public MyObject(int id, string size, Color col)
    {
        this.id = id;
        this.size = size;
        this.col = col;
    }

    public object Clone()
    {
        return new MyObject(this.id, this.size,
            (Color)this.col.Clone());
    }

    public override string ToString()
    {
        var s = String.Format("id: {0}, size: {1}, color:({2}, {3}, {4})",
            this.id, this.size, this.col.red, this.col.green, this.col.blue);
        return s;
    }
}

class Program
{
    static void Main(string[] args)
    {
        var col = new Color(23, 42, 223);
        var obj1 = new MyObject(23, "small", col);

        var obj2 = (MyObject)obj1.Clone();

        obj2.id += 1;
        obj2.size = "big";
        obj2.col.red = 255;

        Console.WriteLine(obj1);
        Console.WriteLine(obj2);
    }
}

In this program, we perform a deep copy on an object.

class Color : ICloneable

Now the Color class implements the ICloneable interface.

public object Clone()
{
    return new Color(this.red, this.green, this.blue);
}

We have a Clone method for the Color class too. This
helps to create a copy of a referenced object.

public object Clone()
{
    return new MyObject(this.id, this.size,
        (Color) this.col.Clone());
}

When we clone the MyObject, we call the Clone method
upon the col reference type. This way we have a copy of a color value too.

$ dotnet run
id: 23, size: small, color:(23, 42, 223)
id: 24, size: big, color:(255, 42, 223)

Now the red part of the referenced Color object is not the same. The original
object has retained its previous value (23).

## Source

[Object.MemberwiseClone method](https://learn.microsoft.com/en-us/dotnet/api/system.object.memberwiseclone?view=net-8.0)

In this article we compared shallow and deep copy of objects in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).