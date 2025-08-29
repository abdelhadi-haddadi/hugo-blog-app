+++
title = "Python @property Decorator"
date = 2025-08-29T20:09:57.125+01:00
draft = false
description = "Python tutorial on the @property decorator, covering its usage for creating getters, setters, and computed properties with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python @property Decorator

last modified February 25, 2025

The @property decorator in Python is used to define methods that
can be accessed like attributes. It allows us to create getters, setters, and
deleters for class attributes, enabling us to control access to the attribute
and add validation or computation logic. This tutorial covers the usage of the
@property decorator with practical examples.

The @property decorator is a built-in decorator in Python that
allows us to define methods as properties. Properties are accessed like
attributes but can include additional logic, such as validation or computation.
The @property decorator is used to define a getter method, while
the @&lt;property&gt;.setter and
@&lt;property&gt;.deleter decorators are used to define setter and
deleter methods, respectively.

## Creating a Simple Property

This example demonstrates how to create a simple property using the
@property decorator.

simple_property.py
  

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

circle = Circle(5)
print(circle.radius)  # Output: 5

The radius method is decorated with @property, making
it a getter for the _radius attribute. The property is accessed
like an attribute, without parentheses.

## Adding a Setter

This example demonstrates how to add a setter to a property.

property_setter.py
  

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value &lt; 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

circle = Circle(5)
print(circle.radius)  # Output: 5

circle.radius = 10
print(circle.radius)  # Output: 10

# circle.radius = -5  # Raises ValueError

The @radius.setter decorator defines a setter for the
radius property. The setter includes validation to ensure the
radius is not negative.

## Adding a Deleter

This example demonstrates how to add a deleter to a property.

property_deleter.py
  

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value &lt; 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @radius.deleter
    def radius(self):
        print("Deleting radius")
        del self._radius

circle = Circle(5)
print(circle.radius)  # Output: 5

del circle.radius  # Output: Deleting radius
# print(circle.radius)  # Raises AttributeError

The @radius.deleter decorator defines a deleter for the
radius property. The deleter is called when the del
statement is used on the property.

## Computed Properties

This example demonstrates how to create a computed property using the
@property decorator.

computed_property.py
  

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @property
    def area(self):
        return 3.14 * self._radius ** 2

circle = Circle(5)
print(circle.area)  # Output: 78.5

The area property is a computed property that calculates the area
of the circle based on the radius. It is accessed like an attribute but performs
a computation when accessed.

## Read-Only Properties

This example demonstrates how to create a read-only property.

read_only_property.py
  

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

circle = Circle(5)
print(circle.radius)  # Output: 5

# circle.radius = 10  # Raises AttributeError

The radius property is read-only because it does not have a setter.
Attempting to assign a value to it raises an AttributeError.

## Best Practices for Using @property

- **Use for Encapsulation:** Use @property to encapsulate access to attributes and add validation or computation logic.

- **Keep Properties Simple:** Avoid complex logic in properties to maintain readability and performance.

- **Document Properties:** Clearly document the purpose and behavior of properties to improve code maintainability.

- **Use Read-Only Properties:** Use read-only properties for attributes that should not be modified after initialization.

## Source

[Python @property Documentation](https://docs.python.org/3/library/functions.html#property)

In this article, we have explored the Python @property decorator
and demonstrated its usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).