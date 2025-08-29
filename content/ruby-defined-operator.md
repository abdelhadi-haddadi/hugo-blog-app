+++
title = "Ruby defined? Operator"
date = 2025-08-29T20:11:19.461+01:00
draft = false
description = "Ruby defined? operator tutorial explains how to check variable and method existence with practical examples."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby defined? Operator

last modified April 27, 2025

This tutorial explains how to use Ruby's defined? operator. It
checks if a variable, method, or expression is defined and returns its type.

The defined? operator is a special keyword that tests existence of
Ruby entities. It returns a string describing what it found or nil if undefined.

This operator helps prevent errors by safely checking for definitions before use.
It works with variables, methods, constants, and other Ruby language elements.

## Basic variable checking

This example shows how to check if local, instance, and global variables exist.
The defined? operator returns different strings for each type.

basic_variables.rb
  

local_var = 10
@instance_var = 20
$global_var = 30

puts defined?(local_var)    # "local-variable"
puts defined?(@instance_var) # "instance-variable"
puts defined?($global_var)   # "global-variable"
puts defined?(unknown_var)   # nil

The operator returns descriptive strings for defined variables and nil for
undefined ones. This helps distinguish between variable types and states.

## Checking method existence

The defined? operator can verify if methods are available. It checks
both built-in methods and user-defined ones.

method_checking.rb
  

def greet
  "Hello"
end

puts defined?(greet)       # "method"
puts defined?(puts)        # "method"
puts defined?(unknown_method) # nil

# With parameters
puts defined?(greet())     # "method"

The operator returns "method" for both defined methods, including Ruby core
methods. Parentheses are optional but can clarify method checking.

## Constant verification

Constants behave differently than variables in Ruby. The defined?
operator helps check their existence before access.

constant_checking.rb
  

PI = 3.1415
module MyModule
  VERSION = "1.0"
end

puts defined?(PI)              # "constant"
puts defined?(MyModule::VERSION) # "constant"
puts defined?(UNKNOWN_CONST)   # nil

Constants must be fully qualified with their module when nested. The operator
returns "constant" for defined constants regardless of scope.

## Checking expressions

The defined? operator can test entire expressions, not just simple
identifiers. This helps verify complex operations before execution.

expression_checking.rb
  

x = 10
y = 20

puts defined?(x + y)      # "method"
puts defined?(x.foo)      # nil
puts defined?(x.methods)  # "method"
puts defined?(x[0])       # nil

Mathematical operations return "method" as they use the + method. Undefined
operations return nil. This helps prevent NoMethodError exceptions.

## Superclass method checking

When working with inheritance, defined? can check if a superclass
implements a method. This is useful for method overriding scenarios.

superclass_checking.rb
  

class Parent
  def inherited_method
    "Parent method"
  end
end

class Child &lt; Parent
  def inherited_method
    if defined?(super)
      super + " extended"
    else
      "No parent method"
    end
  end
end

puts Child.new.inherited_method # "Parent method extended"

The example safely checks for a superclass implementation before calling it.
This pattern prevents errors when parent classes might not define the method.

## Conditional assignment

Combining defined? with conditional logic enables safe variable
initialization. This prevents reinitialization of existing variables.

conditional_assignment.rb
  

$counter ||= 0

unless defined?($counter)
  $counter = 0
end

def increment
  $counter += 1
end

increment
puts $counter # 1

Both patterns ensure variables exist before use. The defined?
version is more explicit and works with nil/false values unlike ||=.

## Checking yield and blocks

The operator can test if a block was given to a method using yield.
This helps make methods block-optional.

yield_checking.rb
  

def process
  if defined?(yield)
    yield
  else
    "No block given"
  end
end

puts process { "Block provided" } # "Block provided"
puts process                      # "No block given"

The method adapts its behavior based on block presence. This creates more
flexible APIs that work with or without blocks.

## Source

[Ruby Keywords Documentation](https://ruby-doc.org/3.4.1/syntax/keywords_rdoc.html/)

This tutorial covered Ruby's defined? operator with practical examples showing
variable, method, and expression checking patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Ruby tutorials](/ruby/).