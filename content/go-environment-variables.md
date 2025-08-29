+++
title = "Go environment variables"
date = 2025-08-29T19:55:12.845+01:00
draft = false
description = "Learn how to work with environment variables in Go. Includes examples of setting, getting, and listing variables."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go environment variables

last modified April 11, 2024

In this article we show how to work with environment variables in Golang.

## Environment variable

An environment variable is a dynamic-named value that can affect the way running
processes behave on a computer. They are part of the environment in which a
process runs. In software development, environment variables are used to
configure applications.

Examples of environment variables include the location of all executable files
in the file system, the default shell and editor, or the system locale settings.

To work with environment variables in Go, we can use the os package 
or the third-party godotenv or viper libraries.

## Go os.Getenv

The Getenv retrieves the value of the environment variable named by
the key. It returns the value, which will be empty if the variable is not
present. To distinguish between an empty value and an unset value, use
LookupEnv. 

get_env.go
  

package main

import (
    "fmt"
    "os"
)

func main() {

    fmt.Println("Shell:", os.Getenv("SHELL"))
}

The example prints the name of the current user shell.

$ go run get_env.go
Shell: /bin/bash

## Go os.LookupEnv

The LookupEnv function retrieves the value of the environment
variable named by the key. If the variable is set the value (which may be empty)
is returned and the boolean is true. Otherwise the returned value will be empty
and the boolean will be false. 

lookup.go
  

package main

import (
    "fmt"
    "os"
)

func main() {

    getEnv := func(key string) {
        val, ok := os.LookupEnv(key)
        if !ok {
            fmt.Printf("%s not set\n", key)
        } else {
            fmt.Printf("%s=%s\n", key, val)
        }
    }

    getEnv("EDITOR")
    getEnv("SHELL")
}

In the code example, we try to get two environment variables. If the variable is 
present, its value is printed; otherwise, a message that the variable is not 
set is shown.

$ go run lookup.go 
EDITOR not set
SHELL=/bin/bash

## Go os.Setenv

The os.Setenv sets the value of the environment variable named by
the key.

setenv.go
  

package main

import (
    "fmt"
    "os"
)

func main() {

    fmt.Println("editor:", os.Getenv("EDITOR"))

    os.Setenv("EDITOR", "emacs")

    fmt.Println("editor:", os.Getenv("EDITOR"))
}

In the code example, we set the EDITOR variable with os.Setenv.

## Go list environment variables

The os.Environ returns a copy of strings representing the
environment, in the form "key=value". 

list_env_vars.go
  

package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {

    for _, e := range os.Environ() {

        pair := strings.SplitN(e, "=", 2)
        fmt.Printf("%s: %s\n", pair[0], pair[1])
    }
}

In the code example, we get a list of all environment variables. We cut the strings 
with SplitN into key and value pairs.

## Go os.Expandenv

The os.ExpandEnv is a helper function which replaces the 
$var inside a string into the value of the given variable.
References to undefined variables are replaced by the empty string.

expandenv.go
  

package main

import (
    "fmt"
    "os"
)

func main() {

    os.Setenv("EDITOR", "emacs")

    fmt.Println(os.ExpandEnv("My editor is $EDITOR."))
    fmt.Println(os.ExpandEnv("My shell is $SHELL."))

}

The example expands two variables.

$ go run expandenv.go 
My editor is emacs.
My shell is /bin/bash.

## Go dotenv library

On development machines, environment variables are often stored in the special
.env file. The godotenv library loads environment
variables from the .env file. 

$ go get github.com/joho/godotenv

We install the library.

.env
  

EDITOR=emacs
NAME=Peter

We have two variables.

dotenv_load.go
  

package main

import (
    "fmt"
    "log"
    "os"

    "github.com/joho/godotenv"
)

func init() {

    err := godotenv.Load(".env")

    if err != nil {
        log.Fatal("Error loading .env file")
    }
}

func main() {

    fmt.Printf("%s uses %s\n", os.Getenv("NAME"), os.Getenv("EDITOR"))
}

With the Load function, we load the variables and later retrieve 
them with os.Getenv.

If we do not want to mix up existing environment variables with those from 
the .env file, we can use the Read function which 
returns a map of environment variables.

dotenv_read.go
  

package main

import (
    "fmt"
    "log"

    "github.com/joho/godotenv"
)

func main() {

    var envs map[string]string
    envs, err := godotenv.Read(".env")

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    name := envs["NAME"]
    editor := envs["EDITOR"]

    fmt.Printf("%s uses %s\n", name, editor)
}

In the code example, we read the environment variables from the .env
file into a map.

## Source

[Go os package - reference](https://pkg.go.dev/os)

In this article we have worked with environment variables in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).