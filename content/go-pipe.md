+++
title = "Go Pipe"
date = 2025-08-29T19:55:32.466+01:00
draft = false
description = "Learn how to use pipes in Go. Includes examples of inter-process communication."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Pipe

last modified April 22, 2025

This tutorial demonstrates how to utilize pipes in Golang for seamless
interprocess communication.

## Pipe

A pipe is a powerful mechanism for redirecting data between processes, enabling
efficient interprocess communication through a unidirectional channel. Pipes are
commonly used in scenarios where data needs to flow seamlessly between producers
and consumers or where processes collaborate to achieve a common task.

The io.Pipe function in Go creates a synchronous, in-memory pipe
that provides a direct connection between an io.Reader and an
io.Writer. This function is particularly useful when you need to
stream data between components in your application, such as reading from a
source while simultaneously writing to a sink.

Since io.Pipe operates synchronously, writes to the pipe block
until corresponding reads occur, ensuring consistent data transfer without
buffering. This makes io.Pipe an excellent choice for applications
that require real-time data processing or tightly coupled communication between
components.

$ go version
go version go1.22.2 linux/amd64

This tutorial uses Go version 1.22.2 for all examples.

## Go pipe simple example

This example illustrates the basic usage of the io.Pipe function
for data transfer.

simple.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "os"
)

func main() {
    r, w := io.Pipe()

    go func() {
        fmt.Fprint(w, "Hello there\n")
        w.Close()
    }()

    _, err := io.Copy(os.Stdout, r)

    if err != nil {
        log.Fatal(err)
    }
}

This program creates a pipe using io.Pipe, writes data to the
pipe's writer within a goroutine, and copies the data from the pipe's reader to
standard output using io.Copy.

go func() {
    fmt.Fprint(w, "Hello there\n")
    w.Close()
}()

In a goroutine, data is written to the PipeWriter. Writes block
until the data is fully consumed by one or more reads from the
PipeReader.

$ go run simple.go 
Hello there

## Go cmd StdoutPipe

The StdoutPipe method of a command provides a pipe connected to the
command's standard output once the command is initiated.

pingcmd.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
    "os/exec"
)

func main() {

    cmd := exec.Command("ping", "webcode.me")
    stdout, err := cmd.StdoutPipe()

    if err != nil {
        log.Fatal(err)
    }

    cmd.Start()

    buf := bufio.NewReader(stdout) 
    num := 0

    for {
        line, _, _ := buf.ReadLine()
        if num &gt; 3 {
            os.Exit(0)
        }
        num += 1
        fmt.Println(string(line))
    }
}

This example executes a ping command and reads the first four lines
of its output, displaying them on the console.

cmd := exec.Command("ping", "webcode.me")

A command is created to run ping, testing the availability of the
webcode.me website.

stdout, err := cmd.StdoutPipe()

The StdoutPipe method retrieves a pipe for the command's standard
output stream.

buf := bufio.NewReader(stdout) 

A buffered reader is created to read data from the command's standard output
efficiently.

for {
    line, _, _ := buf.ReadLine()
    if num &gt; 3 {
        os.Exit(0)
    }
    num += 1
    fmt.Println(string(line))
}

A loop reads four lines from the output, printing each to the console before
terminating the program.

$ go run pingcmd.go 
PING webcode.me (46.101.248.126) 56(84) bytes of data.
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=1 ttl=54 time=29.7 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=2 ttl=54 time=35.9 ms
64 bytes from 46.101.248.126 (46.101.248.126): icmp_seq=3 ttl=54 time=37.4 ms

## Go pipe POST JSON data

This example demonstrates posting JSON data to
https://httpbin.org/post using a pipe.

post_json.go
  

package main

import (
    "encoding/json"
    "fmt"
    "io"
    "io/ioutil"
    "log"
    "net/http"
)

type PayLoad struct {
    Content string
}

