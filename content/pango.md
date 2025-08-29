+++
title = "Pango"
date = 2025-08-29T19:56:58.192+01:00
draft = false
description = "This part of the PyGTK tutorial covers Pango library."
image = "images/quotations.png"
imageBig = "images/quotations.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)
[Next](../pangoII/)

# Pango

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we explore the Pango library.

Pango is a free and open source computing library for rendering 
internationalised texts in high quality. Different font backends 
can be used, allowing cross-platform support. (wikipedia)

Pango provides advanced font and text handling that is used 
for Gdk and Gtk. 

## Simple example

In our first example, we show, how to change font for our label widget.   

quotes.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to modify
# the font of a label
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

quotes = """Excess of joy is harder to bear than any amount of sorrow.
The more one judges, the less one loves.
There is no such thing as a great talent without great will power. 
"""

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("Quotes")
        
        label = gtk.Label(quotes)
        gtk.gdk.beep()

        fontdesc = pango.FontDescription("Purisa 10")
        label.modify_font(fontdesc)

        fix = gtk.Fixed()

        fix.put(label, 5, 5)
        
        self.add(fix)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

PyApp()
gtk.main()

In the above code example, we have a label widget with three quotations. 
We change its font to Purisa 10.

 quotes = """Excess of joy is harder to bear than any amount of sorrow.
 The more one judges, the less one loves.
 There is no such thing as a great talent without great will power. 
"""

This is the text to show in the label.

fontdesc = pango.FontDescription("Purisa 10")

The FontDescription is used to specify
the characteristics of a font.

label.modify_font(fontdesc)

We change the font of the label widget to Purisa 10.

![quotations.png](images/quotations.png)

Figure: Quotations

## System fonts

The next code example shows all available fonts in a 
TreeView widget. 

systemfonts.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example lists all available
# fonts on a system in a TreeView widget
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_size_request(350, 250)
        self.set_border_width(8)
        self.connect("destroy", gtk.main_quit)
        self.set_title("System fonts")
        
        sw = gtk.ScrolledWindow()
        sw.set_shadow_type(gtk.SHADOW_ETCHED_IN)
        sw.set_policy(gtk.POLICY_AUTOMATIC, gtk.POLICY_AUTOMATIC)
        
        context = self.create_pango_context()
        self.fam = context.list_families()

        store = self.create_model()

        treeView = gtk.TreeView(store)
        treeView.set_rules_hint(True)
        sw.add(treeView)

        self.create_column(treeView)

        self.add(sw)
        
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

    def create_column(self, treeView):
        rendererText = gtk.CellRendererText()
        column = gtk.TreeViewColumn("FontName", rendererText, text=0)
        column.set_sort_column_id(0)    
        treeView.append_column(column)
    
    def create_model(self):
        store = gtk.ListStore(str)

        for ff in self.fam:
            store.append([ff.get_name()])

        return store
    

PyApp()
gtk.main()

The code example shows all available fonts on a system.

context = self.create_pango_context()

This code line creates a pango context object. 
It contains global information about the rendering process of text. 

self.fam = context.list_families()

From the context object, we retrieve all available font families. 

for ff in self.fam:
    store.append([ff.get_name()])

During the model creation of the TreeView widget, 
we get all font names from the array of font families and put them 
into the list store. 

![systemfonts.png](images/systemfonts.png)

Figure: System fonts

## Unicode

Pango is used to work with internationalised text. 

unicode.py
  
 
#!/usr/bin/python
# -*- coding: utf-8 -*-

# ZetCode PyGTK tutorial 
#
# This example displays text
# in azbuka
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

obj = unicode(u'''Фёдор Михайлович Достоевский родился 30 октября (11 ноября)
1821 года в Москве. Был вторым из 7 детей. Отец, Михаил Андреевич, 
работал вгоспитале для бедных. Мать, Мария Фёдоровна 
(в девичестве Нечаева), происходила из купеческого рода.''')

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("Unicode")
        
        label = gtk.Label(obj.encode('utf-8'))

        fontdesc = pango.FontDescription("Purisa 10")
        label.modify_font(fontdesc)

        fix = gtk.Fixed()

        fix.put(label, 5, 5)
        
        self.add(fix)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

PyApp()
gtk.main()

We show some text in azbuka. 

# -*- coding: utf-8 -*-

In order to work directly with internationalized text
in the source code, we must provide this magic comment.
Note that it must be on the first or the second line. 

 obj = unicode(u'''Фёдор Михайлович Достоевский родился 30 октября (11 ноября)
1821 года в Москве. Был вторым из 7 детей. Отец, Михаил Андреевич, 
работал вгоспитале для бедных. Мать, Мария Фёдоровна 
(в девичестве Нечаева), происходила из купеческого рода.''')

This is text in azbuka.

Label label = new Label(text);

We put encoded text into the label.  

![unicode.png](images/unicode.png)

Figure: Unicode

## Attributes

Pango attribute is an attribute that applies to a section of text.

attributes.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# In this program we work with
# pango attributes
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import pango

text = "Valour fate kinship darkness"

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("Attributes")
        
        label = gtk.Label(text)

        attr = pango.AttrList()
        
        fg_color = pango.AttrForeground(65535, 0, 0, 0, 6)
        underline = pango.AttrUnderline(pango.UNDERLINE_DOUBLE, 7, 11)
        bg_color = pango.AttrBackground(40000, 40000, 40000, 12, 19)
        strike = pango.AttrStrikethrough(True, 20, 29)
        size = pango.AttrSize(30000, 0, -1)

        attr.insert(fg_color)
        attr.insert(underline)
        attr.insert(bg_color)
        attr.insert(size)
        attr.insert(strike)

        label.set_attributes(attr)

        fix = gtk.Fixed()

        fix.put(label, 5, 5)
        
        self.add(fix)
        self.set_position(gtk.WIN_POS_CENTER)
        self.show_all()

PyApp()
gtk.main()

In the code example we show four different attributes applied 
on the text. 

attr = pango.AttrList()

Pango attribute list is an object for holding attributes.

fg_color = pango.AttrForeground(65535, 0, 0, 0, 6)

Here we create an attribute that will render text in red color. 
The first three parameters are the R, G, B values of a color.
The last two parameters are the start and end indexes of the
text, to which we apply this attribute. 

label.set_attributes(attr)

We set the list of attributes for the label. 

![attributes.png](images/attributes.png)

Figure: Pango attributes

In this chapter of the PyGTK programming library, we worked with
pango library.

[Contents](..) 
[Previous](../dialogs/)
[Next](../pangoII/)