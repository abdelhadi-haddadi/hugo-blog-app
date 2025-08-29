+++
title = "Object-oriented programming II in Visual Basic"
date = 2025-08-29T20:03:21.697+01:00
draft = false
description = "This part of the Visual Basic tutorial we continue describing object-oriented programming in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../oopi/)
[Next](../collections/)

# Object-oriented programming II in Visual Basic

last modified October 18, 2023

In this chapter of the Visual Basic tutorial, we continue description of the OOP
in the Visual Basic language.

## Interfaces

A remote control is an interface between the viewer and the TV. It is an
interface to this electronic device. Diplomatic protocol guides all activities
in the diplomatic field. Rules of the road are rules that motorists, cyclists
and pedestrians must follow. Interfaces in programming are analogous to the
previous examples.

Interfaces are:

- APIs

- Contracts

Objects interact with the outside world with the methods, they expose. The
actual implementation is not important to the programmer, or it also might be
secret. A company might sell a library and it does not want to disclose the
actual implementation. A programmer might call a Maximize method on a window of
a GUI toolkit, but knows nothing about how this method is implemented. From this
point of view, interfaces are methods, through which objects interact with the
outside world, without exposing too much about their inner workings.

From the second point of view, interfaces are contracts. If agreed upon, they
must be followed. They are used to design an architecture of an application.
They help organise the code.

Interfaces are fully abstract types. They are declared using the
Interface keyword. Interfaces can only have method signatures and
constants. All method signatures declared in an interface must be public. They
cannot have fully implemented methods, nor member fields. A Visual Basic class
may implement any number of interfaces. An interface can also extend any number
of interfaces. A class that implements an interface must implement all method
signatures of an interface.

Interfaces are used to simulate *multiple inheritance*. A Visual Basic
class can inherit only from one class. A Visual Basic class can implement
multiple interfaces. Multiple inheritance using the interfaces is not about
inheriting methods and variables. It is about inheriting ideas or contracts,
which are described by the interfaces.

There is one important distinction between interfaces and abstract classes.
Abstract classes provide partial implementation for classes that are related in
the inheritance hierarchy. Interfaces on the other hand can be implemented by
classes that are not related to each other. For example, we have two buttons. A
classic button and a round button. Both inherit from an abstract button class
that provides some common functionality to all buttons. Implementing classes are
related, since all are buttons. Another example might have classes
Database and SignIn. They are not related to each
other. We can apply an ILoggable interface that would force them to
create a method to do logging.

Program.vb
  

Option Strict On

Module Example

    Interface IInfo

       Sub DoInform()

    End Interface

    Class Some
        Implements IInfo

        Sub DoInform() Implements IInfo.DoInform
            Console.WriteLine("This is Some Class")
        End Sub

    End Class

    Sub Main()

        Dim sm As New Some
        sm.DoInform()

    End Sub

End Module

This is a simple Visual Basic program demonstrating an interface.

Interface IInfo
    Sub DoInform()
End Interface

This is an interface IInfo. It has the DoInform
method signature.

Class Some
    Implements IInfo

We use the Implements to implement from an interface.

Sub DoInform() Implements IInfo.DoInform
    Console.WriteLine("This is Some Class")
End Sub

The class provides an implementation for the DoInform method. The
Implements keyword explicitly specifies which method signature we
are implementing.

The next example shows, how a class can implement multiple interfaces.

Program.vb
  

Option Strict On

Module Example

    Interface Device

       Sub SwitchOn()
       Sub SwitchOff()

    End Interface

    Interface Volume

       Sub VolumeUp()
       Sub VolumeDown()

    End Interface

    Interface Pluggable

       Sub PlugIn()
       Sub PlugOff()

    End Interface

    Class CellPhone
        Implements Device, Volume, Pluggable

        Public Sub SwitchOn() Implements Device.SwitchOn
            Console.WriteLine("Switching on")
        End Sub

        Public Sub SwitchOff() Implements Device.SwitchOff
            Console.WriteLine("Switching on")
        End Sub

        Public Sub VolumeUp() Implements Volume.VolumeUp
            Console.WriteLine("Volume up")
        End Sub

        Public Sub VolumeDown() Implements Volume.VolumeDown
            Console.WriteLine("Volume down")
        End Sub

        Public Sub PlugIn() Implements Pluggable.PlugIn
            Console.WriteLine("Plugging In")
        End Sub

        Public Sub PlugOff() Implements Pluggable.PlugOff
            Console.WriteLine("Plugging Off")
        End Sub

    End Class

    Sub Main()

        Dim o As New CellPhone
        o.SwitchOn()
        o.VolumeUp()
        o.PlugIn()

    End Sub

