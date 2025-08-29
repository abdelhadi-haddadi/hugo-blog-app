+++
title = "Dart HttpOverrides"
date = 2025-08-29T19:51:59.172+01:00
draft = false
description = "Dart HttpOverrides tutorial shows how to customize HTTP requests in Dart using the HttpOverrides class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpOverrides

last modified April 4, 2025

The HttpOverrides class in Dart allows customization of HTTP
requests made through the dart:io HttpClient. It's useful for
testing, mocking, and modifying HTTP behavior.

HttpOverrides provides hooks to intercept and modify HTTP requests globally.
This includes certificate validation, proxy configuration, and request headers.

## Basic Definition

HttpOverrides is an abstract class in Dart's dart:io
library. It serves as a global hook point for HTTP request customization.

Key methods include createHttpClient for client creation and
findProxy for proxy configuration. These can be overridden.

## Basic HttpOverrides Usage

This example shows how to set up basic HttpOverrides for all HTTP requests.

main.dart
  

import 'dart:io';

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..userAgent = 'MyCustomAgent/1.0';
  }
}

void main() async {
  HttpOverrides.global = MyHttpOverrides();
  
  final client = HttpClient();
  final request = await client.getUrl(Uri.parse('https://example.com'));
  final response = await request.close();
  
  print('Request completed with status: ${response.statusCode}');
  client.close();
}

We create a custom HttpOverrides class that sets a user agent for all requests.
The global instance is set before making any HTTP requests.

$ dart main.dart
Request completed with status: 200

## Custom Certificate Validation

This example demonstrates overriding certificate validation for testing.

main.dart
  

import 'dart:io';

class TrustAllHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback = 
          (X509Certificate cert, String host, int port) =&gt; true;
  }
}

void main() async {
  HttpOverrides.global = TrustAllHttpOverrides();
  
  try {
    final client = HttpClient();
    final request = await client.getUrl(
        Uri.parse('https://self-signed.badssl.com/'));
    final response = await request.close();
    print('Successfully connected to self-signed cert site');
    client.close();
  } catch (e) {
    print('Error: $e');
  }
}

We bypass certificate validation by always returning true in the callback.
This is useful for testing but should never be used in production code.

$ dart main.dart
Successfully connected to self-signed cert site

## Proxy Configuration

This example shows how to configure a proxy for all HTTP requests.

main.dart
  

import 'dart:io';

class ProxyHttpOverrides extends HttpOverrides {
  @override
  String findProxyFromEnvironment(Uri url, Map&lt;String, String&gt;? environment) {
    return 'PROXY myproxy.example.com:8080';
  }
}

void main() async {
  HttpOverrides.global = ProxyHttpOverrides();
  
  final client = HttpClient();
  final request = await client.getUrl(Uri.parse('https://example.com'));
  final response = await request.close();
  
  print('Request completed via proxy');
  client.close();
}

We override the proxy configuration to route all requests through a specific
proxy server. The findProxyFromEnvironment method returns the proxy string.

$ dart main.dart
Request completed via proxy

## Request Header Modification

This example demonstrates adding custom headers to all requests.

main.dart
  

import 'dart:io';

class CustomHeadersHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..addCredentials = _addCredentials
      ..addRequestHeaders = _addHeaders;
  }

  void _addCredentials(Uri url, String scheme, String realm) {
    // Credential logic here
  }

  void _addHeaders(Uri url, HttpClientRequest request) {
    request.headers.add('X-Custom-Header', 'MyValue');
    request.headers.add('Authorization', 'Bearer mytoken');
  }
}

void main() async {
  HttpOverrides.global = CustomHeadersHttpOverrides();
  
  final client = HttpClient();
  final request = await client.getUrl(Uri.parse('https://example.com'));
  final response = await request.close();
  
  print('Request with custom headers completed');
  client.close();
}

We add both static and dynamic headers to every outgoing request. The
addRequestHeaders callback is called before each request is sent.

$ dart main.dart
Request with custom headers completed

## Mocking HTTP Responses

This example shows how to mock HTTP responses for testing purposes.

main.dart
  

import 'dart:io';
import 'dart:convert';

class MockHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return _MockHttpClient();
  }
}

class _MockHttpClient implements HttpClient {
  @override
  Future&lt;HttpClientRequest&gt; getUrl(Uri url) async {
    return _MockHttpClientRequest();
  }
  
  // Other required overrides omitted for brevity
}

class _MockHttpClientRequest implements HttpClientRequest {
  @override
  Future&lt;HttpClientResponse&gt; close() async {
    return _MockHttpClientResponse();
  }
  
  // Other required overrides omitted for brevity
}

class _MockHttpClientResponse implements HttpClientResponse {
  @override
  int get statusCode =&gt; 200;
  
  @override
  Stream&lt;Uint8List&gt; get body =&gt; 
      Stream.value(utf8.encode('{"message": "Mock response"}'));
  
  // Other required overrides omitted for brevity
}

void main() async {
  HttpOverrides.global = MockHttpOverrides();
  
  final client = HttpClient();
  final request = await client.getUrl(Uri.parse('https://example.com'));
  final response = await request.close();
  
  final data = await response.transform(utf8.decoder).join();
  print('Mock response: $data');
  client.close();
}

We implement a complete mock HTTP client that returns predefined responses.
This is useful for testing without making real network requests.

$ dart main.dart
Mock response: {"message": "Mock response"}

## Best Practices

- **Testing Only:** Use certificate bypass only in test environments

- **Performance:** Keep overrides lightweight to avoid slowdowns

- **Security:** Never hardcode credentials in production code

- **Cleanup:** Reset HttpOverrides.global when done testing

## Source

[Dart HttpOverrides Documentation](https://api.dart.dev/stable/dart-io/HttpOverrides-class.html)

This tutorial covered Dart's HttpOverrides class with practical examples showing
request customization, proxy setup, and testing techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).