+++
title = "C# HttpListener"
date = 2025-08-29T19:50:52.031+01:00
draft = false
description = "C# HttpListener tutorial shows how to create simple HTTP servers in C#. HttpListener is a simple, programmatically controlled HTTP protocol listener."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# HttpListener

last modified July 5, 2023

 

In this article we show how to create simple HTTP servers in C# using
HttpListener class.

The Hypertext Transfer Protocol (HTTP) is an application protocol for
distributed, collaborative, hypermedia information systems. HTTP is the
foundation of data communication for the World Wide Web.

HttpListener is a simple, programmatically controlled HTTP protocol
listener. It can be used to create HTTP servers. It is located in the
System.Net namespace.

An HTTP server uses HTTP (Hypertext Transfer Protocol) to respond to client
requests made by browsers, crawlers, or tools such as curl or wget. It responds
with a web resource (such as HTML page, images, or multimedia) or an HTTP error
message.

## C# HttpListener status

In the first example, the server responds with a status code. HTTP response
status codes indicate whether a specific HTTP request has been successfully
completed

Program.cs
  

using System.Net;

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

Console.WriteLine("Listening on port 8001...");

while (true)
{
    HttpListenerContext ctx = listener.GetContext();
    using HttpListenerResponse resp = ctx.Response;

    resp.StatusCode = (int) HttpStatusCode.OK;
    resp.StatusDescription = "Status OK";
}

In the example, the listener responds with HttpStatusCode.OK.

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

We create an instance of HttpListener and add an URL and port on
which the listener listens.

listener.Start();

With Start, we begin to receive requests.

