+++
title = "A window in Windows API"
date = 2025-08-29T19:57:42.520+01:00
draft = false
description = "In this part of the Winapi tutorial, we will create a simple window."
image = "images/window.png"
imageBig = "images/window.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datetime/)
[Next](../firststeps/)

# A window in Windows API

last modified October 18, 2023

A window is a rectangular area of the screen where the application displays
output and receives input from the user. Everything is a window in Windows. At
least from the programmer's point of view. A main window, a button, a static
text even an icon; all are windows. A static text is only a special kind of a
window, so is the desktop area.

## The wWinMain function

Every Windows UI application must have at least two functions: the WinMain
function and the *window procedure.* The WinMain function is the entry
point to a Windows UI application. It initialises the application, shows the
application window on the screen, and enters the main loop. In our examples, we
use the wWinMain function prototype, which is used for creating
Unicode UI programs.

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR pCmdLine, int nCmdShow);

The hInstance is a handle of an instance. It is a 32-bit number
identifying the instance of our program within the OS environment. This number
is given by Windows when the program starts executing. The
hPrevInstance parameter is always NULL; it is a legacy
from the 16-bit Windows. Windows programs can also be started from the command
line. The parameters given are stored in pCmdLine parameter. The
nCmdShow value specifies how the window will be displayed:
minimised, maximised, or hidden.

The wWinMain function terminates when it receives the
WM_QUIT message.

## Registering a window class

Before we can create a window, we must register its class within the Windows.
Many controls have their window classes already registered. So when we create a
button or a static text, we do not need to register a window class for them. To
register a window class, we must create and fill a WNDCLASS
structure. We set the window style, extra allocation bytes, window class name,
handle of the program instance, background brush, optional menu name, window
procedure, handle of the cursor, and an icon. Then the
RegisterClassW function is called.

## Creating a window

The window is created by calling the CreateWindowW function.

HWND CreateWindowW(LPCWSTR lpClassName, LPCWSTR lpWindowName,
  DWORD dwStyle, int x, int y, int nWidth, int nHeight,
  HWND hWndParent, HMENU hMenu, HINSTANCE hInstance, LPVOID lpParam);

The lpClassName uniquely identifies the window. It is the name
under which we registered the window. The lpWindowName is the
window name. Its effect depends on the context—it can be title of the window in
parent windows or a label in child windows like button or static text. Windows
can be created using several styles. For this, we have the dwStyle
parameter. The x, y specify the initial horizontal
and vertical position of the window. The nWidth and
nHeight specify the window width and height. 

 
The hWndParent is a handle to the parent window. For windows that
do not have parents, we use NULL. For a parent window the
hMenu is an optional handle to the menu, for a child window, it is
a control identifier. The hInstance is a handle to the program
instance. The lpParam is the last parameter, it is an optional
value passed to the window during the WM_CREATE message. The
CreateWindowW function returns a handle to the newly created window.

## Messages

The WinMain function creates a *message loop*. It is an
endless cycle which runs during the life of the application. Message loop is a
programming construct that waits for and dispatches events or messages in a
program. Windows communicate using messages. A *message* is an integer
value that identifies a specific event—a button click, resizing of the window,
or closing of an application. 

There can be multiple messages created in one moment. The messages cannot be
processed all at the same time; therefore they are stored in a 
*message queue*. The message enters the message queue and waits until it
is processed. The GetMessage function retrieves the message from
the message queue. The DispatchMessage function dispatches a
message to a window procedure. If the application obtains character input, we
include the TranslateMessage function in the loop.

## Window procedure

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

Every window has an associated window procedure. It is a function that receives
messages. The hwnd is a handle to the window that is going to
receive the message. The uMsg is the message. The
wParam and lParam parameters provide additional
message information. The values of these parameters depend on the message type.

The messages come from the user or from the operating system. We react to a
message or we call the default window procedure to provide default processing.
Most messages are sent to the default window procedure. The default window
procedure is called DefWindowProcW. It is called with the same
parameters as the normal window procedure.

## A simple window

The following example shows a skeletal Windows application.

simplewindow.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR pCmdLine, int nCmdShow) {

    MSG msg;
    HWND hwnd;
    WNDCLASSW wc;

    wc.style         = CS_HREDRAW | CS_VREDRAW;
    wc.cbClsExtra    = 0;
    wc.cbWndExtra    = 0;
    wc.lpszClassName = L"Window";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpszMenuName  = NULL;
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(NULL, IDC_ARROW);
    wc.hIcon         = LoadIcon(NULL, IDI_APPLICATION);

    RegisterClassW(&amp;wc);
    hwnd = CreateWindowW(wc.lpszClassName, L"Window",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                100, 100, 350, 250, NULL, NULL, hInstance, NULL);

    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {

        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {

    switch(msg) {

      case WM_DESTROY:

          PostQuitMessage(0);
          break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

We are going to explain the example code step by step.

#include &lt;windows.h&gt;

This is a header file for the C programming language. It contains all function
declarations in the API, all common macros and all the data types. The Windows
API is added to the C programming project by linking the necessary
libraries—kernel32.lib,
user32.lib, gdi32.lib—and by including the
&lt;windows.h&gt; header file.

wc.style = CS_HREDRAW | CS_VREDRAW;

We set the window style here. The CS_HREDRAW and
CS_VREDRAW flags mean that whenever there is a movement or
size adjustment of the height or width of the window, the entire window
is redrawn.

wc.cbClsExtra    = 0;
wc.cbWndExtra    = 0;

In our example, we do not use the additional bytes. So we set the members to
zero. The most common use of those two attributes is window subclassing.

wc.lpszClassName = L"Window";

Window is a class name for this particular window type. We use this class
name when creating the window. The L character precedes wide
strings.

wc.hInstance = hInstance;

We set the instance of our program.

wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);

Here we set the background brush. It is the colour that is used to paint the
client area of the window.

wc.lpszMenuName  = NULL;

In our example, we do not create a menu.

wc.lpfnWndProc = WndProc;

We provide the window procedure for the window class.

wc.hCursor = LoadCursor(NULL, IDC_ARROW);

We set the cursor for our application. We load the cursor from system resources
by using the LoadCursor function. IDC_ARROW is a value
for a standard arrow cursor.

wc.hIcon   = LoadIcon(NULL, IDI_APPLICATION);

We set the icon for our application. The icon is retrieved from system resources
with the LoadIcon function. IDI_APPLICATION is a value
for a default application icon.

RegisterClassW(&amp;wc);

We register the window class with the system.

ShowWindow(hwnd, nCmdShow);
UpdateWindow(hwnd);

These two lines show the window on the screen. The nCmdShow
specifies how we display the window on the screen.

while (GetMessage(&amp;msg, NULL, 0, 0)) {

  DispatchMessage(&amp;msg);
}

This is the message loop. We receive messages from the message queue using
the GetMessage function and dispatch them to the window
procedure using the DispatchMessage function.

return (int) msg.wParam;

At the end of the application, the exit code is returned to the system.

switch(msg) {

  case WM_DESTROY:

    PostQuitMessage(0);
    break;
}

return DefWindowProcW(hwnd, msg, wParam, lParam);

In the window procedure, we react to the WM_DESTROY message.
The PostQuitMessage sends the WM_QUIT message to
the message queue. All other messages are sent to the default processing
using the DefWindowProcW function.

![window.png](images/window.png)

Figure: A window

In this part of the Windows API tutorial, we have created a basic window.

[Contents](..)
[Previous](../datetime/)
[Next](../firststeps/)