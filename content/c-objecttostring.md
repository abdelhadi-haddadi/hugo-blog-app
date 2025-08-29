+++
title = "C# Object.ToString"
date = 2025-08-29T19:51:10.641+01:00
draft = false
description = "C# Object.ToString tutorial shows how to use Object.ToString method in C#. The Object.ToString returns a string that represents the current object."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Object.ToString

last modified July 5, 2023

 

C# Object.ToString tutorial shows how to use Object.ToString method in C#. 

The Object.ToString returns a string that represents the current
object. It is the main formatting method in .NET. The default implementation 
of the method returns the fully qualified name of the object's type.

Passing an object to the Console.WriteLine method, the 
Object.ToString method is called.

There are multiple challenges when converting types into strings. For instance, 
the string output may be culture specific, as seen in dates and times. Or 
the internal implementation of the type differs from the user expected format.

Custom types often override the default implementation of the
Object.ToString method. In addition, it is possible to overload 
the method. For maximum flexibility, we can also provide our own formatter 
objects.

## C# default ToString

The default ToString method returns the fully qualified name of 
the type.

Program.cs
  

var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "driver");

Console.WriteLine(u1);
Console.WriteLine(u2);

class User 
{
    private string Name {get; set; }
    private string Occupation {get; set;}

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);
}

We have a User class which has not overriden the
ToString method; it uses the default one from its parent.

Console.WriteLine(u1);

The ToString method is called when we pass the object to the 
Console.WriteLine method.

$ dotnet run 
User
User

## C# override ToString

In the next example, we override the ToString method.

Program.cs
  

var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "driver");

Console.WriteLine(u1);
Console.WriteLine(u2);

class User 
{
    private string Name {get; set; }
    private string Occupation {get; set;}

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public override string ToString()
    {
        return $"User {{ {Name} {Occupation} }}";
    }
}

The overriden ToString method returns the user's name and 
occupation, giving a more meaningful output.

$ dotnet run
User { John Doe gardener }
User { Roger Roe driver }

## C# record ToString

The record type provides a default implementation of the
ToString method with additional information about the attributes of
the object.

Program.cs
  

var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "driver");

Console.WriteLine(u1);
Console.WriteLine(u2);

record User(string Name, string Occupation);

In this example, we use a record instead of a class.

$ dotnet run
User { Name = John Doe, Occupation = gardener }
User { Name = Roger Roe, Occupation = driver }

## C# DateTime ToString

Formatting datetime data is complex; not only multiple cultures have different
standards for displaying date and time, each culture may have multiple
ways for displaying date and time.

The DateTime time has a default ToString method and 
a few additional built-in format methods. In addition, it also allows to provide 
our own formats.

Program.cs
  

using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

var d1 = DateTime.Now;
Console.WriteLine(d1);

string fmt = "MMMM dd, yyyy (dddd)";

var d2 = new DateTime(2020, 5, 20);
Console.WriteLine(d2.ToString(fmt));

var d3 = new DateTime(2021, 3, 30);
Console.WriteLine(d3.ToShortDateString());

DateTime now = DateTime.Now;
CultureInfo ci = new CultureInfo("sk-SK");
Console.WriteLine($"Dnešný dátum a čas: {now.ToString("F", ci)}");

In the example, we use a default DateTime formatter, a custom one, 
a built-in one, and a culture specific one.

$ dotnet run
4/8/2021 1:14:43 PM
May 20, 2020 (Wednesday)
3/30/2021
Dnešný dátum a čas: štvrtok 8. apríla 2021 13:14:43

## C# ToString with monetary data

Formatting monetary data is also complex. Countries use different decimal
separators and currrency symbols. Also, the currencty symbol can be placed in 
the front or in the back of the value.

Program.cs
  

using System.Globalization;

decimal val = 766.45m;

