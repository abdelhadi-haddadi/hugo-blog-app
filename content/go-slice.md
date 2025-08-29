+++
title = "Go slice"
date = 2025-08-29T19:55:52.644+01:00
draft = false
description = "Learn how to work with slices in Go. Includes examples of slice operations and usage."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go slice

last modified April 11, 2024

In this article we show how to work with slices in Golang.

An array is a collection of elements of a single data type. An array holds a
fixed number of elements, and it cannot grow or shrink. Elements of an array are
accessed through indexes.

A slice is a dynamically-sized, flexible view into the elements of an
array. A slice can grow and shrink within the bounds of the underlying array. A
slice does not store any data, it just describes a section of the array.

## Go declare slice

var s []T

We declare a slice having type T. The slice is declared just
like an array except that we do not specify any size in the brackets [].

## Slice literal

A slice can be created with a *slice literal*.

main.go
  

package main

import "fmt"

func main() {
    var s1 = []int{2, 5, 6, 7, 8}

    s2 := []int{3, 5, 1, 2, 8}

    fmt.Println("s1:", s1)
    fmt.Println("s2:", s2)
}

In the code example, we create two slices.

var s1 = []int{2, 5, 6, 7, 8}

The expression on the right-hand side is a slice literal.

s2 := []int{3, 5, 1, 2, 8}

Here we have a short-hand equivalent.

$ go run main.go
s1: [2 5 6 7 8]
s2: [3 5 1 2 8]

## The make function

We can use the make built-in function to create new slices in Go.

func make([]T, len, cap) []T

The make function takes a type, a length, and an optional capacity.
It allocates an underlying array with size equal to the given capacity, and
returns a slice that refers to that array.

main.go
  

package main

import "fmt"

func main() {

    vals := make([]int, 5)

    fmt.Println("vals: ", vals)

    vals[0] = 1
    vals[1] = 2
    vals[2] = 3
    vals[3] = 4
    vals[4] = 5

    fmt.Println("vals: ", vals)
}

We create a slice of integer having size 5 with the make function.
Initially, the elements of the slice are all zeros. We then assign new values to
the slice elements.

$ go run main.go
vals:  [0 0 0 0 0]
vals:  [1 2 3 4 5]

## Slice length and capacity

The len function returns the number of elements in the slice. The
cap function returns the capacity of the slice. The capacity of a
slice is the number of elements in the underlying array, counting from the first
element in the slice.

main.go
  

package main

import "fmt"

func main() {

    vals := make([]int, 5, 10)

    n := len(vals)
    c := cap(vals)

    fmt.Printf("The size is: %d\n", n)
    fmt.Printf("The capacity is: %d\n", c)

    vals2 := vals[0:4]
    n2 := len(vals2)
    c2 := cap(vals2)

    fmt.Printf("The size is: %d\n", n2)
    fmt.Printf("The capacity is: %d\n", c2)
}

In the code example, we print the size and the capacity of two slices.

$ go run main.go
The size is: 6
The capacity is: 6
The size is: 4
The capacity is: 6

## Slicing an array or slice

We can create a slice by slicing an existing array or slice.

To form a slice, we specify a low bound and a high bound:
a[low:high]. This selects a half-open range which includes the first
element, but excludes the last.

We can omit the high or low bounds to use their defaults instead. The default is
zero for the low bound and the length of the slice for the high bound.

main.go
  

package main

import "fmt"

func main() {

    vals := [...]int{1, 2, 3, 4, 5, 6, 7}

    s1 := vals[1:4]
    fmt.Printf("s1: %v, cap: %d\n", s1, cap(s1))

    s2 := vals[5:7]
    fmt.Printf("s2: %v, cap: %d\n", s2, cap(s2))

    s3 := vals[:4]
    fmt.Printf("s3: %v, cap: %d\n", s3, cap(s3))

    s4 := vals[2:]
    fmt.Printf("s4: %v, cap: %d\n", s4, cap(s4))

    s5 := vals[:]
    fmt.Printf("s5: %v, cap: %d\n", s5, cap(s5))
}

We create slices from an array of integers.

vals := [...]int{1, 2, 3, 4, 5, 6, 7}

An array of integers is created. With the ... operator, Go calculates
the size of the array for us.

s2 := vals[5:7]
fmt.Printf("s2: %v, cap: %d\n", s2, cap(s2))

We create a slice from the vals array. The resulting slice
contains elements starting from index 5 up to index 7; the upper bound is
non-inclusive.

$ go run main.go
s1: [2 3 4], cap: 6
s2: [6 7], cap: 2
s3: [1 2 3 4], cap: 7
s4: [3 4 5 6 7], cap: 5
s5: [1 2 3 4 5 6 7], cap: 7

## Slice iteration

