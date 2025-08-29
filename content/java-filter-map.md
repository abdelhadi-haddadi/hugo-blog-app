+++
title = "Java filter map"
date = 2025-08-29T19:58:41.968+01:00
draft = false
description = "Learn how to filter a map in Java using practical examples. This Java tutorial covers HashMap filtering techniques for efficient coding."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java filter map

last modified June 26, 2025

 

In this tutorial, we demonstrate how to filter a Map in Java using
the Stream API. Filtering a map is a common task when working with collections,
especially when you need to extract entries that meet specific conditions.

A HashMap is a widely used data structure in Java that stores
key-value pairs. Each key in a HashMap is unique and maps to a
single value. This makes it ideal for fast lookups and efficient data retrieval.

To filter a HashMap, we can leverage the filter method
provided by the Java Stream API. This method accepts a *predicate*—a
functional interface that evaluates each entry and returns true or
false based on a condition. The result is a new stream containing
only the entries that satisfy the predicate.

For example, you might filter a map to include only entries with values greater
than a certain threshold, or keys that match a specific pattern. Once filtered,
the stream can be collected back into a map using
Collectors.toMap.

## Filter map by values

In the first example, we filter the values of a map.

Main.java
  

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
        .filter(e -&gt; e.getValue().startsWith("B"))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    filteredCapitals.entrySet().forEach(System.out::println);
}

We have a map of capitals. We get the entries of a map with
entrySet. Then we turn the set into a stream with
stream.

Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
    .filter(e -&gt; e.getValue().startsWith("B"))
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

We filter the map to contain only pairs whose values start with B. We get the 
value from the current entry with getValue.

$ java Main.java
hun=Budapest
ger=Berlin
svk=Bratislava

## Filter map by keys

In the next example, we filter the map by its keys.

Main.java
  

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
        .filter(e -&gt; e.getKey().endsWith("k"))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    filteredCapitals.entrySet().forEach(System.out::println);
}

The example filters all entries whose keys end with letter k.

Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
    .filter(e -&gt; e.getKey().endsWith("k"))
    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

We get the current key of an entry with getKey.

$ java Main.java
czk=Prague
svk=Bratislava

## Filter map by keys and values

In the next example, we filter a map by the keys and values.

Main.java
  

void main() {

    Map&lt;Integer, String&gt; users = new HashMap&lt;&gt;();

    users.put(1, "John Doe");
    users.put(2, "Roger Roe");
    users.put(3, "Jane Doe");
    users.put(4, "Jack Drake");
    users.put(5, "Peter Morgan");
    users.put(6, "Robert Melnik");

    Map&lt;Integer, String&gt; filtered = users.entrySet().stream()
            .filter(e -&gt; e.getKey() % 2 == 0)
            .filter(e -&gt; e.getValue().split(" ")[1].startsWith("D"))
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    filtered.entrySet().forEach(System.out::println);
}

We have a map of users. We filter out all users whose keys are even and whose 
lastnames start with letter D.

$ java Main.java
4=Jack Drake

## Filter by age

We have a map of users. We filter the map by the users' age.

Main.java
  

void main() {

    var dft = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    Map&lt;Integer, User&gt; users = new HashMap&lt;&gt;();
    users.put(1, new User("John Doe", "gardener", LocalDate.parse("1973-09-07", dft)));
    users.put(2, new User("Roger Roe", "driver", LocalDate.parse("1963-03-30", dft)));
    users.put(3, new User("Kim Smith", "teacher", LocalDate.parse("1980-05-12", dft)));
    users.put(4, new User("Joe Nigel", "artist", LocalDate.parse("1983-03-30", dft)));
    users.put(5, new User("Liam Strong", "teacher", LocalDate.parse("2009-03-06", dft)));
    users.put(6, new User("Robert Young", "gardener", LocalDate.parse("1978-11-16", dft)));
    users.put(7, new User("Liam Strong", "teacher", LocalDate.parse("1986-10-23", dft)));

    Map&lt;Integer, User&gt; olderThanForty = users.entrySet().stream().filter(e -&gt; {
        LocalDate dob = e.getValue().dob();
        int age = Period.between(dob, LocalDate.now()).getYears();
        return age &gt; 40;
    }).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    olderThanForty.entrySet().forEach(System.out::println);
}

record User(String name, String occupation, LocalDate dob) {
}

