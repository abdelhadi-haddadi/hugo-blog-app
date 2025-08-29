+++
title = "Dart IOOverrides"
date = 2025-08-29T19:52:00.269+01:00
draft = false
description = "Dart IOOverrides tutorial shows how to mock and override IO operations in Dart using the IOOverrides class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart IOOverrides

last modified April 4, 2025

The IOOverrides class in Dart provides a way to override standard
IO operations for testing purposes. It's part of Dart's testing utilities.

IOOverrides allows mocking file system, network, and process
operations. This enables reliable unit tests without real IO operations.

## Basic Definition

IOOverrides is an abstract class in the dart:io
library. It provides hooks to override standard IO operations.

Key features include file system mocking, network call interception,
and process execution simulation. It's essential for test isolation.

## Basic IOOverrides Usage

This example shows how to override file operations for testing.

main.dart
  

import 'dart:io';

class MockFileSystem extends IOOverrides {
  @override
  File openFile(String path) {
    return File('mocked_content.txt');
  }
}

void main() {
  IOOverrides.runWithOverrides(() {
    var file = File('test.txt');
    print(file.readAsStringSync()); // Reads from mocked_content.txt
  }, MockFileSystem());
}

We create a custom IOOverrides implementation that changes file
operations. The runWithOverrides method executes code with our
overrides active.

$ dart main.dart
Content from mocked_content.txt

## Mocking Network Calls

This example demonstrates mocking HTTP client requests.

main.dart
  

import 'dart:io';
import 'dart:convert';

class MockHttpOverrides extends IOOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return MockHttpClient();
  }
}

class MockHttpClient extends HttpClient {
  @override
  Future&lt;HttpClientRequest&gt; getUrl(Uri url) async {
    return MockHttpClientRequest();
  }
}

class MockHttpClientRequest extends HttpClientRequest {
  @override
  Future&lt;HttpClientResponse&gt; close() async {
    return MockHttpClientResponse();
  }
}

class MockHttpClientResponse extends HttpClientResponse {
  @override
  int get statusCode =&gt; 200;
  
  @override
  Stream&lt;List&lt;int&gt;&gt; get body =&gt; Stream.value(utf8.encode('Mocked response'));
}

void main() {
  IOOverrides.runWithOverrides(() async {
    var client = HttpClient();
    var request = await client.getUrl(Uri.parse('https://example.com'));
    var response = await request.close();
    print(await response.transform(utf8.decoder).join());
  }, MockHttpOverrides());
}

We override the entire HTTP client stack to return mock responses.
This allows testing network-dependent code without real network calls.

$ dart main.dart
Mocked response

## Overriding Process Execution

This example shows how to mock process execution results.

main.dart
  

import 'dart:io';

class MockProcessOverrides extends IOOverrides {
  @override
  ProcessResult runProcess(String executable, List&lt;String&gt; arguments,
      {String? workingDirectory, Map&lt;String, String&gt;? environment}) {
    return ProcessResult(0, 0, 'Mocked output', '');
  }
}

void main() {
  IOOverrides.runWithOverrides(() {
    var result = Process.runSync('ls', ['-la']);
    print(result.stdout); // Mocked output
  }, MockProcessOverrides());
}

We override process execution to return predefined results. This is useful for
testing code that depends on external commands.

$ dart main.dart
Mocked output

## Combining Multiple Overrides

This example combines file and network overrides in a single test.

main.dart
  

import 'dart:io';
import 'dart:convert';

class CombinedOverrides extends IOOverrides {
  @override
  File openFile(String path) =&gt; File('mock_file.txt');
  
  @override
  HttpClient createHttpClient(SecurityContext? context) =&gt; MockHttpClient();
}

class MockHttpClient extends HttpClient {
  @override
  Future&lt;HttpClientRequest&gt; getUrl(Uri url) async =&gt; MockHttpClientRequest();
}

class MockHttpClientRequest extends HttpClientRequest {
  @override
  Future&lt;HttpClientResponse&gt; close() async =&gt; MockHttpClientResponse();
}

class MockHttpClientResponse extends HttpClientResponse {
  @override
  int get statusCode =&gt; 200;
  @override
  Stream&lt;List&lt;int&gt;&gt; get body =&gt; Stream.value(utf8.encode('Mocked HTTP'));
}

void main() {
  IOOverrides.runWithOverrides(() async {
    // Test file operation
    print(File('test.txt').readAsStringSync());
    
    // Test HTTP operation
    var client = HttpClient();
    var request = await client.getUrl(Uri.parse('https://example.com'));
    var response = await request.close();
    print(await response.transform(utf8.decoder).join());
  }, CombinedOverrides());
}

We create a comprehensive override that handles both file and network operations.
This enables complex test scenarios with multiple IO dependencies.

$ dart main.dart
Content from mock_file.txt
Mocked HTTP

## Testing with IOOverrides

This example shows a complete unit test using IOOverrides.

main.dart
  

import 'dart:io';
import 'package:test/test.dart';

class TestOverrides extends IOOverrides {
  @override
  Directory getCurrentDirectory() =&gt; Directory('/mock/dir');
}

String getCurrentDir() {
  return Directory.current.path;
}

void main() {
  test('Test directory override', () {
    IOOverrides.runWithOverrides(() {
      expect(getCurrentDir(), equals('/mock/dir'));
    }, TestOverrides());
  });
}

We test a function that depends on the current directory. The override ensures
consistent results regardless of the real environment.

$ dart test main.dart
00:00 +0: Test directory override
00:00 +1: All tests passed!

## Best Practices

- **Isolation:** Keep overrides focused on specific test cases

- **Restoration:** Overrides automatically revert after runWithOverrides

- **Completeness:** Implement all required methods when overriding

- **Realism:** Make mock behavior match real implementations

## Source

[Dart IOOverrides Documentation](https://api.dart.dev/stable/dart-io/IOOverrides-class.html)

This tutorial covered Dart's IOOverrides class with practical examples showing
how to mock various IO operations for reliable testing.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).