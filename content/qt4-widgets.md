+++
title = "Qt4 Widgets"
date = 2025-08-29T19:57:23.539+01:00
draft = false
description = "In this chapter of the Qt4 tutorial, we cover some basic Qt4 widgets."
image = "images/label.png"
imageBig = "images/label.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../eventsandsignals/)
[Next](../widgets2/)

# Qt4 Widgets

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we talk about some basic 
Qt4 widgets. 

Widgets are basic building blocks of a GUI application. Qt4 library has a 
rich set of various widgets. 

## QLabel

QLabel is used to display text and image. 
No user interaction is available. The following example displays text. 

label.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QLabel&gt;

class Label : public QWidget {

  public:
    Label(QWidget *parent = 0);

  private:
    QLabel *label;
};

This is a header file for our code example.

label.cpp
  

#include &lt;QVBoxLayout&gt;
#include &lt;QFont&gt;
#include "label.h"

Label::Label(QWidget *parent)
    : QWidget(parent) {

  QString lyrics = "Who doesn't long for someone to hold\n\
Who knows how to love you without being told\n\
Somebody tell me why I'm on my own\n\
If there's a soulmate for everyone\n\
\n\
Here we are again, circles never end\n\
How do I find the perfect fit\n\
There's enough for everyone\n\
But I'm still waiting in line\n\
\n\
Who doesn't long for someone to hold\n\
Who knows how to love you without being told\n\
Somebody tell me why I'm on my own\n\
If there's a soulmate for everyone";

  label = new QLabel(lyrics, this);
  label-&gt;setFont(QFont("Purisa", 10));

  QVBoxLayout *vbox = new QVBoxLayout();
  vbox-&gt;addWidget(label);
  setLayout(vbox);
}

We use QLabel widget to display lyrics in a window. 

label = new QLabel(lyrics, this);
label-&gt;setFont(QFont("Purisa", 10));

We create a label widget and set a specific font for it.

main.cpp
  

#include &lt;QApplication&gt;
#include &lt;QTextStream&gt;
#include "label.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Label window;

  window.setWindowTitle("QLabel");
  window.show();

  return app.exec();
}

This is the main file.

![label.png](images/label.png)

Figure: QLabel

## QSlider

QSlider is a widget that has a simple handle. 
This handle can be pulled back and forth. This way we are choosing a 
value for a specific task.

slider.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QSlider&gt;
#include &lt;QLabel&gt;

class Slider : public QWidget {
    
  Q_OBJECT
  
  public:
    Slider(QWidget *parent = 0);

  private:
    QSlider *slider; 
    QLabel *label;
};

The header file for the example. 

slider.cpp
  

#include "slider.h"
#include &lt;QHBoxLayout&gt;

Slider::Slider(QWidget *parent)
    : QWidget(parent) {

  QHBoxLayout *hbox = new QHBoxLayout(this);
         
  slider = new QSlider(Qt::Horizontal , this);
  hbox-&gt;addWidget(slider);

  label = new QLabel("0", this);
  hbox-&gt;addWidget(label);

  connect(slider, SIGNAL(valueChanged(int)), label, SLOT(setNum(int)));
}

We display two widgets: a slider and a label. The slider controls the 
number displayed in the label. 

slider = new QSlider(Qt::Horizontal , this);

A horizontal QSlider is created.

connect(slider, SIGNAL(valueChanged(int)), label, SLOT(setNum(int)));

In this code line, we connect the valueChanged signal 
to the label's built-in setNum slot.

main.cpp
  

#include &lt;QApplication&gt;
#include "slider.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Slider window;

  window.setWindowTitle("QSlider");
  window.show();

  return app.exec();
}

This is the main file.

![slider.png](images/slider.png)

Figure: QSlider

## QSpinBox

QSpinbox is a widget that is used to handle integers 
and discrete sets of values. In our code example, we have one 
spinbox widget. We can choose numbers 0..99. The currently chosen value is 
displayed in a label widget.

spinbox.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QSpinBox&gt;

class SpinBox : public QWidget {
    
  Q_OBJECT

  public:
    SpinBox(QWidget *parent = 0);

  private:
    QSpinBox *spinbox;
};

This is the header file for the spinbox example. 

spinbox.cpp
  

#include "spinbox.h"
#include &lt;QHBoxLayout&gt;
#include &lt;QLabel&gt;

SpinBox::SpinBox(QWidget *parent)
    : QWidget(parent) {
        
  QHBoxLayout *hbox = new QHBoxLayout(this);   
  hbox-&gt;setSpacing(15);
    
  spinbox = new QSpinBox(this);
  QLabel *lbl = new QLabel("0", this);

  hbox-&gt;addWidget(spinbox);  
  hbox-&gt;addWidget(lbl);
  
  connect(spinbox, SIGNAL(valueChanged(int)), lbl, SLOT(setNum(int)));
}

We place a spinbox on the window and connect its valueChanged signal to the 
QLabel's setNum slot.

main.cpp
  

#include &lt;QApplication&gt;
#include "spinbox.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  SpinBox window;

  window.resize(250, 150);
  window.setWindowTitle("QSpinBox");
  window.show();

  return app.exec();
}

This is the main file.

![spinbox.png](images/spinbox.png)

