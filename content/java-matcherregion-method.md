+++
title = "Java Matcher.region Method"
date = 2025-08-29T20:00:14.187+01:00
draft = false
description = "Complete Java Matcher.region method tutorial with examples. Learn how to limit regex matching to specific regions of input."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.region Method

Last modified: April 20, 2025

 

The Matcher.region method in Java's regex package allows you to
limit pattern matching to a specific region of the input sequence. This is
useful when you only need to search or match within a portion of the text.

By setting a region, you can improve performance by avoiding unnecessary
processing of the entire input. The region is defined by start and end indices,
and matching operations will only consider characters within this range.

## Matcher.region Method Overview

The region method takes two parameters: start (inclusive) and end
(exclusive) indices. It returns the Matcher itself, allowing method chaining.
The region setting affects all subsequent matching operations.

Important related methods include regionStart and
regionEnd which return the current region boundaries, and
hasTransparentBounds which checks if bounds are transparent.

## Basic Matcher.region Usage

This example demonstrates the simplest use of the region method to limit matching
to a specific portion of the input string. We'll search for a pattern within a
defined region.

MatcherRegionBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionBasic {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(input);
        
        // Set region from index 10 to 20
        matcher.region(10, 20);
        
        if (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                "' at position " + matcher.start());
        } else {
            System.out.println("No match found in region");
        }
        
        System.out.println("Region start: " + matcher.regionStart());
        System.out.println("Region end: " + matcher.regionEnd());
    }
}

In this example, we search for the word "fox" but only within the region from
index 10 to 20 of the input string. The matcher will only consider this portion
of the text for matching operations.

The regionStart and regionEnd methods confirm the
current region boundaries. The match succeeds because "fox" falls within the
specified region.

## Region Outside Match Range

This example shows what happens when the pattern we're searching for lies outside
the defined region. The matcher will not find matches outside the specified
region boundaries.

MatcherRegionOutside.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionOutside {

    public static void main(String[] args) {
        
        String input = "Java programming is fun and Java is powerful";
        Pattern pattern = Pattern.compile("Java");
        Matcher matcher = pattern.matcher(input);
        
        // Set region that excludes both "Java" occurrences
        matcher.region(5, 30);
        
        int count = 0;
        while (matcher.find()) {
            count++;
            System.out.println("Match found at " + matcher.start());
        }
        
        System.out.println("Total matches in region: " + count);
    }
}

Here we search for "Java" but set a region that excludes both occurrences of the
word in the input string. The matcher correctly reports no matches within the
specified region.

This demonstrates how the region method can effectively limit the scope of
pattern matching operations, which can be useful for performance optimization.

## Anchors with Region

This example explores how anchors (^ and $) behave when used with regions. The
anchors respect the region boundaries rather than the full input string.

MatcherRegionAnchors.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionAnchors {

    public static void main(String[] args) {
        
        String input = "Start middle end";
        Pattern startPattern = Pattern.compile("^Start");
        Pattern middlePattern = Pattern.compile("^middle");
        Pattern endPattern = Pattern.compile("end$");
        
        // Full string matching
        Matcher matcher = startPattern.matcher(input);
        System.out.println("Matches full string start: " + matcher.find());
        
        // Set region to "middle end"
        matcher.region(6, input.length());
        System.out.println("Matches region start: " + 
            middlePattern.matcher(input).region(6, input.length()).find());
            
        // Set region to "middle"
        matcher = endPattern.matcher(input);
        matcher.region(6, 12);
        System.out.println("Matches region end: " + matcher.find());
    }
}

The example shows that within a region, the ^ anchor matches the start of the
region, not the original string. Similarly, $ matches the end of the region.

This behavior is important to understand when working with regions and patterns
that contain anchors, as it affects how the patterns will match.

## Region with find(int start)

This example demonstrates the interaction between the region method and
find(int start). The start parameter of find is relative to the
region, not the full input.

