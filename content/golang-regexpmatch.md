+++
title = "Golang Regexp.Match"
date = 2025-08-29T19:55:43.632+01:00
draft = false
description = "Learn how to match patterns using regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.Match

last modified April 20, 2025

This tutorial explains how to use the Regexp.Match method in Go.
We'll cover byte slice matching and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings or byte slices.

The Regexp.Match method reports whether the compiled regular
expression matches any part of the byte slice b. It's useful for raw byte data.

## Basic Regexp.Match Example

The simplest use of Regexp.Match checks if a byte slice matches
a pattern. Here we check for a simple word match in bytes.

basic_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re := regexp.MustCompile(`hello`)
    data := []byte("hello there")

    fmt.Println(re.Match(data)) // true
    fmt.Println(re.Match([]byte("goodbye"))) // false
}

We compile the pattern "hello" and use Match to test byte slices.
The method returns true if the pattern is found in the input bytes.

## Matching Numbers in Byte Data

This example demonstrates matching numeric patterns in raw byte data.

number_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {

    re := regexp.MustCompile(`\d+`)
    data := []byte("The price is 123 USD")

    if re.Match(data) {
        fmt.Println("Number found in data")
    } else {
        fmt.Println("No numbers found")
    }
}

The pattern matches one or more digits. Match scans the byte slice
for any numeric sequence. This is useful for binary data processing.

## Case-Insensitive Matching

Regexp.Match can perform case-insensitive matching when the
pattern is compiled with appropriate flags.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re := regexp.MustCompile(`(?i)hello`)
    data1 := []byte("Hello there")
    data2 := []byte("HELLO there")

    fmt.Println(re.Match(data1)) // true
    fmt.Println(re.Match(data2)) // true
    fmt.Println(re.Match([]byte("goodbye"))) // false
}

The (?i) flag makes the match case-insensitive. The pattern matches
any case variation of "hello" in the byte data.

## Matching Binary Data Patterns

This example shows how to match specific byte patterns in binary data.

binary_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    // Match a specific byte sequence (PNG header)
    re := regexp.MustCompile(`\x89PNG\x0D\x0A\x1A\x0A`)
    pngHeader := []byte{0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A}
    jpegHeader := []byte{0xFF, 0xD8, 0xFF}

    fmt.Println("Is PNG:", re.Match(pngHeader)) // true
    fmt.Println("Is JPEG:", re.Match(jpegHeader)) // false
}

We match the magic number that identifies PNG files. Match is
particularly useful for binary file format detection.

## Matching Multiple Patterns

You can combine patterns using alternation to match multiple possibilities.

multi_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re := regexp.MustCompile(`error|warning|critical`)
    logData := []byte("2025-04-20 12:00:00 [error] Connection failed")

    if re.Match(logData) {
        fmt.Println("Log contains important message")
    } else {
        fmt.Println("Log looks normal")
    }
}

The pattern matches any of three log severity levels. Match scans
for any of these patterns in the byte data.

## Performance with Large Data

Regexp.Match is efficient for scanning large byte slices.
Here's an example with a larger dataset.

large_data.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    
    re := regexp.MustCompile(`secret`)
    // Simulate large data (1MB)
    largeData := []byte(strings.Repeat("x", 1&lt;&lt;20) + "secret")

    if re.Match(largeData) {
        fmt.Println("Secret found in large data")
    } else {
        fmt.Println("No secret found")
    }
}

The method efficiently scans through 1MB of data to find the pattern. Compiled
regex patterns are optimized for performance.

## Anchored Matching

You can anchor patterns to match at specific positions in the byte slice.

anchored_match.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    
    re := regexp.MustCompile(`^START`)
    data1 := []byte("START of data")
    data2 := []byte("Data with START in middle")

    fmt.Println(re.Match(data1)) // true
    fmt.Println(re.Match(data2)) // false
}

The ^ anchor ensures the pattern only matches at the start of the
byte slice. This is useful for protocol headers or fixed-format data.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.Match method in Go with
practical examples of byte slice pattern matching.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).