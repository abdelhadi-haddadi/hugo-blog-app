+++
title = "PyQt QPushButton"
date = 2025-08-29T20:07:26.016+01:00
draft = false
description = "PyQt QPushButton tutorial shows how to work with QPushButton widget. QPushButton is a widget which executes an action when a user clicks on it."
image = "images/quitbutton.png"
imageBig = "images/quitbutton.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QPushButton

last modified August 24, 2023

In this article we show how to work with QPushButton widget.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/),
read [PyQt5 tutorial](/gui/pyqt5/), 
or list [all PyQt tutorials](/all/#pyqt).

## PyQt QPushButton

QPushButton is a widget which executes an action when a user clicks
on it. A QPushButton can display text and icons.

A push button emits the signal clicked when it is activated by the
mouse, the Spacebar or by a keyboard shortcut.

## QPushButton example

The following example creates a quit button. When we click on the button, 
the applicaiton terminates.

quit_button.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QPushButton, QApplication, QVBoxLayout
from PyQt6.QtCore import Qt

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout()

        qbtn = QPushButton('Quit', self)
        vbox.setAlignment(Qt.AlignmentFlag.AlignLeft)
        qbtn.clicked.connect(QApplication.instance().quit)

        vbox.addWidget(qbtn)
        vbox.addStretch(1)

        self.setLayout(vbox)

        self.setGeometry(400, 400, 400, 300)
        self.setWindowTitle('Quit button')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The QPushButton is placed in a QVBoxLayout.

qbtn = QPushButton('Quit', self)

The QPushButton is created. The button shows only text.

qbtn.clicked.connect(QApplication.instance().quit)

We connect the clicked signal to QApplication's 
quit function.

![quitbutton.png](images/quitbutton.png)

Figure: QPushButton

## QPushButton with icon

The QPushButton can display text with an icon.

icons.py
  

#!/usr/bin/python

import sys
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QWidget, QPushButton, QApplication, QHBoxLayout

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        btn1 = QPushButton(QIcon('exit.png'), 'Exit', self)
        btn2 = QPushButton(QIcon('save.png'), 'Save', self)
        btn3 = QPushButton(QIcon('new.png'), 'New', self)

        hbox.addWidget(btn1)
        hbox.addWidget(btn2)
        hbox.addWidget(btn3)
        hbox.addStretch(1)

        self.setLayout(hbox)

        self.move(300, 300)
        self.setWindowTitle('Icons')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we have three buttons. We pass a QIcon as 
the first parameter to QPushButton.

![icons.png](images/icons.png)

Figure: QPushButton with icon

## QPushButton toggle button

A toggle button is a QPushButton in a special mode. It is a button
that has two states: pressed and not pressed. We toggle between these two states
by clicking on it. A toggle button is created with setCheckable
function.

toggle_button.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QPushButton, QHBoxLayout, QVBoxLayout,
                             QFrame, QApplication)
from PyQt6.QtGui import QColor
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()
        vbox = QVBoxLayout()

        self.col = QColor(0, 0, 0)

        redb = QPushButton('Red', self)
        redb.setCheckable(True)

        redb.clicked.connect(self.setColor)

        greenb = QPushButton('Green', self)
        greenb.setCheckable(True)

        greenb.clicked.connect(self.setColor)

        blueb = QPushButton('Blue', self)
        blueb.setCheckable(True)

        blueb.clicked.connect(self.setColor)

        hbox.addWidget(redb)
        hbox.addWidget(greenb)
        hbox.addWidget(blueb)

        self.square = QFrame(self)
        self.square.setFixedSize(180, 180)
        self.square.setStyleSheet("QWidget { background-color: %s }" %
                                  self.col.name())

        vbox.addLayout(hbox)
        vbox.addWidget(self.square)

        self.setLayout(vbox)

        self.move(300, 300)
        self.setWindowTitle('Toggle button')
        self.show()

    def setColor(self, pressed):

        source = self.sender()

        if pressed:
            val = 255
        else:
            val = 0

        if source.text() == 'Red':
            self.col.setRed(val)
        elif source.text() == 'Green':
            self.col.setGreen(val)
        else:
            self.col.setBlue(val)

        self.square.setStyleSheet('QFrame { background-color: %s }' %
                                  self.col.name())

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The example contains three toggle buttons and a QWidget. We set the
background colour of the QWidget to black. The toggle buttons
toggles the red, green, and blue parts of the colour value. The background
colour depends on which toggle buttons are pressed.

self.col = QColor(0, 0, 0)

This is the initial, black colour value.

redb = QPushButton('Red', self)
redb.setCheckable(True)

To create a toggle button, we create a QPushButton and make it
checkable by calling the setCheckable function.

redb.clicked.connect(self.setColor)

We connect a clicked signal to our user defined function.

source = self.sender()

We get the button which was toggled with sender function.

if source.text() == 'Red':
    self.col.setRed(val)

In case it is a red button, we update the red part of the colour accordingly.

self.square.setStyleSheet('QFrame { background-color: %s }' %
    self.col.name())

We use style sheets to change the background colour. The stylesheet is updated
with setStyleSheet function.

![togglebutton.png](images/togglebutton.png)

Figure: QPushButton in toggle mode

In this article we have presented the PyQt QPushButton widget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).