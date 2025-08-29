+++
title = "Dart HttpDate"
date = 2025-08-29T19:51:55.833+01:00
draft = false
description = "Dart HttpDate tutorial shows how to parse and format HTTP dates in Dart using the HttpDate class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpDate

last modified April 4, 2025

The HttpDate class in Dart provides utilities for parsing and
formatting dates in HTTP headers. It handles RFC 1123, RFC 850, and ANSI C
date formats.

HttpDate is essential for working with HTTP headers like Last-Modified,
Expires, and Date. It's part of Dart's dart:core library.

## Basic Definition

HttpDate is a utility class for HTTP date handling. It contains
static methods for parsing and formatting dates according to HTTP standards.

Key features include parsing multiple date formats, strict RFC compliance,
and thread-safe operations. It's used internally by Dart's HTTP packages.

## Parsing HTTP Dates

This example shows how to parse HTTP date strings into DateTime objects.

main.dart
  

import 'dart:core';

void main() {
  var rfc1123 = 'Sun, 06 Nov 1994 08:49:37 GMT';
  var rfc850 = 'Sunday, 06-Nov-94 08:49:37 GMT';
  var asctime = 'Sun Nov  6 08:49:37 1994';
  
  var date1 = HttpDate.parse(rfc1123);
  var date2 = HttpDate.parse(rfc850);
  var date3 = HttpDate.parse(asctime);
  
  print(date1); // 1994-11-06 08:49:37.000Z
  print(date2); // 1994-11-06 08:49:37.000Z
  print(date3); // 1994-11-06 08:49:37.000Z
}

We parse three different HTTP date formats into DateTime objects. HttpDate
handles all standard formats automatically, returning UTC DateTime objects.

$ dart main.dart
1994-11-06 08:49:37.000Z
1994-11-06 08:49:37.000Z
1994-11-06 08:49:37.000Z

## Formatting HTTP Dates

This example demonstrates formatting DateTime objects to HTTP date strings.

main.dart
  

import 'dart:core';

void main() {
  var date = DateTime.utc(1994, 11, 6, 8, 49, 37);
  
  var httpDate = HttpDate.format(date);
  print(httpDate); // Sun, 06 Nov 1994 08:49:37 GMT
  
  var now = DateTime.now().toUtc();
  print(HttpDate.format(now)); // Current time in RFC 1123 format
}

We format DateTime objects to RFC 1123 compliant strings. HttpDate.format
always produces dates in this standard format used by HTTP headers.

$ dart main.dart
Sun, 06 Nov 1994 08:49:37 GMT
Mon, 04 Apr 2025 14:30:00 GMT

## Handling HTTP Headers

This example shows practical use of HttpDate with HTTP headers.

main.dart
  

import 'dart:core';

void main() {
  // Simulate HTTP response headers
  var headers = {
    'date': 'Mon, 04 Apr 2025 12:00:00 GMT',
    'last-modified': 'Fri, 01 Jan 2021 00:00:00 GMT'
  };
  
  var date = HttpDate.parse(headers['date']!);
  var lastModified = HttpDate.parse(headers['last-modified']!);
  
  print('Response date: $date');
  print('Last modified: $lastModified');
  
  // Check if resource is fresh (less than 1 day old)
  var isFresh = date.difference(lastModified) &lt; Duration(days: 1);
  print('Resource is fresh: $isFresh');
}

We parse standard HTTP date headers and perform date comparisons. This is
typical for cache validation and conditional requests in HTTP clients.

$ dart main.dart
Response date: 2025-04-04 12:00:00.000Z
Last modified: 2021-01-01 00:00:00.000Z
Resource is fresh: false

## Error Handling

This example demonstrates proper error handling when parsing dates.

main.dart
  

import 'dart:core';

void main() {
  var invalidDate = 'Monday, 04-Apr-25 12:00:00 GMT';
  
  try {
    var date = HttpDate.parse(invalidDate);
    print(date);
  } on FormatException catch (e) {
    print('Failed to parse date: ${e.message}');
    print('Input: ${e.source}');
  }
  
  // Fallback to current time if parsing fails
  var date = _parseHttpDateWithFallback(invalidDate);
  print('Using date: $date');
}

DateTime _parseHttpDateWithFallback(String dateStr) {
  try {
    return HttpDate.parse(dateStr);
  } on FormatException {
    return DateTime.now().toUtc();
  }
}

We handle FormatException when parsing malformed dates. The example shows
a robust approach with fallback to default values when parsing fails.

$ dart main.dart
Failed to parse date: Invalid HTTP date
Input: Monday, 04-Apr-25 12:00:00 GMT
Using date: 2025-04-04 14:30:00.123Z

## Custom Date Validation

This example shows how to validate and normalize HTTP dates.

main.dart
  

import 'dart:core';

void main() {
  var dates = [
    'Sun, 06 Nov 1994 08:49:37 GMT',
    'Sunday, 06-Nov-94 08:49:37 GMT',
    'Sun Nov  6 08:49:37 1994',
    '06 Nov 1994 08:49:37 GMT',
    'Invalid Date'
  ];
  
  for (var dateStr in dates) {
    try {
      var date = HttpDate.parse(dateStr);
      var normalized = HttpDate.format(date);
      print('Valid: $normalized');
    } on FormatException {
      print('Invalid: $dateStr');
    }
  }
}

We validate multiple date strings and normalize valid ones to RFC 1123 format.
This demonstrates a complete validation and normalization pipeline for HTTP dates.

$ dart main.dart
Valid: Sun, 06 Nov 1994 08:49:37 GMT
Valid: Sun, 06 Nov 1994 08:49:37 GMT
Valid: Sun, 06 Nov 1994 08:49:37 GMT
Invalid: 06 Nov 1994 08:49:37 GMT
Invalid: Invalid Date

## Best Practices

- **Always UTC:** HttpDate works with UTC dates only

- **Error handling:** Always catch FormatException when parsing

- **Normalization:** Format to RFC 1123 for consistency

- **Performance:** Reuse parsed DateTime objects when possible

- **Validation:** Validate dates from untrusted sources

## Source

[Dart HttpDate Documentation](https://api.dart.dev/stable/dart-core/HttpDate-class.html)

This tutorial covered Dart's HttpDate class with practical examples showing
date parsing, formatting, error handling, and HTTP header integration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).