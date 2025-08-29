+++
title = "Golang strconv.AppendQuoteRune"
date = 2025-08-29T19:56:10.852+01:00
draft = false
description = "Learn how to append quoted runes to byte slices using strconv.AppendQuoteRune in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuoteRune

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuoteRune function in Go.
We'll cover rune quoting basics with practical examples.

The strconv.AppendQuoteRune function appends a single-quoted rune
representation to a byte slice. It's useful for efficient string building.

The function handles escaping special characters and returns the extended byte
slice. It's more efficient than string concatenation for building quoted output.

## Basic strconv.AppendQuoteRune Example

The simplest use of strconv.AppendQuoteRune appends a quoted rune
to a byte slice. Here we demonstrate basic usage.

basic_append.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Rune: ")
    buf = strconv.AppendQuoteRune(buf, 'A')
    
    fmt.Println(string(buf))
}

We start with a byte slice containing "Rune: ". We append a quoted 'A' rune to it.
The output shows the combined result converted back to a string.

## Appending Special Characters

strconv.AppendQuoteRune automatically escapes special characters.
This example shows how it handles various runes.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Quoted: ")
    
    runes := []rune{'\n', '\t', '\'', '\\', '字'}
    
    for _, r := range runes {
        buf = strconv.AppendQuoteRune(buf, r)
        buf = append(buf, ' ')
    }
    
    fmt.Println(string(buf))
}

We append several special runes to a buffer. The function properly escapes
newlines, tabs, quotes, and backslashes. Non-ASCII runes are also handled.

## Building a Quoted Rune List

This example demonstrates building a list of quoted runes efficiently using
AppendQuoteRune in a loop.

rune_list.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Runes: [")
    runes := []rune{'a', 'b', 'c', '☺', '世'}
    
    for i, r := range runes {
        if i &gt; 0 {
            buf = append(buf, ',', ' ')
        }
        buf = strconv.AppendQuoteRune(buf, r)
    }
    
    buf = append(buf, ']')
    fmt.Println(string(buf))
}

We build a comma-separated list of quoted runes. The function efficiently
appends each quoted rune to the buffer without creating intermediate strings.

## Comparing with QuoteRune

This example compares AppendQuoteRune with QuoteRune
to show the performance benefits of the append version.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func main() {
    // Using QuoteRune (less efficient)
    var builder strings.Builder
    builder.WriteString("Using QuoteRune: ")
    builder.WriteString(strconv.QuoteRune('X'))
    fmt.Println(builder.String())
    
    // Using AppendQuoteRune (more efficient)
    buf := []byte("Using AppendQuoteRune: ")
    buf = strconv.AppendQuoteRune(buf, 'X')
    fmt.Println(string(buf))
}

AppendQuoteRune is more efficient when building output incrementally.
It avoids creating intermediate string objects like QuoteRune does.

## Appending to Existing JSON

This practical example shows using AppendQuoteRune when building
JSON output with quoted rune values.

json_example.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte(`{"symbols": [`)

    symbols := []rune{'€', '$', '¥', '£'}
    
    for i, s := range symbols {
        if i &gt; 0 {
            buf = append(buf, ',', ' ')
        }
        buf = strconv.AppendQuoteRune(buf, s)
    }
    
    buf = append(buf, ']', '}')
    fmt.Println(string(buf))
}

We construct a JSON array of quoted currency symbols. The function ensures each
rune is properly quoted and escaped in the JSON output.

## Handling Invalid UTF-8

This example demonstrates how AppendQuoteRune handles invalid
UTF-8 runes by escaping them properly.

invalid_utf8.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Invalid: ")
    
    // Invalid UTF-8 sequence
    invalidRune := rune(0xDC00) // Lone surrogate
    
    buf = strconv.AppendQuoteRune(buf, invalidRune)
    fmt.Println(string(buf))
}

The function properly escapes invalid UTF-8 runes using Go's escape sequence
format. This ensures the output remains valid UTF-8 even with bad input.

## Performance Benchmark

This example benchmarks AppendQuoteRune against string
concatenation to show its performance benefits.

benchmark.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
    "time"
)

func main() {
    const iterations = 100000
    testRune := '世'
    
    // Benchmark AppendQuoteRune
    start := time.Now()
    buf := make([]byte, 0, iterations*6)
    for i := 0; i &lt; iterations; i++ {
        buf = strconv.AppendQuoteRune(buf, testRune)
    }
    _ = string(buf)
    fmt.Println("AppendQuoteRune:", time.Since(start))
    
    // Benchmark string concatenation
    start = time.Now()
    var s strings.Builder
    for i := 0; i &lt; iterations; i++ {
        s.WriteString(strconv.QuoteRune(testRune))
    }
    _ = s.String()
    fmt.Println("String concat:", time.Since(start))
}

AppendQuoteRune is significantly faster for building large quoted
outputs. It avoids memory allocations by working directly with byte slices.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuoteRune function in Go with
practical examples of efficient rune quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).