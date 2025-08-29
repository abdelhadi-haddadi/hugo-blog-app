+++
title = "PyQt4 widgets"
date = 2025-08-29T19:57:05.982+01:00
draft = false
description = "In this part of the PyQt4 tutorial, we work with PyQt4 widgets, including QtGui.QCheckBox, QtGui.QSlider, QtGui.QSlider, QtGui.QProgressBar, and QtGui.QCalendarWidget."
image = "images/qcheckbox.png"
imageBig = "images/qcheckbox.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)
[Next](../widgets2/)

# PyQt4 widgets

last modified October 18, 2023

Widgets are basic building blocks of an application. PyQt4 has a wide 
range of various widgets, including buttons, check boxes, sliders, or list boxes.
In this section of the tutorial, we describe several useful widgets: a QtGui.QCheckBox, 
a ToggleButton, a QtGui.QSlider, a QtGui.QProgressBar,
and a QtGui.QCalendarWidget.

## QtGui.QCheckBox

A QtGui.QCheckBox is a widget that has two states: on and off. 
It is a box with a label. Check boxes are typically used to represent features 
in an application that can be enabled or disabled.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

In this example, a QtGui.QCheckBox widget
is used to toggle the title of a window.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui, QtCore

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):      

        cb = QtGui.QCheckBox('Show title', self)
        cb.move(20, 20)
        cb.toggle()
        cb.stateChanged.connect(self.changeTitle)
        
        self.setGeometry(300, 300, 250, 150)
        self.setWindowTitle('QtGui.QCheckBox')
        self.show()
        
    def changeTitle(self, state):
      
        if state == QtCore.Qt.Checked:
            self.setWindowTitle('QtGui.QCheckBox')
        else:
            self.setWindowTitle('')
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In our example, we create a checkbox that will toggle the window title. 

cb = QtGui.QCheckBox('Show title', self)

This is a QtGui.QCheckBox constructor.

cb.toggle()

We have set the window title, so we must also check the checkbox. 
By default, the window title is not set and the checkbox is unchecked.

cb.stateChanged.connect(self.changeTitle)

We connect the user defined changeTitle 
method to the stateChanged signal.
The changeTitle method will toggle the window title.

def changeTitle(self, state):
  
    if state == QtCore.Qt.Checked:
        self.setWindowTitle('QtGui.QCheckBox')
    else:
        self.setWindowTitle('')

The state of the widget is given to the changeTitle 
method in the state variable. If the widget is checked, we set a title 
of the window. Otherwise, we set an empty string to the titlebar.

![qcheckbox.png](images/qcheckbox.png)

Figure: QtGui.QCheckBox

## ToggleButton

A toggle button is a QtGui.QPushButton in a special mode.
It is a button that has two states: pressed and not pressed. 
We toggle between these two states by clicking on it. There are situations 
where this functionality fits well.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

In this example, we create three toggle buttons.
They will control the background color of a 
QtGui.QFrame. 

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

        self.col = QtGui.QColor(0, 0, 0)       

        redb = QtGui.QPushButton('Red', self)
        redb.setCheckable(True)
        redb.move(10, 10)

        redb.clicked[bool].connect(self.setColor)

        greenb = QtGui.QPushButton('Green', self)
        greenb.setCheckable(True)
        greenb.move(10, 60)

        greenb.clicked[bool].connect(self.setColor)

        blueb = QtGui.QPushButton('Blue', self)
        blueb.setCheckable(True)
        blueb.move(10, 110)

        blueb.clicked[bool].connect(self.setColor)

        self.square = QtGui.QFrame(self)
        self.square.setGeometry(150, 20, 100, 100)
        self.square.setStyleSheet("QWidget { background-color: %s }" %  
            self.col.name())
        
        self.setGeometry(300, 300, 280, 170)
        self.setWindowTitle('Toggle button')
        self.show()
        
        
    def setColor(self, pressed):
        
        source = self.sender()
        
        if pressed:
            val = 255
        else: val = 0
                        
        if source.text() == "Red":
            self.col.setRed(val)                
        elif source.text() == "Green":
            self.col.setGreen(val)             
        else:
            self.col.setBlue(val) 
            
        self.square.setStyleSheet("QFrame { background-color: %s }" %
            self.col.name())  
            
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()    

