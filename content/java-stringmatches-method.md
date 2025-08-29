+++
title = "Java String.matches Method"
date = 2025-08-29T20:00:25.492+01:00
draft = false
description = "Complete Java String.matches method tutorial covering all usage with examples. Learn about regular expressions in Java strings."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String.matches Method

Last modified: April 20, 2025

 

The String.matches method in Java checks if a string matches a
given regular expression. It provides a convenient way to perform pattern
matching without explicitly creating Pattern and Matcher objects.

This method returns true if the entire string matches the regex
pattern, and false otherwise. It internally uses the
Pattern.matches method, compiling the regex each time it's called.

## String.matches Method Overview

The matches method is defined in the String class.
It takes a single String parameter representing the regular expression pattern.
The method returns a boolean indicating whether the string matches the pattern.

For performance-critical applications where the same regex is used repeatedly,
it's better to compile the pattern once using Pattern.compile.
The matches method is ideal for one-off pattern matching tasks.

## Basic String Matching

The simplest use of matches checks if a string conforms to a
pattern. The example below demonstrates basic matching with different patterns.
Note that the entire string must match the pattern for the method to return true.

BasicMatches.java
  

package com.zetcode;

public class BasicMatches {

    public static void main(String[] args) {
        String text = "Hello123";
        
        // Check if string contains only letters
        System.out.println("Only letters: " + text.matches("[A-Za-z]+"));
        
        // Check if string contains letters followed by digits
        System.out.println("Letters then digits: " + 
            text.matches("[A-Za-z]+\\d+"));
        
        // Check if string starts with 'Hello'
        System.out.println("Starts with Hello: " + 
            text.matches("Hello.*"));
    }
}

In this example, we test three different patterns against the same string. The
first pattern checks for letters only, which fails because of the digits. The
second pattern succeeds as it matches letters followed by digits. The third
checks for a specific prefix.

## Email Validation

A common use of matches is validating email addresses. While
email validation can be complex, this example shows a basic pattern that catches
most valid email formats. The pattern checks for proper structure and characters.

EmailValidation.java
  

package com.zetcode;

public class EmailValidation {

    public static void main(String[] args) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        
        String email1 = "user@example.com";
        String email2 = "invalid.email@";
        String email3 = "another.user@test.org";
        
        System.out.println(email1 + " valid: " + email1.matches(emailRegex));
        System.out.println(email2 + " valid: " + email2.matches(emailRegex));
        System.out.println(email3 + " valid: " + email3.matches(emailRegex));
    }
}

This example demonstrates email validation using a simplified regex pattern. The
pattern checks for alphanumeric characters before the @ symbol and a valid domain
after. Note that this is a basic pattern and might not catch all edge cases in
email addresses.

## Password Strength Check

The matches method can enforce password policies. This example
checks for passwords with at least 8 characters, containing uppercase, lowercase,
digits, and special characters. The regex uses positive lookaheads to verify each
requirement.

PasswordCheck.java
  

package com.zetcode;

public class PasswordCheck {

    public static void main(String[] args) {
        String passwordRegex = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)" +
                              "(?=.*[@#$%^&amp;+=!])(?=\\S+$).{8,}$";
        
        String pass1 = "Weakpass1";
        String pass2 = "Strong@Pass123";
        String pass3 = "noSpecialChars123";
        
        System.out.println(pass1 + " valid: " + pass1.matches(passwordRegex));
        System.out.println(pass2 + " valid: " + pass2.matches(passwordRegex));
        System.out.println(pass3 + " valid: " + pass3.matches(passwordRegex));
    }
}

The regex pattern uses lookaheads to ensure each character type requirement is
met. The (?=.*[A-Z]) checks for at least one uppercase letter,
while (?=\S+$) ensures no whitespace. The final .{8,}
requires a minimum length of 8 characters.

## Date Format Validation

Validating date formats is another practical use of matches. This
example checks for dates in YYYY-MM-DD format. The pattern verifies proper digit
ranges for months and days while allowing for optional leading zeros.

DateValidation.java
  

package com.zetcode;

public class DateValidation {

