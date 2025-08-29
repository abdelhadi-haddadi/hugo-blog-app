+++
title = "Dart string"
date = 2025-08-29T19:52:29.555+01:00
draft = false
description = "Dart string tutorial shows how to work with strings in Dart language. A sequence of UTF-16 code units."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart string

last modified January 28, 2024

Dart string tutorial shows how to work with strings in Dart language. 

## Dart string

A string is a sequence of UTF-16 code units. It is used to represent some text
in a program. A character may be represented by multiple code points. Each code
point can have one or two code units.

Strings are immutable in Dart. There are methods such as
toLowerCase or split that return a modified string,
but the original string is intact.

A *rune* is an integer representing a Unicode code point. The
runes property of a string returns its runes.

A string in Dart is an object. There are several methods that we can call 
on a string object.

## Dart simple string

The following is a simple Dart program with strings.

main.dart
  

void main() {
  var text = "There are six falcons";
  print(text);

  var len = text.length;
  print('The string has ' + len.toString() + ' characters');

  var word = 'falcon ';
  print(word * 3);
}

String literals are delimited with single or double qoutes. 

var len = text.length;

The length property returns the length of the string, i.e. the
number of UTF-16 code units in the string. 

print('The string has ' + len.toString() + ' characters');

Strings can be concatenated with the + operator.

var word = 'falcon ';
print(word * 3);

The * operator multiplies strings.

$ dart main.dart
There are six falcons
The string has 21 characters
falcon falcon falcon 

## Dart string delimiters

Strings are delimited either with single or double qoutes. The quotes can 
be nested to create quotations or direct speech if needed.

main.dart
  

void main() {
  var text1 = "old falcon";
  var text2 = 'new book';

  var text3 = "This was a 'great movie'";
  var text4 = 'He said: "I saw an old man in the park.';

  print(text1);
  print(text2);
  print(text3);
  print(text4);
}

The example presents string delimiters in Dart.

$ dart main.dart
old falcon
new book
This was a 'great movie'
He said: "I saw an old man in the park.

## Dart string length

The length property returns the length of a string in code units.

main.dart
  

void main() {
  var word = 'čerešňa';

  print(word.length);
  print(word.codeUnits);
  print(word.runes);

  var word2 = "合気道";
  print(word2.length);
  print(word2.codeUnits);
  print(word2.runes);
}

In the example, we have two strings with wide characters. The length property
returns the number of visible characters. The codeUnits property
returns an unmodifiable list of the UTF-16 code units of this string. The
runes property returns an iterable of Unicode code-points of a
string.

$ dart main.dart
7
[269, 101, 114, 101, 353, 328, 97]
(269, 101, 114, 101, 353, 328, 97)
3
[21512, 27671, 36947]
(21512, 27671, 36947)

## Dart multiline string

Multiline strings are created with triple single or double quotes.

main.dart
  

void main() {
  var sonnet55 = '''
Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword nor war's quick fire shall burn
The living record of your memory.
'Gainst death and all-oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the Judgement that yourself arise,
You live in this, and dwell in lovers' eyes.''';

  print(sonnet55);
}

The example prints a verse created with triple single quotes. 

$ dart main.dart
Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword nor war's quick fire shall burn
The living record of your memory.
'Gainst death and all-oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the Judgement that yourself arise,
You live in this, and dwell in lovers' eyes.

## Dart string is immutable

A string cannot be modified. We can call methods that return a modified string.

main.dart
  

void main() {
  var text = "a red fox";

  var parts = text.split(' ');
  print(parts);

  print(text);
}

With the split method, we split the string at matches of pattern 
and return a list of substrings. The original string is preserved.

$ dart main.dart
[a, red, fox]
a red fox

## Dart string escape sequences

Escape sequences are special characters that have a specific meaning when used
within a string literal. For instance, the new-line \n escape
sequence causes the next character to appear on a new line. 

main.dart
  

void main() {
  var text1 = 'a red \n fox';
  var text2 = 'a red \t fox';
  var text3 = 'a red \b\b\b\b\b fox';
  var text4 = 'a red fox\ra brown fox';

  print(text1);
  print(text2);
  print(text3);
  print(text4);
}

In the example, we use several escape sequences. 

var text1 = 'a red \n fox';

The \n adds a newline.

var text2 = 'a red \t fox';

The \t inserts a new tab.

var text3 = 'a red \b\b\b\b\b fox';

The \b deletes the previous character.

var text4 = 'a red fox\ra brown fox';

The \r returns to the beginning of the string.

$ dart main.dart
a red 
 fox
a red    fox
a fox 
a brown fox

## Dart raw string

In raw strings, the escape characters are not interpreted. A raw string is 
created by prepending a string literal with the r character.

main.dart
  

void main() {
    print(r"falcon\tfalcon\tfalcon");
    print("becomes");
    print("falcon\tfalcon\tfalcon");
}

The example uses a raw string. 

$ dart main.dart 
falcon\tfalcon\tfalcon
becomes
falcon  falcon  falcon

## Dart string interpolation

String interpolation is the process of evaluating a string containing variables
and expressions. When an interpolated string is evaluated the variables and
expressions are replaced with their corresponding values. 

In Dart, the $  is used to interpolate variables and
${} expressions.

main.dart
  

void main() {
  var name = "John Doe";
  var occupation = "gardener";

  print("$name is a $occupation");

  var x = 12;
  var y = 14;

  print("${x} * ${y} = ${x * y}");
}

In the example, we interpolate two variables and an expression.

print("$name is a $occupation");

Variables are interpolated by prepending their names with the dollar sign.

print("${x} * ${y} = ${x * y}");

If we need to evaluate more complex expressions, we use ${}.

$ dart main.dart
John Doe is a gardener
12 * 14 = 168

If we need to output a dollar sign, we escape it: \$.

main.dart
  

void main() {
  var item = "beer";
  var price = 4.5;

  print("The price of a $item is \$$price");
}

The example prints the price of a beer in dollars.

$ dart main.dart 
The price of a beer is $4.5

## Dart string isEmpty/isNotEmpty

With isEmpty and isNotEmpty we can check if a string 
in Dart is empty or not empty, respectively.

main.dart
  

void main() {
  var word1 = '';
  var word2 = "falcon";

  if (word1.isEmpty) {
    print('word1 is empty');
  } else {
    print('word1 is not empty');
  }

  if (word2.isNotEmpty) {
    print('word2 is not empty');
  } else {
    print('word2 is empty');
  }
}

The example calls the methods on two words.

$ dart main.dart
word1 is empty
word2 is not empty

## Dart trim string

We can remove whitespace from the string with trim,
trimLeft, and trimRight methods.

main.dart
  

void main() {
  var word = "  falcon\t";
  print("|" + word + "|");
  print("|" + word.trim() + "|");
  print("|" + word.trimLeft() + "|");
  print("|" + word.trimRight() + "|");
  print("|" + word + "|");
}

The example uses the methods on a string which has leading and trailing
whitespace characters.

$ dart main.dart
|  falcon       |
|falcon|
|falcon |
|  falcon|
|  falcon       |

## Dart string iterate

We can iterate over the elements of a string with the help of the 
runes property and the String.fromCharCode method.

main.dart
  

void main() {
  var word = 'falcon';

  for (var c in word.runes) {
    print(String.fromCharCode(c));
  }
}

The example prints the characters of the 'falcon' word to the terminal; each on
a separate line. 

$ dart main.dart
f
a
l
c
o
n

## Source

[Dart String - language reference](https://api.flutter.dev/flutter/dart-core/String-class.html)

In this article we have covered strings in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).