+++
title = "Transparency in PyCairo"
date = 2025-08-29T19:54:58.158+01:00
draft = false
description = "In this part of the PyCairo tutorial we work with transparency."
image = "images/trect.png"
imageBig = "images/trect.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../clipmask/)
[Next](../transformations/)

# Transparency in PyCairo

last modified July 17, 2023

In this part of the PyCairo tutorial we talk about transparency. We provide some
basic definitions and three interesting transparency examples.

Transparency is the quality of being able to see through a material. 
The easiest way to understand transparency is to imagine a piece of glass or water. 
Technically, the rays of light can go through the glass and this way we 
can see objects behind the glass. 

In computer graphics, we can achieve transparency effects using alpha
compositing. Alpha compositing is the process of combining an image with a
background to create the appearance of partial transparency. The composition
process uses an *alpha channel*. Alpha channel is an 8-bit layer in a
graphics file format that is used for expressing translucency (transparency).
The extra eight bits per pixel serves as a mask and represents 256 levels of
translucency. 

## Transparent rectangles

The first example will draw ten rectangles with different levels of transparency.

def on_draw(self, wid, cr):

    for i in range(1, 11):
        
        cr.set_source_rgba(0, 0, 1, i*0.1)
        cr.rectangle(50*i, 20, 40, 40)
        cr.fill()        

The set_source_rgba method has an alpha 
parameter to provide transparency.

for i in range(1, 11):
    
    cr.set_source_rgba(0, 0, 1, i*0.1)
    cr.rectangle(50*i, 20, 40, 40)
    cr.fill()

This code creates ten rectangles with alpha values from 0.1 ... 1. 

![trect.png](images/trect.png)

Figure: Transparent rectangles

## Puff effect

In the following example, we create a puff effect. The example will display a
growing centered text that will gradually fade out from some point. This is
a very common effect which we can often see in flash animations.
The paint_with_alpha method is crucial to create the effect.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This program creates a 'puff'
effect.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, GLib
import cairo

class cv(object):
    
    SPEED = 14
    TEXT_SIZE_MAX = 20
    ALPHA_DECREASE = 0.01
    SIZE_INCREASE = 0.8

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        
        
    def init_ui(self):    

        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.add(self.darea)
        
        self.timer = True
        self.alpha = 1.0
        self.size = 1.0       
        
        GLib.timeout_add(cv.SPEED, self.on_timer)

        self.set_title("Puff")
        self.resize(350, 200)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        

    def on_timer(self):
        
        if not self.timer: return False
    
        self.darea.queue_draw()
        return True        
        
        
    def on_draw(self, wid, cr):

        w, h = self.get_size()
       
        cr.set_source_rgb(0.5, 0, 0)
        cr.paint()

        cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL, 
            cairo.FONT_WEIGHT_BOLD)

        self.size = self.size + cv.SIZE_INCREASE

        if self.size &gt; cv.TEXT_SIZE_MAX:
            self.alpha = self.alpha - cv.ALPHA_DECREASE
        
        cr.set_font_size(self.size)
        cr.set_source_rgb(1, 1, 1)
        
        (x, y, width, height, dx, dy) = cr.text_extents("ZetCode")

        cr.move_to(w/2 - width/2, h/2)
        cr.text_path("ZetCode")
        cr.clip()
        cr.paint_with_alpha(self.alpha)

        if self.alpha &lt;= 0:
            self.timer = False
        
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

The example creates a growing and fading text on the window.

class cv(object):
    
    SPEED = 14
    TEXT_SIZE_MAX = 20
    ALPHA_DECREASE = 0.01
    SIZE_INCREASE = 0.8

Here we define some constants used in the example.

self.alpha = 1.0
self.size = 1.0     

These two variables store the current alpha value and the text size.

GLib.timeout_add(cv.SPEED, self.on_timer)

Each 14 ms the on_timer() method is called.

def on_timer(self):
    
    if not self.timer: return False

    self.darea.queue_draw()
    return True 

In the on_timer method, we redraw the drawing area widget with 
the queue_draw method.

def on_draw(self, wid, cr):

    w, h = self.get_size()
    
    cr.set_source_rgb(0.5, 0, 0)
    cr.paint()

    cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL, 
        cairo.FONT_WEIGHT_BOLD)
...

In the on_draw method, we get the width and height of the 
client area of the window. These values are used to center the
text. We fill the background of the window in some dark red colour. We
select a Courier font for the text.

(x, y, width, height, dx, dy) = cr.text_extents("ZetCode")

We get the text metrics. We use only the text width.

cr.move_to(w/2 - width/2, h/2)

We move to a position where the text will be centered on the window.

