+++
title = "Ruby"
date = 2025-08-29T20:03:12.573+01:00
draft = false
description = "This part of the Ruby tutorial describes the Ruby language."
image = "images/logo.png"
imageBig = "images/logo.png"
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../lexis/)

# Ruby

last modified October 18, 2023

In this part of the Ruby tutorial, we introduce the Ruby programming language.

## Goal

The goal of this tutorial is to get you started with the Ruby
programming language. The tutorial covers the core of the Ruby language, including
variables, expressions, collections, control structures and other core features.
It also describes some more advanced concepts like object-oriented programming and
regular expressions. It is not a complete coverage of the language.
The tutorial was created on Ubuntu Linux.

## Ruby

![logo.png](images/logo.png)

*Ruby* is a dynamic, reflective, general-purpose object-oriented programming language.
The original author is a Japanese programmer *Yukihiro Matsumoto*.
Ruby first appeared in 1995.

Ruby supports various programming paradigms. This includes object orientation, reflection,
imperative and reflective programming. Ruby language was influenced primarily by Perl,
Smalltalk, Eiffel, and Lisp. Unlike languages like Java, C# or C, Ruby has no official
specification. Instead the original C implementation of the Ruby language serves as a
de facto reference. There are other implementations of the Ruby language like JRuby,
IronRuby, or MacRuby.

The official web site is [ruby-lang.org](http://www.ruby-lang.org/).

## Ruby interactive interpreter

We can run Ruby statements in a script or in an interactive interpreter.
In this tutorial, we use the interactive Ruby session to demonstrate
some smaller code fragments. Larger code examples are to be put in
Ruby scripts.

$ irb
irb(main):001:0&gt; puts RUBY_VERSION
2.7.1
=&gt; nil

This is an example of the Ruby interactive session. We print the value of
a special RUBY_VERSION constant to the console. It is set to
the version of the current Ruby in use.

## Ruby scripts

We have our first simple example of a Ruby script.

first.rb
  

#!/usr/bin/ruby

# first.rb

puts "This is Ruby"

In this script, we print a message to the console.

#!/usr/bin/ruby

Every script in the UNIX starts with a shebang. The shebang is the first two
characters in the script: *#!*. The shebang is followed by the path
to the interpreter, which will execute our script. The /usr/bin/ is the
most common location for the Ruby interpreter. It could also be located in
/usr/local/bin/ or elsewhere.

# first.rb

Comments in Ruby are preceded by a # character.

puts "This is Ruby"

The puts method prints a string to the console.

$ which ruby
/usr/bin/ruby

The path to the Ruby interpreter can be found using the which command.

$ chmod +x first.rb
$ ./first.rb
This is Ruby

We make the script executable with the chmod command
and execute it.

## Sources

The following sources were used to create this tutorial:

  - [ruby-lang.org](http://www.ruby-lang.org/)

  - [ruby-doc.org](http://ruby-doc.org/)

  - [Ruby article on wikipedia.org](http://en.wikipedia.org/wiki/Ruby_(programming_language))

In this part of the Ruby tutorial, we have introduced the Ruby language.

[Contents](..)
[Next](../lexis/)