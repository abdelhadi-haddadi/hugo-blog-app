+++
title = "Dart HttpClientResponse"
date = 2025-08-29T19:51:54.653+01:00
draft = false
description = "Dart HttpClientResponse tutorial shows how to handle HTTP responses in Dart using the HttpClientResponse class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClientResponse

last modified April 4, 2025

The HttpClientResponse class in Dart represents the response from
an HTTP request. It provides access to response headers, status code, and body.

HttpClientResponse is a stream of byte data that must be fully read or canceled.
It's part of Dart's dart:io library for server-side applications.

## Basic Definition

HttpClientResponse is an abstract class that implements Stream&lt;List&lt;int&gt;&gt;.
It provides HTTP-specific response information and the response body as a stream.

Key properties include statusCode, headers, contentLength, and compressionState.
The response body must be consumed to free up system resources properly.

## Basic HTTP GET Request

This example shows how to make a simple GET request and read the response.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com'));
    var response = await request.close();
    
    print('Status code: ${response.statusCode}');
    print('Headers: ${response.headers}');
    
    var body = await response.transform(utf8.decoder).join();
    print('Body length: ${body.length}');
  } finally {
    client.close();
  }
}

We create an HttpClient, make a GET request, and process the response. The
response body is read as a UTF-8 string. Always close the client when done.

$ dart main.dart
Status code: 200
Headers: {content-encoding: gzip, accept-ranges: bytes, ...}
Body length: 1256

## Handling Response Headers

This example demonstrates accessing and working with response headers.

main.dart
  

import 'dart:io';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com'));
    var response = await request.close();
    
    print('Content-Type: ${response.headers.contentType}');
    print('Content-Length: ${response.contentLength}');
    print('Last-Modified: ${response.headers.value('last-modified')}');
    
    response.headers.forEach((name, values) {
      print('$name: $values');
    });
  } finally {
    client.close();
  }
}

We access common headers through convenience properties and iterate through all
headers. Headers are case-insensitive and may have multiple values.

$ dart main.dart
Content-Type: text/html; charset=UTF-8
Content-Length: 648
Last-Modified: null
content-encoding: [gzip]
accept-ranges: [bytes]
...

## Reading Response as JSON

This example shows how to parse a JSON response from an API.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://jsonplaceholder.typicode.com/todos/1')
    );
    var response = await request.close();
    
    if (response.statusCode == 200) {
      var jsonString = await response.transform(utf8.decoder).join();
      var json = jsonDecode(jsonString);
      
      print('Todo ID: ${json['id']}');
      print('Title: ${json['title']}');
      print('Completed: ${json['completed']}');
    } else {
      print('Request failed with status: ${response.statusCode}');
    }
  } finally {
    client.close();
  }
}

We fetch a JSON resource, decode the response body, and access the parsed data.
The response stream is transformed to UTF-8 before JSON parsing.

$ dart main.dart
Todo ID: 1
Title: delectus aut autem
Completed: false

## Handling Large Responses

This example demonstrates streaming large responses in chunks.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://example.com/large-file')
    );
    var response = await request.close();
    
    var file = File('large_file.txt').openWrite();
    var byteCount = 0;
    
    await response.listen((List&lt;int&gt; chunk) {
      byteCount += chunk.length;
      file.add(chunk);
      print('Received ${chunk.length} bytes (total: $byteCount)');
    }).asFuture();
    
    await file.close();
    print('File saved with $byteCount bytes');
  } finally {
    client.close();
  }
}

We stream a large response directly to a file without loading it all into memory.
The listen() method processes each chunk as it arrives from the server.

$ dart main.dart
Received 16384 bytes (total: 16384)
Received 16384 bytes (total: 32768)
...
File saved with 5242880 bytes

## Error Handling

This example shows proper error handling for HTTP requests.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://nonexistent.example.com')
    );
    var response = await request.close();
    
    var body = await response.transform(utf8.decoder).join();
    print(body);
  } on SocketException catch (e) {
    print('Network error: $e');
  } on HttpException catch (e) {
    print('HTTP error: $e');
  } on FormatException catch (e) {
    print('Format error: $e');
  } finally {
    client.close();
  }
}

We handle different types of exceptions that may occur during HTTP requests.
SocketException covers network issues, HttpException for HTTP errors.

$ dart main.dart
Network error: SocketException: Failed host lookup: 'nonexistent.example.com'

## Best Practices

- **Always close:** Ensure HttpClient is closed when done

- **Consume responses:** Read or cancel all response streams

- **Use transforms:** Convert byte streams to text when needed

- **Handle errors:** Catch specific exceptions appropriately

- **Check status:** Verify statusCode before processing body

## Source

[Dart HttpClientResponse Documentation](https://api.dart.dev/stable/dart-io/HttpClientResponse-class.html)

This tutorial covered Dart's HttpClientResponse class with practical examples
showing response handling, streaming, error management, and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).