+++
title = "Shapes and fills"
date = 2025-08-29T19:54:51.257+01:00
draft = false
description = "In this part of the Java 2D tutorial, we work with shapes and fills."
image = "images/basicshapes.png"
imageBig = "images/basicshapes.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../basicdrawing/)
[Next](../transparency/)

# Shapes and fills

last modified July 17, 2023

In this part of the Java 2D tutorial, we create some basic and more 
advanced shapes. We fill shapes with solid colours, gradients, 
and textures.

## Basic shapes

First we draw some basic Java 2D shapes. 

com/zetcode/BasicShapes.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.Ellipse2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {
    
    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setPaint(new Color(150, 150, 150));

        RenderingHints rh = new RenderingHints(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
               RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        g2d.fillRect(30, 20, 50, 50);
        g2d.fillRect(120, 20, 90, 60);
        g2d.fillRoundRect(250, 20, 70, 60, 25, 25);

        g2d.fill(new Ellipse2D.Double(10, 100, 80, 100));
        g2d.fillArc(120, 130, 110, 100, 5, 150);
        g2d.fillOval(270, 130, 50, 50);
   } 

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);
        doDrawing(g);
    }    
}

public class BasicShapesEx extends JFrame {

    public BasicShapesEx() {

        initUI();
    }
    
    private void initUI() {
        
        add(new Surface());
        
        setTitle("Basic shapes");
        setSize(350, 250);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
        
            @Override
            public void run() {
                BasicShapesEx ex = new BasicShapesEx();
                ex.setVisible(true);
            }
        });
    }
}

In this example, we draw six basic shapes on the panel:
a square, a rectangle, a rounded rectangle, an ellipse, an arc, 
and a circle. 

g2d.setPaint(new Color(150, 150, 150));

The shapes will be drawn in a gray background.

g2d.fillRect(20, 20, 50, 50);
g2d.fillRect(120, 20, 90, 60);

The fillRect method is used to draw both a 
rectangle and a square. The first two parameters are 
x, y coordinates of a shape to be drawn. The last two parameters are 
the width and the height of the shape. 

g2d.fillRoundRect(250, 20, 70, 60, 25, 25);

Here we create a rounded rectangle. The last two parameters are the horizontal 
and vertical diameters of the arc at the four corners.

g2d.fill(new Ellipse2D.Double(10, 100, 80, 100));

The fill method draws the interior of the given shape—an ellipse.

g2d.fillArc(120, 130, 110, 100, 5, 150);

The fillArc method fills a circular or elliptical arc covering the 
specified rectangle. An arc is a portion of the circumference of a circle.

g2d.fillOval(270, 130, 50, 50);

A circle is drawn using the fillOval method.

![basicshapes.png](images/basicshapes.png)

Figure: Basic shapes

## General path

More complex shapes can be constructed with GeneralPath. 
It represents a geometric path constructed from straight lines, 
and quadratic and cubic Bézier curves. 

The following example creates a star shape with this class. 

com/zetcode/StarEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.GeneralPath;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private final double points[][] = { 
        { 0, 85 }, { 75, 75 }, { 100, 10 }, { 125, 75 }, 
        { 200, 85 }, { 150, 125 }, { 160, 190 }, { 100, 150 }, 
        { 40, 190 }, { 50, 125 }, { 0, 85 } 
    };
    
    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                             RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.setRenderingHint(RenderingHints.KEY_RENDERING,
                             RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setPaint(Color.gray);
        g2d.translate(25, 5);

        GeneralPath star = new GeneralPath();

        star.moveTo(points[0][0], points[0][1]);

        for (int k = 1; k &lt; points.length; k++)
            star.lineTo(points[k][0], points[k][1]);

        star.closePath();
        g2d.fill(star);        
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        
        doDrawing(g);
    }
}

public class StarEx extends JFrame {
    
    public StarEx() {

        initUI();
    }    
    
    private void initUI() {
        
        add(new Surface());
        
        setTitle("Star");
        setSize(350, 250);
        setLocationRelativeTo(null);           
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            
            @Override
            public void run() {
                StarEx ex = new StarEx();
                ex.setVisible(true);
            }
        });
    }    
}

We create a star from a series of points.

private final double points[][] = { 
    { 0, 85 }, { 75, 75 }, { 100, 10 }, { 125, 75 }, 
    { 200, 85 }, { 150, 125 }, { 160, 190 }, { 100, 150 }, 
    { 40, 190 }, { 50, 125 }, { 0, 85 } 
};

These are the coordinates of the star. 

GeneralPath star = new GeneralPath();

Here we instantiate the GeneralPath class. 

star.moveTo(points[0][0], points[0][1]);

We move to the initial coordinate of the GeneralPath.

