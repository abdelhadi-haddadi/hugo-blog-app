+++
title = "Object-oriented programming in Visual Basic"
date = 2025-08-29T20:03:20.560+01:00
draft = false
description = "This part of the Visual Basic tutorial covers Object-oriented programming in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../organizingcode/)
[Next](../oopii/)

# Object-oriented programming in Visual Basic

last modified October 18, 2023

In this part of the Visual Basic tutorial, we talk about object oriented
programming in Visual Basic.

There are three widely used programming paradigms there. Procedural programming,
functional programming and object-oriented programming. Visual Basic supports
both procedural and object-oriented programming.

*Object-oriented programming (OOP)* is a programming paradigm that uses
objects and their interactions to design applications and computer programs.
(Wikipedia)

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

## Objects

Objects are basic building blocks of a Visual Basic OOP program. An object is a
combination of data and methods. In a OOP program, we create objects. These
objects communicate together through methods. Each object can receive messages,
send messages and process data.

There are two steps in creating an object. First, we create a class. A
*class* is a template for an object. It is a blueprint, which describes
the state and behavior that the objects of the class all share. A class can be
used to create many objects. Objects created at runtime from a class are called
*instances* of that particular class.

Program.vb
  

Option Strict On

Module Example

    Class Being

    End Class

    Sub Main()

        Dim b as New Being
        Console.WriteLine(b.ToString())

    End Sub

End Module

In our first example, we create a simple object.

Class Being

End Class

This is a simple class definition. The body of the template is empty. It does
not have any data or methods.

Dim b as New Being

We create a new instance of the Being class. For this we have the
New keyword. The b variable is the handle to the
created object.

Console.WriteLine(b.ToString())

The ToString method of the object gives some basic description of
the object.

$ dotnet run
Example+Being

We don't get much info, since the class definition was empty. We get the object
class name and the module name, where the instance of this object was created.

## Object attributes

Object attributes is the data bundled in an instance of a class. The object
attributes are called *instance variables* or *member fields*. An
instance variable is a variable defined in a class, for which each object in the
class has a separate copy.

Program.vb
  

Option Strict On

Module Example

    Class Person

        Public Name As String

    End Class

    Sub Main()

        Dim p1 as New Person
        p1.Name = "Jane"

        Dim p2 as New Person
        p2.Name = "Beky"

        Console.WriteLine(p1.Name)
        Console.WriteLine(p2.Name)

    End Sub

End Module

In the above Visual Basic code, we have a Person class with one
member field.

Class Person
    Public Name As String
End Class

We declare a Name member field. The Public
keyword specifies that the member field will be accessible outside the
Class End Class block.

Dim p1 as New Person
p1.Name = "Jane"

We create an instance of the Person class. And set the Name
variable to "Jane". We use the dot operator to access the attributes of objects.

Dim p2 as New Person
p2.Name = "Beky"

We create another instance of the Person class. Here we set the
variable to "Beky".

Console.WriteLine(p1.Name)
Console.WriteLine(p2.Name)

We print the contents of the variables to the console.

$ dotnet run
Jane
Beky

We see the output of the program. Each instance of the Person class
has a separate copy of the
Name member field.

## Methods

Methods are functions/procedures defined inside the body of a class. They are
used to perform operations with the attributes of our objects. Methods are
essential in *encapsulation* concept of the OOP paradigm. For example, we
might have a Connect method in our AccessDatabase
class. We need not to be informed how exactly Connect
connects to the database. We only know that it is used to connect to a database.
This is essential in dividing responsibilities in programming, especially in
large applications.

Program.vb
  

Option Strict On

Module Example

    Class Circle

        Public Radius As Integer

        Public Sub SetRadius(ByVal Radius As Integer)
            Me.Radius = Radius
        End Sub

        Public Function Area() As Double
            Return Me.Radius * Me.Radius * Math.PI
        End Function

    End Class

    Sub Main()

        Dim c As New Circle
        c.SetRadius(5)

        Console.WriteLine(c.Area())

    End Sub

