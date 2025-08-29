+++
title = "Drag and Drop in wxWidgets"
date = 2025-08-29T19:57:43.932+01:00
draft = false
description = "This part of the wxWidgets tutorial covers drag and drop operations."
image = "images/textdrop.jpg"
imageBig = "images/textdrop.jpg"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../widgetsII/)
[Next](../gdi/)

# Drag and Drop in wxWidgets

last modified October 18, 2023

Wikipedia defines drag &amp; drop as the action of 
(or support for the action of) clicking on a virtual object and dragging 
it to a different location or onto another virtual object. In general, it 
can be used to invoke many kinds of actions, or create various types of
associations between two abstract objects. 

Drag and drop operations enable us to do complex things intuitively. 

In drag and drop we basically drag some data from a data source to a data target. 
We deal with the following objects:

  - Data object

  - Data source

  - Data target

For drag &amp; drop of text, wxWidgets has a predefined wxTextDropTarget class.

In the following example, we drag and drop file names from the upper 
list control to the bottom one.

textdrop.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/dnd.h&gt;

class TextDrop : public wxFrame
{
public:
  TextDrop(const wxString&amp; title);
    
  void OnSelect(wxCommandEvent&amp; event);
  void OnDragInit(wxListEvent&amp; event);

  wxGenericDirCtrl *m_gdir;
  wxListCtrl *m_lc1;
  wxListCtrl *m_lc2;

};

class MyTextDropTarget : public wxTextDropTarget
{
public:
  MyTextDropTarget(wxListCtrl *owner);

  virtual bool OnDropText(wxCoord x, wxCoord y, 
      const wxString&amp; data);

  wxListCtrl *m_owner;
 
};

textdrop.cpp
  

```
#include "textdrop.h"
#include &lt;wx/treectrl.h&gt;
#include &lt;wx/dirctrl.h&gt;
#include &lt;wx/dir.h&gt;
#include &lt;wx/splitter.h&gt;

TextDrop::TextDrop(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(300, 200))
{
 
  wxSplitterWindow *spl1 = new wxSplitterWindow(this, -1);
  wxSplitterWindow *spl2 = new wxSplitterWindow(spl1, -1);
  m_gdir = new wxGenericDirCtrl(spl1, -1, wxT("/home/"), 
      wxPoint(-1, -1), wxSize(-1, -1), wxDIRCTRL_DIR_ONLY);

  m_lc1 = new wxListCtrl(spl2, -1, wxPoint(-1, -1), 
      wxSize(-1, -1), wxLC_LIST);
  m_lc2 = new wxListCtrl(spl2, -1, wxPoint(-1, -1), 
      wxSize(-1, -1), wxLC_LIST);

  MyTextDropTarget *mdt = new MyTextDropTarget(m_lc2);
  m_lc2-&gt;SetDropTarget(mdt);

  Connect(m_lc1-&gt;GetId(), wxEVT_COMMAND_LIST_BEGIN_DRAG, 
      wxListEventHandler(TextDrop::OnDragInit));

  wxTreeCtrl *tree = m_gdir-&gt;GetTreeCtrl();

  spl2-&gt;SplitHorizontally(m_lc1, m_lc2);
  spl1-&gt;SplitVertically(m_gdir, spl2);

  Connect(tree-&gt;GetId(), wxEVT_COMMAND_TREE_SEL_CHANGED, 
      wxCommandEventHandler(TextDrop::OnSelect));

  Center();
}

MyTextDropTarget::MyTextDropTarget(wxListCtrl *owner)
{
  m_owner = owner;
}

bool MyTextDropTarget::OnDropText(wxCoord x, wxCoord y, 
    const wxString&amp; data)
{

  m_owner-&gt;InsertItem(0, data);
  return true;

}

void TextDrop::OnSelect(wxCommandEvent&amp; event)
{
  wxString filename;
  wxString path = m_gdir-&gt;GetPath();
  wxDir dir(path);

  bool cont = dir.GetFirst(&amp;filename, wxEmptyString, wxDIR_FILES);

  int i = 0;

  m_lc1-&gt;ClearAll();
  m_lc2-&gt;ClearAll();

  while ( cont )
  {
      m_lc1-&gt;InsertItem(i, filename);
      cont = dir.GetNext(&amp;filename);
      i++;
  }
}

void TextDrop::OnDragInit(wxListEvent&amp; event)
{

 wxString text = m_lc1-&gt;GetItemText(event.GetIndex());
  
 wxTextDataObject tdo(text);
 wxDropSource tds(tdo, m_lc1);
 tds.DoDragDrop(wxDrag_CopyOnly);

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
#include "textdrop.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    TextDrop *td = new TextDrop(wxT("TextDrop"));
    td-&gt;Show(true);

    return true;
}

```

In our example, we have a window separated into three parts. This is 
done by the wxSplitterWindow widget. In the left part of the window, 
we have a generic directory control. We display all directories available under our
filesystem. In the right part there are two windows. The first displays 
all files under a selected directory. The second one is used for dragging the files. 

MyTextDropTarget *mdt = new MyTextDropTarget(m_lc2);
m_lc2-&gt;SetDropTarget(mdt);

Here we define a text drop target. 

wxString text = m_lc1-&gt;GetItemText(event.GetIndex());

wxTextDataObject tdo(text);
wxDropSource tds(tdo, m_lc1);
tds.DoDragDrop(wxDrag_CopyOnly);

In the OnDragInit method, we define a text data object and a 
drop source object. We call the DoDragDrop method. 
The wxDrag_CopyOnly constant allows only copying of data. 

bool MyTextDropTarget::OnDropText(wxCoord x, wxCoord y, 
    const wxString&amp; data)
{
  m_owner-&gt;InsertItem(0, data);
  return true;
}

During the dropping operation, we insert the text data into the list control.

![textdrop.jpg](images/textdrop.jpg)

Figure: Drag &amp; Drop

In this chapter, we covered drag and drop operations in wxWidgets.

[Contents](..)
[Previous](../widgetsII/)
[Next](../gdi/)