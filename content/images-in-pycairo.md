+++
title = "Images in PyCairo"
date = 2025-08-29T19:54:55.737+01:00
draft = false
description = "In this part of the PyCairo tutorial, we work with images."
image = "images/showimage.png"
imageBig = "images/showimage.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../text/)
[Next](../root/)

# Images in PyCairo

last modified July 17, 2023

In this part of the PyCairo tutorial we talk about images. We show how to
display a PNG and JPEG image on the GTK window. We also draw some text on an
image.

## Displaying a PNG image

In the first example we display a PNG image.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program shows how to draw
an image on a GTK window in PyCairo.

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

        self.set_title("Image")
        self.resize(300, 170)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.ims = cairo.ImageSurface.create_from_png("stmichaelschurch.png")

    def on_draw(self, wid, cr):

        cr.set_source_surface(self.ims, 10, 10)
        cr.paint()

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

The example displays an image.

self.ims = cairo.ImageSurface.create_from_png("stmichaelschurch.png")

We create an image surface from a PNG image.

cr.set_source_surface(self.ims, 10, 10)

We set a source for painting from the previously created image surface.

cr.paint()

We paint the source on the window.

![showimage.png](images/showimage.png)

Figure: Showing an image

## Displaying a JPEG image

PyCairo has built-in support only for PNG images. Other images can be
displayed via the GdkPixbuf.Pixbuf object. It is
a GTK object for manipulating images.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program shows how to draw
an image on a GTK window in PyCairo.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, Gdk, GdkPixbuf
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

        self.set_title("Image")
        self.resize(300, 170)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.pb = GdkPixbuf.Pixbuf.new_from_file("stmichaelschurch.jpg")

    def on_draw(self, wid, cr):

        Gdk.cairo_set_source_pixbuf(cr, self.pb, 5, 5)
        cr.paint()

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

In this example, we display a JPEG image on the window.

from gi.repository import Gtk, Gdk, GdkPixbuf

In addition to Gtk we also need Gdk
and GdkPixbuf modules.

self.pb = GdkPixbuf.Pixbuf.new_from_file("stmichaelschurch.jpg")

We create a GdkPixbuf.Pixbuf from a JPEG file.

Gdk.cairo_set_source_pixbuf(cr, self.pb, 5, 5)
cr.paint()

The Gdk.cairo_set_source_pixbuf method sets the
pixbuf as a source for painting.

## Watermark

It is common to draw information on images. The text written on an image
is called a watermark. Watermarks are used to identify images. They could
be copyright notices or image creation times.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial

This program draws a watermark
on an image.

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
        self.draw_mark()

    def init_ui(self):

        darea = Gtk.DrawingArea()
        darea.connect("draw", self.on_draw)
        self.add(darea)

        self.set_title("Watermark")
        self.resize(350, 250)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()

    def load_image(self):

        self.ims = cairo.ImageSurface.create_from_png("beckov.png")

    def draw_mark(self):

        cr = cairo.Context(self.ims)
        cr.set_font_size(11)
        cr.set_source_rgb(0.9 , 0.9 , 0.9)
        cr.move_to(20 , 30)
        cr.show_text(" Beckov 2012 , (c) Jan Bodnar ")
        cr.stroke()

    def on_draw(self, wid, cr):

        cr.set_source_surface(self.ims, 10, 10)
        cr.paint()

def main():

    app = Example()
    Gtk.main()

if __name__ == "__main__":
    main()

We draw copyright information on an image.

def load_image(self):

    self.ims = cairo.ImageSurface.create_from_png("beckov.png")

In the load_image method, we create an image surface from a
PNG image.

def draw_mark(self):

    cr = cairo.Context(self.ims)
...

In the draw_mark method, we draw the copyright message on the image.
First we create a drawing context from the image surface.

cr.set_font_size(11)
cr.set_source_rgb(0.9 , 0.9 , 0.9)
cr.move_to(20 , 30)
cr.show_text(" Beckov 2012 , (c) Jan Bodnar ")
cr.stroke()

Then we draw a small text in white colour.

def on_draw(self, wid, cr):

    cr.set_source_surface(self.ims, 10, 10)
    cr.paint()

Finally, the image surface is drawn on the window.

![watermark.jpg](images/watermark.jpg)

Figure: Watermark

This chapter covered images in PyCairo.

[Contents](..)
[Previous](../text/)
[Next](../root/)