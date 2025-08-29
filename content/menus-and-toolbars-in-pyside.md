+++
title = "Menus and toolbars in PySide"
date = 2025-08-29T19:57:16.576+01:00
draft = false
description = "This part of the PySide tutorial covers menus and toolbars."
image = "images/toolbar.png"
imageBig = "images/toolbar.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)

# Menus and toolbars in PySide

last modified October 18, 2023

In this part of the PySide tutorial, we create menus and toolbars.
A menu is a group of commands located in a menubar. A toolbar has buttons
with the common commands in the application.

## Main Window

The QtGui.QMainWindow class provides a main application 
window. This enables to create the classic application
skeleton with a statusbar, toolbar(s) and a menubar.

## Statusbar

The statusbar is a widget that is used for displaying status information.

#!/usr/bin/python

"""
ZetCode PySide tutorial 

This program creates a statusbar.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):               
        
        self.statusBar().showMessage('Ready')
        
        self.setGeometry(300, 300, 250, 150)
        self.setWindowTitle('Statusbar')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

A statusbar is created with the help of the QtGui.QMainWindow widget. 

self.statusBar().showMessage('Ready')

To get the statusbar, we call the statusBar method 
of the QtGui.QMainWindow class. The first call of the method
creates a status bar. Subsequent calls return the statusbar object. 
The showMessage displays a message on the statusbar.

## Menubar

A menubar is a common part of a GUI application. 
It is a group of commands located in various menus. While in console 
applications we have to remember various commands and their options, 
here we have most of the commands grouped into logical parts. 
These are accepted standards that further reduce the amount of 
time spending to learn a new application.

#!/usr/bin/python

"""
ZetCode PySide tutorial 

This program creates a menubar.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):               
        
        exitAction = QtGui.QAction(QtGui.QIcon('exit.png'), '&amp;Exit', self)
        exitAction.setShortcut('Ctrl+Q')
        exitAction.setStatusTip('Exit application')
        exitAction.triggered.connect(self.close)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&amp;File')
        fileMenu.addAction(exitAction)
        
        self.setGeometry(300, 300, 250, 150)
        self.setWindowTitle('Menubar')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In the above example, we create a menubar with one menu. 
This menu will contain one action, which will terminate the
application if selected. A statusbar is created as well. 
The action is accessible with the Ctrl+Q shortcut. 

exitAction = QtGui.QAction(QtGui.QIcon('exit.png'), '&amp;Exit', self)
exitAction.setShortcut('Ctrl+Q')
exitAction.setStatusTip('Exit application')

A PySide QtGui.QAction is an abstraction for actions
performed with a menubar, toolbar or with a custom keyboard shortcut. 
In the above three lines, we create an action, with a specific icon and
an 'Exit' label. Furthermore, a shortcut is defined for this action. 
The third line creates a status tip, which is shown in the statusbar, when
we hover a mouse pointer over the menu item. 

exitAction.triggered.connect(self.close)

When we select this particular action, a triggered signal is emitted. 
The signal is connected to the close method of the
QtGui.QMainWindow widget. This terminates the application.

menubar = self.menuBar()

A menubar is created. 

fileMenu = menubar.addMenu('&amp;File')
fileMenu.addAction(exitAction)

We create a file menu with the addMenu method
of the menubar object. We add the previously created action to the
file menu. 

## Toolbar

Menus group all commands that we can use in an application. 
Toolbars provide a quick access to the most frequently used commands.

#!/usr/bin/python

"""
ZetCode PySide tutorial 

This program creates a toolbar.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):               
        
        exitAction = QtGui.QAction(QtGui.QIcon('exit24.png'), 'Exit', self)
        exitAction.setShortcut('Ctrl+Q')
        exitAction.triggered.connect(self.close)
        
        self.toolbar = self.addToolBar('Exit')
        self.toolbar.addAction(exitAction)
        
        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('Toolbar')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In the above example, we create a simple toolbar. The toolbar has one
tool action. An exit action, which closes the application.

exitAction = QtGui.QAction(QtGui.QIcon('exit24.png'), 'Exit', self)
exitAction.setShortcut('Ctrl+Q')
exitAction.triggered.connect(self.close)

Similar to the menubar example above, we create an action object. 
The object has a label, icon and a shorcut. A close method of the
QtGui.QMainWindow is connected to the triggered signal.

self.toolbar = self.addToolBar('Exit')
self.toolbar.addAction(exitAction)

Here we create a toolbar and plug and action object into it. 

![toolbar.png](images/toolbar.png)

Figure: Toolbar

## Putting it together

In the last example of this section, we create a menubar, toolbar 
and a statusbar. We also create a central widget.

#!/usr/bin/python

"""
ZetCode PySide tutorial 

This program creates a skeleton of
a classic GUI application with a menubar,
toolbar, statusbar and a central widget. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):               
        
        textEdit = QtGui.QTextEdit()
        self.setCentralWidget(textEdit)

        exitAction = QtGui.QAction('Exit', self)
        exitAction.setShortcut('Ctrl+Q')
        exitAction.setStatusTip('Exit application')
        exitAction.triggered.connect(self.close)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&amp;File')
        fileMenu.addAction(exitAction)

        toolbar = self.addToolBar('Exit')
        toolbar.addAction(exitAction)
        
        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('Main window')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

This code example creates a skeleton of a classic GUI application
with a menubar, toolbar and a statusbar. 

textEdit = QtGui.QTextEdit()
self.setCentralWidget(textEdit)

Here we create a text edit widget. We set it to be the central widget 
of the QtGui.QMainWindow. The central widget will 
occupy all space that is left.

![mainwindow.png](images/mainwindow.png)

Figure: QtGui.QMainWindow

In this part of the PySide tutorial, we worked with menus, toolbars, statusbar
and a main application window. 

[Contents](..) 
[Previous](../firstprograms/)
[Next](../layoutmanagement/)