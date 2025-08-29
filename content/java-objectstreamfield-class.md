+++
title = "Java ObjectStreamField Class"
date = 2025-08-29T19:59:26.607+01:00
draft = false
description = "Complete Java ObjectStreamField class tutorial covering all methods with examples. Learn about serialization field descriptions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ObjectStreamField Class

Last modified: April 16, 2025

 

The java.io.ObjectStreamField class describes a serializable field
of a class. It is used in custom serialization to specify field names and types.
This class helps control the serialized form of objects.

ObjectStreamField is primarily used with ObjectStreamClass
to define serializable fields. It provides information about field names, types,
and whether they are primitive or object references. This enables precise control
over serialization.

## ObjectStreamField Class Overview

ObjectStreamField represents a serializable field with its name and
type. The class provides methods to inspect field characteristics. It's used when
implementing serialPersistentFields for custom serialization.

public class ObjectStreamField implements Comparable&lt;Object&gt; {
    public ObjectStreamField(String name, Class&lt;?&gt; type);
    public ObjectStreamField(String name, Class&lt;?&gt; type, boolean unshared);
    public String getName();
    public Class&lt;?&gt; getType();
    public char getTypeCode();
    public String getTypeString();
    public int getOffset();
    public boolean isPrimitive();
    public boolean isUnshared();
    public int compareTo(Object obj);
    public String toString();
}

The code above shows key methods of ObjectStreamField. These methods
allow inspection of field properties during serialization. The class implements
Comparable for ordering fields in serialized form.

## Creating ObjectStreamField Instances

ObjectStreamField instances are created to describe serializable fields. The
constructor takes field name and type parameters. An optional unshared flag
controls reference sharing during serialization.

Main.java
  

import java.io.ObjectStreamField;

public class Main {

    public static void main(String[] args) {
        // Create fields for different types
        ObjectStreamField intField = new ObjectStreamField("age", int.class);
        ObjectStreamField stringField = new ObjectStreamField("name", String.class);
        ObjectStreamField customField = new ObjectStreamField("data", byte[].class, true);
        
        System.out.println("Created fields:");
        System.out.println(intField);
        System.out.println(stringField);
        System.out.println(customField);
        
        // Verify field properties
        System.out.println("\nField types:");
        System.out.println("age is primitive: " + intField.isPrimitive());
        System.out.println("name is unshared: " + stringField.isUnshared());
        System.out.println("data type code: " + customField.getTypeCode());
    }
}

This example demonstrates creating different ObjectStreamField
instances. The first two fields are standard, while the third is marked as
unshared. The output shows field properties including type codes and primitive
status.

## Using ObjectStreamField in Serialization

ObjectStreamField is typically used in serialPersistentFields declarations. This
static array defines which fields are serialized and their order. It provides
control over serialized form.

Person.java
  

import java.io.ObjectStreamField;
import java.io.Serializable;

public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    
    // Transient field (not serialized by default)
    private transient String password;
    
    // Regular fields
    private String name;
    private int age;
    private double salary;
    
    // Define serializable fields explicitly
    private static final ObjectStreamField[] serialPersistentFields = {
        new ObjectStreamField("name", String.class),
        new ObjectStreamField("age", int.class),
        new ObjectStreamField("salary", double.class)
    };
    
    public Person(String name, int age, double salary, String password) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + 
               ", salary=" + salary + ", password='" + password + "'}";
    }
}

This example shows a Person class using ObjectStreamField
to define serializable fields. The password field is transient and
not included. The serialPersistentFields array controls exactly
which fields are serialized.

## Inspecting Field Properties

ObjectStreamField provides methods to inspect field characteristics. These include
type information, primitive status, and comparison capabilities. This is useful
for analyzing serialized forms.

Main.java
  

import java.io.ObjectStreamField;

public class Main {

    public static void main(String[] args) {
        ObjectStreamField[] fields = {
            new ObjectStreamField("id", long.class),
            new ObjectStreamField("active", boolean.class),
            new ObjectStreamField("title", String.class),
            new ObjectStreamField("data", Object.class, true)
        };
        
        System.out.println("Field inspection:");
        for (ObjectStreamField field : fields) {
            System.out.println("\nField: " + field.getName());
            System.out.println("Type: " + field.getType().getSimpleName());
            System.out.println("Type code: " + field.getTypeCode());
            System.out.println("Primitive: " + field.isPrimitive());
            System.out.println("Unshared: " + field.isUnshared());
        }
        
        // Compare fields
        System.out.println("\nComparison:");
        System.out.println("id vs title: " + fields[0].compareTo(fields[2]));
    }
}

