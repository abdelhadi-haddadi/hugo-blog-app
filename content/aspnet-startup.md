+++
title = "ASP.NET Startup"
date = 2025-08-29T19:49:23.825+01:00
draft = false
description = "ASP.NET Startup tutorial shows how to use Startup in ASP.NET 8 applications with a detailed example."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET Startup

last modified April 3, 2025

In this article, we explore the Startup class in ASP.NET 8. This class is
essential for configuring services and the application's request pipeline.

ASP.NET is a cross-platform, high-performance framework for building modern web
applications. The Startup class centralizes configuration in ASP.NET apps.

## Basic Definition

The Startup class in ASP.NET is responsible for configuring services and the
application's request processing pipeline. It contains two main methods.

ConfigureServices is used to add services to the dependency
injection container. Configure defines how the app responds to
HTTP requests.

In .NET 6 and later, the Startup pattern is optional but still supported. Many
apps now use the minimal hosting model with all configuration in Program.cs.

## ASP.NET Startup Example

The following example demonstrates a basic ASP.NET application using the
Startup class pattern in .NET 8.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

// Configure the host to use Startup class
builder.Host.ConfigureWebHostDefaults(webBuilder =&gt;
{
    webBuilder.UseStartup&lt;Startup&gt;();
});

var app = builder.Build();
app.Run();

This sets up the application host to use a separate Startup class for
configuration. The UseStartup method specifies the Startup class.

Startup.cs
  

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime
    public void ConfigureServices(IServiceCollection services)
    {
        // Add services to the container
        services.AddControllers();
        services.AddSwaggerGen();
        
        // Add custom services
        services.AddSingleton&lt;IWeatherService, WeatherService&gt;();
        
        // Configure options
        services.Configure&lt;AppSettings&gt;(Configuration.GetSection("AppSettings"));
    }

    // This method gets called by the runtime
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =&gt;
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =&gt;
            {
                await context.Response.WriteAsync("Hello World!");
            });
        });
    }
}

The Startup class demonstrates service configuration in ConfigureServices
and middleware pipeline setup in Configure. It uses dependency
injection for configuration.

ConfigureServices adds MVC controllers, Swagger documentation,
a custom weather service, and configures application settings from the
configuration system.

Configure sets up the request pipeline with development exception
pages, HTTPS redirection, routing, authorization, and endpoint configuration.
The environment check enables development-specific features.

This example shows the separation of concerns between service registration and
request pipeline configuration. The Startup class remains a powerful pattern
for organizing ASP.NET application setup.

## Source

[Microsoft ASP.NET Startup Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/startup?view=aspnetcore-8.0)

In this article, we have explored the Startup class in ASP.NET 8. This
powerful pattern helps organize application configuration and middleware setup.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).