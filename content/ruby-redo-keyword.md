+++
title = "Ruby redo Keyword"
date = 2025-08-29T20:11:29.642+01:00
draft = false
description = "Ruby redo tutorial explains how to use this loop control keyword with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby redo Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's redo keyword. It restarts
the current iteration of a loop without checking the loop condition.

The redo keyword causes the current loop iteration to restart. Unlike
next, it doesn't evaluate loop conditions or move to the next item.

redo is useful when you need to retry an operation without
progressing loop state. It works with while, until,
for, and iterator methods.

## Basic redo Example

This simple example demonstrates the basic behavior of redo. The
loop restarts when a condition is met.

basic_redo.rb
  

count = 0

while count &lt; 5
  count += 1
  puts "Count: #{count}"
  
  if count == 3
    puts "Redoing iteration"
    redo
  end
end

The loop would normally run 5 times, but the redo at count 3 causes
that iteration to restart. Notice the loop condition isn't rechecked.

## redo with Input Validation

redo is commonly used for input validation. This example keeps
asking for input until valid data is provided.

input_validation.rb
  

3.times do |i|
  print "Enter a positive number: "
  input = gets.chomp.to_i
  
  if input &lt;= 0
    puts "Invalid input! Try again."
    redo
  end
  
  puts "You entered: #{input}"
end

The redo restarts the current iteration if input is invalid. The
loop counter doesn't increment until valid input is received.

## redo in Nested Loops

In nested loops, redo affects only the innermost loop. This example
shows its behavior in nested structures.

nested_loops.rb
  

outer = 0
inner = 0

while outer &lt; 2
  outer += 1
  puts "Outer: #{outer}"
  
  while inner &lt; 3
    inner += 1
    puts "  Inner: #{inner}"
    
    if inner == 2
      puts "  Redoing inner loop"
      redo
    end
  end
  
  inner = 0
end

The redo only affects the inner loop. The outer loop continues
normally after the inner loop completes all iterations.

## redo with Retry Logic

This example implements retry logic for an unreliable operation using
redo. It retries failed operations immediately.

retry_logic.rb
  

attempts = 0

5.times do |i|
  attempts += 1
  puts "Attempt #{attempts} (iteration #{i + 1})"
  
  # Simulate random failure
  if rand &lt; 0.4
    puts "Operation failed! Retrying..."
    redo
  end
  
  puts "Operation succeeded"
end

Each failure triggers a redo, restarting the current iteration.
The loop counter only increments after successful operations.

## redo vs next

This example contrasts redo with next to highlight
their different behaviors in loop control.

redo_vs_next.rb
  

puts "Using redo:"
3.times do |i|
  puts "Start iteration #{i}"
  
  if i == 1
    puts "Redoing..."
    redo
  end
  
  puts "End iteration #{i}"
end

puts "\nUsing next:"
3.times do |i|
  puts "Start iteration #{i}"
  
  if i == 1
    puts "Skipping..."
    next
  end
  
  puts "End iteration #{i}"
end

redo restarts the current iteration, while next skips
to the next iteration. Notice how the output differs between the two cases.

## redo with until Loop

redo works with until loops similarly to
while loops. This example shows its behavior in negative logic.

until_loop.rb
  

value = 0

until value &gt; 3
  value += 1
  puts "Value: #{value}"
  
  if value == 2
    puts "Redoing until check"
    redo
  end
end

The redo restarts the iteration without re-evaluating the
until condition. The loop continues until the condition becomes
true.

## redo in Method with Yield

This advanced example shows redo behavior in a method that yields
to a block. The redo affects the block's execution.

method_with_yield.rb
  

def retry_operation
  attempts = 0
  
  3.times do |i|
    attempts += 1
    puts "Attempt #{attempts}"
    
    yield i
    
    if attempts &lt; 3
      puts "Retrying..."
      redo
    end
  end
end

retry_operation do |i|
  puts "Block execution #{i}"
  raise "Error" if i == 0 &amp;&amp; attempts &lt; 2
rescue
  puts "Rescued error"
end

The redo inside the method restarts the block execution. Combined
with error handling, this creates powerful retry logic.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's redo keyword with practical examples
showing input validation, retry logic, and loop control patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).