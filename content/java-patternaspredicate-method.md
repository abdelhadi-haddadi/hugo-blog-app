+++
title = "Java Pattern.asPredicate Method"
date = 2025-08-29T20:00:21.005+01:00
draft = false
description = "Complete Java Pattern.asPredicate tutorial with examples. Learn how to use regex patterns as predicates in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.asPredicate Method

Last modified: April 20, 2025

 

The Pattern.asPredicate method was introduced in Java 8 as part of
the java.util.regex.Pattern class. It converts a compiled regex
pattern into a Predicate&lt;String&gt; for functional-style
operations. This method is particularly useful when working with Java Streams.

The returned predicate tests whether the input string contains a match for the
pattern. This is equivalent to calling matcher(input).find on
the pattern. The predicate can be used anywhere a Predicate&lt;String&gt;
is expected.

## Basic Definitions

A Predicate in Java is a functional interface that represents a
boolean-valued function of one argument. It's commonly used for filtering
operations. The Pattern class represents a compiled regular
expression.

asPredicate bridges these concepts by creating a predicate that
tests strings against the pattern. The method requires the pattern to be
compiled first. The resulting predicate is thread-safe and can be reused.

## Basic asPredicate Example

This example demonstrates the simplest usage of asPredicate. We
create a pattern for email validation and use it as a predicate to test strings.

BasicPredicateExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class BasicPredicateExample {

    public static void main(String[] args) {
        Pattern emailPattern = Pattern.compile("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$");
        Predicate&lt;String&gt; emailPredicate = emailPattern.asPredicate();
        
        System.out.println("test@example.com: " + emailPredicate.test("test@example.com"));
        System.out.println("invalid.email: " + emailPredicate.test("invalid.email"));
    }
}

In this example, we compile an email regex pattern and convert it to a predicate.
The predicate's test method checks if the input string contains a
match for the pattern. The first test returns true, while the second returns
false.

## Filtering Stream with asPredicate

One of the most powerful uses of asPredicate is filtering streams.
This example shows how to filter a list of strings to only include valid phone
numbers.

StreamFilterExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.List;
import java.util.stream.Collectors;

public class StreamFilterExample {
    public static void main(String[] args) {
        Pattern phonePattern = Pattern.compile("^\\+?[0-9]{10,15}$");
        List&lt;String&gt; contacts = List.of(
            "+1234567890", "invalid", "9876543210", "123-456-7890"
        );
        
        List&lt;String&gt; validPhones = contacts.stream()
            .filter(phonePattern.asPredicate())
            .collect(Collectors.toList());
            
        System.out.println("Valid phone numbers: " + validPhones);
    }
}

Here we create a stream from a list of strings and filter it using our pattern
predicate. Only strings matching the phone number pattern pass through the
filter. The result contains just the valid phone numbers from the original list.

## Combining Predicates

asPredicate can be combined with other predicates using the
Predicate interface's default methods. This example shows how to
create complex validation logic.

CombinedPredicatesExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class CombinedPredicatesExample {

    public static void main(String[] args) {
        Pattern uppercasePattern = Pattern.compile("[A-Z]");
        Pattern digitPattern = Pattern.compile("[0-9]");
        
        Predicate&lt;String&gt; hasUppercase = uppercasePattern.asPredicate();
        Predicate&lt;String&gt; hasDigit = digitPattern.asPredicate();
        
        Predicate&lt;String&gt; isStrongPassword = hasUppercase.and(hasDigit)
            .and(s -&gt; s.length() &gt;=  8);
            
        System.out.println("Password1: " + isStrongPassword.test("Password1"));
        System.out.println("weakpass: " + isStrongPassword.test("weakpass"));
    }
}

We create two pattern predicates checking for uppercase letters and digits. We
then combine them with a length check using and. The resulting
predicate only returns true for strings that satisfy all three conditions.

## Case-Insensitive Predicate

