+++
title = "Python globals Function"
date = 2025-08-29T20:08:37.399+01:00
draft = false
description = "Complete guide to Python's globals function covering namespace access, variable modification, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python globals Function

Last modified April 11, 2025

This comprehensive guide explores Python's globals function, which
returns a dictionary representing the current global symbol table. We'll cover
namespace inspection, variable modification, and practical use cases.

## Basic Definitions

The globals function returns a dictionary of the current global
symbol table. This dictionary contains all global variables, functions, and
classes accessible in the current scope.

Key characteristics: returns a live dictionary that reflects changes to the
global namespace. Modifying this dictionary directly affects the global
namespace. It's useful for dynamic variable access and metaprogramming.

## Basic Usage

Here's simple usage showing how globals accesses global variables
and functions. This demonstrates the basic dictionary interface.

basic_globals.py
  

x = 10
y = 20

def greet():
    return "Hello"

print(globals()["x"])       # 10
print(globals()["y"])       # 20
print(globals()["greet"]()) # "Hello"

This example shows accessing global variables and functions through the
globals dictionary. The dictionary keys are strings matching
the variable/function names.

Note that functions must be called normally after accessing them through
the globals dictionary. The dictionary provides direct access to the objects.

## Dynamic Variable Creation

The globals dictionary can be used to create variables
dynamically. This example demonstrates adding new global variables at runtime.

dynamic_vars.py
  

for i in range(1, 4):
    globals()[f"var_{i}"] = i * 10

print(var_1)  # 10
print(var_2)  # 20
print(var_3)  # 30

This creates three new global variables (var_1, var_2, var_3) using string
formatting and dictionary assignment. The variables become immediately
available in the global namespace.

While powerful, this technique should be used sparingly as it can make code
harder to understand and maintain compared to explicit variable declarations.

## Inspecting Global Namespace

globals is useful for inspecting what's in the global namespace.
This example filters and displays only user-defined global variables.

inspect_globals.py
  

import math

PI = 3.14159
APP_NAME = "MyApp"

def show_user_globals():
    for name, value in globals().items():
        if not name.startswith('__') and not callable(value) and not isinstance(value, type):
            print(f"{name}: {value}")

show_user_globals()

This function filters out Python builtins (starting with __), functions, and
classes to show only user-defined variables. The output would display PI and
APP_NAME but not math or built-in functions.

This technique is helpful for debugging or when you need to analyze what's
available in your global namespace during development.

## Modifying Global Variables

The globals dictionary can modify existing global variables.
This example shows how to safely update globals while avoiding common pitfalls.

modify_globals.py
  

counter = 0

def increment_counter():
    globals()["counter"] += 1

def reset_counter():
    if "counter" in globals():
        globals()["counter"] = 0

increment_counter()
increment_counter()
print(counter)  # 2

reset_counter()
print(counter)  # 0

This demonstrates two functions that safely modify a global counter variable.
The increment_counter function increases the counter, while
reset_counter sets it back to zero.

Using globals for modification is an alternative to the
global keyword, but should be used judiciously to maintain
code clarity.

## Dynamic Function Calling

globals enables dynamic function calling by name. This example
shows how to call functions based on string input or configuration.

dynamic_calls.py
  

def start():
    print("Starting...")

def stop():
    print("Stopping...")

def restart():
    print("Restarting...")

def execute_command(command):
    if command in globals() and callable(globals()[command]):
        globals()[command]()
    else:
        print(f"Unknown command: {command}")

execute_command("start")    # Starting...
execute_command("stop")     # Stopping...
execute_command("reboot")   # Unknown command: reboot

This pattern is useful for command processors or when you need to call
functions based on external input. The code checks if the name exists in
globals and is callable before attempting to execute it.

This approach provides flexibility but requires careful input validation to
avoid security issues when dealing with untrusted input.

## Best Practices

- **Use sparingly:** Prefer explicit variable access when possible

- **Validate keys:** Always check if a key exists before access

- **Document thoroughly:** Clearly comment any globals() usage

- **Consider alternatives:** For many cases, dictionaries or classes are better

- **Avoid in production:** Dynamic features can make code harder to maintain

## Source References

- [Python globals() Documentation](https://docs.python.org/3/library/functions.html#globals)

- [Python Execution Model](https://docs.python.org/3/reference/executionmodel.html#naming-and-binding)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).