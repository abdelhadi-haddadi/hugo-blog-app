+++
title = "Golang Regexp.FindSubmatch"
date = 2025-08-29T19:55:42.508+01:00
draft = false
description = "Learn how to find submatches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindSubmatch

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindSubmatch method
in Go. We'll cover submatch extraction with practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindSubmatch method returns a slice of strings holding
the text of the leftmost match and its submatches. Submatches are matches of
parenthesized subexpressions.

## Basic FindSubmatch Example

The simplest use of FindSubmatch extracts parts of a date string.
Here we get year, month, and day components.

basic_submatch.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    date := "2025-04-20"

    matches := re.FindSubmatch([]byte(date))
    if matches != nil {
        fmt.Println("Full match:", string(matches[0]))
        fmt.Println("Year:", string(matches[1]))
        fmt.Println("Month:", string(matches[2]))
        fmt.Println("Day:", string(matches[3]))
    }
}

We compile a pattern with three capture groups. FindSubmatch returns
a slice where index 0 is the full match and subsequent indices are submatches.

## Extracting Name Components

This example demonstrates extracting first and last names from a formatted string.
The pattern captures two word groups.

name_components.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+)\s+(\w+)`)
    name := "John Doe"

    matches := re.FindSubmatch([]byte(name))
    if len(matches) &gt;= 3 {
        fmt.Println("First name:", string(matches[1]))
        fmt.Println("Last name:", string(matches[2]))
    }
}

The pattern (\w+)\s+(\w+) matches two word groups separated by
whitespace. We access the submatches at indices 1 and 2.

## Parsing URL Components

FindSubmatch can extract protocol, domain, and path from URLs.
This example shows a simple URL parser.

url_parser.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(https?)://([^/]+)(/.*)?`)
    url := "https://example.com/path/to/resource"

    matches := re.FindSubmatch([]byte(url))
    if matches != nil {
        fmt.Println("Protocol:", string(matches[1]))
        fmt.Println("Domain:", string(matches[2]))
        fmt.Println("Path:", string(matches[3]))
    }
}

The pattern captures the protocol, domain, and optional path. The third group is
optional, so it may be empty.

## Extracting Multiple Email Addresses

This example finds all email addresses in a string and extracts their components.
We use a loop with FindAllSubmatch.

multiple_emails.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})`)
    text := "Contact us at info@example.com or support@company.co.uk"

    allMatches := re.FindAllSubmatch([]byte(text), -1)
    for _, match := range allMatches {
        fmt.Println("\nFull email:", string(match[0]))
        fmt.Println("Username:", string(match[1]))
        fmt.Println("Domain:", string(match[2]))
        fmt.Println("TLD:", string(match[3]))
    }
}

The pattern captures username, domain, and TLD components. FindAllSubmatch
returns all matches in the input string.

## Handling Optional Submatches

This example shows how to handle patterns with optional components. We parse log
entries with optional error codes.

optional_submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\[(.*?)\]\s(.*?)(?:\s\((\d+)\))?$`)
    logs := []string{
        "[ERROR] Connection failed",
        "[WARNING] Low memory (1024)",
    }

    for _, log := range logs {
        matches := re.FindSubmatch([]byte(log))
        if matches != nil {
            fmt.Println("\nLevel:", string(matches[1]))
            fmt.Println("Message:", string(matches[2]))
            if len(matches[3]) &gt; 0 {
                fmt.Println("Code:", string(matches[3]))
            }
        }
    }
}

The pattern makes the error code optional with (?:...)?. We check
the length of matches[3] before using it.

## Extracting Nested Submatches

This advanced example demonstrates nested capture groups. We parse configuration
lines with key-value pairs.

nested_submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+)=((?:"([^"]*)"|([^,]*))(?:,|$))`)
    config := `name="John Doe",age=30,city=New York`

    allMatches := re.FindAllSubmatch([]byte(config), -1)
    for _, match := range allMatches {
        fmt.Println("\nKey:", string(match[1]))
        if len(match[3]) &gt; 0 {
            fmt.Println("Value (quoted):", string(match[3]))
        } else {
            fmt.Println("Value:", string(match[4]))
        }
    }
}

The pattern handles both quoted and unquoted values. Nested groups allow us to
distinguish between different value formats.

## Performance Considerations

When processing large texts, consider using FindSubmatchIndex for
better performance. This example compares both approaches.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    text := []byte("Date: 2025-04-20, Time: 12:30")

    start := time.Now()
    matches := re.FindSubmatch(text)
    fmt.Println("FindSubmatch:", string(matches[1]), time.Since(start))

    start = time.Now()
    indices := re.FindSubmatchIndex(text)
    year := text[indices[2]:indices[3]]
    fmt.Println("FindSubmatchIndex:", string(year), time.Since(start))
}

FindSubmatchIndex returns byte indices instead of substrings. This
avoids allocations and is faster for large-scale processing.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindSubmatch method in Go with
practical examples of submatch extraction from strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).