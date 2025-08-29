+++
title = "Custom widget in PyGTK"
date = 2025-08-29T19:56:55.572+01:00
draft = false
description = "In this part of the PyGTK tutorial, we create a custom widget."
image = "images/burning.png"
imageBig = "images/burning.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../snake/)

# Custom widget in PyGTK

last modified October 18, 2023

Toolkits usually provide only the most common widgets like buttons, 
text widgets, sliders etc. No toolkit can provide all possible widgets.

More specialised widget must be created by client programmers. They do it by using the 
drawing tools provided by the toolkit. There are two possibilities: a programmer can 
modify or enhance an existing widget, or he can create a custom widget from scratch. 

## Burning widget

This is an example of a widget that we create from scratch. This widget 
can be found in various media burning applications, like Nero Burning ROM.

burning.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

# ZetCode PyGTK tutorial 
#
# This example creates a burning
# custom widget
#
# author: Jan Bodnar
# website: zetcode.com 
# last edited: April 2011

import gtk
import cairo

class Burning(gtk.DrawingArea):

    def __init__(self, parent):
      
        self.par = parent
        super(Burning, self).__init__()
 
        self.num = ( "75", "150", "225", "300", 
            "375", "450", "525", "600", "675" )
 
        self.set_size_request(-1, 30)
        self.connect("expose-event", self.expose)
    

    def expose(self, widget, event):
      
        cr = widget.window.cairo_create()
        cr.set_line_width(0.8)

        cr.select_font_face("Courier", 
            cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
        cr.set_font_size(11)

        width = self.allocation.width
     
        self.cur_width = self.par.get_cur_value()

        step = round(width / 10.0)

        till = (width / 750.0) * self.cur_width
        full = (width / 750.0) * 700

        if (self.cur_width &gt;= 700):
            
            cr.set_source_rgb(1.0, 1.0, 0.72)
            cr.rectangle(0, 0, full, 30)
            cr.save()
            cr.clip()
            cr.paint()
            cr.restore()
            
            cr.set_source_rgb(1.0, 0.68, 0.68)
            cr.rectangle(full, 0, till-full, 30)
            cr.save()
            cr.clip()
            cr.paint()
            cr.restore()

        else:     
            cr.set_source_rgb(1.0, 1.0, 0.72)
            cr.rectangle(0, 0, till, 30)
            cr.save()
            cr.clip()
            cr.paint()
            cr.restore()
       

        cr.set_source_rgb(0.35, 0.31, 0.24)
        
        for i in range(1, len(self.num) + 1):
            cr.move_to(i*step, 0)
            cr.line_to(i*step, 5)
            cr.stroke()
            
            (x, y, width, height, dx, dy) = cr.text_extents(self.num[i-1])
            cr.move_to(i*step-width/2, 15)
            cr.text_path(self.num[i-1])
            cr.stroke()
       
        
 
class PyApp(gtk.Window): 

    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Burning")
        self.set_size_request(350, 200)        
        self.set_position(gtk.WIN_POS_CENTER)
        self.connect("destroy", gtk.main_quit)

        self.cur_value = 0
       
        vbox = gtk.VBox(False, 2)
        
        scale = gtk.HScale()
        scale.set_range(0, 750)
        scale.set_digits(0)
        scale.set_size_request(160, 40)
        scale.set_value(self.cur_value)
        scale.connect("value-changed", self.on_changed)
                
        fix = gtk.Fixed()
        fix.put(scale, 50, 50)
        
        vbox.pack_start(fix)
        
        self.burning = Burning(self)
        vbox.pack_start(self.burning, False, False, 0)

        self.add(vbox)
        self.show_all()
        
        
    def on_changed(self, widget):
        self.cur_value = widget.get_value()
        self.burning.queue_draw()
    
    
    def get_cur_value(self):
        return self.cur_value
    

PyApp()
gtk.main()

We put a DrawingArea on the bottom of the window 
and draw the entire widget manually. All the important code resides in 
the expose method of the Burning class. 
This widget shows graphically the total capacity of a medium and 
the free space available to us. The widget is controlled by a scale widget. 
The minimum value of our custom widget is 0, the maximum is 750. 
If we reach value 700, we began drawing in red colour. This normally indicates
overburning.  

self.num = ( "75", "150", "225", "300", 
    "375", "450", "525", "600", "675" )

These numbers are shown on the burning widget. They show the capacity of the medium.

self.cur_width = self.par.get_cur_value()

These two lines get the current number from the scale widget. We get the 
parent widget and from the parent widget, we get the current value. 

till = (width / 750.0) * self.cur_width
full = (width / 750.0) * 700

The till parameter determines the total size to be drawn. This value 
comes from the slider widget. It is a proportion of the whole area. 
The full parameter determines the point,
where we begin to draw in red colour. 

cr.set_source_rgb(1.0, 1.0, 0.72)
cr.rectangle(0, 0, till, 30)
cr.save()
cr.clip()
cr.paint()
cr.restore()

This code here, draws a yellow rectangle up to point, where the medium is full.

(x, y, width, height, dx, dy) = cr.text_extents(self.num[i-1])
cr.move_to(i*step-width/2, 15)
cr.text_path(self.num[i-1])
cr.stroke()

This code here draws the numbers on the burning widget. We calculate the
TextExtents to position the text correctly.

def on_changed(self, widget):
    self.cur_value = widget.get_value()
    self.burning.queue_draw()

We get the value from the scale widget, store it in the cur_value variable 
for later use. We redraw the burning widget. 

![burning.png](images/burning.png)

Figure: Burning widget

In this chapter, we created a custom widget in PyGTK.

[Contents](..)
[Previous](../snake/)