+++
title = "Application skeletons in wxPython"
date = 2025-08-29T20:15:57.544+01:00
draft = false
description = "In this part of the wxPython tutorial, we create application skeletons."
image = "images/filehunter.png"
imageBig = "images/filehunter.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../customwidgets/)
[Next](../thetetrisgame/)

# Application skeletons in wxPython

last modified January 10, 2023

In this section, we will create some application skeletons. Our scripts will 
work out the interface but will not implement the functionality. The goal is 
to show, how several well known GUI interfaces could be done in wxPython.

## File Manager

File Hunter is a skeleton of a file manager. It copies the lookout of the 
Krusader, a file manager available on Unix systems. If we double 
click on the splitter widget, it will divide the File Hunter into two parts 
with the same width. The same happens if we resize the main window.

file_hunter.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program creates a skeleton
of a file manager UI.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx
import os
import time

ID_BUTTON=100
ID_EXIT=200
ID_SPLITTER=300

class MyListCtrl(wx.ListCtrl):

    def __init__(self, parent):
        wx.ListCtrl.__init__(self, parent, style=wx.LC_REPORT)

        images = ['images/empty.png', 'images/folder.png', 'images/source-py.png',
		      'images/image.png', 'images/pdf.png', 'images/up16.png']

        self.InsertColumn(0, 'Name')
        self.InsertColumn(1, 'Ext')
        self.InsertColumn(2, 'Size', wx.LIST_FORMAT_RIGHT)
        self.InsertColumn(3, 'Modified')

        self.SetColumnWidth(0, 220)
        self.SetColumnWidth(1, 70)
        self.SetColumnWidth(2, 100)
        self.SetColumnWidth(3, 420)

        self.il = wx.ImageList(16, 16)

        for i in images:

            self.il.Add(wx.Bitmap(i))

        self.SetImageList(self.il, wx.IMAGE_LIST_SMALL)

        j = 1

        self.InsertItem(0, '..')
        self.SetItemImage(0, 5)

        files = os.listdir('.')

        for i in files:

            (name, ext) = os.path.splitext(i)
            ex = ext[1:]
            size = os.path.getsize(i)
            sec = os.path.getmtime(i)

            self.InsertItem(j, name)
            self.SetItem(j, 1, ex)
            self.SetItem(j, 2, str(size) + ' B')
            self.SetItem(j, 3, time.strftime('%Y-%m-%d %H:%M', time.localtime(sec)))

            if os.path.isdir(i):
                self.SetItemImage(j, 1)
            elif ex == 'py':
                self.SetItemImage(j, 2)
            elif ex == 'jpg':
                self.SetItemImage(j, 3)
            elif ex == 'pdf':
                self.SetItemImage(j, 4)
            else:
                self.SetItemImage(j, 0)

            if (j % 2) == 0:

                self.SetItemBackgroundColour(j, '#e6f1f5')

            j = j + 1

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.splitter = wx.SplitterWindow(self, ID_SPLITTER, style=wx.SP_BORDER)
        self.splitter.SetMinimumPaneSize(50)

        p1 = MyListCtrl(self.splitter)
        p2 = MyListCtrl(self.splitter)
        self.splitter.SplitVertically(p1, p2)

        self.Bind(wx.EVT_SIZE, self.OnSize)
        self.Bind(wx.EVT_SPLITTER_DCLICK, self.OnDoubleClick, id=ID_SPLITTER)

        filemenu= wx.Menu()
        filemenu.Append(ID_EXIT, "E&amp;xit"," Terminate the program")
        editmenu = wx.Menu()
        netmenu = wx.Menu()
        showmenu = wx.Menu()
        configmenu = wx.Menu()
        helpmenu = wx.Menu()

        menuBar = wx.MenuBar()
        menuBar.Append(filemenu, "&amp;File")
        menuBar.Append(editmenu, "&amp;Edit")
        menuBar.Append(netmenu, "&amp;Net")
        menuBar.Append(showmenu, "&amp;Show")
        menuBar.Append(configmenu, "&amp;Config")
        menuBar.Append(helpmenu, "&amp;Help")
        self.SetMenuBar(menuBar)
        self.Bind(wx.EVT_MENU, self.OnExit, id=ID_EXIT)

        tb = self.CreateToolBar( wx.TB_HORIZONTAL | wx.NO_BORDER |
		      wx.TB_FLAT)

        tb.AddTool(10, 'Previous', wx.Bitmap('images/previous.png'), shortHelp='Previous')
        tb.AddTool(20, 'Up', wx.Bitmap('images/up.png'), shortHelp='Up one directory')
        tb.AddTool(30, 'Home', wx.Bitmap('images/home.png'), shortHelp='Home')
        tb.AddTool(40, 'Refresh', wx.Bitmap('images/refresh.png'), shortHelp='Refresh')
        tb.AddSeparator()
        tb.AddTool(50, 'Edit text', wx.Bitmap('images/textedit.png'), shortHelp='Edit text')
        tb.AddTool(60, 'Terminal', wx.Bitmap('images/terminal.png'), shortHelp='Terminal')
        tb.AddSeparator()
        tb.AddTool(70, 'Help', wx.Bitmap('images/help.png'), shortHelp='Show help')
        tb.Realize()

        self.sizer2 = wx.BoxSizer(wx.HORIZONTAL)

        button1 = wx.Button(self, ID_BUTTON + 1, "F3 View")
        button2 = wx.Button(self, ID_BUTTON + 2, "F4 Edit")
        button3 = wx.Button(self, ID_BUTTON + 3, "F5 Copy")
        button4 = wx.Button(self, ID_BUTTON + 4, "F6 Move")
        button5 = wx.Button(self, ID_BUTTON + 5, "F7 Mkdir")
        button6 = wx.Button(self, ID_BUTTON + 6, "F8 Delete")
        button7 = wx.Button(self, ID_BUTTON + 7, "F9 Rename")
        button8 = wx.Button(self, ID_EXIT, "F10 Quit")

        self.sizer2.Add(button1, 1, wx.EXPAND)
        self.sizer2.Add(button2, 1, wx.EXPAND)
        self.sizer2.Add(button3, 1, wx.EXPAND)
        self.sizer2.Add(button4, 1, wx.EXPAND)
        self.sizer2.Add(button5, 1, wx.EXPAND)
        self.sizer2.Add(button6, 1, wx.EXPAND)
        self.sizer2.Add(button7, 1, wx.EXPAND)
        self.sizer2.Add(button8, 1, wx.EXPAND)

        self.Bind(wx.EVT_BUTTON, self.OnExit, id=ID_EXIT)

        self.sizer = wx.BoxSizer(wx.VERTICAL)
        self.sizer.Add(self.splitter,1,wx.EXPAND)
        self.sizer.Add(self.sizer2,0,wx.EXPAND)
        self.SetSizer(self.sizer)

        # size = wx.DisplaySize()
        # self.SetSize(size)

        sb = self.CreateStatusBar()
        sb.SetStatusText(os.getcwd())

        self.SetTitle("File Hunter")
        self.Center()

    def OnExit(self, e):

        self.Close(True)

    def OnSize(self, e):

        size = self.GetSize()
        self.splitter.SetSashPosition(size.x / 2)

        e.Skip()

    def OnDoubleClick(self, e):

        size =  self.GetSize()
        self.splitter.SetSashPosition(size.x / 2)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

