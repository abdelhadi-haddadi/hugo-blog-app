+++
title = "Golang Regexp.FindStringIndex"
date = 2025-08-29T19:55:41.390+01:00
draft = false
description = "Learn how to find string indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindStringIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindStringIndex method in Go.
We'll cover its purpose and provide practical examples of usage.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindStringIndex method returns a two-element slice of
integers defining the location of the leftmost match in a string. The first
element is the start index, and the second is the end index.

## Basic FindStringIndex Example

The simplest use of FindStringIndex finds the position of a word.
Here we locate the first occurrence of "world".

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`world`)
    str := "hello world, welcome to the world of Go"
    
    indices := re.FindStringIndex(str)
    fmt.Println(indices) // [6 11]
    
    if indices != nil {
        fmt.Println("Found at:", indices[0], "to", indices[1])
        fmt.Println("Matched:", str[indices[0]:indices[1]])
    }
}

The method returns [6 11], indicating the match starts at index 6 and ends at 11.
If no match is found, it returns nil. We can slice the string with these indices.

## Finding Multiple Occurrences

To find all occurrences, we use FindAllStringIndex. This example
finds all "go" matches (case insensitive).

multiple_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)go`)
    str := "Go to the GO store and buy golang GO"
    
    allIndices := re.FindAllStringIndex(str, -1)
    for i, loc := range allIndices {
        fmt.Printf("Match %d: %v, text: %s\n", 
            i+1, loc, str[loc[0]:loc[1]])
    }
}

The (?i) makes the match case insensitive. We get four matches with
their positions. The second parameter (-1) means find all matches.

## Finding Index with Submatches

This example shows how to get indices for capture groups. We parse a date string.

submatch_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    date := "Event date: 2025-04-20"
    
    // Get indices for full match and submatches
    indices := re.FindStringSubmatchIndex(date)
    if indices != nil {
        fmt.Println("Full match:", indices[0:2])
        fmt.Println("Year:", indices[2:4], date[indices[2]:indices[3]])
        fmt.Println("Month:", indices[4:6], date[indices[4]:indices[5]])
        fmt.Println("Day:", indices[6:8], date[indices[6]:indices[7]])
    }
}

FindStringSubmatchIndex returns pairs of indices for each capture
group. Even indices are starts, odd indices are ends of matches.

## Finding Index of First Digit

This example finds the position of the first digit in a string. It demonstrates
simple pattern matching.

first_digit.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d`)
    str := "Product ID: A42B-789C"
    
    loc := re.FindStringIndex(str)
    if loc != nil {
        fmt.Println("First digit at position:", loc[0])
        fmt.Println("Digit is:", str[loc[0]:loc[1]])
    } else {
        fmt.Println("No digits found")
    }
}

The pattern \d matches any digit. The method returns the position
of the first match (14 in this case). We can then extract the digit.

## Finding URL Indices in Text

This example finds all HTTP/HTTPS URLs in a text block. It shows a more complex
pattern with indices.

url_finder.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`https?://[^\s]+`)
    text := `Visit https://example.com or http://test.org for more info.`
    
    urls := re.FindAllStringIndex(text, -1)
    for _, loc := range urls {
        fmt.Printf("URL found at %v: %s\n", 
            loc, text[loc[0]:loc[1]])
    }
}

The pattern matches http:// or https:// followed by non-whitespace characters.
We get the exact positions of both URLs in the text for further processing.

## Validating and Extracting Email Positions

This example validates emails and shows their positions. It combines matching
with index extraction.

email_positions.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b`)
    text := `Contact us at info@example.com or support@company.co.uk`
    
    emails := re.FindAllStringIndex(text, -1)
    for i, loc := range emails {
        fmt.Printf("Email %d: %s (positions %d-%d)\n",
            i+1, text[loc[0]:loc[1]], loc[0], loc[1])
    }
}

The pattern matches standard email formats. We get both the email addresses and
their exact positions in the input string for validation or extraction.

## Finding Overlapping Matches

This advanced example shows how to find overlapping matches by manually
adjusting the search position. We find all "ana" in "banana".

overlapping.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`ana`)
    str := "banana"
    pos := 0
    
    for pos &lt; len(str) {
        loc := re.FindStringIndex(str[pos:])
        if loc == nil {
            break
        }
        actualStart := pos + loc[0]
        actualEnd := pos + loc[1]
        
        fmt.Printf("Found at %d-%d: %s\n",
            actualStart, actualEnd, str[actualStart:actualEnd])
        
        pos += loc[0] + 1 // Move just past current match start
    }
}

By searching substrings and adjusting positions, we find all matches including
overlapping ones. This technique is useful for certain pattern matching tasks.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindStringIndex method in Go
with practical examples of finding string positions with regular expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).