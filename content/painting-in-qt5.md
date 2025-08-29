+++
title = "Painting in Qt5"
date = 2025-08-29T19:57:29.869+01:00
draft = false
description = "In this chapter of the Qt5 tutorial, we do some painting."
image = "images/lines.png"
imageBig = "images/lines.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../widgets2/)
[Next](../customwidget/)

# Painting in Qt5

last modified October 18, 2023

In this part of the Qt5 C++ programming tutorial we do some painting. 

The QPainter class is instrumental when we do some painting 
in Qt5. The painting is done with the QPainter class in a 
reaction to the paintEvent method.

## Lines

In the first example we paint some lines on the client area of the window. 

lines.h
  

#pragma once

#include &lt;QWidget&gt;

class Lines : public QWidget {

  public:
    Lines(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *event);
    void drawLines(QPainter *qp);
};

This is the header file. 

lines.cpp
  

#include &lt;QPainter&gt;
#include "lines.h"

Lines::Lines(QWidget *parent)
    : QWidget(parent)
{ }

void Lines::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);
  
  QPainter qp(this);
  drawLines(&amp;qp);
}

void Lines::drawLines(QPainter *qp) {
  
  QPen pen(Qt::black, 2, Qt::SolidLine);  
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 40, 250, 40);

  pen.setStyle(Qt::DashLine);
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 80, 250, 80);

  pen.setStyle(Qt::DashDotLine);
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 120, 250, 120);

  pen.setStyle(Qt::DotLine);
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 160, 250, 160);

  pen.setStyle(Qt::DashDotDotLine);
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 200, 250, 200);

  QVector&lt;qreal&gt; dashes;
  qreal space = 4;

  dashes &lt;&lt; 1 &lt;&lt; space &lt;&lt; 5 &lt;&lt; space;

  pen.setStyle(Qt::CustomDashLine);
  pen.setDashPattern(dashes);
  
  qp-&gt;setPen(pen);
  qp-&gt;drawLine(20, 240, 250, 240);
}

We paint six lines on the window; each of the lines has a different
pen style.

void Lines::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);
  
  QPainter qp(this);
  drawLines(&amp;qp);
}

The paintEvent is called when a widget is updated.
It is where we create the QPainter object and do the drawing.
Since we do not utilise the QPaintEvent object, we suppress the
compiler warning with the Q_UNUSED macro. The real drawing
is delegated to the drawLines method.

QPen pen(Qt::black, 2, Qt::SolidLine);
qp-&gt;setPen(pen);

We create a QPen object. The pen is solid, 2 px thick,
and of black colour. The pen is used to draw lines and outlines of shapes. 
The pen is set to the painter object with the setPen method.

qp-&gt;drawLine(20, 40, 250, 40);

The drawLine method draws a line. The four parameters are the coordinates of 
two points on the window. 

pen.setStyle(Qt::DashLine);

The setStyle method of the QPen line sets a pen style—a Qt::DashLine.

main.cpp
  

#include &lt;QApplication&gt;
#include "lines.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Lines window;
  
  window.resize(280, 270);
  window.setWindowTitle("Lines");
  window.show();

  return app.exec();
}

This is the main file. 

![lines.png](images/lines.png)

Figure: Lines

## Colours

A colour is an object representing a combination of Red, Green, and Blue (RGB) 
intensity values. Valid RGB values are in the range 0 to 255. In the following 
example, we draw nine rectangles filled with nine different colours. 

colours.h
  

#pragma once 

#include &lt;QWidget&gt;

class Colours : public QWidget {
    
  public:
    Colours(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);
    
  private:
    void doPainting();  
};

This is the header file. 

colours.cpp
  

#include &lt;QPainter&gt;
#include "colours.h"

Colours::Colours(QWidget *parent)
    : QWidget(parent)
{ }

void Colours::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);  
  
  doPainting();
}

void Colours::doPainting() {
    
  QPainter painter(this);
  painter.setPen(QColor("#d4d4d4"));

  painter.setBrush(QBrush("#c56c00"));
  painter.drawRect(10, 15, 90, 60);

  painter.setBrush(QBrush("#1ac500"));
  painter.drawRect(130, 15, 90, 60);

  painter.setBrush(QBrush("#539e47"));
  painter.drawRect(250, 15, 90, 60);
  
  painter.setBrush(QBrush("#004fc5"));
  painter.drawRect(10, 105, 90, 60);

  painter.setBrush(QBrush("#c50024"));
  painter.drawRect(130, 105, 90, 60);

  painter.setBrush(QBrush("#9e4757"));
  painter.drawRect(250, 105, 90, 60);

  painter.setBrush(QBrush("#5f3b00"));
  painter.drawRect(10, 195, 90, 60);

  painter.setBrush(QBrush("#4c4c4c"));
  painter.drawRect(130, 195, 90, 60);

  painter.setBrush(QBrush("#785f36"));
  painter.drawRect(250, 195, 90, 60);
}

