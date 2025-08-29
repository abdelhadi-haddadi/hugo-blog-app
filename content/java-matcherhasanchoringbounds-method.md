+++
title = "Java Matcher.hasAnchoringBounds Method"
date = 2025-08-29T20:00:13.086+01:00
draft = false
description = "Complete Java Matcher.hasAnchoringBounds tutorial with examples. Learn about anchoring bounds in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.hasAnchoringBounds Method

Last modified: April 20, 2025

 

The Matcher.hasAnchoringBounds method in Java's regex package checks
whether a matcher is using anchoring bounds. Anchoring bounds affect how the
^ and $ metacharacters behave during matching.

When anchoring bounds are enabled (default), ^ and $
match at the start and end of the input text region. When disabled, they match
only at the actual start/end of input, ignoring the region boundaries.

## Matcher.hasAnchoringBounds Overview

The hasAnchoringBounds method returns a boolean indicating if
anchoring bounds are enabled. This setting is controlled by the
useAnchoringBounds method. By default, anchoring bounds are enabled.

Anchoring bounds are particularly important when working with sub-regions of
input text. They determine whether pattern anchors should respect the current
region boundaries or the full input boundaries.

## Basic hasAnchoringBounds Example

This example demonstrates the default behavior of anchoring bounds and how to
check their status using hasAnchoringBounds. We'll create a simple
matcher and inspect its anchoring bounds setting.

HasAnchoringBoundsBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HasAnchoringBoundsBasic {

    public static void main(String[] args) {
        
        String input = "start middle end";
        String regex = "^middle$";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Check default anchoring bounds status
        boolean hasBounds = matcher.hasAnchoringBounds();
        System.out.println("Default hasAnchoringBounds: " + hasBounds);
        
        // Try to match with default bounds
        boolean matches = matcher.find();
        System.out.println("Matches with default bounds: " + matches);
    }
}

In this example, we create a matcher with the default anchoring bounds setting.
The hasAnchoringBounds method returns true, indicating
anchoring bounds are enabled. The pattern fails to match because ^
and $ respect the full input boundaries.

## Disabling Anchoring Bounds

This example shows how to disable anchoring bounds using
useAnchoringBounds(false) and verify the change with
hasAnchoringBounds. We'll see how this affects pattern matching.

DisableAnchoringBounds.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DisableAnchoringBounds {

    public static void main(String[] args) {
        
        String input = "start middle end";
        String regex = "^middle$";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Disable anchoring bounds
        matcher.useAnchoringBounds(false);
        System.out.println("After disabling: " + 
            matcher.hasAnchoringBounds());
            
        // Try to match with disabled bounds
        boolean matches = matcher.find();
        System.out.println("Matches with disabled bounds: " + matches);
    }
}

After calling useAnchoringBounds(false), the
hasAnchoringBounds method returns false. The pattern
still doesn't match because we're searching the entire input. The anchors now
refer to the full input boundaries.

## Anchoring Bounds with Regions

This example demonstrates how anchoring bounds interact with region setting. We'll
set a sub-region of the input and observe how anchoring bounds affect matching.

AnchoringBoundsWithRegion.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnchoringBoundsWithRegion {

    public static void main(String[] args) {
        
        String input = "start middle end";
        String regex = "^middle$";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Set region to "middle"
        matcher.region(6, 12);
        
        // With anchoring bounds (default)
        boolean matchesWithBounds = matcher.find();
        System.out.println("With anchoring bounds: " + matchesWithBounds);
        
        // Without anchoring bounds
        matcher.useAnchoringBounds(false);
        boolean matchesWithoutBounds = matcher.find();
        System.out.println("Without anchoring bounds: " + matchesWithoutBounds);
    }
}

With anchoring bounds enabled (default), ^ and $ match
at the region boundaries, so the pattern matches. When disabled, the anchors
refer to the full input boundaries, causing the match to fail.

## Anchoring Bounds with Multi-line Input

This example explores how anchoring bounds interact with multi-line input and the
MULTILINE flag. We'll see how different combinations affect matching.

AnchoringBoundsMultiline.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnchoringBoundsMultiline {

    public static void main(String[] args) {
        
        String input = "first line\nsecond line\nthird line";
        String regex = "^second$";
        
        // With MULTILINE flag
        Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("With MULTILINE and anchoring bounds:");
        System.out.println("hasAnchoringBounds: " + 
            matcher.hasAnchoringBounds());
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
        
        // Without MULTILINE flag
        matcher = Pattern.compile(regex).matcher(input);
        matcher.useAnchoringBounds(false);
        System.out.println("\nWithout MULTILINE, no anchoring bounds:");
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
    }
}

With MULTILINE flag, ^ matches after line terminators
regardless of anchoring bounds. Without MULTILINE and with anchoring
bounds disabled, ^ only matches at the absolute start of input.

## Anchoring Bounds Performance Impact

This example examines whether anchoring bounds affect matching performance. We'll
compare matching times with and without anchoring bounds enabled.

AnchoringBoundsPerformance.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnchoringBoundsPerformance {

    public static void main(String[] args) {
        
        String input = "sample text ".repeat(100000) + "target";
        String regex = "^target$";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // With anchoring bounds (default)
        long startTime = System.nanoTime();
        boolean found = matcher.find();
        long duration = System.nanoTime() - startTime;
        System.out.printf("With anchoring bounds: %d ns, found: %b%n",
            duration, found);
            
        // Without anchoring bounds
        matcher.useAnchoringBounds(false);
        startTime = System.nanoTime();
        found = matcher.find();
        duration = System.nanoTime() - startTime;
        System.out.printf("Without anchoring bounds: %d ns, found: %b%n",
            duration, found);
    }
}

The performance impact of anchoring bounds is typically negligible. Both versions
complete in similar time, as the regex engine optimizes anchor matching. The
primary difference is in matching behavior, not performance.

## Anchoring Bounds with Reset

This example shows how the reset method affects anchoring bounds
settings. We'll verify whether the bounds setting persists after resetting the
matcher.

AnchoringBoundsReset.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AnchoringBoundsReset {

    public static void main(String[] args) {
        
        String input = "test string";
        Pattern pattern = Pattern.compile("^test");
        Matcher matcher = pattern.matcher(input);
        
        // Change anchoring bounds
        matcher.useAnchoringBounds(false);
        System.out.println("Before reset: " + 
            matcher.hasAnchoringBounds());
            
        // Reset matcher
        matcher.reset();
        System.out.println("After reset: " + 
            matcher.hasAnchoringBounds());
            
        // Reset with new input
        matcher.reset("new input");
        System.out.println("After reset with new input: " + 
            matcher.hasAnchoringBounds());
    }
}

The reset method preserves the anchoring bounds setting, whether
called with or without a new input string. This demonstrates that the bounds
setting is a property of the matcher, not its current state.

## Source

[Java Matcher.hasAnchoringBounds Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hasAnchoringBounds--)

In this article, we've explored the Matcher.hasAnchoringBounds
method and its implications for regex matching in Java. Understanding anchoring
bounds is crucial when working with input regions or multi-line text.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).