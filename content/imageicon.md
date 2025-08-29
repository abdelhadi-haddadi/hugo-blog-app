+++
title = "ImageIcon"
date = 2025-08-29T19:59:05.087+01:00
draft = false
description = "ImageIcon tutorial shows how to use ImageIcon in Java. We will paint an icon, scale an icon, create a custom icon, and put icons into various Swing components."
image = "images/painting_icon.png"
imageBig = "images/painting_icon.png"
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ImageIcon

last modified January 27, 2024

 

In this article we are going to work with ImageIcon. We will paint an icon, 
scale an icon, create a custom icon, and put icons into various Swing components.

## ImageIcon

Icon is small fixed size picture, typically used to decorate components. 
ImageIcon is an implementation of the Icon interface that paints 
icons from images. Images can be created from a URL, filename, or byte array.

paintIcon(Component c, Graphics g, int x, int y)

The Icon's paintIcon method draws the icon at the specified location. 

## ImageIcon constructors

ImageIcon has several constructors, including:

- ImageIcon(byte[] imageData) — creates an ImageIcon from an array of bytes.

- ImageIcon(Image image) — creates an ImageIcon from an image object.

- ImageIcon(String filename) — creates an ImageIcon the specified file.

- ImageIcon(URL location) — creates an ImageIcon from the specified URL.

ImageIcon can work with PNG, JPEG, and GIF images. If we want to work with BMP or ICO images,
we can use the *image4j* library.

## Painting icon

In the first example, we are going to paint an icon
on the panel. 

PaintingIconEx.java
  

package com.zetcode;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Graphics;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JPanel;

class DrawingPanel extends JPanel {

    private ImageIcon icon;

    public DrawingPanel() {

        loadImage();
        initPanel();
    }

    private void loadImage() {

        icon = new ImageIcon("book.jpg");
    }
    
    private void initPanel() {

        int w = icon.getIconWidth();
        int h = icon.getIconHeight();
        setPreferredSize(new Dimension(w, h));
    }    

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        icon.paintIcon(this, g, 0, 0);
    }
}

public class PaintingIconEx extends JFrame {

    public PaintingIconEx() {

        initUI();
    }

    private void initUI() {

        DrawingPanel dpnl = new DrawingPanel();

        createLayout(dpnl);

        setTitle("Image");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {

        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );

        gl.setVerticalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
        );

        pack();
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            JFrame ex = new PaintingIconEx();
            ex.setVisible(true);
        });
    }
}

The example loads an image from the filesystem into an ImageIcon
and paints it on the JPanel component.

private void loadImage() {

    icon = new ImageIcon("book.jpg");
}

We load a JPG image into the ImageIcon. The image is
located in the project root directory.

private void initPanel() {

    int w = icon.getIconWidth();
    int h = icon.getIconHeight();
    setPreferredSize(new Dimension(w, h));
}

In the initPanel method, we determine the width and
height of the icon with the getIconWidth and getIconHeight
methods. We set the preferred size of the panel to match the icon size.

@Override
public void paintComponent(Graphics g) {
    super.paintComponent(g);

    icon.paintIcon(this, g, 0, 0);
}

In the paintComponent method, we paint the icon on the panel
with the paintIcon method.

![painting_icon.png](images/painting_icon.png)

Figure: Painting icon

## Scaling image

The following example shows a simple way to scale an image.

ImageIconScaleEx.java
  

package com.zetcode;

import java.awt.Container;
import java.awt.EventQueue;
import java.awt.Image;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
import javax.swing.JLabel;

public class ImageIconScaleEx extends JFrame {

    public ImageIconScaleEx() {

        initUI();
    }

    private void initUI() {

        ImageIcon originalIcon = new ImageIcon("slovakia.png");
        JLabel originalLabel = new JLabel(originalIcon);

        int width = originalIcon.getIconWidth() / 2;
        int height = originalIcon.getIconHeight() / 2;

        Image scaled = scaleImage(originalIcon.getImage(), width, height);

        ImageIcon scaledIcon = new ImageIcon(scaled);

        JLabel newLabel = new JLabel(scaledIcon);

        createLayout(originalLabel, newLabel);

        setTitle("Scaled icon");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private Image scaleImage(Image image, int w, int h) {

        Image scaled = image.getScaledInstance(w, h, Image.SCALE_SMOOTH);

        return scaled;
    }

    private void createLayout(JComponent... arg) {

        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setAutoCreateContainerGaps(true);
        gl.setAutoCreateGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
        );

        gl.setVerticalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
        );