In our example, we create three toggle buttons and a
QtGui.QWidget. We set the background color of the 
QtGui.QWidget to black. The toggle buttons will 
toggle the red, green, and blue parts of the color value. 
The background color will depend on which toggle buttons we have pressed.  

self.col = QtGui.QColor(0, 0, 0)    

This is the initial, black colour value. 

redb = QtGui.QPushButton('Red', self)
redb.setCheckable(True)
redb.move(10, 10)

To create a toggle button, we create a QtGui.QPushButton and make it 
checkable by calling the setCheckable method.

redb.clicked[bool].connect(self.setColor)

We connect a clicked signal to our user defined method.
We use the clicked signal that operates with a Boolean value.

source = self.sender()

We get the button which was toggled.

if source.text() == "Red":
    self.col.setRed(val)   

In case it is a red button, we update the red part of the colour accordingly.

self.square.setStyleSheet("QFrame { background-color: %s }" %
    self.col.name())   

We use style sheets to change the background colour. 

![togglebutton.png](images/togglebutton.png)

Figure: ToggleButton

## QtGui.QSlider

A QtGui.QSlider is a widget that has a simple handle. 
This handle can be pulled back and forth.
This way we are choosing a value for a specific task. Sometimes using a slider is 
more natural than entering a number or using a spin box. 

In our example we show one slider and one label. This time the label will 
display an image. The slider will control the label.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This example shows a QtGui.QSlider widget.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui, QtCore

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):      

        sld = QtGui.QSlider(QtCore.Qt.Horizontal, self)
        sld.setFocusPolicy(QtCore.Qt.NoFocus)
        sld.setGeometry(30, 40, 100, 30)
        sld.valueChanged[int].connect(self.changeValue)
        
        self.label = QtGui.QLabel(self)
        self.label.setPixmap(QtGui.QPixmap('mute.png'))
        self.label.setGeometry(160, 40, 80, 30)
        
        self.setGeometry(300, 300, 280, 170)
        self.setWindowTitle('QtGui.QSlider')
        self.show()
        
    def changeValue(self, value):

        if value == 0:
            self.label.setPixmap(QtGui.QPixmap('mute.png'))
        elif value &gt; 0 and value &lt;= 30:
            self.label.setPixmap(QtGui.QPixmap('min.png'))
        elif value &gt; 30 and value &lt; 80:
            self.label.setPixmap(QtGui.QPixmap('med.png'))
        else:
            self.label.setPixmap(QtGui.QPixmap('max.png'))
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()    

In our example we simulate a volume control. By dragging the
handle of a slider, we change an image on the label.

sld = QtGui.QSlider(QtCore.Qt.Horizontal, self)

Here we create a horizontal QtGui.QSlider.

self.label = QtGui.QLabel(self)
self.label.setPixmap(QtGui.QPixmap('mute.png'))

We create a QtGui.QLabel widget and set an initial 
mute image to it. 

sld.valueChanged[int].connect(self.changeValue)

We connect the valueChanged signal to the user 
defined changeValue() method.

if value == 0:
    self.label.setPixmap(QtGui.QPixmap('mute.png'))
...

Based on the value of the slider, we set an image to the label.
In the above code, we set a mute.png image to the label if the
slider is equal to zero.

![qslider.png](images/qslider.png)

Figure: QtGui.QSlider widget

## QtGui.QProgressBar

