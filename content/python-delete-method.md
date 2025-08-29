+++
title = "Python __delete__ Method"
date = 2025-08-29T20:08:06.069+01:00
draft = false
description = "Complete guide to Python's __delete__ method covering descriptors, attribute deletion, and property management."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __delete__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __delete__ method, the
special method that controls attribute deletion. We'll cover descriptors,
properties, and practical examples of attribute management.

## Basic Definitions

The __delete__ method is part of Python's descriptor protocol. It
is called when an attribute is deleted using the del statement.

Key characteristics: it's defined in a descriptor class, takes the instance as
an argument (conventionally named instance), and controls what
happens when an attribute is deleted. It works with __get__ and
__set__ for complete attribute management.

## Basic Descriptor with __delete__

Here's a simple descriptor implementation showing __delete__ in
action. The method is called when the managed attribute is deleted.

basic_delete.py
  

class LoggedDelete:
    def __get__(self, instance, owner):
        print("Getting value")
        return instance._value
    
    def __set__(self, instance, value):
        print("Setting value")
        instance._value = value
    
    def __delete__(self, instance):
        print("Deleting value")
        del instance._value

class MyClass:
    attr = LoggedDelete()

obj = MyClass()
obj.attr = 42  # Calls __set__
val = obj.attr  # Calls __get__
del obj.attr    # Calls __delete__

This example demonstrates the full descriptor protocol. When we delete
obj.attr, Python calls the __delete__ method.

The LoggedDelete descriptor logs all operations and manages the
actual value storage in the instance's _value attribute.

## Preventing Attribute Deletion

__delete__ can be used to prevent attribute deletion by raising an
exception when deletion is attempted.

prevent_delete.py
  

class ImmutableAttribute:
    def __get__(self, instance, owner):
        return instance._protected_value
    
    def __set__(self, instance, value):
        instance._protected_value = value
    
    def __delete__(self, instance):
        raise AttributeError("Cannot delete immutable attribute")

class Config:
    setting = ImmutableAttribute()

config = Config()
config.setting = "production"
print(config.setting)
# del config.setting  # Raises AttributeError

This implementation makes an attribute effectively immutable after creation.
Attempting to delete setting raises an AttributeError.

The actual value is stored in _protected_value, while the public
interface controls access through the descriptor protocol.

## Property-like Deletion Control

The property decorator can also use __delete__ through
its deleter method. Here's how to implement similar functionality.

property_delete.py
  

class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        self._celsius = value
    
    @celsius.deleter
    def celsius(self):
        print("Resetting temperature")
        self._celsius = 0

temp = Temperature(25)
print(temp.celsius)  # 25
del temp.celsius     # Calls deleter
print(temp.celsius)  # 0

This example shows the property-based approach to attribute deletion control.
The @celsius.deleter defines what happens when the attribute is
deleted.

Instead of completely removing the attribute, this implementation resets the
temperature to 0 when deletion is attempted.

## Database-backed Attribute Deletion

__delete__ can integrate with external systems like databases to
handle attribute deletion as a persistent operation.

database_delete.py
  

class DatabaseField:
    def __init__(self, field_name):
        self.field_name = field_name
    
    def __get__(self, instance, owner):
        # In a real implementation, this would query the database
        return instance._data.get(self.field_name)
    
    def __set__(self, instance, value):
        # This would update the database
        instance._data[self.field_name] = value
    
    def __delete__(self, instance):
        # This would delete from the database
        print(f"Deleting {self.field_name} from database")
        instance._data.pop(self.field_name, None)

class User:
    name = DatabaseField('username')
    
    def __init__(self):
        self._data = {}  # Simulating database storage

user = User()
user.name = "Alice"
print(user.name)  # Alice
del user.name     # Calls __delete__
print(user.name)  # None

This simplified example shows how __delete__ might work in an ORM.
The actual database operations are simulated with a dictionary.

In a real implementation, __delete__ would execute a DELETE
operation in the database when an attribute is removed.

## Lazy Resource Cleanup

__delete__ can manage resource cleanup when an attribute is deleted,
ensuring proper release of system resources.

resource_delete.py
  

class ManagedFile:
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return open(self.filename, 'r').read()
    
    def __set__(self, instance, value):
        with open(self.filename, 'w') as f:
            f.write(value)
    
    def __delete__(self, instance):
        print(f"Cleaning up {self.filename}")
        try:
            import os
            os.remove(self.filename)
        except FileNotFoundError:
            pass

class Document:
    content = ManagedFile()
    
    def __init__(self, filename):
        self.filename = filename

doc = Document("test.txt")
doc.content = "Hello World"
print(doc.content)
del doc.content  # Deletes the file

This example shows __delete__ handling file cleanup when the
attribute is deleted. The file is removed from the filesystem.

The ManagedFile descriptor handles both file operations and cleanup,
demonstrating how __delete__ can manage resource lifecycle.

## Best Practices

- **Use with descriptors:** __delete__ works best as part of descriptor protocol

- **Document behavior:** Clearly document what deletion actually does

- **Consider side effects:** Deletion might do more than just remove an attribute

- **Handle missing attributes:** Decide whether to raise or ignore missing attributes

- **Pair with __slots__:** Useful when combining with __slots__ for memory control

## Source References

- [Python __delete__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__delete__)

- [Python Descriptor HowTo Guide](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).