End Module

We have a CellPhone class that inherits from three interfaces.

Class CellPhone
    Implements Device, Volume, Pluggable

The class implements all three interfaces, which are divided by a comma. The
CellPhone class must implement all method signatures from all three
interfaces.

$ dotnet run
Switching on
Volume up
Plugging In

The next example shows how interfaces can inherit from multiple other
interfaces.

Program.vb
  

Option Strict On

Module Example

    Interface IInfo

        Sub DoInform()

    End Interface

    Interface IVersion

       Sub GetVersion()

    End Interface

    Interface ILog
        Inherits IInfo, IVersion

       Sub DoLog

    End Interface

    Class DBConnect
        Implements ILog

        Public Sub DoInform() Implements IInfo.DoInform
            Console.WriteLine("This is DBConnect class")
        End Sub

        Public Sub GetVersion() Implements IVersion.GetVersion
            Console.WriteLine("Version 1.02")
        End Sub

        Public Sub DoLog() Implements ILog.DoLog
            Console.WriteLine("Logging")
        End Sub

        Public Sub Connect()
            Console.WriteLine("Connecting to the database")
        End Sub

    End Class

    Sub Main()

        Dim db As New DBConnect
        db.DoInform()
        db.GetVersion()
        db.DoLog()
        db.Connect()

    End Sub

End Module

We define three interfaces. We can organise interfaces in hierarchy.

Interface ILog
    Inherits IInfo, IVersion

The ILog interface inherits from two other interfaces.

Public Sub DoInform() Implements IInfo.DoInform
    Console.WriteLine("This is DBConnect class")
End Sub

The DBConnect class implements the DoInform
method. This method was inherited by the ILog interface,
which the class implements.

$ dotnet run
This is DBConnect class
Version 1.02
Logging
Connecting to the database

## Polymorphism

The polymorphism is the process of using an operator or function in different
ways for different data input. In practical terms, polymorphism means that if
class B inherits from class A, it doesn't have to inherit everything about class
A; it can do some of the things that class A does differently. (wikipedia)

In general, polymorphism is the ability to appear in different forms.
Technically, it is the ability to redefine methods for derived classes.
Polymorphism is concerned with the application of specific implementations to an
interface or a more generic base class.

Polymorphism is the ability to redefine methods for derived classes.

Program.vb
  

Option Strict On

Module Example

    MustInherit Class Shape

        Protected x As Integer
        Protected y As Integer

        Public MustOverride Function Area() As Integer

    End Class

    Class Rectangle
        Inherits Shape

        Sub New(ByVal x As Integer, ByVal y As Integer)
            Me.x = x
            Me.y = y
        End Sub

        Public Overrides Function Area() As Integer
            Return Me.x * Me.y
        End Function

    End Class

    Class Square
        Inherits Shape

        Sub New(ByVal x As Integer)
            Me.x = x
        End Sub

        Public Overrides Function Area() As Integer
            Return Me.x * Me.x
        End Function

    End Class

    Sub Main()

        Dim shapes() As Shape = { New Square(5),
            New Rectangle(9, 4), New Square(12) }

        For Each shape As Shape In shapes
            Console.WriteLine(shape.Area())
        Next

    End Sub

End Module

In the above program, we have an abstract Shape class. This class morphs into
two descendant classes, Rectangle and Square. Both provide their own
implementation of the Area() method. Polymorphism brings flexibility and
scalability to the OOP systems.

Public Overrides Function Area() As Integer
    Return Me.x * Me.y
End Function
...
Public Overrides Function Area() As Integer
    Return Me.x * Me.x
End Function

Rectangle and Square classes have their own implementations of the Area method.

