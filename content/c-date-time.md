+++
title = "C Date Time"
date = 2025-08-29T19:48:30.738+01:00
draft = false
description = "C Date Time tutorial shows how to work with date and time in C. This tutorial uses C99."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C Date Time

last modified January 18, 2023

In this tutorial, we show how to work with date and time in C. In the tutorial,
we use C99. If you are compiling programs on Windows, we highly recommend Pelles
C compiler. Windows API tutorial has a chapter dedicated to [date and time](/gui/winapi/datetime/).

## C date time definitions

We start with a few definitions. A *calendar time*, also called an
absolute time, is a point in the time continuum, for example February 17, 2016
at 13:02:5 CET. A *time interval* is a continuous part of the time
continuum between two calendar times, for example the hour between 13:00 and
14:00 on February 20, 2000. An *elapsed time* is the length of an
interval, for example, 28 minutes.

An *amount of time* is a sum of elapsed times. The elapsed times do not
need to be successive. When the work took us eleven hours, we might be working
on different days. A *period* is the elapsed time of an interval between
two events. *CPU time* is the amount of time for which a central
processing unit (CPU) was used for processing instructions of a computer program
or operating system. It is measured in clock ticks or seconds. 

An *epoch* is an instant in time chosen as the origin of a particular
era. The *Unix epoch* is the time 00:00:00 UTC on 1 January 1970 (or
1970-01-01T00:00:00Z ISO 8601).

*Simple time* is a compact representation of a calendar time; it is the
number of seconds of elapsed time since Unix epoch. Simple time uses the
time_t data type. *Broken-down time* represents a
human-readable calendar time. It is divided into a set of components specifying
the year, month, day, and so on in the Gregorian calendar, for a specific time
zone. The broken-down time uses the *struct tm* data type.

*Wall time*, also called real-world time or wall-clock time, refers to
elapsed time as determined by a chronometer such as a wristwatch or wall clock.
(The reference to a wall clock is how the term originally got its name.) Wall
time differs from time as measured by counting microprocessor clock pulses or
cycles.

The time.h contains the following function prototypes:

- char *asctime(const struct tm *) — converts date and time to a string (obsolete)

- clock_t clock(void) — returns an approximation of the CPU time used by a process

- int clock_getres(clockid_t, struct timespec *) — returns the resolution of a clock

- int clock_gettime(clockid_t, struct timespec *) — retrieves the current time of the clock

- int clock_settime(clockid_t, const struct timespec *) — sets the current time of a clock specified

- char *ctime(const time_t *) — converts a time value to date and time string (obsolete)

- double difftime(time_t, time_t) — computes the difference between two calendar time values

- struct tm *getdate(const char *) — converts a string representation of a date or time into a broken-down time

- struct tm *gmtime(const time_t *) — converts a time value to a broken-down UTC time

- struct tm *localtime(const time_t *) — converts a time value to a broken-down local time

- time_t mktime(struct tm *) — converts a broken-down time into Unix time

- size_t strftime(char *, size_t, const char *, const struct tm *) — convert date and time to a string

- char *strptime(const char *, const char *, struct tm *) — converts a time string to a broken-down time

- time_t time(time_t *) — returns the Unix time, the number of seconds since the Unix epoch

- void tzset(void) — sets time zone conversion information

In addition, the time.h file defines the
CLOCKS_PER_SEC macro, which holds the number of processor clock
ticks per second. The clock_t is the process running time type.

## Unix time

The Unix time is the number of seconds since the Unix epoch. The
time function returns the value of time in seconds since 0 hours, 0
minutes, 0 seconds, January 1, 1970, Coordinated Universal Time. If an error
occurs, it returns -1.

time_t time(time_t *t);

If t is not NULL, the return value is also stored in
the memory pointed to by t.

unixtime.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    time_t now = time(NULL);

    if (now == -1) {

        puts("The time() function failed");
    }

    printf("%ld\n", now);

    return 0;
}

The example prints the Unix time.

$ ./unixtime
1674029496

At this moment, 1674029496 have passed since Unix epoch.

## Broken-down time

