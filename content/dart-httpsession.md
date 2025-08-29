+++
title = "Dart HttpSession"
date = 2025-08-29T19:51:58.055+01:00
draft = false
description = "Dart HttpSession tutorial shows how to manage web sessions in Dart using the HttpSession class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpSession

last modified April 4, 2025

The HttpSession class in Dart provides server-side session
management for web applications. It allows storing user-specific data
between HTTP requests.

Sessions are essential for maintaining state in stateless HTTP. Dart's
HttpSession uses cookies or URL rewriting to track sessions.

## Basic Definition

HttpSession represents a server-side session that persists
across multiple HTTP requests from the same client. It's part of Dart's
dart:io library.

Key features include key-value storage, session timeout control, and
automatic session ID generation. Sessions are typically used for user
authentication and preferences.

## Basic Session Usage

This example shows basic session creation and data storage.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) async {
    var session = await request.session();
    session['visits'] = (session['visits'] ?? 0) + 1;
    
    request.response.write('Visits: ${session['visits']}');
    await request.response.close();
  });
}

We create a server that tracks visit counts using sessions. Each client
gets a unique session with persistent data. The session automatically
handles ID generation.

$ dart main.dart
// Access http://localhost:8080 in browser
// Output: Visits: 1 (increments on refresh)

## Session Timeout Configuration

This example demonstrates setting session timeout duration.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.sessionTimeout = Duration(minutes: 30);
  
  server.listen((request) async {
    var session = await request.session();
    request.response.write('Session timeout: ${server.sessionTimeout}');
    await request.response.close();
  });
}

We configure the server-wide session timeout to 30 minutes. After inactivity,
sessions expire automatically. The timeout applies to all sessions.

$ dart main.dart
// Output: Session timeout: 0:30:00.000000

## Session Data Management

This example shows comprehensive session data operations.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) async {
    var session = await request.session();
    var response = request.response;
    
    if (request.uri.path == '/login') {
      session['username'] = 'user123';
      session['last_login'] = DateTime.now();
      response.write('Logged in');
    } 
    else if (request.uri.path == '/logout') {
      await session.destroy();
      response.write('Logged out');
    }
    else {
      response.write('''
        Username: ${session['username']}
        Last login: ${session['last_login']}
      ''');
    }
    
    await response.close();
  });
}

We implement login/logout functionality with session storage. The destroy()
method clears session data completely. Session values persist between requests.

$ dart main.dart
// Access /login, then / to see stored data
// Access /logout to clear session

## Session ID Handling

This example demonstrates working with session IDs directly.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) async {
    var session = await request.session();
    var response = request.response;
    
    response.write('''
      Session ID: ${session.id}
      Is new: ${session.isNew}
    ''');
    
    await response.close();
  });
}

We display the automatically generated session ID and whether the session
is new. The isNew property helps identify first-time visitors.

$ dart main.dart
// Output shows unique session ID and true/false for new session

## Secure Session Cookies

This example configures secure session cookie attributes.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.sessionCookieName = 'DART_SESSION';
  server.sessionCookiePath = '/app';
  server.sessionCookieHttpOnly = true;
  server.sessionCookieSecure = true;
  
  server.listen((request) async {
    var session = await request.session();
    request.response.write('Secure session configured');
    await request.response.close();
  });
}

We customize session cookie properties for security. HttpOnly prevents
JavaScript access, and Secure requires HTTPS. These are best practices.

$ dart main.dart
// Sets secure cookie with custom name and path

## Best Practices

- **Minimize data:** Store only essential data in sessions

- **Secure cookies:** Always use HttpOnly and Secure flags

- **Timeout:** Set appropriate session timeout durations

- **Cleanup:** Destroy sessions after logout

- **Validation:** Validate session data on each request

## Source

[Dart HttpSession Documentation](https://api.dart.dev/stable/dart-io/HttpSession-class.html)

This tutorial covered Dart's HttpSession class with practical examples showing
session management, configuration, and security best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).