+++
title = "Go Builder"
date = 2025-08-29T19:55:02.875+01:00
draft = false
description = "Explore the strings.Builder in Go for optimized string handling. Learn its usage, benefits, and performance insights with practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Builder

last modified April 11, 2025

In this article we show how to build strings efficiently in Golang with
strings.Builder.

In Go, strings can be efficiently constructed using various write methods, such
as WriteString for writing string data and WriteRune
for appending individual Unicode characters. These methods allow incremental
building of a string, enabling flexible and efficient modifications as data is
appended.

To manage the accumulated string efficiently, the Builder type is
used. Internally, the Builder relies on a dynamically managed slice
to store the underlying byte data, reducing unnecessary memory allocations
compared to direct string concatenation. Once all desired modifications are
applied, the final string can be retrieved using the String method,
which returns the complete result in an immutable form.

Using a Builder is especially beneficial when constructing complex
or large strings, as it minimizes performance overhead caused by repeated memory
allocations. This approach makes it an optimal choice for scenarios involving
frequent string manipulation.

## Go Builder example

The next example uses the strings.Builder to form a message.

simple.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    builder := strings.Builder{}

    builder.WriteString("There")
    builder.WriteString(" are")
    builder.WriteString(" three")
    builder.WriteString(" hawks")
    builder.WriteString(" in the sky")

    fmt.Println(builder.String())
}

We build a message using Builder's WriteString.

$ go run simple.go 
There are three hawks in the sky

The next example builds a string from byte slices.

simple2.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    builder := strings.Builder{}

    data1 := []byte{72, 101, 108, 108, 111}
    data2 := []byte{32}
    data3 := []byte{116, 104, 101, 114, 101, 33}

    builder.Write(data1)
    builder.Write(data2)
    builder.Write(data3)

    fmt.Println(builder.String())
}

The example builds a string with Write.

$ go run simple2.go 
Hello there!

## Go Builder - building formatted strings

In the next example, we build a formatted string.

formatted.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    builder := strings.Builder{}

    animals := "hawks"
    n := 3

    builder.WriteString("There are ")
    builder.WriteString(fmt.Sprintf("%d %s ", n, animals))
    builder.WriteString("in the sky.")

    msg := builder.String() 

    fmt.Println(msg)
}

We use the fmt.Sprintf function to create a formatted string and 
append it to the builder with WriteString.

## Go Builder - comparing performance

In the next example, we compare the performance of a Builder
against a string concatenation with the + operator.

compare.go
  

package main

import (
    "fmt"
    "strings"
    "time"
)

func main() {

    t0 := time.Now()

    builder := strings.Builder{}
    for i := 0; i &lt; 100_000; i++ {
        builder.WriteString("falcon")
    }

    t1 := time.Now()

    result := ""
    for i := 0; i &lt; 100_000; i++ {
        result += "falcon"
    }

    t2 := time.Now()

    fmt.Println(t1.Sub(t0))
    fmt.Println(t2.Sub(t1))
}

The example benchmarks the efficiency of the two ways of string concatenation;
it adds the word falcon hundred thousad times.

$ go run compare.go 
2.232505ms
8.007376273s

As we can see from the output, the Builder is much more efficient.

## Source

[Go strings package - reference](https://pkg.go.dev/strings)

In this article we have worked with the strings.Builder in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).