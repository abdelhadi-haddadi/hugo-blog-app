+++
title = "Transformations"
date = 2025-08-29T19:54:52.495+01:00
draft = false
description = "In this part of the Java 2D tutorial, we work with transformations."
image = "images/translation.png"
imageBig = "images/translation.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../clipping/)
[Next](../effects/)

# Transformations

last modified July 17, 2023

In this part of the Java 2D programming tutorial we talk about transformations.

An *affine transform* is composed of zero or more linear transformations
(rotation, scaling or shear) and translation (shift). Several linear
transformations can be combined into a single matrix. A rotation is a
transformation that moves a rigid body around a fixed point. A scaling is a
transformation that enlarges or diminishes objects. The scale factor is the same
in all directions. A translation is a transformation that moves every point a
constant distance in a specified direction. A shear is a transformation that
moves an object perpendicular to a given axis, with greater value on one side of
the axis than the other. 

The AffineTransform is the class in Java 2D to 
perform affine transformations. 

## Translation

The following example describes a simple translation.

com/zetcode/TranslationEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setPaint(new Color(150, 150, 150));
        g2d.fillRect(20, 20, 80, 50);
        g2d.translate(150, 50);
        g2d.fillRect(20, 20, 80, 50);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);
        doDrawing(g);
    }
}

public class TranslationEx extends JFrame {
    
    public TranslationEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        add(new Surface());

        setTitle("Translation");
        setSize(300, 200);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                TranslationEx ex = new TranslationEx();
                ex.setVisible(true);
            }
        });                    
    }
}

The example draws a rectangle. Then we do a translation and draw the same rectangle again.

g2d.translate(150, 50);

This line moves the origin of the Graphics2D context to a new point. 

![translation.png](images/translation.png)

Figure: Translation

## Rotation

The next example demonstrates a rotation.

com/zetcode/RotationEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setPaint(new Color(150, 150, 150));
        g2d.fillRect(20, 20, 80, 50);
        g2d.translate(180, -50);
        g2d.rotate(Math.PI/4);
        g2d.fillRect(80, 80, 80, 50);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);
        doDrawing(g);
    }
}

public class RotationEx extends JFrame {
    
    public RotationEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        setTitle("Rotation");

        add(new Surface());

        setSize(300, 200);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                RotationEx ex = new RotationEx();
                ex.setVisible(true);
            }
        });                    
    }
}

The example draws a rectangle, performs a translation and a rotation 
and draws the same rectangle again.

g2d.rotate(Math.PI/4);

The rotate method performs rotation. Note 
that the rotation parameter is in radians.

![rotation.png](images/rotation.png)

Figure: Rotation

## Scaling

The next example demonstrates scaling of an object. Scaling is done 
with the scale method.
In this method, we provide two parameters. They are the x scale and 
y scale factor, by which coordinates are scaled along the x or y axis 
respectively.

com/zetcode/ScalingEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setColor(new Color(150, 150, 150));
        g2d.fillRect(20, 20, 80, 50);

        AffineTransform tx1 = new AffineTransform();
        tx1.translate(110, 22);
        tx1.scale(0.5, 0.5);

        g2d.setTransform(tx1);
        g2d.fillRect(0, 0, 80, 50);

        AffineTransform tx2 = new AffineTransform();
        tx2.translate(170, 20);
        tx2.scale(1.5, 1.5);

        g2d.setTransform(tx2);
        g2d.fillRect(0, 0, 80, 50);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class ScalingEx extends JFrame {

    public ScalingEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Scaling");
        setSize(330, 160);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                ScalingEx ex = new ScalingEx();
                ex.setVisible(true);
            }
        });
    }
}

We have a rectangle. First we scale it down and then we scale it up a bit. 

AffineTransform tx2 = new AffineTransform();
tx2.translate(170, 20);
tx2.scale(1.5, 1.5);

Another scaling would be added to the first one. So we need to 
create and apply a new affine transform. 

![scaling.png](images/scaling.png)

Figure: Scaling

## Shearing

In the following example we perform shearing. We use the share method. 

com/zetcode/ShearingEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        AffineTransform tx1 = new AffineTransform();
        tx1.translate(50, 90);

        g2d.setTransform(tx1);
        g2d.setPaint(Color.green);
        g2d.drawRect(0, 0, 160, 50);

        AffineTransform tx2 = new AffineTransform();
        tx2.translate(50, 90);
        tx2.shear(0, 1);

        g2d.setTransform(tx2);
        g2d.setPaint(Color.blue);

        g2d.draw(new Rectangle(0, 0, 80, 50));

        AffineTransform tx3 = new AffineTransform();
        tx3.translate(130, 10);
        tx3.shear(0, 1);

        g2d.setTransform(tx3);
        g2d.setPaint(Color.red);
        g2d.drawRect(0, 0, 80, 50);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class ShearingEx extends JFrame {

    public ShearingEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Shearing");
        setSize(330, 270);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                ShearingEx ex = new ShearingEx();
                ex.setVisible(true);
            }
        });
    }
}

In this example, we draw three rectangles in three different colors. 
They form a structure. Two of them are sheared.

tx2.shear(0, 1);

The two parameters are multipliers by which coordinates are shifted 
in the direction of the x and y axis.

![shearing.png](images/shearing.png)

Figure: Shearing

## Donut

In the following example we create an complex shape by rotating an ellipse.

com/zetcode/DonutEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        RenderingHints rh = new RenderingHints(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        Dimension size = getSize();
        double w = size.getWidth();
        double h = size.getHeight();

        Ellipse2D e = new Ellipse2D.Double(0, 0, 80, 130);
        g2d.setStroke(new BasicStroke(1));
        g2d.setPaint(Color.gray);

        for (double deg = 0; deg &lt; 360; deg += 5) {
            AffineTransform at =
                    AffineTransform.getTranslateInstance(w / 2, h / 2);
            at.rotate(Math.toRadians(deg));
            g2d.draw(at.createTransformedShape(e));
        }
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class DonutEx extends JFrame {

    public DonutEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Donut");
        setSize(370, 320);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                DonutEx ex = new DonutEx();
                ex.setVisible(true);
            }
        });
    }
}

In this example, we create a donut shape.

Ellipse2D e = new Ellipse2D.Double(0, 0, 80, 130);
g2d.setStroke(new BasicStroke(1));
g2d.setPaint(Color.gray);

In the beginning there is an ellipse. 

for (double deg = 0; deg &lt; 360; deg += 5) {
    AffineTransform at =
            AffineTransform.getTranslateInstance(w / 2, h / 2);
    at.rotate(Math.toRadians(deg));
    g2d.draw(at.createTransformedShape(e));
}

After several rotations, there is a donut. 

In this part of the Java 2D tutorial, we have talked about transformations.

[Contents](..) 
[Previous](../clipping/)
[Next](../effects/)