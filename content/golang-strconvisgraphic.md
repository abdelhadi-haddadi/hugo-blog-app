+++
title = "Golang strconv.IsGraphic"
date = 2025-08-29T19:56:15.499+01:00
draft = false
description = "Learn how to check if a rune is a graphic character using strconv.IsGraphic in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.IsGraphic

last modified April 20, 2025

This tutorial explains how to use the strconv.IsGraphic function in Go.
We'll cover Unicode graphic character detection with practical examples.

The strconv.IsGraphic function reports whether a rune is a "graphic"
character as defined by Unicode. Graphic characters include letters, marks,
numbers, punctuation, symbols, and spaces.

A graphic character is any character intended to be written, printed, or displayed.
This excludes control characters and other non-printing characters.

## Basic strconv.IsGraphic Example

The simplest use of strconv.IsGraphic checks if a rune is graphic.
Here we test several common characters.

basic_isgraphic.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    chars := []rune{'A', ' ', '\n', '€', '\t'}
    
    for _, c := range chars {
        if strconv.IsGraphic(c) {
            fmt.Printf("%c is a graphic character\n", c)
        } else {
            fmt.Printf("%c is not a graphic character\n", c)
        }
    }
}

We test letters, spaces, newlines, and special characters. The function returns
true for visible characters and spaces, false for control characters.

## Testing Unicode Characters

strconv.IsGraphic works with the full Unicode range. This example
tests various Unicode characters from different scripts.

unicode_test.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    tests := []rune{
        'A',         // Latin
        'あ',        // Hiragana
        '汉',        // Han
        '☺',         // Emoji
        '\u200b',    // Zero-width space
        '\u00ad',    // Soft hyphen
    }
    
    for _, r := range tests {
        fmt.Printf("%U %c: %t\n", r, r, strconv.IsGraphic(r))
    }
}

We test characters from different scripts and special cases. The function
correctly identifies visible characters and excludes formatting controls.

## Comparing with IsPrint

IsGraphic is similar to unicode.IsPrint but differs
in handling spaces. This example shows the differences.

isprint_comparison.go
  

package main

import (
    "fmt"
    "strconv"
    "unicode"
)

func main() {
    chars := []rune{' ', '\t', '\n', 'A', '1'}
    
    for _, c := range chars {
        fmt.Printf("%c: IsGraphic=%t, IsPrint=%t\n",
            c, strconv.IsGraphic(c), unicode.IsPrint(c))
    }
}

IsGraphic considers space as graphic while IsPrint
does not. Both agree on other printable characters and control codes.

## Checking String Characters

This example demonstrates checking each character in a string for graphic status.
It's useful for input validation.

string_check.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    input := "Hello\t世界\n"
    
    for i, r := range input {
        if strconv.IsGraphic(r) {
            fmt.Printf("Character %d '%c' is graphic\n", i, r)
        } else {
            fmt.Printf("Character %d (U+%04X) is not graphic\n", i, r)
        }
    }
}

We iterate through each rune in the string and check its graphic status. The
output shows which characters are considered graphic by the function.

## Input Validation Example

A practical use case is validating user input contains only graphic characters.
This example shows how to implement such validation.

input_validation.go
  

package main

import (
    "fmt"
    "strconv"
)

func validateInput(input string) bool {
    for _, r := range input {
        if !strconv.IsGraphic(r) {
            return false
        }
    }
    return true
}

func main() {
    tests := []string{"Hello 世界", "Text with\ttab", "Bad\u0001Input"}
    
    for _, s := range tests {
        if validateInput(s) {
            fmt.Printf("'%s' is valid\n", s)
        } else {
            fmt.Printf("'%s' contains non-graphic characters\n", s)
        }
    }
}

The validateInput function checks each rune in the string. It
rejects strings containing any non-graphic characters like control codes.

## Working with Special Cases

Some Unicode characters have special handling. This example explores edge cases
and special characters.

special_cases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    specialChars := []rune{
        '\u00a0',    // Non-breaking space
        '\u200b',    // Zero-width space
        '\u00ad',    // Soft hyphen
        '\u2028',    // Line separator
        '\u2029',    // Paragraph separator
    }
    
    for _, c := range specialChars {
        fmt.Printf("%U: IsGraphic=%t\n", c, strconv.IsGraphic(c))
    }
}

We test various special space and separator characters. The function's behavior
with these edge cases follows the Unicode standard's definition of graphic.

## Performance Benchmark

For performance-sensitive code, it's good to know the cost of IsGraphic.
This example benchmarks it against alternatives.

performance_benchmark.go
  

package main

import (
    "fmt"
    "strconv"
    "testing"
    "unicode"
)

func BenchmarkIsGraphic(b *testing.B) {
    for i := 0; i &lt; b.N; i++ {
        strconv.IsGraphic('A')
    }
}

func BenchmarkIsPrint(b *testing.B) {
    for i := 0; i &lt; b.N; i++ {
        unicode.IsPrint('A')
    }
}

func main() {
    fmt.Println("Run benchmarks with: go test -bench=.")
}

IsGraphic is optimized for performance but slightly slower than
unicode.IsPrint. The difference is negligible for most use cases.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.IsGraphic function in Go with
practical examples of Unicode graphic character detection in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).