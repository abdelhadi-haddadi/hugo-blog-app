+++
title = "Signals & events in PyGTK"
date = 2025-08-29T19:56:59.380+01:00
draft = false
description = "This part of the PyGTK tutorial covers signals & events in PyGTK."
image = "images/move.png"
imageBig = "images/move.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../toolbars/)
[Next](../widgets/)

# Signals &amp; events in PyGTK

last modified October 18, 2023

In this part of the PyGTK programming tutorial, we talk about signals &amp; events.

All GUI applications are event driven. PyGTK applications are no exception.
The applications start a main loop with the gtk.main call, 
which continuously checks for newly generated events. 
If there is no event, the application waits and does nothing. 

*Events* are messages from the X server to the application.
When we click on a button widget, the clicked signal will be *emitted*.
There are signals that all widgets inherit, such as destroy, and there are 
signals that are widget specific, such as toggled on a toggle button.

Programmers use signal handlers to react to various signals. These handlers are
called *callbacks* among GTK programmers. 

handler_id = button.connect("clicked", self.on_clicked)

Here we use the connect method of the GObject class, 
(GtkButton is a GObject), to connect a callback 
*on_clicked()* to a signal called clicked.

The connect method returns a handler id, which is used to 
uniquely identify the callback method. The id can be used with the following methods:

def disconnect(handler_id)
def handler_disconnect(handler_id)
def handler_is_connected(handler_id)
def handler_block(handler_id)
def handler_unblock(handler_id)

These methods enable to disconnect a handler from an GObject, or 
block/unblock it.

## Signals vs events

There is generally a lot of confusion about the difference 
between the two. 

Signals and events are two different things.
An event is an almost one-to-one mapping of window system events. 
Key press, window resizement or button press are typical window
system events. Window system events are reported to the application main loop.
Gdk interprets the window system events and passes them along via signals.

A signal is nothing other than a callback mechanism.
If one object wants to be notified about an other object's action or
state change, it registers a callback. When the object emits a signal,
it looks in the list of callbacks which have been registered with it
and calls the callback(s) for the specific signal. It can optionally
send some predefined data with it.

Signals are a general purpose notification framework.
They are not used only for notifications about UI changes.
They can be used for notifications about application state
changes. Signals are general, powerful, their usage is very broad.
Any GObject can emit and receive a signal. 
A type may have one or more signals, each of which may 
have an argument list and return value. Handlers can then be connected
to instances of the type. When the signal is emitted on an instance,
each of the connected handlers will be called.

The only connection between signals and events is that signals are used 
to send notifications about events from the X server.

Signals are a feature of gtk.Object and its subclasses, 
events are a Gdk/Xlib concept.

## Simple example

The next example shows, how we react to two basic signals.

quitbutton.py
  

 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# The example shows how to work with 
# destroy and clicked signals
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Quit Button")
        self.set_size_request(250, 200)
        self.set_position(gtk.WIN_POS_CENTER)
        self.connect("destroy", self.on_destroy)
        
        fixed = gtk.Fixed()

        quit = gtk.Button("Quit")
        quit.connect("clicked", self.on_clicked)
        quit.set_size_request(80, 35)

        fixed.put(quit, 50, 50)

        self.add(fixed)
        self.show_all()
        
    def on_destroy(self, widget):
        gtk.main_quit()
        
    def on_clicked(self, widget):
        gtk.main_quit()

PyApp()
gtk.main()

The destroy signal is triggered, when we close the window.  By default, the
application does not quit, when we click on the close button in the titlebar. 

self.connect("destroy", self.on_destroy)

The connect method plugs 
the on_destroy method 
to the destroy signal. 

quit.connect("clicked", self.on_clicked)

Pressing the quit button, the clicked
signal is triggered. When we click on the quit button, we call the
on_clicked method.

def on_destroy(self, widget):
    gtk.main_quit()

In the on_destroy method, we react 
to the destroy signal. We call the gtk.main_quit method, which
terminates the application.

def on_clicked(self, widget):
    gtk.main_quit()

