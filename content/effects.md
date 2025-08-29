+++
title = "Effects"
date = 2025-08-29T19:54:49.792+01:00
draft = false
description = "In this part of the Java 2D tutorial, we perform some effects."
image = "images/bubbles.png"
imageBig = "images/bubbles.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transformations/)
[Next](../java2dimages/)

# Effects

last modified July 17, 2023

In this part of the Java 2D programming tutorial we show some effects. 

## Bubbles

In the first example we see growing coloured bubbles that randomly appear and
disappear on the screen. The example comes from the Java 2D demo.  

com/zetcode/BubblesEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.Ellipse2D;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel
        implements ActionListener {

    private final Color colors[] = {
        Color.blue, Color.cyan, Color.green,
        Color.magenta, Color.orange, Color.pink,
        Color.red, Color.yellow, Color.lightGray, Color.white
    };

    private Ellipse2D.Float[] ellipses;
    private double esize[];
    private float estroke[];
    private double maxSize = 0;
    private final int NUMBER_OF_ELLIPSES = 25;
    private final int DELAY = 30;
    private final int INITIAL_DELAY = 150;    
    private Timer timer;

    public Surface() {

        initSurface();
        initEllipses();
        initTimer();
    }

    private void initSurface() {

        setBackground(Color.black);
        ellipses = new Ellipse2D.Float[NUMBER_OF_ELLIPSES];
        esize = new double[ellipses.length];
        estroke = new float[ellipses.length];
    }

    private void initEllipses() {

        int w = 350;
        int h = 250;

        maxSize = w / 10;

        for (int i = 0; i &lt; ellipses.length; i++) {

            ellipses[i] = new Ellipse2D.Float();
            posRandEllipses(i, maxSize * Math.random(), w, h);
        }
    }

    private void initTimer() {

        timer = new Timer(DELAY, this);
        timer.setInitialDelay(INITIAL_DELAY);
        timer.start();
    }

    private void posRandEllipses(int i, double size, int w, int h) {

        esize[i] = size;
        estroke[i] = 1.0f;
        double x = Math.random() * (w - (maxSize / 2));
        double y = Math.random() * (h - (maxSize / 2));
        ellipses[i].setFrame(x, y, size, size);
    }

    private void doStep(int w, int h) {

        for (int i = 0; i &lt; ellipses.length; i++) {

            estroke[i] += 0.025f;
            esize[i]++;

            if (esize[i] &gt; maxSize) {

                posRandEllipses(i, 1, w, h);
            } else {

                ellipses[i].setFrame(ellipses[i].getX(), ellipses[i].getY(),
                        esize[i], esize[i]);
            }
        }
    }

    private void drawEllipses(Graphics2D g2d) {

        for (int i = 0; i &lt; ellipses.length; i++) {

            g2d.setColor(colors[i % colors.length]);
            g2d.setStroke(new BasicStroke(estroke[i]));
            g2d.draw(ellipses[i]);
        }
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        RenderingHints rh
                = new RenderingHints(RenderingHints.KEY_ANTIALIASING,
                        RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        Dimension size = getSize();
        doStep(size.width, size.height);
        drawEllipses(g2d);
        
        g2d.dispose();
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

public class BubblesEx extends JFrame {

    public BubblesEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());
        
        setTitle("Bubbles");
        setSize(350, 250);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                BubblesEx ex = new BubblesEx();
                ex.setVisible(true);
            }
        });
    }
}

This is Bubbles example.

private final Color colors[] = {
    Color.blue, Color.cyan, Color.green,
    Color.magenta, Color.orange, Color.pink,
    Color.red, Color.yellow, Color.lightGray, Color.white
};

These colours are used to paint the bubbles. 

private void initSurface() {

    setBackground(Color.black);
    ellipses = new Ellipse2D.Float[NUMBER_OF_ELLIPSES];
    esize = new double[ellipses.length];
    estroke = new float[ellipses.length];
}

The initSurface method sets a black background for the panel.
We create three arrays. An array for the ellipses (a circle is a special
case of an ellipse), an array for the size of each of the ellipses, and 
an array for ellipses' strokes. Both size and stroke of 
the bubble grow during the animation.

private void initEllipses() {

    int w = 350;
    int h = 250;
            
    maxSize = w / 10;
    
    for (int i = 0; i &lt; ellipses.length; i++) {
        
        ellipses[i] = new Ellipse2D.Float();
        posRandEllipses(i, maxSize * Math.random(), w, h);
    }
}    