while (true)
{
    HttpListenerContext ctx = listener.GetContext();
    using HttpListenerResponse resp = ctx.Response;

Inside the loop, call GetContext which waits for an incoming
request and returns when one is received. From the context we get the response
object. This is the object that is sent back to the client.

resp.StatusCode = (int) HttpStatusCode.OK;
resp.StatusDescription = "Status OK";

We write the stats code and description to the response object.

From the response, we get the output stream to which we write data.

 -->

$ curl localhost:8001 -i
HTTP/1.1 200 Status OK
Server: Microsoft-NetCore/2.0
Date: Mon, 04 Jul 2022 12:38:24 GMT
Transfer-Encoding: chunked

## C# HttpListener send text

The next example sends text data to the client.

Program.cs
  

using System.Net;
using System.Text;

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

Console.WriteLine("Listening on port 8001...");

while (true)
{
    HttpListenerContext context = listener.GetContext();
    HttpListenerRequest req = context.Request;

    Console.WriteLine($"Received request for {req.Url}");

    using HttpListenerResponse resp = context.Response;
    resp.Headers.Set("Content-Type", "text/plain");

    string data = "Hello there!";
    byte[] buffer = Encoding.UTF8.GetBytes(data);
    resp.ContentLength64 = buffer.Length;

    using Stream ros = resp.OutputStream;
    ros.Write(buffer, 0, buffer.Length);
}

The server sends a text message.

HttpListenerRequest req = context.Request;

Console.WriteLine($"Received request for {req.Url}");

On the server side, we also log the request URL.

using HttpListenerResponse resp = context.Response;
resp.Headers.Set("Content-Type", "text/plain");

In the response headers, we set the Content-Type to
text/plain to hint the client what kind of data to expect.

string data = "Hello there!";
byte[] buffer = Encoding.UTF8.GetBytes(data);

We transform the message into bytes.

resp.ContentLength64 = buffer.Length;

We set the content length.

using Stream ros = resp.OutputStream;
ros.Write(buffer, 0, buffer.Length);

Finally, we write the bytes to the output stream.

$ curl localhost:8001
Hello there!

## C# HttpListener user agent

The User-Agent request header is a string that lets servers and network peers
identify the application, operating system, vendor, and/or version of the
requesting user agent.

Program.cs
  

using System.Net;
using System.Text;

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

Console.WriteLine("Listening on port 8001...");

while (true)
{
    HttpListenerContext ctx = listener.GetContext();
    HttpListenerRequest req = ctx.Request;

    string? ua = req.Headers.Get("User-Agent");

    using HttpListenerResponse resp = ctx.Response;
    resp.Headers.Set("Content-Type", "text/plain");

    string data = ua ?? "unknown";
    byte[] buffer = Encoding.UTF8.GetBytes(data);
    resp.ContentLength64 = buffer.Length;

    using Stream ros = resp.OutputStream;
    ros.Write(buffer, 0, buffer.Length);
}

The listener retrieves the User-Agent header from the client request and sends 
it back. 

string? ua = req.Headers.Get("User-Agent");

From the request headers, we get the User-Agent field.

string data = ua ?? "unknown";
byte[] buffer = Encoding.UTF8.GetBytes(data);
resp.ContentLength64 = buffer.Length;

using Stream ros = resp.OutputStream;
ros.Write(buffer, 0, buffer.Length);

We turn the text value into bytes and write the bytes into the response output 
stream.

Program.cs
  

var url = "http://localhost:8001";

using var client = new HttpClient();
client.DefaultRequestHeaders.Add("User-Agent", "C# program");

var res = await client.GetStringAsync(url);
Console.WriteLine(res);

We create an HttpClient which sends a request to the server; it also sets 
the User-Agent header field.

$ dotnet run
C# program

## C# HttpListener send image

In the next example, the server sends an image.

Program.cs
  

using System.Net;
using System.Text;

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

Console.WriteLine("Listening on port 8001...");

while (true)
{
    HttpListenerContext ctx = listener.GetContext();
    HttpListenerRequest req = ctx.Request;

    string? path = ctx.Request.Url?.LocalPath;

    if (path == "/image")
    {
        sendImage(ctx);
    }
    else
    {
        notFound(ctx);
    }
}

void notFound(HttpListenerContext ctx)
{
    using HttpListenerResponse resp = ctx.Response;
    resp.Headers.Set("Content-Type", "text/plain");

    using Stream ros = resp.OutputStream;

    ctx.Response.StatusCode = (int)HttpStatusCode.NotFound;
    string err = "404 - not found";

    byte[] ebuf = Encoding.UTF8.GetBytes(err);
    resp.ContentLength64 = ebuf.Length;

    ros.Write(ebuf, 0, ebuf.Length);
}

void sendImage(HttpListenerContext ctx)
{
    using HttpListenerResponse resp = ctx.Response;
    resp.Headers.Set("Content-Type", "image/png");

    byte[] buf = File.ReadAllBytes("public/img/sid.png");
    resp.ContentLength64 = buf.Length;

    using Stream ros = resp.OutputStream;
    ros.Write(buf, 0, buf.Length);
}

Inside the public/img directory, we have a PNG file.

string? path = ctx.Request.Url?.LocalPath;

From the request, we get the local path value. 

if (path == "/image")
{
    sendImage(ctx);
}
else
{
    notFound(ctx);
}

If the path is equal to /image, we send the image with
sendImage. Otherwise, we send the not found error.

void notFound(HttpListenerContext ctx)
{
    using HttpListenerResponse resp = ctx.Response;
    resp.Headers.Set("Content-Type", "text/plain");

    using Stream ros = resp.OutputStream;

    ctx.Response.StatusCode = (int)HttpStatusCode.NotFound;
    string err = "404 - not found";

    byte[] ebuf = Encoding.UTF8.GetBytes(err);
    resp.ContentLength64 = ebuf.Length;

    ros.Write(ebuf, 0, ebuf.Length);
}

The notFound method sends 404 error message back to the client.
It is a standard HTTP error message indicating that the resource was not found.

void sendImage(HttpListenerContext ctx)
{
    using HttpListenerResponse resp = ctx.Response;
    resp.Headers.Set("Content-Type", "image/png");

    byte[] buf = File.ReadAllBytes("public/img/sid.png");
    resp.ContentLength64 = buf.Length;

    using Stream ros = resp.OutputStream;
    ros.Write(buf, 0, buf.Length);
}

Inside sendImage, we read the image with File.ReadAllBytes
and write the array of bytes to the output stream with Write.
We also set the appropriate image/png content type.

## Source

[HttpListener class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.httplistener?view=net-8.0)

In this article we have used HttpListener to create simple HTTP servers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).