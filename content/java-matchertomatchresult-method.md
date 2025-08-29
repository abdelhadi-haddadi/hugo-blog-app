+++
title = "Java Matcher.toMatchResult Method"
date = 2025-08-29T20:00:17.529+01:00
draft = false
description = "Complete Java Matcher.toMatchResult method tutorial with examples. Learn about match results in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.toMatchResult Method

Last modified: April 20, 2025

 

The Matcher.toMatchResult method in Java returns a snapshot of the
current match state as a MatchResult object. This allows you to
capture and examine match information without affecting the matcher's state.

The MatchResult interface provides methods to access match details
like group contents and positions. This is useful when you need to preserve
match information for later processing or when working with multiple threads.

## Matcher.toMatchResult Overview

The toMatchResult method creates an immutable snapshot of the
current match state. The returned MatchResult contains all
information about the match, including groups and their positions.

This method is particularly useful when you need to store match results or pass
them to other methods. The snapshot remains valid even if the original matcher
continues matching operations.

## Basic toMatchResult Usage

This example demonstrates the basic usage of toMatchResult to
capture match information. We'll extract details from a simple pattern match.

BasicMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class BasicMatchResult {

    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        String regex = "(quick) (brown) (fox)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            MatchResult result = matcher.toMatchResult();
            
            System.out.println("Full match: " + result.group());
            System.out.println("Group 1: " + result.group(1));
            System.out.println("Group 2: " + result.group(2));
            System.out.println("Group 3: " + result.group(3));
            
            System.out.println("Match start: " + result.start());
            System.out.println("Match end: " + result.end());
        }
    }
}

In this example, we create a pattern with three capturing groups. After finding
a match, we use toMatchResult to capture the match state.

The MatchResult object provides access to the matched text and its
position in the input string. We can retrieve both the full match and individual
groups using the group method.

## Multiple Match Snapshots

This example shows how to capture multiple match states during a matching
operation. We'll store each match result in a list for later processing.

MultipleMatchResults.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class MultipleMatchResults {

    public static void main(String[] args) {
        String input = "John:30, Jane:25, Bob:40, Alice:35";
        String regex = "(\\w+):(\\d+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        List&lt;MatchResult&gt; results = new ArrayList&lt;&gt;();
        
        while (matcher.find()) {
            results.add(matcher.toMatchResult());
        }
        
        System.out.println("Captured matches:");
        for (MatchResult result : results) {
            System.out.printf("Name: %s, Age: %s%n", 
                result.group(1), result.group(2));
        }
    }
}

Here we process a string containing name-age pairs. For each match found, we
store the match state using toMatchResult.

The stored MatchResult objects allow us to process the matches
later, even after the matcher has continued its operations. This is useful for
batch processing of match results.

## Thread-Safe Match Results

This example demonstrates how toMatchResult can be used to create
thread-safe match results. The snapshot can be safely passed to another thread.

ThreadSafeMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class ThreadSafeMatchResult {

    public static void main(String[] args) {
        String input = "Server1:192.168.1.1, Server2:192.168.1.2";
        String regex = "(Server\\d+):(\\d+\\.\\d+\\.\\d+\\.\\d+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            MatchResult result = matcher.toMatchResult();
            
            new Thread(() -&gt; {
                System.out.printf("Processing %s at %s in thread %s%n",
                    result.group(1), result.group(2),
                    Thread.currentThread().getName());
            }).start();
        }
    }
}

In this example, we create a new thread for each match result. The
MatchResult snapshot is safely passed to each thread.

Without toMatchResult, sharing matcher state between threads would
be unsafe. The immutable snapshot ensures thread-safe access to match results.

## Match Result with Groups

This example shows how to work with captured groups using
toMatchResult. We'll extract structured data from a complex pattern.

GroupMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class GroupMatchResult {

    public static void main(String[] args) {
        String input = "Date: 2023-04-20, Time: 14:30, Location: Room 101";
        String regex = "Date: (?&lt;date&gt;\\d{4}-\\d{2}-\\d{2}), " +
                      "Time: (?&lt;time&gt;\\d{2}:\\d{2}), " +
                      "Location: (?&lt;location&gt;[A-Za-z0-9 ]+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        if (matcher.find()) {
            MatchResult result = matcher.toMatchResult();
            
            System.out.println("Full match: " + result.group());
            System.out.println("Date: " + result.group("date"));
            System.out.println("Time: " + result.group("time"));
            System.out.println("Location: " + result.group("location"));
            
            System.out.println("Group count: " + result.groupCount());
        }
    }
}

