+++
title = "Java Matcher.regionStart Method"
date = 2025-08-29T20:00:15.301+01:00
draft = false
description = "Complete Java Matcher.regionStart method tutorial with examples. Learn about region operations in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.regionStart Method

Last modified: April 20, 2025

 

The Matcher.regionStart method returns the start index of the
current search region. This is part of Java's regex region functionality.

Regions allow you to limit pattern matching to specific portions of the input.
The regionStart method helps inspect the current region bounds.

## Matcher.regionStart Overview

The regionStart method is a simple getter that returns an integer.
This integer represents the inclusive start index of the current search region.

By default, the region spans the entire input string (start = 0). You can change
this using the region method. The region affects all matching
operations.

## Basic regionStart Example

This example demonstrates the default behavior of regionStart.
Without setting a region, it returns 0, indicating the entire input is searched.

MatcherRegionStartBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionStartBasic {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("Default regionStart: " + matcher.regionStart());
        
        boolean found = matcher.find();
        System.out.println("Match found: " + found);
        System.out.println("Match start: " + matcher.start());
    }
}

The output shows the default region starts at index 0. The matcher finds "fox"
at position 16. The regionStart value doesn't change after matching.

## Setting a Custom Region

This example shows how to set a custom region and verify its start position.
We limit the search to a portion of the input string.

MatcherRegionCustom.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionCustom {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox|dog");
        Matcher matcher = pattern.matcher(input);
        
        // Set region from index 20 to end
        matcher.region(20, input.length());
        System.out.println("Custom regionStart: " + matcher.regionStart());
        
        while (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                "' at " + matcher.start());
        }
    }
}

With the region starting at 20, the matcher only finds "dog". The earlier "fox"
is outside the region. The regionStart correctly reports 20.

## Region Start with Anchors

This example demonstrates how region start affects anchor matching. Anchors like
^ behave differently when a region is set.

MatcherRegionAnchors.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionAnchors {

    public static void main(String[] args) {
        
        String input = "First line\nSecond line\nThird line";
        Pattern pattern = Pattern.compile("^.*$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(input);
        
        // Set region starting at line 2
        matcher.region(input.indexOf("Second"), input.length());
        System.out.println("Region starts at: " + matcher.regionStart());
        
        while (matcher.find()) {
            System.out.println("Match: '" + matcher.group() + "'");
        }
    }
}

The ^ anchor matches at the region start when MULTILINE is enabled. This shows
how regionStart affects anchor behavior. Only lines within the
region are matched.

## Resetting the Region

This example shows how to reset the region to its default state and verify the
regionStart value changes accordingly.

MatcherRegionReset.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionReset {

    public static void main(String[] args) {
        
        String input = "Sample text for region demonstration";
        Pattern pattern = Pattern.compile("text");
        Matcher matcher = pattern.matcher(input);
        
        // Set custom region
        matcher.region(10, 20);
        System.out.println("Custom regionStart: " + matcher.regionStart());
        
        // Reset to default region
        matcher.reset();
        System.out.println("Reset regionStart: " + matcher.regionStart());
        
        // Verify matching works on full input
        System.out.println("Match found: " + matcher.find());
    }
}

After resetting, regionStart returns to 0. The matcher can then
find matches in the entire input string again. Reset clears both region and
match state.

## Region Start with LookingAt

This example shows how regionStart affects the lookingAt
method, which tries to match at the region start.

MatcherRegionLookingAt.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionLookingAt {

    public static void main(String[] args) {
        
        String input = "Start middle end";
        Pattern pattern = Pattern.compile("middle");
        Matcher matcher = pattern.matcher(input);
        
        // Set region starting at "middle"
        matcher.region(6, input.length());
        System.out.println("Region starts at: " + matcher.regionStart());
        
        // lookingAt tries to match at region start
        System.out.println("lookingAt: " + matcher.lookingAt());
        
        // Compare with matches (must match entire region)
        System.out.println("matches: " + matcher.matches());
    }
}

lookingAt succeeds because it matches at the region start.
matches fails as it requires the entire region to match. The
regionStart shows where matching begins.

## Multiple Region Changes

This example demonstrates how regionStart changes with multiple
region adjustments during matching operations.

MatcherRegionMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionMultiple {

    public static void main(String[] args) {
        
        String input = "123-456-789-012";
        Pattern pattern = Pattern.compile("\\d{3}");
        Matcher matcher = pattern.matcher(input);
        
        // Initial region
        matcher.region(0, 9);
        System.out.println("First regionStart: " + matcher.regionStart());
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
        
        // Change region
        matcher.region(4, input.length());
        System.out.println("\nSecond regionStart: " + matcher.regionStart());
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
    }
}

The output shows how regionStart updates with each region change.
Different matches are found in each region. The method accurately reflects the
current search boundary.

## Region Start with Hit End

This example explores the relationship between regionStart and the
hitEnd method after partial matches.

MatcherRegionHitEnd.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegionHitEnd {

    public static void main(String[] args) {
        
        String input = "partial match: cat";
        Pattern pattern = Pattern.compile("category");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to include "cat" but not full pattern
        matcher.region(14, 17);
        System.out.println("regionStart: " + matcher.regionStart());
        
        System.out.println("matches: " + matcher.matches());
        System.out.println("hitEnd: " + matcher.hitEnd());
    }
}

Although the match fails, hitEnd returns true because matching
stopped at the region end. The regionStart shows where matching
began. This is useful for incremental matching.

## Source

[Java Matcher.regionStart Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#regionStart--)

This tutorial covered the Matcher.regionStart method in depth.
Understanding regions is crucial for efficient regex processing in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).