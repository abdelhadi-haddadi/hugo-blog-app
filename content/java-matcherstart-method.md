+++
title = "Java Matcher.start Method"
date = 2025-08-29T20:00:17.541+01:00
draft = false
description = "Complete Java Matcher.start method tutorial with examples. Learn about regex matching positions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.start Method

Last modified: April 20, 2025

 

The Matcher.start method in Java returns the start index of the
previous match found by the matcher. It is part of the
java.util.regex package and works with Pattern and
Matcher classes.

This method is crucial when you need to know the exact position of a matched
pattern within the input string. It helps in text processing tasks like
parsing, searching, and text manipulation. The method has several overloaded
versions.

## Matcher.start Method Overview

The start method comes in three forms: start,
start(int group), and start(String name). The basic
version returns the start index of the entire match. The group versions
return start indices of specific capturing groups.

Before calling start, you must first call a matching operation
like find or matches. Otherwise, it throws an
IllegalStateException.

## Basic Matcher.start Usage

This example demonstrates the simplest use of start to find
the position of a matched pattern. We'll search for the word "Java" in a
string and get its starting position.

MatcherStartBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartBasic {

    public static void main(String[] args) {
        String input = "Learning Java programming is fun!";
        String regex = "Java";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            int startPosition = matcher.start();
            System.out.println("Pattern '" + regex + "' found at position: " + startPosition);
            System.out.println("Matched text: '" + input.substring(startPosition, matcher.end()) + "'");
        } else {
            System.out.println("Pattern not found");
        }
    }
}

In this example, we compile a simple pattern and create a matcher for our
input string. The find method locates the first occurrence of
"Java".

When a match is found, start returns the zero-based index
where the match begins. We also show the matched text using
substring with start and end
positions.

## Matcher.start with Groups

This example shows how to use start(int group) to get the
starting position of specific capturing groups in a regex pattern. We'll
parse a date string and extract component positions.

MatcherStartGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartGroups {

    public static void main(String[] args) {
        String input = "Date: 2025-04-20";
        String regex = "(\\d{4})-(\\d{2})-(\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Full match starts at: " + matcher.start());
            System.out.println("Year starts at: " + matcher.start(1));
            System.out.println("Month starts at: " + matcher.start(2));
            System.out.println("Day starts at: " + matcher.start(3));
            
            System.out.println("\nMatched components:");
            System.out.println("Year: " + matcher.group(1));
            System.out.println("Month: " + matcher.group(2));
            System.out.println("Day: " + matcher.group(3));
        }
    }
}

Here we define a pattern with three capturing groups for year, month, and
day. After finding a match, we use start(group) to get each
component's starting position. Group 0 refers to the entire match, while
groups 1-3 are our defined capturing groups.

This technique is useful when you need both the matched text and its exact
position within the input string.

## Matcher.start with Named Groups

Java supports named capturing groups in regex patterns. This example
demonstrates using start(String name) with named groups for more
readable code. We'll parse a log entry with named components.

MatcherStartNamedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartNamedGroups {

    public static void main(String[] args) {
        String input = "[ERROR] 2025-04-20 14:30:45 - Connection timeout";
        String regex = "\\[(?&lt;level&gt;\\w+)\\] (?&lt;date&gt;\\d{4}-\\d{2}-\\d{2}) (?&lt;time&gt;\\d{2}:\\d{2}:\\d{2}) - (?&lt;message&gt;.*)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            System.out.println("Log level starts at: " + matcher.start("level"));
            System.out.println("Date starts at: " + matcher.start("date"));
            System.out.println("Time starts at: " + matcher.start("time"));
            System.out.println("Message starts at: " + matcher.start("message"));
            
            System.out.println("\nLog components:");
            System.out.println("Level: " + matcher.group("level"));
            System.out.println("Date: " + matcher.group("date"));
            System.out.println("Time: " + matcher.group("time"));
            System.out.println("Message: " + matcher.group("message"));
        }
    }
}

