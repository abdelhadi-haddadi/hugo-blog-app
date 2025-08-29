+++
title = "Java Serializable Interface"
date = 2025-08-29T20:00:30.150+01:00
draft = false
description = "Complete Java Serializable tutorial with examples. Learn how to serialize and deserialize objects in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Serializable Interface

Last modified: April 26, 2025

 

The Serializable interface in Java enables objects to be converted
into a byte stream for storage or transmission. It requires no methods to be
implemented, acting as a marker interface.

Serialization is vital for persisting objects to files, databases, or sending
them over networks. Serializable facilitates saving and restoring
object states in various applications.

## Serializable Interface Overview

The Serializable interface, part of the java.io
package, is a marker interface that indicates a class is eligible for
serialization. A marker interface is a special type of interface that does not
contain any methods or fields but serves as a signal to the Java runtime about a
class's capabilities. When a class implements Serializable, its
objects can be converted into a byte stream using
ObjectOutputStream. This byte stream can then be saved to a file,
transmitted over a network, or used in other contexts where the object's state
needs to be preserved.

Deserialization is the reverse process, where a previously serialized byte
stream is read and reconstructed into an object using
ObjectInputStream. This allows objects to maintain their state and
structure across different executions or environments, enabling persistent
storage or data transfer.

When designing classes for serialization, several considerations must be taken
into account to ensure robust and secure behavior:

    *Versioning:* Serialized objects include a
    serialVersionUID, which is used to verify compatibility during
    deserialization. If the serialVersionUID of the class does not
    match that of the serialized object, an InvalidClassException
    will occur. Developers are encouraged to explicitly define the
    serialVersionUID to avoid compatibility issues when class
    definitions change.
    *Transient Fields:* Fields marked with the transient
    keyword are excluded from serialization. This is useful for sensitive data,
    like passwords, or fields that can be recomputed, such as cache values, to
    avoid unnecessary storage or security risks.
    *Custom Serialization Logic:* Classes can override the default
    serialization behavior by defining the writeObject and
    readObject methods. This is particularly useful for ensuring
    proper handling of non-serializable fields or adding extra validation during
    deserialization.
    *Security:* Deserialization can be a potential vector for
    vulnerabilities, such as code injection or object spoofing. Developers
    should validate input streams carefully and avoid deserializing data from
    untrusted sources.

Overall, the Serializable interface plays a crucial role in
enabling object persistence and inter-process communication. However, developers
must exercise caution and follow best practices to ensure efficient, secure, and
backward-compatible serialization in their applications.

## Basic Serialization and Deserialization

This example demonstrates basic serialization and deserialization of a simple
class implementing Serializable, saving and loading an object to a
file.

BasicSerialization.java
  

package com.zetcode;

import java.io.*;

public class BasicSerialization {

    static class Person implements Serializable {
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

