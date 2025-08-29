+++
title = "Text and Fonts"
date = 2025-08-29T19:54:52.928+01:00
draft = false
description = "In this part of the Java 2D tutorial, we work with text and fonts."
image = "images/soulmate.png"
imageBig = "images/soulmate.png"
categories = ["gfx"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../java2dimages/)
[Next](../hitmove/)

# Text and Fonts

last modified July 17, 2023

In this part of the Java 2D tutorial we work with texts and fonts.

## Text and fonts

Rendering text is another complicated topic. It would easily fill a specialized
book. Here we only provide some basic examples.

A *character* is a symbol that represents an item such as a letter,
a digit, or a punctuation. A *glyph* is a shape used to render a character
or a sequence of characters. In the Latin alphabet a glyph typically represents
one character. In other writing systems, a character may be composed of several
glyphs, like ť, ž, ú, ô. These are Latin characters with accents.

There are two types of fonts: physical and logical. *Physical*
fonts are the actual font libraries. *Logical* fonts are the five font
families defined by the Java platform: Serif, SansSerif, Monospaced, Dialog,
and DialogInput. Logical fonts are not actual font libraries. Logical font
names are mapped to physical fonts by the Java runtime environment.

Text can be drawn on the window using various fonts. A *font* is a set of
type characters of a particular typeface design and size. Various typefaces include
Helvetica, Georgia, Times, or Verdana. A collection of glyphs with a particular
style form a *font face*. A collection of font faces forms a *font family*.
(docs.oracle.com, answers.com)

## System fonts

This console example will print all available fonts on your platform.

com/zetcode/AllFontsEx.java
  

package com.zetcode;

import java.awt.Font;
import java.awt.GraphicsEnvironment;

public class AllFontsEx {

    public static void main(String[] args) {

        GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
        Font[] fonts = ge.getAllFonts();

        for (Font font : fonts) {
            System.out.print(font.getFontName() + " : ");
            System.out.println(font.getFamily());
        }
    }
}

We print the name and family of each of the installed fonts.

GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();

There are objects that are typical for a particular platform—fonts are
among these objects. The collection of fonts on a Unix, OS X, and Windows
platform differ. The GraphicsEnvironment class describes
the collection of GraphicsDevice objects and Font
objects available on a particular platform.

Font[] fonts = ge.getAllFonts();

The getAllFonts returns all fonts available in the
GraphicsEnvironment.

System.out.print(fonts[i].getFontName() + " : ");
System.out.println(fonts[i].getFamily());

The font name and the font family is printed to the terminal.

...
URW Bookman L Demi Bold : URW Bookman L
URW Bookman L Demi Bold Italic : URW Bookman L
URW Bookman L Light : URW Bookman L
URW Bookman L Light Italic : URW Bookman L
URW Chancery L Medium Italic : URW Chancery L
URW Gothic L Book : URW Gothic L
URW Gothic L Book Oblique : URW Gothic L
URW Gothic L Demi : URW Gothic L
URW Gothic L Demi Oblique : URW Gothic L
URW Palladio L Bold : URW Palladio L
URW Palladio L Bold Italic : URW Palladio L
URW Palladio L Italic : URW Palladio L
URW Palladio L Roman : URW Palladio L
Ubuntu : Ubuntu
Ubuntu Bold : Ubuntu
Ubuntu Bold Italic : Ubuntu
Ubuntu Condensed : Ubuntu Condensed
Ubuntu Italic : Ubuntu
...

This is an excerpt of all fonts on Ubuntu Linux.

## Soulmate

In the next example we display some lyrics on the panel.

com/zetcode/SoulmateEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        RenderingHints rh =
            new RenderingHints(RenderingHints.KEY_ANTIALIASING,
            RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
               RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        g2d.setFont(new Font("Purisa", Font.PLAIN, 13));

        g2d.drawString("Most relationships seem so transitory", 20, 30);
        g2d.drawString("They're all good but not the permanent one", 20, 60);
        g2d.drawString("Who doesn't long for someone to hold", 20, 90);
        g2d.drawString("Who knows how to love you without being told", 20, 120);
        g2d.drawString("Somebody tell me why I'm on my own", 20, 150);
        g2d.drawString("If there's a soulmate for everyone", 20, 180);
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class SoulmateEx extends JFrame {

    public SoulmateEx() {

        initUI();
    }

    private void initUI() {

        setTitle("Soulmate");

        add(new Surface());

        setSize(420, 250);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                SoulmateEx ex = new SoulmateEx();
                ex.setVisible(true);
            }
        });
    }
}