The example creates a UI of a two-panel file manager.     

class MyListCtrl(wx.ListCtrl):

    def __init__(self, parent):
        wx.ListCtrl.__init__(self, parent, style=wx.LC_REPORT)

The main area of the application is occupied by the wx.ListCtrl
widget.

self.il = wx.ImageList(16, 16)

for i in images:

    self.il.Add(wx.Bitmap(i))

self.SetImageList(self.il, wx.IMAGE_LIST_SMALL)

The list control contains a list image, which is used to indicate the file type.

files = os.listdir('.')

for i in files:

    (name, ext) = os.path.splitext(i)
    ex = ext[1:]
    size = os.path.getsize(i)
    sec = os.path.getmtime(i)
    ...

We get the contents of the current working directory, and determine the 
file extensions, size and the last modification time.

if os.path.isdir(i):
    self.SetItemImage(j, 1)
elif ex == 'py':
    self.SetItemImage(j, 2)
elif ex == 'jpg':
    self.SetItemImage(j, 3)
elif ex == 'pdf':
    self.SetItemImage(j, 4)
else:
    self.SetItemImage(j, 0)

An image for the file is chosen depending on the file extension.

self.splitter = wx.SplitterWindow(self, ID_SPLITTER, style=wx.SP_BORDER)
self.splitter.SetMinimumPaneSize(50)

