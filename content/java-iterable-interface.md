+++
title = "Java Iterable Interface"
date = 2025-08-29T19:59:50.408+01:00
draft = false
description = "Complete Java Iterable interface tutorial covering all methods with examples. Learn about iterator, forEach, spliterator and other Iterable methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Iterable Interface

Last modified: April 13, 2025

The java.lang.Iterable interface is a fundamental component of
Java's Collection framework, defining a contract for objects that support
iteration. It serves as the **superinterface** for all collection
types, including List, Set, and Queue. By
implementing Iterable, a class enables traversal using an enhanced
for-loop, simplifying iteration logic and improving code readability.

Introduced in **Java 5**, the Iterable interface provides a way
to obtain an **iterator**, a mechanism that allows sequential
access to elements without exposing the underlying representation. Later, in
**Java 8**, it was extended with default
methods, offering more flexibility and additional ways to process
collections efficiently. Understanding Iterable is essential for working
with Java collections and designing custom iterable structures that
integrate seamlessly with existing APIs.

## Iterable Interface Methods

The Iterable interface defines three key methods that enable iteration over
elements. The **primary method** is iterator,
while forEach and spliterator were introduced
in Java 8 as default methods to enhance iteration capabilities.

public interface Iterable&lt;T&gt; {
    Iterator&lt;T&gt; iterator();
    default void forEach(Consumer&lt;? super T&gt; action) {...}
    default Spliterator&lt;T&gt; spliterator() {...}
}

The iterator method is the **core requirement** for
any class implementing Iterable; it provides an Iterator instance,
which facilitates **controlled sequential access** to elements. The
forEach method enables **functional iteration**,
allowing the use of **lambda expressions** for streamlined element
processing. Meanwhile, spliterator aids in parallel
execution, particularly beneficial for high-performance
computing tasks where processing large amounts of data efficiently is
critical.

By implementing Iterable, developers can make their custom data structures
**integrate seamlessly** into Java's iteration mechanisms,
improving code maintainability and performance. Understanding these methods and
their applications enables better collection handling, functional
programming, and **parallel execution** in modern Java
applications.

## Basic Iterable Implementation

This example demonstrates how to implement the Iterable interface in a custom
class. We create a simple collection-like class that holds elements and provides
iteration capability.

Main.java
  

class SimpleCollection&lt;T&gt; implements Iterable&lt;T&gt; {
    
    private T[] elements;
    private int size;
    
    @SuppressWarnings("unchecked")
    public SimpleCollection(int capacity) {
        elements = (T[]) new Object[capacity];
        size = 0;
    }
    
    public void add(T element) {
        if (size &lt; elements.length) {
            elements[size++] = element;
        }
    }
    
    @Override
    public Iterator&lt;T&gt; iterator() {
        return new Iterator&lt;T&gt;() {
            private int currentIndex = 0;
            
            @Override
            public boolean hasNext() {
                return currentIndex &lt; size;
            }
            
            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                return elements[currentIndex++];
            }
        };
    }
}

void main() {

    SimpleCollection&lt;String&gt; collection = new SimpleCollection&lt;&gt;(3);
    collection.add("First");
    collection.add("Second");
    collection.add("Third");
    
    for (String item : collection) {
        System.out.println(item);
    }
}

In this example, we create a SimpleCollection class that implements
Iterable. The class maintains an array of elements and provides an iterator
implementation as an anonymous inner class. The enhanced for-loop works with our
custom collection because it implements Iterable.

## Using forEach Method

The forEach method, added in Java 8, performs the given action for
each element of the Iterable until all elements have been processed. This method
simplifies iteration with lambda expressions.

Main.java
  

void main() {

    List&lt;String&gt; languages = List.of("Java", "Python", "C++", "JavaScript");

    // Traditional for-loop
    System.out.println("Traditional iteration:");
    for (String lang : languages) {
        System.out.println(lang);
    }

    // Using forEach with lambda
    System.out.println("\nUsing forEach:");
    languages.forEach(lang -&gt; System.out.println(lang));

    // Using method reference
    System.out.println("\nUsing method reference:");
    languages.forEach(System.out::println);
}

This example shows different ways to iterate over a List (which implements
Iterable). The forEach method provides a concise way to process
each element using a lambda expression or method reference, making the code more
readable and expressive.

## Custom Iterator Implementation

