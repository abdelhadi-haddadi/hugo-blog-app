+++
title = "Golang Regexp.Find"
date = 2025-08-29T19:55:38.063+01:00
draft = false
description = "Learn how to find matches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.Find

last modified April 20, 2025

This tutorial explains how to use the Regexp.Find method in Go.
We'll cover basic pattern matching and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.Find method returns a slice holding the text of the
leftmost match in the byte slice. It returns nil if no match is found.

## Basic Regexp.Find Example

The simplest use of Regexp.Find finds the first match in a byte
slice. Here we search for a simple word pattern.

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`foo`)
    text := []byte("some foo bar foo baz")
    
    match := re.Find(text)
    fmt.Printf("Found: %q\n", match) // "foo"
}

The method returns the first occurrence of "foo" in the byte slice. The result
is a byte slice containing the matched text.

## Finding Digits in a String

This example demonstrates finding the first sequence of digits in a string.
We convert the string to a byte slice for the search.

find_digits.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := []byte("Order 12345 was placed on 2025-04-20")
    
    match := re.Find(text)
    if match != nil {
        fmt.Printf("First number found: %s\n", match) // "12345"
    } else {
        fmt.Println("No numbers found")
    }
}

The pattern \d+ matches one or more digits. The method returns the
first numeric sequence found in the input.

## Case-Insensitive Matching

This example shows how to perform case-insensitive matching with Find.
We use the (?i) flag modifier in the pattern.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)hello`)
    text := []byte("HeLLo World, hElLo Go")
    
    match := re.Find(text)
    fmt.Printf("Found: %q\n", match) // "HeLLo"
}

The (?i) makes the pattern case-insensitive. The method returns
the first match regardless of case.

## Finding Word Boundaries

This example demonstrates finding whole words using word boundaries.
The \b metacharacter matches word boundaries.

word_boundaries.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\bGo\b`)
    text := []byte("Golang Go programming in Go")
    
    match := re.Find(text)
    fmt.Printf("Found: %q\n", match) // "Go"
}

The pattern matches the word "Go" only when it appears as a whole word. It
won't match "Go" in "Golang".

## Finding HTML Tags

This example shows how to find HTML tags in a document. We use a simple
pattern to match tag names.

html_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;[a-zA-Z]+&gt;`)
    text := []byte("&lt;html&gt;&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;/head&gt;")
    
    match := re.Find(text)
    fmt.Printf("First tag found: %s\n", match) // "&lt;html&gt;"
}

The pattern matches opening HTML tags. Note that this is a simplified example
and doesn't handle all HTML tag cases.

## Finding Email Addresses

This example demonstrates finding email addresses in text. We use a basic
email pattern for demonstration.

find_email.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`)
    text := []byte("Contact us at info@example.com or support@domain.org")
    
    match := re.Find(text)
    fmt.Printf("First email found: %s\n", match) // "info@example.com"
}

The pattern matches common email formats. The method returns the first email
address found in the text.

## Finding URLs

This example shows how to find URLs in text. We use a simple pattern that
matches common URL formats.

find_urls.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`https?://[^\s]+`)
    text := []byte("Visit https://example.com or http://test.org for more info")
    
    match := re.Find(text)
    fmt.Printf("First URL found: %s\n", match) // "https://example.com"
}

The pattern matches URLs starting with http:// or https://. The method returns
the first URL found in the input text.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.Find method in Go with
practical examples of pattern matching in byte slices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).