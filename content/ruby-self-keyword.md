+++
title = "Ruby self Keyword"
date = 2025-08-29T20:11:30.738+01:00
draft = false
description = "Ruby self tutorial explains how to use the self keyword with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby self Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's self keyword. The
self keyword is fundamental to Ruby's object-oriented nature.

The self keyword refers to the current object, the default receiver
of method calls. It changes context depending on where it's used in the code.

Understanding self is crucial for writing idiomatic Ruby code. It
affects method definitions, class methods, and instance variable access.

## Basic self in Instance Methods

In instance methods, self refers to the instance of the class.
This example shows how to use self to access instance variables.

basic_instance.rb
  

class Person
  def initialize(name)
    @name = name
  end
  
  def introduce
    puts "Hello, my name is #{self.name}"
  end
  
  def name
    @name
  end
end

person = Person.new("Alice")
person.introduce

Here self.name calls the name getter method on the current instance.
The self keyword makes it explicit we're calling a method.

## self in Class Methods

In class method definitions, self refers to the class itself.
This is how Ruby defines class-level methods.

class_methods.rb
  

class Logger
  def self.info(message)
    puts "[INFO] #{message}"
  end
  
  def self.error(message)
    puts "[ERROR] #{message}"
  end
end

Logger.info("Application started")
Logger.error("Something went wrong")

The self. prefix defines methods on the class itself rather than
instances. These are called directly on the class.

## self for Method Chaining

Returning self from methods enables method chaining. This creates
a fluent interface where methods can be called in sequence.

method_chaining.rb
  

class Calculator
  def initialize(value = 0)
    @value = value
  end
  
  def add(num)
    @value += num
    self
  end
  
  def subtract(num)
    @value -= num
    self
  end
  
  def result
    @value
  end
end

calc = Calculator.new
puts calc.add(5).subtract(2).add(10).result

Each method returns self, allowing calls to be chained together.
The final result call returns the computed value.

## self in Module Definitions

Inside modules, self refers to the module itself. This is used to
define module-level methods and constants.

module_self.rb
  

module MathUtils
  def self.square(x)
    x * x
  end
  
  def self.cube(x)
    x * x * x
  end
end

puts MathUtils.square(5)
puts MathUtils.cube(3)

Module methods defined with self are called directly on the module.
They don't require mixing the module into a class.

## self for Explicit Receiver

Using self as an explicit receiver clarifies method calls and
distinguishes between local variables and method calls.

explicit_receiver.rb
  

class BankAccount
  attr_accessor :balance
  
  def initialize(balance = 0)
    @balance = balance
  end
  
  def deposit(amount)
    self.balance += amount
  end
  
  def withdraw(amount)
    self.balance -= amount
  end
end

account = BankAccount.new(100)
account.deposit(50)
account.withdraw(30)
puts account.balance

Here self.balance calls the setter method, while balance
alone would reference a local variable. The explicit receiver avoids ambiguity.

## self in Singleton Methods

self is used to define singleton methods on individual objects.
These methods exist only for that specific instance.

singleton_methods.rb
  

greeting = "Hello, world"

def greeting.shout
  self.upcase + "!"
end

puts greeting.shout
puts greeting.upcase

begin
  "Another string".shout
rescue =&gt; e
  puts "Error: #{e.message}"
end

The shout method is only available on the greeting
object. Other strings don't have this method, as shown by the error.

## self in Class Definitions

Inside a class definition but outside methods, self refers to
the class being defined. This is used for metaprogramming.

class_definition.rb
  

class Animal
  puts "In Animal class definition, self is #{self}"
  
  def self.species
    puts "Species method called on #{self}"
  end
  
  def initialize
    puts "In instance method, self is #{self}"
  end
end

Animal.species
animal = Animal.new

The output shows how self changes context. Inside the class
definition, it's the class itself, while in instance methods it's the instance.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's self keyword with practical examples showing
instance methods, class methods, method chaining, and more.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).