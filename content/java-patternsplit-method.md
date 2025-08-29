+++
title = "Java Pattern.split() Method"
date = 2025-08-29T20:00:24.399+01:00
draft = false
description = "Complete Java Pattern.split() tutorial with examples. Learn how to split strings using regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.split() Method

Last modified: April 20, 2025

 

The Pattern.split method is a powerful tool in Java's regex
package. It splits the input string around matches of the given pattern. This
method provides more flexibility than String.split() for complex splitting.

Pattern.split() is particularly useful when you need to split strings using
complex delimiters or when you need to reuse the same pattern multiple times.
The method returns an array of strings computed by splitting the input.

## Basic Pattern.split() Usage

The simplest form of Pattern.split() takes just the input string as parameter.
It splits the string at each match of the pattern. Empty strings may be included
in the result if matches occur consecutively or at the string boundaries.

BasicSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class BasicSplit {

    public static void main(String[] args) {
        
        String input = "one,two,three,four";
        Pattern pattern = Pattern.compile(",");
        
        String[] parts = pattern.split(input);
        
        System.out.println("Split results:");
        for (String part : parts) {
            System.out.println(part);
        }
    }
}

This example demonstrates basic splitting on comma delimiters. The pattern is
compiled once and then used to split the input string. Each element between
commas becomes an array element in the result.

## Splitting with Whitespace

Pattern.split() excels at handling complex delimiters like variable whitespace.
This example shows how to split on one or more whitespace characters, ignoring
exact counts or types of whitespace.

WhitespaceSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class WhitespaceSplit {

    public static void main(String[] args) {
        
        String input = "apple   orange\tbanana\ncherry";
        Pattern pattern = Pattern.compile("\\s+");
        
        String[] fruits = pattern.split(input);
        
        System.out.println("Split results:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}

The pattern \\s+ matches one or more whitespace characters of any
type (spaces, tabs, newlines). This provides more robust splitting than simple
space character matching, especially with irregular input formatting.

## Splitting with Limit Parameter

The limit parameter controls the number of times the pattern is applied and thus
affects the length of the resulting array. A positive limit splits the string at
most limit-1 times, while a negative limit allows unlimited splits but keeps
trailing empty strings.

LimitSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class LimitSplit {

    public static void main(String[] args) {
        
        String input = "one,two,three,four,five";
        Pattern pattern = Pattern.compile(",");
        
        // Limit of 3 means maximum 2 splits
        String[] limited = pattern.split(input, 3);
        
        System.out.println("Split with limit 3:");
        for (String part : limited) {
            System.out.println(part);
        }
        
        // Negative limit keeps trailing empty strings
        String input2 = "one,two,,three,,";
        String[] negativeLimit = pattern.split(input2, -1);
        
        System.out.println("\nSplit with negative limit:");
        for (String part : negativeLimit) {
            System.out.println("'" + part + "'");
        }
    }
}

The first split stops after creating 3 elements (after 2 splits). The second
example shows how negative limit preserves trailing empty strings, which would
otherwise be discarded. This behavior is important for certain parsing tasks.

## Splitting on Word Boundaries

Pattern.split() can use complex patterns like word boundaries for splitting.
This example splits text into words while properly handling punctuation and
various whitespace scenarios.

WordBoundarySplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class WordBoundarySplit {

    public static void main(String[] args) {
        
        String input = "Hello! How are you? I'm fine, thanks.";
        Pattern pattern = Pattern.compile("\\W+");
        
        String[] words = pattern.split(input);
        
        System.out.println("Split words:");
        for (String word : words) {
            System.out.println(word);
        }
    }
}

The pattern \\W+ matches one or more non-word characters (punctuation
and whitespace). This effectively splits the string into words while ignoring
the exact nature of the separators between them.

## Splitting and Trimming Results

When splitting strings, we often need to trim whitespace from the results. This
example shows how to combine splitting and trimming in a single operation by
including whitespace in the delimiter pattern.

TrimSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class TrimSplit {

    public static void main(String[] args) {
        
        String input = " apple , orange , banana , cherry ";
        Pattern pattern = Pattern.compile("\\s*,\\s*");
        
        String[] fruits = pattern.split(input);
        
        System.out.println("Trimmed split results:");
        for (String fruit : fruits) {
            System.out.println("'" + fruit + "'");
        }
    }
}

The pattern \\s*,\\s* matches a comma with optional surrounding
whitespace. This eliminates the need for post-processing the split results to
remove leading or trailing spaces, making the operation more efficient.

## Splitting with Multiple Delimiters

Pattern.split() can handle multiple different delimiters simultaneously using
alternation in the regex pattern. This is more efficient than multiple splitting
operations.

MultiDelimiterSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class MultiDelimiterSplit {

    public static void main(String[] args) {
        
        String input = "apple;orange,banana grape";
        Pattern pattern = Pattern.compile("[,;\\s]");
        
        String[] fruits = pattern.split(input);
        
        System.out.println("Multi-delimiter split results:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
    }
}

The pattern [,;\\s] matches either a comma, semicolon, or
whitespace character. This allows splitting on multiple delimiter types in a
single operation, which is more efficient than chaining multiple split calls.

## Splitting While Keeping Delimiters

Sometimes we need to keep the delimiters in the split results. This can be
achieved by using lookahead and lookbehind assertions in the regex pattern.

KeepDelimitersSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class KeepDelimitersSplit {

    public static void main(String[] args) {
        
        String input = "3+5-2*8/4";
        Pattern pattern = Pattern.compile("(?&lt;=[+\\-*/])|(?=[+\\-*/])");
        
        String[] tokens = pattern.split(input);
        
        System.out.println("Split with delimiters:");
        for (String token : tokens) {
            System.out.println(token);
        }
    }
}

The pattern uses lookbehind and lookahead assertions to split before or after
any operator character. This preserves the operators as separate elements in the
result array, which is useful for mathematical expression parsing.

## Source

[Java Pattern.split() Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#split-java.lang.CharSequence-)

This tutorial has covered various aspects of the Pattern.split() method with
practical examples. Mastering these techniques will greatly enhance your string
processing capabilities in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).