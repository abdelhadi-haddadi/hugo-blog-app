+++
title = "Ruby do Keyword"
date = 2025-08-29T20:11:20.569+01:00
draft = false
description = "Ruby do keyword tutorial explains how to use this block delimiter with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby do Keyword

last modified April 27, 2025

This tutorial explains how to use Ruby's do keyword to create
blocks. Blocks are anonymous functions that can be passed to methods.

The do keyword starts a multi-line block in Ruby. It pairs with
end to delimit the block's body. Blocks can accept parameters.

Ruby blocks come in two forms: do...end for multi-line blocks and
{...} for single-line blocks. The do form is preferred
for readability with longer blocks.

## Basic do Block with Array#each

This example shows the simplest use of do with the each
method. The block executes for each array element.

basic_do.rb
  

fruits = ["apple", "banana", "cherry"]

fruits.each do |fruit|
  puts "I love #{fruit}s!"
end

The do keyword starts the block, with |fruit| as the
parameter. The block runs three times, once for each array element.

## do Block with Multiple Parameters

Blocks can accept multiple parameters. This example uses each_with_index
which provides both value and index.

multiple_params.rb
  

colors = ["red", "green", "blue"]

colors.each_with_index do |color, index|
  puts "Color #{index + 1}: #{color}"
end

The block receives both the array element and its index. Parameters are
separated by commas within the pipes. This prints a numbered color list.

## Custom Method with do Block

Methods can accept blocks using yield. This example shows how to
create a method that takes a block.

custom_method.rb
  

def repeat(times)
  times.times do |i|
    yield(i + 1)
  end
end

repeat(3) do |count|
  puts "Iteration #{count}"
end

The repeat method yields to its block the specified number of
times. The block receives the current iteration count as a parameter.

## do Block with Hash Iteration

Hashes can be iterated with each, yielding key-value pairs. The
do block makes this readable.

hash_iteration.rb
  

person = { name: "Alice", age: 30, occupation: "Developer" }

person.each do |key, value|
  puts "#{key.capitalize}: #{value}"
end

The block receives two parameters for each hash pair. The do form
is ideal for multi-line hash processing like this example.

## do Block with File Operations

File operations often use blocks for automatic resource management. This example
shows File.open with a block.

file_operations.rb
  

File.open("data.txt", "w") do |file|
  file.puts "Line 1"
  file.puts "Line 2"
  file.puts "Line 3"
end

The file automatically closes after the block executes. This pattern ensures
proper resource cleanup even if errors occur within the block.

## Nested do Blocks

Blocks can be nested for multi-dimensional iteration. This example shows nested
each calls with do blocks.

nested_blocks.rb
  

matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

matrix.each do |row|
  row.each do |cell|
    print "#{cell} "
  end
  puts
end

The outer block processes each row, while the inner block handles individual
cells. The do form clearly shows the nested structure.

## do Block with begin/rescue

Blocks can include exception handling. This example wraps block code in
begin/rescue for error management.

error_handling.rb
  

def safe_divide(a, b)
  begin
    yield(a, b)
  rescue ZeroDivisionError
    puts "Cannot divide by zero!"
  end
end

safe_divide(10, 2) do |x, y|
  puts "#{x} / #{y} = #{x / y}"
end

safe_divide(10, 0) do |x, y|
  puts "#{x} / #{y} = #{x / y}"
end

The block contains division logic while the method handles errors. This
separation of concerns makes the code more maintainable.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's do keyword with practical examples
showing iteration, method blocks, file operations, and error handling.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).