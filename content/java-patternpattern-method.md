+++
title = "Java Pattern.pattern() Method"
date = 2025-08-29T20:00:23.249+01:00
draft = false
description = "Complete Java Pattern.pattern() method tutorial with examples. Learn how to retrieve regex patterns in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.pattern() Method

Last modified: April 20, 2025

 

The Pattern.pattern method is a simple yet important method in
Java's regex API. It returns the regular expression string from which the
Pattern object was compiled. This tutorial covers all aspects of this method.

The pattern method is particularly useful when you need to
retrieve the original regex pattern from a compiled Pattern object. It's part
of the java.util.regex.Pattern class and has been available since
Java 1.4.

## Pattern.pattern() Method Overview

The pattern method returns the string representation of the
regular expression used to create the Pattern instance. This is the exact
string passed to Pattern.compile when the object was created.

The method signature is simple: public String pattern. It takes
no parameters and returns the original regex pattern string. The returned
string doesn't include any pattern flags that might have been used.

## Basic Usage of pattern()

The most straightforward use of pattern is to retrieve the regex
pattern from a compiled Pattern object. This is helpful for debugging or when
you need to pass the pattern to another method.

PatternBasicExample.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternBasicExample {

    public static void main(String[] args) {
        
        String regex = "\\d{3}-\\d{2}-\\d{4}";
        Pattern pattern = Pattern.compile(regex);
        
        // Retrieve the original pattern string
        String retrievedPattern = pattern.pattern();
        
        System.out.println("Original regex: " + regex);
        System.out.println("Retrieved pattern: " + retrievedPattern);
        System.out.println("Are equal? " + regex.equals(retrievedPattern));
    }
}

In this example, we compile a simple pattern for a social security number
format. We then use pattern to retrieve the original regex.

The output demonstrates that the retrieved pattern is identical to the original
string used for compilation. This confirms that pattern returns
the exact input string.

## Pattern with Flags

When using pattern flags with Pattern.compile, the
pattern method still returns only the original regex string.
The flags are stored separately in the Pattern object.

PatternWithFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternWithFlags {

    public static void main(String[] args) {
        
        String regex = "hello world";
        Pattern caseInsensitivePattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        
        System.out.println("Pattern with flags: " + caseInsensitivePattern.pattern());
        System.out.println("Flags: " + caseInsensitivePattern.flags());
    }
}

This example shows that pattern returns the original regex
regardless of any flags used during compilation. The flags can be accessed
separately using the flags method.

The output will show the original "hello world" string, not reflecting the
case-insensitive flag that was applied. This behavior is important to
understand when working with flagged patterns.

## Pattern.toString() vs pattern()

The Pattern class also has a toString method that behaves
similarly to pattern. Both methods return the original regex
string, but they serve different purposes in the API design.

PatternToStringComparison.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternToStringComparison {

    public static void main(String[] args) {
        
        String regex = "[A-Za-z]+";
        Pattern pattern = Pattern.compile(regex);
        
        System.out.println("pattern() result: " + pattern.pattern());
        System.out.println("toString() result: " + pattern.toString());
        
        // Comparing the outputs
        System.out.println("Are equal? " + 
            pattern.pattern().equals(pattern.toString()));
    }
}

This example demonstrates that both methods return the same string
representation of the regex pattern. The toString method
is primarily for debugging, while pattern is the official
way to access the regex string.

In practice, you should use pattern when you specifically
need the regex string, as it makes your intent clearer to other developers.

## Using pattern() with Matcher

The pattern method can be useful when working with Matcher
objects, allowing you to access the original pattern that created the Matcher.

PatternWithMatcher.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternWithMatcher {

    public static void main(String[] args) {
        
        String regex = "\\b\\w{4}\\b";  // Match 4-letter words
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("This is a sample text with some words");
        
        // Access the pattern through the Matcher
        Pattern matcherPattern = matcher.pattern();
        System.out.println("Matcher's pattern: " + matcherPattern.pattern());
        
        // Find all matches
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group() + 
                " matching pattern: " + matcher.pattern().pattern());
        }
    }
}

In this example, we demonstrate how to access the original pattern from a
Matcher object. The Matcher's pattern method returns the
Pattern object, from which we can get the string pattern.

This technique is particularly useful in complex applications where you might
need to verify which pattern a Matcher is using or log the pattern for
debugging purposes.

## Pattern.pattern() in Practical Applications

In real-world applications, pattern can be used for pattern
validation, logging, or dynamic pattern modification. Here's an example
showing a practical use case.

PatternPracticalUse.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternPracticalUse {

    public static void main(String[] args) {
        
        // Simulate loading patterns from configuration
        String[] patternStrings = {
            "\\d{3}-\\d{3}-\\d{4}",  // Phone number
            "\\w+@\\w+\\.\\w+",      // Simple email
            "\\d{16}"                // Credit card number
        };
        
        Pattern[] patterns = new Pattern[patternStrings.length];
        
        // Compile all patterns
        for (int i = 0; i &lt; patternStrings.length; i++) {
            patterns[i] = Pattern.compile(patternStrings[i]);
        }
        
        // Later in the application, we need to identify which pattern failed
        String testInput = "invalid-email";
        
        for (Pattern p : patterns) {
            if (!p.matcher(testInput).matches()) {
                System.out.println("Input '" + testInput + 
                    "' doesn't match pattern: " + p.pattern());
            }
        }
    }
}

This example simulates a common scenario where patterns are loaded from
configuration and later used for validation. When validation fails, we use
pattern to log which pattern caused the failure.

The ability to retrieve the original pattern string is invaluable for debugging
and providing meaningful error messages to users or logs.

## Pattern.pattern() with Custom Pattern Classes

When creating custom classes that wrap Pattern objects, you can expose the
pattern method to allow access to the underlying regex string.

CustomPatternWrapper.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class CustomPatternWrapper {
    
    private final Pattern pattern;
    private final String description;
    
    public CustomPatternWrapper(String regex, String description) {
        this.pattern = Pattern.compile(regex);
        this.description = description;
    }
    
    public String getPatternString() {
        return pattern.pattern();
    }
    
    public String getDescription() {
        return description;
    }
    
    public Pattern getPattern() {
        return pattern;
    }

    public static void main(String[] args) {
        
        CustomPatternWrapper emailValidator = new CustomPatternWrapper(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", 
            "Email address validator");
        
        System.out.println("Validator description: " + emailValidator.getDescription());
        System.out.println("Underlying pattern: " + emailValidator.getPatternString());
    }
}

This example demonstrates a common design pattern where you wrap a Pattern
object in a custom class. By exposing the pattern method
through a getter, you maintain access to the original regex string.

This approach is useful when you need to add metadata (like the description
field) or additional behavior to your pattern matching functionality.

## Source

[Java Pattern.pattern() Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#pattern--)

In this tutorial, we've explored the Pattern.pattern method in
depth. While simple, this method plays an important role in Java's regex API
by providing access to the original pattern string.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).