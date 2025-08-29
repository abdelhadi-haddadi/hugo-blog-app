+++
title = "Ruby Class Keyword"
date = 2025-08-29T20:11:19.471+01:00
draft = false
description = "Ruby class keyword tutorial explains how to define and use classes with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Class Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's class keyword to create
object-oriented programs. Classes are fundamental building blocks in Ruby.

The class keyword defines a new class in Ruby. Classes encapsulate
data and behavior into reusable components. They support inheritance and mixins.

Ruby classes can contain methods, constants, and other class definitions.
Everything in Ruby is an object, and classes define object blueprints.

## Basic Class Definition

This example shows the simplest class definition in Ruby. The class contains
a single method that outputs a greeting.

basic_class.rb
  

class Greeter
  def greet
    puts "Hello, Ruby!"
  end
end

g = Greeter.new
g.greet

The class keyword starts the definition, followed by the class name.
We create an instance with new and call its greet method.
Class names should be constants (start with uppercase).

## Class with Initialize Method

The initialize method serves as the constructor in Ruby classes.
It runs when a new instance is created. This example customizes the greeting.

initialize_method.rb
  

class Person
  def initialize(name)
    @name = name
  end

  def greet
    puts "Hello, #{@name}!"
  end
end

p = Person.new("John")
p.greet

The initialize method takes a name parameter. Instance variables
(@name) store object state. We pass arguments to new
which forwards them to initialize.

## Class Inheritance

Ruby supports single inheritance using the &lt; operator. This
example shows a base class and a derived class sharing behavior.

inheritance.rb
  

class Animal
  def speak
    puts "Animal sound"
  end
end

class Dog &lt; Animal
  def speak
    puts "Woof!"
  end
end

a = Animal.new
a.speak

d = Dog.new
d.speak

Dog inherits from Animal but overrides the speak
method. Ruby looks up methods in the current class first, then parent classes.

## Class Variables and Methods

Class variables (@@) are shared among all instances. Class methods
are defined with self. prefix. This tracks instance count.

class_vars_methods.rb
  

class Counter
  @@count = 0

  def initialize
    @@count += 1
  end

  def self.total
    @@count
  end
end

3.times { Counter.new }
puts "Total instances: #{Counter.total}"

@@count increments with each new instance. The class method
total returns the count. Class methods are called on the class itself.

## Accessor Methods

Ruby provides shortcuts for getter/setter methods. attr_reader,
attr_writer, and attr_accessor simplify attribute access.

accessors.rb
  

class Book
  attr_reader :title
  attr_accessor :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end

b = Book.new("Ruby Guide", "Jane Doe")
puts b.title
b.author = "John Smith"
puts b.author

attr_reader creates a getter, attr_accessor creates
both. The title is read-only while author can be changed.

## Modules as Mixins

Ruby classes can include modules to gain additional functionality. This example
shows a module mixed into a class.

mixins.rb
  

module Loggable
  def log(message)
    puts "[LOG] #{message}"
  end
end

class Product
  include Loggable

  def initialize(name)
    @name = name
    log "Created product: #{@name}"
  end
end

p = Product.new("Laptop")

The Product class gains the log method from the
Loggable module. Mixins provide multiple inheritance-like features.

## Singleton Classes

Ruby allows defining methods on individual objects using singleton classes.
This example adds a method to one specific instance.

singleton_class.rb
  

class Dog
  def bark
    puts "Woof!"
  end
end

d1 = Dog.new
d2 = Dog.new

def d1.special_bark
  puts "Special woof!"
end

d1.bark
d1.special_bark
d2.bark
# d2.special_bark # Would raise NoMethodError

d1 gets an additional method not available to other Dog
instances. Singleton classes are useful for object-specific behavior.

## Source

[Ruby Classes Documentation](https://ruby-doc.org/3.4.1/syntax/classes_rdoc.html/)

This tutorial covered Ruby's class keyword with examples demonstrating core OOP
features like inheritance, mixins, and singleton classes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).