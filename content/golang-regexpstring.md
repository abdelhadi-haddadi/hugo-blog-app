+++
title = "Golang Regexp.String"
date = 2025-08-29T19:55:49.189+01:00
draft = false
description = "Learn how to work with strings using regular expressions in Go. Includes examples of regex string operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.String

last modified April 20, 2025

This tutorial explains how to use the Regexp.String method in Go.
We'll cover its purpose and provide practical examples of its usage.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.String method returns the source text used to compile
the regular expression. This is useful for debugging and logging purposes.

## Basic Regexp.String Example

The simplest use of Regexp.String shows the original pattern.
Here we compile a regex and then retrieve its source string.

basic_string.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`hello`)
    fmt.Println("Pattern:", re.String())
}

We compile the pattern "hello" and use String to retrieve it.
The output will be the exact string used to create the regex.

## String with Complex Pattern

This example demonstrates that String returns the original
pattern even for complex regular expressions.

complex_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`
    re := regexp.MustCompile(pattern)
    fmt.Println("Email pattern:", re.String())
}

The method returns the complete email validation pattern exactly as it was
provided during compilation, including all special characters.

## String After Modifications

This example shows that String returns the original pattern
even after the regex has been used for matching.

after_matching.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\d{3}-\d{3}-\d{4}`)
    
    // Perform some operations
    matched := re.MatchString("123-456-7890")
    fmt.Println("Matched:", matched)
    
    // Still returns original pattern
    fmt.Println("Pattern:", re.String())
}

The String method consistently returns the original pattern
regardless of any operations performed on the Regexp object.

## Comparing String Outputs

This example compares the output of String for different
regex patterns to demonstrate its behavior.

compare_patterns.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    patterns := []string{
        `\w+`,
        `[A-Z][a-z]*`,
        `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`,
    }

    for _, p := range patterns {
        re := regexp.MustCompile(p)
        fmt.Printf("Compiled: %-30s Returns: %s\n", p, re.String())
    }
}

For each pattern, String returns exactly what was passed to
MustCompile, showing it doesn't normalize or modify the pattern.

## String with Compiled Flags

This example shows that String doesn't reflect compilation
flags in its output.

flags_string.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `hello`
    
    re1 := regexp.MustCompile(pattern)
    re2 := regexp.MustCompile(`(?i)` + pattern)
    
    fmt.Println("Case sensitive:", re1.String())
    fmt.Println("Case insensitive:", re2.String())
}

The flag (?i) appears in the output because it was part of the
source string, not because it was added during compilation.

## String in Debugging

This example demonstrates using String for debugging regex
patterns in your code.

debugging.go
  

package main

import (
    "fmt"
    "regexp"
)

func debugRegex(re *regexp.Regexp, input string) {
    fmt.Printf("Testing '%s' against pattern: %s\n", input, re.String())
    fmt.Println("Match:", re.MatchString(input))
}

func main() {
    re := regexp.MustCompile(`^[A-Z][a-z]+$`)
    debugRegex(re, "Go")
    debugRegex(re, "golang")
}

The String method helps in debugging by showing which pattern
is being tested against which input strings.

## String with Multiple Regexps

This example shows how String can be used to manage multiple
compiled regular expressions in a program.

multiple_regexps.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    regexps := map[string]*regexp.Regexp{
        "email":    regexp.MustCompile(`^[^@]+@[^@]+\.[^@]+$`),
        "phone":    regexp.MustCompile(`^\d{3}-\d{3}-\d{4}$`),
        "username": regexp.MustCompile(`^[a-zA-Z0-9_]{3,16}$`),
    }

    for name, re := range regexps {
        fmt.Printf("%-8s pattern: %s\n", name, re.String())
    }
}

The example demonstrates how String can help identify which
compiled regex is which when managing multiple patterns in a program.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.String method in Go with
practical examples showing its usage for debugging and pattern management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).