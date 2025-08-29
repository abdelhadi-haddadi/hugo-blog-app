+++
title = "Go urfave/cli"
date = 2025-08-29T19:56:24.476+01:00
draft = false
description = "Learn how to create command line tools in Go using the urfave/cli package. Includes examples and usage tips."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go urfave/cli

last modified April 11, 2024

In this article we show how to create command line tools in Golang using 
the urfave/cli package.

The urfave/cli is a simple and fast package for building command
line applications in Go. It supports commands, subcommands, flags, automatic
help system, dynamic shell completion and generation of markdown documentation.

## Simple CLI example

The following example demonstrates how to create a simple skeleton of a CLI 
application.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli"
)

func main() {

     app := cli.NewApp()
     app.Name = "my cli application"

     app.Action = (func(ctx *cli.Context) error {
          fmt.Println("app launched")
          return nil
     })

     err := app.Run(os.Args)

     if err != nil {
          log.Fatal(err)
     }
}

The program shows a short message when run.

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli"
)

The package is imported.

app := cli.NewApp()

A new CLI application is created with cli.NewApp. It sets some
defaults to the application.

app.Name = "my cli application"

We set the name for the application through the Name field.

app.Action = (func(ctx *cli.Context) error {
     fmt.Println("app launched")
     return nil
})

The Action field is set to a function which is called when no 
subcommands are specified.

err := app.Run(os.Args)

The Run function parses the arguments slice and routes to the
proper flag/args combination.

$ go build
$ simple.exe
app launched

We build and run the application.

$ simple.exe -h
NAME:
   my cli application - A new cli application

USAGE:
   simple.exe [global options] command [command options] [arguments...]

COMMANDS:
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h  show help

The urfave/cli automatically creates help for our tool.

## CLI arguments

Arguments passed to the program can be retrieved via the Args
function.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli/v2"
)

