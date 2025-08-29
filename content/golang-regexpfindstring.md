+++
title = "Golang Regexp.FindString"
date = 2025-08-29T19:55:41.418+01:00
draft = false
description = "Learn how to find strings using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindString

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindString method in Go.
We'll cover basic usage and provide practical examples of finding string matches.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindString method returns the first match of the
regular expression in the input string. It returns an empty string if no match
is found.

## Basic FindString Example

The simplest use of FindString finds the first match of a pattern.
Here we search for a simple word in a string.

basic_find.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`hello`)
    
    match := re.FindString("hello there, hello world")
    fmt.Println(match) // "hello"
    
    noMatch := re.FindString("goodbye")
    fmt.Println(noMatch) // ""
}

We compile the pattern "hello" and use FindString to find the first
occurrence. It returns the matched substring or an empty string.

## Finding Numbers in Text

This example demonstrates finding the first number in a string using FindString.

find_number.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    
    text := "The price is 42 dollars and 99 cents"
    match := re.FindString(text)
    
    fmt.Printf("First number found: %s\n", match) // "42"
}

The pattern \d+ matches one or more digits. FindString
returns only the first match in the input string.

## Finding Email Addresses

We can use FindString to extract the first email address from text.

find_email.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
    re := regexp.MustCompile(pattern)
    
    text := "Contact us at support@example.com or sales@company.org"
    email := re.FindString(text)
    
    fmt.Println("First email found:", email) // "support@example.com"
}

The email pattern matches standard email formats. FindString stops
after finding the first match in the input text.

## Case Insensitive Matching

This example shows how to perform case-insensitive matching with FindString.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)hello`)
    
    match1 := re.FindString("Hello world")
    match2 := re.FindString("hElLo there")
    noMatch := re.FindString("Goodbye")
    
    fmt.Println(match1) // "Hello"
    fmt.Println(match2) // "hElLo"
    fmt.Println(noMatch) // ""
}

The (?i) flag makes the pattern case-insensitive. The method still
returns the original case of the matched substring.

## Finding HTML Tags

This example demonstrates finding the first HTML tag in a string.

find_html_tag.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;[^&gt;]+&gt;`)
    
    html := `&lt;div&gt;This is &lt;b&gt;bold&lt;/b&gt; text&lt;/div&gt;`
    tag := re.FindString(html)
    
    fmt.Println("First HTML tag:", tag) // "&lt;div&gt;"
}

The pattern matches anything between angle brackets. FindString
returns the first complete HTML tag found in the input.

## Finding Words Starting With Prefix

This example finds the first word starting with a specific prefix.

find_prefix.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\bun\w*\b`)
    
    text := "The universe is unknown but not uninteresting"
    match := re.FindString(text)
    
    fmt.Println("First 'un' word:", match) // "universe"
}

The pattern \bun\w*\b matches whole words starting with "un".
FindString returns the first such word found.

## Finding First URL in Text

This example extracts the first URL from a block of text.

find_url.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `https?://[^\s]+`
    re := regexp.MustCompile(pattern)
    
    text := `Visit https://example.com or http://test.org for more info`
    url := re.FindString(text)
    
    fmt.Println("First URL found:", url) // "https://example.com"
}

The pattern matches HTTP/HTTPS URLs. FindString returns the first
complete URL found in the input text.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindString method in Go with
practical examples of finding string matches in text.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).