+++
title = "Strings in Windows API"
date = 2025-08-29T19:57:41.402+01:00
draft = false
description = "In this part of the Windows API tutorial, we work with strings; we describe CRT and Windows API string functions."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../system/)
[Next](../datetime/)

# Strings in Windows API

last modified October 18, 2023

In C language there is no string data type. A string literal in a program is an
array of characters. Whenever we say string we mean an array of characters.

We have five sets of functions for working with strings; both in C runtime
library (CRT) and in Windows API:

    - ANSI C standard functions

    - Security enhanced CRT functions

    - Windows API kernel and user functions

    - Windows API Shell Lightweight Utility functions

    - Windows API StrSafe functions

It is recommended to prefer either security enhanced standard functions or
Windows API safe functions.

## ANSI C string functions

The C Run-Time (CRT) library functions have some small overhead since they call
Windows API functions underneath. These functions provide portability but have
some limitations. When not used properly, they can cause security risks.

These functions do not return an error value when they fail.

ansic_functions.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define STR_EQUAL 0

int wmain(void) {

    wchar_t str1[] = L"There are 15 pines";

    wprintf(L"The length of the string is %lld characters\n", wcslen(str1));

    wchar_t buf[20];
    wcscpy(buf, L"Wuthering");
    wcscat(buf, L" heights\n");
    wprintf(buf);

    if (wcscmp(L"rain", L"rainy")== STR_EQUAL) {

        wprintf(L"rain and rainy are equal strings\n");
    } else {

        wprintf(L"rain and rainy are not equal strings\n");
    }

    return 0;
}

In the example we present a few string functions from the CRT library.

wprintf(L"The length of the string is %lld characters\n", wcslen(str1));

The wcslen returns the number of wide-characters in the string.

wcscpy(buf, L"Wuthering");

The wcscpy copies a string to a string buffer.

wcscat(buf, L" heights\n");

The wcscat function appends a string to a string buffer.

if (wcscmp(L"rain", L"rainy")== STR_EQUAL) {

    wprintf(L"rain and rainy are equal strings\n");
} else {

    wprintf(L"rain and rainy are not equal strings\n");
}

The wcscmp compares two string.

C:\Users\Jano\Documents\WinApi\strings\ANSICFunctions&gt;ANSICFunctions.exe
The length of the string is 18 characters
Wuthering heights
rain and rainy are not equal strings

## Security enhanced CRT functions

Security CRT functions add additional security to the CRT functions. (They are
not standard functions but an MS extension.) These functions validate
parameters, take size buffers, check that strings are NULL terminated, and
provide enhanced error reporting.

Security CRT functions have an _s suffix.

security_enhanced.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define BUF_LEN 25

int wmain(void) {

    wchar_t str1[] = L"There are 15 pines";

    const int MAX_CHARS = 50;
    size_t count = wcsnlen_s(str1, MAX_CHARS);

    wprintf(L"The length of the string is %ld characters\n", count);

    wchar_t buf[BUF_LEN] = {0};

    int r = wcscpy_s(buf, BUF_LEN, L"Wuthering");

    if (r != 0) {

        wprintf(L"wcscpy_s() failed %ld", r);
    }

    r = wcscat_s(buf, BUF_LEN, L" heights\n");

    if (r != 0) {

        wcscat_s(L"wcscat_s() failed %ld", r);
    }

    wprintf_s(buf);

    return 0;
}

In the example, we present four functions: wcsnlen_s,
wcscpy_s, wcscat_s, and wprintf_s.

const int MAX_CHARS = 50;
size_t count = wcsnlen_s(str1, MAX_CHARS);

The wcsnlen_s computes the lenght of a wide string. The function
only checks the first MAX_CHARS characters.

int r = wcscpy_s(buf, BUF_LEN, L"Wuthering");

With the wcscpy_s function, we copy the L"Wuthering"
string into the buffer. The function takes the maximum number of characters in
the buffer and it returns an error code if it fails. The function returns 0 on
success.

r = wcscat_s(buf, BUF_LEN, L" heights\n");

The wcscat_s is a secure extension of the wcscat
function.

wprintf_s(buf);

There is even a security enhanced wprintf function; it has some
runtime constraints.

C:\Users\Jano\Documents\WinApi\strings\SecurityEnhanced&gt;SecurityEnhanced.exe
The length of the string is 18 characters
Wuthering heights

