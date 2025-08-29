+++
title = "System functions in Windows API"
date = 2025-08-29T19:57:41.382+01:00
draft = false
description = "In this part of the Winapi tutorial, we cover system functions."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../main/)
[Next](../strings/)

# System functions in Windows API

last modified October 18, 2023

In this part of the Windows API tutorial, we cover system functions. System
functions receive information about the system and communicate with the system
in various ways.

## Screen size

The GetSystemMetrics function retrieves various system metrics and
system configuration settings.

screen_size.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#pragma comment(lib, "user32.lib")

int wmain(void) {

    int x = GetSystemMetrics(SM_CXSCREEN);
    int y = GetSystemMetrics(SM_CYSCREEN);

    wprintf(L"The screen size is: %dx%d\n", x, y);

    return 0;
}

The code example prints the screen size to the console.

#pragma comment(lib, "user32.lib")

The program needs the user32.lib library to compile.

int x = GetSystemMetrics(SM_CXSCREEN);
int y = GetSystemMetrics(SM_CYSCREEN);

We determine the screen resolution with the GetSystemMetrics.

C:\Users\Jano\Documents\WinApi\system\ScreenSize&gt;ScreenSize.exe
The screen size is: 1280x800

The screen size is 1280x800.

## Locking workstation

The LockWorkStation locks the workstation's display.

lock_workstation.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#pragma comment(lib, "user32.lib")

int wmain(void) {

    int r = LockWorkStation();

    if (r == 0) {

        wprintf(L"LockWorkStation() failed %d\n", GetLastError());
        return 1;
    }

    return 0;
}

The program needs the user32.lib to compile.

## Computer name

The GetComputerNameEx function retrieves a NetBIOS or DNS name
associated with the local computer. The names are established at system startup.

computer_name.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t computerName[MAX_COMPUTERNAME_LENGTH + 1];
    DWORD size = sizeof(computerName) / sizeof(computerName[0]);

    int r = GetComputerNameW(computerName, &amp;size);

    if (r == 0) {
        wprintf(L"Failed to get computer name %ld", GetLastError());
        return 1;
    }

    wprintf(L"Computer name: %ls\n", computerName);

    return 0;
}

The example prints the computer name to the console.

wchar_t computerName[MAX_COMPUTERNAME_LENGTH + 1];

The MAX_COMPUTERNAME_LENGTH constant determines the maximum length
of the computer name.

int r = GetComputerNameW(computerName, &amp;size);

We get the name of the computer with the GetComputerNameW
function. The name is stored into the computerName array.

C:\Users\Jano\Documents\WinApi\system\ComputerName&gt;ComputerName.exe
Computer name: ANDROMEDA

## Username

The GetUserNameW function returns the user name.

username.c
  

#include &lt;windows.h&gt;
#include &lt;Lmcons.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t username[UNLEN+1];
    DWORD len = sizeof(username) / sizeof(wchar_t);

    int r = GetUserNameW(username, &amp;len);

    if (r == 0) {
        wprintf(L"Failed to get username %ld", GetLastError());
        return 1;
    }

    wprintf(L"User name: %ls\n", username);

    return 0;
}

The example prints the username to the console.

#include &lt;Lmcons.h&gt;

The Lmcons.h file has the definition of
the ULEN constant.

wchar_t username[UNLEN+1];

The ULEN constant defines the maximum length of the username.

int r = GetUserNameW(username, &amp;len);

The GetUserNameW function retrieves
the username and stores it into the username
array.

C:\Users\Jano\Documents\WinApi\system\Username&gt;username.exe
User name: Jano

## Current directory

*Current directory* is a directory in which the user is located or it is
working it. In Windows API, the SetCurrentDirectoryW
changes the current directory and the GetCurrentDirectoryW
retrieves the current directory.

current_directory.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define BUFSIZE MAX_PATH

