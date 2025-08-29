+++
title = "Golang Regexp.ReplaceAllStringFunc"
date = 2025-08-29T19:55:48.037+01:00
draft = false
description = "Learn how to replace all matches with string functions using regular expressions in Go. Includes examples of regex replacement."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.ReplaceAllStringFunc

last modified April 20, 2025

This tutorial explains how to use the Regexp.ReplaceAllStringFunc
method in Go. We'll cover advanced string replacement with regular expressions.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.ReplaceAllStringFunc method replaces all matches of a
regex pattern using a custom function. This allows dynamic replacements.

## Basic ReplaceAllStringFunc Example

The simplest use of ReplaceAllStringFunc converts matched text to
uppercase. Here we capitalize all occurrences of "go".

basic_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`go`)
    text := "Let's go to the Go conference and learn Go!"
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        return strings.ToUpper(match)
    })
    
    fmt.Println(result)
}

The function matches "go" (case-sensitive) and applies the transformation.
The output shows all matches converted to uppercase.

## Conditional Replacement

We can use conditions inside the replacement function. This example replaces
numbers with their word equivalents if greater than 5.

conditional_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strconv"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "I have 3 apples, 7 oranges, and 10 bananas"
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        num, _ := strconv.Atoi(match)
        if num &gt; 5 {
            return "many"
        }
        return match
    })
    
    fmt.Println(result)
}

The regex matches all number sequences. The function converts them to integers
and applies the conditional logic. Only numbers &gt; 5 are replaced.

## Complex Transformation

ReplaceAllStringFunc can perform complex transformations. Here we
reformat dates from MM/DD/YYYY to YYYY-MM-DD.

date_transform.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`(\d{2})/(\d{2})/(\d{4})`)
    text := "Start date: 04/20/2025, End date: 12/31/2025"
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        parts := strings.Split(match, "/")
        return fmt.Sprintf("%s-%s-%s", parts[2], parts[0], parts[1])
    })
    
    fmt.Println(result)
}

The pattern captures date components. The function splits the match and
rearranges the parts. This shows how to parse and reformat matched text.

## Dynamic Content Generation

We can generate replacement content dynamically. This example expands
abbreviations in text.

abbrev_expand.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\b[A-Z]{2,}\b`)
    text := "The WHO declared COVID a PHEIC in JAN 2020"
    
    abbrevs := map[string]string{
        "WHO": "World Health Organization",
        "PHEIC": "Public Health Emergency of International Concern",
        "JAN": "January",
    }
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        if expansion, ok := abbrevs[match]; ok {
            return expansion
        }
        return match
    })
    
    fmt.Println(result)
}

The regex matches all uppercase words of 2+ letters. The function looks up
matches in a map and returns expansions when found. Unmatched abbreviations
remain unchanged.

## Escaping Special Characters

This example demonstrates escaping HTML special characters in matched text.
It shows security-related usage of replacement functions.

html_escape.go
  

package main

import (
    "fmt"
    "html"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;.*?&gt;`)
    text := "Alert: &lt;script&gt;alert('xss')&lt;/script&gt; detected"
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        return html.EscapeString(match)
    })
    
    fmt.Println(result)
}

The pattern matches HTML/XML tags. The function escapes all special characters
in the matches. This prevents potential XSS attacks in web applications.

## Multi-step Processing

Replacement functions can perform multiple processing steps. Here we clean and
standardize product codes.

product_code.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`[A-Z]{2}\d{3}[a-z]?`)
    text := "Product codes: AB123, CD456x, EF789, GH101 invalid"
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        // Convert to uppercase
        code := strings.ToUpper(match)
        // Pad with zeros if needed
        if len(code) == 5 {
            return code[:2] + "0" + code[2:]
        }
        return code
    })
    
    fmt.Println(result)
}

The regex matches product code patterns. The function standardizes case and
format. This shows how to implement validation and normalization together.

## Performance Optimization

For complex replacements, we can optimize by compiling regex once. This example
shows efficient multi-pattern replacement.

optimized_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`\b(one|two|three)\b`)
    text := "Count: one, two, three, four, five"
    
    replacements := map[string]string{
        "one": "1",
        "two": "2",
        "three": "3",
    }
    
    result := re.ReplaceAllStringFunc(text, func(match string) string {
        return replacements[match]
    })
    
    fmt.Println(result)
}

The regex matches number words. The function uses a map for fast lookups.
This pattern is efficient for many replacement rules.

## Source

[Go regexp.ReplaceAllStringFunc documentation](https://pkg.go.dev/regexp#Regexp.ReplaceAllStringFunc)

This tutorial covered the Regexp.ReplaceAllStringFunc method in
Go with practical examples of advanced string replacements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).