## Windows API kernel and user string functions

These functions are specific to Windows OS; they are available in
User32.lib and Kernel32.lib. They are lighter than
their CRT counterparts.

Kernel string functions have their roots in the development of the Windows
kernel. They are prefixed with the l letter.

### The string length

One of the most common requirements is to figure out the length of the string.
The lstrlen function returns the length of the specified string in
characters. It does not count the terminating null character.

int WINAPI lstrlenA(LPCSTR lpString);
int WINAPI lstrlenW(LPCWSTR lpString);

The ANSI and the UNICODE functions take the string as a parameter and return the
number of characters in the string.

winapi_string_lenght.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void)  {

    char *name = "Jane";
    wchar_t *town = L"Bratislava";

    wprintf(L"The length of the name string is %d\n", lstrlenA(name));
    wprintf(L"The town string length is %d\n", lstrlenW(town));

    return 0;
}

We compute the length of two strings. The lstrlen function is in
fact a macro to either lstrlenA or lstrlenW. The first
is used for ANSI strings, the second for wide strings.

wprintf(L"The town string length is %d\n", lstrlenW(town));

We print the length of the L"Bratislava" string using the
lstrlenW function.

C:\Users\Jano\Documents\WinApi\strings\WinapiStringLength&gt;WinapiStringLength.exe
The length of the name string is 4
The town string length is 10

### Concatenating strings

The lstrcatW function appends one string to another string.

LPWSTR WINAPI lstrcatW(LPWSTR lpString1, LPCWSTR lpString2);

The first parameter is the buffer which should contain both strings. It must be
large enough to contain both of them, including the NULL
terminating character. The return value is a pointer to the buffer.

winapi_string_concat.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int main(void) {

    wchar_t *s1 = L"ZetCode, ";
    wchar_t *s2 = L"tutorials ";
    wchar_t *s3 = L"for ";
    wchar_t *s4 = L"programmers.\n";

    int len = lstrlenW(s1) + lstrlenW(s2)
        + lstrlenW(s3) + lstrlenW(s4);
    wchar_t buf[len+1];

    lstrcpyW(buf, s1);
    lstrcatW(buf, s2);
    lstrcatW(buf, s3);
    lstrcatW(buf, s4);

    wprintf(buf);

    return 0;
}

In the example, we concatenate four strings.

wchar_t *s1 = L"ZetCode, ";
wchar_t *s2 = L"tutorials ";
wchar_t *s3 = L"for ";
wchar_t *s4 = L"programmers.\n";

These are the strings that we are going to concatenate.

int len = lstrlenW(s1) + lstrlenW(s2)
    + lstrlenW(s3) + lstrlenW(s4);

We compute the length of the four strings using the lstrlenW
function.

wchar_t buf[len+1];

We create a buffer to hold the final string. Note that we add 1 to include
the NULL character.

lstrcpyW(buf, s1);

We copy the first string to the buffer using the lstrcpyW function.

lstrcatW(buf, s2);
lstrcatW(buf, s3);
lstrcatW(buf, s4);

We append the remaining strings with the lstrcatW function.

C:\Users\Jano\Documents\WinApi\strings\WinapiStringConcat&gt;WinapiStringConcat.exe
ZetCode, tutorials for programmers.

### Converting characters

We have two methods for converting characters to uppercase or to lowercase. The
CharLowerW function converts a character string or a single
character to lowercase. The CharUpperW function converts a
character string or a single character to uppercase. If the operand is a
character string, the function converts the characters in place. In other words,
they are modified.

LPWSTR WINAPI CharLowerW(LPWSTR lpsz);
LPWSTR WINAPI CharUpperW(LPWSTR lpsz);

The functions modify the strings in place and return a pointer to the modified
string.

winapi_string_case.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#pragma comment(lib, "User32.lib")

int wmain(void) {

    wchar_t str[] = L"Europa";

    CharLowerW(str);
    wprintf(L"%ls\n", str);

    CharUpperW(str);
    wprintf(L"%ls\n", str);

    return 0;
}

We have one string which we convert to lowercase and uppercase.

CharLowerW(str);
wprintf(L"%ls\n", str);

We convert the str string to lowercase with the
CharLowerW method. The string is modified in place.

C:\winapi\examples2\strings\UpperLower&gt;UpperLower.exe
europa
EUROPA

### Comparing strings

