+++
title = "Date & time in Windows API"
date = 2025-08-29T19:57:37.157+01:00
draft = false
description = "In this part of the Winapi tutorial, we will work date & time."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../strings/)
[Next](../window/)

# Date &amp; time in Windows API

last modified October 18, 2023

In this part of the Windows API tutorial, we work with date and time. 
ZetCode has an [article](http://zetcode.com/articles/cdatetime/) 
dealing with date and time in ANSI C.

The SYSTEMTIME structure is used to work with date and time
in Windows API. The time can be either coordinated universal time (UTC) 
or local time. It has the following members:

WORD wYear;
WORD wMonth;
WORD wDayOfWeek;
WORD wDay;
WORD wHour;
WORD wMinute;
WORD wSecond;
WORD wMilliseconds;

The SYSTEMTIME structure is filled either with the 
GetSystemTime function or the GetLocalTime 
function. We can then access the members of the structure to get the current
date or time.

The FILETIME structure contains a 64-bit value representing the 
number of 100-nanosecond intervals since January 1, 1601 (UTC). With this value 
we are able to compute the Windows API epoch or the datetime differences.

DWORD dwLowDateTime;
DWORD dwHighDateTime;

The FILETIME structure has two members: the dwLowDateTime 
is the low-order part of the file time and the dwHighDateTime is the 
high-order part of the file time. To get a single value from the two members, we 
utilise the LARGE_INTEGER union.

The FileTimeToSystemTime and the 
SystemTimeToFileTime functions are used to convert between the
two structures.

## Local time

Local time is defined as the current time in the user's time zone.

localtime.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    SYSTEMTIME lt = {0};
  
    GetLocalTime(&amp;lt);
  
    wprintf(L"The local time is: %02d:%02d:%02d\n", 
        lt.wHour, lt.wMinute, lt.wSecond);

    return 0;
}

The program prints the local time. 

SYSTEMTIME lt = {0};

We declare the SYSTEMTIME structure. The members of this structure
are filled by calling a specific time function.

GetLocalTime(&amp;lt);

The GetLocalTime retrieves the current local date and time.
It fills the members of the SYSTEMTIME structure with current 
date &amp; time values. 

wprintf(L"The local time is: %02d:%02d:%02d\n", 
  lt.wHour, lt.wMinute, lt.wSecond);

We print the current local time in the hh:mm:ss format. 

C:\Users\Jano\Documents\Pelles C Projects\timedate\LocalTime&gt;LocalTime.exe
The local time is: 20:20:07

This is the sample output.

## UTC time

Our planet is a sphere. It revolves round its axis. The Earth rotates towards 
the east. So the Sun rises at different times in different locations. The Earth 
rotates once in about 24 hours. Therefore, the world was divided into 24 time 
zones. In each time zone, there is a different local time. This local time is 
often further modified by the daylight saving. 

There is a pragmatic need for one global time. One global time helps to avoid 
confusion about time zones and daylight saving time. The UTC 
(Universal Coordinated time) was chosen to be the primary time standard. 
UTC is used in aviation, weather forecasts, flight plans, air traffic control 
clearances, and maps. Unlike local time, UTC does not change with a change of 
seasons.

The Windows API has the GetSystemTime function to get the 
UTC time. 

utctime.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    SYSTEMTIME st = {0};
  
    GetSystemTime(&amp;st);
  
    wprintf(L"The UTC time is: %02d:%02d:%02d\n", 
        st.wHour, st.wMinute, st.wSecond);

    return 0;
}

In the example we compute the UTC time.

SYSTEMTIME st = {0};

The UTC time will be stored in the SYSTEMTIME structure.

GetSystemTime(&amp;st);

We retrieve the UTC time using the GetSystemTime function.

wprintf(L"The UTC time is: %02d:%02d:%02d\n", 
  st.wHour, st.wMinute, st.wSecond);

