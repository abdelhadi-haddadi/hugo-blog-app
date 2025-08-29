+++
title = "Go ellipses"
date = 2025-08-29T19:55:11.733+01:00
draft = false
description = "Learn how to use the ellipses operator (...) in Go. Includes examples of variadic functions and array literals."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go ellipses

last modified April 11, 2024

In this article we show how to use the ellipses operator. 

The ellipses (...) (or three dots) operator is used in variadic functions, array
literals and go commands. 

## Go variadic function parameters

Variadic functions can be called with any number of trailing arguments.

main.go
  

package main

import "fmt"

func main() {

    fmt.Println(Sum(1, 2, 3))
    fmt.Println(Sum(1, 2, 3, 4))
    fmt.Println(Sum(1, 2, 3, 4, 5))
}

func Sum(n ...int) int {

    sum := 0

    for _, n := range n {

        sum += n
    }

    return sum
}

In the example, we have the Sum function which can accept any
number of integer values. 

$ go run main.go 
6
10
15

We can use the three dots when we pass a slice as the argument to the variadic 
function.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{1, 2, 3, 4, 5, 6, 7}

    fmt.Println(Sum(vals...))
}

func Sum(n ...int) int {

    sum := 0

    for _, n := range n {

        sum += n
    }

    return sum
}

In the example we pass a slice of integers to the Sum function.

## Infering array length

We can infer the array length when using array literals with the ellipses
... operator.

main.go
  

package main

import "fmt"

func main() {

    vals := [...]int{ 1, 2, 3, 4, 5, 6 }
    fmt.Println(vals)
}

In the code example, we use the ... in the array declaration. This
tells Go to infer the length of the array from the provided array literal.

$ go run main.go
[1 2 3 4 5 6]

## Wildcards

The ellipses can be used as wildcars in go commands.

$ go list ...
archive/tar
archive/zip
bufio
bytes
compress/bzip2
compress/flate
compress/gzip
compress/lzw
compress/zlib
container/heap
container/list
container/ring
context
crypto
crypto/aes
crypto/cipher
...

The command lists all packages recursively, including the packages from the
standard library in the current directory.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered the ellipses (three dots) operator in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).