The lstrcmpW function compares two strings. It returns 0 if the
strings are equal. The comparison is case sensitive. This means that "Cup" and
"cup" are two different strings. The lstrcmpiW yields case
insensitive string comparison. For this function, "Cup" and "cup" are equal.

int WINAPI lstrcmpW(LPCWSTR lpString1, LPCWSTR lpString2);
int WINAPI lstrcmpiW(LPCWSTR lpString1, LPCWSTR lpString2);

The functions take two strings as parameters. The return value indicates the
equality of the strings. 0 value is returned for equal strings.

winapi_string_compare.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define STR_EQUAL 0

int wmain(void) {

    wchar_t *s1 = L"Strong";
    wchar_t *s2 = L"strong";

    if (lstrcmpW(s1, s2) == STR_EQUAL) {

        wprintf(L"%ls and %ls are equal\n", s1, s2);
    } else {

        wprintf(L"%ls and %ls are not equal\n", s1, s2);
    }

    wprintf(L"When applying case insensitive comparison:\n");

    if (lstrcmpiW(s1, s2) == STR_EQUAL) {

        wprintf(L"%ls and %ls are equal\n", s1, s2);
    } else {

        wprintf(L"%ls and %ls are not equal\n", s1, s2);
    }

    return 0;
}

We have two strings. We compare them using both case sensitive and case
insensitive string comparison.

if (lstrcmpW(s1, s2) == STR_EQUAL) {

      wprintf(L"%ls and %ls are equal\n", s1, s2);
} else {

      wprintf(L"%ls and %ls are not equal\n", s1, s2);
}

If the lstrcmpW function returns STR_EQUAL, which is
defined to 0, then we print to the console that the two strings are equal.
Otherwise we print that they are not equal.

C:\Users\Jano\Documents\WinApi\strings\WinapiStringCompare&gt;WinapiStringCompare.exe
Strong and strong are not equal
When applying case insensitive comparison:
Strong and strong are equal

### Filling a buffer

Filling a buffer with formatted data is essential in C programming.
The wsprintfW function writes formatted data to the specified
buffer.

int __cdecl wsprintfW(LPWSTR lpOut, LPCWSTR lpFmt, ... );

The function's first parameter is the buffer that is to receive the formatted
output. The second is a string containing format-control specifications. Then we
have one or more optional arguments which correspond to format-control
specifications.

winapi_string_fillbuffer.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#pragma comment(lib, "User32.lib")

int wmain(void) {

    SYSTEMTIME st = {0};
    wchar_t buf[128] = {0};

    GetLocalTime(&amp;st);
    wsprintfW(buf, L"Today is %lu.%lu.%lu\n", st.wDay,
        st.wMonth, st.wYear);

    wprintf(buf);

    return 0;
}

We build a string which is filled with the current date.

wchar_t buf[128] = {0};

In this particular case we can safely assume that the string will not exceed 128
characters.

GetLocalTime(&amp;st);

The GetLocalTime function retrieves the current local date and
time.

wsprintfW(buf, L"Today is %lu.%lu.%lu\n", st.wDay,
    st.wMonth, st.wYear);

The wsprintfW fills the buffer with a wide string. Arguments are
copied to the string according to the format specifier.

wprintf(buf);

The content of the buffer is printed to the console.

C:\Users\Jano\Documents\WinApi\strings\WinapiStringFillBuffer&gt;WinapiStringFillBuffer.exe
Today is 11.2.2016

### Character types

Characters have various types. They can be digits, spaces, letters, punctuation,
or control characters.

BOOL WINAPI GetStringTypeW(DWORD dwInfoType, LPCWSTR lpSrcStr,
    int cchSrc, LPWORD lpCharType);

The GetStringTypeW function retrieves character type information
for the characters in the specified Unicode string. The first parameter is a
flag specifying the info types.

    
    FlagMeaning
    
  
    CT_CTYPE1Retrieve character type information.
    CT_CTYPE2Retrieve bidirectional layout information.
    CT_CTYPE3Retrieve text processing information.
  

Table: Character info types

The second parameter is the Unicode string for which to retrieve the character
types.

The third parameter is the size of the string. The final parameter is a pointer
to an array of 16-bit values. The length of this array must be large enough to
receive one 16-bit value for each character in the source string. The array will
contain one word corresponding to each character in the source string.

The GetStringTypeW function returns a value which is a combination
of types. We can query a specific type with the &amp; operator.