The UTC time is printed to the console in the hh:mm:ss format.

C:\Users\Jano\Documents\Pelles C Projects\timedate\UtcTime&gt;UtcTime.exe
The UTC time is: 19:25:20

This is the output for the UTC time.

## Arithmetic

It is not recommended to do arithmetic operations on values 
from the SYSTEMTIME structure to obtain relative times. 
Instead, we convert the SYSTEMTIME structure to a 
FILETIME structure, copy the resulting FILETIME 
structure to a ULARGE_INTEGER structure, and use normal 
64-bit arithmetic on the ULARGE_INTEGER value.
In the end, we convert the FILETIME structure back
to SYSTEMTIME structure.

arithmetic.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define NSECS 60*60*3

int wmain(void) {

    SYSTEMTIME st = {0};
    FILETIME ft = {0};

    GetLocalTime(&amp;st);

    wprintf(L"%02d/%02d/%04d %02d:%02d:%02d\n",
        st.wDay, st.wMonth, st.wYear, st.wHour, st.wMinute, st.wSecond);

    SystemTimeToFileTime(&amp;st, &amp;ft);

    ULARGE_INTEGER u = {0};
     
    memcpy(&amp;u, &amp;ft, sizeof(u));
    u.QuadPart += NSECS * 10000000LLU;
    memcpy(&amp;ft, &amp;u, sizeof(ft));

    FileTimeToSystemTime(&amp;ft, &amp;st);

    wprintf(L"%02d/%02d/%04d %02d:%02d:%02d\n",
        st.wDay, st.wMonth, st.wYear, st.wHour, st.wMinute, st.wSecond);

    return 0;
}

In the example we add three hours to the current local time value.

#define NSECS 60*60*3

The three hours are expressed in seconds. 

GetLocalTime(&amp;st);

With the GetLocalTime function, we retrieve
the current local time.

SystemTimeToFileTime(&amp;st, &amp;ft);

We call the SystemTimeToFileTime function 
to convert the SYSTEMTIME structure to the 
FILETIME structure.

ULARGE_INTEGER u = {0};

The ULARGE_INTEGER structure is created.

memcpy(&amp;u, &amp;ft, sizeof(u));
u.QuadPart += NSECS * 10000000LLU;
memcpy(&amp;ft, &amp;u, sizeof(ft));

We add three hours to the QuadPart member of the
ULARGE_INTEGER structure. The member is expressed
in 100-nanosecond ticks; therefore, we multiply the NSECS
by 10000000LLU. 

FileTimeToSystemTime(&amp;ft, &amp;st);

We translate the FILETIME structure back to the
SYSTEMTIME structure.

C:\Users\Jano\Documents\Pelles C Projects\timedate\Arithmetic&gt;Arithmetic.exe
01/02/2016 13:28:13
01/02/2016 16:28:13

This is a sample output of the Arithmetic.exe. Three hours
were correctly added to the current local time.

## Date

The GetLocalTime function is also used to determine the
current date.  

today.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    SYSTEMTIME st = {0};
  
    GetLocalTime(&amp;st);
  
    wprintf(L"Today is: %d-%02d-%02d\n", st.wYear, st.wMonth, st.wDay);

    return 0;
}

The above program prints today's date.

SYSTEMTIME st = {0};

We declare a SYSTEMTIME structure. 

GetLocalTime(&amp;st);

We fill the SYSTEMTIME members with current local time and date
values.

wprintf(L"Today is: %d-%02d-%02d\n", st.wYear, st.wMonth, st.wDay);

The current date is printed to the console. We have chosen the Gregorian
big-endian date format.

C:\Users\Jano\Documents\Pelles C Projects\timedate\Today&gt;Today.exe
Today is: 2016-01-30

This is the output of the Today.exe program.

## Formatting date

The GetDateFormatEx function formats a date as a 
date string for the specified locale.

