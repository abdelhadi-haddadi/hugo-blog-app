+++
title = "Drawing with Cairo in PyGTK"
date = 2025-08-29T19:56:55.546+01:00
draft = false
description = "In this part of the PyGTK tutorial, we perform drawing with Cairo."
image = "images/simpledrawing.png"
imageBig = "images/simpledrawing.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../pangoII/)
[Next](../drawingII/)

# Drawing with Cairo in PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, 
we do some drawing with the Cairo library.

*Cairo* is a library for creating 2D vector graphics. 
We can use it to draw our own widgets, charts, and various 
effects or animations. 

## Simple drawing

The stroke operation draws the outlines of shapes and the 
fill operation fills the insides of shapes. Next we demonstrate
these two operations.

simpledrawing.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This code example draws a circle
# using the cairo library
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import math

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Simple drawing")
        self.resize(230, 150)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        darea = gtk.DrawingArea()
        darea.connect("expose-event", self.expose)
        self.add(darea)

        self.show_all()
    
    def expose(self, widget, event):

        cr = widget.window.cairo_create()

        cr.set_line_width(9)
        cr.set_source_rgb(0.7, 0.2, 0.0)
                
        w = self.allocation.width
        h = self.allocation.height

        cr.translate(w/2, h/2)
        cr.arc(0, 0, 50, 0, 2*math.pi)
        cr.stroke_preserve()
        
        cr.set_source_rgb(0.3, 0.4, 0.6)
        cr.fill()
    

PyApp()
gtk.main()

In our example, we draw a circle and will it with a solid colour. 

darea = gtk.DrawingArea()

We be doing our drawing operations on the DrawingArea 
widget. 

darea.connect("expose-event", self.expose)

We do all drawing in a methods that is a handler for the
expose-event signal. 

cr = widget.window.cairo_create()

We create the cairo context object from the
gdk.Window of the drawing area. The context is an
object that is used to draw on all Drawable objects. 

cr.set_line_width(9)

We set the width of the line to 9 pixels.

cr.set_source_rgb(0.7, 0.2, 0.0)

We set the colour to dark red. 

w = self.allocation.width
h = self.allocation.height

cr.translate(w/2, h/2)

We get the width and height of the drawing area. 
We move the origin into the middle of the window. 

cr.arc(0, 0, 50, 0, 2*math.pi)
cr.stroke_preserve()

We draw the outside shape of a circle. In red colour. The stroke_preserve 
strokes the current path according to the current line width, line join, line cap,
and dash settings. Unlike the stroke, it preserves the path within the 
cairo context. 

cr.set_source_rgb(0.3, 0.4, 0.6)
cr.fill()

This fills the interior of the circle with some blue colour.

![simpledrawing.png](images/simpledrawing.png)

Figure: Simple drawing

## Basic shapes

The next example draws some basic shapes onto the window. 

basicshapes.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This code example draws basic shapes
# with the cairo library
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import math

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Basic shapes")
        self.set_size_request(390, 240)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        darea = gtk.DrawingArea()
        darea.connect("expose-event", self.expose)
        self.add(darea)
        
        self.show_all()
    
    def expose(self, widget, event):

        cr = widget.window.cairo_create()
        cr.set_source_rgb(0.6, 0.6, 0.6)

        cr.rectangle(20, 20, 120, 80)
        cr.rectangle(180, 20, 80, 80)
        cr.fill()

        cr.arc(330, 60, 40, 0, 2*math.pi)
        cr.fill()
        
        cr.arc(90, 160, 40, math.pi/4, math.pi)
        cr.fill()

        cr.translate(220, 180)
        cr.scale(1, 0.7)
        cr.arc(0, 0, 50, 0, 2*math.pi)
        cr.fill()
    

PyApp()
gtk.main()

In this example, we create a rectangle, a square, a circle, an arc, 
and an ellipse. 

cr.rectangle(20, 20, 120, 80)
cr.rectangle(180, 20, 80, 80)
cr.fill()

These lines draw a rectangle and a square. 

cr.arc(330, 60, 40, 0, 2*math.pi)
cr.fill()

Here the arc method draws a full circle.

cr.scale(1, 0.7)
cr.arc(0, 0, 50, 0, 2*math.pi)
cr.fill()

If we want to draw an oval, we do some scaling first. Here the 
scale method shrinks the y axis.

![basicshapes.png](images/basicshapes.png)

Figure: Basic shapes

## Colors

