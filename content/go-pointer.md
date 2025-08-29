+++
title = "Go pointer"
date = 2025-08-29T19:55:32.450+01:00
draft = false
description = "Learn how to work with pointers in Go. Includes examples of pointer operations and memory management."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go pointer

last modified May 5, 2025

In this article we show how to work with pointers in Golang language.

In Go, a pointer stores the memory address of a value rather than the
value itself. The zero value of a pointer is nil, indicating that
it does not yet reference a valid memory location. Unlike languages such as C,
Go does not support pointer arithmetic, making pointer management safer and more
predictable.

Pointers are particularly useful for efficiently handling large data structures,
as passing a pointer avoids unnecessary copying of large objects. Additionally,
they enable functions to modify data outside their own scope, making them
essential for reference-based operations.

var pv *int = &amp;mysum

In this example, pv is declared as a pointer to an integer
(*int). The &amp; operator retrieves the memory
address of the variable mysum and assigns it to pv,
allowing indirect access to the stored value.

fmt.Println(*pv)

The * operator is used to dereference the pointer,
meaning it retrieves the actual value stored at the referenced memory address.
By dereferencing pv, we access the value that mysum
holds.

By using pointers, Go enables efficient memory usage and allows functions to
work directly with variables instead of copies, leading to better performance in
certain scenarios.

## Go pointer example

The following is a simple pointer example in Go.

simple.go
  

package main

import "fmt"

func main() {

    var count int = 4
    fmt.Println(count)

    var pv = &amp;count
    *pv = 3
    fmt.Println(pv)
    fmt.Println(*pv)

    var pv2 *int = &amp;count
    *pv = 2
    fmt.Println(pv2)
    fmt.Println(*pv2)

    pv3 := &amp;count
    *pv = 1
    fmt.Println(pv3)
    fmt.Println(*pv3)
}

We define a count integer variable. We create three pointers to 
the variable, using three different forms.

var count int = 4

We create the count variable.

var pv = &amp;count

We create a pointer to the count variable.

*pv = 3

Via the pointer dereference, we modify the value of count.

fmt.Println(pv)
fmt.Println(*pv)

We print the address and the value of the pv pointer.

$ go run simple.go 
4
0xc0000140f8
3
0xc0000140f8
2
0xc0000140f8
1

## Go pointer modify

Pointers can be used to modify variables outside of their defining function.

modify.go
  

package main

import "fmt"

func modify(pv *int) {

    *pv = 11
}

func main() {

    var count int = 10
    fmt.Println(count)

    modify(&amp;count)
    fmt.Println(count)
}

Inside the main function, we define the count variable.
The modify function takes a pointer as a parameter. We can use it 
to modify the count variable outside the main
function. By default, a function in Go passes variables by value.

$ go run modify.go 
10
11

## Go pointer to struct

Pointers are often used with structures in Go.

pstruct.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
}

func modify(pu *User) {

    pu.name = "Robert Roe"
    pu.occupation = "driver"
}

func main() {

    u := User{"John Doe", "gardener"}
    fmt.Println(u)

    modify(&amp;u)

    fmt.Println(u)
}

We have a User structure. We change the structure inside the 
modify function through a pointer.

pu.name = "Robert Roe"

The pu.name is the same as (*pu).name.

$ go run pstruct.go 
{John Doe gardener}
{Robert Roe driver}

## Go pointer with new keyword

The new keyword takes a type as an argument, allocates enough
memory to fit a value of that type and returns a pointer to it.

newkey.go
  

package main

import (
    "fmt"
    "reflect"
)

type User struct {
    name       string
    occupation string
}

func main() {

    var pu *User = new(User)
    fmt.Println(pu)
    fmt.Println(reflect.TypeOf(pu))

    pu.name = "Robert Roe"
    pu.occupation = "accountant"
    fmt.Println(pu)
}

In the code example, we create a user with the new keyword. 

$ go run newkey.go 
&amp;{ }
*main.User
&amp;{Robert Roe accountant}

## Go pointer to pointer

A pointer can point to another pointer. To dereference a value of such a pointer, 
we use the ** characters.

pointer2pointer.go
  

package main

import "fmt"

func main() {

    var a = 7
    var p = &amp;a
    var pp = &amp;p

    fmt.Println(a)
    fmt.Println(&amp;a)

    fmt.Println("--------------------")

    fmt.Println(p)
    fmt.Println(&amp;p)

    fmt.Println("--------------------")

    fmt.Println(pp)
    fmt.Println(&amp;pp)

    fmt.Println("--------------------")

    fmt.Println(*pp)
    fmt.Println(**pp)
}

The example creates a pointer pp to another pointer p.

$ go run pointer2pointer.go 
7
0xc0000140f8
--------------------
0xc0000140f8
0xc00000e028
--------------------
0xc00000e028
0xc00000e030
--------------------
0xc0000140f8
7

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered Go pointers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).