+++
title = "Date and time in C#"
date = 2025-08-27T23:22:55.187+01:00
draft = false
description = "Date and time in C# tutorial shows how to work with date and time in CSharp."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Date and time in C#

last modified July 8, 2023

 

In this article we show how to work with date and time in C#.

A datetime represents an instant in time. The string representation of a
datetime is culture-specific and depends both on the conventions used for
displaying date and time and its calendar. A calendar is a system of organizing
datetime units.

## C# DateTime

The DateTime value type represents dates and times with values
ranging from 00:00:00 (midnight), January 1, 0001 Anno Domini (Common Era)
through 11:59:59 P.M., December 31, 9999 A.D. (C.E.) in the Gregorian calendar.

## C# TimeSpan

TimeSpan represents a time interval (duration of time or elapsed
time) that is measured as a positive or negative number of days, hours, minutes,
seconds, and fractions of a second. TimeZoneInfo provides time zone
information and tools to work with different time zones.

## C# today's date

In our first example, we get today's date.

Program.cs
  

DateTime now = DateTime.Now;
Console.WriteLine(now.ToString("F"));

The example prints today's date.

DateTime now = DateTime.Now;

With the Now property of the DateTime, we get the
current date and time in local time.

Console.WriteLine(now.ToString("F"));

With the ToString method, we format the date. The F
specifier creates a full date and time pattern.

$ dotnet run
Saturday, July 8, 2023 2:08:27 PM

## C# DateTime properties

DateTime represents an instant in time. Its properties provide
various aspects of the date and time.

Program.cs
  

string[] months = {"January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"};

DateTime now = DateTime.Now;

Console.WriteLine("Today's date: {0}", now.Date);
Console.WriteLine("Today is {0} day of {1}", now.Day, months[now.Month - 1]);
Console.WriteLine("Today is {0} day of {1}", now.DayOfYear, now.Year);
Console.WriteLine("Today's time: {0}", now.TimeOfDay);
Console.WriteLine("Hour: {0}", now.Hour);
Console.WriteLine("Minute: {0}", now.Minute);
Console.WriteLine("Second: {0}", now.Second);
Console.WriteLine("Millisecond: {0}", now.Millisecond);
Console.WriteLine("The day of week: {0}", now.DayOfWeek);
Console.WriteLine("Kind: {0}", now.Kind);

The example examines the properties of the DateTime object.

DateTime now = DateTime.Now;

A DateTime object is created. The DateTime is set to
the current local date and time on this computer.

Console.WriteLine("Today's date: {0}", now.Date);

The Date property gets the date component of the
DateTime instance.

Console.WriteLine("Today is {0} day of {1}", now.Day, months[now.Month - 1]);

The Day property gets the day of the month. The Month
property returns the month component, expressed as a value between 1 and 12.

Console.WriteLine("Today is {0} day of {1}", now.DayOfYear, now.Year);

The DayOfYear property gets the day of the year, and the
Year gets the year.

Console.WriteLine("Today's time: {0}", now.TimeOfDay);

The TimeOfDay property gets the time of day of the
DateTime instance.

Console.WriteLine("Hour: {0}", now.Hour);
Console.WriteLine("Minute: {0}", now.Minute);
Console.WriteLine("Second: {0}", now.Second);
Console.WriteLine("Millisecond: {0}", now.Millisecond);

The Hour, Minute, Second, and
Millisecond are parts of the time component.

Console.WriteLine("The day of week: {0}", now.DayOfWeek);

The DayOfWeek property gets the day of the week.

Console.WriteLine("Kind: {0}", now.Kind);

The Kind property returns a value that indicates whether the
time represented by this DateTime instance is based on local time,
Coordinated Universal Time (UTC), or neither.

$ dotnet run
Today's date: 7/8/2023 12:00:00 AM
Today is 8 day of July
Today is 189 day of 2023
Today's time: 14:09:12.4107890
Hour: 14
Minute: 9
Second: 12
Millisecond: 410
The day of week: Saturday
Kind: Local

## C# add and subtract DateTime

DateTime has methods for doing time arithmetic operations.

Program.cs
  

DateTime dt = new DateTime(2019, 2, 22, 14, 0, 0);

DateTime dt1 = dt.AddSeconds(55);
DateTime dt2 = dt.AddMinutes(30);
DateTime dt3 = dt.AddHours(72);
DateTime dt4 = dt.AddDays(65);
DateTime dt5 = dt.AddDays(-65);
DateTime dt6 = dt.AddMonths(3);
DateTime dt7 = dt.AddYears(4);

