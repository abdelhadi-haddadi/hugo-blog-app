+++
title = "Java ObjectStreamClass Class"
date = 2025-08-29T19:59:25.464+01:00
draft = false
description = "Complete Java ObjectStreamClass class tutorial covering all methods with examples. Learn about serialization metadata in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectStreamClass Class

Last modified: April 16, 2025

 

The java.io.ObjectStreamClass class provides serialization metadata
about classes. It contains the name and serialVersionUID of serializable classes.
This class is used internally by Java's serialization mechanism.

ObjectStreamClass describes classes that are serialized or
deserialized. It acts as a serialization descriptor, holding class name, fields,
and version information. The class is primarily used by ObjectInputStream and
ObjectOutputStream.

## ObjectStreamClass Class Overview

ObjectStreamClass provides information about serializable classes.
Key methods include getting class name, serialVersionUID, and field descriptors.
The class cannot be instantiated directly by applications.

public class ObjectStreamClass implements Serializable {
    public static ObjectStreamClass lookup(Class cl);
    public static ObjectStreamClass lookupAny(Class cl);
    public String getName();
    public long getSerialVersionUID();
    public Class forClass();
    public ObjectStreamField[] getFields();
    public ObjectStreamField getField(String name);
    public String toString();
}

The code above shows key methods provided by ObjectStreamClass.
These methods allow inspection of serialization metadata. The lookup methods are
used to obtain instances of ObjectStreamClass for specific classes.

## Getting ObjectStreamClass for a Class

The lookup method is the primary way to obtain an ObjectStreamClass
instance. It returns the descriptor for a serializable class or null for
non-serializable classes. The lookupAny method works similarly but
doesn't check serializability.

Main.java
  

import java.io.ObjectStreamClass;
import java.io.Serializable;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
}

public class Main {
    public static void main(String[] args) {
        // Get ObjectStreamClass for serializable class
        ObjectStreamClass osc = ObjectStreamClass.lookup(Person.class);
        System.out.println("Class name: " + osc.getName());
        System.out.println("SerialVersionUID: " + osc.getSerialVersionUID());
        
        // Try with non-serializable class
        ObjectStreamClass osc2 = ObjectStreamClass.lookup(String.class);
        System.out.println("String class serializable? " + (osc2 != null));
    }
}

This example demonstrates getting ObjectStreamClass for a serializable class.
The Person class implements Serializable and has a serialVersionUID. The lookup
method returns null for String class which doesn't implement Serializable.

## Inspecting Serialization Metadata

ObjectStreamClass provides methods to inspect serialization metadata. The
getFields method returns all serializable fields. The
getField method retrieves a specific field by name.

Main.java
  

import java.io.ObjectStreamClass;
import java.io.Serializable;

class Employee implements Serializable {
    private static final long serialVersionUID = 2L;
    private String id;
    private transient String password;
    public String department;
}

public class Main {
    public static void main(String[] args) {
        ObjectStreamClass osc = ObjectStreamClass.lookup(Employee.class);
        
        System.out.println("Class: " + osc.getName());
        System.out.println("SUID: " + osc.getSerialVersionUID());
        
        // Get all serializable fields
        ObjectStreamField[] fields = osc.getFields();
        System.out.println("\nSerializable fields:");
        for (ObjectStreamField field : fields) {
            System.out.println(field.getName() + " - " + field.getType());
        }
        
        // Get specific field
        ObjectStreamField deptField = osc.getField("department");
        System.out.println("\nDepartment field type: " + deptField.getType());
    }
}

This example shows how to inspect serialization metadata. The Employee class has
three fields, but only two are serializable (transient fields are excluded). The
getFields method returns only serializable fields including public ones.

## Comparing SerialVersionUID Values

The serialVersionUID is crucial for version compatibility in serialization.
ObjectStreamClass can help verify if the runtime class matches the serialized
version. Mismatched UIDs cause InvalidClassException during deserialization.

Main.java
  

import java.io.ObjectStreamClass;
import java.io.Serializable;

class Product implements Serializable {
    private static final long serialVersionUID = 12345L;
    private String name;
    private double price;
}

class ModifiedProduct implements Serializable {
    private static final long serialVersionUID = 67890L;
    private String name;
    private double price;
    private String category; // Added field
}