Dim shapes() As Shape = { New Square(5),
    New Rectangle(9, 4), New Square(12) }

We create an array of three Shapes.

For Each shape As Shape In shapes
    Console.WriteLine(shape.Area())
Next

We go through each shape and call Area method on it. The compiler calls the
correct method for each shape. This is the essence of polymorphism.

## NotOverridable, NotInheritable

NotOverridable methods cannot be overridden and
NotInheritable classes cannot be inherited from. These keywords are
a matter of a design of the application. We should not inherit from some classes
and some methods should not be overridden.

Program.vb
  

Option Strict On

Module Example

    Class Base

        Public NotOverridable Sub Say()
            Console.WriteLine("Base class")
        End Sub

    End Class

    Class Derived
        Inherits Base

        Public Overrides Sub Say()
            Console.WriteLine("Derived class")
        End Sub

    End Class

    Sub Main()

        Dim o As Base = New Derived
        o.Say()

    End Sub

End Module

This program won't compile. We get an error 'Public Overrides Sub Say()' cannot
override 'Public NotOverridable Sub Say()' because it is declared
'NotOverridable'.

Program.vb
  

Option Strict On

Module Example

    NotInheritable Class Math

        Public Shared Function getPI() As Single
            Return 3.141592
        End Function

    End Class

    Class DerivedMath
        Inherits Math

        Public Sub Say()
            Console.WriteLine("DerivedMath class")
        End Sub

    End Class

    Sub Main()

        Dim o As DerivedMath = New DerivedMath
        o.Say()

    End Sub

End Module

In the above program, we have a prototype base Math class. The sole
purpose of this class is to provide some helpful methods and constants to the
programmer. (In our case we have only one method for simplicity reasons.) It is
not created to be inherited from. To prevent uninformed other programmers to
derive from this class, the creators made the class NotInheritable.
If you try to compile this program, you get the following error: 'DerivedMath'
cannot inherit from class 'Math' because 'Math' is declared 'NotInheritable'.

## Deep copy vs shallow copy

Copying of data is an important task in programming. Object is a composite data
type in OOP. Member field in an object may be stored by value or by reference.
Copying may be performed in two ways.

The *shallow copy* copies all values and references into a new instance.
The data to which a reference is pointing is not copied; only the pointer is
copied. The new references are pointing to the original objects. Any changes to
the reference members affect both objects.

The *deep copy* copies all values into a new instance. In case of members
that are stored as references a deep copy performs a deep copy of data that is
being referenced. A new copy of a referenced object is created. And the pointer
to the newly created object is stored. Any changes to those referenced objects
will not affect other copies of the object. Deep copies are fully replicated
objects.

If a member field is a value type, a bit-by-bit copy of the field is performed.
If the field is a reference type, the reference is copied but the referred
object is not; therefore, the reference in the original object and the reference
in the clone point to the same object. (a clear explanation from
programmingcorner.blogspot.com)

The next two examples perform a shallow and a deep copy on objects.

Program.vb
  

Option Strict On

Module Example

    Class Color

        Public red as Byte
        Public green as Byte
        Public blue as Byte

        Sub New(red As Byte, green As Byte,
            blue As Byte)
            Me.red = red
            Me.green = green
            Me.blue = blue
        End Sub

    End Class

    Class MyObject
        Implements ICloneable

        Public Id As Integer
        Public Size As String
        Public Col As Color

        Sub New(Id As Integer, Size As String,
            Col As Color)
            Me.Id = Id
            Me.Size = Size
            Me.Col = Col
        End Sub

        Public Function Clone() As Object
                          Implements ICloneable.Clone
          Return New MyObject(Me.Id, Me.Size, Me.Col)
        End Function

        Public Overrides Function ToString() As String
            Dim s As String
            s = String.Format("Id: {0}, Size: {1}, Color:({2}, {3}, {4})",
                Me.Id, Me.Size, Me.Col.red, Me.Col.green, Me.Col.blue)
            Return s
        End Function

    End Class

    Sub Main()

        Dim col As New Color(23, 42, 223)

        Dim obj1 As New MyObject(23, "small", col)
        Dim obj2 As MyObject

        obj2 = CType(obj1.Clone(), MyObject)

        obj2.Id += 1
        obj2.Size = "big"
        obj2.Col.red = 255

        Console.WriteLine(obj1)
        Console.WriteLine(obj2)

    End Sub

