+++
title = "C# DateOnly"
date = 2025-08-27T23:22:55.179+01:00
draft = false
description = "C# DateOnly tutorial shows how to work with DateOnly type in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# DateOnly

last modified July 5, 2023

 

In this article we show how to work with the DateOnly type in C#.

DateOnly represents dates with values ranging from January 1, 0001
Common Era through December 31, 9999 Commmon Era in the Gregorian calendar.
Similarly, TimeOnly represents a time of day.

DateOnly is a struct located in the System namespace.
It was introduced in .NET 6.

## C# DateOnly simple example

The following is a simple example with DateOnly.

Program.cs
  

using System.Globalization;

DateOnly d1 = new DateOnly(2022, 10, 12);
Console.WriteLine(d1);

DateOnly d2 = new DateOnly(2022, 10, 12, new GregorianCalendar());
Console.WriteLine(d2);

DateOnly d3 = new DateOnly(2022, 10, 12, new JulianCalendar());
Console.WriteLine(d3);

The program creates three instances of DateOnly.

DateOnly d1 = new DateOnly(2022, 10, 12);

In the first case, the constructor takes year, month, and date parameters.

DateOnly d2 = new DateOnly(2022, 10, 12, new GregorianCalendar());

In the second case, the constructor also takes the calendar as a parameter.

$ dotner run
10/12/2022
10/12/2022
10/25/2022

## C# DateOnly min &amp; max values

The DateOnly.MaxValue returns the latest possible date that can be
created. The DateOnly.MinValue gets the earliest possible date that
can be created.

Program.cs
  

DateOnly maxVal = DateOnly.MaxValue;
DateOnly minVal = DateOnly.MinValue;

Console.WriteLine(minVal);
Console.WriteLine(maxVal);

The program prints the minimum and maximum values a DateOnly
type can represent.

$ dotnet run
1/1/0001
12/31/9999

## C# compare DateOnly

We can compare DateTime instances with relational operators.

Program.cs
  

DateOnly d1 = new DateOnly(2022, 10, 12);
DateOnly d2 = new DateOnly(2022, 11, 12);

if (d1 &lt; d2) {
    Console.WriteLine($"{d1} is before {d2}");
} else {
    Console.WriteLine($"{d1} is after {d2}");
}

The program compares two DateTime types with &lt;
operator.

$ dotnet run
10/12/2022 is before 11/12/2022

## C# DateOnly.FromDateTime

The DateOnly.FromDateTime method creates a DateOnly
instance from a DateTime object.

Program.cs
  

DateTime now = DateTime.Now;
Console.WriteLine(now);

DateOnly d = DateOnly.FromDateTime(now);
Console.WriteLine(d);

TimeOnly t = TimeOnly.FromDateTime(now);
Console.WriteLine(t);

The program computes the current datetime and takes a date and time from it.

DateOnly d = DateOnly.FromDateTime(now);
Console.WriteLine(d);

We retrieve the date part with DateOnly.FromDateTime.

TimeOnly t = TimeOnly.FromDateTime(now);

We retrieve the time part with TimeOnly.FromDateTime.

$ dotnet run
10/13/2022 5:31:17 PM
10/13/2022
5:31 PM

## C# DateOnly short and long dates

The default DateOnly format is a short date string. With the
ToLongDateString method, we get a long date string representation.

Program.cs
  

DateOnly d = new DateOnly(2022, 10, 12);

Console.WriteLine(d);
Console.WriteLine(d.ToShortDateString());
Console.WriteLine(d.ToLongDateString());

The program prints a DateOnly in short and long date formats.

$ dotnet run
10/12/2022
10/12/2022
Wednesday, October 12, 2022

## C# DateOnly add years, months and days

The AddYears, AddMonths, and AddDays
methods add years, months, and days to DateTime instances.

Program.cs
  

DateOnly d = new DateOnly(2022, 10, 10);
var res1 = d.AddYears(2).AddMonths(11).AddDays(3);
Console.WriteLine(res1);

var res2 = d.AddYears(-2).AddMonths(-11).AddDays(-3);
Console.WriteLine(res2);

In the program, we use these three methods.

$ dotnet run
9/13/2025
11/7/2019

## C# DateTime TryParse

The TryParse method converts a string to a DateTime.

Program.cs
  

using System.Globalization;

if (DateOnly.TryParse("10/9/2022", new CultureInfo("en-US"),
    DateTimeStyles.None, out var res))
{
    Console.WriteLine(res.ToLongDateString());
}

if (DateOnly.TryParse("10/9/2022", new CultureInfo("sk-SK"),
    DateTimeStyles.None, out var res2))
{
    Console.WriteLine(res2.ToLongDateString());
}

The 10/9/2022 date format has a different meaning in US and Slovak 
cultures.

$ dotnet run
Sunday, October 9, 2022
Saturday, September 10, 2022

## Source

[DateOnly struct](https://learn.microsoft.com/en-us/dotnet/api/system.dateonly?view=net-8.0)

In this article we have shown how to work with DateOnly type in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).