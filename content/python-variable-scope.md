+++
title = "Python Variable Scope"
date = 2025-08-29T20:11:09.344+01:00
draft = false
description = "Complete guide to Python variable scope covering LEGB rule, global, nonlocal, and best practices"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Variable Scope

last modified April 2, 2025

Variable scope determines where in a program a variable can be accessed. Python 
uses the LEGB (Local, Enclosing, Global, Built-in) rule for name resolution. 
Understanding scope is crucial for writing bug-free Python code. This guide 
covers all scope types with practical examples. Proper scope management prevents 
naming conflicts and unexpected behavior.

## LEGB Rule Overview

Python resolves variable names using the LEGB rule: Local, Enclosing, Global, 
Built-in scopes, in that order. When a variable is referenced, Python searches 
these scopes sequentially. This example demonstrates each scope level. 
Understanding LEGB is fundamental to Python programming.

legb.py
# Global scope
global_var = "I'm global"

def outer_function():
    # Enclosing scope
    enclosing_var = "I'm enclosing"
    
    def inner_function():
        # Local scope
        local_var = "I'm local"
        print(local_var)        # Local
        print(enclosing_var)    # Enclosing
        print(global_var)       # Global
        print(len)             # Built-in (len function)
    
    inner_function()

outer_function()

# Additional example: LEGB in action
x = "global"

def test():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # What gets printed?
    
    inner()

test()  # Prints "local"

The example shows all four LEGB scopes. inner_function finds 
local_var in its local scope first. enclosing_var 
comes from the enclosing outer_function scope. 
global_var is found in the module-level global scope. 
len resolves to the built-in function.

The additional example demonstrates LEGB precedence - the innermost scope's 
variable takes precedence. When print(x) executes, Python finds 
"local" before checking enclosing, global, or built-in scopes. This hierarchy 
applies to all name lookups in Python.

## Global Scope

Global scope variables are defined at the module level and accessible 
throughout the module. Functions can read global variables but need the 
global keyword to modify them. This example shows proper global 
variable usage. Understanding globals helps manage module-wide state.

global_scope.py
# Global variable
counter = 0

def increment():
    global counter  # Declare we're using the global counter
    counter += 1

def show_counter():
    print(f"Counter: {counter}")  # Reading global doesn't need declaration

increment()
show_counter()  # Counter: 1
increment()
show_counter()  # Counter: 2

# Additional example: Shadowing
value = 10

def demo():
    value = 20  # Creates a local variable, doesn't modify global
    print(f"Local value: {value}")

demo()  # Local value: 20
print(f"Global value: {value}")  # Global value: 10

The counter variable is global, shared across functions. 
increment uses global to modify it, while 
show_counter only reads it. Without the global 
declaration, Python would create a local variable instead.

The shadowing example shows that assigning to a name inside a function creates 
a local variable by default, even if a global exists with the same name. The 
global remains unchanged. This behavior prevents accidental modification of 
globals.

## Local Scope

Local scope variables are defined inside a function and only accessible within 
that function. They exist only while the function executes. This example 
demonstrates local variable behavior. Proper use of locals promotes 
encapsulation and prevents naming conflicts.

local_scope.py
def calculate():
    # Local variables
    x = 10
    y = 20
    result = x + y
    print(f"Inside function: {result}")

calculate()
# print(x)  # Would raise NameError: x is not defined

# Additional example: Separate local scopes
def func1():
    var = "func1 variable"
    print(var)

def func2():
    var = "func2 variable"
    print(var)

func1()  # func1 variable
func2()  # func2 variable

# Additional example: Temporary variables
def process_data(data):
    temp = data * 2  # Local temporary variable
    return temp.upper()

print(process_data("test"))  # TESTTEST

Variables x, y, and result exist only 
within calculate. Attempting to access them outside raises a 
NameError. Each function call creates new local variables, even 
for recursive calls.

Functions have independent local scopes - func1 and 
func2 can both use var without conflict. Local 
variables are ideal for temporary calculations like temp in 
process_data, which disappears after the function ends.

## Enclosing (Nonlocal) Scope

Enclosing scope refers to variables in nested functions' outer scopes. The 
nonlocal keyword allows modifying these variables. This example 
demonstrates nested function scopes. Understanding enclosing scope is key for 
closures and decorators.

nonlocal_scope.py
def outer():
    message = "Original"  # Enclosing scope variable
    
    def inner():
        nonlocal message  # Declare we're using the enclosing message
        message = "Modified"
        print(f"Inner: {message}")
    
    print(f"Before inner: {message}")
    inner()
    print(f"After inner: {message}")

outer()

# Additional example: Multiple levels
def level1():
    x = 1
    
    def level2():
        x = 2
        
        def level3():
            nonlocal x  # Refers to level2's x
            x = 3
        
        level3()
        print(f"Level2 x: {x}")  # Shows modified value
    
    level2()
    print(f"Level1 x: {x}")  # Original unchanged

level1()