With for loops, we can iterate over slice elements in Go.

main.go
  

package main

import "fmt"

func main() {

    words := []string{"falcon", "bold", "bear", "sky", "cloud", "ocean"}

    for idx, word := range words {

        fmt.Println(idx, word)
    }
}

In the code example, we iterate over a slice of words with for/range
statements.

$ go run main.go
0 falcon
1 bold
2 bear
3 sky
4 cloud
5 ocean

In the following example, we iterate a slice with a classic for loop.

main.go
  

package main

import "fmt"

func main() {

    words := []string{"falcon", "bold", "bear", "sky", "cloud", "ocean"}

    for i := 0; i &lt; len(words); i++ {

        fmt.Println(words[i])
    }
}

We iterate over a slice of words with for statement.

$ go run main.go
falcon
bold
bear
sky
cloud
ocean

## The append function

The built-in append function appends new elements to the slice.

func append(s []T, vs ...T) []T

The first parameter is a slice of type T, and the rest are
T values to append to the slice.

The resulting value of append is a slice containing all the elements of the
original slice plus the provided values. If the backing array is too small to
fit all the given values, a bigger array will be allocated. The returned slice
will point to the newly allocated array.

main.go
  

package main

import "fmt"

func main() {

    vals := make([]int, 3)

    fmt.Printf("slice: %v; len: %d; cap: %d \n", vals, len(vals), cap(vals))

    fmt.Println("---------------------------")

    vals = append(vals, 1)
    vals = append(vals, 2)
    vals = append(vals, 3)
    vals = append(vals, 4, 5, 6)

    fmt.Printf("slice: %v; len: %d; cap: %d \n", vals, len(vals), cap(vals))
}

In the code example, we append new elements to a slice, which already has three
elements.

vals := make([]int, 3)

First, we create a slice having three elements initiated to 0.

vals = append(vals, 1)
vals = append(vals, 2)
vals = append(vals, 3)
vals = append(vals, 4, 5, 6)

We append six values to the slice. Multiple elements can be appended in one
go.

$ go run main.go
slice: [0 0 0]; len: 3; cap: 3
---------------------------
slice: [0 0 0 1 2 3 4 5 6]; len: 9; cap: 12

Under the hood, Go enlarged the underlying array to include all the new elements.

main.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    words := []string{}
    words = append(words, "an")
    words = append(words, "old")
    words = append(words, "falcon")

    res := strings.Join(words, " ")
    fmt.Println(res)
}

We start with an empty string slice. We append three words to the slice. Then
we join the words with strings.Join function, while inserting a
space between the words.

$ go run main.go
an old falcon

## The copy function

The built-in copy function copies a slice.

func copy(dst, src []T) int

The function returns the number of elements copied.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{1, 2, 3, 4, 5}

    vals2 := make([]int, len(vals))

    n := copy(vals2, vals)

    fmt.Printf("%d elements copied\n", n)

    fmt.Println("vals:", vals)
    fmt.Println("vals2:", vals2)
}

In the code example, we copy a slice of integers.

$ go run main.go
5 elements copied
vals: [1 2 3 4 5]
vals2: [1 2 3 4 5]

## Removing element

There is no built-in function to remove items from a slice. We can do the
deletion with the append function.

main.go
  

package main

import (
    "fmt"
)

func main() {

    words := []string{"falcon", "bold", "bear", "sky", "cloud", "ocean"}
    fmt.Println(words)

    words = append(words[1:2], words[2:]...)
    fmt.Println(words)

    words = append(words[:2], words[4:]...)
    fmt.Println(words)
}

In the code example, we delete an element and then two elements from the slice.

words = append(words[1:2], words[2:]...)

This removes the first element from the slice. We accomplish the removal by
appending two slices omitting the one to be deleted.

$ go run main.go
[falcon bold bear sky cloud ocean]
[bold bear sky cloud ocean]
[bold bear ocean]

## Concatenatings slices

The slices.Concat method creates a new slice concatenating the
passed in slices.

main.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {

    s1 := []string{"an old"}
    s2 := []string{"falcon"}
    s3 := []string{"in the sky"}

    msg := slices.Concat(s1, s2, s3)

    fmt.Println(msg)
    fmt.Println(strings.Join(msg, " "))
}

The example concatenates three slices. It prints the contents of the new slice
and then joins all the elements of the slice with strings.Join.

$ go run main.go
[an old falcon in the sky]
an old falcon in the sky

## Unique elements

In the next example, we generate a slice with unique elements.

main.go
  

package main

import "fmt"

func uniq(vals []int) []int {

    uvals := []int{}
    seen := make(map[int]bool)

    for _, val := range vals {

        if _, in := seen[val]; !in {

            seen[val] = true
            uvals = append(uvals, val)
        }
    }

    return uvals
}

