+++
title = "Dart runes"
date = 2025-08-29T19:52:20.625+01:00
draft = false
description = "Dart runes tutorial shows how to work with runes in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart runes

last modified January 28, 2024

In this article we show how to work with runes in Dart.

A *string* is a sequence of UTF-16 code units. Strings represent some
text in a program. A character may be represented by multiple code points. Each
code point can have one or two code units.  A *code point* is a numerical
offset in a character set. Each code point is a number whose meaning is given by
the Unicode standard.

A *grapheme* is the smallest unit of a writing system of any given
language. An individual grapheme may or may not carry meaning by itself, and may
or may not correspond to a single phoneme of the spoken language. The term
*character* has been used to represent a single character in the original
ASCII table. This table, however, can represent a limited set of characters.
Outside of the ASCII table it is better to use the term grapheme instead of the
term character.

A *rune* is an integer representing a Unicode code point. The runes
property of a string returns its runes. The term was borrowed from Go. The
runes property of a string returns the Unicode code points of a
string. To express a Unicode code point, the \uXXXX syntax is used,
where XXXX is a 4-digit hexadecimal value. If a Unicode code point requires more
than 4 digits, we place the value in curly brackets.

 

The bytes are the actual information stored for the string contents. Each code
point can require one or more bytes of storage depending on the Unicode standard
being used (UTF-8, UTF-16, etc.).

The characters package contains functions for more advanced
manipulation of Unicode graphemes.

## Dart runes simple example

The following simple example works with runes.

main.dart
  

void main() {
  final msg = 'an old falcon';
  print(msg.codeUnits);

  for (final rune in msg.runes) {
    print(rune);
  }
}

The codePoints attribute returns a list of code points, while the 
runes property provides an iterable over the code points/runes.

$ dart main.dart
[97, 110, 32, 111, 108, 100, 32, 102, 97, 108, 99, 111, 110]
97
110
32
111
108
100
32
102
97
108
99
111
110

## Dart String.fromCharCode

The String.fromCharCode turns a code point into a grapheme.

main.dart
  

void main() {
  final msg = "one 🐘 and three 🐋";

  for (final rune in msg.runes) {
      stdout.write("${String.fromCharCode(rune)} ");
  }
}

In the example, we go through the string runes. We use the
String.fromCharCode member function to transform each rune into a
grapheme.

$ dart main.dart
o n e   🐘   a n d   t h r e e   🐋 

## Dart emojis

The following example displays four emojis.

main.dart
  

void main() {
  final c1 = '\u{1F9F6}';
  final c2 = '\u{1FA86}';
  final c3 = '\u26C4';
  final c4 = '\u{1F37A}';

  print(c1);
  print(c2);
  print(c3);
  print(c4);

  print(c3.codeUnits);
  print(c4.codeUnits);
}

The emojis are expressed using the special syntax with hexadecimal values.

$ dart emojis.dart
🧶
🪆
⛄
🍺
[9924]
[55356, 57210]

Note that the fourth emoji uses two code points.

## Dart runes length

With the length property, we can determine the length of a string 
or the corresponding runes attribute.

main.dart
  

void main() {
  final msg = 'one 🐘 and three 🐋';

  print(msg.length);
  print(msg.runes.length);
}

We have a string consisting of ASCII characters and two emojis.

print(msg.length);
print(msg.runes.length);

We access the length property of the string object and its
runes attribute.

$ dart main.dart
19
17

The runes.length gives the correct answer; there are 17 graphemes 
in the string.

In the next example, we count the graphemes of different writing systems.

main.dart
  

void main() {
  final msg1 = "falcon";
  final msg2 = "вишня";
  final msg3 = "🐺🦊🦝";
  final msg4 = "नमस्ते";

  print(msg1.length);
  print(msg2.runes.length);
  print(msg3.runes.length);
  print(msg4.runes.length);
}

In the program, we count the number of graphemes in ASCII, Cyrillic, and
Sanskrit and emojis.

$ dart main.dart
6
5
3
6

The example gives correct results for all except for the Sanskrit. For more
complex examples, we need to use the characters package.

## Dart characters

The characters package supports Unicode (extended) grapheme
clusters.

$ dart pub add characters

We add the package to the project.

main.dart
  

import 'package:characters/characters.dart';

void main() {
  final m1 = "🐺🦊🦝";
  final m2 = "вишня";
  final m3 = "नमस्ते";

  print(m1.characters.length);
  print(m2.characters.length);
  print(m3.characters.length);

  print(m3.characters.first);
  print(m3.characters.last);

  for (final e in m3.characters) {
    print(e);
  }
}

In the program, we count the graphemes of emojis and Cyrillic and Sanskrit text.

import 'package:characters/characters.dart';

The package is imported.

print(m1.characters.length);
print(m2.characters.length);
print(m3.characters.length);

The package gives us the characters attribute.

print(m3.characters.first);
print(m3.characters.last);

We get the first and last grapheme of the Sanskrit text.

for (final e in m3.characters) {
  print(e);
}

We print all its graphemes.

$ dart main.dart
3
5
4
न
ते
न
म
स्
ते

Now we get correct results.

## Source

[Dart Runes - language reference](https://api.dart.dev/stable/3.2.6/dart-core/Runes-class.html)

In this article we covered Dart runes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).