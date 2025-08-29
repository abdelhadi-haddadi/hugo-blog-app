+++
title = "Go socket"
date = 2025-08-29T19:56:08.382+01:00
draft = false
description = "Learn how to work with sockets in Go. Includes examples for TCP, UDP, and HTTP socket programming."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go socket

last modified April 11, 2024

In this article we show how to work with sockets in Golang. Socket programming
is low-level. The purpose of the tutorial is to introduce network programming
including these low-level details. There are higher-level APIs that may be 
more practical in real-world scenarios.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

## Network protocols

TCP/IP is a suite of protocols used by devices to communicate over the Internet
and most local networks. TCP is more reliable, has extensive error checking, and
requires more resources. It is used by services such as HTTP, SMTP, or FTP. UDP
is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

## Go net package

The Go net package provides a portable interface for network I/O,
including TCP/IP, UDP, domain name resolution, and Unix domain sockets. 

func Dial(network, address string) (Conn, error)

The Dial function connects to the address on the named network --
it opens a socket. We use the Write function to write to the socket
and Read function to read from the socket.

The known networks are:

    - tcp

    - tcp4

    - tcp6

    - udp

    - udp4

    - udp6

    - ip

    - ip4

    - ip6

    - unix

    - unixgram

    - unixpacket

For TCP and UDP networks, the address has the form host:port. The
host must be a literal IP address, or a host name that can be resolved to IP
addresses. When using TCP, and the host resolves to multiple IP addresses, the
Dial function tries each IP address in order until one succeeds.

## Go UDP socket example

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

echo_client.go
  

package main

import (
    "fmt"
    "log"
    "net"
    "os"
)

func main() {

    if len(os.Args) != 2 {

        fmt.Println("Usage: echo_client message")
        os.Exit(1)
    }

    msg := os.Args[1]

    con, err := net.Dial("udp", "debian:7")

    checkErr(err)

    defer con.Close()

    _, err = con.Write([]byte(msg))

    checkErr(err)

    reply := make([]byte, 1024)

    _, err = con.Read(reply)

    checkErr(err)

    fmt.Println("reply:", string(reply))
}

func checkErr(err error) {

    if err != nil {

        log.Fatal(err)
    }
}

The example sends a small message to the echo service on a local network
machine. The message is echoed back. 

con, err := net.Dial("udp", "debian:7")

With the Dial function, we create a socket to the Debian system on 
port 7 on the UDP network. 

_, err = con.Write([]byte(msg))

We write the message to the socket with Write.

reply := make([]byte, 1024)

_, err = con.Read(reply)

We create a byte slice with the make function. Then we create the 
response to that slice.

fmt.Println("reply:", string(reply))

Finally, we show the response on the terminal.

$ go run echo_client.go cau
reply: cau

## Go TCP socket example

TCP provides reliable, ordered, and error-checked delivery of a stream of octets
(bytes) between applications running on hosts communicating via an IP network.

$ cat /etc/services | grep qotd
qotd            17/tcp          quote

Port 17 is reserved for the quote of the day service.

A quote of the day service is a useful debugging and measurement tool is. The
quote of the day service simply sends a short message without regard to the
input.

qotd.go
  

package main

import (
    "fmt"
    "log"
    "net"
)

func main() {

    con, err := net.Dial("tcp", "djxmmx.net:17")

    checkErr(err)

    defer con.Close()

    msg := ""

    _, err = con.Write([]byte(msg))

    checkErr(err)

    reply := make([]byte, 1024)

    _, err = con.Read(reply)

    checkErr(err)

    fmt.Println(string(reply))
}

func checkErr(err error) {

    if err != nil {

        log.Fatal(err)
    }
}

The example creates a client program that connects to a QOTD service. 

con, err := net.Dial("tcp", "djxmmx.net:17")

A TCP socket is created with net.Dial. We provide a hostname and
the port number. Note that services like this are ephemeral; they may be removed
anytime.

msg := ""

_, err = con.Write([]byte(msg))

We send an empty message to the socket.

_, err = con.Read(reply)

We read the response with Read.

fmt.Println(string(reply))

We print the response.

$ go run qotd.go 
"The secret of being miserable is to have leisure to bother about whether
 you are happy or not.  The cure for it is occupation."
 George Bernard Shaw (1856-1950)

## Go socket HEAD request

