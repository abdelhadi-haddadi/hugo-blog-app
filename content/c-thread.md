+++
title = "C# Thread"
date = 2025-08-29T19:51:33.390+01:00
draft = false
description = "Master threading and concurrency in C# with this tutorial. Learn how to create and manage threads, handle synchronization, and optimize performance for parallel execution in C# applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Thread

last modified May 12, 2025

 

This tutorial covers threading in C# and explains how processes and threads
operate in a program's execution.

A process is an instance of a running program that includes its own
allocated memory and system resources. When a process starts, the Common
Language Runtime (CLR) automatically creates a primary foreground thread to
execute application code. A process can contain multiple threads, each
representing a distinct execution path within the program.

In C#, the Thread class, part of the System.Threading
namespace, provides functionality for creating and managing threads. It enables
setting priorities, controlling execution, and retrieving thread status,
allowing efficient multitasking and concurrent execution.

Processes and threads are independent sequences of execution, but they differ in
memory usage and performance characteristics. The following table highlights key
differences between processes and threads:

Process
Thread

Runs in separate memory space (process isolation)
Shares memory with other threads within the same process

Consumes more memory
Consumes less memory

Higher overhead for resource management
Lower overhead, more lightweight

Slower to create and terminate
Faster to create and terminate

More stable but requires interprocess communication
Efficient for parallel execution but may require synchronization mechanisms

Easier to debug due to separate memory space
Can be more complex to debug due to shared memory and race conditions

Table: Process vs Thread

## C# Thread Start

The Start method starts a thread.

Program.cs
  

Console.WriteLine("main started");
var id = Thread.CurrentThread.ManagedThreadId;
Console.WriteLine($"main id: {id}");

var t = new Thread(task);
t.Start();

Console.WriteLine("main finished");

void task()
{
    Console.WriteLine("thread started");
    var id = Thread.CurrentThread.ManagedThreadId;
    Console.WriteLine($"thread id: {id}");
}

A new thread is created and then launched with Start.

Console.WriteLine("main started");

The main program is itself a separate thread of execution.

var id = Thread.CurrentThread.ManagedThreadId;
Console.WriteLine($"main id: {id}");

The Thread.CurrentThread.ManagedThreadId gets a unique identifier
for the current managed thread.

var t = new Thread(task);

A new Thread is created. We pass a reference to the function that 
is executed in the thread.

t.Start();

The thread is started.

void task()
{
    Console.WriteLine("thread started");
    var id = Thread.CurrentThread.ManagedThreadId;
    Console.WriteLine($"thread id: {id}");
}

Inside the function, we get and print the thread id.

$ dotnet run
main started
main id: 1
main finished
thread started
thread id: 4

Notice that the main thread has finished before the other thread. The program
waits for the thread to finish.

## C# Thread pass arguments

In the next example, we show how to pass arguments to a thread.

Program.cs
  

int n = 5;
string word = "falcon";

// var t = new Thread(() =&gt; { for (int i = 0; i &lt; n; i++) Console.WriteLine(word); });
var t = new Thread(() =&gt; repeat(n, word));
t.Start();

void repeat(int n, string word)
{
    for (int i = 0; i &lt; n; i++)
    {
        Console.WriteLine(word);
    }
}

The thread prints a word n times. We pass the word and the number as arguments.

var t = new Thread(() =&gt; repeat(n, word));

The thread takes a lambda expression, where the repeat function is called with
two parameters.

$ dotnet run
falcon
falcon
falcon
falcon
falcon

## C# Thread.Sleep

The Tread.Sleep method suspends the current thread for the
specified number of milliseconds. The method is useful for debugging and
testing.

It is often used to simulate a long-running task.

Program.cs
  

for (int i = 0; i &lt; 5; i++)
{
    var n = new Random().Next(500, 1500);

    var t = new Thread(() =&gt; task(n));
    t.Start();
}

void task(int n)
{
    var id = Thread.CurrentThread.ManagedThreadId;

    Console.WriteLine($"thread id: {id} started");
    Thread.Sleep(n);
    Console.WriteLine($"thread id: {id} finished in {n} ms");
}

In the program, we create five threads that sleep for a random number of
milliseconds.

var n = new Random().Next(500, 1500);

We create a random number between 500 and 1500.

var t = new Thread(() =&gt; task(n));
t.Start();

We pass the random number to the newly created thread.

void task(int n)
{
    var id = Thread.CurrentThread.ManagedThreadId;

    Console.WriteLine($"thread id: {id} started");
    Thread.Sleep(n);
    Console.WriteLine($"thread id: {id} finished in {n} ms");
}

The function that is run within the thread suspends its execution with
Tread.Sleep for n milliseconds.

