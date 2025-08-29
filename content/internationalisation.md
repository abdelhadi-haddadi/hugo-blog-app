+++
title = "Internationalisation"
date = 2025-08-29T20:15:55.836+01:00
draft = false
description = "This part of the wxPython tutorial covers internationalisation."
image = "images/unicode.jpg"
imageBig = "images/unicode.jpg"
categories = ["wxpython"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../draganddrop/)
[Next](../skeletons/)

# Internationalisation

last modified January 10, 2023

In computing, Internationalisation and localisation are means of 
adapting computer software for non-native environments, especially 
other nations and cultures. Internationalisation is the process of 
ensuring that an application is capable of adapting to local 
requirements, for instance ensuring that the local writing system 
can be displayed. Localisation is the process of adapting the software 
to be as familiar as possible to a specific locale, by displaying 
text in the local language and using local conventions for the 
display of such things as units of measurement. (wikipedia)

## Unicode

There are two builds of wxPython. The ANSI build and the Unicode build. 
If we want to create and use wxPython applications
in languages other than English, we must have the Unicode build.

*Unicode* is an industry standard allowing computers to consistently 
represent and manipulate text expressed in any of the world's writing systems. 
It is a character encoding standard which uses 16 bits for storing characters. 
The traditional *ASCII* encoding uses only 8 bits.

First, we need to get the Unicode encoding of Лев Николaевич Толстoй Анна Каренина words. 

&gt;&gt;&gt; unicode(u'Лев Николaевич Толстoй Анна Каренина')
u'\u041b\u0435\u0432 \u041d\u0438\u043aa\u0430\u0301\u0435\u0432\u0438\u0447
\u0422\u043e\u043b\u0441o\u0439 \u0410\u043d\u043d\u0430 
\u041a\u0430\u0440\u0435\u043d\u0438\u043d\u0430'

We launch the Python terminal and use the unicode() function call. 
Notice that in the example, we use additional \n\ characters to divide the 
words into two lines.

#!/usr/bin/python

import wx

text = u'\u041b\u0435\u0432 \u041d\u0438\u043a\u043e\u043b\u0430\
\u0435\u0432\u0438\u0447 \u0422\u043e\u043b\u0441\u0442\u043e\u0439 \n\
\u0410\u043d\u043d\u0430 \u041a\u0430\u0440\u0435\u043d\u0438\u043d\u0430'

class Unicode(wx.Frame):
    def __init__(self, parent, id, title):
        wx.Frame.__init__(self, parent, id, title, size=(250, 150))

        self.Bind(wx.EVT_PAINT, self.OnPaint)

        self.Centre()
        self.Show(True)

    def OnPaint(self, event):
        dc = wx.PaintDC(self)
        dc.DrawText(text, 50, 50)

app = wx.App()
Unicode(None, -1, 'Unicode')
app.MainLoop()

In the example, we draw Anna Karenina in russian azbuka on the window.

![unicode.jpg](images/unicode.jpg)

Figure: Unicode

### Locale

A *locale* is an object that defines user's language, country, number format, letter 
format, currency format etc. A local variant has the following format.

[language[_territory][.codeset][@modifier]]

For example, *de_AT.utf8* is a German local used in Austria, with UTF8 codeset.

#!/usr/bin/python

# locale.py

import wx
import time
import locale

