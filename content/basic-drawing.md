+++
title = "Basic drawing"
date = 2025-08-29T19:54:48.614+01:00
draft = false
description = "In this part of the Java 2D tutorial, we do some basic drawing."
image = "images/points.png"
imageBig = "images/points.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../shapesandfills/)

# Basic drawing

last modified July 17, 2023

In this part of the Java 2D tutorial, we do some basic drawing. 

## Points

The most simple graphics primitive is a point. It is a single dot on the 
window. There is a Point class for representing a point in a coordinate space, 
but there is no method to to draw a point. To draw a point, we used the 
drawLine method, where we supplied one point for the both
arguments of the method. 

com/zetcode/PointsEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.Random;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel implements ActionListener {

    private final int DELAY = 150;
    private Timer timer;

    public Surface() {

        initTimer();
    }

    private void initTimer() {

        timer = new Timer(DELAY, this);
        timer.start();
    }
    
    public Timer getTimer() {
        
        return timer;
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setPaint(Color.blue);

        int w = getWidth();
        int h = getHeight();

        Random r = new Random();

        for (int i = 0; i &lt; 2000; i++) {

            int x = Math.abs(r.nextInt()) % w;
            int y = Math.abs(r.nextInt()) % h;
            g2d.drawLine(x, y, x, y);
        }
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        repaint();
    }
}

public class PointsEx extends JFrame {

    public PointsEx() {

        initUI();
    }

    private void initUI() {

        final Surface surface = new Surface();
        add(surface);

        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                Timer timer = surface.getTimer();
                timer.stop();
            }
        });

        setTitle("Points");
        setSize(350, 250);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                PointsEx ex = new PointsEx();
                ex.setVisible(true);
            }
        });
    }
}

The example draws randomly 2000 points on the window. A timer is used to
draw points in a cycle.

private void initTimer() {

    timer = new Timer(DELAY, this);
    timer.start();
}

A javax.swing.Timer is used to create animation. It 
fires ActionEvents at the specified interval.

g2d.setPaint(Color.blue);

The points are painted in blue color.

int w = getWidth();
int h = getHeight();

We get the width and height of the component. 

Random r = new Random();
int x = Math.abs(r.nextInt()) % w;
int y = Math.abs(r.nextInt()) % h;

We get a random number in range of the size of area 
that we computed above.

g2d.drawLine(x, y, x, y);

Here we draw the point. As we already mentioned, we use the 
drawLine method. We specify the same point twice.

@Override
public void actionPerformed(ActionEvent e) {
    repaint();
}

Each action event, we call the repaint method. 
It causes the whole client area to be redrawn.

addWindowListener(new WindowAdapter() {
    @Override
    public void windowClosing(WindowEvent e) {
        Timer timer = surface.getTimer();
        timer.stop();
    }
});

When the window is about to be closed, we retrieve the timer and
close it with its stop method. Timers not explicitly 
cancelled may hold resources indefinitely. The EXIT_ON_CLOSE
default closing operation closes the JVM and all its threads so 
this is not necessary for our example. But as a good programming 
practice and as a remainder, we do it nevertheless.

![points.png](images/points.png)

Figure: Points

## Lines

A line is a simple graphics primitive. A line is an object which connects two points. Lines
are drawn with the drawLine method.

com/zetcode/LinesEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.drawLine(30, 30, 200, 30);
        g2d.drawLine(200, 30, 30, 200);
        g2d.drawLine(30, 200, 200, 200);
        g2d.drawLine(200, 200, 30, 30);
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class LinesEx extends JFrame {

    public LinesEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Lines");
        setSize(350, 250);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                
                LinesEx ex = new LinesEx();
                ex.setVisible(true);
            }
        });
    }
}

We draw a simple object with four lines. 

g2d.drawLine(30, 30, 200, 30);

A straight line is drawn. The parameters of the method are the x, y coordinates
of the two points. 

![lines.png](images/lines.png)

Figure: Lines

## BasicStroke

