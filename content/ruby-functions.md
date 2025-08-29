+++
title = "Ruby Functions"
date = 2025-08-29T20:11:22.855+01:00
draft = false
description = "Complete guide to Ruby functions covering definition, parameters, blocks, scope, and advanced techniques"
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Functions

last modified April 2, 2025

Functions (methods) are fundamental building blocks in Ruby programming. This 
guide covers everything from basic method definition to advanced techniques like 
blocks, procs, and lambdas. Learn to create flexible, reusable code with proper 
parameter handling and scope management. Mastering Ruby functions is essential 
for writing clean, maintainable code.

## Basic Method Definition

Ruby methods are defined with the def keyword followed by the 
method name. Parentheses for parameters are optional in definition and calls. 
Methods return the value of their last expression unless an explicit 
return is used. This example shows basic method syntax and calling 
conventions. Understanding these fundamentals is crucial for Ruby development.

basic_methods.rb
# Simple method without parameters
def greet
  "Hello, world!"
end

# Method with parameters (parentheses optional)
def add_numbers num1, num2
  num1 + num2
end

# Method with explicit return
def max a, b
  return a if a &gt; b
  b
end

puts greet                # =&gt; "Hello, world!"
puts add_numbers(3, 4)    # =&gt; 7
puts add_numbers 5, 6     # =&gt; 11 (parentheses optional)
puts max(10, 20)          # =&gt; 20

# Additional example: Method with default return
def no_return
  "This string is returned"
end
puts no_return            # =&gt; "This string is returned"

Ruby methods are flexible in their definition and invocation syntax. The 
greet method shows a parameter-less definition, while 
add_numbers demonstrates parameter handling. The max 
method uses an explicit return statement to exit early. 

Method calls can use parentheses or omit them when unambiguous. The last 
expression's value is automatically returned, as shown in the 
no_return example. This implicit return behavior makes Ruby code 
concise while remaining clear.

## Method Parameters

Ruby offers several parameter types: required, optional, default-valued, and 
variable-length. Proper parameter handling makes methods more flexible and 
robust. This example demonstrates different parameter patterns in Ruby methods. 
Understanding these options helps create adaptable method interfaces.

parameters.rb
# Required parameters
def full_name(first, last)
  "#{first} #{last}"
end

# Default parameter values
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end

# Variable-length arguments
def sum(*numbers)
  numbers.sum
end

# Keyword arguments (Ruby 2.0+)
def create_person(name:, age:, email: nil)
  { name: name, age: age, email: email }
end

puts full_name("John", "Doe")         # =&gt; "John Doe"
puts greet("Alice")                   # =&gt; "Hello, Alice!"
puts greet("Bob", "Hi")               # =&gt; "Hi, Bob!"
puts sum(1, 2, 3)                     # =&gt; 6
puts sum(4, 5, 6, 7)                  # =&gt; 22

person = create_person(name: "Eve", age: 30)
puts person.inspect                   # =&gt; {:name=&gt;"Eve", :age=&gt;30, :email=&gt;nil}

# Additional example: Mixed parameters
def mixed(a, b = 2, *c, d:, e: 5)
  { a: a, b: b, c: c, d: d, e: e }
end
puts mixed(1, 3, 4, 5, d: 6).inspect # =&gt; {:a=&gt;1, :b=&gt;3, :c=&gt;[4, 5], :d=&gt;6, :e=&gt;5}

Required parameters like first and last must always 
be provided. Default parameters (greeting = "Hello") make 
arguments optional. The splat operator (*) collects variable 
arguments into an array, as shown in sum.

Keyword arguments (Ruby 2.0+) provide named parameters with optional defaults 
(email: nil). The mixed example combines all types: 
required, default, variable-length, and keyword parameters. This flexibility 
allows for highly customizable method signatures.

## Return Values and Multiple Returns

Ruby methods can return multiple values, which are automatically converted to an 
array. The return keyword is optional but useful for early exits. 
This example demonstrates various return value patterns. Understanding return 
behavior helps write more expressive methods.

returns.rb
# Single value return
def square(x)
  x * x
end

# Multiple values return (as array)
def min_max(numbers)
  [numbers.min, numbers.max]
end

# Early return
def safe_divide(a, b)
  return "Cannot divide by zero" if b == 0
  a / b
end

# Implicit vs explicit return
def implicit_return
  "This is returned"
end

def explicit_return
  return "This is returned"
  "This is not"
end

puts square(5)                    # =&gt; 25
puts min_max([3, 1, 4, 2]).inspect # =&gt; [1, 4]
puts safe_divide(10, 2)           # =&gt; 5
puts safe_divide(10, 0)           # =&gt; "Cannot divide by zero"
puts implicit_return               # =&gt; "This is returned"
puts explicit_return               # =&gt; "This is returned"

# Additional example: Destructuring multiple returns
min, max = min_max([8, 3, 5, 2])
puts "Min: #{min}, Max: #{max}"   # =&gt; "Min: 2, Max: 8"

