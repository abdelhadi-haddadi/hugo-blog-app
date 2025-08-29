+++
title = "Java Pattern Class"
date = 2025-08-29T20:00:22.136+01:00
draft = false
description = "Complete Java Pattern class tutorial covering all methods with examples. Learn about regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern Class

Last modified: April 20, 2025

 

The java.util.regex.Pattern class represents a compiled regular
expression. It is the primary class for working with regex in Java. Pattern
objects are immutable and thread-safe.

Pattern provides static methods to compile regular expressions and create
Pattern objects. Once compiled, a Pattern can be used to create Matcher objects
that perform match operations. The class is part of Java's regex package.

## Pattern Class Overview

Pattern is a final class that cannot be instantiated directly. It provides
methods to compile regex patterns and perform various matching operations. The
class works closely with the Matcher class to provide regex functionality.

The compile methods create Pattern instances. The
matcher method creates a Matcher for the pattern. Other methods
provide utility functions for pattern matching.

## Basic Pattern Matching

Pattern matching allows you to determine if a string conforms to a specific
regular expression (regex) pattern. The Pattern.matches static
method is a straightforward option for one-time checks, while the 
Pattern.compile method is ideal for reusable regex operations.

PatternBasic.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternBasic {

    public static void main(String[] args) {

        // Sample input string to be matched
        String input = "Welcome to Java!";
        
        // Regex pattern to match any string starting with "Welcome"
        String regex = "Welcome.*";
        
        // Using the static 'matches' method for a quick check
        boolean isMatch = Pattern.matches(regex, input);
        System.out.println("Static matches method: " + isMatch);
        
        // Compiling the regex pattern for reuse
        Pattern compiledPattern = Pattern.compile(regex);
        isMatch = compiledPattern.matcher(input).matches();
        System.out.println("Using compiled pattern: " + isMatch);
    }
}

In this example, we demonstrate two approaches to pattern matching in Java:

The Pattern.matches method is a simple option for infrequent
checks, as it compiles and matches the regex in one step. The
Pattern.compile method is more efficient for repeated matching, as
it allows you to reuse the compiled regex.

  

Both methods return true if the entire input string matches the
regex pattern.

## Exploring Pattern Flags in Java

Pattern flags provide flexibility in matching behaviors when using regular
expressions (regex). They can make matching case-insensitive, enable multiline
processing, and introduce other customizations. Flags are specified as the
second argument to the Pattern.compile method.

PatternFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternFlags {

    public static void main(String[] args) {

        // Sample input string
        String input = "Java is powerful\nProgramming is fun!";
        
        // Regex to match a line containing "programming" (case-insensitive)
        String regex = "^programming.*$";

        // Case insensitive matching
        Pattern caseInsensitive = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        boolean isCaseInsensitiveMatch = caseInsensitive.matcher(input).find();
        System.out.println("Case insensitive match: " + isCaseInsensitiveMatch);

        // Multiline mode (^ and $ match start and end of each line)
        Pattern multiline = Pattern.compile(regex, 
            Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
        boolean isMultilineMatch = multiline.matcher(input).find();
        System.out.println("Multiline match: " + isMultilineMatch);
    }
}

In this example, we showcase two frequently used pattern flags:

CASE_INSENSITIVE: Makes the pattern matching process ignore case
differences, allowing "Programming" and "programming" to be treated as equal.
MULTILINE: Adjusts the behavior of the ^ and 
$ anchors, so they match the start and end of each line in a 
multiline input, rather than the whole string.

These flags can be combined using the bitwise OR operator to create more
versatile matching scenarios.

## Pattern Splitting

The split method divides input text around matches of the pattern.
This is useful for parsing text with complex delimiters. The method returns an
array of strings split at pattern matches.

PatternSplit.java
  

package com.zetcode;
 
import java.util.regex.Pattern;

public class PatternSplit {

    public static void main(String[] args) {

        String input = "apple,orange,,banana,  grape";
        String regex = "\\s*,\\s*";
        
        Pattern pattern = Pattern.compile(regex);
        String[] fruits = pattern.split(input);
        
        System.out.println("Split results:");
        for (String fruit : fruits) {
            System.out.println("'" + fruit + "'");
        }
        
        // Split with limit
        String[] limited = pattern.split(input, 3);
        System.out.println("\nSplit with limit 3:");
        for (String fruit : limited) {
            System.out.println("'" + fruit + "'");
        }
    }
}

This example splits a string at commas, ignoring optional whitespace. The first
split processes the entire input. The second split uses a limit parameter to
control the maximum number of splits. Empty elements are preserved in the result.

## Pattern Matcher Operations

The matcher method creates a Matcher object for performing advanced
matching operations. Matcher provides methods like find,
group, and replaceAll for working with matches.

PatternMatcher.java
  

package com.zetcode;
 
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternMatcher {

    public static void main(String[] args) {

        String input = "Prices: $10.50, $5.25, $8.75";
        String regex = "\\$\\d+\\.\\d{2}";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        System.out.println("All prices:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }
        
        // Replacement example
        String result = matcher.replaceAll("PRICE");
        System.out.println("\nAfter replacement: " + result);
    }
}

This example finds all dollar amounts in a string using a Matcher. The
find method locates each match, and group returns the
matched text. The replaceAll method replaces all matches with a
replacement string.

## Named Capturing Groups

Pattern supports named capturing groups using the (?&lt;name&gt;...)
syntax. Named groups make regex patterns more readable and matches easier to
process. The group names can be used to retrieve matched content.

PatternNamedGroups.java
  

package com.zetcode;
 
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternNamedGroups {

    public static void main(String[] args) {

        String input = "John Doe, age 30; Jane Smith, age 25";
        String regex = "(?&lt;name&gt;[A-Za-z ]+), age (?&lt;age&gt;\\d+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            System.out.println("Name: " + matcher.group("name"));
            System.out.println("Age: " + matcher.group("age"));
            System.out.println("Full match: " + matcher.group(0) + "\n");
        }
    }
}

This example extracts names and ages using named groups. The pattern defines two
named groups: "name" and "age". The group method with a name
parameter retrieves the matched content. Group 0 always refers to the full match.

## Pattern Quote

The quote static method returns a literal pattern string for the
input. This is useful when you need to match a literal string that may contain
regex metacharacters. The method escapes all special regex characters.

PatternQuote.java
  

package com.zetcode;
 
import java.util.regex.Pattern;

public class PatternQuote {

    public static void main(String[] args) {
        String input = "File path: C:\\Program Files\\Java";
        String literal = "C:\\Program Files\\Java";
        
        // Without quoting (won't work due to special chars)
        try {
            boolean matches = Pattern.matches(".*" + literal + ".*", input);
            System.out.println("Without quote: " + matches);
        } catch (Exception e) {
            System.out.println("Error without quote: " + e.getMessage());
        }
        
        // With quoting
        String quoted = Pattern.quote(literal);
        boolean matches = Pattern.matches(".*" + quoted + ".*", input);
        System.out.println("With quote: " + matches);
    }
}

This example shows the difference between using and not using quote.
The first attempt fails because backslashes are regex metacharacters. The quoted
version works correctly by escaping all special characters in the literal string.

## Pattern Predicate

Java 11 added the asMatchPredicate and asPredicate
methods. These convert a Pattern into a Predicate for use with streams and
other functional operations. The predicates test if strings match the pattern.

PatternPredicate.java
  

package com.zetcode;
 
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class PatternPredicate {

    public static void main(String[] args) {

        Pattern emailPattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", 
            Pattern.CASE_INSENSITIVE);
            
        Stream.of("user@example.com", "invalid", "another@test.org")
            .filter(emailPattern.asPredicate())
            .forEach(System.out::println);
            
        // asMatchPredicate requires full string match
        System.out.println("\nUsing asMatchPredicate:");
        Stream.of("user@example.com", "prefix user@example.com suffix")
            .filter(emailPattern.asMatchPredicate())
            .forEach(System.out::println);
    }
}

This example demonstrates both predicate methods. asPredicate works
like find, matching anywhere in the string. asMatchPredicate
works like matches, requiring the entire string to match. Both are
useful for filtering streams.

## Source

[Java Pattern Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)

In this article, we've covered the essential methods and features of the Java
Pattern class. Understanding these concepts is crucial for working with regular
expressions in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).