for (int k = 1; k &lt; points.length; k++)
    star.lineTo(points[k][0], points[k][1]);

Here we connect all the coordinates of the star. 

star.closePath();
g2d.fill(star);

We close the path and fill the interior of the star.

![star.png](images/star.png)

Figure: Star

## Areas

Another way to create complex shapes is to compose areas. 
Area stores and manipulates a resolution-independent description 
of an enclosed area of 2-dimensional space. It can be manipulated by
addition, subtraction, intersection, and exclusiveOr operations.

com/zetcode/AreasEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.Area;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {
        
    public void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;
        
        RenderingHints rh = new RenderingHints(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
               RenderingHints.VALUE_RENDER_QUALITY);    
        g2d.setRenderingHints(rh);

        g2d.setPaint(Color.gray);
        
        Area a1 = new Area(new Rectangle2D.Double(20, 20, 100, 100));
        Area a2 = new Area(new Ellipse2D.Double(50, 50, 100, 100));
        
        a1.subtract(a2);
        g2d.fill(a1);
        
        Area a3 = new Area(new Rectangle2D.Double(150, 20, 100, 100));
        Area a4 = new Area(new Ellipse2D.Double(150, 20, 100, 100));        
        
        a3.subtract(a4);
        g2d.fill(a3);
        
        Area a5 = new Area(new Rectangle2D.Double(280, 20, 100, 100));
        Area a6 = new Area(new Ellipse2D.Double(320, 40, 100, 100));        
        
        a5.add(a6);
        g2d.fill(a5);        
    }

    @Override
    public void paintComponent(Graphics g) {
                
        super.paintComponent(g);
        doDrawing(g);
    }           
}

public class AreasEx extends JFrame {

    public AreasEx() {

        initUI();
    }

    private void initUI() {
        
        add(new Surface());
        
        setTitle("Areas");
        setSize(450, 200);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                AreasEx ex = new AreasEx();
                ex.setVisible(true);
            }
        });
    }
}

The example creates three different shapes by manipulating areas.

Area a1 = new Area(new Rectangle2D.Double(20, 20, 100, 100));
Area a2 = new Area(new Ellipse2D.Double(50, 50, 100, 100));

a1.subtract(a2);
g2d.fill(a1);

This code constructs a shape by subtracting an ellipse from a rectangle.

Area a5 = new Area(new Rectangle2D.Double(280, 20, 100, 100));
Area a6 = new Area(new Ellipse2D.Double(320, 40, 100, 100));        

a5.add(a6);
g2d.fill(a5); 

These lines construct a shape by adding a rectangle to an ellipse.

![areas.png](images/areas.png)

Figure: Areas

## Colours

The Color class is used to work with colours in Java 2D. 
To fill rectangles with the current colour, we use the fillRect method.

com/zetcode/ColoursEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {
        
    public void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setColor(new Color(125, 167, 116));
        g2d.fillRect(10, 10, 90, 60);

        g2d.setColor(new Color(42, 179, 231));
        g2d.fillRect(130, 10, 90, 60);

        g2d.setColor(new Color(70, 67, 123));
        g2d.fillRect(250, 10, 90, 60);

        g2d.setColor(new Color(130, 100, 84));
        g2d.fillRect(10, 100, 90, 60);

        g2d.setColor(new Color(252, 211, 61));
        g2d.fillRect(130, 100, 90, 60);

        g2d.setColor(new Color(241, 98, 69));
        g2d.fillRect(250, 100, 90, 60);

        g2d.setColor(new Color(217, 146, 54));
        g2d.fillRect(10, 190, 90, 60);

        g2d.setColor(new Color(63, 121, 186));
        g2d.fillRect(130, 190, 90, 60);

        g2d.setColor(new Color(31, 21, 1));
        g2d.fillRect(250, 190, 90, 60);
    }

    @Override
    public void paintComponent(Graphics g) {
                
        super.paintComponent(g);
        doDrawing(g);
    }           
}

public class ColoursEx extends JFrame {

    public ColoursEx() {

        initUI();
    }

    private void initUI() {
        
        add(new Surface());
        
        setTitle("Colours");
        setSize(360, 300);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                ColoursEx ex = new ColoursEx();
                ex.setVisible(true);
            }
        });
    }
}

In the example we draw nine coloured rectangles. 

Graphics2D g2d = (Graphics2D) g;

There is no need to create a copy of the Graphics2D class or
to reset the value when we change the colour property of the graphics context.

g2d.setColor(new Color(125, 167, 116));

A new colour is created with the Color class. The parameters of the constructor
are the red, green, and blue parts of the new colour. The setColor method 
sets the graphics context's current colour to the specified colour value. All subsequent 
graphics operations use this colour value.

g2d.fillRect(10, 15, 90, 60);

