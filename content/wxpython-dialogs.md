+++
title = "wxPython dialogs"
date = 2025-08-29T20:15:52.302+01:00
draft = false
description = "In this part of the wxPython tutorial we cover dialogs. We work with message boxes, predefined dialogs, and create a custom dialog."
image = "images/messagebox.png"
imageBig = "images/messagebox.png"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../events/)
[Next](../widgets/)

# wxPython dialogs

last modified January 10, 2023

Dialog windows or dialogs are an indispensable part of most modern GUI 
applications. A dialog is defined as a conversation between two or more persons. 
In a computer application a dialog is a window which is used to "talk" to the 
application. A dialog is used to input data, modify data, change the application 
settings etc. Dialogs are important means of communication between a user and a 
computer program. 

We can use predefined dialogs such as message boxes, font or color dialogs, or 
create our custom dialogs.

## A Simple message box

A message box provides short information to the user. A good 
example is a CD burning application. When a CD is finished burning,
a message box pops up.

message_box.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This example shows a simple
message box.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kwargs):
        super(Example, self).__init__(*args, **kwargs)

        self.InitUI()

    def InitUI(self):

        wx.CallLater(3000, self.ShowMessage)

        self.SetSize((300, 200))
        self.SetTitle('Message box')
        self.Centre()

    def ShowMessage(self):
        wx.MessageBox('Download completed', 'Info',
            wx.OK | wx.ICON_INFORMATION)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

This example shows a message box after three seconds.

wx.CallLater(3000, self.ShowMessage)

wx.CallLater calls a method after three seconds. The first 
parameter is a time value after which a given method is called. The parameter 
is in milliseconds. The second parameter is a method to be called.

def ShowMessage(self):
    wx.MessageBox('Download completed', 'Info', 
        wx.OK | wx.ICON_INFORMATION)

wx.MessageBox shows a small dialog window. We provide three parameters: 
the text message, the title message, and the flags. The flags are used to 
show different buttons and icons. In our case we show an OK button and Information
icon.

![messagebox.png](images/messagebox.png)

Figure: A Message box

## Predefined dialogs

wxPython has several predefined dialogs. These are dialogs for common 
programming tasks such as showing text, receiving input, loading 
and saving files. 

## Message dialogs

Message dialogs are used to show messages to the user. They are more flexible 
than simple message boxes that we saw in the previous example. They are 
customisable. We can change icons and buttons that will be shown in a dialog.

flag
meaning

wx.OKshow OK button

wx.CANCELshow Cancel button

wx.YES_NOshow Yes, No buttons

wx.YES_DEFAULTmake Yes button the default

wx.NO_DEFAULTmake No button the default

wx.ICON_EXCLAMATIONshow an alert icon

wx.ICON_ERRORshow an error icon

wx.ICON_HANDsame as wx.ICON_ERROR

wx.ICON_INFORMATIONshow an info icon

wx.ICON_QUESTIONshow a question icon

These are flags that can be used with wx.MessageDialog class.

message_dialogs.py
  

#!/usr/bin/env python

"""
ZetCode wxPython tutorial

This example shows four types of
message dialogs.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
"""

import wx

class Example(wx.Frame):

    def __init__(self, *args, **kwargs):
        super(Example, self).__init__(*args, **kwargs)

        self.InitUI()

    def InitUI(self):

        panel = wx.Panel(self)

        hbox = wx.BoxSizer()
        sizer = wx.GridSizer(2, 2, 2, 2)

        btn1 = wx.Button(panel, label='Info')
        btn2 = wx.Button(panel, label='Error')
        btn3 = wx.Button(panel, label='Question')
        btn4 = wx.Button(panel, label='Alert')

        sizer.AddMany([btn1, btn2, btn3, btn4])

        hbox.Add(sizer, 0, wx.ALL, 15)
        panel.SetSizer(hbox)

        btn1.Bind(wx.EVT_BUTTON, self.ShowMessage1)
        btn2.Bind(wx.EVT_BUTTON, self.ShowMessage2)
        btn3.Bind(wx.EVT_BUTTON, self.ShowMessage3)
        btn4.Bind(wx.EVT_BUTTON, self.ShowMessage4)

        self.SetSize((300, 200))
        self.SetTitle('Messages')
        self.Centre()

    def ShowMessage1(self, event):
        dial = wx.MessageDialog(None, 'Download completed', 'Info', wx.OK)
        dial.ShowModal()

    def ShowMessage2(self, event):
        dial = wx.MessageDialog(None, 'Error loading file', 'Error',
            wx.OK | wx.ICON_ERROR)
        dial.ShowModal()

    def ShowMessage3(self, event):
        dial = wx.MessageDialog(None, 'Are you sure to quit?', 'Question',
            wx.YES_NO | wx.NO_DEFAULT | wx.ICON_QUESTION)
        dial.ShowModal()

    def ShowMessage4(self, event):
        dial = wx.MessageDialog(None, 'Unallowed operation', 'Exclamation',
            wx.OK | wx.ICON_EXCLAMATION)
        dial.ShowModal()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In our example, we have created four buttons and put them in a grid sizer. 
