+++
title = "Python __str__ Method"
date = 2025-08-29T20:08:25.123+01:00
draft = false
description = "Complete guide to Python's __str__ method covering string representation, printing objects, and custom string conversions."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __str__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __str__ method, the
special method responsible for string representation of objects. We'll cover
basic usage, formatting, differences with __repr__, and examples.

## Basic Definitions

The __str__ method returns a string representation of an object.
It's called by the str() built-in function and by the
print() function to display objects in a human-readable format.

Key characteristics: it must return a string object, is meant to be readable,
and should provide a concise representation. It's different from
__repr__ which aims to be unambiguous and complete.

## Basic __str__ Implementation

Here's a simple class implementing __str__ to provide a custom
string representation. This demonstrates the fundamental usage pattern.

basic_str.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person: {self.name}, {self.age} years old"

p = Person("Alice", 30)
print(p)  # Calls __str__ implicitly
print(str(p))  # Explicit call

This example shows how __str__ provides a readable string format.
When we print the object or call str() on it, Python invokes
__str__ to get the string representation.

The output will be "Person: Alice, 30 years old" in both cases, demonstrating
how __str__ customizes the display of our object.

## __str__ vs __repr__

This example demonstrates the difference between __str__ and
__repr__, showing when each is called and their intended purposes.

str_vs_repr.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(p)       # Uses __str__: (3, 4)
print(repr(p)) # Uses __repr__: Point(3, 4)

__repr__ aims to be unambiguous (good for debugging), while
__str__ aims to be readable. The print() function
uses __str__, while the REPL uses __repr__.

If __str__ isn't defined, Python falls back to __repr__.
It's good practice to implement both for clarity in different contexts.

## Formatting with __str__

The __str__ method can include complex formatting to present object
data in a visually appealing way, as shown in this table-like representation.

formatting_str.py
  

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
    
    def __str__(self):
        header = f"{'Name':&lt;15}{'Price':&gt;10}{'Quantity':&gt;12}"
        divider = "-" * 37
        row = f"{self.name:&lt;15}${self.price:&gt;9.2f}{self.quantity:&gt;12}"
        return f"{header}\n{divider}\n{row}"

item = Product("Laptop", 1299.99, 5)
print(item)

This implementation creates a formatted table-like output with aligned columns.
The string formatting mini-language is used to control spacing and decimal
places for professional-looking output.

The output will show a header row, divider line, and product data neatly
aligned, demonstrating how __str__ can enhance readability.

## __str__ in Inheritance

When using inheritance, __str__ can be extended to include
information from both parent and child classes, as shown in this example.

inheritance_str.py
  

class Animal:
    def __init__(self, species):
        self.species = species
    
    def __str__(self):
        return f"Species: {self.species}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__("Canine")
        self.name = name
        self.breed = breed
    
    def __str__(self):
        return f"{super().__str__()}, Name: {self.name}, Breed: {self.breed}"

dog = Dog("Buddy", "Golden Retriever")
print(dog)

The child class's __str__ calls the parent's version using
super(), then adds its own information. This creates a complete
string representation combining both levels of the class hierarchy.

The output will be "Species: Canine, Name: Buddy, Breed: Golden Retriever",
showing how inheritance chains can build comprehensive string representations.

## Dynamic __str__ Content

__str__ can generate dynamic content based on the object's current
state, as demonstrated in this time-based greeting example.

dynamic_str.py
  

import datetime

class Greeter:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        hour = datetime.datetime.now().hour
        if hour &lt; 12:
            time_of_day = "morning"
        elif hour &lt; 18:
            time_of_day = "afternoon"
        else:
            time_of_day = "evening"
        return f"Good {time_of_day}, {self.name}!"

greeting = Greeter("Alice")
print(greeting)  # Changes based on current time

This __str__ implementation checks the current time and generates
an appropriate greeting message. The string representation changes dynamically
based on when it's called.

This demonstrates how __str__ can incorporate runtime information
to create context-aware representations, making objects more interactive.

## Best Practices

- **Keep it readable:** __str__ should prioritize human readability

- **Include key information:** Focus on most important attributes

- **Return a string:** Must return a string object, not print

- **Consider performance:** Complex formatting may impact performance

- **Implement __repr__ too:** Always provide both string methods

## Source References

- [Python __str__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__str__)

- [Python __repr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__repr__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).