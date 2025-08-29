+++
title = "C# Humanizer"
date = 2025-08-29T19:50:52.017+01:00
draft = false
description = "C# Humanizer tutorial shows how to manipulate strings, datetimes, numbers and quantities in order to make them more approachable."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Humanizer

last modified July 6, 2023

 

In this article we use the Humanizer.Core library to humanize strings,
datetimes, numbers, and quantities. By humanizing we mean making information 
easier to understand for people.

$ dotnet add package Humanizer.Core

We add the library to our project.

## Transforming text

The Transform method transforms a string using the provided
transformers.

Program.cs
  

using Humanizer;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var msg = "an old falcon in the sky";

Console.WriteLine(msg.Transform(To.LowerCase));
Console.WriteLine(msg.Transform(To.SentenceCase));
Console.WriteLine(msg.Transform(To.TitleCase));
Console.WriteLine(msg.Transform(To.UpperCase));

var msg2 = "старый сокол в небе";
Console.WriteLine(msg2.Transform(To.LowerCase));
Console.WriteLine(msg2.Transform(To.SentenceCase));
Console.WriteLine(msg2.Transform(To.TitleCase));
Console.WriteLine(msg2.Transform(To.UpperCase));

In the program, we transform the case of the strings.

$ dotnet run
an old falcon in the sky
An old falcon in the sky
An Old Falcon in the Sky
AN OLD FALCON IN THE SKY
старый сокол в небе
Старый сокол в небе
Старый Сокол В Небе
СТАРЫЙ СОКОЛ В НЕБЕ

## Truncating string

When we cannot show the whole string in the display, it is a common practice to 
shorten the string with a truncation suffix (usually three dots).

Program.cs
  

using Humanizer;

var msg = "an old falcon in the sky";
Console.WriteLine(msg.Truncate(15));
Console.WriteLine(msg.Truncate(15, Truncator.FixedLength, TruncateFrom.Left));
Console.WriteLine(msg.Truncate(15, "...", TruncateFrom.Left));
Console.WriteLine(msg.Truncate(15, "..."));
Console.WriteLine(msg.Truncate(4, "...", Truncator.FixedNumberOfWords));
Console.WriteLine(msg.Truncate(15, "...", Truncator.FixedNumberOfCharacters));

We use the Truncate method to shorten a string. We can shorten 
strings based on chars or words. The strings can be shortened from right or 
from left.

$ dotnet run 
an old falcon …
…con in the sky
...n in the sky
an old falco...
an old falcon in...
an old falcon i...

## Roman numerals

We can transform numbers from Arabic to Roman numerals.

Program.cs
  

using Humanizer;

int[] vals = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 100, 125, 500, 1000, 1555 };
var nromans = new List&lt;string&gt;(); 
var narabic = new List&lt;int&gt;();

foreach (var e in vals)
{
    nromans.Add(e.ToRoman());
}

var rliterals = new string[] 
{
    "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI",
    "XX", "C", "CXXV", "D", "M", "MDLV"
};

foreach (var e in rliterals)
{
    narabic.Add(e.FromRoman());
}

Console.WriteLine(string.Join(",", nromans));
Console.WriteLine(string.Join(",", narabic));

We define an array of numbers. We transform them to Roman numerals and then
back to Arabic numerals.

nromans.Add(e.ToRoman());

The ToRoman converts the value to Roman number.

narabic.Add(e.FromRoman());

The FromRoman converts Roman numbers into Arabic numbers.

$ dotnet run 
I,II,III,IV,V,VI,VII,VIII,IX,X,XI,XX,C,CXXV,D,M,MDLV
1,2,3,4,5,6,7,8,9,10,11,20,100,125,500,1000,1555

## Transforming numbers to words

The ToWords method transforms a number into a word. The
ToOrdinalWords transforms a number into an ordinal word.

Program.cs
  

using Humanizer;

int[] vals = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 100, 125, 500, 1000, 1555 };

foreach (var e in vals)
{
    Console.WriteLine(e.ToWords());
}

Console.WriteLine("-------------------------");

foreach (var e in vals)
{
    Console.WriteLine(e.ToOrdinalWords());
}

We have an array of integer values. These are transformed into words and ordinal
words.

$ dotnet run 
one
two
three
four
five
six
seven
eight
nine
ten
eleven
twenty
one hundred
one hundred and twenty-five
five hundred
one thousand
one thousand five hundred and fifty-five
-------------------------
first
second
third
fourth
fifth
sixth
seventh
eighth
ninth
tenth
eleventh
twentieth
hundredth
hundred and twenty-fifth
five hundredth
thousandth
thousand five hundred and fifty-fifth

## Singularize &amp; pluralize words

The Singularize method singularizes the provided input considering
irregular words while the Pluralize method pluralizes it.

Program.cs
  

using Humanizer;

var words = new string[] 
{
    "geese", "octopi", "mice", "passers-by", "men", "men-servants", 
    "dormice", "lice", "teeth", "feet"
};

foreach (var word in words)
{
    Console.WriteLine(word.Singularize());
}

Console.WriteLine("-------------------------");

var words2 = new string[] 
{
    "goose", "octopus", "mouse", "passer-by", "man", "man-servant", 
    "dormouse", "louse", "tooth", "foot"
};

foreach (var word in words2)
{
    Console.WriteLine(word.Pluralize());
}

We singularize and pluralize a bunch of English words.

$ dotnet run 
goose
octopus
mouse
passers-by
man
men-servant
dormice
louse
tooth
foot
-------------------------
geese
octopi
mice
passer-bies
men
man-servants
dormouses
lice
teeth
feet

Note that passer-by, man-servant and dormouse words were incorrectly inflected.

## Dates and times

We can humanize datetime values with Humanize.

Program.cs
  

using Humanizer;
using Humanizer.Localisation;

Console.WriteLine(TimeSpan.FromDays(486).Humanize(maxUnit: TimeUnit.Year));
Console.WriteLine(TimeSpan.FromDays(486).Humanize(precision: 3, maxUnit: TimeUnit.Year));
Console.WriteLine(TimeSpan.FromMinutes(1600).Humanize(4));
Console.WriteLine(TimeSpan.FromMinutes(1600).Humanize());
Console.WriteLine(TimeSpan.FromMinutes(1600).Humanize(maxUnit: TimeUnit.Hour));
Console.WriteLine(TimeSpan.FromMilliseconds(5553005).Humanize(3));

Console.WriteLine(DateTime.UtcNow.AddHours(-30).Humanize());
Console.WriteLine(DateTime.UtcNow.AddHours(-2).Humanize());
Console.WriteLine(DateTime.UtcNow.AddHours(30).Humanize());
Console.WriteLine(DateTime.UtcNow.AddHours(2).Humanize());

The precision option sets the maximum number of time units to
return. The default is 1 which means the largest unit is returned. The 
maxUnit sets the maximum unit of time to output.

$ dotnet run 
1 year
1 year, 3 months, 29 days
1 day, 2 hours, 40 minutes
1 day
26 hours
1 hour, 32 minutes, 33 seconds
yesterday
2 hours ago
tomorrow
an hour from now

## Source

[Humanizer GitHub page](https://github.com/Humanizr/Humanizer)

In this article we have presented the Humanizer.Core library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).