int wmain(int argc, wchar_t **argv) {

    wchar_t buf[BUFSIZE];

    if (argc != 2) {

        wprintf(L"Usage: %ls &lt;dir&gt;\n", argv[0]);
        return 1;
    }

    DWORD r = SetCurrentDirectoryW(argv[1]);

    if (r == 0) {

        wprintf(L"SetCurrentDirectoryW() failed (%ld)\n", GetLastError());
        return 1;
    }

    r = GetCurrentDirectoryW(BUFSIZE, buf);

    if (r == 0) {

        wprintf(L"GetCurrentDirectoryW() failed (%ld)\n", GetLastError());
        return 1;
    }

    if (r &gt; BUFSIZE) {

        wprintf(L"Buffer too small; needs %d characters\n", r);
        return 1;
    }

    wprintf(L"Current directory is: %ls\n", buf);

    return 0;
}

In the code example, we change and print the current working directory. The
program receives one command line argument—the directory to change into.

#define BUFSIZE MAX_PATH

We use the MAX_PATH constant, which defines the maximum length of a
system path.

if (argc != 2) {

    wprintf(L"Usage: %ls &lt;dir&gt;\n", argv[0]);
    return 1;
}

An error message is printed if we do not pass an argument to the program.

DWORD r = SetCurrentDirectoryW(argv[1]);

We use the SetCurrentDirectoryW to change to the directory, which
is passed as an argument.

r = GetCurrentDirectoryW(BUFSIZE, buf);

We get the current working directory with the GetCurrentDirectoryW
function call.

if (r &gt; BUFSIZE) {

    wprintf(L"Buffer too small; needs %d characters\n", r);
    return 1;
}

If the returned value is bigger than BUFSIZE, the
buffer was too small.

## Windows version

The Version Helper functions can be used to determine the
current OS version.

windows_version.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;VersionHelpers.h&gt;

int wmain(void) {

    //if (IsWindows10OrGreater()) {

    //    wprintf(L"This is Windows 10+");
    // }
    if (IsWindows8Point1OrGreater()) {
        wprintf(L"This is Windows 8.1+\n");
    } else if (IsWindows8OrGreater()) {
        wprintf(L"This is Windows 8\n");
    } else if (IsWindows7OrGreater ()) {
        wprintf(L"This is Windows 7\n");
    } else if (IsWindowsVistaOrGreater ()) {
        wprintf(L"This is Windows Vista\n");
    } else if (IsWindowsXPOrGreater()) {
        wprintf(L"This is Windows XP\n");
    }

    return 0;
}

We use the Version Helper functions to determine the OS version.

#include &lt;VersionHelpers.h&gt;

The helper functions are declared in the VersionHelpers.h
file.

//if (IsWindows10OrGreater()) {

//    wprintf(L"This is Windows 10+");
// }

At the time of the writing, Pelles C did not have the
IsWindows10OrGreater defined in its SDK.

if (IsWindows8Point1OrGreater()) {
    wprintf(L"This is Windows 8.1+\n");
}

The IsWindows8Point1OrGreater returns true if
the current version is Windows 8.1 or greater.

C:\Users\Jano\Documents\WinApi\system\WindowsVersion&gt;WindowsVersion.exe
This is Windows 7

## Memory

The GlobalMemoryStatusEx retrieves information about the system's
current usage of both physical and virtual memory.

memory.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    MEMORYSTATUSEX mem = {0};

    mem.dwLength = sizeof(mem);

    int r = GlobalMemoryStatusEx(&amp;mem);

    if (r == 0) {
        wprintf(L"Failed to memory status %ld", GetLastError());
        return 1;
    }

    wprintf(L"Memory in use: %ld percent\n", mem.dwMemoryLoad);
    wprintf(L"Total physical memory: %lld\n", mem.ullTotalPhys);
    wprintf(L"Free physical memory: %lld\n", mem.ullAvailPhys);
    wprintf(L"Total virtual memory: %lld\n", mem.ullTotalVirtual);
    wprintf(L"Free virtual memory: %lld\n", mem.ullAvailVirtual);

    return 0;
}

The program prints statistics about memory usage to the console.

MEMORYSTATUSEX mem = {0};

The GlobalMemoryStatusEx function stores information about memory
status in the MEMORYSTATUSEX structure.

int r = GlobalMemoryStatusEx(&amp;mem);

The  GlobalMemoryStatusEx function is executed;
the information is stored in the structure.

wprintf(L"Memory in use: %ld percent\n", mem.dwMemoryLoad);

