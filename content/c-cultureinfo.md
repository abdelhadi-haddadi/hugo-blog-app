+++
title = "C# CultureInfo"
date = 2025-08-27T23:22:54.033+01:00
draft = false
description = "C# CultureInfo tutorial shows how to globalize
applications in C# with CultureInfo. CultureInfo provides information about
a specific culture."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# CultureInfo

last modified January 19, 2024

 

In this article we show how to globalize appications in C# with CultureInfo.

Globalization is the process of designing the application in such a
way that it can be used by users from across the globe (for multiple cultures).
Localization is the process of customizing the application to a
specific culture.

**Note:** These terms may have different meanings in other
programming languages or platforms.

## Types of cultures

Neutral culture is a culture that is associated with a language but
not with a country or region. Specific culture is a culture that is
associated with both a language and a country or region. For example,
fr is the name for the neutral French culture, while
fr-FR is the name for the French culture in France.

Invariant culture is culture-insensitive; it is associated with the
English language (for historical reasons) but not with any country/region. We
specify the invariant culture by name by using an empty string ("") in the call
to a CultureInfo instantiation method.

CultureInfo.InvariantCulture also retrieves an instance of the
invariant culture. Invariant culture is used for storing strings from a variety
of cultures in a way where they are not tied to any language or culture. For
instance, we can use invariant culture when persisting dates and times.

## C# CultureInfo

CultureInfo provides information about a specific culture. The
information includes the names for the culture, the writing system, the calendar
used, the sort order of strings, and formatting for dates and numbers.

using System.Globalization;

The CultureInfo is part of the System.Globalization
namespace.

## C# current culture

The CultureInfo.DefaultThreadCurrentCulture property gets
or sets the default culture for threads in the current application domain.

Program.cs
  

using System.Globalization;

double val = 1235.56;

Console.WriteLine($"Current culture: {CultureInfo.CurrentCulture.Name}");
Console.WriteLine(val);

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");

Console.WriteLine($"Current culture: {CultureInfo.CurrentCulture.Name}");
Console.WriteLine(val);

The example prints a value in two cultures.

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");

We set the default culture to de-DE.

$ dotnet run
Current culture: en-US
1235.56
Current culture: de-DE
1235,56

The two values have different decimal separators.

## C# list cultures

The CultureInfo.GetCultures gets the list of supported cultures
filtered by the specified culture type parameter.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("{0,-15}{0,-5}{0,-45}{0,-40}", "Culture", "ISO",
    "Display name", "English Name");

foreach (CultureInfo ci in CultureInfo.GetCultures(CultureTypes.AllCultures))
{
    Console.Write("{0,-15}", ci.Name);
    Console.Write("{0,-5}", ci.TwoLetterISOLanguageName);
    Console.Write("{0,-45}", ci.DisplayName);
    Console.WriteLine("{0,-40}", ci.EnglishName);
}

The example lists all installed .NET cultures.

Console.OutputEncoding = System.Text.Encoding.UTF8;

To be able to show various display names of cultures, we set the output encoding
to UTF8. In addition, the terminal must have a font that is able to display all
these languages.

With the CultureTypes.SpecificCultures filter parameter, we get all
specific cultures. With CultureTypes.NeutralCultures, we get all
neutral cultures.

Program.cs
  

using System.Globalization;
using static System.Globalization.CultureTypes;

Console.WriteLine($".NET version: {Environment.Version}");

CultureInfo[] specificCultures = CultureInfo.GetCultures(SpecificCultures);
Console.WriteLine($"{specificCultures.Length} specific cultures in .NET");

CultureInfo[] neutralCultures = CultureInfo.GetCultures(NeutralCultures);
Console.WriteLine($"{neutralCultures.Length} neutral cultures in .NET");

The example prints the number of specific and neutral cultures in .NET.

$ dotnet run
.NET version: 8.0.1
593 specific cultures in .NET
276 neutral cultures in .NET

## C# invariant culture

Invariant culture is culture independent. We use it when we persist
culture information, such as dates. Saving dates in culture-independent way
allows us to parse the values later easily.

Program.cs
  

using System.Globalization;

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");

DateTime[] dates = [
    new (2019, 10, 9),
    new (2020, 1, 2)
];

