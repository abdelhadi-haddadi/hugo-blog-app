+++
title = "Windows API menus"
date = 2025-08-29T19:57:41.368+01:00
draft = false
description = "In this part of the Windows API tutorial, we work with menus."
image = "images/simplemenu.png"
imageBig = "images/simplemenu.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firststeps/)
[Next](../dialogs/)

# Windows API menus

last modified October 18, 2023

In this part of the Windows API tutorial, we create menus. A *menu* is a group of 
commands located in a menubar. A *menubar* contains a list of menus. Menus can 
contain either menu items or other menus calls submenus. A menu 
item that carries out a command is called a command item or a command. On 
Windows, menubar is sometimes called a toplevel menu; menus and submenus
are called popup menus. Menu items are usually grouped into some logical groups. 
These groups are divided by a separator. The separator is a small horizontal line.

## A simple menu

In the following example, we create a menubar and three menu commands. 
We also create a separator. 

simplemenu.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void AddMenus(HWND);

#define IDM_FILE_NEW 1
#define IDM_FILE_OPEN 2
#define IDM_FILE_QUIT 3

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
                     
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Simple menu";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Simple menu",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 350, 250, 0, 0, hInstance, 0);

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
      
          AddMenus(hwnd);
          break;

      case WM_COMMAND:
      
          switch(LOWORD(wParam)) {
          
              case IDM_FILE_NEW:
              case IDM_FILE_OPEN:
              
                  MessageBeep(MB_ICONINFORMATION);
                  break;
                  
              case IDM_FILE_QUIT:
              
                  SendMessage(hwnd, WM_CLOSE, 0, 0);
                  break;
           }
           
           break;

      case WM_DESTROY:
      
          PostQuitMessage(0);
          break;
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void AddMenus(HWND hwnd) {

    HMENU hMenubar;
    HMENU hMenu;

    hMenubar = CreateMenu();
    hMenu = CreateMenu();

    AppendMenuW(hMenu, MF_STRING, IDM_FILE_NEW, L"&amp;New");
    AppendMenuW(hMenu, MF_STRING, IDM_FILE_OPEN, L"&amp;Open");
    AppendMenuW(hMenu, MF_SEPARATOR, 0, NULL);
    AppendMenuW(hMenu, MF_STRING, IDM_FILE_QUIT, L"&amp;Quit");

    AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) hMenu, L"&amp;File");
    SetMenu(hwnd, hMenubar);
}

Two menu items make a short sound. The third terminates the application.

case WM_COMMAND:

    switch(LOWORD(wParam)) {
    
        case IDM_FILE_NEW:
        case IDM_FILE_OPEN:
        
            MessageBeep(MB_ICONINFORMATION);
            break;
            
        case IDM_FILE_QUIT:
        
            SendMessage(hwnd, WM_CLOSE, 0, 0);
            break;
    }
    
    break;

If we select a menu item, the window procedure receives the 
WM_COMMAND message. The menu item id is in the low 
order word of the wParam value.

hMenubar = CreateMenu();
hMenu = CreateMenu();

Menubar and menus are created using the CreateMenu function.

AppendMenuW(hMenu, MF_STRING, IDM_FILE_NEW, L"&amp;New");
AppendMenuW(hMenu, MF_STRING, IDM_FILE_OPEN, L"&amp;Open");
AppendMenuW(hMenu, MF_SEPARATOR, 0, NULL);
AppendMenuW(hMenu, MF_STRING, IDM_FILE_QUIT, L"&amp;Quit");

AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) hMenu, L"&amp;File");

Menu items and submenus are created using the AppendMenuW 
function. What are we going to append, depends on the flag. 
The MF_STRING appends a label, the MF_SEPARATOR 
appends a separator and the MF_POPUP appends a menu.

SetMenu(hwnd, hMenubar);

Finally, we set the menubar calling the SetMenu function.

![simplemenu.png](images/simplemenu.png)

Figure: A simple menu

## A popup menu

A popup menu is also called context menu. It is a list of commands that appears 
under some context. For example, in a Firefox web browser when we right click 
on a web page, we get a context menu. Here we can reload a page, go back, or 
view a page source. If we right click on a toolbar, we get another context menu 
for managing toolbars. 

popupmenu.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

