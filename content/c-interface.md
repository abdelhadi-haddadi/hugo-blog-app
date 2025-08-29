+++
title = "C# interface"
date = 2025-08-29T19:50:54.442+01:00
draft = false
description = "C# interface tutorial shows how to work with interfaces in C#. An interface defines a contract that must be implemented by classes and structs that extend the interface."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# interface

last modified July 5, 2023

 

In this article we work with interfaces in C#.

An interface defines a contract that must be implemented by classes
and structs that extend the interface.

A remote control is an interface between the viewer and the TV. It is an
interface to this electronic device. Users of a remote control do not have to 
understand how a particular remote control actually works; they just need to 
know the interface: what a red or green button do, what is a function of arrow
buttons.

Another common interface analogue are rules of the road traffic. They are rules
that motorists, cyclists and pedestrians must follow. 

Interfaces are:

- APIs

- Contracts

Objects interact with the outside world with the methods they expose. The actual
implementation is not important to the programmer, or it also might be secret. A
company might sell a library and it does not want to disclose the actual
implementation. A programmer might call a Maximize method on a
window of a GUI toolkit but knows nothing about how this method is implemented.
From this point of view, interfaces are ways through which objects interact with
the outside world, without exposing too much about their inner workings.

From the second point of view, interfaces are contracts. If agreed upon, they
must be followed. They are used to design an architecture of an application.
They help organize the code.

Interfaces are fully abstract types. They are declared using the
interface keyword. Interfaces can only have signatures of methods,
properties, events, or indexers. All interface members implicitly have public
access. Interface members cannot have access modifiers specified. Interfaces
cannot have fully implemented methods, nor member fields. A C# class may
implement any number of interfaces.  An interface can also extend any number of
interfaces. A class that implements an interface must implement all method
signatures of an interface.

Interfaces are used to simulate *multiple inheritance*. A C# class can
inherit only from one class but it can implement multiple interfaces. Multiple
inheritance using the interfaces is not about inheriting methods and variables.
It is about inheriting ideas or contracts, which are described by the
interfaces.

There is one important distinction between interfaces and abstract classes.
Abstract classes provide partial implementation for classes that are related in
the inheritance hierarchy. Interfaces on the other hand can be implemented by
classes that are not related to each other. 

For example, we have two buttons. A classic button and a round button. Both
inherit from an abstract button class that provides some common functionality to
all buttons. Implementing classes are related, since all are buttons. Another
example might have classes Database and SignIn. They
are not related to each other. We can apply an ILoggable interface
that would force them to create a method to do logging.

## C# simple interface

The following program uses a simple interface.

Program.cs
  

namespace SimpleInterface;

interface IInfo
{
    void DoInform();
}

class Some : IInfo
{
    public void DoInform()
    {
        Console.WriteLine("This is Some Class");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var some = new Some();
        some.DoInform();
    }
}

This is a simple C# program demonstrating an interface.

interface IInfo
{
    void DoInform();
}

This is an interface IInfo. It has the DoInform
method signature.

class Some : IInfo

We implement the IInfo interface. To implement a specific
interface, we use the colon (:) operator.

public void DoInform()
{
    Console.WriteLine("This is Some Class");
}

The class provides an implementation for the DoInform method.

## C# multiple interfaces

The next example shows how a class can implement multiple interfaces.

Program.cs
  

namespace MultipleInterfaces;

interface Device
{
    void SwitchOn();
    void SwitchOff();
}

interface Volume
{
    void VolumeUp();
    void VolumeDown();
}

interface Pluggable
{
    void PlugIn();
    void PlugOff();
}

class CellPhone : Device, Volume, Pluggable
{
    public void SwitchOn()
    {
        Console.WriteLine("Switching on");
    }

    public void SwitchOff()
    {
        Console.WriteLine("Switching on");
    }

    public void VolumeUp()
    {
        Console.WriteLine("Volume up");
    }

    public void VolumeDown()
    {
        Console.WriteLine("Volume down");
    }

    public void PlugIn()
    {
        Console.WriteLine("Plugging In");
    }

    public void PlugOff()
    {
        Console.WriteLine("Plugging Off");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var cellPhone = new CellPhone();

        cellPhone.SwitchOn();
        cellPhone.VolumeUp();
        cellPhone.PlugIn();
    }
}

We have a CellPhone class that inherits from three interfaces.

class CellPhone : Device, Volume, Pluggable

The class implements all three interfaces, which are divided by a comma. The
CellPhone class must implement all method signatures from all three
interfaces.

$ dotnet run
Switching on
Volume up
Plugging In

## C# multiple interface inheritance

The next example shows how interfaces can inherit from multiple other
interfaces.

Program.cs
  

namespace InterfaceInheritance;

interface IInfo
{
    void DoInform();
}

interface IVersion
{
    void GetVersion();
}

interface ILog : IInfo, IVersion
{
    void DoLog();
}

class DBConnect : ILog
{

    public void DoInform()
    {
        Console.WriteLine("This is DBConnect class");
    }

    public void GetVersion()
    {
        Console.WriteLine("Version 1.02");
    }

    public void DoLog()
    {
        Console.WriteLine("Logging");
    }

    public void Connect()
    {
        Console.WriteLine("Connecting to the database");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var db = new DBConnect();

        db.DoInform();
        db.GetVersion();
        db.DoLog();
        db.Connect();
    }
}

We define three interfaces. We can organize interfaces in a hierarchy.

interface ILog : IInfo, IVersion

The ILog interface inherits from two other interfaces.

public void DoInform()
{
    Console.WriteLine("This is DBConnect class");
}

The DBConnect class implements the DoInform method.
This method was inherited by the ILog interface, which the class
implements.

$ dotnet run
This is DBConnect class
Version 1.02
Logging
Connecting to the database

## Source

[Interfaces - define behavior for multiple types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/interfaces)

In this article we have covered C# interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).