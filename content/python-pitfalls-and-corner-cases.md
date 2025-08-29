+++
title = "Python Pitfalls and Corner Cases"
date = 2025-08-29T20:09:54.563+01:00
draft = false
description = "This tutorial covers common Python pitfalls and corner cases that developers should be aware of."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Pitfalls and Corner Cases

last modified April 2, 2025

This tutorial covers common Python pitfalls and corner cases that can trip up
developers.

## Mutable Default Arguments

Python's handling of default arguments is one of the most common sources of
confusion for developers coming from other languages. The behavior differs
significantly from what many expect, leading to subtle bugs that can be hard to
diagnose.

default_args.py
  

def append_to(element, to=[]):
    to.append(element)
    return to

print(append_to(1))  # [1]
print(append_to(2))  # [1, 2]

Python's default arguments are evaluated only once when the function is defined.
This means mutable default arguments retain their state between calls. Use None
as a default value and create a new list inside the function to avoid this.

## Variable Scope in List Comprehensions

Python's scope rules in list comprehensions changed significantly between Python
2 and Python 3. Understanding these differences is crucial when working with
older code or maintaining compatibility across versions.

list_comp_scope.py
  

x = 10
lst = [x for x in range(5)]
print(x)  # Outputs 10 in Python 3, but would be 4 in Python 2

In Python 3, list comprehensions have their own scope, but in Python 2 they
leaked into the surrounding scope. This was fixed in Python 3, but can still
cause confusion when porting code or reading older examples.

## Late Binding Closures

Closures in Python exhibit late binding behavior that often catches developers
off guard. This behavior is particularly noticeable in loops where variables are
captured by nested functions.

closures.py
  

funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])  # [2, 2, 2]

Python closures bind variables late - they use the value of the variable at the
time the function is called, not when it's created. To capture the current
value, use default arguments: lambda i=i: i.

## Integer Identity

Python's handling of small integer caching is an implementation detail that can
lead to surprising behavior when using the 'is' operator for comparison rather
than the equality operator.

integer_identity.py
  

a = 256
b = 256
print(a is b)  # True

a = 257
b = 257
print(a is b)  # False (usually)

Python caches small integers (-5 to 256) for optimization, so they may have the
same identity. For larger integers, this isn't guaranteed. Always use == for
value comparison, not 'is'.

## Tuple Creation Gotcha

Python's syntax for creating tuples can be confusing, especially when dealing
with single-element tuples. The syntax differs from other sequence types and
often leads to subtle bugs.

tuples.py
  

empty = ()
single = (1)       # Not a tuple!
proper_single = (1,)  # Proper single-element tuple

print(type(empty))        # &lt;class 'tuple'&gt;
print(type(single))       # &lt;class 'int'&gt;
print(type(proper_single)) # &lt;class 'tuple'&gt;

The comma, not the parentheses, makes a tuple in Python. A single value in
parentheses is just that value. To create a single-element tuple, include a
trailing comma.

## Dictionary Key Order

The ordering behavior of dictionaries changed significantly in Python 3.7, which
can affect code that implicitly relied on the previous unordered behavior or
explicitly needed ordering.

dict_order.py
  

d1 = {'a': 1, 'b': 2}
d2 = {'b': 2, 'a': 1}

print(d1 == d2)  # True (same keys/values)
print(list(d1) == list(d2))  # False in Python &lt;3.7, True in 3.7+

Before Python 3.7, dictionaries didn't preserve insertion order. While they
still compared equal if they had the same keys/values, iteration order could
differ. Python 3.7+ maintains insertion order.

## Boolean Evaluation

Python's truth value testing is flexible but can lead to unexpected behavior if
not fully understood. Many values evaluate to False in a boolean context, which
can be both useful and surprising.

boolean.py
  

values = [0, 0.0, False, '', [], (), {}, None]

for v in values:
    if not v:
        print(f"{v!r} is falsy")

