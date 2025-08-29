+++
title = "Java split string"
date = 2025-08-29T20:00:32.418+01:00
draft = false
description = "Java split string tutorial shows how to split strings in Java. We use String's split,  Pattern's splitAsStream and Guava Splitter's on methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java split string

last modified February 20, 2024

 

Java split string tutorial shows how to split strings in Java. We use 
String's split, Pattern's, 
splitAsStream and Guava Splitter's on methods.

The String has a built-in method for splitting strings: 

    - String[] split​(String regex) - splits the string around matches of the given regular expression

    - String[] split​(String regex, int limit) - splits this string around matches of the given regular expression

The method returns an array of split strings.

In addition to the split method, the Pattern 
has also the splitAsStream method.

## Split phone number

In the first example, we split a phone number.

Main.java
  

import java.util.Arrays;

void main() {

    String phoneNumber = "202-555-0154";
    String[] output = phoneNumber.split("-");

    Arrays.stream(output).forEach(part -&gt; System.out.println(part));
}

Phone numbers are often separated with the dash (-) character. The program 
splits the number into numerical values with split.

String phoneNumber = "202-555-0154";

This is the phone number.

String[] output = phoneNumber.split("-");

We split the string by the dash character; the split method 
returns an array of substrings split from the main string.

Arrays.stream(output).forEach(part -&gt; System.out.println(part));

We show the split parts to the console.

202
555
0154

## Split string with dot character

A dot character has a special meaning in regular expression syntax. To split 
a string by a dot, we need to escape it or use Pattern.quote.

Main.java
  

import java.util.Arrays;
import java.util.regex.Pattern;

void main() {

    String address = "127.0.0.1";

    // String[] output = address.split("\\.");
    String[] output = address.split(Pattern.quote("."));

    Arrays.stream(output).forEach(part -&gt; System.out.println(part));
}

The program splits an IP address. 

## Splitting string with limit

The limit option controls the number of split substrings. 

Main.java
  

import java.util.Arrays;

void main() {

    String names = "Jane-Paul-Ferenc-David-Robert-Julia";
    String[] output = names.split("-", 4);

    Arrays.stream(output).forEach(System.out::println);
}

The program splits the names string into four parts.

Jane
Paul
Ferenc
David-Robert-Julia

## Splitting and trimming strings

We often need to remove the white space characters around the strings.

Main.java
  

import java.util.Arrays;

void main() {

    String input = " wood, falcon\t, sky, forest\n";
    String[] output = input.trim().split("\\s*,\\s*");

    Arrays.stream(output).forEach(System.out::println);
}

To remove the white spaces, we use trim.

String output = input.trim().split("\\s*,\\s*");

The regular expression splits the input string by a comma character, which 
might have any number of white spaces before or after the comma.

## Split string with Pattern

We can split strings with Pattern in a functional way using 
streams. 

Main.java
  

import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

void main() {

    String phoneNumber = "202-555-0154";

    List&lt;String&gt; output = Pattern.compile("-")
        .splitAsStream(phoneNumber)
        .collect(Collectors.toList());

    output.forEach(System.out::println);
}

The example splits a phone number with Pattern's splitAsStream
method.

List&lt;String&gt; output = Pattern.compile("-")
    .splitAsStream(phoneNumber)
    .collect(Collectors.toList());

We compile a regular expression containing the character we use for 
splitting. On the compiled expression, we call splitAsStream 
to get a stream of split substrings. Finally, we collect the stream into 
a list.

## Split string with Guava's Splitter

The following example uses Google's Guava library to split a string. 
It uses the Splitter class.

&lt;dependency&gt;
    &lt;groupId&gt;com.google.guava&lt;/groupId&gt;
    &lt;artifactId&gt;guava&lt;/artifactId&gt;
    &lt;version&gt;27.0.1-jre&lt;/version&gt;
&lt;/dependency&gt;

We need to include Guava's dependency.

SplitStringGuavaEx.java
  

package com.zetcode;

import com.google.common.base.Splitter;

public class SplitStringGuavaEx {

    public static void main(String[] args) {

        var input = " falcon, \t\tforest\t, \t\t, moderate, sky\n";

        var result = Splitter.on(',')
                .trimResults()
                .omitEmptyStrings()
                .splitToList(input);

        result.forEach(System.out::println);
    }
}

The program splits a string with Guava's Splitter.

var result = Splitter.on(',')
        .trimResults()
        .omitEmptyStrings()
        .splitToList(input);

We extract the non-overlapping substrings from an input string with Splitter.on.
The trimResults removes the white space characters and the 
omitEmptyStrings removes potential empty strings. The result is transformed
into a list.

## Source

[Java String - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

In this article we have shown how to split strings in Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).