+++
title = "Python Global Keyword"
date = 2025-08-29T20:08:36.241+01:00
draft = false
description = "Python tutorial on the global keyword, covering its usage, scope, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Global Keyword

last modified February 25, 2025

The global keyword in Python is used to declare that a variable is
a global variable. This allows you to modify a variable outside the current
scope, typically within a function. This tutorial covers the usage of the
global keyword, its scope, and practical examples.

The global keyword is used to indicate that a variable is defined
in the global scope. Without the global keyword, a variable
assigned within a function is considered local by default. Using the
global keyword allows you to modify a global variable from within a
function.

## Modifying a Global Variable

This example demonstrates how to modify a global variable within a function
using the global keyword.

modify_global.py
  

x = 10

def modify_global():
    global x
    x = 20

modify_global()
print(x)  # Output: 20

The global keyword is used to declare that x is a
global variable. The function modify_global modifies the value of
x, and the change is reflected globally.

## Accessing a Global Variable

This example demonstrates how to access a global variable within a function
without modifying it.

access_global.py
  

x = 10

def access_global():
    print(x)  # Accessing the global variable

access_global()  # Output: 10

The function access_global accesses the global variable
x without modifying it. The global keyword is not
required for accessing global variables.

## Local vs Global Variables

This example demonstrates the difference between local and global variables.

local_vs_global.py
  

x = 10

def local_variable():
    x = 5  # Local variable
    print(f"Local x: {x}")

local_variable()
print(f"Global x: {x}")  # Output: Local x: 5, Global x: 10

The function local_variable creates a local variable x
that does not affect the global variable x. The local variable is
only accessible within the function.

## Using Global in Nested Functions

This example demonstrates how to use the global keyword in nested
functions.

nested_global.py
  

x = 10

def outer_function():
    x = 20  # Non-local variable

    def inner_function():
        global x
        x = 30

    inner_function()
    print(f"Outer x: {x}")  # Output: Outer x: 20

outer_function()
print(f"Global x: {x}")  # Output: Global x: 30

The global keyword in the inner_function modifies the
global variable x, while the x in
outer_function remains a non-local variable.

## Avoiding Global Variables

This example demonstrates how to avoid using global variables by passing
variables as function arguments.

avoid_global.py
  

def modify_variable(value):
    value = 20
    return value

x = 10
x = modify_variable(x)
print(x)  # Output: 20

Instead of using the global keyword, the variable x is
passed as an argument to the function modify_variable. This
approach avoids modifying global state and makes the code more modular.

## Global Variables in Modules

This example demonstrates how global variables can be shared across multiple modules.

module_global.py
  

# module1.py
x = 10

# module2.py
import module1

def modify_global():
    global x
    x = 20

modify_global()
print(module1.x)  # Output: 20

The global variable x is defined in module1.py and
modified in module2.py using the global keyword. The
change is reflected across both modules.

## Best Practices for Using the Global Keyword

- **Avoid Overuse:** Overusing global variables can make code harder to understand and maintain.

- **Use Function Arguments:** Pass variables as function arguments instead of relying on global variables.

- **Encapsulate State:** Use classes or modules to encapsulate state and reduce reliance on global variables.

- **Document Globals:** Clearly document the purpose of global variables to improve code readability.

## Source

[Python Global Keyword Documentation](https://docs.python.org/3/reference/simple_stmts.html#the-global-statement)

In this article, we have explored the Python global keyword and
demonstrated its usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).