+++
title = "Golang Regexp.ReplaceAllFunc"
date = 2025-08-29T19:55:46.947+01:00
draft = false
description = "Learn how to replace all matches using functions and regular expressions in Go. Includes examples of regex replacement."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.ReplaceAllFunc

last modified April 20, 2025

This tutorial explains how to use the Regexp.ReplaceAllFunc method in Go.
We'll cover regex replacement with custom functions and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.ReplaceAllFunc method replaces all matches of a regex
pattern using a custom function to generate replacement strings. This provides
flexible string manipulation capabilities.

## Basic ReplaceAllFunc Example

The simplest use of ReplaceAllFunc converts matched text to uppercase.
This demonstrates the basic pattern of defining a replacement function.

basic_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`\b\w+\b`)
    text := "hello world from go"
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        return []byte(strings.ToUpper(string(match)))
    })
    
    fmt.Println(string(result)) // HELLO WORLD FROM GO
}

We match word boundaries and convert each word to uppercase. The replacement
function receives each match and returns the transformed version.

## Conditional Replacement

ReplaceAllFunc allows conditional replacement based on match content.
Here we replace numbers with their word equivalents only if they're less than 5.

conditional_replace.go
  

package main

import (
    "fmt"
    "regexp"
    "strconv"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "I have 3 apples and 10 oranges"
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        num, _ := strconv.Atoi(string(match))
        if num &lt; 5 {
            words := []string{"zero", "one", "two", "three", "four"}
            return []byte(words[num])
        }
        return match
    })
    
    fmt.Println(string(result)) // I have three apples and 10 oranges
}

The function checks each number match and converts small numbers to words while
leaving larger numbers unchanged. This shows dynamic replacement logic.

## Complex Transformation

We can perform complex transformations on matches. This example converts date
formats from MM/DD/YYYY to YYYY-MM-DD.

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
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        parts := strings.Split(string(match), "/")
        return []byte(parts[2] + "-" + parts[0] + "-" + parts[1])
    })
    
    fmt.Println(string(result)) // Start date: 2025-04-20, End date: 2025-12-31
}

The replacement function splits the matched date and rearranges the components.
This demonstrates parsing and reconstructing matched text.

## Incrementing Numbers

ReplaceAllFunc can modify numeric values in text. Here we increment
all numbers found in a string by 1.

increment_numbers.go
  

package main

import (
    "fmt"
    "regexp"
    "strconv"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "Version 1, Revision 3, Page 42"
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        num, _ := strconv.Atoi(string(match))
        return []byte(strconv.Itoa(num + 1))
    })
    
    fmt.Println(string(result)) // Version 2, Revision 4, Page 43
}

Each matched number is converted to an integer, incremented, and converted back
to a string. This shows numeric manipulation during replacement.

## Markdown to HTML Conversion

We can use ReplaceAllFunc for simple text markup conversion. This
example converts Markdown bold syntax to HTML strong tags.

markdown_to_html.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\*\*(.*?)\*\*`)
    text := "This is **important** and **urgent**"
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        content := match[2 : len(match)-2] // Remove ** markers
        return []byte("**" + string(content) + "**")
    })
    
    fmt.Println(string(result)) // This is **important** and **urgent**
}

The function extracts text between ** markers and wraps it in HTML strong tags.
This demonstrates content extraction during replacement.

## Password Obfuscation

ReplaceAllFunc can be used for sensitive data obfuscation. This
example masks passwords in a configuration string.

password_obfuscation.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`password=["'](.*?)["']`)
    text := `user="admin" password="secret123" role="admin"`
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        parts := strings.Split(string(match), "=")
        return []byte(parts[0] + `="*******"`)
    })
    
    fmt.Println(string(result)) // user="admin" password="*******" role="admin"
}

Password values are replaced with asterisks while preserving the configuration
structure. This shows how to handle sensitive data safely.

## Template Variable Expansion

We can use ReplaceAllFunc for template variable expansion. This
example replaces ${var} patterns with values from a map.

template_expansion.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\$\{(\w+)\}`)
    text := "Hello ${name}, your balance is ${amount}"
    vars := map[string]string{
        "name":   "John",
        "amount": "$100",
    }
    
    result := re.ReplaceAllFunc([]byte(text), func(match []byte) []byte {
        key := string(match[2 : len(match)-1]) // Extract variable name
        return []byte(vars[key])
    })
    
    fmt.Println(string(result)) // Hello John, your balance is $100
}

The function looks up each variable name in a map and replaces the template
pattern with the corresponding value. This demonstrates dynamic content insertion.

## Source

[Go regexp.ReplaceAllFunc documentation](https://pkg.go.dev/regexp#Regexp.ReplaceAllFunc)

This tutorial covered the Regexp.ReplaceAllFunc method in Go with
practical examples of flexible string replacement using custom functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).