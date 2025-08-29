+++
title = "Java MatchResult Interface"
date = 2025-08-29T20:00:19.883+01:00
draft = false
description = "Complete Java MatchResult interface tutorial covering all methods with examples. Learn about match results in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MatchResult Interface

Last modified: April 20, 2025

 

The java.util.regex.MatchResult interface represents the result of
a match operation. It provides methods to query the results of a regular
expression match. MatchResult is typically obtained from a Matcher instance.

The interface contains methods to get information about groups, start and end
positions of matches. It allows access to match results without modifying the
Matcher state. MatchResult is implemented by Matcher and used in stream results.

## MatchResult Interface Overview

MatchResult provides methods to examine the results of pattern matching
operations. The interface is implemented by Matcher and used when processing
match results. It offers read-only access to match information.

Key methods include group, start, and
end for accessing match details. The interface supports both
numbered and named capturing groups. MatchResult objects are immutable.

## Basic MatchResult Usage

The simplest way to use MatchResult is through the Matcher's match operations.
After a successful match, the Matcher itself implements MatchResult. This
example shows basic match information retrieval.

BasicMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BasicMatchResult {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("(\\w{5})");
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Match: " + matcher.group());
            System.out.println("Start index: " + matcher.start());
            System.out.println("End index: " + matcher.end());
            System.out.println("Group count: " + matcher.groupCount());
            System.out.println();
        }
    }
}

This example finds all 5-letter words in a string. For each match, it prints
the matched text, start and end positions, and group count. The Matcher object
acts as a MatchResult after each successful match operation.

The find method advances through the input string. After each
match, we can access match details through the MatchResult interface methods.

## Working with Groups

MatchResult provides access to capturing groups in regular expressions. Groups
are numbered starting from 1, with group 0 representing the entire match. This
example demonstrates group access.

GroupMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GroupMatchResult {

    public static void main(String[] args) {
        String input = "John Doe, age 30; Jane Smith, age 25";
        Pattern pattern = Pattern.compile("(\\w+) (\\w+), age (\\d+)");
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("First name: " + matcher.group(1));
            System.out.println("Last name: " + matcher.group(2));
            System.out.println("Age: " + matcher.group(3));
            System.out.println();
        }
    }
}

This example extracts first name, last name, and age from a formatted string.
Each capturing group is accessed by its index. Group 0 contains the entire
match, while groups 1-3 contain the captured substrings.

The group indices correspond to the order of opening parentheses in the regex.
This allows structured extraction of matched content.

## Named Group Access

Java 7 introduced named capturing groups in regular expressions. MatchResult
provides methods to access groups by name. This makes patterns more readable
and maintainable.

NamedGroupMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroupMatchResult {

    public static void main(String[] args) {
        String input = "Date: 2023-05-15, Time: 14:30";
        Pattern pattern = Pattern.compile(
            "Date: (?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})-(?&lt;day&gt;\\d{2}), " +
            "Time: (?&lt;hour&gt;\\d{2}):(?&lt;minute&gt;\\d{2})");
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Year: " + matcher.group("year"));
            System.out.println("Month: " + matcher.group("month"));
            System.out.println("Day: " + matcher.group("day"));
            System.out.println("Hour: " + matcher.group("hour"));
            System.out.println("Minute: " + matcher.group("minute"));
        }
    }
}

This example demonstrates named group access. The pattern defines groups with
descriptive names like "year" and "month". The group method
accepts these names to retrieve matched content.

Named groups improve code readability and make patterns more maintainable. They
are especially useful in complex regular expressions with many groups.

## Match Position Information

MatchResult provides methods to get the start and end positions of matches and
groups. These positions are useful for substring operations or highlighting
matches in text. This example shows position information usage.

PositionMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PositionMatchResult {

    public static void main(String[] args) {
        String input = "The rain in Spain falls mainly on the plain";
        Pattern pattern = Pattern.compile("\\b\\w{4}\\b");
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Word: " + matcher.group());
            System.out.println("Starts at: " + matcher.start());
            System.out.println("Ends at: " + matcher.end());
            System.out.println("Substring: '" + 
                input.substring(matcher.start(), matcher.end()) + "'");
            System.out.println();
        }
    }
}