        pack();
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            ImageIconScaleEx ex = new ImageIconScaleEx();
            ex.setVisible(true);
        });
    }
}  

There are two images shown on the window: the original image 
and next to it the scaled image.

ImageIcon originalIcon = new ImageIcon("slovakia.png");

We read a PNG image into the ImageIcon. The image
is located in the project root directory.

int width = originalIcon.getIconWidth() / 2;
int height = originalIcon.getIconHeight() / 2;

We get the width and height of the original image with the 
getIconWidth and getIconHeight 
methods.

Image scaled = scaleImage(originalIcon.getImage(), width, height);

We pass the Image of the icon, its with and height
to the scaleImage method, where we perform the 
scaling operation.

private Image scaleImage(Image image, int w, int h) {

    Image scaled = image.getScaledInstance(w, h, Image.SCALE_SMOOTH);

    return scaled;
}

The getScaledInstance creates a scaled version of the
Image. We use a Image.SCALE_SMOOTH scaling operation
which gives higher priority to image smoothness than scaling speed.

ImageIcon scaledIcon = new ImageIcon(scaled);

JLabel newLabel = new JLabel(scaledIcon);

We create an ImageIcon from the Image and
pass it to a JLabel component.

![scaling.png](images/scaling.png)

Figure: Scaling image

## Custom icon

The Swing painting API can be also used to create a custom icon. The graphics context
is passed to the paintIcon method.

CustomIconEx.java
  

package com.zetcode;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.EventQueue;
import java.awt.Graphics;
import java.awt.Graphics2D;
import javax.swing.Icon;
import javax.swing.JFrame;
import javax.swing.JLabel;

class MissingIcon implements Icon {

    private final int WIDTH = 32;
    private final int HEIGHT = 32;

    private final BasicStroke stroke = new BasicStroke(5);

    @Override
    public void paintIcon(Component c, Graphics g, int x, int y) {

        doDrawing(g, x, y);
    }

    public void doDrawing(Graphics g, int x, int y) {

        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setColor(Color.white);
        g2d.fillRect(x + 1, y + 1, WIDTH - 2, HEIGHT - 2);

        g2d.setColor(Color.darkGray);
        g2d.drawRect(x + 1, y + 1, WIDTH - 2, HEIGHT - 2);

        g2d.setColor(Color.red);

        g2d.setStroke(stroke);
        g2d.drawLine(x + 10, y + 10, x + WIDTH - 10, y + HEIGHT - 10);
        g2d.drawLine(x + 10, y + HEIGHT - 10, x + WIDTH - 10, y + 10);

        g2d.dispose();
    }

    @Override
    public int getIconWidth() {
        return WIDTH;
    }

    @Override
    public int getIconHeight() {
        return HEIGHT;
    }
}

class MyLabel extends JLabel {

    public MyLabel(Icon icon) {
        super(icon);
    }

    @Override
    public boolean isOpaque() {
        return true;
    }
}

public class CustomIconEx extends JFrame {

    public CustomIconEx() {

        initUI();
    }

    private void initUI() {

        JLabel lbl = new MyLabel(new MissingIcon());
        lbl.setBackground(Color.gray);
        add(lbl);

        setSize(250, 150);
        setTitle("Custom icon");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            CustomIconEx ex = new CustomIconEx();
            ex.setVisible(true);
        });
    }
}

The example creates a missing custom icon and shows it
on a window with JLabel.