Broken-down time is a human-readable version of the calendar time.
The struct tm data type is used for broken-down time.
The localtime functions converts a simple calendar time
into a broken-down time. It takes the current timezone into account.

struct tm *localtime(const time_t *clock);

It stores a tm structure and returns a pointer to
that structure.

The following description of the struct tm was taken
from FreeBSD manual.

struct tm {
    int tm_sec;         /* seconds */
    int tm_min;         /* minutes */
    int tm_hour;        /* hours */
    int tm_mday;        /* day of the month */
    int tm_mon;         /* month */
    int tm_year;        /* year */
    int tm_wday;        /* day of the week */
    int tm_yday;        /* day in the year */
    int tm_isdst;       /* daylight saving time */
};

The members of the tm structure are:

tm_sec —  the number of seconds after the minute, normally in the range
            0 to 59, but can be up to 60 to allow for leap seconds.

- tm_min — the number of minutes after the hour, in the range 0 to 59.

- tm_hour — the number of hours past midnight, in the range 0 to 23.

- tm_mday — the day of the month, in the range 1 to 31.

- tm_mon — the number of months since January, in the range 0 to 11.

- tm_year — the number of years since 1900.

- tm_wday — the number of days since Sunday, in the range 0 to 6.

- tm_yday — the number of days since January 1, in the range 0 to 365.

tm_isdst — a flag that indicates whether daylight saving time is in
            effect at the time described. The value is positive if daylight saving time
            is in effect, zero if it is not, and negative if the information is not available.

brokendowntime.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    time_t rawtime = time(NULL);

    if (rawtime == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;rawtime);

    if (ptm == NULL) {

        puts("The localtime() function failed");
        return 1;
    }

    printf("The time is: %02d:%02d:%02d\n", ptm-&gt;tm_hour,
           ptm-&gt;tm_min, ptm-&gt;tm_sec);

    return 0;
}

In the example, we get the Unix time and convert it into the
local broken-down time.

time_t rawtime = time(NULL);

We get the raw Unix time.

struct tm *ptm = localtime(&amp;rawtime);

The raw time, expressed in seconds, is converted into the brokend-down
time. The functions fills a struct tm type and returns
a pointer to it. The structure is statically allocated, so we do not
have to free it.

printf("The time is: %02d:%02d:%02d\n", ptm-&gt;tm_hour,
        ptm-&gt;tm_min, ptm-&gt;tm_sec);

We use the tm_hour, tm_min, and tm_sec
members to express a human-readable time format.

$ ./brokendowntime
The time is: 17:00:12

## Converting broken-down time to Unix time

The mktime function converts the broken-down
time, expressed as local time, in the structure pointed to
by tm into the Unix time (simple calendar time).

time_t mktime(struct tm *tm);

The mktime function receives a pointer to the
struct tm value and returns a time_t
value.

xmas.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    struct tm xmas = { 0, 0, 0, 24, 11, 116 };

    time_t rawtime = mktime(&amp;xmas);

    if (rawtime == -1) {

         puts("The mktime() function failed");
         return 1;
    }

    printf("The Unix time for Xmas is: %ld\n", rawtime);

    return 0;
}

In the example, we calculate a Unix time for a specific time in the future.

struct tm xmas = { 0, 0, 0, 24, 11, 116 };

This is a time value for the beginning of a XMas in 2016.

time_t rawtime = mktime(&amp;xmas);

With the mktime function, we convert the broken-down time
into the Unix time.

$ ./xmas
The Unix time for Xmas is: 1482534000

The 1482534000 is the Unix time for the beginning of the
XMas in 2016.

## UTC time

Our planet is a sphere; it revolves round its axis. The Earth rotates towards
the east, so the Sun rises at different times in different locations. The Earth
rotates once in about 24 hours. Therefore, the world was divided into 24 time
zones. In each time zone, there is a different local time. This local time is
often further modified by the daylight saving.

There is a pragmatic need for one global time. One global time helps to avoid
confusion about time zones and daylight saving time. The UTC (Universal
Coordinated time) was chosen to be the primary time standard. UTC is used in
aviation, weather forecasts, flight plans, air traffic control clearances, and
maps. Unlike local time, UTC does not change with a change of seasons.

