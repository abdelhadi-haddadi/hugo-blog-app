+++
title = "Drag and drop in PyQt5"
date = 2025-08-29T19:57:08.464+01:00
draft = false
description = "Drag and drop in PyQt5 introduces drag and drop operations. We work with two new PyQt5 classes: QMimeData and QDrag."
image = "images/dragdrop.png"
imageBig = "images/dragdrop.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../widgets2/)
[Next](../painting/)

# Drag and drop in PyQt5

last modified October 18, 2023

In this part of the PyQt5 tutorial, we talk about drag &amp;
drop operations.

In computer graphical user interfaces, drag-and-drop is the action of
(or support for the action of) clicking on a virtual object and dragging
it to a different location or onto another virtual object. In general,
it can be used to invoke many kinds of actions, or create various types
of associations between two abstract objects.

Drag and drop is part of the graphical user interface. Drag and drop
operations enable users to do complex things intuitively.

Usually, we can drag and drop two things: data or some graphical objects. If we
drag an image from one application to another, we drag and drop binary data. If
we drag a tab in Firefox and move it to another place, we drag and drop a
graphical component.

## QDrag

QDrag provides support for MIME-based drag and drop data transfer.
It handles most of the details of a drag and drop operation. The transferred
data is contained in a QMimeData object.

## Simple drag and drop example in PyQt5

In the first example, we have a QLineEdit and a
QPushButton. We drag plain text from
the line edit widget and drop it onto the button widget. The button's
label will change.

simple_dragdrop.py
  

#!/usr/bin/python

"""
ZetCode PyQt5 tutorial

This is a simple drag and
drop example.

Author: Jan Bodnar
Website: zetcode.com
"""

import sys

from PyQt5.QtWidgets import (QPushButton, QWidget,
                             QLineEdit, QApplication)

class Button(QPushButton):

    def __init__(self, title, parent):
        super().__init__(title, parent)

        self.setAcceptDrops(True)

    def dragEnterEvent(self, e):

        if e.mimeData().hasFormat('text/plain'):
            e.accept()
        else:
            e.ignore()

    def dropEvent(self, e):

        self.setText(e.mimeData().text())

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        edit = QLineEdit('', self)
        edit.setDragEnabled(True)
        edit.move(30, 65)

        button = Button("Button", self)
        button.move(190, 65)

        self.setWindowTitle('Simple drag and drop')
        self.setGeometry(300, 300, 300, 150)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    ex.show()
    app.exec_()

if __name__ == '__main__':
    main()

The example presents a simple drag &amp; drop operation.

class Button(QPushButton):

    def __init__(self, title, parent):
        super().__init__(title, parent)

        ...

In order to drop text on the QPushButton widget, we
must reimplement some methods. Therefore, we create our own Button
class which will inherit from the QPushButton class.

self.setAcceptDrops(True)

We enable drop events for the widget with setAcceptDrops.

def dragEnterEvent(self, e):

    if e.mimeData().hasFormat('text/plain'):
        e.accept()
    else:
        e.ignore()

First, we reimplement the dragEnterEvent method. We inform
about the data type that we accept. In our case it is plain text.

def dropEvent(self, e):

    self.setText(e.mimeData().text())

By reimplementing the dropEvent method we define what
happes at the drop event. Here we change the text of the button widget.

edit = QLineEdit('', self)
edit.setDragEnabled(True)

The QLineEdit widget has a built-in support for drag operations.
All we need to do is to call the setDragEnabled method to activate it.

![dragdrop.png](images/dragdrop.png)

Figure: Simple drag and drop

## Drag and drop a button widget

The following example demonstrates how to drag and drop a button widget.

drag_button.py
  

#!/usr/bin/python

"""
ZetCode PyQt5 tutorial

In this program, we can press on a button with a left mouse
click or drag and drop the button with  the right mouse click.

Author: Jan Bodnar
Website: zetcode.com
"""

import sys

from PyQt5.QtCore import Qt, QMimeData
from PyQt5.QtGui import QDrag
from PyQt5.QtWidgets import QPushButton, QWidget, QApplication

class Button(QPushButton):

    def __init__(self, title, parent):
        super().__init__(title, parent)

    def mouseMoveEvent(self, e):

        if e.buttons() != Qt.RightButton:
            return

        mimeData = QMimeData()

        drag = QDrag(self)
        drag.setMimeData(mimeData)
        drag.setHotSpot(e.pos() - self.rect().topLeft())

        dropAction = drag.exec_(Qt.MoveAction)

    def mousePressEvent(self, e):

        super().mousePressEvent(e)

        if e.button() == Qt.LeftButton:
            print('press')

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.setAcceptDrops(True)

        self.button = Button('Button', self)
        self.button.move(100, 65)

        self.setWindowTitle('Click or Move')
        self.setGeometry(300, 300, 550, 450)

    def dragEnterEvent(self, e):
        e.accept()

    def dropEvent(self, e):
        position = e.pos()
        self.button.move(position)

        e.setDropAction(Qt.MoveAction)
        e.accept()

def main():
    
    app = QApplication(sys.argv)
    ex = Example()
    ex.show()
    app.exec_()

if __name__ == '__main__':
    main()

In our code example, we have a QPushButton on the window.
If we click on the button with a left mouse button, the 'press' message
is printed to the console. By right clicking and moving the button,
we perform a drag and drop operation on the button widget.

class Button(QPushButton):

    def __init__(self, title, parent):
        super().__init__(title, parent)

We create a Button class which derives from
the QPushButton. We also reimplement two methods of
the QPushButton: the mouseMoveEvent and
the mousePressEvent. The mouseMoveEvent method
is the place where the drag and drop operation begins.

if e.buttons() != Qt.RightButton:
    return

Here we decide that we can perform drag and drop only with a
right mouse button. The left mouse button is reserved
for clicking on the button.

mimeData = QMimeData()

drag = QDrag(self)
drag.setMimeData(mimeData)
drag.setHotSpot(e.pos() - self.rect().topLeft())

The QDrag object is created. The class provides
support for MIME-based drag and drop data transfer.

dropAction = drag.exec_(Qt.MoveAction)

The exec_ method of the drag object starts the
drag and drop operation.

def mousePressEvent(self, e):

    super().mousePressEvent(e)

    if e.button() == Qt.LeftButton:
        print('press')

We print 'press' to the console if we left click on the button
with the mouse. Notice that we call mousePressEvent method
on the parent as well. Otherwise, we would not see the button being pushed.

position = e.pos()
self.button.move(position)

In the dropEvent method we specify what happens after we release
the mouse button and finish the drop operation. In our case, we find out the
current mouse pointer position and move the button accordingly.

e.setDropAction(Qt.MoveAction)
e.accept()

We specify the type of the drop action with setDropAction. In our
case it is a move action.

This part of the PyQt5 tutorial was dedicated to drag and drop operations.

[Contents](..)
[Previous](../widgets2/)
[Next](../painting/)