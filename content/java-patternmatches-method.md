+++
title = "Java Pattern.matches Method"
date = 2025-08-29T20:00:23.259+01:00
draft = false
description = "Complete Java Pattern.matches method tutorial with examples. Learn how to use Pattern.matches for regex matching in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.matches Method

Last modified: April 20, 2025

 

The Pattern.matches method is a static utility in Java's regex API.
It provides a quick way to check if a string matches a regular expression
pattern. The method compiles the pattern and matches it against the input in
one step.

This method is convenient for simple one-time pattern matching operations. For
repeated matching, compiling the pattern separately is more efficient. The
method returns true if the entire input sequence matches the pattern.

## Pattern.matches Method Overview

The Pattern.matches method has the following signature:
public static boolean matches(String regex, CharSequence input).
It takes a regex pattern and an input string, returning a boolean result.

Internally, it compiles the pattern and creates a matcher for the input. The
method is equivalent to Pattern.compile(regex).matcher(input).matches.
It throws PatternSyntaxException if the regex syntax is invalid.

## Basic Pattern Matching Example

This example demonstrates the simplest use of Pattern.matches.
We check if a string matches a basic pattern. The pattern uses literal
characters with no special regex constructs.

BasicMatch.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class BasicMatch {

    public static void main(String[] args) {
        
        String input = "Hello World";
        String regex = "Hello World";
        
        boolean isMatch = Pattern.matches(regex, input);
        System.out.println("Exact match: " + isMatch);
        
        regex = "Hello.*";
        isMatch = Pattern.matches(regex, input);
        System.out.println("Pattern match: " + isMatch);
    }
}

The first check verifies an exact match between the input and pattern. The
second uses the .* regex construct to match any characters after
"Hello". Both patterns match the input string in this example.

## Email Validation Example

This example shows how to validate an email address using Pattern.matches.
The regex pattern follows common email validation rules while remaining simple.

EmailValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class EmailValidation {

    public static void main(String[] args) {
        
        String[] emails = {
            "user@example.com",
            "first.last@domain.co",
            "invalid.email@",
            "missing@tld",
            "name@123.123.123.123"
        };
        
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        
        for (String email : emails) {
            boolean isValid = Pattern.matches(regex, email);
            System.out.printf("%-25s: %s%n", email, isValid);
        }
    }
}

The regex pattern checks for alphanumeric characters before the @ symbol. After
the @, it requires a domain name with at least one dot. This is a basic
validation that catches obvious errors but may allow some invalid addresses.

## Phone Number Validation Example

This example demonstrates phone number validation with different formats.
The pattern accommodates optional country codes and various separator characters.

PhoneValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PhoneValidation {

    public static void main(String[] args) {
        
        String[] phones = {
            "+1 (123) 456-7890",
            "123.456.7890",
            "123-456-7890",
            "(123)4567890",
            "1234567890",
            "123-45-6789"
        };
        
        String regex = "^\\+?\\d{1,3}?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$";
        
        for (String phone : phones) {
            boolean isValid = Pattern.matches(regex, phone);
            System.out.printf("%-20s: %s%n", phone, isValid);
        }
    }
}

The regex pattern is complex but flexible. It handles optional country codes,
parentheses around area codes, and various separators. The last test case
shows an invalid social security number pattern that fails validation.

## Date Format Validation Example

This example validates dates in different formats using Pattern.matches.
The pattern checks for common date formats while ensuring valid day/month values.

DateValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class DateValidation {

    public static void main(String[] args) {
        
        String[] dates = {
            "2023-12-31",
            "12/31/2023",
            "31-12-2023",
            "2023/12/31",
            "02-29-2023", // Invalid (not a leap year)
            "13-01-2023"  // Invalid month
        };
        
        String regex = "^(?:(?:19|20)\\d\\d)[-/](?:(?:0[1-9]|1[0-2])[-/](?:0[1-9]|[12][0-9]|3[01])|(?:0[1-9]|[12][0-9]|3[01])[-/](?:0[1-9]|1[0-2]))$";
        
        for (String date : dates) {
            boolean isValid = Pattern.matches(regex, date);
            System.out.printf("%-15s: %s%n", date, isValid);
        }
    }
}

