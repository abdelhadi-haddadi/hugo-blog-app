+++
title = "Python __mod__ Method"
date = 2025-08-29T20:08:18.382+01:00
draft = false
description = "Complete guide to Python's __mod__ method covering modulo operation, operator overloading, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __mod__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __mod__ method, the
special method that implements the modulo operation. We'll cover basic usage,
operator overloading, custom implementations, and practical examples.

## Basic Definitions

The __mod__ method is a special method in Python that implements
the modulo operation (%). It's called when the %
operator is used on an object.

Key characteristics: it takes two parameters (self and other),
returns the result of the operation, and can be overridden for custom behavior.
It's part of Python's operator overloading system.

## Basic __mod__ Implementation

Here's a simple class implementing __mod__ to demonstrate how the
method works with the % operator.

basic_mod.py
  

class ModNumber:
    def __init__(self, value):
        self.value = value
    
    def __mod__(self, other):
        return self.value % other

num = ModNumber(17)
result = num % 5
print(result)  # Output: 2

This example shows a basic implementation where __mod__ performs
the modulo operation on the stored value. The % operator calls
this method automatically.

The method returns the remainder of division of self.value by
other. This matches Python's built-in modulo behavior for numbers.

## Modulo with Custom Behavior

We can customize the modulo operation to implement domain-specific behavior,
like circular indexing or custom arithmetic.

custom_mod.py
  

class CircularIndex:
    def __init__(self, value):
        self.value = value
    
    def __mod__(self, other):
        # Implements circular indexing
        return self.value % other if other != 0 else 0

index = CircularIndex(7)
print(index % 5)  # 2 (7 mod 5)
print(index % 0)  # 0 (handle division by zero)

This implementation adds special handling for modulo zero, returning 0 instead
of raising an exception. This might be useful in graphics or game programming.

The custom behavior demonstrates how __mod__ can be adapted to
specific use cases while maintaining the expected operator syntax.

## Modulo with Different Types

The __mod__ method can handle operations between different types,
as long as the operation is defined.

mixed_types.py
  

class TextWrapper:
    def __init__(self, text):
        self.text = text
    
    def __mod__(self, other):
        # String formatting-like behavior
        return self.text.replace('%s', str(other))

wrapper = TextWrapper("The answer is %s")
result = wrapper % 42
print(result)  # Output: The answer is 42

This example repurposes the % operator for string formatting-like
behavior. It replaces %s in the text with the right operand.

This demonstrates how __mod__ can be used for non-mathematical
operations, similar to how Python's strings use % for formatting.

## Reverse Modulo Operation

Python also provides __rmod__ for reverse modulo operations when the
left operand doesn't support the operation.

reverse_mod.py
  

class ModHandler:
    def __rmod__(self, other):
        return f"Handled modulo: {other}"

handler = ModHandler()
result = 10 % handler
print(result)  # Output: Handled modulo: 10

When a regular integer (10) is used with % on our custom object,
Python calls __rmod__ if __mod__ isn't implemented
on the integer class.

This is useful when you want your custom class to work with built-in types on
the right side of the operator.

## In-Place Modulo Operation

For the %= operator, Python uses __imod__ if
available, falling back to __mod__ if not implemented.

inplace_mod.py
  

class AccumulativeMod:
    def __init__(self, value):
        self.value = value
    
    def __imod__(self, other):
        self.value %= other
        return self

num = AccumulativeMod(17)
num %= 5
print(num.value)  # Output: 2

This example shows in-place modulo operation. The __imod__ method
modifies the object's state directly and returns self.

In-place operations are useful for mutable objects where you want to modify the
existing instance rather than creating a new one.

## Best Practices

- **Maintain mathematical consistency:** Follow modulo operation conventions

- **Handle edge cases:** Consider division by zero and type mismatches

- **Document behavior:** Clearly document any custom modulo logic

- **Consider performance:** Modulo operations are often performance-critical

- **Implement related methods:** Include __rmod__ and __imod__ when needed

## Source References

- [Python __mod__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__mod__)

- [Python __rmod__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__rmod__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).