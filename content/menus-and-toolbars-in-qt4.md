+++
title = "Menus and toolbars in Qt4"
date = 2025-08-29T19:57:21.897+01:00
draft = false
description = "In this part of the Qt4 tutorial, we work with menus and toolbars."
image = "images/simplemenu.png"
imageBig = "images/simplemenu.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)

# Menus and toolbars in Qt4

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we talk about 
menus and toolbars in Qt4 applications.

A menubar is a common part of a GUI application. It is a group of commands 
located in various places called menus. Menus group commands that 
we can use in an application. Toolbars provide a quick access to the most 
frequently used commands. 

## Simple menu

The first example shows a simple menu. 

simplemenu.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QApplication&gt;

class SimpleMenu : public QMainWindow {

  public:
    SimpleMenu(QWidget *parent = 0);
};

This is a header file for our code example.

simplemenu.cpp
  

#include "simplemenu.h"
#include &lt;QMenu&gt;
#include &lt;QMenuBar&gt;

SimpleMenu::SimpleMenu(QWidget *parent)
    : QMainWindow(parent) {
    
  QAction *quit = new QAction("&amp;Quit", this);

  QMenu *file;
  file = menuBar()-&gt;addMenu("&amp;File");
  file-&gt;addAction(quit);

  connect(quit, SIGNAL(triggered()), qApp, SLOT(quit()));
}

We have a menubar, a menu and an action. In order to work with menus, 
we must inherit from a QMainWindow widget. 

QAction *quit = new QAction("&amp;Quit", this);

This code line creates a QAction. Each 
QMenu has one or more action objects.

QMenu *file;
file = menuBar()-&gt;addMenu("&amp;File");

We create a QMenu object. 

file-&gt;addAction(quit);

We put an action inside the menu using the addAction method.

connect(quit, SIGNAL(triggered()), qApp, SLOT(quit()));

When we select this option from the menu, the application quits. 

main.cpp
  

#include "simplemenu.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);  
    
  SimpleMenu window;

  window.resize(250, 150);
  window.setWindowTitle("Simple menu");
  window.show();

  return app.exec();
}

The main file.

![simplemenu.png](images/simplemenu.png)

Figure: Simple menu

## Icons, shortcuts, and separators

In the following example, we further enhance our previous application. 
We add icons to the menus, use shortcuts and a separator.  

anothermenu.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QApplication&gt;

class AnotherMenu : public QMainWindow {
    
  public:
    AnotherMenu(QWidget *parent = 0);
};

The header file for the example. 

anothermenu.cpp
  

#include "anothermenu.h"
#include &lt;QMenu&gt;
#include &lt;QMenuBar&gt;

AnotherMenu::AnotherMenu(QWidget *parent)
    : QMainWindow(parent) {
          
  QPixmap newpix("new.png");
  QPixmap openpix("open.png");
  QPixmap quitpix("quit.png");

  QAction *newa = new QAction(newpix, "&amp;New", this);
  QAction *open = new QAction(openpix, "&amp;Open", this);
  QAction *quit = new QAction(quitpix, "&amp;Quit", this);
  quit-&gt;setShortcut(tr("CTRL+Q"));

  QMenu *file;
  file = menuBar()-&gt;addMenu("&amp;File");
  file-&gt;addAction(newa);
  file-&gt;addAction(open);
  file-&gt;addSeparator();
  file-&gt;addAction(quit);
  
  qApp-&gt;setAttribute(Qt::AA_DontShowIconsInMenus, false);

  connect(quit, SIGNAL(triggered()), qApp, SLOT(quit()));
}

In our example, we have one menu with three actions. Only the 
quit action will actually do something if we select it.
We also create a separator and a CTRL+Q shortcut, which 
terminates the application. 

QPixmap newpix("new.png");
QPixmap openpix("open.png");
QPixmap quitpix("quit.png");

These are images that we use in menus. Note that some desktop environments
might not display images in the menus.

QAction *newa = new QAction(newpix, "&amp;New", this);
QAction *open = new QAction(openpix, "&amp;Open", this);
QAction *quit = new QAction(quitpix, "&amp;Quit", this);

In this code we use the  QAction constructor 
with a pixmap as the first argument. 

quit-&gt;setShortcut(tr("CTRL+Q"));

Here we create a keyboard shortcut. By pressing this shortcut, we 
will run the quit action which will quit the application. 

file-&gt;addSeparator();

We create a separator. The separator is a horizontal line which enables 
us to group menu actions into some logical groups. 

qApp-&gt;setAttribute(Qt::AA_DontShowIconsInMenus, false);

In some environments, the menu icons are not shown by default.
In this case we can disable the Qt::AA_DontShowIconsInMenus attribute.

main.cpp
  

#include "anothermenu.h"

int main(int argc, char *argv[]) {

  QApplication app(argc, argv);  
    
  AnotherMenu window;

  window.resize(350, 200);
  window.move(300, 300);  
  window.setWindowTitle("Another menu");
  window.show();

  return app.exec();
}

This is the main file.

![anothermenu.png](images/anothermenu.png)

Figure: Another menu example

## Checkable menu

In the next example, we create a checkable menu. This will 
be an action with a check box. The option toggles the visibility 
of a statusbar. 

checkable.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QApplication&gt;

class Checkable : public QMainWindow {
    
  Q_OBJECT  

  public:
    Checkable(QWidget *parent = 0);
 
  private slots:
    void toggleStatusbar();

  private:
    QAction *viewst;
};

The header file for the example. 

checkable.cpp
  

#include "checkable.h"
#include &lt;QMenu&gt;
#include &lt;QMenuBar&gt;
#include &lt;QStatusBar&gt;

