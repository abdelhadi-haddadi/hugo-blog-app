+++
title = "Go error"
date = 2025-08-29T19:55:12.860+01:00
draft = false
description = "Learn how to handle errors in Go. Includes examples of using errors.New, fmt.Errorf, and custom error types."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go error

last modified April 11, 2024

In this article we show how to handle errors in Golang.

## Error

An error is an abnormal, unexpected condition which occurs in the program. In
programming, errors are often called bugs. The process of finding and resolving
bugs is called debugging. Go provide tools for dealing with errors. Errors in Go
are plain values. Therefore, errors can be stored in variables, passed as
parameters to functions, or returned from functions.

Errors are represented using the built-in error type.

Most Go functions return an error value among its return values. (Go supports
multiple return values.) It is our responsibility to check this error value. A
value of nil means there is no error. By convention, the error
value is the rightmost value among the returned values.

content, err := ioutil.ReadFile("thermopylae.txt")

if err != nil {
    log.Fatal(err)
}

The idiomatic way of handling errors is to check for error right after the
function call.

A *panic* is a runtime-error that we are not prepared to handle
gracefully. A panic can occur for example when we try to divide by zero or
try to access non-existing array index.

A *stack trace*  is a report of the active stack frames at a certain
point in time during the execution of a program. A panic is Go prints the
stack trace to the console, assisting us in debugging.

## Go ioutil.ReadFile

The ioutil.ReadFile reads a file and returns its contents. A
successful call sets the err to nil.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

This is the text file to read.

read_file.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
)

func main() {

    content, err := ioutil.ReadFile("thermopylae.txt")

     if err != nil {
          log.Fatal(err)
     }

    fmt.Println(string(content))
}

Many things can go wrong when we read a file. For instance, we might not
have sufficient permissions to read the file, we provided a wrong file path,
or the disk might be full.

if err != nil {
    log.Fatal(err)
}

The log.Fatal function prints the error to the console and
terminates the program by calling os.Exit.

$ go run read_file.go
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

When there is no error, we get the contents of the file.

$ go run read_file.go
2021/01/25 11:40:26 open thermopyla.txt: no such file or directory
exit status 1

A wrong file name leads to an error.

## Go panic example

A panic is a runtime error. Panics are generally difficult or impossible to
recover.

zero_div.go
  

package main

import "fmt"

func main() {

    var x int = 10
    var y int = 0

    fmt.Println(x / y)
}

A zero division leads to a runtime error.

$ go run zero_div.go
panic: runtime error: integer divide by zero

goroutine 1 [running]:
main.main()
        /root/Documents/prog/golang/errors/zero_div.go:10 +0x11
exit status 2

Such error must be fixed by the programmer. He must ensure that such situation
does not happed by always checking the denominator.

## Go errors.New

A new error can be created with the errors.New function. It returns
an error that formats as the given text. Each call returns a distinct error
value even if the text is identical.

new_error.go
  

package main

import (
    "errors"
    "fmt"
)

func main() {

    err := errors.New("Some error")
    if err != nil {
        fmt.Println(err)
    }
}

The example creates a new error with errors.New.

zero_div2.go
  

package main

import (
    "errors"
    "fmt"
    "log"
)

func divide(x int, y int) (int, error) {
    if y == 0 {
        return 0, errors.New("not possible to divide by zero")
    } else {
        return (x / y), nil
    }
}

func main() {

    if res, err := divide(6, 3); err != nil {
        log.Fatal(err)
    } else {
        fmt.Println("The answer is", res)
    }

    if res, err := divide(6, 0); err != nil {
        log.Fatal(err)
    } else {
        fmt.Println("The answer is", res)
    }
}

In this example, we ensure that the denominator is not zero.

func divide(x int, y int) (int, error) {
    if y == 0 {
        return 0, errors.New("not possible to divide by zero")
    } else {
        return (x / y), nil
    }
}

If the denominator is zero, we generate a new error with
errors.New.

$ go run zero_div2.go
The answer is 2
2021/01/25 11:58:57 not possible to divide by zero
exit status 1

This time, there is not panic. We have handled the error ourselves.

## Go errors.Is

The errors.Is function checks if the error is of the specified
type.

isfun.go
  

package main

import (
    "errors"
    "fmt"
    "log"
    "os"
)

func main() {
    if _, err := os.Open("data.txt"); err != nil {
        if errors.Is(err, os.ErrNotExist) {
            log.Fatal("file does not exist\t", err)
        } else if errors.Is(err, os.ErrPermission) {
            log.Fatal("insufficient permissions\t", err)

        } else {
            log.Fatal(err)
        }
    }

    fmt.Println("...")
}

In the code example, we check if the error is of type os.ErrNotExist
or os.ErrPermission.

## Go fmt.Errorf

With fmt.Errorf, we can create a new error with a formatted
error message.

circle_area.go
  

package main

import (
    "fmt"
    "math"
    "os"
)

func area(radius float64) (float64, error) {

    if radius &lt; 0 {
        return 0, fmt.Errorf("radius %0.2f is less than zero", radius)
    }

    return math.Pi * radius * radius, nil
}

func main() {

    radius := -7.0
    area, err := area(radius)

    if err != nil {

        fmt.Println(err)
        os.Exit(1)
    }

    fmt.Printf("Area of circle %0.2f", area)
}

In the code example, we calculate the area of a circle. There is also some error
handling, sice we cannot calculate the circle area for negative radiuses.

func area(radius float64) (float64, error) {

The area function returns two values: the calculated area and the
error.

if radius &lt; 0 {
    return 0, fmt.Errorf("radius %0.2f is less than zero", radius)
}

For a negative radius value, a new error is created with
fmt.Errorf.

return math.Pi * radius * radius, nil

For a correct radius value, we return the calculated area and
the error is set to nil.

area, err := area(radius)

We call the area function and get the returned values.

if err != nil {

    fmt.Println(err)
    os.Exit(1)
}

We check for the error value; if it is not nil, we print the
error message and exit the program.

$ go run circle_area.go
radius -7.00 is less than zero
exit status 1

## Go custom error type

To define a custom error, we implement the error interface.

custom_error.go
  

package main

import (
    "fmt"
    "log"
)

func enterAge(age int) (string, error) {

    if age &lt; 0 || age &gt; 130 {

        return "", &amp;wrongAge{age, "wrong age value"}
    }

    return fmt.Sprintf("processing %d age value", age), nil
}

type wrongAge struct {
    age int
    msg string
}

func (e *wrongAge) Error() string {

    return fmt.Sprintf("%d: %s", e.age, e.msg)
}

func main() {

    var age int = 18
    msg, err := enterAge(age)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(msg)

    age = 178
    msg, err = enterAge(age)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(msg)
}

In the code example, we implement a custom error.

func enterAge(age int) (string, error) {

    if age &lt; 0 || age &gt; 130 {

        return "", &amp;wrongAge{age, "wrong age value"}
    }

    return fmt.Sprintf("processing %d age value", age), nil
}

The enterAge function accepts an age value; for values outside 
the expected age range, an error is generated.

type wrongAge struct {
    age int
    msg string
}

The wrongAge type is defined.

func (e *wrongAge) Error() string {

    return fmt.Sprintf("%d: %s", e.age, e.msg)
}

The error interface is implemented.

$ go run custom_error.go 
processing 18 age value
2021/01/25 12:26:29 178: wrong age value
exit status 1

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have worked with errors in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).