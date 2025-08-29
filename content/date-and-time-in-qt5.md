+++
title = "Date and time in Qt5"
date = 2025-08-29T19:57:26.260+01:00
draft = false
description = "In this part of the Qt5 tutorial, we work with time and date."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../strings/)
[Next](../containers/)

# Date and time in Qt5

last modified October 18, 2023

In this part of the Qt5 C++ programming tutorial, we talk about
time and date.

Qt5 has QDate, QTime, and QDateTime
classes to work with date and time. The QDate is a class for
working with a calendar date in the Gregorian calendar. It has methods for
determining the date, comparing, or manipulating dates. The QTime
class works with a clock time. It provides methods for comparing time,
determining the time and various other time manipulating methods. The
QDateTime is a class that combines both QDate and
QTime objects into one object.

In this chapter, we created command line programs; therefore, we do not need 
the Qt GUI module. We can add the QT -= gui declaration to the 
project file.

## Qt5 initialising date &amp; time objects

Date and time objects can be initialised in two basic ways. We initialise
them in the object constructor or we can create empty objects and
fill them with data later.

init.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;
#include &lt;QTime&gt;

int main(void) {

   QTextStream out(stdout);

   QDate dt1 { 2020, 4, 12 };
   out &lt;&lt; "The date is " &lt;&lt; dt1.toString() &lt;&lt; endl;

   QDate dt2;
   dt2.setDate(2020, 3, 3);
   out &lt;&lt; "The date is " &lt;&lt; dt2.toString() &lt;&lt; endl;

   QTime tm1 { 17, 30, 12, 55 };
   out &lt;&lt; "The time is " &lt;&lt; tm1.toString("hh:mm:ss.zzz") &lt;&lt; endl;

   QTime tm2;
   tm2.setHMS(13, 52, 45, 155);
   out &lt;&lt; "The time is " &lt;&lt; tm2.toString("hh:mm:ss.zzz") &lt;&lt; endl;
}

We initialise date and time object in both ways.

QDate dt1 { 2020, 4, 12 };

The QDate object constructor takes three parameters: the year, the
month, and the day.

out &lt;&lt; "The date is " &lt;&lt; dt1.toString() &lt;&lt; endl;

The date is printed to the console. We use the toString
method to convert the date object into string.

QTime tm2;
tm2.setHMS(13, 52, 45, 155);

An empty QTime object is created. We fill the object with data
using the setHMS method. The parameters are the hours, minutes,
seconds, and milliseconds.

out &lt;&lt; "The time is " &lt;&lt; tm2.toString("hh:mm:ss.zzz") &lt;&lt; endl;

We print the QTime object to the console. We use a specific format
that includes also the milliseconds, which are omitted by default.

$ ./init
The date is Sun Apr 12 2020
The date is Tue Mar 3 2020
The time is 17:30:12.055
The time is 13:52:45.155

## Qt5 current date &amp; time

In the following example, we print the current local time and
date to the console.

current_datetime.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QTime&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate cd = QDate::currentDate();
   QTime ct = QTime::currentTime();

   out &lt;&lt; "Current date is: " &lt;&lt; cd.toString() &lt;&lt; endl;
   out &lt;&lt; "Current time is: " &lt;&lt; ct.toString() &lt;&lt; endl;
}

Watch out that the file must not be called time.cpp.

QDate cd = QDate::currentDate();

The QDate::currentDate static function returns the current date.

QTime ct = QTime::currentTime();

The QTime::currentTime static function returns the current time.

out &lt;&lt; "Current date is: " &lt;&lt; cd.toString() &lt;&lt; endl;
out &lt;&lt; "Current time is: " &lt;&lt; ct.toString() &lt;&lt; endl;

We use the toString method to convert the date and time objects to
strings.

$ ./current 
Current date is: Thu Dec 3 2020
Current time is: 10:21:48

## Qt5 compare dates

Relational operators can be used to compare dates. We can compare their position
in the calendar.

