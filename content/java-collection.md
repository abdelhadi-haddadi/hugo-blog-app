+++
title = "Java collection"
date = 2025-08-29T19:58:14.601+01:00
draft = false
description = "Java collection tutorial shows how to work with collections in Java. We present ArrayList, HashMap, HashSet, TreeMap, TreeSet, and Collections."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java collection

last modified January 27, 2024

 

In this article we deal with collections. Java provides specialized classes for
data storage and retrieval.

Java 5 introduced generic collections. The generic collections are more flexible
and they are the preferred way to work with data. Generic collections enhance
code reuse, type safety, and performance.

There are many classes in the collection framework. Some of them, like
ArrayBlockingQueue or IdentityHashMap, are specialized
containers used in specific situations. We will mention a few generic purpose
containers.

## Java ArrayList

ArrayList is a  dynamic, resizable array. It provides random access
to its elements. Random access means that we can grab any element in constant
time. ArrayList automatically expands as data is added. Unlike
arrays, an ArrayList can hold data of multiple data types. Elements
in the ArrayList are accessed via an integer index. Indexes are
zero based. Indexing of elements and insertion and deletion at the end of the
ArrayList takes constant time.

Inserting or deleting an element in the middle of the dynamic array is more costly.
It requires shifting all the latter elements over. The process takes linear time.

You can find out more about Java ArrayList in
[Java ArrayList](/java/arraylist/) tutorial.

com/zetcode/ArrayListSimpleEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayListSimpleEx {

    public static void main(String[] args) {

        List&lt;String&gt; distros = new ArrayList&lt;String&gt;();
        distros.add("Manjaro");
        distros.add("Xubuntu");
        distros.add("Fedora");
        distros.add("elementary");

        for (String distro : distros) {

            System.out.println(distro);
        }

        List&lt;String&gt; capitals = Arrays.asList("Prague", "Bratislava", "Warsaw",
                "Budapest", "Washington");

        for (String capital : capitals) {

            System.out.println(capital);
        }
    }
}

The example creates two lists and prints their contents.

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

The necessary classes are located in the java.util package.

List&lt;String&gt; distros = new ArrayList&lt;String&gt;();

A new ArrayList is created. The list can contain strings.
The type that a list can contain is given between the diamond brackets.

distros.add("Manjaro");
distros.add("Xubuntu");
distros.add("Fedora");
distros.add("elementary");

With the add method, we add four entries into the list.

for (String distro : distros) {

    System.out.println(distro);
}

We use the enhanced for loop to traverse the list.

List&lt;String&gt; capitals = Arrays.asList("Prague", "Bratislava", "Warsaw",
        "Budapest", "Washington");

We can use the Arrays.asList method to initialize a list.

An ArrayList can contain multiple data types.

com/zetcode/ArrayListMultipleEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;

class Base { }

public class ArrayListMultipleEx {

    public static void main(String[] args) {

        List da = new ArrayList();

        da.add("Java");
        da.add(3.5);
        da.add(55);
        da.add(new Base());

        for (Object el : da) {

            System.out.println(el);
        }
    }
}

The example creates an ArrayList collection. It contains various
data types.

import java.util.ArrayList;

From the java.util package, we import the ArrayList
class.

List da = new ArrayList();

An ArrayList collection is created.

da.add("Java");
da.add(3.5);
da.add(55);
da.add(new Base());

We add four elements to the array with the add method.

for (Object el : da) {

    System.out.println(el);
}

We iterate through the array list and print its elements
to the console.

$ java com.zetcode.ArrayListMultipleEx
Java
3.5
55
com.zetcode.Base@1535ac

Here we can see the output of the com.zetcode.ArrayListMultipleEx.

The next example will present some ArrayList methods.