This example finds all 4-letter words in a string and prints their positions.
The start and end methods return the indices of
the match in the input string. These can be used with substring operations.

Position information is zero-based, with the end index being exclusive. This
matches Java's standard substring behavior.

## Streaming Match Results

Java 9 introduced the results method in Matcher, which returns a
stream of MatchResult objects. This enables functional-style processing of all
matches in the input string.

StreamMatchResult.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class StreamMatchResult {

    public static void main(String[] args) {
        String input = "Apple: 1.25, Orange: 0.99, Banana: 0.50";
        Pattern pattern = Pattern.compile("(\\w+): (\\d+\\.\\d{2})");
        
        String formatted = pattern.matcher(input)
            .results()
            .map(mr -&gt; mr.group(1) + " costs $" + mr.group(2))
            .collect(Collectors.joining("\n"));
            
        System.out.println(formatted);
    }
}

This example processes product price information using MatchResult streams. The
results method generates a stream of all matches. Each MatchResult
is processed to create a formatted string.

Stream processing with MatchResult is concise and expressive. It avoids explicit
loops and works well with Java's functional programming features.

## Multiple Group Access

MatchResult allows access to all groups in a match at once. This is useful when
you need to process all captured groups systematically. This example shows bulk
group access.

MultipleGroupMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MultipleGroupMatchResult {

    public static void main(String[] args) {
        String input = "RGB(255,128,64) HEX(#FF8040)";
        Pattern pattern = Pattern.compile(
            "(RGB|HEX)\\(([^)]+)\\)");
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Color format: " + matcher.group(1));
            System.out.println("Values:");
            
            for (int i = 2; i &lt;=  matcher.groupCount(); i++) {
                String[] components = matcher.group(i).split(",");
                for (String component : components) {
                    System.out.println("  - " + component);
                }
            }
            System.out.println();
        }
    }
}

This example processes color values in different formats. It demonstrates how to
access multiple groups in a match. The code systematically processes all captured
groups after the main format identifier.

The group count helps determine how many groups to process. This approach works
well with patterns that have variable numbers of capturing groups.

## MatchResult in Exception Handling

When working with MatchResult, it's important to handle cases where groups might
not exist. This example demonstrates proper error handling when accessing match
results.

ExceptionHandlingMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ExceptionHandlingMatchResult {

    public static void main(String[] args) {
        String[] inputs = {
            "Name: John, Age: 30",
            "Invalid string",
            "Name: Jane, Age: 25, Email: jane@example.com"
        };
        
        Pattern pattern = Pattern.compile(
            "Name: (?&lt;name&gt;\\w+), Age: (?&lt;age&gt;\\d+)(?:, Email: (?&lt;email&gt;[^ ]+))?");
            
        for (String input : inputs) {
            Matcher matcher = pattern.matcher(input);
            
            if (matcher.find()) {
                try {
                    System.out.println("Name: " + matcher.group("name"));
                    System.out.println("Age: " + matcher.group("age"));
                    
                    String email = matcher.group("email");
                    System.out.println("Email: " + 
                        (email != null ? email : "not provided"));
                } catch (IllegalStateException e) {
                    System.out.println("No match found in: " + input);
                } catch (IllegalArgumentException e) {
                    System.out.println("Invalid group name in: " + input);
                }
            } else {
                System.out.println("No match found in: " + input);
            }
            System.out.println();
        }
    }
}

This example shows robust error handling when working with MatchResult. It checks
for matches before accessing groups and handles optional groups properly. The
code demonstrates catching both IllegalStateException and IllegalArgumentException.

Proper error handling ensures the application doesn't crash when processing
unexpected input formats. It also provides meaningful feedback about matching
failures.

## Source

[Java MatchResult Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/MatchResult.html)

In this article, we've covered the essential methods and features of the Java
MatchResult interface. Understanding these concepts is crucial for working with
regular expression match results in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).