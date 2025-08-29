+++
title = "Java Socket"
date = 2025-08-29T20:00:31.279+01:00
draft = false
description = "Java Socket tutorial shows how to do network programming in Java with sockets."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Socket

last modified January 27, 2024

 

Java Socket tutorial shows how to do network programming in Java with sockets.
Socket programming is low-level. The purpose of the tutorial is to introduce
network programming including these low-level details. There are higher-level
APIs that might be better suited for a real task. For instance, Java 11
introduced HttpClient and Spring has Webclient.

## Java Socket

In programming, a socket is an endpoint of a communication between
two programs running on a network. Socket classes are used to create a
connection between a client program and a server program. The
Socket represents the client socket, and the
ServerSocket the server socket.

**Note:** In networking, the term socket has a different meaning.
It is used for the combination of an IP address and a port number.

A ServerSocket is bound to a port number, which is a unique Id
through clients and servers aggree to communicate.

Socket and ServerSocket are used for
the TCP protocol. The DatagramSocket and DatagramPacket
are used for the UDP protocol.

TCP is more reliable, has extensive error checking, and requires more resources.
It is used by services such as HTTP, SMTP, or FTP.
UDP is much less reliable, has limited error checking, and requires less resources.
It is used by services such as VoIP.

DatagramSocket is a socket for sending and receiving datagram packets.
A datagram packet is represented by DatagramPacket class.
Each packet sent or received on a datagram socket is individually
addressed and routed. Multiple packets sent from one machine to another may
be routed differently, and may arrive in any order.

## Java Socket Time Client

The are servers that provide current time. A client simply connects to the
server with no commands, and the server responds with a current time.

**Note:** Time servers come and go, so we might
need to find a working server on https://www.ntppool.org/en/.

In our example, we have chosen a server in Sweden.

com/zetcode/SocketTimeClient.java
  

package com.zetcode;

import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

// time servers come and go; we might need to
// find a functioning server on https://www.ntppool.org/en/

public class SocketTimeClient {

    public static void main(String[] args) throws IOException {

        var hostname = "3.se.pool.ntp.org";
        int port = 13;

        try (var socket = new Socket(hostname, port)) {

            try (var reader = new InputStreamReader(socket.getInputStream())) {

                int character;
                var output = new StringBuilder();

                while ((character = reader.read()) != -1) {

                    output.append((char) character);
                }

                System.out.println(output);
            }
        }
    }
}

The example connects to a time server and receives the current time.

var hostname = "3.se.pool.ntp.org";
int port = 13;

This is a time server from Sweden; the 13 port is a standard port for daytime
services.

