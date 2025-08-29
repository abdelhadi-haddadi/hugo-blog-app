+++
title = "Java MatchResult.group Method"
date = 2025-08-29T20:00:19.889+01:00
draft = false
description = "Complete Java MatchResult.group method tutorial with examples. Learn about capturing groups in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MatchResult.group Method

Last modified: April 20, 2025

 

The MatchResult.group method is part of Java's regex API. It
returns the input subsequence captured by a capturing group during a match.
MatchResult is an interface implemented by Matcher.

Capturing groups are numbered from left to right, starting at 1. Group 0 always
refers to the entire match. The group method has several overloads to access
groups by number or name.

## MatchResult.group Overview

The MatchResult interface provides methods to query the results of
a match operation. The group method is the primary way to access
captured groups. It comes in three variants.

group returns the entire match (same as group 0).
group(int group) returns the specified group by number.
group(String name) returns the named group (Java 7+).

## Basic group() Usage

The simplest form of group returns the entire match. This is
equivalent to calling group(0). It's useful when you don't need
to access specific capturing groups.

BasicGroupExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BasicGroupExample {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        String regex = "quick.*fox";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group());
            System.out.println("Same as group 0: " + matcher.group(0));
        }
    }
}

In this example, we search for the pattern "quick.*fox" in the input string.
When we find a match, we print the entire matched subsequence using both
group and group(0).

Both calls return the same result: "quick brown fox". This demonstrates that
group is a convenient shorthand for accessing the full match.

## Accessing Numbered Groups

Numbered capturing groups allow you to extract specific parts of a match.
Groups are numbered from left to right based on their opening parentheses.
Group 0 is always the entire match.

NumberedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberedGroupsExample {

    public static void main(String[] args) {
        String input = "John Doe, age 30, email: john.doe@example.com";
        String regex = "(\\w+ \\w+), age (\\d+), email: (\\S+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Name: " + matcher.group(1));
            System.out.println("Age: " + matcher.group(2));
            System.out.println("Email: " + matcher.group(3));
        }
    }
}

This example demonstrates how to access numbered capturing groups. The regex
pattern contains three capturing groups enclosed in parentheses.

Group 1 captures the name, group 2 captures the age, and group 3 captures the
email. We access each group using group(int) with the appropriate
group number.

## Named Capturing Groups

Java 7 introduced named capturing groups, which make regex patterns more
readable. Groups can be named using the (?&lt;name&gt;...) syntax.
Named groups can be accessed by their name.

NamedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroupsExample {

    public static void main(String[] args) {
        String input = "Date: 2023-04-20, Time: 14:30";
        String regex = "Date: (?&lt;date&gt;\\d{4}-\\d{2}-\\d{2}), Time: (?&lt;time&gt;\\d{2}:\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group());
            System.out.println("Date: " + matcher.group("date"));
            System.out.println("Time: " + matcher.group("time"));
            
            // Named groups also have numbers
            System.out.println("Date (group 1): " + matcher.group(1));
            System.out.println("Time (group 2): " + matcher.group(2));
        }
    }
}

This example shows how to define and access named capturing groups. The regex
contains two named groups: "date" and "time".

We access these groups using group(String name). Note that named
groups also have corresponding numbers, so they can be accessed by number as
well. This provides flexibility in how you reference your captured groups.

## Multiple Matches with Groups

When processing multiple matches in a string, each match maintains its own
group information. The find method advances to the next match,
updating the group information accordingly.

MultipleMatchesExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MultipleMatchesExample {

    public static void main(String[] args) {
        String input = "Product: Laptop, Price: $999.99; Product: Mouse, Price: $49.99";
        String regex = "Product: (?&lt;product&gt;\\w+), Price: \\$(?&lt;price&gt;\\d+\\.\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Product: " + matcher.group("product"));
            System.out.println("Price: " + matcher.group("price"));
            System.out.println("---");
        }
    }
}

This example processes multiple product entries in a string. For each match found
by find, we can access the current match's groups.

The while loop continues until all matches are processed. Each iteration
provides access to the groups for that specific match. This is useful for
extracting structured data from text.

## Handling Optional Groups

Some capturing groups in a regex pattern might be optional. When an optional
group doesn't participate in a match, group returns null for
that group. Always check for null when working with optional groups.

OptionalGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class OptionalGroupsExample {

    public static void main(String[] args) {
        String[] inputs = {
            "Error: 404 - Not Found",
            "Error: 500",
            "Error: 403 - Forbidden"
        };
        
        String regex = "Error: (\\d+)(?: - (.*))?";
        Pattern pattern = Pattern.compile(regex);
        
        for (String input : inputs) {
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                System.out.println("Error code: " + matcher.group(1));
                
                String description = matcher.group(2);
                if (description != null) {
                    System.out.println("Description: " + description);
                } else {
                    System.out.println("No description provided");
                }
                System.out.println("---");
            }
        }
    }
}

This example demonstrates handling optional groups. The regex pattern makes the
error description optional with the ? quantifier.

For inputs without a description, group(2) returns null. We check
for null before using the group value. This prevents NullPointerException when
working with optional parts of patterns.

## Group Count and Validation

Before accessing groups, it's good practice to validate their existence. The
groupCount method returns the number of capturing groups in the
pattern. Remember that group 0 is not included in this count.

GroupCountExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GroupCountExample {

    public static void main(String[] args) {
        String input = "RGB: (255, 128, 64)";
        String regex = "RGB: \\((\\d+), (\\d+), (\\d+)\\)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("Total groups (excluding group 0): " + 
            matcher.groupCount());
            
        if (matcher.find()) {
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

This example shows how to use groupCount to determine how many
capturing groups are available. The pattern has three explicit groups for the
RGB components.

We loop through all groups (including group 0) to display their values. Knowing
the group count helps when writing code that needs to handle variable numbers
of groups.

## Advanced Group Extraction

For complex patterns with nested groups, understanding group numbering is
essential. Groups are numbered based on the order of their opening parentheses,
including nested groups.

NestedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NestedGroupsExample {

    public static void main(String[] args) {
        String input = "Coordinates: (40.7128° N, 74.0060° W)";
        String regex = "(\\(([\\d.]+)° ([NS]), ([\\d.]+)° ([EW])\\))";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("All parentheses: " + matcher.group(1));
            System.out.println("Latitude value: " + matcher.group(2));
            System.out.println("Latitude direction: " + matcher.group(3));
            System.out.println("Longitude value: " + matcher.group(4));
            System.out.println("Longitude direction: " + matcher.group(5));
        }
    }
}

This example demonstrates group numbering with nested capturing groups. The regex
contains multiple levels of nesting for parsing geographic coordinates.

Group 1 captures everything in the outer parentheses. Groups 2-5 capture the
individual components. Understanding this numbering is crucial when working
with complex patterns.

## Source

[Java MatchResult Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/MatchResult.html)

In this article, we've covered the essential aspects of the MatchResult.group
method. Understanding capturing groups is crucial for effective text processing
with regular expressions in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).