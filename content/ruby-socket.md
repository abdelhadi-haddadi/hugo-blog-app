+++
title = "Ruby Socket"
date = 2025-08-29T20:11:30.758+01:00
draft = false
description = "Ruby Socket tutorial shows how to do Ruby network programming with sockets. In programming, a socket is an endpoint of a communication between two programs running on a network."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Socket

last modified October 18, 2023

In this article we show how to do Ruby network programming with sockets. Socket
programming is low-level. The goal of this tutorial is to introduce network
programming including these low-level details.

In programming, a socket is an endpoint of a communication between
two programs running on a network. Sockets are used to create a connection
between a client program and a server program.

Ruby's socket module provides an interface to the Berkeley sockets
API.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

## Network protocols

TCP/IP is a suite of protocols used by devices to communicate over the Internet
and most local networks. TCP is more reliable, has extensive error checking, and
requires more resources. It is used by services such as HTTP, SMTP, or FTP. UDP
is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

The Socket::SOCK_STREAM is used to create a socket for TCP and
Socket::SOCK_DGRAM for UDP.

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

## Ruby Socket.getnameinfo

With Socket.getnameinfo obtains information about a socket address.

get_addr.py
  

#!/usr/bin/ruby

require 'socket'

p Socket.getnameinfo Socket.sockaddr_in 80, "example.com"
p Socket.getnameinfo ["AF_INET", 80, "webcode.me"]

The example prints the IP address of example.com and webcode.me.

require 'socket'

The Ruby socket API is in the socket module.

p Socket.getnameinfo Socket.sockaddr_in 80, "example.com"
p Socket.getnameinfo ["AF_INET", 80, "webcode.me"]

A socket address is created either with Socket.sockaddr_in or
with an array of values containing protocol name, port, and host name.

$ ./get_addr.rb
["2606:2800:220:1:248:1893:25c8:1946", "http"]
["46.101.248.126", "http"]

## Socket.getifaddrs &amp; Socket.ip_address_list

The Socket.getifaddrs returns an array of interface addresses and
the Socket.ip_address_list returns local IP addresses as an array.

get_locals.py
  

#!/usr/bin/ruby

require 'socket'

pp Socket.getifaddrs

p '----------------------------'

pp Socket.ip_address_list

The example all local interfaces and IP addresses.

## Ruby UDP socket example

UDP is a communication protocol that transmits independent packets over the
network with no guarantee of arrival and no guarantee of the order of delivery.
One service that used UDP is echo.

The Echo Protocol is a service in the Internet Protocol Suite defined in RFC
862. The Echo Protocol can use the TCP or the UDP on the port number 7. The
server sends back an identical copy of the data it received.

$ cat /etc/services | grep echo | head -4
echo            7/tcp
echo            7/udp
echo            4/ddp                   # AppleTalk Echo Protocol

Port 7 is reserved for echo service.

Due to security concerns, the echo service is disabled in most cases. Therefore,
we create our own service in a local network.

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

We check the IP address of this machine with ip addr; in our case
the IP address is 192.168.0.32.

echo_client.rb
  

#!/usr/bin/ruby

require 'socket'

host = '192.168.0.32'
port = 7

msg =  ARGV[0] || "hello"

s = UDPSocket.new
s.connect host, port

s.sendmsg msg + "\n"
puts s.recv 20

s.close

The example sends a small message to the echo service on a local network
machine. The message is echoed back.

s = UDPSocket.new

A new UDP socket is created with UDPSocket.new

s.connect host, port

We connect to the host on the specified port.

s.sendmsg msg + "\n"

We send the message to the echo service with the sendmsg method.

puts s.recv 20

The recv method receives a message; its argument is maxlen, which
is the maximum number of bytes to receive.

s.close

We close the socket with close.

$ ./echo_client.rb
hello
$ ./echo_client.rb cau
cau

Our messages are echoed back to us.

# tcpdump -i eth1 -Xn -Q  in udp port 7
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on eth1, link-type EN10MB (Ethernet), capture size 262144 bytes
13:16:27.330620 IP 192.168.0.20.50919 &gt; 192.168.0.32.7: UDP, length 6
    0x0000:  4500 0022 95cb 4000 4011 237b c0a8 0014  E.."..@.@.#{....
    0x0010:  c0a8 0020 c6e7 0007 000e 7382 6865 6c6c  ..........s.hell
    0x0020:  6f0a                                     o.
13:16:28.942496 IP 192.168.0.20.57886 &gt; 192.168.0.32.7: UDP, length 4
    0x0000:  4500 0020 970f 4000 4011 2239 c0a8 0014  E.....@.@."9....
    0x0010:  c0a8 0020 e21e 0007 000c c3bf 6361 750a  ............cau.

