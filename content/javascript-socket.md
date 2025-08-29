+++
title = "JavaScript socket"
date = 2025-08-29T20:01:39.286+01:00
draft = false
description = "Learn how to implement real-time communication in JavaScript using sockets, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript socket

last modified last modified October 18, 2023

 

In this article we show how to work with sockets in JavaScript.

In programming, a socket is an endpoint of a communication between
two programs running on a network. Sockets are used to create a connection
between a client program and a server program.

Sockets API is available in the Node.js net module.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

## JS socket HEAD request

A HEAD request is an HTTP GET request without a message body. The header of a
request/response contains metadata, such as HTTP protocol version or content
type. 

head_req.js
  

var net = require('net');

var host = 'webcode.me';
var port = 80;

var socket = new net.Socket();

socket.connect(port, host, () =&gt; {

    socket.write("HEAD / HTTP/1.0\r\n");
    socket.write("Host: webcode.me\r\n");
    socket.write("User-Agent: Node.js HTTP client\r\n");
    socket.write("Accept: text/html\r\n");
    socket.write("Accept-Language: en-US\r\n");
    socket.write("Connection: close\r\n\r\n");
});

socket.on('data', (data) =&gt; {

    console.log(`${data}`);
    socket.destroy();
});

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n are
mandatory part of the communication process. The details are described
in [RFC 7231](https://tools.ietf.org/html/rfc7231) document.

client.on('data', (data) =&gt; {

    console.log(`${data}`);
    client.destroy();
});

$ nodejs head_req.js 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Wed, 10 Feb 2021 08:40:08 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: close
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## JS socket GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data. 

get_req.js
  

var net = require('net');

var host = 'webcode.me';
var port = 80;

var socket = new net.Socket();
socket.connect(port, host, () =&gt; {
    socket.write('GET / HTTP/1.0\r\n\r\n');
});

socket.on('data', (data) =&gt; {
    console.log(`${data}`);
    socket.destroy();
});

The example reads the home page of the webcode.me using a GET request. It 
returns its header and also its body.

socket.write('GET / HTTP/1.0\r\n\r\n');

We write the GET request to the socket.

$ nodejs get_req.js 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Wed, 10 Feb 2021 08:45:01 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: close
ETag: "5d32ffc5-15c"
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

## JS socket QOTD

A quote of the day service is a useful debugging and measurement tool. The
quote of the day service simply sends a short message without regard to the
input. Port 17 is reserved for the quote of the day service.

qotd.js
  

var net = require('net');

var host = 'djxmmx.net';
var port = 17;

var socket = new net.Socket();

socket.connect(port, host, function() {
    socket.write('');
});

socket.on('data', (data) =&gt; {

    console.log(`${data}`);
    socket.destroy();
});

The example creates a client program that connects to a QOTD service. 

socket.write('');

We send an empty message to the socket. 

socket.on('data', (data) =&gt; {

    console.log(`${data}`);
    socket.destroy();
});

We receive the output and close the socket. 

$ nodejs qotd.js 
"The secret of being miserable is to have leisure to bother about whether
 you are happy or not.  The cure for it is occupation."
 George Bernard Shaw (1856-1950)

## JS socket send mail

To send an email via socket, we utilize the SMTP commands, such as HELO, 
MAIL FROM, and DATA.

send_mail.js
  

let net = require('net');

let host = '192.168.0.23';
let port = 25;

let from = "john.doe@example.com";
let to = "root@core9";
let name = "John Doe";
let subject = "Hello";
let body = "Hello there";

let socket = new net.Socket();

socket.connect(port, host, () =&gt; {

    socket.write("HELO core9\n");
    socket.write(`MAIL FROM: &lt;${from}&gt;\n`);
    socket.write(`RCPT TO: &lt;${to}&gt;\n`);
    socket.write("DATA\n");
    socket.write(`From:${name}\n`);
    socket.write(`Subject:${subject}\n`);
    socket.write(`${body}`);
    socket.write("\r\n.\r\n");
    socket.write("QUIT\n");
});

socket.on('data', data =&gt; {
  console.log(`${data}`);
});

socket.on('close', () =&gt; {
  socket.destroy();
});

The example sends an email to a computer on a local network. 

$ nodejs send_email.js 
220 core9 ESMTP Sendmail 8.15.2/8.15.2; Thu, 11 Feb 2021 10:07:14 +0100 (CET)
250 core9 Hello spartan.local [192.168.0.20], pleased to meet you

250 2.1.0 &lt;john.doe@example.com&gt;... Sender ok
250 2.1.5 &lt;root@core9&gt;... Recipient ok
354 Enter mail, end with "." on a line by itself
250 2.0.0 11B97EKF001178 Message accepted for delivery
221 2.0.0 core9 closing connection

We send the email.

From john.doe@example.com Thu Feb 11 10:07:14 2021
Return-Path: &lt;john.doe@example.com&gt;
Received: from core9 (spartan.local [192.168.0.20])
        by core9 (8.15.2/8.15.2) with SMTP id 11B97EKF001178
        for &lt;root@core9&gt;; Thu, 11 Feb 2021 10:07:14 +0100 (CET)
        (envelope-from john.doe@example.com)
Date: Thu, 11 Feb 2021 10:07:14 +0100 (CET)
Message-Id: &lt;202102110907.11B97EKF001178@core9&gt;
From:John.Doe
Subject:Hello
To: undisclosed-recipients:;
Status: RO

Hello there

We check the email on the receiving end.

## JS socket echo server

An echo server is a simple server useful for testing. It simply sends the 
message back to the client.

echo_server.js
  

var net = require('net');

var host = '0.0.0.0';
var port = 5050;

net.createServer(sock =&gt; {

    console.log(`connected: ${sock.remoteAddress}:${sock.remotePort}`);

    sock.on('data', (data) =&gt; {
        console.log(`${sock.remoteAddress}: ${data}`);
        sock.write(`${data}`);
    });

    sock.on('close', (data) =&gt; {
        console.log(`connection closed: ${sock.remoteAddress}:${sock.remotePort}`);
    });

}).listen(port, host);

console.log(`Server listening on ${host}:${port}`);

A new server is created with the createServer function.
The listen function start a server listening for connections.

$ nodejs echo_server.js 
Server listening on 0.0.0.0:5050

We start the server.

$ echo hello | nc localhost 5050
hello

With the nc tool, we send a message to the echo server.

## Source

[Node.js net reference](https://nodejs.org/api/net.html)

In this article we have worked with sockets in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)