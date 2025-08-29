+++
title = "Windows API dialogs"
date = 2025-08-29T19:57:38.560+01:00
draft = false
description = "In this part of the Windows API tutorial, we work with dialogs."
image = "images/modelessdialog.png"
imageBig = "images/modelessdialog.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../menus/)
[Next](../controls/)

# Windows API dialogs

last modified October 18, 2023

Dialog windows or dialogs are an indispensable part of most modern GUI 
applications. A dialog is defined as a conversation between two or more persons. 
In a computer application a dialog is a window which is used to "talk" to 
the application. A dialog is used to input data, modify data, change the application 
settings etc. Dialogs are important means of communication between a user and a computer program.

## Modeless Dialog

Modeless dialogs does not restrict you to working with a particular window. 
A user can switch between a dialog box and other windows of a program.
A typical modeless dialog is a Find and Replace dialog or a floating toolbar.

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK DialogProc(HWND, UINT, WPARAM, LPARAM);

void CreateDialogBox(HWND);
void RegisterDialogClass(HWND);

HINSTANCE ghInstance;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR pCmdLine, int nCmdShow) {

  MSG  msg;    
  HWND hwnd;

  WNDCLASSW wc = {0};

  wc.lpszClassName = L"Window";
  wc.hInstance     = hInstance;
  wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
  wc.lpfnWndProc   = WndProc;
  
  RegisterClassW(&amp;wc);
  hwnd = CreateWindowW(wc.lpszClassName, L"Window",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                100, 100, 250, 150, NULL, NULL, hInstance, NULL);  

  ghInstance = hInstance;

  while( GetMessage(&amp;msg, NULL, 0, 0)) {
    DispatchMessage(&amp;msg);
  }
  
  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {

  switch(msg) {
  
      case WM_CREATE:
          RegisterDialogClass(hwnd);
          CreateWindowW(L"button", L"Show dialog",    
              WS_VISIBLE | WS_CHILD ,
              20, 50, 95, 25, hwnd, (HMENU) 1, NULL, NULL);  
          break;

      case WM_COMMAND:
          CreateDialogBox(hwnd);
          break;

      case WM_DESTROY:
      {
          PostQuitMessage(0);
          return 0;
      }
  }
  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

LRESULT CALLBACK DialogProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
  switch(msg) {
  
    case WM_CREATE:
        CreateWindowW(L"button", L"Ok",    
          WS_VISIBLE | WS_CHILD ,
          50, 50, 80, 25, hwnd, (HMENU) 1, NULL, NULL);  
    break;

    case WM_COMMAND:
        DestroyWindow(hwnd);
    break;

    case WM_CLOSE:
        DestroyWindow(hwnd);
        break;

  }
  
  return (DefWindowProcW(hwnd, msg, wParam, lParam));
}

void RegisterDialogClass(HWND hwnd) {

  WNDCLASSEXW wc = {0};
  wc.cbSize           = sizeof(WNDCLASSEXW);
  wc.lpfnWndProc      = (WNDPROC) DialogProc;
  wc.hInstance        = ghInstance;
  wc.hbrBackground    = GetSysColorBrush(COLOR_3DFACE);
  wc.lpszClassName    = L"DialogClass";
  RegisterClassExW(&amp;wc);

}

void CreateDialogBox(HWND hwnd) {

  CreateWindowExW(WS_EX_DLGMODALFRAME | WS_EX_TOPMOST,  L"DialogClass", L"Dialog Box", 
        WS_VISIBLE | WS_SYSMENU | WS_CAPTION , 100, 100, 200, 150, 
        NULL, NULL, ghInstance,  NULL);
}

A dialog is only a special kind of a window. It is created as a normal 
window with some specific flags.

CreateWindowExW(WS_EX_DLGMODALFRAME | WS_EX_TOPMOST,  L"DialogClass", L"Dialog Box", 
    WS_VISIBLE | WS_SYSMENU | WS_CAPTION , 100, 100, 200, 150, 
    NULL, NULL, ghInstance,  NULL);

The dialog is created with a combination of regular flags 
WS_VISIBLE | WS_SYSMENU | WS_CAPTION and extended flags 
WS_EX_DLGMODALFRAME | WS_EX_TOPMOST.

![modelessdialog.png](images/modelessdialog.png)

Figure: Modeless dialog

## Common Dialog Boxes

These are dialogs for performing common tasks. Opening and saving files, printing 
documents, choosing colour etc. Common dialog boxes save programmers a lot of work. 
They help promote standards in applications. 

### Colour dialog box

This is a common dialog for choosing colour. 

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
LRESULT CALLBACK PanelProc(HWND, UINT, WPARAM, LPARAM);

void RegisterPanel(void);
COLORREF ShowColorDialog(HWND);

COLORREF gColor = RGB(255, 255, 255);

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR pCmdLine, int nCmdShow) {
    
  MSG  msg ;    
  WNDCLASSW wc = {0};
  wc.lpszClassName = L"Color dialog box";
  wc.hInstance     = hInstance;
  wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
  wc.lpfnWndProc   = WndProc;
  
  RegisterClassW(&amp;wc);
  CreateWindowW( wc.lpszClassName, L"Color dialog box",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                150, 150, 250, 200, 0, 0, hInstance, 0);  

  while( GetMessage(&amp;msg, NULL, 0, 0)) {
    DispatchMessage(&amp;msg);
  }
  
  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {

  static HWND hwndPanel;

  switch(msg) {
  
    case WM_CREATE:
    {
        CreateWindowW(L"button", L"Color",
           WS_VISIBLE | WS_CHILD ,
           20, 30, 80, 25,
           hwnd, (HMENU) 1, NULL, NULL);

        RegisterPanel();
        hwndPanel = CreateWindowW(L"Panel", NULL, 
                    WS_CHILD | WS_VISIBLE,
                    130, 30, 80, 80, hwnd, (HMENU) 2, NULL, NULL);   
        break;
    }

    case WM_COMMAND:
    {
        gColor = ShowColorDialog(hwnd);
        InvalidateRect(hwndPanel, NULL, TRUE);    
        break;
    }

    case WM_DESTROY:
    {
        PostQuitMessage(0);
        break;
    }
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

LRESULT CALLBACK PanelProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {

  HDC hdc;
  PAINTSTRUCT ps; 
  RECT rect;

  switch(msg) {
  
    case WM_PAINT:
    {
        GetClientRect(hwnd, &amp;rect);
        hdc = BeginPaint(hwnd, &amp;ps);
        SetBkColor(hdc, gColor);
        ExtTextOut(hdc, 0, 0, ETO_OPAQUE, &amp;rect, "", 0, NULL);
        EndPaint(hwnd, &amp;ps);
        break;
    }
  }
  
  return DefWindowProc(hwnd, msg, wParam, lParam);
}

COLORREF ShowColorDialog(HWND hwnd) {

  CHOOSECOLOR cc;
  static COLORREF crCustClr[16];

  ZeroMemory(&amp;cc, sizeof(cc));
  cc.lStructSize = sizeof(cc);
  cc.hwndOwner = hwnd;
  cc.lpCustColors = (LPDWORD) crCustClr;
  cc.rgbResult = RGB(0, 255, 0);
  cc.Flags = CC_FULLOPEN | CC_RGBINIT;
  ChooseColor(&amp;cc);

  return cc.rgbResult;
}

void RegisterPanel(void) {

  WNDCLASSW rwc = {0};
  rwc.lpszClassName = L"Panel";
  rwc.hbrBackground = (HBRUSH) GetStockObject(WHITE_BRUSH);
  rwc.lpfnWndProc   = PanelProc;
  RegisterClassW(&amp;rwc);
}

In our example, we have a button control and a child window. The colour of 
the child window is white at the beginning. We can change the colour of the 
child window, by pressing on the button and choosing a custom colour value.

COLORREF gColor = RGB(255, 255, 255);

We define a global colour value; it is white by default.

gColor = ShowColorDialog(hwnd);

The color dialog box is shown in the ShowColorDialog user function. 
The function returns the chosen colour value.

CHOOSECOLOR cc; 

To create a color dialog box, we must define and fill a 
CHOOSECOLOR structure.

cc.rgbResult = RGB(0, 255, 0);
cc.Flags = CC_FULLOPEN | CC_RGBINIT;

If we provide the CC_RGBINIT then the rgbResult member is the 
initial selected color when the dialog is displayed. If the user clicks the 
OK button, the rgbResult specifies the user's colour selection.

ChooseColor(&amp;cc);

The color dialog box is displayed.

gColor = ShowColorDialog(hwnd);
InvalidateRect(hwndPanel, NULL, TRUE); 

After we obtain the colour value, we call the InvalidateRect function. 
This function will send WM_PAINT message to our child window. 

SetBkColor(hdc, gColor);
ExtTextOut(hdc, 0, 0, ETO_OPAQUE, &amp;rect, "", 0, NULL);

In the panel procedure, we change the background colour of the child window. 
Besides displaying text on the window, the ExtTextOut function 
can also change a window's background color. We won't display any text, we 
only change the background colour. 
If we provide the ETO_OPAQUE flag, the ExtTextOut function 
will use the color, specified by the SetBkColor function.

![colordialog.png](images/colordialog.png)

Figure: Color dialog box

### Openfile dialog box

This is a common dialog for opening files. Do not use UNICODE to 
compile this example. 

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateMenubar(HWND);
void OpenDialog(HWND);
void LoadFile(LPSTR);

#define IDM_FILE_NEW 1
HWND ghwndEdit;

int WINAPI WinMain( HINSTANCE hInstance, HINSTANCE hPrevInstance, 
    LPSTR lpCmdLine, int nCmdShow) {
    
  MSG  msg ;    
  WNDCLASS wc = {0};
  wc.lpszClassName = TEXT( "Opendialog" );
  wc.hInstance     = hInstance ;
  wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
  wc.lpfnWndProc   = WndProc ;
  wc.hCursor       = LoadCursor(0, IDC_ARROW);

  
  RegisterClass(&amp;wc);
  CreateWindow( wc.lpszClassName, TEXT("Opendialog"),
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                150, 150, 265, 200, 0, 0, hInstance, 0);  

  while( GetMessage(&amp;msg, NULL, 0, 0)) {
    DispatchMessage(&amp;msg);
  }
  
  return (int) msg.wParam;
}

LRESULT CALLBACK WndProc( HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
   
  switch(msg) {
  
      case WM_CREATE:
          ghwndEdit = CreateWindowEx(WS_EX_RIGHTSCROLLBAR, TEXT("edit"), NULL,
                    WS_VISIBLE | WS_CHILD | WS_HSCROLL | WS_VSCROLL | ES_MULTILINE,
                    0, 0, 260, 180,
                    hwnd, (HMENU) 1, NULL, NULL);

          CreateMenubar(hwnd);
          break;

      case WM_SIZE:
          SetWindowPos(ghwndEdit, NULL, 0, 0, LOWORD(lParam), HIWORD(lParam),
             SWP_NOMOVE | SWP_NOZORDER);
          break;

      case WM_COMMAND:
          if (wParam==IDM_FILE_NEW) {
              OpenDialog(hwnd);
          }
          break;

      case WM_DESTROY:
          PostQuitMessage(0);
          break;
  }
  
  return DefWindowProc(hwnd, msg, wParam, lParam);
}

void CreateMenubar(HWND hwnd) {

  HMENU hMenubar;
  HMENU hMenu;

  hMenubar = CreateMenu();
  hMenu = CreateMenu();
  AppendMenu(hMenubar, MF_POPUP, (UINT_PTR)hMenu, TEXT("&amp;File"));
  AppendMenu(hMenu, MF_STRING, IDM_FILE_NEW, TEXT("&amp;Open"));
  SetMenu(hwnd, hMenubar);
}

void OpenDialog(HWND hwnd) {

  OPENFILENAME ofn;
  TCHAR szFile[MAX_PATH];

  ZeroMemory(&amp;ofn, sizeof(ofn));
  ofn.lStructSize = sizeof(ofn);
  ofn.lpstrFile = szFile;
  ofn.lpstrFile[0] = '\0';
  ofn.hwndOwner = hwnd;
  ofn.nMaxFile = sizeof(szFile);
  ofn.lpstrFilter = TEXT("All files(*.*)\0*.*\0");
  ofn.nFilterIndex = 1;
  ofn.lpstrInitialDir = NULL;
  ofn.lpstrFileTitle = NULL;
  ofn.Flags = OFN_PATHMUSTEXIST | OFN_FILEMUSTEXIST;

  if(GetOpenFileName(&amp;ofn))
      LoadFile(ofn.lpstrFile);
}

void LoadFile(LPSTR file) {

  HANDLE hFile;
  DWORD dwSize;
  DWORD dw;

  LPBYTE lpBuffer = NULL;

  hFile = CreateFile(file, GENERIC_READ, 0, NULL, OPEN_EXISTING, 0, NULL);
  dwSize = GetFileSize(hFile, NULL);
  lpBuffer = (LPBYTE) HeapAlloc(GetProcessHeap(), 
      HEAP_GENERATE_EXCEPTIONS, dwSize + 1);
  ReadFile(hFile, (LPWSTR)lpBuffer, dwSize, &amp;dw, NULL);
  CloseHandle(hFile);
  lpBuffer[dwSize] = 0;
  SetWindowText(ghwndEdit, (LPSTR) lpBuffer);
  HeapFree(GetProcessHeap(), 0, lpBuffer);
}

In this example, we create a window with a multiline edit control. 

To create an openfile dialog box, we create and fill the 
OPENFILENAME structure.

ofn.lpstrFile = szFile;

If the OpenFileName function returns TRUE, 
the name of the selected file is in the lpstrFile member.

ofn.lpstrFilter = TEXT("All files(*.*)\0*.*\0");

This defines the file filter. In our example, the dialog shows all file types.

ofn.nFilterIndex = 1;

Specifies the index of the currently selected filter in the 
File Types combo box control. 

if(GetOpenFileName(&amp;ofn))
    LoadFile(ofn.lpstrFile);

We call the GetOpenFileName function to show the Openfile dialog box. 
If we click on the Open button, the function returns TRUE
and we call the user defined LoadFile function.

Inside the LoadFile function, we read the file and put the contents of 
the file into the edit control. We create a file handle. Than we 
find out the file size. Allocate dynamic memory for the contents of the file. 
Read the contents into the memory and put them into the edit control.
To put the contents into the edit control, we call the SetWindowText 
function. We must not forget to close the file handle and free the 
dynamic memory.

![opendialog.png](images/opendialog.png)

Figure: Openfile dialog box

In this part of the Windows API tutorial, we worked with dialogs.

[Contents](..) 
[Previous](../menus/)
[Next](../controls/)