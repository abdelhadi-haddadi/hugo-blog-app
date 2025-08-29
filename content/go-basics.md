+++
title = "Go basics"
date = 2025-08-29T19:55:00.657+01:00
draft = false
description = "Learn the basics of Go programming. Includes examples of syntax, variables, and functions."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go basics

last modified April 11, 2024

In this article we cover the basic programming concepts of Go language.

Go is an open source programming language that makes it easy to build simple,
reliable, and efficient software. Go is a statically typed, compiled programming
language created by Google.

## Identifiers

Identifiers are names for variables, functions, classes, or parameters.
Identifiers can have alphanumerical characters and underscores. It is an error
to begin a variable name with a number. White space in names is not permitted.

Identifiers are case sensitive. This means that Name, name, and NAME refer to
three different variables. Identifiers also cannot match language keywords.

## Go white space

White space in Go is used to separate tokens in the program. It is also used to
improve readability of the source code.

var i int = 0

White spaces are required in some places. For example between the i
variable the the int keyword. In other places, white spaces are
forbidden. They cannot be present in variable identifiers or language keywords.

var i int=1
var j int = 2
var k int  =  3

The amount of space put between tokens is irrelevant for the Go compiler. The
white space should be used consistently in a Go program.

## First example

We create our first example.

$ mkdir first
$ cd first

We create a project directory and relocate there.

$ go mod init zetcode.com/first

We initiate a Go module.

main.go
  

package main

import "fmt"

func main() {

    fmt.Println("Go first example")
}

This is a simple Go program, which prints a message to the console.

package main

Go code is organized in packages. Programs start running in the
main package.

import "fmt"

Packages are included into the program with the import keyword.
The fmt package contains  formatted I/O with functions.

func main() {

Inside the main package, the main function is the entry point of a Go program.
Functions are created with the func keyword.

fmt.Println("Go first example")

From the fmt package, we use the Println function
to display a message. Notice that the statement is not terminated with semicolon
as in languages such as Java, C, or C#.

$ go run main.go
Go first example

We compile and execute the program in one go with go run command.

## Comments

Comments are used by humans to clarify source code. There are two types of
comments in Go: single line comments (//) and  multi-line comments (/* */).

main.go
  

package main

import "fmt"

/*
  This is comments.go
  Author: Jan Bodnar
  ZetCode 2024
*/

// Program starts here
func main() {
    fmt.Println("Go first example")
}

In the code example, we have a multi-line and a single line comment. Comments
are ignored by the compiler.

## Variables

A variable is used to store a value. It is a label given to the value. Go uses
the var keyword to declare a list of variables. We can also use the
:= shorthand syntax to declare variables.

Variables can hold values of different data types. A data type is a set of
values and the allowable operations on those values. In many cases, Go can infer
the data type from the right side of the assignment.

main.go
  

package main

import "fmt"

func main() {

    var i int = 1
    var w float64 = 12.5

    fmt.Println(i, w)
}

In the code example, we declare and initialize two variables and then we print
them. The first variable holds an integer, the second a float. The data types
follow variable names in Go.

## Type inference

Go can infer the data type from the right side of the assignment.

main.go
  

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

$ go run main.go
string
int
John Doe is 34 years old

## Shorthand variable declaration

Inside a function, the := short assignment statement can be used in
place of a var declaration with implicit type.

main.go
  

package main

import "fmt"

func main() {

    name := "John Doe"
    age := 34

    fmt.Println("%s is %d years old", name, age)
}

The example declares two variables with the shorhand notation.

## User input

The Scanf function scans text read from standard input, storing
successive space-separated values into successive arguments as determined by the
format. It returns the number of items successfully scanned.

main.go
  

package main

import "fmt"

func main() {

    var name string

    fmt.Print("Enter your name: ")
    fmt.Scanf("%s", &amp;name)
    fmt.Println("Hello", name)
}

The example prompts the user to enter his name.

var name string

We define a string variable.

fmt.Scanf("%s", &amp;name)

The entered value is stored into the name variable.

$ go run main.go
Enter your name: Robert
Hello Robert

We run the program and enter a name.

## Conditionals

Conditionals are created with the if, else if, and
else keywords.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    num := -5 + rand.Intn(10)

    if num &gt; 0 {

        fmt.Println("The number is positive")
    } else if num == 0 {

        fmt.Println("The number is zero")
    } else {

        fmt.Println("The number is negative")
    }
}

In this example, we  generate random values between -5 and 4. With the help of
the conditionals, we print a message for all three options.

## For loop

The for statement specifies repeated execution of a block.

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

This is the classic C-style for statement. The program calculates the sum of
values 1..9.

for i := 0; i &lt; 10; i++ {
    sum += i
}

The for statement consists of three parts: the initialization, the condition,
and the increment. The initialization part is executed only once. The body of
the for statement is executed when the condition is true. If the condition
returns false, the for loop is terminated. 

After the statements in the block are executed, the for loop switches to the
third part, where the counter is incremented. The cycle continues until the
condition is not true anymore. Note that is it possible to create endless loops.

$ go run main.go
45

The sum of values 1..9 is 45.

The following example uses the for loop with the
range keyword.

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

This example calculates the sum of array values.

nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}

