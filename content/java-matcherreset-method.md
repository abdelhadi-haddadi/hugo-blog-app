+++
title = "Java Matcher.reset Method"
date = 2025-08-29T20:00:16.431+01:00
draft = false
description = "Complete Java Matcher.reset method tutorial with examples. Learn how to reset matcher state in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.reset Method

Last modified: April 20, 2025

 

The java.util.regex.Matcher.reset method resets the matcher's state.
This allows reusing the same matcher with new input or restarting matching from
the beginning. The method is essential for efficient regex processing in Java.

Matcher objects maintain internal state during matching operations. The reset
method clears this state, making the matcher ready for new operations. It can
optionally accept a new input character sequence to match against.

## Matcher Class Overview

The Matcher class interprets patterns and performs match operations against
input strings. It is created by invoking the matcher method on a
Pattern object. Matcher provides methods for finding, matching, and replacing.

Matcher maintains state about the current match position and group information.
The reset method clears this state, allowing the matcher to be
reused. This is more efficient than creating new Matcher instances.

## Basic reset Usage

The simplest form of reset clears the matcher's state without changing the input.
This allows re-matching the same input from the beginning. The method returns
the matcher itself for method chaining.

MatcherResetBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetBasic {

    public static void main(String[] args) {
        
        String input = "apple orange apple banana";
        Pattern pattern = Pattern.compile("apple");
        Matcher matcher = pattern.matcher(input);
        
        // First match
        System.out.println("First match:");
        if (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
        
        // Reset and match again
        matcher.reset();
        System.out.println("\nAfter reset:");
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start());
        }
    }
}

This example demonstrates basic reset functionality. We first find one match,
then reset the matcher to find all matches. Without reset, the second loop
would start from where the first match ended.

The output shows both matches of "apple" in the input string. Reset allows
us to restart matching from the beginning of the input sequence.

## Reset with New Input

The reset method can accept a new CharSequence input parameter.
This changes the input text while keeping the same pattern. The matcher is
reset to the start of the new input.