func main() {

     app := &amp;cli.App{
          Usage: "app a1 a2 ...",
          Action: func(ctx *cli.Context) error {

               n := ctx.NArg()
               fmt.Printf("app received %d arguments\n", n)

               if n &gt;= 2 {

                    first := ctx.Args().First()
                    rest := ctx.Args().Tail()

                    fmt.Printf("first argument: %s\n", first)
                    fmt.Printf("the remaining arguments: %v\n", rest)
               } else if n == 1 {

                    first := ctx.Args().First()
                    fmt.Printf("first argument: %s\n", first)
               }

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

The program retrieves the passed arguments.

n := ctx.NArg()
fmt.Printf("app received %d arguments\n", n)

The NArg returns the number of the command line arguments passed.

first := ctx.Args().First()
rest := ctx.Args().Tail()

The First function returns the first argument. The
Tail returns the rest of the arguments (all but the first).

$ nargs.exe 1 2 3 4
app received 4 arguments
first argument: 1
the remaining arguments: [2 3 4]

## Check arguments

With the Present function, we can check if there are any arguments 
passed to the program.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli/v2"
)

func main() {
     app := &amp;cli.App{
          Action: func(ctx *cli.Context) error {

               if ctx.Args().Present() {

                    fmt.Println(ctx.App.Name)
                    fmt.Println(ctx.NArg())
                    fmt.Println(ctx.Args().First())
                    fmt.Println(ctx.Args().Tail())
               } else {
                    fmt.Println("No arguments specified")
               }

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

If there are no arguments, the application prints "No arguments specified"
message.

$ checkargs.exe 1 2 3 4
checkargs.exe
4
1
[2 3 4]
$ checkargs.exe
No arguments specified

## The Get function

The Get function returns the nth argument, or else a blank string.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"
     "time"

     "github.com/urfave/cli/v2"
)

func main() {
     app := &amp;cli.App{
          Name:  "app",
          Usage: "app [now] [hello]",
          Action: func(ctx *cli.Context) error {

               a := ctx.Args().Get(0)

               if a == "now" {
                    now := time.Now()
                    fmt.Println(now)
               } else if a == "hello" {
                    fmt.Println("hello there!")
               } else {

                    fmt.Printf("Usage: %s\n", ctx.App.Usage)
               }

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

In the program, we retrieve the first command line argument and perform an
action depending if the argument equals to "now" or "hello".

a := ctx.Args().Get(0)

We retrieve the first argument with Get. In this case we can also 
use First.

if a == "now" {
     now := time.Now()
     fmt.Println(now)
} else if a == "hello" {
     fmt.Println("hello there!")
} else {

     fmt.Printf("Usage: %s\n", ctx.App.Usage)
}

If the argument equals to "now", we print the current datetime. If it equals to 
"hello", we print a message. Otherwise, the usage is printed with 
ctx.App.Usage.

$ app.exe now
2023-10-03 12:34:08.5846632 +0200 CEST m=+0.003355301
$ app.exe hello
hello there!

## CLI commands

A *command* is a specific action that the tool performs. The previous
example had two commands: now and hello. Now we
rewrite the program to use commands.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"
     "time"

     "github.com/urfave/cli/v2"
)

func main() {
     app := &amp;cli.App{
          Name: "app",
          Commands: []*cli.Command{
               {
                    Name:  "now",
                    Usage: "Show current local datetime",
                    Action: func(c *cli.Context) error {
                         now := time.Now()
                         fmt.Println(now)
                         return nil
                    },
               },
               {
                    Name:  "hello",
                    Usage: "Show hello message",
                    Action: func(c *cli.Context) error {
                         fmt.Println("Hello there!")
                         return nil
                    },
               },
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

The commands are specified in the Commands field.

{
     Name:  "now",
     Usage: "Show current local datetime",
     Action: func(c *cli.Context) error {
          now := time.Now()
          fmt.Println(now)
          return nil
     },
},

We specify the Name, the Usage and the
Action for the command.

## CLI flags

Flags are used to pass values to the command line applications.

-count=x
-count x
--count=x
--count x

There are several ways to specify flags. Also note that boolean flags do not 
require a value.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli/v2"
)

func main() {
     app := &amp;cli.App{
          Flags: []cli.Flag{
               &amp;cli.StringFlag{Name: "name"},
          },
          Action: func(ctx *cli.Context) error {

               name := ctx.Value("name")
               fmt.Println(name)

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

The program accepts a name flag.

Flags: []cli.Flag{
     &amp;cli.StringFlag{Name: "name"},
},

Flags are specified via the Flags field. The name flag 
is a StringFlag.

Action: func(ctx *cli.Context) error {

     name := ctx.Value("name")
     fmt.Println(name)

     return nil
},

In the Action function we get the value of the flag using
Value.

$ flag.exe --name "John Doe"
John Doe

## Aliases

We can give aliases to our flags. An alias is a different name for the flag.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli/v2"
)

func main() {
     app := &amp;cli.App{
          Flags: []cli.Flag{
               &amp;cli.StringFlag{Name: "config", Aliases: []string{"cfg", "conf"}},
          },
          Action: func(ctx *cli.Context) error {

               fmt.Println(ctx.String("config"))
               fmt.Println(ctx.String("cfg"))
               fmt.Println(ctx.String("conf"))

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

The config flag has cfg and conf aliases.

Flags: []cli.Flag{
     &amp;cli.StringFlag{Name: "config", Aliases: []string{"cfg", "conf"}},
},

The aliases are specified with the Aliases option.

fmt.Println(ctx.String("config"))
fmt.Println(ctx.String("cfg"))
fmt.Println(ctx.String("conf"))

We get retrieve the value via all three options.

$ aliases.exe -cfg file.txt
file.txt
file.txt
file.txt

## Destination

The Destination option can be used to specify the variable to which 
the passed value will be copied.

main.go
  

package main

import (
     "fmt"
     "log"
     "os"

     "github.com/urfave/cli/v2"
)

func main() {

     var name string

     app := &amp;cli.App{
          Flags: []cli.Flag{
               &amp;cli.StringFlag{Name: "name", Destination: &amp;name},
          },
          Action: func(ctx *cli.Context) error {

               msg := fmt.Sprintf("Hello %s!", name)
               fmt.Println(msg)

               return nil
          },
     }

     if err := app.Run(os.Args); err != nil {
          log.Fatal(err)
     }
}

In the program, we copy the value from the passed name argument 
to the name variable.

## Application version

Application version can be set via Version and
VersionFlag.

main.go
  

package main

import (
     "os"

     "github.com/urfave/cli/v2"
)

func main() {
     cli.VersionFlag = &amp;cli.BoolFlag{
          Name:    "version",
          Aliases: []string{"V"},
          Usage:   "shows the app version",
     }

     app := &amp;cli.App{
          Name:    "app",
          Usage:   "app demonstrating version",
          Version: "v1.0",
     }
     app.Run(os.Args)
}

In the example we set the application version.

cli.VersionFlag = &amp;cli.BoolFlag{
     Name:    "version",
     Aliases: []string{"V"},
     Usage:   "shows the app version",
}

We specify the flag name, alias, and usage. The BoolFlag is used.

app := &amp;cli.App{
     Name:    "app",
     Usage:   "app demonstrating version",
     Version: "v1.0",
}

We specify the version string.

$ app.exe --version
app version v1.0

## Source

[Go urfave/cli - Github page](https://github.com/urfave/cli)

In this article we have shown how to create Go command line tools using the 
urfave/cli package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).