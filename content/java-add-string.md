+++
title = "Java add string"
date = 2025-08-29T19:58:03.207+01:00
draft = false
description = "Java add string tutorial shows how to concatenate strings in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java add string

last modified July 10, 2024

 

In this article we show how to concatenate strings in Java.

In Java, a string is a sequence of Unicode characters. Strings are objects.
There are two basic classes for working with strings:

There are several ways how to add strings in Java:

  - + operator

  - concat method

  - String.join method

  - StringBuilder append method

  - String.format

## Using the + operator

The easiest way of concatenating strings is to use the + or the
+= operator. The + operator is used both for adding numbers and
strings; in programming we say that the operator is overloaded. 

Main.java
  

void main() {

    System.out.println("Return" + " of " + "the king.");

    String msg = "There are";
    msg += " three";
    msg += " falcons";
    msg += " in the sky";

    System.out.println(msg);
}

The example adds two strings using the + and +=
operators.

$ java Main.java
Return of the king.
There are three falcons in the sky

## Java add strings with String.concat

The String.concat method concatenates the specified string to the
end of this string.

Main.java
  

void main() {

    System.out.println("Return".concat(" of ").concat("the king."));
}

In the example, we add strings with String.concat.

## Using String.join

The String.join method returns a new atring composed of copies of
the CharSequence elements joined together with a copy of the specified
delimiter.

Main.java
  

void main() {

    String[] words = { "There", "are", "two", "owls", "on", "the", "tree" };
    String msg = String.join(" ", words);

    System.out.println(msg);
}

We have an array of words. We form a sentence from the words with the
String.join method.

$ java Main.java
There are two owls on the tree

## Using StringBuilder

StringBuilder is a mutable sequence of characters. Its append method appends the
specified string to the string instance. 

Main.java
  

void main() {

    var sb = new StringBuilder();
    sb.append("Return");
    sb.append(" of ");
    sb.append("the king.");

    System.out.println(sb);
}

In the example, we form a new string with StringBuilder. 

$ java Main.java
Return of the king.

## Using String.format

The String.format method returns a formatted string using the
specified format string and arguments.

Main.java
  

void main() {

    var w1 = "three";
    var w2 = "owls";
    
    var msg = String.format("There are %s %s on the tree", w1, w2);
    System.out.println(msg);
}

In the example, we build a new string with String.format.

## Source

[Java String - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

In this article we have showed how to add strings in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).