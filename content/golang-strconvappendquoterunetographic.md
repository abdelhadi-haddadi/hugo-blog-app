+++
title = "Golang strconv.AppendQuoteRuneToGraphic"
date = 2025-08-29T19:56:12.056+01:00
draft = false
description = "Learn how to append quoted graphic runes to byte slices using strconv.AppendQuoteRuneToGraphic in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendQuoteRuneToGraphic

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendQuoteRuneToGraphic function in Go.
We'll cover rune quoting basics with practical examples.

The strconv.AppendQuoteRuneToGraphic function appends a single-quoted
Go character literal representing the rune to a byte slice. It handles special
characters by escaping them.

This function is particularly useful when you need to safely quote runes for
output or serialization. It ensures non-printable and special characters are
properly escaped.

## Basic AppendQuoteRuneToGraphic Example

The simplest use of AppendQuoteRuneToGraphic appends a quoted rune
to a byte slice. Here we demonstrate basic usage with a printable character.

basic_append.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Rune: ")
    r := 'A'
    
    result := strconv.AppendQuoteRuneToGraphic(buf, r)
    fmt.Println(string(result))
}

We start with a byte slice containing "Rune: ". The function appends the quoted
version of 'A' to this slice. The output shows the properly quoted character.

## Handling Special Characters

AppendQuoteRuneToGraphic automatically escapes special characters.
This example shows how it handles newline and tab characters.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []rune{'\n', '\t', '\'', '\\'}
    
    for _, r := range testCases {
        buf := []byte("Rune: ")
        quoted := strconv.AppendQuoteRuneToGraphic(buf, r)
        fmt.Println(string(quoted))
    }
}

We test various special characters that need escaping. The function properly
quotes each one, using Go escape sequences where necessary.

## Working with Non-Printable Characters

Non-printable characters are also properly handled by this function. This
example demonstrates quoting control characters.

non_printable.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Control char: ")
    r := rune(0x7F) // DEL character
    
    result := strconv.AppendQuoteRuneToGraphic(buf, r)
    fmt.Println(string(result))
}

The DEL character (0x7F) is non-printable. The function escapes it using
hexadecimal notation, making it safe for output.

## Appending Multiple Runes

While designed for single runes, we can use this function in a loop to process
multiple characters. This example shows how.

multiple_runes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    input := "Hello\n世界"
    buf := []byte("Quoted: ")
    
    for _, r := range input {
        buf = strconv.AppendQuoteRuneToGraphic(buf, r)
        buf = append(buf, ' ') // Add space between quoted runes
    }
    
    fmt.Println(string(buf))
}

We process each rune in a string individually. The function handles both ASCII
and Unicode characters correctly, escaping where needed.

## Comparing with QuoteRuneToGraphic

AppendQuoteRuneToGraphic is similar to QuoteRuneToGraphic
but works with byte slices. This example compares both.

comparison.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := 'ß' // German sharp s
    
    // Using QuoteRuneToGraphic
    quotedStr := strconv.QuoteRuneToGraphic(r)
    fmt.Println("String version:", quotedStr)
    
    // Using AppendQuoteRuneToGraphic
    buf := []byte("Byte slice version: ")
    quotedBytes := strconv.AppendQuoteRuneToGraphic(buf, r)
    fmt.Println(string(quotedBytes))
}

Both functions produce the same quoted representation. The append version is
more efficient when building output incrementally.

## Performance Considerations

For building large quoted outputs, pre-allocating buffer space can improve
performance. This example demonstrates the technique.

performance.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    input := "This is a test string with \t and \n"
    // Pre-allocate buffer with estimated capacity
    buf := make([]byte, 0, len(input)*3)
    
    for _, r := range input {
        buf = strconv.AppendQuoteRuneToGraphic(buf, r)
        buf = append(buf, ' ')
    }
    
    fmt.Println("Result:", string(buf))
}

Pre-allocation reduces memory allocations during append operations. The capacity
estimate accounts for quoted runes being longer than originals.

## Practical Example: JSON-like Output

This practical example demonstrates using the function to create JSON-like output
with properly escaped characters.

json_output.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    userInput := "Name\tAge\nAlice\t25\nBob\t30"
    buf := []byte(`{"description": `)
    
    // Start array of quoted runes
    buf = append(buf, '[')
    for i, r := range userInput {
        if i &gt; 0 {
            buf = append(buf, ',', ' ')
        }
        buf = strconv.AppendQuoteRuneToGraphic(buf, r)
    }
    buf = append(buf, ']', '}')
    
    fmt.Println(string(buf))
}

We create a JSON-like structure with each character properly quoted. Special
characters in the input are automatically escaped for safe JSON output.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendQuoteRuneToGraphic function
in Go with practical examples of rune quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).