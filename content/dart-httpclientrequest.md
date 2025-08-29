+++
title = "Dart HttpClientRequest"
date = 2025-08-29T19:51:54.645+01:00
draft = false
description = "Dart HttpClientRequest tutorial shows how to make HTTP client requests in Dart using the HttpClientRequest class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClientRequest

last modified April 4, 2025

The HttpClientRequest class in Dart represents an HTTP client request.
It's used to configure and send HTTP requests to servers. This class provides
methods to set headers, write data, and manage the request lifecycle.

HttpClientRequest is part of Dart's dart:io library. It's created
by HttpClient when opening connections. The class supports various HTTP methods
like GET, POST, PUT, and DELETE.

## Basic Definition

HttpClientRequest represents an outgoing HTTP request. It provides
access to request headers, the request body output stream, and response handling.

Key features include header manipulation, request method configuration, and
stream-based body writing. It works with HttpClientResponse for complete
HTTP client functionality.

## Basic GET Request

This example shows how to make a simple GET request using HttpClientRequest.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    HttpClientRequest request = await client.getUrl(
      Uri.parse('https://jsonplaceholder.typicode.com/posts/1')
    );
    
    HttpClientResponse response = await request.close();
    var responseBody = await response.transform(utf8.decoder).join();
    
    print('Status code: ${response.statusCode}');
    print('Response body:\n$responseBody');
  } finally {
    client.close();
  }
}

We create an HttpClient, then use getUrl() to create a GET request. After
configuring, we close the request and await the response. The response body
is decoded from UTF-8.

$ dart main.dart
Status code: 200
Response body:
{
  "userId": 1,
  "id": 1,
  "title": "...",
  "body": "..."
}

## POST Request with JSON Body

This example demonstrates sending a POST request with JSON data.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    HttpClientRequest request = await client.postUrl(
      Uri.parse('https://jsonplaceholder.typicode.com/posts')
    );
    
    request.headers.contentType = ContentType.json;
    request.write(jsonEncode({
      'title': 'foo',
      'body': 'bar',
      'userId': 1
    }));
    
    HttpClientResponse response = await request.close();
    var responseBody = await response.transform(utf8.decoder).join();
    
    print('Status code: ${response.statusCode}');
    print('Response body:\n$responseBody');
  } finally {
    client.close();
  }
}

We create a POST request and set the Content-Type header to application/json.
The request body is written as JSON-encoded data. The server responds with
the created resource representation.

$ dart main.dart
Status code: 201
Response body:
{
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}

## Setting Custom Headers

This example shows how to set custom headers on a request.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    HttpClientRequest request = await client.getUrl(
      Uri.parse('https://httpbin.org/headers')
    );
    
    request.headers.add('X-Custom-Header', 'DartClient');
    request.headers.add('Accept', 'application/json');
    
    HttpClientResponse response = await request.close();
    var responseBody = await response.transform(utf8.decoder).join();
    
    print('Status code: ${response.statusCode}');
    print('Response body:\n$responseBody');
  } finally {
    client.close();
  }
}

We add custom headers to the request using the headers property. The httpbin.org
service echoes back all received headers in its response. This helps verify
header transmission.

$ dart main.dart
Status code: 200
Response body:
{
  "headers": {
    "Accept": "application/json",
    "Host": "httpbin.org",
    "X-Custom-Header": "DartClient",
    ...
  }
}

## Uploading File with PUT Request

This example demonstrates uploading a file using a PUT request.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  var file = File('example.txt');
  
  try {
    HttpClientRequest request = await client.putUrl(
      Uri.parse('https://example.com/upload')
    );
    
    request.headers.contentType = ContentType.text;
    request.contentLength = await file.length();
    await request.addStream(file.openRead());
    
    HttpClientResponse response = await request.close();
    print('Upload complete. Status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We create a PUT request and set the content length from the file size. The
file contents are streamed directly to the request body. This approach is
memory-efficient for large files.

$ dart main.dart
Upload complete. Status: 200

## Handling Redirects

This example shows how to configure and handle HTTP redirects.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    client.maxRedirects = 3; // Set maximum redirects
    HttpClientRequest request = await client.getUrl(
      Uri.parse('http://google.com')
    );
    
    request.followRedirects = true;
    HttpClientResponse response = await request.close();
    
    print('Final status: ${response.statusCode}');
    print('Redirect count: ${response.redirects.length}');
    print('Final URL: ${response.redirects.last?.location}');
  } finally {
    client.close();
  }
}

We configure the client to follow redirects and set a maximum limit. The
response object contains information about all redirects that occurred.
This helps debug and analyze redirect chains.

$ dart main.dart
Final status: 200
Redirect count: 1
Final URL: https://www.google.com/

## Best Practices

- **Close requests:** Always close requests with close()

- **Error handling:** Implement proper error handling

- **Stream data:** Use streams for large payloads

- **Reuse clients:** Reuse HttpClient instances when possible

- **Set timeouts:** Configure timeouts for reliability

## Source

[Dart HttpClientRequest Documentation](https://api.dart.dev/stable/dart-io/HttpClientRequest-class.html)

This tutorial covered Dart's HttpClientRequest class with practical examples
showing various HTTP methods, headers, file uploads, and redirect handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).