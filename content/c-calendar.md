+++
title = "C# Calendar"
date = 2025-08-29T19:50:31.860+01:00
draft = false
description = "In this tutorial we show how to work with calendars in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Calendar

last modified July 5, 2023

 

In this article we show how to work with calendars in C#.

A DateTime represents an instant in time. The string representation
of a datetime is culture-specific and depends both on the conventions used for
displaying date and time and its calendar. A *calendar* is a system of
organizing datetime units.

CultureInfo provides information about a specific culture. The
information includes the names for the culture, the writing system, the calendar
used, the sort order of strings, and formatting for dates and numbers.
GregorianCalendar is the most popular calendar and is used as the default for
the culture-independent option.

Each CultureInfo supports a set of calendars. The
Calendar returns the default calendar for the culture.
The OptionalCalendars gives an array containing all the calendars
supported by the culture.

.NET supports several calendars including GregorianCalendar, HebrewCalendar,
HijriCalendar, JapaneseCalendar, JulianCalendar, or PersianCalendar.

The .NET calendar types are located in the System.Globalization
namespace.

## C# default calendars

Each culture has a default calendar. For instance, Slovakia, Hungary and Russia
use the GregorianCalendar. Some cultures may other calendars optionally. Persian
culture uses PersianCalendar as the default one and GregorianCalendar and
HijriCalendar as optional calendars.

Program.cs
  

using System.Globalization;

Console.WriteLine(CultureInfo.InvariantCulture.Calendar);
Console.OutputEncoding = System.Text.Encoding.UTF8;

string[] culs = { "sk-SK", "he-IL", "hi-IN", "fa-IR" };

foreach (var cul in culs)
{
    DateTime now = DateTime.Now;
    var ci = new CultureInfo(cul);

    Console.WriteLine($"{now.ToString("F", ci)}");

    Console.WriteLine(ci.Calendar);
    Console.WriteLine("==========");

    foreach (var oc in ci.OptionalCalendars)
    {
        Console.WriteLine(oc);
    }

    Console.WriteLine("--------------------------------");
}

The example prints the default and optional calendars for several cultures.

Console.WriteLine(CultureInfo.InvariantCulture.Calendar);

We print the default calendar for the InvariantCulture.

string[] culs = { "sk-SK", "he-IL", "hi-IN", "fa-IR" };

We select four different cultures: Slovak, Hebrew, Hindi, and Persian.

DateTime now = DateTime.Now;
var ci = new CultureInfo(cul);

Console.WriteLine($"{now.ToString("F", ci)}");

We define the CultureInfo and display the current datetime in this
culture.

Console.WriteLine(ci.Calendar);

We print the culture's default calendar.

foreach (var oc in ci.OptionalCalendars)
{
    Console.WriteLine(oc);
}

We print the optional calendars if any.

$ dotnet run
System.Globalization.GregorianCalendar
streda 5. júla 2023 15:02:02
System.Globalization.GregorianCalendar
==========
System.Globalization.GregorianCalendar
--------------------------------
יום רביעי, 5 ביולי 2023 15:02:02
System.Globalization.GregorianCalendar
==========
System.Globalization.GregorianCalendar
System.Globalization.HebrewCalendar
System.Globalization.HijriCalendar
--------------------------------
बुधवार, 5 जुलाई 2023 3:02:02 pm
System.Globalization.GregorianCalendar
==========
System.Globalization.GregorianCalendar
--------------------------------
1402 تیر 14, چهارشنبه 15:02:02
System.Globalization.PersianCalendar
==========
System.Globalization.PersianCalendar
System.Globalization.GregorianCalendar
System.Globalization.HijriCalendar
--------------------------------

## C# HebrewCalendar

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

In the next example, we print a datetime in all three calendars permitted in the 
Hebrew culture.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;
CultureInfo heCul = CultureInfo.CreateSpecificCulture("he-IL"); 

var now = DateTime.Today;

heCul.DateTimeFormat.Calendar = new GregorianCalendar(); 
Console.WriteLine(now.ToString("D", heCul));

heCul.DateTimeFormat.Calendar = new HebrewCalendar(); 
Console.WriteLine(now.ToString("D", heCul));

heCul.DateTimeFormat.Calendar = new HijriCalendar(); 
Console.WriteLine(now.ToString("D", heCul));

We print the today's date in Hebrew in Gregorian, Hebrew, and Hijri calendars.

$ dotnet run
יום רביעי, 5 ביולי 2023
יום רביעי, ט"ז בתמוז תשפ"ג
יום רביעי, 17 בד׳ו אל־חיג׳ה 1444

## Comparing dates

In the next example, we compare dates in three different cultures.

Program.cs
  

using System.Globalization;

var skCul = new CultureInfo("sk-SK");
var saCul = new CultureInfo("ar-SA");
var faCul = new CultureInfo("fa-IR");

var hc = new HijriCalendar();
var pc = new PersianCalendar();

var now = DateTime.Now;
var tom = now.AddDays(1);

var skd = new DateTime(now.Year, now.Month, now.Day, skCul.Calendar);
var sad = new DateTime(hc.GetYear(tom), hc.GetMonth(tom), hc.GetDayOfMonth(tom), saCul.Calendar);
var fad = new DateTime(pc.GetYear(now), pc.GetMonth(now), pc.GetDayOfMonth(now), faCul.Calendar);

Console.WriteLine(skd == fad);
Console.WriteLine(skd &gt; sad);

In the example, we define a Slovak, Arabic, and Persian cultures. We compare
datetime values in their default calendars.

var skCul = new CultureInfo("sk-SK");
var saCul = new CultureInfo("ar-SA");
var faCul = new CultureInfo("fa-IR");

The  Slovak, Arabic, and Persian CultureInfo objects are defined.

var hc = new HijriCalendar();
var pc = new PersianCalendar();

We define a HijriCalendar for Arabic culture and
PersianCalendar for Persian/Farsi culture. The Slovak culture uses 
the GregorianCalendar.

var now = DateTime.Now;
var tom = now.AddDays(1);

We define two dates. These values are in the GregorianCalendar.

var skd = new DateTime(now.Year, now.Month, now.Day, skCul.Calendar);
var sad = new DateTime(hc.GetYear(tom), hc.GetMonth(tom), hc.GetDayOfMonth(tom), saCul.Calendar);
var fad = new DateTime(pc.GetYear(now), pc.GetMonth(now), pc.GetDayOfMonth(now), faCul.Calendar);

We create three DateTime values in three different calendars.
We use the GetYear, GetMonth, and GetDayOfMonth
methods to get the appropriate values for the specified calendar.

Console.WriteLine(skd == fad);
Console.WriteLine(skd &gt; sad);

We compare the datetime values using the arithmetic operators.

$ dotnet run
True
False

## Source

[Calendar class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.calendar?view=net-8.0)

In this article we have worked with calendars in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).