On the machine where the echo service is started, we can use the
tcpdum tool to interactivelly watch the traffic.

## Ruby TCP socket example

TCP provides reliable, ordered, and error-checked delivery of a stream of octets
(bytes) between applications running on hosts communicating via an IP network.

$ cat /etc/services | grep qotd
qotd            17/tcp          quote

Port 17 is reserved for the quote of the day service.

A quote of the day service is a useful debugging and measurement tool is. The
quote of the day service simply sends a short message without regard to the
input.

qotd_client.py
  

#!/usr/bin/ruby

require 'socket'

s = TCPSocket.new 'djxmmx.net', 17
s.send '', 0

puts s.recv 350
s.close

The example creates a client program that connects to a QOTD service.

s = TCPSocket.new 'djxmmx.net', 17

A TCP/IP socket is created with TCPSocket.new. We provide a
hostname and the port number.

s.send '', 0

We send an empty message to the socket.

puts s.recv 350
s.close

We receive the output and close the socket.

$ ./qotd.rb 
"When a stupid man is doing something he is ashamed of, he always declares
 that it is his duty." George Bernard Shaw (1856-1950)

## Ruby Socket HTTP HEAD request

A HEAD request is an HTTP GET request without a message body. The header of a
request/response contains metadata, such as HTTP protocol version or content
type.

http_head.rb
  

#!/usr/bin/ruby

require 'socket'

s = TCPSocket.new 'webcode.me', 80

s.write "HEAD / HTTP/1.0\r\n"
s.write "Host: webcode.me\r\n"
s.write "User-Agent: Console Http Client\r\n"
s.write "Accept: text/html\r\n"
s.write "Accept-Language: en-US\r\n"
s.write "Connection: close\r\n\r\n"

res = s.read
puts res

s.close

In the example, we send a HEAD request to webcode.me.

s.write "HEAD / HTTP/1.0\r\n"
s.write "Host: webcode.me\r\n"
s.write "User-Agent: Console Http Client\r\n"
s.write "Accept: text/html\r\n"
s.write "Accept-Language: en-US\r\n"
s.write "Connection: close\r\n\r\n"

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n are
mandatory part of the communication process. The details are described
in [RFC 7231](https://tools.ietf.org/html/rfc7231) document.

$ ./http_head.rb 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 02 Feb 2021 13:43:42 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: close
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## Ruby Socket GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data.

http_get.rb
  

#!/usr/bin/ruby

require 'socket'

s = TCPSocket.new 'webcode.me', 80
s.write "GET / HTTP/1.0\r\n\r\n"

res = s.read
puts res

s.close

The example reads the home page of the webcode.me using a
GET request.

s.write "GET / HTTP/1.0\r\n\r\n"

We write a simple GET request to the socket.

$ ./http_get.rb 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 02 Feb 2021 13:46:24 GMT
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

## Ruby client/server example

In the following section, we create an UDP echo client and server.

echo_server.rb
  

#!/usr/bin/ruby

require 'socket'

puts 'starting echo server'

Socket.udp_server_loop 4444 do |data, src|
    src.reply data
end

The echo server is created with Socket.udp_server_loop. It creates
a UDP/IP server on port and calls the block for each message arrived. The server
sends the message back to the client.

udp_client.rb
  

#!/usr/bin/ruby

require 'socket'

s = UDPSocket.new

s.connect 'localhost', 4444
s.send "hello", 0

puts s.recv 50
s.close

The client sends a message to the echo server.

## Ruby socket simple web server

The following example creates a simple web server.

web_server.rb
  

#!/usr/bin/ruby

require 'socket'

port = (ARGV[0] || 8080).to_i

server = TCPServer.new port

p server
puts "server started on port #{port}"

loop do 

  client = server.accept
  puts "Request: #{client.gets}"
  client.print "HTTP/1.1 200/OK\r\nContent-type: text/html\r\n\r\n"
  client.print "&lt;html&gt;&lt;body&gt;&lt;h1&gt;#{Time.now}&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;\r\n"
  client.close
end

The server sends current time in the HTML output. The accept method
accepts an incoming connection. It returns a new TCPSocket object.

$ ./web_server.rb 
#&lt;TCPServer:fd 8, AF_INET, 0.0.0.0, 8080&gt;
server started on port 8080

We start the server.

$ nc localhost 8080
GET /
HTTP/1.1 200/OK
Content-type: text/html

&lt;html&gt;&lt;body&gt;&lt;h1&gt;2021-02-03 10:02:19 +0100&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;

We test the server with the nc tool.

In this article we have showed how to create simple networking programs with
sockets in Ruby.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.