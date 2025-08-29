+++
title = "C# TimeZoneInfo"
date = 2025-08-29T19:51:34.504+01:00
draft = false
description = "C# TimeZoneInfo tutorial shows how to work with time zones in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# TimeZoneInfo

last modified August 21, 2023

 

In this article we work time zones in C#. 

A time zone is a geographical region in which the same time is used.
For instance, in Bratislava, Prague, or Budapest the 
*Central Europe Standard Time* is used. 

TimeZoneInfo is the main class for working with time zones in C#.
It is an improvement over the limited TimeZone. It allows us to
enumerate available time zones in the system, retrieve a time zone defined by
the operating system, convert times between different time zones, or serializing
a time zone for later usage.

## C# TimeZoneInfo.GetSystemTimeZones

The TimeZoneInfo.GetSystemTimeZones returns a sorted collection of
all the time zones available on the local system.

Program.cs
  

using System.Collections.ObjectModel;

ReadOnlyCollection&lt;TimeZoneInfo&gt; zones = TimeZoneInfo.GetSystemTimeZones();

foreach (TimeZoneInfo zone in zones)
{
    Console.WriteLine(zone.Id);
}

The program retrieves and print all the available system time zones. 

$ dotnet run
Dateline Standard Time
UTC-11
Aleutian Standard Time
Hawaiian Standard Time
Marquesas Standard Time
Alaskan Standard Time
UTC-09
Pacific Standard Time (Mexico)
UTC-08
Pacific Standard Time
...

## C# TimeZoneInfo.Local

The TimeZoneInfo.Local property returns a TimeZoneInfo
object that represents the local time zone.

Program.cs
  

TimeZoneInfo local = TimeZoneInfo.Local;
Console.WriteLine(local.DisplayName);
Console.WriteLine(local.Id);
Console.WriteLine(local.DaylightName);
Console.WriteLine(local.SupportsDaylightSavingTime);

In the program, we print the DisplayName, Id,
DaylightName, and SupportsDaylightSavingTime
properties of the local TimeZoneInfo object.

$ dotnet run 
(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
Central Europe Standard Time
Central Europe Daylight Time
True

## C# TimeZoneInfo.FindSystemTimeZoneById

The TimeZoneInfo.FindSystemTimeZoneById creates a new instance of 
TimeZoneInfo based on the given identifier.

Program.cs
  

TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("Russian Standard Time");

Console.WriteLine(tzi.DisplayName);
Console.WriteLine(tzi.Id);
Console.WriteLine(tzi.StandardName);
Console.WriteLine(tzi.SupportsDaylightSavingTime);

In the program, we create a timezone object for the Russian Standard Time and 
print its basic properties.

$ dotnet run 
(UTC+03:00) Moscow, St. Petersburg
Russian Standard Time
Russia TZ 2 Standard Time
True

## C# TimeZoneInfo.ConvertTime

The TimeZoneInfo.ConvertTime converts a time to the time in the
given time zone.

Program.cs
  

Console.WriteLine(TimeZoneInfo.Local);
DateTime now = DateTime.Now;
Console.WriteLine(now);

Console.WriteLine("-----------------------------------");

TimeZoneInfo tzi = TimeZoneInfo.FindSystemTimeZoneById("Russian Standard Time");
Console.WriteLine(tzi.DisplayName);
DateTime target = TimeZoneInfo.ConvertTime(now, tzi);
Console.WriteLine(target);

We get the current local datetime and convert it into the Russian Standard Time.

$ dotnet run 
(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
8/21/2023 4:43:35 PM
-----------------------------------
(UTC+03:00) Moscow, St. Petersburg
8/21/2023 5:43:35 PM

## Source

[TimeZoneInfo class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.timezoneinfo?view=net-8.0)

In this article we have worked with time zones in C# using
TimeZoneInfo.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).