Here is the on_clicked method. It takes two parameters. 
The widget parameter is the object, which triggered this signal. In our case it 
is the quit button. Different objects send different signals. 
Signals and the parameters sent to methods can be found in the reference manual of
the PyGTK library.
[pygtk.org/docs/pygtk/index.html](http://pygtk.org/docs/pygtk/index.html)

## Creating a custom signal

In the following code example, we create and send a custom signal. 

customsignal.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to create
# and send a custom singal
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gobject

class Sender(gobject.GObject):
    def __init__(self):
        self.__gobject_init__()
        

gobject.type_register(Sender)
gobject.signal_new("z_signal", Sender, gobject.SIGNAL_RUN_FIRST,
                   gobject.TYPE_NONE, ())

class Receiver(gobject.GObject):
    def __init__(self, sender):
        self.__gobject_init__()
        
        sender.connect('z_signal', self.report_signal)
        
    def report_signal(self, sender):
        print "Receiver reacts to z_signal"

def user_callback(object):
    print "user callback reacts to z_signal"

if __name__ == '__main__':
    
    sender = Sender()
    receiver = Receiver(sender)

    sender.connect("z_signal", user_callback)
    sender.emit("z_signal")

We create two GObjects. Sender and receiver objects. 
The sender emits a signal, which is received by the
receiver object. We also plug a callback to the 
signal.

class Sender(gobject.GObject):
    def __init__(self):
        self.__gobject_init__()

This is a sender object. It is created with a default constructor.

gobject.type_register(Sender)
gobject.signal_new("z_signal", Sender, gobject.SIGNAL_RUN_FIRST,
                  gobject.TYPE_NONE, ())

We register a new object and a new signal. The signal_new function 
registers a signal called z_signal for the Sender object. 
The SIGNAL_RUN_FIRST parameter means that the default handler of 
the object that receives the signal is called as first. The last two parameters 
are the return value type and parameter types. In our example we do not return 
any value and send no parameters.

sender.connect('z_signal', self.report_signal)

The receiver listens for the z_signal.

sender = Sender()
receiver = Receiver(sender)

Sender and receiver objects are instantiated. The receiver takes
a sender as a parameter, so that it can listen to its signals.

sender.connect("z_signal", user_callback)

Here we plug the signal to the user callback.

sender.emit("z_signal")

The z_signal is being emitted.

class Sender(gobject.GObject):

    __gsignals__ = {
        'z_signal': (gobject.SIGNAL_RUN_LAST, gobject.TYPE_NONE, ()),
    }

    def __init__(self):
        self.__gobject_init__() 
        
gobject.type_register(Sender)

We can also use the __gsignals__
class attribute to register a new signal. 

## Predefined signal handlers

Objects in PyGTK may have predefined signal handlers. These handlers
begin with do_*. For example do_expose, do_show, or 
do_clicked.

move.py
  

 
#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example overrides predefined
# do_configure_event() signal handler
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk
import gobject

class PyApp(gtk.Window):
    __gsignals__ = {
        "configure-event" : "override"
        }

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_size_request(200, 150)
        self.set_position(gtk.WIN_POS_CENTER)
       
        self.connect("destroy", gtk.main_quit)

        self.show_all()

    def do_configure_event(self, event):
        
        title = "%s, %s" % (event.x, event.y)
        self.set_title(title)
        gtk.Window.do_configure_event(self, event)
       

PyApp()
gtk.main()

When we move or resize a window, the X server sends configure events. 
These are then transformed into configure-event signals. 

In our code example, we display the x, y coordinates of the top-left corner
of the window in the titlebar. We could simply connect a signal handler to the
configure-event signal. But we take a different strategy.
We override the default class handler, where we implement the logic needed.

__gsignals__ = {
    "configure-event" : "override"
    }

This tells that we are going to override the default on_configure_event
method.

def do_configure_event(self, event):
       
    title = "%s, %s" % (event.x, event.y)
    self.set_title(title)
    gtk.Window.do_configure_event(self, event)

Here we override the predefined do_configure_event method. 
We set the x, y coordinates of the window to the title of the window. 
Also note the last line. It explicitly calls the superclass do_configure_event method.
This is because it does some important job. Try to comment this line to see what happens. Resizing
of windows would not work correctly. If we override a default handler, we may or may not call
the superclass method. In our case we have to. 

![move.png](images/move.png)

Figure: Configure singal

## Signals of a button

The following example shows various button signals.

buttonsignals.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This program shows various signals 
# of a button widget
# It emits a button-release-event which
# triggers a released singal
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):
    def __init__(self):
        super(PyApp, self).__init__()
        
        self.set_title("Signals")
        self.set_size_request(250, 200)
        self.set_position(gtk.WIN_POS_CENTER)
        self.connect("destroy", gtk.main_quit)
        
        fixed = gtk.Fixed()
        
        self.quit = gtk.Button("Quit")
        
        self.quit.connect("pressed", self.on_pressed)
        self.quit.connect("released", self.on_released)
        self.quit.connect("clicked", self.on_clicked)
        
        self.quit.set_size_request(80, 35)

        fixed.put(self.quit, 50, 50)
        
        self.add(fixed)
        self.show_all()
        self.emit_signal()
        
    def emit_signal(self):
                
        event = gtk.gdk.Event(gtk.gdk.BUTTON_RELEASE)
        event.button = 1
        event.window = self.quit.window
        event.send_event = True
                
        self.quit.emit("button-release-event", event)
        
        
    def on_clicked(self, widget):
        print "clicked"
        
    def on_released(self, widget):
        print "released"
        
    def on_pressed(self, widget):
        print "pressed"