ValueMeaning

C1_DIGITDecimal digits
C1_SPACESpace characters
C1_PUNCTPunctuation
C1_CNTRLControl characters
C1_ALPHAAny linguistic character

Table: Partial list of character types

The function returns 0 on failure.

winapi_string_types.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;stdbool.h&gt;

int wmain(void) {

    wchar_t str[] = L"7 white, 3 red roses.\n";

    int alphas = 0;
    int digits = 0;
    int spaces = 0;
    int puncts = 0;
    int contrs = 0;

    int size = lstrlenW(str);
    WORD types[size];
    ZeroMemory(types, size);

    bool rv = GetStringTypeW(CT_CTYPE1, str, size, types);

    if (!rv) {

        wprintf(L"Could not get character types (%ld)", GetLastError());
        return EXIT_FAILURE;
    }

    for (int i=0; i&lt;size; i++) {

        if (types[i] &amp; C1_ALPHA) {

            alphas++;
        }

        if (types[i] &amp; C1_DIGIT) {

            digits++;
        }

        if (types[i] &amp; C1_SPACE) {

            spaces++;
        }

        if (types[i] &amp; C1_PUNCT) {

            puncts++;
        }

        if (types[i] &amp; C1_CNTRL) {

            contrs++;
        }
    }

    wprintf(L"There are %ld letter(s), %ld digit(s), "
        L"%ld space(s), %ld punctuation character(s), "
        L"and %ld control character(s)\n", alphas, digits,
        spaces, puncts, contrs);

    return 0;
}

We have a short sentence. The GetStringTypeW function is used
to determine the character types of the string.

wchar_t str[] = L"7 white, 3 red roses.\n";

This is a short sentence consisting of various wide characters.

int alphas = 0;
int digits = 0;
int spaces = 0;
int puncts = 0;
int contrs = 0;

These variables will be used to count letters, digits, spaces, punctuation,
and control characters.

int size = lstrlenW(str);
WORD types[size];
ZeroMemory(types, size);

We get the size of the string and create and array of values. The size does not
include the NULL terminating character. We can add 1 to include it.
It will be counted as a control character.

bool rv = GetStringTypeW(CT_CTYPE1, str, size, types);

We get the character types of the sentence. The types array is filled with
character type values.

if (types[i] &amp; C1_DIGIT) {
  digits++;
}

If the value contains the C1_DIGIT flag, we increase the digits
counter.

C:\Users\Jano\Documents\WinApi\strings\WinapiStringTypes&gt;WinapiStringTypes.exe
There are 13 letter(s), 2 digit(s), 5 space(s), 2 punctuation character(s),
and 1 control character(s)

## Windows API Shell Lightweight Utility functions

These functions are specific to Windows OS; they are available in the
Shlwapi.lib.

### Trimming a string

The StrTrimW function removes specified leading and trailing
characters from a string. It returns true if any characters were removed;
otherwise, false.

BOOL WINAPI StrTrimW(LPWSTR psz, LPCWSTR pszTrimChars);

The first parameter is a pointer to the string to be trimmed. When this function
returns successfully, psz receives the trimmed string. The second
parameter is a pointer to a string that contains the characters to trim from
psz.

winapi_shell_trim.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;stdbool.h&gt;
#include "Shlwapi.h"

#pragma comment(lib, "Shlwapi.lib")

int wmain(void) {

    wchar_t buf[] = L"23tennis74";
    wchar_t trim[] = L"0123456789";

    wprintf(L"Original string: %ls\n", buf);

    bool r = StrTrimW(buf, trim);

    if (r == true) {

        wprintf(L"The StrTrim() trimmed some characters\n", buf);
    } else {

        wprintf(L"No characters were trimmed\n", buf);
    }

    wprintf(L"Trimmed string: %ls\n", buf);

    return 0;
}

In the example, we remove any digits from a string.

wchar_t buf[] = L"23tennis74";

We remove all digits from this string.

wchar_t trim[] = L"0123456789";

This string contains all characters to be removed.

bool r = StrTrimW(buf, trim);

With the StrTrimW function, we trim
digits from the buffer.

C:\Users\Jano\Documents\WinApi\strings\ShellTrimString&gt;ShellTrimString.exe
Original string: 23tennis74
The StrTrim() trimmed some characters
Trimmed string: tennis

### Converting strings to integers

The StrToIntExW converts a string representing
a decimal or hexadecimal number to an integer. The function
returns true on success.

