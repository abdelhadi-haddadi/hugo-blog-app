+++
title = "Go if & else statements"
date = 2025-08-29T19:55:22.411+01:00
draft = false
description = "Learn how to use if-else statements in Go. Includes examples of conditional logic."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go if &amp; else statements

last modified April 11, 2024

In this article we show how to create conditions and branches in Golang.

## Go if &amp; else

The if statement specifies the conditional execution of a block. If
the expression evaluates to true, the block is executed. If the
else statement is present and the if statement evaluates to false,
the block following else is executed.

There can be multiple if/else statements.

## Go if/else examples

The following examples demonstrate conditional execution of blocks with
if/else.

main.go
  

package main

import "fmt"

func main() {

    num := 4

    if num &gt; 0 {

        fmt.Println("The number is positive")
    }
}

In the code example we have a simple condition; if the num variable
is positive, the message "The number is positive" is printed to the console.
Otherwise; nothing is printed.

$ go run main.go
The number is positive

The message is printed since value 4 is positive.

We add another branch with else.

main.go
  

package main

import "fmt"

func main() {

    num := -4

    if num &gt; 0 {

        fmt.Println("The number is positive")
    } else {

        fmt.Println("The number is negative")
    }
}

The else statement specifies the block that is executed if the
if condition fails.

$ go run main.go
The number is negative

Next we add additional branch with if else.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    num := -5 + rand.Intn(10)

    if num &gt; 0 {

        fmt.Println("The number is positive")
    } else if num == 0 {

        fmt.Println("The number is zero")
    } else {

        fmt.Println("The number is negative")
    }
}

We generate random values between -5 and 4. With the help of the if
&amp; else statement we print a message for all three options.

$ go run main.go
The number is positive
$ go run main.go
The number is zero
$ go run main.go
The number is negative

We run the example a few times.

The if statement can start with a short statement to execute before the
condition.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    if num := -5 + rand.Intn(10); num &gt; 0 {

        fmt.Println("value is positive")
    } else if num == 0 {

        fmt.Println("value is zero")
    } else {
        fmt.Println("value is negative")
    }
}

The previous example is written with the short if statement.

## Check map key existence

Go has a shorthand notation for checking the existence of a key in a map.

main.go
  

package main

import "fmt"

func main() {

    grades := map[string]int{
        "Lucia": 2,
        "Paul":  1,
        "Merry": 3,
        "Jane":  1,
    }

    if g, found := grades["Jane"]; found {
        fmt.Println(g)
    }
}

We check if a grade for a particular student exists and if it does, we print its
corresponding value.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered if/else conditions in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).