In this example, we draw text on the panel. We choose a specific font type.

g2d.setFont(new Font("Purisa", Font.PLAIN, 13));

Here we set a Purisa font type.

g2d.drawString("Most relationships seem so transitory", 20, 30);

The drawString method renders the text  using the current
text attribute state in the Graphics2D context.

![soulmate.png](images/soulmate.png)

Figure: Soulmate

## Unicode

The next example demonstrates how to display Unicode text. Note that in
real world applications, the text would be placed outside of the code in
a separate resource.

$ cat fyodor
Фёдор Михайлович Достоевский родился 30 октября (11 ноября) 1821 года в Москве.
Был вторым из 7 детей. Отец, Михаил Андреевич, работал в госпитале для бедных.
...

We have a file called fyodor where we have the text in azbuka.

$ native2ascii fyodor unicode

We use the tool called native2ascii, which can be
found in the bin directory of the jdk. It converts a file with native-encoded
characters to one with Unicode-encoded characters. The first parameter is the
input file, and the second parameter is the output file.

$ cat unicode
\u0424\u0451\u0434\u043e\u0440 \u041c\u0438\u0445\u0430\u0439\u043b\u043e\u0432\u0438\u0447
...

The same text in unicode encoding.

com/zetcode/UnicodeEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    String sent1 = "\u0424\u0451\u0434\u043e\u0440 \u041c\u0438\u0445" +
"\u0430\u0439\u043b\u043e\u0432\u0438\u0447 \u0414\u043e\u0441\u0442" +
"\u043e\u0435\u0432\u0441\u043a\u0438\u0439 \u0440\u043e\u0434\u0438" +
"\u043b\u0441\u044f 30 \u043e\u043a\u0442\u044f\u0431\u0440\u044f " +
"(11 \u043d\u043e\u044f\u0431\u0440\u044f) 1821 \u0433\u043e\u0434" +
"\u0430 \u0432 \u041c\u043e\u0441\u043a\u0432\u0435. ";

    String sent2 = "\u0411\u044b\u043b \u0432\u0442\u043e\u0440\u044b\u043c " +
"\u0438\u0437 7 \u0434\u0435\u0442\u0435\u0439. \u041e\u0442\u0435\u0446, " +
"\u041c\u0438\u0445\u0430\u0438\u043b \u0410\u043d\u0434\u0440\u0435\u0435" +
"\u0432\u0438\u0447, \u0440\u0430\u0431\u043e\u0442\u0430\u043b \u0432 " +
"\u0433\u043e\u0441\u043f\u0438\u0442\u0430\u043b\u0435 \u0434\u043b\u044f " +
"\u0431\u0435\u0434\u043d\u044b\u0445.";

    String sent3 = "\u041c\u0430\u0442\u044c, \u041c\u0430\u0440\u0438\u044f " +
"\u0424\u0451\u0434\u043e\u0440\u043e\u0432\u043d\u0430 " +
"(\u0432 \u0434\u0435\u0432\u0438\u0447\u0435\u0441\u0442\u0432\u0435 " +
"\u041d\u0435\u0447\u0430\u0435\u0432\u0430), \u043f\u0440\u043e\u0438\u0441" +
"\u0445\u043e\u0434\u0438\u043b\u0430 \u0438\u0437 \u043a\u0443\u043f\u0435" +
"\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u0440\u043e\u0434\u0430.";

    String sent4 = "\u041a\u043e\u0433\u0434\u0430 \u0414\u043e\u0441\u0442" +
