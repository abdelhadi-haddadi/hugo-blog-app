+++
title = "Golang strconv.Unquote"
date = 2025-08-29T19:56:19.968+01:00
draft = false
description = "Step-by-step guide to using strconv.Unquote in Go for removing quotes from strings. Covers escape sequences and error handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.Unquote

last modified April 20, 2025

This tutorial explains how to use the strconv.Unquote function in
Go. We'll cover string unquoting basics with practical examples.

The strconv.Unquote function removes quotes from a string literal.
It interprets escape sequences and returns the actual string value.

Unquote handles single-quoted, double-quoted, and backtick-quoted strings.
It returns the unquoted string and an error if the input is invalid.

## Basic strconv.Unquote Example

The simplest use of strconv.Unquote removes quotes from a string.
Here we demonstrate successful unquoting and error handling.

basic_unquote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    quotedStr := `"Hello, Go!"`
    
    unquoted, err := strconv.Unquote(quotedStr)
    if err != nil {
        fmt.Println("Unquote error:", err)
        return
    }
    
    fmt.Printf("Original: %s\nUnquoted: %s\n", quotedStr, unquoted)
}

We unquote a double-quoted string. The error is checked to handle invalid input.
Successful unquoting prints both the original and unquoted strings.

## Handling Different Quote Types

strconv.Unquote works with single, double, and backtick quotes.
This example shows unquoting different quoted string formats.

quote_types.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    doubleQuoted := `"double quoted"`
    singleQuoted := `'single quoted'`
    backtickQuoted := "`backtick quoted`"
    
    cases := []string{doubleQuoted, singleQuoted, backtickQuoted}
    
    for _, c := range cases {
        unquoted, err := strconv.Unquote(c)
        if err != nil {
            fmt.Printf("Failed to unquote %s: %v\n", c, err)
        } else {
            fmt.Printf("Unquoted: %s\n", unquoted)
        }
    }
}

We test three different quote styles. The function handles each type correctly.
Note that backtick strings don't process escape sequences.

## Processing Escape Sequences

Unquote interprets escape sequences in quoted strings.
This example demonstrates common escape sequence handling.

escape_sequences.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    escapedStr := `"Line 1\nLine 2\tTabbed"`
    
    unquoted, err := strconv.Unquote(escapedStr)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Println("Unquoted string:")
    fmt.Println(unquoted)
}

The string contains newline and tab escape sequences. Unquote
converts these to their actual characters. The output shows the formatted text.

## Handling Invalid Input

Unquote returns errors for malformed quoted strings.
This example shows error handling for various invalid cases.

invalid_input.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{
        `"missing closing quote`,
        `'mixed quotes"`,
        `plain string`,
        `"invalid \x escape"`,
    }
    
    for _, tc := range testCases {
        _, err := strconv.Unquote(tc)
        if err != nil {
            fmt.Printf("Error unquoting '%s': %v\n", tc, err)
        }
    }
}

We test several invalid quoted strings. Each case produces a specific error.
The errors help identify what's wrong with the input string.

## Unquoting Unicode Escape Sequences

Unquote handles Unicode escape sequences in quoted strings.
This example demonstrates processing Unicode escapes.

unicode_escapes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    unicodeStr := `"Hello \u4e16\u754c"`  // "Hello 世界"
    
    unquoted, err := strconv.Unquote(unicodeStr)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Println("Unquoted:", unquoted)
}

The string contains Unicode escape sequences for Chinese characters.
Unquote converts these to their actual Unicode characters.
The output shows the properly decoded string.

## Comparing with Raw Strings

Backtick-quoted strings don't process escape sequences.
This example compares unquoting regular vs. raw strings.

raw_strings.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    regular := `"Line 1\nLine 2"`
    raw := "`Line 1\\nLine 2`"
    
    regUnquoted, _ := strconv.Unquote(regular)
    rawUnquoted, _ := strconv.Unquote(raw)
    
    fmt.Println("Regular unquoted:", regUnquoted)
    fmt.Println("Raw unquoted:", rawUnquoted)
}

The regular string processes the newline escape, while the raw string doesn't.
Unquote handles both cases according to their quoting rules.
The output shows the different behavior.

## Practical Example: JSON String Processing

This practical example shows using Unquote when processing JSON.
It demonstrates extracting and unquoting values from JSON strings.

json_processing.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func main() {
    jsonStr := `{"name": "Alice", "age": 30, "city": "New York"}`
    
    // Simulate extracting a JSON string value
    start := strings.Index(jsonStr, `"name": "`) + 8
    end := strings.Index(jsonStr[start:], `"`) + start
    quotedValue := jsonStr[start:end]
    
    name, err := strconv.Unquote(`"` + quotedValue + `"`)
    if err != nil {
        fmt.Println("Error unquoting JSON value:", err)
        return
    }
    
    fmt.Println("Extracted name:", name)
}

We extract a quoted value from a JSON string and unquote it.
This simulates processing JSON data where values need cleaning.
The example shows proper string extraction and unquoting.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.Unquote function in Go with
practical examples of string unquoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).