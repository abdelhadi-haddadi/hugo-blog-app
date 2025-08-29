+++
title = "Ruby extend Method"
date = 2025-08-29T20:11:20.584+01:00
draft = false
description = "Ruby extend tutorial explains how to use the extend method to add module functionality to objects."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby extend Method

last modified April 27, 2025

This tutorial explains how to use Ruby's extend method to add
module functionality to objects. The extend method is a powerful
way to mix in module methods at the object level.

The extend method adds module methods to the receiver's singleton
class. Unlike include, which affects instances, extend
works on individual objects. This allows for flexible object augmentation.

Extended methods become available as instance methods on the extended object.
This technique is useful for adding functionality to specific objects without
affecting their class. Multiple modules can be extended in sequence.

## Basic extend Example

This simple example demonstrates how to extend an object with module methods.
The methods become available on that specific object only.

basic_extend.rb
  

module Greeter
  def greet
    "Hello from #{self}"
  end
end

obj = Object.new
obj.extend(Greeter)

puts obj.greet

The extend method adds Greeter module methods to
obj. Now obj can call greet even though
its class doesn't include this method. Other objects of the same class won't
have this method.

## Extending Class Objects

Since classes are objects in Ruby, we can extend them with module methods.
This makes the methods available as class methods rather than instance methods.

extend_class.rb
  

module ClassMethods
  def class_info
    "Class name: #{name}"
  end
end

class MyClass
  extend ClassMethods
end

puts MyClass.class_info

Here extend adds class_info as a class method to
MyClass. This is a common pattern for adding class-level
functionality. The method becomes available on the class itself.

## Multiple Module Extension

Multiple modules can be extended onto an object. The methods are added in the
order they're extended, with later modules taking precedence in case of
conflicts.

multiple_modules.rb
  

module A
  def identify
    "From module A"
  end
end

module B
  def identify
    "From module B"
  end
end

obj = Object.new
obj.extend(A, B)

puts obj.identify

The output shows B's version of identify because it
was extended last. The order of extension matters when methods have the same
name. This demonstrates method lookup precedence.

## Extending Inside Classes

The extend method can be used inside class definitions to add
module methods to the class object itself. This is different from include.

class_extension.rb
  

module InstanceMethods
  def instance_identify
    "Instance method"
  end
end

module ClassMethods
  def class_identify
    "Class method"
  end
end

class MyClass
  include InstanceMethods
  extend ClassMethods
end

puts MyClass.class_identify
puts MyClass.new.instance_identify

This example shows the difference between include and
extend. include adds instance methods, while
extend adds class methods. Both are useful in different scenarios.

## Dynamic Extension

Objects can be extended dynamically at runtime. This allows for flexible
object behavior modification based on program conditions.

dynamic_extension.rb
  

module AdminFeatures
  def admin_action
    "Performing admin action"
  end
end

module UserFeatures
  def user_action
    "Performing user action"
  end
end

class User
  attr_accessor :role
end

user = User.new
user.role = :admin

user.extend(AdminFeatures) if user.role == :admin
user.extend(UserFeatures) if user.role == :user

puts user.admin_action if user.role == :admin

The user object is extended with different modules based on its role. This
pattern enables role-specific functionality without subclassing. The methods
only exist on objects that need them.

## Extending Core Objects

Ruby's core objects can be extended with custom methods. This should be done
judiciously to avoid conflicts and confusion.

core_extension.rb
  

module StringExtensions
  def shout
    upcase + "!"
  end
end

str = "hello world"
str.extend(StringExtensions)

puts str.shout
puts "another string".respond_to?(:shout) # false

Only the specific str object gets the shout method.
Other strings remain unaffected. This is safer than monkey-patching the
String class directly. It limits the scope of changes.

## Extend vs Include

This example contrasts extend and include to clarify
their different behaviors. They serve related but distinct purposes.

extend_vs_include.rb
  

module SharedMethods
  def identify
    "From SharedMethods"
  end
end

class ExtendedClass
  extend SharedMethods
end

class IncludedClass
  include SharedMethods
end

puts ExtendedClass.identify
puts IncludedClass.new.identify

ExtendedClass gets identify as a class method, while
IncludedClass gets it as an instance method. This demonstrates the
key difference between these two approaches to mixing in module functionality.

## Source

[Ruby Module#extend Documentation](https://ruby-doc.org/3.4.1/Module.html#method-i-extend)

This tutorial covered Ruby's extend method with practical examples showing
object extension, class methods, and dynamic behavior modification.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).