PyApp()
gtk.main()

A button can emit more than just one type of signal. We work with 
three of them. The clicked, pressed and 
released signals. We also show, how an event signal 
triggers another signal.

self.quit.connect("pressed", self.on_pressed)
self.quit.connect("released", self.on_released)
self.quit.connect("clicked", self.on_clicked)

We register callbacks for all three signals.

self.emit_signal()

Upon the start of the application, we emit a specific signal.

def emit_signal(self):
               
    event = gtk.gdk.Event(gtk.gdk.BUTTON_RELEASE)
    event.button = 1
    event.window = self.quit.window
    event.send_event = True
               
    self.quit.emit("button-release-event", event)

We emit the button-release-event signal. It takes an 
Event object as a parameter. After the application starts, 
we should see "released" text in our console window. When we click on 
the button, all three signals are triggered. 

## Blocking an event handler

We can block a signal handler. The next example shows this.

block.py
  

#!/usr/bin/python

# ZetCode PyGTK tutorial 
#
# This example shows how to block/unblock
# a signal handler
#
# author: jan bodnar
# website: zetcode.com 
# last edited: February 2009

import gtk

class PyApp(gtk.Window):

    def __init__(self):
        super(PyApp, self).__init__()

        self.set_title("Blocking a callback")
        self.set_size_request(250, 180)
        self.set_position(gtk.WIN_POS_CENTER)
        
        fixed = gtk.Fixed()
        button = gtk.Button("Click")
        button.set_size_request(80, 35)
        self.id = button.connect("clicked", self.on_clicked)
        fixed.put(button, 30, 50)

        check = gtk.CheckButton("Connect")
        check.set_active(True)
        check.connect("clicked", self.toggle_blocking, button)
        fixed.put(check, 130, 50)

        self.connect("destroy", gtk.main_quit)

        self.add(fixed)
        self.show_all()

    def on_clicked(self, widget):
        print "clicked"

    def toggle_blocking(self, checkbox, button):
        if checkbox.get_active():
           button.handler_unblock(self.id)
        else:
           button.handler_block(self.id)

PyApp()
gtk.main()

In the code example, we have a button and a check box. We show "clicked" text in the
console, when we click on the button and the check box is active. 
The check box blocks/unblocks a handler method from the button 
clicked signal. 

self.id = button.connect("clicked", self.on_clicked)

The connect method returns a handler id. This
id is used to block and unblock the handler. 

def toggle_blocking(self, checkbox, button):
    if checkbox.get_active():
       button.handler_unblock(self.id)
    else:
       button.handler_block(self.id)

These lines block and unblock the callback with the appropriate
methods.

![blocking.png](images/blocking.png)

Figure: Blocking a callback

In this chapter of the PyGTK tutorial, we worked with signals. 

[Contents](..) 
[Previous](../toolbars/)
[Next](../widgets/)