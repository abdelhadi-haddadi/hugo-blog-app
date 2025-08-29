+++
title = "Dart HttpClientDigestCredentials"
date = 2025-08-29T19:51:54.649+01:00
draft = false
description = "Dart HttpClientDigestCredentials tutorial shows how to handle HTTP digest authentication in Dart using the HttpClientDigestCredentials class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClientDigestCredentials

last modified April 4, 2025

The HttpClientDigestCredentials class in Dart provides support for
HTTP digest authentication. It's part of Dart's dart:io library.

Digest authentication is more secure than basic authentication as it doesn't
send passwords in clear text. It uses a challenge-response mechanism.

## Basic Definition

HttpClientDigestCredentials handles the digest authentication
protocol. It stores username and password for generating proper responses.

Key features include automatic challenge handling, nonce management, and
proper header generation. It works with Dart's HttpClient class.

## Basic Digest Authentication

This example shows basic usage of HttpClientDigestCredentials.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var credentials = HttpClientDigestCredentials('user', 'password');
  
  client.addCredentials(
    Uri.parse('http://example.com/protected'),
    'admin',
    credentials
  );
  
  try {
    var request = await client.getUrl(
      Uri.parse('http://example.com/protected')
    );
    var response = await request.close();
    print('Status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We create HttpClientDigestCredentials with username and password. The
credentials are added to the client for a specific URI and realm.

$ dart main.dart
Status: 200

## Handling Multiple Requests

This example shows how credentials work across multiple requests.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var credentials = HttpClientDigestCredentials('user', 'password');
  
  client.addCredentials(
    Uri.parse('http://example.com/'),
    'admin',
    credentials
  );
  
  for (var i = 0; i &lt; 3; i++) {
    try {
      var request = await client.getUrl(
        Uri.parse('http://example.com/protected')
      );
      var response = await request.close();
      print('Request ${i+1}: ${response.statusCode}');
    } catch (e) {
      print('Error: $e');
    }
  }
  
  client.close();
}

The same credentials are reused for multiple requests to the same realm.
The client handles the authentication flow automatically.

$ dart main.dart
Request 1: 200
Request 2: 200
Request 3: 200

## Handling Authentication Failure

This example demonstrates handling invalid credentials.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var credentials = HttpClientDigestCredentials('wrong', 'credentials');
  
  client.addCredentials(
    Uri.parse('http://example.com/protected'),
    'admin',
    credentials
  );
  
  try {
    var request = await client.getUrl(
      Uri.parse('http://example.com/protected')
    );
    var response = await request.close();
    print('Status: ${response.statusCode}');
  } on HttpClientException catch (e) {
    print('Authentication failed: ${e.message}');
  } finally {
    client.close();
  }
}

When credentials are invalid, an HttpClientException is thrown. We catch
and handle this exception appropriately.

$ dart main.dart
Authentication failed: HTTP authentication failed

## Custom Authentication Realm

This example shows how to specify a custom authentication realm.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var credentials = HttpClientDigestCredentials('user', 'password');
  
  // Add credentials for specific realm
  client.addCredentials(
    Uri.parse('http://example.com/'),
    'private_area',
    credentials
  );
  
  try {
    var request = await client.getUrl(
      Uri.parse('http://example.com/secure')
    );
    var response = await request.close();
    print('Status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

The realm parameter specifies which protected area the credentials are
for. Different realms can have different credentials.

$ dart main.dart
Status: 200

## Using with HttpClientRequest

This example shows direct usage with HttpClientRequest.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var credentials = HttpClientDigestCredentials('user', 'password');
  
  try {
    var request = await client.getUrl(
      Uri.parse('http://example.com/protected')
    );
    
    // Manually apply credentials
    var authHeaders = await credentials.getAuthHeaders(
      request.uri, 
      request.method,
      request.headers
    );
    
    authHeaders.forEach((name, value) {
      request.headers.set(name, value);
    });
    
    var response = await request.close();
    print('Status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We manually apply digest authentication headers to the request. This gives
more control over the authentication process.

$ dart main.dart
Status: 200

## Best Practices

- **Secure storage:** Never hardcode credentials in source code

- **Error handling:** Always handle authentication failures

- **Reuse clients:** Reuse HttpClient instances when possible

- **Realm matching:** Ensure realm matches server configuration

## Source

[Dart HttpClientDigestCredentials Documentation](https://api.dart.dev/stable/dart-io/HttpClientDigestCredentials-class.html)

This tutorial covered Dart's HttpClientDigestCredentials class with practical
examples showing basic usage, error handling, and advanced configuration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).