+++
title = "Ruby Protected Method"
date = 2025-08-29T20:11:27.361+01:00
draft = false
description = "Ruby protected method tutorial explains how to use protected visibility with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Protected Method

last modified April 27, 2025

This tutorial explains Ruby's protected method visibility in depth.
Protected methods offer controlled access between related objects.

The protected visibility allows methods to be called only by objects
of the same class or its subclasses. It sits between public and private access.

Protected methods enable controlled sharing within class hierarchies. They're
commonly used for internal comparisons and helper methods.

## Basic Protected Method Example

This example demonstrates the fundamental protected method behavior. The method
is accessible within the class hierarchy but not externally.

basic_protected.rb
  

class Person
  protected
  
  def greet
    "Hello from protected method"
  end
end

class Employee &lt; Person
  def call_greet
    greet  # Works - same class hierarchy
  end
end

person = Person.new
# person.greet  # Error - protected method called

employee = Employee.new
puts employee.call_greet  # Works through public method

The greet method is protected, so it can't be called directly on
person. However, Employee can access it through its
own public method.

## Protected Method for Object Comparison

Protected methods are ideal for comparing objects of the same class. This
example shows protected access between two Account objects.

account_comparison.rb
  

class Account
  attr_reader :balance
  
  def initialize(balance)
    @balance = balance
  end
  
  def &gt;(other_account)
    balance &gt; other_account.balance
  end
  
  protected :balance
end

account1 = Account.new(1000)
account2 = Account.new(500)

puts account1 &gt; account2  # true
# puts account1.balance  # Error - protected method

The balance reader is protected, allowing comparison between
Account objects while preventing direct access. This maintains encapsulation.

## Protected Access in Class Hierarchy

This example shows protected method access across a class hierarchy. Subclasses
can access protected methods from parent classes.

class_hierarchy.rb
  

class Vehicle
  protected
  
  def engine_details
    "V6 Turbo Engine"
  end
end

class Car &lt; Vehicle
  def show_engine
    "Car has: #{engine_details}"
  end
end

class Truck &lt; Vehicle
  def show_engine
    "Truck has: #{engine_details}"
  end
end

car = Car.new
puts car.show_engine

truck = Truck.new
puts truck.show_engine

Both Car and Truck can access the protected
engine_details method from their parent class. This promotes code
reuse while controlling access.

## Protected Method with Self

Protected methods can be called with an explicit receiver if it's the same type.
This example demonstrates protected method calls using self.

self_receiver.rb
  

class BankAccount
  def initialize(balance)
    @balance = balance
  end
  
  def transfer(other_account, amount)
    if valid_transfer?(other_account, amount)
      deduct(amount)
      other_account.add(amount)
    end
  end
  
  protected
  
  def valid_transfer?(other_account, amount)
    amount &gt; 0 &amp;&amp; @balance &gt;= amount
  end
  
  def add(amount)
    @balance += amount
  end
  
  def deduct(amount)
    @balance -= amount
  end
end

account1 = BankAccount.new(1000)
account2 = BankAccount.new(500)

account1.transfer(account2, 200)

The protected methods add and deduct can be called on
other BankAccount instances. This enables secure inter-object
operations while preventing external access.

## Protected vs Private Methods

This example contrasts protected and private method behavior. The key difference
is in receiver handling.

protected_vs_private.rb
  

class Test
  def call_protected(other)
    other.protected_method
  end
  
  def call_private(other)
    other.private_method  # Error - private method
  end
  
  protected
  
  def protected_method
    "Protected called"
  end
  
  private
  
  def private_method
    "Private called"
  end
end

test1 = Test.new
test2 = Test.new

puts test1.call_protected(test2)  # Works
# test1.call_private(test2)  # Fails

Protected methods allow explicit receivers of the same class, while private
methods don't. This is the fundamental distinction between them.

## Protected Class Methods

Protected visibility can also be applied to class methods. This example shows
protected class method usage.

protected_class_method.rb
  

class Configuration
  class &lt;&lt; self
    protected
    
    def database_settings
      { adapter: 'postgresql', host: 'localhost' }
    end
  end
  
  def self.get_settings
    database_settings  # Accessible within class
  end
end

puts Configuration.get_settings
# Configuration.database_settings  # Error - protected method

The protected class method database_settings is accessible within
the class but not externally. This pattern is useful for internal class logic.

## Protected Methods in Modules

Protected methods work similarly in modules. This example demonstrates protected
method behavior in an included module.

module_protected.rb
  

module Authenticable
  protected
  
  def generate_token
    SecureRandom.hex(20)
  end
end

class User
  include Authenticable
  
  def login
    @token = generate_token
    "Logged in with token: #{@token[0..5]}..."
  end
end

user = User.new
puts user.login
# user.generate_token  # Error - protected method

The protected generate_token method from the module is accessible
within User but not externally. This maintains security while
allowing method sharing.

## Source

[Ruby Methods Documentation](https://ruby-doc.org/3.4.1/syntax/methods_rdoc.html/)

This tutorial covered Ruby's protected method visibility with practical examples
showing object comparison, class hierarchies, and module usage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).