End Module

In the code example, we have a Circle class. We define two methods.

Public Radius As Integer

We have one member field. It is the Radius of the circle. The
Public keyword is an access specifier. It tells that the variable
is fully accessible from the outside world.

Public Sub SetRadius(ByVal Radius As Integer)
    Me.Radius = Radius
End Sub

This is the SetRadius method. It is a normal Visual Basic
procedure. The Me variable is a special variable, which we use to
access the member fields from methods.

Public Function Area() As Double
    Return Me.Radius * Me.Radius * Math.PI
End Function

The Area method returns the area of a circle. The
Math.PI is a built-in constant.

$ dotnet run
78.5398163397448

Running the example.

## Access modifiers

*Access modifiers* set the visibility of methods and member fields.
Visual Basic has five access modifiers: Public,
Protected, Private, Friend, and 
ProtectedFriend. Public members can be accessed from
anywhere. 

Protected members can be accessed only within the class itself and
by inherited and parent classes. Friend members may be accessed
from within the same assembly (exe or DLL).
ProtectedFriend is a union of protected and friend modifiers.

Access modifiers protect data against accidental modifications. They make the
programs more robust.

Program.vb
  

Option Strict On

Module Example

    Class Person

        Public Name As String
        Private Age As Byte

        Public Function GetAge() As Byte
            Return Me.Age
        End Function

        Public Sub SetAge(ByVal Age As Byte)
            Me.Age = Age
        End Sub

    End Class

    Sub Main()

        Dim p as New Person
        p.Name = "Jane"

        p.setAge(17)

        Console.WriteLine("{0} is {1} years old",
           p.Name, p.GetAge)

    End Sub

End Module

In the above program, we have two member fields. One is declared
Public, the other Private.

Public Function GetAge() As Byte
    Return Me.Age
End Function

If a member field is Private, the only way to access it is via
methods. If we want to modify an attribute outside the class, the
method must be declared Public. This is an important aspect of
data protection.

Public Sub SetAge(ByVal Age As Byte)
    Me.Age = Age
End Sub

The SetAge method enables us to change the private
Age variable from outside of the class definition.

Dim p as New Person
p.Name = "Jane"

We create a new instance of the Person class. Because the
Name attribute is Public, we can access it directly.
However, this is not recommended.

p.setAge(17)

The SetAge method modifies the Age member field. It
cannot be accessed or modified directly, because it is declared
Private.

Console.WriteLine("{0} is {1} years old", p.Name, p.GetAge)

Finally, we access both members to build a string.

$ dotnet run
Jane is 17 years old

Program.vb
  

```
Option Strict On

Module Example

    Class Base

        Public Name As String = "Base"
        Protected Id As Integer = 5323
        Private IsDefined As Boolean = True

    End Class

    Class Derived
        Inherits Base

        Public Sub Info()
            Console.WriteLine("This is Derived Class")
            Console.WriteLine("Members inherited:")
            Console.WriteLine(Me.Name)
            Console.WriteLine(Me.Id)
            'Console.WriteLine(Me.IsDefined)
        End Sub

    End Class

    Sub Main()

        Dim drv As Derived = New Derived
        drv.Info()

    End Sub

End Module

```

In the preceding program, we have a Derived class, which inherits from the
Base class. The Base class has three member fields.
All with different access modifiers. The IsDefined member is not
inherited. The Private
modifier prevents this.

Class Derived
    Inherits Base

The class Derived inherits from the Base class.

Console.WriteLine(Me.Name)
Console.WriteLine(Me.Id)
'Console.WriteLine(Me.IsDefined)

The Public and the Protected members are inherited by
the Derived class. They can be accessed. The
Private member is not inherited. The line accessing the member
field is commented. If we uncommented the line, it would not compile.

$ dotnet run
This is Derived Class
Members inherited:
Base
5323

Running the program, we receive this output. The Public and
Protected members are inherited, the Private
member is not.

