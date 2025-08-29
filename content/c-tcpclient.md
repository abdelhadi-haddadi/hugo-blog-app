+++
title = "C# TcpClient"
date = 2025-08-29T19:51:33.385+01:00
draft = false
description = "C# TcpClient tutorial shows how to create network programs with TcpClient in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# TcpClient

last modified July 5, 2023

 

C# TcpClient tutorial shows how to create network programs with TcpClient in C#.
[C# tutorial](http://zetcode.com/lang/csharp/) is a comprehensive
tutorial on C# language.

## C# TcpClient

TcpClient class provides simple methods for connecting, sending,
and receiving stream data over a network.

## C# TcpClient HEAD request

The HTTP HEAD method requests the headers that are returned if the specified
resource would be requested with an HTTP GET method.

Program.cs
  

using System.Text;
using System.Net.Sockets;

using var client = new TcpClient();

var hostname = "webcode.me";
client.Connect(hostname, 80);

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

var message = "HEAD / HTTP/1.1\r\nHost: webcode.me\r\nUser-Agent: C# program\r\n"
    + "Connection: close\r\nAccept: text/html\r\n\r\n";

Console.WriteLine(message);

using var reader = new StreamReader(networkStream, Encoding.UTF8);

byte[] bytes = Encoding.UTF8.GetBytes(message);
networkStream.Write(bytes, 0, bytes.Length);

Console.WriteLine(reader.ReadToEnd());

In the example, we send a HEAD request to webcode.me. The request
is synchronous.

using var client = new TcpClient();

A new TcpClient is created. The using keyword releases
the resource when the variable goes out of scope.

var hostname = "webcode.me";
client.Connect(hostname, 80);

With the Connect method, we connect to the site using the specified
port.

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

We get a NetworkStream and set a read timeout.

using var writer = new StreamWriter(networkStream);

A StreamWriter is created. It is used to write data to the created
network stream.

var message = "HEAD / HTTP/1.1\r\nHost: webcode.me\r\nUser-Agent: C# program\r\n" +
    "Connection: close\r\nAccept: text/html\r\n\r\n";

We define a HEAD request. A HEAD request is issued with the HEAD command followed
by the resource URL and HTTP protocol version. Note that the
\r\n characters are part of the syntax. The details are described
in [RFC 7231](https://tools.ietf.org/html/rfc7231) document.

using var reader = new StreamReader(networkStream, Encoding.UTF8);

We create a StreamReader for reading the response.

byte[] bytes = Encoding.UTF8.GetBytes(message);
networkStream.Write(bytes, 0, bytes.Length);

The text command is transformed into bytes with the GetBytes
method. The bytes are written to the network stream with the Write
method.

Console.WriteLine(reader.ReadToEnd());

We read the response and write it to the console.

$ dotnet run
HEAD / HTTP/1.1
Host: webcode.me
User-Agent: C# program
Connection: close
Accept: text/html

HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 12 Jul 2022 18:49:44 GMT
Content-Type: text/html
Content-Length: 394
Last-Modified: Sun, 23 Jan 2022 10:39:25 GMT
Connection: close
ETag: "61ed305d-18a"
Accept-Ranges: bytes

## C# TcpClient GET request

The HTTP GET method requests a representation of the specified resource.

Program.cs
  

using System.Text;
using System.Net.Sockets;

using var client = new TcpClient();

var hostname = "webcode.me";
client.Connect(hostname, 80);

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

var message = @"GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: C# program
Connection: close
Host: webcode.me" + "\r\n\r\n";

Console.WriteLine(message);

using var reader = new StreamReader(networkStream, Encoding.UTF8);
byte[] bytes = Encoding.UTF8.GetBytes(message);

networkStream.Write(bytes, 0, bytes.Length);
Console.WriteLine(reader.ReadToEnd());

The example retrieves the home page of the specified website.

var message = @"GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: C# program
Connection: close
Host: webcode.me" + "\r\n\r\n";

We define a GET request.

$ dotnet run
GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: C# program
Connection: close
Host: webcode.me

HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 12 Jul 2022 19:29:46 GMT
Content-Type: text/html
Content-Length: 394
Last-Modified: Sun, 23 Jan 2022 10:39:25 GMT
Connection: close
ETag: "61ed305d-18a"
Access-Control-Allow-Origin: *
Accept-Ranges: bytes

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

## TcpClient POST request

The POST request sends data to the server. With Content-Type header
field, we tell the server what kind of data is sent. With the
application/x-www-form-urlencoded option, the data is sent in the
body of the request; the keys and values are encoded in key-value tuples
separated by '&amp;', with a '=' between the key and the value. This type is not
suitable for transferring of binary data because non-alphanumeric characters in
both keys and values are percent encoded.

Program.cs
  

using System.Text;
using System.Net.Sockets;

using var client = new TcpClient();

var hostname = "httpbin.org";
client.Connect(hostname, 80);

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

var data = "name=John+Doe&amp;occupation=gardener";
var n = data.Length;

var message = @$"POST /anything HTTP/1.1
Accept: */*
Accept-Language: en-US
User-Agent: C# program
Host: httpbin.org
Content-Type: application/x-www-form-urlencoded
Content-Length: {n}
Connection: close"
+ "\r\n\r\n" + data;

Console.WriteLine(message);

using var reader = new StreamReader(networkStream, Encoding.UTF8);
byte[] bytes = Encoding.UTF8.GetBytes(message);

networkStream.Write(bytes, 0, bytes.Length);

Console.WriteLine("---------------------");

Console.WriteLine(reader.ReadToEnd());

The example sends a POST request. It includes URL encoded data in its body.

var data = "name=John+Doe&amp;occupation=gardener";
var n = data.Length;

This is the data to be sent. We also need its length.

var message = @$"POST /anything HTTP/1.1
Accept: */*
Accept-Language: en-US
User-Agent: C# program
Host: httpbin.org
Content-Type: application/x-www-form-urlencoded
Content-Length: {n}
Connection: close"
+ "\r\n\r\n" + data;

We construct a POST request. We have to set the Content-Type and
the Content-Length header fields. The header and the data must be
separated with \r\n\r\n characters.

$ dotnet run
POST /anything HTTP/1.1
Accept: */*
Accept-Language: en-US
User-Agent: C# program
Host: httpbin.org
Content-Type: application/x-www-form-urlencoded
Content-Length: 33
Connection: close

name=John+Doe&amp;occupation=gardener
---------------------
HTTP/1.1 200 OK
Date: Wed, 13 Jul 2022 09:54:51 GMT
Content-Type: application/json
Content-Length: 521
Connection: close
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Language": "en-US", 
    "Content-Length": "33", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "C# program", 
    "X-Amzn-Trace-Id": "Root=1-62ce966b-112441ca5298988e4cb6ebee"
  }, 
  "json": null, 
  "method": "POST", 
  "origin": "188.167.250.179", 
  "url": "http://httpbin.org/anything"
}

## C# TcpClient async request

In the following example, we create an asynchronous request.

Program.cs
  

using System.Net.Sockets;

string host = "webcode.me";
int port = 80;
int timeout = 5000;

using var client = new TcpClient();

await client.ConnectAsync(host, port);

using var netstream = client.GetStream();
using var writer = new StreamWriter(netstream);
using var reader = new StreamReader(netstream);

writer.AutoFlush = true;
netstream.ReadTimeout = timeout;

var message = @"GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: Console app
Connection: close
Host: webcode.me" + "\r\n\r\n";

await writer.WriteLineAsync(message);

string response = await reader.ReadToEndAsync();
Console.WriteLine($"Server: {response}");

The example creates an asynchronous GET request to the webcode.me.

await client.ConnectAsync(host, port);

We connect asynchronously to the server.

await operator
suspends the evaluation of the ConnectAsync method until the
asynchronous operation completes. -->

await writer.WriteLineAsync(message);

We use the WriteLineAsync to write to the network stream
asynchronously.

string response = await reader.ReadToEndAsync();

We use the ReadToEndAsync to read from the network stream
asynchronously.

## Source

[TcpClient class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.sockets.tcpclient?view=net-8.0)

In this article we have worked with C# TcpClient.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).