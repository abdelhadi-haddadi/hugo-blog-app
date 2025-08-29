+++
title = "C# GET/POST request"
date = 2025-08-27T23:23:06.595+01:00
draft = false
description = "C# GET/POST request tutorial shows how to send HTTP
GET POST requests in C#. We use WebRequest and HttpClient."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# GET/POST request

last modified July 5, 2023

 

C# GET/POST tutorial shows how to send HTTP GET POST requests in C#. We use
WebRequest and HttpClient.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application
protocol for distributed, collaborative, hypermedia information systems. HTTP is
the foundation of data communication for the World Wide Web.

In the examples, we use httpbin.org, which is a freely available 
HTTP request and response service, and the webcode.me, which is 
a tiny HTML page for testing.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 
Requests using GET should only retrieve data.

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

## C# GET request with WebRequest

WebRequest makes a request to the specified Uniform Resource
Identifier (URI).

Program.cs
  

using System.Net;

var url = "http://webcode.me";

var request = WebRequest.Create(url);
request.Method = "GET";

using var webResponse = request.GetResponse();
using var webStream = webResponse.GetResponseStream();

using var reader = new StreamReader(webStream);
var data = reader.ReadToEnd();

Console.WriteLine(data);

The program creates a GET request to fetch the contents of a simple page. 
It prints the HTML content of the page to the console.

var request = WebRequest.Create(url);

The request is initialized with Create.

request.Method = "GET";

We set the method of the request to GET.

using var webResponse = request.GetResponse();

The GetResponse returns a web response containing the response to the
request.

using var webStream = webResponse.GetResponseStream();

In order to read the data, we get the instance of the stream class for reading 
data from the resource.

using var reader = new StreamReader(webStream);
var data = reader.ReadToEnd();

We read all the data from the stream.

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

## C# POST request with WebRequest

The next example creates a POST request with WebRequest.

Program.cs
  

using System.Text;
using System.Net;
using System.Text.Json;

var url = "https://httpbin.org/post";

var request = WebRequest.Create(url);
request.Method = "POST";

var user = new User("John Doe", "gardener");
var json = JsonSerializer.Serialize(user);
byte[] byteArray = Encoding.UTF8.GetBytes(json);

request.ContentType = "application/x-www-form-urlencoded";
request.ContentLength = byteArray.Length;

using var reqStream = request.GetRequestStream();
reqStream.Write(byteArray, 0, byteArray.Length);

using var response = request.GetResponse();
Console.WriteLine(((HttpWebResponse)response).StatusDescription);

using var respStream = response.GetResponseStream();

using var reader = new StreamReader(respStream);
string data = reader.ReadToEnd();
Console.WriteLine(data);

record User(string Name, string Occupation);

We send a POST request to the https://httpbin.org/post page. The data sent 
is in JSON format.

var request = WebRequest.Create(url);
request.Method = "POST";

We set the method of the request to POST.

var user = new User("John Doe", "gardener");
var json = JsonSerializer.Serialize(user);
byte[] byteArray = Encoding.UTF8.GetBytes(json);

We serialize a user object to JSON and transform the JSON data into an array of
bytes.

using var reqStream = request.GetRequestStream();
reqstream.Write(byteArray, 0, byteArray.Length);

We get the stream of the request with GetRequestStream and write 
the byte array into the stream with Write.

using var response = request.GetResponse();

We get the response with GetResponse.

Console.WriteLine(((HttpWebResponse)response).StatusDescription);

We print the status of the response.

using var respStream = response.GetResponseStream();

using var reader = new StreamReader(respStream);
string data = reader.ReadToEnd();
Console.WriteLine(data);

We read the data from the response stream.

$ dotnet run
OK
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "{\"Name\":\"John Doe\",\"Occupation\":\"gardener\"}": ""
  }, 
  "headers": {
    "Content-Length": "43", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "X-Amzn-Trace-Id": "Root=1-5ffb119c-010dea546a9b4c8c370bca46"
  }, 
  "json": null, 
  "origin": "188.167.250.74", 
  "url": "https://httpbin.org/post"
}

## C# GET request with HttpClient

HttpClient provides a base class for sending HTTP requests and
receiving HTTP responses from a resource identified by a URI.

Program.cs
  

using var client = new HttpClient();
var content = await client.GetStringAsync("http://webcode.me");

Console.WriteLine(content);

The program creates an asynchronous GET request using httpclient's 
GetStringAsync.

## C# POST request with HttpClient

The following example creates a POST request with HttpClient.

Program.cs
  

using System.Text;
using System.Text.Json;

var user = new User("John Doe", "gardener");

var json = JsonSerializer.Serialize(user);
var data = new StringContent(json, Encoding.UTF8, "application/json");

var url = "https://httpbin.org/post";
using var client = new HttpClient();

var response = await client.PostAsync(url, data);

string result = response.Content.ReadAsStringAsync().Result;
Console.WriteLine(result);

record User(string Name, string Occupation);

An asynchronous POST request with JSON payload is sent with
PostAsync; the response is read with
ReadAsStringAsync.

The next example uses Dictionary and
FormUrlEncodedContent. The FormUrlEncodedContent
is a container for name/value tuples encoded using
application/x-www-form-urlencoded MIME type.

Program.cs
  

using System.Text;
using System.Text.Json;

var values = new Dictionary&lt;string, string&gt;
{
    { "name", "John Doe" },
    { "occupation", "gardener" }
};

var data = new FormUrlEncodedContent(values);

var url = "https://httpbin.org/post";
using var client = new HttpClient();

var response = await client.PostAsync(url, data);

string result = response.Content.ReadAsStringAsync().Result;
Console.WriteLine(result);

In this example, the data is stored in a dictionary. We put the dictionary into 
a FormUrlEncodedContent container.

## Source

[Make HTTP requests with the HttpClient class - language reference](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/http/httpclient)

In this article we have shown how to generate GET and POST requests in C#. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).