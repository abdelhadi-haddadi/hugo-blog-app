+++
title = "C# TimeSpan"
date = 2025-08-29T19:51:33.393+01:00
draft = false
description = "C# TimeSpan tutorial shows how to work with TimeSpan structure in C#. A TimeSpan represents a time interval."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# TimeSpan

last modified July 5, 2023

 

In this article we work with TimeSpan in C#.

TimeSpan represents a time interval (duration of time or elapsed
time) that is measured as a positive or negative number of days, hours, minutes,
seconds, and fractions of a second.

The value of a TimeSpan object can range from
TimeSpan.MinValue to TimeSpan.MaxValue. The largest
unit of time that TimeSpan measures is a day. It cannot be
expressed in terms of years or months, because these have variable number of
units. For example, a month can have 28, 29, 30, or 31 days.

Constructor
Description

TimeSpan(Int64)
instance initialized to the specified number of ticks

TimeSpan(Int32, Int32, Int32)
instance initialized to the specified number of hours, minutes, and seconds

TimeSpan(Int32, Int32, Int32, Int32)
instance initialized to the specified number of days, hours, minutes, and seconds

TimeSpan(Int32, Int32, Int32, Int32, Int32)
instance initialized to the specified number of  days, hours, minutes, seconds, and milliseconds

TimeSpan(Int32, Int32, Int32, Int32, Int32, Int32)
instance initialized to the specified number of days, hours, minutes, seconds, and milliseconds, and microseconds

Table: TimeSpan constructors

## C# TimeSpan simple example

The following is a simple example that uses TimeSpan.

Program.cs
  

TimeSpan ts1 = new TimeSpan(2, 4, 5);
Console.WriteLine(ts1);

TimeSpan ts2 = new TimeSpan(2, 4, 5, 9);
Console.WriteLine(ts2);

Console.WriteLine(TimeSpan.TicksPerDay);
Console.WriteLine(TimeSpan.TicksPerHour);
Console.WriteLine(TimeSpan.TicksPerMinute);

Console.WriteLine(TimeSpan.MinValue);
Console.WriteLine(TimeSpan.MaxValue);

In the program, we create two instances of TimeSpan structs, print
the number of tics per day, hour and minute, and print TimeSpan's
min and max values.

$ dotnet run
02:04:05
2.04:05:09
864000000000
36000000000
600000000
-10675199.02:48:05.4775808
10675199.02:48:05.4775807

## C# TimeSpan basic arithmetic

We can use some basic arithmetic operations on TimeSpan objects.

Program.cs
  

TimeSpan ts = new TimeSpan(2, 4, 5, 5);
Console.WriteLine(ts);

TimeSpan ts2 = new TimeSpan(4, 1, 0, 0);
Console.WriteLine(ts2);

var res = ts + ts2;
Console.WriteLine(res);

var res2 = ts * 2;
Console.WriteLine(res2);

var res3 = ts2 - ts;
Console.WriteLine(res3);

In the program, we add, multiply, and subtractTimeSpan structs.

$ dotnet run
2.04:05:05
4.01:00:00
6.05:05:05
4.08:10:10
1.20:54:55

In the next example, we use a TimeSpan with DateTime.

Program.cs
  

var now = DateTime.Now;
var ts = new TimeSpan(2, 4, 5);

var res = now.Add(ts);
var res2 = now.Subtract(ts);

Console.WriteLine(now);
Console.WriteLine(res);
Console.WriteLine(res2);

In the program, we get the current datetime. We add and subtract a
TimeSpan value.

$ dotnet run
10/12/2022 8:23:57 PM
10/12/2022 10:28:02 PM
10/12/2022 6:19:52 PM

## C# TimeSpan From methods

TimeSpan has convenient methods for creating instances from a 
single value. 

Program.cs
  

var ts1 = TimeSpan.FromDays(2.7);
Console.WriteLine(ts1);

var ts2 = TimeSpan.FromHours(4.5);
Console.WriteLine(ts2);

var ts3 = TimeSpan.Minutes(12.5);
Console.WriteLine(ts3);

var res = ts1 + ts2 + ts3;
Console.WriteLine(res);

The program uses the TimeSpan.FromDays,
TimeSpan.FromHours, and TimeSpan.FromMinutes.

$ dotnet run
2.16:48:00
04:30:00
00:12:30
2.21:30:30

## Borodino battle

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
76736 days have passed since the Battle of Borodino.

On October 12, 2022, 76736 days have passed since the Battle of Borodino.

## Source

[TimeSpan struct - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.timespan?view=net-8.0)

In this article we have worked with TimeSpan structure in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).