The gmtime converts the time_t value into the
broken-down time, not adjusting to the timezone.

utctime.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    time_t now = time(&amp;now);

    if (now == -1) {

        puts("The time() function failed");
    }

    struct tm *ptm = gmtime(&amp;now);

    if (ptm == NULL) {

        puts("The gmtime() function failed");
    }

    printf("UTC time: %s", asctime(ptm));

    return 0;
}

The example prints the current UTC time.

struct tm *ptm = gmtime(&amp;now);

We get the UTC time with the gmtime function.

printf("UTC time: %s", asctime(ptm));

We print the UTC time. The asctime function is obsolete,
we should use strftime, which is covered next, instead.

$ ./utctime 
UTC time: Wed Jan 18 08:34:29 2023
$ date
St&nbsp;18.&nbsp;január&nbsp;2023,&nbsp;09:34:31&nbsp;CET

For the CET time zone, there is one hour difference in time.

## Formatting time

The strftime function formats date and time.

size_t strftime(char *s, size_t max, const char *format, const struct tm *tm);

The strftime function formats the broken-down time tm
according to the format specification format and places the result
in the character array s of size max.

  List of date and time format specifiers
  
    Specifier
    Meaning
    Example
  
  
    %%
    The % character.
    %
  
  
    %a
    National abbreviated weekday name
    Mon
  
  
    %A
    National full weekday name
    Monday
  
  
    %b
    National abbreviated month name
    Sep
  
  
    %B
    National full month name
    September
  
  
    %c
    National representation of date and time
    Mon Spe 22 12:50:32 2011
  
  
    %C
    The Century number (00-99)
    19
  
  
    %d
    Day of the month, zero-padded (01-31)
    22
  
  
    %D
    Short MM/DD/YY date, equivalent to %m/%d/%y
    07/30/09
  
  
    %e
    Day of the month, space-padded ( 1-31)
    22
  
  
    %F
    Short YYYY-MM-DD date, equivalent to %Y-%m-%d
    2011-09-22
  
  
    %g
    Week-based year, last two digits (00-99)
    16
  
  
    %G
    Week-based year, with century.
    2016
  
  
    %h
    The same as %b.
    Sep
  
  
    %H
    Hour in 24h format (00-23)
    16
  
  
    %I
    Hour in 12h format (01-12)
    08
  
  
    %j
    Day of the year (001-366)
    145
  
  
    %m
    Month as a decimal number (01-12)
    08
  
  
    %M
    Minute (00-59)
    52
  
  
    %n
    Newline character ('\n')
    
  
  
    %p
    AM or PM designation
    AM
  
  
    %r
    12-hour clock time
    02:55:02 PM
  
  
    %R
    24-hour HH:MM time, equivalent to %H:%M
    12:44
  
  
    %S
    Second (00-61)
    06
  
  
    %s
    Unix time; the number of seconds since the Unix epoch.
    1455803239
  
  
    %t
    Horizontal-tab character ('\t')
    
  
  
    %T
    ISO 8601 time format (HH:MM:SS), equivalent to %H:%M:%S
    18:25:34
  
  
    %u
    ISO 8601 weekday as number with Monday as 1 (1-7)
    6
  
  
    %U
    Week number with the first Sunday as the first day of week one (00-53)
    30
  
  
    %V
    ISO 8601 week number (00-53)
    12
  
  
    %w
    Weekday as a decimal number with Sunday as 0 (0-6)
    5
  
  
    %W
    Week number with the first Monday as the first day of week one (00-53)
    50
  
  
    %x
    National date representation
    05/28/11
  
  
    %X
    National time representation
    12:22:02
  
  
    %y
    Year, last two digits (00-99)
    11
  
  
    %Y
    Year
    2016
  
  
    %z
    The time zone offset from UTC; a leading plus sign stands
     for east of UTC, a minus sign for west of UTC, hours and
     minutes follow with two digits each and no delimiter between
     them. If timezone cannot be determined, no characters.
    +0100
  
  
    %Z 
    Timezone name or abbreviation; if timezone cannot be
    determined, no characters
    CEST
  

