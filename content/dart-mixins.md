+++
title = "Dart Mixins"
date = 2025-08-29T19:52:08.089+01:00
draft = false
description = "Dart mixins tutorial shows how to use mixins in Dart language to reuse code across multiple class hierarchies."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Mixins

last modified February 15, 2025

In this article, we show how to use **mixins** in Dart language.
Mixins are a way to reuse code across multiple class hierarchies without using
inheritance. They allow you to add functionality to a class without creating a
full parent-child relationship.

Mixins are particularly useful when you want to share behavior between classes
that don't share a common ancestor. They are declared using the
mixin keyword and can be added to a class using the
with keyword.

## Dart Mixins Simple Example

The following example demonstrates how to create and use a simple mixin in Dart.

main.dart
  

mixin Logging {
  void log(String message) {
    print('Log: $message');
  }
}

class User with Logging {
  String name;

  User(this.name);

  void greet() {
    log('User $name says hello!');
  }
}

void main() {
  final user = User('Alice');
  user.greet();
}

In this program, we define a mixin Logging that provides a
log method. We then use this mixin in the User class
to log a greeting message.

mixin Logging {
  void log(String message) {
    print('Log: $message');
  }
}

We define a mixin named Logging that contains a log
method.

class User with Logging {
  String name;

  User(this.name);

  void greet() {
    log('User $name says hello!');
  }
}

We create a User class that uses the Logging mixin
with the with keyword. The greet method uses the
log method from the mixin.

void main() {
  final user = User('Alice');
  user.greet();
}

We create an instance of the User class and call the
greet method, which logs a message.

$ dart main.dart
Log: User Alice says hello!

## Dart Mixins with Multiple Classes

Mixins can be used with multiple classes to share common behavior.

main.dart
  

mixin Logging {
  void log(String message) {
    print('Log: $message');
  }
}

class User with Logging {
  String name;

  User(this.name);

  void greet() {
    log('User $name says hello!');
  }
}

class Admin with Logging {
  String name;

  Admin(this.name);

  void announce() {
    log('Admin $name makes an announcement!');
  }
}

void main() {
  final user = User('Alice');
  user.greet();

  final admin = Admin('Bob');
  admin.announce();
}

In this program, we use the Logging mixin in both the
User and Admin classes to share logging functionality.

class User with Logging {
  String name;

  User(this.name);

  void greet() {
    log('User $name says hello!');
  }
}

class Admin with Logging {
  String name;

  Admin(this.name);

  void announce() {
    log('Admin $name makes an announcement!');
  }
}

Both the User and Admin classes use the
Logging mixin to log messages.

$ dart main.dart
Log: User Alice says hello!
Log: Admin Bob makes an announcement!

## Dart Mixins with Overriding

Mixins can override methods from the classes they are used in.

main.dart
  

mixin Logging {
  void log(String message) {
    print('Log: $message');
  }
}

class User with Logging {
  String name;

  User(this.name);

  void log(String message) {
    print('User Log: $message');
  }

  void greet() {
    log('User $name says hello!');
  }
}

void main() {
  final user = User('Alice');
  user.greet();
}

In this program, the User class overrides the log
method from the Logging mixin.

void log(String message) {
  print('User Log: $message');
}

The User class overrides the log method to provide
custom logging behavior.

$ dart main.dart
User Log: User Alice says hello!

## Dart Mixins with Constraints

Mixins can specify constraints using the on keyword to restrict
their usage to specific classes.

main.dart
  

class Person {
  String name;

  Person(this.name);
}

mixin Logging on Person {
  void log(String message) {
    print('Log: $name says $message');
  }
}

class User extends Person with Logging {
  User(String name) : super(name);

  void greet() {
    log('Hello!');
  }
}

void main() {
  final user = User('Alice');
  user.greet();
}

In this program, the Logging mixin is constrained to be used only
with classes that extend Person.

mixin Logging on Person {
  void log(String message) {
    print('Log: $name says $message');
  }
}

The Logging mixin uses the on keyword to specify that
it can only be used with classes that extend Person.

class User extends Person with Logging {
  User(String name) : super(name);

  void greet() {
    log('Hello!');
  }
}

The User class extends Person and uses the Logging mixin.

$ dart main.dart
Log: Alice says Hello!

## Source

[Dart Mixins - Language Documentation](https://dart.dev/language/mixins)

In this article, we have covered the basics of using mixins in Dart. Mixins are
a powerful feature for code reuse and can be used to share behavior across
multiple classes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).