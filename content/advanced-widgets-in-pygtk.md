+++
title = "Advanced widgets in PyGTK"
date = 2025-08-29T19:56:53.989+01:00
draft = false
description = "This part of the PyGTK tutorial covers advanced widgets."
image = "images/iconview.png"
imageBig = "images/iconview.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../widgetsII/)
[Next](../dialogs/)

# Advanced widgets in PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we introduce some more
advanced widgets in PyGTK. 

## IconView

The IconView is a widget which displays a list of icons in a grid.

iconview.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example demonstrates the IconView widget.
# It shows the contents of the currently selected
# directory on the disk.
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import os

COL_PATH = 0
COL_PIXBUF = 1
COL_IS_DIRECTORY = 2

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_size_request(650, 400)
        self.set_position(gtk.WIN_POS_CENTER)
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("IconView")
        
        self.current_directory = '/'

        vbox = gtk.VBox(False, 0);
       
        toolbar = gtk.Toolbar()
        vbox.pack_start(toolbar, False, False, 0)

        self.upButton = gtk.ToolButton(gtk.STOCK_GO_UP);
        self.upButton.set_is_important(True)
        self.upButton.set_sensitive(False)
        toolbar.insert(self.upButton, -1)

        homeButton = gtk.ToolButton(gtk.STOCK_HOME)
        homeButton.set_is_important(True)
        toolbar.insert(homeButton, -1)

        self.fileIcon = self.get_icon(gtk.STOCK_FILE)
        self.dirIcon = self.get_icon(gtk.STOCK_DIRECTORY)

        sw = gtk.ScrolledWindow()
        sw.set_shadow_type(gtk.SHADOW_ETCHED_IN)
        sw.set_policy(gtk.POLICY_AUTOMATIC, gtk.POLICY_AUTOMATIC)
        vbox.pack_start(sw, True, True, 0)

        self.store = self.create_store()
        self.fill_store()

        iconView = gtk.IconView(self.store)
        iconView.set_selection_mode(gtk.SELECTION_MULTIPLE)

        self.upButton.connect("clicked", self.on_up_clicked)
        homeButton.connect("clicked", self.on_home_clicked)

        iconView.set_text_column(COL_PATH)
        iconView.set_pixbuf_column(COL_PIXBUF)

        iconView.connect("item-activated", self.on_item_activated)
        sw.add(iconView)
        iconView.grab_focus()

        self.add(vbox)
        self.show_all()

    def get_icon(self, name):
        theme = gtk.icon_theme_get_default()
        return theme.load_icon(name, 48, 0)
    

    def create_store(self):
        store = gtk.ListStore(str, gtk.gdk.Pixbuf, bool)
        store.set_sort_column_id(COL_PATH, gtk.SORT_ASCENDING)
        return store
            
    
    def fill_store(self):
        self.store.clear()

        if self.current_directory == None:
            return

        for fl in os.listdir(self.current_directory):
        
            if not fl[0] == '.': 
                if os.path.isdir(os.path.join(self.current_directory, fl)):
                    self.store.append([fl, self.dirIcon, True])
                else:
                    self.store.append([fl, self.fileIcon, False])             
        
    

    def on_home_clicked(self, widget):
        self.current_directory = os.path.realpath(os.path.expanduser('~'))
        self.fill_store()
        self.upButton.set_sensitive(True)
        
    
    def on_item_activated(self, widget, item):

        model = widget.get_model()
        path = model[item][COL_PATH]
        isDir = model[item][COL_IS_DIRECTORY]

        if not isDir:
            return
            
        self.current_directory = self.current_directory + os.path.sep + path
        self.fill_store()
        self.upButton.set_sensitive(True)
    

    def on_up_clicked(self, widget):
        self.current_directory = os.path.dirname(self.current_directory)
        self.fill_store()
        sensitive = True
        if self.current_directory == "/": sensitive = False
        self.upButton.set_sensitive(sensitive)
    

PyApp()
gtk.main()

This example shows icons of the currently selected directory. 
It has a toolbar and two buttons. Up button and home button.
We use them to navigate through the file system. 

