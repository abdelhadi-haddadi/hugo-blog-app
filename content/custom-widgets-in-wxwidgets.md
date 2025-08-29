+++
title = "Custom widgets in wxWidgets"
date = 2025-08-29T19:57:43.807+01:00
draft = false
description = "This part of the wxWidgets tutorial covers custom widgets."
image = "images/burningwidget.png"
imageBig = "images/burningwidget.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../gdi/)
[Next](../thetetrisgame/)

# Custom widgets in wxWidgets

last modified October 18, 2023

Toolkits usually provide only the most common widgets like buttons, 
text widgets, scrollbars, sliders etc. No toolkit can provide 
all possible widgets. wxWidgets has many various widgets; more specialised
widgets are created by client programmers. 

Custom widgets are created by using the drawing tools provided by the 
toolkit. There are two possibilities: a programmer can modify or enhance 
an existing widget, or he can create a custom widget from scratch.

## The Burning Widget

This is an example of a widget that we create from scratch.
This widget can be found in various media burning applications, like Nero Burning ROM. 

widget.h
  

#ifndef WIDGET_H
#define WIDGET_H

#include &lt;wx/wx.h&gt;

class Widget : public wxPanel
{
public:
  Widget(wxPanel *parent, int id );

  wxPanel *m_parent;

  void OnSize(wxSizeEvent&amp; event);
  void OnPaint(wxPaintEvent&amp; event);  

};

#endif

widget.cpp
  

```
#include &lt;wx/wx.h&gt;
#include "widget.h"
#include "burning.h"

int num[] = { 75, 150, 225, 300, 375, 450, 525, 600, 675 };
int asize = sizeof(num)/sizeof(num[1]);

Widget::Widget(wxPanel *parent, int id)
      : wxPanel(parent, id, wxDefaultPosition, wxSize(-1, 30), wxSUNKEN_BORDER)
{
 
  m_parent = parent;

  Connect(wxEVT_PAINT, wxPaintEventHandler(Widget::OnPaint));
  Connect(wxEVT_SIZE, wxSizeEventHandler(Widget::OnSize));

}

void Widget::OnPaint(wxPaintEvent&amp; event)
{
  wxFont font(9, wxFONTFAMILY_DEFAULT, wxFONTSTYLE_NORMAL,
            wxFONTWEIGHT_NORMAL, false, wxT("Courier 10 Pitch"));

  wxPaintDC dc(this);
  dc.SetFont(font);
  wxSize size = GetSize();
  int width = size.GetWidth();

  Burning *burn = (Burning *) m_parent-&gt;GetParent();

  int cur_width = burn-&gt;GetCurWidth();

  int step = (int) round(width / 10.0);

  int till = (int) ((width / 750.0) * cur_width);
  int full = (int) ((width / 750.0) * 700);

  if (cur_width &gt;= 700) {

      dc.SetPen(wxPen(wxColour(255, 255, 184))); 
      dc.SetBrush(wxBrush(wxColour(255, 255, 184)));
      dc.DrawRectangle(0, 0, full, 30);
      dc.SetPen(wxPen(wxColour(255, 175, 175)));
      dc.SetBrush(wxBrush(wxColour(255, 175, 175)));
      dc.DrawRectangle(full, 0, till-full, 30);

  } else { 

      dc.SetPen(wxPen(wxColour(255, 255, 184)));
      dc.SetBrush(wxBrush(wxColour(255, 255, 184)));
      dc.DrawRectangle(0, 0, till, 30);

  }

  dc.SetPen(wxPen(wxColour(90, 80, 60)));
  for ( int i=1; i &lt;= asize; i++ ) {

  dc.DrawLine(i*step, 0, i*step, 6);
  wxSize size = dc.GetTextExtent(wxString::Format(wxT("%d"), num[i-1]));
  dc.DrawText(wxString::Format(wxT("%d"), num[i-1]), 
      i*step-size.GetWidth()/2, 8);
   }
}

void Widget::OnSize(wxSizeEvent&amp; event)
{
  Refresh();
}

```

burning.h
  

