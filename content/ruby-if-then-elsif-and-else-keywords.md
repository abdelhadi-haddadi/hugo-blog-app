+++
title = "Ruby if, then, elsif, and else Keywords"
date = 2025-08-29T20:11:22.785+01:00
draft = false
description = "Ruby conditional statements tutorial explains how to use if, then, elsif, and else keywords with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby if, then, elsif, and else Keywords

last modified April 27, 2025

This tutorial explains how to use Ruby's conditional statements with if,
then, elsif, and else keywords. These
constructs control program flow based on boolean conditions.

The if keyword evaluates a condition and executes code when true.
then separates the condition from the code block (optional in most cases).

elsif provides additional conditions to check when previous ones fail.
else executes when all preceding conditions are false. These form
the complete conditional structure in Ruby.

## Basic if Statement

This simple example demonstrates the most basic form of conditional execution.
The code block runs only when the condition evaluates to true.

basic_if.rb
  

age = 20

if age &gt;= 18
  puts "You are an adult"
end

The condition age &gt;= 18 is evaluated first. Since 20 is greater than
18, the message prints. Without the if statement, the code would
always execute.

## if with else Clause

Adding an else clause provides an alternative execution path when
the condition fails. This covers all possible cases for the condition.

if_else.rb
  

temperature = 15

if temperature &gt; 25
  puts "It's hot outside"
else
  puts "It's not hot outside"
end

Since 15 is not greater than 25, the else block executes. The
else clause ensures some code always runs, regardless of the
condition's result.

## if with elsif Clauses

Multiple conditions can be chained using elsif. Ruby checks each
condition in order until one evaluates to true.

if_elsif.rb
  

score = 85

if score &gt;= 90
  puts "Grade A"
elsif score &gt;= 80
  puts "Grade B"
elsif score &gt;= 70
  puts "Grade C"
else
  puts "Grade D"
end

The first false condition (90) skips to the elsif (80), which is
true for 85. Ruby stops checking remaining conditions after finding a match.
The else handles any scores below 70.

## Using then Keyword

The then keyword explicitly separates the condition from the code
block. While usually optional, it's required in some one-line forms.

if_then.rb
  

x = 10

if x == 10 then puts "x is 10" end

# Multi-line version without then
if x == 10
  puts "x is 10"
end

Both forms work identically. The then version is more compact for
simple conditions. For complex conditions or multiple statements, the multi-line
form is preferred for readability.

## Nested if Statements

if statements can be nested inside other if statements
to create complex decision trees. Each level adds another condition to check.

nested_if.rb
  

age = 25
has_license = true

if age &gt;= 18
  if has_license
    puts "You can drive"
  else
    puts "You need a license first"
  end
else
  puts "You're too young to drive"
end

The outer if checks age, while the inner one verifies license status.
Nested conditionals should be used sparingly as they can become hard to read.
Consider using logical operators (&amp;&amp;, ||) instead.

## Conditional Assignment

Ruby allows assigning values based on conditions in a compact form. This combines
variable assignment with conditional logic.

conditional_assignment.rb
  

status = if rand(2) == 1
           "active"
         else
           "inactive"
         end

puts "Account status: #{status}"

The entire if expression evaluates to either "active" or "inactive",
which gets assigned to status. This pattern is common when the
result of the condition is the primary purpose.

## Modifier if Form

Ruby offers a postfix if syntax for simple conditions. The code
executes only if the condition following it is true.

modifier_if.rb
  

logged_in = true

puts "Welcome back!" if logged_in

# Equivalent to:
if logged_in
  puts "Welcome back!"
end

The modifier form is concise for single statements with simple conditions. For
complex conditions or multiple statements, the standard if form is
more appropriate. The modifier form doesn't support else clauses.

## Source

[Ruby Control Expressions Documentation](https://ruby-doc.org/3.4.1/syntax/control_expressions_rdoc.html)

This tutorial covered Ruby's conditional statements with practical examples
showing basic usage, branching, nesting, and special forms.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).