self.current_directory = '/'

The current_directory is the directory, 
that is displayed by the IconView widget. 

def create_store(self):
    store = gtk.ListStore(str, gtk.gdk.Pixbuf, bool)
    store.set_sort_column_id(COL_PATH, gtk.SORT_ASCENDING)
    return store

The create_store method creates a ListStore.
It is a data model used in IconView
widget. It takes three parameters. The directory name, the pixbuf image of
the icon and a bool variable, indicating, whether we have a 
directory or a file.

if not fl[0] == '.': 
    if os.path.isdir(os.path.join(self.current_directory, fl)):
        self.store.append([fl, self.dirIcon, True])
    else:
        self.store.append([fl, self.fileIcon, False])     

In the fill_store method, we fill the list store
with data. Here, we find out all directories in the current path. 
We exclude the invisible directories, which begin with '.'.

def on_home_clicked(self, widget):
    self.current_directory = os.path.realpath(os.path.expanduser('~'))
    self.fill_store()
    self.upButton.set_sensitive(True)

If we click on the home button, the home directory becomes a current directory.
We refill the list store. And make the up button active. 

In the on_item_activated method, we react to an event, 
which is generated, when we click on a icon from the icon view widget. 

model = widget.get_model()
path = model[item][COL_PATH]
isDir = model[item][COL_IS_DIRECTORY]

if not isDir:
    return

We get the path of the activated item. And we determine if it is a 
directory or a file. If it is a file, we return. 

self.current_directory = self.current_directory + os.path.sep + path
self.fill_store()
self.upButton.set_sensitive(True)

In case it is a directory, we replace the root
with the current path, refill the store and make the 
up button sensitive.

def on_up_clicked(self, widget):
    self.current_directory = os.path.dirname(self.current_directory)
    self.fill_store()
    sensitive = True
    if self.current_directory == "/": sensitive = False
    self.upButton.set_sensitive(sensitive)

If we click on the up button, we replace the current directory 
with its parent directory. Refill the list store. 
And the up button is activated if we are below the root / 
directory of the file system.

![iconview.png](images/iconview.png)

Figure: IconView

## ListView

In the following example, we use the TreeView widget 
to show a list view. Again the ListStore is used to store data.

listview.py
  
 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows a TreeView widget
# in a list view mode
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

actresses = [('jessica alba', 'pomona', '1981'), ('sigourney weaver', 'new york', '1949'),
    ('angelina jolie', 'los angeles', '1975'), ('natalie portman', 'jerusalem', '1981'),
    ('rachel weiss', 'london', '1971'), ('scarlett johansson', 'new york', '1984' )]

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_size_request(350, 250)
        self.set_position(gtk.WIN_POS_CENTER)
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("ListView")

        vbox = gtk.VBox(False, 8)
        
        sw = gtk.ScrolledWindow()
        sw.set_shadow_type(gtk.SHADOW_ETCHED_IN)
        sw.set_policy(gtk.POLICY_AUTOMATIC, gtk.POLICY_AUTOMATIC)
        
        vbox.pack_start(sw, True, True, 0)

        store = self.create_model()

        treeView = gtk.TreeView(store)
        treeView.connect("row-activated", self.on_activated)
        treeView.set_rules_hint(True)
        sw.add(treeView)

        self.create_columns(treeView)
        self.statusbar = gtk.Statusbar()
        
        vbox.pack_start(self.statusbar, False, False, 0)

        self.add(vbox)
        self.show_all()

    def create_model(self):
        store = gtk.ListStore(str, str, str)

        for act in actresses:
            store.append([act[0], act[1], act[2]])

        return store

    def create_columns(self, treeView):
    
        rendererText = gtk.CellRendererText()
        column = gtk.TreeViewColumn("Name", rendererText, text=0)
        column.set_sort_column_id(0)    
        treeView.append_column(column)
        
        rendererText = gtk.CellRendererText()
        column = gtk.TreeViewColumn("Place", rendererText, text=1)
        column.set_sort_column_id(1)
        treeView.append_column(column)

        rendererText = gtk.CellRendererText()
        column = gtk.TreeViewColumn("Year", rendererText, text=2)
        column.set_sort_column_id(2)
        treeView.append_column(column)

    def on_activated(self, widget, row, col):
        
        model = widget.get_model()
        text = model[row][0] + ", " + model[row][1] + ", " + model[row][2]
        self.statusbar.push(0, text)