func main() {

    vals := []int{1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 8, 8, 9, 9}
    uvals := uniq(vals)

    fmt.Printf("Original slice: %v\n", vals)
    fmt.Printf("Unique slice: %v\n", uvals)
}

We have a slice with duplicate elements. We create a new slice that contains
only unique elements.

seen := make(map[int]bool)

To accomplish this task, we create a map that stores a boolean true for all
values that we encounter in the slice.

for _, val := range vals {

    if _, in := seen[val]; !in {

        seen[val] = true
        uvals = append(uvals, val)
    }
}

We go over the elements of the slice with possible duplicates. If it is not
present in the seen map, we store it there and append it to the
new uvals slice. Otherwise, we skip the if block.

$ go run main.go
Original slice: [1 2 2 3 4 4 5 6 7 8 8 8 9 9]
Unique slice: [1 2 3 4 5 6 7 8 9]

## Sorting slice elements

Go contains the sort package to sort slices.

main.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    words := []string{"falcon", "bold", "bear", "sky", "cloud", "ocean"}
    vals := []int{4, 2, 1, 5, 6, 8, 0, -3}

    sort.Strings(words)
    sort.Ints(vals)

    fmt.Println(words)
    fmt.Println(vals)
}

In the code example, we sort a slice of words and integers.

$ go run main.go
[bear bold cloud falcon ocean sky]
[-3 0 1 2 4 5 6 8]

## Slice initial value

The default zero value of a slice is nil. The nil
slice has a length and capacity of 0 and has no underlying array.

When we create a slice with the make function, all elements
are initialized to 0.

main.go
  

package main

import "fmt"

func main() {

    var vals []int

    if vals == nil {
        fmt.Printf("slice is nil\n")
    }

    fmt.Printf("slice: %v; len: %d; cap: %d \n", vals, len(vals), cap(vals))

    fmt.Println("---------------------------")

    var vals2 = make([]int, 5)
    fmt.Printf("slice: %v; len: %d; cap: %d \n", vals2, len(vals2), cap(vals2))
}

We create two slices with a default zero value and make-function initialized
elements.

$ go run main.go
slice is nil
slice: []; len: 0; cap: 0
---------------------------
slice: [0 0 0 0 0]; len: 5; cap: 5

## Slice is a reference type

A slice is a reference type in Go. This means that when we assign a reference to
a new variable or pass a slice to a function, the reference to the slice is
copied.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{ 1, 2, 3, 4, 5, 6 }
    vals2 := vals

    vals2[0] = 11
    vals2[1] = 22

    fmt.Println(vals)
    fmt.Println(vals2)
}

In the code example, we define a slice and assign the slice to a new variable.
The changes made through the second variable are reflected in the original
slice.

$ go run main.go
[11 22 3 4 5 6]
[11 22 3 4 5 6]

The original slice is also modified.

## Slice of slices

Go slice can also contain other slices.

main.go
  

package main

import "fmt"

func main() {

    words := [][]string{
        {"sky", "ocean"},
        {"red", "blue"},
        {"C#", "Go"},
    }

    fmt.Printf("slice: %v; len: %d; cap: %d \n", words, len(words), cap(words))
}

The example creates a slice of slices.

$ go run main.go
slice: [[sky ocean] [red blue] [C# Go]]; len: 3; cap: 3

## Filtering a slice of structs

In the next example, we filter a slice of Go structures.

main.go
  

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

In the code example, we define a slice of users. We create a new slice that
contains only programmers.

type User struct {
    name       string
    occupation string
    country    string
}

The User struct has three fields.

users := []User{

    {"John Doe", "gardener", "USA"},
    {"Roger Roe", "driver", "UK"},
    {"Paul Smith", "programmer", "Canada"},
    {"Lucia Mala", "teacher", "Slovakia"},
    {"Patrick Connor", "shopkeeper", "USA"},
    {"Tim Welson", "programmer", "Canada"},
    {"Tomas Smutny", "programmer", "Slovakia"},
}

This is the original slice of User structures.

var programmers []User

The filtered users/programmers are stored in the programmers
slice.

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

$ go run main.go
Programmers:
{Paul Smith programmer Canada}
{Tim Welson programmer Canada}
{Tomas Smutny programmer Slovakia}

## Syntax sugar

Go has a simplified syntax for passing a slice to another function.

main.go
  

package main

import "fmt"

func showUsers(users ...string) {

    for _, e := range users {
        fmt.Println(e)
    }
}

func main() {

    showUsers("sky", "tomorrow", "bored", "falcon")
}

The users ...string is a parameter declaration for a slice of
strings. We can then pass the elements separated by comma:
"sky", "tomorrow", "bored", "falcon".

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have worked with slice in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).