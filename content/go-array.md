+++
title = "Go array"
date = 2025-08-29T19:55:00.667+01:00
draft = false
description = "Learn how to work with arrays in Go. Includes examples of array initialization and manipulation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go array

last modified May 3, 2025

In this article we show how to work with arrays in Golang.

An array in Go is a collection of elements that share the same data
type. Arrays have a fixed size, meaning their length is determined at
declaration and cannot be modified—neither expanded nor reduced—during program
execution.

Array elements are accessed using zero-based indexing, where the first element
is at index 0. This allows direct access to any element using its
position within the array. By default, when an array is declared without
explicit values, its elements are initialized with zero values, such as
0 for integers, 0.0 for floating-point numbers,
false for booleans, and an empty string ("") for
string types.

To retrieve the total number of elements in an array, Go provides the
len function, which returns its length. This function is useful for
iterating through arrays or validating their size before performing operations.

Since arrays have fixed sizes, Go often favors slices for more
flexible data management. Slices provide dynamic resizing and additional
features while maintaining similar indexing behavior.

## Declaring array

var a[n]T

We declare an array of length n and having type T.

var a[5]int

Here we declare an array of five integers.

a := [5]int{1, 2, 3, 4, 5}

This is a shorthand declaration and initialization of a Go array.

## Array initialization

The following example shows how to initialize an array in Go.

main.go
  

package main

import "fmt"

func main() {

    var vals [2]int
    fmt.Println(vals)

    vals[0] = 1
    vals[1] = 2
    fmt.Println(vals)
}

In the code example, we declare an array of integers; the array can hold two elements.

var vals [2]int
fmt.Println(vals)

The [2]int is the whole type, including the size number.
At the beginning, the array contains 0s.

vals[0] = 1
vals[1] = 2
fmt.Println(vals)

We assign two values to the array.

$ go run main.go
[0 0]
[1 2]

## Array literal

Golang has array literals; we can specify the elements of the array between
{} brackets.

main.go
  

package main

import "fmt"

func main() {

    vals := [5]int{1, 2, 3, 4, 5}
    fmt.Println(vals)

    vals2 := [5]int{1, 2, 3}
    fmt.Println(vals2)
}

In the code example, we define two arrays with array literals.

vals := [5]int{1, 2, 3, 4, 5}

The first array has five elements; all elements are initialized between
{} brackets.

vals2 := [5]int{1, 2, 3}

Here we provide only three out of five elements; the rest are initialized to
0.

$ go run main.go
[1 2 3 4 5]
[1 2 3 0 0]

In the array literal, we can provide the index of the element.

main.go
  

package main

import "fmt"

func main() {

    vals := [5]int{1: 6, 2: 7, 4: 9}

    fmt.Println(vals)
}

In the code example, we initialize an array with array literal. The values are given
their index; the rest of the array elements are given 0 value.

$ go run main.go
[0 6 7 0 9]

## Infering array length

Go can infer the array length when using array literals. For this, we use
the ellipses ... operator.

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

**Note: ** when we do not specify the array size and do not use
the ... operator, we are in fact creating a Go slice.

To extract type information in Go, we use the reflect package.

main.go
  

package main

import (
    "fmt"
    "reflect"
)

func main() {

    var a [5]int
    var b []int

    fmt.Println(reflect.ValueOf(a).Kind())
    fmt.Println(reflect.ValueOf(b).Kind())
}

The a is an array, while the b is a slice.

$ go run main.go
array
slice

## Array length

The length of the array is determined with the len function.

main.go
  

package main

import "fmt"

func main() {

    words := [5]string{ "falcon", "sky", "earth", "cloud", "fox" }
    fmt.Println("There are", len(words), "words in the array")
}

In the code example, we define an array of strings. We print the number of words
in the array.

$ go run main.go
There are 5 words in the array

## Array indexing

Arrays are accessed with their index.

main.go
  

package main

import "fmt"

func main() {

    var words[5]string

    words[0] = "falcon"
    words[1] = "sky"
    words[2] = "earth"
    words[3] = "cloud"
    words[4] = "fox"

    fmt.Println(words[0], words[1])
    fmt.Println(words)
}

In the code example, we work with an array of words.

var words[5]string

