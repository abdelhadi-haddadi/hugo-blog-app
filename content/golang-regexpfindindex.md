+++
title = "Golang Regexp.FindIndex"
date = 2025-08-29T19:55:41.422+01:00
draft = false
description = "Learn how to find indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindIndex method in Go.
We'll cover basic usage and provide practical examples of finding match locations.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindIndex method locates the leftmost match in a byte
slice. It returns a two-element slice of integers defining the match location.

## Basic FindIndex Example

The simplest use of FindIndex finds the first match in a string.
Here we locate the position of a simple word.

basic_findindex.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`hello`)
    text := []byte("say hello to my little friend")
    
    index := re.FindIndex(text)
    fmt.Println(index) // [4 9]
}

The output shows the start and end positions of "hello" in the byte slice.
Positions are zero-based and the end index is exclusive.

## Finding Multiple Matches

To find all matches in a string, we use FindAllIndex. This example
shows how to locate all numbers in text.

find_all_index.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := []byte("2025 is coming after 2024")
    
    indexes := re.FindAllIndex(text, -1)
    for _, idx := range indexes {
        fmt.Printf("Found at %v: %s\n", idx, text[idx[0]:idx[1]])
    }
}

The pattern matches one or more digits. FindAllIndex returns all
matches with their positions. The -1 means find all matches.

## Case Insensitive Matching

We can find matches regardless of case by compiling with regexp.Compile.
This example shows case-insensitive word matching.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)hello`)
    text := []byte("Hello world, HELLO universe")
    
    indexes := re.FindAllIndex(text, -1)
    for _, idx := range indexes {
        fmt.Printf("Found at %v: %s\n", idx, text[idx[0]:idx[1]])
    }
}

The (?i) flag makes the match case-insensitive. Both "Hello" and
"HELLO" are found at their respective positions.

## Finding Submatch Indexes

FindSubmatchIndex locates both the full match and capture groups.
Here we extract date component positions.

submatch_index.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    text := []byte("Date: 2025-04-20")
    
    indexes := re.FindSubmatchIndex(text)
    if indexes != nil {
        fmt.Println("Full match:", indexes[0:2])
        fmt.Println("Year:", indexes[2:4])
        fmt.Println("Month:", indexes[4:6])
        fmt.Println("Day:", indexes[6:8])
    }
}

The output shows positions for the full date and each component. Even indexes are
starts, odd indexes are ends of matches.

## Finding Index in Large Text

For large texts, we can use FindReaderIndex with an io.Reader.
This avoids loading the entire text into memory.

reader_index.go
  

package main

import (
    "bytes"
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`important`)
    largeText := bytes.NewReader([]byte("This is an important notice about something important"))
    
    idx := re.FindReaderIndex(largeText)
    fmt.Println("First match:", idx)
}

The method works similarly to FindIndex but reads from a stream.
It's efficient for processing large files or network streams.

## Handling No Matches

When no match is found, FindIndex returns nil. This
example demonstrates proper handling of no-match cases.

no_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`missing`)
    text := []byte("this text doesn't contain the pattern")
    
    index := re.FindIndex(text)
    if index == nil {
        fmt.Println("Pattern not found")
    } else {
        fmt.Println("Found at:", index)
    }
}

Always check for nil before using the result. This prevents
potential panics when accessing the slice indexes.

## Performance Considerations

For repeated searches, compile the regex once and reuse it. This example
compares single-use vs reused regex performance.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    text := []byte("sample text with pattern to find")
    
    start := time.Now()
    for i := 0; i &lt; 1000; i++ {
        re := regexp.MustCompile(`pattern`)
        re.FindIndex(text)
    }
    fmt.Println("Recompile each time:", time.Since(start))
    
    start = time.Now()
    re := regexp.MustCompile(`pattern`)
    for i := 0; i &lt; 1000; i++ {
        re.FindIndex(text)
    }
    fmt.Println("Reuse compiled regex:", time.Since(start))
}

The benchmark shows significant performance gains from reusing compiled regex
objects. Always compile patterns once when possible.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindIndex method in Go with
practical examples of finding match positions in text.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).