+++
title = "Java HashMap"
date = 2025-08-29T19:59:02.074+01:00
draft = false
description = "Java HashMap tutorial shows how to use Java HashMap collection. It is a collection that contains key-value pairs."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HashMap

last modified February 21, 2024

 

In this article we show how to use Java HashMap collection.

HashMap is a container that stores key-value pairs. Each key is
associated with one value. Keys in a HashMap must be unique.
HashMap is called an associative array or a dictionary in other
programming languages. HashMaps take more memory because for each
value there is also a key. Deletion and insertion operations take constant time.
HashMaps can store null values.

HashMaps do not maintain order.

Map.Entry represents a key-value pair in  HashMap.
HashMap's entrySet returns a Set view of
the mappings contained in the map. A set of keys is retrieved with the
keySet
method.

HashMap extends AbstractMap and implements
Map. The Map provides method signatures including
get, put, size, or isEmpty.

## HashMap Constructors

HashMap — constructs an empty HashMap with the default initial capacity (16)
and the default load factor (0.75).
HashMap(int initialCapacity) — constructs an empty HashMap with the given initial capacity and the default load factor (0.75).
- HashMap(int initialCapacity, float loadFactor) — constructs an empty HashMap with the given initial capacity and load factor.

- HashMap(Map m) — constructs a new HashMap with the same mappings as the given Map.

K is the type of the map keys and V is the type of
mapped values.

## HashMap methods

The following table provides a few HashMap methods.

Modifier and type
Method
Description

void
clear()
Removes all mappings from the map.

Object
clone()
Returns a shallow copy of the HashMap instance: the keys and values themselves are not cloned.

V boolean
containsKey(Object key)
Returns true if this map contains a mapping for the specified key.

Set
entrySet()
Returns a Set view of the mappings contained in this map.

boolean
isEmpty()
Returns true if this map is empty.

Set
keySet()
Returns a Set view of the keys contained in this map.

V
put(K key, V value)
Adds new mapping to the map.

V
remove(Object key)
Removes the mapping for the specified key from this map if present.

V
get(Object key)
Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.

void
forEach(BiConsumer action)
Performs the given action for each entry in this map until
all entries have been processed or the action throws an exception.

V
replace(K key, V value)
Replaces the entry for the specified key only if it is currently mapped to some value.

int
size()
Returns the number of key-value mappings in this map.

Collection
values()
Returns a Collection view of the values contained in this map.

In this article we work with several of these methods.

## HashMap creation

HashMap is created with new keyword.

Map capitals = new HashMap&lt;&gt;();

We specify the types of keys and values between angle brackets.
Thanks to *type inference*, it is not necessary to provide
types on the right side of the declaration.

## The put method

The put method is used to add a new mapping to the map.

capitals.put("svk", "Bratislava");

The first parameter is the key, the second is the value.

## The remove method

The remove method is used to delete a pair from the map.

capitals.remove("pol");

The parameter is the key whose mapping is to be removed from the map.

## HashMap initialization

Since Java 9, we have factory methods for HashMap initialization.

Main.java
  

import java.util.Map;
import static java.util.Map.entry;

void main() {

    Map colours = Map.of(1, "red", 2, "blue", 3, "brown");
    System.out.println(colours);

    Map countries = Map.ofEntries(
            entry("de", "Germany"),
            entry("sk", "Slovakia"),
            entry("ru", "Russia"));

    System.out.println(countries);
}

The example uses Map.of and Map.ofEntries
to initialize hashmaps. These two factory methods return *unmodifiable*
maps.

Main.java
  

import java.util.HashMap;
import java.util.Map;

// up to Java 8
void main() {

    Map countries = new HashMap&lt;&gt;() {
        {
            put("de", "Germany");
            put("sk", "Slovakia");
            put("ru", "Russia");
        }
    };

    System.out.println(countries);
}

In this example we create a modifiable hashmap. This way of initialization
is dubbed double-braced hashmap initialization.

## The size method

