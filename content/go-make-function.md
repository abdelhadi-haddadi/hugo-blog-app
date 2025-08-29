+++
title = "Go make function"
date = 2025-08-29T19:55:25.758+01:00
draft = false
description = "Learn how to use the make function in Go. Includes examples of creating slices, maps, and channels."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go make function

last modified April 11, 2024

In this artilc we describe the make function and shows how to use
it.

The make is a built-in function which allocates and initializes
an object of type slice, map, or chan.

func make(t Type, size ...IntegerType) Type

In case of a slice, the size specifies its length. A second integer may be
specified to set the capacity of the slice; it must not be smaller than the
length. The make([]int, 0, 5) allocates an underlying array of size
5 and returns a slice of length 0 and capacity 5 that is backed by this
underlying array.

In case of a map, an empty map is allocated with enough space to hold the
specified number of elements. We can omit the size parameter, in which case a
small starting size is allocated.

In case of a channel, the channel's buffer is initialized with the specified
buffer capacity. If zero, or the size is omitted, the channel is unbuffered.

## Go make slice

In the first example, we create an empty slice of integers with
make.

main.go
  

package main

import (
    "fmt"
)

func main() {

    vals := make([]int, 5)
    fmt.Println(vals)

    vals[0] = 12
    vals[1] = 18
    vals[2] = 13
    vals[3] = 19
    vals[4] = 38

    fmt.Println(vals)

    vals2 := []int{12, 18, 13, 19, 38}
    fmt.Println(vals2)

    vals3 := []int{}
    fmt.Println(vals3)

    // vals3[0] = 12
    // vals3[1] = 18

    vals3 = append(vals3, 1)
    vals3 = append(vals3, 2)
    vals3 = append(vals3, 5)
    vals3 = append(vals3, 6)

    fmt.Println(vals3)
}

In the example, we create slice collections using make
funtion and literals.

vals := make([]int, 5)
fmt.Println(vals)

We create a new slice with five elements initialized to 0.

vals[0] = 12
vals[1] = 18
vals[2] = 13
vals[3] = 19
vals[4] = 38

fmt.Println(vals)

Later, we fill the slice with some data.

vals2 := []int{12, 18, 13, 19, 38}
fmt.Println(vals2)

We can initialize the slice when we define it with literal notation.

vals3 := []int{}
fmt.Println(vals3)

Here we create an empty slice.

// vals3[0] = 12
// vals3[1] = 18

It is not possible to assign values to an empty slice.

vals3 = append(vals3, 1)
vals3 = append(vals3, 2)
vals3 = append(vals3, 5)
vals3 = append(vals3, 6)

To add new values, the append function can be uzed.

$ go run main.go
[0 0 0 0 0]
[12 18 13 19 38]
[12 18 13 19 38]
[]
[1 2 5 6]

## Go make slice of slices

In the following example, we create a slice of slices with make.

main.go
  

package main

import "fmt"

func main() {

    w := make([][]string, 3)

    w1 := make([]string, 4)
    w1[0] = "war"
    w1[1] = "water"
    w1[2] = "wrath"
    w1[3] = "wrong"

    w2 := make([]string, 3)
    w2[0] = "car"
    w2[1] = "cup"
    w2[2] = "cloud"

    w3 := make([]string, 2)
    w3[0] = "boy"
    w3[1] = "brown"

    w[0] = w1
    w[1] = w2
    w[2] = w3

    fmt.Println(w)
}

The example creates a slice of a string slices of various length.

w := make([][]string, 3)

We create a slice of slices.

w1 := make([]string, 4)
w1[0] = "war"
w1[1] = "water"
w1[2] = "wrath"
w1[3] = "wrong"

Each of the subslices is separately created with make and
initialized.

$ go run main.go
[[war water wrath wrong] [car cup cloud] [boy brown]]

## Go make map

In the next example, we create a new map with make.

main.go
  

package main

import "fmt"

func main() {

    benelux := make(map[string]string)

    benelux["be"] = "Belgium"
    benelux["nl"] = "Netherlands"
    benelux["lu"] = "Luxembourgh"

    fmt.Println(benelux)
    fmt.Printf("%q\n", benelux)
}

The example creates a new map and adds three pairs to it.

$ go run main.go
map[be:Belgium lu:Luxembourgh nl:Netherlands]
map["be":"Belgium" "lu":"Luxembourgh" "nl":"Netherlands"]

## Go make channel

In the following example, we use the make function to create a
channel. A channel is an object through which goroutines communicate.

main.go
  

package main

import (
    "fmt"
)

func fib(n int, c chan int) {

    x, y := 0, 1

    for i := 0; i &lt; n; i++ {
        c &lt;- x
        x, y = y, x+y
    }
    close(c)
}

func main() {

    c := make(chan int, 10)

    go fib(cap(c), c)

    for i := range c {
        fmt.Println(i)
    }
}

A series of fibonacci values is generated inside the fib goroutine. The values
are one by one send to the caller goroutine via a channel.

$ go run main.go
0
1
1
2
3
5
8
13
21
34

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have showed how to use the make built-in
function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).