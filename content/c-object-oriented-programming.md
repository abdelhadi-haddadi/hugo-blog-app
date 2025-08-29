+++
title = "C# object-oriented programming"
date = 2025-08-29T19:51:11.764+01:00
draft = false
description = "In this tutorial we cover object-oriented programming. Object-oriented programming (OOP) is a programming paradigm that uses objects and their interactions to design applications and computer programs."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# object-oriented programming

last modified July 5, 2023

 

In this article we cover object oriented programming in C#.

There are three widely used programming paradigms: procedural programming,
functional programming and object-oriented programming. C# supports both
procedural and object-oriented programming.

## OOP definition

*Object-oriented programming (OOP)* is a programming paradigm that uses
objects and their interactions to design applications and computer programs.

There are some basic programming concepts in OOP:

- Abstraction

- Polymorphism

- Encapsulation

- Inheritance

The *abstraction* is simplifying complex reality by modeling classes
appropriate to the problem. The *polymorphism* is the process of using an
operator or function in different ways for different data input. The
*encapsulation* hides the implementation details of a class from other
objects. The *inheritance* is a way to form new classes  using classes
that have already been defined.

## C# objects

Objects are basic building blocks of a C# OOP program. An object is a
combination of data and methods. The data and the methods are called
*members* of an object. In an OOP program, we create objects. These
objects communicate together through methods. Each object can receive messages,
send messages and process data.

There are two steps in creating an object. First, we define a class. A
*class* is a template for an object. It is a blueprint which describes
the state and behavior that the objects of the class all share. A class can be
used to create many objects. Objects created at runtime from a class are called
*instances* of that particular class.

Program.cs
  

var b = new Being();
Console.WriteLine(b);

class Being {}

In our first example, we create a simple object.

class Being {}

This is a simple class definition. The body of the template is empty. It does
not have any data or methods.

var b = new Being();

We create a new instance of the Being class. For this we have the
new keyword. The b variable is the handle to
the created object.

Console.WriteLine(b);

We print the object to the console to get some basic description of the object.
What does it mean, to print an object? When we print an object, we in fact call
its ToString method. But we have not defined any method yet. It is
because every object created inherits from the base object. It has
some elementary functionality which is shared among all objects created. One of
this is the ToString method.

$ dotnet run
Being

## C# object attributes

Object attributes is the data bundled in an instance of a class. The
object attributes are called *instance variables* or *member fields*.
An instance variable is a variable defined in a class, for which each object
in the class has a separate copy.

Program.cs
  

var p1 = new Person();
p1.name = "Jane";

var p2 = new Person();
p2.name = "Beky";

Console.WriteLine(p1.name);
Console.WriteLine(p2.name);

class Person
{
    public string name;
}

In the above C# code, we have a Person class with one member field.

class Person
{
    public string name;
}

We declare a name member field. The public
keyword specifies that the member field will be accessible outside the class
block.

var p1 = new Person();
p1.name = "Jane";

We create an instance of the Person class and set the name variable
to "Jane". We use the dot operator to access the attributes of objects.

var p2 = new Person();
p2.name = "Beky";

We create another instance of the Person class. Here we set the
variable to "Beky".

Console.WriteLine(p1.name);
Console.WriteLine(p2.name);

We print the contents of the variables to the console.

$ dotnet run
Jane
Beky

Each instance of the Person class has a separate copy of the name
member field.

## C# methods

Methods are functions defined inside the body of a class. They are used to
perform operations with the attributes of our objects. Methods bring
*modularity* to our programs.

Methods are essential in the *encapsulation* concept of
the OOP paradigm. For example, we might have a Connect
method in our AccessDatabase class. We need not to be informed
how exactly the method Connect connects to the database.
We only have to know that it is used to connect to a database. This is essential
in dividing responsibilities in programming, especially in large applications.

Objects group state and behavior, methods represent the behavioral part
of the objects.

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
This way we protect our data.

public void SetRadius(int radius)
{
    this.radius = radius;
}

