+++
title = "Go generics"
date = 2025-08-29T19:55:17.877+01:00
draft = false
description = "Learn how to use generics in Go. Includes examples of type parameters and generic functions."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go generics

last modified May 5, 2025

In this article we show how to work with generics in Golang.

Generics in Go enable developers to write flexible and reusable code that can
operate on multiple data types. By using generics, functions and types can be
defined in a way that allows them to work with any specified set of types,
reducing redundancy and improving maintainability.

Go implements generics through parameterized types, which are defined inside
square brackets []. These type parameters allow developers to
specify constraints while still maintaining flexibility.

func Println[T any](v T) { fmt.Println(v) }

In this example, the Println function accepts a generic type
parameter T. The keyword any is used as a constraint,
indicating that T can be any type. When called, the function prints
its argument while maintaining type safety.

By convention, generic parameter types are represented with uppercase letters,
most commonly T for a general type, K for a key, and
V for a value. This standard improves readability and consistency
across Go programs.

Generics are particularly beneficial when designing libraries, data structures,
and algorithms that require type flexibility while preserving strong typing and
efficiency.

## Go generics example

In the first example, we define a simple generic function.

main.go
  

package main

import (
    "fmt"
)

func Println[T any](v T) {
    fmt.Println(v)
}

func main() {
    Println[string]("an old falcon")
    Println[int](23)
    Println[float64](3.34)
    Println[bool](true)
    Println[[]int]([]int{1, 2, 3, 4, 5})
}

Our custom Println function can accept any type and print it.

Println[string]("an old falcon")
Println[int](23)
Println[float64](3.34)
Println[bool](true)
Println[[]int]([]int{1, 2, 3, 4, 5})

We print a string value, an int64 value, a float64 value, a bool value and a 
integer slice value.

$ go run main.go
an old falcon
23
3.34
true
[1 2 3 4 5]

## Go generics omit type

In many cases, we can omit the type when calling the generic function.
The compiler will infer the type from the function arguments.

main.go
  

package main

import (
    "fmt"
)

func Println[T any](v T) {
    fmt.Println(v)
}

func main() {
    Println("an old falcon")
    Println(23)
    Println(3.34)
    Println(true)
    Println([]int{1, 2, 3, 4, 5})
}

In the program we omit the parameter type declarations when calling the
Println function.

$ go run main.go
an old falcon
23
3.34
true
[1 2 3 4 5]

## Go generic union type

We can restrict the generic type parameter to the types in the union.

main.go
  

package main

import (
    "fmt"
)

func Println[T string | int](v T) {
    fmt.Println(v)
}

func main() {
    Println("an old falcon")
    Println(23)
    // Println(3.34)
    // Println(true)
    // Println([]int{1, 2, 3, 4, 5})
}

In the program, the Println function can accept either strings or 
integers.

$ go run main.go
an old falcon
23

## Go generics tilde

The ~ tilde token is used in the form ~T to denote the
set of types whose underlying type is T.

main.go
  

package main

import (
    "fmt"
)

type mystring string

func Println[T ~string | int](v T) {
    fmt.Println(v)
}

func main() {
    Println("an old falcon")
    Println(23)
    Println(mystring("rainy day"))
}

In the program, we have a custom mystring type. With
~string syntax, we tell the compiler to include any type that
approximates to string.

$ go run main.go
an old falcon
23
rainy day

## Go generic filter function

The filter function processes a collection and produces a new collection
containing exactly those elements for which the given predicate returns true. 

In the next example, we create a generic version of the filter function. 

main.go
  

package main

import (
    "fmt"
    "strings"
)

func filter[T any](data []T, f func(T) bool) []T {

    fltd := make([]T, 0, len(data))

    for _, e := range data {
        if f(e) {
            fltd = append(fltd, e)
        }
    }

    return fltd
}

func main() {

    words := []string{"war", "cup", "water", "tree", "storm"}

    res := filter(words, func(s string) bool {
        return strings.HasPrefix(s, "w")
    })

    fmt.Println(res)

    vals := []int{-1, 0, 2, 5, -9, 3, 4, 7}

    res2 := filter(vals, func(e int) bool {
        return e &gt; 0
    })

    fmt.Println(res2)
}

In the program we use a generic filter function to filter strings and integers. 

func filter[T any](data []T, f func(T) bool) []T {

    fltd := make([]T, 0, len(data))

    for _, e := range data {
        if f(e) {
            fltd = append(fltd, e)
        }
    }

    return fltd
}

The filter function builds a new slice which includes only elements that satisfy
the given condition. The function works on parameter type T with
constraint any. It takes a collection and a predicate function as
parameters. We call the predicate on each element and add it to the
fltd slice if it matches the predicate's condition.

res := filter(words, func(s string) bool {
    return strings.HasPrefix(s, "w")
})

Here we filter out all words that start with 'w'.

$ go run main.go
[war water]
[2 5 3 4 7]

## Go generic ForEach function

In the next program, we create a generic ForEach function.

main.go
  

package main

import "fmt"

func ForEach[T any](data []T, f func(e T, i int, data []T)) {

    for i, e := range data {
        f(e, i, data)
    }
}

func main() {

    vals := []int{-1, 0, 2, 1, 5, 4}

    ForEach(vals, func(e int, i int, data []int) {

        fmt.Printf("e at %d: %d\n", i, e)
    })

    fmt.Println("-------------------------")

    words := []string{"sky", "forest", "word", "cup", "coin"}

    ForEach(words, func(e string, i int, data []string) {

        fmt.Printf("e at %d: %s\n", i, e)
    })
}

The generic ForEach function takes a generic slice and a closure function as 
parameters. The closure is used to perform a task on each of the elements.

func ForEach[T any](data []T, f func(e T, i int, data []T)) {

    for i, e := range data {
        f(e, i, data)
    }
}

In the ForEach function, we use the for loop to 
go over the elements of the generic slice and call the closure on each element.

ForEach(vals, func(e int, i int, data []int) {

    fmt.Printf("e at %d: %d\n", i, e)
})

When actually calling the ForEach function, we pass a closure with
concrete types. The elements have int type, the index has
int type, and the collection is of int[] type.

$ go run main.go
e at 0: -1
e at 1: 0
e at 2: 2
e at 3: 1
e at 4: 5
e at 5: 4
-------------------------
e at 0: sky
e at 1: forest
e at 2: word
e at 3: cup
e at 4: coin

## Source

[Getting started with generics - tutorial](https://go.dev/doc/tutorial/generics)

In this article we have covered generics in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).