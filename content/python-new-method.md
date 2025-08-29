+++
title = "Python __new__ Method"
date = 2025-08-29T20:08:57.847+01:00
draft = false
description = "Complete guide to Python's __new__ method covering object creation, customization, and advanced patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __new__ Method

last modified March 25, 2025

This comprehensive guide explores Python's __new__ method, the
special method responsible for object creation before __init__ is
called. We'll cover its purpose, use cases, and advanced patterns through
detailed examples.

## Understanding __new__ Basics

The __new__ method is a static method that creates and returns a
new instance of a class. It's called before __init__ and is
responsible for the actual object creation, while __init__ handles
initialization.

basic_new.py
  

class Example:

    def __new__(cls, *args, **kwargs):
        print("__new__ called")
        instance = super().__new__(cls)
        return instance
    
    def __init__(self, value):
        print("__init__ called")
        self.value = value

obj = Example(10)

In this basic example, we see the order of operations when creating an
object. The __new__ method:

1. $1

2. $1

3. $1

Key characteristics of __new__:

- It's a static method (though no decorator needed)

- Must return an instance (usually of cls)

- Can return instances of other classes (unlike __init__)

- Rarely needs to be overridden in regular classes

## Customizing Object Creation

The __new__ method allows complete control over instance
creation. This example shows how to customize what gets created.

custom_creation.py
  

class CustomObject:

    def __new__(cls, value):

    if value &lt; 0:
            return None  # Return None for negative values
        instance = super().__new__(cls)
        instance.created_at = time.time()
        return instance
    
    def __init__(self, value):
        self.value = value

obj1 = CustomObject(5)  # Creates instance
obj2 = CustomObject(-1) # Returns None

This example demonstrates several important concepts:

- We can completely bypass normal instance creation by returning something other than an instance of our class

- We can add attributes to the instance before __init__ is called

- The __init__ method only runs if __new__ returns an instance of the class

Practical applications include:

- Input validation before object creation

- Adding creation metadata to instances

- Implementing object pooling or caching

## Implementing the Singleton Pattern

The __new__ method is perfect for implementing the Singleton
pattern, which ensures a class has only one instance.

singleton.py
  

class Singleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.initialized = False
        return cls._instance
    
    def __init__(self):
        if not self.initialized:
            print("Initializing Singleton")
            self.initialized = True

s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True

This implementation guarantees only one instance exists by:

1. $1

2. $1

Using an initialized flag to prevent __init__ from
running multiple times

Important considerations:

- The initialized flag prevents re-initialization

- Thread-safe implementations require additional locking

- Subclassing Singletons requires special consideration

## Creating Immutable Objects

__new__ can be used to create immutable objects by controlling
attribute assignment.

immutable.py
  

class ImmutablePoint:

    __slots__ = ('x', 'y')  # Prevents dynamic attribute creation
    
    def __new__(cls, x, y):
        instance = super().__new__(cls)
        instance.x = x  # Allowed during creation
        instance.y = y
        return instance
    
    def __setattr__(self, name, value):
        raise AttributeError(f"Cannot modify {name}")
        
p = ImmutablePoint(3, 4)
print(p.x, p.y)  # Works
p.x = 5  # Raises AttributeError

This immutable implementation combines several techniques:

- __slots__ prevents adding new attributes

- __new__ sets initial values during creation

- __setattr__ blocks subsequent modifications

Why this works:

1. $1

2. $1

3. $1

## Subclassing Built-in Types

__new__ is essential when subclassing immutable built-in types
like tuple or str.

subclass_tuple.py
  

class NamedTuple(tuple):

    def __new__(cls, items, name):
        instance = super().__new__(cls, items)
        instance.name = name
        return instance
    
    def __init__(self, items, name):
        # __init__ is still called but often unused in these cases
        pass

nt = NamedTuple([1, 2, 3], "My Numbers")
print(nt)       # (1, 2, 3)
print(nt.name)  # "My Numbers"

When subclassing immutable types:

- __new__ must do all the work since the object is immutable after creation

- We pass the immutable data to the parent class's __new__

- Additional attributes must be set in __new__ before the object becomes immutable

Common use cases:

- Adding metadata to built-in types

- Creating specialized versions of strings, numbers, or tuples

- Implementing custom immutable collections

## Object Pooling Pattern

__new__ can implement object pooling to reuse instances instead of
creating new ones.

object_pool.py
  

class DatabaseConnection:

    _pool = {}
    _max_pool_size = 3
    
    def __new__(cls, connection_string):

        if connection_string not in cls._pool:
            if len(cls._pool) &gt;= cls._max_pool_size:
                raise RuntimeError("Connection pool exhausted")
            instance = super().__new__(cls)
            instance._connect(connection_string)
            cls._pool[connection_string] = instance

        return cls._pool[connection_string]
    
    def _connect(self, connection_string):
        print(f"Connecting to {connection_string}")
        self.connection_string = connection_string

conn1 = DatabaseConnection("db1.example.com")
conn2 = DatabaseConnection("db1.example.com")  # Returns same instance

This object pool implementation:

1. $1

2. $1

3. $1

4. $1

Benefits of object pooling:

- Reduces resource-intensive object creation

- Limits total number of expensive resources (like DB connections)

- Provides centralized management of instances

## Metaclass __new__ Method

In metaclasses, __new__ controls class creation (rather than
instance creation).

meta_new.py
  

class MetaLogger(type):
    def __new__(mcls, name, bases, namespace):
        print(f"Creating class {name}")
        # Add a class-level logger
        namespace['logger'] = logging.getLogger(name)
        return super().__new__(mcls, name, bases, namespace)

class User(metaclass=MetaLogger):
    pass

print(User.logger)  # 

Metaclass __new__ differs from regular __new__:

Regular __new__Metaclass __new__

Creates instances
Creates classes

Receives cls
Receives mcls (metaclass)

Returns instance
Returns class

Common metaclass uses:

- Class registration systems

- Automatic addition of methods/properties

- Enforcing coding standards

- API endpoint generation

## Best Practices and Pitfalls

When working with __new__, keep these guidelines in mind:

- **Don't override __new__ unnecessarily** - Most classes only need __init__

- **Always call super().__new__** - Unless you have a specific reason not to

- **Remember __init__ may not run** - If __new__ returns an existing instance

- **Document your __new__ behavior** - It's non-obvious to other developers

- **Consider thread safety** - For patterns like Singleton or object pooling

## Conclusion

The __new__ method provides low-level control over object
creation in Python. While not needed for everyday programming, understanding
__new__ is essential for advanced Python patterns like:

- Custom immutable objects

- Singleton implementation

- Object pooling

- Subclassing built-in types

- Metaclass programming

Use it judiciously when you need precise control over instance creation, but
prefer __init__ for regular initialization tasks.

## Source References

- [Python Data Model Documentation](https://docs.python.org/3/reference/datamodel.html#object.__new__)

- [Real Python Metaclasses Guide](https://realpython.com/python-metaclasses/)

- [PEP 3107 - Function Annotations](https://peps.python.org/pep-3107/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).