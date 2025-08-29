+++
title = "Java Object Class"
date = 2025-08-29T19:59:51.554+01:00
draft = false
description = "Complete Java Object class tutorial covering all methods with examples. Learn about hashCode, equals, toString, clone and other Object class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Object Class

Last modified: April 13, 2025

 

The java.lang.Object class stands as the cornerstone of the Java
type system, serving as the ultimate superclass for all other classes within the
Java language. Whether explicitly stated with an extends Object
clause or implicitly inherited (which is the default for classes that do not
extend another class), every class in Java is a descendant of
Object. 

This universal parentage means that all objects in Java,
regardless of their specific type, inherit a common set of methods from
Object. A thorough understanding of these inherited methods and the
role of the Object class is therefore fundamental for any Java
developer, as it underpins core concepts like polymorphism, object identity, and
basic object operations. These methods provide a baseline functionality that
ensures all objects can, for example, be represented as a string or compared for
equality, forming a common language for object interaction.

The Object class is not just a placeholder at the top of the
hierarchy; it introduces a suite of crucial methods that are automatically
inherited by every class you create or use in Java. These methods are designed
to facilitate fundamental operations that are broadly applicable across all
types of objects. Key among these are mechanisms for comparing objects
(equals), generating a numerical identifier for an object
(hashCode), creating a textual representation of an object
(toString), and producing a copy of an object (clone).

When you define a new class, you have the option to override these inherited
methods to provide behavior that is specific and meaningful to your class's
domain. For instance, a custom equals method can define what it
means for two instances of your class to be logically equivalent, which is often
more nuanced than the default reference equality check. Properly implementing
these overrides is critical for ensuring that your custom classes integrate
seamlessly and behave predictably, particularly when they are used within Java's
rich collection framework (e.g., HashMap, ArrayList),
or when involved in debugging and logging activities where a clear string
representation is invaluable.

## Core Methods of the Object Class

The Object class furnishes a set of universally applicable methods
that form the basic toolkit for object manipulation in Java. Subclasses are
encouraged to override these methods to tailor their behavior to the specific
semantics of the class. The most significant of these methods include:

    - toString - Returns a string representation of the object, typically used for debugging.

    - equals(Object obj) - Determines whether two objects are considered equal.

    - hashCode - Generates a hash code for the object, crucial for hash-based collections.

    - clone - Creates and returns a copy of the object, provided the class implements Cloneable.

    - getClass - Returns the runtime class of the object, useful for reflection.

These methods play a pivotal role in object-oriented programming, helping
developers enforce correct behavior in custom classes, optimize performance in
collections, and support debugging and reflection. Understanding their
implementation and best practices for overriding them is fundamental for writing
reliable and efficient Java code.

## toString Method

The toString method returns a string representation of the object.
By default, it returns the class name followed by '@' and the object's hash code.
This method is often overridden to provide more meaningful information.

Main.java
  

package com.zetcode;

class Person {

    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "Person[name=" + name + ", age=" + age + "]";
    }
}

public class Main {

    public static void main(String[] args) {

        Person person = new Person("John Doe", 30);
        System.out.println(person.toString());
        System.out.println(person); // println automatically calls toString
    }
}

In this example, we override the toString method in the Person
class to return a meaningful string representation. When we print the object,
this custom string is displayed instead of the default implementation. The Person
class has two private fields, name and age, which are initialized
through the constructor. The overridden toString method formats these
fields into a human-readable string: "Person[name=..., age=...]".
The main method demonstrates this by creating a Person object
and printing it. Notably, System.out.println(person) implicitly calls
person.toString, showcasing the convenience of this override.

## equals Method

The equals method compares two objects for equality. The default
implementation simply checks if two references point to the same object.
For meaningful comparison, this method should be overridden.

Main.java
  

package com.zetcode;

class Book {

    private String title;
    private String author;
    
    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Book book = (Book) obj;
        return title.equals(book.title) &amp;&amp; author.equals(book.author);
    }
}

