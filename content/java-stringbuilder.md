+++
title = "Java StringBuilder"
date = 2025-08-29T20:00:36.947+01:00
draft = false
description = "Java StringBuilder tutorial shows how to use StringBuilder in Java. StringBuilder is a mutable sequence of characters. The examples demonstrate how to modify strings with StringBuilder."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringBuilder

last modified January 27, 2024

 

Java StringBuilder tutorial shows how to use StringBuilder in Java.
Java String objects are immutable; it is only possible to create
mofied copies of the original string. When we need to modify strings in-place,
we use StringBuilder.

## StringBuilder

StringBuilder is a mutable sequence of characters.
StringBuilder is used when we want to modify Java strings in-place.
StringBuffer is a thread-safe equivalent similar of
StringBuilder.

StringBuilder has methods such as append,
insert, or replace that allow to modify strings.

## Java StringBuilder constructors

StringBuilder has four constructors:

ConstructorDescription

StringBuilder()creates an empty a string builder with an initial capacity of 16 characters
StringBuilder(CharSequence seq)creates a string builder from a CharSequence
StringBuilder(int capacity)creates an empty string builder with the specified initial
StringBuilder(String str)creates a string builder from the specified string

## Java StringBuilder is mutable

Java String is immutable while StringBuilder is mutable.

com/zetcode/MutableImmutableEx.java
  

package com.zetcode;

public class MutableImmutableEx {
    
    public static void main(String[] args) {
        
        var word = "rock";
        var word2 = word.replace('r', 'd');

        System.out.println(word2);

        var builder = new StringBuilder("rock");
        builder.replace(0, 1, "d");

        System.out.println(builder);
    }
}

The example demonstrates the main difference between String and 
StringBuilder.

var word2 = word.replace('r', 'd');

Java String has a replace method but it does
not modify the original string. It creates a modifed copy instead.

var builder = new StringBuilder("rock");
builder.replace(0, 1, "d");

On the other hand, StringBuilder replaces the string in-place.

dock
dock

## Java StringBuilder append method

StringBuilder contains several overload append
methods that add a value at the end of the string.

com/zetcode/StringBuilderEx.java
  

package com.zetcode;

import java.util.stream.LongStream;

public class StringBuilderAppendEx {
    
    private final static long MAX_VAL = 500;

    public static void main(String[] args) {

        var builder = new StringBuilder();

        var sum = LongStream.rangeClosed(0, MAX_VAL).sum();
        
        LongStream.rangeClosed(1, MAX_VAL).forEach(e -&gt; {
        
            builder.append(e);
            
            if (e % 10 == 0) {
                builder.append("\n");
            }
            
            if (e &lt; MAX_VAL) {
                builder.append(" + ");
            } else {
                builder.append(" = ");
            }
        });
        
        builder.append(sum);
        
        System.out.println(builder);
    }
}

The example builds one big string from hundreds of small strings. The string has
the following form: 1 + 2 + 3 + ... + MAX_VAL = SUM.

var builder = new StringBuilder();

An empty StringBuilder is created.