com/zetcode/ArrayListMethodsEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ArrayListMethodsEx {

    public static void main(String[] args) {

        List&lt;String&gt; names = new ArrayList&lt;String&gt;();
        names.add("Jane");
        names.add("Thomas");
        names.add("Robin");
        names.add("David");
        names.add("Becky");

        System.out.println(names);
        names.set(1, "Tom");
        System.out.println(names);

        System.out.format("There are %d elements in the collection%n",
                names.size());

        names.remove(1);
        System.out.format("There are %d elements in the collection%n",
                names.size());

        System.out.println(names.get(3));

        System.out.println("************");

        Iterator&lt;String&gt; it = names.iterator();

        while (it.hasNext()) {

            System.out.println(it.next());
        }
    }
}

In the example we present some useful methods of the ArrayList
container.

List&lt;String&gt; names = new ArrayList&lt;String&gt;();

A generic ArrayList is created. We restrict the data type of
elements to String data type. This is done by writing the data type between
the &lt;&gt; characters.

names.add("Jane");
names.add("Thomas");
names.add("Robin");
names.add("David");
names.add("Becky");

We add five string elements to the array list.

System.out.println(names);

Putting the container as a parameter to the println method will
call the container's toString method. It transforms the collection
into a string.

names.set(1, "Tom");

The set method replaces the element at the specified index with the
given element. "Thomas" is replaced with "Tom".

System.out.format("There are %d elements in the collection%n",
        names.size());

The size of the ArrayList is determined by the size
method.

names.remove(1);

We remove the second element from the collection. The parameter is the index
to the collection.

System.out.println(names.get(3));

The get method retrieves the fourth element of the container.

Iterator&lt;String&gt; it = names.iterator();

while (it.hasNext()) {

    System.out.println(it.next());
}

We go through the container using the Iterator object. The
hasNext method checks if there are some elements left and the
next method retrieves the next element in the iteration.

$ java com.zetcode.ArrayListMethodsEx
[Jane, Thomas, Robin, David, Becky]
[Jane, Tom, Robin, David, Becky]
There are 5 elements in the collection
There are 4 elements in the collection
Becky
************
Jane
Robin
David
Becky

This is a sample output of the com.zetcode.ArrayListMethodsEx example.

In the next example, we continue presenting methods of ArrayList.

com/zetcode/ArrayListMethodsEx2.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;

public class ArrayListMethodsEx2 {

    public static void main(String[] args) {

        List&lt;String&gt; names = new ArrayList&lt;&gt;();

        names.add("Jane");
        names.add(0, "Thomas");
        names.add(1, "Robin");
        names.add("David");
        names.add("Becky");

        System.out.println(names);

        System.out.println(names.isEmpty());
        System.out.println(names.contains("Jane"));
        System.out.println(names.contains("Robert"));

        System.out.println(names.indexOf("Jane"));

        System.out.println(names.subList(1, 4));

        names.clear();
        System.out.println(names.isEmpty());
        System.out.println(names);
    }
}

We show another five methods that can be used to
work with ArrayLists.

List&lt;String&gt; names = new ArrayList&lt;&gt;();

Since Java 7 it is possible to omit the explicit type arguments in constructor
calls to generic classes. The compiler infers the parameter types for
constructors of generic classes.

names.add("Jane");
names.add(0, "Thomas");

The add method adds a new item to the container. The overloaded
second option specifies the index where the item will be placed. In the end, the
"Thomas" string is located before the "Jane" string.

System.out.println(names.isEmpty());

The empty method checks if the container is empty. The line returns
false. At this moment, we have five strings in the container.

System.out.println(names.contains("Jane"));

The contains method determines if the specified element
is present in the container.

System.out.println(names.indexOf("Jane"));

The indexOf method returns the index of the first occurrence of the
specified element, or -1 if the list does not contain the element.

System.out.println(names.subList(1, 4));

The subList method returns a slice of the list between the
specified indexes. The element at the first index is included in the slice, the
element at the second index is not.

names.clear();

The clear method removes all elements from the container.

$ java com.zetcode.ArrayListMethodsEx2
[Thomas, Robin, Jane, David, Becky]
false
true
false
2
[Robin, Jane, David]
true
[]

We can add other lists into a list.

com/zetcode/ListOfLists.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;

public class ListOfLists {

