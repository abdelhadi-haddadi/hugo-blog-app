+++
title = "Python str Function"
date = 2025-08-29T20:10:52.357+01:00
draft = false
description = "Complete guide to Python's str function covering string conversion, formatting, and practical examples of string manipulation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python str Function

Last modified April 11, 2025

This comprehensive guide explores Python's str function, which
converts objects to their string representations. We'll cover basic conversion,
custom string representations, formatting, and practical examples.

## Basic Definitions

The str function returns a string version of an object. For most
objects, it calls the __str__ method. If unavailable, it falls
back to __repr__.

Key characteristics: creates human-readable strings, handles all Python types,
supports custom string representations, and is used implicitly in print() and
string formatting.

## Basic Type Conversion

Here's simple usage with different Python types showing how str
converts numbers, booleans, and other basic types to strings.

basic_str.py
  

# With numbers
print(str(42))        # '42'
print(str(3.14))      # '3.14'

# With booleans
print(str(True))      # 'True'
print(str(False))     # 'False'

# With None
print(str(None))      # 'None'

# With strings (no change)
print(str("hello"))   # 'hello'

This example shows str converting basic Python types to their
string representations. Numbers become their digit strings, booleans become
'True'/'False', and None becomes 'None'.

Note that passing a string to str returns the same string
unchanged, as it's already a string.

## Custom Object String Representation

You can define how your objects convert to strings by implementing the
__str__ method. This example creates a Person class.

custom_str.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person(name='{self.name}', age={self.age})"
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

p = Person("Alice", 30)
print(str(p))  # Person(name='Alice', age=30)
print(p)       # Same as above (print calls str implicitly)

The Person class implements __str__ to return a formatted string.
When we call str on a Person instance, Python uses this method.

The __repr__ method provides an alternative representation used
when __str__ isn't available or in the REPL.

## String Formatting with str

The str function works with string formatting to create dynamic
strings. This example shows various formatting techniques.

formatting.py
  

# Old-style formatting
print("Value: %s" % str(42))          # Value: 42

# str.format()
print("Value: {}".format(str(3.14)))  # Value: 3.14

# f-strings (Python 3.6+)
value = True
print(f"Value: {str(value)}")         # Value: True

# Formatting with conversion
print(f"Value: {42!s}")               # Value: 42 (!s calls str)

These examples demonstrate how str integrates with Python's
string formatting systems. The !s conversion specifier in
f-strings explicitly calls str.

Formatting automatically calls str on values, but explicit
conversion can make the code clearer in some cases.

## File Operations with str

File operations often use str to convert data before writing.
This example shows reading and writing files with string conversion.

files.py
  

# Writing different types to a file
data = [42, 3.14, True, "hello", None]

with open("data.txt", "w") as f:
    for item in data:
        f.write(str(item) + "\n")  # Convert each item to string

# Reading back
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())  # Already strings when reading

This example writes various Python types to a file by converting them to
strings first. File operations require strings (or bytes), so conversion
is necessary for non-string data.

When reading back, the data is already in string form, though you might
need to parse it back to the original type.

## Error Handling

While str works with nearly all Python objects, understanding
its behavior with edge cases is important.

errors.py
  

class BadStr:
    def __str__(self):
        return 42  # Should return string!

try:
    print(str(BadStr()))
except TypeError as e:
    print(f"Error: {e}")  # __str__ returned non-string (type int)

# Default behavior when no __str__ is defined
class NoStr:
    pass

print(str(NoStr()))  # Uses __repr__ as fallback

These examples demonstrate str's behavior with problematic
objects. __str__ must return a string, or it raises a
TypeError.

When no __str__ is defined, Python falls back to
__repr__, which all objects should have.

## Best Practices

- **Implement __str__:** For custom classes to provide readable output

- **Include __repr__:** As a fallback and for debugging

- **Prefer f-strings:** For modern string formatting

- **Handle encoding:** Use str.encode() for byte conversion

- **Document behavior:** Clearly document string representations

## Source References

- [Python str() Documentation](https://docs.python.org/3/library/stdtypes.html#str)

- [Python __str__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__str__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).