The following examples present some of the format specifiers.

today.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;
#include &lt;string.h&gt;

#define BUF_LEN 256

int main(void) {

    char buf[BUF_LEN] = {0};

    time_t rawtime = time(NULL);

    if (rawtime == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;rawtime);

    if (ptm == NULL) {

        puts("The localtime() function failed");
        return 1;
    }

    strftime(buf, BUF_LEN, "%d/%m/%Y", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "%d. %m. %Y", ptm);

    puts(buf);

    return 0;
}

The example prints today's date in a British and Slovak format.

strftime(buf, BUF_LEN, "%d/%m/%Y", ptm);

This code line creates a date string in a British format. We use
the %d, %m, and %Y format specifiers.

strftime(buf, BUF_LEN, "%d. %m. %Y", ptm);

In this line, a Slovak date format is created.

$ ./today
18/01/2023
18. 01. 2023

In the following example, we work with additional format specifiers.

time_formats.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;
#include &lt;string.h&gt;

#define BUF_LEN 256

int main(void) {

    char buf[BUF_LEN] = {0};

    time_t rawtime = time(NULL);

    if (rawtime == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;rawtime);

    if (ptm == NULL) {

        puts("The localtime() function failed");
        return 1;
    }

    strftime(buf, BUF_LEN, "Today is %A", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "The month is %B", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "Today is %-d day of %B", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "Today is %-j day of %G", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "Today is %-W week of %G", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "The time is %T", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "The date is %D", ptm);
    puts(buf);

    memset(buf, 0, BUF_LEN);
    strftime(buf, BUF_LEN, "The timezone is %Z", ptm);
    puts(buf);

    return 0;
}

In the code example, we determine the current time and convert it into
additional information with the strftime
function.

strftime(buf, BUF_LEN, "Today is %A", ptm);

With the %A specifier, we get the full weekday name.

strftime(buf, BUF_LEN, "The month is %B", ptm);

With the %B specifier, we get the full month name.

strftime(buf, BUF_LEN, "Today is %-d day of %B", ptm);

With the %d specifier, we get day of the month. The -
character after % removes the leading zero from the value.

strftime(buf, BUF_LEN, "Today is %-j day of %G", ptm);

The %j specifier gives the day of the year; the %G
specifier gives the year.

strftime(buf, BUF_LEN, "Today is %-W week of %G", ptm);

The %W specifier gives week number of the year.

strftime(buf, BUF_LEN, "The time is %T", ptm);

The %T specifier gives the ISO 8601 time format.

strftime(buf, BUF_LEN, "The date is %D", ptm);

The %D specifier gives the short date format.

strftime(buf, BUF_LEN, "The timezone is %Z", ptm);

Finally, the ZT specifier gives the timezone name.

$ ./time_formats 
Today is Wednesday
The month is January
Today is 18 day of January
Today is 18 day of 2023
Today is 3 week of 2023
The time is 09:36:24
The date is 01/18/23
The timezone is CET

On January 18, 2023 we get these results.

In the following example, we use a localized date format.

localized.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;
#include &lt;locale.h&gt;

#define BUF_LEN 256

int main(void) {

    char buf[BUF_LEN] = {0};

    if (setlocale(LC_TIME, "sk_SK.utf8") == NULL) {

        puts("Unable to set locale");
        return 1;
    }

    time_t now = time(NULL);

    if (now == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;now);

    if (ptm == NULL) {

        puts("The localtime() function failed");
        return 1;
    }

    strftime(buf, BUF_LEN, "%c", ptm);
    printf("Dnešný dátum: %s\n", buf);

    return 0;
}

The example prints today's date in Slovak language.

if (setlocale(LC_TIME, "sk_SK.utf8") == NULL) {

    puts("Unable to set locale");
    return 1;
}

With the setlocale function, we set the Slovak
locale.

strftime(buf, BUF_LEN, "%c", timeinfo);

We use the %c specifier, which is a national
representation of date and time.

