+++
title = "Perl socket"
date = 2025-08-29T20:04:03.582+01:00
draft = false
description = "Perl socket tutorial shows how to program sockets in Perl. In programming, a socket is an endpoint of a communication between two programs running on a network."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl socket

last modified August 24, 2023

Perl socket tutorial shows how to work with sockets in Perl. Socket programming
is low-level. The purpose of the tutorial is to introduce network programming
including these low-level details. There are higher-level APIs that may be more
practical in real-world scenarios.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

## Network protocols

TCP/IP is a suite of protocols used by devices to communicate over the Internet
and most local networks. TCP is more reliable, has extensive error checking, and
requires more resources. It is used by services such as HTTP, SMTP, or FTP. UDP
is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

## Perl socket modules

The Socket module provides networking constants and support
functions.

The IO::Socket::INET provides an object interface to creating and
using sockets in the AF_INET domain; it is used with IPv4 adresses.
The IO::Socket::IP is a module for working with both  IPv4 and IPv6
adresses.

## Perl UDP socket example

UDP is a communication protocol that transmits independent packets over the
network with no guarantee of arrival and no guarantee of the order of delivery.
One service that used UDP is echo.

The Echo Protocol is a service in the Internet Protocol Suite defined in RFC
862. The Echo Protocol can use the TCP or the UDP on the port number 7. The
server sends back an identical copy of the data it received.

We set up an echo service on a local Debian system.

$ cat /etc/services | grep echo | head -4
echo            7/tcp
echo            7/udp
echo            4/ddp                   # AppleTalk Echo Protocol

Port 7 is reserved for echo service.

Due to security concerns, the echo service is disabled in most cases on publicly
available computers. Therefore, we create our own service in a local network.

We start the echo service on a different computer in a local network.

# apt install xinetd

We install the xinetd package. The package contains the the 
xinetddaemon, which is a TCP wrapped super service for accessing 
a subset of popular network services including echo, FTP, IMAP, and telnet.

...
# This is the udp version.
service echo
{
        disable         = no
        type            = INTERNAL
        id              = echo-dgram
        socket_type     = dgram
        protocol        = udp
        user            = root
        wait            = yes
}

In the /etc/xinetd.d/echo file, we set the disable
option to no.

# systemctl start xinetd

We start the service.

echo_client.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $addr = 'core9';
my $port = 7;

my $msg = shift || "hello";

my $sock = IO::Socket::INET-&gt;new(
    Domain =&gt; AF_INET,
    PeerAddr =&gt; $addr,
    PeerPort =&gt; $port,
    Proto =&gt; 'udp',
) or die "failed to create socket: $!\n";

$sock-&gt;send("$msg\n", 0);

my $data = &lt;$sock&gt;;
say "$data";

$sock-&gt;close();

The example sends a message to the echo service on a local network computer. The
computer echoes back the message.

my $addr = 'core9';
my $port = 7;

We define the network address and port.

my $sock = IO::Socket::INET-&gt;new(
    Domain =&gt; AF_INET,
    PeerAddr =&gt; $addr,
    PeerPort =&gt; $port,
    Proto =&gt; 'udp',
) or die "failed to create socket: $!\n";

We create a new socket with IO::Socket::INET. We specify the 
domain, address, port, and protocol.

$sock-&gt;send("$msg\n", 0);

We send a message on the socket. 

my $data = &lt;$sock&gt;;
say "$data";

We read and print the response.

$sock-&gt;close();

We close the socket with close.

$ ./echo_client.pl cau
cau

## Perl socket QOTD

A quote of the day service is a debugging and measurement tool is. The quote of
the day service simply sends a short message without regard to the input. 

$ cat /etc/services | grep qotd
qotd            17/tcp          quote

Port 17 is reserved for the quote of the day service.

qotd.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $sock = IO::Socket::INET-&gt;new("djxmmx.net:17")
    or die "failed to create socket: $!\n";

$sock-&gt;send('', 0);

while (&lt;$sock&gt;) {
    print $_;
}

print "\n";

$sock-&gt;close();

The example creates a client program that connects to a QOTD service. 

my $sock = IO::Socket::INET-&gt;new("djxmmx.net:17")
    or die "failed to create socket: $!\n";

A TCP socket is created to the specified address and port. If the protocol is
not specified, the TCP is assumed. Note that services like this are ephemeral;
they may be removed anytime. 

$sock-&gt;send('', 0);

We send an empty message to the socket. 

$ ./qotd.pl 
"Here's the rule for bargains: "Do other men, for they would do you."
    That's the true business precept." Charles Dickens (1812-70)

## Perl socket WHOIS example

WHOIS service allows use to find information about domain name registration,
such as the registration date and domain name age, or contact details of the
person or organization owning the domain.

On the modern Internet, WHOIS services are typically communicated using the
Transmission Control Protocol (TCP). Servers listen to requests on the
well-known port number 43.

Note that the whoise services are often limited to a small set of domains.

