+++
title = "C# Task"
date = 2025-08-29T19:51:32.265+01:00
draft = false
description = "C# Task tutorial shows how to do concurrent operations in C# using Task."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Task

last modified July 5, 2023

 

In this article we show how to use Task for concurrent operations in C#.

Concurrent programming is used for two kinds of tasks:  I/O-bound and CPU-boud
tasks. Requesting data from a network, accessing a database, or reading and
writing are IO-bound tasks. CPU-boud tasks are tasks that are computationally
expensive, such as mathematical calculations or graphics processing.

Asynchronous operations are suited for I/O-bound tasks. Parallel operations are 
suited for CPU-bound tasks. Unlike in other languages, Task can be used for 
both asynchronous and parallel operations.

**Note: ** the MSDN documentation incorrecly uses the term
asynchronous instead of the  standardly used concurrent.

Task represents a concurrent operation.

Task
Task&lt;TResult&gt;

Task represents an concurrent operation, while Task&lt;TResult&gt;
represents an concurrent operation that can return a value.

The Task.Run method is used to run CPU-bound code concurrently;
ideally in parallel. It queues the specified work to run on the ThreadPool and
returns a task or Task&lt;TResult&gt; handle for that work.

.NET contains numerous methods such as StreamReader.ReadLineAsync 
or HttpClient.GetAsync that execute I/O-bound code asynchronously. 
They are used together with async/await keywords.

**Note: ** it is recommended to use use Task.Run 
instead of using new Task(); task.Start().

## C# Task.Run

The Task.Run method puts a task on a different thread. It is
suitable for CPU-bound tasks.

Program.cs
  

Console.WriteLine($"Main thread {getThreadId()} begin");

Task.Run(() =&gt;
{
    Console.WriteLine($"Thread {getThreadId()} begin");

    Thread.Sleep(3000);

    Console.WriteLine($"Thread {getThreadId()} end");
});

Console.WriteLine($"Main thread {getThreadId()} end");

Console.ReadLine();

int getThreadId() 
{
    return Thread.CurrentThread.ManagedThreadId;
}

The main thread finishes before the generated task. In order to see the task 
finished, we use Console.ReadLine which waits for user input.

$ dotnet run
Main thread 1 begin
Main thread 1 end
Thread 4 begin
Thread 4 end

Task&lt;TResult&gt; represents a task which returns a result.

Program.cs
  

Task&lt;int&gt; task = Task.Run(() =&gt;
{
    Thread.Sleep(3000);
    return 2 + 3;
});

var res = await task;
Console.WriteLine(res);

The program shows how to wait for a task that returns a computation result.

## C# Task.Delay

Task.Delay creates a task which completes after a time delay.

Program.cs
  

Console.WriteLine("step 1");

await doTask();

Console.WriteLine("step 2");

async Task doTask()
{
    await Task.Delay(3000);
    Console.WriteLine("task finished");
}

The function which creates a task must use the async keyword.

await Task.Delay(3000);

Task.Delay creates a new task, which sleeps for three seconds.
The await operator waits for the task to finish. It block execution
of the main program until the task is finished.

$ dotnet run
step 1
task finished
step 2

## C# async Main method

When we are using the await operator inside the Main
method, we have to mark it with the async modifier.

words.txt
  

sky
main
club
cotton
rocket

This is a sample text file.

Program.cs
  

namespace AsyncMain;

class Program
{
    static async Task Main(string[] args)
    {
        using StreamReader reader = File.OpenText("words.txt");
        string? res = await reader.ReadLineAsync();

        Console.WriteLine($"First line is: {res}");
    }
}

The example reads the first line of a file asynchronously. The work is done
inside the Main method.

string? res = await reader.ReadLineAsync();

The ReadLineAsync method returns a Task&lt;String&gt;
that represents an asynchronous read operation. The result in a task contains
the next line from the stream, or is null if all the characters have been read.

$ dotnet run
First line is: sky

## C# Task.WaitAll

The Task.WaitAll method waits for all of the provided tasks to
complete execution.

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

$ dotnet run
f3 finished
f1 finished
f2 finished
elapsed: 7000 ms

## C# Task.ContinueWith

The Task.ContinueWith creates a continuation that executes
asynchronously when the target Task&lt;TResult&gt; completes.

Program.cs
  

Task&lt;int&gt; task = Task.Run(() =&gt; 
    runTask()).ContinueWith&lt;int&gt;((x) =&gt; x.Result * 2);
var res = await task;

Console.WriteLine(res);

int runTask()
{
    int x = 1;
    int y = 2;
    int z = 3;

    Thread.Sleep(1000);
    return x + y + z;
}

In the example, we chain two operations with ContinueWith.

## C# mulitple async requests

The HttpClient class is used for sending HTTP requests and
receiving HTTP responses from the specified resource.

Program.cs
  

var urls = new string[] { "http://webcode.me", "http://example.com",
    "http://httpbin.org", "https://ifconfig.me", "http://termbin.com",
    "https://github.com"
};

using var client = new HttpClient();

var tasks = new List&lt;Task&lt;HttpResponseMessage&gt;&gt;();

foreach (var url in urls)
{
    tasks.Add(client.GetAsync(url));
}

Task.WaitAll(tasks.ToArray());

var data = new List&lt;HttpResponseMessage&gt;();

foreach (var task in tasks)
{
    data.Add(await task);
}

foreach (var res in data)
{
    Console.WriteLine(res.StatusCode);
}

We send asynchronous GET requests to various web pages and get their response 
status codes.

tasks.Add(client.GetAsync(url));

The GetAsync sends a GET request to the specified url and returns
the response body in an asynchronous operation. It returns a new task. The task 
is added to the list of tasks.

Task.WaitAll(tasks.ToArray());

The Task.WaitAll waits for all of the provided tasks to complete
execution.

data.Add(await task);

The await unwraps the result of the operation.

foreach (var res in data)
{
    Console.WriteLine(res.StatusCode);
}

We print the status of each request.

$ dotnet run
OK
OK
OK
OK
OK
OK

## Source

[Task class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-8.0)

In this article we have used Task for concurrent operations in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).