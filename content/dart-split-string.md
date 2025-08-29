+++
title = "Dart split string"
date = 2025-08-29T19:52:27.295+01:00
draft = false
description = "Dart split string shows how to split strings in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart split string

last modified January 28, 2024

In this article we show how to split strings in Dart language.

List&lt;String&gt; split(Pattern pattern)

The split function splits the string at matches of the supplied
pattern and returns a list of substrings. The pattern may be a string or a
regular expression.

## Dart split string simple example

The following example splits a sentence into words.

main.dart
  

void main() {
  final text = "There is an old hawk in the sky";
  final words = text.split(' ');

  for (final word in words) {
    print("${word} has ${word.length} characters");
  }
}

In the program, we split a sentence into a list of words by a space character.

final text = "There is an old hawk in the sky";

We have a text message.

final words = text.split(' ');

We split the message into words. The pattern is a space.

for (final word in words) {
  print("${word} has ${word.length} characters");
}

We go over the list of words and print them and their size to the console.

$ dart main.dart
There has 5 characters
is has 2 characters
an has 2 characters
old has 3 characters
hawk has 4 characters
in has 2 characters
the has 3 characters
sky has 3 characters

## Dart split string with regex

In the next example, we split a string using a regular expression.

main.dart
  

void main() {
  final text = "falcon,eagle,forest;sky,cloud,water;rock,wind";
  final words = text.split(RegExp(r"[,;]"));

  for (final word in words) {
    print(word);
  }
}

In the example, we have a text in which words are separated by two characters:
command and semicolon. We want to split the string by both characters.

final words = text.split(RegExp(r"[,;]"));

We use a simple regular expression to split by both characters.

$ dart main.dart
falcon
eagle
forest
sky
cloud
water
rock
wind

## Dart split string by spaces

In the following example, we split string by spaces.

main.dart
  

void main() {
  final text = "There are\t\t many clouds   in the \n sky";
  final pattern = RegExp(r"\s+");

  final words = text.split(pattern);
  print(words);

  for (final word in words) {
    print(word);
  }
}

In the example, we have a string with multiple white spaces: tabs, single spaces
and new lines.

final pattern = RegExp(r"\s+");

We use a regular expression which works for one or more white spaces.

$ dart main.dart
[There, are, many, clouds, in, the, sky]
There
are
many
clouds
in
the
sky

## Dart split runes

The split function does not work for runes.

main.dart
  

import "dart:io";

void main() {
  final msg = "one 🐘 and three 🐋";
  final els = msg.split("");

  for (final e in els) {
    stdout.write("${e} ");
  }

  print('\n----------------------');

  for (final rune in msg.runes) {
    stdout.write("${String.fromCharCode(rune)} ");
  }
}

In order to enumerate runes, we need to use the runes property.

$ dart runes.dart
o n e   � �   a n d   t h r e e   � �
----------------------
o n e   🐘   a n d   t h r e e   🐋

## Dart splitMapJoin

The splitMapJoin function splits the string, converts its parts,
and combines them into a new string.

main.dart
  

void main() {

  final text = '''Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox.''';

  final res = text.splitMapJoin(RegExp(r"[fF]ox(es)?"),
      onMatch: (m) =&gt; '*${m.group(0)}*');

  print(res);
}

In the program, we use the splitMapJoin function to mark all
occurences of the fox word with star characters.

final res = text.splitMapJoin(RegExp(r"[fF]ox(es)?"),
    onMatch: (m) =&gt; '*${m.group(0)}*');

We supply a regular expression that matches all occurences of the word fox,
including the plural form and the form with the capital F letter. The
onMatch callback is called on each match. It is also possible to 
utilize the onNonMatch callback.

$ dart main.dart
*Foxes* are omnivorous mammals belonging to several genera
of the family Canidae. *Foxes* have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. *Foxes* live on every
continent except Antarctica. By far the most common and widespread species of
*fox* is the red *fox*.

## Source

[Dart split String method - language reference](https://api.flutter.dev/flutter/dart-core/String/split.html)

In this article we have covered splitting strings in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).