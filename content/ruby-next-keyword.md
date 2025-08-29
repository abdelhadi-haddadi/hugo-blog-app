+++
title = "Ruby next Keyword"
date = 2025-08-29T20:11:25.095+01:00
draft = false
description = "Ruby next keyword tutorial explains how to use this flow control statement with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby next Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's next keyword. This flow
control statement skips to the next iteration in loops and blocks.

The next keyword immediately jumps to the next iteration of a loop.
It skips any remaining code in the current iteration. In blocks, it returns
control to the yielding method.

next is useful for filtering elements or skipping invalid data. It
can optionally take a value to return from the block. Multiple conditions can
trigger different skip behaviors.

## Basic next in a Loop

This simple example demonstrates skipping even numbers in a loop. The
next statement jumps to the next iteration when triggered.

basic_next.rb
  

(1..10).each do |i|
  next if i.even?
  puts "Processing odd number: #{i}"
end

The loop processes numbers 1 through 10. When i.even? is true,
next skips the puts statement. Only odd numbers are
printed.

## next with a Value in a Block

next can return a value from a block to the yielding method. This
example shows how to transform numbers while skipping some.

next_with_value.rb
  

result = (1..5).map do |n|
  next n * 10 if n.odd?
  n
end

puts result.inspect # [10, 2, 30, 4, 50]

Odd numbers are multiplied by 10 and returned via next. Even
numbers fall through to return their original value. The result combines both
cases.

## Skipping Nested Loops

next only affects the innermost loop. This example shows nested
loops with conditional skipping.

nested_loops.rb
  

(1..3).each do |i|
  puts "Outer loop: #{i}"
  
  ('a'..'c').each do |j|
    next if i == 2 &amp;&amp; j == 'b'
    puts "  Inner loop: #{j}"
  end
end

When i is 2 and j is 'b', next skips
only the inner loop's puts. The outer loop continues unaffected.

## next in while Loop

next works in while loops similarly to iterators.
This example skips processing when a condition is met.

while_loop.rb
  

count = 0
while count &lt; 5
  count += 1
  next if count == 3
  puts "Count is #{count}"
end

The loop increments count each iteration. When count
equals 3, next skips the puts statement. All other
values are printed.

## Conditional next with Multiple Clauses

Multiple conditions can trigger next with different behaviors.
This example shows complex filtering logic.

conditional_next.rb
  

(1..20).each do |num|
  next puts "Skipping #{num}: too small" if num &lt; 5
  next puts "Skipping #{num}: multiple of 5" if num % 5 == 0
  next if num.even?
  
  puts "Processing odd number #{num} (5-20, not multiple of 5)"
end

Numbers below 5, multiples of 5, and even numbers are all skipped. Each case
has different output behavior. Only qualifying odd numbers are processed.

## next in a Method with a Block

When next is used in a block passed to a method, it returns
control to the method. This example demonstrates the behavior.

method_block.rb
  

def process_items
  yield(1)
  puts "After first yield"
  yield(2)
  puts "After second yield"
  yield(3)
end

process_items do |i|
  next if i == 2
  puts "Processing #{i}"
end

The output shows that when next is triggered, control returns to
the method. The "Processing 2" message is skipped, but method execution
continues.

## next vs return in Blocks

This example contrasts next and return in blocks.
next exits just the block, while return exits the
containing method.

next_vs_return.rb
  

def test_next
  [1, 2, 3].each do |i|
    next if i == 2
    puts "next: #{i}"
  end
  puts "After next block"
end

def test_return
  [1, 2, 3].each do |i|
    return if i == 2
    puts "return: #{i}"
  end
  puts "This won't print"
end

test_next
test_return

next skips only iteration 2, then continues. return
exits the entire method at iteration 2. The final message only appears in
test_next.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's next keyword with examples showing loop control,
block behavior, and comparisons with other flow control statements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).