We draw nine rectangles with different colour fills. The outline of the 
rectangles is gray. 

painter.setBrush(QBrush("#c56c00"));
painter.drawRect(10, 15, 90, 60);

The QBrush class defines the fill pattern of shapes drawn by 
QPainter. The drawRect method draws a rectangle. It draws a 
rectangle with upper left corner at x, y point 
and with the given width and height. We used a hexadecimal notation to 
specify a colour value. 

main.cpp
  

#include &lt;QApplication&gt;
#include "colours.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Colours window;
  
  window.resize(360, 280);
  window.setWindowTitle("Colours");
  window.show();
  
  return app.exec();
}

This is the main file. 

![colours.png](images/colours.png)

Figure: Colours

## Patterns

The following programming code example is similar to the previous one. 
This time we fill the rectangles with various predefined patterns. 

patterns.h
  

#pragma once

#include &lt;QWidget&gt;

class Patterns : public QWidget {
    
  public:
    Patterns(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);

  private:
    void doPainting();
};

This is the header file. 

patterns.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include "patterns.h"

Patterns::Patterns(QWidget *parent)
    : QWidget(parent)
{ }

void Patterns::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);  
  
  doPainting();
}

void Patterns::doPainting() {
    
  QPainter painter(this);
  painter.setPen(Qt::NoPen);

  painter.setBrush(Qt::HorPattern);
  painter.drawRect(10, 15, 90, 60);

  painter.setBrush(Qt::VerPattern);
  painter.drawRect(130, 15, 90, 60);

  painter.setBrush(Qt::CrossPattern);
  painter.drawRect(250, 15, 90, 60);
  
  painter.setBrush(Qt::Dense7Pattern);
  painter.drawRect(10, 105, 90, 60);

  painter.setBrush(Qt::Dense6Pattern);
  painter.drawRect(130, 105, 90, 60);

  painter.setBrush(Qt::Dense5Pattern);
  painter.drawRect(250, 105, 90, 60);

  painter.setBrush(Qt::BDiagPattern);
  painter.drawRect(10, 195, 90, 60);

  painter.setBrush(Qt::FDiagPattern);
  painter.drawRect(130, 195, 90, 60);

  painter.setBrush(Qt::DiagCrossPattern);
  painter.drawRect(250, 195, 90, 60);
}

We draw nine rectangles with various brush patterns. 

painter.setBrush(Qt::HorPattern);
painter.drawRect(10, 15, 90, 60);

We draw a rectangle with a specific pattern. The 
Qt::HorPattern is a constant used to 
create a pattern of horizontal lines. 

main.cpp
  

#include &lt;QDesktopWidget&gt;
#include &lt;QApplication&gt;
#include "patterns.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Patterns window;
  
  window.resize(350, 280);
  window.setWindowTitle("Patterns");
  window.show();

  return app.exec();
}

This is the main file. 

![patterns.png](images/patterns.png)

Figure: Patterns

## Transparent rectangles

Transparency is the quality of being able to see through a material. 
The easiest way to understand transparency is to imagine a piece of glass or water. 
Technically, the rays of light can go through the glass and this way we can see 
objects behind the glass.

In computer graphics, we can achieve transparency effects using alpha compositing. 
Alpha compositing is the process of combining an image with a background to create the 
appearance of partial transparency. The composition process uses an alpha channel. 

transparent_rectangles.h
  

#pragma once

#include &lt;QWidget&gt;

class TransparentRectangles : public QWidget {

  public:
    TransparentRectangles(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *event);
    void doPainting();
};

This is the header file. 

transparent_rectangles.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include &lt;QPainterPath&gt;
#include "transparent_rectangles.h"

TransparentRectangles::TransparentRectangles(QWidget *parent)
    : QWidget(parent)
{ }

void TransparentRectangles::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);
  
  doPainting();
}

void TransparentRectangles::doPainting() {
    
  QPainter painter(this);
  
  for (int i=1; i&lt;=11; i++) {
    painter.setOpacity(i*0.1);
    painter.fillRect(50*i, 20, 40, 40, Qt::darkGray);
  }    
}

