+++
title = "Go WaitGroup"
date = 2025-08-29T19:56:25.593+01:00
draft = false
description = "Understand how to use WaitGroup in Go to synchronize goroutines. Includes examples and best practices."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go WaitGroup

last modified May 3, 2025

In this article we show how to wait for goroutines to finish in Golang using
WaitGroup.

A goroutine is a lightweight execution thread in Go, designed to enable concurrent function execution with minimal overhead. Goroutines run independently alongside other code, facilitating efficient multitasking without the complexity of traditional threading models.

To synchronize multiple goroutines and ensure they complete before proceeding, Go provides the WaitGroup, a synchronization mechanism found in the sync package. A WaitGroup acts as a counter that tracks the number of active goroutines, ensuring that execution pauses until all goroutines finish.

## WaitGroup Functions

The WaitGroup provides three key functions for managing concurrent
execution: Add, Done, and Wait.

func (wg *WaitGroup) Add(delta int)

The Add function increments the WaitGroup counter by the specified
delta value, representing the number of goroutines to wait for. If
the counter becomes zero, all goroutines that were waiting on Wait
are unblocked, allowing execution to resume.

func (wg *WaitGroup) Done()

The Done function decrements the WaitGroup counter by
one, indicating that a goroutine has finished its execution. Every goroutine
must call Done once it completes its task to ensure proper
synchronization.

func (wg *WaitGroup) Wait()

The Wait function blocks execution until the WaitGroup
counter reaches zero, ensuring that all registered goroutines finish before
proceeding. This is particularly useful for coordinating parallel tasks and
preventing premature execution of dependent code.

By leveraging WaitGroup, Go developers can efficiently manage
concurrent operations, synchronize execution flow, and avoid race conditions in
multi-threaded applications.

## Running goroutines

The main program is itself a goroutine. It may finish earlier than the
goroutines it has invoked.

main.go
  

package main

import (
    "fmt"
)

func f1() {
    fmt.Println("goroutine 1")
}

func f2() {
    fmt.Println("goroutine 2")
}

func main() {

    go f1()
    go f2()
}

In the program, we launch two goroutines in the main function. However, the
program finishes before the two goroutines.

$ go run main.go

The program prints no output.

main.go
  

package main

import (
    "fmt"
    "time"
)

func f1() {
    fmt.Println("goroutine 1")
}

func f2() {
    fmt.Println("goroutine 2")
}

func main() {

    go f1()
    go f2()

    time.Sleep(2 * time.Second)
}

When we sleep for two seconds with time.Sleep, the goroutines have 
time to finish.

$ go run main.go
goroutine 2
goroutine 1

## Go WaitGroup simple example

The sync.WaitGroup is a synchronization tool which waits for a
collection of goroutines to finish.

main.go
  

package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {

    var wg sync.WaitGroup
    wg.Add(2)

    go func() {

        count("oranges")
        wg.Done()
    }()

    go func() {

        count("bananas")
        wg.Done()
    }()

    wg.Wait()
}

func count(thing string) {

    for i := 0; i &lt; 4; i++ {

        fmt.Printf("counting %s\n", thing)
        time.Sleep(time.Millisecond * 500)
    }
}

We synchronize the execution of two goroutines with WaitGroup.

var wg sync.WaitGroup
wg.Add(2)

With the Add function, we tell how may goroutines we wait for.

go func() {

    count("oranges")
    wg.Done()
}()

We create an anonymous goroutine. We tell the Go runtime that the goroutine has
finished with Done.

wg.Wait()

The Wait function blocks until all goroutines have finished.

time.Sleep(time.Millisecond * 500)

The time.Sleep is often used to slow down the execution of
goroutines in demonstration programs.

$ go run main.go
counting bananas
counting oranges
counting oranges
counting bananas
counting bananas
counting oranges
counting oranges
counting bananas

We must pass a pointer to a WaitGroup in a function.

main.go
  

package main

import (
    "fmt"
    "sync"
)

func f1(wg *sync.WaitGroup) {

    defer wg.Done()
    fmt.Println("goroutine 1")
}

func f2(wg *sync.WaitGroup) {

    defer wg.Done()
    fmt.Println("goroutine 2")
}

func main() {

    var wg sync.WaitGroup

    wg.Add(1)
    go f1(&amp;wg)

    wg.Add(1)
    go f2(&amp;wg)

    wg.Wait()
}

In the example, we have two goroutines. We pass them a pointer to the
WaitGroup.

## Go WaitGroup async HTTP requests

In the following example we use goroutines to make multiple asynchronous HTTP
requests.

main.go
  

package main

import (
    "fmt"
    "log"
    "net/http"
    "sync"
)

func main() {

    urls := []string{
        "http://webcode.me",
        "https://example.com",
        "http://httpbin.org",
        "https://www.perl.org",
        "https://www.python.org",
        "https://clojure.org",
    }

    var wg sync.WaitGroup

    for _, u := range urls {

        wg.Add(1)
        go func(url string) {

            defer wg.Done()

            status := doReq(url)
            fmt.Printf("%s - %s\n", url, status)

        }(u)
    }

    wg.Wait()
}

func doReq(url string) (status string) {

    resp, err := http.Head(url)

    if err != nil {
        log.Println(err)
        return
    }

    return resp.Status
}

We make multiple asynchronous HTTP requests. We make a HEAD request and return
the status code of the response. Each request is wrapped inside one goroutine.

var wg sync.WaitGroup

The WaitGroup is used to wait for all requests to finish.

for _, u := range urls {

    wg.Add(1)
    go func(url string) {
        ...
    }(u)
}

We go over the slice of the urls and add one goroutine to the counter.

go func(url string) {

    defer wg.Done()

    status := doReq(url)
    fmt.Printf("%s - %s\n", url, status)

}(u)

Withing the goroutine, we generate a HEAD request, receive the response, and 
print the status code. After the request has finished, the Done 
function is called to decrease the counter.

$ go run main.go
http://webcode.me - 200 OK
https://www.python.org - 200 OK
https://www.perl.org - 200 OK
https://clojure.org - 200 OK
http://httpbin.org - 200 OK
https://example.com - 200 OK

## Source

[Go sync package - reference](https://pkg.go.dev/sync)

In this article we have used the WaitGroup to wait for a
collection of goroutines to finish.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).