## Method overloading

*Method overloading* allows the creation of several methods with the same
name which differ from each other in the type of the input.

What is method overloading good for? The Qt4 library gives a nice example for
the usage. The QPainter class has three methods to draw a
rectangle. Their name is drawRect and their parameters differ. One
takes a reference to a floating point rectangle object, another takes a
reference to an integer rectangle object and the last one takes four parameters,
x, y, width, height. If the C++ language, which is the language in which Qt is
developed, didn't have method overloading, the creators of the library would
have to name the methods like drawRectRectF,
drawRectRect, drawRectXYWH. The solution with method
overloading is more elegant.

Program.vb
  

Option Strict On

Module Example

    Class Sum

        Public Function GetSum() As Integer
            Return 0
        End Function

        Public Function GetSum(ByVal x As Integer) As Integer
            Return x
        End Function

        Public Function GetSum(ByVal x As Integer,
            ByVal y As Integer) As Integer
            Return x + y
        End Function

    End Class

    Sub Main()

        Dim s As Sum = New Sum

        Console.WriteLine(s.getSum())
        Console.WriteLine(s.getSum(20))
        Console.WriteLine(s.getSum(20, 30))

    End Sub

End Module

We have three methods called GetSum. They differ in input parameters.

Public Function GetSum(ByVal x As Integer) As Integer
    Return x
End Function

This one takes one parameter.

Console.WriteLine(s.getSum())
Console.WriteLine(s.getSum(20))
Console.WriteLine(s.getSum(20, 30))

We call all three methods.

$ dotnet run
0
20
50

## The constructor

A constructor is a special kind of a method. It is automatically called, when
the object is created. The purpose of the constructor is to initiate the state
of the object. The name of the constructor in Visual Basic is
New. The constructors are methods, so they can be overloaded too.

Program.vb
  

Option Strict On

Module Example

    Class Being

        Sub New()
            Console.WriteLine("Being is being created")
        End Sub

        Sub New(ByVal name As String)
            Console.WriteLine("Being {0} is created", name)
        End Sub

    End Class

    Sub Main()

        Dim b As New Being
        Dim t As New Being("Tom")

    End Sub

End Module

We have a Being class. This class has two constructors. The first
one does not take parameters, the second one takes one parameter.

Sub New(ByVal name As String)
    Console.WriteLine("Being {0} is created", name)
End Sub

This constructor takes one String parameter.

Dim b As New Being

An instance of the Being class is created. This time the
constructor without a parameter is called upon object creation.

$ dotnet run
Being is being created
Being Tom is created

In the next example, we initiate data members of the class. Initiation of
variables is a typical job for constructors.

Program.vb
  

Option Strict On

Module Example

    Class MyFriend

        Private Born As Date
        Private Name As String

        Sub New(ByVal Name As String, ByVal Born As Date)
            Me.Name = Name
            Me.Born = Born
        End Sub

        Public Sub GetInfo()
            Console.WriteLine("{0} was born on {1}",
                Me.Name, Me.Born.ToShortDateString)
        End Sub

    End Class

    Sub Main()

        Dim name As String = "Lenka"
        Dim born As Date = #5/3/1990#

        Dim fr As MyFriend = New MyFriend(name, born)
        fr.GetInfo()

    End Sub

End Module

We have a Friend class with data members and methods.

Private Born As Date
Private Name As String

We have two variables in the class definition. The Private
keyword is an access modifier. It is a form of encapsulation. The
Private keyword is the most restrictive modifier. It allows only
the object in question to access the variable. No descendants, no other objects.

Sub New(ByVal Name As String, ByVal Born As Date)
    Me.Name = Name
    Me.Born = Born
End Sub

In the constructor, we initiate the two data members. The Me
variable is a handler used to reference the object variables.

Dim fr As MyFriend = New MyFriend(name, born)
fr.GetInfo()

We create a Friend object with two arguments. Then we call the
GetInfo method of the object.

