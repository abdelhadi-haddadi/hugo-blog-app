+++
title = "Python Methods"
date = 2025-08-29T20:08:55.577+01:00
draft = false
description = "Python tutorial on methods, covering instance methods, class methods, static methods, and their usage with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Methods

last modified February 25, 2025

Methods in Python are functions defined within a class. They are used to define
the behavior of objects. Python supports three types of methods: instance
methods, class methods, and static methods. This tutorial covers each type with
practical examples.

Methods allow objects to perform actions and interact with data. Understanding
the differences between instance, class, and static methods is key to writing
clean and efficient Python code.

## Instance Methods

Instance methods are the most common type of method. They take self
as the first parameter, which refers to the instance of the class.

instance_method.py
  

class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Buddy")
print(dog.bark())  # Output: Buddy says woof!

The bark method is an instance method. It can access and modify
the instance's attributes using self.

## Class Methods

Class methods are defined using the @classmethod decorator. They
take cls as the first parameter, which refers to the class itself.

class_method.py
  

class Dog:
    species = "Canis familiaris"

    def __init__(self, name):
        self.name = name

    @classmethod
    def get_species(cls):
        return cls.species

print(Dog.get_species())  # Output: Canis familiaris

The get_species method is a class method. It can access class-level
attributes but not instance-specific data.

## Static Methods

Static methods are defined using the @staticmethod decorator. They
do not take self or cls as parameters and behave like
regular functions.

static_method.py
  

class Dog:
    def __init__(self, name):
        self.name = name

    @staticmethod
    def is_dog_sound(sound):
        return sound == "woof"

print(Dog.is_dog_sound("woof"))  # Output: True
print(Dog.is_dog_sound("meow"))  # Output: False

The is_dog_sound method is a static method. It does not depend on
the instance or class and is used for utility functions.

## When to Use Each Method

- **Instance Methods:** Use when we need to access or modify instance attributes.

- **Class Methods:** Use when we need to work with class-level attributes or perform actions related to the class itself.

- **Static Methods:** Use for utility functions that do not depend on instance or class state.

## Practical Example

This example demonstrates the use of all three types of methods in a single class.

methods_example.py
  

class Calculator:
    def __init__(self, value):
        self.value = value

    # Instance method
    def add(self, num):
        self.value += num
        return self.value

    # Class method
    @classmethod
    def from_string(cls, string):
        return cls(int(string))

    # Static method
    @staticmethod
    def is_even(num):
        return num % 2 == 0

# Using instance method
calc = Calculator(10)
print(calc.add(5))  # Output: 15

# Using class method
calc2 = Calculator.from_string("20")
print(calc2.value)  # Output: 20

# Using static method
print(Calculator.is_even(15))  # Output: False

This example shows how instance, class, and static methods can be used together
in a single class to perform different tasks.

## Best Practices for Using Methods

- **Use Instance Methods for Object-Specific Logic:** Instance methods are ideal for logic that depends on the object's state.

- **Use Class Methods for Factory Methods:** Class methods are great for creating alternative constructors.

- **Use Static Methods for Utility Functions:** Static methods are best for functions that do not depend on the class or instance.

- **Keep Methods Focused:** Each method should have a single responsibility to maintain clean and readable code.

## Source

[Python Classes Documentation](https://docs.python.org/3/tutorial/classes.html)

In this article, we have explored Python methods, including instance methods,
class methods, and static methods, with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).