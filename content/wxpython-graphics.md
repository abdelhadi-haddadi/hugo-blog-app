+++
title = "wxPython graphics"
date = 2025-08-29T20:15:54.123+01:00
draft = false
description = "This part of the wxPython tutorial covers the Graphics Device Interface in wxPython."
image = "images/gdi2.png"
imageBig = "images/gdi2.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../draganddrop/)
[Next](../customwidgets/)

# wxPython graphics

last modified January 10, 2023

The *GDI* (*Graphics Device Interface*) is an interface for 
working with graphics. It is used to interact with graphic devices such 
as monitor, printer or a file. The GDI allows programmers to display data 
on a screen or printer without having to be concerned about the details 
of a particular device. The GDI insulates the programmer from the hardware. 

From the programmer's point of view, the GDI is a group of classes and 
methods for working with graphics. The GDI consists of 
2D Vector Graphics, Fonts and Images. 

![gdi2.png](images/gdi2.png)

Figure: The GDI structure

To begin drawing graphics, we must create a *device context* (*DC*) object. 
In wxPython the device context is called wx.DC. The documentation defines 
wx.DC as a device context onto which which graphics and text can be drawn. 
It represents number of devices in a generic way. Same piece of code can write 
to different kinds of devices. Be it a screen or a printer. The wx.DC is not 
intended to be used directly. Instead a programmer should choose one of the derived 
classes. Each derived class is intended to be used 
under specific conditions. 

## Derived wx.DC classes

- wxBufferedDC

- wxBufferedPaintDC

- wxPostScriptDC

- wxMemoryDC

- wxPrinterDC

- wxScreenDC

- wxClientDC

- wxPaintDC

- wxWindowDC

The wx.ScreenDC is used to draw anywhere on the screen. The 
wx.WindowDC is used if we want to paint on the whole window 
(Windows only). This includes window decorations. The wx.ClientDC 
is used to draw on the client area of a window. The client area is the 
area of a window without its decorations (title and border).
The wx.PaintDC is used to draw on the client area as well. 
But there is one difference between the wx.PaintDC and the wx.ClientDC. 
The wx.PaintDC should be used only from a wx.PaintEvent. 
The wx.ClientDC should not be used from a wx.PaintEvent.
The wx.MemoryDC is used to draw graphics on the bitmap.
The wx.PostScriptDC is used to write to PostScript files on any platform. 
The wx.PrinterDC is used to access a printer (Windows only).

## Drawing a simple line

Our first example will draw a simple line onto the client area of a window. 

DrawLine(self, x1, y1, x2, y2)

This method draws a line from the first point to the second; excluding the 
second point. 