$ dotnet run
Lenka was born on 5/3/1990

## Class constants

Visual Basic enables to create class constants. These constants do not belong
to a concrete object. They belong to the class. By convention, constants are
written in uppercase letters.

Program.vb
  

Option Strict On

Module Example

    Class Math

        Public Const PI As Double = 3.14159265359

    End Class

    Sub Main()
         Console.WriteLine(Math.PI)
    End Sub

End Module

We have a Math class with a PI constant.

Public Const PI As Double = 3.14159265359

The Const keyword is used to define a constant.

$ dotnet run
3.14159265359

Running the example.

## The ToString() method

Each object has a ToString method. It returns a human-readable
representation of the object. The default implementation returns the fully
qualified name of the type of the Object. Note that when we call the
Console.WriteLine method with an object as a parameter, the
ToString is being called.

Program.vb
  

Option Strict On

Module Example

    Class Being

        Public Overrides Function ToString As String
            Return "This is Being Class"
        End Function

    End Class

    Sub Main()

        Dim b as New Being
        Dim o As New Object

        Console.WriteLine(o.ToString())
        Console.WriteLine(b.ToString())
        Console.WriteLine(b)

    End Sub

End Module

We have a Being class in which we override the default
implementation of the ToString method.

Public Overrides Function ToString As String
    Return "This is Being Class"
End Function

Each class created inherits from the base Object. The
ToString method belongs to this Object class. We use the
Overrides keyword to inform that we are overriding a method.

Dim b as New Being
Dim o As New Object

We create two objects. One custom defined and one built-in.

Console.WriteLine(o.ToString())
Console.WriteLine(b.ToString())

We call the ToString method on these two objects.

Console.WriteLine(b)

As we have specified earlier, calling the Console.WriteLine
on the object will call its ToString method.

$ dotnet run
System.Object
This is Being Class
This is Being Class

This is what we get, when we run the script.

## Inheritance

The inheritance is a way to form new classes using classes that have already
been defined. The newly formed classes are called *derived*
classes, the classes that we derive from are called *base* classes.
Important benefits of inheritance are code reuse and reduction of complexity of
a program. The derived classes (descendants) override or extend the
functionality of base classes (ancestors).

Program.vb
  

Option Strict On

Module Example

    Class Being
        Sub New()
            Console.WriteLine("Being is created")
        End Sub
    End Class

    Class Human
        Inherits Being

        Sub New()
            Console.WriteLine("Human is created")
        End Sub

    End Class

    Sub Main()

        Dim h As New Human

    End Sub

End Module

In this program, we have two classes. A base Being class and a
derived Human class. The derived class inherits from the base
class.

Class Human
    Inherits Being

In Visual Basic, we use the Inherits keyword to create inheritance
relations.

Dim h As New Human

We instantiate the derived Human class.

$ dotnet run
Being is created
Human is created

We can see that both constructors were called. First, the constructor of the
base class is called, then the constructor of the derived class.

A more complex example follows.

Program.vb
  

Option Strict On

Module Example

    Class Being

        Dim Shared Count As Integer = 0

        Sub New()
            Count = Count + 1
            Console.WriteLine("Being is created")
        End Sub

        Sub GetCount()
            Console.WriteLine("There are {0} Beings", Count)
        End Sub

    End Class

    Class Human
        Inherits Being

        Sub New()
            Console.WriteLine("Human is created")
        End Sub

    End Class

    Class Animal
        Inherits Being

        Sub New
            Console.WriteLine("Animal is created")
        End Sub

    End Class

    Class Dog
        Inherits Animal

        Sub New()
            Console.WriteLine("Dog is created")
        End Sub

    End Class

    Sub Main()

        Dim h As New Human
        Dim d As New Dog
        d.GetCount()

    End Sub

End Module

We have four classes. The inheritance hierarchy is more complicated.
The Human and the Animal classes inherit from
the Being class. And the Dog class inherits directly
from the Animal class and indirectly from the Being
class. We also introduce a concept of a Shared variable.

