+++
title = "C# NetworkInterface"
date = 2025-08-29T19:51:08.309+01:00
draft = false
description = "C# NetworkInterface tutorial shows how to work with network interfaces in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# NetworkInterface

last modified July 5, 2023

 

In this article we show how to work with network interfaces in C#.

The System.Net namespace provides a simple programming interface
for many of the protocols used on networks today. 

A network interface is the point of interconnection between a
computer and a private or public network. It can be a physical network interface 
card (NIC) or implemented as a virtual software interface.

NetworkInterface provides configuration and statistical information
for a network interface. It is available in
System.Net.NetworkInformation namespace.

$ ls /sys/class/net/
lo  wlp0s20f3

On a Debian-based Linux system, we can find available interfaces in
/sys/class/net.

## C# GetIsNetworkAvailable

The GetIsNetworkAvailable method indicates whether any network
connection is available.

Program.cs
  

using System.Net.NetworkInformation;

if (NetworkInterface.GetIsNetworkAvailable())
{
    Console.WriteLine("Network available");
} else 
{
    Console.WriteLine("Network not available");
}

The program prints if a network is available.

## C# list network interfaces

In the first example, we list all network interfaces.

Program.cs
  

using System.Net.NetworkInformation;

var nics = from nic in NetworkInterface.GetAllNetworkInterfaces()
           where nic.OperationalStatus == OperationalStatus.Up
           select nic;

foreach (var nic in nics)
{
    Console.WriteLine(nic.Id);
    Console.WriteLine(nic.Name);
    Console.WriteLine(nic.Description);
    Console.WriteLine(nic.NetworkInterfaceType);
    Console.WriteLine(nic.OperationalStatus);
    Console.WriteLine(nic.Speed);

    Console.WriteLine("-----------------------------");
}

The GetAllNetworkInterfaces method returns objects that describe
the network interfaces on the local computer. We print some properties of 
the available network interfces.

$ dotnet run
lo
lo
lo
Loopback
Up
-1
-----------------------------
wlp0s20f3
wlp0s20f3
wlp0s20f3
Ethernet
Up
-1

## C# NetworkInterface MAC address

A MAC address, also called a hardware or physical address, is a unique
identifier that is used to identify individual electronic devices on a network.

Program.cs
  

using System.Net.NetworkInformation;

var macs = from nic in NetworkInterface.GetAllNetworkInterfaces()
           where nic.NetworkInterfaceType != NetworkInterfaceType.Loopback
               &amp;&amp; nic.OperationalStatus == OperationalStatus.Up
           select nic.GetPhysicalAddress();

Console.WriteLine(macs.FirstOrDefault());

We retrieve the MAC address with GetPhysicalAddress method. We skip
the Loopback by filtering out the NetworkInterfaceType.Loopback.

## C# NetworkInterface IP properties

The GetIPProperties method provides informatio Internet Protocol
version 4 (IPv4) or Internet Protocol version 6 (IPv6).

Program.cs
  

using System.Net.NetworkInformation;

var ipProps = from nic in NetworkInterface.GetAllNetworkInterfaces()
              where nic.NetworkInterfaceType != NetworkInterfaceType.Loopback
                  &amp;&amp; nic.OperationalStatus == OperationalStatus.Up
              select nic.GetIPProperties();

var ipProp = ipProps.First();

Console.WriteLine("IP address &amp; mask");

Console.WriteLine(ipProp.UnicastAddresses.FirstOrDefault()?.Address);
Console.WriteLine(ipProp.UnicastAddresses.FirstOrDefault()?.IPv4Mask);

Console.WriteLine("-----------------------------------");
Console.WriteLine("DNS");

Console.WriteLine(ipProp.DnsSuffix);
Console.WriteLine(string.Join(' ', ipProp.DnsAddresses));

Console.WriteLine("-----------------------------------");
Console.WriteLine("Gateway");

foreach (var e in ipProp.GatewayAddresses)
{
    Console.WriteLine(e.Address);
}

The example prints the IPv4 address and mask and some DSN and gateway info.

$ dotnet run
IP address &amp; mask
192.168.0.35
255.255.255.0
-----------------------------------
DNS
local
127.0.0.53
-----------------------------------
Gateway
192.168.0.1
fe80::20b:ff:fe00:add0%2

## C# NetworkInterface IP statistics

With GetIPStatistics method, we can get some IP statistical data
for an network interface on the local computer.

Program.cs
  

using System.Net.NetworkInformation;

var ipStats = from nic in NetworkInterface.GetAllNetworkInterfaces()
              where nic.NetworkInterfaceType != NetworkInterfaceType.Loopback
                  &amp;&amp; nic.OperationalStatus == OperationalStatus.Up
              select nic.GetIPStatistics();

var ipStat = ipStats.First();

Console.WriteLine(ipStat.BytesReceived);
Console.WriteLine(ipStat.BytesSent);
Console.WriteLine(ipStat.IncomingPacketsWithErrors);
Console.WriteLine(ipStat.OutgoingPacketsWithErrors);
Console.WriteLine(ipStat.IncomingPacketsDiscarded);
Console.WriteLine(ipStat.OutgoingPacketsDiscarded);

The example prints the number of bytes received and sent and the number of 
packets with errors and packets discarded.

## Source

[NetworkInterface class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.networkinformation.networkinterface?view=net-8.0)

In this article we have worked with network interfaces in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).