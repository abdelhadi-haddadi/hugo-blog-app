+++
title = "Golang Regexp.FindAllStringSubmatchIndex"
date = 2025-08-29T19:55:40.293+01:00
draft = false
description = "Learn how to find all string submatch indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllStringSubmatchIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllStringSubmatchIndex method in Go.
We'll cover its functionality and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllStringSubmatchIndex method returns a slice of
indices identifying the leftmost matches of the regular expression. It provides
both match and submatch locations.

## Basic FindAllStringSubmatchIndex Example

This example shows the simplest use of FindAllStringSubmatchIndex.
We find all matches of a simple pattern in a string.

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    str := "I have 3 apples and 5 oranges"
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    fmt.Println(indices)
    
    for _, match := range indices {
        fmt.Println("Match:", str[match[0]:match[1]])
    }
}

The method returns a slice of integer slices. Each inner slice contains pairs of
indices representing match positions. Here we find all number sequences.

## Extracting Submatch Indices

This example demonstrates how to get indices for both matches and submatches.
We parse a date string into components.

submatch_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    str := "2025-04-20 and 2026-05-21 are important dates"
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    
    for _, match := range indices {
        fmt.Println("Full match:", str[match[0]:match[1]])
        fmt.Println("Year:", str[match[2]:match[3]])
        fmt.Println("Month:", str[match[4]:match[5]])
        fmt.Println("Day:", str[match[6]:match[7]])
    }
}

The indices alternate between start and end positions. The full match is at 0-1,
followed by submatches in pairs. This lets us extract specific parts of matches.

## Finding Overlapping Matches

This example shows how to find overlapping matches in a string. We search for
all possible 3-letter sequences.

overlapping.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?=(\w{3}))`)
    str := "Golang"
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    
    for _, match := range indices {
        fmt.Println(str[match[2]:match[3]])
    }
}

The lookahead assertion (?=...) allows finding overlapping matches.
Each match shows a different 3-character sequence from the input string.

## Extracting Key-Value Pairs

Here we parse key-value pairs from a string and use the indices to extract them.
This is useful for configuration parsing.

key_value.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+)=("[^"]*"|\S+)`)
    str := `name="John Doe" age=30 city="New York"`
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    
    for _, match := range indices {
        key := str[match[2]:match[3]]
        value := str[match[4]:match[5]]
        fmt.Printf("Key: %s, Value: %s\n", key, value)
    }
}

The pattern matches keys (word characters) and values (quoted strings or non-space
sequences). The indices help extract these components precisely.

## Finding HTML Tag Attributes

This example demonstrates extracting HTML tag attributes with their exact
positions. We parse an anchor tag's href and title.

html_attrs.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`Link`
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    
    if len(indices) &gt; 0 {
        match := indices[0]
        fmt.Println("Full tag:", str[match[0]:match[1]])
        fmt.Println("Href:", str[match[2]:match[3]])
        fmt.Println("Title:", str[match[4]:match[5]])
    }
}

The regex matches an anchor tag with href and title attributes. The indices let
us extract these attributes with their exact positions in the original string.

## Handling Multiple Matches

This example shows processing multiple matches in a longer text. We find all
email addresses and their positions.

multiple_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})`)
    str := `Contact us at info@example.com or support@company.co.uk for help.`
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    
    for i, match := range indices {
        fmt.Printf("Match %d:\n", i+1)
        fmt.Println("  Full email:", str[match[0]:match[1]])
        fmt.Println("  Username:", str[match[2]:match[3]])
        fmt.Println("  Domain:", str[match[4]:match[5]])
        fmt.Println("  Position:", match[0], "-", match[1])
    }
}

The method finds all email addresses in the text. For each, we get the full
email, username, domain, and their exact positions in the original string.

## Complex Pattern with Named Groups

This advanced example uses named capture groups and processes the results.
We parse log entries with timestamps and severity levels.

named_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;time&gt;\d{2}:\d{2}:\d{2}) (?P&lt;level&gt;\w+): (?P&lt;message&gt;.*)`)
    str := `10:30:45 ERROR: File not found
11:15:22 WARNING: Disk space low
12:01:33 INFO: Backup completed`
    
    indices := re.FindAllStringSubmatchIndex(str, -1)
    names := re.SubexpNames()
    
    for _, match := range indices {
        for i, name := range names {
            if i != 0 &amp;&amp; name != "" {
                start := match[2*i]
                end := match[2*i+1]
                fmt.Printf("%s: %s\n", name, str[start:end])
            }
        }
        fmt.Println()
    }
}

Named groups make the code more readable. We use SubexpNames to
map group indices to names, then extract values using the match indices.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllStringSubmatchIndex method in Go with
practical examples of pattern matching and text manipulation with position information.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).