$ ./localized 
Dnešný dátum: St 18. január 2023, 09:37:55

On January 18, 2023, we get this Slovak date format in Slovak language.

## Parsing time

The strptime function is used to convert a string
representation of time to the tm structure (broken-down time).
The strptime function is the converse function to the
strftime function.

char *strptime(const char *s, const char *format, struct tm *tm);

The function's first parameter is the time expressed in a string. The second
parameter is the string format. The third parameter is a pointer to the
struct tm. The function returns a pointer to the first character
not processed in this function call. On failure, the function returns
NULL.

parsetime.c
  

#define _XOPEN_SOURCE 700
#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    struct tm tm = {0};

    char *s = strptime("16 Feb 2016 14:43:00", "%d %b %Y %H:%M:%S", &amp;tm);

    if (s == NULL) {

        printf("Cannot parse date");
        return 1;
    }

    printf("year: %d; month: %d; day: %d;\n",
            tm.tm_year + 1900, tm.tm_mon, tm.tm_mday);
    printf("hour: %d; minute: %d; second: %d\n",
            tm.tm_hour, tm.tm_min, tm.tm_sec);
    printf("week day: %d; year day: %d\n", tm.tm_wday, tm.tm_yday);

    return 0;
}

The example parses a string time and fills a struct tm; it
prints the members of the structure then.

#define _XOPEN_SOURCE 700

This definition gets rid of the warning: initialization makes pointer from integer without a cast
warning. It tells your compiler to include definitions for some extra functions that are defined in
the X/Open and POSIX standards.

char *s = strptime("16 Feb 2016 14:43:00", "%d %b %Y %H:%M:%S", &amp;tm);

We parse a date with the strptime function. The format specifiers
must match the string parts.

printf("year: %d; month: %d; day: %d;\n",
        tm.tm_year + 1900, tm.tm_mon, tm.tm_mday);

Here we print the tm_year, tm_mon, and tm_mday
members of the struct tm, which was filled with the strptime.

$ ./parsetime
year: 2016; month: 1; day: 16;
hour: 14; minute: 43; second: 0
week day: 2; year day: 46

This is the output of the parsetime example.

## Time arithmetic

The time_t type is an arithmetic type, we can
do arithmetic operations with it.

The time functions work with dates from 1900. With earlier dates,
we need to refer to Julian day.

time_arithmetic.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

#define BUF_LEN 256

int main(void) {

    char buf[BUF_LEN] = {0};
    struct tm day = { 0, 0, 0, 20, 1, 116 };

    time_t one_day = 86400;
    time_t sixty_days = one_day * 60;

    time_t t1 = mktime(&amp;day);

    if (t1 == -1) {

        puts("The mktime() function failed");
        return 1;
    }

    time_t t2 = t1 + one_day + sixty_days;

    struct tm *ptm = gmtime(&amp;t2);

    if (ptm == NULL) {

        puts("The gmtime() function failed");
    }

    strftime(buf, BUF_LEN, "%F", ptm);
    puts(buf);

    return 0;
}

In the example, we add sixty days to February 20, 2016 and get
the resulting date.

struct tm day = { 0, 0, 0, 20, 1, 116 };

We define the initial date; it is February 20, 2016.

time_t one_day = 86400;
time_t sixty_days = one_day * 60;

This is sixty days expressed in seconds.

time_t t1 = mktime(&amp;day);

The mktime method converts the date into
seconds.

time_t t2 = t1 + one_day + sixty_days;

We go to the end of the day by adding one day in seconds and
then add sixty days.

struct tm *ptm = gmtime(&amp;t2);

We get the broken-down time with the gmtime method.

strftime(buf, BUF_LEN, "%F", ptm);
puts(buf);

We format the date with the strftime method and print
it with the puts method.

$ ./time_arithmetic
2016-04-20

Adding 60 days to February 20, 2016 gives April 20, 2016.

## Julian day

A *Julian day* is the number of days since the beginning of the Julian
Period. It is used primarily by astronomers. (It should not be confused with the
Julian calendar.) The Julian Period started in 4713 BC. The Julian day number 0
is assigned to the day starting at noon on January 1, 4713 BC. 

