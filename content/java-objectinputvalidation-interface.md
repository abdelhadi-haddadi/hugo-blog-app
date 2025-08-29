+++
title = "Java ObjectInputValidation Interface"
date = 2025-08-29T19:59:24.344+01:00
draft = false
description = "Complete Java ObjectInputValidation interface tutorial covering all methods with examples. Learn about object validation during deserialization in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectInputValidation Interface

Last modified: April 16, 2025

 

The java.io.ObjectInputValidation interface provides a callback
mechanism for validating objects during deserialization. It allows objects to
perform validation after the entire object graph has been reconstructed but
before the deserialization process completes.

Implementing this interface enables objects to check their state validity after
deserialization. The validation occurs when ObjectInputStream.registerValidation
is called. This is particularly useful for maintaining object invariants.

## ObjectInputValidation Interface Overview

The interface contains a single method validateObject that must
be implemented. This method is called by the serialization mechanism to perform
validation. If validation fails, it should throw an InvalidObjectException.

public interface ObjectInputValidation {
    void validateObject() throws InvalidObjectException;
}

The code above shows the simple structure of the ObjectInputValidation
interface. Classes implement this interface to add validation logic that executes
after deserialization completes but before the object is returned to the caller.

## Basic Validation Example

This example demonstrates a simple implementation of ObjectInputValidation.
We create a Person class that validates its age field after
deserialization. The validation ensures the age is within a reasonable range.

Person.java
  

import java.io.*;
import java.util.Objects;

public class Person implements Serializable, ObjectInputValidation {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = Objects.requireNonNull(name);
        this.age = age;
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        ois.registerValidation(this, 0); // Register for validation
    }
    
    @Override
    public void validateObject() throws InvalidObjectException {
        if (age &lt; 0 || age &gt; 150) {
            throw new InvalidObjectException("Invalid age: " + age);
        }
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidObjectException("Name cannot be empty");
        }
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

The Person class implements both Serializable and
ObjectInputValidation. The readObject method registers
the validation callback. The validateObject method checks age and
name validity. If invalid, it throws InvalidObjectException.

## Complex Object Graph Validation

This example shows validation in a more complex object graph with relationships.
We create Department and Employee classes where the
department validates its employee list after deserialization.

Department.java
  

import java.io.*;
import java.util.*;

public class Department implements Serializable, ObjectInputValidation {
    private String name;
    private List&lt;Employee&gt; employees = new ArrayList&lt;&gt;();
    
    public Department(String name) {
        this.name = Objects.requireNonNull(name);
    }
    
    public void addEmployee(Employee emp) {
        employees.add(Objects.requireNonNull(emp));
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        ois.registerValidation(this, 0);
    }
    
    @Override
    public void validateObject() throws InvalidObjectException {
        if (name == null || name.trim().isEmpty()) {
            throw new InvalidObjectException("Department name is invalid");
        }
        if (employees.isEmpty()) {
            throw new InvalidObjectException("Department must have employees");
        }
        for (Employee emp : employees) {
            if (emp.getDepartment() != this) {
                throw new InvalidObjectException("Employee department mismatch");
            }
        }
    }
    
    // Getters and toString omitted for brevity
}

Employee.java
  

```
import java.io.*;

public class Employee implements Serializable {
    private String name;
    private Department department;
    
    public Employee(String name, Department department) {
        this.name = Objects.requireNonNull(name);
        this.department = Objects.requireNonNull(department);
        department.addEmployee(this);
    }
    
    public Department getDepartment() {
        return department;
    }
    
    // Other methods omitted
}

```

This example demonstrates validation of object relationships. The Department
validates that it has employees and that each employee references back to it.
The validation occurs after the entire object graph is deserialized. This ensures
all references are properly established before validation.

## Priority-Based Validation

This example shows how to use the priority parameter in registerValidation.
Higher priority validators run before lower priority ones. We create a system
where component validation occurs before system validation.

SystemComponent.java
  

import java.io.*;
import java.util.*;

public class SystemComponent implements Serializable, ObjectInputValidation {
    private String id;
    private SystemConfiguration config;
    
    public SystemComponent(String id, SystemConfiguration config) {
        this.id = Objects.requireNonNull(id);
        this.config = Objects.requireNonNull(config);
        config.addComponent(this);
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        // Register with high priority (1)
        ois.registerValidation(this, 1);
    }
    
    @Override
    public void validateObject() throws InvalidObjectException {
        System.out.println("Validating component " + id);
        if (id.trim().isEmpty()) {
            throw new InvalidObjectException("Component ID cannot be empty");
        }
    }
}

SystemConfiguration.java
  

```
import java.io.*;
import java.util.*;

public class SystemConfiguration implements Serializable, ObjectInputValidation {
    private List&lt;SystemComponent&gt; components = new ArrayList&lt;&gt;();
    
    public void addComponent(SystemComponent component) {
        components.add(component);
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ois.defaultReadObject();
        // Register with lower priority (0)
        ois.registerValidation(this, 0);
    }
    
    @Override
    public void validateObject() throws InvalidObjectException {
        System.out.println("Validating system configuration");
        if (components.isEmpty()) {
            throw new InvalidObjectException("No components in system");
        }
        // Additional validation logic
    }
}

```

In this example, components validate before the system configuration due to their
higher priority (1 vs 0). This ensures component-level validation completes before
system-level validation begins. The priority parameter controls validation order.

## Source

[Java ObjectInputValidation Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectInputValidation.html)

In this article, we've covered the essential concepts and features of the Java
ObjectInputValidation interface. Understanding this mechanism is crucial for
implementing robust deserialization validation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).