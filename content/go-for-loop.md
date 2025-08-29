+++
title = "Go for loop"
date = 2025-08-29T19:55:16.606+01:00
draft = false
description = "Learn how to use for loops in Go. Includes examples of different loop structures and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go for loop

last modified April 11, 2024

In this article we show how to create loops in Golang with for statement.
There are three forms of for loops in Go.

## Go for statement

The for statement specifies repeated execution of a block. There
are three forms of the for statement: the classic C-style for statement, the
single condition for statement, and the for statement with the
range clause.

## Classic C style for loop

The following example is similar (not entirely equivalent) to the classic
C-style for statement.

main.go
  

package main

import "fmt"

func main() {

    sum := 0

    for i := 0; i &lt; 10; i++ {
    
        sum += i
    }
    
    fmt.Println(sum)
}

The program calculates the sum of values 1..9. 

for i := 0; i &lt; 10; i++ {

    sum += i
}

The for statement consists of three parts: the initialization, the condition, 
and the increment. The initialization part is executed only once. The body 
of the for statement is executed when the condition is true. If the condition
returns false, the for loop is terminated. After the statements in the block 
are executed, the for loop switches to the third part, where the counter is 
incremented. The cycle continues until the condition is not true anymore. 
Note that is it possible to create endless loops.

$ go run main.go 
45

The sum of values 1..9 is 45.

## Single condition for

We can define single condition for statements in Go.

main.go
  

package main

import "fmt"

func main() {

    sum := 0
    i := 9

    for i &gt; 0 {
        
        sum += i
        i--
    }

    fmt.Println(sum)
}

The single condition for statements are functionally equivalent to the C
while loop. We sum the values 9..1. In this example we define 
the i counter variable.

$ go run main.go 
45

## Using range clause

The next example uses the range clause with the for
statement. 

main.go
  

package main

import "fmt"

func main() {
    
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}

    sum := 0
    
    for _, num := range nums {
    
        sum += num
    }

    fmt.Println(sum)
}

We calculate the sum of integer values.

nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}

We define an array of values.

for _, num := range nums {

    sum += num
}

We iterate over the array with the range clause. The
range returns the index and the value in each iteration. Since we
do not use the index, we specify the discard _ operator. (The
Golang documentation calls it the blank identifier.)

In the next example, we use the index value.

main.go
  

package main 

import "fmt"

func main() {

    words := []string{"sky", "cup", "cloud", "news", "water"}

    for idx, word := range words {

        fmt.Printf("%s has index %d\n", word, idx)
    }
}

We iterate over a slice of words. We print the word and its index.

$ go run main.go 
sky has index 0
cup has index 1
cloud has index 2
news has index 3
water has index 4

## Ranging over integers

In Go version 1.22, a new syntax allowing to range over integers was added.

main.go
  

package main

import "fmt"

func main() {

    for i := range 5 {
        fmt.Println(i)
    }

    for range 6 {
        fmt.Println("falcon")
    }
}

The example prints values 0..5 and prints falcon word six times.

$ go run main.go
0
1
2
3
4
falcon
falcon
falcon
falcon
falcon
falcon

## Infinite loop

In the next example, we create an infinite loop.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    for {

        r := rand.Intn(30)

        fmt.Printf("%d ", r)

        if r == 22 {
            break
        }
    }
}

The example prints randomly values from &lt;0, 30) in an infinite loop. 
We terminate the loop with the break keyword when we encounter 
value 22.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered for loops in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).