+++
title = "First programs in Qt4"
date = 2025-08-29T19:57:20.509+01:00
draft = false
description = "In this chapter of the Qt4 tutorial, we create our first programs in Qt4"
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../files/)
[Next](../menusandtoolbars/)

# First programs in Qt4

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we create our first programs.

We display an application icon, a tooltip, and various mouse cursors. 
We center a window on the screen and introduce the signal and slot mechanism.

## Simple example

We start with a very simple example. 

simple.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;

int main(int argc, char *argv[]) {

    QApplication app(argc, argv);

    QWidget window;

    window.resize(250, 150);
    window.setWindowTitle("Simple example");
    window.show();

    return app.exec();
}

The example shows a basic window on the screen. 

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;

We include necessary header files. 

QApplication app(argc, argv);

This is the application object. Each Qt4 application must create this object. 
(Except for console applications.)

QWidget window;

This is our main widget. 

window.resize(250, 150);
window.setWindowTitle("Simple example");
window.show();

Here we resize the widget and set a title for our main window. In this case, 
the QWidget is our main window. And finally, we show 
the widget on the screen. 

return app.exec();

The exec method stars the main loop of the application.

![simple.png](images/simple.png)

Figure: Simple example

## Centering the window

If we do not position the window ourselves, the window manager will 
position it for us. In the next example, we center the window.

center.cpp
  

#include &lt;QApplication&gt;
#include &lt;QDesktopWidget&gt;
#include &lt;QWidget&gt;

int main(int argc, char *argv[]) {

  int WIDTH = 250;
  int HEIGHT = 150;

  int screenWidth;
  int screenHeight;

  int x, y;

  QApplication app(argc, argv);

  QWidget window;

  QDesktopWidget *desktop = QApplication::desktop();

  screenWidth = desktop-&gt;width();
  screenHeight = desktop-&gt;height(); 

  x = (screenWidth - WIDTH) / 2;
  y = (screenHeight - HEIGHT) / 2;

  window.resize(WIDTH, HEIGHT);
  window.move( x, y );
  window.setWindowTitle("Center");
  window.show();

  return app.exec();
}

There are plenty of monitor sizes and resolution types. In order to 
center a window, we must determine the desktop width and height. 
For this, we use the QDesktopWidget class.

QDesktopWidget *desktop = QApplication::desktop();

screenWidth = desktop-&gt;width();
screenHeight = desktop-&gt;height(); 

Here we determine the screen width and height. 

x = (screenWidth - WIDTH) / 2;
y = (screenHeight - HEIGHT) / 2;

Here we compute the upper left point of our centered window. 

window.resize(WIDTH, HEIGHT);
window.move( x, y );

We resize the widget and move it to the computed position. Note
that we must first resize the widget. We move it afterwards. 

## A tooltip

A tooltip is a specific hint about an item in an application. The 
following example will demonstrate, how we can 
create a tooltip in Qt4 programming library. 

tooltip.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);  

  QWidget window;

  window.resize(250, 150);
  window.move(300, 300);
  window.setWindowTitle("ToolTip");
  window.setToolTip("QWidget");
  window.show();

  return app.exec();
}

The example shows a tooltip for the main QWidget.

window.setWindowTitle("ToolTip");

We set a tooltip for the QWidget widget with the setToolTip
method.

![tooltip.png](images/tooltip.png)

Figure: A tooltip

## The application icon

In the next example, we show the application icon. Most window managers 
display the icon in the left corner of the titlebar and also on the taskbar.

icon.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;
#include &lt;QIcon&gt;

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);  
    
  QWidget window;

  window.resize(250, 150);
  window.setWindowTitle("Icon");
  window.setWindowIcon(QIcon("web.png"));
  window.show();

  return app.exec();
}

An icon is shown in the upper left corner of the window.

window.setWindowIcon(QIcon("web.png"));

To display an icon, we use the setWindowIcon 
method and a QIcon class. The icon is a small
PNG file located in the current working directory.

![icon.png](images/icon.png)

Figure: Icon

## Cursors

A cursor is a small icon that indicates the position of the 
mouse pointer. In the next example will show various cursors
that we can use in our programs. 

cursors.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;
#include &lt;QFrame&gt;
#include &lt;QGridLayout&gt;

class Cursors : public QWidget
{
 public:
     Cursors(QWidget *parent = 0);
};

Cursors::Cursors(QWidget *parent)
    : QWidget(parent) {
    
  QFrame *frame1 = new QFrame(this);
  frame1-&gt;setFrameStyle(QFrame::Box);
  frame1-&gt;setCursor(Qt::SizeAllCursor);

  QFrame *frame2 = new QFrame(this);
  frame2-&gt;setFrameStyle(QFrame::Box);
  frame2-&gt;setCursor(Qt::WaitCursor);

  QFrame *frame3 = new QFrame(this);
  frame3-&gt;setFrameStyle(QFrame::Box);
  frame3-&gt;setCursor(Qt::PointingHandCursor);

  QGridLayout *grid = new QGridLayout(this);
  grid-&gt;addWidget(frame1, 0, 0);
  grid-&gt;addWidget(frame2, 0, 1);
  grid-&gt;addWidget(frame3, 0, 2);

  setLayout(grid);
}

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);  
    
  Cursors window;

  window.resize(350, 150);
  window.setWindowTitle("Cursors");
  window.show();

  return app.exec();
}

