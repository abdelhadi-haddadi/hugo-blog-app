+++
title = "Go testing"
date = 2025-08-29T19:56:24.466+01:00
draft = false
description = "Learn how to write and run tests in Go using the built-in testing package. Covers unit tests, benchmarks, and more."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go testing

last modified April 11, 2024

In this tutorial we show how to do tests in Golang using the built-in testing
package.

Unit testing is a software testing branch where individual parts of a
software are tested. The purpose of unit testing is to validate that each unit
of the software performs as designed. A unit is the smallest testable part of
any software. Unit testing differs from integration testing, where
the different units and modules of a software application are tested as a group.

Go contains a built-in package testing for doing tests.
The tests are written in files which end in _test.go. The function
names have the form

func TestXxx(*testing.T)

where Xxx is the name of the function to be tested.

Testing is started with the go test command. The command compiles
the program and test sources and runs the test binaries. Go test looks for files
with names matching the file pattern *_test.go. A summary of test
runs is displayed in the end.

Go test files can contain test functions, benchmark functions, fuzz tests and
example functions.

Go test can run in two modes: a) local directory mode or b) package list mode.
The *local directory mode* is enabled when we run go test
without any package arguments. In this mode, go test compiles the package
sources and tests found in the current directory and then runs the resulting
test binary. Caching is disabled in this mode.

The package list mode is enabled when the command go
test is run with explicit package names; for instance, go test
., go test ./... (all packages in directory tree), or
go test utils. In this mode, go test compiles and
tests each of the packages listed on the command line. Also, it caches
successful package test results to avoid unnecessary repeated running of tests

The go test -v, where -v flag stands for verbose,
prints out the names of all the executed test functions and their execution
times. Test code coverage is run with the -coverage option. We can
run specific tests with the -run option, where we apply a regular
expression targeting function names. 

## Go simple test

In the first example, we test two simple functions.

message.go
  

package main

func hello() string {

     return "Hello there!"
}

func morning() string {

     return "Good morning!"
}

The two functions return short text messages.

message_test.go
  

package main

import "testing"

func TestHello(t *testing.T) {

     got := hello()
     want := "Hello there!"

     if got != want {

          t.Errorf("got %s, want %s", got, want)
     }
}

func TestMorning(t *testing.T) {

     got := morning()
     want := "Good morning!"

     if got != want {

          t.Errorf("got %s, want %s", got, want)
     }
}

The name of the file is message_test.go.

import "testing"

The testing package is imported.

func TestHello(t *testing.T) {

     got := hello()
     want := "Hello there!"

     if got != want {

          t.Errorf("got %s, want %s", got, want)
     }
}

The tested function is preceded with the Test keyword. If the
exptected and returned values differ, we write an error message.

$ go test
PASS
ok   com.zetcode/first  0.001s

We run the tests with go test command. Since we did not specify any
package name, the tool looks for _test.go files in the current
working directory. Withing the discovered files, it looks for functions having 
TestXxx(*testing.T) signatures.

$ go test -v
=== RUN   TestHello
--- PASS: TestHello (0.00s)
=== RUN   TestMorning
--- PASS: TestMorning (0.00s)
PASS
ok  	com.zetcode/first	0.001s

To get more information, we use the -v option.

$ go test -v -run Hello
=== RUN   TestHello
--- PASS: TestHello (0.00s)
PASS
ok  	com.zetcode/first	0.001s
$ go test -v -run Mor
=== RUN   TestMorning
--- PASS: TestMorning (0.00s)
PASS
ok  	com.zetcode/first	0.001s

We run specific functions by passing regex patterns to the -run
option.

## Go testing arithmetic functions

In the next example, we are going to test four arithmetic functions.

main.go
  

package main

func Add(x int, y int) int {

    return x + y
}

func Sub(x int, y int) int {

    return x - y
}

func Div(x float64, y float64) float64 {

    return x / y
}

func Mul(x int, y int) int {

    return x * y
}

We have functions for addition, subtraction, division, and multiplication.

mymath_test.go
  

package main

import "testing"

func TestAdd(t *testing.T) {

     x, y := 2, 3
     want := 5

     got := Add(x, y)

     if got != want {

         t.Errorf("got %d, want %d", got, want)
     }
}

func TestSub(t *testing.T) {

     x, y := 5, 3
     want := 2

     got := Sub(x, y)

     if got != want {

         t.Errorf("got %d, want %d", got, want)
     }
}

func TestDiv(t *testing.T) {

     x, y := 7., 2.
     want := 3.5

     got := Div(x, y)

     if got != want {

         t.Errorf("got %f, want %f", got, want)
     }
}

func TestMul(t *testing.T) {

     x, y := 6, 5
     want := 30

     got := Mul(x, y)

     if got != want {

         t.Errorf("got %d, want %d", got, want)
     }
}

In each function, we provide the testing values and the expected output.

$ go test -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
=== RUN   TestSub
--- PASS: TestSub (0.00s)
=== RUN   TestDiv
--- PASS: TestDiv (0.00s)
=== RUN   TestMul
--- PASS: TestMul (0.00s)
PASS
ok  	com.zetcode/math	0.001s

We have passed all four tests.

$ go test -cover
PASS
coverage: 100.0% of statements
ok  	com.zetcode/math	0.001s

The -cover option gives information on how many functions are
covered with tests.

$ go test -v -run "TestSub|TestMul"
=== RUN   TestSub
--- PASS: TestSub (0.00s)
=== RUN   TestMul
--- PASS: TestMul (0.00s)
PASS
ok  	com.zetcode/math	0.002s

