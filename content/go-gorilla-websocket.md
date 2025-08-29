+++
title = "Go Gorilla WebSocket"
date = 2025-08-29T19:55:20.151+01:00
draft = false
description = "Learn how to use WebSockets in Go with the Gorilla WebSocket library. Includes examples of real-time communication."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Gorilla WebSocket

last modified April 11, 2024

In this article we show how to work with websockets using Gorilla
WebSocket package.

WebSocket is a computer communications protocol, providing
full-duplex communication channels over a single TCP connection. WebSockets are
used in highly interactive applications such as games, chats, or stock markets. 

The *Gorilla WebSocket* package provides a complete and tested
implementation of the WebSocket protocol.

$ go get github.com/gorilla/websocket

This command installs the package.

## Gorilla WebSocket example

In the example, we create a simple websocket server. The client will be a
browser that connects to the server with JS code.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

func main() {

    http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
        conn, err := upgrader.Upgrade(w, r, nil)

        if err != nil {
            log.Fatal(err)
        }

        for {

            msgType, msg, err := conn.ReadMessage()
            if err != nil {
                return
            }

            fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), string(msg))

            if err = conn.WriteMessage(msgType, msg); err != nil {
                return
            }
        }
    })

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "index.html")
    })

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

The program sets up the websocket endpoint and a static index.html page.

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

We define buffers for the upgrader. It specifies parameters for upgrading an
HTTP connection to a WebSocket connection.

http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {

We register a handler function for the /echo endpoint.

conn, err := upgrader.Upgrade(w, r, nil)

We upgrade the HTTP server connection to the WebSocket protocol.

for {

    msgType, msg, err := conn.ReadMessage()
    if err != nil {
        return
    }

    fmt.Printf("%s sent: %s\n", conn.RemoteAddr(), string(msg))

    if err = conn.WriteMessage(msgType, msg); err != nil {
        return
    }
}

We continually listen for any incoming messages sent through that WebSocket
connection. We read the message from the client with ReadMessage.
The WriteMessage writes the message back to the client.

http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "index.html")
})

We set up the static HTML home page, from which we connect to the server.

The connection to the websocket endpoint is made from the browser.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;input id="input" type="text"&gt;
    &lt;button onclick="send()"&gt;Send&lt;/button&gt;
    &lt;pre id="output"&gt;&lt;/pre&gt;

    &lt;script&gt;
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var socket = new WebSocket("ws://localhost:8080/echo");

        socket.onopen = () =&gt; {
            output.innerHTML += "connected\n";
        };

        socket.onmessage = (e) =&gt; {
            output.innerHTML += `{e.data}\n`;
        };

        function send() {
            socket.send(input.value);
            input.value = "";
        }
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

In JS, we use the WebSocket class provides the API for creating and
managing a WebSocket connection to a server, as well as for sending and
receiving data on the connection. 

## Source

[Gorilla Websocket - Github page](https://github.com/gorilla/websocket)

In this article we have worked with websockets using Gorilla WebSocket package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).