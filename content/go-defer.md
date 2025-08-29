+++
title = "Go defer"
date = 2025-08-29T19:55:09.555+01:00
draft = false
description = "Learn how to use the defer statement in Go. Includes examples and best practices."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go defer

last modified May 3, 2025

In this article we show how to delay execution with defer statement in Golang.

The defer statement in Go allows the execution of a function to be
postponed until the surrounding function completes. Despite being deferred, the
arguments of the function call are evaluated immediately at the point where the
defer statement appears.

Deferred function calls are managed using a stack structure, meaning they follow
a last-in, first-out (LIFO) execution order. As a result, the most recently
deferred function will be the first to execute when the surrounding function
begins its return process. This behavior is particularly useful for ensuring
proper resource management and cleanup.

A common application of the defer statement is for resource
management tasks, such as closing open files, releasing network connections, or
freeing up database handles. By using defer, developers can ensure
that cleanup operations are consistently executed, even if a function returns
prematurely due to an error or early return statement. Additionally, deferred
calls can be used in combination with multiple defer statements,
allowing the execution of multiple cleanup operations in reverse order of their
declaration.

Beyond resource cleanup, defer can also be useful for logging
execution events, measuring execution time, or ensuring function-specific
finalization tasks run reliably.

## Go defer statement

The following is a simple demonstration of the Go defer statement.

simple.go
  

package main

import "fmt"

func main() {

    defer fmt.Println("sky")
    fmt.Println("falcon")
}

We have two Println function calls. The first one is delayed with 
the defer keyword.

$ go run simple.go 
falcon
sky

## Go defer arguments evaluation

The arguments of a deferred function are evaluated immediately.

arg_eval.go
  

package main

import "fmt"

func main() {

    fmt.Println("start")
    for i := 1; i &lt;= 5; i++ {
        defer fmt.Println(i)
    }
    fmt.Println("end")
}

The defer statement is placed inside the for loop. The
i variable is evaluated during the loop execution. 

$ go run arg_eval.go 
start
end
5
4
3
2
1

## Go defer function call order

The deferred function calls are placed on a stack and are called in 
last-in-first-out (LIFO) order. 

defer_order.go
  

package main

import "fmt"

func main() {

    defer fmt.Println("one")
    defer fmt.Println("two")
    defer fmt.Println("three")
    defer fmt.Println("four")

    defer fmt.Println("4")
    defer fmt.Println("3")
    defer fmt.Println("2")
    defer fmt.Println("1")
}

The defer fmt.Println("one") is deffered first and is executed 
last. The defer fmt.Println("1") is deffered last and is executed 
first.

$ go run defer_order.go 
1
2
3
4
four
three
two
one

## Go defer resource release

The defer statement is often used when releasing necessary
resources such as opened files. 

words.txt
  

sky
cloud
cup
wood
rock
sea
tree
oil
book
falcon

This is the words.txt file.

read_line_by_line.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
)

func main() {

    f, err := os.Open("words.txt")

    if err != nil {
        log.Fatal(err)
    }

    defer f.Close()

    scanner := bufio.NewScanner(f)

    for scanner.Scan() {

        fmt.Println(scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
}

In the code example, we read an opened file line by line. 

f, err := os.Open("words.txt")

if err != nil {
    log.Fatal(err)
}

defer f.Close()

 
After opening the words.txt file and checking for errors, we 
defer the Close method. It releases the opened file at the end 
of the main function.

## Go defer with panic

The deferred function call is executed even when the function panics.

defpanic.go
  

package main

import "fmt"

func main() {
    defer fmt.Println("sky")
    panic("terminating")
    fmt.Println("falcon")
}

The example calls panic after deferring a Println
function; it is nevertheless executed.

$ go run defpanic.go 
sky
panic: terminating

goroutine 1 [running]:
main.main()
	/home/janbodnar/Documents/prog/golang/defer/defpanic/defpanic.go:7 +0xb9
exit status 2

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered the defer statement in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).