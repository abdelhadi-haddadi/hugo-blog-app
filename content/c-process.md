+++
title = "C# Process"
date = 2025-08-29T19:51:15.284+01:00
draft = false
description = "C# Process tutorial shows how to work with processes in C# language. The Process provides access to local and remote processes and allows to start and stop local system processes."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Process

last modified July 5, 2023

 

In this article, we explore how to work with processes in C# using the
System.Diagnostics namespace.

The Process class provides access to both local and remote
processes, allowing developers to start, stop, monitor, and interact with system
processes. Whether it's launching an external application, capturing process
output, or managing running tasks, the Process class offers a
comprehensive set of functionalities.

To configure process execution, C# provides the ProcessStartInfo
class, which specifies various settings such as:

    - **FileName:** Defines the executable or command to run.

    - **Arguments:** Passes command-line arguments to the process.

    - **UseShellExecute:** Determines whether to use the system shell to start the process.

    - **RedirectStandardOutput:** Enables capturing the process output.

    - **CreateNoWindow:** Specifies whether to run the process in a hidden window.

The Process class is part of the System.Diagnostics
namespace, which contains various tools for debugging, monitoring, and
performance analysis.

With the ability to start, manage, and terminate system processes, C#
developers can efficiently interact with external applications, automate tasks,
and analyze system activity.

## C# Process simple example

In the first example, we start a console command that shows the contents of 
a file. 

Program.cs
  

using System.Diagnostics;

Process.Start("cat", @"C:\Users\Jano\Documents\words.txt");

The example outputs the contents of the words.txt file with 
the cat command. The command is not part of the Windows OS by 
default; it is installed with the git tools (see [gitforwindows.org](https://gitforwindows.org/)).

Process.Start("cat", @"C:\Users\Jano\Documents\words.txt");

The process is started with the Start method.

$ dotnet run
sky
cloud
falcon
owl
crane

## C# Process run program

In the following example, we run a GUI program.

Program.cs
  

using System.Diagnostics;

using var process = new Process();

process.StartInfo.FileName = "notepad.exe";
process.Start();

In the example, we run the Notepad program. It is a standard, small text editor.

process.StartInfo.FileName = "notepad.exe";

The StartInfo.FileName property bets or sets the application or 
document to start.

Program.cs
  

using System.Diagnostics;

using var process = new Process();

process.StartInfo.FileName = "notepad.exe";
process.StartInfo.Arguments = @"C:\Users\Jano\Documents\words.txt";
process.Start();

We use the StartInfo.Arguments to pass the file name to be opened.

## C# start and kill program

The next example starts a program and kills it after a few seconds.

Program.cs
  

using System.Diagnostics;

using var process = Process.Start("notepad.exe");

Thread.Sleep(3000);
process.Kill();

The example starts Notepad, sleeps for three seconds and kills the process 
with the Kill method.

## C# Process.GetProcessesByName

The Process.GetProcessesByName creates an array of new Process
components and associates them with the existing process resources that all
share the specified process name.

Program.cs
  

using System.Diagnostics;

Process[] processes = Process.GetProcessesByName("Firefox");
Console.WriteLine("{0} Firefox processes", processes.Length);

Array.ForEach(processes, (process) =&gt;
{
    Console.WriteLine("Process: {0} Id: {1}",
        process.ProcessName, process.Id);
});

In the example, we find all processes belonging to the Firefox. We list their 
Ids and process names.

Process[] processes = Process.GetProcessesByName("Firefox");

We get the array of processes by the name of "Firefox".

Console.WriteLine("{0} Firefox processes", processes.Length);

We print the number of processes found.

Array.ForEach(processes, (process) =&gt;
{
    Console.WriteLine("Process: {0} Id: {1}", 
        process.ProcessName, process.Id);
});

We list the processes with the ForEach method.

$ dotnet run
12 Firefox processes
Process: firefox Id: 10056
Process: firefox Id: 13016
Process: firefox Id: 12944
Process: firefox Id: 10124
Process: firefox Id: 15556
...

## C# Process.GetProcesses

The Process.GetProcesses creates an array of new Process 
components and associates them with existing process resources.

Program.cs
  

using System.Diagnostics;

Process[] processes = Process.GetProcesses();

Array.ForEach(processes, (process) =&gt;
{
    Console.WriteLine("Process: {0} Id: {1}",
        process.ProcessName, process.Id);
});

The example list all processes.

Process[] processes = Process.GetProcesses();

We get the array of processes.

Array.ForEach(processes, (process) =&gt;
{
    Console.WriteLine("Process: {0} Id: {1}", 
        process.ProcessName, process.Id);
});

We iterate over the array and print the process names and Ids.

## C# Process redirect output

The StandardOutput property gets a stream used to read the textual 
output of the application.

Program.cs
  

using System.Diagnostics;

var psi = new ProcessStartInfo();
psi.FileName = "ls";
psi.UseShellExecute = false;
psi.RedirectStandardOutput = true;

using var process = Process.Start(psi);
using StreamReader reader = process.StandardOutput;

string data = reader.ReadToEnd();

File.WriteAllText("output.txt", data);

In the example, we redirect the output of the ls command to the 
output.txt file. 

psi.UseShellExecute = false;
psi.RedirectStandardOutput = true;

Setting the UseShellExecute to false enables us to 
redirect input, output, and error streams. (In this context, the shell refers
to the graphical shell rather than command shell such as bash or sh.)

using var process = Process.Start(psi);

We start the process with the provided info. 

using StreamReader reader = process.StandardOutput;

We get the StreamReader for the standard output.

string data = reader.ReadToEnd();

We read all data with the ReadToEnd method.

File.WriteAllText("output.txt", data);

Finally, we write the data to the file.

## Source

[Process class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.process?view=net-8.0)

In this article we have worked with processes in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).