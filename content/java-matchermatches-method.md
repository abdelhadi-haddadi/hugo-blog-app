+++
title = "Java Matcher.matches() Method"
date = 2025-08-29T20:00:14.191+01:00
draft = false
description = "Complete Java Matcher.matches() tutorial with examples. Learn about pattern matching in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.matches() Method

Last modified: April 20, 2025

 

The matches method of java.util.regex.Matcher class
attempts to match the entire input sequence against the pattern. It returns
true if the entire input sequence matches the pattern, false otherwise.

Unlike find which looks for partial matches,
matches requires the entire input to match the pattern. This
method is commonly used for validation tasks where complete pattern matching
is required.

## Basic Usage of matches()

The simplest way to use matches is with a compiled pattern and
input string. The method returns true only if the entire string matches the
regular expression pattern exactly.

BasicMatch.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class BasicMatch {

    public static void main(String[] args) {
        
        String input = "hello123";
        Pattern pattern = Pattern.compile("^[a-z]+\\d{3}$");
        Matcher matcher = pattern.matcher(input);
        
        boolean isMatch = matcher.matches();
        System.out.println("Does '" + input + "' match the pattern? " + isMatch);
        
        // Test another string
        input = "hello12";
        matcher = pattern.matcher(input);
        System.out.println("Does '" + input + "' match the pattern? " + matcher.matches());
    }
}

In this example, we create a pattern that expects lowercase letters followed
by exactly three digits. The first test string matches this pattern completely.
The second string fails because it only has two digits at the end.

## Email Validation with matches()

A common use case for matches is validating email addresses.
The method ensures the entire input conforms to the email pattern structure.

EmailValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class EmailValidation {

    public static void main(String[] args) {
        
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        
        String[] emails = {
            "user@example.com",
            "invalid.email",
            "another.user@test.org",
            "missing@dotcom"
        };
        
        for (String email : emails) {
            Matcher matcher = pattern.matcher(email);
            System.out.println(email + " is valid: " + matcher.matches());
        }
    }
}

This example demonstrates email validation using matches. The
regular expression checks for a basic email format. Only strings that completely
match the pattern from start to end will return true.

## Phone Number Formatting

matches can verify if phone numbers follow specific formatting
rules. This ensures consistent data entry by requiring exact pattern matches.

PhoneNumberCheck.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class PhoneNumberCheck {

    public static void main(String[] args) {
        
        String phoneRegex = "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$";
        Pattern pattern = Pattern.compile(phoneRegex);
        
        String[] phones = {
            "123-456-7890",
            "(123) 456-7890",
            "123.456.7890",
            "1234567890",
            "123-45-6789"
        };
        
        for (String phone : phones) {
            Matcher matcher = pattern.matcher(phone);
            System.out.println(phone + " is valid: " + matcher.matches());
        }
    }
}

The pattern accepts various common phone number formats. The last test case
fails because it doesn't match the expected 3-3-4 digit grouping pattern.
matches ensures the entire string conforms to the format.

## Password Strength Check

Using matches, we can enforce password policies by requiring
specific character combinations. This example checks for minimum strength
requirements.

PasswordStrength.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class PasswordStrength {

    public static void main(String[] args) {
        
        // At least 8 chars, one uppercase, one lowercase, one digit, one special
        String pwRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&amp;])[A-Za-z\\d@$!%*?&amp;]{8,}$";
        Pattern pattern = Pattern.compile(pwRegex);
        
        String[] passwords = {
            "StrongPass1!",
            "weakpass",
            "NoSpecialChar1",
            "short1!",
            "ALLUPPERCASE1!"
        };
        
        for (String pw : passwords) {
            Matcher matcher = pattern.matcher(pw);
            System.out.println(pw + " is strong: " + matcher.matches());
        }
    }
}

The regular expression uses positive lookaheads to enforce each requirement.
Only the first password meets all criteria. matches ensures the
entire password string complies with all rules.

## Date Format Validation

matches is ideal for validating date formats. This example checks
for ISO 8601 (YYYY-MM-DD) formatted dates while also validating the date values.

DateValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class DateValidation {

    public static void main(String[] args) {
        
        String dateRegex = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
        Pattern pattern = Pattern.compile(dateRegex);
        
        String[] dates = {
            "2023-05-15",
            "2023-13-01",  // Invalid month
            "2023-02-30",  // Invalid day for February
            "15-05-2023",  // Wrong format
            "2023-05-15T12:00:00"  // Includes time
        };
        
        for (String date : dates) {
            Matcher matcher = pattern.matcher(date);
            System.out.println(date + " is valid: " + matcher.matches());
        }
    }
}

The pattern validates the structure but doesn't check for all calendar rules.
Only the first date matches the pattern completely. Note that this doesn't
validate all possible invalid dates (like April 31).

## URL Validation

URL validation with matches ensures strings follow proper URL
formatting rules. This example checks for common URL patterns.

UrlValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class UrlValidation {

    public static void main(String[] args) {
        
        String urlRegex = "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$";
        Pattern pattern = Pattern.compile(urlRegex);
        
        String[] urls = {
            "http://example.com",
            "https://www.example.com/path",
            "ftp://files.example.com",
            "example.com",  // Missing protocol
            "http://example.com?query=test",
            "invalid url"
        };
        
        for (String url : urls) {
            Matcher matcher = pattern.matcher(url);
            System.out.println(url + " is valid: " + matcher.matches());
        }
    }
}

The regular expression checks for required URL components like protocol and
domain. Only complete URLs that match the pattern from start to end will
validate. The pattern could be enhanced for more specific requirements.

## Credit Card Number Validation

matches can validate credit card number formats while also
performing a Luhn check for basic validity. This combines pattern matching
with algorithmic validation.

CreditCardValidation.java
  

package com.zetcode;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class CreditCardValidation {

    public static void main(String[] args) {
        
        // Visa, MasterCard, Amex, Discover patterns
        String ccRegex = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|" +
                         "3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$";
        Pattern pattern = Pattern.compile(ccRegex);
        
        String[] cards = {
            "4111111111111111",  // Valid Visa
            "5500000000000004",  // Valid MasterCard
            "340000000000009",   // Valid Amex
            "1234567890123456",  // Invalid
            "6011000000000004",  // Valid Discover
            "378282246310005"    // Valid Amex
        };
        
        for (String card : cards) {
            Matcher matcher = pattern.matcher(card);
            System.out.println(card + " is valid format: " + matcher.matches());
        }
    }
}

This example checks for major credit card patterns. The regular expression
validates the format but doesn't verify the card's actual validity. For
production use, additional Luhn algorithm verification would be needed.

## Source

[Java Matcher.matches() Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#matches--)

In this tutorial, we've explored the matches method through
practical examples. This method is essential for complete pattern matching
validation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).