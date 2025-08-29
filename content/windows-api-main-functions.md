+++
title = "Windows API main functions"
date = 2025-08-29T19:57:39.742+01:00
draft = false
description = "In this part of the Windows API tutorial, we will talk about main functions."
image = "images/mbox.png"
imageBig = "images/mbox.png"
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../system/)

# Windows API main functions

last modified October 18, 2023

In this part of the Windows API tutorial, we talk about main
functions.

## The main function prototypes

The main function is an entry point to a C program.
However, it is not the first program to run. When the entry point
is main, the program execution actually begins in a
function called mainCRTStartup. This function is located
in the C runtime library. It initialises things like the memory manager,
file I/O support, and the argv parameter. After that,
the mainCRTStartup function will call the main
function.

int main(void);
int main(int argc, char **argv);
int main(int argc, char *argv[]);

These are the function prototypes for the main function for
the classic console program.

classic_console.c
  

#include &lt;stdio.h&gt;

int main(void) {

    puts("This is a classic C program.");

    return 0;
}

The above source code presents an example of a classic console
C program.

C:\Users\Jano\Documents\WinApi\ClassicConsole&gt;ClassicConsole.exe
This is a classic C program.

This is the output of the ClassicConsole.exe program.

## The wmain function prototypes

The previous main function prototypes could receive only ASCII characters.
If we want a program that could receive wide characters from the command line,
we use the wmain function prototypes.

int wmain(void);
int wmain(int argc, wchar_t **argv);
int wmain(int argc, wchar_t *argv[]);

The above wmain function prototypes receive wchar_t
characters on the command line. When we use these prototypes, the execution
begins in a function called wmainCRTStartup which will later
call the wmain function.

win_console.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(int argc, wchar_t **argv) {

    PDWORD cChars = NULL;
    HANDLE std = GetStdHandle(STD_OUTPUT_HANDLE);

    if (std == INVALID_HANDLE_VALUE) {
        wprintf(L"Cannot retrieve standard output handle\n (%d)",
            GetLastError());
    }

    if (argv[1]) {

        WriteConsoleW(std, argv[1], wcslen(argv[1]), cChars, NULL);
    }

    CloseHandle(std);

    return 0;
}

We have a wmain function which can receive wide characters.
The example prints the first argument of the console program. To insert command
line arguments in Pelles C, we go to Project options and select the General tab.
There is an edit box called Command line arguments.