    public static void main(String[] args) {

        List&lt;Integer&gt; l1 = new ArrayList&lt;&gt;();
        l1.add(1);
        l1.add(2);
        l1.add(3);

        List&lt;Integer&gt; l2 = new ArrayList&lt;&gt;();
        l2.add(4);
        l2.add(5);
        l2.add(6);

        List&lt;Integer&gt; l3 = new ArrayList&lt;&gt;();
        l3.add(7);
        l3.add(8);
        l3.add(9);

        List&lt;List&lt;Integer&gt;&gt; nums = new ArrayList&lt;&gt;();
        nums.add(l1);
        nums.add(l2);
        nums.add(l3);

        System.out.println(nums);

        for (List&lt;Integer&gt; list : nums) {

            for (Integer n : list) {

                System.out.printf("%d ", n);
            }

            System.out.println();
        }
    }
}

The example creates three lists of integers. Later, the lists
are added into another fourth list.

List&lt;Integer&gt; l1 = new ArrayList&lt;&gt;();
l1.add(1);
l1.add(2);
l1.add(3);

A list of integers is created.

List&lt;List&gt; nums = new ArrayList&lt;&gt;();
nums.add(l1);
nums.add(l2);
nums.add(l3);

A list of lists is created.

for (List&lt;Integer&gt; list : nums) {

    for (Integer n : list) {

        System.out.printf("%d ", n);
    }

    System.out.println();
}

We use two for loops to go through all the elements.

$ java com.zetcode.ListOfListsEx
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
1 2 3
4 5 6
7 8 9

## Java traversing a list

In the next section we show how to traverse a list in Java.

com/zetcode/TraversingList.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;

public class TraversingList {

    public static void main(String[] args) {

        List&lt;String&gt; martialArts = new ArrayList&lt;&gt;();
        martialArts.add("Silat");
        martialArts.add("Wing chun");
        martialArts.add("Karate");
        martialArts.add("Judo");
        martialArts.add("Aikido");

        for (int i=0; i &lt; martialArts.size(); i++) {

            System.out.printf("%s ", martialArts.get(i));
        }

        System.out.print("\n");

        for (String e: martialArts) {

            System.out.printf("%s ", e);
        }

        System.out.print("\n");

        martialArts.forEach((e) -&gt; System.out.printf("%s ", e));

        System.out.print("\n");
    }
}

We have a list of strings; we show three ways to travers a list in Java.

for (int i=0; i &lt; martialArts.size(); i++) {

    System.out.printf("%s ", martialArts.get(i));
}

A list is traversed using the traditional for loop.

for (String e: martialArts) {

    System.out.printf("%s ", e);
}

Here the list is looped over with the enhanced for loop.

martialArts.forEach((e) -&gt; System.out.printf("%s ", e));

The third way uses the forEach method and a lambda expression.

$ java com.zetcode.TraversingList
Silat Wing chun Karate Judo Aikido
Silat Wing chun Karate Judo Aikido
Silat Wing chun Karate Judo Aikido

## Java LinkedList

LinkedList is a doubly linked list in Java. Insertions and removals
of elements take constant time. Linked lists provide sequential access to their
elements, which means that grabbing elements takes linear time. Because linked
lists need extra storage for references, they are impractical for lists of small
data items such as characters.

When comparing ArrayList with LinkedList, ArrayList
is fast for accessing a specific element but can be slow to add to either end,
and especially slow to delete in the middle. LinkedList is fast for
adding and deleting elements, but slow to access a specific element.

LinkedListEx.java
  

package com.zetcode;

import java.util.LinkedList;

public class LinkedListEx {

    public static void main(String[] args) {

        LinkedList&lt;Integer&gt; nums = new LinkedList&lt;&gt;();

        nums.add(5);
        nums.add(10);
        nums.add(13);
        nums.add(12);
        nums.add(15);
        nums.add(23);

        System.out.println(nums);

        nums.removeFirst();
        nums.removeLast();
        nums.addFirst(17);
        nums.addLast(77);

        System.out.println(nums);
    }
}

This is a LinkedList example with some of its methods.

LinkedList&lt;Integer&gt; nums = new LinkedList&lt;&gt;();

This LinkedList holds integer numbers.

nums.add(5);
nums.add(10);