The dwMemoryLoad member specifies the approximate percentage of
physical memory in use.

wprintf(L"Total physical memory: %lld\n", mem.ullTotalPhys);

The ullTotalPhys member specifies the actual physical memory in
bytes.

wprintf(L"Free physical memory: %lld\n", mem.ullAvailPhys);

The ullTotalPhys member specifies the amount of physical memory
currently available in bytes.

wprintf(L"Total virtual memory: %lld\n", mem.ullTotalVirtual);

The ullTotalVirtual member specifies the amount of the total
virtual memory in bytes.

wprintf(L"Free virtual memory: %lld\n", mem.ullAvailVirtual);

The ullAvailVirtual member specifies the amount of available
virtual memory in bytes.

C:\Users\Jano\Documents\WinApi\system\Memory&gt;Memory.exe
Memory in use: 47 percent
Total physical memory: 4226072576
Free physical memory: 2229788672
Total virtual memory: 8796092891136
Free virtual memory: 8796052586496

## Known Folders

Since Windows Vista, a new system is used for identifying important directories
in Windows. It is known as *Known Folders*. Known folders uses a set of
GUID (Globally unique identifier) values for referencing important folders.

The SHGetKnownFolderPath function retrieves the full path of a
known folder identified by the folder's id.

documents_dir.c
  

#include &lt;windows.h&gt;
#include &lt;initguid.h&gt;
#include &lt;KnownFolders.h&gt;
#include &lt;ShlObj.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    PWSTR path = NULL;

    HRESULT hr = SHGetKnownFolderPath(&amp;FOLDERID_Documents, 0, NULL, &amp;path);

    if (SUCCEEDED(hr)) {
        wprintf(L"%ls\n", path);
    }

    CoTaskMemFree(path);

    return 0;
}

The example determines the full path to the user's Documents directory. We need
to add shell32.lib and ole32.lib to the project
libraries.

#include &lt;initguid.h&gt;

Due to some internal API issues, we need to include the initguid.h
file; otherwise, the example does not compile. It fails with the
Unresolved external symbol 'FOLDERID_Documents' error.

HRESULT hr = SHGetKnownFolderPath(&amp;FOLDERID_Documents, 0, NULL, &amp;path);

The SHGetKnownFolderPath is used to determine the path to the
Documents directory.

if (SUCCEEDED(hr)) {
    wprintf(L"%ls\n", path);
}

The SUCCEEDED macro can be used to determine whether the function
call succeeded.

CoTaskMemFree(path);

At the end, it is necessary to free the allocated memory with the
CoTaskMemFree function.

C:\Users\Jano\Documents\WinApi\system\DocumentsDir&gt;DocumentsDir.exe
C:\Users\Jano\Documents

## Drive names

The GetLogicalDriveStringsW function fills a buffer with strings
that specify valid drives in the system.

get_drives.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t LogicalDrives[MAX_PATH] = {0};
    DWORD r = GetLogicalDriveStringsW(MAX_PATH, LogicalDrives);

    if (r == 0) {
        wprintf(L"Failed to get drive names %ld", GetLastError());
        return 1;
    }

    if (r &gt; 0 &amp;&amp; r &lt;= MAX_PATH) {

        wchar_t *SingleDrive = LogicalDrives;

        while (*SingleDrive) {
            wprintf(L"%ls\n", SingleDrive);

            SingleDrive += wcslen(SingleDrive) + 1;
        }
    }

    return 0;
}

The example prints valid drives in the system.

wchar_t LogicalDrives[MAX_PATH] = {0};

A drive name is a path type, so a MAX_PATH constant is relevant for
its maximum length. The LogicalDrives is an array of strings which
serves as a buffer for the GetLogicalDriveStringsW function.

DWORD r = GetLogicalDriveStringsW(MAX_PATH, LogicalDrives);

The GetLogicalDriveStringsW is called. The buffer is filled with
null-terminated strings, which represent device names. The first parameter of
the function is the maximum size of the specified buffer. The buffer is the
second parameter.

wchar_t *SingleDrive = LogicalDrives;

while (*SingleDrive) {
    wprintf(L"%ls\n", SingleDrive);

    SingleDrive += wcslen(SingleDrive) + 1;
}

