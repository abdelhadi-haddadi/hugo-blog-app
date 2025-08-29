+++
title = "PyQt QSpinBox"
date = 2025-08-29T20:07:28.619+01:00
draft = false
description = "PyQt QSpinBox tutorial shows how to work with QSpinBox. QSpinBox is designed to handle integers and discrete sets of values."
image = "images/spinbox.png"
imageBig = "images/spinbox.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QSpinBox

last modified August 24, 2023

In this article we show how to work with QSpinBox widget.

Sources are available at [PyQt-Examples](https://github.com/janbodnar/PyQt-Examples) repository.
Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/),
read [PyQt5 tutorial](/gui/pyqt5/), or list [all PyQt tutorials](/all/#pyqt).

## QSpinBox

QSpinBox is designed to handle integers and discrete sets of
values. It allows the user to choose a value by clicking the up/down buttons or
pressing up/down on the keyboard to increase/decrease the value currently
displayed. The value can be typed in manually as well.

The range of the spin box is set with setRange or with 
setMinimum and setMaximum functions. The amount of 
step is specified with setSingleStep.

The valueChanged signal is emitted whenever the spin box's value is 
changed. The value function determines the current value.

## PyQt QSpinBox example

The following is a simple example that uses QSpinBox.

spinbox.py
  

#!/usr/bin/python

from PyQt5.QtWidgets import (QWidget, QSpinBox, QHBoxLayout,
                             QLabel, QApplication)
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        sbox = QSpinBox(self)

        sbox.valueChanged.connect(self.updateLabel)

        self.label = QLabel('0', self)

        hbox.addWidget(sbox)
        hbox.addSpacing(15)
        hbox.addWidget(self.label)

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QSpinBox')
        self.show()

    def updateLabel(self, value):

        self.label.setText(str(value))

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

The value chosen from the QSpinBox is displayed in the adjacent 
QLabel.

sbox.valueChanged.connect(self.updateLabel)

When the user selects a different value, the valueChanged is emitted.
We attach the updateLabel handler to the signal.

def updateLabel(self, value):

    self.label.setText(str(value))

In the updateLabel handler, we set the spin box's value to the label.

![spinbox.png](images/spinbox.png)

Figure: QSpinBox

## QSpinBox range, step, suffix

In the following example, we explore additional functionality of the 
QSpinBox.

spinbox2.py
  

#!/usr/bin/python

from PyQt5.QtWidgets import (QWidget, QSpinBox, QHBoxLayout,
                             QLabel, QApplication)
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        sbox = QSpinBox(self)
        sbox.setRange(0, 200)
        sbox.setSingleStep(5)
        sbox.setSuffix(' km')

        sbox.valueChanged.connect(self.updateLabel)

        self.label = QLabel('0', self)

        hbox.addWidget(sbox)
        hbox.addSpacing(15)
        hbox.addWidget(self.label)

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QSpinBox')
        self.show()

    def updateLabel(self, value):

        self.label.setText(str(value))

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In the example, we set the range, step, and suffix of the spin box.

sbox = QSpinBox(self)
sbox.setRange(0, 200)
sbox.setSingleStep(5)
sbox.setSuffix(' km')

The range is set with setRange, the step with setSingleStep, 
and the suffix with setSuffix.

![spinbox2.png](images/spinbox2.png)

Figure: QSpinBox showing suffix

## QSpinBox value

The value function returns the current value of the QSpinBox.

show_value.py
  

#!/usr/bin/python

from PyQt5.QtWidgets import (QWidget, QSpinBox, QHBoxLayout, QMessageBox,
                             QPushButton, QApplication, QSizePolicy)
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        self.sbox = QSpinBox(self)

        btn = QPushButton('Show', self)
        btn.setSizePolicy(QSizePolicy.Fixed, QSizePolicy.Fixed)
        btn.clicked.connect(self.showSpinboxValue)

        hbox.addWidget(self.sbox)
        hbox.addSpacing(15)
        hbox.addWidget(btn)

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QSpinBox')
        self.show()

    def showSpinboxValue(self):

        val = self.sbox.value()
        QMessageBox.information(self, 'Value', f'Value: {val}')

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

In the example, we have a spin box and a push button. Clicking on the button 
a message box is displayed; it shows the current value of the spin box.

def showSpinboxValue(self):

    val = self.sbox.value()
    QMessageBox.information(self, 'Value', f'Value: {val}')

We determine the current value with value and display it in 
the message box. 

In this article we have worked with PyQt QSpinBox.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).