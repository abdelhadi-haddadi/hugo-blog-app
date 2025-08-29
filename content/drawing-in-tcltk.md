+++
title = "Drawing in Tcl/Tk"
date = 2025-08-29T19:57:32.111+01:00
draft = false
description = "In this part of the Tcl/Tk tutorial, we do some drawing. Drawing in Tk in done on the Canvase widget."
image = "images/colours.png"
imageBig = "images/colours.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)
[Next](../nibbles/)

# Drawing in Tcl/Tk

last modified October 18, 2023

In this part of the Tcl/Tk tutorial we do some drawing. Drawing in Tk is
done on the canvas widget. The canvas is a high level facility for 
graphics in Tk.

It can be used to create charts, custom widgets or to create games.

## Colours

A colour is an object representing a combination of 
Red, Green, and Blue (RGB) intensity values. 

colours.tcl
  

#!/usr/bin/wish

# ZetCode Tcl Tk tutorial
#
# This program draws three
# rectangles filled with different
# colours.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

canvas .can
.can create rect 30 10 120 80 \
    -outline #fb0 -fill #fb0
.can create rect 150 10 240 80 \
    -outline #f50 -fill #f50
.can create rect 270 10 370 80 \
    -outline #05f -fill #05f
pack .can

wm title . "Colours"
wm geometry . 400x100+300+300

In the code example, we draw three rectangles and fill them with
different colour values.

canvas .can

We create the canvas widget.

.can create rect 30 10 120 80 \
    -outline #fb0 -fill #fb0

With the create command, we create a new rectangle item
on the canvas. The first four parameters are the x, y coordinates
of the two bounding points: the top-left and the bottom-right. 
With the -outline option we control the colour of 
the outline of the rectangle. Likewise, the -fill option
provides a colour for the inside of the rectangle. 

![colours.png](images/colours.png)

Figure: Colours

## Shapes

We can draw various shapes on the canvas. 
The following code example will show some of them. 

shapes.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this script, we draw basic 
# shapes on the canvas.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

canvas .can
.can create oval 10 10 80 80 -outline #777 \
    -fill #777 
.can create oval 110 10 210 80 -outline #777 \
    -fill #777 
.can create rect 230 10 290 60 -outline #777 \
    -fill #777 
.can create arc 30 200 90 100 -start 0 -extent 210 \
    -outline #777 -fill #777 
    
set points  [ list 150 100 200 120 240 180 210 \
    200 150 150 100 200 ]
.can create polygon $points -outline #777 \
    -fill #777 
pack .can

wm title . "shapes" 
wm geometry . 350x250+300+300

We draw five different shapes on the window: a circle, an ellipse, 
a rectangle, an arc, and a polygon. Outlines and
insides are drawn in the same gray colour.

.can create oval 10 10 80 80 -outline #777 \
    -fill #777 

The create oval creates a circle. The first four parameters 
are the bounding box coordinates of the circle. In other words, they 
are x, y coordinates of the top-left and bottom-right points of the box, 
in which the circle is drawn. 

.can create rect 230 10 290 60 -outline #777 \
    -fill #777

We create a rectangle item. The coordinates are again the bounding box 
of the rectangle to be drawn. 

.can create arc 30 200 90 100 -start 0 -extent 210 \
    -outline #777 -fill #777 

This code line creates an arc. An arc is a part of the circumference of
the circle. We provide the bounding box. The -start option 
is the start angle of the arc. The -extent is the angle size.

set points  [ list 150 100 200 120 240 180 210 \
    200 150 150 100 200 ]
.can create polygon $points -outline #777 \
    -fill #777 

A polygon is created. It is a shape with multiple corners. To create a
polygon in Tk, we provide the list of polygon coordinates to the
create polygon command.

![shapes.png](images/shapes.png)

Figure: shapes

## Drawing image

In the following example we create an image item on the canvas.

draw_image.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# This program draws an image
# on the canvas widget.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

package require Img

image create photo img -file "tatras.jpg"
set height [image height img]
set width [image width img]

canvas .can -height $height -width $width
.can create image 0 0 -anchor nw -image img
pack .can

wm title . "High Tatras" 
wm geometry . +300+300

We display an image on the canvas. 

image create photo img -file "tatras.jpg"

We create a photo image from a JPG image located
in the current working directory.

set height [image height img]
set width [image width img]

We get the height and width of the image. 

canvas .can -height $height -width $width

We create the canvas widget. It takes the size of the image
into account. 

.can create image 0 0 -anchor nw -image img

We use the create image command to create an image item on the
canvas. To show the whole image, it is anchored to the north and to the west.
The -image option provides the photo image to display.

## Drawing text

In the last example, we are going to draw text
on the window. 

lyrics.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this script, we draw text
# on the window.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

canvas .can
.can create text 10 30 -anchor w -font Purisa \
    -text "Most relationships seem so transitory"
.can create text 10 60 -anchor w -font Purisa \
    -text "They're good but not the permanent one"
.can create text 10 110 -anchor w -font Purisa \
    -text "Who doesn't long for someone to hold"
.can create text 10 140 -anchor w -font Purisa \
    -text "Who knows how to love without being told"
.can create text 10 170 -anchor w -font Purisa \
    -text "Somebody tell me why I'm on my own"
.can create text 10 200 -anchor w -font Purisa \
     -text "If there's a soulmate for everyone"
pack .can

wm title . "lyrics"
wm geometry . 430x250+300+300

We draw a lyrics of a song on the window. 

.can create text 10 30 -anchor w -font Purisa \
    -text "Most relationships seem so transitory"

The first two parameters are the x, y coordinates of the center point of the
text. If we anchor the text item to the west, the text starts from this
position. The -font option provides the font of the text and the
-text option is the text to be displayed. 

![lyrics.png](images/lyrics.png)

Figure: Drawing text

In this part of the Tcl/Tk tutorial, we did some drawing.

[Contents](..) 
[Previous](../dialogs/)
[Next](../nibbles/)