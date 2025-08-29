+++
title = "Custom widget in Qt4"
date = 2025-08-29T19:57:19.001+01:00
draft = false
description = "In this part of the Qt4 tutorial, we create a custom widget."
image = "images/burning.png"
imageBig = "images/burning.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../painting/)
[Next](../breakoutgame/)

# Custom widget in Qt4

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we create a custom widget.

Most toolkits usually provide only the most common widgets like buttons, 
text widgets, or sliders. No toolkit can provide all possible widgets. 
Programmers must create such widgets by themselves. They do it by using 
the drawing tools provided by the toolkit. There are two possibilities:
a programmer can modify or enhance an existing widget or he can create 
a custom widget from scratch.

## The Burning widget

In the next example we create a custom Burning widget. This widget can be 
seen in applications like Nero or K3B. The widget will be created from scratch. 

burning.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QSlider&gt;
#include &lt;QFrame&gt;
#include "widget.h"

class Burning : public QFrame {

  Q_OBJECT  

  public:
    Burning(QWidget *parent = 0);
    int getCurrentWidth();
    
  public slots:
    void valueChanged(int);
    
  private:
    QSlider *slider;
    Widget *widget;
    int cur_width;
    
    void initUI();
};

This is the header file of the main window of the example.

public:
  Burning(QWidget *parent = 0);
  int getCurrentWidth();

The getCurrentWidth method is going to be used to determine the 
slider value. 

private:
  QSlider *slider;
  Widget *widget;
  int cur_width;
    
  void initUI();

We have two widgets on the client area of the window: A built-in slider widget
and a custom widget. The cur_width variable will hold 
the current value from the slider. This value is used when painting the custom widget. 

burning.cpp
  

#include &lt;QtGui&gt;
#include "burning.h"

Burning::Burning(QWidget *parent)
    : QFrame(parent) {
           
  initUI();
}

void Burning::initUI() {
    
  const int MAX_VALUE = 750; 
  cur_width = 0; 
  
  slider = new QSlider(Qt::Horizontal , this); 
  slider-&gt;setMaximum(MAX_VALUE);
  slider-&gt;setGeometry(50, 50, 130, 30);

  connect(slider, SIGNAL(valueChanged(int)), 
          this, SLOT(valueChanged(int)));
  
  QVBoxLayout *vbox = new QVBoxLayout(this);
  QHBoxLayout *hbox = new QHBoxLayout();

  vbox-&gt;addStretch(1);

  widget = new Widget(this);  
  hbox-&gt;addWidget(widget, 0);

  vbox-&gt;addLayout(hbox);

  setLayout(vbox);    
}

void Burning::valueChanged(int val) {
    
  cur_width = val;
  widget-&gt;repaint();
}

int Burning::getCurrentWidth() {
    
  return cur_width;
}

Here we build the main window of the example.

connect(slider, SIGNAL(valueChanged(int)), 
        this, SLOT(valueChanged(int)));

When we move the slider, the valueChanged slot is 
executed. 

void Burning::valueChanged(int val) {

  cur_width = val;
  widget-&gt;repaint();
}

When we change the value of the slider, we store the new 
value and repaint the custom widget. 

widget.h
  

#pragma once

#include &lt;QFrame&gt;

class Burning;

class Widget : public QFrame {

  Q_OBJECT  

  public:
    Widget(QWidget *parent = 0);

  protected:
    void paintEvent(QPaintEvent *e);
    void drawWidget(QPainter &amp;qp);

  private:
    QWidget *m_parent;
    Burning *burn;
};

This is the header file of the custom burning widget.

private:
  QWidget *m_parent;
  Burning *burn;

We store a pointer to the parent widget. We get the 
cur_width through this pointer.

widget.cpp
  

#include &lt;QtGui&gt;
#include "widget.h"
#include "burning.h"

const int PANEL_HEIGHT = 30;

Widget::Widget(QWidget *parent)
    : QFrame(parent) {
        
  m_parent = parent;
  setMinimumHeight(PANEL_HEIGHT);
}

void Widget::paintEvent(QPaintEvent *e) {
  
  QPainter qp(this);
  drawWidget(qp);
  
  QFrame::paintEvent(e);  
}