We filter out all users that are older than forty.

Map&lt;Integer, User&gt; olderThanForty = users.entrySet().stream().filter(e -&gt; {
    LocalDate dob = e.getValue().dob();
    int age = Period.between(dob, LocalDate.now()).getYears();
    return age &gt; 40;
}).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

We retrieve the date of birth from the user object with e.getValue().dob(). 
Then we calculate the user's age with Period.between(dob, LocalDate.now()).getYears(). 
The filter condition is age &gt; 40;

$ java Main.java
1=User[name=John Doe, occupation=gardener, dob=1973-09-07]
2=User[name=Roger Roe, occupation=driver, dob=1963-03-30]
3=User[name=Kim Smith, occupation=teacher, dob=1980-05-12]
6=User[name=Robert Young, occupation=gardener, dob=1978-11-16]

## Filter with multiple conditions using logical operators

In this example, we demonstrate how to filter a map using multiple conditions
combined with logical operators like AND (&amp;&amp;) and OR
(||).

Main.java
  

void main() {

    Map&lt;String, Product&gt; products = new HashMap&lt;&gt;();
    products.put("P001", new Product("Laptop", 899.99, "Electronics", 15));
    products.put("P002", new Product("Coffee Mug", 12.99, "Kitchen", 50));
    products.put("P003", new Product("Smartphone", 599.99, "Electronics", 8));
    products.put("P004", new Product("Book", 19.99, "Education", 25));
    products.put("P005", new Product("Headphones", 149.99, "Electronics", 30));
    products.put("P006", new Product("Desk Chair", 249.99, "Furniture", 5));

    // Filter using AND: Electronics products with price less than 700
    Map&lt;String, Product&gt; electronicsCheap = products.entrySet().stream()
        .filter(e -&gt; e.getValue().category().equals("Electronics") &amp;&amp; 
                     e.getValue().price() &lt; 700)
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    System.out.println("Electronics products under $700:");
    electronicsCheap.entrySet().forEach(System.out::println);

    // Filter using OR: Products that are either expensive (&gt;200) or low stock (&lt;10)
    Map&lt;String, Product&gt; expensiveOrLowStock = products.entrySet().stream()
        .filter(e -&gt; e.getValue().price() &gt; 200 || e.getValue().stock() &lt; 10)
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    System.out.println("\nProducts that are expensive (&gt;$200) or low stock (&lt;10):");
    expensiveOrLowStock.entrySet().forEach(System.out::println);

    // Complex condition: (Electronics AND expensive) OR (low stock)
    Map&lt;String, Product&gt; complexFilter = products.entrySet().stream()
        .filter(e -&gt; (e.getValue().category().equals("Electronics") &amp;&amp; 
                      e.getValue().price() &gt; 500) || 
                     e.getValue().stock() &lt; 10)
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    System.out.println("\nExpensive Electronics OR low stock products:");
    complexFilter.entrySet().forEach(System.out::println);
}

record Product(String name, double price, String category, int stock) {
}

This example shows three different filtering scenarios using logical operators:

- **AND condition:** Products that are both Electronics AND under $700

- **OR condition:** Products that are either expensive (over $200) OR have low stock (under 10 units)

- **Complex condition:** Expensive Electronics OR any product with low stock

The filtering is done using the filter method of the Java Stream
API, which allows us to specify conditions for each entry in the map. The
results are collected into a new map using collect(Collectors.toMap(...)).

$ java Main.java
Electronics products under $700:
P005=Product[name=Headphones, price=149.99, category=Electronics, stock=30]
P003=Product[name=Smartphone, price=599.99, category=Electronics, stock=8]

Products that are expensive (&gt;$200) or low stock (&lt;10):
P006=Product[name=Desk Chair, price=249.99, category=Furniture, stock=5]
P001=Product[name=Laptop, price=899.99, category=Electronics, stock=15]
P003=Product[name=Smartphone, price=599.99, category=Electronics, stock=8]

Expensive Electronics OR low stock products:
P006=Product[name=Desk Chair, price=249.99, category=Furniture, stock=5]
P001=Product[name=Laptop, price=899.99, category=Electronics, stock=15]
P003=Product[name=Smartphone, price=599.99, category=Electronics, stock=8]

## Source

[Java HashMap - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)

In this article we have showed how to filter a map in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).