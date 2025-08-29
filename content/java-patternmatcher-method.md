+++
title = "Java Pattern.matcher Method"
date = 2025-08-29T20:00:23.273+01:00
draft = false
description = "Complete Java Pattern.matcher method tutorial with examples. Learn how to use matcher for regex operations in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.matcher Method

Last modified: April 20, 2025

 

The matcher method of the java.util.regex.Pattern
class creates a Matcher object that will match the given input against the
pattern. This is the primary method for performing regex matching operations in
Java.

The Matcher object provides various methods to perform different types of
pattern matching operations, including finding matches, extracting groups, and
replacing matched text. The matcher is stateful and not thread-safe.

## Basic Definitions

**Pattern**: A compiled representation of a regular expression.
Pattern objects are immutable and thread-safe. They are created using the
Pattern.compile method.

**Matcher**: An engine that performs match operations on a character
sequence by interpreting a Pattern. Matcher objects are created by calling the
matcher method on a Pattern object.

**Regular Expression**: A sequence of characters that defines a
search pattern, used for pattern matching with strings or input validation.

## Basic Pattern.matcher Usage

The simplest way to use the matcher method is to create a Matcher
object and then use its methods to perform matching operations. The example
below shows basic matching functionality.

BasicMatcherExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class BasicMatcherExample {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        String regex = "fox";
        
        // Create a Pattern object
        Pattern pattern = Pattern.compile(regex);
        
        // Create a Matcher object
        Matcher matcher = pattern.matcher(input);
        
        // Check if the pattern is found
        if (matcher.find()) {
            System.out.println("Found '" + matcher.group() + 
                "' at position " + matcher.start());
        } else {
            System.out.println("Pattern not found");
        }
    }
}

In this example, we first compile a regex pattern that looks for the word "fox".
We then create a Matcher object by calling matcher on the Pattern.

The find method scans the input sequence looking for the next
subsequence that matches the pattern. If found, we print the matched text and
its starting position using group and start.

## Finding Multiple Matches

The Matcher object can find all occurrences of a pattern in the input string by
repeatedly calling the find method. Each call continues searching
from where the previous match left off.

MultipleMatchesExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MultipleMatchesExample {

    public static void main(String[] args) {
        String input = "cat dog cat dog cat";
        String regex = "cat";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        int count = 0;
        while (matcher.find()) {
            count++;
            System.out.println("Match " + count + " at position " + 
                matcher.start() + "-" + (matcher.end()-1));
        }
        
        System.out.println("Total matches: " + count);
    }
}

This example demonstrates how to find all occurrences of the word "cat" in the
input string. The while loop continues as long as find returns
true, indicating another match was found.

For each match, we print its position using start and
end. Note that end returns the position after the
last character of the match, so we subtract 1 for the inclusive end position.

## Using Groups with Matcher

Regular expressions can define groups using parentheses, and the Matcher can
extract these groups after a successful match. Groups are numbered starting from
1 (group 0 is the entire match).

GroupExtractionExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class GroupExtractionExample {
    public static void main(String[] args) {
        String input = "John Doe, age 30; Jane Smith, age 25";
        String regex = "(\\w+ \\w+), age (\\d+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Name: " + matcher.group(1));
            System.out.println("Age: " + matcher.group(2));
            System.out.println();
        }
    }
}

This example uses a regex with two capturing groups: one for the name and one
for the age. The pattern matches strings in the format "Name, age XX".

After each successful find, we can access the groups using the
group method with the group number. Group 0 is always the entire
match, while groups 1 and up correspond to the parenthesized groups in the
pattern.

## Named Capturing Groups

Java 7 introduced named capturing groups, which make regex patterns more readable
and maintainable. Groups can be given names using the
(?&lt;name&gt;...) syntax.

NamedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class NamedGroupsExample {
    public static void main(String[] args) {
        String input = "user=admin, pass=secret";
        String regex = "user=(?&lt;username&gt;\\w+), pass=(?&lt;password&gt;\\w+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Username: " + 
                matcher.group("username"));
            System.out.println("Password: " + 
                matcher.group("password"));
        }
    }
}

