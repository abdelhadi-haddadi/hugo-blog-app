+++
title = "Java Matcher.replaceFirst Method"
date = 2025-08-29T20:00:16.424+01:00
draft = false
description = "Complete Java Matcher.replaceFirst method tutorial with examples. Learn how to replace first regex match in strings."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.replaceFirst Method

Last modified: April 20, 2025

 

The Matcher.replaceFirst method is part of Java's regex API. It
replaces the first subsequence of the input sequence that matches the pattern
with the given replacement string. This method is useful when you need to modify
only the first occurrence of a pattern in a string.

The method works with a compiled Pattern object and a Matcher that has been
applied to an input string. It returns a new string with the first match
replaced. The original input string remains unchanged as strings are immutable
in Java.

## Basic Definitions

**Pattern**: A compiled regular expression that defines the search
pattern. Created using Pattern.compile.

**Matcher**: An engine that performs match operations on a character
sequence by interpreting a Pattern. Created using pattern.matcher.

**replaceFirst**: A Matcher method that replaces the first
occurrence of the pattern in the input string with the replacement string.

## Basic replaceFirst Example

This example demonstrates the simplest use of replaceFirst. We
replace the first occurrence of "cat" with "dog" in the input string.

ReplaceFirstBasic.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstBasic {

    public static void main(String[] args) {
        
        String input = "The cat sat on the cat mat.";
        String regex = "cat";
        String replacement = "dog";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The code compiles the regex pattern, creates a matcher for the input string,
then calls replaceFirst. Only the first "cat" is replaced, while
the second remains unchanged. The output shows the transformation.

## Using Regex Metacharacters

This example shows how replaceFirst works with regex
metacharacters. We replace the first sequence of digits with "NUMBER".

ReplaceFirstMetacharacters.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstMetacharacters {

    public static void main(String[] args) {
        
        String input = "Order 12345 shipped, invoice 67890 pending.";
        String regex = "\\d+";
        String replacement = "NUMBER";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The regex \\d+ matches one or more digits. replaceFirst
finds the first numeric sequence ("12345") and replaces it. The second number
sequence remains unchanged in the output string.

## Using Groups in Replacement

This example demonstrates how to reference captured groups in the replacement
string. We reformat the first date found in the input string.

ReplaceFirstGroups.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstGroups {

    public static void main(String[] args) {
        
        String input = "Dates: 12/25/2023, 01/01/2024, 02/14/2024";
        String regex = "(\\d{2})/(\\d{2})/(\\d{4})";
        String replacement = "$3-$1-$2"; // YYYY-MM-DD format
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The regex captures three groups: month, day, and year. The replacement string
$3-$1-$2 references these groups to reformat the date. Only the
first date is reformatted, while others remain in original format.

## Case Insensitive Replacement

This example shows how to perform case-insensitive replacement of the first
match. We replace the first occurrence of "java" regardless of case.

ReplaceFirstCaseInsensitive.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstCaseInsensitive {

    public static void main(String[] args) {
        
        String input = "Learn Java, love JAVA, master java.";
        String regex = "java";
        String replacement = "JAVA";
        
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The Pattern.CASE_INSENSITIVE flag makes the regex match
case-insensitive. The first occurrence of "Java" (with capital J) is replaced
with "JAVA", while other variations remain unchanged in the output.

## Using Lambda in Replacement

Java 9 introduced the ability to use a function (lambda) to determine the
replacement string. This example doubles the first number found in the string.

ReplaceFirstLambda.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstLambda {

    public static void main(String[] args) {
        
        String input = "Prices: 10, 20, 30, 40";
        String regex = "\\d+";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(match -&gt; {
            int num = Integer.parseInt(match.group());
            return String.valueOf(num * 2);
        });
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The lambda receives the MatchResult and can perform complex logic to generate
the replacement. Here we convert the matched number to an integer, double it,
and convert back to string. Only the first number (10) is doubled to 20.

## Replacing Special Characters

This example shows how to replace the first occurrence of special regex
characters by properly escaping them. We replace the first dot with "[dot]".

ReplaceFirstSpecialChars.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstSpecialChars {

    public static void main(String[] args) {
        
        String input = "example.com www.example.org";
        String regex = "\\."; // Escaped dot
        String replacement = "[dot]";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The dot is escaped with \\ to match a literal dot instead of its
regex meaning (any character). Only the first dot (in ".com") is replaced with
"[dot]", while the second dot remains unchanged.

## Complex Pattern Replacement

This example demonstrates replacing the first match of a complex pattern. We
replace the first HTML tag found in the string with "[TAG]".

ReplaceFirstComplex.java
  

package com.zetcode;

import java.util.regex.*;

public class ReplaceFirstComplex {

    public static void main(String[] args) {
        
        String input = "First paragraph

 Section";
        String regex = "&lt;[^&gt;]+&gt;"; // Matches any HTML tag
        String replacement = "[TAG]";
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        
        String result = matcher.replaceFirst(replacement);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + result);
    }
}

The regex &lt;[^&gt;]+&gt; matches any HTML tag by looking for
&lt;, followed by one or more non-&gt; characters, ending with &gt;. Only the
first tag (

) is replaced with "[TAG]", while the 

 tag remains unchanged.

## Source

[Java Matcher.replaceFirst Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#replaceFirst(java.lang.String))

We've explored various uses of Matcher.replaceFirst through these
examples. This method provides precise control over string modifications when
you only need to change the first pattern match while leaving others unchanged.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).