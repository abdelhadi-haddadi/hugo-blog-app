+++
title = "Python Nonlocal Keyword"
date = 2025-08-29T20:08:58.968+01:00
draft = false
description = "Python tutorial on the nonlocal keyword, covering scope modification in nested functions with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Nonlocal Keyword

last modified February 25, 2025

The nonlocal keyword in Python allows nested functions to modify
variables from an enclosing function's scope. This tutorial covers its usage,
differences from global, and practical applications in managing
enclosed scope variables.

Unlike global, nonlocal targets variables in the
nearest enclosing scope excluding globals. It enables mutable access to
outer function variables without using global scope, promoting cleaner
encapsulation in nested structures.

## Modifying Enclosing Scope Variables

This example shows how nonlocal modifies a variable from an
enclosing function's scope.

modify_enclosing.py
  

def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    return inner()

result = outer()
print(result)  # Output: 1

The nonlocal declaration allows inner to modify
count from outer's scope. Without it, Python would
treat count as local to inner, causing errors.

## Nested Function Scope Chain

This example demonstrates nonlocal accessing variables through
multiple nested levels.

multi_level.py
  

def level1():
    value = 10
    def level2():
        def level3():
            nonlocal value
            value *= 2
        level3()
        return value
    return level2()

print(level1())  # Output: 20

nonlocal in level3 accesses value from
level1, skipping level2's scope. This shows how
nonlocal climbs the scope hierarchy until finding the target.

## Nonlocal vs Local vs Global

This example compares variable scoping behaviors across different keywords.

scope_comparison.py
  

global_var = 100

def outer_func():
    enclosing_var = 50
    def inner_func():
        local_var = 10
        nonlocal enclosing_var
        global global_var
        enclosing_var += 1
        global_var += 1
        return (local_var, enclosing_var, global_var)
    return inner_func()

print(outer_func())  # Output: (10, 51, 101)

nonlocal modifies enclosing_var, while
global affects global_var. Local variables like
local_var remain confined to their function.

## Stateful Closure with Nonlocal

This example creates a counter factory using nonlocal to maintain
state between calls.

closure_counter.py
  

def make_counter():
    total = 0
    def counter():
        nonlocal total
        total += 1
        return total
    return counter

c = make_counter()
print(c(), c(), c())  # Output: 1 2 3

Each call to c() increments the total preserved in
the closure. nonlocal enables state retention without class
structures or global variables.

## Avoiding Nonlocal with Classes

This example achieves similar functionality using classes instead of
nonlocal.

class_counter.py
  

class Counter:
    def __init__(self):
        self.total = 0
    
    def increment(self):
        self.total += 1
        return self.total

c = Counter()
print(c.increment(), c.increment())  # Output: 1 2

Class attributes provide clearer state management for complex scenarios,
reducing reliance on nested functions and nonlocal declarations.

## Best Practices for Nonlocal Usage

- **Limit Depth:** Avoid deep nesting where nonlocal variables become hard to track

- **Prefer Clarity:** Use classes for complex state rather than multiple nonlocals

- **Avoid Shadowing:** Ensure nonlocal variables aren't hidden by local names

- **Document Scope:** Comment nonlocal declarations to clarify their origin

## Source

[Python Nonlocal Keyword Documentation](https://docs.python.org/3/reference/simple_stmts.html#nonlocal)

This tutorial explored the nonlocal keyword's role in Python scope
management, demonstrating practical use cases and alternatives for clean code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).