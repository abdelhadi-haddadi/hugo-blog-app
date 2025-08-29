+++
title = "Ruby return Keyword"
date = 2025-08-29T20:11:30.752+01:00
draft = false
description = "Ruby return keyword tutorial explains how to use return statements with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby return Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's return keyword. The return
statement controls method execution flow and output values.

The return keyword exits a method immediately and optionally provides
a value. Without return, Ruby methods return the last evaluated expression.

Return statements make method behavior explicit and allow early termination.
They work with all value types including multiple values via arrays.

## Basic Method Return

This example shows a simple method with an explicit return statement. The method
calculates and returns the square of a number.

basic_return.rb
  

def square(num)
  return num * num
end

result = square(5)
puts "The square is #{result}"

The return statement sends the calculated value back to the caller.
Without it, the method would still work but explicit returns improve clarity.

## Early Return from Method

Return statements can exit methods before reaching the end. This example checks
input validity and returns early if invalid.

early_return.rb
  

def divide(a, b)
  return "Error: division by zero" if b == 0
  a / b
end

puts divide(10, 2)
puts divide(5, 0)

The method returns an error message immediately if the divisor is zero. This
pattern avoids nested conditionals and improves readability.

## Returning Multiple Values

Ruby methods can return multiple values using arrays. This example returns both
quotient and remainder from division.

multiple_return.rb
  

def divmod(a, b)
  return [a / b, a % b]
end

quotient, remainder = divmod(10, 3)
puts "Quotient: #{quotient}, Remainder: #{remainder}"

The return statement packages both values in an array. The caller can destructure
them into separate variables for convenient access.

## Conditional Return Values

Methods can return different values based on conditions. This example implements
a simple scoring system with tiered responses.

conditional_return.rb
  

def evaluate_score(score)
  return "Excellent!" if score &gt;= 90
  return "Good job" if score &gt;= 70
  return "Needs improvement" if score &gt;= 50
  "Fail"
end

puts evaluate_score(95)
puts evaluate_score(65)

Each condition returns a different string. The final implicit return handles the
lowest score case. This pattern creates readable decision trees.

## Return in Blocks

The return keyword behaves differently in blocks versus methods. This example
demonstrates how return exits the enclosing method, not just the block.

block_return.rb
  

def find_first_even(numbers)
  numbers.each do |n|
    return n if n.even?
  end
  nil
end

puts find_first_even([1, 3, 5, 2, 4])
puts find_first_even([1, 3, 5])

The return statement exits the entire method when finding an even number. Without
it, the block would continue processing all elements.

## Return with begin-rescue

Return statements work with exception handling. This example shows how return
values interact with rescue blocks.

rescue_return.rb
  

def safe_divide(a, b)
  begin
    a / b
  rescue ZeroDivisionError
    return "Cannot divide by zero"
  end
end

puts safe_divide(10, 2)
puts safe_divide(5, 0)

The method returns either the division result or an error message. The return in
the rescue block provides an alternative execution path.

## Explicit vs Implicit Return

This example compares explicit return statements with Ruby's implicit return
behavior. Both styles work but have different use cases.

explicit_vs_implicit.rb
  

def explicit_return
  return "Hello"
  "World"
end

def implicit_return
  "Hello"
  "World"
end

puts explicit_return # Outputs "Hello"
puts implicit_return # Outputs "World"

The explicit return exits immediately, ignoring subsequent code. The implicit
version evaluates all expressions and returns the last one.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's return keyword with practical examples showing
method control flow, multiple returns, and special cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).