compare_dates.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate dt1 { 2020, 4, 5 };
   QDate dt2 { 2019, 4, 5 };

   if (dt1 &lt; dt2) {

       out &lt;&lt; dt1.toString() &lt;&lt; " comes before "
            &lt;&lt; dt2.toString() &lt;&lt; endl;
   } else {

       out &lt;&lt; dt1.toString() &lt;&lt; " comes after "
            &lt;&lt; dt2.toString() &lt;&lt; endl;
   }
}

The example compares two dates.

QDate dt1 { 2020, 4, 5 };
QDate dt2 { 2019, 4, 5 };

We have two different dates.

if (dt1 &lt; dt2) {

    out &lt;&lt; dt1.toString() &lt;&lt; " comes before "
            &lt;&lt; dt2.toString() &lt;&lt; endl;
} else {

    out &lt;&lt; dt1.toString() &lt;&lt; " comes after "
            &lt;&lt; dt2.toString() &lt;&lt; endl;
}

We compare the dates with a lower than (&lt;) comparison operator and determine
which of them is located earlier in the calendar.

$ ./compare 
Sun Apr 5 2020 comes after Fri Apr 5 2019

Comparison operators can be easily used for QTime and 
QDateTime objects too.

## Qt5 determining leap year

A *leap year* is a year containing an additional day. The reason for an
extra day in the calendar is the difference between the astronomical and the
calendar year. The calendar year has exactly 365 days, while the astronomical
year, the time for the earth to make one revolution around the Sun, is 365.25
days. 

The difference is 6 hours which means that in four years time we are missing one
day. Because we want to have our calendar synchronised with the seasons, we add
one day to February each four years. (There are exceptions.) In the Gregorian
calendar, February in a leap year has 29 days instead of the usual 28. And the
year lasts 366 days instead of the usual 365.

The QDate::isLeapYear static method determines whether a year is a
leap year.

leapyear.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QList&lt;int&gt; years({2010, 2011, 2012, 2013, 2014, 2015, 2016, 2020, 2024});

   for (int year: years) {

       if (QDate::isLeapYear(year)) {

           out &lt;&lt; year &lt;&lt; " is a leap year" &lt;&lt; endl;
       } else {

           out &lt;&lt; year &lt;&lt; " is not a leap year" &lt;&lt; endl;
       }
   }
}

In the example we have a list of years. We check each year if it is a leap year.

QList&lt;int&gt; years({2010, 2011, 2012, 2013, 2014, 2015, 2016, 2020, 2024});

We initialise a list of years. 

for (int year: years) {

    if (QDate::isLeapYear(year)) {

        out &lt;&lt; year &lt;&lt; " is a leap year" &lt;&lt; endl;
    } else {

        out &lt;&lt; year &lt;&lt; " is not a leap year" &lt;&lt; endl;
    }
}

We go through the list and determine if the given year is a leap year.
The QDate::isLeapYear returns a boolean true or false.

$ ./leapyear 
2010 is not a leap year
2011 is not a leap year
2012 is a leap year
2013 is not a leap year
2014 is not a leap year
2015 is not a leap year
2016 is a leap year
2020 is a leap year
2024 is a leap year

## Qt5 predefined date formats

Qt5 has some built-in date formats. The toString method of a
QDate object takes a date format as a parameter. The default
date format used by Qt5 is Qt::TextDate.

predefined_date_formats.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate cd = QDate::currentDate();

   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::TextDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::ISODate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::SystemLocaleShortDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::SystemLocaleLongDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::DefaultLocaleShortDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::DefaultLocaleLongDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::SystemLocaleDate) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::LocaleDate) &lt;&lt; endl;
}

In the example, we show eight different date formats for the current date.

out &lt;&lt; "Today is " &lt;&lt; cd.toString(Qt::ISODate) &lt;&lt; endl;

Here we print the current date in the Qt::ISODate format, which is
an international standard for displaying dates.

$ ./predefineddateformats 
Today is Thu Dec 3 2020
Today is 2020-12-03
Today is 12/3/20
Today is Thursday, December 3, 2020
Today is 12/3/20
Today is Thursday, December 3, 2020
Today is 12/3/20
Today is 12/3/20

## Qt5 custom date formats

