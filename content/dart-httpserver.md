+++
title = "Dart HttpServer"
date = 2025-08-29T19:51:58.048+01:00
draft = false
description = "Dart HttpServer tutorial shows how to create HTTP servers in Dart using the HttpServer class from dart:io."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpServer

last modified April 4, 2025

The HttpServer class in Dart provides functionality to create
HTTP servers. It's part of the dart:io library and enables
building web applications and APIs.

HttpServer handles incoming HTTP requests and manages responses. It supports
features like request routing, headers, and different HTTP methods.

## Basic Definition

HttpServer is a class that implements an HTTP server in Dart.
It listens for incoming HTTP requests on a specified port and address.

Key features include request handling, response generation, and support for
persistent connections. It forms the foundation for web applications in Dart.

## Basic HttpServer Example

This example shows a simple HTTP server that responds to all requests.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('Server running on http://${server.address.host}:${server.port}');

  await for (HttpRequest request in server) {
    request.response
      ..headers.contentType = ContentType.text
      ..write('Hello from Dart server!')
      ..close();
  }
}

We create an HttpServer bound to localhost on port 8080. For each request,
we send a simple text response. The server runs asynchronously using Futures.

$ dart main.dart
Server running on http://localhost:8080

## Handling Different Routes

This example demonstrates basic route handling in an HTTP server.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    switch (request.uri.path) {
      case '/':
        request.response.write('Home page');
        break;
      case '/about':
        request.response.write('About page');
        break;
      default:
        request.response.statusCode = HttpStatus.notFound;
        request.response.write('Not found');
    }
    await request.response.close();
  }
}

We examine the request URI path to provide different responses. The default
case handles unknown routes with a 404 status code. Each response must be closed.

$ dart main.dart

## Handling POST Requests

This example shows how to process POST requests and read request bodies.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    if (request.method == 'POST') {
      try {
        final content = await utf8.decoder.bind(request).join();
        final data = jsonDecode(content) as Map;
        request.response.write('Received: ${data['message']}');
      } catch (e) {
        request.response.statusCode = HttpStatus.badRequest;
        request.response.write('Invalid request');
      }
    } else {
      request.response.statusCode = HttpStatus.methodNotAllowed;
      request.response.write('Only POST supported');
    }
    await request.response.close();
  }
}

We check the request method and process POST data as JSON. The request body
is read asynchronously. Error handling ensures robust operation.

$ dart main.dart

## Serving Static Files

This example demonstrates serving static files from a directory.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  final staticDir = Directory('static');
  
  await for (HttpRequest request in server) {
    final filePath = 'static${request.uri.path}';
    final file = File(filePath);
    
    if (await file.exists()) {
      await request.response.addStream(file.openRead());
    } else {
      request.response.statusCode = HttpStatus.notFound;
      request.response.write('File not found');
    }
    await request.response.close();
  }
}

We serve files from a 'static' directory matching the request path. The
file contents are streamed directly to the response for efficiency.

$ dart main.dart

## WebSocket Server

This example shows upgrading HTTP connections to WebSocket.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    if (WebSocketTransformer.isUpgradeRequest(request)) {
      final socket = await WebSocketTransformer.upgrade(request);
      socket.listen((data) {
        socket.add('Echo: $data');
      });
    } else {
      request.response.statusCode = HttpStatus.badRequest;
      request.response.write('WebSocket expected');
      await request.response.close();
    }
  }
}

We check for WebSocket upgrade requests and handle them separately. The
WebSocket connection allows bidirectional communication with the client.

$ dart main.dart

## Best Practices

- **Error handling:** Always handle potential I/O errors

- **Resource management:** Close responses properly

- **Async operations:** Use await for async operations

- **Security:** Validate all incoming data

- **Performance:** Stream large responses

## Source

[Dart HttpServer Documentation](https://api.dart.dev/stable/dart-io/HttpServer-class.html)

This tutorial covered Dart's HttpServer class with practical examples showing
basic usage, route handling, POST processing, static files, and WebSockets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).