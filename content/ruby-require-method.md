+++
title = "Ruby Require Method"
date = 2025-08-29T20:11:29.626+01:00
draft = false
description = "Ruby require method tutorial explains how to load external code with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Require Method

last modified April 27, 2025

This tutorial explains how to use Ruby's require method to load
external code. The method is essential for modular programming in Ruby.

The require method loads Ruby files or extensions only once. It
searches in the $LOAD_PATH for the specified file. The method
returns true if successful, false if already loaded.

Unlike load, require prevents multiple loads of the
same file. It's ideal for loading libraries and extensions. The method handles
both .rb and platform-specific extensions.

## Basic Require Example

This simple example demonstrates loading a standard library module with require.
The date module provides date manipulation capabilities.

basic_require.rb
  

require 'date'

today = Date.today
puts "Today is #{today}"

The require 'date' loads Ruby's date module. After requiring, we
can use the Date class directly. The method searches standard
library paths automatically.

## Requiring Local Files

This example shows how to require a local Ruby file in the same directory.
We first need to adjust the load path or use relative paths.

local_require.rb
  

require_relative 'mylib'

puts MyLib.hello("Ruby")

The require_relative looks for files relative to the current file's
location. This is safer than modifying $LOAD_PATH for local files.

## Checking Require Success

The require method returns a boolean indicating if loading
succeeded. We can use this to handle missing dependencies gracefully.

require_check.rb
  

if require 'json'
  puts "JSON module loaded successfully"
else
  puts "JSON module not available"
end

The code checks the return value of require to confirm loading.
This pattern is useful for optional dependencies or fallback implementations.

## Requiring Gems

RubyGems integrates with require to load installed gems. This
example shows requiring a popular HTTP library.

gem_require.rb
  

require 'httparty'

response = HTTParty.get('https://api.github.com')
puts response.code

After installing the gem (gem install httparty), we can require it
like any standard library. RubyGems adds gem paths to $LOAD_PATH.

## Conditional Requiring

We can conditionally require different implementations based on environment.
This example loads either a production or development database adapter.

conditional_require.rb
  

if ENV['RACK_ENV'] == 'production'
  require 'pg'
else
  require 'sqlite3'
end

The code checks an environment variable to determine which database library to
load. This pattern is common in configuration management.

## Requiring Multiple Files

Large projects often split code across multiple files. This example shows
requiring several related files from a directory.

multi_require.rb
  

Dir.glob(File.join('lib', '*.rb')).each do |file|
  require file
end

The code uses Dir.glob to find all .rb files in the lib directory.
Each file is then required individually. This automates loading many files.

## Requiring with Load Path Modification

Sometimes we need to add custom paths to $LOAD_PATH before
requiring. This example shows how to properly modify the load path.

load_path_require.rb
  

$LOAD_PATH.unshift(File.expand_path('../vendor', __FILE__))
require 'custom_lib'

puts CustomLib.version

The code adds a vendor directory to the load path before requiring. Using
unshift ensures our path is searched first. Always expand paths
properly.

## Source

[Ruby Require Documentation](https://ruby-doc.org/core-3.1.2/Kernel.html#method-i-require)

This tutorial covered Ruby's require method with practical examples showing
library loading, local files, gems, and path management techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).