+++
title = "File management"
date = 2025-08-29T19:57:38.341+01:00
draft = false
description = "In this part of the Windows API tutorial, we will work with files and directories."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../)
[Next](../)

# File management

last modified October 18, 2023

In this part of the Windows API tutorial, we work with files and directories.

This section covers synchronous operations.

## Creating a directory

The CreateDirectoryW function creates a new directory.

BOOL WINAPI CreateDirectoryW(LPCWSTR lpPathName, LPSECURITY_ATTRIBUTES lpSecurityAttributes);

The first parameter is the path of the directory to be created.
The second parameter is a security descriptor for the new directory.
If it is NULL, the directory gets a default security descriptor.

create_directory.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {
    
    int r = CreateDirectoryW(L"C:\\prog\\newdir", NULL);

    if (r != 0) {

        wprintf(L"Directory created\n");

    } else {

        wprintf(L"Failed to create directory\n");

        int er  = GetLastError();

        if (er == ERROR_ALREADY_EXISTS) {
            
            wprintf(L"Directory already exists\n");
        }

        if (er == ERROR_PATH_NOT_FOUND) {
            
            wprintf(L"Wrong path\n");
        }
        
        return 1;
    }

    return 0;
}

The example creates a new directory.

int r = CreateDirectoryW(L"C:\\prog\\newdir", NULL);

With the CreateDirectoryW, we create 
a new directory at C:\prog\newdir path.
Note that the backslash character (\) must be escaped.

if (er == ERROR_ALREADY_EXISTS) {
    
    wprintf(L"Directory already exists\n");
}

The GetLastError function returns ERROR_ALREADY_EXISTS
when the directory already exists.

if (er == ERROR_PATH_NOT_FOUND) {
    
    wprintf(L"Wrong path\n");
}

The GetLastError function returns ERROR_PATH_NOT_FOUND
when the path is incorrect.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\CreateDirectory&gt;CreateDirectory.exe
Directory created

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\CreateDirectory&gt;CreateDirectory.exe
Failed to create directory
Directory already exists

The first run of the program succeeds, the second one fails because the directory
already exists.

## Removing a directory

The RemoveDirectoryW removes a directory.

BOOL WINAPI RemoveDirectoryW(LPCWSTR lpPathName);

The function's parameter is the directory path to be
removed. The path must specify an empty directory, and 
the calling process must have delete access to the directory.

remove_directory.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {
    
   int r = RemoveDirectoryW(L"C:\\prog\\newdir");

    if (r == 0) {

        wprintf(L"Cannot remove directory %lu\n", GetLastError());
        return 1;
    } 

    wprintf(L"Directory removed\n");

    return 0;
}

The example removes a directory.

int r = RemoveDirectoryW(L"C:\\prog\\newdir");

With the RemoveDirectoryW we remove the
previously created directory.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\RemoveDirectory&gt;RemoveDirectory.exe
Directory removed

The directory was removed. We can check with the file explorer.

## Copying a file

The CopyFileW copies an existing file to a new file.

BOOL WINAPI CopyFileW(LPCWSTR lpExistingFileName, LPCWSTR lpNewFileName, BOOL bFailIfExists);

The function's first parameter is the name of an existing file.
The second parameter is the name of the new file. The third parameter
specifies if the new file is overwritten if it already exists.

copy_file.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    int r = CopyFileW(L"C:\\prog\\myfile.txt", L"C:\\prog\\myfile2.txt", FALSE);

    if (r == 0) {

        wprintf(L"CopyFileW() failed %lu", GetLastError());
        return 1;
    } else {

        wprintf(L"File successfully copied");
    }

    return 0;
}

The example creates a copy of the C:\prog\myfile.txt file.

int r = CopyFileW(L"C:\\prog\\myfile.txt", L"C:\\prog\\myfile2.txt", FALSE);

The CopyFileW creates a copy of the C:\prog\myfile.txt 
file. The FALSE value makes the function overwrite an existing file.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\CopyFile&gt;CopyFile.exe
File successfully copied

The file was successfully copied.

## Deleting a file

The DeleteFileW deletes an existing file.

BOOL WINAPI DeleteFileW(LPCWSTR lpFileName);

The function's parameter is the name of the file to be deleted.

delete_file.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;Shlwapi.h&gt;

#pragma comment(lib, "Shlwapi.lib");

