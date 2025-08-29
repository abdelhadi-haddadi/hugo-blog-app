+++
title = "Python classmethod Function"
date = 2025-08-29T20:07:48.782+01:00
draft = false
description = "Complete guide to Python's classmethod decorator covering definition, usage, and practical examples of class methods."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python classmethod Function

Last modified April 11, 2025

This comprehensive guide explores Python's classmethod decorator,
which transforms a method into a class method. We'll cover definitions, use
cases, and practical examples of class methods in object-oriented programming.

## Basic Definitions

The classmethod is a built-in function decorator that converts a
method to a class method. A class method receives the class as implicit first
argument, just like an instance method receives the instance.

Key characteristics: bound to the class rather than instance, can modify class
state, commonly used for alternative constructors and factory methods. Defined
using the @classmethod decorator syntax.

## Basic classmethod Usage

Here's a simple example showing how to define and use a class method compared
to a regular instance method.

basic_classmethod.py
  

class MyClass:
    def instance_method(self):
        print(f"Called instance_method of {self}")
    
    @classmethod
    def class_method(cls):
        print(f"Called class_method of {cls}")

# Instance method requires an instance
obj = MyClass()
obj.instance_method()  # Called instance_method of &lt;__main__.MyClass object&gt;

# Class method can be called on the class
MyClass.class_method()  # Called class_method of &lt;class '__main__.MyClass'&gt;

This example demonstrates the fundamental difference between instance methods
and class methods. The class method receives the class (cls) as
its first argument instead of an instance (self).

Class methods can be called both on the class itself and on instances, while
instance methods can only be called on instances.

## Alternative Constructors

A common use case for class methods is creating alternative constructors. This
example shows how to create objects from different data formats.

alternative_constructor.py
  

class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day
    
    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)
    
    @classmethod
    def from_dict(cls, date_dict):
        return cls(date_dict['year'], date_dict['month'], date_dict['day'])
    
    def __repr__(self):
        return f"Date({self.year}, {self.month}, {self.day})"

# Using standard constructor
d1 = Date(2025, 4, 11)

# Using alternative constructors
d2 = Date.from_string("2025-04-11")
d3 = Date.from_dict({'year': 2025, 'month': 4, 'day': 11})

print(d1)  # Date(2025, 4, 11)
print(d2)  # Date(2025, 4, 11)
print(d3)  # Date(2025, 4, 11)

This Date class provides two alternative constructors as class methods. The
from_string method parses a date string, while from_dict
creates a Date from a dictionary.

The cls parameter refers to the class itself, allowing these
methods to create new instances. This pattern is common in Python's standard
library (e.g., datetime.datetime.fromtimestamp).

## Class State Modification

Class methods can modify class-level state that affects all instances. This
example demonstrates tracking instance count.

class_state.py
  

class Counter:
    count = 0
    
    def __init__(self):
        self.increment()
    
    @classmethod
    def increment(cls):
        cls.count += 1
    
    @classmethod
    def get_count(cls):
        return cls.count
    
    @classmethod
    def reset(cls):
        cls.count = 0

# Create instances
c1 = Counter()
c2 = Counter()
c3 = Counter()

print(Counter.get_count())  # 3

Counter.reset()
print(Counter.get_count())  # 0

The Counter class uses class methods to manage class-level state. The
count variable is shared across all instances, and class methods
provide controlled access to modify it.

This pattern is useful for maintaining shared state, configuration, or
tracking instances across an entire class hierarchy.

## Inheritance Behavior

Class methods work properly with inheritance, receiving the most derived class
as their first argument. This example demonstrates polymorphic class methods.

inheritance.py
  

class Animal:
    @classmethod
    def make_sound(cls):
        return f"{cls.__name__} makes a generic sound"

class Dog(Animal):
    @classmethod
    def make_sound(cls):
        return f"{cls.__name__} barks"

class Cat(Animal):
    pass

print(Animal.make_sound())  # Animal makes a generic sound
print(Dog.make_sound())     # Dog barks
print(Cat.make_sound())     # Cat makes a generic sound

This example shows how class methods support inheritance. When called on a
subclass, the subclass is passed as cls, allowing for polymorphic
behavior.

The Cat class inherits the parent's class method, while Dog overrides it.
This demonstrates how class methods can be specialized in subclasses.

## Factory Pattern

Class methods are often used to implement factory patterns, creating different
types of objects based on input. This example shows a shape factory.

factory.py
  

class Shape:
    def draw(self):
        pass
    
    @classmethod
    def create_shape(cls, shape_type):
        if shape_type == "circle":
            return Circle()
        elif shape_type == "square":
            return Square()
        else:
            raise ValueError(f"Unknown shape type: {shape_type}")

class Circle(Shape):
    def draw(self):
        print("Drawing a circle")

class Square(Shape):
    def draw(self):
        print("Drawing a square")

# Using the factory method
circle = Shape.create_shape("circle")
square = Shape.create_shape("square")

circle.draw()  # Drawing a circle
square.draw()  # Drawing a square

The create_shape class method acts as a factory, creating different
Shape subclasses based on the input parameter. This encapsulates object creation
logic in one place.

This pattern is useful when the exact class to instantiate isn't known until
runtime or needs to be determined dynamically based on configuration or input.

## Best Practices

- **Use for alternative constructors:** When you need multiple ways to create instances

- **Modify class state:** For operations that affect all instances

- **Implement factories:** When object creation logic is complex

- **Prefer over staticmethod:** When you need access to the class

- **Document clearly:** Explain the purpose of each class method

## Source References

- [Python classmethod() Documentation](https://docs.python.org/3/library/functions.html#classmethod)

- [Python __new__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__new__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).