public class Main {

    public static void main(String[] args) {

        Book book1 = new Book("Java Basics", "John Smith");
        Book book2 = new Book("Java Basics", "John Smith");
        Book book3 = new Book("Advanced Java", "Jane Doe");
        
        System.out.println("book1 equals book2: " + book1.equals(book2));
        System.out.println("book1 equals book3: " + book1.equals(book3));
    }
}

This example demonstrates how to properly override the equals
method. We compare Book objects based on their title and author fields rather
than memory addresses. The method first checks for reference equality
(this == obj), then for null or different class types 
(obj == null || getClass() != obj.getClass). If these checks pass, it casts the
obj to a Book and then compares the title
and author fields using their respective equals
methods. 

This ensures that two Book instances are considered equal if their
content (title and author) is the same, which is a more logical comparison for
value objects. The main method creates three Book
objects and shows that book1 and book2 (with identical
titles and authors) are equal, while book1 and book3
(with different titles/authors) are not.

## hashCode Method

The hashCode method returns an integer hash code value for the
object. This method must be overridden whenever equals is
overridden to maintain the general contract that equal objects must have equal
hash codes.

Main.java
  

package com.zetcode;

class Student {
    private int id;
    private String name;
    
    public Student(int id, String name) {
        this.id = id;
        this.name = name;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Student student = (Student) obj;
        return id == student.id &amp;&amp; name.equals(student.name);
    }
    
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + id;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}

public class Main {

    public static void main(String[] args) {

        Student s1 = new Student(101, "Alice");
        Student s2 = new Student(101, "Alice");
        
        System.out.println("s1 hash: " + s1.hashCode());
        System.out.println("s2 hash: " + s2.hashCode());
        System.out.println("Equal objects same hash? " + 
                          (s1.hashCode() == s2.hashCode()));
    }
}

This example shows a proper implementation of hashCode that
matches our equals implementation. We use a common algorithm that
combines hash codes of individual fields using prime numbers to reduce
collisions. The Student class overrides both equals (to compare
id and name) and hashCode. The hashCode
implementation starts with a non-zero prime number (17), then for each significant
field (id and name), it multiplies the current result by another
prime number (31) and adds the hash code of the field.

For the name field, it checks for null before calling
hashCode to prevent NullPointerException. This ensures
that if two Student objects are equal according to the
equals method, they will also have the same hash code, which is crucial
for consistent behavior in hash-based collections like HashMap or HashSet.
The main method verifies this by showing that two equal Student
objects (s1 and s2) produce the same hash code.

## clone Method

The clone method creates and returns a copy of the object. To make
a class cloneable, it must implement the Cloneable interface and
override the clone method. The default implementation performs a
shallow copy.

Main.java
  

package com.zetcode;

class Address implements Cloneable {

    private String city;
    private String street;
    
    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
    
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    
    public void setStreet(String street) {
        this.street = street;
    }
    
    @Override
    public String toString() {
        return city + ", " + street;
    }
}

public class Main {

    public static void main(String[] args) throws CloneNotSupportedException {

        Address addr1 = new Address("New York", "5th Avenue");
        Address addr2 = (Address) addr1.clone();
        
        System.out.println("Original: " + addr1);
        System.out.println("Clone: " + addr2);
        
        addr2.setStreet("Broadway");
        System.out.println("\nAfter modification:");
        System.out.println("Original: " + addr1);
        System.out.println("Clone: " + addr2);
    }
}

This example demonstrates how to implement cloning. The Address
class implements Cloneable and overrides clone. After
cloning, modifying the clone's street doesn't affect the original, showing a
proper shallow copy implementation. The Address class, with
city and street fields, implements the
Cloneable marker interface, indicating that its objects can be
cloned. 

