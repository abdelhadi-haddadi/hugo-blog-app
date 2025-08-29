+++
title = "Java Pattern.compile Method"
date = 2025-08-29T20:00:22.127+01:00
draft = false
description = "Complete Java Pattern.compile method tutorial with examples. Learn how to use regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.compile Method

Last modified: April 20, 2025

 

The Pattern.compile method is the primary way to create Pattern
objects in Java. It compiles the given regular expression into a pattern that
can be used for matching operations. The compiled pattern is immutable and
thread-safe.

Pattern.compile has two main variants: one that takes just the regex string, and
another that accepts regex flags. These flags modify how the pattern matching
behaves. The method throws PatternSyntaxException for invalid
regex.

## Basic Pattern Compilation

The simplest form of Pattern.compile takes a single regex string parameter.
This creates a Pattern object with default matching behavior. The compiled
pattern can then be used to create Matcher objects or perform direct matches.

BasicCompile.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class BasicCompile {

    public static void main(String[] args) {
        
        // Simple regex to match words starting with 'J'
        String regex = "\\bJ\\w+\\b";
        String input = "Java JavaScript Python Ruby";
        
        // Compile the pattern
        Pattern pattern = Pattern.compile(regex);
        
        // Use the pattern to find matches
        boolean hasMatch = pattern.matcher(input).find();
        System.out.println("Found match: " + hasMatch);
        
        // Count matches
        long matchCount = pattern.matcher(input).results().count();
        System.out.println("Match count: " + matchCount);
    }
}

This example shows basic pattern compilation and usage. The regex matches words
starting with 'J'. We compile it once and reuse it for both finding and counting
matches. The Pattern object is thread-safe and can be reused efficiently.

## Compiling with Flags

Pattern.compile can accept flags that modify matching behavior. Common flags
include CASE_INSENSITIVE, MULTILINE, and
DOTALL. Flags are specified as the second parameter using bitwise
OR for multiple flags.

CompileWithFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class CompileWithFlags {

    public static void main(String[] args) {
        
        String regex = "^[a-z]+$";  // Only lowercase letters
        String input = "HELLO\nworld\nJAVA";
        
        // Case insensitive matching
        Pattern caseInsensitive = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        
        // Multiline mode (^ and $ match start/end of lines)
        Pattern multiline = Pattern.compile(regex, 
            Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
            
        System.out.println("Case insensitive matches:");
        caseInsensitive.matcher(input).results()
            .forEach(mr -&gt; System.out.println(mr.group()));
            
        System.out.println("\nMultiline matches:");    
        multiline.matcher(input).results()
            .forEach(mr -&gt; System.out.println(mr.group()));
    }
}

This example demonstrates flag usage. The first pattern matches case-insensitively
but only finds one match. The second pattern adds MULTILINE flag, making ^ and $
match at line boundaries. This finds matches on each line that meets the criteria.

## Pattern Splitting

Compiled patterns can split strings using the split method. This is more powerful
than String.split as it allows reuse of compiled patterns. The method takes an
input string and optional limit parameter.

PatternSplitExample.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternSplitExample {

    public static void main(String[] args) {
        
        // Complex delimiter: comma with optional whitespace
        String regex = "\\s*,\\s*";
        String input = "apple,  orange,banana,,grape";
        
        Pattern pattern = Pattern.compile(regex);
        
        // Split without limit
        String[] fruits = pattern.split(input);
        System.out.println("All fruits:");
        for (String fruit : fruits) {
            System.out.println("'" + fruit + "'");
        }
        
        // Split with limit (max 3 parts)
        String[] limited = pattern.split(input, 3);
        System.out.println("\nLimited split:");
        for (String fruit : limited) {
            System.out.println("'" + fruit + "'");
        }
    }
}

This example shows pattern splitting. The regex handles commas with optional
whitespace. The first split processes the entire string. The second split
limits results to 3 parts, leaving the rest unsplit. Empty elements are included.

## Pattern Matching with Groups

Compiled patterns can capture groups using parentheses. Groups allow extracting
specific parts of matches. Group 0 is the entire match, while groups 1+ are
captured subgroups.

PatternGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternGroups {

    public static void main(String[] args) {
        
        // Pattern with capturing groups
        String regex = "(\\d{2})-(\\d{2})-(\\d{4})";
        String input = "Date: 12-31-2023, Another: 01-15-2024";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Month: " + matcher.group(1));
            System.out.println("Day: " + matcher.group(2));
            System.out.println("Year: " + matcher.group(3));
            System.out.println();
        }
    }
}

