+++
title = "Text in PyCairo"
date = 2025-08-29T19:54:58.462+01:00
draft = false
description = "In this part of the PyCairo tutorial, we work with text."
image = "images/soulmate.png"
imageBig = "images/soulmate.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transformations/)
[Next](../images/)

# Text in PyCairo

last modified July 17, 2023

In this part of the PyCairo tutorial we work with text.

## Soulmate

In the first example we display some lyrics on a window.

def on_draw(self, wid, cr):

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

In this code, we display part of the lyrics from the Natasha 
Bedingfields Soulmate song.

cr.select_font_face("Purisa", cairo.FONT_SLANT_NORMAL, 
    cairo.FONT_WEIGHT_NORMAL)

Here we select the font face. The method takes three parameters, the 
font family, font slant and the font weight.

cr.set_font_size(13)

Here we specify the font size.

cr.move_to(20, 30)
cr.show_text("Most relationships seem so transitory")

We display the text on the window by specifying the position of the text and 
calling the show_text method.

![soulmate.png](images/soulmate.png)

Figure: Soulmate

## Centered text

Next we show how to center text on the window.

def on_draw(self, wid, cr):

    w, h = self.get_size()
        
    cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL, 
        cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(60)
    
    (x, y, width, height, dx, dy) = cr.text_extents("ZetCode")

    cr.move_to(w/2 - width/2, h/2)    
    cr.show_text("ZetCode")

The code will center a text on the window. It remains centered, even
if we resize the window.

w, h = self.get_size() 

To center a text on the window, it is necessary to get the size of
the client area of the window.

cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL, 
    cairo.FONT_WEIGHT_BOLD)
cr.set_font_size(60)

We select a font and its size to be displayed. 

(x, y, width, height, dx, dy) = cr.text_extents("ZetCode") 

We get the text extents. These are some numbers that describe
the text. We need the width of the text for our example.

cr.move_to(w/2 - width/2, h/2)    
cr.show_text("ZetCode")

We position the text into the middle of the window and show it using the
show_text method.

![centeredtext.png](images/centeredtext.png)

Figure: Centered text

## Shaded text

Now we create a shaded text on the window. 

