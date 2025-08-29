+++
title = "C# Mutex"
date = 2025-08-29T19:51:07.106+01:00
draft = false
description = "C# Mutex tutorial shows how to synchronize threads in C# with Mutex primitive."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Mutex

last modified July 5, 2023

 

In this article we show how to use the Mutex primitive to ensure thread safety 
in C#.

A *thread* is a unique execution path of a program. The
Thread class represents a thread in C#. It creates and controls a
thread, sets its priority, and gets its status.

A *deadlock* occurs when a set of threads share the same resource and are
blocked by each other by attempting to access a resource already locked by
another thread.

## Mutex

In order to ensure thread safety, we need a synchronization mechanizm to grant
access to a shared resource. A Mutex is a synchronization primitive
that grants access to a shared resource to only one thread. Other threads
wanting to access the resource are blocked until the one holding the mutex
releases it.

A mutex is similar to a *lock*, but it can work across multiple
processes; that is, it can be computer-wide as well as application-wide. The
Mutex class is located in the System.Threading
namespace.

The section of code that accesses the shared resource is called a critical or
protected section. The resource can be a data structure or a device. A thread
acquires a mutex with WaitOne and releases it with
ReleaseMutex.

## C# Mutex simple example

The following is a simple example that uses Mutex.

Program.cs
  

class Program
{
    private static Mutex mutex = new Mutex();
    private const int nThreads = 4;

    private static void Worker()
    {
        UseResource();
    }

    private static void UseResource()
    {
        mutex.WaitOne();
        string? name = Thread.CurrentThread.Name;

        Console.WriteLine($"{name} has entered protected section");

        Thread.Sleep(800);
        Console.WriteLine($"{name} has left protected section");

        mutex.ReleaseMutex();
    }

    static void Main(string[] args)
    {
        for (int i = 0; i &lt; nThreads; i++)
        {
            var t = new Thread(new ThreadStart(Worker));
            t.Name = $"Thread {i + 1}";
            t.Start();
        }

        Console.Read();
    }
}

In the program, we create four threads that access a shared resource. Each of 
the threads has exclusive access to the resource. 

private static Mutex mutex = new Mutex();

The Mutex is a static field.

private static void Worker()
{
    UseResource();
}

Each of the threads calls this worker.

private static void UseResource()
{
    mutex.WaitOne();
    string? name = Thread.CurrentThread.Name;

    Console.WriteLine($"{name} has entered protected section");

    Thread.Sleep(800);
    Console.WriteLine($"{name} has left protected section");

    mutex.ReleaseMutex();
}

This is the critical section of the code that is protected by mutex using 
WaitOne and ReleaseMutex methods.

for (int i = 0; i &lt; nThreads; i++)
{
    var t = new Thread(new ThreadStart(Worker));
    t.Name = $"Thread {i + 1}";
    t.Start();
}

In a for loop, we generate four threads.

Console.Read();

To ensure that all threads have time to finish, we call the
Console.Read method. Just press enter after the threads finish
running.

$ dotnet run
Thread 1 has entered protected section
Thread 1 has left protected section
Thread 2 has entered protected section
Thread 2 has left protected section
Thread 3 has entered protected section
Thread 3 has left protected section
Thread 4 has entered protected section
Thread 4 has left protected section

## C# Mutex single instance

In the following example, we create a single instance application. Only one 
application is allowed to run on computer.

To create a single-instance application, we use a named mutext. In order for the
mutex to apply to all terminal sessions, the name of the mutex is prefixed with
Global\.

Program.cs
  

public class Program
{
    public static void Main()
    {
        using var mutex = new Mutex(false, @"Global\MySingletonApp");

        bool IsRunning = !mutex.WaitOne(TimeSpan.Zero);

        if (IsRunning)
        {
            Console.WriteLine("application is already running");
            return;
        }

        Console.WriteLine("application started");
        Console.ReadKey();
    
        mutex.ReleaseMutex();
    }
}

In the program, we create a global named mutex. This prevents us to create more 
than one instances of the application on a computer. Another instance of the 
program can be run only after the running application finishes.

Try to run the application in two different terminals. 

## Source

[Mutex class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.threading.mutex?view=net-8.0)

In this article we have used Mutex primitive to synchronize access to a
protected resource in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).