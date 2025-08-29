+++
title = "Golang Regexp.FindAllString"
date = 2025-08-29T19:55:39.153+01:00
draft = false
description = "Learn how to find all strings using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAllString

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAllString method in Go.
We'll cover regular expression basics and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAllString method returns all successive matches of
a regular expression in a string. It's useful for extracting multiple patterns.

## Basic FindAllString Example

The simplest use of FindAllString finds all occurrences of a word.
Here we find all instances of "go" in a string.

basic_findall.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`go`)
    text := "go run go build go test go fmt"
    
    matches := re.FindAllString(text, -1)
    fmt.Println(matches) // [go go go go]
    fmt.Println("Found", len(matches), "matches")
}

The method returns a slice of all non-overlapping matches. The -1 means find all
matches. We can limit matches with a positive number.

## Finding All Email Addresses

This example demonstrates finding all email addresses in a text using
FindAllString.

find_emails.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
    re := regexp.MustCompile(pattern)
    text := `Contact us at info@example.com or support@company.co.uk 
             for assistance. Invalid emails: user@, @domain.com`
    
    emails := re.FindAllString(text, -1)
    for i, email := range emails {
        fmt.Printf("%d: %s\n", i+1, email)
    }
}

The pattern matches standard email formats. FindAllString extracts
all valid emails while ignoring invalid ones.

## Limiting Number of Matches

We can limit the number of matches returned by FindAllString.
This example finds only the first two numbers in a string.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "There are 123 apples and 456 oranges, 789 bananas"
    
    // Find first 2 number matches
    matches := re.FindAllString(text, 2)
    fmt.Println(matches) // [123 456]
}

The second parameter controls how many matches to return. Here we get only the
first two numbers found in the text.

## Finding Words of Specific Length

This example finds all 5-letter words in a string using FindAllString.

word_length.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b\w{5}\b`)
    text := "The quick brown fox jumps over the lazy dog"
    
    fiveLetterWords := re.FindAllString(text, -1)
    fmt.Println(fiveLetterWords) // [quick brown jumps]
}

The pattern \b\w{5}\b matches exactly 5-letter words. Word
boundaries ensure we match whole words only.

## Finding HTML Tags

This example extracts all HTML tags from a string using FindAllString.

html_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;[^&gt;]+&gt;`)
    html := `&lt;div&gt;&lt;p&gt;Hello&lt;/p&gt;&lt;a href="#"&gt;Link&lt;/a&gt;&lt;/div&gt;`
    
    tags := re.FindAllString(html, -1)
    for _, tag := range tags {
        fmt.Println(tag)
    }
}

The pattern matches anything between angle brackets. Note this is a simple
example and may not handle all HTML edge cases.

## Finding All Capitalized Words

This example finds all words that start with a capital letter using
FindAllString.

capitalized_words.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b[A-Z][a-z]*\b`)
    text := "The Quick Brown Fox jumps Over The Lazy Dog"
    
    capitalized := re.FindAllString(text, -1)
    fmt.Println(capitalized) // [The Quick Brown Fox Over The Lazy Dog]
}

The pattern matches word boundaries followed by an uppercase letter and optional
lowercase letters. It finds proper nouns and sentence starters.

## Finding All Hashtags

This example extracts all hashtags from a social media post using
FindAllString.

hashtags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`#\w+`)
    post := `Just launched our #newproduct! Check it out #golang #programming 
             #tech #innovation`
    
    hashtags := re.FindAllString(post, -1)
    fmt.Println(hashtags) // [#newproduct #golang #programming #tech #innovation]
}

The pattern matches the # symbol followed by one or more word characters.
FindAllString collects all hashtags in the text.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAllString method in Go with
practical examples of finding multiple pattern matches in strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).