This example extracts date components using groups. The pattern captures month,
day and year as separate groups. The Matcher's group method retrieves each
captured group. Groups are numbered left-to-right by their opening parenthesis.

## Named Capturing Groups

Java 7+ supports named capturing groups for more readable code. Groups are
named using (?&lt;name&gt;regex) syntax. Names can be used instead of numbers
to retrieve matched content.

NamedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroupsExample {

    public static void main(String[] args) {
        
        // Pattern with named groups
        String regex = "(?&lt;area&gt;\\d{3})-(?&lt;exchange&gt;\\d{3})-(?&lt;line&gt;\\d{4})";
        String input = "Phone: 123-456-7890, Fax: 987-654-3210";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Full number: " + matcher.group(0));
            System.out.println("Area code: " + matcher.group("area"));
            System.out.println("Exchange: " + matcher.group("exchange"));
            System.out.println("Line number: " + matcher.group("line"));
            System.out.println();
        }
    }
}

This example uses named groups to parse phone numbers. Each part of the number
has a descriptive name. The group method accepts either numbers or names.
Named groups make patterns more maintainable and code more readable.

## Pattern Quote Method

The Pattern.quote method returns a literal pattern string. This
escapes all special regex characters in the input. It's useful when matching
literal strings that may contain regex metacharacters.

PatternQuoteExample.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteExample {

    public static void main(String[] args) {
        
        String searchString = "file.(txt)";
        String input = "Looking for file.(txt) in directory";
        
        // Without quoting - fails because parentheses are special
        try {
            Pattern badPattern = Pattern.compile(searchString);
            System.out.println("Unquoted match: " + 
                badPattern.matcher(input).find());
        } catch (Exception e) {
            System.out.println("Unquoted pattern failed: " + e.getMessage());
        }
        
        // With quoting - works correctly
        String quoted = Pattern.quote(searchString);
        Pattern goodPattern = Pattern.compile(quoted);
        System.out.println("Quoted match: " + 
            goodPattern.matcher(input).find());
    }
}

This example shows the importance of quoting. The first attempt fails because
parentheses are regex metacharacters. The quoted version escapes all special
characters, allowing exact literal matching. Always use quote for user input.

## Pattern Predicates

Java 11 added asPredicate and asMatchPredicate methods
to Pattern. These convert patterns into Predicates for functional
programming. asPredicate behaves like find, while
asMatchPredicate behaves like matches.

PatternPredicateExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class PatternPredicateExample {

    public static void main(String[] args) {
        
        // Email validation pattern
        String regex = "^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$";
        Pattern emailPattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        
        Stream.of("user@example.com", "invalid.email", "admin@test.org")
            .filter(emailPattern.asPredicate())
            .forEach(System.out::println);
            
        System.out.println("\nWith asMatchPredicate:");
        Stream.of("user@example.com", "prefix user@example.com suffix")
            .filter(emailPattern.asMatchPredicate())
            .forEach(System.out::println);
    }
}

This example shows pattern predicates in action. asPredicate filters strings
containing email addresses. asMatchPredicate is stricter, requiring the entire
string to be an email. Both are useful for stream operations and filtering.

## Source

[Java Pattern Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)

This tutorial covered the essential aspects of Pattern.compile in Java. From
basic compilation to advanced features like named groups and predicates, these
examples demonstrate the method's versatility in regex processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).