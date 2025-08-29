+++
title = "Qt4 Widgets II"
date = 2025-08-29T19:57:25.091+01:00
draft = false
description = "In this part of the Qt4 tutorial, we continue covering Qt4 widgets."
image = "images/checkbox.png"
imageBig = "images/checkbox.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../widgets/)
[Next](../painting/)

# Qt4 Widgets II

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we continue 
talking about the Qt4 widgets. 

## QCheckBox

The QCheckBox is a widget that has two states: on and off. 
It is a box with a label. If the checkbox is checked, it is represented 
by a tick in a box.

In our example, we display a checkbox on the window. If the checkbox is checked, 
the title of the window is displayed. Otherwise it is hidden.

checkbox.h
  

#pragma once

#include &lt;QWidget&gt;

class CheckBox : public QWidget {
    
  Q_OBJECT

  public:
    CheckBox(QWidget *parent = 0);

  private slots:
    void showTitle(int);
};

This is a header file for our code example.

checkbox.cpp
  

#include "checkbox.h"
#include &lt;QCheckBox&gt;
#include &lt;QHBoxLayout&gt;

CheckBox::CheckBox(QWidget *parent)
    : QWidget(parent) {

  QHBoxLayout *hbox = new QHBoxLayout(this);
  
  QCheckBox *cb = new QCheckBox("Show Title", this);
  cb-&gt;setCheckState(Qt::Checked);
  hbox-&gt;addWidget(cb, 0, Qt::AlignLeft | Qt::AlignTop);

  connect(cb, SIGNAL(stateChanged(int)), this, SLOT(showTitle(int)));
}

void CheckBox::showTitle(int state) {
    
  if (state == Qt::Checked) {
    setWindowTitle("QCheckBox");
  } else {
    setWindowTitle(" ");
  }
}

We display a checkbox on the window and connect it to the 
showTitle slot.

cb-&gt;setCheckState(Qt::Checked);

The checkbox is checked when the example starts. 

void CheckBox::showTitle(int state) {

  if (state == Qt::Checked) {
    setWindowTitle("QCheckBox");
  } else {
    setWindowTitle(" ");
  }
}

We determine the state of the check box and call the setWindowTitle
accordingly. 

main.cpp
  

#include "checkbox.h"
#include &lt;QApplication&gt;

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  CheckBox window;

  window.resize(250, 150);
  window.setWindowTitle("QCheckBox");
  window.show();

  return app.exec();
}

This is the main file.

![checkbox.png](images/checkbox.png)

Figure: QCheckBox

## QListWidget

A QListWidget is a widget that is used to display a 
list of items. In our example, we demonstrate how to add, 
rename, and remove items from the list widget. 

listwidget.h
  

#pragma once

#include &lt;QWidget&gt;
#include &lt;QPushButton&gt;
#include &lt;QListWidget&gt;

class ListWidget : public QWidget {
    
  Q_OBJECT

  public:
    ListWidget(QWidget *parent = 0);

  private slots:
    void addItem();
    void renameItem();
    void removeItem();
    void clearItems();

  private:
    QListWidget *lw;
    QPushButton *add;
    QPushButton *rename;
    QPushButton *remove;
    QPushButton *removeAll;
 
};

The header file for the example. 

listwidget.cpp
  

#include "listwidget.h"
#include &lt;QVBoxLayout&gt;
#include &lt;QInputDialog&gt;

ListWidget::ListWidget(QWidget *parent)
    : QWidget(parent) {

  QVBoxLayout *vbox = new QVBoxLayout();
  vbox-&gt;setSpacing(10);

  QHBoxLayout *hbox = new QHBoxLayout(this);

  lw = new QListWidget(this);
  lw-&gt;addItem("The Omen"); 
  lw-&gt;addItem("The Exorcist");
  lw-&gt;addItem("Notes on a scandal");
  lw-&gt;addItem("Fargo");
  lw-&gt;addItem("Capote");

  add = new QPushButton("Add", this);
  rename = new QPushButton("Rename", this);
  remove = new QPushButton("Remove", this);
  removeAll = new QPushButton("Remove All", this);

  vbox-&gt;setSpacing(3);
  vbox-&gt;addStretch(1);
  vbox-&gt;addWidget(add);
  vbox-&gt;addWidget(rename);
  vbox-&gt;addWidget(remove);
  vbox-&gt;addWidget(removeAll);
  vbox-&gt;addStretch(1);

  hbox-&gt;addWidget(lw);
  hbox-&gt;addSpacing(15);
  hbox-&gt;addLayout(vbox);
  
  connect(add, SIGNAL(clicked()), this, SLOT(addItem()));
  connect(rename, SIGNAL(clicked()), this, SLOT(renameItem()));
  connect(remove, SIGNAL(clicked()), this, SLOT(removeItem()));
  connect(removeAll, SIGNAL(clicked()), this, SLOT(clearItems()));
  
  setLayout(hbox);
}