    public static void main(String[] args) {
        String dateRegex = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
        
        String date1 = "2023-05-15";
        String date2 = "1999-12-31";
        String date3 = "2023-13-01"; // Invalid month
        
        System.out.println(date1 + " valid: " + date1.matches(dateRegex));
        System.out.println(date2 + " valid: " + date2.matches(dateRegex));
        System.out.println(date3 + " valid: " + date3.matches(dateRegex));
    }
}

The regex pattern \d{4} matches exactly four digits for the year.
The month part (0[1-9]|1[0-2]) allows 01-12. The day part
(0[1-9]|[12][0-9]|3[01]) permits 01-31. Note this doesn't validate
actual calendar dates (like February 30th).

## Phone Number Validation

Phone number validation demonstrates handling different formats. This example
accepts numbers with optional country codes and various separator characters.
The pattern is flexible enough to match common phone number formats.

PhoneValidation.java
  

package com.zetcode;

public class PhoneValidation {

    public static void main(String[] args) {
        String phoneRegex = "^(\\+\\d{1,3}[- ]?)?(\\(\\d{3}\\)|\\d{3})" +
                            "[- ]?\\d{3}[- ]?\\d{4}$";
        
        String phone1 = "+1 (123) 456-7890";
        String phone2 = "123-456-7890";
        String phone3 = "1234567890";
        String phone4 = "+44 123 456 7890";
        
        System.out.println(phone1 + " valid: " + phone1.matches(phoneRegex));
        System.out.println(phone2 + " valid: " + phone2.matches(phoneRegex));
        System.out.println(phone3 + " valid: " + phone3.matches(phoneRegex));
        System.out.println(phone4 + " valid: " + phone4.matches(phoneRegex));
    }
}

The pattern starts with an optional country code (\+\d{1,3}). The
main number can be in parentheses or plain digits. Separators between digit
groups can be spaces or hyphens. The regex ensures proper digit counts while
allowing formatting flexibility.

## Hexadecimal Color Code Validation

This example validates hexadecimal color codes used in web development. The
pattern matches both 3-digit and 6-digit formats with optional # prefix. Case
insensitivity is handled by including both uppercase and lowercase letters.

ColorValidation.java
  

package com.zetcode;

public class ColorValidation {

    public static void main(String[] args) {
        String colorRegex = "^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
        
        String color1 = "#a1b2c3";
        String color2 = "FF00FF";
        String color3 = "#abc";
        String color4 = "ZZZZZZ"; // Invalid
        
        System.out.println(color1 + " valid: " + color1.matches(colorRegex));
        System.out.println(color2 + " valid: " + color2.matches(colorRegex));
        System.out.println(color3 + " valid: " + color3.matches(colorRegex));
        System.out.println(color4 + " valid: " + color4.matches(colorRegex));
    }
}

The pattern [A-Fa-f0-9]{6} matches exactly six hexadecimal digits.
The alternative [A-Fa-f0-9]{3} matches three digits (shorthand
notation). The # is optional. This covers standard web color codes
while rejecting invalid characters.

## Username Validation

Username validation typically restricts allowed characters and length. This
example enforces common rules: 4-20 characters, starting with a letter, and
containing only letters, numbers, underscores, or hyphens.

UsernameValidation.java
  

package com.zetcode;

public class UsernameValidation {

    public static void main(String[] args) {
        String userRegex = "^[A-Za-z][A-Za-z0-9_-]{3,19}$";
        
        String user1 = "john_doe123";
        String user2 = "admin";
        String user3 = "1invalid";
        String user4 = "thisusernameistoolongtobevalid";
        
        System.out.println(user1 + " valid: " + user1.matches(userRegex));
        System.out.println(user2 + " valid: " + user2.matches(userRegex));
        System.out.println(user3 + " valid: " + user3.matches(userRegex));
        System.out.println(user4 + " valid: " + user4.matches(userRegex));
    }
}

The pattern ^[A-Za-z] ensures the username starts with a letter.
[A-Za-z0-9_-]{3,19} allows 3-19 additional characters (making total
length 4-20). The example shows valid and invalid cases, including one that's
too long and one starting with a digit.

## Source

[Java String.matches Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#matches-java.lang.String-)

This tutorial covered the essential uses of Java's String.matches
method. From basic pattern matching to complex validations, this method provides
a straightforward way to work with regular expressions in string processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).