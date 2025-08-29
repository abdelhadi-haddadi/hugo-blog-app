+++
title = "Golang Regexp.FindStringSubmatch"
date = 2025-08-29T19:55:42.511+01:00
draft = false
description = "Learn how to find string submatches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindStringSubmatch

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindStringSubmatch
method in Go. We'll cover submatch extraction with practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindStringSubmatch method returns a slice of strings
holding the text of the leftmost match and its submatches. Submatches are
matches of parenthesized subexpressions within the regular expression.

## Basic FindStringSubmatch Example

The simplest use of FindStringSubmatch extracts parts of a date
string. Here we break down a date into year, month, and day components.

basic_submatch.go
  

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
        fmt.Println("Full match:", matches[0])
        fmt.Println("Year:", matches[1])
        fmt.Println("Month:", matches[2])
        fmt.Println("Day:", matches[3])
    }
}

The pattern uses parentheses to create capture groups. Index 0 contains the
full match, while subsequent indices contain the submatches.

## Extracting URL Components

This example demonstrates extracting protocol, domain, and path from a URL.
It shows how to handle more complex string parsing.

url_components.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^(https?)://([^/]+)(/.*)?$`)
    url := "https://example.com/path/to/resource"

    matches := re.FindStringSubmatch(url)
    if matches != nil {
        fmt.Println("Protocol:", matches[1])
        fmt.Println("Domain:", matches[2])
        fmt.Println("Path:", matches[3])
    }
}

The regex breaks down URLs into three parts. The path is optional, as indicated
by the question mark after its capture group.

## Named Capture Groups

Go doesn't support named capture groups natively, but we can simulate them
using a map with constant indices. This improves code readability.

named_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    const (
        fullMatch = iota
        year
        month
        day
    )

    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    date := "2025-04-20"

    matches := re.FindStringSubmatch(date)
    if matches != nil {
        fmt.Println("Full match:", matches[fullMatch])
        fmt.Println("Year:", matches[year])
        fmt.Println("Month:", matches[month])
        fmt.Println("Day:", matches[day])
    }
}

Using constants for indices makes the code more maintainable. The pattern
remains the same, but the access is clearer.

## Email Address Parsing

This example extracts username and domain from email addresses. It demonstrates
handling more complex patterns with submatches.

email_parsing.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$`)
    email := "user.name@example.com"

    matches := re.FindStringSubmatch(email)
    if matches != nil {
        fmt.Println("Full email:", matches[0])
        fmt.Println("Username:", matches[1])
        fmt.Println("Domain:", matches[2])
    } else {
        fmt.Println("Invalid email format")
    }
}

The pattern validates the email format while extracting its components. Note
that complete email validation requires more complex patterns.

## Multiple Matches in Text

To find all matches in a text, we use FindAllStringSubmatch. This
example extracts all phone numbers from a string.

multiple_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{3})-(\d{3})-(\d{4})`)
    text := "Call 555-123-4567 or 888-234-5678 for assistance"

    allMatches := re.FindAllStringSubmatch(text, -1)
    for _, matches := range allMatches {
        fmt.Println("Full number:", matches[0])
        fmt.Println("Area code:", matches[1])
        fmt.Println("Exchange:", matches[2])
        fmt.Println("Line number:", matches[3])
        fmt.Println("---")
    }
}

The second parameter to FindAllStringSubmatch limits the number
of matches. Use -1 to find all matches in the string.

## Optional Submatches

This example shows how to handle optional components in patterns. We extract
both required and optional parts from a string.

optional_submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^(Mr|Ms|Mrs)\.?\s+(\w+)(?:\s+(\w+))?$`)
    names := []string{
        "Mr. John Doe",
        "Ms Jane Smith",
        "Mrs. Johnson",
    }

    for _, name := range names {
        matches := re.FindStringSubmatch(name)
        if matches != nil {
            fmt.Println("Title:", matches[1])
            fmt.Println("First name:", matches[2])
            if matches[3] != "" {
                fmt.Println("Last name:", matches[3])
            } else {
                fmt.Println("Last name: (none)")
            }
            fmt.Println("---")
        }
    }
}

The non-capturing group (?:...) makes the last name optional.
We check for empty submatches when processing the results.

## Complex Log Parsing

This advanced example parses log entries with multiple components. It
demonstrates handling complex real-world data extraction.

log_parsing.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\] (\w+): (.+)$`)
    logEntry := "2025-04-20 14:30:45 [ERROR] main: Failed to connect to database"

    matches := re.FindStringSubmatch(logEntry)
    if matches != nil {
        fmt.Println("Timestamp:", matches[1])
        fmt.Println("Log level:", matches[2])
        fmt.Println("Component:", matches[3])
        fmt.Println("Message:", matches[4])
    }
}

The pattern breaks down a standard log entry into its components. Each part is
captured in a separate submatch for easy access.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindStringSubmatch method in
Go with practical examples of string parsing and data extraction.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).