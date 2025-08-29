+++
title = "Clipping & masking in PyCairo"
date = 2025-08-29T19:54:55.520+01:00
draft = false
description = "In this part of the PyCairo tutorial, we introduce clipping and masking operations."
image = "images/clipping.png"
imageBig = "images/clipping.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../gradients/)
[Next](../transparency/)

# Clipping &amp; masking in PyCairo

last modified July 17, 2023

In this part of the PyCairo tutorial we talk about clipping and masking
operations.

## Clipping

*Clipping* is restricting of drawing to a certain area.
This is done for efficiency reasons and to create interesting effects.
PyCairo has a clip method to set the clipping.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program shows how to perform
clipping in PyCairo.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, GLib
import cairo
import math
import random

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()

        self.init_ui()
        self.load_image()
        self.init_vars()

    def init_ui(self):

        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.add(self.darea)

        GLib.timeout_add(100, self.on_timer)

        self.set_title("Clipping")
        self.resize(300, 200)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.image = cairo.ImageSurface.create_from_png("beckov.png")

    def init_vars(self):

        self.pos_x = 128
        self.pos_y = 128
        self.radius = 40

        self.delta = [3, 3]

    def on_timer(self):

        self.pos_x += self.delta[0]
        self.pos_y += self.delta[1]

        self.darea.queue_draw()
        return True

    def on_draw(self, wid, cr):

        w, h = self.get_size()

        if (self.pos_x &lt; 0 + self.radius):
            self.delta[0] = random.randint(5, 9)
        elif (self.pos_x &gt; w - self.radius):
            self.delta[0] = -random.randint(5, 9)

        if (self.pos_y &lt; 0 + self.radius):
            self.delta[1] = random.randint(5, 9)
        elif (self.pos_y &gt; h - self.radius):
            self.delta[1] = -random.randint(5, 9)

        cr.set_source_surface(self.image, 1, 1)
        cr.arc(self.pos_x, self.pos_y, self.radius, 0, 2*math.pi)
        cr.clip()
        cr.paint()

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

In this example we clip an image. A circle is moving on
the window area and showing a part of the underlying image.
This is as if we looked through a hole.

def load_image(self):

    self.image = cairo.ImageSurface.create_from_png("beckov.png")

This is the underlying image. Each timer cycle we see a portion of this image.

if (self.pos_x &lt; 0 + self.radius):
    self.delta[0] = random.randint(5, 9)
elif (self.pos_x &gt; w - self.radius):
    self.delta[0]= -random.randint(5, 9)

If the circle hits the left or the right side of the window, the direction of
the circle movement changes randomly. Same applies for the top and bottom sides.

cr.arc(self.pos_x, self.pos_y, self.radius, 0, 2*math.pi)

This line adds a circular path to the Cairo context.

cr.clip()

The clip sets a clipping region. The clipping region is the
current path used. The current path was created by the arc
method call.

cr.paint()

The paint paints the current source everywhere within the
current clip region.

![clipping.png](images/clipping.png)

Figure: Clipping

## Masking

Before the source is applied to the surface, it is filtered first.
The mask is used as a filter. The mask determines where the source
is applied and where not. Opaque parts of the mask allow to copy
the source. Transparent parts do not let to copy the source
to the surface.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program demonstrates masking.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk
import cairo

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()

        self.init_ui()
        self.load_image()

    def init_ui(self):

        darea = Gtk.DrawingArea()
        darea.connect("draw", self.on_draw)
        self.add(darea)

        self.set_title("Masking")
        self.resize(310, 100)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.ims = cairo.ImageSurface.create_from_png("omen.png")

    def on_draw(self, wid, cr):

        cr.mask_surface(self.ims, 0, 0);
        cr.fill()

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

In the example, the mask determines where to paint and
where not to paint.

cr.mask_surface(self.ims, 0, 0);
cr.fill()

We use an image as a mask, thus displaying it on the window.

![omen.png](images/omen.png)

Figure: Masking

## Blind down effect

In this code example we blind down our image. This is similar to what we do with
a roller-blind.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program creates a blind down
effect using masking operation.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, GLib
import cairo
import math

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()

        self.init_ui()
        self.load_image()
        self.init_vars()

    def init_ui(self):

        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.add(self.darea)

        GLib.timeout_add(35, self.on_timer)

        self.set_title("Blind down")
        self.resize(325, 250)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.image = cairo.ImageSurface.create_from_png("beckov.png")

    def init_vars(self):

        self.timer = True
        self.h = 0
        self.iw = self.image.get_width()
        self.ih = self.image.get_height()

        self.ims = cairo.ImageSurface(cairo.FORMAT_ARGB32,
            self.iw, self.ih)

    def on_timer(self):

        if (not self.timer):
            return False

        self.darea.queue_draw()
        return True

    def on_draw(self, wid, cr):

        ic = cairo.Context(self.ims)

        ic.rectangle(0, 0, self.iw, self.h)
        ic.fill()

        self.h += 1

        if (self.h == self.ih):
            self.timer = False

        cr.set_source_surface(self.image, 10, 10)
        cr.mask_surface(self.ims, 10, 10)

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

The idea behind the blind down effect is quite simple. The image is
h pixels high. We draw 0, 1, 2 ... lines of 1px height. Each cycle the
portion of the image is 1px higher, until the whole image is visible.

def load_image(self):

    self.image = cairo.ImageSurface.create_from_png("beckov.png")

In the load_image method, we create an image surface
from a PNG image.

def init_vars(self):

    self.timer = True
    self.h = 0
    self.iw = self.image.get_width()
    self.ih = self.image.get_height()

    self.ims = cairo.ImageSurface(cairo.FORMAT_ARGB32,
        self.iw, self.ih)

In the init_vars() method, we initiate some variables. We initiate the
self.timer and the self.h variables. We get the width and height of the
loaded image. And we create an empty image surface. It is going to be filled
with lines of pixels from the image surface that we have created earlier.

ic = cairo.Context(self.ims)

We create a cairo context from the empty image source.

ic.rectangle(0, 0, self.iw, self.h)
ic.fill()

We draw a rectangle into the initially empty image. The rectangle
will be 1px higher each cycle. The image created this way will serve as
a mask later.

self.h += 1

The height of the image to show is increased by one unit.

if (self.h == self.ih):
    self.timer = False

We stop the timer method when we draw the whole image on the GTK window.

cr.set_source_surface(self.image, 10, 10)
cr.mask_surface(self.ims, 10, 10)

The image of a castle is set as a source for painting. The
mask_surface paints the current
source using the alpha channel of surface as a mask.

This chapter covered clipping and masking in PyCairo.

[Contents](..)
[Previous](../gradients/)
[Next](../transparency/)