End Module

This is an example of a shallow copy. We define two custom objects:
MyObject and Color. The MyObject object
haves a reference to the Color object.

Class MyObject
    Implements ICloneable

We should implement ICloneable interface for objects, which we are
going to clone.

Public Function Clone() As Object
                  Implements ICloneable.Clone
    Return New MyObject(Me.Id, Me.Size, Me.Col)
End Function

The ICloneable interface forces us to create a Clone
method. This method returns a new object with copied values.

Dim col As New Color(23, 42, 223)

We create an instance of the Color object.

Dim obj1 As New MyObject(23, "small", col)

An instance of the MyObject object is created. It passes the
instance of the Color object to its constructor.

obj2 = CType(obj1.Clone(), MyObject)

We create a shallow copy of the obj1 object and assign it to the
obj2 variable. The Clone method returns an
Object and we expect MyObject. This is why we do
explicit casting.

obj2.Id += 1
obj2.Size = "big"
obj2.Col.red = 255

Here we modify the member fields of the copied object. We increment the Id,
change the Size to "big" and change the red part of the color object.

Console.WriteLine(obj1)
Console.WriteLine(obj2)

The Console.WriteLine method calls the ToString method
of the obj2 object, which returns the string representation of the object.

Id: 23, Size: small, Color:(255, 42, 223)
Id: 24, Size: big, Color:(255, 42, 223)

We can see that the Ids are different, 23 vs 24. The Size is different. "small"
vs "big". But the red part of the color object is same for both instances: 255.
Changing member values of the cloned object (Id, Size) did not affect the
original object. Changing members of the referenced object (Col) has affected
the original object too. In other words, both objects refer to the same color
object in memory.

To change this behaviour, we do a deep copy next.

Program.vb
  

Option Strict On

Module Example

    Class Color
        Implements ICloneable

        Public Red as Byte
        Public Green as Byte
        Public Blue as Byte

        Sub New(Red As Byte, Green As Byte,
            Blue As Byte)
            Me.Red = Red
            Me.Green = Green
            Me.Blue = Blue
        End Sub

        Public Function Clone() As Object
                          Implements ICloneable.Clone
          Return New Color(Me.Red, Me.Green, Me.Blue)
        End Function

    End Class

    Class MyObject
        Implements ICloneable

        Public Id As Integer
        Public Size As String
        Public Col As Color

        Sub New(Id As Integer, Size As String,
            Col As Color)
            Me.Id = Id
            Me.Size = Size
            Me.Col = Col
        End Sub

        Public Function Clone() As Object
                          Implements ICloneable.Clone
            Return New MyObject(Me.Id, Me.Size, CType(Me.Col.Clone(), Color))
        End Function

        Public Overrides Function ToString() As String
            Dim s As String
            s = String.Format("Id: {0}, Size: {1}, Color:({2}, {3}, {4})",
                Me.Id, Me.Size, Me.Col.Red, Me.Col.Green, Me.Col.Blue)
            Return s
        End Function

    End Class

    Sub Main()

        Dim col As New Color(23, 42, 223)

        Dim obj1 As New MyObject(23, "small", col)
        Dim obj2 As MyObject

        obj2 = CType(obj1.Clone(), MyObject)

        obj2.Id += 1
        obj2.Size = "big"
        obj2.Col.Red = 255

        Console.WriteLine(obj1)
        Console.WriteLine(obj2)

    End Sub

End Module

In this program, we perform a deep copy on object.

Class Color
    Implements ICloneable

Now the Color class implements the ICloneable
interface.

Public Function Clone() As Object
                  Implements ICloneable.Clone
    Return New Color(Me.Red, Me.Green, Me.Blue)
End Function

We have a Clone method for the Color class
too. This helps to create a copy of a referenced object.

Public Function Clone() As Object
                  Implements ICloneable.Clone
    Return New MyObject(Me.Id, Me.Size, CType(Me.Col.Clone(), Color))
