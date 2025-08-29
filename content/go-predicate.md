+++
title = "Go predicate"
date = 2025-08-29T19:55:33.555+01:00
draft = false
description = "Learn how to use predicates in Go. Includes examples of filtering and conditional logic."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go predicate

last modified May 4, 2025

In this article, we demonstrate how to effectively work with predicates in 
Golang. Predicates are a powerful tool for filtering data and implementing 
conditional logic in a concise and expressive manner.

A predicate is a statement that evaluates to either true or false. 
In programming, predicates are single-argument functions that return a boolean 
value. They enable developers to write clear and efficient logic for various 
operations.

## Go simple predicate example

The following example illustrates a simple predicate in action. It filters 
positive numbers from a slice and stores them in another slice. This approach 
helps in isolating specific data based on conditions.

main.go
  

package main

import (
    "fmt"
)

func isPositive(val int) bool {

    if val &gt; 0 {

        return true
    } else {

        return false
    }
}

func main() {

    vals := []int{-2, 0, 4, 3, 1, 9, 7, -3, -5, 6}
    vals2 := []int{}

    for _, val := range vals {

        if isPositive(val) {

            vals2 = append(vals2, val)
        }
    }

    fmt.Println(vals)
    fmt.Println(vals2)
}

The example takes all positive numbers from a slice and stores them in another 
slice. This demonstrates the utility of predicates in filtering data based on 
specific criteria.

func isPositive(val int) bool {

    if val &gt; 0 {

        return true
    } else {

        return false
    }
}

The isPositive function is a predicate. It returns a boolean value 
indicating whether a given value is positive. This function simplifies the 
process of checking conditions for individual elements in a collection.

for _, val := range vals {

    if isPositive(val) {

        vals2 = append(vals2, val)
    }
}

We iterate through the slice of values and apply the predicate to each element. 
This allows us to selectively process elements that meet the specified 
condition.

$ go run main.go
[-2 0 4 3 1 9 7 -3 -5 6]
[4 3 1 9 7 6]

## Go any function

The any function iterates over elements of a collection and 
returns true if the predicate is valid for at least one element. This function 
is useful for checking the existence of elements that satisfy a given 
condition.

main.go
  

package main

import (
    "fmt"
    "strings"
)

func any(data []string, f func(string) bool) bool {

    for _, v := range data {

        if f(v) {
            return true
        }
    }

    return false
}

func main() {

    words := []string{"falcon", "war", "sun", "cup", "rock"}

    w := "e"
    r := any(words, func(s string) bool {

        return strings.Contains(s, w)
    })

    if r {

        fmt.Printf("The slice contains an element with %s\n", w)
    } else {

        fmt.Printf("The slice does not contain an element with %s\n", w)
    }
}

In the example, we use the any function to check if at least one 
word in the words slice contains the letter 'w'. This demonstrates 
how predicates can be combined with higher-order functions for flexible data 
processing.

func any(data []string, f func(string) bool) bool {

    for _, v := range data {

        if f(v) {
            return true
        }
    }

    return false
}

The any function takes a slice and a predicate as parameters. It 
iterates through the slice and evaluates the predicate for each element, 
returning true if any element satisfies the condition.

r := any(words, func(s string) bool {

    return strings.Contains(s, w)
})

The predicate in this example is an anonymous function that utilizes the 
strings.Contains function. This approach allows for dynamic and 
customized condition checks.

$ go run main.go
The slice does not contain an element with e

## Go all function

The all function iterates over elements of a collection and 
returns true if the predicate is valid for all elements. This function is 
useful for verifying that every element in a collection meets a specific 
condition.

main.go
  

package main

import "fmt"

func all(data []string, f func(string) bool) bool {

    for _, e := range data {

        if !f(e) {

            return false
        }
    }

    return true
}

func main() {

    words := []string{"war", "water", "cup", "tree", "storm"}
    n := 3

    res := all(words, func(s string) bool {

        return len(s) &gt;= n
    })

    if res {

        fmt.Printf("All words have %d+ characters", n)
    } else {

        fmt.Printf("It is not true that all words have %d+ characters", n)
    }
}

In the example, we use the all function to check if all words in 
the collection have a length of n or more characters. This demonstrates how 
predicates can enforce uniform conditions across a dataset.

$ go run main.go
All words have 3+ characters

## Go filter function

The filter function returns a new collection containing only the 
elements of the original collection for which the given predicate returns true. 
This function is ideal for extracting subsets of data based on specific 
criteria.

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

The example uses the filter function to find all words that start 
with the letter 'w'. This showcases the ability of predicates to refine data 
collections effectively.

func filter(data []string, f func(string) bool) []string {

    fltd := make([]string, 0)

    for _, e := range data {

        if f(e) {
            fltd = append(fltd, e)
        }
    }

    return fltd
}

The filter function takes a collection and a predicate as 
parameters. It creates a new slice into which it appends all elements that 
satisfy the predicate. This approach ensures that the original data remains 
unchanged while producing a filtered result.

$ go run main.go
[war water]

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article, we have covered predicates in Golang. Predicates are versatile 
and powerful tools that enable developers to write concise and expressive logic 
for filtering and conditional operations. By mastering predicates, you can 
create more efficient and readable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).