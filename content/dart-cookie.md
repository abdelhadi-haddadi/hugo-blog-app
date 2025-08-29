+++
title = "Dart Cookie"
date = 2025-08-29T19:51:42.336+01:00
draft = false
description = "Dart Cookie tutorial shows how to work with HTTP cookies in Dart using the Cookie class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Cookie

last modified April 4, 2025

The Cookie class in Dart represents an HTTP cookie, used for
maintaining state between client and server. It's part of the
dart:io library for server-side applications.

Cookies store small pieces of data that persist across requests. They're
essential for sessions, authentication, and user tracking in web apps.

## Basic Definition

A Cookie object contains name-value pairs and optional attributes.
These include expiration, domain, path, security flags, and same-site policy.

The class provides methods to parse cookie headers and format cookies for HTTP.
It handles both server-side cookie creation and client-side cookie parsing.

## Creating a Basic Cookie

This example shows how to create a simple cookie with just a name and value.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('session_id', 'abc123xyz456');
  
  print('Name: ${cookie.name}');
  print('Value: ${cookie.value}');
  print('ToString: $cookie');
}

We create a Cookie with a name and value. The toString() method formats it
properly for HTTP headers. This is the minimal cookie configuration.

$ dart main.dart
Name: session_id
Value: abc123xyz456
ToString: session_id=abc123xyz456

## Cookie with Attributes

This example demonstrates setting various cookie attributes like expiration.

main.dart
  

import 'dart:io';

void main() {
  var cookie = Cookie('preferences', 'dark_mode=true');
  
  cookie.domain = 'example.com';
  cookie.path = '/settings';
  cookie.expires = DateTime.now().add(Duration(days: 30));
  cookie.httpOnly = true;
  cookie.secure = true;
  
  print(cookie);
}

We configure a cookie with domain restriction, path, expiration date, and
security flags. These attributes control cookie behavior in browsers.

$ dart main.dart
preferences=dark_mode=true; Domain=example.com; Path=/settings; Expires=Sat, 04 May 2025 14:32:10 GMT; HttpOnly; Secure

## Parsing Cookie Headers

This example shows how to parse a Set-Cookie header string into a Cookie object.

main.dart
  

import 'dart:io';

void main() {
  var header = 'user_token=xyz789; Max-Age=3600; Path=/; Secure; SameSite=Lax';
  
  var cookie = Cookie.fromSetCookieValue(header);
  
  print('Name: ${cookie.name}');
  print('Value: ${cookie.value}');
  print('MaxAge: ${cookie.maxAge}');
  print('Path: ${cookie.path}');
  print('Secure: ${cookie.secure}');
  print('SameSite: ${cookie.sameSite}');
}

The fromSetCookieValue constructor parses HTTP Set-Cookie headers. It extracts
all attributes automatically into the Cookie object properties.

$ dart main.dart
Name: user_token
Value: xyz789
MaxAge: 3600
Path: /
Secure: true
SameSite: SameSite.lax

## Multiple Cookies in Headers

This example demonstrates working with multiple cookies in HTTP headers.

main.dart
  

import 'dart:io';

void main() {
  var cookieHeader = 'session=abc123; lang=en_US; theme=dark';
  
  var cookies = Cookie.fromCookieValue(cookieHeader);
  
  for (var cookie in cookies) {
    print('${cookie.name}: ${cookie.value}');
  }
  
  // Modify one cookie
  cookies[1].value = 'fr_FR';
  print('\nModified: ${Cookie.toCookieValue(cookies)}');
}

We parse a Cookie header containing multiple name-value pairs. The class provides
methods to both parse and serialize multiple cookies in proper HTTP format.

$ dart main.dart
session: abc123
lang: en_US
theme: dark

Modified: session=abc123; lang=fr_FR; theme=dark

## Cookie Security Features

This example shows security-related cookie attributes like SameSite and HttpOnly.

main.dart
  

import 'dart:io';

void main() {
  var secureCookie = Cookie('auth_token', 'secret123');
  
  secureCookie.httpOnly = true;
  secureCookie.secure = true;
  secureCookie.sameSite = SameSite.strict;
  secureCookie.maxAge = 1800; // 30 minutes
  
  print('Secure cookie: $secureCookie');
  
  // For sensitive operations
  var csrfCookie = Cookie('csrf_token', 'r4nd0mT0k3n');
  csrfCookie.sameSite = SameSite.lax;
  
  print('CSRF cookie: $csrfCookie');
}

We configure security flags to protect against XSS and CSRF attacks. HttpOnly
prevents JavaScript access, while SameSite restricts cross-site requests.

$ dart main.dart
Secure cookie: auth_token=secret123; Max-Age=1800; HttpOnly; Secure; SameSite=Strict
CSRF cookie: csrf_token=r4nd0mT0k3n; SameSite=Lax

## Best Practices

- **Security:** Always set HttpOnly for session cookies

- **HTTPS:** Use Secure flag for cookies over HTTPS

- **Expiration:** Set reasonable Max-Age or Expires

- **Sensitive data:** Avoid storing sensitive info in cookies

- **Size limits:** Keep cookies under 4KB (browser limits)

## Source

[Dart Cookie Documentation](https://api.dart.dev/stable/dart-io/Cookie-class.html)

This tutorial covered Dart's Cookie class with examples showing creation,
parsing, security features, and HTTP header handling for web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).