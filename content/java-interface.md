+++
title = "Java interface"
date = 2025-08-29T19:59:07.353+01:00
draft = false
description = "Java interface tutorial shows how to work with interfaces in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java interface

last modified January 27, 2024

 

In this article we show how to work with Java interfaces.

An *interface* defines a contract that must be implemented by classes
that extend the interface.

A remote control is an interface between the viewer and the TV. It is an
interface to this electronic device. Diplomatic protocol guides all activities
in the diplomatic field. Rules of the road are rules that motorists, bikers, and
pedestrians must follow. Interfaces in programming are analogous to the previous
examples.

Interfaces are:

- APIs

- Contracts

Objects interact with the outside world with the methods they expose. The actual
implementation is not important to the programmer, or it also might be secret. A
company might sell a library and it does not want to disclose the actual
implementation. A programmer might call a maximize method on a
window of a GUI toolkit but knows nothing about how this method is implemented.
From this point of view, interfaces are ways through which objects interact with
the outside world, without exposing too much about their inner workings.

From the second point of view, interfaces are contracts. They are used to design
an architecture of an application and help organize the code.

Interfaces are fully abstract types. They are declared using the
interface keyword. In Java, an interface is a reference type,
similar to a class that can contain only constants, method signatures, and
nested types. There are no method bodies. Interfaces cannot be instantiated—they
can only be implemented by classes or extended by other interfaces.

All interface members implicitly have public access. Interfaces cannot have
fully implemented methods. A Java class may implement any number of interfaces.
An interface scan also extend any number of interfaces. A class that implements
an interface must implement all method signatures of an interface.

Interfaces are used to simulate *multiple inheritance*. A Java class can
inherit only from one class but it can implement multiple interfaces. Multiple
inheritance with interfaces is not about inheriting methods and variables, it is
about inheriting ideas or contracts which are described by the interfaces.

The body of the interface contains abstract methods, but since all methods in an
interface are, by definition, abstract, the abstract keyword is not required.
Since an interface specifies a set of exposed behaviors, all methods are
implicitly public. An interface can contain constant member declarations in
addition to method declarations. All constant values defined in an interface are
implicitly public, static, and final.
These modifiers can be omitted.

There is one important distinction between interfaces and abstract classes.
Abstract classes provide partial implementation for classes that are related in
the inheritance hierarchy. Interfaces on the other hand can be implemented by
classes that are not related to each other.

## Java interface simple example

The following is a simple program which uses Java interface.

com/zetcode/SimpleInterface.java
  

package com.zetcode;

interface IInfo {

    void doInform();
}

class Some implements IInfo {

    @Override
    public void doInform() {

        System.out.println("This is Some Class");
    }
}

public class SimpleInterface {

    public static void main(String[] args) {

        Some sm = new Some();
        sm.doInform();
    }
}

We have one interface and one class which implements the interface.

interface IInfo {

    void doInform();
}

This is an interface IInfo. It has the doInform
method signature.

class Some implements IInfo {

We implement the IInfo interface. To implement a specific
interface, we use the implements keyword.

@Override
public void doInform() {

    System.out.println("This is Some Class");
}

The class provides an implementation for the doInform method. The
@Override annotation tells the compiler that we are overriding a
method.

## Java multiple interfaces

Java does not allow to inherit from more than one class directly. It allows to
implement multiple interfaces. The next example shows how a class can implement
multiple interfaces.

com/zetcode/MultipleInterfaces.java
  

package com.zetcode;

interface Device {

    void switchOn();

    void switchOff();
}

interface Volume {

    void volumeUp();

    void volumeDown();
}

interface Pluggable {

    void plugIn();

    void plugOff();
}

class CellPhone implements Device, Volume, Pluggable {

    @Override
    public void switchOn() {

        System.out.println("Switching on");
    }

    @Override
    public void switchOff() {

        System.out.println("Switching on");
    }

    @Override
    public void volumeUp() {

        System.out.println("Volume up");
    }

    @Override
    public void volumeDown() {

        System.out.println("Volume down");
    }

    @Override
    public void plugIn() {

        System.out.println("Plugging in");
    }

    @Override
    public void plugOff() {

        System.out.println("Plugging off");
    }
}

public class MultipleInterfaces {

    public static void main(String[] args) {

        CellPhone cp = new CellPhone();
        cp.switchOn();
        cp.volumeUp();
        cp.plugIn();
    }
}

We have a CellPhone class that inherits from three interfaces.

class CellPhone implements Device, Volume, Pluggable {

The class implements all three interfaces which are divided by a comma. The
CellPhone class must implement all method signatures from all three
interfaces.

$ java com.zetcode.MultipleInterfaces
Switching on
Volume up
Plugging in

## Java interface hierarchy

The next example shows how interfaces can form a hierarchy. Interfaces can
inherit from other interfaces using the extends keyword.

com/zetcode/InterfaceHierarchy.java
  

package com.zetcode;

interface IInfo {

    void doInform();
}

interface IVersion {

    void getVersion();
}

interface ILog extends IInfo, IVersion {

    void doLog();
}

class DBConnect implements ILog {

    @Override
    public void doInform() {

        System.out.println("This is DBConnect class");
    }

    @Override
    public void getVersion() {

        System.out.println("Version 1.02");
    }

    @Override
    public void doLog() {

        System.out.println("Logging");
    }

    public void connect() {

        System.out.println("Connecting to the database");
    }
}

public class InterfaceHierarchy {

    public static void main(String[] args) {

        DBConnect db = new DBConnect();
        db.doInform();
        db.getVersion();
        db.doLog();
        db.connect();
    }
}

We define three interfaces. The interfaces are organized in a hierarchy.

interface ILog extends IInfo, IVersion {

The ILog interface inherits from two interfaces.

class DBConnect implements ILog {

The DBConnect class implements the ILog interface.
Therefore it must implement the methods of all three interfaces.

@Override
public void doInform() {

    System.out.println("This is DBConnect class");
}

The DBConnect class implements the doInform method.
This method was inherited by the ILog interface which the class
implements.

$ java com.zetcode.InterfaceHierarchy
This is DBConnect class
Version 1.02
Logging
Connecting to the database

## Source

[What Is an Interface - tutorial](https://docs.oracle.com/javase/tutorial/java/concepts/interface.html)

In this article we have shown how to work with Java interfaces.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).