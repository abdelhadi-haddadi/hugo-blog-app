+++
title = "The GDI in Windows API"
date = 2025-08-29T19:57:40.242+01:00
draft = false
description = "In this part of the Winapi tutorial, we present the Graphics Device interface."
image = "images/pixels.png"
imageBig = "images/pixels.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../customcontrols/)

# The GDI in Windows API

last modified October 18, 2023

Graphics Device Interface (GDI) is an interface for working with graphics.
It is used to interact with graphic devices such as monitors, printers or files.
The GDI allows programmers to display data on a screen or printer without
having to be concerned about the details of a particular device.
The GDI insulates the programmer from the hardware. From the programmer's
point of view, the GDI is a group of API functions for working with graphics. 
The GDI consists of 2D Vector Graphics, Fonts and Images. To begin
drawing graphics, we must obtain a device context (DC) object.

The WM_PAINT message is generated whenever a window needs 
to be redrawn. The programmer draws on the client area of the window; 
the surrounding frame, including the title bar, is automatically painted 
by the operating system.

HDC BeginPaint(HWND hwnd, LPPAINTSTRUCT lpPaint);

The BeginPaint function prepares the specified window for 
painting and fills a PAINTSTRUCT structure with information 
about the painting. It returns a handle to the device context. A device 
context is an object through which we perform the painting operations.

BOOL EndPaint(HWND hWnd, const PAINTSTRUCT *lpPaint);

Each painting operations is ended with EndPaint. 
This function is required for each call to the BeginPaint
function, but only after the painting is complete.

## Pixel

Pixel is the smallest element of an image that can be individually 
processed in a video display system. The SetPixel is a 
function that draws a single pixel on the window. 

COLORREF SetPixel(HDC hdc, int x, int y, COLORREF crColor);

The function's first parameter is a handle to the device context.
The next two parameters are the x and y coordinates of the point.
The last parameter is the color to be used to paint the point.
If the function succeeds, the return value is the RGB value that 
the function sets the pixel to.

pixels.c
  

