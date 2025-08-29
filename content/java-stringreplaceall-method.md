+++
title = "Java String.replaceAll Method"
date = 2025-08-29T20:00:25.498+01:00
draft = false
description = "Complete Java String.replaceAll method tutorial covering all features with examples. Learn about string replacement in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String.replaceAll Method

Last modified: April 20, 2025

 

The String.replaceAll method replaces each substring of a string
that matches a given regular expression with a replacement. It is a powerful
string manipulation tool in Java. The method returns a new string with all
replacements made.

The first parameter is a regular expression pattern to match. The second
parameter is the replacement string. The method throws
PatternSyntaxException if the regex syntax is invalid. It works
with both simple and complex regular expressions.

## Basic String Replacement

The simplest use of replaceAll replaces all occurrences of a
literal string. The replacement can be another literal string. This example
shows basic text substitution in a sentence.

BasicReplace.java
  

package com.zetcode;

public class BasicReplace {

    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        
        // Replace all occurrences of "fox" with "cat"
        String result = text.replaceAll("fox", "cat");
        System.out.println(result);
        
        // Case-sensitive replacement
        String caseResult = text.replaceAll("the", "a");
        System.out.println(caseResult);
    }
}

The first replacement changes "fox" to "cat". The second replacement shows
case sensitivity - only lowercase "the" is replaced. The original string
remains unchanged as strings are immutable in Java.

## Regular Expression Replacement

replaceAll accepts full regular expressions as its first
parameter. This allows for pattern-based replacements. Special regex
characters must be escaped when matching literally.

RegexReplace.java
  

package com.zetcode;

public class RegexReplace {

    public static void main(String[] args) {
        String text = "Apples: 5, Oranges: 3, Bananas: 7";
        
        // Replace all digits with "X"
        String result1 = text.replaceAll("\\d", "X");
        System.out.println(result1);
        
        // Replace word characters followed by ":"
        String result2 = text.replaceAll("\\w+:", "Fruit:");
        System.out.println(result2);
    }
}

The first example replaces all digits with "X". The second replaces word
characters before colons. Note the double backslash needed for regex
metacharacters in Java strings.

## Case Insensitive Replacement

To perform case-insensitive replacements, we can use regex pattern flags.
The (?i) flag makes the match case-insensitive. This flag
affects only the part of the pattern that follows it.

CaseInsensitiveReplace.java
  

package com.zetcode;

public class CaseInsensitiveReplace {

    public static void main(String[] args) {
        String text = "Java is fun. java is powerful. JAVA is everywhere.";
        
        // Case-insensitive replacement
        String result = text.replaceAll("(?i)java", "Python");
        System.out.println(result);
        
        // Partial case-insensitivity
        String partialResult = text.replaceAll("JAVA(?i) is", "Python is");
        System.out.println(partialResult);
    }
}

The first replacement changes all case variants of "java" to "Python". The
second shows partial case sensitivity - only "JAVA" is matched exactly,
while "is" is case-insensitive.

## Group References in Replacements

Matched groups from the regex can be referenced in the replacement string
using $n notation. This allows dynamic replacements based on
the matched content. Groups are numbered from 1.

GroupReplace.java
  

package com.zetcode;

public class GroupReplace {

    public static void main(String[] args) {
        String text = "John Doe, Jane Smith, Bob Johnson";
        
        // Swap first and last names
        String result = text.replaceAll("(\\w+) (\\w+)", "$2, $1");
        System.out.println(result);
        
        // Format dates
        String dates = "2023-04-20, 2024-05-15";
        String formatted = dates.replaceAll("(\\d{4})-(\\d{2})-(\\d{2})", "$3/$2/$1");
        System.out.println(formatted);
    }
}

The first example swaps first and last names. The second reformats dates
from YYYY-MM-DD to DD/MM/YYYY. Group references allow powerful string
transformations without complex parsing code.

## Removing Characters

replaceAll can remove characters by replacing them with an
empty string. This is useful for stripping unwanted characters or
whitespace. The pattern matches what should be removed.

RemoveChars.java
  

package com.zetcode;

public class RemoveChars {

    public static void main(String[] args) {
        String text = "Hello, World! 123";
        
        // Remove all digits
        String noDigits = text.replaceAll("\\d", "");
        System.out.println(noDigits);
        
        // Remove all punctuation
        String noPunct = text.replaceAll("[^a-zA-Z0-9 ]", "");
        System.out.println(noPunct);
        
        // Remove extra whitespace
        String spaced = "Too    much   space";
        String fixed = spaced.replaceAll("\\s+", " ");
        System.out.println(fixed);
    }
}

The examples show removing digits, punctuation, and extra spaces. The
character class [^...] negates the match. \s+
matches one or more whitespace characters.

## Escaping Special Characters

When replacing literal strings that contain regex metacharacters, they
must be escaped. Java provides Pattern.quote to escape
special characters automatically. This ensures literal matching.

EscapeReplace.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class EscapeReplace {

    public static void main(String[] args) {
        String text = "Use * for multiplication and . for decimals";
        
        // Problematic replacement (regex interprets *)
        try {
            String badReplace = text.replaceAll("*", "x");
            System.out.println(badReplace);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // Properly escaped replacement
        String safeReplace = text.replaceAll(Pattern.quote("*"), "x");
        System.out.println(safeReplace);
        
        // Manual escaping
        String dotReplace = text.replaceAll("\\.", "point");
        System.out.println(dotReplace);
    }
}

The first attempt fails because * is a regex quantifier. The second uses
Pattern.quote to escape all metacharacters. The third shows
manual escaping with backslash.

## Complex Replacement with Callbacks

For advanced replacements, we can use Matcher with a loop
to process each match individually. This allows different replacements
based on match content. The example shows dynamic replacements.

CallbackReplace.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CallbackReplace {

    public static void main(String[] args) {

        String text = "Prices: $10, $20, $30";
        Pattern pattern = Pattern.compile("\\$(\\d+)");
        Matcher matcher = pattern.matcher(text);

        StringBuilder result = new StringBuilder();

        while (matcher.find()) {
            // Convert dollar amount to euros
            int dollars = Integer.parseInt(matcher.group(1));
            int euros = (int)(dollars * 0.85);
            matcher.appendReplacement(result, "€" + euros);
        }
        matcher.appendTail(result);

        System.out.println(result);
    }
}

This example converts dollar amounts to euros. Each match is processed
individually. appendReplacement builds the result string.
appendTail adds the remaining text after the last match.

## Source

[Java String.replaceAll Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#replaceAll-java.lang.String-java.lang.String-)

This tutorial covered the essential features of Java's String.replaceAll
method. From basic replacements to advanced regex techniques, these examples
demonstrate the method's versatility in string manipulation.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).