+++
title = "Go slices package"
date = 2025-08-29T19:55:52.617+01:00
draft = false
description = "Learn advanced slice operations in Go. Includes examples of slicing, appending, and copying."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go slices package

last modified April 15, 2024

In this article we show how to work with the slices package in Golang.

A slice is a dynamically-sized, flexible view into the elements of an
array. A slice can grow and shrink within the bounds of the underlying array. A
slice does not store any data, it just describes a section of the array.

The slices is a standard Go package that contains useful functions
to work with the slice container. The package allows us to sort elements,
delete elements, search for elements or check for presence of elements.

## Removing elements

We can remove elements with slices.Delete or
slices.DeleteFunc.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"sky", "pen", "book", "cup", "water", "war", "cloud"}
    fmt.Println(words)

    words = slices.Delete(words, 1, 2)
    fmt.Println(words)

    words = slices.Delete(words, 4, 6)
    fmt.Println(words)

    vals := []int{1, 2, -3, -4, 5, 6}

    vals = slices.DeleteFunc(vals, func(e int) bool {
        return e &lt; 0
    })

    fmt.Println(vals)
}

The example removes slice elements.

words = slices.Delete(words, 1, 2)

We remove the second element. The second index is exclusive.

words = slices.Delete(words, 4, 6)

This line deletes two elements having index 4 and 5. 

vals = slices.DeleteFunc(vals, func(e int) bool {
    return e &lt; 0
})

The DeleteFunc deletes all elements for which the function returns 
true. In our case, we delete all negative numbers.

$ go run main.go
[sky pen book cup water war cloud]
[sky book cup water war cloud]
[sky book cup water]
[1 2 5 6]

## Inserting elements

The slices.Insert function inserts one or more elements at the
specified index, returning the modified slice.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    words := []string{"sky", "pen", "book", "cup", "war"}
    fmt.Println(words)

    words = slices.Insert(words, 0, "rock")
    fmt.Println(words)

    words = slices.Insert(words, len(words), "smart", "storm")
    fmt.Println(words)
}

The example inserts one word at the beginning of the slice and then two words 
at the end.

$ go run main.go
[sky pen book cup war]
[rock sky pen book cup war]
[rock sky pen book cup war smart storm]

## Checking presence of element

The slice.Contains checks whether the provided value is present in 
the slice. The slices.ContainsFunc checks if there is an element 
that satisfies the given condition provided by the function.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    words := []string{"sky", "pen", "book", "cup", "war",
        "water", "cloud"}
    fmt.Println(words)

    word := "cloud"

    if slices.Contains(words, word) {
        fmt.Printf("the slice contains the word %s\n", word)
    } else {
        fmt.Printf("the slice does not contain the word %s\n", word)
    }

    vals := []int{2, 5, 8, 12}

    if slices.ContainsFunc(vals, func(e int) bool {

        return e%2 == 0
    }) {
        fmt.Println("the slice contains even value")

    } else {
        fmt.Println("the slice does not contain an even value")
    }
}

The example checks if the words slice contains cloud
string and if the vals slice contains an even value.

$ go run main.go
the slice contains the word cloud
the slice contains even value

## Comparing elements

The slices.Compare compares the elements of s1 and s2, using
cmp.Compare on each pair of elements. The result is 0 if s1 == s2, 
-1 if s1 &lt; s2, and +1 if s1 &gt; s2.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    vals := []int{1, 2, 3, 4, 5}
    vals2 := []int{1, 2, 3, 4, 5}
    vals3 := []int{2, 1, 5, 4, 3}

    if slices.Compare(vals, vals2) == 0 {
        fmt.Println("vals and vals2 are equal")
    } else {
        fmt.Println("vals and vals2 are not equal")
    }

    if slices.Compare(vals, vals3) == 0 {
        fmt.Println("vals and vals3 are equal")
    } else {
        fmt.Println("vals and vals3 are not equal")
    }
}

In the example we compare the elements of vals with
vals2 and vals3.

$ go run main.go
vals and vals2 are equal
vals and vals3 are not equal

In this article we have worked with slice in Golang.

## Sorting elements

The slices.Sort function sorts a slice of any ordered type in
ascending order. The sorting is in-place. 

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    vals := []int{1, 2, 0, -3, -2, -1, 3, 4}
    fmt.Println(vals)

    slices.Sort(vals)
    fmt.Println(vals)

    words := []string{"sky", "pen", "book", "cup", "atom", "water",
        "war", "cloud", "storm", "forest", "dandelion"}
    fmt.Println(words)

    slices.Sort(words)
    fmt.Println(words)
}

In the example, we sort a slice of integers and strings in ascending order.

$ go run main.go
[1 2 0 -3 -2 -1 3 4]
[-3 -2 -1 0 1 2 3 4]
[sky pen book cup atom water war cloud storm forest dandelion]
[atom book cloud cup dandelion forest pen sky storm war water]

To sort values in descending order, we sort the values with
slices.Sort and then call slices.Reverse.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    vals := []int{1, 2, 0, -3, -2, -1, 3, 4}
    fmt.Println(vals)

    slices.Sort(vals)
    slices.Reverse(vals)
    fmt.Println(vals)

    words := []string{"sky", "pen", "book", "cup", "atom", "water",
        "war", "cloud", "storm", "forest", "dandelion"}
    fmt.Println(words)

    slices.Sort(words)
    slices.Reverse(words)
    fmt.Println(words)
}

The slices.Reverse reverses the elements of the slice in place.

$ go run main.go
[1 2 0 -3 -2 -1 3 4]
[4 3 2 1 0 -1 -2 -3]
[sky pen book cup atom water war cloud storm forest dandelion]
[water war storm sky pen forest dandelion cup cloud book atom]

Custom sorting can be achieved with slices.SortFunc.

main.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {

    words := []string{"a", "book", "unforgettable", "cup", "waterfall",
        "unrealistic", "whisper", "storm", "irreversible", "by", "stronghold",
        "forest", "tomorrow"}

    slices.SortFunc(words, func(e1 string, e2 string) int {

        return cmp.Compare(len(e1), len(e2))
    })

    for _, word := range words {

        fmt.Println(word)
    }

    slices.SortFunc(words, func(e1 string, e2 string) int {

        return cmp.Compare(len(e2), len(e1))
    })

    for _, word := range words {

        fmt.Println(word)
    }
}

The example sorts words by their length.

slices.SortFunc(words, func(e1 string, e2 string) int {

    return cmp.Compare(len(e1), len(e2))
})

The slices.SortFunc sorts the slice in ascending order as
determined by the cmp function. 

$ go run main.go
a
by
cup
book
storm
forest
whisper
tomorrow
waterfall
stronghold
unrealistic
irreversible
unforgettable
unforgettable
irreversible
unrealistic
stronghold
waterfall
tomorrow
whisper
forest
storm
book
cup
by
a

## The Compat function

The slices.Compat replaces consecutive runs of equal elements with
a single copy. The functionality is similar to the uniq command
found on Unix.

main.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {

    words := []string{"sky", "pen", "book", "cup", "war",
        "water", "war", "cloud", "pen"}
    fmt.Println(words)

    words = slices.Compact(words)
    fmt.Println(words)

    slices.Sort(words)
    words = slices.Compact(words)
    fmt.Println(words)
}

In order to remove duplicates from the slice, we need to sort it first and then 
call slices.Compact.

$ go run main.go
[sky pen book cup war water war cloud pen]
[sky pen book cup war water war cloud pen]
[book cloud cup pen sky war water]

## Source

[Go slices package - reference ](https://pkg.go.dev/slices)

In this article we have worked with the slices package in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).