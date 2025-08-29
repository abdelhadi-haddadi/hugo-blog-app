+++
title = "Java Matcher.end Method"
date = 2025-08-29T20:00:11.971+01:00
draft = false
description = "Complete Java Matcher.end method tutorial with examples. Learn about regex matching in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.end Method

Last modified: April 20, 2025

 

The Matcher.end method is part of Java's regex package. It returns
the offset after the last character matched. This method is crucial for
determining match positions in input strings.

Matcher.end works with the Pattern and
Matcher classes. It provides precise location information about
regex matches. The method has several overloaded versions for different use
cases.

## Basic Definitions

The Matcher.end method returns the index after the last character
of the match. It throws IllegalStateException if no match has been
attempted or found.

There are two versions: end for the entire match and
end(int group) for specific groups. Both are essential for advanced
text processing with regular expressions.

## Basic Matcher.end Usage

This example demonstrates the simplest use of Matcher.end. We'll
find the position of a word in a sentence. The end index helps determine where
the match ends.

MatcherEndBasic.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndBasic {

    public static void main(String[] args) {
        
        String text = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("fox");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            System.out.println("Match found from index " + matcher.start() + 
                " to " + matcher.end());
            System.out.println("Matched text: '" + 
                text.substring(matcher.start(), matcher.end()) + "'");
        }
    }
}

In this example, we search for the word "fox" in a sentence. When found, we
print the start and end indices. The end method returns the
position after the last character of the match.

The substring between start and end gives us the
exact matched text. This is useful for validation and text extraction tasks.

## Matcher.end with Groups

This example shows how to use end(int group) with capturing groups.
Groups allow matching specific parts of a pattern. The end positions of groups
can be retrieved separately.

MatcherEndGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndGroups {

    public static void main(String[] args) {
        
        String date = "2025-04-20";
        Pattern pattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(date);
        
        if (matcher.matches()) {
            System.out.println("Full match ends at: " + matcher.end());
            System.out.println("Year ends at: " + matcher.end(1));
            System.out.println("Month ends at: " + matcher.end(2));
            System.out.println("Day ends at: " + matcher.end(3));
        }
    }
}

Here we parse a date string with capturing groups for year, month, and day. The
end method without parameters gives the full match end position.

Each numbered group's end position is available via end(group).
This helps when processing structured text where different parts have different
meanings.

## Multiple Matches with end

This example demonstrates finding multiple matches and their end positions. The
Matcher.find method is called repeatedly to find all occurrences.
Each match's end position is recorded.

MatcherEndMultiple.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndMultiple {

    public static void main(String[] args) {
        
        String text = "cat dog cat dog cat";
        Pattern pattern = Pattern.compile("cat");
        Matcher matcher = pattern.matcher(text);
        
        System.out.println("All 'cat' positions:");
        while (matcher.find()) {
            System.out.println("Found at " + matcher.start() + 
                "-" + matcher.end());
        }
    }
}

The code finds all occurrences of "cat" in the input string. For each match, it
prints the start and end positions. The find method moves the
matcher to the next match each time it's called.

This technique is useful for tasks like keyword highlighting or counting
specific patterns in text. The end positions help determine the exact match
locations.

## Matcher.end with Named Groups

Java supports named capturing groups in regular expressions. This example shows
how to get end positions for named groups. Named groups make patterns more
readable.

MatcherEndNamedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndNamedGroups {

    public static void main(String[] args) {
        
        String text = "John:30, Jane:25";
        Pattern pattern = Pattern.compile("(?&lt;name&gt;\\w+):(?&lt;age&gt;\\d+)");
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            System.out.println("Full match ends at: " + matcher.end());
            System.out.println("Name '" + matcher.group("name") + 
                "' ends at: " + matcher.end("name"));
            System.out.println("Age '" + matcher.group("age") + 
                "' ends at: " + matcher.end("age") + "\n");
        }
    }
}

This code processes name-age pairs using named groups. The end(String
name) method returns the end position for each named group. This makes
the code more maintainable than using numbered groups.

Named groups are especially useful in complex patterns with many groups. They
eliminate the need to count group numbers manually.

## Error Handling with Matcher.end

This example demonstrates proper error handling when using Matcher.end.
The method throws exceptions if called at the wrong time. We'll show how to avoid
common pitfalls.

MatcherEndErrors.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndErrors {

    public static void main(String[] args) {
        
        String text = "Sample text";
        Pattern pattern = Pattern.compile("missing");
        Matcher matcher = pattern.matcher(text);
        
        try {
            // Error: no match attempted yet
            System.out.println(matcher.end());
        } catch (IllegalStateException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
        
        if (matcher.find()) {
            System.out.println("Match found");
        } else {
            try {
                // Error: no match found
                System.out.println(matcher.end());
            } catch (IllegalStateException e) {
                System.out.println("Caught exception: " + e.getMessage());
            }
        }
    }
}

The code shows two common error scenarios. First, calling end
before any matching operation. Second, calling it after an unsuccessful match.
Both throw IllegalStateException.

Always check find or matches results before
calling end. This prevents runtime exceptions in your
application.

## Matcher.end in Text Processing

This practical example shows how to use Matcher.end for text
processing. We'll extract all email addresses from a document and record their
positions.

MatcherEndEmailExtraction.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndEmailExtraction {

    public static void main(String[] args) {
        
        String document = "Contact us at info@example.com or " +
            "support@test.org. For sales, email sales@company.com";
            
        Pattern pattern = Pattern.compile("\\b[\\w.%-]+@[\\w.-]+\\.[a-zA-Z]{2,6}\\b");
        Matcher matcher = pattern.matcher(document);
        
        System.out.println("Found emails:");
        while (matcher.find()) {
            System.out.printf("Email: %-20s Position: %3d-%3d%n",
                matcher.group(),
                matcher.start(),
                matcher.end());
        }
    }
}

The code scans a document for email addresses using a regex pattern. For each
found email, it prints the address and its position in the document. The
end method helps determine where each email ends.

This technique is useful for document processing, data extraction, and text
analysis. Knowing match positions enables precise text manipulation.

## Matcher.end vs String.length

This example compares Matcher.end with String.length.
We'll show how they relate when processing strings. The end position is crucial
for substring operations.

MatcherEndLengthComparison.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MatcherEndLengthComparison {

    public static void main(String[] args) {
        
        String text = "The answer is 42";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(text);
        
        if (matcher.find()) {
            System.out.println("Matched number: " + matcher.group());
            System.out.println("Match ends at: " + matcher.end());
            System.out.println("String length: " + text.length());
            
            String afterMatch = text.substring(matcher.end());
            System.out.println("Text after match: '" + afterMatch + "'");
        }
    }
}

The code finds a number in a string and examines its position. The
end position is compared to the full string length. We then
extract the text following the match using substring(end()).

Understanding the relationship between match positions and string length is
important for text manipulation. The end position helps split strings precisely
around matches.

## Source

[Java Matcher.end Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#end--)

This tutorial covered the essential aspects of the Matcher.end
method. From basic usage to advanced text processing, these examples demonstrate
its versatility in Java regex operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).