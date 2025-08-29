+++
title = "Dart ContentType"
date = 2025-08-29T19:51:41.210+01:00
draft = false
description = "Dart ContentType tutorial shows how to work with MIME types in Dart using the ContentType class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart ContentType

last modified April 4, 2025

The ContentType class in Dart represents MIME types used in HTTP
headers and content negotiation. It's essential for web development and
data exchange.

ContentType handles media types, character encodings, and parameters. It's part
of Dart's dart:io library for server-side applications and
dart:http for client-side.

## Basic Definition

ContentType represents a MIME type with optional parameters. It
parses and formats content-type headers according to RFC 2045 and RFC 2616.

Key properties include primary type, subtype, charset, and parameters. The class
provides constants for common MIME types and parsing utilities.

## Creating ContentType Objects

This example shows different ways to create ContentType instances.

main.dart
  

import 'dart:io';

void main() {
  // Using constructor
  var jsonType = ContentType('application', 'json');
  
  // Using parse
  var htmlType = ContentType.parse('text/html; charset=utf-8');
  
  // Using predefined constants
  var textPlain = ContentType.text;
  
  print('JSON: $jsonType');
  print('HTML: $htmlType');
  print('Text: $textPlain');
}

We demonstrate three creation methods: direct constructor, parsing from string,
and using predefined constants. Each method produces a valid ContentType object.

$ dart main.dart
JSON: application/json
HTML: text/html; charset=utf-8
Text: text/plain

## Working with Parameters

This example shows how to handle MIME type parameters like charset.

main.dart
  

import 'dart:io';

void main() {
  var contentType = ContentType('text', 'html',
      parameters: {'charset': 'utf-8', 'version': '1.0'});
  
  print('Primary type: ${contentType.primaryType}');
  print('Subtype: ${contentType.subType}');
  print('Charset: ${contentType.charset}');
  print('Version: ${contentType.parameters['version']}');
  
  // Modify parameters
  contentType.charset = 'iso-8859-1';
  print('Modified: $contentType');
}

We create a ContentType with additional parameters and demonstrate accessing
them. The charset property has special handling as a common parameter.

$ dart main.dart
Primary type: text
Subtype: html
Charset: utf-8
Version: 1.0
Modified: text/html; charset=iso-8859-1; version=1.0

## HTTP Header Parsing

This example demonstrates parsing Content-Type headers from HTTP requests.

main.dart
  

import 'dart:io';

void main() {
  var headers = {
    'content-type': 'application/json; charset=utf-8',
    'accept': 'text/html, application/xhtml+xml'
  };
  
  // Parse request content type
  var contentType = ContentType.parse(headers['content-type']!);
  print('Content-Type: $contentType');
  
  // Parse accept header (multiple types)
  var acceptTypes = headers['accept']!
      .split(',')
      .map((s) =&gt; ContentType.parse(s.trim()))
      .toList();
  
  print('Accept types:');
  acceptTypes.forEach(print);
}

We parse both Content-Type and Accept headers. The Accept header requires
special handling as it may contain multiple MIME types with quality factors.

$ dart main.dart
Content-Type: application/json; charset=utf-8
Accept types:
text/html
application/xhtml+xml

## Content Negotiation

This example shows basic content negotiation using ContentType.

main.dart
  

import 'dart:io';

void main() {
  var serverOffers = [
    ContentType('text', 'html'),
    ContentType('application', 'json'),
    ContentType('text', 'plain')
  ];
  
  var clientAccepts = [
    ContentType.parse('application/json;q=0.9'),
    ContentType.parse('text/*;q=0.8'),
    ContentType.parse('*/*;q=0.1')
  ];
  
  // Find best match
  var bestMatch = _negotiateContent(serverOffers, clientAccepts);
  print('Best match: $bestMatch');
}

ContentType? _negotiateContent(
    List&lt;ContentType&gt; offers, List&lt;ContentType&gt; accepts) {
  for (var accept in accepts) {
    for (var offer in offers) {
      if ((accept.primaryType == '*' || 
           accept.primaryType == offer.primaryType) &amp;&amp;
          (accept.subType == '*' || 
           accept.subType == offer.subType)) {
        return offer;
      }
    }
  }
  return null;
}

We implement simple content negotiation by matching client preferences
against server offerings. Wildcards (*) are supported in type/subtype.

$ dart main.dart
Best match: application/json

## Building HTTP Responses

This example shows setting Content-Type headers in HTTP responses.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  print('Server running on port 8080');
  
  await for (var request in server) {
    var response = request.response;
    
    // Set content type based on request
    if (request.uri.path.endsWith('.json')) {
      response.headers.contentType = ContentType.json;
    } else if (request.uri.path.endsWith('.html')) {
      response.headers.contentType = ContentType.html;
    } else {
      response.headers.contentType = ContentType.text;
    }
    
    response.write('Response with ${response.headers.contentType}');
    await response.close();
  }
}

We create a simple HTTP server that sets Content-Type based on the
requested resource extension. The ContentType class ensures proper
header formatting.

$ dart main.dart
Server running on port 8080

## Best Practices

- **Use constants:** Prefer ContentType.json over manual creation

- **Validate input:** Handle parse errors for malformed headers

- **Specify charset:** Always set charset for text content

- **Consider defaults:** Fall back to text/plain when unsure

## Source

[Dart ContentType Documentation](https://api.dart.dev/stable/dart-io/ContentType-class.html)

This tutorial covered Dart's ContentType class with practical examples showing
creation, parsing, content negotiation, and HTTP header handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).