+++
title = "Golang strconv.QuoteRune"
date = 2025-08-29T19:56:18.881+01:00
draft = false
description = "Learn how to quote runes using strconv.QuoteRune in Go. Includes practical examples and escaping rules."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.QuoteRune

last modified April 20, 2025

This tutorial explains how to use the strconv.QuoteRune function in Go.
We'll cover rune quoting basics with practical examples.

The strconv.QuoteRune function converts a rune to a single-quoted Go
string literal. It adds quotes and escapes special characters as needed.

QuoteRune is useful when you need to safely represent runes as string literals.
It handles all Unicode characters and Go-specific escape sequences properly.

## Basic strconv.QuoteRune Example

The simplest use of strconv.QuoteRune converts a rune to a quoted
string. Here we demonstrate basic quoting of ASCII and Unicode runes.

basic_quoterune.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r1 := 'A'
    r2 := '世'
    
    q1 := strconv.QuoteRune(r1)
    q2 := strconv.QuoteRune(r2)
    
    fmt.Println("ASCII rune quoted:", q1)
    fmt.Println("Unicode rune quoted:", q2)
}

We convert two runes to quoted strings. The ASCII 'A' becomes "'A'" while the
Unicode '世' becomes "'世'". The function handles both cases correctly.

## Escaping Special Characters

strconv.QuoteRune automatically escapes special characters. This
example shows how it handles control characters and quotes.

escaping.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r1 := '\n'
    r2 := '\''
    r3 := '\\'
    
    fmt.Println("Newline quoted:", strconv.QuoteRune(r1))
    fmt.Println("Single quote quoted:", strconv.QuoteRune(r2))
    fmt.Println("Backslash quoted:", strconv.QuoteRune(r3))
}

Special characters are escaped with backslashes. Newline becomes "'\n'", single
quote becomes "'\\''", and backslash becomes "'\\\\'".

## Quoting Non-Printable Characters

Non-printable characters are quoted using their escape sequences. This example
shows how QuoteRune handles various non-printable runes.

non_printable.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    runes := []rune{'\a', '\b', '\f', '\r', '\t', '\v', 0x7F}
    
    for _, r := range runes {
        quoted := strconv.QuoteRune(r)
        fmt.Printf("%U: %s\n", r, quoted)
    }
}

Each non-printable character is converted to its escape sequence. For example,
the bell character (0x07) becomes "'\\a'" and the backspace becomes "'\\b'".

## Comparing with QuoteRuneToASCII

QuoteRuneToASCII is similar but forces ASCII output. This example
compares both functions with Unicode input.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := '⌘'
    
    q1 := strconv.QuoteRune(r)
    q2 := strconv.QuoteRuneToASCII(r)
    
    fmt.Println("QuoteRune:", q1)
    fmt.Println("QuoteRuneToASCII:", q2)
}

QuoteRune keeps Unicode characters as-is ('⌘' becomes "'⌘'"), while
QuoteRuneToASCII uses escape sequences ("'\\u2318'").

## Handling Invalid UTF-8

Go strings are UTF-8 by default, but runes can be invalid. This example shows
how QuoteRune handles invalid Unicode code points.

invalid_utf8.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Invalid Unicode code point
    r := rune(0xFFFFFFFF)
    
    quoted := strconv.QuoteRune(r)
    fmt.Println("Invalid rune quoted:", quoted)
}

Invalid runes are quoted using the hexadecimal escape sequence. The output will
be "'\\Uffffffff'" for the invalid rune 0xFFFFFFFF.

## Practical Example: Rune Debugging

This practical example demonstrates using QuoteRune for debugging rune values in
a string processing application.

debug_runes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    input := "Hello, 世界!\n"
    
    for _, r := range input {
        quoted := strconv.QuoteRune(r)
        fmt.Printf("%-6U %s\n", r, quoted)
    }
}

We iterate through each rune in a string and print both its Unicode code point
and quoted representation. This helps identify special characters in strings.

## Performance Considerations

For performance-critical code, understanding QuoteRune's overhead is important.
This example benchmarks QuoteRune against manual quoting.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func manualQuoteRune(r rune) string {
    return "'" + string(r) + "'"
}

func main() {
    const iterations = 1000000
    r := 'A'
    
    // Benchmark QuoteRune
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.QuoteRune(r)
    }
    fmt.Println("QuoteRune duration:", time.Since(start))
    
    // Benchmark manual quoting
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        manualQuoteRune(r)
    }
    fmt.Println("Manual quoting duration:", time.Since(start))
}

QuoteRune is slower than manual quoting but handles all edge cases.
Use manual quoting only when you control all possible input values.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.QuoteRune function in Go with
practical examples of rune quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).