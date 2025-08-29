+++
title = "Introduction to Qt5 toolkit"
date = 2025-08-29T19:57:28.531+01:00
draft = false
description = "This chapter is an introduction to the Qt5 toolkit; it shows how to install Qt."
image = "images/simple.png"
imageBig = "images/simple.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../strings/)

# Introduction to Qt5 toolkit

last modified October 18, 2023

In this part of the Qt5 tutorial, we introduce the Qt5 library.
We install the Qt5 library and create our first small Qt5 application.

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
page. (Since the download links have been changing often in the past, you might
need to google for the current link.) We choose the latest Qt 5.x sources. At
the time of the creation of this tutorial, the latest sources were Qt 5.5.1.
Next, we are going to install Qt from sources.

$ ls qt-everywhere-opensource-src-5.5.1.tar.gz 
qt-everywhere-opensource-src-5.5.1.tar.gz

From the download page, we download the Qt5 sources. We use the TAR file. (We save ourselves some
trouble. The ZIP file has Windows line endings.)

$ tar -xzvf qt-everywhere-opensource-src-5.5.1.tar.gz

The command will decompress all the files to a directory 
qt-everywhere-opensource-src-5.5.1/.

$ du -hs qt-everywhere-opensource-src-5.5.1
2.0G    qt-everywhere-opensource-src-5.5.1

The size of the directory is now 2 G.

$ cd qt-everywhere-opensource-src-5.5.1/

We go to the created directory. In the README file there are installation 
instructions. The installation is easy and straightforward, but
it takes considerable time.

## Installation from sources

Before we start building Qt5, we might want to install some additional libraries.
For instance, if we want to connect to MySQL from Qt, we need to have 
libmysqld-dev installed on our system.

We install the library the classic way. On Unix systems, installation of a 
software is divided into three steps.

- Configuration

- Building

- Installation

$ ./configure -prefix /usr/local/qt5
Which edition of Qt do you want to use ?

Type 'c' if you want to use the Commercial Edition.
Type 'o' if you want to use the Open Source Edition.

First we run the configure script. The script will ask whether
we want the commercial or open source edition of the Qt5 library.
The script will configure the library for our machine type. By default, 
the Qt will be installed in /usr/local/Qt-5.5.1/ directory. 
This can be changed by the -prefix parameter of the configure script. 
We install the library into the /usr/local/qt5/ directory. Note that the 
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

Running configuration tests...
The test for linking against libxcb and support libraries failed!
 You might need to install dependency packages, or pass -qt-xcb.

If the script fails with the above message, we either need to install
some additional xcb libraries, or run the script again with the 
-qt-xcb option.

$ ./configure -prefix /usr/local/qt5 -qt-xcb

With the -qt-xcb option, some libraries are built instead of 
being linked against the system libraries.

...
Qt modules and options:
  Qt D-Bus ............... yes (loading dbus-1 at runtime)
  Qt Concurrent .......... yes
  Qt GUI ................. yes
  Qt Widgets ............. yes
  Large File ............. yes
  QML debugging .......... yes
  Use system proxies ..... no
...
  SQL drivers: 
    DB2 .................. no
    InterBase ............ no
    MySQL ................ yes (plugin)
    OCI .................. no
    ODBC ................. no
    PostgreSQL ........... yes (plugin)
    SQLite 2 ............. no
    SQLite ............... yes (plugin, using bundled copy)
    TDS .................. no
  tslib .................. no
  udev ................... yes
  xkbcommon-x11........... yes (bundled copy, XKB config root: /usr/share/X11/xkb)
  xkbcommon-evdev......... yes
  zlib ................... yes (system library)

Qt is now configured for building. Just run 'make'.
Once everything is built, you must run 'make install'.
Qt will be installed into /usr/local/qt5

Prior to reconfiguration, make sure you remove any leftovers from
the previous build.

This is a partial output of the configure script. The output tells us 
what components are prepared to be built. For instance, SQL drivers for MySQL
and PostgreSQL are going to be created, but not for DB2 or InterBase.

$ make

We use the make command to start the build process.
The building of the Qt toolkit can take several hours; it depends on the 
power of your processor.

The last step is installing, or moving files to the directories.

$ sudo make install

This command finishes the installation process. The library is now installed 
in /usr/local/qt5/ directory. 

The last thing that we do is to add the Qt5 path to the PATH system variable.
The bash users need to edit the either the .profile file or
the .bashrc file.

$ PATH=/usr/local/qt5/bin:$PATH
$ export PATH

We have added a path to the bin directory of the Qt5 library to the 
PATH environment variable. The changes will be active after 
another login.

## Installation from packages

It is easier to install Qt from packages. Linux packages
usually do not contain the latest Qt version.

$ sudo apt-get install qt5-default

The above command installs Qt5 on Debian-based Linux. 

## Qt5 version example

Our first program prints the version of the Qt5 library.

version.cpp
  

#include &lt;QtCore&gt;
#include &lt;iostream&gt;

int main() {
    
    std::cout &lt;&lt; "Qt version: " &lt;&lt; qVersion() &lt;&lt; std::endl;
}

The qVersion function returns the version number of Qt at run-time
as a string.

$ g++ -o version version.cpp -I/usr/include/x86_64-linux-gnu/qt5/QtCore \
    -I/usr/include/x86_64-linux-gnu/qt5 -L/usr/lib/qt5 -lQt5Core -fPIC

The above command compiles the example. Note that your Qt5 library might
be installed in different location.

$ ./version 
Qt version: 5.14.2

The version of the Qt5 library used throughout this tutorial is 5.14.2.

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

This command creates a project file, which has a .pro extension.

simple.pro
  

######################################################################
# Automatically generated by qmake (3.1) Mon Nov 30 13:42:14 2020
######################################################################

TEMPLATE = app
TARGET = simple
INCLUDEPATH += .

# Input
SOURCES += simple.cpp

QT += widgets

The Qt Widgets module is not included in the project by default. Therefore, we
add the module at the end of the file.

$ qmake
$ make

We build the program with the above commands. The qmake creates
a Makefile and the make command builds the program.

If the Qt5 installation directory is not a part of the PATH 
variable, we can provide the full path to the qmake tool.

$ /usr/local/qt5/bin/qmake -project
$ /usr/local/qt5/bin/qmake
$ make

![simple.png](images/simple.png)

Figure: Simple example

This chapter was an introduction to the Qt5 library.

[Contents](..)
[Next](../strings/)