+++
title = "C# async/await"
date = 2025-08-27T23:22:44.727+01:00
draft = false
description = "C# async/await tutorial shows how to use async await keywords in C#. With asynchronous programming, we can execute tasks concurrently with the main program execution."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# async/await

last modified July 5, 2023

 

C# async/await tutorial shows how to use async and await keywords in C#.

With asynchronous programming, we can execute tasks concurrently with the main
program execution. The async and await keywords
simplify asynchronous programming in C#. C# has asynchronous programming model
built into the language.

Concurrent programming is used for two kinds of tasks:  I/O-bound tasks and
CPU-boud tasks. Requesting data from a network, accessing a database, or reading
and writing are IO-bound tasks. CPU-boud tasks are tasks that are
computationally expensive, such as mathematical calculations or graphics
processing.

**Note: ** the MSDN documentation incorrectly uses the term
asynchronous instead of the  standardly used concurrent.

The async modifier is used on a method, lambda expression or an
anonymous method to create asynchronous methods. An async method
runs synchronously until it reaches its first await operator, at
which point the method is suspended while the awaited task is completed. In the
meantime, the control returns to the caller of the method.

The await operator suspends the evaluation of the enclosing
async method until the asynchronous operation completes. When the
asynchronous operation finishes, the await operator returns the
result of the operation, if any. 

If the async method does not contain an await
operator, the method executes synchronously. 

In C#, a Task represents a concurrent operation.

## C# simple synchronous example

In the next example, we execute three methods synchronously.

Program.cs
  

using System.Diagnostics;

var sw = new Stopwatch();
sw.Start();

f1();
f2();
f3();

sw.Stop();

var elapsed = sw.ElapsedMilliseconds;
Console.WriteLine($"elapsed: {elapsed} ms");

void f1() 
{
    Console.WriteLine("f1 called");
    Thread.Sleep(4000);
}

void f2() 
{
    Console.WriteLine("f2 called");
    Thread.Sleep(7000);
}

void f3() 
{
    Console.WriteLine("f3 called");
    Thread.Sleep(2000);
}

With Thread.Sleep, we emulate some longer computations.

var sw = new Stopwatch();
sw.Start();

We measure the execution time of the methods with Stopwatch.

f1();
f2();
f3();

The methods are called consecutively.

$ dotnet run
f1 called
f2 called
f3 called
elapsed: 13034 ms

On our system, it took 13 s to execute the three functions.

## C# simple asynchronous example

Now, the example is rewritten using async/await keywords.

Program.cs
  

using System.Diagnostics;

var sw = new Stopwatch();
sw.Start();

Task.WaitAll(f1(), f2(), f3());

sw.Stop();

var elapsed = sw.ElapsedMilliseconds;
Console.WriteLine($"elapsed: {elapsed} ms");

async Task f1()
{
    await Task.Delay(4000);
    Console.WriteLine("f1 finished");
}

async Task f2()
{
    await Task.Delay(7000);
    Console.WriteLine("f2 finished");
}

async Task f3()
{
    await Task.Delay(2000);
    Console.WriteLine("f3 finished");
}

We measure the execution time of three asynchronous methods.

Task.WaitAll(f1(), f2(), f3());

The Task.WaitAll waits for all of the provided tasks to complete
execution.

async Task f1()
{
    await Task.Delay(4000);
    Console.WriteLine("f1 finished");
}

The f1 method uses the async modifier and returns a
Task. Inside the body of the method, we use the await
operator on the Task.Delay.

$ dotnet run
f3 finished
f1 finished
f2 finished
elapsed: 7006 ms

Now the execution took 7 s. Also note that the order in which the tasks finished
is different.

## C# async Main method

When we are using the await operator inside the Main
method, we have to mark it with the async modifier.

Program.cs
  

using System.Diagnostics;

namespace AsyncMain
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var sw = new Stopwatch();
            sw.Start();

            Console.WriteLine("task 1");
            Task task1 = doWork();

            Console.WriteLine("task 2");
            Task task2 = doWork();

            Console.WriteLine("task 3");
            Task task3 = doWork();

            await Task.WhenAll(task1, task2, task3);

            Console.WriteLine("Tasks finished");

            sw.Stop();

            var elapsed = sw.ElapsedMilliseconds;
            Console.WriteLine($"elapsed: {elapsed} ms");
        }

        static async Task doWork()
        {
            await Task.Delay(1500);
        }
    }
}

Inside the Main method, we call the doWork three
times.