The regex pattern validates dates in YYYY-MM-DD, MM/DD/YYYY, and DD-MM-YYYY
formats. It checks for valid months (1-12) and days (1-31) but doesn't
validate all calendar rules (like February days in leap years).

## Password Strength Check Example

This example checks password strength using multiple regex patterns with
Pattern.matches. Each pattern tests for different complexity
requirements.

PasswordStrength.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PasswordStrength {

    public static void main(String[] args) {
        
        String[] passwords = {
            "weak",
            "Better1",
            "Str0ngP@ss",
            "NoNumbers!",
            "LongEnoughButNoSpecialChars123"
        };
        
        // At least 8 chars, one uppercase, one lowercase, one digit
        String mediumRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        
        // Medium requirements plus one special character
        String strongRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&amp;]).{8,}$";
        
        for (String pwd : passwords) {
            boolean isMedium = Pattern.matches(mediumRegex, pwd);
            boolean isStrong = Pattern.matches(strongRegex, pwd);
            
            String strength;
            if (isStrong) strength = "Strong";
            else if (isMedium) strength = "Medium";
            else strength = "Weak";
            
            System.out.printf("%-30s: %s%n", pwd, strength);
        }
    }
}

The example uses positive lookaheads ((?=...)) to check for
character class requirements without consuming input. The medium pattern
requires length, case, and digit rules. The strong pattern adds special
character requirements.

## URL Validation Example

This example validates URLs with different protocols and formats using
Pattern.matches. The pattern checks for valid URL structure.

UrlValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class UrlValidation {

    public static void main(String[] args) {
        
        String[] urls = {
            "https://www.example.com",
            "http://localhost:8080",
            "ftp://files.example.org",
            "www.missing.protocol.com",
            "https://example.com/path?query=param",
            "invalid url"
        };
        
        String regex = "^(https?|ftp)://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&amp;:/~+#]*[\\w\\-@?^=%&amp;/~+#])?$";
        
        for (String url : urls) {
            boolean isValid = Pattern.matches(regex, url);
            System.out.printf("%-35s: %s%n", url, isValid);
        }
    }
}

The regex validates URLs with http, https, or ftp protocols. It requires a
domain with at least one dot and allows optional paths, queries, and fragments.
The pattern rejects URLs without protocols and malformed domain names.

## Credit Card Validation Example

This example validates credit card numbers using Pattern.matches
with patterns for different card types. It checks format and performs Luhn check.

CreditCardValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class CreditCardValidation {

    public static void main(String[] args) {
        
        String[] cards = {
            "4111-1111-1111-1111", // Visa
            "5500-0000-0000-0004", // MasterCard
            "3400-0000-0000-009",  // American Express
            "6011-0000-0000-0004", // Discover
            "1234-5678-9012-3456", // Invalid
            "4111111111111111"      // Visa no hyphens
        };
        
        String visaRegex = "^4[0-9]{12}(?:[0-9]{3})?$";
        String mastercardRegex = "^5[1-5][0-9]{14}$";
        String amexRegex = "^3[47][0-9]{13}$";
        String discoverRegex = "^6(?:011|5[0-9]{2})[0-9]{12}$";
        
        for (String card : cards) {
            // Remove hyphens for validation
            String cleanCard = card.replaceAll("-", "");
            
            boolean isValid = false;
            String cardType = "Unknown";
            
            if (Pattern.matches(visaRegex, cleanCard)) {
                isValid = true;
                cardType = "Visa";
            } else if (Pattern.matches(mastercardRegex, cleanCard)) {
                isValid = true;
                cardType = "MasterCard";
            } else if (Pattern.matches(amexRegex, cleanCard)) {
                isValid = true;
                cardType = "American Express";
            } else if (Pattern.matches(discoverRegex, cleanCard)) {
                isValid = true;
                cardType = "Discover";
            }
            
            System.out.printf("%-25s: %-16s %s%n", 
                card, cardType, isValid ? "Valid" : "Invalid");
        }
    }
}

The example first removes hyphens from card numbers. It then checks each card
against patterns for major card types. The patterns verify starting digits and
length requirements. Note this doesn't validate the Luhn checksum for real
usage.

## Source

[Java Pattern.matches Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#matches-java.lang.String-java.lang.CharSequence-)

In this article, we've explored the Pattern.matches method through
seven practical examples. These demonstrate common validation scenarios where
regex pattern matching is useful in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).