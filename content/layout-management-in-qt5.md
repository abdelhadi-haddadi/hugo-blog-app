+++
title = "Layout management in Qt5"
date = 2025-08-29T19:57:28.624+01:00
draft = false
description = "This chapter of the Qt5 tutorial covers layout management of widgets. We mention QHBoxLayout, QVBoxLayout, QFormLayout, and QGridLayout managers."
image = "images/absolute1.png"
imageBig = "images/absolute1.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)

# Layout management in Qt5

last modified October 18, 2023

In this part of the Qt5 programming tutorial, we talk about the layout
management of widgets. We mention QHBoxLayout, QVBoxLayout,
QFormLayout, and QGridLayout managers.

A typical application consists of various widgets. Those widgets are placed
inside layouts. A programmer must manage the layout of the application.
In Qt5 we have two options:

    - absolute positioning

    - layout managers

## Absolute Positioning

The programmer specifies the position and the size of each widget in pixels.
When we use absolute positioning, we have to understand several things.

    - The size and the position of a widget do not change if we resize a window.

    - Applications look different (often poorly) on various platforms.

    - Changing fonts in our application might spoil the layout.

    If we decide to change our layout, we must completely redo our layout,
    which is tedious and time consuming.

There might be situations where we can possibly use absolute positioning. But mostly,
in real world programs, programmers use layout managers.

absolute.cpp
  

#include &lt;QApplication&gt;
#include &lt;QDesktopWidget&gt;
#include &lt;QTextEdit&gt;

class Absolute : public QWidget {

 public:
     Absolute(QWidget *parent = nullptr);
};

Absolute::Absolute(QWidget *parent)
    : QWidget(parent) {

  auto *ledit = new QTextEdit(this);
  ledit-&gt;setGeometry(5, 5, 200, 150);
}

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Absolute window;

  window.setWindowTitle("Absolute");
  window.show();

  return app.exec();
}

The setGeometry method is used to position the widget on the
window in absolute coordinates.

auto *edit = new QTextEdit(this);
ledit-&gt;setGeometry(5, 5, 200, 150);

We create a QTextEdit widget and manually position it. The
setGeometry method does two things: it positions the widget to
absolute coordinates and resizes the widget.

![absolute1.png](images/absolute1.png)

Figure: before resizement

![absolute2.png](images/absolute2.png)

Figure: after resizement

## Qt5 QVBoxLayout

The QVBoxLayout class lines up widgets vertically. The widgets are
added to the layout using the addWidget method.

vertical_box.h
  

#pragma once

#include &lt;QWidget&gt;

class VerticalBox : public QWidget {

  public:
    VerticalBox(QWidget *parent = nullptr);
};

The header file.

vertical_box.cpp
  

#include &lt;QVBoxLayout&gt;
#include &lt;QPushButton&gt;
#include "vertical_box.h"

VerticalBox::VerticalBox(QWidget *parent)
    : QWidget(parent) {

  auto *vbox = new QVBoxLayout(this);
  vbox-&gt;setSpacing(1);

  auto *settings = new QPushButton("Settings", this);
  settings-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

  auto *accounts = new QPushButton("Accounts", this);
  accounts-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

  auto *loans = new QPushButton("Loans", this);
  loans-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

  auto *cash = new QPushButton("Cash", this);
  cash-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

  auto *debts = new QPushButton("Debts", this);
  debts-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

  vbox-&gt;addWidget(settings);
  vbox-&gt;addWidget(accounts);
  vbox-&gt;addWidget(loans);
  vbox-&gt;addWidget(cash);
  vbox-&gt;addWidget(debts);

  setLayout(vbox);
}

In our example, we have one vertical layout manager. We put five buttons
into it. We make all buttons expandable in both directions.

auto *vbox = new QVBoxLayout(this);
vbox-&gt;setSpacing(1);

We create the QVBoxLayout and set 1 px spacing among
child widgets.

auto *settings = new QPushButton("Settings", this);
settings-&gt;setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

We create a button and set a size policy for it. The child widgets are managed
by the layout manager. By default, the button is expanded horizontally and has a
fixed size vertically. If we want to change it, we set a new size policy. In our
case, the button is expandable into both directions.

vbox-&gt;addWidget(settings);
vbox-&gt;addWidget(accounts);
...

We add the child widgets to the layout manager with the addWidget method.

setLayout(vbox);

We set the QVBoxLayout manager for the window.