using var sw = new StreamWriter(@"dates.dat");
sw.Write(string.Format(CultureInfo.InvariantCulture,
    "{0:d}|{1:d}", dates[0], dates[1]));

The example writes two dates with CultureInfo.InvariantCulture format.

sw.Write(String.Format(CultureInfo.InvariantCulture,
    "{0:d}|{1:d}", dates[0], dates[1]));

We pass the CultureInfo.InvariantCulture to the
String.Format method.

$ cat dates.dat
10/09/2019|01/02/2020

This are the file contents.

Program.cs
  

using System.Globalization;

using var sr = new StreamReader("dates.dat");
string contents = sr.ReadToEnd();
string[] dateStrings = contents.Split('|');

Console.WriteLine($"Current Culture: {CultureInfo.CurrentCulture.Name}");

foreach (var dateStr in dateStrings)
{
    DateTime dateVal;
    if (DateTime.TryParse(dateStr, CultureInfo.InvariantCulture,
                          DateTimeStyles.None, out dateVal))
    {
        Console.WriteLine("The date is {0:D}", dateVal);
    }
    else
    {
        Console.WriteLine("ERROR: Unable to parse {0}", dateStr);
    }
}

Console.WriteLine();

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");
Console.WriteLine($"Current Culture: {CultureInfo.CurrentCulture.Name}");

foreach (var dateStr in dateStrings)
{
    DateTime dateVal;
    if (DateTime.TryParse(dateStr, CultureInfo.InvariantCulture,
                          DateTimeStyles.None, out dateVal))
    {
        Console.WriteLine("Dátum je {0:D}", dateVal);
    }
    else
    {
        Console.WriteLine("ERROR: Unable to parse {0}", dateStr);
    }
}

In the example, we restore the data and display the dates in two different
cultures.

