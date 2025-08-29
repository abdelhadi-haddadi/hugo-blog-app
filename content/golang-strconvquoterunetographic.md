+++
title = "Golang strconv.QuoteRuneToGraphic"
date = 2025-08-29T19:56:19.974+01:00
draft = false
description = "Learn how to use strconv.QuoteRuneToGraphic in Go to quote runes with graphic representation. Includes practical examples and comparisons."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.QuoteRuneToGraphic

last modified April 20, 2025

This tutorial explains how to use the strconv.QuoteRuneToGraphic function in Go.
We'll cover rune quoting basics with practical examples.

The strconv.QuoteRuneToGraphic function quotes a rune as a Go string literal.
It returns a single-quoted Go character literal.

The function is similar to strconv.QuoteRune but only escapes non-graphic
characters. Graphic characters include letters, marks, numbers, punctuation, and symbols.

## Basic strconv.QuoteRuneToGraphic Example

The simplest use of strconv.QuoteRuneToGraphic quotes a graphic rune.
Here we demonstrate basic usage with common characters.

basic_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := 'A'
    quoted := strconv.QuoteRuneToGraphic(r)
    fmt.Printf("Original: %U, Quoted: %s\n", r, quoted)
    
    r = '☺'
    quoted = strconv.QuoteRuneToGraphic(r)
    fmt.Printf("Original: %U, Quoted: %s\n", r, quoted)
}

We quote two graphic runes: 'A' and the smiley face '☺'. The output shows the
original Unicode code point and the quoted string representation.

## Quoting Non-Graphic Characters

strconv.QuoteRuneToGraphic escapes non-graphic characters. This
example shows how control characters are handled.

non_graphic.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testRunes := []rune{'\n', '\t', 0x7F, ' '}
    
    for _, r := range testRunes {
        quoted := strconv.QuoteRuneToGraphic(r)
        fmt.Printf("%U: %s\n", r, quoted)
    }
}

We test various non-graphic runes including newline, tab, DEL, and space.
The function escapes them using Go escape sequences.

## Comparing QuoteRune and QuoteRuneToGraphic

This example demonstrates the difference between QuoteRune and
QuoteRuneToGraphic for various rune types.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    runes := []rune{'a', '\n', '☺', 0x7F}
    
    for _, r := range runes {
        q1 := strconv.QuoteRune(r)
        q2 := strconv.QuoteRuneToGraphic(r)
        fmt.Printf("%U: QuoteRune=%s, QuoteRuneToGraphic=%s\n", 
            r, q1, q2)
    }
}

QuoteRune escapes more characters than QuoteRuneToGraphic.
The latter only escapes non-graphic characters, leaving graphic characters as-is.

## Working with Unicode Supplementary Planes

QuoteRuneToGraphic handles runes from Unicode supplementary planes
correctly. This example shows quoting of emoji and other high-plane characters.

unicode_planes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    highPlaneRunes := []rune{'🦄', '𐍈', '😀'}
    
    for _, r := range highPlaneRunes {
        quoted := strconv.QuoteRuneToGraphic(r)
        fmt.Printf("%U: %s\n", r, quoted)
    }
}

The function correctly quotes emoji and ancient characters from supplementary
planes. These are considered graphic characters and are not escaped.

## Handling Invalid UTF-8

This example shows how QuoteRuneToGraphic handles invalid UTF-8
sequences when converting runes.

invalid_utf8.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Invalid UTF-8 sequence
    invalidRune := rune(0xDC00) // Lone surrogate
    
    quoted := strconv.QuoteRuneToGraphic(invalidRune)
    fmt.Printf("Invalid rune quoted: %s\n", quoted)
}

The function still produces output for invalid UTF-8 runes, escaping them
according to Go string literal rules. The result is always valid UTF-8.

## Practical Example: Character Escaping

This practical example demonstrates using QuoteRuneToGraphic to
escape characters in user input before display.

escape_input.go
  

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter a character: ")
    
    input, _, err := reader.ReadRune()
    if err != nil {
        fmt.Println("Error reading input:", err)
        return
    }
    
    quoted := strconv.QuoteRuneToGraphic(input)
    fmt.Printf("You entered: %s (quoted: %s)\n", string(input), quoted)
}

We read a single rune from user input and quote it for safe display. This is
useful when showing control characters in a user interface.

## Performance Considerations

For performance-critical code, understanding the overhead of rune quoting is
important. This example benchmarks QuoteRuneToGraphic.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    testRunes := []rune{'A', '☺', '\n', '🦄'}
    
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        for _, r := range testRunes {
            strconv.QuoteRuneToGraphic(r)
        }
    }
    fmt.Println("QuoteRuneToGraphic duration:", time.Since(start))
}

QuoteRuneToGraphic is optimized for performance but creates new
string allocations. For bulk processing, consider alternative approaches.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.QuoteRuneToGraphic function in Go
with practical examples of rune quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).