To fill the rectangle with a colour, we use the fillRect method.

![colours.png](images/colours.png)

Figure: Colours

## Gradients

In computer graphics, gradient is a smooth blending of shades from light to 
dark or from one colour to another. In 2D drawing programs and paint programs, 
gradients are used to create colorful backgrounds and special effects as well 
as to simulate lights and shadows. (answers.com)

com/zetcode/GradientsEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {
    
    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();

        GradientPaint gp1 = new GradientPaint(5, 5, 
            Color.red, 20, 20, Color.black, true);

        g2d.setPaint(gp1);
        g2d.fillRect(20, 20, 300, 40);

        GradientPaint gp2 = new GradientPaint(5, 25, 
            Color.yellow, 20, 2, Color.black, true);

        g2d.setPaint(gp2);
        g2d.fillRect(20, 80, 300, 40);

        GradientPaint gp3 = new GradientPaint(5, 25, 
            Color.green, 2, 2, Color.black, true);

        g2d.setPaint(gp3);
        g2d.fillRect(20, 140, 300, 40);

        GradientPaint gp4 = new GradientPaint(25, 25, 
            Color.blue, 15, 25, Color.black, true);

        g2d.setPaint(gp4);
        g2d.fillRect(20, 200, 300, 40);

        GradientPaint gp5 = new GradientPaint(0, 0, 
             Color.orange, 0, 20, Color.black, true);

        g2d.setPaint(gp5);
        g2d.fillRect(20, 260, 300, 40);   
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);
        doDrawing(g);
    }
}

public class GradientsEx extends JFrame {
    
    public GradientsEx() {

        initUI();
    }    
    
    private void initUI() {
        
        add(new Surface());
        
        setTitle("Gradients");
        setSize(350, 350);
        setLocationRelativeTo(null);            
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
    
    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
        
            @Override
            public void run() {
                GradientsEx ex = new GradientsEx();
                ex.setVisible(true);
            }
        });
    }    
}

Our code example presents five rectangles with gradients. 

GradientPaint gp4 = new GradientPaint(25, 25, 
    Color.blue, 15, 25, Color.black, true);

To work with gradients, we use the GradientPaint class. By manipulating the 
colour values and the starting and ending points, we can get different results.

g2d.setPaint(gp4);

The gradient is activated by calling the setPaint method.

![gradients.png](images/gradients.png)

Figure: Gradients

## Textures

A texture is a bitmap image applied to a shape.
To work with textures in Java 2D, we use the TexturePaint class.
A texture is applied with the setPaint method.

com/zetcode/TexturesEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.TexturePaint;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private BufferedImage slate;
    private BufferedImage java;
    private BufferedImage pane;
    private TexturePaint slatetp;
    private TexturePaint javatp;
    private TexturePaint panetp;

    public Surface() {

        loadImages();
    }

    private void loadImages() {

        try {

            slate = ImageIO.read(new File("slate.png"));
            java = ImageIO.read(new File("java.png"));
            pane = ImageIO.read(new File("pane.png"));

        } catch (IOException ex) {

            Logger.getLogger(Surface.class.getName()).log(
                    Level.SEVERE, null, ex);
        }
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        slatetp = new TexturePaint(slate, new Rectangle(0, 0, 90, 60));
        javatp = new TexturePaint(java, new Rectangle(0, 0, 90, 60));
        panetp = new TexturePaint(pane, new Rectangle(0, 0, 90, 60));

        g2d.setPaint(slatetp);
        g2d.fillRect(10, 15, 90, 60);

        g2d.setPaint(javatp);
        g2d.fillRect(130, 15, 90, 60);

        g2d.setPaint(panetp);
        g2d.fillRect(250, 15, 90, 60);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class TexturesEx extends JFrame {

    public TexturesEx() {

        initUI();
    }
    
    private void initUI() {
        
        add(new Surface());

        setTitle("Textures");
        setSize(360, 120);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
        
            @Override
            public void run() {
                TexturesEx ex = new TexturesEx();
                ex.setVisible(true);
            }
        });
    }
}

In the code example, we fill three rectangles with three different textures. 

slate = ImageIO.read(new File("slate.png"));

Using the ImageIO class, we read an image into a buffered image.

slatetp = new TexturePaint(slate, new Rectangle(0, 0, 90, 60));

We create a TexturePaint class out of the buffered image.

g2d.setPaint(slatetp);
g2d.fillRect(10, 15, 90, 60);

We fill a rectangle with a texture.

![textures.png](images/textures.png)

Figure: Textures

In this part of the Java 2D tutorial, we have covered some basic and 
more advanced shapes of the Java 2D library.

[Contents](..)
[Previous](../basicdrawing/)
[Next](../transparency/)