Figure: QSpinBox

## QLineEdit

QLineEdit is a widget that allows to enter and 
edit a single line of plain text. 
There are undo/redo, cut/paste and drag &amp; drop functions available 
for QLineEdit widget.

In our example, we show three labels and three line edits. 

ledit.h
  

#pragma once

#include &lt;QWidget&gt;

class Ledit : public QWidget {
    
  public:
    Ledit(QWidget *parent = 0);
};

The header file for the example. 

ledit.cpp
  

#include &lt;QGridLayout&gt;
#include &lt;QLabel&gt;
#include &lt;QLineEdit&gt;
#include "ledit.h"

Ledit::Ledit(QWidget *parent)
    : QWidget(parent) {
        
  QLabel *name = new QLabel("Name:", this);
  name-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);
  QLabel *age = new QLabel("Age:", this);
  age-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);
  QLabel *occupation = new QLabel("Occupation:", this);
  occupation-&gt;setAlignment(Qt::AlignRight | Qt::AlignVCenter);

  QLineEdit *le1 = new QLineEdit(this);
  QLineEdit *le2 = new QLineEdit(this);
  QLineEdit *le3 = new QLineEdit(this);

  QGridLayout *grid = new QGridLayout(); 

  grid-&gt;addWidget(name, 0, 0);
  grid-&gt;addWidget(le1, 0, 1);
  grid-&gt;addWidget(age, 1, 0);
  grid-&gt;addWidget(le2, 1, 1);
  grid-&gt;addWidget(occupation, 2, 0);
  grid-&gt;addWidget(le3, 2, 1);

  setLayout(grid);
}

We display three labels and three line edits. These widgets are organized 
with the QGridLayout manager.

main.cpp
  

#include "ledit.h"
#include &lt;QApplication&gt;

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Ledit window;

  window.setWindowTitle("QLineEdit");
  window.show();

  return app.exec();
}

This is the main file.

![lineedit.png](images/lineedit.png)

Figure: QLineEdit

## Statusbar

A statusbar is a panel that is used to display status information 
about the application.

In our example, we have two buttons and a statusbar. Each of the buttons 
shows a message if we click on them. The statusbar widget is part of the 
QMainWindow widget. 

statusbar.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QPushButton&gt;

class Statusbar : public QMainWindow {
    
  Q_OBJECT  

  public:
    Statusbar(QWidget *parent = 0);

  private slots:
    void OnOkPressed();
    void OnApplyPressed();

  private:
    QPushButton *okBtn;
    QPushButton *aplBtn;
};

The header file for the example. 

statusbar.cpp
  

#include &lt;QLabel&gt;
#include &lt;QFrame&gt;
#include &lt;QStatusBar&gt;
#include "statusbar.h"

Statusbar::Statusbar(QWidget *parent)
    : QMainWindow(parent) {
        
  QFrame *frame = new QFrame(this);
  setCentralWidget(frame);
  
  QHBoxLayout *hbox = new QHBoxLayout(frame);

  okBtn = new QPushButton("OK", frame);
  hbox-&gt;addWidget(okBtn, 0, Qt::AlignLeft | Qt::AlignTop);

  aplBtn = new QPushButton("Apply", frame);
  hbox-&gt;addWidget(aplBtn, 1, Qt::AlignLeft | Qt::AlignTop);

  statusBar();

  connect(okBtn, SIGNAL(clicked()), this, SLOT(OnOkPressed()));
  connect(aplBtn, SIGNAL(clicked()), this, SLOT(OnApplyPressed()));
}

void Statusbar::OnOkPressed() {
    
  statusBar()-&gt;showMessage("OK button pressed", 2000);
}

void Statusbar::OnApplyPressed() {
    
 statusBar()-&gt;showMessage("Apply button pressed", 2000);
}

This is the statusbar.cpp file.

QFrame *frame = new QFrame(this);
setCentralWidget(frame);

The QFrame widget is put into the center area of the 
QMainWindow widget. The central area can take only one widget.

okBtn = new QPushButton("OK", frame);
hbox-&gt;addWidget(okBtn, 0, Qt::AlignLeft | Qt::AlignTop);

aplBtn = new QPushButton("Apply", frame);
hbox-&gt;addWidget(aplBtn, 1, Qt::AlignLeft | Qt::AlignTop);

We create two QPushButton widgets and place them
into a horizontal box. The parent of the buttons is the frame widget.

statusBar();

To display a statusbar widget, we call the statusBar 
method of the QMainWindow widget. 

void Statusbar::OnOkPressed() {
    
  statusBar()-&gt;showMessage("OK button pressed", 2000);
}

The showMessage method shows the message on the statusbar. 
The last parameter specifies the number of milliseconds that the message is
displayed on the statusbar.

main.cpp
  

#include &lt;QApplication&gt;
#include "statusbar.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Statusbar window;

  window.resize(300, 200);
  window.setWindowTitle("QStatusBar");
  window.show();
  
  return app.exec();
}

This is the main file.

![statusbar.png](images/statusbar.png)

Figure: Statusbar example

In this part of the Qt4 tutorial, we have introduced several
Qt4 widgets. 

[Contents](..)
[Previous](../eventsandsignals/)
[Next](../widgets2/)