This is the SetRadius method. The this
variable is a special variable which we use to access the member fields from
methods. The this.radius is an instance variable, while the radius
is a local variable, valid only inside the SetRadius
method.

var c = new Circle();
c.SetRadius(5);

We create an instance of the Circle class and set its radius by
calling the SetRadius method on the object of the circle. We use
the dot operator to call the method.

public double Area()
{
    return this.radius * this.radius * Math.PI;
}

The Area method returns the area of a circle. The
Math.PI is a built-in constant.

$ dotnet run
78.5398163397448

## C# constructor

A constructor is a special kind of a method. It is automatically called when the
object is created. Constructors do not return values. The purpose of the
constructor is to initiate the state of an object. Constructors have the same
name as the class. The constructors are methods, so they can be overloaded too.

Constructors cannot be inherited. They are called in the order of inheritance.
If we do not write any constructor for a class, C# provides an implicit default
constructor. If we provide any kind of a constructor, then a default is not
supplied.

Program.cs
  

new Being();
new Being("Tom");

class Being
{
    public Being()
    {
        Console.WriteLine("Being is created");
    }

    public Being(string being)
    {
        Console.WriteLine($"Being {being} is created");
    }
}

We have a  Being class. This class has two constructors. The first
one does not take parameters; the second one takes one parameter.

public Being(string being)
{
    Console.WriteLine($"Being {being} is created");
}

This constructor takes one string parameter.

new Being();

An instance of the Being class is created. This time the
constructor without a parameter is called upon object creation.

$ dotnet run
Being is created
Being Tom is created

In the next example, we initiate data members of the class. Initiation of
variables is a typical job for constructors.

Program.cs
  

var name = "Lenka";
var born = new DateTime(1990, 3, 5);

var friend = new MyFriend(name, born);
friend.Info();

class MyFriend
{
    private DateTime born;
    private string name;

    public MyFriend(string name, DateTime born)
    {
        this.name = name;
        this.born = born;
    }

    public void Info()
    {
        Console.WriteLine("{0} was born on {1}",
            this.name, this.born.ToShortDateString());
    }
}

We have a MyFriend class with data members and methods.

private DateTime born;
private string name;

We have two private variables in the class definition.

public MyFriend(string name, DateTime born)
{
    this.name = name;
    this.born = born;
}

In the constructor, we initiate the two data members. The this
variable is a handler used to reference the object variables.

var friend = new MyFriend(name, born);
friend.Info();

We create a MyFriend object with two arguments. Then we call
the Info method of the object.

$ dotnet run
Lenka was born on 3/5/1990

## C# constructor chaining

Constructor chaining is the ability of a class to call another constructor
from a constructor. To call another constructor from the same class, we use
the this keyword.

Program.cs
  

new Circle(5);
new Circle();

class Circle
{
    public Circle(int radius)
    {
        Console.WriteLine($"Circle, r={radius} is created");
    }

    public Circle() : this(1) { }
}

We have a Circle class. The class has two constructors. One that
takes one parameter and one that does not take any parameters.

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

## C# ToString method

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

Each class created inherits from the base object.
The ToString method belongs to this object class.
We use the override keyword to inform that we are overriding
a method.

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

## C# object initializers

*Object initializers* let us assign values to any accessible fields or
properties of an object at creation time without having to invoke a constructor.
The properties or fields are assigned inside the {} brackets.
Also, we can specify arguments for a constructor or omit the arguments.

Program.cs
  

var u = new User { Name = "John Doe", Occupation = "gardener" };
Console.WriteLine(u);

class User
{
    public User() {}

    public string Name { set; get; }
    public string Occupation { set; get; }

    public override string ToString()
    {
        return $"{Name} is a {Occupation}";
    }
}

In the example, we create a new user with the *object initializer* syntax.

public User() {}

We define an empty constructor.

public string Name { set; get; }
public string Occupation { set; get; }

We have two properties: Name and Occupation.

var u = new User { Name = "John Doe", Occupation = "gardener" };

We assign the values to the properties in the {} brackets.

$ dotnet run
John Doe is a gardener

## C# expression-bodied constructor

