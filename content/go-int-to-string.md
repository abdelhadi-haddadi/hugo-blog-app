+++
title = "Go int to string"
date = 2025-08-29T19:55:23.545+01:00
draft = false
description = "Learn how to convert integers to strings in Go. Includes examples of type conversion."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go int to string

last modified April 11, 2024

In this article we show how to convert integers to strings in
Golang. 

## Go int to string conversion

Integer to string conversion is a type conversion or type casting, where an
entity of integer data type is changed into string one. 

In Go, we can perform the int to string conversion with the strconv.FormatInt,
strconv.Itoa, or fmt.Sprintf functions.

The strconv package  implements conversions to and from string
representations of basic data types. 

## Go int to string with Itoa

The Itoa is a convenience function which convers an integer to a
string.

func Itoa(i int) string

The Itoa is equivalent to FormatInt(int64(i), 10).

int2str.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {

    var apples int = 6

    n := strconv.Itoa(apples)
    msg := "There are " + n + " apples"
    fmt.Println(msg)

    fmt.Printf("%T\n", apples)
    fmt.Printf("%T\n", n)
}

In the code example, we convert the number of apples into a string to build a message. 
Later, we output the type of the apples and n variables.

$ go run int2str.go 
There are 6 apples
int
string

## Go int to string with strconv.FormatInt

The strconv.FormatInt  returns the string representation of a value 
in the given base; where for 2 &lt;= base &lt;= 36.

int2str2.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {

    var file_size int64 = 1544466212

    file_size_s := strconv.FormatInt(file_size, 10)

    msg := "The file size is " + file_size_s + " bytes"
    fmt.Println(msg)
}

In the code example, we convert the file_size variable, which has 
type int64, to a string with strconv.FormatInt.

$ go run int2str2.go 
The file size is 1544466212 bytes

## Go int to string with fmt.Sprintf

Another way to convert an integer to a string is to use the fmt.Sprintf 
function. The function formats according to a format specifier and returns the
resulting string. 

int2str3.go
  

package main

import (
    "fmt"
)

func main() {

    var apples int = 6

    msg := fmt.Sprintf("There are %d apples", apples)
    fmt.Println(msg)
}

The fmt.Sprintf formats a new string; it replaces the %d
specifier with an integer value.

In this article we have shown how to perform int to string conversions in Go.

## Source

[Go strconv package - reference](https://pkg.go.dev/strconv)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).