func main() {

    r, w := io.Pipe()

    go func() {
        defer w.Close()

        err := json.NewEncoder(w).Encode(&amp;PayLoad{Content: "Hello there!"})

        if err != nil {
            log.Fatal(err)
        }
    }()

    resp, err := http.Post("https://httpbin.org/post", "application/json", r)

    if err != nil {
        log.Fatal(err)
    }

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

This program sends a JSON payload to a web server via a pipe and prints the
response body, illustrating network communication with pipes.

go func() {
    defer w.Close()

    err := json.NewEncoder(w).Encode(&amp;PayLoad{Content: "Hello there!"})

    if err != nil {
        log.Fatal(err)
    }
}()

A JSON payload is encoded and written to the PipeWriter in a
goroutine, ensuring the writer is closed properly after encoding.

resp, err := http.Post("https://httpbin.org/post", "application/json", r)

The http.Post function sends the JSON data using the
PipeReader as the request body, specifying the content type as
JSON.

body, err := ioutil.ReadAll(resp.Body)

if err != nil {
    log.Fatal(err)
}

fmt.Println(string(body))

The response body is read and converted to a string, then printed to the
console to display the server's response.

$ go run post_json.go 
{
  "args": {}, 
  "data": "{\"Content\":\"Hello there!\"}\n", 
  "files": {}, 
  "form": {}, 
  "headers": {
...

## Go read standard input through pipe

This example creates a Go program that reads data from standard input via a
pipe, processes it, and displays the results.

read_stdin.go
  

package main

import (
    "bufio"
    "fmt"
    "io"
    "log"
    "os"
)

func main() {

    nBytes, nChunks := int64(0), int64(0)
    r := bufio.NewReader(os.Stdin)
    buf := make([]byte, 0, 4*1024)

    for {

        n, err := r.Read(buf[:cap(buf)])
        buf = buf[:n]

        if n == 0 {

            if err == nil {
                continue
            }

            if err == io.EOF {
                break
            }

            log.Fatal(err)
        }

        nChunks++
        nBytes += int64(len(buf))

        fmt.Println(string(buf))

        if err != nil &amp;&amp; err != io.EOF {
            log.Fatal(err)
        }
    }

    fmt.Println("Bytes:", nBytes, "Chunks:", nChunks)
}

This program reads data from standard input, prints it, and tracks the number of
bytes and chunks processed, demonstrating pipe-based input handling.

r := bufio.NewReader(os.Stdin)

A buffered reader is created to efficiently read data from standard input,
typically piped from another command.

buf := make([]byte, 0, 4*1024)

A 4KB buffer is allocated to store data read from standard input, optimizing
memory usage for input processing.

n, err := r.Read(buf[:cap(buf)])
buf = buf[:n]

Data is read into the buffer, and the buffer is sliced to the number of bytes
read, ensuring accurate data handling.

nChunks++
nBytes += int64(len(buf))

The program increments the chunk counter and accumulates the total bytes read,
tracking input statistics.

fmt.Println(string(buf))

The buffer's contents are converted to a string and printed to the console,
displaying the piped input data.

$ date | go run read_stdin.go 
Sun 15 Nov 2020 01:08:13 PM CET

Bytes: 32 Chunks: 1

The date command's output is piped to the program, which reads,
displays, and reports the byte and chunk counts.

## Go Stat

The Stat function returns a FileInfo structure describing a file,
useful for detecting piped input on standard input.

hello.go
  

package main

import (
    "bufio"
    "fmt"
    "log"
    "os"
)

func main() {
    stat, _ := os.Stdin.Stat()

    if (stat.Mode() &amp; os.ModeCharDevice) == 0 {

        var buf []byte
        scanner := bufio.NewScanner(os.Stdin)

        for scanner.Scan() {
            buf = append(buf, scanner.Bytes()...)
        }

        if err := scanner.Err(); err != nil {
            log.Fatal(err)
        }

        fmt.Printf("Hello %s!\n", buf)

    } else {
        fmt.Print("Enter your name: ")

        var name string
        fmt.Scanf("%s", &amp;name)
        fmt.Printf("Hello %s!\n", name)
    }
}

This program accepts input either through a pipe or via a user prompt, greeting
the user based on the input source.

stat, _ := os.Stdin.Stat()

The Stat function retrieves metadata about standard input,
indicating whether it is piped or terminal-based.

if (stat.Mode() &amp; os.ModeCharDevice) == 0 {

This condition checks if standard input is piped, as opposed to coming from a
terminal or character device.

var buf []byte
scanner := bufio.NewScanner(os.Stdin)

for scanner.Scan() {
    buf = append(buf, scanner.Bytes()...)
}

A scanner reads piped input line by line, appending each line to a byte slice
for further processing.

} else {
    fmt.Print("Enter your name: ")

    var name string
    fmt.Scanf("%s", &amp;name)
    fmt.Printf("Hello %s!\n", name)
}

If no piped input is detected, the program prompts the user to enter a name and
prints a greeting.

$ echo "Peter" | go run hello.go 
Hello Peter!
$ go run hello.go 
Enter your name: Peter
Hello Peter!

The program handles both piped input (via echo) and interactive
prompt input, demonstrating flexible input processing.

## Go pipe in HTTP handler

This example uses a pipe within an HTTP handler to stream command output to a
web client.

hadler.go
  

package main

import (
    "fmt"
    "io"
    "net/http"
    "os/exec"
)

func handler(w http.ResponseWriter, r *http.Request) {

    cmd := exec.Command("date")

    pr, pw := io.Pipe()
    defer pw.Close()

    cmd.Stdout = pw
    cmd.Stderr = pw
    go io.Copy(w, pr)

    cmd.Run()
}

func main() {

    http.HandleFunc("/", handler)
    fmt.Println("server started on port 8080")
    http.ListenAndServe(":8080", nil)
}

This program runs a web server that executes the date command and
streams its output to clients via a pipe.

cmd := exec.Command("date")

A command is defined to execute the date system command, which
outputs the current date and time.

pr, pw := io.Pipe()
defer pw.Close()

A pipe is created with io.Pipe, and the writer is deferred to
ensure proper closure after use.

cmd.Stdout = pw
cmd.Stderr = pw

The command's standard output and error streams are directed to the
PipeWriter for streaming.

go io.Copy(w, pr)

In a goroutine, the PipeReader streams data to the
http.ResponseWriter, sending it to the client.

cmd.Run()

The Run method executes the command, generating output that flows
through the pipe to the client.

$ go run handler.go 
server started on port 8080

The server starts, listening for HTTP requests on port 8080.

$ curl localhost:8080
Sun 15 Nov 2020 02:18:07 PM CET

A curl request retrieves the date command's output, streamed via
the pipe from the server.

## Go pipe with concurrent writers

This example demonstrates using multiple concurrent writers to a single pipe,
showcasing synchronized data aggregation from multiple goroutines.

concurrent_writers.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "os"
    "sync"
)

func main() {
    r, w := io.Pipe()
    var wg sync.WaitGroup

    for i := 0; i &lt; 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Fprintf(w, "Message from writer %d\n", id)
        }(i)
    }

    go func() {
        wg.Wait()
        w.Close()
    }()

    _, err := io.Copy(os.Stdout, r)
    if err != nil {
        log.Fatal(err)
    }
}

