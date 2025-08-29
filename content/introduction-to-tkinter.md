+++
title = "Introduction to Tkinter"
date = 2025-08-29T20:14:23.697+01:00
draft = false
description = "Introduction to Tkinter presents the Tkinter toolkit and shows how to create first examples in Tkinter."
image = "images/pythonlogo.png"
imageBig = "images/pythonlogo.png"
categories = ["tkinter"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../layout/)

# Introduction to Tkinter

last modified January 10, 2023

In this part of the Tkinter tutorial, we introduce the Tkinter toolkit and
create our first programs.

The purpose of this tutorial is to get you started with the Tkinter toolkit.

## Tkinter

*Tkinter* is a Python binding to the Tk GUI toolkit. Tk is the original GUI
library for the Tcl language. Tkinter is implemented as a Python wrapper around
a complete Tcl interpreter embedded in the Python interpreter. There are several
other popular Python GUI toolkits. Most popular are wxPython, PyQt, and PyGTK.

## Python

![pythonlogo.png](images/pythonlogo.png)

Python is a general-purpose, dynamic, object-oriented programming language.
The design purpose of the Python language emphasizes programmer productivity
and code readability. Python was initially developed by *Guido van Rossum*.
It was first released in 1991. Python was inspired by ABC, Haskell, Java, Lisp, Icon,
and Perl programming languages. Python is a high-level, general-purpose,
multiplatform, interpreted language.
Python is well suited for learning about GUI programming.

The official web site for the Python programming language is [python.org](http://python.org)

## Pillow

Pillow is a Python library for  for opening, manipulating, and saving many different
image file formats. Some of the examples in this tutorial use Pillow.

$ sudo apt-get install python-pil.imagetk

On Debian Linux, we can install Pillow with its package manager.

$ yum install python-imaging

On systems using RPM package format, we use the above command to
install Pillow.

$ pip install pillow

Alternatively, we can use pip to install Pillow.

## Tkinter simple example

In our first example, we show a basic window on the screen.

simple.py
  

#!/usr/bin/python

"""
ZetCode Tkinter tutorial

This script shows a simple window
on the screen.

Author: Jan Bodnar
Website: www.zetcode.com
"""

from tkinter import Tk, BOTH
from tkinter.ttk import Frame

class Example(Frame):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.master.title("Simple")
        self.pack(fill=BOTH, expand=1)

def main():

    root = Tk()
    root.geometry("250x150+300+300")
    app = Example()
    root.mainloop()

if __name__ == '__main__':
    main()

While this code is very small, the application window can do quite a lot.
It can be resized, maximized, or minimized. All the complexity that comes
with it has been hidden from the application programmer.

from tkinter import Tk, BOTH
from tkinter.ttk import Frame

Here we import Tk and Frame classes, and BOTH constant.
Tk class is used to create a root window. Frame is a container for other
widgets.

class Example(Frame):

    def __init__(self):
        super().__init__()

Our example class inherits from the Frame container widget.
In the __init__ constructor method we call the constructor
of our inherited class.

self.initUI()

We delegate the creation of the user interface to the initUI method.

self.master.title("Simple")

We set the title of the window using the title method.
The master attribute gives access to the root window (Tk).

self.pack(fill=BOTH, expand=1)

The pack method is one of the three geometry managers in
Tkinter. It organizes widgets into horizontal and vertical boxes. Here
we put the Frame widget, accessed via the self attribute
to the Tk root window. It is expanded in both directions. In other words,
it takes the whole client space of the root window.

root = Tk()

The root window is created. The root window is a main application window
in our programs. It has a title bar and borders. These are provided by
the window manager. It must be created before any other widgets.

root.geometry("250x150+300+300")

The geometry method sets a size for the window and
positions it on the screen. The first two parameters are the width and
height of the window. The last two parameters are x and y screen
coordinates.

app = Example()

Here we create the instance of the application class.

root.mainloop()

Finally, we enter the mainloop. The event handling starts from this point.
The mainloop receives events from the window system and dispatches them to
the application widgets. It is terminated when we click on the close button
of the titlebar or call the quit() method.

![simple.png](images/simple.png)

Figure: Simple window

## Tkinter centering window

This script centers a window on the screen.

center_window.py
  

#!/usr/bin/python

"""
ZetCode Tkinter tutorial

This script centers a small
window on the screen.

Author: Jan Bodnar
Website: www.zetcode.com
"""

from tkinter import Tk, BOTH
from tkinter.ttk import Frame

class Example(Frame):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.master.title("Centered window")
        self.pack(fill=BOTH, expand=1)
        self.centerWindow()

    def centerWindow(self):

        w = 290
        h = 150

        sw = self.master.winfo_screenwidth()
        sh = self.master.winfo_screenheight()

        x = (sw - w)/2
        y = (sh - h)/2
        self.master.geometry('%dx%d+%d+%d' % (w, h, x, y))

def main():

    root = Tk()
    ex = Example()
    root.mainloop()

if __name__ == '__main__':
    main()

We need to have the size of the window and the size of the screen
to position the window in the center of the monitor screen.

w = 290
h = 150

These are the width and height values of the application window.

sw = self.master.winfo_screenwidth()
sh = self.master.winfo_screenheight()

We determine the width and height of the screen.

x = (sw - w)/2
y = (sh - h)/2

We calculate the required x and y coordinates.

self.master.geometry('%dx%d+%d+%d' % (w, h, x, y))

Finally, the geometry method is used
to place the window in the center of the screen.

## Tkinter Quit button

In the last example of this chapter, we create an application
that has a quit button. When we press the button,
the application terminates.

quit_button.py
  

#!/usr/bin/python

"""
ZetCode Tkinter tutorial

This program creates a Quit
button. When we press the button,
the application terminates.

Author: Jan Bodnar
Website: www.zetcode.com
"""

from tkinter import Tk, BOTH
from tkinter.ttk import Frame, Button, Style

class Example(Frame):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.style = Style()
        self.style.theme_use("default")

        self.master.title("Quit button")
        self.pack(fill=BOTH, expand=1)

        quitButton = Button(self, text="Quit",
            command=self.quit)
        quitButton.place(x=50, y=50)

def main():

    root = Tk()
    root.geometry("250x150+300+300")
    app = Example()
    root.mainloop()

if __name__ == '__main__':
    main()

We position a Button on the window. Clicking on the button will
terminate the application.

from tkinter.ttk import Frame, Button, Style

Tkinter supports theming of widgets. Widgets that are themed can be
imported from the ttk module. At the time of this writing, not all
widgets are themable. For instance, menus or listboxes are not supported so far.

self.style = Style()
self.style.theme_use("default")

We apply a theme for our widgets. Some of the supported themes are clam,
default, alt, or classic.

quitButton = Button(self, text="Quit",
    command=self.quit)

We create an instance of the Button widget. The parent of this
button is the Frame container. We provide a label for the button
and a command. The command specifies a method that is called when we press
the button. In our case the quit() method is called, which
terminates the application.

quitButton.place(x=50, y=50)

We use the place geometry manager to position the button
in absolute coordinates—50x50px from the top-left corner of the window.

![quitbutton.png](images/quitbutton.png)

Figure: Quit button

## Source

[Tkinter documentation](https://docs.python.org/3/library/tkinter.html)

This section was an introduction to the Tkinter toolkit.

[Contents](..)
[Next](../layout/)