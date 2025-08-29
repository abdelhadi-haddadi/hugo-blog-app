+++
title = "wxWidgets widgets"
date = 2025-08-29T19:57:49.608+01:00
draft = false
description = "This part of the wxWidgets tutorial covers widgets."
image = "images/checkbox.png"
imageBig = "images/checkbox.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)
[Next](../widgetsII/)

# wxWidgets widgets

last modified October 18, 2023

In this chapter, we show small examples of several widgets, 
available in wxWidgets. Widgets are building blocks of our applications. 
wxWidgets consists of a large amount of useful widgets. A *widget* 
is a basic GUI object. A widget gave wxWidgets toolkit a name. 
This term is used on UNIX systems. On windows, a widget is often called a control. 

## wxCheckBox

wxCheckBox is a widget that has two states: on and off. It is 
a box with a label. The label can be set to the right or to the left of the 
box. If the checkbox is checked, it is represented by a tick in a box. A checkbox 
can be used to show or hide a splashscreen at startup, toggle visibility 
of a toolbar etc.

checkbox.h
  

#include &lt;wx/wx.h&gt;

class CheckBox : public wxFrame
{
public:
    CheckBox(const wxString&amp; title);

    void OnToggle(wxCommandEvent&amp; event);

    wxCheckBox *m_cb;

};

const int ID_CHECKBOX = 100;

checkbox.cpp
  

```
#include "checkbox.h"

CheckBox::CheckBox(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(270, 150))
{
  wxPanel *panel = new wxPanel(this, wxID_ANY);

  m_cb = new wxCheckBox(panel, ID_CHECKBOX, wxT("Show title"), 
                        wxPoint(20, 20));
  m_cb-&gt;SetValue(true);
  Connect(ID_CHECKBOX, wxEVT_COMMAND_CHECKBOX_CLICKED, 
          wxCommandEventHandler(CheckBox::OnToggle));
  Centre();
}

void CheckBox::OnToggle(wxCommandEvent&amp; WXUNUSED(event))
{

  if (m_cb-&gt;GetValue()) {
      this-&gt;SetTitle(wxT("CheckBox"));
  } else {
      this-&gt;SetTitle(wxT(" "));
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
#include "checkbox.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    CheckBox *cb = new CheckBox(wxT("CheckBox"));
    cb-&gt;Show(true);

    return true;
}

```

In our example, we display one checkbox on the window. We toggle the 
title of the window by clicking on the checkbox.

m_cb = new wxCheckBox(panel, ID_CHECKBOX, wxT("Show title"), 
                    wxPoint(20, 20));
m_cb-&gt;SetValue(true);

We create a checkbox. By default, the title is visible. So we check 
the checkbox by calling the method SetValue.

Connect(ID_CHECKBOX, wxEVT_COMMAND_CHECKBOX_CLICKED, 
        wxCommandEventHandler(CheckBox::OnToggle));

If we click on the checkbox, a wxEVT_COMMAND_CHECKBOX_CLICKED event 
is generated. We connect this event to the
user defined OnToggle method.

if (m_cb-&gt;GetValue()) {
    this-&gt;SetTitle(wxT("CheckBox"));
} else {
    this-&gt;SetTitle(wxT(" "));
}

Inside the OnToggle method, we check the state of the 
checkbox. If it is checked, we display "CheckBox" string in the titlebar, 
otherwise we clear the title.

![checkbox.png](images/checkbox.png)

Figure: wxCheckBox

## wxBitmapButton

A bitmap button is a button that displays a bitmap. A bitmap button can 
have three other states. Selected, focused and displayed. We can set a 
specific bitmap for those states.

bitmapbutton.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/slider.h&gt;

class BitmapButton : public wxFrame
{
public:
  BitmapButton(const wxString&amp; title);

  wxSlider *slider;
  wxBitmapButton *button;
  int pos;

  void OnScroll(wxScrollEvent&amp; event);

};

const int ID_SLIDER = 100;

bitmapbutton.cpp
  