BOOL WINAPI StrToIntExW(LPCWSTR pszString, DWORD dwFlags, int *piRet);

The first parameter is a pointer to the string to be converted. The second
parameter is one of the flags that specify how pszString should be
parsed for its conversion to an integer. The third parameter is a pointer to an
int that receives the converted string.

winapi_shell_convert.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include &lt;stdbool.h&gt;
#include "Shlwapi.h"

#pragma comment(lib, "Shlwapi.lib")

int wmain(void) {

    wchar_t str1[] = L"512";
    wchar_t str2[] = L"0xAB12";
    int n = 0;

    bool r = StrToIntExW(str1, STIF_DEFAULT, &amp;n);

    if (r == true) {

        wprintf(L"The value is %d\n", n);
    } else {

        wprintf(L"The first conversion failed\n");
        return 1;
    }

    r = StrToIntExW(str2, STIF_SUPPORT_HEX, &amp;n);

    if (r == true) {

        wprintf(L"The value is %d\n", n);
    } else {

        wprintf(L"The second conversion failed\n");
        return 1;
    }

    return 0;
}

In the example, we convert two strings; one representing a decimal value and one
a hexadecimal one.

wchar_t str1[] = L"512";
wchar_t str2[] = L"0xAB12";

The first string represents a decimal number; the second string represents a
hexadecimal number.

bool r = StrToIntExW(str1, STIF_DEFAULT, &amp;n);

With the StrToIntExW function, we convert the first string into an
integer. The STIF_DEFAULT flag tells the function to convert a
decimal value.

r = StrToIntExW(str2, STIF_SUPPORT_HEX, &amp;n);

With the STIF_SUPPORT_HEX flag, we tell the function to convert a
hexadecimal value.

C:\Users\Jano\Documents\WinApi\strings\ShellConvertString&gt;ShellConvertString.exe
The value is 512
The value is 43794

### Searching strings

The StrStrW function finds the first occurrence of a substring
within a string. The comparison is case-sensitive.

LPWSTR WINAPI StrStrW(LPCWSTR pszFirst, LPCWSTR pszSrch);

The first parameter is a pointer to the string to search. The second parameter
is a pointer to the substring to search for. The function returns the address of
the first occurrence of the matching substring if successful, or
NULL otherwise.

winapi_shell_search.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;
#include "Shlwapi.h"

#pragma comment(lib, "Shlwapi.lib")

int wmain(void) {

    wchar_t buf[] = L"Today is a rainy day.";
    wchar_t *search_word = L"rainy";
    int len = wcslen(search_word);

    LPWSTR pr = StrStrW(buf, search_word);

    if (pr == NULL) {

        wprintf(L"No match\n", buf);
    } else {

        wprintf(L"%.*ls is found\n", len, pr);
    }

    return 0;
}

In the code example, we search for a word within a sentence.

wchar_t buf[] = L"Today is a rainy day.";

We search for a word from this sentence.

wchar_t *search_word = L"rainy";

This is the word that we search for.

LPWSTR pr = StrStrW(buf, search_word);

The StrStrW function searches for a word within the sentence. If it
succeeds, it returns a pointer to the matching substring.

C:\Users\Jano\Documents\WinApi\strings\ShellSearchString&gt;ShellSearchString.exe
rainy is found

## Windows API StrSafe functions

To increase application security, StrSafe functions were released. These
functions require the size of the destination buffer as an input. The buffers
are guaranteed to be null-terminated. The functions return error codes; this
enables proper error handling.

Each of the functions is available in a corresponding character count
Cch or byte count Cb version.

### The string length

The StringCchLengthW and StringCbLengthW
functions enable to determine the lenght of the string in characters
and bytes.

HRESULT StringCchLengthW(LPCWSTR psz, size_t cchMax, size_t *pcch);
HRESULT StringCbLengthW(LPCWSTR psz, size_t cbMax, size_t *pcb);

The first parameter of the functions is a string whose length is to be checked.
The second parameter is the maximum number of characters (bytes) allowed in the
psz parameter. This value cannot exceed
STRSAFE_MAX_CCH. The third parameter is the number of characters
(bytes) in psz, not including the terminating null character.

The functions return S_OK on success and
STRSAFE_E_INVALID_PARAMETER on failure. The functions fail if the
value in psz is NULL, cchMax is larger
than STRSAFE_MAX_CCH, or psz is longer than
cchMax. The SUCCEEDED and FAILED
macros can be used to check the return values of the functions.

