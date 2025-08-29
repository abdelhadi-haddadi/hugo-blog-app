+++
title = "Introduction to wxPython"
date = 2025-08-29T20:15:56.047+01:00
draft = false
description = "This part of the wxPython tutorial is an introduction to wxPython."
image = "images/pythonlogo.png"
imageBig = "images/pythonlogo.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../firststeps/)

# Introduction to wxPython

last modified January 10, 2023

This chapter is an introduction to the wxPython toolkit. 

wxPython is a cross platform toolkit for creating desktop GUI applications. 
The principal author of wxPython is *Robin Dunn*. With wxPython developers can
create applications on Windows, Mac and on various Unix systems. 
wxPython is a wrapper around wxWidgets, which is a mature cross platform C++ 
library.

## Python

![pythonlogo.png](images/pythonlogo.png)

 
Python is a successful scripting language. It was initially developed by 
*Guido van Rossum*. It was first released in 1991. Python was inspired 
by ABC and Haskell programming languages. Python is a high level, general 
purpose, multiplatform, interpreted language. Some prefer to call it a 
dynamic language. It is easy to learn. Python is a minimalistic language. 
One of its most visible features is that it does not use semicolons nor 
brackets. Python uses indentation instead. Today Python is maintained by 
a large group of volunteers worldwide. 

For creating graphical user interfaces, Python programmers can choose among 
three decent options: PyGTK, wxPython, and PyQt.

## wxPython modules

wxPython is a cross platform toolkit for creating desktop GUI applications. 
The principal author of wxPython is *Robin Dunn*. With wxPython developers can
create applications on Windows, Mac and on various Unix systems. 
wxPython is a wrapper around wxWidgets, which is a mature cross platform C++ 
library. wxPython consists of the five basic modules. 

![modules.jpg](images/modules.jpg)

Figure: wxPython modules

*Controls* module provides the common widgets found in graphical applications. 
For example a Button, a Toolbar, or a Notebook. Widgets are called controls under Windows OS. 
The *Core* module consists of elementary classes that are used in development. 
These classes include the Object class, which is the mother of all classes, 
Sizers, which are used for widget layout, Events, basic geometry classes like 
Point and Rectangle. The Graphics Device Interface (*GDI*) is a set of 
classes used for drawing onto the widgets. This module contains classes for 
manipulation of Fonts, Colours, Brushes, Pens or Images. 
The *Misc* module contains of various other classes and module functions. 
These classes are used for logging, application configuration, system settings, 
working with display or joystick. The *Windows* module consists of various 
windows that form an application, for instance a Panel, a Dialog, a Frame, or 
a Scrolled Window.

## wxPython API

wxPython API is a set of methods and objects. Widgets are essential building 
blocks of a GUI application. Under Windows widgets are calles controls. We can 
roughly divide programmers into two groups: they code either applications or libraries. 
In our case, wxPython is a library that is used by application programmers to 
code applications. Technically, wxPython is a wrapper over a C++ GUI API called 
wxWidgets. So it is not a native API; i.e. it is not written directly in Python. 

In wxPython we have lots of widgets. These can be divided into some logical groups. 

### Base Widgets

These widgets provide basic functionality for derived widgets. They are called 
ancestors. They are usually not used directly. 

![base.jpg](images/base.jpg)

Figure: Base widgets

### Top level Widgets

These widgets exist independently of each other.

![toplevel.jpg](images/toplevel.jpg)

Figure: Top-level widgets

### Containers

Containers contain other widgets.

![containers.jpg](images/containers.jpg)

Figure: Containers

### Dynamic Widgets

These widgets can be edited by users. 

![dynamic.jpg](images/dynamic.jpg)

Figure: Dynamic widgets

### Static Widgets

These widgets display information. They cannot be edited by user. 

![staticwidgets.jpg](images/staticwidgets.jpg)

Figure: Static widgets

### Other Widgets

These widgets implement statusbar, toolbar and menubar in an application. 

![bars.jpg](images/bars.jpg)

Figure: Other widgets

### Inheritance

There is a specific relation among widgets in wxPython. This relation is developed 
by inheritance. The inheritance is a crucial part of the object oriented programming. 
Widgets form a hierarchy. Widgets can inherit functionality from other widgets. 
Existing classes are called base classes, parents, or ancestors. The widgets 
that inherit we call derived widgets, child widgets or descendants. 

![inheritance.png](images/inheritance.png)

Figure: Inheritance diagram

Say we use a button widget in our application. The button widget 
inherits from four different base classes. 
The closest class is the wx.Control class. A button widget is
a kind of a small window. All widgets that appear on the screen are 
windows. Therefore they inherit from wx.Window class. There 
are objects that are invisible. Examples are sizers, device context 
or locale object. There are also classes that are visible but they 
are not windows. For example a colour object, caret object or a cursor object. 
Not all widgets are controls. For example wx.Dialog is not a 
kind of control. The controls are widgets that are placed on other 
widgets called *containers*. That's why we have a separate wx.Control base class.  

Every window can react to events. So does the button widget. By clicking 
on the button, we launch the wx.EVT_COMMAND_BUTTON_CLICKED event. 
The button widget inherits the wx.EvtHandler via the wx.Window class.
Each widget that reacts to events must inherit from wx.EvtHandler class. 
Finally all objects inherit from wx.Object class. 

This was an introduction to wxPython.

[Contents](..)
[Next](../firststeps/)