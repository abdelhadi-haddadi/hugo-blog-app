+++
title = "Dart HttpResponse"
date = 2025-08-29T19:51:56.935+01:00
draft = false
description = "Dart HttpResponse tutorial shows how to handle HTTP responses in Dart using the HttpResponse class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpResponse

last modified April 4, 2025

The HttpResponse class in Dart provides functionality for handling
HTTP responses in server applications. It's part of the dart:io
library for server-side Dart programming.

HttpResponse allows setting status codes, headers, and writing response bodies.
It's typically used with HttpServer to create web servers and HTTP services.

## Basic Definition

HttpResponse represents an HTTP response that can be sent back to
a client. It provides methods to control the response status, headers, and body.

Key features include status code management, header manipulation, and various
ways to write response data. It's used in conjunction with HttpRequest objects.

## Basic HTTP Server Response

This example shows a simple HTTP server returning a text response.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.address}:${server.port}');

  await for (HttpRequest request in server) {
    request.response
      ..statusCode = HttpStatus.ok
      ..write('Hello, World!')
      ..close();
  }
}

We create an HTTP server that listens on port 8080. For each request, we set
the status code to 200 (OK), write a response, and close the connection.

$ dart main.dart
Server running on InternetAddress('127.0.0.1', IPv4):8080

## Setting Response Headers

This example demonstrates setting various HTTP response headers.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    request.response
      ..headers.contentType = ContentType.html
      ..headers.set('X-Custom-Header', 'DartServer')
      ..headers.date = DateTime.now()
      ..write('''
        &lt;html&gt;
          &lt;body&gt;
            &lt;h1&gt;Hello from Dart!&lt;/h1&gt;
          &lt;/body&gt;
        &lt;/html&gt;
      ''')
      ..close();
  }
}

We set the content type to HTML, add a custom header, and set the response date.
The headers property provides access to all HTTP headers for the response.

$ dart main.dart

## Serving JSON Data

This example shows how to return JSON data from an HTTP server.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    final data = {
      'message': 'Hello from Dart',
      'timestamp': DateTime.now().toIso8601String(),
      'status': 'success'
    };
    
    request.response
      ..statusCode = HttpStatus.ok
      ..headers.contentType = ContentType.json
      ..write(jsonEncode(data))
      ..close();
  }
}

We create a Dart map with our data, set the content type to JSON, and encode
the data to JSON format before writing it to the response.

$ dart main.dart

## Handling Different Status Codes

This example demonstrates using different HTTP status codes in responses.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    try {
      if (request.uri.path == '/secret') {
        request.response
          ..statusCode = HttpStatus.forbidden
          ..write('Access denied')
          ..close();
      } else if (request.uri.path == '/notfound') {
        request.response
          ..statusCode = HttpStatus.notFound
          ..write('Page not found')
          ..close();
      } else {
        request.response
          ..statusCode = HttpStatus.ok
          ..write('Welcome!')
          ..close();
      }
    } catch (e) {
      request.response
        ..statusCode = HttpStatus.internalServerError
        ..write('Server error: $e')
        ..close();
    }
  }
}

We examine the request path and return different status codes accordingly.
This shows how to handle various scenarios in a web server application.

$ dart main.dart

## Streaming Large Responses

This example demonstrates streaming large responses efficiently.

main.dart
  

import 'dart:io';
import 'dart:async';

Future&lt;void&gt; main() async {
  final server = await HttpServer.bind('localhost', 8080);
  
  await for (HttpRequest request in server) {
    if (request.uri.path == '/stream') {
      final response = request.response;
      response.headers.contentType = ContentType.text;
      
      final timer = Timer.periodic(Duration(seconds: 1), (timer) {
        response.write('Data chunk at ${DateTime.now()}\n');
        if (timer.tick &gt;= 5) {
          timer.cancel();
          response.close();
        }
      });
    } else {
      request.response
        ..write('Send request to /stream for streaming data')
        ..close();
    }
  }
}

We create a streaming response that sends data chunks every second for 5 seconds.
This is useful for large responses or real-time data without loading everything
into memory at once.

$ dart main.dart

## Best Practices

- **Always close:** Ensure responses are properly closed

- **Error handling:** Handle potential I/O errors gracefully

- **Headers first:** Set headers before writing content

- **Content types:** Always specify appropriate content types

- **Streaming:** Use streaming for large responses

## Source

[Dart HttpResponse Documentation](https://api.dart.dev/stable/dart-io/HttpResponse-class.html)

This tutorial covered Dart's HttpResponse class with practical examples showing
basic usage, header management, status codes, and streaming responses.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).