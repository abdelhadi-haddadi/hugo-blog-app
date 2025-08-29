+++
title = "Dialogs in wxWidgets"
date = 2025-08-29T19:57:44.517+01:00
draft = false
description = "This part of the wxWidgets tutorial covers dialogs."
image = "images/idialog.jpg"
imageBig = "images/idialog.jpg"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../events/)
[Next](../widgets/)

# Dialogs in wxWidgets

last modified October 18, 2023

Dialog windows or dialogs are an indispensable part of most modern GUI 
applications. A dialog is defined as a conversation between two or more 
persons. In a computer application a dialog is a window which is used to 
"talk" to the application. A dialog is used to input data, modify data, 
change the application settings etc. Dialogs are important means of 
communication between a user and a computer program.

There are essentially two types of dialogs: predefined dialogs 
and custom dialogs. 

## Predefined dialogs

Predefined dialogs are dialogs available in the wxWidgets toolkit. These are 
dialogs for common programming tasks like showing text, receiving input, 
loading and saving files etc. They save programmer's time and enhance 
using some standard behaviour. 

## Message dialogs

Message dialogs are used to show messages to the user. They are customisable. 
We can change icons and buttons that will be shown in a dialog.

Messages.h
  

#include &lt;wx/wx.h&gt;

class Messages : public wxFrame
{
public:
    Messages(const wxString&amp; title);
    
    void ShowMessage1(wxCommandEvent &amp; event);
    void ShowMessage2(wxCommandEvent &amp; event);
    void ShowMessage3(wxCommandEvent &amp; event);
    void ShowMessage4(wxCommandEvent &amp; event);

};

const int ID_INFO = 1;
const int ID_ERROR = 2;
const int ID_QUESTION = 3;
const int ID_ALERT = 4;

Messages.cpp
  

```
#include "Messages.h"

Messages::Messages(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(210, 110))
{

  wxPanel *panel = new wxPanel(this, wxID_ANY);

  wxBoxSizer *hbox = new wxBoxSizer(wxHORIZONTAL);
  wxGridSizer *gs = new wxGridSizer(2, 2, 2, 2);

  wxButton *btn1 = new wxButton(panel, ID_INFO, wxT("Info"));
  wxButton *btn2 = new wxButton(panel, ID_ERROR, wxT("Error"));
  wxButton *btn3 = new wxButton(panel, ID_QUESTION, wxT("Question"));
  wxButton *btn4 = new wxButton(panel, ID_ALERT, wxT("Alert"));

  Connect(ID_INFO, wxEVT_COMMAND_BUTTON_CLICKED, 
      wxCommandEventHandler(Messages::ShowMessage1));
  Connect(ID_ERROR, wxEVT_COMMAND_BUTTON_CLICKED, 
      wxCommandEventHandler(Messages::ShowMessage2));
  Connect(ID_QUESTION, wxEVT_COMMAND_BUTTON_CLICKED, 
      wxCommandEventHandler(Messages::ShowMessage3));
  Connect(ID_ALERT, wxEVT_COMMAND_BUTTON_CLICKED, 
      wxCommandEventHandler(Messages::ShowMessage4));

  gs-&gt;Add(btn1, 1, wxEXPAND);
  gs-&gt;Add(btn2, 1);
  gs-&gt;Add(btn3, 1);
  gs-&gt;Add(btn4, 1);

  hbox-&gt;Add(gs, 0, wxALL, 15);
  panel-&gt;SetSizer(hbox);

  Center();
}

void Messages::ShowMessage1(wxCommandEvent&amp; event) 
{
  wxMessageDialog *dial = new wxMessageDialog(NULL, 
      wxT("Download completed"), wxT("Info"), wxOK);
  dial-&gt;ShowModal();
}

void Messages::ShowMessage2(wxCommandEvent&amp; event) 
{
   wxMessageDialog *dial = new wxMessageDialog(NULL, 
      wxT("Error loading file"), wxT("Error"), wxOK | wxICON_ERROR);
   dial-&gt;ShowModal();
}

void Messages::ShowMessage3(wxCommandEvent&amp; event) 
{
  wxMessageDialog *dial = new wxMessageDialog(NULL, 
      wxT("Are you sure to quit?"), wxT("Question"), 
      wxYES_NO | wxNO_DEFAULT | wxICON_QUESTION);
  dial-&gt;ShowModal();
}

void Messages::ShowMessage4(wxCommandEvent&amp; event) 
{
  wxMessageDialog *dial = new wxMessageDialog(NULL, 
      wxT("Unallowed operation"), wxT("Exclamation"), 
      wxOK | wxICON_EXCLAMATION);
  dial-&gt;ShowModal();
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp
{
  public:
    virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "Messages.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

  Messages *msgs = new Messages(wxT("Messages"));
  msgs-&gt;Show(true);

  return true;
}

```

