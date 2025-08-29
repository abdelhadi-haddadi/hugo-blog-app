+++
title = "Dart Iterator"
date = 2025-08-29T19:52:01.389+01:00
draft = false
description = "Dart Iterator tutorial shows how to work with iterators in Dart using the Iterator interface."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Iterator

last modified June 7, 2025

In Dart, the Iterator interface serves as a fundamental mechanism
for accessing elements within a collection sequentially. It plays a crucial role
in Dart's iteration system, allowing developers to traverse lists, sets, maps,
and other iterable structures efficiently.

The Iterator interface defines two essential methods: 

moveNext() - Advances the iterator to the next element in the
collection. It returns true if there is another element available
and false if the end of the collection is reached.

current - Retrieves the current element of the iteration. This
property returns null if moveNext() has not been
called or if the iteration is complete.

In Dart, most collections implement the Iterable interface, which
provides an iterator through the iterator property. This allows
easy iteration over elements using a for-in loop,
forEach() method, or manually managing the iterator using
moveNext() and current.

The Iterator interface is particularly useful when working with
asynchronous or custom collections, where controlling iteration explicitly can
optimize performance and memory usage. By implementing Iterator,
developers can create tailored traversal logic for specialized data structures.

## Basic Iterator Usage

This example shows the fundamental way to use an iterator manually.

main.dart
  

void main() {
  var numbers = [1, 2, 3, 4, 5];
  var iterator = numbers.iterator;
  
  while (iterator.moveNext()) {
    print(iterator.current);
  }
}

We create an iterator from a list and use moveNext() to advance through elements.
The current property gives the current element. This is how for-in loops work
internally.

$ dart main.dart
1
2
3
4
5

## Custom Iterator Implementation

This example demonstrates creating a custom class that implements Iterator.

main.dart
  

class Countdown implements Iterator&lt;int&gt; {
  int _current = 5;
  
  @override
  int get current =&gt; _current;
  
  @override
  bool moveNext() {
    if (_current &gt; 0) {
      _current--;
      return true;
    }
    return false;
  }
}

void main() {
  var countdown = Countdown();
  
  while (countdown.moveNext()) {
    print(countdown.current);
  }
}

We implement the Iterator interface with a countdown from 5 to 0. moveNext()
decrements _current until it reaches 0. The current getter returns the value.

$ dart main.dart
4
3
2
1
0

## Iterable with Iterator

This example shows how to create a custom Iterable class that provides an
iterator.

main.dart
  

class FibonacciSequence implements Iterable&lt;int&gt; {
  final int count;
  
  FibonacciSequence(this.count);
  
  @override
  Iterator&lt;int&gt; get iterator =&gt; _FibonacciIterator(count);
}

class _FibonacciIterator implements Iterator&lt;int&gt; {
  final int count;
  int _current = 0;
  int _next = 1;
  int _position = 0;
  
  _FibonacciIterator(this.count);
  
  @override
  int get current =&gt; _current;
  
  @override
  bool moveNext() {
    if (_position &lt; count) {
      var newNext = _current + _next;
      _current = _next;
      _next = newNext;
      _position++;
      return true;
    }
    return false;
  }
}

void main() {
  var fib = FibonacciSequence(7);
  
  for (var num in fib) {
    print(num);
  }
}

We create a Fibonacci sequence generator. The Iterable provides an iterator that
generates numbers. This allows the class to be used in for-in loops.

$ dart main.dart
1
1
2
3
5
8
13

## Iterator with Complex Objects

This example shows using an iterator with a collection of custom objects.

main.dart
  

import 'dart:core';

class Book {
  final String title;
  final String author;

  Book(this.title, this.author);

  @override
  String toString() =&gt; '$title by $author';
}

class Library extends Iterable&lt;Book&gt; {
  final List&lt;Book&gt; _books = [];

  void add(Book book) =&gt; _books.add(book);

  @override
  Iterator&lt;Book&gt; get iterator =&gt; _books.iterator;
}

void main() {
  var library = Library();
  library.add(Book('Dart in Action', 'Manning'));
  library.add(Book('Flutter in Action', 'Manning'));
  library.add(Book('Effective Dart', 'Google'));

  for (var book in library) {
    print(book);
  }
}

