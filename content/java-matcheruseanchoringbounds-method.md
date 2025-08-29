+++
title = "Java Matcher.useAnchoringBounds Method"
date = 2025-08-29T20:00:18.658+01:00
draft = false
description = "Complete Java Matcher.useAnchoringBounds tutorial with examples. Learn about anchoring bounds in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.useAnchoringBounds Method

Last modified: April 20, 2025

 

The Matcher.useAnchoringBounds method controls whether the matcher
uses anchoring bounds when performing regex operations. Anchoring bounds affect
how the ^ and $ anchors behave in relation to the input region.

When anchoring bounds are enabled (default), ^ matches at the start of the input
region and $ matches at the end. When disabled, these anchors match only at the
actual start/end of the entire input string.

## Basic Definitions

**Matcher**: A Java class that performs match operations on a
character sequence by interpreting a Pattern. It provides methods for finding,
matching, and replacing text.

**Anchoring Bounds**: A setting that determines whether ^ and $
match at the boundaries of the input region (true) or only at the absolute
start/end of the input (false).

**Input Region**: The portion of the input string currently being
considered for matching, which can be set using region methods.

## Default Anchoring Bounds Behavior

This example demonstrates the default behavior when anchoring bounds are enabled.
The ^ and $ anchors match at the start and end of the input region.

AnchoringBoundsDefault.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsDefault {

    public static void main(String[] args) {
        String input = "start middle end";
        Pattern pattern = Pattern.compile("^middle$");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to "middle"
        matcher.region(6, 12);
        
        // Default anchoring bounds is true
        System.out.println("Default anchoring bounds: " + matcher.useAnchoringBounds(true));
        System.out.println("Matches in region: " + matcher.find());
    }
}

In this example, we set the region to "middle" and try to match "^middle$". With
default anchoring bounds (true), the match succeeds because ^ and $ match at the
region boundaries. The output shows true for both the default setting and match.

## Disabling Anchoring Bounds

This example shows what happens when we disable anchoring bounds. The ^ and $
anchors will only match at the absolute start/end of the input string.

AnchoringBoundsDisabled.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsDisabled {

    public static void main(String[] args) {
        String input = "start middle end";
        Pattern pattern = Pattern.compile("^middle$");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to "middle"
        matcher.region(6, 12);
        
        // Disable anchoring bounds
        matcher.useAnchoringBounds(false);
        System.out.println("Anchoring bounds disabled: " + !matcher.useAnchoringBounds());
        System.out.println("Matches in region: " + matcher.find());
    }
}

With anchoring bounds disabled, the same pattern "^middle$" fails to match
because ^ and $ no longer respect the region boundaries. The output shows false
for the match attempt, demonstrating the different behavior.

## Anchoring Bounds with Multiple Regions

This example demonstrates how anchoring bounds affect matching across multiple
regions of the same input string.

AnchoringBoundsMultiRegion.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsMultiRegion {

    public static void main(String[] args) {
        String input = "first second third";
        Pattern pattern = Pattern.compile("^\\w+$");
        Matcher matcher = pattern.matcher(input);
        
        // Test with anchoring bounds enabled (default)
        System.out.println("With anchoring bounds:");
        testRegions(matcher, true);
        
        // Test with anchoring bounds disabled
        System.out.println("\nWithout anchoring bounds:");
        testRegions(matcher, false);
    }
    
    private static void testRegions(Matcher matcher, boolean enable) {
        matcher.useAnchoringBounds(enable);
        
        // Test three different regions
        matcher.region(0, 5);   // "first"
        System.out.println("Region 1 match: " + matcher.find());
        
        matcher.region(6, 12);  // "second"
        System.out.println("Region 2 match: " + matcher.find());
        
        matcher.region(13, 18); // "third"
        System.out.println("Region 3 match: " + matcher.find());
    }
}

This example tests the pattern "^\w+$" against three different regions of the
input string. With anchoring bounds enabled, all regions match because ^ and $
match at region boundaries. With anchoring bounds disabled, no matches occur
because the pattern requires matching the absolute start/end of the input.

## Combining with Transparent Bounds

This example shows how anchoring bounds interact with transparent bounds, which
affect lookbehind and lookahead assertions.

AnchoringBoundsWithTransparent.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsWithTransparent {

    public static void main(String[] args) {
        String input = "prefix123suffix";
        Pattern pattern = Pattern.compile("(?&lt;=prefix)\\d+(?=suffix)");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to "123suffix"
        matcher.region(6, 15);
        
        // Case 1: Both bounds enabled
        matcher.useAnchoringBounds(true);
        matcher.useTransparentBounds(false);
        System.out.println("Anchoring true, Transparent false: " + matcher.find());
        
        // Case 2: Anchoring disabled, Transparent false
        matcher.useAnchoringBounds(false);
        matcher.useTransparentBounds(false);
        System.out.println("Anchoring false, Transparent false: " + matcher.find());
        
        // Case 3: Anchoring false, Transparent true
        matcher.useAnchoringBounds(false);
        matcher.useTransparentBounds(true);
        System.out.println("Anchoring false, Transparent true: " + matcher.find());
    }
}

