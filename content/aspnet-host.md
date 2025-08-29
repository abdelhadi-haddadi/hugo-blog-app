+++
title = "ASP.NET Host"
date = 2025-08-27T23:21:17.919+01:00
draft = false
description = "ASP.NET Host tutorial shows how to use Host in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Host

last modified April 3, 2025

In this article, we explore the Host in ASP.NET 8. The Host is responsible
for app startup, lifetime management, and dependency injection configuration.

ASP.NET applications are built on top of the Host abstraction, which provides
a consistent way to configure and run apps. The Host manages resources and
services needed by the application.

## Basic Definition

The Host in ASP.NET is a container that encapsulates an app's resources and
services. It handles app startup, configuration, and lifetime management.

There are two main host types in ASP.NET: Web Host (legacy) and Generic Host.
Generic Host is recommended for all app types in .NET 8, including web apps.

The Host provides dependency injection, logging, configuration, and other
services automatically. It follows the builder pattern for configuration.

## ASP.NET Host Example

The following example demonstrates creating a custom background service using
the ASP.NET Host. This service runs continuously in the background.

Program.cs
  

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((context, services) =&gt;
    {
        services.AddHostedService&lt;WorkerService&gt;();
        services.AddSingleton&lt;IMessageService, MessageService&gt;();
    })
    .ConfigureLogging(logging =&gt;
    {
        logging.ClearProviders();
        logging.AddConsole();
    })
    .Build();

await host.RunAsync();

public class WorkerService : BackgroundService
{
    private readonly IMessageService _messageService;
    private readonly ILogger&lt;WorkerService&gt; _logger;

    public WorkerService(IMessageService messageService, 
        ILogger&lt;WorkerService&gt; logger)
    {
        _messageService = messageService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Worker service starting");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            var message = _messageService.GetMessage();
            _logger.LogInformation("Processing: {Message}", message);
            await Task.Delay(1000, stoppingToken);
        }
        
        _logger.LogInformation("Worker service stopping");
    }
}

public interface IMessageService
{
    string GetMessage();
}

public class MessageService : IMessageService
{
    private int _counter = 0;
    
    public string GetMessage()
    {
        return $"Message {++_counter} at {DateTime.Now:HH:mm:ss}";
    }
}

This example creates a background worker service that runs continuously. The
Host is configured with dependency injection and logging services.

The CreateDefaultBuilder method sets up common defaults like
configuration sources and logging providers. We then add our custom services.

The WorkerService inherits from BackgroundService and
implements the long-running operation. It demonstrates constructor injection of
both custom services and framework services like logging.

The MessageService is a simple service that generates messages.
It's registered as a singleton to maintain state across worker executions.

When run, this application will continuously log messages until stopped. The
Host manages the service lifetime and proper shutdown when interrupted.

## Source

[Microsoft ASP.NET Generic Host Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/generic-host?view=aspnetcore-8.0)

In this article, we have explored the Host in ASP.NET 8. The Host provides
a powerful foundation for building robust applications with proper resource
management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).