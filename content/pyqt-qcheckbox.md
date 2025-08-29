+++
title = "PyQt QCheckBox"
date = 2025-08-29T20:07:23.563+01:00
draft = false
description = "PyQt QCheckBox tutorial shows how to work with QCheckBox widget. QCheckBox is a widget that has two states: on and off. It is a box with a label."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QCheckBox

last modified August 24, 2023

In this article we show how to work with QCheckBox widget.

## PyQt QCheckBox

QCheckBox is a widget that has two states: on and off. It is a box
with a label. Checkboxes are typically used to represent features in an
application that can be enabled or disabled. 

To create exclusive check boxes, we can use the QButtonGroup.
With setTristate function, we can change the QCheckBox
box to have three states. This can be used in situations where we want to have
an additional neutral option. 

The stateChanged signal is emitted whenever a checkbox is checked 
or cleared.

## QCheckBox example

The following example uses a QCheckBox to toggle the window title.

simple.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import QWidget, QCheckBox, QVBoxLayout, QApplication
from PyQt6.QtCore import Qt
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout()

        cb = QCheckBox('Show title', self)
        cb.toggle()
        cb.stateChanged.connect(self.changeTitle)

        vbox.addWidget(cb)
        vbox.addStretch()

        self.setLayout(vbox)

        self.setGeometry(400, 300, 450, 350)
        self.setWindowTitle('QCheckBox')
        self.show()

    def changeTitle(self, state):

        if state == Qt.CheckState.Checked.value:
            self.setWindowTitle('QCheckBox')
        else:
            self.setWindowTitle(' ')

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we create a checkbox that toggles the window title. 

cb = QCheckBox('Show title', self)

This is a QCheckBox constructor.

cb.toggle()

Since the title is visible at the start, we check the checkbox with
toggle.

cb.stateChanged.connect(self.changeTitle)

We connect the user defined changeTitle function to the
stateChanged signal. The changeTitle function toggles
the window title.

def changeTitle(self, state):

    if state == Qt.CheckState.Checked.value:
        self.setWindowTitle('QCheckBox')
    else:
        self.setWindowTitle(' ')

The state of the widget is passed to the changeTitle function in
the state variable. If the widget is checked, we set a title of the
window. Otherwise, we set an empty string to the titlebar.

![simple.png](images/simple.png)

Figure: QCheckBox

## Three-state QCheckBox

The next example demonstrates the three-state QCheckBox.

three_state.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QCheckBox, QApplication,
                             QHBoxLayout, QLabel)
from PyQt6.QtCore import Qt
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        checkBox = QCheckBox('Increase taxes', self)
        checkBox.setTristate(True)
        hbox.addWidget(checkBox)

        checkBox.stateChanged.connect(self.changeTitle)

        self.label = QLabel('Negative viewpoint')
        hbox.addSpacing(20)
        hbox.addWidget(self.label)

        self.setLayout(hbox)

        self.move(300, 300)
        self.setWindowTitle('QCheckBox')
        self.show()

    def changeTitle(self, state):

        if state == Qt.CheckState.Checked.value:
            self.label.setText('Positive viewpoint')
        elif state == Qt.CheckState.Unchecked.value:
            self.label.setText('Negative viewpoint')
        else:
            self.label.setText('Neutral viewpoint')

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have a QCheckBox with 'Increase taxes' label. By clicking on the
checkbox, we can show a positive, negative, or neutral viewpoint.

checkBox = QCheckBox('Increase taxes', self)
checkBox.setTristate(True)

We create a QCheckBox and make it have three states with 
setTristate.

![threestate.png](images/threestate.png)

Figure: Three-state QCheckBox

## Exclusive QCheckBox

With the help of the QButtonGroup, we can make checkboxes
exclusive; that is, only one of the boxes can be checked at a time.

exclusive.py
  

#!/usr/bin/python

from PyQt6.QtWidgets import (QWidget, QCheckBox, QApplication,
                             QHBoxLayout, QVBoxLayout, QLabel, QButtonGroup)
import sys

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout()
        hbox = QHBoxLayout()

        checkBox1 = QCheckBox('Small', self)
        checkBox2 = QCheckBox('Medium', self)
        checkBox3 = QCheckBox('Large', self)

        group = QButtonGroup(self)
        group.addButton(checkBox1)
        group.addButton(checkBox2)
        group.addButton(checkBox3)

        hbox.addWidget(checkBox1)
        hbox.addWidget(checkBox2)
        hbox.addWidget(checkBox3)

        group.buttonClicked.connect(self.changeText)

        self.label = QLabel('...', self)

        vbox.addLayout(hbox)
        vbox.addSpacing(30)
        vbox.addWidget(self.label)

        self.setLayout(vbox)

        self.setGeometry(400, 300, 350, 300)
        self.setWindowTitle('QCheckBox')
        self.show()

    def changeText(self, btn):

        self.label.setText(btn.text())

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have three checkboxes representing small, medium, and large sizes.

group = QButtonGroup(self)
group.addButton(checkBox1)
group.addButton(checkBox2)
group.addButton(checkBox3)

We place the three checkboxes into the QButtonGroup with 
addButton.

group.buttonClicked.connect(self.changeText)

We react to the buttonClicked signal.

def changeText(self, btn):

    self.label.setText(btn.text())

Upon clicking on any of the checkboxes, we get its text and update the label.

![exclusive.png](images/exclusive.png)

Figure: Exclusive QCheckBox

In this article we have presented the PyQt QCheckBox widget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).