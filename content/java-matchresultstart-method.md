+++
title = "Java MatchResult.start Method"
date = 2025-08-29T20:00:21.011+01:00
draft = false
description = "Complete Java MatchResult.start method tutorial with examples. Learn about regex match positions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MatchResult.start Method

Last modified: April 20, 2025

 

The MatchResult.start method is part of Java's regex package. It
returns the start index of the match or a specific capturing group. This method
is essential for determining the position of matches in input strings.

The MatchResult interface is implemented by Matcher.
It provides methods to query match results. The start method helps
in text processing tasks where position information is required.

## MatchResult Interface Overview

MatchResult provides methods to access match information. It
includes methods to get start and end positions of matches. The interface also
provides access to matched text and group information.

The start method has two variants: one without parameters for the
whole match, and one with a group number parameter. Both return zero-based
indices of match positions in the input string.

## Basic MatchResult.start Usage

The simplest use of start is to find the position of a full match.
This example demonstrates finding the start position of a word in a string. The
method returns the index where the match begins.

BasicStartExample.java
  

package com.zetcode;

import java.util.regex.*;

public class BasicStartExample {
    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            int startPosition = matcher.start();
            System.out.println("'fox' starts at position: " + startPosition);
            System.out.println("Matched text: " + text.substring(startPosition));
        }
    }
}

In this example, we compile a simple pattern to match the word "fox". After
finding the match, we use start to get its starting position.
The output shows the index where "fox" begins in the input string.

## Using start with Capturing Groups

start(int group) returns the start position of a specific capturing
group. Groups are numbered from left to right, starting at 1. Group 0 always
refers to the entire match.

GroupStartExample.java
  

package com.zetcode;

import java.util.regex.*;

public class GroupStartExample {
    public static void main(String[] args) {
        String text = "Date: 2023-05-15, Time: 14:30";
        Pattern pattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            System.out.println("Full match starts at: " + matcher.start());
            System.out.println("Year starts at: " + matcher.start(1));
            System.out.println("Month starts at: " + matcher.start(2));
            System.out.println("Day starts at: " + matcher.start(3));
        }
    }
}

This example demonstrates finding start positions for different parts of a date.
The pattern captures year, month, and day as separate groups. We use
start(1), start(2), and start(3) to get
their respective positions.

## Handling Multiple Matches with start

When processing multiple matches in a string, start returns the
position of each match found. This example shows how to iterate through all
matches and record their start positions.

MultipleMatchesExample.java
  

package com.zetcode;

import java.util.regex.*;

public class MultipleMatchesExample {
    public static void main(String[] args) {
        String text = "cat, bat, rat, mat, hat";
        Pattern pattern = Pattern.compile("[a-z]at");
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                "' at position: " + matcher.start());
        }
    }
}

This code finds all three-letter words ending with "at". For each match found by
find, we print the matched text and its start position. The
start method gives us the exact location of each match.

## Using start() with Named Groups

Java regex supports named capturing groups. The start(String name)
variant lets you get start positions using group names. This makes code more
readable when working with complex patterns.

NamedGroupStartExample.java
  

package com.zetcode;

import java.util.regex.*;

public class NamedGroupStartExample {
    public static void main(String[] args) {
        String text = "Product: Laptop, Price: $999.99";
        Pattern pattern = Pattern.compile(
            "Product: (?&lt;product&gt;\\w+), Price: \\$(?&lt;price&gt;\\d+\\.\\d{2})");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            System.out.println("Product starts at: " + 
                matcher.start("product"));
            System.out.println("Price starts at: " + 
                matcher.start("price"));
        }
    }
}

This example uses named groups to capture product and price information. Instead
of using numeric group indices, we use descriptive names. The
start(String name) method provides the start position for each
named group.

## Error Handling with start

Calling start before a successful match or for a non-existent
group throws IllegalStateException. This example demonstrates
proper error handling when using the start method.

StartErrorHandling.java
  

package com.zetcode;

import java.util.regex.*;

public class StartErrorHandling {
    public static void main(String[] args) {
        String text = "Sample text without matches";
        Pattern pattern = Pattern.compile("pattern");
        Matcher matcher = pattern.matcher(text);
        
        try {
            // This will throw IllegalStateException
            System.out.println("Start: " + matcher.start());
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        if (matcher.find()) {
            try {
                // This will throw IndexOutOfBoundsException
                System.out.println("Group 1 start: " + matcher.start(1));
            } catch (IndexOutOfBoundsException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }
}

This example shows two common error scenarios. First, calling start
before any match is attempted. Second, requesting a non-existent group. Both
cases throw exceptions that should be handled appropriately in production code.

## Using start with Region Methods

When working with matcher regions, start returns positions
relative to the original input string, not the region. This example demonstrates
this behavior with a region-limited search.

RegionStartExample.java
  

package com.zetcode;

import java.util.regex.*;

public class RegionStartExample {
    public static void main(String[] args) {
        String text = "First match here and second match there";
        Pattern pattern = Pattern.compile("match");
        Matcher matcher = pattern.matcher(text);
        
        // Set region from index 15 to 30
        matcher.region(15, 30);
        
        while (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                "' at position: " + matcher.start() + 
                " (region-relative: " + (matcher.start() - 15) + ")");
        }
    }
}

This code limits the search to a specific region of the input string. While the
matcher only searches within the region, start still returns the
absolute position in the original string. We calculate the region-relative
position by subtracting the region start index.

## Performance Considerations

The start method is a lightweight operation that simply returns
a stored value. However, calling it repeatedly for the same match is unnecessary.
For best performance, store the result in a variable if you need to use it
multiple times.

PerformanceExample.java
  

package com.zetcode;

import java.util.regex.*;

public class PerformanceExample {
    public static void main(String[] args) {
        String text = "Testing performance of start() method";
        Pattern pattern = Pattern.compile("performance");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            // Good practice: store once, use multiple times
            int startPos = matcher.start();
            
            System.out.println("Match starts at: " + startPos);
            System.out.println("Context before: " + 
                text.substring(0, startPos));
            System.out.println("Context after: " + 
                text.substring(startPos));
        }
    }
}

This example shows the recommended approach of storing the start position in a
variable. This avoids multiple calls to start for the same match.
While the performance impact is minimal, this practice leads to cleaner code.

## Source

[Java MatchResult Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/MatchResult.html)

This tutorial covered the MatchResult.start method in depth. We
explored basic usage, group handling, error scenarios, and performance tips.
Understanding these concepts is crucial for effective text processing in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).