whs.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $domainName = shift || "example.me";
my $host = "whois.nic.me";
my $port = 43;

my $sock = IO::Socket::INET-&gt;new(
    PeerHost =&gt; $host,
    PeerPort =&gt; $port,
    Proto =&gt; 'tcp',
) or die "failed to create socket: $!\n";

say 'socket created';

my $size = $sock-&gt;send("$domainName\n", 0);
say "Sent data of length: $size";

say '-------------------------';
 
while (&lt;$sock&gt;) {
    print $_;
}

close $sock;

In the example, we query a WHOIS service about the given domain.

$ ./whs.pl tada.me
socket created
Sent data of length: 8
-------------------------
Domain Name: TADA.ME
Registry Domain ID: D425500000006230617-AGRS
Registrar WHOIS Server: whois.godaddy.com
Registrar URL: http://www.godaddy.com
Updated Date: 2021-01-11T19:57:02Z
Creation Date: 2017-09-09T18:21:42Z
Registry Expiry Date: 2021-09-09T18:21:42Z
...

## Perl socket HEAD request

A HEAD request is an HTTP GET request without a message body. The header of a
request/response contains metadata, such as HTTP protocol version or content
type. 

head_req.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $addr = 'webcode.me:80';
my $req = "HEAD / HTTP/1.0\r\n\r\n";

my $sock = IO::Socket::INET-&gt;new(
    Domain =&gt; AF_INET,
    PeerAddr =&gt; $addr,
) or die "failed to create socket: $!\n";

$sock-&gt;send($req, 0);

while (&lt;$sock&gt;) {
    print $_;
}

$sock-&gt;close();

In the example, we send a HEAD request to webcode.me. 

$sock-&gt;send("HEAD / HTTP/1.0\r\n\r\n", 0);

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n
characters are mandatory part of the communication process. The details are
described in [RFC 7231](https://tools.ietf.org/html/rfc7231)
document.

$ ./head_req.pl 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Wed, 30 Jun 2021 12:57:05 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: close
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## Perl socket GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data. 

get_req.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $addr = 'webcode.me:80';

my $req = "GET / HTTP/1.0\r\n" .
    "Host: webcode.me\r\n" .
    "User-Agent: Perl client\r\n\r\n";

my $sock = IO::Socket::INET-&gt;new(
    PeerAddr =&gt; $addr,
) or die "failed to create socket: $!\n";

$sock-&gt;send($req, 0);

while (&lt;$sock&gt;) {
    print $_;
}

$sock-&gt;close();

The example reads the home page of the webcode.me using a GET request. 

my $req = "GET / HTTP/1.0\r\n" .
    "Host: webcode.me\r\n" .
    "User-Agent: Perl client\r\n\r\n";

We write a simple GET request.

## Perl socket send mail

To send an email via socket, we utilize the SMTP commands, such as HELO, MAIL
FROM, and DATA. 

send_mail.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use IO::Socket::INET;

my $from = 'john.doe@example.com';
my $to = 'root@core9';
my $name = 'John Doe';
my $subject = 'Hello';
my $body = 'Hello there';
my $addr = 'core9:25';

my $req = "HELO core9\r\n" .
    "MAIL FROM: $from\r\n" .
    "RCPT TO: $to\r\n" .
    "DATA\r\n" .
    "From: $name\r\n" .
    "Subject: $subject \r\n" .
    "$body\r\n.\r\n" . "QUIT\r\n";

my $sock = IO::Socket::INET-&gt;new(
    PeerAddr =&gt; $addr,
) or die "failed to create socket: $!\n";

$sock-&gt;send($req, 0);

while (&lt;$sock&gt;) {
    print $_;
}

$sock-&gt;close();

The example sends an email to a computer on a local network, which hosts an
email server. 

$ ./send_mail.pl 
220 core9 ESMTP Sendmail 8.15.2/8.15.2; Thu, 1 Jul 2021 14:27:19 +0200 (CEST)
250 core9 Hello spartan.local [192.168.0.20], pleased to meet you
250 2.1.0 john.doe@example.com... Sender ok
250 2.1.5 root@core9... Recipient ok
354 Enter mail, end with "." on a line by itself
250 2.0.0 161CRJJv001451 Message accepted for delivery
221 2.0.0 core9 closing connection

We send the email. 

From john.doe@example.com Thu Jul  1 14:27:19 2021
Return-Path: &lt;john.doe@example.com&gt;
Received: from core9 (spartan.local [192.168.0.20])
	by core9 (8.15.2/8.15.2) with SMTP id 161CRJJv001451
	for root@core9; Thu, 1 Jul 2021 14:27:19 +0200 (CEST)
	(envelope-from john.doe@example.com)
Date: Thu, 1 Jul 2021 14:27:19 +0200 (CEST)
Message-Id: &lt;202107011227.161CRJJv001451@core9&gt;
From: John.Doe
Subject: Hello 
To: undisclosed-recipients:;
Status: RO

Hello there

We check the email on the receiving end. 

In this article we have worked with sockets in Perl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).