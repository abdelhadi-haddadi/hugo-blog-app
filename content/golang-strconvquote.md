+++
title = "Golang strconv.Quote"
date = 2025-08-29T19:56:18.887+01:00
draft = false
description = "Learn how to quote strings using strconv.Quote in Go. Includes practical examples and escaping rules."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.Quote

last modified April 20, 2025

This tutorial explains how to use the strconv.Quote function in Go.
We'll cover string escaping basics with practical examples.

The strconv.Quote function converts a string to a Go string literal.
It adds double quotes and escapes special characters using Go's escape sequences.

Quote is useful when generating Go source code or safely displaying strings.
It handles all special characters including newlines, tabs, and Unicode.

## Basic strconv.Quote Example

The simplest use of strconv.Quote adds quotes and escapes a string.
Here we demonstrate basic string quoting functionality.

basic_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "Hello, World!"
    quoted := strconv.Quote(s)
    
    fmt.Println("Original:", s)
    fmt.Println("Quoted:", quoted)
}

We convert a simple string to a Go string literal. The output shows the original
and quoted versions. The quoted string has surrounding double quotes.

## Escaping Special Characters

strconv.Quote automatically escapes special characters. This
example shows how it handles various control characters.

escaping.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "Line1\nLine2\tTab\"Quote"
    quoted := strconv.Quote(s)
    
    fmt.Println("Original:", s)
    fmt.Println("Quoted:", quoted)
}

The string contains newline, tab, and quote characters. The quoted version shows
these escaped with backslash sequences. This makes the string safe for Go code.

## Handling Unicode Characters

strconv.Quote properly handles Unicode characters. Non-ASCII
characters are escaped using Unicode escape sequences.

unicode.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "Gö 语言 😊"
    quoted := strconv.Quote(s)
    
    fmt.Println("Original:", s)
    fmt.Println("Quoted:", quoted)
}

The string contains non-ASCII characters including an emoji. The quoted version
escapes these using \u and \U sequences. This ensures portability across systems.

## QuoteToASCII Function

strconv.QuoteToASCII converts all non-ASCII characters to escape
sequences. This example compares it with regular Quote.

quote_to_ascii.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    s := "Nürnberg 日本"
    
    fmt.Println("Quote:", strconv.Quote(s))
    fmt.Println("QuoteToASCII:", strconv.QuoteToASCII(s))
}

QuoteToASCII ensures the output contains only ASCII characters.
Regular Quote may keep some Unicode characters unescaped if they are printable.

## QuoteRune Function

For single runes, strconv.QuoteRune provides similar functionality.
This example shows quoting individual Unicode characters.

quote_rune.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    r := '世'
    quoted := strconv.QuoteRune(r)
    
    fmt.Printf("Rune: %U\n", r)
    fmt.Println("Quoted:", quoted)
}

QuoteRune adds single quotes and escapes the rune if needed. It's
useful when working with individual Unicode code points rather than strings.

## Unquoting Strings

The strconv.Unquote function reverses the quoting process. This
example demonstrates converting quoted strings back to their original form.

unquote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    quoted := `"Hello,\nWorld!"`
    
    s, err := strconv.Unquote(quoted)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Println("Quoted:", quoted)
    fmt.Println("Unquoted:", s)
}

We convert a quoted string literal back to a normal string. The function handles
all escape sequences and returns the original string content.

## Practical Example: JSON Encoding

This practical example shows using strconv.Quote when building JSON
strings manually. Proper quoting is essential for valid JSON.

json_encoding.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    name := "Alice"
    message := "Hello,\nWorld!"
    
    json := fmt.Sprintf(`{"name":%s,"message":%s}`,
        strconv.Quote(name),
        strconv.Quote(message))
    
    fmt.Println("JSON:", json)
}

We manually construct a JSON string by quoting the values. This ensures special
characters are properly escaped in the output. The result is valid JSON.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.Quote function in Go with
practical examples of string escaping in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).