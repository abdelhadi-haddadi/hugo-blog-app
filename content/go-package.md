+++
title = "Go package"
date = 2025-08-29T19:55:31.346+01:00
draft = false
description = "Learn how to create and use packages in Go. Includes examples of structuring and importing packages."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go package

last modified April 11, 2024

In this article we show how to work with packages in Golang.

A *package* is a collection of files which declare constants, types,
variables and functions belonging to the package.

All source files of a package are located in a single directory. Each source
file begins with a package clause defining the package to which it belongs.
Constants, types, variables and functions belonging to a package are accessible
in all files of that package. The elements of the package can be exported to 
other packages when needed.

All source files of a package are stored in a single directory. The name of the
directory and the package does not have to match, but is is a common practise
that both share the same name. 

In order to use elements of a package within another package, those elements must 
be exported. In Go, the exporting is performed by capitalizing the names of 
the elements.

Packages serve the following purpose:

     - organize code for reuse

     - prevent name conflicts

     - speed up compiler by allowing recompilation of smaller chunks of a program

Packages are further organized into modules. A module is a collection of Go
packages stored in a file tree with a go.mod file at its root. The
module path is the prefix path that is used to import all packages of that
module.

## Go main package

The package main tells the Go compiler that the package should
compile as an executable program instead of a shared library. The main function
in the main package is the entry point of the program.

simple.go
  

package main

import "fmt"

func main() {

    fmt.Println("Hello there!")
}

The program defines a main package and imports a function from the
fmt package.

package main

We declare the main package. A package is declared with the
package keyword.

import "fmt"

We import the fmt package; it implements formatted input/output.

fmt.Println("Hello there!")

We can now use the Println function of the fmt
package.

All files, variables and types are accessible in all files within the same 
package. The following two files share the same package.

$ go mod init com.zetcode/main

A module is created.

helpers.go
  

package main

import "fmt"

const c1 = 1.2
const c2 = 1.4

func f1() {

     fmt.Println("f1")
}

func f2() {

     fmt.Println("f2")
     fmt.Println(c1)
     fmt.Println(c2)
}

We have the helpers.go file with two constants and two functions.

main.go
  

package main

import "fmt"

func main() {

     f1()
     f2()

     fmt.Println("-----------------")

     fmt.Println(c1)
     fmt.Println(c1)
}

We can directly call the two functions and print the two constants without
having to import them.

$ go run .
f1
f2
1.2
1.4
-----------------
1.2
1.2

## Go custom package

In the following example, we create a custom package.

$ mod init com.zetcode/custom

First, we create a module.

$ tree
├── go.mod
├── helpers
│&nbsp;&nbsp; └── helpers.go
└── main.go

These are the contents of the project directory.

helpers/helpers.go
  

package helpers

import "fmt"

const c1 = 1.2
const c2 = 1.4

func F1() {

     fmt.Println("f1")
}

func F2() {

     fmt.Println("f2")
     fmt.Println(c1)
     fmt.Println(c2)
}

In order to expose elements from a package to another package, we have to export
them. In Go, the exporting is done when the names of the elements start with a 
capital letter. In our case, the functions F1 and F2
are exported.

main.go
  

package main

import (
     "com.zetcode/custom/helpers"
)

func main() {

     helpers.F1()
     helpers.F2()
}

We call the two functions. 

import (
     "com.zetcode/custom/helpers"
)

Note that we prefix the package name with the module path.

## Go package aliasing

To prevent name conflicts or for convenience, it is possible to give aliases 
to packages. 

main.go
  

package main

import (
     "fmt"
     str "strings"
)

func main() {

     langs := []string{"F#", "Go", "Python", "Perl", "Erlang"}

     s := str.Join(langs, ", ")
     fmt.Println(s)

     data := str.Split(s, ",")
     fmt.Println(data)
}

In the code example, we use the strings package and give it an alias.

import (
     "fmt"
     str "strings"
)

We give the strings package a new alias called str.

s := str.Join(langs, ", ")

We refer to the Join function via the alias.

## Go third-party packages

Go has a huge ecosystem of third-party libraries, which are distributed as
packages.

To include a package, we import it and Go automatically downloads it when we
build or run the project. Or we can download it manually using the 
go get command.

$ go mod init com.zetcode/thirdparty
$ go get github.com/bykof/gostradamus

We initiate a module and download the gostradamus package, which 
is used for working with date and time.

main.go
  

package main

import (
    "fmt"

    "github.com/bykof/gostradamus"
)

func main() {

    now := gostradamus.Now()

    fmt.Println(now)
}

The example prints the current time.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have talked about packages in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).