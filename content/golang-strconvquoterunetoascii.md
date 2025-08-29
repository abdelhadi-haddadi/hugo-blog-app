+++
title = "Golang strconv.QuoteRuneToASCII"
date = 2025-08-29T19:56:18.862+01:00
draft = false
description = "Learn how to convert runes to ASCII-quoted strings in Go using strconv.QuoteRuneToASCII. Includes examples and practical use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.QuoteRuneToASCII

last modified April 20, 2025

This tutorial explains how to use the strconv.QuoteRuneToASCII function in Go.
We'll cover rune-to-string conversion basics with practical examples.

The strconv.QuoteRuneToASCII function converts a rune to an ASCII-quoted string.
It's useful for safely representing runes in ASCII-only contexts.

The function returns a single-quoted string literal representing the rune.
Non-ASCII and special characters are escaped using Go escape sequences.

## Basic QuoteRuneToASCII Example

The simplest use of strconv.QuoteRuneToASCII converts a rune to a quoted string.
Here we demonstrate basic ASCII and non-ASCII rune conversion.

basic_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := 'A'
    quoted := strconv.QuoteRuneToASCII(r)
    fmt.Printf("Rune '%c' quoted: %s\n", r, quoted)
    
    r2 := '世'
    quoted2 := strconv.QuoteRuneToASCII(r2)
    fmt.Printf("Rune '%c' quoted: %s\n", r2, quoted2)
}

We convert both ASCII and non-ASCII runes to quoted strings. The non-ASCII rune
is escaped using Unicode escape sequences. The output shows the quoted forms.

## Handling Special Characters

strconv.QuoteRuneToASCII properly escapes special characters.
This example shows how control characters are handled.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    specialChars := []rune{'\n', '\t', '\'', '\\', '\x00'}
    
    for _, r := range specialChars {
        quoted := strconv.QuoteRuneToASCII(r)
        fmt.Printf("Rune %U quoted: %s\n", r, quoted)
    }
}

We test various special characters including newline, tab, and null. Each is
properly escaped in the output. The function ensures safe representation.

## Comparing with QuoteRune

This example compares QuoteRuneToASCII with QuoteRune.
The difference is in how non-ASCII characters are handled.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := '語'
    
    quotedASCII := strconv.QuoteRuneToASCII(r)
    quotedRegular := strconv.QuoteRune(r)
    
    fmt.Println("QuoteRuneToASCII:", quotedASCII)
    fmt.Println("QuoteRune:", quotedRegular)
}

QuoteRuneToASCII escapes non-ASCII characters while QuoteRune
keeps them as-is. The output shows the difference in representation.

## Working with Unicode Values

This example demonstrates how Unicode values outside the Basic Multilingual Plane
are handled by QuoteRuneToASCII.

unicode_values.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    highUnicode := []rune{
        '\U0001F600', // 😀
        '\U0001F680', // 🚀
        '\U0001F4A9', // 💩
    }
    
    for _, r := range highUnicode {
        quoted := strconv.QuoteRuneToASCII(r)
        fmt.Printf("Rune %U quoted: %s\n", r, quoted)
    }
}

Emoji and other high Unicode characters are properly escaped. The function
represents them using \U followed by 8 hex digits.

## Generating JSON-Compatible Strings

QuoteRuneToASCII can help generate JSON-compatible string representations.
This example shows its use in JSON encoding contexts.

json_compatible.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    runes := []rune{'A', '"', '\\', '\n', '世'}
    
    fmt.Print("[")
    for i, r := range runes {
        if i &gt; 0 {
            fmt.Print(", ")
        }
        fmt.Print(strconv.QuoteRuneToASCII(r))
    }
    fmt.Println("]")
}

We create a JSON-like array of quoted runes. Special characters are properly
escaped, making the output valid JSON. This demonstrates practical usage.

## Performance Considerations

For performance-critical code, understanding the overhead of rune quoting is
important. This example benchmarks QuoteRuneToASCII.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    testRunes := []rune{'A', '世', '\n', '\U0001F600'}
    
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        for _, r := range testRunes {
            strconv.QuoteRuneToASCII(r)
        }
    }
    fmt.Println("QuoteRuneToASCII duration:", time.Since(start))
}

The benchmark shows the performance of quoting different rune types. ASCII runes
are faster to quote than non-ASCII ones. Consider caching results if needed.

## Practical Example: Rune Escaper

This practical example demonstrates using QuoteRuneToASCII to create
a rune escaper function for safe output.

rune_escaper.go
  

package main

import (
    "fmt"
    "strconv"
)

func escapeRunes(input string) string {
    var result string
    for _, r := range input {
        result += strconv.QuoteRuneToASCII(r)
    }
    return result
}

func main() {
    testString := "Hello\n世界🚀"
    fmt.Println("Original:", testString)
    fmt.Println("Escaped:", escapeRunes(testString))
}

We create a function that escapes all runes in a string. The output shows how
each character is safely represented. This is useful for debugging or logging.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.QuoteRuneToASCII function in Go
with practical examples of rune-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).