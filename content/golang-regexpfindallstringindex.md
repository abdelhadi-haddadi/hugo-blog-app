+++
title = "Golang Regexp.FindAllStringIndex"
date = 2025-08-29T19:55:39.157+01:00
draft = false
description = "Learn how to find all string indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllStringIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllStringIndex method in Go.
We'll cover its functionality and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllStringIndex method returns a slice of all successive
matches of the pattern in the input string. Each match is represented as a
two-element integer slice.

## Basic FindAllStringIndex Example

The simplest use of FindAllStringIndex finds all matches of a word.
Here we locate all occurrences of "go" in a string.

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`go`)
    text := "go learn go, go golang"
    
    matches := re.FindAllStringIndex(text, -1)
    fmt.Println(matches) // [[0 2] [8 10] [13 15]]
}

The method returns a slice of slices, where each inner slice contains start and
end indices of a match. The second parameter -1 means find all matches.

## Finding Multiple Word Occurrences

This example demonstrates finding multiple different words in a string.
We search for all occurrences of "cat" or "dog".

multi_word.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`cat|dog`)
    text := "I have a cat and a dog. My cat likes my dog."
    
    matches := re.FindAllStringIndex(text, -1)
    for _, match := range matches {
        fmt.Printf("Found %q at %d-%d\n", 
            text[match[0]:match[1]], match[0], match[1])
    }
}

The alternation operator | matches either "cat" or "dog". We print each match
with its location in the original string.

## Finding Email Positions

We can use FindAllStringIndex to locate email addresses in text.
This example shows how to find their positions.

email_positions.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
    re := regexp.MustCompile(pattern)
    text := "Contact us at info@example.com or support@company.org"
    
    matches := re.FindAllStringIndex(text, -1)
    for _, match := range matches {
        fmt.Println("Email found at positions:", match[0], "to", match[1])
        fmt.Println("Email:", text[match[0]:match[1]])
    }
}

The pattern matches standard email formats. We extract both the positions and
the actual email addresses from the text.

## Limiting Number of Matches

The second parameter of FindAllStringIndex can limit the number
of matches returned. Here we find only the first two numbers.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "100 200 300 400 500"
    
    // Find first two number matches
    matches := re.FindAllStringIndex(text, 2)
    fmt.Println(matches) // [[0 3] [4 7]]
}

Instead of -1 for all matches, we pass 2 to get only the first two matches.
The method stops searching after finding the specified number of matches.

## Finding Overlapping Matches

By default, matches don't overlap. This example shows how to find overlapping
matches using lookahead assertions.

overlapping.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?=(\d\d\d))`)
    text := "12345"
    
    matches := re.FindAllStringIndex(text, -1)
    for _, match := range matches {
        fmt.Println("Match at:", match[0], "to", match[1])
        fmt.Println("Triplet:", text[match[0]:match[0]+3])
    }
}

The lookahead assertion (?=...) allows finding all possible 3-digit sequences.
This technique is useful for finding overlapping patterns in text.

## Finding Word Boundaries

This example demonstrates finding whole words and their positions using word
boundary markers.

word_boundaries.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b\w+\b`)
    text := "The quick brown fox jumps"
    
    matches := re.FindAllStringIndex(text, -1)
    for i, match := range matches {
        word := text[match[0]:match[1]]
        fmt.Printf("Word %d: %q at %d-%d\n", i+1, word, match[0], match[1])
    }
}

The \b markers ensure we match whole words only. We print each word with its
position in the original string.

## Handling Empty Matches

FindAllStringIndex can return empty matches in some cases.
This example shows how to handle them properly.

empty_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`a*`)
    text := "baaab"
    
    matches := re.FindAllStringIndex(text, -1)
    for i, match := range matches {
        if match[0] == match[1] {
            fmt.Printf("Empty match at position %d\n", match[0])
        } else {
            fmt.Printf("Match %d: %q at %d-%d\n", 
                i, text[match[0]:match[1]], match[0], match[1])
        }
    }
}

The a* pattern matches zero or more 'a's, leading to empty matches. We check
for empty matches by comparing start and end indices.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllStringIndex method in Go
with practical examples of pattern matching and position finding.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).