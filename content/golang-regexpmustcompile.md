+++
title = "Golang regexp.MustCompile"
date = 2025-08-29T19:55:44.751+01:00
draft = false
description = "Learn how to use MustCompile for regular expressions in Go. Includes examples of regex compilation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang regexp.MustCompile

last modified April 20, 2025

This tutorial explains how to use the regexp.MustCompile function in Go.
We'll cover regular expression basics and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The regexp.MustCompile function compiles a regular expression pattern
into a reusable Regexp object. It panics if the pattern is invalid.

## Basic regexp.MustCompile Example

The simplest use of regexp.MustCompile checks if a string matches a
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
}

We compile the pattern "hello" with MustCompile and use
MatchString to test strings. The function returns true if the
pattern is found.

## Validating Email Addresses

A common use case is validating email addresses. This example shows a basic
email pattern matcher using MustCompile.

email_match.go
  

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

The pattern matches standard email formats. Note that MustCompile
will panic if the pattern is invalid, unlike Compile.

## Extracting Submatches

regexp.MustCompile can extract parts of matched strings. Here we
extract date components from a formatted string.

submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    date := "2025-04-20"

    matches := re.FindStringSubmatch(date)
    if matches != nil {
        fmt.Println("Year:", matches[1])
        fmt.Println("Month:", matches[2])
        fmt.Println("Day:", matches[3])
    }
}

We use parentheses to create capture groups. FindStringSubmatch
returns all matches, with the full match at index 0 and groups after.

## Replacing Text with Regex

Compiled regex patterns can be used for search-and-replace operations. This
example demonstrates simple text replacement.

replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b(\w+)\s+\1\b`)
    text := "This is is a test test sentence."

    result := re.ReplaceAllString(text, "$1")
    fmt.Println(result)
}

The pattern finds consecutive duplicate words. The replacement keeps just one
instance of each duplicated word using the backreference $1.

## Splitting Strings with Regex

Regex patterns can split strings more flexibly than strings.Split.
Here we split on multiple delimiters.

split.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[,;]\s*`)
    text := "apple,banana; cherry,  date;elderberry"

    parts := re.Split(text, -1)
    for _, part := range parts {
        fmt.Println(part)
    }
}

The pattern matches commas or semicolons followed by optional whitespace.
Split divides the string at each match.

## MustCompile vs Compile

Go provides two compilation functions. MustCompile panics on
invalid patterns while Compile returns an error.

must_vs_regular.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Safe with MustCompile when pattern is known good
    re1 := regexp.MustCompile(`valid`)
    fmt.Println(re1.MatchString("valid pattern"))

    // Compile is safer for dynamic patterns
    re2, err := regexp.Compile(`valid`)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(re2.MatchString("valid pattern"))
}

MustCompile is preferred for static patterns known at compile time.
Use Compile when processing user-supplied patterns.

## Global Regexp Objects

For better performance, compile regex patterns once and reuse them. Global
variables are ideal for this.

global_regex.go
  

package main

import (
    "fmt"
    "regexp"
)

var dateRe = regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)

func main() {
    dates := []string{
        "2025-04-20",
        "2023-12-25",
        "invalid-date",
    }

    for _, date := range dates {
        if dateRe.MatchString(date) {
            fmt.Printf("%s is valid\n", date)
        } else {
            fmt.Printf("%s is invalid\n", date)
        }
    }
}

The global dateRe is compiled once at program start. This avoids
recompiling the pattern for each function call.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the regexp.MustCompile function in Go with
practical examples of pattern matching and text manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).