This example demonstrates named groups in a pattern that matches a simple
username/password string. The groups are named "username" and "password" for
clearer code.

After a successful match, we can access the groups by their names using the
group(String name) method. This makes the code more readable than
using numeric group indices.

## Region Matching

The Matcher class allows you to restrict matching to a specific region of the
input string using the region method. This is useful when you
only need to match part of a large input string.

RegionMatchingExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegionMatchingExample {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        String regex = "fox";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Set the region to only search the first half of the string
        matcher.region(0, input.length() / 2);
        
        if (matcher.find()) {
            System.out.println("Found in region: " + matcher.group());
        } else {
            System.out.println("Not found in specified region");
        }
        
        // Reset to search the entire string
        matcher.reset();
        if (matcher.find()) {
            System.out.println("Found in full string: " + matcher.group());
        }
    }
}

This example shows how to limit the search to a specific region of the input
string. We first set the region to only search the first half of the string,
then later reset to search the entire string.

The region(int start, int end) method defines the region to be
searched, where start is inclusive and end is exclusive. The reset
method clears any region settings and matching state.

## Replacement Operations

The Matcher class provides several methods for replacing matched text:
replaceAll, replaceFirst, and
appendReplacement/appendTail for more complex
replacements.

ReplacementExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class ReplacementExample {

    public static void main(String[] args) {
        String input = "The price is $10.50 and $20.30";
        String regex = "\\$\\d+\\.\\d{2}";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Simple replacement
        String result = matcher.replaceAll("PRICE");
        System.out.println("replaceAll: " + result);
        
        // First match replacement
        result = matcher.reset().replaceFirst("PRICE");
        System.out.println("replaceFirst: " + result);
        
        // Complex replacement with append methods
        matcher.reset();
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, 
                "€" + matcher.group().substring(1));
        }
        matcher.appendTail(sb);
        System.out.println("Currency converted: " + sb);
    }
}

This example demonstrates three approaches to string replacement using a Matcher.
The first uses replaceAll to replace all matches, the second uses
replaceFirst for just the first match.

The third approach shows how to use appendReplacement and
appendTail for more complex replacements where we convert dollar
amounts to euros. This method allows processing each match individually.

## Pattern.matcher with Flags

Pattern flags can be passed to the compile method to modify how
the pattern matching behaves. These flags affect how the matcher interprets the
pattern.

MatcherFlagsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class MatcherFlagsExample {

    public static void main(String[] args) {
        String input = "Line 1\nLine 2\nLine 3";
        String regex = "^Line.*$";
        
        // Without MULTILINE flag
        Pattern pattern1 = Pattern.compile(regex);
        Matcher matcher1 = pattern1.matcher(input);
        System.out.println("Without MULTILINE flag:");
        while (matcher1.find()) {
            System.out.println("Found: " + matcher1.group());
        }
        
        // With MULTILINE flag
        Pattern pattern2 = Pattern.compile(regex, Pattern.MULTILINE);
        Matcher matcher2 = pattern2.matcher(input);
        System.out.println("\nWith MULTILINE flag:");
        while (matcher2.find()) {
            System.out.println("Found: " + matcher2.group());
        }
        
        // Case insensitive matching
        Pattern pattern3 = Pattern.compile("line", Pattern.CASE_INSENSITIVE);
        Matcher matcher3 = pattern3.matcher(input);
        System.out.println("\nCase insensitive matches:");
        while (matcher3.find()) {
            System.out.println("Found: " + matcher3.group());
        }
    }
}

This example demonstrates the effect of different pattern flags on matching
behavior. The MULTILINE flag changes how the ^ and $ anchors work,
making them match at the start and end of each line rather than the entire
input.

The CASE_INSENSITIVE flag makes matching ignore case differences.
Other available flags include DOTALL, UNICODE_CASE,
and CANON_EQ, each modifying the matching behavior in specific
ways.

## Source

[Java Pattern.matcher Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#matcher-java.lang.CharSequence-)

In this tutorial, we've explored the various capabilities of the
Pattern.matcher method and the Matcher class it returns.
Understanding these concepts is essential for effective text processing in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).