class MissingIcon implements Icon {

To create a custom icon, we implement the Icon interface.

@Override
public int getIconWidth() {
    return WIDTH;
}

@Override
public int getIconHeight() {
    return HEIGHT;
}

We override the getIconWidth and getIconHeight
methods, which determine the size of the icon.

@Override
public void paintIcon(Component c, Graphics g, int x, int y) {

    doDrawing(g, x, y);
}

We override the paintIcon method, in which the icon is painted. 
The Graphics object exposes a number of methods for drawing 
2D shapes and obtaining information about the application's graphics environment. 

public void doDrawing(Graphics g, int x, int y) {

    Graphics2D g2d = (Graphics2D) g.create();

    g2d.setColor(Color.white);
    g2d.fillRect(x + 1, y + 1, WIDTH - 2, HEIGHT - 2);

    g2d.setColor(Color.darkGray);
    g2d.drawRect(x + 1, y + 1, WIDTH - 2, HEIGHT - 2);

    g2d.setColor(Color.red);

    g2d.setStroke(stroke);
    g2d.drawLine(x + 10, y + 10, x + WIDTH - 10, y + HEIGHT - 10);
    g2d.drawLine(x + 10, y + HEIGHT - 10, x + WIDTH - 10, y + 10);

    g2d.dispose();
}

Inside the doDrawing method, we draw the icon. The process is identical to
drawing inside the paintComponent method. The Graphics2D 
class extends the Graphics class to provide more sophisticated control 
over geometry, coordinate transformations, color management, and text layout.

class MyLabel extends JLabel {

    public MyLabel(Icon icon) {
        super(icon);
    }

    @Override
    public boolean isOpaque() {
        return true;
    }
}

We have a custom MyLabel component. We make it opaque, that is, 
the label has a background.

JLabel lbl = new MyLabel(new MissingIcon());

The icon is set to the label component.

![custom_icon.png](images/custom_icon.png)

Figure: Missing custom icon

## ImageIcon buttons

It is possible to place ImageIcons on JButton components.

ImageIconButtonsEx.java
  

package com.zetcode;

import java.awt.Container;
import java.awt.EventQueue;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;

public class ImageIconButtonsEx extends JFrame {

    public ImageIconButtonsEx() {

        initUI();
    }

    private void initUI() {

        ImageIcon quitIcon = new ImageIcon("quit.png");
        ImageIcon saveIcon = new ImageIcon("save.png");
        ImageIcon homeIcon = new ImageIcon("home.png");

        JButton quitBtn = new JButton(quitIcon);
        JButton saveBtn = new JButton(saveIcon);
        JButton homeBtn = new JButton(homeIcon);

        createLayout(quitBtn, saveBtn, homeBtn);

        setTitle("JButtons");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void createLayout(JComponent... arg) {

        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setAutoCreateContainerGaps(true);
        gl.setAutoCreateGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
                .addComponent(arg[2])
        );

        gl.setVerticalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
                .addComponent(arg[2])
        );

        gl.linkSize(arg[0], arg[1], arg[2]);

        pack();
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            ImageIconButtonsEx ex = new ImageIconButtonsEx();
            ex.setVisible(true);
        });
    }
}

We have three buttons. Each of them displays an ImageIcon.

ImageIcon quitIcon = new ImageIcon("quit.png");
ImageIcon saveIcon = new ImageIcon("save.png");
ImageIcon homeIcon = new ImageIcon("home.png");

Three ImageIcons are created. We pass a file name to each
of the constructors. The PNG files are located in the project root directory.

JButton quitBtn = new JButton(quitIcon);
JButton saveBtn = new JButton(saveIcon);
JButton homeBtn = new JButton(homeIcon);

JButton component accepts ImageIcon as a parameter.

![image_buttons.png](images/image_buttons.png)

Figure: Image buttons

## JFrame icon

JFrame component can show an icon in its titlebar.
It is shown in the left part of the titlebar.

FrameIconEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;

public class FrameIconEx extends JFrame {

    public FrameIconEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        ImageIcon webIcon = new ImageIcon("web.png");

        setIconImage(webIcon.getImage());

        setTitle("Icon");
        setSize(300, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
    
    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            FrameIconEx ex = new FrameIconEx();
            ex.setVisible(true);
        });
    }
}

The web.png is a small, 22x22px image file.

ImageIcon webIcon = new ImageIcon("web.png");

We create an ImageIcon from a PNG file, which
is located in the project root directory.

setIconImage(webIcon.getImage());

The setIconImage sets the image to be displayed as 
the icon for this window. The getImage returns the 
icon's Image.

![frameicon.png](images/frameicon.png)

Figure: Icon

## ImageIcon in JLabel

In the following example, we place ImageIcons into JLabel components.

