+++
title = "Java Pattern.quote Method"
date = 2025-08-29T20:00:24.393+01:00
draft = false
description = "Complete Java Pattern.quote method tutorial with examples. Learn how to escape regex metacharacters in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.quote Method

Last modified: April 20, 2025

 

The Pattern.quote method is a static utility in Java's regex package
that returns a literal pattern string. It escapes all special regex
metacharacters in the input string. This makes the string safe for exact
matching in regular expressions.

When you need to match a string literally that might contain regex special
characters, Pattern.quote is essential. It wraps the string in
\Q and \E markers, treating everything between them
as literal text.

## Basic Definition

Pattern.quote(String s) takes a single String parameter and returns
a quoted String. The returned string will match exactly the input string, even
if it contains regex metacharacters like *, +, or
?.

This method is particularly useful when building patterns dynamically from user
input or file paths. Without quoting, such strings could cause regex syntax
errors or unexpected matching behavior.

## Basic Usage

This example demonstrates the fundamental use of Pattern.quote to
match a string containing regex metacharacters literally.

PatternQuoteBasic.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteBasic {

    public static void main(String[] args) {
        String input = "The price is $10.99 (special offer)";
        String search = "$10.99 (special offer)";
        
        // Without quoting - fails because $ is a regex metacharacter
        boolean withoutQuote = Pattern.matches(".*" + search + ".*", input);
        System.out.println("Without quote: " + withoutQuote);
        
        // With quoting - works correctly
        String quoted = Pattern.quote(search);
        boolean withQuote = Pattern.matches(".*" + quoted + ".*", input);
        System.out.println("With quote: " + withQuote);
    }
}

The first attempt fails because $ is a regex metacharacter that
anchors to the end of the line. After quoting, all characters are treated
literally, and the match succeeds. The output shows false then true.

## Matching File Paths

File paths often contain backslashes and other special characters that need
escaping in regex patterns. Pattern.quote handles this
automatically.

PatternQuoteFilePath.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteFilePath {

    public static void main(String[] args) {
        String logEntry = "File saved to C:\\Users\\Documents\\report.pdf";
        String filePath = "C:\\Users\\Documents\\report.pdf";
        
        // Without quoting - fails due to unescaped backslashes
        try {
            boolean match = Pattern.matches(".*" + filePath + ".*", logEntry);
            System.out.println("Without quote: " + match);
        } catch (Exception e) {
            System.out.println("Error without quote: " + e.getMessage());
        }
        
        // With quoting - works correctly
        String quotedPath = Pattern.quote(filePath);
        boolean match = Pattern.matches(".*" + quotedPath + ".*", logEntry);
        System.out.println("With quote: " + match);
    }
}

The unquoted version throws an exception because backslashes must be escaped in
regex patterns. Pattern.quote properly escapes all special
characters, making the match work as expected.

## Dynamic Pattern Building

When building patterns from variables, Pattern.quote ensures
user-provided strings are treated literally, preventing regex injection.

PatternQuoteDynamic.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteDynamic {

    public static void main(String[] args) {
        String userInput = "[Important] Meeting at 3pm";
        String message = "Reminder: [Important] Meeting at 3pm - Don't forget!";
        
        // Dangerous way - userInput could contain regex syntax
        boolean unsafeMatch = Pattern.matches(".*" + userInput + ".*", message);
        System.out.println("Unsafe match: " + unsafeMatch);
        
        // Safe way with Pattern.quote
        String safePattern = ".*" + Pattern.quote(userInput) + ".*";
        boolean safeMatch = Pattern.matches(safePattern, message);
        System.out.println("Safe match: " + safeMatch);
        
        // Test with malicious input
        String maliciousInput = ".*";
        String testMessage = "This should not match everything";
        
        // Without quote - matches everything!
        boolean badMatch = Pattern.matches(".*" + maliciousInput + ".*", testMessage);
        System.out.println("Malicious without quote: " + badMatch);
        
        // With quote - matches literally
        boolean goodMatch = Pattern.matches(".*" + Pattern.quote(maliciousInput) + ".*", testMessage);
        System.out.println("Malicious with quote: " + goodMatch);
    }
}

This example shows how unquoted user input can lead to security vulnerabilities.
The malicious input ".*" would match any string without quoting.
Pattern.quote prevents this by treating the input literally.

## Splitting with Literal Delimiters

When splitting strings with complex delimiters, Pattern.quote
ensures the delimiter is treated literally rather than as a regex pattern.

