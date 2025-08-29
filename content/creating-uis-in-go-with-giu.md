+++
title = "Creating UIs in Go with giu"
date = 2025-08-29T19:55:18.972+01:00
draft = false
description = "Learn how to build GUI applications in Go using the giu library. Includes examples of creating windows and handling events."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating UIs in Go with giu

last modified April 30, 2024

In this article we show how to create UIs in Go using the cross-platform giu
library.

The *giu* is a rapid cross-platform GUI framework for Go based on Dear
ImGui. Dear ImGui is a bloat-free graphical user interface library for C++. 

Dear ImGui uses the immediate mode GUI paradigm to define interfaces. Unlike in
traditional toolkits (such as Qt, Gtk or Swing) where we create separate UI
objects and manage their state, we directly tell the GUI library what to draw
in each frame.

Immediate mode GUIs are often used in game development. 

The giu is a Go wrapper over the Dear ImGui C interface. It uses a convenient 
builder pattern to construct widgets. 

## Label widget

Label is a widget that displays text.

main.go
  

package main

import (
    g "github.com/AllenDang/giu"
)

func loop() {

    g.SingleWindow().Layout(
        g.Label("An old falcon in the sky"),
    )
}

func main() {
    wnd := g.NewMasterWindow("Application", 400, 200,
        g.MasterWindowFlagsFloating)
    wnd.Run(loop)
}

In the example, we create a window that displays some text.

import (
    g "github.com/AllenDang/giu"
)

We import the library and give it the g alias.

func loop() {

    g.SingleWindow().Layout(
        g.Label("An old falcon in the sky"),
    )
}

In each frame, the loop function is called. In this function, we 
create the UI of the application. In our case, we create a single window and 
a label inside the window.

func main() {
    wnd := g.NewMasterWindow("Application", 400, 200,
        g.MasterWindowFlagsFloating)
    wnd.Run(loop)
}

In the main function, we create the master window. The g.NewMasterWindow
function takes the applicaion title, window width and height, and window flags
as parameters. The Run function runs the main loop. In each frame,
the loop function is used to construct the ui. The Run
should be called at the end of main function, after setting up the master
window.

## Shortcuts

Keyboard shortcut is a combination of keys pressed on the keyboard to perform an
action. They are created with RegisterKeyboardShortcuts.

main.go
  

package main

import (
    "os"

    g "github.com/AllenDang/giu"
)

func loop() {

    g.SingleWindow().Layout(
        g.Label("Ctrl + Q to exit"),
    )
}

func main() {
    wnd := g.NewMasterWindow("Window", 400, 200, g.MasterWindowFlagsFloating).RegisterKeyboardShortcuts(
        g.WindowShortcut{
            Key:      g.KeyQ,
            Modifier: g.ModControl,
            Callback: func() { os.Exit(0) }},
    )
    wnd.Run(loop)
}

In the example, we define the Ctrl+Q shortcut. It terminates 
the application.

wnd := g.NewMasterWindow("Window", 400, 200, g.MasterWindowFlagsFloating).RegisterKeyboardShortcuts(
    g.WindowShortcut{
        Key:      g.KeyQ,
        Modifier: g.ModControl,
        Callback: func() { os.Exit(0) }},
)

The RegisterKeyboardShortcuts is called on the master window. 
In the g.WindowShortcut structure, we define the key, modifier key, 
and the callback. For our shortcut we call the os.Exit function to 
terminate the application.

## Button widget

Button is a basic widget that executes an action when pressed.

main.go
  

package main

import (
    "fmt"

    g "github.com/AllenDang/giu"
)

func loop() {
    g.SingleWindow().Layout(
        g.Button("Click").Size(80, 30).OnClick(func() {
            fmt.Println("button clicked")
        }),
    )
}

func main() {
    wnd := g.NewMasterWindow("Button", 400, 200, 0)
    wnd.Run(loop)
}

In the example, a message is written in the console after a button press.

g.SingleWindow().Layout(
    g.Button("Click").Size(80, 30).OnClick(func() {
        fmt.Println("button clicked")
    }),
)

A button is created with g.Button. The Size resizes 
the widget. The OnClick function defines a callback for the click 
event of the button.

## Checkbox widget

A checkbox widget is a graphical element used in user interfaces for making
binary choices. It is a small square box that can be either checked or unchecked.

main.go
  

package main

import (
    g "github.com/AllenDang/giu"
)

var cbSelected bool = true

func loop() {

    g.SingleWindow().Layout(
        g.Checkbox("Show Title", &amp;cbSelected).OnChange(
            func() {
                if cbSelected {
                    g.Context.GetPlatform().SetTitle("CheckBox")
                } else {
                    g.Context.GetPlatform().SetTitle("")
                }
            }),
    )
}

func main() {
    wnd := g.NewMasterWindow("Checkbox", 400, 200,
        g.MasterWindowFlagsFloating)
    wnd.Run(loop)
}

In the example, the checkbox widget displays a window title when selected.

var cbSelected bool = true

This is the boolean variable that stores the state of the widget.

g.Checkbox("Show Title", &amp;cbSelected).OnChange(
    func() {
        if cbSelected {
            g.Context.GetPlatform().SetTitle("CheckBox")
        } else {
            g.Context.GetPlatform().SetTitle("")
        }
    }),

A checkbox is created with the g.Checkbox function. It takes the 
label and the associated state variable as parameters. The OnChange
function is called when the checkbox is selected or deselected. We change the 
window title via g.Context.GetPlatform().SetTitle() function.

## Canvas widget

The canvas widged is used for drawing our custom shapes.

main.go
  

package main

import (
    "image"
    "image/color"

    g "github.com/AllenDang/giu"
)

func loop() {
    g.SingleWindow().Layout(
        g.Custom(func() {

            canvas := g.GetCanvas()
            col := color.RGBA{0, 140, 140, 255}

            canvas.AddLine(image.Pt(25, 25), image.Pt(100, 100), col, 1)
            canvas.AddRect(image.Pt(160, 25), image.Pt(260, 115),
                col, 5, g.DrawFlagsRoundCornersAll, 1)
            canvas.AddRectFilled(image.Pt(330, 25),
                image.Pt(430, 115), col, 5, 0)

            canvas.AddCircleFilled(image.Pt(150, 250), 60, col)
            canvas.AddTriangleFilled(image.Pt(330, 300),
                image.Pt(450, 200), image.Pt(500, 300), col)
        }),
    )
}

func main() {
    wnd := g.NewMasterWindow("Canvas", 450, 300,
        g.MasterWindowFlagsNotResizable)
    wnd.Run(loop)
}

In the example, we create a canvas widget and draw a line, two rectangles, 
a circle, and a triangle. 

g.Custom(func() {

A canvas is placed in a custom widget.

canvas := g.GetCanvas()

We retrieve the canvas for the current window with g.GetCanvas.

col := color.RGBA{0, 140, 140, 255}

We define a colour value.

canvas.AddLine(image.Pt(25, 25), image.Pt(100, 100), col, 1)

The AddLine function draws a line on the canvas. The first two 
parameters are the starting and ending points of the line. The third parameter 
is the line colour. The final parameter is the line thickness.

## Source

[The giu Github page](https://github.com/AllenDang/giu)

In this article we have worked with the giu UI library in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).