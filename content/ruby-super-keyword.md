+++
title = "Ruby super Keyword"
date = 2025-08-29T20:11:31.859+01:00
draft = false
description = "Ruby super keyword tutorial explains how to use super in method inheritance with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby super Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's super keyword in method
inheritance. The super keyword calls parent class methods from
child classes.

The super keyword invokes a method with the same name in the parent
class. It's essential for method overriding while preserving parent behavior.

super can be used with or without arguments. It automatically
forwards arguments when called without parentheses. This makes inheritance
flexible.

## Basic super Usage

This example shows the simplest use of super to extend a parent
class method. The child class adds behavior while keeping the parent's.

basic_super.rb
  

class Parent
  def greet
    puts "Hello from Parent"
  end
end

class Child &lt; Parent
  def greet
    super
    puts "Hello from Child"
  end
end

Child.new.greet

The super call executes the parent's greet method.
Then the child adds its own message. This pattern extends functionality.

## super With Arguments

When overriding methods with parameters, super can forward
arguments automatically or explicitly. This example demonstrates both approaches.

super_with_args.rb
  

class Calculator
  def add(x, y)
    x + y
  end
end

class ScientificCalculator &lt; Calculator
  def add(x, y)
    result = super
    puts "Calculation result: #{result}"
    result
  end
end

puts ScientificCalculator.new.add(5, 3)

super without parentheses forwards all arguments. The child class
enhances the method with logging while preserving the original calculation.

## super With Explicit Arguments

Sometimes you need to modify arguments before passing them to the parent.
This example shows explicit argument passing with super.

super_explicit_args.rb
  

class Animal
  def initialize(name)
    @name = name
  end
  
  def speak
    "#{@name} makes a sound"
  end
end

class Dog &lt; Animal
  def initialize(name, breed)
    super(name)
    @breed = breed
  end
  
  def speak
    "#{super} and barks loudly"
  end
end

dog = Dog.new("Rex", "Labrador")
puts dog.speak

The child class passes only name to parent's initialize. The
speak method combines parent and child behavior using super.

## super With No Parent Method

Calling super when no parent method exists raises an error. This
example shows how to handle such cases safely.

super_no_parent.rb
  

class Base
  # No method defined
end

class Derived &lt; Base
  def example
    super rescue puts "Parent has no example method"
    puts "Child method continues"
  end
end

Derived.new.example

The rescue clause prevents the program from crashing when super
finds no parent method. This defensive programming handles edge cases.

## super With Modules

super works with modules in the inheritance chain. This example
shows method lookup through included modules.

super_with_modules.rb
  

module Auditable
  def save
    puts "Audit log created"
    super
  end
end

class Document
  def save
    puts "Document saved"
  end
end

class Invoice &lt; Document
  include Auditable
end

Invoice.new.save

The super in Auditable calls Document's
save. Ruby's method lookup finds the next available implementation.

## super With Block

Methods accepting blocks can use super to pass the block to the
parent. This example demonstrates block forwarding.

super_with_block.rb
  

class Generator
  def generate
    yield "Base value"
  end
end

class EnhancedGenerator &lt; Generator
  def generate
    super do |value|
      yield "Enhanced #{value}"
    end
  end
end

EnhancedGenerator.new.generate { |v| puts "Received: #{v}" }

The child class modifies the block's input while preserving the parent's
generation pattern. super handles the block seamlessly.

## super in Singleton Methods

super works in singleton methods too. This advanced example shows
singleton method inheritance.

super_singleton.rb
  

class Person
  def name
    "John Doe"
  end
end

person = Person.new

def person.name
  "Mr. #{super}"
end

puts person.name

The singleton method calls the original instance method via super.
This pattern is useful for per-object customization.

## Source

[Ruby Classes and Modules Documentation](https://ruby-doc.org/core-3.1.2/doc/syntax/modules_and_classes_rdoc.html)

This tutorial covered Ruby's super keyword with examples showing
method inheritance, argument handling, and advanced usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).