int wmain(int argc, wchar_t **argv) {

The wchar_t type of the second parameter of the wmain
function tells us that the program input is in wide characters.

HANDLE std = GetStdHandle(STD_OUTPUT_HANDLE);

The GetStdHandle function returns a handle to the standard output.

if (std == INVALID_HANDLE_VALUE) {
    wprintf(L"Cannot retrieve standard output handle\n (%d)",
        GetLastError());
}

In case of an error, we receive the INVALID_HANDLE_VALUE
return code. For this situation we print an error message. The GetLastError
function retrieves last error code value.

WriteConsoleW(std, argv[1], wcslen(argv[1]), cChars, NULL);

We use the WriteConsoleW function to write to the console
in wide characters.

CloseHandle(std);

The CloseHandle function closes the opened handle
to the standard output.

C:\Users\Jano\Documents\WinApi\WindowsConsole&gt;WindowsConsole.exe компилятор
компилятор

We pass a Russian word (compiler) as a parameter to our program. The program
simply prints the parameter back to the console. Note that in order to see
correct characters, we need to change the default font of the console to Lucida
Console. We need a true type font to display wide characters correctly.

## The _tmain function prototypes

The _tmain function is a Microsoft extension. It enables
programmers to easily create both ANSI and UNICODE builds of their programs.
It is a C macro that translates to wmain or main
functions, depending whether the _UNICODE constant is defined or
not.

In the past it was common to create both ANSI and UNICODE builds. Nowadays, it
is recommended to create Unicode programs, unless we have a specific reason to
create an ANSI build.

int _tmain(void);
int _tmain(int argc, TCHAR **argv);
int _tmain(int argc, TCHAR *argv[]);

These are the _tmain function prototypes. The TCHAR
macro translates either to char or to wchar_t. It is
controlled by the UNICODE constant.

tmain_ex.c
  

#define _UNICODE
#define UNICODE

#ifndef UNICODE
    #include &lt;stdio.h&gt;
#endif

#include &lt;windows.h&gt;
#include &lt;tchar.h&gt;

int _tmain(int argc, TCHAR **argv)
{
    PDWORD cChars = NULL;
    HANDLE std = GetStdHandle(STD_OUTPUT_HANDLE);

    if (std == INVALID_HANDLE_VALUE) {
        _tprintf(_T("Cannon retrieve standard output handle\n (%d)"), GetLastError());
    }

    if (argv[1]) {
        WriteConsole(std, argv[1], _tcslen(argv[1]), cChars, NULL);
    }

    CloseHandle(std);

    return 0;
}

The example prints its first argument if available.

#define _UNICODE
#define UNICODE

Here we define two constants. These definitions mean that we are going to
build a Unicode program. They translate C macros in C runtime and
Windows header files.  The _UNICODE constant translates macros
in the C runtime. (These macros start with an underscore.)
The UNICODE constant translates macros in the Windows header files.

#ifndef UNICODE
    #include &lt;stdio.h&gt;
#endif

If the build is ANSI, we include the &lt;stdio.h&gt; header.

#include &lt;windows.h&gt;

We include the definition of the TCHAR macro. The macro is affected
by the UNICODE constant.

#include &lt;tchar.h&gt;

We must include this header file for the _tmain and
_tcslen macros. They are translated depending on the
_UNICODE constant.

int _tmain(int argc, TCHAR *argv[]) {

The _tmain function translates in our case to wmain
and the TCHAR macro to wchar_t.

WriteConsole(std, argv[1], _tcslen(argv[1]), cChars, NULL);

The WriteConsole macro is transleted to the WriteConsoleW
function. The WriteConsoleW writes output to the console.
The _tcslen macro is translated to wcslen function; it
returns the lenght of the wide string.

C:\Users\Jano\Documents\WinApi\TMainEx&gt;TMainEx.exe "операционная система"
операционная система

The program takes another Russian word (operating system) as a parameter
and prints it to the console.

## The WinMain function prototypes

So far we had console main functions. For graphical user interface development,
we use one of the WinMain function prototypes.

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    PWSTR pCmdLine, int nCmdShow);
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    LPSTR lpCmdLine, int nCmdShow);
int APIENTRY _tWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
    LPTSTR lpCmdLine, int nCmdShow);

These three function prototypes are used for entry points for Windows GUI
applications. The wWinMain function's pCmdLine
parameter contains the command-line arguments as a Unicode string. The
WinMain function's pCmdLine parameter contains the
command-line arguments as an ANSI string. The _tWinMain is a C
macro that translates to other two function prototypes, depending whether the
_UNICODE constant is defined.

When the entry point is WinMain, the execution of the program
begins in WinMainCRTStartup. In case of wWinMain, the
execution begins in wWinMainCRTStartup.

winmain_ex.c
  

#include &lt;windows.h&gt;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
               PWSTR szCmdLine, int CmdShow) {

    MessageBoxW(NULL, szCmdLine, L"Title", MB_OK);

    return 0;
}

This code shows a small message box on the screen. It displays the first command
line argument.

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
               PWSTR szCmdLine, int CmdShow)

The third parameter of the wWinMain function is a
PWSTR (pointer to wide string). It accepts wide characters.

![mbox.png](images/mbox.png)

Figure: A message box

In this part of the Windows API tutorial, we have mentioned main functions.

[Contents](..)
[Previous](../introduction/)
[Next](../system/)