+++
title = "Ruby undef Keyword"
date = 2025-08-29T20:11:32.997+01:00
draft = false
description = "Ruby undef tutorial explains how to use this keyword to remove methods with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby undef Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's undef keyword. This
special keyword removes method definitions from classes and modules.

The undef keyword permanently removes a method from a class or
module. It affects both instance methods and class methods. The method becomes
unavailable for all objects.

undef is useful when you need to restrict certain functionality.
It works with both built-in and user-defined methods. The change is irreversible
within the current runtime.

## Basic undef Example

This simple example demonstrates removing a method from a class. After using
undef, calling the method raises an error.

basic_undef.rb
  

class Greeter
  def hello
    puts "Hello!"
  end
end

greeter = Greeter.new
greeter.hello  # Works fine

class Greeter
  undef hello
end

greeter.hello  # Raises NoMethodError

The hello method is first defined and works normally. After
undef hello, calling it raises NoMethodError.

## undef with Inherited Methods

undef can remove methods inherited from parent classes. This
example shows how to prevent method inheritance.

undef_inheritance.rb
  

class Parent
  def inherited_method
    puts "From parent class"
  end
end

class Child &lt; Parent
  undef inherited_method
end

Child.new.inherited_method  # Raises NoMethodError
Parent.new.inherited_method # Still works

The child class removes the inherited method while the parent keeps it. This
shows undef only affects the current class, not its ancestors.

## undef Multiple Methods

Ruby allows removing multiple methods with a single undef
statement. Separate method names with commas.

multiple_undef.rb
  

class MultiMethod
  def method1; end
  def method2; end
  def method3; end
end

class MultiMethod
  undef method1, method2
end

obj = MultiMethod.new
obj.method3  # Works
obj.method1  # Raises NoMethodError
obj.method2  # Raises NoMethodError

Three methods are defined initially. The undef statement removes
two of them at once. The remaining method stays available.

## undef with Built-in Methods

You can use undef to remove core Ruby methods. This example
disables the to_s method.

undef_builtin.rb
  

class CustomObject
  undef to_s
end

obj = CustomObject.new
puts obj  # Raises NoMethodError

The to_s method is removed from CustomObject. Any
attempt to convert the object to string now fails. This shows the power of
undef.

## undef in Modules

undef works in modules too. This example shows method removal
before including the module.

module_undef.rb
  

module MyModule
  def module_method
    puts "From module"
  end
  
  undef module_method
end

class MyClass
  include MyModule
end

MyClass.new.module_method  # Raises NoMethodError

The method is defined then immediately removed in the module. Classes including
the module won't have access to it. This pattern can control exposed methods.

## undef vs remove_method

Ruby also has remove_method which differs from undef.
This example shows the key difference.

undef_vs_remove.rb
  

class Parent
  def example
    puts "Parent implementation"
  end
end

class Child &lt; Parent
  def example
    puts "Child implementation"
  end
  
  remove_method :example  # Removes Child's version, Parent's remains
  # undef example        # Would remove all versions
end

Child.new.example  # Outputs "Parent implementation"

remove_method only removes the current class's version. undef
would remove all versions. Choose based on your needs.

## Dynamic undef with send

You can use send to dynamically remove methods. This advanced
technique allows runtime method removal.

dynamic_undef.rb
  

class DynamicClass
  def method1; end
  def method2; end
  
  [:method1, :method2].each do |method|
    undef_method method
  end
end

obj = DynamicClass.new
obj.respond_to?(:method1)  # =&gt; false
obj.respond_to?(:method2)  # =&gt; false

The undef_method is the programmatic version of undef.
This example removes methods in a loop. The methods become completely unavailable.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's undef keyword with practical examples showing
method removal in various contexts. Use it carefully as it permanently
removes functionality.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).