if (DateTime.TryParse(dateStr, CultureInfo.InvariantCulture,
                      DateTimeStyles.None, out dateVal))
{
...

We pass the CultureInfo.InvariantCulture as the second
paramter of the TryParse method.

$ dotnet run
Current Culture: en-US
The date is Wednesday, October 9, 2019
The date is Thursday, January 2, 2020

Current Culture: sk-SK
Dátum je streda 9. októbra 2019
Dátum je štvrtok 2. januára 2020

## C# CultureInfo sorting

Sorting strings is culture specific. Setting the correct culture for
the language will do the correct sorting.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");

List&lt;string&gt; words = [ "čaj", "auto", "drevo", "cibuľa",
        "čučoriedka", "banán", "čerešňa", "červený", "čierny", "cesnak" ];

words.Sort();

foreach (var word in words)
{
    Console.WriteLine(word);
}

The example has a list of Slovak words. Setting the correct culture will sort
the words according to the rules of the Slovak language.

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");

We set the Slovak culture.

List&lt;string&gt; words = [ "čaj", "auto", "drevo", "cibuľa",
    "čučoriedka", "banán", "čerešňa", "červený", "čierny", "cesnak" ];

We have a list of Slovak words.

words.Sort();

We sort the words. The Sort method takes the culture into account
when sorting the data.

$ dotnet run
auto
banán
cesnak
cibuľa
čaj
čerešňa
červený
čierny
čučoriedka
drevo

In the Slovak language, the č letter goes after the c letter. English sorting
would not make a difference between these two letters.

## NumberFormatInfo

The NumberFormatInfo provides culture-specific information for
formatting and parsing numeric values.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = Encoding.UTF8;

CultureInfo sci = new("sk-SK");
NumberFormatInfo nfi = sci.NumberFormat;

Console.WriteLine(nfi.CurrencyDecimalDigits);
Console.WriteLine(nfi.CurrencyDecimalSeparator);
Console.WriteLine(nfi.CurrencySymbol);

Console.WriteLine(nfi.PercentSymbol);
Console.WriteLine(nfi.PerMilleSymbol);

Console.WriteLine(nfi.NumberDecimalSeparator);
Console.WriteLine(nfi.NumberGroupSeparator);

The example shows number format information for the Slovak culture including
currency decimal separator, percent symbol, and number group separator.

NumberFormatInfo nfi = sci.NumberFormat;

The NumberFormatInfo is retrived from the NumberFormat
property of the CultureInfo object.

$ dotnet run
2
,
€
%
‰
,

## C# CultureInfo percentage

There are two different characters that are used for a percent sign. The percent
sign might have a space and can be written before or after the value. Also, the
default number of decimal digits differ.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = Encoding.UTF8;

double v = 0.68;

var trCi = new CultureInfo("tr");
CultureInfo.DefaultThreadCurrentCulture = trCi;
Console.WriteLine(trCi.NumberFormat.PercentDecimalDigits);
Console.WriteLine(v.ToString("P"));

Console.WriteLine("-------------------------");

var skCi = new CultureInfo("sk-SK");
CultureInfo.DefaultThreadCurrentCulture = skCi;
Console.WriteLine(skCi.NumberFormat.PercentDecimalDigits);
Console.WriteLine(v.ToString("P"));

Console.WriteLine("-------------------------");

var peCi = new CultureInfo("fa-IR");
CultureInfo.DefaultThreadCurrentCulture = peCi;
Console.WriteLine(peCi.NumberFormat.PercentDecimalDigits);
Console.WriteLine(v.ToString("P"));

The example displays percentages in Turkish, Slovak, and Persian cultures.

Console.WriteLine(trCi.NumberFormat.PercentDecimalDigits);

The NumberFormat's PercentDecimalDigits returns the
number of decimal places used in percent values.

Console.WriteLine(v.ToString("P"));

The P specifier shows a number multiplied by 100 and displayed with
a percent symbol.

$ dotnet run
3
%68,000
-------------------------
2
68,00 %
-------------------------
3
68٫000٪

## C# CultureInfo decimal separator

Cultures use decimal point (Israel, Japan, UK) or comma (Slovakia, France,
Germany) as decimal separators. Persian uses a forward slash (/).

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

decimal val = 1278.112m;

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");
Console.WriteLine($"{val}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
Console.WriteLine($"{val}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("fa-IR");
Console.WriteLine($"{val}");

The example prints a decimal value in three different cultures.

$ dotnet run
1278,112
1278.112
1278٫112

## C# CultureInfo thousands separator

Cultures use different ways to group digits with a delimiter for ease of
reading.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

int val = 12_156_320;

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");
Console.WriteLine($"{val:N}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
Console.WriteLine($"{val:N}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-CH");
Console.WriteLine($"{val:N}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("hi-IN");
Console.WriteLine($"{val:N}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("es-ES");
Console.WriteLine($"{val:N}");

The example prints a integer value in five different cultures.

$ dotnet run
12 156 320,000
12,156,320.000
12'156'320.000
1,21,56,320.000
12.156.320,000

## C# CultureInfo currency

Cultures use different currency symbols. The symbol can be prepended or appended
to the currency value.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

decimal val = 12_156_320.54m;

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("sk-SK");
Console.WriteLine($"{val:c}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("ff-NG");
Console.WriteLine($"{val:c}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("fil-PH");
Console.WriteLine($"{val:c}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("zh-CN");
Console.WriteLine($"{val:c}");

CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
Console.WriteLine($"{val:c}");

The example prints currency value in five cultures.

$ dotnet run
12 156 320,54 €
12 156 320,54 NGN
₱12,156,320.54
¥12,156,320.54
$12,156,320.54

## CultureInfo Calendar

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
1402 دی 29, جمعه 22:31:07
2024 ژانویهٔ 19, جمعه 22:31:07
1445 رجب 9, جمعه 22:31:07

## C# CultureInfo first day of week

The first day of the week in cultures is Sunday, Monday, or Saturday.

Program.cs
  

using System.Globalization;

var enUs = new CultureInfo("en-US");

var firstDay = enUs.DateTimeFormat.FirstDayOfWeek.ToString();
var name = enUs.DisplayName;
Console.WriteLine($"First day of the week in {name}: {firstDay}");

var skSk = new CultureInfo("sk-Sk");

var name2 = skSk.DisplayName;
var firstDay2 = skSk.DateTimeFormat.FirstDayOfWeek.ToString();
Console.WriteLine($"First day of the week in {name2}:: {firstDay2}");

var faIr = new CultureInfo("fa-IR");

var name3 = faIr.DisplayName;
var firstDay3 = faIr.DateTimeFormat.FirstDayOfWeek.ToString();
Console.WriteLine($"First day of the week in {name3}:: {firstDay3}");

The example prints the first day of week in three cultures.

$ dotnet run
First day of the week in English (United States): Sunday
First day of the week in Slovak (Slovakia):: Monday
First day of the week in Persian (Iran):: Saturday

## C# CultureInfo first week

There are different rules to define the first week of the year in cultures,
including first day of the new year or first four or more days in a week.

Program.cs
  

using System.Globalization;

var enUs = new CultureInfo("en-US");

var weekRule = enUs.DateTimeFormat.CalendarWeekRule.ToString();
Console.WriteLine($"First calendar week starts with: {weekRule}");

var skSk = new CultureInfo("sk-Sk");

var weekRule2 = skSk.DateTimeFormat.CalendarWeekRule.ToString();
Console.WriteLine($"First calendar week starts with: {weekRule2}");

The example prints the first week rule for two cultures.

$ dotnet run
First calendar week in English (United States) starts with: FirstDay
First calendar week in Slovak (Slovakia) starts with: FirstFourDayWeek

## C# CultureInfo day names

The CultureInfo.DateTimeFormat.DayNames gets an array that contains
the culture-specific full names of the days of the week.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var enUs = new CultureInfo("en-US");

foreach (var dayName in enUs.DateTimeFormat.DayNames)
{
    Console.WriteLine(dayName);
}

Console.WriteLine("***************************");

var skSk = new CultureInfo("sk-SK");

foreach (var dayName in skSk.DateTimeFormat.DayNames)
{
    Console.WriteLine(dayName);
}

The example prints the names of the days in en-US and
sk-SK cultures.

$ dotnet run
Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
***************************
nedeľa
pondelok
utorok
streda
štvrtok
piatok
sobota

## C# CultureInfo month names

With the CultureInfo.DateTimeFormat.MonthNames property we get the
array of culture-specific full names of the months. Likewise, we get the
culture-specific abbreviated names of the months with the
CultureInfo.DateTimeFormat.AbbreviatedMonthNames.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var huHu = new CultureInfo("hu-HU");
var name = huHu.NativeName;

Console.WriteLine($"{name}: Hónap nevek");

foreach (var monthName in huHu.DateTimeFormat.MonthNames)
{
    Console.WriteLine(monthName);
}

Console.WriteLine("**********************");

foreach (var abbMonthName in huHu.DateTimeFormat.AbbreviatedMonthNames)
{
    Console.WriteLine(abbMonthName);
}

The example prints month names in Hungarian. We print full and abbreviated month
names.

$ dotnet run
magyar (Magyarország): Hónap nevek
január
február
március
április
május
június
július
augusztus
szeptember
október
november
december

**********************
jan.
febr.
márc.
ápr.
máj.
jún.
júl.
aug.
szept.
okt.
nov.
dec.

## C# CultureInfo datetime formats

Cultures use different datetime formats.

Program.cs
  

using System.Globalization;

var now = DateTime.Now;

var skSk = new CultureInfo("sk-SK");
CultureInfo.DefaultThreadCurrentCulture = skSk;

Console.WriteLine(skSk.DateTimeFormat.FullDateTimePattern);
Console.WriteLine(now.ToString(skSk.DateTimeFormat.FullDateTimePattern));

Console.WriteLine();

Console.WriteLine(skSk.DateTimeFormat.LongDatePattern);
Console.WriteLine(now.ToString(skSk.DateTimeFormat.LongDatePattern));

Console.WriteLine();

Console.WriteLine(skSk.DateTimeFormat.ShortTimePattern);
Console.WriteLine(now.ToString(skSk.DateTimeFormat.ShortTimePattern));

The example prints today's date in Slovak culture in different formats.

$ dotnet run
dddd d. MMMM yyyy H:mm:ss
piatok 19. januára 2024 22:32:19

dddd d. MMMM yyyy
piatok 19. januára 2024

H:mm
22:32

## Source

[CultureInfo class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.globalization.cultureinfo?view=net-8.0)

In this article we have worked with C# CultureInfo, which is used
to globalize C# applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).