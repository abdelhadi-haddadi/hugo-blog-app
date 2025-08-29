+++
title = "Reading a web page in C#"
date = 2025-08-29T19:51:18.843+01:00
draft = false
description = "C# read web page tutorial shows how to read a web page in C# using HttpClient, Flurl.Http, and RestSharp."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Reading a web page in C#

last modified July 5, 2023

 

In this article we show how to get a web page in C#.

The article shows how to read a page using,  HttpClient, 
Flurl.Http, and RestSharp.

**Note: ** built-in HttpWebRequest and 
WebClient are obsolete, they should not be used anymore for 
HTTP requests.

In the examples of this tutorial, we read a web page from a small webpage
[webcode.me](http://www.webcode.me).

## C# read web page with HttpClient

HttpClient provides a base class for sending HTTP requests and
receiving HTTP responses from a resource identified by a URI.

Program.cs
  

using var client = new HttpClient();
client.DefaultRequestHeaders.Add("User-Agent", "C# console program");

var content = await client.GetStringAsync("http://webcode.me");

Console.WriteLine(content);

The code example scrapes a web page asynchronously using the
HttpClient. HttpClient is a modern way of fetching web
pages in .NET.

var content = await client.GetStringAsync("http://webcode.me");

The await operator takes an awaitable as an argument; it examines
if awaitable has already completed; if the awaitable has already completed, then
the method continues running. The GetStringAsync reads the
content to a string as an asynchronous operation.

$ dotnet run
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;

    &lt;p&gt;
            Hello there. How are you?
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

## C# read web page with Flurl.Http

*Flurl.Http* is a fluent, portable, testable HTTP, third-party client
library for the C# language.

$ dotnet add package Flurl.Http

We install the Flurl.Http package.

DownloadPageFlurl.cs
  

string result = await "http://webcode.me".GetStringAsync();
Console.WriteLine(result);

The example reads a small web page and prints its contents to the terminal.

string result = await "http://webcode.me".GetStringAsync();

The await operator is applied to a task in an asynchronous method
to suspend the execution of the method until the awaited task completes. The
task represents ongoing work. The data is retrieved with the
GetStringAsync extention method.

## Reading a web page with RestSharp

*RestSharp* is a simple REST and HTTP API client for .NET.
It is a third-party library.

$ dotnet add package RestSharp

We install the RestSharp package.

Program.cs
  

using RestSharp;

var client = new RestClient("http://webcode.me");
var request = new RestRequest();

var res = await client.ExecuteGetAsync(request);

Console.WriteLine(res.Content);

The code example gets the contents of a web page using RestSharp library.
The web page is downloaded asynchronously.

var client = new RestClient("http://webcode.me");

A rest client is created with the RestClient class.

var request = new RestRequest();

A request is created with RestRequest; the default is a GET
request.

var res = await client.ExecuteGetAsync(request);

The request is executed asynchronously using the ExecuteGetAsync
method.

Console.WriteLine(res.Content);

The content of the response is printed.

## Source

[HttpClient class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-8.0)

In this article we have shown how to read a web page in C#. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).