We create a Library class that holds Books and extends Iterable.
The iterator comes from the underlying List. This pattern is common in
collection classes.

$ dart main.dart
Dart in Action by Manning
Flutter in Action by Manning
Effective Dart by Google

In the next example, we will see how to extend the IterableMixin
interface to create a custom iterable collection.

main.dart
  

import 'dart:collection';

class Book {
  final String title;
  final String author;
  
  Book(this.title, this.author);
  
  @override
  String toString() =&gt; '$title by $author';
}

class Library extends IterableMixin&lt;Book&gt; {
  final List&lt;Book&gt; _books = [];
  
  void add(Book book) =&gt; _books.add(book);
  
  @override
  Iterator&lt;Book&gt; get iterator =&gt; _books.iterator;
}

void main() {
  final library = Library()
    ..add(Book('Dart in Action', 'Manning'))
    ..add(Book('Flutter in Action', 'Manning'))
    ..add(Book('Effective Dart', 'Google'));

  // Using iterator directly
  final iterator = library.iterator;
  while (iterator.moveNext()) {
    print(iterator.current);
  }

  // Using Iterable methods
  print('\nBooks with "Action":');
  library
      .where((book) =&gt; book.title.contains('Action'))
      .forEach(print);

  print('\nBook titles:');
  library
      .map((book) =&gt; book.title.toUpperCase())
      .forEach(print);
}

 
We create a Library class that extends IterableMixin, which provides
a default implementation of the Iterable interface. This allows us
to focus on implementing the iterator method. The example shows
how to use the iterator directly and also demonstrates common Iterable methods
like where and map for filtering and transforming
elements.

The next example shows how to fully satisfy the Iterable interface
without relying on IterableMixin.

main.dart
  

class Book {
  final String title;
  final String author;

  Book(this.title, this.author);

  @override
  String toString() =&gt; '$title by $author';
}

class Library implements Iterable&lt;Book&gt; {
  final List&lt;Book&gt; _books = [];

  void add(Book book) =&gt; _books.add(book);

  @override
  bool any(bool Function(Book element) test) {
    for (var book in _books) {
      if (test(book)) return true;
    }
    return false;
  }

  @override
  Iterable&lt;R&gt; cast&lt;R&gt;() sync* {
    for (var book in _books) {
      yield book as R;
    }
  }

  @override
  bool contains(Object? element) =&gt; _books.contains(element);

  @override
  Book elementAt(int index) =&gt; _books.elementAt(index);

  @override
  bool every(bool Function(Book element) test) {
    for (var book in _books) {
      if (!test(book)) return false;
    }
    return true;
  }

  @override
  Iterable&lt;T&gt; expand&lt;T&gt;(Iterable&lt;T&gt; Function(Book element) f) sync* {
    for (var book in _books) {
      yield* f(book);
    }
  }

  @override
  Book get first =&gt; _books.first;

  @override
  Book firstWhere(bool Function(Book element) test, {Book Function()? orElse}) {
    for (var book in _books) {
      if (test(book)) return book;
    }
    if (orElse != null) return orElse();
    throw StateError('No element');
  }

  @override
  T fold&lt;T&gt;(T initialValue, T Function(T previousValue, Book element) combine) {
    var value = initialValue;
    for (var book in _books) {
      value = combine(value, book);
    }
    return value;
  }

  @override
  Iterable&lt;Book&gt; followedBy(Iterable&lt;Book&gt; other) sync* {
    yield* _books;
    yield* other;
  }

  @override
  void forEach(void Function(Book element) f) {
    for (var book in _books) {
      f(book);
    }
  }

  @override
  bool get isEmpty =&gt; _books.isEmpty;

  @override
  bool get isNotEmpty =&gt; _books.isNotEmpty;

  @override
  Iterator&lt;Book&gt; get iterator =&gt; _books.iterator;

  @override
  String join([String separator = '']) =&gt; _books.join(separator);

  @override
  Book get last =&gt; _books.last;

  @override
  Book lastWhere(bool Function(Book element) test, {Book Function()? orElse}) {
    for (var i = _books.length - 1; i &gt;= 0; i--) {
      if (test(_books[i])) return _books[i];
    }
    if (orElse != null) return orElse();
    throw StateError('No element');
  }

  @override
  int get length =&gt; _books.length;