The example draws ten rectangles with different levels of transparency.

painter.setOpacity(i*0.1);

The setOpacity method sets the opacity of the painter. 
The value should be in the range 0.0 to 1.0, where 0.0 is fully transparent 
and 1.0 is fully opaque.

main.cpp
  

#include &lt;QDesktopWidget&gt;
#include &lt;QApplication&gt;
#include "transparent_rectangles.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  TransparentRectangles window;

  window.resize(630, 90);  
  window.setWindowTitle("Transparent rectangles");
  window.show();

  return app.exec();
}

This is the main file. 

![transparent_rectangles.png](images/transparent_rectangles.png)

Figure: Transparent rectangles

## Donut

In the following example, we create a donut shape.

donut.h
  

#pragma once

#include &lt;QWidget&gt;

class Donut : public QWidget {
    
  public:
    Donut(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);
    
  private:
    void doPainting();  
};

This is the header file. 

donut.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include "donut.h"

Donut::Donut(QWidget *parent)
    : QWidget(parent)
{ }

void Donut::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);

  doPainting();
}

void Donut::doPainting() {
  
  QPainter painter(this);

  painter.setPen(QPen(QBrush("#535353"), 0.5));
  painter.setRenderHint(QPainter::Antialiasing);

  int h = height();
  int w = width();

  painter.translate(QPoint(w/2, h/2));

  for (qreal rot=0; rot &lt; 360.0; rot+=5.0 ) {
      painter.drawEllipse(-125, -40, 250, 80);
      painter.rotate(5.0);
  }
}

The "Donut" is an advanced geometrical shape resembling this kind of food. 
We create it by drawing 72 rotated ellipses. 

painter.setRenderHint(QPainter::Antialiasing);

We paint in antialiased mode. The rendering will be of higher quality. 

int h = height();
int w = width();

painter.translate(QPoint(w/2, h/2));

These lines move the beginning of the coordinate system into the middle 
of the window. By default, it is positioned at 0, 0 point. 
In another words, at the upper left corner of the window. By moving the 
coordinate system, the drawing will be much easier. 

for (qreal rot=0; rot &lt; 360.0; rot+=5.0 ) {
    painter.drawEllipse(-125, -40, 250, 80);
    painter.rotate(5.0);
}

In this for cycle, we draw 72 rotated ellipses. 

main.cpp
  

#include &lt;QDesktopWidget&gt;
#include &lt;QApplication&gt;
#include "donut.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Donut window;

  window.resize(350, 280);  
  window.setWindowTitle("Donut");
  window.show();

  return app.exec();
}

This is the main file. 

## Shapes

The Qt5 painting API can draw various shapes. The following programming code 
example shows some of them.

shapes.h
  

#pragma once

#include &lt;QWidget&gt;

class Shapes : public QWidget {
    
  public:
    Shapes(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);

  private:
    void doPainting();
};

This is the header file. 

shapes.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include &lt;QPainterPath&gt;
#include "shapes.h"

Shapes::Shapes(QWidget *parent)
    : QWidget(parent)
{ }

void Shapes::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);

  doPainting();
}

void Shapes::doPainting() {
  
  QPainter painter(this);

  painter.setRenderHint(QPainter::Antialiasing);
  painter.setPen(QPen(QBrush("#888"), 1));
  painter.setBrush(QBrush(QColor("#888")));

  QPainterPath path1;

  path1.moveTo(5, 5);
  path1.cubicTo(40, 5,  50, 50,  99, 99);
  path1.cubicTo(5, 99,  50, 50,  5, 5);
  painter.drawPath(path1);  

  painter.drawPie(130, 20, 90, 60, 30*16, 120*16);
  painter.drawChord(240, 30, 90, 60, 0, 16*180);
  painter.drawRoundRect(20, 120, 80, 50);

  QPolygon polygon({QPoint(130, 140), QPoint(180, 170), QPoint(180, 140),
      QPoint(220, 110), QPoint(140, 100)});

  painter.drawPolygon(polygon);

  painter.drawRect(250, 110, 60, 60);

  QPointF baseline(20, 250);
  QFont font("Georgia", 55);
  QPainterPath path2;
  path2.addText(baseline, font, "Q");
  painter.drawPath(path2);

  painter.drawEllipse(140, 200, 60, 60);
  painter.drawEllipse(240, 200, 90, 60);
}

We draw nine different shapes.  

QPainterPath path1;