class Locale(wx.Frame):
    def __init__(self, parent, id, title):
        wx.Frame.__init__(self, parent, id, title, size=(250, 420))

        panel = wx.Panel(self, -1)

        tm = time.localtime()

        font = wx.Font(10, wx.DEFAULT, wx.NORMAL, wx.BOLD)
        us = wx.StaticText(self, -1, 'United States', (25, 20))
        us.SetFont(font)

        wx.StaticLine(self, -1, (25, 50), (200 ,1))

        locale.setlocale(locale.LC_ALL, '')
        date = time.strftime('%x', tm)
        time_ = time.strftime('%X', tm)
        curr =  locale.currency(100000)

        wx.StaticText(self, -1, 'date: ', (25, 70))
        wx.StaticText(self, -1, 'time: ', (25, 90))
        wx.StaticText(self, -1, 'currency: ', (25, 110))

        wx.StaticText(self, -1, str(date), (125, 70))
        wx.StaticText(self, -1, str(time_), (125, 90))
        wx.StaticText(self, -1, str(curr), (125, 110))

        de = wx.StaticText(self, -1, 'Germany', (25, 150))
        de.SetFont(font)

        wx.StaticLine(self, -1, (25, 180), (200,1))

        locale.setlocale(locale.LC_ALL, ('de_DE', 'UTF8'))
        date = time.strftime('%x', tm)
        time_ = time.strftime('%X', tm)
        curr =  locale.currency(100000)

        wx.StaticText(self, -1, 'date: ', (25, 200))
        wx.StaticText(self, -1, 'time: ', (25, 220))
        wx.StaticText(self, -1, 'currency: ', (25, 240))
        wx.StaticText(self, -1, date, (125, 200))
        wx.StaticText(self, -1, time_, (125, 220))
        wx.StaticText(self, -1, curr, (125, 240))

        de = wx.StaticText(self, -1, 'Slovakia', (25, 280))
        de.SetFont(font)

        wx.StaticLine(self, -1, (25, 310), (200,1))

        locale.setlocale(locale.LC_ALL, ('sk_SK', 'UTF8'))
        date = time.strftime('%x', tm)
        time_ = time.strftime('%X', tm)
        curr =  locale.currency(100000)

        wx.StaticText(self, -1, 'date: ', (25, 330))
        wx.StaticText(self, -1, 'time: ', (25, 350))
        wx.StaticText(self, -1, 'currency: ', (25, 370))

        wx.StaticText(self, -1, str(date), (125, 330))
        wx.StaticText(self, -1, str(time_), (125, 350))
        wx.StaticText(self, -1, str(curr), (125, 370))

        self.Centre()
        self.Show(True)

app = wx.App()
Locale(None, -1, 'Locale')
app.MainLoop()

	
We use the standard built-in module *locale* to work with localised settings. 
In our example, we will show various formats of date, time 
and currency in the USA, Germany, and Slovakia. 

locale.setlocale(locale.LC_ALL, ('de_DE', 'UTF8'))

Here we set a locale object for Germany. LC_ALL is a combination 
of all various local settings, e.g. LC_TIME, LC_MONETARY, 
and LC_NUMERIC.

date = time.strftime('%x', tm)
time_ = time.strftime('%X', tm)
curr =  locale.currency(100000)

These function calls reflect the current locale object.

![locale.jpg](images/locale.jpg)

Figure: Locale

## World Time

At a specific moment, we have different time in countries across the world. 
Our globe is divided into time zones. It is not uncommon for programmers 
to deal with such tasks. wxPython comes with a wx.DateTime object. 
According to the documentation, wxDateTime class represents an absolute 
moment in the time. 

#!/usr/bin/python

import wx
import time

