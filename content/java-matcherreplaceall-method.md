+++
title = "Java Matcher.replaceAll Method"
date = 2025-08-29T20:00:15.317+01:00
draft = false
description = "Complete Java Matcher.replaceAll method tutorial with examples. Learn how to replace text using regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.replaceAll Method

Last modified: April 20, 2025

 

The Matcher.replaceAll method is a powerful tool in Java's regex
package. It replaces every subsequence of the input sequence that matches the
pattern with the given replacement string. This method is part of the
java.util.regex.Matcher class.

replaceAll scans the entire input string and replaces all matches
of the pattern. The replacement string can contain references to captured groups
from the pattern. This makes it useful for complex text transformations.

## Basic Definitions

A Matcher is created from a Pattern object and applies
the regex pattern to input text. The replaceAll method performs a
global find-and-replace operation. It returns a new string with all matches
replaced.

The replacement string can include special sequences like $n to
reference captured groups. Backslashes and dollar signs in the replacement
string may need escaping. The method handles all this automatically.

## Simple Text Replacement

This example demonstrates the most basic use of replaceAll. We'll
replace all occurrences of a word in a string. The pattern matches "apple" and
replaces it with "orange".

SimpleReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class SimpleReplace {
    public static void main(String[] args) {
        String input = "I have an apple, you have an apple, we all have apples.";
        Pattern pattern = Pattern.compile("apple");
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("orange");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The code creates a Pattern for the word "apple" and a Matcher for the input
string. replaceAll scans the entire string and replaces all
occurrences. Note that it replaces "apples" with "oranges" because the pattern
matches part of the word.

## Case Insensitive Replacement

This example shows how to perform case-insensitive replacement. We'll use the
CASE_INSENSITIVE flag to match "hello" in any capitalization and
replace it with "Hi".

CaseInsensitiveReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class CaseInsensitiveReplace {
    public static void main(String[] args) {
        String input = "Hello world, hElLo Java, hello everyone!";
        Pattern pattern = Pattern.compile("hello", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("Hi");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The CASE_INSENSITIVE flag makes the pattern match regardless of
case. All variations of "hello" are replaced with "Hi". The replacement string
is applied exactly as specified, without case modification.

## Using Group References in Replacement

This example demonstrates using captured groups in the replacement string. We'll
reformat dates from "MM/DD/YYYY" to "YYYY-MM-DD" by referencing capture groups.

GroupReferenceReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class GroupReferenceReplace {
    public static void main(String[] args) {
        String input = "Today is 04/20/2023, tomorrow is 04/21/2023.";
        Pattern pattern = Pattern.compile("(\\d{2})/(\\d{2})/(\\d{4})");
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("$3-$1-$2");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The pattern captures month, day, and year into groups 1, 2, and 3. The
replacement string "$3-$1-$2" rearranges these groups. Each match
is replaced with the year first, then month, then day, separated by hyphens.

## Removing All Digits

This example shows how to remove all digits from a string by replacing them with
an empty string. We'll use the \d character class which matches any
digit.

RemoveDigits.java
  

package com.zetcode;

import java.util.regex.*;

public class RemoveDigits {
    public static void main(String[] args) {
        String input = "Order 12345 has 3 items costing $456.78 total.";
        Pattern pattern = Pattern.compile("\\d");
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The pattern \d matches each individual digit. replaceAll
with an empty string removes all matches. Note that this removes each digit
separately, not entire numbers as whole units.

## Escaping Special Characters in Replacement

This example demonstrates how to handle special characters in the replacement
string. We'll replace words with strings containing dollar signs, which are
special in replacements.

EscapeReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class EscapeReplace {
    public static void main(String[] args) {
        String input = "Price: 100, Cost: 75, Profit: 25";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("\\$$0");
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

To include a literal dollar sign in the replacement, we escape it with a
backslash. $0 refers to the entire match. The result prefixes each
number with a dollar sign. Note the double backslash in Java strings.

## Multiline Replacement

This example shows how to perform replacements across multiple lines. We'll use
the MULTILINE flag to match patterns at the start of each line.

MultilineReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class MultilineReplace {
    public static void main(String[] args) {
        String input = "First line\nSecond line\nThird line";
        Pattern pattern = Pattern.compile("^", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll("• ");
        System.out.println("Original:\n" + input);
        System.out.println("Modified:\n" + result);
    }
}

The pattern ^ normally matches only the start of the entire string.
With MULTILINE flag, it matches the start of each line. We replace
these positions with bullet characters, effectively adding bullets to each line.

## Complex Replacement with Lambda

Java 9 introduced replacement using a function. This example shows how to use a
lambda to perform dynamic replacements based on match content.

LambdaReplace.java
  

package com.zetcode;

import java.util.regex.*;

public class LambdaReplace {
    public static void main(String[] args) {
        String input = "3 apples, 12 oranges, 1 banana";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceAll(match -&gt; {
            int num = Integer.parseInt(match.group());
            return String.valueOf(num * 2);
        });
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

For each match, the lambda converts the matched text to an integer, doubles it,
and converts back to string. This demonstrates complex, dynamic replacements
that aren't possible with static replacement strings alone.

## Source

[Java Matcher.replaceAll Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#replaceAll-java.lang.String-)

The Matcher.replaceAll method is essential for text processing in
Java. These examples demonstrate its flexibility in handling various replacement
scenarios from simple to complex.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).