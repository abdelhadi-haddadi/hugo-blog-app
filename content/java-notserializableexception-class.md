+++
title = "Java NotSerializableException Class"
date = 2025-08-29T19:59:23.245+01:00
draft = false
description = "Complete Java NotSerializableException class tutorial covering all scenarios with examples. Learn about Java object serialization issues."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java NotSerializableException Class

Last modified: April 16, 2025

 

The java.io.NotSerializableException is thrown when an instance is
required to have a Serializable interface but doesn't. It's part of Java's
object serialization mechanism. Serialization converts objects to byte streams.

This exception typically occurs during serialization attempts on non-serializable
objects. The Java serialization mechanism checks for the Serializable
interface. Without it, this exception is thrown to prevent invalid serialization.

## NotSerializableException Class Overview

NotSerializableException extends ObjectStreamException
and indicates serialization problems. The exception message names the problematic
class. It's a checked exception, requiring explicit handling in code.

public class NotSerializableException extends ObjectStreamException {
    public NotSerializableException(String classname);
    public NotSerializableException();
}

The code above shows the NotSerializableException class structure.
The parameterized constructor accepts the non-serializable class name. The
default constructor creates an exception without specific class information.

## Basic Serialization Example

This example demonstrates proper serialization before showing failure cases. A
class must implement Serializable to be serialized. The example
shows successful serialization of a properly configured class.

Main.java
  

import java.io.*;

class Person implements Serializable {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person("John Doe", 30);
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            oos.writeObject(person);
            System.out.println("Person serialized successfully");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows successful serialization of a Person class. The
class implements Serializable, allowing object serialization. The
ObjectOutputStream writes the object to a file without errors.

## Non-Serializable Class Example

This example demonstrates the NotSerializableException when trying
to serialize a class without implementing Serializable. The exception
clearly indicates which class caused the problem.

Main.java
  

import java.io.*;

class Product {  // Doesn't implement Serializable
    private String name;
    private double price;
    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class Main {
    public static void main(String[] args) {
        Product product = new Product("Laptop", 999.99);
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("product.ser"))) {
            oos.writeObject(product);  // This will throw NotSerializableException
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

Running this code throws NotSerializableException because Product
doesn't implement Serializable. The exception stack trace will
include the class name (Product) in its message. This helps identify
the problematic class during debugging.

## Non-Serializable Field Example

Even when a class implements Serializable, it can fail if it
contains non-serializable fields. This example shows such a scenario where a
serializable class contains a non-serializable field.

Main.java
  

import java.io.*;

class Engine {}  // Not serializable

class Car implements Serializable {
    private String model;
    private Engine engine;  // Non-serializable field
    
    public Car(String model, Engine engine) {
        this.model = model;
        this.engine = engine;
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("Sedan", new Engine());
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("car.ser"))) {
            oos.writeObject(car);  // Fails due to Engine field
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example throws NotSerializableException because Car
contains a non-serializable Engine field. All fields must be either
serializable or marked as transient. The exception message will
specify Engine as the problematic class.

## Transient Field Solution

The transient keyword marks fields that shouldn't be serialized.
This example modifies the previous one by making the engine field transient.
The serialization now succeeds, skipping the engine field.

Main.java
  

import java.io.*;

class Engine {}  // Still not serializable

class Car implements Serializable {
    private String model;
    private transient Engine engine;  // Marked as transient
    
    public Car(String model, Engine engine) {
        this.model = model;
        this.engine = engine;
    }
    
    public Engine getEngine() { return engine; }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("Sedan", new Engine());
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("car.ser"))) {
            oos.writeObject(car);
            System.out.println("Car serialized successfully (engine skipped)");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example successfully serializes the Car object because the
engine field is marked transient. The engine field
will be null after deserialization. This approach works when the
field doesn't need to be persisted or can be reconstructed.

## Custom Serialization Solution

For more control, classes can implement custom serialization using
writeObject and readObject methods. This example
shows how to handle non-serializable fields with custom serialization.

Main.java
  

import java.io.*;

class Engine {
    private String type;
    
    public Engine(String type) { this.type = type; }
    public String getType() { return type; }
}

class Car implements Serializable {
    private String model;
    private transient Engine engine;
    
    public Car(String model, Engine engine) {
        this.model = model;
        this.engine = engine;
    }
    
    private void writeObject(ObjectOutputStream oos) throws IOException {
        oos.defaultWriteObject();
        oos.writeObject(engine.getType());  // Serialize engine data
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        String engineType = (String) ois.readObject();
        this.engine = new Engine(engineType);  // Reconstruct engine
    }
    
    public Engine getEngine() { return engine; }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("SUV", new Engine("V6"));
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("car.ser"))) {
            oos.writeObject(car);
            System.out.println("Car with custom serialization saved");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates custom serialization for a class with non-serializable
fields. The writeObject method saves the engine's type string. The
readObject method reconstructs the engine during deserialization.
This approach provides complete control over serialization.

## Inheritance and Serialization

Serialization in class hierarchies requires attention. If a superclass isn't
serializable, its fields won't be serialized. This example shows the behavior
when extending non-serializable classes.

Main.java
  

import java.io.*;

class Vehicle {  // Not serializable
    protected String type;
    
    public Vehicle(String type) { this.type = type; }
}

class Truck extends Vehicle implements Serializable {
    private int capacity;
    
    public Truck(String type, int capacity) {
        super(type);
        this.capacity = capacity;
    }
    
    @Override
    public String toString() {
        return "Truck{type='" + type + "', capacity=" + capacity + "}";
    }
}

public class Main {
    public static void main(String[] args) {
        Truck truck = new Truck("Heavy", 5000);
        
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("truck.ser"))) {
            oos.writeObject(truck);
            System.out.println("Truck serialized (but not Vehicle fields)");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows serialization with inheritance. The Truck class
is serializable, but its Vehicle superclass isn't. The type
field won't be serialized and will be null after deserialization.
To include superclass fields, the superclass must also implement Serializable.

## Source

[Java NotSerializableException Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/NotSerializableException.html)

This tutorial covered the NotSerializableException in Java
serialization. We explored causes, solutions, and best practices for handling
serialization issues. Understanding these concepts is crucial for effective
object persistence in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).