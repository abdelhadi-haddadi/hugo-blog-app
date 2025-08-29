+++
title = "Ruby Private Method"
date = 2025-08-29T20:11:27.368+01:00
draft = false
description = "Ruby private method tutorial explains how to use private methods with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Private Method

last modified April 27, 2025

This tutorial explains how to use Ruby's private method modifier.
Private methods are an essential part of object-oriented programming in Ruby.

The private keyword makes methods accessible only within the class.
They cannot be called with an explicit receiver, only the current object (self).

Private methods enforce encapsulation by hiding implementation details. They help
create clean interfaces and prevent misuse of internal class functionality.

## Basic Private Method Example

This simple example demonstrates the basic usage of private methods in Ruby.
Private methods can only be called within the class definition.

basic_private.rb
  

class Person
  def greet
    puts "Hello, #{name}"
  end

  private
  
  def name
    "John Doe"
  end
end

person = Person.new
person.greet
# person.name # This would raise NoMethodError

The name method is private and can only be called internally.
Attempting to call it directly on an instance raises a NoMethodError.

## Private Method Calling Convention

Private methods can only be called without an explicit receiver. They must be
called on the implicit self or from within other methods.

private_convention.rb
  

class Calculator
  def add(a, b)
    validate(a)
    validate(b)
    a + b
  end

  private
  
  def validate(num)
    raise "Not a number" unless num.is_a?(Numeric)
  end
end

calc = Calculator.new
puts calc.add(5, 3)
# calc.validate(5) # This would raise NoMethodError

The validate method is private and used internally by add.
It cannot be called directly on a Calculator instance.

## Private Class Methods

To make class methods private, we need to use the private_class_method
method or define them within a class &lt;&lt; self block.

private_class.rb
  

class Logger
  def self.log(message)
    format_message(message)
  end

  private_class_method def self.format_message(msg)
    "[#{Time.now}] #{msg}"
  end
end

puts Logger.log("Test message")
# Logger.format_message("Test") # This would raise NoMethodError

The format_message class method is private and can only be called
internally by other class methods.

## Private Methods in Inheritance

Private methods are inherited by subclasses but remain private. They can be
called by subclass methods but not directly on instances.

inheritance.rb
  

class Animal
  def speak
    make_sound
  end

  private
  
  def make_sound
    "Generic animal noise"
  end
end

class Dog &lt; Animal
  def bark
    make_sound + " - Woof!"
  end
end

dog = Dog.new
puts dog.bark
# dog.make_sound # This would raise NoMethodError

The Dog class inherits the private make_sound method from Animal.
It can call it internally but not expose it directly.

## Private Methods with send

Ruby's send method can bypass private method restrictions. This
should be used cautiously as it breaks encapsulation.

private_send.rb
  

class Secret
  private
  
  def hidden_method
    "Top secret information"
  end
end

secret = Secret.new
# puts secret.hidden_method # Would raise NoMethodError
puts secret.send(:hidden_method)

While send can access private methods, this is generally considered
bad practice. It should only be used in special cases like testing.

## Private Methods in Modules

Modules can define private methods that become private when included in classes.
This is useful for creating reusable private functionality.

module_private.rb
  

module Validations
  def validate_presence(value)
    raise "Cannot be blank" if value.nil? || value.empty?
  end

  private :validate_presence
end

class User
  include Validations
  
  def save(name)
    validate_presence(name)
    puts "User saved"
  end
end

user = User.new
user.save("John")
# user.validate_presence("") # This would raise NoMethodError

The validate_presence method is private in the module and remains
private when included in the User class.

## Private Setter Methods

Setter methods (ending with =) must be explicitly made private since they can't
be called without a receiver by default.

private_setter.rb
  

class BankAccount
  def initialize(balance)
    self.balance = balance
  end

  def deposit(amount)
    self.balance += amount
  end

  private
  
  attr_reader :balance
  attr_writer :balance
end

account = BankAccount.new(100)
account.deposit(50)
# account.balance = 200 # This would raise NoMethodError

The balance setter is made private while still being usable within the class.
The reader is also private to fully encapsulate the balance attribute.

## Source

[Ruby Visibility Documentation](https://ruby-doc.org/3.4.1/syntax/visibility_rdoc.html)

This tutorial covered Ruby's private methods with practical examples showing
their usage in classes, modules, inheritance, and special cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).