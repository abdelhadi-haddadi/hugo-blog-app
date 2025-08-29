+++
title = "Python super Function"
date = 2025-08-29T20:10:53.482+01:00
draft = false
description = "Complete guide to Python's super function covering inheritance, method resolution order, and practical examples of super usage."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python super Function

Last modified April 11, 2025

This comprehensive guide explores Python's super function, which
enables method calls to parent classes in inheritance hierarchies. We'll cover
basic usage, method resolution order, and practical examples.

## Basic Definitions

The super function returns a proxy object that delegates method
calls to a parent or sibling class. It's essential for cooperative multiple
inheritance in Python.

Key characteristics: follows Method Resolution Order (MRO), works with both
single and multiple inheritance, and helps avoid hardcoding parent class names.

## Basic Inheritance Usage

Here's simple usage showing how super calls parent class methods
in single inheritance scenarios.

basic_super.py
  

class Parent:
    def __init__(self):
        print("Parent __init__")
        
    def method(self):
        print("Parent method")

class Child(Parent):
    def __init__(self):
        super().__init__()
        print("Child __init__")
        
    def method(self):
        super().method()
        print("Child method")

c = Child()
c.method()

This example demonstrates basic super usage. The Child class calls
Parent's methods without explicitly naming Parent, making code more maintainable.

Output shows both parent and child methods execute, with parent methods called
first due to super delegation.

## Multiple Inheritance

super becomes particularly powerful with multiple inheritance.
This example shows diamond pattern inheritance and method resolution.

multiple_inheritance.py
  

class A:
    def method(self):
        print("A method")
        super().method()

class B:
    def method(self):
        print("B method")

class C(A, B):
    def method(self):
        print("C method")
        super().method()

c = C()
c.method()
print(C.__mro__)  # Show method resolution order

This demonstrates how super follows the MRO (C → A → B). Each
class's method calls the next in the chain, even though A doesn't inherit from B.

The MRO output shows the linearized inheritance path Python uses to resolve
method calls.

## super with Class Methods

super works with class methods too. This example shows proper
usage in a classmethod context.

classmethod_super.py
  

class Base:
    @classmethod
    def create(cls):
        print(f"Base.create({cls})")
        return cls()

class Derived(Base):
    @classmethod
    def create(cls):
        print(f"Derived.create({cls})")
        instance = super().create()
        print(f"Created {instance}")
        return instance

d = Derived.create()

The example shows super in a classmethod correctly passing the
derived class (cls) to the parent's classmethod. This maintains proper
polymorphism.

Output demonstrates the call chain and shows the instance creation process
through the inheritance hierarchy.

## super in Property Overrides

This example demonstrates using super to extend property behavior
without completely overriding it.

property_super.py
  

class Person:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        self._name = value

class Employee(Person):
    @property
    def name(self):
        return super().name.upper()
    
    @name.setter
    def name(self, value):
        super(Employee, Employee).name.__set__(self, value)

e = Employee("John")
print(e.name)  # JOHN
e.name = "Alice"
print(e.name)  # ALICE

The Employee class extends the name property getter while preserving the parent's
setter behavior. Note the special syntax needed for property setters.

This pattern is useful when you want to modify property behavior while keeping
the underlying storage mechanism.

## super with __init_subclass__

Python 3.6+ introduced __init_subclass__. This example shows how
super works with this special class method.

init_subclass.py
  

class PluginBase:
    plugins = []
    
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.plugins.append(cls)
        print(f"Registered plugin {cls.__name__}")

class PluginA(PluginBase):
    pass

class PluginB(PluginBase):
    pass

print(PluginBase.plugins)  # [&lt;class '__main__.PluginA'&gt;, &lt;class '__main__.PluginB'&gt;]

The example demonstrates a plugin registration system. Each subclass calls
super().__init_subclass__ to ensure proper initialization
chaining.

This pattern is common in frameworks that need to track all subclasses of
a base class.

## Best Practices

- **Use consistently:** Always use super() instead of direct parent calls

- **Understand MRO:** Know your class hierarchy's method resolution order

- **Pass arguments:** Ensure all methods in hierarchy accept same arguments

- **Document overrides:** Clearly document when methods extend parent behavior

- **Test thoroughly:** Multiple inheritance requires careful testing

## Source References

- [Python super() Documentation](https://docs.python.org/3/library/functions.html#super)

- [Super Considered Super blog post](https://rhettinger.wordpress.com/2011/05/26/super-considered-super/)

- [Python's super() explained](https://www.python.org/download/releases/2.2.3/descrintro/#cooperation)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).