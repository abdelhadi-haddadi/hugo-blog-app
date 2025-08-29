+++
title = "Layout management in PyGTK"
date = 2025-08-29T19:56:58.103+01:00
draft = false
description = "This part of the PyGTK tutorial covers layout management."
image = "images/fixed.png"
imageBig = "images/fixed.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firststeps/)
[Next](../menus/)

# Layout management in PyGTK

last modified October 18, 2023

In this chapter of the PyGTK tutorial, we show how to lay out 
our widgets in windows or dialogs. 

When we design the GUI of our application, we decide what widgets we 
use and how we organise those widgets in the application. To organise 
our widgets, we use specialised non visible widgets called 
*layout containers*. In this chapter, we mention Alignment,
Fixed, VBox and Table.

## Fixed

The Fixed container places child widgets at fixed positions 
and with fixed sizes. This container performs no automatic layout management. 
In most applications, we do not use this container. There are some specialised 
areas, where we use it. For example games, specialised applications that work 
with diagrams, resizable components that can be moved (like a chart in a 
spreadsheet application), small educational examples.

fixed.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example demonstrates a Fixed
# container widget
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import sys

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Fixed")
        self.set_size_request(300, 280)
        self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(6400, 6400, 6440))
        self.set_position(gtk.WIN_POS_CENTER)

        try:
            self.bardejov = gtk.gdk.pixbuf_new_from_file("bardejov.jpg")
            self.rotunda = gtk.gdk.pixbuf_new_from_file("rotunda.jpg")
            self.mincol = gtk.gdk.pixbuf_new_from_file("mincol.jpg")
        except Exception, e:
            print e.message
            sys.exit(1)
        
        
        image1 = gtk.Image()
        image2 = gtk.Image()
        image3 = gtk.Image()
        
        image1.set_from_pixbuf(self.bardejov)
        image2.set_from_pixbuf(self.rotunda)
        image3.set_from_pixbuf(self.mincol)
               
        fix = gtk.Fixed()
           
        fix.put(image1, 20, 20)
        fix.put(image2, 40, 160)
        fix.put(image3, 170, 50)

        self.add(fix)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        

PyApp()
gtk.main()

In our example, we show three small images on the window. We explicitly specify 
the x, y coordinates, where we place these images. 

self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(6400, 6400, 6440))

For better visual experience, we change the background colour to dark gray. 

self.bardejov = gtk.gdk.pixbuf_new_from_file("bardejov.jpg")

We load the image from a file on the disk.

image1 = gtk.Image()
image2 = gtk.Image()
image3 = gtk.Image()
       
image1.set_from_pixbuf(self.bardejov)
image2.set_from_pixbuf(self.rotunda)
image3.set_from_pixbuf(self.mincol)

The Image is a widget that is used to display
images. It takes a Pixbuf object in the constructor. 

fix = gtk.Fixed()

We create the Fixed container. 

fix.put(image1, 20, 20)

We place the first image at x=20, y=20 coordinates. 

self.add(fix)

Finally, we add the Fixed container to the Window. 

![fixed.png](images/fixed.png)

Figure: Fixed

## Alignment

The Alignment container controls the alignment 
and the size of its child widget. 

alignment.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to use
# the Alignment widget
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Alignment")
        self.set_size_request(260, 150)
        self.set_position(gtk.WIN_POS_CENTER)

        vbox = gtk.VBox(False, 5)
        hbox = gtk.HBox(True, 3)
        
        valign = gtk.Alignment(0, 1, 0, 0)
        vbox.pack_start(valign)
        
        ok = gtk.Button("OK")
        ok.set_size_request(70, 30)
        close = gtk.Button("Close")
        
        hbox.add(ok)
        hbox.add(close)
        
        halign = gtk.Alignment(1, 0, 0, 0)
        halign.add(hbox)
        
        vbox.pack_start(halign, False, False, 3)

        self.add(vbox)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        

