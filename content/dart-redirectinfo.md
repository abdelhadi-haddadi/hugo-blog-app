+++
title = "Dart RedirectInfo"
date = 2025-08-29T19:52:19.520+01:00
draft = false
description = "Dart RedirectInfo tutorial shows how to handle HTTP redirects in Dart using the RedirectInfo class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart RedirectInfo

last modified April 4, 2025

The RedirectInfo class in Dart provides information about HTTP
redirects that occur during network requests. It's part of Dart's
dart:io library for server-side and command-line applications.

RedirectInfo contains details about redirect responses including status code,
location, and method. It helps track and analyze redirect chains in HTTP
communication.

## Basic Definition

RedirectInfo is an immutable class representing a single HTTP
redirect. It's typically obtained from HttpClientResponse redirects.

Key properties include statusCode, method, and location. These help understand
and process redirects in HTTP clients and servers.

## Basic RedirectInfo Usage

This example shows how to access RedirectInfo from an HTTP client response.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('http://example.org'));
    var response = await request.close();
    
    if (response.redirects.isNotEmpty) {
      var redirect = response.redirects.first;
      print('Redirected to: ${redirect.location}');
      print('Status code: ${redirect.statusCode}');
      print('Method: ${redirect.method}');
    }
  } finally {
    client.close();
  }
}

We create an HTTP client and check for redirects in the response. The first
redirect's details are printed if any redirects occurred.

$ dart main.dart
Redirected to: https://example.org/
Status code: 301
Method: GET

## Analyzing Redirect Chains

This example demonstrates examining a complete redirect chain.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('http://google.com'));
    var response = await request.close();
    
    print('Final URL: ${response.redirects.last.location}');
    print('Redirect chain length: ${response.redirects.length}');
    
    for (var redirect in response.redirects) {
      print('${redirect.statusCode} ${redirect.method} -&gt; ${redirect.location}');
    }
  } finally {
    client.close();
  }
}

We print each redirect in the chain with its status code and method. This helps
understand complex redirect sequences.

$ dart main.dart
Final URL: https://www.google.com/
Redirect chain length: 2
301 GET -&gt; https://google.com/
301 GET -&gt; https://www.google.com/

## Following Redirects Manually

This example shows manual redirect following using RedirectInfo.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  var url = Uri.parse('http://example.org');
  var maxRedirects = 5;
  var currentRedirect = 0;
  
  try {
    while (currentRedirect &lt; maxRedirects) {
      var request = await client.getUrl(url);
      var response = await request.close();
      
      if (response.redirects.isEmpty) {
        print('Final destination: $url');
        break;
      }
      
      var redirect = response.redirects.first;
      print('Redirect $currentRedirect: ${redirect.location}');
      url = Uri.parse(redirect.location.toString());
      currentRedirect++;
    }
  } finally {
    client.close();
  }
}

We manually follow redirects up to a maximum limit. This demonstrates how to
implement custom redirect logic when needed.

$ dart main.dart
Redirect 0: https://example.org/
Final destination: https://example.org/

## Handling Different Redirect Types

This example shows how to handle various redirect status codes.

main.dart
  

import 'dart:io';

void main() async {
  var client = HttpClient();
  
  try {
    var request = await client.getUrl(Uri.parse('http://test.com/temporary'));
    var response = await request.close();
    
    if (response.redirects.isNotEmpty) {
      var redirect = response.redirects.first;
      
      switch (redirect.statusCode) {
        case HttpStatus.movedPermanently:
          print('Permanent redirect to ${redirect.location}');
          break;
        case HttpStatus.found:
          print('Temporary redirect to ${redirect.location}');
          break;
        case HttpStatus.seeOther:
          print('See other (change method to GET) to ${redirect.location}');
          break;
        default:
          print('Unknown redirect type: ${redirect.statusCode}');
      }
    }
  } finally {
    client.close();
  }
}

We check the status code to determine the redirect type. Different HTTP status
codes indicate different redirect semantics.

$ dart main.dart
Temporary redirect to http://test.com/new-location

## Creating Custom Redirect Policies

This example demonstrates implementing a custom redirect policy.

main.dart
  

import 'dart:io';

class SecureRedirectPolicy {
  bool allowRedirect(RedirectInfo redirect) {
    if (redirect.location.scheme != 'https') {
      print('Blocking insecure redirect to ${redirect.location}');
      return false;
    }
    return true;
  }
}

void main() async {
  var client = HttpClient();
  var policy = SecureRedirectPolicy();
  
  try {
    client.maxRedirects = 10;
    client.autoUncompress = false;
    
    var request = await client.getUrl(Uri.parse('http://bank.com/login'));
    var response = await request.close();
    
    for (var redirect in response.redirects) {
      if (!policy.allowRedirect(redirect)) {
        print('Aborting due to redirect policy violation');
        return;
      }
    }
    
    print('Successfully followed redirects to secure destination');
  } finally {
    client.close();
  }
}

We implement a security policy that blocks redirects to non-HTTPS URLs. This
shows how to use RedirectInfo for security validation.

$ dart main.dart
Blocking insecure redirect to http://bank.com/login
Aborting due to redirect policy violation

## Best Practices

- **Limit redirects:** Set maxRedirects to prevent infinite loops

- **Validate URLs:** Check redirect locations for security

- **Preserve method:** Handle 307/308 status codes correctly

- **Log redirects:** Record redirect chains for debugging

- **Handle errors:** Prepare for malformed redirect locations

## Source

[Dart RedirectInfo Documentation](https://api.dart.dev/stable/dart-io/RedirectInfo-class.html)

This tutorial covered Dart's RedirectInfo class with practical examples showing
redirect handling, chain analysis, and custom security policies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).