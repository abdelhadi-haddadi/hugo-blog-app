+++
title = "Ruby yield Keyword"
date = 2025-08-29T20:11:34.164+01:00
draft = false
description = "Ruby yield tutorial explains how to use the yield keyword with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby yield Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's yield keyword. The
yield keyword is fundamental for working with blocks in Ruby.

The yield keyword transfers control from a method to its associated
block. It allows methods to accept blocks of code that can be executed within
the method's context.

Blocks with yield enable powerful patterns like iteration, resource
management, and callbacks. They are a key feature of Ruby's expressive syntax.

## Basic yield Example

This simple example demonstrates the basic usage of the yield
keyword. The method yields control to its block.

basic_yield.rb
  

def greet
  puts "Before yield"
  yield
  puts "After yield"
end

greet { puts "Hello from the block!" }

The yield keyword executes the block passed to the greet
method. The output shows the execution flow between method and block.

## Passing Parameters to yield

yield can pass parameters to its block. The block receives these
parameters between vertical bars | |.

yield_params.rb
  

def calculate(a, b)
  puts "Calculating..."
  result = yield(a, b)
  puts "Result: #{result}"
end

calculate(5, 3) { |x, y| x * y }
calculate(10, 2) { |x, y| x / y }

The method passes arguments to the block through yield. Different
blocks can perform different operations with the same parameters.

## Checking for Block with block_given?

Methods using yield should check if a block was provided. The
block_given? method prevents errors when no block exists.

block_given.rb
  

def process
  if block_given?
    yield
  else
    puts "No block provided"
  end
end

process { puts "Processing..." }
process

The first call executes the block, while the second handles the missing block
gracefully. This makes methods more robust.

## Implementing Custom Iterators

yield enables creating custom iterators. This example mimics
Ruby's each method for arrays.

custom_iterator.rb
  

def my_each(array)
  i = 0
  while i &lt; array.length
    yield(array[i])
    i += 1
  end
  array
end

my_each([1, 2, 3]) { |x| puts x * 2 }

The method yields each array element to the block. The block processes each
element, demonstrating how Ruby's built-in iterators work.

## Resource Management Pattern

yield is perfect for resource management patterns. This ensures
resources are properly allocated and released.

resource_management.rb
  

def with_file(filename)
  file = File.open(filename, 'w')
  yield(file)
ensure
  file.close if file
end

with_file('output.txt') do |f|
  f.puts "First line"
  f.puts "Second line"
end

The method handles file opening and closing, while the block writes content.
The ensure clause guarantees the file closes even if errors occur.

## Yield with Multiple Blocks

Methods can yield multiple times to the same block. This creates flexible
execution patterns.

multiple_yields.rb
  

def stages
  puts "Stage 1"
  yield("start")
  puts "Stage 2"
  yield("middle")
  puts "Stage 3"
  yield("end")
end

stages { |phase| puts "Processing #{phase} phase" }

The method yields control at different stages, passing phase information.
The block executes multiple times with different parameters.

## Advanced: Yield with Enumerator

This advanced example shows how yield can create enumerators.
This enables lazy evaluation of sequences.

enumerator.rb
  

def fibonacci_sequence
  return enum_for(:fibonacci_sequence) unless block_given?
  
  a, b = 0, 1
  loop do
    yield a
    a, b = b, a + b
  end
end

# Get first 10 Fibonacci numbers
fibonacci_sequence.take(10).each { |x| puts x }

The method generates Fibonacci numbers indefinitely. Without a block, it returns
an enumerator for lazy evaluation. With a block, it yields each number.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's yield keyword with practical examples showing
blocks, iterators, resource management, and enumerators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).