ImageIconLabelEx.java
  

package com.zetcode;

import java.awt.Container;
import java.awt.EventQueue;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
import javax.swing.JLabel;

public class ImageIconLabelEx extends JFrame {

    public ImageIconLabelEx() {
        
        initUI();
    }
    
    private void initUI() {

        JLabel lbl1 = new JLabel(new ImageIcon("cpu.png"));
        JLabel lbl2 = new JLabel(new ImageIcon("drive.png"));
        JLabel lbl3 = new JLabel(new ImageIcon("laptop.png"));
        JLabel lbl4 = new JLabel(new ImageIcon("player.png"));
        JLabel lbl5 = new JLabel(new ImageIcon("pda.png"));

        createLayout(lbl1, lbl2, lbl3, lbl4, lbl5);

        setTitle("Icons");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
    
    private void createLayout(JComponent... arg) {
        
        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);        

        gl.setAutoCreateContainerGaps(true);
        gl.setAutoCreateGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
                .addComponent(arg[2])
                .addComponent(arg[3])
                .addComponent(arg[4])
        );

        gl.setVerticalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
                .addComponent(arg[2])
                .addComponent(arg[3])
                .addComponent(arg[4])
        );

        pack();
    }    

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            ImageIconLabelEx ex = new ImageIconLabelEx();
            ex.setVisible(true);
        });
    }
}

There are five PNG files in a project root directory.
They are displayed on the windows in JLabel
components.

JLabel lbl1 = new JLabel(new ImageIcon("cpu.png"));
JLabel lbl2 = new JLabel(new ImageIcon("drive.png"));
JLabel lbl3 = new JLabel(new ImageIcon("laptop.png"));
JLabel lbl4 = new JLabel(new ImageIcon("player.png"));
JLabel lbl5 = new JLabel(new ImageIcon("pda.png"));

JLabel has a constructor which takes an ImageIcon
as a parameter.

![label_icons.png](images/label_icons.png)

Figure: Icons in labels

## ImageIcon in JTabbedPane

JTabbedPane is a Swing component that lets the user switch between a 
group of components by clicking on a tab. The tabs can contains ImageIcons.

ImageIconTabbedPaneEx
  

package com.zetcode;

import java.awt.Container;
import java.awt.Dimension;
import java.awt.EventQueue;
import javax.swing.GroupLayout;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import static javax.swing.JFrame.EXIT_ON_CLOSE;
import javax.swing.JPanel;
import javax.swing.JTabbedPane;

public class ImageIconTabbedPaneEx extends JFrame {

    public ImageIconTabbedPaneEx() {
        
        initUI();
    }
    
    private void initUI() {
        
        ImageIcon icon1 = new ImageIcon("dot1.png");
        ImageIcon icon2 = new ImageIcon("dot2.png");
        ImageIcon icon3 = new ImageIcon("dot3.png");
        
        JTabbedPane tbp = new JTabbedPane();
        tbp.setPreferredSize(new Dimension(350, 250));
        
        tbp.addTab("", icon1, new JPanel());
        tbp.addTab("", icon2, new JPanel());
        tbp.addTab("", icon3, new JPanel());

        createLayout(tbp);

        setTitle("Icons");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
    
    private void createLayout(JComponent... arg) {
        
        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);        

        gl.setAutoCreateContainerGaps(true);
        gl.setAutoCreateGaps(true);

        gl.setHorizontalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
        );

        gl.setVerticalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
        );

        pack();
    }    

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            ImageIconTabbedPaneEx ex = new ImageIconTabbedPaneEx();
            ex.setVisible(true);
        });
    }
}  

The example shows ImageIcons in the tabs of a JTabbedPane component.

ImageIcon icon1 = new ImageIcon("dot1.png");

ImageIcon is created.

JTabbedPane tbp = new JTabbedPane();

JTabbedPane is created.

tbp.addTab("", icon1, new JPanel());

The second parameter of the addTab method is
an ImageIcon.

![tabbedpane_icons.png](images/tabbedpane_icons.png)

Figure: JTabbedPane icons

## Source

[Java ImageIcon - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.desktop/javax/swing/ImageIcon.html)

This tutorial was dedicated to the Java ImageIcon. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).