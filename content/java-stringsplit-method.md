+++
title = "Java String.split Method"
date = 2025-08-29T20:00:26.625+01:00
draft = false
description = "Complete Java String.split method tutorial covering all variations with examples. Learn how to split strings in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String.split Method

Last modified: April 20, 2025

 

The String.split method in Java divides a string around matches of
a regular expression. It returns an array of strings computed by splitting the
original string. This method is commonly used for parsing text data.

The split method has two variants: one that takes a regex pattern and another
that takes both a regex and a limit parameter. The limit controls the number of
times the pattern is applied and affects the length of the resulting array.

## String.split Overview

The split method is part of Java's String class. It uses regular
expressions to determine where to split the string. The method is useful for
processing CSV files, log files, and other structured text data.

When no matches are found, the method returns an array containing the original
string. Empty strings between delimiters are included in the result unless
limited by the limit parameter.

## Basic String Splitting

The simplest form of split takes a regular expression as input.
The string is split at each match of the regex. This example shows basic
splitting using a comma as the delimiter.

BasicSplit.java
  

package com.zetcode; 

public class BasicSplit {

    public static void main(String[] args) {
        String data = "apple,orange,banana,grape";
        String[] fruits = data.split(",");
        
        System.out.println("Split results:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}

This code splits a comma-separated string into an array of fruit names. The
output will contain four elements: "apple", "orange", "banana", and "grape".
The comma acts as the delimiter between values.

## Splitting with Regular Expressions

The split method can use complex regular expressions as delimiters. This
example demonstrates splitting using multiple possible delimiters.

RegexSplit.java
  

package com.zetcode;

public class RegexSplit {

    public static void main(String[] args) {
        String data = "apple;orange,banana grape";
        String[] fruits = data.split("[;,]\\s*");
        
        System.out.println("Split results:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}

Here we split a string using either semicolon or comma followed by optional
whitespace. The regex pattern "[;,]\\s*" matches either ; or ,
followed by any number of whitespace characters. This handles inconsistent
formatting in the input string.

## Splitting with Limit Parameter

The limit parameter controls how many times the pattern is applied. A positive
limit restricts the number of splits, while a negative limit allows unlimited
splits but keeps trailing empty strings.

LimitSplit.java
  

package com.zetcode;

public class LimitSplit {

    public static void main(String[] args) {
        String data = "one,two,three,four,five";
        
        // Limit of 3
        String[] limited = data.split(",", 3);
        System.out.println("Split with limit 3:");
        for (String item : limited) {
            System.out.println(item);
        }
        
        // Negative limit (keeps trailing empty strings)
        String data2 = "a,b,c,,,";
        String[] negativeLimit = data2.split(",", -1);
        System.out.println("\nSplit with negative limit:");
        for (String item : negativeLimit) {
            System.out.println("'" + item + "'");
        }
    }
}

The first split with limit 3 produces ["one", "two", "three,four,five"]. The
second split with -1 keeps all empty strings at the end, showing how limits
affect the result. Negative limits are useful when you need to preserve empty
trailing fields.

## Splitting by Whitespace

A common use case is splitting text by whitespace. The \\s+ regex
matches one or more whitespace characters, making it ideal for this purpose.

WhitespaceSplit.java
  

package com.zetcode; 

public class WhitespaceSplit {

    public static void main(String[] args) {
        String text = "The quick   brown fox jumps over  the lazy dog";
        String[] words = text.split("\\s+");
        
        System.out.println("Words count: " + words.length);
        for (String word : words) {
            System.out.println(word);
        }
    }
}

This example splits a sentence into words, handling multiple spaces between
words. The \\s+ pattern matches any sequence of whitespace
characters (spaces, tabs, newlines). This ensures consistent splitting
regardless of inconsistent spacing.

## Splitting and Trimming Results

When processing user input, you often need to split and trim whitespace from
results. This example shows how to combine splitting with trimming.

TrimSplit.java
  

package com.zetcode; 

public class TrimSplit {

    public static void main(String[] args) {
        String input = " apple , orange , banana , grape ";
        String[] fruits = input.split("\\s*,\\s*");
        
        System.out.println("Trimmed split results:");
        for (String fruit : fruits) {
            System.out.println("'" + fruit + "'");
        }
    }
}

The regex \\s*,\\s* matches a comma with optional whitespace on
either side. This effectively splits the string at commas while automatically
trimming whitespace from the resulting elements. The output contains clean
values without leading or trailing spaces.

## Splitting with Lookahead/Lookbehind

Advanced regex features like lookahead and lookbehind allow splitting while
keeping delimiters. This is useful when you need to preserve the splitting
characters.

LookaroundSplit.java
  

package com.zetcode; 

public class LookaroundSplit {

    public static void main(String[] args) {
        String equation = "2+3-4*5/6";
        // Split at operators but keep them
        String[] parts = equation.split("(?&lt;=[-+*/])|(?=[-+*/])");
        
        System.out.println("Equation parts:");
        for (String part : parts) {
            System.out.println(part);
        }
    }
}

This example splits a mathematical equation at operators while keeping the
operators as separate elements. The regex uses positive lookbehind
(?&lt;=...) and positive lookahead (?=...) to split
around operators without consuming them. The result alternates between numbers
and operators.

## Splitting Empty Strings

Special consideration is needed when splitting empty strings or strings with
only delimiters. The behavior varies based on the limit parameter.

EmptySplit.java
  

package com.zetcode; 

public class EmptySplit {
    
    public static void main(String[] args) {
        String empty = "";
        String[] emptySplit = empty.split(",");
        System.out.println("Empty string split length: " + emptySplit.length);
        
        String delimitersOnly = ",,,";
        String[] defaultSplit = delimitersOnly.split(",");
        String[] keepEmpty = delimitersOnly.split(",", -1);
        
        System.out.println("\nDefault split length: " + defaultSplit.length);
        System.out.println("Split with -1 limit length: " + keepEmpty.length);
    }
}

An empty string returns an array containing one empty string. For strings with
only delimiters, the default behavior removes trailing empty strings, while a
negative limit preserves them. Understanding these edge cases is important for
robust string processing.

## Source

[Java String.split Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#split-java.lang.String-)

This tutorial covered the essential aspects of Java's String.split method. From
basic usage to advanced regex patterns, these examples demonstrate the method's
versatility in string processing tasks.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).