try (var socket = new Socket(hostname, port)) {

A stream client socket is created. It is connected to the specified port
number on the named host. The socket is automatically closed with Java's
try-with-resources statement.

try (var reader = new InputStreamReader(socket.getInputStream())) {

The getInputStream returns an input stream for this socket.
We read the server's response from this input stream.
The communication between sockets is in bytes; therefore, we use the
InputStreamReader as a bridge between bytes and characters.

int character;
var output = new StringBuilder();

while ((character = reader.read()) != -1) {

    output.append((char) character);
}

System.out.println(output);

Since the response message is small, we can read it character by character
with little performance penalty.

## Java Socket Whois Client

Whois is a TCP-based transaction-oriented query/response protocol that is widely
used to provide information services to Internet users. It is used to
query information such as domain name or IP address block owners.

**Note:** Most whois servers provide only limited information (for
instance only for selected domain names) and the information about owners is
often anonymized by domain registrars.

Whois protocol uses port 43.

com/zetcode/WhoisClientEx.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

// probing whois.iana.org might give the right
// whois server

public class WhoisClientEx {

    public static void main(String[] args) throws IOException {

        var domainName = "example.com";
        var whoisServer = "whois.nic.me";
        int port = 43;

        try (var socket = new Socket(whoisServer, port)) {

            try (var writer = new PrintWriter(socket.getOutputStream(), true)) {

                writer.println(domainName);

                try (var reader = new BufferedReader(
                        new InputStreamReader(socket.getInputStream()))) {

                    String line;

                    while ((line = reader.readLine()) != null) {

                        System.out.println(line);
                    }
                }
            }
        }
    }
}

In the example, we probe for information about the owners of a
domain name.

try (var writer = new PrintWriter(socket.getOutputStream(), true)) {

    writer.println(domainName);
...

We get an output stream for the socket and wrap it into a PrintWriter.
PrintWriter will convert our character into bytes. With println,
we write the domain name to the stream. Communication through sockets is buffered.
The second parameter of the PrintWriter is autoFlush; if set to
true, the buffer will be flushed after each println.

try (var reader = new BufferedReader(
        new InputStreamReader(socket.getInputStream()))) {

    String line;

    while ((line = reader.readLine()) != null) {

        System.out.println(line);
    }
}

The response from the server is read and written to the console.

## Java Socket GET Request

In the following example, we create a GET request. The HTTP GET request
is used to retrieve a specific resource.

com/zetcode/JavaSocketGetRequest.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SocketGetRequest {

    public static void main(String[] args) throws IOException {

        try (var socket = new Socket("webcode.me", 80)) {

            try (var wtr = new PrintWriter(socket.getOutputStream())) {

                // create GET request
                wtr.print("GET / HTTP/1.1\r\n");
                wtr.print("Host: www.webcode.me\r\n");
                wtr.print("\r\n");
                wtr.flush();
                socket.shutdownOutput();

                String outStr;

                try (var bufRead = new BufferedReader(new InputStreamReader(
                        socket.getInputStream()))) {

                    while ((outStr = bufRead.readLine()) != null) {

                        System.out.println(outStr);
                    }

                    socket.shutdownInput();
                }
            }
        }
    }
}

The example retrieves an HTML page from a website.

try (var socket = new Socket("webcode.me", 80)) {

We open a socket on the specified webpage on port 80.
Port 80 is used by HTTP protocol.

try (var wtr = new PrintWriter(socket.getOutputStream())) {

We are going to issue text commands on the protocol; therefore,
we create a PrintWriter for the socket output stream.
Since we do not set the autoFlush option to true,
we need to manually flush the buffer.

// create GET request
wtr.print("GET / HTTP/1.1\r\n");
wtr.print("Host: www.webcode.me\r\n");
wtr.print("\r\n");
wtr.flush();

We create an HTTP GET request, which retrieves the home page of
the specified webpage. Notice that the text commands are finished with
\r\n (CRLF) characters. These are necessary communication
details which are described in RFC 2616 document.

socket.shutdownOutput();

The shutdownOutput disables the output stream for this socket.
This is necessary to close the connection in the end.

try (var bufRead = new BufferedReader(new InputStreamReader(
    socket.getInputStream()))) {

For the server response, we open a socket input stream and use
InputStreamReader to translate bytes to characters.
We also buffer the reading operation.

while ((outStr = bufRead.readLine()) != null) {

    System.out.println(outStr);
}

We read the data line by line.

socket.shutdownInput();

Finally, we shut down the input stream as well.

## Java Socket HEAD Request

In the next example, we create a HEAD request with a Java socket.
The HEAD method is identical to the GET method except that the server
does not return a message body in the response; it returns only the header.

com/zetcode/SocketHeadRequest.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SocketHeadRequest {

    public static void main(String[] args) throws IOException {

        var hostname = "webcode.me";
        int port = 80;

        try (var socket = new Socket(hostname, port)) {

            try (var writer = new PrintWriter(socket.getOutputStream(), true)) {

                writer.println("HEAD / HTTP/1.1");
                writer.println("Host: " + hostname);
                writer.println("User-Agent: Console Http Client");
                writer.println("Accept: text/html");
                writer.println("Accept-Language: en-US");
                writer.println("Connection: close");
                writer.println();

                try (var reader = new BufferedReader(new InputStreamReader(
                        socket.getInputStream()))) {

                    String line;

                    while ((line = reader.readLine()) != null) {

                        System.out.println(line);
                    }
                }
            }
        }
    }
}

The example retrieves the header of the specified web page.

writer.println("HEAD / HTTP/1.1");

We issue a HEAD command.

writer.println("Connection: close");

In HTTP protocol version 1.1, all connections are considered persistent (keep-alive)
unless declared otherwise. By setting the option to false, we inform
that we want to finish the connection after the request/response cycle.

## Java ServerSocket DateServer

The following example creates a very simple server with ServerSocket.
ServerSocket creates a server socket, bound to the specified port.

com/zetcode/DateServer.java
  

package com.zetcode;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.time.LocalDate;

public class DateServer {

    public static void main(String[] args) throws IOException {

        int port = 8081;

        try (var listener = new ServerSocket(port)) {

            System.out.printf("The started on port %d%n", port);

            while (true) {

                try (var socket = listener.accept()) {

                    try (var pw = new PrintWriter(socket.getOutputStream(), true)) {

                        pw.println(LocalDate.now());
                    }
                }
            }
        }
    }
}

The example creates a server that returns the current date. The program must
be manually killed in the end.

int port = 8081;

try (var listener = new ServerSocket(port)) {

A server socket on port 8081 is created.

try (var socket = listener.accept()) {

The accept method listens for a connection to be made to this
socket and accepts it. The method blocks until a connection is made.

try (var pw = new PrintWriter(socket.getOutputStream(), true)) {

    pw.println(LocalDate.now());
}

We write the current date to the socket output stream.

get_request.py
  

#!/usr/bin/env python3

import socket

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:

    s.connect(("localhost" , 8081))
    s.sendall(b"GET / HTTP/1.1\r\nHost: localhost\r\nAccept: text/html\r\n\r\n")
    print(str(s.recv(4096),  'utf-8'))

We have a Python script that issues a GET request to the server.

$ get_request.py
2019-07-15

## Java Socket Client/Server Example

In the following example, we have a server and a client.
The server reverses the text sent from a client. The example is
simple and blocking. To improve it, we need to include threads.

com/zetcode/ReverseServer.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;

// This server communicates only with one client at a time.
// It must disconnect from a client first to communicate
// with another client. It receives a bye command from a client
// to close a connection.

public class ReverseServer {

    public static void main(String[] args) throws IOException {

        int port = 8081;

        try (var serverSocket = new ServerSocket(port)) {

            System.out.println("Server is listening on port " + port);

            while (true) {

                try (var socket = serverSocket.accept()) {

                    System.out.println("client connected");

                    try (var reader = new BufferedReader(new InputStreamReader(
                                socket.getInputStream()));
                         var writer = new PrintWriter(socket.getOutputStream(), true)) {

                        String text;

                        do {

                            text = reader.readLine();

                            if (text != null) {

                                var reversed = new StringBuilder(text).reverse().toString();
                                writer.println("Server: " + reversed);

                                System.out.println(text);
                            }
                        } while (!"bye".equals(text));

                        System.out.println("client disconnected");
                    }
                }
            }
        }
    }
}

The ReverseServer sends a reversed string back to the client.
It communicates only with one client at a time. It must disconnect from a client
first to communicate with another client. It receives a bye command from a
client to close the connection.

try (var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
    var writer = new PrintWriter(socket.getOutputStream(), true)) {

We have a socket input stream for reading client data and socket output stream
for sending the response back to the client; the output streams and the connection
are closed.

do {

    text = reader.readLine();

    if (text != null) {

        var reversed = new StringBuilder(text).reverse().toString();
        writer.println("Server: " + reversed);

        System.out.println(text);
    }
} while (!"bye".equals(text));

A do-while loop is created for a single client. We read
the data from the client and send the modified content back.
The loop is finished upon receiving a bye command from the client.
Before this is done, no other client can connect to the server.

com/zetcode/ReverseClient.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

// the client must send a bye command to
// inform the server to close the connection

public class ReverseClient {

    public static void main(String[] args) throws IOException {

        var hostname = "localhost";
        int port = 8081;

        try (var socket = new Socket(hostname, port)) {

            try (var writer = new PrintWriter(socket.getOutputStream(), true)) {

                try (var scanner = new Scanner(System.in)) {

                    try (var reader = new BufferedReader(new InputStreamReader(
                            socket.getInputStream()))) {

                        String command;

                        do {

                            System.out.print("Enter command: ");

                            command = scanner.nextLine();

                            writer.println(command);

                            var data = reader.readLine();
                            System.out.println(data);

                        } while (!command.equals("bye"));
                    }
                }
            }
        }
    }
}

The client sends text data to the server.

do {

    System.out.print("Enter command: ");

    command = scanner.nextLine();

    writer.println(command);

    var data = reader.readLine();
    System.out.println(data);

} while (!command.equals("bye"));

We read input from the console and send it to the server.
The while loop is finished when we send the bye command, which
informs the server that the connection can be closed.

## Java DatagramSocket example

UDP is a communication protocol that transmits independent packets over the
network with no guarantee of arrival and no guarantee of the order of
delivery. One service that used UDP is the Quote of the Day (QOTD).

The following example creates a client program that connects
to a QOTD service.

com/zetcode/DatagramSocketEx.java
  

package com.zetcode;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

// DatagramSocket provides network communication via UDP protocol
// The Quote of the Day (QOTD) service is a member of the Internet protocol
// suite, defined in RFC 865

public class DatagramSocketEx {

    public static void main(String[] args) throws IOException {

        var hostname = "djxmmx.net";
        int port = 17;

        var address = InetAddress.getByName(hostname);

        try (var socket = new DatagramSocket()) {

            var request = new DatagramPacket(new byte[1], 1, address, port);
            socket.send(request);

            var buffer = new byte[512];
            var response = new DatagramPacket(buffer, buffer.length);
            socket.receive(response);

            var quote = new String(buffer, 0, response.getLength());
            System.out.println(quote);
        }
    }
}

The example retrieves a quote from a quote service and prints it to the
terminal.

var address = InetAddress.getByName(hostname);

We get an IP address from a hostname.

try (var socket = new DatagramSocket()) {

A DatagramSocket is created.

var request = new DatagramPacket(new byte[1], 1, address, port);

A DatagramPacket is created. Since the QOTD service does
not require data from a client, we send an empty small array.
Each time we send a packet, we need to specify data, address, and the
port.

socket.send(request);

The packet is send to its destination with send.

var buffer = new byte[512];
var response = new DatagramPacket(buffer, buffer.length);
socket.receive(response);

We receive a packet from the service.

var quote = new String(buffer, 0, response.getLength());
System.out.println(quote);

We transform the received bytes into a string and print it.

## Source

[Java Socket - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/net/Socket.html)

In this article we have created network Java programs with sockets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).