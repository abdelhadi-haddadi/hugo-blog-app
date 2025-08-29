+++
title = "Python __repr__ Method"
date = 2025-08-29T20:08:22.919+01:00
draft = false
description = "Complete guide to Python's __repr__ method covering string representation, debugging, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __repr__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __repr__ method, the
special method that returns the official string representation of an object.

## Basic Definitions

The __repr__ method returns a string representation of an object.
It is called by the repr() built-in function and should be
unambiguous.

A good __repr__ should look like a valid Python expression that
could recreate the object. It's primarily used for debugging and development.

## Basic __repr__ Implementation

Here's a simple implementation showing how __repr__ works with
a basic class. The method should return a string.

basic_repr.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p = Point(3, 4)
print(repr(p))  # Output: Point(3, 4)

This example shows a proper __repr__ implementation. The output
looks like a valid Python expression that could recreate the object.

When you print the object directly or use repr(), Python calls
this method to get the string representation.

## __repr__ vs __str__

__repr__ and __str__ serve different purposes.
__repr__ is for developers while __str__ is for end
users.

repr_vs_str.py
  

class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"
    
    def __str__(self):
        return f"{self.title} by {self.author}"

book = Book("Python Crash Course", "Eric Matthes")
print(repr(book))  # Book('Python Crash Course', 'Eric Matthes')
print(str(book))   # Python Crash Course by Eric Matthes

This example demonstrates the difference. __repr__ shows how to
recreate the object while __str__ provides a user-friendly string.

If __str__ isn't defined, Python will use __repr__ as
a fallback.

## __repr__ for Debugging

A good __repr__ is invaluable for debugging as it shows the exact
state of an object. Here's an example with a more complex class.

debugging_repr.py
  

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, product, quantity):
        self.items.append((product, quantity))
    
    def __repr__(self):
        items_repr = ', '.join(
            f"('{p}', {q})" for p, q in self.items
        )
        return f"ShoppingCart([{items_repr}])"

cart = ShoppingCart()
cart.add_item("Apple", 3)
cart.add_item("Banana", 5)
print(repr(cart))
# Output: ShoppingCart([('Apple', 3), ('Banana', 5)])

This __repr__ shows the complete state of the shopping cart,
including all items and their quantities. It's perfect for debugging.

The representation includes nested structures and maintains the exact format
that could be used to recreate the object.

## __repr__ with Inheritance

When using inheritance, you should include the class name and all relevant
attributes in __repr__. Here's how to do it properly.

inheritance_repr.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f"{self.__class__.__name__}({self.name!r}, {self.age})"

class Employee(Person):
    def __init__(self, name, age, employee_id):
        super().__init__(name, age)
        self.employee_id = employee_id
    
    def __repr__(self):
        return (f"{self.__class__.__name__}({self.name!r}, "
                f"{self.age}, {self.employee_id!r})")

emp = Employee("John Doe", 30, "E12345")
print(repr(emp))  # Employee('John Doe', 30, 'E12345')

This example shows proper __repr__ implementation with inheritance.
The child class includes all attributes from both parent and child.

Using self.__class__.__name__ makes the representation work
correctly even with subclassing.

## __repr__ for Custom Containers

For container-like classes, __repr__ should mimic Python's built-in
containers. Here's an example with a custom list class.

container_repr.py
  

class TaggedList:
    def __init__(self, tag, *items):
        self.tag = tag
        self.items = list(items)
    
    def __repr__(self):
        items_repr = ', '.join(repr(item) for item in self.items)
        return f"{self.__class__.__name__}({self.tag!r}, {items_repr})"
    
    def __str__(self):
        return f"{self.tag}: {', '.join(str(item) for item in self.items)}"

tags = TaggedList("Numbers", 1, 2, 3, 4)
print(repr(tags))  # TaggedList('Numbers', 1, 2, 3, 4)

This __repr__ follows Python's convention for container types,
showing the class name and all contained elements in a comma-separated list.

The representation could be used to recreate the object exactly as it was,
which is the primary goal of __repr__.

## Best Practices

- **Be unambiguous:** The representation should clearly identify the object

- **Make it executable:** Ideally, eval(repr(obj)) should recreate the object

- **Include all state:** Don't omit important attributes

- **Use the class name:** Helps identify the object type

- **Keep it readable:** Balance completeness with readability

## Source References

- [Python __repr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__repr__)

- [Python repr() function](https://docs.python.org/3/library/functions.html#repr)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).