The BasicStroke class defines a basic set of 
rendering attributes for the outlines of graphics primitives. These 
rendering attributes include width, end caps, line joins, miter limit, and dash. 

com/zetcode/BasicStrokesEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        float[] dash1 = {2f, 0f, 2f};
        float[] dash2 = {1f, 1f, 1f};
        float[] dash3 = {4f, 0f, 2f};
        float[] dash4 = {4f, 4f, 1f};

        g2d.drawLine(20, 40, 250, 40);

        BasicStroke bs1 = new BasicStroke(1, BasicStroke.CAP_BUTT,
                BasicStroke.JOIN_ROUND, 1.0f, dash1, 2f);

        BasicStroke bs2 = new BasicStroke(1, BasicStroke.CAP_BUTT,
                BasicStroke.JOIN_ROUND, 1.0f, dash2, 2f);

        BasicStroke bs3 = new BasicStroke(1, BasicStroke.CAP_BUTT,
                BasicStroke.JOIN_ROUND, 1.0f, dash3, 2f);

        BasicStroke bs4 = new BasicStroke(1, BasicStroke.CAP_BUTT,
                BasicStroke.JOIN_ROUND, 1.0f, dash4, 2f);

        g2d.setStroke(bs1);
        g2d.drawLine(20, 80, 250, 80);

        g2d.setStroke(bs2);
        g2d.drawLine(20, 120, 250, 120);

        g2d.setStroke(bs3);
        g2d.drawLine(20, 160, 250, 160);

        g2d.setStroke(bs4);
        g2d.drawLine(20, 200, 250, 200);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class BasicStrokesEx extends JFrame {

    public BasicStrokesEx() {

        initUI();
    }
    
    private void initUI() {

        add(new Surface());

        setTitle("Basic strokes");
        setSize(280, 270);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                BasicStrokesEx ex = new BasicStrokesEx();
                ex.setVisible(true);
            }
        });
    }
}

In this example, we show various types of dashes. A dash attribute is a pattern, 
which is created by mixing opaque and transparent sections. 

Graphics2D g2d = (Graphics2D) g.create();

We are going to change the stroke attribute of the Graphics object;
therefore, we work with a copy of the Graphics object.
(Remember that a copy must be created if we change attributes other than fonts,
colours, or rendering hints.)

float[] dash1 = { 2f, 0f, 2f };
float[] dash2 = { 1f, 1f, 1f };
float[] dash3 = { 4f, 0f, 2f };
float[] dash4 = { 4f, 4f, 1f };

Here we define four different dash patterns. 

BasicStroke bs1 = new BasicStroke(1, BasicStroke.CAP_BUTT, 
    BasicStroke.JOIN_ROUND, 1.0f, dash1, 2f );

This line constructs a BasicStroke object. 

g2d.setStroke(bs1);

We use the setStroke method to apply the 
BasicStroke to the current graphics context. 

g2d.drawLine(20, 80, 250, 80);

A line is drawn with the drawLine method.

g2d.dispose();

In the end, we dispose the copy of the Graphics object.

![basicstrokes.png](images/basicstrokes.png)

Figure: Basic strokes

## Caps

Caps are decorations applied to the ends of unclosed subpaths and dash segments. 
There are three different end caps in Java 2D: CAP_BUTT, 
CAP_ROUND, and CAP_SQUARE.

- CAP_BUTT — ends unclosed subpaths and dash segments with no added decoration.

CAP_ROUND — ends unclosed subpaths and dash segments with a round decoration that 
has a radius equal to half of the width of the pen.
CAP_SQUARE — ends unclosed subpaths and dash segments with a square projection that 
extends beyond the end of the segment to a distance equal to half of the line width.