A colour is an object representing a combination of Red, Green, 
and Blue (RGB) intensity values.
Cairo valid RGB values are in the range 0 to 1. 

colors.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This program shows how to work
# with colors in cairo
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Colors")
        self.resize(360, 100)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        darea = gtk.DrawingArea()
        darea.connect("expose-event", self.expose)
        self.add(darea)
        
        self.show_all()
    
    def expose(self, widget, event):

        cr = widget.window.cairo_create()

        cr.set_source_rgb(0.2, 0.23, 0.9)
        cr.rectangle(10, 15, 90, 60)
        cr.fill()
         
        cr.set_source_rgb(0.9, 0.1, 0.1)
        cr.rectangle(130, 15, 90, 60)
        cr.fill()

        cr.set_source_rgb(0.4, 0.9, 0.4)
        cr.rectangle(250, 15, 90, 60)
        cr.fill()

PyApp()
gtk.main()

We draw three rectangles in three different colours.

cr.set_source_rgb(0.2, 0.23, 0.9)

The set_source_rgb method sets a colour for the 
cairo context. The three parameters of the method are the colour 
intensity values. 

cr.rectangle(10, 15, 90, 60)
cr.fill()

We create a rectangle shape and fill it with the previously specified 
colour. 

![colors.png](images/colors.png)

Figure: Colors

## Transparent rectangles

Transparency is the quality of being able to see through a material. 
The easiest way to understand transparency is to imagine a piece of 
glass or water. Technically, the rays of light can go through the glass 
and this way we can see objects behind the glass.

In computer graphics, we can achieve transparency effects using alpha 
compositing. Alpha compositing is the process of combining an image with 
a background to create the appearance of partial transparency. 
The composition process uses an alpha channel. (wikipedia.org, answers.com)

transparentrectangles.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This program shows transparent
# rectangles using cairo
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Transparent rectangles")
        self.resize(590, 90)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        darea = gtk.DrawingArea()
        darea.connect("expose-event", self.expose)
        self.add(darea)
        
        self.show_all()
    
    def expose(self, widget, event):

        cr = widget.window.cairo_create()

        for i in range(1, 11):
            cr.set_source_rgba(0, 0, 1, i*0.1)
            cr.rectangle(50*i, 20, 40, 40)
            cr.fill()

PyApp()
gtk.main()

In the example we draw ten rectangles with different levels of transparency. 

cr.set_source_rgba(0, 0, 1, i*0.1)

The last parameter of the set_source_rgba method is the
alpha transparency.

![transparency.png](images/transparency.png)

Figure: Transparent rectangles

## Soulmate

In the next example, we draw some text on the window. 

soulmate.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This program draws text
# using cairo
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import cairo

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Soulmate")
        self.set_size_request(370, 240)
        self.set_position(gtk.WIN_POS_CENTER)

        self.connect("destroy", gtk.main_quit)

        darea = gtk.DrawingArea()
        darea.connect("expose-event", self.expose)
        self.add(darea)
        
        self.show_all()
    
    def expose(self, widget, event):

        cr = widget.window.cairo_create()

        cr.set_source_rgb(0.1, 0.1, 0.1)
         
        cr.select_font_face("Purisa", cairo.FONT_SLANT_NORMAL, 
            cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(13)
       
        cr.move_to(20, 30)
        cr.show_text("Most relationships seem so transitory")
        cr.move_to(20, 60)
        cr.show_text("They're all good but not the permanent one")
        cr.move_to(20, 120)
        cr.show_text("Who doesn't long for someone to hold")
        cr.move_to(20, 150)
        cr.show_text("Who knows how to love without being told")
        cr.move_to(20, 180)
        cr.show_text("Somebody tell me why I'm on my own")
        cr.move_to(20, 210)
        cr.show_text("If there's a soulmate for everyone")
        

PyApp()
gtk.main()

We display part of the lyrics from the Natasha Bedingfields Soulmate song. 

cr.select_font_face("Purisa", cairo.FONT_SLANT_NORMAL, 
    cairo.FONT_WEIGHT_NORMAL)

Here we specify the font that we use.

cr.set_font_size(13)

We specify the size of the font.

cr.move_to(20, 30)

We move to the point, where we draw the text. 

cr.show_text("Most relationships seem so transitory")

The show_text method draws text onto the window. 

![soulmate.png](images/soulmate.png)

Figure: Soulmate

In this chapter of the PyGTK programming library, we were drawing 
with the Cairo graphics library.

[Contents](..)
[Previous](../pangoII/)
[Next](../drawingII/)