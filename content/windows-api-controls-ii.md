+++
title = "Windows API controls II"
date = 2025-08-29T19:57:36.034+01:00
draft = false
description = "In this chapter of the Windows API tutorial, we continue working with Windows controls. We cover a trackbar, a tooltip, an up-down, and a month calendar."
image = "images/trackbar.png"
imageBig = "images/trackbar.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../controls/)
[Next](../controlsIII/)

# Windows API controls II

last modified October 18, 2023

We continue with Windows controls. We show how to use a Trackbar, 
a Tooltip, and a Month calendar control. 

## Trackbar

 
A *trackbar* is a window that contains a slider and optional tick marks. 
We move the slider using the mouse or keyboard. A trackbar is used to select discrete 
values from a range of consecutive values. This control is called a slider on 
other platforms. 

trackbar.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateControls(HWND hwnd);
void UpdateLabel(void);

HWND hTrack;
HWND hlbl;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, 
  PWSTR lpCmdLine, int nCmdShow) {
  
    HWND hwnd;
    MSG  msg ;

    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Trackbar";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0,IDC_ARROW);
  
    RegisterClassW(&amp;wc);
    hwnd = CreateWindowW(wc.lpszClassName, L"Trackbar", 
        WS_OVERLAPPEDWINDOW | WS_VISIBLE, 100, 100, 350, 180, 0, 0, hInstance, 0);
  
    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
  WPARAM wParam, LPARAM lParam) {
  
  switch(msg) {
  
     case WM_CREATE:
       CreateControls(hwnd);
       break;

     case WM_HSCROLL:
       UpdateLabel();
       break;

     case WM_DESTROY:
       PostQuitMessage(0);
       break; 
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void CreateControls(HWND hwnd) {

    HWND hLeftLabel = CreateWindowW(L"Static", L"0", 
        WS_CHILD | WS_VISIBLE, 0, 0, 10, 30, hwnd, (HMENU)1, NULL, NULL);

    HWND hRightLabel = CreateWindowW(L"Static", L"100", 
        WS_CHILD | WS_VISIBLE, 0, 0, 30, 30, hwnd, (HMENU)2, NULL, NULL);

    hlbl = CreateWindowW(L"Static", L"0", WS_CHILD | WS_VISIBLE, 
        270, 20, 30, 30, hwnd, (HMENU)3, NULL, NULL);

    INITCOMMONCONTROLSEX icex;

    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC  = ICC_LISTVIEW_CLASSES;
    InitCommonControlsEx(&amp;icex); 

    hTrack = CreateWindowW(TRACKBAR_CLASSW, L"Trackbar Control",
        WS_CHILD | WS_VISIBLE | TBS_AUTOTICKS,
        20, 20, 170, 30, hwnd, (HMENU) 3, NULL, NULL);

    SendMessageW(hTrack, TBM_SETRANGE,  TRUE, MAKELONG(0, 100)); 
    SendMessageW(hTrack, TBM_SETPAGESIZE, 0,  10); 
    SendMessageW(hTrack, TBM_SETTICFREQ, 10, 0); 
    SendMessageW(hTrack, TBM_SETPOS, FALSE, 0); 
    SendMessageW(hTrack, TBM_SETBUDDY, TRUE, (LPARAM) hLeftLabel); 
    SendMessageW(hTrack, TBM_SETBUDDY, FALSE, (LPARAM) hRightLabel); 
}

void UpdateLabel(void) {

    LRESULT pos = SendMessageW(hTrack, TBM_GETPOS, 0, 0);
    wchar_t buf[4];
    wsprintfW(buf, L"%ld", pos);

    SetWindowTextW(hlbl, buf);
}

In our example we display a Trackbar control with three static text controls. 
Two of them are attached to the left and to the right of the trackbar. They are 
called buddies. By dragging the slider, we change the text of the third static
control.

HWND hLeftLabel = CreateWindowW(L"Static", L"0", 
    WS_CHILD | WS_VISIBLE, 0, 0, 10, 30, hwnd, (HMENU)1, NULL, NULL);

HWND hRightLabel = CreateWindowW(L"Static", L"100", 
    WS_CHILD | WS_VISIBLE, 0, 0, 30, 30, hwnd, (HMENU)2, NULL, NULL);

hlbl = CreateWindowW(L"Static", L"0", WS_CHILD | WS_VISIBLE, 
    270, 20, 30, 30, hwnd, (HMENU)3, NULL, NULL);

Three static controls are created. Two controls will display the minimum and
maximum value of the Trackbar control. The last one will display the currently
selected value.

INITCOMMONCONTROLSEX icex;

icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
icex.dwICC  = ICC_LISTVIEW_CLASSES;
InitCommonControlsEx(&amp;icex); 

If we want to use one of the common controls, we need to load the common 
control DLL (comctl32.dll) and register specific common control classes from 
the DLL. The InitCommonControlsEx must call this function before 
creating a common control.

hTrack = CreateWindowW(TRACKBAR_CLASSW, L"Trackbar Control",
    WS_CHILD | WS_VISIBLE | TBS_AUTOTICKS,
    20, 20, 170, 30, hwnd, (HMENU) 3, NULL, NULL);

The TRACKBAR_CLASSW is used to create a trackbar control.
The TBS_AUTOTICKS style creates a tick mark for each increment 
in its range of values.

SendMessageW(hTrack, TBM_SETRANGE,  TRUE, MAKELONG(0, 100)); 
SendMessageW(hTrack, TBM_SETPAGESIZE, 0,  10); 
SendMessageW(hTrack, TBM_SETTICFREQ, 10, 0); 
SendMessageW(hTrack, TBM_SETPOS, FALSE, 0); 

We are not yet finished with the Trackbar control. We send four messages to the
control. We send a TBM_SETRANGE to set the trackbar range. To set 
the page size, we send the TBM_SETPAGESIZE message. To set the tick 
frequency, we send the TBM_SETTICFREQ message. To set the current 
slider position we send the TBM_SETPOS.

SendMessageW(hTrack, TBM_SETBUDDY, TRUE, (LPARAM) hLeftLabel); 
SendMessageW(hTrack, TBM_SETBUDDY, FALSE, (LPARAM) hRightLabel);  

We set the Trackbar buddies by sending the TBM_SETBUDDY message.
The third parameter will decide, whether the buddy is located to the left (TRUE) 
or to the right (FALSE) of the control. 

case WM_HSCROLL:
  UpdateLabel();
  break;

When we move the Trackbar slider, the window procedure receives the 
WM_HSCROLL message. (In case of a horizontal trackbar.)

void UpdateLabel(void) {

    LRESULT pos = SendMessageW(hTrack, TBM_GETPOS, 0, 0);
    wchar_t buf[4];
    wsprintfW(buf, L"%ld", pos);

    SetWindowTextW(hlbl, buf);
}

In the UpdateLabel function, we we get the current slider position 
by sending the TMB_GETPOS message. The received value is converted 
to text using the wsprintfW function. Finally, the text of the static
control is set with the SetWindowTextW function. 

![trackbar.png](images/trackbar.png)

Figure: Trackbar

## A tooltip

A *tooltip* is a common graphical user element. Tooltip is hidden most of the time. 
It is a small box that appears near an GUI object when a mouse pointer passes over it. 
It displays a brief message explaining the object. Tooltips are part of the 
help system of an application. 	

tooltip.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateMyTooltip(HWND);

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
            LPSTR lpCmdLine, int nCmdShow) {
    MSG  msg;    
    WNDCLASS wc = {0};
    wc.lpszClassName = "Tooltip";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClass(&amp;wc);
    CreateWindow(wc.lpszClassName, "Tooltip",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                100, 100, 200, 150, 0, 0, hInstance, 0);  

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
  
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }
  
    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {

    switch(msg) {
  
      case WM_CREATE:
          CreateMyTooltip(hwnd);
          break;

      case WM_DESTROY:
          PostQuitMessage(0);
          break;
    }
  
    return DefWindowProc(hwnd, msg, wParam, lParam);
}

void CreateMyTooltip(HWND hwnd) {

    INITCOMMONCONTROLSEX iccex; 
    HWND hwndTT;                

    TOOLINFO ti;
    char tooltip[30] = "A main window";
    RECT rect;                 
  
    iccex.dwICC = ICC_WIN95_CLASSES;
    iccex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    InitCommonControlsEx(&amp;iccex);

    hwndTT = CreateWindowEx(WS_EX_TOPMOST, TOOLTIPS_CLASS, NULL,
        WS_POPUP | TTS_NOPREFIX | TTS_ALWAYSTIP,		
        0, 0, 0, 0, hwnd, NULL, NULL, NULL );

    SetWindowPos(hwndTT, HWND_TOPMOST, 0, 0, 0, 0,
        SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE);
   
    GetClientRect(hwnd, &amp;rect);

    ti.cbSize = sizeof(TOOLINFO);
    ti.uFlags = TTF_SUBCLASS;
    ti.hwnd = hwnd;
    ti.hinst = NULL;
    ti.uId = 0;
    ti.lpszText = tooltip;
    ti.rect.left = rect.left;    
    ti.rect.top = rect.top;
    ti.rect.right = rect.right;
    ti.rect.bottom = rect.bottom;

    SendMessage(hwndTT, TTM_ADDTOOL, 0, (LPARAM) (LPTOOLINFO) &amp;ti);	
} 		

In our example, we set a tooltip for the main window.

INITCOMMONCONTROLSEX iccex;
...
iccex.dwICC = ICC_WIN95_CLASSES;
iccex.dwSize = sizeof(INITCOMMONCONTROLSEX);
InitCommonControlsEx(&amp;iccex);

A tooltip is a part of common controls, therefore, we must 
initialize common controls. 

Creation of a tooltip consists of several steps. We must create a tooltip window. 
Then we make it a topmost window, so that it is not covered by another window.
We create a tooltip text and TOOLTIPINFO structure. The structure must be 
filled with important info. The window handle, tooltip text and the rectangle, which 
will our tooltip cover. In our example, our tooltip will cover the whole client area of a window. 

SendMessage(hwndTT, TTM_ADDTOOL, 0, (LPARAM) (LPTOOLINFO) &amp;ti);

The tooltip is really added to the window, after we send the TTM_ADDTOOL message.

![tooltip.png](images/tooltip.png)

Figure: Tooltip control

## Updown control

*Updown* control, also known as a spin control, combines a pair of buttons 
displayed as arrows with a buddy edit control. Clicking the arrows increments or 
decrements the value in the edit control. The Updown control is created with 
the UPDOWN_CLASSW window class.

updown.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;
#include &lt;strsafe.h&gt;

#define ID_UPDOWN 1
#define ID_EDIT 2
#define ID_STATIC 3
#define UD_MAX_POS 30
#define UD_MIN_POS 0

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateControls(HWND);

HWND hUpDown, hEdit, hStatic;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Updown control";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Updown control",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        100, 100, 280, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {

        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    LPNMUPDOWN lpnmud;
    UINT code;

    switch(msg) {

        case WM_CREATE:

            CreateControls(hwnd);

            break;

        case WM_NOTIFY:

            code = ((LPNMHDR) lParam)-&gt;code;

            if (code == UDN_DELTAPOS) {

                lpnmud = (NMUPDOWN *) lParam;                

                int value = lpnmud-&gt;iPos + lpnmud-&gt;iDelta;

                if (value &lt; UD_MIN_POS) {
                    value = UD_MIN_POS;
                }

                if (value &gt; UD_MAX_POS) {
                    value = UD_MAX_POS;
                }

                const int asize = 4;
                wchar_t buf[asize];
                size_t cbDest = asize * sizeof(wchar_t);
                StringCbPrintfW(buf, cbDest, L"%d", value);

                SetWindowTextW(hStatic, buf);                  
            }

            break;

        case WM_DESTROY:
            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void CreateControls(HWND hwnd) {

    INITCOMMONCONTROLSEX icex;

    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC  = ICC_UPDOWN_CLASS;
    InitCommonControlsEx(&amp;icex); 

    hUpDown = CreateWindowW(UPDOWN_CLASSW, NULL, WS_CHILD | WS_VISIBLE 
        | UDS_SETBUDDYINT | UDS_ALIGNRIGHT, 
        0, 0, 0, 0, hwnd, (HMENU) ID_UPDOWN, NULL, NULL);

    hEdit = CreateWindowExW(WS_EX_CLIENTEDGE, WC_EDITW, NULL, WS_CHILD 
        | WS_VISIBLE | ES_RIGHT, 15, 15, 70, 25, hwnd, 
        (HMENU) ID_EDIT, NULL, NULL);
    
    hStatic = CreateWindowW(WC_STATICW, L"0", WS_CHILD | WS_VISIBLE
        | SS_LEFT, 15, 60, 300, 230, hwnd, (HMENU) ID_STATIC, NULL, NULL);

    SendMessageW(hUpDown, UDM_SETBUDDY, (WPARAM) hEdit, 0);
    SendMessageW(hUpDown, UDM_SETRANGE, 0, MAKELPARAM(UD_MAX_POS, UD_MIN_POS));
    SendMessageW(hUpDown, UDM_SETPOS32, 0, 0);
}

In the code example, we have an UpDown control and a static text control. The
currently selected value of the UpDown is displayed in the static text control.

#define UD_MAX_POS 30
#define UD_MIN_POS 0

These two constants are used for maximum and minimum values of
the UpDown control.

hUpDown = CreateWindowW(UPDOWN_CLASSW, NULL, WS_CHILD | WS_VISIBLE 
    | UDS_SETBUDDYINT | UDS_ALIGNRIGHT, 
    0, 0, 0, 0, hwnd, (HMENU) ID_UPDOWN, g_hInst, NULL);

To create an UpDown control, we pass the UPDOWN_CLASSW to 
the CreateWindowW function. The UDS_SETBUDDYINT
flag causes the UpDown control to send a message (WM_SETTEXT) 
to its buddy when its position changes. The UDS_ALIGNRIGHT
flag positions the UpDown control next to the right edge of its 
buddy window.

SendMessageW(hUpDown, UDM_SETBUDDY, (WPARAM) hEdit, 0);

The UDM_SETBUDDY message sets the Edit control to be the 
buddy window for the UpDown control.

SendMessageW(hUpDown, UDM_SETRANGE, 0, MAKELPARAM(UD_MAX_POS, UD_MIN_POS));

The UDM_SETRANGE message sets the minimum and maximum 
positions for the UpDown control.

SendMessageW(hUpDown, UDM_SETPOS32, 0, 0);

With the UDM_SETPOS32 message, we set the initial position of the UpDown 
control.

code = ((LPNMHDR) lParam)-&gt;code;

if (code == UDN_DELTAPOS) {
...
}

The UDN_DELTAPOS notification is sent by the operating system to the 
parent window of the UpDown control when the position of the control is 
about to change (i.e. before the control updates its value).

lpnmud = (NMUPDOWN *) lParam;

int value = lpnmud-&gt;iPos + lpnmud-&gt;iDelta;

The NMUPDOWN structure contains information about the UpDown's modification.
The iPos value is the UpDown control's current position.
The iDelta is the proposed change in the UpDown control's position.
From these two values, we compute the final value that will appear in the control.

if (value &lt; UD_MIN_POS) {
    value = UD_MIN_POS;
}

if (value &gt; UD_MAX_POS) {
    value = UD_MAX_POS;
}

This code ensures that the static text does not display values outside
the UpDown's range.

int const asize = 4;
wchar_t buf[asize];
size_t cbDest = asize * sizeof(wchar_t);
StringCbPrintfW(buf, cbDest, L"%d", value);

Using the StringCbPrintfW function, we build the 
string to be displayed in the static text control.

SetWindowTextW(hStatic, buf);

Finally, the static text control is updated with the SetWindowTextW
function.

![updown.png](images/updown.png)

Figure: UpDown control

## Month Calendar Control

A *Month Calendar* is a complex control which is used to select 
a date. The date can be selected in a simple and intuitive way.

monthcalendar.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;
#include &lt;wchar.h&gt;
#include &lt;strsafe.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateControls(HWND);
void GetSelectedDate(HWND, HWND);

HWND hStat;
HWND hMonthCal;

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, 
  LPSTR lpCmdLine, int nCmdShow) {
  
    HWND hwnd;
    MSG  msg;
    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Month Calendar";
    wc.hInstance     = hInstance ;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc ;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClassW(&amp;wc);

    hwnd = CreateWindowW(wc.lpszClassName, L"Month Calendar",
        WS_OVERLAPPEDWINDOW | WS_VISIBLE,
        100, 100, 250, 300, 0, 0, hInstance, 0);  

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {

    LPNMHDR lpNmHdr;

    switch(msg) {

        case WM_CREATE:

            CreateControls(hwnd);
            break;

        case WM_NOTIFY:

            lpNmHdr = (LPNMHDR) lParam;

            if (lpNmHdr-&gt;code == MCN_SELECT) {
                GetSelectedDate(hMonthCal, hStat);
            }
 	  
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            break; 
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void CreateControls(HWND hwnd) {

    hStat = CreateWindowW(WC_STATICW, L"", 
        WS_CHILD | WS_VISIBLE, 80, 240, 80, 30,
        hwnd, (HMENU)1, NULL, NULL);

    INITCOMMONCONTROLSEX icex;

    icex.dwSize = sizeof(icex);
    icex.dwICC  = ICC_DATE_CLASSES;
    InitCommonControlsEx(&amp;icex);

    hMonthCal = CreateWindowW(MONTHCAL_CLASSW, L"", 
        WS_BORDER | WS_CHILD | WS_VISIBLE | MCS_NOTODAYCIRCLE,  
        20, 20, 200, 200, hwnd, (HMENU)2, NULL, NULL);
}

void GetSelectedDate(HWND hMonthCal, HWND hStat) {

    SYSTEMTIME time;
    const int dsize = 20;
    wchar_t buf[dsize];

    ZeroMemory(&amp;time, sizeof(SYSTEMTIME));
    SendMessage(hMonthCal, MCM_GETCURSEL, 0, (LPARAM) &amp;time);
  
    size_t cbDest = dsize * sizeof(wchar_t);
    StringCbPrintfW(buf, cbDest, L"%d-%d-%d", 
          time.wYear, time.wMonth, time.wDay);

    SetWindowTextW(hStat, buf);
}

In our example, we have two controls: a month calendar control and a static text. 
The selected date from the month calendar control is displayed in the static text.

hMonthCal = CreateWindowW(MONTHCAL_CLASSW, L"", 
    WS_BORDER | WS_CHILD | WS_VISIBLE | MCS_NOTODAYCIRCLE,  
    20, 20, 200, 200, hwnd, (HMENU)2, NULL, NULL);

Here we create a month calendar control. The class name to create a month 
calendar control is MONTHCAL_CLASSW. If we use the  
MCS_NOTODAYCIRCLE window style, the today's date is not circled.

INITCOMMONCONTROLSEX icex;

icex.dwSize = sizeof(icex);
icex.dwICC  = ICC_DATE_CLASSES;
InitCommonControlsEx(&amp;icex);

To register a month calendar control, we specify the 
ICC_DATE_CLASSES flag for the dwICC member of the 
INITCOMMONCONTROLSEX structure.

case WM_NOTIFY:

    lpNmHdr = (LPNMHDR) lParam;

    if (lpNmHdr-&gt;code == MCN_SELECT) {
        GetSelectedDate(hMonthCal, hStat);
    }

    break;

If an event occurs in the month calendar control, the WM_NOTIFY 
message is sent. The lParam contains a pointer to an 
NMHDR structure that contains the notification code and additional 
information.

SendMessage(hMonthCal, MCM_GETCURSEL, 0, (LPARAM) &amp;time);

To fill the structure with the selected date, we send a 
MCM_GETCURSEL message to the calendar control.

size_t cbDest = dsize * sizeof(wchar_t);
StringCbPrintfW(buf, cbDest, L"%d-%d-%d", 
      time.wYear, time.wMonth, time.wDay);

SetWindowTextW(hStat, buf);

We build the string and set the date to the static text control.

![monthcalendar.png](images/monthcalendar.png)

Figure: Month Calendar

In this part of the Windows API tutorial, we have continued covering 
Windows controls — a trackbar, a tooltip, an up-down, and a month calendar. 

[Contents](..)
[Previous](../controls/)
[Next](../controlsIII/)