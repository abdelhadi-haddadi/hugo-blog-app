+++
title = "Golang strconv.AppendQuoteToGraphic"
date = 2025-08-29T19:56:13.239+01:00
draft = false
description = "Learn how to append quoted graphic strings to byte slices using strconv.AppendQuoteToGraphic in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuoteToGraphic

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuoteToGraphic function in Go.
We'll cover string quoting with graphic characters using practical examples.

The strconv.AppendQuoteToGraphic function appends a double-quoted Go
string literal to a byte slice. It escapes non-printable and non-graphic characters.

This function is useful when you need to safely quote strings containing special
characters. It's part of Go's strconv package for string conversion utilities.

## Basic AppendQuoteToGraphic Example

This example shows the basic usage of AppendQuoteToGraphic with a
simple string containing graphic characters.

basic_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Prefix: ")
    str := "Hello, 世界"
    
    quoted := strconv.AppendQuoteToGraphic(buf, str)
    fmt.Println(string(quoted))
}

We start with a byte slice containing "Prefix: ". The function appends the quoted
version of "Hello, 世界". The output shows the properly quoted string.

## Handling Non-Graphic Characters

This example demonstrates how AppendQuoteToGraphic handles non-graphic
characters by escaping them.

non_graphic.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte{}
    str := "Line1\nLine2\tTab\x07Bell"
    
    quoted := strconv.AppendQuoteToGraphic(buf, str)
    fmt.Println(string(quoted))
}

The input string contains newline, tab, and bell characters. These are escaped in
the output to maintain readability and safety in the quoted string.

## Appending Multiple Strings

This example shows how to efficiently append multiple quoted strings to a buffer.

multiple_strings.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Data: ")
    strings := []string{"Apple", "Banana", "Cherry"}
    
    for _, s := range strings {
        buf = strconv.AppendQuoteToGraphic(buf, s)
        buf = append(buf, ' ')
    }
    
    fmt.Println(string(buf))
}

We start with a buffer and append each quoted string followed by a space. This
pattern is useful for building complex output with proper quoting.

## Comparing with QuoteToGraphic

This example compares AppendQuoteToGraphic with QuoteToGraphic
to show their differences.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Special\tChars"
    
    // Using QuoteToGraphic
    quoted1 := strconv.QuoteToGraphic(str)
    fmt.Println("QuoteToGraphic:", quoted1)
    
    // Using AppendQuoteToGraphic
    buf := []byte("Appended: ")
    quoted2 := strconv.AppendQuoteToGraphic(buf, str)
    fmt.Println("AppendQuoteToGraphic:", string(quoted2))
}

QuoteToGraphic returns a new string, while AppendQuoteToGraphic
appends to an existing byte slice. Choose based on your memory allocation needs.

## Performance Considerations

This example benchmarks AppendQuoteToGraphic against string
concatenation for building quoted output.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
    "time"
)

func main() {
    const iterations = 100000
    str := "Test\x1bString"
    
    // Benchmark AppendQuoteToGraphic
    start := time.Now()
    buf := []byte{}
    for i := 0; i &lt; iterations; i++ {
        buf = strconv.AppendQuoteToGraphic(buf[:0], str)
    }
    fmt.Println("AppendQuoteToGraphic:", time.Since(start))
    
    // Benchmark QuoteToGraphic + concatenation
    start = time.Now()
    var s string
    for i := 0; i &lt; iterations; i++ {
        s = strconv.QuoteToGraphic(str)
    }
    _ = s
    fmt.Println("QuoteToGraphic:", time.Since(start))
}

AppendQuoteToGraphic is more efficient when building large outputs
as it avoids intermediate string allocations. The difference grows with scale.

## Handling Empty Strings

This example demonstrates how AppendQuoteToGraphic handles empty
strings and strings with only non-graphic characters.

empty_strings.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    cases := []string{"", "\x00\x01\x02", "   "}
    
    for _, s := range cases {
        buf := []byte("Result: ")
        quoted := strconv.AppendQuoteToGraphic(buf, s)
        fmt.Println(string(quoted))
    }
}

Empty strings are quoted as empty. Non-graphic characters are escaped. Spaces
are preserved as they are considered graphic characters.

## Practical Example: JSON Encoding

This practical example shows using AppendQuoteToGraphic to build
a simple JSON string with proper escaping.

json_encoding.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    data := map[string]string{
        "name":    "Alice\nBob",
        "address": "123 Main St\tApt 4",
    }
    
    buf := []byte{'{'}
    first := true
    
    for k, v := range data {
        if !first {
            buf = append(buf, ',')
        }
        first = false
        
        buf = strconv.AppendQuoteToGraphic(buf, k)
        buf = append(buf, ':')
        buf = strconv.AppendQuoteToGraphic(buf, v)
    }
    
    buf = append(buf, '}')
    fmt.Println(string(buf))
}

We build a JSON object by properly quoting keys and values. The function ensures
special characters are escaped according to JSON rules.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuoteToGraphic function in Go with
practical examples of string quoting with graphic characters in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).