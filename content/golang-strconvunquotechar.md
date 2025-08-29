+++
title = "Golang strconv.UnquoteChar"
date = 2025-08-29T19:56:21.063+01:00
draft = false
description = "Learn how to decode quoted characters in Go using strconv.UnquoteChar. Includes examples, error handling, and practical applications."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.UnquoteChar

last modified April 20, 2025

This tutorial explains how to use the strconv.UnquoteChar function
in Go. We'll cover character unquoting basics with practical examples.

The strconv.UnquoteChar function decodes the first character or
escape sequence in a quoted string. It's useful for parsing escaped strings.

UnquoteChar returns four values: the decoded rune, a multibyte flag, the tail
string, and an error. This provides detailed control over string parsing.

## Basic strconv.UnquoteChar Example

This example demonstrates basic usage of UnquoteChar to decode a
simple escaped character. We show how to handle the return values.

basic_unquotechar.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := `\"Hello\"`
    
    r, mb, tail, err := strconv.UnquoteChar(s, '"')
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Printf("Decoded: %c\n", r)
    fmt.Println("Multibyte:", mb)
    fmt.Println("Remaining:", tail)
}

We decode the first escaped quote character from the string. The function
returns the decoded rune, a multibyte flag, remaining string, and error.

## Handling Different Escape Sequences

UnquoteChar supports various escape sequences. This example shows
how it handles common escape sequences in Go strings.

escape_sequences.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{`\n`, `\t`, `\\`, `\x41`, `\u263a`}
    
    for _, tc := range testCases {
        r, _, _, err := strconv.UnquoteChar(tc, 0)
        if err != nil {
            fmt.Printf("Error unquoting '%s': %v\n", tc, err)
            continue
        }
        fmt.Printf("'%s' → %c (U+%04x)\n", tc, r, r)
    }
}

We test newline, tab, backslash, hex, and Unicode escape sequences. Each is
properly decoded to its corresponding rune value with Unicode code point.

## Processing String Literals

This example shows how to process an entire quoted string character by
character using UnquoteChar in a loop.

process_string.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := `"Go\t\u263a"`
    
    // Skip the opening quote
    content := s[1:]
    
    for len(content) &gt; 0 {
        r, mb, tail, err := strconv.UnquoteChar(content, '"')
        if err != nil {
            fmt.Println("Error:", err)
            break
        }
        
        fmt.Printf("%c", r)
        content = tail
    }
    fmt.Println()
}

We process each character in the string, handling escape sequences as we
encounter them. The loop continues until we've processed all characters.

## Handling Invalid Escape Sequences

This example demonstrates how UnquoteChar handles invalid or
unsupported escape sequences with proper error reporting.

invalid_sequences.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{`\z`, `\xzz`, `\u123`, `\`, `\U12345678`}
    
    for _, tc := range testCases {
        _, _, _, err := strconv.UnquoteChar(tc, 0)
        if err != nil {
            fmt.Printf("'%s': %v\n", tc, err)
        }
    }
}

Each test case shows a different type of invalid escape sequence. The function
returns descriptive errors for each invalid input case.

## Working with Different Quote Characters

UnquoteChar can handle different quote characters. This example
shows how the quote parameter affects the parsing behavior.

quote_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s1 := `\'Single quoted\'`
    s2 := `\"Double quoted\"`
    
    // Process with single quote as delimiter
    r1, _, _, _ := strconv.UnquoteChar(s1, '\'')
    fmt.Printf("Single quoted: %c\n", r1)
    
    // Process with double quote as delimiter
    r2, _, _, _ := strconv.UnquoteChar(s2, '"')
    fmt.Printf("Double quoted: %c\n", r2)
}

The quote parameter determines which quote character needs escaping. This allows
proper handling of strings quoted with different characters.

## Comparing with strconv.Unquote

This example compares UnquoteChar with Unquote,
showing when each is more appropriate for different use cases.

compare_unquote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := `"Hello\nWorld"`
    
    // Using Unquote (whole string)
    unquoted, err := strconv.Unquote(s)
    if err != nil {
        fmt.Println("Unquote error:", err)
    } else {
        fmt.Println("Unquote result:", unquoted)
    }
    
    // Using UnquoteChar (character by character)
    content := s[1:len(s)-1] // Remove surrounding quotes
    fmt.Print("UnquoteChar result: ")
    for len(content) &gt; 0 {
        r, _, tail, err := strconv.UnquoteChar(content, '"')
        if err != nil {
            fmt.Println("\nError:", err)
            break
        }
        fmt.Printf("%c", r)
        content = tail
    }
    fmt.Println()
}

Unquote is simpler for whole strings, while UnquoteChar
provides more control for custom parsing needs or partial string processing.

## Practical Example: Custom String Parser

This practical example demonstrates building a custom string parser using
UnquoteChar to handle complex string parsing scenarios.

custom_parser.go
  

package main

import (
    "fmt"
    "strconv"
)

func parseCustomString(s string) (string, error) {
    if len(s) == 0 || s[0] != '"' {
        return "", fmt.Errorf("string must be quoted")
    }
    
    content := s[1:]
    var result []rune
    
    for len(content) &gt; 0 {
        if content[0] == '"' {
            content = content[1:]
            break
        }
        
        r, _, tail, err := strconv.UnquoteChar(content, '"')
        if err != nil {
            return "", err
        }
        
        result = append(result, r)
        content = tail
    }
    
    return string(result), nil
}

func main() {
    testStr := `"Complex \tstring \u263a with\n escapes"`
    
    parsed, err := parseCustomString(testStr)
    if err != nil {
        fmt.Println("Parse error:", err)
        return
    }
    
    fmt.Println("Parsed string:", parsed)
}

We build a custom parser that handles quoted strings with escape sequences.
The parser uses UnquoteChar to properly decode each character.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.UnquoteChar function in Go with
practical examples of character unquoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).