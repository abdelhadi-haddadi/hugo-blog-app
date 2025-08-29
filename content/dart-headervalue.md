+++
title = "Dart HeaderValue"
date = 2025-08-29T19:51:52.439+01:00
draft = false
description = "Dart HeaderValue tutorial shows how to parse and manipulate HTTP header values in Dart using the HeaderValue class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HeaderValue

last modified April 4, 2025

The HeaderValue class in Dart provides tools for parsing and
manipulating HTTP header values. It handles both simple values and complex
parameters commonly found in headers.

HeaderValue can parse values with parameters, quality factors, and other
metadata. It's part of Dart's dart:io library for HTTP
communication.

## Basic Definition

HeaderValue represents an HTTP header value, which may include
a primary value and optional parameters. It parses strings like
"text/html; charset=utf-8".

Key components include the value itself and a parameters map. The class
provides parsing, construction, and manipulation methods for header values.

## Basic HeaderValue Parsing

This example shows basic parsing of a Content-Type header value.

main.dart
  

import 'dart:io';

void main() {
  var header = 'text/html; charset=utf-8';
  var parsed = HeaderValue.parse(header);
  
  print('Value: ${parsed.value}');
  print('Charset: ${parsed.parameters['charset']}');
}

We parse a Content-Type header string into a HeaderValue object. The value
property contains "text/html" and parameters contains "charset=utf-8".

$ dart main.dart
Value: text/html
Charset: utf-8

## Handling Quality Values

This example demonstrates parsing Accept header with quality values.

main.dart
  

import 'dart:io';

void main() {
  var accept = 'text/html,application/xhtml+xml;q=0.9,image/webp;q=0.8';
  var values = accept.split(',').map((s) =&gt; HeaderValue.parse(s.trim()));
  
  for (var value in values) {
    print('Type: ${value.value}, Quality: ${value.parameters['q'] ?? '1.0'}');
  }
}

We parse an Accept header with multiple media types and quality factors.
The q parameter indicates preference, with higher values being preferred.

$ dart main.dart
Type: text/html, Quality: 1.0
Type: application/xhtml+xml, Quality: 0.9
Type: image/webp, Quality: 0.8

## Creating Header Values

This example shows how to construct HeaderValue objects programmatically.

main.dart
  

import 'dart:io';

void main() {
  var contentType = HeaderValue('application/json', {'charset': 'utf-8'});
  print(contentType.toString());
  
  var cacheControl = HeaderValue('no-cache', {'max-age': '0'});
  print(cacheControl.toString());
}

We create HeaderValue instances with both primary values and parameters.
The toString() method formats them correctly for HTTP headers.

$ dart main.dart
application/json; charset=utf-8
no-cache; max-age=0

## Parsing Complex Headers

This example handles a complex Set-Cookie header with multiple parameters.

main.dart
  

import 'dart:io';

void main() {
  var cookie = 'sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Lax';
  var parsed = HeaderValue.parse(cookie, parameterSeparator: ';');
  
  print('Cookie value: ${parsed.value}');
  print('Parameters:');
  parsed.parameters.forEach((key, value) {
    print('  $key: ${value.isEmpty ? "(flag)" : value}');
  });
}

We parse a Set-Cookie header with special handling for semicolon separators.
Flags without values (like HttpOnly) appear as empty parameters.

$ dart main.dart
Cookie value: sessionId=abc123
Parameters:
  Path: /
  HttpOnly: (flag)
  Secure: (flag)
  SameSite: Lax

## Handling Multiple Values

This example processes multiple values in a single header field.

main.dart
  

import 'dart:io';

void main() {
  var vary = 'Accept-Encoding, User-Agent, Accept-Language';
  var values = vary.split(',').map((s) =&gt; s.trim());
  
  print('Vary header values:');
  for (var value in values) {
    print('- $value');
  }
  
  // For headers that might have parameters on each value
  var link = '; rel=preload; as=style, ; rel=preload';
  var linkValues = link.split(',').map((s) =&gt; HeaderValue.parse(s.trim()));
  
  print('\nLink header values:');
  for (var value in linkValues) {
    print('Resource: ${value.value}');
    print('  rel: ${value.parameters['rel']}');
    if (value.parameters['as'] != null) {
      print('  as: ${value.parameters['as']}');
    }
  }
}

We handle headers containing multiple values, both simple and with parameters.
The Link header example shows complex multi-value parsing.

$ dart main.dart
Vary header values:
- Accept-Encoding
- User-Agent
- Accept-Language

Link header values:
Resource: 
  rel: preload
  as: style
Resource: 
  rel: preload

## Best Practices

- **Case sensitivity:** HTTP headers are case-insensitive

- **Parameter handling:** Always check for null parameters

- **Special characters:** Handle quoted values properly

- **Edge cases:** Account for malformed headers

- **Performance:** Reuse parsed values when possible

## Source

[Dart HeaderValue Documentation](https://api.dart.dev/stable/dart-io/HeaderValue-class.html)

This tutorial covered Dart's HeaderValue class with practical examples showing
HTTP header parsing, construction, and manipulation for various use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).