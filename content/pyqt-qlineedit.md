+++
title = "PyQt QLineEdit"
date = 2025-08-29T20:07:24.930+01:00
draft = false
description = "PyQt QLineEdit tutorial shows how to work with QLineEdit widget. QLineEdit widget is a one-line text editor."
image = "images/alignment.png"
imageBig = "images/alignment.png"
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QLineEdit

last modified August 24, 2023

In this article we show how to work with tootltips in PyQt. 

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), read [PyQt6 tutorial](/pyqt6/), or list all PyQt
tutorials.

## QLineEdit

QLineEdit allows the user to enter and edit a single line of plain
text. It has useful collection of editing functions, including undo and redo,
cut and paste, and drag and drop.

When the text changes the textChanged signal is emitted;

## PyQt QLineEdit textChanged

The following is a simple example that uses QLineEdit.

text_changed.py
  

#!/usr/bin/python

import sys

from PyQt6.QtWidgets import (QApplication, QLabel, QLineEdit,
                             QVBoxLayout, QWidget)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QVBoxLayout(self)
        
        self.lbl = QLabel(self)
        qle = QLineEdit(self)

        qle.textChanged[str].connect(self.onChanged)

        hbox.addWidget(self.lbl)
        hbox.addSpacing(20)
        hbox.addWidget(qle)

        self.setGeometry(400, 400, 350, 300)
        self.setWindowTitle('QLineEdit')
        self.show()

    def onChanged(self, text):

        self.lbl.setText(text)
        self.lbl.adjustSize()

def main():
    
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

This example shows a line edit widget and a label. The text that we key in the
line edit is displayed immediately in the label widget.

qle = QLineEdit(self)

The QLineEdit widget is created.

qle.textChanged[str].connect(self.onChanged)

If the text in the line edit widget changes, we call the onChanged 
method.

def onChanged(self, text):
    
    self.lbl.setText(text)
    self.lbl.adjustSize() 

Inside the onChanged method, we set the typed text to the label
widget. We call the adjustSize method to adjust the size of the
label to the length of the text.

## QLineEdit align text

The text of the widget can be aligned with setAlignment.

alignment.py
  

#!/usr/bin/python

import sys

from PyQt6.QtCore import Qt
from PyQt6.QtWidgets import (QApplication, QComboBox, QHBoxLayout, QLineEdit,
                             QWidget)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        combo = QComboBox(self)
        combo.addItem('Left')
        combo.addItem('Center')
        combo.addItem('Right')

        combo.activated.connect(self.onActivated)

        self.qle = QLineEdit(self)

        hbox.addWidget(combo)
        hbox.setSpacing(20)
        hbox.addWidget(self.qle)

        self.setLayout(hbox)

        self.setWindowTitle('Text alignment')
        self.show()

    def onActivated(self, idx):

        align = [Qt.AlignmentFlag.AlignLeft, Qt.AlignmentFlag.AlignCenter,
                 Qt.AlignmentFlag.AlignRight]

        self.qle.setAlignment(align[idx])

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The example contains a QComboBox with three options; the options 
align the text in the adjacent QLineEdit to the left, center, or 
right.

def onActivated(self, idx):

    align = [Qt.AlignmentFlag.AlignLeft, Qt.AlignmentFlag.AlignCenter,
                Qt.AlignmentFlag.AlignRight]

    self.qle.setAlignment(align[idx])

In the onActivated callback, we set the alignment of the lined edit
widget with setAlignment.

![alignment.png](images/alignment.png)

Figure: QLineEdit Alignment

## QLineEdit echo mode

The echo mode determines how the text entered in the line edit is displayed 
to the user. In the default Normal mode, the entered text is
displayed verbatim. Other modes, including Password, and
PasswordEchoOnEdit supress or obscure the text.

echo_mode.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QWidget, QComboBox, QPushButton, QLineEdit,
                             QHBoxLayout, QApplication, QMessageBox)

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        combo = QComboBox(self)
        combo.addItem('Normal')
        combo.addItem('Password')
        combo.addItem('PasswordEchoOnEdit')
        combo.addItem('NoEcho')

        combo.activated.connect(self.onActivated)

        self.qle = QLineEdit(self)

        showBtn = QPushButton('Show', self)
        showBtn.clicked.connect(self.onClicked)

        hbox.addWidget(combo)
        hbox.setSpacing(20)
        hbox.addWidget(self.qle)
        hbox.setSpacing(20)
        hbox.addWidget(showBtn)

        self.setLayout(hbox)

        self.setWindowTitle('Echo mode')
        self.show()

    def onActivated(self, idx):

        modes = [QLineEdit.EchoMode.Normal, QLineEdit.EchoMode.Password,
                 QLineEdit.EchoMode.PasswordEchoOnEdit, QLineEdit.EchoMode.NoEcho]

        self.qle.setEchoMode(modes[idx])

    def onClicked(self):

        text = self.qle.text()
        QMessageBox.information(self, 'info', text)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we can choose the echo mode with a QComboBox.

