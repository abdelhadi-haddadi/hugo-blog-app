+++
title = "Python Abstract Classes"
date = 2025-08-29T20:07:35.407+01:00
draft = false
description = "Python tutorial on abstract base classes (ABCs), covering their creation, usage, and practical examples in object-oriented design."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Abstract Classes

last modified March 25, 2025

Abstract classes in Python are classes that cannot be instantiated and are designed
to be inherited by other classes. They serve as blueprints for other classes,
defining a common interface that subclasses must implement. Python provides the
abc module to work with abstract base classes (ABCs).

Abstract classes are particularly useful when you want to define a common API for
a group of related classes while enforcing certain methods to be implemented in
subclasses. They help create more maintainable and predictable code by explicitly
defining what methods subclasses should implement. The @abstractmethod
decorator marks methods that must be overridden in concrete subclasses.

## Creating a Basic Abstract Class

This example demonstrates how to create and use a simple abstract class in Python.

basic_abc.py
  

from abc import ABC, abstractmethod

class Shape(ABC):

    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):

    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 10)
print(rect.area())      # Output: 50
print(rect.perimeter()) # Output: 30

# shape = Shape()  # Raises TypeError

The Shape class is an abstract base class that defines two abstract
methods: area and perimeter. Any concrete subclass
like Rectangle must implement these methods. Attempting to
instantiate the abstract class directly raises a TypeError.

## Abstract Properties

This example shows how to define abstract properties in an abstract class.

abstract_properties.py
  

from abc import ABC, abstractmethod

class Person(ABC):

    @property
    @abstractmethod
    def name(self):
        pass

    @abstractmethod
    def speak(self):
        pass

class Employee(Person):

    def __init__(self, first_name, last_name):
        self._name = f"{first_name} {last_name}"

    @property
    def name(self):
        return self._name

    def speak(self):
        return f"Hello, my name is {self.name}"

emp = Employee("John", "Doe")
print(emp.name)    # Output: John Doe
print(emp.speak()) # Output: Hello, my name is John Doe

Abstract properties combine the @property decorator with
@abstractmethod to require concrete subclasses to implement specific
properties. In this example, the Employee class implements both the
abstract name property and the abstract speak method.

## Abstract Class with Concrete Methods

This example demonstrates an abstract class that includes both abstract and
concrete methods.

concrete_methods.py
  

from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

    def execute(self, sql):
        conn = self.connect()
        result = self.query(sql)
        conn.close()
        return result

class MySQLDatabase(Database):
    def connect(self):
        print("Connecting to MySQL database")
        return "mysql_connection"

    def query(self, sql):
        print(f"Executing MySQL query: {sql}")
        return "query_results"

db = MySQLDatabase()
db.execute("SELECT * FROM users")

Abstract classes can include both abstract methods that subclasses must implement
and concrete methods that provide shared functionality. In this example, the
execute method is fully implemented in the abstract class but
relies on abstract methods connect and query that
subclasses must provide.

## Registering Virtual Subclasses

This example shows how to register classes as virtual subclasses of an abstract
base class without explicit inheritance.

virtual_subclasses.py
  

from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def make_sound(self):
        pass

class Dog:
    def make_sound(self):
        return "Woof!"

Animal.register(Dog)  # Register Dog as virtual subclass

dog = Dog()
print(isinstance(dog, Animal))  # Output: True
print(issubclass(Dog, Animal))  # Output: True
print(dog.make_sound())         # Output: Woof!

The register method allows you to declare that a class implements
an abstract base class without explicitly inheriting from it. The registered class
must implement all abstract methods, but this isn't checked until you try to use
the methods. This is useful when working with classes you can't modify or when
using duck typing.

## Abstract Class with Class Methods

This example demonstrates using abstract class methods in an abstract base class.

abstract_classmethods.py
  

from abc import ABC, abstractmethod

class Serializer(ABC):

    @classmethod
    @abstractmethod
    def serialize(cls, data):
        pass

    @classmethod
    @abstractmethod
    def deserialize(cls, serialized_data):
        pass

class JSONSerializer(Serializer):

    @classmethod
    def serialize(cls, data):
        return f"JSON: {data}"

    @classmethod
    def deserialize(cls, serialized_data):
        return serialized_data.replace("JSON: ", "")

print(JSONSerializer.serialize({"key": "value"}))  # Output: JSON: {'key': 'value'}

Abstract class methods are defined using both the @classmethod and
@abstractmethod decorators. Subclasses must implement these class
methods. This pattern is useful when you want to enforce a class-level API across
related classes, such as different serialization formats in this example.

## Multiple Inheritance with Abstract Classes

This example shows how abstract classes can be used in multiple inheritance.

multiple_inheritance.py
  

from abc import ABC, abstractmethod

class Readable(ABC):

    @abstractmethod
    def read(self):
        pass

class Writable(ABC):

    @abstractmethod
    def write(self, data):
        pass

class ReadWriteFile(Readable, Writable):

    def __init__(self, filename):
        self.filename = filename

    def read(self):
        return f"Reading from {self.filename}"

    def write(self, data):
        return f"Writing '{data}' to {self.filename}"

file = ReadWriteFile("example.txt")
print(file.read())            # Output: Reading from example.txt
print(file.write("Hello"))   # Output: Writing 'Hello' to example.txt

Abstract classes can be combined through multiple inheritance to create classes
that implement multiple interfaces. The ReadWriteFile class inherits
from both Readable and Writable abstract classes and
implements all their abstract methods. This approach allows for flexible interface
definitions while maintaining strict implementation requirements.

## Best Practices for Abstract Classes

- **Use for API Definition:** Abstract classes are ideal for defining clear APIs that subclasses must implement.

- **Keep Abstract Methods Minimal:** Only mark methods as abstract when they're truly required for the class's purpose.

- **Document Intent:** Clearly document why methods are abstract and what implementations should do.

- **Prefer Composition:** Consider whether composition might be better than inheritance for your use case.

- **Test Subclasses:** Verify that subclasses properly implement all abstract methods.

## Source

[Python abc Module Documentation](https://docs.python.org/3/library/abc.html)

In this article, we have explored Python abstract classes and demonstrated their
usage in object-oriented design through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).