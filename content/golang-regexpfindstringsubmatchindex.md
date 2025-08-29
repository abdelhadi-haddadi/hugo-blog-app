+++
title = "Golang Regexp.FindStringSubmatchIndex"
date = 2025-08-29T19:55:42.519+01:00
draft = false
description = "Learn how to find string submatch indexes using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindStringSubmatchIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindStringSubmatchIndex method in Go.
We'll cover its functionality and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindStringSubmatchIndex method returns a slice holding
the index pairs identifying the leftmost match and its submatches.

## Basic FindStringSubmatchIndex Example

The simplest use of FindStringSubmatchIndex finds matches and their
positions. Here we locate a simple word and its position.

basic_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`hello`)
    str := "hello world"
    
    indices := re.FindStringSubmatchIndex(str)
    fmt.Println(indices) // [0 5]
    
    if indices != nil {
        fmt.Println("Match found at:", indices[0], "to", indices[1])
        fmt.Println("Matched text:", str[indices[0]:indices[1]])
    }
}

The method returns a slice where [0] is the start index and [1] is the end index
of the match. We can use these to extract the matched substring.

## Finding Submatch Positions

This example shows how to get positions for parenthesized subexpressions.
We'll parse a date string and get component positions.

submatch_positions.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    str := "Today is 2025-04-20"
    
    indices := re.FindStringSubmatchIndex(str)
    if indices != nil {
        fmt.Println("Full match:", str[indices[0]:indices[1]])
        fmt.Println("Year:", str[indices[2]:indices[3]])
        fmt.Println("Month:", str[indices[4]:indices[5]])
        fmt.Println("Day:", str[indices[6]:indices[7]])
    }
}

The indices alternate between start and end positions. The full match is at [0:1],
first submatch at [2:3], second at [4:5], etc.

## Extracting Multiple Matches

This example demonstrates finding all matches and their positions in a string.
We'll locate all words starting with 'h'.

multiple_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\bh\w+`)
    str := "hello world, hi there, how are you?"
    
    allIndices := re.FindAllStringSubmatchIndex(str, -1)
    for _, indices := range allIndices {
        word := str[indices[0]:indices[1]]
        fmt.Printf("Found '%s' at %d-%d\n", word, indices[0], indices[1])
    }
}

FindAllStringSubmatchIndex returns a slice of index slices. Each
inner slice contains positions for one match.

## Named Capture Groups

This example shows how to work with named capture groups and their positions.
We'll parse a URL into components.

named_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;protocol&gt;https?)://(?P&lt;host&gt;[^/]+)(?P&lt;path&gt;/.*)?`)
    str := "https://example.com/path/to/resource"
    
    indices := re.FindStringSubmatchIndex(str)
    if indices != nil {
        for i, name := range re.SubexpNames() {
            if i != 0 &amp;&amp; name != "" {
                start, end := indices[2*i], indices[2*i+1]
                fmt.Printf("%s: %s\n", name, str[start:end])
            }
        }
    }
}

Named groups are accessed via SubexpNames. The indices follow the
same pattern but can be mapped to names for clarity.

## Validating and Extracting Data

This example validates a string format while extracting components. We'll check
a phone number format and get its parts.

validation_extraction.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^(\d{3})-(\d{3})-(\d{4})$`)
    phone := "123-456-7890"
    
    indices := re.FindStringSubmatchIndex(phone)
    if indices != nil {
        fmt.Println("Valid phone number")
        fmt.Println("Area code:", phone[indices[2]:indices[3]])
        fmt.Println("Exchange:", phone[indices[4]:indices[5]])
        fmt.Println("Subscriber:", phone[indices[6]:indices[7]])
    } else {
        fmt.Println("Invalid phone number format")
    }
}

The method serves dual purpose: validation through non-nil return and data
extraction through the position indices.

## Complex Pattern Matching

This example demonstrates a more complex pattern with nested groups. We'll parse
log entries with timestamps and severity levels.

complex_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`^\[(?P&lt;time&gt;\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?P&lt;level&gt;\w+): (?P&lt;message&gt;.*)`)
    log := "[2025-04-20 14:30:00] ERROR: Database connection failed"
    
    indices := re.FindStringSubmatchIndex(log)
    if indices != nil {
        names := re.SubexpNames()
        for i := 1; i &lt; len(names); i++ {
            start, end := indices[2*i], indices[2*i+1]
            fmt.Printf("%s: %s\n", names[i], log[start:end])
        }
    }
}

The pattern uses named groups for clarity. The indices array grows with each
additional capturing group in the pattern.

## Performance Considerations

When performance matters, consider reusing compiled patterns and results.
This example benchmarks different approaches.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    str := "sample text with multiple 2025-04-20 dates to 2025-04-21 find"
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    
    // Approach 1: Compile and find in loop
    start := time.Now()
    for i := 0; i &lt; 1000; i++ {
        re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
        re.FindStringSubmatchIndex(str)
    }
    fmt.Println("Compile in loop:", time.Since(start))
    
    // Approach 2: Precompile and reuse
    start = time.Now()
    for i := 0; i &lt; 1000; i++ {
        re.FindStringSubmatchIndex(str)
    }
    fmt.Println("Reuse compiled:", time.Since(start))
}

The benchmark shows significant performance gains from reusing compiled patterns.
Always prefer precompiling when possible.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindStringSubmatchIndex method
in Go with practical examples of pattern matching and position extraction.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).