+++
title = "C# DateTime format"
date = 2025-08-29T19:50:38.580+01:00
draft = false
description = "C# DateTime format tutorial shows how to do formatting of DateTime objects in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# DateTime format

last modified July 5, 2023

 

In this article we show how to do formatting of DateTime objects in C#.

## C# DateTime

The DateTime value type represents dates and times with values
ranging from 00:00:00 (midnight), January 1, 0001 Anno Domini (Common Era)
through 11:59:59 P.M., December 31, 9999 A.D. (C.E.) in the Gregorian calendar.

## Format methods

To format DateTime objects, we can use
DateTime.ToString, String.Format or interpolated
string syntax such as $"{now:D}".

## C# standard format specifiers

A standard datetime format string uses a single character format specifier to
define the text representation of a DateTime value. For instance, the
D format specifier denotes a long date format.

    
    SpecifierMeaningExample
    Dlong dateSaturday, March 26, 2022
    dshort date3/26/2022
    Ffull date longSaturday, March 26, 2022 12:59:46 PM
    ffull date shortSaturday, March 26, 2022 12:59 PM
    Ggeneral long3/26/2022 12:59:46 PM
    ggeneral short3/26/2022 12:59 PM
    Uuniversal fullSaturday, March 26, 2022 11:59:46 AM
    uuniversal sortable2022-03-26 12:59:46Z
    ssortable2022-03-26T12:59:46
    Tlong time12:59:46 PM
    tshort time12:59 PM
    OISO 86012022-03-26T12:59:46.7831825+01:00
    RRFC 1123Sat, 26 Mar 2022 12:59:46 GMT
    MmonthMarch 26
    Yyear monthMarch 2022
    

The table lists standard datetime format specifiers in C#.

Program.cs
  

var now = DateTime.Now;

Console.WriteLine(now.ToString("D"));
Console.WriteLine(now.ToString("d"));
Console.WriteLine(now.ToString("F"));
Console.WriteLine(now.ToString("f"));
Console.WriteLine(now.ToString("G"));
Console.WriteLine(now.ToString("g"));
Console.WriteLine(now.ToString("U"));
Console.WriteLine(now.ToString("u"));
Console.WriteLine(now.ToString("s"));
Console.WriteLine(now.ToString("T"));
Console.WriteLine(now.ToString("t"));
Console.WriteLine(now.ToString("O"));
Console.WriteLine(now.ToString("R"));
Console.WriteLine(now.ToString("M"));
Console.WriteLine(now.ToString("Y"));

In the example, we use standard datetime format specifiers in the
DateTime.ToString method to print the current datetime.

$ dotnet run 
Saturday, March 26, 2022
3/26/2022
Saturday, March 26, 2022 1:15:12 PM
Saturday, March 26, 2022 1:15 PM
3/26/2022 1:15:12 PM
3/26/2022 1:15 PM
Saturday, March 26, 2022 12:15:12 PM
2022-03-26 13:15:12Z
2022-03-26T13:15:12
1:15:12 PM
1:15 PM
2022-03-26T13:15:12.6729121+01:00
Sat, 26 Mar 2022 13:15:12 GMT
March 26
March 2022

Program.cs
  

```
var now = DateTime.Now;

Console.WriteLine($"{now:D}");
Console.WriteLine($"{now:d}");
Console.WriteLine($"{now:F}");
Console.WriteLine($"{now:f}");
Console.WriteLine($"{now:G}");
Console.WriteLine($"{now:g}");
Console.WriteLine($"{now:U}");
Console.WriteLine($"{now:u}");
Console.WriteLine($"{now:s}");
Console.WriteLine($"{now:T}");
Console.WriteLine($"{now:t}");
Console.WriteLine($"{now:O}");
Console.WriteLine($"{now:R}");
Console.WriteLine($"{now:M}");
Console.WriteLine($"{now:Y}");

```

In the example, we use standard datetime format specifiers inside interpolated
strings to print the current datetime.

## C# culture-specific standard format specifiers

We can pass the CultureInfo to the formatting method.

Program.cs
  

using System.Globalization;

var now = DateTime.Now;

var ci = CultureInfo.CreateSpecificCulture("sk-SK");
CultureInfo.DefaultThreadCurrentCulture = ci;

Console.WriteLine(now.ToString("D"));
Console.WriteLine(now.ToString("d"));
Console.WriteLine(now.ToString("F"));
Console.WriteLine(now.ToString("f"));
Console.WriteLine(now.ToString("G"));
Console.WriteLine(now.ToString("g"));
Console.WriteLine(now.ToString("U"));
Console.WriteLine(now.ToString("u"));
Console.WriteLine(now.ToString("s"));
Console.WriteLine(now.ToString("T"));
Console.WriteLine(now.ToString("t"));
Console.WriteLine(now.ToString("O"));
Console.WriteLine(now.ToString("R"));
Console.WriteLine(now.ToString("M"));
Console.WriteLine(now.ToString("Y"));

