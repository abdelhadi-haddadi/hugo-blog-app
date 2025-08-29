+++
title = "Golang Regexp.ReplaceAllString"
date = 2025-08-29T19:55:48.044+01:00
draft = false
description = "Learn how to replace all matches with strings using regular expressions in Go. Includes examples of regex replacement."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.ReplaceAllString

last modified April 20, 2025

This tutorial explains how to use the Regexp.ReplaceAllString method in Go.
We'll cover regex replacement basics and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.ReplaceAllString method replaces all matches of a
regex pattern in a string with a specified replacement string.

## Basic ReplaceAllString Example

The simplest use of ReplaceAllString replaces all occurrences of
a pattern. Here we replace all digits with asterisks.

basic_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d`)
    original := "Order 12345 was placed on 2023-04-20"
    replaced := re.ReplaceAllString(original, "*")
    
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

The pattern matches any digit character. ReplaceAllString replaces
each digit with an asterisk. The method scans the entire input string.

## Replacing with Capture Groups

We can use capture groups in the replacement string. This example reformats dates.

group_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    original := "Event date: 2023-04-20"
    replaced := re.ReplaceAllString(original, "$2/$3/$1")
    
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

The pattern captures year, month, and day groups. The replacement string
rearranges them in MM/DD/YYYY format using $1, $2, $3 references.

## Case-Insensitive Replacement

ReplaceAllString can perform case-insensitive replacements when
using the (?i) flag. This replaces all color spellings.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?i)colour`)
    original := "Colour, colour, COLOR, coloUr"
    replaced := re.ReplaceAllString(original, "color")
    
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

The (?i) flag makes the match case-insensitive. All variations of
"colour" are replaced with the American spelling "color".

## Removing Text with Empty Replacement

Passing an empty string as replacement effectively removes matched patterns.
This removes all HTML tags from a string.

remove_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;[^&gt;]+&gt;`)
    original := "&lt;h1&gt;Title&lt;/h1&gt;&lt;p&gt;Paragraph&lt;/p&gt;"
    replaced := re.ReplaceAllString(original, "")
    
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

The pattern matches any text between angle brackets. The empty replacement
string removes all HTML tags while preserving the content between them.

## Replacing Multiple Patterns

For complex replacements, we can chain multiple ReplaceAllString
calls. This normalizes whitespace in a string.

multiple_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    original := "   Too    many    spaces    here.   "
    
    // Replace multiple spaces with single space
    re1 := regexp.MustCompile(`\s+`)
    step1 := re1.ReplaceAllString(original, " ")
    
    // Trim leading/trailing spaces
    re2 := regexp.MustCompile(`^\s|\s$`)
    final := re2.ReplaceAllString(step1, "")
    
    fmt.Println("Original:", original)
    fmt.Println("Final:", final)
}

The first replacement condenses multiple whitespace characters. The second
removes leading and trailing spaces. This produces clean, normalized text.

## Using a Replacement Function

For dynamic replacements, we can use ReplaceAllStringFunc. This
example converts temperatures from Fahrenheit to Celsius.

function_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strconv"
)

func main() {
    re := regexp.MustCompile(`(\d+)°F`)
    original := "Temperatures: 32°F, 68°F, 100°F"
    
    replaced := re.ReplaceAllStringFunc(original, func(match string) string {
        f, _ := strconv.Atoi(re.FindStringSubmatch(match)[1])
        c := (f - 32) * 5 / 9
        return fmt.Sprintf("%d°C", c)
    })
    
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

The pattern matches Fahrenheit temperatures. For each match, the function
converts the value to Celsius. This shows dynamic replacement capabilities.

## Escaping Special Characters

When replacing with literal strings containing special regex characters, we
must escape them. This example safely replaces dollar amounts.

escape_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\$\d+`)
    original := "Prices: $10, $20, $30"
    replacement := regexp.QuoteMeta("[REDACTED]")
    
    replaced := re.ReplaceAllString(original, replacement)
    fmt.Println("Original:", original)
    fmt.Println("Replaced:", replaced)
}

regexp.QuoteMeta escapes special characters in the replacement
string. This ensures the replacement is treated as literal text, not a pattern.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.ReplaceAllString method in Go
with practical examples of text replacement and manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).