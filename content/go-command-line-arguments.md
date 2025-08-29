+++
title = "Go command-line arguments"
date = 2025-08-29T19:55:06.189+01:00
draft = false
description = "Learn how to handle command line arguments in Go. Includes examples of argument parsing."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go command-line arguments

last modified April 11, 2024

In this article we show how to pass command-line arguments into
Go programs.

## Command-line arguments

Command-line arguments are options and data that are passed to programs. 
We usually pass arguments to console programs, but sometimes we pass arguments
to GUI programs as well.

The os.Args holds the command-line arguments. The first value in 
this slice is the name of the program, while the os.Args[1:] 
holds the arguments to the program. The individual arguments are accessed with 
indexing operation.

read_args.go
  

package main

import (
    "fmt"
    "os"
    "reflect"
)

func main() {

    prg_name := os.Args[0]
    fmt.Printf("The program name is %s\n", prg_name)

    names := os.Args[1:]
    fmt.Println(reflect.TypeOf(names))

    for _, name := range names {

        fmt.Printf("Hello, %s!\n", name)
    }
}

The example receives command-line arguments. 

prg_name := os.Args[0]
fmt.Printf("The program name is %s\n", prg_name)

    

We get and print the first argument, which is the program name.

names := os.Args[1:]

    

We get all the received arguments.

fmt.Println(reflect.TypeOf(names))

    

We print the type which holds the arguments (slice).

for _, name := range names {

    fmt.Printf("Hello, %s!\n", name)
}

    

We go through the arguments and build a message from each of them.

$ go build read_args.go 
$ ./read_args Jan Peter Lucia
The program name is ./read_args
[]string
Hello, Jan!
Hello, Peter!
Hello, Lucia!

We build the program and run it. We pass the program three names on the command 
line. 

## Source

[Go os package - reference](https://pkg.go.dev/os)

In this article we have covered passing command-line arguments to Go programs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).