Dim Shared Count As Integer = 0

We define a Shared variable. Shared members
are members that are shared by all instances of a class. In other
programming languages, they are called static members.

Sub New()
    Count = Count + 1
    Console.WriteLine("Being is created")
End Sub

Each time the Being class is instantiated, we increase the
Count variable by one. This way we keep track of the
number of instances created.

Class Animal
    Inherits Being
...
Class Dog
    Inherits Animal
...

The Animal inherits from the Being and the Dog
inherits from the Animal. Indirectly, the Dog inherits from the
Being as well.

Dim h As New Human
Dim d As New Dog
d.GetCount

We create instances from the Human and from the
Dog classes. We call the GetCount method
of the Dog object.

$ dotnet run
Being is created
Human is created
Being is created
Animal is created
Dog is created
There are 2 Beings

The Human object calls two constructors: the
Dog object calls three constructors. There are
two beings instantiated.

## Abstract classes and methods

Abstract classes cannot be instantiated. If a class contains at least one
abstract method, it must be declared abstract too. Abstract methods cannot be
implemented, they merely declare the methods' signatures. When we inherit from
an abstract class, all abstract methods must be implemented by the derived
class. Furthermore, these methods must be declared with the same of less
restricted visibility.

Unlike *Interfaces*, abstract classes may have methods with full
implementation and may also have defined member fields. So abstract classes may
provide a partial implementation. Programmers often put some common
functionality into abstract classes. And these abstract classes are later
subclassed to provide more specific implementation. For example, the Qt graphics
library has a QAbstractButton, which is the abstract base class of
button widgets, providing functionality common to buttons. Buttons
Q3Button, QCheckBox, QPushButton,
QRadioButton, and QToolButton inherit from this base
abstract class.

Formally put, abstract classes are used to enforce a protocol. A protocol is a
set of operations, which all implementing objects must support.

Program.vb
  

Option Strict On

Module Example

    MustInherit Class Drawing
        Protected x As Integer = 0
        Protected y As Integer = 0

        Public MustOverride Function Area() As Double

        Public Function GetCoordinates() As String
            Return String.Format("x: {0}, y: {1}", Me.x, Me.y)
        End Function

    End Class

    Class Circle
        Inherits Drawing

        Private Radius As Integer

        Sub New(ByVal x As Integer, ByVal y As Integer,
            ByVal r As Integer)
            Me.x = x
            Me.y = y
            Me.Radius = r
        End Sub

        Public Overrides Function Area() As Double
            Return Me.Radius * Me.Radius * Math.PI
        End Function

        Public Overrides Function ToString() As String
            Return String.Format("Circle, at x: {0}, y: {1}, radius: {2}",
                Me.x, Me.y, Me.Radius)
        End Function

    End Class

    Sub Main()

        Dim c as New Circle(12, 45, 22)

        Console.WriteLine(c)
        Console.WriteLine("Area of circle: {0}", c.Area())
        Console.WriteLine(c.GetCoordinates())

    End Sub

End Module

We have an abstract base Drawing class. The class defines two
member fields, defines one method and declares one method. One of the methods is
abstract, the other one is fully implemented. The Drawing class is
abstract, because we cannot draw it. We can draw a circle, a dot or a square.
The Drawing class has some common functionality to the objects that
we can draw.

MustInherit Class Drawing

In Visual Basic, we use the MustInherit keyword to define an
abstract class.

Public MustOverride Function Area() As Double

An abstract method is preceded with a MustOverride keyword.

Class Circle
    Inherits Drawing

A Circle is a subclass of the Drawing class. It must implement the abstract
Area() method.

$ dotnet run
Circle, at x: 12, y: 45, radius: 22
Area of circle: 1520.53084433746
x: 12, y: 45

This was the first part of the description of OOP in Visual Basic.

[Contents](..)
[Previous](../organizingcode/)
[Next](../oopii/)