The clone method is overridden and declared as
protected, calling super.clone to perform the actual
cloning mechanism provided by the Object class. This creates a
shallow copy, meaning that if Address contained references to other
mutable objects, only the references would be copied, not the objects
themselves. In this specific case, since String objects are
immutable, the shallow copy behaves much like a deep copy for the
Address object's state. The main method creates an
Address, clones it, and then modifies the street of
the cloned object. The output confirms that the original object remains
unchanged, demonstrating that addr1 and addr2 are
distinct objects in memory.

## getClass Method

The getClass method returns the runtime class of an object. This
method is final and cannot be overridden. It's useful for reflection and runtime
type checking.

Main.java
  

package com.zetcode;

class Animal {}
class Dog extends Animal {}

public class Main {

    public static void main(String[] args) {

        Animal animal = new Animal();
        Dog dog = new Dog();
        
        System.out.println("animal class: " + animal.getClass());
        System.out.println("dog class: " + dog.getClass());
        System.out.println("dog superclass: " + dog.getClass().getSuperclass());
        
        if (dog instanceof Animal) {
            System.out.println("dog is an Animal");
        }
    }
}

This example shows how getClass returns the actual runtime class
of an object. Even though dog is declared as Animal, getClass
returns Dog. We also demonstrate the instanceof operator for type checking.
The Animal class and its subclass Dog are used to illustrate.
An Animal object and a Dog object are created. Calling
animal.getClass returns class com.zetcode.Animal, and
dog.getClass returns class com.zetcode.Dog,
reflecting their true runtime types. 

The dog.getClass().getSuperclass call correctly identifies
class com.zetcode.Animal as the superclass of Dog.
Finally, the instanceof operator is used to check if
dog is an instance of Animal, which evaluates to true,
demonstrating a common way to perform runtime type checking that is often
preferred over direct class comparison when polymorphism is involved.

## wait, notify, notifyAll Methods

The wait, notify, and notifyAll
methods are used for thread synchronization. They must be called from within a
synchronized context and are fundamental to Java's inter-thread communication.

Main.java
    

package com.zetcode;

class Message {
    
    private String content;
    private boolean empty = true;

    public synchronized String read() {
        while (empty) {
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return null;
            }
        }
        empty = true;
        notifyAll();
        return content;
    }

    public synchronized void write(String content) {
        while (!empty) {
            try {
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
        }
        empty = false;
        this.content = content;
        notifyAll();
    }
}

public class Main {

    public static void main(String[] args) {

        Message message = new Message();

        // Writer thread
        new Thread(() -&gt; {
            String[] messages = {"First", "Second", "Third"};
            for (String msg : messages) {
                message.write(msg);
                System.out.println("Written: " + msg);
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
            message.write("DONE");
        }).start();

        // Reader thread
        new Thread(() -&gt; {
            String msg;
            while (!"DONE".equals(msg = message.read())) {
                if (msg != null) {
                    System.out.println("Read: " + msg);
                }
            }
            System.out.println("Reader finished.");
        }).start();
    }
}

This example demonstrates thread communication using wait and
notifyAll. The Message class coordinates between writer and reader
threads. The writer sends messages and the reader consumes them until receiving
"DONE". Proper synchronization ensures thread safety and correct communication.
The Message class has a content field and an
empty flag. The read and write methods
are synchronized to ensure mutual exclusion. In read,
if the message is empty, the thread calls wait,
releasing the lock and pausing until notified.

Once a message is read, empty is set to true, and
notifyAll is called to wake up any waiting writer. Conversely, in
write, if the message is not empty
(i.e., the previous message hasn't been read), the thread calls wait.
After writing, empty is set to false, and notifyAll wakes up any
waiting reader. The main method starts two threads: a writer that sends a
sequence of messages, and a reader that consumes them. The Thread.sleep(100)
in the writer thread is to simulate some work and make the interaction between
threads more observable. The communication continues until the "DONE" message is
processed, demonstrating a basic producer-consumer pattern.

## Source

[Java Object Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)

In this article, we've covered all major methods of the Java Object class with
practical examples. Understanding these methods is essential for proper Java
development as they form the foundation of object behavior in the language.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).