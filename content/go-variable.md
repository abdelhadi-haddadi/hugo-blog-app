+++
title = "Go variable"
date = 2025-08-29T19:56:24.460+01:00
draft = false
description = "Learn how to declare, initialize, and use variables in Go. Covers data types, scope, and constants."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go variable

last modified May 3, 2025

In this article we show how to work with variables in Golang.

## Variables in Go

Variables in Go are used to store values and serve as labels for data. The
var keyword is used to declare variables explicitly, while the
:= shorthand provides an alternative, allowing implicit type
inference based on the assigned value.

Variables can store values of different data types. A data type
defines a set of possible values along with the operations allowed on those
values. While Go supports explicit type declarations, it often infers the data
type automatically from the right-hand side of an assignment, reducing the need
for manual specification.

Unlike constants, which remain immutable once assigned, variable values can
change over time. Constants are declared using the const keyword,
ensuring that their values remain fixed throughout program execution. Using
constants improves code reliability by preventing accidental modifications.

## Go declare variables

The type of the variable follows the variable name.

declaring.go
  

package main

import "fmt"

func main() {

    var i int = 1
    var w float64 = 12.5

    fmt.Println(i, w)
}

In the code example, we declare and initialize two variables. Later, we print them.

$ go run declaring.go 
1 12.5

## Go declare multiple variables

With the var keyword, we can declare multiple variables at once.

multiple.go
  

package main

import (
    "fmt"
)

func main() {

    var i, j, k = 1, 2, 3

    var (
        name       = "John Doe"
        occupation = "gardener"
    )

    fmt.Println(i, j, k)
    fmt.Printf("%s is a %s\n", name, occupation)
}

The example shows how to declare multiple variables with var.

$ go run var_init.go 
1 2 3
John Doe is a gardener

## Go type inference

Go can infer the data type from the right side of the assignment.

inference.go
  

package main

import (
    "fmt"
    "reflect"
)

func main() {

    var name = "John Doe"
    var age = 34

    fmt.Println(reflect.TypeOf(name))
    fmt.Println(reflect.TypeOf(age))

    fmt.Printf("%s is %d years old\n", name, age)
}

In the code example, we define two variables without specifying their data type. 
The data types are inferred.

var name = "John Doe"
var age = 34

In order for the inference to work, the variables *must be initialized*.

fmt.Println(reflect.TypeOf(name))
fmt.Println(reflect.TypeOf(age))

With the help of the TypeOf function from the reflect
package, we print the data types of the two variables.

$ go run inference.go 
string
int
John Doe is 34 years old

## Go shorthand variable declaration

Inside a function, the := short assignment statement can be used in 
place of a var declaration with implicit type.

shorthand.go
  

package main

import "fmt"

func main() {

    name := "John Doe"
    age := 34

    fmt.Printf("%s is %d years old\n", name, age)
}

The example declares two variables with the shorhand notation.

## Go shorthand multiple variable declaration

We can define multiple variables with the shorhand notation as well.

shorthand.go
  

package main

import "fmt"

func main() {

    name, age := "John Doe", 34

    fmt.Printf("%s is %d years old\n", name, age)
}

The program declares two variables with the shorhand notation in one line.

## Go variable default value

Variables declared without an explicit initial value are given their zero value:

- 0 - numeric types

- false - boolean type

- "" - string type

default.go
  

package main

import "fmt"

func main() {

    var age int
    var isPresent bool
    var name string
    var weight float64

    fmt.Println(age, isPresent, name, weight)
}

The four variables In the code example are given their default values.

## Go variable scope

The *scope* of a variable is a region of code where the variable 
can be referenced.

scope.go
  

package main

import "fmt"

var word string = "falcon"

func main() {

    i := 12

    fmt.Println(word)
    fmt.Println(i)

    test()
}

func test() {

    fmt.Println(word)
}

In the code example, we have two variables defined. 

var word string = "falcon"

The word variable is defined in the global scope. It is visible 
in both main and test functions.

func main() {

    i := 12
...

The i variable has a local scope. It is visible only inside the 
main function. 

## Go constant

Unlike variables, constants cannot change their values over time. They are 
defined with the const keyword. Constants are written in uppercase 
letters by convention.

constant.go
  

package main

import "fmt"

func main() {

    var age int = 34
    const WIDTH = 100

    age = 35
    age = 36

    // WIDTH = 101

    fmt.Println(age, WIDTH)
}

In the code example, we work with the age variable and a WIDTH
constant.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered variables in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).