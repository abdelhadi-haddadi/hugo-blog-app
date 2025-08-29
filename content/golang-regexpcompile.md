+++
title = "Golang regexp.Compile"
date = 2025-08-29T19:55:36.967+01:00
draft = false
description = "Learn how to compile regular expressions in Go. Includes examples of regex compilation and usage."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang regexp.Compile

last modified April 20, 2025

This tutorial explains how to use the regexp.Compile function in Go.
We'll cover regular expression basics and provide practical examples.

A regular expression, often abbreviated as "regex" or "regexp," is a
powerful tool used in programming and text processing. It is a sequence of
characters that defines a specific search pattern, enabling you to perform
advanced string matching, validation, and manipulation tasks. 

Regular expressions can identify patterns such as repeated sequences, specific
formats (e.g., email addresses, phone numbers, or dates), or even specific
substrings based on complex criteria. They are an essential feature in many
programming languages and tools, as they allow developers to write concise and
efficient code for tasks that would otherwise require lengthy conditional
statements or loops. Their versatility makes them widely used in applications
such as input validation, data extraction, and syntax highlighting.

    

The regexp.Compile function, part of Go's standard
regexp package, is a key feature for working with regular
expressions in the Go programming language. It takes a regular expression
pattern as input and compiles it into a reusable Regexp object.
This compiled object serves as an efficient representation of the pattern,
allowing you to perform various matching operations, such as testing if a
string matches the pattern, finding specific substrings, or replacing
portions of a string that match the pattern. 

Using regexp.Compile, you can avoid recompiling the same regular
expression multiple times, which improves performance and makes your code more
efficient. If the provided pattern is invalid,
regexp.Compile will return an error, ensuring that potential
issues are caught at the time of compilation rather than during execution.

## Basic regexp.Compile Example

The simplest use of regexp.Compile checks if a string matches a
pattern. Here we check for a simple word match.

basic_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re, err := regexp.Compile(`hello`)
    if err != nil {
        panic(err)
    }

    fmt.Println(re.MatchString("hello there")) // true
    fmt.Println(re.MatchString("goodbye"))     // false
}

We compile the pattern "hello" and use MatchString to test strings.
The function returns true if the pattern is found in the input string.

## Matching Email Addresses

A common use case is validating email addresses. This example shows a basic
email pattern matcher.

email_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {

    pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
    re, err := regexp.Compile(pattern)
    if err != nil {
        panic(err)
    }

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

The pattern matches standard email formats. Note that email validation regex can
get very complex for full RFC compliance.

## Extracting Submatches

regexp.Compile can be used to extract parts of matched strings.
Here we extract date components.

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

## Compile vs MustCompile

Go provides two compilation functions. Compile returns an error
while MustCompile panics on invalid patterns.

compile_vs_must.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {

    // Safe compilation with error handling
    re1, err := regexp.Compile(`valid`)
    if err != nil {
        fmt.Println("Compile error:", err)
    } else {
        fmt.Println(re1.MatchString("valid pattern"))
    }

    // Panic on invalid pattern
    re2 := regexp.MustCompile(`valid`)
    fmt.Println(re2.MatchString("valid pattern"))

    // This would panic:
    // re3 := regexp.MustCompile(`invalid(`)
}

MustCompile is convenient when the pattern is known to be valid.
Use Compile when processing user-supplied patterns.

## Performance Considerations

Compiling regex patterns is expensive. For repeated use, compile once and reuse
the Regexp object.

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
    for i := 0; i &lt; 100_000; i++ {
        re, _ := regexp.Compile(`pattern`)
        re.MatchString("test")
    }
    fmt.Println("Loop compile:", time.Since(start))

    start = time.Now()
    // Good: Compile once
    re, _ := regexp.Compile(`pattern`)
    for i := 0; i &lt; 100_000; i++ {
        re.MatchString("test")
    }
    fmt.Println("Single compile:", time.Since(start))
}

The benchmark shows compiling once outside loops is much faster. Always reuse
compiled patterns when possible.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the regexp.Compile function in Go with
practical examples of pattern matching and text manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).