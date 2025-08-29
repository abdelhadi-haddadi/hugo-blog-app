+++
title = "Python __iadd__ Method"
date = 2025-08-29T20:08:11.644+01:00
draft = false
description = "Complete guide to Python's __iadd__ method covering in-place addition, operator overloading, and mutable objects."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __iadd__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __iadd__ method, the
special method that implements in-place addition with the += operator. We'll
cover basic usage, mutable vs immutable types, and practical examples.

## Basic Definitions

The __iadd__ method implements the in-place addition operation (+=).
It should modify the object in-place and return the result (usually self).

Key characteristics: it modifies the object directly, returns self for mutable
objects, and can return a new object for immutable types. It's called when
using the += operator.

## Basic __iadd__ Implementation

Here's a simple implementation showing how __iadd__ works with
a custom class. This demonstrates the basic behavior of in-place addition.

basic_iadd.py
  

class Accumulator:
    def __init__(self, value):
        self.value = value
    
    def __iadd__(self, other):
        self.value += other
        return self
    
    def __repr__(self):
        return f"Accumulator({self.value})"

acc = Accumulator(5)
acc += 3
print(acc)  # Accumulator(8)

This example shows a simple accumulator that adds values in-place. The
__iadd__ method modifies the instance's value and returns self.

The += operator calls __iadd__ if available, falling back to
__add__ if not implemented. This method should return self for
proper chaining.

## Mutable vs Immutable Objects

The behavior of __iadd__ differs between mutable and immutable
objects. Lists implement it to modify in-place, while tuples don't have it.

mutable_immutable.py
  

# List (mutable) example
lst = [1, 2, 3]
print(id(lst))  # Original ID
lst += [4, 5]
print(lst)      # [1, 2, 3, 4, 5]
print(id(lst))  # Same ID

# Tuple (immutable) example
tup = (1, 2, 3)
print(id(tup))  # Original ID
tup += (4, 5)
print(tup)      # (1, 2, 3, 4, 5)
print(id(tup))  # Different ID

Lists modify themselves in-place, keeping the same ID. Tuples create a new
object since they're immutable. This shows how += behaves differently.

For immutable types, Python falls back to __add__ when
__iadd__ isn't available, creating a new object instead of
modifying in-place.

## Custom In-Place Addition

We can implement custom in-place addition logic for complex objects. This
example shows a Vector class with += operation.

vector_iadd.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __iadd__(self, other):
        if isinstance(other, Vector):
            self.x += other.x
            self.y += other.y
        else:
            self.x += other
            self.y += other
        return self
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v1 += Vector(3, 4)
print(v1)  # Vector(4, 6)

v1 += 5
print(v1)  # Vector(9, 11)

This Vector class supports += with both Vector objects and scalars. The
__iadd__ method handles both cases and modifies the instance.

The method checks the type of the right operand to determine whether to
do component-wise or scalar addition. It always returns self for chaining.

## In-Place Addition with Side Effects

__iadd__ can include side effects beyond just modification.
This example tracks how many times an object has been modified.

side_effects.py
  

class Counter:
    def __init__(self, value):
        self.value = value
        self.mod_count = 0
    
    def __iadd__(self, other):
        self.value += other
        self.mod_count += 1
        return self
    
    def __repr__(self):
        return f"Counter(value={self.value}, mods={self.mod_count})"

c = Counter(10)
c += 5
c += 3
print(c)  # Counter(value=18, mods=2)

This Counter class increments a modification counter each time += is used.
The __iadd__ method updates both the value and the counter.

This pattern is useful for auditing changes or implementing change tracking
systems where you need to know how often an object has been modified.

## Inheritance and __iadd__

When subclassing, you might need to extend __iadd__ behavior.
This example shows how to properly implement it in a hierarchy.

inheritance.py
  

class Base:
    def __init__(self, value):
        self.value = value
    
    def __iadd__(self, other):
        self.value += other
        return self

class Derived(Base):
    def __iadd__(self, other):
        print("Before addition:", self.value)
        super().__iadd__(other)
        print("After addition:", self.value)
        return self

d = Derived(10)
d += 5
# Output:
# Before addition: 10
# After addition: 15

The Derived class extends the += behavior by adding logging while still
using the parent class's addition logic. It calls super() to delegate.

This pattern maintains the parent's behavior while adding new functionality.
The method still returns self to support proper operator chaining.

## Best Practices

- **Return self:** For mutable objects, return self for proper chaining

- **Modify in-place:** Actually modify the object rather than creating new

- **Handle different types:** Consider type checking for right operand

- **Document behavior:** Clearly document any special += logic

- **Consider immutability:** For immutable types, implement __add__ instead

## Source References

- [Python __iadd__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__iadd__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).