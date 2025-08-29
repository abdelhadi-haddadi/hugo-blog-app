+++
title = "Dart HTTP GET/POST request"
date = 2025-08-29T19:51:50.248+01:00
draft = false
description = "Dart GET POST request tutorial shows how to send HTTP GET POST requests in Dart."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart HTTP GET/POST request

last modified January 28, 2024

In this article we show how to send GET and POST requests in Dart.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

In the code examples, we use httpbin.org, which is a freely available 
HTTP request and response service, and the webcode.me, which is 
a tiny HTML page for testing.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 
Requests using GET should only retrieve data.

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

## Dart http

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

## Dart GET request

The following example creates a simple GET request in Dart. 

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
  var data = await fetchData();
  print(data);
}

In the example, we send a GET request to the webcode.me and print the response
body. 

import 'package:http/http.dart' as http;

The http package is imported.

Future&lt;String&gt; fetchData() async {

The fetchData is an asynchronous function which returns a future.

final resp = await http.get(Uri.http('webcode.me'));

A get request is created with http.get. The await
keyword gets the completed result of an asynchronous operation.

if (resp.statusCode == 200) {
    return resp.body;
} else {
    throw Exception('Failed to fetch data');
}

If the response status code is a success, we return the body of the response.

$ dart main.dart 
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;

## Dart GET with user agent

The User-Agent request header is a string that lets servers and network peers
identify the application, operating system, vendor, and/or version of the
requesting user agent. 

main.dart
  

import 'package:http/http.dart' as http;

Future&lt;String&gt; fetchData() async {
  final resp =
      await http.get(Uri.parse('http://webcode.me/ua.php'), headers: &lt;String, String&gt;{
    'User-Agent': 'Dart program',
  });

  return resp.body;
}

void main() async {
  var data = await fetchData();
  print(data);
}

In the GET request, we include the User-Agent header. The specified
URL simply returns the User-Agent string.

final resp =
    await http.get(Uri.parse('http://webcode.me/ua.php'), headers: &lt;String, String&gt;{
  'User-Agent': 'Dart program',
});

The second parameter of the http.get is the headers map, where
we include the User-Agent header.

$ dart main.dart 
Dart program

## Dart HTTP POST request JSON data

The following example sends a POST request with data in JSON format. 

main.dart
  

import 'dart:convert';

import 'package:http/http.dart' as http;

Future&lt;http.Response&gt; doPost() {
  return http.post(
    Uri.parse('http://httpbin.org/post'),
    headers: &lt;String, String&gt;{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(&lt;String, String&gt;{
      'name': 'John Doe',
      'occupation': 'gardener'
    }),
  );
}
void main() async {

  var user = await doPost();
  print(user.body);
}

We generate a POST request to the httpbin.org/post webpage. The data is encoded
into JSON with jsonEncode.

return http.post(

A POST request is created with http.post.

headers: &lt;String, String&gt;{
  'Content-Type': 'application/json; charset=UTF-8',
},

We set the Content-Type to application/json.

$ dart main.dart 
{
    "args": {}, 
    "data": "{\"name\":\"John Doe\",\"occupation\":\"gardener\"}", 
    "files": {}, 
    "form": {}, 
    "headers": {
    "Accept-Encoding": "gzip", 
    "Content-Length": "43", 
    "Content-Type": "application/json; charset=UTF-8", 
    "Host": "httpbin.org", 
    "User-Agent": "Dart/2.18 (dart:io)", 
    "X-Amzn-Trace-Id": "Root=1-63171a73-079b3a3c741be7087ae50902"
    }, 
    "json": {
        "name": "John Doe", 
        "occupation": "gardener"
    }, 
    ...
    "url": "http://httpbin.org/post"
}

## Dart HTTP POST request FORM data

With POST form request, the data is URL-encoded in the request body. The
Content-Type header is set to application/x-www-form-urlencoded.
The data is sent in the body of the request; the keys and values are encoded in
key-value tuples separated by '&amp;', with a '=' between the key and the value. 

main.dart
  

import 'package:http/http.dart' as http;

Future&lt;http.Response&gt; doPost() {
  return http.post(Uri.parse('https://httpbin.org/post'),
      headers: &lt;String, String&gt;{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "name=John%20Doe&amp;occupation=gardener");
}

void main() async {
  var user = await doPost();
  print(user.body);
}

We send a POST FORM request to the https://httpbin.org/post page.  

headers: &lt;String, String&gt;{
  'Content-Type': 'application/x-www-form-urlencoded',
},

The content type is set to application/x-www-form-urlencoded.

body: "name=John%20Doe&amp;occupation=gardener");

The data is URL encoded in the body.

$ dart main.dart 
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept-Encoding": "gzip", 
    "Content-Length": "35", 
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
    "Host": "httpbin.org", 
    "User-Agent": "Dart/2.18 (dart:io)", 
    "X-Amzn-Trace-Id": "Root=1-63171ba3-0ee639310c8b5040773c366b"
  }, 
  "json": null, 
  ...
  "url": "https://httpbin.org/post"
}

## Source

[Dart http documentation](https://pub.dev/documentation/http/latest/)

In this article we have created GET and POST requests in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).