class WorldTime(wx.Frame):
    def __init__(self, parent, id, title):
        wx.Frame.__init__(self, parent, id, title, size=(270, 280))

        self.panel = wx.Panel(self, -1)
        self.panel.SetBackgroundColour('#000000')
        font = wx.Font(12, wx.FONTFAMILY_DEFAULT, 
                wx.FONTSTYLE_NORMAL, wx.FONTWEIGHT_BOLD, False, 'Georgia')

        self.dt = wx.DateTime()

        self.tokyo = wx.StaticText(self.panel, -1, 
                self.dt.FormatTime() , (20, 20))
        self.tokyo.SetForegroundColour('#23f002')
        self.tokyo.SetFont(font)

        self.moscow = wx.StaticText(self.panel, -1,  
                self.dt.FormatTime() , (20, 70))
        self.moscow.SetForegroundColour('#23f002')
        self.moscow.SetFont(font)

        self.budapest = wx.StaticText(self.panel, -1,  
                self.dt.FormatTime() , (20, 120))
        self.budapest.SetForegroundColour('#23f002')
        self.budapest.SetFont(font)

        self.london = wx.StaticText(self.panel, -1,  
                self.dt.FormatTime() , (20, 170))
        self.london.SetForegroundColour('#23f002')
        self.london.SetFont(font)

        self.newyork = wx.StaticText(self.panel, -1,  
                self.dt.FormatTime() , (20, 220))
        self.newyork.SetForegroundColour('#23f002')
        self.newyork.SetFont(font)

        self.OnTimer(None)

        self.timer = wx.Timer(self)
        self.timer.Start(1000)
        self.Bind(wx.EVT_TIMER, self.OnTimer)

        self.Centre()
        self.Show(True)

    def OnTimer(self, evt):
        now = self.dt.Now()
        self.tokyo.SetLabel('Tokyo: ' + str(now.Format(('%a %T'), 
                wx.DateTime.GMT_9)))
        self.moscow.SetLabel('Moscow: ' + str(now.Format(('%a %T'), 
                wx.DateTime.MSD)))
        self.budapest.SetLabel('Budapest: ' +  str(now.Format(('%a %T'), 
                wx.DateTime.CEST)))
        self.london.SetLabel('London: ' + str(now.Format(('%a %T'), 
                wx.DateTime.WEST)))
        self.newyork.SetLabel('New York: ' + str(now.Format(('%a %T'), 
                wx.DateTime.EDT)))

app = wx.App()
WorldTime(None, -1, 'World Time')
app.MainLoop()

In the code example, we show current time in Tokyo, 
Moscow, Budapest, London, and New York.

self.dt = wx.DateTime()

Here we create a wx.DateTime object.

now = self.dt.Now()

We get the "absolute moment" in time.

self.tokyo.SetLabel('Tokyo: ' + str(now.Format(('%a %T'), 
    wx.DateTime.GMT_9)))

This code line sets the time to the appropriate format. The %a 
conversion specifier is an abbreviated weekday name according to the current 
locale. The %T is the time of day using decimal numbers 
using the format %H:%M:%S. The second parameter of the 
Format() method specifies the time zone. 
GMT_9 is used for Japan, EDT (Eastern Daylight Saving Time) is used in New York etc.

