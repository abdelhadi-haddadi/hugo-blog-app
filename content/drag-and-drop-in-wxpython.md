+++
title = "Drag and drop in wxPython"
date = 2025-08-29T20:15:52.170+01:00
draft = false
description = "This part of the wxPython tutorial covers drag and drop operations in wxPython."
image = ""
imageBig = ""
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../advanced/)
[Next](../gdi/)

# Drag and drop in wxPython

last modified January 10, 2023

In computer graphical user interfaces, drag-and-drop is the action 
of (or support for the action of) clicking on a virtual object and 
dragging it to a different location or onto another virtual object. 
In general, it can be used to invoke many kinds of actions, or create 
various types of associations between two abstract objects. 

Drag and drop operation enables you to do complex things intuitively. 

In drag and drop operations we drag some data from a data source to a data target. 
So we must have:

	- Some data

	- A data source

	- A data target

In wxPython we have two predefined data targets: wx.TextDropTarget 
and wx.FileDropTarget.

## wx.TextDropTarget

wx.TextDropTarget is a predefined drop target for dealing with 
text data.    

dragdrop_text.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

In this example, we drag and drop text data.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
"""

from pathlib import Path
import os
import wx

class MyTextDropTarget(wx.TextDropTarget):

    def __init__(self, object):

        wx.TextDropTarget.__init__(self)
        self.object = object

    def OnDropText(self, x, y, data):

        self.object.InsertItem(0, data)
        return True

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        splitter1 = wx.SplitterWindow(self, style=wx.SP_3D)
        splitter2 = wx.SplitterWindow(splitter1, style=wx.SP_3D)

        home_dir = str(Path.home())

        self.dirWid = wx.GenericDirCtrl(splitter1, dir=home_dir, 
                style=wx.DIRCTRL_DIR_ONLY)
                
        self.lc1 = wx.ListCtrl(splitter2, style=wx.LC_LIST)
        self.lc2 = wx.ListCtrl(splitter2, style=wx.LC_LIST)

        dt = MyTextDropTarget(self.lc2)
        self.lc2.SetDropTarget(dt)
        
        self.Bind(wx.EVT_LIST_BEGIN_DRAG, self.OnDragInit, id=self.lc1.GetId())

        tree = self.dirWid.GetTreeCtrl()

        splitter2.SplitHorizontally(self.lc1, self.lc2, 150)
        splitter1.SplitVertically(self.dirWid, splitter2, 200)

        self.Bind(wx.EVT_TREE_SEL_CHANGED, self.OnSelect, id=tree.GetId())

        self.OnSelect(0)

        self.SetTitle('Drag and drop text')
        self.Centre()

    def OnSelect(self, event):

        list = os.listdir(self.dirWid.GetPath())

        self.lc1.ClearAll()
        self.lc2.ClearAll()

        for i in range(len(list)):

            if list[i][0] != '.':
                self.lc1.InsertItem(0, list[i])

    def OnDragInit(self, event):

        text = self.lc1.GetItemText(event.GetIndex())
        tdo = wx.TextDataObject(text)
        tds = wx.DropSource(self.lc1)

        tds.SetData(tdo)
        tds.DoDragDrop(True)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In the example, we show a file system in a wx.GenericDirCtrl.
The contents of a selected directory are shown in the upper right list control.
The file names can be drag and dropped into the bottom-right list control.

def OnDropText(self, x, y, data):

    self.object.InsertItem(0, data)
    return True    

When we drop text data onto the target, the data is inserted into the list
control with InsertItem() method.

dt = MyTextDropTarget(self.lc2)
self.lc2.SetDropTarget(dt)  

A drop target is created. We set the drop target to the second list control
with SetDropTarget() method.

self.Bind(wx.EVT_LIST_BEGIN_DRAG, self.OnDragInit, id=self.lc1.GetId()) 

When the drag operation begins, the OnDragInit() method is invoked.

def OnDragInit(self, event):

    text = self.lc1.GetItemText(event.GetIndex())
    tdo = wx.TextDataObject(text)
    tds = wx.DropSource(self.lc1)
    ...

In the OnDragInit() method, we create a wx.TextDataObject,
which contains our text data. A drop source is created from the first list control.

tds.SetData(tdo)
tds.DoDragDrop(True)

We set data to the drop source with SetData() and initiate
the drag drop operation with DoDragDrop().

## wx.FileDropTarget

wx.FileDropTarget is a drop target which accepts files, which are
dragged from a file manager.

dragdrop_file.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

In this example, we drag and drop files.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
"""

import wx

class FileDrop(wx.FileDropTarget):

    def __init__(self, window):

        wx.FileDropTarget.__init__(self)
        self.window = window

    def OnDropFiles(self, x, y, filenames):

        for name in filenames:

            try:
                file = open(name, 'r')
                text = file.read()
                self.window.WriteText(text)

            except IOError as error:

                msg = "Error opening file\n {}".format(str(error))
                dlg = wx.MessageDialog(None, msg)
                dlg.ShowModal()

                return False

            except UnicodeDecodeError as error:

                msg = "Cannot open non ascii files\n {}".format(str(error))
                dlg = wx.MessageDialog(None, msg)
                dlg.ShowModal()

                return False

            finally:

                file.close()

        return True

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.text = wx.TextCtrl(self, style = wx.TE_MULTILINE)
        dt = FileDrop(self.text)

        self.text.SetDropTarget(dt)

        self.SetTitle('File drag and drop')
        self.Centre()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

The example creates a simple wx.TextCtrl.  We can drag text
files to the control from a file manager.

    
def OnDropFiles(self, x, y, filenames):

    for name in filenames:
    ...

We can drag and drop multiple file at once.

 
    
try:
    file = open(name, 'r')
    text = file.read()
    self.window.WriteText(text)

We open the file in the read-only mode, get its contents and write the contents
into the text control window.

 
    
except IOError as error:

    msg = "Error opening file\n {}".format(str(error))
    dlg = wx.MessageDialog(None, msg)
    dlg.ShowModal()

    return False

In case of an input/output error, we show a message dialog and terminate
the operation.

    

self.text = wx.TextCtrl(self, style = wx.TE_MULTILINE)
dt = FileDrop(self.text)

self.text.SetDropTarget(dt)

The wx.TextCtrl is the drop target.

    

In this chapter we worked with drag and drop operations in wxPython.

 
[Contents](..)
[Previous](../advanced/)
[Next](../gdi/)