+++
title = "Golang Regexp.MatchString"
date = 2025-08-29T19:55:44.732+01:00
draft = false
description = "Learn how to match strings using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.MatchString

last modified April 20, 2025

This tutorial explains how to use the Regexp.MatchString method in Go.
We'll cover basic usage and provide practical examples of pattern matching.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.MatchString method reports whether a compiled regular
expression matches a string. It returns true if the pattern is found.

## Basic MatchString Example

The simplest use of MatchString checks if a string contains a
pattern. Here we check for a simple word match.

basic_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re := regexp.MustCompile(`hello`)
    
    fmt.Println(re.MatchString("hello there")) // true
    fmt.Println(re.MatchString("goodbye"))     // false
    fmt.Println(re.MatchString("HELLO"))      // false
}

We compile the pattern "hello" and use MatchString to test strings.
The method returns true only for exact case-sensitive matches.

## Case Insensitive Matching

To perform case-insensitive matching, we can modify our regular expression.
This example shows how to match regardless of letter case.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)hello`)
    
    fmt.Println(re.MatchString("hello there")) // true
    fmt.Println(re.MatchString("HELLO"))      // true
    fmt.Println(re.MatchString("hElLo"))      // true
}

The (?i) flag makes the pattern case-insensitive. This allows
matching any variation of uppercase and lowercase letters.

## Matching Numbers

MatchString can verify if a string contains numeric patterns.
Here we check for strings with digits.

numbers_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    
    inputs := []string{"123", "abc", "45.67", "text123text"}
    
    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("'%s' contains numbers\n", input)
        } else {
            fmt.Printf("'%s' doesn't contain numbers\n", input)
        }
    }
}

The pattern \d+ matches one or more digits. The method returns true
for any string containing at least one digit.

## Validating Email Format

A common use case is validating email formats. This example shows a basic
email pattern checker.

email_validation.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
    re := regexp.MustCompile(pattern)
    
    emails := []string{
        "user@example.com",
        "invalid.email",
        "another.user@domain.co.uk",
    }
    
    for _, email := range emails {
        if re.MatchString(email) {
            fmt.Printf("%s is valid\n", email)
        } else {
            fmt.Printf("%s is invalid\n", email)
        }
    }
}

The pattern matches standard email formats. Note that complete email validation
requires more complex patterns for full RFC compliance.

## Checking for Special Characters

We can use MatchString to check if a string contains special
characters. This example looks for non-alphanumeric characters.

special_chars.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[^a-zA-Z0-9]`)
    
    inputs := []string{"safeText", "text-with-dash", "text!with!exclamation"}
    
    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("'%s' contains special chars\n", input)
        } else {
            fmt.Printf("'%s' contains only alphanumeric\n", input)
        }
    }
}

The pattern [^a-zA-Z0-9] matches any character that's not a letter
or digit. This helps identify strings with special characters.

## Matching Multiple Patterns

We can combine patterns to check for multiple conditions. This example verifies
password strength.

password_check.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    hasUpper := regexp.MustCompile(`[A-Z]`)
    hasLower := regexp.MustCompile(`[a-z]`)
    hasNumber := regexp.MustCompile(`[0-9]`)
    hasSpecial := regexp.MustCompile(`[^a-zA-Z0-9]`)
    
    password := "SecurePass123!"
    
    if !hasUpper.MatchString(password) {
        fmt.Println("Password needs uppercase letters")
    }
    if !hasLower.MatchString(password) {
        fmt.Println("Password needs lowercase letters")
    }
    if !hasNumber.MatchString(password) {
        fmt.Println("Password needs numbers")
    }
    if !hasSpecial.MatchString(password) {
        fmt.Println("Password needs special chars")
    }
    if len(password) &lt; 8 {
        fmt.Println("Password too short")
    }
}

We use multiple patterns to check different password requirements. Each condition
is verified separately with MatchString.

## Performance Considerations

Reusing compiled patterns improves performance. This example demonstrates the
benefit of compiling once.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    start := time.Now()
    
    // Bad: Compiling in loop
    for i := 0; i &lt; 1000; i++ {
        re, _ := regexp.Compile(`pattern`)
        re.MatchString("test")
    }
    fmt.Println("Loop compile:", time.Since(start))
    
    start = time.Now()
    // Good: Compile once
    re := regexp.MustCompile(`pattern`)
    for i := 0; i &lt; 1000; i++ {
        re.MatchString("test")
    }
    fmt.Println("Single compile:", time.Since(start))
}

The benchmark shows compiling once outside loops is much faster. Always reuse
compiled patterns when possible for better performance.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.MatchString method in Go with
practical examples of pattern matching and validation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).