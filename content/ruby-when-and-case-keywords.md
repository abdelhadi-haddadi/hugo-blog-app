+++
title = "Ruby when and case Keywords"
date = 2025-08-29T20:11:34.168+01:00
draft = false
description = "Ruby when and case tutorial explains how to use these conditional keywords with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby when and case Keywords

last modified April 27, 2025

This tutorial explains how to use Ruby's case and when
keywords. These provide powerful conditional logic similar to switch statements.

The case keyword starts a conditional block that compares a value
against multiple possibilities. The when keyword defines each
comparison branch within a case statement.

Ruby's case/when is more flexible than traditional switch statements. It uses
the === operator for comparisons, allowing for ranges, classes, and regex.

## Basic case/when Example

This simple example demonstrates the basic structure of a case statement. It
matches a number against several possible values.

basic_case.rb
  

grade = 85

case grade
when 90..100
  puts "A"
when 80..89
  puts "B"
when 70..79
  puts "C"
else
  puts "F"
end

The code checks which range the grade falls into and prints the corresponding
letter. The else clause handles any values not matched by when conditions.

## case with Multiple when Conditions

A single when clause can match multiple values by separating them with commas.
This makes the code more concise for equivalent outcomes.

multiple_when.rb
  

day = "Tuesday"

case day
when "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  puts "Weekday"
when "Saturday", "Sunday"
  puts "Weekend"
else
  puts "Invalid day"
end

This groups all weekdays and weekend days together. The comma acts like an OR
operator between conditions. The else handles unexpected input.

## case Without Explicit Value

Ruby allows case statements without an explicit value to compare. Each when
condition is evaluated as a boolean expression in this form.

no_value_case.rb
  

x = 15
y = 20

case
when x &gt; y
  puts "x is greater than y"
when x &lt; y
  puts "x is less than y"
else
  puts "x equals y"
end

This style works like a series of if/elsif conditions. Each when expression
must evaluate to true or false. The first true condition executes its block.

## case with Class Matching

Ruby's case uses === which allows matching against classes. This example
demonstrates type checking with case/when.

class_matching.rb
  

value = [1, 2, 3]

case value
when String
  puts "It's a string"
when Numeric
  puts "It's a number"
when Array
  puts "It's an array"
else
  puts "Unknown type"
end

The === operator checks if the value is an instance of each class. This provides
clean syntax for type checking compared to multiple is_a? calls.

## case with Regular Expressions

The === operator also works with regular expressions, making case/when ideal for
pattern matching against strings.

regex_case.rb
  

email = "user@example.com"

case email
when /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  puts "Valid email"
when /@/
  puts "Contains @ but invalid format"
else
  puts "Not an email address"
end

The first when checks for a valid email pattern. The second catches strings with
@ but invalid format. The else handles all other cases.

## case with Procs and Lambdas

Since === can call procs, we can use them in when conditions for custom
matching logic.

proc_case.rb
  

is_positive = -&gt;(n) { n &gt; 0 }
is_negative = -&gt;(n) { n &lt; 0 }

number = -5

case number
when is_positive
  puts "Positive number"
when is_negative
  puts "Negative number"
else
  puts "Zero"
end

Each lambda is called with the case value as an argument. The first matching
condition executes its block. This allows for complex custom matching logic.

## case in Method Dispatch

This example shows how case/when can be used for method dispatch based on input
type, similar to pattern matching in functional languages.

method_dispatch.rb
  

def process(input)
  case input
  when Hash
    input.transform_values(&amp;:to_s)
  when Array
    input.map(&amp;:to_s)
  when String
    input.upcase
  else
    input.to_s
  end
end

puts process({a: 1, b: 2})   # {"a"=&gt;"1", "b"=&gt;"2"}
puts process([1, 2, 3])      # ["1", "2", "3"]
puts process("hello")        # "HELLO"
puts process(42)             # "42"

The process method handles different input types appropriately using case/when.
This pattern is common in Ruby for writing flexible methods that accept multiple
types.

## Source

[Ruby Control Expressions Documentation](https://ruby-doc.org/3.4.1/syntax/control_expressions_rdoc.html)

This tutorial covered Ruby's case and when statements with examples showing
value matching, type checking, regex patterns, and custom matching logic.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).