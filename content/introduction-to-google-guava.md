+++
title = "Introduction to Google Guava"
date = 2025-08-29T19:59:00.923+01:00
draft = false
description = "Guava tutorial introduces basics of the Guava library. We look at some interesting features of the Guava library."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Google Guava

last modified January 27, 2024

 

This tutorial is an introduction to the Guava library. We look at some
interesting features of the Guava library.

## Guava

Google Guava is an open-source set of common libraries for Java,
mainly developed by Google engineers. Google has many Java projects. Guava is a
solution for many common problems encountered in those projects, including areas
of collections, math, functional idioms, input &amp; output, and strings.

Some of the Guava's features were already included in the JDK; for instance the
String.join method was introduced into JDK 8.

## Guava Maven dependency

In our examples, we use the following dependency.

implementation 'com.google.guava:guava:31.1-jre'

## Guava initializing collections

Guava allows to initialize collections in one line.

com/zetcode/InitializeCollectionEx.java
  

package com.zetcode;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import java.util.List;
import java.util.Map;

public class InitializeCollectionEx {

    public static void main(String[] args) {

        Map items = ImmutableMap.of("coin", 3, "glass", 4, "pencil", 1);

        items.entrySet()
                .stream()
                .forEach(System.out::println);
        
        List&lt;String&gt; fruits = Lists.newArrayList("orange", "banana", "kiwi", 
                "mandarin", "date", "quince");
        
        for (String fruit: fruits) {
            System.out.println(fruit);
        }
    }
}

In the example, we create a map and a list using Guava's factory methods.

Map items = ImmutableMap.of("coin", 3, "glass", 4, "pencil", 1);

A new map is created with the ImmutableMap.of method.

List&lt;String&gt; fruits = Lists.newArrayList("orange", "banana", "kiwi", 
        "mandarin", "date", "quince");

A new list of strings is created with the Lists.newArrayList method.

$ gradle run -q
coin=3
glass=4
pencil=1
orange
banana
kiwi
mandarin
date
quince

## Guava FluentIterable

FluentIterable provides a powerful yet simple API for manipulating
Iterable instances in a fluent manner. It allows us to filter and
transform collections in various ways.

com/zetcode/FluentIterableEx.java
  

package com.zetcode;

import com.google.common.base.Functions;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Lists;
import java.util.List;

public class FluentIterableEx {

    public static void main(String[] args) {

        List&lt;Car&gt; cars = Lists.newArrayList(new Car(1, "Audi", 52642),
            new Car(2, "Mercedes", 57127), new Car(3, "Skoda", 9000),
            new Car(4, "Volvo", 29000));

        Predicate&lt;Car&gt; byPrice = car -&gt; car.price() &lt;= 30000;

        List&lt;String&gt; results = FluentIterable.from(cars)
                .filter(byPrice)
                .transform(Functions.toStringFunction())
                .toList();
        
        System.out.println(results);
    }
}

record Car(int id, String name, int price) {}

In the code example, we have a list of car objects. We transform the list by 
reducing it only to cars which are less expensive than 30000 units.

List&lt;Car&gt; cars = Lists.newArrayList(new Car(1, "Audi", 52642),
        new Car(2, "Mercedes", 57127), new Car(3, "Skoda", 9000),
        new Car(4, "Volvo", 29000));

A list of Car objects is created. There are no collection literals
in JDK. We use Lists.newArrayList from Guava to initialize the list.

Predicate&lt;Car&gt; byPrice = car -&gt; car.price() &lt;= 30000;

A Predicate is created. A predicate is a function that returns a
boolean value. This predicate determines whether the car is less expensive than
30000.

List&lt;String&gt; results = FluentIterable.from(cars)
        .filter(byPrice)
        .transform(Functions.toStringFunction())
        .toList();

A FluentIterable is created from the cars collection.
The predicate function is applied on the FluentIterable. The retrieved
elements are transformed into a list of elements; the elements are strings
returned from the toString function.