def onActivated(self, idx):

    modes = [QLineEdit.EchoMode.Normal, QLineEdit.EchoMode.Password,
                QLineEdit.EchoMode.PasswordEchoOnEdit, QLineEdit.EchoMode.NoEcho]

    self.qle.setEchoMode(modes[idx])

The echo mode is set with the setEchoMode.

![echomode.png](images/echomode.png)

Figure: QLineEdit echo mode

## QLineEdit text validation

We can use a validator to validate the input text.

hex_validator.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QWidget, QLabel, QLineEdit, QSizePolicy,
                             QHBoxLayout, QApplication)
from PyQt6.QtGui import QPalette, QColor, QRegularExpressionValidator
from PyQt6.QtCore import QRegularExpression

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        label = QLabel('HEX colour:', self)

        rx = QRegularExpression("[0-9A-Fa-f]{6}")

        self.qle = QLineEdit(self)
        validator = QRegularExpressionValidator(rx)
        self.qle.setValidator(validator)

        self.qle.editingFinished.connect(self.onEditingFinished)

        self.colLabel = QLabel(self)
        self.colLabel.setSizePolicy(QSizePolicy.Policy.Expanding, 
            QSizePolicy.Policy.Expanding)
        self.colLabel.setAutoFillBackground(True)

        hbox.addWidget(label)
        hbox.addSpacing(20)
        hbox.addWidget(self.qle)
        hbox.addSpacing(20)

        hbox.addWidget(self.colLabel)
        pal = QPalette()
        pal.setColor(QPalette.ColorRole.Window, QColor('#333333'))
        self.colLabel.setPalette(pal)

        self.setLayout(hbox)
        self.resize(450, 200)
        self.setWindowTitle('Validator')
        self.show()

    def onEditingFinished(self):

        pal = QPalette()
        pal.setColor(QPalette.ColorRole.Window, QColor(f'#{self.qle.text()}'))
        self.colLabel.setPalette(pal)

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example, we have a validator for colour values in a hexadecimal format
(e.g. #33fe56). The entered colour is used a a background for the
QLabel widget.

self.qle = QLineEdit(self)
validator = QRegularExpressionValidator(rx)
self.qle.setValidator(validator)

We use a QRegularExpressionValidator which validates a string
against a regular expression. The regular expression specifies the allowed
characters and sets a fixed length with a quantifier. The validator is applied
with setValidator.

self.qle.editingFinished.connect(self.onEditingFinished)

The editingFinished signal is emitted when the Enter key is pressed
or the line edit loses focus. The signal is only emitted if the validator
passes.

def onEditingFinished(self):

    pal = QPalette()
    pal.setColor(QPalette.ColorRole.Window, QColor(f'#{self.qle.text()}'))
    self.colLabel.setPalette(pal)

The selected colour is applied on the label.

![validator.png](images/validator.png)

Figure: QLineEdit validator

## QLineEdit completer

Autocompletion can be provided with setCompleter.

completer.py
  

#!/usr/bin/python

import sys
from PyQt6.QtWidgets import (QWidget, QLabel, QCompleter, QLineEdit,
                             QHBoxLayout, QApplication)

data = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua &amp; Deps',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina', 'Botswana',
    'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon',
    'Canada', 'Cape Verde', 'Central African Rep', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo', 'Congo {Democratic Rep}', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
    'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
    'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
    'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
    'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North',
    'Korea South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
    'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
    'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
    'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda',
    'St Kitts &amp; Nevis', 'St Lucia', 'Saint Vincent &amp; the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome &amp; Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain',
    'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga',
    'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
    'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
]

class Example(QWidget):

    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):

        hbox = QHBoxLayout()

        label = QLabel('Enter country: ')

        self.qle = QLineEdit(self)
        completer = QCompleter(data)
        self.qle.setCompleter(completer)

        hbox.addWidget(label)
        hbox.addSpacing(20)
        hbox.addWidget(self.qle)

        self.setLayout(hbox)

        self.setWindowTitle('Completer')
        self.show()

def main():

    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

We have an example in which we enter a country name. The QLineEdit
suggests the country names as we type.

data = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola','Antigua &amp; Deps',
    'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
    'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
...

We have a list of countries.

self.qle = QLineEdit(self)
completer = QCompleter(data)
self.qle.setCompleter(completer)

We pass the list to the QCompleter and set the completer to the 
line edit widget with setCompleter.

![completer.png](images/completer.png)

Figure: QLineEdit completer

In this article we have worked with PyQt QLineEdit.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).