The Julian Day Number (JDN) is the number of days elapsed since the beginning of
this period. The Julian Date (JD) of any instant is the Julian day number for
the preceding noon plus the fraction of the day since that instant. Apart from
astronomy, Julian dates are often used by military and mainframe programs.

days_since_borodino.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

#define BUF_LEN 256

int getJulianDay(int day, int month, int year);

int main(void) {

    time_t now = time(NULL);

    if (now == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;now);

    if (ptm == NULL) {

        puts("The localtime() function failed");
        return 1;
    }

    int year = ptm-&gt;tm_year + 1900;
    int month = ptm-&gt;tm_mon + 1;
    int day = ptm-&gt;tm_mday;

    int jtoday = getJulianDay(day, month, year);
    int jborodino = getJulianDay(7, 9, 1812);

    int delta = jtoday - jborodino;

    printf("%d days have passed since the Borodino battle\n", delta);

    return 0;
}

int getJulianDay(int day, int month, int year) {

    int a = (14 - month) / 12;
    int y = year + 4800 - a;
    int m = month + 12*a - 3;

    int jdn = 0;

    if (year == 1582)
    {
        if (month == 10)
        {
            if (day &gt; 4 &amp;&amp; day &lt; 15)
                day = 15;
        }
    }

    if ((year &gt; 1582) || (year == 1582 &amp;&amp; month &gt; 10) ||
        (year == 1582 &amp;&amp; month == 10 &amp;&amp; day &gt; 14))
    {
        jdn = day + (153*m+2)/5 + 365*y + y/4 - y/100 + y/400 - 32045;
    }
    else
    {
        jdn = day + (153*m+2)/5 + 365*y + y/4 - 32083;
    }

    return jdn;
}

In the example, we calculate the number of days passed since the Borodino
battle. The Borodino battle started on September 7, 1812.

time_t now = time(NULL);

if (now == -1) {

    puts("The time() function failed");
    return 1;
}

struct tm *ptm = localtime(&amp;now);

if (ptm == NULL) {

    puts("The localtime() function failed");
    return 1;
}

int year = ptm-&gt;tm_year + 1900;
int month = ptm-&gt;tm_mon + 1;
int day = ptm-&gt;tm_mday;

We determine today's year, month, and day.

int jtoday = getJulianDay(day, month, year);
int jborodino = getJulianDay(7, 9, 1812);

We calculate the Julian days for today and for the Borodino battle.

int delta = jtoday - jborodino;

printf("%d days have passed since Borodino battle\n", delta);

We compute the difference in days and print it to the console.

int getJulianDay(int day, int month, int year) {

    int a = (14 - month) / 12;
    int y = year + 4800 - a;
    int m = month + 12*a - 3;

    int jdn = 0;

    if (year == 1582)
    {
        if (month == 10)
        {
            if (day &gt; 4 &amp;&amp; day &lt; 15)
                day = 15;
        }
    }

    if ((year &gt; 1582) || (year == 1582 &amp;&amp; month &gt; 10) ||
        (year == 1582 &amp;&amp; month == 10 &amp;&amp; day &gt; 14))
    {
        jdn = day + (153*m+2)/5 + 365*y + y/4 - y/100 + y/400 - 32045;
    }
    else
    {
        jdn = day + (153*m+2)/5 + 365*y + y/4 - 32083;
    }

    return jdn;
}

The getJulianDay function has the algorithm for calculating the
Julian day. There are two calculations; one for Gregorian era and one for
pre-Gregorian era.

$ ./days_since_borodino
76834 days have passed since the Borodino battle

On January 18, 2023, 76834 days have passed since the Borodino Battle.

## Time zones

A *time zone* is a region throughout which the same standard time
is used. There are 24 time zones in the world.

UTC = local time + bias

The bias is the difference between UTC time and local time.

The tzset function initiates the tzname array with the
standard names of the pair of time zones: the standard time zone and the
daylight saving time zone. If daylight saving time zone is not used, the second
string is empty. The function also initiates the timezone
variable, which contains the difference between UTC and the latest local
standard time, in seconds west of UTC.

