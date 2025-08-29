+++
title = "Ruby Module Keyword"
date = 2025-08-29T20:11:23.968+01:00
draft = false
description = "Ruby module tutorial explains how to use modules for namespacing and mixins with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Module Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's module keyword. Modules
provide namespaces and mixin functionality in Ruby programs.

The module keyword defines a namespace for methods and constants.
Modules cannot be instantiated like classes but can be included in classes.

Modules serve two primary purposes: namespacing and mixins. They help organize
code and enable multiple inheritance-like behavior through mixins.

## Basic Module Definition

This example shows the simplest module definition containing constants and
methods. Modules encapsulate related functionality.

basic_module.rb
  

module Greeter
  DEFAULT_GREETING = "Hello"

  def self.say_hello(name)
    puts "#{DEFAULT_GREETING}, #{name}!"
  end
end

Greeter.say_hello("Alice")
puts Greeter::DEFAULT_GREETING

The Greeter module contains a constant and a module method. We
access them using :: for constants and . for methods.

## Module as Namespace

Modules prevent naming collisions by acting as containers. This example shows
how modules organize related classes.

namespace.rb
  

module Animals
  class Dog
    def speak
      puts "Woof!"
    end
  end

  class Cat
    def speak
      puts "Meow!"
    end
  end
end

dog = Animals::Dog.new
cat = Animals::Cat.new

dog.speak
cat.speak

The Animals module contains Dog and Cat
classes. We reference them with the module prefix to avoid global namespace
pollution.

## Module as Mixin

Modules can be mixed into classes using include. This provides
multiple inheritance-like behavior.

mixin.rb
  

module Debuggable
  def debug_info
    "#{self.class} (id: #{object_id})"
  end
end

class Product
  include Debuggable
end

book = Product.new
puts book.debug_info

The Debuggable module adds debug_info to any class
that includes it. This demonstrates Ruby's mixin capability.

## Extend vs Include

Ruby offers two ways to mix in modules: include for instance
methods and extend for class methods.

extend_include.rb
  

module ClassMethods
  def class_info
    "Class #{self}"
  end
end

module InstanceMethods
  def instance_info
    "Instance of #{self.class}"
  end
end

class Demo
  extend ClassMethods
  include InstanceMethods
end

puts Demo.class_info
puts Demo.new.instance_info

extend adds methods to the class itself, while include
adds them to instances. This distinction is crucial for proper module usage.

## Module Composition

Modules can include other modules, enabling powerful composition patterns.
This example shows nested module functionality.

composition.rb
  

module Features
  module Printable
    def print
      puts "Printing #{self}"
    end
  end

  module Serializable
    def serialize
      Marshal.dump(self)
    end
  end
end

class Document
  include Features::Printable
  include Features::Serializable
end

doc = Document.new
doc.print
puts doc.serialize.size

The Features module contains two submodules. We include them
separately in the Document class for modular functionality.

## Module with Class Methods

This pattern adds class methods through a module using the self.included
hook. It's a common Ruby idiom.

class_methods.rb
  

module Tagging
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def tags
      @tags ||= []
    end
  end

  def add_tag(tag)
    self.class.tags &lt;&lt; tag
  end
end

class Post
  include Tagging
end

post = Post.new
post.add_tag("ruby")
puts Post.tags.inspect

When Tagging is included, it automatically extends the class with
ClassMethods. This provides both instance and class methods.

## Module Functionality Isolation

Modules can isolate functionality that might conflict with other code. This
example demonstrates safe method addition.

isolation.rb
  

module MathUtils
  refine Integer do
    def factorial
      (1..self).inject(:*) || 1
    end
  end
end

# Regular Integer has no factorial method
# puts 5.factorial # Would raise NoMethodError

using MathUtils

puts 5.factorial  # Now works: 120

The refine keyword safely adds methods only where explicitly
requested with using. This prevents global monkey-patching issues.

## Source

[Ruby Modules Documentation](https://ruby-doc.org/3.4.1/syntax/modules_and_classes_rdoc.html/)

This tutorial covered Ruby modules with examples showing namespacing, mixins,
composition, and refinement patterns. Modules are fundamental to Ruby design.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).