In this example, we use three frames. Each of the 
frames has a different cursor set. 

QFrame *frame1 = new QFrame(this);

A QFrame widget is created.

frame1-&gt;setFrameStyle(QFrame::Box);

We set a frame style with the setFrameStyle method.
This way we can see the boundaries of the frames.

frame1-&gt;setCursor(Qt::SizeAllCursor);

A cursor is set to the frame with the setCursor method.

QGridLayout *grid = new QGridLayout(this);
grid-&gt;addWidget(frame1, 0, 0);
grid-&gt;addWidget(frame2, 0, 1);
grid-&gt;addWidget(frame3, 0, 2);
setLayout(grid);

This will group all the frames into one row. We talk more about this in the
layout management chapter. 

## QPushButton

In the next code example, we display a push button on the window. 
By clicking on the button we close the application. 

pushbutton.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;
#include &lt;QPushButton&gt;

class MyButton : public QWidget {
    
 public:
     MyButton(QWidget *parent = 0);
};

MyButton::MyButton(QWidget *parent)
    : QWidget(parent) {
           
  QPushButton *quitBtn = new QPushButton("Quit", this);
  quitBtn-&gt;setGeometry(50, 40, 75, 30);

  connect(quitBtn, SIGNAL(clicked()), qApp, SLOT(quit()));
}

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  MyButton window;

  window.resize(250, 150);  
  window.setWindowTitle("QPushButton");
  window.show();

  return app.exec();
}

In this code example, we use the concept of the signals
and slots for the first time.

QPushButton *quitBtn = new QPushButton("Quit", this);
quitBtn-&gt;setGeometry(50, 40, 75, 30);

We create a new QPushButton. We manually resize it and place it 
on the window with the setGeometry method.

connect(quitBtn, SIGNAL(clicked()), qApp, SLOT(quit()));

When we click on the button, a clicked signal is 
generated. The slot is the method which reacts to the signal. 
In our case it is the quit slot of the main 
application object. The qApp is a global pointer 
to the application object. It is defined in the
QApplication header file. 

![pushbutton.png](images/pushbutton.png)

Figure: QPushButton

## Plus minus

We finish this section showing how widgets can communicate. 
The code is split into three files. 

plusminus.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QApplication&gt;
#include &lt;QPushButton&gt;
#include &lt;QLabel&gt;

class PlusMinus : public QWidget {
    
  Q_OBJECT

  public:
    PlusMinus(QWidget *parent = 0);

  private slots:
    void OnPlus();
    void OnMinus();

  private:
    QLabel *lbl;
};

This is the header file of the example. In this file, we define two 
slots and a label widget. 

class PlusMinus : public QWidget {
    
  Q_OBJECT
...  

The Q_OBJECT macro must be included in classes that
declare their own signals and slots.

plusminus.cpp
  

#include "plusminus.h"
#include &lt;QGridLayout&gt;

PlusMinus::PlusMinus(QWidget *parent)
    : QWidget(parent) {
        
  QPushButton *plsBtn = new QPushButton("+", this);
  QPushButton *minBtn = new QPushButton("-", this);
  lbl = new QLabel("0", this);
  
  QGridLayout *grid = new QGridLayout(this);
  grid-&gt;addWidget(plsBtn, 0, 0);
  grid-&gt;addWidget(minBtn, 0, 1);
  grid-&gt;addWidget(lbl, 1, 1);

  setLayout(grid);  

  connect(plsBtn, SIGNAL(clicked()), this, SLOT(OnPlus()));
  connect(minBtn, SIGNAL(clicked()), this, SLOT(OnMinus()));
}

void PlusMinus::OnPlus() {
    
  int val = lbl-&gt;text().toInt();
  val++;
  lbl-&gt;setText(QString::number(val));
}

void PlusMinus::OnMinus() {
    
  int val = lbl-&gt;text().toInt();
  val--;
  lbl-&gt;setText(QString::number(val));
}

We have two push buttons and a label widget. We increase or decrease 
the number displayed by the label with the buttons. 

connect(plsBtn, SIGNAL(clicked()), this, SLOT(OnPlus()));
connect(minBtn, SIGNAL(clicked()), this, SLOT(OnMinus()));

Here we connect the clicked signals to the slots. 

void PlusMinus::OnPlus() {
    
  int val = lbl-&gt;text().toInt();
  val++;
  lbl-&gt;setText(QString::number(val));
}

In the OnPlus method, we determine the current 
value of the label. The label widget displays a string value, so we must 
convert it to the integer. We increase the number and set a new text 
for the label. We convert a number to the string value. 

main.cpp
  

#include "plusminus.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  PlusMinus window;

  window.resize(300, 190);
  window.setWindowTitle("Plus minus");
  window.show();

  return app.exec();
}

This is the main file of the code example.

![plusminus.png](images/plusminus.png)

Figure: Plus minus

In this chapter, we created our first programs in Qt4.

[Contents](..)
[Previous](../files/)
[Next](../menusandtoolbars/)