+++
title = "Windows API controls I"
date = 2025-08-29T19:57:36.031+01:00
draft = false
description = "In this part of the Windows API tutorial, we cover static control, button, check box, and edit box controls."
image = "images/statictext.png"
imageBig = "images/statictext.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dialogs/)
[Next](../controlsII/)

# Windows API controls I

last modified October 18, 2023

Controls are basic building blocks of a Windows application. (Controls are 
called widgets in UNIX.) This part of the Windows API tutorial covers a
static control, a button, a check box, and an edit box.

Controls are windows too. They are created using the CreateWindowW or
CreateWindowExW functions. These functions take a window class name as
their first and second parameter respectively. Controls have their specific predefined 
window class names; therefore, we do not call the RegisterClassW or
RegisterClassExW when we create controls.

## Static control

*Static control* displays text and graphics. The static control 
cannot be selected. It also cannot have keyboard focus.

### Static text

In the first example, we create a static text control.

static_text.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Static Control";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

  
    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Criminal",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 330, 270, 0, 0, hInstance, 0);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
  
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {

    static wchar_t *lyrics =  L"I know you told me I should stay away\n\
I know you said he's just a dog astray\n\
He is a bad boy with a tainted heart\n\
And even I know this ain't smart\n\
\n\
But mama, I'm in love with a criminal\n\
And this type of love isn't rational, it's physical\n\
Mama, please don't cry, I will be alright\n\
All reason aside, I just can't deny, love the guy\n\
";

    switch(msg) {

        case WM_CREATE:
      
            CreateWindowW(L"Static", lyrics, 
                WS_CHILD | WS_VISIBLE | SS_LEFT,
                20, 20, 300, 230, 
                hwnd, (HMENU) 1, NULL, NULL);
            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

The example shows lyrics of a song on a window.

CreateWindowW(L"Static", lyrics, 
    WS_CHILD | WS_VISIBLE | SS_LEFT,
    20, 20, 300, 230,
    hwnd, (HMENU) 1, NULL, NULL);
break;

The static control is created with the L"Static" class. The text is aligned 
to the left with the SS_LEFT style.

![statictext.png](images/statictext.png)

Static text control

### Static image

The second example creates a static image control.

static_image.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void LoadMyImage(void);

HBITMAP hBitmap;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Static image";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0,IDC_ARROW);

  
    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Static image",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 330, 270, 0, 0, hInstance, 0);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    HWND hsti;

    switch(msg) {

        case WM_CREATE:
    
            LoadMyImage();
            hsti = CreateWindowW(L"Static", L"", 
                WS_CHILD | WS_VISIBLE | SS_BITMAP,
                5, 5, 300, 300, hwnd, (HMENU) 1, NULL, NULL);

            SendMessage(hsti, STM_SETIMAGE,
                (WPARAM) IMAGE_BITMAP, (LPARAM) hBitmap); 
            break;

        case WM_DESTROY:

            DeleteObject(hBitmap);
            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void LoadMyImage(void) {

    hBitmap = LoadImageW(NULL, L"C:\\prog\\slovakia.bmp", IMAGE_BITMAP,
        0, 0, LR_LOADFROMFILE);
}

The example shows a BMP image on the window.

hsti = CreateWindowW(L"Static", L"", 
        WS_CHILD | WS_VISIBLE | SS_BITMAP,
        5, 5, 300, 300, hwnd, (HMENU) 1, NULL, NULL);

The SS_BITMAP constant makes the static control display
a bitmap.

SendMessage(hsti, STM_SETIMAGE,
        (WPARAM) IMAGE_BITMAP, (LPARAM) hBitmap); 

The STM_SETIMAGE message is sent to associate a new image 
with a static control.

void LoadMyImage(void) {

    hBitmap = LoadImageW(NULL, L"C:\\prog\\slovakia.bmp", IMAGE_BITMAP,
        0, 0, LR_LOADFROMFILE);
}

The LoadImageW function loads a bitmap from the filesystem.
If the function succeeds, the return value is the handle of the 
newly loaded image.

![staticimage.png](images/staticimage.png)

Static image control

## Button

*Button* is a simple control with a text label. It is used to 
trigger an action. When we click on a button, it sends a WM_COMMAND
message to its parent window. The low-order word of the wParam
parameter contains the control identifier. 

button.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

#define ID_BEEP 1
#define ID_QUIT 2

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Buttons";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Buttons",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  150, 150, 300, 200, 0, 0, hInstance, 0);

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

            CreateWindowW(L"Button", L"Beep",
                WS_VISIBLE | WS_CHILD ,
                20, 50, 80, 25, hwnd, (HMENU) ID_BEEP, NULL, NULL);

            CreateWindowW(L"Button", L"Quit",
                WS_VISIBLE | WS_CHILD ,
                120, 50, 80, 25, hwnd, (HMENU) ID_QUIT, NULL, NULL);
            break;

        case WM_COMMAND:

            if (LOWORD(wParam) == ID_BEEP) {
            
                MessageBeep(MB_OK);
            }

            if (LOWORD(wParam) == ID_QUIT) {
            
                PostQuitMessage(0);
            }

            break;

        case WM_DESTROY:

            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In our example we have created two buttons. One button will beep. 
The other one will close the window. 

CreateWindowW(L"Button", L"Beep",
    WS_VISIBLE | WS_CHILD ,
    20, 50, 80, 25, hwnd, (HMENU) ID_BEEP, NULL, NULL);

The button control is created with the L"Button" class.

case WM_COMMAND:

    if (LOWORD(wParam) == ID_BEEP) {
    
        MessageBeep(MB_OK);
    }

    if (LOWORD(wParam) == ID_QUIT) {
    
        PostQuitMessage(0);
    }

    break;

The control's ID is in the LOWORD of the wParam. 
Depending on the ID, we call the MessageBeep function or 
the PostQuitMessage function. 

![buttons.png](images/buttons.png)

Button controls

## Check box

*Check box control* is a box that you can click to turn an 
option on or off. 

checkbox.c
  

#include &lt;windows.h&gt;
#include &lt;stdbool.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
                    
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Check Box";
    wc.hInstance     = hInstance ;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Check Box",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  150, 150, 230, 150, 0, 0, hInstance, 0);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    bool checked = true;

    switch(msg) {
  
        case WM_CREATE:

            CreateWindowW(L"button", L"Show Title",
                WS_VISIBLE | WS_CHILD | BS_CHECKBOX,
                20, 20, 185, 35, hwnd, (HMENU) 1, 
                NULL, NULL);

            CheckDlgButton(hwnd, 1, BST_CHECKED);
            break;

        case WM_COMMAND:

            checked = IsDlgButtonChecked(hwnd, 1);

            if (checked) {

                CheckDlgButton(hwnd, 1, BST_UNCHECKED);
                SetWindowTextW(hwnd, L"");

            } else {

               CheckDlgButton(hwnd, 1, BST_CHECKED);
               SetWindowTextW(hwnd, L"Check Box");
            }
      
            break;
 
       case WM_DESTROY:

            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In our example, we show or hide the window title depending on the state of 
the check box. 

CreateWindowW(L"button", L"Show Title",
    WS_VISIBLE | WS_CHILD | BS_CHECKBOX,
    20, 20, 185, 35, hwnd, (HMENU) 1, 
    NULL, NULL);

Check box is a special kind of a button. It is created with the BS_CHECKBOX flag.

checked = IsDlgButtonChecked(hwnd, 1);

We determine the state of the check box using the IsDlgButtonChecked 
function. 

CheckDlgButton(hwnd, 1, BST_UNCHECKED);

We check and uncheck the check box using the CheckDlgButton 
function.

SetWindowTextW(hwnd, L"");

The SetWindowTextW function sets the title of the window.

![checkbox.png](images/checkbox.png)

Checkbox control

## Edit control

*Edit control* is a rectangular child window used to enter 
and edit text. It can be single line or multiline. 

edit.c
  

#include &lt;windows.h&gt;

#define ID_EDIT 1
#define ID_BUTTON 2

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Edit control";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Edit control",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  220, 220, 280, 200, 0, 0, hInstance, 0);  

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
      TranslateMessage(&amp;msg);
      DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {

    static HWND hwndEdit;
    HWND hwndButton;

    switch(msg) {

        case WM_CREATE:

            hwndEdit = CreateWindowW(L"Edit", NULL, 
                WS_CHILD | WS_VISIBLE | WS_BORDER,
                50, 50, 150, 20, hwnd, (HMENU) ID_EDIT,
                NULL, NULL);

            hwndButton = CreateWindowW(L"button", L"Set title",
                WS_VISIBLE | WS_CHILD, 50, 100, 80, 25,
                hwnd, (HMENU) ID_BUTTON, NULL, NULL);

            break;

        case WM_COMMAND:	

            if (HIWORD(wParam) == BN_CLICKED) {

                int len = GetWindowTextLengthW(hwndEdit) + 1;
                wchar_t text[len];

                GetWindowTextW(hwndEdit, text, len);
                SetWindowTextW(hwnd, text);
            }

            break;

        case WM_DESTROY:
            PostQuitMessage(0);
            break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

In our example, we have an edit control and a button. We can put some text 
into the edit control. If we click on the button, the entered text will
be displayed in the titlebar of the main window. 

hwndEdit = CreateWindowW(L"Edit", NULL, 
    WS_CHILD | WS_VISIBLE | WS_BORDER,
    50, 50, 150, 20, hwnd, (HMENU) ID_EDIT,
    NULL, NULL);

The edit control is created with the L"Edit" window class. 
The WS_BORDER window style creates a thin-line border around the control.

if (HIWORD(wParam) == BN_CLICKED) {

   int len = GetWindowTextLengthW(hwndEdit) + 1;
   wchar_t text[len];

   GetWindowTextW(hwndEdit, text, len);
   SetWindowTextW(hwnd, text);
}

The GetWindowTextLengthW returns the length of the entered text. Notice
that we add 1 to the length. This is to include the zero terminator. Try to 
omit it and see what happens. The GetWindowTextW receives the text 
from the edit control. The function's first parameter is the handle to the window 
or control containing the text. The SetWindowTextW sets the text for 
the window. In this context, it is the title of the main window.

![editcontrol.png](images/editcontrol.png)

Figure: Edit control

In this part of the Windows API tutorial, we have covered four basic 
Windows controls. 

[Contents](..)
[Previous](../dialogs/)
[Next](../controlsII/)