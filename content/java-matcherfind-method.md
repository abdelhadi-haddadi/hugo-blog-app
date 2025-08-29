+++
title = "Java Matcher.find Method"
date = 2025-08-29T20:00:11.962+01:00
draft = false
description = "Complete Java Matcher.find method tutorial with examples. Learn how to use find for regex pattern matching in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.find Method

Last modified: April 20, 2025

 

The Matcher.find method is a crucial part of Java's regex API. It
scans the input sequence looking for the next subsequence that matches the
pattern. Unlike matches, it doesn't require the entire input to
match.

The method returns true if a match is found and false
otherwise. Each call to find starts where the previous match left
off. This makes it ideal for finding multiple matches in a single input string.

## Basic Definitions

**Matcher**: A class that interprets patterns and performs match
operations against input strings. Created from a Pattern object via the
matcher method.

**Pattern**: A compiled representation of a regular expression.
Used to create Matcher objects that match character sequences against the regex.

**find**: Attempts to find the next subsequence of the input that
matches the pattern. Returns true if found and updates internal state for
further operations.

## Basic find Usage

This example demonstrates the simplest use of find to locate a
pattern in a string. We'll search for the word "Java" in a sample text.

BasicFindExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BasicFindExample {

    public static void main(String[] args) {
        String text = "Java is powerful. Java is versatile. Learn Java!";
        Pattern pattern = Pattern.compile("Java");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            System.out.println("Found 'Java' at index " + matcher.start());
        }
    }
}

The code compiles a pattern matching the literal "Java". The find
method scans the text for matches. Each successful match prints the starting
index of the found substring. The loop continues until no more matches are found.

## Finding Multiple Patterns

This example shows how find can locate multiple different
patterns in sequence. We'll search for both "Java" and "powerful" in our text.

MultiplePatternsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MultiplePatternsExample {

    public static void main(String[] args) {

        String text = "Java is powerful. Java is versatile. Learn Java!";
        Pattern pattern1 = Pattern.compile("Java");
        Pattern pattern2 = Pattern.compile("powerful");

        Matcher matcher1 = pattern1.matcher(text);
        Matcher matcher2 = pattern2.matcher(text);

        System.out.println("Finding 'Java':");
        while (matcher1.find()) {
            System.out.println("Found at " + matcher1.start());
        }

        System.out.println("\nFinding 'powerful':");
        if (matcher2.find()) {
            System.out.println("Found at " + matcher2.start());
        }
    }
}

We create two separate Matcher instances for different patterns. The first finds
all occurrences of "Java", while the second looks for "powerful". Note that
find can be used in both loops and single checks.

## Using find with Groups

This example demonstrates how find works with capturing groups.
We'll extract dates in "dd-mm-yyyy" format from a text.

FindWithGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindWithGroupsExample {

    public static void main(String[] args) {

        String text = "Dates: 12-05-2023, 15-06-2023, invalid 32-13-2023";
        Pattern pattern = Pattern.compile("(\\d{2})-(\\d{2})-(\\d{4})");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Day: " + matcher.group(1));
            System.out.println("Month: " + matcher.group(2));
            System.out.println("Year: " + matcher.group(3) + "\n");
        }
    }
}

The regex pattern defines three capturing groups for day, month, and year. Each
find call locates a date match. The group method
then extracts the full match or specific components. Invalid dates are skipped.

## find() with Start and End Positions

This example shows how to use find with start and end parameters
to limit the search to a specific region of the input string.

FindWithRegionExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindWithRegionExample {

    public static void main(String[] args) {
        
        String text = "First Java, then Python, then more Java";
        Pattern pattern = Pattern.compile("Java");
        Matcher matcher = pattern.matcher(text);

        // Search only in the first half of the string
        matcher.region(0, text.length() / 2);

        System.out.println("Searching in region [0-" + (text.length()/2) + "]:");
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start());
        }

        // Reset region to search entire string
        matcher.reset();
        System.out.println("\nSearching entire string:");
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start());
        }
    }
}

The region method limits where find searches. The
first loop only finds matches in the first half of the string. After
reset, the second search covers the entire input.

## find() vs lookingAt() vs matches()

This example compares find with similar methods lookingAt
and matches to demonstrate their differences.

FindComparisonExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FindComparisonExample {

    public static void main(String[] args) {

        String text = "Java is great";
        Pattern pattern = Pattern.compile("Java");
        Matcher matcher = pattern.matcher(text);

        System.out.println("matches(): " + matcher.matches());
        System.out.println("lookingAt(): " + matcher.lookingAt());
        System.out.println("find(): " + matcher.find());

        // Reset matcher for second find() test
        matcher.reset();
        System.out.println("\nAfter reset:");
        System.out.println("find() at start: " + matcher.find());
    }
}

matches checks if the entire string matches the pattern.
lookingAt checks only the beginning. find searches
for the pattern anywhere in the string. After reset,
find starts searching from the beginning again.

## find with Word Boundaries

This example demonstrates using word boundaries (\b) with
find to match whole words only.

FindWithBoundariesExample.java
  

package com.zetcode;

import java.util.regex.*;

public class FindWithBoundariesExample {

    public static void main(String[] args) {
        String text = "Java JavaScript JavaFX";
        Pattern pattern = Pattern.compile("\\bJava\\b");
        Matcher matcher = pattern.matcher(text);
        
        System.out.println("Finding whole word 'Java':");
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start());
        }
        
        // Compare without word boundaries
        System.out.println("\nFinding 'Java' without boundaries:");
        matcher = Pattern.compile("Java").matcher(text);
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start());
        }
    }
}

The first search uses word boundaries to find only standalone "Java" words. The
second search finds all occurrences, including those within other words like
"JavaScript". Word boundaries ensure we match complete words only.

## find() with Case Insensitivity

This example shows how to use find with case-insensitive
matching to locate words regardless of their capitalization.

CaseInsensitiveFindExample.java
  

package com.zetcode;

import java.util.regex.*;

public class CaseInsensitiveFindExample {

    public static void main(String[] args) {
        String text = "Java JAVA java jAvA";
        Pattern pattern = Pattern.compile("java", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        
        System.out.println("Case-insensitive search for 'java':");
        while (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                             "' at " + matcher.start());
        }
    }
}

The CASE_INSENSITIVE flag makes the pattern match regardless of
case. Each find call locates another variation of "java" in
different cases. The actual matched text is returned via group.

## Source

[Java Matcher.find Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#find--)

This tutorial has covered the essential aspects of the Matcher.find
method. Mastering this method is key to effective pattern matching in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).