date_format.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    PDWORD cChars = NULL;
    HANDLE std = GetStdHandle(STD_OUTPUT_HANDLE);   
    
    if (std == INVALID_HANDLE_VALUE) {
        wprintf(L"Cannot retrieve standard output handle %d\n", 
            GetLastError());
        return 1;
    }
 
    SYSTEMTIME lt = {0};
    GetLocalTime(&amp;lt);
     
    wchar_t buf[128] = {0};
     
    int r = GetDateFormatEx(LOCALE_NAME_USER_DEFAULT, DATE_LONGDATE, 
                &amp;lt, NULL, buf, sizeof(buf)/sizeof(buf[0]), NULL);

    if (r == 0) {
    
        wprintf(L"GetDateFormatEx function failed %d\n", 
            GetLastError());
            
        CloseHandle(std);
        
        return 1;
    }

    WriteConsoleW(std, buf, wcslen(buf), cChars, NULL);
    
    r = CloseHandle(std);

    if (r == 0) {
    
        wprintf(L"Cannot close console handle %d\n", 
            GetLastError());
        return 1;    
    }
    
    CloseHandle(std);

    return 0;
}

The program prints the current local time in a localized 
format. 

SYSTEMTIME lt = {0};
GetLocalTime(&amp;lt);

The local time is retrieved.

int r = GetDateFormatEx(LOCALE_NAME_USER_DEFAULT, DATE_LONGDATE, 
			&amp;lt, NULL, buf, sizeof(buf)/sizeof(buf[0]), NULL);

The GetDateFormatEx formats the date in the default 
locale specified in the regional and language options. The date
is printed in a long date format.

WriteConsoleW(std, buf, wcslen(buf), cChars, NULL);

The date is printed to the console.

C:\Users\Jano\Documents\Pelles C Projects\timedate\DateFormat&gt;DateFormat.exe
1. februára 2016

The program prints the date in the Slovak language. 

## Determining a leap year

A *leap year* is a year containing an additional day. The reason for an 
extra day in the calendar is the difference between the astronomical and the 
calendar year. The calendar year has exactly 365 days, while the astronomical 
year, the time for the earth to make one revolution around the Sun, is 365.25 
days. The difference is 6 hours which means that in four years time we are 
missing one day. Because we want to have our calendar synchronised with the 
seasons, we add one day to February each four years. (There are exceptions.) 
In the Gregorian calendar, February in a leap year has 29 days instead of the 
usual 28. And the year lasts 366 days instead of the usual 365.

leapyear.c
  

#include &lt;windows.h&gt;
#include &lt;stdbool.h&gt;
#include &lt;wchar.h&gt;

bool isLeapYear(int);

int wmain(void) {

    // Assume year &gt;= 1582 in the Gregorian calendar.
    int years[] = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
        1900, 1800, 1600 };
  
    int size = sizeof(years) / sizeof(int);

    for (int i=0; i&lt;size; i++) {

        if (isLeapYear(years[i])) {

            wprintf(L"%ld is a leap year\n", years[i]);
        } else {

            wprintf(L"%ld is not a leap year\n", years[i]);
        }
    }

    return 0;
}

bool isLeapYear(int year) {

    if (year % 4 != 0) {
        
        return false;
    } else if (year % 400 == 0) {
        
        return true;
    } else if (year % 100 == 0) {
        
        return false;
    } else {
        
        return true;
    }
}

We have an array of years. We check all years if they are leap years or
not. There is no built-in function to check for a leap year. We have
created a custom isLeapYear function. 

// Assume year &gt;= 1582 in the Gregorian calendar.
int years[] = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 };

This is an array of years that we check. The years must be in the Gregorian
calendar. 

for (int i=0; i&lt;size; i++) {

    if (isLeapYear(years[i])) {

        wprintf(L"%ld is a leap year\n", years[i]);
    } else {

        wprintf(L"%ld is not a leap year\n", years[i]);
    }
}

