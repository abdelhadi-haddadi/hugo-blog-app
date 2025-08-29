+++
title = "C# ToUpper"
date = 2025-08-29T19:51:34.506+01:00
draft = false
description = "C# ToUpper tutorial shows how to transform letters to upper case in C# language."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ToUpper

last modified July 5, 2023

 

C# ToUpper tutorial shows how to transform letters to upper case in C# language.
[C# tutorial](http://zetcode.com/lang/csharp/) is a comprehensive
tutorial on C# language.

The string.ToUpper method returns a copy of a string converted to
uppercase. The overloaded ToUpper(CultureInfo) returns a copy of
a string converted to uppercase, using the casing rules of the specified
culture.

## C# ToUpper example

In the following example, we transform the specified strings to uppercase.

Program.cs
  

var w1 = "stormy weather";
var w2 = "l'écrivain français";
var w3 = "ясный сокол";
var w4 = "červená hviezda";

Console.WriteLine(w1.ToUpper());
Console.WriteLine(w2.ToUpper());
Console.WriteLine(w3.ToUpper());
Console.WriteLine(w4.ToUpper());

We have fours strings inf four different languages. We change the letters to 
uppercase with ToUpper.

$ dotnet run
STORMY WEATHER
L'ÉCRIVAIN FRANÇAIS
ЯСНЫЙ СОКОЛ
ČERVENÁ HVIEZDA

All the letters were transformed to uppercase.

## C# ToTitleCase

The TextInfo.ToTitleCase converts the specified string to title
case.

Program.cs
  

using System.Globalization;

var w1 = "stormy weather";
var w2 = "l'écrivain français";
var w3 = "ясный сокол";
var w4 = "červená hviezda";

Console.WriteLine(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(w1));
Console.WriteLine(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(w2));
Console.WriteLine(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(w3));
Console.WriteLine(CultureInfo.CurrentCulture.TextInfo.ToTitleCase(w4));

We transform the four strings with TextInfo.ToTitleCase.

$ dotnet run
Stormy Weather
L'écrivain Français
Ясный Сокол
Červená Hviezda

The TextInfo.ToTitleCase changed to uppercase the first letters of 
every word. 

Often, we only want to change the first letter of the first word of a string.
For this, we need to create our own function.

Program.cs
  

using System.Globalization;

var w1 = "stormy weather";
var w2 = "l'écrivain français";
var w3 = "ясный сокол";
var w4 = "červená hviezda";

Console.WriteLine(TitleCase(w1));
Console.WriteLine(TitleCase(w2));
Console.WriteLine(TitleCase(w3));
Console.WriteLine(TitleCase(w4));

string TitleCase(string s)
{
    if (string.IsNullOrEmpty(s))
    {
        return string.Empty;
    }

    char[] a = s.ToCharArray();
    a[0] = char.ToUpper(a[0]);
    return new string(a);
}

The TitleCase function uppercases only the first word of a string.

string TitleCase(string s)
{
    if (string.IsNullOrEmpty(s))
    {
        return string.Empty;
    }

    char[] a = s.ToCharArray();
    a[0] = char.ToUpper(a[0]);
    return new string(a);
}

In the TitleCase function, we transform the string into an array 
of characters with ToCharArray. Then we change the first character 
in the array to uppercase and return a new string created from the modified 
array.

$ dotnet run
Stormy weather
L'écrivain français
Ясный сокол
Červená hviezda

## Source

[String.ToUpper method - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.string.toupper?view=net-8.0)

In this article we have transformed strings to uppercase in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).