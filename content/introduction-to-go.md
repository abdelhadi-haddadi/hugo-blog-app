+++
title = "Introduction to Go"
date = 2025-08-29T19:55:23.524+01:00
draft = false
description = "An introduction to Go programming language. Learn the basics and get started with Go."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Go

last modified April 11, 2024

This is an introduction to the Go programming language. Go first appeared in
2009. Go is developed by Google.

## Go

Go is an open source programming language that makes it easy to build simple,
reliable, and efficient software. Go is a statically typed, compiled programming
language. 

Go is similar to C. It is memory safe and has garbage collection. Go has high
speed compilation and excellent tooling support. It contains built-in primitives 
for concurrency.

## Go installation

First, we download the binaries from the 
[https://golang.org/doc/install](https://golang.org/doc/install) page.

$ ls go1.22.2.linux-amd64.tar.gz
go1.22.2.linux-amd64.tar.gz

We have go version 1.22.2.

$  rm -rf /usr/local/go &amp;&amp; tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz

We extract the archive to /usr/local/.

$ export PATH=$PATH:/usr/local/go/bin

We add /usr/local/go/bin to the PATH, so that we can 
run the Go tool without having to specify the full path.

&gt; winget install GoLang.Go

On Windows, we can use the winget package manager.

## The Go tool

The go tool provides the standard way to fetch, build, and install Go packages
and commands. 

$ go version
go version go1.22.2 linux/amd64

With the version option, we get the version of Go. 

&gt; go version
go version go1.22.2 windows/amd64

This is the output on Windows.

    
        command
        description
    

    
        go build
        compiles packages and dependencies
    
    
        go env
        prints Go environment information
    
    
        go get
        adds dependencies to current module and installs them
    
    
        go install
        compiles and installs packages and dependencies
    
    
        go list
        lists packages and modules
    
    
        go run
        compiles and runs a Go program
    
    
        go version
        prints Go version
    

This is a partial list of Go tool commands.

## Go first example

We create our first example. 

$ mkdir simple
$ cd simple

We create a project directory and relocate there.

$ go mod init zetcode.com/simple

We initiate a Go module.

main.go
  

package main 

import "fmt"

func main() {
    
    fmt.Println("Go simple example")
}

This is a simple Go program, which prints a message to the console.

$ go run main.go 
Go simple example

We can compile and execute the program in one go with go run 
command.

$ go build
$ ls
go.mod  main  main.go
$ ./main 
Go simple example

We can create an executable program with go build.

$ go install
$ ls ~/go/bin/
main

With the go install command, we install the binary to the special  
GOPATH directory, which defaults to $HOME/go on Unix.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have introduced the Go language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).