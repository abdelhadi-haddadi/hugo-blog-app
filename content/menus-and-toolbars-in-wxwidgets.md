+++
title = "Menus and toolbars in wxWidgets"
date = 2025-08-29T19:57:49.197+01:00
draft = false
description = "This part of the wxWidgets tutorial covers menus and toolbars."
image = "images/simplemenu.png"
imageBig = "images/simplemenu.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)

# Menus and toolbars in wxWidgets

last modified October 18, 2023

A menubar is one of the most visible parts of the GUI application. 
It is a group of commands located in various menus. While in console 
applications you had to remember all those arcane commands, here we 
have most of the commands grouped into logical parts. There are accepted 
standards that further reduce the amount of time spending to learn a new 
application. To implement a menubar in wxWidgets we need to have three 
classes: a wxMenuBar, a wxMenu, and a wxMenuItem.

## Simple menu example

Creating a menubar in wxWidgets is very simple. 

menu.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/menu.h&gt;

class SimpleMenu : public wxFrame
{
public:
    SimpleMenu(const wxString&amp; title);

    void OnQuit(wxCommandEvent&amp; event);

    wxMenuBar *menubar;
    wxMenu *file;

};

menu.cpp
  

```
#include "menu.h"

SimpleMenu::SimpleMenu(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(280, 180))
{

  menubar = new wxMenuBar;
  file = new wxMenu;
  file-&gt;Append(wxID_EXIT, wxT("&amp;Quit"));
  menubar-&gt;Append(file, wxT("&amp;File"));
  SetMenuBar(menubar);

  Connect(wxID_EXIT, wxEVT_COMMAND_MENU_SELECTED,
      wxCommandEventHandler(SimpleMenu::OnQuit));
  Centre();

}

void SimpleMenu::OnQuit(wxCommandEvent&amp; WXUNUSED(event))
{
  Close(true);
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
#include "menu.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    SimpleMenu *menu = new SimpleMenu(wxT("Simple Menu"));
    menu-&gt;Show(true);

    return true;
}

```

```
menubar = new wxMenuBar;

```

First we create a menubar object.

file = new wxMenu;

Next we create a menu object.

file-&gt;Append(wxID_EXIT, wxT("&amp;Quit"));

We append a menu item into the menu object. The first parameter is 
the id of the menu item. The second parameter is the name of the menu 
item. Here we did not create a wxMenuItem explicitly. It was created 
by the Append method behind the scenes. Later on, we create a 
wxMenuItem manually.

menubar-&gt;Append(file, wxT("&amp;File"));
SetMenuBar(menubar);

After that, we append a menu into the menubar. The &amp; character 
creates an accelerator key. The character that follows the &amp; is 
underlined. This way the menu is accessible via the Alt+F shortcut. 
In the end, we call the SetMenuBar method. This method belongs to 
the wxFrame widget. It sets up the menubar. 

![simplemenu.png](images/simplemenu.png)

Figure: Simple menu example

## Submenus

Each menu can also have a submenu. This way we can group similar commands 
into groups. For example we can place commands that hide or show various 
toolbars like personal bar, address bar, status bar, or navigation bar 
into a submenu called toolbars. Within a menu, we can separate commands
with a separator. It is a simple line. It is common practice to separate 
commands like new, open, save from commands like print, print preview 
with a single separator. In our example we see, how we can create 
submenus and menu separators. 

menu.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/menu.h&gt;

class SubMenu : public wxFrame
{
public:
  SubMenu(const wxString&amp; title);

  void OnQuit(wxCommandEvent &amp; event);

  wxMenuBar *menubar;
  wxMenu *file;
  wxMenu *imp;
  wxMenuItem *quit;

};

menu.cpp
  

```
#include "menu.h"

SubMenu::SubMenu(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(280, 180))
{

  menubar = new wxMenuBar;
  file = new wxMenu;

  file-&gt;Append(wxID_ANY, wxT("&amp;New"));
  file-&gt;Append(wxID_ANY, wxT("&amp;Open"));
  file-&gt;Append(wxID_ANY, wxT("&amp;Save"));
  file-&gt;AppendSeparator();

  imp = new wxMenu;
  imp-&gt;Append(wxID_ANY, wxT("Import newsfeed list..."));
  imp-&gt;Append(wxID_ANY, wxT("Import bookmarks..."));
  imp-&gt;Append(wxID_ANY, wxT("Import mail..."));

  file-&gt;AppendSubMenu(imp, wxT("I&amp;mport"));

  quit = new wxMenuItem(file, wxID_EXIT, wxT("&amp;Quit\tCtrl+W"));
  file-&gt;Append(quit);

  menubar-&gt;Append(file, wxT("&amp;File"));
  SetMenuBar(menubar);

  Connect(wxID_EXIT, wxEVT_COMMAND_MENU_SELECTED, 
      wxCommandEventHandler(SubMenu::OnQuit));
  Centre();

}

void SubMenu::OnQuit(wxCommandEvent&amp; WXUNUSED(event))
{
  Close(true);
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
#include "menu.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    SubMenu *smenu = new SubMenu(wxT("Submenu"));
    smenu-&gt;Show(true);

    return true;
}

```

We created one submenu in a file menu. It is an import submenu, 
which can be seen in Opera web browser.

file-&gt;AppendSeparator();

A menu separator line is created calling an AppendSeparator method.

imp = new wxMenu;
imp-&gt;Append(wxID_ANY, wxT("Import newsfeed list..."));
imp-&gt;Append(wxID_ANY, wxT("Import bookmarks..."));
imp-&gt;Append(wxID_ANY, wxT("Import mail..."));

