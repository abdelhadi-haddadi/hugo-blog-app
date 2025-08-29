+++
title = "Ruby in Keyword"
date = 2025-08-29T20:11:23.981+01:00
draft = false
description = "Ruby in keyword tutorial explains pattern matching with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby in Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's in keyword for pattern
matching. Introduced in Ruby 2.7, it provides powerful pattern matching
capabilities.

The in keyword checks if a value matches a pattern. It works with
case statements and standalone expressions. It can destructure complex objects.

Pattern matching simplifies conditional logic for complex data structures. The
in operator makes code more readable and maintainable. It's widely
used in modern Ruby code.

## Basic in Keyword Example

This simple example demonstrates the basic usage of the in keyword
with a case statement. It matches against different value patterns.

basic_in.rb
  

value = 42

case value
in 0
  puts "Zero"
in 1..50
  puts "Between 1 and 50"
in 51..100
  puts "Between 51 and 100"
else
  puts "Something else"
end

The in keyword checks if value matches each pattern.
When a match is found, the corresponding block executes. Ranges work naturally.

## Array Pattern Matching

The in keyword can destructure arrays. This example shows matching
against array patterns with variable binding.

array_matching.rb
  

data = [1, 2, 3]

case data
in [a, b, c]
  puts "Three elements: #{a}, #{b}, #{c}"
in [1, *rest]
  puts "Starts with 1, rest: #{rest}"
else
  puts "No match"
end

The first pattern matches any 3-element array, binding elements to variables.
The second matches arrays starting with 1. The splat operator captures rest.

## Hash Pattern Matching

Hash patterns work similarly to arrays. This example demonstrates matching
against hash keys and extracting values.

hash_matching.rb
  

person = {name: "John", age: 30, city: "New York"}

case person
in {name: "John", age:}
  puts "John is #{age} years old"
in {name:, city:}
  puts "#{name} lives in #{city}"
else
  puts "No match"
end

The first pattern matches hashes with :name as "John" and any age.
The second extracts name and city from any hash containing those keys.

## Standalone in Expression

The in keyword can be used outside case statements. This example
shows its boolean return value when matching patterns.

standalone_in.rb
  

data = [1, 2, 3]

if data in [first, *]
  puts "First element is #{first}"
end

puts "Match!" if {a: 1, b: 2} in {a:}

The standalone in returns true if the pattern matches. It binds
variables in the current scope. The splat ignores remaining elements.

## Pattern Matching with Guards

Patterns can include additional conditions with if guards. This
adds more specificity to matches.

guards.rb
  

user = {name: "Alice", age: 25}

case user
in {name:, age:} if age &gt;= 18
  puts "#{name} is an adult"
in {name:, age:}
  puts "#{name} is a minor"
end

The guard condition if age &gt;= 18 makes the first pattern more
specific. Guards can use any boolean expression with pattern variables.

## Nested Pattern Matching

Patterns can be nested to match complex data structures. This example shows
matching against nested arrays and hashes.

nested.rb
  

data = {
  user: {name: "Bob", roles: [:admin, :editor]},
  timestamp: Time.now
}

case data
in {user: {name:, roles: [:admin, *]}, timestamp:}
  puts "#{name} is an admin at #{timestamp}"
in {user: {name:, roles:}, timestamp:}
  puts "#{name} has roles: #{roles.join(', ')}"
end

The first pattern matches only if roles includes :admin. Nested
patterns can match arrays within hashes and vice versa. Variables bind at each
level.

## Alternative Patterns

The in keyword supports alternative patterns with |.
This matches if any of the patterns succeed.

alternatives.rb
  

response = {status: 404, message: "Not Found"}

case response
in {status: 200..299}
  puts "Success"
in {status: 400..499 | 500..599}
  puts "Client or server error"
in {status:}
  puts "Unknown status: #{status}"
end

The second pattern matches either 4xx or 5xx status codes. Alternative patterns
must bind the same variables. They provide concise OR logic.

## Source

[Ruby Pattern Matching Documentation](https://ruby-doc.org/3.4.1/syntax/pattern_matching_rdoc.html)

This tutorial covered Ruby's in keyword with practical examples
showing array, hash, and nested pattern matching techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).