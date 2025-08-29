+++
title = "C# network"
date = 2025-08-29T19:51:08.324+01:00
draft = false
description = "C# network tutorial shows how to create basic network programs in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# network

last modified July 5, 2023

 

In this article we show how to create basic network programs in C#.

The System.Net namespace provides a simple programming interface
for many of the protocols used on networks today.

## C# Uri

Uri provides an object representation of a uniform resource
identifier (URI) and easy access to the parts of the URI.

Program.cs
  

var resource = "http://webcode.me:80/";
var resource2 = "http://webcode.me/index.html";
var resource3 = "http://www.webcode.me/name=Peter&amp;age=23";

var path = new Uri(resource);
var path2 = new Uri(resource2);
var path3 = new Uri(resource3);

Console.WriteLine(path.Port);
Console.WriteLine(path.Host);
Console.WriteLine(path.Authority);
Console.WriteLine(path.LocalPath);
Console.WriteLine(path.Scheme);

Console.WriteLine("-----------------------");

Console.WriteLine(path2.Port);
Console.WriteLine(path2.LocalPath);

Console.WriteLine("-----------------------");

Console.WriteLine(path3.Authority);
Console.WriteLine(path3.PathAndQuery);
Console.WriteLine(path3.Query);
Console.WriteLine(path3.AbsolutePath);
Console.WriteLine(path3.AbsoluteUri);

In this example, we work with the Uri class.

var resource = "http://webcode.me:80/";
var resource2 = "http://webcode.me/index.html";
var resource3 = "http://www.webcode.me/name=Peter&amp;age=23";

We define three resource paths.

var path = new Uri(resource);
var path2 = new Uri(resource2);
var path3 = new Uri(resource3);

From the paths, we create web resources.

Console.WriteLine(path.Port);
Console.WriteLine(path.Host);
Console.WriteLine(path.Authority);
Console.WriteLine(path.LocalPath);
Console.WriteLine(path.Scheme);

Here we print the various parts of a Uri.

$ dotnet run
80
webcode.me
webcode.me
/
http
-----------------------
80
/index.html
-----------------------
www.webcode.me
/name=Peter&amp;age=23

/name=Peter&amp;age=23
http://www.webcode.me/name=Peter&amp;age=23

## C# UriBuilder

UriBuilder provides a convenient way to modify the contents of a
Uri instance without creating a new Uri instance for
each modification.

Program.cs
  

using System.Net;

var uriBuilder = new UriBuilder();
uriBuilder.Scheme = "http";
uriBuilder.Host = "webcode.me";
uriBuilder.Path = "/";

Uri uri = uriBuilder.Uri;

WebRequest request = WebRequest.Create(uri);
using WebResponse response = request.GetResponse();

var headers = response.Headers;
Console.WriteLine(headers);

The example builds a Uri with UriBuilder and makes a simple
GET request to the resource.

var uriBuilder = new UriBuilder();
uriBuilder.Scheme = "http";
uriBuilder.Host = "webcode.me";
uriBuilder.Path = "/";

Uri uri = uriBuilder.Uri;

We build the Uri with the UriBuilder.

WebRequest request = WebRequest.Create(uri);

We create a web request to the Uri using WebRequest.

using WebResponse response = request.GetResponse();

With the GetResponse method, we make a synchronous request
to the resource specified by the Uri.

var headers = response.Headers;
Console.WriteLine(headers);

From the response, we get the headers and print them to the console.

$ dotnet run
Server: nginx/1.6.2
Date: Wed, 10 Feb 2021 12:42:16 GMT
Connection: keep-alive
ETag: "5d32ffc5-15c"
Access-Control-Allow-Origin: *
Accept-Ranges: bytes
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT

We see the headers of the server response to our request.

## C# hostname

The Dns.GetHostName method gets the host name of the local
computer.

Program.cs
  

using System.Net;

var hostName = Dns.GetHostName();
Console.WriteLine($"Hostname: {hostName}");

The program prints the hostname of our local computer.

$ dotnet run
Hostname: LAPTOP-OBLOFB9J

## C# Dns.GetHostAddresses

The Dns.GetHostAddresses returns an array of type IPAddress that
holds the IP addresses for the host.

Program.cs
  

using System.Net;

var hostname = "something.com";

IPAddress[] addresses = Dns.GetHostAddresses(hostname);

foreach (IPAddress address in addresses)
{
    Console.WriteLine($"{address}");
}

