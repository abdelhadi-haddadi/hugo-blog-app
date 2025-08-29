+++
title = "Introduction to PyQt5"
date = 2025-08-29T19:57:09.618+01:00
draft = false
description = "Introduction to PyQt5 toolkit briefly introduces the Python language and the PyQt5 toolkit."
image = "images/pythonlogo.png"
imageBig = "images/pythonlogo.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../datetime/)

# Introduction to PyQt5

last modified October 18, 2023

This is an introductory PyQt5 tutorial. The purpose of this tutorial 
is to get you started with the PyQt5 toolkit. The tutorial has been 
created and tested on Linux. [PyQt4 tutorial](http://zetcode.com/gui/pyqt4/)
covers PyQt4, which is a blending of the Python language (2.x and 3.x) to the
Qt4 library.

## About PyQt5

PyQt5 is a set of Python bindings for Qt5 application framework from Digia.
Qt library is one of the most powerful GUI libraries. The official home site for PyQt5 is 
[www.riverbankcomputing.co.uk/news](http://www.riverbankcomputing.co.uk/news).
PyQt5 is developed by Riverbank Computing.

PyQt5 is implemented as a set of Python modules. It has over 620 classes and 
6000 functions and methods. It is a multiplatform toolkit which runs on 
all major operating systems, including Unix, Windows, and Mac OS.
PyQt5 is dual licensed. Developers can choose between a GPL and a commercial license. 

## PyQt5 installation

$ sudo pip3 install pyqt5

We can install PyQt5 with the pip3 tool.

## PyQt5 modules

PyQt5's classes are divided into several modules, including the following:

    - QtCore

    - QtGui
    
    - QtWidgets

    - QtMultimedia

    - QtBluetooth

    - QtNetwork

    - QtPositioning

    - Enginio

    - QtWebSockets

    - QtWebEngine

    - QtWebEngineCore

    - QtWebEngineWidgets

    - QtXml

    - QtSvg

    - QtSql

    - QtTest

The QtCore module contains the core non-GUI functionality. This 
module is used for working with time, files and directories, various data 
types, streams, URLs, mime types, threads or processes. 
The QtGui contains classes for windowing system integration, event handling, 
2D graphics, basic imaging, fonts and text. The QtWidgets module contains classes 
that provide a set of UI elements to create classic desktop-style user interfaces.
The QtMultimedia contains classes to handle multimedia content and APIs to 
access camera and radio functionality.

The QtBluetooth module contains classes to scan for devices and connect and interact with them.
The QtNetwork module contains the classes for 
network programming. These classes facilitate the coding of TCP/IP and UDP clients and 
servers by making the network programming easier and more portable. 
The QtPositioning contains classes to determine a position by using a variety 
of possible sources, including satellite, Wi-Fi, or a text file.
The Enginio module implements the client-side library for accessing the Qt
Cloud Services Managed Application Runtime.
The QtWebSockets module contains classes that implement the 
WebSocket protocol. 
The QtWebEngine module provides lasses for integrating QML Web Engine objects with Python
The QtWebEngineCore contains the core Web Engine classes. The QtWebEngineWidgets
contains the Chromium based web browser.

The QtXml contains classes for working with XML files. This module 
provides implementation for both SAX and DOM APIs.
The QtSvg module provides classes for displaying the contents of 
SVG files. Scalable Vector Graphics (SVG) is a language for describing 
two-dimensional graphics and graphical applications in XML.
The QtSql module provides classes for working with databases. 
The QtTest contains functions that enable unit testing of PyQt5 applications.

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
Python is maintained by a large group of volunteers worldwide. 
Python is open source software. Python is an ideal start for those who want 
to learn programming. 

 
 
 
Python programming language supports several programming styles. It does not 
force a programmer to a specific paradigm. Python supports object-oriented and 
procedural programming. There is also a limited support for functional programming.

 
 
 
The official web site for the Python programming language is 
[python.org](http://python.org) 

 

 
Perl, Python, and Ruby are widely used scripting languages. They 
share many similarities and they are close competitors. 

 

## PyQt5 version

There are strings which hold the version of Qt and PyQt5.

pyqt_version.py
  

#!/usr/bin/python

from PyQt5.QtCore import QT_VERSION_STR
from PyQt5.Qt import PYQT_VERSION_STR

print(QT_VERSION_STR)
print(PYQT_VERSION_STR)

We print the version of Qt library and PyQt5 module.

$ ./pyqt_version.py 
5.14.2
5.15.0

This is a sample output.

This chapter was an introduction to PyQt5 toolkit.

[Contents](..) 
[Next](../datetime/)