#define IDM_FILE_NEW 1
#define IDM_FILE_OPEN 2
#define IDM_FILE_QUIT 3

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Popup menu";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Popup menu",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 350, 250, 0, 0, hInstance, 0);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg,
    WPARAM wParam, LPARAM lParam) {
    
    HMENU hMenu;
    POINT point;

    switch(msg) {
  
      case WM_COMMAND:
    
          switch(LOWORD(wParam)) {
        
              case IDM_FILE_NEW:
              case IDM_FILE_OPEN:
            
                  MessageBeep(MB_ICONINFORMATION);
                  break;
                
              case IDM_FILE_QUIT:
            
                  SendMessage(hwnd, WM_CLOSE, 0, 0);
                  break;
          }
        
          break;

      case WM_RBUTTONUP:
     
          point.x = LOWORD(lParam);
          point.y = HIWORD(lParam);
        
          hMenu = CreatePopupMenu();
          ClientToScreen(hwnd, &amp;point);

          AppendMenuW(hMenu, MF_STRING, IDM_FILE_NEW, L"&amp;New");
          AppendMenuW(hMenu, MF_STRING, IDM_FILE_OPEN, L"&amp;Open");
          AppendMenuW(hMenu, MF_SEPARATOR, 0, NULL);
          AppendMenuW(hMenu, MF_STRING, IDM_FILE_QUIT, L"&amp;Quit");
                    
          TrackPopupMenu(hMenu, TPM_RIGHTBUTTON, point.x, point.y, 0, hwnd, NULL);
          DestroyMenu(hMenu);
          break;

      case WM_DESTROY:
     
          PostQuitMessage(0);
          break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

We have an example with a context menu that has three menu items. 

case WM_RBUTTONUP:

    point.x = LOWORD(lParam);
    point.y = HIWORD(lParam);
...    

The WM_RBUTTONUP message is posted when the user releases the right 
mouse button while the cursor is in the client area of a window. The low-order 
word of the lParam specifies the x coordinate of the cursor. The high-order 
word specifies the y coordinate of the cursor. The coordinates are relative to 
the upper-left corner of the client area.

hMenu = CreatePopupMenu();   

The CreatePopupMenu function creates a popup menu. It returns
a handle to the newly created menu. The menu is initially empty.

ClientToScreen(hwnd, &amp;point);   

The ClientToScreen function converts the client coordinates of 
a specified point to screen coordinates. We need these coordinates to display
the context menu.

AppendMenuW(hMenu, MF_STRING, IDM_FILE_NEW, L"&amp;New");
AppendMenuW(hMenu, MF_STRING, IDM_FILE_OPEN, L"&amp;Open");
AppendMenuW(hMenu, MF_SEPARATOR, 0, NULL);
AppendMenuW(hMenu, MF_STRING, IDM_FILE_QUIT, L"&amp;Quit");   

Three menu items and one separator are created.

TrackPopupMenu(hMenu, TPM_RIGHTBUTTON, point.x, point.y, 0, hwnd, NULL);   

The TrackPopupMenu function displays a context menu at the 
specified location and tracks the selection of items on the menu.

DestroyMenu(hMenu);   

In the end, the menu object is destroyed with the DestroyMenu
function. A menu that was not assigned to a window must be explicitly destroyed.

![popupmenu.png](images/popupmenu.png)

Figure: A popup menu

## A check menu item

A check menu item is a menu item that has a check mark before
its label. A menu item can be checked or unchecked using 
the CheckMenuItem function.

checkmenuitem.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void AddMenus(HWND);

#define IDM_VIEW_STB 1

HWND ghSb;
HMENU ghMenu;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
                    
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Check menu item";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Check menu item",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 350, 250, 0, 0, hInstance, 0);

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
   
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {
    
    UINT state;

    switch(msg) {
    
      case WM_CREATE:
      
          AddMenus(hwnd);          
          InitCommonControls();

          ghSb = CreateWindowExW(0, STATUSCLASSNAMEW, NULL, 
              WS_CHILD | WS_VISIBLE, 0, 0, 0, 0, hwnd, 
              (HMENU) 1, GetModuleHandle(NULL), NULL);

          break;

      case WM_COMMAND:
          
          switch(LOWORD(wParam)) {
          
              case IDM_VIEW_STB:                                    
                  
                  state = GetMenuState(ghMenu, IDM_VIEW_STB, MF_BYCOMMAND); 

                  if (state == MF_CHECKED) {
                  
                      ShowWindow(ghSb, SW_HIDE);
                      CheckMenuItem(ghMenu, IDM_VIEW_STB, MF_UNCHECKED);  
                  } else {
                  
                      ShowWindow(ghSb, SW_SHOWNA);
                      CheckMenuItem(ghMenu, IDM_VIEW_STB, MF_CHECKED);  
                  }
                  
                  break;
          }
          
          break;

      case WM_SIZE:
      
          SendMessage(ghSb, WM_SIZE, wParam, lParam);          
          break;

      case WM_DESTROY:
      
          PostQuitMessage(0);
          break;
    }

    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void AddMenus(HWND hwnd) {

    HMENU hMenubar;

    hMenubar = CreateMenu();
    ghMenu = CreateMenu();

    AppendMenuW(ghMenu, MF_STRING, IDM_VIEW_STB, L"&amp;Statusbar");
    CheckMenuItem(ghMenu, IDM_VIEW_STB, MF_CHECKED);  

    AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) ghMenu, L"&amp;View");
  
    SetMenu(hwnd, hMenubar);
}