Console.WriteLine(dt1.ToString("F"));
Console.WriteLine(dt2.ToString("F"));
Console.WriteLine(dt3.ToString("F"));
Console.WriteLine(dt4.ToString("F"));
Console.WriteLine(dt5.ToString("F"));
Console.WriteLine(dt6.ToString("F"));
Console.WriteLine(dt7.ToString("F"));

The example presents six methods of the DateTime object.

DateTime dt1 = dt.AddSeconds(55);

The AddSeconds returns a new DateTime that
adds the specified number of seconds to the value of this instance.

DateTime dt4 = dt.AddDays(65);
DateTime dt5 = dt.AddDays(-65);

The AddDays adds days to the DateTime. We can provide
both positive or negative values.

$ dotnet run
Friday, February 22, 2019 2:00:55 PM
Friday, February 22, 2019 2:30:00 PM
Monday, February 25, 2019 2:00:00 PM
Sunday, April 28, 2019 2:00:00 PM
Wednesday, December 19, 2018 2:00:00 PM
Wednesday, May 22, 2019 2:00:00 PM
Wednesday, February 22, 2023 2:00:00 PM

## C# UTC time

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

Program.cs
  

DateTime now = DateTime.Now;
DateTime utc = DateTime.UtcNow;

Console.WriteLine($"UTC time {utc:HH:mm:ss}");
Console.WriteLine($"Local time {now:HH:mm:ss}");

The example prints the current UTC time and the local time.

DateTime utc = DateTime.UtcNow;

With the UtcNow property of the DateTime, we get
the UTC time.

Console.WriteLine($"UTC time {utc:HH:mm:ss}");

We format the time.

$ dotnet run
UTC time 12:12:34
Local time 14:12:34

For the CET time zone, there is one hour difference in time.

## C# localized date

The DateTime allows us to display the date and time in a specific
culture.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

DateTime now = DateTime.Now;
CultureInfo ci = new CultureInfo("sk-SK");

Console.WriteLine($"Dnešný dátum a čas: {now.ToString("F", ci)}");

The example prints the current date and time in Slovak culture.

Console.OutputEncoding = System.Text.Encoding.UTF8;

To output the accented Slovak characters correctly, we set the
console output encoding to UTF8.

CultureInfo ci = new CultureInfo("sk-SK");

We create a Slovak CultureInfo, which includes information
about the names for the culture, the writing system, the calendar used,
the sort order of strings, and formatting for dates and numbers.

Console.WriteLine($"Dnešný dátum a čas: {now.ToString("F", ci)}");

We print the date and time in full date and time format pattern.

$ dotnet run
Dnešný dátum a čas: sobota 8. júla 2023 14:12:02

## C# Unix time

The Unix time is the number of seconds since the Unix epoch. The Unix time is
widely used in computing. There is no method to get Unix time in C#. We need to
create our own calculation.

Program.cs
  

long unixTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
Console.WriteLine(unixTime);

The example prints the Unix time.

long unixTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

We get the Unix time with the ToUnixTimeSeconds method.

$ dotnet run
1688818383

At this moment, 1688818383 seconds have passed since the Unix
epoch.

## C# TimeSpan

A TimeSpan structure represents a time interval.

Program.cs
  

string startTime = "7:00 AM";
string endTime = "8:30 PM";

TimeSpan elapsed = DateTime.Parse(endTime).Subtract(DateTime.Parse(startTime));

Console.WriteLine($"Time elapsed: {elapsed}");

In the example, we subtract two time values.

string startTime = "7:00 AM";
string endTime = "8:30 PM";

We define two time values expressed as strings.

TimeSpan elapsed = DateTime.Parse(endTime).Subtract(DateTime.Parse(startTime));

The Subtract method is used to subtract two time values. The
Parse method converts the string representation of a time interval
to a TimeSpan object.

$ dotnet run
Time elapsed: 13:30:00

The difference is 13 hours and 30 minutes.

In the following example, we subtract two date values.

Program.cs
  

DateTime now = DateTime.Today;
DateTime borodino_battle = new DateTime(1812, 9, 7);

TimeSpan diff = now - borodino_battle;

Console.WriteLine($"{diff.TotalDays} days have passed since the Battle of Borodino.");

In the example, we compute the number of days passed since the Borodino battle.

DateTime now = DateTime.Today;
DateTime borodino_battle = new DateTime(1812, 9, 7);

We define two DateTime objects: one for today and one for the date
of the Borodino battle.

TimeSpan diff = now - borodino_battle;

By subtracting those two objects, we get a TimeSpan object.

Console.WriteLine($"{diff.TotalDays} days have passed since the Battle of Borodino.");

The TotalDays property has the number of days of the elapsed time.