The size of the HashMap is determined with the size
method.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    int size = capitals.size();

    System.out.printf("The size of the HashMap is %d%n", size);

    capitals.remove("pol");
    capitals.remove("ita");

    size = capitals.size();

    System.out.printf("The size of the HashMap is %d%n", size);
}

In the code example, we create a HashMap and determine its size
with size. Then we remove some pairs and determine its size again.
We print the findings to the console.

capitals.put("svk", "Bratislava");
capitals.put("ger", "Berlin");

With put, we add new pairs into the HashMap.

int size = capitals.size();

Here we get the size of the map.

capitals.remove("pol");
capitals.remove("ita");

With remove, we delete two pairs from the map.

The size of the HashMap is 6
The size of the HashMap is 4

## The get method

To retrieve a value from a HashMap, we use the get
method. It takes a key as a parameter.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    String cap1 = capitals.get("ita");
    String cap2 = capitals.get("svk");

    System.out.println(cap1);
    System.out.println(cap2);
}

In the example, we retrieve two values from the map.

String cap2 = capitals.get("svk");

Here we get a value which has "svk" key.

## The clear method

The clear method removes all pairs from the HashMap.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    capitals.clear();

    if (capitals.isEmpty()) {

        System.out.println("The map is empty");
    } else {

        System.out.println("The map is not empty");
    }
}

In the example, we remove all elements and print the size of the map to the
console.

capitals.clear();

We remove all pairs with clear.

if (capitals.isEmpty()) {

    System.out.println("The map is empty");
} else {

    System.out.println("The map is not empty");
}

With the isEmpty method, we check if the map
is empty.

## The containsKey method

The containsKey method returns true if the map contains a mapping
for the specified key.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    String key1 = "ger";
    String key2 = "rus";

    if (capitals.containsKey(key1)) {

        System.out.printf("HashMap contains %s key%n", key1);
    } else {

        System.out.printf("HashMap does not contain %s key%n", key1);
    }

    if (capitals.containsKey(key2)) {

        System.out.printf("HashMap contains %s key%n", key2);
    } else {

        System.out.printf("HashMap does not contain %s key%n", key2);
    }
}

In the example, we check if the map contains two keys.

if (capitals.containsKey(key1)) {

    System.out.printf("HashMap contains %s key%n", key1);
} else {

    System.out.printf("HashMap does not contain %s key%n", key1);
}

This if statement prints a message depending on whether the map
contains the given key.

HashMap contains ger key
HashMap does not contain rus key

## The replace method

There are replace methods which enable programmers to replace
entries.

replace(K key, V value)

This method replaces the entry for the specified key only if it is currently
mapped to some value.

replace(K key, V oldValue, V newValue)

This method replaces the entry for the specified key only if it is currently
mapped to the specified value.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("day", "Monday");
    capitals.put("country", "Poland");
    capitals.put("colour", "blue");

    capitals.replace("day", "Sunday");
    capitals.replace("country", "Russia", "Great Britain");
    capitals.replace("colour", "blue", "green");

    capitals.entrySet().forEach(System.out::println);
}

In the example, we replace pairs in the map with replace.

capitals.replace("day", "Sunday");

Here we replace a value for the "day" key.

capitals.replace("country", "Russia", "Great Britain");

In this case, the value is not replaced because the key
is not currently set to "Russia".

capitals.replace("colour", "blue", "green");

Because the old value is correct, the value is replaced.

country=Poland
colour=green
day=Sunday

## Convert HashMap to List

In the next example we convert HashMap entries to a list of
entries.

Main.java
  

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

void main() {

    Map&lt;String, String&gt; colours = Map.of(
            "AliceBlue", "#f0f8ff",
            "GreenYellow", "#adff2f",
            "IndianRed", "#cd5c5c",
            "khaki", "#f0e68c"
    );

    Set&lt;Map.Entry&lt;String, String&gt;&gt; entries = colours.entrySet();
    List&lt;Map.Entry&lt;String, String&gt;&gt; mylist = new ArrayList&lt;&gt;(entries);

    System.out.println(mylist);
}

