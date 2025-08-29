+++
title = "PyQt QListWidget"
date = 2025-08-29T20:07:24.840+01:00
draft = false
description = "PyQt QListWidget tutorial shows how to work with QListWidget. QListWidget provides an item-based list widget."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QListWidget

last modified August 24, 2023

In this article we show how to work with QListWidget.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), read 
[PyQt6 tutorial](/pyqt6/), or list [all PyQt tutorials](/all/#pyqt).

## PyQt QListWidget

QListWidget provides an item-based list widget.

The addItem function adds a new item at the end of the list. With 
addItems function, multiple items can be inserted. 
The number of items in the list is found with the count function. 
The takeItem function removes an item from the list.

The current item in the list can be found with currentItem, and 
changed with setCurrentItem. 

## PyQt QListWidget simple example

In the following example, we create a simple example featuring
QListWidget.

simple.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QListWidget, QWidget, QMessageBox,
                             QApplication, QVBoxLayout)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout(self)

        listWidget = QListWidget()

        listWidget.addItem("sparrow")
        listWidget.addItem("robin")
        listWidget.addItem("crow")
        listWidget.addItem("raven")
        listWidget.addItem("woodpecker")
        listWidget.addItem("hummingbird")

        listWidget.itemDoubleClicked.connect(self.onClicked)

        vbox.addWidget(listWidget)
        self.setLayout(vbox)

        self.setGeometry(400, 300, 350, 250)
        self.setWindowTitle('QListWidget')
        self.show()

    def onClicked(self, item):

        QMessageBox.information(self, "Info", item.text())

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We create a QListWidget which has names of birds as its items. 
By double-clicking an item, the current bird name is shown in a message box.

listWidget = QListWidget(self)

A QListWidget is created.

listWidget.addItem("sparrow") 
listWidget.addItem("robin")
listWidget.addItem("crow")
...

New items are inserted with addItem function.

listWidget.itemDoubleClicked.connect(self.onClicked)

We connect the onClicked function to the
itemDoubleClicked signal.

def onClicked(self, item):

    QMessageBox.information(self, "Info", item.text())

The handler function receives the double-clicked item from which we get the 
text with the text function. The text is displayed in a message box 
with QMessageBox.information.

![simple.png](images/simple.png)

Figure: Simple QListWidget example

## PyQt QListWidget clear/count

The clear function removes all items from the list and the 
count function counts all items.

clear_count.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QListWidget, QPushButton, QWidget, QHBoxLayout,
                             QMessageBox, QApplication, QVBoxLayout)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout(self)
        hbox = QHBoxLayout()

        self.listWidget = QListWidget(self)

        self.listWidget.addItems(['sparrow', 'robin', 'crow', 'raven',
                                  'woopecker', 'hummingbird'])

        clearBtn = QPushButton('Clear', self)
        clearBtn.clicked.connect(self.onClearClicked)

        countBtn = QPushButton('Count', self)
        countBtn.clicked.connect(self.onCountClicked)

        vbox.addWidget(self.listWidget)
        hbox.addWidget(clearBtn)
        hbox.addWidget(countBtn)
        vbox.addLayout(hbox)

        self.setLayout(vbox)

        self.setGeometry(400, 300, 350, 250)
        self.setWindowTitle('QListWidget')
        self.show()

    def onClearClicked(self):

        self.listWidget.clear()

    def onCountClicked(self):

        QMessageBox.information(self, "Info",
                                f'# of birds {self.listWidget.count()}')

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have two push buttons. The first clears all items and the second counts all
items and shows the number in a message box.

clearBtn = QPushButton('Clear', self)
clearBtn.clicked.connect(self.onClearClicked)

countBtn = QPushButton('Count', self)
countBtn.clicked.connect(self.onCountClicked)

Below the QListWidget, we have placed two push buttons. We 
add two click handlers.

def onClearClicked(self):

    self.listWidget.clear()

In the onClearClicked handler, we remove all items with
clear.

def onCountClicked(self):

    QMessageBox.information(self, "Info", 
        f'# of birds {self.listWidget.count()}')

In the onCountClicked handler, we count the number of items with 
count and display the message in a message box.

![counting.png](images/counting.png)

Figure: Counting items in QListWidget

## QListWidget sort items

The sortItems function sorts items in the QListWidget.

sorting.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QCheckBox, QListWidget, QPushButton, QWidget,
                             QHBoxLayout, QApplication, QVBoxLayout)
from PyQt6.QtCore import Qt

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        vbox = QVBoxLayout(self)
        hbox = QHBoxLayout()

        self.listWidget = QListWidget(self)

        self.listWidget.addItems(['sparrow', 'robin', 'crow', 'raven',
                                  'woopecker', 'hummingbird'])

        self.sortOrder = QCheckBox('Ascending', self)

        sortBtn = QPushButton('Sort', self)
        sortBtn.clicked.connect(self.onSorted)

        vbox.addWidget(self.listWidget)
        hbox.addWidget(self.sortOrder)
        hbox.addWidget(sortBtn)
        vbox.addLayout(hbox)

        self.setLayout(vbox)

        self.setGeometry(400, 300, 350, 250)
        self.setWindowTitle('Sorting items')
        self.show()

    def onSorted(self):

        if self.sortOrder.isChecked():
            order = Qt.SortOrder.AscendingOrder
        else:
            order = Qt.SortOrder.DescendingOrder

        self.listWidget.sortItems(order)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have a sort push button. The sorting order is selected with
QCheckBox widget.

def onSorted(self):

    if self.sortOrder.isChecked():
        order = Qt.SortOrder.AscendingOrder
    else:
        order = Qt.SortOrder.DescendingOrder

    self.listWidget.sortItems(order)

We determine the state of the QCheckBox with isChecked
and choose the sorting order; either Qt.SortOrder.AscendingOrder or 
Qt.SortOrder.DescendingOrder. Then we pass the order to the
sortItems function.

![sorting.png](images/sorting.png)

Figure: QListWidget sorted items

In this article we have presented the PyQt QListWidget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).