A HEAD request is an HTTP GET request without a message body. The header of a
request/response contains metadata, such as HTTP protocol version or content
type. 

head_req.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net"
)

func main() {

    con, err := net.Dial("tcp", "webcode.me:80")
    checkError(err)

    req := "HEAD / HTTP/1.0\r\n\r\n"

    _, err = con.Write([]byte(req))
    checkError(err)

    res, err := ioutil.ReadAll(con)
    checkError(err)

    fmt.Println(string(res))
}

func checkError(err error) {

    if err != nil {
        log.Fatal(err)
    }
}

In the code example, we send a HEAD request to webcode.me. 

req := "HEAD / HTTP/1.0\r\n\r\n"

A head request is issued with the HEAD command followed by the
resource URL and HTTP protocol version. Note that the \r\n
characters are mandatory part of the communication process. The details are
described in [RFC 7231](https://tools.ietf.org/html/rfc7231)
document.

$ go run head_req.go 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 29 Jun 2021 13:09:11 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: close
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## Go HTTP GET request

The HTTP GET method requests a representation of the specified resource.
Requests using GET should only retrieve data. 

get_req.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net"
)

func main() {

    con, err := net.Dial("tcp", "webcode.me:80")
    checkError(err)

    req := "GET / HTTP/1.0\r\n" +
        "Host: webcode.me\r\n" +
        "User-Agent: Go client\r\n\r\n"

    _, err = con.Write([]byte(req))
    checkError(err)

    res, err := ioutil.ReadAll(con)
    checkError(err)

    fmt.Println(string(res))
}

func checkError(err error) {

    if err != nil {
        log.Fatal(err)
    }
}

The example reads the home page of the webcode.me using a GET request. 

req := "GET / HTTP/1.0\r\n" +
    "Host: webcode.me\r\n" +
    "User-Agent: Go client\r\n\r\n"

We write a simple GET request to the socket. 

$ go run get_req.go 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Tue, 29 Jun 2021 13:12:48 GMT
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

## Go socket send mail

To send an email via socket, we utilize the SMTP commands, such as HELO, MAIL
FROM, and DATA. 

send_mail.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net"
)

func main() {

    from := "john.doe@example.com"
    to := "root@core9"
    name := "John Doe"
    subject := "Hello"
    body := "Hello there"

    host := "core9:25"

    con, err := net.Dial("tcp", host)
    checkError(err)

    req := "HELO core9\r\n" +
        "MAIL FROM: " + from + "\r\n" +
        "RCPT TO: " + to + "\r\n" +
        "DATA\r\n" +
        "From: " + name + "\r\n" +
        "Subject: " + subject + "\r\n" +
        body + "\r\n.\r\n" + "QUIT\r\n"

    _, err = con.Write([]byte(req))
    checkError(err)

    res, err := ioutil.ReadAll(con)
    checkError(err)

    fmt.Println(string(res))
}

func checkError(err error) {

    if err != nil {
        log.Fatal(err)
    }
}

The example sends an email to a computer on a local network, which hosts an 
email server.

$ go run send_mail.go 
220 core9 ESMTP Sendmail 8.15.2/8.15.2; Wed, 30 Jun 2021 14:21:21 +0200 (CEST)
250 core9 Hello spartan.local [192.168.0.20], pleased to meet you
250 2.1.0 john.doe@example.com... Sender ok
250 2.1.5 root@core9... Recipient ok
354 Enter mail, end with "." on a line by itself
250 2.0.0 15UCLLd3001374 Message accepted for delivery
221 2.0.0 core9 closing connection

We send the email. 

From john.doe@example.com Wed Jun 30 14:21:21 2021
Return-Path: &lt;john.doe@example.com&gt;
Received: from core9 (spartan.local [192.168.0.20])
	by core9 (8.15.2/8.15.2) with SMTP id 15UCLLd3001374
	for root@core9; Wed, 30 Jun 2021 14:21:21 +0200 (CEST)
	(envelope-from john.doe@example.com)
Date: Wed, 30 Jun 2021 14:21:21 +0200 (CEST)
Message-Id: &lt;202106301221.15UCLLd3001374@core9&gt;
From: John.Doe
Subject: Hello
To: undisclosed-recipients:;
Status: RO

Hello there

We check the email on the receiving end. 

## Source

[Go net package - reference](https://pkg.go.dev/net)

In this article we have worked with sockets in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).