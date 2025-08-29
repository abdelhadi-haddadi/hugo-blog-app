+++
title = "ASP.NET IHostBuilder"
date = 2025-08-27T23:21:24.003+01:00
draft = false
description = "ASP.NET IHostBuilder tutorial shows how to use IHostBuilder in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET IHostBuilder

last modified April 3, 2025

In this article, we explore the IHostBuilder interface in ASP.NET 8. This
interface is fundamental for configuring and building .NET Generic Hosts.

ASP.NET Core applications use IHostBuilder to set up services, configuration,
and the application's lifetime. It provides a consistent way to build host
applications.

## Basic Definition

IHostBuilder is an interface in .NET that provides methods for configuring and
building host instances. It's part of the Microsoft.Extensions.Hosting namespace.

The host is responsible for app startup and lifetime management. IHostBuilder
allows configuring services, logging, configuration, and dependency injection.

In ASP.NET Core, WebApplication.CreateBuilder() internally uses IHostBuilder.
It creates a host with web-specific defaults while allowing customization.

## ASP.NET IHostBuilder Example

The following example demonstrates creating a custom host using IHostBuilder.

Program.cs
  

using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var hostBuilder = Host.CreateDefaultBuilder(args);

hostBuilder.ConfigureServices((context, services) =&gt;
{
    services.AddHostedService&lt;WorkerService&gt;();
    services.AddSingleton&lt;IMessageService, MessageService&gt;();
    
    if (context.HostingEnvironment.IsDevelopment())
    {
        services.AddTransient&lt;IDevice, SimulatedDevice&gt;();
    }
    else
    {
        services.AddTransient&lt;IDevice, PhysicalDevice&gt;();
    }
});

hostBuilder.ConfigureLogging(logging =&gt;
{
    logging.ClearProviders();
    logging.AddConsole();
    logging.AddDebug();
});

hostBuilder.ConfigureAppConfiguration((hostingContext, config) =&gt;
{
    config.AddJsonFile("appsettings.json", optional: true);
    config.AddEnvironmentVariables();
    
    if (args != null)
    {
        config.AddCommandLine(args);
    }
});

using var host = hostBuilder.Build();
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
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await _messageService.SendMessageAsync("Hello from worker!");
            await Task.Delay(1000, stoppingToken);
        }
    }
}

public interface IMessageService
{
    Task SendMessageAsync(string message);
}

public class MessageService : IMessageService
{
    public Task SendMessageAsync(string message)
    {
        Console.WriteLine($"Message sent: {message}");
        return Task.CompletedTask;
    }
}

public interface IDevice { }
public class SimulatedDevice : IDevice { }
public class PhysicalDevice : IDevice { }

This example shows a complete console application using IHostBuilder to create
a .NET Generic Host. The host includes services, logging, and configuration.

The CreateDefaultBuilder method creates a host builder with default
settings. We then configure services, logging, and app configuration in separate
method calls.

The example demonstrates dependency injection by registering different services.
It shows environment-specific service registration for development vs production.

The WorkerService is a background service that runs continuously.
It uses dependency injection to get an IMessageService and logger.

This pattern is useful for long-running services, worker processes, or any
application needing dependency injection and configuration management.

## Source

[Microsoft Generic Host Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/host/generic-host?view=aspnetcore-8.0)

In this article, we have explored the IHostBuilder interface in ASP.NET 8. This
powerful feature provides a consistent way to build and configure .NET hosts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).