We define an array of values.

for _, num := range nums {
    sum += num
}

We iterate over the array with the range clause. The
range returns the index and the value in each iteration. Since we
do not use the index, we specify the discard _ operator. (The
Golang documentation calls it the blank identifier.)

## Switch statement

Go switch statement provides a multi-way execution. An expression or type
specifier is compared to the cases inside the switch to determine which
branch to execute. Unlike in other languages such as C, Java, or PHP, each
case is terminated by an implicit break; therefore, we do not have to write
it explicitly.

The default statement can be used for a branch that is executed, when no other
cases fit. The default statement is optional. 

main.go
  

package main

import (
    "fmt"
    "runtime"
)

func main() {
    os := runtime.GOOS
    switch os {
    case "windows":
        fmt.Println("Windows")
    case "darwin":
        fmt.Println("MAC operating system")
    case "linux":
        fmt.Println("Linux")
    default:
        fmt.Printf("%s.\n", os)
    }
}

The GOOS environment variable is the running program's operating
system target: one of darwin, freebsd, linux, and so on. Based on the value of
the variable, we print the OS version.

$ go run main.go 
Linux

## Command-line arguments

Command-line arguments are options and data that are passed to programs. We
usually pass arguments to console programs, but sometimes we pass arguments to
GUI programs as well.

The os.Args holds the command-line arguments. The first value in 
this slice is the name of the program, while the os.Args[1:] 
holds the arguments to the program. The individual arguments are accessed with 
indexing operation.

main.go
  

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

$ go build main.go 
$ ./main Jan Peter Lucia
The program name is main
[]string
Hello, Jan!
Hello, Peter!
Hello, Lucia!

We build the program and run it. We pass the program three names on the command 
line. 

## Functions

A function is a mapping of zero or more input parameters to zero or more output
parameters. Go functions are first-class citizens. Functions can be assigned to
variables, passed as arguments to functions or returned from functions.

Functions in Go are created with the func keyword. We use the return keyword to
return values from functions. The body of the function consists of statements
that are executed when the function is called. The body is delimited with a pair
of curly brackets {}. To call a function, we specify its name followed by round
bracktets (). A function may or may not take parameters. 

main.go
  

package main

import "fmt"

func main() {

    x := 4
    y := 5

    z := add(x, y)

    fmt.Printf("Output: %d\n", z)
}

func add(a int, b int) int {

    return a + b
}

In the code example, we define a function which adds two values.

z := add(x, y)

We call the add function; it takes two parameters. The computed 
value is passed to the z variable.

func add(a int, b int) int {

    return a + b
}

We define the add function. The parameters of the function are 
separated with comma; each parameter name is followed with its data type.
After the parameters, we specify the return value type. The statements that are 
executed when the function is called are placed between curly brackets.
The result of the addition operation is returned to the caller with the 
return keyword.

$ go run main.go 
Output: 9

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered the basics of Go language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).