path1.moveTo(5, 5);
path1.cubicTo(40, 5,  50, 50,  99, 99);
path1.cubicTo(5, 99,  50, 50,  5, 5);
painter.drawPath(path1);

The QPainterPath is an object used to create complex 
shapes. We use it to draw bezier curves. 

painter.drawPie(130, 20, 90, 60, 30*16, 120*16);
painter.drawChord(240, 30, 90, 60, 0, 16*180);
painter.drawRoundRect(20, 120, 80, 50);

These code lines draw a pie, a chord, and a rounded rectangle. 

QPolygon polygon({QPoint(130, 140), QPoint(180, 170), QPoint(180, 140),
    QPoint(220, 110), QPoint(140, 100)});

painter.drawPolygon(polygon);

Here we draw a polygon using the drawPolygon method. The polygon consists
of five points.  

QPointF baseline(20, 250);
QFont font("Georgia", 55);
QPainterPath path2;
path2.addText(baseline, font, "Q");
painter.drawPath(path2);

Qt5 allows to create a path based on a font character. 

painter.drawEllipse(140, 200, 60, 60);
painter.drawEllipse(240, 200, 90, 60);

The drawEllipse draws an ellipse and a circle as well. 
The circle is a special case of an ellipse. The parameters are the x and y coordinates
of the rectangle beginning and the width and height of the bounding rectangle of the ellipse.

main.cpp
  

#include &lt;QDesktopWidget&gt;
#include &lt;QApplication&gt;
#include "shapes.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Shapes window;

  window.resize(350, 280);  
  window.setWindowTitle("Shapes");
  window.show();

  return app.exec();
}

This is the example's main file. 

![shapes.png](images/shapes.png)

Figure: Shapes

## Gradients

In computer graphics, gradient is a smooth blending of shades from light 
to dark or from one colour to another. In 2D drawing programs and paint 
programs, gradients are used to create colourful backgrounds and special 
effects as well as to simulate lights and shadows. 

The following code example shows how to create linear gradients.

linear_gradients.h
  

#pragma once

#include &lt;QWidget&gt;

class LinearGradients : public QWidget {

  public:
    LinearGradients(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);
    
  private:
    void doPainting();  
};

This is the header file.

linear_gradients.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include "linear_gradients.h"

LinearGradients::LinearGradients(QWidget *parent)
    : QWidget(parent)
{ }

void LinearGradients::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);
  
  doPainting();
}  

void LinearGradients::doPainting() {
         
  QPainter painter(this);
  
  QLinearGradient grad1(0, 20, 0, 110);

  grad1.setColorAt(0.1, Qt::black);
  grad1.setColorAt(0.5, Qt::yellow);
  grad1.setColorAt(0.9, Qt::black);

  painter.fillRect(20, 20, 300, 90, grad1);

  QLinearGradient grad2(0, 55, 250, 0);

  grad2.setColorAt(0.2, Qt::black);
  grad2.setColorAt(0.5, Qt::red);
  grad2.setColorAt(0.8, Qt::black);

  painter.fillRect(20, 140, 300, 100, grad2);
}

In the code example, we draw two rectagles and fill them with linear 
gradients. 

QLinearGradient grad1(0, 20, 0, 110);

The QLinearGradient constructs a linear gradient with interpolation area
between two points provided as parameters.

grad1.setColorAt(0.1, Qt::black);
grad1.setColorAt(0.5, Qt::yellow);
grad1.setColorAt(0.9, Qt::black);

The colours in a gradient are defined using stop points. The 
setColorAt creates a stop point at the 
given position with the given colour.

painter.fillRect(20, 20, 300, 90, grad1);

We fill the rectangle with the gradient. 

main.cpp
  

#include &lt;QApplication&gt;
#include "linear_gradients.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  LinearGradients window;

  window.resize(350, 260);  
  window.setWindowTitle("Linear gradients");
  window.show();

  return app.exec();
}

This is the main file. 

![linear_gradients.png](images/linear_gradients.png)

Figure: Linear gradients

## Radial gradient

Radial gradients are blendings of colours or shades of colours between two circles.

radial_gradient.h
  

#pragma once

#include &lt;QWidget&gt;

class RadialGradient : public QWidget {

  public:
    RadialGradient(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);
    
  private:
    void doPainting();  
};

This is the header file.

radial_gradient.cpp
  

#include &lt;QApplication&gt;
#include &lt;QPainter&gt;
#include "radial_gradient.h"

RadialGradient::RadialGradient(QWidget *parent)
    : QWidget(parent)
{ }

void RadialGradient::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);
  
  doPainting();
}