```
#include "bitmapbutton.h"

BitmapButton::BitmapButton(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(250, 130))
{
  wxImage::AddHandler( new wxPNGHandler );
  wxPanel *panel = new wxPanel(this);
  slider = new wxSlider(panel, ID_SLIDER, 0, 0, 100, 
      wxPoint(10, 30), wxSize(140, -1));

  button = new wxBitmapButton(panel, wxID_ANY, wxBitmap(wxT("mute.png"), 
      wxBITMAP_TYPE_PNG), wxPoint(180, 20));

  Connect(ID_SLIDER, wxEVT_COMMAND_SLIDER_UPDATED, 
      wxScrollEventHandler(BitmapButton::OnScroll));  
  Center();
}

void BitmapButton::OnScroll(wxScrollEvent&amp; event)
{
  pos = slider-&gt;GetValue(); 

  if (pos == 0) {
      button-&gt;SetBitmapLabel(wxBitmap(wxT("mute.png"), wxBITMAP_TYPE_PNG));
  } else if (pos &gt; 0 &amp;&amp; pos &lt;= 30 ) {
      button-&gt;SetBitmapLabel(wxBitmap(wxT("min.png"), wxBITMAP_TYPE_PNG));
  } else if (pos &gt; 30 &amp;&amp; pos &lt; 80 ) {
      button-&gt;SetBitmapLabel(wxBitmap(wxT("med.png"), wxBITMAP_TYPE_PNG));
  } else {
      button-&gt;SetBitmapLabel(wxBitmap(wxT("max.png"), wxBITMAP_TYPE_PNG));
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
#include "bitmapbutton.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    BitmapButton *bb = new BitmapButton(wxT("BitmapButton"));
    bb-&gt;Show(true);

    return true;
}

```

In our example, we have a slider and a bitmap button. We simulate a 
volume control. By dragging the handle of a slider, we change a bitmap on the button.

wxImage::AddHandler( new wxPNGHandler );

We use PNG images, so we must initialise a PNG image handler. 

button = new wxBitmapButton(panel, wxID_ANY, wxBitmap(wxT("mute.png"), 
    wxBITMAP_TYPE_PNG), wxPoint(180, 20));

We create a bitmap button. We specify a bitmap type, in our case 
wxBITMAP_TYPE_PNG

pos = slider-&gt;GetValue(); 

We get the slider value. Depending on this value, we set a bitmap for 
our button. We have four volume states: mute, minimum, medium, and maximum. 
To change a bitmap on the button, we call the SetBitmapLabel method.

![bitmapbutton.jpg](images/bitmapbutton.jpg)

Figure: wxBitmapButton

## wxToggleButton

A wxToggleButton is a button that has two states: pressed 
and not pressed. You toggle between these two states by clicking on it. 
There are situations where this functionality fits well.

togglebutton.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/tglbtn.h&gt;

class ToggleButton : public wxFrame
{
public:
  ToggleButton(const wxString&amp; title);

  void OnToggleRed(wxCommandEvent&amp; event);
  void OnToggleGreen(wxCommandEvent&amp; event);
  void OnToggleBlue(wxCommandEvent&amp; event);

protected:
  wxToggleButton *m_tgbutton1;
  wxToggleButton *m_tgbutton2;
  wxToggleButton *m_tgbutton3;
 
  wxPanel *m_panel;
  wxColour *colour;

};

const int ID_TGBUTTON1 = 101;
const int ID_TGBUTTON2 = 102;
const int ID_TGBUTTON3 = 103;

togglebutton.cpp
  

