+++
title = "Go print functions"
date = 2025-08-29T19:55:33.574+01:00
draft = false
description = "Learn how to print in Go. Includes examples of formatted and unformatted output."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go print functions

last modified April 11, 2024

In this article we show how to print to console with fmt.Print, fmt.Printf,
and fmt.Println.

The functions are variadic, i.e. they can accept multiple arguments.

## Go fmt.Print

The fmt.Print writes its arguments to the standard output. It adds
spaces between operands when neither is a string.

func Print(a ...any) (n int, err error)

The function returns the number of bytes written and any write error
encountered.

main.go
  

package main

import "fmt"

func main() {

    var w1, w2, w3 string = "An", "old", "falcon"

    fmt.Print("An old falcon\n")
    fmt.Print("An", " old", " falcon", "\n")
    fmt.Print(w1, " ", w2, " ", w3, "\n")

    var n1 int = 14
    var n2 int = 11
    var n3 int = 12

    fmt.Print(n1, n2, n3)
    fmt.Print("\n")
}

We write three messages and three integers to the console.

var w1, w2, w3 string = "An", "old", "falcon"

fmt.Print("An old falcon\n")
fmt.Print("An", " old", " falcon", "\n")
fmt.Print(w1, " ", w2, " ", w3, "\n")

Three strings are written to the console. We explicitly add spaces and newlines.

var n1 int = 14
var n2 int = 11
var n3 int = 12

fmt.Print(n1, n2, n3)

When printing integers, the spaces are automatically added between them.

$ go run main.go
An old falcon
An old falcon
An old falcon
14 11 12

## Go fmt.Println

The fmt.Println writes its arguments to the standard output and
appends a newline character. It adds spaces between operands when neither is a
string.

func Println(a ...any) (n int, err error)

The function returns the number of bytes written and any write error
encountered.

main.go
  

package main

import "fmt"

func main() {

    var w1, w2, w3 string = "An", "old", "falcon"

    var n1 int = 14
    var n2 int = 11
    var n3 int = 12

    fmt.Println("An old falcon")
    fmt.Println("An", " old", " falcon")
    fmt.Println(w1, " ", w2, " ", w3)

    fmt.Println(n1, n2, n3)
}

In the example, we can remove newline characters since the
fmt.Println automatically appends them.

## Go fmt.Printf

The fmt.Printf formats according to a format specifier and writes
to standard output.

func Printf(format string, a ...any) (n int, err error)

The function returns the number of bytes written and any write error
encountered.

main.go
  

package main

import (
    "fmt"
)

func main() {

    name := "Jane"
    age := 17

    fmt.Printf("%s is %d years old\n", name, age)
}

In the example, we write a formatted message to the console.

fmt.Printf("%s is %d years old\n", name, age)

The %s specifier is used for strings and %d for
integers.

$ go run main.go
Jane is 17 years old

## Go built-in print functions

Go also contains built-in print and println functions,
which are outside of any module. The functions are useful for quick debugging.

main.go
  

package main

func main() {

    print("An old falcon\n")
    println("An old falcon")
}

The documentation writes that they may be removed in the future.

## Source

[Go fmt package - reference](https://pkg.go.dev/fmt)

In this article we have showed how to print to the console in Go using
fmt.Print, fmt.Println, and fmt.Printf
functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).