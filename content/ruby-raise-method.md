+++
title = "Ruby raise Method"
date = 2025-08-29T20:11:28.510+01:00
draft = false
description = "Ruby raise method tutorial explains how to use this exception handling tool with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby raise Method

last modified April 27, 2025

This tutorial explains how to use Ruby's raise method for exception
handling. The raise method triggers exceptions in Ruby programs.

The raise method creates and raises exceptions. It stops normal
program flow and transfers control to exception handlers. Exceptions can be
built-in or custom classes.

Proper exception handling makes programs more robust and maintainable. The
raise method is key to signaling error conditions in Ruby.
Multiple forms allow flexible exception creation.

## Basic raise Example

This simple example demonstrates the most basic form of raise.
It creates a RuntimeError with a custom message.

basic_raise.rb
  

def divide(a, b)
  raise "Division by zero" if b == 0
  a / b
end

begin
  result = divide(10, 0)
  puts result
rescue =&gt; e
  puts "Error: #{e.message}"
end

The raise method stops execution when b is zero. The rescue block
catches the exception and prints the error message. This prevents program
crashing.

## Raising Specific Exception Classes

Ruby allows raising specific exception classes for different error conditions.
This helps with precise error handling.

specific_exception.rb
  

def process_file(filename)
  raise ArgumentError, "Filename required" if filename.nil?
  raise Errno::ENOENT, "File not found" unless File.exist?(filename)
  
  File.read(filename)
end

begin
  process_file(nil)
rescue ArgumentError =&gt; e
  puts "Argument error: #{e}"
rescue Errno::ENOENT =&gt; e
  puts "File error: #{e}"
end

Different exception classes help distinguish error types. The rescue blocks can
handle each case appropriately. This makes error recovery more specific.

## Re-raising Exceptions

Sometimes you need to catch an exception, perform some action, then re-raise it.
This preserves the original exception while adding handling.

reraise.rb
  

def risky_operation
  raise "Original error"
end

begin
  risky_operation
rescue =&gt; e
  puts "Logging error: #{e.message}"
  raise # Re-raises the same exception
end

The empty raise in the rescue block re-throws the caught exception.
This pattern is useful for logging or cleanup before propagating the error.

## Raising with Custom Exception Classes

For complex applications, custom exception classes provide better organization.
They can carry additional error information.

custom_exception.rb
  

class ValidationError &lt; StandardError
  attr_reader :field
  
  def initialize(field, message)
    @field = field
    super(message)
  end
end

def validate_user(name)
  raise ValidationError.new(:name, "Name too short") if name.length &lt; 3
  puts "Name validated"
end

begin
  validate_user("Al")
rescue ValidationError =&gt; e
  puts "Validation failed on #{e.field}: #{e.message}"
end

Custom exceptions can store additional context about errors. The rescue block
accesses both the custom attributes and standard message. This enables richer
error handling.

## Conditional Exception Raising

The raise method can be used with conditions to selectively trigger
exceptions. This makes error checking concise.

conditional_raise.rb
  

def calculate_discount(price, discount)
  raise ArgumentError, "Price must be positive" unless price &gt; 0
  raise ArgumentError, "Discount must be 0-100%" unless (0..100).cover?(discount)
  
  price * (100 - discount) / 100.0
end

begin
  puts calculate_discount(100, 110)
rescue ArgumentError =&gt; e
  puts "Invalid input: #{e.message}"
end

The guard clauses with raise validate inputs concisely. Each
condition has a specific error message. This fails fast with clear feedback.

## Raising with Backtrace

Sometimes you want to raise a new exception while preserving the original
backtrace. This maintains the full error context.

backtrace_raise.rb
  

def inner_method
  raise "Original error"
end

def outer_method
  inner_method
rescue =&gt; e
  raise "Wrapper error", cause: e
end

begin
  outer_method
rescue =&gt; e
  puts "Caught: #{e.message}"
  puts "Original cause: #{e.cause.message}"
  puts "Backtrace:\n#{e.backtrace.join("\n")}"
end

The cause option links the new exception to the original. The
backtrace shows both error points. This is useful for wrapping low-level errors.

## Ensuring Cleanup with raise

The ensure clause guarantees cleanup code runs even when
raise triggers. This prevents resource leaks.

ensure_cleanup.rb
  

def process_data
  file = File.open("data.txt", "w")
  
  begin
    # Simulate error during processing
    raise "Processing failed" if rand &lt; 0.5
    
    file.puts "Success data"
  ensure
    file.close
    puts "File closed successfully"
  end
end

begin
  process_data
rescue =&gt; e
  puts "Operation failed: #{e.message}"
end

The ensure block runs whether processing succeeds or fails. The file
always gets closed properly. This pattern is crucial for resource management.

## Source

[Ruby raise Method Documentation](https://ruby-doc.org/core/Kernel.html#method-i-raise)

This tutorial covered Ruby's raise method with examples showing basic usage,
custom exceptions, error propagation, and resource cleanup patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).