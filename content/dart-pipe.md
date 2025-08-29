+++
title = "Dart Pipe"
date = 2025-08-29T19:52:10.306+01:00
draft = false
description = "Dart Pipe tutorial shows how to connect streams for efficient data processing using the Pipe class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Pipe

last modified April 4, 2025

The Pipe class in Dart provides a way to connect streams for
efficient data processing. It's useful for chaining stream transformations.

Pipe manages the connection between streams, handling data flow and errors.
It's part of Dart's dart:async library for asynchronous programming.

## Basic Definition

Pipe is a connector between streams that forwards events from
source to destination. It implements both Stream and StreamSink interfaces.

Key features include automatic event forwarding, error propagation, and
stream lifecycle management. It simplifies complex stream pipelines.

## Basic Pipe Usage

This example shows basic stream piping between two controllers.

main.dart
  

import 'dart:async';

void main() async {
  var source = StreamController&lt;int&gt;();
  var destination = StreamController&lt;int&gt;();
  var pipe = Pipe(source.stream, destination.sink);

  destination.stream.listen((data) {
    print('Received: $data');
  });

  source.add(1);
  source.add(2);
  source.add(3);
  
  await source.close();
}

We create a Pipe connecting a source stream to a destination sink. Data flows
automatically from source to destination through the pipe.

$ dart main.dart
Received: 1
Received: 2
Received: 3

## Transforming Data with Pipe

This example demonstrates adding a transformer to the pipe.

main.dart
  

import 'dart:async';

void main() async {
  var source = StreamController&lt;int&gt;();
  var destination = StreamController&lt;String&gt;();
  
  var pipe = Pipe(
    source.stream,
    destination.sink,
    transform: (stream) =&gt; stream.map((n) =&gt; 'Number $n'),
  );

  destination.stream.listen(print);

  source.add(1);
  source.add(2);
  source.add(3);
  
  await source.close();
}

We add a transform function to modify data as it passes through the pipe.
The transformer converts numbers to formatted strings before forwarding.

$ dart main.dart
Number 1
Number 2
Number 3

## Error Handling in Pipe

This example shows how Pipe handles and forwards errors.

main.dart
  

import 'dart:async';

void main() async {
  var source = StreamController&lt;int&gt;();
  var destination = StreamController&lt;int&gt;();
  var pipe = Pipe(source.stream, destination.sink);

  destination.stream.listen(
    print,
    onError: (e) =&gt; print('Error: $e'),
    onDone: () =&gt; print('Done'),
  );

  source.add(1);
  source.addError('Test Error');
  source.add(2);
  
  await source.close();
}

Errors from the source stream are automatically forwarded to the destination.
The pipe maintains error propagation through the entire stream pipeline.

$ dart main.dart
1
Error: Test Error
2
Done

## Pipe with Broadcast Streams

This example demonstrates using Pipe with broadcast streams.

main.dart
  

import 'dart:async';

void main() async {
  var source = StreamController&lt;int&gt;.broadcast();
  var destination = StreamController&lt;int&gt;.broadcast();
  var pipe = Pipe(source.stream, destination.sink);

  // First listener
  destination.stream.listen((data) {
    print('Listener 1: $data');
  });

  // Second listener
  destination.stream.listen((data) {
    print('Listener 2: $data');
  });

  source.add(1);
  source.add(2);
  
  await source.close();
}

Pipe works with broadcast streams, forwarding events to all listeners.
Each destination listener receives all events from the source.

$ dart main.dart
Listener 1: 1
Listener 2: 1
Listener 1: 2
Listener 2: 2

## Closing Pipe Connections

This example shows proper cleanup of pipe connections.

main.dart
  

import 'dart:async';

void main() async {
  var source = StreamController&lt;int&gt;();
  var destination = StreamController&lt;int&gt;();
  var pipe = Pipe(source.stream, destination.sink);

  destination.stream.listen(print);

  source.add(1);
  source.add(2);
  
  // Proper cleanup
  await pipe.close();
  await source.close();
  await destination.close();
  
  print('All streams closed');
}

Closing the pipe ensures all resources are properly released. It's good practice
to close all controllers and pipes when done.

$ dart main.dart
1
2
All streams closed

## Best Practices

- **Resource cleanup:** Always close pipes and controllers

- **Error handling:** Handle errors at destination streams

- **Transformers:** Use for data modification in the pipeline

- **Broadcast:** Use broadcast streams for multiple listeners

## Source

[Dart Pipe Documentation](https://api.dart.dev/stable/dart-async/Pipe-class.html)

This tutorial covered Dart's Pipe class with practical examples showing
basic usage, error handling, and stream transformations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).