+++
title = "PyQt QToolTip"
date = 2025-08-29T20:07:28.610+01:00
draft = false
description = "PyQt QToolTip tutorial shows how to work with tootltips in PyQt. QToolTip provides tool tips (balloon help) for any widget."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QToolTip

last modified August 24, 2023

In this article we show how to work with tootltips in PyQt. 

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), read [PyQt6 tutorial](/pyqt6/), or list all PyQt
tutorials.

## QToolTip

QToolTip provides tool tips (balloon help) for any widget. 
It is a short piece of text reminding the user of the components's function.
Tooltips can contain rich text. 

Tooltips are set with QWidget.setToolTip or
QToolTip.showText member functions.

## PyQt QToolTip example

The following is a simple example that uses QToolTip.

simple.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QToolTip, QPushButton, QApplication
from PyQt6.QtGui import QFont

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        QToolTip.setFont(QFont('SansSerif', 10))

        self.setToolTip('This is a &lt;b&gt;QWidget&lt;/b&gt; widget')

        btn = QPushButton('Button', self)
        btn.setToolTip('This is a &lt;b&gt;QPushButton&lt;/b&gt; widget')
        btn.resize(btn.sizeHint())
        btn.move(50, 50)

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Tooltips')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In this example, we show a tooltip for two PyQt5 widgets.

QToolTip.setFont(QFont('SansSerif', 10))

This static method sets a font used to render tooltips. We use a 10pt 
SansSerif font.

self.setToolTip('This is a &lt;b&gt;QWidget&lt;/b&gt; widget')

To create a tooltip, we call the setTooltip function. We can use
rich text formatting.

btn = QPushButton('Button', self)
btn.setToolTip('This is a &lt;b&gt;QPushButton&lt;/b&gt; widget')

We create a push button widget and set a tooltip for it.

![simple.png](images/simple.png)

Figure: QToolTip

## Styled QToolTip

In the following example, we style the tooltip with a stylesheet.

styled.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QToolTip, QApplication
from PyQt6.QtGui import QFont, QPalette, QColor

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.setStyleSheet('''QToolTip { 
                           background-color: #8ad4ff; 
                           color: black; 
                           border: #8ad4ff solid 1px
                           }''')

        QToolTip.setFont(QFont('Georgia', 11))

        pal = QPalette()
        pal.setColor(QPalette.ColorRole.Window, QColor('#348ceb'))
        self.setPalette(pal)

        self.setToolTip('This is QWidget')

        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Styled QToolTip')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We change the look of a tooltip with a stylesheet. In addition, we change the 
background colour of the QWidget with a QPalette.

self.setStyleSheet('''QToolTip { 
    background-color: #8ad4ff; 
    color: black; 
    border: #8ad4ff solid 1px
    }''')

We change the background colour, the foreground colour, and the border of the 
tooltip.

pal = QPalette()
pal.setColor(QPalette.ColorRole.Window, QColor('#348ceb'))
self.setPalette(pal)

We change the background colour of the main widget with QPalette.

![styled.png](images/styled.png)

Figure: Styled QToolTip

## QToolTip mouse positions

The following example shows mouse positions in tooltips.

mouse_positions.py
  

#!/usr/bin/python

import sys
from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import QWidget, QApplication, QGridLayout, QToolTip

class MyWidget(QWidget):

    def __init__(self):
        super().__init__()

        self.setAttribute(Qt.WidgetAttribute.WA_StyledBackground, True)
        self.setStyleSheet(
            'QWidget { background: #007AA5; border-radius: 3px;}')
        self.setMouseTracking(True)

    def mouseMoveEvent(self, e):

        self.x = e.pos().x()
        self.y = e.pos().y()

        p = self.mapToGlobal(e.pos())

        QToolTip.showText(p, f'{self.x}:{self.y}')

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        grid = QGridLayout()

        r = c = 0

        for _ in range(9):
            grid.addWidget(MyWidget(), r, c)

            c += 1

            if c % 3 == 0:
                c = 0
                r += 1

        self.setLayout(grid)

        self.setGeometry(400, 300, 500, 350)
        self.setWindowTitle('Mouse positions')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have nine widgets placed in the main widget. When we place the cursor over
one of the widgets, a tooltip showing the mouse position relative the this
widget is displayed. 

self.setMouseTracking(True)

In order to catch mouse move events, we need to call setMouseTracking.

def mouseMoveEvent(self, e):

    self.x = e.pos().x()
    self.y = e.pos().y()

    p = self.mapToGlobal(e.pos())

    QToolTip.showText(p, f'{self.x}:{self.y}')

In the overridden mouseMoveEvent function, we determine the mouse 
coordinates and show them in the tooltip with showText.

