+++
title = "Dart HttpClient"
date = 2025-08-29T19:51:53.547+01:00
draft = false
description = "Dart HttpClient tutorial shows how to perform HTTP operations in Dart using the HttpClient class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClient

last modified April 4, 2025

The HttpClient class in Dart provides a powerful way to make HTTP
requests. It supports various HTTP methods, headers, and request/response
handling.

HttpClient is part of Dart's dart:io library and is suitable for
both command-line and server applications. It doesn't work in browser contexts.

## Basic Definition

HttpClient is a client for making HTTP requests. It supports
GET, POST, PUT, DELETE and other HTTP methods with configurable options.

Key features include connection persistence, cookie management, and request
configuration. It provides both high-level and low-level control over requests.

## Basic GET Request

This example shows how to make a simple GET request to fetch data.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://jsonplaceholder.typicode.com/posts/1'));
    var response = await request.close();
    
    if (response.statusCode == HttpStatus.ok) {
      var json = await response.transform(utf8.decoder).join();
      print('Response data: $json');
    } else {
      print('Request failed with status: ${response.statusCode}');
    }
  } finally {
    client.close();
  }
}

We create an HttpClient instance, make a GET request, and handle the response.
The client must be closed after use to free resources. We use async/await for
asynchronous operations.

$ dart main.dart
Response data: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere...",
  "body": "quia et suscipit..."
}

## POST Request with JSON

This example demonstrates sending JSON data with a POST request.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.postUrl(
      Uri.parse('https://jsonplaceholder.typicode.com/posts'));
    
    request.headers.contentType = ContentType.json;
    request.write(jsonEncode({
      'title': 'foo',
      'body': 'bar',
      'userId': 1
    }));
    
    var response = await request.close();
    var responseBody = await response.transform(utf8.decoder).join();
    
    print('Response status: ${response.statusCode}');
    print('Response body: $responseBody');
  } finally {
    client.close();
  }
}

We configure a POST request with JSON content type and send encoded JSON data.
The server responds with the created resource including an assigned ID. Headers
are set before writing the request body.

$ dart main.dart
Response status: 201
Response body: {
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}

## Handling Headers

This example shows how to set request headers and read response headers.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://httpbin.org/headers'));
    
    // Set custom headers
    request.headers.add('X-Custom-Header', 'DartClient');
    request.headers.add('Accept', 'application/json');
    
    var response = await request.close();
    
    // Print response headers
    print('Response headers:');
    response.headers.forEach((name, values) {
      print('$name: $values');
    });
    
    // Print response body
    var body = await response.transform(utf8.decoder).join();
    print('\nResponse body:\n$body');
  } finally {
    client.close();
  }
}

We add custom headers to the request and inspect the response headers. The
httpbin.org service echoes back our request headers in the response body.
Header values are always lists since HTTP allows multiple values per header.

$ dart main.dart
Response headers:
date: [Wed, 03 Apr 2024 12:00:00 GMT]
content-type: [application/json]
...

Response body:
{
  "headers": {
    "Accept": "application/json",
    "Host": "httpbin.org",
    "X-Custom-Header": "DartClient",
    ...
  }
}

## File Download

This example demonstrates downloading a file and saving it locally.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var file = File('downloaded_image.jpg');
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://picsum.photos/200/300.jpg'));
    var response = await request.close();
    
    if (response.statusCode == HttpStatus.ok) {
      await response.pipe(file.openWrite());
      print('File downloaded successfully');
    } else {
      print('Download failed: ${response.statusCode}');
    }
  } finally {
    client.close();
  }
}

We download an image file and stream it directly to a local file. The pipe()
method efficiently handles the data transfer without loading the entire file
into memory. This approach works well for large files.

$ dart main.dart
File downloaded successfully

## Error Handling

This example shows proper error handling for HTTP requests.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://nonexistent.example.com'));
    var response = await request.close();
    var body = await response.transform(utf8.decoder).join();
    print(body);
  } on SocketException catch (e) {
    print('Network error: $e');
  } on HttpException catch (e) {
    print('HTTP error: $e');
  } on Exception catch (e) {
    print('Unexpected error: $e');
  } finally {
    client.close();
  }
}

We demonstrate catching specific exceptions that might occur during HTTP
requests. SocketException handles network issues, HttpException catches
HTTP-specific errors. Always close the client in the finally block.

$ dart main.dart
Network error: SocketException: Failed host lookup...

## Best Practices

- **Reuse clients:** Create one HttpClient per application

- **Close clients:** Always close HttpClient when done

- **Error handling:** Catch specific exceptions

- **Stream responses:** Use streams for large responses

- **Timeout:** Implement request timeouts

## Source

[Dart HttpClient Documentation](https://api.dart.dev/stable/dart-io/HttpClient-class.html)

This tutorial covered Dart's HttpClient class with practical examples showing
basic requests, headers, file downloads, and error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).