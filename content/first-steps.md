+++
title = "First Steps"
date = 2025-08-29T20:15:53.433+01:00
draft = false
description = "In this part of the wxPython tutorial, we create our first small applications in wxPython."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../menustoolbars/)

# First Steps

last modified January 10, 2023

In this part of the wxPython tutorial, we will create some simple examples.

## Simple example

We start with a very simple example. Our first script will only show 
a small window. 

It will not do much. We will analyse the script line by line. 

simple.py
  

#!/usr/bin/env python
 
# simple.py

import wx

app = wx.App()

frame = wx.Frame(None, title='Simple application')
frame.Show()

app.MainLoop()

This is our first example in wxPython. 

#!/usr/bin/env python

# simple.py

The first line is a she-bang followed by the path to a Python interpreter. 
The second line is a magic comment which specifies the encoding of the source
code. The fourth line is a comment which provides a name for the script.

import wx

This line imports the basic wxPython modules. Namely the core, 
controls, gdi, misc, and windows. Technically, wx is a namespace. 
All functions and objects from the basic modules will start with a 
wx. prefix. The next line of code will create an application object.

app = wx.App()

Each wxPython program must have one application object. 

frame = wx.Frame(None, title='Simple application')
frame.Show()

Here we create a wx.Frame object. A wx.Frame widget is 
an important container widget. We will analyse this widget in  detail later.
The wx.Frame widget is a parent widget for other widgets. It has no 
parent itself. If we specify None for a parent parameter we indicate 
that our widget has no parents. It is a top widget in the hierarchy 
of widgets. After we create the wx.Frame widget, we must call the 
Show() method to actually display it on the screen.

app.MainLoop()

The last line enters the mainloop. The mainloop is an endless cycle. 
It catches and dispatches all events that exist during the life of 
our application.

This was a very simplistic example. Despite this simplicity we can do 
quite a lot with this window. We can resize the window, maximise it, 
minimise it. This functionality requires a lot of coding. All this is 
hidden and provided by default by the wxPython toolkit. There is no 
reason for reinventing the wheel.

![simple.png](images/simple.png)

Figure: Simple example

## wx.Frame

wx.Frame widget is one of the most important widgets in wxPython. It is a 
container widget. It means that it can contain other widgets. Actually it 
can contain any window that is not a frame or dialog. wx.Frame consists of 
a title bar, borders and a central container area. The title bar and borders 
are optional. They can be removed by various flags. 

wx.Frame has the following constructor: 

wx.Frame(wx.Window parent, int id=-1, string title='', wx.Point pos=wx.DefaultPosition, 
    wx.Size size=wx.DefaultSize, style=wx.DEFAULT_FRAME_STYLE, string name="frame")

The constructor has seven parameters. The first parameter does not have a default value. 
The other six parameters do have. Those four parameters are optional. The first three 
are mandatory.

wx.DEFAULT_FRAME_STYLE is a set of default flags:
wx.MINIMIZE_BOX | wx.MAXIMIZE_BOX | wx.RESIZE_BORDER 
wx.SYSTEM_MENU | wx.CAPTION | wx.CLOSE_BOX | 
wx.CLIP_CHILDREN. By combining various styles we can change the style 
of the wx.Frame widget. 

no_minimize.py
  

#!/usr/bin/env python
 
# no_minimize.py

import wx

app = wx.App()
frame = wx.Frame(None, style=wx.MAXIMIZE_BOX | wx.RESIZE_BORDER
	| wx.SYSTEM_MENU | wx.CAPTION |	 wx.CLOSE_BOX)
frame.Show(True)

app.MainLoop()

Our intention was to display a window without a minimise box. So we
did not specify this flag in the style parameter. 

## Size and Position

We can specify the size of our application in two ways. We have a size 
parameter in the constructor of our widget or we can call the 
SetSize() method. 

set_size.py
  

#!/usr/bin/env python

# set_size.py

import wx

class Example(wx.Frame):

    def __init__(self, parent, title):
        super(Example, self).__init__(parent, title=title,
            size=(350, 250))

def main():

    app = wx.App()
    ex = Example(None, title='Sizing')
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In this example, the application will be 250x200 px in size.

def __init__(self, parent, title):
    super(Example, self).__init__(parent, title=title, 
        size=(350, 250))

In the constructor we set the width of the wx.Frame widget to 350 px. 
The height of the widget to 250 px. 

Similarly, we can position our application on the screen. By default the 
window is placed in the upper left corner of the 
screen. But it can differ on various OS platforms or even window managers. 
Some window managers place application windows themselves. Some of them 
do some optimisation, so that windows do not overlap. A programmer can 
position the window programmatically. We already saw a pos parameter
in the constructor of our wx.Frame widget. By providing other than the 
default values, we can control the position ourselves. 

Method
Description

Move(wx.Point point)move a window to the given position

MoveXY(int x, int y)
move a window to the given position

SetPosition(wx.Point point)set the position of a window

SetDimensions(x, y, width, height, sizeFlags)
set 
the position and the size of a window

There are several methods to do this. 

moving.py
  

#!/usr/bin/env python

# moving.py

import wx

class Example(wx.Frame):

    def __init__(self, parent, title):
        super(Example, self).__init__(parent, title=title,
            size=(300, 200))

        self.Move((800, 250))

def  main():

    app = wx.App()
    ex = Example(None, title='Moving')
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

There is one particular situation. We might want to display our window maximised. 
In this case, the window is positioned at (0, 0) and takes the whole screen. 
wxPython internally calculates the screen coordinates. To maximise our 
wx.Frame, we call the Maximize() method.

## Centering on the screen

If we want to center our application on the screen, wxPython has a handy method. 
The Centre() method simply centers the window on the screen. No need to 
calculate the width and the height of the screen. Simply call the method. 

centering.py
  

#!/usr/bin/env python

# centering.py

import wx

class Example(wx.Frame):

    def __init__(self, parent, title):
        super(Example, self).__init__(parent, title=title,
            size=(300, 200))

        self.Centre()

def main():

    app = wx.App()
    ex = Example(None, title='Centering')
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In this example, we center a small window on the screen.

self.Centre()

The Centre() method centers the window on the screen.

In this chapter, we have created some simple code examples in wxPython.

[Contents](..)
[Previous](../introduction/)
[Next](../menustoolbars/)