$ dotnet run
thread id: 5 started
thread id: 6 started
thread id: 4 started
thread id: 7 started
thread id: 8 started
thread id: 5 finished in 822 ms
thread id: 8 finished in 891 ms
thread id: 6 finished in 902 ms
thread id: 4 finished in 946 ms
thread id: 7 finished in 1113 ms

## C# foreground &amp; background thread

There are two kings of threads: foreground and background. The background
threads do not prevent a process from terminating. When all foreground threads
belonging to a process have terminated, then the CLR ends the process.

A default thread is a foreground thread. We change a thread to a background
thread with IsBackground property.

Program.cs
  

Console.WriteLine("started main");

for (var i = 0; i &lt; 5; i++)
{
    var rn = new Random().Next(500, 1500);
    var t = new Thread(() =&gt; task(rn));
    t.IsBackground = true;
    t.Start();

}

void task(int n)
{
    Thread.Sleep(n);
    var id = Thread.CurrentThread.ManagedThreadId;
    Console.WriteLine($"{id} finished in {n} ms");
}

Console.WriteLine("finished main");

In the example, we create a main program thread and five background threads.

$ dotnet run
started main
finished main

Once the only foreground thread has finished, all other background threads are
terminated and the program is finished. The background threads had no time to 
run.

$ dotnet run
started main
finished main
8 finished in 572 ms
4 finished in 770 ms
7 finished in 772 ms
6 finished in 1145 ms
5 finished in 1397 ms

When we commed the t.IsBackground = true; line, we create
foreground threads. Then the main thread waits for other foreground threads 
to finish and the five threads are run.

## C# Thread Join

The Join method blocks the calling thread until the specified
thread terminates.

Program.cs
  

Console.WriteLine("main started");
var id = Thread.CurrentThread.ManagedThreadId;
Console.WriteLine($"main id: {id}");

Thread[] threads = new Thread[5];

for (int i = 0; i &lt; 5; i++)
{
    var n = new Random().Next(500, 1500);
    threads[i] =  new Thread(() =&gt; task(n));
}

foreach (var thread in threads)
{
    thread.Start();
}

foreach (var thread in threads)
{
    thread.Join();
}

void task(int n)
{
    var id = Thread.CurrentThread.ManagedThreadId;

    Console.WriteLine($"thread id: {id} started");
    Thread.Sleep(n);
    Console.WriteLine($"thread id: {id} finished in {n} ms");
}

Console.WriteLine("main finished");

In this program, the main thread waits for all other threads to finish.

Thread[] threads = new Thread[5];

for (int i = 0; i &lt; 5; i++)
{
    var n = new Random().Next(500, 1500);
    threads[i] =  new Thread(() =&gt; task(n));
}

We create an array of five threads that will sleep for a random number of
milliseconds.

foreach (var thread in threads)
{
    thread.Start();
}

First, we start all five threads.

foreach (var thread in threads)
{
    thread.Join();
}

With Join, we block the main thread until all the five threads 
in the array finish.

$ dotnet run
main started
main id: 1
thread id: 4 started
thread id: 5 started
thread id: 6 started
thread id: 7 started
thread id: 8 started
thread id: 7 finished in 802 ms
thread id: 4 finished in 1080 ms
thread id: 8 finished in 1354 ms
thread id: 6 finished in 1358 ms
thread id: 5 finished in 1461 ms
main finished

## C# Thread with Stopwatch

With Stopwatch we can accurately measure elapsed time.

Program.cs
  

using System.Diagnostics;

Console.WriteLine(Thread.CurrentThread.ManagedThreadId);

var sw = new Stopwatch();
sw.Start();

Thread[] threads = new Thread[10];

for (var i = 0; i &lt; 10; i++)
{
    var t = new Thread(() =&gt;
    {
        var id = Thread.CurrentThread.ManagedThreadId;
        var r = new Random().Next(500, 1500);
        Thread.Sleep(r);
        Console.WriteLine($"{id} finished in {r} ms");
    }
);
    threads[i] = t;
}

foreach (var t in threads)
{
    t.Start();
}

foreach (var t in threads)
{
    t.Join();
}

sw.Stop();
var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"elapsed: {elapsed} ms");

We create ten threads that run a random number of milliseconds. The main thread 
waits until all other threads finish and calculate the elapsed time.

var sw = new Stopwatch();
sw.Start();

We create the Stopwatch and run it.

sw.Stop();
var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"elapsed: {elapsed} ms");

At the end, we calculate the elapsed time and print results.

$ dotnet run
1
13 finished in 539 ms
4 finished in 547 ms
9 finished in 617 ms
6 finished in 782 ms
8 finished in 787 ms
7 finished in 917 ms
10 finished in 968 ms
12 finished in 1170 ms
5 finished in 1468 ms
11 finished in 1488 ms
elapsed: 1488 ms

The program runs as long as the longest thread.

## Source

[Thread class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.threading.thread?view=net-8.0)

In this article we have worked with threads in C#. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).