In our example, we have created four buttons and put them in a grid sizer. 
These buttons will show four different dialog windows. We create them by 
specifying different style flags.

wxMessageDialog *dial = new wxMessageDialog(NULL, 
   wxT("Error loading file"), wxT("Error"), wxOK | wxICON_ERROR);
dial-&gt;ShowModal();

The creation of the message dialog is simple. We set the dialog to be a toplevel 
window by providing NULL as a parent. The two strings provide the 
message text and the dialog title. We show an OK button and an error icon by 
specifying the wxOK and wxICON_ERROR flags. To show 
the dialog on screen, we call the ShowModal method.

![idialog.jpg](images/idialog.jpg)

![qdialog.jpg](images/qdialog.jpg)

![adialog.jpg](images/adialog.jpg)

![edialog.jpg](images/edialog.jpg)

## wxFileDialog

This is a common dialog for opening and saving files. 

openfile.h
  

#include &lt;wx/wx.h&gt;

class Openfile : public wxFrame
{
public:
  Openfile(const wxString&amp; title);

  void OnOpen(wxCommandEvent&amp; event);

  wxTextCtrl *tc;

};

openfile.cpp
  

```
#include "openfile.h"

Openfile::Openfile(const wxString &amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200))
{

  wxMenuBar *menubar = new wxMenuBar;
  wxMenu *file = new wxMenu;
  file-&gt;Append(wxID_OPEN, wxT("&amp;Open"));
  menubar-&gt;Append(file, wxT("&amp;File"));
  SetMenuBar(menubar);

  Connect(wxID_OPEN, wxEVT_COMMAND_MENU_SELECTED, 
      wxCommandEventHandler(Openfile::OnOpen));

  tc = new wxTextCtrl(this, -1, wxT(""), wxPoint(-1, -1), 
      wxSize(-1, -1), wxTE_MULTILINE);

  Center();

}

void Openfile::OnOpen(wxCommandEvent&amp; event)
{

  wxFileDialog * openFileDialog = new wxFileDialog(this);

  if (openFileDialog-&gt;ShowModal() == wxID_OK){
      wxString fileName = openFileDialog-&gt;GetPath();
      tc-&gt;LoadFile(fileName);     
  }
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp
{
  public:
    virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "openfile.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    Openfile *open = new Openfile(wxT("Openfile"));
    open-&gt;Show(true);

    return true;
}

```

In our example, we display a open file menu item and a simple 
multiline text control. If we click on the open file menu item 
a wxFileDialog is displayed. We can load some simple 
text files into the text control.

tc = new wxTextCtrl(this, -1, wxT(""), wxPoint(-1, -1), 
    wxSize(-1, -1), wxTE_MULTILINE);

We load text files into this text control.

wxFileDialog * openFileDialog = new wxFileDialog(this);

Here we create a wxFileDialog. We use the default parameters. 
(The open file dialog is the default dialog.)

if (openFileDialog-&gt;ShowModal() == wxID_OK){
    wxString fileName = openFileDialog-&gt;GetPath();
    tc-&gt;LoadFile(fileName);     
}

Here we show the dialog. We get the selected file name and load the file 
into the text control. 

![wxfiledialog.jpg](images/wxfiledialog.jpg)

Figure: wxFileDialog on Linux

## wxFontDialog

This is a common dialog for choosing a font. 

fontdialog.h
  

#include &lt;wx/wx.h&gt;

class ChangeFont : public wxFrame
{
public:
  ChangeFont(const wxString&amp; title);

  void OnOpen(wxCommandEvent&amp; event);

  wxStaticText *st;

};

const int ID_FONTDIALOG = 1;

fontdialog.cpp
  

```
#include &lt;wx/fontdlg.h&gt;
#include "fontdialog.h"

ChangeFont::ChangeFont(const wxString &amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200))
{

  wxPanel *panel = new wxPanel(this, -1);

  wxMenuBar *menubar = new wxMenuBar;
  wxMenu *file = new wxMenu;
  file-&gt;Append(ID_FONTDIALOG, wxT("&amp;Change font"));
  menubar-&gt;Append(file, wxT("&amp;File"));
  SetMenuBar(menubar);

  Connect(ID_FONTDIALOG, wxEVT_COMMAND_MENU_SELECTED, 
      wxCommandEventHandler(ChangeFont::OnOpen));

  st = new wxStaticText(panel, wxID_ANY, wxT("The Agoge"), 
      wxPoint(20, 20));

  Center();

}

void ChangeFont::OnOpen(wxCommandEvent&amp; WXUNUSED(event))
{
  wxFontDialog *fontDialog = new wxFontDialog(this);

  if (fontDialog-&gt;ShowModal() == wxID_OK) {
    st-&gt;SetFont(fontDialog-&gt;GetFontData().GetChosenFont());
  }

}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp
{
  public:
    virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "fontdialog.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    ChangeFont *change = new ChangeFont(wxT("Change font"));
    change-&gt;Show(true);

    return true;
}

```

