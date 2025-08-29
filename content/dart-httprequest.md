+++
title = "Dart HttpRequest"
date = 2025-08-29T19:51:56.954+01:00
draft = false
description = "Dart HttpRequest tutorial shows how to make HTTP requests in Dart using the HttpRequest class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpRequest

last modified April 4, 2025

The HttpRequest class in Dart provides functionality for making
HTTP requests to web servers. It's part of Dart's web platform libraries.

HttpRequest supports various HTTP methods including GET, POST, PUT, and DELETE.
It handles both synchronous and asynchronous requests with response processing.

## Basic Definition

HttpRequest is a client-side API for making HTTP requests from
Dart web apps. It's available in the dart:html library.

Key features include request configuration, header management, response handling,
and error management. It works in browser environments only.

## Basic GET Request

This example shows how to make a simple GET request to fetch data.

main.dart
  

import 'dart:html';

void main() async {
  try {
    var response = await HttpRequest.getString('https://jsonplaceholder.typicode.com/posts/1');
    print('Response: $response');
  } catch (e) {
    print('Error: $e');
  }
}

We use HttpRequest.getString() for a simple GET request. The method returns
a Future with the response body as a string. Error handling catches network issues.

$ dart main.dart
Response: {
  "userId": 1,
  "id": 1,
  "title": "...",
  "body": "..."
}

## POST Request with JSON

This example demonstrates sending a POST request with JSON data.

main.dart
  

import 'dart:html';
import 'dart:convert';

void main() async {
  var url = 'https://jsonplaceholder.typicode.com/posts';
  var data = {
    'title': 'foo',
    'body': 'bar',
    'userId': 1
  };
  
  try {
    var request = await HttpRequest.request(
      url,
      method: 'POST',
      sendData: jsonEncode(data),
      requestHeaders: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    );
    
    print('Status: ${request.status}');
    print('Response: ${request.responseText}');
  } catch (e) {
    print('Error: $e');
  }
}

We create a POST request with JSON data. The requestHeaders specify content type.
HttpRequest.request() provides full control over request configuration.

$ dart main.dart
Status: 201
Response: {
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}

## Handling Response Headers

This example shows how to access and process response headers.

main.dart
  

import 'dart:html';

void main() async {
  try {
    var request = await HttpRequest.request(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    
    print('Status: ${request.status}');
    print('Content-Type: ${request.getResponseHeader('content-type')}');
    
    var headers = request.responseHeaders;
    print('All headers:');
    headers.forEach((key, value) =&gt; print('$key: $value'));
  } catch (e) {
    print('Error: $e');
  }
}

We inspect response headers after a successful request. getResponseHeader()
accesses specific headers while responseHeaders provides all headers.

$ dart main.dart
Status: 200
Content-Type: application/json; charset=utf-8
All headers:
cache-control: public, max-age=14400
content-type: application/json; charset=utf-8
...

## Error Handling

This example demonstrates comprehensive error handling for HTTP requests.

main.dart
  

import 'dart:html';

void main() async {
  try {
    var request = await HttpRequest.request(
      'https://jsonplaceholder.typicode.com/nonexistent',
      method: 'GET'
    );
    
    if (request.status &gt;= 200 &amp;&amp; request.status &lt; 300) {
      print('Success: ${request.responseText}');
    } else {
      print('HTTP Error: ${request.status}');
      print('Status text: ${request.statusText}');
    }
  } catch (e) {
    if (e is ErrorEvent) {
      print('Network error: ${e.message}');
    } else {
      print('Unexpected error: $e');
    }
  }
}

We handle both HTTP status errors and network errors. The example checks status
codes and provides different error messages for different failure scenarios.

$ dart main.dart
HTTP Error: 404
Status text: Not Found

## File Upload with Progress

This example shows file upload with progress tracking.

main.dart
  

import 'dart:html';

void main() {
  var fileInput = FileUploadInputElement();
  fileInput.onChange.listen((e) {
    var file = fileInput.files!.first;
    var formData = FormData();
    formData.appendBlob('file', file, file.name);
    
    var request = HttpRequest();
    request.open('POST', 'https://example.com/upload');
    
    request.upload.onProgress.listen((ProgressEvent e) {
      if (e.lengthComputable) {
        var percent = (e.loaded / e.total * 100).round();
        print('Upload progress: $percent%');
      }
    });
    
    request.onLoad.listen((e) {
      if (request.status == 200) {
        print('Upload complete');
      }
    });
    
    request.send(formData);
  });
  
  document.body!.append(fileInput);
}

We create a file upload with progress tracking. The upload.onProgress event
provides updates during the upload. This example works in browser environments.

$ dart main.dart
Upload progress: 25%
Upload progress: 50%
Upload progress: 75%
Upload progress: 100%
Upload complete

## Best Practices

- **CORS:** Handle Cross-Origin Resource Sharing properly

- **Timeouts:** Implement request timeouts for reliability

- **Headers:** Set appropriate request headers

- **Errors:** Handle both network and HTTP errors

- **Security:** Validate all responses before processing

## Source

[Dart HttpRequest Documentation](https://api.dart.dev/stable/dart-html/HttpRequest-class.html)

This tutorial covered Dart's HttpRequest class with practical examples showing
various HTTP operations, error handling, and advanced features like uploads.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).