"\u043e\u0435\u0432\u0441\u043a\u043e\u043c\u0443 \u0431\u044b\u043b\u043e 15 " +
"\u043b\u0435\u0442, \u0435\u0433\u043e \u043c\u0430\u0442\u044c " +
"\u0443\u043c\u0435\u0440\u043b\u0430 \u043e\u0442 \u0447\u0430\u0445\u043e" +
"\u0442\u043a\u0438, \u0438 \u043e\u0442\u0435\u0446 \u043e\u0442\u043f\u0440" +
"\u0430\u0432\u0438\u043b";

    String sent5 = "\u0441\u0442\u0430\u0440\u0448\u0438\u0445 \u0441\u044b" +
"\u043d\u043e\u0432\u0435\u0439, \u0424\u0451\u0434\u043e\u0440\u0430 \u0438 " +
"\u041c\u0438\u0445\u0430\u0438\u043b\u0430 (\u0432\u043f\u043e\u0441\u043b" +
"\u0435\u0434\u0441\u0442\u0432\u0438\u0438 \u0442\u0430\u043a\u0436\u0435 " +
"\u0441\u0442\u0430\u0432\u0448\u0435\u0433\u043e \u043f\u0438\u0441\u0430" +
"\u0442\u0435\u043b\u0435\u043c),";

    String sent6 = "\u0432 \u043f\u0430\u043d\u0441\u0438\u043e\u043d \u041a. " +
"\u0424. \u041a\u043e\u0441\u0442\u043e\u043c\u0430\u0440\u043e\u0432\u0430 " +
"\u0432 \u041f\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435.";

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        RenderingHints rh =
            new RenderingHints(RenderingHints.KEY_ANTIALIASING,
            RenderingHints.VALUE_ANTIALIAS_ON);

        rh.put(RenderingHints.KEY_RENDERING,
               RenderingHints.VALUE_RENDER_QUALITY);

        g2d.setRenderingHints(rh);

        g2d.setFont(new Font("Franklin Gothic Medium", Font.PLAIN, 11));

        g2d.drawString(sent1, 20, 30);
        g2d.drawString(sent2, 20, 55);
        g2d.drawString(sent3, 20, 80);
        g2d.drawString(sent4, 20, 120);
        g2d.drawString(sent5, 20, 145);
        g2d.drawString(sent6, 20, 170);
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class UnicodeEx extends JFrame {

    public UnicodeEx() {

        initUI();
    }

    private void initUI() {

        setTitle("Unicode");

        add(new Surface());

        setSize(550, 230);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                UnicodeEx ex = new UnicodeEx();
                ex.setVisible(true);
            }
        });
    }
}

Note that the text would go outside source code in real world programs. Here the text is
kept inside the source for simplicity reasons.

String sent1 = "\u0424\u0451\u0434\u043e\u0440 \u041c\u0438\u0445" +
...

This is the first Unicode sentence.

g2d.drawString(sent1, 20, 30);

The sentence is drawn with the drawString method.

![unicode.png](images/unicode.png)

Figure: Unicode

## Shadowed text

In the next example, we create a shadowed text. The effect is created by drawing
the same text two times. One text serves as the main text, the other one
as a shadow. The shadowed text is moved a bit, colored in light gray, and blurred.

com/zetcode/ShadowedTextEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.TextLayout;
import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class ShadowedTextEx extends JFrame {

    private final int width = 490;
    private final int height = 150;

    private final String text = "Disciplin ist macht";
    private TextLayout textLayout;

    public ShadowedTextEx() {

        initUI();
    }

    private void initUI() {

        setTitle("Shadowed Text");

        BufferedImage image = createImage();
        add(new JLabel(new ImageIcon(image)));

        setSize(490, 150);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    private void setRenderingHints(Graphics2D g) {

        g.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
                           RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        g.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS,
                           RenderingHints.VALUE_FRACTIONALMETRICS_ON);
    }

    private BufferedImage createImage()  {

        int x = 10;
        int y = 100;

        Font font = new Font("Georgia", Font.ITALIC, 50);

        BufferedImage image = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_RGB);
        Graphics2D g1d = image.createGraphics();
        setRenderingHints(g1d);
        textLayout = new TextLayout(text, font, g1d.getFontRenderContext());
        g1d.setPaint(Color.WHITE);
        g1d.fillRect(0, 0, width, height);

        g1d.setPaint(new Color(150, 150, 150));
        textLayout.draw(g1d, x+3, y+3);
        g1d.dispose();

        float[] kernel = {
          1f / 9f, 1f / 9f, 1f / 9f,
          1f / 9f, 1f / 9f, 1f / 9f,
          1f / 9f, 1f / 9f, 1f / 9f
        };

        ConvolveOp op =  new ConvolveOp(new Kernel(3, 3, kernel),
                ConvolveOp.EDGE_NO_OP, null);
        BufferedImage image2 = op.filter(image, null);

        Graphics2D g2d = image2.createGraphics();
        setRenderingHints(g2d);
        g2d.setPaint(Color.BLACK);
        textLayout.draw(g2d, x, y);

        g2d.dispose();

        return image2;
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                ShadowedTextEx ex = new ShadowedTextEx();
                ex.setVisible(true);
            }
        });
    }
}