A progress bar is a widget that is used when we process lengthy tasks. 
It is animated so that the user knows that the task is progressing. 
The QtGui.QProgressBar widget provides a horizontal or 
vertical progress bar in PyQt4 toolkit. The programmer can set the 
minimum and maximum value for the progress bar. The default values are 0 and 99. 

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This example shows a QtGui.QProgressBar widget.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui, QtCore

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
        
    def initUI(self):      

        self.pbar = QtGui.QProgressBar(self)
        self.pbar.setGeometry(30, 40, 200, 25)

        self.btn = QtGui.QPushButton('Start', self)
        self.btn.move(40, 80)
        self.btn.clicked.connect(self.doAction)

        self.timer = QtCore.QBasicTimer()
        self.step = 0
        
        self.setGeometry(300, 300, 280, 170)
        self.setWindowTitle('QtGui.QProgressBar')
        self.show()
        
    def timerEvent(self, e):
      
        if self.step &gt;= 100:
        
            self.timer.stop()
            self.btn.setText('Finished')
            return
            
        self.step = self.step + 1
        self.pbar.setValue(self.step)

    def doAction(self):
      
        if self.timer.isActive():
            self.timer.stop()
            self.btn.setText('Start')
            
        else:
            self.timer.start(100, self)
            self.btn.setText('Stop')
        
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()    

In our example we have a horizontal progress bar and a push button. 
The push button starts and stops the progress bar.

self.pbar = QtGui.QProgressBar(self)

This is a QtGui.QProgressBar constructor.

self.timer = QtCore.QBasicTimer()

To activate the progress bar, we use a timer object.

self.timer.start(100, self)

To launch a timer event, we call its start method. 
This method has two parameters: the timeout and the object which will 
receive the events.

def timerEvent(self, e):
  
    if self.step &gt;= 100:
    
        self.timer.stop()
        self.btn.setText('Finished')
        return
        
    self.step = self.step + 1
    self.pbar.setValue(self.step)

Each QtCore.QObject and its descendants have a timerEvent
event handler. In order to react to timer events, we reimplement the event handler.

def doAction(self):
  
    if self.timer.isActive():
        self.timer.stop()
        self.btn.setText('Start')
        
    else:
        self.timer.start(100, self)
        self.btn.setText('Stop')

Inside the doAction method, we start and stop the timer. 

![qprogressbar.png](images/qprogressbar.png)

Figure: QtGui.QProgressBar

## QtGui.QCalendarWidget

A QtGui.QCalendarWidget provides a monthly based calendar widget.
It allows a user to select a date in a simple and intuitive way.

#!/usr/bin/python

"""
ZetCode PyQt4 tutorial 

This example shows a QtGui.QCalendarWidget widget.

author: Jan Bodnar
website: zetcode.com
"""

import sys
from PyQt4 import QtGui, QtCore

class Example(QtGui.QWidget):
    
    def __init__(self):
        super(Example, self).__init__()
        
        self.initUI()
    
    
    def initUI(self):      

        cal = QtGui.QCalendarWidget(self)
        cal.setGridVisible(True)
        cal.move(20, 20)
        cal.clicked[QtCore.QDate].connect(self.showDate)
        
        self.lbl = QtGui.QLabel(self)
        date = cal.selectedDate()
        self.lbl.setText(date.toString())
        self.lbl.move(130, 260)
        
        self.setGeometry(300, 300, 350, 300)
        self.setWindowTitle('Calendar')
        self.show()
        
    def showDate(self, date):     
    
        self.lbl.setText(date.toString())
    
    
def main():
    
    app = QtGui.QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

The example has a calendar widget and a label widget. 
The currently selected date is displayed in the label widget.

cal = QtGui.QCalendarWidget(self)

We construct a calendar widget.

cal.clicked[QtCore.QDate].connect(self.showDate)

If we select a date from the widget, a clicked[QtCore.QDate] signal 
is emitted. We connect this signal to the user defined showDate method.

def showDate(self, date):     
    self.lbl.setText(date.toString())

We retrieve the selected date by calling the selectedDate method. 
Then we transform the date object into string and set it to the label widget.

![calendar.png](images/calendar.png)

Figure: QtGui.QCalendarWidget

In this part of the PyQt4 tutorial, we covered several widgets. 

[Contents](..) 
[Previous](../dialogs/)
[Next](../widgets2/)