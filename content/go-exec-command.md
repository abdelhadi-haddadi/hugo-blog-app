+++
title = "Go exec command"
date = 2025-08-29T19:55:14.355+01:00
draft = false
description = "Learn how to execute shell commands in Go using the os/exec package. Includes examples of running commands and capturing output."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go exec command

last modified April 11, 2024

In this article we show how to execute shell commands and programs in
Golang.

The Run function starts the specified command and waits for it to
complete, while the Start starts the specified command but does not
wait for it to complete; we need to use Wait with Start.

## Go os/exec

The os/exec package runs external commands. It wraps
os.StartProcess to make it easier to remap stdin and stdout,
connect I/O with pipes, and do other adjustments.

## Go exec program

The Run starts the specified command and waits for it to complete.

runprg.go
  

package main

import (
    "log"
    "os/exec"
)

func main() {

    cmd := exec.Command("firefox")

    err := cmd.Run()

    if err != nil {
        log.Fatal(err)
    }
}

In the code example, we execute the Firefox browser.

## Go exec.Command

The Command  returns the Cmd struct to execute the specified
program with the given arguments. The first parameter is the program to be run;
the other arguments are parameters to the program.

command.go
  

package main

import (
    "bytes"
    "fmt"
    "log"
    "os/exec"
    "strings"
)

func main() {
    cmd := exec.Command("tr", "a-z", "A-Z")

    cmd.Stdin = strings.NewReader("and old falcon")

    var out bytes.Buffer
    cmd.Stdout = &amp;out

    err := cmd.Run()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("translated phrase: %q\n", out.String())
}

In the code example, we transform the input via the tr command.

cmd := exec.Command("tr", "a-z", "A-Z")

The tr standard Linux command translates, squeezes, and/or deletes
characters from standard input, writing to standard output. In our case, we
transform lowercase letters to uppercase ones.

cmd.Stdin = strings.NewReader("and old falcon")

Through the Stdin field, we pass a string to the command as its
input.

var out bytes.Buffer
cmd.Stdout = &amp;out

The output of the program will be written to the bytes buffer.

$ go run command.go
translated phrase: "AND OLD FALCON"

## Go exec command with multiple args

We can pass multiple arguments to the exec.Command.

multiple_args.go
  

package main

import (
    "fmt"
    "os/exec"
)

func main() {

    prg := "echo"

    arg1 := "there"
    arg2 := "are three"
    arg3 := "falcons"

    cmd := exec.Command(prg, arg1, arg2, arg3)
    stdout, err := cmd.Output()

    if err != nil {
        fmt.Println(err.Error())
        return
    }

    fmt.Print(string(stdout))
}

The example runs the echo command with three arguments.

$ go run multiple_args.go
there are three falcons

## Go exec command capture output

The Output runs the command and returns its standard output.

capture_output.go
  

package main

import (
    "fmt"
    "log"
    "os/exec"
)

func main() {

    out, err := exec.Command("ls", "-l").Output()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(out))
}

The example captures the output of the ls command and prints it.

## Go cmd.StdinPipe

The pipe allows us to send the output of one command to another. The
StdinPipe returns a pipe that will be connected to the command's
standard input when the command starts.

stdinpipe.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "os/exec"
)

func main() {

    cmd := exec.Command("cat")
    stdin, err := cmd.StdinPipe()
    if err != nil {
        log.Fatal(err)
    }

    go func() {
        defer stdin.Close()
        io.WriteString(stdin, "an old falcon")
    }()

    out, err := cmd.CombinedOutput()
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("%s\n", out)
}

In the code example, we write a string to the standard input inside a goroutine.

cmd := exec.Command("cat")

The cat command concatenates the given files to the standard
output. When no file is given, or with -, the command reads standard input and
prints it to standard output.

stdin, err := cmd.StdinPipe()

We get the standard input pipe of the cat command.

go func() {
    defer stdin.Close()
    io.WriteString(stdin, "an old falcon")
}()

Inside the goroutine, we write a string to the stdin pipe.

$ go run stdinpipe.go
an old falcon

## Go cmd.StdoutPipe

The StdoutPipe returns a pipe that will be connected to the
command's standard output when the command starts.

stdoutpipe.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "os/exec"
    "strings"
)

func upper(data string) string {

    return strings.ToUpper(data)
}

func main() {
    cmd := exec.Command("echo", "an old falcon")

    stdout, err := cmd.StdoutPipe()

    if err != nil {
        log.Fatal(err)
    }

    if err := cmd.Start(); err != nil {
        log.Fatal(err)
    }

    data, err := ioutil.ReadAll(stdout)

    if err != nil {
        log.Fatal(err)
    }

    if err := cmd.Wait(); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("%s\n", upper(string(data)))
}

The example reads the output of the echo command through the pipe
and transforms it into uppercase letters.

cmd := exec.Command("echo", "an old falcon")

The command to run is the echo command with a single string
argument.

stdout, err := cmd.StdoutPipe()

We get the standard output pipe.

if err := cmd.Start(); err != nil {
    log.Fatal(err)
}

The command is executed with the Start function; it does not wait
wait for it to complete.

data, err := ioutil.ReadAll(stdout)

We read the data from the pipe.

if err := cmd.Wait(); err != nil {
    log.Fatal(err)
}

The Wait waits for the command to exit and waits for any copying to
stdin or copying from stdout or stderr to complete.  It closes the pipe after
seeing the command exit.

$ go run stdoutpipe.go
AN OLD FALCON

## Source

[Go os package - reference](https://pkg.go.dev/os)

In this article we have executed external commands in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).