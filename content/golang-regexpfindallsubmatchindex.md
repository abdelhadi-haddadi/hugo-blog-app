+++
title = "Golang Regexp.FindAllSubmatchIndex"
date = 2025-08-29T19:55:40.287+01:00
draft = false
description = "Learn how to find all submatch indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllSubmatchIndex

last modified April 20, 2025

This tutorial explains how to use the
Regexp.FindAllSubmatchIndex method in Go. We'll cover its
functionality and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllSubmatchIndex method returns a slice of slices
of integers. Each integer slice represents the positions of matches and submatches.

## Basic FindAllSubmatchIndex Example

The simplest use of FindAllSubmatchIndex finds all matches and their
positions in a string. Here we locate simple word matches.

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`go`)
    text := "go golang go go"
    
    indices := re.FindAllSubmatchIndex([]byte(text), -1)
    for _, match := range indices {
        fmt.Printf("Found at %d-%d: %s\n", 
            match[0], match[1], text[match[0]:match[1]])
    }
}

We compile the pattern "go" and find all occurrences in the text. Each match
returns start and end positions in the input byte slice.

## Finding Submatch Positions

This example demonstrates capturing group positions. We'll extract date components
with their exact locations.

submatch_positions.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    text := "Date: 2025-04-20, Another: 2026-05-21"
    
    matches := re.FindAllSubmatchIndex([]byte(text), -1)
    for _, match := range matches {
        fmt.Println("Full match:", text[match[0]:match[1]])
        fmt.Println("Year:", text[match[2]:match[3]])
        fmt.Println("Month:", text[match[4]:match[5]])
        fmt.Println("Day:", text[match[6]:match[7]])
    }
}

The pattern has three capture groups. Each match returns eight integers: pairs
for full match and each group's start/end positions.

## Finding Overlapping Matches

FindAllSubmatchIndex can find overlapping matches when using
lookahead assertions. This shows all possible 3-digit sequences.

overlapping.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?=(\d{3}))`)
    text := "12345"
    
    matches := re.FindAllSubmatchIndex([]byte(text), -1)
    for _, match := range matches {
        start, end := match[2], match[3]
        fmt.Printf("Found at %d-%d: %s\n", 
            start, end, text[start:end])
    }
}

The lookahead assertion finds all positions where three digits follow. Each
match returns the position of the lookahead and the captured group.

## Extracting Key-Value Pairs

This example shows how to parse key-value pairs and get their exact positions.
We'll process a simple configuration string.

key_value.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+)=("[^"]*"|\S+)`)
    text := `name="John Doe" age=30 city="New York"`
    
    matches := re.FindAllSubmatchIndex([]byte(text), -1)
    for _, match := range matches {
        key := text[match[2]:match[3]]
        value := text[match[4]:match[5]]
        fmt.Printf("Key: %s (at %d-%d), Value: %s (at %d-%d)\n",
            key, match[2], match[3], 
            value, match[4], match[5])
    }
}

The pattern matches keys and values, with quoted values supported. We extract
both the content and positions of each component.

## Finding Nested Structures

This advanced example demonstrates parsing nested structures. We'll extract HTML
tags with their attributes and positions.

nested.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;(\w+)(\s+([^&gt;]*))?&gt;`)
    text := `&lt;div class="header"&gt;&lt;p align="center"&gt;Hello&lt;/p&gt;&lt;/div&gt;`
    
    matches := re.FindAllSubmatchIndex([]byte(text), -1)
    for _, match := range matches {
        fmt.Println("Full tag:", text[match[0]:match[1]])
        fmt.Println("Tag name:", text[match[2]:match[3]])
        if match[4] != -1 {
            fmt.Println("Attributes:", text[match[6]:match[7]])
        }
    }
}

The pattern matches HTML tags with optional attributes. We check for -1 to handle
optional groups that didn't participate in the match.

## Handling Empty Matches

This example shows how FindAllSubmatchIndex handles empty matches.
We'll process a string with potential zero-length matches.

empty_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`a*`)
    text := "baaab"
    
    matches := re.FindAllSubmatchIndex([]byte(text), -1)
    for i, match := range matches {
        if match[0] == match[1] {
            fmt.Printf("Match %d: empty at position %d\n", i, match[0])
        } else {
            fmt.Printf("Match %d: %q at %d-%d\n", 
                i, text[match[0]:match[1]], match[0], match[1])
        }
    }
}

The pattern matches zero or more 'a's. Empty matches are returned with equal
start and end positions. This behavior is important for some algorithms.

## Performance Considerations

When processing large texts, consider limiting the number of matches. This
example shows how to control result size.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "1 22 333 4444 55555 666666"
    
    // Find first 3 matches
    matches := re.FindAllSubmatchIndex([]byte(text), 3)
    for _, match := range matches {
        fmt.Println(text[match[0]:match[1]])
    }
}

The second parameter limits the number of matches returned. Use this to prevent
excessive memory usage with patterns that might match many times.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp#Regexp.FindAllSubmatchIndex)

This tutorial covered the Regexp.FindAllSubmatchIndex method in Go
with practical examples of finding matches and their positions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).