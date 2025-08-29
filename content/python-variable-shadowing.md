+++
title = "Python Variable Shadowing"
date = 2025-08-29T20:11:09.293+01:00
draft = false
description = "Python tutorial on variable shadowing, covering its occurrence in different scopes with practical examples and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Variable Shadowing

last modified February 26, 2025

Variable shadowing occurs when a variable declared within a certain scope (e.g.,
a function or block) has the same name as a variable declared in an outer scope.
This can lead to confusion and bugs, as the inner variable "shadows" the outer
one, making the outer variable inaccessible within the inner scope. This
tutorial covers variable shadowing in Python, including examples and best
practices to avoid it.

Variable shadowing happens when a variable in a local scope (e.g., inside a
function) has the same name as a variable in an outer scope (e.g., global or
enclosing scope). The local variable "shadows" the outer variable, making it
inaccessible within the local scope. This can lead to unintended behavior and
bugs in your code.

## Shadowing in Local Scope

This example demonstrates variable shadowing within a local scope (inside a
function).

local_shadowing.py
  

x = 10  # Global variable

def my_function():
    x = 20  # Local variable shadows the global variable
    print(f"Local x: {x}")

my_function()
print(f"Global x: {x}")

# Output:
# Local x: 20
# Global x: 10

In this example, the local variable x inside
my_function shadows the global variable x. The global
variable remains unchanged outside the function.

## Shadowing in Nested Functions

This example demonstrates variable shadowing in nested functions.

nested_shadowing.py
  

x = 10  # Outer scope variable

def outer_function():
    x = 20  # Enclosing scope variable

    def inner_function():
        x = 30  # Local variable shadows the enclosing scope variable
        print(f"Inner x: {x}")

    inner_function()
    print(f"Outer x: {x}")

outer_function()
print(f"Global x: {x}")

# Output:
# Inner x: 30
# Outer x: 20
# Global x: 10

In this example, the local variable x in
inner_function shadows the enclosing scope variable x
in outer_function. Each scope maintains its own value of
x.

## Shadowing in Loops

This example demonstrates variable shadowing within a loop.

loop_shadowing.py
  

x = 10  # Global variable

for x in range(5):  # Loop variable shadows the global variable
    print(f"Loop x: {x}")

print(f"Global x: {x}")

# Output:
# Loop x: 0
# Loop x: 1
# Loop x: 2
# Loop x: 3
# Loop x: 4
# Global x: 4

In this example, the loop variable x shadows the global variable
x. After the loop, the global variable retains the last value
assigned to the loop variable.

## Shadowing in Class Attributes

This example demonstrates variable shadowing in class attributes.

class_shadowing.py
  

x = 10  # Global variable

class MyClass:
    x = 20  # Class attribute shadows the global variable

    def print_x(self):
        print(f"Class x: {self.x}")
        print(f"Global x: {x}")

obj = MyClass()
obj.print_x()

# Output:
# Class x: 20
# Global x: 10

In this example, the class attribute x shadows the global variable
x. The global variable is still accessible using its name directly.

## Shadowing in List Comprehensions

This example demonstrates variable shadowing in list comprehensions.

list_comprehension_shadowing.py
  

x = 10  # Global variable

# List comprehension variable shadows the global variable
squares = [x ** 2 for x in range(5)]  
print(f"Squares: {squares}")
print(f"Global x: {x}")

# Output:
# Squares: [0, 1, 4, 9, 16]
# Global x: 10

In this example, the variable x in the list comprehension shadows
the global variable x. The global variable remains unchanged after
the list comprehension.

## Best Practices to Avoid Shadowing

- **Use Unique Variable Names:** Avoid reusing variable names across different scopes to prevent shadowing.

- **Limit Scope of Variables:** Declare variables in the smallest scope possible to minimize the risk of shadowing.

- **Use Descriptive Names:** Use meaningful variable names to reduce the likelihood of accidental shadowing.

- **Be Mindful of Built-ins:** Avoid using names of built-in functions or types (e.g., list, str) as variable names.

## Source

[Python Scopes and Namespaces Documentation](https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces)

In this article, we have explored variable shadowing in Python and demonstrated
its occurrence in different scopes through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).