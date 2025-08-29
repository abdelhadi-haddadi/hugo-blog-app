+++
title = "C# Ping"
date = 2025-08-29T19:51:13.058+01:00
draft = false
description = "C# Ping tutorial shows how to determine the accessibility of a remote host in C# with the Ping class."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Ping

last modified July 5, 2023

 

In this article we show how to determine the accessibility of a remote host in
C# with the Ping class.

Ping is located in the System.Net.NetworkInformation
namespace.

The name and the functionality of the Ping class come from the
classic ping networking utility. The ping utility is used to test the
reachability of a remote host on an IP network. It operates on the ICMP
protocol.

The Internet Control Message Protocol (ICMP) is used by hosts and
routers to communicate network-layer information to each other. Typically, it is
used for error reporting. The protocol is described by RFC 792.

Pinging is sending an ICMP echo request to the target host and waiting for an
ICMP echo reply.

The Ping's Send and SendAsync methods
send an ICMP echo request message to a remote computer and wait for an ICMP echo
reply message from that computer. The PingReply provides
information about the status and data resulting from the message.

## C# Ping Send

The Send method sends the ICMP echo request message to a remote
computer synchronously.

Program.cs
  

using System.Net.NetworkInformation;

string url = "example.com";

using var ping = new Ping();
PingReply res = ping.Send(url);

Console.WriteLine(res.Status);

The program pings a remote host in a synchronous manner.

using System.Net.NetworkInformation;

The Ping is located in the
System.Net.NetworkInformation namespace.

using var ping = new Ping();

A Ping object is created.

PingReply res = ping.Send(url);

We ping a host specified by the URL and receive a PingReply.

Console.WriteLine(res.Status);

We print the status code of the reply.

$ dotnet run
Success

## C# PingReply.RoundtripTime

The PingReply.RoundtripTime returns the number of milliseconds
taken to send an ICMP echo request and receive the corresponding ICMP echo reply
message.

Program.cs
  

using System.Net.NetworkInformation;

string url = "example.com";
using var ping = new Ping();

for (int i = 0; i &lt; 3; i++)
{
    PingReply res = await ping.SendPingAsync(url);

    Console.WriteLine($"{res.Status} from {res.Address} in {res.RoundtripTime} ms");
}

The program sends three async ping requests and returns the status, address, and
the round trip time.

Console.WriteLine($"{res.Status} from {res.Address} in {res.RoundtripTime} ms");

The round trip time is retrieved through the RoundtripTime property
of the PingReply.

$ dotnet run
Success from 2606:2800:220:1:248:1893:25c8:1946 in 199 ms
Success from 2606:2800:220:1:248:1893:25c8:1946 in 129 ms
Success from 2606:2800:220:1:248:1893:25c8:1946 in 145 ms

## Ping Timeout

Some overloaded methods allow to specify a timeout option for the pinging.

$ sudo tc qdisc add dev lo root netem delay 800ms

We use the Linux traffic control utility to add a delay of 800 ms to the
localhost.

$ sudo tc qdisc del dev lo root

This command removes all the rules for the lo interface.

Program.cs
  

using System.Net.NetworkInformation;

string url = "localhost";
using var ping = new Ping();

int timeout = 500;

PingReply res = await ping.SendPingAsync(url, timeout);
Console.WriteLine($"{res.Status} from {res.Address} in {res.RoundtripTime} ms");

In the program, we specify a timeout of 500 ms. We ping the localhost.

$ dotnet run
TimedOut from 0.0.0.0 in 0 ms

After adding the timeout rule with the traffic control utility, we have a
timeout status.

$ dotnet run
Success from 127.0.0.1 in 0 ms

After removing the delay rule, we receive success status.

## C# ping example

In the next example, we create a program that accepts options for the number 
of packets and for a timeout.

Program.cs
  

using System.Net.NetworkInformation;

string? url = string.Empty;
int c = 3;
int w = 0;

int n = args.Length;

if (n == 1)
{
    url = args[0];
}
else if (n == 2)
{
    url = args[0];
    c = int.Parse(args[1]);
}
else if (n == 3)
{
    url = args[0];
    c = int.Parse(args[1]);
    w = int.Parse(args[2]);
}
else
{
    Console.WriteLine("wrong number of parameters");
    return;
}

using var ping = new Ping();

if (w &gt; 0)
{
    for (int i = 0; i &lt; c; i++)
    {
        PingReply res = await ping.SendPingAsync(url, w);
        Console.WriteLine($"{res.Status} from {res.Address} in {res.RoundtripTime} ms");
    }
}
else
{
    for (int i = 0; i &lt; c; i++)
    {
        PingReply res = await ping.SendPingAsync(url);
        Console.WriteLine($"{res.Status} from {res.Address} in {res.RoundtripTime} ms");
    }
}

The first argument, which is mandatory, is the url. The next two optional
arguments are the number of packets and the timeout.

$ dotnet run example.com 2
Success from 2606:2800:220:1:248:1893:25c8:1946 in 128 ms
Success from 2606:2800:220:1:248:1893:25c8:1946 in 125 ms

## Source

[Ping class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.networkinformation.ping?view=net-8.0)

In this article we have worked with C# Ping class to ping a remote host.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).