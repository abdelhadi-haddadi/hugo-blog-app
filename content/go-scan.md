+++
title = "Go Scan"
date = 2025-08-29T19:55:50.399+01:00
draft = false
description = "Learn how to scan input in Go. Includes examples of using fmt.Scan and bufio.Scanner."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Scan

last modified April 11, 2024

In this article we show how to read standard input in Golang with scan functions.
The scan functions are located in the fmt package.

## Scan functions

There are three scan functions: scan, scanln, and
scanf.

func Scan(a ...any) (n int, err error)

The scan function scans text read from standard input and stores
successive space-separated values into given arguments. A newline character
counts as space. This means that we can continue writing input arguments after
we pressed Enter. 

func Scanln(a ...any) (n int, err error)

The Scanln is similar to Scan, but stops scanning at a newline.
Ffter the final item there must be a newline or EOF.

func Scanf(format string, a ...any) (n int, err error)

The Scanf function reads from standard input and storing successive
space-separated values into the given arguments, as determined by the string
format. It returns the number of items successfully scanned. The function allows
more sophisticated scanning.

## Go Scan

In the first example, we use the Scan function.

main.go
  

package main

import (
    "fmt"
    "log"
)

func main() {

    var name string

    fmt.Print("Enter your name: ")

    _, err := fmt.Scan(&amp;name)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Hello %s!\n", name)
}

The example reads an input from a user, builds a message and prints it to the 
console.

$ go run main.go
Enter your name: Peter
Hello Peter!

main.go
  

```
package main

import (
    "fmt"
    "log"
)

func main() {
    var name string
    var age int

    fmt.Print("Enter your name and age: ")

    n, err := fmt.Scan(&amp;name, &amp;age)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("scanned %d arguments\n", n)
    fmt.Printf("%s is %d years old\n", name, age)
}

```

We scan two arguments. We print the number of scanned arguments and a message
built from these two arguments.

$ go run main.go
Enter your name and age: Peter 23
scanned 2 arguments
Peter is 23 years old

## Go Scanln

With Scanln, the newline character terminates the scanning process.

main.go
  

package main

import (
    "fmt"
    "log"
)

func main() {

    var name1 string
    var name2 string
    var name3 string

    fmt.Print("Enter three names: ")

    _, err := fmt.Scanln(&amp;name1, &amp;name2, &amp;name3)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Entered names: %s, %s, %s\n", name1, name2, name3)
}

We use the Scanln function to read three names. 

## Go Scanf

The Scanf function enables more advanced scanning.

main.go
  

package main

import (
    "fmt"
    "log"
)

func main() {

    var n1, n2, n3, n4, n5 int

    fmt.Print("Enter five numbers separated by comma and space: ")

    _, err := fmt.Scanf("%d, %d, %d, %d, %d", &amp;n1, &amp;n2, &amp;n3, &amp;n4, &amp;n5)

    if err != nil {
        log.Fatal(err)
    }

    sum := n1 + n2 + n3 + n4 + n5

    fmt.Printf("The sum of five numbers is: %d\n", sum)
}

In this example, we read five numbers. The numbers have to be separated by a 
comma and a space character.

$ go run main.go
Enter five numbers separated by comma and space: 1, 2, 3, 4, 5
The sum of five numbers is: 15

## Source

[Go fmt package - reference](https://pkg.go.dev/fmt)

In this article we have worked with the scan functions in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).