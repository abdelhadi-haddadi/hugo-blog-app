+++
title = "Dart Link"
date = 2025-08-29T19:52:02.509+01:00
draft = false
description = "Dart Link tutorial shows how to work with links and URIs in Dart using the Link class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Link

last modified April 4, 2025

The Link class in Dart provides a way to work with links and URIs.
It's part of the dart:html library for web applications.

Link represents an HTML anchor element (&lt;a&gt;) in the DOM.
It allows manipulation of link attributes and navigation behavior programmatically.

## Basic Definition

Link is a DOM element that represents a hyperlink. It inherits from
the Element class and provides link-specific properties.

Key features include href manipulation, target control, and click handling.
It's essential for dynamic web navigation in Dart applications.

## Creating a Basic Link

This example shows how to create and add a simple link to a web page.

main.dart
  

import 'dart:html';

void main() {
  var link = LinkElement()
    ..href = 'https://dart.dev'
    ..text = 'Visit Dart Website'
    ..target = '_blank';
  
  document.body?.children.add(link);
}

We create a LinkElement, set its href, text content, and target
attributes. The link opens in a new tab when clicked due to the '_blank' target.

## Modifying Existing Links

This example demonstrates modifying attributes of an existing link.

main.dart
  

import 'dart:html';

void main() {
  var link = querySelector('#myLink') as LinkElement;
  
  link.href = 'https://pub.dev';
  link.text = 'Dart Packages';
  link.style.color = 'blue';
  
  link.onClick.listen((e) {
    e.preventDefault();
    window.alert('Navigation prevented!');
  });
}

We select an existing link by ID and modify its properties. We also add a click
event listener that prevents default navigation and shows an alert.

## Creating Multiple Links Dynamically

This example shows how to create multiple links from a list of URLs.

main.dart
  

import 'dart:html';

void main() {
  var sites = {
    'Dart': 'https://dart.dev',
    'Flutter': 'https://flutter.dev',
    'Pub': 'https://pub.dev'
  };
  
  var container = DivElement();
  
  sites.forEach((name, url) {
    var link = LinkElement()
      ..href = url
      ..text = name
      ..style.margin = '10px';
    
    container.children.add(link);
    container.children.add(BRElement());
  });
  
  document.body?.children.add(container);
}

We create links from a map of site names and URLs. Each link is styled and added
to a container div with line breaks between them for better spacing.

## Link Click Tracking

This example demonstrates tracking link clicks for analytics.

main.dart
  

import 'dart:html';

void main() {
  var links = document.querySelectorAll('a');
  
  links.forEach((link) {
    link.onClick.listen((event) {
      var target = event.target as LinkElement;
      print('Clicked: ${target.href}');
      
      // Send analytics data
      window.console.log('Tracking click: ${target.href}');
    });
  });
}

We attach click handlers to all links on the page. When clicked, the link's href
is logged to the console, simulating analytics tracking.

## Creating a Download Link

This example shows how to create a link that triggers a file download.

main.dart
  

import 'dart:html';

void main() {
  var downloadLink = LinkElement()
    ..href = 'data:text/plain;charset=utf-8,Hello%20World'
    ..text = 'Download Text File'
    ..download = 'example.txt';
  
  document.body?.children.add(downloadLink);
}

We create a link with a data URI as its href and set the download attribute.
This forces the browser to download the content as a file instead of navigating.

## Best Practices

- **Security:** Validate href values to prevent XSS attacks

- **Accessibility:** Provide meaningful link text

- **Performance:** Use event delegation for many links

- **SEO:** Ensure important links are crawlable

## Source

[Dart LinkElement Documentation](https://api.dart.dev/stable/dart-html/LinkElement-class.html)

This tutorial covered Dart's Link class with practical examples showing link
creation, modification, event handling, and special use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).