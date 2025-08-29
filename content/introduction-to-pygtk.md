+++
title = "Introduction to PyGTK"
date = 2025-08-29T19:56:57.009+01:00
draft = false
description = "This is an introductory chapter to PyGTK, where we briefly describe the library."
image = "images/modules.png"
imageBig = "images/modules.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../firststeps/)

# Introduction to PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we talk 
about the PyGTK GUI library and Python programming language in general. 

## About this tutorial

This is PyGTK programming tutorial. 
It has been created and tested on Linux. The PyGTK programming tutorial 
is suited for novice and more advanced programmers. 

## PyGTK

PyGTK is a set of Python wrappers for the GTK+ GUI library. 
It offers a comprehensive set of graphical elements and other useful 
programming facilities for creating desktop applications. It is a 
part of the GNOME project. PyGTK is free software and licensed under the LGPL.
Original author or PyGTK is *James Henstridge*. PyGTK is very easy 
to use, it is ideal for rapid prototyping. Currently, PyGTK is one 
of the most popular bindings for the GTK+ library.

PyGTK consists of several modules. 

![modules.png](images/modules.png)

GObject is a base class providing the common attributes and
functions for PyGTK classes. ATK is the accessibility toolkit. 
This toolkit provides tools which help physically challenged people work 
with computers. GTK is the user interface module. 
The Pango is a library which is used to work with text and 
internationalisation. Cairo is a library for creating 2D vector graphics.
Glade is used to build GUI interfaces from XML descriptions.

## Python

![pythonlogo.png](images/pythonlogo.png)

Python is a general-purpose, dynamic, object-oriented programming language.  
The design purpose of the Python language emphasises programmer productivity 
and code readability. Python was initially developed by *Guido van Rossum*. 
It was first released in 1991. Python was inspired by ABC, Haskell, Java, Lisp, Icon
and Perl  programming languages. Python is a high level, general purpose, 
multiplatform, interpreted language.  
Python is a minimalistic language. One of its most visible features is that it does 
not use semicolons nor brackets. Python uses indentation instead. 
There are two main branches of Python currently. Python 2.x and Python 3.x. Python 3.x
breaks backward compatibility with previous releases of Python. It was created to
correct some design flaws of the language and make the language more clean. 
This tutorial is written in Python 2.x Today, Python is maintained by a large 
group of volunteers worldwide. 

## GTK+

![gtk.png](images/gtk.png)

 
The *GTK+* is a library for creating graphical user 
interfaces. The library is created in C programming language. The GTK+ library 
is also called the GIMP Toolkit. Originally, the library was created
while developing the GIMP image manipulation program. Since then, the GTK+ 
became one of the most popular toolkits under Linux and BSD Unix. Today, 
most of the GUI software in the open source world is created in Qt or in GTK+.
The GTK+ is an object oriented application programming interface. The object 
oriented system is created with the Glib object system, which is a base for 
the GTK+ library. The GObject also enables to 
create language bindings for various other programming languages. 
Language bindings exist for C++, Python, Perl, Java, C#, and other programming languages. 

Gnome and XFce desktop environments have been created using the 
GTK+ library. SWT and wxWidgets are well known programming frameworks, 
that use GTK+. Prominent software applications that use GTK+ include Firefox or Inkscape.

[Contents](..)
[Next](../firststeps/)