+++
title = "First programs in Qt5"
date = 2025-08-29T19:57:27.359+01:00
draft = false
description = "In this chapter of the Qt5 tutorial, we create our first programs in Qt5"
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../files/)
[Next](../menusandtoolbars/)

# First programs in Qt5

last modified October 18, 2023

In this part of the Qt5 C++ programming tutorial, we create our first programs.

We display a tooltip and various mouse cursors. We center a window on the screen
and introduce the signal and slot mechanism.

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

This is the application object. Each Qt5 application must create this object.
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

## A tooltip

A tooltip is a specific hint about an item in an application. The
following example will demonstrate, how we can
create a tooltip in Qt5 programming library.

tooltip.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  QWidget window;

  window.resize(350, 250);
  window.setWindowTitle("ToolTip");
  window.setToolTip("QWidget");
  window.show();

  return app.exec();
}

The example shows a tooltip for the main QWidget.

window.setWindowTitle("ToolTip");

We set a tooltip for the QWidget widget with the
setToolTip method.

![tooltip.png](images/tooltip.png)

Figure: A tooltip

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
 -->

## Qt5 Cursors

A cursor is a small icon that indicates the position of the mouse pointer. In
the next example will show various cursors that we can use in our programs.

cursors.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;
#include &lt;QFrame&gt;
#include &lt;QGridLayout&gt;

class Cursors : public QWidget {

 public:
     Cursors(QWidget *parent = nullptr);
};

Cursors::Cursors(QWidget *parent)
    : QWidget(parent) {

  auto *frame1 = new QFrame(this);
  frame1-&gt;setFrameStyle(QFrame::Box);
  frame1-&gt;setCursor(Qt::SizeAllCursor);

  auto *frame2 = new QFrame(this);
  frame2-&gt;setFrameStyle(QFrame::Box);
  frame2-&gt;setCursor(Qt::WaitCursor);

  auto *frame3 = new QFrame(this);
  frame3-&gt;setFrameStyle(QFrame::Box);
  frame3-&gt;setCursor(Qt::PointingHandCursor);

  auto *grid = new QGridLayout(this);
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

auto *frame1 = new QFrame(this);

A QFrame widget is created.

frame1-&gt;setFrameStyle(QFrame::Box);

We set a frame style with the setFrameStyle method. This way we can
see the boundaries of the frames.

frame1-&gt;setCursor(Qt::SizeAllCursor);

A cursor is set to the frame with the setCursor method.

auto *grid = new QGridLayout(this);
grid-&gt;addWidget(frame1, 0, 0);
grid-&gt;addWidget(frame2, 0, 1);
grid-&gt;addWidget(frame3, 0, 2);
setLayout(grid);

This will group all the frames into one row. We talk more about this in the
layout management chapter.

## Qt5 QPushButton

In the next code example, we display a push button on the window.
By clicking on the button we close the application.

pushbutton.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;
#include &lt;QPushButton&gt;

class MyButton : public QWidget {

 public:
     MyButton(QWidget *parent = nullptr);
};

MyButton::MyButton(QWidget *parent)
    : QWidget(parent) {

  auto *quitBtn = new QPushButton("Quit", this);
  quitBtn-&gt;setGeometry(50, 40, 75, 30);

  connect(quitBtn, &amp;QPushButton::clicked, qApp, &amp;QApplication::quit);
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

auto *quitBtn = new QPushButton("Quit", this);
quitBtn-&gt;setGeometry(50, 40, 75, 30);

We create a new QPushButton. We manually resize it and place it
on the window with the setGeometry method.

connect(quitBtn, &amp;QPushButton::clicked, qApp, &amp;QApplication::quit);

When we click on the button, a clicked signal is generated. A slot
is the method which reacts to the signal. In our case it is the quit 
slot of the main application object. The qApp is a global pointer
to the application object. It is defined in the QApplication header
file.

![pushbutton.png](images/pushbutton.png)

Figure: QPushButton

## Plus minus

We finish this section showing how widgets can communicate. The code is split
into three files.

plusminus.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QApplication&gt;
#include &lt;QPushButton&gt;
#include &lt;QLabel&gt;

class PlusMinus : public QWidget {

  Q_OBJECT

  public:
    PlusMinus(QWidget *parent = nullptr);

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

  auto *plsBtn = new QPushButton("+", this);
  auto *minBtn = new QPushButton("-", this);
  lbl = new QLabel("0", this);

  auto *grid = new QGridLayout(this);
  grid-&gt;addWidget(plsBtn, 0, 0);
  grid-&gt;addWidget(minBtn, 0, 1);
  grid-&gt;addWidget(lbl, 1, 1);

  setLayout(grid);

  connect(plsBtn, &amp;QPushButton::clicked, this, &amp;PlusMinus::OnPlus);
  connect(minBtn, &amp;QPushButton::clicked, this, &amp;PlusMinus::OnMinus);
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

connect(plsBtn, &amp;QPushButton::clicked, this, &amp;PlusMinus::OnPlus);
connect(minBtn, &amp;QPushButton::clicked, this, &amp;PlusMinus::OnMinus);

Here we connect the clicked signals to their slots.

void PlusMinus::OnPlus() {

  int val = lbl-&gt;text().toInt();
  val++;
  lbl-&gt;setText(QString::number(val));
}

In the OnPlus method, we determine the current value of the label.
The label widget displays a string value, so we must convert it to the integer.
We increase the number and set a new text for the label. We convert a number to
the string value.

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

In this chapter, we created our first programs in Qt5.

[Contents](..)
[Previous](../files/)
[Next](../menusandtoolbars/)