This program creates a pipe and spawns three goroutines, each writing a message
to the PipeWriter. A WaitGroup ensures the writer is
closed only after all goroutines complete, and the data is read to stdout.

$ go run concurrent_writers.go 
Message from writer 0
Message from writer 1
Message from writer 2

## Go pipe for streaming file processing

This example uses a pipe to stream data from a file to a processing function,
demonstrating efficient handling of large files without loading them fully into
memory.

file_stream.go
  

package main

import (
    "bufio"
    "io"
    "log"
    "os"
    "strings"
)

func main() {
    r, w := io.Pipe()

    go func() {
        defer w.Close()
        file, err := os.Open("input.txt")
        if err != nil {
            log.Fatal(err)
        }
        defer file.Close()
        io.Copy(w, file)
    }()

    scanner := bufio.NewScanner(r)
    for scanner.Scan() {
        line := strings.ToUpper(scanner.Text())
        os.Stdout.WriteString(line + "\n")
    }
    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
}

This program reads a file through a pipe, streaming its contents to a scanner
that converts each line to uppercase and outputs it. The pipe enables processing
without loading the entire file into memory.

$ echo -e "hello\nworld" &gt; input.txt
$ go run file_stream.go 
HELLO
WORLD

## Go pipe with error handling

This example shows how to handle errors in a pipe-based workflow, ensuring
robust communication between a writer and reader with proper error propagation.

error_handling.go
  

package main