int wmain(int argc, wchar_t *argv[]) {

    if (argc != 2) {

        wprintf(L"Usage: DeleteFile filename\n");
        return 1;
    }

    int r = PathFileExistsW(argv[1]);

    if (r == FALSE) {

        wprintf(L"The path does not exist\n");
        return 1;
    }
    
    r = DeleteFileW(argv[1]);

    if (r == 0) {

        wprintf(L"DeleteFileW() failed %ld", GetLastError());
        return 1;
    }
    
    wprintf(L"The file was successfully deleted\n");

    return 0;
}

The example deletes a file which is taken as a command line 
parameter. In addition, the file's existence is checked with 
the PathFileExistsW function.

#include &lt;Shlwapi.h&gt;

The definition of the PathFileExistsW function is 
located in the Shlwapi.h file.

#pragma comment(lib, "Shlwapi.lib");

We need to include the Shlwapi.lib library.

int r = PathFileExistsW(argv[1]);

if (r == FALSE) {

    wprintf(L"The path does not exist\n");
    return 1;
}

We check for the existence of the provided file name
with the PathFileExistsW function.
If it does not exist, we end the program with an error message.

r = DeleteFileW(argv[1]);

We delete the file with the DeleteFileW function.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\DeleteFile&gt;DeleteFile.exe C:\prog\myfile2.txt
The file was successfully deleted

The file was successfully deleted.

## Moving a file

The MoveFileExW moves an existing file or 
directory, including its children.

BOOL WINAPI MoveFileExW(LPCWSTR lpExistingFileName, LPCWSTR lpNewFileName, DWORD dwFlags);

The first parameter is the current name of the file or directory and the 
second parameter is the new name of the file or directory. The third
parameter specifies various move options.

move_file.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    int r = MoveFileExW(L"C:\\prog\\myfile.txt", L"C:\\prog\\myfile2.txt", 
        MOVEFILE_REPLACE_EXISTING);

    if (r == 0) {
    
        wprintf(L"The MoveFileExW() failed %lu", GetLastError());
        return 1;
    }

    wprintf(L"The file was successfully moved\n");

    return 0;
}

The example moves a file. 

int r = MoveFileExW(L"C:\\prog\\myfile.txt", L"C:\\prog\\myfile2.txt", 
    MOVEFILE_REPLACE_EXISTING);

The C:\prog\myfile.txt file is renamed to 
C:\prog\myfile2.txt file. The MOVEFILE_REPLACE_EXISTING
flag replaces existing destination file.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\MoveFile&gt;MoveFile.exe
The file was successfully moved

We have successfully renamed the file.

## File size

The GetFileSizeEx retrieves the size of the specified file.

BOOL WINAPI GetFileSizeEx(HANDLE hFile, PLARGE_INTEGER lpFileSize);

The function's first parameter is a handle to the file. The handle must 
have been created with the FILE_READ_ATTRIBUTES 
access right or equivalent. The second parameter is a pointer to a
LARGE_INTEGER structure that receives the file size, in bytes.

file_size.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    HANDLE hFile = CreateFileW(L"C:\\prog\\slovakia.bmp", GENERIC_READ, 
        FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

    if (hFile == INVALID_HANDLE_VALUE) {

        wprintf(L"Failed to read file\n %lu", GetLastError());
        return 1; 
    }

    LARGE_INTEGER fileSize;
    int r = GetFileSizeEx(hFile, &amp;fileSize);

    if (r == 0) {
        
        wprintf(L"The GetFileSizeEx() function failed %ld", GetLastError());
        CloseHandle(hFile);
        return 1;
    }

    CloseHandle(hFile);

    wprintf(L"The file size is: %lld bytes\n", fileSize.QuadPart);

    return 0;
}

The example determines a size of a bitmap image.