void RadialGradient::doPainting() {
  
  QPainter painter(this);
  
  int h = height();
  int w = width();

  QRadialGradient grad1(w/2, h/2, 80);

  grad1.setColorAt(0, QColor("#032E91"));
  grad1.setColorAt(0.3, Qt::white);
  grad1.setColorAt(1, QColor("#032E91"));

  painter.fillRect(0, 0, w, h, grad1);
}

The example creates a radial gradient; the gradient spreads 
from the center of the window.

QRadialGradient grad1(w/2, h/2, 80);

QRadialGradient creates a radial gradient; it interpolates 
colours between a focal point and end points on a circle surrounding it. 
The parameters are coordinates of the circle's center point and its radius.
The focal point lies at the center of the circle.

grad1.setColorAt(0, QColor("#032E91"));
grad1.setColorAt(0.3, Qt::white);
grad1.setColorAt(1, QColor("#032E91"));

The setColorAt method defines coloured stops.

painter.fillRect(0, 0, w, h, grad1);

The whole area of the window is filled with the radial gradient.

main.cpp
  

#include &lt;QApplication&gt;
#include "radial_gradient.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  RadialGradient window;

  window.resize(300, 250);  
  window.setWindowTitle("Radial gradient");
  window.show();

  return app.exec();
}

This is the main file.

![radialgradient.png](images/radialgradient.png)

Figure: Radial gradient

## Puff

In the last example of this C++ Qt5 tutorial chapter, we create a puff effect. 
The example displays a growing centered text that gradully fades out
from some point. This is a very common effect, which you can often see in flash 
animations on the web.

puff.h
  

#pragma once

#include &lt;QWidget&gt;

class Puff : public QWidget {

  public:
    Puff(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *event);
    void timerEvent(QTimerEvent *event);

  private:
    int x;
    qreal opacity;
    int timerId;
    
    void doPainting();
};

In the header file, we have two event handlers defined: paint event handler 
and timer handler. 

puff.cpp
  

#include &lt;QPainter&gt;
#include &lt;QTimer&gt;
#include &lt;QTextStream&gt;
#include "puff.h"

Puff::Puff(QWidget *parent)
    : QWidget(parent) {
        
  x = 1;
  opacity = 1.0;
  timerId = startTimer(15);
}

void Puff::paintEvent(QPaintEvent *e) {
    
  Q_UNUSED(e);  
  
  doPainting();
}

void Puff::doPainting() {
  
  QPainter painter(this);
  QTextStream out(stdout);

  QString text = "ZetCode";

  painter.setPen(QPen(QBrush("#575555"), 1));

  QFont font("Courier", x, QFont::DemiBold);
  QFontMetrics fm(font);
  int textWidth = fm.width(text);

  painter.setFont(font);

  if (x &gt; 10) {
    opacity -= 0.01;
    painter.setOpacity(opacity);
  }

  if (opacity &lt;= 0) {
    killTimer(timerId);
    out &lt;&lt; "timer stopped" &lt;&lt; endl;
  }

  int h = height();
  int w = width();

  painter.translate(QPoint(w/2, h/2));
  painter.drawText(-textWidth/2, 0, text);
}

void Puff::timerEvent(QTimerEvent *e) {
    
  Q_UNUSED(e);
  
  x += 1;
  repaint();
}

This is the puff.cpp file. 

Puff::Puff(QWidget *parent)
    : QWidget(parent) {
        
  x = 1;
  opacity = 1.0;
  timerId = startTimer(15);
}

At the constructor, we start the timer. Each 15 ms a 
timer event is generated. 

void Puff::timerEvent(QTimerEvent *e) {
    
  Q_UNUSED(e);
  
  x += 1;
  repaint();
}

Inside the timerEvent we increase the font size and 
repaint the widget. 

if (x &gt; 10) {
  opacity -= 0.01;
  painter.setOpacity(opacity);
}

If the font size is greater than 10 points, we gradually 
decrease the opacity; the text starts to fade away. 

if (opacity &lt;= 0) {
  killTimer(timerId);
  out &lt;&lt; "timer stopped" &lt;&lt; endl;
}

If the text completely fades away, we kill the timer. 

main.cpp
  

#include &lt;QApplication&gt;
#include "puff.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv); 

  Puff window;

  window.resize(350, 280);
  window.setWindowTitle("Puff");
  window.show();

  return app.exec();
}

This is the main file. 

This chapter was about painting in Qt5.

[Contents](..)
[Previous](../widgets2/)
[Next](../customwidget/)