safe_length.c
  

#include &lt;windows.h&gt;
#include &lt;strsafe.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t str[] = L"ZetCode";
    size_t target_size = 0;

    size_t size = sizeof(str);

    HRESULT r = StringCbLengthW(str, size, &amp;target_size);

    if (SUCCEEDED(r)) {

        wprintf(L"The string has %lld bytes\n", target_size);
    } else {

        wprintf(L"StringCbLengthW() failed\n");
        return 1;
    }

    size = sizeof(str)/sizeof(wchar_t);

    r = StringCchLengthW(str, size, &amp;target_size);

    if (SUCCEEDED(r)) {

        wprintf(L"The string has %lld characters\n", target_size);
    } else {

        wprintf(L"StringCchLengthW() failed\n");
        return 1;
    }

    return 0;
}

The code example determines the lenght of a given string in characters and
bytes.

wchar_t str[] = L"ZetCode";

We are going to determine the length of this string.

size_t target_size = 0;

The target_size variable is filled with the counted values when the
functions return.

size_t size = sizeof(str);

With the sizeof operator, we get the size of the array of
characters in bytes. The value serves as a maximum allowable number of
characters in the string for the StringCbLengthW function.

HRESULT r = StringCbLengthW(str, size, &amp;target_size);

With the StringCbLengthW function we determine the length of the
string in bytes. The length is stored in the target_size variable.

if (SUCCEEDED(r)) {

    wprintf(L"The string has %lld bytes\n", target_size);
} else {

    wprintf(L"StringCbLengthW() failed\n");
    return 1;
}

We check the returned value with the SUCCEEDED macro. On success,
we print the number of bytes in the string; on error, we print an error message.

size = sizeof(str)/sizeof(wchar_t);

Here we determine the maximum allowable characters in the string. The
wchar_t is a type for wide characters; its size is compiler
specific.

r = StringCchLengthW(str, size, &amp;target_size);

With the StringCchLengthW function, we get the size of the string
in characters.

if (SUCCEEDED(r)) {

    wprintf(L"The string has %lld characters\n", target_size);
} else {

    wprintf(L"StringCchLengthW() failed\n");
    return 1;
}

On success, we print the number of characters in the string to the console. On
error, we print an error message.

C:\Users\Jano\Documents\WinApi\strsafe\SafeLength&gt;SafeLength.exe
The string has 14 bytes
The string has 7 characters

The string consists of 14 bytes or 7 characters.

### Reading standard input

The StringCchGetsW reads a line from the standard input, including
the newline character.

HRESULT StringCchGetsW(LPWSTR pszDest, size_t cchDest);

The first parameter is the destination buffer, which receives the copied
characters. The second parameter is the size of the destination buffer, in
characters.

safe_gets.c
  

#include &lt;windows.h&gt;
#include &lt;strsafe.h&gt;
#include &lt;wchar.h&gt;

#define BUF_LEN 8191

int wmain(void) {

    wchar_t buf[BUF_LEN] = {0};
    HRESULT r = StringCchGetsW(buf, ARRAYSIZE(buf));

    if (SUCCEEDED(r)) {

        wprintf(L"You have entered: %ls\n", buf);

    } else {

        wprintf(L"StringCchGets() failed\n");
        return 1;
    }

    return 0;
}

In the example we read a line from the standard input. The line is printed back
to the console.

#define BUF_LEN 8191

According to the MSDN documentation, the maximum input on command prompt cannot
exceed 8191 characters.

wchar_t buf[BUF_LEN] = {0};

We create a buffer for the input string.

HRESULT r = StringCchGetsW(buf, ARRAYSIZE(buf));

The StringCchGetsW reads a line from
the stdin.

C:\Users\Jano\Documents\WinApi\strsafe\SafeGets&gt;SafeGets.exe
Today is a rainy day.
You have entered: Today is a rainy day.

### Copying strings

The StringCchCopyW copies one string to another.

HRESULT StringCchCopyW(LPTSTR pszDest, size_t cchDest, LPCWSTR pszSrc);

The first parameter is the destination buffer, which receives the copied string.
The second parameter is the size of the destination buffer, in characters. The
third parameter is the source string.

safe_copy.c
  