PatternQuoteSplit.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteSplit {

    public static void main(String[] args) {
        String data = "apple|orange|banana|grape";
        String delimiter = "|"; // Pipe is a regex metacharacter
        
        // Without quoting - splits every character
        String[] badSplit = data.split(delimiter);
        System.out.println("Without quote split count: " + badSplit.length);
        
        // With quoting - splits correctly at pipes
        String[] goodSplit = data.split(Pattern.quote(delimiter));
        System.out.println("With quote split count: " + goodSplit.length);
        
        // Print the results
        System.out.println("\nGood split results:");
        for (String fruit : goodSplit) {
            System.out.println(fruit);
        }
    }
}

The pipe character | is a regex alternation operator. Without
quoting, split treats it as a pattern and splits at every
character. After quoting, it splits only at the literal pipe characters.

## Escaping Replacement Strings

While primarily for patterns, Pattern.quote can also help when
working with replacement strings in Matcher.replaceAll.

PatternQuoteReplacement.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternQuoteReplacement {

    public static void main(String[] args) {
        String text = "Replace $10 with $20 in the budget";
        String find = "$10";
        String replace = "$20";
        
        // Without quoting - $ is treated as group reference
        try {
            String badResult = text.replaceAll(find, replace);
            System.out.println("Without quote: " + badResult);
        } catch (Exception e) {
            System.out.println("Error without quote: " + e.getMessage());
        }
        
        // With quoting - works correctly
        String goodResult = text.replaceAll(Pattern.quote(find), 
            Matcher.quoteReplacement(replace));
        System.out.println("With quote: " + goodResult);
    }
}

This example shows that Pattern.quote handles the search pattern,
while Matcher.quoteReplacement is needed for the replacement
string. Together they ensure both parts are treated literally.

## Combining with Other Patterns

Pattern.quote can be combined with other regex patterns to create
complex matching logic while keeping certain parts literal.

PatternQuoteCombined.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteCombined {

    public static void main(String[] args) {
        String[] filenames = {
            "report_2023.pdf",
            "report_2023.txt",
            "invoice_2023.pdf",
            "summary_2023.pdf"
        };
        
        String fixedPart = "report_2023";
        String extension = ".pdf";
        
        // Build pattern combining quoted and regex parts
        String pattern = Pattern.quote(fixedPart) + "\\..+";
        Pattern compiled = Pattern.compile(pattern);
        
        System.out.println("Matching files:");
        for (String filename : filenames) {
            if (compiled.matcher(filename).matches()) {
                System.out.println(filename);
            }
        }
        
        // More precise version requiring specific extension
        String precisePattern = Pattern.quote(fixedPart) + 
            Pattern.quote(extension);
        System.out.println("\nExact matches:");
        for (String filename : filenames) {
            if (filename.matches(precisePattern)) {
                System.out.println(filename);
            }
        }
    }
}

This example shows how to combine quoted literal strings with regex patterns.
The first pattern matches any file starting with "report_2023" and having any
extension. The second pattern matches exactly "report_2023.pdf".

## Performance Considerations

While Pattern.quote adds some overhead, it's often negligible
compared to the cost of incorrect matches or exceptions from unquoted patterns.

PatternQuotePerformance.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuotePerformance {

    public static void main(String[] args) {
        String input = "Searching in 1,000,000 strings for special chars: *^$";
        String search = "*^$";
        
        // Test without quoting
        long start = System.nanoTime();
        try {
            boolean match = input.matches(".*" + search + ".*");
        } catch (Exception e) {
            System.out.println("Exception without quoting");
        }
        long withoutQuoteTime = System.nanoTime() - start;
        
        // Test with quoting
        start = System.nanoTime();
        boolean match = input.matches(".*" + Pattern.quote(search) + ".*");
        long withQuoteTime = System.nanoTime() - start;
        
        System.out.println("Time without quote: " + withoutQuoteTime + " ns");
        System.out.println("Time with quote: " + withQuoteTime + " ns");
        System.out.println("Overhead: " + 
            (withQuoteTime - withoutQuoteTime) + " ns");
    }
}

This example compares the performance of quoted versus unquoted patterns. While
quoting adds a small overhead, it's typically insignificant for most
applications. The safety benefits usually outweigh the minimal performance cost.

## Source

[Java Pattern.quote Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#quote-java.lang.String-)

The Pattern.quote method is an essential tool for safe regex
operations in Java. It prevents regex injection vulnerabilities and ensures
literal matching of strings containing special characters.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).