![mousepositions.png](images/mousepositions.png)

Figure: Mouse positions

## QToolTip on painted shapes

The following example shows a tooltip over painted shapes.

shapes.py
  

#!/usr/bin/python

import sys

from PyQt6.QtCore import QEvent, QPointF, Qt
from PyQt6.QtGui import QColor, QPainter, QPainterPath, QPolygonF
from PyQt6.QtWidgets import QApplication, QToolTip, QWidget

class Shape(object):

    def __init__(self):

        self.mypath = QPainterPath()
        self.col = QColor()
        self.toottip = ''

    def path(self):
        return self.mypath

    def color(self):
        return self.col

    def toolTip(self):
        return self.toottip

    def setPath(self, path):
        self.mypath = path

    def setToolTip(self, tooltip):
        self.toottip = tooltip

    def setPosition(self, position):
        self.pos = position

    def setColor(self, color):
        self.col = color

class Example(QWidget):

    def __init__(self):
        super(Example, self).__init__()

        self.initUI()

    def initUI(self):

        self.circlePath = QPainterPath()
        self.squarePath = QPainterPath()
        self.trianglePath = QPainterPath()
        self.pentagonPath = QPainterPath()
        self.shapes = []

        self.circlePath.addEllipse(30, 50, 100, 100)
        self.squarePath.addRect(180, 50, 100, 100)

        x = self.trianglePath.currentPosition().x()
        y = self.trianglePath.currentPosition().y()

        self.trianglePath.moveTo(320, 150)
        self.trianglePath.lineTo(450, 150)
        self.trianglePath.lineTo(415, 50)
        self.trianglePath.lineTo(320, 150)

        polygon = QPolygonF()
        polygon.append(QPointF(130,  240))
        polygon.append(QPointF(100,  280))
        polygon.append(QPointF(50,   280))
        polygon.append(QPointF(20,  240))
        polygon.append(QPointF(75,  200))

        self.pentagonPath.addPolygon(polygon)

        self.createShape(self.circlePath, 'Circle', QColor('#c72602'))
        self.createShape(self.squarePath, 'Square', QColor('#32a852'))
        self.createShape(self.trianglePath, 'Triangle', QColor('#205f6e'))
        self.createShape(self.pentagonPath, 'Pentagon', QColor('#e0b107'))

        self.setWindowTitle('Shapes')
        self.resize(480, 300)
        self.show()

    def event(self, e):

        if e.type() == QEvent.Type.ToolTip:

            index = self.itemIndexAt(e.pos())

            if index != -1:
                QToolTip.showText(e.globalPos(),
                                  self.shapes[index].toolTip())
            else:
                QToolTip.hideText()
                e.ignore()

            return True

        return super(Example, self).event(e)

    def paintEvent(self, e):

        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        painter.setPen(Qt.PenStyle.NoPen)

        for shape in self.shapes:

            painter.setBrush(shape.color())
            painter.drawPath(shape.path())

    def itemIndexAt(self, pos):

        for i in range(len(self.shapes)):

            item = self.shapes[i]

            if item.path().contains(QPointF(pos)):

                return i

        return -1

    def createShape(self, path, toolTip, color):

        shape = Shape()
        shape.setPath(path)
        shape.setToolTip(toolTip)
        shape.setColor(color)

        self.shapes.append(shape)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we paint four shapes: circle, square, pentagon, and a triangle.
Hovering a mouse over each of the shapes triggers a tooltip showing the shape
type.

def event(self, e):

    if e.type() == QEvent.Type.ToolTip:
        ...

There is no event handler for a tooltip event. To catch a tooltip event, we need
to override the event handler, which is the main event handler and
receives all the widget's events. 

index = self.itemIndexAt(e.pos())

All four shapes are stored in the shapes variable. The
itemIndexAt custom function determines whether we hover our mouse
pointer over a shape. It returns the index from the shapes
collection, or -1 otherwise.

if index != -1:
    QToolTip.showText(e.globalPos(),
            self.shapes[index].toolTip())
else:
    QToolTip.hideText()
    e.ignore()

return True

For a valid index, we show a tooltip with showText. We are ignoring
tooltips if we are outside a shape.

return super(Example, self).event(e)

Since we are overridding the event, which receives all kinds of 
events, we need to bubble up all the non-tooltip events for processing.

def itemIndexAt(self, pos):

    for i in range(len(self.shapes)):

        item = self.shapes[i]

        if item.path().contains(QPointF(pos)):
            
            return i

    return -1

The itemIndexAt determines the shape index over the current mouse
cursor point; if there is any. The QPainterPath's contains
function returns True if the given point is inside the path.

![shapes.png](images/shapes.png)

Figure: Shapes

In this article we have worked with PyQt QToolTip.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).