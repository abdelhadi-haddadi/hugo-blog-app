+++
title = "Python Variables"
date = 2025-08-29T20:11:09.349+01:00
draft = false
description = "Python tutorial on variables, covering bound/unbound, static, class, and instance variables with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Variables

last modified February 26, 2025

Variables in Python are used to store data that can be referenced and
manipulated throughout a program. Python supports various types of variables,
including bound/unbound, static, class, and instance variables. This tutorial
covers the different contexts in which variables are used, along with practical
examples.

Variables are names that refer to values stored in memory. They allow us to
store and manipulate data in our program. Python variables do not require
explicit declaration and can change types dynamically. Variables can be
categorized based on their scope and context, such as local, global, class, and
instance variables.

## Module variables

In Python, module variables are variables that are defined at the top level
of a module (a .py file). These variables can be accessed from any
part of the module and can also be imported into other modules.

### Key Characteristics:

**Global within the Module**: Module variables are global
within the module in which they are defined. They can be accessed by any
function or class within that module.
**Module Scope**: They have a module scope, meaning they are
not confined to any specific function or class but are accessible throughout the
entire module.
**Importable**: Module variables can be imported into other
modules using the import statement.

Let's consider a module named example_module.py:

example_module.py
  

# Module variables 
PI = 3.14159 
E = 2.71828

# Function that uses module variables 
def calculate_circle_area(radius): 
    return PI * radius * radius

# Class that uses module variables 
class MathConstants: 

    def get_constants(self):
        return PI, E

In this example PI and E are module variables. The
function calculate_circle_area and the method
get_constants use these module variables.

We can import these module variables into another module or script:

main.py
  

from example_module import PI, E

print(f'The value of PI is: {PI}') 
print(f'The value of E is:{E}')

In this case, PI and E are imported from
example_module and can be used in another_module.

## Bound and Unbound Variables

This example demonstrates bound and unbound variables in Python.

bound_unbound.py
  

x = 10  # Bound variable (assigned a value)

def my_function():
    print(y)  # Unbound variable (not assigned a value)

# my_function()  # Uncommenting this line will raise a NameError

A **bound variable** is one that has been assigned a value, like
x. An **unbound variable** is one that has not been
assigned a value, like y in my_function. Accessing an
unbound variable raises a NameError.

## Function-scoped Variables

This example demonstrates Function-scoped variables in Python.

static_variable.py
  

def my_function():
    if not hasattr(my_function, "counter"):
        my_function.counter = 0  # Static variable
    my_function.counter += 1
    return my_function.counter

print(my_function())  # Output: 1
print(my_function())  # Output: 2
print(my_function())  # Output: 3

A function-scoped variable retains its state across function calls.

## Class Variables

This example demonstrates class variables in Python.

class_variable.py
  

class MyClass:
    class_var = 10  # Class variable

print(MyClass.class_var)  # Output: 10

obj1 = MyClass()
obj2 = MyClass()

print(obj1.class_var)  # Output: 10
print(obj2.class_var)  # Output: 10

MyClass.class_var = 20  # Modify class variable
print(obj1.class_var)  # Output: 20
print(obj2.class_var)  # Output: 20

A **class variable** is a variable that is shared by all instances
of a class. It is defined within the class but outside any method. Class
variables are accessed using the class name or an instance of the class.

## Instance Variables

This example demonstrates instance variables in Python.

instance_variable.py
  

class MyClass:
    def __init__(self, value):
        self.instance_var = value  # Instance variable

obj1 = MyClass(10)
obj2 = MyClass(20)

print(obj1.instance_var)  # Output: 10
print(obj2.instance_var)  # Output: 20

obj1.instance_var = 30
print(obj1.instance_var)  # Output: 30
print(obj2.instance_var)  # Output: 20

An **instance variable** is a variable that is unique to each
instance of a class. It is defined within the __init__ method or
other instance methods. Instance variables are accessed using the instance name.

## Global Variables

This example demonstrates global variables in Python.

global_variable.py
  

x = 10  # Global variable

def my_function():
    global x  # Declare x as global
    x = 20
    print(f"Inside function: {x}")

my_function()
print(f"Outside function: {x}")

# Output:
# Inside function: 20
# Outside function: 20

A **global variable** is a variable that is defined outside any
function or class and can be accessed throughout the program. To modify a global
variable inside a function, use the global keyword.

## Local Variables

This example demonstrates local variables in Python.

local_variable.py
  

def my_function():
    x = 10  # Local variable
    print(f"Inside function: {x}")

my_function()
# print(x)  # Uncommenting this line will raise a NameError

# Output:
# Inside function: 10

A **local variable** is a variable that is defined within a
function or block and is only accessible within that scope. Attempting to access
a local variable outside its scope raises a NameError.

## Best Practices for Using Variables

- **Use Descriptive Names:** Choose meaningful variable names to improve code readability.

- **Limit Scope:** Declare variables in the smallest scope possible to avoid unintended side effects.

- **Avoid Global Variables:** Minimize the use of global variables to reduce complexity and potential bugs.

- **Use Constants for Fixed Values:** Use uppercase names for constants to indicate that their values should not change.

## Source

[Python Scopes and Namespaces Documentation](https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces)

In this article, we have explored Python variables and demonstrated their usage
in different contexts through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).