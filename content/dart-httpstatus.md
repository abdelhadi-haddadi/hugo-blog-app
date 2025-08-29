+++
title = "Dart HttpStatus"
date = 2025-08-29T19:51:58.059+01:00
draft = false
description = "Dart HttpStatus tutorial shows how to work with HTTP status codes in Dart using the HttpStatus class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpStatus

last modified April 4, 2025

The HttpStatus class in Dart provides constants for HTTP status
codes. It's part of the dart:io library and essential for web
development and HTTP communication.

HttpStatus contains numeric constants for all standard HTTP status codes.
These codes indicate success, failure, or other conditions in HTTP responses.

## Basic Definition

HttpStatus is a utility class containing static integer constants.
Each constant represents a standard HTTP status code with a descriptive name.

The class covers all status codes from informational (1xx) to server errors
(5xx). Using these constants improves code readability and maintainability.

## Checking Success Status

This example demonstrates checking if an HTTP response indicates success.

main.dart
  

import 'dart:io';

void main() {
  int statusCode = 200;
  
  if (statusCode &gt;= HttpStatus.ok &amp;&amp; 
      statusCode &lt; HttpStatus.multipleChoices) {
    print('Request succeeded');
  } else {
    print('Request failed');
  }
  
  print('OK status code: ${HttpStatus.ok}');
}

We check if the status code falls in the success range (200-299). The
HttpStatus.ok constant represents 200, the standard success code.

$ dart main.dart
Request succeeded
OK status code: 200

## Handling Redirects

This example shows how to identify different types of redirect responses.

main.dart
  

import 'dart:io';

void handleRedirect(int statusCode) {
  switch (statusCode) {
    case HttpStatus.movedPermanently:
      print('301 - Moved Permanently');
      break;
    case HttpStatus.found:
      print('302 - Found');
      break;
    case HttpStatus.seeOther:
      print('303 - See Other');
      break;
    case HttpStatus.temporaryRedirect:
      print('307 - Temporary Redirect');
      break;
    case HttpStatus.permanentRedirect:
      print('308 - Permanent Redirect');
      break;
    default:
      print('Not a redirect');
  }
}

void main() {
  handleRedirect(HttpStatus.movedPermanently);
  handleRedirect(HttpStatus.temporaryRedirect);
}

We use HttpStatus constants to identify specific redirect types. Each redirect
has different implications for how clients should handle it.

$ dart main.dart
301 - Moved Permanently
307 - Temporary Redirect

## Error Handling

This example demonstrates handling different HTTP error statuses.

main.dart
  

import 'dart:io';

String getErrorMessage(int statusCode) {
  if (statusCode == HttpStatus.badRequest) {
    return '400 - Bad Request';
  } else if (statusCode == HttpStatus.unauthorized) {
    return '401 - Unauthorized';
  } else if (statusCode == HttpStatus.forbidden) {
    return '403 - Forbidden';
  } else if (statusCode == HttpStatus.notFound) {
    return '404 - Not Found';
  } else if (statusCode &gt;= HttpStatus.internalServerError) {
    return '5xx - Server Error';
  } else {
    return 'Unknown error';
  }
}

void main() {
  print(getErrorMessage(HttpStatus.notFound));
  print(getErrorMessage(HttpStatus.internalServerError));
}

We use HttpStatus constants to identify specific client and server errors.
The function returns appropriate error messages based on the status code.

$ dart main.dart
404 - Not Found
5xx - Server Error

## Creating HTTP Responses

This example shows using HttpStatus when creating HTTP server responses.

main.dart
  

import 'dart:io';

void handleRequest(HttpRequest request) {
  try {
    // Process request
    request.response.statusCode = HttpStatus.ok;
    request.response.write('Success');
  } catch (e) {
    request.response.statusCode = HttpStatus.internalServerError;
    request.response.write('Error: $e');
  } finally {
    request.response.close();
  }
}

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  print('Server running on port 8080');
  
  await for (var request in server) {
    handleRequest(request);
  }
}

We set appropriate status codes in HTTP responses using HttpStatus constants.
This ensures standard compliance and better client handling of responses.

$ dart main.dart
Server running on port 8080

## Validating Status Codes

This example demonstrates validating HTTP status code ranges.

main.dart
  

import 'dart:io';

String getStatusCategory(int statusCode) {
  if (statusCode &lt; HttpStatus.continue_ || statusCode &gt; 599) {
    return 'Invalid status code';
  } else if (statusCode &lt; HttpStatus.ok) {
    return 'Informational';
  } else if (statusCode &lt; HttpStatus.multipleChoices) {
    return 'Success';
  } else if (statusCode &lt; HttpStatus.badRequest) {
    return 'Redirection';
  } else if (statusCode &lt; HttpStatus.internalServerError) {
    return 'Client Error';
  } else {
    return 'Server Error';
  }
}

void main() {
  print('200: ${getStatusCategory(200)}');
  print('404: ${getStatusCategory(404)}');
  print('500: ${getStatusCategory(500)}');
}

We categorize status codes into standard HTTP ranges using HttpStatus constants.
The function helps understand the general meaning of any valid status code.

$ dart main.dart
200: Success
404: Client Error
500: Server Error

## Best Practices

- **Use constants:** Always prefer HttpStatus over magic numbers

- **Range checks:** Validate codes against standard ranges

- **Document:** Include status code meanings in documentation

- **Error handling:** Provide appropriate responses for each code

## Source

[Dart HttpStatus Documentation](https://api.dart.dev/stable/dart-io/HttpStatus-class.html)

This tutorial covered Dart's HttpStatus class with practical examples showing
status code handling, validation, and HTTP server response creation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).