It is possible to create expression-bodied constructors; they provide a more
concise and better looking syntax.

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

## C# target-typed new expressions

Target-typed new expressions do not require type specification for constructors
when the type is known. This feature was introduced in C# 9.0.

Program.cs
  

var u1 = new User("Roger", "Roe", "driver");
Console.WriteLine(u1);

User u2 = new("John", "Doe", "gardener");
Console.WriteLine(u2);

var users = new List&lt;User&gt;
{
    new("Thomas", "Roove", "programmer"),
    new("Lucia", "Smith", "hair dresser"),
    new("Peter", "Holcomb", "painter"),
    new("Orlando", "Black", "actor"),
    new("Patrick", "Allen", "police officer")
};

foreach (var user in users)
{
    Console.WriteLine(user);
}

class User
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Occupation { get; set; }

    public User(string FirstName, string LastName, string Occupation) =&gt;
        (this.FirstName, this.LastName, this.Occupation) = (FirstName, LastName, Occupation);

    public override string ToString() =&gt;
        $"User {{ {this.FirstName} {this.LastName} {this.Occupation} }}";
}

We demonstrate the target-typed new expressions the User type.

var u1 = new User("Roger", "Roe", "driver");

The var keyword can be used to omit the type declaration on the 
left side of the assignment, since the compiler can infer the type from the 
right side.

User u2 = new("John", "Doe", "gardener");

The target-typed new expression allows us to omit the type declaration on the 
right side of the assignment.

var users = new List&lt;User&gt;
{
    new("Thomas", "Roove", "programmer"),
    new("Lucia", "Smith", "hair dresser"),
    new("Peter", "Holcomb", "painter"),
    new("Orlando", "Black", "actor"),
    new("Patrick", "Allen", "police officer")
};

In a list initializer, we save a few key strokes by omitting the type for each 
user.

## C# class constants

C# enables to create class constants. These constants do not belong
to a concrete object. They belong to the class. By convention, constants are
written in uppercase letters.

Program.cs
  

Console.WriteLine(Math.PI);

class Math
{
    public const double PI = 3.14159265359;
}

We have a Math class with a PI constant.

public const double PI = 3.14159265359;

The const keyword is used to define a constant.
The public keyword makes it accessible outside
the body of the class.

$ dotnet run
3.14159265359

## C# inheritance

The inheritance is a way to form new classes using classes that have already
been defined. The newly formed classes are called *derived* classes, the
classes that we derive from are called *base* classes. Important benefits
of inheritance are code reuse and reduction of complexity of a program. The
derived classes (descendants) override or extend the functionality of the base
classes (ancestors).

Program.cs
  

new Human();

class Being
{
    public Being()
    {
        Console.WriteLine("Being is created");
    }
}

class Human : Being
{
    public Human()
    {
        Console.WriteLine("Human is created");
    }
}

In this program, we have two classes. A base Being class and a
derived Human class. The derived class inherits from the
base class.

new Human();

We instantiate the derived Human class.

class Human : Being

In C#, we use the colon (:) operator to create inheritance relations.

$ dotnet run
Being is created
Human is created

We can see that both constructors were called. First, the constructor of the
base class is called, then the constructor of the derived class.

A more complex example follows.

Program.cs
  

new Human();

var dog = new Dog();
dog.GetCount();

class Being
{
    static int count = 0;

    public Being()
    {
        count++;
        Console.WriteLine("Being is created");
    }

    public void GetCount()
    {
        Console.WriteLine("There are {0} Beings", count);
    }
}

class Human : Being
{
    public Human()
    {
        Console.WriteLine("Human is created");
    }
}

class Animal : Being
{
    public Animal()
    {
        Console.WriteLine("Animal is created");
    }
}

class Dog : Animal
{
    public Dog()
    {
        Console.WriteLine("Dog is created");
    }
}

We have four classes. The inheritance hierarchy is more complicated. The
Human and the Animal classes inherit from the
Being class. The Dog class inherits directly from the
Animal class and indirectly from the Being
class. We also introduce a concept of a static variable.

