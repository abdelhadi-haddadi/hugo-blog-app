+++
title = "Java Matcher Class"
date = 2025-08-29T20:00:10.857+01:00
draft = false
description = "Complete Java Matcher class tutorial covering all methods with examples. Learn about regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher Class

Last modified: April 20, 2025

 

The java.util.regex.Matcher class is used to perform match operations
on character sequences using patterns. It interprets a compiled regex pattern
against input text to find matches. Matcher objects are not thread-safe.

Matcher provides methods to perform various matching operations, examine match
results, and modify input text. It works in conjunction with the Pattern class
to provide full regex functionality in Java applications.

## Matcher Class Overview

Matcher is created by calling Pattern.matcher with an input
sequence. It maintains state about the current match position and provides
methods to query and manipulate matches. The class supports both simple and
complex matching scenarios.

Key methods include matches, find,
group, and various replacement methods. Matcher also supports
named capturing groups and region limiting for partial matching.

## Basic Matching Operations

The Matcher class provides three fundamental matching methods:
matches, lookingAt, and find. Each
serves a different purpose in pattern matching operations.

MatcherBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherBasic {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("quick.*fox");
        
        Matcher matcher = pattern.matcher(input);
        
        // matches() - entire input must match
        System.out.println("matches(): " + matcher.matches());
        
        // lookingAt() - input must match from beginning
        System.out.println("lookingAt(): " + matcher.lookingAt());
        
        // find() - match anywhere in input
        System.out.println("find(): " + matcher.find());
        
        // Reset matcher to start from beginning
        matcher.reset();
        
        // Find all matches
        System.out.println("\nAll matches:");
        while (matcher.find()) {
            System.out.println("Found at: " + matcher.start() + "-" + matcher.end());
        }
    }
}

This example demonstrates the three basic matching methods. matches
checks if the entire input matches the pattern. lookingAt checks
if the input starts with the pattern. find searches for the
pattern anywhere in the input.

The example also shows how to use start and end to
get match positions. reset repositions the matcher to the
beginning of the input for repeated searches.

## Group Capturing

Matcher supports capturing groups defined by parentheses in the regex pattern.
Groups allow extracting specific portions of matched text. Group 0 represents
the entire match, while groups 1+ represent captured subpatterns.

MatcherGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroups {

    public static void main(String[] args) {
        
        String input = "John Doe, age 30, email: john.doe@example.com";
        Pattern pattern = Pattern.compile(
            "(\\w+ \\w+), age (\\d+), email: (\\S+@\\S+)");
        
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Name: " + matcher.group(1));
            System.out.println("Age: " + matcher.group(2));
            System.out.println("Email: " + matcher.group(3));
            
            System.out.println("\nGroup count: " + matcher.groupCount());
        }
    }
}

This example extracts name, age, and email from an input string using capturing
groups. The pattern defines three groups enclosed in parentheses. After a
successful match, each group's content can be retrieved by its index.

groupCount returns the number of capturing groups in the pattern
(excluding group 0). Groups are numbered from left to right based on their
opening parentheses.

## Named Capturing Groups

Java 7 introduced named capturing groups using the (?&lt;name&gt;...)
syntax. Named groups make patterns more readable and matches easier to process.
Group names can be used instead of numerical indices.

MatcherNamedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherNamedGroups {

    public static void main(String[] args) {
        
        String input = "Date: 2023-05-15, Time: 14:30";
        Pattern pattern = Pattern.compile(
            "Date: (?&lt;date&gt;\\d{4}-\\d{2}-\\d{2}), Time: (?&lt;time&gt;\\d{2}:\\d{2})");
        
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Date: " + matcher.group("date"));
            System.out.println("Time: " + matcher.group("time"));
            
            // Still accessible by index
            System.out.println("\nGroup 1: " + matcher.group(1));
            System.out.println("Group 2: " + matcher.group(2));
        }
    }
}

