+++
title = "PyQt QSlider"
date = 2025-08-29T20:07:27.445+01:00
draft = false
description = "PyQt QSlider tutorial shows how to work with QSlider widget. QSlider chooses a value from a range of integers with a handle."
image = "images/horizontal.png"
imageBig = "images/horizontal.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QSlider

last modified August 24, 2023

In this article we show how to work with QSlider widget.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), 
read [PyQt6 tutorial](/pyqt6/), or list [all PyQt tutorials](/all/#pyqt).

## PyQt QSlider

QSlider is a widget for controlling a bounded value. The slider can
be horizontal or vertical. The user chooses the value by moving a handle.

The range of the possible values is specified with setMinimum, 
setMaximum, or setRange. Optionally, it is possible 
to display tickmarks. 

The valueChanged signal is emitted when the slider's value has
changed.

## QSlider horizontal example

In the following example, we create a horizontal slider. 

horizontal.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QSlider, QHBoxLayout,
                             QLabel, QApplication)
from PyQt6.QtCore import Qt
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        sld = QSlider(Qt.Orientation.Horizontal, self)
        sld.setRange(0, 100)
        sld.setPageStep(5)

        sld.valueChanged.connect(self.updateLabel)

        self.label = QLabel('0', self)
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter |
                                Qt.AlignmentFlag.AlignVCenter)
        self.label.setMinimumWidth(80)

        hbox.addWidget(sld)
        hbox.addSpacing(15)
        hbox.addWidget(self.label)

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QSlider')
        self.show()

    def updateLabel(self, value):

        self.label.setText(str(value))

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

Moving the slider's handle, we change the value displayed in the adjacent
label.

sld = QSlider(Qt.Orientation.Horizontal, self)
sld.setRange(0, 100)

A horizontal slider is created. Its range of values is set with
setRange.

sld.setPageStep(5)

The page step is a larger step which is performed with PageUp or PageDown or 
by clicking on a slider outside of the handle.

sld.valueChanged.connect(self.updateLabel)

We connect the self.updateLabel handler to the
valueChanged signal.

self.label = QLabel('0', self)
self.label.setAlignment(Qt.AlignmentFlag.AlignCenter |
                        Qt.AlignmentFlag.AlignVCenter)
self.label.setMinimumWidth(80)

We set a minimum size for the label to prevent the slider from resizing when the
label is redrawn. 

def updateLabel(self, value):

    self.label.setText(str(value))

In the updateLabel handler, we update the text of the label to the 
newly chosen QSlider value.

![horizontal.png](images/horizontal.png)

Figure: Horizontal QSlider

## Vertical QSlider

The next example displays a vertical slider.

vertical.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QSlider, QHBoxLayout,
                             QLabel, QApplication)
from PyQt6.QtCore import Qt
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        sld = QSlider(Qt.Orientation.Vertical, self)
        sld.setRange(0, 100)
        sld.setPageStep(5)

        sld.valueChanged.connect(self.changeValue)

        self.label = QLabel("0", self)
        self.label.setStyleSheet(
            'QLabel { background: #007AA5; border-radius: 3px;}')
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter |
                                Qt.AlignmentFlag.AlignVCenter)
        self.label.setMinimumWidth(80)

        hbox.addStretch()
        hbox.addWidget(sld)
        hbox.addSpacing(15)
        hbox.addWidget(self.label)
        hbox.addStretch()

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QSlider')
        self.show()

    def changeValue(self, value):

        self.label.setText(str(value))

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

To create a vertical slider, we pass the Qt.Orientation.Vertical to
the QSlider constructor.

self.label = QLabel('0', self)
self.label.setStyleSheet(
    'QLabel { background: #007AA5; border-radius: 3px;}')

We play with the label's stylesheet to create a nice looking rounded rectangle.

![vertical.png](images/vertical.png)

Figure: Vertical QSlider

## QSlider volume control

The following example shows how to use a slider to manage a volume control.

volume_control.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QSlider, QHBoxLayout,
                             QLabel, QApplication)
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QPixmap
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        sld = QSlider(Qt.Orientation.Horizontal, self)
        sld.valueChanged.connect(self.changeValue)

        self.label = QLabel(self)
        self.label.setPixmap(QPixmap('mute.png'))

        hbox.addWidget(sld)
        hbox.addSpacing(40)
        hbox.addWidget(self.label)

        self.setLayout(hbox)

        self.setGeometry(400, 300, 350, 200)
        self.setWindowTitle('Volume control')
        self.show()

    def changeValue(self, value):

        if value == 0:

            self.label.setPixmap(QPixmap('mute.png'))
        elif 0 &lt; value &lt;= 30:

            self.label.setPixmap(QPixmap('min.png'))
        elif 30 &lt; value &lt; 80:

            self.label.setPixmap(QPixmap('med.png'))
        else:

            self.label.setPixmap(QPixmap('max.png'))

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In our example we simulate a volume control. By dragging the handle of a slider,
we change an image on the label. 

self.label = QLabel(self)
self.label.setPixmap(QPixmap('mute.png'))

We create a QLabel widget and set an initial
mute image to it.

sld.valueChanged.connect(self.changeValue)

We connect the valueChanged signal to the user defined
changeValue method.

if value == 0:
    self.label.setPixmap(QPixmap('mute.png'))
...

Based on the value of the slider, we set an image to the label. In the above
code, we set the mute.png image to the label if the slider is equal
to zero.

![volume.png](images/volume.png)

Figure: QSlider volume control

In this article we have presented the PyQt QSlider widget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).