+++
title = "Introduction to PyCairo"
date = 2025-08-29T19:54:56.839+01:00
draft = false
description = "This is an introductory chapter of the PyCairo tutorial."
image = ""
imageBig = ""
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../backends/)

# Introduction to PyCairo

last modified July 17, 2023

This is PyCairo tutorial. This tutorial will teach you the basics and some
advanced topics of the Cairo 2D library with the Python language. In most
examples we use the Python GTK backend to produce our output. Images used in
this tutorial can be downloaded [here](/img/gfx/pycairo/images.zip).

## Computer graphics

There are two different computer graphics: vector and raster graphics. 
*Raster graphics* represents images as a collection of pixels. 
*Vector graphics* is the use of geometric primitives such as points, 
lines, curves, or polygons to represent images. These primitives are created 
using mathematical equations. 

Both types of computer graphics have advantages and disadvantages. The advantages 
of vector graphics over raster are:

- smaller size

- ability to zoom indefinitely

- moving, scaling, filling, and rotating does not degrade the quality of an image 

## Cairo

Cairo is a library for creating 2D vector graphics. It is written in the C 
programming language. Bindings for other computer languages exist, including 
Python, Perl, C++, C#, or Java. Cairo is a multiplatform library; 
it works on Linux, BSDs, Windows, and OSX.

Cairo supports various backends. Backends are output devices for displaying
the created graphics.

- X Window System

- Win32 GDI

- Mac OS X Quartz

- PNG

- PDF

- PostScript

- SVG

This means that we can use the library to draw on Windows, Linux, 
Windows, OSX and we can use the library to create
PNG images, PDF files, PostScript files, and SVG files.

We can compare the Cairo library to the *GDI+* library on Windows 
OS and the *Quartz 2D* on Mac OS. Cairo is an open source software 
library. From version 2.8, Cairo is part of the *GTK* system.

## Definitions

Here we provide some useful definitions. To do some drawing in PyCairo, we 
must first create a *drawing context*. The drawing context holds all of the 
graphics state parameters that describe how drawing is to be done. This includes 
information such as line width, color, the surface to draw to, and many other things. 
It allows the actual drawing functions to take fewer arguments to simplify the interface.

A *path* is a collection of points used to create primitive shapes such as lines, arcs,
and curves. There are two kinds of paths: open and closed paths. In a closed path, 
starting and ending points meet. In an open path, starting and ending point do not meet. 
In PyCairo, we start with an empty path. First, we define a path and then we make them 
visible by stroking and/or filling them. After each stroke or fill 
method call, the path is emptied. We have to define a new path. If we want to
keep the existing path for later drawing, we can use the stroke_preserve
and fill_preserve methods. 
A path is made of subpaths.

A *source* is the paint we use in drawing. We can compare the source to a pen or ink 
that we use to draw the outlines and fill the shapes. There are four kinds of basic sources: 
colors, gradients, patterns, and images.

A *surface* is a destination that we are drawing to. We can render 
documents using the PDF or PostScript surfaces, directly draw to a platform 
via the Xlib and Win32 surfaces.

Before the source is applied to the surface, it is filtered first. The 
*mask* is used as a filter. It determines where the source is applied 
and where not. Opaque parts of the mask allow to copy the source. Transparent 
parts do not let to copy the source to the surface.

A *pattern* represents a source when drawing onto a surface. In PyCairo, a 
pattern is something that you can read from and that is used as the source or mask of 
a drawing operation. Patterns can be solid, surface-based, or gradients.

## Sources

To create this tutorial, we have used the following materials. The 
[Apple Cocoa drawing guide](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/CocoaDrawingGuide/Introduction/Introduction.html), 
the [PyCairo reference](http://cairographics.org/documentation/pycairo/2/index.html), and the
[Cairo documentation](http://cairographics.org/documentation/).

[Contents](..) 
[Next](../backends/)