cr.text_path("ZetCode")
cr.clip()
cr.paint_with_alpha(self.alpha)

We get the path of the text with the text_path method. We restrict the
painting to the current path using the clip method. The 
paint_with_alpha method paints the current source everywhere 
within the current clip region using a mask of the alpha value.

![puff.png](images/puff.png)

Figure: Puff effect

## Reflected image

In the next example, we show a reflected image. This effect makes
an illusion as if the image was reflected in water.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This program creates an image reflection.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk
import cairo
import sys

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        self.load_image()
        self.init_vars()
        
        
    def init_ui(self):    

        darea = Gtk.DrawingArea()
        darea.connect("draw", self.on_draw)
        self.add(darea)

        self.set_title("Reflection")
        self.resize(300, 350)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
        
    def load_image(self):          
        
        try:
            self.s = cairo.ImageSurface.create_from_png("slanec.png")
        except Exception, e:
            print e.message
            sys.exit(1)              
        
        
    def init_vars(self):
        
        self.imageWidth = self.s.get_width()
        self.imageHeight = self.s.get_height()
        self.gap = 40
        self.border = 20                
        
    
    def on_draw(self, wid, cr):

        w, h = self.get_size()
          
        lg = cairo.LinearGradient(w/2, 0, w/2, h*3)
        lg.add_color_stop_rgba(0, 0, 0, 0, 1)
        lg.add_color_stop_rgba(h, 0.2, 0.2, 0.2, 1)

        cr.set_source(lg)
        cr.paint()
        
        cr.set_source_surface(self.s, self.border, self.border)
        cr.paint()

        alpha = 0.7
        step = 1.0 / self.imageHeight
      
        cr.translate(0, 2 * self.imageHeight + self.gap)
        cr.scale(1, -1)
        
        i = 0
        
        while(i &lt; self.imageHeight):

            cr.rectangle(self.border, self.imageHeight-i, 
                self.imageWidth, 1)

            i = i + 1
            
            cr.save()
            cr.clip()
            cr.set_source_surface(self.s, self.border, 
                self.border)
                
            alpha = alpha - step
            
            cr.paint_with_alpha(alpha)
            cr.restore()
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

A reflected ruin of a castle is shown on the window.

def load_image(self):          
    
    try:
        self.s = cairo.ImageSurface.create_from_png("slanec.png")
    except Exception, e:
        print e.message
        sys.exit(1)    

In the load_image method an image surface is created from a PNG
image. 

def init_vars(self):
    
    self.imageWidth = self.s.get_width()
    self.imageHeight = self.s.get_height()
    self.gap = 40
    self.border = 20  

Inside the init_vars method, we get the width and
height of the image. We also define two variables.

lg = cairo.LinearGradient(w/2, 0, w/2, h*3)
lg.add_color_stop_rgba(0, 0, 0, 0, 1)
lg.add_color_stop_rgba(h, 0.2, 0.2, 0.2, 1)

cr.set_source(lg)
cr.paint()

The background of the window is filled with a gradient paint. The paint is a
smooth blending from black to dark gray.

cr.translate(0, 2 * self.imageHeight + self.gap)
cr.scale(1, -1)

This code flips the image and translates it below the original image. The
translation operation is necessary, because the scaling operation makes the
image upside down and translates the image up. To understand what happens, 
simply take a photograph and place it on the table. And flip it.

i = 0

while(i &lt; self.imageHeight):

    cr.rectangle(self.border, self.imageHeight-i, 
        self.imageWidth, 1)

    i = i + 1
    
    cr.save()
    cr.clip()
    cr.set_source_surface(self.s, self.border, 
        self.border)
        
    alpha = alpha - step
    
    cr.paint_with_alpha(alpha)
    cr.restore()

This is the final part. We make the second image transparent. But the
transparency is not constant. The image gradually fades out. The reflected
image is draw line by line. The clip method restricts the drawing to the
rectangle of height 1. The paint_with_alpha takes the transparency into
account when painting the current clip of the image surface.

![reflection.jpg](images/reflection.jpg)

Figure: Reflected image

## Waiting demo

In this examle, we use transparency effect to create a waiting demo. We draw
eight lines that gradually fade out creating an illusion, that a line is moving.
Such effects are often used to inform users that a lengthy task is going on
behind the scenes. An example is streaming video over the Internet.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This program creates a 'waiting' effect.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, GLib
import cairo
import math

