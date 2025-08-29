+++
title = "Introduction"
date = 2025-08-29T19:54:49.804+01:00
draft = false
description = "This part of the Java 2D tutorial is an introduction to Java 2D."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../basicdrawing/)

# Introduction

last modified July 17, 2023

In this part of the Java 2D tutorial we introduce the Java 2D technology. 

## About

This is Java 2D tutorial. It is aimed at beginners. This tutorial will teach you
basics of programming in Java 2D. The images used in this tutorial can be
downloaded [here](/img/gfx/java2d/images.zip).

## Vector graphics

There are two different computer graphics: vector and raster graphics. Raster
(bitmap) graphics represent images as a collection of pixels. Vector graphics is
the use of geometrical primitives such as points, lines, curves or polygons to
represent images. These primitives are created using mathematical equations.
Both types of computer graphics have advantages and disadvantages. The
advantages of vector graphics are:

- smaller size

- ability to zoom indefinitely

- moving, scaling, filling, or rotating does not degrade the quality of an image

The *Java 2D API* provides tools to work with both 
vector and raster graphics. 

## Java 2D API

*Java 2D* is an API for drawing two-dimensional graphics 
using the Java programming language. 

The Java 2D API provides the following capabilities:

- A uniform rendering model for display devices and printers

- A wide range of geometric primitives

- Hit detection on shapes, text, and images

- A compositing model

- Enhanced color support

- Printing documents
 
- Control of the quality of the rendering

The Java 2D API enhances the graphics, text, and imaging capabilities of the 
Abstract Windowing Toolkit (AWT). *AWT* was the original toolkit for creating 
user interfaces and graphics in Java. For compatibility purposes, Java 2D
is technically a superset of the AWT toolkit. 

Java 2D is a powerful technology. It can be used to create rich user interfaces, 
games, animations, multimedia applications, or various special effects. 

## The paint mechanism

The custom painting code should be placed in the paintComponent method. 
This method is invoked when it is time to paint. The paint subsystem first calls
the paint method. This method invokes the following three methods:

- paintComponent()

- paintBorder()

- paintChildren()

In specific cases, we might want to override the paintBorder or the 
paintChildren methods. In most cases, we override the paintComponent 
method. 

## The Graphics object

The paintComponent's sole parameter is a Graphics object. It exposes a
number of methods for drawing 2D shapes and obtaining information about the
application's graphics environment. The Graphics2D class extends the Graphics
class to provide more sophisticated control over geometry, coordinate transformations, 
color management, and text layout.

The Graphics object is initialized before it is passed to the
paintComponent method, and then it is turned over to the
paintBorder and paintChildren methods. This reuse
improves performance but it may lead to problems if the painting code
permanently changes the Graphics state. Therefore, we must either
restore the original settings or work with a copy of the Graphics
object. The copy is created with the Graphics's create
method; it must be later released with the dispose method.

In practical terms, the copy of the Graphics object does not need
to be created if we set the following properties: font, colour, and rendering
hints. For all other properties, (especially clip, composite operations, and
transformations), we must create a copy of the Graphics
object and later dispose it.

## Simple Java 2D example

We create a simple example of a Java 2D application. 

com/zetcode/SimpleEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;
        g2d.drawString("Java 2D", 50, 50);
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class BasicEx extends JFrame {

    public BasicEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Simple Java 2D example");
        setSize(300, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                BasicEx ex = new BasicEx();
                ex.setVisible(true);
            }
        });
    }
}

We draw a text on a JPanel component. Much of the code repeats 
throughout the Java 2D tutorial. 

class Surface extends JPanel {
...
}

We create a Surface class. This class will be our drawing panel. It inherits
from the JPanel component.

Graphics2D g2d = (Graphics2D) g;

The Graphics2D class is a fundamental class for 
rendering graphics in Java 2D. It represents number of devices in a generic way. 
It extends the old Graphics object. This casting is necessary to 
get access to all advanced operations. 

g2d.drawString("Java 2D", 50, 50);
 

Here we draw a string on the panel with the drawString method.

@Override
public void paintComponent(Graphics g) {

    super.paintComponent(g);
    doDrawing(g);
}

Custom painting is performed inside the paintComponent method, 
which we override. The super.paintComponent method calls the method 
of the parent class. It does some necessary work to prepare a component for drawing. 
We delegate the drawing to the doDrawing method.

private void initUI() {
...
}

The initUI method initiates the user interface of the application.

add(new Surface());

The surface is added to the JFrame container. 

EventQueue.invokeLater(new Runnable() {

    @Override
    public void run() {
        BasicEx ex = new BasicEx();
        ex.setVisible(true);
    }
});

We create an instance of our code example and make it visible on the screen. 
The invokeLater method places the application on the Swing Event Queue. It is 
used to ensure that all UI updates are concurrency-safe. 

![simple.png](images/simple.png)

Figure: Simple Java 2D example

## Reference

The following resources were used to create this tutorial:

Java Platform, 
Standard Edition 7 API Specification
- [JH Labs](http://www.jhlabs.com/java/java2d/reflections/index.html)

Performing Convolution Operations
- Java 2D demo code examples

This part of the Java 2D tutorial was an introduction to the Java 2D library.

[Contents](..)
[Next](../basicdrawing/)