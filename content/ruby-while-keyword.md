+++
title = "Ruby while Keyword"
date = 2025-08-29T20:11:34.171+01:00
draft = false
description = "Ruby while tutorial explains how to use this looping construct with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby while Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's while keyword for creating
loops. The while loop executes code repeatedly while a condition
is true.

The while keyword creates a loop that runs as long as its condition
evaluates to true. It checks the condition before each iteration. When the
condition becomes false, the loop terminates.

while loops are fundamental for repetitive tasks in Ruby. They
provide precise control over iteration when the number of repetitions isn't
known beforehand.

## Basic while Loop

This example demonstrates the simplest form of a while loop. The
loop continues while the condition remains true.

basic_while.rb
  

count = 0

while count &lt; 5
  puts "Count is #{count}"
  count += 1
end

puts "Loop finished"

The loop runs while count is less than 5. Each iteration prints
the current count and increments it. The loop exits when count reaches 5.

## while with User Input

This example uses while to repeatedly prompt for user input until
a specific condition is met.

user_input.rb
  

answer = ""

while answer.downcase != "quit"
  print "Enter a command (or 'quit' to exit): "
  answer = gets.chomp
  puts "You entered: #{answer}"
end

puts "Goodbye!"

The loop continues until the user enters "quit". The condition checks the
input in a case-insensitive way. Each iteration processes the user's input.

## Infinite while Loop with break

This example shows how to create an infinite loop with while true
and use break to exit based on a condition.

infinite_loop.rb
  

counter = 0

while true
  puts "Counter: #{counter}"
  counter += 1
  
  break if counter &gt;= 10
end

puts "Loop exited"

The loop runs indefinitely until the break condition is met. This
pattern is useful when the exit condition is complex or appears mid-loop.

## while with next Keyword

This example demonstrates using next to skip certain iterations
within a while loop.

next_keyword.rb
  

num = 0

while num &lt; 10
  num += 1
  next if num.even?
  
  puts "Odd number: #{num}"
end

puts "Done"

The loop skips even numbers using next. Only odd numbers are
printed. The loop continues until all numbers up to 10 are processed.

## while Modifier Form

Ruby offers a postfix while modifier that executes code while a
condition is true. This concise form is useful for single-statement loops.

modifier_form.rb
  

count = 0

puts count += 1 while count &lt; 5

puts "Final count: #{count}"

The postfix while executes the preceding statement repeatedly.
The loop stops when the condition becomes false. This form is compact but
less flexible.

## Nested while Loops

This example demonstrates nested while loops to create more
complex iteration patterns.

nested_loops.rb
  

outer = 1

while outer &lt;= 3
  inner = 1
  
  while inner &lt;= outer
    print "#{outer}:#{inner} "
    inner += 1
  end
  
  puts
  outer += 1
end

The outer loop runs three times. The inner loop's iterations increase with
each outer iteration. This creates a triangular number pattern.

## while with Arrays

This example shows how to use while to process array elements
without using iterator methods.

array_processing.rb
  

fruits = ["apple", "banana", "cherry", "date"]
index = 0

while index &lt; fruits.length
  puts "Fruit ##{index + 1}: #{fruits[index].capitalize}"
  index += 1
end

puts "All fruits processed"

The loop processes each array element by index. It continues until all
elements are visited. This approach gives manual control over array traversal.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's while loops with practical examples showing
basic usage, control flow, and common patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).