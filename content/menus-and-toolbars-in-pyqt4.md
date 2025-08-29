+++
title = "Menus and toolbars in PyQt4"
date = 2025-08-29T19:57:05.689+01:00
draft = false
description = "In this part of the PyQt4 tutorial, we work with menus and toolbars. The covered classes include QtGui.QMainWindow, QtGui.QAction, and QtGui.QApplication."
image = "images/toolbar.png"
imageBig = "images/toolbar.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)

# Menus and toolbars in PyQt4

last modified October 18, 2023

In this part of the PyQt4 tutorial, we create menus and toolbars.
A menu is a group of commands located in a menubar. A toolbar has buttons
with some common commands in the application.

## Main window

The QtGui.QMainWindow class provides a main application 
window. This enables to create a classic application
skeleton with a statusbar, toolbars, and a menubar.

## Statusbar

A statusbar is a widget that is used for displaying status information.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This program creates a statusbar.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

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

The statusbar is created with the help of the QtGui.QMainWindow widget.

self.statusBar().showMessage('Ready')

 
To get the statusbar, we call the statusBar method 
of the QtGui.QMainWindow class. The first call of the method
creates a status bar. Subsequent calls return the statusbar object. 
The showMessage displays a message on the statusbar.

 

## Menubar

A menubar is a common part of a GUI application. It is a group of commands 
located in various menus. (Mac OS treats menubars differently. To get
a similar outcome, we can add the following line: menubar.setNativeMenuBar(False).)

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This program creates a menubar. The
menubar has one menu with an exit action.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
        
    def initUI(self):               
        
        exitAction = QtGui.QAction(QtGui.QIcon('exit.png'), '&amp;Exit', self)        
        exitAction.setShortcut('Ctrl+Q')
        exitAction.setStatusTip('Exit application')
        exitAction.triggered.connect(QtGui.qApp.quit)

        self.statusBar()

        menubar = self.menuBar()
        fileMenu = menubar.addMenu('&amp;File')
        fileMenu.addAction(exitAction)
        
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Menubar')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()    

In the above example, we create a menubar with one menu. 
This menu contains one action which terminates the 
application if selected. A statusbar is created as well. 
The action is accessible with the Ctrl+Q shortcut.

exitAction = QtGui.QAction(QtGui.QIcon('exit.png'), '&amp;Exit', self)        
exitAction.setShortcut('Ctrl+Q')
exitAction.setStatusTip('Exit application')

 
A QtGui.QAction is an abstraction for actions
performed with a menubar, toolbar or with a custom keyboard shortcut. 
In the above three lines, we create an action with a specific icon and
an 'Exit' label. Furthermore, a shortcut is defined for this action. 
The third line creates a status tip which is shown in the statusbar when
we hover a mouse pointer over the menu item. 

 

exitAction.triggered.connect(QtGui.qApp.quit)

 
When we select this particular action, a triggered signal is emitted. 
The signal is connected to the quit method of the
QtGui.QApplication widget. This terminates the application.

 

menubar = self.menuBar()
fileMenu = menubar.addMenu('&amp;File')
fileMenu.addAction(exitAction)

 
The menuBar method creates a menubar. We create a 
file menu and append the exit action to it. 

 

## Toolbar

Menus group all commands that we can use in an application. 
Toolbars provide a quick access to the most frequently used commands.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This program creates a toolbar.
The toolbar has one action, which
terminates the application if triggered.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
        
    def initUI(self):               
        
        exitAction = QtGui.QAction(QtGui.QIcon('exit24.png'), 'Exit', self)
        exitAction.setShortcut('Ctrl+Q')
        exitAction.triggered.connect(QtGui.qApp.quit)
        
        self.toolbar = self.addToolBar('Exit')
        self.toolbar.addAction(exitAction)
        
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Toolbar')    
        self.show()
        
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In the above example, we create a simple toolbar. The toolbar has one 
tool action. An exit action which terminates the application when triggered.

exitAction = QtGui.QAction(QtGui.QIcon('exit24.png'), 'Exit', self)
exitAction.setShortcut('Ctrl+Q')
exitAction.triggered.connect(QtGui.qApp.quit)

 
Similar to the menubar example above, we create an action object. 
The object has a label, icon and a shorcut. A quit method of the
QtGui.QMainWindow is connected to the triggered signal.

 

self.toolbar = self.addToolBar('Exit')
self.toolbar.addAction(exitAction)

Here we create a toolbar and plug and action object into it. 

![toolbar.png](images/toolbar.png)

Figure: Toolbar

## Putting it together

In the last example of this section, we create a menubar, a toolbar 
and a statusbar. We also create a central widget.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This program creates a skeleton of
a classic GUI application with a menubar,
toolbar, statusbar and a central widget. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QMainWindow):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
        
    def initUI(self):               
        
        textEdit = QtGui.QTextEdit()
        self.setCentralWidget(textEdit)

        exitAction = QtGui.QAction(QtGui.QIcon('exit24.png'), 'Exit', self)
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
with a menubar, toolbar, and a statusbar. 

 

textEdit = QtGui.QTextEdit()
self.setCentralWidget(textEdit)
 
 
 
Here we create a text edit widget. We set it to be the central widget 
of the QtGui.QMainWindow. The central widget occupies all 
space that is left.

 

![mainwindow.png](images/mainwindow.png)

Figure: MainWindow

In this part of the PyQt4 tutorial, we worked with menus, toolbars, a statusbar, 
and a main application window.

[Contents](..) 
[Previous](../firstprograms/)
[Next](../layoutmanagement/)