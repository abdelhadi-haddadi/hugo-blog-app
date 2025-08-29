+++
title = "Go module"
date = 2025-08-29T19:55:30.223+01:00
draft = false
description = "Learn how to work with modules in Go. Includes examples of creating and managing modules."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go module

last modified April 11, 2024

In this article we show how to work with modules in Golang.

A *module* is a collection of Go packages stored in a file tree.

Modules contain two specific files: go.mod and go.sum.
The go.mod defines the module path and the dependency requirements.
The go.sum is an auto-generated dependencies lock file.

Modules allow us to define precise dependency requirements and design
reproducible builds for multiple environments.

Third-party modules are downloaded from their repositories into a module cache.
These dependencies are then loaded from these copies when building applications.
The module cache is by default located in the go subdirectory of
the home directory.

## The go module commands

The go tool provides several commands that are related to modules.

    - go mod init - initializes new module in current directory

    - go mod tidy - adds missing and removes unused modules

    - go mod download - downloads modules to local cache

    - go mod vendor - makes vendored copy of dependencies

    - go mod graph - prints module requirement graph

    - go mod verify - verifies dependencies have expected content

    - go mod why - explains why packages or modules are needed

There are additional commands related to Go modules.

The go list -m lists available modules. The go get
installs dependencies and updates the go.mod file. The go build and 
go test commands add new dependencies to go.mod as needed.

## The go mod init

The go mod init command creates a new module rooted at the current
directory. A new go.mod file is created in the current directory;
it must not already exist.

$ go mod init [module-path]

The module path is the prefix path that is used to import all packages of that
module. Developers often use the URL of the repository that hosts the source
code as the module path.

$ go mod init com.zetcode/first
go: creating new go.mod: module com.zetcode/first

A new module with com.zetcode/first module path is created.

$ cat go.mod
module com.zetcode/first

go 1.17

These are the contents of the go.mod file. We have the module path
the Go version.

## The go get command

The dependencies are installed with the go get command. The command
automatically updates the go.mod file and creates the
go.sum file.

$ go mod init com.zetcode/myprog

First, we create a module.

$ go get gonum.org/v1/gonum/stat
go: downloading gonum.org/v1/gonum v0.9.3
go get: added gonum.org/v1/gonum v0.9.3

We install the Gonum library. It is a set of numeric libraries for the Go
language.

$ ls
go.mod  go.sum

We have go.mod and go.sum in the current working
directory.

~/go/pkg/mod/gonum.org/v1/gonum@v0.9.3$ ls -1
appveyor.yml
AUTHORS
blas
cmplxs
CONDUCT.md
CONTRIBUTING.md
CONTRIBUTORS
diff
doc.go
dsp
floats
go.mod
GOPHER
gopher.png
gopher.svg
go.sum
graph
integrate
internal
interp
lapack
LICENSE
mat
mathext
num
optimize
README.md
spatial
stat
THIRD_PARTY_LICENSES
unit
version.go

Gonum library is distributed as a module; it is installed in the go
subdirectory of the user's home directory by default.

first.go
  

package main

import (
    "fmt"
    "math"

    "gonum.org/v1/gonum/stat"
)

func main() {
    xs := []float64{
        12.44, 11.2, 34.5, 1.4, 6.7, 23.4,
    }

    fmt.Printf("data: %v\n", xs)

    mean := stat.Mean(xs, nil)
    variance := stat.Variance(xs, nil)
    stddev := math.Sqrt(variance)

    fmt.Printf("mean: %v\n", mean)
    fmt.Printf("variance: %v\n", variance)
    fmt.Printf("std-dev: %v\n", stddev)
}

We have a simple example that computes some basic statistics.

import (
    "fmt"
    "math"

    "gonum.org/v1/gonum/stat"
)

We get the stat package of the module.

$ go run first.go 
data: [12.44 11.2 34.5 1.4 6.7 23.4]
mean: 14.94
variance: 145.12640000000002
std-dev: 12.046841909811883

```
$ go list -m all
com.zetcode/myprog
dmitri.shuralyov.com/gpu/mtl v0.0.0-20190408044501-666a987793e9
gioui.org v0.0.0-20210308172011-57750fc8a0a6
github.com/BurntSushi/xgb v0.0.0-20160522181843-27f122750802
github.com/ajstarks/svgo v0.0.0-20180226025133-644b8db467af
github.com/boombuler/barcode v1.0.0
github.com/davecgh/go-spew v1.1.0
...

```

With the go list -m all, we list all the dependencies of the
project.

## Vendoring

Vendoring is a specific way of satisfying project dependencies. Instead of using
the default module cache, the dependencies are downloaded and later loaded from
the vendor subdirectory. The directory is a subdirectory of the
project directory.

$ go mod vendor

The go mod vendor command makes a directory named vendor in the
main module's root directory. The command also creates the
vendor/modules.txt file that contains a list of vendored packages
and the module versions they were copied from.

$ go mod init com.zetcode/second 
$ go get github.com/bykof/gostradamus

We create a project and download a dependency. The gostradamus is a library for 
working with date and time.

second.go
  

package main

import (
     "fmt"

     "github.com/bykof/gostradamus"
)

func main() {

     now := gostradamus.Now()

     fmt.Println(now)
}

The example prints the current datetime.

$ go mod vendor

We initialize vendoring.

$ ls
go.mod  go.sum  second.go  vendor

We have the vendor directory created.

$ ls vendor/github.com/
bykof

It contains our dependency.

## Source

[Using Go modules](https://go.dev/blog/using-go-modules)

In this article we have talked about modules in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).