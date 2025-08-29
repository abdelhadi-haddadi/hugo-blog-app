+++
title = "Toolbars in PyGTK"
date = 2025-08-29T19:57:00.573+01:00
draft = false
description = "In this part of the PyGTK tutorial we cover toolbars."
image = "images/toolbar.png"
imageBig = "images/toolbar.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menus/)
[Next](../signals/)

# Toolbars in PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we work with toolbars.

Menus group commands that we can use in application. 
Toolbars provide a quick access to the most frequently used commands. 

## Simple toolbar

Next we create a simple toolbar. 

toolbar.py
  

 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows a toolbar
# widget
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Toolbar")
        self.set_size_request(250, 200)
        self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(6400, 6400, 6440))
        self.set_position(gtk.WIN_POS_CENTER)

        toolbar = gtk.Toolbar()
        toolbar.set_style(gtk.TOOLBAR_ICONS)

        newtb = gtk.ToolButton(gtk.STOCK_NEW)
        opentb = gtk.ToolButton(gtk.STOCK_OPEN)
        savetb = gtk.ToolButton(gtk.STOCK_SAVE)
        sep = gtk.SeparatorToolItem()
        quittb = gtk.ToolButton(gtk.STOCK_QUIT)

        toolbar.insert(newtb, 0)
        toolbar.insert(opentb, 1)
        toolbar.insert(savetb, 2)
        toolbar.insert(sep, 3)
        toolbar.insert(quittb, 4)
        
        quittb.connect("clicked", gtk.main_quit)

        vbox = gtk.VBox(False, 2)
        vbox.pack_start(toolbar, False, False, 0)

        self.add(vbox)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        
       
PyApp()
gtk.main()

The example shows a toolbar and four tool buttons. 

toolbar = gtk.Toolbar()

A Toolbar widget is created. 

toolbar.set_style(gtk.TOOLBAR_ICONS)

On toolbar, we show only icons. No text. 

newtb = gtk.ToolButton(gtk.STOCK_NEW)

A ToolButton with an image from
stock is created. 

sep = gtk.SeparatorToolItem()

This is a separator. It can be used to group toolbar buttons
into logical groups. 

toolbar.insert(newtb, 0)
toolbar.insert(opentb, 1)
...

Toolbar buttons are inserted into the toolbar widget. 

![toolbar.png](images/toolbar.png)

Figure: Toolbar

## Toolbars

In the second example, we show two toolbars. Many applications 
have more than one toolbar. We show, how we can do it in PyGTK. 

toolbars.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows two toolbars
# in the application window
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Toolbars")
        self.set_size_request(350, 300)
        self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(6400, 6400, 6440))
        self.set_position(gtk.WIN_POS_CENTER)

        upper = gtk.Toolbar()
        upper.set_style(gtk.TOOLBAR_ICONS)

        newtb = gtk.ToolButton(gtk.STOCK_NEW)
        opentb = gtk.ToolButton(gtk.STOCK_OPEN)
        savetb = gtk.ToolButton(gtk.STOCK_SAVE)

        upper.insert(newtb, 0)
        upper.insert(opentb, 1)
        upper.insert(savetb, 2)

        lower = gtk.Toolbar()
        lower.set_style(gtk.TOOLBAR_ICONS)

        quittb = gtk.ToolButton(gtk.STOCK_QUIT)
        quittb.connect("clicked", gtk.main_quit)
        lower.insert(quittb, 0)
         
        vbox = gtk.VBox(False, 0)
        vbox.pack_start(upper, False, False, 0)
        vbox.pack_start(lower, False, False, 0)

        self.add(vbox)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        
       
PyApp()
gtk.main()

Our applications shows two toolbars. 

upper = gtk.Toolbar()
...
lower = gtk.Toolbar()

We create two Toolbar widgets. 

upper.insert(newtb, 0)
...
lower.insert(quittb, 0)

Each of them has its own tool buttons. 

vbox = gtk.VBox(False, 0)
vbox.pack_start(upper, False, False, 0)
vbox.pack_start(lower, False, False, 0)

Toolbars are packed into the vertical box, one after the other. 

![toolbars.png](images/toolbars.png)

Figure: Toolbars

## Undo redo

The following example demonstrates, how we can inactivate toolbar buttons on the toolbar.
It is a common practise in GUI programming. For example the save button.
If we save all changes of our document to the disk, the save button is inactivated 
in most text editors. This way the application indicates to the user, 
that all changes are already saved. 

undoredo.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to 
# activate/deactivate a ToolButton
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Toolbar")
        self.set_size_request(250, 200)
        self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(6400, 6400, 6440))
        self.set_position(gtk.WIN_POS_CENTER)
        
        self.count = 2

        toolbar = gtk.Toolbar()
        toolbar.set_style(gtk.TOOLBAR_ICONS)

        self.undo = gtk.ToolButton(gtk.STOCK_UNDO)
        self.redo = gtk.ToolButton(gtk.STOCK_REDO)
        sep = gtk.SeparatorToolItem()
        quit = gtk.ToolButton(gtk.STOCK_QUIT)

        toolbar.insert(self.undo, 0)
        toolbar.insert(self.redo, 1)
        toolbar.insert(sep, 2)
        toolbar.insert(quit, 3)
        
        self.undo.connect("clicked", self.on_undo)
        self.redo.connect("clicked", self.on_redo)
        quit.connect("clicked", gtk.main_quit)

        vbox = gtk.VBox(False, 2)
        vbox.pack_start(toolbar, False, False, 0)

        self.add(vbox)

        self.connect("destroy", gtk.main_quit)
        self.show_all()
        
    def on_undo(self, widget):
        self.count = self.count - 1

        if self.count &lt;= 0:
            self.undo.set_sensitive(False)
            self.redo.set_sensitive(True)

    def on_redo(self, widget):
        self.count = self.count + 1

        if self.count &gt;= 5: 
            self.redo.set_sensitive(False)
            self.undo.set_sensitive(True)
       
PyApp()
gtk.main()

Our example creates undo and redo buttons from the PyGTK stock resources. 
After several clicks each of the buttons is inactivated. The buttons are grayed out.  

self.count = 2

The self.count variable decides, which button is activated and
deactivated. 

self.undo = gtk.ToolButton(gtk.STOCK_UNDO)
self.redo = gtk.ToolButton(gtk.STOCK_REDO)

We have two tool buttons. Undo and redo tool buttons. Images come from the stock
resources. 

self.undo.connect("clicked", self.on_undo)
self.redo.connect("clicked", self.on_redo)

We plug a method for the clicked signal for both tool buttons. 

if self.count &lt;= 0:
    self.undo.set_sensitive(False)
    self.redo.set_sensitive(True)

To activate a widget, we use the set_sensitive 
method.

![undoredo.png](images/undoredo.png)

Figure: Undo redo

In this chapter of the PyGTK programming library, we mentioned toolbars. 

[Contents](..)
[Previous](../menus/)
[Next](../signals/)