file-&gt;AppendSubMenu(imp, wxT("I&amp;mport"));

A submenu is created like a normal menu. It is appended with a 
AppendSubMenu method.

![submenu.png](images/submenu.png)

Figure: Submenu

## Toolbars

Menus group all commands that we can use in an application. Toolbars provide a 
quick access to the most frequently used commands.

virtual wxToolBar* wxFrame::CreateToolBar(long style = wxTB_DEFAULT_STYLE,
    wxWindowID id = wxID_ANY, const wxString &amp; name = wxToolBarNameStr)

To create a toolbar, we call the CreateToolBar method of the frame widget.

## A simple toolbar

Our first example will create a simple toolbar. 

toolbar.h
  

#include &lt;wx/wx.h&gt;

class Toolbar : public wxFrame
{
public:
    Toolbar(const wxString&amp; title);

    void OnQuit(wxCommandEvent&amp; event);
};

toolbar.cpp
  

```
#include "toolbar.h"

Toolbar::Toolbar(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, 
                 wxDefaultPosition, wxSize(300, 250)) {

    wxImage::AddHandler(new wxPNGHandler);

    wxBitmap exit(wxT("exit.png"), wxBITMAP_TYPE_PNG);

    wxToolBar *toolbar = CreateToolBar();
    toolbar-&gt;AddTool(wxID_EXIT, wxT("Exit application"), exit);
    toolbar-&gt;Realize();

    Connect(wxID_EXIT, wxEVT_COMMAND_TOOL_CLICKED, 
        wxCommandEventHandler(Toolbar::OnQuit));
}

void Toolbar::OnQuit(wxCommandEvent&amp; WXUNUSED(event)) {
    
    Close(true);
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp {

    public:
        virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "toolbar.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit() {

    Toolbar *toolbar = new Toolbar(wxT("Toolbar"));
    toolbar-&gt;Show(true);

    return true;
}

```

In our example, we create a toolbar and one tool button. Clicking on the 
toolbar button will terminate the application.

wxToolBar *toolbar = CreateToolBar();

We create a toolbar.

toolbar-&gt;AddTool(wxID_EXIT, wxT("Exit application"), exit);

We add a tool to the toolbar. 

toolbar-&gt;Realize();

After we have added the tools, we call the Realize method.

![toolbar.png](images/toolbar.png)

Figure: Toolbar

#### Toolbars

If we want to have more than one toolbar, we must create them in a 
different way, e.g. other than calling the CreateToolbar method.

toolbars.h
  

#include &lt;wx/wx.h&gt;

class Toolbar : public wxFrame {

    public:
        Toolbar(const wxString&amp; title);

        void OnQuit(wxCommandEvent&amp; event);

        wxToolBar *toolbar1;
        wxToolBar *toolbar2;
};

toolbars.cpp
  

```
#include "toolbars.h"

Toolbar::Toolbar(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, 
                 wxDefaultPosition, wxSize(300, 250)) {

    wxImage::AddHandler(new wxPNGHandler);

    wxBitmap exit(wxT("exit.png"), wxBITMAP_TYPE_PNG);
    wxBitmap newb(wxT("new.png"), wxBITMAP_TYPE_PNG);
    wxBitmap open(wxT("open.png"), wxBITMAP_TYPE_PNG);
    wxBitmap save(wxT("save.png"), wxBITMAP_TYPE_PNG);

    wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);

    toolbar1 = new wxToolBar(this, wxID_ANY);
    toolbar1-&gt;AddTool(wxID_ANY, wxT("New"), newb);
    toolbar1-&gt;AddTool(wxID_ANY, wxT("Open"), open);
    toolbar1-&gt;AddTool(wxID_ANY, wxT(""), save);
    toolbar1-&gt;Realize();

    toolbar2 = new wxToolBar(this, wxID_ANY);
    toolbar2-&gt;AddTool(wxID_EXIT, wxT("Exit application"), exit);
    toolbar2-&gt;Realize();

    vbox-&gt;Add(toolbar1, 0, wxEXPAND);
    vbox-&gt;Add(toolbar2, 0, wxEXPAND);

    SetSizer(vbox);

    Connect(wxID_EXIT, wxEVT_COMMAND_TOOL_CLICKED, 
        wxCommandEventHandler(Toolbar::OnQuit));
}

void Toolbar::OnQuit(wxCommandEvent&amp; WXUNUSED(event)) {
    
    Close(true);
}

```

main.h
  

```
#include &lt;wx/wx.h&gt;

class MyApp : public wxApp {

    public:
        virtual bool OnInit();
};

```

main.cpp
  

```
#include "main.h"
#include "toolbars.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit() {

    Toolbar *toolbar = new Toolbar(wxT("Toolbar"));
    toolbar-&gt;Show(true);

    return true;
}

```

In our example, we create two horizontal toolbars. We place them in a 
vertical box sizer.

toolbar1 = new wxToolBar(this, wxID_ANY);
...
toolbar2 = new wxToolBar(this, wxID_ANY);

Here we create two toolbars.

vbox-&gt;Add(toolbar1, 0, wxEXPAND);
vbox-&gt;Add(toolbar2, 0, wxEXPAND);

And here we add them to the vertical box sizer.

![toolbars.png](images/toolbars.png)

Figure: Toolbars

In this part of the wxWidgets tutorial, we have covered menus and 
toolbars. 

[Contents](..)
[Previous](../firstprograms/)
[Next](../layoutmanagement/)