The ellipses array is filled with ellipse objects. The posRandEllipses
method positions randomly the ellipse objects on the window. The initial sizes of
the ellipses are chosen also randomly. 

private void initTimer() {

    timer = new Timer(DELAY, this);
    timer.setInitialDelay(INITIAL_DELAY);
    timer.start();
}

A timer object is created and started. It is used to create the animation.

private void posRandEllipses(int i, double size, int w, int h) {

    esize[i] = size;
    estroke[i] = 1.0f;
    double x = Math.random() * (w - (maxSize / 2));
    double y = Math.random() * (h - (maxSize / 2));
    ellipses[i].setFrame(x, y, size, size);
}

The posRandEllipses method positions the ellipses randomly on
the window. The esize and estroke arrays are filled 
with values. The setFrame method sets the location and size of 
the framing rectangle of an ellipse.

private void doStep(int w, int h) {

    for (int i = 0; i &lt; ellipses.length; i++) {

        estroke[i] += 0.025f;
        esize[i]++;

        if (esize[i] &gt; maxSize) {
            
            posRandEllipses(i, 1, w, h);
        } else {
            
            ellipses[i].setFrame(ellipses[i].getX(), ellipses[i].getY(),
                    esize[i], esize[i]);
        }
    }
}

The animation consists of steps. In each step, we increase the stroke and size
values of each ellipse. After the bubble reaches its maximum size, it is reset to the 
minimum size and randomly repositioned on the panel. Else it is displayed with 
the increased values.

private void drawEllipses(Graphics2D g2d) {

    for (int i = 0; i &lt; ellipses.length; i++) {

        g2d.setColor(colors[i % colors.length]);
        g2d.setStroke(new BasicStroke(estroke[i]));
        g2d.draw(ellipses[i]);
    }
}

The drawEllipses method draws all the ellipses from the array
on the panel. 

Dimension size = getSize();
doStep(size.width, size.height);
 

In the doDrawing method, we compute the size of the panel. If the 
window is resized, the bubbles are distributed randomly over the whole area of the window.

@Override
public void actionPerformed(ActionEvent e) {
    
    repaint();
}
 

The timer object triggers action events at specified intervals. 
The repaint method repaints the panel component.

![bubbles.png](images/bubbles.png)

Figure: Bubbles

## Star

The next example shows a rotating and scaling star. 

com/zetcode/StarDemoEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.geom.GeneralPath;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel
        implements ActionListener {

    private final int points[][] = {
        {0, 85}, {75, 75}, {100, 10}, {125, 75},
        {200, 85}, {150, 125}, {160, 190}, {100, 150},
        {40, 190}, {50, 125}, {0, 85}
    };
    
    private Timer timer;
    private double angle = 0;
    private double scale = 1;
    private double delta = 0.01;
    
    private final int DELAY = 10;

    public Surface() {

        initTimer();
    }
    
    private void initTimer() {
        
        timer = new Timer(DELAY, this);
        timer.start();        
    }

    private void doDrawing(Graphics g) {
        
        int h = getHeight();
        int w = getWidth();

        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g2d.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);

        g2d.translate(w / 2, h / 2);
        GeneralPath star = new GeneralPath();
        star.moveTo(points[0][0], points[0][1]);

        for (int k = 1; k &lt; points.length; k++) {
            
            star.lineTo(points[k][0], points[k][1]);
        }

        g2d.rotate(angle);
        g2d.scale(scale, scale);
        g2d.fill(star);        
        
        g2d.dispose();
    }
    
    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
    
    private void step() {
        
        if (scale &lt; 0.01) {
            
            delta = -delta;
        } else if (scale &gt; 0.99) {
            
            delta = -delta;
        }

        scale += delta;
        angle += 0.01;        
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        step();
        repaint();
    }
}

public class StarDemoEx extends JFrame {

    public StarDemoEx() {

        initUI();
    }

    private void initUI() {
        
        add(new Surface());

        setTitle("Star");
        setSize(420, 250);
        setLocationRelativeTo(null);        
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                StarDemoEx ex = new StarDemoEx();
                ex.setVisible(true);
            }
        });
    }
}

In this demo, we have a star. The star rotates and grows and then 
shrinks. 

