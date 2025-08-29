+++
title = "ASP.NET Action"
date = 2025-08-27T23:21:02.777+01:00
draft = false
description = "ASP.NET Action tutorial shows how to use
Action in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Action

last modified April 3, 2025

In this article, we explore the Action delegate in ASP.NET 8. Action is a
built-in delegate type that simplifies method encapsulation and invocation.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Action delegate is commonly used for callbacks and event handlers.

## Basic Definition

The Action delegate in .NET represents a method that takes parameters but does
not return a value. It's part of the System namespace and comes in generic variants.

Action can encapsulate methods with up to 16 parameters. The non-generic Action
delegate represents a method with no parameters, while Action represents one
with a single parameter.

In ASP.NET, Action delegates are often used in middleware, request pipelines,
and for defining inline methods. They provide flexibility in method invocation.

## ASP.NET Action Example

The following example demonstrates using Action delegates in an ASP.NET 8 application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Register a service that uses Action
builder.Services.AddSingleton&lt;NotificationService&gt;();
builder.Services.AddTransient&lt;EmailNotifier&gt;();
builder.Services.AddTransient&lt;SmsNotifier&gt;();

var app = builder.Build();

// Middleware using Action
app.Use(async (context, next) =&gt;
{
    var logger = context.RequestServices.GetRequiredService&lt;ILogger&lt;Program&gt;&gt;();
    logger.LogInformation("Request started at {Time}", DateTime.Now);
    
    // Action as a callback
    Action&lt;string&gt; logAction = message =&gt; 
        logger.LogInformation("Middleware log: {Message}", message);
    
    logAction("Processing request...");
    
    await next.Invoke();
    
    logAction("Request completed");
});

app.MapGet("/notify", (NotificationService service) =&gt;
{
    // Using Action as parameter
    service.SendNotification("Important system update", notifier =&gt;
    {
        notifier.Notify("Admin", "Notification sent via callback");
    });
    
    return "Notification processed";
});

app.Run();

This sets up an ASP.NET application demonstrating Action usage in middleware and
services. The middleware shows Action as a callback for logging purposes.

Services/NotificationService.cs
  

public class NotificationService
{
    private readonly EmailNotifier _emailNotifier;
    private readonly SmsNotifier _smsNotifier;

    public NotificationService(EmailNotifier emailNotifier, SmsNotifier smsNotifier)
    {
        _emailNotifier = emailNotifier;
        _smsNotifier = smsNotifier;
    }

    public void SendNotification(string message, Action&lt;INotifier&gt; callback)
    {
        // Process notification
        Console.WriteLine($"Sending notification: {message}");
        
        // Use Action callback
        callback(_emailNotifier);
        callback(_smsNotifier);
        
        Console.WriteLine("Notification processing complete");
    }
}

public interface INotifier
{
    void Notify(string recipient, string message);
}

public class EmailNotifier : INotifier
{
    public void Notify(string recipient, string message)
    {
        Console.WriteLine($"Email to {recipient}: {message}");
    }
}

public class SmsNotifier : INotifier
{
    public void Notify(string recipient, string message)
    {
        Console.WriteLine($"SMS to {recipient}: {message}");
    }
}

This service demonstrates using Action as a method parameter. The SendNotification
method accepts a message and an Action delegate that operates on an INotifier.

The callback Action is invoked twice - once with EmailNotifier and once with
SmsNotifier. This shows how Actions can encapsulate different behaviors.

The example illustrates several Action use cases: as middleware callbacks, as
method parameters for flexible behavior, and with interface implementations.

## Source

[Microsoft Action Delegate Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.action?view=net-8.0)

In this article, we have explored the Action delegate in ASP.NET 8. This
versatile feature enables flexible method encapsulation and callback scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).