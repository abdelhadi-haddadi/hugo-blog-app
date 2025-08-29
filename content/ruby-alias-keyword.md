+++
title = "Ruby alias Keyword"
date = 2025-08-29T20:11:16.736+01:00
draft = false
description = "Ruby alias keyword tutorial explains how to create method aliases with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby alias Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's alias keyword to create
method aliases. Method aliasing provides alternative names for existing methods.

The alias keyword creates a new name for an existing method. The
original method remains accessible. Aliases are permanent and affect all calls.

Aliasing is useful for backward compatibility, readability, or method
augmentation. It works with both instance and class methods. Aliases can be
defined inside classes or modules.

## Basic Method Aliasing

This example shows the simplest use of alias to create an
alternative method name. Both names refer to the same implementation.

basic_alias.rb
  

class Greeter
  def hello
    puts "Hello!"
  end
  
  alias hi hello
end

g = Greeter.new
g.hello  # =&gt; "Hello!"
g.hi     # =&gt; "Hello!"

The hi method becomes an exact copy of hello. Both
methods can be called interchangeably. The alias persists for all instances.

## Aliasing Built-in Methods

Ruby allows aliasing built-in methods. This example creates a more readable
name for the puts method.

builtin_alias.rb
  

alias say puts

say "This works like puts"
say 1, 2, 3

The say alias works exactly like puts, accepting
multiple arguments. Global aliases affect the entire program scope.

## Alias in Module Context

When used inside modules, alias affects all classes that include
the module. This demonstrates module method aliasing.

module_alias.rb
  

module Logging
  def log(message)
    puts "[LOG] #{message}"
  end
  
  alias record log
end

class Service
  include Logging
end

s = Service.new
s.log("Starting service")    # =&gt; "[LOG] Starting service"
s.record("Service started") # =&gt; "[LOG] Service started"

Both log and record methods are available to any
class including the Logging module. The alias works at the module
level.

## Method Augmentation with Alias

A common pattern uses alias to preserve original methods when
augmenting behavior. This example adds logging to an existing method.

augmentation.rb
  

class Calculator
  def add(x, y)
    x + y
  end
end

class EnhancedCalculator &lt; Calculator
  alias original_add add
  
  def add(x, y)
    puts "Adding #{x} and #{y}"
    original_add(x, y)
  end
end

calc = EnhancedCalculator.new
puts calc.add(3, 4)  # Logs and returns 7

The original add method is preserved as original_add.
The new version adds logging while maintaining the same interface.

## Alias with Method Parameters

Method aliases preserve all original parameters. This example shows aliasing
methods with different parameter patterns.

parameters.rb
  

class Formatter
  def format_name(first, last)
    "#{first} #{last}"
  end
  
  alias full_name format_name
  
  def format_date(year, month=1, day=1)
    "#{year}-#{month}-#{day}"
  end
  
  alias date full_date=format_date
end

f = Formatter.new
puts f.full_name("John", "Doe")  # =&gt; "John Doe"
puts f.date(2025)                # =&gt; "2025-1-1"

Both required and optional parameters work correctly with aliases. The alias
maintains the exact same signature as the original method.

## Dynamic Aliasing

Ruby allows creating aliases dynamically using alias_method. This
example shows runtime method aliasing based on conditions.

dynamic.rb
  

class DynamicAlias
  def greet
    puts "Hello!"
  end
  
  def self.create_alias(new_name)
    alias_method new_name, :greet
  end
end

DynamicAlias.create_alias(:welcome)
DynamicAlias.create_alias(:salute)

obj = DynamicAlias.new
obj.welcome  # =&gt; "Hello!"
obj.salute   # =&gt; "Hello!"

The create_alias class method generates new aliases at runtime.
This technique is useful for metaprogramming scenarios.

## Alias Chains and Super

Aliases work correctly with inheritance and super. This example
demonstrates method chaining through aliases.

inheritance.rb
  

class Parent
  def process
    puts "Parent processing"
  end
end

class Child &lt; Parent
  alias parent_process process
  
  def process
    puts "Child preprocessing"
    parent_process
    puts "Child postprocessing"
  end
end

Child.new.process

The output shows the complete call chain: Child's preprocessing, Parent's
processing, and Child's postprocessing. Aliases maintain proper inheritance.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's alias keyword with examples showing basic usage,
method augmentation, dynamic aliasing, and inheritance patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).