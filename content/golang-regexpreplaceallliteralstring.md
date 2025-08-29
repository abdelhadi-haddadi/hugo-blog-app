+++
title = "Golang Regexp.ReplaceAllLiteralString"
date = 2025-08-29T19:55:46.938+01:00
draft = false
description = "Learn how to replace all matches with literal strings using regular expressions in Go. Includes examples of regex replacement."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.ReplaceAllLiteralString

last modified April 20, 2025

This tutorial explains how to use the Regexp.ReplaceAllLiteralString method in Go.
We'll cover its differences from ReplaceAllString and provide examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.ReplaceAllLiteralString method replaces all matches of
a regular expression with a replacement string. Unlike ReplaceAllString,
it treats the replacement as literal text.

## Basic ReplaceAllLiteralString Example

This example shows the simplest use of ReplaceAllLiteralString to
replace all occurrences of a pattern with literal text.

basic_replace.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`cat`)
    text := "The cat sat on the mat with another cat."
    
    result := re.ReplaceAllLiteralString(text, "dog")
    fmt.Println(result)
}

The code replaces all occurrences of "cat" with "dog". The replacement is treated
literally, with no special interpretation of the replacement string.

## Literal vs. Non-Literal Replacement

This example demonstrates the difference between ReplaceAllLiteralString
and ReplaceAllString when using replacement patterns.

literal_vs_nonliteral.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d+)`)
    text := "Order 12345 has 3 items"
    
    literal := re.ReplaceAllLiteralString(text, "X$1X")
    nonLiteral := re.ReplaceAllString(text, "X$1X")
    
    fmt.Println("Literal:", literal)
    fmt.Println("Non-literal:", nonLiteral)
}

ReplaceAllLiteralString treats "$1" as literal text, while
ReplaceAllString interprets it as a group reference. The output
shows this difference clearly.

## Escaping Special Characters

ReplaceAllLiteralString is useful when you need to insert special
characters literally. This example escapes HTML tags.

escape_html.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;.*?&gt;`)
    html := "&lt;p&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/p&gt;"
    
    escaped := re.ReplaceAllLiteralString(html, "&lt;tag&gt;")
    fmt.Println(escaped)
}

The code replaces all HTML tags with the literal string "&lt;tag&gt;". The
replacement is treated exactly as provided, with no interpretation.

## Password Obfuscation

This example uses ReplaceAllLiteralString to obfuscate passwords
in log messages by replacing them with asterisks.

password_obfuscation.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`password=[^&amp;\s]+`)
    log := "user=johndoe password=secret123 action=login"
    
    safeLog := re.ReplaceAllLiteralString(log, "password=*****")
    fmt.Println(safeLog)
}

The pattern matches password values in key-value pairs. The replacement uses
literal asterisks to hide the actual password value in log output.

## URL Redaction

Here we use ReplaceAllLiteralString to redact sensitive parts of
URLs while preserving the structure.

url_redaction.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`https://([^/]+)(/.*)`)
    url := "https://user:password@example.com/private/data"
    
    redacted := re.ReplaceAllLiteralString(url, "https://REDACTED$2")
    fmt.Println(redacted)
}

The pattern captures the domain and path separately. The replacement keeps the
protocol and path but literally replaces the credentials with "REDACTED".

## Template Variable Replacement

This example shows how to use ReplaceAllLiteralString for simple
template variable replacement where variables should be treated literally.

template_replacement.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\{\{(\w+)\}\}`)
    template := "Hello {{name}}, your code is {{code}}"
    
    result := re.ReplaceAllLiteralString(template, "VARIABLE")
    fmt.Println(result)
}

All template variables ({{name}}, {{code}}) are replaced with the literal string
"VARIABLE". This is useful when you want to remove or standardize variables.

## Special Character Handling

This final example demonstrates how ReplaceAllLiteralString
handles special characters in the replacement string.

special_chars.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d+`)
    text := "The price is 100 dollars"
    
    // Replacement contains $ which would be special in ReplaceAllString
    result := re.ReplaceAllLiteralString(text, "$$$")
    fmt.Println(result)
}

The dollar signs in the replacement are treated as literal characters. With
ReplaceAllString, they would be interpreted as group references.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp#Regexp.ReplaceAllLiteralString)

This tutorial covered the Regexp.ReplaceAllLiteralString method
in Go with practical examples of literal string replacement scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).