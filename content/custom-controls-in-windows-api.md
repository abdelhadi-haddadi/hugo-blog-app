+++
title = "Custom controls in Windows API"
date = 2025-08-29T19:57:37.136+01:00
draft = false
description = "In this part of the Windows tutorial, we create a Burning custom control."
image = "images/burning.png"
imageBig = "images/burning.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../advancedcontrols/)
[Next](../gdi/)

# Custom controls in Windows API

last modified October 18, 2023

Here we demonstrate, how to create our own custom controls. Windows API 
has a collection of various prebuilt controls. More specific controls have to 
be created manually. We use the GDI to create custom controls.

## The Burning control

This control can be found in various media burning applications, 
like Nero Burning ROM.

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;
#include &lt;wchar.h&gt;

LRESULT CALLBACK PanelProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

HINSTANCE g_hinst;
LRESULT g_pos = 150;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, 
                    PWSTR lpCmdLine, int nCmdShow)
{
  HWND hwnd;
  MSG  msg;    
  WNDCLASSW wc = {0};

  wc.lpszClassName = L"Application";
  wc.hInstance     = hInstance;
  wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
  wc.lpfnWndProc   = WndProc;
  wc.hCursor       = LoadCursor(0, IDC_ARROW);

  g_hinst = hInstance;
  
  RegisterClassW(&amp;wc);
  hwnd = CreateWindowW(wc.lpszClassName, L"Burning control",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE | WS_CLIPCHILDREN,
                100, 100, 400, 250, 0, 0, hInstance, 0);  

  while( GetMessage(&amp;msg, NULL, 0, 0)) {
    DispatchMessage(&amp;msg);
  }

  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam)
{

  static HWND hwndTrack, hwndBurn;
  WNDCLASSW rwc = {0};
 
  INITCOMMONCONTROLSEX InitCtrlEx;

  InitCtrlEx.dwSize = sizeof(INITCOMMONCONTROLSEX);
  InitCtrlEx.dwICC  = ICC_BAR_CLASSES;
  InitCommonControlsEx(&amp;InitCtrlEx);

  switch(msg)  
  {
      case WM_CREATE:
               
          rwc.lpszClassName = L"BurningControl";

          rwc.hbrBackground = GetSysColorBrush(COLOR_BTNFACE);
          rwc.style         = CS_HREDRAW;
          rwc.lpfnWndProc   = PanelProc;
          rwc.hCursor       = LoadCursor(0, IDC_ARROW);
          RegisterClassW(&amp;rwc);

          hwndBurn = CreateWindowExW(WS_EX_STATICEDGE , L"BurningControl", NULL,
              WS_CHILD | WS_VISIBLE, 0, 330, 490, 30, hwnd, (HMENU)1, NULL, NULL);

          hwndTrack = CreateWindowExW(0, TRACKBAR_CLASSW, NULL,
              WS_CHILD | WS_VISIBLE | TBS_FIXEDLENGTH | TBS_NOTICKS,
              40, 25, 150, 25, hwnd, (HMENU) 2, g_hinst, NULL);

          SendMessage(hwndTrack, TBM_SETRANGE,  TRUE,  MAKELONG(0, 750));
          SendMessage(hwndTrack, TBM_SETPAGESIZE, 0,  20); 
          SendMessage(hwndTrack, TBM_SETTICFREQ, 20, 0); 
          SendMessage(hwndTrack, TBM_SETPOS, TRUE, 150);  
          break;

      case WM_SIZE:

          SetWindowPos(hwndBurn, NULL, 0, HIWORD(lParam)-30, 
              LOWORD(lParam), 30, SWP_NOZORDER);
          break;

      case WM_HSCROLL:

          g_pos = SendMessage(hwndTrack, TBM_GETPOS, 0, 0);
          InvalidateRect(hwndBurn, NULL, TRUE);
          break;            

      case WM_DESTROY:

          PostQuitMessage(0);
          break; 
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

LRESULT CALLBACK PanelProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam)
{
  HBRUSH hBrushYellow, hBrushRed, holdBrush;
  HPEN hPen, holdPen;
  HFONT hFont, holdFont;
  PAINTSTRUCT ps;
  RECT rect, rect2;
  
  wchar_t *cap[] = { L"75", L"150", L"225", L"300", L"375", L"450", 
      L"525", L"600", L"675"};

  HDC hdc;
  int till;
  int step, full;
  int i;

  switch(msg)  
  {
    case WM_PAINT:
    
        hdc = BeginPaint(hwnd, &amp;ps);

        GetClientRect(hwnd, &amp;rect);

        till = (rect.right / 750.0) * g_pos;
        step = rect.right / 10.0;
        full = (rect.right / 750.0) * 700;
        
        hBrushYellow = CreateSolidBrush(RGB(255, 255, 184));
        hBrushRed = CreateSolidBrush(RGB(255, 110, 110));

        hPen = CreatePen(PS_NULL, 1, RGB(0, 0, 0));
        holdPen = SelectObject(hdc, hPen);

        hFont = CreateFontW(13, 0, 0, 0, FW_MEDIUM, 0, 0, 0, 0, 
                0, 0, 0, 0, L"Tahoma");

        holdFont = SelectObject(hdc, hFont);
        
        if(till &gt; full) {
        
            SelectObject(hdc, hBrushYellow);
            Rectangle(hdc, 0, 0, full, 30);
            holdBrush = SelectObject(hdc, hBrushRed);
            Rectangle(hdc, full, 0, till, 30);

        } else {
        
            holdBrush = SelectObject(hdc, hBrushYellow);
            Rectangle(hdc, 0, 0, till, 30);
        }

        SelectObject(hdc, holdPen);

        for ( i = 1; i &lt; 10; i++) {

          MoveToEx(hdc, i*step, 0, NULL);
          LineTo(hdc, i*step, 7);

          rect2.bottom = 28;
          rect2.top = 8;
          rect2.left = i*step-10;
          rect2.right = i*step+10;

          SetBkMode(hdc, TRANSPARENT) ;
          DrawTextW(hdc, cap[i-1], wcslen(cap[i-1]), &amp;rect2, DT_CENTER);
        }

        SelectObject(hdc, holdBrush);
        DeleteObject(hBrushYellow);
        DeleteObject(hBrushRed);

        DeleteObject(hPen);

        SelectObject(hdc, holdFont);
        DeleteObject(hFont);
                    
        EndPaint(hwnd, &amp;ps);
        break;
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In our example, we display a trackbar control and our custom burning control. 
The trackbar control is used to control the state of the burning control.

The burning control is a simple window. It is placed on the bottom of the 
parent window. It is completely drawn during the WM_PAINT message.
The lines, text, and background is drawn using the GDI function calls.

![burning.png](images/burning.png)

Figure: Burning control

In this part of the Windows API tutorial, we have created a Burning custom
control. 

[Contents](..)
[Previous](../advancedcontrols/)
[Next](../gdi/)