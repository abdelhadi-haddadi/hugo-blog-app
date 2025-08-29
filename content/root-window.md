+++
title = "Root window"
date = 2025-08-29T19:54:56.849+01:00
draft = false
description = "In this chapter of the PyCairo tutorial we have examples that work with the root window."
image = "images/trwindow.png"
imageBig = "images/trwindow.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../images/)

# Root window

last modified July 17, 2023

In this part of the PyCairo tutorial we work with the root window. The root
window is the desktop window where we usually have icon shortcuts.

It is possible to manipulate with the root window. From the programmer's
perspective, it is just a special kind of a window. 

## Transparent window

Our first example creates a transparent window. We see what is beneath the
window object. 

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This code example shows how to
create a transparent window.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk
import cairo

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.tran_setup()
        self.init_ui()
        
        
    def init_ui(self):    

        self.connect("draw", self.on_draw)        

        self.set_title("Transparent window")
        self.resize(300, 250)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
        
    def tran_setup(self):    
        
        self.set_app_paintable(True)  
        screen = self.get_screen()
        
        visual = screen.get_rgba_visual()       
        if visual != None and screen.is_composited():
            self.set_visual(visual)              
        
    
    def on_draw(self, wid, cr):

        cr.set_source_rgba(0.2, 0.2, 0.2, 0.4)
        cr.set_operator(cairo.OPERATOR_SOURCE)
        cr.paint()
       
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

To create a transparent window, we get the visual of the screen object
and set it for our window. In the on_draw method, we draw over the
screen's visual object. This createas an illusion of partial transparency.

self.set_app_paintable(True)  

We must set the application to be painted on.

screen = self.get_screen()

The get_screen method returns the screen object.

visual = screen.get_rgba_visual()

From the screen window, we get its visual. The visual contains the low level
display information.

if visual != None and screen.is_composited():
    self.set_visual(visual) 

Not all displays support this operation. Therefore, we check if
our screen supports composition and the returned visual is not 
None. We set the screen's visual to be the visual of our window.

def on_draw(self, wid, cr):

    cr.set_source_rgba(0.2, 0.2, 0.2, 0.4)
    cr.set_operator(cairo.OPERATOR_SOURCE)
    cr.paint()

We use a partially transparent source to draw over the screen
window. The cairo.OPERATOR_SOURCE creates a composition
operation where we draw over the source. Which is the screen window.
To get full transparency, we set the alpha value to 0 or use the
cairo.OPERATOR_CLEAR operator.

![trwindow.png](images/trwindow.png)

Figure: Transparent window

## Taking a screenshot

The root window is also essential in taking a screenshot.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This code example takes a screenshot.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gdk
import cairo

def main():
    
    root_win = Gdk.get_default_root_window()

    width = root_win.get_width()
    height = root_win.get_height()    
    
    ims = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)                
    pb = Gdk.pixbuf_get_from_window(root_win, 0, 0, width, height)
        
    cr = cairo.Context(ims)    
    Gdk.cairo_set_source_pixbuf(cr, pb, 0, 0)     
    cr.paint()

    ims.write_to_png("screenshot.png")
        
        
if __name__ == "__main__":    
    main()

The example captures a snapshot of the entire screen. 

root_win = Gdk.get_default_root_window()

We get the root window with the Gdk.get_default_root_window
method call.

width = root_win.get_width()
height = root_win.get_height() 

We determine the width and the height of the root window.

ims = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)

An empty image surface is created. It has the size of the root 
window.

pb = Gdk.pixbuf_get_from_window(root_win, 0, 0, width, height)

We get a pixbuf from the root window using the Gdk.pixbuf_get_from_window
method call. A pixbuf is an object that describes an image in memory. It
is used by the GTK library.

cr = cairo.Context(ims)    
Gdk.cairo_set_source_pixbuf(cr, pb, 0, 0)     
cr.paint()

In the above code lines, we create a Cairo drawing context on the
image surface that we have created earlier. We place the pixbuf
on the drawing context and paint it on the surface. 

ims.write_to_png("screenshot.png")

The image surface is written to a PNG image using the
write_to_png method.

## Showing message

In the third example we show a message on the desktop window.

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This code example shows a message on the desktop
window.

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, Gdk, Pango
import cairo

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.setup()       
        self.init_ui()

        
    def setup(self):    
        
        self.set_app_paintable(True)   
        self.set_type_hint(Gdk.WindowTypeHint.DOCK)
        self.set_keep_below(True)
        
        screen = self.get_screen()
        visual = screen.get_rgba_visual()       
        if visual != None and screen.is_composited():
            self.set_visual(visual)          
        
        
    def init_ui(self):    

        self.connect("draw", self.on_draw)        
        
        lbl = Gtk.Label()
        text = "ZetCode, tutorials for programmers."
        lbl.set_text(text)        
        
        fd = Pango.FontDescription("Serif 20")
        lbl.modify_font(fd)                
        lbl.modify_fg(Gtk.StateFlags.NORMAL,Gdk.color_parse("white"))        
        
        self.add(lbl)

        self.resize(300, 250)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
                                      
    
    def on_draw(self, wid, cr):
        
        cr.set_operator(cairo.OPERATOR_CLEAR)
        cr.paint()
        cr.set_operator(cairo.OPERATOR_OVER)
        
    
def main():
        
        app = Example()
        Gtk.main()        

        
if __name__ == "__main__":    
    import signal
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    main()

The code displays a message label on the root window. 

self.set_app_paintable(True) 

We be manipulating the application window so we make it paintable.

self.set_type_hint(Gdk.WindowTypeHint.DOCK)

Implementing this window hint removes window borders and
decoration.

self.set_keep_below(True) 

We keep the application always at the bottom, just over the root window.

screen = self.get_screen()
visual = screen.get_rgba_visual()       
if visual != None and screen.is_composited():
    self.set_visual(visual)  

We set the visual of the screen to be the visual of our application.

lbl = Gtk.Label()
text = "ZetCode, tutorials for programmers."
lbl.set_text(text)    

We put a message label on the application window.

fd = Pango.FontDescription("Serif 20")
lbl.modify_font(fd)                
lbl.modify_fg(Gtk.StateFlags.NORMAL,Gdk.color_parse("white"))   

With the help of the Pango module, we change the appearance of
the text.

def on_draw(self, wid, cr):
    
    cr.set_operator(cairo.OPERATOR_CLEAR)
    cr.paint()
    cr.set_operator(cairo.OPERATOR_OVER)

We use the cairo.OPERATOR_CLEAR operator to clear
the background of the window. Then we set the cairo.OPERATOR_CLEAR
to let the label widget be drawn. 

if __name__ == "__main__":    
    import signal
    signal.signal(signal.SIGINT, signal.SIG_DFL)
    main()

There is an older [bug](https://bugzilla.gnome.org/show_bug.cgi?id=622084)
that does not allow us to terminate the application launched from the terminal 
with the Ctrl+C shortcut. Adding the two lines is a 
workaround for this.

![desktopwrite.png](images/desktopwrite.png)

Figure: Message on the root window

In this chapter we have worked with the desktop window in PyCairo.

[Contents](..) 
[Previous](../images/)