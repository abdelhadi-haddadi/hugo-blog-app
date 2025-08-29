+++
title = "Golang Regexp.ReplaceAllLiteral"
date = 2025-08-29T19:55:46.933+01:00
draft = false
description = "Learn how to replace all matches literally using regular expressions in Go. Includes examples of regex replacement."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.ReplaceAllLiteral

last modified April 20, 2025

This tutorial explains how to use the Regexp.ReplaceAllLiteral method in Go.
We'll cover its differences from ReplaceAll and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.ReplaceAllLiteral method replaces matches of a regular
expression with a literal replacement string. Unlike ReplaceAll, it
treats the replacement as literal text, not interpreting $ signs.

## Basic ReplaceAllLiteral Example

The simplest use of ReplaceAllLiteral replaces all matches with
a fixed string. Here we replace all digits with "X".

basic_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d`)
    text := "Order 12345 shipped on 2025-04-20"
    
    result := re.ReplaceAllLiteralString(text, "X")
    fmt.Println(result) // Order XXXXX shipped on XXXX-XX-XX
}

We compile a pattern matching any digit. ReplaceAllLiteralString
replaces each digit with "X" literally, without any special interpretation.

## Literal vs. Template Replacement

This example demonstrates the difference between ReplaceAllLiteral
and ReplaceAll when using $ in replacements.

literal_vs_template.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+) (\w+)`)
    text := "John Smith"
    
    literal := re.ReplaceAllLiteralString(text, "$2 $1")
    template := re.ReplaceAllString(text, "$2 $1")
    
    fmt.Println("Literal:", literal)   // $2 $1
    fmt.Println("Template:", template) // Smith John
}

ReplaceAllLiteralString treats "$2 $1" as literal text, while
ReplaceAllString interprets it as a replacement template.

## Escaping Special Characters

ReplaceAllLiteral is useful when you need to insert literal
special characters that would otherwise be interpreted in replacements.

escape_special.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\$\d+`)
    text := "Price: $100, Discount: $20"
    
    result := re.ReplaceAllLiteralString(text, "[REDACTED]")
    fmt.Println(result) // Price: [REDACTED], Discount: [REDACTED]
}

We match dollar amounts but want to replace them literally without any
special interpretation of the replacement string.

## Replacing with Empty String

A common use case is removing matched patterns by replacing with an empty string.
Here we remove all punctuation.

empty_replacement.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`[[:punct:]]`)
    text := "Hello, World! How's it going?"
    
    result := re.ReplaceAllLiteralString(text, "")
    fmt.Println(result) // Hello World Hows it going
}

The [[:punct:]] character class matches all punctuation marks.
We remove them by replacing with an empty string.

## Byte Slice Replacement

ReplaceAllLiteral also works with byte slices, which can be more
efficient for some operations.

byte_slice.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b\d+\b`)
    text := []byte("Room 101 has 2 windows and 1 door")
    
    result := re.ReplaceAllLiteral(text, []byte("N"))
    fmt.Println(string(result)) // Room N has N windows and N door
}

This example replaces all standalone numbers with "N". The byte slice version
avokes string conversions when working with byte-oriented data.

## Multiple Pattern Replacement

For complex replacements, you can chain multiple ReplaceAllLiteral
calls to apply successive transformations.

multiple_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Secret: ABC-123-XYZ, Code: 456-789"
    
    // First replace letter groups
    re1 := regexp.MustCompile(`[A-Z]{3}`)
    text = re1.ReplaceAllLiteralString(text, "[CODE]")
    
    // Then replace number groups
    re2 := regexp.MustCompile(`\d{3}`)
    text = re2.ReplaceAllLiteralString(text, "###")
    
    fmt.Println(text) // Secret: [CODE]-###-[CODE], Code: ###-###
}

We first replace 3-letter codes, then 3-digit numbers. Each replacement is
applied literally to the result of the previous operation.

## Performance Comparison

ReplaceAllLiteral can be slightly faster than ReplaceAll
when you don't need template processing, as it skips the interpretation step.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    re := regexp.MustCompile(`\d`)
    text := "a1b2c3d4e5f6g7h8i9j0"
    const iterations = 100000
    
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        re.ReplaceAllString(text, "X")
    }
    fmt.Println("ReplaceAll:", time.Since(start))
    
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        re.ReplaceAllLiteralString(text, "X")
    }
    fmt.Println("ReplaceAllLiteral:", time.Since(start))
}

The benchmark shows ReplaceAllLiteral is faster when template
processing isn't needed, as it doesn't scan the replacement for $.

## Source

[Go regexp.ReplaceAllLiteral documentation](https://pkg.go.dev/regexp#Regexp.ReplaceAllLiteral)

This tutorial covered the Regexp.ReplaceAllLiteral method in Go
with practical examples of literal string replacement with regular expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).