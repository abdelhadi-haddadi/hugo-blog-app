+++
title = "Golang Regexp.FindAll"
date = 2025-08-29T19:55:38.066+01:00
draft = false
description = "Learn how to find all matches using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindAll

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindAll method in Go.
We'll cover finding all matches with regular expressions and provide examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindAll method returns all successive matches of the
pattern in the input string or byte slice. It's useful for extracting multiple
matches at once.

## Basic FindAllString Example

The simplest use of FindAllString finds all matches of a pattern.
Here we find all occurrences of a word in text.

basic_findall.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "cat dog cat bird cat fish"
    re := regexp.MustCompile(`cat`)
    
    matches := re.FindAllString(text, -1)
    fmt.Println(matches) // [cat cat cat]
    fmt.Println("Number of matches:", len(matches))
}

We compile the pattern "cat" and find all occurrences in the text. The -1 means
find all matches. The method returns a slice of all matched strings.

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
    text := `Contact us at info@example.com or support@domain.com 
             for assistance. Sales can be reached at sales@company.net.`

    pattern := `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
    re := regexp.MustCompile(pattern)
    
    emails := re.FindAllString(text, -1)
    for _, email := range emails {
        fmt.Println(email)
    }
}

The pattern matches standard email formats. FindAllString scans the
entire text and returns all email addresses found.

## Limiting Number of Matches

The second parameter of FindAll controls how many matches to return.
Here we limit results to first two matches.

limit_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "apple banana apple cherry apple date"
    re := regexp.MustCompile(`apple`)
    
    // Find first 2 matches
    matches := re.FindAllString(text, 2)
    fmt.Println(matches) // [apple apple]
}

Setting the limit to 2 returns only the first two matches. This is useful when
you only need a sample of matches from a large text.

## FindAll with Submatches

FindAllStringSubmatch returns all matches including submatches.
Here we extract dates with their components.

findall_submatches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Dates: 2025-04-20, 2026-05-21, and 2027-06-22"
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    
    matches := re.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        fmt.Printf("Full: %s, Year: %s, Month: %s, Day: %s\n",
            match[0], match[1], match[2], match[3])
    }
}

Each match is a slice where index 0 is the full match, and subsequent indices
are capture groups. This extracts structured data from text.

## FindAll with Byte Slices

FindAll works with byte slices for raw data processing. This is
useful when working with binary data or files.

findall_bytes.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    data := []byte("key1=value1,key2=value2,key3=value3")
    re := regexp.MustCompile(`(\w+)=(\w+)`)
    
    matches := re.FindAllSubmatch(data, -1)
    for _, match := range matches {
        fmt.Printf("Key: %s, Value: %s\n", match[1], match[2])
    }
}

The byte slice version is similar to string operations but works directly with
[]byte. This avoids string conversions for binary data.

## Finding All Word Boundaries

This example shows how to find all words in text using word boundaries.

find_words.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "The quick brown fox jumps over the lazy dog"
    re := regexp.MustCompile(`\b\w+\b`)
    
    words := re.FindAllString(text, -1)
    for i, word := range words {
        fmt.Printf("Word %d: %s\n", i+1, word)
    }
}

The pattern \b\w+\b matches word boundaries. FindAllString
returns all words in the text. This is a simple tokenization approach.

## Finding All HTML Tags

This advanced example finds all HTML tags in a document. Note that regex may not
be the best tool for full HTML parsing.

find_html_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    html := `&lt;html&gt;&lt;head&gt;&lt;title&gt;Page&lt;/title&gt;&lt;/head&gt;
             &lt;body&gt;&lt;p&gt;Content&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;`
    
    re := regexp.MustCompile(`&lt;[^&gt;]+&gt;`)
    tags := re.FindAllString(html, -1)
    
    for _, tag := range tags {
        fmt.Println(tag)
    }
}

The pattern matches anything between angle brackets. While this works for simple
cases, consider proper HTML parsers for complex documents.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindAll method in Go with
practical examples of finding multiple pattern matches in text.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).