+++
title = "PyQt QComboBox"
date = 2025-08-29T20:07:23.569+01:00
draft = false
description = "PyQt QComboBox tutorial shows how to work with QComboBox widget. QComboBox is a is a combined button and popup list."
image = "images/combo.png"
imageBig = "images/combo.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QComboBox

last modified August 24, 2023

In this article we show how to work with QComboBox widget.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), 
read [PyQt6 tutorial](/pyqt6/), or list [all PyQt tutorials](/all/#pyqt).

## PyQt QComboBox

QComboBox is a widget which provides a list of options to the user
in a way that takes up the minimum amount of screen space. A combobox is a
selection widget that displays the current item. It  can pop up a list of
selectable items.

A combobox may be editable and can contain icons. 

The activated signal is sent when the user chooses an item in the
combobox. 

## QComboBox example

The following example shows the selected item in a nearby label.

simple.py
  

#!/usr/bin/python

import sys

from PyQt6.QtWidgets import (QWidget, QLabel, QHBoxLayout,
                             QComboBox, QApplication)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        self.distros = ['Debian', 'Xubuntu', 'Fedora', 'Arch', 'Gentoo']

        hbox = QHBoxLayout()

        self.lbl = QLabel('Ubuntu', self)

        combo = QComboBox(self)

        for distro in self.distros:
            combo.addItem(distro)

        combo.activated.connect(self.onActivated)

        hbox.addWidget(combo)
        hbox.setSpacing(20)

        hbox.addWidget(self.lbl)
        self.setContentsMargins(20, 20, 20, 20)
        self.setLayout(hbox)

        self.move(300, 300)
        self.setWindowTitle('QComboBox')
        self.show()

    def onActivated(self, idx):

        self.lbl.setText(self.distros[idx])
        self.lbl.adjustSize()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have a combobox and a label. The selected item is displayed in the label.

combo = QComboBox(self)

for distro in self.distros:
    combo.addItem(distro)

A new item is added with addItem

combo.activated.connect(self.onActivated)

We connect the self.onActivated handler to the
activate signal.

def onActivated(self, idx):

    self.lbl.setText(self.distros[idx])
    self.lbl.adjustSize()

In the event handler, we set the selected text to the label and adjust the
label's size to fit the text.

![combo.png](images/combo.png)

Figure: QComboBox

## QComboBox icons

In the following example, we display icons with text in the combobox.

icons.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QWidget, QHBoxLayout,
                             QComboBox, QApplication)
from PyQt6.QtGui import QIcon

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        combo = QComboBox(self)
        combo.addItem('Disk')
        combo.setItemIcon(0, QIcon('disk.png'))
        
        combo.addItem('Web')
        combo.setItemIcon(1, QIcon('web.png'))

        combo.addItem('Computer')
        combo.setItemIcon(2, QIcon('computer.png'))

        hbox.addWidget(combo)
        hbox.setSpacing(20)
    
        self.setContentsMargins(20, 20, 20, 20)
        self.setLayout(hbox)

        self.setGeometry(300, 300, 250, 180)
        self.setWindowTitle('QComboBox')
        self.show()

def main():
    
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The icon is set with the setItemIcon method.

![combo_icons.png](images/combo_icons.png)

Figure: Displaying icons in QComboBox

## QComboBox find text

The findItemText method returns the index of the item containing 
the given text. If the text was not found, it returns -1.

finding.py
  

#!/usr/bin/python

import sys

from PyQt6.QtWidgets import (QWidget, QLineEdit, QHBoxLayout, QPushButton,
                             QComboBox, QApplication)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        data = ['sky', 'cloud', 'grass', 'water', 'glass', 'forest', 
            'rock', 'light', 'brittle', 'water', 'smoke']

        self.combo = QComboBox(self)
        self.combo.setMinimumWidth(90)
        self.combo.addItems(data)

        self.lineEdit = QLineEdit()
        self.lineEdit.setMinimumWidth(90)

        btn = QPushButton("Find")
        btn.clicked.connect(self.onClicked)

        hbox.addWidget(self.combo)
        hbox.setSpacing(20)
        hbox.addWidget(self.lineEdit)
        hbox.setSpacing(20)

        hbox.addWidget(btn)

        self.setContentsMargins(20, 20, 20, 20)
        self.setLayout(hbox)

        self.move(300, 300)
        self.setWindowTitle('QComboBox')
        self.show()

    def onClicked(self):

        data = self.lineEdit.text()
        idx = self.combo.findText(data)

        if idx != -1:
            self.combo.setCurrentIndex(idx)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we have a combobox, a line edit, and a push button. We search
for the specified text, entered in the line edit. If the item text is found, it
is displayed as the current text item.

data = ['sky', 'cloud', 'grass', 'water', 'glass', 'forest', 
    'rock', 'light', 'brittle', 'water', 'smoke']

self.combo = QComboBox(self)
self.combo.setMinimumWidth(90)
self.combo.addItems(data)

Multiple items are inserted with addItems.

def onClicked(self):

    data = self.lineEdit.text()
    idx = self.combo.findText(data)

    if idx != -1:
        self.combo.setCurrentIndex(idx)

When we click on the button, the onClicked handler is called. 
We retrieve the entered text with text. Then we find the index
of the item which has the text. Finally, we set the current item with 
setCurrentIndex.

In this article we have presented the PyQt QComboBox widget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).