+++
title = "PyCairo gradients"
date = 2025-08-29T19:54:55.443+01:00
draft = false
description = "In this part of the PyCairo tutorial we cover gradients in PyCairo."
image = "images/lineargradients.png"
imageBig = "images/lineargradients.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../shapesfills/)
[Next](../clipmask/)

# PyCairo gradients

last modified July 17, 2023

In this part of the PyCairo tutorial we cover gradients. We mention linear and
radial gradients. 

In computer graphics, gradient is a smooth blending of shades from light to 
dark or from one color to another. In 2D drawing programs and paint programs, 
gradients are used to create colorful backgrounds and special effects as well 
as to simulate lights and shadows. 

## Linear gradients

Linear gradients are blendings of colours or shades of colours along a line. 
They are represented by a cairo.LinearGradient class in PyCairo.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This program works with linear
gradients in PyCairo.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk
import cairo

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        
        
    def init_ui(self):    

        darea = Gtk.DrawingArea()
        darea.connect("draw", self.on_draw)
        self.add(darea)

        self.set_title("Linear gradients")
        self.resize(340, 390)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
    
    def on_draw(self, wid, cr):
        
        self.draw_gradient1(cr)
        self.draw_gradient2(cr)
        self.draw_gradient3(cr)
        
        
    def draw_gradient1(self, cr):

        lg1 = cairo.LinearGradient(0.0, 0.0, 350.0, 350.0)
       
        count = 1

        i = 0.1    
        while i &lt; 1.0: 
            if count % 2:
                lg1.add_color_stop_rgba(i, 0, 0, 0, 1)
            else:
                lg1.add_color_stop_rgba(i, 1, 0, 0, 1)
            i = i + 0.1
            count = count + 1      

        cr.rectangle(20, 20, 300, 100)
        cr.set_source(lg1)
        cr.fill()
        
        
    def draw_gradient2(self, cr):        

        lg2 = cairo.LinearGradient(0.0, 0.0, 350.0, 0)
       
        count = 1
         
        i = 0.05    
        while i &lt; 0.95: 
            if count % 2:
                lg2.add_color_stop_rgba(i, 0, 0, 0, 1)
            else:
                lg2.add_color_stop_rgba(i, 0, 0, 1, 1)
            i = i + 0.025
            count = count + 1        

        cr.rectangle(20, 140, 300, 100)
        cr.set_source(lg2)
        cr.fill()
        
        
    def draw_gradient3(self, cr):        

        lg3 = cairo.LinearGradient(20.0, 260.0,  20.0, 360.0)
        lg3.add_color_stop_rgba(0.1, 0, 0, 0, 1) 
        lg3.add_color_stop_rgba(0.5, 1, 1, 0, 1) 
        lg3.add_color_stop_rgba(0.9, 0, 0, 0, 1) 

        cr.rectangle(20, 260, 300, 100)
        cr.set_source(lg3)
        cr.fill()
        
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

The example draws three rectangles filled with linear gradients.

lg3 = cairo.LinearGradient(20.0, 260.0,  20.0, 360.0)

Here we create a linear gradient. The parameters specify the line, along
which we draw the gradient. Here it is a horizontal line.

lg3.add_color_stop_rgba(0.1, 0, 0, 0, 1) 
lg3.add_color_stop_rgba(0.5, 1, 1, 0, 1) 
lg3.add_color_stop_rgba(0.9, 0, 0, 0, 1) 

We define colour stops to produce our gradient pattern. In this case, the
gradient is a blending of black and yellow colours. By adding two black and
one yellow stops, we create a horizontal gradient pattern. What do these
stops actually mean? In our case, we begin with black colour which will stop
at 1/10 of the size. Then we begin to gradually paint in yellow, which will
culminate at the center of the shape. The yellow colour stops at 9/10 of the
size, where we begin painting in black again, until the end.

![lineargradients.png](images/lineargradients.png)

Figure: Linear gradients

## Radial gradients

Radial gradients are blendings of colours or shades of colours between two circles. The 
cairo.RadialGradient class is used to create radial gradients
in PyCairo.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program works with radial
gradients in PyCairo.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk
import cairo
import math

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        
        
    def init_ui(self):    

        darea = Gtk.DrawingArea()
        darea.connect("draw", self.on_draw)
        self.add(darea)

        self.set_title("Radial gradients")
        self.resize(300, 200)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
    
    def on_draw(self, wid, cr):
        
        self.draw_gradient1(cr)
        self.draw_gradient2(cr)
        

    def draw_gradient1(self, cr):
        
        cr.set_source_rgba(0, 0, 0, 1)
        cr.set_line_width(12)

        cr.translate(60, 60)
        
        r1 = cairo.RadialGradient(30, 30, 10, 30, 30, 90)
        r1.add_color_stop_rgba(0, 1, 1, 1, 1)
        r1.add_color_stop_rgba(1, 0.6, 0.6, 0.6, 1)
        cr.set_source(r1)
        cr.arc(0, 0, 40, 0, math.pi * 2)
        cr.fill()
        
        cr.translate(120, 0)
        
        
    def draw_gradient2(self, cr):        

        r2 = cairo.RadialGradient(0, 0, 10, 0, 0, 40)
        r2.add_color_stop_rgb(0, 1, 1, 0)
        r2.add_color_stop_rgb(0.8, 0, 0, 0)
        cr.set_source(r2)
        cr.arc(0, 0, 40, 0, math.pi * 2)
        cr.fill()   
        
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

In the example, we draw two radial gradients.

r1 = cairo.RadialGradient(30, 30, 10, 30, 30, 90)
r1.add_color_stop_rgba(0, 1, 1, 1, 1)
r1.add_color_stop_rgba(1, 0.6, 0.6, 0.6, 1)
cr.set_source(r1)
cr.arc(0, 0, 40, 0, math.pi * 2)
cr.fill()

We draw a circle and fill its inside with a radial gradient. 
The radial gradient is defined by two circles. The add_color_stop_rgba
method defines the colours. We can experiment with the position of the 
circles or the length of their radius. In the first gradient example, 
we have created an object which resembles a 3D shape.

r2 = cairo.RadialGradient(0, 0, 10, 0, 0, 40)
r2.add_color_stop_rgb(0, 1, 1, 0)
r2.add_color_stop_rgb(0.8, 0, 0, 0)
cr.set_source(r2)
cr.arc(0, 0, 40, 0, math.pi * 2)
cr.fill()  

In this example, the circles that define the radial gradient and the custom
drawn circle have a common center point.

![radialgradients.png](images/radialgradients.png)

Figure: Radial gradients

In this chapter we have covered PyCairo gradients.

[Contents](..) 
[Previous](../shapesfills/)
[Next](../clipmask/)