#include &lt;windows.h&gt;
#include &lt;strsafe.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    wchar_t *sentence = L"Today is a rainy day.";

    size_t size = wcslen(sentence) + 1;

    wchar_t buf[size];
    ZeroMemory(buf, size);

    HRESULT r = StringCchCopyW(buf, size, sentence);

    if (SUCCEEDED(r)) {

        wprintf(L"%ls\n", buf);

    } else {

        wprintf(L"StringCchCopyW() failed\n");
        return 1;
    }

    return 0;
}

In the code example, we copy one string with the StringCchCopyW
function.

wchar_t *sentence = L"Today is a rainy day.";

This is the string to be copied.

size_t size = wcslen(sentence) + 1;

We determine its length with the wcslen
function; one character is reserved for the newline.

wchar_t buf[size];
ZeroMemory(buf, size);

We create a buffer and with it with zeros with the
ZeroMemory function.

HRESULT r = StringCchCopyW(buf, size, sentence);

With the StringCchCopyW, we copy the string into the buffer. The
size of the destination buffer is provided to ensure that it does not write past
the end of this buffer.

C:\Users\Jano\Documents\WinApi\strsafe\SafeCopy&gt;SafeCopy.exe
Today is a rainy day.

### Concatenating strings

The StringCchCatW concatenates one string to another string.

HRESULT StringCchCatW(LPWSTR pszDest, size_t cchDest, LPCWSTR pszSrc);

The first parameter is the destination buffer. The second parameter is the size
of the destination buffer, in characters. The third paramater is the source
string that is to be concatenated to the end of the destination buffer.

safe_concat.c
  

#include &lt;windows.h&gt;
#include &lt;strsafe.h&gt;
#include &lt;wchar.h&gt;

#define BUF_LEN 256

int wmain(void) {

    wchar_t buf[BUF_LEN] = {0};

    HRESULT r = StringCchCatW(buf, BUF_LEN, L"Hello ");

    if (FAILED(r)) {

        wprintf(L"StringCchCatW() failed\n");
        return 1;
    }

    r = StringCchCatW(buf, BUF_LEN, L"there");

    if (FAILED(r)) {

        wprintf(L"StringCchCatW() failed\n");
        return 1;
    }

    wprintf(L"%ls\n", buf);

    return 0;
}

In the code example, we concatenate two strings with the
StringCchCatW function.

HRESULT r = StringCchCatW(buf, BUF_LEN, L"Hello ");

The StringCchCatW function adds the L"Hello "
string to the buf array.

r = StringCchCatW(buf, BUF_LEN, L"there");

Later, the second string is added to the buffer.

C:\Users\Jano\Documents\WinApi\strsafe\SafeConcat&gt;SafeConcat.exe
Hello there

### Formatting strings

The StringCchPrintfW function writes formatted
data to the destination buffer.

HRESULT StringCchPrintfW(LPWSTR pszDest, size_t cchDest, LPCWSTR pszFormat, ...);

The first parameter is the destination buffer, which receives the formatted
string created from pszFormat and its arguments. The second
parameter is the destination buffer, in characters. The third parameter is the
format string. The following arguments are inserted into the
pszFormat string.

safe_format.c
  

#include &lt;windows.h&gt;
#include &lt;strsafe.h&gt;
#include &lt;wchar.h&gt;

#define BUF_LEN 256

int wmain(void) {

    wchar_t *word = L"table";
    int count = 6;

    wchar_t buf[BUF_LEN] = {0};
    wchar_t *line = L"There are %d %lss";

    HRESULT r = StringCchPrintfW(buf, ARRAYSIZE(buf), line, count, word);

    if (SUCCEEDED(r)) {

        wprintf(L"%ls\n", buf);

    } else {

        wprintf(L"StringCchPrintfW() failed\n");
        return 1;
    }

    return 0;
}

In the code example, we create a formatted string with the
StringCchPrintfW function.

wchar_t *line = L"There are %d %lss";

This is the format string; it has two format specifiers: %d
and %ls.

HRESULT r = StringCchPrintfW(buf, ARRAYSIZE(buf), line, count, word);

With the StringCchPrintfW function, we insert two values into
the destination buffer.

C:\Users\Jano\Documents\WinApi\strsafe\SafeFormat&gt;SafeFormat.exe
There are 6 tables

In this part of the Windows API tutorial, we have worked with strings.

[Contents](..)
[Previous](../system/)
[Next](../datetime/)