A date can be represented in a variety of other formats. In Qt5 we can create
our custom date formats, too. Another version of the toString
method takes a format string where we can use various format specifiers. For
example the d specifier stands for a day as a number without a
leading zero. The dd specifier stands for a day as a number with a
leading zero. The following table lists available date format expressions:

ExpressionOutput

dThe day as a number without a leading zero (1 to 31)
ddThe day as a number with a leading zero (01 to 31)
dddThe abbreviated localized day name (e.g. 'Mon' to 'Sun'). Uses QDate::shortDayName.
ddddThe long localized day name (e.g. 'Monday' to 'Sunday'). Uses QDate::longDayName.
MThe month as a number without a leading zero (1 to 12)
MMThe month as a number with a leading zero (01 to 12)
MMMThe abbreviated localized month name (e.g. 'Jan' to 'Dec'). Uses QDate::shortMonthName.
MMMMThe long localized month name (e.g. 'January' to 'December'). Uses QDate::longMonthName.
yyThe year as two digit number (00 to 99)
yyyyThe year as four digit number. If the year is negative, a minus sign is prepended in addition.

Table: Date format specifiers

custom_date_formats.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate cd = QDate::currentDate();

   out &lt;&lt; "Today is " &lt;&lt; cd.toString("yyyy-MM-dd") &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString("yy/M/dd") &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString("d. M. yyyy") &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; cd.toString("d-MMMM-yyyy") &lt;&lt; endl;
}

We have four custom date formats.

out &lt;&lt; "Today is " &lt;&lt; cd.toString("yyyy-MM-dd") &lt;&lt; endl;

This is the international date format. The parts of the date are separated by
a dash character. The yyyy is a year having four digits. The MM
is the month as a number with a leading zero (01 to 12). And the dd is
the day as a number with a leading zero (01 to 31).

out &lt;&lt; "Today is " &lt;&lt; cd.toString("yy/M/dd") &lt;&lt; endl;

This is another common date format. The parts are separated by a slash (/)
character. The M specifier stands for a month as a number without a
leading zero (1 to 12).

out &lt;&lt; "Today is " &lt;&lt; cd.toString("d. M. yyyy") &lt;&lt; endl;

This date format is used in Slovakia. The parts are separated by a dot
character. The day and month are without leading zeros. First is the day, then
comes the month, and the last is the year.

$ ./customdateformats 
Today is 2020-12-03
Today is 20/12/03
Today is 3. 12. 2020
Today is 3-December-2020

## Qt5 predefined time formats

Time has some predefined formats. The standard format specifiers are identical
to those used in the date formats. The default time format used by Qt5 is
Qt::TextDate.

predefined_time_formats.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QTime&gt;

int main(void) {

   QTextStream out(stdout);

   QTime ct = QTime::currentTime();

   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::TextDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::ISODate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::SystemLocaleShortDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::SystemLocaleLongDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::DefaultLocaleShortDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::DefaultLocaleLongDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::SystemLocaleDate) &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::LocaleDate) &lt;&lt; endl;
}

In the example, we show eight different time formats for the current time.

out &lt;&lt; "The time is " &lt;&lt; ct.toString(Qt::ISODate) &lt;&lt; endl;

Here we print the current time in the Qt::ISODate format, which is
an international standard for displaying times.

$ ./predefinedtimeformats 
The time is 10:59:05
The time is 10:59:05
The time is 10:59 AM
The time is 10:59:05 AM CET
The time is 10:59 AM
The time is 10:59:05 AM CET
The time is 10:59 AM
The time is 10:59 AM

## Qt5 custom time formats

We can create additional time formats. We build a custom time
format where we use time format specifiers. The following
table gives a list of available format expressions.

ExpressionOutput

hthe hour without a leading zero (0 to 23 or 1 to 12 if AM/PM display)
hhthe hour with a leading zero (00 to 23 or 01 to 12 if AM/PM display)
Hthe hour without a leading zero (0 to 23, even with AM/PM display)
HHthe hour with a leading zero (00 to 23, even with AM/PM display)
mthe minute without a leading zero (0 to 59)
mmthe minute with a leading zero (00 to 59)
sthe second without a leading zero (0 to 59)
ssthe second with a leading zero (00 to 59)
zthe milliseconds without leading zeroes (0 to 999)
zzzthe milliseconds with leading zeroes (000 to 999)
AP or A use AM/PM display. AP will be replaced by either "AM" or "PM".
ap or ause am/pm display. ap will be replaced by either "am" or "pm".
tthe timezone (for example "CEST")

