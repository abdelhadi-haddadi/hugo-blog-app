+++
title = "Layout management in PySide"
date = 2025-08-29T19:57:15.483+01:00
draft = false
description = "This part of the PySide tutorial covers layout management."
image = "images/absolute.png"
imageBig = "images/absolute.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)

# Layout management in PySide

last modified October 18, 2023

Important thing in GUI programming is the layout management. Layout management 
is the way how we place the widgets on the window. The management can be 
done in two ways. We can use *absolute positioning* or *layout classes*.

## Absolute positioning

The programmer specifies the position and the size of each widget in pixels. 
When you use absolute positioning, you have to understand several things. 

  - the size and the position of a widget do not change if we resize a window

  - applications might look different on various platforms

  - changing fonts in our application might spoil the layout

  
  if we decide to change our layout, we must completely redo 
  our layout, which is tedious and time consuming
  

#!/usr/bin/python

"""
ZetCode PySide tutorial 

This example shows three labels on a window
using absolute positioning. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        label1 = QtGui.QLabel('Zetcode', self)
        label1.move(15, 10)

        label2 = QtGui.QLabel('tutorials', self)
        label2.move(35, 40)
        
        label3 = QtGui.QLabel('for programmers', self)
        label3.move(55, 70)        
        
        self.setGeometry(300, 300, 250, 150)
        self.setWindowTitle('Absolute')    
        self.show()
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

We simply call the move method to position our widgets. In our case 
these widgets are labels. We position them by providing the x and the y coordinates. The 
beginning of the coordinate system is at the left top corner. The x values 
grow from left to right. The y values grow from top to bottom.

![absolute.png](images/absolute.png)

Figure: Absolute positioning

## Box Layout

Layout management with layout classes is much more flexible and practical. 
It is the preferred way to place widgets on a window. The basic layout 
classes are QtGui.QHBoxLayout and QtGui.QVBoxLayout. They line up 
widgets horizontally and vertically. 

Imagine that we wanted to place two buttons in the right bottom corner. To create 
such a layout, we use one horizontal and one vertical box. To create 
the necessary space, we add a stretch factor.

#!/usr/bin/python

"""
ZetCode PySide tutorial 

In this example, we position two push
buttons in the bottom-right corner 
of the window. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

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
They stay there when we resize the application window. We use both
QtGui.HBoxLayout and QtGui.QVBoxLayout. 

okButton = QtGui.QPushButton("OK")
cancelButton = QtGui.QPushButton("Cancel")

Here we create two push buttons.

hbox = QtGui.QHBoxLayout()
hbox.addStretch(1)
hbox.addWidget(okButton)
hbox.addWidget(cancelButton)

We create a horizontal box layout. Add a stretch factor and both buttons. 
The stretch adds a stretchable space before the two buttons. This will push
them to the right of the window. 

vbox = QtGui.QVBoxLayout()
vbox.addStretch(1)
vbox.addLayout(hbox)

To create the necessary layout, we put a horizontal layout into a vertical one. 
The stretch factor in the vertical box will push the horizontal box with the
buttons to the bottom of the window. 

self.setLayout(vbox)

Finally, we set the base layout of the window. It is the vertical box. 

![buttons.png](images/buttons.png)

Figure: Buttons example

## Grid layout

The most universal layout class in PySide is the grid layout. This layout 
divides the space into rows and columns.
To create a grid layout, we use the QtGui.QGridLayout class. 

#!/usr/bin/python

"""
ZetCode PySide tutorial 

In this example, we create a skeleton
of a calculator using a QGridLayout.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):
        
        names = ['Cls', 'Bck', '', 'Close', '7', '8', '9', '/',
                '4', '5', '6', '*', '1', '2', '3', '-',
                '0', '.', '=', '+']

        grid = QtGui.QGridLayout()

        j = 0
        pos = [(0, 0), (0, 1), (0, 2), (0, 3),
                (1, 0), (1, 1), (1, 2), (1, 3),
                (2, 0), (2, 1), (2, 2), (2, 3),
                (3, 0), (3, 1), (3, 2), (3, 3 ),
                (4, 0), (4, 1), (4, 2), (4, 3)]

        for i in names:
            button = QtGui.QPushButton(i)
            if j == 2:
                grid.addWidget(QtGui.QLabel(''), 0, 2)
            else: grid.addWidget(button, pos[j][0], pos[j][1])
            j = j + 1

        self.setLayout(grid)   
        
        self.move(300, 150)
        self.setWindowTitle('Calculator')    
        self.show()
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In our example, we create a grid of buttons. To fill one gap, 
we also add one QtGui.QLabel widget. 

grid = QtGui.QGridLayout()

Here we create a grid layout. 

if j == 2:
    grid.addWidget(QtGui.QLabel(''), 0, 2)
else: grid.addWidget(button, pos[j][0], pos[j][1])

To add a widget to a grid, we call the addWidget method. 
The arguments are the widget, the row and the column number.

![calculator.png](images/calculator.png)

Figure: Calculator skeleton

## Review example

Widgets can span multiple columns or rows in a grid. In the next 
example we illustrate this. 

#!/usr/bin/python

"""
ZetCode PySide tutorial 

In this example, we create a bit
more complicated window layout using
the QGridLayout manager. 

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PySide import QtGui

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

We create a window in which we have three labels, two line edits and
one text edit widget. The layout is done with the QtGui.QGridLayout.

grid = QtGui.QGridLayout()
grid.setSpacing(10)

We create a grid layout and set spacing between widgets. 

grid.addWidget(reviewEdit, 3, 1, 5, 1)

If we add a widget to a grid, we can provide row span and column 
span of the widget. In our case, we make the reviewEdit widget span 5 rows.

![review.png](images/review.png)

Figure: Review example

This part of the PySide tutorial was dedicated to layout management.

[Contents](..) 
[Previous](../menusandtoolbars/)
[Next](../eventsandsignals/)