p1 = MyListCtrl(self.splitter)
p2 = MyListCtrl(self.splitter)
self.splitter.SplitVertically(p1, p2)

We have two list controls divided vertically by a splitter widget.

menuBar = wx.MenuBar()
menuBar.Append(filemenu, "&amp;File")
menuBar.Append(editmenu, "&amp;Edit")
...

We have a menubar.

tb = self.CreateToolBar( wx.TB_HORIZONTAL | wx.NO_BORDER |
      wx.TB_FLAT)

tb.AddTool(10, 'Previous', wx.Bitmap('images/previous.png'), shortHelp='Previous')
tb.AddTool(20, 'Up', wx.Bitmap('images/up.png'), shortHelp='Up one directory')
...

We have a toolbar.

self.sizer2 = wx.BoxSizer(wx.HORIZONTAL)

button1 = wx.Button(self, ID_BUTTON + 1, "F3 View")
button2 = wx.Button(self, ID_BUTTON + 2, "F4 Edit")
button3 = wx.Button(self, ID_BUTTON + 3, "F5 Copy")
button4 = wx.Button(self, ID_BUTTON + 4, "F6 Move")
...

Eight buttons are placed in a horizontal sizer, which is added to the bottom
of the window.

![filehunter.png](images/filehunter.png)

Figure: File manager

## SpreadSheet

The following example creates a UI of a spreadsheet application.

spreadsheet.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program creates a SpreadSheet UI.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

from wx.lib import sheet
import wx