The example prints all IP addresses of a webpage.

$ dotnet run
2606:4700:3033::ac43:b7a8
2606:4700:3031::6815:3bce
172.67.183.168
104.21.59.206

## C# GetHostEntry

With the Dns.GetHostEntry method, we can determine an IP address
from the hostname.

Program.cs
  

using System.Net;

var name = "wikipedia.org";
IPHostEntry host = Dns.GetHostEntry(name);
var addresses = host.AddressList;

foreach (var address in addresses)
{
    Console.WriteLine($"{address}");
}

The example prints the IP addresses of the wikipedia.org website.

var addresses = host.AddressList;

The AddressList property contains a list of IP addresses
that are associated with a host.

$ dotnet run
2620:0:862:ed1a::1
91.198.174.192

The output consists of an IPv6 and IPv4 addresses.

## C# Ping

Ping is a network administration utility used to test the availability of a host
on an Internet Protocol (IP) network. Ping works by sending Internet Control
Message Protocol (ICMP) echo request packets to the target host and waits for
an ICMP echo reply. The program reports errors, packet loss, and a statistical
summary of the results.

.NET contains the Ping class for sending ping requests. The Ping
class uses instances of the PingReply class to return information
about the operation and receive the reply.

Program.cs
  

using System.Net.NetworkInformation;

using var ping = new Ping();

PingReply reply = ping.Send("192.168.0.23", 100);

if (reply.Status == IPStatus.Success)
{
    var msg = @$"Status: {reply.Status}
IP Address:{reply.Address}
Time:{reply.RoundtripTime}ms";
    Console.WriteLine(msg);
}
else
{
    Console.WriteLine(reply.Status);
}

We send a Ping request to a host on a local lan.

PingReply reply = ping.Send("192.168.0.23", 100);

The Send method attempts to send an ICMP echo message. The second
parameter is the timeout.

$ dotnet run
Status: Success
IP Address:192.168.0.23
Time:4ms

## C# Socket

In programming, a *socket* is an endpoint of a communication between two
programs running on a network. Sockets are used to create a connection
between a client program and a server program.

The System.Net.Sockets.Socket class implements the
Berkeley sockets interface.

Program.cs
  

using System.Text;
using System.Net;
using System.Net.Sockets;

string server = "webcode.me";
int port = 80;

var request = $"GET / HTTP/1.1\r\nHost: {server}\r\nConnection: Close\r\n\r\n";

Byte[] requestBytes = Encoding.ASCII.GetBytes(request);
Byte[] bytesReceived = new Byte[256];

IPHostEntry hostEntry = Dns.GetHostEntry(server);

var ipe = new IPEndPoint(hostEntry.AddressList[0], port);
using var socket = new Socket(AddressFamily.InterNetwork,
    SocketType.Stream, ProtocolType.Tcp);

socket.Connect(ipe);

if (socket.Connected)
{
    Console.WriteLine("Connection established");
}
else
{
    Console.WriteLine("Connection failed");
    return;
}

socket.Send(requestBytes, requestBytes.Length, 0);

int bytes = 0;
var sb = new StringBuilder();

do
{

    bytes = socket.Receive(bytesReceived, bytesReceived.Length, 0);
    sb.Append(Encoding.ASCII.GetString(bytesReceived, 0, bytes));
} while (bytes &gt; 0);

Console.WriteLine(sb.ToString());

The  example uses the Socket class to send data to an HTTP server
and receive the response. This example blocks until the entire page is received.
Note that socket programming is low-level. Classes such as HttpWebRequest
or HttpClient abstract away these low-level details.

string server = "webcode.me";
int port = 80;

We define the server and the port.

var request = $"GET / HTTP/1.1\r\nHost: {server}\r\nConnection: Close\r\n\r\n";

