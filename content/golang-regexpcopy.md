+++
title = "Golang Regexp.Copy"
date = 2025-08-29T19:55:36.964+01:00
draft = false
description = "Learn how to copy regular expressions in Go. Includes examples of regex duplication and usage."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.Copy

last modified April 20, 2025

This tutorial explains how to use the Regexp.Copy method in Go.
We'll cover regular expression basics and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.Copy method creates a new copy of a compiled regular
expression. This is useful when you need thread-safe regex operations.

## Basic Regexp.Copy Example

The simplest use of Regexp.Copy creates a duplicate regex object.
Here we demonstrate basic copying functionality.

basic_copy.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    original := regexp.MustCompile(`hello`)
    copy := original.Copy()
    
    fmt.Println(original.MatchString("hello world")) // true
    fmt.Println(copy.MatchString("hello world"))    // true
}

We create an original regex and its copy. Both objects produce identical matching
results. The copy is completely independent of the original.

## Copy for Concurrent Use

The primary use case for Copy is safe concurrent regex operations.
This example shows concurrent matching with copies.

concurrent_copy.go
  

package main

import (
    "fmt"
    "regexp"
    "sync"
)

func main() {
    original := regexp.MustCompile(`\d+`)
    var wg sync.WaitGroup
    
    for i := 0; i &lt; 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            re := original.Copy()
            fmt.Printf("Goroutine %d: %v\n", id, re.MatchString("123"))
        }(i)
    }
    
    wg.Wait()
}

Each goroutine gets its own copy of the regex. This prevents race conditions that
could occur with shared regex objects. Copies are safe for concurrent use.

## Copy Before Modification

When you need to modify a regex (like changing its match limits), create a copy
first to preserve the original. This example demonstrates this pattern.

modify_copy.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    original := regexp.MustCompile(`a+b*`)
    modified := original.Copy()
    
    // Modify the copy's match limits
    modified.Longest()
    
    fmt.Println("Original:", original.MatchString("aaabbb")) // true
    fmt.Println("Modified:", modified.MatchString("aaabbb")) // true
    
    // Original remains unchanged
    fmt.Println("Original match mode:", original.MatchString("aaab"))
    fmt.Println("Modified match mode:", modified.MatchString("aaab"))
}

We copy before modifying match behavior. The original regex remains unchanged.
This preserves the original configuration while allowing customization.

## Copying Compiled Regexp with Subexpressions

Copied regex objects maintain all subexpression information from the original.
This example shows copied regex with capture groups.

subexpr_copy.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    original := regexp.MustCompile(`(\w+)\s(\w+)`)
    copy := original.Copy()
    
    str := "John Doe"
    
    origMatches := original.FindStringSubmatch(str)
    copyMatches := copy.FindStringSubmatch(str)
    
    fmt.Println("Original:", origMatches[1], origMatches[2])
    fmt.Println("Copy:", copyMatches[1], copyMatches[2])
}

Both the original and copy correctly identify the capture groups. The copy
retains all pattern matching capabilities of the original regex.

## Memory Efficiency with Copy

Copying a compiled regex is more memory-efficient than recompiling the same
pattern. This benchmark compares the two approaches.

memory_benchmark.go
  

package main

import (
    "fmt"
    "regexp"
    "runtime"
    "time"
)

func main() {
    original := regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
    
    start := time.Now()
    var memStats runtime.MemStats
    
    // Test copying
    runtime.ReadMemStats(&amp;memStats)
    startAlloc := memStats.Alloc
    for i := 0; i &lt; 1000; i++ {
        _ = original.Copy()
    }
    runtime.ReadMemStats(&amp;memStats)
    fmt.Printf("Copy: %v, Memory: %d bytes\n", 
        time.Since(start), memStats.Alloc-startAlloc)
    
    // Test recompiling
    start = time.Now()
    runtime.ReadMemStats(&amp;memStats)
    startAlloc = memStats.Alloc
    for i := 0; i &lt; 1000; i++ {
        _ = regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
    }
    runtime.ReadMemStats(&amp;memStats)
    fmt.Printf("Recompile: %v, Memory: %d bytes\n", 
        time.Since(start), memStats.Alloc-startAlloc)
}

Copying is significantly faster and uses less memory than recompiling. Always
copy when you need multiple instances of the same regex pattern.

## Copying Regexp with Custom Flags

Copied regex objects preserve all flags from the original. This example shows
flag preservation in copies.

flags_copy.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    original := regexp.MustCompile(`(?i)hello`)
    copy := original.Copy()
    
    fmt.Println("Original case-insensitive:", original.MatchString("HELLO"))
    fmt.Println("Copy case-insensitive:", copy.MatchString("HELLO"))
    
    // Both should match regardless of case
    fmt.Println("Original:", original.MatchString("HeLlO"))
    fmt.Println("Copy:", copy.MatchString("hElLo"))
}

The case-insensitive flag ((?i)) is preserved in the copy. All
regex modifiers and flags are duplicated exactly in the copied object.

## Copying for Safe API Design

When exposing regex objects in APIs, return copies to prevent external
modification of internal state. This example demonstrates this pattern.

api_design.go
  

package main

import (
    "fmt"
    "regexp"
)

type Validator struct {
    emailRegex *regexp.Regexp
}

func NewValidator() *Validator {
    return &amp;Validator{
        emailRegex: regexp.MustCompile(`^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`),
    }
}

func (v *Validator) EmailRegex() *regexp.Regexp {
    return v.emailRegex.Copy()
}

func main() {
    validator := NewValidator()
    userRegex := validator.EmailRegex()
    
    // User can't modify the validator's internal regex
    userRegex.Longest()
    
    fmt.Println("Validator:", validator.emailRegex.MatchString("test@example.com"))
    fmt.Println("User copy:", userRegex.MatchString("test@example.com"))
}

By returning a copy, we prevent API consumers from modifying our internal regex
state. This maintains encapsulation and thread safety in library design.

## Source

[Go regexp.Copy documentation](https://pkg.go.dev/regexp#Regexp.Copy)

This tutorial covered the Regexp.Copy method in Go with practical
examples of copying compiled regular expressions for various use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).