timezone.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main(void) {

    tzset();

    printf("The timezone is %s and %s\n", tzname[0], tzname[1]);

    printf("The bias is %ld seconds\n", timezone);

    return 0;
}

The program prints the current time zone and the bias.

tzset();

The timezone information is set with the tzset
function.

printf("The timezone is %s and %s\n", tzname[0], tzname[1]);

The tzset function fille the tzname array
with timezone strings.

$ ./timezone
The timezone is CET and CEST
The bias is -3600 seconds

On a system located in Bratislava, we get these values.

Timezone information can be also retrieved from the strftime
function.

timezone2.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

#define BUF_LEN 256

int main(void) {

    char buf[BUF_LEN] = {0};

    time_t rawtime = time(NULL);

    if (rawtime == -1) {

        puts("The time() function failed");
        return 1;
    }

    struct tm *ptm = localtime(&amp;rawtime);

    if (ptm == NULL) {

        puts("The localtime function failed");
        return 1;
    }

    strftime(buf, BUF_LEN, "Timezone: %Z  bias: %z", ptm);
    puts(buf);

    return 0;
}

In the example, we compute the simple calendar value, break it down to the
tm structure, and get the timezone information with the
strftime function.

strftime(buf, BUF_LEN, "Timezone: %Z  bias: %z", ptm);

The %Z specifier gets the current time zone name and the
%z returns the bias. The bias is specified as hours and minutes
followed with two digits each with no delimiter between them. The leading plus
stands for east of UTC.

$ ./timezone2
Timezone: CET  bias: +0100

The timezone on the system is CET. The bias is one hour east of UTC.

## Leap year

A *leap year* is a year containing an additional day. The reason for an extra
day in the calendar is the difference between the astronomical and the calendar
year.

leapyear.c
  

#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

bool isLeapYear(int);

