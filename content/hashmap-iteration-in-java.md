+++
title = "HashMap iteration in Java"
date = 2025-08-29T19:59:02.087+01:00
draft = false
description = "HashMap iteration in Java tutorial shows how to iterate over a HashMap in Java. We show several ways to iterate a HashMap."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# HashMap iteration in Java

last modified September 20, 2023

 

In this article we show how to iterate over a HashMap in Java.

## Java HashMap

HashMap is a container that stores key-value pairs. Each key is
associated with one value. Keys in a HashMap must be unique.
HashMap is called an associative array or a dictionary in other
programming languages. HashMaps take more memory because for each
value there is also a key. Deletion and insertion operations take constant time.
HashMaps can store null values.

Map.Entry represents a key-value pair in  HashMap.
HashMap's entrySet returns a Set view
of the mappings contained in the map. A set of keys is retrieved with the keySet
method.

## HashMap iteration with forEach

In the first example, we use the forEach method to iterate over the
key-value pairs of the HashMap. The forEach method
performs the given action for each element of the map until all elements have
been processed or the action throws an exception.

com/zetcode/HashMapForEach.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;

public class HashMapForEach {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        items.forEach((k, v) -&gt; {
            System.out.format("key: %s, value: %d%n", k, v);
        });
    }
}

In the code example, we iterate over a HashMap with
forEach using a lambda expression.

Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
items.put("coins", 5);
items.put("pens", 2);
items.put("chairs", 7);

A HashMap is created with a couple of pairs.

items.forEach((k, v) -&gt; {
    System.out.format("key: %s, value: %d%n", k, v);
});

The forEach makes the code more concise.

## HashMap iteration with Stream API

Stream is a sequence of elements from a source that
supports sequential and parallel aggregate operations.
The source can be a collection, IO operation, or array,
which provides data to a stream.

com/zetcode/HashMapStreamEx.java
  

package com.zetcode;

import java.util.HashMap;

public class HashMapStreamEx {

    public static void main(String[] args) {

        HashMap&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        items.entrySet().stream().forEach(e -&gt; {
            System.out.format("key: %s, value: %d%n", e.getKey(), e.getValue());
        });
    }
}

The example iterates over a HashMap with the stream API.
We get the entry set with entrySet method and from the entry set,
we get the stream with the stream method. Later, we iterate over
the stream with forEach.

## HashMap iteration with enhanced for loop

Enhanced for loop can be used to iterate over a HashMap.

com/zetcode/HashMapEnhancedFor.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;

public class HashMapEnhancedFor {

    public static void main(String[] args) {

        HashMap&lt;String, Integer&gt; items = new HashMap();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        for (Map.Entry&lt;String, Integer&gt; pair: items.entrySet()) {
            System.out.format("key: %s, value: %d%n", pair.getKey(), pair.getValue());
        }
    }
}

In the example, we iterate over a HashMap with enhanced for loop.

for (Map.Entry&lt;String, Integer&gt; pair: items.entrySet()) {
    System.out.format("key: %s, value: %d%n", pair.getKey(), pair.getValue());
}

In each for cycle, a new key-value couple is assigned to the pair
variable.

The example can be simplified with type inference.

com/zetcode/HashMapEnhancedFor2.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;

public class HashMapEnhancedFor {

    public static void main(String[] args) {

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
}

In the for loop, we use the var keyword; Java infers the type
automatically.

## HashMap iteration with Iterator

In the following example, we iterate over a HashMap
with Iterator and Map.Entry.

com/zetcode/HashMapIterator.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class HashMapIterator {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        Iterator&lt;Map.Entry&lt;String, Integer&gt;&gt; it = items.entrySet().iterator();

        while (it.hasNext()) {
            Map.Entry&lt;String, Integer&gt; pair = it.next();

            System.out.format("key: %s, value: %d%n", pair.getKey(),
                    pair.getValue());
        }
    }
}

In the code example we retrieve an iterator over the key-value pairs and iterate
over the mappings in the while loop.

Iterator&lt;Map.Entry&lt;String, Integer&gt;&gt; it = items.entrySet().iterator();

We get the iterator object. First, we get the entry set with the entrySet
method and from the entry set we get the iterator with iterator method.

while (it.hasNext()) {

The iterator's hasNext method returns true if the iteration has more
elements.

Map.Entry&lt;String, Integer&gt; pair = it.next();

The next method returns the next pair.

System.out.format("key: %s, value: %d", pair.getKey(),
        pair.getValue());

With getKey and getValue methods
we get the key and the value of the pair.

The following example is the same but uses a for loop instead of while.

com/zetcode/HashMapIterator2.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class HashMapIterator2 {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        for (Iterator&lt;Map.Entry&lt;String, Integer&gt;&gt; it = items.entrySet().iterator();
                it.hasNext();) {

            Map.Entry&lt;String, Integer&gt; pair = it.next();
            System.out.format("key: %s, value: %d%n", pair.getKey(), pair.getValue());
        }
    }
}