This example uses named groups (?&lt;name&gt;pattern) to capture log
components. The start(String name) method retrieves the
starting position of each named group. Named groups make the code more
maintainable by using descriptive names instead of numeric indices.

The pattern matches log entries with level, date, time, and message
components. We extract both the positions and values of each component.

## Multiple Matches with start()

This example shows how to use start with multiple matches in
a string. We'll find all occurrences of a word and their positions in a
text.

MatcherStartMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartMultiple {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog. The quick fox.";
        String regex = "\\bfox\\b";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        int matchCount = 0;
        while (matcher.find()) {
            matchCount++;
            int start = matcher.start();
            System.out.println("Match " + matchCount + ":");
            System.out.println("  Starts at: " + start);
            System.out.println("  Ends at: " + matcher.end());
            System.out.println("  Text: '" + input.substring(start, matcher.end()) + "'");
            System.out.println("  Context: '" + getContext(input, start, matcher.end()) + "'");
        }
        
        System.out.println("\nTotal matches found: " + matchCount);
    }
    
    private static String getContext(String input, int start, int end) {
        int contextStart = Math.max(0, start - 5);
        int contextEnd = Math.min(input.length(), end + 5);
        return input.substring(contextStart, contextEnd);
    }
}

This code finds all whole-word occurrences of "fox" in the input string.
For each match, we use start to get its position and display
contextual information around the match. The getContext
method shows text around each match for better visualization.

The example demonstrates how to process multiple matches in a loop, with
find advancing to the next match each time.

## Error Handling with start()

This example demonstrates proper error handling when using
start. We'll show common mistakes and how to avoid them when
working with matcher positions.

MatcherStartErrors.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartErrors {

    public static void main(String[] args) {
        String input = "Sample text with numbers 123 and 456";
        String regex = "\\d+";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        // Error: Calling start() before find()
        try {
            System.out.println("Attempt to call start() before find():");
            System.out.println(matcher.start());
        } catch (IllegalStateException e) {
            System.out.println("  Error: " + e.getMessage());
        }
        
        // Proper usage
        if (matcher.find()) {
            System.out.println("\nFirst number starts at: " + matcher.start());
            
            // Error: Calling start() for non-existent group
            try {
                System.out.println("\nAttempt to get non-existent group:");
                System.out.println(matcher.start(2));
            } catch (IndexOutOfBoundsException e) {
                System.out.println("  Error: " + e.getMessage());
            }
        }
        
        // Error: Calling start() after matches()
        matcher.reset();
        matcher.matches(); // matches() resets the matcher
        try {
            System.out.println("\nAttempt to call start() after matches():");
            System.out.println(matcher.start());
        } catch (IllegalStateException e) {
            System.out.println("  Error: " + e.getMessage());
        }
    }
}

This example highlights three common error scenarios when using
start: calling it before any matching operation, requesting a
non-existent group, and calling it after matches without a
new match attempt.

Each case is wrapped in a try-catch block to demonstrate the specific
exception thrown. Proper error handling makes your regex code more robust
and maintainable.

## Matcher.start in Text Processing

This practical example shows how start can be used in
real-world text processing. We'll extract and highlight all email addresses
in a document.

MatcherStartEmail.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartEmail {

    public static void main(String[] args) {
        String document = "Contact us at support@example.com or sales@company.com.\n" +
                        "For help, email help@service.org. Invalid emails: user@, @domain.com";
        
        String emailRegex = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b";
        
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(document);
        
        System.out.println("Original document:\n" + document);
        System.out.println("\nEmail addresses found:");
        
        StringBuilder highlighted = new StringBuilder(document);
        int offset = 0;
        
        while (matcher.find()) {
            int start = matcher.start();
            int end = matcher.end();
            String email = matcher.group();
            
            System.out.println("- " + email + " (position " + start + "-" + (end-1) + ")");
            
            // Highlight the email in the document
            highlighted.insert(start + offset, "[");
            highlighted.insert(end + offset + 1, "]");
            offset += 2; // Account for added brackets
        }
        
        System.out.println("\nDocument with highlighted emails:");
        System.out.println(highlighted.toString());
    }
}