In the example, we print the current datetime with the standard datetime format 
specifiers for the Slovak culture.

$ dotnet run 
sobota 26. marca 2022
26. 3. 2022
sobota 26. marca 2022 13:22:00
sobota 26. marca 2022 13:22
26. 3. 2022 13:22:00
26. 3. 2022 13:22
sobota 26. marca 2022 12:22:00
2022-03-26 13:22:00Z
2022-03-26T13:22:00
13:22:00
13:22
2022-03-26T13:22:00.4524483+01:00
Sat, 26 Mar 2022 13:22:00 GMT
26. marca
marec 2022

## C# custom datetime format specifiers

Custom datetime format specifiers are additional specifiers that allow us 
to build our own datetime formats.

    
    SpecifierMeaning
    dThe day of the month, from 1 through 31.
    ddThe day of the month, from 01 through 31.
    dddThe abbreviated name of the day of the week.
    ddddThe full name of the day of the week.
    fThe tenths of a second in a date and time value.
    ffThe hundredths of a second in a date and time value.
    fffThe milliseconds in a date and time value.
    ffffThe ten thousandths of a second in a date and time value.
    fffffThe hundred thousandths of a second in a date and time value..
    ffffffThe hundredths of a second in a date and time value.
    fffffffThe millionths of a second in a date and time value.
    ffffffffThe ten millionths of a second in a date and time value.
    g/ggThe period or era.
    hThe hour, using a 12-hour clock from 1 to 12.
    hhThe hour, using a 12-hour clock from 01 to 12.
    HThe hour, using a 24-hour clock from 0 to 23.
    HHThe hour, using a 24-hour clock from 00 to 23.
    KTime zone information.
    mThe minute, from 0 through 59.
    mmThe minute, from 00 through 59.
    MThe month, from 1 through 12.
    MMThe month, from 01 through 12.
    MMMThe abbreviated name of the month.
    MMMMThe full name of the month.
    sThe second, from 0 through 59.
    ssThe second, from 00 through 59.
    tThe first character of the AM/PM designator.
    ttThe AM/PM designator.
    yThe year, from 0 to 99.
    yyThe year, from 00 to 99.
    yyyThe year, with a minimum of three digits.
    yyyyThe year as a four-digit number.
    yyyyyThe year as a five-digit number.
    zHours offset from UTC, with no leading zeros.
    zzHours offset from UTC, with a leading zero for a single-digit value.
    zzzHours and minutes offset from UTC.
    

The table shows custom datetime format specifiers in C#.

Program.cs
  

var now = DateTime.Now;

Console.WriteLine(now.ToString("M/d/yy"));
Console.WriteLine(now.ToString("MM/dd/yyyy"));
Console.WriteLine(now.ToString("yy-MM-dd"));
Console.WriteLine(now.ToString("yy-MMM-dd ddd"));
Console.WriteLine(now.ToString("yyyy-M-d dddd"));
Console.WriteLine(now.ToString("yyyy MMMM dd"));
Console.WriteLine(now.ToString("h:mm:ss tt zzz"));
Console.WriteLine(now.ToString("HH:m:s tt zzz"));
Console.WriteLine(now.ToString("hh:mm:ss t z"));
Console.WriteLine(now.ToString("HH:mm:ss tt zz"));

In the example, we build a few custom datetime formats.

$ dotnet run
3/26/22
03/26/2022
22-03-26
22-Mar-26 Sat
2022-3-26 Saturday
2022 March 26
1:44:03 PM +01:00
13:44:3 PM +01:00
01:44:03 P +1
13:44:03 PM +01

## Parse datetime strings with format specifiers

Both standard and custom DateTime format specifiers can be used
when parsing datetime strings into DateTime objects.

Program.cs
  

using System.Globalization;

var ds = "Thu Nov 11, 2021";
var dt = DateTime.ParseExact(ds, "ddd MMM dd, yyyy", CultureInfo.CurrentCulture);
Console.WriteLine(dt);

var ds2 = "10/22/2021";
var dt2 = DateTime.ParseExact(ds2, "d", CultureInfo.CurrentCulture);
Console.WriteLine(dt2);

In the example, we pass datetime format specifiers to the
DateTime.ParseExact method.

$ dotnet run
11/11/2021 12:00:00 AM
10/22/2021 12:00:00 AM

## Source

[Custom date and time format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)

In this article we have formatted DateTime objects in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).