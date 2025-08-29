+++
title = "Golang strconv.QuoteToASCII"
date = 2025-08-29T19:56:19.965+01:00
draft = false
description = "Detailed tutorial on using strconv.QuoteToASCII in Go to convert strings to ASCII-quoted format. Includes examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.QuoteToASCII

last modified April 20, 2025

This tutorial explains how to use the strconv.QuoteToASCII function in Go.
We'll cover string quoting basics with practical examples.

The strconv.QuoteToASCII function converts a string to an ASCII-only
quoted string. Non-ASCII characters are escaped using Go escape sequences.

This function is useful when you need to represent strings in ASCII-only
environments or when you want to safely display non-printable characters.

## Basic strconv.QuoteToASCII Example

The simplest use of strconv.QuoteToASCII converts a string to its
ASCII-quoted representation. Here we demonstrate basic usage.

basic_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello, 世界"
    
    quoted := strconv.QuoteToASCII(str)
    fmt.Printf("Original: %s\nQuoted: %s\n", str, quoted)
}

We convert a string containing non-ASCII characters to an ASCII-quoted string.
The output shows how Unicode characters are escaped in the quoted version.

## Quoting Special Characters

strconv.QuoteToASCII handles special characters like newlines and
tabs. This example shows how they're represented in the output.

special_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Line1\nLine2\tTab"
    
    quoted := strconv.QuoteToASCII(str)
    fmt.Printf("Original: %s\nQuoted: %s\n", str, quoted)
}

Special characters like newline and tab are escaped in the quoted output.
This makes the string representation safe for ASCII-only environments.

## Quoting Empty String

The function handles edge cases like empty strings consistently. This example
shows the behavior with empty and whitespace-only strings.

empty_string.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    empty := ""
    space := "   "
    
    fmt.Println("Empty:", strconv.QuoteToASCII(empty))
    fmt.Println("Spaces:", strconv.QuoteToASCII(space))
}

An empty string is quoted as two double quotes. Whitespace characters are
preserved but quoted like any other characters.

## Comparing Quote and QuoteToASCII

This example compares QuoteToASCII with the regular Quote
function to highlight their differences.

compare_quote.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello, 世界"
    
    fmt.Println("Quote:", strconv.Quote(str))
    fmt.Println("QuoteToASCII:", strconv.QuoteToASCII(str))
}

Quote preserves Unicode characters while QuoteToASCII
escapes them. Use QuoteToASCII when ASCII output is required.

## Quoting Control Characters

Control characters are properly escaped by QuoteToASCII. This
example demonstrates how they're represented.

control_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := string([]byte{0, 1, 2, 31, 127})
    
    quoted := strconv.QuoteToASCII(str)
    fmt.Printf("Original: %q\nQuoted: %s\n", str, quoted)
}

Non-printable control characters are escaped using hexadecimal notation.
This makes them visible and safe for ASCII output.

## Quoting Strings for JSON

QuoteToASCII can be used to prepare strings for JSON output. This
example shows how it escapes special JSON characters.

json_quoting.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := `{"name": "John", "age": 30}`
    
    quoted := strconv.QuoteToASCII(str)
    fmt.Println("Quoted JSON:", quoted)
}

The function properly escapes quotes and other special characters that might
appear in JSON strings. This helps prevent JSON parsing errors.

## Practical Example: Logging Non-ASCII Data

This practical example demonstrates using QuoteToASCII to safely
log strings that might contain non-ASCII characters.

logging.go
  

package main

import (
    "fmt"
    "strconv"
)

func logSafe(message string) {
    safeMsg := strconv.QuoteToASCII(message)
    fmt.Println("LOG:", safeMsg)
}

func main() {
    logSafe("Normal message")
    logSafe("Message with Unicode: 日本語")
    logSafe("Message with control chars: \x00\x1F")
}

The logSafe function ensures all logged messages are ASCII-safe.
This prevents encoding issues in systems that expect ASCII-only input.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.QuoteToASCII function in Go with
practical examples of string quoting in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).