draw_line.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws a line on the
frame window after a while.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        wx.CallLater(2000, self.DrawLine)

        self.SetTitle("Line")
        self.Centre()

    def DrawLine(self):

        dc = wx.ClientDC(self)
        dc.DrawLine(50, 60, 190, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

We draw a line on the frame window after two seconds have elapsed.

wx.FutureCall(2000, self.DrawLine)

We call the DrawLine() method after the window has been created. 
We do it because, when the window is created, it is drawn. All our drawings 
would be therefore lost. We can start drawing after the window has been 
created. This is the reason, why we call the wx.FutureCall() method. 

def DrawLine(self):

    dc = wx.ClientDC(self)
    dc.DrawLine(50, 60, 190, 60)

We create a wx.ClientDC device context. The only parameter is the 
window on which we want to draw. In our case it is self, which is a 
reference to our wx.Frame widget. We call the DrawLine() 
method of the device context. This call actually draws a line on our window. 

It is very important to understand the following behaviour. If we resize 
the window, the line will disappear. 
Why is this happening? Every window is redrawn if it is resized. It is 
also redrawn if it is maximised. The window is also redrawn if we cover 
it by another window and uncover afterwards. The window is drawn to its 
default state and our line is lost. We have to draw the line each time the 
window is resized. The solution is the wx.PaintEvent. 
This event is triggered every time, the window is redrawn. We will draw 
our line inside a method that will be hooked to the paint event. 

The following example shows how it is done. 

draw_line2.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws a line in
a paint event.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Line")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)
        dc.DrawLine(50, 60, 190, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

We draw the same line. This time in reaction to a paint event. 

self.Bind(wx.EVT_PAINT, self.OnPaint)

Here we bind the OnPaint method to the wx.PaintEvent event. 
It means that each time our window is repainted, we call the OnPaint() 
method. Now the line will not disappear if we resize our window (cover it, maximize it).

dc = wx.PaintDC(self)

Notice that this time we have used the wx.PaintDC device context.

![aline.png](images/aline.png)

Figure: drawing a line

## Computer graphics

There are two different computer graphics: *vector* and *raster* 
graphics. Raster graphics represents images as a collection of pixels. Vector 
graphics is the use of geometrical primitives such as points, lines, curves, 
or polygons to  represent images. These primitives are created using 
mathematical equations. 

Both types of computer graphics have advantages and disadvantages. 
The advantages of vector graphics over raster are:

- smaller size

- ability to zoom indefinitely

- moving, scaling, filling or rotating does not degrade the quality of an image 

### Types of primitives

The following is a partial list of graphics primitives.    

    

- points

- lines

- polylines

- polygons

- circles

- ellipses

- splines

### Device context attributes

The device context contains several attributes, such as brush, pen, or font.  
wx.Brush is a drawing tool for filling in areas. It is used for 
painting the background of shapes. It has a colour and a style. wx.Pen
is used for drawing outlines of shapes. It has a colour, a width, and a style.
wx.Font is an object which determines the appearance of text.

## Basic elements

In the following lines we introduce several elementary objects: colours, brushes, 
pens, joins, caps, and gradients.

### Colours

A colour is an object representing a combination of Red, Green, 
and Blue (RGB) intensity values. Valid RGB values are in the range 0 to 255.
There are three ways for setting colours. We can create a wx.Colour
object, use a predefined colour name or use hex value string. 
wx.Colour(0,0,255), 'BLUE', '#0000FF'. 
These three notations produce the same colour.

A perfect tool for working with colours can be found on the 
[colorjack.com](http://www.colorjack.com) website. Or we can use such 
a tool as Gimp. 

We have also a list of predefined colour names that we can use in our programs.

Standard colour database
AQUAMARINEBLACKBLUEBLUE VIOLETBROWN
CADET BLUECORALCORNFLOWER BLUECYANDARK GREY
DARK GREENDARK OLIVE GREENDARK ORCHIDDARK SLATE BLUEDARK SLATE GREY
DARK TURQUOISEDIM GREYFIREBRICKFOREST GREENGOLD
GOLDENRODGREYGREENGREEN YELLOWINDIAN RED
KHAKILIGHT BLUELIGHT GREYLIGHT STEEL BLUELIME GREEN
MAGENTAMAROONMEDIUM AQUAMARINEMEDIUM BLUEMEDIUM FOREST GREEN
MEDIUM GOLDENRODMEDIUM ORCHIDMEDIUM SEA GREENMEDIUM SLATE BLUEMEDIUM SPRING GREEN
MEDIUM TURQUOISEMEDIUM VIOLET REDMIDNIGHT BLUENAVYORANGE
ORANGE REDORCHIDPALE GREENPINKPLUM
PURPLEREDSALMONSEA GREENSIENNA
SKY BLUESLATE BLUESPRING GREENSTEEL BLUETAN
THISTLE	TURQUOISEVIOLETVIOLET REDWHEAT
WHITEYELLOWYELLOW GREEN

The following example uses a few colour values.

colours.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws nine coloured rectangles
on the window.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Colours")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)
        dc.SetPen(wx.Pen('#d4d4d4'))

        dc.SetBrush(wx.Brush('#c56c00'))
        dc.DrawRectangle(10, 15, 90, 60)

        dc.SetBrush(wx.Brush('#1ac500'))
        dc.DrawRectangle(130, 15, 90, 60)

        dc.SetBrush(wx.Brush('#539e47'))
        dc.DrawRectangle(250, 15, 90, 60)

        dc.SetBrush(wx.Brush('#004fc5'))
        dc.DrawRectangle(10, 105, 90, 60)

        dc.SetBrush(wx.Brush('#c50024'))
        dc.DrawRectangle(130, 105, 90, 60)

        dc.SetBrush(wx.Brush('#9e4757'))
        dc.DrawRectangle(250, 105, 90, 60)

        dc.SetBrush(wx.Brush('#5f3b00'))
        dc.DrawRectangle(10, 195, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c'))
        dc.DrawRectangle(130, 195, 90, 60)

        dc.SetBrush(wx.Brush('#785f36'))
        dc.DrawRectangle(250, 195, 90, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

We draw nine rectangles and fill them with different colours.

dc.SetBrush(wx.Brush('#c56c00'))
dc.DrawRectangle(10, 15, 90, 60)

We specify the colour of the brush in hexadecimal notation. The
brush is the background fill of the shape. Then we draw the rectangle with 
the DrawRectangle() method.

![colours.png](images/colours.png)

Figure: Colours

### wx.Pen

Pen is an elementary graphics object. It is used to draw lines, curves and
outlines of rectangles, ellipses, polygons or other shapes. 

wx.Pen(wx.Colour colour, width=1, style=wx.SOLID)

The wx.Pen constructor has three parameters: colour, width, and 
style. The following is a list of possible pen styles:

  - wx.SOLID

  - wx.DOT

  - wx.LONG_DASH

  - wx.SHORT_DASH

  - wx.DOT_DASH

  - wx.TRANSPARENT

pens.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws six rectangles with different pens.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Pens")
        self.Centre()

    def OnPaint(self, event):
        dc = wx.PaintDC(self)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.SOLID))
        dc.DrawRectangle(10, 15, 90, 60)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.DOT))
        dc.DrawRectangle(130, 15, 90, 60)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.LONG_DASH))
        dc.DrawRectangle(250, 15, 90, 60)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.SHORT_DASH))
        dc.DrawRectangle(10, 105, 90, 60)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.DOT_DASH))
        dc.DrawRectangle(130, 105, 90, 60)

        dc.SetPen(wx.Pen('#4c4c4c', 1, wx.TRANSPARENT))
        dc.DrawRectangle(250, 105, 90, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

If we do not specify a custom brush, a default one is used. The default 
brush is wx.WHITE_BRUSH. The perimeter of the rectangles is drawn 
by the pen. The last one has no border. It is transparent, i.e. not visible.  

![pens.png](images/pens.png)

Figure: Pens

### Joins and Caps

A pen object has additional two parameters: *join* and *cap*. 
The join defines how joins between lines will be drawn. 
The join style has the following options:

- wx.JOIN_MITER

- wx.JOIN_BEVEL

- wx.JOIN_ROUND

When using wx.JOIN_MITER the outer edges of the lines are 
extended. They meet at an angle and this area is filled.
In wx.JOIN_BEVEL the triangular notch between two lines is 
filled. In wx.JOIN_ROUND the circular arc between the two 
lines is filled. The default value is wx.JOIN_ROUND.

The cap defines how the line ends will be drawn by the pen. The options are:

  - wx.CAP_ROUND

  - wx.CAP_PROJECTING

  - wx.CAP_BUTT

The wx.CAP_ROUND draws rounded ends. The wx.CAP_PROJECTING 
and the wx.CAP_BUTT draw square ends. The difference between them is that the 
wx.CAP_PROJECTING will extend beyond the end point by the half 
of the line size. The wx.CAP_ROUND will extend beyond the end point as well. 

joins_caps.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws uses different joins
and caps in drawing.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Joins and caps")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        pen = wx.Pen('#4c4c4c', 10, wx.SOLID)

        pen.SetJoin(wx.JOIN_MITER)
        dc.SetPen(pen)
        dc.DrawRectangle(15, 15, 80, 50)

        pen.SetJoin(wx.JOIN_BEVEL)
        dc.SetPen(pen)
        dc.DrawRectangle(125, 15, 80, 50)

        pen.SetJoin(wx.JOIN_ROUND)
        dc.SetPen(pen)
        dc.DrawRectangle(235, 15, 80, 50)

        pen.SetCap(wx.CAP_BUTT)
        dc.SetPen(pen)
        dc.DrawLine(30, 150,  150, 150)

        pen.SetCap(wx.CAP_PROJECTING)
        dc.SetPen(pen)
        dc.DrawLine(30, 190,  150, 190)

        pen.SetCap(wx.CAP_ROUND)
        dc.SetPen(pen)
        dc.DrawLine(30, 230,  150, 230)

        pen2 = wx.Pen('#4c4c4c', 1, wx.SOLID)
        dc.SetPen(pen2)
        dc.DrawLine(30, 130, 30, 250)
        dc.DrawLine(150, 130, 150, 250)
        dc.DrawLine(155, 130, 155, 250)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

```
pen = wx.Pen('#4c4c4c', 10, wx.SOLID)

```

In order to see the various join and cap styles, we need to set the pen width 
to be greater than 1. 

dc.DrawLine(150, 130, 150, 250)
dc.DrawLine(155, 130, 155, 250)

Notice the two enclosing vertical lines. The distance between 
them is 5px. It is exactly the half of the current pen width.

![joinscaps.png](images/joinscaps.png)

Figure: Joins and Caps

### Gradients

In computer graphics, gradient is a smooth blending of shades from 
light to dark or from one colour to another. In 2D drawing programs 
and paint programs, gradients are used to create colorful backgrounds 
and special effects as well as to simulate lights and shadows. 

GradientFillLinear(self, rect, initialColour, destColour, nDirection=RIGHT)

This method fills the area specified by a rect with a linear 
gradient, starting from initialColour and eventually fading 
to destColour. The nDirection parameter specifies the
direction of the colour change; the default value is wx.EAST.

gradients.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws four rectangles filled
with gradients.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Gradients")
        self.Centre()

    def OnPaint(self, event):

        dc = wx.PaintDC(self)

        dc.GradientFillLinear((20, 20, 180, 40), '#ffec00', '#000000', wx.NORTH)
        dc.GradientFillLinear((20, 80, 180, 40), '#ffec00', '#000000', wx.SOUTH)
        dc.GradientFillLinear((20, 140, 180, 40), '#ffec00', '#000000', wx.EAST)
        dc.GradientFillLinear((20, 200, 180, 40), '#ffec00', '#000000', wx.WEST)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In the example, four rectangles are filled with gradients.

![gradients.png](images/gradients.png)

Figure: Gradients

### wx.Brush

Brush is an elementary graphics object. It is used to paint the 
background of graphics shapes, such as rectangles, ellipses or polygons. 

wxPython has the following built-in brush types:

  - wx.SOLID

  - wx.STIPPLE

  - wx.BDIAGONAL_HATCH

  - wx.CROSSDIAG_HATCH

  - wx.FDIAGONAL_HATCH

  - wx.CROSS_HATCH

  - wx.HORIZONTAL_HATCH

  - wx.VERTICAL_HATCH

  - wx.TRANSPARENT

brushes.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws eight rectangles filled
with different brushes.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Brushes")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.CROSS_HATCH))
        dc.DrawRectangle(10, 15, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.SOLID))
        dc.DrawRectangle(130, 15, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.BDIAGONAL_HATCH))
        dc.DrawRectangle(250, 15, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.CROSSDIAG_HATCH))
        dc.DrawRectangle(10, 105, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.FDIAGONAL_HATCH))
        dc.DrawRectangle(130, 105, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.HORIZONTAL_HATCH))
        dc.DrawRectangle(250, 105, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.VERTICAL_HATCH))
        dc.DrawRectangle(10, 195, 90, 60)

        dc.SetBrush(wx.Brush('#4c4c4c', wx.TRANSPARENT))
        dc.DrawRectangle(130, 195, 90, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

Eight different built-in brush types were used in the example.

![brushes.png](images/brushes.png)

Figure: Brushes

### Custom Patterns

We are not restricted to use predefined patterns. We can easily
create our own custom patterns. 

custom_patterns.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws three rectangles with custom
brush patterns.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Custom patterns")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        dc.SetPen(wx.Pen('#C7C3C3'))

        brush1 = wx.Brush(wx.Bitmap('pattern1.png'))
        dc.SetBrush(brush1)
        dc.DrawRectangle(10, 15, 90, 60)

        brush2 = wx.Brush(wx.Bitmap('pattern2.png'))
        dc.SetBrush(brush2)
        dc.DrawRectangle(130, 15, 90, 60)

        brush3 = wx.Brush(wx.Bitmap('pattern3.png'))
        dc.SetBrush(brush3)
        dc.DrawRectangle(250, 15, 90, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

We have created some small bitmaps. The bitmaps were created in Gimp. 

brush1 = wx.Brush(wx.Bitmap('pattern1.png'))
dc.SetBrush(brush1)
dc.DrawRectangle(10, 15, 90, 60)

A brush is created from a bitmap and set to the device context. It is used
to fill the inside of a rectangle. 

![custompatterns.png](images/custompatterns.png)

Figure: Custom Patterns

### Points

The simplest geometrical object is a point. It is a plain dot on the window.  

DrawPoint(self, x, y)

This method draws a point at x, y coordinates.

points.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws one thousand points
randomly on the window.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx
import random

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Points")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        dc.SetPen(wx.Pen('RED'))

        for i in range(1000):

            w, h = self.GetSize()
            x = random.randint(1, w-1)
            y = random.randint(1, h-1)
            dc.DrawPoint(x, y)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

A single point might be difficult to see, so we create 1000 points. 

dc.SetPen(wx.Pen('RED'))

Here we set the colour of the pen to red. 

w, h = self.GetSize()
x = random.randint(1, w-1)

The points are distributed randomly around the client area of the window. 
They are also distributed dynamically. If we resize the window, the points 
will be drawn randomly over a new client size. The randint(a, b) 
method returns a random integer in range [a, b], e.g. including both points.

![points.png](images/points.png)

Figure: drawing points

## Shapes

Shapes are more sophisticated geometrical objects.
We draw various geometrical shapes in the following example.

shapes.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws various shapes on
the window.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Shapes")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)
        dc.SetBrush(wx.Brush('#777'))
        dc.SetPen(wx.Pen("#777"))

        dc.DrawEllipse(20, 20, 90, 60)
        dc.DrawRoundedRectangle(130, 20, 90, 60, 10)
        dc.DrawArc(240, 40, 340, 40, 290, 20)

        dc.DrawRectangle(20, 120, 80, 50)
        dc.DrawPolygon(((130, 140), (180, 170), (180, 140), (220, 110), (140, 100)))
        dc.DrawSpline(((240, 170), (280, 170), (285, 110), (325, 110)))

        dc.DrawLines(((20, 260), (100, 260), (20, 210), (100, 210)))
        dc.DrawCircle(170, 230, 35)
        dc.DrawRectangle(250, 200, 60, 60)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In our example we have drawn an ellipse, a rounded rectangle, an arc, a 
rectangle, a polygon, splines, lines, a circle, and a square . 
A circle is a special kind of ellipse and a square is a special kind of rectangle. 

![shapes.png](images/shapes.png)

Figure: Shapes

## Regions

The device context can be divided into several parts called *regions*.
A region can be of any shape, such as rectangle or circle. With Union, 
Intersect, Substract and Xor operations 
we can create complex regions. Regions are used for outlining, filling, and clipping.

We can create regions in three ways. The easiest way is to create a 
rectangular region. More complex regions can be created from a list 
of points of from a bitmap.

Before we go to the regions, we will create a small example first. 
We divide the topic into several parts so that it is easier to understand. 
You may find it a good idea to revise your school math. 
[Here](http://en.wikipedia.org/wiki/Circle) we can 
find a good article.

lines.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program draws various shapes on
the window.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx
from math import hypot, sin, cos, pi

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle('Lines')
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)
        size_x, size_y = self.GetClientSize()
        dc.SetDeviceOrigin(size_x/2, size_y/2)

        radius = hypot(size_x/2, size_y/2)
        angle = 0

        while (angle &lt; 2*pi):
            x = radius*cos(angle)
            y = radius*sin(angle)
            dc.DrawLine((0, 0), (x, y))
            angle = angle + 2*pi/360

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In this example we draw 360 lines from the middle of the client area. 
The distance between two lines is 1 degree. We create an interesting figure.

import wx
from math import hypot, sin, cos, pi

We need three mathematical functions and one constant from the math module.

dc.SetDeviceOrigin(size_x/2, size_y/2)

The method SetDeviceOrigin() creates a new beginning of the 
coordinate system. We place it into the middle of the 
client area. By repositioning the coordinate system, we make our 
drawing less complicated.

radius = hypot(size_x/2, size_y/2)

Here we get the Hypotenuse. It is the longest line, we can draw from
the middle of the client area. It is the length of the line that should 
be drawn from the beginning into the corner of the window. This way most 
of the lines are not drawn fully. The overlapping parts are not visible. 
see [Hypotenuse](http://en.wikipedia.org/wiki/Hypotenuse).

x = radius*cos(angle)
y = radius*sin(angle)

These are parametric functions. They are used to find [x, y] points on 
the curve. All 360 lines are drawn from the beginning of the coordinate 
system up to the points on the circle. 

![lines.png](images/lines.png)

Figure: Lines

## Clipping

Clipping is restricting drawing to a certain area. Clipping is 
often used to create effects and to improve performance of the application.
We restrict drawing to a certain region with the 
SetClippingRegionAsRegion() method.

In the following example we will modify and enhance our previous program.

star.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program demonstrates a clipping operation
when drawing a star object.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx
from math import hypot, sin, cos, pi

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.SetTitle("Star")
        self.Centre()

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        dc.SetPen(wx.Pen('#424242'))
        size_x, size_y = self.GetClientSize()
        dc.SetDeviceOrigin(size_x/2, size_y/2)

        points = (((0, 85), (75, 75), (100, 10), (125, 75), (200, 85),
            (150, 125), (160, 190), (100, 150), (40, 190), (50, 125)))

        region = wx.Region(points)
        dc.SetDeviceClippingRegion(region)

        radius = hypot(size_x/2, size_y/2)
        angle = 0

        while (angle &lt; 2*pi):

            x = radius*cos(angle)
            y = radius*sin(angle)
            dc.DrawLine((0, 0), (x, y))
            angle = angle + 2*pi/360

        dc.DestroyClippingRegion()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

We draw again all the 360 lines. But this time, only a portion of the 
client aren is drawn. The region that we restrict our drawing to is a 
star object.

region = wx.Region(points)
dc.SetDeviceClippingRegion(region)

We create a region from the list of points.  The SetDeviceClippingRegion()
method restricts the drawing to the specified region. In our case it 
is a star object.

dc.DestroyClippingRegion()

We must destroy the clipping region.

![star.png](images/star.png)

Figure: Star

## Region operations

Regions can be combined to create more complex shapes. We can use four set 
operations: union, intersect, substract, xor. 

The following example shows all four operations in action.

region_operations.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program performs set operations on regions.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

         self.Bind(wx.EVT_PAINT, self.OnPaint)

         self.SetTitle("Regions")
         self.Centre()

    def OnPaint(self, e):

         dc = wx.PaintDC(self)
         dc.SetPen(wx.Pen('#d4d4d4'))

         dc.DrawRectangle(20, 20, 50, 50)
         dc.DrawRectangle(30, 40, 50, 50)

         dc.SetBrush(wx.Brush('#ffffff'))
         dc.DrawRectangle(100, 20, 50, 50)
         dc.DrawRectangle(110, 40, 50, 50)

         region1 = wx.Region(100, 20, 50, 50)
         region2 = wx.Region(110, 40, 50, 50)
         region1.Intersect(region2)

         rect = region1.GetBox()
         dc.SetDeviceClippingRegion(region1)
         dc.SetBrush(wx.Brush('#ff0000'))
         dc.DrawRectangle(rect)
         dc.DestroyClippingRegion()

         dc.SetBrush(wx.Brush('#ffffff'))
         dc.DrawRectangle(180, 20, 50, 50)
         dc.DrawRectangle(190, 40, 50, 50)

         region1 = wx.Region(180, 20, 50, 50)
         region2 = wx.Region(190, 40, 50, 50)
         region1.Union(region2)
         dc.SetDeviceClippingRegion(region1)

         rect = region1.GetBox()
         dc.SetBrush(wx.Brush('#fa8e00'))
         dc.DrawRectangle(rect)
         dc.DestroyClippingRegion()

         dc.SetBrush(wx.Brush('#ffffff'))
         dc.DrawRectangle(20, 120, 50, 50)
         dc.DrawRectangle(30, 140, 50, 50)
         region1 = wx.Region(20, 120, 50, 50)
         region2 = wx.Region(30, 140, 50, 50)
         region1.Xor(region2)

         rect = region1.GetBox()
         dc.SetDeviceClippingRegion(region1)
         dc.SetBrush(wx.Brush('#619e1b'))
         dc.DrawRectangle(rect)
         dc.DestroyClippingRegion()

         dc.SetBrush(wx.Brush('#ffffff'))
         dc.DrawRectangle(100, 120, 50, 50)
         dc.DrawRectangle(110, 140, 50, 50)
         region1 = wx.Region(100, 120, 50, 50)
         region2 = wx.Region(110, 140, 50, 50)
         region1.Subtract(region2)

         rect = region1.GetBox()
         dc.SetDeviceClippingRegion(region1)
         dc.SetBrush(wx.Brush('#715b33'))
         dc.DrawRectangle(rect)
         dc.DestroyClippingRegion()

         dc.SetBrush(wx.Brush('#ffffff'))
         dc.DrawRectangle(180, 120, 50, 50)
         dc.DrawRectangle(190, 140, 50, 50)
         region1 = wx.Region(180, 120, 50, 50)
         region2 = wx.Region(190, 140, 50, 50)
         region2.Subtract(region1)

         rect = region2.GetBox()
         dc.SetDeviceClippingRegion(region2)
         dc.SetBrush(wx.Brush('#0d0060'))
         dc.DrawRectangle(rect)
         dc.DestroyClippingRegion()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In the example, we present six region set operations.    

 region1 = wx.Region(100, 20, 50, 50)
 region2 = wx.Region(110, 40, 50, 50)
 region1.Intersect(region2)

This code performs intersection operation on two regions.

![region_operations.png](images/region_operations.png)

Figure: Set operations on regions

## Mapping modes

The mapping mode defines the unit of measure used to transform page-space units 
into device-space units, and also defines the orientation of the device's 
x and y axes.    

### Speak in English, measure in metric

The English language became the global language for communication. 
So did the metric system become the global system in measuremet. 
According to this wikipedia [article](http://en.wikipedia.org/wiki/Metric_system), 
there are only three exceptions. The USA, Liberia and Myanmar. 
For example, Americans use Fahrenheits to measure temperature, 
gallons to tank their cars or pounds to weigh loads. 

Even though we in Europe use the metric system, there are still exceptions. 
The USA is dominating the IT and we are importing their standards.
So we also say that we have a 17 Inch monitor. Graphics can be put into a 
file, displayed on the screen of a monitor or other device (cameras, videocameras, mobile phones) 
or printed with a printer. Paper size can be set in millimeters, points or inches, 
the resolution of a screen is in pixels, the quality of a text is determined by the 
number of dots per inch. We have also dots, bits or samples. This is one of the 
reasons we have *logical* and *device* units. 

## Logical and device units

If we draw text or geometrical primitives on the client area, we position 
them using logical units. 

If we want to draw some text, we provide the text parameter and the x, y 
positions. x, y are in logical units. 
The device then draws the text in device units. Logical and device units 
may be the same, or they may differ. 
Logical units are used by people (millimeters), device units are are 
native to a particular device. For example a native device unit 
for a screen is pixel. The native device unit for the 
HEWLETT PACKARD LaserJet 1022 is 1200 dpi (dots per inch). 

So far we have talked about various measurement units. The *mapping mode* 
of the device is a way how  to convert logical units to device units. wxPython
has the following mapping modes:

Mapping Mode
Logical Unit

wx.MM_TEXT 1 pixel

wx.MM_METRIC1 millimeter

wx.MM_LOMETRIC 1/10 of a millimeter

wx.MM_POINTS1 point, 1/72 of an inch

wx.MM_TWIPS1/20 of a point or 1/1440 of an inch

The default mapping mode is wx.MM_TEXT. In this mode, the logical unit is 
the same as the device unit. When people position object on a screen or 
design a web page, they think usually in pixels. Web designers create 
three column pages and these columns are set in pixels. The lowest common 
denominator for a page is often 800 px etc. This thinking is natural as 
we know our monitors have e.g. 1024x768 pxs. We are not going to do 
convertions, rather we are accustomed to think in pixels. 
If we want to draw a structure in millimeters, we can use the two metric 
mapping modes. Drawing directly in millimeters is too thick for a screen, 
that's why we have the wx.MM_LOMETRIC mapping mode. 

To set a different mapping mode, we use the SetMapMode() method. 

## Ruler example

The ruler measures screen objects in pixels.

ruler.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program creates a ruler.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

RW = 701 # ruler width
RM = 10  # ruler margin
RH = 80  # ruler height

class Example(wx.Frame):

    def __init__(self, parent):
        wx.Frame.__init__(self, parent, size=(RW + 2*RM, RH),
            style=wx.FRAME_NO_TASKBAR | wx.NO_BORDER | wx.STAY_ON_TOP)
        self.font = wx.Font(7, wx.FONTFAMILY_DEFAULT, wx.FONTSTYLE_NORMAL,
            wx.FONTWEIGHT_BOLD, False, 'Courier 10 Pitch')

        self.InitUI()

    def InitUI(self):

        self.Bind(wx.EVT_PAINT, self.OnPaint)
        self.Bind(wx.EVT_LEFT_DOWN, self.OnLeftDown)
        self.Bind(wx.EVT_LEFT_UP, self.OnLeftUp)
        self.Bind(wx.EVT_RIGHT_DOWN, self.OnRightDown)
        self.Bind(wx.EVT_MOTION, self.OnMouseMove)

        self.Centre()
        self.Show(True)

    def OnPaint(self, e):

        dc = wx.PaintDC(self)

        brush = wx.Brush(wx.Bitmap('granite.png'))
        dc.SetBrush(brush)
        dc.DrawRectangle(0, 0, RW+2*RM, RH)
        dc.SetFont(self.font)

        dc.SetPen(wx.Pen('#F8FF25'))
        dc.SetTextForeground('#F8FF25')

        for i in range(RW):

            if not (i % 100):

                dc.DrawLine(i+RM, 0, i+RM, 10)
                w, h = dc.GetTextExtent(str(i))
                dc.DrawText(str(i), i+RM-w/2, 11)

            elif not (i % 20):

                dc.DrawLine(i+RM, 0, i+RM, 8)

            elif not (i % 2):

                dc.DrawLine(i+RM, 0, i+RM, 4)

    def OnLeftDown(self, e):

        x, y = self.ClientToScreen(e.GetPosition())
        ox, oy = self.GetPosition()

        dx = x - ox
        dy = y - oy

        self.delta = ((dx, dy))

    def OnMouseMove(self, e):

        if e.Dragging() and e.LeftIsDown():

            self.SetCursor(wx.Cursor(wx.CURSOR_HAND))

            x, y = self.ClientToScreen(e.GetPosition())
            fp = (x - self.delta[0], y - self.delta[1])
            self.Move(fp)

    def OnLeftUp(self, e):

        self.SetCursor(wx.Cursor(wx.CURSOR_ARROW))

    def OnRightDown(self, e):

        self.Close()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In this example we create a ruler. This ruler measures screen 
objects in pixels. We left the default mapping mode, which 
is wx.MM_TEXT. As we have already mentioned, this mode has 
the same logical and device units. In our case, these are pixels.

def __init__(self, parent):
    wx.Frame.__init__(self, parent, size=(RW + 2*RM, RH),
        style=wx.FRAME_NO_TASKBAR | wx.NO_BORDER | wx.STAY_ON_TOP)

We have created a borderless window. The ruler is 721 px wide: 
RW + 2*RM = 701 + 20 = 721. The ruler shows 700 numbers;
0 ... 700  is 701 pixels. A ruler has a margin on both sides, 2*10 is 20 pixels. 
Together it makes 721 pixels.

brush = wx.Brush(wx.Bitmap('granite.png'))
dc.SetBrush(brush)
dc.DrawRectangle(0, 0, RW+2*RM, RH)

Here we draw a custom pattern onto the window. We have used 
a predefined pattern available in the Gimp. It is called granite. 

w, h = dc.GetTextExtent(str(i))
dc.DrawText(str(i), i+RM-w/2, 11)

These lines ensure that we align the text correctly. 
The GetTextExtent() method returns the width and the height of the text. 

We do not have a border around our window. So we must handle moving manually.
The OnLeftDown() and the OnMouseMove() methods 
enable us to move the ruler. 

def OnLeftDown(self, e):

    x, y = self.ClientToScreen(e.GetPosition())
    ox, oy = self.GetPosition()

    dx = x - ox
    dy = y - oy

    self.delta = ((dx, dy))

In the OnLeftDown() method, we determine the window and mouse
cursor coordinates; the delta value is a distance of a mouse pointer from 
the top-left corner of our window. We need the delta value to move the window.

def OnMouseMove(self, e):

    if e.Dragging() and e.LeftIsDown():

        self.SetCursor(wx.Cursor(wx.CURSOR_HAND))

        x, y = self.ClientToScreen(e.GetPosition())
        fp = (x - self.delta[0], y - self.delta[1])
        self.Move(fp)

The code is executed when we simultanously drag the window and press the left
mouse button. In the code block we change the mouse cursor with SetCursor()
and move the window with Move() method. The delta value is used
to get the distance.

def OnLeftUp(self, e):

    self.SetCursor(wx.Cursor(wx.CURSOR_ARROW))

When we release the left mouse button, we change the cursor back to the arrow. 

def OnRightDown(self, e):

    self.Close()

The window is closed by right-clicking on the window area.

![ruler.png](images/ruler.png)

Figure: Ruler example

In this chapter we have worked with graphics in wxPython.

 

[Contents](..)  
[Previous](../draganddrop/)
[Next](../customwidgets/)