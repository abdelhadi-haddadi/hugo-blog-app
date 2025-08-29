+++
title = "Ruby OR Keyword"
date = 2025-08-29T20:11:26.188+01:00
draft = false
description = "Ruby OR keyword tutorial explains how to use this logical operator with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby OR Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's or keyword. It is a
logical operator that evaluates to true when either operand is true.

The or keyword is a logical operator that returns true if either
of its operands evaluates to true. It has lower precedence than ||.

Unlike ||, or is used for control flow rather than
boolean logic. It's commonly used in conditional statements and assignments.

## Basic OR Operation

This example demonstrates the fundamental behavior of the or
operator. It returns true if either operand is true.

basic_or.rb
  

a = true
b = false

if a or b
  puts "At least one is true"
else
  puts "Both are false"
end

The code checks if either a or b is true. Since
a is true, the first message prints. The or operator
stops evaluating after the first true condition.

## OR for Default Values

The or operator can provide default values when a variable might
be nil or false. This is a common Ruby idiom.

default_values.rb
  

name = nil
display_name = name or "Anonymous"

puts "Welcome, #{display_name}"

age = false
user_age = age or 30

puts "Age: #{user_age}"

When name is nil, the or operator returns the
default "Anonymous" string. Similarly for the false age value.

## OR in Conditional Statements

or can combine multiple conditions in if statements. It's often
used to check for alternative acceptable conditions.

conditional.rb
  

weather = "rainy"
temperature = 15

if weather == "sunny" or temperature &gt; 20
  puts "Good weather for a walk"
else
  puts "Better stay inside"
end

The condition checks for either sunny weather or warm temperature. Since neither
is true, the else clause executes. The or makes the condition
more flexible.

## OR vs || Difference

While similar, or and || have different precedence.
This example shows how it affects evaluation order.

precedence.rb
  

x = false || true   # =&gt; true
y = false or true   # =&gt; false

puts "x: #{x}, y: #{y}"

a = 1 || 2          # =&gt; 1
b = 1 or 2          # =&gt; 1

puts "a: #{a}, b: #{b}"

The || has higher precedence than assignment, while or
has lower. This affects which operations execute first in compound expressions.

## OR in Method Chaining

or can be used to provide fallback methods when primary ones might
fail. This creates flexible method chains.

method_chaining.rb
  

def first_method
  nil
end

def second_method
  "fallback value"
end

result = first_method or second_method
puts result

When first_method returns nil, the or operator
continues to evaluate second_method. This pattern provides
graceful degradation.

## OR for Error Handling

The or operator can handle potential errors by providing
alternative execution paths when operations fail.

error_handling.rb
  

def load_config
  # Simulate failed config load
  nil
end

config = load_config or raise "Failed to load configuration"

puts "Config loaded: #{config}"

If load_config returns nil, the or operator
executes the raise statement. This provides clean error
handling without nested conditionals.

## OR in Loops

or can control loop execution by combining multiple
continuation conditions. This makes loop control more flexible.

loop_control.rb
  

count = 0
max_attempts = 3
success = false

while count &lt; max_attempts or !success
  puts "Attempt #{count + 1}"
  success = rand &gt; 0.7
  count += 1
end

puts success ? "Succeeded!" : "Failed after #{count} attempts"

The loop continues while either we have attempts remaining or haven't
achieved success. The or combines these two conditions
cleanly.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's or operator with practical examples
showing its use in conditionals, assignments, error handling, and loops.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).