+++
title = "Dart SameSite"
date = 2025-08-29T19:52:20.620+01:00
draft = false
description = "Dart SameSite tutorial shows how to configure cookie security in Dart using the SameSite class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SameSite

last modified April 4, 2025

The SameSite class in Dart provides security attributes for cookies.
It helps prevent cross-site request forgery (CSRF) attacks by controlling
cookie behavior.

SameSite is part of Dart's dart:io library and is used with
Cookie class. It defines three security levels for cookies.

## Basic Definition

SameSite is an enum that specifies cookie security policies.
It determines when cookies are sent with cross-site requests.

The three values are Lax, Strict, and None.
Each provides different security levels for cookie transmission.

## SameSite.Lax Example

This example shows how to set a cookie with Lax security policy.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('session', 'abc123');
  cookie.sameSite = SameSite.lax;
  
  print('Cookie: ${cookie.name}=${cookie.value}');
  print('SameSite: ${cookie.sameSite}');
}

We create a session cookie with Lax policy. Lax allows cookies with safe
HTTP methods like GET from other sites. It's a balanced security default.

$ dart main.dart
Cookie: session=abc123
SameSite: SameSite.lax

## SameSite.Strict Example

This example demonstrates the strictest SameSite policy.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('auth', 'xyz789');
  cookie.sameSite = SameSite.strict;
  cookie.secure = true; // Requires HTTPS
  
  print('Cookie: ${cookie.toString()}');
}

Strict policy prevents all cross-site cookie transmission. We also set
secure flag since Strict typically requires HTTPS for security.

$ dart main.dart
Cookie: auth=xyz789; SameSite=Strict; Secure

## SameSite.None Example

This example shows a cookie with no SameSite restrictions.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('prefs', 'darkmode');
  cookie.sameSite = SameSite.none;
  cookie.secure = true; // Required for None
  
  print('Cookie header: ${cookie.toString()}');
}

None allows cross-site cookie transmission but requires Secure flag.
This is needed for cookies used in iframes or cross-site APIs.

$ dart main.dart
Cookie header: prefs=darkmode; SameSite=None; Secure

## Cookie Class Integration

This example shows SameSite with complete cookie configuration.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('user', 'john_doe')
    ..path = '/account'
    ..maxAge = 3600
    ..httpOnly = true
    ..sameSite = SameSite.lax
    ..secure = true;
  
  print('Set-Cookie: ${cookie.toString()}');
}

We configure a secure, HTTP-only cookie with path, max age, and Lax policy.
This demonstrates typical production cookie settings with SameSite.

$ dart main.dart
Set-Cookie: user=john_doe; Path=/account; Max-Age=3600; HttpOnly; SameSite=Lax; Secure

## HTTP Server Example

This example shows SameSite cookies in a real HTTP server context.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  print('Server running on ${server.address}:${server.port}');

  await for (var request in server) {
    var response = request.response;
    
    var cookie = Cookie('visits', '1')
      ..sameSite = SameSite.lax
      ..maxAge = 86400;
    
    response.cookies.add(cookie);
    response.write('Cookie set with SameSite=Lax');
    await response.close();
  }
}

The server sets a visits cookie with Lax policy for each request.
This is a common pattern for session tracking with security.

$ dart main.dart
Server running on InternetAddress('::1', 6):8080

## Best Practices

- **Default to Lax:** Provides good security without breaking functionality

- **Use Strict:** For highly sensitive operations like banking

- **None requires Secure:** Always use HTTPS with SameSite=None

- **Test thoroughly:** SameSite changes can affect cross-site functionality

## Source

[Dart SameSite Documentation](https://api.dart.dev/stable/dart-io/SameSite-class.html)

This tutorial covered Dart's SameSite class with practical examples showing
cookie security configuration for web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).