$ dotnet run
77005 days have passed since the Battle of Borodino.

On July 8, 2023, 77005 days have passed since the Battle of Borodino.

## C# format time

A date and time format string defines the text representation of a
DateTime
or DateTimeOffset value that results from a formatting operation.
There are two types of format specifiers: standard and custom. A custom date and
time format string consists of two or more characters.

Program.cs
  

DateTime now = DateTime.Now;

Console.WriteLine(now.ToString("d"));
Console.WriteLine(now.ToString("D"));
Console.WriteLine(now.ToString("F"));
Console.WriteLine(now.ToString("M"));
Console.WriteLine(now.ToString("o"));
Console.WriteLine(now.ToString("R"));
Console.WriteLine(now.ToString("t"));
Console.WriteLine(now.ToString("T"));
Console.WriteLine(now.ToString("Y"));

The example prints today's date using some of the standard format specifiers.

Console.WriteLine(now.ToString("d"));

The d specifier creates a short date pattern.

Console.WriteLine(now.ToString("D"));

The D specifier creates a long date pattern.

Console.WriteLine(now.ToString("F"));

The F specifier creates a full date and time pattern.

Console.WriteLine(now.ToString("M"));

The M specifier creates a month and day pattern.

Console.WriteLine(now.ToString("o"));

The o specifier creates a round-trip date and time pattern.
In this pattern, the date and time parts are separated by the T
character and the time zone bias is appended at the end of the string.

Console.WriteLine(now.ToString("R"));

The R specifier creates an RFC1123 date and time pattern.

Console.WriteLine(now.ToString("t"));

The t specifier creates a short time pattern.

Console.WriteLine(now.ToString("T"));

The t specifier creates a long time pattern.

Console.WriteLine(now.ToString("Y"));

The Y specifier creates a year and month pattern.

$ dotnet run
7/8/2023
Saturday, July 8, 2023
Saturday, July 8, 2023 2:16:12 PM
July 8
2023-07-08T14:16:12.9488634+02:00
Sat, 08 Jul 2023 14:16:12 GMT
2:16 PM
2:16:12 PM
July 2023

Custom format specifiers allow us to create customized date and time format
patterns.

Program.cs
  

DateTime now = DateTime.Now;

Console.WriteLine(now.ToString("ddd MMM %d, yyyy"));
Console.WriteLine(now.ToString("hh:mm:ss tt"));

The example prints a date and a time format using custom specifiers.

Console.WriteLine(now.ToString("ddd MMM %d, yyyy"));

The ddd specifier is the abbreviated name of
the day of the week, the MMM is the
abbreviated name of the month, the d is the day of
the month, from 1 through 31. In the context of custom specifiers,
it must be preceded with the % character. Finally,
the yyyy is the year as a four-digit number.

Console.WriteLine(now.ToString("hh:mm:ss tt"));

The hh specifier is the hour, using a 12-hour clock from 01 to 12,
the mm is the minute, from 00 through 59, the ss is
the second, from 00 through 59, and the tt is the AM/PM designator.

$ dotnet run
Sat Jul 8, 2023
02:15:36 PM

## C# parse time

The DateTime's Parse method converts the string
representation of a date and time to its DateTime equivalent.

Program.cs
  

string date_string = "11/5/2019";

DateTime dt = DateTime.Parse(date_string);
Console.WriteLine($"{dt:d MMMM, yyyy}");

The program parses a date in a string.

string date_string = "11/5/2019";

This is a date expressed in a string.

DateTime dt = DateTime.Parse(date_string);

With the Parse method, we parse it into the DateTime
object.

Console.WriteLine($"{dt:d MMMM, yyyy}");

The date is printed to the console in a middle-endian order.

$ dotnet run
5 November, 2019

## C# Time zones

A *time zone* is a region throughout which the same standard time is
used. There are 24 time zones in the world.

UTC = local time + bias

The bias is the difference between UTC time and local time.

TimeZoneInfo is a class for working with time zones in C#.

Program.cs
  

TimeZoneInfo localZone = TimeZoneInfo.Local;

Console.WriteLine("Current timezone: {0}", localZone.StandardName);
Console.WriteLine("Daylight name: {0}", localZone.DaylightName);

Console.WriteLine("Bias: {0}", localZone.BaseUtcOffset);

The program prints the current time zone and the bias.

TimeZoneInfo localZone = TimeZoneInfo.Local;

Using the Local property, we get the local time zone.

Console.WriteLine("Current timezone: {0}", localZone.StandardName);
Console.WriteLine("Daylight name: {0}", localZone.DaylightName);

The StandardName gives the time zone's standard name and the
DaylightName its daylight saving name.