Console.WriteLine(val.ToString("C3", new CultureInfo("en-US")));
Console.WriteLine(val.ToString("C3", new CultureInfo("fr-FR")));
Console.WriteLine(val.ToString("C3", new CultureInfo("zh-CN")));
Console.WriteLine(val.ToString("C3", new CultureInfo("sk-SK")));
Console.WriteLine(val.ToString("C3", new CultureInfo("ja-JP")));

The example uses the C3 currency specifier with five different 
cultures.

$ dotnet run
$766.450
766,450 €
¥766.450
766,450 €
￥766.450

## C# overloaded ToString

In the following example, we overload the ToString method.

Program.cs
  

var t1 = new Temperature(0m);
Console.WriteLine(t1.ToString());
Console.WriteLine(t1.ToString(Temperature.Scale.Celsius));
Console.WriteLine(t1.ToString(Temperature.Scale.Kelvin));
Console.WriteLine(t1.ToString(Temperature.Scale.Fahrenheit));

Console.WriteLine("--------------------");

var t2 = new Temperature(-20m);
Console.WriteLine(t2.ToString());
Console.WriteLine(t2.ToString(Temperature.Scale.Celsius));
Console.WriteLine(t2.ToString(Temperature.Scale.Kelvin));
Console.WriteLine(t2.ToString(Temperature.Scale.Fahrenheit));

Console.WriteLine("--------------------");

var t3 = new Temperature(32m);
Console.WriteLine(t3.ToString());
Console.WriteLine(t3.ToString(Temperature.Scale.Celsius));
Console.WriteLine(t3.ToString(Temperature.Scale.Kelvin));
Console.WriteLine(t3.ToString(Temperature.Scale.Fahrenheit));

class Temperature
{
    private decimal temp;

    public Temperature(decimal temp)
    {
        this.temp = temp;
    }

    public decimal Celsius
    {
        get { return this.temp; }
    }

    public decimal Kelvin
    {
        get { return this.temp + 273.15m; }
    }

    public decimal Fahrenheit
    {
        get { return Math.Round(((decimal)(this.temp * 9 / 5 + 32)), 2); }
    }

    public override string ToString()
    {
        return this.ToString(Scale.Celsius);
    }

    public string ToString(Scale scale)
    {
        var res = scale switch
        {
            Scale.Celsius =&gt; this.Celsius.ToString("N2") + " °C",
            Scale.Fahrenheit =&gt; this.Fahrenheit.ToString("N2") + " °F",
            Scale.Kelvin =&gt; this.Kelvin.ToString("N2") + " K",
            _ =&gt; throw new FormatException($"Unsupported scale: '{scale}'")
        };

        return res;
    }

    internal enum Scale
    {
        Celsius,
        Kelvin,
        Fahrenheit
    }
}

We have a Temperature type. It can be expressed in Celsius,
Fahrenheit, or Kelvin scales. We have an overloaded ToString method 
which formats the temperature based on the provided scale.

public override string ToString()
{
    return this.ToString(Scale.Celsius);
}

The override method calls the second method, passing it the 
Scale.Celsius.

var res = scale switch
{
    Scale.Celsius =&gt; this.Celsius.ToString("N2") + " °C",
    Scale.Fahrenheit =&gt; this.Fahrenheit.ToString("N2") + " °F",
    Scale.Kelvin =&gt; this.Kelvin.ToString("N2") + " K",
    _ =&gt; throw new FormatException($"Unsupported scale: '{scale}'")
};

A switch expression is used to format the temperature value, based on the given
scale.

$ dotnet run
0.00 °C
0.00 °C
273.15 K
32.00 °F
--------------------
-20.00 °C
-20.00 °C
253.15 K
-4.00 °F
--------------------
32.00 °C
32.00 °C
305.15 K
89.60 °F

## Source

[Object.ToString method](https://learn.microsoft.com/en-us/dotnet/api/system.object.tostring?view=net-8.0)

In this article we have worked Object.ToString method in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).