+++
title = "C# WebSocket"
date = 2025-08-29T19:51:36.764+01:00
draft = false
description = "C# WebSocket tutorial shows how to work with websockets in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# WebSocket

last modified July 5, 2023

 

In this article we show how to work with websockets in C#.

## WebSocket

WebSocket is a computer communications protocol, providing full-duplex
communication channels over a single TCP connection. WebSockets are used in
highly interactive applications such as games, chats, or stock markets.

We create an ASP.NET application with a websocket support. We create two
clients: a C# console program and a HTML page with JS code.

## C# ASP.NET WebSocket server

The following is a simple websocket server application.

Program.cs
  

using System.Net;
using System.Net.WebSockets;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseWebSockets();
app.Map("/ws", async context =&gt;
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        var rand = new Random();

        while (true)
        {
            var now = DateTime.Now;
            byte[] data = Encoding.ASCII.GetBytes($"{now}");
            await webSocket.SendAsync(data, WebSocketMessageType.Text, 
                true, CancellationToken.None);
            await Task.Delay(1000);

            long r = rand.NextInt64(0, 10);

            if (r == 7)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure,
                    "random closing", CancellationToken.None);

                return;
            }
        }
    }
    else
    {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
    }
});

app.Run("http://localhost:5050");

The application sends the current datetime to the client. When the random 
number generator chooses value 7, we close the connection. 

using System.Net.WebSockets;

Websocket support is in System.Net.WebSockets namespace.

app.UseWebSockets();

We enable websocket middleware with UseWebSockets.

app.Map("/ws", async context =&gt;
{

We map the communication to the /ws endpoint.

if (context.WebSockets.IsWebSocketRequest)
{

We check if the request is a WebSocket establishment request.

using var webSocket = await context.WebSockets.AcceptWebSocketAsync();

We transition the request to a WebSocket connection with
AcceptWebSocketAsync.

var now = DateTime.Now;
byte[] data = Encoding.ASCII.GetBytes($"{now}");
await webSocket.SendAsync(data, WebSocketMessageType.Text, true, CancellationToken.None);

We send data to the client with SendAsync. The data is the current
datetime.

long r = rand.NextInt64(0, 10);

if (r == 7)
{
    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure,
        "random closing", CancellationToken.None);

    return;
}

We randomly close the connection with CloseAsync.

$ dotnet watch

We start the server with dotnet watch.

## C# WebSocket client

In the next example we create a C# console program that establishes a websocket 
connection to the server.

Program.cs
  

using System.Net.WebSockets;
using System.Text;

Console.Title = "Client";

using var ws = new ClientWebSocket();

await ws.ConnectAsync(new Uri("ws://localhost:5050/ws"), CancellationToken.None);
byte[] buf = new byte[1056];

while (ws.State == WebSocketState.Open)
{
    var result = await ws.ReceiveAsync(buf, CancellationToken.None);

    if (result.MessageType == WebSocketMessageType.Close)
    {
        await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
        Console.WriteLine(result.CloseStatusDescription);
    }
    else
    {
        Console.WriteLine(Encoding.ASCII.GetString(buf, 0, result.Count));
    }
}

We establish a websocket connection to the server from a console application. 

using var ws = new ClientWebSocket();

The ClientWebSocket is used to create websocket clients in a C# 
application.

await ws.ConnectAsync(new Uri("ws://localhost:5050/ws"), CancellationToken.None);

We asynchronously connect to the ws://localhost:5050/ws endpoint 
with ConnectAsync.

byte[] buf = new byte[1056];

This is the buffer to which we read the response.

var result = await ws.ReceiveAsync(buf, CancellationToken.None);

We read the response with ReceiveAsync.

if (result.MessageType == WebSocketMessageType.Close)
{
    await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, null, CancellationToken.None);
    Console.WriteLine(result.CloseStatusDescription);
}
else
{
    Console.WriteLine(Encoding.ASCII.GetString(buf, 0, result.Count));
}

If the message type is WebSocketMessageType.Close, we close the
connection from the client side with CloseAsync and print the
closing description. Otherwise we print the received data. 

$ dotnet run
10/28/2022 2:57:48 PM
10/28/2022 2:57:49 PM
10/28/2022 2:57:50 PM
10/28/2022 2:57:51 PM
10/28/2022 2:57:52 PM
10/28/2022 2:57:53 PM
10/28/2022 2:57:54 PM
10/28/2022 2:57:55 PM
random closing

## JS WebSocket client

In the next example, we create a JS client that creates a websocket connection.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;

    &lt;script type="text/javascript"&gt;
        function connect() {

            let o = document.getElementById("output");
            var ws = new WebSocket("ws://localhost:5050/ws");

            ws.onmessage = e =&gt; {
                o.innerText = e.data;
            };

            ws.onclose = e =&gt; {

                o.innerText = e.reason;
            };
        };

    &lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;div id="output"&gt;
    &lt;/div&gt;

    &lt;p&gt;
        &lt;a href="#" onclick="connect()"&gt;Start&lt;/a&gt;&lt;/div&gt;
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

In JS, we use the WebSocket class and the onmessage and 
onclose handlers.

## Source

[WebSocket class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.net.websockets.websocket?view=net-8.0)

In this article we have worked with WebSocket in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).