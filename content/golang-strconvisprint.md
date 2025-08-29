+++
title = "Golang strconv.IsPrint"
date = 2025-08-29T19:56:16.639+01:00
draft = false
description = "Learn how to check if a rune is printable using strconv.IsPrint in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.IsPrint

last modified April 20, 2025

This tutorial explains how to use the strconv.IsPrint function in Go.
We'll cover printable character checking with practical examples.

The strconv.IsPrint function checks if a rune is printable. A rune is
considered printable if it's defined as printable in Go's Unicode tables.

Printable characters include letters, numbers, punctuation, symbols, and the
ASCII space character. Control characters and other non-visible runes are not
considered printable.

## Basic strconv.IsPrint Example

The simplest use of strconv.IsPrint checks if a rune is printable.
Here we demonstrate checking various runes.

basic_isprint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    runes := []rune{'A', ' ', '\n', '€', '\t'}
    
    for _, r := range runes {
        if strconv.IsPrint(r) {
            fmt.Printf("%U '%c' is printable\n", r, r)
        } else {
            fmt.Printf("%U is not printable\n", r)
        }
    }
}

We test several runes including a letter, space, newline, Euro symbol, and tab.
The function correctly identifies which runes are printable according to Go's
Unicode tables.

## Checking String Characters

strconv.IsPrint can check each character in a string. This example
shows how to validate an entire string's printability.

string_check.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    str := "Hello\tWorld\n"
    
    for i, r := range str {
        if strconv.IsPrint(r) {
            fmt.Printf("Character %d: '%c' is printable\n", i, r)
        } else {
            fmt.Printf("Character %d: %U is not printable\n", i, r)
        }
    }
}

We iterate through each rune in the string and check its printability. The tab
and newline characters are correctly identified as non-printable.

## Filtering Non-Printable Characters

This example demonstrates filtering non-printable characters from a string using
strconv.IsPrint.

filter_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    input := "Hello\x07World\x1B[31m"
    var output []rune
    
    for _, r := range input {
        if strconv.IsPrint(r) {
            output = append(output, r)
        }
    }
    
    fmt.Println("Original:", input)
    fmt.Println("Filtered:", string(output))
}

We remove non-printable characters (bell and ANSI escape sequence) from the
string. The filtered result contains only printable characters.

## Comparing with unicode.IsPrint

Go's unicode package has a similar function. This example compares
strconv.IsPrint with unicode.IsPrint.

compare_unicode.go
  

package main

import (
    "fmt"
    "strconv"
    "unicode"
)

func main() {
    runes := []rune{'A', '\n', ' ', '€', '\x7f'}
    
    for _, r := range runes {
        sp := strconv.IsPrint(r)
        up := unicode.IsPrint(r)
        fmt.Printf("%U: strconv.IsPrint=%t, unicode.IsPrint=%t\n", 
            r, sp, up)
    }
}

The functions are mostly equivalent but may differ for some edge cases. Both
consider space printable but control characters non-printable.

## Validating User Input

This example shows using strconv.IsPrint to validate user input
contains only printable characters.

validate_input.go
  

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter text: ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)
    
    for i, r := range input {
        if !strconv.IsPrint(r) {
            fmt.Printf("Invalid character at position %d: %U\n", i, r)
            return
        }
    }
    
    fmt.Println("Input is valid:", input)
}

We read user input and check each character for printability. The program
rejects input containing any non-printable characters.

## Handling Multi-byte Characters

strconv.IsPrint correctly handles multi-byte Unicode characters.
This example demonstrates checking various Unicode characters.

unicode_chars.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    chars := []rune{
        'A',         // ASCII
        'é',         // Latin-1 Supplement
        '你',        // CJK Unified Ideographs
        '\u2028',    // Line Separator
        '\U0001F600', // Emoji
    }
    
    for _, r := range chars {
        fmt.Printf("%U '%c': %t\n", r, r, strconv.IsPrint(r))
    }
}

The function correctly identifies printability for ASCII, accented characters,
CJK ideographs, and emoji. The line separator is correctly marked as non-printable.

## Practical Example: Log Sanitization

This practical example demonstrates using strconv.IsPrint to
sanitize log messages by replacing non-printable characters.

log_sanitize.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func sanitizeLog(msg string) string {
    var b strings.Builder
    
    for _, r := range msg {
        if strconv.IsPrint(r) {
            b.WriteRune(r)
        } else {
            b.WriteString(fmt.Sprintf("\\x%02x", r))
        }
    }
    
    return b.String()
}

func main() {
    logMsg := "User\x07 tried to access \x1B[31mrestricted\x1B[0m area"
    fmt.Println("Original log:", logMsg)
    fmt.Println("Sanitized log:", sanitizeLog(logMsg))
}

We replace non-printable characters with their hex escape sequences. This makes
logs safer and more readable while preserving the original information.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.IsPrint function in Go with
practical examples of printable character checking in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).