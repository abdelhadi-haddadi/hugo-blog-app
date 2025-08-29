+++
title = "Introduction to PyQt4"
date = 2025-08-29T19:57:04.379+01:00
draft = false
description = "This chapter is an introduction to the PyQt4 toolkit. It briefly introduces the Python language and the PyQt4 toolkit."
image = "images/pythonlogo.png"
imageBig = "images/pythonlogo.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../firstprograms/)

# Introduction to PyQt4

last modified October 18, 2023

This is an introductory PyQt4 tutorial. The purpose of this tutorial 
is to get you started with the PyQt4 toolkit. The tutorial has been 
created and tested on Linux.

## About PyQt4

PyQt4 is a toolkit for creating GUI applications. It is a blending of Python 
programming language and the successful Qt library. Qt library is one of 
the most powerful GUI libraries. The official home site for PyQt4 is on
[www.riverbankcomputing.co.uk/news](http://www.riverbankcomputing.co.uk/news).
PyQt4 is developed by Riverbank Computing.

PyQt4 is implemented as a set of Python modules. It has 440 classes and 
6000 functions and methods. It is a multiplatform toolkit which runs on 
all major operating systems, including Unix, Windows, and Mac OS.
PyQt4 is dual licensed. Developers can choose between a GPL and a commercial license. 
Previously, GPL version was available only on Unix. Starting from PyQt 
version 4, GPL license is available on all supported platforms.

PyQt4's classes are divided into several modules:

    - QtCore

    - QtGui

    - QtNetwork

    - QtXml

    - QtSvg

    - QtOpenGL

    - QtSql

The QtCore module contains the core non GUI functionality. This 
module is used for working with time, files and directories, various data 
types, streams, URLs, mime types, threads or processes. The QtGui 
module contains the graphical components and related classes. These include 
for example buttons, windows, status bars, toolbars, sliders, bitmaps, 
colours, and fonts. The QtNetwork module contains the classes for 
network programming. These classes facilitate the coding of TCP/IP and UDP clients and 
servers by making the network programming easier and more portable. 
The QtXml contains classes for working with XML files. This module 
provides implementation for both SAX and DOM APIs.
The QtSvg module provides classes for displaying the contents of 
SVG files. Scalable Vector Graphics (SVG) is a language for describing 
two-dimensional graphics and graphical applications in XML.
The QtOpenGL module is used for rendering 3D and 2D graphics 
using the OpenGL library. The module enables seamless integration of 
the Qt GUI library and the OpenGL library. The QtSql module 
provides classes for working with databases. 

## Python

 
![pythonlogo.png](images/pythonlogo.png)

 
Python is a general-purpose, dynamic, object-oriented programming language.
The design purpose of the Python language emphasizes programmer productivity 
and code readability. Python was initially developed by *Guido van Rossum*. 
It was first released in 1991. Python was inspired by ABC, Haskell, Java, Lisp, Icon,
and Perl  programming languages. Python is a high-level, general purpose, 
multiplatform, interpreted language.  
Python is a minimalistic language. One of its most visible features is that it does 
not use semicolons nor brackets. It uses indentation instead. 
There are two main branches of Python currently: Python 2.x and Python 3.x. Python 3.x
breaks backward compatibility with previous releases of Python. It was created to
correct some design flaws of the language and make the language more clean. 
Python is maintained by a large group of volunteers worldwide. Python is open source software. 
Python is an ideal start for those who want to learn programming. 

 
 
 
This tutorial uses Python 2.x versions. 

 
 
 
Python programming language supports several programming styles. It does not 
force a programmer to a specific paradigm. Python supports object-oriented and 
procedural programming. There is also a limited support for functional programming.

 
 
 
The official web site for the Python programming language is 
[python.org](http://python.org) 

 

 
Perl, Python, and Ruby are widely used scripting languages. They 
share many similarities and they are close competitors. 

 

## Python toolkits

For creating graphical user interfaces, Python programmers can choose among 
three decent options: PyQt4, PyGTK, and wxPython.

This chapter was an introduction to PyQt4 toolkit.

[Contents](..) 
[Next](../firstprograms/)