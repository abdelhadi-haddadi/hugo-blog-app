+++
title = "Java external vs internal iterator"
date = 2025-08-29T19:58:36.319+01:00
draft = false
description = "Java external vs internal iterator shows the difference between external and internal iterator in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java external vs internal iterator

last modified January 27, 2024

 

Java external vs internal iterator shows the difference between external and 
internal iterator in Java.

Iterator is an object that enables a programmer to traverse containers such as lists
and maps.

## Iterator types

There are two types of iterators: external and internal.
An external iterator is active, an internal is passive.

When the client (i.e. the programmer) controls the iteration, the iterator is
called external iterator. When the iterator controls it, it is called an internal
iterator.

Generally, it is recommended to use internal iterator over external iterator. 
Internal iteration is less error prone, more readable, and requires less code.
On the other hand, external iterator is sometimes more flexible; for instance,
when doing an operation for two collections in a loop.

## Java External Iterator examples

The following examples show the usage of external iterators.

JavaExternalIterationEx.java
  

package com.zetcode;

import java.util.List;

public class JavaExternalIterationEx {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("hello", "sky", "there", "den", "sky");

        for (String word: words) {

            System.out.printf("The word %s has %d characters%n",
                    word, word.length());
        }
    }
}

In the example, we use an external iterator to go through the list of words
and print its elements and their size in characters.

The word hello has 5 characters
The word sky has 3 characters
The word there has 5 characters
The word den has 3 characters
The word sky has 3 characters

### ConcurrentModificationException

When we use an external iteration with enhanced-for loop and modify the elements 
of a collection, we may receive the ConcurrentModificationException.

JavaExternalIterationEx2.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JavaExternalIterationEx2 {

    public static void main(String[] args) {

        List&lt;String&gt; words = new ArrayList&lt;&gt;(Arrays.asList("pen", "pencil",
                "sky", "blue", "sky", "dog"));

        for (String word: words) {

            if ("sky".equals(word)) {

                words.remove(word);
            }
        }

        System.out.println(words);
    }
}

In the example, we want to remove all words that equal to "sky" from 
a list. This is for demonstrational purposes; since Java 8 we can easily
remove elements with removeIf method: 
words.removeIf(e -&gt; "sky".equals(e));

Exception in thread "main" java.util.ConcurrentModificationException

Running the example leads to ConcurrentModificationException.

Other forms of external iteration in Java work.

Iterator&lt;String&gt; iter = words.iterator();

while (iter.hasNext()) {
    String s = iter.next();

    if ("sky".equals(s)) {
        iter.remove();
    }
}

The example works OK with the old-school iteration with while loop.

for (int i=words.size() - 1; i&gt;=0; i--) {

    if ("sky".equals(words.get(i))) {
        words.remove(i);
    }
}

It also works with the traditional for loop.

Also note that using for each loop in such a case does not lead to
error in all languages. For instance, Python 3 or Perl 6 work OK.
On the other hand, JavaScript and C++ end up in errors, too.

extit.py
  

#!/usr/bin/python3

words = ["pen", "pencil", "dog", "sky", "blue", "sky"]

print(len(words))

for word in words:
    if word == "sky":
        words.remove(word)

print(words)
print(len(words))

This is an equivalent code in Python 3. It works OK.

## Java Internal Iterator example

In the following examples, we use internal iterators.

JavaInternalIteratorEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JavaInternalIteratorEx {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("hello", "sky", "there", "den", "sky");

        words.stream().forEach(e -&gt; 
                System.out.printf("The word %s has %d characters %n", e, e.length()));
    }
}

The example goes over all elements of a list and prints them and their size.

JavaInternalIteratorEx2.java
  

package com.zetcode;

import java.util.List;
import java.util.stream.Collectors;

public class JavaInternalIteratorEx2 {

    public static void main(String[] args) {

        List&lt;String&gt; words = List.of("hello", "sky", "there", "den", "sky");

        List&lt;String&gt; words2 = words.stream().filter(e -&gt; !"sky".equals(e))
                                    .collect(Collectors.toList());

        System.out.println(words2);
    }
}

Using modern functional Java, we show how to create a new immutable list that does 
not contain the "sky" word.

[hello, there, den]

## Source

[Java Iterator - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Iterator.html)

In this article we have talked about external and internal iterator in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).