PyApp()
gtk.main()

In the code example, we place two buttons into the right 
bottom corner of the window. To accomplish this, we use one horizontal 
box and one vertical box and two alignment containers. 

valign = gtk.Alignment(0, 1, 0, 0)

This will put the child widget to the bottom. 

vbox.pack_start(valign)

Here we place the Alignment widget into 
the vertical box.

hbox = gtk.HBox(True, 3)
...
ok = gtk.Button("OK")
ok.set_size_request(70, 30)
close = gtk.Button("Close")

hbox.add(ok)
hbox.add(close)

We create a horizontal box and put two buttons inside it. 

halign = gtk.Alignment(1, 0, 0, 0)
halign.add(hbox)
       
vbox.pack_start(halign, False, False, 3)

This will create an alignment container that will place its child widget 
to the right. We add the horizontal box into the alignment container and 
pack the alignment container into the vertical box. We must keep in mind 
that the alignment container takes only one child widget. That's why we 
must use boxes. 

![alignment.png](images/alignment.png)

Figure: Alignment

## Table

The Table widget arranges widgets in 
rows and columns. 

calculator.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to use
# the Table container widget
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Calculator")
        self.set_size_request(250, 230)
        self.set_position(gtk.WIN_POS_CENTER)

        vbox = gtk.VBox(False, 2)
        
        mb = gtk.MenuBar()
        filemenu = gtk.Menu()
        filem = gtk.MenuItem("File")
        filem.set_submenu(filemenu)
        mb.append(filem)

        vbox.pack_start(mb, False, False, 0)

        table = gtk.Table(5, 4, True)

        table.attach(gtk.Button("Cls"), 0, 1, 0, 1)
        table.attach(gtk.Button("Bck"), 1, 2, 0, 1)
        table.attach(gtk.Label(), 2, 3, 0, 1)
        table.attach(gtk.Button("Close"), 3, 4, 0, 1)

        table.attach(gtk.Button("7"), 0, 1, 1, 2)
        table.attach(gtk.Button("8"), 1, 2, 1, 2)
        table.attach(gtk.Button("9"), 2, 3, 1, 2)
        table.attach(gtk.Button("/"), 3, 4, 1, 2)

        table.attach(gtk.Button("4"), 0, 1, 2, 3)
        table.attach(gtk.Button("5"), 1, 2, 2, 3)
        table.attach(gtk.Button("6"), 2, 3, 2, 3)
        table.attach(gtk.Button("*"), 3, 4, 2, 3)

        table.attach(gtk.Button("1"), 0, 1, 3, 4)
        table.attach(gtk.Button("2"), 1, 2, 3, 4)
        table.attach(gtk.Button("3"), 2, 3, 3, 4)
        table.attach(gtk.Button("-"), 3, 4, 3, 4)

        table.attach(gtk.Button("0"), 0, 1, 4, 5)
        table.attach(gtk.Button("."), 1, 2, 4, 5)
        table.attach(gtk.Button("="), 2, 3, 4, 5)
        table.attach(gtk.Button("+"), 3, 4, 4, 5)

        vbox.pack_start(gtk.Entry(), False, False, 0)
        vbox.pack_end(table, True, True, 0)

        self.add(vbox)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        

PyApp()
gtk.main()

We use the Table widget to create a calculator skeleton.

table = gtk.Table(5, 4, True)

We create a table widget with 5 rows and 4 columns. The third parameter
is the homogeneous parameter. If set to true, all the widgets in the table
are of same size. The size of all widgets is equal to the largest 
widget in the table container. 

table.attach(gtk.Button("Cls"), 0, 1, 0, 1)

We attach a button to the table container. To the top-left cell of the table. 
The first two parameters are the left and right sides of the cell, the last two
parameters are the top and bottom sides of the cell. 

vbox.pack_end(table, True, True, 0)

We pack the table widget into the vertical box. 