```
#include "togglebutton.h"

ToggleButton::ToggleButton(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(280, 180))
{
  wxPanel *panel = new wxPanel(this, wxID_ANY);

  colour = new wxColour(0, 0, 0);

  m_tgbutton1 = new wxToggleButton(panel, ID_TGBUTTON1, 
                                   wxT("Red"), wxPoint(20, 20));
  m_tgbutton2 = new wxToggleButton(panel, ID_TGBUTTON2, 
                                   wxT("Green"), wxPoint(20, 70));
  m_tgbutton3 = new wxToggleButton(panel, ID_TGBUTTON3, 
                                   wxT("Blue"), wxPoint(20, 120));

  Connect(ID_TGBUTTON1, wxEVT_COMMAND_TOGGLEBUTTON_CLICKED, 
      wxCommandEventHandler(ToggleButton::OnToggleRed));
  Connect(ID_TGBUTTON2, wxEVT_COMMAND_TOGGLEBUTTON_CLICKED, 
      wxCommandEventHandler(ToggleButton::OnToggleGreen));
  Connect(ID_TGBUTTON3, wxEVT_COMMAND_TOGGLEBUTTON_CLICKED,  
      wxCommandEventHandler(ToggleButton::OnToggleBlue));

  m_panel = new wxPanel(panel, wxID_NEW, wxPoint(150, 20), 
                        wxSize(110, 110), wxSUNKEN_BORDER);
  m_panel-&gt;SetBackgroundColour(colour-&gt;GetAsString());

}

void ToggleButton::OnToggleRed(wxCommandEvent&amp; WXUNUSED(event))
{
  unsigned char green = colour-&gt;Green(); 
  unsigned char blue = colour-&gt;Blue(); 

  if ( colour-&gt;Red() ) {
      colour-&gt;Set(0, green, blue);

  } else { 
      colour-&gt;Set(255, green, blue);
  }

  m_panel-&gt;SetBackgroundColour(colour-&gt;GetAsString());

}

void ToggleButton::OnToggleGreen(wxCommandEvent&amp; WXUNUSED(event))
{
  unsigned char red = colour-&gt;Red(); 
  unsigned char blue = colour-&gt;Blue(); 

  if ( colour-&gt;Green() ) {
      colour-&gt;Set(red, 0, blue);

  } else { 
      colour-&gt;Set(red, 255, blue);
  }

  m_panel-&gt;SetBackgroundColour(colour-&gt;GetAsString());

}

void ToggleButton::OnToggleBlue(wxCommandEvent&amp; WXUNUSED(event))
{
  unsigned char red = colour-&gt;Red(); 
  unsigned char green = colour-&gt;Green(); 

  if ( colour-&gt;Blue() ) {
      colour-&gt;Set(red, green, 0);

  } else { 
      colour-&gt;Set(red, green, 255);
  }

  m_panel-&gt;SetBackgroundColour(colour-&gt;GetAsString());
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
#include "togglebutton.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    ToggleButton *button = new ToggleButton(wxT("ToggleButton"));

    button-&gt;Centre();
    button-&gt;Show(true);

    return true;
}

```

In our example, we show three toggle buttons and a panel. We set the 
background colour of the panel to black. The togglebuttons will toggle 
the red, green, and blue parts of the colour value. The background colour 
will depend on which togglebuttons we have pressed.

colour = new wxColour(0, 0, 0);

This is the initial colour value. No red, green and blue equals to black. 
Theoretically speaking, black is not a color after all.

m_tgbutton1 = new wxToggleButton(panel, ID_TGBUTTON1, 
                                 wxT("Red"), wxPoint(20, 20));

Here we create a toggle button.

Connect(ID_TGBUTTON1, wxEVT_COMMAND_TOGGLEBUTTON_CLICKED, 
    wxCommandEventHandler(ToggleButton::OnToggleRed));

If we click on the toggle button, a wxEVT_COMMAND_TOGGLEBUTTON_CLICKED 
event is generated. We connect the
event handlers for this event. Notice that we do not connect events to the 
button methods, but to the wxFrame. widget, which is a grand parent 
of the toggle buttons. It is possible to do this, because command events 
are propagated to their parents. In our case, button -&gt; panel -&gt; frame. If we 
wanted to connect the event to the button, we would have to 
create our derived button classe, which would mean more work.

if ( colour-&gt;Blue() ) {
    colour-&gt;Set(red, green, 0);

} else { 
    colour-&gt;Set(red, green, 255);
}

In the event handlers, we set the respective wxColour parameters.

m_panel-&gt;SetBackgroundColour(colour-&gt;GetAsString());

We set the background of the panel. 

![togglebutton.jpg](images/togglebutton.jpg)

Figure: wxToggleButton

## wxStaticLine

This widget displays a simple line on the window. It can be horizontal or vertical.

staticline.h
  

#include &lt;wx/wx.h&gt;

class Staticline : public wxDialog
{
public:
    Staticline(const wxString&amp; title);

};

staticline.cpp
  