We add numbers to the list. Autoboxing wraps primitive int types to the
Integer objects.

nums.removeFirst();
nums.removeLast();

These two methods remove the first and the last element from
the container.

nums.addFirst(17);
nums.addLast(77);

We add an element at the beginning and at the end of the list.

$ java com.zetcode.LinkedListEx
[5, 10, 13, 12, 15, 23]
[17, 10, 13, 12, 15, 77]

The elements contained by the linked list are printed twice
to the console.

## Java HashMap

HashMap is a container that stores key/value pairs. Each key is
associated with one value. Keys must be unique. This container type is called an
associative array or a dictionary in other programming languages. HashMaps take
more memory because for each value there is also a key.

Deletion and insertion operations take constant time. HashMaps can store null
values.

Learn more about hashmaps in [Java HaspMap](/java/hashmap/) tutorial.

com/zetcode/HashMapEx.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class HashMapEx {

    public static void main(String[] args) {

        Map&lt;String, String&gt; domains = new HashMap&lt;&gt;();

        domains.put("de", "Germany");
        domains.put("sk", "Slovakia");
        domains.put("us", "United States");
        domains.put("ru", "Russia");
        domains.put("hu", "Hungary");
        domains.put("pl", "Poland");

        System.out.println(domains.get("pl"));

        for (String item : domains.values()) {

            System.out.println(item);
        }

        Set keys = domains.keySet();

        System.out.println(keys);
    }
}

We have a HashMap where we map domain names to their country names.

Map&lt;String, String&gt; domains = new HashMap&lt;&gt;();

We create a HashMap with string keys and values.

domains.put("de", "Germany");
domains.put("sk", "Slovakia");
domains.put("us", "United States");
...

We put some data to the HashMap. The first string is the key.
The second is the value.

System.out.println(domains.get("pl"));

We retrieve a specific value by its key. For the retrieval
operation, we use the get method.

for (String item : domains.values()) {

    System.out.println(item);
}

The values method returns a collection of
values contained in the domains HashMap.
We go through the values with the for loop and print them
to the console.

Set keys = domains.keySet();

The keySet method returns the keys of the
HashMap in a Set collection. A
Set is a collection of unique elements.

System.out.println(keys);

The elements of the set are printed to the console.

$ java com.zetcode.HashMapEx
Poland
Germany
Slovakia
Hungary
Poland
United States
Russia
[de, sk, hu, pl, us, ru]

In the next example, we create a map of custom colour objects.

com/zetcode/HashMapEx2.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;

class Colour {

    private String name;
    private String code;

