+++
title = "Dart XML"
date = 2025-08-29T19:52:35.157+01:00
draft = false
description = "Dart XML tutorial shows how to work with XML data in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart XML

last modified January 28, 2024

In this article we show how to work with XML data in Dart language. We read
and build XML data.

Extensible Markup Language (XML) is a markup language that defines a
set of rules for encoding documents in a format that is both human-readable and
machine-readable. XML is often used for application configuration, data storage
and exchange.

XML is similar to HTML, but does not have predefined tags; we can design our
own tags.

In Dart, we use the package:xml/xml.dart to work with XML.

$ dart pub add xml

We add the package to the project structure.

## Dart XML simple example

In the first example, we read XML data from a string with
XmlDocument.parse. The method returns an XmlDocument
for the given input string.

simple.dart
  

import 'package:xml/xml.dart';

void main() {
  var data = '''&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;value&gt;6&lt;/value&gt;''';

  var xdoc = XmlDocument.parse(data);

  print(xdoc);

  print('------------------');

  print(xdoc.findAllElements('value').first);
}

The example parses the XML data and prints the whole document to the terminal.
We also find the value element and print it.

$ dart simple.dart
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;value&gt;6&lt;/value&gt;
------------------
&lt;value&gt;6&lt;/value&gt;

## Dart read XML from file

In the next example, we read XML data from a file.

books.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;bookstore&gt;
    &lt;book genre='Science Fiction'&gt;
        &lt;title&gt;Dune&lt;/title&gt;
        &lt;author&gt;Frank Herbert&lt;/author&gt;
        &lt;price&gt;8.99&lt;/price&gt;
    &lt;/book&gt;
    &lt;book genre='Novel'&gt;
        &lt;title&gt;Old Goriot&lt;/title&gt;
        &lt;author&gt;Honoré de Balzac&lt;/author&gt;
        &lt;price&gt;9.0&lt;/price&gt;
    &lt;/book&gt;
&lt;/bookstore&gt;

We have this books.xml file.

read_file.dart
  

import 'dart:io';

import 'package:xml/xml.dart';

void main() {
  var file = new File('books.xml');
  String data = file.readAsStringSync();

  var xdoc = XmlDocument.parse(data);

  print(xdoc);
}

We import the dart:io package and read the contents of the file
with the File's readAsStringSync method.

var xdoc = XmlDocument.parse(data);

We parse the data into an XML document with XmlDocument.parse.

$ dart read_file.dart
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;bookstore&gt;
    &lt;book genre='Science Fiction'&gt;
        &lt;title&gt;Dune&lt;/title&gt;
        &lt;author&gt;Frank Herbert&lt;/author&gt;
        &lt;price&gt;8.99&lt;/price&gt;
    &lt;/book&gt;
    &lt;book genre='Novel'&gt;
        &lt;title&gt;Old Goriot&lt;/title&gt;
        &lt;author&gt;Honoré de Balzac&lt;/author&gt;
        &lt;price&gt;9.0&lt;/price&gt;
    &lt;/book&gt;
&lt;/bookstore&gt;

## Dart XML where

The where method returns a lazy iterable from the document which
satisfies the given predicate.

where_fun.dart
  

import 'dart:io';

import 'package:xml/xml.dart';

void main() async {
  var file = new File('books.xml');
  String data = file.readAsStringSync();

  var xdoc = XmlDocument.parse(data);

  xdoc.descendants
      .where((e) =&gt; e.getAttribute('genre') == 'Novel')
      .forEach(print);
}

We loop through the descendants and get all elements which contain the attribute
genre.

$ dart where_fun.dart
&lt;book genre='Novel'&gt;
    &lt;title&gt;Old Goriot&lt;/title&gt;
    &lt;author&gt;Honoré de Balzac&lt;/author&gt;
    &lt;price&gt;9.0&lt;/price&gt;
&lt;/book&gt;

## Dart XML findAllElements

The findAllElements method returns a lazy iterable of the recursive
child elements in document order with the specified tag name.

find_all.dart
  

import 'dart:io';

import 'package:xml/xml.dart';

void main() async {
  var file = new File('books.xml');
  String data = file.readAsStringSync();

  var xdoc = XmlDocument.parse(data);
  var books = xdoc.findAllElements('book');

  books
      .map((e) =&gt; e.text.trim().replaceAll(RegExp(r'\s+'), ' '))
      .forEach((e) =&gt; print("$e "));

  print('----------------');

  books.map((e) =&gt; e.findAllElements('title').single.text).forEach(print);
}

In the example, we find all the text data of the book elements and then later 
all the titles.

$ dart find_all.dart 
Dune Frank Herbert 8.99 
Old Goriot Honoré de Balzac 9.0 
----------------
Dune
Old Goriot

## Dart build XML document

XML documents can be built with XmlBuilder.

builder.dart
  

import 'package:xml/xml.dart';

void main() {
  var xdoc = buildXml();
  print(xdoc.toXmlString(pretty: true, indent: '  '));
}

XmlDocument buildXml() {
  var builder = new XmlBuilder();
  builder.processing('xml', 'version="1.0" encoding="utf-8"');
  builder.element('bookstore', nest: () {
    builder.element('book', nest: () {
      builder.attribute('genre', 'Science Fiction');
      builder.element('title', nest: 'Dune');
      builder.element('author', nest: 'Frank Herbert');
      builder.element('price', nest: 8.99);
    });

    builder.element('book', nest: () {
      builder.attribute('genre', 'Novel');
      builder.element('title', nest: 'Old Goriot');
      builder.element('author', nest: 'Honoré de Balzac');
      builder.element('price', nest: 9.0);
    });
  });

  return builder.buildDocument();
}

The example creates a bookstore XML document.

var builder = new XmlBuilder();

We create an instance of the XmlBuilder.

builder.element('bookstore', nest: () {
    builder.element('book', nest: () {
        builder.attribute('genre', 'Science Fiction');
        builder.element('title', nest: 'Dune');
        builder.element('author', nest: 'Frank Herbert');
        builder.element('price', nest: 8.99);
    });

A new element is created with element. Nested elements are created 
via the nest attribute.

return builder.buildDocument();

The document is finalized with buildDocument.

$ dart builder.dart 
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;bookstore&gt;
    &lt;book genre="Science Fiction"&gt;
    &lt;title&gt;Dune&lt;/title&gt;
    &lt;author&gt;Frank Herbert&lt;/author&gt;
    &lt;price&gt;8.99&lt;/price&gt;
    &lt;/book&gt;
    &lt;book genre="Novel"&gt;
    &lt;title&gt;Old Goriot&lt;/title&gt;
    &lt;author&gt;Honoré de Balzac&lt;/author&gt;
    &lt;price&gt;9.0&lt;/price&gt;
    &lt;/book&gt;
&lt;/bookstore&gt;

## Source

[Dart xml library documentation](https://pub.dev/documentation/xml/latest/)

In this article we have worked with XML data in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).