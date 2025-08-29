+++
title = "C# DateTime parse"
date = 2025-08-27T23:22:56.327+01:00
draft = false
description = "C# DateTime parse tutorial shows how to convert 
datetime strings into DateTime objects in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# DateTime parse

last modified July 5, 2023

 

C# DateTime parse tutorial shows how to convert strings into DateTime objects
in C#.

## C# DateTime

The DateTime value type represents dates and times with values
ranging from 00:00:00 (midnight), January 1, 0001 Anno Domini (Common Era)
through 11:59:59 P.M., December 31, 9999 A.D. (C.E.) in the Gregorian calendar.

## Parse methods

The DateTime.Parse converts the datetime string into a
DateTime. It automatically tries to figure out the datetime format.

The DateTime.ParseExact method converts the specified string
representation of a datetime to a DateTime. The datetime string
format must match the specified format exactly; otherwise an exception is
thrown.

Date &amp; time is culture specific; the methods either use the current culture or 
accept a specific culture.

## C# DateTime.Parse

We use DateTime.Parse to converts datetime strings into
DateTime.

Program.cs
  

string[] dates = {
    "03/19/2021 07:20:58",
    "03/19/2021",
    "3/2021",
    "3/21",
    "4 AM",
    "2021-03-19T05:20:12.0000000Z",
    "2021-03-19T05:20:12.0000000-05:00",
    "Fri, 19 Mar 2021 05:20:12 GMT",
    "2021-03-19 05:20:12 -5:00",
};

foreach (var ds in dates)
{
    var dt = DateTime.Parse(ds);
    Console.WriteLine(dt);
}

We have a bunch of datetime strings in an array. We convert them into
DateTime objects with DateTime.Parse.

$ dotnet run
3/19/2021 7:20:58 AM
3/19/2021 12:00:00 AM
3/1/2021 12:00:00 AM
3/21/2022 12:00:00 AM
3/24/2022 4:00:00 AM
3/19/2021 6:20:12 AM
3/19/2021 11:20:12 AM
3/19/2021 6:20:12 AM
3/19/2021 11:20:12 AM

## C# DateTime.ParseExact

With DateTime.ParseExact, we explicitly specify the format of the 
datetime string.

Program.cs
  

using System.Globalization;

var ds = "Thu Nov 11, 2021";
var dt = DateTime.ParseExact(ds, "ddd MMM dd, yyyy", CultureInfo.CurrentCulture);
Console.WriteLine(dt);

var ds2 = "10-22-2015";
var dt2 = DateTime.ParseExact(ds2, "MM-dd-yyyy", CultureInfo.CurrentCulture);
Console.WriteLine(dt2);

The second parameter of the DateTime.ParseExact is the format of 
the datetime string. The third parameter is the culture.

$ dotnet run
11/11/2021 12:00:00 AM
10/22/2015 12:00:00 AM

## C# DateTime FormatException

If the DateTime.Parse method fails, it throws a
FormatException.

Program.cs
  

string ds = "11/31/2021";

try
{
    DateTime dt = DateTime.Parse(ds);
    Console.WriteLine($"{dt:d MMMM, yyyy}");
}
catch (FormatException e)
{
    Console.WriteLine("failed to parse string");
    Console.WriteLine(e);
}

In the example, we handle a FormatException.

$ dotnet run
failed to parse string
System.FormatException: String '11/31/2021' was not recognized as a valid DateTime.
...

## C# DateTime.TryParse

The DateTime.TryParse method converts the specified datetime string
into DateTime. It returns a boolean value that indicates whether
the conversion succeeded. It parses the string into its parameter.

Program.cs
  

string ds = "11/31/2021";

DateTime dt;
var ok = DateTime.TryParse(ds, out dt);

if (ok)
{
    Console.WriteLine($"{dt:d MMMM, yyyy}");
}
else
{
    Console.WriteLine("failed to parse datetime string");
}

In the example, we try to parse a datetime string. If the methods succeeds, 
we print the parsed object; otherwise, we print an error message that it failed.

## C# DateTime.Parse with CultureInfo

Dates and times are culture specific. We need to pass the culture information 
to the parsing methods in case of non-default culture used. 

Program.cs
  

using System.Globalization;

string[] dates =
{
    "piatok 12. novembra 2021 8:34:10",
    "12. 11. 2021",
    "pi, 12 nov 2021",
};

var skSk = new CultureInfo("sk-SK");
CultureInfo.DefaultThreadCurrentCulture = skSk;

foreach (var ds in dates)
{
    var dt = DateTime.Parse(ds, skSk);
    Console.WriteLine(dt);
}

In the example, we parse three dates written in Slovak culture. The culture is 
passed as the second parameter of the DateTime.Parse method.

$ dotnet run
12. 11. 2021 8:34:10
12. 11. 2021 0:00:00
12. 11. 2021 0:00:00

## C# parse Last-Modified header value

The Last-Modified response HTTP header contains a datetime when the
origin server believes the resource was last modified.

Program.cs
  

var url = "http://webcode.me";
using var client = new HttpClient();
var res = await client.GetAsync(url);

string lm = res.Content.Headers.GetValues("Last-Modified").First();
Console.WriteLine(lm);

var lmd = DateTime.Parse(lm);
Console.WriteLine(lmd);

In the example, we parse the Last-Modified header value of an HTTP
response.

$ dotnet run 
Sun, 23 Jan 2022 10:39:25 GMT
1/23/2022 11:39:25 AM

## Source

[DateTime.Parse method](https://learn.microsoft.com/en-us/dotnet/api/system.datetime.parse?view=net-8.0)

In this article we have parsed strings into DateTime objects in C#. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).