void ListWidget::addItem() {
    
  QString c_text = QInputDialog::getText(this, "Item", "Enter new item");
  QString s_text = c_text.simplified();
  
  if (!s_text.isEmpty()) {
      
    lw-&gt;addItem(s_text);
    int r = lw-&gt;count() - 1;
    lw-&gt;setCurrentRow(r);
  }
}

void ListWidget::renameItem() {
    
  QListWidgetItem *curitem = lw-&gt;currentItem();
  
  int r = lw-&gt;row(curitem);
  QString c_text = curitem-&gt;text();
  QString r_text = QInputDialog::getText(this, "Item", 
      "Enter new item", QLineEdit::Normal, c_text);
  
  QString s_text = r_text.simplified();
  
  if (!s_text.isEmpty()) {
      
    QListWidgetItem *item = lw-&gt;takeItem(r);
    delete item;
    lw-&gt;insertItem(r, s_text);
    lw-&gt;setCurrentRow(r);
  }
}

void ListWidget::removeItem() {
    
  int r = lw-&gt;currentRow();

  if (r != -1) {
      
    QListWidgetItem *item = lw-&gt;takeItem(r);
    delete item;
  }
}

void ListWidget::clearItems(){
    
  if (lw-&gt;count() != 0) {
    lw-&gt;clear();
  }
}

We display a list widget and four buttons. We use these buttons 
to add, rename, and remove items from the list widget.

lw = new QListWidget(this);
lw-&gt;addItem("The Omen"); 
lw-&gt;addItem("The Exorcist");
lw-&gt;addItem("Notes on a scandal");
lw-&gt;addItem("Fargo");
lw-&gt;addItem("Capote);

The QListWidget is created and filled with five items. 

void ListWidget::addItem() {
    
  QString c_text = QInputDialog::getText(this, "Item", "Enter new item");
  QString s_text = c_text.simplified();
  
  if (!s_text.isEmpty()) {
      
    lw-&gt;addItem(s_text);
    int r = lw-&gt;count() - 1;
    lw-&gt;setCurrentRow(r);
  }
}

The addItem method adds a new item to the list widget. 
The method pops up an input dialog. The dialog returns a string value. We remove 
possible white spaces from the string using the simplified method. 
If the returned string is not empty, we add it to the list widget, at the end of the list.
Finally, we highlight the currently inserted item with the setCurrentRow
method.

void ListWidget::renameItem() {
    
  QListWidgetItem *curitem = lw-&gt;currentItem();
  
  int r = lw-&gt;row(curitem);
  QString c_text = curitem-&gt;text();
  QString r_text = QInputDialog::getText(this, "Item", 
      "Enter new item", QLineEdit::Normal, c_text);
  
  QString s_text = r_text.simplified();
  
  if (!s_text.isEmpty()) {
      
    QListWidgetItem *item = lw-&gt;takeItem(r);
    delete item;
    lw-&gt;insertItem(r, s_text);
    lw-&gt;setCurrentRow(r);
  }
}

Renaming an item consists of several steps. First, we get the current item
using the currentItem method. We get the text of the 
item and the row where the item is located. The text of the item
is displayed in the QInputDialog dialog. The string that
is returned from the dialog is processed by the simplified method
to remove potential white spaces. Then we remove the old item with
the takeItem method and replace it with the insertItem
method. We delete the item removed by the takeItem method, since 
removed items are no longer managed by Qt. Finally, the setCurrentRow 
selects the new item.

void ListWidget::removeItem() {
    
  int r = lw-&gt;currentRow();

  if (r != -1) {
      
    QListWidgetItem *item = lw-&gt;takeItem(r);
    delete item;
  }
}

The removeItem removes a specific item from the list. 
First, we get the currently selected row with the currentRow method.
(It returns -1 if there are no more rows left.) The currently selected item is 
removed using the takeItem method. 

void ListWidget::clearItems(){
    
  if (lw-&gt;count() != 0) {
    lw-&gt;clear();
  }
}

The clear method removes all items from the 
list widget. 

main.cpp
  

#include "listwidget.h"
#include &lt;QApplication&gt;

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  ListWidget window;

  window.setWindowTitle("QListWidget");
  window.show();
  
  return app.exec();
}

This is the main file.

![listwidget.png](images/listwidget.png)

Figure: QListWidget

## QPixmap

QPixmap is one of the widgets used to work 
with images. It is optimized for showing images on screen.
In our code example, we use QPixmap to 
display an image on the window. 

pixmap.h
  

#pragma once

#include &lt;QWidget&gt;

class Pixmap : public QWidget {
    
  public:
    Pixmap(QWidget *parent = 0);
};

The header file for the example. 

pixmap.cpp
  

#include &lt;QPixmap&gt;
#include &lt;QLabel&gt;
#include &lt;QHBoxLayout&gt;
#include "pixmap.h"

