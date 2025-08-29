+++
title = "Clipping"
date = 2025-08-29T19:54:48.359+01:00
draft = false
description = "In this part of the Java 2D tutorial, we cover clipping—the restricting of drawing to a certain area."
image = "images/clippingshapes.png"
imageBig = "images/clippingshapes.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../composition/)
[Next](../transformations/)

# Clipping

last modified July 17, 2023

In this part of the Java 2D tutorial we talk about clipping.

## Clipping

Clipping is restricting of drawing to a certain area. This is done for
efficiency reasons and to create various effects. When working with the clip, we
must either work with a copy of the Graphics object or to restore
the original clip attribute. Changing the clip does not affect existing pixels;
it affects future rendering only.

In the following example we be clipping an image to a circle shape.

com/zetcode/ClippingEx.java
  

package com.zetcode;

import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Ellipse2D;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel 
        implements ActionListener {

    private int pos_x = 8;
    private int pos_y = 8;
    private final int RADIUS = 90;
    private final int DELAY = 35;

    private Timer timer;
    private Image image;

    private final double delta[] = { 3, 3 };

    public Surface() {
        
        loadImage();
        determineAndSetImageSize();
        initTimer();
    }
    
    private void loadImage() {
        
        image = new ImageIcon("mushrooms.jpg").getImage();
    }
    
    private void determineAndSetImageSize() {
        
        int h = image.getHeight(this);
        int w = image.getWidth(this);
        setPreferredSize(new Dimension(w, h));        
    }    

    private void initTimer() {   

        timer = new Timer(DELAY, this);
        timer.start();
    }
    
    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();

        g2d.clip(new Ellipse2D.Double(pos_x, pos_y, RADIUS, RADIUS));
        g2d.drawImage(image, 0, 0, null); 
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);
        doDrawing(g);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        
        moveCircle();
        repaint();
    }
    
    private void moveCircle() {

        int w = getWidth();
        int h = getHeight();

        if (pos_x &lt; 0) {
            
            delta[0] = Math.random() % 4 + 5;
        } else if (pos_x &gt; w - RADIUS) {
            
            delta[0] = -(Math.random() % 4 + 5);
        }

        if (pos_y &lt; 0 ) {
            
            delta[1] = Math.random() % 4 + 5;
        } else if (pos_y &gt; h - RADIUS) {
            
            delta[1] = -(Math.random() % 4 + 5);
        }

        pos_x += delta[0];
        pos_y += delta[1];
    }       
}

public class ClippingEx extends JFrame {
    
    public ClippingEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        setTitle("Clipping");

        add(new Surface());

        pack();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);        
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
        
            @Override
            public void run() {
                ClippingEx cl = new ClippingEx();
                cl.setVisible(true);
            }
        });        
    }
}

A circle is moving on the screen and showing a part of the underlying image. 
This is as if we looked through a hole.

Graphics2D g2d = (Graphics2D) g.create();

We create a copy of the Graphics2D object. Thus changing the clip
will not affect other Swing parts where the Graphics2D object
is reused.

g2d.clip(new Ellipse2D.Double(pos_x, pos_y, RADIUS, RADIUS));

The clip method combines the existing clip with the shape given
as an argument. The resulting intersection is set to be the clip. In our case, the
resulting clip is the circle shape.

if (pos_x &lt; 0) {
    
    delta[0] = Math.random() % 4 + 5;
} else if (pos_x &gt; w - RADIUS) {
    
    delta[0] = -(Math.random() % 4 + 5);
}

If the circle hits the left or the right side of the window, the direction of the 
circle movement changes randomly. Same applies for the top and bottom sides.

g2d.dispose();

When we are done with the painting, we must release the copy of the 
Graphics2D object.

## Clipping shapes

In the following example we be clipping to the intersection of two shapes: a
rectangle and a circle. 

com/zetcode/ClippingShapesEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import java.awt.geom.GeneralPath;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel
        implements ActionListener {

    private Timer timer;
    private double rotate = 1;
    private int pos_x = 8;
    private int pos_y = 8;
    private final double delta[] = {1, 1};
    
    private final int RADIUS = 60;
    

    public Surface() {

        initTimer();
    }

    private void initTimer() {

        timer = new Timer(10, this);
        timer.start();
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);
        
        Shape oldClip = g2d.getClip();

        int w = getWidth();
        int h = getHeight();

        Rectangle rect = new Rectangle(0, 0, 200, 80);

        AffineTransform tx = new AffineTransform();
        tx.rotate(Math.toRadians(rotate), w / 2, h / 2);
        tx.translate(w / 2 - 100, h / 2 - 40);

        Ellipse2D circle = new Ellipse2D.Double(pos_x, pos_y,
                RADIUS, RADIUS);

        GeneralPath path = new GeneralPath();
        path.append(tx.createTransformedShape(rect), false);

        g2d.clip(circle);
        g2d.clip(path);
        
        g2d.setPaint(new Color(110, 110, 110));
        g2d.fill(circle);

        g2d.setClip(oldClip);

        g2d.draw(circle);
        g2d.draw(path);
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        doDrawing(g);
    }

    public void step() {

        int w = getWidth();
        int h = getHeight();
        
        rotate += 1;

        if (pos_x &lt; 0) {

            delta[0] = 1;
        } else if (pos_x &gt; w - RADIUS) {

            delta[0] = -1;
        }

        if (pos_y &lt; 0) {

            delta[1] = 1;
        } else if (pos_y &gt; h - RADIUS) {

            delta[1] = -1;
        }

        pos_x += delta[0];
        pos_y += delta[1];
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        step();
        repaint();
    }
}

public class ClippingShapesEx extends JFrame {

    public ClippingShapesEx() {

        initUI();
    }

    private void initUI() {

        setTitle("Clipping shapes");

        add(new Surface());

        setSize(350, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                ClippingShapesEx ex = new ClippingShapesEx();
                ex.setVisible(true);
            }
        });
    }
}

In our example, we have a bouncing circle and a rotating rectangle. When 
these shapes overlap, the resulting area is filled with colour. 

Shape oldClip = g2d.getClip();

Since we did not create a copy of the Graphics2D object, we 
store the old clip for later use. In the end, we must reset the clip to
the original one.

Rectangle rect = new Rectangle(0, 0, 200, 80);

AffineTransform tx = new AffineTransform();
tx.rotate(Math.toRadians(rotate), w / 2, h / 2);
tx.translate(w / 2 - 100, h / 2 - 40);

The rectangle is being rotated. It is always positioned in the middle of the panel. 

GeneralPath path = new GeneralPath();
path.append(tx.createTransformedShape(rect), false);

Here we get the shape of the rotated rectangle. 

g2d.clip(circle);
g2d.clip(path);

g2d.setPaint(new Color(110, 110, 110));
g2d.fill(circle);

Here we restrict drawing to the intersection of the two shapes. 
If they overlap, the interior of the resulting shape is filled with colour. 
The clip method combines the initial clip (the component's client area)
with the given two shapes. 

g2d.setClip(oldClip);

With the setClip method, we reset the clip area to the old clip 
before we draw the shapes. Unlike the clip method, the setClip
does not combine clipping areas. It resets the clip to the new area. Therefore, this method
should be exclusively used in restoring the old clip.

![clippingshapes.png](images/clippingshapes.png)

Figure: Clipping shapes

In this part of the Java 2D tutorial, we have talked about clipping.

[Contents](..) 
[Previous](../composition/)
[Next](../transformations/)