import (
    "errors"
    "fmt"
    "io"
    "log"
    "os"
)

func main() {
    r, w := io.Pipe()

    go func() {
        defer w.Close()
        _, err := fmt.Fprint(w, "Valid data\n")
        if err != nil {
            w.CloseWithError(err)
            return
        }
        w.CloseWithError(errors.New("simulated writer error"))
    }()

    buf := make([]byte, 1024)
    n, err := r.Read(buf)
    if err != nil &amp;&amp; err != io.EOF {
        log.Fatal(err)
    }
    fmt.Print(string(buf[:n]))

    _, err = r.Read(buf)
    if err != nil {
        fmt.Println("Reader caught error:", err)
    }
}

This program simulates a writer error using CloseWithError. The
reader processes initial valid data and then detects the error, demonstrating
robust error handling in pipe communication.

$ go run error_handling.go 
Valid data
Reader caught error: simulated writer error

## Go pipe with chained processing

This example illustrates a pipeline where data flows through multiple processing
stages via pipes, showcasing a modular approach to data transformation.

chained_pipeline.go
  

package main

import (
    "bufio"
    "io"
    "log"
    "os"
    "strings"
)

func main() {
    r1, w1 := io.Pipe()
    r2, w2 := io.Pipe()

    go func() {
        defer w1.Close()
        w1.Write([]byte("hello there!\n"))
    }()

    go func() {
        defer w2.Close()
        scanner := bufio.NewScanner(r1)
        for scanner.Scan() {
            w2.Write([]byte(strings.ToUpper(scanner.Text()) + "\n"))
        }
        if err := scanner.Err(); err != nil {
            log.Fatal(err)
        }
    }()

    io.Copy(os.Stdout, r2)
}

This program creates a two-stage pipeline: the first stage writes data to a
pipe, and the second stage reads it, converts it to uppercase, and writes to
another pipe. The final output is streamed to stdout.

$ go run chained_pipeline.go 
HELLO THERE!

## Go pipe with real-time log aggregation

This example demonstrates aggregating logs from multiple sources in real-time
using a pipe, simulating a centralized logging system with concurrent inputs.

log_aggregation.go
  

package main

import (
    "fmt"
    "io"
    "log"
    "os"
    "sync"
    "time"
)

func main() {
    r, w := io.Pipe()
    var wg sync.WaitGroup

    for i := 0; i &lt; 3; i++ {

        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for j := 0; j &lt; 3; j++ {
                fmt.Fprintf(w, "[Source %d] Log entry %d at %v\n", id, j, time.Now())
                time.Sleep(100 * time.Millisecond)
            }
        }(i)
    }

    go func() {
        wg.Wait()
        w.Close()
    }()

    scanner := bufio.NewScanner(r)
    for scanner.Scan() {
        fmt.Println(scanner.Text())
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }
}

This program simulates three log sources, each writing entries to a pipe in
concurrent goroutines. The reader scans the pipe and prints logs in real-time,
demonstrating centralized log aggregation.

## Go pipe with compressed data streaming

This example shows how to use a pipe to stream and compress data in real-time,
illustrating efficient handling of large datasets with compression.

compress_stream.go
  

package main

import (
    "compress/gzip"
    "fmt"
    "io"
    "log"
    "os"
)

func main() {
    r, w := io.Pipe()

    go func() {

        defer w.Close()
        gw := gzip.NewWriter(w)
        defer gw.Close()

        for i := 0; i &lt; 5; i++ {
            fmt.Fprintf(gw, "Data chunk %d\n", i)
        }
    }()

    file, err := os.Create("output.gz")

    if err != nil {
        log.Fatal(err)
    }

    defer file.Close()

    _, err = io.Copy(file, r)
    if err != nil {
        log.Fatal(err)
    }
}

This program streams data through a pipe, compressing it with gzip in a
goroutine. The compressed data is written to a file, showcasing real-time
compression for efficient storage or transmission.

$ go run compress_stream.go 
$ gunzip -c output.gz
Data chunk 0
Data chunk 1
Data chunk 2
Data chunk 3
Data chunk 4

## Source

[Go io package - references](https://pkg.go.dev/io)

This article explored the use of pipes in Go for interprocess communication and
data streaming.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all Go tutorials](/golang/).