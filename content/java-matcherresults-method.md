+++
title = "Java Matcher.results Method"
date = 2025-08-29T20:00:17.523+01:00
draft = false
description = "Complete Java Matcher.results tutorial with examples. Learn about stream-based regex matching in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.results Method

Last modified: April 20, 2025

 

The Matcher.results method was introduced in Java 9 as part of
the java.util.regex.Matcher class. It returns a stream of match
results for a regular expression pattern. This method provides a modern,
functional approach to regex matching.

Unlike traditional find loops, results enables
stream processing of matches. Each match is represented as a
MatchResult object. The method is particularly useful for
processing multiple matches in a declarative style.

## Matcher.results Overview

The results method scans the input sequence and returns all
matches found. It produces a stream of MatchResult objects. Each
object contains information about a single match, including captured groups.

The method is non-terminal, meaning it doesn't consume the matcher. You can
call it multiple times on the same matcher. However, the matcher's state must
not be modified between calls.

## Basic Usage of Matcher.results()

This example demonstrates the simplest use case of results. We
find all occurrences of a word in a string and print them. The stream
processing makes the code concise and readable.

BasicResultsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class BasicResultsExample {

    public static void main(String[] args) {
        
        String text = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("\\b\\w{4}\\b"); // 4-letter words
        Matcher matcher = pattern.matcher(text);
        
        matcher.results()
               .forEach(mr -&gt; System.out.println("Found: " + mr.group()));
    }
}

In this example, we compile a pattern to match 4-letter words. The
results method returns a stream of matches. We use
forEach to print each match. The group method of
MatchResult returns the matched text.

## Counting Matches with results

The results method integrates well with stream operations. This
example shows how to count matches using the stream API. This approach is more
concise than traditional iteration.

CountMatchesExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class CountMatchesExample {

    public static void main(String[] args) {
        
        String log = "2023-01-01 INFO Start\n2023-01-01 DEBUG Process\n"
                   + "2023-01-02 ERROR Failed\n2023-01-02 INFO Complete";
        Pattern pattern = Pattern.compile("ERROR");
        Matcher matcher = pattern.matcher(log);
        
        long errorCount = matcher.results().count();
        System.out.println("Number of ERROR entries: " + errorCount);
    }
}

Here we search for "ERROR" entries in a log string. The results
method provides a stream that we can directly count with count.
This eliminates the need for manual iteration and counter variables.

## Extracting Group Information

MatchResult objects provide access to captured groups. This example
shows how to extract specific group information from each match. We parse dates
from a string and format them differently.

GroupExtractionExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class GroupExtractionExample {

    public static void main(String[] args) {
        
        String dates = "2023-05-15, 2024-01-20, 2025-11-30";
        Pattern pattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(dates);
        
        matcher.results()
               .map(mr -&gt; String.format("Day: %s, Month: %s, Year: %s", 
                    mr.group(3), mr.group(2), mr.group(1)))
               .forEach(System.out::println);
    }
}

This code matches date strings and extracts their components. The pattern
captures year, month, and day in separate groups. We use map to
reformat each match, accessing groups by their indices. The result is a
stream of reformatted date strings.

## Filtering and Processing Matches

The stream API allows sophisticated processing of matches. This example filters
matches based on group content and performs calculations. We find and sum
specific numeric values in a string.

FilterAndSumExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class FilterAndSumExample {

    public static void main(String[] args) {
        
        String data = "A=5, B=3, C=8, A=2, B=7, C=1";
        Pattern pattern = Pattern.compile("([A-C])=(\\d+)");
        Matcher matcher = pattern.matcher(data);
        
        int sumA = matcher.results()
                         .filter(mr -&gt; "A".equals(mr.group(1)))
                         .mapToInt(mr -&gt; Integer.parseInt(mr.group(2)))
                         .sum();
        
        System.out.println("Sum of A values: " + sumA);
    }
}

Here we extract key-value pairs from a string. We filter for only "A" values,
convert them to integers, and sum them. The combination of results
with stream operations creates a powerful data processing pipeline.

## Named Capture Groups with results

Named capture groups make patterns more readable. This example demonstrates how
to use named groups with results. We parse user information from
a formatted string.

NamedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class NamedGroupsExample {

    public static void main(String[] args) {
        
        String users = "user:john age:30; user:jane age:25";
        Pattern pattern = Pattern.compile(
            "user:(?&lt;name&gt;\\w+)\\s+age:(?&lt;age&gt;\\d+)");
        Matcher matcher = pattern.matcher(users);
        
        matcher.results()
               .forEach(mr -&gt; System.out.printf(
                   "User %s is %s years old%n",
                   mr.group("name"), mr.group("age")));
    }
}

The pattern defines named groups "name" and "age". We access these groups by
name in the forEach operation. Named groups make the code more
maintainable by eliminating magic numbers for group indices.

## Parallel Processing of Matches

The stream from results can be processed in parallel. This
example shows how to leverage multi-core processors for regex matching. We
process a large text with parallel stream operations.

ParallelProcessingExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class ParallelProcessingExample {

    public static void main(String[] args) {
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i &lt; 100; i++) {
            sb.append("item").append(i).append(" ");
        }
        String largeText = sb.toString();
        
        Pattern pattern = Pattern.compile("item\\d+");
        Matcher matcher = pattern.matcher(largeText);
        
        long count = matcher.results()
                           .parallel()
                           .count();
        
        System.out.println("Total items found: " + count);
    }
}

We generate a large string with many "itemN" patterns. The parallel
call enables parallel processing of matches. This can significantly improve
performance for large inputs, though ordering is not guaranteed.

## Combining results() with Other Stream Operations

results integrates with the full Java stream API. This example
shows advanced stream operations like collecting to a map. We build a frequency
map of words in a text.

StreamOperationsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.stream.Collectors;
import java.util.Map;

public class StreamOperationsExample {

    public static void main(String[] args) {
        
        String text = "apple banana apple cherry banana apple";
        Pattern pattern = Pattern.compile("\\b\\w+\\b");
        Matcher matcher = pattern.matcher(text);
        
        Map&lt;String, Long&gt; wordCounts = matcher.results()
            .collect(Collectors.groupingBy(
                mr -&gt; mr.group().toLowerCase(),
                Collectors.counting()));
        
        System.out.println("Word counts: " + wordCounts);
    }
}

This code counts occurrences of each word in a string. The results
stream is collected into a map where keys are words and values are counts. This
demonstrates how regex matching can feed into complex data processing pipelines.

## Source

[Java Matcher.results() Documentation](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Matcher.html#results())

The Matcher.results method provides a modern approach to regex
matching in Java. By returning a stream of matches, it enables functional-style
processing that is often more concise and expressive than traditional iteration.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).