$ dotnet run
task 1
task 2
task 3
Tasks finished
elapsed: 1550 ms

## C# reading files asynchronously

C# has many built-in methods to read files asynchronously. For instance, the
File.ReadAllTextAsync asynchronously opens a text file, reads all
the text in the file, and then closes the file.

Program.cs
  

using System.Diagnostics;

var task1 = File.ReadAllTextAsync("data1.txt");
var task2 = File.ReadAllTextAsync("data2.txt");
var task3 = File.ReadAllTextAsync("data3.txt");
var task4 = File.ReadAllTextAsync("data4.txt");

Console.WriteLine("doing some work");

var tasks = new Task[] { task1, task2, task3, task4 };

Task.WaitAll(tasks);

var content1 = await task1;
var content2 = await task2;
var content3 = await task3;
var content4 = await task4;

Console.WriteLine(content1.TrimEnd());
Console.WriteLine(content2.TrimEnd());
Console.WriteLine(content3.TrimEnd());
Console.WriteLine(content4.TrimEnd());

In the example, we asynchronously read four files.

var content1 = await task1;

With await, we asynchronously unwrap the result of the task.

## C# CPU-bound async tasks

In the next example, we work with CPU intensive computations.

Program.cs
  

var tasks = new List&lt;Task&lt;int&gt;&gt;();

tasks.Add(Task.Run(() =&gt; DoWork1()));
tasks.Add(Task.Run(() =&gt; DoWork2()));

await Task.WhenAll(tasks);

Console.WriteLine(await tasks[0]);
Console.WriteLine(await tasks[1]);

async Task&lt;int&gt; DoWork1()
{
    var text = string.Empty;

    for (int i = 0; i &lt; 100_000; i++)
    {
        text += "abc";
    }

    Console.WriteLine("concatenation finished");

    return await Task.FromResult(text.Length);
}

async Task&lt;int&gt; DoWork2()
{
    var text = string.Empty;

    for (int i = 0; i &lt; 100_000; i++)
    {
        text = $"{text}abc";
    }

    Console.WriteLine("interpolation finished");

    return await Task.FromResult(text.Length);
}

We have two computationally intensive methods that concatenate strings hundred 
thousand times.

tasks.Add(Task.Run(() =&gt; DoWork1()));
tasks.Add(Task.Run(() =&gt; DoWork2()));

The Task.Run method queues the specified work to run on the
ThreadPool and returns a task or Task&lt;TResult&gt; handle for that work.

return await Task.FromResult(text.Length);

We return the number of characters concatenated with text.Length.
The Task.FromResult creates a Task&lt;TResult&gt; that's completed
successfully with the specified result.

## C# mulitple async requests

The HttpClient class is used for sending HTTP requests and
receiving HTTP responses from the specified resource.

Program.cs
  

using System.Text.RegularExpressions;

var urls = new string[] { "http://webcode.me", "http://example.com",
    "http://httpbin.org", "https://ifconfig.me", "http://termbin.com",
    "https://github.com"
};

var rx = new Regex(@"&lt;title&gt;\s*(.+?)\s*&lt;/title&gt;",
  RegexOptions.Compiled);

using var client = new HttpClient();

var tasks = new List&lt;Task&lt;string&gt;&gt;();

foreach (var url in urls)
{
    tasks.Add(client.GetStringAsync(url));
}

Task.WaitAll(tasks.ToArray());

var data = new List&lt;string&gt;();

foreach (var task in tasks)
{
    data.Add(await task);
}

foreach (var content in data)
{
    var matches = rx.Matches(content);

    foreach (var match in matches)
    {
        Console.WriteLine(match);
    }
}

We download the given web pages asynchronously and print their HTML title tags.

tasks.Add(client.GetStringAsync(url));

The GetStringAsync sends a GET request to the specified url and
returns the response body as a string in an asynchronous operation. It returns a
new task.

Task.WaitAll(tasks.ToArray());

The Task.WaitAll waits for all of the provided tasks to complete
execution.

data.Add(await task);

The await unwraps the result of the operation.

$ dotnet run
&lt;title&gt;My html page&lt;/title&gt;
&lt;title&gt;Example Domain&lt;/title&gt;
&lt;title&gt;httpbin.org&lt;/title&gt;
&lt;title&gt;termbin.com - terminal pastebin&lt;/title&gt;
&lt;title&gt;GitHub: Where the world builds software · GitHub&lt;/title&gt;

## Source

[Asynchronous programming with async and await](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)

In this article we have used async/await keywords to create asynchronous
programs in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).