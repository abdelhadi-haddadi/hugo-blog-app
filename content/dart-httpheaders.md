+++
title = "Dart HttpHeaders"
date = 2025-08-29T19:51:56.940+01:00
draft = false
description = "Dart HttpHeaders tutorial shows how to manage HTTP headers in Dart using the HttpHeaders class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpHeaders

last modified April 4, 2025

The HttpHeaders class in Dart provides functionality to manage
HTTP headers for requests and responses. It's part of Dart's HTTP library.

HttpHeaders handles header name case sensitivity, multiple values, and
special headers like content-length automatically. It's used with HttpClient
and HttpServer classes.

## Basic Definition

HttpHeaders is an abstract class representing HTTP headers.
It provides methods to add, set, remove, and inspect headers.

Key features include case-insensitive header names, value list management,
and special handling for cookies and content headers. It's immutable once
frozen.

## Creating HttpHeaders

This example shows how to create and populate HttpHeaders.

main.dart
  

import 'dart:io';

void main() {
  var headers = HttpHeaders();
  
  headers.add('Content-Type', 'text/html');
  headers.add('X-Custom-Header', 'value1');
  headers.add('X-Custom-Header', 'value2');
  
  print('Content-Type: ${headers.value('content-type')}');
  print('X-Custom-Header: ${headers['x-custom-header']}');
}

We create HttpHeaders and add multiple headers. Header names are case-insensitive.
The same header can have multiple values. Values can be accessed by name.

$ dart main.dart
Content-Type: text/html
X-Custom-Header: [value1, value2]

## Setting vs Adding Headers

This example demonstrates the difference between set and add operations.

main.dart
  

import 'dart:io';

void main() {
  var headers = HttpHeaders();
  
  headers.add('Accept', 'text/html');
  headers.add('Accept', 'application/json');
  
  print('Before set: ${headers['accept']}');
  
  headers.set('Accept', 'image/png');
  
  print('After set: ${headers['accept']}');
  
  headers.remove('accept', 'image/png');
  print('After remove: ${headers['accept']}');
}

Add appends values while set replaces all existing values. Remove deletes
specific values. All operations are case-insensitive.

$ dart main.dart
Before set: [text/html, application/json]
After set: [image/png]
After remove: []

## Content Headers

This example shows special handling for content-related headers.

main.dart
  

import 'dart:io';

void main() {
  var headers = HttpHeaders();
  
  headers.contentType = ContentType('text', 'html', charset: 'utf-8');
  headers.contentLength = 1024;
  headers.chunkedTransferEncoding = false;
  
  print('Content-Type: ${headers.contentType}');
  print('Content-Length: ${headers.contentLength}');
  print('Chunked: ${headers.chunkedTransferEncoding}');
}

Content headers have dedicated properties for type, length, and encoding.
These properties provide type-safe access to common HTTP content headers.

$ dart main.dart
Content-Type: text/html; charset=utf-8
Content-Length: 1024
Chunked: false

## Date and Cookie Headers

This example demonstrates date and cookie header handling.

main.dart
  

import 'dart:io';

void main() {
  var headers = HttpHeaders();
  var date = DateTime.now();
  
  headers.date = date;
  headers.add('Set-Cookie', 'id=a3fWa; Expires=Wed, 21 Oct 2025 07:28:00 GMT');
  headers.add('Set-Cookie', 'session=abc123; HttpOnly');
  
  print('Date: ${headers.date}');
  print('Cookies:');
  headers.forEach((name, values) {
    if (name == 'set-cookie') {
      values.forEach(print);
    }
  });
}

Date headers are handled with DateTime objects. Cookies can be added as strings
but are specially formatted. The forEach method iterates through all headers.

$ dart main.dart
Date: 2025-04-04 12:34:56.789
Cookies:
id=a3fWa; Expires=Wed, 21 Oct 2025 07:28:00 GMT
session=abc123; HttpOnly

## HttpClient with Headers

This example shows using HttpHeaders with HttpClient requests.

main.dart
  

import 'dart:io';
import 'dart:convert';

Future&lt;void&gt; main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com'));
    
    request.headers.add('Accept', 'application/json');
    request.headers.add('User-Agent', 'Dart/3.0');
    request.headers.add('X-Request-ID', '12345');
    
    var response = await request.close();
    print('Status: ${response.statusCode}');
    
    var body = await response.transform(utf8.decoder).join();
    print('Response length: ${body.length}');
  } finally {
    client.close();
  }
}

We create an HTTP GET request with custom headers. The headers property is
an HttpHeaders instance. Headers are sent with the request to the server.

$ dart main.dart
Status: 200
Response length: 1256

## Best Practices

- **Reuse:** Create headers once and reuse when possible

- **Validation:** Validate header values before setting

- **Constants:** Use constants for header names

- **Security:** Sanitize user-provided header values

## Source

[Dart HttpHeaders Documentation](https://api.dart.dev/stable/dart-io/HttpHeaders-class.html)

This tutorial covered Dart's HttpHeaders class with practical examples showing
header management, special headers, and HTTP client integration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).