# Additional example: Without nonlocal
def counter():
    count = 0
    
    def increment():
        # count += 1  # Would raise UnboundLocalError
        nonlocal count
        count += 1
        return count
    
    return increment

c = counter()
print(c(), c(), c())  # 1 2 3

The outer/inner example shows how nonlocal 
allows inner to modify message from the enclosing 
scope. Without it, Python would create a new local variable instead.

nonlocal looks in the nearest enclosing scope, not the global 
scope. The counter example demonstrates a common closure pattern where nested 
functions maintain state. This technique is powerful for creating function 
factories.

## Built-in Scope

Built-in scope contains Python's built-in functions and exceptions (like 
len, range, ValueError). These names are 
always available. This example shows built-in scope interaction. Understanding 
built-ins prevents accidental shadowing.

builtin_scope.py
# Built-in functions
print(len("Python"))  # 6
print(max(1, 5, 2))  # 5

# Shadowing built-ins (generally discouraged)
def test():
    len = 10  # Shadows built-in len locally
    print(len)  # 10

test()
print(len("test"))  # Still works globally

# Additional example: Restoring access
def custom_len():
    # Can still access built-in if needed
    orig_len = __builtins__.len
    print(orig_len("hello"))  # 5

custom_len()

# Additional example: Common shadowing mistakes
def calculate(input):
    sum = 0  # Shadows built-in sum()
    for num in input:
        sum += num
    # return sum(input)  # Would error
    return sum

print(calculate([1, 2, 3]))  # 6

Built-ins are available everywhere unless shadowed. The test 
function shows how a local variable can shadow a built-in name, but only within 
that function's scope. Globally, the built-in remains accessible.

Shadowing built-ins like sum, list, or dict 
is common but can lead to confusing errors. The __builtins__ 
module provides access to original built-ins when needed. Choose descriptive 
names to avoid accidental shadowing.

## Class Scope

Class scope is a special namespace for class attributes and methods. Instance 
variables are accessed through self. This example demonstrates 
class and instance scopes. Proper scope management is essential for object-
oriented Python.

class_scope.py
class MyClass:
    # Class variable
    class_var = "I'm a class variable"
    
    def __init__(self, instance_var):
        # Instance variable
        self.instance_var = instance_var
    
    def show_vars(self):
        print(f"Class var: {self.class_var}")
        print(f"Instance var: {self.instance_var}")
        # Local variable
        temp = "local value"
        print(f"Local var: {temp}")

obj1 = MyClass("Instance 1")
obj2 = MyClass("Instance 2")

obj1.show_vars()
obj2.show_vars()

# Modifying class variable affects all instances
MyClass.class_var = "Modified class var"
obj1.show_vars()

# Additional example: Name resolution in methods
x = "global x"

class Test:
    x = "class x"
    
    def method(self):
        x = "method x"
        print(x)          # method x
        print(self.x)     # class x
        print(globals()['x'])  # global x

Test().method()

class_var is shared by all instances, while 
instance_var is unique to each object. The show_vars 
method demonstrates accessing both, along with its local temp 
variable. Class variables are accessed through either the class or instances.

Method variables follow LEGB rules, with the instance namespace (accessed via 
self) acting as an additional scope. The Test class 
shows how to access variables at different scope levels when names overlap. 
Class scope sits between global and local in the LEGB hierarchy.

## Scope in Comprehensions and Lambdas

Comprehensions and lambdas have their own scope rules that differ slightly from 
regular functions. This example demonstrates these special cases. Understanding 
these nuances prevents unexpected behavior in functional-style Python.

comprehensions.py
x = 10

# List comprehension has its own scope
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
print(x)       # 10 (unchanged)

# Lambda expressions
y = 20
adder = lambda z: y + z  # Lambda can access enclosing scope
print(adder(5))         # 25

# Additional example: Generator expression
multiplier = 3
gen = (x * multiplier for x in range(5))
print(list(gen))  # [0, 3, 6, 9, 12]

# Additional example: Dictionary comprehension
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}  # New scope for k, v
print(d)  # {'a': 1, 'b': 2, 'c': 3}

List comprehensions don't leak their iteration variables (x in the 
example) into the enclosing scope, unlike Python 2.7. Lambdas can access 
variables from enclosing scopes, as shown with y in the 
adder function.

Generator expressions behave like list comprehensions regarding scope. 
Dictionary comprehensions similarly protect their iteration variables. These 
functional constructs maintain clean scope isolation while allowing access to 
needed outer variables.

## Scope Best Practices

Prefer local variables over globals to minimize side effects. Use 
global and nonlocal sparingly and document when you 
do. Avoid shadowing built-in names to prevent confusion. Keep functions small 
and focused to manage scope complexity. Use descriptive names to reduce naming 
collisions across scopes.

## Source References

Learn more from these resources: 
[Python Scopes Documentation](https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces),
[Real Python LEGB Guide](https://realpython.com/python-scope-legb-rule/),
and [Built-in Functions](https://docs.python.org/3/library/functions.html).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).