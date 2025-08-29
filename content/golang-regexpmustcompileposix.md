+++
title = "Golang regexp.MustCompilePOSIX"
date = 2025-08-29T19:55:44.754+01:00
draft = false
description = "Learn how to use MustCompile for POSIX regular expressions in Go. Includes examples of regex compilation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang regexp.MustCompilePOSIX

last modified April 20, 2025

This tutorial explains how to use the regexp.MustCompilePOSIX function in Go.
We'll cover POSIX regular expression basics and provide practical examples.

A POSIX regular expression is a standardized pattern matching syntax
defined by IEEE. It differs from Perl-style regex in some matching rules.

The regexp.MustCompilePOSIX function compiles a POSIX regular expression
pattern into a reusable Regexp object. It panics if the pattern is invalid.

## Basic MustCompilePOSIX Example

This simple example demonstrates basic pattern matching with POSIX regex.
The main difference is in how alternation works.

basic_posix.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {

    re := regexp.MustCompilePOSIX(`hello|forest`)
    fmt.Println(re.MatchString("hello"))  // true
    fmt.Println(re.MatchString("forest")) // true
    fmt.Println(re.MatchString("smell"))  // false
}

The pattern matches either "hello" or "forest". POSIX regex uses
longest-leftmost matching for alternations unlike Perl-style regex.

## POSIX vs Perl Character Classes

POSIX regex has different character class definitions. This example shows
the POSIX character class syntax.

posix_classes.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompilePOSIX(`[[:alpha:]]+`)
    inputs := []string{"hello", "123", "abc123"}

    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("%q contains only letters\n", input)
        } else {
            fmt.Printf("%q doesn't contain only letters\n", input)
        }
    }
}

POSIX uses [[:alpha:]] for letters instead of \p{L}.
The pattern matches strings containing only alphabetic characters.

## POSIX Alternation Behavior

POSIX regex uses longest-leftmost matching for alternations. This example
demonstrates the difference from Perl-style regex.

posix_alternation.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    posixRe := regexp.MustCompilePOSIX(`get|getter`)
    perlRe := regexp.MustCompile(`get|getter`)

    input := "getter"

    fmt.Println("POSIX match:", posixRe.FindString(input)) // getter
    fmt.Println("Perl match:", perlRe.FindString(input))   // get
}

POSIX regex matches the longest possible leftmost alternative ("getter"),
while Perl-style matches the first alternative that works ("get").

## POSIX Bracket Expressions

POSIX supports special bracket expressions for character classes.
This example shows collating symbols and equivalence classes.

posix_brackets.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Matches 'a', 'b', or 'ch' (Spanish collation)
    re := regexp.MustCompilePOSIX(`[[.a.][.b.][.ch.]]`)
    
    inputs := []string{"a", "b", "ch", "c", "h"}

    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("%q matches\n", input)
        } else {
            fmt.Printf("%q doesn't match\n", input)
        }
    }
}

The pattern uses POSIX collating symbols [.ch.] to treat "ch" as
a single character in Spanish collation order.

## POSIX Word Boundaries

POSIX regex handles word boundaries differently. This example shows
POSIX word boundary matching behavior.

posix_word_boundaries.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompilePOSIX(`\bword\b`)
    inputs := []string{"word", "wordy", "a word", "word's"}

    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("%q matches whole word\n", input)
        } else {
            fmt.Printf("%q doesn't match whole word\n", input)
        }
    }
}

POSIX word boundaries \b consider different character definitions
than Perl regex. The behavior may differ with non-ASCII characters.

## POSIX Repetition Limits

POSIX regex has different rules for repetition operators. This example
demonstrates the greedy matching behavior.

posix_repetition.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompilePOSIX(`a{1,2}abb`)
    inputs := []string{"aabb", "aaabb", "aaaabb"}

    for _, input := range inputs {
        if re.MatchString(input) {
            fmt.Printf("%q matches\n", input)
        } else {
            fmt.Printf("%q doesn't match\n", input)
        }
    }
}

POSIX always takes the maximum number of repetitions when possible.
Here a{1,2} will match two 'a's if available.

## POSIX vs Perl Regex Performance

POSIX regex matching can have different performance characteristics.
This example benchmarks both implementations.

posix_performance.go
  

package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    text := "a long text with many patterns to match against"
    posixRe := regexp.MustCompilePOSIX(`pattern|match|text`)
    perlRe := regexp.MustCompile(`pattern|match|text`)

    start := time.Now()
    for i := 0; i &lt; 10000; i++ {
        posixRe.MatchString(text)
    }
    fmt.Println("POSIX time:", time.Since(start))

    start = time.Now()
    for i := 0; i &lt; 10000; i++ {
        perlRe.MatchString(text)
    }
    fmt.Println("Perl time:", time.Since(start))
}

POSIX regex may be slower for some patterns due to its different matching
algorithm. Always benchmark for performance-critical code.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the regexp.MustCompilePOSIX function in Go with
practical examples of POSIX regular expression usage.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).