This example demonstrates named group capturing. The pattern defines two named
groups: "date" and "time". These names make the code more readable and
maintainable compared to numerical group references.

Named groups are still accessible by their numerical indices, maintaining
backward compatibility. The group naming syntax helps document the pattern's
structure within the regex itself.

## Text Replacement

Matcher provides powerful text replacement capabilities through
replaceAll and replaceFirst methods. These methods
allow transforming matched text using literal strings or group references.

MatcherReplace.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherReplace {

    public static void main(String[] args) {
        
        String input = "User: john_doe, Email: john@example.com";
        Pattern pattern = Pattern.compile("(\\w+)@(\\w+\\.\\w+)");
        
        Matcher matcher = pattern.matcher(input);
        
        // Replace first match
        String firstReplaced = matcher.replaceFirst("EMAIL_REDACTED");
        System.out.println("First replaced: " + firstReplaced);
        
        // Replace all matches
        String allReplaced = matcher.replaceAll("$1@DOMAIN.REDACTED");
        System.out.println("All replaced: " + allReplaced);
        
        // Append replacement using appendReplacement/appendTail
        matcher.reset();
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, matcher.group(1) + "@NEW.DOMAIN");
        }
        matcher.appendTail(sb);
        System.out.println("Custom replacement: " + sb.toString());
    }
}

This example shows three replacement techniques. replaceFirst
replaces only the first match, while replaceAll replaces all
matches. The dollar-sign notation ($1) references captured groups.

For more complex replacements, appendReplacement and
appendTail provide fine-grained control. These methods allow
processing matches individually while building the result incrementally.

## Region Operations

Matcher supports region limiting to restrict matching to a portion of the input.
The region method defines the bounds for matching operations,
while useAnchoringBounds and useTransparentBounds
control boundary behavior.

MatcherRegion.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherRegion {

    public static void main(String[] args) {
        
        String input = "Start: 123 Middle: 456 End: 789";
        Pattern pattern = Pattern.compile("\\d+");
        
        Matcher matcher = pattern.matcher(input);
        
        // Set region from index 10 to 25
        matcher.region(10, 25);
        
        System.out.println("Region matches:");
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group() + 
                " at " + matcher.start());
        }
        
        // Check anchoring bounds behavior
        matcher.region(15, 25);
        matcher.useAnchoringBounds(false);
        System.out.println("\nWithout anchoring bounds:");
        System.out.println("^ matches: " + matcher.hitEnd());
    }
}

This example demonstrates region operations. The first part limits matching to
characters 10-25 of the input, effectively skipping "Start: 123" and "End: 789".
Only numbers within the specified region are found.

The second part shows how anchoring bounds affect pattern matching. When disabled,
the ^ and $ anchors won't match at region boundaries. hitEnd
indicates if matching hit the end of the input region.

## Pattern Matching with Flags

Matcher inherits pattern flags from its Pattern object but can override some
behavior. The useCaseInsensitive method enables case-insensitive
matching without recreating the matcher.

MatcherFlags.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherFlags {

    public static void main(String[] args) {
        
        String input = "The Quick BROWN fox JUMPS over the lazy DOG";
        Pattern pattern = Pattern.compile("\\b[a-z]+\\b");
        
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("Default matching (case sensitive):");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
        
        // Enable case-insensitive matching
        matcher.reset();
        matcher.useCaseInsensitive(true);
        
        System.out.println("\nCase-insensitive matching:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
    }
}

This example shows how to modify matching behavior after matcher creation. The
first pass uses case-sensitive matching, finding only lowercase words. After
enabling case-insensitive mode, all words are matched regardless of case.

reset clears the matcher's state before reusing it with new
flags. This approach is more efficient than creating a new matcher when only
flags need to change.

## Source

[Java Matcher Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html)

This tutorial has covered the essential methods and features of the Java Matcher
class. Mastering these concepts is crucial for effective text processing with
regular expressions in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).