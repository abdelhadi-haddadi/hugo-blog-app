+++
title = "Go flag"
date = 2025-08-29T19:55:16.602+01:00
draft = false
description = "Learn how to use command-line flags in Go. Includes examples of parsing and handling flags."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go flag

last modified April 11, 2024

In this article we show how to parse command-line arguments in Golang with flag
package.

The package flag implements command-line flag parsing. 
The command-line arguments are available in the os.Args slice.
The flag package allows for more flexible of them.

In addition, there are third-party packages such as Cobra with additional
features.

func String(name string, value string, usage string) *string
func StringVar(p *string, name string, value string, usage string)

The flag package contains multiple functions for parsing different
flag types. There are two alternatives for each flag type. The difference is
that the first one returns a pointer to a variable, the other one accepts a
pointer to the variable.

With flag.Args, we can parse non-flag arguments; these must follow 
the flag arguments.

## Go flag syntax

There are several options for writing flags.

-count=x
-count x
--count=x
--count x

These are for all types except for booleans.

-upper
--upper
-upper=value
--upper=value

Boolean flags have these options.

## Go flag simple example

The following example is a simple program which parses an integer argument.

simple.go
  

package main

import (
    "flag"
    "fmt"
)

func main() {
    num := flag.Int("n", 5, "# of iterations")
    flag.Parse()

    n := *num
    i := 0

    for i &lt; n {
        fmt.Println("falcon")
        i++
    }
}

The program prints the word "falcon" n times; the n value is parsed from the 
command line argument.

import (
    "flag"
    "fmt"
)

First, we import the flag package.

num := flag.Int("n", 5, "# of iterations")

We register an int flag with flag.Int. The first parameter is the
name of the flag, the second is the default value, and the third is the
description of the flag.

flag.Parse()

We process the flags with flat.Parse.

n := *num

Since we have used a function which returns a pointer to a variable, we
dereference the pointer and get the value.

for i &lt; n {
    fmt.Println("falcon")
    i++
}

We print the word "falcon" n times.

$ go run simple.go 
falcon
falcon
falcon
falcon
falcon
$ go run simple.go -n 3
falcon
falcon
falcon

## Go flag.String &amp; flag.Int

The flag.String defines a string flag with specified name,
default value, and usage string. The return value is the address of a string
variable that stores the value of the flag. The flag.Int
defines an int flag with specified name, default value, and usage string. The
return value is the address of an int variable that stores the value of the
flag. 

string_int.go
  

package main

import (
    "flag"
    "fmt"
)

var (
    env  *string
    port *int
)

func init() {
    env = flag.String("env", "development", "current environment")
    port = flag.Int("port", 3000, "port number")
}

func main() {

    flag.Parse()

    fmt.Println("env:", *env)
    fmt.Println("port:", *port)
}

The program works with two flags: the environment option and the port number.

func init() {
    env = flag.String("env", "development", "current environment")
    port = flag.Int("port", 3000, "port number")
}

We can place our statements in the init function, which is 
often used to intialize state variables.

$ go run string_int.go 
env: development
port: 3000
$ go run string_int.go -port 8080
env: development
port: 8080

## Go flag.StringVar

The flag.StringVar defines a string flag with specified name,
default value, and usage string. The first argument points to a string variable
in which to store the value of the flag. 

stringvar.go
  

package main

import (
    "flag"
    "fmt"
)

func main() {

    var name string
    flag.StringVar(&amp;name, "name", "guest", "your name")
    flag.Parse()

    fmt.Printf("Hello %s\n", name)
}

The example takes the user's name from the command-line. 

$ go run stringvar.go 
Hello guest
$ go run stringvar.go -name Peter
Hello Peter

## Go flag.PrintDefaults

The flag.PrintDefaults default values of all defined command-line
flags in the set.

defaults.go
  

package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {

    var name string
    flag.StringVar(&amp;name, "name", "", "your name")
    flag.Parse()

    if len(name) == 0 {
        fmt.Println("Usage: defaults.go -name")
        flag.PrintDefaults()
        os.Exit(1)
    }

    fmt.Printf("Hello %s\n", name)
}

The program registers the name flag and makes is required.

if len(name) == 0 {
    fmt.Println("Usage: defaults.go -name")
    flag.PrintDefaults()
    os.Exit(1)
}

If the name variable is empty, we print the usage of the program.

$ go run defaults.go 
Usage: defaults.go -name
    -name string
        your name
exit status 1

## Go flag.BoolVar

The flag.BoolVar defines a bool flag with specified name, default
value, and usage string. The first argument points to a bool variable in which
to store the value of the flag. 

boolean.go
  

package main

import (
    "flag"
    "fmt"
    "strings"
)

func main() {

    var name string
    var upper bool

    flag.StringVar(&amp;name, "name", "guest", "your name")
    flag.BoolVar(&amp;upper, "u", false, "display in uppercase")
    flag.Parse()

    var msg string

    msg = fmt.Sprintf("Hello %s", name)

    if upper {
        fmt.Println(strings.ToUpper(msg))

    } else {

        fmt.Println(msg)
    }
}

The program takes the name of the user and a boolean flag whether to write the 
message in uppercase.

$ go run boolean.go -name Peter
Hello Peter
$ go run boolean.go -name Peter -u
HELLO PETER

## Go flag.Args

The arguments following the flags are available as the slice
flag.Args or individually as flag.Arg(i). 
The arguments are indexed from 0 through flag.NArg() - 1. 

nonflags.go
  

package main

import (
    "flag"
    "fmt"
    "os"
    "strings"
)

func main() {

    var u bool
    flag.BoolVar(&amp;u, "u", false, "display in uppercase")
    flag.Parse()

    values := flag.Args()

    if len(values) == 0 {
        fmt.Println("Usage: nonflags.go [-u] words ...")
        flag.PrintDefaults()
        os.Exit(1)
    }

    for _, word := range values {

        if u {

            fmt.Println(strings.ToUpper(word))
        } else {

            fmt.Println(word)
        }
    }
}

The program has the u flag, which prints all words following the 
flag in uppercase.

flag.BoolVar(&amp;u, "u", false, "display in uppercase")

We define the boolean flag. 

values := flag.Args()

We get all the words from the terminal.

for _, word := range values {

    if u {

        fmt.Println(strings.ToUpper(word))
    } else {

        fmt.Println(word)
    }
}

We go through the slice and print the words; if we have set the uppercase flag, 
the words are printed in uppercase.

$ go run nonflags.go sky blue falcon cup ocean
sky
blue
falcon
cup
ocean
$ go run nonflags.go -u sky blue falcon cup ocean
SKY
BLUE
FALCON
CUP
OCEAN

## Source

[Go flag package - reference](https://pkg.go.dev/flag)

In this article we have parsed command-line arguments in Golang with flag 
package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).