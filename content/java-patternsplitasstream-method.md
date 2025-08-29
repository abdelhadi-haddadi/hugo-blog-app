+++
title = "Java Pattern.splitAsStream Method"
date = 2025-08-29T20:00:24.379+01:00
draft = false
description = "Complete Java Pattern.splitAsStream tutorial with examples. Learn how to split strings into streams using regex patterns."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.splitAsStream Method

Last modified: April 20, 2025

 

The splitAsStream method is part of Java's java.util.regex.Pattern
class. It splits the input sequence around matches of the pattern and returns a
stream of the resulting substrings. This method was introduced in Java 8.

Unlike split which returns an array, splitAsStream
returns a Stream&lt;String&gt;. This makes it ideal for functional
style processing of the split results. The method is efficient for large inputs.

## Basic splitAsStream Example

This example demonstrates the basic usage of splitAsStream. We split
a simple comma-separated string into parts and process them using stream
operations. The pattern matches commas with optional whitespace.

BasicSplitAsStream.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class BasicSplitAsStream {

    public static void main(String[] args) {
        
        String input = "apple, orange, banana, grape";
        Pattern pattern = Pattern.compile("\\s*,\\s*");
        
        Stream&lt;String&gt; fruitStream = pattern.splitAsStream(input);
        fruitStream.forEach(System.out::println);
    }
}

The code splits the input string at each comma, ignoring surrounding whitespace.
The resulting stream contains four elements: "apple", "orange", "banana", and
"grape". We use forEach to print each element.

## Filtering Split Results

This example shows how to filter the results of splitAsStream. We
split a string containing numbers and filter out non-numeric values. The stream
API makes this operation concise.

FilterSplitResults.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class FilterSplitResults {

    public static void main(String[] args) {
        
        String input = "10, 20, thirty, 40, fifty, 60";
        Pattern pattern = Pattern.compile("\\s*,\\s*");
        
        pattern.splitAsStream(input)
            .filter(s -&gt; s.matches("\\d+"))
            .map(Integer::parseInt)
            .forEach(System.out::println);
    }
}

The code splits the input and filters to keep only numeric strings. The
matches check ensures we only process digits. We then convert
valid numbers to integers and print them.

## Processing CSV Data

This example demonstrates processing CSV data with splitAsStream. We
handle quoted values and commas within quotes. The pattern accounts for these
special cases in CSV formatting.

CsvProcessing.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class CsvProcessing {

    public static void main(String[] args) {
        
        String input = "\"John, Doe\",25,\"New York, NY\",Developer";
        Pattern pattern = Pattern.compile(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
        
        pattern.splitAsStream(input)
            .map(s -&gt; s.replaceAll("^\"|\"$", ""))
            .forEach(System.out::println);
    }
}

The pattern uses a positive lookahead to handle commas inside quotes. After
splitting, we remove the surrounding quotes from each field. This approach
correctly processes the "John, Doe" and "New York, NY" values.

## Multiline Input Processing

This example shows how to process multiline input with splitAsStream.
We split text into paragraphs separated by blank lines. The pattern matches
one or more newline characters.

MultilineProcessing.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class MultilineProcessing {

    public static void main(String[] args) {
        
        String input = "First paragraph\n\nSecond paragraph\n\n\nThird paragraph";
        Pattern pattern = Pattern.compile("\\n+");
        
        pattern.splitAsStream(input)
            .filter(p -&gt; !p.isEmpty())
            .forEach(p -&gt; System.out.println("Paragraph:\n" + p + "\n"));
    }
}

The code splits the input at sequences of newline characters. We filter out empty
strings that might result from leading or trailing newlines. Each non-empty
paragraph is then printed with a label.

## Word Splitting with splitAsStream

This example demonstrates splitting text into words using splitAsStream.
The pattern matches any sequence of non-word characters. We process the words
with various stream operations.

WordSplitting.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class WordSplitting {

    public static void main(String[] args) {
        
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("\\W+");
        
        pattern.splitAsStream(input)
            .map(String::toLowerCase)
            .distinct()
            .sorted()
            .forEach(System.out::println);
    }
}

The code splits the input into words at non-word character sequences. We convert
words to lowercase, remove duplicates with distinct, sort them, and
print. This shows the power of combining splitAsStream with streams.

## Processing Log Files

This example demonstrates processing log file entries with splitAsStream.
We split a log string into individual log entries. Each entry is then parsed for
specific information.

LogProcessing.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class LogProcessing {

    public static void main(String[] args) {
        
        String logs = "[INFO] User logged in\n" +
                     "[ERROR] Database connection failed\n" +
                     "[WARN] Disk space low\n" +
                     "[INFO] User logged out";
        
        Pattern pattern = Pattern.compile("\\n");
        
        pattern.splitAsStream(logs)
            .filter(entry -&gt; entry.startsWith("[ERROR]"))
            .forEach(System.out::println);
    }
}

The code splits the log string at newline characters. We filter to keep only
error entries and print them. This approach is efficient for processing large
log files as a stream.

## Complex Splitting with Lookarounds

This example shows advanced splitting using lookaheads and lookbehinds. We split
a string at positions between digits and letters. This demonstrates complex
splitting scenarios.

ComplexSplitting.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class ComplexSplitting {

    public static void main(String[] args) {
        
        String input = "ABC123DEF456GHI789";
        Pattern pattern = Pattern.compile("(?&lt;=\\d)(?=\\D)|(?&lt;=\\D)(?=\\d)");
        
        pattern.splitAsStream(input)
            .forEach(System.out::println);
    }
}

The pattern uses lookbehind and lookahead assertions to split between digit and
non-digit characters. The result is a stream of alternating letter and number
sequences. This technique is useful for parsing complex formats.

## Source

[Java Pattern.splitAsStream Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#splitAsStream-java.lang.CharSequence-)

The splitAsStream method provides a powerful way to process split
results using Java's stream API. It's particularly useful for large inputs and
functional-style processing pipelines.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).