In Python, several values evaluate to False in a boolean context:
None, False, zero of any numeric type, empty
sequences/collections. This is useful but can cause bugs if you're not expecting
it.

## String Interning

Python's string interning is an optimization technique that can affect identity
comparisons. While generally transparent, it can lead to confusing behavior when
using the 'is' operator instead of equality comparison.

string_interning.py
  

a = "hello"
b = "hello"
print(a is b)  # True (usually)

a = "hello world"
b = "hello world"
print(a is b)  # False (usually)

Python may intern small strings (like identifiers) for optimization, making them
share memory. But this isn't guaranteed - don't rely on 'is' for string
comparison, always use ==.

## List Multiplication

Multiplying lists containing mutable objects can create unexpected sharing
behavior. This is a common source of bugs when trying to initialize
multi-dimensional structures.

list_multiplication.py
  

lst = [[]] * 3
lst[0].append(1)
print(lst)  # [[1], [1], [1]]

Multiplying a list containing a mutable object creates multiple references to
the same object. To create independent copies, use a list comprehension:
[[] for _ in range(3)].

## Garbage Collection of Cycles

Python's garbage collector handles reference cycles, but understanding this
behavior is important when dealing with complex object relationships or when
implementing __del__ methods.

garbage_collection.py
  

class Node:
    def __init__(self):
        self.parent = None
        self.children = []

parent = Node()
child = Node()
child.parent = parent
parent.children.append(child)

del parent, child  # Cycle exists - will be collected by GC

Python's reference counting can't handle reference cycles. The garbage collector
handles these, but they can cause memory leaks if the GC is disabled or if
__del__ methods are involved. Avoid circular references when
possible.

## Operator Precedence

Python's operator chaining can lead to expressions that evaluate differently
than they might appear at first glance. This is particularly true with
comparison operators.

precedence.py
  

result = False == False in [False]  # True
# Equivalent to: False == False and False in [False]

Comparison operators in Python chain naturally, which can lead to surprising
results. The expression 'False == False in [False]' evaluates as 'False ==
False and False in [False]'. Use parentheses to clarify intent.

## Class Variable vs Instance Variable

The distinction between class variables and instance variables in Python is
crucial for proper object-oriented design, but the behavior can be surprising
when mutable class variables are involved.

class_vars.py
  

class Dog:
    tricks = []  # Class variable

    def __init__(self, name):
        self.name = name

    def add_trick(self, trick):
        self.tricks.append(trick)

d1 = Dog('Fido')
d2 = Dog('Buddy')
d1.add_trick('roll over')
d2.add_trick('play dead')

print(d1.tricks)  # ['roll over', 'play dead']

Class variables are shared by all instances. If you modify a mutable class
variable, it affects all instances. Use instance variables (self.tricks = [])
in __init__ for instance-specific mutable attributes.

## Import System Quirks

Python's import system has several behaviors that can surprise developers,
particularly around module reloading and the execution of module-level code.

imports.py
  

# module.py
print("Module is being imported!")

# main.py
import module  # Prints message
import module  # No message - module is cached in sys.modules

Python modules are only loaded once per interpreter session (cached in
sys.modules). The top-level code in a module runs only on first import. For
reloading, use importlib.reload(), but this can be tricky with complex modules.

## Exception Scope

Python 3 changed how exception variables are handled in try/except blocks, which
can affect code that attempts to inspect exceptions after the except block has
completed.

exception_scope.py
  

e = 42
try:
    # ... some code that raises ValueError
    raise ValueError("oops")
except ValueError as e:
    pass

print(e)  # NameError: name 'e' is not defined

In Python 3, exception variables are deleted after the except block to avoid
reference cycles. If you need the exception object later, assign it to another
variable in the except block.

## Source

[Python Language Reference](https://docs.python.org/3/reference/)

This tutorial covered common Python pitfalls and corner cases that developers should be aware of.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).