#include &lt;windows.h&gt;
#include &lt;time.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void DrawPixels(HWND hwnd);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Pixels";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Pixels",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                100, 100, 300, 250, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    srand(time(NULL));

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {

    switch(msg) {

        case WM_PAINT:

            DrawPixels(hwnd);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void DrawPixels(HWND hwnd) {

    PAINTSTRUCT ps;
    RECT r;

    GetClientRect(hwnd, &amp;r);

    if (r.bottom == 0) {
    
        return;
    }

    HDC hdc = BeginPaint(hwnd, &amp;ps);

    for (int i=0; i&lt;1000; i++) {

        int x = rand() % r.right;
        int y = rand() % r.bottom;
        SetPixel(hdc, x, y, RGB(255, 0, 0));
    }

    EndPaint(hwnd, &amp;ps);
}

In our example we display randomly 1000 red pixels on the client area of
the window. 

wc.style = CS_HREDRAW | CS_VREDRAW;

These two flags cause the window to be redrawn when it is resized.

srand(time(NULL));

The srand function seeds the random number generator.

case WM_PAINT:

    DrawPixels(hwnd);
    break;

Drawing is performed in a reaction to the WM_PAINT message.
The actual drawing is delegated to the DrawPixels function.

HDC hdc = BeginPaint(hwnd, &amp;ps);

The BeginPaint function prepares the specified window for 
painting. It fills a PAINTSTRUCT structure with information about 
the painting. It returns a handle to a display device context for the specified 
window.

GetClientRect(hwnd, &amp;r);

We retrieve the coordinates of the window's client area. We randomly
draw on the window and we need to know where we can draw at the moment.

for (int i=0; i&lt;1000; i++) {

    int x = rand() % r.right;
    int y = rand() % r.bottom;
    SetPixel(hdc, x, y, RGB(255, 0, 0));
}

One thousand points are randomly drawn on the window. The SetPixel 
function draws a pixel at a specified location using the chosen colour. 

EndPaint(hwnd, &amp;ps);

At the end of the painting we call the EndPaint functions.
The function releases the display device context that BeginPaint 
retrieved.

![pixels.png](images/pixels.png)

Figure: Pixels

## Line

A line is a basic graphics primitive. It is drawn with 
two functions: MoveToEx and LineTo.

BOOL MoveToEx(HDC hdc, int x, int y, LPPOINT lpPoint);

The MoveToEx function updates the current position to the 
specified point and optionally returns the previous position.

BOOL LineTo(HDC hdc, int nXEnd, int nYEnd);

The LineTo function draws a line from the current position up 
to, but not including, the specified point.

lines.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Lines";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Lines",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 300, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;

    switch(msg) {
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);

            MoveToEx(hdc, 50, 50, NULL);
            LineTo(hdc, 250, 50);

            HPEN hWhitePen = GetStockObject(WHITE_PEN);
            HPEN hOldPen = SelectObject(hdc, hWhitePen);

            MoveToEx(hdc, 50, 100, NULL);
            LineTo(hdc, 250, 100);

            SelectObject(hdc, hOldPen);

            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:
 
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The example draws two lines; one in black color and 
one in white color.

MoveToEx(hdc, 50, 50, NULL);
LineTo(hdc, 250, 50);

A line is drawn between points (50, 50) and (250, 50).
The default BLACK_PEN is used.

HPEN hWhitePen = GetStockObject(WHITE_PEN);

The GetStockObject function retrieves 
a handle to the built-in white pen which is specified
with the WHITE_PEN value. It is not necessary 
(but it is not harmful) to delete stock objects by calling 
DeleteObject.

HPEN hOldPen = SelectObject(hdc, hWhitePen);

The SelectObject function selects an object into 
the specified device context (DC). The new object replaces the 
previous object of the same type.

SelectObject(hdc, hOldPen);

We revert back to the old BLACK_PEN pen.

![lines.png](images/lines.png)

Figure: Lines

## Rectangle

To draw a rectangle, we use the Rectangle function.

BOOL Rectangle(HDC hdc, int nLeftRect, int nTopRect, int nRightRect, 
    int nBottomRect);

The first parameter of the function is the handle to the device context. 
The next two parameters are the x and y coordinates of the upper-left corner
of the rectangle. The last two parameters are the x, y coordinates of the
lower-right corner of the rectangle. If the function fails, the return value 
is zero. If it succeeds, the return value is non-zero.

rectangle.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Rectangle";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Rectangle",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 250, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;

    switch(msg) {
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);
            Rectangle(hdc, 50, 50, 200, 100);
            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:
 
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The outline of the rectangle is drawn using the current pen.
The background is drawn using the current brush.

Rectangle(hdc, 50, 50, 200, 100);

The rectangle is drawn using the Rectangle function.
We draw the rectangle using two points: top-left point and bottom-right point.

![rectangle.png](images/rectangle.png)

Figure: Rectangle

## Bézier curve

Bézier curves are curved lines defined by mathematical formulas. The mathematical 
method for drawing curves was created by Pierre Bézier in the late 1960's for the 
manufacturing of automobiles at Renault.

BOOL PolyBezier(HDC hdc, const POINT *lppt, DWORD cPoints);

The function's first parameter is a handle to the device context.
The second parameter is a pointer to an array of POINT
structures that contain the endpoints and control points
of the curve(s).

beziercurve.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"BezierCurve";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Beziér curve",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 500, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;

    POINT points[4] = { 20, 40, 320, 200, 330, 110, 450, 40 };

    switch(msg) {
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);

            PolyBezier(hdc, points, 4);

            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:
 
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In the example, we draw a curved line with the PolyBezier
function.

POINT points[4] = { 20, 40, 320, 200, 330, 110, 450, 40 };

These points form a Bézier curve. The first point is a starting
point. The next two points are control points. The last point
is an ending point of the curve. 

PolyBezier(hdc, points, 4);

The PolyBezier function draws the curved line.

![beziercurve.png](images/beziercurve.png)

Figure: Bézier curve

## Pen

A *pen* is an elementary graphics object. It is used to draw lines,
curves and outlines of rectangles, ellipses, polygons, or other shapes.

There are two types of pen: cosmetic and geometric. *Cosmetic pens*
are simple pens with a fixed width of 1. They have three attributes: width, style, and color.
They are more efficient than geometric pens. Cosmetic pens can be created with the 
CreatePen, CreatePenIndirect, or ExtCreatePen functions.

*Geometric pens* are more complex than cosmetic pens. They have seven attributes:
width, style, color, pattern, hatch, end cap, and join style. Geometric pes are 
created with the ExtCreatePen function.

HPEN CreatePen(int fnPenStyle, int nWidth, COLORREF crColor);

The CreatePen function creates a logical pen with a specified
style, width, and colour.

HPEN ExtCreatePen(DWORD dwPenStyle, DWORD dwWidth, const LOGBRUSH *lplb, 
    DWORD dwStyleCount, const DWORD *lpStyle);

The ExtCreatePen function creates a logical cosmetic or 
geometric pen. The first parameter is a combination of type, style, end cap, 
and join attributes. The second parameter is the width of the pen. 
The third parameter is a pointer to the LOGBRUSH structure.
The structure defines the style, color, and pattern of a physical brush.
The fourth parameter is the length, in DWORD units, of the 
lpStyle array. This value must be zero if dwPenStyle 
is not PS_USERSTYLE. The style count is limited to 16.
The last parameter is a pointer to an array. The first value specifies the 
length of the first dash in a user-defined style, the second value specifies 
the length of the first space, and so on. This pointer must be NULL 
if dwPenStyle is not S_USERSTYLE.

After a pen has been created, we select it into the application's device context
with the SelectObject function. From this point on, the application 
uses this pen for any line-drawing operations in its client area.

### Pen styles

A pen style is a particular pattern applied on a line object. There are
predefined pen styles such as PS_SOLID, PS_DASH, 
PS_DOT, or PS_DASHDOT. It is also possible
to create custom pen styles.

penstyles.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void DrawLines(HWND);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Pen styles";
    wc.hInstance     = hInstance;
    wc.hbrBackground = (HBRUSH) GetStockObject(WHITE_BRUSH);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Pen styles",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 350, 180, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    switch(msg) {
  
        case WM_PAINT:

            DrawLines(hwnd);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void DrawLines(HWND hwnd) {

    PAINTSTRUCT ps;

    HDC hdc = BeginPaint(hwnd, &amp;ps);
    HPEN hPen1 = CreatePen(PS_SOLID, 1, RGB(0, 0, 0));
    HPEN hPen2 = CreatePen(PS_DASH, 1, RGB(0, 0, 0));
    HPEN hPen3 = CreatePen(PS_DOT, 1, RGB(0, 0, 0));
    HPEN hPen4 = CreatePen(PS_DASHDOT, 1, RGB(0, 0, 0));
    HPEN hPen5 = CreatePen(PS_DASHDOTDOT, 1, RGB(0, 0, 0));

    HPEN holdPen = SelectObject(hdc, hPen1);
    MoveToEx(hdc, 50, 30, NULL);
    LineTo(hdc, 300, 30);

    SelectObject(hdc, hPen2);
    MoveToEx(hdc, 50, 50, NULL);
    LineTo(hdc, 300, 50);

    SelectObject(hdc, hPen2);
    MoveToEx(hdc, 50, 70, NULL);
    LineTo(hdc, 300, 70);

    SelectObject(hdc, hPen3);
    MoveToEx(hdc, 50, 90, NULL);
    LineTo(hdc, 300, 90);

    SelectObject(hdc, hPen4);
    MoveToEx(hdc, 50, 110, NULL);
    LineTo(hdc, 300, 110);

    SelectObject(hdc, holdPen);
    DeleteObject(hPen1);
    DeleteObject(hPen2);
    DeleteObject(hPen3);
    DeleteObject(hPen4);
    DeleteObject(hPen5);

    EndPaint(hwnd, &amp;ps);  
}

In our example, we draw five different lines using five different pen styles.

case WM_PAINT:

    DrawLines(hwnd);
    break;

The actual drawing is delegated to the DrawLines function.

HPEN hPen1 = CreatePen(PS_SOLID, 1, RGB(0, 0, 0));

The CreatePen function creates a logical pen with a specified
style, width and colour. The PS_SOLID stands for a solid pen.
We use the RGB macro to generate a colour for the pen.  

SelectObject(hdc, hPen1);

To activate a pen, we call the SelectObject function.

MoveToEx(hdc, 50, 30, NULL);
LineTo(hdc, 300, 30);

To draw lines, we use the MoveToEx and the LineTo
functions.

DeleteObject(hPen1);
DeleteObject(hPen2);
DeleteObject(hPen3);
DeleteObject(hPen4);
DeleteObject(hPen5);

In the end, we clean up resources.

![penstyles.png](images/penstyles.png)

Figure: Pen styles

### Line joins

The lines can be joined using three different join styles: 
PS_JOIN_BEVEL, PS_JOIN_MITEl, and PS_JOIN_ROUND.

linejoins.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void DoDrawing(HWND);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Pens";
    wc.hInstance     = hInstance;
    wc.hbrBackground = (HBRUSH) GetStockObject(WHITE_BRUSH);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Line joins",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 450, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    switch(msg) {
  
        case WM_PAINT:

            DoDrawing(hwnd);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void DoDrawing(HWND hwnd) {

    LOGBRUSH brush;
    COLORREF col = RGB(0, 0, 0);
    DWORD pen_style = PS_SOLID | PS_JOIN_MITER | PS_GEOMETRIC;

    brush.lbStyle = BS_SOLID;
    brush.lbColor = col;
    brush.lbHatch = 0;       

    PAINTSTRUCT ps;

    HDC hdc = BeginPaint(hwnd, &amp;ps);

    HPEN hPen1 = ExtCreatePen(pen_style, 8, &amp;brush, 0, NULL);
    HPEN holdPen = SelectObject(hdc, hPen1);
    
    POINT points[5] = { { 30, 30 }, { 130, 30 }, { 130, 100 }, 
        { 30, 100 }, { 30, 30}};
    Polygon(hdc, points, 5);
    
    pen_style = PS_SOLID | PS_GEOMETRIC | PS_JOIN_BEVEL;
    HPEN hPen2 = ExtCreatePen(pen_style, 8, &amp;brush, 0, NULL);  

    SelectObject(hdc, hPen2);
    DeleteObject(hPen1);

    POINT points2[5] = { { 160, 30 }, { 260, 30 }, { 260, 100 }, 
        { 160, 100 }, {160, 30 }};
    MoveToEx(hdc, 130, 30, NULL);
    Polygon(hdc, points2, 5);

    pen_style = PS_SOLID | PS_GEOMETRIC | PS_JOIN_ROUND;
    HPEN hPen3 = ExtCreatePen(pen_style, 8, &amp;brush, 0, NULL);  

    SelectObject(hdc, hPen3);
    DeleteObject(hPen2);

    POINT points3[5] = { { 290, 30 }, { 390, 30 }, { 390, 100 }, 
        { 290, 100 }, {290, 30 }};
    MoveToEx(hdc, 260, 30, NULL);
    Polygon(hdc, points3, 5);

    SelectObject(hdc, holdPen);
    DeleteObject(hPen3);
      
    EndPaint(hwnd, &amp;ps);  
}

In the example, we show three types of line joins on rectangular
shapes.

pen_style = PS_SOLID | PS_GEOMETRIC | PS_JOIN_BEVEL;
HPEN hPen2 = ExtCreatePen(pen_style, 8, &amp;brush, 0, NULL); 

The ExtCreatePen function creates a solid, geometric pen with
the PS_JOIN_BEVEL join.

POINT points2[5] = { { 160, 30 }, { 260, 30 }, { 260, 100 }, 
    { 160, 100 }, {160, 30 }};
MoveToEx(hdc, 130, 30, NULL);
Polygon(hdc, points2, 5);

From the provided points, we create a rectangular shape with the
Polygon function.

![linejoins.png](images/linejoins.png)

Figure: Line joins

## Brush

A *brush* is an elementary graphics object. It is used to paint the
background of graphics shapes, such as rectangles, ellipses, or polygons.
A brush can be a solid colour, a hatch, or a custom bitmap pattern.

### Solid brush

A solid brush is a color. It is created with the CreateSolidBrush
function.

HBRUSH CreateSolidBrush(COLORREF crColor);

The CreateSolidBrush function creates a brush with the specified 
solid color.

solidbrush.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void DrawRectangles(HWND);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Brush";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Solid Brush",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 220, 240, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    switch(msg) {
  
        case WM_PAINT:

            DrawRectangles(hwnd);	    
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void DrawRectangles(HWND hwnd) {

    PAINTSTRUCT ps;

    HDC hdc = BeginPaint(hwnd, &amp;ps);
    HPEN hPen = CreatePen(PS_NULL, 1, RGB(0, 0, 0));
    HPEN holdPen = SelectObject(hdc, hPen);

    HBRUSH hBrush1 = CreateSolidBrush(RGB(121, 90, 0));
    HBRUSH hBrush2 = CreateSolidBrush(RGB(240, 63, 19));
    HBRUSH hBrush3 = CreateSolidBrush(RGB(240, 210, 18));
    HBRUSH hBrush4 = CreateSolidBrush(RGB(9, 189, 21));

    HBRUSH holdBrush = SelectObject(hdc, hBrush1);

    Rectangle(hdc, 30, 30, 100, 100);
    SelectObject(hdc, hBrush2);
    Rectangle(hdc, 110, 30, 180, 100);
    SelectObject(hdc, hBrush3);
    Rectangle(hdc, 30, 110, 100, 180);
    SelectObject(hdc, hBrush4);
    Rectangle(hdc, 110, 110, 180, 180);

    SelectObject(hdc, holdPen);
    SelectObject(hdc, holdBrush);

    DeleteObject(hPen);
    DeleteObject(hBrush1);
    DeleteObject(hBrush2);
    DeleteObject(hBrush3);
    DeleteObject(hBrush4);

    EndPaint(hwnd, &amp;ps);
}

In the example, we create 4 rectangles filled with 4 different
solid colours.

HBRUSH hBrush1 = CreateSolidBrush(RGB(121, 90, 0));

Here we create a solid colour brush.

HBRUSH holdBrush = SelectObject(hdc, hBrush1);

A new brush is selected into the device context.

![solidbrushes.png](images/solidbrushes.png)

Figure: Solid brushes

### Hatch brush

There are six predefined hatch brushes available. In our example, we
show all of them.

HBRUSH CreateHatchBrush(int fnStyle, COLORREF clrref);

The CreateHatchBrush function creates a brush that has 
the specified hatch pattern and color.

hatchbrushes.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void DrawRectangles(HWND hwnd);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_VREDRAW | CS_HREDRAW;
    wc.lpszClassName = L"Brush";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Hatch brushes",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 300, 220, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    switch(msg) {
  
      case WM_PAINT:

          DrawRectangles(hwnd);
          break;

      case WM_DESTROY:

          PostQuitMessage(0);
          return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void DrawRectangles(HWND hwnd) {

    PAINTSTRUCT ps;

    HDC hdc = BeginPaint(hwnd, &amp;ps);
    HPEN hPen = CreatePen(PS_NULL, 1, RGB(0, 0, 0));
    HPEN holdPen = SelectObject(hdc, hPen);

    HBRUSH hBrush1 = CreateHatchBrush(HS_BDIAGONAL, RGB(0, 0, 0));
    HBRUSH hBrush2 = CreateHatchBrush(HS_FDIAGONAL, RGB(0, 0, 0));
    HBRUSH hBrush3 = CreateHatchBrush(HS_CROSS, RGB(0, 0, 0));
    HBRUSH hBrush4 = CreateHatchBrush(HS_HORIZONTAL, RGB(0, 0, 0));
    HBRUSH hBrush5 = CreateHatchBrush(HS_DIAGCROSS, RGB(0, 0, 0));
    HBRUSH hBrush6 = CreateHatchBrush(HS_VERTICAL, RGB(0, 0, 0));

    HBRUSH holdBrush = SelectObject(hdc, hBrush1);

    DWORD col = GetSysColor(COLOR_BTNFACE);
    SetBkColor(hdc, col);

    Rectangle(hdc, 30, 30, 100, 80);
    SelectObject(hdc, hBrush2);
    Rectangle(hdc, 110, 30, 180, 80);
    SelectObject(hdc, hBrush3);
    Rectangle(hdc, 190, 30, 260, 80);
    SelectObject(hdc, hBrush4);
    Rectangle(hdc, 30, 110, 100, 160);
    SelectObject(hdc, hBrush5);
    Rectangle(hdc, 110, 110, 180, 160);
    SelectObject(hdc, hBrush6);
    Rectangle(hdc, 190, 110, 260, 160);

    SelectObject(hdc, holdPen);
    SelectObject(hdc, holdBrush);

    DeleteObject(hPen);
    DeleteObject(hBrush1);
    DeleteObject(hBrush2);
    DeleteObject(hBrush3);
    DeleteObject(hBrush4);
    DeleteObject(hBrush5);
    DeleteObject(hBrush6);

    EndPaint(hwnd, &amp;ps);
}

This example is very similar to the previous one. We only use a new
function call CreateHatchBrush.

HBRUSH hBrush1 = CreateHatchBrush(HS_BDIAGONAL, RGB(0, 0, 0));

A diagonal hatch brush is created. 

HBRUSH holdBrush = SelectObject(hdc, hBrush1);

The brush is selected into the device context. A handle to the old brush is
returned.  

DeleteObject(hBrush1);

The brush object is deleted.

![hatchbrushes.png](images/hatchbrushes.png)

Figure: Hatch brushes

### Custom brush

A custom brush can be created with the CreatePatternBrush
function.

HBRUSH CreatePatternBrush(HBITMAP hbmp);

The function takes a handle to the bitmap to be used to create 
the brush.

custombrush.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Custom brush";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Custom brush",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 300, 200, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;
    static HBITMAP hBtm;

    UINT bits[8] = { 0x111111ff, 0xffffffff, 0xffffffff, 0xffffffff,
        0x00000000, 0x00000000, 0x00000000, 0x00000000 };

    switch(msg) {

        case WM_CREATE:

            hBtm = CreateBitmap(8, 8, 1, 1, (LPBYTE) bits);

            break;
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);
            
            HBRUSH hCustomBrush = CreatePatternBrush(hBtm);
            HBRUSH hOldBrush = SelectObject(hdc, hCustomBrush);

            SelectObject(hdc, GetStockObject(NULL_PEN));

            Rectangle(hdc, 20, 20, 250, 160);

            SelectObject(hdc, hOldBrush);
            DeleteObject(hCustomBrush);

            SelectObject(hdc, GetStockObject(BLACK_PEN));

            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:
 
            DeleteObject(hBtm);
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The example paints a rectangle; its interior is filled with 
a custom brush pattern.

hBtm = CreateBitmap(8, 8, 1, 1, (LPBYTE) bits);

We create a bitmap pattern with the CreateBitmap
function.

HBRUSH hCustomBrush = CreatePatternBrush(hBtm);

The CreatePatternBrush function creates a brush
object from the provided bitmap.

HBRUSH hOldBrush = SelectObject(hdc, hCustomBrush);

We select the custom brush with the SelectObject
function.

SelectObject(hdc, GetStockObject(NULL_PEN));

We not draw the outline of the rectangle. No outline
is drawn when we select the NULL_PEN.

Rectangle(hdc, 20, 20, 250, 160);

The rectangle is painted with the Rectangle
function; its interior is painted with the selected custom
brush.

![custombrush.png](images/custombrush.png)

Figure: Custom brush

## Shapes

Shapes are more sophisticated geometrical objects. We draw various
geometrical shapes in the following example.

shapes.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Shapes";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Shapes",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 390, 230, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;
    const POINT polygon[10] = { 30, 145, 85, 165, 105, 
        110, 65, 125, 30, 105 };

    switch(msg) {
  
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);
 
            Ellipse(hdc, 30, 30, 120, 90);
            RoundRect(hdc, 150, 30, 240, 90, 15, 20);
            Chord(hdc, 270, 30, 360, 90, 270, 45, 360, 45);
            Polygon(hdc, polygon, 5);
            Rectangle(hdc, 150, 110, 230, 160);

            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In our example, we have created an ellipse, a rounded rectangle, 
a chord, a polygon, and a rectangle.

Ellipse(hdc, 30, 30, 120, 90);

The Ellipse function draws an ellipse. The parameters of Ellipse
are the x and y coordinates of the upper-left and bottom-right corner of a bounding rectangle. 
The ellipse is drawn within this rectangle.

RoundRect(hdc, 150, 30, 240, 90, 15, 20);

The RoundRect function draws a rectangle with rounded corners.
The parameters of RoundRect are the x and y coordinates 
of the upper-left and bottom-right corner of a bounding rectangle. The last
two parameters are the width and height of the ellipse used to draw the rounded
corners.

Chord(hdc, 270, 30, 360, 90, 270, 45, 360, 45);

The Chord function draws a chord. A chord is a a region 
bounded by the intersection of an ellipse and a line segment.
The first four parameters are the x and y coordinates of the 
top-left corner and x and y coordinates of the bottom-right corner
of the bounding rectangle. The next four parameters are the x and y
coordinates of the radial defining the beginning of the chord and 
x and y coordinates of the radial defining the end of the chord.

Polygon(hdc, polygon, 5);

The Polygon function draws a polygon consisting of two or more 
vertices connected by straight lines. The polygon is a pointer to an array of 
POINT structures that specify the vertices of the polygon. The 
last parameter is the number of points in the array.

Rectangle(hdc, 150, 110, 230, 160);

The Rectangle function draws a rectangle. The parameters
of the function are the x and y coordinates of the upper-left and lower-right
corner of the rectangle.

![shapes.png](images/shapes.png)

Figure: Shapes

## Star

In the following example, we draw a star shape with the Polyline
function.

BOOL Polyline(HDC hdc, const POINT *lppt, int cPoints);

The Polyline function draws a series of line segments by connecting 
the points in the specified array. The function's first parameter is a handle to 
a device context. The second parameter is a pointer to an array of POINT 
structures. The third parameter is the number of points in the array. This number must 
be greater than or equal to two.

star.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Star";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Star",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 300, 250, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HDC hdc;
    PAINTSTRUCT ps;

    POINT points[11] = { 
        { 10, 85 }, 
        { 85, 75 }, 
        { 110, 10 }, 
        { 135, 75 }, 
        { 210, 85 },
        { 160, 125 }, 
        { 170, 190 },
        { 110, 150 }, 
        { 50, 190 },
        { 60, 125 },
        { 10, 85 } 
    };

    switch(msg) {
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);
            Polyline(hdc, points, 11);
            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:
 
            PostQuitMessage(0);
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The example draws a star object.

POINT points[11] = { 
    { 10, 85 }, 
    { 85, 75 }, 
    { 110, 10 }, 
    { 135, 75 }, 
    { 210, 85 },
    { 160, 125 }, 
    { 170, 190 },
    { 110, 150 }, 
    { 50, 190 },
    { 60, 125 },
    { 10, 85 } 
};

This is an array of POINTS of the star.

Polyline(hdc, points, 11);

The Polyline function draws the star shape.

![star.png](images/star.png)

Figure: Star

## Text

The TextOutW function writes a character string at the specified 
location, using the currently selected font, background colour, and text colour.

BOOL TextOut(HDC hdc, int nXStart, int nYStart, LPCTSTR lpString, int cchString);

The function's first parameter is a handle to the device context. The next two 
parameters are the x and y coordinates of the reference point that the system uses 
to align the string. The third parameter is a pointer to the string to be drawn. 
The last parameter is the length of the string.

sonnet55.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {
    
    MSG  msg ;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Sonnet 55";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_BTNFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Sonnet 55",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 390, 350, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
  WPARAM wParam, LPARAM lParam) {
  
    HDC hdc;
    PAINTSTRUCT ps;

    DWORD color;

    HFONT hFont, holdFont;

    static wchar_t *ver1 = L"Not marble, nor the gilded monuments";
    static wchar_t *ver2 = L"Of princes, shall outlive this powerful rhyme;";
    static wchar_t *ver3 = L"But you shall shine more bright in these contents";
    static wchar_t *ver4 = L"Than unswept stone, besmear'd with sluttish time.";
    static wchar_t *ver5 = L"When wasteful war shall statues overturn,";
    static wchar_t *ver6 = L"And broils root out the work of masonry,";
    static wchar_t *ver7 = L"Nor Mars his sword, nor war's quick fire shall burn";
    static wchar_t *ver8 = L"The living record of your memory.";
    static wchar_t *ver9 = L"'Gainst death, and all oblivious enmity";
    static wchar_t *ver10 = L"Shall you pace forth; your praise shall still find room";
    static wchar_t *ver11 = L"Even in the eyes of all posterity";
    static wchar_t *ver12 = L"That wear this world out to the ending doom.";
    static wchar_t *ver13 = L"So, till the judgment that yourself arise,";
    static wchar_t *ver14 = L"You live in this, and dwell in lovers' eyes.";

    switch(msg) {
    
        case WM_PAINT:

            hdc = BeginPaint(hwnd, &amp;ps);

            color = GetSysColor(COLOR_BTNFACE);
            SetBkColor(hdc, color);

            hFont = CreateFontW(15, 0, 0, 0, FW_MEDIUM, 0, 0, 0, 0,
                                0, 0, 0, 0, L"Georgia");
            holdFont = SelectObject(hdc, hFont);

            TextOutW(hdc, 50, 20,  ver1,  lstrlenW(ver1));
            TextOutW(hdc, 50, 40,  ver2,  lstrlenW(ver2));
            TextOutW(hdc, 50, 60,  ver3,  lstrlenW(ver3));
            TextOutW(hdc, 50, 80,  ver4,  lstrlenW(ver4));
            TextOutW(hdc, 50, 100, ver5,  lstrlenW(ver5));
            TextOutW(hdc, 50, 120, ver6,  lstrlenW(ver6));
            TextOutW(hdc, 50, 140, ver7,  lstrlenW(ver7));
            TextOutW(hdc, 50, 160, ver8,  lstrlenW(ver8));
            TextOutW(hdc, 50, 180, ver9,  lstrlenW(ver9));
            TextOutW(hdc, 50, 200, ver10, lstrlenW(ver10));
            TextOutW(hdc, 50, 220, ver11, lstrlenW(ver11));
            TextOutW(hdc, 50, 240, ver12, lstrlenW(ver12));
            TextOutW(hdc, 50, 260, ver13, lstrlenW(ver13));
            TextOutW(hdc, 50, 280, ver14, lstrlenW(ver14));

            SelectObject(hdc, holdFont);
            DeleteObject(hFont);

            EndPaint(hwnd, &amp;ps);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
           return 0;
    }
  
    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

We draw a few verses on the window with the TextOutW function.

color = GetSysColor(COLOR_BTNFACE);
SetBkColor(hdc, color);

By default, if we draw some text on the client area of the window, the
background is set to white color. We can change this by setting the
background color using the SetBkColor function. We used the
typical Windows gray color. The GetSysColor function is used
to get the system colors used in buttons, title, or the backround of window controls.

hFont = CreateFontW(15, 0, 0, 0, FW_MEDIUM, 0, 0, 0, 0,
                    0, 0, 0, 0, L"Georgia");
holdFont = SelectObject(hdc, hFont);

Here we create a font object with the CreateFontW function. The 
function has 14 parameters; we do not have to specify all of them. We specify 
only the font size, font weight, and the fontface parameters.

TextOutW(hdc, 50, 20, verse1, lstrlenW(verse1));

The text is drawn onto the window using the TextOutW
function. The length of the string is determined with the lstrlenW
function.

![sonnet55.png](images/sonnet55.png)

Figure: Text

## Drawing a bitmap

A bitmap is a graphical object used to create, manipulate, 
and store images as files on a disk. BMP is the native bitmap 
format of Windows and is used to store virtually 
any type of bitmap data. 

drawbitmap.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;
    WNDCLASSW wc = {0};

    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpszClassName = L"Draw Bitmap";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Draw Bitmap",
          WS_OVERLAPPEDWINDOW | WS_VISIBLE,
          100, 100, 280, 220, NULL, NULL, hInstance, NULL);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
        
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {

    static HBITMAP hBitmap;
    HDC hdc;
    PAINTSTRUCT ps;
    BITMAP bitmap;
    HDC hdcMem;
    HGDIOBJ oldBitmap;

    switch(msg) {

        case WM_CREATE:
     
             hBitmap = (HBITMAP) LoadImageW(NULL, L"C:\\prog\\slovakia.bmp", 
                        IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE);

             if (hBitmap == NULL) {
                 MessageBoxW(hwnd, L"Failed to load image", L"Error", MB_OK); 
             }

             break;      

        case WM_PAINT:
        
             hdc = BeginPaint(hwnd, &amp;ps);

             hdcMem = CreateCompatibleDC(hdc);
             oldBitmap = SelectObject(hdcMem, hBitmap);

             GetObject(hBitmap, sizeof(bitmap), &amp;bitmap);
             BitBlt(hdc, 5, 5, bitmap.bmWidth, bitmap.bmHeight, 
                 hdcMem, 0, 0, SRCCOPY);

             SelectObject(hdcMem, oldBitmap);
             DeleteDC(hdcMem);

             EndPaint(hwnd, &amp;ps);

             break;

        case WM_DESTROY:

            DeleteObject(hBitmap);
            PostQuitMessage(0);
            
            return 0;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The example draws the national flag of Slovakia on the window.
The picture is in the BMP file format.

static HBITMAP hBitmap;

HBITMAP is a handle to a bitmap object.

BITMAP bitmap;

The BITMAP structure defines the type, width, height, color 
format, and bit values of a bitmap.

hBitmap = (HBITMAP) LoadImageW(NULL, L"C:\\prog\\slovakia.bmp", 
        IMAGE_BITMAP, 0, 0, LR_LOADFROMFILE);

The LoadImageW function loads a BMP image from 
the disk. It returns a handle to the bitmap.

GetObject(hBitmap, sizeof(bitmap), &amp;bitmap);

The GetObject function stores information about the bitmap
in the provided BITMAP structure.

hdcMem = CreateCompatibleDC(hdc);

The CreateCompatibleDC function creates a memory device 
context compatible with the application's current screen.

oldBitmap = SelectObject(hdcMem, hBitmap);

The SelectObject function selects an object into the memory device context.
A bitmap must be selected into the memory device context before it may be used for anything. 

BitBlt(hdc, 5, 5, bitmap.bmWidth, bitmap.bmHeight, hdcMem, 0, 0, SRCCOPY);

The BitBlt function performs a bit-block transfer of the color 
data corresponding to a rectangle of pixels from the specified source 
device context into a destination device context.

SelectObject(hdcMem, oldBitmap);

An application should always replace a new object with the original, 
default object after it has finished drawing with the new object.

DeleteDC(hdcMem);

The resources associated with the memory device context are released.

![drawbitmap.png](images/drawbitmap.png)

Figure: Drawing a bitmap

In this part of the Windows API tutorial, we did some drawing.

[Contents](..)
[Previous](../customcontrols/)