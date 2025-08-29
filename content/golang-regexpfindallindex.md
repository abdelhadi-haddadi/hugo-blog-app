+++
title = "Golang Regexp.FindAllIndex"
date = 2025-08-29T19:55:38.053+01:00
draft = false
description = "Learn how to find all match indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllIndex method
in Go. We'll cover its functionality with practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllIndex method returns a slice of all successive
matches of the pattern in the input byte slice. Each match is represented as a
two-element integer slice.

## Basic FindAllIndex Example

The simplest use of FindAllIndex finds all occurrences of a word.
Here we locate all "go" instances in text.

basic_findall.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte("go is good, go is great, go is awesome")
    re := regexp.MustCompile(`go`)

    matches := re.FindAllIndex(text, -1)
    for _, match := range matches {
        fmt.Printf("Found 'go' at %d-%d\n", match[0], match[1])
    }
}

The method returns slice of [start, end] index pairs. Each pair represents one
match location in the input text.

## Finding Multiple Patterns

FindAllIndex can find multiple different patterns. This example
locates both "cat" and "dog" in text.

multiple_patterns.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte("cat dog bird cat dog")
    re := regexp.MustCompile(`cat|dog`)

    matches := re.FindAllIndex(text, -1)
    for i, match := range matches {
        word := string(text[match[0]:match[1]])
        fmt.Printf("Match %d: %s at %d-%d\n", i+1, word, match[0], match[1])
    }
}

The alternation operator | matches either pattern. We extract the matched words
using the returned indices.

## Limiting Number of Matches

The second parameter controls how many matches to return. Here we limit to first
two matches.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte("one two three four five six")
    re := regexp.MustCompile(`\w+`)

    matches := re.FindAllIndex(text, 2)
    for _, match := range matches {
        word := string(text[match[0]:match[1]])
        fmt.Println(word)
    }
}

Setting n to 2 returns only the first two matches. Use -1 to find all matches.

## Finding Overlapping Matches

By default, matches don't overlap. This example shows how to find overlapping
matches using lookahead.

overlapping.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte("ababab")
    re := regexp.MustCompile(`(?=(aba))`)

    matches := re.FindAllIndex(text, -1)
    for _, match := range matches {
        // Note: match[0] == match[1] for zero-width matches
        fmt.Printf("Found at %d-%d: %s\n", 
            match[0], match[0]+3, text[match[0]:match[0]+3])
    }
}

The lookahead assertion (?=...) allows finding overlapping patterns. Each match
has equal start and end indices.

## Finding All Email Indices

This practical example finds all email addresses in text and their positions.

email_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte(`Contact us at info@example.com or support@company.com`)
    re := regexp.MustCompile(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`)

    matches := re.FindAllIndex(text, -1)
    for _, match := range matches {
        email := string(text[match[0]:match[1]])
        fmt.Printf("Email %s at %d-%d\n", email, match[0], match[1])
    }
}

The pattern matches standard email formats. We extract both the emails and their
exact positions in the text.

## Handling Empty Matches

Empty matches require special handling. This example demonstrates their behavior.

empty_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := []byte("a,,b,c,,")
    re := regexp.MustCompile(`,`)

    matches := re.FindAllIndex(text, -1)
    fmt.Println("All comma positions:")
    for _, match := range matches {
        fmt.Printf("%d-%d\n", match[0], match[1])
    }

    // Handling empty fields between commas
    fields := re.Split(string(text), -1)
    fmt.Println("\nFields:")
    for i, field := range fields {
        fmt.Printf("%d: %q\n", i, field)
    }
}

Empty matches appear as zero-length ranges. They're useful for splitting strings
while preserving empty fields.

## Performance Considerations

For large texts, consider using FindAllIndex with byte slices
instead of strings for better performance.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    // Generate large text
    var text []byte
    for i := 0; i &lt; 10000; i++ {
        text = append(text, "abc123 "...)
    }

    re := regexp.MustCompile(`\d+`)

    start := time.Now()
    matches := re.FindAllIndex(text, -1)
    elapsed := time.Since(start)

    fmt.Printf("Found %d matches in %s\n", len(matches), elapsed)
    fmt.Printf("First match at %d-%d\n", matches[0][0], matches[0][1])
}

Working with byte slices avoids string conversions. This can significantly
improve performance for large inputs.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllIndex method in Go with
practical examples of pattern matching and index retrieval.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).