These buttons will show four different dialog windows. We create them by 
specifying different style flags.

def ShowMessage2(self, event):
    dial = wx.MessageDialog(None, 'Error loading file', 'Error', 
        wx.OK | wx.ICON_ERROR)
    dial.ShowModal()

The creation of the message dialog is simple. We set the dialog to 
be a toplevel window by providing None as a parent. 
The two strings provide the message text and the dialog title. We 
show an OK button and an error icon by specifying the wx.OK and 
wx.ICON_ERROR flags. To show the dialog on screen, we 
call the ShowModal() method.

## About dialog box

Almost every application has a typical about dialog box. It is usually 
placed in the Help menu. The purpose of this dialog is to give the 
user the basic information about the name and the version of the 
application. In the past, these dialogs used to be quite brief. These 
days most of these boxes provide additional information about the authors. 
They give credits to additional programmers or documentation writers. They 
also provide information about the application license. These boxes can 
show the logo of the company or the application logo. 

In order to create an about dialog box we must create two objects. 
A wx.adv.AboutDialogInfo and a wx.adv.AboutBox. 

wxPython can display two kinds of About boxes. It depends on which platform 
we use and which methods we call. It can be a native dialog or a wxPython generic dialog. 
Windows native about dialog box cannot display custom icons, license text nor 
the URL's. If we omit these three fields, wxPython will show a native dialog. 
Otherwise it will resort to a generic one. It is advised to provide license information 
in a separate menu item if we want to stay as native as possible. 
GTK+ can show all these fields.  

about_dialog.py
  

#!/usr/bin/env python

'''
ZetCode wxPython tutorial

In this example, we create an
about dialog box.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
'''

import wx
import wx.adv

class Example(wx.Frame):

    def __init__(self, *args, **kwargs):
        super(Example, self).__init__(*args, **kwargs)

        self.InitUI()

    def InitUI(self):

        menubar = wx.MenuBar()
        help = wx.Menu()
        help.Append(wx.ID_ANY, '&amp;About')
        help.Bind(wx.EVT_MENU, self.OnAboutBox)

        menubar.Append(help, '&amp;Help')
        self.SetMenuBar(menubar)

        self.SetSize((350, 250))
        self.SetTitle('About dialog box')
        self.Centre()

    def OnAboutBox(self, e):

        description = """File Hunter is an advanced file manager for
the Unix operating system. Features include powerful built-in editor,
advanced search capabilities, powerful batch renaming, file comparison,
extensive archive handling and more.
"""

        licence = """File Hunter is free software; you can redistribute
it and/or modify it under the terms of the GNU General Public License as
published by the Free Software Foundation; either version 2 of the License,
or (at your option) any later version.

File Hunter is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the GNU General Public License for more details. You should have
received a copy of the GNU General Public License along with File Hunter;
if not, write to the Free Software Foundation, Inc., 59 Temple Place,
Suite 330, Boston, MA  02111-1307  USA"""

        info = wx.adv.AboutDialogInfo()

        info.SetIcon(wx.Icon('hunter.png', wx.BITMAP_TYPE_PNG))
        info.SetName('File Hunter')
        info.SetVersion('1.0')
        info.SetDescription(description)
        info.SetCopyright('(C) 2007 - 2024 Jan Bodnar')
        info.SetWebSite('http://www.zetcode.com')
        info.SetLicence(licence)
        info.AddDeveloper('Jan Bodnar')
        info.AddDocWriter('Jan Bodnar')
        info.AddArtist('The Tango crew')
        info.AddTranslator('Jan Bodnar')

        wx.adv.AboutBox(info)

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

The example has an about menu item. After selecting the
item, the about box is displayed. 

        description = """File Hunter is an advanced file manager for 
the Unix operating system. Features include powerful built-in editor, 
advanced search capabilities, powerful batch renaming, file comparison, 
extensive archive handling and more.
"""

It is not the best idea to put too much text into the code of the application. 
We did not want to make the example too complex, so we put all the text 
into the code. But in real world programs, the text should be placed 
separately inside a file. It helps us with the maintenace of our application.
For example, if we want to translate our application to other languages. 

info = wx.adv.AboutDialogInfo()

The first thing to do is to create a wx.AboutDialogInfo object. 
The constructor is empty. It does not taky 
any parameters. 