This time we do not draw in the paintComponent method;
instead we paint into buffered images.

Font font = new Font("Georgia", Font.ITALIC, 50);

We choose italic Georgia, of 50 points size.

BufferedImage image = new BufferedImage(width, height,
        BufferedImage.TYPE_INT_RGB);

We create the first buffered image.

Graphics2D g1d = image.createGraphics();

From the buffered image a Graphics2D object is created. It will be
used to draw into the buffered image.

textLayout = new TextLayout(text, font, g1d.getFontRenderContext());

We create a TextLayout class. TextLayout is an immutable
graphical representation of styled character data. It is used for advanced
manipulation with the text and font.

textLayout.draw(g1d, x+3, y+3);

The draw method renders this TextLayout at the specified
location in the specified Graphics2D context.
The second and the third parameter specify the coordinates of the origin
of the TextLayout.

float[] kernel = {
    1f / 9f, 1f / 9f, 1f / 9f,
    1f / 9f, 1f / 9f, 1f / 9f,
    1f / 9f, 1f / 9f, 1f / 9f
};

ConvolveOp op =  new ConvolveOp(new Kernel(3, 3, kernel),
        ConvolveOp.EDGE_NO_OP, null);

This operation creates the blur effect. The effect is used for the
shadow text.

BufferedImage image2 = op.filter(image, null);

We apply the blur effect on the first image and copy the outcome to
the second buffered image.

textLayout.draw(g2d, x, y);

At this point, we have both the original text and the blurred text in
the TextLayout object.

![shadowedtext.png](images/shadowedtext.png)

Figure: Shadowed text

## Text attributes

When we draw text, we can control its various attributes. We can modify
text rendering with the Font, TextAttributes, and
AttributeString classes. The Font class represents fonts
which are used to render text. The TextAttribute class defines attribute
keys and attribute values used for text rendering. Finally, the
AttributedString class holds text and related attribute information.

com/zetcode/TextAttributesEx.java
  

package com.zetcode;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.TextAttribute;
import java.text.AttributedString;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private final String words = "Valour fate kinship darkness";
    private final String java = "Java TM";

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g;

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        Font font = new Font("Serif", Font.PLAIN, 40);

        AttributedString as1 = new AttributedString(words);
        as1.addAttribute(TextAttribute.FONT, font);

        as1.addAttribute(TextAttribute.FOREGROUND, Color.red, 0, 6);
        as1.addAttribute(TextAttribute.UNDERLINE,
                TextAttribute.UNDERLINE_ON, 7, 11);
        as1.addAttribute(TextAttribute.BACKGROUND, Color.LIGHT_GRAY, 12, 19);
        as1.addAttribute(TextAttribute.STRIKETHROUGH,
                TextAttribute.STRIKETHROUGH_ON, 20, 28);

        g2d.drawString(as1.getIterator(), 15, 60);

        AttributedString as2 = new AttributedString(java);

        as2.addAttribute(TextAttribute.SIZE, 40);
        as2.addAttribute(TextAttribute.SUPERSCRIPT,
                TextAttribute.SUPERSCRIPT_SUPER, 5, 7);

        g2d.drawString(as2.getIterator(), 130, 125);
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class TextAttributesEx extends JFrame {

    public TextAttributesEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setSize(620, 190);
        setTitle("Text attributes");
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                TextAttributesEx ex = new TextAttributesEx();
                ex.setVisible(true);
            }
        });
    }
}

In our example, we demonstrate various text rendering possibilities.