public class Main {
    public static void main(String[] args) {
        ObjectStreamClass original = ObjectStreamClass.lookup(Product.class);
        ObjectStreamClass modified = ObjectStreamClass.lookup(ModifiedProduct.class);
        
        System.out.println("Original SUID: " + original.getSerialVersionUID());
        System.out.println("Modified SUID: " + modified.getSerialVersionUID());
        
        if (original.getSerialVersionUID() == modified.getSerialVersionUID()) {
            System.out.println("Classes are compatible");
        } else {
            System.out.println("Classes are incompatible - UIDs differ");
        }
    }
}

This example demonstrates checking serialVersionUID compatibility. The Product and
ModifiedProduct classes have different UIDs due to structural changes. During
deserialization, this mismatch would cause an InvalidClassException.

## Working with Arrays

ObjectStreamClass can also describe array classes. The class name follows the JVM
array type naming convention. Arrays are always serializable regardless of their
component type.

Main.java
  

import java.io.ObjectStreamClass;

public class Main {
    public static void main(String[] args) {
        // Get ObjectStreamClass for various array types
        ObjectStreamClass intArray = ObjectStreamClass.lookup(int[].class);
        ObjectStreamClass stringArray = ObjectStreamClass.lookup(String[].class);
        ObjectStreamClass multiArray = ObjectStreamClass.lookup(int[][].class);
        
        System.out.println("int[] class: " + intArray.getName());
        System.out.println("String[] class: " + stringArray.getName());
        System.out.println("int[][] class: " + multiArray.getName());
        
        // Arrays are always serializable
        System.out.println("\nIs int[] serializable? " + (intArray != null));
        System.out.println("Is String[] serializable? " + (stringArray != null));
    }
}

This example shows how ObjectStreamClass works with arrays. All array types are
serializable, even if their component types aren't. The class names use JVM
notation (e.g., "[I" for int[], "[[I" for int[][], "[Ljava.lang.String;" for
String[]).

## Using lookupAny for Non-Serializable Classes

The lookupAny method returns ObjectStreamClass for any class,
including non-serializable ones. This can be useful for examining class
structure regardless of serializability.

Main.java
  

import java.io.ObjectStreamClass;
import java.util.Date;

class NonSerializable {
    private int value;
    public String info;
}

public class Main {
    public static void main(String[] args) {
        // Using lookup (returns null for non-serializable)
        ObjectStreamClass osc1 = ObjectStreamClass.lookup(NonSerializable.class);
        System.out.println("lookup result: " + osc1);
        
        // Using lookupAny (works for any class)
        ObjectStreamClass osc2 = ObjectStreamClass.lookupAny(NonSerializable.class);
        System.out.println("\nClass from lookupAny: " + osc2.getName());
        System.out.println("SUID: " + osc2.getSerialVersionUID());
        
        // Works with serializable classes too
        ObjectStreamClass osc3 = ObjectStreamClass.lookupAny(Date.class);
        System.out.println("\nDate class: " + osc3.getName());
    }
}

This example demonstrates the difference between lookup and lookupAny. The
NonSerializable class isn't serializable, so lookup returns null. lookupAny
returns an ObjectStreamClass for any class, allowing inspection of its fields
and computed serialVersionUID.

## Examining Field Descriptors

ObjectStreamField objects provide detailed information about serializable fields.
They include field name, type, and whether the field is primitive or not. This
metadata is useful for analyzing serialized data structure.

Main.java
  

import java.io.ObjectStreamClass;
import java.io.ObjectStreamField;
import java.io.Serializable;

class InventoryItem implements Serializable {
    private static final long serialVersionUID = 1L;
    private String sku;
    private int quantity;
    private double price;
    private transient String location;
}

public class Main {
    public static void main(String[] args) {
        ObjectStreamClass osc = ObjectStreamClass.lookup(InventoryItem.class);
        ObjectStreamField[] fields = osc.getFields();
        
        System.out.println("Serializable fields in InventoryItem:");
        for (ObjectStreamField field : fields) {
            System.out.println("\nField: " + field.getName());
            System.out.println("Type: " + field.getType());
            System.out.println("Type code: " + field.getTypeCode());
            System.out.println("Is primitive: " + field.isPrimitive());
            System.out.println("Is unshared: " + field.isUnshared());
        }
    }
}

This example examines field descriptors of the InventoryItem class. The transient
location field is excluded from serialization. Each ObjectStreamField provides
type information and other metadata about serializable fields.

## Source

[Java ObjectStreamClass Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectStreamClass.html)

In this article, we've covered the essential methods and features of the Java
ObjectStreamClass class. Understanding these concepts is crucial for working
with Java's serialization mechanism and versioning of serialized objects.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).