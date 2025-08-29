+++
title = "Go string"
date = 2025-08-29T19:56:21.069+01:00
draft = false
description = "An introductory guide to working with strings in Go. Covers string operations, escape sequences, and best practices."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go string

last modified May 4, 2025

In this article we show how to work with strings in Golang. It is a simple
introduction to Go strings.

## Definitions

A *string* in Go is an immutable sequence of bytes. Unlike many
programming languages where strings are treated as collections of characters, Go
strings are fundamentally byte slices. When indexing a string, Go returns a
byte, not a character, which means multi-byte characters (such as those in UTF-8
encoding) require special handling.

A Go string can store arbitrary bytes, not just UTF-8 encoded text. While Go's
built-in string manipulation functions assume UTF-8 encoding, a string itself
does not enforce any character encoding. This flexibility allows Go strings to
represent binary data, file contents, or encoded text.

### String Literals

Go supports two types of string literals: **regular strings** and
**raw strings**.

    **Regular strings:** Enclosed in double quotes ("
    "), they support escape sequences such as \n (newline)
    and \t (tab). These escape sequences allow precise formatting
    of strings.
    **Raw strings:** Enclosed in backticks (` `),
    they preserve their contents exactly as written without interpreting escape
    sequences. This makes them ideal for storing file paths, JSON, or multiline
    content.

Since raw strings do not process escape sequences, they are particularly useful
for handling large text blocks or code snippets without requiring manual
escaping.

### UTF-8 and Unicode Handling

Go source files use UTF-8 encoding, and Go string literals inherently consist of
UTF-8 byte sequences. These sequences map to Unicode code
points, which represent individual characters. In Go, a Unicode code
point is referred to as a *rune*, which is an alias for the
int32 type.

When iterating over a string, Go provides two primary approaches:

    **Classic for loops:** Iterates over individual bytes,
    which may not correctly handle multi-byte characters.
    **For-range loops:** Decodes and processes each UTF-8
    encoded rune, ensuring proper handling of multibyte characters.

The for-range loop is particularly useful when working with internationalized
text or characters beyond the ASCII range, as it prevents accidental
fragmentation of multi-byte sequences.

### String Operations

Go provides several built-in functions for working with strings through the strings package, including:

    - strings.Contains(s, substr) - Checks if substr exists within s.

    - strings.Split(s, sep) - Splits s into a slice of substrings based on sep.

    - strings.Replace(s, old, new, n) - Replaces occurrences of old with new.

    - strings.ToUpper(s) - Converts a string to uppercase.

    - strings.TrimSpace(s) - Removes leading and trailing whitespace.

While strings are immutable in Go, you can efficiently modify their contents
using the bytes.Buffer type, which allows dynamic string
manipulation with better performance than repeated concatenation.

## Go string simple example

The following example is a simple example with strings.

simple.go
  

package main

import (
    "fmt"
)

func main() {

    w1 := "a red fox"

    fmt.Println(w1)

    w2 := w1 + " and a falcon"
    fmt.Println(w2)
}

We define a regular string and print it. Then we concatenate two strings.

w1 := "a red fox"

A regular string is placed between two double quote characters.

w2 := w1 + " and a falcon"

With the + operator, we add two strings.

$ go run simple.go
a red fox
a red fox and a falcon

## Go compare strings

Strings are compared with the == operator. Case-insensitive
comparisons are performed with the EqualFold function.

comparing.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    w1 := "Aikido"
    w2 := "aikido"

    if w1 == w2 {

        fmt.Println("the strings are equal")
    } else {

        fmt.Println("the strings are not equal")
    }

    if strings.EqualFold(w1, w2) {

        fmt.Println("the strings are equal")
    } else {

        fmt.Println("the strings are not equal")
    }
}

The example compares two strings in case-sensitive and case-insensitive manner.

$ go run comparing.go
the strings are not equal
the strings are equal

## Escape sequences in Go

Escape sequences are special characters that have a specific meaning when used
within a string literal. For instance, the new-line \n escape
sequence causes the next character to appear on a new line.

escapes.go
  

package main

import (
    "fmt"
)

func main() {

    w1 := "old falcon\tred fox\nfast dog\tlazy cat\n"
    fmt.Println(w1)

    w2 := "it was a \"great film\""
    fmt.Println(w2)
}

In the code example, we use several escape sequences.

w1 := "old falcon\tred fox\nfast dog\tlazy cat\n"

The \n adds a new line and the \t a horizontal tab.

w2 := "it was a \"great film\""

Sometimes we want to print the double quote character. Since it is part of the
Go syntax, we need to use the escape character to print it.

$ go run escapes.go
old falcon      red fox
fast dog        lazy cat

it was a "great film"