$ gradle run -q
[Car[id=3, name=Skoda, price=9000], Car[id=4, name=Volvo, price=29000]]

## Guava predicate

In general meaning, a predicate is a statement about something that 
is either true or false.

The Predicates.notNull returns a predicate that evaluates 
to true if the object reference being tested is not null.

com/zetcode/PredicateEx.java
  

package com.zetcode;

import com.google.common.base.Predicates;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import java.util.List;

public class PredicateEx {

    public static void main(String[] args) {

        List&lt;Integer&gt; values = Lists.newArrayList(3, null, 4, 7, 
                8, null, 7);
        
        Iterable&lt;Integer&gt; filtered = Iterables.filter(values, 
                Predicates.notNull());
        
        for (Integer i: filtered) {
            System.out.println(i);
        }
    }
}

In the first example, we use a predicate to exclude null values 
from a collection.

List&lt;Integer&gt; values = Lists.newArrayList(3, null, 4, 7, 
        8, null, 7);

Using Guava's Lists.newArrayList, we create a list of
Integer values. The list contains two nulls.

Iterable&lt;Integer&gt; filtered = Iterables.filter(values, 
        Predicates.notNull());

We filter the values by applying the Predicates.notNull.
The Iterables.filter returns an iterable object.

for (Integer i: filtered) {
    System.out.println(i);
}

We go through the filtered list and print its elements.

$ gradle run -q
3
4
7
8
7

The second example filters a collection by a specific textual pattern. In
programming, predicates are often used to filter data.

com/zetcode/PredicateEx2.java
  

package com.zetcode;

import com.google.common.base.Predicates;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import java.util.Collection;
import java.util.List;

public class PredicateEx2 {

    public static void main(String[] args) {

        List&lt;String&gt; items = Lists.newArrayList("coin", "book",
                "cup", "purse", "bottle");
        Collection&lt;String&gt; result  = Collections2.filter(items, 
                Predicates.containsPattern("o"));
        
        for (String item: result) {
            System.out.println(item);
        }
    }
}

The code example creates a list of items and later filters the 
list by a specific pattern.

Collection&lt;String&gt; result = Collections2.filter(items, 
        Predicates.containsPattern("o"));

The Predicates.containsPattern returns a predicate that
looks for items containing character 'o'. The predicate is passed to 
the Collections2.filter method.

$ gradle run -q
coin
book
bottle

## Reading all lines with Guava

The Files.readLines allows to read all lines from a file in one
shot.

resources/balzac.txt
  

Honoré de Balzac, original name Honoré Balzac (born May 20, 1799, Tours, 
France—died August 18, 1850, Paris) French literary artist who produced 
a vast number of novels and short stories collectively called 
La Comédie humaine (The Human Comedy). He helped to establish the traditional 
form of the novel and is generally considered to be one of the greatest 
novelists of all time.

We have this textual file in the src/main/resources directory. 

com/zetcode/ReadingLinesEx.java
  

package com.zetcode;

import com.google.common.base.Charsets;
import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class ReadingLinesEx {

    public static void main(String[] args) throws IOException {
        
        String fileName = "src/main/resources/balzac.txt";
        
        List&lt;String&gt; lines = Files.readLines(new File(fileName), 
                Charsets.UTF_8);
        
        for (String line: lines) {

            System.out.println(line);
        }
    }
}

The example reads all lines from the balzac.txt file
and prints them to the console.

String fileName = "src/main/resources/balzac.txt";

The file name is located in the src/main/resource directory.

List&lt;String&gt; lines = Files.readLines(new File(fileName), 
        Charsets.UTF_8);

With the Files.readLines method, we read all lines 
from the balzac.txt file. The lines are stored in
the list of strings.

for (String line: lines) {

    System.out.println(line);
}

We go through the list and print its elements.

## Creating a new file with Guava

The Files.touch method is used to create a new file or 
to update the timestamp on an existing file. The method is similar to
the Unix touch command.