In this example, we change the font of a static text example. 

st = new wxStaticText(panel, wxID_ANY, wxT("The Agoge"), 
    wxPoint(20, 20));

Here we display a static text on the panel. We change its font 
using the wxFontDialog.

wxFontDialog *fontDialog = new wxFontDialog(this);

if (fontDialog-&gt;ShowModal() == wxID_OK) {
  st-&gt;SetFont(fontDialog-&gt;GetFontData().GetChosenFont());
}

In these code lines, we show the font dialog. Then we get the choosen font. 
And finally, we change the font of the static text, we created earlier.

![fontdialog.jpg](images/fontdialog.jpg)

Figure: Font dialog

## A custom dialog

In the next example we create a custom dialog. An image editing application 
can change a color depth of a picture. To provide this funcionality, we could 
create a suitable custom dialog. 

customdialog.h
  

#include &lt;wx/wx.h&gt;

class CustomDialog : public wxDialog
{
public:
  CustomDialog(const wxString&amp; title);

};

customdialog.cpp
  

```
#include "customdialog.h"

CustomDialog::CustomDialog(const wxString &amp; title)
       : wxDialog(NULL, -1, title, wxDefaultPosition, wxSize(250, 230))
{

  wxPanel *panel = new wxPanel(this, -1);

  wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);
  wxBoxSizer *hbox = new wxBoxSizer(wxHORIZONTAL);

  wxStaticBox *st = new wxStaticBox(panel, -1, wxT("Colors"), 
      wxPoint(5, 5), wxSize(240, 150));
  wxRadioButton *rb = new wxRadioButton(panel, -1, 
      wxT("256 Colors"), wxPoint(15, 30), wxDefaultSize, wxRB_GROUP);

  wxRadioButton *rb1 = new wxRadioButton(panel, -1, 
      wxT("16 Colors"), wxPoint(15, 55));
  wxRadioButton *rb2 = new wxRadioButton(panel, -1, 
      wxT("2 Colors"), wxPoint(15, 80));
  wxRadioButton *rb3 = new wxRadioButton(panel, -1, 
      wxT("Custom"), wxPoint(15, 105));
  wxTextCtrl *tc = new wxTextCtrl(panel, -1, wxT(""), 
      wxPoint(95, 105));

  wxButton *okButton = new wxButton(this, -1, wxT("Ok"), 
      wxDefaultPosition, wxSize(70, 30));
  wxButton *closeButton = new wxButton(this, -1, wxT("Close"), 
      wxDefaultPosition, wxSize(70, 30));

  hbox-&gt;Add(okButton, 1);
  hbox-&gt;Add(closeButton, 1, wxLEFT, 5);

  vbox-&gt;Add(panel, 1);
  vbox-&gt;Add(hbox, 0, wxALIGN_CENTER | wxTOP | wxBOTTOM, 10);

  SetSizer(vbox);

  Centre();
  ShowModal();

  Destroy(); 
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp
{
  public:
    virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "customdialog.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    CustomDialog *custom = new CustomDialog(wxT("CustomDialog"));
    custom-&gt;Show(true);

    return true;
}

```

This example is a dialog based application. We illustrate, how to 
create a custom dialog. 

class CustomDialog : public wxDialog

A custom dialog is based on the wxDialog class.

wxStaticBox *st = new wxStaticBox(panel, -1, wxT("Colors"), 
    wxPoint(5, 5), wxSize(240, 150));
wxRadioButton *rb = new wxRadioButton(panel, -1, 
    wxT("256 Colors"), wxPoint(15, 30), wxDefaultSize, wxRB_GROUP);

Note that wxStaticBox widget must be created before the widgets that 
it contains, and that those widgets should be siblings, not children, 
of the static box.

ShowModal();
Destroy();

To show the dialog on the screen, we call the ShowModal method. 
To clear the dialog from the memory, we call the Destroy method.

![customdialog.jpg](images/customdialog.jpg)

Figure: Custom dialog

This part of the wxWidgets tutorial was dedicated to dialogs.

[Contents](..)
[Previous](../events/)
[Next](../widgets/)