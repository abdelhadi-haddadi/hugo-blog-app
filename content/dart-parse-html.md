+++
title = "Dart parse HTML"
date = 2025-08-29T19:52:10.332+01:00
draft = false
description = "Dart html tutorial shows how to parse HTML documents in Dart. We use the html package."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart parse HTML

last modified January 28, 2024

In this article we show how to parse HTML documents in Dart. We use the html 
package.

$ dart pub add html

We need to add the html library to the project.

## Dart parse local HTML file

In the first example, we parse an HTML file located on the disk.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
    &lt;h1&gt;My Document&lt;/h1&gt;

    &lt;p&gt;
        A simple document.
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the file to be parsed.

main.dart
  

import 'dart:io';
import 'package:html/parser.dart';

void main() {
  var file = new File('index.html');
  var data = file.readAsStringSync();

  var doc = parse(data);

  print(doc.head!.innerHtml);
}

We load the file and parse it. We print the inner HTML content of the
head tag.

import 'dart:io';
import 'package:html/parser.dart';

We import the IO library and the HTML parser.

var file = new File('index.html');
var data = file.readAsStringSync();

We read the contents of the file.

var doc = parse(data);

We parse the data into a document; this document can be processed with various 
member functions and attributes.

print(doc.head!.innerHtml);

We get and print the contents of the head tag.

$ dart main.dart

  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My title&lt;/title&gt;

## Dart parse HTML from web page

In the second example, we parse an HTML document from an external web page.

main.dart
  

import 'package:http/http.dart' as http;
import 'package:html/parser.dart';

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

  var doc = parse(data);
  print(doc.querySelector('title')!.text);
}

We mave a GET request to the webcode.me web page and retrieve the 
home page. We parse it and get its title.

print(doc.querySelector('title')!.text);

We retrive the text contents of the title tag with
querySelector.

$ dart main.dart
My html page

## Dart html querySelectorAll

The querySelectorAll member function finds all descendant elements
of this document that match the specified group of selectors.

main.dart
  

import 'package:http/http.dart' as http;
import 'package:html/parser.dart';

Future&lt;String&gt; fetchData() async {
  final resp = await http.get(Uri.parse('http://webcode.me/os.html'));

  if (resp.statusCode == 200) {
    return resp.body;
  } else {
    throw Exception('Failed to fetch data');
  }
}

void main() async {
  var data = await fetchData();

  var doc = parse(data);
  var lis = doc.querySelectorAll('li');

  lis.forEach((e) =&gt; {print(e.text)});
}

The program finds all li tags in the external HTML document and 
prints their text contents.

var lis = doc.querySelectorAll('li');

With querySelectorAll, we get all the li tags.

lis.forEach((e) =&gt; {print(e.text)});

We go through the list and print each element's title.

$ dart main.dart
Solaris
FreeBSD
Debian
NetBSD
Windows

## Source

[Dart html library documentation](https://pub.dev/documentation/html/latest/)

In this article we have covered HTML parsing in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).