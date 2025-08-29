+++
title = "Pango II"
date = 2025-08-29T19:56:59.462+01:00
draft = false
description = "This part of PyGTK tutorial continues covering Pango library."
image = "images/sine.png"
imageBig = "images/sine.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../pango/)
[Next](../drawing/)

# Pango II

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we continue exploring the Pango library.

## Animated text

The following example shows animated text on window.   

animation.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows animated text
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import glib
import pango
import math

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        glib.timeout_add(160, self.on_timer)
        
        self.count = 1
        
        self.set_border_width(10)
        self.set_title("ZetCode")
        
        self.label = gtk.Label("ZetCode")
      
        fontdesc = pango.FontDescription("Serif Bold 30")
        self.label.modify_font(fontdesc)

        vbox = gtk.VBox(False, 0)
        vbox.add(self.label)
        
        self.add(vbox)
        self.set_size_request(300, 250)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()
        
    def on_timer(self):
        attr = pango.AttrList()
        self.count = self.count + 1
                 
        for i in range(7):
            r = pango.AttrRise(int(math.sin(self.count+i)*20)*pango.SCALE, i, i+1)
            attr.insert(r)
                        
        self.label.set_attributes(attr)
        return True
        
         
PyApp()
gtk.main()

In the above code example, we have a text in a label widget.
By continuously changing its pango attributes, the text is being
animated.

self.label = gtk.Label("ZetCode")
     
fontdesc = pango.FontDescription("Serif Bold 30")
self.label.modify_font(fontdesc)

We create a label widget and modify its font.
We choose a bit larger text for better visibility.

vbox = gtk.VBox(False, 0)
vbox.add(self.label)

We put the label into the vertical box. This centers 
the label on the window.

The animation is performed inside the on_timer
method.

for i in range(7):
    r = pango.AttrRise(int(math.sin(self.count+i)*20)*pango.SCALE, i, i+1)
    attr.insert(r)

We have seven characters in our text. We periodically change the pango
AttrRise attribute for each character. The
rise is based on the trigonometric sine function. The text movement
follows the sine function graphed on the cartesian graph.

Also notice the pango.SCALE constant. The pango
library has its own units. They differ from what is used by the widgets
to draw graphics or text. We must multiply our numbers by this constant.

![sine.png](images/sine.png)

Figure: Animated text

## Using markup language

We can change the attributes of the text using the
built-in markup language. 

markup.py
  

 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example uses markup language
# to change attributes of the text
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

quote = "&lt;span foreground='blue' size='19000'&gt;The only victory over love is flight&lt;/span&gt;"

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Markup")
        self.set_border_width(5)
        self.connect("destroy", gtk.main_quit)
        
        label = gtk.Label()
        label.set_markup(quote)

        vbox = gtk.VBox(False, 0)
        vbox.add(label)
   
        self.add(vbox)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

PyApp()
gtk.main()

In the code example, we have a label. We change the its text
attributes with the markup language.

quote = "&lt;span foreground='blue' size='19000'&gt;The only victory over love is flight&lt;/span&gt;"

This is the text with the markup language. 

label = gtk.Label()
label.set_markup(quote)

We create a label widget and set a markup text for it.

![markup.png](images/markup.png)

Figure: Using markup

## Pango layout

Pango layout is an object representing a paragraph of text with attributes. 

layout.py
  

 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows pango Layout
# in action
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

lyrics = """Meet you downstairs in the bar and heard
your rolled up sleeves and your skull t-shirt
You say why did you do it with him today?
and sniff me out like I was Tanqueray

cause you're my fella, my guy
hand me your stella and fly
by the time I'm out the door
you tear men down like Roger Moore

I cheated myself
like I knew I would
I told ya, I was trouble
you know that I'm no good"""

class Area(gtk.DrawingArea):
    def __init__(self):
        super(Area, self).__init__()
        self.modify_bg(gtk.STATE_NORMAL, gtk.gdk.Color(16400, 16400, 16440))
        self.connect("expose_event", self.expose)

    def expose(self, widget, event):
        
        gc = self.get_style().fg_gc[gtk.STATE_NORMAL]
        font_desc = pango.FontDescription('Sans 10')
        
        layout = self.create_pango_layout(lyrics)
        width, height = self.get_size_request()
        
        attr = pango.AttrList()
        
        fg_color = pango.AttrForeground(60535, 60535, 60535, 0, -1)
        attr.insert(fg_color)
        
        layout.set_width(pango.SCALE * self.allocation.width)
        layout.set_spacing(pango.SCALE * 3)
        layout.set_alignment(pango.ALIGN_CENTER)
        layout.set_font_description(font_desc)
        layout.set_attributes(attr)
        
        self.window.draw_layout(gc, 0, 5, layout)
        
        

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("You know I'm no Good")
        
        self.add(Area())
        self.set_size_request(300, 300)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

PyApp()
gtk.main()

In the previous examples, we were modifying text in existing 
widgets. Now we are going to draw the text using the pango 
layout on the DrawingArea widget. 
We be drawing using the Gdk drawing tools.

gc = self.get_style().fg_gc[gtk.STATE_NORMAL]

We get the graphics contex of the drawing area widget. 

layout = self.create_pango_layout(lyrics)

Here create the pango layout object. 

layout.set_width(pango.SCALE * self.allocation.width)
layout.set_spacing(pango.SCALE * 3)
layout.set_alignment(pango.ALIGN_CENTER)
layout.set_font_description(font_desc)
layout.set_attributes(attr)

We modify layout's width, spacing, alignment, font and set text attributes. 

self.window.draw_layout(gc, 0, 5, layout)

The layout is being drawn on the window.

![layout.png](images/layout.png)

Figure: Layout

In this chapter of the PyGTK programming library, we further worked with
pango library.

[Contents](..) 
[Previous](../pango/)
[Next](../drawing/)