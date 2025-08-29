+++
title = "Java Matcher.lookingAt Method"
date = 2025-08-29T20:00:14.217+01:00
draft = false
description = "Complete Java Matcher.lookingAt method tutorial with examples. Learn about partial matching in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.lookingAt Method

Last modified: April 20, 2025

 

The Matcher.lookingAt method is a partial matching operation in Java's
regex API. It attempts to match the input sequence starting at the beginning
against the pattern. Unlike matches, it doesn't require the entire
input to match.

The method returns true if the beginning of the input sequence
matches the pattern. It's useful when you need to check if input starts with a
specific pattern. The method doesn't require the entire string to match.

## Matcher.lookingAt Overview

lookingAt is similar to matches but less strict. While
matches requires the entire input to match the pattern,
lookingAt only checks the beginning. It's more flexible than
matches but more strict than find.

The method doesn't change the matcher's state. Subsequent calls to
lookingAt will always start from the beginning of the input. It's
useful for validating input prefixes or headers in strings.

## Basic lookingAt Example

This example demonstrates the basic usage of lookingAt. We check if
a string starts with a specific pattern. The pattern matches if the beginning of
the input conforms to it.

LookingAtBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtBasic {

    public static void main(String[] args) {
        
        String input = "Hello World!";
        Pattern pattern = Pattern.compile("Hello");
        Matcher matcher = pattern.matcher(input);
        
        boolean result = matcher.lookingAt();
        System.out.println("Does input start with 'Hello'? " + result);
        
        // Compare with matches()
        boolean fullMatch = matcher.matches();
        System.out.println("Does entire input match 'Hello'? " + fullMatch);
    }
}

In this example, lookingAt returns true because the
input starts with "Hello". However, matches returns
false because it requires the entire string to match the pattern.

## lookingAt with Complex Patterns

lookingAt works with complex regex patterns just like other matching
methods. This example shows how to check if a string starts with a valid date
format. The pattern includes digits and specific separators.

LookingAtComplex.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtComplex {

    public static void main(String[] args) {
        
        String[] inputs = {
            "2023-05-15: Meeting at 10am",
            "15/05/2023: Team lunch",
            "Invalid date: May 15, 2023"
        };
        
        Pattern datePattern = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
        
        for (String input : inputs) {
            Matcher matcher = datePattern.matcher(input);
            boolean hasDate = matcher.lookingAt();
            System.out.printf("'%s' starts with date? %b%n", 
                input, hasDate);
        }
    }
}

This code checks if each string starts with a date in YYYY-MM-DD format. Only the
first string matches the pattern. The method ignores content after the date if the
beginning matches. This is useful for parsing structured text with headers.

## lookingAt vs find vs matches

This example compares lookingAt with find and
matches. Each method has different matching behavior. Understanding
these differences is crucial for effective regex use.

LookingAtComparison.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtComparison {

    public static void main(String[] args) {
        
        String input = "123 Main Street";
        Pattern pattern = Pattern.compile("\\d+");
        
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("lookingAt(): " + matcher.lookingAt());
        System.out.println("find(): " + matcher.find());
        System.out.println("matches(): " + matcher.matches());
        
        // Reset matcher for fresh matching
        matcher.reset();
        
        System.out.println("\nAfter reset:");
        System.out.println("find() from start: " + matcher.find());
        System.out.println("Region matches: " + 
            matcher.region(0, 3).matches());
    }
}

lookingAt returns true because the string starts with digits.
find also returns true as it finds digits anywhere.
matches fails as it requires the entire string to be digits. The
region example shows how to limit matching to a substring.

## lookingAt with Groups

lookingAt supports capturing groups just like other matching methods.
After a successful match, groups can be extracted. This example shows how to
parse the beginning of a string into components.

LookingAtGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtGroups {

    public static void main(String[] args) {
        
        String input = "ERROR 2023-05-15: Disk full";
        Pattern pattern = Pattern.compile(
            "(\\w+)\\s(\\d{4}-\\d{2}-\\d{2}):\\s(.*)");
        
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.lookingAt()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Log level: " + matcher.group(1));
            System.out.println("Date: " + matcher.group(2));
            System.out.println("Message: " + matcher.group(3));
        } else {
            System.out.println("No match found");
        }
    }
}

This code parses a log entry format. The pattern captures three groups: log
level, date, and message. lookingAt ensures the entire pattern
matches from the start. The groups allow access to specific parts of the match.

## lookingAt with Multiple Patterns

This example shows how to use lookingAt with multiple patterns. We
check which pattern matches the beginning of the input. This technique is useful
for content type detection.

LookingAtMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtMultiple {

    public static void main(String[] args) {
        
        String input = "&lt;?xml version='1.0'?&gt;&lt;root&gt;&lt;/root&gt;";
        Pattern[] patterns = {
            Pattern.compile("&lt;\\?xml.*\\?&gt;"),  // XML declaration
            Pattern.compile("&lt;html&gt;"),        // HTML tag
            Pattern.compile("\\s*")           // Whitespace
        };
        
        for (Pattern pattern : patterns) {
            Matcher matcher = pattern.matcher(input);
            if (matcher.lookingAt()) {
                System.out.println("Matches: " + pattern.pattern());
                break;
            }
        }
    }
}

The code checks which pattern matches the beginning of the XML string. The XML
declaration pattern matches first. The method stops at the first successful
match. This approach is efficient for format detection.

## lookingAt with Region

The region method limits where lookingAt searches. This
example shows how to check patterns in specific parts of the input. Regions are
useful for parsing structured data.

LookingAtRegion.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtRegion {

    public static void main(String[] args) {
        
        String input = "Header: Value\nBody: Content";
        Pattern headerPattern = Pattern.compile("Header:");
        Pattern bodyPattern = Pattern.compile("Body:");
        
        Matcher matcher = headerPattern.matcher(input);
        
        // Check header at start
        System.out.println("Header at start: " + matcher.lookingAt());
        
        // Set region to after first line
        matcher.region(input.indexOf('\n') + 1, input.length());
        
        // Check body in region
        matcher.usePattern(bodyPattern);
        System.out.println("Body in region: " + matcher.lookingAt());
    }
}

This code first checks for a header at the string's beginning. Then it sets a
region to after the first newline and checks for a body pattern. The region
restriction makes lookingAt only consider the specified substring.

## lookingAt Performance Considerations

This example demonstrates performance aspects of lookingAt. The
method can be more efficient than find when you only need to check
the beginning. It avoids scanning the entire input.

LookingAtPerformance.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LookingAtPerformance {

    public static void main(String[] args) {
        
        String longInput = "START " + "x".repeat(1000000);
        Pattern pattern = Pattern.compile("START");
        
        long startTime = System.nanoTime();
        Matcher matcher = pattern.matcher(longInput);
        boolean result = matcher.lookingAt();
        long endTime = System.nanoTime();
        
        System.out.println("lookingAt took: " + 
            (endTime - startTime) + " ns");
        
        startTime = System.nanoTime();
        result = pattern.matcher(longInput).find();
        endTime = System.nanoTime();
        
        System.out.println("find took: " + 
            (endTime - startTime) + " ns");
    }
}

lookingAt typically performs better than find for
prefix checks. It stops after examining the beginning of the input. The
difference becomes significant with large inputs. Always choose the most specific
matching method for your needs.

## Source

[Java Matcher.lookingAt Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#lookingAt--)

In this article, we've explored the Matcher.lookingAt method in
depth. This partial matching technique is valuable for many text processing
tasks. Understanding its behavior helps write efficient and precise regex code.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).