class cv(object):
    
    trs = (
        ( 0.0, 0.15, 0.30, 0.5, 0.65, 0.80, 0.9, 1.0 ),
        ( 1.0, 0.0,  0.15, 0.30, 0.5, 0.65, 0.8, 0.9 ),
        ( 0.9, 1.0,  0.0,  0.15, 0.3, 0.5, 0.65, 0.8 ),
        ( 0.8, 0.9,  1.0,  0.0,  0.15, 0.3, 0.5, 0.65 ),
        ( 0.65, 0.8, 0.9,  1.0,  0.0,  0.15, 0.3, 0.5 ),
        ( 0.5, 0.65, 0.8, 0.9, 1.0,  0.0,  0.15, 0.3 ),
        ( 0.3, 0.5, 0.65, 0.8, 0.9, 1.0,  0.0,  0.15 ),
        ( 0.15, 0.3, 0.5, 0.65, 0.8, 0.9, 1.0,  0.0, )
    )

    SPEED = 100
    CLIMIT = 1000
    NLINES = 8  

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        
        
    def init_ui(self):    

        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.add(self.darea)
        
        self.count = 0
        
        GLib.timeout_add(cv.SPEED, self.on_timer)        

        self.set_title("Waiting")
        self.resize(250, 150)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
        
    def on_timer(self):    
        
        self.count = self.count + 1
        
        if self.count &gt;= cv.CLIMIT:
            self.count = 0        
            
        self.darea.queue_draw()
        
        return True        
        
    
    def on_draw(self, wid, cr):

        cr.set_line_width(3)
        cr.set_line_cap(cairo.LINE_CAP_ROUND)

        w, h = self.get_size()
       
        cr.translate(w/2, h/2)

        for i in range(cv.NLINES):
            
            cr.set_source_rgba(0, 0, 0, cv.trs[self.count%8][i])
            cr.move_to(0.0, -10.0)
            cr.line_to(0.0, -40.0)
            cr.rotate(math.pi/4)
            cr.stroke()
        
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

We draw eight lines with eight different alpha values.

class cv(object):
    
    trs = (
        ( 0.0, 0.15, 0.30, 0.5, 0.65, 0.80, 0.9, 1.0 ),
        ( 1.0, 0.0,  0.15, 0.30, 0.5, 0.65, 0.8, 0.9 ),
        ( 0.9, 1.0,  0.0,  0.15, 0.3, 0.5, 0.65, 0.8 ),
        ( 0.8, 0.9,  1.0,  0.0,  0.15, 0.3, 0.5, 0.65 ),
        ( 0.65, 0.8, 0.9,  1.0,  0.0,  0.15, 0.3, 0.5 ),
        ( 0.5, 0.65, 0.8, 0.9, 1.0,  0.0,  0.15, 0.3 ),
        ( 0.3, 0.5, 0.65, 0.8, 0.9, 1.0,  0.0,  0.15 ),
        ( 0.15, 0.3, 0.5, 0.65, 0.8, 0.9, 1.0,  0.0, )
    )
...

This is a two dimensional tuple of transparency values used in this demo. 
There are 8 rows, each for one state. Each of the 8 lines will continuously 
use these values.

SPEED = 100
CLIMIT = 1000
NLINES = 8  

The SPEED constant controls the speed of the animation.
The CLIMIT is the maximum number for the self.count 
variable. After reaching this limit, the variable is reset to 0. The 
NLINES is the number of lines drawn in the example.

GLib.timeout_add(cv.SPEED, self.on_timer)

We use a timer function to create animation. Each cv.SPEED
ms the on_timer method is called.

def on_timer(self):    
    
    self.count = self.count + 1
    
    if self.count &gt;= cv.CLIMIT:
        self.count = 0        
        
    self.darea.queue_draw()
    
    return True  

In the on_timer method, we increase the self.count 
variable. If the variable reaches the cv.CLIMIT constant, it is 
set to 0. We guard against overflowing and we do not work with large numbers.

def on_draw(self, wid, cr):

    cr.set_line_width(3)
    cr.set_line_cap(cairo.LINE_CAP_ROUND)
...

We make the lines a bit thicker, so that they are better visible. 
We draw the lines with rouded caps.

w, h = self.get_size()

cr.translate(w/2, h/2)

We position our drawing in the center of the window.

for i in range(cv.NLINES):
    
    cr.set_source_rgba(0, 0, 0, cv.trs[self.count%8][i])
    cr.move_to(0.0, -10.0)
    cr.line_to(0.0, -40.0)
    cr.rotate(math.pi/4)
    cr.stroke()

In the for loop, we draw eight rotated lines with different transparency values.
The lines are separated by an angle of 45 degrees.

![waiting.png](images/waiting.png)

Figure: Waiting demo

In this part of the PyCairo tutorial, we have covered transparency. 

[Contents](..) 
[Previous](../clipmask/)
[Next](../transformations/)