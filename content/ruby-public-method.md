+++
title = "Ruby Public Method"
date = 2025-08-29T20:11:28.514+01:00
draft = false
description = "Ruby public method tutorial explains how to use public methods with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Public Method

last modified April 27, 2025

This tutorial explains how to use Ruby's public method. Public
methods form the interface of your classes and are accessible from anywhere.

The public keyword in Ruby defines methods that can be called from
anywhere in your program. By default, all methods in Ruby are public except
when explicitly marked otherwise.

Public methods represent the external interface of your classes. They should
be stable and well-documented as other code depends on them.

## Basic Public Method Example

This simple example demonstrates a basic public method in a Ruby class. Public
methods can be called on instances of the class.

basic_public.rb
  

class Greeter
  def say_hello
    puts "Hello, world!"
  end
end

greeter = Greeter.new
greeter.say_hello

The say_hello method is public by default. We can call it on any
Greeter instance. Public methods form the class's public API.

## Explicit Public Declaration

Ruby allows explicitly declaring methods as public using the public
keyword. This is useful after defining private or protected methods.

explicit_public.rb
  

class Calculator
  def add(a, b)
    a + b
  end

  private
  
  def secret_method
    puts "This is private"
  end
  
  public
  
  def multiply(a, b)
    a * b
  end
end

calc = Calculator.new
puts calc.add(2, 3)
puts calc.multiply(2, 3)

The multiply method is explicitly made public after the private
section. Both add and multiply are accessible.

## Public Class Methods

Class methods can also be public. These are called on the class itself rather
than instances. The self. prefix defines class methods.

public_class_method.rb
  

class Logger
  def self.log(message)
    puts "[LOG] #{message}"
  end
  
  def self.public_log(message)
    puts "[PUBLIC] #{message}"
  end
  
  private_class_method :log
end

Logger.public_log("System started")

Only public_log is accessible here. We made log private
using private_class_method. Public class methods are often used for
utility functions.

## Public Methods in Modules

Modules can define public methods that become available to classes that include
them. These methods become part of the including class's public interface.

module_public.rb
  

module Printable
  def print_info
    puts "Information: #{info}"
  end
  
  private
  
  def info
    "Sample data"
  end
end

class Document
  include Printable
end

doc = Document.new
doc.print_info

The print_info method is public and available on Document
instances. The private info method is only accessible within the
module.

## Public Accessor Methods

Ruby provides shortcuts for creating public getter and setter methods. These
are commonly used to expose instance variables.

accessor_methods.rb
  

class Person
  attr_reader :name
  attr_writer :age
  attr_accessor :occupation
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def display
    puts "#{@name}, #{@age}, #{@occupation}"
  end
end

person = Person.new("John", 30)
person.occupation = "Developer"
puts person.name
person.display

attr_reader creates a public getter, attr_writer a
public setter, and attr_accessor both. These are all public methods.

## Public Method Overriding

Public methods can be overridden in subclasses. This allows modifying or
extending behavior while maintaining the same interface.

method_override.rb
  

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

class Cat &lt; Animal
  def speak
    super
    puts "Meow!"
  end
end

Dog.new.speak
Cat.new.speak

Both Dog and Cat override the public speak
method. Cat calls the parent implementation using super.

## Public Method Aliasing

Ruby allows creating aliases for public methods. This is useful when you want
to provide alternative names for methods.

method_alias.rb
  

class StringFormatter
  def format_text(text)
    text.upcase
  end
  
  alias :upcase_text :format_text
  alias_method :uc_text, :format_text
end

formatter = StringFormatter.new
puts formatter.format_text("hello")
puts formatter.upcase_text("world")
puts formatter.uc_text("ruby")

Both alias and alias_method create new names for the
public method. All aliases remain public and can be called interchangeably.

## Source

[Ruby Visibility Documentation](https://ruby-doc.org/3.4.1/syntax/visibility_rdoc.html)

This tutorial covered Ruby's public methods with practical examples showing
declaration, access control, and common usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).