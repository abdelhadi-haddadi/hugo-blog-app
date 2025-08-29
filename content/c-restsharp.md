+++
title = "C# RestSharp"
date = 2025-08-29T19:51:19.951+01:00
draft = false
description = "C# RestSharp tutorial shows how to create HTTP requests with RestSharp in C#. RestSharp is a simple REST and HTTP API Client for .NET."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# RestSharp

last modified July 14, 2023

 

In this article we show how to create HTTP requests with RestSharp library in
C#.

The Hypertext Transfer Protocol (HTTP) is an application protocol for
distributed, collaborative, hypermedia information systems. HTTP is the
foundation of data communication for the World Wide Web.

*RestSharp* is a simple REST and HTTP API Client for .NET.

## C# RestSharp GET request

The GET method requests a representation of the specified resource. The
GetAsync executes the request asynchronously using GET HTTP method.

Program.cs
  

using RestSharp;
using System.Text.Json;
using System.Text.Json.Nodes;

string url = "https://jsonplaceholder.typicode.com";

using var client = new RestClient(url);
var req = new RestRequest("todos/3");
var resp = await client.GetAsync(req);

var data = JsonSerializer.Deserialize&lt;JsonNode&gt;(resp.Content!)!;

Console.WriteLine(data["id"]);
Console.WriteLine(data["title"]);
Console.WriteLine(data["completed"]);
Console.WriteLine(data);

We generate an asynchronous GET request to an online test API.

string url = "https://jsonplaceholder.typicode.com";

We define the URL. 

var client = new RestClient(url);
var req = new RestRequest("todos/3");
var resp = await client.GetAsync(req);

We build a RestClient and execute an async request with
GetAsync method.

var data = JsonSerializer.Deserialize&lt;JsonNode&gt;(resp.Content!)!;

We deserialize JSON string response to JsonNode object.

Console.WriteLine(data["id"]);
Console.WriteLine(data["title"]);
Console.WriteLine(data["completed"]);

We print the fields of the data object.

$ dotnet run 
3
fugiat veniam minus
false
{
  "userId": 1,
  "id": 3,
  "title": "fugiat veniam minus",
  "completed": false
}

In the next example, we deserialize the returned data into a custom object.

Program.cs
  

using RestSharp;
using System.Text.Json;

using var client = new RestClient("https://jsonplaceholder.typicode.com");
var req = new RestRequest("todos/4");
var resp = await client.GetAsync(req);

var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

var todo = JsonSerializer.Deserialize&lt;Todo&gt;(resp.Content!, options)!;

Console.WriteLine(todo.UserId);
Console.WriteLine(todo.Id);
Console.WriteLine(todo.Title);
Console.WriteLine(todo.Completed);

public class Todo
{
    public int UserId { get; set; }
    public int Id { get; set; }
    public string? Title { get; set; }
    public bool Completed { get; set; }
}

The returned data is deserialized into Todo objects.

var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};

We define the JsonSerializerOptions.

var todo = JsonSerializer.Deserialize&lt;Todo&gt;(resp.Content!, options)!;

We fill the attributes of the Todo object with data using 
JsonSerializer.Deserialize.

Console.WriteLine(todo.UserId);
Console.WriteLine(todo.Id);
Console.WriteLine(todo.Title);
Console.WriteLine(todo.Completed);

We print the fields of the todo object.

$ dotnet run 
1
4
et porro tempora
True

## C# RestSharp HEAD request

The HTTP HEAD method requests the headers that are returned if the specified
resource would be requested with an HTTP GET method but without its body.

The HEAD request is generated with Head/HeadAsync.

Program.cs
  

using RestSharp;

var client = new RestClient("http://webcode.me");
var req = new RestRequest("/");
var resp = client.Head(req);

foreach (var header in resp.Headers!)
{
    Console.WriteLine(header);
}

We generate a HEAD request to a resource and print the returned headers.

var resp = client.Head(req);

We generate a synchronous HEAD request.

foreach (var header in resp.Headers!)
{
    Console.WriteLine(header);
}

We iterate over the response Headers attribute.

$ dotnet run 
Server=nginx/1.6.2
Date=Sat, 15 Jul 2023 12:14:46 GMT
Connection=keep-alive

## C# RestSharp User-Agent

The User-Agent request header is a string that lets servers and network peers
identify the application, operating system, vendor, and/or version of the
requesting user agent.

Program.cs
  

using RestSharp;

string url = "http://webcode.me";
using var client = new RestClient(url);
client.AddDefaultHeader("User-Agent", "C# console program");

string resource = "/ua.php";
var req = new RestRequest(resource);
var resp = await client.GetAsync(req);

Console.WriteLine(resp.Content);

The program sets the User-Agent header with the
AddDefaultHeader method.

$ dotnet run
C# console program

## C# RestSharp POST JSON

We post JSON data with PostAsync method.

Program.cs
  

using System.Text.Json;
using RestSharp;
using System.Net.Http;

var person = new Person("John Doe", "gardener");
var json = JsonSerializer.Serialize(person);

var url = "https://httpbin.org";
using var client = new RestClient(url);

var req = new RestRequest("/post");
req.AddJsonBody(json);

var response = await client.PostAsync(req);
Console.WriteLine(response.Content);

record Person(string Name, string Occupation);

The program sends a POST request to an online testing website containing JSON
data.

var person = new Person("John Doe", "gardener");
var json = JsonSerializer.Serialize(person);

We serialize a Person object into a JSON string with
JsonSerializer.Serialize.

var req = new RestRequest("/post");
req.AddJsonBody(json);

We add the JSON string to the body of the request with AddJsonBody.

var response = await client.PostAsync(req);
Console.WriteLine(response.Content);

We generate a POST request and print the response content.

$ dotnet run
{
  ...
  "json": {
    "Name": "John Doe",
    "Occupation": "gardener"
  },
  ...
  "url": "https://httpbin.org/post"
}

## Source

[RestSharp documentation](https://restsharp.dev/intro.html#introduction)

In this article we have used RestSharp library to create HTTP requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).