  @override
  Iterable&lt;T&gt; map&lt;T&gt;(T Function(Book e) f) sync* {
    for (var book in _books) {
      yield f(book);
    }
  }

  @override
  Book reduce(Book Function(Book value, Book element) combine) {
    if (_books.isEmpty) throw StateError('No elements');
    var value = _books.first;
    for (var i = 1; i &lt; _books.length; i++) {
      value = combine(value, _books[i]);
    }
    return value;
  }

  @override
  Book get single {
    if (_books.length == 1) return _books.first;
    if (_books.isEmpty) throw StateError('No elements');
    throw StateError('More than one element');
  }

  @override
  Book singleWhere(bool Function(Book element) test, {Book Function()? orElse}) {
    Book? result;
    var found = false;
    for (var book in _books) {
      if (test(book)) {
        if (found) throw StateError('More than one element');
        result = book;
        found = true;
      }
    }
    if (!found) {
      if (orElse != null) return orElse();
      throw StateError('No element');
    }
    return result!;
  }

  @override
  Iterable&lt;Book&gt; skip(int count) sync* {
    for (var i = count; i &lt; _books.length; i++) {
      yield _books[i];
    }
  }

  @override
  Iterable&lt;Book&gt; skipWhile(bool Function(Book value) test) sync* {
    var skipping = true;
    for (var book in _books) {
      if (skipping &amp;&amp; test(book)) {
        continue;
      } else {
        skipping = false;
        yield book;
      }
    }
  }

  @override
  Iterable&lt;Book&gt; take(int count) sync* {
    var taken = 0;
    for (var book in _books) {
      if (taken++ &gt;= count) break;
      yield book;
    }
  }

  @override
  Iterable&lt;Book&gt; takeWhile(bool Function(Book value) test) sync* {
    for (var book in _books) {
      if (!test(book)) break;
      yield book;
    }
  }

  @override
  List&lt;Book&gt; toList({bool growable = true}) =&gt; List&lt;Book&gt;.from(_books, growable: growable);

  @override
  Set&lt;Book&gt; toSet() =&gt; Set&lt;Book&gt;.from(_books);

  @override
  Iterable&lt;Book&gt; where(bool Function(Book element) test) sync* {
    for (var book in _books) {
      if (test(book)) yield book;
    }
  }

  @override
  Iterable&lt;T&gt; whereType&lt;T&gt;() sync* {
    for (var book in _books) {
      if (book is T) yield book as T;
    }
  }
}

void main() {
  var library = Library();
  library.add(Book('Dart in Action', 'Manning'));
  library.add(Book('Flutter in Action', 'Manning'));
  library.add(Book('Effective Dart', 'Google'));

  for (var book in library) {
    print(book);
  }

  print('\nBooks with "Action":');
  for (var book in library.where((b) =&gt; b.title.contains('Action'))) {
    print(book);
  }
}

All required Iterable methods are implemented manually. This allows
the Library class to be used like any other iterable collection in
Dart. The example demonstrates iterating over the library and filtering books
based on a condition. This approach provides full control over the iteration
process and allows for custom behavior while still adhering to the Iterable
interface contract. This is useful when you need to create a custom collection
type that behaves like a standard iterable but has specific requirements or
optimizations. 

## Iterator Utilities

This example demonstrates useful iterator utilities like takeWhile and skipWhile.

main.dart
  

void main() {
  var numbers = [1, 3, 5, 2, 4, 6, 8, 7];
  
  print('Numbers while odd:');
  var oddIterator = numbers.takeWhile((n) =&gt; n.isOdd).iterator;
  while (oddIterator.moveNext()) {
    print(oddIterator.current);
  }
  
  print('\nNumbers after first even:');
  var afterEven = numbers.skipWhile((n) =&gt; n.isOdd).iterator;
  while (afterEven.moveNext()) {
    print(afterEven.current);
  }
}

We use takeWhile to get elements until a condition fails, and
skipWhile to skip elements until a condition fails. These methods
return new iterators.

$ dart main.dart
Numbers while odd:
1
3
5

Numbers after first even:
2
4
6
8
7

## Source

[Dart Iterator Documentation](https://api.dart.dev/stable/dart-core/Iterator-class.html)

This tutorial covered Dart's Iterator interface with practical examples showing
basic usage, custom implementations, and common patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).