com/zetcode/TouchFileEx.java
  

package com.zetcode;

import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;

public class TouchFileEx {

    public static void main(String[] args) throws IOException {
        
        String newFileName = "newfile.txt";
        
        Files.touch(new File(newFileName));
    }
}

The example creates a newfile.txt in the project's
root directory.

## Writing to a file with Guava

The Files.write method writes data to a file.

com/zetcode/WriteToFileEx.java
  

package com.zetcode;

import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;

public class WriteToFileEx {

    public static void main(String[] args) throws IOException {
        
        String fileName = "fruits.txt";
        File file = new File(fileName);
        
        String content = "banana, orange, lemon, apple, plum";
        
        Files.write(content.getBytes(), file);
    }
}

The example writes a string consisting of fruit names to 
the fruits.txt file. The file is created in the project
root directory.

## Joining strings with Guava

The Joiner joins pieces of text (specified as an array, Iterable, varargs, 
or a Map) with a separator.

com/zetcode/StringJoinerEx.java
  

package com.zetcode;

import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import java.util.List;

public class StringJoinerEx {
    
    public static void main(String[] args) {
        
        List&lt;String&gt; myList = Lists.newArrayList("8", "2", "7", "10");
        
        String result = Joiner.on(",").join(myList);
        
        System.out.println(result);
    }
}

In the example, we join elements of a list with a comma character.

## Splitting strings with Guava

The Splitter extracts non-overlapping substrings from an input string by
recognizing appearances of a separator sequence.

com/zetcode/StringSplitterEx.java
  

package com.zetcode;

import com.google.common.base.Splitter;
import java.util.List;

public class StringSplitterEx {
    
    public static void main(String[] args) {
        
        String input = "There is a dog in the garden.";
        
        List&lt;String&gt; words = Splitter.on(" ").splitToList(input);
        
        for (String word: words) {
            System.out.println(word);
        }
    }
}

The example uses the Splitter to split a sentence into words.

String input = "There is a dog in the garden.";

We have a sentence consisting of seven words.

List&lt;String&gt; words = Splitter.on(" ").splitToList(input);

The separator is a single space character. The splitToList 
method splits the input into a list of strings.

The second example splits the input into three substrings.

com/zetcode/StringSplitterEx2.java
  

package com.zetcode;

import com.google.common.base.Splitter;
import java.util.List;

public class StringSplitterEx2 {
    
    public static void main(String[] args) {
        
        String input = "coin, pencil, chair, bottle, soap";
        
        List&lt;String&gt; words = Splitter.on(",")
                .trimResults()
                .limit(3)
                .splitToList(input);
        
        for (String word: words) {
            System.out.println(word);
        }
    }
}

In addition, the words are trimmed.

## Guava preconditions

Preconditions are simple static methods to be called at the start 
of our own methods to verify correct arguments and state. The methods
throw IllegalArgumentException on failure.

com/zetcode/PreconditionsEx.java
  

package com.zetcode;

import static com.google.common.base.Preconditions.checkArgument;
import com.google.common.base.Splitter;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

public class PreconditionsEx {

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        System.out.print("Enter items: ");
        String input = br.readLine();

        List&lt;String&gt; items = Splitter.on(" ").splitToList(input);
        OutputItems(items);
    }

    public static void OutputItems(List&lt;String&gt; items) {
        checkArgument(items != null, "The list must not be null");
        checkArgument(!items.isEmpty(), "The list must not be empty");

        for (String item: items) {
            System.out.println(item);
        }
    }
}

The example uses two preconditions.

BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
System.out.print("Enter items: ");
String input = br.readLine();

We read input from the user. We expect a list of words.

List&lt;String&gt; items = Splitter.on(" ").splitToList(input);
OutputItems(items);

The words specified are split into a list and the list is 
passed to the OutputItems method

