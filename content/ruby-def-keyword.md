+++
title = "Ruby def Keyword"
date = 2025-08-29T20:11:19.463+01:00
draft = false
description = "Ruby def tutorial explains how to define methods with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby def Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's def keyword to define
methods. Methods are fundamental building blocks in Ruby programs.

The def keyword defines a method with a name, parameters, and body.
Methods encapsulate behavior and can be called multiple times. They help organize
code into reusable units.

Ruby methods can take arguments, return values, and have default parameters.
They can be defined on objects or classes. Methods follow naming conventions.

## Basic Method Definition

This simple example demonstrates the most basic method definition. The method
takes no parameters and performs a simple operation.

basic_method.rb
  

def greet
  puts "Hello, Ruby!"
end

greet
greet

The def keyword starts the method definition, followed by the method
name. The method body contains the code to execute. The method is called by its
name. This example calls greet twice.

## Method with Parameters

Methods often take parameters to make them more flexible. This example shows a
method that accepts one parameter.

method_with_param.rb
  

def greet(name)
  puts "Hello, #{name}!"
end

greet("Alice")
greet("Bob")

The method greet now takes a name parameter. The
parameter is used in string interpolation. We call the method with different
arguments to produce different outputs.

## Method with Default Parameters

Ruby allows default parameter values. When an argument isn't provided, the
default value is used.

default_params.rb
  

def greet(name = "Ruby")
  puts "Hello, #{name}!"
end

greet("Alice")
greet

The name parameter defaults to "Ruby" when no argument is given.
The first call provides an argument, while the second uses the default. Default
parameters make methods more flexible.

## Method with Return Value

Methods can return values using the return keyword. The last
expression's value is returned by default.

return_value.rb
  

def square(x)
  x * x
end

result = square(5)
puts "5 squared is #{result}"

The square method returns the square of its argument. We store the
return value in a variable. Ruby returns the last expression's value
automatically, making return optional here.

## Multiple Parameters

Methods can accept multiple parameters. This example shows a method that
calculates the sum of three numbers.

multiple_params.rb
  

def sum(a, b, c)
  a + b + c
end

total = sum(10, 20, 30)
puts "The sum is #{total}"

The sum method takes three parameters and returns their sum. We
pass three arguments when calling the method. Ruby evaluates the addition
expression and returns the result.

## Variable Number of Arguments

Ruby methods can accept variable numbers of arguments using the splat operator
(*). This is useful for flexible method definitions.

variable_args.rb
  

def average(*numbers)
  numbers.sum.to_f / numbers.size
end

puts average(1, 2, 3)
puts average(10, 20, 30, 40, 50)

The *numbers parameter collects all arguments into an array. We
calculate the average by summing and dividing by count. The method works with
any number of arguments.

## Keyword Arguments

Ruby supports keyword arguments for more readable method calls. Parameters are
passed by name rather than position.

keyword_args.rb
  

def create_person(name:, age:, occupation: "Developer")
  { name: name, age: age, occupation: occupation }
end

person = create_person(name: "Alice", age: 30)
puts person.inspect

The method defines named parameters with default values. We call it using
keyword syntax. This makes the call more descriptive and order-independent.
Default values make parameters optional.

## Source

[Ruby Methods Documentation](https://ruby-doc.org/3.4.1/syntax/methods_rdoc.html/)

This tutorial covered Ruby's def keyword with examples showing
method definition, parameters, return values, and advanced features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).