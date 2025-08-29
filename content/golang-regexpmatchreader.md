+++
title = "Golang Regexp.MatchReader"
date = 2025-08-29T19:55:43.611+01:00
draft = false
description = "Learn how to match patterns using readers and regular expressions in Go. Includes examples of regex matching."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.MatchReader

last modified April 20, 2025

This tutorial explains how to use the Regexp.MatchReader method in Go.
We'll cover its purpose and provide practical examples with various input sources.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings or streams.

The Regexp.MatchReader method matches a regular expression pattern
against text provided by an io.RuneReader. It's useful for matching
against streams or large text sources without loading everything into memory.

## Basic MatchReader Example

The simplest use of MatchReader checks if a string matches a pattern.
Here we convert a string to a RuneReader first.

basic_matchreader.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`hello`)
    reader := strings.NewReader("hello world")
    
    matched := re.MatchReader(reader)
    fmt.Println(matched) // true
}

We compile the pattern "hello" and create a RuneReader from a string.
MatchReader returns true if the pattern is found in the input.

## Matching Against a File

MatchReader shines when working with files, as it doesn't require
loading the entire file into memory. This example checks for a pattern in a file.

file_matchreader.go
  

package main

import (
    "fmt"
    "os"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`error`)
    
    file, err := os.Open("log.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    
    matched := re.MatchReader(file)
    fmt.Println("File contains 'error':", matched)
}

The code opens a file and checks if it contains the word "error". The file is
read incrementally, making this memory-efficient for large files.

## Case-Insensitive Matching

We can combine MatchReader with regex flags for more flexible
matching. Here we perform case-insensitive matching.

case_insensitive.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`(?i)hello`)
    reader := strings.NewReader("HELLO world")
    
    matched := re.MatchReader(reader)
    fmt.Println(matched) // true
}

The (?i) flag makes the pattern case-insensitive. The match succeeds
despite the different casing in the input.

## Matching Against Custom Reader

MatchReader works with any type implementing io.RuneReader.
This example shows a custom reader implementation.

custom_reader.go
  

package main

import (
    "fmt"
    "regexp"
)

type MyReader struct {
    data []rune
    pos  int
}

func (r *MyReader) ReadRune() (ch rune, size int, err error) {
    if r.pos &gt;= len(r.data) {
        return 0, 0, io.EOF
    }
    ch = r.data[r.pos]
    r.pos++
    return ch, 1, nil
}

func main() {
    re := regexp.MustCompile(`pattern`)
    reader := &amp;MyReader{data: []rune("this contains pattern")}
    
    matched := re.MatchReader(reader)
    fmt.Println(matched) // true
}

We implement a simple io.RuneReader with a rune slice. MatchReader
works seamlessly with our custom reader, demonstrating its flexibility.

## Matching Multiple Patterns

This example shows how to check a reader against multiple patterns efficiently.
We reuse the same reader for multiple matches.

multi_pattern.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    patterns := []string{`error`, `warning`, `critical`}
    reader := strings.NewReader("system log: warning - low disk space")
    
    for _, pat := range patterns {
        re := regexp.MustCompile(pat)
        matched := re.MatchReader(reader)
        fmt.Printf("'%s' found: %t\n", pat, matched)
        reader.Seek(0, 0) // Reset reader position
    }
}

We test the input against three different patterns. The reader is reset after
each match to start from the beginning. This approach is memory-efficient.

## Performance Comparison

MatchReader can be more efficient than MatchString for
large inputs. This benchmark compares both methods.

performance.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
    "time"
)

func main() {
    largeInput := strings.Repeat("abc ", 1000000) + "target"
    re := regexp.MustCompile(`target`)
    
    // Using MatchString
    start := time.Now()
    re.MatchString(largeInput)
    fmt.Println("MatchString:", time.Since(start))
    
    // Using MatchReader
    start = time.Now()
    reader := strings.NewReader(largeInput)
    re.MatchReader(reader)
    fmt.Println("MatchReader:", time.Since(start))
}

MatchReader often performs better with very large inputs as it
processes the data incrementally. The difference becomes more noticeable with
larger inputs.

## Handling Unicode Characters

MatchReader properly handles Unicode characters since it works with
runes. This example demonstrates matching against Unicode text.

unicode_match.go
  

package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    re := regexp.MustCompile(`世界`)
    reader := strings.NewReader("你好，世界")
    
    matched := re.MatchReader(reader)
    fmt.Println("Contains '世界':", matched) // true
}

The example successfully matches the Chinese characters. MatchReader
correctly processes multi-byte Unicode characters through the RuneReader interface.

## Source

[Go regexp.MatchReader documentation](https://pkg.go.dev/regexp#Regexp.MatchReader)

This tutorial covered the Regexp.MatchReader method in Go with
practical examples of matching against various input sources efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).