In the example we have a View menu with one menu item. This menu
item will show or hide a statusbar. When the statusbar is visible, the menu item
is checked. 

#define IDM_VIEW_STB 1

This is an id for the menu item that will show or hide the statusbar.

InitCommonControls();

A statusbar is a common control. It must be initialized with the 
InitCommonControls function.

ghSb = CreateWindowExW(0, STATUSCLASSNAMEW, NULL, 
    WS_CHILD | WS_VISIBLE, 0, 0, 0, 0, hwnd, 
    (HMENU) 1, GetModuleHandle(NULL), NULL);  

This code line creates a statusbar control.

state = GetMenuState(ghMenu, IDM_VIEW_STB, MF_BYCOMMAND); 

We get the state of the statusbar menu item with the GetMenuState
function.

if (state == MF_CHECKED) {

    ShowWindow(ghSb, SW_HIDE);
    CheckMenuItem(ghMenu, IDM_VIEW_STB, MF_UNCHECKED);  
} else {

    ShowWindow(ghSb, SW_SHOWNA);
    CheckMenuItem(ghMenu, IDM_VIEW_STB, MF_CHECKED);  
}

Depending on its state, we show or hide the statusbar control using the 
ShowWindow function. The menu item is checked or unchecked
accordingly with the CheckMenuItem function.

case WM_SIZE:

    SendMessage(ghSb, WM_SIZE, wParam, lParam);          
    break;

We resize the statusbar to fit the window after the window is being resized.

![checkmenuitem.png](images/checkmenuitem.png)

Figure: A check menu item

## A radio menu item

Radio menu items enable to select from a mutually exclusive
list of options. Radio menu items are managed with the 
CheckMenuRadioItem function.

radiomenuitem.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void AddMenus(HWND);

#define IDM_MODE_MAP 1
#define IDM_MODE_SAT 2
#define IDM_MODE_TRA 3
#define IDM_MODE_STR 4

HMENU hMenu;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
                     
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Radio menu item";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Radio menu item",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 350, 250, 0, 0, hInstance, 0);

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
      
          AddMenus(hwnd);
          break;

      case WM_COMMAND:
      
          switch(LOWORD(wParam)) {
          
              case IDM_MODE_MAP:
                  CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
                      IDM_MODE_MAP, MF_BYCOMMAND);
                  MessageBeep(MB_ICONERROR);
                  break;

              case IDM_MODE_SAT:
                  CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
                      IDM_MODE_SAT, MF_BYCOMMAND);
                  MessageBeep(0xFFFFFFFF);
                  break;

              case IDM_MODE_TRA:
                  CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
                      IDM_MODE_TRA, MF_BYCOMMAND);
                  MessageBeep(MB_ICONWARNING);
                  break;

              case IDM_MODE_STR:
                  CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
                      IDM_MODE_STR, MF_BYCOMMAND);
              
                  MessageBeep(MB_ICONINFORMATION);
                  break;
           }
           
           break;

      case WM_DESTROY:
      
          PostQuitMessage(0);
          break;
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void AddMenus(HWND hwnd) {

    HMENU hMenubar;

    hMenubar = CreateMenu();
    hMenu = CreateMenu();

    AppendMenuW(hMenu, MF_STRING, IDM_MODE_MAP, L"&amp;Map");
    AppendMenuW(hMenu, MF_STRING, IDM_MODE_SAT, L"&amp;Satellite");
    AppendMenuW(hMenu, MF_STRING, IDM_MODE_TRA, L"&amp;Traffic");
    AppendMenuW(hMenu, MF_STRING, IDM_MODE_STR, L"Street &amp;view");

    CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
        IDM_MODE_MAP, MF_BYCOMMAND);

    AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) hMenu, L"&amp;Map mode");
    SetMenu(hwnd, hMenubar);
}

