+++
title = "Go closure"
date = 2025-08-29T19:55:05.101+01:00
draft = false
description = "Learn about closures in Go. Includes examples of functional programming concepts."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go closure

last modified April 11, 2024

In this article we show how to work with closures in Golang.

In Go, functions are first-class citizens, meaning they can be assigned to
variables, stored in collections, dynamically created or deleted, and passed as
arguments to other functions. This flexibility allows developers to write
modular and reusable code.

A *nested function*, also known as an inner function, is a function
defined within another function. These nested functions are useful for
encapsulating logic that is only relevant within the surrounding function. An
*anonymous function*, on the other hand, is a function that is not bound
to an identifier. Anonymous functions are commonly used as arguments in
higher-order functions, making them ideal for short-lived operations or inline
function execution.

A closure in Go is an anonymous nested function that retains access
to variables defined outside its body. This means that even after the
surrounding function has returned, the closure can continue to reference and
modify those external variables.

Closures maintain their own state, allowing multiple instances to hold
independent values. This makes closures particularly useful for implementing
function factories, maintaining counters, and handling contextual data across
different invocations.

anonymous.go
  

package main

import "fmt"

func main() {

     sum := func(a, b, c int) int {
          return a + b + c
     }(3, 5, 7)

     fmt.Println("5+3+7 =", sum)
}

In this example, an anonymous function is created to sum three values. The
parameters 3, 5, and 7 are immediately
passed to the function right after its definition, demonstrating how anonymous
functions can be invoked inline.

## Go closure simple example

In the following example, we define a simple closure.

simple_closure.go
  

package main

import "fmt"

func intSeq() func() int {

    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {

    nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    nextInt2 := intSeq()
    fmt.Println(nextInt2())
}

We have the intSeq function, which generates a sequence of
integers. It returns a closure which increments the i variable.

func intSeq() func() int {

The intSeq is a function which returns a function which retruns
an integer.

func intSeq() func() int {

    i := 0
    return func() int {
        i++
        return i
    }
}

Variables defined in functions have a local function scope. However, in this
case, the closure is bound to the i variable even after the
intSeq function returns.

nextInt := intSeq()

We call the intSeq function. It returns a function which will
increment a counter. The returned function *closes over* the variable
i to form a closure. The closure is bound to the
nextInt name.

fmt.Println(nextInt())
fmt.Println(nextInt())
fmt.Println(nextInt())
fmt.Println(nextInt())

We call the closure several times.

nextInt2 := intSeq()
fmt.Println(nextInt2())

The next call of the intSeq function returns a new closure. This
new closure has its own distinct state.

$ go run closure.go
1
2
3
4
1

## Go closure fibonacci example

Fibonacci series is a sequence of values such that each number is the sum of the
two preceding ones, starting from 0 and 1. The beginning of the sequence is
thus: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ...

fibonacci.go
  

package main

import "fmt"

func fibonacci() func() int {

     a := 0
     b := 1

     return func() int {

          a, b = b, a+b
          return b-a
     }
}

func main() {

     f := fibonacci()

     for i := 0; i &lt; 10; i++ {

          fmt.Println(f())
     }
}

This is an implementation of a fibonacci series using a closure. The calculation
would not work had the fibonacci function not retained the values
of a and b.

$ go run fibonacci.go
0
1
1
2
3
5
8
13
21
34

## Go closure middleware

The middleware are functions that execute during the lifecycle of a request to a
server. The middleware is commonly used for logging, error handling, or
compression of data. 

In Go, middleware is often created with the help of closures.

middleware.go
  

package main

import (
     "fmt"
     "log"
     "net/http"
     "time"
)

func main() {

     http.HandleFunc("/now", logDuration(getTime))
     fmt.Println("Server started at port 8080")
     log.Fatal(http.ListenAndServe(":8080", nil))
}

func logDuration(f func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {

     return func(w http.ResponseWriter, r *http.Request) {

          start := time.Now()
          f(w, r)
          end := time.Now()
          fmt.Println("The request took", end.Sub(start))
     }
}

func getTime(w http.ResponseWriter, r *http.Request) {

     now := time.Now()
     _, err := fmt.Fprintf(w, "%s", now)

     if err != nil {
          log.Fatal(err)
     }
}

We have a simple HTTP server which responds to the /now with 
current datetime.

http.HandleFunc("/now", logDuration(getTime))

In Go, functions can be passed to other functions as parameters.  We wrap 
the logDuration function over the getTime function.

func logDuration(f func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {

     return func(w http.ResponseWriter, r *http.Request) {

          start := time.Now()
          f(w, r)
          end := time.Now()
          fmt.Println("The request took", end.Sub(start))
     }
}

The logDuration function returns a closure which gets the current
time, calls the original function, gets the end time, and prints out the
duration of the request. The closure is being agnostic to what is actually
happening inside of the handler function.

In this article we have worked with closures in Golang.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).