This example scans a document for valid email addresses using a
comprehensive regex pattern. For each found email, we use
start and end to get its exact position and
then highlight it in the original text by adding brackets around it.

The code demonstrates how start can be used for text markup
and analysis tasks. The offset variable tracks position changes due to our
modifications to the string.

## Advanced Matcher.start Usage

This final example shows an advanced use case combining
start with other Matcher methods. We'll parse a complex
string with multiple patterns and nested groups.

MatcherStartAdvanced.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherStartAdvanced {

    public static void main(String[] args) {
        String config = "server { host: 192.168.1.1; port: 8080; } " +
                      "client { timeout: 30; retries: 3; }";
        
        String serverBlockRegex = "server\\s*\\{ (?&lt;serverContent&gt;.*?) \\}";
        String clientBlockRegex = "client\\s*\\{ (?&lt;clientContent&gt;.*?) \\}";
        String propertyRegex = "(?&lt;key&gt;\\w+)\\s*:\\s*(?&lt;value&gt;[^;]+)";
        
        // Find server block
        Pattern serverPattern = Pattern.compile(serverBlockRegex);
        Matcher serverMatcher = serverPattern.matcher(config);
        
        if (serverMatcher.find()) {
            System.out.println("Server block found at position " + 
                serverMatcher.start() + "-" + (serverMatcher.end()-1));
            
            String serverContent = serverMatcher.group("serverContent");
            
            // Parse properties within server block
            Pattern propertyPattern = Pattern.compile(propertyRegex);
            Matcher propertyMatcher = propertyPattern.matcher(serverContent);
            
            System.out.println("Server block properties:");
            while (propertyMatcher.find()) {
                System.out.println("  Property '" + propertyMatcher.group("key") + 
                    "' starts at: " + (serverMatcher.start() + propertyMatcher.start()) + 
                    ", value: " + propertyMatcher.group("value"));
            }
        }
        
        // Find client block
        Pattern clientPattern = Pattern.compile(clientBlockRegex);
        Matcher clientMatcher = clientPattern.matcher(config);
        
        if (clientMatcher.find()) {
            System.out.println("\nClient block found at position " + 
                clientMatcher.start() + "-" + (clientMatcher.end()-1));
                
            String clientContent = clientMatcher.group("clientContent");
            
            // Parse properties within client block
            Matcher propertyMatcher = Pattern.compile(propertyRegex).matcher(clientContent);
            
            System.out.println("Client block properties:");
            while (propertyMatcher.find()) {
                System.out.println("  Property '" + propertyMatcher.group("key") + 
                    "' starts at: " + (clientMatcher.start() + propertyMatcher.start()) + 
                    ", value: " + propertyMatcher.group("value"));
            }
        }
    }
}

This advanced example demonstrates how start can be used to
track positions in nested pattern matching. We parse a configuration string
containing server and client blocks, each with key-value properties. The
outer matchers find the blocks, and inner matchers parse the properties
within each block.

The start method is used to calculate the absolute position
of each property in the original string by combining the block's starting
position with the relative position of each property within the block
content. This is particularly useful for debugging or logging exact
positions in complex parsing tasks.

## Source

[Java Matcher.start Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#start--)

In this article, we've explored the Matcher.start method in
depth with practical examples. This essential method enables precise
tracking of match positions in Java regex applications, from basic pattern
matching to complex text processing tasks.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and
have since authored over 1,400 articles and eight e-books. With more than
eight years of teaching experience, I am committed to sharing my knowledge
and helping others master programming concepts.

List [all Java tutorials](/java/).