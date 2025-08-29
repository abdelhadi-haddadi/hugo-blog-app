+++
title = "Java Matcher.regionEnd Method"
date = 2025-08-29T20:00:15.323+01:00
draft = false
description = "Complete Java Matcher.regionEnd method tutorial with examples. Learn about region manipulation in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.regionEnd Method

Last modified: April 20, 2025

 

The Matcher.regionEnd method is part of Java's regex API. It returns
the end index (exclusive) of the current region for this matcher. The region
defines the bounds within which the matcher operates.

Regions are useful when you want to limit pattern matching to a specific portion
of the input sequence. The region starts at regionStart and extends
to regionEnd. By default, the region covers the entire input.

## Matcher.regionEnd Basics

The regionEnd method returns the end index of the current matching
region. This is the index after the last character that will be searched. The
method is typically used with regionStart and region.

Changing the region affects all subsequent matching operations. The indices are
zero-based, and the end index is exclusive. This means matching stops before
reaching the end index.

## Basic regionEnd Example

This example demonstrates how to use regionEnd to get the current
region boundary. We'll create a matcher and examine its default region settings.

RegionEndBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndBasic {
    
    public static void main(String[] args) {

        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(input);

        // Get default region end (entire input length)
        int end = matcher.regionEnd();
        System.out.println("Default region end: " + end);
        System.out.println("Input length: " + input.length());

        // Find matches within default region
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
    }
}

In this example, we create a matcher with the default region covering the entire
input string. The regionEnd method returns the same value as the
input length. The matcher finds all occurrences of "fox" in the full string.

## Setting a Custom Region

Here we'll set a custom region and use regionEnd to verify the new
boundary. The matcher will only search within the specified region.

RegionEndCustom.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndCustom {
    
    public static void main(String[] args) {
        String input = "Java 8, Java 11, Java 17";
        Pattern pattern = Pattern.compile("Java \\d+");
        Matcher matcher = pattern.matcher(input);

        // Set custom region (first 10 characters)
        matcher.region(0, 10);
        System.out.println("Region start: " + matcher.regionStart());
        System.out.println("Region end: " + matcher.regionEnd());

        // Find matches within custom region
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group());
        }
    }
}

This example limits the search to the first 10 characters of the input. The
matcher only finds "Java 8" because "Java 11" starts at position 8 but extends
beyond our region end of 10. The regionEnd confirms our boundary.

## RegionEnd with Multiple Regions

This example shows how changing regions affects matching behavior. We'll use
regionEnd to verify each region's boundaries.

RegionEndMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndMultiple {
    
    public static void main(String[] args) {
        String input = "apple banana cherry date elderberry";
        Pattern pattern = Pattern.compile("[a-z]+");
        Matcher matcher = pattern.matcher(input);

        // First region: first 15 characters
        matcher.region(0, 15);
        System.out.println("Region 1 end: " + matcher.regionEnd());
        System.out.println("Matches in region 1:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }

        // Second region: characters 10-25
        matcher.region(10, 25);
        System.out.println("\nRegion 2 end: " + matcher.regionEnd());
        System.out.println("Matches in region 2:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}

We demonstrate two different regions in this example. The first region captures
"apple" and "banana". The second region starts in the middle of "banana" and
captures "cherry" and "date". regionEnd helps verify each region's
boundaries.

## RegionEnd with Anchors

Region boundaries affect how anchors like ^ and $ behave. This example shows the
interaction between regions and anchors, using regionEnd to confirm
the matching area.

RegionEndAnchors.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndAnchors {

    public static void main(String[] args) {

        String input = "start\nmiddle\nend";
        Pattern pattern = Pattern.compile("^end$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(input);

        // Full input region
        System.out.println("Full region end: " + matcher.regionEnd());
        System.out.println("Matches in full region:");
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }

        // Restricted region (excludes last line)
        matcher.region(0, input.indexOf("\nend"));
        System.out.println("\nRestricted region end: " + matcher.regionEnd());
        System.out.println("Matches in restricted region:");
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
    }
}

With the full region, the matcher finds "end" at the end of the input. When we
restrict the region to exclude the last line, the anchor no longer matches.
regionEnd helps us understand why the match fails in the second case.

## RegionEnd with Reset

The reset method affects the matcher's region. This example shows
how reset changes the region boundaries back to default.

RegionEndReset.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndReset {
    
    public static void main(String[] args) {
        String input = "one two three four five";
        Pattern pattern = Pattern.compile("\\w+");
        Matcher matcher = pattern.matcher(input);

        // Set custom region
        matcher.region(4, 12);
        System.out.println("Custom region end: " + matcher.regionEnd());

        // Reset matcher
        matcher.reset();
        System.out.println("After reset, region end: " + matcher.regionEnd());

        // Verify matches in default region
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}

After setting a custom region, reset returns the matcher to its
original state with the region covering the entire input. The
regionEnd value changes accordingly, and subsequent matches scan
the full input string.

## RegionEnd with Transparent Bounds

This advanced example demonstrates how useTransparentBounds affects
matching at region boundaries. We'll use regionEnd to track the
region size.

RegionEndTransparent.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndTransparent {
    
    public static void main(String[] args) {
        String input = "abcdefghijklmnop";
        Pattern pattern = Pattern.compile("defghijk");
        Matcher matcher = pattern.matcher(input);

        // Set region that excludes part of the pattern
        matcher.region(2, 9);
        System.out.println("Region end: " + matcher.regionEnd());

        // Try matching with opaque bounds (default)
        System.out.println("With opaque bounds: " + matcher.matches());

        // Enable transparent bounds
        matcher.useTransparentBounds(true);
        System.out.println("With transparent bounds: " + matcher.matches());
    }
}

With opaque bounds (default), the matcher fails because the pattern extends
beyond the region end. With transparent bounds, lookahead/lookbehind can see
beyond the region. regionEnd helps us understand the boundary where
this behavior changes.

## RegionEnd Performance Considerations

This example shows how using regions can improve performance by limiting the
search area. We'll use regionEnd to verify our restricted search.

RegionEndPerformance.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegionEndPerformance {

    public static void main(String[] args) {
        
        // Large input with target near start
        StringBuilder sb = new StringBuilder();
        sb.append("target");
        sb.append("x".repeat(100000));

        String input = sb.toString();

        Pattern pattern = Pattern.compile("target");
        Matcher matcher = pattern.matcher(input);

        // Limit search to first 100 characters
        matcher.region(0, 100);
        System.out.println("Restricted region end: " + matcher.regionEnd());

        long startTime = System.nanoTime();
        boolean found = matcher.find();
        long duration = System.nanoTime() - startTime;

        System.out.println("Found: " + found);
        System.out.println("Search time (ns): " + duration);
    }
}

By restricting the region to the first 100 characters, we avoid scanning the
entire large string. regionEnd confirms our search boundary. This
technique can significantly improve performance when you know the match location.

## Source

[Java Matcher.regionEnd Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#regionEnd--)

In this tutorial, we've explored the Matcher.regionEnd method and
its role in regex region manipulation. Understanding regions is crucial for
efficient and targeted pattern matching in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).