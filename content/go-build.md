+++
title = "Go build"
date = 2025-08-29T19:55:02.883+01:00
draft = false
description = "Learn how to build Go applications. Includes examples of compiling and running Go programs."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go build

last modified April 11, 2024

In this article we show how to build executables with go build tool in Golang.

Golang comes with the go tool, which manages Go source code. It has
several commands including doc, build, test, and run.

The go build command compiles the packages named by the import paths,
along with their dependencies into an executable. It it does not install the
executable.

usage: go build [-o output] [build flags] [packages]

This is the syntax of the command.

## Go build example

Next we build a simple Go code example.

$ mkdir simple
$ cd simple

We create and enter the project directory.

$ go mod init com.zetcode/simple

We create a new module with go mod init command. It produces
a go.mod file.

main.go
  

package main

import (
    "fmt"
    "runtime"
)

func main() {

    go_ver := runtime.Version()
    os_ver := runtime.GOOS
    arch := runtime.GOARCH

    fmt.Println(go_ver)
    fmt.Println(os_ver)
    fmt.Println(arch)
}

The program prints the Go version, OS name and architecture.

$ go run main.go
go run main.go
go1.22.2
amd64
linux

The go run command compiles and runs the Go program, but it does
not build any executable.

$ go build
$ ls
go.mod  main.go  simple

An executable is built with go build command.

$ ./simple
go1.22.2
amd64
linux

We run the binary file.

$ file simple
simple: ELF 64-bit LSB executable, x86-64, version 1 (SYSV) ...

We examine the program with the file tool.

$ go build -o bin/simple
$ tree
.
├── bin
│   └── simple
├── go.mod
├── main.go
└── simple

With the -o option, we can output the binary file into a specific
directory.

go.mod
  

module com.zetcode/first

go 1.22.2

To change the default executable name, we update the last part of the module
name.

$ go build
$ ./first
go1.22.2
amd64
linux

We build and run the program under a different name.

The build process is consists of two steps: compilation and linking. We show
these two steps with the go tool command.

$ go tool compile main.go

We compile the program. A main.o file is produced.

$ file main.o
main.o: current ar archive
$ ar t main.o
__.PKGDEF
_go_.o

It is an intermediary archive file.

$ go tool link -o simple main.o

With go tool link, we produce the final executable.

Next, we build the program on Windows. The process is very similar.

$ mkdir simple
$ cd simple
$ go mod init com.zetcode/simple
go: creating new go.mod: module com.zetcode/simple

We create a project directory and then a Go module. We use the same
main.go source file.

$ go build
$ ls
go.mod  main.go  simple.exe

We build the program. On Windows, the executable has the .exe
suffix.

$ simple.exe
go1.22.2
windows
amd64

We run the program.

$ file simple.exe
simple.exe: PE32+ executable (console) x86-64, for MS Windows

We examine the program with the file command.

## Source

[Compile and install the application](https://go.dev/doc/tutorial/compile-install)

In this article we have worked with the *go build* command.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).