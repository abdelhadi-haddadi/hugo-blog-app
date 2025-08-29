+++
title = "Golang strconv.AppendQuoteRuneToASCII"
date = 2025-08-29T19:56:12.060+01:00
draft = false
description = "Golang strconv.AppendQuoteRuneToASCII tutorial explains how to append quoted runes to ASCII byte slices in Go with practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuoteRuneToASCII

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuoteRuneToASCII
function in Go. We'll cover rune quoting basics with practical examples.

The strconv.AppendQuoteRuneToASCII function appends a single-quoted
rune to a byte slice. It escapes non-ASCII and non-printable characters.

This function is useful for safely including runes in ASCII-only contexts. It
returns a new byte slice with the quoted rune appended to the original slice.

## Basic AppendQuoteRuneToASCII Example

The simplest use of AppendQuoteRuneToASCII appends a quoted rune
to an existing byte slice. Here we demonstrate basic functionality.

basic_append.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Rune: ")
    r := 'A'
    
    result := strconv.AppendQuoteRuneToASCII(buf, r)
    fmt.Println(string(result))
}

We start with a byte slice containing "Rune: ". We append a quoted 'A' rune to
it. The output shows the original text with the quoted rune added.

## Appending Non-ASCII Runes

AppendQuoteRuneToASCII escapes non-ASCII runes. This example shows
how it handles Unicode characters outside the ASCII range.

non_ascii.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Symbol: ")
    r := '€'  // Euro sign (U+20AC)
    
    result := strconv.AppendQuoteRuneToASCII(buf, r)
    fmt.Println(string(result))
}

The Euro sign (€) is outside ASCII range, so it gets escaped. The output shows
the Unicode escape sequence instead of the actual character.

## Appending Control Characters

Control characters are also escaped by AppendQuoteRuneToASCII. This
example demonstrates handling of special characters.

control_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Control: ")
    r := '\n'  // Newline character
    
    result := strconv.AppendQuoteRuneToASCII(buf, r)
    fmt.Println(string(result))
}

The newline character is escaped as '\n' in the output. This makes the character
visible and safe for ASCII-only contexts.

## Building a Quoted Rune Slice

We can use AppendQuoteRuneToASCII to build a slice with multiple
quoted runes. This example shows incremental construction.

building_slice.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    var buf []byte
    runes := []rune{'H', 'e', 'l', 'l', 'o', ' ', '世', '界'}
    
    for _, r := range runes {
        buf = strconv.AppendQuoteRuneToASCII(buf, r)
        buf = append(buf, ' ')
    }
    
    fmt.Println(string(buf))
}

We start with an empty byte slice and append each quoted rune. Non-ASCII runes
(世 and 界) are escaped. Spaces are added between quoted runes for readability.

## Comparing with QuoteRuneToASCII

AppendQuoteRuneToASCII is similar to QuoteRuneToASCII
but works with byte slices. This example shows both functions.

comparison.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := '¶'  // Pilcrow sign
    
    // Using QuoteRuneToASCII
    quoted := strconv.QuoteRuneToASCII(r)
    fmt.Println("QuoteRuneToASCII:", quoted)
    
    // Using AppendQuoteRuneToASCII
    buf := []byte("AppendQuoteRuneToASCII: ")
    result := strconv.AppendQuoteRuneToASCII(buf, r)
    fmt.Println(string(result))
}

Both functions produce the same quoted output, but AppendQuoteRuneToASCII
works with existing byte slices. This is more efficient for building output.

## Performance Considerations

AppendQuoteRuneToASCII is efficient for building output buffers.
This example benchmarks it against string concatenation.

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
    runes := []rune{'a', 'b', 'c', '1', '2', '3', '§', '©'}
    
    // Benchmark AppendQuoteRuneToASCII
    start := time.Now()
    var buf []byte
    for i := 0; i &lt; iterations; i++ {
        for _, r := range runes {
            buf = strconv.AppendQuoteRuneToASCII(buf, r)
        }
        buf = buf[:0]  // Reset buffer
    }
    fmt.Println("AppendQuoteRuneToASCII:", time.Since(start))
    
    // Benchmark string concatenation
    start = time.Now()
    var s string
    for i := 0; i &lt; iterations; i++ {
        for _, r := range runes {
            s += strconv.QuoteRuneToASCII(r)
        }
        s = ""  // Reset string
    }
    fmt.Println("String concatenation:", time.Since(start))
}

AppendQuoteRuneToASCII is significantly faster than string
concatenation for building large outputs. It avoids repeated allocations.

## Practical Example: JSON Encoding

This practical example demonstrates using AppendQuoteRuneToASCII to
build a simple JSON string with proper escaping.

json_encoding.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    var buf []byte
    name := "José"
    value := 42
    
    buf = append(buf, `{"name":"`...)
    for _, r := range name {
        buf = strconv.AppendQuoteRuneToASCII(buf, r)
    }
    buf = append(buf, `","value":`...)
    buf = strconv.AppendInt(buf, int64(value), 10)
    buf = append(buf, '}')
    
    fmt.Println(string(buf))
}

We build a JSON object with a string containing non-ASCII characters. The runes
are properly quoted and escaped. The integer value is appended directly.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuoteRuneToASCII function
in Go with practical examples of rune quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).