int main(void) {

    // Assume year &gt;= 1582 in the Gregorian calendar.
    int years[] = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
        1900, 1800, 1600 };

    int size = sizeof(years) / sizeof(int);

    for (int i=0; i&lt;size; i++) {

        if (isLeapYear(years[i])) {

            printf("%d is a leap year\n", years[i]);
        } else {

            printf("%d is not a leap year\n", years[i]);
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

We have an array of years. We check all years if they are leap years.
There is no built-in function to check for a leap year; therefore, a custom
isLeapYear function is created.

// Assume year &gt;= 1582 in the Gregorian calendar.
int years[] = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 };

This is an array of years that we check. The years must be in the Gregorian
calendar.

for (int i=0; i&lt;size; i++) {

    if (isLeapYear(years[i])) {

        printf("%d is a leap year\n", years[i]);
    } else {

        printf("%d is not a leap year\n", years[i]);
    }
}

With the for loop we traverse the array. We check if a year is a
leap year using the isLeapYear function.

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

$ ./leapyear
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

This is the output of the leapyear program.

## CPU time

CPU time is the amount of time for which a central processing unit was used for
processing instructions of a computer program.

clock_t clock(void);

The clock function returns the processor time consumed by the
program. The clock function has a low resolution and is not
consistent on platform; therefore, it should not be used in situations where
high accuracy is required.

Note that on Windows, the clock function calculates the wall clock
time used by the calling process. The *wall clock time* is a time elapsed
according to the computer's internal clock, which should match time in the
outside world.

cputime.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

unsigned long long factorial(int);

int main(void) {

    clock_t start = clock();

    if (start == -1) {

        puts("The clock() function failed");
        return 1;
    }

    unsigned long long f = factorial(20);

    printf("The factorial of 20 is: %llu\n", f);

    clock_t end = clock();

    if (end == -1) {

        puts("The clock() function failed");
        return 1;
    }

    clock_t delta  = end - start;

    printf("The program took %lu clicks (%lf seconds).\n", delta,
           (double) delta/CLOCKS_PER_SEC);

    return 0;
}

unsigned long long factorial(int v) {

    if (v == 0) {

        return 1;
    } else {

        return v * factorial(v - 1);
    }
}

The program calculates a factorial of a number; we use the clock
function to get the time of the computation.

clock_t start = clock();

if (start == -1) {

    puts("The clock() function failed");
    return 1;
}

unsigned long long f = factorial(20);

printf("The factorial of 20 is: %llu\n", f);

clock_t end = clock();

We compute the factorial between two clock calls.

clock_t delta  = end - start;

We get the difference between the start and end values.

printf("The program took %lu clicks (%lf seconds).\n", delta,
        (double) delta/CLOCKS_PER_SEC);

Dividing the delta value by CLOCKS_PER_SEC we get
an approximation of duration in seconds.

$ ./cputime
The factorial of 20 is: 2432902008176640000
The program took 41 clicks (0.000041 seconds).

This is a sample output of the program.

## High resolution CPU time

The clock_gettime function can be used to get
high resolution time clock.

int clock_gettime(clockid_t, struct timespec *)

The function's first parameter specifies the clock Id; there are several
types of clocks:

- CLOCK_REALTIME

- CLOCK_MONOTONIC

- CLOCK_PROCESS_CPUTIME_ID

- CLOCK_THREAD_CPUTIME_ID

The CLOCK_REALTIME is a system-wide clock that measures real
(wall-clock) time. This clock is affected by discontinuous jumps in the system
time caused by system administrator or by adjtime
and NTP. The CLOCK_MONOTONIC represents monotonic time since some
unspecified starting point. This clock is not affected by discontinuous jumps
in the system time. The CLOCK_PROCESS_CPUTIME_ID is a high-resolution
per-process timer from the CPU. The CLOCK_THREAD_CPUTIME_ID is a
thread-specific CPU-time clock.

The clock_gettime function's second parameter is a timespec
structure.

struct timespec {
    time_t   tv_sec;    /* seconds */
    long     tv_nsec;   /* nanoseconds */
};

The timespec structure holds seconds and nanoseconds.

cputime.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

unsigned long long factorial(int);
double time_spec_seconds(struct timespec *);

int main(void) {

    struct timespec tstart = {0,0}, tend = {0,0};
    int r = clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &amp;tstart);

    if (r == -1) {

        printf("The clock_gettime() function failed: %s\n", strerror(errno));
        return 1;
    }

    unsigned long long f = factorial(20);

    printf("The factorial of 20 is: %llu\n", f);

    r = clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &amp;tend);

    if (r == -1) {

        printf("The clock_gettime() function failed: %s\n", strerror(errno));
        return 1;
    }

    double delta = time_spec_seconds(&amp;tend) - time_spec_seconds(&amp;tstart);

    printf("The computation took %lf seconds.\n", delta);

    return 0;
}

double time_spec_seconds(struct timespec* ts) {

    return (double) ts-&gt;tv_sec + (double) ts-&gt;tv_nsec * 1.0e-9;
}

unsigned long long factorial(int v) {

    if (v == 0) {

        return 1;
    } else {

        return v * factorial(v - 1);
    }
}

With the clock_gettime we compute the CPU time of a factorial
computation.

struct timespec tstart = {0,0}, tend = {0,0};

We create and initiate two timespec structures.

int r = clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &amp;tstart);

We call the clock_gettime with the CLOCK_PROCESS_CPUTIME_ID.

double delta = time_spec_seconds(&amp;tend) - time_spec_seconds(&amp;tstart);

We get the delta value by subtracting two timespec structures.

double time_spec_seconds(struct timespec* ts) {

    return (double) ts-&gt;tv_sec + (double) ts-&gt;tv_nsec * 1.0e-9;
}

The time_spec_seconds function converts the timespec
structure to seconds.

$ ./cputime2
The factorial of 20 is: 2432902008176640000
The computation took 0.000081 seconds.

## Sources

The following sources were used to create this article:

- [C reference](https://cplusplus.com/reference/)

- [The GNU C library manual](https://www.gnu.org/software/libc/manual/html_node/index.html)

- Linux manual pages

In this article, we have worked with date and time in C.