MatcherResetNewInput.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetNewInput {

    public static void main(String[] args) {
        
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher("123 456");
        
        // Match first input
        System.out.println("First input matches:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
        
        // Reset with new input
        matcher.reset("789 101112");
        System.out.println("\nSecond input matches:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}

This example shows how to reuse a matcher with different input text. We create
a matcher with one input, then reset it with another input. The same pattern
is applied to both inputs.

Using reset with new input is more efficient than creating a new matcher. It
reuses the compiled pattern and matcher infrastructure.

## Reset in Loop Processing

When processing multiple inputs with the same pattern, reset helps avoid
creating new matchers. This is particularly useful in performance-sensitive
code or when processing large numbers of inputs.

MatcherResetLoop.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetLoop {

    public static void main(String[] args) {
        
        String[] inputs = {
            "John: 30", "Alice: 25", "Bob: 40", "invalid entry"
        };
        
        Pattern pattern = Pattern.compile("(\\w+): (\\d+)");
        Matcher matcher = pattern.matcher("");
        
        for (String input : inputs) {
            matcher.reset(input);
            if (matcher.matches()) {
                System.out.printf("Name: %s, Age: %s%n",
                    matcher.group(1), matcher.group(2));
            } else {
                System.out.println("Invalid format: " + input);
            }
        }
    }
}

This example processes an array of strings with a single matcher instance. For
each input, we reset the matcher with the new string. This avoids the overhead
of creating new matchers for each input.

The pattern extracts name and age from properly formatted strings. Invalid
formats are detected and reported separately.

## Reset with Group Information

The reset method clears all match state including group information. After
reset, group-related methods will throw IllegalStateException until a new
match is performed.

MatcherResetGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetGroups {

    public static void main(String[] args) {
        
        String input = "Date: 2023-04-20";
        Pattern pattern = Pattern.compile("Date: (\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.matches()) {
            System.out.println("Year: " + matcher.group(1));
            System.out.println("Month: " + matcher.group(2));
            System.out.println("Day: " + matcher.group(3));
        }
        
        matcher.reset();
        
        try {
            // This will throw IllegalStateException
            System.out.println("After reset: " + matcher.group(1));
        } catch (IllegalStateException e) {
            System.out.println("\nExpected exception: " + e.getMessage());
        }
    }
}

This example demonstrates how reset affects group information. After a successful
match, we can access captured groups. After reset, attempting to access groups
throws an exception until we perform another match.

The exception occurs because group information is only valid after a successful
match operation. Reset clears this cached information.

## Reset vs New Matcher

While reset allows reusing matchers, sometimes creating new matchers is clearer.
This example compares both approaches for performance and memory usage.

MatcherResetVsNew.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetVsNew {

    public static void main(String[] args) {
        
        String[] inputs = new String[1000];
        for (int i = 0; i &lt; inputs.length; i++) {
            inputs[i] = "input" + i + " value" + i;
        }
        
        Pattern pattern = Pattern.compile("input(\\d+) value\\1");
        
        // Approach 1: Reset and reuse
        long start = System.nanoTime();
        Matcher matcher = pattern.matcher("");
        for (String input : inputs) {
            matcher.reset(input);
            matcher.matches();
        }
        long resetTime = System.nanoTime() - start;
        
        // Approach 2: New matcher each time
        start = System.nanoTime();
        for (String input : inputs) {
            Matcher m = pattern.matcher(input);
            m.matches();
        }
        long newTime = System.nanoTime() - start;
        
        System.out.printf("Reset approach: %,d ns%n", resetTime);
        System.out.printf("New matcher approach: %,d ns%n", newTime);
    }
}

This benchmark compares resetting a matcher versus creating new matchers. In
most cases, resetting is slightly faster as it avoids object allocation.
However, the difference may be negligible for many applications.

The choice between approaches depends on code clarity requirements and
performance needs. For critical loops, reset may offer better performance.

## Reset with Region Changes

The reset method also clears any region settings applied to the matcher. After
reset, the matcher operates on the entire input sequence again.

MatcherResetRegion.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetRegion {

    public static void main(String[] args) {
        
        String input = "123-456-789";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        // Set region to match only the middle part
        matcher.region(4, 7);
        System.out.println("Matches in region:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
        
        // Reset clears region settings
        matcher.reset();
        System.out.println("\nMatches after reset:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}

This example shows how reset affects region settings. We first constrain
matching to a substring region, then reset to match the entire input again.

Reset returns the matcher to its default state where the region encompasses
the entire input sequence. All region-specific restrictions are removed.

## Reset in Multithreaded Environments

While Matcher instances are not thread-safe, reset can help safely reuse
matchers in controlled multithreaded scenarios. Each thread should have its
own matcher instance.

MatcherResetThreads.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherResetThreads {

    public static void main(String[] args) {
        
        Pattern pattern = Pattern.compile("\\b\\w{4}\\b");
        String[] inputs = {
            "This is a test string",
            "Four word length test",
            "Another example input"
        };
        
        for (String input : inputs) {
            new Thread(() -&gt; {
                Matcher matcher = pattern.matcher("");
                matcher.reset(input);
                
                System.out.println(Thread.currentThread().getName() + ":");
                while (matcher.find()) {
                    System.out.println("  " + matcher.group());
                }
            }).start();
        }
    }
}

This example demonstrates thread-safe matcher usage. Each thread creates and
resets its own matcher instance. The pattern is shared safely as it's immutable.

The output shows each thread processing its input independently. Reset allows
reusing the matcher while maintaining thread safety through proper instance
isolation.

## Source

[Java Matcher.reset Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#reset())

In this article, we've explored the Matcher.reset method in depth. We've covered
its basic usage, performance implications, and thread safety considerations.
Understanding reset is key to efficient regex processing in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).