private final int points[][] = {
    {0, 85}, {75, 75}, {100, 10}, {125, 75},
    {200, 85}, {150, 125}, {160, 190}, {100, 150},
    {40, 190}, {50, 125}, {0, 85}
};
 

These points are used to draw the star shape. 

private double angle = 0;
private double scale = 1;
private double delta = 0.01;
 

The angle is used when we rotate the star. The scale 
factor determines the size of the star. Finally, the delta factor is 
the amount of change of the scale.

g2d.translate(w / 2, h / 2);

The coordinate system is moved into the middle of the window with the 
translate method.

GeneralPath star = new GeneralPath();
star.moveTo(points[0][0], points[0][1]);

for (int k = 1; k &lt; points.length; k++) {
    
    star.lineTo(points[k][0], points[k][1]);
}
 

The GeneralPath is used to create the Star shape. The first point is
added to the path with the moveTo method. Subsequent points of the
Star are added with the lineTo method.

g2d.rotate(angle);
g2d.scale(scale, scale);
 

We perform rotation and scaling operations.

g2d.fill(star);        
 

The fill method fills the interior of the Star shape.

if (scale &lt; 0.01) {
    
    delta = -delta;
} else if (scale &gt; 0.99) {
    
    delta = -delta;
}
 

This code controls the amount of shrinking and growing of the star.

## Puff

Next we show a puff effect. This effect is common in flash animations 
or film introductions. Text grows gradually on the screen and after some time it 
slowly disappears. 

com/zetcode/PuffEx.java
  

package com.zetcode;
 
import java.awt.AlphaComposite;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel 
        implements ActionListener {

    private Timer timer;
    private int x = 1;
    private float alpha = 1;
    private final int DELAY = 15;
    private final int INITIAL_DELAY = 200;

    public Surface() {
        
        initTimer();
    }
    
    private void initTimer() {
        
        timer = new Timer(DELAY, this);
        timer.setInitialDelay(INITIAL_DELAY);
        timer.start();               
    }
    
    private void doDrawing(Graphics g) {
        
        Graphics2D g2d = (Graphics2D) g.create();
        
        RenderingHints rh =
            new RenderingHints(RenderingHints.KEY_ANTIALIASING,
            RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
               RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        Font font = new Font("Dialog", Font.PLAIN, x);
        g2d.setFont(font);

        FontMetrics fm = g2d.getFontMetrics();
        String s = "ZetCode";
        Dimension size = getSize();

        int w = (int) size.getWidth();
        int h = (int) size.getHeight();

        int stringWidth = fm.stringWidth(s);
        AlphaComposite ac = AlphaComposite.getInstance(
                AlphaComposite.SRC_OVER, alpha);
        g2d.setComposite(ac);

        g2d.drawString(s, (w - stringWidth) / 2, h / 2);        
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {
        
        super.paintComponent(g);        
        doDrawing(g);
    }   
    
    private void step() {
        
        x += 1;

        if (x &gt; 40)
            alpha -= 0.01;

        if (alpha &lt;= 0.01)
            timer.stop();        
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        
        step();
        repaint();
    }        
}

public class PuffEx extends JFrame {    
    
    public PuffEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        setTitle("Puff");

        add(new Surface());

        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);        
    }

    public static void main(String[] args) {
        
        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                PuffEx ex = new PuffEx();
                ex.setVisible(true);
            }
        });      
    }
}

The example draws a growing text on the window and from some point, the
text becomes more and more transparent, until it is invisible.

Font font = new Font("Dialog", Font.PLAIN, x);
g2d.setFont(font);
 

This is the font that we use for our text. 

FontMetrics fm = g2d.getFontMetrics();
 

The getFontMetrics returns the FontMetrics class. 
The class stores information about the rendering of a particular font 
on a particular screen. 

int stringWidth = fm.stringWidth(s);
 

We use the stringWidth method of the 
FontMetrics object to get the width
of the string.

AlphaComposite ac = AlphaComposite.getInstance(
        AlphaComposite.SRC_OVER, alpha);
g2d.setComposite(ac);
 

Here we set the transparency of the text being drawn. 

g2d.drawString(s, (w - stringWidth) / 2, h / 2);
 

This code line draws the string in the (horizontal) middle of the window. 

if (x &gt; 40)
    alpha -= 0.01;
 

After the string is higher than 40 points, it begins fading. 

In this part of the Java 2D tutorial, we did some visual effects.

[Contents](..) 
[Previous](../transformations/)
[Next](../java2dimages/)