info.SetIcon(wx.Icon('hunter.png', wx.BITMAP_TYPE_PNG))
info.SetName('File Hunter')
info.SetVersion('1.0')
info.SetDescription(description)
info.SetCopyright('(C) 2007  - 2020 Jan Bodnar')
info.SetCopyright('(C) 2007  - 2020 Jan Bodnar')
info.SetWebSite('http://www.zetcode.com')
info.SetLicence(licence)
info.AddDeveloper('Jan Bodnar')
info.AddDocWriter('Jan Bodnar')
info.AddArtist('The Tango crew')
info.AddTranslator('Jan Bodnar')

The next thing to do is to call all necessary methods upon 
the created wx.AboutDialogInfo object. 

wx.adv.AboutBox(info)

In the end we create a wx.adv.AboutBox widget. The only 
parameter it takes is the wx.adv.AboutDialogInfo object. 

![hunter.png](images/hunter.png)

Figure: About dialog box

## A custom dialog

In the next example we create a custom dialog. An image editing application 
can change a colour depth of a picture. 
To provide this funcionality, we could create a suitable dialog. 

custom_dialog.py
  

#!/usr/bin/env python

'''
ZetCode wxPython tutorial

In this code example, we create a
custom dialog.

author: Jan Bodnar
website: www.zetcode.com
last modified: July 2020
'''

import wx

class ChangeDepthDialog(wx.Dialog):

    def __init__(self, *args, **kw):
        super(ChangeDepthDialog, self).__init__(*args, **kw)

        self.InitUI()
        self.SetSize((250, 200))
        self.SetTitle("Change Color Depth")

    def InitUI(self):

        pnl = wx.Panel(self)
        vbox = wx.BoxSizer(wx.VERTICAL)

        sb = wx.StaticBox(pnl, label='Colors')
        sbs = wx.StaticBoxSizer(sb, orient=wx.VERTICAL)
        sbs.Add(wx.RadioButton(pnl, label='256 Colors',
            style=wx.RB_GROUP))
        sbs.Add(wx.RadioButton(pnl, label='16 Colors'))
        sbs.Add(wx.RadioButton(pnl, label='2 Colors'))

        hbox1 = wx.BoxSizer(wx.HORIZONTAL)
        hbox1.Add(wx.RadioButton(pnl, label='Custom'))
        hbox1.Add(wx.TextCtrl(pnl), flag=wx.LEFT, border=5)
        sbs.Add(hbox1)

        pnl.SetSizer(sbs)

        hbox2 = wx.BoxSizer(wx.HORIZONTAL)
        okButton = wx.Button(self, label='Ok')
        closeButton = wx.Button(self, label='Close')
        hbox2.Add(okButton)
        hbox2.Add(closeButton, flag=wx.LEFT, border=5)

        vbox.Add(pnl, proportion=1,
            flag=wx.ALL|wx.EXPAND, border=5)
        vbox.Add(hbox2, flag=wx.ALIGN_CENTER|wx.TOP|wx.BOTTOM, border=10)

        self.SetSizer(vbox)

        okButton.Bind(wx.EVT_BUTTON, self.OnClose)
        closeButton.Bind(wx.EVT_BUTTON, self.OnClose)

    def OnClose(self, e):

        self.Destroy()

class Example(wx.Frame):

    def __init__(self, *args, **kw):
        super(Example, self).__init__(*args, **kw)

        self.InitUI()

    def InitUI(self):

        tb = self.CreateToolBar()
        tb.AddTool(toolId=wx.ID_ANY, label='', bitmap=wx.Bitmap('color.png'))

        tb.Realize()

        tb.Bind(wx.EVT_TOOL, self.OnChangeDepth)

        self.SetSize((350, 250))
        self.SetTitle('Custom dialog')
        self.Centre()

    def OnChangeDepth(self, e):

        cdDialog = ChangeDepthDialog(None,
            title='Change Color Depth')
        cdDialog.ShowModal()
        cdDialog.Destroy()

def main():

    app = wx.App()
    ex = Example(None)
    ex.Show()
    app.MainLoop()

if __name__ == '__main__':
    main()

In the above example, we have created a custom dialog.

class ChangeDepthDialog(wx.Dialog):
    
    def __init__(self, *args, **kw):
        super(ChangeDepthDialog, self).__init__(*args, **kw) 

In our code example we create a custom ChangeDepthDialog dialog. 
We inherit from a wx.Dialog widget.

def OnChangeDepth(self, e):

    cdDialog = ChangeDepthDialog(None,
        title='Change Color Depth')
    cdDialog.ShowModal()
    cdDialog.Destroy()

We instantiate a ChangeDepthDialog class. Then we call the 
ShowModal() method. Later, we must destroy our dialog with 
Destroy() Notice the visual difference between the dialog and 
the top level window. The dialog in the following figure 
has been activated. We cannot work with the toplevel window until 
the dialog is destroyed. There is a clear difference in the titlebar 
of the windows.

![customdialog.png](images/customdialog.png)

 
Figure: A custom dialog

In this chapter, we have covered dialogs. 

[Contents](..)
[Previous](../events/)
[Next](../widgets/)