main.cpp
  

#include &lt;QApplication&gt;
#include "vertical_box.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  VerticalBox window;

  window.resize(240, 230);
  window.setWindowTitle("VerticalBox");
  window.show();

  return app.exec();
}

The main file.

![verticalbox.png](images/verticalbox.png)

Figure: QVBoxLayout

## Buttons

In the following example, we display two buttons on the client area of the
window. They will be positioned in the right bottom corner of the window.

buttons.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QPushButton&gt;

class Buttons : public QWidget {

  public:
    Buttons(QWidget *parent = nullptr);

  private:
    QPushButton *okBtn;
    QPushButton *applyBtn;
};

Header file.

buttons.cpp
  

#include &lt;QVBoxLayout&gt;
#include &lt;QHBoxLayout&gt;
#include "buttons.h"

Buttons::Buttons(QWidget *parent)
    : QWidget(parent) {

  auto *vbox = new QVBoxLayout(this);
  auto *hbox = new QHBoxLayout();

  okBtn = new QPushButton("OK", this);
  applyBtn = new QPushButton("Apply", this);

  hbox-&gt;addWidget(okBtn, 1, Qt::AlignRight);
  hbox-&gt;addWidget(applyBtn, 0);

  vbox-&gt;addStretch(1);
  vbox-&gt;addLayout(hbox);
}

Say we wanted to have two buttons in the right bottom corner of the window.

auto *vbox = new QVBoxLayout(this);
auto *hbox = new QHBoxLayout();

We create two box layout managers: one vertical and one horizontal box layout
manager.

okBtn = new QPushButton("OK", this);
applyBtn = new QPushButton("Apply", this);

We create two push buttons.

hbox-&gt;addWidget(okBtn, 1, Qt::AlignRight);
hbox-&gt;addWidget(applyBtn, 0);

The buttons are placed inside the horizontal layout manager. with the
addWidget method. These buttons are right aligned. The first
parameter is the child widget. The second parameter is the stretch factor, and
the last parameter is alignment. By setting the stretch factor to 1 for the OK
button, we give it space from the left side to the right side of the window. The
widget does not expand to all space alloted to it. Finally, the
Qt::AlignRight constant aligns the widget to the right of the
allotted space.

vbox-&gt;addStretch(1);
vbox-&gt;addLayout(hbox);

We put an empty, expandable space into the vertical box by calling the
addStretch method. Then we add the horizontal box layout to the
vertical box layout.

main.cpp
  

#include &lt;QApplication&gt;
#include "buttons.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Buttons window;

  window.resize(290, 170);
  window.setWindowTitle("Buttons");
  window.show();

  return app.exec();
}

The main file.

![buttons.png](images/buttons.png)

Figure: Buttons

## Qt5 nesting layouts

The idea of the following example is to show that layout managers can be
combined. By combination of even simple layouts we can create sophisticated
dialogs or windows. To nest layouts, we utilize the addLayout
method.

nesting.h
  

#pragma once

#include &lt;QWidget&gt;

class Layouts : public QWidget {

  public:
    Layouts(QWidget *parent = nullptr);
};

This is the header file.

nesting.cpp
  

#include &lt;QVBoxLayout&gt;
#include &lt;QPushButton&gt;
#include &lt;QListWidget&gt;
#include "nesting.h"

Layouts::Layouts(QWidget *parent)
    : QWidget(parent) {

  auto *vbox = new QVBoxLayout();
  auto *hbox = new QHBoxLayout(this);

  auto *lw = new QListWidget(this);
  lw-&gt;addItem("The Omen");
  lw-&gt;addItem("The Exorcist");
  lw-&gt;addItem("Notes on a scandal");
  lw-&gt;addItem("Fargo");
  lw-&gt;addItem("Capote");

  auto *add = new QPushButton("Add", this);
  auto *rename = new QPushButton("Rename", this);
  auto *remove = new QPushButton("Remove", this);
  auto *removeall = new QPushButton("Remove All", this);

  vbox-&gt;setSpacing(3);
  vbox-&gt;addStretch(1);
  vbox-&gt;addWidget(add);
  vbox-&gt;addWidget(rename);
  vbox-&gt;addWidget(remove);
  vbox-&gt;addWidget(removeall);
  vbox-&gt;addStretch(1);

  hbox-&gt;addWidget(lw);
  hbox-&gt;addSpacing(15);
  hbox-&gt;addLayout(vbox);

  setLayout(hbox);
}