With the for loop we traverse the array. We check if a year is a leap 
year using the isLeapYear function.

bool isLeapYear(int year) {

    if (year % 4 != 0) {
        
        return false;
    } else if (year % 400 == 0) {
        
        return true;
    } else if (year % 100 == 0) {
        
        return false;
    } else {
        
        return true;
    }
}

This is the function for determining a leap year. Leap years are integer 
multiples of 4. A year that is an integer multiple of 100 is not a leap year, 
unless it is also an integer multiple of 400, in which case it is also a leap
year.

C:\Users\Jano\Documents\Pelles C Projects\timedate\LeapYear&gt;LeapYear.exe
2000 is a leap year
2002 is not a leap year
2004 is a leap year
2008 is a leap year
2012 is a leap year
2016 is a leap year
2020 is a leap year
1900 is not a leap year
1800 is not a leap year
1600 is a leap year

Output of the LeapYear.exe program.

## Uptime

The GetTickCount function can be used to get the uptime of a
computer. It retrieves the number of milliseconds that have elapsed since 
the system has started. 

DWORD WINAPI GetTickCount(void);

The function returns a DWORD value, so the maximum number of days returned is 
49.7. To get over this limitation, we can use the GetTickCount64. 
The function is available since Windows Vista.

uptime.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {  

    DWORD tc = GetTickCount();

    short seconds = tc / 1000 % 60; 
    short minutes = tc / 1000 / 60 % 60; 
    short hours = tc / 1000 / 60 / 60 % 24; 
    short days = tc / 1000 / 60 / 60 / 24 % 7;  
    short weeks = tc / 1000 / 60 / 60 / 24 / 7 % 52; 

    wprintf(L"Computer has been running for: ");
                    
    if (weeks &gt; 0 &amp;&amp; weeks != 1) {

        wprintf(L"%hi weeks ", weeks);
    } else if (weeks == 1) {

        wprintf(L"1 week ");
    }

    if (days &gt; 0 &amp;&amp; days != 1) {

        wprintf(L"%hi days ", days);
    } else if (days == 1) {

        wprintf(L"1 day ");
    }

    if (hours &gt; 0 &amp;&amp; hours != 1) {

        wprintf(L"%hi hours ", hours);
    } else if (hours == 1) {

        wprintf(L"1 hour ");
    }

    if (minutes &gt; 0 &amp;&amp; minutes != 1) {

        wprintf(L"%hi minutes ", minutes); 
    } else if (minutes == 1) {

        wprintf(L"1 minute ");
    }

    wprintf(L"and %hi seconds\n", seconds);

    return 0;
}

The program prints the uptime of a computer. We use the 
GetTickCount function. It works correctly if the
computer is running less than 49.71 days or 4294967296 ms. After that the
DWORD value overflows. 

DWORD tc = GetTickCount();

We get the number of milliseconds the computer is running. The maximum
number a DWORD variable can store is ULONG_MAX.

short seconds = tc / 1000 % 60; 
short minutes = tc / 1000 / 60 % 60; 
short hours = tc / 1000 / 60 / 60 % 24; 
short days = tc / 1000 / 60 / 60 / 24 % 7;  
short weeks = tc / 1000 / 60 / 60 / 24 / 7 % 52; 

We compute the seconds, minutes, hours, days, and weeks. 

if (weeks &gt; 0 &amp;&amp; weeks != 1) {

  wprintf(L"%hi weeks ", weeks);
} else if (weeks == 1) {

  wprintf(L"1 week ");
}

If the computer is running one or more weeks, we either print the weeks variable
or "1 week" string to the console. 

C:\winapi\examples2\datetime\Uptime&gt;Uptime.exe
Computer has been running for: 3 hours 31 minutes and 7 seconds

Sample output.

## Day of week

The wDayOfWeek member of the SYSTEMTIME structure
stores the day of the week. The values are 1..7 where 1 is Sunday, 2 Monday,...
7 Saturday.

