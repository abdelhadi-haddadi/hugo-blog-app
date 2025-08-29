+++
title = "Ruby for Keyword"
date = 2025-08-29T20:11:21.692+01:00
draft = false
description = "Ruby for keyword tutorial explains how to use for loops with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby for Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's for keyword for iteration.
The for loop provides a clean syntax for traversing collections.

The for keyword creates a loop that iterates over a collection.
It automatically assigns each element to a loop variable. The loop runs until
all elements are processed.

While Rubyists often prefer each, for remains useful
for certain scenarios. It's more familiar to developers from other languages.
The loop variable remains in scope after the loop.

## Basic for Loop with Range

This simple example demonstrates iterating over a numeric range. The loop
variable takes each value in sequence.

basic_for_range.rb
  

for i in 1..5
  puts "Current number: #{i}"
end

puts "Final value: #{i}"

The loop runs from 1 to 5 inclusive. Notice the variable i remains
accessible after the loop. This differs from block-scoped iterators.

## Iterating Over an Array

Arrays work naturally with for loops. Each element becomes
available through the loop variable in turn.

for_array.rb
  

fruits = ["apple", "banana", "cherry"]

for fruit in fruits
  puts "Fruit: #{fruit.capitalize}"
end

puts "Last fruit: #{fruit}"

The loop processes each array element sequentially. The variable fruit
holds each value. Again, it persists after the loop completes.

## Nested for Loops

for loops can be nested to handle multi-dimensional data. Each
level gets its own loop variable.

nested_for.rb
  

matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

for row in matrix
  for cell in row
    print "#{cell} "
  end
  puts
end

The outer loop handles each row, while the inner loop processes individual
cells. This pattern works for any nested enumerable structure.

## for with Hash

Hashes require special handling since they contain key-value pairs. The loop
variable becomes an array of both elements.

for_hash.rb
  

person = {name: "John", age: 30, city: "New York"}

for key, value in person
  puts "#{key}: #{value}"
end

The loop unpacks each key-value pair into separate variables. Without both
variables, you'd get two-element arrays instead.

## Modifying Elements During Iteration

for loops allow modifying collection elements during iteration.
Changes affect the original collection.

modifying_for.rb
  

numbers = [1, 2, 3, 4, 5]

for num in numbers
  num *= 2
end

puts numbers.inspect

This example attempts to double each number. However, the original array
remains unchanged because num is a copy. Use map!
for in-place modification.

## Break and Next in for Loops

Control flow keywords work similarly in for as in other loops.
break exits entirely, while next skips ahead.

control_flow.rb
  

for i in 1..10
  next if i % 2 == 0
  break if i &gt; 7
  puts "Odd number: #{i}"
end

The loop skips even numbers with next and stops completely after
7 with break. These keywords provide precise flow control.

## for vs each

This example contrasts for with Ruby's preferred each
iterator. The main differences involve variable scope and return values.

for_vs_each.rb
  

# for loop version
for x in [1, 2, 3]
  puts x
end
puts "x after for: #{x}"

# each version
[1, 2, 3].each do |y|
  puts y
end
puts "y after each: #{y}" rescue puts "y undefined"

The for variable persists, while each's block
variable doesn't. Also, for returns the original collection.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's for keyword with examples showing
range iteration, array processing, nested loops, and control flow.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).