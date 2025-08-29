+++
title = "C# Socket"
date = 2025-08-29T19:51:24.408+01:00
draft = false
description = "C# Socket tutorial shows how to work with sockets in C#. A socket is an endpoint of a communication between two programs running on a network."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Socket

last modified July 5, 2023

 

In this article we show how to work with sockets in C#.

## Network protocols

TCP/IP is a suite of protocols used by devices to communicate over the Internet
and most local networks. TCP is more reliable, has extensive error checking, and
requires more resources. It is used by services such as HTTP, SMTP, or FTP. UDP
is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

## Socket

In programming, a socket is an endpoint of a communication between
two programs running on a network. In .NET, the Socket class
provides a rich set of methods and properties for network communications. It
allows us to perform both synchronous and asynchronous data transfer.

## C# UDP Socket example

UDP is a communication protocol that transmits independent packets over the
network with no guarantee of arrival and no guarantee of the order of delivery.
One service that used UDP is the Quote of the Day (QOTD).

Program.cs
  

using System.Text;
using System.Net;
using System.Net.Sockets;

string server = "djxmmx.net";
int port = 17;

byte[] data = new byte[0];
IPHostEntry hostEntry = Dns.GetHostEntry(server);

var ipe = new IPEndPoint(hostEntry.AddressList[0], port);
using var socket = new Socket(AddressFamily.InterNetworkV6,
    SocketType.Dgram, ProtocolType.Udp);

socket.ReceiveTimeout = 5000;
socket.SendTimeout = 2000;

socket.SendTo(data, ipe);

byte[] data2 = new byte[1024];
EndPoint remote = (EndPoint)ipe;

int n = socket.ReceiveFrom(data2, ref remote);

Console.WriteLine($"Message size: {n}");
Console.WriteLine($"Messaged received from: {remote}");
Console.WriteLine(Encoding.ASCII.GetString(data2, 0, n));

The program creates a client program that connects to a QOTD service.

string server = "djxmmx.net";
int port = 17;

This is the server and port on which the QOTD service can be found. Note that
such services are often short-lived.

byte[] data = new byte[0];

We send an empty message to the server.

IPHostEntry hostEntry = Dns.GetHostEntry(server);

The Dns.GetHostEntry resolves a host name or IP address to an
IPHostEntry instance. This is a .NET container class for Internet host address
information.

using var socket = new Socket(AddressFamily.InterNetworkV6,
    SocketType.Dgram, ProtocolType.Udp);

A Socket is created. We pass the addressing scheme, socket type,
and protocol type.

socket.ReceiveTimeout = 5000;
socket.SendTimeout = 2000;

We set the timeouts for receiving an sending data.

socket.SendTo(data, ipe);

We send the data (empty in this case) with SendTo to the endpoint.

byte[] data2 = new byte[1024];

Here we will store the response message.

int n = socket.ReceiveFrom(data2, ref remote);

The ReceiveFrom method receives a datagram into the data buffer and
stores the endpoint. It returns the number of bytes received.

Console.WriteLine($"Message size: {n}");
Console.WriteLine($"Messaged received from: {remote}");
Console.WriteLine(Encoding.ASCII.GetString(data2, 0, n));

We print the message size, remove address, and the data received.

$ dotnet run
Message size: 73
Messaged received from: [2001:470:e312:10::10]:17
"Take what you can, give nothing back..."
         - Pirates Of The Caribbean

## C# Socket HTTP HEAD request

A HEAD request is an HTTP GET request without a message body. The header of a
request/response contains metadata, such as HTTP protocol version or content
type.

Program.cs
  

using System.Text;
using System.Net;
using System.Net.Sockets;

string server = "webcode.me";
int port = 80;

var request = "HEAD / HTTP/1.0\r\n\r\n";

byte[] bReq = Encoding.ASCII.GetBytes(request);
byte[] bRec = new byte[8192];

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

socket.Send(bReq, bReq.Length, 0);

int n = socket.Receive(bRec, bRec.Length, 0);
Console.WriteLine(Encoding.ASCII.GetString(bRec, 0, n));

In the code example, we send a HEAD request to webcode.me. 

string server = "webcode.me";
int port = 80;

This is the server name and the port number. 

string request = "HEAD / HTTP/1.0\r\n\r\n";

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n
characters are mandatory part of the communication process. The details are
described in [RFC 7231](https://tools.ietf.org/html/rfc7231)
document.

using var socket = new Socket(AddressFamily.InterNetwork,
    SocketType.Stream, ProtocolType.Tcp);

The HTTP protocol (HTTP/0.9 through HTTP/2) is TCP-based.

if (socket.Connected)

We can check if we are successfully connected via the Connected 
property.

socket.Send(bReq, bReq.Length, 0);

We send the data with Send.

int n = socket.Receive(bRec, bRec.Length, 0);
Console.WriteLine(Encoding.ASCII.GetString(bRec, 0, n));

We receive and print the header data.

$ dotnet run
Connection established
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Wed, 21 Sep 2022 17:43:39 GMT
Content-Type: text/html
Content-Length: 394
Last-Modified: Sun, 23 Jan 2022 10:39:25 GMT
Connection: close
ETag: "61ed305d-18a"
Accept-Ranges: bytes

## C# Socket HTTP GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data. 

Program.cs
  

using System.Text;
using System.Net;
using System.Net.Sockets;

string server = "webcode.me";
int port = 80;

string request = $"GET / HTTP/1.1\r\nHost: {server} \r\nConnection: Close\r\n\r\n";

Byte[] bReq = Encoding.ASCII.GetBytes(request);
Byte[] bRec = new Byte[1024];

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

socket.Send(bReq, bReq.Length, 0);

int n = 0;
var sb = new StringBuilder();

do
{
    n = socket.Receive(bRec, bRec.Length, 0);
    sb.Append(Encoding.ASCII.GetString(bRec, 0, n));
}
while (n &gt; 0);

Console.WriteLine(sb);

The example reads the home page of the webcode.me using a GET request. 

string request = $"GET / HTTP/1.1\r\nHost: {server} \r\nConnection: Close\r\n\r\n";

We write a simple GET request to the socket. 

do
{
    n = socket.Receive(bRec, bRec.Length, 0);
    sb.Append(Encoding.ASCII.GetString(bRec, 0, n));
}
while (n &gt; 0);

Since we cannot establish the size of the response, we use a
do/while loop to read the response in chunks.

## Source

[Socket Class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.sockets.socket?view=net-8.0)

In this article we have worked with sockets in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).