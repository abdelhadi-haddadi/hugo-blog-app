+++
title = "Go range"
date = 2025-08-29T19:55:34.666+01:00
draft = false
description = "Learn how to use the range keyword in Go. Includes examples of iterating over collections."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go range

last modified April 11, 2024

In this article we show how to iterate over data structures in Golang.

The Go for range form can be used to iterate over strings, arrays, slices, maps,
and channels.

## Go range array

The following example uses range to iterate over a Go array.

array_range.go
  

package main

import "fmt"

func main() {
    
    vals := [...]int{5, 4, 3, 2, 1}

    for idx, e := range vals {

        fmt.Println("element", e, "at index", idx)
    }
}

We iterate over an array of integer values.

$ go run array_range.go 
element 5 at index 0
element 4 at index 1
element 3 at index 2
element 2 at index 3
element 1 at index 4

array_range2.go
  

```
package main

import "fmt"

func main() {
    
    vals := [...]int{5, 4, 3, 2, 1}

    for _, e := range vals {

        fmt.Printf("%d ", e)
    }

    fmt.Println("\n******************")

    for idx, _ := range vals {

        fmt.Printf("%d ", idx)
    }

    fmt.Println("\n******************")

    for idx := range vals {

        fmt.Printf("%d -&gt; %d\n", idx, vals[idx])
    }
}

```

This example shows that the index or the element in the 
iteration can be skipped by using _.

for idx := range vals {

    fmt.Printf("%d -&gt; %d\n", idx, vals[idx])
}

In this form, we are iterating over indexes.

## Go range map

The following example uses range to iterate over a Go map. 

map_range.go
  

package main

import "fmt"

func main() {
    
    data := map[string]string{

        "de": "Germany", 
        "it": "Italy",
        "sk": "Slovakia",
    } 

    for k, v := range data {

        fmt.Println(k, "=&gt;", v)
    }

    fmt.Println("----------------------")

    for k := range data {

        fmt.Println(k, "=&gt;", data[k])
    }
}

The example iterates over a range of country map, where the keys and the values
are strings.

$ go run map_range.go 
de =&gt; Germany
it =&gt; Italy
sk =&gt; Slovakia
----------------------
de =&gt; Germany
it =&gt; Italy
sk =&gt; Slovakia

## Go range string

The following example uses range to iterate over a Go string. 

string_range.go
  

package main

import "fmt"

func main() {
    
    s := "合気道"

    for idx, e := range s {

        fmt.Printf("%d %c\n", idx, e)
    }

    fmt.Println()
}

In the code example, we iterate over Go runes.

$ go run string_range.go 
0 合
3 気
6 道

This is the output. Each of the runes has three bytes.

## Go range channel

The following example uses range to iterate over a Go channel. A channel is a
pipe through which goroutines communicate; the communication is lock-free.

channel_range.go
  

package main

import "fmt"

func main() {
    
    ch := make(chan int)

    go func() {

        ch &lt;- 5
        ch &lt;- 6
        ch &lt;- 7
        
        close(ch)
    }()

    for n := range ch {

        fmt.Println(n)
    }
}

In the code example, we iterave over values sent through the channel.

$ go run channel_range.go 
5
6
7

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered for range forms in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).