![calculator.png](images/calculator.png)

Figure: Calculator skeleton

## Windows

Next we create a more advanced example. We show a window 
that can be found in the JDeveloper IDE. 

windows.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This is a more complicated layout
# example
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import sys

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Windows")
        self.set_size_request(300, 250)
        self.set_border_width(8)
        self.set_position(gtk.WIN_POS_CENTER)

        table = gtk.Table(8, 4, False)
        table.set_col_spacings(3)

        title = gtk.Label("Windows")

        halign = gtk.Alignment(0, 0, 0, 0)
        halign.add(title)
        
        table.attach(halign, 0, 1, 0, 1, gtk.FILL, 
            gtk.FILL, 0, 0);

        wins = gtk.TextView()
        wins.set_editable(False)
        wins.modify_fg(gtk.STATE_NORMAL, gtk.gdk.Color(5140, 5140, 5140))
        wins.set_cursor_visible(False)
        table.attach(wins, 0, 2, 1, 3, gtk.FILL | gtk.EXPAND,
            gtk.FILL | gtk.EXPAND, 1, 1)

        activate = gtk.Button("Activate")
        activate.set_size_request(50, 30)
        table.attach(activate, 3, 4, 1, 2, gtk.FILL, 
            gtk.SHRINK, 1, 1)
        
        valign = gtk.Alignment(0, 0, 0, 0)
        close = gtk.Button("Close")
        close.set_size_request(70, 30)
        valign.add(close)
        table.set_row_spacing(1, 3)
        table.attach(valign, 3, 4, 2, 3, gtk.FILL,
            gtk.FILL | gtk.EXPAND, 1, 1)
            
        halign2 = gtk.Alignment(0, 1, 0, 0)
        help = gtk.Button("Help")
        help.set_size_request(70, 30)
        halign2.add(help)
        table.set_row_spacing(3, 6)
        table.attach(halign2, 0, 1, 4, 5, gtk.FILL, 
            gtk.FILL, 0, 0)
        
        ok = gtk.Button("OK")
        ok.set_size_request(70, 30)
        table.attach(ok, 3, 4, 4, 5, gtk.FILL, 
            gtk.FILL, 0, 0);
                          
        self.add(table)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        

PyApp()
gtk.main()

The code example shows, how we can create a similar window in PyGTK. 

table = gtk.Table(8, 4, False)
table.set_col_spacings(3)

The example is based on the Table container. There will
be 3 px space between columns. 

title = gtk.Label("Windows")

halign = gtk.Alignment(0, 0, 0, 0)
halign.add(title)
       
table.attach(halign, 0, 1, 0, 1, gtk.FILL, 
    gtk.FILL, 0, 0);

This code creates a label that is aligned to the left. 
The label is placed in the first row of the Table container.

wins = gtk.TextView()
wins.set_editable(False)
wins.modify_fg(gtk.STATE_NORMAL, gtk.gdk.Color(5140, 5140, 5140))
wins.set_cursor_visible(False)
table.attach(wins, 0, 2, 1, 3, gtk.FILL | gtk.EXPAND,
    gtk.FILL | gtk.EXPAND, 1, 1)

The text view widget spans two rows and two columns. We make the widget 
non editable and hide the cursor. 

valign = gtk.Alignment(0, 0, 0, 0)
close = gtk.Button("Close")
close.set_size_request(70, 30)
valign.add(close)
table.set_row_spacing(1, 3)
table.attach(valign, 3, 4, 2, 3, gtk.FILL,
    gtk.FILL | gtk.EXPAND, 1, 1)

We put the close button next to the text view widget into the fourth column. 
(we count from zero) We add the button into the alignment widget, 
so that we can align it to the top. 

![windows.png](images/windows.png)

Figure: Windows

This chapter of the PyGTK programming tutorial was about layout management.

[Contents](..) 
[Previous](../firststeps/)
[Next](../menus/)