We define a GET request. A GET request is issued with the GET
command followed by the resource URL and HTTP protocol version. Note that the
\r\n characters are mandatory part of the communication process.
The details are described in [RFC 7231](https://tools.ietf.org/html/rfc7231) document.

Byte[] requestBytes = Encoding.ASCII.GetBytes(request);

We transform the text data of our request into bytes.

Byte[] bytesReceived = new Byte[256];

This byte array is for the data from the server.

IPHostEntry hostEntry = Dns.GetHostEntry(server);

With the Dns.GetHostEntry we find out the IP address
of the domain name.

var ipe = new IPEndPoint(hostEntry.AddressList[0], port);

We create an IPEndPoint; it is a network endpoint which consists
of an IP address and a port number. The IP address is retrieved from the
AddressList property.

using var socket = new Socket(AddressFamily.InterNetwork,
    SocketType.Stream, ProtocolType.Tcp);

A new TCP socket is created. The AddressFamily.InterNetwork
specifies that we use IPv4 addresses. The SocketType.Stream provides
reliable, two-way, connection-based byte streams. The ProtocolType.Tcp
determines the protocol type.

socket.Connect(ipe);

We Connect method connects to the network endpoint with the given
IPEndPoint.

if (socket.Connected)
{
    Console.WriteLine("Connection established");
}
else
{
    Console.WriteLine("Connection failed");
    return;
}

We check if we have successfully connected.

socket.Send(requestBytes, requestBytes.Length, 0);

We send the request to the server with the Send method.

do
{

    bytes = socket.Receive(bytesReceived, bytesReceived.Length, 0);
    sb.Append(Encoding.ASCII.GetString(bytesReceived, 0, bytes));
} while (bytes &gt; 0);

We get the data from the socket with the Receive method. We
transform the bytes into text with the GetString method and add
the text data into a StringBuilder.

Console.WriteLine(sb.ToString());

In the end, the text data is written to the console.

## C# UdpClient

The UdpClient provides User Datagram Protocol (UDP) network
services. It contains methods for sending and receiving connectionless UDP
datagrams in blocking synchronous mode. We do not need to establish a remote
host connection prior to sending and receiving data, since UDP is a
connectionless transport protocol,

Most public servers do not provide the echo service anymore due to security
concerns. In order to test the example, we need to set up a server on a local
lan and enable the xinetd (Debian) or inetd (FreeBSD)
daemon.

Program.cs
  

using System.Text;
using System.Net;
using System.Net.Sockets;

UdpClient udpClient = new UdpClient("core9", 7);
Byte[] data = Encoding.ASCII.GetBytes("Hello there");
udpClient.Send(data, data.Length);

IPEndPoint RemoteIpEndPoint = new IPEndPoint(IPAddress.Any, 0);

Byte[] received = udpClient.Receive(ref RemoteIpEndPoint);
string output = Encoding.ASCII.GetString(received);

Console.WriteLine(output);

udpClient.Close();

The example sends a message to an echo service. It is a simple service used for
testing purposes. The echo service listens on port 7. Note that the service
can run on TCP or UDP.

$ dotnet run
Hello there

The message that we send is echoed back to us.

## C# TcpClient

The TcpClient class requests data from an Internet resource using
TCP. TcpClient abstracts the low-level details for creating
a Socket for requesting and receiving data over TCP.

Since the connection to the remote device is represented as a stream, data can
be read and written with the .NET stream-handling techniques.

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
User-Agent: Console app
Connection: close
Host: webcode.me" + "\r\n\r\n";

using var reader = new StreamReader(networkStream, Encoding.UTF8);
byte[] bytes = Encoding.UTF8.GetBytes(message);

networkStream.Write(bytes, 0, bytes.Length);
Console.WriteLine(reader.ReadToEnd());

The example creates a GET request with the TcpClient.

using var client = new TcpClient();

var hostname = "webcode.me";
client.Connect(hostname, 80);

A TCP client is created. We connect to a remote host with the
Connect method.

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

With the GetStream method we obtain a network stream. We set a
timeout to two seconds.

var message = @"GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: Console app
Connection: close
Host: webcode.me" + "\r\n\r\n";

We build up the GET request message. HTTP/1.1 applications that do not support
persistent connections must include the close connection option in
every message.

using var reader = new StreamReader(networkStream, Encoding.UTF8);
byte[] bytes = Encoding.UTF8.GetBytes(message);

For the response from the server, we create a StreamReader.
We transform the text data into bytes with the GetBytes method.

networkStream.Write(bytes, 0, bytes.Length);

We write the message to the network stream with the Write
method.

Console.WriteLine(reader.ReadToEnd());

We read the response with the ReadToEnd method.

## C# FtpWebRequest

The FtpWebRequest implements a File Transfer Protocol (FTP) client.

Program.cs
  

using System.Net;

string uri = "ftp://192.168.0.21";

FtpWebRequest ftpRequest = (FtpWebRequest)WebRequest.Create(uri);
ftpRequest.Credentials = new NetworkCredential("user7", "s$cret");
ftpRequest.Method = WebRequestMethods.Ftp.ListDirectory;

using FtpWebResponse response = (FtpWebResponse)ftpRequest.GetResponse();
using var streamReader = new StreamReader(response.GetResponseStream());

var content = new List&lt;string&gt;();

string line = streamReader.ReadLine();
while (!string.IsNullOrEmpty(line))
{
    content.Add(line);
    line = streamReader.ReadLine();
}

foreach (var el in content)
{
    Console.WriteLine(el);
}

The example lists the contents on the FTP directory.

string uri = "ftp://192.168.0.21";

This is the URL path on a local FTP server.

FtpWebRequest ftpRequest = (FtpWebRequest)WebRequest.Create(uri);

From the URI, we create the FtpWebRequest.

ftpRequest.Credentials = new NetworkCredential("user7", "s$cret");
ftpRequest.Method = WebRequestMethods.Ftp.ListDirectory;

We provide the credentials and the FTP method; we are going to list
the contents or a directory.

using FtpWebResponse response = (FtpWebResponse)ftpRequest.GetResponse();
using var streamReader = new StreamReader(response.GetResponseStream());

We get a response and create a stream reader to read it.

var content = new List&lt;string&gt;();

string line = streamReader.ReadLine();
while (!string.IsNullOrEmpty(line))
{
    content.Add(line);
    line = streamReader.ReadLine();
}

The data is read into the list.

foreach (var el in content)
{
    Console.WriteLine(el);
}

Finally, the contents are printed to the console.

## C# SmtpClient

The SmtpClient allows applications to send email by using the
Simple Mail Transfer Protocol (SMTP).

Note that the class is marked as obsolete and it is recommended to use
the MailKit library for working with emails.

Program.cs
  

using System.Net.Mail;

var client = new SmtpClient("core9", 25);

using var msg = new MailMessage();
msg.From = new MailAddress("john.doe@example.com");
msg.Subject = "Hello";

msg.Body = "hello there";

msg.To.Add(new MailAddress("root@core9"));
client.Send(msg);

The example sends a simple mail to a server on a local network.

## C# HttpClient

HttpClient is a base class for sending HTTP requests and receiving
HTTP responses from a resource identified by a URI.

Program.cs
  

using var client = new HttpClient();

var result = await client.GetAsync("http://webcode.me");
Console.WriteLine(result.StatusCode);

The example creates a GET request to a small website. We get the status
code of the request.

using var client = new HttpClient();

A new HttpClient is created.

var result = await client.GetAsync("http://webcode.me");

The GetAsync method sends a GET request to the specified Uri as
an asynchronous operation. The await operator suspends the
evaluation of the enclosing async method until the asynchronous operation
completes. When the asynchronous operation completes, the await
operator returns the result of the operation, if any.

$ dotnet run
OK

We get the 200 OK status code; the website is up.

## C# HttpListener

HttpListener is a simple, programmatically controlled HTTP protocol
listener.

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

    using Stream ris = req.InputStream;
    using StreamReader sr = new StreamReader(ris, Encoding.UTF8);
    string doc = sr.ReadToEnd();

    Console.WriteLine($"Received request for {req.Url}");
    Console.WriteLine(doc);

    HttpListenerResponse resp = context.Response;

    string data = "Hello there!";
    byte[] buffer = Encoding.UTF8.GetBytes(data);
    resp.ContentLength64 = buffer.Length;

    Stream ros = resp.OutputStream;
    ros.Write(buffer, 0, buffer.Length);

    ros.Close();
}

The example creates a simple HTTP server.

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

We create a listener which listens on port 8001.

HttpListenerContext context = listener.GetContext();
HttpListenerRequest req = context.Request;

With GetContext, we wait for an incoming request and return when
one is received.

using Stream ris = req.InputStream;
using StreamReader sr = new StreamReader(ris, Encoding.UTF8);
string doc = sr.ReadToEnd();

Console.WriteLine($"Received request for {req.Url}");
Console.WriteLine(doc);

The server logs the request to the terminal.

HttpListenerResponse resp = context.Response;

string data = "Hello there!";
byte[] buffer = Encoding.UTF8.GetBytes(data);
resp.ContentLength64 = buffer.Length;

We build the response object.

Stream ros = resp.OutputStream;
ros.Write(buffer, 0, buffer.Length);

The server writes the data to the response output stream with
Write.

## Source

[Network programming in .NET](https://learn.microsoft.com/en-us/dotnet/fundamentals/networking/overview)

In this article we have created some basic networking programs in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).