End Function

Now, when we clone the MyObject, we call the Clone
method upon the Col reference type. This way we have a copy of a color value
too.

$ dotnet run
Id: 23, Size: small, Color:(23, 42, 223)
Id: 24, Size: big, Color:(255, 42, 223)

Now the red part of the referenced Color object is not the same.
The original object has retained its previous 23 value.

## Exceptions

Exceptions are designed to handle the occurrence of exceptions, special
conditions that change the normal flow of program execution. Exceptions are
raised or thrown, initiated.

During the execution of our application, many things might go wrong. A disk
might get full and we cannot save our file. An Internet connection might go down
and our application tries to connect to a site. All these might result in a
crash of our application. To prevent happening this, we must cope with all
possible errors that might occur. For this, we can use the exception handling.

The Try, Catch and Finally keywords are
used to work with exceptions.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim x As Integer = 100
        Dim y As Integer = 0
        Dim z As Double

        Try
            z = x \ y
        Catch e As Exception
            Console.WriteLine(e.Message)
        End Try

    End Sub

End Module

In the above program, we intentionally divide a number by zero. This leads to an
error.

Try
    z = x \ y
...
End Try

Statements that are error prone are placed after the Try
keyword.

Catch e As Exception
    Console.WriteLine(e.Message)
...

Exception types follow the Catch keyword. In our case we have a
generic Exception which will catch an exception of any type. There
are some generic exceptions and some more specific. Statements that follow the
Catch keyword are executed, when an error occurs. When an exception
occurs, an exception object is created. From this object we get the
Message property and print it to the console.

Any uncaught exception in the current context propagates to a higher context and
looks for an appropriate catch block to handle it. If it can't find any suitable
catch blocks, the default mechanism of the .NET runtime will terminate the
execution of the entire program.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim z As Double
        Dim x As Integer = 100
        Dim y As Integer = 0

        z = x \ y

    End Sub

End Module

In this program, we divide by zero. We have no custom exception handling. We
receive the following error message: 
Unhandled Exception: System.DivideByZeroException: Attempted to divide by zero.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

    Dim fs As FileStream

    Sub Main()

        Try
            fs = File.Open("file", FileMode.OpenOrCreate)
            Console.WriteLine(fs.Length)
        Catch e As IOException
            Console.WriteLine("IO Error")
            Console.WriteLine(e.Message)
        Finally
            Console.WriteLine("Finally")
            If fs.CanRead = True Then
                fs.Close()
            End If
        End Try

    End Sub

End Module

The statements following the Finally keyword are always executed.
It is often used to clean-up tasks, such as closing files or clearing buffers.

Catch e As IOException
    Console.WriteLine("IO Error")
    Console.WriteLine(e.Message)

In this case, we catch for a specific IOException exception.

Finally
    Console.WriteLine("Finally")
    If fs.CanRead = True Then
        fs.Close()
    End If

These lines guarantee that the file handler is closed.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim x As Integer
        Dim y As Integer
        Dim z As Double

        Try
            Console.Write("Enter first number: ")
            x = Convert.ToInt32(Console.ReadLine())

            Console.Write("Enter second number: ")
            y = Convert.ToInt32(Console.ReadLine())

            z = x / y
            Console.WriteLine("Result: {0:D} / {1:D} = {2:D}", x, y, z)

        Catch e As DivideByZeroException
            Console.WriteLine("Cannot divide by zero.")
        Catch e As FormatException
            Console.WriteLine("Wrong format of number.")
        Catch e As Exception
            Console.WriteLine(e.Message)
        End Try

    End Sub

End Module

In this example, we catch for various exceptions. Note that more specific
exceptions should precede the generic ones. We read two numbers from the console
and check for zero division error and for wrong format of number.

$ dotnet run
Enter first number: et
Wrong format of number.

Program.vb
  

```
Option Strict On

Module Example

    Class BigValueException
        Inherits Exception

        Sub New(ByVal msg As String)
            MyBase.New(msg)
        End Sub

    End Class

    Sub Main()

        Dim x As Integer = 340004
        Const LIMIT As Integer = 333

        Try
            If (x &gt; LIMIT) Then
                Throw New BigValueException("Exceeded the maximum value")
            End If
        Catch e As BigValueException
            Console.WriteLine(e.Message)
        End Try

    End Sub

End Module

```