def on_draw(self, wid, cr):
            
    cr.select_font_face("Serif", cairo.FONT_SLANT_NORMAL, 
        cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(50)
    
    cr.set_source_rgb(0, 0, 0)
    cr.move_to(40, 60)
    cr.show_text("ZetCode")
    
    cr.set_source_rgb(0.5, 0.5, 0.5)
    cr.move_to(43, 63)
    cr.show_text("ZetCode")

To create a shade, we draw the text twice. In different 
colours. The second text is moved a bit to the right and
bottom. 

cr.set_source_rgb(0, 0, 0)
cr.move_to(40, 60)
cr.show_text("ZetCode")

The first text is drawn in black ink. It serves as a shade.

cr.set_source_rgb(0.5, 0.5, 0.5)
cr.move_to(43, 63)
cr.show_text("ZetCode")

The second text is drawn in some gray ink. It is moved by 3px to 
the right and to the bottom.

![shade.png](images/shade.png)

Figure: Shaded text

## Text filled with gradient

The following example create a nice effect. We fill a text with some linear
gradient.

def on_draw(self, wid, cr):
                
    cr.set_source_rgb(0.2, 0.2, 0.2)
    cr.paint()
    
    h = 90
    
    cr.select_font_face("Serif", cairo.FONT_SLANT_ITALIC, 
        cairo.FONT_WEIGHT_BOLD)
    cr.set_font_size(h)
    
    lg = cairo.LinearGradient(0, 15, 0, h*0.8)
    lg.set_extend(cairo.EXTEND_REPEAT)
    lg.add_color_stop_rgb(0.0, 1, 0.6, 0)
    lg.add_color_stop_rgb(0.5, 1, 0.3, 0) 
                    
    cr.move_to(15, 80)
    cr.text_path("ZetCode")
    cr.set_source(lg)
    cr.fill()

We draw a text on the window filled with a linear gradient.
The colours are some orange colours.

cr.set_source_rgb(0.2, 0.2, 0.2)
cr.paint() 

To make it more visually appealing, we paint the background in 
dark gray colour.

lg = cairo.LinearGradient(0, 15, 0, h*0.8)
lg.set_extend(cairo.EXTEND_REPEAT)
lg.add_color_stop_rgb(0.0, 1, 0.6, 0)
lg.add_color_stop_rgb(0.5, 1, 0.3, 0) 

The linear gradient is created. 

cr.move_to(15, 80)
cr.text_path("ZetCode")
cr.set_source(lg)
cr.fill() 

The text is displayed on the window. We use the gradient
as a source for painting.

![textgrad.png](images/textgrad.png)

Figure: Text filled with gradient

## Letter by letter

In this effect we display a text letter by letter. The letters will be drawn
with some delay. 

#!/usr/bin/python

'''
ZetCode PyCairo tutorial 

This program shows text letter by
letter. 

author: Jan Bodnar
website: zetcode.com
'''

from gi.repository import Gtk, GLib
import cairo

class cv(object):
    
    SPEED = 800
    TEXT_SIZE = 35
    COUNT_MAX = 8

class Example(Gtk.Window):

    def __init__(self):
        super(Example, self).__init__()
        
        self.init_ui()
        self.init_vars()
        
        
    def init_ui(self):    

        self.darea = Gtk.DrawingArea()
        self.darea.connect("draw", self.on_draw)
        self.add(self.darea)
        
        
        GLib.timeout_add(cv.SPEED, self.on_timer)

        self.set_title("Letter by letter")
        self.resize(350, 200)
        self.set_position(Gtk.WindowPosition.CENTER)
        self.connect("delete-event", Gtk.main_quit)
        self.show_all()
        
        
    def init_vars(self):
        
        self.timer = True
        self.count = 0
        self.text = [ "Z", "e", "t", "C", "o", "d", "e" ]
        

    def on_timer(self):
              
        if not self.timer: return False
    
        self.darea.queue_draw()
        return True        
                        
        
    def on_draw(self, wid, cr):

        cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL,
            cairo.FONT_WEIGHT_BOLD)

        cr.set_font_size(cv.TEXT_SIZE)

        dis = 0

        for i in range(self.count):
            
            (x, y, width, height, dx, dy) = cr.text_extents(self.text[i])
            
            dis += width + 2
            cr.move_to(dis + 30, 50)
            cr.show_text(self.text[i])  
        

        self.count += 1

        if self.count == cv.COUNT_MAX:
            self.timer = False
            self.count = 0
            
        
    
def main():
    
    app = Example()
    Gtk.main()
        
        
if __name__ == "__main__":    
    main()

In our example we draw the "ZetCode" string on the GTK window letter by letter
with some delay.

self.text = [ "Z", "e", "t", "C", "o", "d", "e" ]

This is a list of letters to be displayed on the window.

cr.select_font_face("Courier", cairo.FONT_SLANT_NORMAL,
    cairo.FONT_WEIGHT_BOLD)

We select a Courier font face in bold weight.

for i in range(self.count):
    
    (x, y, width, height, dx, dy) = cr.text_extents(self.text[i])
    
    dis += width + 2
    cr.move_to(dis + 30, 50)
    cr.show_text(self.text[i])  

Here we draw the text letter by letter. We get the width
of each of the letters and compute the disptance on the x axis.

## Glyphs

The show_text method is only suitable for simple text
rendering. Cairo developers call it a toy method. More professional text
rendering is done with glyphs. A *glyph* is a graphic symbol which
provides a form for a character. A character provides a meaning. It can 
have multiple glyphs. A character has no intrinsic appearance. 
A glyph has no intrinsic meaning.

Note that many common programming requirements conserning text are
addressed by the Pango library.

def on_draw(self, wid, cr):
    
    cr.select_font_face("Serif", cairo.FONT_SLANT_NORMAL,
        cairo.FONT_WEIGHT_NORMAL)

    cr.set_font_size(13)

    glyphs = []
    index = 0
    
    for y in range(20):
        for x in range(35):
            glyphs.append((index, x*15 + 20, y*18 + 20))
            index += 1

    cr.show_glyphs(glyphs) 

This code shows 700 glyphs of a chosen font. 

glyphs = [] 

The glyphs list will store three integer values. 
The first value is the index of the glyph to the chosen 
font type. The second and the third values are x, y 
positions of a glyph.

cr.show_glyphs(glyphs) 

The show_glyphs method shows the glyphs
on the window.

![glyphs.png](images/glyphs.png)

Figure: Glyphs

This chapter covered text in PyCairo.

[Contents](..) 
[Previous](../transformations/)
[Next](../images/)