PyApp()
gtk.main()

In our example, we show a list of six actresses in the TreeView
widget. Each of the rows shows the name, the place of born and the year of 
born for each of them. 

def create_model(self):
    store = gtk.ListStore(str, str, str)

    for act in actresses:
        store.append([act[0], act[1], act[2]])

    return store

In the create_model method, we create the list store.  
The list store has three parameters. The name of the actress, the place of born
and year of born. This is the data model of our TreeView
widget. 

treeView = gtk.TreeView(store)
treeView.connect("row-activated", self.on_activated)
treeView.set_rules_hint(True)

Here we create the TreeView widget, 
taking the list store as a parameter. set_rules_hint
method changes the background color of the every second
row in the TreeView widget.

rendererText = gtk.CellRendererText()

column = gtk.TreeViewColumn("Name", rendererText, text=0)
column.set_sort_column_id(0)    
treeView.append_column(column)

In the create_columns method, we add three columns to our
TreeView widget. The above code creates a column
displaying names of the actresses. The CellRendererText
retrieves its text from the first column of the tree model. (text=0)

def on_activated(self, widget, row, col):
       
    model = widget.get_model()
    text = model[row][0] + ", " + model[row][1] + ", " + model[row][2]
    self.statusbar.push(0, text)

If we double click on an item, we display the whole row in the statusbar. 

![listview.png](images/listview.png)

Figure: ListView

## Tree

In the last example of this chapter, we use the TreeView
widget to show a hierarchical tree of data. 

tree.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows a TreeView widget
# in a tree view mode
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window): 
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_size_request(400, 300)
        self.set_position(gtk.WIN_POS_CENTER)
        
        self.connect("destroy", gtk.main_quit)
        self.set_title("Tree")

        tree = gtk.TreeView()
        
        languages = gtk.TreeViewColumn()
        languages.set_title("Programming languages")
 
        cell = gtk.CellRendererText()
        languages.pack_start(cell, True)
        languages.add_attribute(cell, "text", 0)
 
        treestore = gtk.TreeStore(str)
 
        it = treestore.append(None, ["Scripting languages"])
        treestore.append(it, ["Python"])
        treestore.append(it, ["PHP"])
        treestore.append(it, ["Perl"])
        treestore.append(it, ["Ruby"])
 
        it = treestore.append(None, ["Compiling languages"])
        treestore.append(it, ["C#"])
        treestore.append(it, ["C++"])
        treestore.append(it, ["C"])
        treestore.append(it, ["Java"])
 
        tree.append_column(languages)
        tree.set_model(treestore)

        self.add(tree)
        self.show_all()

PyApp()
gtk.main()

This time we use the TreeView widget to show hierarchical 
data. 

tree = gtk.TreeView()

TreeView widget is created.

languages = gtk.TreeViewColumn()
languages.set_title("Programming languages")

It has one column named "Programming languages".

cell = gtk.CellRendererText()
languages.pack_start(cell, True)
languages.add_attribute(cell, "text", 0)

We show textual data in the TreeView widget.

treestore = gtk.TreeStore(str)

To store the data, we use the TreeStore object. 

it = treestore.append(None, ["Scripting languages"])
treestore.append(it, ["Python"])
treestore.append(it, ["PHP"])

We append data to the tree. The TreeIter object is 
used for accessing data in a row. 

tree.append_column(languages)

A column is appended to the tree. 

tree.set_model(treestore)
 

Finally, we set a data model for the tree widget. 

![tree.png](images/tree.png)

Figure: Tree

In this chapter of the PyGTK programming tutorial, we were talking 
about advanced PyGTK widgets. 

[Contents](..)
[Previous](../widgetsII/)
[Next](../dialogs/)