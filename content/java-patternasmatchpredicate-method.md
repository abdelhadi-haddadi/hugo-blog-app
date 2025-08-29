+++
title = "Java Pattern.asMatchPredicate Method"
date = 2025-08-29T20:00:20.999+01:00
draft = false
description = "Complete Java Pattern class tutorial covering all methods with examples. Learn about regular expressions in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.asMatchPredicate Method

Last modified: April 20, 2025

 

The Pattern.asMatchPredicate method was introduced in Java 11 as a
convenient way to convert a compiled regular expression pattern into a
Predicate&lt;String&gt;. This allows for seamless integration with
Java's functional programming features, particularly when working with streams.

The method creates a predicate that tests if a given input string exactly matches
the pattern. It is equivalent to calling pattern.matcher(input).matches
for each input string. The predicate can be used in filtering operations and
other functional contexts.

## Basic Definitions

A Predicate in Java is a functional interface that represents a
boolean-valued function of one argument. It is commonly used for filtering
collections or streams. The Pattern.asMatchPredicate method bridges
the gap between regular expressions and functional programming.

The key difference between asMatchPredicate and
asPredicate is that the former requires the entire input string to
match the pattern, while the latter only requires a portion of the string to
match (similar to find vs matches).

## Basic Usage of asMatchPredicate

This example demonstrates the simplest use case of
Pattern.asMatchPredicate. We create a pattern for matching email
addresses and convert it into a predicate that checks for exact matches.

BasicPredicateExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class BasicPredicateExample {

    public static void main(String[] args) {
        // Compile email pattern
        Pattern emailPattern = Pattern.compile("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$");
        
        // Convert to match predicate
        Predicate&lt;String&gt; emailPredicate = emailPattern.asMatchPredicate();
        
        // Test some strings
        System.out.println(emailPredicate.test("user@example.com"));  // true
        System.out.println(emailPredicate.test("invalid-email"));     // false
        System.out.println(emailPredicate.test(" prefix@test.com ")); // false
    }
}

In this example, the predicate returns true only for strings that
exactly match the email pattern. Note that strings with leading or trailing
whitespace don't match, as asMatchPredicate requires full string
matching.

## Filtering a Stream with asMatchPredicate

One of the most powerful uses of asMatchPredicate is in stream
processing. This example shows how to filter a stream of strings to include only
those that exactly match a specific pattern.

StreamFilterExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class StreamFilterExample {

    public static void main(String[] args) {
        // Pattern for US phone numbers in (xxx) xxx-xxxx format
        Pattern phonePattern = Pattern.compile("^\\(\\d{3}\\) \\d{3}-\\d{4}$");
        
        Stream.of("(123) 456-7890", "invalid", "456-7890", "(123)456-7890")
            .filter(phonePattern.asMatchPredicate())
            .forEach(System.out::println);
    }
}

The output will only include the string "(123) 456-7890" as it's the only one
that exactly matches the phone number pattern. The other strings either don't
match at all or don't match exactly (missing space after area code).

## Combining Multiple Predicates

asMatchPredicate can be combined with other predicates using
Predicate.and, Predicate.or, and
Predicate.negate. This example shows how to create complex
validation logic by combining multiple pattern predicates.

CombinedPredicatesExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class CombinedPredicatesExample {

    public static void main(String[] args) {
        Pattern usernamePattern = Pattern.compile("^[a-zA-Z0-9_]{5,12}$");
        Pattern passwordPattern = Pattern.compile("^(?=.*[A-Z])(?=.*\\d).{8,}$");
        
        Predicate&lt;String&gt; isValidUsername = usernamePattern.asMatchPredicate();
        Predicate&lt;String&gt; isValidPassword = passwordPattern.asMatchPredicate();
        
        // Combined predicate for registration validation
        Predicate&lt;String[]&gt; isValidRegistration = inputs -&gt;
            inputs.length == 2 &amp;&amp;
            isValidUsername.test(inputs[0]) &amp;&amp;
            isValidPassword.test(inputs[1]);
        
        System.out.println(isValidRegistration.test(new String[]{"user123", "Pass123"})); // true
        System.out.println(isValidRegistration.test(new String[]{"usr", "weak"}));        // false
    }
}

This example demonstrates how to combine multiple pattern predicates to validate
user registration data. The username must be 5-12 alphanumeric characters, while
the password must be at least 8 characters with at least one uppercase letter
and one digit.

## Case-Insensitive Matching

