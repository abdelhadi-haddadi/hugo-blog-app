+++
title = "Go filter slice"
date = 2025-08-29T19:55:15.478+01:00
draft = false
description = "Learn how to filter slices in Go. Includes examples of using custom functions and built-in methods."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go filter slice

last modified April 11, 2024

In this article we show how to filter a slice in Golang.

A filtering operation processes a data structure (e.g. an array) and produces a
new data structure containing exactly those elements for which the given
predicate returns true.

A predicate is a single-argument function which returns a boolean value.

## Go filter slice example

In the following example, we filter out positive values.

positive.go
  

package main

import (
    "fmt"
)

func main() {

    vals := []int{-2, 0, 1, 9, 7, -3, -5, 6}
    positive := []int{}

    for i := range vals {
        if vals[i] &gt; 0 {
            positive = append(positive, vals[i])
        }
    }

    fmt.Println(positive)
}

We have a slice of integers. We create a new slice from the existing one having
only its positive values.

for i := range vals {
    if vals[i] &gt; 0 {
        positive = append(positive, vals[i])
    }
}

We go over the elements of the array with a for loop. We test each element if it
is greater than zero. All the elements that satisfy the condition are copied
to the new positive slice. The original slice is not modified.

$ go run simple.go
[1 9 7 6]

## Go filter slice in-place

In the following example, the slice is modified during the filtering operation.

positive.go
  

package main

import (
    "fmt"
)

func main() {

    vals := []int{-2, 0, 1, 9, 7, -3, -5, 6}

    n := 0
    for _, val := range vals {
        if isPositive(val) {
            vals[n] = val
            n++
        }
    }

    vals = vals[:n]
    fmt.Println(vals)
}

func isPositive(val int) bool {
    if val &gt; 0 {
        return true
    } else {

        return false
    }
}

The example modifies the vals slice to include only positive
values. No new slice is created.

## Go filter slice by string length

In the following example, we filter by the string length.

fil_strlen.go
  

package main

import (
    "fmt"
)

func main() {

    words := []string{"sky", "forest", "fly", "cup", "wood",
        "falcon", "so", "see", "tool"}
    filtered := []string{}

    for i := range words {
        if len(words[i]) == 3 {
            filtered = append(filtered, words[i])
        }
    }

    fmt.Println(filtered)
}

In the filtering operation we only include words that have three characters.

$ go run fil_strlen.go
[sky fly cup see]

## Go filter slice of structs

In the following example, we filter a slice of structures.

filter_slice_structs.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    country    string
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

    var programmers []User

    for _, user := range users {

        if isProgrammer(user) {
            programmers = append(programmers, user)
        }
    }

    fmt.Println("Programmers:")
    for _, u := range programmers {

        fmt.Println(u)
    }
}

func isProgrammer(user User) bool {

    return user.occupation == "programmer"
}

We have a slice of users. We create a new slice that contains only programmers.

for _, user := range users {

    if isProgrammer(user) {
        programmers = append(programmers, user)
    }
}

We go over the users slice and add a current user to the
programmers slice only if the user satisfies the
isProgrammer predicate.

func isProgrammer(user User) bool {

    return user.occupation == "programmer"
}

The IsProgrammer predicate returns true for all users whose
occupation field equals to "programmer".

$ go run filter_slice_structs.go
Programmers:
{Paul Smith programmer Canada}
{Tim Welson programmer Canada}
{Tomas Smutny programmer Slovakia}

## Go filter slice generic example

The next example has a bit more generic filtering function.

generic.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    words := []string{"sky", "forest", "fly", "cup", "wood",
        "falcon", "so", "see", "tool"}

    filtered := Filter(words, func(word string) bool {
        return strings.HasPrefix(word, "s")
    })

    fmt.Println(filtered)

    filtered2 := Filter(words, func(word string) bool {
        return len(word) == 3
    })

    fmt.Println(filtered2)
}

func Filter(vs []string, f func(string) bool) []string {
    filtered := make([]string, 0)
    for _, v := range vs {
        if f(v) {
            filtered = append(filtered, v)
        }
    }
    return filtered
}

We have a slice of words. We filter the slice by string preffix and by string
length.

$ go run fil_strlen2.go
[sky so see]
[sky fly cup see]

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have filtered slices in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).