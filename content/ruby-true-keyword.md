+++
title = "Ruby true Keyword"
date = 2025-08-29T20:11:31.865+01:00
draft = false
description = "Ruby true keyword tutorial explains boolean logic and truthy values with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby true Keyword

last modified April 27, 2025

This tutorial explains Ruby's true keyword and boolean logic. The
true keyword represents the boolean true value in Ruby.

The true keyword is one of Ruby's two boolean literals (with
false). It's an instance of TrueClass and evaluates
to true in all boolean contexts.

In Ruby, only false and nil are falsy. All other
values including zero, empty strings, and empty arrays are truthy.

## Basic true Example

This simple example demonstrates the most basic usage of the true
keyword in a conditional statement.

basic_true.rb
  

if true
  puts "This will always execute"
else
  puts "This will never execute"
end

The code always executes the first branch because the condition evaluates to
true. The else branch is unreachable in this case.

## true in Method Return Values

Methods often return true to indicate success or positive results.
This example shows a validation method returning boolean values.

method_return.rb
  

def valid_email?(email)
  email.include?("@") &amp;&amp; email.include?(".")
end

result = valid_email?("user@example.com")

if result == true
  puts "Valid email address"
else
  puts "Invalid email address"
end

The valid_email? method returns true only when both
conditions are met. The == true comparison is explicit but often
unnecessary in Ruby.

## true with Logical Operators

The true keyword works with Ruby's logical operators
(&amp;&amp;, ||, !). This example
demonstrates boolean logic.

logical_operators.rb
  

a = true
b = false

puts "AND: #{a &amp;&amp; b}"  # false
puts "OR: #{a || b}"   # true
puts "NOT: #{!a}"      # false
puts "XOR: #{a ^ b}"   # true

The example shows various boolean operations with true and
false. XOR (^) returns true when operands differ.

## true in Ternary Operator

The ternary operator is a concise conditional that often uses boolean values.
This example shows true determining the returned value.

ternary_operator.rb
  

logged_in = true

message = logged_in ? "Welcome back!" : "Please log in"

puts message

The ternary operator checks if logged_in is true and
returns the appropriate string. This is a common pattern for conditional messages.

## true as Default Parameter

Methods can use true as a default parameter value. This enables
optional boolean flags that default to true.

default_parameter.rb
  

def process_data(data, verbose = true)
  puts "Processing data..." if verbose
  # data processing logic
  puts "Done!" if verbose
end

process_data([1, 2, 3])          # verbose output
process_data([1, 2, 3], false)   # silent processing

The verbose parameter defaults to true, showing
progress messages. Passing false suppresses the output.

## true in Case Statements

Case statements can use true in when clauses to create flexible
conditions. This allows for complex matching logic.

case_statement.rb
  

age = 25

case true
when age &lt; 18
  puts "Child"
when age &lt; 65
  puts "Adult"
else
  puts "Senior"
end

The case statement evaluates each condition against true. This
pattern is useful when conditions don't share a common subject.

## true in Object Comparisons

The true keyword can be used in object comparisons and equality
checks. This example demonstrates various comparison scenarios.

object_comparison.rb
  

puts "true object ID: #{true.object_id}"
puts "TrueClass instance: #{true.instance_of?(TrueClass)}"
puts "Equality check: #{true == true}"      # true
puts "Identity check: #{true.equal?(true)}" # true
puts "Boolean conversion: #{!!true}"        # true

All true values in Ruby are the same object (singleton pattern).
The example shows identity checks and boolean conversion techniques.

## Source

[Ruby TrueClass Documentation](https://ruby-doc.org/3.4.1/TrueClass.html)

This tutorial covered Ruby's true keyword with practical examples
showing boolean logic, method returns, and conditional structures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).