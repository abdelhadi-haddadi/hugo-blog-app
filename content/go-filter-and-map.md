+++
title = "Go filter and map"
date = 2025-08-29T19:55:15.463+01:00
draft = false
description = "Learn how to filter and map data in Go. Includes examples of functional programming techniques."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go filter and map

last modified April 11, 2024

In this article we show how to create and use filter and map functions in
Golang.

A filter function processes a collection and produces a new collection
containing exactly those elements for which the given predicate returns true.

A map function applies a given function to each element of a collection,
returning the results in a new collection.

A predicate is a single-argument function which returns a boolean value.

## Go filter example

In the next example, we apply the filter function on a slice of strings.

main.go
  

package main

import (
    "fmt"
    "strings"
)

func filter(data []string, f func(string) bool) []string {

    fltd := make([]string, 0)

    for _, e := range data {

        if f(e) {
            fltd = append(fltd, e)
        }
    }

    return fltd
}

func main() {

    words := []string{"war", "water", "cup", "tree", "storm"}

    p := "w"

    res := filter(words, func(s string) bool {

        return strings.HasPrefix(s, p)
    })

    fmt.Println(res)

}

We have a slice of words. With the help of the filter function, we 
filter out all words that start with 'w' and put them into a new slice.

func filter(data []string, f func(string) bool) []string {

    fltd := make([]string, 0)

    for _, e := range data {

        if f(e) {
            fltd = append(fltd, e)
        }
    }

    return fltd
}

The filter function takes a slice of words and the predicate as 
parameters. The predicate is a function that is applied on every slice element.

$ go run main.go
[war water]

In the next example, we filter a slice of struct types.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    country    string
}

func filter(data []User, f func(User) bool) []User {

    fltd := make([]User, 0)

    for _, user := range data {

        if f(user) {
            fltd = append(fltd, user)
        }
    }

    return fltd
}

func main() {

    users := []User{

        {"John Doe", "gardener", "USA"},
        {"Roger Roe", "driver", "UK"},
        {"Paul Smith", "programmer", "Canada"},
        {"Lucia Mala", "teacher", "Slovakia"},
        {"Patrick Connor", "shopkeeper", "USA"},
        {"Tim Welson", "programmer", "Canada"},
        {"Tomas Smutny", "programmer", "Slovakia"},
    }

    country := "Slovakia"

    res := filter(users, func(u User) bool {
        return u.country == country
    })

    fmt.Println(res)

}

The example filters all users that live in Slovakia.

$ go run main.go
[{Lucia Mala teacher Slovakia} {Tomas Smutny programmer Slovakia}]

## Go filter generic example

In the following example, we create a generic version of a filter function.

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

We have a generic version of the filter function. We use it to filter strings 
and integers.

$ go run main.go
[war water]
[2 5 3 4 7]

## Go map example

In the following example, we transform a slice of integers. Note that we cannot 
name the function map, since it is a Go keyword for creating dictionaries/maps.

main.go
  

package main

import (
    "fmt"
)

func map2(data []int, f func(int) int) []int {

    mapped := make([]int, len(data))

    for i, e := range data {
        mapped[i] = f(e)
    }

    return mapped
}

func main() {

    vals := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    res := map2(vals, func(i int) int {
        return i * i
    })

    fmt.Println(res)
}

We have a slice of integers. We square all elements of the slice. 

$ go run main.go
[1 4 9 16 25 36 49 64 81 100]

In the next example, we apply a map function on a slice of strings.

main.go
  

package main

import (
    "fmt"
    "strings"
)

func map2(data []string, f func(string) string) []string {

    mapped := make([]string, len(data))

    for i, e := range data {
        mapped[i] = f(e)
    }

    return mapped
}

func main() {

    words := []string{"war", "water", "cup", "tree", "storm"}

    res := map2(words, strings.ToUpper)

    fmt.Println(res)
}

The example transforms a slice of strings into uppercase.

$ go run main.go
[WAR WATER CUP TREE STORM]

## Go map generic example

In the following example, we have a generic version of the map function.

main.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func map2[T, U any](data []T, f func(T) U) []U {

    res := make([]U, 0, len(data))

    for _, e := range data {
        res = append(res, f(e))
    }

    return res
}

func main() {

    words := []string{"war", "cup", "water", "tree", "storm"}

    result := map2(words, func(s string) string {

        return strings.ToUpper(s)
    })

    fmt.Println(result)

    fmt.Println("-------------------")
    numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    squares := map2(numbers, func(n int) int {
        return n * n
    })

    fmt.Println(squares)
    fmt.Println("-------------------")

    as_strings := map2(numbers, func(n int) string {
        return strconv.Itoa(n)
    })

    fmt.Printf("%q", as_strings)
}

With the map function, we process integers and strings.

$ go run main.go
[WAR CUP WATER TREE STORM]
-------------------
[1 4 9 16 25 36 49 64 81 100]
-------------------
["1" "2" "3" "4" "5" "6" "7" "8" "9" "10"]

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have worked with filter and map functions in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).