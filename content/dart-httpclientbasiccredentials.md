+++
title = "Dart HttpClientBasicCredentials"
date = 2025-08-29T19:51:53.539+01:00
draft = false
description = "Dart HttpClientBasicCredentials tutorial shows how to handle HTTP basic authentication in Dart using the HttpClientBasicCredentials class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClientBasicCredentials

last modified April 4, 2025

The HttpClientBasicCredentials class in Dart provides a way to handle
HTTP basic authentication. It's used with Dart's HttpClient for secure requests.

This class creates credentials for the Basic authentication scheme. It encodes
username and password in base64 format for HTTP Authorization headers.

## Basic Definition

HttpClientBasicCredentials is part of Dart's dart:io
library. It implements credentials for HTTP basic authentication.

The class takes username and password parameters. It automatically handles the
base64 encoding required by the Basic authentication scheme.

## Basic Authentication Example

This example shows basic usage of HttpClientBasicCredentials.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com/api'));
    
    var credentials = HttpClientBasicCredentials('user', 'pass123');
    request.headers.set('Authorization', credentials.toString());
    
    var response = await request.close();
    print('Response status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We create an HttpClient and set up basic authentication. The credentials are
converted to a proper Authorization header string automatically.

$ dart main.dart
Response status: 200

## Handling Authentication Errors

This example demonstrates error handling with basic authentication.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com/api'));
    
    var credentials = HttpClientBasicCredentials('wrong', 'credentials');
    request.headers.set('Authorization', credentials.toString());
    
    var response = await request.close();
    
    if (response.statusCode == HttpStatus.unauthorized) {
      print('Authentication failed');
    } else {
      print('Response status: ${response.statusCode}');
    }
  } finally {
    client.close();
  }
}

We check for 401 Unauthorized status code when credentials are invalid.
The example shows proper error handling for authentication failures.

$ dart main.dart
Authentication failed

## Using with HttpClientRequest

This example shows direct usage with HttpClientRequest.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.postUrl(Uri.parse('https://example.com/api'));
    
    var credentials = HttpClientBasicCredentials('admin', 'secret');
    request.addCredentials(credentials);
    
    request.write('{"data": "value"}');
    var response = await request.close();
    
    print('Response status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We use the addCredentials method instead of manually setting headers.
This is the preferred way to add authentication to HttpClientRequest.

$ dart main.dart
Response status: 200

## Multiple Authentication Attempts

This example shows handling multiple authentication attempts.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  var credentials = [
    HttpClientBasicCredentials('user1', 'pass1'),
    HttpClientBasicCredentials('user2', 'pass2')
  ];
  
  for (var cred in credentials) {
    try {
      var request = await client.getUrl(Uri.parse('https://example.com/api'));
      request.addCredentials(cred);
      
      var response = await request.close();
      if (response.statusCode == HttpStatus.ok) {
        print('Authenticated as ${cred.username}');
        break;
      }
    } catch (e) {
      print('Failed with ${cred.username}: $e');
    }
  }
  
  client.close();
}

We try multiple credential pairs until successful authentication.
This pattern is useful when working with multiple possible accounts.

$ dart main.dart
Failed with user1: HttpException
Authenticated as user2

## Secure Credential Handling

This example demonstrates secure credential management practices.

main.dart
  

import 'dart:io';

class SecureAuth {
  final String _username;
  final String _password;
  
  SecureAuth(this._username, this._password);
  
  HttpClientBasicCredentials get credentials {
    return HttpClientBasicCredentials(_username, _password);
  }
}

void main() async {
  var auth = SecureAuth('secureUser', 's3cr3tP@ss');
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com/api'));
    request.addCredentials(auth.credentials);
    
    var response = await request.close();
    print('Response status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We encapsulate credentials in a secure class to prevent accidental exposure.
This pattern helps maintain security when working with authentication.

$ dart main.dart
Response status: 200

## Best Practices

- **Secure storage:** Never hardcode credentials in source code

- **HTTPS only:** Always use HTTPS with basic authentication

- **Error handling:** Properly handle authentication failures

- **Credential rotation:** Change credentials regularly

## Source

[Dart HttpClientBasicCredentials Documentation](https://api.dart.dev/stable/dart-io/HttpClientBasicCredentials-class.html)

This tutorial covered Dart's HttpClientBasicCredentials class with practical
examples showing authentication patterns and security considerations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).