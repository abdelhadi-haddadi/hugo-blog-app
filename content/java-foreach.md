+++
title = "Java forEach"
date = 2025-08-29T19:58:43.081+01:00
draft = false
description = "Java forEach tutorial shows how to use Java forEach method. We work with consumers and demonstrate forEach on lists, maps, and set collections."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java forEach

Last modified: June 17, 2025

 

In this article, we demonstrate how to effectively utilize the Java
forEach method. We explore its application with consumers and
provide practical examples of using forEach to iterate over lists,
maps, and set collections, showcasing its versatility in handling various data
structures.

The forEach method executes a specified action for each element
within an Iterable object, continuing until all elements are
processed or an exception occurs. Introduced in Java 8, this method offers
developers a modern, concise alternative to traditional looping constructs,
simplifying the process of iterating over collections.

void forEach(Consumer&lt;? super T&gt; action);

The snippet above illustrates the syntax of the forEach method,
where it accepts a Consumer object to define the action to be
performed on each element.

## Consumer Interface

The Consumer interface is a functional interface in Java,
characterized by a single abstract method. It takes one input parameter and does
not return any result, making it ideal for operations that process data without
producing output, such as printing or modifying elements.

@FunctionalInterface
public interface Consumer {
    void accept(T t);
}

This code defines the Consumer interface, highlighting its
accept method, which processes the input parameter of type
T.

Main.java
  

void main() {

    List&lt;String&gt; items = new ArrayList&lt;&gt;();

    items.add("coins");
    items.add("pens");
    items.add("keys");
    items.add("sheets");

    items.forEach(new Consumer&lt;String&gt;() {
        @Override
        public void accept(String name) {
            System.out.println(name);
        }
    });
}

In this example, we illustrate how to iterate over a list of strings using the
forEach method. Here, we implement the Consumer
interface explicitly to print each element. This verbose approach can be
streamlined using Java's lambda expressions, as shown later.

## Lambda Expression

Lambda expressions in Java provide a succinct way to implement functional
interfaces, such as Consumer, by defining their behavior inline.
They are constructed using the -&gt; operator, which separates the
parameters from the body of the expression, enhancing code readability and
reducing boilerplate.

Main.java
  

void main() {

    List&lt;String&gt; items = new ArrayList&lt;&gt;();

    items.add("coins");
    items.add("pens");
    items.add("keys");
    items.add("sheets");

    items.forEach((String name) -&gt; {
        System.out.println(name);
    });
}

This example revisits the previous list iteration, now using a lambda
expression. By replacing the explicit Consumer implementation with
a lambda, the code becomes more concise and easier to read, while maintaining
the same functionality of printing each string.

## Using forEach on Map

The next example demonstrates the application of the forEach method
on a map, a collection type that stores key-value pairs.

Main.java
  

void main() {

    Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();

    items.put("coins", 3);
    items.put("pens", 2);
    items.put("keys", 1);
    items.put("sheets", 12);

    items.forEach((k, v) -&gt; {
        System.out.printf("%s : %d%n", k, v);
    });
}

Here, we define a map containing pairs of strings and integers. Using the
forEach method with a lambda expression, we iterate over the map,
printing each key-value pair in a formatted manner. The lambda takes two
parameters: the key (k) and the value (v).

In the following example, we explicitly define the Consumer and
utilize Map.Entry to iterate over the map's entries, offering an
alternative approach.

Main.java
  

void main() {

    HashMap&lt;String, Integer&gt; map = new HashMap&lt;&gt;();

    map.put("cups", 6);
    map.put("clocks", 2);
    map.put("pens", 12);

    Consumer&lt;Map.Entry&lt;String, Integer&gt;&gt; action = entry -&gt;
    {
        System.out.printf("key: %s", entry.getKey());
        System.out.printf(" value: %s%n", entry.getValue());
    };

    map.entrySet().forEach(action);
}

This example iterates over a map by accessing its entry set via the
entrySet method. We define a Consumer that processes
each Map.Entry object, printing the key and value separately,
demonstrating a more explicit iteration technique.

## Java forEach on Set

The following example showcases the use of the forEach method on a
set, a collection that ensures uniqueness among its elements.

Main.java
  

void main() {

    Set&lt;String&gt; brands = new HashSet&lt;&gt;();

    brands.add("Nike");
    brands.add("IBM");
    brands.add("Google");
    brands.add("Apple");

    brands.forEach((e) -&gt; System.out.println(e));
}

In this scenario, we create a set of brand names. Using the forEach
method with a lambda expression, we iterate over the set and print each element,
leveraging the simplicity of this approach to display the unique values.