new Human();

var dog = new Dog();
dog.GetCount();

We create instances from the Human and from the Dog
classes. We call the GetCount method of the Dog object.

static int count = 0;

We define a static variable. Static members
are members that are shared by all instances of a class.

Being()
{
    count++;
    Console.WriteLine("Being is created");
}

Each time the Being class is instantiated, we increase the count
variable by one. This way we keep track of the number of instances
created.

class Animal : Being
...

class Dog : Animal
...

The Animal inherits from the Being and the Dog
inherits from the Animal. Indirectly, the Dog inherits
from the Being as well.

$ dotnet run
Being is created
Human is created
Being is created
Animal is created
Dog is created
There are 2 Beings

The Human calls two constructors. The Dog calls three
constructors. There are two Beings instantiated.

We use the base keyword to call the parent's
constructor explicitly.

Program.cs
  

var c = new Circle(2, 5, 6);
Console.WriteLine(c);

class Shape
{
    protected int x;
    protected int y;

    public Shape()
    {
        Console.WriteLine("Shape is created");
    }

    public Shape(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}

class Circle : Shape
{
    private int r;

    public Circle(int r, int x, int y) : base(x, y)
    {
        this.r = r;
    }

    public override string ToString()
    {
        return String.Format("Circle, r:{0}, x:{1}, y:{2}", r, x, y);
    }
}

We have two classes: the Shape class and the Circle
class. The Shape class is a base class for geometrical shapes.
We can put into this class some commonalities of the common shapes, like
the x and y coordinates.

public Shape()
{
    Console.WriteLine("Shape is created");
}

public Shape(int x, int y)
{
    this.x = x;
    this.y = y;
}

The Shape class has two constructors. The first one is the default
constructor. The second one takes two parameters: the x, y coordinates.

public Circle(int r, int x, int y) : base(x, y)
{
    this.r = r;
}

This is the constructor for the Circle class. This constructor
initiates the r member and calls the parent's second constructor,
to which it passes the x, y coordinates. Had we not
called the constructor explicitly with the base keyword, the
default constructor of the Shape class would be called.

$ dotnet run
Circle, r:2, x:5, y:6

## C# polymorphism

The polymorphism is the process of using an operator or function in different
ways for different data input. In practical terms, polymorphism means that if
class B inherits from class A, it does not have to inherit everything about
class A; it can do some of the things that class A does differently.

In general, polymorphism is the ability to appear in different forms.
Technically, it is the ability to redefine methods for derived classes.
Polymorphism is concerned with the application of specific implementations to an
interface or a more generic base class.

Polymorphism is the ability to redefine methods for derived classes.

Program.cs
  

namespace Polymorphism;

abstract class Shape
{
    protected int x;
    protected int y;

    public abstract int Area();
}

class Rectangle : Shape
{
    public Rectangle(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public override int Area()
    {
        return this.x * this.y;
    }
}

class Square : Shape
{
    public Square(int x)
    {
        this.x = x;
    }

    public override int Area()
    {
        return this.x * this.x;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Shape[] shapes = { new Square(5), new Rectangle(9, 4), new Square(12) };

        foreach (Shape shape in shapes)
        {
            Console.WriteLine(shape.Area());
        }
    }
}

In the above program, we have an abstract Shape class. This class
morphs into two descendant classes: Rectangle and 
Square. Both provide their own implementation of the
Area method. Polymorphism brings flexibility and scalability to the
OOP systems.

public override int Area()
{
    return this.x * this.y;
}
...
public override int Area()
{
    return this.x * this.x;
}

The Rectangle and the Square classes have their own
implementations of the Area method.

Shape[] shapes = { new Square(5), new Rectangle(9, 4), new Square(12) };

We create an array of three Shapes.

foreach (Shape shape in shapes)
{
    Console.WriteLine(shape.Area());
}

We go through each shape and call the Area method on it. The
compiler calls the correct method for each shape. This is the essence of
polymorphism.

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

## Source

[Object-Oriented programming](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop)

In this article we have covered OOP in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).