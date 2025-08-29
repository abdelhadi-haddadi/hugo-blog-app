+++
title = "Golang regexp.QuoteMeta"
date = 2025-08-29T19:55:45.846+01:00
draft = false
description = "Learn how to quote meta characters using regular expressions in Go. Includes examples of regex escaping."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang regexp.QuoteMeta

last modified April 20, 2025

This tutorial explains how to use the regexp.QuoteMeta function in Go.
We'll cover its purpose and provide practical examples of escaping regex metacharacters.

A regular expression is a sequence of characters that defines a
search pattern. Special characters like ., *, and +
have special meanings in regex patterns.

The regexp.QuoteMeta function escapes all regular expression metacharacters
in a string. The returned string is a regular expression that matches the literal text.

## Basic regexp.QuoteMeta Example

The simplest use of regexp.QuoteMeta escapes a string containing
regex metacharacters. This makes them match literally.

basic_quote.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    str := `Hello. there!*`
    quoted := regexp.QuoteMeta(str)

    fmt.Println("Original:", str)
    fmt.Println("Quoted:", quoted)

    re := regexp.MustCompile(quoted)
    fmt.Println("Match:", re.MatchString("Hello. there!*"))
}

The function escapes the . and * characters. The
compiled regex will match the literal string "Hello. there!*".

## Escaping User Input

When building regex patterns from user input, always use QuoteMeta.
This prevents regex injection attacks.

user_input.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    userInput := `file*.txt`
    safePattern := regexp.QuoteMeta(userInput) + `$`
    
    re := regexp.MustCompile(safePattern)
    
    fmt.Println("Match file.txt:", re.MatchString("file.txt"))
    fmt.Println("Match file1.txt:", re.MatchString("file1.txt"))
    fmt.Println("Match file*.txt:", re.MatchString("file*.txt"))
}

Without quoting, the pattern would match any file ending with ".txt". After quoting,
it only matches the literal "file*.txt".

## Escaping Path Separators

File paths often contain characters that are regex metacharacters. This example
shows how to safely match paths.

path_escape.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    path := `/usr/local/bin/go`
    quotedPath := regexp.QuoteMeta(path)
    
    re := regexp.MustCompile(quotedPath)
    
    fmt.Println("Match exact path:", re.MatchString(path))
    fmt.Println("Match similar path:", re.MatchString("/usr/local/bin/golang"))
}

The forward slashes are escaped, ensuring the regex matches the exact path string.
Without quoting, the slashes would be interpreted as regex delimiters.

## Combining with Other Patterns

QuoteMeta can be combined with other regex patterns. Here we create
a pattern that matches a literal prefix.

combined_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    prefix := `user[input]`
    suffix := `_\d+`
    
    pattern := regexp.QuoteMeta(prefix) + suffix
    re := regexp.MustCompile(pattern)
    
    tests := []string{
        "user[input]_123",
        "user_input_456",
        "user[input]X789",
    }
    
    for _, test := range tests {
        fmt.Printf("%s: %t\n", test, re.MatchString(test))
    }
}

The square brackets in the prefix are escaped, while the suffix uses regex
metacharacters. Only strings matching both parts will match.

## Escaping for Replacement Strings

When using regex replacement, QuoteMeta ensures literal replacement.
This example demonstrates safe string substitution.

replacement.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "Replace $10 with $$10"
    pattern := `\$\d+`
    replacement := regexp.QuoteMeta("$$20")
    
    re := regexp.MustCompile(pattern)
    result := re.ReplaceAllString(text, replacement)
    
    fmt.Println("Original:", text)
    fmt.Println("Replaced:", result)
}

The replacement string contains a dollar sign, which normally has special meaning.
Quoting ensures it's treated as a literal dollar sign.

## Performance Comparison

This example compares matching with and without QuoteMeta to show
the importance of proper escaping.

performance.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    search := `file[1].txt`
    
    // Unsafe match (might not work as expected)
    unsafeRe := regexp.MustCompile(search)
    fmt.Println("Unsafe match:", unsafeRe.MatchString(search))
    
    // Safe match with QuoteMeta
    safeRe := regexp.MustCompile(regexp.QuoteMeta(search))
    fmt.Println("Safe match:", safeRe.MatchString(search))
    
    // What happens with special characters
    testInput := "file1txt"
    fmt.Println("Unsafe match wrong input:", unsafeRe.MatchString(testInput))
    fmt.Println("Safe match wrong input:", safeRe.MatchString(testInput))
}

The unquoted pattern matches unexpected inputs because square brackets are
regex metacharacters. The quoted pattern matches only the exact literal string.

## Escaping Complex Strings

This example shows how QuoteMeta handles strings with multiple
special characters.

complex_escape.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    complexStr := `^$.*+?()|[]{}-\`
    quoted := regexp.QuoteMeta(complexStr)
    
    fmt.Println("Original:", complexStr)
    fmt.Println("Quoted:", quoted)
    
    re := regexp.MustCompile(quoted)
    fmt.Println("Match original:", re.MatchString(complexStr))
    fmt.Println("Match modified:", re.MatchString("^$X.*+?()|[]{}-\\"))
}

All special regex metacharacters are properly escaped. The compiled pattern
will only match the exact original string with all special characters.

## Source

[Go regexp.QuoteMeta documentation](https://pkg.go.dev/regexp#QuoteMeta)

This tutorial covered the regexp.QuoteMeta function in Go with
practical examples of escaping regex metacharacters in strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).