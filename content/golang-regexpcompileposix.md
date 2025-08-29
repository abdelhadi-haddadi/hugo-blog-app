+++
title = "Golang regexp.CompilePOSIX"
date = 2025-08-29T19:55:36.931+01:00
draft = false
description = "Learn how to compile POSIX regular expressions in Go. Includes examples and usage of POSIX regex."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang regexp.CompilePOSIX

last modified April 20, 2025

This tutorial explains how to use the regexp.CompilePOSIX function in Go.
We'll cover POSIX regular expression basics and provide practical examples.

A POSIX regular expression is a standardized pattern matching syntax.
It differs from Perl-style regex in some matching behaviors and features.

The regexp.CompilePOSIX function compiles a POSIX regular expression.
It guarantees leftmost-longest matching, unlike regexp.Compile.

## Basic regexp.CompilePOSIX Example

This simple example demonstrates basic pattern matching with POSIX regex.
The leftmost-longest match behavior is shown here.

basic_posix.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re, err := regexp.CompilePOSIX(`a+`)
    if err != nil {
        panic(err)
    }

    // Shows leftmost-longest match behavior
    fmt.Println(re.FindString("aa aaaa a")) // "aa"
}

The pattern matches one or more 'a' characters. POSIX regex finds the leftmost
then longest match, unlike Perl-style which is greedy.

## POSIX vs Perl-style Matching

This example contrasts POSIX and Perl-style regex matching behaviors.
The difference in alternation handling is demonstrated.

posix_vs_perl.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "abc def ghi"

    perlRe := regexp.MustCompile(`abc|abcdef`)
    posixRe := regexp.MustCompilePOSIX(`abc|abcdef`)

    fmt.Println("Perl-style:", perlRe.FindString(text))  // "abc"
    fmt.Println("POSIX:", posixRe.FindString(text))      // "abc"
    
    // With different input showing the difference
    text2 := "abcdef"
    fmt.Println("Perl-style:", perlRe.FindString(text2)) // "abc"
    fmt.Println("POSIX:", posixRe.FindString(text2))     // "abcdef"
}

POSIX regex will prefer the longer match when alternatives start at the same
position. Perl-style takes the first matching alternative.

## Matching Phone Numbers

POSIX regex can validate phone numbers with a specific pattern.
This example shows North American number format matching.

phone_posix.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `^\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$`
    re, err := regexp.CompilePOSIX(pattern)
    if err != nil {
        panic(err)
    }

    phones := []string{
        "123-456-7890",
        "(123) 456-7890",
        "123.456.7890",
        "1234567890",
        "invalid",
    }

    for _, phone := range phones {
        if re.MatchString(phone) {
            fmt.Printf("%s is valid\n", phone)
        } else {
            fmt.Printf("%s is invalid\n", phone)
        }
    }
}

The pattern matches various phone number formats. POSIX ensures consistent
matching behavior across different implementations.

## Extracting Words with POSIX

This example extracts words from text using POSIX word boundaries.
It demonstrates the POSIX character class syntax.

extract_words.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompilePOSIX(`[[:alpha:]]+`)
    text := "The quick brown fox jumps over 42 lazy dogs."

    words := re.FindAllString(text, -1)
    for _, word := range words {
        fmt.Println(word)
    }
}

The [[:alpha:]] POSIX character class matches alphabetic characters.
This is more portable than \w across different regex engines.

## POSIX Character Classes

POSIX defines specific character classes that are more standardized.
This example demonstrates several important POSIX classes.

posix_classes.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Sample123 Text456 With789 Numbers0"

    // Match alphabetic characters only
    alphaRe := regexp.MustCompilePOSIX(`[[:alpha:]]+`)
    // Match alphanumeric characters
    alnumRe := regexp.MustCompilePOSIX(`[[:alnum:]]+`)
    // Match digits only
    digitRe := regexp.MustCompilePOSIX(`[[:digit:]]+`)

    fmt.Println("Alpha:", alphaRe.FindAllString(text, -1))
    fmt.Println("Alnum:", alnumRe.FindAllString(text, -1))
    fmt.Println("Digit:", digitRe.FindAllString(text, -1))
}

POSIX character classes like [[:alpha:]] are more readable and
portable than shorthand classes like \w or \d.

## POSIX Email Validation

Email validation with POSIX regex shows the standardized approach.
This pattern uses POSIX character classes for better portability.

posix_email.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `^[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}$`
    re, err := regexp.CompilePOSIX(pattern)
    if err != nil {
        panic(err)
    }

    emails := []string{
        "user@example.com",
        "first.last@domain.co.uk",
        "invalid@.com",
        "missing@tld.",
    }

    for _, email := range emails {
        if re.MatchString(email) {
            fmt.Printf("%s is valid\n", email)
        } else {
            fmt.Printf("%s is invalid\n", email)
        }
    }
}

The pattern uses POSIX character classes instead of Perl-style shortcuts.
This makes the pattern more readable and standards-compliant.

## Performance Comparison

POSIX regex compilation may have different performance characteristics.
This example compares Compile and CompilePOSIX execution times.

posix_performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    pattern := `([[:alnum:]]+)@([[:alnum:]]+)\.([[:alpha:]]{2,})`
    text := "user@example.com"

    start := time.Now()
    for i := 0; i &lt; 1000; i++ {
        re, _ := regexp.Compile(pattern)
        re.MatchString(text)
    }
    fmt.Println("Perl-style compile:", time.Since(start))

    start = time.Now()
    for i := 0; i &lt; 1000; i++ {
        re, _ := regexp.CompilePOSIX(pattern)
        re.MatchString(text)
    }
    fmt.Println("POSIX compile:", time.Since(start))
}

POSIX regex compilation may be slightly slower due to its different matching
algorithm. The difference is usually negligible for most use cases.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the regexp.CompilePOSIX function in Go with
examples of POSIX regular expression usage and behavior.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).