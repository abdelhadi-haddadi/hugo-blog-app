+++
title = "Composition"
date = 2025-08-29T19:54:48.456+01:00
draft = false
description = "In this part of the Java 2D tutorial, we work with image composition."
image = "images/composition.png"
imageBig = "images/composition.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../transparency/)
[Next](../clipping/)

# Composition

last modified July 17, 2023

In this part of the Java 2D programming tutorial, we define compositing operations.

*Compositing* is the combining of visual elements from separate sources into single images. 
They are used to create the illusion that all those elements are parts of the same scene. 
Compositing is widely used in film industry to create crowds, entire new worlds which 
would be expensive or impossible to create otherwise. (wikipedia.org) 

## Operations

There are several compositing operations. We show some of them in 
the next code example. The AlphaComposite class 
implements basic alpha compositing rules for combining source and destination 
colours to achieve blending and transparency effects with graphics and images.

Say we want to draw two objects on a panel. The first object drawn is called 
a destination, the second one a source. The AlphaComposite 
class determines how these two objects are going to be blended together. If we have a 
AlphaComposite.SRC_OVER rule, the pixels of the source object 
will be drawn where the two objects overlap. 

com/zetcode/CompositionEx.java
  

package com.zetcode;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private final int rules[] = {
        AlphaComposite.DST,
        AlphaComposite.DST_ATOP,
        AlphaComposite.DST_OUT,
        AlphaComposite.SRC,
        AlphaComposite.SRC_ATOP,
        AlphaComposite.SRC_OUT
    };    
    
    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        for (int x = 20, y = 20, i = 0; i &lt; rules.length; x += 60, i++) {

            AlphaComposite ac = AlphaComposite.getInstance(rules[i], 0.8f);

            BufferedImage buffImg = new BufferedImage(60, 60,
                    BufferedImage.TYPE_INT_ARGB);
            Graphics2D gbi = buffImg.createGraphics();

            gbi.setPaint(Color.blue);
            gbi.fillRect(0, 0, 40, 40);
            gbi.setComposite(ac);

            gbi.setPaint(Color.green);
            gbi.fillRect(5, 5, 40, 40);

            g2d.drawImage(buffImg, x, y, null);
            gbi.dispose();
        }
        
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class CompositionEx extends JFrame {

    public CompositionEx() {

        add(new Surface());

        setTitle("Composition");
        setSize(400, 120);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                CompositionEx ex = new CompositionEx();
                ex.setVisible(true);
            }
        });
    }
}

We draw two rectangles and combine them with six different compositing operations. 

private final int rules[] = {
    AlphaComposite.DST,
    AlphaComposite.DST_ATOP,
    AlphaComposite.DST_OUT,
    AlphaComposite.SRC,
    AlphaComposite.SRC_ATOP,
    AlphaComposite.SRC_OUT
}; 

Here we have six different compositing rules. 

AlphaComposite ac = AlphaComposite.getInstance(rules[i], 0.8f);

Here we get the AlphaComposite class. 

BufferedImage buffImg = new BufferedImage(60, 60,
        BufferedImage.TYPE_INT_ARGB);
 

We use a buffer image to perform the compositing operations. 

Graphics2D gbi = buffImg.createGraphics();
 

A Graphics2D object is created from the buffered image
using the createGraphics method.

gbi.setComposite(ac);
 

The setComposite method sets the composite for the 
Graphics2D context.

g2d.drawImage(buffImg, x, y, null);
 

The buffered image is drawn on the panel using the drawImage
method.

gbi.dispose();
 

The created graphics object must be disposed.

![composition.png](images/composition.png)

Figure: Composition

## Sun and cloud

In the next example we show the Sun coming from behind a cloud. We use
composition technique in this animation.

com/zetcode/SunAndCloudEx.java
  

package com.zetcode;

import java.awt.AlphaComposite;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.Timer;

class Surface extends JPanel implements ActionListener {

    private Image sun;
    private Image cloud;
    private Timer timer;
    private float alpha = 1f;
    
    private final int DELAY = 600;

    public Surface() {

        loadImages();
        initTimer();
    }

    private void loadImages() {

        sun = new ImageIcon("sun.png").getImage();
        cloud = new ImageIcon("cloud.png").getImage();
    }

    private void initTimer() {

        timer = new Timer(DELAY, this);
        timer.start();
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        BufferedImage buffImg = new BufferedImage(220, 140,
                BufferedImage.TYPE_INT_ARGB);
        Graphics2D gbi = buffImg.createGraphics();

        AlphaComposite ac = AlphaComposite.getInstance(
                AlphaComposite.SRC_OVER, alpha);

        gbi.drawImage(sun, 40, 30, null);
        gbi.setComposite(ac);
        gbi.drawImage(cloud, 0, 0, null);

        g2d.drawImage(buffImg, 20, 20, null);

        gbi.dispose();
        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }

    private void step() {
        
        alpha -= 0.1;

        if (alpha &lt;= 0) {

            alpha = 0;
            timer.stop();
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        step();
        repaint();
    }
}

public class SunAndCloudEx extends JFrame {