Table: Time format specifiers

custom_time_formats.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QTime&gt;

int main(void) {

   QTextStream out(stdout);

   QTime ct = QTime::currentTime();

   out &lt;&lt; "The time is " &lt;&lt; ct.toString("hh:mm:ss.zzz") &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString("h:m:s a") &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString("H:m:s A") &lt;&lt; endl;
   out &lt;&lt; "The time is " &lt;&lt; ct.toString("h:m AP") &lt;&lt; endl;
}

We have four custom time formats.

out &lt;&lt; "The time is " &lt;&lt; ct.toString("hh:mm:ss.zzz") &lt;&lt; endl;

In this format, we have hour, minute, and second with a leading zero. We also
add the milliseconds with leading zeroes.

out &lt;&lt; "The time is " &lt;&lt; ct.toString("h:m:s a") &lt;&lt; endl;

This time format specifier uses hour, minute, and second without a leading zero
and adds am/pm period identifiers.

$ ./customtimeformats 
The time is 11:03:16.007
The time is 11:3:16 am
The time is 11:3:16 AM
The time is 11:3 AM

## Qt5 retrieving the weekday

The dayOfWeek method returns a number which represents a day of a
week, where 1 is Monday and 7 is Sunday.

weekday.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate cd = QDate::currentDate();
   int wd = cd.dayOfWeek();

   QLocale locale(QLocale("en_US"));

   out &lt;&lt; "Today is " &lt;&lt; locale.dayName(wd) &lt;&lt; endl;
   out &lt;&lt; "Today is " &lt;&lt; locale.dayName(wd, QLocale::ShortFormat) &lt;&lt; endl;
}

In the example we print the short and long names of the current weekday.

QDate cd = QDate::currentDate();

We get the current date.

int wd = cd.dayOfWeek();

From the current date we get the day of week.

out &lt;&lt; "Today is " &lt;&lt; locale.dayName(wd) &lt;&lt; endl;

We get the long name of the weekday.

out &lt;&lt; "Today is " &lt;&lt; locale.dayName(wd, QLocale::ShortFormat) &lt;&lt; endl;

We get the long name of the weekday.

$ ./weekday 
Today is Thursday
Today is Thu

## Number of days

We can compute the number of days in a particular month using the
daysInMonth method and the number of days in a year using the
daysInYear method.

nofdays.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);
   QList&lt;QString&gt; months;

   months.append("January");
   months.append("February");
   months.append("March");
   months.append("April");
   months.append("May");
   months.append("June");
   months.append("July");
   months.append("August");
   months.append("September");
   months.append("October");
   months.append("November");
   months.append("December");

   QDate dt1 { 2020, 9, 18 };
   QDate dt2 { 2020, 2, 11 };
   QDate dt3 { 2020, 5, 1 };
   QDate dt4 { 2020, 12, 11 };
   QDate dt5 { 2020, 2, 29 };

   out &lt;&lt; "There are " &lt;&lt; dt1.daysInMonth() &lt;&lt; " days in "
       &lt;&lt; months.at(dt1.month()-1) &lt;&lt; endl;
   out &lt;&lt; "There are " &lt;&lt; dt2.daysInMonth() &lt;&lt; " days in "
       &lt;&lt; months.at(dt2.month()-1) &lt;&lt; endl;
   out &lt;&lt; "There are " &lt;&lt; dt3.daysInMonth() &lt;&lt; " days in "
       &lt;&lt; months.at(dt3.month()-1) &lt;&lt; endl;
   out &lt;&lt; "There are " &lt;&lt; dt4.daysInMonth() &lt;&lt; " days in "
       &lt;&lt; months.at(dt4.month()-1) &lt;&lt; endl;
   out &lt;&lt; "There are " &lt;&lt; dt5.daysInMonth() &lt;&lt; " days in "
       &lt;&lt; months.at(dt5.month()-1) &lt;&lt; endl;

   out &lt;&lt; "There are " &lt;&lt; dt1.daysInYear() &lt;&lt; " days in year "
       &lt;&lt; QString::number(dt1.year()) &lt;&lt; endl;
}

