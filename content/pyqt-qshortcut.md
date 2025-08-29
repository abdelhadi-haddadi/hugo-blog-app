+++
title = "PyQt QShortcut"
date = 2025-08-29T20:07:27.359+01:00
draft = false
description = "PyQt QShortcut tutorial shows how to work with QShortcut. QShortcut is used to connect keyboard shortcuts to PyQt signals and slots mechanism, so that objects can be informed when a shortcut is executed."
image = "images/shortcut.png"
imageBig = "images/shortcut.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QShortcut

last modified August 24, 2023

In this article we show how to work with QShortcut.

Sources are available at [PyQt-Examples](https://github.com/janbodnar/PyQt-Examples) repository.
Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/),
read [PyQt5 tutorial](/gui/pyqt5/), or list [all PyQt tutorials](/all/#pyqt).

A keyboard shortcut is a series of one or several keys that performs an action
in the application.

## QShortcut

QShortcut is used to connect keyboard shortcuts to PyQt signals and
slots mechanism, so that objects can be informed when a shortcut is executed.
When the user types the key sequence for a given shortcut, the shortcut's
activated signal is emitted.

The shortcut can be set up to contain all the key presses necessary to describe
a keyboard shortcut, including the states of modifier keys such as Shift,
Ctrl, Alt.

On certain widgets, using &amp; in front of a character automatically
creates a mnemonic (a shortcut is sometimes called mnemonic in this context) 
for that character. For instance, &amp;Quit
creates the shortcut Alt + Q. On Linux, the key is underlined.
On Windows, the key is underlined after we press the Alt key.
On Mac, mnemonics are disabled by default.

On widgets that do not support automatic mnemonics, we create a shortcut with
QShortcut and QKeySequence.

## PyQt QShortcut simple example

The following example creates two shortcuts.

simple.py
  

#!/usr/bin/python

from PyQt5.QtWidgets import QWidget, QShortcut, QApplication, QMessageBox
from PyQt5.QtGui import QKeySequence
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.msgSc = QShortcut(QKeySequence('Ctrl+M'), self)

        self.msgSc.activated.connect(lambda : QMessageBox.information(self,
            'Message', 'Ctrl + M initiated'))

        self.quitSc = QShortcut(QKeySequence('Ctrl+Q'), self)
        self.quitSc.activated.connect(QApplication.instance().quit)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Shortcuts')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

The Ctrl + M shortcut shows a message box and the
Ctrl + Q quits the application.

self.msgSc = QShortcut(QKeySequence('Ctrl+M'), self)

The Ctrl + M shortcut is created. It is applied to the
main window widget.

self.msgSc.activated.connect(lambda : QMessageBox.information(self,
    'Message', 'Ctrl + M initiated'))

We connect a lambda function displaying a message box to the activated
signal of the shortcut.

self.quitSc = QShortcut(QKeySequence('Ctrl+Q'), self)
self.quitSc.activated.connect(QApplication.instance().quit)

The Ctrl + Q shortcut terminates the application.

## QShortcut on QPushButton

In the following example, we create a mnemonic shortcut on a push button.

button.py
  

#!/usr/bin/python

from PyQt5.QtWidgets import (QWidget, QHBoxLayout, QApplication, 
    QPushButton, QMessageBox, QSizePolicy)
from PyQt5.QtGui import QKeySequence
from PyQt5.QtCore import Qt
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        msgBtn = QPushButton('&amp;Show message', self)
        msgBtn.clicked.connect(lambda : QMessageBox.information(self, 
            'Message', 'Information message'))

        hbox.addWidget(msgBtn)
        msgBtn.setSizePolicy(QSizePolicy.Fixed, QSizePolicy.Fixed)
        hbox.setAlignment(Qt.AlignLeft)

        self.setLayout(hbox)

        self.move(300, 300)
        self.setWindowTitle('Shortcuts')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

A message box is displayed when pressing the Alt + S 
shortcut.

msgBtn = QPushButton('&amp;Show message', self)

The Alt + S shortcut is created by using the &amp;
character in the label of the button.

![shortcut.png](images/shortcut.png)

Figure: Shortcut on QPushButton

## QShortcut with QAction and QMenu

We can create shortcuts with QAction and QMenu.

menu.py
  

#!/usr/bin/python

import sys
from PyQt5.QtWidgets import QMainWindow, QAction, qApp, QApplication
from PyQt5.QtGui import QIcon

class Example(QMainWindow):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        exitAct = QAction(QIcon('exit.png'), '&amp;Exit', self)
        exitAct.setShortcut('Ctrl+Q')
        exitAct.setStatusTip('Exit application')
        exitAct.triggered.connect(qApp.quit)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&amp;File')
        fileMenu.addAction(exitAct)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Simple menu')
        self.show()

def main():
    
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

The example has three shortcuts: Alt + F for opening 
the File menu and then Alt + E for exiting the application. 
These shortcuts must be activated in the specified sequence. The Ctrl + 
Q terminates the application without needing to work with the menu.

exitAct = QAction(QIcon('exit.png'), '&amp;Exit', self)

The Alt + E mnemonic is created by using the &amp;
in the label of the QAction.

exitAct.setShortcut('Ctrl+Q')

A global shortcut is created with the setShortcut function.

fileMenu = menubar.addMenu('&amp;File')

We create the Alt + F mnemonic with the addMenu
function.

![shortcut2.png](images/shortcut2.png)

Figure: Shortcuts with QAction and QMenu

In this article we have presented the PyQt shortcuts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).