+++
title = "Golang Regexp.FindAllStringSubmatch"
date = 2025-08-29T19:55:39.141+01:00
draft = false
description = "Learn how to find all string submatches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllStringSubmatch

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllStringSubmatch method in Go.
We'll cover submatch extraction and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllStringSubmatch method returns all matches of a
regular expression in a string, including submatches. Each match is a slice of
strings.

## Basic FindAllStringSubmatch Example

The simplest use extracts all matches and submatches from a string. Here we find
dates in a text.

basic_submatch.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Dates: 2025-04-20, 2025-05-15, 2025-06-10"
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)

    matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        fmt.Printf("Full: %s, Year: %s, Month: %s, Day: %s\n",
            match[0], match[1], match[2], match[3])
    }
}

The method returns a slice of slices. Each inner slice contains the full match
followed by submatches. Index 0 is always the full match.

## Extracting Key-Value Pairs

This example demonstrates extracting key-value pairs from a string using named
capture groups.

key_value_pairs.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "name=John age=30 city=New York"
    re := regexp.MustCompile(`(\w+)=(\w+)`)

    matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        fmt.Printf("Key: %s, Value: %s\n", match[1], match[2])
    }
}

The pattern captures word characters before and after the equals sign. Each match
contains the full pair and the separated components.

## Finding HTML Tags and Attributes

Here we extract HTML tags and their attributes from a string. This demonstrates
more complex pattern matching.

html_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    html := `&lt;a href="https://example.com" title="Example"&gt;Link&lt;/a&gt;`
    re := regexp.MustCompile(`&lt;(\w+)([^&gt;]*)&gt;`)

    matches := re.FindAllStringSubmatch(html, -1)
    for _, match := range matches {
        fmt.Println("Tag:", match[1])
        fmt.Println("Attributes:", match[2])
    }
}

The pattern captures the tag name and all attributes. Note that HTML parsing with
regex has limitations for complex documents.

## Extracting Multiple Email Addresses

This example shows how to extract multiple email addresses from text and their
components using submatches.

emails_extraction.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := `Contact us at info@example.com or support@company.co.uk`
    re := regexp.MustCompile(`([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})`)

    matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        fmt.Println("Full email:", match[0])
        fmt.Println("Username:", match[1])
        fmt.Println("Domain:", match[2])
        fmt.Println("TLD:", match[3])
        fmt.Println()
    }
}

Each email match is broken down into username, domain, and top-level domain
components. The pattern matches common email formats.

## Parsing Log Entries

Log files often contain structured data that can be extracted with regex. Here
we parse Apache log entries.

log_parsing.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    logEntry := `127.0.0.1 - frank [10/Oct/2025:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326`
    re := regexp.MustCompile(`^(\S+) (\S+) (\S+) \[([^\]]+)\] "(\S+) (\S+) (\S+)" (\d+) (\d+)$`)

    matches := re.FindAllStringSubmatch(logEntry, -1)
    for _, match := range matches {
        fmt.Println("IP:", match[1])
        fmt.Println("User:", match[3])
        fmt.Println("Date:", match[4])
        fmt.Println("Method:", match[5])
        fmt.Println("Path:", match[6])
        fmt.Println("Status:", match[8])
        fmt.Println("Size:", match[9])
    }
}

The pattern captures all components of a standard Apache log entry. Each
component is available as a separate submatch.

## Extracting Phone Numbers

This example demonstrates extracting phone numbers in various formats and their
components from text.

phone_numbers.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := `Call 555-1234 or (555) 987-6543 or 555.456.7890`
    re := regexp.MustCompile(`\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})`)

    matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        fmt.Println("Full number:", match[0])
        fmt.Println("Area code:", match[1])
        fmt.Println("Exchange:", match[2])
        fmt.Println("Line number:", match[3])
        fmt.Println()
    }
}

The pattern handles several common phone number formats. The submatches extract
the area code, exchange, and line number components.

## Limiting the Number of Matches

The second parameter of FindAllStringSubmatch controls how many matches are
returned. This example shows limiting matches.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "apple banana apple cherry apple date"
    re := regexp.MustCompile(`apple`)

    // Get all matches
    allMatches := re.FindAllStringSubmatch(text, -1)
    fmt.Println("All matches:", len(allMatches))

    // Get first 2 matches
    limitedMatches := re.FindAllStringSubmatch(text, 2)
    fmt.Println("Limited matches:", len(limitedMatches))
}

A negative value returns all matches. A positive number limits the results to
that many matches. This can improve performance with large inputs.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllStringSubmatch method in Go with
practical examples of extracting submatches from strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).