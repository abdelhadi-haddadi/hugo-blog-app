+++
title = "Ruby rescue Keyword"
date = 2025-08-29T20:11:29.634+01:00
draft = false
description = "Ruby rescue tutorial explains how to handle exceptions with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby rescue Keyword

last modified April 27, 2025

This tutorial explains Ruby's rescue keyword for exception handling.
It prevents program crashes by gracefully managing runtime errors.

The rescue keyword catches exceptions raised in Ruby code. It works
with begin/end blocks or as part of method definitions.

Exception handling separates normal program flow from error logic. This makes
code more robust and maintainable. Ruby provides several related keywords.

## Basic rescue Example

This simple example demonstrates catching a division by zero error. The rescue
block prevents program termination.

basic_rescue.rb
  

begin
  result = 10 / 0
  puts "Result: #{result}"
rescue =&gt; e
  puts "Error occurred: #{e.message}"
end

The code attempts invalid division, triggering an exception. The rescue block
catches it and prints the error message instead of crashing.

## Rescuing Specific Exceptions

Ruby allows targeting specific exception classes. This provides precise control
over different error types.

specific_rescue.rb
  

begin
  File.open("nonexistent.txt") do |file|
    puts file.read
  end
rescue Errno::ENOENT
  puts "File not found"
rescue IOError =&gt; e
  puts "IO error: #{e.message}"
end

Different rescue blocks handle distinct exceptions. The first catches missing
files, while the second handles general IO errors.

## Inline rescue

Ruby supports a compact form where rescue modifies an expression. This provides
default values when operations fail.

inline_rescue.rb
  

value = Integer("abc") rescue 0
puts "Converted value: #{value}"

data = JSON.parse("invalid") rescue {}
puts "Parsed data: #{data.inspect}"

When parsing fails, the rescue clauses provide fallback values. This pattern
works well for simple cases needing defaults.

## Ensure for Cleanup

The ensure clause guarantees code execution regardless of success.
It's ideal for resource cleanup.

ensure_clause.rb
  

file = nil
begin
  file = File.open("data.txt", "w")
  file.puts "Important data"
  raise "Simulated error"
rescue =&gt; e
  puts "Error writing file: #{e}"
ensure
  file.close if file
  puts "File handle closed"
end

The ensure block closes the file whether writing succeeds or fails. This prevents
resource leaks in all scenarios.

## Retry Mechanism

The retry keyword re-executes the begin block after rescue. This
enables automatic recovery from transient failures.

retry_mechanism.rb
  

attempts = 0

begin
  attempts += 1
  puts "Attempt #{attempts}"
  raise "Network error" if attempts &lt; 3
rescue
  retry if attempts &lt; 3
  puts "Maximum attempts reached"
end

The code retries failed operations up to a limit. After three attempts, it gives
up and proceeds with error handling.

## Rescue in Methods

Methods can use rescue without explicit begin/end blocks. This provides cleaner
syntax for method-level error handling.

method_rescue.rb
  

def calculate_ratio(a, b)
  a / b
rescue ZeroDivisionError
  Float::INFINITY
rescue TypeError =&gt; e
  puts "Invalid input: #{e.message}"
  nil
end

puts calculate_ratio(10, 0)
puts calculate_ratio(10, "2")

The method handles division errors and type mismatches gracefully. Each rescue
clause addresses a specific failure mode.

## Custom Exceptions with Rescue

Ruby programs can define and rescue custom exception classes. This enables
domain-specific error handling.

custom_exceptions.rb
  

class TemperatureError &lt; StandardError; end

def check_temperature(temp)
  raise TemperatureError, "Too hot!" if temp &gt; 40
  raise TemperatureError, "Too cold!" if temp &lt; 10
  puts "Temperature OK"
rescue TemperatureError =&gt; e
  puts "Warning: #{e.message}"
end

check_temperature(45)
check_temperature(5)
check_temperature(25)

The custom TemperatureError class provides meaningful error categorization. The
rescue block handles all temperature-related issues uniformly.

## Source

[Ruby Exceptions Documentation](https://ruby-doc.org/3.4.1/syntax/exceptions_rdoc.html/)

This tutorial covered Ruby's rescue keyword with examples showing basic usage,
specific exceptions, inline syntax, and custom error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).