    public SunAndCloudEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Sun and cloud");
        setSize(300, 210);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {

                SunAndCloudEx ex = new SunAndCloudEx();
                ex.setVisible(true);
            }
        });
    }
}

The Sun comes from behind the cloud. The cloud finally disappears.  

private void loadImages() {
    
    sun = new ImageIcon("sun.png").getImage();
    cloud = new ImageIcon("cloud.png").getImage();
}
 

We load two images from the disk. 

private void initTimer() {

    timer = new Timer(DELAY, this);
    timer.start();
}
 

Inside the initTimer method the timer is activated. 

AlphaComposite ac = AlphaComposite.getInstance(
        AlphaComposite.SRC_OVER, alpha);
 

We use the AlphaComposite.SRC_OVER rule—the source 
blends with destination and overwrites empty pixels. 

gbi.drawImage(sun, 40, 30, null);
gbi.setComposite(ac);
gbi.drawImage(cloud, 0, 0, null);

g2d.drawImage(buffImg, 20, 20, null);
 

The images are rendered into a BufferedImage and are later copied to the screen. 
The setComposite specifies how new pixels are to be combined with 
the existing pixels on the graphics device during the rendering process.

![sunandcloud.png](images/sunandcloud.png)

Figure: Sun &amp; cloud

## Spotlight

A spotlight is a strong beam of light that illuminates only a small 
area, used especially to center attention on a stage performer.

com/zetcode/SpotlightEx.java
  

package com.zetcode;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private final int RADIUS = 50;
    private Image image;
    private int iw;
    private int ih;
    private int x;
    private int y;
    private boolean mouseIn;

    public Surface() {

        initUI();
    }

    private void initUI() {

        loadImage();

        iw = image.getWidth(null);
        ih = image.getHeight(null);

        addMouseMotionListener(new MyMouseAdapter());
        addMouseListener(new MyMouseAdapter());
    }

    private void loadImage() {

        image = new ImageIcon("penguin.png").getImage();
    }

    @Override
    protected void paintComponent(Graphics g) {
    
        super.paintComponent(g);
        doDrawing(g);
    }

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        int midX = (getWidth() - iw) / 2;
        int midY = (getHeight() - ih) / 2;

        BufferedImage bi = new BufferedImage(getWidth(),
                getHeight(), BufferedImage.TYPE_INT_ARGB);
        Graphics2D bigr = bi.createGraphics();

        if (mouseIn) {
            bigr.setPaint(Color.white);
            bigr.fillOval(x - RADIUS, y - RADIUS, RADIUS * 2,
                    RADIUS * 2);
            bigr.setComposite(AlphaComposite.SrcAtop);
            bigr.drawImage(image, midX, midY, iw, ih, this);
        }

        bigr.setComposite(AlphaComposite.SrcOver.derive(0.1f));
        bigr.drawImage(image, midX, midY, iw, ih, this);
        bigr.dispose();

        g2d.drawImage(bi, 0, 0, getWidth(), getHeight(), this);

        g2d.dispose();
    }

    private class MyMouseAdapter extends MouseAdapter {

        @Override
        public void mouseExited(MouseEvent e) {
            mouseIn = false;
            repaint();
        }

        @Override
        public void mouseEntered(MouseEvent e) {
            mouseIn = true;
        }

        @Override
        public void mouseMoved(MouseEvent e) {

            x = e.getX();
            y = e.getY();

            repaint();
        }
    }
}

public class SpotlightEx extends JFrame {

    public SpotlightEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setSize(350, 300);
        setTitle("Spotlight");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                SpotlightEx ex = new SpotlightEx();
                ex.setVisible(true);
            }
        });
    }
}

The spotlight effect is created with the composition rules and the alpha
transparency value. It is also important to note that our image has a 
transparent background.

BufferedImage bi = new BufferedImage(getWidth(),
        getHeight(), BufferedImage.TYPE_INT_ARGB);
 

A BufferedImage is created. Its dimension is equal to the
dimension of the panel. Our PNG file has a transparent background; 
therefore, we use the BufferedImage.TYPE_INT_ARGB image type.

if (mouseIn) {
    bigr.fillOval(x - RADIUS, y - RADIUS, RADIUS * 2,
            RADIUS * 2);
    bigr.setComposite(AlphaComposite.SrcAtop);
    bigr.drawImage(image, midX, midY, iw, ih, this);
}
 

The AlphaComposite.SrcAtop rule is used to paint a fully 
opaque circle around the mouse pointer if a mouse is in the panel's area.

bigr.setComposite(AlphaComposite.SrcOver.derive(0.1f));
bigr.drawImage(image, midX, midY, iw, ih, this);
 

These two lines paint the rest of the image. The AlphaComposite.SrcOver 
rule is used to create a highly transparent image, which is blended with its background.

g2d.drawImage(bi, 0, 0, getWidth(), getHeight(), this);
 

In the final step, the buffered image is painted over the whole area
of the panel.

![spotlight.png](images/spotlight.png)

Figure: Spotlight

In this part of the Java 2D tutorial, we have talked about image composition.

[Contents](..) 
[Previous](../transparency/)
[Next](../clipping/)