The square method shows simple single-value return. 
min_max returns multiple values as an array, which can be 
destructured by the caller. safe_divide demonstrates early return 
for error handling.

Ruby always returns the last evaluated expression, making return 
optional. However, explicit returns improve clarity in complex methods. The 
example shows how multiple return values can be conveniently assigned to 
separate variables.

## Blocks and Yield

Blocks are anonymous code chunks passed to methods, enabling powerful 
customization. The yield keyword executes a passed block. This 
example demonstrates block usage and control flow. Mastering blocks is key to 
leveraging Ruby's expressive power.

blocks.rb
# Simple block usage
def with_logging
  puts "Starting execution"
  yield
  puts "Completed execution"
end

with_logging { puts "Inside the block" }

# Block with parameters
def repeat(times)
  times.times { yield }
end

repeat(3) { puts "Hello!" }

# Block with return value
def transform(number)
  yield(number)
end

result = transform(5) { |x| x * 2 }
puts "Transformed result: #{result}" # =&gt; 10

# Checking for block given
def optional_block
  if block_given?
    yield
  else
    puts "No block provided"
  end
end

optional_block                  # =&gt; "No block provided"
optional_block { puts "Block!" } # =&gt; "Block!"

# Additional example: Block with multiple statements
def benchmark
  start = Time.now
  yield
  finish = Time.now
  puts "Execution time: #{finish - start} seconds"
end

benchmark { sleep(1) } # =&gt; "Execution time: ~1.0 seconds"

The with_logging method wraps block execution with messages. 
repeat demonstrates parameter passing to blocks. 
transform shows how blocks can return values to the calling 
method.

block_given? checks if a block was provided, enabling optional 
blocks. The benchmark example measures block execution time, 
showing how blocks can contain multiple statements. Blocks are fundamental to 
Ruby's iterators and DSL capabilities.

## Procs and Lambdas

Procs and lambdas are objectified blocks that can be stored and passed around. 
They differ in argument handling and return behavior. This example compares 
these callable objects. Understanding them unlocks advanced Ruby patterns.

procs_lambdas.rb
# Creating a Proc
square = Proc.new { |x| x * x }
puts square.call(5)      # =&gt; 25

# Creating a Lambda
cube = lambda { |x| x ** 3 }
puts cube.call(3)        # =&gt; 27

# Alternative Lambda syntax
double = -&gt;(x) { x * 2 }
puts double.call(4)      # =&gt; 8

# Differences in return behavior
def proc_return
  my_proc = Proc.new { return "Exiting proc" }
  my_proc.call
  "This won't be reached"
end

def lambda_return
  my_lambda = lambda { return "Exiting lambda" }
  my_lambda.call
  "This will be reached"
end

puts proc_return         # =&gt; "Exiting proc"
puts lambda_return       # =&gt; "This will be reached"

# Additional example: Passing procs to methods
def apply_operation(x, operation)
  operation.call(x)
end

puts apply_operation(10, square)  # =&gt; 100
puts apply_operation(10, cube)    # =&gt; 1000
puts apply_operation(10, double)  # =&gt; 20

Procs are created with Proc.new or the proc method. 
Lambdas use lambda or the stabby arrow syntax (-&gt;). 
Both are called with call or [].

Key differences: lambdas check argument count while procs don't, and 
return in a proc exits the enclosing method, not just the proc. 
The example shows how both can be passed as arguments to other methods.

## Method Objects

Ruby methods can be converted to Method objects using method, 
allowing them to be passed around like procs. This example demonstrates method 
objects and their usage. This technique enables higher-order function patterns.

method_objects.rb
class Calculator
  def add(a, b)
    a + b
  end

  def multiply(a, b)
    a * b
  end
end

calc = Calculator.new
add_method = calc.method(:add)
multiply_method = calc.method(:multiply)

puts add_method.call(3, 4)        # =&gt; 7
puts multiply_method.call(3, 4)   # =&gt; 12

# Converting to proc
add_proc = add_method.to_proc
puts [1, 2, 3].map(&amp;add_proc.curry(2).call(10)) # =&gt; [11, 12, 13]

# Additional example: Unbound methods
unbound_add = Calculator.instance_method(:add)
new_calc = Calculator.new
bound_add = unbound_add.bind(new_calc)
puts bound_add.call(5, 6)         # =&gt; 11

Method objects preserve their receiver and can be called later with 
call. The example shows extracting methods from a 
Calculator instance and invoking them later.

Methods can be converted to procs with to_proc, enabling use with 
methods like map. Unbound methods (without a receiver) can be 
bound to new instances. This flexibility supports advanced metaprogramming 
patterns.

## Scope and Visibility

Ruby methods have different visibility levels: public, protected, and private. 
Instance variables have object scope, while local variables are method-scoped. 
This example demonstrates scope rules and visibility modifiers.

