+++
title = "Python Socket"
date = 2025-08-29T20:10:24.259+01:00
draft = false
description = "Python Socket tutorial shows how to do Python network programming with sockets."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Socket

last modified January 29, 2024

Python Socket tutorial shows how to do Python network programming with sockets.
Socket programming is low-level. The goal of this tutorial is to introduce
network programming including these low-level details. There are higher-level
Python APIs such as Twisted that might be better suited.

In programming, a socket is an endpoint of a communication between
two programs running on a network. Sockets are used to create a connection
between a client program and a server program.

Python's socket module provides an interface to the Berkeley sockets API.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

## Network protocols

TCP/IP is a suite of protocols used by devices to communicate over the Internet
and most local networks. TCP is more reliable, has extensive error checking, and
requires more resources. It is used by services such as HTTP, SMTP, or FTP. UDP
is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

The socket.SOCK_STREAM is used to create a socket for TCP and
socket.SOCK_DGRAM for UDP.

## Address families

When we create a socket, we have to specify its address family. Then
we can only use addresses of that type with the socket.

    - AF_UNIX, AF_LOCAL - Local communication

    - AF_INET - IPv4 Internet protocols

    - AF_INET6 - IPv6 Internet protocols

    - AF_IPX - IPX - Novell protocols

    - AF_BLUETOOTH - Wireless bluetooth protocols

    - AF_PACKET - Low level packet interface

For the AF_INET address family, a pair (host, port) is specified.
The host is a string representing either a hostname in
Internet domain notation like example.com or an IPv4 address like
93.184.216.34, and port is an integer.

DatagramPacket class.
Each packet sent or received on a datagram socket is individually
addressed and routed. Multiple packets sent from one machine to another may
be routed differently, and may arrive in any order.

 -->

## Python get IP address

With gethostbyname, we get the IP address of the host.

get_ip.py
  

#!/usr/bin/python

import socket

ip = socket.gethostbyname('example.com')
print(ip)

The example prints the IP address of example.com.

$ ./get_ip.py
93.184.216.34

## Python UDP socket example

UDP is a communication protocol that transmits independent packets over the
network with no guarantee of arrival and no guarantee of the order of delivery.
One service that used UDP is the Quote of the Day (QOTD).

qotd_client.py
  

#!/usr/bin/python

import socket

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:

    message = b''
    addr = ("djxmmx.net", 17)

    s.sendto(message, addr)

    data, address = s.recvfrom(1024)
    print(data.decode())

The example creates a client program that connects to a QOTD service.

import socket

We import the socket module.

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:

A datagram socket for IPv4 is created.

message = b''

We send an empty message; the QOTD service works by sending arbitrary
data to the socket; it simply responds with a quote. To communicate over
TCP/UDP, we use binary strings.

addr = ("djxmmx.net", 17)

We provide the address and the port.

s.sendto(message, addr)

We send data with the sendto method.

data, address = s.recvfrom(1024)

UDP sockets use recvfrom to receive data. Its paremeter is the
buffer size. The return value is a pair (data, address) where data is a byte
string representing the data received and address is the address of the socket
sending the data.

print(data.decode())

We print the decoded data to the terminal.

$ ./qotd_client.py
"Oh the nerves, the nerves; the mysteries of this machine called man!
    Oh the little that unhinges it, poor creatures that we are!"
    Charles Dickens (1812-70)

## Python TCP socket example

The are servers that provide current time. A client simply connects to the
server with no commands, and the server responds with a current time.

**Note:** Time servers come and go, so we might
need to find a working server on https://www.ntppool.org/en/.

time_client.py
  

#!/usr/bin/python

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    host = "time.nist.gov"
    port = 13

    s.connect((host, port))
    s.sendall(b'')
    print(str(s.recv(4096), 'utf-8'))

The example determines the current time by connecting to a time
server's TCP socket.

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

A TCP socket for IPv4 is created.

host = "time.nist.gov"
port = 13

This is the host name and the port number of a working time server.

s.connect((host, port))

We connect to the remote socket with connect.

s.sendall(b'')

The sendall method sends data to the socket. The socket must be
connected to a remote socket. It continues to send data from bytes until either
all data has been sent or an error occurs.

print(str(s.recv(4096), 'utf-8'))

We print the received data. The recv method receives up to
buffersize bytes from the socket. When no data is available, it blocks until at
least one byte is available or until the remote end is closed. When the remote
end is closed and all data is read, it returns an empty byte string.