checkArgument(items != null, "The list must not be null");
checkArgument(!items.isEmpty(), "The list must not be empty");

In the OutputItems method we check that the list
is not null and empty. With the checkArgument method
we ensure the validity of an expression; e.g. that the list is not null.

## Calculating factorial with Guava

Guava has also tools for doing math calculations. The BigIntegerMath.factorial
computes a factorial.

com/zetcode/FactorialEx.java
  

package com.zetcode;

import com.google.common.math.BigIntegerMath;

public class FactorialEx {

    public static void main(String[] args) {

        System.out.println(BigIntegerMath.factorial(100));
    }
}

The example prints the factorial of number 100.

$ gradle run -q
93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000

## Calculating binomial with Guava

The BigIntegerMath.binomial returns the binomial coefficient of
n and k.

com/zetcode/FactorialEx.java
  

package com.zetcode;

import com.google.common.math.BigIntegerMath;
import java.math.BigInteger;

public class BinomialEx {
    
    public static void main(String[] args) {
        
        BigInteger bigInt = BigIntegerMath.binomial(4, 2);
        System.out.println(bigInt);
    }
}

The example prints the binomial of 4 and 2.

## Guava CharMatcher

CharMatcher provides some basic text processing methods.

com/zetcode/CharMatcherEx.java
  

package com.zetcode;

import com.google.common.base.CharMatcher;

public class CharMatcherEx {

    public static void main(String[] args) {

        String input = "Peter17";

        CharMatcher matcher = CharMatcher.JAVA_LETTER;
        String result = matcher.retainFrom(input);
        
        System.out.println(result);
    }
}

The example removes any non-letter characters from the input string.
The retainFrom method returns a string containing all 
matching characters of a character sequence, in order.

In the second example, we count the number of characters in the input strings.

com/zetcode/CharMatcherEx2.java
  

package com.zetcode;

import com.google.common.base.CharMatcher;

public class CharMatcherEx2 {

    public static void main(String[] args) {

        String input = "Beautiful sunny day";
        
        int n1  = CharMatcher.is('n').countIn(input);
        System.out.format("Number of n characters: %d%n", n1);

        int n2  = CharMatcher.is('i').countIn(input);
        System.out.format("Number of i characters: %d", n2);
    }
}

The example counts the number of 'n' and 'i' characters in the input string.

int n1  = CharMatcher.is('n').countIn(input);

The countIn method returns the number of matching characters 
found in the character sequence.

$ gradle run -q
Number of n characters: 2
Number of i characters: 1

The CharMatcher.whitespace determines whether the character is a
white space.

com/zetcode/CharMatcherEx3.java
  

package com.zetcode;

import com.google.common.base.CharMatcher;

public class CharMatcherEx3 {

    public static void main(String[] args) {

        String input = "   yogurt \t";

        String result = CharMatcher.whitespace().trimFrom(input);

        System.out.println(input + " and bread" );
        System.out.println(result + " and bread");
    }
}

In the third example, we remove white space from the string.

String result = CharMatcher.whitespace().trimFrom(input);

The white space is removed from the input string.

$ gradle run -q
    yogurt        and bread
 yogurt and bread

## Guava Ranges

Range allows to create various ranges easily. A range, or interval,
defines the boundaries around a contiguous span of values; for example, integers
from 1 to 10 inclusive. 

com/zetcode/RangeEx.java
  

package com.zetcode;

import com.google.common.collect.Range;

public class RangeEx {

    public static void main(String[] args) {
        
        Range&lt;Integer&gt; range1 = Range.closed(3, 8);
        System.out.println(range1);
        
        Range&lt;Integer&gt; range2 = Range.openClosed(3, 8);
        System.out.println(range2);

        Range&lt;Integer&gt; range3 = Range.closedOpen(3, 8);
        System.out.println(range3);
    }
}

In the example, we create three integer intervals.

## Source

[Guava Github page](https://github.com/google/guava)

In this article we have worked with the Google Guava library. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).