LongStream.rangeClosed(1, MAX_VAL).forEach(e -&gt; {

A range of values 1..MAX_VAL is created. We iterate over
these values with the forEach method.

builder.append(e);

We append the current value to the string builder with the append
method.

if (e % 10 == 0) {
    builder.append("\n");
}

In order for the output to fit the screen, we add a newline character after each 
ten values.

if (e &lt; MAX_VAL) {
    builder.append(" + ");
} else {
    builder.append(" = ");
}

Between the values, we add either the "+" or the "=" characters.

builder.append(sum);

At the end of the string, we add the sum of values.

System.out.println(builder);

Finally, the string is printed to the console.

## Java StringBuilder insert method

The insert method is used to insert a string into 
the specified position of the builder.

com/zetcode/StringBuilderInsertEx.java
  

package com.zetcode;

public class StringBuilderInsertEx {

    public static void main(String[] args) {
        
        var sentence = "There is a red fox in the forest.";
        var builder = new StringBuilder(sentence);

        builder.insert(19, "and a wolf ");

        System.out.println(builder);
    }
}

The example inserts a string into a sentence with the insert 
method.

There is a red fox and a wolf in the forest.

We have created this sentence.

## Getting indexes of substrings

The indexOf method returns the first occurrence of a substring 
while the lastIndexOf method returns the last occurrence. 

com/zetcode/StringBuilderIndexesEx.java
  

package com.zetcode;

public class StringBuilderIndexesEx {

    public static void main(String[] args) {
        
        var builder = new StringBuilder();
        
        builder.append("There is a wolf in the forest. ");
        builder.append("The wolf appeared very old. ");
        builder.append("I never saw a wild wolf in my life.");

        var term = "wolf";

        int firstIdx = builder.indexOf(term);
        int firstIdx2 = builder.indexOf(term, 15);

        System.out.format("First occurrence of %s %d%n", term, firstIdx);
        System.out.format("First occurrence of %s %d%n", term, firstIdx2);

        int lastIdx = builder.lastIndexOf(term);
        int lastIdx2 = builder.lastIndexOf(term, 15);

        System.out.format("Last occurrence of %s %d%n", term, lastIdx);
        System.out.format("Last occurrence of %s %d%n", term, lastIdx2);

        System.out.println(builder);
    }
}

The example uses the  indexOf and lastIndexOf methods
to get the indexes of the "wolf" substring.

var builder = new StringBuilder(); 

builder.append("There is a wolf in the forest. ");
builder.append("The wolf appeared very old. ");
builder.append("I never saw a wild wolf in my life.");

We create a string builder with the append method.

int firstIdx = builder.indexOf(term);

We get the first occurrence of the "wolf" term from the builder.

int firstIdx2 = builder.indexOf(term, 15);

We get the first occurrence of the "wolf" term from the builder, starting
from the index 15.

int lastIdx = builder.lastIndexOf(term);
int lastIdx2 = builder.lastIndexOf(term, 15);

Similarly, we get the last occurrences of the "wolf" substring.

First occurrence of wolf 11
First occurrence of wolf 35
Last occurrence of wolf 78
Last occurrence of wolf 11
There is a wolf in the forest. The wolf appeared very old. I never saw 
a wild wolf in my life.

## StringBuilder replace method

The replace method replaces a substring in the string builder with 
the specified new string.

com/zetcode/StringBuilderReplaceEx.java
  

package com.zetcode;

public class StringBuilderReplaceEx {

    public static void main(String[] args) {
        
        var sentence = "I saw a red fox running into the forest.";
        var builder = new StringBuilder(sentence);

        var term = "fox";
        var newterm = "dog";

        int idx = builder.indexOf(term);
        int len = term.length();

        builder.replace(idx, idx + len, newterm);

        System.out.println(builder);
    }
}

The example replaces the "fox" substring with the "dog" string.

int idx = builder.indexOf(term);

We find the beginning index of the substring to be replaced.

int len = term.length();

In our operation, we need to know the length of the substring.

builder.replace(idx, idx + len, newterm);

We call the replace method. The first parameter is
the starting index, the second is the ending index of the substring
to be removed. The third parameter is the new string.

## Java StringBuilder delete characters

There are two methods for deleting characters in a string builder.

com/zetcode/StringBuilderRemoveEx.java
  

package com.zetcode;

public class StringBuilderRemoveEx {

    public static void main(String[] args) {
        
        var sentence = "There is a red fox in the forest.";
        var builder = new StringBuilder(sentence);

        builder.delete(11, 14);
        System.out.println(builder);

        builder.deleteCharAt(11);
        System.out.println(builder);
    }
}

The example deletes a few characters from a string.

builder.delete(11, 14);

With the delete method, we delete a substring specified
by the indexes.

builder.deleteCharAt(11);

With the delete method we delete one character; in our
case it is a redundant space character.

There is a  fox in the forest.
There is a fox in the forest.

## Java StringBuilder substrings

With the substring method it is possible to return substrings
from a string.

com/zetcode/StringBuilderSubstringsEx.java
  

package com.zetcode;

public class StringBuilderSubstringsEx {

    public static void main(String[] args) {
        
        var sentence = "There is a red fox in the forest.";
        var builder = new StringBuilder(sentence);

        var word = builder.substring(15, 18);
        System.out.println(word);

        var sbstr = builder.substring(15);
        System.out.println(sbstr);
    }
}

In the example, we retrieve two substrings.

var word = builder.substring(15, 18);

This line retrives a substring with a starting index 15 and ending
index 18.

var sbstr = builder.substring(15);

Here we retrie a substring from index 15 until the end of the sentence.

fox
fox in the forest.

## Source

[Java StringBuilder - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html)

In this article we have worked with Java StringBuilder.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).