In the example, we create a window that consists of four buttons and one list
widget. The buttons are grouped in a vertical column and placed to the right of
the list widget. If we resize the window, the list widget is being resized as
well.

auto *vbox = new QVBoxLayout();

The QVBoxLayout is the column for the buttons.

auto *hbox = new QHBoxLayout(this);

The QHBoxLayout is the base layout for the widgets.

auto *lw = new QListWidget(this);
lw-&gt;addItem("The Omen");
lw-&gt;addItem("The Exorcist");
lw-&gt;addItem("Notes on a scandal");
lw-&gt;addItem("Fargo");
lw-&gt;addItem("Capote");

The QListWidget is created.

auto *add = new QPushButton("Add", this);
auto *rename = new QPushButton("Rename", this);
auto *remove = new QPushButton("Remove", this);
auto *removeall = new QPushButton("Remove All", this);

Here we create our four buttons.

vbox-&gt;setSpacing(3);
vbox-&gt;addStretch(1);
vbox-&gt;addWidget(add);
vbox-&gt;addWidget(rename);
vbox-&gt;addWidget(remove);
vbox-&gt;addWidget(removeall);
vbox-&gt;addStretch(1);

The vertical box with four buttons is created. We put some little space among
our buttons. Notice that we add a stretch factor to the top and to the bottom of
the vertical box. This way the buttons are vertically centered.

hbox-&gt;addWidget(lw);
hbox-&gt;addSpacing(15);
hbox-&gt;addLayout(vbox);

The list widget and the vertical box of buttons are placed into the horizontal
box layout. The addLayout method is used to add a layout to
another layout.

setLayout(hbox);

We set the base layout for the parent window.

main.cpp
  

#include &lt;QApplication&gt;
#include "nesting.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Layouts window;

  window.setWindowTitle("Layouts");
  window.show();

  return app.exec();
}

This is the main file.

![nesting.png](images/nesting.png)

Figure: Nesting layouts

## Qt5 FormLayout

QFormLayout is a simple layout manager that manages forms of input
widgets and their associated labels. It lays out its children in a two-column
form. The left column consists of labels and the right column consists of input
widgets like QLineEdit or QSpinBox.

form.h
  

#pragma once

#include &lt;QWidget&gt;

class FormEx : public QWidget {

  public:
    FormEx(QWidget *parent = nullptr);
};

This is the header filer.

form.cpp
  

#include &lt;QFormLayout&gt;
#include &lt;QLabel&gt;
#include &lt;QLineEdit&gt;
#include "form.h"

FormEx::FormEx(QWidget *parent)
    : QWidget(parent) {

  auto *nameEdit = new QLineEdit(this);
  auto *addrEdit = new QLineEdit(this);
  auto *occpEdit = new QLineEdit(this);

  auto *formLayout = new QFormLayout;
  formLayout-&gt;setLabelAlignment(Qt::AlignRight | Qt::AlignVCenter);
  formLayout-&gt;addRow("Name:", nameEdit);
  formLayout-&gt;addRow("Email:", addrEdit);
  formLayout-&gt;addRow("Age:", occpEdit);

  setLayout(formLayout);
}

The example creates a form consisting of three labels and three line edits.

auto *formLayout = new QFormLayout;

An instance of the QFormLayout is created.

formLayout-&gt;setLabelAlignment(Qt::AlignRight | Qt::AlignVCenter);

With the setLabelAlignment metho, we set the alignment of the label
widgets.

formLayout-&gt;addRow("Name:", nameEdit);

The addRow method adds a new row to the bottom of the form layout,
with the given label and input widget.

main.cpp
  

#include &lt;QApplication&gt;
#include "form.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  FormEx window;

  window.setWindowTitle("Form example");
  window.show();

  return app.exec();
}

This is the main file.

![simpleform.png](images/simpleform.png)

Figure: Simple form

## Qt5 QGridLayout

QGridLayout places its widgets in a grid. It is a powerful layout
manager.

calculator.h
  

#pragma once

#include &lt;QWidget&gt;

class Calculator : public QWidget {

  public:
    Calculator(QWidget *parent = nullptr);
};

Header file.

calculator.cpp
  

#include &lt;QGridLayout&gt;
#include &lt;QPushButton&gt;
#include "calculator.h"

