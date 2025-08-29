+++
title = "ASP.NET JSON"
date = 2025-08-27T23:21:25.094+01:00
draft = false
description = "ASP.NET JSON tutorial shows how to produce and consume JSON data in ASP.NET."
image = ""
imageBig = ""
categories = ["asp-net"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ASP.NET JSON

last modified October 18, 2023

In this article we show how to produce and consume JSON data in ASP.NET.

ASP.NET is a cross-platform, high-performance, open-source framework for
building modern, cloud-enabled, web applications. It is developed by Microsoft.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## ASP.NET JSON example

In the following example, we send JSON data using miminal API. Minimal APIs
are often used to create microservices that return JSON data.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var users = new List&lt;User&gt;
{
    new User("John", "Doe", "gardener"),
    new User("Roger", "Roe", "driver"),
    new User("Jozef", "Kral", "shopkeeper"),
    new User("Boris", "Brezov", "musician"),
    new User("Lucia", "Novak", "teacher")
};

app.MapGet("/users", () =&gt; users);

app.Run("http://localhost:3000");

record User(string FirstName, string LastName, string Occupation);

For the /users endpoint, we send a list of users in JSON format.

app.MapGet("/users", () =&gt; users);

We map the endpoint to a lambda; the lambda returns a list of users. ASP.NET
automatically transforms the data into JSON format.

$ curl localhost:3000/users -i
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 04 Oct 2022 15:08:54 GMT
Server: Kestrel
Transfer-Encoding: chunked

[{"firstName":"John","lastName":"Doe","occupation":"gardener"},
{"firstName":"Roger","lastName":"Roe","occupation":"driver"},
{"firstName":"Jozef","lastName":"Kral","occupation":"shopkeeper"},
{"firstName":"Boris","lastName":"Brezov","occupation":"musician"},
{"firstName":"Lucia","lastName":"Novak","occupation":"teacher"}]

The HTTP status code and content type are automatically set.

## ASP.NET Results.Json

For explicit intent, we can use the Results.Json. It creates an
IResult that serializes the specified data object to JSON.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var users = new List&lt;User&gt;
{
    new User("John", "Doe", "gardener"),
    new User("Roger", "Roe", "driver"),
    new User("Jozef", "Kral", "shopkeeper"),
    new User("Boris", "Brezov", "musician"),
    new User("Lucia", "Novak", "teacher")
};

app.MapGet("/users", () =&gt; Results.Json(users));

app.Run("http://localhost:3000");

record User(string FirstName, string LastName, string Occupation);

For the /users path, we send a list of users in JSON using
Results.Json.

## ASP.NET consume JSON

The next example consumes JSON data from a request.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endppoints =&gt;
{
    endppoints.MapDefaultControllerRoute();
});

app.MapPost("/user", (User user) =&gt; Results.Content(user.ToString()));

app.Run("http://localhost:3000");

record User(string FirstName, string LastName, string Occupation);

We have one endpoint for posting a user. 

app.MapPost("/user", (User user) =&gt; Results.Content(user.ToString()));

With MapPost, we map the /user path to the lambda 
expression. The attributes of the User record are automatically 
filled from the request data. The lambda returns a text response back.

$ curl -X POST localhost:3000/user/ -H 'Content-Type: application/json' -d '{"FirstName": "Roger", "LastName":"Roe", "Occupation": "driver"}'
User { FirstName = Roger, LastName = Roe, Occupation = driver }

With curl, we send a post request to our endpoint.

## ASP.NET JSON controller example

In the following example, we send JSON data from a controller.

Program.cs
  

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseEndpoints(endppoints =&gt;
{
    endppoints.MapDefaultControllerRoute();
});

app.Run("http://localhost:3000");

We set up controllers without views.

Controllers/HomeController.cs
  

using Microsoft.AspNetCore.Mvc;

namespace JsonEx.Controllers;

public class HomeController : Controller
{
    [HttpGet("users")]
    public JsonResult Context()
    {
        var users = new List&lt;User&gt;
        {
            new User("John", "Doe", "gardener"),
            new User("Roger", "Roe", "driver"),
            new User("Jozef", "Kral", "shopkeeper"),
            new User("Boris", "Brezov", "musician"),
            new User("Lucia", "Novak", "teacher"),
        };

        return Json(users);
    }
}

record User(string FirstName, string LastName, string Occupation);

We have one endpoint. The action returns a JsonResult.

return Json(users);

We pass the data into Json.

## ASP.NET configure JSON

In the next example, we configure some JSON settings.

Program.cs
  

using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
var options = new JsonSerializerOptions(JsonSerializerDefaults.General);

var users = new List&lt;User&gt;
{
    new User { FirstName = "John",  LastName = "Doe", Occupation = "gardener" },
    new User { FirstName = "Roger", LastName = "Roe", Occupation =  "driver" },
    new User { FirstName = "Jozef", LastName = "Kral",  Occupation = "shopkeeper" },
    new User { FirstName = "Boris", LastName = "Brezov", Occupation = "musician" },
    new User { FirstName = "Lucia", LastName = "Novak",  Occupation = "teacher" }
};

app.MapGet("/users", () =&gt; Results.Json(users));
app.MapGet("/users2", () =&gt; Results.Json(users, options));

app.Run("http://localhost:3000");

class User
{
    [JsonPropertyOrder(2)]
    public string? FirstName { get; set; }

    [JsonPropertyOrder(3)]
    public string? LastName { get; set; }

    [JsonPropertyOrder(1)]
    public string? Occupation { get; set; }
}

In the example, we have two endpoints.

var options = new JsonSerializerOptions(JsonSerializerDefaults.General);
...
app.MapGet("/users2", () =&gt; Results.Json(users, options));

For the second endpoint, we pass JsonSerializerOptions as a
parameter.

class User
{
    [JsonPropertyOrder(2)]
    public string? FirstName { get; set; }

    [JsonPropertyOrder(3)]
    public string? LastName { get; set; }

    [JsonPropertyOrder(1)]
    public string? Occupation { get; set; }
}

We can configure the order of the properties with
JsonPropertyOrder.

$ curl localhost:3000/users
[{"occupation":"gardener","firstName":"John","lastName":"Doe"},
{"occupation":"driver","firstName":"Roger","lastName":"Roe"},
{"occupation":"shopkeeper","firstName":"Jozef","lastName":"Kral"},
{"occupation":"musician","firstName":"Boris","lastName":"Brezov"},
{"occupation":"teacher","firstName":"Lucia","lastName":"Novak"}]

From the output we can see that the occupation property comes 
before other two properties.

$ curl localhost:3000/users2
[{"Occupation":"gardener","FirstName":"John","LastName":"Doe"},
{"Occupation":"driver","FirstName":"Roger","LastName":"Roe"},
{"Occupation":"shopkeeper","FirstName":"Jozef","LastName":"Kral"},
{"Occupation":"musician","FirstName":"Boris","LastName":"Brezov"},
{"Occupation":"teacher","FirstName":"Lucia","LastName":"Novak"}]

For the second endpoint, the naming of the property has changed.

In this article we have shown how to produce and consume JSON in ASP.NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all ASP.NET tutorials](/all/#asp-net).