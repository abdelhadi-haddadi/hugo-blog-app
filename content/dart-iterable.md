+++
title = "Dart Iterable"
date = 2025-08-29T19:52:01.396+01:00
draft = false
description = "Dart Iterable tutorial shows how to work with collections in Dart using Iterable interface."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Iterable

last modified April 4, 2025

In Dart, Iterable is a fundamental interface for representing collections of
elements that can be accessed sequentially. It provides powerful methods for
processing and transforming collections.

Iterable is lazy by default, meaning operations are only computed when needed.
Many Dart collections like List and Set implement the Iterable interface.

## Basic Iterable Operations

The most common Iterable operations include mapping, filtering, and reducing.
These form the basis of collection processing in Dart.

main.dart
  

void main() {
  var numbers = [1, 2, 3, 4, 5];
  
  // Mapping
  var squares = numbers.map((n) =&gt; n * n);
  print('Squares: $squares');
  
  // Filtering
  var evens = numbers.where((n) =&gt; n % 2 == 0);
  print('Evens: $evens');
  
  // Reducing
  var sum = numbers.reduce((a, b) =&gt; a + b);
  print('Sum: $sum');
}

This example shows three fundamental operations. map transforms each element,
where filters elements, and reduce combines elements into a single value.

$ dart main.dart
Squares: (1, 4, 9, 16, 25)
Evens: (2, 4)
Sum: 15

## Chaining Iterable Operations

Iterable methods can be chained to create complex processing pipelines. Each
operation returns a new Iterable.

main.dart
  

void main() {
  var words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
  
  var result = words
      .where((word) =&gt; word.length &gt; 4)
      .map((word) =&gt; word.toUpperCase())
      .take(3);
  
  print(result);
}

We filter words longer than 4 characters, convert them to uppercase, and take
the first 3 results. The operations execute lazily when the result is used.

$ dart main.dart
(BANANA, CHERRY, ELDERBERRY)

## Creating Custom Iterables

You can create custom Iterables by implementing the Iterable interface or using
sync* generator functions.

main.dart
  

Iterable&lt;int&gt; countDown(int from) sync* {
  for (int i = from; i &gt;= 0; i--) {
    yield i;
  }
}

void main() {
  var numbers = countDown(5);
  print(numbers);
  print(numbers.toList());
}

The sync* function creates a lazy Iterable that generates values on demand. The
yield keyword provides each value in the sequence.

$ dart main.dart
(5, 4, 3, 2, 1, 0)
[5, 4, 3, 2, 1, 0]

## Advanced Iterable Methods

Iterable provides many advanced methods like expand, fold, and any for complex
collection processing.

main.dart
  

void main() {
  var matrix = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  
  // Flatten matrix
  var flattened = matrix.expand((row) =&gt; row);
  print('Flattened: $flattened');
  
  // Check condition
  var hasNegative = flattened.any((n) =&gt; n &lt; 0);
  print('Has negative: $hasNegative');
  
  // Fold (like reduce but with initial value)
  var product = flattened.fold(1, (p, n) =&gt; p * n);
  print('Product: $product');
}

expand flattens nested collections, any checks if any element matches a condition,
and fold is a more flexible version of reduce with an initial value.

$ dart main.dart
Flattened: (1, 2, 3, 4, 5, 6)
Has negative: false
Product: 720

## Lazy Evaluation with Iterables

Iterables are lazy by default, meaning operations are only computed when needed.
This can improve performance for large collections.

main.dart
  

Iterable&lt;int&gt; generateNumbers() sync* {
  print('Generator started');
  for (int i = 1; i &lt;= 5; i++) {
    print('Yielding $i');
    yield i;
  }
}

void main() {
  var numbers = generateNumbers()
      .map((n) {
        print('Mapping $n');
        return n * 2;
      })
      .take(2);
  
  print('Created pipeline');
  print('First: ${numbers.first}');
  print('ToList: ${numbers.toList()}');
}

The example demonstrates lazy evaluation. Operations only execute when values
are actually needed, as shown by the print statements.

$ dart main.dart
Created pipeline
Generator started
Yielding 1
Mapping 1
First: 2
Yielding 2
Mapping 2
ToList: [2, 4]

## Best Practices

- **Lazy vs Eager:** Use toList() when you need eager evaluation.

- **Method Chaining:** Chain operations for readable pipelines.

- **Performance:** Be mindful of multiple iterations over the same Iterable.

- **Infinite Iterables:** Use take() to limit infinite sequences.

## Source

[Dart Iterable Documentation](https://api.dart.dev/stable/dart-core/Iterable-class.html)

This tutorial covered Dart's Iterable interface with practical examples
demonstrating its powerful collection processing capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).