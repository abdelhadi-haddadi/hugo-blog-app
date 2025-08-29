+++
title = "Go channel"
date = 2025-08-29T19:55:03.994+01:00
draft = false
description = "Learn how to use channels in Go. Includes examples of concurrency and communication."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go channel

last modified Mays 3, 2025

In this article we show how to work with channels in Golang.

A goroutine is a lightweight execution thread in Go, enabling
concurrent execution of functions. Unlike traditional threads, goroutines are
extremely efficient and have minimal overhead, making them well-suited for
handling concurrent tasks without excessive resource consumption.

Goroutines run independently but share the same address space, which allows
efficient communication between them. Since they execute concurrently alongside
other running code, they enable developers to perform multiple operations
simultaneously, such as processing requests, handling I/O operations, or
managing background computations.

To facilitate safe and synchronized communication between goroutines, Go
provides channels. Channels serve as conduits for data exchange,
allowing goroutines to send and receive information in a structured manner. By
using channels, developers can coordinate execution, prevent race conditions,
and ensure smooth data transfer between concurrent functions.

With the combination of goroutines and channels, Go enables efficient
concurrency management, making it a powerful language for handling scalable,
high-performance applications.

## Channel functions and operators

In this section, we cover functions and operators related to channels.

c := make(chan int)

A channel is created with the make function and the
chan keyword. A channel is given a type.

The &lt;- operator is used to read a channel and write to a
channel.

c &lt;- v

This line writes a value to a channel.

&lt;- c

This line reads a value from a channel.

close(c)

A channel is closed with the close function.

for e := range(c) {
    fmt.Println(e)
}

We can iterate over values from a channel with range.

len(c)

The len function returns the number of elements which have already
been sent successfully to the channel but haven't been taken out yet.

**Note: ** By default, senders and receivers block until the other
side of the channel is ready. This allows goroutines to synchronize without
explicit locks or condition variables.

## Unidirectional channels

By default, the channels are bidirectional. They can be both used to send and
receive data.

rc chan&lt;- int

Placing the arrow operator on the right side of the chan keyword,
we create a receive-only channel.

wc &lt;-chan int

Placing the arrow operator on the left side of the chan keyword,
we create a send-only channel.

## Go channel simple example

The following is a simple example that uses a channel.

main.go
  

package main

import "fmt"

func main() {

    c := make(chan string)

    go func() {

        c &lt;- "an old falcon"
    }()

    msg := &lt;-c

    fmt.Println(msg)
}

In the program, we have two goroutines. One is created with the go
keyword; the main function is also a goroutine.

c := make(chan string)

We create a channel of type string.

go func() {

    c &lt;- "an old falcon"
}()

Inside an anonymous goroutine, we send a string message to the channel.

msg := &lt;-c

Inside the main goroutine, we read the value from the channel.

$ go run main.go
an old falcon

## Go channel deadlock

A channel deadlock happens when the code is blocked while using a channel.
A channel is blocked when we try to read from an open and empty channel or
try to write to an open and full channel.

main.go
  

package main

import "fmt"

func main() {

    c := make(chan string)

    c &lt;- "an old falcon"
    msg := &lt;-c

    fmt.Println(msg)
}

This program ends in a deadlock.

c &lt;- "an old falcon"

We write a value to a channel. The channel blocks and waits until it is emptied.
Therefore, the line that reads from the channel and empties it is not reached.
This situation leads to a deadlock.

$ go run main.go
fatal error: all goroutines are asleep - deadlock!
...

## Go channel range

We can use the range keyword to go over the data sent to a channel.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    c := make(chan string)
    go hello("Martin", c)

    for msg := range c {

        fmt.Println(msg)
    }
}

func hello(name string, c chan string) {

    for i := 0; i &lt; 5; i++ {

        msg := fmt.Sprintf("Hello %s!", name)
        c &lt;- msg
        time.Sleep(time.Millisecond * 500)
    }

    close(c)
}

In the program, we send five messages to a channel.

go hello("Martin", c)

A hello goroutine is created with go. We pass the
channel as a parameter.

for msg := range c {

    fmt.Println(msg)
}

With the range keyword, we go through the messages and print them
to the console.

func hello(name string, c chan string) {

    for i := 0; i &lt; 5; i++ {

        msg := fmt.Sprintf("Hello %s!", name)
        c &lt;- msg
        time.Sleep(time.Millisecond * 500)
    }

    close(c)
}

In the hello function, we create five messages and send them via
the channel to the main goroutine. When the goroutine is finished,
we close the channel with close.

$ go run main.go
Hello Martin!
Hello Martin!
Hello Martin!
Hello Martin!
Hello Martin!

## Unidirectional channel example

In the following example, we use unidirectional channels.

main.go
  

package main

import "fmt"

func main() {

    c1 := make(chan int)
    c2 := make(chan int)

    go power(c2, c1)
    go power(c2, c1)
    go power(c2, c1)

    c2 &lt;- 2
    fmt.Println(&lt;-c1)

    c2 &lt;- 4
    fmt.Println(&lt;-c1)

    c2 &lt;- 5
    fmt.Println(&lt;-c1)

}

func power(wc &lt;-chan int, rc chan&lt;- int) {

    num := &lt;-wc
    res := num * num
    rc &lt;- res
}

In the program, we have a power function which accepts a write-only 
wc channel and a read-only rc channel.

$ go run main.go
4
16
25

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have worked with Go channels.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).