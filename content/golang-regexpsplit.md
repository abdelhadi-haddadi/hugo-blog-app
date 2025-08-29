+++
title = "Golang Regexp.Split"
date = 2025-08-29T19:55:48.031+01:00
draft = false
description = "Learn how to split strings using regular expressions in Go. Includes examples of regex splitting."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.Split

last modified April 20, 2025

This tutorial explains how to use the Regexp.Split method in Go.
We'll cover regex splitting basics and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.Split method splits a string into substrings separated
by matches of the regular expression. It's more powerful than strings.Split.

## Basic Regexp.Split Example

The simplest use of Regexp.Split splits on a fixed delimiter.
Here we split a comma-separated string.

basic_split.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`,`)
    text := "apple,banana,cherry,date"
    
    parts := re.Split(text, -1)
    for _, part := range parts {
        fmt.Println(part)
    }
}

We compile a simple comma pattern and split the input string. The -1 means return
all substrings, including empty ones.

## Splitting on Multiple Delimiters

Regex splitting shines when you need to split on multiple possible delimiters.
This example splits on commas, semicolons, or whitespace.

multi_delimiter.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[,;\s]+`)
    text := "apple,banana; cherry  date;elderberry"
    
    parts := re.Split(text, -1)
    for _, part := range parts {
        fmt.Println(part)
    }
}

The pattern matches one or more commas, semicolons, or whitespace characters.
This handles irregular spacing between items elegantly.

## Limiting the Number of Splits

You can control how many splits occur by specifying a positive integer as the
second parameter. This limits the number of returned substrings.

limit_splits.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\s+`)
    text := "one two three four five"
    
    // Split into max 3 parts
    parts := re.Split(text, 3)
    for i, part := range parts {
        fmt.Printf("Part %d: %s\n", i+1, part)
    }
}

The output will have at most 3 substrings. The remaining delimiters are left in
the last substring.

## Splitting with Capture Groups

When the regex contains capture groups, the matched groups are included in the
result. This example demonstrates capturing delimiters.

capture_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\s*)([;,]\s*)`)
    text := "apple; banana,cherry;date"
    
    parts := re.Split(text, -1)
    for i, part := range parts {
        fmt.Printf("Part %d: %q\n", i, part)
    }
}

The output includes empty strings where capture groups matched. This behavior is
important to understand when processing results.

## Splitting Lines with Different Endings

Different operating systems use different line endings. Regex can handle all
variations when splitting text into lines.

line_endings.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\r?\n|\r`)
    text := "line1\nline2\r\nline3\rline4"
    
    lines := re.Split(text, -1)
    for _, line := range lines {
        fmt.Println(line)
    }
}

The pattern matches \n, \r\n, or \r. This handles Unix, Windows, and old Mac
line endings consistently.

## Splitting Words with Complex Boundaries

For natural language processing, you might need to split on word boundaries
considering punctuation. This example shows how.

word_boundaries.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[\s,.!?;:]+`)
    text := "Hello, there! How are you today?"
    
    words := re.Split(text, -1)
    for _, word := range words {
        fmt.Println(word)
    }
}

The pattern matches one or more whitespace or punctuation characters. This
produces clean word tokens from text.

## Splitting While Keeping Delimiters

Sometimes you need to split a string but preserve the delimiters as part of the
output. This requires a creative approach since the Split method of
Go's regexp package does not retain delimiters in its results.
Instead, we use FindAllStringIndex combined with string slicing to
achieve this functionality.

keep_delimiters.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[,;]`)
    text := "apple,banana;cherry"

    // Split the string while keeping the delimiters
    parts := re.FindAllStringIndex(text, -1)
    result := []string{}
    lastIndex := 0

    for _, indices := range parts {
        start, end := indices[0], indices[1]
        result = append(result, text[lastIndex:start]) // Add part before the delimiter
        result = append(result, text[start:end])       // Add the delimiter
        lastIndex = end
    }
    result = append(result, text[lastIndex:]) // Add the final part after the last delimiter

    for _, part := range result {
        fmt.Println(part)
    }
}

This example demonstrates how to split a string into substrings while retaining
the delimiters in the output. The regular expression [,;] matches
the delimiters, and the FindAllStringIndex method retrieves their
positions in the string. Using these positions, the program slices the original
string and constructs an array that includes both substrings and delimiters.

The output shows the delimiters embedded within the split parts, making this
approach useful for cases where the delimiters are essential for further
processing or formatting. This method can be adapted for various patterns and
delimiters, offering flexibility when working with structured text.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.Split method in Go with
practical examples of string splitting using regular expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).