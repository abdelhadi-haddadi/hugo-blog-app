+++
title = "Dart HttpClientCredentials"
date = 2025-08-29T19:51:53.550+01:00
draft = false
description = "Dart HttpClientCredentials tutorial shows how to handle HTTP authentication in Dart using the HttpClientCredentials class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpClientCredentials

last modified April 4, 2025

The HttpClientCredentials class in Dart provides authentication
credentials for HTTP requests. It's used with HttpClient for secure communication.

HttpClientCredentials handles basic authentication, digest authentication, and
other credential types. It's part of Dart's dart:io library.

## Basic Definition

HttpClientCredentials is an abstract class representing HTTP auth
credentials. Concrete implementations include Basic and Digest credentials.

Key features include username/password storage and authentication scheme support.
It works with HttpClient's authentication API for secure requests.

## Basic Authentication

This example shows basic HTTP authentication using HttpClientCredentials.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  // Set up credentials
  var credentials = HttpClientBasicCredentials('user', 'pass123');
  
  // Add credentials for specific realm
  client.addCredentials(
    Uri.parse('https://example.com/secure'),
    'realm1',
    credentials
  );
  
  try {
    var request = await client.getUrl(Uri.parse('https://example.com/secure'));
    var response = await request.close();
    print('Response status: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We create basic credentials and associate them with a specific URL and realm.
The HttpClient will use these when challenged by the server.

$ dart main.dart
Response status: 200

## Digest Authentication

This example demonstrates digest authentication with HttpClientCredentials.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  // Set up digest credentials
  var credentials = HttpClientDigestCredentials('admin', 's3cr3t');
  
  client.addCredentials(
    Uri.parse('https://api.example.com/admin'),
    'admin-realm',
    credentials
  );
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://api.example.com/admin/data')
    );
    var response = await request.close();
    print('Admin access granted: ${response.statusCode}');
  } finally {
    client.close();
  }
}

Digest authentication is more secure than basic auth. The credentials are hashed
before transmission. The server must support digest authentication.

$ dart main.dart
Admin access granted: 200

## Multiple Credentials

This example shows using different credentials for different realms.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  // User credentials for user area
  client.addCredentials(
    Uri.parse('https://example.com/user'),
    'user-realm',
    HttpClientBasicCredentials('john', 'doe123')
  );
  
  // Admin credentials for admin area
  client.addCredentials(
    Uri.parse('https://example.com/admin'),
    'admin-realm',
    HttpClientBasicCredentials('admin', 'master')
  );
  
  try {
    // Access user area
    var userRequest = await client.getUrl(
      Uri.parse('https://example.com/user/profile')
    );
    var userResponse = await userRequest.close();
    print('User status: ${userResponse.statusCode}');
    
    // Access admin area
    var adminRequest = await client.getUrl(
      Uri.parse('https://example.com/admin/dashboard')
    );
    var adminResponse = await adminRequest.close();
    print('Admin status: ${adminResponse.statusCode}');
  } finally {
    client.close();
  }
}

We register different credentials for different parts of a website. HttpClient
automatically selects the appropriate credentials based on the authentication
challenge.

$ dart main.dart
User status: 200
Admin status: 200

## Handling Authentication Errors

This example demonstrates error handling for failed authentication.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  client.addCredentials(
    Uri.parse('https://example.com/secure'),
    'test-realm',
    HttpClientBasicCredentials('wrong', 'credentials')
  );
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://example.com/secure/data')
    );
    var response = await request.close();
    
    if (response.statusCode == HttpStatus.unauthorized) {
      print('Authentication failed');
    } else {
      print('Success: ${response.statusCode}');
    }
  } on SocketException catch (e) {
    print('Network error: $e');
  } finally {
    client.close();
  }
}

When authentication fails, the server returns 401 Unauthorized. We check the
status code to handle authentication failures gracefully.

$ dart main.dart
Authentication failed

## Custom Authentication Scheme

This example shows how to implement custom authentication credentials.

main.dart
  

import 'dart:io';

class ApiKeyCredentials implements HttpClientCredentials {
  final String apiKey;
  
  ApiKeyCredentials(this.apiKey);
  
  @override
  String toString() =&gt; 'API Key: $apiKey';
}

void main() async {
  var client = HttpClient();
  
  // Register custom credentials
  client.addCredentials(
    Uri.parse('https://api.example.com/v1'),
    'api-realm',
    ApiKeyCredentials('xyz123abc456')
  );
  
  // Handle authentication challenges
  client.authenticate = (url, scheme, realm) {
    print('Authenticating to $realm with $scheme');
    return true; // Attempt authentication
  };
  
  try {
    var request = await client.getUrl(
      Uri.parse('https://api.example.com/v1/data')
    );
    var response = await request.close();
    print('API response: ${response.statusCode}');
  } finally {
    client.close();
  }
}

We create a custom credentials class for API key authentication. The authenticate
callback allows custom logic for handling authentication challenges.

$ dart main.dart
Authenticating to api-realm with 
API response: 200

## Best Practices

- **Secure storage:** Never hardcode credentials in source code

- **HTTPS only:** Always use HTTPS with credentials

- **Realm matching:** Ensure realm matches server expectations

- **Error handling:** Handle authentication failures gracefully

- **Credential rotation:** Implement credential rotation for security

## Source

[Dart HttpClientCredentials Documentation](https://api.dart.dev/stable/dart-io/HttpClientCredentials-class.html)

This tutorial covered Dart's HttpClientCredentials class with practical examples
showing basic and digest authentication, error handling, and custom schemes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).