+++
title = "C# access modifier"
date = 2025-08-27T23:22:41.368+01:00
draft = false
description = "C# access modifier tutorial shows how to
control the visibility of methods and member fields in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# access modifier

last modified January 21, 2024

 

In this article we show how to control the visibility of methods and member
fields in C#.

*Access modifiers* set the visibility of methods and member fields.
C# has four basic access modifiers: public, protected,
private and internal. The public members
can be accessed from anywhere. The protected members can be
accessed only within the class itself and by inherited and parent classes. The
private members are limited to the containing type, e.g. only
within its class or interface. The internal members may be accessed
from within the same assembly (exe or DLL).

There are also two combinations of modifiers: protected internal
and private protected. The protected internal type or
member can be accessed by any code in the assembly in which it is declared, or
from within a derived class in another assembly. The private
protected type or member can be accessed only within its declaring
assembly, by code in the same class or in a type that is derived from that
class.

Access modifiers protect data against accidental modifications. They make
the programs more robust.

    
        
            
            Class
            Current assembly
            Derived types
            Derived types in current assembly
            Entire program
        
    

    
        public
        +
        +
        +
        +
        +
    
    
        protected
        +
        o
        +
        +
        o
    
    
        internal
        +
        +
        o
        o
        o
    
    
        private
        +
        o
        o
        o
        o
    
    
        protected internal
        +
        +
        +
        +
        o
    
    
        private protected
        +
        o
        o
        +
        o
    

The above table summarizes C# access modifiers (+ is accessible, o is not
accessible).

## C# access modifier example

In the following example, we use public and private access modifiers.

Program.cs
  

var p = new Person();
p.name = "Jane";

p.SetAge(17);

Console.WriteLine($"{p.name} is {p.GetAge()} years old");

class Person
{
    public string name;
    private int age;

    public int GetAge()
    {
        return this.age;
    }

    public void SetAge(int age)
    {
        this.age = age;
    }
}

In the above program, we have two member fields. One is declared public, the
other private.

public int GetAge()
{
    return this.age;
}

If a member field is private, the only way to access it is via
methods. If we want to modify an attribute outside the class, the method must be
declared public. This is an important aspect of data protection.

public void SetAge(int age)
{
    this.age = age;
}

The SetAge method enables us to change the private
age variable from outside of the class definition.

var p = new Person();
p.name = "Jane";

We create a new instance of the Person class. Because the name
attribute is public, we can access it directly. However, this is
not recommended.

p.SetAge(17);

The SetAge method modifies the age member field. It cannot be
accessed or modified directly because it is declared private.

Console.WriteLine($"{p.name} is {p.GetAge()} years old");

Finally, we access both members to build a string.

$ dotnet run
Jane is 17 years old

## C# access modifier example II

Member fields with private access modifiers are not inherited by
derived classes.

Program.cs
  

var derived = new Derived();
derived.info();

class Base
{
    public string name = "Base";
    protected int id = 5323;
    private bool isDefined = true;
}

class Derived : Base
{
    public void info()
    {
        Console.WriteLine("This is Derived class");
        Console.WriteLine("Members inherited");
        Console.WriteLine(this.name);
        Console.WriteLine(this.id);
        // Console.WriteLine(this.isDefined);
    }
}

In the preceding program, we have a Derived class which inherits
from the Base class. The Base class has three member
fields. All with different access modifiers. The isDefined member is not
inherited. The private modifier prevents this.

class Derived : Base

The class Derived inherits from the Base class. To
inherit from another class, we use the colon (:) operator.

Console.WriteLine(this.name);
Console.WriteLine(this.id);
// Console.WriteLine(this.isDefined);

The public and the protected members are inherited by
the Derived class. They can be accessed. The private
member is not inherited. The line accessing the member field is commented. If we
uncommented the line, the code would not compile.

$ dotnet run
... warning CS0414: The field 'Base.isDefined' is assigned but its value is 
never used ...
This is Derived class
Members inherited
Base
5323

## Source

[Access Modifiers - programming guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers)

In this article we worked with C# access modifiers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).