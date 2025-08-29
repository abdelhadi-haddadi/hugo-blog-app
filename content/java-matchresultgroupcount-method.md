+++
title = "Java MatchResult.groupCount Method"
date = 2025-08-29T20:00:19.906+01:00
draft = false
description = "Complete Java MatchResult.groupCount tutorial with examples. Learn about capturing groups in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java MatchResult.groupCount Method

Last modified: April 20, 2025

 

The MatchResult.groupCount method returns the number of capturing
groups in a regular expression pattern. It is part of the
java.util.regex.MatchResult interface. This method is essential for
working with complex regex patterns that use groups.

Capturing groups are portions of a regex pattern enclosed in parentheses. They
allow you to extract specific parts of matched text. The
groupCount method helps determine how many such groups exist in a
pattern.

## MatchResult.groupCount Overview

The groupCount method returns an integer representing the number of
capturing groups in the pattern. This count excludes the special group 0, which
always represents the entire match. The method is available on Matcher objects
and other classes implementing MatchResult.

Understanding group count is crucial when processing matches, as it helps you
know how many groups you can access. Each group can be retrieved using the
group(int) method with an index from 1 to groupCount().

## Basic groupCount Example

This example demonstrates the basic usage of groupCount with a
simple pattern containing two capturing groups. We'll see how to access the
group count and individual groups.

BasicGroupCount.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BasicGroupCount {

    public static void main(String[] args) {
        String input = "John Doe, age 30";
        String regex = "(\\w+) (\\w+), age (\\d+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("First name: " + matcher.group(1));
            System.out.println("Last name: " + matcher.group(2));
            System.out.println("Age: " + matcher.group(3));
        }
    }
}

In this example, we create a pattern with three capturing groups. The
groupCount method returns 3, matching our three parenthesized
groups. We then access each group using its index (1-3) and the full match
using index 0.

The output shows that group 0 contains the entire match, while groups 1-3
contain the captured substrings. This demonstrates how groupCount
helps navigate captured groups.

## groupCount with Nested Groups

This example shows how groupCount works with nested capturing
groups. Nested groups can make patterns more complex, but
groupCount still accurately reports the total number.

NestedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NestedGroups {

    public static void main(String[] args) {
        String input = "2023-05-15";
        String regex = "((\\d{4})-(\\d{2})-(\\d{2}))";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Outer group: " + matcher.group(1));
            System.out.println("Year: " + matcher.group(2));
            System.out.println("Month: " + matcher.group(3));
            System.out.println("Day: " + matcher.group(4));
        }
    }
}

Here we have a date pattern with nested groups. The outer group captures the
entire date, while inner groups capture year, month, and day separately.
groupCount returns 4, counting all capturing groups.

Notice how group 1 contains the full date (same as group 0), while groups 2-4
contain the individual components. This shows how nested groups are counted
sequentially from left to right.

## groupCount with Non-Capturing Groups

This example demonstrates how non-capturing groups (using (?:...))
affect the group count. Non-capturing groups are useful for applying quantifiers
without creating a capturing group.

NonCapturingGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NonCapturingGroups {

    public static void main(String[] args) {
        String input = "color or colour";
        String regex = "col(o?:u)r";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("\nMatch: " + matcher.group(0));
            System.out.println("Total groups: " + matcher.groupCount());
            System.out.println("Group 1: " + matcher.group(1));
        }
    }
}

In this pattern, we have one capturing group and one non-capturing group. The
groupCount returns 1, as only the explicit capturing group is
counted. The non-capturing group doesn't increment the count.

The output shows that despite having two parenthesized expressions in the
pattern, only one is counted and accessible via group(1). This
demonstrates how to optimize patterns when capturing isn't needed.

## groupCount with Named Groups

Java supports named capturing groups using the (?&lt;name&gt;...)
syntax. This example shows how named groups affect the groupCount
and how they can be accessed.

NamedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroups {

    public static void main(String[] args) {
        String input = "Product: Laptop, Price: $999.99";
        String regex = "Product: (?&lt;product&gt;\\w+), Price: \\$(?&lt;price&gt;\\d+\\.\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Product (by name): " + matcher.group("product"));
            System.out.println("Product (by index): " + matcher.group(1));
            System.out.println("Price (by name): " + matcher.group("price"));
            System.out.println("Price (by index): " + matcher.group(2));
        }
    }
}