## Python Socket HEAD request

A HEAD request is a GET request without a message body. The header of
a request/response contains metadata, such as HTTP protocol version or
content type.

head_request.py
  

#!/usr/bin/python

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    s.connect(("webcode.me" , 80))
    s.sendall(b"HEAD / HTTP/1.1\r\nHost: webcode.me\r\nAccept: text/html\r\n\r\n")
    print(str(s.recv(1024), 'utf-8'))

In the example, we send a HEAD request to webcode.me.

s.sendall(b"HEAD / HTTP/1.1\r\nHost: webcode.me\r\nAccept: text/html\r\n\r\n")

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n are
mandatory part of the communication process. The details are described
in [RFC 7231](https://tools.ietf.org/html/rfc7231) document.

$ head_request.py
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Sun, 08 Sep 2019 11:23:25 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: keep-alive
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## Python Socket GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data.

get_request.py
  

#!/usr/bin/python

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    s.connect(("webcode.me" , 80))
    s.sendall(b"GET / HTTP/1.1\r\nHost: webcode.me\r\nAccept: text/html\r\nConnection: close\r\n\r\n")

    while True:

        data = s.recv(1024)

        if not data:
            break

        print(data.decode())

The example reads the home page of the webcode.me using a
GET request.

s.sendall(b"GET / HTTP/1.1\r\nHost: webcode.me\r\nAccept: text/html\r\nConnection: close\r\n\r\n")

For the HTTP 1.1 protocol, the connections may be persistent by default. This is why we
send the Connection: close header.

while True:

    data = s.recv(1024)

    if not data:
        break

    print(data.decode())

We use a while loop to process the received data. If no error occurs,
recv returns the bytes received. If the connection has been
gracefully closed, the return value is an empty byte string. The
recv is a blocking method that blocks until it is done, or a
timeout is reached or another exception occurs.

$ ./get_request.py
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Sun, 08 Sep 2019 11:39:34 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: keep-alive
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

## Echo client server example

An echo server sends the message from the client back. It is a
classic example used for testing and learning.

echo_server.py
  

#!/usr/bin/python

import socket
import time

with socket.socket() as s:

    host = 'localhost'
    port = 8001

    s.bind((host, port))
    print(f'socket binded to {port}')

    s.listen()

    con, addr = s.accept()

    with con:

        while True:

            data = con.recv(1024)

            if not data:
                break

            con.sendall(data)

The echo server sends the client message back to the client.

host = 'localhost'
port = 8001

The server runs on localhost on port 8001.

s.bind((host, port))

The bind method establishes the communication endpoint.
It binds the socket to the specified address. The socket must not already be bound.
(The format of address depends on the address family.)

s.listen()

The listen method enables a server to accept connections. The
server can now listen for connections on a socket. The listen
has a backlog parameter. It specifies the number of unaccepted
connections that the system will allow before refusing new connections.
The parameter is optional since Python 3.5. If not specified, a default backlog
value is chosen.

con, addr = s.accept()

With accept, the server accepts a connection. It blocks and waits
for an incoming connection. The socket must be bound to an address and listening
for connections. The return value is a pair (con, addr) where con is a new
socket object usable to send and receive data on the connection, and addr is
the address bound to the socket on the other end of the connection.

Note that the accept creates a new socket for communication with
a client, which is a different socket from the listening socket.

echo_client.py
  

#!/usr/bin/python

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    host = "localhost"
    port = 8001

    s.connect((host, port))
    s.sendall(b'hello there')
    print(str(s.recv(4096), 'utf-8'))

The client sends a message to the echo server.

## Asynchronous server example

In order to improve the performance of a server, we can use the
asyncio module.

async_server.py
  

#!/usr/bin/python

# from threading import current_thread

import asyncio

async def handle_client(reader, writer):

    data = (await reader.read(1024))

    writer.write(data)
    writer.close()

loop = asyncio.get_event_loop()
loop.create_task(asyncio.start_server(handle_client, 'localhost', 8001))
loop.run_forever()

We can now test the performance of the blocking and non-blocking servers.

$ ab -c 50 -n 1000 http://localhost:8001/

For instance, we can test the performance with the Apache benchmarking tool.
In our case, the command sends 1000 requests, 50 at a time.

## Source

[Python socket — Low-level networking interface](https://docs.python.org/3/library/socket.html)

In this article we have showed how to create simple networking programs with
sockets in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).