## Using forEach on Array

This example illustrates how to apply the forEach method to an
array, which requires converting the array into a stream first.

Main.java
  

void main() {

    int[] nums = {3, 4, 2, 1, 6, 7};

    Arrays.stream(nums).forEach((e) -&gt; System.out.println(e));
}

Here, we work with an array of integers. By using the Arrays.stream
method, we transform the array into a stream, enabling the use of
forEach to iterate over and print each element. This approach
bridges the gap between arrays and the stream-based operations introduced in
Java 8.

## Filtering a List

The forEach method can be combined with filtering operations to
process only specific elements from a collection, enhancing its utility.

Main.java
  

void main() {

    List&lt;String&gt; items = new ArrayList&lt;&gt;();

    items.add("coins");
    items.add("pens");
    items.add("keys");
    items.add("sheets");

    items.stream().filter(item -&gt; item.length() == 4).forEach(System.out::println);
}

In this example, we filter a list of strings to include only those with exactly
four characters, then use forEach to print the results. The
filter method, applied to a stream of the list, works seamlessly
with forEach, demonstrating how to refine data before processing.

## IntConsumer, LongConsumer, DoubleConsumer

Since Java 8, specialized consumer interfaces for primitive data
types—IntConsumer, LongConsumer, and
DoubleConsumer—have been available, optimizing performance by
avoiding autoboxing.

Main.java
  

void main() {

    int[] inums = { 3, 5, 6, 7, 5 };
    IntConsumer icons = i -&gt; System.out.print(i + " ");
    Arrays.stream(inums).forEach(icons);
    
    System.out.println();

    long[] lnums = { 13L, 3L, 6L, 1L, 8L };
    LongConsumer lcons = l -&gt; System.out.print(l + " ");
    Arrays.stream(lnums).forEach(lcons);
    
    System.out.println();

    double[] dnums = { 3.4d, 9d, 6.8d, 10.3d, 2.3d };
    DoubleConsumer dcons = d -&gt; System.out.print(d + " ");
    Arrays.stream(dnums).forEach(dcons);
    
    System.out.println();
}

This example demonstrates the use of IntConsumer,
LongConsumer, and DoubleConsumer to iterate over
arrays of integers, longs, and doubles, respectively. Each consumer is defined
with a lambda expression to print the elements with a space separator,
showcasing their application to primitive streams.

## Chaining Operations with forEach

The forEach method can be combined with other stream operations,
such as mapping and filtering, to perform complex transformations before
processing elements. This approach allows for elegant, functional-style
programming in Java, enabling developers to chain operations in a readable and
efficient manner.

Main.java
  

void main() {

    List&lt;String&gt; words = new ArrayList&lt;&gt;();

    words.add("apple");
    words.add("banana");
    words.add("cherry");
    words.add("date");

    words.stream()
         .map(String::toUpperCase)
         .filter(word -&gt; word.length() &gt; 5)
         .forEach(System.out::println);
}

In this example, we begin with a list of fruit names. Using a stream, we chain
three operations: first, the map method transforms each string to
uppercase with a method reference (String::toUpperCase); next, the
filter method selects only those strings exceeding five characters
in length; finally, the forEach method prints the resulting
elements to the console. This demonstrates how forEach acts as the
terminal operation in a stream pipeline, efficiently handling the transformed
data and showcasing Java's functional programming capabilities.

## Using forEach with Records

The forEach method is highly adaptable and can iterate over
collections of custom types, such as Java records. Introduced in Java 16,
records provide a concise way to define immutable data classes. This example
illustrates how forEach can process a collection of records,
simplifying the handling of structured data.

Main.java
  

record Person(String name, int age) {
    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

void main() {

    List&lt;Person&gt; people = new ArrayList&lt;&gt;();

    people.add(new Person("Alice", 25));
    people.add(new Person("Bob", 30));
    people.add(new Person("Clara", 28));

    people.forEach(person -&gt; System.out.println(person));
}

In this scenario, we define a Person record with two components:
name and age. Records automatically provide
constructors, getters, and standard methods like equals and
hashCode, but we override toString to customize the
output format. 

We then create a list of Person records and use the
forEach method with a lambda expression to iterate over the
collection, printing each person's details. This example highlights how
forEach integrates effortlessly with records, leveraging their
concise syntax and immutability to process custom data types effectively.

## Source

[Java Language Basics - Tutorial](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html)

In this article, we have thoroughly explored the Java forEach
method. We introduced the concept of consumers and demonstrated their use with
forEach across lists, maps, and sets, providing a comprehensive
understanding of this powerful iteration tool.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).