class MySheet(wx.grid.Grid):

    def __init__(self, *args, **kw):
        super(MySheet, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        nOfRows = 55
        nOfCols = 25

        self.row = self.col = 0
        self.CreateGrid(nOfRows, nOfCols)

        self.SetColLabelSize(20)
        self.SetRowLabelSize(50)

        self.Bind(wx.grid.EVT_GRID_SELECT_CELL, self.OnGridSelectCell)

        for i in range(nOfRows):
            self.SetRowSize(i, 20)

        for i in range(nOfCols):
            self.SetColSize(i, 75)

    def OnGridSelectCell(self, e):

        self.row, self.col = e.GetRow(), e.GetCol()

        control = self.GetParent().GetParent().position
        value =  self.GetColLabelValue(self.col) + self.GetRowLabelValue(self.row)
        control.SetValue(value)

        e.Skip()

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        fonts = ['Times New Roman', 'Times', 'Courier', 'Courier New', 'Helvetica',
                'Sans', 'verdana', 'utkal', 'aakar', 'Arial']
        font_sizes = ['10', '11', '12', '14', '16']

        box = wx.BoxSizer(wx.VERTICAL)
        menuBar = wx.MenuBar()

        menu1 = wx.Menu()
        menuBar.Append(menu1, '&amp;File')
        menu2 = wx.Menu()
        menuBar.Append(menu2, '&amp;Edit')
        menu3 = wx.Menu()
        menuBar.Append(menu3, '&amp;Edit')
        menu4 = wx.Menu()
        menuBar.Append(menu4, '&amp;Insert')
        menu5 = wx.Menu()
        menuBar.Append(menu5, 'F&amp;ormat')
        menu6 = wx.Menu()
        menuBar.Append(menu6, '&amp;Tools')
        menu7 = wx.Menu()
        menuBar.Append(menu7, '&amp;Data')
        menu8 = wx.Menu()
        menuBar.Append(menu8, '&amp;Help')

        self.SetMenuBar(menuBar)

        toolbar1 = wx.ToolBar(self, style= wx.TB_HORIZONTAL)

        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/new.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/open.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/save.png'))

        toolbar1.AddSeparator()

        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/cut.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/copy.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/paste.png'))
        toolbar1.AddTool(wx.ID_ANY, '',  wx.Bitmap('images/delete.png'))

        toolbar1.AddSeparator()

        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/undo.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/redo.png'))

        toolbar1.AddSeparator()

        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/asc.png'))
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/desc.png'))

        toolbar1.AddSeparator()
        toolbar1.AddTool(wx.ID_ANY, '', wx.Bitmap('images/chart.png'))

        toolbar1.AddSeparator()
        toolbar1.AddTool(wx.ID_ANY, '',  wx.Bitmap('images/exit.png'))

        toolbar1.Realize()

        toolbar2 = wx.ToolBar(self, wx.TB_HORIZONTAL | wx.TB_TEXT)

        self.position = wx.TextCtrl(toolbar2)

        font = wx.ComboBox(toolbar2, value='Times', choices=fonts, size=(100, -1),
                style=wx.CB_DROPDOWN)

        font_height = wx.ComboBox(toolbar2, value='10', choices=font_sizes,
                size=(50, -1), style=wx.CB_DROPDOWN)

        toolbar2.AddControl(self.position)
        toolbar2.AddControl(font)
        toolbar2.AddControl(font_height)

        toolbar2.AddSeparator()

        toolbar2.AddCheckTool(wx.ID_ANY, '', wx.Bitmap('images/text-bold.png'))
        toolbar2.AddCheckTool(wx.ID_ANY, '', wx.Bitmap('images/text-italic.png'))
        toolbar2.AddCheckTool(wx.ID_ANY, '', wx.Bitmap('images/text-underline.png'))

        toolbar2.AddSeparator()

        toolbar2.AddTool(wx.ID_ANY, '', wx.Bitmap('images/align-left.png'))
        toolbar2.AddTool(wx.ID_ANY, '', wx.Bitmap('images/align-center.png'))
        toolbar2.AddTool(wx.ID_ANY, '', wx.Bitmap('images/align-right.png'))

        box.Add(toolbar1, border=5)
        box.Add((5,5) , 0)
        box.Add(toolbar2)
        box.Add((5,10) , 0)

        toolbar2.Realize()
        self.SetSizer(box)

        notebook = wx.Notebook(self, style=wx.RIGHT)

        sheet1 = MySheet(notebook)
        sheet2 = MySheet(notebook)
        sheet3 = MySheet(notebook)
        sheet1.SetFocus()

        notebook.AddPage(sheet1, 'Sheet1')
        notebook.AddPage(sheet2, 'Sheet2')
        notebook.AddPage(sheet3, 'Sheet3')

        box.Add(notebook, 1, wx.EXPAND)

        self.CreateStatusBar()

        self.SetSize((550, 550))
        self.SetTitle("SpreadSheet")
        self.Centre()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

The code example creates a UI of a SpreadSheet application. I has a menubar, 
toolbars, and a central grid widget.

class MySheet(wx.grid.Grid):

    def __init__(self, *args, **kw):
        super(MySheet, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        nOfRows = 55
        nOfCols = 25

        self.row = self.col = 0
        self.CreateGrid(nOfRows, nOfCols)
        ...

We create a customized wx.grid.Grid widget. Each of our sheets will
have fifty five rows and twenty five columns. A grid of cells is created with
the CreateGrid() method.

control = self.GetParent().GetParent().position

The position text control shows the selected cell of the grid widget. It is 
the first widget of the second toolbar. Being inside a MySheet class, 
we need to get a reference to the text control, which is defined in the 
Example class. MySheet is a child of the notebook. 
And notebook is a child of Example. So we manage to get to 
the position text control by calling the GetParent() method twice. 

notebook = wx.Notebook(self, style=wx.RIGHT)

sheet1 = MySheet(notebook)
sheet2 = MySheet(notebook)
sheet3 = MySheet(notebook)
sheet1.SetFocus()

notebook.AddPage(sheet1, 'Sheet1')
notebook.AddPage(sheet2, 'Sheet2')
notebook.AddPage(sheet3, 'Sheet3')

Three sheets are created and placed into the notebook widget.

![spreadsheet.png](images/spreadsheet.png)

Figure: Spreadsheet

## Player

The following example is a skeleton of a typical video player.

player.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program creates a Player UI.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.CreateMenuBar()

        panel = wx.Panel(self)

        pnl1 = wx.Panel(self)
        pnl1.SetBackgroundColour(wx.BLACK)
        pnl2 = wx.Panel(self)

        slider1 = wx.Slider(pnl2, value=18, minValue=0, maxValue=1000)
        pause = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/pause.png'))
        play  = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/play.png'))
        forw  = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/forw.png'))
        back  = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/back.png'))
        vol = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/volume.png'))
        slider2 = wx.Slider(pnl2, value=1, minValue=0, maxValue=100,
            size=(120, -1))

        vbox = wx.BoxSizer(wx.VERTICAL)
        hbox1 = wx.BoxSizer(wx.HORIZONTAL)
        hbox2 = wx.BoxSizer(wx.HORIZONTAL)

        hbox1.Add(slider1, proportion=1)
        hbox2.Add(pause)
        hbox2.Add(play, flag=wx.RIGHT, border=5)
        hbox2.Add(forw, flag=wx.LEFT, border=5)
        hbox2.Add(back)
        hbox2.Add((-1, -1), proportion=1)
        hbox2.Add(vol)
        hbox2.Add(slider2, flag=wx.TOP|wx.LEFT, border=5)

        vbox.Add(hbox1, flag=wx.EXPAND|wx.BOTTOM, border=10)
        vbox.Add(hbox2, proportion=1, flag=wx.EXPAND)
        pnl2.SetSizer(vbox)

        sizer = wx.BoxSizer(wx.VERTICAL)
        sizer.Add(pnl1, proportion=1, flag=wx.EXPAND)
        sizer.Add(pnl2, flag=wx.EXPAND|wx.BOTTOM|wx.TOP, border=10)

        self.SetMinSize((350, 300))
        self.CreateStatusBar()
        self.SetSizer(sizer)

        self.SetSize((350, 200))
        self.SetTitle('Player')
        self.Centre()

    def CreateMenuBar(self):

        menubar = wx.MenuBar()
        filem = wx.Menu()
        play = wx.Menu()
        view = wx.Menu()
        tools = wx.Menu()
        favorites = wx.Menu()
        help = wx.Menu()

        filem.Append(wx.ID_ANY, '&amp;Quit', 'Quit application')

        menubar.Append(filem, '&amp;File')
        menubar.Append(play, '&amp;Play')
        menubar.Append(view, '&amp;View')
        menubar.Append(tools, '&amp;Tools')
        menubar.Append(favorites, 'F&amp;avorites')
        menubar.Append(help, '&amp;Help')

        self.SetMenuBar(menubar)
        

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()  

To build the interface, we have used bitmap buttons, sliders, panels, 
and a menubar. 

pnl1 = wx.Panel(self)
pnl1.SetBackgroundColour(wx.BLACK)

The main area of the application is occupied by a panel with a black background. 

slider1 = wx.Slider(pnl2, value=18, minValue=0, maxValue=1000)

The wx.Slider is used to show the progress of the film. 

pause = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/pause.png'))
play  = wx.BitmapButton(pnl2, bitmap=wx.Bitmap('images/play.png'))

Bitmap buttons are used for control buttons. 

self.SetMinSize((350, 300))

Here we set the minimum size of the player. It does not
make much sense to shrink the window below some value.

![player.png](images/player.png)

Figure: Player

## Browser

In the following example,we mimic the look of a classic browser UI.

browser.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This program creates a browser UI.

author: Jan Bodnar
website: zetcode.com
last edited: May 2018
"""

import wx
from wx.lib.buttons import GenBitmapTextButton

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        self.CreateMenuBar()

        panel = wx.Panel(self)
        # panel.SetBackgroundColour('white')

        vbox = wx.BoxSizer(wx.VERTICAL)
        hbox1 = wx.BoxSizer(wx.HORIZONTAL)
        hbox2 = wx.BoxSizer(wx.HORIZONTAL)

        line1 = wx.StaticLine(panel)
        vbox.Add(line1, 0, wx.EXPAND)

        toolbar1 = wx.Panel(panel, size=(-1, 30))

        back = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/back.png'),
                style=wx.NO_BORDER)
        forward = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/forw.png'),
                style=wx.NO_BORDER)
        refresh = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/refresh.png'),
                style=wx.NO_BORDER)
        stop = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/stop.png'),
                style=wx.NO_BORDER)
        home = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/home.png'),
                style=wx.NO_BORDER)
        address = wx.ComboBox(toolbar1, size=(50, -1))
        go = wx.BitmapButton(toolbar1, bitmap=wx.Bitmap('images/play.png'),
                style=wx.NO_BORDER)
        text = wx.TextCtrl(toolbar1, size=(150, -1))

        hbox1.Add(back)
        hbox1.Add(forward)
        hbox1.Add(refresh)
        hbox1.Add(stop)
        hbox1.Add(home)
        hbox1.Add(address, 1, wx.TOP, 3)
        hbox1.Add(go, 0, wx.TOP | wx.LEFT, 3)
        hbox1.Add(text, 0, wx.TOP | wx.RIGHT, 3)

        toolbar1.SetSizer(hbox1)
        vbox.Add(toolbar1, 0, wx.EXPAND)
        line = wx.StaticLine(panel)
        vbox.Add(line, 0, wx.EXPAND)

        toolbar2 = wx.Panel(panel, size=(-1, 30))
        bookmark1 = wx.BitmapButton(toolbar2, bitmap=wx.Bitmap('images/love.png'),
                style=wx.NO_BORDER)
        bookmark2 = wx.BitmapButton(toolbar2, bitmap=wx.Bitmap('images/book.png'),
                style=wx.NO_BORDER)
        bookmark3 = wx.BitmapButton(toolbar2, bitmap=wx.Bitmap('images/sound.png'),
                style=wx.NO_BORDER)

        hbox2.Add(bookmark1, flag=wx.RIGHT, border=5)
        hbox2.Add(bookmark2, flag=wx.RIGHT, border=5)
        hbox2.Add(bookmark3)

        toolbar2.SetSizer(hbox2)
        vbox.Add(toolbar2, 0, wx.EXPAND)

        line2 = wx.StaticLine(panel)
        vbox.Add(line2, 0, wx.EXPAND)

        panel.SetSizer(vbox)

        self.CreateStatusBar()

        self.SetTitle("Browser")
        self.Centre()

    def CreateMenuBar(self):

        menubar = wx.MenuBar()
        file = wx.Menu()
        file.Append(wx.ID_ANY, '&amp;Quit', '')
        edit = wx.Menu()
        view = wx.Menu()
        go = wx.Menu()
        bookmarks = wx.Menu()
        tools = wx.Menu()
        help = wx.Menu()

        menubar.Append(file, '&amp;File')
        menubar.Append(edit, '&amp;Edit')
        menubar.Append(view, '&amp;View')
        menubar.Append(go, '&amp;Go')
        menubar.Append(bookmarks, '&amp;Bookmarks')
        menubar.Append(tools, '&amp;Tools')
        menubar.Append(help, '&amp;Help')

        self.SetMenuBar(menubar)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In order to create a sizeable combo box we cannot use a wx.Toolbar. 
We create our custom toolbars based on a wx.Panel.

toolbar1 = wx.Panel(panel, size=(-1, 40))

We create a plain wx.Panel.

hbox1 = wx.BoxSizer(wx.HORIZONTAL)
...
hbox1.Add(back)
hbox1.Add(forward)
hbox1.Add(refresh)

We create a horizontal sizer and add all necessary buttons.

hbox1.Add(address, 1, wx.TOP, 4)

Then we add the combo box to the sizer. This kind of combo box is usually 
called an address bar. Notice that it is the only
widget that has the proportion set to 1. This was necessary to make it 
resizable. 

line2 = wx.StaticLine(panel)
vbox.Add(line2, 0, wx.EXPAND)

The toolbars are separated by a line. 

![browser.png](images/browser.png)

Figure: Browser UI

In this part of the wxPython tutorial we have created some application skeletons.

 

[Contents](..)
[Previous](../customwidgets/)
[Next](../thetetrisgame/)