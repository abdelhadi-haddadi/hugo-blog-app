+++
title = "Ruby include Method"
date = 2025-08-29T20:11:23.977+01:00
draft = false
description = "Ruby include method tutorial explains how to use modules with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby include Method

last modified April 27, 2025

This tutorial explains Ruby's include method for module inclusion.
The include method mixes module functionality into classes.

The include method adds a module's methods as instance methods to a
class. This is Ruby's primary mixin mechanism for sharing behavior.

Included modules become part of the class's ancestor chain. Their methods are
available to all instances. Multiple includes are processed in order.

## Basic Module Inclusion

This simple example shows how to include a module in a class. The module's
methods become available to class instances.

basic_include.rb
  

module Greeter
  def greet
    "Hello from module!"
  end
end

class MyClass
  include Greeter
end

obj = MyClass.new
puts obj.greet

The Greeter module's greet method becomes available to
MyClass instances. The include statement makes this
happen.

## Multiple Module Inclusion

A class can include multiple modules. Methods are searched in reverse inclusion
order (last included, first checked).

multiple_includes.rb
  

module ModuleA
  def identify
    "From ModuleA"
  end
end

module ModuleB
  def identify
    "From ModuleB"
  end
end

class MyClass
  include ModuleA
  include ModuleB
end

obj = MyClass.new
puts obj.identify

ModuleB's method takes precedence because it was included last.
Ruby searches modules in reverse inclusion order when resolving methods.

## Included Modules in Ancestors

Included modules appear in a class's ancestor chain. This example demonstrates
how to inspect the inheritance hierarchy.

ancestors_chain.rb
  

module MyModule
  def module_method
    "Module method called"
  end
end

class MyClass
  include MyModule
end

puts MyClass.ancestors.inspect
obj = MyClass.new
puts obj.module_method

The ancestors method shows MyModule in the inheritance
chain. This explains how instance methods become available.

## Module Inclusion in Inheritance

When a class inherits from another, it also inherits all included modules.
This example shows module inheritance.

inheritance_inclusion.rb
  

module SharedBehavior
  def shared_method
    "Available to all subclasses"
  end
end

class Parent
  include SharedBehavior
end

class Child &lt; Parent
end

obj = Child.new
puts obj.shared_method

The Child class inherits SharedBehavior from its
parent. Modules become part of the inheritance hierarchy.

## Extend vs Include

While include adds instance methods, extend adds class
methods. This example contrasts both approaches.

extend_vs_include.rb
  

module MyMethods
  def say_hello
    "Hello!"
  end
end

class WithInclude
  include MyMethods
end

class WithExtend
  extend MyMethods
end

puts WithInclude.new.say_hello
puts WithExtend.say_hello

include makes methods available to instances, while extend
makes them available to the class itself. Both serve different purposes.

## Including Kernel Module

Ruby's Kernel module is automatically included in Object.
This example shows how to access kernel methods.

kernel_inclusion.rb
  

class MyClass
  # Kernel methods like 'puts' are already available
  def use_kernel_method
    puts "This is a Kernel method"
  end
end

obj = MyClass.new
obj.use_kernel_method

Common methods like puts come from the Kernel module.
They're available everywhere because Object includes Kernel.

## Conditional Module Inclusion

Modules can be included conditionally based on runtime factors. This allows
flexible behavior composition.

conditional_include.rb
  

module AdminFeatures
  def admin_action
    "Performing admin action"
  end
end

class User
  def initialize(is_admin)
    @is_admin = is_admin
  end

  def check_admin
    extend AdminFeatures if @is_admin
  end
end

admin = User.new(true)
admin.check_admin
puts admin.admin_action if admin.respond_to?(:admin_action)

Here we use extend conditionally to add admin features. The
respond_to? check ensures safe method calling.

## Source

[Ruby Module#include Documentation](https://ruby-doc.org/3.4.1/Module.html#method-i-include)

This tutorial covered Ruby's include method with practical examples showing
module mixing, inheritance, and method lookup behavior.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).