```
#include "staticline.h"
#include &lt;wx/stattext.h&gt;
#include &lt;wx/statline.h&gt;

Staticline::Staticline(const wxString&amp; title) : wxDialog(NULL, wxID_ANY, title, 
    wxDefaultPosition, wxSize(360, 350))
{

  wxFont font(10, wxDEFAULT, wxNORMAL, wxBOLD);
  wxStaticText *heading = new wxStaticText(this, wxID_ANY, wxT("The Central Europe"), 
      wxPoint(30, 15));
  heading-&gt;SetFont(font);

  wxStaticLine *sl1 = new wxStaticLine(this, wxID_ANY, wxPoint(25, 50), 
      wxSize(300,1));

  wxStaticText *st1 = new wxStaticText(this, wxID_ANY, wxT("Slovakia"), 
      wxPoint(25, 80));
  wxStaticText *st2 = new wxStaticText(this, wxID_ANY, wxT("Hungary"), 
      wxPoint(25, 100));
  wxStaticText *st3 = new wxStaticText(this, wxID_ANY, wxT("Poland"), 
      wxPoint(25, 120));
  wxStaticText *st4 = new wxStaticText(this, wxID_ANY, wxT("Czech Republic"), 
      wxPoint(25, 140));
  wxStaticText *st5 = new wxStaticText(this, wxID_ANY, wxT("Germany"), 
      wxPoint(25, 160));
  wxStaticText *st6 = new wxStaticText(this, wxID_ANY, wxT("Slovenia"), 
      wxPoint(25, 180));
  wxStaticText *st7 = new wxStaticText(this, wxID_ANY, wxT("Austria"), 
      wxPoint(25, 200));
  wxStaticText *st8 = new wxStaticText(this, wxID_ANY, wxT("Switzerland"), 
      wxPoint(25, 220));

  wxStaticText *st9  = new wxStaticText(this, wxID_ANY, wxT("5 379 000"), 
      wxPoint(220, 80), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st10 = new wxStaticText(this, wxID_ANY, wxT("10 084 000"), 
      wxPoint(220, 100), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st11 = new wxStaticText(this, wxID_ANY, wxT("38 635 000"), 
      wxPoint(220, 120), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st12 = new wxStaticText(this, wxID_ANY, wxT("10 240 000"), 
      wxPoint(220, 140), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st13 = new wxStaticText(this, wxID_ANY, wxT("82 443 000"), 
      wxPoint(220, 160), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st14 = new wxStaticText(this, wxID_ANY, wxT("2 001 000"),  
      wxPoint(220, 180), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st15 = new wxStaticText(this, wxID_ANY, wxT("8 032 000"),  
      wxPoint(220, 200), wxSize(90, -1), wxALIGN_RIGHT);
  wxStaticText *st16 = new wxStaticText(this, wxID_ANY, wxT("7 288 000"),  
      wxPoint(220, 220), wxSize(90, -1), wxALIGN_RIGHT);

  wxStaticLine *sl2 = new wxStaticLine(this, wxID_ANY, wxPoint(25, 260), 
      wxSize(300, 1));

  wxStaticText *sum = new wxStaticText(this, wxID_ANY, wxT("164 102 000"), 
      wxPoint(220, 280));
  wxFont sum_font = sum-&gt;GetFont();
  sum_font.SetWeight(wxBOLD);
  sum-&gt;SetFont(sum_font);

  this-&gt;Centre();
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
#include "staticline.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{
    Staticline *sl = new Staticline(wxT("The Central Europe"));
    sl-&gt;ShowModal();
    sl-&gt;Destroy();

    return true;
}

```

In the previous example, we show Centreal European countries and their 
populations. The use of wxStaticLine
makes it more visually attractive.

wxStaticLine *sl1 = new wxStaticLine(this, wxID_ANY, wxPoint(25, 50), 
   wxSize(300,1));

Here we create a horizontal static line. It is 300 px wide. The height is 1 px.

![staticline.png](images/staticline.png)

Figure: wxStaticLine

## wxStaticText

A wxStaticText widget displays one or more lines of read-only text.

statictext.h
  

#include &lt;wx/wx.h&gt;

class StaticText : public wxFrame
{
public:
  StaticText(const wxString&amp; title);

};

statictext.cpp
  

```
#include "statictext.h"

StaticText::StaticText(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title)
{

  wxPanel *panel = new wxPanel(this, wxID_ANY);
  wxString  text = wxT("'Cause sometimes you feel tired,\n\
feel weak, and when you feel weak,\
you feel like you wanna just give up.\n\
But you gotta search within you,\
you gotta find that inner strength\n\
and just pull that shit out of you\
and get that motivation to not give up\n\
and not be a quitter,\
no matter how bad you wanna just fall flat on your face and collapse.");

  wxStaticText *st = new wxStaticText(panel, wxID_ANY, text, 
      wxPoint(10, 10), wxDefaultSize, wxALIGN_CENTRE);

  this-&gt;SetSize(600, 110);
  this-&gt;Centre();
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
#include "statictext.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

  StaticText *st = new StaticText(wxT("StaticText"));
  st-&gt;Show(true);

  return true;
}

```