Here we use named capturing groups to extract structured information from a
string. The MatchResult provides access to both numbered and named
groups.

The example demonstrates how toMatchResult preserves all group
information, making it available for later use. The group count includes all
capturing groups in the pattern.

## Match Position Information

This example focuses on retrieving match position information from the
MatchResult. We'll examine start and end positions of matches.

PositionMatchResult.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class PositionMatchResult {

    public static void main(String[] args) {
        String input = "The rain in Spain falls mainly on the plain";
        String regex = "\\b\\w{4}\\b"; // 4-letter words
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        while (matcher.find()) {
            MatchResult result = matcher.toMatchResult();
            
            System.out.printf("Word '%s' found at [%d,%d)%n",
                result.group(),
                result.start(),
                result.end());
                
            System.out.println("Surrounding text: '" +
                input.substring(Math.max(0, result.start() - 3),
                               Math.min(input.length(), result.end() + 3)) +
                "'");
        }
    }
}

This code finds all 4-letter words in a string and captures their positions.
The MatchResult provides precise location information.

We use the position data to extract text surrounding each match. This
demonstrates how position information can be useful for context-aware
processing of matches.

## Reusing Match Results

This example shows how match results can be stored and reused later in the
program. We'll process the results after the matching operation is complete.

ReuseMatchResult.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class ReuseMatchResult {

    public static void main(String[] args) {
        String input = "Product1: $10.99, Product2: $20.50, Product3: $5.75";
        String regex = "Product(\\d+): \\$(\\d+\\.\\d{2})";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        List&lt;MatchResult&gt; results = new ArrayList&lt;&gt;();
        
        while (matcher.find()) {
            results.add(matcher.toMatchResult());
        }
        
        // Process results later
        System.out.println("Product Report:");
        double total = 0;
        for (MatchResult result : results) {
            String product = result.group(1);
            double price = Double.parseDouble(result.group(2));
            total += price;
            
            System.out.printf("Product %s: $%.2f%n", product, price);
        }
        
        System.out.printf("Total value: $%.2f%n", total);
    }
}

In this example, we store all match results before processing them. This allows
us to separate the matching and processing phases of our program.

The MatchResult objects retain all match information, enabling
complex processing after the initial matching is complete. This pattern is
useful for batch processing scenarios.

## Advanced MatchResult Analysis

This final example demonstrates advanced analysis using multiple
MatchResult objects. We'll compare matches and extract relationships.

AdvancedMatchResult.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.MatchResult;

public class AdvancedMatchResult {

    public static void main(String[] args) {
        String input = "user1:file1.txt, user2:file2.doc, user1:file3.pdf, user3:file1.txt";
        String regex = "(\\w+):(\\w+\\.\\w+)";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        Map&lt;String, Integer&gt; userFileCounts = new HashMap&lt;&gt;();
        Map&lt;String, Integer&gt; fileUserCounts = new HashMap&lt;&gt;();
        
        while (matcher.find()) {
            MatchResult result = matcher.toMatchResult();
            String user = result.group(1);
            String file = result.group(2);
            
            userFileCounts.put(user, userFileCounts.getOrDefault(user, 0) + 1);
            fileUserCounts.put(file, fileUserCounts.getOrDefault(file, 0) + 1);
        }
        
        System.out.println("Files per user:");
        userFileCounts.forEach((user, count) -&gt;
            System.out.printf("%s: %d files%n", user, count));
            
        System.out.println("\nUsers per file:");
        fileUserCounts.forEach((file, count) -&gt;
            System.out.printf("%s: %d users%n", file, count));
    }
}

This code analyzes relationships between users and files in a string. We use
toMatchResult to capture each match and build statistical maps.

The example shows how MatchResult objects can be used for complex
analysis beyond simple matching. The immutable snapshots enable reliable data
processing even after the matcher has moved on.

## Source

[Java Matcher.toMatchResult Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#toMatchResult--)

In this article, we've explored the Matcher.toMatchResult method
and its various applications. This powerful feature enables advanced match
processing and thread-safe operations in Java regex handling.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).