Let's say, we have a situation in which we cannot deal with big numbers.

Class BigValueException
    Inherits Exception

We have a *BigValueException* class. This class derives from the
built-in Exception class.

Dim Const LIMIT As Integer = 333

Numbers bigger than this constant are considered to be "big" by our program.

Sub New(ByVal msg As String)
    MyBase.New(msg)
End Sub

Inside the constructor, we call the parent's constructor. We pass the message to
the parent.

If (x &gt; LIMIT) Then
    Throw New BigValueException("Exceeded the maximum value")
End If

If the value is bigger than the limit, we throw our custom exception. We give
the exception a message "Exceeded the maximum value".

Catch e As BigValueException
    Console.WriteLine(e.Message)

We catch the exception and print its message to the console.

## Properties

Properties are special kind of class members. We use predefined set and get
methods to access and modify them. Property reads and writes are translated to
get and set method calls. Accessing variables with a field notation (e.g.
object.Name) is easier than with custom method calls.(e.g.
object.GetName). However with properties, we still have the
advantage of encapsulation and information hiding.

Program.vb
  

Option Strict On

Module Example

    Class Person

        Private name As String

        Public Property Name() As String
            Get
                Return name
            End Get

            Set (Byval Value As String)
                name = Value
            End Set
        End Property

    End Class

    Sub Main()

        Dim p as New Person
        p.Name = "Jane"

        Console.WriteLine(p.Name())

    End Sub

End Module

We have a simple Person class with one property.

Public Property Name() As String
...
End Property

We use the Property keyword to create properties in Visual Basic.

Get
    Return name
End Get

We use the predefined Get keyword to create an accessor method to
the name field.

Set (Byval Value As String)
    name = Value
End Set

Similarly, the Set keyword creates a mutator method for the name
field.

Dim p as New Person
p.Name = "Jane"

Console.WriteLine(p.Name())

We create an instance of the Person class. We access the member
field using the field notation.

$ dotnet run
Jane

## Delegates

A delegate is a form of type-safe function pointer used by the .NET Framework.
Delegates are often used to implement callbacks and event listeners.

Program.vb
  

Option Strict On

Module Example

    Public Delegate Sub NameDelegate(ByVal msg As String)

    Class Person

        Private FirstName As String
        Private SecondName As String

        Sub New(First As String, Second As String)
            Me.FirstName = First
            Me.SecondName = Second
        End Sub

        Public Sub ShowFirstName(msg As String)
            Console.WriteLine(msg &amp; Me.FirstName)
        End Sub

        Public Sub ShowSecondName(msg As String)
            Console.WriteLine(msg &amp; Me.SecondName)
        End Sub

    End Class

    Sub Main()

        Dim nDelegate As NameDelegate

        Dim per As New Person("Fabius", "Maximus")

        nDelegate = AddressOf per.ShowFirstName
        nDelegate("Call 1: ")

        nDelegate = AddressOf per.ShowSecondName
        nDelegate("Call 2: ")

    End Sub

End Module

In the example we have one delegate. This delegate is used to point to two
methods of the Person class. The methods are called with the
delegate.

Public Delegate Sub NameDelegate(ByVal msg As String)

The delegate is created with a Delegate keyword. The delegate
signature must match the signature of the method being called with the delegate.

Dim nDelegate As NameDelegate

Here we create a variable of our custom delegate type.

nDelegate = AddressOf per.ShowFirstName
nDelegate("Call 1: ")

The AddressOf operator is used to get the reference to the
ShowFirstName method. Now that we point to the method, we can call
it via the delegate.

$ dotnet run
Call 1: Fabius
Call 2: Maximus

Both names are printed via the delegate.

## Events

Events are messages triggered by some action. Click on the button or tick of a
clock are such actions. The object that triggers an event is called a sender and
the object that receives the event is called a receiver.

Program.vb
  

Option Strict On