Five date objects are created. We compute the number of days in those
months and in a particular year.

QDate dt1 { 2020, 9, 18 };
QDate dt2 { 2020, 2, 11 };
QDate dt3 { 2020, 5, 1 };
QDate dt4 { 2020, 12, 11 };
QDate dt5 { 2020, 2, 29 };

Five QDate objects are created. Each of them represents a different
date.

out &lt;&lt; "There are " &lt;&lt; dt1.daysInMonth() &lt;&lt; " days in "
    &lt;&lt; months.at(dt1.month()-1) &lt;&lt; endl;

We use the daysInMonth method to get the number of days in the date
object.

out &lt;&lt; "There are " &lt;&lt; dt1.daysInYear() &lt;&lt; " days in year "
    &lt;&lt; QString::number(dt1.year()) &lt;&lt; endl;

And here, we get the number of days in a year using the daysInYear
method for the date object.

$ ./nofdays 
There are 30 days in September
There are 29 days in February
There are 31 days in May
There are 31 days in December
There are 29 days in February
There are 366 days in year 2020

## Qt5 checking date validity

There is a isValid method which checks whether a date is valid.

validity.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

    QTextStream out(stdout);

    QList&lt;QDate&gt; dates { 
        QDate(2020, 5, 11), QDate(2020, 8, 1),
        QDate(2020, 2, 30)
    };

    for (int i=0; i &lt; dates.size(); i++) {

       if (dates.at(i).isValid()) {

           out &lt;&lt; "Date " &lt;&lt; i+1 &lt;&lt; " is a valid date" &lt;&lt; endl;
       } else {
           
           out &lt;&lt; "Date " &lt;&lt; i+1 &lt;&lt; " is not a valid date" &lt;&lt; endl;
       }
    }
}

In the example we check the validity of three days.

QList&lt;QDate&gt; dates { 
    QDate(2020, 5, 11), QDate(2020, 8, 1),
    QDate(2020, 2, 30)
};

The first two days are valid. The third one is invalid. February has 28 or 29
days.

if (dates.at(i).isValid()) {

    out &lt;&lt; "Date " &lt;&lt; i+1 &lt;&lt; " is a valid date" &lt;&lt; endl;
} else {
    
    out &lt;&lt; "Date " &lt;&lt; i+1 &lt;&lt; " is not a valid date" &lt;&lt; endl;
}

Depending on the outcome of the isValid method, we print a message
about a validity of a date to the console.

$ ./validity
Date 1 is a valid date
Date 2 is a valid date
Date 3 is not a valid date

## Qt5 addDays, daysTo

We can easily calculate a date n days from a particular date. We use the
addDays method. The daysTo method returns the number
of days to a chosen date.

daystofrom.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

    QTextStream out(stdout);

    QDate dt { 2020, 5, 11 };
    QDate nd = dt.addDays(55);

    QDate cd = QDate::currentDate();
    int year = cd.year();
    QDate xmas { year, 12, 24 };

    out &lt;&lt; "55 days from " &lt;&lt; dt.toString() &lt;&lt; " is "
        &lt;&lt; nd.toString() &lt;&lt; endl;
    out &lt;&lt; "There are " &lt;&lt; QDate::currentDate().daysTo(xmas)
        &lt;&lt; " days till Christmas" &lt;&lt; endl;
}

We get a date 55 day later from May 11, 2020. We also get the number of days
till Christmas.

QDate dt { 2020, 5, 11 };
QDate nd = dt.addDays(55);

The addDays method returns a QDate which is 55
days after the given date.

QDate xmas { year, 12, 24 };
...
out &lt;&lt; "There are " &lt;&lt; QDate::currentDate().daysTo(xmas)
    &lt;&lt; " days till Christmas" &lt;&lt; endl;

