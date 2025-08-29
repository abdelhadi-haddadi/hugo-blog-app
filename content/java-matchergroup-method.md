+++
title = "Java Matcher.group Method"
date = 2025-08-29T20:00:11.951+01:00
draft = false
description = "Complete Java Matcher.group method tutorial with examples. Learn about capturing groups in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.group Method

Last modified: April 20, 2025

 

The Matcher.group method is part of Java's regex API in the
java.util.regex package. It retrieves the input subsequence
captured by a capturing group during a match operation. Groups are numbered
from left to right, starting at 1.

Group 0 always refers to the entire pattern match. The group
method has several overloads that allow accessing groups by number or name.
This method is essential for extracting specific parts of matched text.

## Matcher.group Method Overview

The Matcher.group method has three main variants. The no-arg
version returns the entire match (group 0). The int version returns the
specified numbered group. The String version returns a named group.

Before calling group, a match must be found using methods like
find or matches. Calling group without
a successful match throws IllegalStateException.

## Basic Group Retrieval

This example demonstrates the simplest use of Matcher.group to
extract matched text. We'll match a date pattern and extract its components.

MatcherGroupBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupBasic {

    public static void main(String[] args) {
        
        String input = "Today is 2025-04-20";
        String regex = "(\\d{4})-(\\d{2})-(\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Year: " + matcher.group(1));
            System.out.println("Month: " + matcher.group(2));
            System.out.println("Day: " + matcher.group(3));
        }
    }
}

In this example, we match a date in YYYY-MM-DD format. The regex has three
capturing groups for year, month, and day. group(0) returns the
entire match, while group(1), group(2), and
group(3) return the captured components.

## Named Group Retrieval

Java 7 introduced named capturing groups, making regex patterns more readable.
This example shows how to use group with named groups.

MatcherGroupNamed.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupNamed {

    public static void main(String[] args) {
        
        String input = "Product: Laptop, Price: $999.99";
        String regex = "Product: (?&lt;product&gt;\\w+), Price: \\$(?&lt;price&gt;\\d+\\.\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Product: " + matcher.group("product"));
            System.out.println("Price: " + matcher.group("price"));
            System.out.println("Full match: " + matcher.group(0));
        }
    }
}

This example extracts product and price information using named groups. The
(?&lt;name&gt;...) syntax defines named groups. We access these
groups using group("product") and group("price").

## Multiple Group Retrieval

This example demonstrates handling multiple matches and their groups. We'll
extract all phone numbers from text and their components.

MatcherGroupMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupMultiple {

    public static void main(String[] args) {
        
        String input = "Contacts: 123-456-7890, 555-123-4567, 888-999-0000";
        String regex = "(\\d{3})-(\\d{3})-(\\d{4})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Full number: " + matcher.group(0));
            System.out.println("Area code: " + matcher.group(1));
            System.out.println("Exchange: " + matcher.group(2));
            System.out.println("Line number: " + matcher.group(3));
            System.out.println("-----");
        }
    }
}

Here we process multiple phone number matches in a loop. For each match found
by find, we extract the full number and its components using
group. This pattern is useful for processing all occurrences in
input text.

## Optional Group Handling

Some groups in a regex might be optional. This example shows how to safely
handle such cases when using group.

MatcherGroupOptional.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupOptional {

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
            if (matcher.matches()) {
                System.out.println("Code: " + matcher.group(1));
                
                // Check if description group was matched
                if (matcher.group(2) != null) {
                    System.out.println("Description: " + matcher.group(2));
                } else {
                    System.out.println("No description provided");
                }
                System.out.println("-----");
            }
        }
    }
}

This example handles error messages where the description part is optional. We
use matches for full-string matching and check if group 2 exists
before accessing it. The (?:...) creates a non-capturing group.

## Group Count and Validation

Before accessing groups, it's good practice to validate their existence. This
example shows how to use groupCount and check for valid groups.

MatcherGroupValidation.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupValidation {

    public static void main(String[] args) {
        
        String input = "Coordinates: (12.34, 56.78)";
        String regex = "\\((\\d+\\.\\d+), (\\d+\\.\\d+)\\)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            
            try {
                // Attempt to access a non-existent group
                System.out.println("Group 3: " + matcher.group(3));
            } catch (IndexOutOfBoundsException e) {
                System.out.println("Error: " + e.getMessage());
            }
            
            // Safe group access
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

This example demonstrates proper group validation. groupCount
returns the number of capturing groups (excluding group 0). We show both
incorrect and safe ways to access groups, including error handling.

## Advanced Group Replacement

Groups are often used in text replacement operations. This example shows how to
reference groups in replacement strings.

MatcherGroupReplacement.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupReplacement {

    public static void main(String[] args) {
        
        String input = "Name: John Doe, Age: 30, Occupation: Developer";
        String regex = "Name: (\\w+ \\w+), Age: (\\d+), Occupation: (\\w+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.matches()) {
            // Reconstruct string using groups
            String reconstructed = String.format(
                "Occupation: %3$s, Name: %1$s, Age: %2$s",
                matcher.group(1), matcher.group(2), matcher.group(3));
            
            System.out.println("Original: " + input);
            System.out.println("Reconstructed: " + reconstructed);
            
            // Using replaceAll with group references
            String swapped = matcher.replaceAll(
                "Age: $2, Name: $1, Job: $3");
            System.out.println("Swapped: " + swapped);
        }
    }
}

This example shows two ways to use groups in replacements. First, we manually
reconstruct a string using String.format. Then we use
replaceAll with $n group references. Both methods
rearrange the information using captured groups.

## Nested Group Access

Regex patterns can have nested groups. This example demonstrates how to access
groups within groups in a complex pattern.

MatcherGroupNested.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherGroupNested {

    public static void main(String[] args) {
        
        String input = "Version: 2.1.8 (Stable)";
        String regex = "Version: ((\\d+)\\.(\\d+)\\.(\\d+)) \\(([A-Za-z]+)\\)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.matches()) {
            System.out.println("Full version: " + matcher.group(1));
            System.out.println("Major: " + matcher.group(2));
            System.out.println("Minor: " + matcher.group(3));
            System.out.println("Patch: " + matcher.group(4));
            System.out.println("Stability: " + matcher.group(5));
            
            System.out.println("\nGroup numbers:");
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println(i + ": " + matcher.group(i));
            }
        }
    }
}

This example parses a software version string with nested groups. The outer group
captures the full version number, while inner groups capture components. Group
numbers are assigned by the position of their opening parenthesis.

## Source

[Java Matcher.group Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#group--)

This tutorial covered the essential aspects of Java's Matcher.group
method. From basic usage to advanced techniques, understanding groups is crucial
for effective text processing with regular expressions in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).