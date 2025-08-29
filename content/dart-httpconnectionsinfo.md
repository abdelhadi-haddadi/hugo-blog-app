+++
title = "Dart HttpConnectionsInfo"
date = 2025-08-29T19:51:55.835+01:00
draft = false
description = "Dart HttpConnectionsInfo tutorial shows how to access HTTP server connection information in Dart using the HttpConnectionsInfo class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HttpConnectionsInfo

last modified April 4, 2025

The HttpConnectionsInfo class in Dart provides information about
active HTTP server connections. It's part of the dart:io library.

This class offers insights into server performance and connection management.
It's useful for monitoring and debugging HTTP server applications.

## Basic Definition

HttpConnectionsInfo is a read-only class that contains statistics
about HTTP server connections. It's typically accessed through an HttpServer.

Key properties include active connection count, idle connection count, and
total connection count. These metrics help understand server load.

## Basic HttpConnectionsInfo Usage

This example shows how to access basic connection information from a server.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) {
    var info = server.connectionsInfo();
    print('Active connections: ${info.active}');
    request.response.write('Hello');
    request.response.close();
  });
}

We create an HTTP server and access connection info during requests.
The active property shows currently processing connections.

$ dart main.dart
Active connections: 1

## Monitoring Connection Statistics

This example demonstrates periodic monitoring of connection statistics.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  Timer.periodic(Duration(seconds: 5), (timer) {
    var info = server.connectionsInfo();
    print('''
    Active: ${info.active}
    Idle: ${info.idle}
    Total: ${info.total}''');
  });
  
  server.listen((request) {
    request.response.write('Monitoring');
    request.response.close();
  });
}

We use a periodic timer to log connection stats every 5 seconds.
This helps track server load patterns over time.

$ dart main.dart
    Active: 0
    Idle: 1
    Total: 1

## Connection Limit Enforcement

This example shows how to implement connection limiting using HttpConnectionsInfo.

main.dart
  

import 'dart:io';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  const maxConnections = 10;
  
  server.listen((request) {
    var info = server.connectionsInfo();
    
    if (info.total &gt;= maxConnections) {
      request.response.statusCode = 503;
      request.response.write('Server busy');
    } else {
      request.response.write('Processing');
    }
    
    request.response.close();
  });
}

We check total connections before processing each request.
If the limit is reached, we return a 503 Service Unavailable response.

$ dart main.dart

## Connection Pool Analysis

This example analyzes the connection pool behavior under load.

main.dart
  

import 'dart:io';
import 'dart:async';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) async {
    var info = server.connectionsInfo();
    print('Before: Active=${info.active} Idle=${info.idle}');
    
    await Future.delayed(Duration(seconds: 2));
    request.response.write('Delayed response');
    await request.response.close();
    
    info = server.connectionsInfo();
    print('After: Active=${info.active} Idle=${info.idle}');
  });
}

We track connection state changes during request processing.
The delayed response shows how connections transition between states.

$ dart main.dart
Before: Active=1 Idle=0
After: Active=0 Idle=1

## Server Health Check Endpoint

This example creates a health check endpoint using connection info.

main.dart
  

import 'dart:io';
import 'dart:convert';

void main() async {
  var server = await HttpServer.bind('localhost', 8080);
  
  server.listen((request) {
    if (request.uri.path == '/health') {
      var info = server.connectionsInfo();
      var health = {
        'active': info.active,
        'idle': info.idle,
        'total': info.total,
        'status': info.active &lt; 50 ? 'OK' : 'WARN'
      };
      request.response.headers.contentType = ContentType.json;
      request.response.write(jsonEncode(health));
    } else {
      request.response.write('Main endpoint');
    }
    request.response.close();
  });
}

We expose connection statistics via a JSON health endpoint.
This is useful for monitoring systems to check server status.

$ curl http://localhost:8080/health
{"active":1,"idle":0,"total":1,"status":"OK"}

## Best Practices

- **Monitor regularly:** Track connection stats for capacity planning

- **Set limits:** Prevent overload using connection thresholds

- **Analyze patterns:** Identify peak usage times

- **Health checks:** Expose stats for monitoring systems

## Source

[Dart HttpConnectionsInfo Documentation](https://api.dart.dev/stable/dart-io/HttpConnectionsInfo-class.html)

This tutorial covered Dart's HttpConnectionsInfo class with practical examples
showing monitoring, load management, and health checking capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).