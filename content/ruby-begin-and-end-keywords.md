+++
title = "Ruby BEGIN and END Keywords"
date = 2025-08-29T20:11:18.365+01:00
draft = false
description = "Ruby BEGIN and END tutorial explains how to use these special code blocks with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby BEGIN and END Keywords

last modified April 27, 2025

This tutorial explains how to use Ruby's BEGIN and END
keywords. These special blocks control code execution at program start and exit.

The BEGIN keyword defines a block that runs before any other code.
The END keyword defines a block that runs after all other code.

These hooks are useful for initialization and cleanup tasks. They execute
regardless of program flow or exit conditions. Multiple blocks stack in order.

## Basic BEGIN and END Example

This simple example demonstrates the execution order of BEGIN and END blocks.
Notice they run outside the normal program flow.

basic_begin_end.rb
  

BEGIN {
  puts "This runs first"
}

END {
  puts "This runs last"
}

puts "This runs in between"

The BEGIN block executes before any other code, while
END runs after everything. The main program output appears between
them as expected.

## Multiple BEGIN/END Blocks

Ruby allows multiple BEGIN and END blocks.
BEGIN blocks run in definition order, while END blocks
execute in reverse order (like a stack).

multiple_blocks.rb
  

BEGIN {
  puts "BEGIN 1"
}

BEGIN {
  puts "BEGIN 2"
}

END {
  puts "END 1"
}

END {
  puts "END 2"
}

puts "Main program"

Notice BEGIN blocks execute top-to-bottom, while END
blocks run bottom-to-top. This behavior is consistent across Ruby versions.

## BEGIN with Variable Initialization

BEGIN blocks can initialize variables used in the main program.
This example sets up configuration before the main code runs.

initialization.rb
  

BEGIN {
  $app_name = "My Ruby Program"
  $start_time = Time.now
}

puts "Welcome to #{$app_name}"
puts "Started at #{$start_time}"

END {
  puts "Program ran for #{Time.now - $start_time} seconds"
}

Global variables ($) work best as they avoid scope issues. The END
block calculates total runtime using the BEGIN-initialized time.

## Error Handling in END Blocks

END blocks execute even when the program exits early or raises
exceptions. This makes them ideal for cleanup tasks.

error_handling.rb
  

BEGIN {
  puts "Starting risky operation"
}

END {
  puts "Cleanup always happens"
}

raise "Something went wrong!" if rand &lt; 0.5

puts "This might not run"

The END block runs whether the program completes or fails. This ensures
resources are properly released regardless of outcome.

## File Operations with BEGIN/END

A common use case is file handling - opening in BEGIN and closing
in END. This guarantees proper resource management.

file_operations.rb
  

BEGIN {
  $log_file = File.open("output.log", "w")
  $log_file.puts "Log started: #{Time.now}"
}

def log(message)
  $log_file.puts message
end

log("Processing started")

END {
  $log_file.puts "Log ended: #{Time.now}"
  $log_file.close
  puts "Log file closed"
}

log("Processing completed")

The file opens before any logging occurs and closes after all operations finish.
This pattern ensures no resource leaks.

## BEGIN with Command-line Arguments

BEGIN blocks can process ARGV before the main program.
This example handles early argument parsing.

argv_processing.rb
  

BEGIN {
  $verbose = ARGV.delete("--verbose")
  puts "Verbose mode enabled" if $verbose
}

puts "Remaining arguments: #{ARGV.inspect}"

END {
  puts "Verbose logging complete" if $verbose
}

The BEGIN block modifies ARGV before the main program
sees it. The END block can report on verbose operations if enabled.

## Complex Program Structure

This example shows BEGIN/END in a larger program with multiple components.
The blocks help organize setup and teardown.

program_structure.rb
  

BEGIN {
  require 'json'
  require 'net/http'
  $config = JSON.parse(File.read('config.json'))
}

BEGIN {
  $stats = {
    start: Time.now,
    requests: 0
  }
}

def make_request(url)
  $stats[:requests] += 1
  Net::HTTP.get(URI(url))
end

make_request($config['api_endpoint'])

END {
  duration = Time.now - $stats[:start]
  puts "Made #{$stats[:requests]} requests in #{duration} seconds"
  File.write('stats.json', JSON.dump($stats))
}

The BEGIN blocks load dependencies and initialize tracking. The
END block saves statistics regardless of how the program
terminates.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's BEGIN and END blocks with practical examples
showing initialization, cleanup, and error handling patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).