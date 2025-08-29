+++
title = "Ruby prepend Method"
date = 2025-08-29T20:11:27.403+01:00
draft = false
description = "Ruby prepend method tutorial explains how to use this module inclusion method with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby prepend Method

last modified April 27, 2025

This tutorial explains how to use Ruby's prepend method. This
powerful module inclusion method alters method lookup order in classes.

The prepend method inserts a module before the class in the
ancestor chain. This means module methods override class methods with the
same name. It's the opposite of include.

Prepending is useful for method overriding, decoration, and aspect-oriented
programming. It allows clean separation of concerns while modifying behavior.
Multiple prepends stack in reverse order.

## Basic prepend Example

This simple example demonstrates how prepend changes method lookup order.
The module method takes precedence over the class method.

basic_prepend.rb
  

module Greeter
  def greet
    "Hello from module!"
  end
end

class Person
  prepend Greeter
  
  def greet
    "Hello from class!"
  end
end

puts Person.new.greet

The output shows the module's method is called, not the class's. This happens
because prepend puts Greeter before Person in the ancestor chain.

## Multiple prepend Calls

When multiple modules are prepended, they are inserted in reverse order.
The last prepended module appears first in the ancestor chain.

multiple_prepends.rb
  

module A
  def greet
    "A says: #{super}"
  end
end

module B
  def greet
    "B says: #{super}"
  end
end

class Person
  prepend A
  prepend B
  
  def greet
    "Hello!"
  end
end

puts Person.new.greet
puts Person.ancestors

The output shows B's method calls A's, which calls the original. The ancestors
list shows B comes before A, which comes before Person.

## prepend vs include

This example contrasts prepend with include. Include puts modules after the
class in the ancestor chain, while prepend puts them before.

prepend_vs_include.rb
  

module M
  def greet
    "Module says: #{super}"
  end
end

class Included
  include M
  
  def greet
    "Class says hello!"
  end
end

class Prepended
  prepend M
  
  def greet
    "Class says hello!"
  end
end

puts "Include: #{Included.new.greet}"
puts "Prepend: #{Prepended.new.greet}"
puts "Included ancestors: #{Included.ancestors}"
puts "Prepended ancestors: #{Prepended.ancestors}"

With include, the class method wins. With prepend, the module method wins.
The ancestors output shows the different method lookup orders.

## Using super with prepend

The super keyword works naturally with prepend, allowing chained
method calls. This enables powerful method decoration patterns.

super_with_prepend.rb
  

module Logging
  def save
    puts "Logging before save"
    super
    puts "Logging after save"
  end
end

class Document
  prepend Logging
  
  def save
    puts "Saving document..."
  end
end

Document.new.save

The Logging module wraps the original save method, adding behavior before and
after. This is a common prepend use case for cross-cutting concerns.

## prepend for Method Overriding

prepend can override methods from parent classes, not just the current class.
This example shows overriding an inherited method.

override_inherited.rb
  

class Animal
  def speak
    "Animal sound"
  end
end

module Loud
  def speak
    "#{super.upcase}!!!"
  end
end

class Dog &lt; Animal
  prepend Loud
  
  def speak
    "Woof"
  end
end

puts Dog.new.speak
puts Dog.ancestors

The Loud module overrides both Dog's speak and Animal's speak. The output shows
the module's version is called first, which can then call super.

## Dynamic prepend

prepend can be called at runtime, not just during class definition. This allows
dynamic modification of behavior.

dynamic_prepend.rb
  

module AdminFeatures
  def access
    "Admin access granted"
  end
end

class User
  def access
    "Regular user access"
  end
end

user = User.new
puts user.access

User.prepend(AdminFeatures)
puts user.access

After prepending AdminFeatures, even existing instances get the new behavior.
This demonstrates Ruby's dynamic nature and prepend's runtime effects.

## prepend in Real-world Use

This example shows a practical use case for prepend - adding caching to an
expensive calculation without modifying the original class.

caching_example.rb
  

module Cache
  def calculate
    @cache ||= {}
    @cache[inputs] ||= super
  end
  
  def inputs
    [@x, @y]
  end
end

class Calculator
  prepend Cache
  
  def initialize(x, y)
    @x = x
    @y = y
  end
  
  def calculate
    puts "Performing expensive calculation..."
    @x * @y
  end
end

calc = Calculator.new(5, 10)
puts calc.calculate
puts calc.calculate

The Cache module transparently adds memoization. The second calculate call
returns the cached result without recalculating. The original Calculator
remains unchanged.

## Source

[Ruby Module#prepend Documentation](https://ruby-doc.org/3.4.1/Module.html#method-i-prepend)

This tutorial covered Ruby's prepend method with practical examples showing
method overriding, decoration, and dynamic behavior modification.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).