In the example, we have four radio menu items; only one of them
can be selected at a time. Each radio menu item beeps a different
sound.

#define IDM_MODE_MAP 1
#define IDM_MODE_SAT 2
#define IDM_MODE_TRA 3
#define IDM_MODE_STR 4

These are Ids of radio menu items.

case IDM_MODE_MAP:
    CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
        IDM_MODE_MAP, MF_BYCOMMAND);
    MessageBeep(MB_ICONERROR);
    break;

The CheckMenuRadioItem checks a specified menu item and 
makes it a radio item. In addition, it clears all other menu items in 
the associated group of menu items. The function's first parameter is
a handle to the menu that contains the group of menu items. 
The last parameter indicates the meaning of the previous three parameters;
when MF_BYCOMMAND is specified, these parameters are Ids of
menu items. The second parameter is the Id of the first menu item in the group, 
the third parameter is the Id of the last menu item in the group.
The fourth parameter is the menu identifier to be checked.

...
AppendMenuW(hMenu, MF_STRING, IDM_MODE_STR, L"Street &amp;view");

CheckMenuRadioItem(hMenu, IDM_MODE_MAP, IDM_MODE_STR, 
    IDM_MODE_MAP, MF_BYCOMMAND);

AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) hMenu, L"&amp;Map mode");
...

At the beginning, the first radio item is selected. 

![radiomenuitem.png](images/radiomenuitem.png)

Figure: A radio menu item

## Submenu

A submenu is a menu located inside another menu.

submenu.c
  

#include &lt;windows.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void AddMenus(HWND);

#define IDM_FILE_NEW 1
#define IDM_FILE_IMPORT 2

#define IDM_IMPORT_MAIL 11

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {
                     
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Submenu";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);

    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Submenu",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 350, 250, 0, 0, hInstance, 0);

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
      
          AddMenus(hwnd);
          break;

      case WM_COMMAND:
      
          switch(LOWORD(wParam)) {
          
              case IDM_FILE_NEW:
                  MessageBoxW(NULL, L"New file selected", 
                        L"Information", MB_OK);
                  break;

              case IDM_IMPORT_MAIL:
                  MessageBoxW(NULL, L"Import mail selected", 
                        L"Information", MB_OK);
           }
           
           break;

      case WM_DESTROY:
      
          PostQuitMessage(0);
          break;
  }

  return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void AddMenus(HWND hwnd) {
  
    HMENU hMenubar = CreateMenu();
    HMENU hMenu = CreateMenu();
    HMENU hSubMenu = CreatePopupMenu();

    AppendMenuW(hMenu, MF_STRING, IDM_FILE_NEW, L"&amp;New");

    AppendMenuW(hMenu, MF_STRING | MF_POPUP, (UINT_PTR) hSubMenu, L"&amp;Import");
    AppendMenuW(hSubMenu, MF_STRING, IDM_IMPORT_MAIL, L"Import &amp;mail");

    AppendMenuW(hMenubar, MF_POPUP, (UINT_PTR) hMenu, L"&amp;File");
    SetMenu(hwnd, hMenubar);
}

In the example, we have two menu items; one is located in the File menu
and the other one in the File's Import submenu. Selecting each menu item causes
a message box to be displayed.

case IDM_IMPORT_MAIL:
    MessageBoxW(NULL, L"Import mail selected", 
          L"Information", MB_OK);

When we select the Import mail submenu item, a message box is shown
with the "Import mail selected" text.

HMENU hSubMenu = CreatePopupMenu();

A submenu is created with the CreatePopupMenu
function. 

AppendMenuW(hMenu, MF_STRING | MF_POPUP, (UINT_PTR) hSubMenu, L"&amp;Import");

With the AppendMenuW function, we add a submenu to the 
File menu. The MF_POPUP flag is used both for popup menus
and submenus.

AppendMenuW(hSubMenu, MF_STRING, IDM_IMPORT_MAIL, L"Import &amp;mail");

A menu item is normally added to the submenu with the AppendMenuW
function. 

![submenu.png](images/submenu.png)

Figure: Submenu

In this part of the Windows API tutorial, we have covered menus.

[Contents](..)
[Previous](../firststeps/)
[Next](../dialogs/)