MatcherRegionFindStart.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionFindStart {

    public static void main(String[] args) {
        
        String input = "abc123def456ghi789";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        // Set region from index 3 to 15 ("123def456")
        matcher.region(3, 15);
        
        // Start searching from position 3 within region
        System.out.println("Matches from position 3:");
        while (matcher.find(3)) {
            System.out.println(matcher.group() + " at " + matcher.start());
        }
        
        // Start searching from position 6 within region
        System.out.println("\nMatches from position 6:");
        matcher.reset();
        while (matcher.find(6)) {
            System.out.println(matcher.group() + " at " + matcher.start());
        }
    }
}

The example shows that find(int start) considers the start
parameter relative to the region start, not the beginning of the full input
string. The region boundaries still limit the matching.

This behavior allows for precise control over where in the region the matching
should begin, while still respecting the overall region constraints.

## Transparent Bounds

This example demonstrates the use of transparent bounds with regions. When bounds
are transparent, lookahead and lookbehind can see beyond the region boundaries.

MatcherRegionTransparent.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionTransparent {

    public static void main(String[] args) {
        
        String input = "prefix123main456suffix";
        Pattern pattern = Pattern.compile("(?&lt;=prefix)\\d+");
        Matcher matcher = pattern.matcher(input);
        
        // Set region that excludes "prefix"
        matcher.region(6, 15); // "123main"
        
        // Without transparent bounds (default)
        System.out.println("Without transparent bounds:");
        if (matcher.find()) {
            System.out.println("Match: " + matcher.group());
        } else {
            System.out.println("No match");
        }
        
        // With transparent bounds
        matcher.reset();
        matcher.region(6, 15);
        matcher.useTransparentBounds(true);
        System.out.println("\nWith transparent bounds:");
        if (matcher.find()) {
            System.out.println("Match: " + matcher.group());
        } else {
            System.out.println("No match");
        }
    }
}

The example shows how transparent bounds affect lookbehind operations. With
default opaque bounds, the lookbehind fails because it can't see outside the
region. With transparent bounds, it succeeds.

This feature is particularly useful when you need to match patterns that depend
on context outside the region you're primarily interested in.

## Region with replaceAll

This example shows how the region method affects replacement operations. Only
matches within the region will be replaced, while text outside remains unchanged.

MatcherRegionReplace.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionReplace {

    public static void main(String[] args) {
        
        String input = "apple banana apple cherry apple";
        Pattern pattern = Pattern.compile("apple");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to replace only the middle "apple"
        matcher.region(7, 20); // "banana apple cherry"
        
        String result = matcher.replaceAll("orange");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
        
        // Verify region boundaries
        System.out.println("Region start: " + matcher.regionStart());
        System.out.println("Region end: " + matcher.regionEnd());
    }
}

The example demonstrates that replaceAll only replaces matches
within the specified region. The first and last "apple" remain unchanged because
they fall outside the region.

This selective replacement capability is useful when you need to modify only
specific portions of a string while leaving other parts intact.

## Region with Multiple Patterns

This final example shows how to use the same region setting with multiple
patterns. The region persists after resetting the matcher with a new pattern.

MatcherRegionMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionMultiple {

    public static void main(String[] args) {
        
        String input = "Name: John, Age: 30, City: New York";
        Matcher matcher = Pattern.compile(":").matcher(input);
        
        // Set region to "Age: 30, City:"
        matcher.region(12, 25);
        
        // Find colons in region
        System.out.println("Colons in region:");
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start());
        }
        
        // Reset with new pattern but keep region
        matcher.usePattern(Pattern.compile("\\d+"));
        System.out.println("\nNumbers in same region:");
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group());
        }
    }
}

The example shows that the region setting persists when changing patterns with
usePattern. This allows efficient searching for different patterns
within the same region of text.

The region boundaries remain consistent across pattern changes, providing a
consistent scope for all matching operations.

## Source

[Java Matcher.region Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#region-int-int-)

In this article, we've explored the Matcher.region method in depth with practical
examples. This powerful feature enables precise control over regex matching
boundaries in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).