+++
title = "Java Matcher.appendReplacement Method"
date = 2025-08-29T20:00:10.842+01:00
draft = false
description = "Complete Java Matcher.appendReplacement method tutorial with examples. Learn how to perform regex replacements in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.appendReplacement Method

Last modified: April 20, 2025

 

The appendReplacement method is part of Java's Matcher
class in the java.util.regex package. It performs incremental
replacement operations on input strings while preserving non-matched portions.

This method is typically used with appendTail to build modified
strings where only specific matches are replaced. It offers more control than
simple replace methods by allowing custom processing of each match.

## Basic Definitions

Matcher.appendReplacement(StringBuffer sb, String replacement)
appends text to a string buffer and performs replacements. It reads the input
text up to the current match and appends it to the buffer, then appends the
replacement string.

The method requires a StringBuffer to accumulate results and a
replacement string that can reference captured groups. It throws
IllegalStateException if no match has been attempted or if the
previous match failed.

## Basic Replacement Example

This example demonstrates the fundamental usage of appendReplacement
to replace all occurrences of a pattern in a string. We'll replace all digits
with their word equivalents.

BasicReplacement.java
  

package com.zetcode;

import java.util.regex.*;

public class BasicReplacement {
    public static void main(String[] args) {
        String input = "I have 3 apples and 5 oranges.";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String replacement = convertToWord(matcher.group());
            matcher.appendReplacement(sb, replacement);
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
    
    private static String convertToWord(String number) {
        switch (number) {
            case "1": return "one";
            case "2": return "two";
            case "3": return "three";
            case "4": return "four";
            case "5": return "five";
            default: return number;
        }
    }
}

In this example, we first compile a pattern to match digits. The matcher finds
each digit sequence, and for each match, we call appendReplacement
with a custom replacement. Finally, appendTail adds the remaining
text after the last match.

## Using Group References in Replacement

This example shows how to reference captured groups in the replacement string.
We'll reformat dates from "MM/DD/YYYY" to "YYYY-MM-DD" format.

GroupReference.java
  

package com.zetcode;

import java.util.regex.*;

public class GroupReference {
    public static void main(String[] args) {
        String input = "Dates: 12/25/2023, 01/01/2024, 07/04/2023";
        Pattern pattern = Pattern.compile("(\\d{2})/(\\d{2})/(\\d{4})");
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "$3-$1-$2");
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
}

Here we use group references ($1, $2, $3) in the replacement string to
rearrange the date components. The pattern captures month, day, and year as
separate groups which we then reference in the replacement string.

## Conditional Replacement

This example demonstrates conditional replacement based on match content. We'll
replace words with their lengths, but only if they're longer than 3 characters.

ConditionalReplacement.java
  

package com.zetcode;

import java.util.regex.*;

public class ConditionalReplacement {
    public static void main(String[] args) {
        String input = "The quick brown fox jumps over the lazy dog";
        Pattern pattern = Pattern.compile("\\w+");
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String word = matcher.group();
            String replacement = word.length() &gt; 3 ? 
                String.valueOf(word.length()) : word;
            matcher.appendReplacement(sb, replacement);
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
}

The code checks each matched word's length and replaces it with its character
count only if it's longer than 3 characters. This shows how appendReplacement
enables complex replacement logic that simple replace methods can't handle.

## HTML Tag Conversion

This example converts simple markdown-style formatting to HTML tags. We'll
replace *bold* text with &lt;b&gt;bold&lt;/b&gt; and _italic_ with
&lt;i&gt;italic&lt;/i&gt;.

HtmlConversion.java
  

package com.zetcode;

import java.util.regex.*;

public class HtmlConversion {
    public static void main(String[] args) {
        String input = "This is *bold* and this is _italic_ text.";
        Pattern boldPattern = Pattern.compile("\\*(.*?)\\*");
        Pattern italicPattern = Pattern.compile("_(.*?)_");
        
        StringBuffer sb = new StringBuffer();
        Matcher matcher = boldPattern.matcher(input);
        
        // First replace bold
        while (matcher.find()) {
            matcher.appendReplacement(sb, "&lt;b&gt;$1&lt;/b&gt;");
        }
        matcher.appendTail(sb);
        
        // Then replace italic in the modified string
        String intermediate = sb.toString();
        matcher = italicPattern.matcher(intermediate);
        sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "&lt;i&gt;$1&lt;/i&gt;");
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
}

This example shows two replacement passes - first for bold, then for italic
formatting. We process the intermediate result of the first replacement in the
second pass. Note the use of non-greedy quantifiers (.*?) to match the shortest
possible text between markers.

## Custom Replacement Logic

This example demonstrates complex replacement logic where we process each match
before replacement. We'll obfuscate email addresses by replacing characters
with asterisks except the first and last characters.

CustomLogic.java
  

package com.zetcode;

import java.util.regex.*;

public class CustomLogic {
    public static void main(String[] args) {
        String input = "Contact us at support@example.com or sales@company.org";
        Pattern pattern = Pattern.compile("\\b[\\w.%-]+@[\\w.-]+\\.[a-zA-Z]{2,6}\\b");
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            String email = matcher.group();
            String obfuscated = obfuscateEmail(email);
            matcher.appendReplacement(sb, obfuscated);
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
    
    private static String obfuscateEmail(String email) {
        String[] parts = email.split("@");
        String local = parts[0];
        String domain = parts[1];
        
        // Obfuscate local part (keep first and last character)
        if (local.length() &gt; 2) {
            local = local.charAt(0) + "*".repeat(local.length() - 2) + 
                    local.charAt(local.length() - 1);
        }
        
        return local + "@" + domain;
    }
}

The example shows how appendReplacement can be used with custom
processing logic for each match. We split the email address, process the local
part, and then combine it back for the replacement.

## Multiline Replacement

This example demonstrates handling multiline input with appendReplacement.
We'll add line numbers to each line in a multiline string.

MultilineProcessing.java
  

package com.zetcode;

import java.util.regex.*;

public class MultilineProcessing {
    public static void main(String[] args) {
        String input = "First line\nSecond line\nThird line\nFourth line";
        Pattern pattern = Pattern.compile("^.*$", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        int lineNumber = 1;
        while (matcher.find()) {
            String replacement = lineNumber + ": " + matcher.group();
            matcher.appendReplacement(sb, replacement);
            lineNumber++;
        }
        matcher.appendTail(sb);
        
        System.out.println("Original:\n" + input);
        System.out.println("\nModified:\n" + sb.toString());
    }
}

The key here is using the Pattern.MULTILINE flag to make ^ and $
match at the start and end of each line. We maintain a counter to number each
line as we process it with appendReplacement.

## Complex Pattern with Backreferences

This advanced example shows using backreferences in both the pattern and
replacement. We'll find duplicate words and mark them in the output.

DuplicateWords.java
  

package com.zetcode;

import java.util.regex.*;

public class DuplicateWords {
    public static void main(String[] args) {
        String input = "This this is a test test of duplicate word detection.";
        Pattern pattern = Pattern.compile("\\b(\\w+)(\\s+\\1\\b)+", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, "[DUPLICATE: $1]");
        }
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
}

The pattern \b(\w+)(\s+\1\b)+ matches repeated words. The
replacement uses $1 to reference the first captured group (the repeated word).
The CASE_INSENSITIVE flag ensures case differences don't prevent
detection of duplicates.

## Source

[Java Matcher.appendReplacement Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#appendReplacement-java.lang.StringBuffer-java.lang.String-)

This tutorial has covered various uses of Matcher.appendReplacement,
from basic to advanced scenarios. The method provides powerful string
manipulation capabilities when combined with regular expressions.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).