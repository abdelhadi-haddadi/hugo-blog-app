+++
title = "Python __lt__ Method"
date = 2025-08-29T20:08:18.392+01:00
draft = false
description = "Complete guide to Python's __lt__ method covering comparison operations, sorting, and operator overloading."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __lt__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __lt__ method, the
special method that implements the less-than comparison operation. We'll cover
basic usage, sorting, rich comparison methods, and practical examples.

## Basic Definitions

The __lt__ method is one of Python's rich comparison methods. It
stands for "less than" and is called when the &lt; operator is
used. The method should return True or False.

Key characteristics: it takes two parameters (self and
other), should implement meaningful comparison logic, and is used
by sorting functions. It enables custom comparison behavior for objects.

## Basic __lt__ Implementation

Here's a simple implementation showing how __lt__ works with a
custom class. We'll compare objects based on an attribute value.

basic_lt.py
  

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __lt__(self, other):
        return self.price &lt; other.price

p1 = Product("Laptop", 999)
p2 = Product("Phone", 699)

print(p1 &lt; p2)  # False
print(p2 &lt; p1)  # True

This example compares Product instances based on their price attribute. The
__lt__ method returns True if the current instance's price is
less than the other instance's price.

When we use the &lt; operator, Python automatically calls the
__lt__ method with the two objects being compared.

## Sorting Objects with __lt__

The __lt__ method enables custom sorting of objects. Python's
built-in sorted() function uses this method for comparisons.

sorting.py
  

class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    
    def __lt__(self, other):
        return self.grade &lt; other.grade
    
    def __repr__(self):
        return f"{self.name}: {self.grade}"

students = [
    Student("Alice", 85),
    Student("Bob", 72),
    Student("Charlie", 90)
]

sorted_students = sorted(students)
print(sorted_students)

This example sorts Student objects by their grade. The __lt__
method defines the comparison logic, and sorted() uses it to
order the students from lowest to highest grade.

The __repr__ method provides a readable string representation
for printing the sorted list.

## Comparing Different Types

__lt__ can handle comparisons between different types by
returning NotImplemented when comparison isn't possible.

different_types.py
  

class Temperature:
    def __init__(self, value, unit='C'):
        self.value = value
        self.unit = unit
    
    def __lt__(self, other):
        if isinstance(other, Temperature):
            if self.unit == other.unit:
                return self.value &lt; other.value
            elif self.unit == 'C' and other.unit == 'F':
                return self.value &lt; (other.value - 32) * 5/9
            else:
                return (self.value * 9/5 + 32) &lt; other.value
        return NotImplemented

t1 = Temperature(25)  # 25°C
t2 = Temperature(77, 'F')  # 77°F

print(t1 &lt; t2)  # False (25°C is 77°F)
print(t2 &lt; t1)  # False
print(t1 &lt; 30)  # TypeError

This Temperature class compares values even when units differ (Celsius vs
Fahrenheit). For incompatible types, it returns NotImplemented
which lets Python raise a TypeError.

The method first checks if the other object is a Temperature, then handles
unit conversion before comparison.

## Total Ordering with functools

When implementing __lt__, you can use functools.total_ordering
to automatically provide other comparison methods.

total_ordering.py
  

from functools import total_ordering

@total_ordering
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.area = width * height
    
    def __lt__(self, other):
        return self.area &lt; other.area
    
    def __eq__(self, other):
        return self.area == other.area

r1 = Rectangle(3, 4)
r2 = Rectangle(2, 6)
r3 = Rectangle(4, 4)

print(r1 &lt; r2)   # False (12 &lt; 12)
print(r1 &lt;= r2)  # True  (12 &lt;= 12)
print(r1 &gt; r3)   # False (12 &gt; 16)

The total_ordering decorator generates all comparison methods
(__le__, __gt__, etc.) from __lt__ and
__eq__. This reduces boilerplate code.

Here, rectangles are compared by area. We only implement __lt__
and __eq__, but get all comparison operations.

## Reverse Order Sorting

You can implement reverse ordering by inverting the comparison logic in
__lt__ or using the reverse parameter in sorting.

reverse_order.py
  

class Employee:
    def __init__(self, name, years_of_service):
        self.name = name
        self.years = years_of_service
    
    def __lt__(self, other):
        # Higher years comes first (reverse order)
        return self.years &gt; other.years
    
    def __repr__(self):
        return f"{self.name} ({self.years} years)"

employees = [
    Employee("Alice", 3),
    Employee("Bob", 10),
    Employee("Charlie", 5)
]

# Sorted uses __lt__, which we defined for reverse order
sorted_employees = sorted(employees)
print(sorted_employees)

# Alternative: keep normal __lt__ and use reverse=True

This example shows two approaches to reverse sorting. The first inverts the
comparison in __lt__, while the second keeps normal comparison
and uses reverse=True in sorted().

The first approach is useful when you always want reverse ordering for the
objects, while the second provides more flexibility.

## Best Practices

- **Maintain consistency:** Ensure __lt__ agrees with __eq__

- **Handle type checking:** Return NotImplemented for incompatible types

- **Consider total_ordering:** Use the decorator to reduce boilerplate

- **Document comparison logic:** Clearly explain how objects are ordered

- **Preserve natural ordering:** Make comparisons intuitive

## Source References

- [Python __lt__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__lt__)

- [functools.total_ordering Docs](https://docs.python.org/3/library/functools.html#functools.total_ordering)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).