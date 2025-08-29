+++
title = "Layout management in PyQt4"
date = 2025-08-29T19:57:04.440+01:00
draft = false
description = "In this part of the PyQt4 tutorial, we work with layout management."
image = "images/absolute.png"
imageBig = "images/absolute.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)

# Layout management in PyQt4

last modified October 18, 2023

An important aspect in GUI programming is the layout management. Layout management 
is the way how we place the widgets on the window. The management can be 
done in two basic ways. We can use *absolute positioning* or *layout classes*.

## Absolute positioning

The programmer specifies the position and the size of each widget in pixels. 
When you use absolute positioning, we have to understand the following limitations:

  - The size and the position of a widget do not change if we resize a window

  - Applications might look different on various platforms

  - Changing fonts in our application might spoil the layout

  
  If we decide to change our layout, we must completely redo 
  our layout, which is tedious and time consuming
  

The following example will position widgets in absolute coordinates.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This example shows three labels on a window
using absolute positioning. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        lbl1 = QtGui.QLabel('ZetCode', self)
        lbl1.move(15, 10)

        lbl2 = QtGui.QLabel('tutorials', self)
        lbl2.move(35, 40)
        
        lbl3 = QtGui.QLabel('for programmers', self)
        lbl3.move(55, 70)        
        
        self.setGeometry(300, 300, 250, 150)
        self.setWindowTitle('Absolute')    
        self.show()
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

We use the move method to position our widgets. In our case 
these are labels. We position them by providing the x and y coordinates. 
The beginning of the coordinate system is at the 
left top corner. The x values grow from left to right. The y
values grow from top to bottom.

lbl1 = QtGui.QLabel('Zetcode', self)
lbl1.move(15, 10)

The label widget is positioned at x=15 and y=10.

![absolute.png](images/absolute.png)

Figure: Absolute positioning

## Box layout

Layout management with layout classes is much more flexible and practical. 
It is the preferred way to place widgets on a window. The QtGui.QHBoxLayout 
and QtGui.QVBoxLayout are basic layout classes that line up widgets 
horizontally and vertically. 

Imagine that we wanted to place two buttons in the right bottom corner. To create 
such a layout, we use one horizontal, and one vertical box. To create 
the necessary space, we add a *stretch factor*.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

In this example, we position two push
buttons in the bottom-right corner 
of the window. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        okButton = QtGui.QPushButton("OK")
        cancelButton = QtGui.QPushButton("Cancel")

        hbox = QtGui.QHBoxLayout()
        hbox.addStretch(1)
        hbox.addWidget(okButton)
        hbox.addWidget(cancelButton)

        vbox = QtGui.QVBoxLayout()
        vbox.addStretch(1)
        vbox.addLayout(hbox)
        
        self.setLayout(vbox)    
        
        self.setGeometry(300, 300, 300, 150)
        self.setWindowTitle('Buttons')    
        self.show()
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

The example places two buttons in the bottom-right corner of the window. 
They stay there when we resize the application window. We use both a
QtGui.HBoxLayout and a QtGui.QVBoxLayout. 

okButton = QtGui.QPushButton("OK")
cancelButton = QtGui.QPushButton("Cancel")

Here we create two push buttons.

hbox = QtGui.QHBoxLayout()
hbox.addStretch(1)
hbox.addWidget(okButton)
hbox.addWidget(cancelButton)

We create a horizontal box layout and add a stretch factor and both buttons. 
The stretch adds a stretchable space before the two buttons. 
This will push them to the right of the window.

vbox = QtGui.QVBoxLayout()
vbox.addStretch(1)
vbox.addLayout(hbox)

To create the necessary layout, we put a horizontal layout into a vertical one. 
The stretch factor in the vertical box will push the horizontal box 
with the buttons to the bottom of the window. 

self.setLayout(vbox)

Finally, we set the main layout of the window. 

![buttons.png](images/buttons.png)

Figure: Buttons

## QtGui.QGridLayout

The most universal layout class is the grid layout. This layout 
divides the space into rows and columns.
To create a grid layout, we use the QtGui.QGridLayout class. 

#!/usr/bin/python

import sys
from PyQt4 import QtGui

"""
ZetCode PyQt4 tutorial 

In this example, we create a skeleton
of a calculator using a QtGui.QGridLayout.

author: Jan Bodnar
website: zetcode.com
"""

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        grid = QtGui.QGridLayout()
        self.setLayout(grid)
 
        names = ['Cls', 'Bck', '', 'Close',
                 '7', '8', '9', '/',
                '4', '5', '6', '*',
                 '1', '2', '3', '-',
                '0', '.', '=', '+']
        
        positions = [(i,j) for i in range(5) for j in range(4)]
        
        for position, name in zip(positions, names):
            
            if name == '':
                continue
            button = QtGui.QPushButton(name)
            grid.addWidget(button, *position)
            
        self.move(300, 150)
        self.setWindowTitle('Calculator')
        self.show()
        
def main():
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In our example, we create a grid of buttons. 

grid = QtGui.QGridLayout()
self.setLayout(grid)

The instance of a QtGui.QGridLayout is created and
set to be the layout for the application window.

names = ['Cls', 'Bck', '', 'Close',
            '7', '8', '9', '/',
        '4', '5', '6', '*',
            '1', '2', '3', '-',
        '0', '.', '=', '+']

These are the labels used later for buttons.

positions = [(i,j) for i in range(5) for j in range(4)]

We create a list of positions in the grid.

for position, name in zip(positions, names):
    
    if name == '':
        continue
    button = QtGui.QPushButton(name)
    grid.addWidget(button, *position)

Buttons are created and added to the layout with the addWidget
method.

![calculator.png](images/calculator.png)

Figure: Calculator skeleton

## Review example

Widgets can span multiple columns or rows in a grid. In the next 
example we illustrate this. 

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

In this example, we create a bit
more complicated window layout using
the QtGui.QGridLayout manager. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        title = QtGui.QLabel('Title')
        author = QtGui.QLabel('Author')
        review = QtGui.QLabel('Review')

        titleEdit = QtGui.QLineEdit()
        authorEdit = QtGui.QLineEdit()
        reviewEdit = QtGui.QTextEdit()

        grid = QtGui.QGridLayout()
        grid.setSpacing(10)

        grid.addWidget(title, 1, 0)
        grid.addWidget(titleEdit, 1, 1)

        grid.addWidget(author, 2, 0)
        grid.addWidget(authorEdit, 2, 1)

        grid.addWidget(review, 3, 0)
        grid.addWidget(reviewEdit, 3, 1, 5, 1)
        
        self.setLayout(grid) 
        
        self.setGeometry(300, 300, 350, 300)
        self.setWindowTitle('Review')    
        self.show()
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

We create a window in which we have three labels, two line edits, and
one text edit widget. The layout is done with the QtGui.QGridLayout.

grid = QtGui.QGridLayout()
grid.setSpacing(10)

We create a grid layout and set spacing between widgets. 

grid.addWidget(reviewEdit, 3, 1, 5, 1)

If we add a widget to a grid, we can provide row span and column 
span of the widget. In our case, we make the reviewEdit 
widget span 5 rows.

![review.png](images/review.png)

Figure: Review example

This part of the PyQt4 tutorial was dedicated to layout management.

[Contents](..) 
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)