With the pipe operator, we choose two specific test functions to run.

## Go table driven tests

With table driven tests, we have a table of different values and results. The
testing tool iterates over these values and passes them to the test code. This
way we get to test several combinations of inputs and their respective output.

This is also called parameterized tests in other languages.

mymath.go
  

package main

type Val interface {
    int | float64
}

func Add[T Val](x T, y T) T {

    return x + y
}

func Sub[T Val](x T, y T) T {

    return x - y
}

func Div[T Val](x T, y T) T {

    return x / y
}

func Mul[T Val](x T, y T) T {

    return x * y
}

Generics are used; we can pass integer and float values as parameters.

mymath_test.go
  

package main

import "testing"

type TestCase[T Val] struct {
    arg1 T
    arg2 T
    want T
}

func TestAdd(t *testing.T) {

    cases := []TestCase[int]{
        {2, 3, 5},
        {5, 5, 10},
        {-7, 6, -1},
    }

    for _, tc := range cases {
        got := Add(tc.arg1, tc.arg2)
        if tc.want != got {
            t.Errorf("Expected '%d', but got '%d'", tc.want, got)
        }
    }
}

func TestSub(t *testing.T) {

    cases := []TestCase[int]{
        {2, 3, -1},
        {5, 5, 0},
        {-7, -3, -4},
    }

    for _, tc := range cases {
        got := Sub(tc.arg1, tc.arg2)
        if tc.want != got {
            t.Errorf("Expected '%d', but got '%d'", tc.want, got)
        }
    }
}

func TestDiv(t *testing.T) {

    cases := []TestCase[int]{
        {6., 3., 2.},
        {5., 5., 1.},
        {-10., 2., -5.},
    }

    for _, tc := range cases {
        got := Div(tc.arg1, tc.arg2)
        if tc.want != got {
            t.Errorf("Expected '%d', but got '%d'", tc.want, got)
        }
    }
}

func TestMul(t *testing.T) {

    cases := []TestCase[int]{
        {7, 3, 21},
        {5, 5, 25},
        {-1, 6, -6},
    }

    for _, tc := range cases {
        got := Mul(tc.arg1, tc.arg2)
        if tc.want != got {
            t.Errorf("Expected '%d', but got '%d'", tc.want, got)
        }
    }
}

Our tests now have three test cases each.

type TestCase[T Val] struct {
    arg1 T
    arg2 T
    want T
}

We create a TestCase type which contains fields for the input
values and the expected output.

func TestAdd(t *testing.T) {

    cases := []TestCase[int]{
        {2, 3, 5},
        {5, 5, 10},
        {-7, 6, -1},
    }

    for _, tc := range cases {
        got := Add(tc.arg1, tc.arg2)
        if tc.want != got {
            t.Errorf("Expected '%d', but got '%d'", tc.want, got)
        }
    }
}

We have a slice of three test cases. We go through the slice and call the
tested function for each of the cases.

$ go test -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
=== RUN   TestSub
--- PASS: TestSub (0.00s)
=== RUN   TestDiv
--- PASS: TestDiv (0.00s)
=== RUN   TestMul
--- PASS: TestMul (0.00s)
PASS
ok  	com.zetcode/tables	0.001s

## Go test example function

It is possible to add example functions for running some basic tests and
documentation. The example test functions begin with Example word.

func ExampleHello() {
    fmt.Println("hello")
    // Output: hello
}

The function is run and the output is compared with the value following the
Output word.

add.go
  

package main

func Add(x int, y int) int {

    return x + y
}

We have a simple Add function.

add_test.go
  

package main

import (
    "fmt"
    "testing"
)

func TestAdd(t *testing.T) {

    x, y := 2, 3
    want := 5

    got := Add(x, y)

    if got != want {

        t.Errorf("got %d, want %d", got, want)
    }
}

func ExampleAdd() {

    fmt.Println(Add(10, 6))
    // Output: 16
}

The test file contains the TestAdd function and the
ExampleAdd example test function.

$ go test -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
=== RUN   ExampleAdd
--- PASS: ExampleAdd (0.00s)
PASS
ok  	com.zetcode/example	0.002s

## Go httptest

The httptest package contains utilities for testing HTTP traffic.

A ResponseRecorder is an implementation of
http.ResponseWriter that records its mutations for later inspection
in tests.

app.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", HelloHandler)

    log.Println("Listening...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func HelloHandler(w http.ResponseWriter, _ *http.Request) {

    fmt.Fprintf(w, "Hello, there\n")
}

We have a simple HTTP server with one HelloHandler.

app_test.go
  

package main

import (
    "fmt"
    "io"
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"
)

func TestHelloHandler(t *testing.T) {

    want := "Hello there!"

    ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
        fmt.Fprintln(w, want)
    }))

    defer ts.Close()

    client := ts.Client()

    res, err := client.Get(ts.URL)

    if err != nil {
        t.Errorf("expected nil got %v", err)
    }

    data, err := io.ReadAll(res.Body)
    res.Body.Close()

    if err != nil {

        t.Errorf("expected nil got %v", err)
    }

    got := strings.TrimSpace(string(data))
    if string(got) != want {

        t.Errorf("got %s, want %s", got, want)
    }
}

In TestHelloHandler, we start a test server with
httptest.NewServer and implement an itentical handler to the
HelloHandler. A request is generated with a client and the response
is compared with the expected output. At the end of the function the server
is closed.

## Source

[Go testing - Github page](https://pkg.go.dev/testing)

In this article we performed tests in Go using the built-in testing module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).