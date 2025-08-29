+++
title = "Ruby until Keyword"
date = 2025-08-29T20:11:32.964+01:00
draft = false
description = "Ruby until keyword tutorial explains how to use this looping construct with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby until Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's until keyword for looping.
The until loop executes code repeatedly until a condition becomes
true.

The until keyword creates a loop that runs while its condition is
false. It stops when the condition evaluates to true. It's the opposite of
Ruby's while.

until loops are useful when you need to repeat code until a certain
state is reached. They work well with boolean conditions and method return
values.

## Basic until Loop

This simple example demonstrates the fundamental usage of the until
loop. The loop continues until the condition becomes true.

basic_until.rb
  

counter = 0

until counter == 5
  puts "Counter is #{counter}"
  counter += 1
end

puts "Loop finished"

The loop runs while counter == 5 is false. It increments the counter
each iteration and stops when counter reaches 5. The message prints after exiting.

## until as a Modifier

Ruby allows until to be used as a statement modifier, placing it
after the code to execute. This creates a more concise single-line loop.

until_modifier.rb
  

counter = 0

puts "Counter is #{counter}" until (counter += 1) == 5

puts "Loop finished"

The code after until executes repeatedly until the condition is true.
The increment happens in the condition check itself. This form is more compact.

## until with User Input

until loops work well for validating user input. This example keeps
asking for input until receiving a valid response.

input_validation.rb
  

response = ""

until %w[y n].include?(response.downcase)
  print "Do you want to continue? (y/n): "
  response = gets.chomp
end

puts "You chose #{response}"

The loop continues until the user enters either 'y' or 'n'. The condition checks
if the response is in the allowed list. Case is normalized with downcase.

## until with begin-end Block

Using begin-end with until ensures the code runs at
least once before checking the condition. This creates a do-while style loop.

begin_until.rb
  

attempts = 0

begin
  attempts += 1
  puts "Attempt #{attempts}"
  result = rand(10)
  puts "Got #{result}"
end until result == 7

puts "Found 7 in #{attempts} attempts"

The code block executes first, then checks the condition. This guarantees at
least one iteration. Useful when you must run code before testing the condition.

## until with Break

The break statement can exit an until loop early.
This example shows how to terminate the loop from inside the block.

until_break.rb
  

count = 0

until count == 100
  count += 1
  break if count == 5
  puts "Count is #{count}"
end

puts "Stopped at #{count}"

The loop would normally run until count reaches 100, but break exits
when count hits 5. This provides additional control over loop termination.

## until with Next

The next keyword skips to the next iteration of an until
loop. This example demonstrates skipping even numbers.

until_next.rb
  

number = 0

until number &gt;= 10
  number += 1
  next if number.even?
  puts "Odd number: #{number}"
end

puts "Finished"

When number is even, next skips the rest of the block.
Only odd numbers are printed. The loop continues until number reaches 10.

## until with Complex Condition

until can use complex conditions with logical operators. This example
checks multiple exit criteria in the loop condition.

complex_condition.rb
  

temperature = 0
time = 0

until temperature &gt;= 100 || time &gt;= 10
  puts "Heating... Time: #{time} min, Temp: #{temperature}C"
  temperature += rand(15..25)
  time += 1
end

puts "Final temperature: #{temperature}C after #{time} minutes"

The loop continues until either temperature reaches 100°C or 10 minutes pass.
The condition combines two checks with the logical OR operator (||).

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's until loop with practical examples
showing basic usage, modifiers, flow control, and complex conditions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).