We go through the array of device names and print them
to the console.

C:\Users\Jano\Documents\WinApi\system\GetDrives&gt;GetDrives.exe
C:\
D:\

There are two drives on the system: C:\ and D:\.

## Free space

The GetDiskFreeSpaceExW retrieves information about the amount of
space available on a disk volume. The function gives three pieces of
information: the total amount of space, the free amount of space, and the free
space available to the user that is associated with the calling thread.

free_disk_space.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    unsigned __int64 freeCall,
                     total,
                     free;

    int r = GetDiskFreeSpaceExW(L"C:\\", (PULARGE_INTEGER) &amp;freeCall,
        (PULARGE_INTEGER) &amp;total, (PULARGE_INTEGER) &amp;free);

    if (r == 0) {

        wprintf(L"Failed to get free disk space %ld", GetLastError());
        return 1;
    }

    wprintf(L"Available space to caller: %I64u MB\n", freeCall / (1024*1024));
    wprintf(L"Total space: %I64u MB\n", total / (1024*1024));
    wprintf(L"Free space on drive: %I64u MB\n", free / (1024*1024));

    return 0;
}

The example examines disk space on the C:\ drive.

unsigned __int64 freeCall,
                 total,
                 free;

The amounts are expressed in bytes; these can be very large numbers. The
unsigned __int64 type is used, which is a positive 64-bit integer
capable of storing very large values.

int r = GetDiskFreeSpaceExW(L"C:\\", (PULARGE_INTEGER) &amp;freeCall,
    (PULARGE_INTEGER) &amp;total, (PULARGE_INTEGER) &amp;free);

The GetDiskFreeSpaceExW is called.

wprintf(L"Available space to caller: %I64u MB\n", freeCall / (1024*1024));
wprintf(L"Total space: %I64u MB\n", total / (1024*1024));
wprintf(L"Free space on drive: %I64u MB\n", free / (1024*1024));

The three amounts are printed to the console with the wprintf
function. The values are expressed in MB.

C:\Users\Jano\Documents\WinApi\system\FreeDiskSpace&gt;FreeDiskSpace.exe
Available space to caller: 20377 MB
Total space: 69999 MB
Free space on drive: 20377 MB

## CPU speed

The CPU speed can be determined by examining a registry value. The value is
written to registry during installation. We need to query the
HARDWARE\DESCRIPTION\System\CentralProcessor\0 key.

cpu_speed.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    DWORD BufSize = MAX_PATH;
    DWORD mhz = MAX_PATH;
    HKEY key;

    long r = RegOpenKeyExW(HKEY_LOCAL_MACHINE,
        L"HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0", 0, KEY_READ, &amp;key);

    if (r != ERROR_SUCCESS) {

        wprintf(L"RegOpenKeyExW() failed %ld", GetLastError());
        return 1;
    }

    r = RegQueryValueExW(key, L"~MHz", NULL, NULL, (LPBYTE) &amp;mhz, &amp;BufSize);

    if (r != ERROR_SUCCESS) {

        wprintf(L"RegQueryValueExW() failed %ld", GetLastError());
        return 1;
    }

    wprintf(L"CPU speed: %lu MHz\n", mhz);

    r = RegCloseKey(key);

    if (r != ERROR_SUCCESS) {

        wprintf(L"Failed to close registry handle %ld", GetLastError());
        return 1;
    }

    return 0;
}

The example determines the CPU speed.

long r = RegOpenKeyExW(HKEY_LOCAL_MACHINE,
    L"HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0", 0, KEY_READ, &amp;key);

The RegOpenKeyExW function is used to open the provided registry
key.

r = RegQueryValueExW(key, L"~MHz", NULL, NULL, (LPBYTE) &amp;mhz, &amp;BufSize);

The value is read with the RegQueryValueExW function.

r = RegCloseKey(key);

The RegCloseKey closes the registry handle.

C:\Users\Jano\Documents\WinApi\system\CpuSpeed&gt;CpuSpeed.exe
CPU speed: 2394 MHz

In this part of the Windows API tutorial, we have worked with several system
functions.

[Contents](..)
[Previous](../main/)
[Next](../strings/)