+++
title = "Dart Future"
date = 2025-08-29T19:51:50.189+01:00
draft = false
description = "Dart Future tutorial shows how to work with futures in Dart language. A Future represents a potential value, or error, that will be available at some time in the future."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Future

last modified January 28, 2024

In this article we show how to work with futures in Dart language. 

## Future

A Future represents a potential value, or error, that will be
available at some time in the future.

A Future can be complete with a value or with an error. Programmers can plug
callbacks for each case. Futures and async and await
keywords are used to perform asynchronous operations in Dart. 

Common asynchronous operations include:

  - fetching data over network

  - reading data from a database

  - reading data from a file

  - performing a long-running task in a UI program

The async and await keywords provide a declarative way
to define asynchronous functions and use their results. We mark an asynchronous
function with the async keyword. The await keyword is
used to get the completed result of an asynchronous expression. The await
keyword only works within an asynchronous function.

Some languages use the term *Promise* for the same functionality.

## Dart future simple example

The Future.value creates a future completed with value.

main.dart
  

void main() async {
  final myfut1 = Future.value(14);
  print(myfut1);

  final myfut2 = await Future.value(14);
  print(myfut2);
}

In the example, we have two futures. 

void main() async {

Since in the main function we work with futures, we mark it with 
the async keyword.

final myfut1 = Future.value(14);
print(myfut1);

This code is incorrect; we create a new future with Future.value
and print the result, which is an uncompleted instance of the future. In order
to get the value, we need to use the await keyword.

var myfut2 = await Future.value(14);
print(myfut2);

We create another future and wait for its result with the await
keyword.

$ dart main.dart
Instance of 'Future&lt;int&gt;'
14  

## Dart Future.delayed

The Future.delayed creates a future that runs its computation after
a delay.

main.dart
  

void main() async {
  Future.delayed(Duration(seconds: 2), () =&gt; 12).then((value) =&gt; print(value));

  final res = await Future.delayed(Duration(seconds: 2), () =&gt; 14);
  print(res);
}

The example creates two delayed futures.

Future.delayed(Duration(seconds: 2), () =&gt; 12).then((value) =&gt; print(value));

We create a future which is executed after two seconds; it returns value 12. 
With then, we register a callback when the future completes. 
It prints the returned value to the console. 

final res = await Future.delayed(Duration(seconds: 2), () =&gt; 14);
print(res);

The same functionality is performed; this time using the await 
keyword.

$ dart main.dart
12
14

## Dart read file with readAsString

The readAsString function reads the entire file contents as a
string asynchronously. It returns a Future&lt;String&gt; that
completes with the string once the file contents has been read.

words.txt
  

bear
fruit
cloud
sky
forest
falcon
wood
lake
rock

This is the words.txt file.

main.dart
  

import 'dart:io';

void main() async {
  final file = File('words.txt');

  final contents = await file.readAsString();
  print(contents);
}

The example reads the words.txt file asynchronously.

## Dart Future.wait

The Future.wait waits for multiple futures to complete and collects
their results. It returns a future which completes once all the given futures
have completed.

main.dart
  

import 'dart:async';
import 'dart:math';

Future&lt;int&gt; getRandomValue() async {
  await Future.delayed(Duration(seconds: 1));
  final random = new Random();
  return random.nextInt(150);
}

int findMinVal(List&lt;int&gt; lst) {
  lst.forEach((e) =&gt; print(e));

  return lst.reduce(max);
}

void main() async {
  final maximum = await Future.wait([
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    getRandomValue()
  ]).then((List&lt;int&gt; results) =&gt; findMinVal(results));

  print('Maximum is : $maximum');
}

In the example, we have an asynchronous getRandomValue method, 
which returns a random value. We launch the method six times and place them 
all inside Future.wait. Once all the futures are completed, we 
find the maximum of the generated random values.

$ dart main.dart
94
13
106
41
110
122
Maximum is : 122

In the following example we check for the existence of a directory.

main.dart
  

import 'dart:io';

void main() async {
  final path = 'doc/crypto';
  final dr = Directory(path);

  final present = await dr.exists();

  if (present) {
    print('directory exists');
    Future.wait([dr.delete()]).then((_) =&gt; checkIfExists(dr));
  } else {
    print('directory does not exist');
  }
}

void checkIfExists(Directory dr) async {
  final present = await dr.exists();
  print(present ? 'directory exists' : 'directory does not exist');
}

In the given directory exists, we delete it, and then we check for its existence 
again. 

Future.wait([dr.delete()]).then((_) =&gt; checkIfExists(dr));

With Future.wait we wait for the directory to be deleted. Only
after the asynchronous operation finishes, we call checkIfExists.

## Dart future get request

The http is a composable, Future-based library for making HTTP
requests. 

$ dart pub add http

We add the http package.

pubspec.yaml
  

name: app

environment:
    sdk: '&gt;=2.18.0 &lt;3.0.0'
dependencies:
    http: ^0.13.5

This is the pubspec.yaml.

main.dart
  

import 'package:http/http.dart' as http;

Future&lt;String&gt; fetchData() async {
  final resp = await http.get(Uri.http('webcode.me'));

  if (resp.statusCode == 200) {
    return resp.body;
  } else {
    throw Exception('Failed to fetch data');
  }
}

void main() async {
  final data = await fetchData();
  print(data);
}

In the example, we send a GET request to the webcode.me and 
print the response body.

$ dart main.dart
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
...

## Source

[Dart Future - language reference](https://api.dart.dev/stable/3.2.6/dart-async/Future-class.html)

In this article we have worked with futures in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).