void Widget::drawWidget(QPainter &amp;qp) {
      
  const int DISTANCE = 19;
  const int LINE_WIDTH = 5;
  const int DIVISIONS = 10;
  const float FULL_CAPACITY = 700;
  const float MAX_CAPACITY = 750;    
  
  QString num[] = { "75", "150", "225", "300", "375", "450", 
    "525", "600", "675" };
  int asize = sizeof(num)/sizeof(num[1]); 
  
  QColor redColor(255, 175, 175);
  QColor yellowColor(255, 255, 184);  
  
  int width = size().width();

  Burning *burn = (Burning *) m_parent;
  int cur_width = burn-&gt;getCurrentWidth();

  int step = (int) qRound(width / DIVISIONS);
  int till = (int) ((width / MAX_CAPACITY) * cur_width);
  int full = (int) ((width / MAX_CAPACITY) * FULL_CAPACITY);

  if (cur_width &gt;= FULL_CAPACITY) {
      
    qp.setPen(yellowColor); 
    qp.setBrush(yellowColor);
    qp.drawRect(0, 0, full, 30);
    qp.setPen(redColor);
    qp.setBrush(redColor);
    qp.drawRect(full, 0, till-full, PANEL_HEIGHT);

  } else if (till &gt; 0) {
       
    qp.setPen(yellowColor);
    qp.setBrush(yellowColor);
    qp.drawRect(0, 0, till, PANEL_HEIGHT);
  }

  QColor grayColor(90, 80, 60);
  qp.setPen(grayColor);
  
  for (int i=1; i &lt;=asize; i++) {
      
    qp.drawLine(i*step, 0, i*step, LINE_WIDTH);
    QFont newFont = font();
    newFont.setPointSize(7);
    setFont(newFont);

    QFontMetrics metrics(font());

    int w = metrics.width(num[i-1]);
    qp.drawText(i*step-w/2, DISTANCE, num[i-1]);
  }
}

Here we paint the custom widget. We paint the rectangle, vertical lines, 
and the numbers. 

void Widget::paintEvent(QPaintEvent *e) {
  
  QPainter qp(this);
  drawWidget(qp);
  
  QFrame::paintEvent(e);  
}

The drawing of the custom widget is delegated to the 
drawWidget method.

const int DISTANCE = 19;
const int LINE_WIDTH = 5;
const int DIVISIONS = 10;
const float FULL_CAPACITY = 700;
const float MAX_CAPACITY = 750;   

These are the important constants. The DISTANCE is the distance of the 
numbers on the scale from the top of their parent border. The LINE_WIDTH 
is the vertical line width. The DIVISIONS is 
the number of parts of the scale. The FULL_CAPACITY is the capacity of 
the media. After it is reached, overburning happens. This is visualized by a red 
colour. The MAX_CAPACITY is the maximum capacity of a medium.

QString num[] = { "75", "150", "225", "300", "375", "450", 
  "525", "600", "675" }; 

We use these numbers to build the scale of the Burning widget.

int width = size().width(); 

We get the width of the widget. The width of the custom widget is dynamic. 
It can be resized by the user.

Burning *burn = (Burning *) m_parent;
int cur_width = burn-&gt;getCurrentWidth();

We get the cur_width value.

int till = (int) ((width / MAX_CAPACITY) * cur_width);
int full = (int) ((width / MAX_CAPACITY) * FULL_CAPACITY); 

We use the width variable to do the transformations, between the values of 
the scale and the custom widget's measures. 

qp.setPen(redColor);
qp.setBrush(redColor);
qp.drawRect(full, 0, till-full, PANEL_HEIGHT); 

These three lines draw the red rectangle, indicating the overburning.

qp.drawLine(i*step, 0, i*step, LINE_WIDTH); 

Here we draw the small vertical lines.

QFontMetrics metrics(font());

int w = metrics.width(num[i-1]);
qp.drawText(i*step-w/2, DISTANCE, num[i-1]);

Here we draw the numbers of the scale. To precisely position the numbers, 
we must get the width of the string.

main.cpp
  

#include &lt;QApplication&gt;
#include "burning.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);
  Burning window;

  window.resize(370, 200);
  window.setWindowTitle("The Burning widget");
  window.show();

  return app.exec();
}

This is the main file. 

![burning.png](images/burning.png)

Figure: The Burning widget

In this part of the Qt4 tutorial, we have created a custom Burning widget.

[Contents](..)
[Previous](../painting/)
[Next](../breakoutgame/)