+++
title = "Introduction to Qt4 toolkit"
date = 2025-08-29T19:57:20.302+01:00
draft = false
description = "This chapter is an introduction to the Qt4 toolkit; it shows how to install Qt."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../utilityclasses/)

# Introduction to Qt4 toolkit

last modified October 18, 2023

In this part of the Qt4 tutorial, we introduce the Qt4 library.
We install the Qt4 library and create our first small Qt4 application.

Qt was initially developed by Trolltech, a Norwegian software company.
In 2008 the company was acquired by Nokia. In August 2012 a Finnish development company Digia
acquired Qt software technologies from Nokia. Meanwhile a Qt Project was created
in which the development of open source Qt continues. The website for the open source
Qt toolkit can be found at [qt.io](http://www.qt.io). 
Qt is currently being developed both by the Qt Company, a subsidiary of Digia, and the 
Qt Project under open-source governance, involving individual developers and firms. 

## Qt

Qt is a cross-platform application development framework. Some of the
well known applications developed with Qt are KDE, Opera, Google Earth, Skype,
VLC, Maya, or Mathematica. Qt was first publicly released on May 1995. 
It is dual licensed. It can be used for creating open source applications 
as well as commercial ones. Qt toolkit is a very powerful toolkit. It is well established 
in the open source community. Thousands of open source developers use Qt 
all over the world. 

## Download and decompress

We go to the [download.qt.io/official_releases/qt/](http://download.qt.io/official_releases/qt/) 
page. (Since the download links have been changing often in the past, you might need to google
for the current link.) We choose the latest Qt 4.x sources. At the time of the creation of this tutorial, 
the latest sources were Qt 4.8.7. Next, we are going to install Qt from sources.

$ ls qt-everywhere-opensource-src-4.8.7.tar.gz 
qt-everywhere-opensource-src-4.8.7.tar.gz

From the download page, we download the Qt4 sources. Use the tar file. (We save ourselves some
trouble. The ZIP file has Windows line endings.)

$ tar -xzvf qt-everywhere-opensource-src-4.8.7.tar.gz

The command will decompress all the files to a directory 
qt-everywhere-opensource-src-4.8.7.

$ du -hs qt-everywhere-opensource-src-4.8.7/
741M    qt-everywhere-opensource-src-4.8.7/

The size of the directory is now 741 MB.

$ cd qt-everywhere-opensource-src-4.8.7/

We go to the created directory. Now it is time to carefully read the 
README and the INSTALL file. There we find 
detailed installation instructions. The installation is easy and straightforward. 

## Installation from sources

We install the library the classic way. On Unix systems, installation of a 
software is divided into three steps.

- Configuration

- Building

- Installation

$ ./configure -prefix /usr/local/qt4
Which edition of Qt do you want to use ?

Type 'c' if you want to use the Commercial Edition.
Type 'o' if you want to use the Open Source Edition.

First we run the configure script. The script will ask whether
we want the commercial or open source edition of the Qt4 library.
The script will configure the library for our machine type. By default, 
the Qt will be installed in /usr/local/Trolltech/Qt-4.8.7/ directory. 
This can be changed by the -prefix parameter of the configure script. 
We install the library into the /usr/local/qt4/ directory. Note that the 
installation word has two meanings here. It is the whole process consisting of 
all three steps. And it also means 'moving files to specific directories', which is the last, third step.

This is the  Open Source Edition.

You are licensed to use this software under the terms of
the Lesser GNU General Public License (LGPL) versions 2.1.
You are also licensed to use this software under the terms of
the GNU General Public License (GPL) versions 3.

Type '3' to view the GNU General Public License version 3.
Type 'L' to view the Lesser GNU General Public License version 2.1.
Type 'yes' to accept this license offer.
Type 'no' to decline this license offer.

Do you accept the terms of either license? yes

Confirming license agreement.

Qt is now configured for building. Just run 'make'.
Once everything is built, you must run 'make install'.
Qt will be installed into /usr/local/qt4.

To reconfigure, run 'make confclean' and 'configure'.

We get this message after the configure script finishes.

$ make

We use the make command to start the build process.
The building of the Qt toolkit can take several hours. It depends on the 
power of your processor.

The last step is installing, or moving files to the directories.

$ sudo make install

This command finishes the installation process. The library is now installed 
in /usr/local/qt4/ directory. 

$ du -sh /usr/local/qt4/
483M    /usr/local/qt4/

The size of the directory is 483 MB. As we can 
see, Qt is a huge library.

The last thing that we do is to add the Qt4 path to the PATH system variable.
The bash users need to edit the either the .profile file or
the .bashrc file.

$ PATH=/usr/local/qt4/bin:$PATH
$ export PATH

We have added a path to the bin directory of the Qt4 library to the 
PATH environment variable. The changes will be active after 
another login.

## Installation from packages

It is easier to install Qt from packages. Linux packages
usually do not contain the latest Qt version.

$ sudo apt-get install qt4-dev-tools

The above command installs Qt4 on Debian-based Linux. 

## Version

Our first program prints the version of the Qt4 library.

version.cpp
  

#include &lt;QtCore&gt;
#include &lt;iostream&gt;

int main() {
    
    std::cout &lt;&lt; "Qt version: " &lt;&lt; qVersion() &lt;&lt; std::endl;
}

The qVersion function returns the version number of Qt at 
run-time as a string.

$ g++ -o version version.cpp  -I/usr/local/qt4/include/QtCore -I/usr/local/qt4/include -L/usr/local/qt4/lib -lQtCore

The above command compiles the example. Note that your Qt4 library might
be installed in different location.

$ ./version 
Qt version: 4.8.6

The version of the Qt4 library used throughout this tutorial is 4.8.6.

## Testing a small GUI example

Finally, we write a small application. The application
consists of a plain window.

simple.cpp
  

#include &lt;QApplication&gt;
#include &lt;QWidget&gt;

int main(int argc, char *argv[]) {
    
    QApplication app(argc, argv);

    QWidget window;

    window.resize(250, 150);
    window.setWindowTitle("Simple example");
    window.show();

    return app.exec();
}

To build this example, we use the qmake tool.

$ qmake -project
$ qmake
$ make

If the Qt4 installation directory is not a part of the PATH 
variable, we can provide the full path to the qmake tool.

$ /usr/local/qt4/bin/qmake -project
$ /usr/local/qt4/bin/qmake
$ make

![simple.png](images/simple.png)

Figure: Simple example

Installation finished OK.

This chapter was an introduction to the Qt4 library.

[Contents](..)
[Next](../utilityclasses/)