    public static void main(String[] args) {
        // Serialize
        Person person = new Person("Alice", 30);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("person.ser"))) {
            oos.writeObject(person);
            System.out.println("Serialized: " + person);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("person.ser"))) {
            Person deserialized = (Person) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

This program defines a Person class implementing
Serializable. It serializes an instance to a file and then
deserializes it back.

The try-with-resources ensures streams are closed properly. The output confirms
that the deserialized object matches the original, demonstrating basic
serialization.

## Using Transient Fields

This example shows how to use the transient keyword to exclude
fields from serialization, useful for sensitive or non-serializable data.

TransientFields.java
  

package com.zetcode;

import java.io.*;

public class TransientFields {

    static class User implements Serializable {
        private String username;
        private transient String password;

        public User(String username, String password) {
            this.username = username;
            this.password = password;
        }

        @Override
        public String toString() {
            return "User{username='" + username + "', password='" + password + "'}";
        }
    }

    public static void main(String[] args) {
        // Serialize
        User user = new User("bob", "secret123");
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("user.ser"))) {
            oos.writeObject(user);
            System.out.println("Serialized: " + user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("user.ser"))) {
            User deserialized = (User) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

The User class marks the password field as
transient, excluding it from serialization. After deserialization,
the field is null.

This is useful for sensitive data like passwords or fields that cannot be
serialized, ensuring security and compatibility during object persistence.

## Serial Version UID

This example illustrates the use of serialVersionUID to manage
class versioning during serialization, preventing compatibility issues.

SerialVersionUID.java
  

package com.zetcode;

import java.io.*;

public class SerialVersionUID {

    static class Employee implements Serializable {
        @Serial
        private static final long serialVersionUID = 1L;
        private String name;
        private double salary;

        public Employee(String name, double salary) {
            this.name = name;
            this.salary = salary;
        }

        @Override
        public String toString() {
            return "Employee{name='" + name + "', salary=" + salary + "}";
        }
    }

    public static void main(String[] args) {

        // Serialize
        Employee emp = new Employee("Carol", 50000);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("employee.ser"))) {
            oos.writeObject(emp);
            System.out.println("Serialized: " + emp);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("employee.ser"))) {
            Employee deserialized = (Employee) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

The Employee class defines a serialVersionUID to
ensure compatibility across class versions. This prevents
InvalidClassException during deserialization.

Explicitly declaring serialVersionUID is a best practice for
maintaining serialization compatibility when class structures evolve over time.

## Custom Serialization

This example shows how to customize serialization by implementing
writeObject and readObject methods for special
handling of object state.

CustomSerialization.java
  

package com.zetcode;

import java.io.*;

public class CustomSerialization {

    static class Student implements Serializable {
        private String name;
        private transient int grade;

        public Student(String name, int grade) {
            this.name = name;
            this.grade = grade;
        }

        private void writeObject(ObjectOutputStream oos) throws IOException {
            oos.defaultWriteObject();
            oos.writeInt(grade + 10); // Custom logic: increment grade
        }

        private void readObject(ObjectInputStream ois) 
                throws IOException, ClassNotFoundException {
            ois.defaultReadObject();
            this.grade = ois.readInt();
        }

        @Override
        public String toString() {
            return "Student{name='" + name + "', grade=" + grade + "}";
        }
    }

    public static void main(String[] args) {
        // Serialize
        Student student = new Student("Dave", 85);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("student.ser"))) {
            oos.writeObject(student);
            System.out.println("Serialized: " + student);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("student.ser"))) {
            Student deserialized = (Student) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

The Student class customizes serialization by modifying the
grade field during serialization and deserialization, adding 10 to
its value.

Custom serialization is useful for transforming data, handling transient fields,
or ensuring compatibility with legacy systems during object persistence.

## Serializing Complex Objects

This example demonstrates serializing objects with references to other
serializable objects, showcasing how object graphs are handled in serialization.

ComplexSerialization.java
  

package com.zetcode;

import java.io.*;

public class ComplexSerialization {

    static class Department implements Serializable {
        private String name;

        public Department(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "Department{name='" + name + "'}";
        }
    }

    static class Worker implements Serializable {
        private String name;
        private Department department;

        public Worker(String name, Department department) {
            this.name = name;
            this.department = department;
        }

        @Override
        public String toString() {
            return "Worker{name='" + name + "', department=" + department + "}";
        }
    }

    public static void main(String[] args) {
        // Serialize
        Department dept = new Department("Engineering");
        Worker worker = new Worker("Eve", dept);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("worker.ser"))) {
            oos.writeObject(worker);
            System.out.println("Serialized: " + worker);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("worker.ser"))) {
            Worker deserialized = (Worker) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

The Worker class contains a reference to a Department
object. Both classes implement Serializable, allowing the entire
object graph to be serialized.

This shows how serialization handles complex relationships, automatically
serializing referenced objects, provided they are also serializable.

## Serialization with Externalizable

This example demonstrates the Externalizable interface, an
alternative to Serializable, offering complete control over
serialization.

ExternalizableExample.java
  

package com.zetcode;

import java.io.*;

public class ExternalizableExample {

    static class Product implements Externalizable {
        private String name;
        private double price;

        public Product() {} // Required for Externalizable

        public Product(String name, double price) {
            this.name = name;
            this.price = price;
        }

        @Override
        public void writeExternal(ObjectOutput out) throws IOException {
            out.writeUTF(name);
            out.writeDouble(price);
        }

        @Override
        public void readExternal(ObjectInput in) 
                throws IOException, ClassNotFoundException {
            this.name = in.readUTF();
            this.price = in.readDouble();
        }

        @Override
        public String toString() {
            return "Product{name='" + name + "', price=" + price + "}";
        }
    }

    public static void main(String[] args) {
        // Serialize
        Product product = new Product("Laptop", 999.99);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("product.ser"))) {
            oos.writeObject(product);
            System.out.println("Serialized: " + product);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Deserialize
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("product.ser"))) {
            Product deserialized = (Product) ois.readObject();
            System.out.println("Deserialized: " + deserialized);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

The Product class implements Externalizable,
defining custom serialization logic in writeExternal and
readExternal methods.

Externalizable offers more control than Serializable
but requires a no-arg constructor and explicit serialization logic, suitable for
optimized scenarios.

## Source

[Java Serializable Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/Serializable.html)

This tutorial thoroughly explores the Java Serializable
interface, covering basic serialization, transient fields, versioning, and
custom handling. It is essential for object persistence.

## Author

I am Jan Bodnar, a passionate programmer with extensive experience. Since 2007,
I have written over 1,400 articles and eight e-books. With over eight years of
teaching, I am dedicated to sharing knowledge and helping others learn
programming concepts.

List [all Java tutorials](/java/).