Module Example

    Public Event ValueFive()

    Dim Random As Integer

    Public Sub Main()

        AddHandler ValueFive, AddressOf OnFiveEvent

        For i As Integer = 0 To 10

            Randomize()
            Random = CInt(Rnd() * 7)

            Console.WriteLine(Random)

            If Random = 5 Then
                RaiseEvent ValueFive()
            End If
        Next

    End Sub

    Public Sub OnFiveEvent()
        Console.WriteLine("Five Event occured")
    End Sub

End Module

We have a simple example in which we create and launch an event. An random
number is generated. If the number equals to 5 a
FiveEvent event is generated.

Public Event ValueFive()

An event is declared with a Event keyword.

AddHandler ValueFive, AddressOf OnFiveEvent

Here we plug the event called ValueFive to the
OnFiveEvent subroutine. In other words if the
ValueFive event is triggered, the OnFiveEvent
subroutine is executed.

If Random = 5 Then
    RaiseEvent ValueFive()
End If

When the random number equals to 5, we raise the ValueFive
event. We use the RaiseEvent keyword.

$ dotnet run
0
1
5
Five Event occured
2
5
Five Event occured
6
7
6
3
3
1

Next we have a more complex example.

Program.vb
  

Option Strict On

Namespace EventSample

    Public Class FiveEventArgs
        Inherits EventArgs

        Public Count As Integer
        Public Time As Date

        Public Sub New(ByVal Count As Integer, ByVal Time As Date)
            Me.Count = Count
            Me.Time = Time
        End Sub

    End Class

    Public Class Five

        Private Count As Integer = 0

        Public Sub OnFiveEvent(ByVal source As Object, ByVal e As FiveEventArgs)
            Console.WriteLine("Five event {0} occured at {1}", e.Count, e.Time)
        End Sub

    End Class

    Public Class RandomGenerator

        Public Event ValueFive(ByVal source As Object, ByVal e As FiveEventArgs)

        Public Sub Generate()

            Dim Count As Integer = 0
            Dim args As FiveEventArgs

            For i As Byte = 0 To 10
                Dim Random As Integer

                Randomize()
                Random = CInt(Rnd * 6)
                Console.WriteLine(Random)

                If Random = 5 Then
                    Count += 1
                    args = New FiveEventArgs(Count, Now)
                    RaiseEvent ValueFive(Me, args)
                End If
            Next
        End Sub

    End Class

    Public Class Example

        Public Shared Sub Main()

            Dim five As New Five
            Dim gen As New RandomGenerator

            AddHandler gen.ValueFive, AddressOf five.OnFiveEvent

            gen.Generate()

        End Sub

    End Class

End Namespace

We have four classes. FiveEventArgs carries some data with the
event object. The Five class encapsulates the event object.
RandomGenerator class is responsible for random number generation.
It is the event sender. Finally the Example class, which is the
main application object and has the Main method.

Public Class FiveEventArgs
    Inherits EventArgs

    Public Count As Integer
    Public Time As Date
...

The FiveEventArgs carries data inside the event object. It
inherits from the EventArgs base class. The Count
and Time members are data that will be initialized and carried
with the event.

If Random = 5 Then
    Count += 1
    args = New FiveEventArgs(Count, Now)
    RaiseEvent ValueFive(Me, args)
End If

If the generated random number equals to 5, we instantiate the
FiveEventArgs class with the current Count
and Date values. The Count variable counts the number
of times this event was generated. The Time value holds the time,
when the event was generated. The event is sent with the RaiseEvent
keyword with the sender object and event arguments.

AddHandler gen.ValueFive, AddressOf five.OnFiveEvent

We plug the ValueFive event to its handler.

$ dotnet run 
5
Five event 1 occured at 9/3/2022 1:07:41 PM
5
Five event 2 occured at 9/3/2022 1:07:41 PM
4
6
5
Five event 3 occured at 9/3/2022 1:07:41 PM
4
5
Five event 4 occured at 9/3/2022 1:07:41 PM
1
5
Five event 5 occured at 9/3/2022 1:07:41 PM
4
3

In this part of the Visual Basic tutorial, we continued the discussion of the
object-oriented programming in Visual Basic.

[Contents](..)
[Previous](../oopi/)
[Next](../collections/)