Pixmap::Pixmap(QWidget *parent)
    : QWidget(parent) {

  QHBoxLayout *hbox = new QHBoxLayout(this);
  
  QPixmap pixmap("bojnice.jpg");
  
  QLabel *label = new QLabel(this);
  label-&gt;setPixmap(pixmap);

  hbox-&gt;addWidget(label, 0, Qt::AlignTop);
}

We show an image of a famous castle located in middle Slovakia. 

QPixmap pixmap("bojnice.jpg");

QLabel *label = new QLabel(this);
label-&gt;setPixmap(pixmap);

We create a pixmap and put it inside a label widget. 

main.cpp
  

#include &lt;QApplication&gt;
#include "pixmap.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Pixmap window;

  window.setWindowTitle("QPixmap");
  window.show();
  
  return app.exec();
}

This is the main file.

## QSplitter

QSplitter lets the user control the size of child 
widgets by dragging the boundary between the children.
In our example, we show three QFrame widgets 
organized with two splitters.

splitter.h
  

#pragma once

#include &lt;QWidget&gt;

class Splitter : public QWidget {
    
  public:
    Splitter(QWidget *parent = 0);
};

The header file for the example. 

splitter.cpp
  

#include &lt;QFrame&gt;
#include &lt;QSplitter&gt;
#include &lt;QHBoxLayout&gt;
#include "splitter.h"

Splitter::Splitter(QWidget *parent)
    : QWidget(parent) {
        
  QHBoxLayout *hbox = new QHBoxLayout(this);

  QFrame *topleft = new QFrame(this);
  topleft-&gt;setFrameShape(QFrame::StyledPanel);

  QFrame *topright = new QFrame(this);
  topright-&gt;setFrameShape(QFrame::StyledPanel);

  QSplitter *splitter1 = new QSplitter(Qt::Horizontal, this);
  splitter1-&gt;addWidget(topleft);
  splitter1-&gt;addWidget(topright);

  QFrame *bottom = new QFrame(this);
  bottom-&gt;setFrameShape(QFrame::StyledPanel);

  QSplitter *splitter2 = new QSplitter(Qt::Vertical, this);
  splitter2-&gt;addWidget(splitter1);
  splitter2-&gt;addWidget(bottom);
  
  QList&lt;int&gt; sizes({50, 100});
  splitter2-&gt;setSizes(sizes);

  hbox-&gt;addWidget(splitter2);
}

In the example, we have three frame widgets and two splitter widgets. 

QSplitter *splitter1 = new QSplitter(Qt::Horizontal, this);
splitter1-&gt;addWidget(topleft);
splitter1-&gt;addWidget(topright);

We create a splitter widget and add two frame widgets into the splitter. 

QSplitter *splitter2 = new QSplitter(Qt::Vertical, this);
splitter2-&gt;addWidget(splitter1);

We can also add a splitter to another splitter widget. 

QList&lt;int&gt; sizes({50, 100});
splitter2-&gt;setSizes(sizes);

With the setSizes method, we set the size for the splitter's 
child widgets.

main.cpp
  

#include &lt;QDesktopWidget&gt;
#include &lt;QApplication&gt;
#include "splitter.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Splitter window;

  window.resize(350, 300);
  window.setWindowTitle("QSplitter");
  window.show();
  
  return app.exec();
}

This is the main file.

![splitter.png](images/splitter.png)

Figure: QSplitter

In some desktop themes, the splitter might not be visible very well.

## QTableWidget

QTableWidget is a unique widget used in 
spreadsheet applications. (It is also called a grid widget). 
It is one of the more complicated widgets. Here we only display 
the widget on the window. 

table.h
  

#pragma once

#include &lt;QWidget&gt;

class Table : public QWidget {
    
  public:
    Table(QWidget *parent = 0);
};

The header file for the example. 

table.cpp
  

#include &lt;QHBoxLayout&gt;
#include &lt;QTableWidget&gt;
#include "table.h"

Table::Table(QWidget *parent)
    : QWidget(parent) {
        
  QHBoxLayout *hbox = new QHBoxLayout(this);

  QTableWidget *table = new QTableWidget(25, 25, this);

  hbox-&gt;addWidget(table);
}

The example shows a QTableWidget on the window.

QTableWidget *table = new QTableWidget(25, 25, this);

Here we create the table widget with 25 rows and 25 columns.

main.cpp
  

#include &lt;QApplication&gt;
#include "table.h"

int main(int argc, char *argv[]) {
    
  QApplication app(argc, argv);  
    
  Table window;

  window.resize(400, 250);
  window.setWindowTitle("QTableWidget");
  window.show();

  return app.exec();
}

This is the main file.

![tablewidget.png](images/tablewidget.png)

Figure: QTableWidget

In this chapter, we have described several other Qt4 widgets.

[Contents](..)
[Previous](../widgets/)
[Next](../painting/)