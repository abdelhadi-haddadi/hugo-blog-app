+++
title = "Go rune"
date = 2025-08-29T19:55:50.408+01:00
draft = false
description = "Learn how to work with runes in Go. Includes examples of rune manipulation and usage."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go rune

last modified April 11, 2024

In this article we show how to work with runes in Golang.

A rune is an alias to the int32 data type. It represents a Unicode
code point. A Unicode code point or code position is a numerical value that is
usually used to represent a Unicode character. The int32 is big
enough to represent the current volume of 140,000 unicode characters.

ASCII defines 128 characters, identified by the code points 0-127. Unicode, a
superset of ASCII, defines the codespace of 1,114,112 code points.

The original rune word is a letter belonging to the written language of various
ancient Germanic peoples, especially the Scandinavians and the Anglo-Saxons.

A string is a sequence of bytes; more precisely, a slice of arbitrary bytes. In
Go, source code is UTF8. Strings can contain Unicode text encoded in UTF-8,
which encodes all Unicode code points using one to four bytes.

## Go rune constants

A Go rune constant is delimited with a pair of single quote '
characters.

rune_constant.go
  

package main

import (
    "fmt"
    "reflect"
)

func main() {

    a1 := '🦍'
    var a2 = 'k'
    var a3 rune = '🦡'

    fmt.Printf("%c - %s\n", a1, reflect.TypeOf(a1))
    fmt.Printf("%c - %s\n", a2, reflect.TypeOf(a2))
    fmt.Printf("%c - %s\n", a3, reflect.TypeOf(a3))
}

We define three rune constants.

a1 := '🦍'
var a2 = 'k'
var a3 rune = '🦡'

We have two emojis and a ASCII character. Go automatically infers a
rune type if not specified explicitly.

fmt.Printf("%c - %s\n", a1, reflect.TypeOf(a1))
fmt.Printf("%c - %s\n", a2, reflect.TypeOf(a2))
fmt.Printf("%c - %s\n", a3, reflect.TypeOf(a3))

We print the characters and their types.

$ go run rune_constant.go
🦍 - int32
k - int32
🦡 - int32

We can use escapes to define rune constants.

rune_escapes.go
  

package main

import (
    "fmt"
)

func main() {

    a1 := '🧺'
    a2 := '\u2665'
    a3 := '\U0001F3A8'

    fmt.Printf("%c\n", a1)
    fmt.Printf("%c\n", a2)
    fmt.Printf("%c\n", a3)
}

We define three constants; two of them are using escapes.

a2 := '\u2665'

In the first case, the \u is followed by exactly four hexadecimal
digits.

a3 := '\U0001F3A8'

In the second case, the \U is followed by exactly eight hexadecimal
digits.

$ go run rune_escapes.go
🧺
♥
🎨

## Go rune Unicode code points

The Unicode code points refer to the characters in the Unicode table.

code_points.go
  

package main

import "fmt"

func main() {

    s1 := "falcon"
    r1 := []rune(s1)
    fmt.Printf("%U\n", r1)

    s2 := "🐧🐧🐧"
    r2 := []rune(s2)
    fmt.Printf("%U\n", r2)
}

With the %U format verb, we get the Unicode code point.

$ go run code_points.go 
[U+0066 U+0061 U+006C U+0063 U+006F U+006E]
[U+1F427 U+1F427 U+1F427]

## Go counting runes

In the following example, we count the number of runes in a string.

count.go
  

package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {

    msg := "one 🐜"
    n1 := len(msg)
    n2 := utf8.RuneCountInString(msg)

    fmt.Println(n1)
    fmt.Println(n2)
}

With the len function, we get the number of bytes. To count the
number of runes, we  use the utf8.RuneCountInString function.

$ go run count.go
8
5

## Go runes and bytes

A byte in Go is an alias for uint8; it is an "ASCII byte".

runes_bytes.go
  

package main

import (
    "fmt"
)

func main() {

    msg := "🐘 🦥 🐋"

    data := []rune(msg)
    fmt.Println(data)

    data2 := []byte(msg)
    fmt.Println(data2)
}

We have a string consisting of three emojis and two spaces. We print the slice
of runes and bytes for comparison.

$ go run rune_bytes.go
[128024 32 129445 32 128011]
[240 159 144 152 32 240 159 166 165 32 240 159 144 139]

## Go loop over runes

The for/range form iterates over runes.

loop.go
  

package main

import (
    "fmt"
)

func main() {

    msg := "one 🐘 and three 🐋"

    for idx, e := range msg {
        fmt.Printf("Char:%s Byte pos: %d \n", string(e), idx)
    }
}

The example iterates over runes. It shows the character and its byte position in
the string.

$ go run loop.go
Char:o Byte pos: 0
Char:n Byte pos: 1
Char:e Byte pos: 2
Char:  Byte pos: 3
Char:🐘 Byte pos: 4
Char:  Byte pos: 8
Char:a Byte pos: 9
Char:n Byte pos: 10
Char:d Byte pos: 11
Char:  Byte pos: 12
Char:t Byte pos: 13
Char:h Byte pos: 14
Char:r Byte pos: 15
Char:e Byte pos: 16
Char:e Byte pos: 17
Char:  Byte pos: 18
Char:🐋 Byte pos: 19

In the next example, we have another way of traversing runes.

loop2.go
  

package main

import (
    "fmt"
)

func main() {

    msg := "one 🐘 and three 🐋"
    data := []rune(msg)

    for i := 0; i &lt; len(data); i++ {
        fmt.Printf("Char %c Unicode: %U, Rune pos: %d\n", data[i], data[i], i)
    }

    fmt.Println()
}

We convert the string to a rune slice and then we loop over the slice with a 
for loop. 

$ go run loop2.go 
Char o Unicode: U+006F, Rune pos: 0
Char n Unicode: U+006E, Rune pos: 1
Char e Unicode: U+0065, Rune pos: 2
Char   Unicode: U+0020, Rune pos: 3
Char 🐘 Unicode: U+1F418, Rune pos: 4
Char   Unicode: U+0020, Rune pos: 5
Char a Unicode: U+0061, Rune pos: 6
Char n Unicode: U+006E, Rune pos: 7
Char d Unicode: U+0064, Rune pos: 8
Char   Unicode: U+0020, Rune pos: 9
Char t Unicode: U+0074, Rune pos: 10
Char h Unicode: U+0068, Rune pos: 11
Char r Unicode: U+0072, Rune pos: 12
Char e Unicode: U+0065, Rune pos: 13
Char e Unicode: U+0065, Rune pos: 14
Char   Unicode: U+0020, Rune pos: 15
Char 🐋 Unicode: U+1F40B, Rune pos: 16

## Source

[Strings, bytes, runes and characters in Go](https://go.dev/blog/strings)

In this article we have worked with Go runes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).