We use the daysTo method to calculate the number of days until
Christmas.

$ ./daystofrom 
55 days from Mon May 11 2020 is Sun Jul 5 2020
There are 21 days till Christmas

## Qt5 QDateTime class

The QDateTime object contains a calendar date and a clock time.
It is a combination of the QDate and QTime classes.
It has many similar methods and the usage is identical to those two classes.

datetime.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDateTime&gt;

int main(void) {

   QTextStream out(stdout);
   QDateTime cdt = QDateTime::currentDateTime();

   out &lt;&lt; "The current datetime is " &lt;&lt; cdt.toString() &lt;&lt; endl;
   out &lt;&lt; "The current date is " &lt;&lt; cdt.date().toString() &lt;&lt; endl;
   out &lt;&lt; "The current time is " &lt;&lt; cdt.time().toString() &lt;&lt; endl;
}

The example retrieves the current datetime.

out &lt;&lt; "The current datetime is " &lt;&lt; cdt.toString() &lt;&lt; endl;

This line of code prints the current datetime to the terminal.

out &lt;&lt; "The current date is " &lt;&lt; cdt.date().toString() &lt;&lt; endl;

This line retrieves the date portion of the datetime object using the date
method.

$ ./datetime 
The current datetime is Thu Dec 3 12:29:42 2020
The current date is Thu Dec 3 2020
The current time is 12:29:42

## Julian day

A Julian day refers to a continuous count of days since the beginning of
the Julian Period. It is used primarily by astronomers. It should not be
confused with the Julian calendar. The Julian Period started in 4713 BC.
The Julian day number 0 is assigned to the day starting at noon on January
1, 4713 BC. The Julian Day Number (JDN) is the number of days elapsed
since the beginning of this period. The Julian Date (JD) of any instant is
the Julian day number for the preceding noon plus the fraction of the day
since that instant. (Qt5 does not compute this fraction.) Apart from
astronomy, Julian dates are often used by military and mainframe programs.

julianday.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate cd = QDate::currentDate();

   out &lt;&lt; "Gregorian date for today: " &lt;&lt; cd.toString(Qt::ISODate) &lt;&lt; endl;
   out &lt;&lt; "Julian day for today: " &lt;&lt; cd.toJulianDay() &lt;&lt; endl;
}

In the example, we compute the Gregorian date and the Julian day for today.

out &lt;&lt; "Julian day for today: " &lt;&lt; cd.toJulianDay() &lt;&lt; endl;

The Julian day is returned with the toJulianDay method.

$ ./juliandate 
Gregorian date for today: 2020-12-03
Julian day for today: 2459187

With Julian date, it is easy to do calculations.

battles.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDate&gt;

int main(void) {

   QTextStream out(stdout);

   QDate bordate(1812, 9, 7);
   QDate slavdate(1805, 12, 2);

   QDate cd = QDate::currentDate();

   int j_today = cd.toJulianDay();
   int j_borodino = bordate.toJulianDay();
   int j_slavkov = slavdate.toJulianDay();

   out &lt;&lt; "Days since Slavkov battle: " &lt;&lt; j_today - j_slavkov &lt;&lt; endl;
   out &lt;&lt; "Days since Borodino battle: " &lt;&lt; j_today - j_borodino &lt;&lt; endl;
}

The example counts the number of days passed since two historical events.

QDate bordate(1812, 9, 7);
QDate slavdate(1805, 12, 2);

We have two dates of battles of the Napoleonic era.

int j_today = cd.toJulianDay();
int j_borodino = bordate.toJulianDay();
int j_slavkov = slavdate.toJulianDay();

We compute the Julian days for today and for the Battles of Slavkov and Borodino.

out &lt;&lt; "Days since Slavkov battle: " &lt;&lt; j_today - j_slavkov &lt;&lt; endl;
out &lt;&lt; "Days since Borodino battle: " &lt;&lt; j_today - j_borodino &lt;&lt; endl;

We compute the number of days passed since the two battles.

$ date
Thu 03 Dec 2020 12:33:56 PM CET
$ ./battles 
Days since Slavkov battle: 78529
Days since Borodino battle: 76058