We declare an array of strings, having five elements.

words[0] = "falcon"
words[1] = "sky"
words[2] = "earth"
words[3] = "cloud"
words[4] = "fox"

We put five words into the array.

fmt.Println(words[0], words[1])

We print the first and the second element of the array.

fmt.Println(words)

We print the whole array.

$ go run main.go
falcon sky
[falcon sky earth cloud fox]

We can use the : colon character to retrieve a portion of the
array.

main.go
  

package main

import "fmt"

func main() {

    words := [...]string{ "falcon", "sky", "earth", "cloud", "fox" }

    fmt.Println(words[0:2])
    fmt.Println(words[1:])
    fmt.Println(words[:])
    fmt.Println(words[:len(words)])
}

The example prints portions of the defined array.

$ go run main.go
[falcon sky]
[sky earth cloud fox]
[falcon sky earth cloud fox]
[falcon sky earth cloud fox]

## Array iteration

With for loops, we can iterate over array elements in Go.

main.go
  

package main

import "fmt"

func main() {

    words := []string{ "falcon", "sky", "earth", "cloud", "fox" }

    for i := 0; i &lt; len(words); i++ {

        fmt.Println(words[i])
    }

    for idx, e := range words {

        fmt.Println(idx, "=&gt;", e)
    }

    j := 0

    for range words {

        fmt.Println(words[j])
        j++
    }
}

The example uses three for loop forms to iterate over an array of words.

$ go run main.go
falcon
sky
earth
cloud
fox
0 =&gt; falcon
1 =&gt; sky
2 =&gt; earth
3 =&gt; cloud
4 =&gt; fox
falcon
sky
earth
cloud
fox

## Go array is value type

Unlike in other languages, array is a value type in Go. This means that when
we assign an array to a new variable or pass an array to a function, the entire
array is copied.

main.go
  

package main

import "fmt"

func main() {

    vals := [...]int{ 1, 2, 3, 4, 5, 6 }
    vals2 := vals

    vals2[0] = 11
    vals2[1] = 22

    fmt.Println(vals)
    fmt.Println(vals2)
}

In the code example, we define an array and assign the array to a new variable.
The changes made through the second variable will not affect the original
array.

$ go run main.go
[1 2 3 4 5 6]
[11 22 3 4 5 6]

The original array is unchanged.

## Multidimensional arrays

We can create multi-dimensional arrays in Go. We need additional pairs of square
and curly brackets for additional array dimension.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    a := [2][2]int{

        {1, 2},
        {3, 4}, // the trailing comma is mandatory
    }

    fmt.Println(a)

    var b [2][2]int

    for i := 0; i &lt; 2; i++ {
        for j := 0; j &lt; 2; j++ {
            b[i][j] = rand.Intn(10)
        }
    }

    fmt.Println(b)
}

We work with two-dimensional arrays of integers.

a := [2][2]int{

    {1, 2},
    {3, 4}, // the trailing comma is mandatory
}

fmt.Println(a)

There are two nested arrays in the outer array.

var b [2][2]int

for i := 0; i &lt; 2; i++ {
    for j := 0; j &lt; 2; j++ {
        b[i][j] = rand.Intn(10)
    }
}

fmt.Println(b)

In the second case, the array is initialized to random values. We use
two for loops.

$ go run main.go
[[1 2] [3 4]]
[[9 4] [1 3]]

In the following example, we create a three-dimensional array.

main.go
  

package main

import "fmt"

func main() {

    a := [3][2][2]int{
        { {1, 2}, {3, 4} },
        { {5, 6}, {7, 8} },
        { {9, 10}, {11, 12} },
    }

    fmt.Println(a)
    fmt.Println(a[2][1][0])
}

We need three pairs of [] and {} brackets.

## Partial assignment

An array can be partially assigned.

main.go
  

package main

import "fmt"

func main() {

    var a [5]int = [5]int{10, 20, 30}

    fmt.Println(a)
}

The type and the size of the arrays must match. The elements for which there is
no value will be initialized to zero.

$ go run main.go 
[10 20 30 0 0]

The last two elements are initialized to 0.

## Source

[Go array type - specification](https://go.dev/ref/spec#Array_types)

In this article we have worked with arrays in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).