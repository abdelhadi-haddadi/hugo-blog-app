+++
title = "Dart regular expressions"
date = 2025-08-29T19:52:19.509+01:00
draft = false
description = "Dart regex tutorial shows how to work with regular expressions in Dart."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart regular expressions

last modified January 28, 2024

In this article we show how to work with regular expressions in Dart.

Regular expressions are used for text searching and more advanced text
manipulation. We find them tools such as grep and sed, text editors such as vi
and Emacs, and programming languages.

RegExp is used to define a regular expression. Dart regular
expressions have the same syntax and semantics as JavaScript regular
expressions.

## Dart regex hasMatch

The hasMatch function checks whether the regular expression has a
match in the specified string.

main.dart
  

void main() {
  var words = &lt;String&gt;["Seven", "even", "Maven", "Amen", "eleven"];

  var rx = RegExp(r".even");

  for (var word in words) {
    if (rx.hasMatch(word)) {
      print("${word} does match");
    } else {
      print("${word} does not match");
    }
  }
}

In the example, we have five words in a list. We check which words match the
.even regular expression.

var rx = RegExp(r".even");

We define a regular expression with RegExp. The dot (.)
metacharacter stands for any single character in the text.

for (var word in words) {
  if (rx.hasMatch(word)) {
      print("${word} does match");
  } else {
      print("${word} does not match");
  }
}

We go over the elements of the list and check if the elements match the regular
expression with hasMatch.

$ dart main.dart
Seven does match
even does not match
Maven does not match
Amen does not match
eleven does match

## Dart regex alternation

The alternation operator | creates a regular expression with several choices.

main.dart
  

void main() {
  var words = [
    "Jane",
    "Thomas",
    "Robert",
    "Lucy",
    "Beky",
    "John",
    "Peter",
    "Andy"
  ];

  var rx = RegExp("Jane|Beky|Robert");

  words.forEach((word) {
    if (rx.hasMatch(word)) {
      print("the ${word} matches");
    }
  });
}

We have eight names in the list.

var rx = RegExp("Jane|Beky|Robert");

This regular expression looks for "Jane", "Beky", or "Robert" strings.

$ dart main.dart
the Jane matches
the Robert matches
the Beky matches

## Dart regex subpatterns

Subpatterns are patterns within patterns. Subpatterns are created with ()
characters.

main.dart
  

void main() {
  var words = [
    "book",
    "bookshelf",
    "bookworm",
    "bookcase",
    "bookish",
    "bookkeeper",
    "booklet",
    "bookmark"
  ];

  var rx = RegExp(r"^book(worm|mark|keeper)?$");

  for (var word in words) {
    if (rx.hasMatch(word)) {
      print("${word} does match");
    } else {
      print("${word} does not match");
    }
  }
}

We find all words that matches the subpatterns.

var rx = RegExp(r"^book(worm|mark|keeper)?$");

The regular expression uses a subpattern. It matches bookworm, bookmark,
bookkeeper, and book words.

$ dart main.dart
book does match
bookshelf does not match
bookworm does match
bookcase does not match
bookish does not match
bookkeeper does match
booklet does not match
bookmark does match

## Dart RegExp allMatches

The allMatches function finds all matches of the given regular
exressions.

main.dart
  

void main() {
  var text = 'The Sun was shining; I went for a walk.';

  var rx = RegExp(r"\w+");

  var found = rx.allMatches(text);
  print("There are ${found.length} words");

  found.forEach((match) {
    print("${match.group(0)} ${match.start}:${match.end}");
  });
}

In the example, we find all words in the text.

var rx = RegExp(r"\w+");

The regular expression matches all words; where a word is defined as a one or
more characters.

print("There are ${found.length} words");

We print the number of words.

found.forEach((match) {
  print("${match.group(0)} ${match.start}:${match.end}");
});

We iterate over all found matches and print them and their indexes.

$ dart mains.dart
There are 9 words
The 0:3
Sun 4:7
was 8:11
shining 12:19
I 21:22
went 23:27
for 28:31
a 32:33
walk 34:38

## Dart regex capturing groups

Round brackets are used to create capturing groups. This allows us to apply a
quantifier to the entire group or to restrict alternation to a part of the
regular expression. 

main.dart
  

void main() {
  var sites = ["webcode.me", "zetcode.com", "freebsd.org", "netbsd.org"];

  var rx = RegExp(r"(\w+)\.(\w+)");

  for (var site in sites) {
    var matches = rx.allMatches(site);
    matches.forEach((match) {
      print(match.group(0));
      print(match.group(1));
      print(match.group(2));
    });
    print('----------------------');
  }
}

In the example, we divide the domain names into two parts by using groups. 

var rx = RegExp(r"(\w+)\.(\w+)");

We define two groups with parentheses. The dot character is escaped because 
it is used in the literal meaning.

var matches = rx.allMatches(site);

We find all matches with allMatches.

print(match.group(0));
print(match.group(1));
print(match.group(2));

The groups are accessed via the group function. The default whole 
match is available with match.group(0).

$ dart main.dart 
webcode.me
webcode
me
----------------------
zetcode.com
zetcode
com
----------------------
freebsd.org
freebsd
org
----------------------
netbsd.org
netbsd
org
----------------------

## Source

[Dart Regex - language reference](https://api.flutter.dev/flutter/dart-core/RegExp-class.html)

In this article we covered Dart regular expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).