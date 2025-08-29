+++
title = "Python help Function"
date = 2025-08-29T20:08:39.770+01:00
draft = false
description = "Complete guide to Python's help function covering basic usage, modules, classes, functions, and custom help documentation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python help Function

Last modified April 11, 2025

This comprehensive guide explores Python's help function, which
provides interactive documentation for Python objects. We'll cover basic
usage, modules, classes, functions, and custom help documentation.

## Basic Definitions

The help function is Python's built-in interactive help system.
When called with no arguments, it starts the interactive help utility.

With arguments, it displays documentation about the specified object. It works
with modules, functions, classes, methods, keywords, and other Python objects.

## Basic Interactive Help

Here's how to use help in interactive mode to explore Python's
documentation system.

interactive_help.py
  

# Start interactive help
help()

# Then try these commands at the help&gt; prompt:
# help&gt; list
# help&gt; str.split
# help&gt; keywords
# help&gt; modules
# help&gt; quit

This shows how to enter Python's interactive help system. Once inside, you
can explore documentation for various objects, keywords, and modules.

Type quit to exit the interactive help system and return to
the Python interpreter.

## Getting Help on Built-in Functions

You can get documentation for any built-in function by passing it to
help. This example shows how to get help for print.

builtin_help.py
  

# Get help for the print function
help(print)

# Output will show:
# print(...)
# print(value, ..., sep=' ', end='\n', file=sys.stdout, flush=False)
# Prints the values to a stream, or to sys.stdout by default...

This displays the full documentation for the print function,
including its parameters and default values. The same approach works for
all built-in functions.

The output shows the function signature, parameter descriptions, and usage
examples when available.

## Exploring Module Documentation

help can display documentation for entire modules. This example
shows how to get help for the math module.

module_help.py
  

import math

# Get help for the entire math module
help(math)

# Output will show:
# NAME
#     math - This module provides access to the mathematical functions...
# 
# DESCRIPTION
#     This module provides access to the mathematical functions...
# 
# FUNCTIONS
#     acos(x, /)
#         Return the arc cosine (measured in radians) of x...

This displays comprehensive documentation for the math module,
including all available functions, constants, and their descriptions.

You can scroll through the output to explore all available mathematical
operations in the module.

## Getting Class Documentation

help provides detailed information about classes, including
methods, attributes, and inheritance. This example examines the list
class.

class_help.py
  

# Get help for the list class
help(list)

# Output will show:
# class list(object)
#  |  list() -&gt; new empty list
#  |  list(iterable) -&gt; new list initialized from iterable's items
#  |  
#  |  Methods defined here:
#  |  
#  |  append(self, object, /)
#  |      Append object to the end of the list...

This displays the complete class documentation, including constructor
signatures, all available methods, and their descriptions.

The output helps understand how to use the class and what operations
it supports.

## Custom Help Documentation

You can provide help documentation for your own functions and classes using
docstrings. This example demonstrates custom help.

custom_help.py
  

def calculate_area(radius):
    """Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle in meters
        
    Returns:
        float: The area in square meters
    """
    return 3.14159 * radius ** 2

# Now get help for our function
help(calculate_area)

# Output will show:
# calculate_area(radius)
#     Calculate the area of a circle.
#     
#     Args:
#         radius (float): The radius of the circle in meters
#         
#     Returns:
#         float: The area in square meters

This shows how docstrings become part of the help system. The function's
docstring appears when help is called on it.

Well-written docstrings make your code self-documenting and more usable
through the help system.

## Best Practices

- **Use docstrings:** Always document your functions and classes with docstrings

- **Be descriptive:** Include parameter types, return values, and examples

- **Explore interactively:** Use help() in the REPL to discover functionality

- **Check modules:** Use help on imported modules to learn their API

- **Follow conventions:** Use standard docstring formats like Google or NumPy style

## Source References

- [Python help() Documentation](https://docs.python.org/3/library/functions.html#help)

- [PEP 257 - Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).