+++
title = "Python __imul__ Method"
date = 2025-08-29T20:08:13.909+01:00
draft = false
description = "Complete guide to Python's __imul__ method covering in-place multiplication, operator overloading, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __imul__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __imul__ method, the
special method that implements in-place multiplication. We'll cover basic usage,
operator overloading, mutable vs immutable types, and practical examples.

## Basic Definitions

The __imul__ method is called to implement the in-place multiplication
operation (*=). It should modify and return self when
possible, but can return a new object if necessary.

Key characteristics: it modifies the object in-place when possible, returns the
result (usually self), and is called for *= operations. If not
implemented, Python falls back to __mul__ followed by assignment.

## Basic __imul__ Implementation

Here's a simple implementation showing how __imul__ works with a
custom class. The method modifies the object's state and returns itself.

basic_imul.py
  

class Number:
    def __init__(self, value):
        self.value = value
        
    def __imul__(self, other):
        self.value *= other
        return self
    
    def __repr__(self):
        return f"Number({self.value})"

num = Number(5)
num *= 3
print(num)  # Output: Number(15)

This example shows a basic __imul__ implementation that modifies
the instance's value attribute. The method returns self to allow chaining
operations.

The *= operator calls __imul__, which updates the
object's state in-place. This is more efficient than creating a new object.

## __imul__ with Mutable Sequences

For mutable sequences like lists, __imul__ performs in-place
repetition. This example demonstrates the behavior with a custom sequence.

sequence_imul.py
  

class MyList:
    def __init__(self, items):
        self.items = list(items)
        
    def __imul__(self, factor):
        self.items *= factor
        return self
    
    def __repr__(self):
        return f"MyList({self.items})"

lst = MyList([1, 2])
lst *= 3
print(lst)  # Output: MyList([1, 2, 1, 2, 1, 2])

This custom list class implements __imul__ to multiply its contents
in-place. The original object is modified rather than creating a new one.

The implementation delegates to the built-in list's *= operation,
which efficiently handles the repetition. This pattern is common for wrappers.

## __imul__ with Immutable Types

Immutable types can't be modified in-place, so their __imul__ must
return a new object. This example shows the behavior difference.

immutable_imul.py
  

class ImmutableNumber:
    def __init__(self, value):
        self.value = value
        
    def __imul__(self, other):
        return ImmutableNumber(self.value * other)
    
    def __repr__(self):
        return f"ImmutableNumber({self.value})"

num = ImmutableNumber(5)
num *= 3
print(num)  # Output: ImmutableNumber(15)
print(id(num))  # Shows a new object was created

Since immutable objects can't change their state, __imul__ returns
a new instance. The original object remains unchanged, and the variable is
reassigned.

This matches Python's built-in behavior for immutable types like tuples, where
*= creates a new object rather than modifying in-place.

## Matrix Multiplication with __imul__

For mathematical objects like matrices, __imul__ can implement
in-place matrix multiplication. This example shows a simplified version.

matrix_imul.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
        
    def __imul__(self, other):
        if isinstance(other, (int, float)):
            # Scalar multiplication
            self.data = [[x * other for x in row] 
                        for row in self.data]
            return self
        # Matrix multiplication would go here
        raise TypeError("Unsupported operand type")
    
    def __repr__(self):
        return f"Matrix({self.data})"

m = Matrix([[1, 2], [3, 4]])
m *= 2
print(m)  # Output: Matrix([[2, 4], [6, 8]])

This matrix class implements scalar multiplication in-place through
__imul__. The method checks the operand type and performs
the appropriate operation.

For actual matrix multiplication, you would need to implement the full
algorithm, but this shows the in-place modification pattern.

## Combining __imul__ with Other Operations

__imul__ can be combined with other operations for complex
behavior. This example shows a class that tracks multiplication history.

tracking_imul.py
  

class TrackingNumber:
    def __init__(self, value):
        self.value = value
        self.history = []
        
    def __imul__(self, other):
        self.history.append((self.value, other))
        self.value *= other
        return self
    
    def get_history(self):
        return self.history
    
    def __repr__(self):
        return f"TrackingNumber({self.value})"

num = TrackingNumber(2)
num *= 3
num *= 4
print(num)  # Output: TrackingNumber(24)
print(num.get_history())  # Output: [(2, 3), (6, 4)]

This class extends the basic number behavior by tracking all in-place
multiplications. The history is stored in a list and updated during each
operation.

The example demonstrates how __imul__ can maintain additional
state beyond just performing the mathematical operation. This is useful for
debugging or auditing.

## Best Practices

- **Modify in-place when possible:** Follow Python's mutable object conventions

- **Return self:** Allows method chaining and matches built-in behavior

- **Handle different types:** Check operand types and raise TypeError if needed

- **Consider immutability:** Return new objects for immutable types

- **Document behavior:** Clearly specify whether operation is in-place

## Source References

- [Python __imul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__imul__)

- [Python operator.imul](https://docs.python.org/3/library/operator.html#operator.imul)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).