```
#ifndef BURNING_H
#define BURNING_H

#include &lt;wx/wx.h&gt;
#include "widget.h"

class Burning : public wxFrame
{
public:
  Burning(const wxString&amp; title);

  void OnScroll(wxScrollEvent&amp; event);
  int GetCurWidth();

  
  wxSlider *m_slider;
  Widget *m_wid;

  int cur_width;

};

#endif

```

burning.cpp
  

```
#include "burning.h"
#include "widget.h"

int ID_SLIDER = 1;

Burning::Burning(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(350, 200))
{

  cur_width = 75;

  wxPanel *panel = new wxPanel(this, wxID_ANY);
  wxPanel *centerPanel = new wxPanel(panel, wxID_ANY);

  m_slider = new wxSlider(centerPanel, ID_SLIDER, 75, 0, 750, wxPoint(-1, -1), 
      wxSize(150, -1), wxSL_LABELS);

  wxBoxSizer *vbox = new wxBoxSizer(wxVERTICAL);
  wxBoxSizer *hbox = new wxBoxSizer(wxHORIZONTAL);
  wxBoxSizer *hbox2 = new wxBoxSizer(wxHORIZONTAL);
  wxBoxSizer *hbox3 = new wxBoxSizer(wxHORIZONTAL);

  m_wid = new Widget(panel, wxID_ANY);
  hbox-&gt;Add(m_wid, 1, wxEXPAND);

  hbox2-&gt;Add(centerPanel, 1, wxEXPAND);
  hbox3-&gt;Add(m_slider, 0, wxTOP | wxLEFT, 35);

  centerPanel-&gt;SetSizer(hbox3);

  vbox-&gt;Add(hbox2, 1, wxEXPAND);
  vbox-&gt;Add(hbox, 0, wxEXPAND);

  panel-&gt;SetSizer(vbox);
  m_slider-&gt;SetFocus();

  Connect(ID_SLIDER, wxEVT_COMMAND_SLIDER_UPDATED, 
      wxScrollEventHandler(Burning::OnScroll)); 

  Centre();

}

void Burning::OnScroll(wxScrollEvent&amp; WXUNUSED(event))
{
 cur_width = m_slider-&gt;GetValue();
 m_wid-&gt;Refresh();
}

int Burning::GetCurWidth() 
{
 return cur_width;
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
#include "burning.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    Burning *burning = new Burning(wxT("The Burning Widget"));
    burning-&gt;Show(true);

    return true;
}

```

We put a wxPanel on the bottom of the window and draw the entire 
widget manually. All the important code resides in the OnPaint
method of the widget class. This widget shows graphically the total 
capacity of a medium and the free space available to us. The widget is controlled 
by a slider. The minimum value of our custom widget is 0, the maximum is 750. 
If we reach value 700, we began drawing in red colour. This indicates overburning.

wxSize size = GetSize();
int width = size.GetWidth();
... 
int till = (int) ((width / 750.0) * cur_width);
int full = (int) ((width / 750.0) * 700);

We draw the widget dynamically. The greater the window, the greater the 
burning widget. And vice versa. That is why we must calculate the size 
of the wxPanel onto which we draw the custom widget. The till 
parameter determines the total size to be drawn. This value comes from the slider 
widget. It is a proportion of the whole area. The full parameter 
determines the point, where we begin to draw in red colour. Notice the use of floating 
point arithmetics. This is to achieve greater precision.

The actual drawing consists of three steps. We draw the yellow or red 
and yellow rectangle. Then we draw the vertical lines, which divide the 
widget into several parts. Finally, we draw the numbers, which indicate 
the capacity of the medium. 

void Widget::OnSize(wxSizeEvent&amp; event)
{
  Refresh();
}

Every time the window is resized, we refresh the widget. This causes 
the widget to repaint itself.

void Burning::OnScroll(wxScrollEvent&amp; WXUNUSED(event))
{
 cur_width = m_slider-&gt;GetValue();
 m_wid-&gt;Refresh();
}

If we scroll the thumb of the slider, we get the actual value and save it 
into the cur_width variable. This value is used, when the burning 
widget is drawn. Then we cause the widget to be redrawn.

![burningwidget.png](images/burningwidget.png)

Figure: Burning Widget

In this part of the wxWidgets tutorial, we have created a custom widget.

[Contents](..)
[Previous](../gdi/)
[Next](../thetetrisgame/)