scope.rb
class BankAccount
  def initialize(balance)
    @balance = balance
  end

  # Public method
  def deposit(amount)
    @balance += amount
    log_transaction("Deposit: #{amount}")
  end

  # Another public method
  def withdraw(amount)
    if amount &lt;= @balance
      @balance -= amount
      log_transaction("Withdrawal: #{amount}")
    else
      puts "Insufficient funds"
    end
  end

  # Protected method
  protected
  def log_transaction(message)
    puts "[LOG] #{message}"
  end

  # Private method
  private
  def secret_processing
    puts "Secret bank processing"
  end
end

account = BankAccount.new(100)
account.deposit(50)      # Works (public)
# account.log_transaction("Test") # Error (protected)
# account.secret_processing      # Error (private)

# Additional example: Local variable scope
def scope_demo
  local_var = "I'm local"
  puts local_var
end

scope_demo               # =&gt; "I'm local"
# puts local_var         # Error: undefined local variable

Public methods are accessible anywhere, protected methods can only be called by 
the class or its subclasses, and private methods can only be called within the 
class context. The example shows proper encapsulation with transaction logging.

Instance variables (@balance) persist across method calls within an 
object. Local variables (local_var) exist only within their method. 
Understanding these scope rules prevents variable leakage and naming collisions.

## Functional Programming Techniques

Ruby supports functional programming patterns like higher-order functions, 
currying, and composition. This example demonstrates functional approaches to 
problem solving. These techniques lead to more declarative, reusable code.

functional.rb
# Higher-order function
def apply_math(x, y, operation)
  operation.call(x, y)
end

add = -&gt;(a, b) { a + b }
multiply = -&gt;(a, b) { a * b }

puts apply_math(3, 4, add)       # =&gt; 7
puts apply_math(3, 4, multiply)  # =&gt; 12

# Currying
power = -&gt;(x, y) { x ** y }.curry
square = power.call(2)
cube = power.call(3)

puts square.call(5)              # =&gt; 25
puts cube.call(3)                # =&gt; 27

# Method composition
def double(x) = x * 2
def increment(x) = x + 1

composed = method(:double).to_proc &gt;&gt; method(:increment).to_proc
puts composed.call(5)            # =&gt; 11 (double then increment)

# Additional example: Recursion
def factorial(n)
  return 1 if n &lt;= 1
  n * factorial(n - 1)
end

puts factorial(5)                # =&gt; 120

Higher-order functions accept or return other functions, as shown in 
apply_math. Currying (partial application) creates specialized 
functions from general ones, like square from power.

Method composition chains operations together (&gt;&gt;  for right-to-
left). Recursion is demonstrated with factorial, though Ruby 
lacks tail call optimization by default. These patterns provide powerful 
abstraction tools.

## Method Missing and Dynamic Methods

Ruby's method_missing hook and define_method enable 
dynamic method handling and creation. This example shows metaprogramming 
techniques for flexible APIs. These advanced features power many Ruby DSLs.

dynamic.rb
class DynamicGreeter
  # method_missing for undefined methods
  def method_missing(name, *args)
    if name.to_s.start_with?('greet_')
      language = name.to_s.split('_').last
      "#{language.capitalize} greeting: Hello!"
    else
      super
    end
  end

  # respond_to_missing? should accompany method_missing
  def respond_to_missing?(name, include_private = false)
    name.to_s.start_with?('greet_') || super
  end

  # Dynamically define methods
  ['morning', 'afternoon', 'evening'].each do |time|
    define_method("greet_#{time}") do
      "Good #{time}!"
    end
  end
end

greeter = DynamicGreeter.new
puts greeter.greet_spanish      # =&gt; "Spanish greeting: Hello!"
puts greeter.greet_morning      # =&gt; "Good morning!"
puts greeter.greet_evening      # =&gt; "Good evening!"

# Additional example: send for dynamic dispatch
puts greeter.send(:greet_afternoon) # =&gt; "Good afternoon!"

method_missing catches calls to undefined methods, enabling 
dynamic responses like language-specific greetings. 
respond_to_missing? ensures proper method introspection.

define_method creates methods programmatically, as shown with time-
based greetings. send dynamically invokes methods by name. These 
techniques enable flexible, adaptable APIs but should be used judiciously.

## Best Practices

Use meaningful method names that indicate their purpose and side effects. Prefer 
small, single-responsibility methods over large complex ones. Use keyword 
arguments for methods with more than two parameters. Document methods with 
comments describing their purpose, parameters, and return values. Consider 
visibility levels (public/protected/private) to enforce proper encapsulation.

## Source References

Learn more from these resources: 
[Ruby Method Documentation](https://ruby-doc.org/core/Method.html),
[Proc Documentation](https://ruby-doc.org/core/Proc.html),
and [Method Syntax](https://ruby-doc.org/core/doc/syntax/methods_rdoc.html).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.