+++
title = "Go join string"
date = 2025-08-29T19:55:24.659+01:00
draft = false
description = "Learn how to join strings in Go. Includes examples of string concatenation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go join string

last modified April 11, 2024

In this article we show how to join strings in Golang. 

To join strings, we can use the + operator, fmt.Sprintf function, and
strings.Join function.

## Go join strings with + operator

Many programming languages use the + operator to join strings.

main.go
  

package main

import "fmt"

func main() {

    w1 := "old"
    w2 := "falcon"

    msg := w1 + " " + w2

    fmt.Println(msg)
}

Two words are joined in the example. We also add a space character between them.

$ go run main.go 
old falcon

## Go join strings with fmt.Sprintf

The fmt.Sprintf function builds a string according to the given
format specifiers and returns the resulting string.

main.go
  

package main

import "fmt"

func main() {

    w1 := "old"
    w2 := "falcon"

    msg := fmt.Sprintf("%s %s", w1, w2)

    fmt.Println(msg)
}

The example builds a message by joining two words.

## Go join strings with bytes.Buffer

A bytes.Buffer is a variable-sized buffer of bytes with Read and
Write methods. 

main.go
  

package main

import (
    "bytes"
    "fmt"
)

func main() {

    var buf bytes.Buffer

    buf.WriteString("an ")
    buf.WriteString("old ")
    buf.WriteString("falcon")

    fmt.Println(buf.String())
}

In the example, we write strings to the bytes buffer with
WriteString and then convert the bytes into a final string with
String function.

$ go run main.go 
an old falcon

## Go strings.Join

The strings.Join function joins string elements of a slice/array
into one string. The separator string is placed between elements in the
resulting string. 

fmt_funs.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    words := []string{"an", "old", "falcon"}
    msg := strings.Join(words, " ")

    fmt.Println(msg)
}

We have a slice of words. We join them with strings.Join, utilizing 
a single space as a separator.

## Go String function

The String function of an object is called when it is passed to any
of the print functions. It is commonly used to display a human-readable
representation of the object.

main.go
  

package main

import (
    "fmt"
)

type User struct {
    Name       string
    Occupation string
}

func (u User) String() string {

    return fmt.Sprintf("%s is a(n) %s", u.Name, u.Occupation)
}

func main() {

    u1 := User{"John Doe", "gardener"}
    u2 := User{"Roger Roe", "driver"}

    fmt.Println(u1)
    fmt.Println(u2)
}

In the example, we use the fmt.Sprintf function to generate an 
output of a User type.

$ go run main.go 
John Doe is a(n) gardener
Roger Roe is a(n) driver

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have showed how to join strings in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).