com/zetcode/CapsEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        RenderingHints rh = new RenderingHints(
                RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        BasicStroke bs1 = new BasicStroke(8, BasicStroke.CAP_BUTT,
                BasicStroke.JOIN_BEVEL);
        g2d.setStroke(bs1);
        g2d.drawLine(20, 30, 250, 30);

        BasicStroke bs2 = new BasicStroke(8, BasicStroke.CAP_ROUND,
                BasicStroke.JOIN_BEVEL);
        g2d.setStroke(bs2);
        g2d.drawLine(20, 80, 250, 80);

        BasicStroke bs3 = new BasicStroke(8, BasicStroke.CAP_SQUARE,
                BasicStroke.JOIN_BEVEL);
        g2d.setStroke(bs3);
        g2d.drawLine(20, 130, 250, 130);

        BasicStroke bs4 = new BasicStroke();
        g2d.setStroke(bs4);

        g2d.drawLine(20, 20, 20, 140);
        g2d.drawLine(250, 20, 250, 140);
        g2d.drawLine(254, 20, 254, 140);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class CapsEx extends JFrame {

    public CapsEx() {

        initUI();
    }
    
    private void initUI() {
        
        add(new Surface());

        setTitle("Caps");
        setSize(280, 270);
        setLocationRelativeTo(null); 
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                CapsEx ex = new CapsEx();
                ex.setVisible(true);
            }
        });
    }
}

In our example, we show all three types of end caps. 

BasicStroke bs1 = new BasicStroke(8, BasicStroke.CAP_BUTT,
        BasicStroke.JOIN_BEVEL);
g2d.setStroke(bs1);

A basic stroke with a butt cap is created and applied. A CAP_BUTT
adds no decoration.

g2d.drawLine(20, 20, 20, 140);
g2d.drawLine(250, 20, 250, 140);
g2d.drawLine(254, 20, 254, 140);

We draw three vertical lines to explain the differences between the end caps. 
Lines with CAP_ROUND and CAP_SQUARE are bigger than 
the line with CAP_BUTT. Exactly how much bigger depends on the 
line size. In our case a line is 8 px thick. Lines are bigger by 8 px—4 px 
on the left and 4 px on the right. It should be clear from the picture. 

![caps.png](images/caps.png)

Figure: Caps

## Joins

Line joins are decorations applied at the intersection of two path segments and 
at the intersection of the endpoints of a subpath.  There are three decorations: 
JOIN_BEVEL, JOIN_MITER, and JOIN_ROUND.

JOIN_BEVEL — joins path segments by connecting the outer corners of their 
wide outlines with a straight segment.
- JOIN_MITER — joins path segments by extending their outside edges until they meet.

- JOIN_ROUND — joins path segments by rounding off the corner at a radius of half the line width.

com/zetcode/JoinsEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        BasicStroke bs1 = new BasicStroke(8, BasicStroke.CAP_ROUND,
                BasicStroke.JOIN_BEVEL);
        g2d.setStroke(bs1);
        g2d.drawRect(15, 15, 80, 50);

        BasicStroke bs2 = new BasicStroke(8, BasicStroke.CAP_ROUND,
                BasicStroke.JOIN_MITER);
        g2d.setStroke(bs2);
        g2d.drawRect(125, 15, 80, 50);

        BasicStroke bs3 = new BasicStroke(8, BasicStroke.CAP_ROUND,
                BasicStroke.JOIN_ROUND);
        g2d.setStroke(bs3);
        g2d.drawRect(235, 15, 80, 50);
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class JoinsEx extends JFrame {

    public JoinsEx() {

        initUI();
    }
    
    private void initUI() {

        add(new Surface());

        setTitle("Joins");
        setSize(340, 110);
        setLocationRelativeTo(null);  
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                JoinsEx ex = new JoinsEx();
                ex.setVisible(true);
            }
        });
    }
}

This code example show three different line joins in action.

BasicStroke bs1 = new BasicStroke(8, BasicStroke.CAP_ROUND,
        BasicStroke.JOIN_BEVEL);
g2d.setStroke(bs1);
g2d.drawRect(15, 15, 80, 50);

Here we create a rectangle with a JOIN_BEVEL join. 

![joins.png](images/joins.png)

Figure: Joins

In this part of the Java 2D tutorial, we did some basic drawing.

[Contents](..)
[Previous](../introduction/)
[Next](../shapesandfills/)