Calculator::Calculator(QWidget *parent)
    : QWidget(parent) {

  auto *grid = new QGridLayout(this);
  grid-&gt;setSpacing(2);

  QVector&lt;QString&gt; values({ "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  });

  int pos = 0;

  for (int i=0; i&lt;4; i++) {
   for (int j=0; j&lt;4; j++) {

     auto *btn = new QPushButton(values[pos], this);
     btn-&gt;setFixedSize(40, 40);
     grid-&gt;addWidget(btn, i, j);
     pos++;
   }
  }

  setLayout(grid);
}

We create a skeleton of a calculator.

auto *grid = new QGridLayout(this);
grid-&gt;setSpacing(2);

We create the grid layout and set 2px space among child widgets.

QVector&lt;QString&gt; values({ "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+"
});

These are the characters that are displayed on the buttons.

for (int i=0; i&lt;4; i++) {
  for (int j=0; j&lt;4; j++) {

    auto *btn = new QPushButton(values[pos], this);
    btn-&gt;setFixedSize(40, 40);
    grid-&gt;addWidget(btn, i, j);
    pos++;
  }
}

We place sixteen widgets into the grid layout. Each of the buttons has a fixed
size.

main.cpp
  

#include &lt;QApplication&gt;
#include "calculator.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Calculator window;

  window.setWindowTitle("Calculator");
  window.show();

  return app.exec();
}

This is the main file.

![calculator.png](images/calculator.png)

Figure: QGridLayout

## Review

In the next example of this chapter, we create a more complicated window using
the QGridLayout manager.

review.h
  

#pragma once

#include &lt;QWidget&gt;

class Review : public QWidget {

  public:
    Review(QWidget *parent = nullptr);
};

Header file.

review.cpp
  

#include &lt;QGridLayout&gt;
#include &lt;QLabel&gt;
#include &lt;QLineEdit&gt;
#include &lt;QTextEdit&gt;
#include "review.h"

Review::Review(QWidget *parent)
    : QWidget(parent) {

  auto *grid = new QGridLayout(this);
  grid-&gt;setVerticalSpacing(15);
  grid-&gt;setHorizontalSpacing(10);

  auto *title = new QLabel("Title:", this);
  grid-&gt;addWidget(title, 0, 0, 1, 1);
  title-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);

  auto *edt1 = new QLineEdit(this);
  grid-&gt;addWidget(edt1, 0, 1, 1, 1);

  auto *author = new QLabel("Author:", this);
  grid-&gt;addWidget(author, 1, 0, 1, 1);
  author-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);

  auto *edt2 = new QLineEdit(this);
  grid-&gt;addWidget(edt2, 1, 1, 1, 1);

  auto *review = new QLabel("Review:", this);
  grid-&gt;addWidget(review, 2, 0, 1, 1);
  review-&gt;setAlignment(Qt::AlignRight | Qt::AlignTop);

  auto *te = new QTextEdit(this);
  grid-&gt;addWidget(te, 2, 1, 3, 1);

  setLayout(grid);
}

The code creates a window which could be used to enter an author,
title, and a review for a book.

auto *grid = new QGridLayout(this);

The QGridLayout manager is created.

grid-&gt;setVerticalSpacing(15);
grid-&gt;setHorizontalSpacing(10);

We add vertical spacing with the setVerticalSpacing
method and horizontal spacing with the setHorizontalSpacing method.

auto *title = new QLabel("Title", this);
grid-&gt;addWidget(title, 0, 0, 1, 1);

These code lines create a label widget and place it into the grid layout. The
addWidget method has five parameters. The first parameter is the
child widget, a label in our case. The next two parameters are the row and
column in the grid where we place the label. Finally, the last parameters are
the rowspan and the colspan. These parameters specify how many rows the current
widget will span. In our case, the label will span only one column and one row.

title-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);

The setAlignment method aligns the title label in its cell.
Horizontally, it is right aligned. Vertically, it is centered.

auto *te = new QTextEdit(this);
grid-&gt;addWidget(te, 2, 1, 3, 1);

The QTextEdit widget is placed into the third row and second column;
it spans three rows and one column.

main.cpp
  

#include &lt;QApplication&gt;
#include "review.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);

  Review window;

  window.setWindowTitle("Review");
  window.show();

  return app.exec();
}

Main file.

![review.png](images/review.png)

Figure: Review

This part of the Qt5 tutorial was dedicated to layout management.

[Contents](..)
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)