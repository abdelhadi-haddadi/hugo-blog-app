+++
title = "C# Environment"
date = 2025-08-27T23:22:59.662+01:00
draft = false
description = "C# Environment tutorial shows how to work with
environment and platform in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Environment

last modified July 5, 2023

 

In this article we show how to work environment and platform in C#.

The Environment type provides information about the current
environment and platform in C#. It is located in the System
namespace.

## C# system information

In the following example we print some system information.

Program.cs
  

var osv = Environment.OSVersion;

Console.WriteLine($"OS: {osv.Platform}");
Console.WriteLine($"Version: {osv.Version}");
Console.WriteLine($"OS &amp; version: {osv.VersionString}");

string userName = Environment.UserName;
string userDomName = Environment.UserDomainName;

Console.WriteLine($"User name: {userName}");
Console.WriteLine($"User domain name: {userDomName}");

The example prints the OS name and version, user name, and user domain name.

var osv = Environment.OSVersion;

The Environment.OsVersion property gets the current platform
identifier and version number.

$ dotnet run
OS: Unix
Version: 5.15.0.48
OS &amp; version: Unix 5.15.0.48
User name: jano
User domain name: andromeda

## C# common directories

In the next example, we print some common system directories.

Program.cs
  

string curDir = Environment.CurrentDirectory;
string deskDir = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
string myMusicDir = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);
string addDataDir = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
string userProfDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
string myPictDir = Environment.GetFolderPath(Environment.SpecialFolder.MyPictures);

Console.WriteLine($"Current directory: {curDir}");
Console.WriteLine($"Desktop directory: {deskDir}");
Console.WriteLine($"My Music directory: {myMusicDir}");
Console.WriteLine($"Application data directory: {addDataDir}");
Console.WriteLine($"User profile directory: {userProfDir}");
Console.WriteLine($"My Pictures directory: {myPictDir}");

The example shows some common directories, including Desktop, My Music,
Application Data, User Profile, and My Pictures.

$ dotnet run
Current directory: /home/jano/Documents/prog/csharp/environment/EnvironmentEx
Desktop directory: /home/jano/Desktop
My Music directory: /home/jano/Music
Application data directory: /home/jano/.config
User profile directory: /home/jano
My Pictures directory: /home/jano/Pictures

## C# command line arguments 

The next example prints command line arguments.

Program.cs
  

string cline = Environment.CommandLine;
Console.WriteLine(cline);

string[] cargs = Environment.GetCommandLineArgs();

foreach (var arg in cargs)
{
    Console.WriteLine(arg);
}

The Environment.CommandLine returns a string of command line
arguments. To get an array of arguments, we use the
Environment.GetCommandLineArgs method.

$ dotnet run "John Doe" gardener 34
/home/jano/Documents/prog/csharp/environment/EnvironmentEx/bin/Debug/net6.0/EnvironmentEx.dll "John Doe" gardener 34
/home/jano/Documents/prog/csharp/environment/EnvironmentEx/bin/Debug/net6.0/EnvironmentEx.dll
John Doe
gardener
34

## C# environment variables

We can also retrieve environment variables.

Program.cs
  

using System.Collections;

string? user = Environment.GetEnvironmentVariable("USER");
Console.WriteLine(user);

string? shell = Environment.GetEnvironmentVariable("SHELL");
Console.WriteLine(shell);

string? home = Environment.GetEnvironmentVariable("HOME");
Console.WriteLine(home);

var envs = Environment.GetEnvironmentVariables();
foreach (DictionaryEntry de in envs)
{
    Console.WriteLine($"{de.Key}: {de.Value}");
}

We can get a specific environment varialbe with
GetEnvironmentVariable. To retrieve all variables, we use
GetEnvironmentVariables.

$ dotnet run
jano
/bin/bash
/home/jano
CLUTTER_IM_MODULE: ibus
SDKMAN_VERSION: 5.16.0
PANEL_GDK_CORE_DEVICE_EVENTS: 0
MICRONAUT_HOME: /home/jano/.sdkman/candidates/micronaut/current
LC_PAPER: sk_SK.UTF-8
...

## Source

[Environment class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.environment?view=net-8.0)

In this article we worked with Environment in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).