This example demonstrates how to create a more sophisticated custom iterator for
a specialized data structure. We'll implement a range iterator that generates
numbers within a specified range.

Main.java
  

class NumberRange implements Iterable&lt;Integer&gt; {

    private final int start;
    private final int end;
    private final int step;

    public NumberRange(int start, int end, int step) {
        this.start = start;
        this.end = end;
        this.step = step;
    }

    @Override
    public Iterator&lt;Integer&gt; iterator() {
        return new Iterator&lt;&gt;() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return step &gt; 0 ? current &lt;= end : current &gt;= end;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                int value = current;
                current += step;
                return value;
            }
        };
    }
}

void main() {
    
    System.out.println("Positive step:");
    for (int num : new NumberRange(1, 10, 2)) {
        System.out.println(num);
    }

    System.out.println("\nNegative step:");
    for (int num : new NumberRange(10, 1, -2)) {
        System.out.println(num);
    }
}

This example creates a NumberRange class that generates numbers
from start to end with a given step. The iterator handles both positive and
negative steps correctly. The implementation shows how to create a stateful
iterator that maintains its position during iteration.

## Iterable with Primitive Types

While Iterable works with objects, we can create specialized
implementations for primitive types using wrapper classes. This example shows an
iterable for primitive int values.

Main.java
  

class IntRange implements Iterable {
    
    private final int[] values;

    public IntRange(int... values) {
        this.values = values;
    }

    @Override
    public Iterator&lt;Integer&gt; iterator() {
        return new Iterator&lt;&gt;() {
            private int index = 0;

            @Override
            public boolean hasNext() {
                return index &lt; values.length;
            }

            @Override
            public Integer next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }
                return values[index++];
            }
        };
    }
}

void main() {

    IntRange range = new IntRange(10, 20, 30, 40, 50);

    // Using enhanced for-loop
    for (int num : range) {
        System.out.println(num);
    }

    // Using forEach
    range.forEach(num -&gt; System.out.println(num * 2));
}

This example creates an IntRange class that holds primitive int
values but provides iteration through Integer objects. The class demonstrates
how to work with primitive values while still implementing the Iterable
interface for use with Java's collection framework.

## Nested Iterable Implementation

This example demonstrates how to implement Iterable for a more
complex data structure with nested elements. We'll create a Matrix
class that allows iteration through all elements row by row.

Main.java
  

class Matrix&lt;T&gt; implements Iterable&lt;T&gt; {

    private final T[][] data;
    private final int rows;
    private final int cols;

    @SuppressWarnings("unchecked")
    public Matrix(int rows, int cols) {
        this.rows = rows;
        this.cols = cols;
        data = (T[][]) new Object[rows][cols];
    }

    public void set(int row, int col, T value) {

        if (row &gt;= rows || col &gt;= cols || row &lt; 0 || col &lt; 0) {
            throw new IndexOutOfBoundsException("Invalid matrix position");
        }

        data[row][col] = value;
    }

    public T get(int row, int col) {
        return data[row][col];
    }

    @Override
    public Iterator&lt;T&gt; iterator() {
        return new Iterator&lt;&gt;() {
            private int row = 0;
            private int col = 0;

            @Override
            public boolean hasNext() {
                return row &lt; rows;
            }

            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }

                T value = data[row][col];

                // Move to next element
                col++;
                if (col &gt;= cols) {
                    col = 0;
                    row++;
                }

                return value;
            }
        };
    }
}

void main() {

    Matrix&lt;String&gt; matrix = new Matrix&lt;&gt;(2, 3);

    matrix.set(0, 0, "A1");
    matrix.set(0, 1, "A2");
    matrix.set(0, 2, "A3");
    matrix.set(1, 0, "B1");
    matrix.set(1, 1, "B2");
    matrix.set(1, 2, "B3");

    System.out.println("Matrix elements:");
    for (String element : matrix) {
        System.out.println(element);
    }
}

This improved Matrix class stores elements in a 2D array while
providing a *flat iteration* through all elements. The iterator correctly
maintains its position across rows and columns, demonstrating a structured
approach to handling complex iteration while still implementing the
Iterable interface.

## Source

[Java Iterable Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html)

In this article, we've covered the Java Iterable interface with practical
examples. Understanding Iterable is essential for working with Java collections
and creating custom iterable data structures that work seamlessly with Java's
enhanced for-loop and stream API.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).