The code example was checked with the 
[timeanddate.com](http://www.timeanddate.com/worldclock/) website.

![worldtime.jpg](images/worldtime.jpg)

Figure: World Time

## Sorting

Locale settings also affect the way, how strings are being sorted. For example 
Hungarian language has some characters that are missing in Slovak 
language or English language. Some languages have accents, others do not. 

#!/usr/bin/python

# collate.py

import wx
import locale

ID_SORT = 1

words = [u'Sund', u'S\xe4bel', u'S\xfcnde', u'Schl\xe4fe', u'Sabotage']

class Collate(wx.Frame):
    def __init__(self, parent, id, title):
        wx.Frame.__init__(self, parent, id, title, size=(300, 220))

        panel = wx.Panel(self, -1)
        hbox = wx.BoxSizer(wx.HORIZONTAL)

        self.listbox = wx.ListBox(panel, -1)
        for i in words:
            self.listbox.Append(i)
        hbox.Add(self.listbox, 1, wx.EXPAND | wx.ALL, 20)

        btnPanel = wx.Panel(panel, -1)
        vbox = wx.BoxSizer(wx.VERTICAL)
        new = wx.Button(btnPanel, ID_SORT, 'Sort', size=(90, 30))

        self.Bind(wx.EVT_BUTTON, self.OnSort, id=ID_SORT)

        vbox.Add((-1, 20))
        vbox.Add(new)

        btnPanel.SetSizer(vbox)
        hbox.Add(btnPanel, 0.6, wx.EXPAND | wx.RIGHT, 20)
        panel.SetSizer(hbox)

        locale.setlocale(locale.LC_COLLATE, ('de_DE', 'UTF8'))

        self.Centre()
        self.Show(True)

    def OnSort(self, event):
        self.listbox.Clear()
        words.sort( lambda a,b: locale.strcoll(a, b) )
        for i in words:
            self.listbox.Append(i)

app = wx.App()
Collate(None, -1, 'Collate')
app.MainLoop()

In our example, we took 5 germam words from the dictionary. 
The default sort() function sorts these words this way:
Sabotage, Schläfe, Sund, Säbel, Sünde. This is incorrect, 
because in german alphabet ä character precedes a character.
To get the corect sorting, we must use locale functions.

locale.setlocale(locale.LC_COLLATE, ('de_DE', 'UTF8'))

Here we set the german collate. We could use the LC_ALL option or 
the more specific LC_COLLATE one.

words.sort( lambda a,b: locale.strcoll(a, b) )

The trick is to use a new compare function within the sort() function. 
We define an anonymous lambda function.
The strcoll() function compares two strings and returns -1, 0, 1 
exactly like the default one, but it takes the locale settings (the collate) 
into account. This way we have the correct sorting of words.

![collate.jpg](images/collate.jpg)

Figure: Collate

## Simple Translation

In the following example, we will demonstrate a very basic translation.

A programmer has two options. Either to use the GNU gettext or to use the 
wxPython catalogs. Both systems are compatible.

wxPython has a class wx.Locale, which is a base for using message 
catalogs. Each translation has one catalog.
Say, we want to translate a string into German language. 
First, we must ensure that we have language support for German language.

$ locale -a
C
de_AT.utf8
de_BE.utf8
de_CH.utf8
de_DE.utf8
de_LU.utf8
en_AU.utf8
en_BW.utf8
en_CA.utf8
en_DK.utf8
en_GB.utf8
en_HK.utf8
en_IE.utf8
en_IN
en_NZ.utf8
en_PH.utf8
en_SG.utf8
en_US.utf8
en_ZA.utf8
en_ZW.utf8
POSIX
sk_SK.utf8

To check what languages are supported, we use the locale command. 
On my system, I have english, german and slovak language support. English 
language and german language have different dialects that is why we have 
so many options. Notice the *utf8* string. This means that the system uses 
utf8 encoding for working with strings.

Next we write our code example. We put the string that are to be 
translated into this _(), or we can use the wx.GetTranslation() call.

#!/usr/bin/python

import wx

class Translation(wx.Frame):
    def __init__(self, parent, id, title):
        wx.Frame.__init__(self, parent, id, title, size=(220, 100))

        panel = wx.Panel(self, -1)

        mylocale = wx.Locale()
        mylocale.AddCatalogLookupPathPrefix('.')
        mylocale.AddCatalog('simple_de')

        _ = wx.GetTranslation

        wx.StaticText(panel, -1, _("hello"), (10, 10))
        #wx.StaticText(panel, -1, wx.GetTranslation('hello'), (10, 10))

        self.Centre()
        self.Show(True)

app = wx.App()
Translation(None, -1, 'Translation')
app.MainLoop()

Next we create a so called PO file. It is a simple text file, which is 
translators use to translate the strings.

pygettext -o simple_de.po simple.py

To create a po file, we use the *pygettext* command. To fully 
understand the format of the po file, consult 
the gnu gettext [manual](http://www.gnu.org/software/gettext/manual/gettext.html).

"Content-Type: text/plain; charset=utf-8\n"

We edit the simple_de.po file. We must specify the charset. In our case 
it is utf-8. 

#: simple.py:17
msgid "hello"
msgstr "Grüß Gott"

Here we provide a translation for the hello string. 

The last thing we do is to create a binary message catalog.

msgfmt --output-file simple_de.mo simple_de.po

To produce a mo file, we call the *msgfmt* command.

![translation.jpg](images/translation.jpg)

Figure: Simple translation

In this chapter, we have worked with Unicode characters. 

[Contents](..) 
[Previous](../draganddrop/)
[Next](../skeletons/)