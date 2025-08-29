+++
title = "Go append function"
date = 2025-08-29T19:54:59.540+01:00
draft = false
description = "Learn how to append elements to slices in Go. Includes examples of slice growth and memory allocation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go append function

last modified April 11, 2024

Go append function tutorial describes the append function and shows
how to use it.

The append is a built-in function which appends elements to the end
of a slice. If necessary, additional space is automatically allocated for the
new elements.

The append function returns the updated slice. It is therefore
necessary to store the result of append, often in the variable holding the slice
itself.

## Go append simple example

The append is a variadic function; it can take variable number of 
arguments.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{}
    vals = append(vals, 1)
    vals = append(vals, 2, 3)
    vals = append(vals, 4, 5, 6)
    vals = append(vals, 7, 8, 9, 10)

    fmt.Println(vals)
}

In the example, we create a slice of integers. We start with an empty slice. 
Then we continue adding new elements with append.

vals = append(vals, 1)
vals = append(vals, 2, 3)

It is possible to add one or more elements to the slice. The function creates a
new updated slice which is then reassigned to the vals variable.

$ go run main.go
[1 2 3 4 5 6 7 8 9 10]

## Go append slice

We can append another slice to a slice.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{1, 2, 3}
    res := []int{-1, 0}

    res = append(res, vals...)
    fmt.Println(res)
}

In the example, we append the values of vals to res.

res = append(res, vals...)

We utilize the ellipse operator. The ... unpacks values of the
vals slice.

$ go run main.go
[-1 0 1 2 3]

## Go append bytes

The append function also allows to append byte values. 

main.go
  

package main

import "fmt"

func main() {

    bytes := append([]byte("old "), "falcon"...)

    fmt.Println(bytes)
    fmt.Println(string(bytes))
}

In the example, we use append to add new bytes to a byte slice.

$ go run main.go
[111 108 100 32 102 97 108 99 111 110]
old falcon

## Copying elements

In the next example, we copy elements with append.

main.go
  

package main

import "fmt"

func main() {

    a := []int{1, 2, 3, 4}
    b := []int{}

    b = append(b, a...)

    fmt.Println(a)
    fmt.Println(b)
}

The elements of a slice are copied to b slice.

a := []int{1, 2, 3, 4}

We have a slice of integers.

b := []int{}

A new empty slice is created.

b = append(b, a...)

The ellipse operator unpacks all the values of a and inserts them 
into the empty b with append.

$ go run main.go 
[1 2 3 4]
[1 2 3 4]

## Deleting elements

The deleting is in fact creating a new slice without the specified elements. 

main.go
  

package main

import "fmt"

func main() {

    a := []int{1, 2, 3, 4, 5}
    b := []int{1, 2, 3, 4, 5}

    i := 3
    j := 0

    a = append(a[:i], a[i+1:]...)

    fmt.Println(a)

    b = append(b[:j], b[j+1:]...)
    fmt.Println(b)
}

We delete the first and the fourth elements.

a = append(a[:i], a[i+1:]...)

In indexing operations, the first index (before the colon) is inclusive, the 
second index is exclusive.

$ go run main.go 
[1 2 3 5]
[2 3 4 5]

## Pop operation

The pop operation removes the last element are returns it. 

main.go
  

package main

import "fmt"

func main() {

    a := []int{1, 2, 3, 4, 5}

    i := len(a) - 1

    var x int

    x, a = a[i], a[:i]
    fmt.Println(x)
    fmt.Println(a)
}

In the example, we remove the last integer from the slice and return it into 
the x variable. 

$ go run main.go 
5
[1 2 3 4]

## Prepending element

The prepend operation inserts an element at the beginning of the slice.

main.go
  

package main

import "fmt"

func main() {

    a := []int{1, 2, 3, 4, 5}
    e := 0

    a = append([]int{e}, a...)
    fmt.Println(a)
}

We create a new slice with the value we want to prepend and append all the
elements of the existing a slice to it.

$ go run main.go 
[0 1 2 3 4 5]

## Inserting elements

In the next example, we insert a new element into the slice.

main.go
  

package main

import "fmt"

func main() {

    a := []int{1, 2, 4, 5}

    i := 2
    e := 3

    a = append(a[:i], append([]int{e}, a[i:]...)...)
    fmt.Println(a)
}

A new value 3 is inserted into the a slice. We use the
append function twice.

## Source

[Go builtin package - reference](https://pkg.go.dev/builtin)

In this article we have showed how to use the append built-in
function.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).