AttributedString as1 = new AttributedString(words);

We create an AttributeString out of the words string.

as1.addAttribute(TextAttribute.FOREGROUND, Color.red, 0, 6);

Here we add a new attribute to the AttributeString class. This
attribute specifies that the first seven characters will be rendered in red colour.

g2d.drawString(as1.getIterator(), 15, 60);

The first text is drawn on the panel. Because at the moment we work with the
AttributeString class and not directly with the string,
we use an overloaded drawString method, which takes a
AttributedCharacterIterator instance as its first parameter.

![textattributes.png](images/textattributes.png)

Figure: Text Attributes

## Rotated Text

In the last example, we show a rotated text on the panel. To rotate a text, we
perform rotation and translation operations. As we already stated, a
glyph is a shape used to render a character. So in our code
example, we need to get all glyphs of our text, get their measurements, and
manipulate them one by one.

We work with several important classes. The FontRenderContext
class is a container for the information needed to correctly measure text. The
GlyphVector object is a collection of glyphs containing geometric
information for the placement of each glyph in the transformed coordinate space.

com/zetcode/RotatedTextEx.java
  

package com.zetcode;

import java.awt.EventQueue;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.Shape;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import javax.swing.JFrame;
import javax.swing.JPanel;

class Surface extends JPanel {

    private void doDrawing(Graphics g) {

        Graphics2D g2d = (Graphics2D) g.create();

        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        String s = "ZetCode, tutorials for programmers";

        Font font = new Font("Courier", Font.PLAIN, 13);

        g2d.translate(20, 20);

        FontRenderContext frc = g2d.getFontRenderContext();

        GlyphVector gv = font.createGlyphVector(frc, s);
        int length = gv.getNumGlyphs();

        for (int i = 0; i &lt; length; i++) {

            Point2D p = gv.getGlyphPosition(i);
            double theta = (double) i / (double) (length - 1) * Math.PI / 3;
            AffineTransform at = AffineTransform.getTranslateInstance(p.getX(),
                    p.getY());
            at.rotate(theta);

            Shape glyph = gv.getGlyphOutline(i);
            Shape transformedGlyph = at.createTransformedShape(glyph);
            g2d.fill(transformedGlyph);
        }

        g2d.dispose();
    }

    @Override
    public void paintComponent(Graphics g) {

        super.paintComponent(g);
        doDrawing(g);
    }
}

public class RotatedTextEx extends JFrame {

    public RotatedTextEx() {

        initUI();
    }

    private void initUI() {

        add(new Surface());

        setTitle("Rotated text");
        setSize(450, 300);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                RotatedTextEx ex = new RotatedTextEx();
                ex.setVisible(true);
            }
        });
    }
}

This is a rotated text example.

String s = "ZetCode, tutorials for programmers";

We rotate this text. Because the text is in Latin1 encoding, glyphs
correspond to characters in a one-to-one manner.

GlyphVector gv = font.createGlyphVector(frc, s);

Here we create a GlyphVector object. A GlyphVector
is a collection of glyphs and their positions.

int length = gv.getNumGlyphs();

Here we get the number of glyphs of our text. If we print the number to
the console, we get 34. So in our case, each character is one glyph.

Point2D p = gv.getGlyphPosition(i);

As we iterate through the vector of glyphs, we calculate the glyph's position with
the getGlyphPosition method.

double theta = (double) i / (double) (length - 1) * Math.PI / 3;

We calculate the degree by which the glyph is going to be rotated.

AffineTransform at = AffineTransform.getTranslateInstance(p.getX(),
    p.getY());
at.rotate(theta);

We do an affine rotate transformation.

Shape glyph = gv.getGlyphOutline(i);
Shape transformedGlyph = at.createTransformedShape(glyph);

The getGlyphOutline method returns a Shape
of the specified glyph. The createTransformedShape method returns
a new Shape object modified by our affine transform operation.

g2d.fill(transformedGlyph);

Finally, we paint the glyph.

![rotatedtext.png](images/rotatedtext.png)

Figure: Rotated text

In this part of the Java 2D tutorial, we covered text and fonts.

[Contents](..)
[Previous](../java2dimages/)
[Next](../hitmove/)