When using asMatchPredicate with case-insensitive patterns, the
predicate will match strings regardless of case. This example shows how to
create a case-insensitive predicate for matching country names.

CaseInsensitiveExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class CaseInsensitiveExample {

    public static void main(String[] args) {
        // Case-insensitive pattern for matching country names
        Pattern countryPattern = Pattern.compile("^Germany|France|Italy|Spain$", 
            Pattern.CASE_INSENSITIVE);
            
        Stream.of("germany", "FRANCE", "italy", "spain", "Portugal")
            .filter(countryPattern.asMatchPredicate())
            .forEach(System.out::println);
    }
}

The output will include all variations of the country names ("germany", "FRANCE",
"italy", "spain") except "Portugal" which isn't in the pattern. The
CASE_INSENSITIVE flag makes the matching ignore case differences.

## Validating Numeric Ranges

asMatchPredicate can be used to validate that numbers fall within
specific ranges when formatted as strings. This example validates temperature
readings in a specific format.

NumericRangeExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.List;
import java.util.stream.Collectors;

public class NumericRangeExample {

    public static void main(String[] args) {
        // Pattern for temperatures between -99.9 and 99.9 with exactly one decimal
        Pattern tempPattern = Pattern.compile("^-?\\d{1,2}\\.\\d$");
        
        List&lt;String&gt; validTemps = List.of("23.5", "-5.0", "99.9", "-99.9")
            .stream()
            .filter(tempPattern.asMatchPredicate()
                .and(s -&gt; {
                    double temp = Double.parseDouble(s);
                    return temp &gt;= -99.9 &amp;&amp; temp &lt;= 99.9;
                }))
            .collect(Collectors.toList());
            
        System.out.println("Valid temperatures: " + validTemps);
    }
}

This example first checks if the string matches the temperature format pattern,
then additionally verifies that the numeric value falls within the specified
range. The combination of pattern matching and numeric validation provides
comprehensive input checking.

## Validating Date Formats

Date format validation is a common use case for asMatchPredicate.
This example demonstrates how to validate dates in YYYY-MM-DD format while also
checking for reasonable date values.

DateFormatExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class DateFormatExample {

    public static void main(String[] args) {
        // Pattern for YYYY-MM-DD dates
        Pattern datePattern = Pattern.compile(
            "^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$");
        
        Predicate&lt;String&gt; isValidDate = datePattern.asMatchPredicate();
        
        System.out.println(isValidDate.test("2023-05-15"));  // true
        System.out.println(isValidDate.test("2023-13-01"));  // false (invalid month)
        System.out.println(isValidDate.test("23-05-15"));    // false (short year)
        System.out.println(isValidDate.test("2023/05/15"));  // false (wrong separator)
    }
}

The pattern ensures the date follows the exact YYYY-MM-DD format with valid
ranges for each component. Note that this doesn't validate all possible invalid
dates (like February 30th), but provides a good first level of validation.

## Using asMatchPredicate in Collections

This example shows how asMatchPredicate can be used with collection
operations to count or extract elements that match specific patterns.

CollectionOperationsExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectionOperationsExample {
    
    public static void main(String[] args) {
        Pattern hexPattern = Pattern.compile("^#[0-9a-fA-F]{6}$");
        Pattern rgbPattern = Pattern.compile("^rgb\\(\\d{1,3}, \\d{1,3}, \\d{1,3}\\)$");
        
        List&lt;String&gt; colorFormats = List.of(
            "#FF0000", "rgb(255, 0, 0)", "#00FF00", "invalid", "rgb(300, 0, 0)");
            
        long hexCount = colorFormats.stream()
            .filter(hexPattern.asMatchPredicate())
            .count();
            
        Map&lt;Boolean, List&lt;String&gt;&gt; partitioned = colorFormats.stream()
            .collect(Collectors.partitioningBy(rgbPattern.asMatchPredicate()));
            
        System.out.println("Hex color count: " + hexCount);
        System.out.println("Partitioned by RGB format: " + partitioned);
    }
}

This example counts how many strings match the hex color format and partitions
the list into those that match and don't match the RGB format. The
asMatchPredicate method enables these concise and readable
collection operations.

## Source

[Java Pattern.asMatchPredicate Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html#asMatchPredicate())

The Pattern.asMatchPredicate method provides a powerful bridge
between regular expressions and Java's functional programming features. By
converting patterns into predicates, it enables cleaner, more expressive code
for string validation and filtering operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).