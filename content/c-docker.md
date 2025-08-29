+++
title = "C# Docker"
date = 2025-08-27T23:22:58.555+01:00
draft = false
description = "C# Docker tutorial shows how to use Docker for
C# applications. Docker is a platform for developers and sysadmins to build,
run, and share applications with containers."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Docker

last modified July 5, 2023

 

In this article we show how to use Docker for C# applications.

Application containerization is an OS-level virtualization method
used to deploy and run distributed applications without having to create an
entire virtual machine for each application. With containers, it is possible to
run multiple isolated applications or services on a single host and access the
same OS kernel. Containers work on bare-metal systems, cloud instances or
virtual machines.

## Docker

Docker is a platform for developers and sysadmins to build, run, and
share applications with containers. Docker improves application portability
and scalability. It provides application isolation and thus eliminates many
issues caused by library and environment differences. It helps automate
development and deployment. With predefined community images, developers save
time and improve their overall experience.

A Docker image is a read-only template with instructions for creating
a Docker container. A Docker container is a runnable instance of an
image.

Images are stored in repositories. The [Docker Hub](https://hub.docker.com/)
is the official Docker repository. Docker Engine is the underlying
client-server technology that builds and runs containers using Docker's
components and services.

Dockerfile is a special file which contains instructions needed
to build a Docker image.

$ docker --version
Docker version 20.10.21, build baeda1f

This is the Docker version we use.

## C# Docker console example

In the next example, we create and run a very simple Docker image. When we
run the image, a console C# application is executed.

$ dotnet new console -o First

We create a new C# application.

Program.cs
  

Console.WriteLine("C# in Docker");

Console.WriteLine(Environment.OSVersion);
Console.WriteLine(Environment.Version);
Console.WriteLine(Environment.MachineName);

The application is a console program. It prints a message and some environment
details.

Dockerfile
  

FROM bitnami/dotnet-sdk
WORKDIR /app
COPY . .
RUN dotnet restore

RUN dotnet publish -c Release -o out
CMD ["dotnet", "out/First.dll"]

A Dockerfile is a series of commands to build the image.

FROM bitnami/dotnet-sdk

We base our image on the bitnami/dotnet-sdk image. It is an up-to-date and
secure image provided by Bitnami.

WORKDIR /app

We need to set a build directory. The WORKDIR command instructs
Docker to use the specified directory as the default destination for all
subsequent commands.

COPY . .

We copy all files to the work directory.

RUN dotnet restore

The dotnet restore installs the .NET local tools that are in scope
for the current directory.

RUN dotnet publish -c Release -o out

The dotnet publish commmand compiles the application, reads through
its dependencies specified in the project file, and publishes the resulting set
of files to a directory.

CMD ["dotnet", "out/First.dll"]

The CMD instruction runs the program upon starting the container.

$ docker build -t first .

We build the image and call it first.

$ docker image ls
REPOSITORY               TAG          IMAGE ID       CREATED         SIZE
first                    latest       9bec9d62a4ba   4 minutes ago   1.13GB
web                      latest       2423121e25d3   5 months ago    131MB
hello                    latest       1525ae981450   5 months ago    966MB
docker/getting-started   latest       cb90f98fd791   7 months ago    28.8MB

We list available images with docker image ls command.

$ docker run first

Welcome to the Bitnami dotnet-sdk container
Subscribe to project updates by watching https://github.com/bitnami/containers
Submit issues and feature requests at https://github.com/bitnami/containers/issues

C# in Docker
Unix 5.10.104.0
7.0.0
a75c8bf3c3bf

We run the image.

$ dotnet run
C# in Docker
Unix 5.15.0.56
7.0.0
andromeda

This is the output of the program on our local machine.

## C# Docker ASP.NET example

In the following example, we create an ASP.NET inside a Docker image.

$ dotnet new web --no-https -o WebApp

We create a new web application.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () =&gt; "home page\n");
app.MapGet("/about", () =&gt; Results.Content("about page\n"));
app.MapGet("/contact", () =&gt; "contact page\n");

app.Run("http://0.0.0.0:3000");

The application uses Minimal API; it has three endpoints and maps to port 3000.

Dockerfile
  

FROM bitnami/dotnet-sdk
WORKDIR /app
COPY . .
RUN dotnet restore

RUN dotnet publish -c Release -o out

EXPOSE 3000
CMD ["dotnet", "out/WebApp.dll", "--urls=http://0.0.0.0:3000"]

The Dockerfile contains instructions to build the image.

$ docker build . -t webapp

We build the image.

$ docker run -p 3000:3000 webapp

We run the image. The container's 3000 port is mapped to our host's 3000
port.

$ curl localhost:3000
home page
$ curl localhost:3000/about
about page

We test the application with the curl tool.

## Source

[Containerize a .NET app](https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=windows&amp;pivots=dotnet-8-0)

In this article we have worked with C# and Docker.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).