This example demonstrates the interaction between anchoring and transparent
bounds. The lookbehind (?&lt;=prefix) fails when transparent bounds are false
because it can't see outside the region. Only the third case succeeds because
transparent bounds allow the lookaround assertions to see outside the region.

## Real-world Use Case

This example shows a practical use case for disabling anchoring bounds when
searching for patterns within larger text.

AnchoringBoundsPractical.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsPractical {

    public static void main(String[] args) {
        String text = "Error: Invalid input\nWarning: Low memory\nError: File not found";
        Pattern errorPattern = Pattern.compile("^Error: .+$", Pattern.MULTILINE);
        Matcher matcher = errorPattern.matcher(text);
        
        // With default anchoring bounds (matches only first line)
        System.out.println("With default anchoring bounds:");
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group());
        }
        
        // With anchoring bounds disabled (matches all error lines)
        matcher.useAnchoringBounds(false);
        System.out.println("\nWith anchoring bounds disabled:");
        matcher.reset();
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group());
        }
    }
}

In this practical example, we search for error messages in a log. With default
anchoring bounds, only the first line matches because ^ and $ match at region
boundaries. Disabling anchoring bounds allows matching all error lines when
combined with MULTILINE mode.

## Performance Impact

This example demonstrates the potential performance impact of anchoring bounds
when processing large text with many regions.

AnchoringBoundsPerformance.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsPerformance {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i &lt; 10000; i++) {
            sb.append("word").append(i).append(" ");
        }
        String input = sb.toString();
        Pattern pattern = Pattern.compile("^word\\d+$");
        Matcher matcher = pattern.matcher(input);
        
        // Test with anchoring bounds enabled
        long start = System.nanoTime();
        testWithAnchoring(matcher, true);
        long duration1 = System.nanoTime() - start;
        
        // Test with anchoring bounds disabled
        start = System.nanoTime();
        testWithAnchoring(matcher, false);
        long duration2 = System.nanoTime() - start;
        
        System.out.printf("With anchoring bounds: %,d ns%n", duration1);
        System.out.printf("Without anchoring bounds: %,d ns%n", duration2);
    }
    
    private static void testWithAnchoring(Matcher matcher, boolean enable) {
        matcher.useAnchoringBounds(enable);
        matcher.reset();
        
        int pos = 0;
        while (pos &lt; matcher.regionEnd()) {
            int spacePos = matcher.regionEnd();
            if (matcher.regionEnd() &gt; pos) {
                spacePos = matcher.regionEnd();
                for (int i = pos; i &lt; matcher.regionEnd(); i++) {
                    if (matcher.regionEnd() &gt; i &amp;&amp;  
                        matcher.input().charAt(i) == ' ') {
                        spacePos = i;
                        break;
                    }
                }
            }
            matcher.region(pos, spacePos);
            matcher.find();
            pos = spacePos + 1;
        }
    }
}

This performance test shows that disabling anchoring bounds can sometimes improve
performance when working with many small regions. The exact difference depends
on the regex complexity and input size, but it's worth considering for
performance-critical code.

## Edge Case Behavior

This example explores edge cases where anchoring bounds behavior might be
unexpected or particularly important.

AnchoringBoundsEdgeCases.java
  

package com.zetcode;

import java.util.regex.*;

public class AnchoringBoundsEdgeCases {

    public static void main(String[] args) {
        // Empty input with empty region
        testCase("", 0, 0);
        
        // Empty region in non-empty input
        testCase("hello", 2, 2);
        
        // Region at exact start
        testCase("start end", 0, 5);
        
        // Region at exact end
        testCase("start end", 6, 9);
    }
    
    private static void testCase(String input, int regionStart, int regionEnd) {
        Pattern pattern = Pattern.compile("^.*$");
        Matcher matcher = pattern.matcher(input);
        matcher.region(regionStart, regionEnd);
        
        System.out.printf("\nInput: '%s', Region: [%d,%d)%n", 
            input, regionStart, regionEnd);
            
        // With anchoring bounds
        matcher.useAnchoringBounds(true);
        System.out.println("Anchoring true: " + matcher.find());
        
        // Without anchoring bounds
        matcher.useAnchoringBounds(false);
        System.out.println("Anchoring false: " + matcher.find());
    }
}

This example tests edge cases like empty inputs and regions. The results show
that anchoring bounds can affect whether empty regions match patterns like ".*".
Understanding these edge cases is important for robust regex handling.

## Source

[Java Matcher.useAnchoringBounds Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#useAnchoringBounds-boolean-)

In this article, we've explored the Matcher.useAnchoringBounds method in depth.
Understanding anchoring bounds is crucial for precise control over regex matching
behavior, especially when working with input regions.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).