This example demonstrates inspecting various properties of ObjectStreamField
instances. It shows type codes, primitive status, and unshared flags. The
compareTo method shows how fields are ordered during serialization.

## Custom Serialization with ObjectStreamField

ObjectStreamField enables custom serialization by defining field metadata. Combined
with writeObject and readObject, it provides complete
control. This example shows a complete implementation.

Account.java
  

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectStreamField;
import java.io.Serializable;

public class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String accountNumber;
    private double balance;
    private transient String secretToken;
    
    private static final ObjectStreamField[] serialPersistentFields = {
        new ObjectStreamField("accountNumber", String.class),
        new ObjectStreamField("balance", double.class)
    };
    
    public Account(String accountNumber, double balance, String secretToken) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.secretToken = secretToken;
    }
    
    private void writeObject(ObjectOutputStream oos) throws IOException {
        ObjectOutputStream.PutField fields = oos.putFields();
        fields.put("accountNumber", accountNumber);
        fields.put("balance", balance);
        oos.writeFields();
    }
    
    private void readObject(ObjectInputStream ois) 
            throws IOException, ClassNotFoundException {
        ObjectInputStream.GetField fields = ois.readFields();
        accountNumber = (String) fields.get("accountNumber", null);
        balance = fields.get("balance", 0.0);
        secretToken = "REGENERATED"; // Recreate transient field
    }
    
    @Override
    public String toString() {
        return "Account{number='" + accountNumber + "', balance=" + balance + 
               ", token='" + secretToken + "'}";
    }
}

This complete example shows custom serialization using ObjectStreamField.
The secretToken is transient and handled specially. The
writeObject and readObject methods use the defined
fields for precise control over serialization.

## Comparing ObjectStreamField Instances

ObjectStreamField implements Comparable to define field ordering.
Fields are compared by name, with primitive types sorted before object types.
This affects serialization order.

Main.java
  

import java.io.ObjectStreamField;

public class Main {

    public static void main(String[] args) {
        ObjectStreamField[] fields = {
            new ObjectStreamField("zField", String.class),
            new ObjectStreamField("aField", int.class),
            new ObjectStreamField("id", long.class),
            new ObjectStreamField("count", Integer.class)
        };
        
        System.out.println("Original order:");
        for (ObjectStreamField field : fields) {
            System.out.println(field.getName() + " (" + field.getTypeCode() + ")");
        }
        
        // Sort fields using natural ordering
        java.util.Arrays.sort(fields);
        
        System.out.println("\nSorted order:");
        for (ObjectStreamField field : fields) {
            System.out.println(field.getName() + " (" + field.getTypeCode() + ")");
        }
        
        // Compare individual fields
        System.out.println("\nComparison results:");
        System.out.println("aField vs zField: " + fields[0].compareTo(fields[2]));
        System.out.println("id vs count: " + fields[1].compareTo(fields[3]));
    }
}

This example demonstrates the natural ordering of ObjectStreamField
instances. Primitive fields sort before object fields, and fields are ordered
alphabetically within these groups. The output shows the sorted order and
comparison results.

## Working with Type Strings

ObjectStreamField provides type string representations for complex types. These
strings follow JVM type signature format. They are useful for analyzing generic
or array types.

Main.java
  

import java.io.ObjectStreamField;
import java.util.List;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        ObjectStreamField[] fields = {
            new ObjectStreamField("names", String[].class),
            new ObjectStreamField("scores", int[].class),
            new ObjectStreamField("map", Map.class),
            new ObjectStreamField("list", List.class)
        };
        
        System.out.println("Type strings for fields:");
        for (ObjectStreamField field : fields) {
            System.out.println(field.getName() + ": " + field.getTypeString());
        }
        
        // Compare with type codes
        System.out.println("\nType codes vs type strings:");
        for (ObjectStreamField field : fields) {
            System.out.println(field.getName() + 
                " - Code: " + field.getTypeCode() + 
                ", String: " + field.getTypeString());
        }
    }
}

This example shows type string representations for various field types. Arrays
and object types have different string formats. The output compares these with
their corresponding type codes. Type strings provide more detailed type
information than type codes alone.

## Source

[Java ObjectStreamField Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/ObjectStreamField.html)

In this article, we've covered the essential methods and features of the Java
ObjectStreamField class. Understanding these concepts is crucial for working
with custom serialization in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).