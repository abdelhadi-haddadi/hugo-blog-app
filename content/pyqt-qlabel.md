+++
title = "PyQt QLabel"
date = 2025-08-29T20:07:24.758+01:00
draft = false
description = "PyQt QLabel tutorial shows how to work with QLabel widget. QLabel is a widget which displays text or image."
image = "images/labels.png"
imageBig = "images/labels.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QLabel

last modified August 24, 2023

In this article we show how to work with QLabel widget.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), 
read [PyQt6 tutorial](/gui/pyqt6/), or list [all PyQt tutorials](/all/#pyqt).

## QLabel

QLabel is a widget which displays text or image. No user
interaction functionality is provided. By default, labels display left-aligned,
vertically-centered text and images.

## QLabel text labels

The following example shows text labels on the window.

text_labels.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QLabel, QApplication, QHBoxLayout

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        hbox.addWidget(QLabel("falcon"))
        hbox.addWidget(QLabel("owl"))
        hbox.addWidget(QLabel("eagle"))
        hbox.addWidget(QLabel("skylark"))

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('QLabel')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we place four labels in a horizontal box. 

![labels.png](images/labels.png)

Figure: Text labels

## QLabel images

The following example uses QLabel to display images. 
To display an image on a label, we also use the QPixmap.

images.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QLabel, QApplication, QHBoxLayout
from PyQt6.QtGui import QPixmap

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        lbl1 = QLabel()
        lbl1.setPixmap(QPixmap("cpu.png"))

        lbl2 = QLabel()
        lbl2.setPixmap(QPixmap("drive.png"))

        lbl3 = QLabel()
        lbl3.setPixmap(QPixmap("laptop.png"))

        lbl4 = QLabel()
        lbl4.setPixmap(QPixmap("player.png"))

        hbox.addWidget(lbl1)
        hbox.addWidget(lbl2)
        hbox.addWidget(lbl3)
        hbox.addWidget(lbl4)

        self.setLayout(hbox)

        self.move(400, 300)
        self.setWindowTitle('Images')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

Four PNG images are shown on the window. An image is set on a label with 
the setPixmap function.

![images.png](images/images.png)

Figure: Images

## QLabel colours

In the following example, we use labels to display various colours.

colours.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QLabel, QApplication, QGridLayout

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        grid = QGridLayout()

        lbl1 = QLabel()
        lbl1.setStyleSheet("background-color:firebrick; border-radius:5px")

        lbl2 = QLabel()
        lbl2.setStyleSheet("background-color:gold; border-radius:5px")
        
        lbl3 = QLabel()
        lbl3.setStyleSheet("background-color:seagreen; border-radius:5px")

        lbl4 = QLabel()
        lbl4.setStyleSheet("background-color:royalblue; border-radius:5px")

        lbl5 = QLabel()
        lbl5.setStyleSheet("background-color:crimson; border-radius:5px")

        lbl6 = QLabel()
        lbl6.setStyleSheet("background-color:salmon; border-radius:5px")

        lbl7 = QLabel()
        lbl7.setStyleSheet("background-color:deeppink; border-radius:5px")

        lbl8 = QLabel()
        lbl8.setStyleSheet("background-color:tomato; border-radius:5px")

        lbl9 = QLabel()
        lbl9.setStyleSheet("background-color:darkkhaki; border-radius:5px")

        lbl10 = QLabel()
        lbl10.setStyleSheet("background-color:cornflowerblue; border-radius:5px")

        lbl11 = QLabel()
        lbl11.setStyleSheet("background-color:rosybrown; border-radius:5px")

        lbl12 = QLabel()
        lbl12.setStyleSheet("background-color:chocolate; border-radius:5px")

        lbl13 = QLabel()
        lbl13.setStyleSheet("background-color:slategray; border-radius:5px")

        grid.addWidget(lbl1, 0, 0)
        grid.addWidget(lbl2, 0, 1)
        grid.addWidget(lbl3, 0, 2)
        grid.addWidget(lbl4, 0, 3)
        grid.addWidget(lbl5, 1, 0)
        grid.addWidget(lbl6, 1, 1)
        grid.addWidget(lbl8, 1, 2)
        grid.addWidget(lbl9, 1, 3)
        grid.addWidget(lbl10, 2, 0)
        grid.addWidget(lbl11, 2, 1)
        grid.addWidget(lbl12, 2, 2)
        grid.addWidget(lbl13, 2, 3)

        self.setLayout(grid)

        self.setGeometry(300, 300, 420, 200)
        self.setWindowTitle('Colours')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we display twelve coloured rounded rectangles.

lbl1 = QLabel()
lbl1.setStyleSheet("background-color:firebrick; border-radius:5px")

A colour is set with the setStyleSheet function. We also change 
the border radius.

![colours.png](images/colours.png)

Figure: Colours

## QLabel hyperlink

QLabel can be used to create a hyperlink.

hyperlink.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import QWidget, QLabel, QApplication, QHBoxLayout

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        link = QLabel('&lt;a href="https://zetcode.com"&gt;zetcode.com&lt;/a&gt;')
        link.setOpenExternalLinks(True)

        hbox.addWidget(link)

        self.setLayout(hbox)

        self.setGeometry(300, 300, 350, 250)
        self.setWindowTitle('HTML link')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we pass an HTML anchor to the label. The
setOpenExternalLinks function automatically opens the provided link
upon being clicked.

In this article we have presented the PyQt QLabel widget.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).