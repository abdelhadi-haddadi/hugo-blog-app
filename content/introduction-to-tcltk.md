+++
title = "Introduction to Tcl/Tk"
date = 2025-08-29T19:57:33.308+01:00
draft = false
description = "This part of the Tcl/Tk tutorial is an introduction to Tcl/Tk."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../layout/)

# Introduction to Tcl/Tk

last modified October 18, 2023

In this part of the Tcl/Tk tutorial, we introduce the Tk toolkit and
create our first programs.

The purpose of this tutorial is to get you started with the Tk toolkit with the
Tcl language. 

## Tk

*Tk* is an open source, cross-platform widget toolkit that provides a
library of basic elements for building a graphical user interface (GUI). The
first public release of Tk was in 1991. Tk is an extension for the Tcl language.
This means that Tk extends the Tcl language with additional commands for
building user interfaces. There are bindings for several other languages
including Ada, Perl, Ruby, Python, or Common Lisp. The Tk library is often
referred with its main language as Tcl/Tk.

## Tcl

 
 
 
*Tcl* is a string based scripting language. The source code is compiled into 
bytecode, which is later interpreted by the Tcl interpreter. It was created by 
*John Osterhout* in 1988. The purpose was to create a language which is 
easily embeddable into applications. But it is often used outside its original 
area. The language  is commonly used for rapid prototyping, scripted applications, 
GUIs, or testing. The Tcl stands for tool command language, where
the source code of a Tcl script consists of commands. 

 
 
 
Tcl is a procedural language. It has some functional features. 
 

 
The official web site for both Tcl and Tk is [tcl.tk](http://tcl.tk) 

 

## Simple example

The first example shows a basic window on the screen. 

simple.tcl
  

#!/usr/bin/wish

frame .fr

wm title . Simple
wm geometry . 350x250+300+300

While this code is very small, the application window can do quite a lot. It can
be resized, maximised, or minimised. All the complexity that comes with it has
been hidden from the application programmer. 

#!/usr/bin/wish

The wish is a Tcl/Tk interpreter. It understands both
Tcl and Tk commands. 

frame .fr   

The frame widget is created. The frame is a Tk command to 
create a frame widget. The argument to the command is the widget path name.
The widget path name begins with a dot character. This character stands for
the main application window. In Tk widgets form a hierarchy. The .fr
means that the frame widget is placed inside the main application window.
Widget path is a string starting with a dot and consisting of several names 
separated by dots. These names are widget names that comprise widget's hierarchy.

wm title . Simple

The wm command is used to interact with a window manager. 
This code line sets a window title.

wm geometry . 350x250+300+300

Here we set the size for the window and place it on the screen. The
first two numbers specify the width and height of the window. The third
and fourth parameters are the x, y coordinates on the monitor screen.

![simple.png](images/simple.png)

Figure: Simple window

## Centering window

This script centers a window on the screen. 

center.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this script, we center a window
# on the screen.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

set width 350
set height 250
set x [expr { ( [winfo vrootwidth  .] - $width  ) / 2 }]
set y [expr { ( [winfo vrootheight .] - $height ) / 2 }]

wm title . "Center" 
wm geometry . ${width}x${height}+${x}+${y}

We need to have the size of the window and the size of the screen 
to position the window in the center of the monitor screen. 

set width 350
set height 250

These are the width and height values of the application window.

set x [expr { ( [winfo vrootwidth  .] - $width  ) / 2 }]
set y [expr { ( [winfo vrootheight .] - $height ) / 2 }]

Given its width and height, we determine the x, y 
coordinates for a centered window.

wm geometry . ${width}x${height}+${x}+${y}

The window is placed on the screen.

## Quit button

In the last example of this section, we create a quit button. 
When we press this button, the application terminates. 

quit_button.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# This program creates a quit
# button. When we press the button,
# the application terminates. 
#
# Author: Jan Bodnar
# Website: www.zetcode.com

button .hello -text "Quit" -command { exit }
place .hello -x 50 -y 50 

wm title . "Quit button" 
wm geometry . 350x250+300+300

We position a button on the window. Clicking on the button will
terminate the application.

button .hello -text "Quit" -command { exit }

The button widget is created. The label for the button
is provided with the -text option. The -command 
option specifies the procedure to be executed, when the button is pressed. 
In our case the application is terminated with the built-in exit command. 

place .hello -x 50 -y 50 

We use the place geometry manager to position the button
in absolute coordinates, from the top-left corner of the root window.

![quitbutton.png](images/quitbutton.png)

Figure: Quit button

## Reference

The [wikipedia.org](http://wikipedia.org) and [tcl.tk](http://tcl.tk)
were used to create this tutorial.

This section was an introduction to the Tcl/Tk.

[Contents](..) 
[Next](../layout/)