dayofweek.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    SYSTEMTIME st = {0};

    wchar_t *dn[] = { L"Sunday", L"Monday", L"Tuesday", 
        L"Wednesday", L"Thursday", L"Friday", L"Saturday" };

    GetLocalTime(&amp;st);
    wprintf(L"Today is %ls\n", dn[st.wDayOfWeek]);

    return 0;
}

The code prints the current day of the week to the console. 

wchar_t *dn[] = { L"Sunday", L"Monday", L"Tuesday", 
  L"Wednesday", L"Thursday", L"Friday", L"Saturday" };

We store the names of the days in a string array.

GetLocalTime(&amp;st);
wprintf(L"Today is %ls\n", dn[st.wDayOfWeek]);

These lines retrieve and print the current day of the week.

C:\Users\Jano\Documents\Pelles C Projects\timedate\DayOfWeek&gt;DayOfWeek.exe
Today is Sunday

This is the output.

## The epoch

An epoch is an instant in time chosen as the origin of a particular era. 
For example in western Christian countries the time epoch starts from day 0, 
when Jesus was born (is believed to be born). Another example is the French 
Republican Calendar which was used for twelve years. The epoch was the beginning 
of the Republican Era which was proclaimed on September 22, 1792, the day the 
First Republic was declared and the monarchy abolished. Computers have their 
epochs too. One of the most popular is the Unix time. The Unix epoch is the 
time 00:00:00 UTC on 1 January 1970 (or 1970-01-01T00:00:00Z ISO 8601). The date 
and time in a computer is determined according to the number of seconds or clock 
ticks that have elapsed since the defined epoch for that computer or platform.

Windows operating system has several epochs. Microsoft Excel, MS SQL Server
or FAT32 filesystem have different time epochs. The Windows API epoch is
January 1, 1601, 00:00:00 UTC. The reason for choosing this date was the 400th
anniversary of accepting of the Gregorian calendar. The anniversary fall at 
the time when Windows NT was designed. The FILETIME structure 
contains a 64-bit value representing the number of 100-nanosecond intervals 
since January 1, 1601 (UTC).

windows_epoch.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    FILETIME ft = {0};
  
    GetSystemTimeAsFileTime(&amp;ft);

    LARGE_INTEGER li = {0};    

    li.LowPart = ft.dwLowDateTime;
    li.HighPart = ft.dwHighDateTime;

    long long int hns = li.QuadPart;
    
    wprintf(L"%lli hundreds of nanoseconds have elapsed " 
        "since Windows API epoch\n", hns);

    return 0;
}

The code example computes the number of 100-nanosecond intervals elapsed from
the Windows API epoch till this moment. 

FILETIME ft = {0};

We declare the FILETIME structure. It has two members. The 
dwLowDateTime holds the low-order part of the file time. The 
dwHighDateTime holds the high-order part of the file time.

LARGE_INTEGER li = {0};

The LARGE_INTEGER is a union which helps us to convert the 
members of the FILETIME structure to 100-nanosecond intervals.

li.LowPart = ft.dwLowDateTime;
li.HighPart = ft.dwHighDateTime;

The values of the FILETIME structure are copied to the large
integer union members.

long long int hns = li.QuadPart;

The QuadPart member stores the number of hundreds of nanoseconds
determined from the LowPart and HighPart members.
It is a huge number stored as a 64-bit integer. 

wprintf(L"%lli hundreds of nanoseconds have elapsed " 
  "since Windows API epoch\n", hns);

The value is printed to the console. 

C:\Users\Jano\Documents\Pelles C Projects\timedate\WindowsEpoch&gt;WindowsEpoch.exe
130987330019489987 hundreds of nanoseconds have elapsed since Windows API epoch

This is the sample output.

The following example converts the Windows API time into Unix time.

unix_time.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

