+++
title = "Advanced controls in Windows API"
date = 2025-08-29T19:57:35.776+01:00
draft = false
description = "In this part of the Windows API tutorial, we cover advanced Windows controls."
image = "images/tabcontrol.png"
imageBig = "images/tabcontrol.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../controlsIII/)
[Next](../customcontrols/)

# Advanced controls in Windows API

last modified October 18, 2023

In this section of the Windows API tutorial, we talk more about two 
advanced Windows controls: a tab control and a list box control.

## Tab control

A *tab control* joins multiple windows with corresponding tabs.

tabcontrol.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;
#include &lt;wchar.h&gt;

#define ID_TABCTRL 1
#define ID_EDIT 2
#define BTN_ADD 3
#define BTN_DEL 4
#define BTN_CLR 5
#define MAX_TAB_LEN 15

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
HWND hTab, hEdit;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, 
    PWSTR pCmdLine, int nCmdShow) {

    MSG  msg ;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Tab control";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"Tab control",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 380, 230, 0, 0, hInstance, 0);  

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
  
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }

    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {

    TCITEMW tie;
    wchar_t text[4];
    LRESULT count, id;
    INITCOMMONCONTROLSEX icex;

    switch(msg) {

        case WM_CREATE:
       
            icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
            icex.dwICC = ICC_TAB_CLASSES;
            InitCommonControlsEx(&amp;icex);

            hTab = CreateWindowW(WC_TABCONTROLW, NULL, WS_CHILD | WS_VISIBLE,
                0, 0, 200, 150, hwnd,(HMENU) ID_TABCTRL, NULL, NULL);

            hEdit = CreateWindowW(WC_EDITW, NULL, WS_CHILD | WS_VISIBLE | WS_BORDER,
                250, 20, 100, 25, hwnd, (HMENU) ID_EDIT, NULL, NULL);

            SendMessage(hEdit, EM_SETLIMITTEXT, MAX_TAB_LEN, 0);
  
            CreateWindowW(WC_BUTTONW, L"Add", WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON,
                250, 50, 100, 25, hwnd, (HMENU) BTN_ADD, NULL, NULL);

            CreateWindowW(WC_BUTTONW, L"Delete", WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON,
                250, 80, 100, 25, hwnd, (HMENU) BTN_DEL, NULL, NULL);

            CreateWindowW(WC_BUTTONW, L"Clear", WS_CHILD | WS_VISIBLE | BS_PUSHBUTTON,
                250, 110, 100, 25, hwnd, (HMENU) BTN_CLR, NULL, NULL);
            break;

        case WM_COMMAND:

            switch(LOWORD(wParam)) {

                case BTN_ADD:

                    GetWindowTextW(hEdit, text, 250);

                    if (lstrlenW(text) != 0 ) {

                        tie.mask = TCIF_TEXT;
                        tie.pszText = text;
                        count = SendMessageW(hTab, TCM_GETITEMCOUNT, 0, 0);
                        SendMessageW(hTab, TCM_INSERTITEMW, count, 
                            (LPARAM) (LPTCITEM) &amp;tie);
                    }
                    break;

                case BTN_DEL:
                
                    id = SendMessageW(hTab, TCM_GETCURSEL, 0, 0);
                    
                    if (id != -1) {
                    
                       SendMessageW(hTab, TCM_DELETEITEM, 0, id);
                    }
                    break;

                case BTN_CLR:
               
                    SendMessageW(hTab, TCM_DELETEALLITEMS, 0, 0);
                    break;
            } 
            break;

        case WM_DESTROY:
        
            PostQuitMessage(0);
            break;
    }
   
    return(DefWindowProcW(hwnd, msg, wParam, lParam));
}

In our example, we use one tab control, one edit control, and three buttons. 
We dynamically create and delete tabs on the tab control.

hTab = CreateWindowW(WC_TABCONTROLW, NULL, WS_CHILD | WS_VISIBLE,
    0, 0, 200, 150, hwnd,(HMENU) ID_TABCTRL, NULL, NULL);

We use the WC_TABCONTROL window class to create a tab control.

hEdit = CreateWindowW(WC_EDITW, NULL, WS_CHILD | WS_VISIBLE | WS_BORDER,
    250, 20, 100, 25, hwnd, (HMENU) ID_EDIT, NULL, NULL);

SendMessage(hEdit, EM_SETLIMITTEXT, MAX_TAB_LEN, 0);

We create an edit control and sets its maximum size with the 
EM_SETLIMITTEXT message.

if (lstrlenW(text) != 0 ) {

    tie.mask = TCIF_TEXT;
    tie.pszText = text;
    count = SendMessageW(hTab, TCM_GETITEMCOUNT, 0, 0);
    SendMessageW(hTab, TCM_INSERTITEMW, count, 
       (LPARAM) (LPTCITEM) &amp;tie);
}

To add a new tab, we fill the TCITEMW structure. We provide the type 
of data to be set (in our case TCIF_TEXT) and the actual text.
Then we send two messages. The TCM_GETITEMCOUNT message gets the 
number of tabs. It will be used in the second message. The TCM_INSERTITEMW
message inserts a new tab in the control, using the count variable
and the TCITEMW structure.

