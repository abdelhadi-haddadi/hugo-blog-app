+++
title = "Golang Regexp.FindAllSubmatch"
date = 2025-08-29T19:55:40.290+01:00
draft = false
description = "Learn how to find all submatches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllSubmatch

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllSubmatch method in Go.
We'll cover submatch extraction basics and provide practical examples.

A submatch is a portion of a string matched by a parenthesized subexpression
within a regular expression. Submatches allow extracting specific parts of matches.

The Regexp.FindAllSubmatch method returns all successive matches of a
regular expression in a byte slice, including all submatches. Each match is a slice
of byte slices.

## Basic FindAllSubmatch Example

The simplest use of FindAllSubmatch extracts all matches and submatches
from a string. Here we find date components in a text.

basic_submatch.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Dates: 2025-04-20, 2025-05-21, 2025-06-22"
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)

    matches := re.FindAllSubmatch([]byte(text), -1)
    for _, match := range matches {
        fmt.Printf("Full match: %s\n", match[0])
        fmt.Printf("Year: %s, Month: %s, Day: %s\n", 
            match[1], match[2], match[3])
    }
}

The pattern captures year, month, and day in separate groups. FindAllSubmatch
returns all matches with their submatches. Each match is a slice where index 0 is the
full match.

## Extracting Key-Value Pairs

FindAllSubmatch can parse key-value pairs from structured text.
This example extracts configuration values.

key_value_pairs.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    config := `
    host = localhost
    port = 8080
    timeout = 30
    debug = true
    `
    re := regexp.MustCompile(`(\w+)\s*=\s*(\S+)`)

    matches := re.FindAllSubmatch([]byte(config), -1)
    for _, match := range matches {
        fmt.Printf("Key: %-10s Value: %s\n", match[1], match[2])
    }
}

The pattern matches word characters as keys and non-whitespace as values.
Submatches capture both key and value separately for easy processing.

## Finding HTML Attributes

We can use FindAllSubmatch to extract attributes from HTML tags.
This example finds all href attributes in anchor tags.

html_attributes.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    html := `
    &lt;a href="https://example.com"&gt;Example&lt;/a&gt;
    &lt;a href="/about"&gt;About&lt;/a&gt;
    &lt;a class="nav" href="/contact"&gt;Contact&lt;/a&gt;
    `
    re := regexp.MustCompile(`&lt;a\b[^&gt;]*\shref="([^"]*)"`)

    matches := re.FindAllSubmatch([]byte(html), -1)
    for _, match := range matches {
        fmt.Printf("Link: %s\n", match[1])
    }
}

The pattern matches anchor tags and captures the href attribute value. Note that
for complex HTML parsing, dedicated parsers are usually better.

## Parsing Log Entries

Log files often have a consistent format that can be parsed with regex.
This example extracts components from Apache log entries.

log_parsing.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    log := `127.0.0.1 - frank [10/Oct/2025:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326`
    pattern := `^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\d+) (\d+)$`
    re := regexp.MustCompile(pattern)

    matches := re.FindAllSubmatch([]byte(log), -1)
    if len(matches) &gt; 0 {
        match := matches[0]
        fmt.Printf("IP: %s\n", match[1])
        fmt.Printf("User: %s\n", match[3])
        fmt.Printf("Date: %s\n", match[4])
        fmt.Printf("Method: %s\n", match[5])
        fmt.Printf("Path: %s\n", match[6])
        fmt.Printf("Status: %s\n", match[8])
    }
}

The pattern matches all components of a Common Log Format entry. Each component
is captured in a separate submatch for easy access.

## Extracting Multiple Phone Numbers

FindAllSubmatch can find all occurrences of a pattern in text.
This example extracts phone numbers in different formats.

phone_numbers.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := `
    Contact us at 555-123-4567 or (555) 987-6543.
    International: +1 555 789 0123.
    `
    re := regexp.MustCompile(`(\+?\d{1,3}[-. ]?)?\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})`)

    matches := re.FindAllSubmatch([]byte(text), -1)
    for i, match := range matches {
        fmt.Printf("Phone #%d: %s%s%s%s\n", 
            i+1, match[1], match[2], match[3], match[4])
    }
}

The pattern matches various phone number formats. Each component (country code,
area code, etc.) is captured separately for flexible processing.

## Finding Nested Submatches

Complex patterns can have nested submatches. This example shows how to access
different levels of submatches.

nested_submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Coordinates: (40.7128, -74.0060), (34.0522, -118.2437)"
    re := regexp.MustCompile(`\((\d+\.\d+),\s*(-?\d+\.\d+)\)`)

    matches := re.FindAllSubmatch([]byte(text), -1)
    for i, match := range matches {
        fmt.Printf("Point %d: Lat=%s, Lon=%s\n", 
            i+1, match[1], match[2])
    }
}

The pattern matches latitude-longitude pairs in parentheses. Each coordinate
component is captured in its own submatch for individual access.

## Limiting Number of Matches

The second parameter of FindAllSubmatch controls how many matches
are returned. This example shows limiting matches.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "apple banana apple cherry apple date apple"
    re := regexp.MustCompile(`(apple)`)

    // Find first 2 matches
    matches := re.FindAllSubmatch([]byte(text), 2)
    fmt.Printf("Found %d matches:\n", len(matches))
    for _, match := range matches {
        fmt.Println(string(match[0]))
    }

    // Find all matches
    matches = re.FindAllSubmatch([]byte(text), -1)
    fmt.Printf("\nFound %d total matches\n", len(matches))
}

Setting a positive integer limits the number of matches returned. Using -1 returns
all matches in the input string.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllSubmatch method in Go with
practical examples of submatch extraction from various text patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).