+++
title = "Python __init__ Method"
date = 2025-08-29T20:08:13.880+01:00
draft = false
description = "Complete guide to Python's __init__ method covering object initialization, default values, inheritance, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __init__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __init__ method, the
special method responsible for object initialization. We'll cover basic usage,
inheritance, default values, multiple constructors, and practical examples.

## Basic Definitions

The __init__ method is a special method in Python classes that
initializes newly created objects. It's called automatically after the object
is created by __new__.

Key characteristics: it must accept self as first parameter, doesn't
return anything, and is used to set initial values for object attributes. Unlike
constructors in other languages, it doesn't create the object.

## Basic __init__ Implementation

Here's the simplest implementation showing how __init__ initializes
object attributes. This demonstrates the fundamental usage pattern.

basic_init.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(f"{person.name} is {person.age} years old")

This example creates a Person class with name and age attributes.
The __init__ method sets these values when a new instance is created.

The self parameter refers to the instance being initialized.
Attributes are assigned to self to make them instance variables.

## Default Parameter Values

__init__ can use default parameter values to make some arguments
optional while still allowing customization during initialization.

default_values.py
  

class Car:
    def __init__(self, make, model, year=2023, color="black"):
        self.make = make
        self.model = model
        self.year = year
        self.color = color
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model} ({self.color})"

car1 = Car("Toyota", "Camry")
car2 = Car("Ford", "Mustang", 2022, "red")
print(car1)
print(car2)

This Car class has required make and model parameters, with optional
year and color parameters that default to 2023 and "black" if not provided.

Default parameters make classes more flexible while reducing boilerplate code.
They're especially useful when most instances share common default values.

## Inheritance and __init__

When using inheritance, __init__ methods can be chained to properly
initialize parent class attributes along with child class attributes.

inheritance.py
  

class Animal:
    def __init__(self, species):
        self.species = species
    
    def __str__(self):
        return f"I am a {self.species}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__("dog")
        self.name = name
        self.breed = breed
    
    def __str__(self):
        return f"{super().__str__()}, {self.name} the {self.breed}"

dog = Dog("Rex", "Labrador")
print(dog)

This example shows how to properly initialize parent class attributes using
super().__init__(). The Dog class extends Animal
while adding its own attributes.

The super() function returns a proxy object that delegates method
calls to the parent class. This ensures proper method resolution order.

## Multiple Constructors with @classmethod

While Python doesn't support multiple constructors directly, you can simulate
them using @classmethod to create alternative initialization methods.

multiple_constructors.py
  

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    @classmethod
    def from_square(cls, side_length):
        return cls(side_length, side_length)
    
    @classmethod
    def from_dict(cls, dimensions):
        return cls(dimensions['width'], dimensions['height'])
    
    def area(self):
        return self.width * self.height

rect1 = Rectangle(4, 5)
rect2 = Rectangle.from_square(3)
rect3 = Rectangle.from_dict({'width': 2, 'height': 7})
print(rect1.area(), rect2.area(), rect3.area())

This Rectangle class shows three ways to create instances: through
the standard __init__, via a square factory method, and from a
dictionary of dimensions.

Class methods provide flexible initialization options while maintaining a single
__init__ method. Each factory method returns a new instance by
calling the class constructor.

## Initializing Collections in __init__

When initializing mutable collections as instance attributes, it's important to
create new collections for each instance to avoid shared state between instances.

collections_init.py
  

class ShoppingCart:
    def __init__(self, customer_name):
        self.customer_name = customer_name
        self.items = []  # New list for each instance
    
    def add_item(self, item):
        self.items.append(item)
    
    def __str__(self):
        return f"{self.customer_name}'s cart: {', '.join(self.items)}"

cart1 = ShoppingCart("Alice")
cart2 = ShoppingCart("Bob")
cart1.add_item("Book")
cart2.add_item("Shirt")
print(cart1)
print(cart2)

This example demonstrates proper initialization of instance-specific collections.
Each ShoppingCart gets its own empty list for items.

If the list was defined as a class variable instead, all instances would share
the same list, leading to unexpected behavior when items are added.

## Best Practices

- **Keep __init__ simple:** Focus on attribute initialization

- **Avoid complex logic:** Move business logic to other methods

- **Use type hints:** Document expected parameter types

- **Initialize all attributes:** Set defaults for optional ones

- **Call super().__init__:** In inheritance hierarchies

## Source References

- [Python __init__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__init__)

- [Python Class Objects Docs](https://docs.python.org/3/tutorial/classes.html#class-objects)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).