#define WINDOWS_TICKS_PER_SEC 10000000
#define EPOCH_DIFFERENCE 11644473600LL

long long WindowsTicksToUnixSeconds(long long);

int wmain(void) {

    FILETIME ft = {0};
  
    GetSystemTimeAsFileTime(&amp;ft);

    LARGE_INTEGER li = {0};    

    li.LowPart = ft.dwLowDateTime;
    li.HighPart = ft.dwHighDateTime;

    long long int hns = li.QuadPart;
    
    wprintf(L"Windows API time: %lli\n", hns);

    long long int utm = WindowsTicksToUnixSeconds(hns);

    wprintf(L"Unix time: %lli\n", utm);

    return 0;
}

long long int WindowsTicksToUnixSeconds(long long windowsTicks) {

     return (windowsTicks / WINDOWS_TICKS_PER_SEC - EPOCH_DIFFERENCE);
}

The example prints the Windows API time and the Unix time to 
console. 

#define EPOCH_DIFFERENCE 11644473600LL

The difference between the two epochs is 11644473600LL.
Note that leap seconds were introduced in 1972, so we do not take
them into account.

long long int WindowsTicksToUnixSeconds(long long windowsTicks) {

     return (windowsTicks / WINDOWS_TICKS_PER_SEC - EPOCH_DIFFERENCE);
}

The function translates windows ticks into unix time seconds.

C:\Users\Jano\Documents\Pelles C Projects\timedate\UnixTime&gt;UnixTime.exe
Windows API time: 130987431026414297
Unix time: 1454269502

This is the output of the UnixTime.exe example.

## Days until XMas

The Windows API does not have any functions to calcuate the difference between
two days. We have to do the math ourselves. 

days_to_xmas.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    FILETIME ft1 = {0};
    FILETIME ft2 = {0};
    SYSTEMTIME st = {0};  
    LARGE_INTEGER li1 = {0};    
    LARGE_INTEGER li2 = {0}; 

    st.wYear = 2016;
    st.wMonth = 12;
    st.wDay = 25;
 
    int r = SystemTimeToFileTime(&amp;st, &amp;ft1);

    if (r == 0) {

        wprintf(L"Failed to convert system time to file time\n (%d)", 
            GetLastError());
        return 1;
    }
  
    GetSystemTimeAsFileTime(&amp;ft2);
   
    li1.LowPart = ft1.dwLowDateTime;
    li1.HighPart = ft1.dwHighDateTime;
 
    li2.LowPart = ft2.dwLowDateTime;
    li2.HighPart = ft2.dwHighDateTime;

    long long int dif = li1.QuadPart - li2.QuadPart;

    int days2xmas = dif / 10000000L / 60 / 60 / 24;

    if (days2xmas == 1) {

        wprintf(L"There is one day until Christmas\n", days2xmas);
    } else if (days2xmas == 0) {

        wprintf(L"Today is Chritmas\n");
    } else {

        wprintf(L"There are %d days until Christmas\n", days2xmas);
    }
  
    return 0;
}

The code example computes the number of days until the Christmas. 

FILETIME ft1 = {0};
FILETIME ft2 = {0};
SYSTEMTIME st = {0};  
LARGE_INTEGER li1 = {0};    
LARGE_INTEGER li2 = {0}; 

We need FILETIME, SYSTEMTIME structures and 
LARGE_INTEGER unions to do our computations.

st.wYear = 2016;
st.wMonth = 12;
st.wDay = 25;

The SYSTEMTIME structure is filled with the values for the 
Christmas day.

int r = SystemTimeToFileTime(&amp;st, &amp;ft1);

The system time for the Christmas day is converted to file time. 

GetSystemTimeAsFileTime(&amp;ft2);

We get the current date as a file time using the 
GetSystemTimeAsFileTime function.

li1.LowPart = ft1.dwLowDateTime;
li1.HighPart = ft1.dwHighDateTime;