In the example, we iterate over a HashMap with an iterator
and for loop.

In the next example, we iterate over a key set with an iterator while using
HashMap's keySet method, which returns a
Set view of the keys contained in this map. This iteration is less
efficient.

com/zetcode/HashMapIterator3.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class HashMapIterator3 {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        Iterator&lt;String&gt; it = items.keySet().iterator();

        while (it.hasNext()) {
            String key = it.next();

            System.out.format("key: %s, value: %d%n", key,
                    items.get(key));
        }
    }
}

In the example, we iterate over the key set of the map with
an iterator. The iterator is used in a while loop to go over
the keys of the map. The key is later used to get the corresponding value.

Iterator&lt;String&gt; it = items.keySet().iterator();

We get the iterator object of the key set.

while (it.hasNext()) {

In the while loop, we traverse over the keys of the HashMap.

String key = it.next();

The next key is retrieved.

System.out.format("key: %s, value: %d%n", key,
        items.get(key));

The value is retrieved with the get method.

## HashMap iteration over keys

We may need to iterate only over keys of a HashMap.

com/zetcode/HashMapKeys.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HashMapKeys {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        Set&lt;String&gt; keys = items.keySet();

        keys.forEach(System.out::println);
    }
}

The example iterates over keys of a HashMap.

Set&lt;String&gt; keys = items.keySet();

The keys of a HashMap are retrieved with the keySet
method, which returns a Set of keys. Keys must be unique; therefore,
we have a Set. Set is a collection that contains no
duplicate elements.

keys.forEach(System.out::println);

We go over the set of keys with forEach.

## HashMap iteration over values

We may need to iterate only over values of a HashMap.

com/zetcode/HashMapValues.java
  

package com.zetcode;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class HashMapValues {

    public static void main(String[] args) {

        Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();
        items.put("coins", 5);
        items.put("pens", 2);
        items.put("chairs", 7);

        Collection&lt;Integer&gt; vals = items.values();

        vals.forEach(System.out::println);
    }
}

The example iterates over values of a HashMap.

Collection&lt;Integer&gt; vals = items.values();

The values of a HashMap are retrieved with the values
method.

vals.forEach(System.out::println);

We go over the collection with forEach.

## Iteration over HashMap containing ArrayList

A HashMap can contain lists as values. In such a case, we need an
additional loop.

com/zetcode/HashMapList.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HashMapList {

    public static void main(String[] args) {

        Map&lt;String, List&lt;String&gt;&gt; m = new HashMap&lt;&gt;();

        m.put("colours", Arrays.asList("red", "green", "blue"));
        m.put("sizes", Arrays.asList("small", "medium", "big"));

        for (Map.Entry&lt;String, List&lt;String&gt;&gt; me : m.entrySet()) {

            String key = me.getKey();
            List&lt;String&gt; values = me.getValue();

            System.out.println("Key: " + key);
            System.out.print("Values: ");

            for (String e : values) {

                System.out.printf("%s ", e);
            }

            System.out.println();
        }
    }
}

In the example, we iterate over a HashMap that contains
ArrayLists as values. We use two for loops.

Map&lt;String, List&lt;String&gt;&gt; m = new HashMap&lt;&gt;();

m.put("colours", Arrays.asList("red", "green", "blue"));
m.put("sizes", Arrays.asList("small", "medium", "big"));

We define a HashMap having ArrayLists as values.

for (Map.Entry&lt;String, List&lt;String&gt;&gt; me : m.entrySet()) {

With enhanced for loop, we go through the entry set. Each entry has a key string
and list value.

String key = me.getKey();

We get the key with getKey method.

List&lt;String&gt; values = me.getValue();

We get the list with getValue.

for (String e : values) {

    System.out.printf("%s ", e);
}

In the inner for loop, we iterate over the list of values.

## HashMap filtering

HashMap can be filtered with the filter method of the
Stream API.

com/zetcode/HashMapFilter.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class HashMapFilter {

    public static void main(String[] args) {

        Map&lt;String, String&gt; capitals = new HashMap&lt;&gt;();

        capitals.put("svk", "Bratislava");
        capitals.put("ger", "Berlin");
        capitals.put("hun", "Budapest");
        capitals.put("czk", "Prague");
        capitals.put("pol", "Warsaw");
        capitals.put("ita", "Rome");

        Map&lt;String, String&gt; filteredCapitals = capitals.entrySet().stream()
                .filter(map -&gt;  map.getValue().startsWith("B"))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        filteredCapitals.entrySet().forEach(System.out::println);
    }
}

In the example, we have a map of countries with their capitals. We filter the
map to contain only pairs whose values begin with B.

## Source

[Java HashMap - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html)

In this article we have shown how to iterate over a HashMap in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).