This example uses two named groups: "product" and "price". The
groupCount returns 2, as named groups are still counted normally.
They can be accessed either by name or by their numerical index.

Named groups make patterns more readable and maintainable, especially with
complex patterns. The groupCount method works the same way
regardless of whether groups are named or not.

## groupCount with Zero Groups

This example shows the behavior of groupCount when a pattern has no
capturing groups. It helps understand the baseline case of group counting.

ZeroGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ZeroGroups {

    public static void main(String[] args) {
        String input = "Simple text matching";
        String regex = "[A-Za-z ]+";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            System.out.println("Full match: " + matcher.group(0));
            
            // Attempting to access group 1 would throw IndexOutOfBoundsException
            try {
                System.out.println("Group 1: " + matcher.group(1));
            } catch (IndexOutOfBoundsException e) {
                System.out.println("Cannot access group 1: " + e.getMessage());
            }
        }
    }
}

Here we have a pattern with no capturing groups. The groupCount
method returns 0, indicating there are no groups to access beyond group 0 (the
full match). Attempting to access group 1 throws an exception.

This demonstrates that groupCount accurately reflects when a pattern
has no capturing groups. It's always safe to check this before accessing groups
by index.

## groupCount with Alternation

This example explores how alternation (using the | operator) affects group
counting. We'll see how different branches of alternation can have different
numbers of groups.

AlternationGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AlternationGroups {

    public static void main(String[] args) {
        String input1 = "Date: 2023-05-15";
        String input2 = "Timestamp: 202305151200";
        String regex = "(Date: (\\d{4}-\\d{2}-\\d{2}))|(Timestamp: (\\d{12}))";
        
        Pattern pattern = Pattern.compile(regex);
        
        // Test first pattern branch
        Matcher matcher1 = pattern.matcher(input1);
        if (matcher1.find()) {
            System.out.println("Input1 groups: " + matcher1.groupCount());
            System.out.println("Full match: " + matcher1.group(0));
            System.out.println("Date group: " + matcher1.group(1));
            System.out.println("Date value: " + matcher1.group(2));
        }
        
        // Test second pattern branch
        Matcher matcher2 = pattern.matcher(input2);
        if (matcher2.find()) {
            System.out.println("\nInput2 groups: " + matcher2.groupCount());
            System.out.println("Full match: " + matcher2.group(0));
            System.out.println("Timestamp group: " + matcher2.group(3));
            System.out.println("Timestamp value: " + matcher2.group(4));
        }
    }
}

This pattern has alternation with different numbers of groups in each branch. The
groupCount returns 4, representing the total number of capturing
groups in the entire pattern, regardless of which branch matches.

When the first branch matches, groups 1 and 2 contain values while groups 3 and
4 are null. Conversely, when the second branch matches, groups 3 and 4 contain
values. This shows how groupCount reports the maximum possible
groups.

## groupCount in Replacement Operations

This final example demonstrates using groupCount in the context of
string replacement operations. We'll see how group count affects replacement
patterns.

ReplacementGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ReplacementGroups {

    public static void main(String[] args) {
        String input = "Name: John Doe, Phone: (123) 456-7890";
        String regex = "Name: (\\w+) (\\w+), Phone: \\((\\d{3})\\) (\\d{3})-(\\d{4})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Total groups: " + matcher.groupCount());
            
            // Simple replacement using group references
            String result1 = matcher.replaceAll("Contact: $1 $2, Phone: ($3) $4-$5");
            System.out.println("\nReplacement 1: " + result1);
            
            // More complex replacement using group count
            StringBuilder sb = new StringBuilder();
            for (int i = 1; i &lt;=  matcher.groupCount(); i++) {
                sb.append("Group ").append(i).append(": [")
                  .append(matcher.group(i)).append("] ");
            }
            String result2 = matcher.replaceAll(sb.toString());
            System.out.println("Replacement 2: " + result2);
        }
    }
}

This example shows two replacement operations using group references. The
groupCount helps us know how many groups we can reference in our
replacements. The first replacement uses fixed group references, while the
second dynamically builds a replacement based on the group count.

The output demonstrates how group references ($1, $2, etc.) in replacement
strings correspond to the captured groups. Knowing the group count is essential
for creating correct replacement patterns.

## Source

[Java MatchResult Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/MatchResult.html)

In this article, we've thoroughly explored the MatchResult.groupCount
method with various examples. Understanding group counting is essential for
effective regular expression processing in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).