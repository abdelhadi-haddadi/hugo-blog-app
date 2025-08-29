+++
title = "Dialogs in Tcl/Tk"
date = 2025-08-29T19:57:32.212+01:00
draft = false
description = "This part of the Tcl/Tk tutorial covers dialogs, including message box, color dialog, and file dialog."
image = "images/messagebox.png"
imageBig = "images/messagebox.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menustoolbars/)
[Next](../drawing/)

# Dialogs in Tcl/Tk

last modified October 18, 2023

In this part of the Tcl/Tk tutorial, we work with dialogs. 

A dialog is defined as a conversation between two or more persons. In a computer 
application a dialog is a window which is used to "talk" to the application. 
A dialog is used to input data, modify data, change the application settings etc. 
Dialogs are important means of communication between a user and a computer program. 

## Message boxes

Message boxes are convenient dialogs that provide messages to the user of the application. 
The message consists of text and image data. Message boxes in Tk are created with the 
tk_messageBox command.

message_boxes.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this program, we show various
# message boxes.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

frame .fr
pack .fr 

ttk::button .fr.erButton -text Error -command onError
grid .fr.erButton 
ttk::button .fr.wButton -text Warning -command onWarn
grid .fr.wButton -row 1 -column 0 
ttk::button .fr.queButton -text Question -command onQuest
grid .fr.queButton -row 0 -column 1 -sticky we -columnspan 6
ttk::button .fr.infButton -text Information -command onInfo
grid .fr.infButton -row 1 -column 1

proc onError {} {
    tk_messageBox -type ok -icon error -title Error \
    -message "Could not open file"
}

proc onWarn {} {
    tk_messageBox -type ok -icon warning -title Warning \
    -message "Deprecated function call"
}

proc onQuest {} {
    tk_messageBox -type ok -icon question -title Question \
    -message "Are you sure to quit?"
}

proc onInfo {} {
    tk_messageBox -type ok -icon info -title Information \
    -message "Download completed"
}

wm title . "message boxes" 
wm geometry . 300x250+300+300

We use the grid manager to set up a grid of
four buttons. Each of the buttons shows a different message box. 

ttk::button .fr.erButton -text Error -command onError
grid .fr.erButton 

We create an error button, which calls the onError procedure. Inside the
method, we show the error message dialog. The button is placed into the 
first cell of the grid. Widgets inside the ttk namespace are themed. 
The button and ttk::button are the same buttons
in terms of functionality. The difference is that we can apply themes on
the latter. 

proc onError {} {
    tk_messageBox -type ok -icon error -title Error \
    -message "Could not open file"
}

In case we pressed the error button, we show the error dialog. 
We use the tk_messageBox command to create the message box.
The -type option specifies which buttons are shown in the dialog.
In our case it is a single OK button. The -icon specifies the type of the
icon to be shown. The -title provides the title of the dialog and the
-message its message. 

![messagebox.png](images/messagebox.png)

Figure: Warning message dialog

## Color chooser

The color chooser is a dialog for selecting a colour.
We use the tk_chooseColor command to display
the dialog. 

color_chooser.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this script, we use tk_chooseColor
# dialog to change the colour of the text.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

label .l -text ZetCode
place .l -x 20 -y 90

button .b -text "Choose a color..." \
        -command "onSelect .l" 
place .b -x 20 -y 30

wm title . "color dialog" 
wm geometry . 350x200+300+300

proc onSelect {widget} {
    set col \
        [tk_chooseColor -title "Choose a color" -parent .]
    $widget configure -foreground $col
}

We have a button and a label. Clicking on the button we show a color chooser
dialog. We change the colour of the label text by selecting a colour from 
the dialog.

label .l -text ZetCode
place .l -x 20 -y 90

We create a label widget and place it on the window. 

button .b -text "Choose a color..." \
        -command "onSelect .l" 
place .b -x 20 -y 30

We create a button widget and place it on 
the window. We pass the widget path of the label to the
onSelect procedure, which shows the dialog and changes 
the colour of the label.

proc onSelect {widget} {
    set col \
        [tk_chooseColor -title "Choose a color" -parent .]
    $widget configure -foreground $col
}

Inside the onSelect procedure, we show the dialog and change the label
colour. First we display the dialog and store the chosen colour value
in the col variable. Later we use the configure command
to change the foreground of the label. The command is executed on the
widget's path name. The label's path name was passed to the procedure. 

![colorchooser.png](images/colorchooser.png)

Figure: Color chooser

## File dialog

tk_getOpenFile dialog allows a user to select a file from
the filesystem. 

file_dialog.tcl
  

#!/usr/bin/wish

# ZetCode Tcl/Tk tutorial
#
# In this program, we use the
# tk_getOpenFile dialog to select a file from
# a filesystem.
#
# Author: Jan Bodnar
# Website: www.zetcode.com

set types {
    {"All Source Files"     {.tcl .tk } }
    {"Image Files"          {.gif .png .jpg} }
    {"All files"            *}
}

proc onSelect { label } {
    global types   
    set file [tk_getOpenFile -filetypes $types -parent .]
    $label configure -text $file
}

label .l -text "..."
place .l -x 20 -y 90

button .b -text "Select a file" \
        -command "onSelect .l"
place .b -x 20 -y 30

wm title . "openfile" 
wm geometry . 350x200+300+300

In our code example, we use the tk_getOpenFile dialog to 
select a file and display its name in a label widget.

set types {
    {"All Source Files"     {.tcl .tk } }
    {"Image Files"          {.gif .png .jpg} }
    {"All files"            *}
}

These are file filters. These filters can be used to show only
specific files in the dialog. 

proc onSelect { label } {
    global types   
    set file [tk_getOpenFile -filetypes $types -parent .]
    $label configure -text $file
}

We show the dialog with the tk_getOpenFile command.
We apply the file filters using the -filetypes option. The
selected file name is stored in the file variable. The
configure command is used to change the text of the
label. 

![filedialog.png](images/filedialog.png)

Figure: File dialog

In this part of the Tcl/Tk tutorial, we worked with dialog windows. 

[Contents](..) 
[Previous](../menustoolbars/)
[Next](../drawing/)