HANDLE hFile = CreateFileW(L"C:\\prog\\slovakia.bmp", GENERIC_READ, 
    FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

With the CreateFileW function, we open the file for
subsequent reading.

LARGE_INTEGER fileSize;
int r = GetFileSizeEx(hFile, &amp;fileSize);

The GetFileSizeEx determines the file size
in bytes.

CloseHandle(hFile);

The CloseHandle closes the file handle.

wprintf(L"The file size is: %lld bytes\n", fileSize.QuadPart);

We print the size of the image to the console. The QuadPart
member has the total size of the file.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\FileSize&gt;FileSize.exe
The file size is: 124886 bytes

The size of the bitmap image is 124886 bytes.

## Last write time

The GetFileTime determines the date and time that a file or 
directory was created, last accessed, and last modified.

BOOL WINAPI GetFileTime(HANDLE hFile, LPFILETIME lpCreationTime, LPFILETIME lpLastAccessTime,
    LPFILETIME lpLastWriteTime);

The first parameter is a handle to the file or directory for which 
dates and times are to be retrieved. The second parameter is a pointer 
to a FILETIME of the created time, the third to the
last accessed time, and the third to the last written time.  

last_write_time.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    FILETIME ftWrite;
    SYSTEMTIME stUTC, stLocal;

    HANDLE hFile = CreateFileW(L"C:\\prog\\testfile.txt", GENERIC_READ, 
        FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

    if (hFile == INVALID_HANDLE_VALUE) {

        wprintf(L"Could not open file, error %lu\n", GetLastError());
        return 1;
    }

    int r = GetFileTime(hFile, NULL, NULL, &amp;ftWrite);

    if (r == 0) {

        wprintf(L"GetFileTime() failed %lu\n", GetLastError());
        return 1;
    }

    r = FileTimeToSystemTime(&amp;ftWrite, &amp;stUTC);

    if (r == 0) {

        wprintf(L"FileTimeToSystemTime() failed %lu\n", GetLastError());
        return 1;
    }

    r = SystemTimeToTzSpecificLocalTime(NULL, &amp;stUTC, &amp;stLocal);

    if (r == 0) {

        wprintf(L"SystemTimeToTzSpecificLocalTime() failed %lu\n", GetLastError());
        return 1;
    }

    wprintf(L"Last write time: %02d/%02d/%d %02d:%02d\n", stLocal.wDay, 
        stLocal.wMonth, stLocal.wYear, stLocal.wHour, stLocal.wMinute);

    return 0;
}

The example prints the last written time of a file in local time.

HANDLE hFile = CreateFileW(L"C:\\prog\\testfile.txt", GENERIC_READ, 
    FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

We retrieve a handle to the file with the CreateFileW
function.

int r = GetFileTime(hFile, NULL, NULL, &amp;ftWrite);

We fill the FILETIME structure of the last
written time with the GetFileTime function. For
other times we pass NULL.

r = FileTimeToSystemTime(&amp;ftWrite, &amp;stUTC);

With the FileTimeToSystemTime function, we
transform the file time into the Universal time.

r = SystemTimeToTzSpecificLocalTime(NULL, &amp;stUTC, &amp;stLocal);

The Universal time is transformed into the local time with the
SystemTimeToTzSpecificLocalTime function.

wprintf(L"Last write time: %02d/%02d/%d %02d:%02d\n", stLocal.wDay, 
    stLocal.wMonth, stLocal.wYear, stLocal.wHour, stLocal.wMinute);

We print the last written time to the console.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\LastWriteTime&gt;LastWriteTime.exe
Last write time: 29/02/2016 14:42

This is a sample output of the LastWriteTime.exe program.

## File attributes

The GetFileAttributesEx function retrieves 
attributes for a specified file or directory. The attributes
include information about whether the file is compressed,
read-only, or archive; the size of the file; and the created, last
accessed, and last written time.

BOOL WINAPI GetFileAttributesExW(LPCWSTR lpFileName, GET_FILEEX_INFO_LEVELS fInfoLevelId,
    LPVOID lpFileInformation);

The first parameter is the name of the file or directory. The second
parameter is a class of attribute information to retrieve. Today, only
GetFileExInfoStandard value is available. The third 
parameter is a pointer to a buffer that receives the attribute information.
The parameter is a WIN32_FILE_ATTRIBUTE_DATA structure 
and has the following members:

typedef struct _WIN32_FILE_ATTRIBUTE_DATA {
    DWORD dwFileAttributes;
    FILETIME ftCreationTime;
    FILETIME ftLastAccessTime;
    FILETIME ftLastWriteTime;
    DWORD nFileSizeHigh;
    DWORD nFileSizeLow;
} WIN32_FILE_ATTRIBUTE_DATA, *LPWIN32_FILE_ATTRIBUTE_DATA;

The structure has members for the file attribute flags,
file related times, and its size.

file_attributes.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t *filename =  L"C:\\prog\\testfile.txt";
 
    WIN32_FILE_ATTRIBUTE_DATA fileInfo;
    LARGE_INTEGER fileSize;
 
    int r = GetFileAttributesExW(filename, GetFileExInfoStandard, &amp;fileInfo);

    if (r == 0) {

        wprintf(L"The GetFileAttributesEx() failed %lu\n", GetLastError());
        return 1;
    }

    DWORD dwAttrs = fileInfo.dwFileAttributes;

    if (dwAttrs &amp; FILE_ATTRIBUTE_NORMAL) {

        wprintf(L"The file is a normal file\n");
    }

    if (dwAttrs &amp; FILE_ATTRIBUTE_DIRECTORY) {

        wprintf(L"The file is a directory\n");
    }

    if (dwAttrs &amp; FILE_ATTRIBUTE_READONLY) {

        wprintf(L"The file is read-only\n");
    }

    if (dwAttrs &amp; FILE_ATTRIBUTE_ARCHIVE) {

        wprintf(L"The file is an archive file\n");
    }

    if (dwAttrs &amp; FILE_ATTRIBUTE_COMPRESSED) {

        wprintf(L"The file is compressed\n");
    }

	fileSize.u.HighPart = fileInfo.nFileSizeHigh;
	fileSize.u.LowPart = fileInfo.nFileSizeLow;

	wprintf(L"The file size is: %llu bytes\n", fileSize.QuadPart);    

    SYSTEMTIME stUTC, stLocal;
    FILETIME lastWriteTime = fileInfo.ftLastWriteTime;

    r = FileTimeToSystemTime(&amp;lastWriteTime, &amp;stUTC);

    if (r == 0) {

        wprintf(L"FileTimeToSystemTime() failed %lu\n", GetLastError());
        return 1;
    }

    r = SystemTimeToTzSpecificLocalTime(NULL, &amp;stUTC, &amp;stLocal);

    if (r == 0) {

        wprintf(L"SystemTimeToTzSpecificLocalTime() failed %lu\n", GetLastError());
        return 1;
    }

    wprintf(L"Last write time: %02d/%02d/%d %02d:%02d\n", stLocal.wDay, 
        stLocal.wMonth, stLocal.wYear, stLocal.wHour, stLocal.wMinute);

    return 0;
}

The example prints various information about the C:\prog\testfile.txt
file.

WIN32_FILE_ATTRIBUTE_DATA fileInfo;

The WIN32_FILE_ATTRIBUTE_DATA structure contains attribute 
information for a file or directory. 

LARGE_INTEGER fileSize;

The LARGE_INTEGER stores a large integer
for file sizes larger that 4 GB. 

int r = GetFileAttributesExW(filename, GetFileExInfoStandard, &amp;fileInfo);

We get the file attributes with the GetFileAttributesExW
function.

DWORD dwAttrs = fileInfo.dwFileAttributes;

The dwFileAttributes member is a combination of
file attribute flags.

if (dwAttrs &amp; FILE_ATTRIBUTE_READONLY) {

    wprintf(L"The file is read-only\n");
}

Read-only files have the FILE_ATTRIBUTE_READONLY
flag set.

fileSize.u.HighPart = fileInfo.nFileSizeHigh;
fileSize.u.LowPart = fileInfo.nFileSizeLow;

wprintf(L"The file size is: %llu bytes\n", fileSize.QuadPart);   

With the nFileSizeHigh and nFileSizeLow
members we determine the size of the file.

FILETIME lastWriteTime = fileInfo.ftLastWriteTime;

The ftLastWriteTime is a member which holds the
last written time. 

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\FileAttributes&gt;FileAttributes.exe
The file is read-only
The file is an archive file
The file size is: 18 bytes
Last write time: 29/02/2016 14:42

Our file had these attributes.

## Reading a file

The ReadFile reads data from the specified file or input/output device.

BOOL WINAPI ReadFile(HANDLE hFile, LPVOID lpBuffer, DWORD nNumberOfBytesToRead,
    LPDWORD lpNumberOfBytesRead, LPOVERLAPPED lpOverlapped);

The function's first parameter is the handle to the file to be read.
The second parameter is a pointer to the buffer that receives the data 
read from the file. The third parameter is the number of bytes
to be read from the file. The fourth parameter is a pointer to the 
variable that receives the number of bytes actually read. The last
parameter is a pointer to an OVERLAPPED structure which 
is required if the hFile parameter was opened with 
the FILE_FLAG_OVERLAPPED, otherwise (for normal blocked I/O) 
it can be NULL.

read_file.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    HANDLE hFile = CreateFileW(L"C:\\prog\\myfile.txt", GENERIC_READ, 
        FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

    if (hFile == INVALID_HANDLE_VALUE) {

        wprintf(L"Failed to read file\n");
        return 1; 
    }

    LARGE_INTEGER fileSize;
    int r = GetFileSizeEx(hFile, &amp;fileSize);

    if (r == 0) {
        
        wprintf(L"The GetFileSizeEx() function failed %ld", GetLastError());
        CloseHandle(hFile);
        return 1;
    }

    DWORD bytesToRead = fileSize.QuadPart;
       
    wchar_t *fileText = GlobalAlloc(GPTR, bytesToRead + 1); 

    if (fileText != NULL) {

        DWORD dwRead; 
        int r = ReadFile(hFile, fileText, bytesToRead, &amp;dwRead, NULL);

        if (r == 0) { 

            wprintf(L"The ReadFile() function failed %ld", GetLastError());
            CloseHandle(hFile);
            return 1;            
        } 
    } 
    
    wprintf(L"%s\n", fileText);

    GlobalFree(fileText); 
    CloseHandle(hFile); 

    return 0;
}

The example reads file contents and prints them to the console.

HANDLE hFile = CreateFileW(L"C:\\prog\\myfile.txt", GENERIC_READ, 
    FILE_SHARE_READ, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

With the CreateFileW function, we create a file handle
in the read mode.

LARGE_INTEGER fileSize;
int r = GetFileSizeEx(hFile, &amp;fileSize);

The GetFileSizeEx function is used to determine the size
of the file. This is necessary to be able to read the whole contents of
the file.

wchar_t *fileText = GlobalAlloc(GPTR, bytesToRead + 1); 

With the GlobalAlloc function we allocate memory
for the contents of the file.

DWORD dwRead; 
int r = ReadFile(hFile, fileText, bytesToRead, &amp;dwRead, NULL);

The contents of the file are read into the created buffer with the
ReadFile method.

wprintf(L"%s\n", fileText);

We print the buffer to the console.

GlobalFree(fileText); 
CloseHandle(hFile); 

In the end, the resources are released.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\ReadFile&gt;ReadFile.exe
This is myfile.txt.

The contents of the file are printed to the console.

## Writing to a file

The WriteFile writes data to the specified file 
or input/output device.

BOOL WINAPI WriteFile(HANDLE hFile, LPCVOID lpBuffer, DWORD nNumberOfBytesToWrite,
    LPDWORD lpNumberOfBytesWritten, LPOVERLAPPED lpOverlapped);

The first parameter is the handle to the file to be written to.
The second parameter is a pointer to the buffer containing the data 
to be written to the file. The third parameter is the number of bytes to be 
written to the file. The fourth parameter is a pointer to the variable 
that receives the number of bytes actually written. The last parameter is 
a pointer to an OVERLAPPED structure which is required if 
the hFile parameter was opened with the FILE_FLAG_OVERLAPPED, 
otherwise (for normal blocked I/O) this paramater can be set to NULL.

write_file.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;strsafe.h&gt;

int wmain(void) {

    HANDLE hout = CreateFileW(L"C:\\prog\\testfile.txt", FILE_WRITE_DATA, 0, NULL,
      CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);

    if (hout == INVALID_HANDLE_VALUE) {

        wprintf(L"Cannot open file\n");
        return 1;
    } else {
        
        wprintf(L"The file was opened for writing\n");
    }
    
    size_t nBytes;
    wchar_t *data = L"This is testfile.";

    size_t max_size = STRSAFE_MAX_CCH * sizeof(wchar_t);

    HRESULT hrs = StringCbLengthW(data, max_size, &amp;nBytes);

    if (FAILED(hrs)) {

        wprintf(L"StringCbLengthW() failed\n"); 
        return 1;
    }

    DWORD n;
    int r = WriteFile(hout, data, nBytes, &amp;n, NULL);

    if (r == 0) {

        wprintf(L"Cannot write to file");
        return 1;
    } else {

        wprintf(L"Successfully written data to file\n");
    }

    CloseHandle(hout);

    return 0;
}

The example writes some data to the C:\prog\testfile.txt file.

HANDLE hout = CreateFileW(L"C:\\prog\\testfile.txt", FILE_WRITE_DATA, 0, NULL,
  CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);

The file is opened in the write mode. The FILE_WRITE_DATA is
an access right to write to a file.

wchar_t *data = L"This is testfile.";

This is the data to be written.

HRESULT hrs = StringCbLengthW(data, max_size, &amp;nBytes);

The StringCbLengthW determines the size of
the data to be written in bytes.

int r = WriteFile(hout, data, nBytes, &amp;n, NULL);

The WriteFile writes data to the file.

C:\Users\Jano\Documents\Pelles C Projects\filemanagement\Write2File&gt;Write2File.exe
The file was opened for writing
Successfully written data to file

The data was successfully written to the C:\prog\testfile.txt file.

ip_address.c
  

#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

#define ID_BUTTON 1

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateControls(HWND);

HWND hIpAdr;
HWND hbtn;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    HWND hwnd;
    MSG  msg ;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Application";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClassW(&amp;wc);
    hwnd = CreateWindowW(wc.lpszClassName, L"IP address",
                WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                100, 100, 260, 170, 0, 0, hInstance, 0);  

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

              
        case WM_COMMAND:
          
            if (LOWORD(wParam) == ID_BUTTON) {

                DWORD dwAddr;
                SendMessage(hIpAdr, IPM_GETADDRESS, 0, (LPARAM) &amp;dwAddr);

                wchar_t buff[32];
                wsprintfW(buff, L"%d.%d.%d.%d", (int) FIRST_IPADDRESS(dwAddr), 
                    (int) SECOND_IPADDRESS(dwAddr), (int) THIRD_IPADDRESS(dwAddr), 
                    (int) FOURTH_IPADDRESS(dwAddr));
                MessageBoxW(hwnd, buff, L"IP Address", MB_OK);
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
    icex.dwICC  = ICC_INTERNET_CLASSES;
    InitCommonControlsEx(&amp;icex);

    hIpAdr = CreateWindowExW(0, WC_IPADDRESSW, L"", 
          WS_CHILD | WS_VISIBLE | WS_OVERLAPPED,
          30, 20, 150, 20, hwnd, NULL, NULL, NULL);   

    hbtn = CreateWindowW(L"Button", L"Show", 
          WS_CHILD | WS_VISIBLE,
          85, 90, 85, 25, hwnd, (HMENU) ID_BUTTON, NULL, NULL);
}

hot_key.c
  

```
#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void RegisterMyKey(HWND);
void CreateControls(HWND);

HWND hotKey;

#define ID_BTN 1
#define ID_HOTKEY 11

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    HWND hwnd;
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Application";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
 
    RegisterClassW(&amp;wc);
    hwnd = CreateWindowW(wc.lpszClassName, L"Hot key",
                  WS_OVERLAPPEDWINDOW | WS_VISIBLE,
                  100, 100, 270, 170, 0, 0, 0, 0);  

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

        case WM_COMMAND:

            if (LOWORD(wParam) == ID_BTN) {
            
                SetFocus(hwnd);
            }
            
            if (HIWORD(wParam) == EN_CHANGE) {

                RegisterMyKey(hwnd);
            }
            break;

        case WM_HOTKEY:

            MessageBoxW(hwnd, L"Hot key pressed", L"Info", MB_OK);
            break;

        case WM_DESTROY:
        
            UnregisterHotKey(hwnd, ID_HOTKEY);
            PostQuitMessage(0);            
            break; 
    }
  
    return DefWindowProcW(hwnd, msg, wParam, lParam);
}

void CreateControls(HWND hwnd) {

    INITCOMMONCONTROLSEX icex;
    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC = ICC_HOTKEY_CLASS; 
    InitCommonControlsEx(&amp;icex); 

    hotKey = CreateWindowExW(0, HOTKEY_CLASSW, L"", 
        WS_CHILD | WS_VISIBLE, 10, 10, 200, 20, 
        hwnd, NULL, NULL, NULL);   

    SendMessage(hotKey, HKM_SETRULES, (WPARAM) HKCOMB_NONE,   // invalid key combinations 
        MAKELPARAM(HOTKEYF_ALT, 0));

    SendMessage(hotKey, HKM_SETHOTKEY, MAKEWORD(0x41, HOTKEYF_ALT), 0);
    RegisterHotKey(hwnd, ID_HOTKEY, MOD_ALT, 0x41);

    CreateWindowW(L"Button", L"Change focus", 
        WS_CHILD | WS_VISIBLE,
        10, 60, 120, 25, hwnd, (HMENU) ID_BTN, NULL, NULL); 
}

void RegisterMyKey(HWND hwnd) {

    UnregisterHotKey(hwnd, ID_HOTKEY);

    WORD dwKey = (WORD) SendMessage(hotKey, HKM_GETHOTKEY, 0, 0);

    //wchar_t buf[100] = {0};

    //wsprintfW(buf, L"%lu", dwKey);
    //MessageBoxW(hwnd, buf, L"", 0);

    BYTE mod = 0;
    BYTE vir = LOBYTE(dwKey);

    if (HIBYTE(dwKey) &amp; HOTKEYF_CONTROL) {

        mod |= MOD_CONTROL;
    }

    if (HIBYTE(LOWORD (dwKey)) &amp; HOTKEYF_ALT) {

        mod |= MOD_ALT;
    }

    if (HIBYTE(dwKey) &amp; HOTKEYF_SHIFT) {

        mod |= MOD_SHIFT;
    }

    RegisterHotKey(hwnd, ID_HOTKEY, mod, vir);
}

```

statusbar.c
  

```
#include &lt;windows.h&gt;
#include &lt;commctrl.h&gt;

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
void CreateControls(HWND);

HWND hStat;

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance,
                    PWSTR lpCmdLine, int nCmdShow) {

    HWND hwnd;
    MSG  msg;    
    WNDCLASSW wc = {0};
    wc.lpszClassName = L"Application";
    wc.hInstance     = hInstance;
    wc.hbrBackground = GetSysColorBrush(COLOR_3DFACE);
    wc.lpfnWndProc   = WndProc;
    wc.hCursor       = LoadCursor(0, IDC_ARROW);
  
    RegisterClassW(&amp;wc);
    hwnd = CreateWindowW(wc.lpszClassName, L"Status bar",
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

            CreateControls(hwnd);
            break;

        case WM_SIZE:

            if (wParam != SIZE_MINIMIZED) {

                SendMessageW(hStat, WM_SIZE, wParam, lParam);
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
    icex.dwICC  = ICC_BAR_CLASSES;
    InitCommonControlsEx(&amp;icex);

    hStat = CreateWindowExW(0, STATUSCLASSNAMEW, L"", 
          WS_CHILD | WS_VISIBLE | SBARS_SIZEGRIP ,
          0, 0, 0, 0, hwnd, NULL, NULL, NULL);   

    SendMessageW(hStat, SB_SETTEXTW, 0, (LPARAM) L"Ready"); 
}

```

In this part of the Windows API tutorial, we have worked with files 
and directories. 

```
#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) { 

    wchar_t words[10][10] = {L"�ate�", L"�no", L"zem", L"dvor", 
        L"cenc��", L"�aj", L"bocian", L"atrament", L"chlieb", L"�ula"};
    wchar_t temp[50];

    HANDLE std = GetStdHandle(STD_OUTPUT_HANDLE);   
    
    if (std == INVALID_HANDLE_VALUE) {
        wprintf(L"Cannot retrieve standard output handle %d\n", 
            GetLastError());
        return 1;
    }

    for (int i = 0; i &lt; sizeof(words)/sizeof(*words)-1; i++) {

        for (int j=i+1; j &lt; sizeof(words)/sizeof(*words); j++) {

            int r = CompareStringEx(LOCALE_NAME_SYSTEM_DEFAULT, 
                SORT_STRINGSORT , words[i], 
                sizeof(words[i])/sizeof(words[i][0]), 
                words[j], sizeof(words[j])/sizeof(words[j][0]), 
                0, 0, 0);

            if (r == 0 ) {
            
                wprintf(L"CompareStringEx() failed %d\n", GetLastError());

                CloseHandle(std);

                return 1;
            }

            if (r == CSTR_GREATER_THAN) {

                wcscpy(temp, words[j]);
                wcscpy(words[j], words[i]);
                wcscpy(words[i], temp);
            } 

        }

        //WriteConsoleW(std, buf, wcslen(buf), 0, 0);
        //WriteConsoleW(std, L"\n", 1, 0, 0);
    } 

    for (int i=0; i &lt; sizeof(words)/sizeof(*words); i++) {

        WriteConsoleW(std, words[i], wcslen(words[i]), 0, 0);
        WriteConsoleW(std, L"\n", 1, 0, 0);
    }

    CloseHandle(std);

    return 0;
}

```

```

```

[Contents](..)