On December 3, 2020, 78529 days have passed since the Battle of Slavkov and
76058 since the battle of Borodino.

## UTC time

Our planet is a sphere. It revolves round its axis. The Earth rotates towards
the east. So the Sun rises at different times in different locations. The Earth
rotates once in about 24 hours. Therefore, the world was divided into 24 time
zones. In each time zone, there is a different local time. This local time is
often further modified by the daylight saving.

There is a pragmatic need for one global time. One global time helps to avoid
confusion about time zones and daylight saving time. The UTC (Universal
Coordinated time) was chosen to be the primary time standard. UTC is used in
aviation, weather forecasts, flight plans, air traffic control clearances, and
maps. Unlike local time, UTC does not change with a change of seasons.

utc_local.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDateTime&gt;

int main(void) {

  QTextStream out(stdout);

  QDateTime cdt = QDateTime::currentDateTime();

  out &lt;&lt; "Universal datetime: " &lt;&lt; cdt.toUTC().toString() &lt;&lt; endl;
  out &lt;&lt; "Local datetime: " &lt;&lt; cdt.toLocalTime().toString() &lt;&lt; endl;
}

In the example we compute the current datetime. We express the datetime in UTC
datetime and local datetime.

out &lt;&lt; "Universal datetime" &lt;&lt; cdt.toUTC().toString() &lt;&lt; endl;

The toUTC method is used to get the UTC datetime.

out &lt;&lt; "Local datetime" &lt;&lt; cdt.toLocalTime().toString() &lt;&lt; endl;

The toLocalTime is used to get the local datetime.

$ ./utclocal 
Universal datetime: Thu Dec 3 11:36:19 2020 GMT
Local datetime: Thu Dec 3 12:36:19 2020

The example was run in Bratislava, which has Central European Time (CET)—UTC + 1
hour.

## The Unix epoch

An epoch is an instant in time chosen as the origin of a particular era.
For example in western Christian countries the time epoch starts from
day 0, when Jesus was born. Another example is
the French Republican Calendar which was used for twelve years. The epoch
was the beginning of the Republican Era which was proclaimed on
September 22, 1792, the day the First Republic was declared and the
monarchy abolished.

Computers have their epochs too. One of the
most popular is the Unix epoch. The Unix epoch is the time 00:00:00 UTC
on 1 January 1970 (or 1970-01-01T00:00:00Z ISO 8601).
The date and time in a computer is determined according to the number of
seconds or clock ticks that have elapsed since the defined epoch for
that computer or platform.

*Unix time* is the number of seconds elapsed since Unix epoch.

$ date +%s
1606995554

Unix date command can be used to get the Unix time. At this particular
moment, 1606995554 seconds have passed since the Unix epoch.

unix_epoch.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDateTime&gt;
#include &lt;ctime&gt;

int main(void) {

  QTextStream out(stdout);

  time_t t = time(0);
  out &lt;&lt; t &lt;&lt; endl;

  QDateTime dt;
  dt.setTime_t(t);
  out &lt;&lt; dt.toString() &lt;&lt; endl;

  QDateTime cd = QDateTime::currentDateTime();
  out &lt;&lt; cd.toTime_t() &lt;&lt; endl;
}

In the example, we use two Qt5 functions to get the Unix
time and convert it to the human readable form.

#include &lt;ctime&gt;

We include the standard C++ time header file.

time_t t = time(0);
out &lt;&lt; t &lt;&lt; endl;

With the standard C++ time function, we get the Unix time.

QDateTime dt;
dt.setTime_t(t);
out &lt;&lt; dt.toString() &lt;&lt; endl;

The setTime_t function is used to convert the Unix time into the
DateTime, which is formatted to human readable form.

QDateTime cd = QDateTime::currentDateTime();
out &lt;&lt; cd.toTime_t() &lt;&lt; endl;

The Qt5's toTime_t function can be also used to get the Unix time.

$ ./unixepoch 
1606995613
Thu Dec 3 12:40:13 2020
1606995613

In this chapter, we have worked with time and date in Qt5.

[Contents](..)
[Previous](../strings/)
[Next](../containers/)