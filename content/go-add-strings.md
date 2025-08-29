+++
title = "Go add strings"
date = 2025-08-29T19:54:59.574+01:00
draft = false
description = "Learn how to add strings in Go. Includes examples of string concatenation and formatting."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go add strings

last modified April 11, 2024

In this article we show how to concatenate strings in Golang.

In Go, a string is a read-only slice of bytes.

There are several ways of adding strings in Go: 

    - + and += operators

    - strings.Join method

    - string formatting

    - strings.Builder

    - bytes.Buffer

    - appending to byte slice

## Go add strings with + operator

The + and the += operators provide the easiest way of
concatenating strings. The + operator is used both for adding numbers and
strings; in programming we say that the operator is overloaded. 

addoper.go
  

package main

import "fmt"

func main() {

    w1 := "an"
    w2 := " old"
    w3 := " falcon"

    msg := w1 + w2 + w3

    fmt.Println(msg)
}

Two strings are added with the + operator. 

$ go run addoper.go 
an old falcon

In the second example, we use the compound addition operator. 

addoper2.go
  

package main

import "fmt"

func main() {

    msg := "There are"

    msg += " three falcons"
    msg += " in the sky"

    fmt.Println(msg)
}

The example builds a message with the += operator. 

$ go run addoper2.go 
There are three falcons in the sky

## Go add strings with strings.Join

The string.Join method concatenates the elements of a slice to
create a single string. The second argument is the separator which is placed
between elements in the resulting string. 

joining.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    s := []string{"There", "are", "two", "owls", "on", "the", "tree", "\n"}
    fmt.Printf(strings.Join(s, " "))
}

In the code example, we form a message by joining multiple words. The words are
joined with a single space character. 

$ go run joining.go 
There are two owls on the tree 

## Go add strings with string formatting

Strings can be concatenated with Go's string formatting functions:
fmt.Sprint, fmt.Sprintln, and
fmt.Sprintf.

string_format.go
  

package main

import "fmt"

func main() {

    w1 := "an"
    w2 := "old"
    w3 := "falcon"

    msg := fmt.Sprintf("%s %s %s", w1, w2, w3)

    fmt.Println(msg)
}

We use the fmt.Sprintf function to concatenate three words.

$ go run string_format.go 
an old falcon

## Go add strings with strings.Builder

The strings.Builder is used to efficiently build a string using
Write methods.

builder.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    var builder strings.Builder

    builder.WriteString("There")
    builder.WriteString(" are")
    builder.WriteString(" two")
    builder.WriteString(" falcons")
    builder.WriteString(" in")
    builder.WriteString(" the")
    builder.WriteString(" sky")

    fmt.Println(builder.String())
}

The example builds a string with strings.Builder

builder.WriteString("There")

A new string is added with WriteString.

fmt.Println(builder.String())

The String returns the accumulated string.

## Go add strings with bytes.Buffer

A Buffer is a variable-sized buffer of bytes with Read and Write
methods.

bytesbuf.go
  

package main

import (
    "bytes"
    "fmt"
)

func main() {

    var buffer bytes.Buffer

    buffer.WriteString("a")
    buffer.WriteString(" beautiful")
    buffer.WriteString(" day")

    fmt.Println(buffer.String())
}

The WriteString method appends the contents of the given string to
the buffer, growing the buffer as needed.

fmt.Println(buffer.String())

The String method returns the contents of the unread portion of the
buffer as a string. 

## Go add strings with a slice of byte

The following example concatenates strings using a byte slice.

byteslice.go
  

package main

import (
    "fmt"
)

func main() {

    var s1 = "an"
    var s2 = " old"
    var s3 = " falcon"

    msg := make([]byte, 0)

    msg = append(msg, []byte(s1)...)
    msg = append(msg, []byte(s2)...)
    msg = append(msg, []byte(s3)...)

    fmt.Println(string(msg))
}

The example adds three strings.

msg := make([]byte, 0)

A new slice of byte is created with the make function.

msg = append(msg, []byte(s1)...)

We transform a string to a byte slice with byte and append it to
the msg slice with append.

fmt.Println(string(msg))

In the end, we convert the byte slice to string with string.

## Source

[Go strings package - reference](https://pkg.go.dev/strings)

In this article we have showed how to add strings in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).