## Go raw &amp; multiline strings

Raw and multiline strings are created with backticks.

raw_multi.go
  

package main

import (
    "fmt"
)

func main() {

    w1 := "old falcon\tred fox\nfast dog\tlazy cat\n"
    fmt.Println(w1)

    w2 := `old falcon\tred fox\nfast dog\tlazy cat\n`
    fmt.Println(w2)

    sonnet55 := `
Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword nor war's quick fire shall burn
The living record of your memory.
'Gainst death and all-oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the Judgement that yourself arise,
You live in this, and dwell in lovers' eyes.
    `

    fmt.Println(sonnet55)
}

The w2 string is a raw string and contains escape characters. They
are printed rather than being interpreted. The sonnet55 is an
example of a multiline strings in Go.

$ go run raw_multi.go
old falcon      red fox
fast dog        lazy cat

old falcon\tred fox\nfast dog\tlazy cat\n

Not marble nor the gilded monuments
Of princes shall outlive this powerful rhyme,
But you shall shine more bright in these contents
Than unswept stone besmeared with sluttish time.
When wasteful war shall statues overturn,
And broils root out the work of masonry,
Nor Mars his sword nor war's quick fire shall burn
The living record of your memory.
'Gainst death and all-oblivious enmity
Shall you pace forth; your praise shall still find room
Even in the eyes of all posterity
That wear this world out to the ending doom.
So, till the Judgement that yourself arise,
You live in this, and dwell in lovers' eyes.

## Looping strings in Go

With the classic for loops we loop over bytes. The for range loops over
runes.

looping.go
  

package main

import (
    "fmt"
)

func main() {

    w := "合気道"

    for idx, s := range w {

        fmt.Printf("The index number of %c is %d\n", s, idx)
    }

    fmt.Println("Bytes:")

    for i := 0; i &lt; len(w); i++ {

        fmt.Printf("%x ", w[i])
    }

    fmt.Println()
}

The example uses both for loops.

$ go run looping.go
The index number of 合 is 0
The index number of 気 is 3
The index number of 道 is 6
Bytes:
e5 90 88 e6 b0 97 e9 81 93

## Counting

The len function counts the number of bytes while the
RuneCountInString counts the number of runes in a string.

counting.go
  

package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {

    w1 := "Aikido"

    fmt.Printf(w1 + "\n")
    fmt.Printf("Number of bytes %d\n", len(w1))
    fmt.Printf("Number of runes %d\n", utf8.RuneCountInString(w1))

    fmt.Printf("---------------\n")

    w2 := "合気道"

    fmt.Printf(w2 + "\n")
    fmt.Printf("Number of bytes %d\n", len(w2))
    fmt.Printf("Number of runes %d\n", utf8.RuneCountInString(w2))
}

The example prints the number of bytes and runes in a latin string and
a Japanese hiragana.

$ go run counting.go
Aikido
Number of bytes 6
Number of runes 6
---------------
合気道
Number of bytes 9
Number of runes 3

## Go string Join/Split

The strings.Join function concatenates the elements of its first 
argument to create a single string, while the strings.Split 
function slices the given string into all substrings separated by the provided 
separator and returns a slice of the substrings.

join_split.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    langs := []string{"F#", "Go", "Python", "Perl", "Erlang"}

    s := strings.Join(langs, ", ")
    fmt.Println(s)

    data := strings.Split(s, ",")
    fmt.Println(data)
}

We define a slice of strings. We join the strings into a single string with 
strings.Join and later cut it into substrings with 
strings.Split.

$ go run join_split.go 
F#, Go, Python, Perl, Erlang
[F#  Go  Python  Perl  Erlang]

## Go runes

A Go rune is an alias to the int32 data type. It represents a Unicode CodePoint.
The original rune word is a letter belonging to the written language of various
ancient Germanic peoples, especially the Scandinavians and the Anglo-Saxons.

runes.go
  

package main

import (
    "fmt"
)

func main() {

    data := []rune {'♬', '♛', '♠', '🐘', '🐋'}

    for i, val := range data {

        fmt.Printf("Char %c Unicode: %U, Position: %d\n", val, val, i)
    }
}

In the code example, we have an array of runes. The runes are emoji characters.

for i, val := range data {

    fmt.Printf("Char %c Unicode: %U, Position: %d\n", val, val, i)
}

We go through the array of runes and print them and their unicode code points
and positions.

$ go run runes.go
Char ♬ Unicode: U+266C, Position: 0
Char ♛ Unicode: U+265B, Position: 1
Char ♠ Unicode: U+2660, Position: 2
Char 🐘 Unicode: U+1F418, Position: 3
Char 🐋 Unicode: U+1F40B, Position: 4

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered strings in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).