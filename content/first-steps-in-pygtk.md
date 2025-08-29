+++
title = "First steps in PyGTK"
date = 2025-08-29T19:56:56.778+01:00
draft = false
description = "In this part of the PyGTK tutorial, we do some basic first steps in PyGTK."
image = "images/icon.png"
imageBig = "images/icon.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../layout/)

# First steps in PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we do our first 
steps in programming. We create simple programs. 

## Simple example

The first code example is a very simple one. 

center.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This is a trivial PyGTK example
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        self.set_size_request(250, 150)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show()

PyApp()
gtk.main()

This code shows a centered window.

import gtk

We import the gtk module. Here we have objects to 
create GUI applications.

class PyApp(gtk.Window):

Our application is based on the PyApp class. It inherits from 
the Window.

def __init__(self):
    super(PyApp, self).__init__()

This is the constructor. It builds our application. It also calls
its parent constructor through the super call.

self.connect("destroy", gtk.main_quit)

We connect the destroy signal to the main_quit function.
The destroy signal is called when we click on the close
button in the titlebar or press Alt+F4. The window is being destroyed, but
the application is not. You can see it if you launch the example from the command line.
By calling the main_quit we quit the application for good. 

self.set_size_request(250, 150)

We set the size of the window to 250x150px.

self.set_position(gtk.WIN_POS_CENTER)

This line centers the window on the screen. 

self.show()

Now we show the window. The window is not visible, until we call the 
show method. 

PyApp()
gtk.main()

We create the instance of our program and start the main loop.

## Icon

In the next example, we show the application icon. Most window managers 
display the icon in the left corner of the titlebar and also on the taskbar.

icon.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows an icon
# in the titlebar of the window 
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk, sys

class PyApp(gtk.Window):
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Icon")
        self.set_size_request(250, 150)
        self.set_position(gtk.WIN_POS_CENTER)

        try:
            self.set_icon_from_file("web.png")
        except Exception, e:
            print e.message
            sys.exit(1)

        self.connect("destroy", gtk.main_quit)

        self.show()

PyApp()
gtk.main()

The code example shows the application icon. 

self.set_title("Icon")

We set a title for the window.

self.set_icon_from_file("web.png")

The set_icon_from_file method sets an icon for the window.
The image is loaded from disk in the current working directory. 

![icon.png](images/icon.png)

Figure: Icon

## Buttons

In the next example, we further enhance our programming skills with 
the PyGTK library.

buttons.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows four buttons
# in various modes 
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Buttons")
        self.set_size_request(250, 200)
        self.set_position(gtk.WIN_POS_CENTER)
        
        btn1 = gtk.Button("Button")
        btn1.set_sensitive(False)
        btn2 = gtk.Button("Button")
        btn3 = gtk.Button(stock=gtk.STOCK_CLOSE)
        btn4 = gtk.Button("Button")
        btn4.set_size_request(80, 40)

        fixed = gtk.Fixed()

        fixed.put(btn1, 20, 30)
        fixed.put(btn2, 100, 30)
        fixed.put(btn3, 20, 80)
        fixed.put(btn4, 100, 80)
        
        self.connect("destroy", gtk.main_quit)
        
        self.add(fixed)
        self.show_all()

PyApp()
gtk.main()

We show four different buttons on the window. We see a difference 
between container widgets and child widgets and will change some properties 
of child widgets. 

btn1 = gtk.Button("Button")

A Button is a child widget. Child widgets are placed inside
containers. 

btn1.set_sensitive(False)

We make this button insensitive. This means, we cannot click on it. 
Nor it can be selected, focused etc.
Graphically the widget is grayed out.

btn3 = gtk.Button(stock=gtk.STOCK_CLOSE)

The third button shows an image inside its area. The PyGTK library
has a built-in stock of images that we can use. 

btn4.set_size_request(80, 40)

Here we change the size of the button. 

fixed = gtk.Fixed()

Fixed widget is a non visible container widget. 
Its purpose is to contain other child widgets. 

fixed.put(btn1, 20, 30)
fixed.put(btn2, 100, 30)
...

Here we place button widgets inside fixed container widget. 

self.add(fixed)

We set the Fixed container to be the main container for 
our Window widget. 

self.show_all()

We can either call show_all method, or 
we call show
method on each of the widgets. Including containers. 

![buttons.png](images/buttons.png)

Figure: Buttons

## Tooltip

A tooltip is a hint on a widget in the applications. Can be used
to provide additional help.

tooltips.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This code shows a tooltip on 
# a window and a button
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()
      
        self.set_title("Tooltips")
        self.set_size_request(250, 200)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        self.fixed = gtk.Fixed()
        self.add(self.fixed)
       
        button = gtk.Button("Button")
        button.set_size_request(80, 35)      
  
        self.fixed.put(button, 50, 50)
      
        self.set_tooltip_text("Window widget")
        button.set_tooltip_text("Button widget")

        self.show_all()

PyApp()
gtk.main()

In this example we set a tooltip for a window and for a
button.

self.set_tooltip_text("Window widget")
button.set_tooltip_text("Button widget")

The set_tooltip_text does the job.

![tooltips.png](images/tooltips.png)

Figure: Tooltips

In this chapter, we created first programs in PyGTK programming library. 

[Contents](..)
[Previous](../introduction/)
[Next](../layout/)