li2.LowPart = ft2.dwLowDateTime;
li2.HighPart = ft2.dwHighDateTime;

We fill the two unions with the low-order and high-order parts of the file time.

long long int dif = li1.QuadPart - li2.QuadPart;

The difference between the two dates is computed. 

int days2xmas = dif / 10000000L / 60 / 60 / 24;

The difference is expressed in 100-nanoseconds. This value is converted to 
days. 

C:\Users\Jano\Documents\Pelles C Projects\timedate\DaysToXmas&gt;DaysToXmas.exe
There are 328 days until Christmas

On January 31, 2016 we get this output.

## Comparing times

The CompareFileTime function can be used to compare two file
times. The function returns -1 when the first time specified is earlier.
It returns 0, when the two times are equal. And it returns 1 when the first
time is later than the second file time.

compare_time.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    SYSTEMTIME st1 = {0};
    SYSTEMTIME st2 = {0};
    FILETIME ft1 = {0};
    FILETIME ft2 = {0};

    st1.wYear = 2015;
    st1.wMonth = 4;
    st1.wDay = 12;

    st2.wYear = 2015;
    st2.wMonth = 5;
    st2.wDay = 12;

    int r1 = SystemTimeToFileTime(&amp;st1, &amp;ft1);

    if (r1 == 0) {

        wprintf(L"Failed to convert system time to file time\n (%d)", 
            GetLastError());
        return 1;
    }
  
    int r2 = SystemTimeToFileTime(&amp;st2, &amp;ft2);

    if (r2 == 0) {

        wprintf(L"Failed to convert system time to file time\n (%d)", 
            GetLastError());
        return 1;
    }
    
    short ct = CompareFileTime(&amp;ft1, &amp;ft2);

    if (ct == -1) {

        wprintf(L"4/12/2015 comes before 5/12/2015\n");
    } else if (ct == 0) {

        wprintf(L"4/12/2015 is equal to 5/12/2015\n");
    } else if (ct == 1) {

        wprintf(L"4/12/2015 comes after 5/12/2015\n");
    }

    return 0;
}

We have two time values. We use the CompareFileTime to figure out
which time is earlier.

st1.wYear = 2015;
st1.wMonth = 4;
st1.wDay = 12;

st2.wYear = 2015;
st2.wMonth = 5;
st2.wDay = 12;

The two times are defined.

int r1 = SystemTimeToFileTime(&amp;st1, &amp;ft1);

if (r1 == 0) {

	wprintf(L"Failed to convert system time to file time\n (%d)", 
		GetLastError());
	return 1;
}

int r2 = SystemTimeToFileTime(&amp;st2, &amp;ft2);

if (r2 == 0) {

	wprintf(L"Failed to convert system time to file time\n (%d)", 
		GetLastError());
	return 1;
}

The system times are converted to file times using the 
SystemTimeToFileTime function calls.

short ct = CompareFileTime(&amp;ft1, &amp;ft2);

The two file times are compared with the CompareFileTime 
function.

if (ct == -1) {

	wprintf(L"4/12/2015 comes before 5/12/2015\n");
} else if (ct == 0) {

	wprintf(L"4/12/2015 is equal to 5/12/2015\n");
} else if (ct == 1) {

	wprintf(L"4/12/2015 comes after 5/12/2015\n");
}

Depending on the returned value, we print a message to the
console.

C:\Users\Jano\Documents\Pelles C Projects\timedate\CompareTime&gt;CompareTime.exe
4/12/2015 comes before 5/12/2015

This is the output of the CompareTime.exe program.

## Time zones

A *time zone* is a region throughout which the same standard time 
is used. There are 24 time zones in the world. 

UTC = local time + bias

The bias is the  difference, in minutes, between UTC time and local time. 

### Retrieving time zone

The GetTimeZoneInformation is used to get time zone information.
The information is stored in the TIME_ZONE_INFORMATION structure.

