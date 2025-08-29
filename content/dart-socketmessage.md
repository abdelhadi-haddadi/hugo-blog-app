+++
title = "Dart SocketMessage"
date = 2025-08-29T19:52:25.091+01:00
draft = false
description = "Dart SocketMessage tutorial shows how to handle network communication in Dart using the SocketMessage class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SocketMessage

last modified April 4, 2025

The SocketMessage class in Dart provides a way to handle network
communication through sockets. It's useful for building client-server
applications and real-time systems.

SocketMessage manages message framing, serialization, and network transmission.
It's often used with Dart's dart:io library for socket programming.

## Basic Definition

SocketMessage represents a discrete unit of communication over
sockets. It typically includes headers and a payload for structured data.

Key features include message framing, binary/string conversion, and error
handling. It helps manage the complexity of network communication.

## Basic SocketMessage Usage

This example shows basic message creation and sending through a socket.

main.dart
  

import 'dart:io';
import 'dart:convert';

class SocketMessage {
  final Map&lt;String, String&gt; headers;
  final String body;

  SocketMessage(this.headers, this.body);

  List&lt;int&gt; toBytes() {
    var headerStr = headers.entries
      .map((e) =&gt; '${e.key}:${e.value}')
      .join(';');
    return utf8.encode('$headerStr|$body');
  }
}

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4040);
  print('Server listening on ${server.address}:${server.port}');

  server.listen((client) {
    client.transform(utf8.decoder).listen((data) {
      print('Received: $data');
    });
  });

  var client = await Socket.connect('127.0.0.1', 4040);
  var message = SocketMessage(
    {'type': 'greeting', 'length': '5'},
    'Hello'
  );
  client.add(message.toBytes());
}

We create a simple SocketMessage class with headers and body. The server listens
for connections while the client sends a formatted message. The message is
converted to bytes for transmission.

$ dart main.dart
Server listening on 127.0.0.1:4040
Received: type:greeting;length:5|Hello

## Handling Binary Data

This example demonstrates working with binary data in SocketMessage.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

class BinarySocketMessage {
  final int type;
  final Uint8List data;

  BinarySocketMessage(this.type, this.data);

  Uint8List toBytes() {
    var buffer = ByteData(4 + data.length);
    buffer.setUint32(0, type);
    buffer.buffer.asUint8List().setAll(4, data);
    return buffer.buffer.asUint8List();
  }
}

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4041);
  server.listen((client) {
    client.listen((data) {
      var bytes = Uint8List.fromList(data);
      var type = ByteData.sublistView(bytes, 0, 4).getUint32(0);
      print('Received message type: $type');
    });
  });

  var client = await Socket.connect('127.0.0.1', 4041);
  var message = BinarySocketMessage(
    42,
    Uint8List.fromList([1, 2, 3, 4, 5])
  );
  client.add(message.toBytes());
}

We create a binary message format with a 4-byte type header followed by payload.
The server extracts the message type from the binary data. This is efficient for
binary protocols.

$ dart main.dart
Received message type: 42

## Message Framing

This example shows how to implement message framing with length prefixes.

main.dart
  

import 'dart:io';
import 'dart:typed_data';
import 'dart:convert';

class FramedSocketMessage {
  final String content;

  FramedSocketMessage(this.content);

  Uint8List toBytes() {
    var contentBytes = utf8.encode(content);
    var buffer = ByteData(4 + contentBytes.length);
    buffer.setUint32(0, contentBytes.length);
    buffer.buffer.asUint8List().setAll(4, contentBytes);
    return buffer.buffer.asUint8List();
  }
}

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4042);
  server.listen((client) {
    var buffer = &lt;int&gt;[];
    client.listen((data) {
      buffer.addAll(data);
      if (buffer.length &gt;= 4) {
        var length = ByteData.sublistView(Uint8List.fromList(buffer), 0, 4)
          .getUint32(0);
        if (buffer.length &gt;= 4 + length) {
          var message = utf8.decode(buffer.sublist(4, 4 + length));
          print('Framed message: $message');
          buffer = buffer.sublist(4 + length);
        }
      }
    });
  });

  var client = await Socket.connect('127.0.0.1', 4042);
  var message = FramedSocketMessage('Hello, framed world!');
  client.add(message.toBytes());
}

We implement length-prefixed message framing. The message starts with a 4-byte
length followed by the payload. The server reads the length first then the exact
payload bytes. This handles message boundaries correctly.

$ dart main.dart
Framed message: Hello, framed world!

## JSON Message Format

This example demonstrates using JSON for structured message content.

main.dart
  

import 'dart:io';
import 'dart:convert';

class JsonSocketMessage {
  final String type;
  final Map&lt;String, dynamic&gt; payload;

  JsonSocketMessage(this.type, this.payload);

  List&lt;int&gt; toBytes() {
    var message = {
      'type': type,
      'payload': payload,
      'timestamp': DateTime.now().toIso8601String()
    };
    return utf8.encode(json.encode(message));
  }
}

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4043);
  server.listen((client) {
    client.transform(utf8.decoder).listen((data) {
      var message = json.decode(data);
      print('${message['type']}: ${message['payload']}');
    });
  });

  var client = await Socket.connect('127.0.0.1', 4043);
  var message = JsonSocketMessage(
    'user.login',
    {'username': 'johndoe', 'password': 'secret'}
  );
  client.add(message.toBytes());
}

We create JSON-formatted messages with type and payload fields. The server
decodes the JSON and extracts message components. This is useful for web APIs
and structured communication.

$ dart main.dart
user.login: {username: johndoe, password: secret}

## Error Handling

This example shows robust error handling in socket message processing.

main.dart
  

import 'dart:io';
import 'dart:convert';

class SafeSocketMessage {
  final String command;
  final List&lt;String&gt; args;

  SafeSocketMessage(this.command, this.args);

  List&lt;int&gt; toBytes() {
    try {
      return utf8.encode('$command:${args.join(',')}');
    } catch (e) {
      return utf8.encode('error:Failed to encode message');
    }
  }
}

void main() async {
  var server = await ServerSocket.bind('127.0.0.1', 4044);
  server.listen((client) {
    client.transform(utf8.decoder).listen(
      (data) {
        try {
          var parts = data.split(':');
          if (parts.length != 2) throw FormatException('Invalid format');
          print('Command: ${parts[0]}, Args: ${parts[1].split(',')}');
        } catch (e) {
          print('Error processing message: $e');
          client.write('error:Invalid message format');
        }
      },
      onError: (e) =&gt; print('Connection error: $e'),
      onDone: () =&gt; print('Client disconnected')
    );
  });

  var client = await Socket.connect('127.0.0.1', 4044);
  var message = SafeSocketMessage('calculate', ['add', '5', '3']);
  client.add(message.toBytes());
  
  client.listen((response) {
    print('Server response: ${utf8.decode(response)}');
    client.close();
  });
}

We implement error handling at both message creation and processing stages.
The client sends a structured command message while the server validates it.
Error responses are sent back when problems occur.

$ dart main.dart
Command: calculate, Args: [add, 5, 3]
Client disconnected

## Best Practices

- **Message Framing:** Always implement proper message boundaries

- **Error Handling:** Validate messages and handle errors gracefully

- **Serialization:** Choose appropriate formats (JSON, binary, etc.)

- **Resource Management:** Close sockets properly

- **Timeouts:** Implement timeouts for network operations

## Source

[Dart Socket Documentation](https://api.dart.dev/stable/dart-io/Socket-class.html)

This tutorial covered Dart's SocketMessage patterns with practical examples
showing text/binary formats, framing, JSON, and error handling for robust
network communication.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).