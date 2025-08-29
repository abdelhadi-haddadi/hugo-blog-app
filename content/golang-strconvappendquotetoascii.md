+++
title = "Golang strconv.AppendQuoteToASCII"
date = 2025-08-29T19:56:12.041+01:00
draft = false
description = "Learn how to append quoted ASCII strings to byte slices using strconv.AppendQuoteToASCII in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuoteToASCII

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuoteToASCII function in Go.
We'll cover string quoting in ASCII format with practical examples.

The strconv.AppendQuoteToASCII function appends a double-quoted Go string
representation of the input string to a byte slice. It escapes non-ASCII characters.

This function is useful when you need to generate ASCII-only output or work with
systems that require ASCII encoding. It's part of Go's strconv package.

## Basic AppendQuoteToASCII Example

The simplest use of strconv.AppendQuoteToASCII appends a quoted string
to a byte slice. Here we demonstrate basic functionality.

basic_append.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Prefix: ")
    str := "Hello, 世界"
    
    result := strconv.AppendQuoteToASCII(buf, str)
    fmt.Println(string(result))
}

We start with a byte slice containing "Prefix: ". We append a quoted version of
"Hello, 世界" to it. Non-ASCII characters are escaped in the output.

## Appending to an Empty Slice

strconv.AppendQuoteToASCII can work with empty slices. This example
shows how to create a new quoted string from scratch.

empty_slice.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    var buf []byte
    str := "Golang"
    
    result := strconv.AppendQuoteToASCII(buf, str)
    fmt.Println("Result:", string(result))
    fmt.Println("Original buffer:", string(buf))
}

We start with an empty byte slice and append a quoted string. The original buffer
remains unchanged, as AppendQuoteToASCII returns a new slice.

## Handling Special Characters

This example demonstrates how AppendQuoteToASCII handles special
characters and escape sequences in the input string.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    tests := []string{
        "Line\nBreak",
        "Tab\tHere",
        "Quote\"Inside",
        "Back\\Slash",
        "Bell\aSound",
    }
    
    for _, s := range tests {
        quoted := strconv.AppendQuoteToASCII([]byte{}, s)
        fmt.Println(string(quoted))
    }
}

Each special character is properly escaped in the output. The function handles
newlines, tabs, quotes, backslashes, and other special characters.

## Comparing with QuoteToASCII

While QuoteToASCII returns a string, AppendQuoteToASCII
works with byte slices. This example shows both approaches.

compare.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello\nWorld"
    
    // Using QuoteToASCII
    quotedStr := strconv.QuoteToASCII(str)
    fmt.Println("QuoteToASCII:", quotedStr)
    
    // Using AppendQuoteToASCII
    quotedBytes := strconv.AppendQuoteToASCII([]byte("Bytes: "), str)
    fmt.Println("AppendQuoteToASCII:", string(quotedBytes))
}

AppendQuoteToASCII is more efficient when working with byte buffers,
as it avoids unnecessary string allocations. Both functions produce the same quoting.

## Building a JSON String

This practical example shows how to use AppendQuoteToASCII to build
a JSON string value efficiently.

json_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    jsonBuf := []byte(`{"name": `)
    name := "Alice \"The Boss\""
    
    jsonBuf = strconv.AppendQuoteToASCII(jsonBuf, name)
    jsonBuf = append(jsonBuf, `}`...)
    
    fmt.Println("JSON:", string(jsonBuf))
}

We build a JSON object with a quoted string value. The function properly escapes
quotes within the string. This approach is efficient for building JSON manually.

## Performance Considerations

For performance-critical code, pre-allocating buffer space can help. This example
shows how to optimize repeated appends.

performance.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Pre-allocate buffer with estimated capacity
    buf := make([]byte, 0, 100)
    
    names := []string{"Alice", "Bob", "Charlie"}
    for _, name := range names {
        buf = strconv.AppendQuoteToASCII(buf, name)
        buf = append(buf, '\n')
    }
    
    fmt.Println("Names list:")
    fmt.Println(string(buf))
}

Pre-allocating buffer space reduces memory allocations during append operations.
This is especially useful when processing many strings or building large outputs.

## Handling Non-ASCII Characters

This example demonstrates how AppendQuoteToASCII escapes non-ASCII
characters in the input string.

non_ascii.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    tests := []string{
        "Hello, 世界",
        "こんにちは",
        "Привет",
        "🎉 Party!",
    }
    
    for _, s := range tests {
        quoted := strconv.AppendQuoteToASCII([]byte{}, s)
        fmt.Printf("Original: %s\nQuoted: %s\n\n", s, quoted)
    }
}

Non-ASCII characters are escaped using Go string literal syntax. This ensures the
output contains only ASCII characters, making it safe for ASCII-only systems.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuoteToASCII function in Go with
practical examples of string quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).