get_time_zone.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) {

    TIME_ZONE_INFORMATION tzi = {0};
    
    int r = GetTimeZoneInformation(&amp;tzi);

    if (r == TIME_ZONE_ID_INVALID) {

        wprintf(L"Failed to get time zone %d", GetLastError());
        return 1;
    }

    wprintf(L"Time zone: %ls\n", tzi.StandardName);
    wprintf(L"The bias is: %ld minutes\n", tzi.Bias);

    return 0;
}

The example prints the user's time zone.

TIME_ZONE_INFORMATION tzi = {0};

The TIME_ZONE_INFORMATION structure stores settings for
a time zone.

int r = GetTimeZoneInformation(&amp;tzi);

The GetTimeZoneInformation function retrieves the
current time zone settings. 

wprintf(L"Time zone: %ls\n", tzi.StandardName);

The StandardName member of the TIME_ZONE_INFORMATION 
structure stores the name of our time zone. 

wprintf(L"The bias is: %ld minutes\n", tzi.Bias);

We print the bias value.

C:\Users\Jano\Documents\Pelles C Projects\timedate\GetTimeZone&gt;GetTimeZone.exe
Time zone: Central Europe Standard Time
The bias is: -60 minutes

Our time zone is Central Europe Standard Time (CEST) and the bias is -60 minutes.

### Converting local time to universal time

The TzSpecificLocalTimeToSystemTime function converts local time 
to UTC time. The function takes into account whether daylight saving time (DST)
is in effect for the local time to be converted.

localtime_to_universaltime.c
  

#include &lt;windows.h&gt;
#include &lt;wchar.h&gt;

int wmain(void) { 

    SYSTEMTIME lt = {0};
    GetLocalTime(&amp;lt);

    TIME_ZONE_INFORMATION tzi = {0};
    GetTimeZoneInformation(&amp;tzi);

    SYSTEMTIME utm = {0};

    int r = TzSpecificLocalTimeToSystemTime(&amp;tzi, &amp;lt, &amp;utm);
    
    if (r == 0) {

        wprintf(L"Failed to convert local time to system time %d\n)", 
            GetLastError());
        return 1;
    }

    wprintf(L"Date: %d/%d/%d\n", lt.wMonth, lt.wDay, lt.wYear);

    wprintf(L"The local time is: %02d:%02d:%02d\n", 
        lt.wHour, lt.wMinute, lt.wSecond);

    wprintf(L"The universal time is: %02d:%02d:%02d\n", 
        utm.wHour, utm.wMinute, utm.wSecond);

    return 0;
}

The example converts the local time into the universal time.

SYSTEMTIME lt = {0};
GetLocalTime(&amp;lt);

The current local time is retrieved with the GetLocalTime function.

TIME_ZONE_INFORMATION tzi = {0};
GetTimeZoneInformation(&amp;tzi);

The time zone settings are determined with the GetTimeZoneInformation
function.

int r = TzSpecificLocalTimeToSystemTime(&amp;tzi, &amp;lt, &amp;utm);

The TzSpecificLocalTimeToSystemTime translates local time
into universal time, taking daylight saving into account.

wprintf(L"The local time is: %02d:%02d:%02d\n", 
	lt.wHour, lt.wMinute, lt.wSecond);

The local time is printed to console.

wprintf(L"The universal time is: %02d:%02d:%02d\n", 
	utm.wHour, utm.wMinute, utm.wSecond);

The universal time is printed to console.

C:\Users\Jano\Documents\Pelles C Projects\timedate\LocalTimeToUniversalTime&gt;LocalTimeToUniversalTime.exe
Date: 2/1/2016
The local time is: 11:39:48
The universal time is: 10:39:48

In the CEST time zone, on February 1, 2016, we get the above output.

                                                          

In this part of the Windows API tutorial, we have worked with date &amp; time.

[Contents](..)
[Previous](../strings/)
[Next](../window/)