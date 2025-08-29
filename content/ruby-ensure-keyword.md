+++
title = "Ruby ensure Keyword"
date = 2025-08-29T20:11:20.581+01:00
draft = false
description = "Ruby ensure tutorial explains how to use the ensure keyword for guaranteed code execution with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby ensure Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's ensure keyword. The
ensure clause guarantees code execution regardless of exceptions.

The ensure keyword defines a block that always executes after a
begin block, whether an exception occurs or not. It's typically
used for cleanup operations.

ensure works with begin, rescue, and
else keywords. It runs after normal execution or after any rescue
blocks. The code executes even if you return early or raise another exception.

## Basic ensure Example

This simple example demonstrates the basic usage of ensure. The
ensure block runs regardless of whether an exception occurs.

basic_ensure.rb
  

begin
  puts "Performing operation"
  raise "Error occurred" if rand &lt; 0.5
rescue =&gt; e
  puts "Rescued: #{e.message}"
ensure
  puts "This always runs"
end

The ensure block executes whether the operation succeeds or fails.
This makes it ideal for cleanup tasks like closing files or releasing resources.

## File Handling with ensure

A common use of ensure is ensuring files are properly closed. This
example shows proper file handling even when exceptions occur.

file_handling.rb
  

begin
  file = File.open("data.txt", "w")
  file.puts "Writing important data"
  raise "Disk error" if rand &lt; 0.3
rescue =&gt; e
  puts "Error writing file: #{e}"
ensure
  if file
    file.close
    puts "File closed successfully"
  end
end

The file is guaranteed to close, preventing resource leaks. The if file
check ensures we don't try to close a never-opened file.

## Database Connection with ensure

Database connections should always be properly closed. This example shows how
ensure guarantees connection cleanup.

database.rb
  

require 'sqlite3'

begin
  db = SQLite3::Database.new("test.db")
  db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
  db.execute("INSERT INTO users (name) VALUES ('John')")
rescue SQLite3::Exception =&gt; e
  puts "Database error: #{e}"
ensure
  if db
    db.close
    puts "Database connection closed"
  end
end

The database connection closes whether the operations succeed or fail. This
prevents connection leaks that could exhaust database resources.

## ensure with Return Statements

ensure blocks run even when using return inside a
method. This example demonstrates this behavior.

return_ensure.rb
  

def test_ensure
  begin
    puts "Starting method"
    return "Early return" if rand &lt; 0.5
    puts "Normal execution"
  ensure
    puts "Ensure block executed"
  end
end

puts test_ensure

The ensure block runs before the method returns. This happens regardless of
whether the return is early or at the end of normal execution.

## Nested ensure Blocks

Ruby allows nested begin blocks with their own ensure
clauses. This example shows how they execute in order.

nested_ensure.rb
  

begin
  puts "Outer begin"
  
  begin
    puts "Inner begin"
    raise "Inner error" if rand &lt; 0.5
  ensure
    puts "Inner ensure"
  end

  raise "Outer error" if rand &lt; 0.5
rescue =&gt; e
  puts "Rescued: #{e}"
ensure
  puts "Outer ensure"
end

Each ensure block runs when its corresponding begin block exits. Inner ensures
run before outer ones, creating a clean-up stack.

## ensure with Threads

ensure blocks in threads execute when the thread terminates,
whether normally or due to an exception. This example demonstrates thread cleanup.

thread_ensure.rb
  

thread = Thread.new do
  begin
    puts "Thread working"
    sleep 1
    raise "Thread error" if rand &lt; 0.5
  ensure
    puts "Thread cleanup"
  end
end

thread.join
puts "Main program continues"

The thread's ensure block runs whether the thread completes successfully or
raises an exception. This is crucial for thread-local resource cleanup.

## ensure in Method Definitions

Methods can use ensure without explicit begin blocks.
This example shows the shorthand syntax for method-level ensure.

method_ensure.rb
  

def process_data
  puts "Processing data"
  raise "Processing error" if rand &lt; 0.4
rescue =&gt; e
  puts "Error: #{e}"
ensure
  puts "Cleanup resources"
end

process_data

The entire method body acts as an implicit begin block. The ensure clause still
guarantees execution regardless of how the method exits.

## Source

[Ruby Exception Handling Documentation](https://ruby-doc.org/3.4.1/syntax/exceptions_rdoc.html)

This tutorial covered Ruby's ensure keyword with practical examples showing
resource cleanup, thread safety, and method-level guarantees.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).