In our example, we display a part of the Eminem's Till I Collapse lyrics on the window.

wxStaticText *st = new wxStaticText(panel, wxID_ANY, text, 
   wxPoint(10, 10), wxDefaultSize, wxALIGN_CENTRE);

Here we create the wxStaticText widget. The static text is 
aligned to the cetre.

![statictext.jpg](images/statictext.jpg)

Figure: wxStaticText

## wxSlider

A wxSlider is a widget that has a simple handle. This 
handle can be pulled back and forth. This way we are choosing a value 
for a specific task. Sometimes using a slider is more natural than 
simply providing a number or using a spin control.

Slider.h
  

#include &lt;wx/wx.h&gt;
#include &lt;wx/slider.h&gt;

class MyPanel : public wxPanel
{
public:
    MyPanel(wxFrame *parent);

    void OnPaint(wxPaintEvent&amp; event);
    void OnScroll(wxScrollEvent&amp; event);

    wxSlider *slider;
    int fill;

};

class Slider : public wxFrame
{
public:
    Slider(const wxString&amp; title);

    MyPanel *panel;

};

const int ID_SLIDER = 100;

Slider.cpp
  

```
#include "Slider.h"

Slider::Slider(const wxString&amp; title)
       : wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, 
       wxSize(270, 200))
{
  panel = new MyPanel(this);
  Center();
}

MyPanel::MyPanel(wxFrame * parent)
       : wxPanel(parent, wxID_ANY)
{
  fill = 0;
  slider = new wxSlider(this, ID_SLIDER, 0, 0, 140, wxPoint(50, 30), 
      wxSize(-1, 140), wxSL_VERTICAL);

  Connect(ID_SLIDER, wxEVT_COMMAND_SLIDER_UPDATED, 
      wxScrollEventHandler(MyPanel::OnScroll));  
  Connect(wxEVT_PAINT, wxPaintEventHandler(MyPanel::OnPaint));

}

void MyPanel::OnScroll(wxScrollEvent&amp; event)
{
  fill = slider-&gt;GetValue();
  Refresh();
}

void MyPanel::OnPaint(wxPaintEvent&amp; event)
{
  wxPaintDC dc(this);

  wxPen pen(wxColour(212, 212, 212));
  dc.SetPen(pen);

  dc.DrawRectangle(wxRect(140, 30, 80, 140));  

  wxBrush brush1(wxColour(197, 108, 0));
  dc.SetBrush(brush1);

  dc.DrawRectangle(wxRect(140, 30, 80, fill));
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
#include "Slider.h"

IMPLEMENT_APP(MyApp)

bool MyApp::OnInit()
{

    Slider *slider = new Slider(wxT("Slider"));
    slider-&gt;Show(true);

    return true;
}

```

In our example, we display a slider widget. By pulling the handle 
of the slider, we control the background color of the panel. In 
such an example, using slider is more natural than using e.g. a spin control. 

slider = new wxSlider(this, ID_SLIDER, 0, 0, 140, wxPoint(50, 30), 
   wxSize(-1, 140), wxSL_VERTICAL);

We create a vertical slider. The initial value is 0, minimal value 
is 0 and maximal value is 140.
We display no ticks and no labels. 

Connect(ID_SLIDER, wxEVT_COMMAND_SLIDER_UPDATED, 
   wxScrollEventHandler(MyPanel::OnScroll));  

Here we connect a wxEVT_COMMAND_SLIDER_UPDATED event to the 
OnScroll user defined method.

Connect(wxEVT_PAINT, wxPaintEventHandler(MyPanel::OnPaint));

We also do some drawing, so we connect OnPaint method 
to the wxEVT_PAINT event.

fill = slider-&gt;GetValue();
Refresh();

In the OnScroll method, we get the current slider value. 
We call the Refresh method, which will 
generate a wxEVT_PAINT event.

dc.DrawRectangle(wxRect(140, 30, 80, 140)); 
...
dc.DrawRectangle(wxRect(140, 30, 80, fill));

Inside the OnPaint event handler, we draw two rectangles. The 
first method is draws a white rectangle with 
a gray border.
The second method draws the a rectangle with some brownish color. 
The height of the rectangle is controled by the fill value, 
which is set by the slider widget.

![slider.png](images/slider.png)

Figure: wxSlider

In this part of the wxWidgets tutorial, we covered various widgets.

[Contents](..)
[Previous](../dialogs/)
[Next](../widgetsII/)