id = SendMessageW(hTab, TCM_GETCURSEL, 0, 0);

if (id != -1) {

   SendMessageW(hTab, TCM_DELETEITEM, 0, id);
}

To delete an specific tab, we need the currently selected tab. We figure it 
out by sending the TCM_GETCURSEL message to the tab control.
To delete the tab, we send the TCM_DELETEITEM message, specifying 
the item to be deleted in the wParam parameter.

SendMessageW(hTab, TCM_DELETEALLITEMS, 0, 0);

To delete all tabs from the tab control, we send the TCM_DELETEALLITEMS message.

![tabcontrol.png](images/tabcontrol.png)

Figure: Tab control

## List Box

A List Box contains a simple list from which the user can generally 
select one or more items. Selected items are marked.

listbox.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;
#include &lt;strsafe.h&gt;

#define IDC_LIST 1
#define IDC_STATIC 2

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

typedef struct {
 
    wchar_t name[30]; 
    wchar_t job[20]; 
    int age; 

} Friends; 

Friends friends[] = {
 
    {L"Lucy", L"waitress", 18}, 
    {L"Thomas", L"programmer", 25}, 
    {L"George", L"police officer", 26}, 
    {L"Michael", L"producer", 38}, 
    {L"Jane", L"steward", 28}, 
}; 

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, 
    PWSTR pCmdLine, int nCmdShow) {

    MSG  msg ;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"MyListBox";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClassW(&amp;wc);
    CreateWindowW(wc.lpszClassName, L"List Box",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 340, 200, 0, 0, hInstance, 0);  

    while (GetMessage(&amp;msg, NULL, 0, 0)) {
    
        TranslateMessage(&amp;msg);
        DispatchMessage(&amp;msg);
    }
    
    return (int) msg.wParam;
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, 
    WPARAM wParam, LPARAM lParam) {

    static HWND hwndList, hwndStatic;
    wchar_t buf[128];

    switch(msg) {

        case WM_CREATE:
       
            hwndList = CreateWindowW(WC_LISTBOXW , NULL, WS_CHILD 
                | WS_VISIBLE | LBS_NOTIFY, 10, 10, 150, 120, hwnd, 
                (HMENU) IDC_LIST, NULL, NULL);

            hwndStatic = CreateWindowW(WC_STATICW , NULL, WS_CHILD | WS_VISIBLE,
               200, 10, 120, 45, hwnd, (HMENU) IDC_STATIC, NULL, NULL);

            for (int i = 0; i &lt; ARRAYSIZE(friends); i++)  { 
                 SendMessageW(hwndList, LB_ADDSTRING, 0, (LPARAM) friends[i].name);
            } 

            break;
 
        case WM_COMMAND:
        
            if (LOWORD(wParam) == IDC_LIST) {        
                if (HIWORD(wParam) == LBN_SELCHANGE) {                   
                    int sel = (int) SendMessageW(hwndList, LB_GETCURSEL, 0, 0);
                    StringCbPrintfW(buf, ARRAYSIZE(buf), L"Job: %ls\nAge: %d", 
                        friends[sel].job, friends[sel].age);
                    SetWindowTextW(hwndStatic, buf);
               }
            }            
            
            break;

        case WM_DESTROY:
        
            PostQuitMessage(0);
            break;
    }

    return (DefWindowProcW(hwnd, msg, wParam, lParam));
}

In this example, we display a list box control and a static text control. 
By selecting a person from a list box, we display his job and age
in the static control. 

hwndList = CreateWindowW(WC_LISTBOXW , NULL, WS_CHILD 
        | WS_VISIBLE | LBS_NOTIFY, 10, 10, 150, 120, hwnd, 
        (HMENU) IDC_LIST, g_hinst, NULL);

The WC_LISTBOXW window class is used to create a list box control.
The LBS_NOTIFY flag causes the list box to send a notification code 
to the parent window whenever the user clicks a list box item (LBN_SELCHANGE)
, double-clicks an item (LBN_DBLCLK), or cancels the selection (LBN_SELCANCEL).

for (int i = 0; i &lt; ARRAYSIZE(friends); i++)  { 
    SendMessageW(hwndList, LB_ADDSTRING, 0, (LPARAM) friends[i].name);
} 

The list box is filled with data by sending multiple LB_ADDSTRING 
messages.

if (HIWORD(wParam) == LBN_SELCHANGE) {                   
        int sel = (int) SendMessageW(hwndList, LB_GETCURSEL, 0, 0);
        StringCbPrintfW(buf, ARRAYSIZE(buf), L"Job: %ls\nAge: %d", 
                friends[sel].job, friends[sel].age);
        SetWindowTextW(hwndStatic, buf);
}

If we select an item from a list box, the window procedure receives a 
LBN_SELCHANGE message. First, we determine the currently selected item by 
sending a LB_GETCURSEL message to the list box. Then we copy the 
job name and age from the friends structure to the buf array.
Finally, we set the static text with SetWindowTextW function call.

![listbox.png](images/listbox.png)

Figure: List Box

In this part of the Windows API tutorial, we have covered two more advanced Windows controls. 

[Contents](..)
[Previous](../controlsIII/)
[Next](../customcontrols/)