This example demonstrates how to create a case-insensitive predicate using
pattern flags. The predicate will match regardless of letter case.

CaseInsensitivePredicate.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.stream.Stream;

public class CaseInsensitivePredicate {

    public static void main(String[] args) {
        Pattern namePattern = Pattern.compile("john", Pattern.CASE_INSENSITIVE);
        
        Stream.of("John", "JOHN", "john", "Jane")
            .filter(namePattern.asPredicate())
            .forEach(System.out::println);
    }
}

The CASE_INSENSITIVE flag makes the pattern match regardless of
case. The predicate will match all variations of "john" in different cases but
not other names. All three case variations of "john" are printed.

## asPredicate vs asMatchPredicate

Java 11 introduced asMatchPredicate which differs from
asPredicate in matching behavior. This example compares both.

PredicateComparison.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PredicateComparison {

    public static void main(String[] args) {
        Pattern wordPattern = Pattern.compile("hello");
        
        String input1 = "hello";
        String input2 = "hello there";
        
        System.out.println("asPredicate:");
        System.out.println(input1 + ": " + wordPattern.asPredicate().test(input1));
        System.out.println(input2 + ": " + wordPattern.asPredicate().test(input2));
        
        System.out.println("\nasMatchPredicate:");
        System.out.println(input1 + ": " + wordPattern.asMatchPredicate().test(input1));
        System.out.println(input2 + ": " + wordPattern.asMatchPredicate().test(input2));
    }
}

asPredicate acts like find, matching anywhere in the
string. asMatchPredicate acts like matches, requiring
the entire string to match. Both inputs match with asPredicate, but
only the exact match works with asMatchPredicate.

## Using Predicate in Collections

This example shows how to use a pattern predicate with collection operations
like removeIf. We'll remove all invalid IDs from a list.

CollectionRemoveExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;

public class CollectionRemoveExample {

    public static void main(String[] args) {

        Pattern idPattern = Pattern.compile("^[A-Z]{2}[0-9]{4}$");
        List&lt;String&gt; ids = new ArrayList&lt;&gt;(List.of(
            "AB1234", "INVALID", "CD5678", "XY90", "EF9012"
        ));
        
        ids.removeIf(idPattern.asPredicate().negate());
        System.out.println("Valid IDs: " + ids);
    }
}

We create a predicate for valid IDs (2 letters followed by 4 digits) and use
removeIf with the negated predicate to remove invalid entries. The
negate method inverts the predicate's logic. Only valid IDs
remain in the list.

## Complex Validation with Predicate

For more complex validation, we can chain multiple pattern predicates. This
example validates product codes with specific format requirements.

ComplexValidationExample.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.function.Predicate;

public class ComplexValidationExample {

    public static void main(String[] args) {
        Pattern startsWithLetter = Pattern.compile("^[A-Z]");
        Pattern containsDigit = Pattern.compile("[0-9]");
        Pattern endsWithLetter = Pattern.compile("[A-Z]$");
        
        Predicate&lt;String&gt; isValidProductCode = startsWithLetter.asPredicate()
            .and(containsDigit.asPredicate())
            .and(endsWithLetter.asPredicate())
            .and(s -&gt; s.length() &gt;=  5 &amp;&amp;  s.length() &lt;=  10);
            
        System.out.println("A123B: " + isValidProductCode.test("A123B"));
        System.out.println("1ABC: " + isValidProductCode.test("1ABC"));
        System.out.println("AB1234567C: " + isValidProductCode.test("AB1234567C"));
    }
}

We combine three pattern predicates with a length check to validate product
codes. The code must start and end with a letter, contain at least one digit,
and be 5-10 characters long. Only strings meeting all criteria pass validation.

## Source

[Java Pattern.asPredicate Documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html#asPredicate())

The Pattern.asPredicate method provides a powerful way to integrate
regex pattern matching with Java's functional programming features. It's
particularly useful for filtering and validation tasks in modern Java code.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).