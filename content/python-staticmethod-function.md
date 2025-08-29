+++
title = "Python staticmethod Function"
date = 2025-08-29T20:10:51.249+01:00
draft = false
description = "Complete guide to Python's staticmethod function covering definition, usage, and practical examples of static methods in classes."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python staticmethod Function

Last modified April 11, 2025

This comprehensive guide explores Python's staticmethod function,
which creates static methods in classes. We'll cover definitions, usage
patterns, and practical examples of when to use static methods.

## Basic Definitions

The staticmethod is a built-in function that transforms a method
into a static method. Static methods don't receive an implicit first argument.

Key characteristics: they belong to the class rather than instances, can't
access or modify class/instance state, and are called using the class name.
They serve as utility functions related to the class.

## Basic staticmethod Usage

Here's the simplest way to create and use a static method in a Python class.
This example shows the decorator syntax and direct function call.

basic_static.py
  

class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

# Call through class
print(MathUtils.add(5, 3))  # 8

# Call through instance (works but not recommended)
utils = MathUtils()
print(utils.add(10, 2))     # 12

This shows a basic static method that performs addition. The @staticmethod
decorator indicates this method doesn't need self or cls.

While you can call static methods through instances, it's clearer to call them
through the class since they don't depend on instance state.

## Utility Functions in Classes

Static methods are often used for utility functions that logically belong to
a class but don't need access to instance or class data.

date_utils.py
  

class DateUtils:
    @staticmethod
    def is_leap_year(year):
        if year % 4 != 0:
            return False
        elif year % 100 != 0:
            return True
        else:
            return year % 400 == 0

print(DateUtils.is_leap_year(2020))  # True
print(DateUtils.is_leap_year(2021))  # False

The is_leap_year method is a good candidate for static method
because it performs a date-related calculation but doesn't need instance data.

This keeps the function organized within the DateUtils class namespace while
maintaining independence from any particular DateUtils instance.

## Alternative Constructor

Static methods can serve as alternative constructors for your classes, providing
different ways to create instances.

alternative_constructor.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    @staticmethod
    def from_tuple(coords):
        return Point(coords[0], coords[1])
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

# Regular constructor
p1 = Point(3, 4)
print(p1)  # Point(3, 4)

# Alternative constructor
p2 = Point.from_tuple((5, 6))
print(p2)  # Point(5, 6)

The from_tuple static method provides an alternative way to create
Point objects. This is a common pattern in Python (see datetime).

Such methods are often named starting with "from_" to indicate they're factory
methods that construct objects from different input formats.

## Comparing with Classmethod

This example demonstrates the difference between staticmethod and
classmethod, showing when to use each.

static_vs_class.py
  

class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients
    
    @classmethod
    def margherita(cls):
        return cls(["mozzarella", "tomatoes"])
    
    @staticmethod
    def calculate_area(radius):
        return 3.14 * radius ** 2

# Classmethod usage - knows about the class
p1 = Pizza.margherita()
print(p1.ingredients)  # ['mozzarella', 'tomatoes']

# Staticmethod usage - no class knowledge
area = Pizza.calculate_area(12)
print(area)  # 452.16

The margherita classmethod needs to know about the class to create
new instances, while calculate_area is purely a mathematical
function.

Use classmethod when you need access to the class, and
staticmethod when the method is just a utility function.

## Performance Considerations

Static methods can offer slight performance benefits by avoiding the method
binding overhead of regular instance methods.

performance.py
  

import timeit

class Test:
    def instance_method(self):
        pass
    
    @staticmethod
    def static_method():
        pass

t = Test()

print("Instance method:", timeit.timeit(t.instance_method))
print("Static method:", timeit.timeit(t.static_method))

This benchmark shows static methods are slightly faster than instance methods
because they skip the instance binding step. However, the difference is usually
negligible.

The performance benefit should not be the primary reason to use static methods
- their logical organization and independence from instance state should be.

## Best Practices

- **Use for utilities:** When method doesn't need instance/class state

- **Alternative constructors:** For factory methods that create instances

- **Clear naming:** Name static methods to indicate their purpose

- **Prefer classmethod:** When you need access to the class

- **Document clearly:** Explain why the method is static

## Source References

- [Python staticmethod() Documentation](https://docs.python.org/3/library/functions.html#staticmethod)

- [Python Descriptor HowTo Guide](https://docs.python.org/3/howto/descriptor.html#static-methods)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).