    public Colour(String name, String code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

public class HashMapEx2 {

    public static void main(String[] args) {

        Map&lt;Integer, Colour&gt; cols = new HashMap&lt;&gt;();

        cols.put(1, new Colour("AliceBlue", "#f0f8ff"));
        cols.put(2, new Colour("GreenYellow", "#adff2f"));
        cols.put(3, new Colour("IndianRed", "#cd5c5c"));
        cols.put(4, new Colour("khaki", "#f0e68c"));

        System.out.printf("The size of the map is %d%n", cols.size());

        int key = 4;

        if (cols.containsKey(key)) {

            System.out.printf("The map contains key %d%n", key);
        }

        cols.remove(1);

        System.out.printf("The size of the map is %d%n", cols.size());

        cols.replace(3, new Colour("VioletRed", "#d02090"));

        Colour col = cols.get(3);

        System.out.printf("Colour name:%s colour code:%s %n",
                col.getName(), col.getCode());
    }
}

In this example, we present the following three methods:
containsKey, remove, and replace.

class Colour {

    private String name;
    private String code;

    public Colour(String name, String code) {
        this.name = name;
        this.code = code;
    }
...
}

The custom colour object contains colour name and colour code attributes.

Map&lt;Integer, Colour&gt; cols = new HashMap&lt;&gt;();

A map is created where keys are integers and values are Colour
objects.

if (cols.containsKey(key)) {

    System.out.printf("The map contains key %d%n", key);
}

The containsKey method determines whether the key is present
in the map.

cols.remove(1);

The remove method removes the object with the specified key
from the map.

cols.replace(3, new Colour("VioletRed", "#d02090"));

The replace method replaces the entry for the specified key.

$ java com.zetcode.HashMapEx2
The size of the map is 4
The map contains key 4
The size of the map is 3
Colour name:VioletRed colour code:#d02090

## Counting words

In the following example we count the occurrences of words in a text file.
We use HashMap to store words and their occurrences.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.
It took place simultaneously with the naval battle at Artemisium, in August
or September 480 BC, at the narrow coastal pass of Thermopylae.
The Persian invasion was a delayed response to the defeat of the first Persian
invasion of Greece, which had been ended by the Athenian victory at the Battle
of Marathon in 490 BC. Xerxes had amassed a huge army and navy, and set out to
conquer all of Greece.

We read content from thermopylae.txt file. The file is located in the
src/resources/ directory.

com/zetcode/CountingWordsEx.java
  

package com.zetcode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CountingWordsEx {

    public static void main(String[] args) throws IOException {

        Map&lt;String, Integer&gt; wordCount = new HashMap&lt;&gt;();

        String fileName = "src/resources/thermopylae.txt";

        List&lt;String&gt; lines = Files.readAllLines(Paths.get(fileName),
                StandardCharsets.UTF_8);

        for (String line : lines) {

            String[] words = line.split("\\s+");

            for (String word : words) {

                if (word.endsWith(".") || word.endsWith(",")) {
                    word = word.substring(0, word.length()-1);
                }

                if (wordCount.containsKey(word)) {
                    wordCount.put(word, wordCount.get(word) + 1);

                } else {
                    wordCount.put(word, 1);
                }
            }
        }

        for (String key : wordCount.keySet()) {
            System.out.println(key + ": " + wordCount.get(key));
        }
    }
}

The example reads text from a file, splits the sentences into words and counts
their frequency in the text.

Map&lt;String, Integer&gt; wordCount = new HashMap&lt;&gt;();

The wordCount is a map, where keys are words and the frequency
is an integer.

String fileName = "src/resources/thermopylae.txt";

List&lt;String&gt; lines = Files.readAllLines(Paths.get(fileName),
        StandardCharsets.UTF_8);

We read all content in one shot with the Files.readAllLines method.

for (String line : lines) {

    String[] words = line.split("\\s+");
...

We go through the lines and split them into words; the words are separated by
spaces.

if (word.endsWith(".") || word.endsWith(",")) {
    word = word.substring(0, word.length()-1);
}

We remove trailing dots and commas.

if (wordCount.containsKey(word)) {
    wordCount.put(word, wordCount.get(word) + 1);

} else {
    wordCount.put(word, 1);
}

If the word is already in the map, we increase its frequency; otherwise
we insert it into the map and set its frequency to one.

for (String key : wordCount.keySet()) {
    System.out.println(key + ": " + wordCount.get(key));
}

We iterate over the map and print its key/value pairs.

$ java com.zetcode.CountingWordsEx
been: 1
Athenian: 1
alliance: 1
navy: 1
fought: 1
led: 1
delayed: 1
had: 2
during: 1
three: 1
second: 1
Greece: 3
Leonidas: 1
...

This is a partial output of the example.

## Java TreeMap

TreeMap is a map that is sorted according to the natural ordering
of its keys. While a HashMap is more time-efficient, a
TreeMap is more space-efficient.

com/zetcode/TreeMapEx.java
  

package com.zetcode;

import java.util.TreeMap;

public class TreeMapEx {

    public static void main(String[] args) {

        TreeMap&lt;String, String&gt; domains = new TreeMap&lt;&gt;();

        domains.put("de", "Germany");
        domains.put("sk", "Slovakia");
        domains.put("us", "United States");
        domains.put("ru", "Russia");
        domains.put("hu", "Hungary");
        domains.put("pl", "Poland");

        System.out.println(domains);
        System.out.println(domains.descendingMap());
    }
}

In the example, we create a TreeMap and put domains with
their country names into it.

TreeMap&lt;String, String&gt; domains = new TreeMap&lt;&gt;();

A TreeMap is created.

System.out.println(domains);

This will print the keys/values in their natural sort order — in ascending order.

System.out.println(domains.descendingMap());

THe descendingMap method returns a reverse order view of the mappings
contained in this map.

$ java com.zetcode.TreeMapEx
{de=Germany, hu=Hungary, pl=Poland, ru=Russia, sk=Slovakia, us=United States}
{us=United States, sk=Slovakia, ru=Russia, pl=Poland, hu=Hungary, de=Germany}

The com.zetcode.TreeMapEx program printed keys with their
values in ascending and descending sort order.

## Java HashSet

HashSet is a collection that contains no duplicate elements. This
class offers constant time performance for the basic operations (add, remove,
contains, and size). HashSet does not provide ordering of elements.

com/zetcode/HashSetEx.java
  

package com.zetcode;

import java.util.HashSet;
import java.util.Set;

public class HashSetEx {

    public static void main(String[] args) {

        Set&lt;String&gt; brands = new HashSet&lt;&gt;();

        brands.add("Pepsi");
        brands.add("Amazon");
        brands.add("Volvo");
        brands.add("IBM");
        brands.add("IBM");

        System.out.println(brands);

        System.out.println(brands.isEmpty());
        System.out.println(brands.contains("Volvo"));
        brands.remove("Volvo");
        System.out.println(brands.contains("Volvo"));

        brands.clear();
        System.out.println(brands);
    }
}

There can be only one brand registered under a name. So the brand names is a good
example for a HashSet.

Set&lt;String&gt; brands = new HashSet&lt;&gt;();

brands.add("Pepsi");
brands.add("Amazon");
brands.add("Volvo");
brands.add("IBM");
brands.add("IBM");

We create a HashSet and add new elements. The IBM brand is added
twice. However, the IBM is present in the container only once.

System.out.println(brands);

We print all the elements in one shot.

System.out.println(brands.isEmpty());

The isEmpty method checks if the container is empty.

System.out.println(brands.contains("Volvo"));

With the contains method we check if the Volvo
brand is present in the brands container. The line prints true.

brands.remove("Volvo");
System.out.println(brands.contains("Volvo"));

We remove the Volvo brand from the brands container. The second line
prints false.

brands.clear();

The clear method removes all of the elements from the set.

$ java com.zetcode.HashSetEx
[IBM, Pepsi, Volvo, Amazon]
false
true
false
[]

## Java TreeSet

TreeSet is a set which has elements ordered using their natural
ordering. TreeSet is slower than HashSet.
HashSet can contain null values, while TreeSet cannot.

com/zetcode/TreeSetEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

public class TreeSetEx {

    public static void main(String[] args) {

        List&lt;String&gt; brands = new ArrayList&lt;&gt;();

        brands.add("Pepsi");
        brands.add("Amazon");
        brands.add("Volvo");
        brands.add("IBM");
        brands.add("HP");
        brands.add("Apple");
        brands.add("Starbucks");

        TreeSet&lt;String&gt; brands2 = new TreeSet&lt;&gt;();
        brands2.addAll(brands);

        System.out.println(brands2);
        System.out.println(brands2.descendingSet());

        System.out.println(brands2.first());
        System.out.println(brands2.last());

        System.out.println(brands2.headSet("IBM", true));
        System.out.println(brands2.tailSet("IBM", false));
        System.out.println(brands2.subSet("Apple", true, "Starbucks", true));
    }
}

In this example, we work with a TreeSet.

List&lt;String&gt; brands = new ArrayList&lt;&gt;();

brands.add("Pepsi");
brands.add("Amazon");
brands.add("Volvo");
brands.add("IBM");
brands.add("HP");
brands.add("Apple");
brands.add("Starbucks");

An ArrayList of various brands is created.

TreeSet&lt;String&gt; brands2 = new TreeSet&lt;&gt;();
brands2.addAll(brands);

With the help of the addAll method, a new
TreeSet is created from the ArrayList container.

System.out.println(brands2);
System.out.println(brands2.descendingSet());

The elements of the container are printed to the console in ascending
and descending orders.

System.out.println(brands2.first());
System.out.println(brands2.last());

We print the first and the last element of the container.

System.out.println(brands2.headSet("IBM", true));

The headSet method returns a slice of the set whose
elements are less than the specified element. The second parameter
controls whether the specified element is included.

System.out.println(brands2.tailSet("IBM", false));

The tailSet method returns a slice of the set whose
elements are greater than the specified element.

System.out.println(brands2.subSet("Apple", true, "Starbucks", true));

The subSet method returns a portion of the container
whose elements range from the first specified element to the second one.

$ java com.zetcode.TreeSetEx
[Amazon, Apple, HP, IBM, Pepsi, Starbucks, Volvo]
[Volvo, Starbucks, Pepsi, IBM, HP, Apple, Amazon]
Amazon
Volvo
[Amazon, Apple, HP, IBM]
[Pepsi, Starbucks, Volvo]
[Apple, HP, IBM, Pepsi, Starbucks]

## Java Collections class

Collections is a utility class that provides many useful methods
for working with containers. It consists exclusively of static methods. Some of
the methods are not applicable to all collection types. For example, it is not
possible to use the sort method on a HashSet, because
this container does not support ordered elements.

com/zetcode/CollectionsEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CollectionsEx {

    public static void main(String[] args) {

        Integer[] nums = { 4, 3, 2, 4, 5, 6, 4, 2, 7, 8, 9, 0, 1 };

        List&lt;Integer&gt; ns = new ArrayList&lt;&gt;(Arrays.asList(nums));
        System.out.println("Default order:");
        System.out.println(ns);

        System.out.println("Ascending order:");
        Collections.sort(ns);
        System.out.println(ns);

        System.out.println("Descending order:");
        Collections.reverse(ns);
        System.out.println(ns);

        System.out.println("Swapping the first and the last elements:");
        Collections.swap(ns, 0, ns.size()-1);
        System.out.println(ns);

        System.out.println("Replacing all 4s with 0s:");
        Collections.replaceAll(ns, 4, 0);
        System.out.println(ns);

        System.out.println("Random order:");
        Collections.shuffle(ns);
        System.out.println(ns);

        System.out.println(Collections.max(ns));
        System.out.println(Collections.min(ns));
    }
}

In the example, we use several methods of the Collections class.

Integer[] nums = { 4, 3, 2, 4, 5, 6, 4, 2, 7, 8, 9, 0, 1 };

ArrayList&lt;Integer&gt; ns = new ArrayList&lt;&gt;(Arrays.asList(nums));

An ArrayList is created from an array of Integers. The
asList method of the Arrays class is used to transform
an array into a list which is then passed to the constructor.

Collections.sort(ns);

The sort method sorts the elements in ascending order.

Collections.reverse(ns);

The reverse method reverses the order of elements in
the list.

Collections.swap(ns, 0, ns.size()-1);

The swap method exchanges two elements. The first element
with the last element in our case.

Collections.replaceAll(ns, 4, 0);

This line replaces all occurrences of number 4 with 0.

Collections.shuffle(ns);

The shuffle method randomly reorders the elements
in the container.

System.out.println(Collections.max(ns));
System.out.println(Collections.min(ns));

Here we print the maximum and the minimum values of the list.

$ java com.zetcode.CollectionsEx
Default order:
[4, 3, 2, 4, 5, 6, 4, 2, 7, 8, 9, 0, 1]
Ascending order:
[0, 1, 2, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9]
Descending order:
[9, 8, 7, 6, 5, 4, 4, 4, 3, 2, 2, 1, 0]
Swapping the first and the last elements:
[0, 8, 7, 6, 5, 4, 4, 4, 3, 2, 2, 1, 9]
Replacing all 4s with 0s:
[0, 8, 7, 6, 5, 0, 0, 0, 3, 2, 2, 1, 9]
Random order:
[1, 6, 2, 8, 0, 2, 0, 9, 5, 0, 7, 3, 0]
9
0

This is a sample output of the com.zetcode.CollectionsEx program.

## Source

[Java Collection - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collection.html)

In this article we have worked with collections in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).