Console.WriteLine("Bias: {0}", localZone.BaseUtcOffset);

The BaseUtcOffset property produces the bias.

$ dotnet run
Current timezone: Central Europe Standard Time
Daylight name: Central Europe Daylight Time
Bias: 01:00:00

On a system located in Bratislava, we get these values.

The GetSystemTimeZones method returns a sorted collection of all
the time zones about which information is available on the local system.

Program.cs
  

var timezones = TimeZoneInfo.GetSystemTimeZones();

foreach (var timezone in timezones)
{
    Console.WriteLine(timezone.Id);
}

The example prints the Ids of available time zones on a system.

$ dotnet run
...
Newfoundland Standard Time
Tocantins Standard Time
E. South America Standard Time
SA Eastern Standard Time
Argentina Standard Time
Greenland Standard Time
Montevideo Standard Time
Magallanes Standard Time
Saint Pierre Standard Time
Bahia Standard Time
UTC-02
Mid-Atlantic Standard Time
Azores Standard Time
Cape Verde Standard Time
UTC
...

This is a partial output of the program.

Timezone information can also be retrieved from a DateTime value
with some format specifiers.

Program.cs
  

DateTime now = DateTime.Now;

Console.WriteLine(now.ToString("%z"));
Console.WriteLine(now.ToString("%K"));
Console.WriteLine(now.ToString("o"));

The example the local time zone's bias using format specifiers.

$ dotnet run
+2
+02:00
2023-07-08T14:18:23.8369868+02:00

## Calendar

A calendar is a system of organizing datetime units. Cultures use different
calendars. Some cultures can use multiple calendars.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var perCi = new CultureInfo("fa-IR");
Console.WriteLine($"Default calendar: {perCi.Calendar}");

DateTime now = DateTime.Now;

foreach (var oc in perCi.OptionalCalendars)
{
    perCi.DateTimeFormat.Calendar = oc;
    Console.WriteLine($"{now.ToString("F", perCi)}");
}

Persian culture uses PersianCalendar as the default one and GregorianCalendar
and HijriCalendar as optional calendars. We display the current datetime in all 
supported Persian calendars.

var perCi = new CultureInfo("fa-IR");

We create a Persian CultureInfo.

DateTime now = DateTime.Now;

We get the current datetime value.

foreach (var oc in perCi.OptionalCalendars)
{
    perCi.DateTimeFormat.Calendar = oc;
    Console.WriteLine($"{now.ToString("F", perCi)}");
}

We go through the array of supported calendars. We set the 
DateTimeFormat.Calendar to the currently selected calendar and
print the datetime.

$ dotnet run 
Default calendar: System.Globalization.PersianCalendar
1402 تیر 17, شنبه 13:35:18
2023 ژوئیهٔ 8, شنبه 13:35:18
1444 ذیحجهٔ 20, شنبه 13:35:18

HebrewCalendar represents the Hebrew calendar.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var hc = new HebrewCalendar();
var d1 = new DateTime(5776, 10, 7, hc);

Console.WriteLine($"{d1:d}");
Console.WriteLine($"{hc.GetYear(d1)}/{hc.GetMonth(d1)}/{hc.GetDayOfMonth(d1)}");

In the example, we define a datetime in a Hebrew calendar and print it in
Gregorian and Hebrew string representations.

var hc = new HebrewCalendar();
var d1 = new DateTime(5776, 10, 7, hc);

The calendar is passed as the fourth parameter of the DateTime
constructor.

$ dotnet run
6/13/2016
5776/10/7

## C# Leap year

A *leap year* is a year containing an additional day. The reason for an
extra day in the calendar is the difference between the astronomical and the
calendar year.

Program.cs
  

// Assume year &gt;= 1582 in the Gregorian calendar.
int[] years = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 };

foreach (int year in years)
{
    if (DateTime.IsLeapYear(year))
    {
        Console.WriteLine($"{year} is a leap year");
    } else
    {
        Console.WriteLine($"{year} is not a leap year");
    }
}

We have an array of years. We check all years if they are leap years or not.
The IsLeapYear function determines whether a year is a leap year.

int[] years = { 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 };

This is an array of years that we check. The years must be in the Gregorian
calendar.

foreach (int year in years)
{
    if (DateTime.IsLeapYear(year))
    {
        Console.WriteLine($"{year} is a leap year");
    }
    else
    {
        Console.WriteLine($"{year} is not a leap year");
    }
}

With the for loop we traverse the array. We check if a year is a leap year using
the IsLeapYear function.

$ dotnet run
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

## Source

[DateTime struct](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0)

In this article we have worked with date and time in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).