Checkable::Checkable(QWidget *parent)
    : QMainWindow(parent) {

  viewst = new QAction("&amp;View statusbar", this);
  viewst-&gt;setCheckable(true);
  viewst-&gt;setChecked(true);

  QMenu *file;
  file = menuBar()-&gt;addMenu("&amp;File");
  file-&gt;addAction(viewst);

  statusBar();

  connect(viewst, SIGNAL(triggered()), this, SLOT(toggleStatusbar()));
}

void Checkable::toggleStatusbar() {
    
  if (viewst-&gt;isChecked()) {
      
      statusBar()-&gt;show();
  } else {
      
      statusBar()-&gt;hide();
  }
}

A checkable menu item toggles the visibility of the statusbar. 

viewst = new QAction("&amp;View statusbar", this);
viewst-&gt;setCheckable(true);
viewst-&gt;setChecked(true);

We create an actiona and make it checkable with the 
setCheckable method. The setChecked method
makes it checked.

if (viewst-&gt;isChecked()) {
    
    statusBar()-&gt;show();
} else {
    
    statusBar()-&gt;hide();
}

Inside the toggleStatusbar method, we determine 
if the menu item is checked and hide or show the statusbar accordingly. 

main.cpp
  

#include "checkable.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Checkable window;

  window.resize(250, 150);
  window.setWindowTitle("Checkable menu");
  window.show();

  return app.exec();
}

This is the main file.

![checkable.png](images/checkable.png)

Figure: Checkable menu

## QToolBar

The QToolBar class provides a movable panel 
that contains a set of controls which provide a quick
access to the application actions. 

toolbar.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QApplication&gt;

class Toolbar : public QMainWindow {
    
  Q_OBJECT  

  public:
    Toolbar(QWidget *parent = 0);
};

The header file for the example. 

toolbar.cpp
  

#include "toolbar.h"
#include &lt;QToolBar&gt;
#include &lt;QIcon&gt;
#include &lt;QAction&gt;

Toolbar::Toolbar(QWidget *parent)
    : QMainWindow(parent) {
    
  QPixmap newpix("new.png");
  QPixmap openpix("open.png");
  QPixmap quitpix("quit.png");
  
  QToolBar *toolbar = addToolBar("main toolbar");
  toolbar-&gt;addAction(QIcon(newpix), "New File");
  toolbar-&gt;addAction(QIcon(openpix), "Open File");
  toolbar-&gt;addSeparator();
  QAction *quit = toolbar-&gt;addAction(QIcon(quitpix), 
      "Quit Application");
  
  connect(quit, SIGNAL(triggered()), qApp, SLOT(quit()));
}

To create a toolbar, we inherit from the QMainWindow widget. 

QToolBar *toolbar = addToolBar("main toolbar");

The addToolBar method creates a 
toolbar and returns a pointer to it. 

toolbar-&gt;addAction(QIcon(newpix), "New File");
toolbar-&gt;addAction(QIcon(openpix), "Open File");
toolbar-&gt;addSeparator();

Here we add two actions and a separator to the toolbar. 

main.cpp
  

#include "toolbar.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Toolbar window;

  window.resize(300, 200);
  window.setWindowTitle("QToolBar");
  window.show();

  return app.exec();
}

This is the main file.

![toolbar.png](images/toolbar.png)

Figure: QToolBar

## Application skeleton

In the end of this part of the C++ Qt4 tutorial, we create an 
application skeleton. The example is based mainly on the
QMainWindow widget. 

skeleton.h
  

#pragma once

#include &lt;QMainWindow&gt;
#include &lt;QApplication&gt;

class Skeleton : public QMainWindow {
    
  Q_OBJECT  

  public:
    Skeleton(QWidget *parent = 0);
};

The header file for the example. 

skeleton.cpp
  

#include "skeleton.h"
#include &lt;QToolBar&gt;
#include &lt;QIcon&gt;
#include &lt;QAction&gt;
#include &lt;QMenu&gt;
#include &lt;QMenuBar&gt;
#include &lt;QStatusBar&gt;
#include &lt;QTextEdit&gt;

Skeleton::Skeleton(QWidget *parent)
    : QMainWindow(parent) {
        
  QPixmap newpix("new.png");
  QPixmap openpix("open.png");
  QPixmap quitpix("quit.png");

  QAction *quit = new QAction("&amp;Quit", this);

  QMenu *file;
  file = menuBar()-&gt;addMenu("&amp;File");
  file-&gt;addAction(quit);

  connect(quit, SIGNAL(triggered()), qApp, SLOT(quit()));
  
  QToolBar *toolbar = addToolBar("main toolbar");
  toolbar-&gt;addAction(QIcon(newpix), "New File");
  toolbar-&gt;addAction(QIcon(openpix), "Open File");
  toolbar-&gt;addSeparator();
  
  QAction *quit2 = toolbar-&gt;addAction(QIcon(quitpix), 
      "Quit Application");
  connect(quit2, SIGNAL(triggered()), qApp, SLOT(quit()));

  QTextEdit *edit = new QTextEdit(this);  

  setCentralWidget(edit);

  statusBar()-&gt;showMessage("Ready");
}

Here we create a menu a toolbar and a statusbar. 

QTextEdit *edit = new QTextEdit(this);  

setCentralWidget(edit);

We create a QTextEdit widget and place it 
into the central part of the QMainWindow widget. 

main.cpp
  

#include "skeleton.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Skeleton window;

  window.resize(350, 250);
  window.setWindowTitle("Application skeleton");
  window.show();

  return app.exec();
}

This is the main file.

![skeleton.png](images/skeleton.png)

Figure: Application skeleton

In this part of the Qt4 tutorial, we have covered menus and toolbars.

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)