The entrySet returns a set view of mappings, which is later 
passed to the constructor of the ArrayList.

## Iteration with forEach

We use the forEach method to iterate over the key-value pairs of
the HashMap. The forEach method performs the given
action for each element of the map until all elements have been processed or the
action throws an exception.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    capitals.forEach((k, v) -&gt; System.out.format("%s: %s%n", k, v));
}

In the code example, we iterate over a HashMap with
forEach using a lambda expression.

capitals.forEach((k, v) -&gt; System.out.format("%s: %s%n", k, v));

With forEach we iterate over all pairs of the map.

## Iteration with enhanced for loop

The enhanced for loop can be used to iterate over a HashMap.

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    for (Map.Entry&lt;String, String&gt; pair: capitals.entrySet()) {

        System.out.format("%s: %s%n", pair.getKey(), pair.getValue());
    }
}

In the example we iterate over a HashMap with enhanced for loop.

for (Map.Entry&lt;String, String&gt; pair: capitals.entrySet()) {

    System.out.format("%s: %s%n", pair.getKey(), pair.getValue());
}

In each for cycle, a new key-value couple is assigned to the pair
variable.

With type inference, we can shorten the code a bit. 

Main.java
  

import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    for (var pair: capitals.entrySet()) {

        System.out.format("%s: %s%n", pair.getKey(), pair.getValue());
    }
}

We shorten the code by using a var keyword in the for loop.

## Iteration over keys

We might want to iterate only over keys of a HashMap.

Main.java
  

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    Set&lt;String&gt; keys = capitals.keySet();

    keys.forEach(System.out::println);
}

The example iterates over keys of the capitals map.

Set keys = capitals.keySet();

The keys of a HashMap are retrieved with the keySet
method, which returns a Set of keys. Keys must be unique; therefore,
we have a Set. Set is a collection that contains no
duplicate elements.

keys.forEach(System.out::println);

We go over the set of keys with forEach.

## Iteration over values

We might want to iterate only over values of a HashMap.

Main.java
  

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    Collection&lt;String&gt; vals = capitals.values();

    vals.forEach(System.out::println);
}

The example iterates over values of a HashMap.

Collection vals = capitals.values();

The values of a HashMap are retrieved with the values
method.

vals.forEach(System.out::println);

We go over the collection with forEach.

## Filtering HashMap

HashMap can be filtered with the filter method
of the Java Stream API.

Main.java
  

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

void main() {

    Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

    capitals.put("svk", "Bratislava");
    capitals.put("ger", "Berlin");
    capitals.put("hun", "Budapest");
    capitals.put("czk", "Prague");
    capitals.put("pol", "Warsaw");
    capitals.put("ita", "Rome");

    Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
            .filter(e -&gt; e.getValue().length() == 6)
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    filteredCapitals.entrySet().forEach(System.out::println);
}

In the example, we filter the map to contain only pairs whose values' size is
equal to six.

czk=Prague
ger=Berlin
pol=Warsaw

## List of maps

In the next example, we have a list of maps. 

Main.java
  

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

void main() {

    Map&lt;String,Integer&gt; fruits1 = new HashMap&lt;&gt;();
    fruits1.put("oranges", 2);
    fruits1.put("bananas", 3);

    Map&lt;String,Integer&gt; fruits2 = new HashMap&lt;&gt;();
    fruits2.put("plums", 6);
    fruits2.put("apples", 7);

    List&lt;Map&lt;String,Integer&gt;&gt; all = new ArrayList&lt;&gt;();
    all.add(fruits1);
    all.add(fruits2);

    all.forEach(e -&gt; e.forEach((k, v) -&gt; System.out.printf("k: %s v %d%n", k, v)));
}

We define two maps and insert them into a list. Then we interate over the list 
with two forEach loops.

k: oranges v 2
k: bananas v 3
k: plums v 6
k: apples v 7

## Source

[Java HashMap - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)

In this article we have presented the Java HashMap collection.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).