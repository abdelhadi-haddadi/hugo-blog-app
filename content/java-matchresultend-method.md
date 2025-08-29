+++
title = "Java MatchResult.end Method"
date = 2025-08-29T20:00:18.638+01:00
draft = false
description = "Complete Java MatchResult.end method tutorial with examples. Learn how to use end positions in regex matches."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MatchResult.end Method

Last modified: April 20, 2025

 

The MatchResult.end method is part of Java's regex API. It returns
the offset after the last character of a match or capturing group. This method
is useful for determining match positions in input strings.

MatchResult is an interface implemented by Matcher.
The end method provides information about match boundaries. It helps
with string manipulation tasks involving regex matches.

## MatchResult Interface Overview

The MatchResult interface represents the result of a match
operation. It provides methods to query match positions and group contents. The
interface is typically accessed through a Matcher instance.

Key methods include start, end, and group.
These methods let you examine match details. MatchResult is
commonly used in regex processing pipelines.

## Basic end Method Usage

The simplest form of end returns the offset after the last
character of the entire match. This is useful for string slicing operations.
The method throws IllegalStateException if no match was attempted.

BasicEndExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BasicEndExample {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            int endPosition = matcher.end();
            System.out.println("Match ends at position: " + endPosition);
            System.out.println("Matched text: '" + 
                input.substring(matcher.start(), endPosition) + "'");
        }
    }
}

This example finds the word "fox" in a sentence. The end method
returns the position after the 'x' in "fox". We use this with start
to extract the matched substring.

The output shows the end position and the matched text. Remember that string
positions are zero-based in Java. The end position is exclusive in substring
operations.

## end() with Capturing Groups

The end(int group) overload returns the end position of a specific
capturing group. Group 0 represents the entire match, while groups 1+ correspond
to parenthesized subpatterns. This helps analyze complex matches.

GroupEndExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GroupEndExample {

    public static void main(String[] args) {
        
        String input = "Date: 2023-04-20, Time: 15:30";
        Pattern pattern = Pattern.compile(
            "(\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match ends at: " + matcher.end());
            System.out.println("Year group ends at: " + matcher.end(1));
            System.out.println("Month group ends at: " + matcher.end(2));
            System.out.println("Day group ends at: " + matcher.end(3));
        }
    }
}

This example extracts date components from a string. We capture year, month, and
day in separate groups. The end(int) method shows where each group
ends.

The output demonstrates how group positions relate to the full match. Group
numbers correspond to their opening parentheses order. Invalid group numbers
throw IndexOutOfBoundsException.

## end with Named Capturing Groups

Java 7+ supports named capturing groups in regex patterns. The end
method works with these groups using their names. This makes code more readable
than numeric group indices.

NamedGroupEndExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroupEndExample {

    public static void main(String[] args) {
        
        String input = "Product: Laptop, Price: $999.99";
        Pattern pattern = Pattern.compile(
            "Product: (?&lt;product&gt;\\w+), Price: \\$(?&lt;price&gt;\\d+\\.\\d{2})");
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Product ends at: " + 
                matcher.end("product"));
            System.out.println("Price ends at: " + 
                matcher.end("price"));
        }
    }
}

This example uses named groups to extract product information. The
end(String) method returns positions for named groups. The syntax
(?&lt;name&gt;...) defines named capturing groups.

Named groups improve code maintainability. The method throws
IllegalArgumentException for invalid group names. Mixing named and
numbered groups is supported.

## Handling No Match Scenario

The end method throws IllegalStateException if no
match was found or attempted. Always check find or
matches results before calling end.

NoMatchExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NoMatchExample {

    public static void main(String[] args) {
        
        String input = "No numbers here";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        try {
            // Wrong: calling end() without checking find()
            System.out.println("End position: " + matcher.end());
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Correct approach
        if (matcher.find()) {
            System.out.println("End position: " + matcher.end());
        } else {
            System.out.println("No match found");
        }
    }
}

This example demonstrates proper error handling for end. The
first attempt calls end without checking for a match. The second
approach properly verifies the match first.

Always follow the pattern: call find, check its return value,
then use end. This prevents runtime exceptions in your code.

## Multiple Matches with end

When processing multiple matches in a string, end updates to
reflect each match's position. This enables iterative processing of all matches
in the input.

MultipleMatchesExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MultipleMatchesExample {

    public static void main(String[] args) {
        
        String input = "cat, dog, fish, bird";
        Pattern pattern = Pattern.compile("\\b\\w{3}\\b");
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.printf("Found '%s' at [%d-%d)%n",
                matcher.group(),
                matcher.start(),
                matcher.end());
        }
    }
}

This example finds all 3-letter words in a string. The while loop
iterates through each match. For each, we print the matched text and its
position range using start and end.

The output shows how end changes with each match. The range is
expressed as [start, end), following Java's standard for substring operations.

## end() with Region Methods

When using region methods to limit matching to part of the input,
end still returns absolute positions. The positions are relative
to the full input string, not the region.

RegionEndExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndExample {

    public static void main(String[] args) {
        
        String input = "First: 123, Second: 456, Third: 789";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to only search after "First:"
        matcher.region(7, input.length());
        
        while (matcher.find()) {
            System.out.printf("Found '%s' at [%d-%d)%n",
                matcher.group(),
                matcher.start(),
                matcher.end());
        }
    }
}

This example sets a region starting after "First:" in the string. Despite the
region restriction, end returns positions relative to the full
string. This maintains consistency with other string operations.

The output shows numbers found after "First:". The positions reflect their
absolute location in the input string. Region bounds only affect where matching
begins, not position reporting.

## Source

[Java MatchResult Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/MatchResult.html)

This tutorial covered the MatchResult.end method in Java. We
explored its various forms and usage scenarios with practical examples. The
method is essential for precise string manipulation with regex.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).