+++
title = "Python __eq__ Method"
date = 2025-08-29T20:08:07.171+01:00
draft = false
description = "Complete guide to Python's __eq__ method covering equality comparison, operator overloading, and custom comparisons."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __eq__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __eq__ method, the
special method responsible for equality comparison. We'll cover basic usage,
custom comparisons, hash consistency, inheritance, and practical examples.

## Basic Definitions

The __eq__ method defines behavior for the equality operator (==).
It should return True if objects are equal, False
otherwise, or NotImplemented if comparison isn't supported.

Key characteristics: it takes two parameters (self and other), should implement
reflexive, symmetric, and transitive properties, and often works with
__hash__ for consistent behavior in collections.

## Basic __eq__ Implementation

Here's a simple implementation showing how __eq__ works for
comparing objects. We'll create a Point class that compares coordinates.

basic_eq.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)
print(p1 == p2)  # True
print(p1 == p3)  # False
print(p1 == "not a point")  # False (uses NotImplemented)

This example shows basic equality comparison between Point instances. The
__eq__ method checks if the other object is a Point and compares
coordinates. For non-Point objects, it returns NotImplemented.

The NotImplemented return allows Python to try the reverse
operation or fall back to default behavior. This maintains proper comparison
semantics.

## Custom Equality with Business Logic

__eq__ can implement business-specific equality rules. Here we
compare BankAccount objects by account number, ignoring balance differences.

business_eq.py
  

class BankAccount:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.balance = balance
    
    def __eq__(self, other):
        if not isinstance(other, BankAccount):
            return NotImplemented
        return self.account_number == other.account_number
    
    def __repr__(self):
        return f"BankAccount({self.account_number}, ${self.balance})"

acc1 = BankAccount("12345", 1000)
acc2 = BankAccount("12345", 500)
acc3 = BankAccount("67890", 1000)
print(acc1 == acc2)  # True (same account number)
print(acc1 == acc3)  # False

This implementation considers accounts equal if they have the same account
number, regardless of balance. This might be useful for checking account
existence in a system.

Note how we still check the type of other to maintain comparison
safety. The __repr__ method helps with debugging but doesn't
affect equality comparison.

## Equality with Inheritance

When dealing with inheritance, __eq__ requires careful
implementation to maintain proper comparison semantics between parent and
child classes.

inheritance_eq.py
  

class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def __eq__(self, other):
        if not isinstance(other, Vehicle):
            return NotImplemented
        return self.make == other.make and self.model == other.model

class Car(Vehicle):
    def __init__(self, make, model, doors):
        super().__init__(make, model)
        self.doors = doors
    
    def __eq__(self, other):
        if not isinstance(other, Car):
            return NotImplemented
        return super().__eq__(other) and self.doors == other.doors

v1 = Vehicle("Toyota", "Camry")
c1 = Car("Toyota", "Camry", 4)
c2 = Car("Toyota", "Camry", 2)
print(v1 == c1)  # False (different types)
print(c1 == c2)  # False (different doors)

This example shows proper equality handling in an inheritance hierarchy. The
Car class extends Vehicle's equality check with its own attribute comparison.

Note that Vehicle and Car instances are never equal,
even if they share make and model. This maintains the Liskov substitution
principle by not treating different types as equal.

## Maintaining Hash Consistency

When overriding __eq__, you should also consider __hash__
to maintain proper behavior in dictionaries and sets. Here's how to do it.

hash_eq.py
  

class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price
    
    def __eq__(self, other):
        if not isinstance(other, Product):
            return NotImplemented
        return self.id == other.id
    
    def __hash__(self):
        return hash(self.id)
    
    def __repr__(self):
        return f"Product({self.id}, '{self.name}', {self.price})"

p1 = Product(1, "Laptop", 999)
p2 = Product(1, "Laptop Pro", 1299)
products = {p1, p2}
print(products)  # Only contains one product (same ID)

This example shows how to maintain hash consistency when overriding equality.
Objects that compare equal must have the same hash value to work correctly in
hash-based collections.

We use the product ID for both equality comparison and hashing, ensuring
consistent behavior. The name and price changes don't affect equality or
hashing in this implementation.

## Case-Insensitive String Comparison

__eq__ can implement alternative comparison logic, like
case-insensitive string comparison in a custom string class.

case_insensitive_eq.py
  

class CaseInsensitiveString:
    def __init__(self, value):
        self.value = value
    
    def __eq__(self, other):
        if isinstance(other, str):
            return self.value.lower() == other.lower()
        if not isinstance(other, CaseInsensitiveString):
            return NotImplemented
        return self.value.lower() == other.value.lower()
    
    def __str__(self):
        return self.value

s1 = CaseInsensitiveString("Hello")
s2 = CaseInsensitiveString("hello")
print(s1 == s2)  # True
print(s1 == "HELLO")  # True
print("WORLD" == CaseInsensitiveString("world"))  # True

This class implements case-insensitive comparison with both its own instances
and regular strings. The __eq__ method handles both cases by
converting strings to lowercase before comparison.

Note how it works in both directions (a == b and b == a) because we handle
string comparison directly and return NotImplemented for other
types, allowing Python to try the reverse operation.

## Best Practices

- **Type checking:** Always verify the type of the other object

- **Return NotImplemented:** For unsupported comparisons

- **Maintain hash consistency:** Override __hash__ when overriding __eq__

- **Follow comparison laws:** Ensure reflexivity, symmetry, and transitivity

- **Consider performance:** Implement efficient comparison logic

## Source References

- [Python __eq__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__eq__)

- [Python __hash__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__hash__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).